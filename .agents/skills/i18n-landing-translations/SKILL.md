---
name: i18n-landing-translations
description: Guía y registro de resolución de errores de traducción, fugas de idioma y sincronización multilenguaje en las 5 plantillas de landing pages.
---

# Runbook de Traducción Multilingüe (i18n)

Guía para diagnosticar y solucionar problemas de traducción, mezcla de idiomas (English/Spanish/Portuguese/French/Italian) y filtrado de características en el generador de landing pages.

## Problemas Resueltos

### Error: Título de Sección y Descripciones de Inclusiones no se traducen (Mezcla de Español e Inglés)

- **Síntoma / Mensaje de Error:** 
  Al cambiar el idioma a Inglés (o cualquier otro de los 5 idiomas), las insignias, subtítulos y filtros de la sección de inclusión aparecen en inglés (`EXPEDITION DETAILS & MOUNTAIN SAFETY`, `All Inclusions (6)`, etc.), pero el encabezado H2 permanece en español (`¿Qué hace inolvidable esta experiencia?`) y las descripciones de las tarjetas muestran texto repetitivo en español (`Servicio 100% coordinado y garantizado con estándares de seguridad turística.`).

- **Causa Raíz:** 
  1. En [AdventureTemplate.tsx](file:///c:/Users/copyw/.gemini/antigravity-ide/scratch/cusco-creativos-web/src/templates/AdventureTemplate.tsx), el encabezado H2 utilizaba `{data.features.title || t.inclusions.includedTitle}` directamente sin pasar por la función `translateText`.
  2. La función `getFeatureMetadata` evaluaba solo términos en español (`lower.includes('domo')`, etc.) y las propiedades `category` solo tenían condición ternaria para `'en'` dejando a `pt`, `fr` e `it` con etiquetas en español.
  3. Las descripciones generadas por defecto en el wizard / store asignaban la cadena fija `"Servicio 100% coordinado y garantizado con estándares de seguridad turística."`, la cual no tenía entrada en [translations.ts](file:///c:/Users/copyw/.gemini/antigravity-ide/scratch/cusco-creativos-web/src/data/translations.ts) ni heurística semántica, opacando además las descripciones detalladas y especializadas (`meta.defaultDesc`).

- **Comando de Diagnóstico:**
  Revisar en los componentes de plantilla si `data.features.title` o `userCustomDesc` son renderizados sin llamar a `translateText(..., currentLang)`, o si las cadenas por defecto están ausentes en `PHRASE_MAP`:
  ```bash
  git grep -n "data.features.title" src/templates/
  ```

- **Solución Paso a Paso:**
  1. Envolver el título de características con `translateText`:
     ```tsx
     <h2 className="...">
       {translateText(data.features.title || t.inclusions.includedTitle, currentLang)}
     </h2>
     ```
  2. Añadir mapeos directos e inversos en `PHRASE_MAP` y heurísticas semánticas en `src/data/translations.ts` para:
     - `'¿Qué hace inolvidable esta experiencia?'` / `'What Makes This Experience Unforgettable?'` / `'What makes this tour exceptional?'`
     - `'Servicio 100% coordinado y garantizado con estándares de seguridad turística.'` / `'100% coordinated and guaranteed service under official tourism safety standards.'`
     - Títulos de inclusiones como `'Tourist transportation Cusco - Mollepata round-trip'`, `'Sky glass domes and fully equipped mountain campsites'`, etc.
  3. En `AdventureTemplate.tsx`, si `userCustomDesc` es el placeholder genérico de seguridad turística, renderizar prioritariamente `meta.defaultDesc` que contiene la redacción especializada y 100% localizada en los 5 idiomas.

### Error: Encabezado del Foro de Ayuda, Filtros y Metadatos de Preguntas en Español en Plantillas Multilingües

- **Síntoma / Mensaje de Error:**
  En la sección de soporte/comunidad (`TourSupportAndFaqs`), incluso cuando la página o las preguntas se muestran en francés (`fr`), inglés (`en`), etc., el encabezado superior del foro mostraba textos fijos en español: `CONVERSACIÓN PÚBLICA Y ASISTENCIA`, `Foro de Ayuda`, `Publica tu pregunta o problema y recibe respuestas del administrador, diseñadores y guías.`, el botón `+ NUEVA PREGUNTA` y los filtros de categorías (`Todas`, `Logística & Recojo`, `Salud & Altura`, `Políticas & Reservas`, `Equipaje & Custodia`). Además, las tarjetas del feed mostraban sufijos fijos: `34 vistas`, `2 respuestas`, `✓ Respondido por Guía Oficial` y `Ver respuestas →`.

- **Causa Raíz:**
  1. En [TourSupportAndFaqs.tsx](file:///c:/Users/copyw/.gemini/antigravity-ide/scratch/cusco-creativos-web/src/components/common/TourSupportAndFaqs.tsx), el diccionario `st` contenía las traducciones para todos los 5 idiomas (`es`, `en`, `pt`, `fr`, `it`), pero el JSX del encabezado de la pestaña Foro (Tab 1), los filtros de categorías, el modal de nueva pregunta, las tarjetas del listado y la mesa de ayuda privada (Tab 3) tenían cadenas en español hardcodeadas o solo evaluaban ternarios `isEn ? ... : ...`.
  2. Los estados de conteos (`vistas`, `respuestas`) y los badges de verificación no estaban pluralizados ni traducidos dinámicamente según `lang`.
  3. Las preguntas frecuentes por defecto y personalizadas pasadas por `data.faqs` no llamaban a `translateText(faq.q, lang)` y `translateText(faq.a, lang)`.

- **Comando de Diagnóstico:**
  Buscar strings en español fijos en el JSX de `TourSupportAndFaqs.tsx`:
  ```bash
  git grep -n "Foro de Ayuda" src/components/common/TourSupportAndFaqs.tsx
  git grep -n "vistas" src/components/common/TourSupportAndFaqs.tsx
  ```

- **Solución Paso a Paso:**
  1. Conectar todas las cadenas del encabezado del Foro, placeholders de búsqueda y categorías a `st`:
     - Subtítulo: `{st.forumSub}`
     - Título: `{st.forumTitle}`
     - Descripción: `{st.forumDesc}`
     - Botón: `{st.newQuestionBtn}`
     - Categorías: iterar dinámicamente sobre `st.categories` con reseteo de categoría activa en `useEffect` al cambiar de `lang`.
  2. Implementar funciones auxiliares y dinámicas para el feed:
     - `replyText(count)` y `answeredByGuide` para los 5 idiomas (`es`, `en`, `pt`, `fr`, `it`).
     - Metadatos: `{q.views} {st.views}`, `{q.replies.length} {replyText(q.replies.length)}`, `{st.viewRepliesLink}`.
  3. Conectar el modal de nueva pregunta, la vista de detalle de hilo y la pestaña de ticket privado a las claves correspondientes de `st`.
  4. Mapear `displayFaqs` con `translateText` para traducir automáticamente las preguntas y respuestas tanto por defecto como personalizadas.

### Error: Heurística de subtítulos expande etiquetas cortas de tours convirtiéndolas en párrafos completos

- **Síntoma / Mensaje de Error:**
  En las tarjetas del catálogo de tours de las plantillas (ej. `CulturalTemplate`, `AgencyPortalTemplate`), la etiqueta o pill flotante de la foto mostraba un párrafo completo en mayúsculas: `DESCUBRE LA MARAVILLA DEL MUNDO CON TRASLADOS PRIVADOS, HOTELES 5 ESTRELLAS Y UN GUÍA OFICIAL EXCLUSIVO PARA TI Y TU FAMILIA.` en lugar de una etiqueta corta como `GLACIAR` o `MARAVILLA`.

- **Causa Raíz:**
  1. En `translations.ts`, una heurística semántica diseñada para subtítulos largos evaluaba `lowerTrimmed.includes('maravilla del mundo')` sin validar la longitud del texto (`lowerTrimmed.length > 25`). Al pasar la etiqueta `tour.tag = 'Maravilla del Mundo'`, la condición se cumplía y reemplazaba la etiqueta corta por una descripción completa de 20 palabras.
  2. Las etiquetas cortas (`Glaciar`, `Maravilla`, `Arqueológico`, `Adrenalina`, `Recomendado`, etc.) no estaban registradas en `PHRASE_MAP`.
  3. Los contenedores de los badges en las plantillas carecían de restricción de ancho máximo (`max-w-[130px] truncate`), permitiendo que textos largos deformaran la tarjeta visualmente.

- **Comando de Diagnóstico:**
  Buscar en `translations.ts` heurísticas permisivas con `includes`:
  ```bash
  git grep -n "includes('maravilla del mundo')" src/data/translations.ts
  ```

- **Solución Paso a Paso:**
  1. Registrar las etiquetas cortas en `PHRASE_MAP` de `src/data/translations.ts` (`Maravilla del Mundo`, `Maravilla`, `Glaciar`, `Arqueológico`, etc.) para que se resuelvan en el paso 1 sin caer en heurísticas secundarias.
  2. Requerir `lowerTrimmed.length > 25` y palabras clave descriptivas (`descubre`) en las heurísticas de subtítulos de `translations.ts`.
  3. Establecer `tag: 'Maravilla'` en `DEFAULT_SECONDARY_CATALOG_TOURS` para mantener homogeneidad visual con `Glaciar` y `Arqueológico`.
  4. Agregar `max-w-[130px] truncate` y atributo `title` en las 5 plantillas para blindar el tamaño de los badges.
