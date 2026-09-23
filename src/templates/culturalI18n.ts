import { LanguageType } from '@/types/landing';

export interface CulturalI18nTexts {
  emblemTitle: string;
  emblemSub: string;
  nav: {
    cronicas: string;
    agenda: string;
    territorio: string;
    itinerario: string;
    conseils: string;
    guide: string;
    reviews: string;
    contact: string;
  };
  cta: {
    quote: string;
    reserve: string;
    whatsapp: string;
    exploreTerritory: string;
    callOffice: string;
    writeWhatsApp: string;
  };
  heroSubtitleDefault: string;
  quickServices: Array<{
    icon: string;
    label: string;
    sub: string;
  }>;
  actualites: {
    title: string;
    badgeFeatured: string;
    featuredTitle: string;
    featuredDesc: string;
    readMore: string;
    btnAll: string;
    items: Array<{
      id: number;
      badge: string;
      date: string;
      title: string;
      desc: string;
      linkText: string;
    }>;
  };
  agenda: {
    title: string;
    desc1: string;
    desc2: string;
    btnAll: string;
    readMore: string;
    events: Array<{
      id: string;
      date: string;
      badge: string;
      title: string;
      desc: string;
    }>;
  };
  territory: {
    title: string;
    desc1: string;
    desc2: string;
    btnMap: string;
    badgeGps: string;
    cardTitle: string;
    places: Array<{
      num: number;
      name: string;
      altitude: string;
    }>;
    tip: string;
  };
  itinerary: {
    badge: string;
    title: string;
    subtitle: string;
  };
  features: {
    defaultTitle: string;
    defaultDesc: string;
  };
  conseils: {
    badge: string;
    title: string;
    subtitle: string;
    recommended: string;
    items: Array<{
      icon: string;
      title: string;
      subtitle: string;
      desc: string;
    }>;
  };
  guides: {
    badge: string;
    title: string;
    subtitle: string;
    activeStatus: string;
    list: Array<{
      id: string;
      name: string;
      title: string;
      role: string;
      cert: string;
      avatar: string;
      quote: string;
      specs: Array<{ icon: string; label: string }>;
      directBtn: string;
      msgPrefix: string;
    }>;
  };
  livreDor: {
    badge: string;
    title: string;
    subtitle: string;
    scoreOutOf: string;
    verifiedCount: string;
    positiveRate: string;
    certBadge: string;
    authenticatedBadge: string;
    officialRegistry: string;
    reviews: Array<{
      name: string;
      origin: string;
      date: string;
      stars: number;
      comment: string;
    }>;
  };
  footer: {
    townName: string;
    regionalDir: string;
    officeTitle: string;
    officeDesc: string;
    hoursTitle: string;
    hoursDesc: string;
    contactBtn: string;
    copyright: string;
  };
  mobileSticky: {
    tariffLabel: string;
    quote: string;
    reserve: string;
  };
}

