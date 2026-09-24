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
