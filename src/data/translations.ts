import { LanguageType, ItineraryItem, FAQItem } from '@/types/landing';

// Mapeo exhaustivo de frases, títulos, descripciones y términos turísticos a los 5 idiomas
const PHRASE_MAP: Record<string, Record<LanguageType, string>> = {
  // --- TÍTULOS DE TOURS Y HERO ---
  'Machu Picchu de Lujo con Tren Panorámico': {
    es: 'Machu Picchu de Lujo con Tren Panorámico',
    en: 'Luxury Machu Picchu with Scenic Panoramic Train',
    pt: 'Machu Picchu de Luxo com Trem Panorâmico',
    fr: 'Machu Picchu de Luxe avec Train Panoramique',
    it: 'Machu Picchu di Lusso con Treno Panoramico'
  },
  'Machu Picchu VIP': {
    es: 'Machu Picchu VIP',
    en: 'Machu Picchu VIP Experience',
    pt: 'Machu Picchu VIP Exclusivo',
    fr: 'Machu Picchu VIP Exclusif',
    it: 'Machu Picchu VIP Esclusivo'
  },
  'Portal Oficial de Agencia de Viajes Perú': {
    es: 'Portal Oficial de Agencia de Viajes Perú',
    en: 'Official Peru Travel Agency Portal & Tours',
    pt: 'Portal Oficial da Agência de Viagens Peru',
    fr: 'Portail Officiel de l’Agence de Voyages Pérou',
    it: 'Portale Ufficiale dell’Agenzia Viaggi Perù'
  },
  'Tour Salkantay Trek Clásico hacia Machu Picchu': {
    es: 'Tour Salkantay Trek Clásico hacia Machu Picchu',
    en: 'Classic Salkantay Trek to Machu Picchu 5D',
    pt: 'Trilha Salkantay Clássica para Machu Picchu 5D',
    fr: 'Trek Salkantay Classique vers le Machu Picchu 5J',
    it: 'Trek Salkantay Classico verso Machu Picchu 5G'
  },
  'City Tour Cusco Ancestral & 4 Ruinas Arqueológicas': {
    es: 'City Tour Cusco Ancestral & 4 Ruinas Arqueológicas',
    en: 'Ancestral Cusco City Tour & 4 Archaeological Ruins',
    pt: 'City Tour Cusco Ancestral & 4 Sítios Arqueológicos',
    fr: 'City Tour Cusco Ancestral & 4 Sites Archéologiques',
    it: 'City Tour Cusco Ancestrale & 4 Siti Archeologici'
  },
  'Montaña de 7 Colores & Valle Rojo': {
    es: 'Montaña de 7 Colores & Valle Rojo',
    en: 'Rainbow Mountain (Vinicunca) & Red Valley VIP',
    pt: 'Montanha das 7 Cores (Vinicunca) & Vale Vermelho',
    fr: 'Montagne des 7 Couleurs (Vinicunca) & Vallée Rouge',
    it: 'Montagna dei 7 Colori (Vinicunca) & Valle Rossa'
  },
  'Laguna Humantay Turquesa & Glaciar': {
    es: 'Laguna Humantay Turquesa & Glaciar',
    en: 'Turquoise Humantay Lake & Glacier Trek',
    pt: 'Laguna Humantay Turquesa & Geleira Andina',
    fr: 'Lagune Humantay Turquoise & Glacier Andin',
    it: 'Laguna Humantay Turchese & Ghiacciaio Andino'
  },
  'Valle Sagrado de los Incas VIP': {
    es: 'Valle Sagrado de los Incas VIP',
    en: 'Sacred Valley of the Incas VIP Cultural Journey',
    pt: 'Vale Sagrado dos Incas VIP & Cultura Viva',
    fr: 'Vallée Sacrée des Incas VIP & Culture Vivante',
    it: 'Valle Sacra degli Inca VIP & Cultura Viva'
  },

  // --- SUBTÍTULOS Y DESCRIPCIONES ---
  'Descubre la maravilla del mundo con traslados privados, hoteles 5 estrellas y un guía oficial exclusivo para ti y tu familia.': {
    es: 'Descubre la maravilla del mundo con traslados privados, hoteles 5 estrellas y un guía oficial exclusivo para ti y tu familia.',
    en: 'Discover the wonder of the world with private luxury transfers, 5-star comfort and an official certified historian guide dedicated exclusively to you and your family.',
    pt: 'Descubra a maravilha do mundo com traslados privados, conforto 5 estrelas e um guia oficial exclusivo para você e sua família.',
    fr: 'Découvrez la merveille du monde avec transferts privés, confort 5 étoiles et un guide officiel exclusif pour vous et votre famille.',
    it: 'Scopri la meraviglia del mondo con trasferimenti privati, comfort a 5 stelle e una guida ufficiale esclusiva per te e la tua famiglia.'
  },
  'Montaña de 7 Colores & Valle Rojo • Vive la magia de los Andes con operadores colegiados y salidas diarias.': {
    es: 'Montaña de 7 Colores & Valle Rojo • Vive la magia de los Andes con operadores colegiados y salidas diarias.',
    en: 'Rainbow Mountain & Red Valley • Experience the magic of the Andes with official accredited tour operators and guaranteed daily departures.',
    pt: 'Montanha das 7 Cores & Vale Vermelho • Viva a magia dos Andes com operadores credenciados e saídas diárias garantidas.',
    fr: 'Montagne des 7 Couleurs & Vallée Rouge • Vivez la magie des Andes avec des opérateurs agréés et des départs quotidiens garantis.',
    it: 'Montagna dei 7 Colori & Valle Rossa • Vivi la magia delle Ande con operatori abilitati e partenze giornaliere garantite.'
  },
  'Portal completo de agencia turística con catálogo de excursiones, métricas de satisfacción, itinerarios multidía y atención personalizada.': {
    es: 'Portal completo de agencia turística con catálogo de excursiones, métricas de satisfacción, itinerarios multidía y atención personalizada.',
    en: 'Comprehensive tourism agency portal with curated tour catalog, verified satisfaction metrics, multi-day circuits and personalized 24/7 care.',
    pt: 'Portal completo de agência turística com catálogo de passeios, métricas de satisfação, itinerários multidias e atendimento personalizado 24/7.',
    fr: 'Portail complet d’agence touristique avec catalogue d’excursions, indicateurs de satisfaction, circuits multi-jours et assistance personnalisée 24/7.',
    it: 'Portale completo di agenzia turistica con catalogo di escursioni, parametri di soddisfazione, itinerari multigiorno e assistenza personalizzata 24/7.'
  },
  'Un trekking legendario de alta montaña cruzando nevados imponentes, ceja de selva y plantaciones de café hasta la ciudadela inca de Machu Picchu.': {
    es: 'Un trekking legendario de alta montaña cruzando nevados imponentes, ceja de selva y plantaciones de café hasta la ciudadela inca de Machu Picchu.',
    en: 'A legendary high-mountain trek crossing towering glaciers, cloud forests and coffee plantations all the way to the Inca citadel of Machu Picchu.',
    pt: 'Uma trilha lendária de alta montanha cruzando geleiras imponentes, selva alta e plantações de café até a cidadela inca de Machu Picchu.',
    fr: 'Un trek légendaire de haute montagne traversant des glaciers majestueux, la forêt de nuages et des plantations de café jusqu’à la citadelle inca du Machu Picchu.',
    it: 'Un trek leggendario d’alta montagna attraverso ghiacciai imponenti, foresta pluviale e piantagioni di caffè fino alla cittadella inca di Machu Picchu.'
  },
  'Experiencia cinco estrellas diseñada para quienes valoran la privacidad, gastronomía andina de autor y el acceso preferencial sin colas.': {
    es: 'Experiencia cinco estrellas diseñada para quienes valoran la privacidad, gastronomía andina de autor y el acceso preferencial sin colas.',
    en: 'Five-star luxury experience designed for those who cherish total privacy, signature Andean gastronomy, and VIP skip-the-line access.',
    pt: 'Experiência cinco estrelas projetada para quem valoriza privacidade total, gastronomia andina autoral e acesso VIP sem filas.',
    fr: 'Expérience cinq étoiles conçue pour ceux qui recherchent l’intimité, la gastronomie andine signature et un accès VIP coupe-file.',
    it: 'Esperienza a cinque stelle pensata per chi desidera totale privacy, gastronomia andina d’autore e accesso VIP senza code.'
  },
  'Descubre los enigmas de la arquitectura megalítica inca en Sacsayhuamán, Q’enqo, Puka Pukara y Tambomachay junto a una arqueóloga experta.': {
    es: 'Descubre los enigmas de la arquitectura megalítica inca en Sacsayhuamán, Q’enqo, Puka Pukara y Tambomachay junto a una arqueóloga experta.',
    en: 'Discover the mysteries of megalithic Inca architecture at Sacsayhuamán, Q’enqo, Puka Pukara and Tambomachay alongside an expert archaeologist.',
    pt: 'Descubra os mistérios da arquitetura megalítica inca em Sacsayhuamán, Q’enqo, Puka Pukara e Tambomachay com uma arqueóloga especialista.',
    fr: 'Découvrez les mystères de l’architecture mégalithique inca à Sacsayhuamán, Q’enqo, Puka Pukara et Tambomachay aux côtés d’une archéologue experte.',
    it: 'Scopri i misteri dell’architettura megalitica inca a Sacsayhuamán, Q’enqo, Puka Pukara e Tambomachay insieme a un’archeologa esperta.'
  },
  'Vive una aventura inolvidable con guías expertos locales y atención de primer nivel.': {
    es: 'Vive una aventura inolvidable con guías expertos locales y atención de primer nivel.',
    en: 'Experience an unforgettable Andean adventure with certified local guides and premier 5-star service.',
    pt: 'Viva uma aventura inesquecível com guias locais certificados e atendimento de primeiro nível.',
    fr: 'Vivez une aventure inoubliable avec des guides locaux experts et un service d’excellence.',
    it: 'Vivi un’avventura indimenticabile con guide locali esperte e assistenza di primo livello.'
  },

  // --- SECCIÓN SOBRE NOSOTROS (ABOUT) ---
  'Un viaje sagrado diseñado para los más exigentes': {
    es: 'Un viaje sagrado diseñado para los más exigentes',
    en: 'A Sacred Journey Tailored for the Most Discerning Travelers',
    pt: 'Uma Viagem Sagrada Feita para os Mais Exigentes',
    fr: 'Un Voyage Sacré Conçu pour les Voyageurs les Plus Exigeants',
    it: 'Un Viaggio Sacro Disegnato per i Viaggiatori Più Esigenti'
  },
  'Sobre Nosotros': {
    es: 'Sobre Nosotros',
    en: 'About Us',
    pt: 'Sobre Nós',
    fr: 'À Propos de Nous',
    it: 'Chi Siamo'
  },
  'Operador turístico oficial y formal en Cusco.': {
    es: 'Operador turístico oficial y formal en Cusco.',
    en: 'Official certified tourism operator in Cusco with proven excellence.',
    pt: 'Operador turístico oficial e registrado em Cusco com excelência comprovada.',
    fr: 'Opérateur touristique officiel et agréé à Cusco avec excellence reconnue.',
    it: 'Operatore turistico ufficiale e autorizzato a Cusco con comprovata eccellenza.'
  },
  'Evita las largas colas y el estrés del turismo masivo. Nuestro servicio VIP te brinda acceso preferente, almuerzo gourmet en Belmond Sanctuary Lodge y asesoría personalizada de puerta a puerta.': {
    es: 'Evita las largas colas y el estrés del turismo masivo. Nuestro servicio VIP te brinda acceso preferente, almuerzo gourmet en Belmond Sanctuary Lodge y asesoría personalizada de puerta a puerta.',
    en: 'Skip the long lines and mass tourism stress. Our VIP service grants priority entry, gourmet buffet lunch at Belmond Sanctuary Lodge, and personalized door-to-door concierge.',
    pt: 'Evite as longas filas e o estresse do turismo massivo. Nosso serviço VIP oferece acesso preferencial, almoço gourmet no Belmond Sanctuary Lodge e assessoria personalizada de porta a porta.',
    fr: 'Évitez les longues files d’attente et le stress du tourisme de masse. Notre service VIP vous offre un accès prioritaire, un déjeuner gastronomique au Belmond Sanctuary Lodge et une conciergerie personnalisée porte-à-porte.',
    it: 'Evita le lunghe code e lo stress del turismo di massa. Il nostro servizio VIP garantisce accesso prioritario, pranzo gourmet al Belmond Sanctuary Lodge e assistenza personalizzata porta a porta.'
  },

  // --- DESTINOS ---
  'Cusco, Machu Picchu & Rutas del Perú': {
    es: 'Cusco, Machu Picchu & Rutas del Perú',
    en: 'Cusco, Machu Picchu & Scenic Peru Routes',
    pt: 'Cusco, Machu Picchu & Rotas do Peru',
    fr: 'Cusco, Machu Picchu & Circuits du Pérou',
    it: 'Cusco, Machu Picchu & Percorsi del Perù'
  },
  'Machu Picchu & Cordillera Vilcabamba': {
    es: 'Machu Picchu & Cordillera Vilcabamba',
    en: 'Machu Picchu & Vilcabamba Range',
    pt: 'Machu Picchu & Cordilheira Vilcabamba',
    fr: 'Machu Picchu & Cordillère Vilcabamba',
    it: 'Machu Picchu & Cordigliera Vilcabamba'
  },
  'Santuario Histórico de Machu Picchu': {
    es: 'Santuario Histórico de Machu Picchu',
    en: 'Historic Sanctuary of Machu Picchu',
    pt: 'Santuário Histórico de Machu Picchu',
    fr: 'Sanctuaire Historique du Machu Picchu',
    it: 'Santuario Storico di Machu Picchu'
  },
  'Cusco Histórico & Sacsayhuamán': {
    es: 'Cusco Histórico & Sacsayhuamán',
    en: 'Historic Cusco & Sacsayhuamán',
    pt: 'Cusco Histórico & Sacsayhuamán',
    fr: 'Cusco Historique & Sacsayhuamán',
    it: 'Cusco Storico & Sacsayhuamán'
  },
  'Cusco, Perú': {
    es: 'Cusco, Perú',
    en: 'Cusco, Peru',
    pt: 'Cusco, Peru',
    fr: 'Cusco, Pérou',
    it: 'Cusco, Perù'
  },

  // --- FICHA TÉCNICA VALORES ---
  'Viajeros Internacionales, Parejas y Familias': {
    es: 'Viajeros Internacionales, Parejas y Familias',
    en: 'International Travelers, Couples & Families',
    pt: 'Viajantes Internacionais, Casais e Famílias',
    fr: 'Voyageurs Internationaux, Couples et Familles',
    it: 'Viaggiatori Internazionali, Coppie e Famiglie'
  },
  'Aventureros y Amantes del Trekking': {
    es: 'Aventureros y Amantes del Trekking',
    en: 'Adventurers & Trekking Enthusiasts',
    pt: 'Aventureiros e Amantes de Trekking',
    fr: 'Aventuriers et Passionnés de Trekking',
    it: 'Avventurieri e Amanti del Trekking'
  },
  'Parejas, Lunas de Miel y Viajeros Confort': {
    es: 'Parejas, Lunas de Miel y Viajeros Confort',
    en: 'Couples, Honeymooners & Comfort Travelers',
    pt: 'Casais, Luas de Mel e Viajantes Conforto',
    fr: 'Couples, Lunes de Miel et Voyageurs Confort',
    it: 'Coppie, Lune di Miele e Viaggiatori Comfort'
  },
  'Familias, historiadores y viajeros culturales': {
    es: 'Familias, historiadores y viajeros culturales',
    en: 'Families, Historians & Cultural Travelers',
    pt: 'Famílias, Historiadores e Viajantes Culturais',
    fr: 'Familles, Historiens et Voyageurs Culturels',
    it: 'Famiglie, Storici e Viaggiatori Culturali'
  },
  'Tours Privados & Compartidos VIP': {
    es: 'Tours Privados & Compartidos VIP',
    en: 'Private VIP & Premium Small Group Tours',
    pt: 'Tours Privados & Grupos Reduzidos VIP',
    fr: 'Visites Privées VIP & Petits Groupes',
    it: 'Tour Privati VIP & Piccoli Gruppi'
  },
  'Grupo Reducido (Máx. 8 pers.)': {
    es: 'Grupo Reducido (Máx. 8 pers.)',
    en: 'Small Group (Max 8 travelers)',
    pt: 'Grupo Reduzido (Máx. 8 pessoas)',
    fr: 'Petit Groupe (Max 8 personnes)',
    it: 'Piccolo Gruppo (Max 8 persone)'
  },
  'Tour Privado Exclusivo': {
    es: 'Tour Privado Exclusivo',
    en: 'Exclusive Private Tour',
    pt: 'Tour Privado Exclusivo',
    fr: 'Visite Privée Exclusive',
    it: 'Tour Privato Esclusivo'
  },
  'Grupo Reducido (Máx. 12 pers.)': {
    es: 'Grupo Reducido (Máx. 12 pers.)',
    en: 'Small Group (Max 12 travelers)',
    pt: 'Grupo Reduzido (Máx. 12 pessoas)',
    fr: 'Petit Groupe (Max 12 personnes)',
    it: 'Piccolo Gruppo (Max 12 persone)'
  },
  'Fácil - Moderada': {
    es: 'Fácil - Moderada',
    en: 'Easy - Moderate',
    pt: 'Fácil - Moderada',
    fr: 'Facile - Modérée',
    it: 'Facile - Moderata'
  },
  'Moderada - Alta': {
    es: 'Moderada - Alta',
    en: 'Moderate - Challenging',
    pt: 'Moderada - Alta',
    fr: 'Modérée - Soutenue',
    it: 'Moderata - Impegnativa'
  },
  'Fácil (Confort familiar)': {
    es: 'Fácil (Confort familiar)',
    en: 'Easy (Family Comfort)',
    pt: 'Fácil (Conforto Familiar)',
    fr: 'Facile (Confort Familial)',
    it: 'Facile (Comfort Familiare)'
  },
  'Fácil (Apto para toda la familia)': {
    es: 'Fácil (Apto para toda la familia)',
    en: 'Easy (Suitable for all ages)',
    pt: 'Fácil (Apropriado para toda a família)',
    fr: 'Facile (Adapté à toute la famille)',
    it: 'Facile (Adatto a tutta la famiglia)'
  },
  'Catálogo Multidía & Full Days': {
    es: 'Catálogo Multidía & Full Days',
    en: 'Multi-day Packages & Full Days',
    pt: 'Pacotes Multidias & Dias Inteiros',
    fr: 'Forfaits Multi-Jours & Journées Complètes',
    it: 'Pacchetti Multigiorno & Giornate Intere'
  },
  '5 Días / 4 Noches': {
    es: '5 Días / 4 Noches',
    en: '5 Days / 4 Nights',
    pt: '5 Dias / 4 Noites',
    fr: '5 Jours / 4 Nuits',
    it: '5 Giorni / 4 Notti'
  },
  'Full Day Exclusivo': {
    es: 'Full Day Exclusivo',
    en: 'Exclusive Full Day',
    pt: 'Dia Inteiro Exclusivo',
    fr: 'Journée Complète Exclusive',
    it: 'Giornata Intera Esclusiva'
  },
  'Media Jornada (4.5 Horas)': {
    es: 'Media Jornada (4.5 Horas)',
    en: 'Half Day (4.5 Hours)',
    pt: 'Meio Dia (4.5 Horas)',
    fr: 'Demi-Journée (4.5 Heures)',
    it: 'Mezza Giornata (4.5 Ore)'
  },
  '2 Días / 1 Noche': {
    es: '2 Días / 1 Noche',
    en: '2 Days / 1 Night',
    pt: '2 Dias / 1 Noite',
    fr: '2 Jours / 1 Nuit',
    it: '2 Giorni / 1 Notte'
  },

  // --- PERFIL DEL GUÍA ---
  'Licenciado DIRCETUR & Operador Autorizado': {
    es: 'Licenciado DIRCETUR & Operador Autorizado',
    en: 'Licensed by DIRCETUR & Authorized Operator',
    pt: 'Licenciado pela DIRCETUR & Operador Autorizado',
    fr: 'Agréé par la DIRCETUR & Opérateur Autorisé',
    it: 'Abilitato dalla DIRCETUR & Operatore Autorizzato'
  },
  'Licenciado en Turismo DIRCETUR (10 años exp.)': {
    es: 'Licenciado en Turismo DIRCETUR (10 años exp.)',
    en: 'Degree in Tourism, DIRCETUR Certified (10 yrs exp.)',
    pt: 'Bacharel em Turismo, Certificado DIRCETUR (10 anos exp.)',
    fr: 'Diplômé en Tourisme, Agréé DIRCETUR (10 ans d’exp.)',
    it: 'Laureato in Turismo, Abilitato DIRCETUR (10 anni esp.)'
  },
  'Guía Historiador Senior DIRCETUR': {
    es: 'Guía Historiador Senior DIRCETUR',
    en: 'Senior Historian Guide, DIRCETUR Licensed',
    pt: 'Guia Historiador Sênior Credenciado DIRCETUR',
    fr: 'Guide Historien Senior Agréé DIRCETUR',
    it: 'Guida Storica Senior Abilitata DIRCETUR'
  },
  'Arqueóloga Colegiada & Guía Oficial': {
    es: 'Arqueóloga Colegiada & Guía Oficial',
    en: 'Certified Archaeologist & Official Guide',
    pt: 'Arqueóloga Registrada & Guia Oficial',
    fr: 'Archéologue Diplômée & Guide Officielle',
    it: 'Archeologa Iscritta all’Albo & Guida Ufficiale'
  },
  'Guía Oficial de Turismo DIRCETUR': {
    es: 'Guía Oficial de Turismo DIRCETUR',
    en: 'Official Certified Tour Guide DIRCETUR',
    pt: 'Guia Oficial de Turismo DIRCETUR',
    fr: 'Guide Officiel de Tourisme DIRCETUR',
    it: 'Guida Ufficiale di Turismo DIRCETUR'
  },
  'Español, Inglés y Portugués': {
    es: 'Español, Inglés y Portugués',
    en: 'Spanish, English & Portuguese',
    pt: 'Espanhol, Inglês e Português',
    fr: 'Espagnol, Anglais et Portugais',
    it: 'Spagnolo, Inglese e Portoghese'
  },
  'Español, Inglés y Quechua': {
    es: 'Español, Inglés y Quechua',
    en: 'Spanish, English & Quechua',
    pt: 'Espanhol, Inglês e Quéchua',
    fr: 'Espagnol, Anglais et Quechua',
    it: 'Spagnolo, Inglese e Quechua'
  },
  'Español e Inglés bilingüe nativo': {
    es: 'Español e Inglés bilingüe nativo',
    en: 'Spanish & Native Bilingual English',
    pt: 'Espanhol e Inglês Bilíngue Nativo',
    fr: 'Espagnol et Anglais Bilingue Natif',
    it: 'Spagnolo e Inglese Bilingue Nativo'
  },
  'Español, Inglés y Francés': {
    es: 'Español, Inglés y Francés',
    en: 'Spanish, English & French',
    pt: 'Espanhol, Inglês e Francês',
    fr: 'Espagnol, Anglais et Français',
    it: 'Spagnolo, Inglese e Francese'
  },

  // --- SERVICIOS INCLUIDOS ---
  'Transporte turístico privado con aire acondicionado': {
    es: 'Transporte turístico privado con aire acondicionado',
    en: 'Private scenic tourist transportation with climate control',
    pt: 'Transporte turístico privado com ar condicionado e janelas panorâmicas',
    fr: 'Transport touristique privé avec climatisation et vitres panoramiques',
    it: 'Trasporto turistico privato climatizzato con finestre panoramiche'
  },
  'Boletos de tren panorámico y entradas oficiales': {
    es: 'Boletos de tren panorámico y entradas oficiales',
    en: 'Scenic panoramic railway tickets and official entrance passes',
    pt: 'Passagens de trem panorâmico e ingressos oficiais aos santuários',
    fr: 'Billets de train panoramique et entrées officielles aux sites',
    it: 'Biglietti treno panoramico e ingressi ufficiali ai santuari'
  },
  'Guía oficial bilingüe DIRCETUR en todas las excursiones': {
    es: 'Guía oficial bilingüe DIRCETUR en todas las excursiones',
    en: 'Certified bilingual historian guide (DIRCETUR licensed) on all tours',
    pt: 'Guia oficial bilíngue credenciado pela DIRCETUR em todas as excursões',
    fr: 'Guide officiel bilingue agréé par la DIRCETUR sur toutes les visites',
    it: 'Guida ufficiale bilingue abilitata dalla DIRCETUR in tutte le escursioni'
  },
  'Asistencia y monitoreo 24/7 con oxígeno a bordo': {
    es: 'Asistencia y monitoreo 24/7 con oxígeno a bordo',
    en: '24/7 trip coordinator assistance with medical oxygen onboard',
    pt: 'Assistência e monitoramento 24/7 com balão de oxigênio a bordo',
    fr: 'Assistance et suivi 24/7 avec oxygène médical à bord',
    it: 'Assistenza e monitoraggio 24/7 con ossigeno medicale a bordo'
  },
  'Almuerzo buffet y degustaciones gastronómicas': {
    es: 'Almuerzo buffet y degustaciones gastronómicas',
    en: 'Signature Andean buffet lunch and regional culinary tastings',
    pt: 'Almoço buffet campestre e degustações gastronômicas regionais',
    fr: 'Déjeuner buffet andin et dégustations gastronomiques locales',
    it: 'Pranzo a buffet andino e degustazioni gastronomiche locali'
  },
  'Transporte turístico Cusco - Mollepata': {
    es: 'Transporte turístico Cusco - Mollepata',
    en: 'Tourist transportation Cusco - Mollepata round-trip',
    pt: 'Transporte turístico Cusco - Mollepata ida e volta',
    fr: 'Transport touristique Cusco - Mollepata aller-retour',
    it: 'Trasporto turistico Cusco - Mollepata andata e ritorno'
  },
  'Domos de cristal y campamentos equipados': {
    es: 'Domos de cristal y campamentos equipados',
    en: 'Sky glass domes and fully equipped mountain campsites',
    pt: 'Dormitórios domos de cristal e acampamentos equipados',
    fr: 'Dômes de verre et campements de montagne équipés',
    it: 'Domi di vetro e accampamenti montani attrezzati'
  },
  'Alimentación nutritiva de montaña': {
    es: 'Alimentación nutritiva de montaña',
    en: 'Nutritious mountain meals prepared by local camp chefs',
    pt: 'Alimentação nutritiva de montanha preparada por chefs locais',
    fr: 'Repas nutritifs de montagne préparés par des chefs de camp',
    it: 'Pasti montani nutrienti preparati da chef locali'
  },
  'Entradas y boleto a Machu Picchu': {
    es: 'Entradas y boleto a Machu Picchu',
    en: 'Official entrance tickets to Machu Picchu Historic Sanctuary',
    pt: 'Ingressos oficiais para o Santuário de Machu Picchu',
    fr: 'Billets d’entrée officiels au Sanctuaire du Machu Picchu',
    it: 'Biglietti d’ingresso ufficiali al Santuario di Machu Picchu'
  },
  'Balón de oxígeno y botiquín de altura': {
    es: 'Balón de oxígeno y botiquín de altura',
    en: 'Emergency medical oxygen tank and Andean altitude first aid kit',
    pt: 'Balão de oxigênio medicinal e kit de primeiros socorros de altitude',
    fr: 'Bouteille d’oxygène médical et trousse de premiers secours d’altitude',
    it: 'Bombola di ossigeno medicale e kit di primo soccorso per altitudine'
  },
  'Vagón de lujo con almuerzo gourmet': {
    es: 'Vagón de lujo con almuerzo gourmet',
    en: 'Luxury train carriage with gourmet fine dining lunch',
    pt: 'Vagão de luxo com almoço gourmet e música ao vivo',
    fr: 'Wagon de luxe avec déjeuner gastronomique et musique live',
    it: 'Carrozza di lusso con pranzo gourmet e musica dal vivo'
  },
  'Boletos de tren ida y vuelta Hiram Bingham': {
    es: 'Boletos de tren ida y vuelta Hiram Bingham',
    en: 'Round-trip Hiram Bingham luxury train passes',
    pt: 'Passagens de ida e volta no trem de luxo Hiram Bingham',
    fr: 'Billets aller-retour à bord du train de luxe Hiram Bingham',
    it: 'Biglietti andata e ritorno sul treno di lusso Hiram Bingham'
  },
  'Entradas preferentes a la ciudadela inca': {
    es: 'Entradas preferentes a la ciudadela inca',
    en: 'Preferred VIP access tickets to the Inca citadel',
    pt: 'Acesso preferencial VIP à cidadela inca',
    fr: 'Accès prioritaire VIP à la citadelle inca',
    it: 'Accesso preferenziale VIP alla cittadella inca'
  },
  'Guía privado historiador oficial': {
    es: 'Guía privado historiador oficial',
    en: 'Dedicated private certified historian guide',
    pt: 'Guia historiador oficial dedicado com exclusividade',
    fr: 'Guide historien officiel privé et dédié',
    it: 'Guida storica ufficiale privata ed esclusiva'
  },
  'Traslado privado hotel Cusco - estación': {
    es: 'Traslado privado hotel Cusco - estación',
    en: 'Private door-to-door transfer Cusco hotel - railway station',
    pt: 'Traslado privado porta a porta hotel em Cusco - estação',
    fr: 'Transfert privé porte-à-porte hôtel à Cusco - gare',
    it: 'Trasferimento privato porta a porta hotel a Cusco - stazione'
  },
  'Guiado oficial por arqueóloga colegiada': {
    es: 'Guiado oficial por arqueóloga colegiada',
    en: 'Official guided exploration by a licensed archaeologist',
    pt: 'Guiado oficial por arqueóloga credenciada',
    fr: 'Visite guidée officielle par une archéologue agréée',
    it: 'Visita guidata ufficiale con archeologa abilitata'
  },
  'Visita guiada al Templo del Sol (Qorikancha)': {
    es: 'Visita guiada al Templo del Sol (Qorikancha)',
    en: 'In-depth guided tour of the Temple of the Sun (Qorikancha)',
    pt: 'Visita guiada ao Templo do Sol (Qorikancha)',
    fr: 'Visite approfondie du Temple du Soleil (Qorikancha)',
    it: 'Visita guidata approfondita al Tempio del Sole (Qorikancha)'
  },
  'Recorrido en Sacsayhuamán, Q’enqo, Puka Pukara y Tambomachay': {
    es: 'Recorrido en Sacsayhuamán, Q’enqo, Puka Pukara y Tambomachay',
    en: 'Scenic route through Sacsayhuamán, Q’enqo, Puka Pukara & Tambomachay',
    pt: 'Circuito por Sacsayhuamán, Q’enqo, Puka Pukara e Tambomachay',
    fr: 'Parcours guidé à Sacsayhuamán, Q’enqo, Puka Pukara et Tambomachay',
    it: 'Percorso guidato a Sacsayhuamán, Q’enqo, Puka Pukara e Tambomachay'
  },

  // --- QUÉ NO INCLUYE (EXCLUSIONES) ---
  'Vuelos internacionales o nacionales': {
    es: 'Vuelos internacionales o nacionales',
    en: 'International or domestic airfares to Cusco',
    pt: 'Voos internacionais ou domésticos até Cusco',
    fr: 'Vols internationaux ou domestiques vers Cusco',
    it: 'Voli internazionali o nazionali per Cusco'
  },
  'Vuelos comerciales internacionales o domésticos': {
    es: 'Vuelos comerciales internacionales o domésticos',
    en: 'Commercial international or domestic airline tickets',
    pt: 'Passagens aéreas comerciais internacionais ou domésticas',
    fr: 'Billets d’avion commerciaux internationaux ou domestiques',
    it: 'Biglietti aerei commerciali internazionali o nazionali'
  },
  'Propinas voluntarias para guías y choferes': {
    es: 'Propinas voluntarias para guías y choferes',
    en: 'Voluntary tips for tour guides and drivers',
    pt: 'Gorjetas voluntárias para guias e motoristas',
    fr: 'Pourboires volontaires pour les guides et chauffeurs',
    it: 'Mance facoltative per guide e autisti'
  },
  'Propinas voluntarias para guía y personal de servicio': {
    es: 'Propinas voluntarias para guía y personal de servicio',
    en: 'Voluntary tips for guide and hospitality crew',
    pt: 'Gorjetas voluntárias para guia e equipe de apoio',
    fr: 'Pourboires volontaires pour le guide et l’équipage',
    it: 'Mance facoltative per guida e personale di servizio'
  },
  'Seguro médico personal de viaje': {
    es: 'Seguro médico personal de viaje',
    en: 'Personal international travel medical insurance',
    pt: 'Seguro viagem médico pessoal internacional',
    fr: 'Assurance médicale de voyage personnelle',
    it: 'Assicurazione medica personale di viaggio'
  },
  'Seguro médico de viaje de alta montaña': {
    es: 'Seguro médico de viaje de alta montaña',
    en: 'High-mountain travel and emergency insurance',
    pt: 'Seguro viagem para alta montanha e resgate',
    fr: 'Assurance voyage de haute montagne et secours',
    it: 'Assicurazione viaggio per alta montagna ed emergenze'
  },
  'Bolsa de dormir térmica (alquiler $20 USD)': {
    es: 'Bolsa de dormir térmica (alquiler $20 USD)',
    en: 'Sub-zero thermal sleeping bag (rental $20 USD)',
    pt: 'Saco de dormir térmico para frio extremo (aluguel $20 USD)',
    fr: 'Duvet thermique haute montagne (location $20 USD)',
    it: 'Sacco a pelo termico per alte quote (noleggio $20 USD)'
  },
  'Caballo extra de carga personal': {
    es: 'Caballo extra de carga personal',
    en: 'Optional emergency saddle horse / personal cargo mule',
    pt: 'Cavalo extra de apoio ou carga pessoal',
    fr: 'Cheval de selle supplémentaire ou mule de bât',
    it: 'Cavallo supplementare da sella o carico personale'
  },
  'Propinas para arrieros y cocineros': {
    es: 'Propinas para arrieros y cocineros',
    en: 'Gratuities for camp cooks and horsemen',
    pt: 'Gorjetas para tropeiros e cozinheiros de montanha',
    fr: 'Pourboires pour les muletiers et cuisiniers',
    it: 'Mance per mulattieri e cuochi di campo'
  },
  'Primer desayuno en Mollepata y último almuerzo': {
    es: 'Primer desayuno en Mollepata y último almuerzo',
    en: 'Day 1 breakfast in Mollepata and Day 5 farewell lunch',
    pt: 'Primeiro café da manhã em Mollepata e último almoço',
    fr: 'Premier petit-déjeuner à Mollepata et dernier déjeuner',
    it: 'Prima colazione a Mollepata e ultimo pranzo'
  },
  'Boleto aéreo internacional o nacional a Cusco': {
    es: 'Boleto aéreo internacional o nacional a Cusco',
    en: 'International or domestic flights into Cusco airport',
    pt: 'Passagens aéreas internacionais ou nacionais para Cusco',
    fr: 'Billets d’avion internationaux ou nationaux vers Cusco',
    it: 'Biglietti aerei internazionali o nazionali per Cusco'
  },
  'Alojamiento en Aguas Calientes (opcional pernocte)': {
    es: 'Alojamiento en Aguas Calientes (opcional pernocte)',
    en: 'Overnight boutique hotel in Aguas Calientes (optional)',
    pt: 'Hospedagem em Aguas Calientes (pernoite opcional)',
    fr: 'Hébergement à Aguas Calientes (nuitée optionnelle)',
    it: 'Soggiorno ad Aguas Calientes (pernottamento facoltativo)'
  },
  'Boleto Turístico del Cusco (BTC)': {
    es: 'Boleto Turístico del Cusco (BTC)',
    en: 'Cusco Official Tourist Ticket (BTC pass)',
    pt: 'Bilhete Turístico Oficial de Cusco (BTC)',
    fr: 'Billet Touristique Officiel de Cusco (Pass BTC)',
    it: 'Biglietto Turistico Ufficiale di Cusco (Pass BTC)'
  },
  'Boleto de entrada al Qorikancha (S/ 15 PEN)': {
    es: 'Boleto de entrada al Qorikancha (S/ 15 PEN)',
    en: 'Qorikancha Temple admission ticket (15 PEN)',
    pt: 'Ingresso ao Templo Qorikancha (15 PEN)',
    fr: 'Entrée au Temple Qorikancha (15 PEN)',
    it: 'Ingresso al Tempio Qorikancha (15 PEN)'
  },
  'Agua embotellada y snacks personales': {
    es: 'Agua embotellada y snacks personales',
    en: 'Bottled mineral water and personal snack treats',
    pt: 'Água mineral engarrafada e lanches pessoais extras',
    fr: 'Bouteilles d’eau minérale et collations personnelles',
    it: 'Acqua in bottiglia e snack personali extra'
  },
  'Bebidas alcohólicas premium fuera del menú establecido': {
    es: 'Bebidas alcohólicas premium fuera del menú establecido',
    en: 'Premium spirits and wine outside the set tasting menu',
    pt: 'Bebidas alcoólicas premium fora do menu estabelecido',
    fr: 'Boissons alcoolisées haut de gamme hors menu inclus',
    it: 'Bevande alcoliche premium fuori dal menu stabilito'
  },

  // --- QUÉ LLEVAR (CHECKLIST DE MOCHILA) ---
  'Pasaporte original físico vigente': {
    es: 'Pasaporte original físico vigente',
    en: 'Valid original physical passport (Strictly required for train & citadel)',
    pt: 'Passaporte original físico válido (Obrigatório para trem e Machu Picchu)',
    fr: 'Passeport original physique en cours de validité (Obligatoire)',
    it: 'Passaporto originale fisico valido (Obbligatorio per treno e sito)'
  },
  'Pasaporte original físico (obligatorio para el tren y Machu Picchu)': {
    es: 'Pasaporte original físico (obligatorio para el tren y Machu Picchu)',
    en: 'Valid physical passport (Mandatory for train boarding & citadel entry)',
    pt: 'Passaporte físico original (Obrigatório para embarque no trem e Machu Picchu)',
    fr: 'Passeport physique original (Obligatoire pour l’accès au train et au site)',
    it: 'Passaporto fisico originale (Obbligatorio per l’imbarco in treno e ingresso)'
  },
  'Pasaporte original físico (indispensable para MP)': {
    es: 'Pasaporte original físico (indispensable para MP)',
    en: 'Original physical passport (Crucial for checkpoints & Machu Picchu)',
    pt: 'Passaporte físico original (Indispensável para o controle de Machu Picchu)',
    fr: 'Passeport physique original (Indispensable pour l’accès au Machu Picchu)',
    it: 'Passaporto fisico originale (Indispensabile per i controlli di Machu Picchu)'
  },
  'Mochila de trekking de 30 a 40 litros': {
    es: 'Mochila de trekking de 30 a 40 litros',
    en: 'Daypack or hiking backpack (30 to 40 liters capacity)',
    pt: 'Mochila de caminhada ergonômica (30 a 40 litros)',
    fr: 'Sac à dos de randonnée ergonomique (30 à 40 litres)',
    it: 'Zaino da trekking ergonomico (capacità 30-40 litri)'
  },
  'Ropa en capas para clima andino y ceja de selva': {
    es: 'Ropa en capas para clima andino y ceja de selva',
    en: 'Layered clothing suitable for alpine mountain and cloud forest weather',
    pt: 'Roupas em camadas para clima andino e transição para selva',
    fr: 'Vêtements multicouches adaptés au climat andin et à la forêt de nuages',
    it: 'Abbigliamento a strati per clima andino e foresta pluviale'
  },
  'Ropa térmica en capas (primera capa, polar y cortavientos)': {
    es: 'Ropa térmica en capas (primera capa, polar y cortavientos)',
    en: 'Thermal base layer, warm fleece jacket, and breathable windbreaker',
    pt: 'Primeira camada térmica, casaco polar e jaqueta corta-vento impermeável',
    fr: 'Sous-vêtements thermiques, veste polaire et coupe-vent imperméable',
    it: 'Intimo termico, pile traspirante e giacca a vento impermeabile'
  },
  'Ropa elegante sport pero cómoda para caminar': {
    es: 'Ropa elegante sport pero cómoda para caminar',
    en: 'Smart-casual comfortable attire with breathable mountain layers',
    pt: 'Roupas elegantes estilo casual-sport confortáveis para caminhar',
    fr: 'Tenue casual-chic confortable avec couches respirantes pour la marche',
    it: 'Abbigliamento casual elegante e comodo per camminare'
  },
  'Calzado cómodo de trekking o senderismo': {
    es: 'Calzado cómodo de trekking o senderismo',
    en: 'Broken-in hiking shoes or boots with sturdy rubber traction',
    pt: 'Calçado confortável de trilha ou tênis com bom amortecimento',
    fr: 'Chaussures de marche confortables déjà rodées avec bonne adhérence',
    it: 'Scarpe da trekking già rodate con ottima aderenza'
  },
  'Zapatos de trekking impermeables ya amoldados': {
    es: 'Zapatos de trekking impermeables ya amoldados',
    en: 'Waterproof broken-in trekking boots with ankle support',
    pt: 'Botas de trekking impermeáveis e já amaciadas',
    fr: 'Chaussures de randonnée imperméables et déjà formées au pied',
    it: 'Scarponi da trekking impermeabili già ammorbiditi'
  },
  'Zapatos confortables o zapatillas con buen agarre': {
    es: 'Zapatos confortables o zapatillas con buen agarre',
    en: 'Comfortable walking sneakers or trail shoes with reliable grip',
    pt: 'Tênis confortáveis com bom amortecimento e aderência',
    fr: 'Baskets confortables avec semelle antidérapante',
    it: 'Scarpe da ginnastica comode con suola antiscivolo'
  },
  'Protector solar, lentes UV y gorro': {
    es: 'Protector solar, lentes UV y gorro',
    en: 'High SPF sunscreen (50+), polarized UV sunglasses and sun hat',
    pt: 'Protetor solar (FPS 50+), óculos escuros UV e chapéu de abas',
    fr: 'Crème solaire (SPF 50+), lunettes de soleil UV et chapeau de soleil',
    it: 'Crema solare (SPF 50+), occhiali da sole UV e cappello parasole'
  },
  'Pastillas para el mal de altura y bloqueador solar': {
    es: 'Pastillas para el mal de altura y bloqueador solar',
    en: 'Altitude sickness medication (soroche pills), electrolytes & sunscreen',
    pt: 'Medicamentos para mal de altitude, hidratação e protetor solar',
    fr: 'Médicaments pour le mal des montagnes, électrolytes et crème solaire',
    it: 'Compresse per il mal di montagna, sali minerali e crema solare'
  },
  'Cámara fotográfica o smartphone con batería recargable': {
    es: 'Cámara fotográfica o smartphone con batería recargable',
    en: 'Camera or smartphone with high-capacity portable power bank',
    pt: 'Câmera fotográfica ou smartphone com bateria externa portátil',
    fr: 'Appareil photo ou smartphone avec batterie externe haute capacité',
    it: 'Fotocamera o smartphone con power bank portatile ad alta capacità'
  },
  'Boleto Turístico físico o dinero en efectivo para comprarlo': {
    es: 'Boleto Turístico físico o dinero en efectivo para comprarlo',
    en: 'Physical Tourist Ticket or cash in Peruvian Soles to purchase at gate',
    pt: 'Bilhete Turístico físico ou dinheiro em Soles para comprar no local',
    fr: 'Billet touristique physique ou espèces en Soles pour l’acheter sur place',
    it: 'Biglietto turistico fisico o contanti in Soles per acquistarlo sul posto'
  },

  // --- DISTINTIVOS Y SELLOS ---
  'Licencia Oficial DIRCETUR Cusco': {
    es: 'Licencia Oficial DIRCETUR Cusco',
    en: 'Official DIRCETUR Cusco License',
    pt: 'Licença Oficial DIRCETUR Cusco',
    fr: 'Licence Officielle DIRCETUR Cusco',
    it: 'Licenza Ufficiale DIRCETUR Cusco'
  },
  'Licencia Oficial DIRCETUR': {
    es: 'Licencia Oficial DIRCETUR',
    en: 'Official DIRCETUR License',
    pt: 'Licença Oficial DIRCETUR',
    fr: 'Licence Officielle DIRCETUR',
    it: 'Licenza Ufficiale DIRCETUR'
  },
  'Sello Internacional Safe Travels': {
    es: 'Sello Internacional Safe Travels',
    en: 'Safe Travels International Stamp',
    pt: 'Selo Internacional Safe Travels',
    fr: 'Label International Safe Travels',
    it: 'Sigillo Internazionale Safe Travels'
  },
  'Sello Safe Travels': {
    es: 'Sello Safe Travels',
    en: 'Safe Travels Seal',
    pt: 'Selo Safe Travels',
    fr: 'Label Safe Travels',
    it: 'Sigillo Safe Travels'
  },
  'Agencia Formal RUC 20 Verificado': {
    es: 'Agencia Formal RUC 20 Verificado',
    en: 'Verified Registered Formal Agency',
    pt: 'Agência Formal Registrada e Verificada',
    fr: 'Agence Agréée et Enregistrée',
    it: 'Agenzia Ufficiale Registrata e Verificata'
  },
  'RUC 20 Formal Verificado': {
    es: 'RUC 20 Formal Verificado',
    en: 'Registered Legal Tourism Tax ID',
    pt: 'Registro Fiscal Turístico Verificado',
    fr: 'Identifiant Fiscal Agréé Vérifié',
    it: 'Partita IVA Turistica Verificata'
  },
  'Balón de Oxígeno & Botiquín de Altura': {
    es: 'Balón de Oxígeno & Botiquín de Altura',
    en: 'Medical Oxygen & Altitude Kit',
    pt: 'Balão de Oxigênio & Kit de Altitude',
    fr: 'Bouteille d’Oxygène & Trousse d’Altitude',
    it: 'Bombola di Ossigeno & Kit Altitudine'
  },
  'Atención Médica & Oxígeno': {
    es: 'Atención Médica & Oxígeno',
    en: 'Medical Care & Oxygen',
    pt: 'Atendimento Médico & Oxigênio',
    fr: 'Soins Médicaux & Oxygène',
    it: 'Assistenza Medica & Ossigeno'
  },
  'Guía Colegiado Bilingüe': {
    es: 'Guía Colegiado Bilingüe',
    en: 'Certified Bilingual Guide',
    pt: 'Guia Bilíngue Credenciado',
    fr: 'Guide Officiel Bilingue Agréé',
    it: 'Guida Ufficiale Bilingue Abilitata'
  },
  'Seguro contra Accidentes SOAT Turístico': {
    es: 'Seguro contra Accidentes SOAT Turístico',
    en: 'Official Tourist Transport SOAT Insurance',
    pt: 'Seguro Obrigatório SOAT Turístico',
    fr: 'Assurance Transport Touristique SOAT',
    it: 'Assicurazione Trasporto Turistico SOAT'
  }
};

