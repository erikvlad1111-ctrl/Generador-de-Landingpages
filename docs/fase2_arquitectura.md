# 🏗️ FASE 2 — ARQUITECTURA DEL SISTEMA

## 0. Primero: ¿qué estamos construyendo?
Tu sistema será una aplicación web interna para generar landing pages turísticas. La idea completa es: El proyecto consiste en desarrollar una aplicación web interna que permita al personal de la empresa generar landing pages turísticas de forma semiautomática, utilizando inteligencia artificial para generar contenido y un sistema de plantillas para controlar la estructura, diseño y presentación de las páginas, permitiendo posteriormente su edición, previsualización, almacenamiento y exportación.

La idea es que el trabajador pueda ingresar la información de un negocio turístico, seleccionar cómo quiere que sea la landing y dejar que el sistema genere automáticamente gran parte del contenido.

¿Cuál es la idea principal?
La clave del proyecto es separar el trabajo de la IA del trabajo del sistema:
**IA 🤖**
- Genera títulos
- Genera descripciones
- Genera beneficios
- Genera FAQ
- Genera CTA
- Propone contenido

**Sistema ⚙️**
- Controla estructura
- Controla diseño
- Aplica plantillas
- Controla colores
- Controla responsive
- Organiza secciones

**Usuario 👨💻**
- Ingresa datos
- Carga imágenes
- Selecciona plantilla
- Edita contenido
- Revisa resultado
- Guarda/exporta

```
                   👤 TRABAJADOR
                         │
                         ▼
                ┌─────────────────┐
                │   APLICACIÓN    │
                │      WEB        │
                └────────┬────────┘
                         │
                 Introduce información
                         │
                         ▼
                ┌─────────────────┐
                │     REACT       │
                │   INTERFAZ WEB  │
                └────────┬────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
        ┌───────────┐       ┌────────────────┐
        │ SUPABASE  │       │ SUPABASE EDGE  │
        │           │       │   FUNCTION     │
        │ Auth      │       │                │
        │ Database  │       │ Lógica IA      │
        │ Storage   │       │ Validaciones   │
        └───────────┘       └───────┬────────┘
                                    │
                                    ▼
                               ┌──────────┐
                               │  OPENAI  │
                               │ Contenido│
                               └────┬─────┘
                                    │
                                    ▼
                           JSON ESTRUCTURADO
                                    │
                                    ▼
                           PLANTILLA DEL SISTEMA
                                    │
                                    ▼
                            LANDING GENERADA
                                    │
                                    ▼
                                👀 PREVIEW
                                    │
                                    ▼
                                 ✏️ EDITAR
                                    │
                                    ▼
                                💾 GUARDAR
                                    │
                                    ▼
                               SUPABASE
                                    │
                                    ▼
                               📦 EXPORTAR
```

La arquitectura tiene tres grandes niveles:
```
┌───────────────────────────────────┐
│ 1. FRONTEND                       │
│ Lo que ve y utiliza el usuario    │
│ Next.js + TypeScript + Tailwind   │
└─────────────────┬─────────────────┘
                  │
                  ▼
┌───────────────────────────────────┐
│ 2. BACKEND                        │
│ Supabase + Edge Functions         │
│ Lógica y operaciones del sistema  │
└─────────────────┬─────────────────┘
                  │
                  ▼
┌───────────────────────────────────┐
│ 3. SERVICIOS Y DATOS              │
│ PostgreSQL + Auth + Storage + AI  │
└───────────────────────────────────┘
```

## 1. FRONTEND
¿Qué es?
Es la aplicación que verá el trabajador en el navegador.
Tecnologías:
Next.js + TypeScript + Tailwind CSS

Por ejemplo, cuando abre el sistema verá:
```
┌──────────────────────────────────────────────┐
│ 🚀 Landing Generator                         │
├──────────────────────────────────────────────┤
│                                              │
│ Dashboard                                    │
│                                              │
│ Mis proyectos                                │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ Machu Picchu 3 días                      │ │
│ │ Tour                                     │ │
│ │                                          │ │
│ │ [Editar] [Preview] [Exportar]            │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│             [+ Nueva landing]                │
│                                              │
└──────────────────────────────────────────────┘
```

