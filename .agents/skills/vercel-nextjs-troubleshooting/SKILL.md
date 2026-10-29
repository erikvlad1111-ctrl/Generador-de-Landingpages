---
name: vercel-nextjs-troubleshooting
description: >-
  Guía y runbook de resolución rápida para errores de despliegue en Vercel y Next.js.
  Activar cuando ocurran errores como "404: NOT_FOUND (Code: NOT_FOUND)", bloqueos por
  SSO/Deployment Protection, fallos de build por ESLint/TypeScript, imágenes externas o
  fallos por variables de entorno faltantes (ej. Supabase).
---

# Runbook de Solución de Errores Vercel + Next.js

Este runbook documenta los errores comunes resueltos en este proyecto para su diagnóstico y corrección inmediata.

---

## 1. Error `404: NOT_FOUND` (Code: NOT_FOUND, ID: <region>::<hash>)

### Síntoma
Al visitar la URL del despliegue en Vercel (ej. `https://<proyecto>.vercel.app`), la página muestra:
```text
404: NOT_FOUND
Code: NOT_FOUND
ID: gru1::... (o iad1::..., sfo1::...)
```

### Causa Raíz
El **Framework Preset** del proyecto en Vercel está configurado como `Other` en lugar de `Next.js`. Vercel asume que es un sitio HTML estático plano y busca archivos físicos en `public/` o en la raíz `.`. Al no existir `index.html` para las rutas de la app, el Edge Router retorna 404.

### Diagnóstico Rápido
```bash
npx vercel project inspect <nombre-proyecto>
```
Revisar la sección `Framework Settings`:
- Si `Framework Preset` dice `Other` y `Output Directory` dice `public`, este es el problema.

### Solución Inmediata
1. Actualizar el preset a Next.js y restablecer comandos a autodetección:
   ```bash
   npx vercel project update <nombre-proyecto> --framework nextjs --auto-detect build-command --auto-detect output-directory --auto-detect install-command -y
   ```
2. Redesplegar a producción:
   ```bash
   npx vercel --prod --yes
   ```

---

## 2. Bloqueo de Acceso por "Deployment Protection" (SSO Protection)

### Síntoma
Al intentar abrir la URL pública, Vercel redirige a `https://vercel.com/login` con el título `Protected Deployment – Vercel`, impidiendo el acceso a visitantes no autenticados en el equipo de Vercel.

### Diagnóstico Rápido
```bash
npx vercel project protection <nombre-proyecto>
```
Revisar si `ssoProtection` está activado (`all_except_custom_domains` o similar).

### Solución Inmediata
Desactivar la protección SSO:
```bash
npx vercel project protection disable <nombre-proyecto> --sso
```

---

## 3. Fallo de Build por ESLint / TypeScript Estricto

### Síntoma
El comando `npm run build` o `npm run lint` falla en CI/CD con código de salida 1.

### Casos Típicos y Soluciones:
1. **`@typescript-eslint/no-explicit-any`**:
   - *Error:* `Unexpected any. Specify a different type`.
   - *Solución:* Reemplazar `any` en campos JSON/JSONB por `Record<string, unknown>`.
2. **`@next/next/no-html-link-for-pages`**:
   - *Error:* `Do not use an <a> element to navigate to /. Use <Link /> from next/link instead`.
   - *Solución:* Importar `Link` desde `next/link` y reemplazar los elementos `<a>` por `<Link href="...">`.
3. **`@typescript-eslint/no-unused-vars`**:
   - *Error:* Variables o imports no utilizados.
   - *Solución:* Eliminar las importaciones o parámetros no referenciados.
4. **`Type '{ data: LandingData; isLive: boolean; }' is not assignable to type 'IntrinsicAttributes & TemplateProps'`**:
   - *Error:* Un componente contenedor pasa propiedades adicionales (`isLive`, etc.) a plantillas que no declaran dicha propiedad opcional en su interfaz `TemplateProps`.
   - *Solución:* Definir explícitamente `isLive?: boolean;` en la interfaz `TemplateProps` de cada plantilla para garantizar compatibilidad con el discriminador de renderizado.
