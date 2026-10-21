import { LandingData, ObjectiveType, TemplateType, LanguageType, PlanTier, CatalogTourItem, FAQItem, TestimonialItem } from '@/types/landing';
import { getSanitizedGuideAvatar } from '@/utils/guideAvatars';
export type { LandingData };

export const INITIAL_LANDINGS: LandingData[] = [
  {
    id: '1',
    name: 'Machu Picchu VIP & Valle Sagrado',
    slug: 'machu-picchu-vip',
    tier: 'advance',
    guideName: 'Carlos Mendoza',
    guideAvatar: '/images/tour-guide-carlos.jpg',
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
        'Vagón Hiram Bingham / Vistadome Panorámico:Viaja con música en vivo, cóctel de bienvenida Pisco Sour y coche observatorio con vistas 360°.',
        'Guía Historiador Privado:Acompañamiento exclusivo y personalizado por arqueólogo colegiado a tu propio ritmo.',
        'Gastronomía de Autor en Belmond Lodge:Almuerzo buffet gourmet a los pies de la ciudadela con ingredientes andinos selectos.',
        'Asistencia 24/7 & Concierge Privado:Coordinador de viaje permanente para traslados, equipaje y cualquier requerimiento especial.',
        'Boletos de Ingreso Preferente Machu Picchu:Acceso oficial garantizado en Circuito Clásico 1 o 2 sin filas ni demoras.',
        'Transporte Turístico Privado Puerta a Puerta:Traslados exclusivos en van moderna climatizada con chofer profesional y protocolo de altitud.'
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
      },
      {
        name: 'Camila & Laurent Fournier',
        origin: 'Lyon, Francia',
        comment: 'Organización impecable de principio a fin. El equipo siempre atento con el oxígeno y los boletos puntuales. ¡Machu Picchu superó todas nuestras expectativas!',
        rating: 5
      }
    ],
    officeAddress: 'Portal de Panes N° 123, Plaza de Armas, Centro Histórico, Cusco - Perú',
    officeHours: 'Lunes a Domingo: 08:00 AM – 08:00 PM (Horario Corrido)',
    mapsUrl: 'https://maps.google.com/?q=Plaza+de+Armas+Cusco+Peru',
    companyName: 'Cusco Grand Expeditions',
    companyRuc: 'RUC 20608945231',
    companyTagline: 'Operador Oficial Autorizado DIRCETUR Cusco',
    companyEmail: 'reservas@cuscograndexpeditions.com',
    logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    name: 'Salkantay Trek 5 Días a Machu Picchu',
    slug: 'salkantay-trek-5-dias',
    tier: 'advance',
    companyName: 'TrekExplorer Perú',
    companyRuc: 'RUC 20549832104',
    companyTagline: 'Especialistas en Aventura, Domos y Alta Montaña',
    companyEmail: 'aventura@trekexplorerperu.com',
    guideName: 'Marco Quispe',
    guideCert: 'Guía Oficial de Alta Montaña DIRCETUR & Rescatista',
    guideLanguages: 'Español, Quechua e Inglés Técnico',
    guideAvatar: '/images/tour-guide-marco.jpg',
    whatsapp: '+51984654321',
    price: '$380 USD',
    duration: '5 Días / 4 Noches',
    difficulty: 'Exigente - Alta Montaña (4,630 m)',
    destination: 'Cusco, Salkantay & Machu Picchu',
    altitude: '1,900 msnm - 4,630 msnm',
    groupType: 'Grupos Reducidos & Domos Sky VIP',
    targetAudience: 'Amantes del Trekking, Parejas y Aventureros',
    objective: 'both',
    template: 'adventure',
    language: 'es',
    languages: ['es', 'en', 'pt', 'fr', 'it'],
    status: 'published',
    date: '2026-09-07',
    views: '2,420',
    heroImage: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=2074&auto=format&fit=crop'
    ],
    hero: {
      badge: 'Expedición Oficial de Alta Montaña',
      title: 'Salkantay Trek 5 Días a Machu Picchu',
      subtitle: 'Desafía el legendario paso Salkantay a 4,630 msnm, duerme bajo las estrellas en domos geodésicos de cristal y culmina en la maravilla inca.',
      cta: 'Reservar Expedición ($380 USD)'
    },
    about: {
      title: 'La ruta de trekking más espectacular hacia Machu Picchu',
      content: 'Elegida entre los 25 mejores trekkings del mundo por National Geographic. Una travesía épica que une glaciares imponentes, campamentos en domos con vista estelar, ceja de selva con plantaciones de café orgánico, baños termales de Cocalmayo y la ciudadela sagrada de Machu Picchu.'
    },
    features: {
      title: 'Lo que incluye esta expedición de montaña',
      items: [
        'Noches en Sky Domes Geodésicos de Cristal:Campamentos privados con vista panorámica a la Vía Láctea y a los nevados Humantay y Salkantay.',
        'Guía de Alta Montaña Certificado DIRCETUR:Líder bilingüe acreditado con balón de oxígeno, botiquín de trauma y pulsioxímetro permanente.',
        'Chef de Montaña & Pensión Completa Gourmet:Desayunos energéticos, almuerzos buffet calientes, lonches con chocolate cusqueño y cenas nutritivas.',
        'Transporte Turístico & Caballos de Apoyo:Van privada Cusco - Mollepata y arrieros con mulas para transportar hasta 7 kg de tu equipaje.',
        'Boletos Oficiales de Tren Panorámico & Machu Picchu:Retorno en tren Expedition/Vistadome y boleto de ingreso oficial al circuito inca garantizado.',
        'Bastones de Trekking & Bolsas de Dormir Térmicas:Equipamiento profesional de montaña para climas bajo cero homologado para los Andes.'
      ]
    },
    includedServices: [
      'Transporte turístico privado ida y vuelta desde tu hotel en Cusco',
      'Noches de alojamiento en Domos de Cristal Sky Domes y hotel boutique en Aguas Calientes',
      'Todas las comidas gourmet de montaña preparadas por chef profesional',
      'Guía oficial colegiado DIRCETUR experto en alta montaña y primeros auxilios',
      'Caballos de carga y arrieros para equipaje personal (hasta 7 kg por persona)',
      'Balón de oxígeno medicinal de emergencia y botiquín de primeros auxilios 24/7',
      'Boletos oficiales de ingreso a Machu Picchu y tren panorámico de retorno a Ollantaytambo'
    ],
    faqs: [
      {
        q: '¿Cuál es el día más exigente de la caminata?',
        a: 'El Día 2 es el más demandante físicamente: se asciende desde Soraypampa (3,900 m) hasta el paso Salkantay (4,630 m) durante 4 horas y luego se desciende hacia Chaullay (2,900 m). Nuestro guía mantiene un ritmo constante y monitorea la oxigenación de cada viajero.'
      },
      {
        q: '¿Se necesita aclimatación previa en Cusco?',
        a: 'Sí, recomendamos estar en Cusco al menos 2 días antes de iniciar el trek para adaptarse a la altitud y disfrutar la caminata con total confort y seguridad.'
      },
      {
        q: '¿Qué peso puedo llevar en los caballos?',
        a: 'Te entregamos una bolsa de lona (duffle bag) donde puedes guardar hasta 7 kg de ropa y pertenencias que serán llevadas por los caballos durante los primeros 3 días.'
      },
      {
        q: '¿Cómo son los domos geodésicos en Soraypampa?',
        a: 'Son domos térmicos privados con techos de cristal templado transparente, camas confortables, sábanas abrigadoras y vista directa a las estrellas y a los glaciares.'
      }
    ],
    testimonials: [
      {
        name: 'Mathieu & Chloé Dupont',
        origin: 'París, Francia',
        comment: '¡La mejor experiencia de nuestras vidas! La noche en los domos mirando las estrellas frente al nevado Salkantay no tiene precio. Marco fue un guía excepcional.',
        rating: 5
      },
      {
        name: 'Liam & Emma Johnson',
        origin: 'Vancouver, Canadá',
        comment: 'Challenging but totally rewarding. The food prepared by the mountain chef was Michelin-level in the middle of the Andes. 10/10!',
        rating: 5
      },
      {
        name: 'Rodrigo & Mariana Silva',
        origin: 'São Paulo, Brasil',
        comment: 'Incrível! Tudo impecável: os domos, a comida quentinha, o cuidado com a altitude e a chegada triunfal em Machu Picchu.',
        rating: 5
      },
      {
        name: 'Carlos & Andrea Mendoza',
        origin: 'Buenos Aires, Argentina',
        comment: 'Excelente organización, puntualidad y seguridad en todo momento. Los bastones y el equipamiento fueron de primera.',
        rating: 5
      }
    ],
    trustBadges: [
      'Licencia DIRCETUR Oficial N° 2026-CUS',
      'Guías Colegiados de Alta Montaña',
      'Balón de Oxígeno & Monitoreo 24/7',
      'Domos de Cristal Certificados',
      'Sello Safe Travels Internacional'
    ],
    notIncluded: [
      'Bolsa de dormir térmica (disponible para alquiler por $20 USD)',
      'Ingreso opcional a las aguas termales de Cocalmayo (S/ 10 PEN)',
      'Almuerzo del día 5 en Aguas Calientes',
      'Propinas voluntarias para el guía, cocinero y arrieros'
    ],
    whatToBring: [
      'Pasaporte físico original vigente (indispensable para ingresar a Machu Picchu)',
      'Mochila de ataque de 20 a 30 litros para tus objetos personales de diario',
      'Botas de trekking con buen agarre y caña media',
      'Ropa térmica en capas, cortavientos impermeable y guantes de montaña',
      'Lentes de sol con protección UV, bloqueador solar SPF 50+ y gorro para el frío',
      'Pastillas para el mal de altura (soroche) y botella de agua reutilizable'
    ],
    itinerary: [
      {
        step: 'Día 1',
        title: 'Cusco - Mollepata - Soraypampa & Laguna Humantay',
        desc: 'Recojo a las 04:30 AM en Cusco. Desayuno en Mollepata y caminata hacia Soraypampa (3,900m). Ascenso por la tarde a la deslumbrante Laguna Humantay (4,200m). Cena andina y noche mágica en domos geodésicos bajo las estrellas.'
      },
      {
        step: 'Día 2',
        title: 'Soraypampa - Paso Salkantay (4,630m) - Chaullay',
        desc: 'Despertar con mate de coca caliente. Ascenso desafiante al punto más alto: el Paso Salkantay (4,630m) frente al glaciar. Ceremonia de pago a la tierra y descenso hacia el bosque nublado de Chaullay.'
      },
      {
        step: 'Día 3',
        title: 'Chaullay - Collpapampa - La Playa & Termas de Cocalmayo',
        desc: 'Caminata suave por senderos tropicales cruzando cascadas, plantaciones de café orgánico y orquídeas. Tarde de relajación en las aguas termales naturales de Cocalmayo en Santa Teresa.'
      },
      {
        step: 'Día 4',
        title: 'Hidroeléctrica - Vías del Tren - Aguas Calientes',
        desc: 'Recorrido escénico siguiendo las vías del tren rodeadas de flora subtropical y vistas de Huayna Picchu. Arribo al pueblo de Machu Picchu (Aguas Calientes), acomodación en hotel boutique y cena de coordinación.'
      },
      {
        step: 'Día 5',
        title: 'Ciudadela Inca de Machu Picchu & Tren a Cusco',
        desc: 'Ascenso en bus matutino a Machu Picchu. Recorrido guiado de 2.5 horas por los templos, recintos sagrados y mirador clásico. Por la tarde, tren escénico Expedition/Vistadome hacia Ollantaytambo y transfer privado a Cusco.'
      }
    ],
    officeAddress: 'Portal de Panes N° 123, Plaza de Armas, Centro Histórico, Cusco - Perú',
    officeHours: 'Lunes a Domingo: 07:00 AM – 09:00 PM (Atención 24/7 en WhatsApp)',
    mapsUrl: 'https://maps.google.com/?q=Plaza+de+Armas+Cusco+Peru'
  },
  {
    id: '3',
    name: 'City Tour Cusco Ancestral & 4 Ruinas Arqueológicas',
    slug: 'city-tour-cusco',
    tier: 'advance',
    companyName: 'Cusco Patrimonial Tours',
    companyTagline: 'Guías Arqueólogos Colegiados DIRCETUR',
    companyRuc: 'RUC 20604455662',
    companyEmail: 'reservas@cuscopatrimonial.com',
    guideName: 'Lucía Condori',
    guideCert: 'Arqueóloga Colegiada & Guía Oficial DIRCETUR',
    guideLanguages: 'Español, Inglés y Francés',
    guideAvatar: '/images/tour-guide-lucia.jpg',
    whatsapp: '+51984778899',
    price: 'S/ 85 PEN',
    duration: 'Media Jornada (4.5 Horas)',
    difficulty: 'Fácil (Apto para toda la familia)',
    destination: 'Cusco Histórico & Sacsayhuamán',
    altitude: '3,400 msnm - 3,700 msnm',
    groupType: 'Grupo Reducido (Máx. 12 pers.)',
    targetAudience: 'Familias, historiadores y viajeros culturales',
    objective: 'whatsapp',
    template: 'cultural',
    language: 'es',
    languages: ['es', 'en', 'pt', 'fr', 'it'],
    status: 'published',
    date: '2026-09-05',
    views: '2,108',
    heroImage: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=2074&auto=format&fit=crop'
    ],
    hero: {
      badge: 'Historia & Arqueología Imperial • DIRCETUR',
      title: 'City Tour Cusco Ancestral & 4 Ruinas Arqueológicas',
      subtitle: 'Descubre los enigmas de la arquitectura megalítica inca en Sacsayhuamán, Q’enqo, Puka Pukara y Tambomachay junto a una arqueóloga experta.',
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
    includedServices: [
      'Transporte turístico privado con aire acondicionado',
      'Guiado oficial por arqueóloga colegiada DIRCETUR',
      'Visita guiada al Templo del Sol (Qorikancha)',
      'Recorrido en Sacsayhuamán, Q’enqo, Puka Pukara y Tambomachay',
      'Balón de oxígeno y botiquin a bordo'
    ],
    trustBadges: [
      'Licencia Oficial DIRCETUR Cusco',
      'Sello Internacional Safe Travels',
      'Agencia Formal RUC 20 Verificado',
      'Guía Colegiado Bilïngüe',
      'Balón de Oxígeno & Botiquin de Altura'
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
      },
      {
        q: '¿Cuánto tiempo dura el tour completo?',
        a: 'El recorrido dura aproximadamente 4.5 horas (13:00 PM – 18:00 PM). Comenzamos en el Qorikancha y terminamos de regreso en la Plaza de Armas.'
      },
      {
        q: '¿Cómo confirmo mi lugar?',
        a: 'Escíbenos por WhatsApp con tu nombre, fecha deseada y cantidad de personas. Confirmamos en menos de 1 hora.'
      },
      {
        q: '¿El tour es apto para niños y adultos mayores?',
        a: 'Sí, el recorrido es fácil, a paso tranquilo y apto para todas las edades. Llevamos silla de ruedas y asistencia personalizada si se requiere.'
      }
    ],
    testimonials: [
      {
        name: 'Camila Ríos',
        origin: 'Bogotá, Colombia',
        comment: 'Lucía sabe muchísimo sobre la cultura inca. Nos resolvió cada duda y nos llevó a los mejores puntos para fotos. Increíble experiencia.',
        rating: 5
      },
      {
        name: 'Michael & Laura Thompson',
        origin: 'London, UK',
        comment: 'Outstanding guide! Lucia explained everything with such passion. Sacsayhuaman was breathtaking and the group was small enough to feel private.',
        rating: 5
      },
      {
        name: 'Familia García Pérez',
        origin: 'Buenos Aires, Argentina',
        comment: 'Fuimos con los abuelos y los niños. El ritmo fue perfecto, el transporte muy cómodo y la guía explicó de forma que hasta los más chicos entendían todo.',
        rating: 5
      },
      {
        name: 'Sophie & Marc Dubois',
        origin: 'Paris, France',
        comment: 'Magnifique expérience culturelle. Lucia parle français et a su captiver toute notre famille. Sacsayhuaman est grandiose!',
        rating: 5
      }
    ],
    officeAddress: 'Portal de Panes N° 156, Plaza de Armas, Centro Histórico, Cusco - Perú',
    officeHours: 'Lunes a Domingo: 08:00 AM – 07:00 PM (Horario Corrido)',
    mapsUrl: 'https://maps.google.com/?q=Plaza+de+Armas+Cusco+Peru'
  },
  {
    id: '4',
    name: 'Laguna Humantay Boho Journal',
    slug: 'laguna-humantay-boho',
    tier: 'advance',
    guideName: 'Camila Valdivia',
    guideAvatar: '/images/tour-guide-camila.jpg',
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
    guideAvatar: '/images/tour-guide-valdivia.jpg',
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
  },
  {
    id: '6',
    name: 'Cusco Luxury Collection VIP',
    slug: 'cusco-luxury-collection',
    tier: 'advance',
    guideName: 'Lic. Mateo Quispe & Concierge',
    guideCert: 'Guía Oficial Colegiado DIRCETUR Cusco — Carné N° 4812',
    guideLanguages: 'Español, English & Français',
    guideAvatar: '/images/tour-guide-carlos.jpg',
    whatsapp: '+51984123456',
    price: '$680 USD',
    duration: '2 Días / 1 Noche',
    difficulty: 'Confortable / Moderada',
    groupType: '100% Privado Exclusivo',
    targetAudience: 'Familias, Parejas VIP y Exploradores Exigentes',
    destination: 'Cusco, Valle Sagrado & Machu Picchu',
    altitude: '3,400 msnm',
    objective: 'both',
    template: 'premium',
    language: 'es',
    status: 'published',
    date: '2026-09-24',
    views: '1,450',
    heroImage: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop'
    ],
    hero: {
      badge: 'Experiencia Exclusiva VIP',
      title: 'Machu Picchu VIP & Tren Hiram Bingham',
      subtitle: 'Descubre la maravilla del mundo con traslados en Mercedes Benz, tren con coche observatorio de lujo y un guía historiador colegiado exclusivo para ti.',
      cta: 'Solicitar Cotización Privada'
    },
    about: {
      title: 'Un viaje sagrado diseñado para los más exigentes',
      content: 'Evita las largas colas y el estrés del turismo masivo. Nuestro servicio VIP te brinda acceso preferente, almuerzo gourmet en Belmond Sanctuary Lodge y asesoría personalizada de puerta a puerta.'
    },
    features: {
      title: 'Privilegios de la Experiencia Presidencial',
      items: [
        'Tren Belmond Hiram Bingham:Viaja con música en vivo, cóctel de bienvenida Pisco Sour y coche observatorio al aire libre.',
        'Guía Historiador Privado:Explicaciones profundas, historia viva y atención exclusiva al ritmo de tu grupo.',
        'Gastronomía de Autor en Belmond Lodge:Almuerzo buffet gourmet incluido a las faldas de la ciudadela sagrada.',
        'Asistencia 24/7 & Concierge Privado:Coordinador de viaje disponible permanentemente para cualquier solicitud o contingencia.',
        'Boletos Preferenciales Machu Picchu:Acceso oficial reservado con anticipación en circuito clásico sin colas ni esperas.',
        'Transporte Turístico Privado Puerta a Puerta:Traslados exclusivos en van ejecutiva climatizada con chofer profesional y protocolo de altitud.'
      ]
    },
    includedServices: [
      'Transporte turístico privado de alta gama (SUV ejecutiva climatizada con chofer profesional)',
      'Boletos de ingreso preferenciales y completos a todos los recintos arqueológicos y monumentos',
      'Tren panorámico de primera clase (Hiram Bingham de Belmond o Vistadome Observatory con servicio a bordo)',
      'Guía oficial historiador colegiado bilingüe dedicado exclusivamente a tu grupo sin apuros',
      'Gastronomía de autor: almuerzo gourmet de tiempos con maridaje o experiencia culinaria privada',
      'Protocolo de altitud: balón de oxígeno medicinal de emergencia, oxímetro de pulso y botiquín de altura',
      'Pick-up y drop-off de puerta a puerta en el lobby de tu hotel o villa en Cusco o Valle Sagrado',
      'Kit de bienvenida andino con amenidades selectas y servicio de conserjería personalizada 24/7'
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
        title: 'Cusco a Aguas Calientes en Tren de Lujo Hiram Bingham',
        desc: 'Recojo privado en tu hotel en Cusco hacia la estación. Viaje escénico a través de la cuenca del Valle Sagrado con música andina a bordo y vistas panorámicas. Llegada al pueblo de Machu Picchu e instalación en hotel boutique 5 estrellas.'
      },
      {
        step: 'Día 2',
        title: 'Exploración Mística de Machu Picchu & Almuerzo Gourmet',
        desc: 'Ascenso en bus exclusivo hacia la ciudadela inca. Visita guiada privada de 3 horas por los recintos sagrados, templos y terrazas. Almuerzo buffet de autor en Belmond Sanctuary Lodge y retorno en tren de primera clase a Cusco.'
      }
    ],
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
      'Licencia Oficial DIRCETUR Cusco',
      'Sello Internacional Safe Travels',
      'Operador Formal RUC 20 Verificado',
      'Atención Médica & Oxígeno Permanente'
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
    ],
    officeAddress: 'Portal de Carnicerías 236, Plaza de Armas, Centro Histórico, Cusco - Perú',
    officeHours: 'Lunes a Domingo: 07:00 AM – 09:00 PM (Horario Corrido)',
    mapsUrl: 'https://maps.google.com/?q=Plaza+de+Armas+Cusco+Peru'
  },
  {
    id: '7',
    name: 'Vive Tu Aventura (Diseño 6 Esmeralda)',
    slug: 'vive-tu-aventura-expediciones-trekking-cusco',
    tier: 'advance',
    guideName: 'Carlos Mendoza',
    guideCert: 'Licenciado DIRCETUR & Explorador Senior',
    guideLanguages: 'Español, Inglés y Francés',
    guideAvatar: '/images/tour-guide-carlos.jpg',
    whatsapp: '+51984123456',
    price: '$350 USD',
    duration: '4 Días / 3 Noches',
    difficulty: 'Moderada',
    groupType: 'Grupos Reducidos & Privados VIP',
    targetAudience: 'Aventureros, Creadores de Contenido y Parejas',
    destination: 'Machu Picchu, Salkantay & Rutas Exclusivas',
    altitude: '2,430 msnm - 4,630 msnm',
    objective: 'both',
    template: 'emerald-explorer',
    language: 'es',
    status: 'published',
    date: '2026-10-12',
    views: '1,890',
    heroImage: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop'
    ],
    hero: {
      badge: 'Expediciones & Trekking en Cusco',
      title: 'Vive Tu Aventura: Machu Picchu & Salkantay',
      subtitle: 'La experiencia definitiva en Cusco con estilo Deep Forest Teal, buscador interactivo, métricas de viajeros y microanimaciones de ultralujo.',
      cta: 'Planificar Mi Expedición'
    },
    about: {
      title: 'Filosofía de Expedición y Exploración Andina',
      content: 'Diseñamos vivencias transformadoras en los Andes combinando la adrenalina del trekking con la comodidad de un servicio boutique de alta gama.'
    },
    features: {
      title: 'Pilares de la Expedición Esmeralda',
      items: [
        'Transporte Turístico Privado 4x4:Vehículos modernos climatizados con chofer profesional y protocolo de altitud.',
        'Guía Oficial Bilingüe DIRCETUR:Acompañamiento especializado en flora, fauna e historia viva incaica.',
        'Monitoreo Médico 24/7:Balón de oxígeno medicinal portátil y control preventivo con oxímetro digital.',
        'Gastronomía Gourmet Andina:Alimentación energética balanceada preparada por cocineros de montaña.',
        'Accesos y Boletos Oficiales Garantizados:Gestión anticipada de circuitos a Machu Picchu y tren panorámico.',
        'Grupos Reducidos & Atención Personalizada:Máximo confort y flexibilidad adaptada a tu propio ritmo.'
      ]
    },
    includedServices: [
      'Transporte turístico privado 4x4 climatizado de puerta a puerta',
      'Boletos preferenciales de tren panorámico y accesos oficiales a Machu Picchu',
      'Guía oficial bilingüe DIRCETUR en todas las rutas y santuarios',
      'Monitoreo médico 24/7 con balón de oxígeno a bordo y botiquín de altitud',
      'Alimentación gourmet andina completa y degustaciones de café orgánico'
    ],
    notIncluded: [
      'Vuelos comerciales internacionales o domésticos',
      'Propinas voluntarias para guías y arrieros',
      'Seguro médico personal de viaje de alta montaña'
    ],
    whatToBring: [
      'Pasaporte original físico vigente (indispensable)',
      'Ropa térmica en capas y cortavientos impermeable',
      'Calzado de trekking con tracción impermeable',
      'Lentes con protección UV400 y bloqueador solar'
    ],
    trustBadges: [
      'Licencia Oficial DIRCETUR Cusco',
      'Sello Internacional Safe Travels',
      'Agencia Formal RUC 20 Verificado',
      'Guía Colegiado Bilingüe',
      'Balón de Oxígeno & Botiquín de Altura'
    ],
    itinerary: [
      {
        step: 'Día 1',
        title: 'Valle Sagrado & Aclimatación Escénica',
        desc: 'Recorrido por miradores andinos con almuerzo campestre orgánico y pernocte en domos de montaña.'
      },
      {
        step: 'Día 2',
        title: 'Ascenso al Abra Escénica & Fotografía',
        desc: 'Caminata a ritmo personalizado guiada por expertos con postales panorámicas del nevado sagrado.'
      },
      {
        step: 'Día 3',
        title: 'Amanecer en Machu Picchu Santuario',
        desc: 'Acceso preferente con historiador oficial y tiempo para capturar postales sin multitudes.'
      },
      {
        step: 'Día 4',
        title: 'Retorno Escénico en Tren Panorámico & Cusco',
        desc: 'Viaje en tren panorámico a través del cañón del Urubamba y transfer privado a tu hotel en Cusco.'
      }
    ],
    faqs: [
      {
        q: '¿Cómo funciona el protocolo de altura?',
        a: 'Llevamos oxígeno medicinal portátil y oxímetro digital en todos los tramos, con ritmo adaptativo para garantizar tu bienestar.'
      },
      {
        q: '¿Los boletos de tren y Machu Picchu están incluidos?',
        a: 'Sí, 100% garantizados y reservados con antelación en asientos preferenciales sin que tengas que hacer filas.'
      }
    ],
    testimonials: [
      {
        name: 'Camila & Laurent Fournier',
        origin: 'Lyon, Francia',
        comment: 'Organización impecable de principio a fin. El equipo siempre atento con el oxígeno y los boletos puntuales. ¡Superó todas nuestras expectativas!',
        rating: 5
      },
      {
        name: 'David Miller',
        origin: 'California, USA',
        comment: 'Zero stress, stunning scenery and top-notch equipment. The Deep Forest Teal style looks incredible!',
        rating: 5
      }
    ],
    officeAddress: 'Portal de Harinas 180, Plaza de Armas, Centro Histórico, Cusco - Perú',
    officeHours: 'Lunes a Domingo: 07:30 AM – 08:30 PM (Horario Corrido)',
    mapsUrl: 'https://maps.google.com/?q=Plaza+de+Armas+Cusco+Peru'
  }
];