## 2. ¿Qué pantallas tendrá el Frontend?
El flujo será:
LOGIN → DASHBOARD → NUEVA LANDING → DATOS DEL NEGOCIO → CONFIGURACIÓN → GENERACIÓN → EDITOR → PREVIEW → EXPORTACIÓN

Pantalla 1 — Login
```
┌──────────────────────────────┐
│       LANDING GENERATOR      │
│                              │
│ Correo                       │
│ [__________________________] │
│                              │
│ Contraseña                   │
│ [__________________________] │
│                              │
│      [ Iniciar sesión ]      │
│                              │
│ ¿Olvidaste tu contraseña?    │
└──────────────────────────────┘
```
Aquí React se comunica con Supabase Auth.

## 3. Dashboard
Después del login:
```
┌─────────────────────────────────────────────┐
│ Dashboard                         [Usuario] │
├─────────────────────────────────────────────┤
│                                             │
│ Mis Landings                                │
│                                             │
│ ┌─────────────────────┐                     │
│ │ Machu Picchu        │                     │
│ │ Tour                │                     │
│ │                     │                     │
│ │ [Editar] [Preview]  │                     │
│ └─────────────────────┘                     │
│                                             │
│ ┌─────────────────────┐                     │
│ │ Cusco Premium       │                     │
│ │ Hotel               │                     │
│ └─────────────────────┘                     │
│                                             │
│          [+ Crear landing]                  │
└─────────────────────────────────────────────┘
```
El Dashboard obtiene los proyectos desde Supabase PostgreSQL.
Aquí no necesitamos un servidor Node.js intermedio para una operación CRUD normal.

## 4. Crear una landing
El usuario pulsa "+ Crear landing" y aparece:
```
┌──────────────────────────────────────┐
│ Crear nueva landing                  │
├──────────────────────────────────────┤
│                                      │
│ Nombre del negocio                   │
│ [__________________________________] │
│                                      │
│ Tipo                                 │
│ [ Tour operador              ▼ ]     │
│                                      │
│ Descripción                          │
│ [__________________________________] │
│ [__________________________________] │
│                                      │
│ WhatsApp                             │
│ [__________________________________] │
│                                      │
│          [Continuar]                 │
└──────────────────────────────────────┘
```
Estos datos posteriormente se guardarán en Supabase PostgreSQL.

## 5. Configuración
Después:
```
┌──────────────────────────────────────┐
│ Configurar landing                   │
├──────────────────────────────────────┤
│                                      │
│ Plantilla                            │
│ ○ Aventura                           │
│ ○ Premium                            │
│ ○ Corporativa                        │
│                                      │
│ Estilo                               │
│ ○ Moderno                            │
│ ○ Elegante                           │
│ ○ Minimalista                        │
│                                      │
│ Idioma                               │
│ ○ Español                            │
│ ○ Inglés                             │
│                                      │
│ Secciones                            │
│ ☑ Hero                               │
│ ☑ Presentación                       │
│ ☑ Paquetes                           │
│ ☑ Galería                            │
│ ☐ Testimonios                        │
│ ☐ FAQ                                │
│ ☑ CTA                                │
│                                      │
│        [Generar landing]             │
└──────────────────────────────────────┘
```
Aquí el usuario está configurando, no diseñando desde cero.

## 6. ¿Qué sucede cuando pulsa "Generar"?
Aquí empieza la parte importante. El frontend en Next.js envía la información a una Supabase Edge Function.
Para la generación de IA, no es necesario crear una API con Node.js + Express por separado.

## 7. BACKEND
Aquí utilizaremos:
Supabase + Supabase Edge Functions

Supabase será el backend principal del sistema. Las funciones de Supabase serán:
- Autenticación
- Base de datos
- Almacenamiento
- Seguridad mediante RLS
- Lógica de servidor mediante Edge Functions
- Generación de contenido mediante OpenAI

El usuario nunca ve directamente la lógica interna de las Edge Functions.

