import { LanguageType } from '@/types/landing';

export interface AdventureI18nTexts {
  nav: {
    destinations: string;
    iconic: string;
    itinerary: string;
    included: string;
    faq: string;
    whatsappBtn: string;
    quoteBtn: string;
    bookNow: string;
  };
  brand: {
    subtitle: string;
    badge: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    subtitle: string;
    ctaWhatsapp: string;
    ctaQuote: string;
    viewItinerary: string;
    fromPrice: string;
    dailyDepartures: string;
    season: string;
    highestPoint: string;
    licensedGuide: string;
    happyCustomers: string;
    reviewsCount: string;
  };
  searchedSpots: {
    title: string;
    subtitle: string;
    spots: Array<{
      id: string;
      name: string;
      tours: string;
      badge: string;
      price: string;
      image: string;
    }>;
  };
  iconic: {
    title: string;
    subtitle: string;
    bookTour: string;
    detailsBtn: string;
    spotsLeft: string;
    tours: Array<{
      id: string;
      title: string;
      desc: string;
      image: string;
      rating: string;
      price: string;
      detail: string;
    }>;
  };
  itinerary: {
    badge: string;
    title: string;
    subtitle: string;
    dayPrefix: string;
  };
  inclusions: {
    title: string;
    includedTitle: string;
    notIncludedTitle: string;
    whatToBringTitle: string;
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    verifiedTrip: string;
    bottomGuarantees: {
      realReviews: string;
      dircetur: string;
      excellence: string;
    };
    items: Array<{
      name: string;
      origin: string;
      avatar: string;
      rating: number;
      date: string;
      route: string;
      comment: string;
    }>;
  };
  office: {
    badge: string;
    title: string;
    subtitle: string;
    addressTitle: string;
    address: string;
    hoursTitle: string;
    hours: string;
    statusBadge: string;
    distanceBadge: string;
    mapsBtn: string;
    chatBtn: string;
    callBtn: string;
    servicesTitle: string;
    features: Array<{
      icon: 'briefing' | 'luggage' | 'acclimatization';
      title: string;
      desc: string;
      badge: string;
    }>;
    guarantees: {
      dircetur: string;
      verified: string;
      lockers: string;
      support: string;
    };
  };
}

export const ADVENTURE_LANGUAGES: Array<{ code: LanguageType; label: string; flag: string }> = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' }
];

