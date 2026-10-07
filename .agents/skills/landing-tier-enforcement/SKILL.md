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
| **Galería Fotográfica (PinterestPinboard)** | ❌ (Solo 1 foto en Hero) | ✅ Sí (3 Pines / Fotos) | ✅ Sí (Hasta 6 Fotos) | ✅ Sí (HD Completa / 8+ fotos) |
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

### Error 7: Límite de 1 tour en plan Gratuito y textos en inglés en catálogo secundario
- **Síntoma / Mensaje de Error:** En el plan Gratuito (`free`) solo se mostraba 1 tour en una columna solitaria, cuando ambos modos básicos y gratuitos debían presentar 3 tours destacados en el catálogo secundario. Además, se filtraban términos en inglés (ej. "Full Day", "Google Reviews", botones en inglés) en landings básicas/gratuitas.
- **Causa Raíz:** Las plantillas tenían `tourLimit = isFree ? 1 : isBasic ? 3 : 6;` y clases CSS condicionales `isFree ? 'max-w-md grid-cols-1' : ...`. En `defaultCatalogTours.ts` la duración por defecto estaba escrita en inglés (`"Full Day"`) y las tarjetas renderizaban `{tour.duration}` de forma directa sin pasar por `translateText`.
- **Solución Paso a Paso:**
  1. Actualizar `const tourLimit = (isFree || isBasic) ? 3 : 6;` en las 5 plantillas (`AdventureTemplate`, `BohoTemplate`, `CulturalTemplate`, `PremiumTemplate`, `AgencyPortalTemplate`).
  2. Unificar la grilla para que `(isFree || isBasic)` use `grid-cols-1 md:grid-cols-3` equilibrando las 3 tarjetas en una fila completa.
  3. En `defaultCatalogTours.ts`, establecer `"Día Completo"` como valor en español y agregar los mapeos de duraciones e idiomas en `PHRASE_MAP` (`src/data/translations.ts`).
  4. Envolver todas las instancias de duración en tarjetas con `{translateText(tour.duration, currentLang)}`.
  5. En `src/app/p/[slug]/page.tsx`, forzar `language: 'es'` y `languages: ['es']` cuando `tier === 'free' || tier === 'basic'`.

### Error 8: Límite de 2 pines en modo Básico en lugar de 3 en el Tablero de Inspiración (PinterestPinboard)
- **Síntoma / Mensaje de Error:** En el modo básico (`basic`), el Tablero de Pines mostraba solo 2 fotos y la insignia indicaba "2 Pines en el Tablero", dejando espacio libre asimétrico en pantallas medianas y grandes.
- **Causa Raíz:** En `src/components/common/PinterestPinboard.tsx`, la variable `pinCount` estaba definida como `tier === 'free' ? 1 : tier === 'basic' ? 2 : ...`, y la grilla solo contemplaba `activePhotos.length === 2 ? 'grid-cols-2 max-w-2xl mx-auto' : ...`.
- **Solución Paso a Paso:**
  1. Actualizar `pinCount` en `PinterestPinboard.tsx` para `tier === 'basic' ? 3`.
  2. Agregar el layout condicional `activePhotos.length === 3 ? 'grid-cols-1 sm:grid-cols-3 max-w-5xl mx-auto'` para que en tablet y desktop forme una fila simétrica de 3 columnas de alta estética.
  3. En `src/app/demo/plans/page.tsx`, actualizar la descripción de la matriz comparativa de planes a `'3 Fotos (Pines)'`.

### Error 10: Menús de navegación desbordando el ancho de pantalla, enlaces excesivos (> 7 links) y colisión vertical de tipografías
- **Síntoma / Mensaje de Error:** La barra de navegación superior sobrepasaba el ancho de la página causando scroll horizontal. Los menús tenían entre 9 y 12 enlaces en pantallas de escritorio, y en la identidad de marca (logo) las letras de títulos y subtítulos chocaban o se montaban una encima de otra (`overflowed` y letras superpuestas).
- **Causa Raíz:**
  1. La acumulación excesiva de links secundarios (`Amenidades`, `Ficha Técnica`, `Sensorial`, `Mochila`, `Soporte FAQ`) superaba el ancho disponible de la cuadrícula flex.
  2. Selectores de idioma que renderizaban botones horizontales individuales para cada uno de los 5 idiomas en lugar de un dropdown selector compacto tipo píldora (`HeaderLanguageSelector`).
  3. Contenedores de logotipo y marca con `leading-tight` sin separación vertical o sin `whitespace-nowrap`, provocando colisión entre los trazos descendentes del título y ascendentes del subtítulo.
