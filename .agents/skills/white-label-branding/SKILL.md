---
name: white-label-branding
description: Guía arquitectónica y resolución de errores para la personalización de marca blanca (empresa, logo, RUC, emails y pie de página) en el generador de landing pages.
---

# Guía y Solución de Marca Blanca y Personalización de Empresa (White-Label Branding)

## 1. Arquitectura de Marca Blanca
Cada landing page generada en el sistema permite a la agencia turística personalizar su identidad corporativa:
- **`companyName`**: Nombre comercial o razón social de la agencia (ej. "Andean Horizon Expeditions").
- **`companyRuc`**: Identificación fiscal o licencia DIRCETUR (ej. "RUC 20608945231").
- **`companyTagline`**: Eslogan o propuesta de valor breve corporativa.
- **`companyEmail`**: Correo oficial de contacto y soporte de la agencia.
- **`logoUrl`**: Logotipo de la agencia (URL pública o Data URL en Base64 ligero).

Estos campos deben propagarse coherentemente en:
1. **Header / Navbar superior:** Logotipo o isotipo + Nombre de la empresa.
2. **Footer / Pie de página legal:**
   - Columna 1: Logotipo + Nombre de empresa + Tagline/Slogan.
   - Datos de contacto y licencias: RUC, DIRCETUR, Email oficial.
   - Copyright dinámico: `© {currentYear} {companyName}. Todos los derechos reservados.`
3. **Modales de Reserva y Cotización:** Nombre de la agencia en el encabezado de confirmación y soporte.
4. **Vista Previa en Tiempo Real (Smartphone Mockup):** Headers y footers en el panel lateral de `/demo/new`.

---

## 2. Errores Diagnosticados y Solucionados

### Error 1: Pie de Página / Final de la Landing con Datos Hardcodeados
- **Síntoma / Mensaje de Error:** El usuario configura "Andean Horizon Expeditions" y su RUC, pero al final de la landing page (footer) se siguen mostrando nombres estáticos como "Cusco Creativos", "Boho Travel Journal", "TrekExplorer Perú" o "RUC 20608945123".
- **Causa Raíz:** En las 6 plantillas (`BohoTemplate.tsx`, `PremiumTemplate.tsx`, `CulturalTemplate.tsx`, `ModernEmeraldTemplate.tsx`, `AgencyPortalTemplate.tsx`, `AdventureTemplate.tsx`), los footers tenían textos quemados en el código JSX en lugar de consultar `data.companyName`, `data.companyRuc`, `data.companyTagline`, `data.companyEmail` y `data.logoUrl`.
- **Solución Paso a Paso:**
  1. En cada plantilla, reemplazar los textos fijos por expresiones dinámicas con fallback graceful:
     ```tsx
     {data.companyName || 'Cusco Creativos'}
     {data.companyRuc || 'RUC 20608945123 • DIRCETUR Oficial'}
     {data.companyTagline || 'Agencia de viajes autorizada y especializada en experiencias de alta montaña.'}
     {data.companyEmail || 'reservas@cuscocreativos.com'}
     ```
  2. En el bloque de logo del footer:
     ```tsx
     {data.logoUrl ? (
       <img src={data.logoUrl} alt={data.companyName} className="h-8 w-auto object-contain" />
     ) : (
       /* Icono SVG o Isotipo de la plantilla */
     )}
     ```
  3. En los modales `BookingModal` y `DirectQuoteModal`:
     ```tsx
     agencyName={data.companyName || 'Cusco Creativos'}
     ```

---

### Error 2: Presets de Plantillas Sobreescribían los Datos de Empresa del Usuario
- **Síntoma:** El usuario ingresaba su Nombre de Empresa y RUC primero, y al cambiar de plantilla o seleccionar un preset en `/demo/new`, sus datos se borraban y se reemplazaban por los datos de muestra del preset.
- **Causa Raíz:** `handleApplyPreset(preset)` sobreescribía incondicionalmente `setCompanyName`, `setCompanyTagline`, `setCompanyRuc`, etc.
- **Solución Paso a Paso:**
  1. Agregar el estado `isCompanyCustomized`:
     ```tsx
     const [isCompanyCustomized, setIsCompanyCustomized] = useState(false);
     ```
  2. Al escribir en los campos de empresa o subir un logo, activar la bandera:
     ```tsx
     onChange={(e) => {
       setCompanyName(e.target.value);
       setIsCompanyCustomized(true);
     }}
     ```
  3. En `handleApplyPreset`, respetar los datos si `isCompanyCustomized` es verdadero:
     ```tsx
     if (!isCompanyCustomized) {
       setCompanyName(preset.companyName || '');
       setCompanyTagline(preset.companyTagline || '');
       setCompanyRuc(preset.companyRuc || '');
       setCompanyEmail(preset.companyEmail || '');
     }
     ```

