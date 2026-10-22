---
name: landing-calculator-search-features
description: Registro y guía arquitectónica de buscadores, filtros, detectores de precios y calculadoras interactivas en las 6 plantillas de Cusco Creativos Web.
---

# Landing Calculator & Search Features

Esta guía documenta la disponibilidad de buscadores, calculadoras y filtros interactivos en las 6 plantillas oficiales del generador de landing pages turísticas.

## Matriz de Capacidades por Plantilla

1. **Modern Emerald (`ModernEmeraldTemplate.tsx`):**
   - Buscador/quick-bar flotante en Hero (`t.searchWhere`, `t.searchDates`).
   - Selector interactivo de pasajeros (+ / - de 1 a 12).
   - Calculadora de precio dinámico en vivo (`formatPrice(basePriceUsd, passengers)`).
   - Conversor multidivisa en tiempo real (USD, PEN con tipo de cambio S/ 3.75, EUR con tipo de cambio €0.92).

2. **Agency Portal (`AgencyPortalTemplate.tsx` + `LiveBudgetCalculator.tsx`):**
   - Calculadora avanzada en vivo (`LiveBudgetCalculator`):
     - Selección de tours del catálogo.
     - Selector de pasajeros con descuento de grupo automático (10% OFF para >= 4 pax).
     - Multiplicador por nivel de servicio: Estándar (1.0), VIP (1.35), Panorámico (1.60).
     - Opciones extra (Huayna Picchu, Almuerzo Buffet, Bastones).
     - Divisas: USD, PEN, EUR, BRL.
     - Conversión y checkout a WhatsApp y modal.
   - Filtros por categoría de catálogo (`all`, `trekking`, `machu`, `cultura`, `adrenalina`).

3. **Boho (`BohoTemplate.tsx`):**
   - **Barra interactiva completa de reserva en Hero:**
     - Tarifa oficial clara con inclusiones explicadas (*Todo incluido: movilidad, guía y seguro • Sin cargos ocultos*).
     - Selector interactivo de viajeros (+ / - de 1 a 12 pax).
     - Selector de fecha estimada de viaje (`<input type="date">`).
     - Cálculo en tiempo real del total según número de viajeros (`Total Estimado: S/ 320 PEN`).
     - Envío automático de cotización desglosada a WhatsApp con fecha y total.
   - Filtros de tours por categorías y de reseñas por categoría.
   - Pestañas de mochila (*Qué llevar*, *Incluye*, *No incluye*).
   - Barra flotante inferior de precio unitario (`/ pers.`).

4. **Adventure (`AdventureTemplate.tsx`):**
   - Filtro interactivo de inclusiones técnicas (tren, guías, domos, chef, etc.).
   - Sección de destinos destacados (*Top Searched Spots*).
   - Badge Hero y barra flotante fija de precio.

5. **Cultural (`CulturalTemplate.tsx`):**
   - Botón directo de acceso al territorio con ícono de lupa.
   - Pestañas de eventos y calendario.
   - Barra flotante inferior de precio unitario de referencia.

6. **Premium (`PremiumTemplate.tsx`):**
   - Price Box biselado en Hero con tarifa de referencia.
   - Selector tipográfico de lujo.
   - Modal de cotización personalizada.

## Módulos Universales
- **`TourSupportAndFaqs.tsx`:** Presente en las 6 plantillas. Contiene buscador de texto en tiempo real (`<input type="text" />`) con filtrado dinámico de preguntas y respuestas por texto y categoría.
- **`QuoteModal.tsx`:** Presente en las 6 plantillas. Formulario cotizador con selector de rangos de pasajeros (1, 2, 3-5, 6+) y captura de datos.

---

## 3. Errores Diagnosticados y Solucionados