const STORAGE_KEY = 'cusco_creativos_landings_v7';

export function getStoredLandings(): LandingData[] {
  if (typeof window === 'undefined') return INITIAL_LANDINGS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      // Check if previous versions had custom landings
      let migrated: LandingData[] = [...INITIAL_LANDINGS];
      try {
        const oldData = localStorage.getItem('cusco_creativos_landings_v6') || localStorage.getItem('cusco_creativos_landings_v5') || localStorage.getItem('cusco_creativos_landings_v4') || localStorage.getItem('cusco_creativos_landings_v3');
        if (oldData) {
          const oldList: LandingData[] = JSON.parse(oldData);
          if (Array.isArray(oldList)) {
            const initialIds = new Set(INITIAL_LANDINGS.map(l => l.id));
            const customItems = oldList.filter(l => !initialIds.has(l.id));
            migrated = [...INITIAL_LANDINGS, ...customItems];
          }
        }
      } catch {}
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
    let parsed: LandingData[] = JSON.parse(data);
    if (Array.isArray(parsed)) {
      // Limpiar automáticamente borradores con textos de prueba o slugs huérfanos
      const cleaned = parsed.filter(p => 
        !/FRFRFRFR|FEFRGRG|GGGTGTGT/i.test(p.slug || '') && 
        !/FRFRFRFR|FEFRGRG|GGGTGTGT/i.test(p.name || '') &&
        !(p.slug === 'salkantay-trek-5-dias' && p.id !== '2')
      );
      let updated = cleaned.length !== parsed.length;
      parsed = cleaned;

      const existingIds = new Set(parsed.map(item => item.id));
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
    console.error('Error saving landing to localStorage, attempting quota recovery', err);
    try {
      // Si la cuota de localStorage se llenó, guardar prioritariamente la landing activa
      localStorage.setItem(STORAGE_KEY, JSON.stringify([landing]));
    } catch (fallbackErr) {
      console.error('Fatal: localStorage quota exceeded even for single landing', fallbackErr);
    }
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

export function resetAllLandingsToDefault(): LandingData[] {
  if (typeof window === 'undefined') return INITIAL_LANDINGS;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LANDINGS));
    return [...INITIAL_LANDINGS];
  } catch {
    return [...INITIAL_LANDINGS];
  }
}