---

### Error 3: Cuota de `localStorage` Excedida por Archivos de Logo Pesados
- **Síntoma:** Tras subir un logo local desde la computadora, al hacer clic en "Generar Landing" o "Previsualizar", la landing parecía no guardarse o regresaba a la versión anterior ("no se aplica al final").
- **Causa Raíz:** Subir imágenes directamente vía `FileReader.readAsDataURL` generaba cadenas Base64 de 2 a 5 MB. El límite estándar de `localStorage` en navegadores es ~5 MB para todo el dominio. Al superar la cuota, `localStorage.setItem` arrojaba una excepción `QuotaExceededError`, interrumpiendo el guardado.
- **Solución Paso a Paso:**
  1. En `handleLogoFileUpload` tanto en `src/app/demo/new/page.tsx` como en `src/app/demo/preview/page.tsx`, comprimir y redimensionar la imagen en el cliente usando un canvas HTML5 a un máximo de 400x400 px con calidad JPEG/PNG de 0.85 (reduciendo el tamaño a < 35 KB):
     ```typescript
     const img = new window.Image();
     img.onload = () => {
       const canvas = document.createElement('canvas');
       let width = img.width;
       let height = img.height;
       const maxDimension = 400;
       if (width > maxDimension || height > maxDimension) {
         if (width > height) {
           height = Math.round((height * maxDimension) / width);
           width = maxDimension;
         } else {
           width = Math.round((width * maxDimension) / height);
           height = maxDimension;
         }
       }
       canvas.width = width;
       canvas.height = height;
       const ctx = canvas.getContext('2d');
       if (ctx) {
         ctx.drawImage(img, 0, 0, width, height);
         const compressedDataUrl = canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.85);
         setLogoUrl(compressedDataUrl);
       }
     };
     ```
  2. En `saveLandingToStorage` (`src/data/landingStore.ts`), envolver en bloque `try...catch` de fallback que elimine automáticamente payloads pesados o limpie ítems antiguos si ocurre `QuotaExceededError`.

---

### Error 4: Mockup en Smartphone Lateral con Textos Fijos
- **Síntoma:** El panel derecho de `/demo/new` mostraba "NavikX Tours", "Cusco Patrimonial", etc., sin actualizarse en vivo al escribir la empresa o subir un logo.
- **Causa Raíz:** Las 6 plantillas de previsualización en el smartphone tenían textos de marca y banners estáticos.
- **Solución Paso a Paso:** Conectar `companyName`, `companyRuc` y `logoUrl` con truncamiento elegante (`truncate`, `max-w-[140px]`) en los headers y footers del mockup móvil.

---

### Error 5: Desborde y Colisión de Texto Largo de Empresa/Logo con la Barra de Navegación
- **Síntoma:** Cuando el usuario introduce un nombre de empresa largo o el tour tiene un título largo (ej. *"Vive Tu Aventura (Diseño 6 Esmeralda)"* o *"Andean Horizon Expeditions"*), el texto se monta y se encima sobre la barra flotante de enlaces (`[Inicio] Destinos Tours...`), viéndose amontonado y desordenado.
- **Causa Raíz:**
  1. El texto del nombre de la empresa y la insignia (badge) compartían el mismo elemento con `flex whitespace-nowrap` sin `max-width`, sin `min-w-0` y sin `truncate` directo en el string de texto. Al tener `white-space: nowrap`, el texto físico desbordaba el contenedor y se dibujaba directamente encima de los enlaces de navegación.
  2. En pantallas `lg` (1024px a 1280px), la barra de navegación `<nav>` renderizaba hasta 7 enlaces con padding amplio, requiriendo más de 530px de ancho y chocando con el área de marca y controles de divisas/idioma.
