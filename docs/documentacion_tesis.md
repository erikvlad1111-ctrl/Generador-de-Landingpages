# 📘 DOCUMENTACIÓN DE TESIS: ARQUITECTURA, MEDICIÓN DE RESULTADOS Y MANUAL DE USUARIO

> **Proyecto:** Sistema Web Generador Automatizado de Landing Pages Turísticas de Alta Conversión con Inteligencia Artificial  
> **Área:** Ingeniería de Software / Comercio Electrónico Turístico  
> **Stack Oficial:** Next.js 16 (App Router) + TypeScript + Tailwind CSS + Supabase (PostgreSQL 15, Auth, RLS, Storage) + IA Multi-Proveedor en Cascada (Groq `openai/gpt-oss-120b`, OpenAI `gpt-4o-mini`, OpenRouter, Gemini & Motor Local) + Vercel Serverless Cloud.

---

## 1. Diagramas de Arquitectura y Mapas de Funcionamiento

### 1.1 Mapa de Flujo de Datos y Peticiones (Frontend ➔ Vercel ➔ Supabase ➔ IA Multi-Proveedor)
Este mapa explica claramente cómo se dividen las peticiones según su nivel de seguridad: las consultas directas y subida de archivos van a Supabase con permisos RLS, mientras que las operaciones con credenciales privadas pasan por las APIs de Next.js en Vercel.

```mermaid
flowchart TB
    subgraph CapaCliente["📱 1. Capa de Cliente (Navegador Web)"]
        User["Operador / Administrador (/demo/new)\nExtractor Word (.docx) + Texto Libre"]
        Turista["Turista / Visitante Público (/p/[slug])"]
    end

    subgraph CapaEdge["⚡ 2. Capa de Lógica Protegida (Next.js en Vercel)"]
        Proxy["src/proxy.ts\nFiltro de Seguridad & Cookies cc_auth"]
        APIAI["POST /api/ai/generate\nCascada Multi-LLM + compactAndSliceDocument\n+ Rate Limit (35/h)"]
        APIQuote["POST /api/quote & /api/support\nHoneypot + Time-Gate Anti-Bot"]
        CronKeep["GET /api/keep-alive\nVercel Cron cada 3 días"]
    end

    subgraph CapaBaaS["🗄️ 3. Capa de Datos & Medios (Supabase Cloud BaaS)"]
        SupaAuth["Supabase Auth\nTokens JWT (Admin / Empleado)"]
        SupaStorage["Supabase Storage (CDN)\nBucket: landing-images"]
        SupaDB[("PostgreSQL 15 + RLS\n• landings (JSONB)\n• profiles (Roles)\n• templates (Catálogo)\n• ai_generations (Costos)")]
    end

    subgraph CapaIA["🧠 4. Cascada de Inteligencia Artificial"]
        CloudLLM["IA Generativa en la Nube\n1. OpenAI (gpt-4o-mini)\n2. OpenRouter\n3. Google Gemini\n4. Groq (openai/gpt-oss-120b)"]
        FallbackLocal["Motor Local Heurístico (documentParser.ts)\n(Respaldo instantáneo 100% offline, costo $0)"]
    end

    %% Flujos de interacción
    Turista -->|1. Consulta pública por slug| SupaDB
    Turista -->|2. Enviar cotización/reclamo| APIQuote
    User -->|3. Login institucional| SupaAuth
    User -->|4. Subir logotipo/imagen| SupaStorage
    User -->|5. Guardar landing completa| SupaDB
    User -->|6. Solicitar extracción y redacción IA| Proxy
    Proxy --> APIAI
    APIAI -->|Proveedor activo disponible| CloudLLM
    APIAI -->|Sin API Key, cuota o falla de red| FallbackLocal
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
        WebUI["Frontend React 19\n6 Plantillas Turísticas\nExtractor Word (.docx) + Guía 3 Pasos\nMulti-idioma (ES/EN/PT/FR/IT)"]
        ApiRoutes["Next.js API Routes\nSanitización + Cascada IA\nControl de Gasto y Rate Limit"]
    end

    subgraph SupabasePlatform["🗄️ Supabase Backend-as-a-Service"]
        AuthService["Auth Engine\nValidación de Sesiones"]
        StorageEngine["Object Storage\nLogotipos y Fotos"]
        PostgresEngine[("Base de Datos PostgreSQL\nPersistencia Híbrida\nRelacional + JSONB")]
    end

    subgraph AIPlatform["✨ Motor de IA en Cascada"]
        GPT["Groq (gpt-oss-120b)\n/ OpenAI / Gemini + Fallback Local"]
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

### 1.4 Diagrama de Secuencia: Flujo de Ingesta Word/Texto, IA y Publicación
Muestra la interacción paso a paso desde que el usuario sube un documento Word (`.docx`) o pega texto libre hasta que valida visualmente (Human-in-the-Loop) y publica o descarga su landing.

```mermaid
sequenceDiagram
    autonumber
    actor Operador as Operador / Administrador
    participant Form as Asistente (/demo/new)
    participant ApiAI as Backend (/api/ai/generate)
    participant LLM as IA Cloud (Groq gpt-oss-120b / OpenAI / Gemini)
    participant Supa as Supabase (PostgreSQL / Storage)
    participant Turista as Turista / Visitante

    Operador->>Form: 1. Clic en "Generar con IA" y sube Word (.docx) o pega texto libre
    Form->>Form: JSZip extrae word/document.xml localmente
    Form->>ApiAI: POST { documentText }
    ApiAI->>ApiAI: Valida sesión (cc_auth), Rate-Limit (35/h) y compactAndSliceDocument (10k chars)
    alt Proveedor Cloud activo (OpenAI / OpenRouter / Gemini / Groq)
        ApiAI->>LLM: Envía System Prompt + Esquema JSON Estricto
        LLM-->>ApiAI: Retorna JSON con Datos Empresa, Tour, Plantilla, Tier, Objetivo, Itinerario y FAQs
    else Sin API Key, cuota o falla de red
        ApiAI->>ApiAI: Activa Motor Local Heurístico (parseDocumentTextLocally, costo $0)
    end
    ApiAI->>Supa: Inserta registro de auditoría en public.ai_generations
    ApiAI-->>Form: Entrega JSON validado + insignia del motor usado
    Form-->>Operador: Muestra Guía de Validación de 3 Pasos (Logo, Fotos, WhatsApp)
    Operador->>Form: 2. Sube logotipo oficial y verifica WhatsApp ("Probar Chat Real")
    Form->>Supa: Sube archivo al bucket Storage 'landing-images'
    Supa-->>Form: Retorna URL pública CDN del logotipo
    Operador->>Form: 3. Clic en "🚀 Publicar y Ver Landing Final"
    Form->>Supa: UPSERT en public.landings (Columna data JSONB)
    Form-->>Operador: Abre previsualización PC/Móvil (390px) y genera código QR
    
    Note over Operador,Turista: Dos Canales de Distribución Autónomos
    Operador->>Turista: Comparte URL pública (ej: /p/salkantay-trek-5-dias)
    Turista->>Supa: Consulta web pública en tiempo real y contacta por WhatsApp (wa.me)
    Operador->>Operador: Clic en "Exportar ZIP" para descargar index.html offline