## 8. ¿Qué hará exactamente el Backend?
Cuando recibe una solicitud de generación:
**Paso 1 — Recibe datos**
**Paso 2 — Verifica al usuario** mediante Supabase Auth
**Paso 3 — Valida los datos** (por ejemplo, que no esté vacío el nombre)

## 9. Paso 4 — Crear el JSON
La Edge Function organiza la información en un JSON que representa lo que el usuario quiere construir.

## 10. Paso 5 — La Edge Function llama a OpenAI
OpenAI recibe instrucciones y la Edge Function recibe el contenido de las secciones solicitadas.

## 11. MUY IMPORTANTE: la IA no devuelve el diseño
La IA devuelve CONTENIDO (título, texto, descripciones, etc.), no HTML ni CSS. Tu sistema ya tiene las plantillas y decide la estructura.

## 12. Paso 6 — Validar respuesta de IA
La Supabase Edge Function valida que OpenAI haya devuelto un JSON válido.

## 13. Paso 7 — El Frontend recibe el JSON
Next.js ya tiene las plantillas y ahora tiene su contenido estructurado.

## 14. ¿Cómo se genera visualmente la landing?
Tus componentes React (ej. Navbar.tsx, Hero.tsx, Presentation.tsx) se utilizan según la plantilla seleccionada.

## 15. ¿Dónde está Tailwind?
Tailwind controla el aspecto (tamaño, colores, márgenes) de esos componentes. La IA no decide esto, lo decide tu código.

## 16. Resultado
Se muestra la landing previsualizada estructurada con los componentes y estilos definidos.

## 17. EDITOR
El usuario podrá modificar la landing por secciones, no de forma libre (no es Canva). Al lado habrá una preview de los cambios.

## 18. ¿Dónde se guardan los cambios?
Cuando pulsa guardar: EDITOR → NEXT.JS → SUPABASE → POSTGRESQL.

## 19. ¿Dónde se guardan las imágenes?
En Supabase Storage, y PostgreSQL guarda la referencia (ruta del archivo).

## 20. ¿Dónde está la seguridad?
Las claves privadas (como OPENAI_API_KEY) estarán solo en el entorno seguro de Edge Functions. La clave pública de Supabase se usará en el frontend, protegida con RLS.

## 21. ¿Qué hace Supabase exactamente?
- Auth: Usuarios y sesiones.
- Database (PostgreSQL): Datos de las landings.
- Storage: Imágenes.
- Edge Functions: Lógica de servidor y comunicación con OpenAI.

## 22. ¿Qué hace OpenAI?
Solo generación de contenido (textos, beneficios, etc.).

## 23. ¿Qué hace el Backend?
En esta arquitectura, el backend es Supabase y sus Edge Functions. Las operaciones CRUD normales van directo de React a Supabase. Las operaciones complejas (IA) pasan por Edge Functions.

## 24. Arquitectura completa
FRONTEND (Next.js + TS + Tailwind) ↔ SUPABASE (Auth, DB, Storage) + EDGE FUNCTIONS ↔ OPENAI.

## 25. Flujo completo de una generación
1. Usuario ingresa datos
2. Next.js envía datos
3. Edge function valida
4. Envía JSON a OpenAI
5. OpenAI genera
6. Retorna JSON a Edge Function
7. Edge Function valida/guarda
8. Next.js aplica plantilla
9. Landing final

## 26. Y la idea central de tu tesis
Tu sistema tiene dos motores diferentes: IA (genera contenido) y SISTEMA (aplica diseño mediante plantillas).

## 27. Stack definitivo propuesto
- Interfaz: Next.js (React)
- Lenguaje: TypeScript
- Estilos: Tailwind CSS
- Backend/BD/Auth/Storage: Supabase
- Lógica IA: Supabase Edge Functions + OpenAI API
- Hosting: Vercel (Frontend)

## 📁 Estructura general de CARPETAS

```text
landing-generator/
│
├── frontend/ (Next.js App Router)
│   ├── public/
│   ├── app/ (Rutas y páginas)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── components/
│   │   ├── templates/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── lib/
│   │   └── ...
│
├── supabase/
│   ├── functions/
│   │   └── generate-landing/
│   │       └── index.ts
│   └── migrations/
│
├── .gitignore
├── README.md
└── package.json
```