- **Solución Paso a Paso:**
  1. En las 6 plantillas (`ModernEmeraldTemplate.tsx`, `PremiumTemplate.tsx`, `AdventureTemplate.tsx`, `BohoTemplate.tsx`, `CulturalTemplate.tsx`, `AgencyPortalTemplate.tsx`), delimitar el contenedor del logo/marca con límites responsivos: `max-w-[170px] xs:max-w-[210px] sm:max-w-[260px] md:max-w-[340px] lg:max-w-[250px] xl:max-w-[340px] shrink`.
  2. Envolver el nombre comercial en un `span` con `truncate block leading-snug` dentro de un flex container `min-w-0`, y separar la insignia con `shrink-0 whitespace-nowrap hidden sm:inline-flex`.
  3. En `ModernEmeraldTemplate.tsx`, hacer la barra de navegación responsiva: mostrar los 5 enlaces principales en `lg` con espaciado compacto (`gap-0.5 text-[11px] px-2.5 py-1`), habilitar Galería en `xl:` y FAQs en `2xl:`, garantizando al menos 130px de holgura y cero solapamiento en cualquier resolución.

---

### Error 6: Fotos de Guías de Turismo con Modelos Extranjeros en vez de Guías Peruanos
- **Síntoma / Mensaje:** En el selector de "Foto o Avatar del Guía (Genera Confianza Inmediata)" y en las plantillas de landings, los presets mostraban modelos extranjeros o fotos genéricas de stock de Unsplash (`photo-1534528741775`, `photo-1507003211169`, `photo-1544005313`, `photo-1517841905240`), restando credibilidad a las agencias turísticas de Cusco y Perú.
- **Causa Raíz:**
  1. `PRESET_GUIDE_AVATARS` en `/demo/new` y `/demo/preview` utilizaba URLs estáticas de Unsplash de modelos caucásicos.
  2. Varias plantillas (`ModernEmeraldTemplate.tsx`, `AgencyPortalTemplate.tsx`, etc.) tenían como fallback hardcodeado `https://images.unsplash.com/photo-1534528741775...` o no sanitizaban URLs previas de landings guardadas en `localStorage`.
- **Comando de Diagnóstico:**
  `git grep "photo-1507003211169" src/` o verificar las miniaturas en la sección "Foto o Avatar del Guía".
- **Solución Paso a Paso:**
  1. Centralizar los presets oficiales en `src/utils/guideAvatars.ts`:
     - **Carlos Mendoza (Lujo / Machu Picchu Senior):** `/images/tour-guide-carlos.jpg`
     - **Raúl / Marco Quispe (Aventura / Alta Montaña & Salkantay):** `/images/tour-guide-raul.jpg` y `/images/tour-guide-marco.jpg`
     - **Lucía Condori (Arqueología / Cultura Andina DIRCETUR):** `/images/tour-guide-lucia.jpg`
     - **Camila Valdivia (Fotografía / Boho & Viajes Conscientes):** `/images/tour-guide-camila.jpg`
     - **Mag. Carlos Valdivia (Historia / Arte Virreinal Colonial):** `/images/tour-guide-valdivia.jpg`
  2. Implementar la función `getSanitizedGuideAvatar(avatarUrl, guideName)` que detecta URLs legacy de Unsplash y las reasigna automáticamente al guía peruano correspondiente según el nombre o rol.
  3. En `demo/new` y `demo/preview`, renderizar la grilla de 5 presets peruanos oficiales con previsualización en vivo, y actualizar `PRESET_TOURS` con su respectivo `guideAvatar`.
  4. En todas las plantillas (`PremiumTemplate.tsx`, `ModernEmeraldTemplate.tsx`, `AgencyPortalTemplate.tsx`, `CulturalTemplate.tsx`), resolver el avatar siempre a través de `getSanitizedGuideAvatar`.


---

### Error 7: Cadenas de Prueba Guardadas en LocalStorage Aparentan ser Valores por Defecto del Diseño ("FRFRFRFR", "FEFRGRG", "GGGTGTGT")
- **Síntoma / Mensaje:** Al abrir la vista previa de una plantilla (ej. `/demo/preview?template=adventure`) o inspeccionar el diseño, se muestran títulos o textos con letras aleatorias ("FRFRFRFR TTTTGGGBBVVCCC", "GGGTGTGT BBBBB", "FEFRGRG") y el usuario cree que vienen por defecto en el código del diseño.
- **Causa Raíz:**
  1. Al probar el creador o editor en sesiones previas, las pruebas locales se guardan en el `localStorage` del navegador bajo `cusco_creativos_landings_v6` con `list.unshift(landing)`.
  2. En `src/app/demo/preview/page.tsx`, al evaluar `templateQuery` sin `slugQuery`, la búsqueda tomaba el primer elemento de la lista local (`list.find(...) || list[0]`), que correspondía a la landing modificada con los textos de prueba.
  3. No existía un mecanismo visible para restablecer los datos al diseño limpio oficial sin borrar manualmente la memoria del navegador.
