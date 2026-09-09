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

## Lista de Verificación Antes de Desplegar
- [ ] Ejecutar `npm run lint` y verificar que salga con código 0.
- [ ] Ejecutar `npm run build` localmente y comprobar que todas las rutas se generen sin errores.
- [ ] Confirmar que el repositorio remoto en `main` esté actualizado (`git status` limpio).
- [ ] Verificar que el Framework Preset en Vercel sea `Next.js`.
