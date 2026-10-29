---
name: git-repo-workflow
description: Guía de sincronización y configuración persistente del repositorio oficial de GitHub para Cusco Creativos Web / Landing Generador.
---

# Git Repository Workflow & Memory

## Información del Repositorio Oficial
- **URL Remota HTTPS:** `https://github.com/erikvlad1111-ctrl/Generador-de-Landingpages.git`
- **Rama Principal:** `main`
- **Ruta Local:** `c:\Users\copyw\.gemini\antigravity-ide\scratch\cusco-creativos-web`
- **Entorno de Ejecución:** Windows PowerShell (ejecutar comandos Git o npm mediante `powershell -ExecutionPolicy Bypass -Command "..."` o `cmd.exe /c "..."`).

## Protocolo de Push Continuo
Cada vez que se realicen cambios solicitados por el usuario:
1. **Verificar compilación TypeScript y Build:**
   ```bash
   cmd.exe /c "npx tsc --noEmit"
   cmd.exe /c "npm run build"
   ```
2. **Agregar y Commitear:**
   ```powershell
   powershell -ExecutionPolicy Bypass -Command "git add . ; git commit -m '<Mensaje descriptivo en español o inglés>' ; git push origin main"
   ```
3. **Confirmar sincronización:**
   ```powershell
   powershell -ExecutionPolicy Bypass -Command "git status"
   ```

## Errores Resueltos

### `fatal: not a git repository (or any of the parent directories): .git`
- **Causa raíz:** el comando se ejecutó fuera de la carpeta del proyecto (ej. en `C:\Users\copyw`).
- **Diagnóstico:** `Get-Location` / `Test-Path .git`.
- **Solución:** entrar a la carpeta del repo o usar `git -C`:
  ```powershell
  git -C "C:\Users\copyw\.gemini\antigravity-ide\scratch\cusco-creativos-web - copia -vercel-supabase" status
  ```

### Token personal (`ghp_...`) incrustado en la URL del remoto
- **Causa raíz:** el remoto se configuró como `https://usuario:ghp_xxx@github.com/...`, dejando el token en `.git/config` en texto plano.
- **Diagnóstico:** `git remote -v` (si aparece `ghp_` tras `https://usuario:`, está expuesto).
- **Solución:**
  1. Revocar el token en GitHub → Settings → Developer settings → Personal access tokens.
  2. Limpiar el remoto en **cada copia local** (original y `- copia -vercel-supabase`):
     ```powershell
     git -C "<ruta-del-repo>" remote set-url origin https://github.com/erikvlad1111-ctrl/Generador-de-Landingpages.git
     ```
  3. En el siguiente `git push`, Git Credential Manager abrirá el navegador para autenticarse (las credenciales quedan en el gestor de Windows, no en el repo).

## Estructura de Plantillas Guardadas
- **AgencyPortalTemplate:** `src/templates/AgencyPortalTemplate.tsx` (Diseño 1 de alta conversión con hero Vinicunca, acentos naranja, barra de métricas y sellos DIRCETUR).
- **AdventureTemplate:** `src/templates/AdventureTemplate.tsx`
- **PremiumTemplate:** `src/templates/PremiumTemplate.tsx`
- **CulturalTemplate:** `src/templates/CulturalTemplate.tsx`
- **BohoTemplate:** `src/templates/BohoTemplate.tsx`
- **ModernEmeraldTemplate:** `src/templates/ModernEmeraldTemplate.tsx` (Diseño 6 Esmeralda Explorer con gradientes aurora, 5 idiomas y módulos Advance).
- **TemplateRenderer:** `src/templates/TemplateRenderer.tsx` (Renderizador universal con selector dinámico).
