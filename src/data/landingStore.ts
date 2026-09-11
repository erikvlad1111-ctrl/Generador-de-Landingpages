import { LandingData, ObjectiveType, TemplateType, LanguageType, PlanTier } from '@/types/landing';
export type { LandingData };

export const INITIAL_LANDINGS: LandingData[] = [
  {
    id: '1',
    name: 'Machu Picchu VIP',
    slug: 'machu-picchu-vip',
    tier: 'advance',
    guideName: 'Carlos Quispe',
    whatsapp: '+51984123456',
    price: '$450 USD',
    duration: '2 Días / 1 Noche',
    difficulty: 'Fácil - Confort',
    objective: 'quote',
    template: 'agency-portal',
    language: 'es',
    status: 'published',
    date: '2026-09-08',
    views: '1,204',
    heroImage: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop'
    ],
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
    },
    faqs: [
      {
        q: '¿Qué incluye exactamente el servicio VIP?',
        a: 'Incluye boletos de tren de lujo ida y vuelta, entradas circuito preferente a Machu Picchu, guía privado certificado, almuerzo gourmet y transporte privado desde y hacia tu hotel en Cusco.'
      },
      {
        q: '¿Con cuánta anticipación debo reservar?',
        a: 'Recomendamos reservar con al menos 3 a 4 semanas de antelación debido al cupo limitado diario de los trenes de lujo y accesos a la ciudadela.'
      }
    ],
    trustBadges: [
      'Licencia Oficial DIRCETUR',
      'Sello Safe Travels',
      'RUC 20 Formal Verificado',
      'Atención Médica & Oxígeno'
    ],
    notIncluded: [
      'Vuelos comerciales internacionales o domésticos',
      'Propinas voluntarias para guía y personal de servicio',
      'Bebidas alcohólicas premium fuera del menú establecido',
      'Seguro médico de viaje de alta montaña'
    ],
    whatToBring: [
      'Pasaporte original físico vigente',
      'Ropa cómoda y abrigadora para la tarde/noche',
      'Calzado cómodo para caminata ligera',
      'Bloqueador solar SPF 50+ y repelente de insectos',
      'Cámara fotográfica o teléfono con batería cargada'
    ],
    itinerary: [
      {
        step: 'Día 1',
        title: 'Cusco a Aguas Calientes en Tren Panorámico Vistadome',
        desc: 'Recojo privado en tu hotel en Cusco hacia la estación de tren en Poroy u Ollantaytambo. Viaje escénico a través de la cuenca del Valle Sagrado con música a bordo y vistas panorámicas. Llegada al pueblo de Machu Picchu e instalación en hotel boutique.'
      },
      {
        step: 'Día 2',
        title: 'Exploración Mística de Machu Picchu & Almuerzo Gourmet',
        desc: 'Ascenso en bus exclusivo hacia la ciudadela inca. Visita guiada privada de 3 horas por los recintos sagrados, templos y terrazas. Almuerzo buffet de autor en Belmond Sanctuary Lodge y retorno en tren de primera clase a Cusco con traslado a tu hotel.'
      }
    ],
    testimonials: [
      {
        name: 'Alejandro y Marcela',
        origin: 'Madrid, España',
        comment: 'La mejor experiencia de nuestra vida en Perú. Carlos, nuestro guía, nos explicó la historia con una pasión que jamás olvidaremos.',
        rating: 5
      },
      {
        name: 'David Miller',
        origin: 'California, USA',
        comment: 'Zero stress, luxury train ride was stunning. Worth every single dollar. 100% recommended!',
        rating: 5
      }
    ]
  },
  {
    id: '2',
    name: 'Valle Sagrado Aventura',
    slug: 'valle-sagrado-aventura',
    tier: 'pro',
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
    heroImage: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop'
    ],
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
    },
    faqs: [
      {
        q: '¿Se requiere experiencia previa en cuatrimoto?',
        a: 'No, antes de partir realizamos una práctica de 20 minutos donde los instructores te enseñan a acelerar, frenar y maniobrar con seguridad.'
      },
      {
        q: '¿Qué ropa debo llevar?',
        a: 'Ropa cómoda que se pueda ensuciar con polvo, zapatillas o botines, cortavientos, lentes de sol y bloqueador solar.'
      }
    ],
    testimonials: [
      {
        name: 'Sofía Valdivia',
        origin: 'Santiago, Chile',
        comment: '¡Increíble tour! Las cuatrimotos tienen mucha potencia y los paisajes de las salineras son espectaculares.',
        rating: 5
      }
    ],
    trustBadges: [
      'Licencia DIRCETUR Verificada',
      'Instructores Certificados Primeros Auxilios',
      'Cascos y Guantes Profesionales',
      'Seguro SOAT Turístico Vigente'
    ],
    notIncluded: [
      'Boleto turístico BTG para Moray (S/ 70 PEN parcial)',
      'Ticket de ingreso a Salineras de Maras (S/ 20 PEN)',
      'Propinas para mecánicos e instructores',
      'Almuerzo o bebidas personales'
    ],
    whatToBring: [
      'Documento de identidad o pasaporte original',
      'Ropa que se pueda ensuciar con polvo y barro',
      'Lentes de sol o antiparras para el polvo',
      'Zapatillas cerradas o botines de trekking',
      'Dinero en efectivo en soles para los boletos de ingreso'
    ],
    itinerary: [
      {
        step: '08:00 AM',
        title: 'Recojo en Hotel y Traslado a la Base de Cuatrimotos',
        desc: 'Viaje en transporte turístico hacia Cruzpata en el Valle Sagrado con vista a los nevados Chicón y Verónica.'
      },
      {
        step: '09:30 AM',
        title: 'Charla de Seguridad y Práctica de Manejo',
        desc: 'Equipamiento completo con casco integral, guantes y lentes. 20 minutos de práctica en circuito cerrado para dominar las cuatrimotos.'
      },
      {
        step: '10:30 AM',
        title: 'Ruta Off-Road hacia Moray y Salineras de Maras',
        desc: 'Travesía por senderos andinos descubriendo los laboratorios agrícolas incas de Moray y las más de 3,000 pozas de sal de Maras.'
      },
      {
        step: '01:30 PM',
        title: 'Retorno y Llegada al Centro Histórico de Cusco',
        desc: 'Despedida del equipo y traslado de regreso al centro de Cusco cerca a la Plaza de Armas.'
      }
    ]
  },
  {
    id: '3',
    name: 'City Tour Cusco & Templos',
    slug: 'city-tour-cusco',
    tier: 'basic',
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
    heroImage: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=2074&auto=format&fit=crop'
    ],
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
    },
    trustBadges: [
      'Guía Colegiada Licenciada en Arqueología',
      'DIRCETUR Cusco Registro N° 4589',
      'Audio-guías sanitizadas para grupos',
      'Agencia Formal RUC 20'
    ],
    notIncluded: [
      'Boleto Turístico del Cusco (BTC circuito arqueológico)',
      'Boleto de entrada al Convento de Santo Domingo / Qorikancha',
      'Propinas voluntarias al guía',
      'Snacks y gastos personales'
    ],
    whatToBring: [
      'Boleto turístico BTC vigente (o dinero en efectivo para comprarlo en puerta)',
      'Casaca cortavientos o abrigo para la tarde cusqueña',
      'Zapatos cómodos con buen agarre para empedrados',
      'Sombrero o gorro para el sol y bloqueador solar',
      'Botella de agua recargable'
    ],
    itinerary: [
      {
        step: '13:30 PM',
        title: 'Encuentro en Qorikancha (Templo del Sol)',
        desc: 'Inicio del recorrido apreciando la perfección de la cantería inca imperial recubierta antiguamente por planchas de oro macizo.'
      },
      {
        step: '15:00 PM',
        title: 'Fortaleza Ceremonial de Sacsayhuamán',
        desc: 'Caminata guiada entre los megalitos ciclópeos y explicaciones de la fiesta sagrada del Inti Raymi.'
      },
      {
        step: '16:30 PM',
        title: 'Santuarios de Qenqo, Puka Pukara y Tambomachay',
        desc: 'Recorrido por las galerías subterráneas de momificación y el templo sagrado dedicado al culto del agua.'
      },
      {
        step: '18:00 PM',
        title: 'Retorno a la Plaza de Armas de Cusco',
        desc: 'Conclusión del tour a pasos de los mejores restaurantes y cafés coloniales del centro histórico.'
      }
    ],
    faqs: [
      {
        q: '¿Incluye el Boleto Turístico del Cusco (BTC)?',
        a: 'No incluye el BTC general ni la entrada a la Catedral, pero tu guía te asistirá para adquirirlos en la puerta sin filas.'
      }
    ],
    testimonials: [
      {
        name: 'Camila Ríos',
        origin: 'Bogotá, Colombia',
        comment: 'Lucía sabe muchísimo sobre la cultura inca. Nos resolvió cada duda y nos llevó a los mejores puntos para fotos.',
        rating: 5
      }
    ]
  },
  {
    id: '4',
    name: 'Laguna Humantay Boho Journal',
    slug: 'laguna-humantay-boho',
    tier: 'advance',
    guideName: 'Camila Valdivia',
    whatsapp: '+51984556677',
    price: 'S/ 160 PEN',
    duration: 'Full Day Fotográfico',
    difficulty: 'Moderada',
    objective: 'whatsapp',
    template: 'boho-nature',
    language: 'es',
    status: 'published',
    date: '2026-09-10',
    views: '618',
    heroImage: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop'
    ],
    hero: {
      badge: 'Edición Travel Journal • Pinterest Style',
      title: 'Laguna Humantay: Bitácora Visual Andina',
      subtitle: 'Una expedición pausada hacia las aguas turquesas del nevado Humantay, diseñada para amantes de la fotografía, el paisajismo y los viajes auténticos.',
      cta: 'Consultar Fechas por WhatsApp'
    },
    about: {
      title: 'Una experiencia visual inolvidable en los Andes',
      content: 'Diseñada bajo la estética de cuaderno de viaje: recorre senderos andinos, degusta café orgánico de altura y captura postales irrepetibles junto a un guía especializado en fotografía de montaña.'
    },
    features: {
      title: 'Detalles de la Bitácora de Viaje',
      items: [
        'Transporte Turístico Climatizado:Viaje placentero con vistas panorámicas del valle de Limatambo.',
        'Desayuno y Almuerzo Andino Orgánico:Platos preparados con insumos locales en domos de montaña.',
        'Asistencia Fotográfica Continua:Consejos de composición para lograr las mejores tomas de viaje.',
        'Seguridad Integral:Botiquín de primeros auxilios y balón de oxígeno medicinal permanente.'
      ]
    },
    trustBadges: [
      'Licencia Oficial DIRCETUR Cusco',
      'Sello Internacional Safe Travels',
      'Agencia Formal RUC 20 Verificado',
      'Guía Colegiada Especialista'
    ],
    notIncluded: [
      'Ticket comunal de ingreso a Mollepata (S/ 20 PEN)',
      'Caballo de auxilio opcional',
      'Propinas voluntarias'
    ],
    whatToBring: [
      'Cámara o teléfono con buena memoria',
      'Casaca cortavientos y ropa térmica en capas',
      'Zapatos de trekking cómodos',
      'Lentes de sol UV400 y bloqueador'
    ],
    itinerary: [
      {
        step: '04:30 AM',
        title: 'Recojo en Hotel y Partida',
        desc: 'Traslado en mini-van ejecutiva desde Cusco hacia Mollepata a través de pintorescos valles.'
      },
      {
        step: '07:30 AM',
        title: 'Desayuno Campestre en Soraypampa',
        desc: 'Energía nutritiva con café de altura y panes andinos antes de iniciar el sendero.'
      },
      {
        step: '09:30 AM',
        title: 'Ascenso a la Laguna Humantay',
        desc: 'Caminata a ritmo suave con paradas estratégicas para capturar postales de revista.'
      },
      {
        step: '12:00 PM',
        title: 'Contemplación frente a la Laguna Turquesa',
        desc: 'Tiempo libre para descansar, conectar con la naturaleza y tomar fotografías.'
      },
      {
        step: '17:30 PM',
        title: 'Llegada a Cusco',
        desc: 'Retorno seguro a la ciudad de Cusco para descansar.'
      }
    ],
    faqs: [
      {
        q: '¿Se necesita condición física avanzada?',
        a: 'La caminata es de nivel moderado. Recomendamos al menos 1 día previo de aclimatación en Cusco.'
      }
    ],
    testimonials: [
      {
        name: 'Valeria & Mateo',
        origin: 'Santiago, Chile',
        comment: 'La estética del tour y el ritmo pausado fue perfecto para nosotros que amamos la fotografía.',
        rating: 5
      }
    ]
  },
  {
    id: '5',
    name: 'Free Walking Tour Cusco',
    slug: 'free-walking-tour-cusco',
    tier: 'free',
    guideName: 'Renzo Farfán',
    whatsapp: '+51984001122',
    price: 'Gratuito (Propinas)',
    duration: '2.5 Horas',
    difficulty: 'Fácil',
    objective: 'whatsapp',
    template: 'cultural',
    language: 'es',
    status: 'published',
    date: '2026-09-11',
    views: '320',
    heroImage: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop'
    ],
    hero: {
      badge: 'Caminata Histórica Diaria',
      title: 'Free Tour por el Centro Histórico de Cusco',
      subtitle: 'Conoce los callejones incas, la Piedra de los 12 Ángulos y la Plaza de Armas con un guía local apasionado. Salidas diarias 10:00 AM y 15:00 PM.',
      cta: 'Unirme Gratis por WhatsApp'
    },
    about: {
      title: 'Explora Cusco a pie y a tu propio ritmo',
      content: 'El recorrido esencial para recién llegados a la capital del Tahuantinsuyo. Te orientamos sobre seguridad, aclimatación a la altura y gastronomía típica.'
    },
    features: {
      title: 'Puntos Clave del Recorrido',
      items: [
        'Plaza de Armas:Historia y arquitectura colonial sobre palacios incas.',
        'Piedra de los 12 Ángulos:Ingeniería milimétrica incaica.'
      ]
    }
  }
];

