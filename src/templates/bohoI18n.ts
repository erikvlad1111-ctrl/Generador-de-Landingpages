import { LanguageType } from '@/types/landing';

export interface BohoI18nTexts {
  nav: {
    gallery: string;
    journal: string;
    tours: string;
    map: string;
    reviews: string;
    fieldGuide: string;
    backpack: string;
    faq: string;
  };
  cta: {
    whatsapp: string;
    quote: string;
    bookNow: string;
    viewItinerary: string;
    openMap: string;
  };
  hero: {
    badge: string;
    defaultTitle: string;
    defaultSubtitle: string;
    fastResponse: string;
    altitudeBadge: string;
    comfortBadge: string;
    investment: string;
    perTraveler: string;
    quickResponse: string;
  };
  about: {
    badge: string;
    defaultTitle: string;
    defaultContent: string;
    goldenHour: string;
    goldenHourDesc: string;
    slowPace: string;
    slowPaceDesc: string;
    safeAcclimatization: string;
    safeAcclimatizationDesc: string;
  };
  gallery: {
    badge: string;
    title: string;
    subtitle: string;
    allPhotos: string;
  };
  tours: {
    badge: string;
    title: string;
    subtitle: string;
    categories: {
      all: string;
      lagunas: string;
      montana: string;
      valle: string;
    };
    fromPrice: string;
    difficulty: string;
    duration: string;
    altitude: string;
    seeDetails: string;
  };
  journal: {
    badge: string;
    title: string;
    subtitle: string;
  };
  mochila: {
    badge: string;
    title: string;
    subtitle: string;
    tabIncludes: string;
    tabNotIncludes: string;
    tabBackpack: string;
    guaranteedNote: string;
  };
  fieldGuide: {
    badge: string;
    title: string;
    subtitle: string;
    tips: Array<{
      title: string;
      desc: string;
      tag: string;
    }>;
  };
  reviews: {
    badge: string;
    title: string;
    subtitle: string;
    verified: string;
    categories: {
      all: string;
      foto: string;
      trek: string;
      pareja: string;
    };
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    whatsappDirect: string;
    phoneLabel: string;
    hoursLabel: string;
    hoursValue: string;
  };
  footer: {
    madeWithLove: string;
    rights: string;
    safeTravels: string;
    dircetur: string;
  };
}

export const BOHO_LANGUAGES: Array<{ code: LanguageType; label: string; flag: string }> = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' }
];