5. **Windows PowerShell ExecutionPolicy con scripts `.ps1` de npx/vercel**:
   - *Error:* `npx : No se puede cargar el archivo C:\Program Files\nodejs\npx.ps1 porque la ejecución de scripts está deshabilitada`.
   - *Solución:* En entornos Windows donde las directivas de PowerShell bloqueen scripts, invocar los comandos a través del intérprete de comandos clásico: `cmd.exe /c "npx vercel --prod --yes"`.

---

## 4. Crash por Variables de Entorno Faltantes (ej. Supabase)

### Síntoma
Al ejecutar el build o al importar el cliente en páginas estáticas, el proceso falla con:
```text
Error: supabaseUrl is required.
```

### Causa Raíz
`createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', ...)` arroja un error crítico si la variable está vacía o no existe en Vercel.

### Solución Inmediata
Implementar valores de reserva seguros (*safe fallbacks*) en `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('Supabase URL or Anon Key is missing. Ensure you have populated your .env.local file or Vercel Environment Variables.');
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## 5. Advertencias de Imágenes Externas no Optimizadas (`next/image`)

### Síntoma
Advertencia `@next/next/no-img-element` o error de host no configurado en Next.js.

### Solución Inmediata
1. Configurar los dominios externos en `next.config.ts`:
   ```typescript
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     images: {
       remotePatterns: [
         {
           protocol: "https",
           hostname: "images.unsplash.com",
         },
       ],
     },
   };

   export default nextConfig;
   ```
2. Usar el componente `<Image />` con `fill` o `width`/`height` y `sizes`.

---

## 6. Bloqueo de Despliegue en Plan Hobby por Autor de Commit (Repositorio Privado)

### Síntoma
Vercel cancela el despliegue automático con el mensaje:
```text
The deployment was blocked because the commit author did not have contributing access to the project on Vercel.
The Hobby Plan does not support collaboration for private repositories. Please upgrade to Pro to add team members.
```

### Causa Raíz
En el plan Hobby gratuito de Vercel, si un repositorio de GitHub está configurado como **Privado**, Vercel exige estrictamente que el autor del commit (`git config user.email`) coincida exactamente con la cuenta de GitHub propietaria de la cuenta de Vercel. Si el commit fue firmado por otra cuenta o bot de desarrollo, Vercel lo interpreta como "colaborador externo" y bloquea el despliegue exigiendo un plan Pro de pago.

### Diagnóstico Rápido
```bash
git config user.name ; git config user.email ; git log -n 1 --pretty=format:"%h %an <%ae> %s"
```

### Soluciones
1. **Solución A (Inmediata sin tocar código ni pagar Pro):**
   - Cambiar la visibilidad del repositorio en GitHub a **Public** (Settings -> Danger Zone -> Change repository visibility -> Public).
   - En repositorios públicos, el plan Hobby de Vercel no aplica restricciones de colaboradores ni autores.
2. **Solución B (Manteniendo el repositorio Privado):**
   - Configurar la identidad local de Git para que coincida exactamente con la cuenta propietaria del repositorio:
     ```bash
     git config user.name "<usuario-propietario>"
     git config user.email "<usuario-propietario>@users.noreply.github.com"
     ```
   - Re-firmar el último commit y hacer push forzado:
     ```bash
     git commit --amend --allow-empty --author="<usuario-propietario> <email-propietario>" --no-edit
     git push --force origin main
     ```

---

## 6. Desbordamiento Horizontal en Celular y Desborde de Botón Flotante (Layout Shift & Blank Margins)

### Síntoma
En teléfonos móviles o viewports estrechos (320px–430px), la página "se mueve hacia los lados", tiemblan los bordes al deslizar verticalmente, aparecen franjas blancas vacías a la derecha de las secciones con fondo oscuro (`bg-[#1C1917]`, etc.), y el botón flotante de WhatsApp sobrepasa el borde derecho de la pantalla o se duplica sobre sí mismo.

### Causa Raíz
1. **Desbordamiento por Elementos Fijos o Flex sin Ajuste:** Barras de control fijas (`sticky top-0`) con filas de botones sin `flex-wrap` o sin `overflow-x-auto` fuerzan un ancho de más de 500px, ensanchando todo el `<html>` y `<body>`.
2. **Animaciones con `scale` sin corte:** Imágenes del Hero o contenedores absolutos con `scale-105` sin `overflow-hidden` filtran píxeles hacia los laterales.
3. **Botón Flotante Duplicado y Expansión Hacia Afuera:** Coexistencia de botones flotantes simultáneos (uno en el layout/página principal y otro dentro de la plantilla) en `bottom-6 right-6`, y etiquetas que se despliegan hacia la derecha (`right`) fuera del límite de la pantalla al hacer hover/touch en lugar de desplegarse hacia adentro (`left`).

### Comando de Diagnóstico
```javascript
// Ejecutar en la consola del navegador en viewport móvil (ej. 390px):
console.log('Ancho Scroll vs Cliente:', document.documentElement.scrollWidth, document.documentElement.clientWidth);
Array.from(document.querySelectorAll('*'))
  .filter(el => el.getBoundingClientRect().right > window.innerWidth || el.getBoundingClientRect().left < 0)
  .map(el => ({ tag: el.tagName, class: el.className, right: el.getBoundingClientRect().right }));
```

### Solución Paso a Paso
1. **Blindar el Contenedor Raíz:**
   Agregar `w-full max-w-full overflow-x-hidden` al wrapper principal de la página (`src/app/p/[slug]/page.tsx`).
2. **Hacer Compacta la Barra Superior en Móvil:**
   Ocultar textos largos en pantallas pequeñas (`hidden sm:inline`), aplicar `overflow-hidden` y usar botones compactos para que nunca superen el 100% del viewport.
3. **Contener la Escala del Hero:**
   Añadir `overflow-hidden` en el contenedor `absolute inset-0 z-0` de la imagen de cabecera.
4. **Unificar y Asegurar el Botón Flotante de WhatsApp:**
   - Evitar que la página pública renderice un segundo botón flotante cuando la plantilla (`agency-portal`) ya lo incluye.
   - Posicionar a `bottom-5 right-5` (20px de resguardo) con `max-w-[calc(100vw-2.5rem)]`.
   - Ocultar tooltips horizontales en móviles (`hidden sm:flex`) para mostrar solo el botón circular limpio, o expandirlos hacia el interior (`flex-row-reverse`).

---

## 7. Discrepancia Visual en el Simulador Móvil del Previsualizador (Tailwind Media Queries Evaluando contra el Viewport de Escritorio)

### Síntoma
En el editor/previsualizador (`/demo/preview`), al hacer clic en el botón de vista móvil (`Móvil / Smartphone`), el marco se reduce a 390px pero el contenido interior sigue mostrando elementos de escritorio (por ejemplo, cuadrículas de 4 columnas apretadas, textos comprimidos verticalmente, menús horizontales o el botón flotante de WhatsApp situado fuera del marco del teléfono en la esquina del monitor).

### Causa Raíz
Las media queries de Tailwind CSS (`sm:`, `md:`, `lg:`) evalúan contra el ancho de la ventana del navegador (`window.innerWidth`), no contra el ancho del contenedor padre `div` con `max-w-[390px]`. Si el usuario está en una pantalla de escritorio de 1280px o 1920px, `@media (min-width: 768px)` es verdadero, forzando clases de escritorio dentro de una caja de 390px. Además, los elementos `fixed` se posicionan relativos a la ventana completa y no al marco simulado.

### Comando de Diagnóstico
Revisar si el componente embebe directamente el JSX dentro de un `div` con ancho limitado en lugar de usar un contexto de viewport aislado (`<iframe>`).

### Solución Paso a Paso
1. **Aislar el Viewport con un `<iframe>` en Modos Móvil y Tablet:**
   En `src/app/demo/preview/page.tsx`, en lugar de renderizar `<TemplateRenderer>` dentro de un `div` para móviles, renderizar un `<iframe>` de ancho y alto 100%:
   ```tsx
   <iframe
     key={`${landing.slug}-${landing.template}-${viewMode}-${refreshKey}`}
     src={`/p/${landing.slug}?embed=true&mode=${viewMode}&tpl=${landing.template}&r=${refreshKey}`}
     title={`Simulador ${viewMode}`}
     className="w-full h-full border-0 bg-white"
   />
   ```
2. **Soportar Parámetros de Embebidura en la Ruta Pública (`/p/[slug]`):**
   En `src/app/p/[slug]/page.tsx`, ocultar las barras de demostración cuando `embed=true` y pasar `viewMode={modeParam}` a `TemplateRenderer`.
3. **Resultado:**
   El `<iframe>` crea un contexto de navegación con `window.innerWidth = 390px`. Todas las media queries `@media (min-width: 640px)` evalúan a `false`, garantizando que la vista sea 100% idéntica a un teléfono físico real, y los botones `fixed` (como WhatsApp) se ubican exactamente dentro de la pantalla del celular.

---

## 8. Pantalla "This page couldn’t load / Reload to try again, or go back" al Terminar de Generar Páginas (Temporal Dead Zone - TDZ)

### Síntoma
Al finalizar el asistente de generación de landing pages en `/demo/new` y redirigir a `/demo/preview?slug=...` (o al visitar `/p/[slug]`), la pantalla colapsa con el error de App Router / React:
```text
This page couldn’t load
Reload to try again, or go back.

[Reload]
[Back]
```
En la consola de desarrollo del navegador se aprecia el error fatal:
```text
ReferenceError: Cannot access 'st' before initialization
at TourSupportAndFaqs (TourSupportAndFaqs.tsx:914:40)
```

### Causa Raíz
Dentro de `src/components/common/TourSupportAndFaqs.tsx`, el filtrado de preguntas (`filteredQuestions`) intentaba leer `st.categories[0]` en una línea anterior a la declaración del objeto `const st = { ... }`.
En JavaScript/TypeScript, las variables declaradas con `const` y `let` residen en la *Temporal Dead Zone (TDZ)* antes de su inicialización física en el cuerpo de la función. Al ejecutarse la renderización del componente en tiempo de ejecución, cualquier acceso prematuro detona un `ReferenceError` fatal que tumba la jerarquía de React completa.

### Comando de Diagnóstico
Revisar si hay variables de configuración o diccionarios `const` referenciados antes de su declaración:
```bash
grep -n "st.categories" src/components/common/TourSupportAndFaqs.tsx
grep -n "const st =" src/components/common/TourSupportAndFaqs.tsx
```

### Solución Paso a Paso
1. **Reordenar Declaraciones en el Componente:**
   Mover la declaración completa del diccionario `const st = { ... };` inmediatamente después de los handlers de estado y **antes** de cualquier computación o filtro derivado (`filteredQuestions`).
2. **Validar la Navegación del Generador:**
   Verificar que al completar el formulario en `/demo/new`, la transición a `/demo/preview?slug=...` renderice de inmediato el canvas con las 5 plantillas sin excepciones.

---

## 9. Gradientes y Halos Luminosos (Blur) Invisibles en Secciones (Stacking Context & Negative Z-Index)

### Síntoma
Los orbes de color, halos de fondo con degradados radiales o efectos de desenfoque (`blur-3xl`, `radial-gradient`) en secciones intermedias o secundarias de una página parecen no existir o verse totalmente oscuros/planos, a pesar de estar presentes en el código JSX.

### Causa Raíz
1. **Stacking Context con Z-Index Negativo:** Al asignar `className="... pointer-events-none -z-10"` a un halo dentro de una sección con `position: relative`, el navegador renderiza el elemento con z-index negativo **detrás** del fondo opaco (`background-color: #041720`) del elemento padre o raíz, volviéndolo matemáticamente invisible.
2. **Fondos de Altura Fija:** Cuando los gradientes decorativos de cabecera tienen una altura fija (ej. `h-[1100px]`), cualquier sección posterior que sobrepase esa altura queda sin iluminación y recae sobre un fondo plano sin gradientes.

### Comando de Diagnóstico
```bash
grep -n "\-z-10" src/templates/<Template>.tsx
```

### Solución Paso a Paso
1. **Corregir Z-Index de los Halos:**
   Cambiar los elementos decorativos de fondo a `z-0` (en lugar de `-z-10`).
2. **Asegurar Stacking Context del Contenido:**
   Envolver el contenido interactivo y tarjetas de la sección en `<div className="relative z-10">`, permitiendo que los halos se sitúen en la capa intermedia: visibles sobre el lienzo de fondo, pero detrás de textos, botones y tarjetas.
3. **Canvas Continuo de Página:**
   Configurar el `style` del contenedor raíz con un `backgroundImage` multi-stop a lo largo de toda la extensión del scroll (8,000+ px) con orbes radiales complementarios cada 800-1,200 px.

## 10. Bloqueo de Ejecución de Scripts en Windows PowerShell (`PSSecurityException`) al compilar Next.js

### Síntoma / Mensaje de Error
Al ejecutar comandos de Node/NPM en terminales Windows PowerShell:
```text
npm : No se puede cargar el archivo C:\Program Files\nodejs\npm.ps1 porque la ejecución de scripts está deshabilitada en este sistema.
+ CategoryInfo          : SecurityError: (:) [], PSSecurityException
+ FullyQualifiedErrorId : UnauthorizedAccess
```

### Causa Raíz
La política de ejecución (`ExecutionPolicy`) de PowerShell en Windows está configurada como `Restricted` por defecto, impidiendo la ejecución de scripts `.ps1`.

### Comando de Diagnóstico
```powershell
Get-ExecutionPolicy
```

### Solución Paso a Paso
1. Invocar el comando de compilación envolviéndolo en el intérprete clásico de comandos de Windows:
   ```cmd
   cmd /c npm run build
   ```
2. O alternativamente en PowerShell:
   ```powershell
   powershell -ExecutionPolicy Bypass -Command "npm run build"
   ```
3. O llamar directamente al shim `.cmd` (funciona en PowerShell sin cambiar la política):
   ```powershell
   npx.cmd tsc --noEmit
   npm.cmd run build
   ```

## 11. Título Mock de Desarrollador ("Diseño X...") o Sufijo Forzado en Navbar y Hero H1

### Síntoma / Mensaje de Error
Al publicar o previsualizar una landing generada (ej. `/p/diseno-1-portal-oficial-de-agencia-de-viajes-peru`), se mostraba:
- Al lado del logo en la barra superior: `"DISEÑO 1 - PORTAL OFICIAL DE ... AGENCIA OFICIAL"`.
- En el título principal H1 del Hero: `"DISEÑO 1 - PORTAL OFICIAL DE AGENCIA DE VIAJES PERÚ: LA EXPERIENCIA DEFINITIVA EN CUSCO"`.
- En el correo de cabecera: `reservas@diseo1portalofic.pe`.

### Causa Raíz
1. **Confusión entre Marca y Tour:** Las plantillas caían en fallback a `data.name` (nombre del tour) cuando `data.companyName` no existía, incrustando el título largo del tour en el navbar junto al isotipo.
2. **Textos Mock en Presets:** En `PRESET_TOURS` de `src/app/demo/new/page.tsx`, el Preset 1 tenía `name: 'Diseño 1 - Portal Oficial de Agencia de Viajes Perú'` sin campos propios de `companyName`, `heroTitle`, `companyTagline` ni `companyEmail`.
3. **Sufijo forzado en IA generativa:** En `src/data/landingStore.ts`, `generateLandingFromPrompt` concatenaba obligatoriamente `${params.name}: La Experiencia Definitiva en Cusco` en el `heroTitle` si no se especificaba explícitamente.
4. **Falta de sincronización en `handleApplyPreset`:** Al presionar un preset de 1 clic, solo se transferían los campos de tour, dejando vacíos los estados avanzados de marca de agencia y hero.

### Comando de Diagnóstico
Buscar en el código fuentes de textos "Diseño" o concatenaciones fijas:
```bash
git grep -n "Portal Oficial de Agencia de Viajes Perú"
git grep -n "La Experiencia Definitiva en Cusco"
```

### Solución Paso a Paso
1. **Desacoplamiento Estricto de Marca vs. Tour en Plantillas:**
   - En `AgencyPortalTemplate.tsx`, el nombre de marca al lado del logo lee `data.companyName || 'Cusco Grand Expeditions'` y nunca cae en `data.name`.
   - Se aplicó lo mismo en `AdventureTemplate.tsx` (`TrekExplorer Perú`), `ModernEmeraldTemplate.tsx` (`NavikX Cusco`), `BohoTemplate.tsx` (`Boho Travel Journal`), `CulturalTemplate.tsx` (`Cusco Patrimonial Tours`) y `PremiumTemplate.tsx` (`Cusco Luxury Collection`).
2. **Saneamiento Defensivo con Expresiones Regulares:**
   - Filtrar con `!/^dise[ñn]o\s*\d+/i.test(...)` tanto `brandName` como `heroTitle` para que si un usuario tiene guardada una versión antigua en su `localStorage`, la plantilla limpie automáticamente el texto mock y muestre nombres comerciales reales.
   - Retirar el sufijo residual `replace(/:\s*la experiencia definitiva en cusco$/i, '')`.
3. **Poblado Completo en `PRESET_TOURS` y `handleApplyPreset`:**
   - Asignar a cada preset nombres reales de operador formal (RUC 20, DIRCETUR), títulos de hero auténticos (ej. `"Machu Picchu de Lujo con Tren Panorámico"`) y emails corporativos (`reservas@cuscograndexpeditions.com`).
   - En `handleApplyPreset`, actualizar simultáneamente `companyName`, `companyTagline`, `companyRuc`, `companyEmail`, `heroTitle`, `heroSubtitle`, `heroBadge` y `heroCta`.

---

## 11. Cambios Editados no se Aplican en Diseño 1 y Pestaña de Edición de Descripción No Visible

### Síntoma
1. Al editar campos en el modal de edición de `/demo/preview` sobre el Diseño 1 (Portal Oficial de Agencia), los cambios no se reflejan (o se restablecen al recargar la página).
2. El usuario no encuentra la sección para editar la descripción narrativa del tour, o los cambios en inclusiones, testimonios y botón CTA no impactan la plantilla.

### Causa Raíz
1. **Sobrescritura por `INITIAL_LANDINGS` en el cargador:** En `src/app/demo/preview/page.tsx`, la lógica de selección priorizaba `INITIAL_LANDINGS.find(item => item.template === templateQuery)` sobre `list` (`localStorage`). Al navegar con `?template=agency-portal`, Next.js volvía a cargar la plantilla estática de fábrica ignorando los datos modificados por el usuario.
2. **Desconexión entre `features.items` e `includedServices`:** El editor guardaba las inclusiones en `features.items`, pero `AgencyPortalTemplate.tsx` renderizaba `data?.includedServices`, que no se actualizaba en `buildUpdatedLandingData()`.
3. **Testimonios e Inclusiones Hardcodeados:** En `AgencyPortalTemplate.tsx`, `getLocalizedTestimonials()` devolvía un array estático ignorando `data?.testimonials`, y `heroCtaLabel` ignoraba `data?.hero?.cta`.
4. **Visibilidad de la Descripción:** En el editor, la descripción estaba separada en la Pestaña 3 ("Descripción"), mientras que en la Pestaña 2 ("Hero") solo figuraba como "Subtítulo Persuasivo de Portada", generando confusión si el usuario buscaba editar la descripción directamente en la portada o en la ficha general.

### Solución Paso a Paso
1. **Priorizar Ediciones Guardadas en `preview/page.tsx`:**
   Invertir el orden de búsqueda para consultar primero `list.find(item => item.template === templateQuery)` (`localStorage`) antes de recurrir a `INITIAL_LANDINGS`.
2. **Sincronizar `includedServices`:**
   En `buildUpdatedLandingData()`, asignar `includedServices: editFeaturesItems.split('\n').map(s => s.trim()).filter(Boolean)` junto a `features.items`.
3. **Vincular Datos Dinámicos en `AgencyPortalTemplate.tsx`:**
   - Hacer que `heroCtaLabel` use `data?.hero?.cta ? translateText(data.hero.cta, lang) : ...`.
   - Hacer que `getLocalizedIncludedServices` caiga en `data?.features?.items` si `includedServices` está vacío.
   - En `getLocalizedTestimonials()`, renderizar `data.testimonials` si existen.
   - En `#experiencia`, mostrar siempre el bloque de descripción narrativa con fallback ordenado: `data?.about?.content || data?.description || data?.hero?.subtitle`.
   - Mostrar la Tarifa/Precio por persona directamente en la cabecera de la Ficha Técnica para confirmación visual inmediata.
4. **Edición Accesible y Redundante de la Descripción:**
   - Añadir en la Pestaña 2 ("Hero") un bloque de edición directa de la Descripción Narrativa Completa ("Acerca del Tour") con acceso directo a la Pestaña 3.
   - Añadir en la Pestaña 1 ("General") una tarjeta de acceso directo a la Descripción con un clic.

---

## 12. Recursos Bloqueados por la Content Security Policy (CSP)

### Síntoma / Mensaje de Error
Una imagen, fuente, mapa, script o llamada a API deja de cargar en producción/dev y en la consola aparece:
```text
Refused to load the script 'https://...' because it violates the following Content Security Policy directive: "script-src 'self' 'unsafe-inline'".
Refused to connect to 'https://xxxx.supabase.co/...' because it violates ... "connect-src ...".
Refused to frame 'https://www.youtube.com/' because it violates ... "frame-src ...".
```

### Causa Raíz
`next.config.ts` define una CSP (variante sin nonces) con una lista blanca de orígenes. Cualquier servicio externo nuevo (analytics, YouTube, otro proyecto Supabase, CDN) queda bloqueado hasta añadirlo a la directiva correspondiente. `connect-src` toma el origen de `NEXT_PUBLIC_SUPABASE_URL`; si la variable no existe en el build usa `https://*.supabase.co`.

### Comando de Diagnóstico
```bash
curl -sI http://localhost:3000/ | findstr /i content-security-policy
```
Y revisar la consola del navegador (pestaña Console / Issues) para ver la directiva exacta que bloquea.

### Solución Paso a Paso
1. Identificar la directiva del mensaje (`script-src`, `connect-src`, `frame-src`, `img-src`, `font-src`, `style-src`).
2. Añadir solo el origen necesario a esa directiva en `cspHeader` de `next.config.ts` (nunca `*`).
3. Reiniciar `npm run dev` (los headers de `next.config.ts` no se recargan en caliente) o redesplegar.
4. Si cambia el proyecto de Supabase, actualizar `NEXT_PUBLIC_SUPABASE_URL` en Vercel y redesplegar para que `connect-src` se regenere.

---

## Lista de Verificación Antes de Desplegar
- [ ] Ejecutar `npm run lint` y verificar que salga con código 0.
- [ ] Ejecutar `cmd /c npm run build` localmente y comprobar que todas las rutas se generen sin errores.
- [ ] Confirmar que el repositorio remoto en `main` esté actualizado (`git status` limpio).
- [ ] Verificar que el Framework Preset en Vercel sea `Next.js`.
- [ ] Validar que en celular (375px) `document.documentElement.scrollWidth === document.documentElement.clientWidth`.
- [ ] Validar que el botón "Móvil" en `/demo/preview` muestre la réplica exacta de 390px sin desbordes de escritorio.
- [ ] Validar que los halos luminosos y gradientes decorativos se ubiquen en `z-0` y el contenido en `z-10` para garantizar su visibilidad en todo el scroll.