export function resetCurrentLanding(idOrSlug: string, fallbackTemplate?: TemplateType): LandingData | null {
  if (typeof window === 'undefined') return null;
  try {
    let initial = INITIAL_LANDINGS.find(
      l => l.id === idOrSlug || l.slug.toLowerCase() === idOrSlug.toLowerCase()
    );
    if (!initial && fallbackTemplate) {
      initial = INITIAL_LANDINGS.find(l => l.template === fallbackTemplate);
    }
    if (!initial) {
      initial = INITIAL_LANDINGS.find(l => l.template === idOrSlug as TemplateType);
    }

    if (initial) {
      const list = getStoredLandings();
      const idx = list.findIndex(
        l => l.id === idOrSlug || l.slug.toLowerCase() === idOrSlug.toLowerCase() || l.id === initial!.id
      );
      if (idx >= 0) {
        list[idx] = { ...initial };
      } else {
        list.push({ ...initial });
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return { ...initial };
    }
    return null;
  } catch {
    return null;
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
  languages?: LanguageType[];
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
  catalogTours?: CatalogTourItem[];
  officeAddress?: string;
  officeHours?: string;
  mapsUrl?: string;
  faqs?: FAQItem[];
  testimonials?: TestimonialItem[];
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroCta?: string;
  aboutTitle?: string;
  aboutContent?: string;
  featuresTitle?: string;
  companyName?: string;
  logoUrl?: string;
  companyRuc?: string;
  companyTagline?: string;
  companyEmail?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    tripadvisor?: string;
  };
}): LandingData {
  const slug = params.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const tier = params.tier || 'advance';
  const isFreeOrBasic = tier === 'free' || tier === 'basic';
  // Planes Gratuito y Básico siempre se generan en idioma español por defecto
  const lang: LanguageType = isFreeOrBasic ? 'es' : (params.language || 'es');
  const isEn = lang === 'en';
  const isPt = lang === 'pt';
  const isFr = lang === 'fr';
  const isIt = lang === 'it';
  const isWhatsapp = params.objective === 'whatsapp';
  const isBoth = params.objective === 'both';

  let heroTitle = params.heroTitle?.trim() || params.name;
  let heroSubtitle = params.heroSubtitle?.trim() || params.description || 'Vive una aventura inolvidable con guías expertos locales y atención de primer nivel.';
  let heroBadge = params.heroBadge?.trim() || (params.destination ? `${params.destination} • ${params.duration || 'Cusco'}` : (params.template === 'agency-portal' ? 'Portal Oficial • Operador Autorizado' : params.template === 'emerald-explorer' ? 'Emerald Explorer • Alta Montaña' : params.template === 'premium' ? 'Experiencia Exclusiva VIP' : params.template === 'cultural' ? 'Historia y Cultura Andina' : 'Aventura y Naturaleza'));
  let ctaText = params.heroCta?.trim() || (isBoth 
    ? 'WhatsApp & Cotizar Online' 
    : (isWhatsapp ? 'Reservar Directo por WhatsApp' : 'Solicitar Cotización y Disponibilidad'));

  if (isEn) {
    heroTitle = params.heroTitle?.trim() || params.name;
    heroSubtitle = params.heroSubtitle?.trim() || params.description || 'Live an unforgettable Andean adventure with top certified local guides and premium service.';
    heroBadge = params.heroBadge?.trim() || (params.destination ? `${params.destination} • ${params.duration || 'Cusco'}` : 'Official Agency Portal');
    ctaText = params.heroCta?.trim() || (isBoth ? 'WhatsApp & Online Quote' : (isWhatsapp ? 'Book via WhatsApp' : 'Request Instant Quote'));
  } else if (isPt) {
    heroTitle = params.heroTitle?.trim() || params.name;
    heroSubtitle = params.heroSubtitle?.trim() || params.description || 'Viva uma aventura andina inesquecível com guias locais certificados e atendimento de primeiro nível.';
    heroBadge = params.heroBadge?.trim() || (params.destination ? `${params.destination} • ${params.duration || 'Cusco'}` : 'Portal Oficial da Agência');
    ctaText = params.heroCta?.trim() || (isBoth ? 'WhatsApp & Orçamento Online' : (isWhatsapp ? 'Reservar pelo WhatsApp' : 'Solicitar Orçamento Grátis'));
  } else if (isFr) {
    heroTitle = params.heroTitle?.trim() || params.name;
    heroSubtitle = params.heroSubtitle?.trim() || params.description || 'Vivez une aventure inoubliable avec des guides locaux experts et une assistance sur mesure.';
    heroBadge = params.heroBadge?.trim() || (params.destination ? `${params.destination} • ${params.duration || 'Cusco'}` : "Portail Officiel de l'Agence");
    ctaText = params.heroCta?.trim() || (isBoth ? 'WhatsApp & Devis en Ligne' : (isWhatsapp ? 'Réserver via WhatsApp' : 'Demander un Devis Gratuit'));
  } else if (isIt) {
    heroTitle = params.heroTitle?.trim() || params.name;
    heroSubtitle = params.heroSubtitle?.trim() || params.description || "Vivi un'avventura indimenticabile sulle Ande con guide locali certificate e massima assistenza.";
    heroBadge = params.heroBadge?.trim() || (params.destination ? `${params.destination} • ${params.duration || 'Cusco'}` : "Portale Ufficiale dell'Agenzia");
    ctaText = params.heroCta?.trim() || (isBoth ? 'WhatsApp & Preventivo Online' : (isWhatsapp ? 'Prenota su WhatsApp' : 'Richiedi Preventivo Gratuito'));
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
      name: 'David & Sarah Miller',
      origin: 'Austin, Texas (USA)',
      comment: `Incredible experience with ${params.guideName || 'the team'}! Truly unforgettable landscapes, top gear, and outstanding organization from start to finish.`,
      rating: 5
    },
    {
      name: 'Sarah Jenkins',
      origin: 'London, UK',
      comment: `Reaching the mountain pass with ${params.guideName || 'our guide'} was the highlight of our trip to Peru. Caring, professional, and authentic.`,
      rating: 5
    },
    {
      name: 'Matthieu & Élodie Laurent',
      origin: 'Lyon, France',
      comment: 'Une organisation sans faille et des paysages grandioses. Tout le matériel était parfait et les repas en campement délicieux.',
      rating: 5
    },
    {
      name: 'Lucas & Sofia Valdivia',
      origin: 'Santiago, Chile',
      comment: 'Superó todas nuestras expectativas. La paciencia para la aclimatación y el trato humano fueron de 10 estrellas.',
      rating: 5
    }
  ] : [
    {
      name: 'Martín y Claudia Flores',
      origin: 'Lima, Perú',
      comment: `Superó todas nuestras expectativas. La atención de ${params.guideName || 'nuestro guía'} y las medidas de seguridad fueron impecables de principio a fin.`,
      rating: 5
    },
    {
      name: 'David & Sarah Miller',
      origin: 'Austin, Texas (USA)',
      comment: `La mejor expedición de nuestras vidas. Los paisajes sagrados, la comida caliente en la montaña y el profesionalismo de ${params.guideName || 'los guías'} fueron increíbles.`,
      rating: 5
    },
    {
      name: 'Matthieu & Élodie Laurent',
      origin: 'Lyon, Francia',
      comment: 'Una experiencia única en los Andes. Excelente ritmo de caminata, respeto por la naturaleza y asistencia permanente de oxígeno.',
      rating: 5
    },
    {
      name: 'Sofía y Lucas Valdivia',
      origin: 'Santiago, Chile',
      comment: 'Todo el equipo nos hizo sentir como en familia. Puntuales en el recojo, equipo técnico de primera y postales inolvidables.',
      rating: 5
    }
  ];

  return {
    id: Date.now().toString(),
    name: params.name,
    slug: slug || 'tour-nuevo',
    tier,
    guideName: params.guideName || 'Guía Cusco Creativos',
    guideCert: params.guideCert || 'Guía Oficial Colegiado DIRCETUR',
    guideLanguages: params.guideLanguages || 'Español, Inglés y Francés',
    guideAvatar: getSanitizedGuideAvatar(params.guideAvatar, params.guideName),
    destination: params.destination || 'Cusco, Perú',
    altitude: params.altitude || '3,400 msnm',
    groupType: params.groupType || 'Grupo Reducido',
    targetAudience: params.targetAudience || 'Aventureros y viajeros culturales',
    aiTone: params.aiTone || 'aventurero',
    includedServices: params.includedServices && params.includedServices.length > 0 ? params.includedServices : [
      'Transporte turístico privado con chofer profesional',
      'Guía oficial colegiado bilingüe especializado',
      'Balón de oxígeno medicinal y botiquín de primeros auxilios',
      'Asistencia personalizada 24/7 vía WhatsApp'
    ],
    whatsapp: params.whatsapp || '+51984000000',
    price: params.price || 'Consultar',
    duration: params.duration || 'Full Day',
    difficulty: params.difficulty || 'Moderada',
    objective: params.objective,
    template: params.template,
    language: lang,
    languages: isFreeOrBasic ? ['es'] : (params.languages && params.languages.length > 0 ? params.languages : [lang]),
    status: 'draft',
    date: new Date().toISOString().split('T')[0],
    views: '0',
    heroImage: params.heroImage || 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
    galleryImages: params.galleryImages || [
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop'
    ],
    hero: {
      badge: params.heroBadge || heroBadge,
      title: params.heroTitle || heroTitle,
      subtitle: params.heroSubtitle || heroSubtitle,
      cta: params.heroCta || ctaText
    },
    about: {
      title: params.aboutTitle || aboutTitle,
      content: params.aboutContent || aboutContent
    },
    features: {
      title: params.featuresTitle || (isEn ? 'What makes this tour exceptional?' : '¿Qué hace inolvidable esta experiencia?'),
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
    faqs: params.faqs && params.faqs.length > 0 ? params.faqs : faqs,
    testimonials: params.testimonials && params.testimonials.length > 0 ? params.testimonials : testimonials,
    catalogTours: params.catalogTours,
    officeAddress: params.officeAddress,
    officeHours: params.officeHours,
    companyName: params.companyName?.trim() || undefined,
    logoUrl: params.logoUrl?.trim() || undefined,
    companyRuc: params.companyRuc,
    companyTagline: params.companyTagline,
    companyEmail: params.companyEmail,
    socialLinks: params.socialLinks
  };
}
