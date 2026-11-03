# 🗺️ PLAN DE ACCIÓN DEL PROYECTO (Checklist)

> Backend oficial: **Supabase + Vercel** (ver skill `supabase-backend`).
> Estado de partida: el frontend demo está completo, pero los datos se guardan en `localStorage` (`src/data/landingStore.ts`).
> Marcar cada ítem con `[x]` al completarlo.

---

## Fase A — Conectar Supabase (persistencia real)
- [ ] Crear proyecto en Supabase y aplicar migraciones `00000`, `00001`, `00002`.
- [ ] Crear bucket público `landing-images`.
- [ ] Configurar variables de entorno en `.env.local` y en Vercel (claves privadas sin `NEXT_PUBLIC_`).
- [ ] Reemplazar `landingStore` por un servicio que guarde y lea `landings.data` (JSONB) sincronizando `slug`, `name`, `template_id`, `tier`, `status`, `language(s)`.
- [ ] `/p/[slug]` lee desde Supabase (solo landings `published` para visitantes).

## Fase B — Login y roles
- [x] Página `/login` con Supabase Auth y fallback demo seguro (registro público desactivado).
- [x] Proteger `/demo/*` para usuarios con sesión mediante `src/proxy.ts` (convención Next.js 16) y guard cliente.
- [x] Roles y sesión: Admin Cusco Creativos vs Empleado con visualización en cabecera y cierre de sesión activo.

## Fase C — Rutas de API seguras
- [ ] `POST /api/ai/generate` (OpenAI en servidor, `max_tokens`, rate limit, registro en `ai_generations`).
- [ ] `POST /api/support` y `POST /api/quote` (honeypot + time-gate + CAPTCHA/Turnstile + rate limit).
- [ ] Subida de imágenes a Storage y dominio `*.supabase.co` en `images.remotePatterns`.

## Fase D — Motor de IA
- [ ] Prompt adaptado por plan (free/basic/pro/advance), objetivo (WhatsApp/cotización) e idioma.
- [ ] Validación del JSON devuelto por la IA antes de renderizar.
- [ ] Priorización de secciones según el objetivo.

## Fase E — Despliegue y operación
- [ ] Deploy en Vercel + prueba punta a punta (login → crear → IA → editar → publicar).
- [ ] **Keep-alive anti-pausa de Supabase Free:** ruta `/api/keep-alive` (consulta mínima, protegida con `CRON_SECRET`) + Vercel Cron cada 2–3 días.
- [ ] Respaldo periódico de la base de datos (el plan Free no tiene backups automáticos).
- [ ] Control de gasto de IA: saldo prepago y límite mensual en el panel del proveedor.
- [ ] Evaluar paso a **Supabase Pro** cuando haya clientes reales (sin pausa + backups diarios).

---

## Módulos funcionales pendientes
- [ ] CRUD de Guías (nombre, idiomas, experiencia, destinos, fotos).
- [ ] Dashboard con datos reales.
- [ ] Panel de administración de tickets de soporte.
- [ ] Plantilla `family-comfort`.

## Cierre de tesis
- [ ] Pruebas del flujo completo y de restricciones por plan.
- [ ] Medición: tiempo de creación manual vs. automatizada (tabla de resultados).
- [ ] Manual de usuario, diagrama de arquitectura y capturas.
- [ ] Validación con Jefatura al cierre de cada fase.

## Opcional (si sobra tiempo)
- [ ] SEO y FAQ automáticos con IA.
- [ ] Edición mediante instrucciones a la IA.
