# 🔄 FLUJOS DEL SISTEMA Y ARQUITECTURA DE PLANTILLAS

## 1. El concepto central del proyecto
No estamos construyendo simplemente un "generador de páginas". Es una herramienta de automatización interna para Cusco Creativos S.A.C.
- El administrador ingresa datos, selecciona plantilla y solicita asistencia de IA.
- El sistema combina **Plantilla Visual (React)** + **Contenido Generado (JSON)** + **Imágenes (Storage)** para mostrar la landing.

## 2. Flujo del Usuario (Administrador)
```
LOGIN 
  ↓ (Supabase Auth)
DASHBOARD (Resumen de landings creadas)
  ↓
CREAR PROYECTO (Ingresar datos del tour, precio, etc.)
  ↓
SELECCIONAR PLANTILLA Y OBJETIVO
  ↓
IA GENERA CONTENIDO (Solo genera los textos estructurados)
  ↓
MOTOR COMPILA (Une JSON + Plantilla React)
  ↓
PREVIEW VISUAL
  ↓
EDICIÓN MANUAL (Revisar y corregir textos/imágenes)
  ↓
PUBLICACIÓN (Se genera una URL pública)
```

## 3. Flujo del Visitante (Usuario final)
El visitante final no entra al sistema interno. Simplemente entra a la URL pública (ej: `cusco-creativos.com/tours/machu-picchu`), lee la información, ve las imágenes y hace clic en el botón de reservar/contactar.

## 4. ¿Dónde están las plantillas?
Las plantillas **ya vienen programadas en el frontend**. No se descargan ni se instalan dinámicamente en el MVP. Son componentes de React en `src/templates/`:
- `TemplatePremium`
- `TemplateAdventure`
- `TemplateCultural`

## 5. El motor de plantillas (La pieza fundamental)
La IA **nunca genera HTML ni decide cómo se ve la página**. 
La IA devuelve un JSON estructurado basado en la información del proyecto y el objetivo seleccionado. Luego, el motor inyecta ese JSON en los "huecos" (`{{ TITULO }}`) del código de la plantilla.

### Por ejemplo:
1. **Datos:** Tour "Machu Picchu", S/450
2. **IA genera (JSON):** 
   ```json
   {
     "hero": {
       "title": "Vive Machu Picchu de manera Premium",
       "cta": "Reserva hoy"
     }
   }
   ```
3. **Motor (React Template) ejecuta:** 
   Renderiza el componente `Hero` con un diseño bonito, color dorado (Premium), y coloca los textos devueltos.

## 6. Separación de responsabilidades
- **Frontend (React)**: Muestra la UI del administrador y las plantillas predefinidas.
- **Supabase PostgreSQL**: Guarda todo de forma estructurada.
- **Supabase Edge Functions**: Llama a OpenAI de forma segura para generar el contenido en JSON.

## Resumen para la tesis:
> *"El sistema utiliza plantillas web predefinidas como estructuras de presentación y emplea inteligencia artificial para generar y adaptar el contenido de acuerdo con los datos proporcionados por el administrador, permitiendo posteriormente revisar, editar y publicar la landing page generada."*
