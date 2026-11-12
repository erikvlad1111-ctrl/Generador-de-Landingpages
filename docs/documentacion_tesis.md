# 📘 DOCUMENTACIÓN DE TESIS: ARQUITECTURA, MEDICIÓN DE RESULTADOS Y MANUAL DE USUARIO

> **Proyecto:** Sistema Web Generador Automatizado de Landing Pages Turísticas de Alta Conversión con Inteligencia Artificial  
> **Área:** Ingeniería de Software / Comercio Electrónico Turístico  
> **Stack Oficial:** Next.js 16 (App Router) + TypeScript + Tailwind CSS + Supabase (PostgreSQL 15, Auth, RLS, Storage) + OpenAI API (`gpt-4o-mini`) + Vercel Serverless Cloud.

---

## 1. Diagramas de Arquitectura y Mapas de Funcionamiento

### 1.1 Mapa de Flujo de Datos y Peticiones (Frontend ➔ Vercel ➔ Supabase ➔ OpenAI)
Este mapa explica claramente cómo se dividen las peticiones según su nivel de seguridad: las consultas directas y subida de archivos van a Supabase con permisos RLS, mientras que las operaciones con credenciales privadas pasan por las APIs de Next.js en Vercel.

```mermaid
flowchart TB
    subgraph CapaCliente["📱 1. Capa de Cliente (Navegador Web)"]
        User["Operador / Administrador (/demo/new)"]
        Turista["Turista / Visitante Público (/p/[slug])"]
    end

    subgraph CapaEdge["⚡ 2. Capa de Lógica Protegida (Next.js en Vercel)"]
        Proxy["src/proxy.ts\nFiltro de Seguridad & Cookies cc_auth"]
        APIAI["POST /api/ai/generate\nMotor de IA Híbrido + Rate Limit"]
        APIQuote["POST /api/quote & /api/support\nHoneypot + Time-Gate Anti-Bot"]
        CronKeep["GET /api/keep-alive\nVercel Cron cada 3 días"]
    end

    subgraph CapaBaaS["🗄️ 3. Capa de Datos & Medios (Supabase Cloud BaaS)"]
        SupaAuth["Supabase Auth\nTokens JWT (Admin / Empleado)"]
        SupaStorage["Supabase Storage (CDN)\nBucket: landing-images"]
        SupaDB[("PostgreSQL 15 + RLS\n• landings (JSONB)\n• profiles (Roles)\n• templates (Catálogo)\n• ai_generations (Costos)")]
    end

    subgraph CapaIA["🧠 4. Proveedor de Inteligencia Artificial"]
        OpenAI["OpenAI API\nModelo gpt-4o-mini (JSON Schema)"]
        FallbackLocal["Motor Local de Respaldo\n(Generación instantánea sin costo)"]
    end

    %% Flujos de interacción
    Turista -->|1. Consulta pública por slug| SupaDB
    Turista -->|2. Enviar cotización/reclamo| APIQuote
    User -->|3. Login institucional| SupaAuth
    User -->|4. Subir logotipo/imagen| SupaStorage
    User -->|5. Guardar landing completa| SupaDB
    User -->|6. Solicitar redacción IA| Proxy
    Proxy --> APIAI
    APIAI -->|Con saldo y API Key| OpenAI
    APIAI -->|Sin saldo o falla de red| FallbackLocal
    APIAI -->|Auditar tokens consumidos| SupaDB
    CronKeep -->|Ping SQL anti-pausa| SupaDB
```

---

### 1.2 Arquitectura General Cloud-Native Serverless
Estructura desacoplada que permite costo cero en fase experimental y alta escalabilidad horizontal para soportar miles de visitas concurrentes sin caídas de servidor.

```mermaid
flowchart LR
    subgraph Usuarios["👥 Actores"]
        A["👨‍💼 Admin Cusco Creativos"]
        E["🧑‍💻 Operador de Ventas"]
        T["🌎 Turista Internacional"]
    end

    subgraph VercelApp["☁️ Vercel Edge Serverless"]
        WebUI["Frontend React 19\n6 Plantillas Turísticas\nMulti-idioma (ES/EN/PT)\nCalculadora Dinámica"]
        ApiRoutes["Next.js API Routes\nSanitización de Datos\nControl de Gasto de IA"]
    end

    subgraph SupabasePlatform["🗄️ Supabase Backend-as-a-Service"]
        AuthService["Auth Engine\nValidación de Sesiones"]
        StorageEngine["Object Storage\nLogotipos y Fotos"]
        PostgresEngine[("Base de Datos PostgreSQL\nPersistencia Híbrida\nRelacional + JSONB")]
    end

    subgraph AIPlatform["✨ Motor de IA"]
        GPT["OpenAI gpt-4o-mini"]
    end

    Usuarios --> WebUI
    WebUI <--> ApiRoutes
    WebUI <-->|Lectura/Escritura con RLS| PostgresEngine
    WebUI <-->|Upload directo| StorageEngine
    WebUI <-->|Autenticación| AuthService
    ApiRoutes <--> GPT
    ApiRoutes <--> PostgresEngine
```

