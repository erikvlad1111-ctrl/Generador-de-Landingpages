# Auditoría y Matriz de Funcionalidades: Buscadores, Detectores de Precios y Calculadoras en las 6 Plantillas

Este documento detalla el estado funcional y técnico de los sistemas de búsqueda, calculadoras dinámicas y detección de tarifas en las 6 plantillas oficiales de Cusco Creativos Web / Landing Generador.

---

## 1. Matriz Comparativa Rápida

| Plantilla | Archivo Principal | Buscador de Tours / Texto | Calculadora de Tarifas en Vivo | Detector / Conversor de Monedas | Filtros Interactivos | Barra Flotante Móvil de Precio |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **1. Modern Emerald** | `src/templates/ModernEmeraldTemplate.tsx` | **Sí** (Barra flotante Hero) | **Sí** (Pasajeros × Tarifa base) | **Sí** (USD, PEN, EUR) | Inclusiones, Itinerario | **Sí** (Con total dinámico) |
| **2. Agency Portal** | `src/templates/AgencyPortalTemplate.tsx` | Por Categoría | **Sí** (Avanzada completa) | **Sí** (USD, PEN, EUR, BRL) | **Sí** (Pestañas de catálogo) | Sección de Presupuesto en Vivo |
| **3. Boho** | `src/templates/BohoTemplate.tsx` | Por Categoría | **Sí** (Barra interactiva Hero: Pasajeros + Fecha) | Tarifa Dinámica | **Sí** (Tours, Reseñas, Mochila) | **Sí** (Sticky Quick Booking Bar) |
| **4. Adventure** | `src/templates/AdventureTemplate.tsx` | No (*Top Spots* fijos) | No (Precio unitario fijo) | No | **Sí** (Inclusiones técnicas) | **Sí** (Sticky Quick Booking Bar) |
| **5. Cultural** | `src/templates/CulturalTemplate.tsx` | No (Acceso ancla) | No (Precio unitario fijo) | No | Pestañas de eventos | **Sí** (Sticky Quick Booking Bar) |
| **6. Premium** | `src/templates/PremiumTemplate.tsx` | No | No (Tarifas fijas biseladas) | No | Selector tipográfico | Price Box biselado en Hero |

---

## 2. Detalle Técnico por Diseño

### 1. Modern Emerald (`ModernEmeraldTemplate.tsx`)
- **Buscador / Quick Bar en Hero:**
  - Selector de destino (`t.searchWhere`).
  - Fechas / Duración (`t.searchDates`).
  - Selector interactivo de pasajeros (botones `+` y `-` con rango de 1 a 12 pax).
- **Calculadora en Vivo:**
  - Función `formatPrice(basePriceUsd, passengers)`.
  - Multiplica automáticamente la tarifa unitaria por el número de pasajeros y actualiza el botón de acción principal y las tarjetas de catálogo.
- **Conversor Multidivisa:**
  - Soporta `USD`, `PEN` (Soles a tasa 3.75) y `EUR` (Euros a tasa 0.92).
  - Incluye el desglose final calculado en el mensaje preformateado de WhatsApp.

### 2. Agency Portal (`AgencyPortalTemplate.tsx` + `LiveBudgetCalculator.tsx`)
- **Calculadora Interactiva de Presupuesto en Vivo (`LiveBudgetCalculator.tsx`):**
  - Módulo más avanzado de la plataforma (disponible en nivel Avanzado / Advance).
  - Selector desplegable de tour activo desde el catálogo.
  - Contador dinámico de pasajeros con **Descuento Grupal automático (10% OFF para 4+ personas)**.
  - Multiplicador por nivel de servicio: Estándar (1.0x), VIP (+35% / 1.35x), Panorámico (+60% / 1.60x).
  - Add-ons opcionales: Huayna Picchu (+$25), Almuerzo Buffet Gourmet (+$20), Bastones de trekking (+$10).
  - Multidivisa en tiempo real: `USD`, `PEN`, `EUR`, `BRL`.
  - Checkout directo hacia cotizador modal o mensaje detallado a WhatsApp.
- **Filtros de Catálogo:**
  - Pestañas interactivas: *Todos*, *Trekking*, *Machu Picchu*, *Valle Sagrado*, *Adrenalina*.

### 3. Boho (`BohoTemplate.tsx`)
- **Barra Interactiva Completa de Reserva en Hero:**
  - Tarjeta de reserva interactiva editorial con tarifa base formateada (`Tarifa Oficial Todo Incluido: S/ 160 / persona`).
  - Subtítulo explicativo: *Incluye movilidad, guía oficial y seguro • Sin cargos ocultos*.
  - Selector de viajeros interactivo (+ / - de 1 a 12 pax).
  - Selector de fecha estimada de viaje (`<input type="date">`).
  - Cálculo dinámico en vivo del total según número de viajeros (`Total Estimado: S/ 320 PEN`).
  - Botón de reserva directa por WhatsApp con mensaje prearmado que incluye tour, viajeros, fecha y total estimado.
- **Filtros:**
  - Categorías de tours (chips de filtro en catálogo).
  - Filtro por categoría de testimonios y reseñas.
  - Pestañas de equipaje e inclusiones (*Qué llevar*, *Incluye*, *No incluye*).
- **Barra Móvil Flotante:**
  - Sticky bottom bar con tarifa unitaria formateada (`/ persona`), rating y accesos directos a WhatsApp/Cotizar.

### 4. Adventure (`AdventureTemplate.tsx`)
- **Filtros Técnicos:**
  - Selector por categorías de inclusiones (Transporte VIP, Guía colegiado, Conserjería 24/7, Equipo homologado, Domos panorámicos, Gastronomía de altura, Monitoreo médico y oxígeno).
- **Sección de Destinos:**
  - Sección visual interactiva *"Explore Top Searched Spots 🔥"*.
- **Barra de Precio:**
  - Badge en Hero (`Desde: $350 USD`) y barra flotante fija inferior para conversión rápida.

### 5. Cultural (`CulturalTemplate.tsx`)
- **Navegación / Búsqueda:**
  - Botón central con ícono de búsqueda (`<Search size={16} />`) con scroll suave hacia el territorio arqueológico.
  - Pestañas interactivas de cronograma / eventos.
- **Detector de Tarifa:**
  - Indicador flotante con tarifa de referencia (`data.price || 'S/ 85 PEN'`) y botones de reserva directa.

### 6. Premium (`PremiumTemplate.tsx`)
- **Enfoque de Alta Gama:**
  - "Price Box" biselado de lujo en el Hero con la tarifa de referencia (`data.price || '$450 USD'`).
  - Tarjetas de catálogo con precios individuales claros sin cálculo aritmético interactivo en pantalla.
  - Selector dinámico de tipografía de lujo (`outfit`, `cinzel`, `playfair`).

---

## 3. Módulos Universales (Presentes en las 6 Plantillas)

1. **Buscador en Tiempo Real de Soporte y Preguntas Frecuentes (`TourSupportAndFaqs.tsx`):**
   - Presente en las 6 plantillas.
   - Cuenta con un campo de búsqueda en vivo (`<input type="text" placeholder="Buscar preguntas..." />`) con debounce, filtrado instantáneo por texto y chips de categoría temática.
2. **Modal Oficial de Cotización (`QuoteModal.tsx`):**
   - Presente en las 6 plantillas.
   - Detecta automáticamente el tour seleccionado y su tarifa de referencia.
   - Incluye selector de pasajeros por rangos (1, 2, 3-5, 6+), fecha programada y formulario estructurado para lead capture.