export const BOHO_I18N: Record<LanguageType, BohoI18nTexts> = {
  // ==========================================
  // ESPAÑOL (ES)
  // ==========================================
  es: {
    nav: {
      gallery: 'Postales & Pines',
      journal: 'Bitácora',
      tours: 'Mejores Tours',
      map: 'Mapa',
      reviews: 'Reseñas',
      fieldGuide: 'Guía de Campo',
      backpack: 'Mochila',
      faq: 'Soporte & FAQ'
    },
    cta: {
      whatsapp: 'WhatsApp',
      quote: 'Cotizar',
      bookNow: 'Reservar Lugar',
      viewItinerary: 'Ver Itinerario',
      openMap: 'Abrir en Google Maps'
    },
    hero: {
      badge: 'Bitácora de Viaje • Edición Andina',
      defaultTitle: 'Laguna Humantay: Bitácora Visual Andina',
      defaultSubtitle: 'Una expedición pausada hacia las aguas turquesas del nevado Humantay, diseñada para amantes de la fotografía, el paisajismo y los viajes auténticos.',
      fastResponse: 'Respuesta en minutos • Coordinación directa con el guía',
      altitudeBadge: '4,200 msnm • Glaciar Sagrado',
      comfortBadge: 'Grupos Reducidos • Confort',
      investment: 'Inversión',
      perTraveler: '/ por persona',
      quickResponse: 'Respuesta en minutos • Coordinación directa con el guía colegiado'
    },
    about: {
      badge: 'Nuestra Filosofía de Viaje',
      defaultTitle: 'Viajar despacio para sentir la inmensidad de los Andes',
      defaultContent: 'Diseñada para quienes buscan desconectar de las prisas y conectar con la majestuosidad de las montañas andinas. Viajamos en grupos reducidos con paradas estratégicas en los mejores miradores, café orgánico de altura y un guía especializado que te asesorará para capturar fotos inolvidables.',
      goldenHour: 'Luz Dorada',
      goldenHourDesc: 'Horarios calculados para la mejor iluminación fotográfica',
      slowPace: 'Ritmo Pausado',
      slowPaceDesc: 'Cero prisas de tours masivos convencionales',
      safeAcclimatization: 'Aclimatación Segura',
      safeAcclimatizationDesc: 'Oxígeno y pausas preventivas en la ruta'
    },
    gallery: {
      badge: 'Galería Fotográfica & Moodboard',
      title: 'Postales Reales de Nuestros Viajeros',
      subtitle: 'Capturas espontáneas sin filtros artificiales tomadas durante las horas doradas de la mañana.',
      allPhotos: 'Ver Álbum Completo en Alta Definición'
    },
    tours: {
      badge: 'Rutas Escénicas Recomendadas',
      title: 'Nuestras Salidas Curadas en Cusco',
      subtitle: 'Tours pensados para disfrutar del paisaje sin prisas y con atención personalizada.',
      categories: {
        all: 'Todos los Caminos',
        lagunas: 'Lagunas & Glaciares',
        montana: 'Alta Montaña',
        valle: 'Valles & Cultura'
      },
      fromPrice: 'Tarifa por persona',
      difficulty: 'Dificultad',
      duration: 'Duración',
      altitude: 'Altitud máxima',
      seeDetails: 'Consultar Fechas'
    },
    journal: {
      badge: 'Cronograma de la Jornada',
      title: 'La Bitácora Paso a Paso',
      subtitle: 'Tiempos holgados para caminar a tu ritmo, respirar aire puro y fotografiar los paisajes andinos.'
    },
    mochila: {
      badge: 'Organización & Transparencia',
      title: 'Qué incluye y qué llevar en tu mochila',
      subtitle: 'Preparamos todo lo necesario para que tu caminata sea segura, abrigada y placentera.',
      tabIncludes: '✓ Qué incluye el tour',
      tabNotIncludes: '✕ Qué no incluye',
      tabBackpack: '🎒 Checklist de Mochila',
      guaranteedNote: 'Todos nuestros traslados cuentan con conductores profesionales y balón de oxígeno medicinal a bordo.'
    },
    fieldGuide: {
      badge: 'Consejos de Montañismo',
      title: 'Guía de Campo para el Caminante',
      subtitle: 'Recomendaciones prácticas preparadas por nuestros guías locales para vivir la montaña con armonía.',
      tips: [
        {
          title: 'Vestimenta en Capas & Colores Andinos',
          desc: 'Recomendamos tonos terracota, mostaza, verde musgo o lana cruda. Contrastan de forma espectacular con el cielo azul y el glaciar blanco.',
          tag: 'Fotografía & Confort'
        },
        {
          title: 'Respiración Consciente & Soroche',
          desc: 'Paso corto y constante respirando hondo por la nariz. El té de muña en el desayuno es el mejor aliado digestivo antes de iniciar el ascenso.',
          tag: 'Aclimatación'
        },
        {
          title: 'Turismo Sostenible Sin Huella',
          desc: 'Cero plásticos de un solo uso. Llevamos cantimploras reutilizables y respetamos las apachetas tradicionales dejadas por las comunidades andinas.',
          tag: 'Respeto Andino'
        }
      ]
    },
    reviews: {
      badge: 'Testimonios & Cuaderno de Firmas',
      title: 'Lo que dicen quienes ya caminaron con nosotros',
      subtitle: 'Opiniones sinceras de viajeros independientes, parejas y amantes de la fotografía.',
      verified: 'Viajero Verificado',
      categories: {
        all: 'Todas las Notas',
        foto: 'Fotografía',
        trek: 'Trek Andino',
        pareja: 'En Pareja'
      }
    },
    contact: {
      badge: 'Conversemos Directamente',
      title: '¿Tienes alguna duda sobre la ruta o las fechas?',
      subtitle: 'Escríbenos directamente para coordinar fecha de salida y número de viajeros con respuesta en minutos.',
      whatsappDirect: 'Chatear por WhatsApp con el Guía',
      phoneLabel: 'Teléfono / WhatsApp Oficial',
      hoursLabel: 'Horario de Atención',
      hoursValue: 'Lunes a Domingo • 07:00 a 21:00 hrs'
    },
    footer: {
      madeWithLove: 'Diseñado con alma andina y respeto por la naturaleza',
      rights: '© 2026 Cusco Creativos • Colección Bitácora Andina. Operador formal registrado.',
      safeTravels: 'Sello Internacional Safe Travels',
      dircetur: 'Licencia Oficial DIRCETUR Cusco'
    }
  },

  // ==========================================
  // ENGLISH (EN)
  // ==========================================
  en: {
    nav: {
      gallery: 'Postcards & Pins',
      journal: 'Travel Journal',
      tours: 'Curated Tours',
      map: 'Route Map',
      reviews: 'Reviews',
      fieldGuide: 'Field Guide',
      backpack: 'Daypack',
      faq: 'Support & FAQ'
    },
    cta: {
      whatsapp: 'WhatsApp',
      quote: 'Get Quote',
      bookNow: 'Reserve Spot',
      viewItinerary: 'View Itinerary',
      openMap: 'Open in Google Maps'
    },
    hero: {
      badge: 'Travel Journal Edition • Nature & Wanderlust',
      defaultTitle: 'Humantay Lake: Andean Visual Journal',
      defaultSubtitle: 'An unhurried exploration toward the turquoise waters of sacred Mount Humantay, curated for photography, landscapes, and soulful travelers.',
      fastResponse: 'Instant response • Direct coordination with local mountain guide',
      altitudeBadge: '4,200 m.a.s.l. • Sacred Glacier',
      comfortBadge: 'Small Group Pace • Full Comfort',
      investment: 'Investment',
      perTraveler: '/ per person',
      quickResponse: 'Instant response • Direct coordination with licensed guide'
    },
    about: {
      badge: 'Our Travel Philosophy',
      defaultTitle: 'Slow travel to embrace the vastness of the Andes',
      defaultContent: 'Designed for mindful travelers seeking to step away from crowds and connect with majestic Andean horizons. We travel in small, relaxed groups with scenic viewpoints, warm organic highland coffee, and guidance to capture breathtaking photography.',
      goldenHour: 'Golden Hour',
      goldenHourDesc: 'Timing scheduled for premier natural lighting',
      slowPace: 'Unhurried Pace',
      slowPaceDesc: 'No rushing, unlike conventional mass bus tours',
      safeAcclimatization: 'Safe Acclimatization',
      safeAcclimatizationDesc: 'Medical oxygen & gradual ascent stops'
    },
    gallery: {
      badge: 'Visual Moodboard & Field Postcards',
      title: 'Real Moments from Our Travelers',
      subtitle: 'Authentic frames taken in the golden mountain morning light with natural textures.',
      allPhotos: 'View Full High-Resolution Visual Gallery'
    },
    tours: {
      badge: 'Scenic Recommended Trails',
      title: 'Our Curated Departures in Cusco',
      subtitle: 'Thoughtful itineraries focused on natural beauty, unhurried contemplation, and warm guidance.',
      categories: {
        all: 'All Trails',
        lagunas: 'Lakes & Glaciers',
        montana: 'High Mountain',
        valle: 'Valleys & Culture'
      },
      fromPrice: 'Price per traveler',
      difficulty: 'Difficulty',
      duration: 'Duration',
      altitude: 'Max Altitude',
      seeDetails: 'Check Available Dates'
    },
    journal: {
      badge: 'Day Schedule Timeline',
      title: 'Step-by-Step Field Journal',
      subtitle: 'Generous time buffers to walk at your rhythm, breathe pure crisp air, and immerse in the scenery.'
    },
    mochila: {
      badge: 'Transparency & Packing',
      title: 'What is included & what to pack in your daypack',
      subtitle: 'Everything prepared to keep your high-altitude trek warm, comfortable, and safe.',
      tabIncludes: '✓ What is Included',
      tabNotIncludes: '✕ What is Not Included',
      tabBackpack: '🎒 Daypack Checklist',
      guaranteedNote: 'All our private transport units carry certified professional drivers and medical emergency oxygen tanks on board.'
    },
    fieldGuide: {
      badge: 'Mountain Advice & Insights',
      title: 'Hiker’s Field Guide for the Trail',
      subtitle: 'Practical recommendations from our local mountain guides to hike in complete harmony with the Andes.',
      tips: [
        {
          title: 'Layering & Earthy Andean Palettes',
          desc: 'We recommend terracotta, mustard, moss green, or raw alpaca wool tones. They contrast gorgeously against cobalt blue skies and gleaming glaciers.',
          tag: 'Photography & Comfort'
        },
        {
          title: 'Mindful Breathing & Altitude Ease',
          desc: 'Short, steady strides breathing deeply through your nose. Warm muña herb infusion at breakfast is the ultimate natural ally before the ascent.',
          tag: 'Acclimatization'
        },
        {
          title: 'Leave No Trace Sustainable Tourism',
          desc: 'Zero single-use plastics. We carry reusable thermoses and honor traditional stone apachetas left by indigenous high-mountain communities.',
          tag: 'Respect the Andes'
        }
      ]
    },
    reviews: {
      badge: 'Guestbook & Visual Notes',
      title: 'Words from travelers who walked these paths',
      subtitle: 'Heartfelt reviews from independent wanderers, couples, and mountain photography lovers.',
      verified: 'Verified Guest',
      categories: {
        all: 'All Notes',
        foto: 'Photography',
        trek: 'Andean Trek',
        pareja: 'Couples'
      }
    },
    contact: {
      badge: 'Let’s Chat Directly',
      title: 'Any questions about routes, weather, or dates?',
      subtitle: 'Message our lead guide directly to check seasonal departure dates and group size with instant assistance.',
      whatsappDirect: 'Chat on WhatsApp with Lead Guide',
      phoneLabel: 'Official Support & Booking Line',
      hoursLabel: 'Opening Hours',
      hoursValue: 'Monday to Sunday • 07:00 to 21:00 (Peruvian Time)'
    },
    footer: {
      madeWithLove: 'Crafted with Andean soul and deep reverence for mother nature',
      rights: '© 2026 Cusco Creativos • Andean Journal Edition. Licensed tourism operator.',
      safeTravels: 'Safe Travels Global Stamp',
      dircetur: 'DIRCETUR Cusco Official Tourism License'
    }
  },

  // ==========================================
  // PORTUGUÊS (PT)
  // ==========================================
  pt: {
    nav: {
      gallery: 'Postais & Fotos',
      journal: 'Diário de Bordo',
      tours: 'Melhores Passeios',
      map: 'Mapa da Rota',
      reviews: 'Depoimentos',
      fieldGuide: 'Guia de Campo',
      backpack: 'Mochila',
      faq: 'Suporte & FAQ'
    },
    cta: {
      whatsapp: 'WhatsApp',
      quote: 'Cotar',
      bookNow: 'Garantir Vaga',
      viewItinerary: 'Ver Itinerário',
      openMap: 'Abrir no Google Maps'
    },
    hero: {
      badge: 'Edição Diário de Viagem • Natureza & Alma Andina',
      defaultTitle: 'Laguna Humantay: Diário Visual dos Andes',
      defaultSubtitle: 'Uma expedição sem pressa rumo às águas azul-turquesa do nevado Humantay, desenhada para amantes de fotografia, paisagens e viagens autênticas.',
      fastResponse: 'Resposta em minutos • Coordenação direta com o guia',
      altitudeBadge: '4.200 m de altitude • Geleira Sagrada',
      comfortBadge: 'Grupos Reduzidos • Conforto Total',
      investment: 'Investimento',
      perTraveler: '/ por pessoa',
      quickResponse: 'Resposta rápida • Coordenação direta com guia credenciado'
    },
    about: {
      badge: 'Nossa Filosofia de Viagem',
      defaultTitle: 'Viajar com calma para sentir a imensidão dos Andes',
      defaultContent: 'Criada para quem busca desacelerar da rotina e se conectar com a majestade das cordilheiras andinas. Viajamos em grupos pequenos com paradas estratégicas nos mirantes mais cênicos, café orgânico quentinho e dicas de fotografia inesquecíveis.',
      goldenHour: 'Hora Dourada',
      goldenHourDesc: 'Horários calculados para a melhor luz fotográfica',
      slowPace: 'Ritmo Tranquilo',
      slowPaceDesc: 'Sem pressa de excursões em massa convencionais',
      safeAcclimatization: 'Aclimatação Segura',
      safeAcclimatizationDesc: 'Oxigênio e pausas preventivas no caminho'
    },
    gallery: {
      badge: 'Galeria & Painel de Inspiração',
      title: 'Postais Reais de Nossos Viajantes',
      subtitle: 'Fotos espontâneas tiradas nas horas douradas da manhã sem filtros artificiais.',
      allPhotos: 'Ver Galeria Completa em Alta Resolução'
    },
    tours: {
      badge: 'Rotas Cênicas Recomendadas',
      title: 'Nossos Passeios Selecionados em Cusco',
      subtitle: 'Itinerários criados para contemplar a natureza com tranquilidade e atendimento afetuoso.',
      categories: {
        all: 'Todos os Caminhos',
        lagunas: 'Lagoas & Geleiras',
        montana: 'Alta Montanha',
        valle: 'Vales & Cultura'
      },
      fromPrice: 'Tarifa por pessoa',
      difficulty: 'Dificuldade',
      duration: 'Duração',
      altitude: 'Altitude máxima',
      seeDetails: 'Consultar Datas'
    },
    journal: {
      badge: 'Cronograma do Dia a Dia',
      title: 'O Diário de Bordo Passo a Passo',
      subtitle: 'Tempo de sobra para caminhar no seu ritmo, respirar o ar puro da montanha e registrar cada ângulo.'
    },
    mochila: {
      badge: 'Organização & Transparência',
      title: 'O que está incluso e o que levar na mochila',
      subtitle: 'Preparamos tudo para que sua caminhada seja segura, aconchegante e sem surpresas.',
      tabIncludes: '✓ O que está incluso',
      tabNotIncludes: '✕ O que não inclui',
      tabBackpack: '🎒 Checklist de Mochila',
      guaranteedNote: 'Nossos veículos contam com motoristas profissionais credenciados e oxigênio medicinal a bordo.'
    },
    fieldGuide: {
      badge: 'Dicas de Montanhismo',
      title: 'Guia de Campo para o Caminhante',
      subtitle: 'Orientações práticas preparadas pelos nossos guias locais para viver a montanha em harmonia.',
      tips: [
        {
          title: 'Roupas em Camadas & Tons Andinos',
          desc: 'Recomendamos tons terracota, mostarda, verde musgo ou lã crua. Contrastam maravilhosamente com o céu azul e o gelo branco.',
          tag: 'Fotografia & Conforto'
        },
        {
          title: 'Respiração Consciente & Aclimatação',
          desc: 'Passo curto e constante respirando fundo pelo nariz. O chá de muña no café da manhã é o melhor aliado digestivo antes da subida.',
          tag: 'Prevenção do Soroche'
        },
        {
          title: 'Turismo Sustentável Sem Rastros',
          desc: 'Zero plásticos descartáveis. Levamos garrafas reutilizáveis e respeitamos as apachetas de pedra deixadas pelas comunidades andinas.',
          tag: 'Respeito à Pachamama'
        }
      ]
    },
    reviews: {
      badge: 'Depoimentos & Livro de Assinaturas',
      title: 'O que dizem os viajantes que trilharam com a gente',
      subtitle: 'Opiniões sinceras de viajantes independentes, casais e entusiastas de fotografia.',
      verified: 'Viajante Verificado',
      categories: {
        all: 'Todas as Notas',
        foto: 'Fotografia',
        trek: 'Trekking Andino',
        pareja: 'Em Casal'
      }
    },
    contact: {
      badge: 'Vamos Conversar Direto',
      title: 'Alguma dúvida sobre a trilha, clima ou datas?',
      subtitle: 'Fale conosco no WhatsApp para verificar datas de saída e tamanho do grupo em minutos.',
      whatsappDirect: 'Conversar no WhatsApp com o Guia',
      phoneLabel: 'Telefone / WhatsApp Oficial',
      hoursLabel: 'Horário de Atendimento',
      hoursValue: 'Segunda a Domingo • 07:00 às 21:00 (Horário do Peru)'
    },
    footer: {
      madeWithLove: 'Feito com alma andina e amor pela natureza',
      rights: '© 2026 Cusco Creativos • Edição Diário Andino. Operador oficial registrado.',
      safeTravels: 'Selo Internacional Safe Travels',
      dircetur: 'Licença Oficial DIRCETUR Cusco'
    }
  },

  // ==========================================
  // FRANÇAIS (FR)
  // ==========================================
  fr: {
    nav: {
      gallery: 'Cartes Postales',
      journal: 'Carnet de Bord',
      tours: 'Circuits Curatés',
      map: 'Carte du Parcours',
      reviews: 'Témoignages',
      fieldGuide: 'Guide de Terrain',
      backpack: 'Sac à Dos',
      faq: 'Support & FAQ'
    },
    cta: {
      whatsapp: 'WhatsApp',
      quote: 'Devis',
      bookNow: 'Réserver sa Place',
      viewItinerary: 'Voir l’Itinéraire',
      openMap: 'Ouvrir sur Google Maps'
    },
    hero: {
      badge: 'Édition Carnet de Voyage • Nature & Sérénité',
      defaultTitle: 'Lagune Humantay : Carnet Visuel Andin',
      defaultSubtitle: 'Une ascension contemplative vers les eaux turquoise du glacier Humantay, conçue pour les amoureux de photographie, d’espaces sauvages et d’authenticité.',
      fastResponse: 'Réponse en quelques minutes • Coordination directe avec le guide',
      altitudeBadge: '4 200 m d’altitude • Glacier Sacré',
      comfortBadge: 'Petits Groupes • Confort & Sérénité',
      investment: 'Investissement',
      perTraveler: '/ par voyageur',
      quickResponse: 'Réponse rapide • Échange direct avec votre guide certifié'
    },
    about: {
      badge: 'Notre Philosophie du Voyage',
      defaultTitle: 'Prendre le temps de ressentir l’immensité des Andes',
      defaultContent: 'Conçu pour celles et ceux qui souhaitent échapper aux foules pour communier avec les sommets andins. Nous cheminons en petits groupes avec des haltes prolongées face aux panoramas d’exception, du café d’altitude bio et les conseils précieux d’un guide passionné de photographie.',
      goldenHour: 'Heure Dorée',
      goldenHourDesc: 'Créneaux choisis pour une lumière photographique idéale',
      slowPace: 'Rythme Posé',
      slowPaceDesc: 'Zéro précipitation des bus touristiques de masse',
      safeAcclimatization: 'Acclimatation Sereine',
      safeAcclimatizationDesc: 'Oxygène et pauses progressives sur le sentier'
    },
    gallery: {
      badge: 'Moodboard & Photographies de Terrain',
      title: 'Instantanés Réels de Nos Randonneurs',
      subtitle: 'Des clichés spontanés capturés dans la lumière dorée du matin sans artifices.',
      allPhotos: 'Voir la Galerie Complète en Haute Définition'
    },
    tours: {
      badge: 'Itinéraires Panoramiques Choisis',
      title: 'Nos Départs Curatés à Cusco',
      subtitle: 'Des expériences conçues pour savourer le grand air sans aucune précipitation.',
      categories: {
        all: 'Tous les Sentiers',
        lagunas: 'Lacs & Glaciers',
        montana: 'Haute Montagne',
        valle: 'Vallées & Culture'
      },
      fromPrice: 'Tarif par voyageur',
      difficulty: 'Difficulté',
      duration: 'Durée',
      altitude: 'Altitude max',
      seeDetails: 'Consulter les Dates'
    },
    journal: {
      badge: 'Planning de la Journée',
      title: 'Le Carnet de Route Étape par Étape',
      subtitle: 'Des temps généreux pour marcher à votre rythme, respirer l’air pur et immortaliser les paysages.'
    },
    mochila: {
      badge: 'Organisation & Clarté',
      title: 'Ce qui est inclus et que mettre dans son sac',
      subtitle: 'Tout est préparé avec soin pour que votre ascension soit confortable, chaude et sécurisée.',
      tabIncludes: '✓ Ce qui est inclus',
      tabNotIncludes: '✕ Ce qui n’est pas inclus',
      tabBackpack: '🎒 Checklist du Sac à Dos',
      guaranteedNote: 'Tous nos véhicules privés sont conduits par des professionnels et disposent d’une bouteille d’oxygène médical à bord.'
    },
    fieldGuide: {
      badge: 'Conseils de Randonnée',
      title: 'Guide de Terrain du Randonneur',
      subtitle: 'Des recommandations concrètes élaborées par nos guides locaux pour arpenter la montagne en harmonie.',
      tips: [
        {
          title: 'Vêtements Multicouches & Tons Naturels',
          desc: 'Privilégiez les teintes terracotta, ocre, vert mousse ou laine brute. Elles créent un contraste magnifique avec le ciel bleu et les glaces éternelles.',
          tag: 'Photographie & Confort'
        },
        {
          title: 'Respiration Profonde & Aclimatation',
          desc: 'Pas courts et réguliers en respirant par le nez. L’infusion de muña au petit-déjeuner est la meilleure alliée digestive avant d’aborder la pente.',
          tag: 'Mal des Montagnes'
        },
        {
          title: 'Tourisme Sans Trace & Respect',
          desc: 'Zéro plastique à usage unique. Nous emportons des gourdes réutilisables et respectons les monticules de pierres traditionnels (apachetas).',
          tag: 'Respect des Andes'
        }
      ]
    },
    reviews: {
      badge: 'Livre d’Or & Carnet de Notes',
      title: 'Ce qu’en disent les voyageurs qui ont marché avec nous',
      subtitle: 'Des témoignages sincères de randonneurs indépendants, couples et passionnés d’images.',
      verified: 'Voyageur Vérifié',
      categories: {
        all: 'Tous les Avis',
        foto: 'Photographie',
        trek: 'Trek Andin',
        pareja: 'En Couple'
      }
    },
    contact: {
      badge: 'Échangeons Directement',
      title: 'Une question sur l’itinéraire, la météo ou les dates ?',
      subtitle: 'Écrivez-nous directement sur WhatsApp pour vérifier les disponibilités et le nombre de participants en quelques instants.',
      whatsappDirect: 'Discuter sur WhatsApp avec le Guide',
      phoneLabel: 'Ligne Officielle WhatsApp / Téléphone',
      hoursLabel: 'Horaires d’Assistance',
      hoursValue: 'Lundi au Dimanche • 07h00 à 21h00 (Heure du Pérou)'
    },
    footer: {
      madeWithLove: 'Créé avec l’âme andine et le respect de la nature',
      rights: '© 2026 Cusco Creativos • Édition Carnet Andin. Opérateur officiel enregistré.',
      safeTravels: 'Label International Safe Travels',
      dircetur: 'Licence Officielle DIRCETUR Cusco'
    }
  },

  // ==========================================
  // ITALIANO (IT)
  // ==========================================
  it: {
    nav: {
      gallery: 'Cartoline & Foto',
      journal: 'Diario di Bordo',
      tours: 'Migliori Tour',
      map: 'Mappa del Percorso',
      reviews: 'Recensioni',
      fieldGuide: 'Guida di Campo',
      backpack: 'Zaino',
      faq: 'Supporto & FAQ'
    },
    cta: {
      whatsapp: 'WhatsApp',
      quote: 'Preventivo',
      bookNow: 'Prenota Posto',
      viewItinerary: 'Vedi Itinerario',
      openMap: 'Apri su Google Maps'
    },
    hero: {
      badge: 'Edizione Diario di Viaggio • Natura & Ispirazione',
      defaultTitle: 'Laguna Humantay: Diario Visivo delle Ande',
      defaultSubtitle: 'Una salita rilassata verso le acque turchesi del ghiacciaio Humantay, pensata per amanti della fotografia, dei paesaggi incontaminati e dei viaggi autentici.',
      fastResponse: 'Risposta in pochi minuti • Coordinamento diretto con la guida',
      altitudeBadge: '4.200 mslm • Ghiacciaio Sacro',
      comfortBadge: 'Piccoli Gruppi • Massimo Comfort',
      investment: 'Tariffa',
      perTraveler: '/ a persona',
      quickResponse: 'Risposta rapida • Coordinamento diretto con la guida'
    },
    about: {
      badge: 'La Nostra Filosofia di Viaggio',
      defaultTitle: 'Camminare con calma per percepire l’immensità delle Ande',
      defaultContent: 'Pensata per chi desidera staccare dalla fretta quotidiana e connettersi con la maestosità delle vette andine. Viaggiamo in piccoli gruppi con soste strategiche nei punti panoramici più spettacolari, caffè biologico caldo e consigli esperti di fotografia.',
      goldenHour: 'Ora d’Oro',
      goldenHourDesc: 'Orari ideali per la migliore luce fotografica',
      slowPace: 'Ritmo Rilassato',
      slowPaceDesc: 'Nessuna fretta dei soliti tour di massa',
      safeAcclimatization: 'Acclimatazione Sicura',
      safeAcclimatizationDesc: 'Ossigeno medico e pause preventive sul sentiero'
    },
    gallery: {
      badge: 'Galleria & Moodboard Andino',
      title: 'Scatti Reali dei Nostri Viaggiatori',
      subtitle: 'Foto autentiche scattate nella luce dorata del mattino senza filtri artificiali.',
      allPhotos: 'Vedi la Galleria Completa in Alta Definizione'
    },
    tours: {
      badge: 'Percorsi Panoramici Consigliati',
      title: 'Le Nostre Partenze Selezionate a Cusco',
      subtitle: 'Itinerari ideati per vivere la montagna senza fretta e con cura attenta di ogni dettaglio.',
      categories: {
        all: 'Tutti i Sentieri',
        lagunas: 'Lagune & Ghiacciai',
        montana: 'Alta Montagna',
        valle: 'Vallate & Cultura'
      },
      fromPrice: 'Quota per persona',
      difficulty: 'Difficoltà',
      duration: 'Durata',
      altitude: 'Altitudine max',
      seeDetails: 'Verifica Date'
    },
    journal: {
      badge: 'Programma della Giornata',
      title: 'Il Diario di Viaggio Passo dopo Passo',
      subtitle: 'Tempi comodi per camminare al tuo ritmo, respirare l’aria pura e fotografare paesaggi memorabili.'
    },
    mochila: {
      badge: 'Organizzazione & Trasparenza',
      title: 'Cosa include e cosa mettere nello zaino',
      subtitle: 'Prepariamo ogni dettaglio per rendere la tua escursione sicura, calda e piacevole.',
      tabIncludes: '✓ Cosa include il tour',
      tabNotIncludes: '✕ Cosa non include',
      tabBackpack: '🎒 Checklist dello Zaino',
      guaranteedNote: 'Tutti i nostri transfer privati dispongono di autisti professionisti e bombola di ossigeno medicale a bordo.'
    },
    fieldGuide: {
      badge: 'Consigli per il Trekking',
      title: 'Guida di Campo per l’Escursionista',
      subtitle: 'Indicazioni pratiche elaborate dalle nostre guide locali per vivere la montagna in perfetta armonia.',
      tips: [
        {
          title: 'Abbigliamento a Strati & Colori della Terra',
          desc: 'Consigliamo tonalità terracotta, senape, verde muschio o lana grezza. Creano un contrasto incantevole con il cielo azzurro e la neve perenne.',
          tag: 'Fotografia & Comfort'
        },
        {
          title: 'Respirazione Consapevole & Soroche',
          desc: 'Passo breve e costante respirando profondamente con il naso. L’infuso caldo di muña a colazione è il miglior alleato digestivo prima della salita.',
          tag: 'Acclimatamento'
        },
        {
          title: 'Turismo Sostenibile Senza Traccia',
          desc: 'Zero plastica monouso. Portiamo borracce riutilizzabili e rispettiamo le apachetas di pietra lasciate dalle comunità native andine.',
          tag: 'Rispetto delle Ande'
        }
      ]
    },
    reviews: {
      badge: 'Libro degli Ospiti & Recensioni',
      title: 'Le impressioni di chi ha camminato con noi',
      subtitle: 'Commenti sinceri di viaggiatori indipendenti, coppie e appassionati di fotografia.',
      verified: 'Viaggiatore Verificato',
      categories: {
        all: 'Tutte le Note',
        foto: 'Fotografia',
        trek: 'Trekking Andino',
        pareja: 'In Coppia'
      }
    },
    contact: {
      badge: 'Parliamo Direttamente',
      title: 'Hai domande sull’itinerario, il meteo o le date?',
      subtitle: 'Scrivici direttamente su WhatsApp per concordare le date di partenza e il numero di partecipanti con risposta immediata.',
      whatsappDirect: 'Chatta su WhatsApp con la Guida',
      phoneLabel: 'Linea Ufficiale WhatsApp / Telefono',
      hoursLabel: 'Orari di Assistenza',
      hoursValue: 'Lunedì a Domenica • 07:00 alle 21:00 (Fuso orario del Perù)'
    },
    footer: {
      madeWithLove: 'Creato con anima andina e profondo rispetto per la natura',
      rights: '© 2026 Cusco Creativos • Edizione Diario Andino. Operatore ufficiale registrato.',
      safeTravels: 'Sigillo Internazionale Safe Travels',
      dircetur: 'Licenza Ufficiale DIRCETUR Cusco'
    }
  }
};