- **Comando de Diagnóstico:**
  Comprobar si el texto existe en el repositorio o solo en `localStorage`:
  ```bash
  git grep -i "FRFRFRFR" src/
  ```
- **Solución Paso a Paso:**
  1. En `src/data/landingStore.ts`, exportar `resetCurrentLanding(idOrSlug, fallbackTemplate)` y `resetAllLandingsToDefault()`.
  2. En `src/app/demo/preview/page.tsx`, priorizar la plantilla oficial prístina de `INITIAL_LANDINGS` cuando se accede vía `templateQuery`:
     ```tsx
     if (!selected && templateQuery) {
       selected = INITIAL_LANDINGS.find(item => item.template === templateQuery) || list.find(item => item.template === templateQuery) || null;
     }
     ```
  3. Añadir botón con icono `RotateCcw` "Restablecer Fábrica" en la barra de herramientas superior y en el pie del modal de edición de `/demo/preview`.
  4. Añadir botón "Restablecer Fábrica" en el panel `/demo` con confirmación y toast de notificación para limpiar cualquier borrador de prueba del navegador con 1 solo clic.

---

### Error 8: Campos de Empresa/Marca Blanca y Portada Hero (H1, Subtítulo, Badge, Hero CTA) Incompletos o No Reflejados
- **Síntoma / Mensaje de Error:** Al configurar o editar la empresa ("Cusco Grand Expeditions", RUC, Logo, Slogan, Email) y la Portada Principal Hero (Título H1, Subtítulo descriptivo, Insignia Hero Badge y Texto del Botón Hero CTA como "Solicitar Cotización Privada"), los campos no aparecían ordenados o completos para editar en el modal de `/demo/preview`, y en la landing generada o en el preview del smartphone no se reflejaban fielmente.
- **Causa Raíz:**
  1. En el modal editor (`/demo/preview`), la pestaña "Hero & Portada" contenía una caja intrusiva de edición de "Acerca del Tour" incrustada en el centro que empujaba hacia abajo el Botón Principal (Hero CTA) y la Foto de Portada, desordenando la edición del Hero.
  2. En `/demo/new`, existía un acordeón duplicado al final del formulario que repetía `heroBadge` y `heroCta`, lo cual generaba inconsistencias, y el mockup del smartphone en vivo tenía textos quemados en lugar de reflejar `heroBadge`, `heroTitle` y `heroCta`.
  3. En `src/data/landingStore.ts`, `simulateAiGeneration` asignaba valores predeterminados de traducción a `ctaText` en inglés, portugués, francés e italiano, ignorando `params.heroCta` personalizado por el usuario.
  4. En varias plantillas (`ModernEmeraldTemplate.tsx`, `CulturalTemplate.tsx`, `BohoTemplate.tsx`, `PremiumTemplate.tsx`), el Hero CTA o la insignia superior no se leían en ciertos modos de objetivo comercial (`both` o `search`).
- **Comando de Diagnóstico:**
  `git grep "data.hero?.cta" src/templates/` y verificar si el texto personalizado aparece en todas las combinaciones de `objective`.
- **Solución Paso a Paso:**
  1. En `src/app/demo/preview/page.tsx`:
     - Pestaña 1 (General): Ordenar la sección con el título exacto "Empresa, Agencia & Logo (Marca Blanca)", con nombre comercial, RUC, logo (subir archivo / URL / presets de muestra), slogan y email de reservas.
     - Pestaña 2 (Hero & Portada): Limpiar el Hero para presentar ordenadamente: Título Principal H1, Subtítulo / Bajada de Portada con contador de caracteres, Insignia Superior (Hero Badge), Texto del Botón Principal (Hero CTA) y Fotografía Principal con selector rápido y previsualización. Mover la narrativa del tour exclusivamente a la Pestaña 3 (Descripción).
  2. En `src/app/demo/new/page.tsx`:
     - Eliminar el acordeón duplicado de afinamiento de copys al pie del formulario.
     - En el mockup interactivo de smartphone, vincular reactivamente `heroBadge`, `heroTitle`, `heroSubtitle` y `heroCta` en todas las plantillas.
  3. En `src/data/landingStore.ts`:
     - Priorizar `params.heroCta?.trim()` en `simulateAiGeneration` para todos los idiomas (`es`, `en`, `pt`, `fr`, `it`).
  4. En las plantillas (`ModernEmeraldTemplate.tsx`, `CulturalTemplate.tsx`, `BohoTemplate.tsx`, `AdventureTemplate.tsx`, `PremiumTemplate.tsx`, `AgencyPortalTemplate.tsx`):
     - Garantizar que los botones CTA y badges consuman prioritariamente `data.hero?.cta` y `data.hero?.badge`.

