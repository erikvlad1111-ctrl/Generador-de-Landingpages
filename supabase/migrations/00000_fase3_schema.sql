-- =========================================================
-- FASE 3 - BASE DE DATOS
-- Sistema interno de generación de landing pages turísticas
-- PostgreSQL / Supabase
-- =========================================================


-- =========================================================
-- 1. EXTENSIONES
-- =========================================================

create extension if not exists pgcrypto;


-- =========================================================
-- 2. TABLA: profiles
-- Información adicional de los usuarios de Supabase Auth
-- =========================================================

create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,

    full_name text not null,

    role text not null default 'employee'
        check (role in ('admin', 'employee')),

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);


-- =========================================================
-- 3. TABLA: templates
-- Plantillas disponibles para crear landings
-- =========================================================

create table public.templates (
    id uuid primary key default gen_random_uuid(),

    name text not null,

    description text,

    status text not null default 'active'
        check (status in ('active', 'inactive')),

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);


-- =========================================================
-- 4. TABLA: landings
-- Cada registro representa una landing concreta
-- =========================================================

create table public.landings (
    id uuid primary key default gen_random_uuid(),

    template_id uuid not null
        references public.templates(id)
        on delete restrict,

    created_by uuid not null
        references public.profiles(id)
        on delete restrict,

    name text not null,

    slug text not null unique,

    language text not null default 'es'
        check (language in ('es', 'en')),

    status text not null default 'draft'
        check (status in ('draft', 'published', 'archived')),

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);


-- =========================================================
-- 5. TABLA: sections
-- Secciones que componen cada landing
-- =========================================================

create table public.sections (
    id uuid primary key default gen_random_uuid(),

    landing_id uuid not null
        references public.landings(id)
        on delete cascade,

    type text not null,

    content jsonb not null default '{}'::jsonb,

    order_index integer not null,

    enabled boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),

    constraint sections_order_index_positive
        check (order_index >= 0),

    constraint sections_unique_order
        unique (landing_id, order_index)
);


-- =========================================================
-- 6. TABLA: images
-- Información de imágenes almacenadas en Supabase Storage
-- =========================================================

create table public.images (
    id uuid primary key default gen_random_uuid(),

    landing_id uuid not null
        references public.landings(id)
        on delete cascade,

    section_id uuid
        references public.sections(id)
        on delete cascade,

    storage_path text not null,

    alt_text text,

    created_at timestamptz not null default now()
);


-- =========================================================
-- 7. TABLA: ai_generations
-- Historial de operaciones realizadas mediante IA
-- =========================================================

create table public.ai_generations (
    id uuid primary key default gen_random_uuid(),

    landing_id uuid not null
        references public.landings(id)
        on delete cascade,

    user_id uuid not null
        references public.profiles(id)
        on delete restrict,

    prompt text not null,

    response jsonb not null default '{}'::jsonb,

    model text not null,

    created_at timestamptz not null default now()
);


-- =========================================================
-- 8. ÍNDICES
-- Ayudan a PostgreSQL a encontrar información más rápido
-- =========================================================

create index idx_landings_template_id
    on public.landings(template_id);

create index idx_landings_created_by
    on public.landings(created_by);

create index idx_landings_status
    on public.landings(status);

create index idx_sections_landing_id
    on public.sections(landing_id);

create index idx_sections_type
    on public.sections(type);

create index idx_images_landing_id
    on public.images(landing_id);

create index idx_images_section_id
    on public.images(section_id);

create index idx_ai_generations_landing_id
    on public.ai_generations(landing_id);

create index idx_ai_generations_user_id
    on public.ai_generations(user_id);


-- =========================================================
-- 9. FUNCIÓN PARA updated_at
-- Actualiza automáticamente la fecha de modificación
-- =========================================================

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;


-- =========================================================
-- 10. TRIGGERS updated_at
-- =========================================================

create trigger profiles_updated_at
before update on public.profiles
for each row
execute function public.handle_updated_at();


create trigger templates_updated_at
before update on public.templates
for each row
execute function public.handle_updated_at();


create trigger landings_updated_at
before update on public.landings
for each row
execute function public.handle_updated_at();


create trigger sections_updated_at
before update on public.sections
for each row
execute function public.handle_updated_at();


