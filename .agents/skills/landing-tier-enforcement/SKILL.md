---
name: landing-tier-enforcement
description: Guía y registro de resolución de errores de niveles (free, basic, pro, advance) y visualización condicional de módulos en el generador de landings turísticas.
---

# Guía y Solución de Niveles (Tier Enforcement) en Landings Turísticas

## 1. Regla de Matriz de Secciones por Nivel

Cada una de las 5 plantillas (`agency-portal`, `boho-nature`, `adventure`, `cultural`, `premium`) debe respetar de forma estricta los 4 niveles técnicos:

| Módulo / Sección | Gratuito (`free`) | Básico (`basic`) | Pro (`pro`) | Advance (`advance`) |
| :--- | :---: | :---: | :---: | :---: |
| **Hero + Portada + Botón WhatsApp** | ✅ Sí (Directo) | ✅ Sí | ✅ Sí | ✅ Sí (Cinematográfico) |
| **Ficha Rápida Técnica (Duración, Altitud, Guía)** | Píldoras en Hero | ✅ Sí | ✅ Sí | ✅ Sí |
| **Módulo "Acerca del Tour"** | ❌ Oculto | ✅ Sí | ✅ Sí | ✅ Sí |
| **Módulo "Qué Incluye el Servicio"** | ❌ Oculto | ✅ Sí | ✅ Sí | ✅ Sí |
| **Galería Fotográfica (PinterestPinboard)** | ❌ (Solo 1 foto en Hero) | ✅ Sí (2 Fotos) | ✅ Sí (Hasta 6 Fotos) | ✅ Sí (HD Completa / 8+ fotos) |
| **Itinerario Cronológico Detallado** | ❌ Oculto | ❌ Oculto | ✅ Sí (Horas / Etapas) | ✅ Sí (Día a Día) |
| **Qué NO Incluye + Mochila** | ❌ Oculto | ❌ Oculto | ✅ Sí | ✅ Sí |
| **Sellos de Confianza (DIRCETUR, Safe Travels, RUC 20)** | ❌ Oculto | ❌ Oculto | ✅ Sí | ✅ Sí |
| **Selector de Idiomas** | ❌ Oculto (1 idioma) | ❌ Oculto (1 idioma) | ✅ Sí (ES / EN) | ✅ Sí (5 Idiomas: ES, EN, PT, FR, IT) |
| **FAQs / Foro de Soporte** | ❌ Oculto | ❌ Oculto | ❌ Oculto | ✅ Sí (Acordeón interactivo) |
| **Testimonios y Reseñas Verificadas** | ❌ Oculto | ❌ Oculto | ❌ Oculto | ✅ Sí |
| **Catálogo de Tours / Circuitos Destacados** | ✅ Sí | ✅ Sí | ✅ Sí | ✅ Sí (Completo Multidía) |
| **Banner de Plan Gratuito en Footer** | ✅ Visible | ❌ Oculto | ❌ Oculto | ❌ Oculto |

## 2. Errores Diagnosticados y Solucionados

### Error 1: Fuga de Secciones Pro y Advance en Planes Básicos y Gratuitos
- **Síntoma:** Al seleccionar el plan Básico o Pro, se renderizaban testimonios, preguntas frecuentes o catálogos extras en algunas plantillas.
- **Causa Raíz:** Varias plantillas utilizaban comprobaciones laxas como `{!isFree && (` en lugar de `{isAdvance && (` para testimonios y FAQs, o no tenían las banderas `isBasic` e `isPro` definidas.
- **Solución:**
  1. Definir estándar unificado de variables:
     ```tsx
     const tier: PlanTier = data?.tier || 'advance';
     const isFree = tier === 'free';
     const isBasic = tier === 'basic';
     const isPro = tier === 'pro';
     const isAdvance = tier === 'advance';
     ```
  2. Envolver `TourSupportAndFaqs`, testimonios y catálogos extras con `{isAdvance && (...) }`.
  3. Envolver itinerario, logística/mochila y sellos DIRCETUR con `{(isPro || isAdvance) && (...) }`.
  4. Envolver ficha técnica, acerca del tour, qué incluye y galería con `{!isFree && (...) }`.

### Error 2: Parámetro `tier` sobreescrito por el preset en el formulario de creación (`/demo/new`)
- **Síntoma:** Al hacer clic en "Crear Básico" (`/demo/new?tier=basic&template=boho-nature`), la landing se creaba con nivel `advance`.
- **Causa Raíz:** En `useEffect`, la función `handleApplyPreset(matchingPreset)` se ejecutaba y llamaba a `setTier(preset.tier)`, sobreescribiendo el `qTier` recibido en la URL.
- **Solución:** Reordenar la evaluación para que `qTier` se aplique después de `handleApplyPreset`, respetando la intención explícita del usuario.

