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

### Error 3: Desplazamiento Vertical del Título H1 en Páginas Editadas vs Páginas de Muestra
- **Síntoma / Mensaje de Error:** El usuario observa que "en las páginas editadas el título está más abajo que en las páginas de muestra del panel principal".
- **Causa Raíz:**
  1. **Doble barra de control en `/demo/preview`:** El visor de edición (`/demo/preview`) renderizaba dos barras pegadas al tope (Barra de acciones de 64px + Barra de identidad del tour de 40px) más un padding superior en el contenedor `main` de 32px (`md:p-8`). Esto empujaba hacia abajo toda la landing en más de 136px comparado con abrir `/p/[slug]` en pantalla completa.
  2. **Padding excesivo en Hero de plantillas:** Secciones como `AgencyPortalTemplate` (`py-16`), `CulturalTemplate` (`pt-20 pb-36`) y `PremiumTemplate` (`py-26`) acumulaban márgenes y paddings verticales elevados que, sumados a las barras de píldoras añadidas, centraban el bloque de títulos en la mitad inferior de la pantalla.
  3. **Badges de Hero extensos:** Al autogenerar datos, el `heroBadge` incluía destinos largos con conjunciones ("&") provocando saltos de 2 a 3 líneas que empujaban el `H1`.
- **Solución Paso a Paso:**
  1. En `src/app/demo/preview/page.tsx`, unificar las dos filas en una sola barra compacta ultrafina de 54px (`h-14`) que integra navegación, título truncado, estado, selector de dispositivos y botones de acción ("Editar", "Ver Web", QR y Exportar).
  2. En modo Desktop de `/demo/preview`, eliminar el gap artificial (`p-0 w-full rounded-none border-0`) para que la landing llene la pantalla exactamente igual que en la web real.
  3. Calibrar los paddings del Hero en las 6 plantillas (`py-8 sm:py-10`, `pt-8 sm:pt-12`, `py-12 sm:py-16`) y reducir `space-y` a `space-y-3 sm:space-y-4` para que el `H1` se posicione en el tercio superior visual (a nivel de ojos del viajero).
  4. En `src/data/landingStore.ts`, depurar `shortDest` para que el `heroBadge` generado sea conciso y no genere saltos de línea innecesarios.

### Error 4: Espacio Vacío Muerto Encima del Título y Badge del Hero en Plantilla Trek Aventura
- **Síntoma / Mensaje de Error:** En la plantilla de Aventura (`AdventureTemplate.tsx`), el usuario reporta una franja oscura desmesurada de más de 200px entre el navbar y el título/badge del Hero (`GTGTGTGTGTG`), haciendo que el contenido quede hundido en la mitad inferior.
- **Causa Raíz:**
  1. **Centrado vertical `items-center` con columnas asimétricas:** La sección `#inicio` tenía `min-h-[600px] flex items-center` y su contenedor interno `grid grid-cols-1 lg:grid-cols-12 ... items-center`.
  2. En la columna derecha se ubica `AdventureBookingCard` junto con el bloque flotante de salidas diarias y altitud, sumando una altura superior a 560px.
  3. Cuando el usuario ingresa un título de prueba corto (`GTGTGTGTGTG`) o textos concisos, la columna izquierda mide solo ~220px. Al aplicar `items-center` sobre columnas con 340px de diferencia de altura, el motor CSS añade automáticamente un margen superior de `(560px - 220px) / 2 = 170px` para centrar el texto respecto a la tarjeta derecha.
  4. Sumado al padding `py-10 sm:py-14` (56px), se acumulaban más de 226px de espacio negro vacío encima del badge y el título.
- **Solución Paso a Paso:**
  1. En `src/templates/AdventureTemplate.tsx`, cambiar la alineación del grid a `items-start lg:items-center` para que el bloque de texto izquierdo comience en su posición natural sin forzar un desfase vertical.
