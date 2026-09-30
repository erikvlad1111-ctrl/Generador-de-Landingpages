import { LanguageType } from '@/types/landing';

export interface PremiumI18nTexts {
  nav: {
    experience: string;
    tours: string;
    sensory: string;
    specs: string;
    amenities: string;
    concierge: string;
    lounge: string;
  };
  cta: {
    whatsapp: string;
    quote: string;
    bookNow: string;
    viewItinerary: string;
    inquireDates: string;
  };
  hero: {
    badge: string;
    defaultTitle: string;
    defaultSubtitle: string;
    privateConciergeBadge: string;
    verifiedOperator: string;
  };
  sensory: {
    badge: string;
    title: string;
    subtitle: string;
    cards: Array<{
      title: string;
      tag: string;
      desc: string;
    }>;
  };
  specs: {
    badge: string;
    title: string;
    subtitle: string;
    altitudeLabel: string;
    durationLabel: string;
    vehicleLabel: string;
    groupLabel: string;
    audienceLabel: string;
    hotelLabel: string;
  };
  amenities: {
    badge: string;
    title: string;
    subtitle: string;
    defaultServices: string[];
  };
  concierge: {
    badge: string;
    title: string;
    subtitle: string;
    hostLabel: string;
    directLine: string;
    credentials: string;
    languagesLabel: string;
    languagesValue: string;
    consultNow: string;
  };
  lounge: {
    badge: string;
    title: string;
    subtitle: string;
    amenity1: { title: string; desc: string };
    amenity2: { title: string; desc: string };
    amenity3: { title: string; desc: string };
    amenity4: { title: string; desc: string };
    locationTitle: string;
    locationDesc: string;
  };
  reviews: {
    badge: string;
    title: string;
    subtitle: string;
    verifiedGuest: string;
    confirmedTour: string;
  };
  footer: {
    rights: string;
    dirceturCert: string;
    safeTravels: string;
    sanctuaryProtected: string;
    complaintsBook: string;
    terms: string;
    cancellation: string;
    privacy: string;
    brandDesc: string;
    officeTitle: string;
    officeDesc: string;
    hoursTitle: string;
    hoursDesc: string;
    paymentsTitle: string;
  };
}

export const PREMIUM_LANGUAGES: Array<{ code: LanguageType; label: string; flag: string }> = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' }
];

