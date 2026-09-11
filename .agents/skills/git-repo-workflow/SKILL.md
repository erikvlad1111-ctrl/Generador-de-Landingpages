---
name: git-repo-workflow
description: Guía de sincronización y configuración persistente del repositorio oficial de GitHub para Cusco Creativos Web / Landing Generador.
---

# Git Repository Workflow & Memory

## Información del Repositorio Oficial
- **URL Remota HTTPS:** `https://github.com/erik1111111/Demo-LandingGenerador.git`
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

## Estructura de Plantillas Guardadas
- **AgencyPortalTemplate:** `src/templates/AgencyPortalTemplate.tsx` (Diseño #1 de alta conversión con hero Vinicunca, acentos naranja, barra de métricas y sellos DIRCETUR).
- **AdventureTemplate:** `src/templates/AdventureTemplate.tsx`
- **PremiumTemplate:** `src/templates/PremiumTemplate.tsx`
- **CulturalTemplate:** `src/templates/CulturalTemplate.tsx`
- **BohoTemplate:** `src/templates/BohoTemplate.tsx`
- **TemplateRenderer:** `src/templates/TemplateRenderer.tsx` (Renderizador universal con selector dinámico).