// --- TRADUCTOR INTELIGENTE DE TEXTO LIBRE ---
export function translateText(text: string | undefined, targetLang: LanguageType): string {
  if (!text) return '';
  if (targetLang === 'es') return text;

  const trimmed = text.trim();
  if (PHRASE_MAP[trimmed] && PHRASE_MAP[trimmed][targetLang]) {
    return PHRASE_MAP[trimmed][targetLang];
  }

  // Comprobación exacta insensible a mayúsculas/minúsculas
  const lowerTrimmed = trimmed.toLowerCase();
  for (const [key, val] of Object.entries(PHRASE_MAP)) {
    if (key.toLowerCase() === lowerTrimmed && val[targetLang]) {
      return val[targetLang];
    }
  }

  // Heurísticas semánticas para Títulos de Tours
  if (lowerTrimmed.includes('machu picchu') && (lowerTrimmed.includes('lujo') || lowerTrimmed.includes('tren') || lowerTrimmed.includes('vip') || lowerTrimmed.includes('panorámico') || lowerTrimmed.includes('panoramico'))) {
    if (targetLang === 'en') return 'Luxury Machu Picchu with Scenic Panoramic Train';
    if (targetLang === 'pt') return 'Machu Picchu de Luxo com Trem Panorâmico';
    if (targetLang === 'fr') return 'Machu Picchu de Luxe avec Train Panoramique';
    if (targetLang === 'it') return 'Machu Picchu di Lusso con Treno Panoramico';
  }

  if (lowerTrimmed.includes('vinicunca') || lowerTrimmed.includes('7 colores') || lowerTrimmed.includes('siete colores') || lowerTrimmed.includes('valle rojo')) {
    if (targetLang === 'en') return 'Rainbow Mountain (Vinicunca) & Red Valley VIP';
    if (targetLang === 'pt') return 'Montanha das 7 Cores (Vinicunca) & Vale Vermelho';
    if (targetLang === 'fr') return 'Montagne des 7 Couleurs (Vinicunca) & Vallée Rouge';
    if (targetLang === 'it') return 'Montagna dei 7 Colori (Vinicunca) & Valle Rossa';
  }

  if (lowerTrimmed.includes('humantay')) {
    if (targetLang === 'en') return 'Turquoise Humantay Lake & Glacier Trek';
    if (targetLang === 'pt') return 'Laguna Humantay Turquesa & Geleira Andina';
    if (targetLang === 'fr') return 'Lagune Humantay Turquoise & Glacier Andin';
    if (targetLang === 'it') return 'Laguna Humantay Turchese & Ghiacciaio Andino';
  }

  if (lowerTrimmed.includes('salkantay')) {
    if (targetLang === 'en') return 'Classic Salkantay Trek to Machu Picchu 5D';
    if (targetLang === 'pt') return 'Trilha Salkantay Clássica para Machu Picchu 5D';
    if (targetLang === 'fr') return 'Trek Salkantay Classique vers le Machu Picchu 5J';
    if (targetLang === 'it') return 'Trek Salkantay Classico verso Machu Picchu 5G';
  }

  if (lowerTrimmed.includes('valle sagrado')) {
    if (targetLang === 'en') return 'Sacred Valley of the Incas VIP Cultural Journey';
    if (targetLang === 'pt') return 'Vale Sagrado dos Incas VIP & Cultura Viva';
    if (targetLang === 'fr') return 'Vallée Sacrée des Incas VIP & Culture Vivante';
    if (targetLang === 'it') return 'Valle Sacra degli Inca VIP & Cultura Viva';
  }

  if (lowerTrimmed.includes('city tour') || (lowerTrimmed.includes('cusco') && lowerTrimmed.includes('ruinas'))) {
    if (targetLang === 'en') return 'Ancestral Cusco City Tour & 4 Archaeological Ruins';
    if (targetLang === 'pt') return 'City Tour Cusco Ancestral & 4 Sítios Arqueológicos';
    if (targetLang === 'fr') return 'City Tour Cusco Ancestral & 4 Sites Archéologiques';
    if (targetLang === 'it') return 'City Tour Cusco Ancestrale & 4 Siti Archeologici';
  }

  // Heurísticas semánticas para Subtítulos y Descripciones
  if (lowerTrimmed.includes('maravilla del mundo') || lowerTrimmed.includes('hoteles 5 estrellas') || lowerTrimmed.includes('guía oficial exclusivo')) {
    if (targetLang === 'en') return 'Discover the wonder of the world with private luxury transfers, 5-star comfort and an official certified historian guide dedicated exclusively to you and your family.';
    if (targetLang === 'pt') return 'Descubra a maravilha do mundo com traslados privados, conforto 5 estrelas e um guia oficial exclusivo para você e sua família.';
    if (targetLang === 'fr') return 'Découvrez la merveille du monde avec transferts privés, confort 5 étoiles et un guide officiel exclusif pour vous et votre famille.';
    if (targetLang === 'it') return 'Scopri la meraviglia del mondo con trasferimenti privati, comfort a 5 stelle e una guida ufficiale esclusiva per te e la tua famiglia.';
  }

  if (lowerTrimmed.includes('magia de los andes') || lowerTrimmed.includes('salidas diarias')) {
    if (targetLang === 'en') return 'Experience the magic of the Peruvian Andes with official accredited tour operators and guaranteed daily departures.';
    if (targetLang === 'pt') return 'Viva a magia dos Andes peruanos com operadores credenciados e saídas diárias garantidas.';
    if (targetLang === 'fr') return 'Vivez la magie des Andes péruviennes avec des opérateurs agréés et des départs quotidiens garantis.';
    if (targetLang === 'it') return 'Vivi la magia delle Ande peruviane con operatori abilitati e partenze giornaliere garantite.';
  }

  if (lowerTrimmed.includes('operador turístico') || lowerTrimmed.includes('formal en cusco')) {
    if (targetLang === 'en') return 'Official certified tourism operator in Cusco with proven excellence and DIRCETUR license.';
    if (targetLang === 'pt') return 'Operador turístico oficial e registrado em Cusco com excelência comprovada e credencial DIRCETUR.';
    if (targetLang === 'fr') return 'Opérateur touristique officiel et agréé à Cusco avec excellence reconnue et licence DIRCETUR.';
    if (targetLang === 'it') return 'Operatore turistico ufficiale e autorizzato a Cusco con comprovata eccellenza e licenza DIRCETUR.';
  }

  // Heurísticas para Especificaciones Técnicas
  if (lowerTrimmed.includes('msnm') || lowerTrimmed.includes('m.a.s.l.') || lowerTrimmed.includes('metros')) {
    const num = text.replace(/[^0-9,.]/g, '');
    if (targetLang === 'en') return `${num} m.a.s.l.`;
    if (targetLang === 'fr') return `${num} m d’altitude`;
    if (targetLang === 'pt') return `${num} m de altitude`;
    if (targetLang === 'it') return `${num} mslm`;
  }

  // Traducción por fragmentos y patrones comunes
  let translated = text;

  // Patrones de títulos dinámicos
  if (translated.includes(': La Experiencia Definitiva en Cusco')) {
    const replacement = targetLang === 'en' 
      ? ': The Ultimate Cusco Experience' 
      : targetLang === 'pt' 
      ? ': A Experiência Definitiva em Cusco' 
      : targetLang === 'fr' 
      ? ': L’Expérience Ultime à Cusco' 
      : ': L’Esperienza Definitiva a Cusco';
    translated = translated.replace(': La Experiencia Definitiva en Cusco', replacement);
  }

  if (translated.startsWith('¿Por qué elegir ') && translated.endsWith('?')) {
    const subject = translated.slice('¿Por qué elegir '.length, -1);
    const translatedSubject = translateText(subject, targetLang);
    if (targetLang === 'en') return `Why choose ${translatedSubject}?`;
    if (targetLang === 'pt') return `Por que escolher ${translatedSubject}?`;
    if (targetLang === 'fr') return `Pourquoi choisir ${translatedSubject} ?`;
    if (targetLang === 'it') return `Perché scegliere ${translatedSubject}?`;
  }

  // Reemplazo de palabras clave comunes
  for (const [esKey, translations] of Object.entries(PHRASE_MAP)) {
    if (translated.includes(esKey) && translations[targetLang]) {
      translated = translated.split(esKey).join(translations[targetLang]);
    }
  }

  return translated;
}