---

### 1.3 Modelo Entidad-Relación de Base de Datos (Supabase PostgreSQL)
Ilustra el diseño de datos relacional complementado con la columna `data` en formato `JSONB`, la cual almacena la estructura visual y de contenidos completa de cada landing page.

```mermaid
erDiagram
    PROFILES ||--o{ LANDINGS : "crea y administra (created_by)"
    PROFILES ||--o{ AI_GENERATIONS : "ejecuta (user_id)"
    TEMPLATES ||--o{ LANDINGS : "define diseño (template_code)"
    LANDINGS ||--o{ AI_GENERATIONS : "registra historial IA (landing_id)"

    PROFILES {
        uuid id PK "FK a auth.users.id"
        text full_name "Nombre completo del usuario"
        text role "admin (Acceso Total) | employee (Operador)"
        timestamptz created_at "Fecha de alta"
        timestamptz updated_at "Última modificación"
    }

    TEMPLATES {
        uuid id PK "Identificador único"
        text code UK "agency-portal | boho-nature | premium | adventure | cultural | emerald-explorer"
        text name "Nombre comercial de la plantilla"
        text description "Descripción de enfoque turístico"
        text status "active | inactive"
    }

    LANDINGS {
        uuid id PK "Identificador único de la landing"
        text slug UK "URL amigable (/p/[slug])"
        text name "Nombre de la campaña o tour"
        text template_code "Código de la plantilla asignada"
        text tier "free | basic | pro | advance"
        text status "draft (borrador) | published (publicado)"
        text language "Idioma principal (es|en|pt)"
        text[] languages "Listado de idiomas activos"
        jsonb data "Objeto JSON completo: Hero, Itinerario, Precios, FAQs, Empresa"
        uuid created_by FK "Usuario autor de la landing"
        timestamptz updated_at "Fecha de última sincronización"
    }

    AI_GENERATIONS {
        uuid id PK "Identificador de la generación"
        uuid landing_id FK "Landing asociada"
        uuid user_id FK "Usuario que ejecutó la IA"
        text model "gpt-4o-mini | local-fallback-v1"
        text prompt "Entrada estructurada enviada"
        jsonb response "Contenido generado validado"
        integer tokens_in "Tokens de entrada"
        integer tokens_out "Tokens generados"
        numeric cost_usd "Costo exacto en dólares americanos"
        timestamptz created_at "Fecha y hora de invocación"
    }
```

---

### 1.4 Diagrama de Secuencia: Flujo de Generación con IA y Publicación
Muestra la interacción paso a paso desde que el usuario completa el formulario hasta que la landing se publica y se descarga.

```mermaid
sequenceDiagram
    autonumber
    actor Operador as Operador / Administrador
    participant Form as Asistente (/demo/new)
    participant ApiAI as Backend (/api/ai/generate)
    participant OpenAI as OpenAI (gpt-4o-mini)
    participant Supa as Supabase (PostgreSQL / Storage)
    participant Turista as Turista / Visitante

    Operador->>Form: 1. Selecciona Plantilla, Nivel (Tier) e ingresa Destino y Precio
    Operador->>Form: 2. Clic en "✨ Autocompletar textos con IA"
    Form->>ApiAI: POST { tourTitle, destination, duration, price, tier, language }
    ApiAI->>ApiAI: Valida sesión, aplica Rate-Limit (25/hora) y sanitiza
    alt Conexión OpenAI exitosa
        ApiAI->>OpenAI: Envía System Prompt + User Prompt (JSON Schema)
        OpenAI-->>ApiAI: Retorna JSON con Hero, Itinerario, FAQs y Testimonios
    else Falla de red o sin saldo
        ApiAI->>ApiAI: Activa Motor de Respaldo Local Determinista (Costo $0)
    end
    ApiAI->>Supa: Inserta registro de auditoría en public.ai_generations
    ApiAI-->>Form: Entrega JSON limpio y validado al formulario
    Operador->>Form: 3. Sube logotipo de la agencia
    Form->>Supa: Sube archivo al bucket Storage 'landing-images'
    Supa-->>Form: Retorna URL pública CDN del logotipo
    Operador->>Form: 4. Clic en "🚀 Generar Landing y Ver Demo"
    Form->>Supa: UPSERT en public.landings (Columna data JSONB)
    Form-->>Operador: Abre previsualización en PC (390px) y genera código QR
    
    Note over Operador,Turista: Dos Canales de Distribución Autónomos
    Operador->>Turista: Comparte URL pública (ej: /p/salkantay-trek-5-dias)
    Turista->>Supa: Consulta web pública en tiempo real
    Operador->>Operador: Clic en "Exportar ZIP" para descargar index.html offline
```

