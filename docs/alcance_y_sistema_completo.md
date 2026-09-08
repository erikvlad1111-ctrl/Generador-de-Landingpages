# 🧩 SISTEMA COMPLETO Y ALCANCE DE LA TESIS (MVP)

## 1. Visión general del flujo
Una plataforma interna para que la agencia cree, personalice, genere con IA y publique landing pages para guías turísticos.

```
ADMINISTRADOR 
  ↓
DASHBOARD (Resumen de landings/guías)
  ↓
CREAR GUÍA (Nombre, Idiomas, Experiencia, Destinos, Fotos)
  ↓
CONFIGURAR LANDING (Plantilla, Estilo, Objetivo, Idioma)
  ↓
IA (Genera y adapta el contenido en base a las reglas y objetivos)
  ↓
GENERADOR DE LANDING (Motor que une Plantilla + Datos + IA)
  ↓
VISTA PREVIA
  ↓
EDICIÓN MANUAL
  ↓
PUBLICACIÓN (Landing Online para el visitante)
```

## 2. Diferenciación por objetivos (Inteligencia del sistema)
La inteligencia del sistema no es solo enviar datos a ChatGPT. Está en cómo el sistema prioriza el contenido según el objetivo.
- Si el objetivo es **Reservas por WhatsApp**, el sistema prioriza: Hero -> Beneficios -> Destinos -> Testimonios -> CTA WhatsApp.
- Si el objetivo es **Cotización**, prioriza: Hero -> Servicios -> Galería -> Formulario.

## 3. ¿Qué hay en la base de datos (PostgreSQL)?
- `usuarios`: id, email, rol
- `guias`: id, nombre, experiencia, idiomas, whatsapp...
- `destinos` y `servicios`: tablas relacionadas
- `landings`: id, guia_id, plantilla, objetivo, estado, contenido_ia (JSONB)
- `plantillas`: id, nombre, tipo

## 4. LÍMITES Y ALCANCE DE LA TESIS (MVP)

### ✅ Obligatorio (El núcleo del proyecto)
- Login
- Dashboard
- Crear guía / Proyecto
- Subir imágenes
- Elegir plantilla
- Generar contenido con IA
- Generar landing
- Vista previa
- Editar
- Publicar / URL pública

### 🟡 Opcional (Si sobra tiempo)
- 3 a 5 plantillas diferentes
- Generación en inglés (Multi-idioma)
- SEO y FAQ Automático
- Edición con instrucciones a la IA

### ❌ FUERA DEL ALCANCE (No hacer en V1)
- Editor visual *Drag & Drop* tipo Elementor
- Crear páginas desde cero sin plantillas predefinidas
- Tienda online, pagos o reservas automáticas
- Sistema de CRM avanzado
- Análisis y analíticas complejas
- Exceso de plantillas (20+)

## 5. Medición del éxito para la tesis
Se medirá la optimización de procesos demostrando cuánto tiempo le tomaba a la agencia la **creación manual** de una landing (X horas) versus la **creación automatizada** con este sistema web (X minutos).
