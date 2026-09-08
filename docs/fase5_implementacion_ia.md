# 🤖 FASE 5 — IMPLEMENTACIÓN DE OPENAI E INTEGRACIÓN CON REACT Y SUPABASE

## 5.1. Objetivo de esta fase
Implementar la integración de Inteligencia Artificial (IA) para generar contenido textual para las landing pages turísticas a partir de la información registrada por el empleado.

La IA podrá generar: Títulos, Subtítulos, Descripciones, Beneficios, CTA, FAQ, textos adaptados a tono e idioma.
**La IA NO será responsable de construir visualmente la página.** El sistema (con sus plantillas) controla la estructura, diseño, colores y responsive. La IA funciona exclusivamente como asistente de contenido.

## 5.2. Arquitectura real de la integración
```
                   USUARIO
                       │
                       ▼
             ┌──────────────────┐
             │ React + TypeScript│
             │    + Tailwind    │
             └────────┬─────────┘
                      │
              autenticación / CRUD
                      │
                      ▼
             ┌──────────────────┐
             │     SUPABASE     │
             │                  │
             │ Auth             │
             │ PostgreSQL       │
             │ Storage          │
             │ RLS              │
             └────────┬─────────┘
                      │
                      │ solicitud de IA
                      ▼
             ┌────────────────────┐
             │ Supabase Edge      │
             │ Function           │
             │ generate-landing   │
             └─────────┬──────────┘
                       │
                       │ API Key
                       ▼
             ┌────────────────────┐
             │      OPENAI        │
             │                    │
             │ GPT-5.6 Luna       │
             └─────────┬──────────┘
                       │
                       │ JSON estructurado
                       ▼
             ┌────────────────────┐
             │ Supabase Edge      │
             │ Function           │
             └─────────┬──────────┘
                       │
                       ▼
                PostgreSQL
                       │
                       ▼
             ┌──────────────────┐
             │ React Editor     │
             └────────┬─────────┘
                      │
                      ▼
                 LANDING PAGE
```

## 5.3. y 5.4. ¿Dónde se crea y guarda la API Key de OpenAI?
La `OPENAI_API_KEY` **nunca** debe colocarse en el código de React. Se almacena como un secreto en las Supabase Edge Functions mediante el panel de control o la CLI:
`supabase secrets set OPENAI_API_KEY=tu_clave`

## 5.5. Variables de entorno del frontend
El frontend (React/Next.js) solo tendrá:
`NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co`
`NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxxxx`

## 5.7. ¿Cómo solicita React la generación mediante IA?
Al presionar el botón de generación, el frontend hace un POST a la Edge Function enviando un JSON con las instrucciones (ID de landing, idioma, tono, secciones solicitadas), sin enviar nunca la API Key.

## 5.8. y 5.9. ¿Cómo obtiene la IA los datos de la empresa?
No existe una "tabla de IA". La Edge Function extrae la información real directamente desde `PostgreSQL` (`businesses`, `landings`, `sections`). Luego reúne esa información y construye un contexto en el prompt para asegurar que la IA trabaje sobre datos verdaderos.

## 5.10. Prompt de OpenAI
El prompt se compone de:
1. **Rol**: Eres un asistente especializado...
2. **Información**: Datos reales de la empresa.
3. **Tarea**: Genera contenido en JSON para las secciones solicitadas.
**Reglas**: No inventar precios, fechas, teléfonos. Usar tono y formato solicitado.

## 5.11. ¿Qué modelo usaremos?
Utilizaremos `GPT-5.6 Luna` mediante la Responses API de OpenAI, optimizado para cargas de trabajo a volumen sensibles al costo.

## 5.12. Respuesta estructurada
Queremos un JSON exacto que coincida con nuestros `types` en React, por ejemplo:
```json
{
  "sections": [
    {
      "type": "hero",
      "content": {
        "title": "Descubre Cusco",
        "subtitle": "Aventura garantizada",
        "cta": "Explorar"
      }
    }
  ]
}
```

## 5.13. ¿Cómo React sabe dónde colocar cada contenido?
Mediante el campo `type` de la sección. Si `type = hero`, React renderizará `HeroSection.tsx` pasándole los datos extraídos de `content` (JSONB).

## 5.14 y 5.15. ¿Qué pasa con los gráficos y datos reales?
La IA **no genera gráficos ni inventa estadísticas**. Si se muestran cifras (+10 años, +5000 clientes), los números vienen de la base de datos y la interfaz se encarga de presentarlos de forma visual. La IA solo genera el texto descriptivo asociado a esos números.

## 5.17. Guardado de la respuesta
Una vez que OpenAI devuelve el JSON, la Edge Function lo valida y lo guarda en la base de datos, específicamente en la columna `content` de tipo JSONB de la tabla `sections`.

## 5.18. Historial de generaciones
Cada vez que se llama a la IA, la operación queda registrada en la tabla `ai_generations` para efectos de auditoría y análisis, no como una base de conocimiento activa.

## 5.23. Control del consumo
La generación no es automática al abrir una página. Es una acción explícita disparada por un botón. Esto ayuda a controlar los costos de OpenAI.

## 5.24. Resultado final de la integración
El sistema es **semi-automático**. La IA propone contenido; el empleado revisa, modifica y aprueba.

## Siguiente paso recomendado para la implementación real
Una vez que terminen todas las fases de documentación (Fase 1-5):
1. Crear proyecto OpenAI (API Key).
2. Crear proyecto Supabase (Secrets).
3. Conectar el frontend a Supabase.
4. Crear la estructura de Base de Datos y aplicar el SQL de la Fase 3.
5. Crear Edge Function y probar la conexión con OpenAI.
6. Guardar el JSON y enlazarlo con el Editor de UI.