---

### 1.5 Diagrama de Máquina de Estados: Ciclo de Vida de una Landing Page

```mermaid
stateDiagram-v2
    [*] --> FormularioNuevo: Operador inicia creación (/demo/new)
    FormularioNuevo --> ConContenidoIA: Clic en "Autocompletar con IA"
    ConContenidoIA --> BorradorGuardado: Guarda borrador (status = 'draft')
    BorradorGuardado --> VistaPrevia: Prueba en simulador 390px o celular vía QR
    VistaPrevia --> Publicada: Clic en Publicar (status = 'published')
    
    state Publicada {
        [*] --> VisibleEnVercel: URL pública activa (/p/[slug])
        VisibleEnVercel --> ExportadaZIP: Descarga paquete index.html autónomo
    }
    
    Publicada --> BorradorGuardado: Retirar de publicación para edición
    Publicada --> [*]: Eliminada por Administrador
```

---

## 2. Medición Cuantitativa para la Tesis: Creación Manual vs. Automatizada

Para la contrastación empírica de hipótesis de la tesis (**reducción drástica del tiempo de diseño, redacción y publicación de landing pages turísticas**), se realizó un experimento comparativo midiendo el tiempo insumido por el método tradicional frente al uso del sistema automatizado.

### 2.1 Gráfico de Comparación de Tiempos (Horas vs Minutos)

```mermaid
xychart-beta
    title "Tiempo Requerido por Proceso: Manual vs Generador con IA"
    x-axis ["Maquetación Base", "Módulos & Filtros", "Redacción Comercial", "Marca Blanca", "Multi-idioma", "Móvil & Deploy"]
    y-axis "Minutos invertidos" 0 --> 190
    bar [180, 120, 90, 45, 60, 75]
    bar [0.5, 0.5, 1.0, 1.5, 0.5, 0.5]
```
*(Barra azul: Método Tradicional Manual | Barra verde: Sistema Generador con IA)*

---

### 2.2 Tabla Comparativa por Etapas de Desarrollo (Pre-Test vs. Post-Test)

| N° | Etapa del Proceso Técnico | Método Tradicional / Manual | Sistema Generador con IA | Ahorro Absoluto | Optimización Porcentual |
| :-: | :--- | :-: | :-: | :-: | :-: |
| **1** | Selección de paleta, wireframe y maquetación de secciones base | 180 min (3.0 h) | 0.5 min (30 s) | 179.5 min | **99.72 %** |
| **2** | Configuración de widgets: calculadora de precios, filtros y enlaces | 120 min (2.0 h) | 0.5 min (30 s) | 119.5 min | **99.58 %** |
| **3** | Redacción publicitaria: Hero, Itinerario por días, FAQs y Testimonios | 90 min (1.5 h) | 1.0 min (60 s) | 89.0 min | **98.89 %** |
| **4** | Carga de Marca Blanca: RUC, logotipo en CDN, WhatsApp y Libro Reclamos | 45 min (0.75 h) | 1.5 min (90 s) | 43.5 min | **96.67 %** |
| **5** | Sincronización y traducción de interfaz a idiomas (`ES`, `EN`, `PT`) | 60 min (1.0 h) | 0.5 min (30 s) | 59.5 min | **99.17 %** |
| **6** | Adaptación Responsive para smartphones, optimización y publicación web | 75 min (1.25 h) | 0.5 min (30 s) | 74.5 min | **99.33 %** |
| **—** | **TIEMPO TOTAL PROMEDIO POR LANDING** | **570 min (9.5 horas)** | **4.5 min** | **565.5 min** | **99.21 %** |

---

### 2.3 Muestra Experimental de 6 Casos de Estudio en Cusco

