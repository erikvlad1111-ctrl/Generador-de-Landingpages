import { LandingData } from '@/types/landing';

export function generateStandaloneHtml(data: LandingData): string {
  const isQuote = data.objective === 'quote';
  const cleanPhone = (data.whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const tourName = data.name || data.hero?.title || 'Tour en Cusco';
  const guide = data.guideName || 'Cusco Creativos';
  const encodedMsg = encodeURIComponent(
    `Hola ${guide}, vi su página web "${tourName}" y deseo información para reservar.`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  const heroImg =
    data.heroImage ||
    'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop';
  const galleryImages = data.galleryImages && data.galleryImages.length > 0
    ? data.galleryImages
    : [
        'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop'
      ];

  const isPremium = data.template === 'premium';
  const isCultural = data.template === 'cultural';
  const isBoho = data.template === 'boho-nature';

  // Theme accents
  const primaryColor = isPremium ? 'amber-500' : isCultural ? 'orange-600' : isBoho ? '[#C86D51]' : 'emerald-600';
  const primaryHover = isPremium ? 'amber-600' : isCultural ? 'orange-700' : isBoho ? '[#b05d43]' : 'emerald-700';
  const bgTheme = isPremium ? 'bg-slate-950 text-slate-100' : isCultural ? 'bg-amber-50/50 text-stone-900' : isBoho ? 'bg-[#FAF7F2] text-stone-800' : 'bg-stone-50 text-stone-900';
  const cardBg = isPremium ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-stone-200 text-stone-900';

  return `<!DOCTYPE html>
<html lang="${data.language || 'es'}" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(tourName)} | Guía Oficial ${escapeHtml(guide)}</title>
  <meta name="description" content="${escapeHtml(data.hero?.subtitle || 'Experiencia turística inolvidable en Cusco y Machu Picchu')}" />
  <meta name="generator" content="Cusco Creativos AI Generator" />
  
  <!-- Open Graph / Redes Sociales -->
  <meta property="og:title" content="${escapeHtml(tourName)}" />
  <meta property="og:description" content="${escapeHtml(data.hero?.subtitle || '')}" />
  <meta property="og:image" content="${heroImg}" />
  <meta property="og:type" content="website" />

  <!-- Google Fonts & Tailwind CDN -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="${bgTheme} antialiased min-h-screen selection:bg-${primaryColor} selection:text-white">

  <!-- NAVBAR -->
  <header class="fixed top-0 inset-x-0 z-50 ${isPremium ? 'bg-slate-950/85' : 'bg-stone-900/90'} backdrop-blur-md text-white border-b ${isPremium ? 'border-slate-800/80' : 'border-white/10'}">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2 font-extrabold text-lg sm:text-xl tracking-tight">
        <span class="w-3 h-3 rounded-full bg-${primaryColor}"></span>
        <span>${escapeHtml(guide)}</span>
      </div>
      <nav class="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-300">
        <a href="#itinerario" class="hover:text-${primaryColor} transition-colors">Detalles</a>
        <a href="#incluye" class="hover:text-${primaryColor} transition-colors">Privilegios</a>
        <a href="#galeria" class="hover:text-${primaryColor} transition-colors">Galería</a>
        <a href="#faqs" class="hover:text-${primaryColor} transition-colors">Preguntas</a>
      </nav>
      <a 
        href="${whatsappUrl}" 
        target="_blank" 
        rel="noopener noreferrer"
        class="bg-${primaryColor} hover:bg-${primaryHover} text-white px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2"
      >
        <span>${data.objective === 'both' ? 'WhatsApp & Cotizar' : isQuote ? 'Cotizar por WhatsApp' : 'Reservar Ahora'}</span>
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.534 1.771.815 2.796.815 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm6.386 8.784c-.267.75-1.545 1.436-2.148 1.528-.59.09-1.341.135-3.844-.9-3.203-1.325-5.263-4.577-5.424-4.792-.158-.214-1.293-1.721-1.293-3.283 0-1.562.818-2.33 1.107-2.652.289-.322.632-.403.842-.403.21 0 .421.002.607.011.196.01.458-.074.717.549.267.643.914 2.228.994 2.39.08.163.134.354.027.568-.108.214-.162.348-.322.535-.16.188-.337.419-.481.563-.16.16-.328.334-.141.655.188.321.834 1.374 1.79 2.226 1.232 1.097 2.271 1.437 2.592 1.598.322.16.51.134.7-.08.188-.215.805-.939 1.02-1.26.214-.322.429-.268.724-.161.295.107 1.874.884 2.196 1.045.322.161.536.241.617.375.08.134.08.777-.187 1.527z"/></svg>
      </a>
    </div>
  </header>

  <!-- HERO SECTION -->
  <section class="relative min-h-[85vh] flex items-center justify-center pt-20 pb-16 overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img src="${heroImg}" alt="${escapeHtml(tourName)}" class="w-full h-full object-cover object-center brightness-50" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 text-center text-white space-y-6">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold">
        <span class="w-2 h-2 rounded-full bg-${primaryColor} animate-pulse"></span>
        <span>${escapeHtml(data.hero?.badge || 'Experiencia Certificada')}</span>
      </div>

      <h1 class="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight drop-shadow-md">
        ${escapeHtml(data.hero?.title || tourName)}
      </h1>

      <p class="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow">
        ${escapeHtml(data.hero?.subtitle || '')}
      </p>

      <!-- Key Specs Pill -->
      <div class="inline-flex flex-wrap justify-center items-center gap-4 sm:gap-8 bg-slate-900/80 backdrop-blur-md border border-slate-800 px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-xl">
        <div>
          <span class="block text-slate-400 text-[10px] uppercase font-bold">Precio sugerido</span>
          <span class="font-extrabold text-${primaryColor} text-base">${escapeHtml(data.price || '$95 USD')}</span>
        </div>
        <div class="h-6 w-px bg-slate-700 hidden sm:block"></div>
        <div>
          <span class="block text-slate-400 text-[10px] uppercase font-bold">Duración</span>
          <span class="font-bold text-white">${escapeHtml(data.duration || 'Full Day')}</span>
        </div>
        <div class="h-6 w-px bg-slate-700 hidden sm:block"></div>
        <div>
          <span class="block text-slate-400 text-[10px] uppercase font-bold">Dificultad</span>
          <span class="font-bold text-white">${escapeHtml(data.difficulty || 'Moderada')}</span>
        </div>
      </div>

      <!-- Hero Actions -->
      <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a 
          href="${whatsappUrl}" 
          target="_blank" 
          rel="noopener noreferrer"
          class="w-full sm:w-auto bg-${primaryColor} hover:bg-${primaryHover} text-white px-8 py-4 rounded-2xl font-extrabold text-sm sm:text-base shadow-lg shadow-${primaryColor}/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        >
          <span>${escapeHtml(data.hero?.cta || 'Reservar Directamente')}</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </a>
      </div>
    </div>
  </section>

  <!-- ITINERARY & ABOUT -->
  <section id="itinerario" class="py-20 max-w-5xl mx-auto px-4 sm:px-6">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
      <div class="md:col-span-7 space-y-5">
        <span class="text-xs font-extrabold uppercase tracking-widest text-${primaryColor}">Sobre este recorrido</span>
        <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight">
          ${escapeHtml(data.about?.title || 'Una experiencia inolvidable en Cusco')}
        </h2>
        <p class="text-sm sm:text-base opacity-80 leading-relaxed whitespace-pre-line">
          ${escapeHtml(data.about?.content || '')}
        </p>
        <div class="pt-2 flex items-center gap-3 text-xs sm:text-sm font-semibold opacity-90">
          <div class="w-8 h-8 rounded-full bg-${primaryColor}/20 text-${primaryColor} flex items-center justify-center font-bold">✓</div>
          <span>Atención personalizada con Guía Oficial Certificado</span>
        </div>
      </div>
      <div class="md:col-span-5">
        <div class="relative rounded-3xl overflow-hidden shadow-2xl border ${isPremium ? 'border-slate-800' : 'border-stone-200'}">
          <img src="${galleryImages[0]}" alt="Destino" class="w-full h-80 object-cover hover:scale-105 transition-transform duration-500" />
        </div>
      </div>
    </div>
  </section>

  <!-- PRIVILEGES / WHAT'S INCLUDED -->
  <section id="incluye" class="py-16 ${isPremium ? 'bg-slate-900/50' : 'bg-stone-100'} border-y ${isPremium ? 'border-slate-800' : 'border-stone-200'}">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="text-xs font-extrabold uppercase tracking-widest text-${primaryColor}">Calidad Garantizada</span>
        <h2 class="text-2xl sm:text-3xl font-extrabold mt-1">
          ${escapeHtml(data.features?.title || '¿Por qué viajar con nosotros?')}
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        ${(data.features?.items || []).map((item) => {
          const [heading, desc] = item.includes(':') ? item.split(':') : [item, ''];
          return `
          <div class="${cardBg} p-6 rounded-2xl border shadow-sm flex items-start gap-4">
            <div class="w-8 h-8 rounded-xl bg-${primaryColor}/10 text-${primaryColor} flex items-center justify-center shrink-0 mt-0.5">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <div>
              <h3 class="font-bold text-sm sm:text-base">${escapeHtml(heading)}</h3>
              ${desc ? `<p class="text-xs sm:text-sm opacity-70 mt-1">${escapeHtml(desc)}</p>` : ''}
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
  </section>

  <!-- GALLERY -->
  <section id="galeria" class="py-20 max-w-5xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-10">
      <h2 class="text-2xl sm:text-3xl font-extrabold">Postales del Destino</h2>
      <p class="text-xs sm:text-sm opacity-70 mt-1">Fotos reales de nuestras expediciones con viajeros de todo el mundo.</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      ${galleryImages.map(img => `
        <div class="overflow-hidden rounded-3xl shadow-lg h-72 border ${isPremium ? 'border-slate-800' : 'border-stone-200'}">
          <img src="${img}" alt="Galería" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>
      `).join('')}
    </div>
  </section>

  <!-- TESTIMONIALS -->
  ${data.testimonials && data.testimonials.length > 0 ? `
  <section class="py-16 ${isPremium ? 'bg-slate-900/40' : 'bg-stone-100'} border-t ${isPremium ? 'border-slate-800' : 'border-stone-200'}">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-10">
        <span class="text-xs font-extrabold uppercase tracking-widest text-${primaryColor}">Reseñas Reales</span>
        <h2 class="text-2xl sm:text-3xl font-extrabold mt-1">Lo que dicen los viajeros</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${data.testimonials.map(t => `
          <div class="${cardBg} p-6 rounded-2xl border shadow-sm space-y-3">
            <div class="flex items-center gap-1 text-amber-400">
              ${'★'.repeat(t.rating || 5)}
            </div>
            <p class="text-xs sm:text-sm italic opacity-90">"${escapeHtml(t.comment)}"</p>
            <div class="pt-2 text-xs">
              <strong class="block font-bold">${escapeHtml(t.name)}</strong>
              <span class="opacity-60">${escapeHtml(t.origin)}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- FAQS -->
  ${data.faqs && data.faqs.length > 0 ? `
  <section id="faqs" class="py-20 max-w-3xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-12">
      <h2 class="text-2xl sm:text-3xl font-extrabold">Preguntas Frecuentes</h2>
      <p class="text-xs sm:text-sm opacity-70 mt-1">Todo lo que necesitas saber antes de tu aventura.</p>
    </div>
    <div class="space-y-4">
      ${data.faqs.map((faq, idx) => `
        <details class="${cardBg} rounded-2xl border p-5 group cursor-pointer transition-all shadow-sm">
          <summary class="font-bold text-sm sm:text-base flex justify-between items-center list-none select-none">
            <span>${escapeHtml(faq.q)}</span>
            <span class="text-${primaryColor} group-open:rotate-180 transition-transform font-bold text-lg">↓</span>
          </summary>
          <p class="text-xs sm:text-sm opacity-80 mt-3 pt-3 border-t ${isPremium ? 'border-slate-800' : 'border-stone-100'} leading-relaxed">
            ${escapeHtml(faq.a)}
          </p>
        </details>
      `).join('')}
    </div>
  </section>
  ` : ''}

  <!-- FOOTER -->
  <footer class="${isPremium ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-stone-900 border-stone-800 text-stone-300'} border-t py-12 text-center text-xs">
    <div class="max-w-4xl mx-auto px-4 space-y-4">
      <p class="font-bold text-white text-sm">${escapeHtml(tourName)} • ${escapeHtml(guide)}</p>
      <p>Página generada con tecnología inteligente de <strong>Cusco Creativos</strong>. Todos los derechos reservados.</p>
      <div class="pt-2">
        <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-${primaryColor} font-bold hover:underline">
          Contactar por WhatsApp: ${escapeHtml(data.whatsapp || '+51 984 123 456')}
        </a>
      </div>
    </div>
  </footer>

  <!-- FLOATING WHATSAPP BUTTON -->
  <a 
    href="${whatsappUrl}" 
    target="_blank" 
    rel="noopener noreferrer"
    class="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-2 border-white"
    title="Chatear con el guía por WhatsApp"
  >
    <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
  </a>

</body>
</html>`;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function downloadHtmlFile(htmlContent: string, fileName: string) {
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

import JSZip from 'jszip';

export function downloadReadmeFile(landing: LandingData, fileName: string) {
  const readmeContent = getReadmeContent(landing);
  const blob = new Blob([readmeContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function downloadLandingZip(landing: LandingData): Promise<void> {
  const zip = new JSZip();
  const htmlContent = generateStandaloneHtml(landing);
  const readmeContent = getReadmeContent(landing);
  const jsonContent = JSON.stringify(landing, null, 2);

  zip.file('index.html', htmlContent);
  zip.file('LEEME_INSTRUCCIONES.txt', readmeContent);
  zip.file('datos_landing_ia.json', jsonContent);

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.download = `landing-${landing.slug}-cuscocreativos.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function getReadmeContent(landing: LandingData): string {
  return `===================================================================
PAQUETE WEB COMPLETO - ${landing.name.toUpperCase()}
Generado por Cusco Creativos AI Web Platform
===================================================================

Tour / Experiencia: ${landing.name}
Guía Turístico: ${landing.guideName || 'Cusco Creativos'}
WhatsApp de Reservas: ${landing.whatsapp}
Plantilla: ${landing.template}
Fecha de Generación: ${new Date().toLocaleDateString()}

-------------------------------------------------------------------
ARCHIVOS INCLUIDOS EN ESTE PAQUETE:
-------------------------------------------------------------------
1. index.html          -> Página web completa autónoma (HTML5 + Tailwind CSS).
2. LEEME_INSTRUCCIONES -> Esta guía paso a paso de uso y despliegue.
3. datos_landing_ia.json -> Todos los copies y textos persuasivos generados por IA.

-------------------------------------------------------------------
¿CÓMO USAR O DESPLEGAR ESTA PÁGINA?
-------------------------------------------------------------------

OPCIÓN 1: PROBAR DIRECTAMENTE EN TU COMPUTADORA (OFFLINE)
- Haz doble clic en el archivo "index.html".
- Se abrirá al instante en Google Chrome, Safari, Edge o Firefox.
- Funciona perfectamente sin necesidad de servidores.

OPCIÓN 2: SUBIR A TU HOSTING TRADICIONAL (Hostinger, cPanel, GoDaddy, etc.)
- Ingresa al Administrador de Archivos de tu cPanel o conéctate vía FTP.
- Entra a la carpeta "public_html" (o la raíz de tu dominio).
- Sube el archivo "index.html".
- ¡Listo! Tu página ya estará en vivo en tu dominio www.tudominio.com.

OPCIÓN 3: INTEGRAR EN WORDPRESS O CMS
- Si tienes WordPress, puedes crear una página vacía ("Canvas").
- Agrega un bloque "HTML personalizado" y pega el código de "index.html".
- O colócalo en un subdominio (ej: tours.tudominio.com).

-------------------------------------------------------------------
SOPORTE Y ASESORÍA:
Agencia Cusco Creativos
Especialistas en Marketing Digital y Tecnología Turística
`;
}

