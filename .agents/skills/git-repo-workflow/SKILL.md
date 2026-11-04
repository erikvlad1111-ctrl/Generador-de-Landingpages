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
  2. Limpiar el remoto en **cada copia local** (original y `- copia -vercel-supabase`) manteniendo **solo el usuario** (sin token):
     ```powershell
     git -C "<ruta-del-repo>" remote set-url origin https://erikvlad1111-ctrl@github.com/erikvlad1111-ctrl/Generador-de-Landingpages.git
     git -C "<ruta-del-repo>" config credential.https://github.com.username erikvlad1111-ctrl
     ```
  3. En el siguiente `git push`, Git Credential Manager usará automáticamente la credencial almacenada de `erikvlad1111-ctrl` en el gestor de Windows sin exponer el token en `.git/config`.

### `git push origin main` se queda colgado o falla con `fatal: Cannot prompt because user interactivity has been disabled`
- **Síntoma:** Al ejecutar `git push origin main` desde una terminal en segundo plano, el comando se queda esperando indefinidamente.
- **Causa raíz:** En el Administrador de Credenciales de Windows (`cmdkey /list`) existen múltiples cuentas de GitHub (`git:https://github.com` asociada a `erik1111111` y `git:https://erikvlad1111-ctrl@github.com` asociada a `erikvlad1111-ctrl`). Si la URL remota no especifica el usuario (`https://github.com/...`), Git Credential Manager intenta usar la credencial genérica (`erik1111111`), falla por permisos y abre un diálogo interactivo que bloquea el proceso.
- **Comando de Diagnóstico:**
  ```powershell
  cmdkey /list | Select-String -Pattern "git|github" -Context 1,2
  ```
- **Solución Paso a Paso:**
  ```powershell
  git config credential.https://github.com.username erikvlad1111-ctrl
  git remote set-url origin https://erikvlad1111-ctrl@github.com/erikvlad1111-ctrl/Generador-de-Landingpages.git
  git push origin main
  ```

## Estructura de Plantillas Guardadas
- **AgencyPortalTemplate:** `src/templates/AgencyPortalTemplate.tsx` (Diseño 1 de alta conversión con hero Vinicunca, acentos naranja, barra de métricas y sellos DIRCETUR).
- **AdventureTemplate:** `src/templates/AdventureTemplate.tsx`
- **PremiumTemplate:** `src/templates/PremiumTemplate.tsx`
- **CulturalTemplate:** `src/templates/CulturalTemplate.tsx`
- **BohoTemplate:** `src/templates/BohoTemplate.tsx`
- **ModernEmeraldTemplate:** `src/templates/ModernEmeraldTemplate.tsx` (Diseño 6 Esmeralda Explorer con gradientes aurora, 5 idiomas y módulos Advance).
- **TemplateRenderer:** `src/templates/TemplateRenderer.tsx` (Renderizador universal con selector dinámico).
