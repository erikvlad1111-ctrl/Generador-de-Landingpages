-- =========================================================
-- MIGRACIÓN 00002: ALINEACIÓN DEL ESQUEMA CON LA APP
-- - landings.data (JSONB con LandingData completo)
-- - 5 idiomas, tier, languages[]
-- - plantilla emerald-explorer
-- - agency_settings, guides, support_tickets, support_messages
-- - costos de IA en ai_generations
-- - lectura anónima de landings publicadas
-- - bucket de Storage para imágenes
-- =========================================================

-- 1. LANDINGS: datos completos + nivel + idiomas
alter table public.landings
    add column if not exists data jsonb not null default '{}'::jsonb,
    add column if not exists tier text not null default 'free',
    add column if not exists languages text[] not null default array['es'];

alter table public.landings drop constraint if exists landings_tier_check;
alter table public.landings
    add constraint landings_tier_check
    check (tier in ('free', 'basic', 'pro', 'advance'));

-- Ampliar idiomas de 2 a 5
alter table public.landings drop constraint if exists landings_language_check;
alter table public.landings
    add constraint landings_language_check
    check (language in ('es', 'en', 'pt', 'fr', 'it'));

create index if not exists idx_landings_slug on public.landings(slug);
create index if not exists idx_landings_tier on public.landings(tier);

-- 2. PLANTILLA emerald-explorer
insert into public.templates (code, name, description, status)
values (
    'emerald-explorer',
    'Esmeralda Explorer (Diseño 6)',
    'Diseño Deep Forest Teal con buscador interactivo, métricas de viajeros y microanimaciones.',
    'active'
)
on conflict (code) do update set
    name = excluded.name,
    description = excluded.description,
    status = excluded.status,
    updated_at = now();

-- 3. AI_GENERATIONS: control de consumo
alter table public.ai_generations
    add column if not exists tokens_in integer,
    add column if not exists tokens_out integer,
    add column if not exists cost_usd numeric(10, 6);

-- 4. AGENCY_SETTINGS (una fila por usuario/equipo)
create table if not exists public.agency_settings (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references public.profiles(id) on delete cascade,
    company_name text not null default '',
    ruc text,
    central_whatsapp text,
    admin_email text,
    address text,
    logo_url text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 5. GUIDES
create table if not exists public.guides (
    id uuid primary key default gen_random_uuid(),
    created_by uuid not null references public.profiles(id) on delete cascade,
    name text not null,
    role text,
    phone text,
    avatar_url text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 6. SOPORTE
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

create index if not exists idx_support_tickets_landing on public.support_tickets(landing_id);
create index if not exists idx_support_messages_ticket on public.support_messages(ticket_id);

-- 7. TRIGGERS updated_at
drop trigger if exists agency_settings_updated_at on public.agency_settings;
create trigger agency_settings_updated_at
before update on public.agency_settings
for each row execute function public.handle_updated_at();

drop trigger if exists guides_updated_at on public.guides;
create trigger guides_updated_at
before update on public.guides
for each row execute function public.handle_updated_at();

-- 8. RLS
alter table public.agency_settings enable row level security;
alter table public.guides enable row level security;
alter table public.support_tickets enable row level security;
alter table public.support_messages enable row level security;

-- agency_settings: cada usuario gestiona la suya; admin ve todas
create policy "Owner manages own settings"
on public.agency_settings for all to authenticated
using (owner_id = auth.uid() or public.is_admin())
with check (owner_id = auth.uid() or public.is_admin());

-- guides: personal autenticado puede ver y gestionar
create policy "Authenticated can view guides"
on public.guides for select to authenticated using (true);

create policy "Authenticated can create guides"
on public.guides for insert to authenticated
with check (created_by = auth.uid());

create policy "Owner or admin can update guides"
on public.guides for update to authenticated
using (created_by = auth.uid() or public.is_admin())
with check (created_by = auth.uid() or public.is_admin());

create policy "Owner or admin can delete guides"
on public.guides for delete to authenticated
using (created_by = auth.uid() or public.is_admin());

-- support: el personal ve y responde; el público NO escribe directo
-- (los tickets públicos deben entrar por una ruta de servidor con honeypot y rate limit)
create policy "Authenticated can view tickets"
on public.support_tickets for select to authenticated using (true);

create policy "Authenticated can update tickets"
on public.support_tickets for update to authenticated
using (true) with check (true);

create policy "Authenticated can view messages"
on public.support_messages for select to authenticated using (true);

create policy "Authenticated can create messages"
on public.support_messages for insert to authenticated
with check (author_id = auth.uid());

-- 9. LECTURA ANÓNIMA DE LANDINGS PUBLICADAS (para /p/[slug])
create policy "Public can view published landings"
on public.landings for select to anon
using (status = 'published');

-- 10. STORAGE: bucket de imágenes
insert into storage.buckets (id, name, public)
values ('landing-images', 'landing-images', true)
on conflict (id) do nothing;

create policy "Public can read landing images"
on storage.objects for select
using (bucket_id = 'landing-images');

create policy "Authenticated can upload landing images"
on storage.objects for insert to authenticated
with check (bucket_id = 'landing-images');

create policy "Authenticated can delete own landing images"
on storage.objects for delete to authenticated
using (bucket_id = 'landing-images' and owner = auth.uid());

comment on column public.landings.data is 'LandingData completo (src/types/landing.ts) en JSONB. Las columnas slug, template, tier, status y language se mantienen sincronizadas para filtrar.';
