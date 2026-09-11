-- =========================================================
-- MIGRACIÓN 00001: REGISTRO Y SEED DE PLANTILLAS EN LA BD
-- Incluye la Plantilla Oficial 'agency-portal' (Opción 1 Pinterest)
-- =========================================================

-- 1. Asegurar columna 'code' única para vincular el componente frontend con la BD
alter table public.templates 
add column if not exists code text unique;

-- 2. Insertar o actualizar el catálogo de plantillas oficiales
insert into public.templates (code, name, description, status)
values
    (
        'agency-portal',
        'Portal de Agencia & Catálogo Multi-Tour (Opción 1 Pinterest)',
        'Diseño de alta conversión inspirado en agencias top de Cusco. Incluye Hero Vinicunca con botones shimmer, barra de métricas, catálogo con filtros interactivos, sección ¿Por qué elegirnos? con 4 pilares, mesa de soporte anti-spam y 3 testimonios verificados.',
        'active'
    ),
    (
        'adventure',
        'Aventura & Trekking Clásico',
        'Diseño orientado a rutas dinámicas de caminata, deportes de montaña y naturaleza andina.',
        'active'
    ),
    (
        'cultural',
        'Tradición & Cultura Imperial',
        'Diseño de corte histórico para circuitos arqueológicos, templos incas y City Tours.',
        'active'
    ),
    (
        'premium',
        'Luxury & Confort VIP',
        'Diseño exclusivo con trenes panorámicos de primera clase, hoteles 5 estrellas y asesoría privada.',
        'active'
    ),
    (
        'boho-nature',
        'Naturaleza & Ecoturismo Andino',
        'Estilo visual orgánico y relajado para lagunas, valles sagrados y termalismo.',
        'active'
    )
on conflict (code) do update set
    name = excluded.name,
    description = excluded.description,
    status = excluded.status,
    updated_at = now();

-- 3. Comentario de documentación en PostgreSQL
comment on column public.templates.code is 'Identificador único que conecta la plantilla de la base de datos con el componente React correspondiente en el frontend (ej. agency-portal, adventure, cultural).';
