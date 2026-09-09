---
trigger: always_on
---

# Regla: Registro Continuo de Errores Solucionados (Skills)

Siempre que se diagnostique y resuelva un problema, error de compilación, error de despliegue, fallo de configuración o bug en el proyecto:

1. **Registrar la solución en los Skills:**
   - Si corresponde a Vercel o Next.js, agregarlo o actualizarlo en `.agents/skills/vercel-nextjs-troubleshooting/SKILL.md`.
   - Si es un dominio o tecnología diferente, crear o actualizar el skill correspondiente bajo `.agents/skills/<tema>/SKILL.md`.

2. **Estructura que debe tener cada error registrado:**
   - **Síntoma / Mensaje de Error:** Código de error exacto o mensaje que el usuario o la consola muestra.
   - **Causa Raíz:** Explicación técnica de por qué ocurre.
   - **Comando de Diagnóstico:** Instrucción rápida para verificar si es el caso.
   - **Solución Paso a Paso:** Comandos o cambios de código exactos aplicados para resolverlo.

3. **Objetivo:**
   - Permitir que el agente identifique y resuelva los mismos errores o problemas similares de forma inmediata en interacciones futuras sin repetir diagnósticos lentos.
