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

## 3. Checklist de Tareas Pendientes (Para Implementación Futura)

- [ ] **Next.js:** Inyectar cabeceras de seguridad (`headers()` en `next.config.ts`).
- [ ] **Next.js:** Implementar técnica de campo Honeypot invisible en `ComplaintsBookModal.tsx`.
- [ ] **Next.js:** Implementar técnica de campo Honeypot en `QuoteModal.tsx`.
- [ ] **WordPress:** Crear snippet o plugin MU para bloquear `/wp/v2/users` anónimos.
- [ ] **WordPress:** Bloquear acceso a `xmlrpc.php` en `.htaccess`.
- [ ] **WordPress:** Configurar regla CORS autorizando únicamente el dominio de Vercel.
- [ ] **WordPress:** Crear usuario de servicio con rol de Editor y generar Application Password.
- [ ] **Cloudflare:** Configurar proxy DNS y activar Bot Fight Mode.
