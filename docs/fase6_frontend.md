# 🖥️ FASE 6 — DESARROLLO COMPLETO DEL FRONTEND

## 6.1. Objetivo de la fase
El objetivo es desarrollar la interfaz completa de la aplicación web interna.
Tecnologías principales:
- **React / Next.js**: Construcción de la interfaz
- **TypeScript**: Lenguaje y tipado seguro
- **Tailwind CSS**: Diseño y estilos
- **Supabase Client**: Comunicación con el Backend y DB

El frontend permite a los empleados iniciar sesión, crear landings, registrar empresas, configurar secciones, solicitar contenido con IA, editar ese contenido, visualizar plantillas en tiempo real y guardar.

## 6.2. Arquitectura del frontend
El frontend NO tiene backend propio en Node/Express. Se conecta directamente con los servicios de Supabase:
- **Supabase Auth**: Autenticación
- **Supabase DB (PostgreSQL)**: Lectura/Escritura de datos
- **Supabase Storage**: Gestión de imágenes
- **Supabase Edge Functions**: Llamadas seguras a OpenAI

## 6.3. Estructura final del frontend
```
frontend/
├── public/
├── src/ o app/
│   ├── assets/
│   ├── components/
│   │   ├── common/ (Button, Input, Modal, etc.)
│   │   ├── layout/ (Sidebar, Topbar, ProtectedRoute)
│   │   └── landing/ (HeroSection, FAQSection, etc.)
│   ├── pages/ o app/ (Login, Dashboard, CreateLanding, Editor, Preview...)
│   ├── templates/ (AdventureTemplate, PremiumTemplate...)
│   ├── services/ (authService, landingService, generationService...)
│   ├── hooks/ (useAuth, useLanding...)
│   ├── types/ (auth.ts, business.ts, landing.ts...)
│   ├── lib/ (supabase.ts)
│   ├── index.css / globals.css
```

## 6.16 - 6.18. Editor de Landing basado en secciones
No es un editor gráfico libre tipo Canva, sino **estructurado**. El usuario ve formularios para cada sección (ej. Título, Descripción, CTA). 
El contenido inicial lo genera la IA, pero el usuario puede editar manualmente cada campo de texto. Todo se guarda en `sections.content` (JSONB).

## 6.22 - 6.23. Sistema de Templates y separación de diseño
- **Contenido**: Viene de la Base de datos (generado por IA y editado por el usuario) estructurado en JSON.
- **Plantilla (Template)**: Decide cómo mostrar visualmente ese contenido (colores, tipografías, responsive).
**La IA nunca rompe el diseño** porque no devuelve HTML ni estilos, solo devuelve el JSON.

## 6.25 - 6.26. Servicios y Hooks
La lógica de conexión a Supabase no está mezclada en la UI.
- `services/`: Contienen las llamadas reales a Supabase o Edge Functions.
- `hooks/`: Envuelven los servicios para manejar estados (loading, data, error) en React.

## 6.39. Orden de implementación real
Para asegurar un desarrollo ordenado:
1. **Configuración inicial**: Proyecto, Tailwind, Supabase Client.
2. **Autenticación**: Login, Protected Routes.
3. **Layout**: Sidebar, Topbar.
4. **Dashboard**: Listado de landings desde DB.
5. **Creación**: Formulario para configurar una nueva landing.
6. **Integración IA**: Llamar a la Edge Function y manejar carga.
7. **Editor estructurado**: Formularios dinámicos por sección, orden, activar/desactivar.
8. **Imágenes**: Subida y vinculación con secciones.
9. **Templates**: Maquetado visual de cada plantilla.
10. **Preview**: Unir templates y contenido.
11. **Pruebas y Exportación**.

## Resultado final de la Fase 6
Un frontend funcional donde el empleado recorre todo el ciclo: 
`LOGIN -> DASHBOARD -> CREAR LANDING -> GENERAR CON IA -> EDITAR TEXTOS -> SUBIR IMÁGENES -> PREVIEW VISUAL -> PUBLICAR`.
