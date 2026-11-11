# 🗄️ FASE 3 — DISEÑO DE LA BASE DE DATOS

## 3.0. ¿Qué estamos haciendo en esta fase?
En las fases anteriores definimos:
- **Fase 1** → ¿Qué problema vamos a resolver?
- **Fase 2** → ¿Cómo funcionará el sistema?

Ahora:
- **Fase 3** → ¿Qué información necesita guardar el sistema y cómo vamos a organizarla?

Una forma sencilla de entenderlo es imaginar que tu sistema tiene varios archivadores:
```
                   🗄️ BASE DE DATOS
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
     👤 Usuarios      🌐 Landings       📐 Plantillas
        │                 │
        │                 │
        │                 ├── 📦 Secciones
        │                 │
        │                 ├── 🖼️ Imágenes
        │                 │
        │                 └── 🤖 Historial IA
        │
        └── permisos
```
Cada archivador será una tabla.

## 3.1. ¿Qué estamos construyendo exactamente?
Nuestro proyecto es una:
**Aplicación web interna** para que una empresa turística pueda crear, editar, gestionar y publicar landing pages turísticas de forma rápida, organizada y estandarizada, utilizando herramientas de IA para asistir en la generación de contenido.

Estamos construyendo principalmente:
```
🏢 EMPRESA
      │
      ▼
🖥️ SISTEMA INTERNO
      │
      ├── 👤 Administradores
      ├── 👤 Empleados
      │
      ▼
🌐 CREACIÓN DE LANDINGS
      │
      ├── elegir plantilla
      ├── introducir información
      ├── subir imágenes
      ├── generar contenido con IA
      ├── editar
      └── publicar
```

## 3.2. Resultado del análisis de las 3 landings
Después de analizar tres páginas de ejemplo, notamos diferentes tipos de contenido: Hero, Destinos, Tours, Galería, Testimonios, Itinerario, etc.

## 3.3. 🚨 No todas las landings tienen exactamente las mismas secciones
Por eso utilizaremos una estructura flexible:
```
LANDING
   │
   └── SECTIONS
          │
          ├── hero
          ├── tours
          ├── gallery
          ├── itinerary
          ├── testimonials
          ├── blog
          ├── faq
          ├── cta
          └── footer
```

## 3.4. ¿Qué es una base de datos?
Es un sistema organizado para guardar información.
En nuestro proyecto utilizaremos: **PostgreSQL, mediante Supabase**.

## 3.5. ¿Qué es Supabase?
```
                ☁️ SUPABASE
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
   🔐 Auth      🗄️ PostgreSQL   📁 Storage
   Usuarios       Datos          Imágenes
```

## 3.6. Tablas definitivas
Son 6 tablas principales:
- `profiles`
- `templates`
- `landings`
- `sections`
- `images`
- `ai_generations`

## 3.7. 👤 Tabla `profiles`
Para almacenar información adicional de las personas que utilizan el sistema (sin contraseñas, que van en Supabase Auth).
- `id` (UUID) - primary key referenciando a `auth.users`
- `full_name`
- `role` (admin/employee)

## 3.10. 📐 Tabla `templates`
Contiene las plantillas disponibles. Una plantilla es una estructura prediseñada.
- `id` (UUID - Primary Key)
- `code` (TEXT - UNIQUE, ej. `'agency-portal'`, `'adventure'`, `'cultural'`, `'premium'`, `'boho-nature'`)
- `name` (TEXT - Nombre público)
- `description` (TEXT - Detalle del estilo y propósito comercial)
- `status` (TEXT - 'active' / 'inactive')

