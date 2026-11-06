# 🎓🏢 PLAN DE DOBLE VERSIÓN INDEPENDIENTE: EMPRESA VS. TESIS UNIVERSITARIA

> **Objetivo:** Garantizar que **Cusco Creativos S.A.C.** mantenga su sistema en producción de forma continua y segura, mientras que el tesista cuente con un **Entorno de Sustentación Académica 100% independiente** (sin depender de computadoras, correos corporativos, códigos 2FA ni celulares de respaldo de la empresa el día de la defensa universitaria).

---

## 1. Arquitectura de Dos Versiones Independientes

El código fuente de Next.js es **uno solo y 100% compatible con ambos entornos**. La separación total se logra mediante cuentas y variables de entorno independientes:

| Componente | 🏢 1. Versión Empresa (Desarrollo / Producción) | 🎓 2. Versión Tesis (Sustentación Universitaria) |
| :--- | :--- | :--- |
| **Propósito** | Operación diaria de la agencia y actualización continua | Copia estable y blindada para el jurado universitario |
| **Cuenta GitHub** | GitHub de la empresa (Privado) | GitHub personal del tesista (Privado o Público) |
| **Base de Datos** | Supabase de la empresa (Datos operativos reales) | Supabase personal del tesista (Tours de demostración) |
| **Autenticación** | Correos corporativos y 2FA de la empresa | Correo personal del tesista (acceso desde cualquier laptop) |
| **Motor de IA** | `OPENAI_API_KEY` de la empresa | `OPENAI_API_KEY` autorizada o personal + Motor de respaldo local |
| **Hosting Web** | Vercel / Dominio de la empresa | Vercel personal (URL pública lista para proyectar) |

---

## 2. Garantías de Seguridad y Confidencialidad

1. **Cero claves expuestas en el código (`GitHub`):**
   - El código fuente nunca contiene contraseñas ni claves privadas (`OPENAI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
   - El archivo `.env.local` está bloqueado en `.gitignore`. Las llaves viven únicamente en el panel privado de **Vercel → Environment Variables** de cada cuenta.
2. **Aislamiento de Datos (Confidencialidad):**
   - La **Versión Tesis** utiliza exclusivamente tours turísticos de demostración (*Machu Picchu VIP, Salkantay Trek, Laguna Humantay, Vinicunca, Valle Sagrado*) y el script estructural `supabase/setup_completo.sql`, sin exponer bases de datos privadas de clientes reales de la empresa.
3. **Protección RLS desde el primer segundo:**
   - Las políticas **Row Level Security (RLS)** están incluidas dentro de las migraciones SQL, por lo que tanto el Supabase de la empresa como el Supabase de la tesis quedan protegidos automáticamente al ejecutar el script.

---

## 3. Orden de Trabajo Paso a Paso

### Fase 1: Terminar el proyecto base al 100% (Una sola vez)
- [ ] **Paso 1.1:** Completar el motor de IA en `/api/ai/generate` (prompt completo por plan/objetivo/idioma + validación JSON + registro en `ai_generations` + motor de respaldo local).
- [ ] **Paso 1.2:** Conectar `src/data/landingStore.ts` y `/p/[slug]` con Supabase PostgreSQL (`landings.data` JSONB) manteniendo fallback automático en `localStorage`.
- [ ] **Paso 1.3:** Unificar las migraciones en un script maestro `supabase/setup_completo.sql` listo para ejecutar con un solo clic en cualquier cuenta de Supabase.

### Fase 2: Desplegar y asegurar la Versión Empresa
- [ ] **Paso 2.1:** Subir el código final al repositorio GitHub de la empresa.
- [ ] **Paso 2.2:** Ejecutar el script SQL en el Supabase de la empresa y crear el bucket público `landing-images`.
- [ ] **Paso 2.3:** Configurar variables de entorno (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`) en el Vercel de la empresa.

### Fase 3: Clonar la Versión Tesis (En 5 minutos)
- [ ] **Paso 3.1:** Crear repositorio en el **GitHub personal** y subir (`git push` / Import) el código terminado.
- [ ] **Paso 3.2:** Crear proyecto en el **Supabase personal**, pegar y ejecutar el script SQL en el **SQL Editor**, y crear los 2 usuarios de demostración (`admin@cuscocreativos.com` y `empleado@cuscocreativos.com`).
- [ ] **Paso 3.3:** Configurar `OPENAI_API_KEY` (autorizada o propia) y las credenciales del Supabase personal en el **Vercel personal**.
- [ ] **Paso 3.4:** Desplegar en el Vercel personal y obtener la URL pública de sustentación.
- [ ] **Paso 3.5:** Probar el acceso completo desde otra laptop o ventana incógnita sin depender de ningún correo ni celular de la empresa.