export const PREMIUM_I18N: Record<LanguageType, PremiumI18nTexts> = {
  // ==========================================
  // ESPAÑOL (ES)
  // ==========================================
  es: {
    nav: {
      experience: 'La Experiencia',
      tours: 'Nuestros Tours',
      sensory: 'Momentos VIP',
      specs: 'Ficha Técnica',
      amenities: 'Amenidades',
      concierge: 'Concierge',
      lounge: 'Salón VIP'
    },
    cta: {
      whatsapp: 'Reserva VIP',
      quote: 'Solicitar Cotización',
      bookNow: 'Reservar Lugar',
      viewItinerary: 'Ver Itinerario',
      inquireDates: 'Consultar Disponibilidad VIP'
    },
    hero: {
      badge: 'Experiencia Exclusiva VIP • Cusco & Machu Picchu',
      defaultTitle: 'Machu Picchu VIP con Tren Panorámico',
      defaultSubtitle: 'Descubre la maravilla del mundo con traslados privados, tren panorámico de primera clase, alta gastronomía andina y conserjería personalizada.',
      privateConciergeBadge: 'Conserjería Privada & Expediciones',
      verifiedOperator: 'Operador Oficial Autorizado DIRCETUR'
    },
    sensory: {
      badge: 'Momentos Inolvidables',
      title: 'Una Colección de Sensaciones Andinas',
      subtitle: 'Cada instante de la travesía está pensado para deleitar tus sentidos con absoluta privacidad.',
      cards: [
        {
          title: 'Amanecer Dorado en la Ciudadela',
          tag: 'Acceso Matutino Preferencial',
          desc: 'Ingreso en el primer turno para admirar la bruma disipándose sobre las terrazas incas en silencio y sin multitudes.'
        },
        {
          title: 'Tren Panorámico & Brindis Andino',
          tag: 'Observatorio Hiram Bingham / Vistadome',
          desc: 'Copa de espumante o cóctel de bienvenida mientras la cordillera sagrada desfila frente a cúpulas acristaladas.'
        },
        {
          title: 'Alta Gastronomía Orgánica',
          tag: 'Menú Degustación de Autor',
          desc: 'Sabores ancestrales reinterpretados por chefs de vanguardia en casonas coloniales o al aire libre en el Valle.'
        },
        {
          title: 'Mística, Historia & Alpacas Reales',
          tag: 'Cultura Viva & Textiles Finos',
          desc: 'Encuentros privados con maestros artesanos cusqueños y crianza de alpacas y vicuñas en su hábitat natural.'
        }
      ]
    },
    specs: {
      badge: 'Especificaciones de la Expedición',
      title: 'Ficha Técnica & Parámetros VIP',
      subtitle: 'Garantizamos los más altos estándares de comodidad, seguridad y exclusividad.',
      altitudeLabel: 'Altitud Máxima',
      durationLabel: 'Duración Recomendada',
      vehicleLabel: 'Vehículo Oficial Asignado',
      groupLabel: 'Modalidad de Grupo',
      audienceLabel: 'Perfil de Viajero',
      hotelLabel: 'Hoteles Sugeridos'
    },
    amenities: {
      badge: 'Todo Incluido Signature',
      title: 'Servicios & Privilegios Exclusivos',
      subtitle: 'Una travesía con cero preocupaciones: cada detalle operativo está resuelto con excelencia.',
      defaultServices: [
        'Transporte turístico privado de alta gama (SUV o Sprinter ejecutiva climatizada con chofer profesional)',
        'Boletos de ingreso preferenciales y completos a todos los recintos arqueológicos y monumentos',
        'Tren panorámico de primera clase (Hiram Bingham de Belmond o Vistadome Observatory con servicio a bordo)',
        'Guía oficial historiador colegiado bilingüe dedicado exclusivamente a tu grupo sin apuros',
        'Gastronomía de autor: almuerzo gourmet de tiempos con maridaje o experiencia culinaria privada',
        'Protocolo de altitud: balón de oxígeno medicinal de emergencia, oxímetro de pulso y botiquín de altura',
        'Pick-up y drop-off de puerta a puerta en el lobby de tu hotel o villa en Cusco o Valle Sagrado',
        'Kit de bienvenida andino con amenidades selectas y servicio de conserjería personalizada 24/7'
      ]
    },
    concierge: {
      badge: 'Atención Personalizada 24/7',
      title: 'Tu Guía Historiador & Concierge Privado',
      subtitle: 'Un anfitrión local acreditado que cuidará de cada solicitud antes, durante y después de tu viaje.',
      hostLabel: 'Tu Anfitrión & Especialista Asignado',
      directLine: 'Línea Directa de Conserjería',
      credentials: 'Acreditado por DIRCETUR Cusco • Primeros Auxilios en Zonas Remotas',
      languagesLabel: 'Idiomas del Guía',
      languagesValue: 'Español, English & Français con fluidez profesional',
      consultNow: 'Hablar con el Concierge por WhatsApp'
    },
    lounge: {
      badge: 'Hospitalidad en el Centro Histórico',
      title: 'Salón VIP & Punto de Encuentro en Cusco',
      subtitle: 'Una casona colonial restaurada a pasos de la Plaza de Armas reservada exclusivamente para nuestros huéspedes.',
      amenity1: { title: 'Bar de Infusiones & Café Andino', desc: 'Variedad de tés de hierbas andinas, café orgánico de quillabamba y maridaje ligero.' },
      amenity2: { title: 'Custodia Blindada de Equipaje', desc: 'Guarda tus maletas pesadas con total tranquilidad durante tus excursiones.' },
      amenity3: { title: 'Wi-Fi de Alta Velocidad & Carga', desc: 'Espacios de descanso equipados con conectividad de fibra óptica.' },
      amenity4: { title: 'Oxigenoterapia Preventiva', desc: 'Cabina climatizada para favorecer una aclimatación confortable a 3,400 msnm.' },
      locationTitle: 'Ubicación de Nuestra Casona',
      locationDesc: 'Calle Triunfo N° 392, a 150m de la Catedral de Cusco. Acceso directo con vehículo privado.'
    },
    reviews: {
      badge: 'Testimonios & Reseñas Verificadas',
      title: 'Huéspedes Satisfechos & Opiniones',
      subtitle: 'Impresiones y comentarios de viajeros que recorrieron Cusco y Machu Picchu bajo nuestra atención personalizada.',
      verifiedGuest: 'Huésped Signature',
      confirmedTour: 'Experiencia Confirmada'
    },
    footer: {
      rights: '© 2026 Cusco Creativos VIP Collection. Todos los derechos reservados.',
      dirceturCert: 'Operador Registrado DIRCETUR Cusco N° CC-VIP-2026',
      safeTravels: 'Certificación Internacional Safe Travels',
      sanctuaryProtected: 'Patrimonio Protegido UNESCO • Machu Picchu',
      complaintsBook: 'Libro de Reclamaciones Virtual',
      terms: 'Términos y Condiciones VIP',
      cancellation: 'Políticas de Cancelación & Reembolso',
      privacy: 'Protección de Datos Personales (Ley 29733)',
      brandDesc: 'Colección de viajes privados de alta gama, trenes panorámicos de primera clase y concierge exclusivo 24/7 en Cusco y Machu Picchu.',
      officeTitle: 'Concierge Central & Sala VIP',
      officeDesc: 'Portal de Carnicerías 234, Centro Histórico, Cusco - Perú',
      hoursTitle: 'Atención Ininterrumpida',
      hoursDesc: 'Lunes a Domingo • Asistencia Privada 24 Horas',
      paymentsTitle: 'Métodos de Pago Internacionales'
    }
  },

  // ==========================================
  // ENGLISH (EN)
  // ==========================================
  en: {
    nav: {
      experience: 'The Experience',
      tours: 'Our Tours',
      sensory: 'VIP Moments',
      specs: 'Specifications',
      amenities: 'Amenities',
      concierge: 'Concierge',
      lounge: 'VIP Lounge'
    },
    cta: {
      whatsapp: 'Book VIP',
      quote: 'Request Quote',
      bookNow: 'Reserve Spot',
      viewItinerary: 'View Itinerary',
      inquireDates: 'Check VIP Availability'
    },
    hero: {
      badge: 'Exclusive VIP Experience • Cusco & Machu Picchu',
      defaultTitle: 'Luxury Machu Picchu with Scenic Panoramic Train',
      defaultSubtitle: 'Discover the world wonder with private executive transfers, luxury panoramic railway carriage, signature Andean cuisine, and dedicated 24/7 concierge.',
      privateConciergeBadge: 'Private Concierge & Expeditions',
      verifiedOperator: 'DIRCETUR Official Authorized Luxury Operator'
    },
    sensory: {
      badge: 'Unforgettable Highlights',
      title: 'A Collection of Andean Sensations',
      subtitle: 'Every segment of your journey is crafted for serene indulgence and complete privacy.',
      cards: [
        {
          title: 'Golden Sunrise at the Citadel',
          tag: 'Priority Morning Access',
          desc: 'First entry shift to witness morning mist lifting softly over Inca stone terraces in tranquil silence without crowds.'
        },
        {
          title: 'Panoramic Train & Andean Toast',
          tag: 'Belmond Hiram Bingham / Vistadome',
          desc: 'Fine sparkling wine or craft pisco sour as snowcapped peaks glide past crystal glass observatory domes.'
        },
        {
          title: 'Organic Signature Gastronomy',
          tag: 'Curated Tasting Menu',
          desc: 'Ancient Andean ingredients reimagined by visionary chefs in historic courtyards or scenic private pavilions.'
        },
        {
          title: 'Living History & Fine Alpaca Wool',
          tag: 'Living Heritage & Master Weavers',
          desc: 'Private encounters with master Andean textile artists and encounters with graceful alpacas and vicuñas in their natural habitat.'
        }
      ]
    },
    specs: {
      badge: 'Expedition Parameters',
      title: 'Technical Specifications & VIP Sheet',
      subtitle: 'We guarantee the highest standards of safety, personal comfort, and exclusivity across Peru.',
      altitudeLabel: 'Maximum Altitude',
      durationLabel: 'Recommended Duration',
      vehicleLabel: 'Assigned Executive Vehicle',
      groupLabel: 'Group Arrangement',
      audienceLabel: 'Guest Profile',
      hotelLabel: 'Suggested Luxury Lodges'
    },
    amenities: {
      badge: 'Signature All-Inclusive',
      title: 'Privileges & Exclusive Inclusions',
      subtitle: 'A seamless journey with zero worries: every detail handled with peerless excellence.',
      defaultServices: [
        'Private luxury SUV or executive Mercedes Sprinter with professional accredited chauffeur',
        'Preferential full entry tickets to all archaeological sanctuaries, temples, and historic landmarks',
        'First-class scenic panoramic train tickets (Belmond Hiram Bingham or Vistadome Observatory with catering)',
        'Private licensed historian tour guide dedicated exclusively to your party with relaxed timing',
        'Multi-course signature gourmet dining experience with organic wine pairing in Cusco and Sacred Valley',
        'Comprehensive altitude protocol: medical oxygen tank, pulse oximeter, and wilderness first aid kit on board',
        'Door-to-door private pickup and drop-off at your hotel or private villa lobby in Cusco or the Sacred Valley',
        'Luxury Andean welcome gift set and around-the-clock dedicated private concierge coordinator 24/7'
      ]
    },
    concierge: {
      badge: '24/7 Personalized Hospitality',
      title: 'Your Private Historian Guide & Concierge',
      subtitle: 'A dedicated, certified local specialist taking care of every wish before, during, and after your journey.',
      hostLabel: 'Your Assigned Private Concierge Host',
      directLine: 'Direct Concierge Line',
      credentials: 'DIRCETUR Cusco Certified • Wilderness First Aid & High-Altitude Specialist',
      languagesLabel: 'Spoken Languages',
      languagesValue: 'Fluent English, Spanish & French with professional expertise',
      consultNow: 'Chat with Concierge on WhatsApp'
    },
    lounge: {
      badge: 'Historic Center Hospitality',
      title: 'VIP Lounge & Welcome Hub in Cusco',
      subtitle: 'A restored Spanish colonial manor steps from Plaza de Armas reserved exclusively for our private guests.',
      amenity1: { title: 'Artisanal Herbal Bar & Andean Coffee', desc: 'Select organic highland infusions, fresh Quillabamba espresso, and light paired delicacies.' },
      amenity2: { title: 'Secure Guarded Luggage Vault', desc: 'Store your primary luggage safely with 24/7 security while you venture to Machu Picchu.' },
      amenity3: { title: 'High-Speed Fiber Wi-Fi & Charging', desc: 'Private lounge suites equipped with ultra-fast connectivity and international adapters.' },
      amenity4: { title: 'Preventive Altitude Care', desc: 'Climate-controlled acclimatization room with medical oxygen to ensure effortless comfort at 3,400m.' },
      locationTitle: 'Our Private Manor Location',
      locationDesc: 'Calle Triunfo 392, 150m from Cusco Cathedral. Seamless private vehicle drop-off at entrance.'
    },
    reviews: {
      badge: 'Verified Reviews & Testimonials',
      title: 'Traveler Experiences & Praise',
      subtitle: 'Verified impressions from private guests who explored Cusco and Machu Picchu with our specialized concierge.',
      verifiedGuest: 'Signature Guest',
      confirmedTour: 'Confirmed Tour'
    },
    footer: {
      rights: '© 2026 Cusco Creativos VIP Collection. All rights reserved.',
      dirceturCert: 'DIRCETUR Cusco Registered Luxury Tour Operator N° CC-VIP-2026',
      safeTravels: 'Safe Travels Global Seal of Approval',
      sanctuaryProtected: 'UNESCO World Heritage Sanctuary • Machu Picchu',
      complaintsBook: 'Virtual Complaints & Claims Book',
      terms: 'VIP Terms and Conditions',
      cancellation: 'Cancellation & Refund Policies',
      privacy: 'Personal Data Protection (Law 29733)',
      brandDesc: 'Exclusive private luxury journeys, first-class observatory train passes, and dedicated 24/7 concierge across Cusco & Machu Picchu.',
      officeTitle: 'Central Concierge & VIP Lounge',
      officeDesc: 'Portal de Carnicerías 234, Historic Center, Cusco - Peru',
      hoursTitle: 'Around-the-Clock Support',
      hoursDesc: 'Monday to Sunday • 24/7 Private Assistance',
      paymentsTitle: 'International Secure Payments'
    }
  },

  // ==========================================
  // PORTUGUÊS (PT)
  // ==========================================
  pt: {
    nav: {
      experience: 'A Experiência',
      tours: 'Nossos Tours',
      sensory: 'Momentos VIP',
      specs: 'Ficha Técnica',
      amenities: 'Comodidades',
      concierge: 'Concierge',
      lounge: 'Salão VIP'
    },
    cta: {
      whatsapp: 'Reserva VIP',
      quote: 'Pedir Orçamento',
      bookNow: 'Garantir Vaga',
      viewItinerary: 'Ver Itinerário',
      inquireDates: 'Consultar Disponibilidade VIP'
    },
    hero: {
      badge: 'Experiência VIP Exclusiva • Cusco & Machu Picchu',
      defaultTitle: 'Machu Picchu VIP com Trem Panorâmico',
      defaultSubtitle: 'Descubra a maravilha do mundo com traslados privativos, trem panorâmico de primeira classe, alta gastronomia andina e concierge dedicado.',
      privateConciergeBadge: 'Concierge Privativo & Expedições',
      verifiedOperator: 'Operador Oficial Autorizado DIRCETUR'
    },
    sensory: {
      badge: 'Momentos Inesquecíveis',
      title: 'Uma Coleção de Sensações Andinas',
      subtitle: 'Cada instante da viagem foi planejado para encantar seus sentidos com total privacidade.',
      cards: [
        {
          title: 'Amanhecer Dourado na Cidadela',
          tag: 'Acesso Matutino Preferencial',
          desc: 'Entrada no primeiro turno para apreciar a névoa se dissipando sobre os terraços incas em silêncio e sem multidões.'
        },
        {
          title: 'Trem Panorâmico & Brinde Andino',
          tag: 'Observatório Hiram Bingham / Vistadome',
          desc: 'Espumante ou coquetel de boas-vindas enquanto as montanhas sagradas desfilam diante de tetos envidraçados.'
        },
        {
          title: 'Alta Gastronomia Orgânica',
          tag: 'Menu Degustação de Autor',
          desc: 'Sabores ancestrais reinterpretados por chefs renomados em casarões coloniais ou em cenários campestres no Vale.'
        },
        {
          title: 'História Viva & Alpacas Reais',
          tag: 'Cultura Viva & Tecelagem Fina',
          desc: 'Encontros exclusivos com mestres tecelões e observação de alpacas e vicunhas em seu habitat natural.'
        }
      ]
    },
    specs: {
      badge: 'Especificações da Expedição',
      title: 'Ficha Técnica & Parâmetros VIP',
      subtitle: 'Garantimos os mais elevados padrões de conforto, segurança e exclusividade no Peru.',
      altitudeLabel: 'Altitude Máxima',
      durationLabel: 'Duração Recomendada',
      vehicleLabel: 'Veículo Privativo Alocado',
      groupLabel: 'Modalidade de Grupo',
      audienceLabel: 'Perfil de Viajante',
      hotelLabel: 'Hotéis Sugeridos'
    },
    amenities: {
      badge: 'Tudo Incluso Signature',
      title: 'Serviços & Privilégios Exclusivos',
      subtitle: 'Uma jornada com zero preocupações: cada detalhe logístico é resolvido com excelência.',
      defaultServices: [
        'Transporte turístico privativo de luxo (SUV ou van executiva com motorista profissional)',
        'Ingressos preferenciais completos para todos os santuários arqueológicos e templos sagrados',
        'Passagens de trem panorâmico de primeira classe (Belmond Hiram Bingham ou Vistadome Observatory)',
        'Guia oficial historiador credenciado bilingue dedicado com exclusividade ao seu grupo',
        'Gastronomia de autor: almoço degustação com harmonização de vinhos orgânicos nos vales',
        'Protocolo de altitude: balão de oxigênio medicinal, oxímetro de pulso e kit de primeiros socorros',
        'Embarque e desembarque de porta a porta no lobby do seu hotel ou villa em Cusco e Vale Sagrado',
        'Kit de boas-vindas com mimos andinos e assistência dedicada de concierge 24 horas por dia'
      ]
    },
    concierge: {
      badge: 'Atendimento Personalizado 24/7',
      title: 'Seu Guia Historiador & Concierge Privativo',
      subtitle: 'Um especialista local credenciado para cuidar de todas as suas solicitações antes, durante e após o passeio.',
      hostLabel: 'Seu Anfitrião & Especialista Designado',
      directLine: 'Linha Direta de Concierge',
      credentials: 'Credenciado DIRCETUR Cusco • Especialista em Aclimatação e Zonas Remotas',
      languagesLabel: 'Idiomas do Guia',
      languagesValue: 'Português, Espanhol & Inglês fluentes com excelência',
      consultNow: 'Falar com o Concierge no WhatsApp'
    },
    lounge: {
      badge: 'Hospitalidade no Centro Histórico',
      title: 'Salão VIP & Ponto de Encontro em Cusco',
      subtitle: 'Um casarão colonial restaurado a poucos passos da Plaza de Armas reservado exclusivamente aos nossos hóspedes.',
      amenity1: { title: 'Bar de Infusões & Café Gourmet', desc: 'Seleção de chás de ervas andinas, café orgânico de altitude e petiscos artesanais.' },
      amenity2: { title: 'Guarda-Volumes com Segurança 24h', desc: 'Guarde suas malas pesadas com total tranquilidade enquanto explora Machu Picchu.' },
      amenity3: { title: 'Wi-Fi de Alta Velocidade & Recarga', desc: 'Espaços de descanso aconchegantes com internet de fibra ótica e adaptadores.' },
      amenity4: { title: 'Oxigenoterapia Preventiva', desc: 'Ambiente climatizado com oxigênio medicinal para favorecer a aclimatação a 3.400m.' },
      locationTitle: 'Localização do Nosso Casarão',
      locationDesc: 'Calle Triunfo 392, a 150m da Catedral de Cusco. Embarque direto com veículo privativo.'
    },
    reviews: {
      badge: 'Depoimentos & Avaliações Verificadas',
      title: 'Experiências de Viajantes & Elogios',
      subtitle: 'Opiniões e comentários de viajantes que exploraram Cusco e Machu Picchu com nosso concierge privativo.',
      verifiedGuest: 'Hóspede Signature',
      confirmedTour: 'Experiência Confirmada'
    },
    footer: {
      rights: '© 2026 Cusco Creativos VIP Collection. Todos os direitos reservados.',
      dirceturCert: 'Operador de Turismo Registrado DIRCETUR Cusco N° CC-VIP-2026',
      safeTravels: 'Certificação Internacional Safe Travels',
      sanctuaryProtected: 'Patrimônio Mundial UNESCO • Machu Picchu',
      complaintsBook: 'Livro Virtual de Reclamações',
      terms: 'Termos e Condições VIP',
      cancellation: 'Políticas de Cancelamento & Reembolso',
      privacy: 'Proteção de Dados Pessoais (Lei 29733)',
      brandDesc: 'Coleção de viagens privativas de luxo, trens panorâmicos de primeira classe e concierge exclusivo 24/7 em Cusco e Machu Picchu.',
      officeTitle: 'Concierge Central & Sala VIP',
      officeDesc: 'Portal de Carnicerías 234, Centro Histórico, Cusco - Peru',
      hoursTitle: 'Atendimento Ininterrupto',
      hoursDesc: 'Segunda a Domingo • Assistência Privativa 24 Horas',
      paymentsTitle: 'Pagamentos Internacionais Seguros'
    }
  },

  // ==========================================
  // FRANÇAIS (FR)
  // ==========================================
  fr: {
    nav: {
      experience: 'L’Expérience',
      tours: 'Nos Circuits',
      sensory: 'Moments VIP',
      specs: 'Fiche Technique',
      amenities: 'Prestations',
      concierge: 'Concierge',
      lounge: 'Salon VIP'
    },
    cta: {
      whatsapp: 'Réservation VIP',
      quote: 'Demander un Devis',
      bookNow: 'Réserver sa Place',
      viewItinerary: 'Voir l’Itinéraire',
      inquireDates: 'Vérifier Disponibilité VIP'
    },
    hero: {
      badge: 'Expérience Exclusive VIP • Cusco & Machu Picchu',
      defaultTitle: 'Machu Picchu de Luxe avec Train Panoramique',
      defaultSubtitle: 'Découvrez la merveille du monde avec transferts privés d’exception, train panoramique grand confort, gastronomie andine raffinée et conciergerie dédiée.',
      privateConciergeBadge: 'Conciergerie Privée & Expéditions',
      verifiedOperator: 'Opérateur Officiel Agréé DIRCETUR'
    },
    sensory: {
      badge: 'Instants Inoubliables',
      title: 'Une Symphonie de Sensations Andines',
      subtitle: 'Chaque étape du voyage est pensée pour éveiller vos sens dans une intimité absolue.',
      cards: [
        {
          title: 'Aurore Dorée sur la Citadelle',
          tag: 'Accès Matinal Privilégié',
          desc: 'Entrée au premier créneau pour contempler les brumes s’élever sur les terrasses incas en silence et sans foule.'
        },
        {
          title: 'Train Panoramique & Toast Andin',
          tag: 'Belmond Hiram Bingham / Vistadome',
          desc: 'Coupe de champagne ou cocktail artisanal pendant que les sommets enneigés défilent devant les dômes vitrés.'
        },
        {
          title: 'Haute Gastronomie Bio',
          tag: 'Menu Dégustation d’Auteur',
          desc: 'Saveurs ancestrales sublimées par des chefs d’avant-garde dans des demeures coloniales ou en plein air dans la Vallée.'
        },
        {
          title: 'Histoire Vivante & Soie d’Alpaga',
          tag: 'Culture Vivante & Maîtres Tisserands',
          desc: 'Rencontres privilégiées avec des maîtres artisans cusquéniens et alpagas majestueux dans leur cadre naturel.'
        }
      ]
    },
    specs: {
      badge: 'Paramètres du Circuit',
      title: 'Fiche Technique & Standards VIP',
      subtitle: 'Nous assurons les standards les plus exigeants de confort, de sécurité et d’exclusivité au Pérou.',
      altitudeLabel: 'Altitude Maximale',
      durationLabel: 'Durée Recommandée',
      vehicleLabel: 'Véhicule Privé Dédié',
      groupLabel: 'Format du Groupe',
      audienceLabel: 'Profil Voyageur',
      hotelLabel: 'Hôtels Recommandés'
    },
    amenities: {
      badge: 'Formule Signature Tout Inclus',
      title: 'Privilèges & Prestations Exclusives',
      subtitle: 'Un séjour sans le moindre souci : chaque détail d’organisation est orchestré à la perfection.',
      defaultServices: [
        'Transport touristique privé haut de gamme (SUV ou van de prestige avec chauffeur professionnel)',
        'Billets d’entrée coupe-file intégraux pour tous les sites archéologiques et sanctuaires historiques',
        'Billets de train panoramique première classe (Belmond Hiram Bingham ou Vistadome Observatory)',
        'Guide officiel historien diplômé francophone dédié exclusivement à votre famille sans contrainte',
        'Haute gastronomie andine : déjeuner dégustation d’auteur avec accord mets et vins fins',
        'Protocole d’altitude : oxygène médical permanent, oxymètre de pouls et trousse de premiers secours',
        'Prise en charge personnalisée porte-à-porte au lobby de votre hôtel ou villa à Cusco et Vallée Sacrée',
        'Kit de bienvenue d’exception et assistance conciergerie dédiée 24h/24 tout au long du séjour'
      ]
    },
    concierge: {
      badge: 'Hospitalité Personnalisée 24/7',
      title: 'Votre Guide Historien & Concierge Privé',
      subtitle: 'Un expert local attitré attentif à chaque souhait avant, pendant et après votre expédition.',
      hostLabel: 'Votre Hôte Dédié & Guide Expert',
      directLine: 'Ligne Directe de Conciergerie',
      credentials: 'Agréé DIRCETUR Cusco • Diplômé en Premiers Secours et Protocoles d’Altitude',
      languagesLabel: 'Langues Maîtrisées',
      languagesValue: 'Français, Espagnol et Anglais avec aisance professionnelle',
      consultNow: 'Échanger avec le Concierge sur WhatsApp'
    },
    lounge: {
      badge: 'Hospitalité au Cœur Historique',
      title: 'Salon VIP & Espace d’Accueil à Cusco',
      subtitle: 'Une demeure coloniale restaurée à quelques pas de la Plaza de Armas réservée à nos invités privés.',
      amenity1: { title: 'Bar à Infusions & Café d’Altitude', desc: 'Sélection d’infusions andines apaisantes, café bio de Quillabamba et douceurs artisanales.' },
      amenity2: { title: 'Bagagerie Sécurisée 24h/24', desc: 'Déposez vos valises lourdes en toute confiance pendant votre escapade au Machu Picchu.' },
      amenity3: { title: 'Fibre Wi-Fi Rapide & Recharge', desc: 'Salons de repos feutrés dotés d’une connexion très haut débit et adaptateurs.' },
      amenity4: { title: 'Oxygénothérapie Préventive', desc: 'Espace climatisé avec assistance d’oxygène médical pour une acclimatation sereine à 3 400 m.' },
      locationTitle: 'Emplacement de Notre Demeure',
      locationDesc: 'Calle Triunfo 392, à 150m de la Cathédrale de Cusco. Dépose directe en véhicule privé.'
    },
    reviews: {
      badge: 'Avis & Témoignages Vérifiés',
      title: 'Expériences de Voyageurs & Retours',
      subtitle: 'Impressions authentiques de voyageurs ayant exploré Cusco et le Machu Picchu avec notre service privé.',
      verifiedGuest: 'Invité Signature',
      confirmedTour: 'Circuit Confirmé'
    },
    footer: {
      rights: '© 2026 Cusco Creativos VIP Collection. Tous droits réservés.',
      dirceturCert: 'Opérateur de Tourisme Agréé DIRCETUR Cusco N° CC-VIP-2026',
      safeTravels: 'Label International de Confiance Safe Travels',
      sanctuaryProtected: 'Patrimoine Mondial UNESCO • Machu Picchu',
      complaintsBook: 'Livre Virtuel de Réclamations',
      terms: 'Conditions Générales VIP',
      cancellation: 'Politiques d’Annulation & Remboursement',
      privacy: 'Protection des Données Personnelles (Loi 29733)',
      brandDesc: 'Voyages d’exception entièrement privés, trains panoramiques de première classe et service concierge dédié 24/7 à Cusco et Machu Picchu.',
      officeTitle: 'Concierge Central & Salon VIP',
      officeDesc: 'Portal de Carnicerías 234, Centre Historique, Cusco - Pérou',
      hoursTitle: 'Assistance Continue',
      hoursDesc: 'Lundi au Dimanche • Assistance Privée 24 Heures sur 24',
      paymentsTitle: 'Paiements Sécurisés Internationaux'
    }
  },

  // ==========================================
  // ITALIANO (IT)
  // ==========================================
  it: {
    nav: {
      experience: 'L’Esperienza',
      tours: 'I Nostri Tour',
      sensory: 'Momenti VIP',
      specs: 'Scheda Tecnica',
      amenities: 'Servizi Inclusi',
      concierge: 'Concierge',
      lounge: 'Salone VIP'
    },
    cta: {
      whatsapp: 'Prenotazione VIP',
      quote: 'Richiedi Preventivo',
      bookNow: 'Prenota Posto',
      viewItinerary: 'Vedi Itinerario',
      inquireDates: 'Verifica Disponibilità VIP'
    },
    hero: {
      badge: 'Esperienza VIP Esclusiva • Cusco & Machu Picchu',
      defaultTitle: 'Machu Picchu VIP con Treno Panoramico',
      defaultSubtitle: 'Scopri la meraviglia del mondo con trasferimenti privati, treno panoramico di prima classe, alta gastronomia andina e concierge dedicato.',
      privateConciergeBadge: 'Concierge Privato & Spedizioni',
      verifiedOperator: 'Operatore Ufficiale Abilitato DIRCETUR'
    },
    sensory: {
      badge: 'Momenti Indimenticabili',
      title: 'Una Collezione di Sensazioni Andine',
      subtitle: 'Ogni istante del viaggio è curato per deliziare i tuoi sensi nella più totale privacy.',
      cards: [
        {
          title: 'Alba Dorata sulla Cittadella',
          tag: 'Accesso Mattutino Prioritario',
          desc: 'Ingresso nel primo turno per ammirare la nebbia che si dissolve sulle terrazze inca nel silenzio più intimo.'
        },
        {
          title: 'Treno Panoramico & Brindisi Andino',
          tag: 'Osservatorio Hiram Bingham / Vistadome',
          desc: 'Spumante o cocktail di benvenuto mentre le vette innevate scorrono davanti a cupole di cristallo.'
        },
        {
          title: 'Alta Gastronomia Biologica',
          tag: 'Menu Degustazione d’Autore',
          desc: 'Sapori millenari reinterpretati da chef d’avanguardia in dimore coloniali o nella quiete della Valle Sacra.'
        },
        {
          title: 'Storia Viva & Pregiata Lana di Alpaca',
          tag: 'Cultura Viva & Maestri Tessitori',
          desc: 'Incontri privati con maestri artigiani andini e contatto con alpaca e vigogne nel loro habitat naturale.'
        }
      ]
    },
    specs: {
      badge: 'Parametri della Spedizione',
      title: 'Scheda Tecnica & Standard VIP',
      subtitle: 'Garantiamo i più elevati standard di comfort, sicurezza ed esclusività in Perù.',
      altitudeLabel: 'Altitudine Massima',
      durationLabel: 'Durata Consigliata',
      vehicleLabel: 'Veicolo Privato Assegnato',
      groupLabel: 'Modalità di Gruppo',
      audienceLabel: 'Profilo del Viaggiatore',
      hotelLabel: 'Hotel Suggeriti'
    },
    amenities: {
      badge: 'Formula Signature Tutto Incluso',
      title: 'Privilegi & Servizi Esclusivi',
      subtitle: 'Un viaggio senza pensieri: ogni dettaglio operativo è gestito con magistrale eccellenza.',
      defaultServices: [
        'Trasporto turistico privato di alta gamma (SUV o van executive con autista professionista)',
        'Biglietti d’ingresso preferenziali completi per tutti i santuari archeologici e templi storici',
        'Biglietti del treno panoramico di prima classe (Belmond Hiram Bingham o Vistadome Observatory)',
        'Guida ufficiale storica abilitata bilingue dedicata in via esclusiva al tuo gruppo senza fretta',
        'Esperienza culinaria di prestigio: pranzo gourmet a portate con abbinamento di vini nella valle',
        'Protocollo di altitudine: ossigeno medicale portatile, pulsossimetro e kit di pronto soccorso a bordo',
        'Prelievo e rientro porta a porta direttamente nella hall del tuo hotel o villa a Cusco e Valle Sacra',
        'Kit di benvenuto andino di pregio e assistenza concierge dedicata attiva 24 ore su 24'
      ]
    },
    concierge: {
      badge: 'Assistenza Personalizzata 24/7',
      title: 'La Tua Guida Storica & Concierge Privato',
      subtitle: 'Uno specialista locale dedicato che curerà ogni richiesta prima, durante e dopo il viaggio.',
      hostLabel: 'Il Tuo Host Dedicato & Guida Ufficiale',
      directLine: 'Linea Diretta Concierge',
      credentials: 'Abilitato DIRCETUR Cusco • Specialista in Primo Soccorso e Altitudine',
      languagesLabel: 'Lingue Parlate',
      languagesValue: 'Italiano, Spagnolo e Inglese fluenti con competenza professionale',
      consultNow: 'Parla con il Concierge su WhatsApp'
    },
    lounge: {
      badge: 'Accoglienza nel Centro Storico',
      title: 'Salone VIP & Punto d’Incontro a Cusco',
      subtitle: 'Una dimora coloniale restaurata a pochi passi da Plaza de Armas riservata ai nostri ospiti privati.',
      amenity1: { title: 'Bar di Infusi & Caffè Pregiato', desc: 'Selezione di tisane andine rilassanti, caffè biologico d’alta quota e piccola pasticceria.' },
      amenity2: { title: 'Deposito Bagagli Protetto 24h', desc: 'Custodisci i tuoi bagagli ingombranti in totale sicurezza durante l’escursione a Machu Picchu.' },
      amenity3: { title: 'Wi-Fi in Fibra & Postazioni Ricarica', desc: 'Eleganti salotti relax provvisti di connessione internet ultraveloce e prese universali.' },
      amenity4: { title: 'Ossigenoterapia Preventiva', desc: 'Saletta climatizzata dotata di ossigeno medicale per favorire un agevole acclimamento a 3.400m.' },
      locationTitle: 'Posizione della Nostra Dimora',
      locationDesc: 'Calle Triunfo 392, a 150m dalla Cattedrale di Cusco. Accesso carrabile diretto con auto privata.'
    },
    reviews: {
      badge: 'Recensioni & Testimonianze Verificate',
      title: 'Esperienze di Viaggio & Giudizi',
      subtitle: 'Impressioni autentiche di viaggiatori che hanno visitato Cusco e Machu Picchu con la nostra assistenza privata.',
      verifiedGuest: 'Ospite Signature',
      confirmedTour: 'Esperienza Confermata'
    },
    footer: {
      rights: '© 2026 Cusco Creativos VIP Collection. Tutti i diritti riservati.',
      dirceturCert: 'Operatore Turistico Ufficiale Registrato DIRCETUR Cusco N° CC-VIP-2026',
      safeTravels: 'Certificazione Internazionale Safe Travels',
      sanctuaryProtected: 'Patrimonio Mondiale UNESCO • Machu Picchu',
      complaintsBook: 'Registro Virtuale dei Reclami',
      terms: 'Termini e Condizioni VIP',
      cancellation: 'Politiche di Cancellazione & Rimborsi',
      privacy: 'Protezione Dati Personali (Legge 29733)',
      brandDesc: 'Collezione di viaggi privati d’alta gamma, treni panoramici di prima classe e concierge dedicato 24/7 a Cusco e Machu Picchu.',
      officeTitle: 'Concierge Centrale & Salone VIP',
      officeDesc: 'Portal de Carnicerías 234, Centro Storico, Cusco - Perù',
      hoursTitle: 'Assistenza Continuativa',
      hoursDesc: 'Lunedì a Domenica • Assistenza Privata 24 Ore su 24',
      paymentsTitle: 'Pagamenti Sicuri Internazionali'
    }
  }
};