// --- TRADUCTOR DE ITINERARIOS ---
const ITINERARY_DICTIONARY: Record<string, Record<LanguageType, { title: string; desc: string }>> = {
  'Llegada a Cusco, Aclimatación & City Tour Ancestral': {
    es: {
      title: 'Llegada a Cusco, Aclimatación & City Tour Ancestral',
      desc: 'Recepción en el aeropuerto, traslado a hotel de lujo y recorrido por los recintos arqueológicos sagrados.'
    },
    en: {
      title: 'Arrival in Cusco, Acclimatization & Ancestral City Tour',
      desc: 'Airport reception, transfer to boutique hotel and private exploration of the historic sacred enclosures.'
    },
    pt: {
      title: 'Chegada a Cusco, Aclimatação & City Tour Ancestral',
      desc: 'Recepção no aeroporto, traslado ao hotel boutique e exploração dos sítios arqueológicos sagrados.'
    },
    fr: {
      title: 'Arrivée à Cusco, Acclimatation & Visite de la Ville Ancestrale',
      desc: 'Accueil à l’aéroport, transfert à l’hôtel de charme et découverte privée des sanctuaires sacrés.'
    },
    it: {
      title: 'Arrivo a Cusco, Acclimatazione & City Tour Ancestrale',
      desc: 'Accoglienza in aeroporto, trasferimento in boutique hotel ed esplorazione dei recinti sacri.'
    }
  },
  'Valle Sagrado de los Incas & Tren Panorámico': {
    es: {
      title: 'Valle Sagrado de los Incas & Tren Panorámico',
      desc: 'Exploración de Pisac y Ollantaytambo con almuerzo campestre buffet frente a los andenes andinos.'
    },
    en: {
      title: 'Sacred Valley of the Incas & Scenic Panoramic Train',
      desc: 'Guided immersion in Pisac and Ollantaytambo with traditional Andean buffet lunch facing the agricultural terraces.'
    },
    pt: {
      title: 'Vale Sagrado dos Incas & Trem Panorâmico',
      desc: 'Exploração de Pisac e Ollantaytambo com almoço buffet campestre em frente aos terraços incas.'
    },
    fr: {
      title: 'Vallée Sacrée des Incas & Train Panoramique',
      desc: 'Immersion guidée à Pisac et Ollantaytambo avec déjeuner buffet champêtre face aux terrasses andines.'
    },
    it: {
      title: 'Valle Sacra degli Inca & Treno Panoramico',
      desc: 'Visita guidata a Pisac e Ollantaytambo con pranzo a buffet campestre di fronte ai terrazzamenti inca.'
    }
  },
  'Amanecer en Machu Picchu & Santuario Histórico': {
    es: {
      title: 'Amanecer en Machu Picchu & Santuario Histórico',
      desc: 'Acceso preferente con guía privado historiador y tiempo para capturar las postales icónicas.'
    },
    en: {
      title: 'Sunrise at Machu Picchu & Historic Sanctuary Exploration',
      desc: 'VIP priority entry with private historian guide and dedicated time for iconic photography.'
    },
    pt: {
      title: 'Amanhecer em Machu Picchu & Santuário Histórico',
      desc: 'Acesso preferencial com guia historiador privado e tempo para fotos inesquecíveis.'
    },
    fr: {
      title: 'Lever de Soleil au Machu Picchu & Sanctuaire Historique',
      desc: 'Accès prioritaire avec guide historien privé et temps dédié pour des photographies inoubliables.'
    },
    it: {
      title: 'Alba a Machu Picchu & Santuario Storico',
      desc: 'Accesso prioritario con guida storica privata e tempo dedicato per scatti fotografici indimenticabili.'
    }
  },
  'Cusco a Aguas Calientes en Tren Panorámico Vistadome': {
    es: {
      title: 'Cusco a Aguas Calientes en Tren Panorámico Vistadome',
      desc: 'Recojo privado en tu hotel en Cusco hacia la estación de tren en Poroy u Ollantaytambo. Viaje escénico a través de la cuenca del Valle Sagrado con música a bordo y vistas panorámicas. Llegada al pueblo de Machu Picchu e instalación en hotel boutique.'
    },
    en: {
      title: 'Cusco to Aguas Calientes via Vistadome Scenic Train',
      desc: 'Private pickup from your Cusco hotel towards Ollantaytambo station. Scenic railway journey through the Sacred Valley with live onboard performance. Check-in at boutique hotel in Machu Picchu Pueblo.'
    },
    pt: {
      title: 'Cusco a Aguas Calientes em Trem Panorâmico Vistadome',
      desc: 'Embarque privado no hotel em Cusco rumo à estação de trem. Viagem panorâmica pelo Vale Sagrado com música ao vivo e vistas deslumbrantes. Chegada a Aguas Calientes e check-in em hotel boutique.'
    },
    fr: {
      title: 'Cusco à Aguas Calientes en Train Panoramique Vistadome',
      desc: 'Prise en charge privée à votre hôtel à Cusco vers la gare. Voyage panoramique à travers la Vallée Sacrée avec musique live. Arrivée au village du Machu Picchu et installation à l’hôtel boutique.'
    },
    it: {
      title: 'Cusco ad Aguas Calientes in Treno Panoramico Vistadome',
      desc: 'Prelievo privato dall’hotel a Cusco verso la stazione ferroviaria. Viaggio panoramico attraverso la Valle Sacra con musica a bordo e viste spettacolari. Arrivo a Machu Picchu Pueblo e check-in in boutique hotel.'
    }
  },
  'Exploración Mística de Machu Picchu & Almuerzo Gourmet': {
    es: {
      title: 'Exploración Mística de Machu Picchu & Almuerzo Gourmet',
      desc: 'Ascenso en bus exclusivo hacia la ciudadela inca. Visita guiada privada de 3 horas por los recintos sagrados, templos y terrazas. Almuerzo buffet de autor en Belmond Sanctuary Lodge y retorno en tren de primera clase a Cusco con traslado a tu hotel.'
    },
    en: {
      title: 'Mystical Exploration of Machu Picchu & Gourmet Buffet',
      desc: 'Exclusive bus ascent to the Inca citadel. 3-hour private guided exploration through temples, royal enclosures and terraces. Gourmet buffet lunch at Belmond Sanctuary Lodge and first-class train back to Cusco.'
    },
    pt: {
      title: 'Exploração Mística de Machu Picchu & Almoço Gourmet',
      desc: 'Subida em ônibus exclusivo para a cidadela inca. Visita guiada privada de 3 horas pelos templos e terraços. Almoço buffet gourmet no Belmond Sanctuary Lodge e retorno em trem de primeira classe para Cusco.'
    },
    fr: {
      title: 'Exploration Mystique du Machu Picchu & Déjeuner Gourmand',
      desc: 'Montée en bus exclusif vers la citadelle inca. Visite guidée privée de 3 heures à travers les temples et les terrasses. Déjeuner buffet gastronomique au Belmond Sanctuary Lodge et retour en train de première classe vers Cusco.'
    },
    it: {
      title: 'Esplorazione Mistica di Machu Picchu & Pranzo Gourmet',
      desc: 'Salita in bus esclusivo verso la cittadella inca. Tour guidato privato di 3 ore tra templi e terrazze. Pranzo a buffet gourmet al Belmond Sanctuary Lodge e rientro in treno di prima classe a Cusco.'
    }
  },
  'Cusco - Mollepata - Laguna Humantay': {
    es: {
      title: 'Cusco - Mollepata - Laguna Humantay',
      desc: 'Salida de madrugada hacia Mollepata. Ascenso a la mística Laguna Humantay a 4,200 msnm y pernocte en domos de cristal en Soraypampa.'
    },
    en: {
      title: 'Cusco - Mollepata - Turquoise Humantay Lake',
      desc: 'Early departure to Mollepata. Guided hike to turquoise Humantay Lake at 4,200 m and overnight in luxury mountain glass domes in Soraypampa.'
    },
    pt: {
      title: 'Cusco - Mollepata - Laguna Humantay Turquesa',
      desc: 'Saída cedo em direção a Mollepata. Subida à mística Laguna Humantay a 4.200 m e pernoite em domos de vidro em Soraypampa.'
    },
    fr: {
      title: 'Cusco - Mollepata - Lagune Humantay Turquoise',
      desc: 'Départ matinal vers Mollepata. Montée à la lagune turquoise Humantay à 4 200 m et nuitée en dômes de verre à Soraypampa.'
    },
    it: {
      title: 'Cusco - Mollepata - Laguna Humantay Turchese',
      desc: 'Partenza di buon mattino per Mollepata. Salita alla mistica Laguna Humantay a 4.200 m e pernottamento in domi di cristallo a Soraypampa.'
    }
  },
  'Paso Salkantay (4,630 msnm) - Collpapampa': {
    es: {
      title: 'Paso Salkantay (4,630 msnm) - Collpapampa',
      desc: 'Día cumbre atravesando el imponente nevado Salkantay. Descenso hacia la ceja de selva y baño en aguas termales.'
    },
    en: {
      title: 'Salkantay Pass Summit (4,630 m) - Collpapampa',
      desc: 'Summit day crossing the majestic Salkantay glacier pass. Gentle descent into the cloud forest and optional thermal baths.'
    },
    pt: {
      title: 'Paso Salkantay (4.630 m) - Collpapampa',
      desc: 'Dia culminante cruzando a imponente geleira de Salkantay. Descida em direção à selva alta com banho em águas termais.'
    },
    fr: {
      title: 'Col du Salkantay (4 630 m) - Collpapampa',
      desc: 'Journée sommet franchissant le col du glacier Salkantay. Descente vers la haute forêt et baignade dans les sources thermales.'
    },
    it: {
      title: 'Passo Salkantay (4.630 m) - Collpapampa',
      desc: 'Giorno culmine attraverso l’imponente ghiacciaio del Salkantay. Discesa verso la foresta pluviale e terme naturali.'
    }
  },
  'Ruta Cafetalera - Hidroeléctrica - Aguas Calientes': {
    es: {
      title: 'Ruta Cafetalera - Hidroeléctrica - Aguas Calientes',
      desc: 'Caminata por plantaciones de café y orquídeas andinas. Llegada al pueblo de Machu Picchu y descanso en hotel.'
    },
    en: {
      title: 'Coffee Trail - Hidroeléctrica - Aguas Calientes',
      desc: 'Scenic hike through organic coffee plantations and wild Andean orchids. Arrival at Machu Picchu Pueblo and comfortable hotel rest.'
    },
    pt: {
      title: 'Rota dos Cafezais - Hidroelétrica - Aguas Calientes',
      desc: 'Caminhada por plantações de café e orquídeas andinas. Chegada a Aguas Calientes e descanso em hotel.'
    },
    fr: {
      title: 'Route du Café - Centrale Hydroélectrique - Aguas Calientes',
      desc: 'Randonnée à travers plantations de café et orchidées sauvages. Arrivée au village du Machu Picchu et repos à l’hôtel.'
    },
    it: {
      title: 'Via del Caffè - Idroelettrica - Aguas Calientes',
      desc: 'Camminata tra piantagioni di caffè e orchidee andine. Arrivo al villaggio di Machu Picchu e riposo in hotel.'
    }
  },
  'Amanecer en Machu Picchu y Retorno a Cusco': {
    es: {
      title: 'Amanecer en Machu Picchu y Retorno a Cusco',
      desc: 'Visita guiada oficial al Santuario Histórico de Machu Picchu. Retorno escénico en tren a Ollantaytambo y transfer a Cusco.'
    },
    en: {
      title: 'Sunrise at Machu Picchu & Scenic Return to Cusco',
      desc: 'Official guided tour of the Machu Picchu Citadel. First-class panoramic train back to Ollantaytambo and private transfer to Cusco.'
    },
    pt: {
      title: 'Amanhecer em Machu Picchu e Retorno a Cusco',
      desc: 'Visita guiada oficial à Cidadela de Machu Picchu. Retorno panorâmico em trem até Ollantaytambo e traslado para Cusco.'
    },
    fr: {
      title: 'Lever de Soleil au Machu Picchu et Retour à Cusco',
      desc: 'Visite guidée officielle de la Citadelle du Machu Picchu. Retour panoramique en train vers Ollantaytambo et transfert privé à Cusco.'
    },
    it: {
      title: 'Alba a Machu Picchu e Rientro a Cusco',
      desc: 'Visita guidata ufficiale alla Cittadella di Machu Picchu. Rientro panoramico in treno a Ollantaytambo e transfer privato a Cusco.'
    }
  }
};