### Error 5: Ambigüedad en Toggle de Visualización de Formulario y Duplicación de Íconos en Asistente IA
- **Síntoma / Mensaje de Error:** En el generador de landings (`/demo/new`), el usuario reporta que los controles superiores de la cabecera son incomprensibles ("no se entiende"):
  1. Un botón azul que alternaba entre etiquetas ambiguas `📜 Viendo Todo Continuo` y `Paso a Paso` sin dejar claro qué modo estaba activo ni qué ocurriría al hacer clic.
  2. Un botón con doble ícono `✨ ✨ Autocompletar con IA` visualmente redundante y sin jerarquía clara entre acción e interfaz de visualización.
- **Causa Raíz:**
  1. Se utilizó un único botón `toggle` con texto imperativo vs descriptivo confuso para gobernar un cambio de modo de vista (Layout View Mode), en vez de un **Control Segmentado (Segmented Control)** estándar. Al estar en "Paso a paso", el botón decía "Paso a Paso" con fondo gris, induciendo a error al usuario sobre si ya estaba activado o requería activarse.
  2. El botón de autocompletado con IA contenía el ícono `<Sparkles />` de Lucide y adicionalmente el carácter emoji `✨` dentro del `<span>`, provocando una duplicación visual desagradable.
- **Solución Paso a Paso:**
  1. En `src/app/demo/new/page.tsx`, eliminar por completo el control switch redundante de la cabecera. La página ya cuenta justo debajo con las 4 tarjetas de navegación interactiva por pasos (`Paso 1: Diseño`, `Paso 2: Agencia`, `Paso 3: Tour`, `Paso 4: Itinerario`), por lo que un selector de vista superior sólo agregaba ruido y sobrecarga cognitiva.
  2. Conservar en la cabecera exclusivamente la acción principal: el botón **"Autocompletar con IA"**, limpio, con ícono ámbar `<Sparkles size={15} />` sin caracteres emoji duplicados.
  3. Resultado: Cabecera minimalista, limpia e intuitiva al primer vistazo, con foco al 100% en los 4 pasos claros de configuración.

### Error 6: Textos Cortados e Ininteligibles en la Ficha Técnica de la Plantilla Adventure
- **Síntoma / Mensaje de Error:** En la plantilla de Aventura (`AdventureTemplate.tsx`), la sección de resumen técnico del tour resultaba incomprensible y poco amigable para el viajero:
  1. El badge decía "Descripción & Valor Diferencial de la Aventura" (jerga técnica de marketing corporativo).
  2. Los 6 parámetros (`Altitud`, `Duración`, `Dificultad`, `Modalidad`, `Público`, `Tarifa`) se mostraban en 6 columnas comprimidas (`lg:grid-cols-6`) con la clase CSS `truncate`, cortando las palabras por la mitad (ej. `Grupos Reducidos & Dom...`, `Amantes del Trek...`).
- **Causa Raíz:**
  1. Distribuir 6 bloques de texto en una sola fila forzaba un ancho disponible inferior a 150px por tarjeta.
  2. El uso de conceptos internos de marketing ("Público objetivo", "Valor diferencial") en vez de conceptos orientados a la experiencia del viajero ("¿Quién puede hacer este trek?", "Alojamiento en domos").
- **Solución Paso a Paso:**
  1. En `src/templates/AdventureTemplate.tsx`, rediseñar la grilla a **3 columnas amplias y confortables** (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5`).
  2. Eliminar completamente la clase `truncate` para que todos los textos se lean fluidos y completos.
  3. Sustituir los términos técnicos por etiquetas naturales y explicativas:
     - `Altitud Máxima`: con subtítulo explicativo de paso y aclimatación.
     - `Duración del Trek`: con subtítulo de recorrido escénico.
     - `Exigencia Física`: describiendo condición física requerida.
     - `Tamaño del Grupo`: destacando atención personalizada y ritmo flexible.
     - `Alojamiento en Ruta`: destacando domos térmicos bajo las estrellas.
     - `Tarifa Oficial`: clara, por persona y sin costos ocultos.
  4. Agregar soporte multilenguaje completo (`es`, `en`, `fr`, `pt`, `it`) y badges con iconos temáticos de 20px en pods de color.