---

### Error 9: Cambios Editados No Se Aplicaban (Sobrescritura en LocalStorage) y Campos Editables Omitidos en Diseños Generados
- **Síntoma / Mensaje de Error:** Al guardar cambios en el modal editor o crear una landing (empresa, email de reservas, exclusiones, qué llevar, insignias de confianza, público objetivo, etc.), el usuario reporta: "sigue igual no se aplican los cambios y algunas partes que son editables no aparecen en los diseños generados".
- **Causa Raíz:**
  1. **Sobrescritura destructiva en `landingStore.ts`:** En `getStoredLandings()`, existía una condición que verificaba si `parsed[idx].features.items.length < init.features.items.length`, y en tal caso ejecutaba `parsed[idx].features = init.features;`. Si el usuario eliminaba o editaba características, el store las pisaba con los datos iniciales de fábrica en cada recarga. Además, existían resets forzados para los IDs 2 y 6.
  2. **Desincronización de Parámetros URL en `/demo/preview`:** Al guardar cambios o cambiar de plantilla, la URL (`?template=...`) no se sincronizaba con la landing guardada, y `templateQuery` sobreescribía la plantilla almacenada en `selected.template`.
  3. **Campos editables omitidos en los componentes de plantilla:**
     - `CulturalTemplate.tsx`: No renderizaba la ficha técnica (`altitude`, `difficulty`, `groupType`, `targetAudience`), no mostraba la lista de exclusiones (`notIncluded`), tenía la lista de "Qué llevar" fija a un preset en lugar de vincularla a `data.whatToBring`, no mostraba `trustBadges` y omitía el correo `companyEmail` en el pie de página.
     - `ModernEmeraldTemplate.tsx`: No mostraba `companyEmail` en el pie de página de marca ni la píldora de `targetAudience` en el bloque de filosofía editorial.
     - `AdventureTemplate.tsx`: Carecía de renderizado para `trustBadges` y `targetAudience`.
     - `BohoTemplate.tsx`: En las estadísticas rápidas del hero omitía `altitude`, `difficulty` y `targetAudience`.
- **Comando de Diagnóstico:**
  1. Verificar si `data.whatToBring`, `data.notIncluded`, `data.trustBadges` o `data.companyEmail` se consumen en las plantillas:
     `git grep -n "data.companyEmail" src/templates/`
     `git grep -n "data.whatToBring" src/templates/`
  2. Verificar la lógica de `getStoredLandings` en `src/data/landingStore.ts`.
- **Solución Paso a Paso:**
  1. En `src/data/landingStore.ts`:
     - Eliminar la condición destructiva que reescribía `parsed[idx].features = init.features;`.
     - Eliminar las condiciones de reseteo forzado de plantillas para IDs 2 y 6.
  2. En `src/app/demo/preview/page.tsx`:
     - Evitar que `templateQuery` sustituya la propiedad `selected.template` guardada en la landing.
     - En `handleApplyLive` y `handleSaveEdits`, sincronizar la URL activa con `window.history.replaceState` reflejando el slug, template y tier reales.
     - Repoblar inmediatamente el estado del modal con `populateEditorWithLanding(updated)` al guardar.
  3. En las plantillas:
     - `CulturalTemplate.tsx`: Incorporar la Sección 2.2 con la Ficha Técnica (`duration`, `altitude`, `difficulty`, `groupType`, `targetAudience`), la lista de exclusiones (`notIncluded`) en Sección 7, checklist dinámico de mochila (`whatToBring`) en Sección 8, insignias de confianza dinámicas (`trustBadges`) en Sección 11, y correo de reservas con enlace `mailto:` en Sección 13.
     - `ModernEmeraldTemplate.tsx`: Agregar píldora de `targetAudience` y correo de reservas `companyEmail` en el footer.
     - `AdventureTemplate.tsx`: Agregar estadísticas de `groupType` y `targetAudience` en el Hero flotante y bloque de `trustBadges` en la sección 9.
     - `BohoTemplate.tsx`: Añadir badges de `altitude`, `difficulty` y `targetAudience` en los quick stats tags bajo el título del hero.

