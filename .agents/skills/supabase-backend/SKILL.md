---
name: supabase-backend
description: Arquitectura oficial del backend (Supabase + Vercel) para Cusco Creativos Web / Landing Generador. Modelo de datos (landings.data JSONB), Auth, RLS, Storage, IA con control de gasto y errores típicos. Usar al tocar persistencia, login, migraciones o IA.
---

# Backend oficial: Supabase + Vercel

## Decisiones de arquitectura
- **Frontend:** Next.js (App Router) en Vercel.
- **Backend:** Supabase (PostgreSQL, Auth, Storage, RLS).
- **IA:** OpenAI u otro proveedor, solo desde el servidor (Route Handler `src/app/api/...` o Edge Function). La IA devuelve JSON de contenido, nunca HTML/CSS.
- **WordPress Headless:** Plan B, solo si Jefatura lo pide (ver `wordpress-headless-architecture`).

## Modelo de datos
- `landings.data` (JSONB) guarda el `LandingData` completo de `src/types/landing.ts`. Las columnas `slug`, `name`, `template_id`, `tier`, `status`, `language`, `languages`, `created_by` se mantienen sincronizadas para filtrar.
- `sections` queda opcional (no usada en v1).
- Tablas de apoyo: `profiles`, `templates` (con `code`), `images`, `ai_generations` (con `tokens_in/out`, `cost_usd`), `agency_settings`, `guides`, `support_tickets`, `support_messages`.
- Storage: bucket público `landing-images`.
- Migraciones: `supabase/migrations/00000` (base), `00001` (seed plantillas), `00002` (alineación con la app).

## Reglas
1. Claves privadas (`OPENAI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) nunca con `NEXT_PUBLIC_`.
2. Desactivar registro público en Supabase Auth; crear usuarios del personal manualmente.
3. Lectura anónima solo de `landings.status = 'published'` (política RLS).
4. Escrituras públicas (tickets, cotizaciones) deben pasar por ruta de servidor con honeypot y rate limit.
5. Tras cambiar el esquema, regenerar tipos: `npx supabase gen types typescript --project-id <id> > src/types/supabase.ts`.
6. Añadir el dominio de Supabase Storage a `images.remotePatterns` en `next.config.ts`.

## Control de gasto de IA
- Saldo prepago, sin recarga automática, y límite mensual en el panel del proveedor.
- `max_tokens` limitado, modelo económico, login obligatorio y rate limit por usuario.
- Registrar tokens y costo en `ai_generations`.

## Plan Free de Supabase
- Se pausa tras 7 días sin actividad: usar un ping periódico (cron) o pasar a Pro.
- Sin backups automáticos: exportar la BD periódicamente.

## Errores conocidos (registrar aquí al resolverlos)
| Síntoma | Causa raíz | Diagnóstico | Solución |
|---|---|---|---|
| `new row violates row-level security policy` al insertar | Falta política `insert` o `created_by` distinto de `auth.uid()` | Revisar policies en el panel SQL y el valor de `created_by` | Enviar `created_by = auth.uid()` o añadir política adecuada |
| `/p/[slug]` no muestra landings a visitantes | Sin política para rol `anon` | `select` como anon devuelve 0 filas | Crear política `Public can view published landings` (migración 00002) |
| Imagen de Storage no carga en `next/image` | Dominio no está en `remotePatterns` | Error "hostname not configured" en consola | Añadir el host `*.supabase.co` en `next.config.ts` |
