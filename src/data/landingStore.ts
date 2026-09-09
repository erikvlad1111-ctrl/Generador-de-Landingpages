import { LandingData, ObjectiveType, TemplateType, LanguageType } from '@/types/landing';
export type { LandingData };

export const INITIAL_LANDINGS: LandingData[] = [
  {
    id: '1',
    name: 'Machu Picchu VIP',
    slug: 'machu-picchu-vip',
    guideName: 'Carlos Quispe',
    whatsapp: '+51984123456',
    price: '$450 USD',
    duration: '2 Días / 1 Noche',
    difficulty: 'Fácil - Confort',
    objective: 'quote',
    template: 'premium',
    language: 'es',
    status: 'published',
    date: '2026-09-08',
    views: '1,204',
    hero: {
      badge: 'Experiencia Exclusiva VIP',
      title: 'Machu Picchu de Lujo con Tren Panorámico',
      subtitle: 'Descubre la maravilla del mundo con traslados privados, hoteles 5 estrellas y un guía oficial exclusivo para ti y tu familia.',
      cta: 'Solicitar Cotización Privada'
    },
    about: {
      title: 'Un viaje sagrado diseñado para los más exigentes',
      content: 'Evita las largas colas y el estrés del turismo masivo. Nuestro servicio VIP te brinda acceso preferente, almuerzo gourmet en Belmond Sanctuary Lodge y asesoría personalizada de puerta a puerta.'
    },
    features: {
      title: 'Privilegios de la Experiencia VIP',
      items: [
        'Vagon Hiram Bingham / Vistadome:Viaja con música en vivo, cóctel de bienvenida y ventanales panorámicos.',
        'Guía Historiador Privado:Explicaciones profundas y personalizadas al ritmo de tu grupo.',
        'Gastronomía de Autor:Almuerzo buffet gourmet incluido a las faldas de la ciudadela.',
        'Asistencia 24/7 de Conserjería:Coordinador de viaje disponible permanentemente para cualquier solicitud.'
      ]
    }
  },
  {
    id: '2',
    name: 'Valle Sagrado Aventura',
    slug: 'valle-sagrado-aventura',
    guideName: 'Marcos Mendoza',
    whatsapp: '+51984654321',
    price: '$120 USD',
    duration: 'Full Day (8:00 - 18:00)',
    difficulty: 'Moderada',
    objective: 'whatsapp',
    template: 'adventure',
    language: 'es',
    status: 'draft',
    date: '2026-09-07',
    views: '420',
    hero: {
      badge: 'Aventura en los Andes',
      title: 'Cuatrimotos y Paisajes en Maras & Moray',
      subtitle: 'Siente la adrenalina recorriendo los senderos del Valle Sagrado a bordo de modernas cuatrimotos todoterreno.',
      cta: 'Reservar por WhatsApp'
    },
    about: {
      title: 'Explora el corazón de los Incas a pura velocidad',
      content: 'Una ruta alternativa y emocionante por las terrazas circulares de Moray y las impresionantes minas de sal de Maras. Instructores certificados y equipo de seguridad de primer nivel.'
    },
    features: {
      title: 'Lo más destacado de este tour',
      items: [
        'Cuatrimotos 450cc Automáticas:Fáciles de manejar, ideales para principiantes y experimentados.',
        'Guías de Aventura Bilingües:Líderes de ruta capacitados en primeros auxilios y mecánica de campo.',
        'Fotos y Videos en HD:Capturamos tus mejores saltos y postales andinas durante todo el recorrido.',
        'Transporte Privado ida y vuelta:Recojo directo en la puerta de tu hotel en Cusco.'
      ]
    }
  },
  {
    id: '3',
    name: 'City Tour Cusco & Templos',
    slug: 'city-tour-cusco',
    guideName: 'Lucía Condori',
    whatsapp: '+51984778899',
    price: 'S/ 70 PEN',
    duration: 'Media Jornada (4 Horas)',
    difficulty: 'Fácil',
    objective: 'whatsapp',
    template: 'cultural',
    language: 'es',
    status: 'published',
    date: '2026-09-05',
    views: '842',
    hero: {
      badge: 'Historia Viva del Tahuantinsuyo',
      title: 'Descubre los Secretos de la Capital Inca',
      subtitle: 'Un recorrido fascinante por el Qorikancha, Sacsayhuamán, Qenqo y la majestuosa Catedral de Cusco acompañado de una guía cusqueña apasionada.',
      cta: 'Consultar Horarios por WhatsApp'
    },
    about: {
      title: 'Camina por las piedras que construyeron un imperio',
      content: 'Cusco es un museo al aire libre. En este recorrido entenderás la ingeniería antisísmica de los incas, su cosmovisión andina y la riqueza del sincretismo colonial en cada esquina.'
    },
    features: {
      title: '¿Por qué elegir este recorrido cultural?',
      items: [
        'Qorikancha sin aglomeraciones:Acceso a primera hora con explicaciones detalladas del Templo del Sol.',
        'Megaconstrucción de Sacsayhuamán:Aprende cómo movieron bloques de piedra de más de 120 toneladas.',
        'Grupos Reducidos:Máximo 10 personas para escuchar y preguntar cómodamente al guía.',
        'Degustación Tradicional:Cata de chocolate cusqueño artesanal y hojas sagradas de coca.'
      ]
    }
  }
];

