# ⚙️ FASE 4 — DESARROLLO DE LA API Y BACKEND CON SUPABASE

## 1. Objetivo de la fase
La Fase 4 tiene como objetivo desarrollar la parte backend del sistema utilizando Supabase.
En términos sencillos, el backend será la parte encargada de:
- recibir y gestionar información;
- guardar, consultar, modificar y eliminar información (CRUD);
- autenticar usuarios y controlar permisos;
- almacenar imágenes;
- proporcionar funciones de servidor para procesos especiales.

En este proyecto no se utilizará un backend independiente (Node.js, Express, etc.).
Supabase será el backend del sistema con esta arquitectura:

```
┌─────────────────────┐
│       USUARIO       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│       REACT         │
│    TypeScript       │
└──────────┬──────────┘
           │
           ▼
┌────────────────────────────────┐
│            SUPABASE            │
│                                │
│  Auth                          │
│  PostgreSQL                    │
│  RLS                           │
│  Storage                       │
│  Edge Functions                │
└────────────────────────────────┘
```

## 2. ¿Qué significa "backend" en este proyecto?
- **FRONTEND**: Lo que el usuario ve y utiliza (React/Next.js)
- **BACKEND**: Lo que ocurre detrás (Supabase)
- **BASE DE DATOS**: Donde se almacena la información (PostgreSQL)

## 3. ¿Por qué utilizaremos Supabase?
Permite disponer de todas estas piezas clave sin construir la infraestructura desde cero:
- Authentication
- PostgreSQL
- Row Level Security
- Storage
- Edge Functions

## 4. Arquitectura backend del sistema
```
                      REACT
                         │
            ┌────────────┼────────────┐
            │            │            │
            ▼            ▼            ▼
          AUTH          CRUD        STORAGE
            │            │            │
            └────────────┼────────────┘
                         ▼
                    SUPABASE
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
   PostgreSQL           RLS          Storage
        │
        │
        ▼
   Tablas del sistema

        │
        │ procesos especiales
        ▼
   Edge Functions
```

## 5. ¿Cuándo React se comunica directamente con Supabase?
Las operaciones CRUD normales (crear landing, consultar plantilla, etc.) se realizan directamente desde React hacia Supabase usando su SDK. Las políticas de RLS garantizan la seguridad.

## 6. ¿Cuándo utilizaremos Edge Functions?
Cuando sea necesario ejecutar lógica segura en el servidor, como la futura integración con OpenAI. 
La clave de OpenAI (`OPENAI_API_KEY`) nunca debe estar en el código React. Estará protegida en la Edge Function.

## 8. Operaciones CRUD (Create, Read, Update, Delete)
La API permitirá al frontend comunicarse de manera estructurada con la base de datos a través de los servicios que crearemos.

## 10. Autenticación mediante Supabase Auth
Supabase Auth gestiona las credenciales (Email/Password) y mantiene las sesiones (tabla `auth.users`).

## 11. Diferencia entre auth.users y profiles
- `auth.users`: Tabla interna de Supabase que maneja la sesión real.
- `profiles`: Nuestra tabla pública donde guardamos datos de negocio (Nombre, Rol) conectada a `auth.users` 1 a 1.

## 13. Row Level Security — RLS (Seguridad a nivel de fila)
Controla qué registros puede consultar o modificar cada usuario. La seguridad está en Supabase, no depende únicamente del frontend.

## 15-21. API para las diferentes tablas
Tendremos control CRUD para:
- `businesses`
- `landings`
- `sections` (Almacenará en JSONB el contenido flexible)
- `images` (Archivo en Supabase Storage, ruta en PostgreSQL)
- `templates`
- `ai_generations`

## 22. Servicios del frontend
React no tendrá consultas repartidas en todos los componentes. Se utilizará una estructura de servicios (`src/services/` o `app/services/`):
- `authService.ts`: login, logout.
- `businessService.ts`: operaciones de empresa.
- `landingService.ts`: gestión de landings.
- `imageService.ts`: subida/borrado de imágenes.
- `generationService.ts`: conexión con la Edge Function.

## 28. Edge Functions
Existirá una función principal `generate-landing` en Supabase.
**Flujo**: React → Edge Function → OpenAI → Validar respuesta → React.

## 30-31. Validación y Manejo de errores
El backend (y RLS) validará los datos. Si fallan o el usuario no tiene permisos, devolverá códigos HTTP (401, 403, 404, 500) que el frontend traducirá a mensajes de usuario.

## 35. Flujo preparado para IA
La IA se implementará en la Fase 5, pero la Fase 4 debe dejar el flujo de backend listo. La IA usará datos existentes (`landings`, `sections`, `businesses`) como contexto para generar las descripciones o contenidos.

## 37. Seguridad de las credenciales
- Frontend (`.env`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Backend/Edge Functions: `OPENAI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

## 38. Estructura del backend (Supabase)
```
supabase/
│
├── functions/
│   │
│   ├── generate-landing/
│   │   └── index.ts
│   │
│   └── _shared/
│       ├── prompts.ts
│       ├── validators.ts
│       └── openai.ts
│
└── migrations/
```

## 40. Orden de implementación de la Fase 4
1. Crear proyecto Supabase
2. Configurar PostgreSQL (Tablas y Relaciones)
3. Configurar Auth y perfiles
4. Configurar RLS
5. Configurar Storage
6. Probar operaciones CRUD
7. Crear servicios de acceso desde React
8. Preparar Edge Functions

## 45. Criterio para considerar terminada la Fase 4
El backend y la capa API de servicios en frontend funcionan, los usuarios pueden autenticarse, se pueden guardar datos e imágenes y las Edge Functions base están creadas. A partir de ese punto, se pasa a la Fase 5 (Inteligencia Artificial).