### Catálogo de Plantillas Iniciales Registradas:
1. **`agency-portal` (Opción 1 Pinterest - Plantilla Oficial de Alta Conversión):**
   - **Hero:** Portada Vinicunca con botones dinámicos con efecto shimmer y badges de calificación flotantes.
   - **Métricas:** Barra de impacto numérico (+10,000 viajeros, 10+ años, 4.9/5).
   - **Catálogo de Tours:** Filtros por categoría en vivo (Trekking, Machu Picchu, Valle Sagrado, Adrenalina).
   - **¿Por qué elegirnos?:** Credenciales de guías con baliza en vivo + 4 Pilares de Calidad ("Creando Conexiones").
   - **Paquetes:** Circuitos completos multi-día con botón de itinerario.
   - **Reseñas Verificadas:** Fila de 3 tarjetas oscuras con verificación y puntuación 5 estrellas.
   - **Soporte & FAQ:** Foro de ayuda y mesa de consultas con protección anti-spam multicapa.
   - **CTA Gigante & Sellos:** Banner de contacto rápido y acreditaciones MINCETUR/DIRCETUR.
2. **`adventure`:** Aventura & Trekking andino.
3. **`cultural`:** Tradición histórica y circuitos arqueológicos.
4. **`premium`:** Experiencias de lujo y confort VIP.
5. **`boho-nature`:** Ecoturismo y naturaleza relajada.

## 3.12. 🌐 Tabla `landings`
Representa una landing concreta (ej. Machu Picchu Full Day).
- `id`, `template_id`, `created_by`, `name`, `slug`, `language`, `status`

## 3.16. 📦 Tabla `sections`
Una landing está formada por diferentes secciones.
- `id`, `landing_id`, `type`, `content` (JSONB), `order_index`, `enabled`

### 3.22. ⭐ ¿Qué es JSONB?
JSONB permite guardar información estructurada que puede variar dependiendo del `type` de sección. Esto evita tener una tabla por cada tipo de sección.

## 3.27. 🖼️ Tabla `images`
La base de datos solo guarda la información necesaria para localizar la imagen (que estará físicamente en Supabase Storage).
- `id`, `landing_id`, `section_id`, `storage_path`, `alt_text`

## 3.30. 🤖 Tabla `ai_generations`
Guarda un historial de operaciones realizadas mediante IA (auditoría, depuración). La IA tomará los datos como contexto desde `landings` y `sections`.
- `id`, `landing_id`, `user_id`, `prompt`, `response` (JSONB), `model`

## 3.37. Relaciones entre las tablas (Modelo ER)
- `PROFILES` 1 ─────── N `LANDINGS`
- `TEMPLATES` 1 ─────── N `LANDINGS`
- `LANDINGS` 1 ─────── N `SECTIONS`
- `SECTIONS` 1 ─────── N `IMAGES`
- `LANDINGS` 1 ─────── N `AI_GENERATIONS`
- `PROFILES` 1 ─────── N `AI_GENERATIONS`

## 3.50. 🔐 Seguridad (RLS)
Utilizaremos Supabase Auth + Row Level Security (RLS) para proteger los datos y validar roles.

## 3.60. 🚫 Tablas que NO necesitamos
No crearemos tablas para CRM, reservas, planes SaaS, ni tiendas online, para mantener el MVP sencillo. Tampoco crearemos tablas como `tours` todavía, porque en la primera versión se almacenarán en el JSONB de `sections.content`. Si luego se requieren filtros complejos, se podrán crear tablas específicas.

## 3.71. 📋 Entregables de la Fase 3
1. **Identificación de entidades**: 6 tablas núcleo + soporte para Requisitos de Jefatura (`service_tiers`, `support_tickets`, `support_messages` detallados en [`docs/requisitos_adicionales_planes_y_soporte.md`](file:///c:/Users/copyw/.gemini/antigravity-ide/scratch/cusco-creativos-web/docs/requisitos_adicionales_planes_y_soporte.md))
2. **Diccionario de datos**
3. **Relaciones**: 1:N
4. **Restricciones**: NOT NULL, UNIQUE, CHECK, DEFAULT
5. **Seguridad**: RLS, Supabase Auth
6. **Almacenamiento**: PostgreSQL + Supabase Storage
7. **Modelo ER**

## 🔵 ¿Qué viene después?
El siguiente paso será probar la estructura con datos ficticios (PRUEBA DE BD) y luego pasar a la **FASE 4 — API + BACKEND**.