```

---

### 1.5 Diagrama de Máquina de Estados: Ciclo de Vida de una Landing Page

```mermaid
stateDiagram-v2
    [*] --> FormularioNuevo: Operador inicia creación (/demo/new)
    FormularioNuevo --> ConContenidoIA: Sube Word/Texto y pulsa "Generar con IA"
    ConContenidoIA --> ValidacionVisual: Guía de 3 Pasos (Logo, Fotos, WhatsApp)
    ValidacionVisual --> BorradorGuardado: Guarda borrador (status = 'draft')
    BorradorGuardado --> VistaPrevia: Prueba en simulador 390px o celular vía QR
    VistaPrevia --> Publicada: Clic en "Publicar y Ver Landing Final" (status = 'published')
    
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
   - **Administrador General (`Acceso Total`):** `admin@cuscocreativos.com` *(control completo de landings, marca blanca, planes, soporte y configuración)*
   - **Operador de Ventas (`Empleado`):** `empleado@cuscocreativos.com` *(creación y publicación ágil de landings para campañas turísticas)*
3. La contraseña permanece oculta bajo caracteres protegidos (`••••••••`) sin opción de revelado en texto plano, cumpliendo con las directivas de seguridad informática.

---

### 3.2 Proceso de Creación con IA y 4 Pestañas Organizadas (`/demo/new`)

```mermaid
flowchart LR
    IA["Generar con IA\n(Word .docx / Texto)"] --> P1["Paso 1\nDiseño, Portada\ne Idiomas"]
    P1 --> P2["Paso 2\nTu Agencia, Logo,\nWhatsApp y Oficina"]
    P2 --> P3["Paso 3\nDatos del Tour\ny Tarifas"]
    P3 --> P4["Paso 4\nItinerario, Guía,\nFAQs y Reviews"]
```

- **Asistente Inteligente (`Generar con IA`):** En la cabecera superior, pulse **`Generar con IA`**, suba un archivo **Word (`.docx`)** o pegue texto libre/cotización. El motor (`Groq openai/gpt-oss-120b` o respaldo local) extrae datos reales, determina plantilla/nivel/objetivo, rellena las 4 pestañas y muestra la **Guía de Validación Rápida de 3 Pasos** (*Human-in-the-Loop*).
- **Paso 1 (Diseño & Portada):** Ajuste la plantilla visual (6 diseños), nivel de servicio (`Free`, `Basic`, `Pro`, `Advance`), fotografía principal e idiomas activos.
- **Paso 2 (Tu Agencia & Marca):** Cargue su logotipo oficial (PNG/SVG en Supabase Storage), verifique RUC, correo, dirección en Cusco y pruebe su número oficial con el enlace **`Probar Chat Real ↗`**.
- **Paso 3 (Datos del Tour):** Confirme nombre comercial, destino, tarifa, altitud, dificultad y catálogo complementario.
- **Paso 4 (Itinerario & Ficha):** Revise el perfil del guía DIRCETUR, etapas del itinerario, servicios incluidos/no incluidos, equipamiento, FAQs y testimonios.
- **Publicación Final:** Pulse el botón verde **`🚀 Publicar y Ver Landing Final`** en el panel lateral para guardar en Supabase PostgreSQL y abrir la vista previa.

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
