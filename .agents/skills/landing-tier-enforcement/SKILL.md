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
| **Catálogo de Tours Extras / Paquetes Multidía** | ❌ Oculto | ❌ Oculto | ❌ Oculto | ✅ Sí |
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
