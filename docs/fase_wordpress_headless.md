# 🏛️ FASE ESTRATÉGICA: TRANSICIÓN A WORDPRESS HEADLESS COMO BACKEND

## 1. Visión y Justificación del Cambio
A solicitud de Jefatura / Dirección de la Agencia Cusco Creativos, la arquitectura de backend evoluciona de **Supabase (PostgreSQL)** hacia **WordPress Headless (WP REST API)**.

### ¿Por qué este cambio?
1. **Familiaridad Operativa:** El equipo de la agencia y los clientes ya conocen y administran el panel tradicional de WordPress (`wp-admin`).
2. **Optimización de Costos de Infraestructura:** Se aprovechan los hostings/servidores existentes de la agencia sin incurrir en cuotas mensuales por volumen en Supabase.
3. **Mediateca Centralizada:** Gestión nativa de imágenes, compresión y recortes en el servidor de WordPress.
4. **Mantenimiento del Rendimiento:** Next.js continúa desplegado en Vercel ofreciendo tiempos de carga ultrarrápidos (Edge Caching, Server Components y Static Generation).

---

## 2. Nuevo Mapa de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                 FRONTEND (NEXT.JS EN VERCEL)                │
│                                                             │
│  - Dashboard de Control & Métricas                          │
│  - Formulario Generador de Tours                            │
│  - Editor en Tiempo Real & Selector de Plantillas (1 a 5)   │
│  - Renderizador de Landings Públicas (/p/[slug])            │
└──────────────────────────┬──────────────────▲───────────────┘
                           │                  │
        1. Pide textos     │                  │ 4. Lee datos JSON
        y enriquecimiento  │                  │    para renderizar
                           ▼                  │
                   ┌───────────────┐          │
                   │    OPENAI     │          │
                   │ (GPT-4o/Mini) │          │
                   └───────┬───────┘          │
                           │                  │
            2. Devuelve    │                  │
               JSON        ▼                  │
                   ┌──────────────────────────┴───────────────┐
                   │        BACKEND (WORDPRESS HEADLESS)       │
                   │                                          │
                   │  - Custom Post Type: "landing"           │
                   │  - Campo Meta: "landing_data" (JSON)     │
                   │  - Autenticación: Application Passwords  │
                   │  - Mediateca WP: (/wp-json/wp/v2/media)   │
                   │  - Base de Datos MySQL propia            │
                   └──────────────────────────────────────────┘
```

---

## 3. Matriz de Responsabilidades

| Componente | Rol en el Sistema |
| :--- | :--- |
| **Next.js (App Router)** | Aplicación web principal, Dashboard de la agencia, previsualizador interactivo y renderizador público de alta velocidad. |
| **OpenAI API** | Motor cognitivo: redacta textos persuasivos, itinerarios, políticas y FAQs según el objetivo comercial (WhatsApp vs Cotización). |
| **WordPress Headless** | CMS de almacenamiento seguro, repositorio de imágenes y panel administrativo alternativo para el equipo de Cusco Creativos. |
| **WP REST API** | Puente de comunicación HTTP autenticado mediante Application Passwords entre Next.js y WordPress. |

---

## 4. Requerimientos Técnicos en WordPress

### A. Custom Post Type (`landing`)
Registrado con soporte para REST API:
```php
register_post_type('landing', [
    'labels' => ['name' => 'Landings Turísticas', 'singular_name' => 'Landing'],
    'public' => true,
    'has_archive' => false,
    'show_in_rest' => true,
    'rest_base' => 'landings',
    'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
]);
```

### B. Registro de Campo Meta (`landing_data`)
Permite guardar y devolver el objeto JSON completo de la landing (`LandingData`):
```php
register_post_meta('landing', 'landing_data', [
    'show_in_rest' => [
        'schema' => [
            'type' => 'object',
            'additionalProperties' => true,
        ],
    ],
    'single' => true,
    'type' => 'object',
]);
```

### C. Autenticación de la API
* Creación de usuario administrador/editor específico (ej: `nextjs_service`).
* Generación de **Application Password** nativa desde `Usuarios -> Tu Perfil -> Contraseñas de aplicación`.

---

## 5. Implementación en Next.js (Hoja de Ruta de Código)

1. **Variables de Entorno (`.env.local` y Vercel):**
   ```env
   NEXT_PUBLIC_WORDPRESS_URL=https://cms.cuscocreativos.com
   WORDPRESS_API_USER=nextjs_service
   WORDPRESS_APPLICATION_PASSWORD=xxxx xxxx xxxx xxxx
   ```

2. **Cliente API WordPress (`src/lib/wordpress.ts`):**
   * `getLandingsFromWP()`: Consume `GET /wp-json/wp/v2/landings?per_page=100`.
   * `getLandingBySlugFromWP(slug)`: Consume `GET /wp-json/wp/v2/landings?slug=${slug}`.
   * `createLandingInWP(landingData)`: Envía `POST /wp-json/wp/v2/landings`.
   * `updateLandingInWP(id, landingData)`: Envía `POST /wp-json/wp/v2/landings/${id}`.
   * `deleteLandingInWP(id)`: Envía `DELETE /wp-json/wp/v2/landings/${id}`.

3. **Subida de Fotografías:**
   * Las imágenes seleccionadas en el formulario se pueden enviar a `/wp-json/wp/v2/media` para alojarse en `wp-content/uploads/` y quedar disponibles con URL permanente.

---

## 6. Estado Actual y Checklist de Activación
- [x] Arquitectura conceptual aprobada por Jefatura.
- [x] Documentación y especificación técnica consolidada.
- [ ] Recepción de URL de WordPress de la agencia (ej: `https://cms.cuscocreativos.com`).
- [ ] Creación de usuario y Application Password en WordPress.
- [ ] Implementación de `src/lib/wordpress.ts` en Next.js.
- [ ] Pruebas de guardado y lectura desde el Dashboard.
