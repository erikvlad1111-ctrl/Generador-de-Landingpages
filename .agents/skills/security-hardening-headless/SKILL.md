---
name: security-hardening-headless
description: Guía, directrices y checklist de seguridad, blindaje de API REST, WordPress Headless, cabeceras HTTP de Next.js, Cloudflare WAF y protección contra ataques para Cusco Creativos Web / Landing Generador.
---

# Guía de Blindaje y Seguridad: WordPress Headless & Next.js

Este documento es la **referencia oficial de seguridad** para el despliegue y operación de Cusco Creativos Web / Generador de Landings Turísticas. Debe consultarse cada vez que se ejecuten tareas de endurecimiento (*hardening*), auditorías de seguridad o integración con WordPress.

---

## 1. Matriz de Seguridad en 4 Capas

```
[ Visitante / Bot ]
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│ Capa 4: Red & DNS (Cloudflare WAF + DDoS Shield + SSL)      │
└─────────────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│ Capa 2: Frontend Next.js en Vercel                          │
│ - Security Headers (CSP, X-Frame-Options, NoSniff)          │
│ - Rate Limiting en Server Actions / API Routes              │
│ - Variables de entorno privadas (OPENAI_KEY, WP_SECRETS)    │
│ - Anti-Spam Honeypot en Formularios (Reclamaciones / Cotiz.)│
└─────────────────────────────────────────────────────────────┘
       │  (Llamadas REST autenticadas server-to-server)
       ▼
┌─────────────────────────────────────────────────────────────┐
│ Capa 1: Backend WordPress Headless (CMS Privado)            │
│ - REST API protegida (Escritura solo con Application Pass)  │
│ - XML-RPC deshabilitado (xmlrpc.php)                        │
│ - Login oculto / 2FA activo                                 │
│ - CORS estricto permitido solo desde el dominio de Next.js  │
│ - Bloqueo de enumeración de usuarios (/wp/v2/users)         │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Especificación Técnica por Capa

### Capa 1: Blindaje en WordPress Headless (Backend CMS)

1. **Autenticación Estricta de la REST API:**
   - La lectura de landings es pública: `GET /wp-json/wp/v2/landings`.
   - La creación/modificación/eliminación (`POST`, `PUT`, `DELETE`) exige **Application Passwords** o **JWT**.
   - Ningún usuario anónimo puede publicar o alterar contenido.

2. **Bloqueo de Enumeración de Usuarios:**
   - Previene que bots descubran usuarios administradores mediante `/wp-json/wp/v2/users`.
   - Código en `functions.php`:
     ```php
     add_filter('rest_endpoints', function($endpoints) {
         if (!is_user_logged_in()) {
             if (isset($endpoints['/wp/v2/users'])) unset($endpoints['/wp/v2/users']);
             if (isset($endpoints['/wp/v2/users/(?P<id>[\d]+)'])) unset($endpoints['/wp/v2/users/(?P<id>[\d]+)']);
         }
         return $endpoints;
     });
     ```

3. **Deshabilitación de XML-RPC (`xmlrpc.php`):**
   - Bloquear en `.htaccess` o Nginx para prevenir ataques de fuerza bruta y DDoS amplificado:
     ```apache
     <Files xmlrpc.php>
       order deny,allow
       deny from all
     </Files>
     ```

4. **CORS Estricto:**
   - WordPress solo acepta solicitudes originadas desde el dominio oficial de Next.js (ej. `https://generador-de-landingpages.vercel.app` o el dominio de producción).

5. **Ocultar URL de Login:**
   - Renombrar `/wp-login.php` y `/wp-admin` usando *WPS Hide Login* a una ruta interna personalizada.

---

### Capa 2: Blindaje en Next.js (Frontend Vercel)

1. **Aislamiento de Variables de Entorno:**
   - `OPENAI_API_KEY`, `WP_APPLICATION_PASSWORD`, `DATABASE_URL` NUNCA deben llevar `NEXT_PUBLIC_`.
   - Toda interacción con IA y CMS se realiza en Server Components, Server Actions o Route Handlers (`src/app/api/...`).

2. **Cabeceras HTTP de Seguridad (Security Headers):**
   - Configuración en `next.config.ts`:
     ```typescript
     async headers() {
       return [
         {
           source: '/(.*)',
           headers: [
             { key: 'X-Frame-Options', value: 'DENY' },
             { key: 'X-Content-Type-Options', value: 'nosniff' },
             { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
             { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
           ],
         },
       ];
     }
     ```

3. **Rate Limiting (Protección de Cuota y Recursos):**
   - Límite de peticiones por IP en endpoints de generación con IA (ej. máximo 5 peticiones/hora por IP pública) con `@upstash/ratelimit`.

---

### Capa 3: Protección Anti-Spam en Formularios