export const ADVENTURE_I18N: Record<LanguageType, AdventureI18nTexts> = {
  es: {
    nav: {
      destinations: 'Destinos',
      iconic: 'Tours Icónicos',
      itinerary: 'Itinerario',
      included: 'Qué Incluye',
      faq: 'FAQ',
      whatsappBtn: 'Reservar por WhatsApp',
      quoteBtn: 'Cotizar',
      bookNow: 'Reservar Ahora'
    },
    brand: {
      subtitle: 'Expediciones de Montaña & Aventura',
      badge: 'Perú'
    },
    hero: {
      badge: 'Discover the World • Aventura & Trekking',
      titleLine1: 'Travel the Best',
      titleLine2: "It's a Big World,",
      titleLine3: 'Go Explore! 🚀',
      subtitle: 'Un trekking legendario de alta montaña cruzando nevados imponentes, ceja de selva y plantaciones de café hasta la ciudadela inca de Machu Picchu.',
      ctaWhatsapp: 'Reservar Directo por WhatsApp',
      ctaQuote: 'Cotizar Expedición',
      viewItinerary: 'Ver Itinerario',
      fromPrice: 'Desde',
      dailyDepartures: 'Salidas Diarias Confirmadas',
      season: 'Temporada 2026',
      highestPoint: 'Punto más alto:',
      licensedGuide: 'Guía Colegiado:',
      happyCustomers: 'Nuestros Clientes Felices',
      reviewsCount: '(10.2k Reseñas)'
    },
    searchedSpots: {
      title: 'Explora los Destinos Más Buscados 🔥',
      subtitle: 'Rutas andinas legendarias con campamentos acondicionados, guías oficiales y logística de alta montaña.',
      spots: [
        { id: 'salkantay', name: 'Salkantay Trek', tours: '450 Tours', badge: '5 Días • 4,630 msnm', price: '$350 USD', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=400&auto=format&fit=crop' },
        { id: 'inca-trail', name: 'Camino Inca', tours: '380 Tours', badge: '4 Días • Puerta del Sol', price: '$420 USD', image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=400&auto=format&fit=crop' },
        { id: 'ausangate', name: 'Ausangate 7 Lagunas', tours: '600 Tours', badge: 'Glaciares & Aguas Termales', price: '$310 USD', image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=400&auto=format&fit=crop' },
        { id: 'choquequirao', name: 'Choquequirao', tours: '250 Tours', badge: 'Cuna de Oro Inca', price: '$290 USD', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=400&auto=format&fit=crop' },
        { id: 'humantay', name: 'Laguna Humantay', tours: '520 Tours', badge: 'Turquesa Andina', price: 'S/ 160 PEN', image: 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=400&auto=format&fit=crop' },
        { id: 'vinicunca', name: 'Montaña 7 Colores', tours: '780 Tours', badge: 'Cordillera Arcoíris', price: 'S/ 150 PEN', image: 'https://images.unsplash.com/photo-1533050487297-09b450131914?q=80&w=400&auto=format&fit=crop' }
      ]
    },
    iconic: {
      title: 'Tours Icónicos de Aventura',
      subtitle: 'Circuitos probados con la mayor satisfacción de viajeros internacionales.',
      bookTour: 'Reservar por WhatsApp',
      detailsBtn: 'Ver Detalles',
      spotsLeft: 'Últimos cupos confirmados',
      tours: [
        { id: 'salkantay-classic', title: 'Salkantay Trek a Machu Picchu', desc: 'Atraviesa el legendario paso de 4,630 msnm, duerme en domos de cristal y desciende por ceja de selva hasta la ciudadela inca.', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=600&auto=format&fit=crop', rating: '5.0', price: '$350', detail: '• 5 Días Todo Incluido' },
        { id: 'inca-trail-classic', title: 'Camino Inca Clásico 4D/3N', desc: 'El sendero empedrado original de los emperadores incas con vistas de ensueño sobre Wiñay Wayna y la entrada por el Inti Punku.', image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=600&auto=format&fit=crop', rating: '5.0', price: '$420', detail: '• Permisos Oficiales DIRCETUR' },
        { id: 'ausangate-circuit', title: 'Circuito Ausangate & 7 Lagunas', desc: 'Rodea el apu tutelar sagrado de Cusco frente a manadas de alpacas y relájate en las aguas termales de Pacchanta.', image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=600&auto=format&fit=crop', rating: '4.9', price: '$310', detail: '• Almuerzo Buffet Andino' },
        { id: 'choquequirao-trek', title: 'Choquequirao: La Ciudad Perdida', desc: 'Una expedición de pura adrenalina hacia la fortaleza hermana de Machu Picchu, suspendida en el cañón del río Apurímac.', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=600&auto=format&fit=crop', rating: '5.0', price: '$290', detail: '• Guiado Arqueológico Experto' },
        { id: 'inca-jungle-adventure', title: 'Inca Jungle Multideporte', desc: 'Bicicleta de montaña desde el Abra Málaga, tirolesa de 1,000m sobre el río y baños termales de Cocalmayo hacia Santa Teresa.', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600&auto=format&fit=crop', rating: '4.8', price: '$280', detail: '• Equipo Técnico Incluido' },
        { id: 'humantay-turquoise', title: 'Laguna Humantay & Domos Soraypampa', desc: 'Caminata hacia la joya turquesa de los Andes a los pies del nevado Humantay con pausas fotográficas y desayuno campestre.', image: 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=600&auto=format&fit=crop', rating: '4.9', price: 'S/ 160', detail: '• Salidas Diarias Confirmadas' }
      ]
    },
    itinerary: {
      badge: 'Ruta Oficial Confirmada',
      title: 'Itinerario Detallado Día por Día',
      subtitle: 'Conoce cada etapa de tu ascenso, tiempos de caminata y puntos de descanso estratégico.',
      dayPrefix: 'Día'
    },
    inclusions: {
      title: 'Detalles de la Expedición & Seguridad',
      includedTitle: 'Lo que incluye el tour',
      notIncludedTitle: 'Lo que no incluye',
      whatToBringTitle: 'Qué llevar en tu mochila'
    },
    testimonials: {
      badge: '⭐ 4.9 / 5.0 • Más de 10,200 Expedicionarios Felices',
      title: 'Lo que dicen nuestros expedicionarios',
      subtitle: 'Testimonios reales y verificados de viajeros de todo el mundo que cruzaron los Andes con nuestros guías oficiales.',
      verifiedTrip: 'Expedición Verificada',
      bottomGuarantees: {
        realReviews: '100% Reseñas de Viajeros Reales',
        dircetur: 'Guías Oficiales Colegiados DIRCETUR',
        excellence: 'Certificado de Excelencia 2026'
      },
      items: [
        {
          name: 'Martín y Claudia Flores',
          origin: 'Lima, Perú',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
          rating: 5,
          date: 'Septiembre 2026',
          route: 'Salkantay Trek 5D/4N',
          comment: 'Superó todas nuestras expectativas. La atención de nuestro guía en el paso de 4,630 msnm fue impecable de principio a fin. El oxígeno y la comida en los domos 10/10.'
        },
        {
          name: 'David & Sarah Miller',
          origin: 'Austin, Texas (USA)',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
          rating: 5,
          date: 'Agosto 2026',
          route: 'Camino Inca Clásico 4D',
          comment: '¡La mejor expedición de nuestras vidas! La atención al detalle, el equipo de montaña y la llegada a Machu Picchu por el Inti Punku al amanecer fue pura magia.'
        },
        {
          name: 'Matthieu & Élodie Laurent',
          origin: 'Lyon, Francia',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
          rating: 5,
          date: 'Julio 2026',
          route: 'Circuito Ausangate & 7 Lagunas',
          comment: 'Una organización impecable. Paisajes andinos grandiosos, caballos de auxilio en todo el trayecto y un trato humano insuperable.'
        },
        {
          name: 'Sofía & Lucas Valdivia',
          origin: 'Santiago, Chile',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
          rating: 5,
          date: 'Junio 2026',
          route: 'Laguna Humantay & Glamping',
          comment: 'Excelente ritmo de caminata para aclimatarse. Los bastones de trekking y el té de muña caliente hicieron que todo fuera seguro y reconfortante.'
        }
      ]
    },
    office: {
      badge: 'Base de Operaciones & Hub de Expedición',
      title: 'Oficina Física y Atención Personalizada en Cusco',
      subtitle: 'A pasos de la Plaza de Armas del Cusco. Visítanos en persona para tu briefing previo, custodia gratuita de equipaje o para tomar un té de coca de aclimatación con nuestros guías colegiados.',
      addressTitle: 'Dirección Oficial en Centro Histórico:',
      address: 'Portal de Panes N° 123, Plaza de Armas, Centro Histórico, Cusco - Perú',
      hoursTitle: 'Horario de Atención Corrido:',
      hours: 'Lunes a Domingo: 08:00 AM – 08:00 PM (Horario Corrido)',
      statusBadge: 'Abierto Ahora • Atención Continua',
      distanceBadge: 'A solo 40 metros de la Plaza de Armas',
      mapsBtn: 'Cómo Llegar en Google Maps',
      chatBtn: 'Hablar con Recepción WhatsApp',
      callBtn: 'Llamar a Central: (084) 240-980',
      servicesTitle: 'Servicios y Beneficios Exclusivos en Nuestra Base:',
      features: [
        {
          icon: 'briefing',
          title: 'Briefing Informativo Previo',
          desc: 'La noche anterior a las 6:00 PM, tu guía líder te espera en nuestra sala para revisar el mapa 3D de la ruta, clima en los pasos y dudas técnicas.',
          badge: 'Reunión Clave'
        },
        {
          icon: 'luggage',
          title: 'Custodia Gratuita de Equipaje',
          desc: 'Deja tus maletas grandes y compras en casilleros seguros con videovigilancia 24/7 sin costo adicional mientras tú caminas ligero por la montaña.',
          badge: '100% Gratuito'
        },
        {
          icon: 'acclimatization',
          title: 'Estación de Aclimatación & Pesaje',
          desc: 'Mate de coca y muña andino ilimitado, báscula digital para el peso reglamentario del duffel bag y chequeo de oximetría gratuito.',
          badge: 'Salud & Altitud'
        }
      ],
      guarantees: {
        dircetur: 'Licencia Oficial DIRCETUR N° 2026-CC-EXP',
        verified: 'Local Comercial Físico Verificado',
        lockers: 'Custodia con Cámaras de Seguridad 24/7',
        support: 'Protocolo de Evacuación Médica y Soporte'
      }
    }
  },
  en: {
    nav: {
      destinations: 'Destinations',
      iconic: 'Iconic Treks',
      itinerary: 'Itinerary',
      included: "What's Included",
      faq: 'FAQ',
      whatsappBtn: 'Book via WhatsApp',
      quoteBtn: 'Get Quote',
      bookNow: 'Book Now'
    },
    brand: {
      subtitle: 'Mountain & High Adventure Expeditions',
      badge: 'Peru'
    },
    hero: {
      badge: 'Discover the World • High Altitude Trekking',
      titleLine1: 'Travel the Best',
      titleLine2: "It's a Big World,",
      titleLine3: 'Go Explore! 🚀',
      subtitle: 'A legendary high-mountain trek crossing majestic snowcapped peaks, cloud forest, and coffee plantations down to the lost citadel of Machu Picchu.',
      ctaWhatsapp: 'Book Direct on WhatsApp',
      ctaQuote: 'Request Expedition Quote',
      viewItinerary: 'View Itinerary',
      fromPrice: 'From',
      dailyDepartures: 'Daily Guaranteed Departures',
      season: '2026 Season',
      highestPoint: 'Highest point:',
      licensedGuide: 'Licensed Guide:',
      happyCustomers: 'Our Happy Customers',
      reviewsCount: '(10.2k Reviews)'
    },
    searchedSpots: {
      title: 'Explore Top Searched Spots 🔥',
      subtitle: 'Legendary Andean trails equipped with dome campsites, certified mountain leaders, and high-altitude medical support.',
      spots: [
        { id: 'salkantay', name: 'Salkantay Trek', tours: '450 Tours', badge: '5 Days • 4,630 masl', price: '$350 USD', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=400&auto=format&fit=crop' },
        { id: 'inca-trail', name: 'Classic Inca Trail', tours: '380 Tours', badge: '4 Days • Sun Gate Entry', price: '$420 USD', image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=400&auto=format&fit=crop' },
        { id: 'ausangate', name: 'Ausangate 7 Lakes', tours: '600 Tours', badge: 'Glaciers & Hot Springs', price: '$310 USD', image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=400&auto=format&fit=crop' },
        { id: 'choquequirao', name: 'Choquequirao', tours: '250 Tours', badge: 'Inca Golden Cradle', price: '$290 USD', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=400&auto=format&fit=crop' },
        { id: 'humantay', name: 'Humantay Lake', tours: '520 Tours', badge: 'Andean Turquoise', price: 'S/ 160 PEN', image: 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=400&auto=format&fit=crop' },
        { id: 'vinicunca', name: 'Rainbow Mountain', tours: '780 Tours', badge: 'Colors of Vilcanota', price: 'S/ 150 PEN', image: 'https://images.unsplash.com/photo-1533050487297-09b450131914?q=80&w=400&auto=format&fit=crop' }
      ]
    },
    iconic: {
      title: 'Iconic Adventure Expeditions',
      subtitle: 'Proven trail routes with highest traveler satisfaction ratings across the Andes.',
      bookTour: 'Book on WhatsApp',
      detailsBtn: 'View Details',
      spotsLeft: 'Last guaranteed spots',
      tours: [
        { id: 'salkantay-classic', title: 'Salkantay Trek to Machu Picchu', desc: 'Conquer the 4,630m high mountain pass, sleep under the stars in glass domes, and trek into lush subtropical valleys to Machu Picchu.', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=600&auto=format&fit=crop', rating: '5.0', price: '$350', detail: '• 5 Days All-Inclusive' },
        { id: 'inca-trail-classic', title: 'Classic Inca Trail 4D/3N', desc: 'The original stone-paved royal Inca road featuring breathtaking views over Wiñay Wayna and entrance through the iconic Sun Gate.', image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=600&auto=format&fit=crop', rating: '5.0', price: '$420', detail: '• Official DIRCETUR Permits' },
        { id: 'ausangate-circuit', title: 'Ausangate Circuit & 7 Lakes', desc: 'Circle the sacred mountain of Cusco among herds of alpacas and unwind in natural mineral hot springs in Pacchanta.', image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=600&auto=format&fit=crop', rating: '4.9', price: '$310', detail: '• Mountain Buffet Included' },
        { id: 'choquequirao-trek', title: 'Choquequirao: The Lost Sister City', desc: 'A thrilling backcountry trek into the sister fortress of Machu Picchu perched deep over the Apurimac river canyon.', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=600&auto=format&fit=crop', rating: '5.0', price: '$290', detail: '• Expert Archaeological Guide' },
        { id: 'inca-jungle-adventure', title: 'Inca Jungle Multisport', desc: 'Downhill mountain biking from Abra Malaga, 1,000m zipline canopy over the valley, and relaxing Cocalmayo hot springs.', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600&auto=format&fit=crop', rating: '4.8', price: '$280', detail: '• Pro Technical Gear Included' },
        { id: 'humantay-turquoise', title: 'Humantay Lake & Soraypampa Domes', desc: 'Hike to the turquoise glacier lake at the foot of Mount Humantay with photographic viewpoints and hearty mountain breakfast.', image: 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=600&auto=format&fit=crop', rating: '4.9', price: 'S/ 160', detail: '• Daily Confirmed Departures' }
      ]
    },
    itinerary: {
      badge: 'Official Route Schedule',
      title: 'Day-by-Day Detailed Itinerary',
      subtitle: 'Learn every stage of your ascent, trekking times, elevation gains, and strategic rest camps.',
      dayPrefix: 'Day'
    },
    inclusions: {
      title: 'Expedition Details & Mountain Safety',
      includedTitle: "What's Included",
      notIncludedTitle: 'Not Included',
      whatToBringTitle: 'What to Pack in Your Daypack'
    },
    testimonials: {
      badge: '⭐ 4.9 / 5.0 • Over 10,200 Happy Adventurers',
      title: 'What Our Adventurers Say',
      subtitle: 'Verified testimonials from global travelers who crossed the high Andes with our licensed expedition leaders.',
      verifiedTrip: 'Verified Expedition',
      bottomGuarantees: {
        realReviews: '100% Real Verified Travelers',
        dircetur: 'Official Certified Mountain Guides',
        excellence: '2026 Certificate of Excellence'
      },
      items: [
        {
          name: 'David & Sarah Miller',
          origin: 'Austin, Texas (USA)',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
          rating: 5,
          date: 'August 2026',
          route: 'Classic Inca Trail 4D',
          comment: 'Best trekking experience of our lives! The porters, camping gear, and historical insights reaching the Sun Gate at sunrise made it completely unforgettable.'
        },
        {
          name: 'Sarah Jenkins & Friends',
          origin: 'London, UK',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
          rating: 5,
          date: 'September 2026',
          route: 'Salkantay Trek 5D/4N',
          comment: 'Reaching the mountain pass with our guides was the absolute highlight of our trip to Peru. Caring, professional, and authentic.'
        },
        {
          name: 'Matthieu & Élodie Laurent',
          origin: 'Lyon, France',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
          rating: 5,
          date: 'July 2026',
          route: 'Ausangate 7 Lakes Trek',
          comment: 'Flawless organization, breathtaking landscapes, and top-tier mountain chefs. Having emergency oxygen and horses gave us total peace of mind.'
        },
        {
          name: 'Lucas & Sofia Valdivia',
          origin: 'Santiago, Chile',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
          rating: 5,
          date: 'June 2026',
          route: 'Humantay Lake Glamping',
          comment: 'The glass domes under the starry Andean sky were pure wonder. The acclimatization pace was so gentle and safe. 10/10 experience!'
        }
      ]
    },
    office: {
      badge: 'Operations Base & Expedition Hub',
      title: 'Walk-In Office & Personalized Traveler Concierge',
      subtitle: 'Located right off Cusco’s Main Plaza de Armas. Meet us in person for your pre-trek briefing, free luggage storage, or complimentary acclimatization coca tea with our certified mountain guides.',
      addressTitle: 'Official Historic Center Address:',
      address: 'Portal de Panes N° 123, Main Plaza de Armas, Historic District, Cusco - Peru',
      hoursTitle: 'Walk-In Operating Hours:',
      hours: 'Monday to Sunday: 08:00 AM – 08:00 PM (Every Day)',
      statusBadge: 'Open Now • Continuous Service',
      distanceBadge: 'Just 40 meters from Main Plaza',
      mapsBtn: 'Get Walking Route on Google Maps',
      chatBtn: 'Chat with Front Desk WhatsApp',
      callBtn: 'Call Front Desk: +51 (084) 240-980',
      servicesTitle: 'Exclusive Expedition Amenities at Our Hub:',
      features: [
        {
          icon: 'briefing',
          title: 'Pre-Trek Evening Briefing',
          desc: 'Meet your lead guide the evening before at 6:00 PM to review detailed 3D topographic maps, high pass weather, and packing checklist.',
          badge: 'Key Briefing'
        },
        {
          icon: 'luggage',
          title: 'Complimentary Secure Luggage Storage',
          desc: 'Safely store your suitcases and city clothes in 24/7 CCTV-monitored lockers at zero extra charge while you hike.',
          badge: '100% Free'
        },
        {
          icon: 'acclimatization',
          title: 'Acclimatization Station & Bag Weigh-In',
          desc: 'Enjoy unlimited organic coca & muña tea, digital scales for duffel bags carried by horsemen, and free pulse oximeter check.',
          badge: 'Altitude Health'
        }
      ],
      guarantees: {
        dircetur: 'DIRCETUR Official Tour Operator License',
        verified: 'Verified Physical Commercial Headquarters',
        lockers: '24/7 CCTV Monitored Lockers',
        support: 'Emergency Evacuation Protocol & Satellite Support'
      }
    }
  },
  fr: {
    nav: {
      destinations: 'Destinations',
      iconic: 'Treks Iconiques',
      itinerary: 'Itinéraire',
      included: 'Inclus / Non Inclus',
      faq: 'FAQ',
      whatsappBtn: 'Réserver via WhatsApp',
      quoteBtn: 'Devis',
      bookNow: 'Réserver'
    },
    brand: {
      subtitle: 'Expéditions de Haute Montagne & Aventure',
      badge: 'Pérou'
    },
    hero: {
      badge: 'Discover the World • Trekking Haute Montagne',
      titleLine1: 'Voyagez au Sommet',
      titleLine2: 'Le Monde est Vaste,',
      titleLine3: 'Partez Explorer! 🚀',
      subtitle: 'Un trekking légendaire franchissant des cols enneigés majestueux, la forêt de nuages et des plantations de café jusqu’à la cité sacrée du Machu Picchu.',
      ctaWhatsapp: 'Réserver via WhatsApp',
      ctaQuote: 'Demander un Devis',
      viewItinerary: "Voir l'Itinéraire",
      fromPrice: 'À partir de',
      dailyDepartures: 'Départs Quotidiens Confirmés',
      season: 'Saison 2026',
      highestPoint: 'Point culminant:',
      licensedGuide: 'Guide Diplômé:',
      happyCustomers: 'Nos Voyageurs Heureux',
      reviewsCount: '(10.2k Avis)'
    },
    searchedSpots: {
      title: 'Explorez les Destinations Phares 🔥',
      subtitle: 'Des sentiers andins d’exception avec dômes confortables, guides de montagne francophones et assistance médicale.',
      spots: [
        { id: 'salkantay', name: 'Salkantay Trek', tours: '450 Tours', badge: '5 Jours • 4 630 m', price: '$350 USD', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=400&auto=format&fit=crop' },
        { id: 'inca-trail', name: 'Chemin de l’Inca', tours: '380 Tours', badge: '4 Jours • Porte du Soleil', price: '$420 USD', image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=400&auto=format&fit=crop' },
        { id: 'ausangate', name: 'Ausangate 7 Lacs', tours: '600 Tours', badge: 'Glaciers & Sources Chaudes', price: '$310 USD', image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=400&auto=format&fit=crop' },
        { id: 'choquequirao', name: 'Choquequirao', tours: '250 Tours', badge: 'Berceau d’Or Inca', price: '$290 USD', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=400&auto=format&fit=crop' },
        { id: 'humantay', name: 'Lagune Humantay', tours: '520 Tours', badge: 'Turquoise des Andes', price: 'S/ 160 PEN', image: 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=400&auto=format&fit=crop' },
        { id: 'vinicunca', name: 'Montagne 7 Couleurs', tours: '780 Tours', badge: 'Arc-en-Ciel des Andes', price: 'S/ 150 PEN', image: 'https://images.unsplash.com/photo-1533050487297-09b450131914?q=80&w=400&auto=format&fit=crop' }
      ]
    },
    iconic: {
      title: 'Circuits d’Aventure Emblématiques',
      subtitle: 'Les itinéraires les plus plébiscités par nos voyageurs francophones et internationaux.',
      bookTour: 'Réserver via WhatsApp',
      detailsBtn: 'Voir Détails',
      spotsLeft: 'Dernières places confirmées',
      tours: [
        { id: 'salkantay-classic', title: 'Salkantay Trek vers le Machu Picchu', desc: 'Passez le col mythique à 4 630 m, dormez sous les étoiles dans des dômes géodésiques et descendez vers les vallées subtropicales.', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=600&auto=format&fit=crop', rating: '5.0', price: '$350', detail: '• 5 Jours Tout Inclus' },
        { id: 'inca-trail-classic', title: 'Chemin de l’Inca Classique 4J/3N', desc: 'Le sentier originel pavé par les souverains incas avec des vues féeriques sur Wiñay Wayna et l’entrée majestueuse par la Porte du Soleil.', image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=600&auto=format&fit=crop', rating: '5.0', price: '$420', detail: '• Permis Officiels DIRCETUR' },
        { id: 'ausangate-circuit', title: 'Circuit Ausangate & 7 Lagunes', desc: 'Contournez la montagne sacrée de Cusco au milieu des alpagas et profitez des sources thermales revigorantes de Pacchanta.', image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=600&auto=format&fit=crop', rating: '4.9', price: '$310', detail: '• Déjeuner Buffet Inclus' },
        { id: 'choquequirao-trek', title: 'Choquequirao: La Cité Perdue', desc: 'Une aventure authentique au cœur du canyon de l’Apurímac vers la forteresse jumelle préservée du Machu Picchu.', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=600&auto=format&fit=crop', rating: '5.0', price: '$290', detail: '• Guide Archéologique Certifié' },
        { id: 'inca-jungle-adventure', title: 'Inca Jungle Multisports', desc: 'Descente en VTT depuis le col d’Abra Málaga, tyrolienne géante de 1 000 m et détente aux bains thermaux de Cocalmayo.', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600&auto=format&fit=crop', rating: '4.8', price: '$280', detail: '• Équipement Pro Inclus' },
        { id: 'humantay-turquoise', title: 'Lagune Humantay & Dômes Soraypampa', desc: 'Randonnée vers le joyau turquoise niché au pied du glacier Humantay avec petit-déjeuner montagnard chaud.', image: 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=600&auto=format&fit=crop', rating: '4.9', price: 'S/ 160', detail: '• Départs Quotidiens' }
      ]
    },
    itinerary: {
      badge: 'Itinéraire Officiel',
      title: 'Itinéraire Détaillé Jour par Jour',
      subtitle: 'Découvrez chaque étape de votre trek, temps de marche, dénivelés et campements stratégiques.',
      dayPrefix: 'Jour'
    },
    inclusions: {
      title: 'Sécurité & Prestations Incluses',
      includedTitle: 'Ce qui est inclus',
      notIncludedTitle: 'Non inclus',
      whatToBringTitle: 'À emporter dans votre sac à dos'
    },
    testimonials: {
      badge: '⭐ 4.9 / 5.0 • Plus de 10 200 Aventuriers Satisfaits',
      title: 'Ce que disent nos expéditionnaires',
      subtitle: 'Avis réels et vérifiés de randonneurs du monde entier qui ont exploré les Andes avec nos guides officiels.',
      verifiedTrip: 'Expédition Vérifiée',
      bottomGuarantees: {
        realReviews: '100% Véritables Témoignages',
        dircetur: 'Guides Officiels Certifiés DIRCETUR',
        excellence: 'Certificat d’Excellence 2026'
      },
      items: [
        {
          name: 'Matthieu & Élodie Laurent',
          origin: 'Lyon, France',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
          rating: 5,
          date: 'Juillet 2026',
          route: 'Ausangate 7 Lacs',
          comment: 'Une organisation sans faille. Des paysages à couper le souffle et un respect total des communautés andines. Les chevaux de secours et le matériel étaient impeccables.'
        },
        {
          name: 'David & Sarah Miller',
          origin: 'Austin, Texas (USA)',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
          rating: 5,
          date: 'Août 2026',
          route: 'Chemin de l’Inca Classique',
          comment: 'La meilleure expérience de trekking de notre vie ! Les porteurs, les repas chauds sous la tente et l’arrivée magique à la Porte du Soleil restent inoubliables.'
        },
        {
          name: 'Claire & Julien Moreau',
          origin: 'Bordeaux, France',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
          rating: 5,
          date: 'Septembre 2026',
          route: 'Salkantay Trek 5J',
          comment: 'Le passage du col à 4 630 mètres est grandiose. Notre guide était très attentif à l’acclimatation et l’oxygène à disposition rassure énormément.'
        },
        {
          name: 'Lucas & Sofia Valdivia',
          origin: 'Santiago, Chili',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
          rating: 5,
          date: 'Juin 2026',
          route: 'Lagune Humantay & Glamping',
          comment: 'Dormir dans les dômes face aux montagnes enneigées était un pur rêve. Rythme de marche parfait et bâtons de marche fournis très utiles.'
        }
      ]
    },
    office: {
      badge: 'Base Opérationnelle & Hub d’Expédition',
      title: 'Agence Physique & Accueil Personnalisé à Cusco',
      subtitle: 'À quelques pas de la Plaza de Armas de Cusco. Venez nous rencontrer pour votre briefing préparatoire, consigne de bagages gratuite ou pour déguster une infusion de coca avec nos guides certifiés.',
      addressTitle: 'Adresse au Centre Historique :',
      address: 'Portal de Panes N° 123, Plaza de Armas, Centre Historique, Cusco - Pérou',
      hoursTitle: 'Horaires d’Ouverture :',
      hours: 'Lundi au Dimanche : 08h00 – 20h00 (Tous les Jours)',
      statusBadge: 'Ouvert Maintenant • Accueil Continu',
      distanceBadge: 'À 40 mètres de la Plaza de Armas',
      mapsBtn: 'Itinéraire sur Google Maps',
      chatBtn: 'Contacter la Réception WhatsApp',
      callBtn: 'Appeler l’Agence : +51 (084) 240-980',
      servicesTitle: 'Services Exclusifs à Notre Base :',
      features: [
        {
          icon: 'briefing',
          title: 'Briefing Préparatoire la Veille',
          desc: 'La veille à 18h00, votre guide vous accueille pour étudier la carte topographique 3D, le climat des cols et ajuster votre sac.',
          badge: 'Réunion Clé'
        },
        {
          icon: 'luggage',
          title: 'Consigne Sécurisée de Bagages',
          desc: 'Déposez vos valises encombrantes dans nos casiers sécurisés sous vidéosurveillance 24/7 sans frais supplémentaires pendant votre trek.',
          badge: '100% Gratuit'
        },
        {
          icon: 'acclimatization',
          title: 'Espace Acclimatation & Pesée',
          desc: 'Infusions andines à volonté (coca et muña), balance électronique pour le sac confié aux muletiers et contrôle d’oxymétrie gratuit.',
          badge: 'Santé Altitude'
        }
      ],
      guarantees: {
        dircetur: 'Agrément Officiel DIRCETUR Pérou',
        verified: 'Établissement Physique Vérifié',
        lockers: 'Casiers Sécurisés Vidéosurveillance 24/7',
        support: 'Protocoles Médicaux & Suivi Satellite'
      }
    }
  },
  pt: {
    nav: {
      destinations: 'Destinos',
      iconic: 'Tours Icônicos',
      itinerary: 'Itinerário',
      included: 'O Que Inclui',
      faq: 'FAQ',
      whatsappBtn: 'Reservar via WhatsApp',
      quoteBtn: 'Cotar',
      bookNow: 'Reservar Agora'
    },
    brand: {
      subtitle: 'Expedições de Alta Montanha & Aventura',
      badge: 'Peru'
    },
    hero: {
      badge: 'Discover the World • Trekking nos Andes',
      titleLine1: 'Viaje ao Máximo',
      titleLine2: 'O Mundo é Gigante,',
      titleLine3: 'Vá Explorar! 🚀',
      subtitle: 'Um trekking lendário de alta montanha cruzando nevados imponentes, selva alta e plantações de café até a cidadela sagrada de Machu Picchu.',
      ctaWhatsapp: 'Reservar Direto no WhatsApp',
      ctaQuote: 'Solicitar Cotação',
      viewItinerary: 'Ver Itinerário',
      fromPrice: 'A partir de',
      dailyDepartures: 'Saídas Diárias Confirmadas',
      season: 'Temporada 2026',
      highestPoint: 'Ponto mais alto:',
      licensedGuide: 'Guia Credenciado:',
      happyCustomers: 'Nossos Clientes Felizes',
      reviewsCount: '(10.2k Avaliações)'
    },
    searchedSpots: {
      title: 'Destinos Mais Procurados nos Andes 🔥',
      subtitle: 'Rotas lendárias com acampamento em domos confortáveis, guías experientes e suporte médico de altitude.',
      spots: [
        { id: 'salkantay', name: 'Salkantay Trek', tours: '450 Tours', badge: '5 Dias • 4.630 m', price: '$350 USD', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=400&auto=format&fit=crop' },
        { id: 'inca-trail', name: 'Trilha Inca Clássica', tours: '380 Tours', badge: '4 Dias • Porta do Sol', price: '$420 USD', image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=400&auto=format&fit=crop' },
        { id: 'ausangate', name: 'Ausangate 7 Lagoas', tours: '600 Tours', badge: 'Geleiras & Águas Termais', price: '$310 USD', image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=400&auto=format&fit=crop' },
        { id: 'choquequirao', name: 'Choquequirao', tours: '250 Tours', badge: 'Berço de Ouro Inca', price: '$290 USD', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=400&auto=format&fit=crop' },
        { id: 'humantay', name: 'Lagoa Humantay', tours: '520 Tours', badge: 'Turquesa Andina', price: 'S/ 160 PEN', image: 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=400&auto=format&fit=crop' },
        { id: 'vinicunca', name: 'Montanha 7 Cores', tours: '780 Tours', badge: 'Cordilheira Arco-Íris', price: 'S/ 150 PEN', image: 'https://images.unsplash.com/photo-1533050487297-09b450131914?q=80&w=400&auto=format&fit=crop' }
      ]
    },
    iconic: {
      title: 'Tours Icônicos de Alta Montanha',
      subtitle: 'Circuitos comprovados com o mais alto índice de recomendação entre viajantes internacionais.',
      bookTour: 'Reservar no WhatsApp',
      detailsBtn: 'Ver Detalhes',
      spotsLeft: 'Últimas vagas garantidas',
      tours: [
        { id: 'salkantay-classic', title: 'Salkantay Trek a Machu Picchu', desc: 'Atravesse o lendário passo a 4.630m, durma em domos de vidro sob o céu estrelado e desça até os vales subtropicais.', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=600&auto=format&fit=crop', rating: '5.0', price: '$350', detail: '• 5 Dias Tudo Incluído' },
        { id: 'inca-trail-classic', title: 'Trilha Inca Clássica 4D/3N', desc: 'A trilha original de pedra dos imperadores incas com vistas mágicas de Wiñay Wayna e chegada triunfal pela Porta do Sol.', image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=600&auto=format&fit=crop', rating: '5.0', price: '$420', detail: '• Permissões Oficiais DIRCETUR' },
        { id: 'ausangate-circuit', title: 'Circuito Ausangate & 7 Lagoas', desc: 'Contorne o monte sagrado de Cusco em meio a rebanhos de alpacas e relaxe nas piscinas termais de Pacchanta.', image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=600&auto=format&fit=crop', rating: '4.9', price: '$310', detail: '• Almoço Buffet Andino' },
        { id: 'choquequirao-trek', title: 'Choquequirao: A Cidade Perdida', desc: 'Uma expedição repleta de adrenalina à fortaleza irmã de Machu Picchu, debruçada sobre o cânion do rio Apurímac.', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=600&auto=format&fit=crop', rating: '5.0', price: '$290', detail: '• Guia Arqueológico Especialista' },
        { id: 'inca-jungle-adventure', title: 'Inca Jungle Multiesporte', desc: 'Descida de mountain bike no Abra Málaga, tirolesa de 1.000m sobre o rio e banhos termais de Cocalmayo.', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600&auto=format&fit=crop', rating: '4.8', price: '$280', detail: '• Equipamento Técnico Pro' },
        { id: 'humantay-turquoise', title: 'Lagoa Humantay & Domos Soraypampa', desc: 'Caminhada até a joia turquesa dos Andes ao sopé do nevado Humantay com café da manhã quente reforçado.', image: 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=600&auto=format&fit=crop', rating: '4.9', price: 'S/ 160', detail: '• Saídas Diárias Confirmadas' }
      ]
    },
    itinerary: {
      badge: 'Roteiro Oficial',
      title: 'Itinerário Detalhado Dia a Dia',
      subtitle: 'Conheça cada trecho da sua caminhada, tempos de percurso, ganho de elevação e pontos de descanso.',
      dayPrefix: 'Dia'
    },
    inclusions: {
      title: 'Serviços & Segurança de Montanha',
      includedTitle: 'O que o tour inclui',
      notIncludedTitle: 'O que não inclui',
      whatToBringTitle: 'O que levar na sua mochila'
    },
    testimonials: {
      badge: '⭐ 4.9 / 5.0 • Mais de 10.200 Aventureiros Felizes',
      title: 'O que dizem os nossos expedicionários',
      subtitle: 'Depoimentos reais e verificados de viajantes de todo o mundo que cruzaram os Andes com nossos guias oficiais.',
      verifiedTrip: 'Expedição Verificada',
      bottomGuarantees: {
        realReviews: '100% Depoimentos de Viajantes Reais',
        dircetur: 'Guias Oficiais Credenciados DIRCETUR',
        excellence: 'Certificado de Excelência 2026'
      },
      items: [
        {
          name: 'Rodrigo & Mariana Castro',
          origin: 'São Paulo, Brasil',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
          rating: 5,
          date: 'Agosto 2026',
          route: 'Salkantay Trek 5D/4N',
          comment: 'Experiência sensacional! Os guias foram nota dez no cuidado com o mal de altitude e as refeições nos acampamentos superaram qualquer restaurante.'
        },
        {
          name: 'David & Sarah Miller',
          origin: 'Austin, Texas (USA)',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
          rating: 5,
          date: 'Setembro 2026',
          route: 'Trilha Inca Clássica',
          comment: 'Melhor trilha da nossa vida. Ver o nascer do sol no Inti Punku iluminando Machu Picchu foi indescritível!'
        },
        {
          name: 'Matthieu & Élodie Laurent',
          origin: 'Lyon, França',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
          rating: 5,
          date: 'Julho 2026',
          route: 'Circuito Ausangate 7 Lagoas',
          comment: 'Organização impecável do começo ao fim. Paisagens de tirar o fôlego e cavalos de apoio que deram total tranquilidade.'
        },
        {
          name: 'Sofía & Lucas Valdivia',
          origin: 'Santiago, Chile',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
          rating: 5,
          date: 'Junho 2026',
          route: 'Lagoa Humantay Glamping',
          comment: 'Ritmo de caminhada excelente para aclimatação. Chá de muña quentinho na trilha fez toda a diferença. Super recomendo!'
        }
      ]
    },
    office: {
      badge: 'Base de Operações & Hub de Expedição',
      title: 'Escritório Físico & Atendimento Personalizado em Cusco',
      subtitle: 'A poucos passos da Plaza de Armas de Cusco. Visite-nos pessoalmente para seu briefing prévio, guarda-volumes gratuito ou para tomar um chá de coca de aclimatação com nossos guias credenciados.',
      addressTitle: 'Endereço no Centro Histórico:',
      address: 'Portal de Panes N° 123, Plaza de Armas, Centro Histórico, Cusco - Peru',
      hoursTitle: 'Horário de Funcionamento:',
      hours: 'Segunda a Domingo: 08:00 – 20:00 (Ininterrupto)',
      statusBadge: 'Aberto Agora • Atendimento Contínuo',
      distanceBadge: 'A apenas 40 metros da Plaza de Armas',
      mapsBtn: 'Como Chegar no Google Maps',
      chatBtn: 'Falar com a Recepção no WhatsApp',
      callBtn: 'Ligar para Recepção: +51 (084) 240-980',
      servicesTitle: 'Benefícios e Serviços Exclusivos em Nossa Base:',
      features: [
        {
          icon: 'briefing',
          title: 'Briefing Prévio com o Guia Líder',
          desc: 'Na noite anterior às 18:00, seu guia líder o espera para revisar o mapa 3D da trilha, a previsão nos passos de altitude e tirar dúvidas.',
          badge: 'Reunião Chave'
        },
        {
          icon: 'luggage',
          title: 'Guarda-Volumes Gratuito e Seguro',
          desc: 'Deixe suas malas grandes e compras em armários monitorados por câmeras 24 horas por dia sem custo extra durante sua caminhada.',
          badge: '100% Gratuito'
        },
        {
          icon: 'acclimatization',
          title: 'Estação de Aclimatação & Pesagem',
          desc: 'Chá de coca e muña andino à vontade, balança digital para checar o peso permitido das bolsas dos tropeiros e oximetria gratuita.',
          badge: 'Saúde Andina'
        }
      ],
      guarantees: {
        dircetur: 'Licença Oficial DIRCETUR Operadora de Turismo',
        verified: 'Estabelecimento Comercial Físico Verificado',
        lockers: 'Armários com Câmeras de Segurança 24/7',
        support: 'Protocolo de Evacuação e Suporte Satelital'
      }
    }
  },
  it: {
    nav: {
      destinations: 'Destinazioni',
      iconic: 'Trek Iconici',
      itinerary: 'Itinerario',
      included: 'Cosa Include',
      faq: 'FAQ',
      whatsappBtn: 'Prenota su WhatsApp',
      quoteBtn: 'Preventivo',
      bookNow: 'Prenota Ora'
    },
    brand: {
      subtitle: 'Spedizioni di Alta Montagna & Avventura',
      badge: 'Perù'
    },
    hero: {
      badge: 'Discover the World • Trekking ad Alta Quota',
      titleLine1: 'Viaggia al Meglio',
      titleLine2: 'Il Mondo è Grande,',
      titleLine3: 'Vai ad Esplorare! 🚀',
      subtitle: 'Un trekking andino leggendario attraverso passi montani innevati, foreste nebbiose e piantagioni di caffè fino alla città sacra di Machu Picchu.',
      ctaWhatsapp: 'Prenota Diretto su WhatsApp',
      ctaQuote: 'Richiedi Preventivo',
      viewItinerary: 'Vedi Itinerario',
      fromPrice: 'A partire da',
      dailyDepartures: 'Partenze Giornaliere Confermate',
      season: 'Stagione 2026',
      highestPoint: 'Punto più alto:',
      licensedGuide: 'Guida Abilitata:',
      happyCustomers: 'I Nostri Viaggiatori Felici',
      reviewsCount: '(10.2k Recensioni)'
    },
    searchedSpots: {
      title: 'Destinazioni Più Richieste sulle Ande 🔥',
      subtitle: 'Percorsi leggendari con accampamenti in cupole panoramiche, guide certificate e supporto medico per l’altitudine.',
      spots: [
        { id: 'salkantay', name: 'Salkantay Trek', tours: '450 Tours', badge: '5 Giorni • 4.630 m', price: '$350 USD', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=400&auto=format&fit=crop' },
        { id: 'inca-trail', name: 'Cammino Inca Classico', tours: '380 Tours', badge: '4 Giorni • Porta del Sole', price: '$420 USD', image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=400&auto=format&fit=crop' },
        { id: 'ausangate', name: 'Ausangate 7 Lagune', tours: '600 Tours', badge: 'Ghiacciai & Terme', price: '$310 USD', image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=400&auto=format&fit=crop' },
        { id: 'choquequirao', name: 'Choquequirao', tours: '250 Tours', badge: 'Culla d’Oro Inca', price: '$290 USD', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=400&auto=format&fit=crop' },
        { id: 'humantay', name: 'Laguna Humantay', tours: '520 Tours', badge: 'Turchese Andino', price: 'S/ 160 PEN', image: 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=400&auto=format&fit=crop' },
        { id: 'vinicunca', name: 'Montagna dei 7 Colori', tours: '780 Tours', badge: 'Arcobaleno Andino', price: 'S/ 150 PEN', image: 'https://images.unsplash.com/photo-1533050487297-09b450131914?q=80&w=400&auto=format&fit=crop' }
      ]
    },
    iconic: {
      title: 'Spedizioni di Avventura Iconiche',
      subtitle: 'I sentieri andini con le valutazioni di soddisfazione più alte tra i viaggiatori internazionali.',
      bookTour: 'Prenota su WhatsApp',
      detailsBtn: 'Vedi Dettagli',
      spotsLeft: 'Ultimi posti confermati',
      tours: [
        { id: 'salkantay-classic', title: 'Salkantay Trek a Machu Picchu', desc: 'Valica il celebre passo a 4.630 m, dormi in cupole di vetro sotto le stelle e scendi verso le vallate subtropicali.', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=600&auto=format&fit=crop', rating: '5.0', price: '$350', detail: '• 5 Giorni Tutto Incluso' },
        { id: 'inca-trail-classic', title: 'Cammino Inca Classico 4G/3N', desc: 'L’antico percorso imperiale lastricato in pietra con viste sublimi su Wiñay Wayna e arrivo trionfale dalla Porta del Sole.', image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=600&auto=format&fit=crop', rating: '5.0', price: '$420', detail: '• Permessi Ufficiali DIRCETUR' },
        { id: 'ausangate-circuit', title: 'Circuito Ausangate & 7 Laghi', desc: 'Percorri la montagna sacra di Cusco tra mandrie di alpaca e rilassati nelle sorgenti termali naturali di Pacchanta.', image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=600&auto=format&fit=crop', rating: '4.9', price: '$310', detail: '• Pranzo Buffet Andino Incluso' },
        { id: 'choquequirao-trek', title: 'Choquequirao: La Città Perduta', desc: 'Un trekking impegnativo ed esclusivo nella fortezza gemella di Machu Picchu sospesa sull’imponente canyon dell’Apurímac.', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=600&auto=format&fit=crop', rating: '5.0', price: '$290', detail: '• Guida Archeologica Esperta' },
        { id: 'inca-jungle-adventure', title: 'Inca Jungle Multisport', desc: 'Discesa in mountain bike dal passo Abra Málaga, emozionante zipline e rigeneranti bagni termali a Cocalmayo.', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600&auto=format&fit=crop', rating: '4.8', price: '$280', detail: '• Attrezzatura Tecnica Inclusa' },
        { id: 'humantay-turquoise', title: 'Laguna Humantay & Glamping Soraypampa', desc: 'Salita verso lo splendido specchio d’acqua turchese ai piedi del ghiacciaio Humantay con colazione andina calda.', image: 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=600&auto=format&fit=crop', rating: '4.9', price: 'S/ 160', detail: '• Partenze Giornaliere' }
      ]
    },
    itinerary: {
      badge: 'Programma Ufficiale',
      title: 'Itinerario Dettagliato Giorno per Giorno',
      subtitle: 'Scopri ogni tappa della salita, tempi di cammino, dislivelli e accampamenti strategici.',
      dayPrefix: 'Giorno'
    },
    inclusions: {
      title: 'Servizi & Sicurezza in Montagna',
      includedTitle: 'Cosa include la spedizione',
      notIncludedTitle: 'Non incluso',
      whatToBringTitle: 'Cosa mettere nello zaino'
    },
    testimonials: {
      badge: '⭐ 4.9 / 5.0 • Più di 10.200 Avventurieri Soddisfatti',
      title: 'Cosa dicono i nostri escursionisti',
      subtitle: 'Recensioni reali e verificate di viaggiatori da tutto il mondo che hanno esplorato le Ande con le nostre guide ufficiali.',
      verifiedTrip: 'Spedizione Verificata',
      bottomGuarantees: {
        realReviews: '100% Recensioni di Viaggiatori Veri',
        dircetur: 'Guide Ufficiali Abilitate DIRCETUR',
        excellence: 'Certificato di Eccellenza 2026'
      },
      items: [
        {
          name: 'Elena & Marco Rossi',
          origin: 'Milano, Italia',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
          rating: 5,
          date: 'Maggio 2026',
          route: 'Salkantay Trek 5G/4N',
          comment: 'Guide ufficiali di altissimo livello, bombola d’ossigeno sempre a portata di mano e paesaggi maestosi che sembrano usciti da un documentario. Consigliatissimo!'
        },
        {
          name: 'David & Sarah Miller',
          origin: 'Austin, Texas (USA)',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
          rating: 5,
          date: 'Agosto 2026',
          route: 'Cammino Inca Classico',
          comment: 'Il miglior trekking della nostra vita! Attrezzatura impeccabile e l’arrivo alla Porta del Sole al sorgere del sole è stata un’emozione pura.'
        },
        {
          name: 'Matthieu & Élodie Laurent',
          origin: 'Lione, Francia',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
          rating: 5,
          date: 'Luglio 2026',
          route: 'Circuito Ausangate 7 Laghi',
          comment: 'Organizzazione impeccabile. Paesaggi andini mozzafiato, cavalli di supporto per tutto il percorso e personale di un’umanità straordinaria.'
        },
        {
          name: 'Sofía & Lucas Valdivia',
          origin: 'Santiago, Cile',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
          rating: 5,
          date: 'Giugno 2026',
          route: 'Laguna Humantay Glamping',
          comment: 'Ritmo di salita ottimo per l’acclimatazione. Il tè caldo di muña lungo il sentiero ha fatto davvero la differenza. Esperienza da 10 e lode!'
        }
      ]
    },
    office: {
      badge: 'Base Operativa & Hub di Spedizione',
      title: 'Ufficio Fisico & Assistenza Personalizzata a Cusco',
      subtitle: 'A pochi passi dalla Plaza de Armas di Cusco. Vieni a trovarci per il briefing prima della partenza, deposito bagagli gratuito o per sorseggiare un tè di coca di acclimatazione con le nostre guide ufficiali.',
      addressTitle: 'Indirizzo Ufficiale Centro Storico:',
      address: 'Portal de Panes N° 123, Plaza de Armas, Centro Storico, Cusco - Perù',
      hoursTitle: 'Orari di Apertura Continuato:',
      hours: 'Lunedì a Domenica: 08:00 – 20:00 (Orario Continuato)',
      statusBadge: 'Aperto Ora • Servizio Continuo',
      distanceBadge: 'A soli 40 metri dalla Plaza de Armas',
      mapsBtn: 'Indicazioni su Google Maps',
      chatBtn: 'Parla con la Reception su WhatsApp',
      callBtn: 'Chiama la Reception: +51 (084) 240-980',
      servicesTitle: 'Servizi Esclusivi per i Nostri Viaggiatori:',
      features: [
        {
          icon: 'briefing',
          title: 'Briefing Informativo della Vigilia',
          desc: 'La sera precedente alle 18:00, la guida ti aspetta per analizzare la mappa 3D del percorso, il meteo sui valichi d’alta quota e verificare l’equipaggiamento.',
          badge: 'Incontro Chiave'
        },
        {
          icon: 'luggage',
          title: 'Deposito Bagagli Gratuito e Protetto',
          desc: 'Lascia le valigie ingombranti nei nostri armadietti videosorvegliati 24/7 a costo zero mentre cammini sui sentieri di montagna.',
          badge: '100% Gratuito'
        },
        {
          icon: 'acclimatization',
          title: 'Area Acclimatazione & Pesa Borse',
          desc: 'Infusioni andine di coca e muña senza limiti, bilancia digitale per i borsoni dei mulattieri e controllo gratuito dell’ossigenazione.',
          badge: 'Salute & Quota'
        }
      ],
      guarantees: {
        dircetur: 'Licenza Ufficiale DIRCETUR Tour Operator',
        verified: 'Sede Commerciale Fisica Verificata',
        lockers: 'Armadietti con Videosorveglianza 24/7',
        support: 'Protocollo Medico d’Emergenza e Supporto'
      }
    }
  }
};
