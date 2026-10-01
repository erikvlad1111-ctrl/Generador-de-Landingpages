---
name: wordpress-headless-architecture
description: Guía y arquitectura de transición de backend desde Supabase hacia WordPress Headless para Cusco Creativos Web / Landing Generador.
---

# Transición a WordPress Headless (Siguiente Paso Oficial)

## Contexto de Negocio
A solicitud expresa de Jefatura / Dirección de la Agencia Cusco Creativos:
- **Frontend y UI:** Se mantiene en **Next.js (App Router)** alojado en Vercel.
- **Backend Anterior:** Supabase (PostgreSQL y Edge Functions).
- **Nuevo Backend Oficial:** **WordPress Headless** comunicándose mediante **WP REST API**.
- **Motor de Contenido:** **OpenAI** (genera el JSON estructurado con los datos del tour, itinerarios y FAQs).

## Flujo de Trabajo
1. **Generación:** El usuario ingresa datos en Next.js -> OpenAI genera el contenido JSON.
2. **Persistencia:** Next.js envía `POST` a `/wp-json/wp/v2/landings` con autenticación mediante Application Passwords.
3. **Publicación y Render:** Las landings públicas en `/p/[slug]` consumen `GET /wp-json/wp/v2/landings?slug=...` y renderizan las plantillas de React (`AgencyPortalTemplate`, `AdventureTemplate`, etc.).
4. **Imágenes:** Subida opcional o vinculación a la mediateca de WordPress (`/wp-json/wp/v2/media`).

## Requerimientos Técnicos
- **Custom Post Type:** `landing` con `show_in_rest: true`.
- **Campo Meta:** `landing_data` (tipo objeto JSON) para almacenar el schema completo de `LandingData`.
- **Archivo de Conexión:** `src/lib/wordpress.ts` (reemplazo o complemento de `src/lib/supabase.ts`).
- **Documentación Completa:** Consultar [`docs/fase_wordpress_headless.md`](file:///c:/Users/copyw/.gemini/antigravity-ide/scratch/cusco-creativos-web/docs/fase_wordpress_headless.md).

## Opción Alternativa Oficial: Hosting Unificado sin Vercel (Auto-alojado)
A solicitud del usuario/agencia, es posible prescindir de Vercel y alojar **tanto el Frontend (Next.js) como el Backend (WordPress)** en el mismo servidor de hosting (cPanel, Hostinger, SiteGround, VPS):
1. **Método A (Exportación Estática para hosting compartido estándar):**
   - Configurar `output: 'export'` e `images: { unoptimized: true }` en `next.config.ts`.
   - Compilar con `npm run build` para generar la carpeta `out/`.
   - Subir el contenido de `out/` a `public_html/` vía FTP o Administrador de Archivos de cPanel.
2. **Método B (Node.js en cPanel):**
   - Utilizar el módulo nativo *"Setup Node.js App"* de cPanel con Node.js 18 o 20 y ejecutar `npm run start`.
3. **Distribución recomendada de dominios:**
   - Frontend público: `tuagencia.com` (o dominio raíz).
   - Backend WordPress / API: `cms.tuagencia.com` (subdominio en el mismo hosting) o subcarpeta `/wp-admin`.
4. **Beneficios para la agencia:**
   - Facturación única mensual sin costes adicionales de Vercel.
   - Todo bajo control del cliente: base de datos MySQL, mediateca de imágenes y archivos estáticos.
   - Sin límites de ejecución ni cuotas de peticiones de terceros.