- **Solución Paso a Paso:**
  1. **Límite Estricto de Enlaces (Máximo 6 o 7 links limpios):**
     - `PremiumTemplate`: Máximo 5 enlaces limpios (`Inicio`, `Experiencia`, `Tours`, `Lounge VIP`, `Contacto`).
     - `AdventureTemplate`: Exactamente 6 enlaces limpios (`Inicio`, `Destinos`, `Tours`, `Qué Incluye`, `Reseñas`, `Contacto`).
     - `BohoTemplate`: Máximo 6 enlaces limpios (`Inicio`, `Journal`, `Tours`, `Galería`, `Reseñas`, `Contacto`).
     - `CulturalTemplate`: Máximo 6 enlaces limpios (`Inicio`, `Agenda`, `Tours`, `Galería`, `Reseñas`, `Contacto`).
     - `AgencyPortalTemplate`: Máximo 6 enlaces limpios (`Inicio`, `El Tour`, `Qué Incluye`, `Tours`, `Reseñas`, `Contacto`).
  2. **Corrección de Colisiones Tipográficas:**
     - Aplicar `whitespace-nowrap` a todos los textos de marca y enlaces del menú superior.
     - En la marca, asignar `leading-snug` al nombre/título y `leading-none mt-0.5` al subtítulo para garantizar separación nítida sin solapamiento de caracteres.
  3. **Blindaje de Ancho sin Desborde:**
     - Establecer `w-full max-w-full overflow-x-hidden` en el contenedor raíz de cada plantilla.
     - Contener la barra en `max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full min-w-0 flex justify-between items-center gap-2 sm:gap-4`.
     - Utilizar `HeaderLanguageSelector` con menú desplegable flotante que no ocupa ancho estático.

### Error 11: Discrepancia de campos editables: Descripciones narrativas ausentes en plantillas y modal no centrado
- **Síntoma / Mensaje de Error:** En el editor de landings (`/demo/preview`), existía el campo para editar la descripción narrativa (`about.title` y `about.content`), pero al visualizar la landing (especialmente en `agency-portal`, `cultural` y `adventure`), la descripción no se mostraba en la página. Además, el editor se abría como un panel pegado al lateral derecho en lugar de un modal en el centro.
- **Causa Raíz:**
  1. `AgencyPortalTemplate`, `CulturalTemplate` y `AdventureTemplate` no contaban con un bloque renderizador para `data.about.title` y `data.about.content`.
  2. En `/demo/preview/page.tsx`, el modal utilizaba clases `justify-end` y `slide-in-from-right` convirtiéndolo en un drawer lateral.
  3. Faltaban opciones de edición para itinerario interactivo (agregar/eliminar días), preguntas frecuentes (FAQs), testimonios, público objetivo e integración con el editor de catálogo multitour.
- **Solución Paso a Paso:**
  1. En `AgencyPortalTemplate.tsx`, incorporar bloque destacado para `data?.about?.title` y `data?.about?.content` dentro de la sección de experiencia (`#experiencia`).
  2. En `CulturalTemplate.tsx`, añadir la sección "Crónica & Visión del Recorrido" con `data?.about?.title` y `data?.about?.content`.
  3. En `AdventureTemplate.tsx`, añadir la sección "Acerca de la Expedición" renderizando `data?.about?.title` y `data?.about?.content`.
  4. En `src/app/demo/preview/page.tsx`, centrar el modal con `fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/80 backdrop-blur-md` y tarjeta `relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl`.
### Error 12: Pestaña 6 (Itinerario) oculta por desbordamiento en el editor, modal angosto y sección de itinerario ausente en plantillas
- **Síntoma / Mensaje de Error:** La pestaña 6 ("6. Itinerario Paso a Paso") no era visible dentro del modal de edición sin hacer scroll horizontal oculto, el modal se sentía estrecho (`max-w-4xl`), y al guardar itinerarios en plantillas como `AgencyPortalTemplate` o `BohoTemplate`, la sección `#itinerario` no se renderizaba en la landing.
- **Causa Raíz:**
  1. La barra de pestañas en `/demo/preview/page.tsx` usaba `overflow-x-auto` en una sola línea horizontal con botones anchos, empujando las pestañas 6, 7 y 8 fuera de la pantalla sin scrollbar visible.
  2. El contenedor del modal estaba fijado a `max-w-4xl`, limitando la ergonomía visual del editor en monitores medianos y grandes.
  3. `AgencyPortalTemplate` y `BohoTemplate` tenían anclas en menú a `#itinerario`, pero no incluían el bloque JSX `<section id="itinerario">` para renderizar el array `data.itinerary`.
- **Solución Paso a Paso:**
  1. En `src/app/demo/preview/page.tsx`, agrandar el modal a `max-w-6xl max-h-[95vh] h-[92vh]`.
  2. Reemplazar la barra de pestañas horizontal por una cuadrícula responsive (`grid grid-cols-2 xs:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-2`) para que las 8 pestañas (destacando la #6 de Itinerario) estén 100% visibles simultáneamente.
  3. En `AgencyPortalTemplate.tsx`, renderizar la sección `#itinerario` con línea de tiempo ejecutiva para planes Pro/Advance cuando `data.itinerary` contenga días o paradas.
  4. En `BohoTemplate.tsx`, renderizar la sección `#itinerario` con estilo bitácora / polaroid aesthetic para planes Pro/Advance.