const STORAGE_KEY = 'cusco_creativos_landings_v1';

export function getStoredLandings(): LandingData[] {
  if (typeof window === 'undefined') return INITIAL_LANDINGS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LANDINGS));
      return INITIAL_LANDINGS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_LANDINGS;
  }
}

export function saveLandingToStorage(landing: LandingData): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getStoredLandings();
    const index = list.findIndex(item => item.id === landing.id || item.slug === landing.slug);
    if (index >= 0) {
      list[index] = landing;
    } else {
      list.unshift(landing);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Error saving landing to localStorage', err);
  }
}

export function getLandingBySlug(slug: string): LandingData | undefined {
  const list = getStoredLandings();
  return list.find(item => item.slug.toLowerCase() === slug.toLowerCase());
}

export function simulateAiGeneration(params: {
  name: string;
  guideName: string;
  whatsapp: string;
  price: string;
  duration: string;
  difficulty: string;
  description: string;
  objective: ObjectiveType;
  template: TemplateType;
  language: LanguageType;
}): LandingData {
  const slug = params.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const isEn = params.language === 'en';
  const isWhatsapp = params.objective === 'whatsapp';

  let heroTitle = `${params.name}: La Experiencia Definitiva en Cusco`;
  const heroSubtitle = params.description || 'Vive una aventura inolvidable con guías expertos locales y atención de primer nivel.';
  let heroBadge = params.template === 'premium' ? 'Experiencia Exclusiva VIP' : params.template === 'cultural' ? 'Historia y Cultura Andina' : 'Aventura y Naturaleza';
  let ctaText = isWhatsapp ? 'Reservar Directo por WhatsApp' : 'Solicitar Cotización y Disponibilidad';

  if (isEn) {
    heroTitle = `${params.name}: The Ultimate Cusco Experience`;
    heroBadge = params.template === 'premium' ? 'Exclusive VIP Tour' : params.template === 'cultural' ? 'Inca Heritage & Culture' : 'Adventure & Nature Trek';
    ctaText = isWhatsapp ? 'Book via WhatsApp' : 'Request Instant Quote';
  }

  const aboutTitle = isEn
    ? `Why choose ${params.name}?`
    : `¿Por qué elegir ${params.name}?`;

  const aboutContent = params.description 
    ? `${params.description} Diseñado especialmente para viajeros que buscan autenticidad, confort y una inmersión completa guiados por ${params.guideName || 'especialistas certificados'}.`
    : `Descubre los parajes más impresionantes de la región imperial. Esta expedición combina paisajes de ensueño, servicio de alta gama y atención cercana orientada a cada viajero.`;

  const featuresItems = isEn ? [
    `Certified Expert Guide:Led by ${params.guideName || 'top local specialists'} with years of mountain & cultural experience.`,
    `All-Inclusive Comfort:Roundtrip transportation, entrance tickets, safety gear, and high-altitude assistance.`,
    `Small Group Guarantee:Personalized attention ensuring unforgettable moments without crowds.`,
    `Instant Confirmation:Quick booking with transparent rates of ${params.price || 'best price guaranteed'}.`
  ] : [
    `Guía Oficial Certificado:Acompañado por ${params.guideName || 'especialistas locales'} con amplio conocimiento de la ruta.`,
    `Servicio Todo Incluido:Transporte garantizado, boletos de acceso y asistencia médica preventiva para la altura.`,
    `Grupos Reducidos:Atención personalizada para que disfrutes a tu propio ritmo y tomes las mejores fotografías.`,
    `Confirmación Inmediata:Reserva rápida con tarifa transparente desde ${params.price || 'el mejor precio garantizado'}.`
  ];

  return {
    id: Date.now().toString(),
    name: params.name,
    slug: slug || 'tour-nuevo',
    guideName: params.guideName || 'Guía Cusco Creativos',
    whatsapp: params.whatsapp || '+51984000000',
    price: params.price || 'Consultar',
    duration: params.duration || 'Full Day',
    difficulty: params.difficulty || 'Moderada',
    objective: params.objective,
    template: params.template,
    language: params.language,
    status: 'draft',
    date: new Date().toISOString().split('T')[0],
    views: '0',
    hero: {
      badge: heroBadge,
      title: heroTitle,
      subtitle: heroSubtitle,
      cta: ctaText
    },
    about: {
      title: aboutTitle,
      content: aboutContent
    },
    features: {
      title: isEn ? 'What makes this tour exceptional?' : '¿Qué hace inolvidable esta experiencia?',
      items: featuresItems
    }
  };
}