1. **Honeypot Invisible:**
   - Campo fantasma en `ComplaintsBookModal.tsx` y `QuoteModal.tsx`:
     ```tsx
     <input 
       type="text" 
       name="b_verification_hp" 
       tabIndex={-1} 
       autoComplete="off" 
       style={{ position: 'absolute', opacity: 0, zIndex: -1, pointerEvents: 'none' }} 
     />
     ```
   - Si el campo viene con valor al recibir el submit en el backend, se descarta silenciosamente.

2. **Cloudflare Turnstile (Opcional):**
   - Verificación inteligente sin acertijos captcha invasivos para el usuario.

---

### Capa 4: Blindaje DNS y Red (Cloudflare)

1. **Proxy Activo (Nube Naranja):** Oculta la IP real del servidor de hosting de WordPress.
2. **Bot Fight Mode:** Mitigación automática de scrapers y escáneres de vulnerabilidades.
3. **Reglas WAF:** Bloqueo de peticiones maliciosas que contengan patrones de inyección SQL (`UNION SELECT`) o scripts maliciosos (`<script>`).
4. **Modo SSL Estricto (Full / Strict):** Tráfico 100% cifrado HTTPS.

---

## 3. Checklist de Seguridad (Estado de Implementación)

### Implementado en el Frontend (Activo en Next.js):
- [x] **Next.js:** Inyectar cabeceras de seguridad OWASP (`headers()` en `next.config.ts`: X-Frame-Options, X-Content-Type-Options, HSTS, Referrer-Policy, Permissions-Policy).
- [x] **Next.js:** Implementar técnica de campo Honeypot invisible en `ComplaintsBookModal.tsx`.
- [x] **Next.js:** Implementar técnica de campo Honeypot en `QuoteModal.tsx`.
- [x] **Next.js:** Módulo de sanitización y limpieza anti-XSS (`src/lib/sanitize.ts`).
- [x] **Next.js:** Eliminado el campo "API Key" del cliente (`/demo/settings`); la clave vive solo en el servidor.
- [x] **Next.js:** Override `?tier=` en `/p/[slug]` solo se respeta con `?demo=official` (el editor interno `/demo/preview` lo mantiene).
- [x] **Next.js:** `*.supabase.co` (`/storage/v1/object/public/**`) en `images.remotePatterns` + CSP sin nonces en `next.config.ts`.
- [x] **Export HTML:** `exportLandingHtml.ts` pasa toda URL de imagen por `safeUrl()` (solo `http(s)`, rutas relativas o `data:image/(png|jpeg|webp|gif|avif)`; bloquea `javascript:`, `data:image/svg+xml`, etc.) y escapa `lang` y `rating`.

### Pendiente al integrar Supabase (backend oficial):
- [ ] **Git:** Revocar el token `ghp_...` en GitHub y limpiar la URL del remoto (`git remote set-url origin https://github.com/<org>/<repo>.git`).
- [ ] **Supabase Auth:** Desactivar registro público (Dashboard → Authentication → Sign In / Providers → desmarcar "Allow new users to sign up") y crear usuarios del personal manualmente.
- [ ] **Supabase RLS:** Verificar políticas tras la migración `00002` (lectura anónima solo de `published`).
- [ ] **Next.js:** Ruta de servidor para generación con IA: login obligatorio, `max_tokens`, rate limit por usuario.
- [ ] **Next.js:** Proteger `/demo/*` con login (proxy + Supabase SSR).
- [ ] **Formularios públicos:** Enviar tickets/cotizaciones por ruta de servidor con honeypot y rate limit.
- [ ] **Cloudflare (opcional):** Configurar proxy DNS y activar Bot Fight Mode si hay dominio propio.

> Nota: el código actual usa `X-Frame-Options: SAMEORIGIN` y `frame-ancestors 'self'` (no `DENY`/`'none'`) porque el editor muestra la landing embebida en un iframe del mismo origen.
>
> Nota CSP: `img-src` permite `https:` porque las agencias pegan URLs de imágenes de cualquier host. Si se añade un servicio externo nuevo (analytics, video embebido, etc.) hay que agregar su dominio a `script-src`/`connect-src`/`frame-src` o el navegador lo bloqueará (ver consola: "Refused to ... because it violates the following Content Security Policy directive").

### Solo si se activa el Plan B (WordPress Headless):
- [ ] **WordPress:** Crear snippet o plugin MU para bloquear `/wp/v2/users` anónimos.
- [ ] **WordPress:** Bloquear acceso a `xmlrpc.php` en `.htaccess`.
- [ ] **WordPress:** Configurar regla CORS autorizando únicamente el dominio de Vercel.
- [ ] **WordPress:** Crear usuario de servicio con rol de Editor y generar Application Password.