### Error 1: Desborde y Corte de Borde Ovalado en Selector de Divisas de la Barra Hero
- **Síntoma / Mensaje de Error:** En el Diseño 6 Esmeralda (`ModernEmeraldTemplate.tsx`), el selector de moneda `[USD] PEN EUR` se sale del contenedor ovalado de la barra de búsqueda en el Hero, cortándose con el borde curvo y montándose sobre el fondo o la foto de la derecha.
- **Causa Raíz:** 
  1. El contenedor utilizaba `sm:rounded-full flex flex-col sm:flex-row` intentando meter 4 controles complejos en línea horizontal (Destino, Pasajeros con botones +/-, Divisa y Botón de reserva).
  2. Al encontrarse dentro de una columna de 6 espacios en grid (`lg:col-span-6`), el ancho disponible (~500px) era insuficiente para albergar los 680px que requerían los 4 elementos en línea horizontal. La curvatura pronunciada de `sm:rounded-full` cortaba el selector de moneda y expulsaba el botón.
- **Solución Paso a Paso:**
  1. Rediseñar la barra flotante a una tarjeta *glassmorphic pod* elegante de dos niveles con `rounded-3xl` y `space-y-3`:
     - **Fila Superior:** Grid de 2 columnas (`sm:grid-cols-12`) con Destino (6 cols) y Selector de Pasajeros (6 cols), cada uno en su propia tarjeta translúcida `rounded-2xl`.
     - **Fila Inferior:** Barra con separador superior fino, mostrando la etiqueta y selector de divisa a la izquierda y el botón de acción principal con tarifa en tiempo real calculada a la derecha.
  2. Resultado: Cero desborde, máxima claridad táctil en móviles y orden visual impecable en cualquier resolución.

### Error 2: Datos del Tour Desfasados / No Visibles en Landings y Orden de Pasos en Generador
- **Síntoma / Mensaje de Error:** Al crear landings en `/demo/new`, el usuario reportaba que "los datos del tour no aparecen en las landings generadas" y solicitaba que "datos de los tours debe ser penúltimo".
- **Causa Raíz:**
  1. En `NewLandingDemo` (`/demo/new`), el orden guiado anterior era Tour (1) -> Diseño (2) -> Agencia (3) -> Ficha (4). Se requería que la parametrización de la experiencia ("Datos del Tour") sea el penúltimo paso (Paso 3 de 4).
  2. En `handleGenerate`, `heroTitle` se asignaba como `heroTitle.trim() || name.trim()`. Si un preset había precargado `heroTitle`, cuando el usuario editaba el nombre del tour `name` en el formulario, `heroTitle` no se actualizaba y prevalecía el título anterior de muestra ("Machu Picchu de Lujo..."), eclipsando el tour ingresado.
  3. En `simulateAiGeneration` (`landingStore.ts`), el campo `description` no se guardaba como propiedad directa en el objeto `LandingData`.
  4. En `AgencyPortalTemplate.tsx` (Diseño 1), el Hero principal carecía de barra de píldoras para los datos esenciales (`price`, `duration`, `destination`, `altitude`, `difficulty`, `groupType`), impidiendo al usuario ver inmediatamente los datos que configuró al abrir la landing.
- **Solución Paso a Paso:**
  1. Reordenar el Stepper y el formulario en `/demo/new` a:
     - **Paso 1:** `design` (Diseño & Portada).
     - **Paso 2:** `agency` (Tu Agencia & Marca).
     - **Paso 3:** `tour` (Datos del Tour - *PENÚLTIMO*).
     - **Paso 4:** `content` (Itinerario & Ficha - *ÚLTIMO*).
  2. En `src/types/landing.ts`, añadir `description?: string;` a `LandingData`.
  3. En `src/data/landingStore.ts`, asignar `description: params.description || undefined`.
  4. En `src/app/demo/new/page.tsx`, sincronizar dinámicamente `name` -> `heroTitle` y `description` -> `heroSubtitle` y respetar `finalHeroTitle` y `finalHeroSubtitle` en `handleGenerate`.
  5. En `AgencyPortalTemplate.tsx`, `CulturalTemplate.tsx` y `PremiumTemplate.tsx`, añadir la barra destacada de píldoras de datos del tour en el Hero (tarifa destacada, duración, destino, altitud, dificultad y modalidad de grupo).

