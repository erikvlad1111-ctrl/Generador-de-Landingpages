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
