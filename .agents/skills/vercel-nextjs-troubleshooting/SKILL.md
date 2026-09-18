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

## Lista de Verificación Antes de Desplegar
- [ ] Ejecutar `npm run lint` y verificar que salga con código 0.
- [ ] Ejecutar `npm run build` localmente y comprobar que todas las rutas se generen sin errores.
- [ ] Confirmar que el repositorio remoto en `main` esté actualizado (`git status` limpio).
- [ ] Verificar que el Framework Preset en Vercel sea `Next.js`.
- [ ] Validar que en celular (375px) `document.documentElement.scrollWidth === document.documentElement.clientWidth`.
- [ ] Validar que el botón "Móvil" en `/demo/preview` muestre la réplica exacta de 390px sin desbordes de escritorio.

