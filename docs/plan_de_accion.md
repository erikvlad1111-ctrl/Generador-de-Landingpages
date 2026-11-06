# 🗺️ PLAN DE ACCIÓN DEL PROYECTO (Checklist)

> Backend oficial: **Supabase + Vercel** (ver skill `supabase-backend`).
> Estado de partida: el frontend demo está completo, pero los datos se guardan en `localStorage` (`src/data/landingStore.ts`).
> Marcar cada ítem con `[x]` al completarlo.

---

## Fase A — Conectar Supabase (persistencia real)
- [ ] Crear proyecto en Supabase y aplicar el script maestro `supabase/setup_completo.sql` (unifica `00000`, `00001`, `00002` y el bucket `landing-images`).
- [ ] Configurar variables de entorno en `.env.local` y en Vercel (claves privadas sin `NEXT_PUBLIC_`).
- [x] Conectar `landingStore.ts` para guardar y leer `landings.data` (JSONB) en Supabase sincronizando `slug`, `name`, `template_code`, `tier`, `status`, `language(s)` con respaldo en `localStorage`.
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
- [ ] Deploy final en Vercel con variables de entorno de Supabase + prueba punta a punta en la nube.
- [ ] Respaldo periódico de la base de datos (el plan Free no tiene backups automáticos).
- [ ] Control de gasto de IA: saldo prepago y límite mensual en el panel del proveedor.
- [ ] Evaluar paso a **Supabase Pro** cuando haya clientes reales (sin pausa + backups diarios).

---

## Módulos funcionales
- [x] Panel de administración de tickets de soporte (`/demo/support`).
- [x] Catálogo de 6 plantillas de alta conversión (`agency-portal`, `boho-nature`, `premium`, `adventure`, `cultural`, `emerald-explorer`).
- [ ] CRUD independiente de Guías en base de datos (actualmente integrado dentro del editor de cada landing).
- [ ] Conexión del Dashboard y `landingStore` a lectura/escritura en vivo con Supabase PostgreSQL.

## Cierre de tesis
- [x] Pruebas del flujo completo y de restricciones por plan (`free`, `basic`, `pro`, `advance`) y vista móvil en PC y celular real.
- [ ] Medición: tiempo de creación manual vs. automatizada (tabla de resultados).
- [ ] Manual de usuario, diagrama de arquitectura y capturas.
- [ ] Validación con Jefatura al cierre de cada fase.

## Estrategia de Doble Versión Independiente (Empresa vs. Tesis)
> Detalle completo en [`docs/plan_doble_version_empresa_y_tesis.md`](./plan_doble_version_empresa_y_tesis.md).
- [x] **1. Terminar el proyecto base al 100%:** Conectar motor IA completo (`/api/ai/generate` + `/demo/new`), sincronizar `landingStore.ts` con Supabase y generar script único `supabase/setup_completo.sql`.
- [ ] **2. Versión Empresa (Desarrollo/Producción):** GitHub de la empresa + Supabase de la empresa + API OpenAI de la empresa + Hosting Vercel de la empresa.
- [ ] **3. Versión Tesis (Sustentación Universitaria):**
  - [ ] Crear GitHub personal y subir copia del proyecto Next.js terminado.
  - [ ] Crear Supabase personal y ejecutar el script SQL para migrar tablas, políticas RLS y plantillas.
  - [ ] Configurar API de OpenAI (autorizada o propia + motor de respaldo local integrado).
  - [ ] Desplegar en Vercel personal para obtener URL pública de sustentación.
  - [ ] Probar desde otra laptop sin depender de computadora, correo ni celular de respaldo de la empresa.

## Opcional (si sobra tiempo)
- [x] FAQ, itinerario y testimonios automáticos con IA.
- [ ] Edición mediante instrucciones conversacionales a la IA.