---

### Error 10: Texto de Prueba Residual ("GGTGTGTGFFRFRF") en Diseños Oficiales y Desfase de Slugs en Demos en Vivo
- **Síntoma / Mensaje de Error:** Al acceder a los 6 diseños oficiales desde el panel `/demo`, los primeros diseños mostraban texto de prueba residual como `GGTGTGTGFFRFRF` o strings basura en los títulos y portadas, en lugar de los textos oficiales limpios por defecto.
- **Causa Raíz:**
  1. **Persistencia de texto de prueba en LocalStorage:** El usuario o testers habían editado o probado la plataforma ingresando caracteres aleatorios (`GGTGTGTGFFRFRF`) que quedaron almacenados bajo la clave de `localStorage`.
  2. **Filtro de saneamiento insuficiente:** La regex de detección de basura solo evaluaba nombres o slugs (`p.name`, `p.slug`), pero no inspeccionaba todo el objeto JSON de la landing, permitiendo que campos anidados como `hero.title` o `hero.subtitle` mantuvieran la basura.
  3. **Desfase de slugs en los accesos de demos en vivo:** En `src/app/demo/page.tsx`, los botones de los 6 demos apuntaban a slugs modificados (ej. `laguna-humantay-bitacora-fotografica-paisajismo` en vez del slug oficial `laguna-humantay-boho`, y `city-tour-cusco-ancestral` en vez de `city-tour-cusco`), lo que provocaba que la ruta pública `/p/[slug]` cargara landings residuales editadas en lugar del registro maestro de `INITIAL_LANDINGS`.
  4. **Falta de prioridad de bypass para demos oficiales:** La ruta `/p/[slug]` consultaba primero `localStorage` sin comprobar si la solicitud provenía de los botones de demo oficiales del panel.
- **Comando de Diagnóstico:**
  1. Buscar cadenas de prueba residuales en el almacenamiento o código:
     `git grep -n "GGTGT" src/`
  2. Verificar los slugs de `INITIAL_LANDINGS` vs las tarjetas de `/demo/page.tsx`:
     `git grep -n "href=\"/p/" src/app/demo/page.tsx`
- **Solución Paso a Paso:**
  1. En `src/data/landingStore.ts`:
     - Incrementar la versión del almacenamiento a `STORAGE_KEY = 'cusco_creativos_landings_v8'`, purgando automáticamente la clave antigua contaminada `v7`.
     - Implementar la función `isTestJunk(obj)` que serializa el objeto a JSON e inspecciona patrones de prueba (`/GGTGT|GTGTG|FFRFR|FRFRF|FEFRG|GGGTG|TTTTG|BBBBV|ZZZZ|AAAAA|ASDFGH/i`).
     - En `getStoredLandings()`, si alguna plantilla oficial contiene texto basura, restaurarla de inmediato con `{ ...init }` desde `INITIAL_LANDINGS`.
     - En `resetAllLandingsToDefault()`, eliminar explícitamente todas las claves históricas `v7`, `v6`, `v5`, `v4`.
  2. En `src/app/demo/page.tsx`:
     - Corregir los slugs de los 6 botones oficiales para que coincidan exactamente con `INITIAL_LANDINGS` y agregar el parámetro `&demo=official`:
       - Diseño 1: `/p/machu-picchu-vip?template=agency-portal&tier=advance&demo=official`
       - Diseño 2: `/p/laguna-humantay-boho?template=boho-nature&tier=advance&demo=official`
       - Diseño 3: `/p/cusco-luxury-collection?template=premium&tier=advance&demo=official`
       - Diseño 4: `/p/salkantay-trek-5-dias?template=adventure&tier=advance&demo=official`
       - Diseño 5: `/p/city-tour-cusco?template=cultural&tier=advance&demo=official`
       - Diseño 6: `/p/vive-tu-aventura-expediciones-trekking-cusco?template=emerald-explorer&tier=advance&demo=official`
     - Agregar un botón visible "Restablecer Demos" con feedback toast en la cabecera de las 6 plantillas.
  3. En `src/app/p/[slug]/page.tsx` y `src/app/demo/preview/page.tsx`:
     - Si `demo=official` está presente o si `isTestJunk(found)` es positivo, cargar prioritariamente y de forma directa el registro inmaculado desde `INITIAL_LANDINGS`.