export const CULTURAL_I18N: Record<LanguageType, CulturalI18nTexts> = {
  // ==========================================
  // ESPAÑOL (ES)
  // ==========================================
  es: {
    emblemTitle: 'Qosqo Ancestral',
    emblemSub: 'Patrimonio Cultural de la Humanidad',
    nav: {
      cronicas: 'Crónicas',
      agenda: 'Agenda',
      territorio: 'Territorio',
      itinerario: 'Itinerario',
      conseils: 'Qué Llevar',
      guide: 'Historiadores',
      reviews: 'Libro de Oro',
      contact: 'Oficina'
    },
    cta: {
      quote: 'Cotizar Visita',
      reserve: 'Reservar',
      whatsapp: 'WhatsApp',
      exploreTerritory: 'Explorar el Territorio',
      callOffice: 'Llamar a la Oficina',
      writeWhatsApp: 'Escribir por WhatsApp'
    },
    heroSubtitleDefault: 'Entre montañas sagradas y tradición milenaria, bienvenido a la capital arqueológica de América.',
    quickServices: [
      { icon: '🎫', label: 'Boleto Turístico', sub: 'Accesos Oficiales' },
      { icon: '📜', label: 'Guía Colegiado', sub: 'DIRCETUR Oficial' },
      { icon: '🕯️', label: 'Ceremonias Andinas', sub: 'Pago a la Pachamama' },
      { icon: '🏛️', label: 'Templos & Palacios', sub: 'Arquitectura Inca' },
      { icon: '📞', label: 'Asistencia 24/7', sub: 'Horarios & Reservas' }
    ],
    actualites: {
      title: 'Crónicas & Patrimonio',
      badgeFeatured: 'Publicado: Temporada 2026',
      featuredTitle: 'Un nuevo sendero señalizado hacia los templos incas',
      featuredDesc: 'El circuito guiado hacia las alturas sagradas del Cusco ofrece vistas incomparables sobre la ciudad imperial, los muros ciclópeos de Sacsayhuamán y las huacas de aclimatación.',
      readMore: 'Leer crónica / Reservar',
      btnAll: 'Todas las crónicas',
      items: [
        {
          id: 1,
          badge: 'Historia & Arqueología',
          date: 'Temporada 2026',
          title: 'Secretos del Qorikancha y el templo dorado del Sol',
          desc: 'Un recorrido guiado por las cimentaciones megalíticas más perfectas del imperio incaico y su fusión con el convento virreinal de Santo Domingo.',
          linkText: 'Leer crónica del templo'
        },
        {
          id: 2,
          badge: 'Conservación & Muros',
          date: 'Patrimonio UNESCO',
          title: 'La piedra de los 12 ángulos y el palacio de Inca Roca',
          desc: 'Análisis arquitectónico in situ de la calle Hatun Rumiyoc con guías historiadores certificados de la Universidad San Antonio Abad.',
          linkText: 'Ver detalles de ruta'
        },
        {
          id: 3,
          badge: 'Cultura Viva',
          date: 'Tradición Andina',
          title: 'Ceremonia de ofrenda a la Pachamama y textilería ancestral',
          desc: 'Aprende sobre la cosmovisión andina, los tres mundos (Hanan, Kay, Uku Pacha) y los tintes vegetales naturales de los valles cusqueños.',
          linkText: 'Consultar horarios'
        }
      ]
    },
    agenda: {
      title: 'Agenda Cultural',
      desc1: 'A lo largo de todo el año, Cusco vibra al compás de sus festividades sagradas: celebraciones locales, caminatas históricas, rituales ancestrales y visitas guiadas especializadas.',
      desc2: 'Descubre las fechas imperdibles para organizar tu estadía y vivir la historia viva en directo.',
      btnAll: 'TODOS LOS EVENTOS',
      readMore: 'Leer más / Reservar',
      events: [
        {
          id: 'inti-raymi',
          date: '24 Junio 2026',
          badge: 'Solsticio de Invierno',
          title: 'Inti Raymi: La Gran Fiesta del Sol',
          desc: 'Celebración milenaria en Sacsayhuamán con más de 700 actores en escena reviviendo el mayor tributo al dios Inti.'
        },
        {
          id: 'city-tour-ancestral',
          date: 'Salidas Diarias Confirmadas',
          badge: 'Mañanas & Tardes',
          title: 'Circuito de los 4 Templos: Qenqo & Puka Pukara',
          desc: 'Visita guiada a los centros ceremoniales, laberintos de roca caliza y fortalezas de control militar del imperio.'
        }
      ]
    },
    territory: {
      title: 'El Territorio Sagrado',
      desc1: 'Entre tradiciones vivas al pie de las cumbres andinas, Cusco cautiva por su autenticidad, sus templos sagrados y su entorno natural preservado.',
      desc2: 'A través del mapa interactivo, explora los lugares más emblemáticos: Qorikancha, Sacsayhuamán, miradores de San Blas y senderos históricos. Una forma simple e intuitiva de conocer el territorio inca.',
      btnMap: 'VER MAPA INTERACTIVO',
      badgeGps: 'GPS Cusco',
      cardTitle: 'Cartografía de los Templos',
      places: [
        { num: 1, name: 'Qorikancha (Templo del Sol)', altitude: '3,400 m' },
        { num: 2, name: 'Sacsayhuamán Megalítico', altitude: '3,700 m' },
        { num: 3, name: 'Qenqo & Puka Pukara', altitude: '3,800 m' },
        { num: 4, name: 'Plaza de Armas & Catedral', altitude: 'Punto Cero' }
      ],
      tip: '💡 Haz clic para abrir la ruta directa en tu aplicación de navegación GPS.'
    },
    itinerary: {
      badge: 'Itinerario Oficial DIRCETUR',
      title: 'Ruta Histórica Paso a Paso',
      subtitle: 'Organizado con tiempos holgados para apreciación fotográfica y explicación histórica.'
    },
    features: {
      defaultTitle: '¿Qué incluye la experiencia cultural?',
      defaultDesc: 'Servicio brindado con estándares de calidad turística.'
    },
    conseils: {
      badge: 'Recomendaciones del Historiador',
      title: 'Preparar la Visita: Qué llevar en la mochila',
      subtitle: 'Para disfrutar del patrimonio en las mejores condiciones de confort y seguridad a 3,400 metros de altitud.',
      recommended: '✓ Recomendado',
      items: [
        {
          icon: '👟',
          title: 'Calzado con buena tracción',
          subtitle: 'Empedrado & escalinatas incas',
          desc: 'Las losas de Hatun Rumiyoc y los caminos de piedra de Sacsayhuamán están pulidos por los siglos. Usa zapatillas de marcha con suela antideslizante.'
        },
        {
          icon: '☀️',
          title: 'Protección solar andina',
          subtitle: 'Radiación UV de altura',
          desc: 'Bajo el cielo diáfano de los Andes, los rayos UV son potentes incluso en días nublados. Sombrero de ala ancha, lentes UV400 y bloqueador solar son indispensables.'
        },
        {
          icon: '💵',
          title: 'Efectivo en Soles (PEN)',
          subtitle: 'Taquillas & artesanías locales',
          desc: 'Algunas ventanillas de parques arqueológicos y maestras tejedoras tradicionales no cuentan con terminal POS. Recomendamos llevar 100 a 150 soles en efectivo.'
        },
        {
          icon: '🧥',
          title: 'Prendas en varias capas',
          subtitle: 'Gradiente térmico andino',
          desc: 'El sol abriga al mediodía (20°C), pero a partir de las 16:30 hrs el viento fresco sopla con fuerza en Sacsayhuamán (10°C). Lleva casaca cortaviento y abrigo ligero.'
        }
      ]
    },
    guides: {
      badge: 'Mediadores del Patrimonio & Historiadores Colegiados',
      title: 'Tus Guías-Historiadores Oficiales',
      subtitle: 'Todos nuestros guías son arqueólogos o historiadores titulados por la Universidad San Antonio Abad (UNSAAC), con carnet oficial DIRCETUR y membresía COLTUR.',
      activeStatus: '✓ Activo',
      list: [
        {
          id: 'lucia-condori',
          name: 'Lic. Lucía Condori',
          title: 'Tu Mediadora del Patrimonio',
          role: 'Arqueóloga & Cosmovisión Andina',
          cert: 'Carnet DIRCETUR N° 04821 • COLTUR Cusco',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
          quote: 'Transmitir la memoria de las piedras no es recitar fechas: es una inmersión viva en la cosmogonía de nuestros ancestros. Cada templo que recorremos guarda el equilibrio sagrado entre el ser humano y la Pachamama.',
          specs: [
            { icon: '🎓', label: 'Titulada de la UNSAAC Cusco' },
            { icon: '🗣️', label: 'Español, Inglés y Francés' },
            { icon: '🏛️', label: '12 años de labor arqueológica' },
            { icon: '🛡️', label: 'Primeros Auxilios & Altitud' }
          ],
          directBtn: 'Consultar con Lucía Condori',
          msgPrefix: 'Hola Lucía Condori, deseo información y disponibilidad para el tour cultural'
        },
        {
          id: 'marco-quispe',
          name: 'Lic. Marco Antonio Quispe',
          title: 'Tu Historiador de Arquitectura',
          role: 'Ingeniería Megalítica & Sacsayhuamán',
          cert: 'Carnet DIRCETUR N° 03914 • COLTUR Cusco',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
          quote: 'La arquitectura inca no fue únicamente monumental, sino asísmica y sagrada. Analizar el ensamblaje de los bloques ciclópeos en el terreno permite comprender el genio matemático andino.',
          specs: [
            { icon: '🎓', label: 'Titulado de la UNSAAC Cusco' },
            { icon: '🗣️', label: 'Español, Quechua y Francés' },
            { icon: '🏛️', label: '15 años investigando canteras' },
            { icon: '🛡️', label: 'Guía de Alta Montaña DIRCETUR' }
          ],
          directBtn: 'Consultar con Marco Quispe',
          msgPrefix: 'Hola Marco Antonio Quispe, deseo información y disponibilidad para el tour cultural'
        },
        {
          id: 'carlos-valdivia',
          name: 'Mag. Carlos Eduardo Valdivia',
          title: 'Tu Especialista en Arte Virreinal',
          role: 'Historia del Arte Colonial & Qorikancha',
          cert: 'Carnet DIRCETUR N° 05128 • COLTUR Cusco',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
          quote: 'El encuentro entre los templos incas del Sol y las arquerías virreinales del convento de Santo Domingo refleja el diálogo, resistencia y mestizaje de nuestra capital imperial.',
          specs: [
            { icon: '🎓', label: 'Maestría Arte Andino (UNSAAC)' },
            { icon: '🗣️', label: 'Español, Inglés e Italiano' },
            { icon: '🏛️', label: '10 años en museos y templos' },
            { icon: '🛡️', label: 'Guía Conferencista Oficial' }
          ],
          directBtn: 'Consultar con Carlos Valdivia',
          msgPrefix: 'Hola Carlos Eduardo Valdivia, deseo información y disponibilidad para el tour cultural'
        }
      ]
    },
    livreDor: {
      badge: 'Reseñas Verificadas de Viajeros',
      title: 'El Libro de Oro del Patrimonio',
      subtitle: 'Testimonios de apasionados por la historia, académicos y familias que vivieron la inmersión cultural en Cusco.',
      scoreOutOf: 'Sobre 5.0',
      verifiedCount: '184 opiniones verificadas',
      positiveRate: '✓ 100% Satisfacción',
      certBadge: 'Certificado de Excelencia DIRCETUR',
      authenticatedBadge: 'Opiniones 100% Auténticas por WhatsApp & Voucher',
      officialRegistry: 'Registro oficial de guías profesionales del Perú',
      reviews: [
        {
          name: 'Jean-Luc & Françoise Moreau',
          origin: '🇫🇷 Lyon, Francia',
          date: 'Visita realizada el 14 Septiembre 2026',
          stars: 5,
          comment: 'Una visita magistral que supera por completo cualquier tour convencional. Las explicaciones sobre la ingeniería sismorresistente de Sacsayhuamán y la simbología del Templo del Sol fueron de un rigor admirable.'
        },
        {
          name: 'Dra. Elena Santillán',
          origin: '🇪🇸 Madrid, España',
          date: 'Visita realizada el 02 Agosto 2026',
          stars: 5,
          comment: 'Como docente de historia del arte, buscaba un guiado sin mitos inventados. La preparación académica de la guía y su respeto por las fuentes cronistas coloniales me pareció extraordinaria. Diez sobre diez.'
        },
        {
          name: 'Michael & Sarah Jenkins',
          origin: '🇺🇸 Boston, EE.UU.',
          date: 'Visita realizada el 19 Julio 2026',
          stars: 5,
          comment: 'The best tour we took in Peru! Small group, zero rush, crystal-clear audio receivers, and fascinating insights into Inca astronomy that you simply cannot get on standard commercial buses.'
        }
      ]
    },
    footer: {
      townName: 'Cusco Patrimonial',
      regionalDir: 'DIRCETUR Cusco • Perú',
      officeTitle: 'Oficina de Información Turística',
      officeDesc: 'Portal de Panes N° 123, Plaza de Armas, Centro Histórico, Cusco',
      hoursTitle: 'Horario de Atención',
      hoursDesc: 'Lunes a Domingo de 08:00 AM a 08:00 PM (Horario Corrido)',
      contactBtn: '¡Contáctanos por WhatsApp!',
      copyright: '© 2026 Cusco Creativos S.A.C. — Edición Patrimonial y Cultural. Todos los derechos reservados.'
    },
    mobileSticky: {
      tariffLabel: 'Tarifa Cultural',
      quote: 'Cotizar',
      reserve: 'Reservar'
    }
  },

  // ==========================================
  // ENGLISH (EN)
  // ==========================================
  en: {
    emblemTitle: 'Ancestral Qosqo',
    emblemSub: 'World Cultural Heritage',
    nav: {
      cronicas: 'Chronicles',
      agenda: 'Agenda',
      territorio: 'Territory',
      itinerario: 'Itinerary',
      conseils: 'What to Pack',
      guide: 'Historians',
      reviews: 'Guestbook',
      contact: 'Office'
    },
    cta: {
      quote: 'Request Quote',
      reserve: 'Book Now',
      whatsapp: 'WhatsApp',
      exploreTerritory: 'Explore Territory',
      callOffice: 'Call Office',
      writeWhatsApp: 'Message on WhatsApp'
    },
    heroSubtitleDefault: 'Between sacred mountains and millennial traditions, welcome to the archaeological capital of the Americas.',
    quickServices: [
      { icon: '🎫', label: 'Tourist Ticket', sub: 'Official Passes' },
      { icon: '📜', label: 'Certified Guide', sub: 'Official DIRCETUR' },
      { icon: '🕯️', label: 'Andean Rituals', sub: 'Pachamama Tribute' },
      { icon: '🏛️', label: 'Temples & Palaces', sub: 'Inca Architecture' },
      { icon: '📞', label: '24/7 Concierge', sub: 'Times & Bookings' }
    ],
    actualites: {
      title: 'Heritage Chronicles & News',
      badgeFeatured: 'Season 2026',
      featuredTitle: 'A new marked trail to the sacred Inca temples',
      featuredDesc: 'The guided route to the heights of Cusco offers unmatched views of the imperial city, Sacsayhuamán megalithic walls and sacred acclimation huacas.',
      readMore: 'Read chronicle / Book',
      btnAll: 'All Chronicles',
      items: [
        {
          id: 1,
          badge: 'History & Archaeology',
          date: 'Season 2026',
          title: 'Secrets of Qorikancha and the Golden Sun Temple',
          desc: 'A guided walk through the most precise megalithic foundations of the Inca Empire and its synthesis with Santo Domingo Convent.',
          linkText: 'Read temple chronicle'
        },
        {
          id: 2,
          badge: 'Conservation & Walls',
          date: 'UNESCO Heritage',
          title: 'The 12-angled stone and the Palace of Inca Roca',
          desc: 'On-site architectural analysis along Hatun Rumiyoc street with licensed historian guides graduated from UNSAAC.',
          linkText: 'View route details'
        },
        {
          id: 3,
          badge: 'Living Culture',
          date: 'Andean Tradition',
          title: 'Ceremony of offering to Pachamama & ancestral textiles',
          desc: 'Learn about Andean cosmovision, the three worlds (Hanan, Kay, Uku Pacha) and natural vegetable dyes from the valleys.',
          linkText: 'Check schedules'
        }
      ]
    },
    agenda: {
      title: 'Cultural Agenda',
      desc1: 'Throughout the year, Cusco moves to the rhythm of ancient ceremonies: historic walks, solar rituals and scholarly guided visits.',
      desc2: 'Find the upcoming key dates to witness living history directly during your stay.',
      btnAll: 'ALL EVENTS',
      readMore: 'Read more / Reserve',
      events: [
        {
          id: 'inti-raymi',
          date: 'June 24, 2026',
          badge: 'Winter Solstice',
          title: 'Inti Raymi: The Great Festival of the Sun',
          desc: 'Millennial celebration at Sacsayhuamán featuring over 700 actors honoring Inti, the Inca Sun God.'
        },
        {
          id: 'city-tour-ancestral',
          date: 'Daily Confirmed Departures',
          badge: 'Mornings & Afternoons',
          title: 'Circuit of the 4 Temples: Qenqo & Puka Pukara',
          desc: 'Specialized tour to ceremonial centers, limestone labyrinths and military control fortresses of the empire.'
        }
      ]
    },
    territory: {
      title: 'The Sacred Territory',
      desc1: 'Surrounded by living traditions at the foot of Andean peaks, Cusco captivates through authentic heritage, sacred sanctuaries and preserved landscapes.',
      desc2: 'Through the interactive map, explore the most iconic monuments: Qorikancha, Sacsayhuamán, San Blas viewpoints and historic Inca trails.',
      btnMap: 'VIEW INTERACTIVE MAP',
      badgeGps: 'Cusco GPS',
      cardTitle: 'Sanctuaries Cartography',
      places: [
        { num: 1, name: 'Qorikancha (Temple of the Sun)', altitude: '3,400 m' },
        { num: 2, name: 'Megalithic Sacsayhuamán', altitude: '3,700 m' },
        { num: 3, name: 'Qenqo & Puka Pukara', altitude: '3,800 m' },
        { num: 4, name: 'Plaza de Armas & Cathedral', altitude: 'Point Zero' }
      ],
      tip: '💡 Click to open direct navigation coordinates in your mobile GPS application.'
    },
    itinerary: {
      badge: 'Official DIRCETUR Itinerary',
      title: 'Step-by-Step Historical Route',
      subtitle: 'Paced with ample time for photography, quiet contemplation and in-depth historical narrative.'
    },
    features: {
      defaultTitle: 'What is included in the cultural experience?',
      defaultDesc: 'Service provided under licensed tourist quality standards.'
    },
    conseils: {
      badge: "Historian's Practical Advice",
      title: 'Preparing Your Visit: What to carry',
      subtitle: 'To appreciate ancestral monuments in the highest comfort and safety at 3,400 meters altitude.',
      recommended: '✓ Recommended',
      items: [
        {
          icon: '👟',
          title: 'High-traction footwear',
          subtitle: 'Cobblestones & Inca stairs',
          desc: 'Hatun Rumiyoc stones and Sacsayhuamán steps have been polished by centuries. Opt for sturdy walking shoes or sneakers with ribbed grip.'
        },
        {
          icon: '☀️',
          title: 'High altitude sun defense',
          subtitle: 'UV radiation at 3,400m',
          desc: 'Under clear Andean skies, UV rays are intense even on overcast days. Wide-brimmed hats, UV400 sunglasses and sunscreen are essential.'
        },
        {
          icon: '💵',
          title: 'Cash in Peruvian Soles (PEN)',
          subtitle: 'Park ticket booths & crafts',
          desc: 'Some archaeological entrances and traditional weavers do not have card terminals. Carry 100 to 150 Soles in cash per person.'
        },
        {
          icon: '🧥',
          title: 'Layered clothing',
          subtitle: 'Andean thermal shifts',
          desc: 'Sun warms nicely at noon (20°C / 68°F), but brisk mountain winds pick up at Sacsayhuamán by 4:30 PM (10°C / 50°F). Bring a fleece or windbreaker.'
        }
      ]
    },
    guides: {
      badge: 'Certified Heritage Mediators & Historians',
      title: 'Your Dedicated Official Tour Guides',
      subtitle: 'All our guides hold university degrees in Archaeology or History from UNSAAC, official DIRCETUR licenses and active COLTUR memberships.',
      activeStatus: '✓ Licensed',
      list: [
        {
          id: 'lucia-condori',
          name: 'Lic. Lucía Condori',
          title: 'Your Heritage Mediator',
          role: 'Archaeologist & Andean Cosmovision',
          cert: 'DIRCETUR License N° 04821 • COLTUR Cusco',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
          quote: 'Passing down the memory of the stones is not reciting dates: it is a living immersion in the cosmovision of our ancestors. Every temple we tread holds the sacred balance between humanity and Pachamama.',
          specs: [
            { icon: '🎓', label: 'UNSAAC Cusco Alumna' },
            { icon: '🗣️', label: 'English, French & Spanish' },
            { icon: '🏛️', label: '12 years in archaeological research' },
            { icon: '🛡️', label: 'High Altitude First Aid Certified' }
          ],
          directBtn: 'Chat with Lucía Condori',
          msgPrefix: 'Hello Lucía Condori, I would like information and availability for the cultural tour'
        },
        {
          id: 'marco-quispe',
          name: 'Lic. Marco Antonio Quispe',
          title: 'Your Architectural Historian',
          role: 'Megalithic Engineering & Sacsayhuamán',
          cert: 'DIRCETUR License N° 03914 • COLTUR Cusco',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
          quote: 'Inca architecture was not only monumental, but seismic-resistant and sacred. Examining cyclopean joinery in person unveils the true mathematical genius of the Andes.',
          specs: [
            { icon: '🎓', label: 'UNSAAC Cusco Alumnus' },
            { icon: '🗣️', label: 'Quechua, Spanish & French' },
            { icon: '🏛️', label: '15 years studying megaliths' },
            { icon: '🛡️', label: 'Certified Mountain Guide' }
          ],
          directBtn: 'Chat with Marco Quispe',
          msgPrefix: 'Hello Marco Antonio Quispe, I would like information and availability for the cultural tour'
        },
        {
          id: 'carlos-valdivia',
          name: 'Mag. Carlos Eduardo Valdivia',
          title: 'Your Colonial Art Specialist',
          role: 'Colonial Art History & Qorikancha',
          cert: 'DIRCETUR License N° 05128 • COLTUR Cusco',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
          quote: 'The encounter between the Inca Sun Temples and the viceregal arcades of Santo Domingo Convent illustrates the dialogue, resilience, and artistic synthesis of our imperial city.',
          specs: [
            { icon: '🎓', label: "Master's Degree Andean Art (UNSAAC)" },
            { icon: '🗣️', label: 'English, Italian & Spanish' },
            { icon: '🏛️', label: '10 years museum & churches guide' },
            { icon: '🛡️', label: 'Official Lecturer Guide' }
          ],
          directBtn: 'Chat with Carlos Valdivia',
          msgPrefix: 'Hello Carlos Eduardo Valdivia, I would like information and availability for the cultural tour'
        }
      ]
    },
    livreDor: {
      badge: 'Verified Traveler Reviews',
      title: 'The Heritage Guestbook',
      subtitle: 'Feedback from history enthusiasts, scholars and families who experienced cultural immersion in Cusco.',
      scoreOutOf: 'Out of 5.0',
      verifiedCount: '184 verified reviews',
      positiveRate: '✓ 100% Positive Ratings',
      certBadge: 'DIRCETUR Certificate of Excellence',
      authenticatedBadge: '100% Verified via WhatsApp & Tour Vouchers',
      officialRegistry: 'Official National Tourist Guide Registry of Peru',
      reviews: [
        {
          name: 'Jean-Luc & Françoise Moreau',
          origin: '🇫🇷 Lyon, France',
          date: 'Tour completed on September 14, 2026',
          stars: 5,
          comment: 'A masterful visit that far surpasses standard commercial tours. Explanations of earthquake-resistant engineering at Sacsayhuamán and Sun Temple symbols were of absolute academic rigor.'
        },
        {
          name: 'Dr. Elena Santillán',
          origin: '🇪🇸 Madrid, Spain',
          date: 'Tour completed on August 02, 2026',
          stars: 5,
          comment: 'As an art history professor, I sought a tour free of invented myths. The guide’s deep academic knowledge and respectful grounding in colonial chronicles were extraordinary. Ten out of ten.'
        },
        {
          name: 'Michael & Sarah Jenkins',
          origin: '🇺🇸 Boston, USA',
          date: 'Tour completed on July 19, 2026',
          stars: 5,
          comment: 'The best tour we took in Peru! Small group, zero rush, crystal-clear audio receivers, and fascinating insights into Inca astronomy that you simply cannot get on standard commercial buses.'
        }
      ]
    },
    footer: {
      townName: 'Ancestral Cusco',
      regionalDir: 'DIRCETUR Cusco • Peru',
      officeTitle: 'Tourist Information Office',
      officeDesc: 'Portal de Panes N° 123, Plaza de Armas, Historic Center, Cusco',
      hoursTitle: 'Opening Hours',
      hoursDesc: 'Monday to Sunday, 08:00 AM to 08:00 PM (Continuous)',
      contactBtn: 'Chat with us on WhatsApp!',
      copyright: '© 2026 Cusco Creativos S.A.C. — Cultural & Heritage Edition. All rights reserved.'
    },
    mobileSticky: {
      tariffLabel: 'Cultural Fare',
      quote: 'Quote',
      reserve: 'Book'
    }
  },

  // ==========================================
  // FRANÇAIS (FR)
  // ==========================================
  fr: {
    emblemTitle: 'Qosqo Ancestral',
    emblemSub: "Patrimoine Culturel de l'Humanité",
    nav: {
      cronicas: 'Chroniques',
      agenda: 'Agenda',
      territorio: 'Territoire',
      itinerario: 'Itinéraire',
      conseils: 'Préparer sa Visite',
      guide: 'Médiateurs',
      reviews: "Livre d'or",
      contact: 'Bureau'
    },
    cta: {
      quote: 'Demander un devis',
      reserve: 'Réserver',
      whatsapp: 'WhatsApp',
      exploreTerritory: 'Explorer le Territoire',
      callOffice: 'Appeler le Bureau',
      writeWhatsApp: 'Écrire par WhatsApp'
    },
    heroSubtitleDefault: 'Entre montagnes sacrées et tradition millénaire, bienvenue dans la capitale archéologique des Amériques.',
    quickServices: [
      { icon: '🎫', label: 'Billet Touristique', sub: 'Accès Officiels' },
      { icon: '📜', label: 'Guide Diplômé', sub: 'DIRCETUR Officiel' },
      { icon: '🕯️', label: 'Cérémonies Andines', sub: 'Paiement à la Terre' },
      { icon: '🏛️', label: 'Temples & Palais', sub: 'Architecture Inca' },
      { icon: '📞', label: 'Assistance 24/7', sub: 'Horaires & Réservations' }
    ],
    actualites: {
      title: 'Actualités & Chroniques du Patrimoine',
      badgeFeatured: 'Saison 2026',
      featuredTitle: 'Un nouveau sentier balisé vers le cœur des temples incas',
      featuredDesc: 'Le circuit guidé sur les hauteurs sacrées de Cusco offre un panorama exceptionnel sur la cité impériale, les murailles cyclopéennes de Sacsayhuamán et les huacas rituelles.',
      readMore: 'Lire la suite / Réserver',
      btnAll: 'Toutes les actualités',
      items: [
        {
          id: 1,
          badge: 'Histoire & Archéologie',
          date: 'Saison 2026',
          title: 'Les secrets du Qorikancha et du Temple d’Or du Soleil',
          desc: 'Visite approfondie des fondations mégalithiques les plus parfaites de l’Empire Inca et de leur symbiose avec le couvent de Santo Domingo.',
          linkText: 'Lire la chronique du temple'
        },
        {
          id: 2,
          badge: 'Conservation & Murs',
          date: 'Patrimoine UNESCO',
          title: 'La pierre aux 12 angles et le palais d’Inca Roca',
          desc: 'Analyse architecturale in situ le long de la ruelle Hatun Rumiyoc avec des guides-historiens diplômés d’État de l’UNSAAC.',
          linkText: 'Voir les détails du parcours'
        },
        {
          id: 3,
          badge: 'Culture Vivante',
          date: 'Tradition Andine',
          title: 'Cérémonie d’offrande à la Pachamama & tissage ancestral',
          desc: 'Initiation à la cosmovision andine, aux trois mondes (Hanan, Kay, Uku Pacha) et aux teintures végétales naturelles des vallées.',
          linkText: 'Consulter les horaires'
        }
      ]
    },
    agenda: {
      title: 'Agenda Culturel',
      desc1: 'Tout au long de l’année, Cusco s’anime au rythme de ses célébrations sacrées : fêtes locales, balades historiques, célébrations ancestrales et visites guidées.',
      desc2: 'Retrouvez ici les prochaines dates à noter dans votre agenda pour vivre l’histoire en direct.',
      btnAll: 'TOUS LES ÉVÉNEMENTS',
      readMore: 'En savoir plus / Réserver',
      events: [
        {
          id: 'inti-raymi',
          date: '24 Juin 2026',
          badge: 'Solstice d’Hiver',
          title: 'Inti Raymi : La Grande Fête du Soleil',
          desc: 'Célébration millénaire à Sacsayhuamán avec plus de 700 acteurs en costumes d’époque revivant le tribut royal rendu au dieu Inti.'
        },
        {
          id: 'city-tour-ancestral',
          date: 'Départs Quotidiens Confirmés',
          badge: 'Matin & Après-midi',
          title: 'Circuit des 4 Temples : Qenqo & Puka Pukara',
          desc: 'Visite guidée des centres cérémoniels, dédales de calcaire et forteresses de contrôle militaire de l’empire.'
        }
      ]
    },
    territory: {
      title: 'Le Territoire Sacré',
      desc1: 'Entre traditions vivantes au pied de la montagne andine, Cusco séduit par son authenticité, ses temples sacrés et son cadre naturel préservé.',
      desc2: 'Grâce à la carte interactive, explorez les lieux emblématiques : Qorikancha, Sacsayhuamán, miradors de San Blas et sentiers historiques. Une façon simple et visuelle de mieux connaître le territoire inca.',
      btnMap: 'VOIR LA CARTE INTERACTIVE',
      badgeGps: 'GPS Cusco',
      cardTitle: 'Cartographie des Temples',
      places: [
        { num: 1, name: 'Qorikancha (Temple du Soleil)', altitude: '3 400 m' },
        { num: 2, name: 'Sacsayhuamán Mégalithique', altitude: '3 700 m' },
        { num: 3, name: 'Qenqo & Puka Pukara', altitude: '3 800 m' },
        { num: 4, name: 'Plaza de Armas & Cathédrale', altitude: 'Point Zéro' }
      ],
      tip: '💡 Cliquez pour ouvrir l’itinéraire direct dans votre application de navigation GPS.'
    },
    itinerary: {
      badge: 'Itinéraire Officiel DIRCETUR',
      title: 'Circuit Historique Étape par Étape',
      subtitle: 'Organisé avec des temps confortables pour la contemplation, la photographie et le récit historique.'
    },
    features: {
      defaultTitle: 'Ce qui est inclus dans l’expérience culturelle',
      defaultDesc: 'Prestation fournie selon les normes de qualité touristique officielle.'
    },
    conseils: {
      badge: 'Recommandations des Historiens',
      title: 'Préparer sa Visite : Ce qu’il faut emporter',
      subtitle: 'Pour apprécier le patrimoine dans les meilleures conditions de confort et de sécurité à 3 400 mètres d’altitude.',
      recommended: '✓ Recommandé',
      items: [
        {
          icon: '👟',
          title: 'Chaussures à bonne adhérence',
          subtitle: 'Sol pavé & escaliers incas',
          desc: 'Les dalles de Hatun Rumiyoc et les chemins de pierre de Sacsayhuamán sont polis par les siècles. Privilégiez des baskets de marche à semelle crantée.'
        },
        {
          icon: '☀️',
          title: 'Protection solaire maximale',
          subtitle: 'Indice UV d’altitude',
          desc: 'Sous le ciel limpide des Andes, la réverbération solaire est intense même par temps voilé. Chapeau à larges bords, lunettes UV400 et écran total indispensables.'
        },
        {
          icon: '💵',
          title: 'Espèces en Soles (PEN)',
          subtitle: 'Guichets & artisanat local',
          desc: 'Certains postes de contrôle archéologiques et les tisseuses traditionnelles ne disposent pas de terminal carte. Prévoyez 100 à 150 PEN en liquide.'
        },
        {
          icon: '🧥',
          title: 'Vêtements en plusieurs couches',
          subtitle: 'Climat thermique andin',
          desc: 'Le soleil chauffe à midi (20°C), mais dès 16h30 le vent frais souffle sur les crêtes de Sacsayhuamán (10°C). Prévoyez un pull chaud et une veste coupe-vent.'
        }
      ]
    },
    guides: {
      badge: 'Médiateurs du Patrimoine & Historiens Agréés',
      title: 'Vos Guides-Conférenciers Dédiés',
      subtitle: 'Tous nos guides sont archéologues ou historiens diplômés de l’Université San Antonio Abad (UNSAAC), titulaires du carnet officiel DIRCETUR et membres actifs du COLTUR Cusco.',
      activeStatus: '✓ Actif',
      list: [
        {
          id: 'lucia-condori',
          name: 'Lic. Lucía Condori',
          title: 'Votre Médiatrice du Patrimoine',
          role: 'Archéologue & Cosmovision Andine',
          cert: 'Carnet DIRCETUR N° 04821 • COLTUR Cusco',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
          quote: 'Transmettre la mémoire des pierres n’est pas une récitation de dates : c’est une immersion vivante dans la cosmogonie de nos ancêtres. Chaque temple que nous foulons raconte l’équilibre sacré entre l’homme et la Pachamama.',
          specs: [
            { icon: '🎓', label: 'Diplômée de l’UNSAAC Cusco' },
            { icon: '🗣️', label: 'Espagnol, Anglais et Français' },
            { icon: '🏛️', label: '12 ans d’expertise archéologique' },
            { icon: '🛡️', label: 'Secourisme & Altitude certifié' }
          ],
          directBtn: 'Échanger avec Lucía Condori',
          msgPrefix: 'Bonjour Lucía Condori, je souhaite des renseignements et disponibilités pour le circuit culturel'
        },
        {
          id: 'marco-quispe',
          name: 'Lic. Marco Antonio Quispe',
          title: 'Votre Historien de l’Architecture',
          role: 'Ingénierie Mégalithique & Sacsayhuamán',
          cert: 'Carnet DIRCETUR N° 03914 • COLTUR Cusco',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
          quote: 'L’architecture inca n’était pas seulement monumentale mais parasismique et sacrée. Analyser la taille des blocs de Sacsayhuamán sur place permet de comprendre le génie mathématique andin.',
          specs: [
            { icon: '🎓', label: 'Diplômé de l’UNSAAC Cusco' },
            { icon: '🗣️', label: 'Espagnol, Quechua et Français' },
            { icon: '🏛️', label: '15 ans de recherche mégalithique' },
            { icon: '🛡️', label: 'Accompagnateur Haute Montagne' }
          ],
          directBtn: 'Échanger avec Marco Quispe',
          msgPrefix: 'Bonjour Marco Antonio Quispe, je souhaite des renseignements et disponibilités pour le circuit culturel'
        },
        {
          id: 'carlos-valdivia',
          name: 'Mag. Carlos Eduardo Valdivia',
          title: 'Votre Spécialiste du Métissage',
          role: 'Histoire de l’Art Colonial & Qorikancha',
          cert: 'Carnet DIRCETUR N° 05128 • COLTUR Cusco',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
          quote: 'La rencontre entre les temples incas du Soleil et les arcades virreinales du couvent de Santo Domingo illustre le dialogue et la résistance culturelle de notre cité impériale.',
          specs: [
            { icon: '🎓', label: 'Master Histoire de l’Art (UNSAAC)' },
            { icon: '🗣️', label: 'Espagnol, Anglais et Italien' },
            { icon: '🏛️', label: '10 ans de guidage muséal & églises' },
            { icon: '🛡️', label: 'Guide-Conférencier Agréé' }
          ],
          directBtn: 'Échanger avec Carlos Valdivia',
          msgPrefix: 'Bonjour Carlos Eduardo Valdivia, je souhaite des renseignements et disponibilités pour le circuit culturel'
        }
      ]
    },
    livreDor: {
      badge: 'Avis Vérifiés des Visiteurs',
      title: 'Le Livre d’or du Patrimoine',
      subtitle: 'Témoignages de passionnés d’histoire, d’universitaires et de familles ayant vécu l’immersion culturelle à Cusco.',
      scoreOutOf: 'Sur 5.0',
      verifiedCount: '184 avis vérifiés',
      positiveRate: '✓ 100% Retours Positifs',
      certBadge: 'Certificat d’Excellence DIRCETUR',
      authenticatedBadge: 'Avis 100% Authentifiés par WhatsApp & Voucher',
      officialRegistry: 'Registre officiel des guides conférenciers du Pérou',
      reviews: [
        {
          name: 'Jean-Luc & Françoise Moreau',
          origin: '🇫🇷 Lyon, France',
          date: 'Visite effectuée le 14 Septembre 2026',
          stars: 5,
          comment: 'Une visite magistrale qui dépasse de loin tous les circuits conventionnels. Les explications sur l’ingénierie parasismique de Sacsayhuamán et la symbolique du temple du Soleil étaient d’une rigueur absolue. Un moment inoubliable.'
        },
        {
          name: 'Dra. Elena Santillán',
          origin: '🇪🇸 Madrid, Espagne',
          date: 'Visite effectuée le 02 Août 2026',
          stars: 5,
          comment: 'Como docente de historia del arte, buscaba un guiado sin mitos inventados. La preparación académica del guía y su respeto por las fuentes cronistas coloniales me pareció extraordinaria. Diez sobre diez.'
        },
        {
          name: 'Michael & Sarah Jenkins',
          origin: '🇺🇸 Boston, USA',
          date: 'Visite effectuée le 19 Juillet 2026',
          stars: 5,
          comment: 'The best tour we took in Peru! Small group, zero rush, crystal-clear audio receivers, and fascinating insights into Inca astronomy that you simply cannot get on standard commercial buses.'
        }
      ]
    },
    footer: {
      townName: 'Cusco Patrimonial',
      regionalDir: 'DIRCETUR Cusco • Pérou',
      officeTitle: 'Bureau d’Information Touristique',
      officeDesc: 'Portal de Panes N° 123, Plaza de Armas, Centre Historique, Cusco',
      hoursTitle: 'Horaires d’ouverture',
      hoursDesc: 'Du Lundi au Dimanche de 08h00 à 20h00 (En continu)',
      contactBtn: 'Contactez-nous sur WhatsApp !',
      copyright: '© 2026 Cusco Creativos S.A.C. — Édition Patrimoniale et Culturelle. Tous droits réservés.'
    },
    mobileSticky: {
      tariffLabel: 'Tarif Culturel',
      quote: 'Devis',
      reserve: 'Réserver'
    }
  },

  // ==========================================
  // PORTUGUÊS (PT)
  // ==========================================
  pt: {
    emblemTitle: 'Qosqo Ancestral',
    emblemSub: 'Patrimônio Cultural da Humanidade',
    nav: {
      cronicas: 'Crônicas',
      agenda: 'Agenda',
      territorio: 'Território',
      itinerario: 'Itinerário',
      conseils: 'O que Levar',
      guide: 'Historiadores',
      reviews: 'Livro de Ouro',
      contact: 'Escritório'
    },
    cta: {
      quote: 'Solicitar Orçamento',
      reserve: 'Reservar',
      whatsapp: 'WhatsApp',
      exploreTerritory: 'Explorar o Território',
      callOffice: 'Ligar para a Central',
      writeWhatsApp: 'Conversar no WhatsApp'
    },
    heroSubtitleDefault: 'Entre montanhas sagradas e tradição milenar, bem-vindo à capital arqueológica da América.',
    quickServices: [
      { icon: '🎫', label: 'Boleto Turístico', sub: 'Acessos Oficiais' },
      { icon: '📜', label: 'Guia Credenciado', sub: 'DIRCETUR Oficial' },
      { icon: '🕯️', label: 'Rituais Andinos', sub: 'Oferenda à Terra' },
      { icon: '🏛️', label: 'Templos & Palácios', sub: 'Arquitetura Inca' },
      { icon: '📞', label: 'Atendimento 24/7', sub: 'Horários & Reservas' }
    ],
    actualites: {
      title: 'Crônicas & Patrimônio',
      badgeFeatured: 'Temporada 2026',
      featuredTitle: 'Uma nova trilha sinalizada ao coração dos templos incas',
      featuredDesc: 'O circuito guiado às alturas sagradas de Cusco oferece vistas incomparáveis da cidade imperial, dos muros ciclópicos de Sacsayhuamán e das huacas cerimoniais.',
      readMore: 'Ler crônica / Reservar',
      btnAll: 'Todas as crônicas',
      items: [
        {
          id: 1,
          badge: 'História & Arqueologia',
          date: 'Temporada 2026',
          title: 'Segredos do Qorikancha e o Templo Dourado do Sol',
          desc: 'Um passeio guiado pelas fundações megalíticas mais perfeitas do Império Inca e sua fusão com o convento de Santo Domingo.',
          linkText: 'Ler crônica do templo'
        },
        {
          id: 2,
          badge: 'Preservação & Muralhas',
          date: 'Patrimônio UNESCO',
          title: 'A pedra dos 12 ângulos e o palácio de Inca Roca',
          desc: 'Análise arquitetônica na rua Hatun Rumiyoc com guias-historiadores formados pela Universidade San Antonio Abad.',
          linkText: 'Ver detalhes do roteiro'
        },
        {
          id: 3,
          badge: 'Cultura Viva',
          date: 'Tradição Andina',
          title: 'Cerimônia de oferenda à Pachamama & tecelagem ancestral',
          desc: 'Aprenda sobre a cosmovisão andina, os três mundos (Hanan, Kay, Uku Pacha) e as tinturas vegetais naturais dos vales.',
          linkText: 'Consultar horários'
        }
      ]
    },
    agenda: {
      title: 'Agenda Cultural',
      desc1: 'Durante todo o ano, Cusco vibra com suas celebrações sagradas: festas locais, caminhadas históricas, rituais ancestrais e visitas guiadas especializadas.',
      desc2: 'Confira as datas imperdíveis para organizar sua viagem e presenciar a história viva.',
      btnAll: 'TODOS OS EVENTOS',
      readMore: 'Ler mais / Reservar',
      events: [
        {
          id: 'inti-raymi',
          date: '24 de Junho de 2026',
          badge: 'Solstício de Inverno',
          title: 'Inti Raymi: A Grande Festa do Sol',
          desc: 'Celebração milenar em Sacsayhuamán com mais de 700 atores recriando o maior tributo imperial ao deus Inti.'
        },
        {
          id: 'city-tour-ancestral',
          date: 'Saídas Diárias Confirmadas',
          badge: 'Manhãs & Tardes',
          title: 'Circuito dos 4 Templos: Qenqo & Puka Pukara',
          desc: 'Visita guiada aos centros cerimoniais, labirintos de rocha calcária e fortalezas de controle militar inca.'
        }
      ]
    },
    territory: {
      title: 'O Território Sagrado',
      desc1: 'Entre tradições vivas ao pé das cordilheiras andinas, Cusco encanta pela autenticidade, templos sagrados e paisagens preservadas.',
      desc2: 'Através do mapa interativo, explore os pontos mais emblemáticos: Qorikancha, Sacsayhuamán, mirantes de San Blas e caminhos incas.',
      btnMap: 'VER MAPA INTERATIVO',
      badgeGps: 'GPS Cusco',
      cardTitle: 'Cartografia dos Templos',
      places: [
        { num: 1, name: 'Qorikancha (Templo do Sol)', altitude: '3.400 m' },
        { num: 2, name: 'Sacsayhuamán Megalítico', altitude: '3.700 m' },
        { num: 3, name: 'Qenqo & Puka Pukara', altitude: '3.800 m' },
        { num: 4, name: 'Plaza de Armas & Catedral', altitude: 'Ponto Zero' }
      ],
      tip: '💡 Clique para abrir a rota direta no seu aplicativo de navegação GPS.'
    },
    itinerary: {
      badge: 'Itinerário Oficial DIRCETUR',
      title: 'Roteiro Histórico Passo a Passo',
      subtitle: 'Planejado com tempo confortável para fotos, contemplação e explicação histórica aprofundada.'
    },
    features: {
      defaultTitle: 'O que está incluso na experiência cultural?',
      defaultDesc: 'Serviço prestado com padrões oficiais de qualidade turística.'
    },
    conseils: {
      badge: 'Recomendações dos Historiadores',
      title: 'Preparar a Visita: O que levar na mochila',
      subtitle: 'Para aproveitar o patrimônio com máximo conforto e segurança a 3.400 metros de altitude.',
      recommended: '✓ Recomendado',
      items: [
        {
          icon: '👟',
          title: 'Calçado com boa aderência',
          subtitle: 'Pedras polidas & escadarias',
          desc: 'As pedras de Hatun Rumiyoc e os caminhos de Sacsayhuamán foram polidos pelos séculos. Use calçados de caminhada com sola antiderrapante.'
        },
        {
          icon: '☀️',
          title: 'Proteção solar máxima',
          subtitle: 'Índice UV de altitude',
          desc: 'Sob o céu límpido dos Andes, os raios UV são muito intensos. Chapéu de abas largas, óculos UV400 e protetor solar são indispensáveis.'
        },
        {
          icon: '💵',
          title: 'Dinheiro em Soles (PEN)',
          subtitle: 'Bilheterias & artesanato',
          desc: 'Alguns postos arqueológicos e tecelãs tradicionais não aceitam cartão de crédito. Leve de 100 a 150 Soles em espécie.'
        },
        {
          icon: '🧥',
          title: 'Roupas em camadas',
          subtitle: 'Variação térmica andina',
          desc: 'O sol esquenta ao meio-dia (20°C), mas às 16h30 o vento frio começa a soprar em Sacsayhuamán (10°C). Traga um casaco corta-vento.'
        }
      ]
    },
    guides: {
      badge: 'Mediadores do Patrimônio & Historiadores Credenciados',
      title: 'Seus Guias-Historiadores Oficiais',
      subtitle: 'Todos os nossos guías são arqueólogos ou historiadores formados pela Universidade San Antonio Abad (UNSAAC), credenciados pela DIRCETUR e membros do COLTUR.',
      activeStatus: '✓ Ativo',
      list: [
        {
          id: 'lucia-condori',
          name: 'Lic. Lucía Condori',
          title: 'Sua Mediadora do Patrimônio',
          role: 'Arqueóloga & Cosmovisão Andina',
          cert: 'Credencial DIRCETUR N° 04821 • COLTUR Cusco',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
          quote: 'Transmitir a memória das pedras não é recitar datas: é uma imersão viva na cosmovisão dos nossos antepassados. Cada templo guarda o equilíbrio sagrado entre a humanidade e a Pachamama.',
          specs: [
            { icon: '🎓', label: 'Formada pela UNSAAC Cusco' },
            { icon: '🗣️', label: 'Espanhol, Inglês e Francês' },
            { icon: '🏛️', label: '12 anos de pesquisa arqueológica' },
            { icon: '🛡️', label: 'Primeiros Socorros & Altitude' }
          ],
          directBtn: 'Falar com Lucía Condori',
          msgPrefix: 'Olá Lucía Condori, gostaria de informações e disponibilidade para o passeio cultural'
        },
        {
          id: 'marco-quispe',
          name: 'Lic. Marco Antonio Quispe',
          title: 'Seu Historiador de Arquitetura',
          role: 'Engenharia Megalítica & Sacsayhuamán',
          cert: 'Credencial DIRCETUR N° 03914 • COLTUR Cusco',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
          quote: 'A arquitetura incaica não foi apenas monumental, mas sismorresistente e sagrada. Analisar o encaixe das pedras ciclópeas revela a impressionante genialidade andina.',
          specs: [
            { icon: '🎓', label: 'Formado pela UNSAAC Cusco' },
            { icon: '🗣️', label: 'Espanhol, Quechua e Francês' },
            { icon: '🏛️', label: '15 anos estudando muralhas' },
            { icon: '🛡️', label: 'Guia de Alta Montanha DIRCETUR' }
          ],
          directBtn: 'Falar com Marco Quispe',
          msgPrefix: 'Olá Marco Antonio Quispe, gostaria de informações e disponibilidade para o passeio cultural'
        },
        {
          id: 'carlos-valdivia',
          name: 'Mag. Carlos Eduardo Valdivia',
          title: 'Seu Especialista em Arte Colonial',
          role: 'História da Arte Andina & Qorikancha',
          cert: 'Credencial DIRCETUR N° 05128 • COLTUR Cusco',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
          quote: 'O encontro entre os templos incas do Sol e os claustros de Santo Domingo reflete o diálogo, resistência e mestiçagem artística da nossa capital imperial.',
          specs: [
            { icon: '🎓', label: 'Mestrado em Arte Andina (UNSAAC)' },
            { icon: '🗣️', label: 'Espanhol, Inglês e Italiano' },
            { icon: '🏛️', label: '10 anos em museus e igrejas' },
            { icon: '🛡️', label: 'Guia Conferencista Oficial' }
          ],
          directBtn: 'Falar com Carlos Valdivia',
          msgPrefix: 'Olá Carlos Eduardo Valdivia, gostaria de informações e disponibilidade para o passeio cultural'
        }
      ]
    },
    livreDor: {
      badge: 'Avaliações Verificadas de Viajantes',
      title: 'O Livro de Ouro do Patrimônio',
      subtitle: 'Relatos de apaixonados por história, professores e famílias que vivenciaram a imersão em Cusco.',
      scoreOutOf: 'De 5.0',
      verifiedCount: '184 avaliações verificadas',
      positiveRate: '✓ 100% Satisfação',
      certBadge: 'Certificado de Excelência DIRCETUR',
      authenticatedBadge: 'Avaliações 100% Autênticas por WhatsApp & Voucher',
      officialRegistry: 'Registro oficial de guias profissionais do Peru',
      reviews: [
        {
          name: 'Jean-Luc & Françoise Moreau',
          origin: '🇫🇷 Lyon, França',
          date: 'Passeio realizado em 14 de Setembro de 2026',
          stars: 5,
          comment: 'Uma visita magistral que supera qualquer tour convencional. As explicações sobre a engenharia antissísmica de Sacsayhuamán e os símbolos do Templo do Sol foram de absoluto rigor.'
        },
        {
          name: 'Dra. Elena Santillán',
          origin: '🇪🇸 Madri, Espanha',
          date: 'Passeio realizado em 02 de Agosto de 2026',
          stars: 5,
          comment: 'Como professora de história da arte, buscava um roteiro sem mitos inventados. O preparo acadêmico da guia e o respeito às crônicas coloniais foram admiráveis. Nota dez.'
        },
        {
          name: 'Michael & Sarah Jenkins',
          origin: '🇺🇸 Boston, EUA',
          date: 'Passeio realizado em 19 de Julho de 2026',
          stars: 5,
          comment: 'The best tour we took in Peru! Small group, zero rush, crystal-clear audio receivers, and fascinating insights into Inca astronomy that you simply cannot get on standard commercial buses.'
        }
      ]
    },
    footer: {
      townName: 'Cusco Patrimonial',
      regionalDir: 'DIRCETUR Cusco • Peru',
      officeTitle: 'Posto de Informações Turísticas',
      officeDesc: 'Portal de Panes N° 123, Plaza de Armas, Centro Histórico, Cusco',
      hoursTitle: 'Horário de Funcionamento',
      hoursDesc: 'De Segunda a Domingo, das 08:00 às 20:00 (Ininterrupto)',
      contactBtn: 'Fale conosco no WhatsApp!',
      copyright: '© 2026 Cusco Creativos S.A.C. — Edição Patrimonial e Cultural. Todos os direitos reservados.'
    },
    mobileSticky: {
      tariffLabel: 'Tarifa Cultural',
      quote: 'Orçamento',
      reserve: 'Reservar'
    }
  },

  // ==========================================
  // ITALIANO (IT)
  // ==========================================
  it: {
    emblemTitle: 'Qosqo Ancestrale',
    emblemSub: "Patrimonio Culturale dell'Umanità",
    nav: {
      cronicas: 'Cronache',
      agenda: 'Agenda',
      territorio: 'Territorio',
      itinerario: 'Itinerario',
      conseils: 'Cosa Portare',
      guide: 'Storici',
      reviews: "Libro d'Oro",
      contact: 'Ufficio'
    },
    cta: {
      quote: 'Richiedi Preventivo',
      reserve: 'Prenota',
      whatsapp: 'WhatsApp',
      exploreTerritory: 'Esplora il Territorio',
      callOffice: "Chiama l'Ufficio",
      writeWhatsApp: 'Scrivi su WhatsApp'
    },
    heroSubtitleDefault: 'Tra montagne sacre e tradizioni millenarie, benvenuto nella capitale archeologica delle Americhe.',
    quickServices: [
      { icon: '🎫', label: 'Biglietto Turistico', sub: 'Accessi Ufficiali' },
      { icon: '📜', label: 'Guida Abilitata', sub: 'Ufficiale DIRCETUR' },
      { icon: '🕯️', label: 'Cerimonie Andine', sub: 'Offerta alla Terra' },
      { icon: '🏛️', label: 'Templi & Palazzi', sub: 'Architettura Inca' },
      { icon: '📞', label: 'Assistenza 24/7', sub: 'Orari & Prenotazioni' }
    ],
    actualites: {
      title: 'Cronache & Patrimonio',
      badgeFeatured: 'Stagione 2026',
      featuredTitle: 'Un nuovo sentiero segnalato verso i templi inca',
      featuredDesc: 'Il circuito guidato sulle alture sacre di Cusco offre vedute impareggiabili sulla città imperiale, sui massi ciclopici di Sacsayhuamán e sulle huacas rituali.',
      readMore: 'Leggi cronaca / Prenota',
      btnAll: 'Tutte le cronache',
      items: [
        {
          id: 1,
          badge: 'Storia & Archeologia',
          date: 'Stagione 2026',
          title: 'I segreti del Qorikancha e del Tempio Dorato del Sole',
          desc: 'Un percorso guidato tra le fondamenta megalitiche più perfette dell’Impero Inca e la loro fusione con il convento di Santo Domingo.',
          linkText: 'Leggi cronaca del tempio'
        },
        {
          id: 2,
          badge: 'Conservazione & Mura',
          date: 'Patrimonio UNESCO',
          title: 'La pietra dei 12 angoli e il palazzo di Inca Roca',
          desc: 'Analisi architettonica in via Hatun Rumiyoc con guide storiche abilitate dell’Università San Antonio Abad.',
          linkText: 'Dettagli dell’itinerario'
        },
        {
          id: 3,
          badge: 'Cultura Viva',
          date: 'Tradizione Andina',
          title: 'Cerimonia di offerta alla Pachamama e tessitura ancestrale',
          desc: 'Scopri la cosmovisione andina, i tre mondi (Hanan, Kay, Uku Pacha) e le tinture vegetali naturali delle valli cusquene.',
          linkText: 'Consulta orari'
        }
      ]
    },
    agenda: {
      title: 'Agenda Culturale',
      desc1: 'Durante tutto l’anno, Cusco palpita al ritmo delle sue cerimonie sacre: celebrazioni locali, camminate storiche e visite guidate con studiosi.',
      desc2: 'Scopri le prossime date da segnare sul calendario per vivere la storia viva in diretta.',
      btnAll: 'TUTTI GLI EVENTI',
      readMore: 'Scopri di più / Prenota',
      events: [
        {
          id: 'inti-raymi',
          date: '24 Giugno 2026',
          badge: 'Solstizio d’Inverno',
          title: 'Inti Raymi: La Grande Festa del Sole',
          desc: 'Celebrazione millenaria a Sacsayhuamán con oltre 700 attori in scena che rievocano il tributo sacro al dio Inti.'
        },
        {
          id: 'city-tour-ancestral',
          date: 'Partenze Giornaliere Confermate',
          badge: 'Mattine & Pomeriggi',
          title: 'Circuito dei 4 Templi: Qenqo & Puka Pukara',
          desc: 'Visita guidata ai centri cerimoniali, labirinti di roccia calcarea e fortezze di controllo militare dell’impero.'
        }
      ]
    },
    territory: {
      title: 'Il Territorio Sacro',
      desc1: 'Tra tradizioni vive ai piedi delle vette andine, Cusco affascina per autenticità, templi sacri e paesaggi naturali incontaminati.',
      desc2: 'Attraverso la mappa interattiva, esplora i luoghi più emblematici: Qorikancha, Sacsayhuamán, punti panoramici di San Blas e sentieri inca.',
      btnMap: 'VEDI MAPPA INTERATTIVA',
      badgeGps: 'GPS Cusco',
      cardTitle: 'Cartografia dei Templi',
      places: [
        { num: 1, name: 'Qorikancha (Tempio del Sole)', altitude: '3.400 m' },
        { num: 2, name: 'Sacsayhuamán Megalitica', altitude: '3.700 m' },
        { num: 3, name: 'Qenqo & Puka Pukara', altitude: '3.800 m' },
        { num: 4, name: 'Plaza de Armas & Cattedrale', altitude: 'Punto Zero' }
      ],
      tip: '💡 Clicca per aprire il percorso diretto nell’applicazione GPS del tuo smartphone.'
    },
    itinerary: {
      badge: 'Itinerario Ufficiale DIRCETUR',
      title: 'Percorso Storico Passo dopo Passo',
      subtitle: 'Organizzato con tempi ampi per la contemplazione fotografica e l’approfondimento storico.'
    },
    features: {
      defaultTitle: 'Cosa è incluso nell’esperienza culturale?',
      defaultDesc: 'Servizio offerto con elevati standard di qualità turistica ufficiale.'
    },
    conseils: {
      badge: 'Consigli degli Storici',
      title: 'Preparare la Visita: Cosa portare nello zaino',
      subtitle: 'Per apprezzare il patrimonio nelle migliori condizioni di comfort e sicurezza a 3.400 metri di altitudine.',
      recommended: '✓ Consigliato',
      items: [
        {
          icon: '👟',
          title: 'Calzature con ottima aderenza',
          subtitle: 'Pavimento in pietra & scale inca',
          desc: 'Le lastre di Hatun Rumiyoc e i sentieri di Sacsayhuamán sono levigati dai secoli. Scegli scarpe da trekking o da ginnastica con suola antiscivolo.'
        },
        {
          icon: '☀️',
          title: 'Protezione solare andina',
          subtitle: 'Radiazione UV d’altitudine',
          desc: 'Sotto il cielo limpido delle Ande, i raggi UV sono intensi anche col tempo velato. Cappello a tesa larga, occhiali UV400 e crema solare sono indispensabili.'
        },
        {
          icon: '💵',
          title: 'Contanti in Soles (PEN)',
          subtitle: 'Biglietterie & artigianato',
          desc: 'Alcune biglietterie dei parchi archeologici e le tessitrici tradizionali non dispongono di POS. Consigliamo di portare 100-150 Soles in contanti.'
        },
        {
          icon: '🧥',
          title: 'Abbigliamento a strati',
          subtitle: 'Escursione termica andina',
          desc: 'Il sole scalda a mezzogiorno (20°C), ma dalle 16:30 il vento fresco soffia sulle alture di Sacsayhuamán (10°C). Porta una giacca a vento e un maglione caldo.'
        }
      ]
    },
    guides: {
      badge: 'Mediatori del Patrimonio & Storici Abilitati',
      title: 'Le Tue Guide Ufficiali Dedicate',
      subtitle: 'Tutte le nostre guide sono archeologi o storici laureati presso l’Università San Antonio Abad (UNSAAC), con patentino ufficiale DIRCETUR e iscrizione al COLTUR.',
      activeStatus: '✓ Abilitato',
      list: [
        {
          id: 'lucia-condori',
          name: 'Lic. Lucía Condori',
          title: 'La Tua Mediatrice del Patrimonio',
          role: 'Archeologa & Cosmovisione Andina',
          cert: 'Patentino DIRCETUR N° 04821 • COLTUR Cusco',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
          quote: 'Trasmettere la memoria delle pietre non significa recitare date: è un’immersione viva nella cosmogonia dei nostri antenati. Ogni tempio che varchiamo racconta l’equilibrio sacro tra l’uomo e la Pachamama.',
          specs: [
            { icon: '🎓', label: 'Laureata presso UNSAAC Cusco' },
            { icon: '🗣️', label: 'Spagnolo, Inglese e Francese' },
            { icon: '🏛️', label: '12 anni di attività archeologica' },
            { icon: '🛡️', label: 'Primo Soccorso & Altitudine' }
          ],
          directBtn: 'Contatta Lucía Condori',
          msgPrefix: 'Buongiorno Lucía Condori, desidero informazioni e disponibilità per il tour culturale'
        },
        {
          id: 'marco-quispe',
          name: 'Lic. Marco Antonio Quispe',
          title: 'Il Tuo Storico dell’Architettura',
          role: 'Ingegneria Megalitica & Sacsayhuamán',
          cert: 'Patentino DIRCETUR N° 03914 • COLTUR Cusco',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
          quote: 'L’architettura inca non fu soltanto imponente, ma antisismica e sacra. Analizzare l’incastro dei blocchi ciclopici sul posto permette di cogliere il genio matematico andino.',
          specs: [
            { icon: '🎓', label: 'Laureato presso UNSAAC Cusco' },
            { icon: '🗣️', label: 'Spagnolo, Quechua e Francese' },
            { icon: '🏛️', label: '15 anni nello studio megalitico' },
            { icon: '🛡️', label: 'Guida d’Alta Montagna DIRCETUR' }
          ],
          directBtn: 'Contatta Marco Quispe',
          msgPrefix: 'Buongiorno Marco Antonio Quispe, desidero informazioni e disponibilità per il tour culturale'
        },
        {
          id: 'carlos-valdivia',
          name: 'Mag. Carlos Eduardo Valdivia',
          title: 'Il Tuo Specialista in Arte Coloniale',
          role: 'Storia dell’Arte Andina & Qorikancha',
          cert: 'Patentino DIRCETUR N° 05128 • COLTUR Cusco',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
          quote: 'L’incontro tra i templi inca del Sole e le arcate vicereali del convento di Santo Domingo illustra il dialogo, la resistenza e la sintesi artistica della nostra città imperiale.',
          specs: [
            { icon: '🎓', label: 'Master Storia dell’Arte (UNSAAC)' },
            { icon: '🗣️', label: 'Spagnolo, Inglese e Italiano' },
            { icon: '🏛️', label: '10 anni in musei e complessi sacri' },
            { icon: '🛡️', label: 'Guida Ufficiale Abilitata' }
          ],
          directBtn: 'Contatta Carlos Valdivia',
          msgPrefix: 'Buongiorno Carlos Eduardo Valdivia, desidero informazioni e disponibilità per il tour culturale'
        }
      ]
    },
    livreDor: {
      badge: 'Recensioni Verificate dei Viaggiatori',
      title: 'Il Libro d’Oro del Patrimonio',
      subtitle: 'Testimonianze di appassionati di storia, docenti e famiglie che hanno vissuto l’immersione culturale a Cusco.',
      scoreOutOf: 'Su 5.0',
      verifiedCount: '184 recensioni verificate',
      positiveRate: '✓ 100% Soddisfazione',
      certBadge: 'Certificato di Eccellenza DIRCETUR',
      authenticatedBadge: 'Recensioni 100% Autenticate via WhatsApp & Voucher',
      officialRegistry: 'Registro ufficiale guide professionali del Perù',
      reviews: [
        {
          name: 'Jean-Luc & Françoise Moreau',
          origin: '🇫🇷 Lione, Francia',
          date: 'Visita effettuata il 14 Settembre 2026',
          stars: 5,
          comment: 'Una visita magistrale che supera qualsiasi tour convenzionale. Le spiegazioni sull’ingegneria antisismica di Sacsayhuamán e sulla simbologia del Tempio del Sole sono state di assoluto rigore.'
        },
        {
          name: 'Dra. Elena Santillán',
          origin: '🇪🇸 Madrid, Spagna',
          date: 'Visita effettuata il 02 Agosto 2026',
          stars: 5,
          comment: 'Come docente di storia dell’arte, cercavo una guida priva di miti inventati. La preparazione accademica della guida e il suo rispetto per le fonti coloniali sono stati straordinari. Dieci e lode.'
        },
        {
          name: 'Michael & Sarah Jenkins',
          origin: '🇺🇸 Boston, USA',
          date: 'Visita effettuata il 19 Luglio 2026',
          stars: 5,
          comment: 'The best tour we took in Peru! Small group, zero rush, crystal-clear audio receivers, and fascinating insights into Inca astronomy that you simply cannot get on standard commercial buses.'
        }
      ]
    },
    footer: {
      townName: 'Cusco Patrimoniale',
      regionalDir: 'DIRCETUR Cusco • Perù',
      officeTitle: 'Ufficio Informazioni Turistiche',
      officeDesc: 'Portal de Panes N° 123, Plaza de Armas, Centro Storico, Cusco',
      hoursTitle: 'Orari di Apertura',
      hoursDesc: 'Dal Lunedì alla Domenica, dalle 08:00 alle 20:00 (Continuato)',
      contactBtn: 'Contattaci su WhatsApp!',
      copyright: '© 2026 Cusco Creativos S.A.C. — Edizione Patrimoniale e Culturale. Tutti i diritti riservati.'
    },
    mobileSticky: {
      tariffLabel: 'Tariffa Culturale',
      quote: 'Preventivo',
      reserve: 'Prenota'
    }
  }
};