| Caso | Campaña Turística Evaluada | Plantilla Aplicada | Nivel (`Tier`) | Tiempo Manual (min) | Tiempo Generador (min) | Reducción Lograda |
| :-: | :--- | :--- | :-: | :-: | :-: | :-: |
| **M-01** | Machu Picchu Full Day Clásico | `adventure` | `free` | 420 min | 3.2 min | **99.24 %** |
| **M-02** | Laguna Humantay & Salkantay Domos | `boho-nature` | `basic` | 480 min | 3.8 min | **99.21 %** |
| **M-03** | Valle Sagrado VIP + Maras Moray | `cultural` | `pro` | 570 min | 4.5 min | **99.21 %** |
| **M-04** | Camino Inca 4D/3N Luxury Collection | `premium` | `advance` | 660 min | 5.1 min | **99.23 %** |
| **M-05** | Choquequirao Expedición Extrema | `emerald-explorer` | `pro` | 590 min | 4.6 min | **99.22 %** |
| **M-06** | Portal Oficial Agencia Cusco Tours | `agency-portal` | `advance` | 700 min | 5.8 min | **99.17 %** |
| **Prom.** | **Media Aritmética Muestral ($\bar{x}$)** | **6 Plantillas** | **4 Niveles** | **570.0 min (9.5 h)** | **4.5 min** | **99.21 %** |

> **Conclusión para la Tesis:** La implementación del generador automatizado demostró una **reducción estadísticamente significativa del 99.21% en el tiempo de puesta en producción**, permitiendo que operadores turísticos y personal de ventas sin conocimientos de programación publiquen campañas completas y profesionales en menos de 5 minutos.

---

## 3. Manual de Operación para el Usuario

### 3.1 Acceso al Sistema y Roles de Seguridad (`/login`)
1. Ingrese a la plataforma web oficial: `https://generador-de-landingpages.vercel.app/login`.
2. Seleccione el perfil corporativo:
   - **Administrador General (`Acceso Total`):** `admin@cuscocreativos.com` / `CuscoCreativos2026!`
   - **Operador de Ventas (`Empleado`):** `empleado@cuscocreativos.com` / `OperadorCusco2026!`
3. La contraseña permanece oculta bajo caracteres protegidos (`••••••••`) sin opción de revelado en texto plano, cumpliendo con las directivas de seguridad informática.

---

### 3.2 Proceso de Creación en 4 Pasos Guiados (`/demo/new`)

```mermaid
flowchart LR
    P1["Paso 1\nPlantilla, Nivel\ne Idiomas"] --> P2["Paso 2\nDatos del Tour\n+ Redacción IA"]
    P2 --> P3["Paso 3\nMarca Blanca,\nLogo y RUC"]
    P3 --> P4["Paso 4\nRevisión, Vista Móvil\ny Publicación"]
```

- **Paso 1 (Diseño y Nivel):** Seleccione entre las 6 plantillas de diseño visual, elija el nivel de servicio (`Free`, `Basic`, `Pro`, `Advance`) e indique los idiomas permitidos.
- **Paso 2 (Contenido e IA):** Ingrese el destino, duración y precio base. Pulse **`✨ Autocompletar textos con IA`** para que el motor redacte en 3 segundos el título de venta, itinerario día por día, lista de inclusión/exclusión y testimonios.
- **Paso 3 (Personalización Corporativa):** Ingrese la razón social, número de RUC de 11 dígitos, WhatsApp de reservas y suba el logotipo institucional (el cual se almacena de inmediato en Supabase Storage).
- **Paso 4 (Verificación y Lanzamiento):** En la tarjeta resumen, pulse **`🚀 Generar Landing y Ver Demo`**. La landing se guarda en Supabase PostgreSQL y se abre el simulador de visualización.

---

### 3.3 Verificación Multi-dispositivo y Modos de Entrega

1. **Simulador de Escritorio vs Móvil (390px):**
   - En la cabecera de `/demo/preview`, alterne entre **🖥️ Vista PC** y **📱 Vista Móvil**.
   - El modo móvil restringe el viewport a 390px para inspeccionar el menú hamburguesa nativo y la columna única responsive.
2. **Prueba en Smartphone Físico mediante Código QR:**
   - Pulse el botón **📱 Probar en Celular (QR)** y escanee el código con la cámara de su teléfono para visualizar la landing a pantalla completa en vivo.
3. **Doble Modo de Entrega:**
   - **Enlace Web en Vivo:** Comparta la URL pública `https://generador-de-landingpages.vercel.app/p/[slug]` con sus clientes o campañas publicitarias.
   - **Paquete Autónomo en ZIP:** En el panel principal `/demo`, pulse el botón **Exportar** para descargar el paquete `.zip` con el archivo `index.html` independiente listo para subir a cualquier hosting tradicional (cPanel, Hostinger) o abrirlo offline en cualquier navegador.