export function translateItineraryItem(item: ItineraryItem, targetLang: LanguageType, index: number): ItineraryItem {
  if (targetLang === 'es') return item;

  let step = item.step;
  const num = item.step.replace(/[^0-9]/g, '') || String(index + 1);
  if (item.step.toLowerCase().includes('día') || item.step.toLowerCase().includes('dia')) {
    if (targetLang === 'en') step = `Day ${num}`;
    if (targetLang === 'pt') step = `Dia ${num}`;
    if (targetLang === 'fr') step = `Jour ${num}`;
    if (targetLang === 'it') step = `Giorno ${num}`;
  }

  // Comprobar coincidencia exacta en el diccionario
  const matched = ITINERARY_DICTIONARY[item.title.trim()];
  if (matched && matched[targetLang]) {
    return {
      step,
      title: matched[targetLang].title,
      desc: matched[targetLang].desc
    };
  }

  // Traducción inteligente por contenido
  const lower = (item.title + ' ' + item.desc).toLowerCase();
  let title = item.title;
  let desc = item.desc;

  if (lower.includes('recojo') || lower.includes('pickup') || lower.includes('llegada')) {
    if (targetLang === 'en') {
      title = 'Hotel Pickup & Scenic Transfer';
      desc = 'Prompt hotel pickup with altitude prevention check and light scenic refreshments.';
    } else if (targetLang === 'pt') {
      title = 'Embarque no Hotel & Traslado Panorâmico';
      desc = 'Pontualidade no hotel com checagem preventiva de altitude e lanche leve.';
    } else if (targetLang === 'fr') {
      title = 'Prise en Charge à l’Hôtel & Transfert Panoramique';
      desc = 'Départ ponctuel de votre hôtel avec collation légère et prévention d’altitude.';
    } else if (targetLang === 'it') {
      title = 'Prelievo in Hotel & Trasferimento Panoramico';
      desc = 'Partenza puntuale dall’hotel con assistenza preventiva per l’altitudine.';
    }
  } else if (lower.includes('desayuno') || lower.includes('breakfast')) {
    if (targetLang === 'en') {
      title = 'High-Energy Andean Buffet Breakfast';
      desc = 'Nutritious breakfast prepared with local ingredients to energize your ascent.';
    } else if (targetLang === 'pt') {
      title = 'Café da Manhã Buffet Andino Energético';
      desc = 'Café da manhã nutritivo com ingredientes locais para recarregar as energias.';
    } else if (targetLang === 'fr') {
      title = 'Petit-Déjeuner Buffet Énergétique des Andes';
      desc = 'Repas nutritif préparé par des chefs locaux avant la montée.';
    } else if (targetLang === 'it') {
      title = 'Colazione a Buffet Andina Energetica';
      desc = 'Colazione nutriente preparata con ingredienti locali per l’ascesa.';
    }
  } else if (lower.includes('machu picchu') || lower.includes('citadel') || lower.includes('ciudadela')) {
    if (targetLang === 'en') {
      title = 'Guided Exploration of Machu Picchu Citadel';
      desc = 'Exclusive guided tour through temples, ceremonial fountains, and iconic agricultural terraces.';
    } else if (targetLang === 'pt') {
      title = 'Exploração Guiada da Cidadela de Machu Picchu';
      desc = 'Visita guiada exclusiva pelos templos, fontes cerimoniais e terraços panorâmicos.';
    } else if (targetLang === 'fr') {
      title = 'Exploration Guidée de la Citadelle du Machu Picchu';
      desc = 'Visite guidée exclusive à travers les temples, fontaines sacrées et terrasses emblématiques.';
    } else if (targetLang === 'it') {
      title = 'Esplorazione Guidata della Cittadella di Machu Picchu';
      desc = 'Tour guidato esclusivo tra templi, fontane cerimoniali e terrazzamenti panoramici.';
    }
  } else if (lower.includes('almuerzo') || lower.includes('retorno') || lower.includes('return')) {
    if (targetLang === 'en') {
      title = 'Country Buffet Lunch & Return to Cusco';
      desc = 'Celebratory valley buffet lunch followed by a comfortable scenic drive back to Cusco.';
    } else if (targetLang === 'pt') {
      title = 'Almoço Buffet Campestre & Retorno a Cusco';
      desc = 'Almoço comemorativo no vale andino e retorno tranquilo para a cidade de Cusco.';
    } else if (targetLang === 'fr') {
      title = 'Déjeuner Buffet Champêtre & Retour à Cusco';
      desc = 'Déjeuner convivial dans la vallée suivi d’un retour confortable vers Cusco.';
    } else if (targetLang === 'it') {
      title = 'Pranzo a Buffet Campestre & Ritorno a Cusco';
      desc = 'Pranzo celebrativo nella vallata andina e rientro confortevole a Cusco.';
    }
  }

  return { step, title, desc };
}