const STORAGE_KEY = 'cusco_creativos_landings_v2';

export function getStoredLandings(): LandingData[] {
  if (typeof window === 'undefined') return INITIAL_LANDINGS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LANDINGS));
      return INITIAL_LANDINGS;
    }
    const parsed: LandingData[] = JSON.parse(data);
    if (Array.isArray(parsed)) {
      const existingIds = new Set(parsed.map(item => item.id));
      let updated = false;
      for (const init of INITIAL_LANDINGS) {
        if (!existingIds.has(init.id)) {
          parsed.push(init);
          updated = true;
        }
      }
      if (updated) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      }
      return parsed;
    }
    return INITIAL_LANDINGS;
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

export function updateLandingStatus(id: string, status: 'published' | 'draft'): LandingData[] {
  if (typeof window === 'undefined') return INITIAL_LANDINGS;
  try {
    const list = getStoredLandings().map(item => item.id === id ? { ...item, status } : item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return list;
  } catch {
    return getStoredLandings();
  }
}

export function deleteLandingFromStorage(id: string): LandingData[] {
  if (typeof window === 'undefined') return INITIAL_LANDINGS;
  try {
    const list = getStoredLandings().filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return list;
  } catch {
    return getStoredLandings();
  }
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
  tier?: PlanTier;
  heroImage?: string;
  galleryImages?: string[];
  destination?: string;
  altitude?: string;
  groupType?: string;
  guideCert?: string;
  guideLanguages?: string;
  includedServices?: string[];
  targetAudience?: string;
  itinerary?: { step: string; title: string; desc: string; }[];
  notIncluded?: string[];
  whatToBring?: string[];
  trustBadges?: string[];
  aiTone?: string;
  guideAvatar?: string;
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
  let heroSubtitle = params.description || 'Vive una aventura inolvidable con guías expertos locales y atención de primer nivel.';
  let heroBadge = params.template === 'premium' ? 'Experiencia Exclusiva VIP' : params.template === 'cultural' ? 'Historia y Cultura Andina' : 'Aventura y Naturaleza';
  let ctaText = isWhatsapp ? 'Reservar Directo por WhatsApp' : 'Solicitar Cotización y Disponibilidad';

  if (params.destination) {
    heroBadge = `${params.destination} • ${params.duration || 'Cusco'}`;
  }

  if (isEn) {
    heroTitle = `${params.name}: The Ultimate Cusco Experience`;
    heroBadge = params.destination ? `${params.destination} • ${params.duration || 'Cusco'}` : (params.template === 'premium' ? 'Exclusive VIP Tour' : params.template === 'cultural' ? 'Inca Heritage & Culture' : 'Adventure & Nature Trek');
    ctaText = isWhatsapp ? 'Book via WhatsApp' : 'Request Instant Quote';
  }

  const aboutTitle = isEn
    ? `Why choose ${params.name}?`
    : `¿Por qué elegir ${params.name}?`;

  const aboutContent = params.description 
    ? `${params.description} ${params.altitude ? `Alcanza una altitud máxima de ${params.altitude}.` : ''} ${params.groupType ? `Modalidad: ${params.groupType}.` : ''} Diseñado especialmente para ${params.targetAudience || 'viajeros exigentes'} guiados por ${params.guideName || 'especialistas certificados'} (${params.guideCert || 'Guía Oficial DIRCETUR'}).`
    : `Descubre los parajes más impresionantes de ${params.destination || 'la región imperial'}. Esta expedición combina paisajes de ensueño, servicio de alta gama y atención cercana orientada a cada viajero.`;

  const customServices = params.includedServices && params.includedServices.length > 0 
    ? params.includedServices.map(s => `${s}:Servicio 100% coordinado y garantizado con estándares de seguridad turística.`)
    : [];

  const defaultItems = isEn ? [
    `Certified Expert Guide:Led by ${params.guideName || 'top local specialists'} (${params.guideCert || 'Licensed Tour Guide'}) fluent in ${params.guideLanguages || 'English & Spanish'}.`,
    `All-Inclusive Comfort:Roundtrip transportation, entrance tickets, safety gear, and high-altitude assistance.`,
    `Small Group Guarantee:Personalized attention ensuring unforgettable moments without crowds.`,
    `Instant Confirmation:Quick booking with transparent rates of ${params.price || 'best price guaranteed'}.`
  ] : [
    `Guía Oficial Certificado:Acompañado por ${params.guideName || 'especialistas locales'} (${params.guideCert || 'Licenciado DIRCETUR'}) con dominio de ${params.guideLanguages || 'Español e Inglés'}.`,
    `Servicio Garantizado:Transporte autorizado, boletos de acceso oficiales y asistencia médica para la altura.`,
    `Modalidad ${params.groupType || 'Grupos Reducidos'}:Atención personalizada para que disfrutes a tu propio ritmo.`,
    `Confirmación Inmediata:Reserva rápida con tarifa transparente de ${params.price || 'el mejor precio garantizado'}.`
  ];

  const featuresItems = customServices.length > 0 ? [...customServices, ...defaultItems.slice(0, 2)] : defaultItems;


  const faqs = isEn ? [
    {
      q: `What is included in ${params.name}?`,
      a: `Includes certified guiding with ${params.guideName || 'our team'}, full safety briefings, and personalized logistics throughout the tour.`
    },
    {
      q: 'How do payments and bookings work?',
      a: isWhatsapp 
        ? 'You can confirm your booking instantly via WhatsApp with no hidden fees and flexible date changes.'
        : 'Submit your request for a customized itinerary and our operations team will send a detailed proposal within 2 hours.'
    }
  ] : [
    {
      q: `¿Qué incluye el tour ${params.name}?`,
      a: `Incluye guiado oficial profesional con ${params.guideName || 'nuestro equipo'}, asistencia permanente, transporte autorizado y soporte de viaje antes y durante tu visita.`
    },
    {
      q: '¿Cómo confirmo mi reserva?',
      a: isWhatsapp 
        ? 'Puedes coordinar fechas y asegurar tu lugar de inmediato mediante WhatsApp con atención directa del organizador.'
        : 'Envía tu solicitud de cotización para recibir la propuesta formal detallada con itinerario desglosado.'
    }
  ];

  const testimonials = isEn ? [
    {
      name: 'Sarah Jenkins',
      origin: 'London, UK',
      comment: `Incredible experience with ${params.guideName || 'the team'}. Truly unforgettable landscapes and outstanding organization!`,
      rating: 5
    }
  ] : [
    {
      name: 'Martín y Claudia',
      origin: 'Lima, Perú',
      comment: `Superó todas nuestras expectativas. La atención de ${params.guideName || 'nuestro guía'} fue impecable de principio a fin.`,
      rating: 5
    }
  ];

  return {
    id: Date.now().toString(),
    name: params.name,
    slug: slug || 'tour-nuevo',
    tier: params.tier || 'advance',
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
    heroImage: params.heroImage || 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
    galleryImages: params.galleryImages || [
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop'
    ],
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
    },
    itinerary: params.itinerary && params.itinerary.length > 0 ? params.itinerary : (isEn ? [
      { step: 'Phase 1', title: 'Pick-up and Scenic Transfer', desc: `Private transport pick-up from your accommodation in Cusco heading to the start point with scenic Andean valleys.` },
      { step: 'Phase 2', title: 'Guided Immersion and Exploration', desc: `Comprehensive guiding led by ${params.guideName || 'licensed specialists'} with time for photography and cultural insights.` },
      { step: 'Phase 3', title: 'Safe Return to Cusco', desc: `Comfortable return journey drop-off near the historical city center.` }
    ] : [
      { step: 'Paso 1', title: 'Recojo en Hotel y Traslado Escénico', desc: `Transporte turístico privado desde tu alojamiento en Cusco hacia la ruta programada cruzando valles y paisajes andinos.` },
      { step: 'Paso 2', title: 'Exploración Guiada y Momentos Únicos', desc: `Recorrido a ritmo personalizado guiado por ${params.guideName || 'especialistas oficiales'} con tiempo libre para fotos y descanso.` },
      { step: 'Paso 3', title: 'Retorno Confortable a Cusco', desc: `Viaje de retorno seguro y cómodo con desembarque cerca del centro histórico o tu hotel.` }
    ]),
    notIncluded: params.notIncluded && params.notIncluded.length > 0 ? params.notIncluded : (isEn ? [
      'International or domestic flights',
      'Optional gratuities for staff and guide',
      'Personal travel insurance',
      'Extra alcoholic beverages'
    ] : [
      'Vuelos internacionales o domésticos',
      'Propinas voluntarias para guía y chofer',
      'Seguro médico de viaje internacional',
      'Bebidas alcohólicas no detalladas'
    ]),
    whatToBring: params.whatToBring && params.whatToBring.length > 0 ? params.whatToBring : (isEn ? [
      'Valid original passport',
      'Layered warm and windproof clothing',
      'Sturdy walking or trekking shoes',
      'Sunscreen (SPF 50+) and insect repellent',
      'Cash in local Peruvian Soles'
    ] : [
      'Pasaporte original físico vigente',
      'Ropa abrigadora en capas y cortavientos',
      'Calzado o zapatillas con buen agarre',
      'Bloqueador solar (SPF 50+) y repelente',
      'Dinero en efectivo en soles peruanos'
    ]),
    trustBadges: params.trustBadges && params.trustBadges.length > 0 ? params.trustBadges : [
      'Licencia Oficial DIRCETUR Cusco',
      'Sello Safe Travels Internacional',
      'RUC 20 Formal Verificado',
      'Balón de Oxígeno & Botiquín'
    ],
    faqs,
    testimonials
  };
}