### Error 3: Idioma en planes Básico y Gratuito no forzado a Español por defecto
- **Síntoma:** Al generar o previsualizar landings en planes Básico o Gratuito, podían aparecer en inglés u otro idioma sin que el usuario pudiera cambiarlo debido a la ausencia de selector multilingüe.
- **Causa Raíz:** El estado de idioma inicializaba con `data?.language || 'es'`, y si el preset o formulario anterior tenía seleccionado inglés u otro idioma, la landing se renderizaba en ese idioma.
- **Solución:**
  1. En las 5 plantillas, definir:
     ```tsx
     const defaultLang: LanguageType = (isFree || isBasic)
       ? 'es'
       : (isPro && !['es', 'en'].includes(data.language || 'es'))
         ? 'es'
         : (data.language || 'es');
     ```
  2. En `simulateAiGeneration`, si `tier === 'free' || tier === 'basic'`, fijar `language: 'es'` y `languages: ['es']` para que el contenido persuasivo generado por IA se redacte en español.
  3. En `/demo/new`, bloquear las tarjetas de otros idiomas en Gratuito/Básico y mostrar aviso explicativo contextual.
  4. En `/demo/preview`, sincronizar `language: 'es'` cuando `tier === 'free' || tier === 'basic'`.

### Error 4: Sección de Tours requerida en todos los planes
- **Síntoma:** Al seleccionar planes Gratuito, Básico o Pro, la sección de tours quedaba oculta por estar condicionada a `isAdvance`.
- **Causa Raíz:** La sección de tours y sus enlaces de navegación estaban envueltos en `{isAdvance && (...) }`.
- **Solución:** Remover el gating condicional `{isAdvance && (` de las secciones de tours (`#tours`, `#destinos`, `#iconic`, `#agenda`) y sus correspondientes enlaces en los menús de navegación en las 5 plantillas, manteniéndola visible en todos los planes.

### Error 5: Nombre del tour individual en la cabecera del footer y modales legales en lugar de la marca de agencia
- **Síntoma:** En la Columna 1 del footer y en el encabezado de los modales de Libro de Reclamaciones y Términos Legales, se mostraba el nombre del tour (ej. "Laguna Humantay — Bitácora Fotográfica & Paisajismo" o "Machu Picchu VIP") junto a la licencia DIRCETUR y el RUC.
- **Causa Raíz:** Las plantillas inyectaban variables dependientes del tour como `data.name` o `rawTourTitle` en la cabecera de la columna corporativa del footer y en las props `agencyName` de `ComplaintsBookModal` y `LegalTermsModal`.
- **Solución:**
  1. En `BohoTemplate`: Establecer la marca fija `"Boho Travel Journal"` en la columna 1 y `"Boho Travel Journal • Cusco Creativos S.A.C."` en los modales legales.
  2. En `PremiumTemplate`: Establecer `"Cusco Creativos VIP Collection"` en la columna 1 y `"Cusco Creativos VIP Collection • Inversiones Turísticas Cusco S.A.C."` en los modales.
  3. En `AgencyPortalTemplate`: Separar la variable corporativa `brandName = 'Cusco Creativos'` y `fullAgencyName = 'Cusco Creativos Operador Turístico S.A.C.'` de la variable de la ficha técnica `tourTitle = data?.hero?.title || data?.name`, y usar `Cusco Creativos Operador Turístico` en el footer y modales.
  4. En `CulturalTemplate`: Asignar `"Cusco Patrimonial • Cusco Creativos S.A.C."` a los modales legales.
  5. En `AdventureTemplate`: Mantener `"TrekExplorer Perú • Cusco Creativos S.A.C."`.

### Error 6: Desbalance visual en la sección de tours por mostrar 5 tours en lugar de 6 en cuadrícula 3x2
- **Síntoma / Mensaje de Error:** La sección de catálogo de tours mostraba solo 5 tarjetas en los 5 diseños, dejando un espacio vacío asimétrico en la segunda fila del layout `lg:grid-cols-3` (3 tarjetas arriba y solo 2 abajo). En el editor y modal se indicaba "5 tours".
- **Causa Raíz:** `DEFAULT_SECONDARY_CATALOG_TOURS` solo contenía 5 elementos iniciales y las 4 plantillas (`CulturalTemplate`, `PremiumTemplate`, `BohoTemplate`, `AdventureTemplate`) limitaban con `tourLimit = isFree ? 1 : isBasic ? 3 : 5;`. Asimismo, `CatalogToursEditorModal.tsx` y `/demo/new/page.tsx` estaban cableados a 5 tours.
- **Comando de Diagnóstico:** Inspeccionar `DEFAULT_SECONDARY_CATALOG_TOURS.length` y el selector `tourLimit` en las plantillas.
- **Solución Paso a Paso:**
  1. Agregar el 6to tour icónico en `src/data/defaultCatalogTours.ts` (`cat-vinicunca`: "Montaña de 7 Colores & Valle Rojo", categoría 'Aventura & Trekking', precio '$45 USD', rating 4.9).
  2. Registrar las traducciones completas en `src/data/translations.ts` en los 5 idiomas (es, en, pt, fr, it) para categorías y locaciones del catálogo.
  3. Actualizar `tourLimit = isFree ? 1 : isBasic ? 3 : 6;` en `CulturalTemplate`, `PremiumTemplate`, `BohoTemplate` y `AdventureTemplate`.
  4. En `AgencyPortalTemplate`, fijar `displayTours = secondaryTours.slice(0, tourLimit)` para renderizar con consistencia los 6 tours del catálogo en el grid de 3 columnas (2 filas completas de 3).
  5. Actualizar `CatalogToursEditorModal.tsx` y `src/app/demo/new/page.tsx` para listar del #1 al #6 ("6 Tours en Vitrina").