-- =========================================================
-- 11. CREACIÓN AUTOMÁTICA DEL PROFILE
-- Cuando se registra un usuario en Supabase Auth
-- se crea automáticamente su profile.
-- =========================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin

    insert into public.profiles (
        id,
        full_name,
        role
    )
    values (
        new.id,
        coalesce(
            new.raw_user_meta_data ->> 'full_name',
            'Usuario'
        ),
        'employee'
    );

    return new;

end;
$$;


create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();


-- =========================================================
-- 12. ROW LEVEL SECURITY (RLS)
-- =========================================================

alter table public.profiles enable row level security;
alter table public.templates enable row level security;
alter table public.landings enable row level security;
alter table public.sections enable row level security;
alter table public.images enable row level security;
alter table public.ai_generations enable row level security;


-- =========================================================
-- 13. FUNCIÓN AUXILIAR PARA SABER SI EL USUARIO ES ADMIN
-- =========================================================

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
    select exists (
        select 1
        from public.profiles
        where id = auth.uid()
        and role = 'admin'
    );
$$;


-- =========================================================
-- 14. POLÍTICAS: PROFILES
-- =========================================================

create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using (
    id = auth.uid()
    or public.is_admin()
);


create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (
    id = auth.uid()
)
with check (
    id = auth.uid()
);


-- =========================================================
-- 15. POLÍTICAS: TEMPLATES
-- =========================================================

create policy "Authenticated users can view active templates"
on public.templates
for select
to authenticated
using (
    status = 'active'
    or public.is_admin()
);


create policy "Admins can create templates"
on public.templates
for insert
to authenticated
with check (
    public.is_admin()
);


create policy "Admins can update templates"
on public.templates
for update
to authenticated
using (
    public.is_admin()
)
with check (
    public.is_admin()
);


create policy "Admins can delete templates"
on public.templates
for delete
to authenticated
using (
    public.is_admin()
);


-- =========================================================
-- 16. POLÍTICAS: LANDINGS
-- =========================================================

create policy "Authenticated users can view landings"
on public.landings
for select
to authenticated
using (true);


create policy "Authenticated users can create landings"
on public.landings
for insert
to authenticated
with check (
    created_by = auth.uid()
);


create policy "Users can update their own landings"
on public.landings
for update
to authenticated
using (
    created_by = auth.uid()
    or public.is_admin()
)
with check (
    created_by = auth.uid()
    or public.is_admin()
);


create policy "Admins can delete landings"
on public.landings
for delete
to authenticated
using (
    public.is_admin()
);


-- =========================================================
-- 17. POLÍTICAS: SECTIONS
-- =========================================================

create policy "Authenticated users can view sections"
on public.sections
for select
to authenticated
using (true);


create policy "Users can create sections"
on public.sections
for insert
to authenticated
with check (
    exists (
        select 1
        from public.landings
        where id = landing_id
        and (
            created_by = auth.uid()
            or public.is_admin()
        )
    )
);


create policy "Users can update sections"
on public.sections
for update
to authenticated
using (
    exists (
        select 1
        from public.landings
        where id = landing_id
        and (
            created_by = auth.uid()
            or public.is_admin()
        )
    )
)
with check (
    exists (
        select 1
        from public.landings
        where id = landing_id
        and (
            created_by = auth.uid()
            or public.is_admin()
        )
    )
);


create policy "Users can delete sections"
on public.sections
for delete
to authenticated
using (
    exists (
        select 1
        from public.landings
        where id = landing_id
        and (
            created_by = auth.uid()
            or public.is_admin()
        )
    )
);


-- =========================================================
-- 18. POLÍTICAS: IMAGES
-- =========================================================

create policy "Authenticated users can view image records"
on public.images
for select
to authenticated
using (true);


create policy "Users can create image records"
on public.images
for insert
to authenticated
with check (
    exists (
        select 1
        from public.landings
        where id = landing_id
        and (
            created_by = auth.uid()
            or public.is_admin()
        )
    )
);


create policy "Users can delete image records"
on public.images
for delete
to authenticated
using (
    exists (
        select 1
        from public.landings
        where id = landing_id
        and (
            created_by = auth.uid()
            or public.is_admin()
        )
    )
);


-- =========================================================
-- 19. POLÍTICAS: AI_GENERATIONS
-- =========================================================

create policy "Users can view AI generations"
on public.ai_generations
for select
to authenticated
using (
    user_id = auth.uid()
    or public.is_admin()
);


create policy "Users can create AI generations"
on public.ai_generations
for insert
to authenticated
with check (
    user_id = auth.uid()
);


-- =========================================================
-- FIN DEL SCRIPT
-- =========================================================
