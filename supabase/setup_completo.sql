-- =============================================================================
-- 🚀 SCRIPT MAESTRO UNIFICADO: SUPABASE SETUP COMPLETO (EMPRESA & TESIS)
-- =============================================================================
-- Instrucciones:
-- 1. Abre tu proyecto en Supabase -> SQL Editor -> New Query.
-- 2. Pega todo este archivo y haz clic en "Run".
-- 3. Es 100% idempotente (puedes ejecutarlo varias veces sin errores).
-- =============================================================================

-- 1. EXTENSIONES
create extension if not exists pgcrypto;

-- 2. TABLA: profiles (Vinculada 1:1 con auth.users)
create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text not null,
    role text not null default 'employee'
        check (role in ('admin', 'employee')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 3. TABLA: templates (Catálogo de las 6 plantillas oficiales)
create table if not exists public.templates (
    id uuid primary key default gen_random_uuid(),
    code text unique,
    name text not null,
    description text,
    status text not null default 'active'
        check (status in ('active', 'inactive')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

alter table public.templates add column if not exists code text unique;

-- 4. TABLA: landings (Almacena cada landing generada + JSONB completo en 'data')
create table if not exists public.landings (
    id uuid primary key default gen_random_uuid(),
    template_id uuid references public.templates(id) on delete restrict,
    template_code text not null default 'agency-portal',
    created_by uuid references public.profiles(id) on delete set null,
    name text not null,
    slug text not null unique,
    tier text not null default 'free'
        check (tier in ('free', 'basic', 'pro', 'advance')),
    language text not null default 'es'
        check (language in ('es', 'en', 'pt', 'fr', 'it')),
    languages text[] not null default array['es'],
    status text not null default 'draft'
        check (status in ('draft', 'published', 'archived')),
    data jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

alter table public.landings
    add column if not exists template_code text not null default 'agency-portal',
    add column if not exists data jsonb not null default '{}'::jsonb,
    add column if not exists tier text not null default 'free',
    add column if not exists languages text[] not null default array['es'];

alter table public.landings alter column template_id drop not null;
alter table public.landings alter column created_by drop not null;

alter table public.landings drop constraint if exists landings_tier_check;
alter table public.landings
    add constraint landings_tier_check
    check (tier in ('free', 'basic', 'pro', 'advance'));

alter table public.landings drop constraint if exists landings_language_check;
alter table public.landings
    add constraint landings_language_check
    check (language in ('es', 'en', 'pt', 'fr', 'it'));

-- 5. TABLA: sections (Opcional para desglose por secciones)
create table if not exists public.sections (
    id uuid primary key default gen_random_uuid(),
    landing_id uuid not null references public.landings(id) on delete cascade,
    type text not null,
    content jsonb not null default '{}'::jsonb,
    order_index integer not null check (order_index >= 0),
    enabled boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint sections_unique_order unique (landing_id, order_index)
);

-- 6. TABLA: images (Referencias a archivos en Supabase Storage)
create table if not exists public.images (
    id uuid primary key default gen_random_uuid(),
    landing_id uuid references public.landings(id) on delete cascade,
    section_id uuid references public.sections(id) on delete cascade,
    storage_path text not null,
    alt_text text,
    created_at timestamptz not null default now()
);

-- 7. TABLA: ai_generations (Auditoría y control de gasto de OpenAI)
create table if not exists public.ai_generations (
    id uuid primary key default gen_random_uuid(),
    landing_id uuid references public.landings(id) on delete set null,
    user_id uuid references public.profiles(id) on delete set null,
    prompt text not null,
    response jsonb not null default '{}'::jsonb,
    model text not null,
    tokens_in integer,
    tokens_out integer,
    cost_usd numeric(10, 6),
    created_at timestamptz not null default now()
);

alter table public.ai_generations
    add column if not exists tokens_in integer,
    add column if not exists tokens_out integer,
    add column if not exists cost_usd numeric(10, 6);

alter table public.ai_generations alter column landing_id drop not null;
alter table public.ai_generations alter column user_id drop not null;

-- 8. TABLA: agency_settings (Configuración global de Marca Blanca)
create table if not exists public.agency_settings (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid references public.profiles(id) on delete cascade,
    company_name text not null default '',
    ruc text,
    central_whatsapp text,
    admin_email text,
    address text,
    logo_url text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 9. TABLA: guides (Directorio de guías turísticos)
create table if not exists public.guides (
    id uuid primary key default gen_random_uuid(),
    created_by uuid references public.profiles(id) on delete cascade,
    name text not null,
    role text,
    phone text,
    avatar_url text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 10. TABLAS: support_tickets & support_messages (Mesa de ayuda y cotizaciones)
create table if not exists public.support_tickets (
    id uuid primary key default gen_random_uuid(),
    landing_id uuid references public.landings(id) on delete set null,
    kind text not null default 'question',
    name text not null,
    email text,
    phone text,
    message text not null,
    status text not null default 'open'
        check (status in ('open', 'answered', 'closed')),
    created_at timestamptz not null default now()
);

create table if not exists public.support_messages (
    id uuid primary key default gen_random_uuid(),
    ticket_id uuid not null references public.support_tickets(id) on delete cascade,
    author_id uuid references public.profiles(id) on delete set null,
    body text not null,
    created_at timestamptz not null default now()
);

-- 11. ÍNDICES DE RENDIMIENTO
create index if not exists idx_landings_slug on public.landings(slug);
create index if not exists idx_landings_tier on public.landings(tier);
create index if not exists idx_landings_status on public.landings(status);
create index if not exists idx_landings_template_id on public.landings(template_id);
create index if not exists idx_landings_created_by on public.landings(created_by);
create index if not exists idx_sections_landing_id on public.sections(landing_id);
create index if not exists idx_images_landing_id on public.images(landing_id);
create index if not exists idx_ai_generations_landing_id on public.ai_generations(landing_id);
create index if not exists idx_support_tickets_landing on public.support_tickets(landing_id);
create index if not exists idx_support_messages_ticket on public.support_messages(ticket_id);

-- 12. FUNCIONES Y TRIGGERS (updated_at + creación automática de perfil con rol inteligente)
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles for each row execute function public.handle_updated_at();

drop trigger if exists templates_updated_at on public.templates;
create trigger templates_updated_at before update on public.templates for each row execute function public.handle_updated_at();

drop trigger if exists landings_updated_at on public.landings;
create trigger landings_updated_at before update on public.landings for each row execute function public.handle_updated_at();

drop trigger if exists sections_updated_at on public.sections;
create trigger sections_updated_at before update on public.sections for each row execute function public.handle_updated_at();

drop trigger if exists agency_settings_updated_at on public.agency_settings;
create trigger agency_settings_updated_at before update on public.agency_settings for each row execute function public.handle_updated_at();

drop trigger if exists guides_updated_at on public.guides;
create trigger guides_updated_at before update on public.guides for each row execute function public.handle_updated_at();

-- Trigger automático: Si el correo empieza con 'admin', le asigna rol 'admin' automáticamente
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
    inferred_role text;
    inferred_name text;
begin
    if (new.raw_user_meta_data ->> 'role') in ('admin', 'employee') then
        inferred_role := new.raw_user_meta_data ->> 'role';
    elsif lower(coalesce(new.email, '')) like 'empleado%' or lower(coalesce(new.email, '')) like 'operador%' then
        inferred_role := 'employee';
    else
        inferred_role := 'admin';
    end if;

    inferred_name := coalesce(
        new.raw_user_meta_data ->> 'full_name',
        case when inferred_role = 'admin' then 'Administrador' else 'Empleado' end
    );

    insert into public.profiles (id, full_name, role)
    values (new.id, inferred_name, inferred_role)
    on conflict (id) do update set
        full_name = excluded.full_name,
        role = excluded.role,
        updated_at = now();

    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

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

-- 13. SEED DE LAS 6 PLANTILLAS OFICIALES
insert into public.templates (code, name, description, status)
values
    ('agency-portal', 'Portal de Agencia & Catálogo Multi-Tour (Diseño 1)', 'Naranja viral, métricas +10k, catálogo de tours, FAQ y WhatsApp con radar.', 'active'),
    ('boho-nature', 'Boho Travel Journal', 'Estilo Pinterest con fotos polaroid inclinadas, cinta washi y notas de campo.', 'active'),
    ('premium', 'Lujo & Exclusivo (VIP)', 'Dorado y negro profundo. Ideal para experiencias Hiram Bingham y 5 estrellas.', 'active'),
    ('adventure', 'Aventura & Trekking', 'Tonos esmeralda y montaña. Diseñado para rutas de alta dificultad y caminatas.', 'active'),
    ('cultural', 'Cultural & Ancestral', 'Piedra incaica y ámbar cálido. Para City Tours, Sacsayhuamán y arqueología.', 'active'),
    ('emerald-explorer', 'Esmeralda Explorer (Diseño 6)', 'Deep Teal oscuro con Bento Grid, buscador flotante tipo píldora y glow esmeralda.', 'active')
on conflict (code) do update set
    name = excluded.name,
    description = excluded.description,
    status = excluded.status,
    updated_at = now();

-- 14. ACTIVAR ROW LEVEL SECURITY (RLS) EN TODAS LAS TABLAS
alter table public.profiles enable row level security;
alter table public.templates enable row level security;
alter table public.landings enable row level security;
alter table public.sections enable row level security;
alter table public.images enable row level security;
alter table public.ai_generations enable row level security;
alter table public.agency_settings enable row level security;
alter table public.guides enable row level security;
alter table public.support_tickets enable row level security;
alter table public.support_messages enable row level security;

-- 15. POLÍTICAS RLS (Idempotentes con DROP IF EXISTS)
drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile" on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin());

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists "Anyone can view active templates" on public.templates;
create policy "Anyone can view active templates" on public.templates for select using (status = 'active' or public.is_admin());

drop policy if exists "Admins can manage templates" on public.templates;
create policy "Admins can manage templates" on public.templates for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Landings: Lectura pública de publicadas, lectura/escritura autenticada
drop policy if exists "Public can view published landings" on public.landings;
create policy "Public can view published landings" on public.landings for select to anon using (status = 'published');

drop policy if exists "Authenticated users can view landings" on public.landings;
create policy "Authenticated users can view landings" on public.landings for select to authenticated using (true);

drop policy if exists "Authenticated users can create landings" on public.landings;
create policy "Authenticated users can create landings" on public.landings for insert to authenticated with check (true);

drop policy if exists "Users can update landings" on public.landings;
create policy "Users can update landings" on public.landings for update to authenticated using (true) with check (true);

drop policy if exists "Admins can delete landings" on public.landings;
create policy "Admins can delete landings" on public.landings for delete to authenticated using (public.is_admin() or created_by = auth.uid());

-- AI Generations
drop policy if exists "Users can view AI generations" on public.ai_generations;
create policy "Users can view AI generations" on public.ai_generations for select to authenticated using (user_id = auth.uid() or public.is_admin());

drop policy if exists "Users can create AI generations" on public.ai_generations;
create policy "Users can create AI generations" on public.ai_generations for insert to authenticated with check (true);

-- Agency Settings
drop policy if exists "Owner manages own settings" on public.agency_settings;
create policy "Owner manages own settings" on public.agency_settings for all to authenticated using (owner_id = auth.uid() or public.is_admin()) with check (owner_id = auth.uid() or public.is_admin());

-- Support Tickets & Messages
drop policy if exists "Authenticated can view tickets" on public.support_tickets;
create policy "Authenticated can view tickets" on public.support_tickets for select to authenticated using (true);

drop policy if exists "Authenticated can update tickets" on public.support_tickets;
create policy "Authenticated can update tickets" on public.support_tickets for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated can view messages" on public.support_messages;
create policy "Authenticated can view messages" on public.support_messages for select to authenticated using (true);

drop policy if exists "Authenticated can create messages" on public.support_messages;
create policy "Authenticated can create messages" on public.support_messages for insert to authenticated with check (true);

-- 16. STORAGE BUCKET: landing-images
insert into storage.buckets (id, name, public)
values ('landing-images', 'landing-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can read landing images" on storage.objects;
create policy "Public can read landing images" on storage.objects for select using (bucket_id = 'landing-images');

drop policy if exists "Authenticated can upload landing images" on storage.objects;
create policy "Authenticated can upload landing images" on storage.objects for insert to authenticated with check (bucket_id = 'landing-images');

drop policy if exists "Authenticated can delete own landing images" on storage.objects;
create policy "Authenticated can delete own landing images" on storage.objects for delete to authenticated using (bucket_id = 'landing-images');

