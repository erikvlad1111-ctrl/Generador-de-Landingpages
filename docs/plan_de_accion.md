# 🗺️ PLAN DE ACCIÓN DEL PROYECTO (Checklist)

> Backend oficial: **Supabase + Vercel** (ver skill `supabase-backend`).
> Estado de partida: el frontend demo está completo, pero los datos se guardan en `localStorage` (`src/data/landingStore.ts`).
> Marcar cada ítem con `[x]` al completarlo.

---

## Fase A — Conectar Supabase (persistencia real)
- [x] Crear proyecto en Supabase (`ectxektxwthbzvexcrqu`) y aplicar el script maestro `supabase/setup_completo.sql` (unifica `00000`, `00001`, `00002` y el bucket `landing-images`).
- [x] Crear los 2 usuarios oficiales en Supabase Auth (`admin@cuscocreativos.com` con rol `admin` y `empleado@cuscocreativos.com` con rol `employee`) y desactivar registro público (`disable_signup = true`).
- [x] Configurar variables de entorno en `.env.local` y en **Vercel** (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`, `AI_MODEL`, `AI_MAX_OUTPUT_TOKENS`, `AI_RATE_LIMIT_PER_HOUR`).
- [x] Conectar `landingStore.ts` para guardar y leer `landings.data` (JSONB) en Supabase sincronizando `slug`, `name`, `template_code`, `tier`, `status`, `language(s)` con respaldo en `localStorage` (7 landings iniciales pobladas en `public.landings`).
- [x] `/p/[slug]` lee desde Supabase (`fetchLandingBySlugFromSupabase`) además del caché local.
- [x] Subida de logotipos/imágenes conectada al bucket `landing-images` (`uploadImageToSupabaseStorage`).

## Fase B — Login y roles
- [x] Página `/login` con Supabase Auth, fallback híbrido interno seguro y registro público desactivado.
- [x] Proteger `/demo/*` para usuarios con sesión mediante `src/proxy.ts` (convención Next.js 16) y guard cliente.
- [x] Roles y sesión: Admin Cusco Creativos (`Acceso Total`) vs Empleado (`Operador`) con resolución automática desde `public.profiles`, sincronización en tiempo real (`onAuthStateChange` + `storage`), selector de perfil en cabecera, permisos diferenciados y botón **Salir** en rojo.

## Fase C — Rutas de API seguras
- [x] `POST /api/ai/generate` (OpenAI en servidor, `max_tokens`, rate limit, verificación de sesión `cc_auth`).
- [x] `POST /api/support` y `POST /api/quote` (honeypot + time-gate 2.5s + rate limit 3/10min en cliente y servidor).
- [x] Dominio `*.supabase.co` en `images.remotePatterns` y ruta `GET /api/keep-alive` anti-pausa.

## Fase UX & Vista Móvil (Generador y Previsualización)
- [x] **Paso 1 del Generador (`/demo/new`):** Orden optimizado (`1. Elige la Plantilla` → `2. Nivel de Servicio / Tier` → `3. Portada Hero` → `4. Idiomas`) con resaltado limpio tipo glow/blur azul.
- [x] **Paso 4 del Generador (`/demo/new`):** Tarjeta `RESUMEN DE LA LANDING + 🚀 Generar Landing y Ver Demo` visible al finalizar el Paso 4 (arriba de la vista previa en vivo y al cierre del formulario).
- [x] **Vista Móvil en PC y en Celular Real (`/demo/preview` y `/p/[slug]`):** Simulador móvil en PC con viewport real de `390px` (menú hamburguesa y 1 columna reales) y vista pantalla completa nativa en smartphones reales + sincronización instantánea por QR (`?d=`).

## Fase D — Motor de IA
- [x] Prompt adaptado por plan (free/basic/pro/advance), objetivo (WhatsApp/cotización) e idioma (`POST /api/ai/generate` y autocompletado inteligente en `/demo/new`).
- [x] Validación y sanitización del JSON devuelto por la IA antes de renderizar.
- [x] Priorización y filtrado estricto de secciones según el objetivo y el nivel contratado (`tier`).

## Fase E — Despliegue y operación
- [x] **Keep-alive anti-pausa de Supabase Free:** ruta `/api/keep-alive` (consulta mínima, protegida con `CRON_SECRET`) + Vercel Cron configurado en `vercel.json`.
- [x] Deploy final en Vercel con variables de entorno de Supabase + prueba punta a punta en la nube.
- [x] Respaldo periódico de la base de datos documentado (`supabase/setup_completo.sql` + query de exportación JSONB en `docs/documentacion_tesis.md`).
- [x] Control de gasto de IA: límite de tokens (`AI_MAX_OUTPUT_TOKENS=900`), rate limit (`AI_RATE_LIMIT_PER_HOUR=10`), tabla de auditoría `public.ai_generations` y motor de respaldo local sin costo.
- [ ] Evaluar paso a **Supabase Pro** cuando haya clientes reales (sin pausa + backups diarios).

---

## Módulos funcionales
- [x] Panel de administración de tickets de soporte (`/demo/support`).
- [x] Catálogo de 6 plantillas de alta conversión (`agency-portal`, `boho-nature`, `premium`, `adventure`, `cultural`, `emerald-explorer`).
- [x] Gestión de Guías Turísticos integrada dentro del editor y estructura JSONB de cada landing.
- [x] Conexión del Dashboard y `landingStore` a lectura/escritura en vivo con Supabase PostgreSQL.

## Cierre de tesis
- [x] Pruebas del flujo completo y de restricciones por plan (`free`, `basic`, `pro`, `advance`) y vista móvil en PC y celular real.
- [x] Medición: tiempo de creación manual vs. automatizada (tabla de resultados en [`docs/documentacion_tesis.md`](./documentacion_tesis.md)).
- [x] Manual de usuario, diagramas de arquitectura (Mermaid) y guía operativa en [`docs/documentacion_tesis.md`](./documentacion_tesis.md).
- [x] Hoja de ruta ejecutada y registro detallado de todo lo implementado en [`docs/hoja_de_ruta_proyecto.md`](./hoja_de_ruta_proyecto.md).
- [x] Proyecto base 100% completado, compilado con 0 errores y desplegado en la nube con Supabase y Vercel.
- [ ] Validación final con Jefatura / Asesor de Tesis.

## Estrategia de Doble Versión Independiente (Empresa vs. Tesis)
> Detalle completo en [`docs/plan_doble_version_empresa_y_tesis.md`](./plan_doble_version_empresa_y_tesis.md).
- [x] **1. Terminar el proyecto base al 100%:** Conectar motor IA completo (`/api/ai/generate` + `/demo/new`), sincronizar `landingStore.ts` con Supabase y generar script único `supabase/setup_completo.sql`.
- [ ] **2. Versión Empresa (Desarrollo/Producción):** GitHub de la empresa + Supabase de la empresa + API OpenAI de la empresa + Hosting Vercel de la empresa (listo para clonar con `setup_completo.sql`).
- [x] **3. Versión Tesis (Sustentación Universitaria):**
  - [x] Crear GitHub personal (`erikvlad1111-ctrl/Generador-de-Landingpages`) y subir copia del proyecto Next.js terminado.
  - [x] Crear Supabase personal (`ectxektxwthbzvexcrqu`) y ejecutar el script SQL para migrar tablas, políticas RLS, usuarios, plantillas y landings.
  - [x] Configurar motor de IA con validación y respaldo local determinista integrado (listo para agregar `OPENAI_API_KEY` opcional).
  - [x] Desplegar en Vercel personal (`generador-de-landingpages.vercel.app`) con las 7 variables de entorno configuradas.
  - [x] Listo para abrir y sustentar desde cualquier laptop o smartphone sin depender de equipos de la empresa.

## Opcional (si sobra tiempo)
- [x] FAQ, itinerario y testimonios automáticos con IA.
- [ ] Edición mediante instrucciones conversacionales a la IA.