---

### Error 11: Titulo de Marca y Logotipo Truncados o Recortados (Vi..., etc.) en Desktop y Movil
- **Sintoma:** El nombre de la empresa se corta con puntos suspensivos mostrando solo un par de letras (ej. Vi... en vez de Vive Tu Aventura), o el logotipo rectangular se achica dentro de una caja cuadrada rigida.
- **Causa Raiz:**
  1. Asimetria de Flexbox (shrink vs shrink-0): El contenedor del logo/marca tenia shrink y max-w-[250px] o max-w-[170px] mientras que nav y CTA tenian shrink-0.
  2. Insignia lateral consumiendo 90px con shrink-0 en la misma fila horizontal.
  3. data.name con sufijos como (Diseno 6 Esmeralda) no eran limpiados.
- **Solucion:**
  1. Centralizar getCleanBrandName() en src/utils/brandUtils.ts.
  2. Asignar shrink-0 y max-w-[calc(100vw-130px)] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[320px] xl:max-w-[420px] 2xl:max-w-[500px].
  3. Soportar logotipos rectangulares (h-8 sm:h-11 max-w-[130px] sm:max-w-[170px] w-auto object-contain).
  4. Ocultar insignias secundarias en lg/xl (hidden 2xl:inline-flex).
  5. Poblar companyName en INITIAL_LANDINGS y actualizar storage a v9.

---

### Error 12: Cambios de Usuario No Se Aplican al Crear Landings Nuevas en `/demo/new`
- **Síntoma:** Al crear una nueva landing page en `/demo/new`, los datos ingresados por el usuario (nombre del tour, precio, descripción, guía) no se aplican o se restablecen a los valores de las plantillas por defecto.
- **Causa Raíz:**
  1. **Sobreescritura destructiva al seleccionar plantilla:** Los botones de selección de plantilla en el Paso 1 y las pastillas del mockup llamaban a `handleApplyPreset()` si el nombre coincidía con algún preset o estaba vacío, reseteando silenciosamente todo lo que el usuario había escrito.
  2. **Desincronización de `heroTitle` y `heroSubtitle`:** `heroTitle` se mantenía con el valor fijado por el preset y no se actualizaba cuando el usuario editaba `name` (Nombre Comercial del Tour), provocando que la IA y las plantillas siguieran mostrando el titular del preset anterior.
  3. **Omisión de `v8` en la migración de LocalStorage:** Al migrar a `v9`, la función `getStoredLandings()` solo buscaba `v7`, `v6`, `v5`, `v4`, perdiendo las landings creadas previamente en `v8`.
  4. **Colisión de Slugs con Demos de Fábrica:** Si el tour compartía slug con una de las 6 plantillas oficiales, `INITIAL_LANDINGS` sobreescribía la landing personalizada.
- **Solución Paso a Paso:**
  1. Desacoplar la selección de plantilla de la carga de presets: al hacer clic en una plantilla solo se ejecuta `setTemplate()`. Se agregó una barra explícita con botones opcionales para autocompletar con ejemplos preconfigurados únicamente cuando el usuario lo solicite voluntariamente.
  2. Añadir flags de estado `isHeroTitleCustomized` e `isHeroSubtitleCustomized`. Mientras el usuario no edite manualmente el H1 o subtítulo en la sección avanzada, estos campos se sincronizan reactivamente en tiempo real con `name` y `description`.
  3. Incorporar `cusco_creativos_landings_v8` en la cadena de migración de `getStoredLandings()` y en `resetAllLandingsToDefault()`.
  4. En `simulateAiGeneration()`, si el slug base coincide con una plantilla oficial de fábrica, anexar automáticamente un sufijo numérico único (`${rawBaseSlug}-${Date.now().toString().slice(-4)}`) para blindar la landing personalizada.
  5. En `src/utils/brandUtils.ts`, asegurar que `getCleanBrandName()` no recorte palabras clave legítimas del tour como "expediciones", "machu picchu" o "bitácora".
