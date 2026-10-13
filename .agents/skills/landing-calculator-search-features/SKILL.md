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
   - Filtros de tours por categorías y de reseñas por categoría.
   - Pestañas de mochila (*Qué llevar*, *Incluye*, *No incluye*).
   - Barra flotante inferior de precio fijo (`data.price / pers.`).

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
