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
