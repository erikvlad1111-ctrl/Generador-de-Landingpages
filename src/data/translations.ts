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
  'Live Your Adventure — Expediciones & Trekking en Cusco: La Experiencia Definitiva en Cusco': {
    es: 'Vive Tu Aventura — Expediciones & Trekking en Cusco: La Experiencia Definitiva en Cusco',
    en: 'Live Your Adventure — Expeditions & Trekking in Cusco: The Ultimate Cusco Experience',
    pt: 'Viva Sua Aventura — Expedições & Trekking em Cusco: A Experiência Definitiva em Cusco',
    fr: 'Vivez Votre Aventure — Expéditions & Trekking à Cusco : L’Expérience Ultime à Cusco',
    it: 'Vivi La Tua Avventura — Spedizioni & Trekking a Cusco: L’Esperienza Definitiva a Cusco'
  },
  'Vive Tu Aventura — Expediciones & Trekking en Cusco: La Experiencia Definitiva en Cusco': {
    es: 'Vive Tu Aventura — Expediciones & Trekking en Cusco: La Experiencia Definitiva en Cusco',
    en: 'Live Your Adventure — Expeditions & Trekking in Cusco: The Ultimate Cusco Experience',
    pt: 'Viva Sua Aventura — Expedições & Trekking em Cusco: A Experiência Definitiva em Cusco',
    fr: 'Vivez Votre Aventure — Expéditions & Trekking à Cusco : L’Expérience Ultime à Cusco',
    it: 'Vivi La Tua Avventura — Spedizioni & Trekking a Cusco: L’Esperienza Definitiva a Cusco'
  },
  'Live Your Adventure — Expeditions & Trekking in Cusco: The Ultimate Cusco Experience': {
    es: 'Vive Tu Aventura — Expediciones & Trekking en Cusco: La Experiencia Definitiva en Cusco',
    en: 'Live Your Adventure — Expeditions & Trekking in Cusco: The Ultimate Cusco Experience',
    pt: 'Viva Sua Aventura — Expedições & Trekking em Cusco: A Experiência Definitiva em Cusco',
    fr: 'Vivez Votre Aventure — Expéditions & Trekking à Cusco : L’Expérience Ultime à Cusco',
    it: 'Vivi La Tua Avventura — Spedizioni & Trekking a Cusco: L’Esperienza Definitiva a Cusco'
  },
  'Live Your Adventure — Expediciones & Trekking en Cusco': {
    es: 'Vive Tu Aventura — Expediciones & Trekking en Cusco',
    en: 'Live Your Adventure — Expeditions & Trekking in Cusco',
    pt: 'Viva Sua Aventura — Expedições & Trekking em Cusco',
    fr: 'Vivez Votre Aventure — Expéditions & Trekking à Cusco',
    it: 'Vivi La Tua Avventura — Spedizioni & Trekking a Cusco'
  },
  'Vive Tu Aventura — Expediciones & Trekking en Cusco': {
    es: 'Vive Tu Aventura — Expediciones & Trekking en Cusco',
    en: 'Live Your Adventure — Expeditions & Trekking in Cusco',
    pt: 'Viva Sua Aventura — Expedições & Trekking em Cusco',
    fr: 'Vivez Votre Aventure — Expéditions & Trekking à Cusco',
    it: 'Vivi La Tua Avventura — Spedizioni & Trekking a Cusco'
  },
  'Live Your Adventure — Expeditions & Trekking in Cusco': {
    es: 'Vive Tu Aventura — Expediciones & Trekking en Cusco',
    en: 'Live Your Adventure — Expeditions & Trekking in Cusco',
    pt: 'Viva Sua Aventura — Expedições & Trekking em Cusco',
    fr: 'Vivez Votre Aventure — Expéditions & Trekking à Cusco',
    it: 'Vivi La Tua Avventura — Spedizioni & Trekking a Cusco'
  },
  'Live Your Adventure': {
    es: 'Vive Tu Aventura',
    en: 'Live Your Adventure',
    pt: 'Viva Sua Aventura',
    fr: 'Vivez Votre Aventure',
    it: 'Vivi La Tua Avventura'
  },
  'Vive Tu Aventura': {
    es: 'Vive Tu Aventura',
    en: 'Live Your Adventure',
    pt: 'Viva Sua Aventura',
    fr: 'Vivez Votre Aventure',
    it: 'Vivi La Tua Avventura'
  },
  'Live Your Adventure.': {
    es: 'Vive Tu Aventura.',
    en: 'Live Your Adventure.',
    pt: 'Viva Sua Aventura.',
    fr: 'Vivez Votre Aventure.',
    it: 'Vivi La Tua Avventura.'
  },
  'Vive Tu Aventura.': {
    es: 'Vive Tu Aventura.',
    en: 'Live Your Adventure.',
    pt: 'Viva Sua Aventura.',
    fr: 'Vivez Votre Aventure.',
    it: 'Vivi La Tua Avventura.'
  },
  'Estilo Deep Forest Teal con Bento Grid, buscador flotante píldora, métricas de viajeros y microanimaciones de ultralujo.': {
    es: 'Estilo Deep Forest Teal con Bento Grid, buscador flotante píldora, métricas de viajeros y microanimaciones de ultralujo.',
    en: 'Deep Forest Teal style featuring Bento Grid, floating pill search engine, traveler metrics, and ultra-luxury micro-animations.',
    pt: 'Estilo Deep Forest Teal com Bento Grid, buscador flutuante em pílula, métricas de viajantes e microanimações de ultraluxo.',
    fr: 'Style Deep Forest Teal avec Bento Grid, moteur de recherche flottant, métriques de voyageurs et micro-animations de grand luxe.',
    it: 'Stile Deep Forest Teal con Bento Grid, motore di ricerca fluttuante, metriche dei viaggiatori e micro-animazioni ultra-lusso.'
  },
  'Machu Picchu, Salkantay & Rutas Exclusivas': {
    es: 'Machu Picchu, Salkantay & Rutas Exclusivas',
    en: 'Machu Picchu, Salkantay & Exclusive Routes',
    pt: 'Machu Picchu, Salkantay & Rotas Exclusivas',
    fr: 'Machu Picchu, Salkantay & Itinéraires Exclusifs',
    it: 'Machu Picchu, Salkantay & Percorsi Esclusivi'
  },
  'Expediciones & Trekking en Cusco': {
    es: 'Expediciones & Trekking en Cusco',
    en: 'Expeditions & Trekking in Cusco',
    pt: 'Expedições & Trekking em Cusco',
    fr: 'Expéditions & Trekking à Cusco',
    it: 'Spedizioni & Trekking a Cusco'
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
  'Machu Picchu Mágico en Tren Panorámico': {
    es: 'Machu Picchu Mágico en Tren Panorámico',
    en: 'Magical Machu Picchu by Panoramic Train',
    pt: 'Machu Picchu Mágico em Trem Panorâmico',
    fr: 'Machu Picchu Magique en Train Panoramique',
    it: 'Machu Picchu Magico in Treno Panoramico'
  },
  'Machu Picchu 2 Días con Noche en Aguas Calientes': {
    es: 'Machu Picchu 2 Días con Noche en Aguas Calientes',
    en: 'Machu Picchu 2 Days with Overnight in Aguas Calientes',
    pt: 'Machu Picchu 2 Dias com Pernoite em Aguas Calientes',
    fr: 'Machu Picchu 2 Jours avec Nuit à Aguas Calientes',
    it: 'Machu Picchu 2 Giorni con Pernottamento ad Aguas Calientes'
  },
  'Huacachina Oasis & Islas Ballestas': {
    es: 'Huacachina Oasis & Islas Ballestas',
    en: 'Huacachina Oasis & Ballestas Islands Wildlife Safari',
    pt: 'Oásis Huacachina & Ilhas Ballestas',
    fr: 'Oasis de Huacachina & Îles Ballestas',
    it: 'Oasi di Huacachina & Isole Ballestas'
  },

  // --- DURACIONES DE TOURS ---
  'Full Day': {
    es: 'Día Completo',
    en: 'Full Day',
    pt: 'Dia Completo',
    fr: 'Journée Complète',
    it: 'Giornata Intera'
  },
  'Día Completo': {
    es: 'Día Completo',
    en: 'Full Day',
    pt: 'Dia Completo',
    fr: 'Journée Complète',
    it: 'Giornata Intera'
  },
  'Full Day (05:00 - 18:00)': {
    es: 'Día Completo (05:00 - 18:00)',
    en: 'Full Day (05:00 - 18:00)',
    pt: 'Dia Completo (05:00 - 18:00)',
    fr: 'Journée Complète (05:00 - 18:00)',
    it: 'Giornata Intera (05:00 - 18:00)'
  },
  'Día Completo (05:00 - 18:00)': {
    es: 'Día Completo (05:00 - 18:00)',
    en: 'Full Day (05:00 - 18:00)',
    pt: 'Dia Completo (05:00 - 18:00)',
    fr: 'Journée Complète (05:00 - 18:00)',
    it: 'Giornata Intera (05:00 - 18:00)'
  },
  'Full Day (04:00 - 17:30)': {
    es: 'Día Completo (04:00 - 17:30)',
    en: 'Full Day (04:00 - 17:30)',
    pt: 'Dia Completo (04:00 - 17:30)',
    fr: 'Journée Complète (04:00 - 17:30)',
    it: 'Giornata Intera (04:00 - 17:30)'
  },
  'Día Completo (04:00 - 17:30)': {
    es: 'Día Completo (04:00 - 17:30)',
    en: 'Full Day (04:00 - 17:30)',
    pt: 'Dia Completo (04:00 - 17:30)',
    fr: 'Journée Complète (04:00 - 17:30)',
    it: 'Giornata Intera (04:00 - 17:30)'
  },
  'Full Day (8:00 - 18:00)': {
    es: 'Día Completo (08:00 - 18:00)',
    en: 'Full Day (08:00 - 18:00)',
    pt: 'Dia Completo (08:00 - 18:00)',
    fr: 'Journée Complète (08:00 - 18:00)',
    it: 'Giornata Intera (08:00 - 18:00)'
  },
  'Full Day Fotográfico': {
    es: 'Día Completo Fotográfico',
    en: 'Full Day Photo Journal',
    pt: 'Dia Completo Fotográfico',
    fr: 'Journée Photo Complète',
    it: 'Giornata Fotografica Completa'
  },
  '1 Día Completo': {
    es: '1 Día Completo',
    en: '1 Full Day',
    pt: '1 Dia Completo',
    fr: '1 Journée Complète',
    it: '1 Giornata Intera'
  },
  '2 Días / 1 Noche': {
    es: '2 Días / 1 Noche',
    en: '2 Days / 1 Night',
    pt: '2 Dias / 1 Noite',
    fr: '2 Jours / 1 Nuit',
    it: '2 Giorni / 1 Notte'
  },
  'Español, English, Français, Português, Italiano': {
    es: 'Español, Inglés, Francés, Portugués e Italiano',
    en: 'Spanish, English, French, Portuguese & Italian',
    pt: 'Espanhol, Inglês, Francês, Português e Italiano',
    fr: 'Espagnol, Anglais, Français, Portugais et Italien',
    it: 'Spagnolo, Inglese, Francese, Portoghese e Italiano'
  },
  'Español, English & Français': {
    es: 'Español, Inglés y Francés',
    en: 'Spanish, English & French',
    pt: 'Espanhol, Inglês e Francês',
    fr: 'Espagnol, Anglais et Français',
    it: 'Spagnolo, Inglese e Francese'
  },

  // --- CATEGORÍAS DEL CATÁLOGO DE TOURS ---
  'Aventura & Trekking': {
    es: 'Aventura & Trekking',
    en: 'Adventure & Trekking',
    pt: 'Aventura & Trekking',
    fr: 'Aventure & Randonnée',
    it: 'Avventura & Trekking'
  },
  'Naturaleza & Fotografía': {
    es: 'Naturaleza & Fotografía',
    en: 'Nature & Photography',
    pt: 'Natureza & Fotografia',
    fr: 'Nature & Photographie',
    it: 'Natura & Fotografia'
  },
  'Historia & Maravilla': {
    es: 'Historia & Maravilla',
    en: 'History & Wonder',
    pt: 'História & Maravilha',
    fr: 'Histoire & Merveille',
    it: 'Storia & Meraviglia'
  },
  'Cultura & Arqueología': {
    es: 'Cultura & Arqueología',
    en: 'Culture & Archaeology',
    pt: 'Cultura & Arqueologia',
    fr: 'Culture & Archéologie',
    it: 'Cultura & Archeologia'
  },
  'Experiencia Completa': {
    es: 'Experiencia Completa',
    en: 'Complete Experience',
    pt: 'Experiência Completa',
    fr: 'Expérience Complète',
    it: 'Esperienza Completa'
  },
  'Costa & Desierto': {
    es: 'Costa & Desierto',
    en: 'Coast & Desert Dunes',
    pt: 'Costa & Deserto',
    fr: 'Côte & Désert',
    it: 'Costa & Deserto'
  },

  // --- UBICACIONES DEL CATÁLOGO ---
  'Cusipata - Vinicunca': {
    es: 'Cusipata - Vinicunca',
    en: 'Cusipata - Rainbow Mountain',
    pt: 'Cusipata - Vinicunca',
    fr: 'Cusipata - Vinicunca',
    it: 'Cusipata - Vinicunca'
  },
  'Anta - Mollepata': {
    es: 'Anta - Mollepata',
    en: 'Anta - Mollepata (Humantay)',
    pt: 'Anta - Mollepata',
    fr: 'Anta - Mollepata',
    it: 'Anta - Mollepata'
  },
  'Aguas Calientes': {
    es: 'Aguas Calientes',
    en: 'Aguas Calientes (Machu Picchu Town)',
    pt: 'Aguas Calientes (Machu Picchu)',
    fr: 'Aguas Calientes (Machu Picchu)',
    it: 'Aguas Calientes (Machu Picchu)'
  },
  'Pisac - Ollantaytambo': {
    es: 'Pisac - Ollantaytambo',
    en: 'Pisac & Ollantaytambo (Sacred Valley)',
    pt: 'Pisac & Ollantaytambo (Vale Sagrado)',
    fr: 'Pisac & Ollantaytambo (Vallée Sacrée)',
    it: 'Pisac & Ollantaytambo (Valle Sacra)'
  },
  'Machu Picchu Pueblo': {
    es: 'Machu Picchu Pueblo',
    en: 'Machu Picchu Pueblo (Aguas Calientes)',
    pt: 'Machu Picchu Pueblo',
    fr: 'Machu Picchu Pueblo',
    it: 'Machu Picchu Pueblo'
  },
  'Ica - Paracas': {
    es: 'Ica - Paracas',
    en: 'Ica & Paracas Reserve',
    pt: 'Ica & Paracas',
    fr: 'Ica & Paracas',
    it: 'Ica & Paracas'
  },

  // --- ETIQUETAS Y BADGES CORTOS DE TOURS ---
  'Maravilla del Mundo': {
    es: 'Maravilla del Mundo',
    en: 'World Wonder',
    pt: 'Maravilha do Mundo',
    fr: 'Merveille du Monde',
    it: 'Meraviglia del Mondo'
  },
  'Maravilla': {
    es: 'Maravilla',
    en: 'Wonder',
    pt: 'Maravilha',
    fr: 'Merveille',
    it: 'Meraviglia'
  },
  'Glaciar': {
    es: 'Glaciar',
    en: 'Glacier',
    pt: 'Geleira',
    fr: 'Glacier',
    it: 'Ghiacciaio'
  },
  'Arqueológico': {
    es: 'Arqueológico',
    en: 'Archaeological',
    pt: 'Arqueológico',
    fr: 'Archéologique',
    it: 'Archeologico'
  },
  'Adrenalina': {
    es: 'Adrenalina',
    en: 'Adrenaline',
    pt: 'Adrenalina',
    fr: 'Adrénaline',
    it: 'Adrenalina'
  },
  'Recomendado': {
    es: 'Recomendado',
    en: 'Recommended',
    pt: 'Recomendado',
    fr: 'Recommandé',
    it: 'Raccomandato'
  },
  'Destacado': {
    es: 'Destacado',
    en: 'Featured',
    pt: 'Destaque',
    fr: 'En Vedette',
    it: 'In Evidenza'
  },
  'Imperdible': {
    es: 'Imperdible',
    en: 'Must See',
    pt: 'Imperdível',
    fr: 'Incontournable',
    it: 'Imperdibile'
  },
  'Exclusivo VIP': {
    es: 'Exclusivo VIP',
    en: 'VIP Exclusive',
    pt: 'Exclusivo VIP',
    fr: 'Exclusif VIP',
    it: 'Esclusivo VIP'
  },
  'Más Solicitado': {
    es: 'Más Solicitado',
    en: 'Top Pick',
    pt: 'Mais Procurado',
    fr: 'Le Plus Demandé',
    it: 'Più Richiesto'
  },
  'Tour Seleccionado': {
    es: 'Tour Seleccionado',
    en: 'Selected Tour',
    pt: 'Selecionado',
    fr: 'Sélectionné',
    it: 'Selezionato'
  },

  // --- SUBTÍTULOS Y DESCRIPCIONES ---
  'La Experiencia Definitiva en Cusco': {
    es: 'La Experiencia Definitiva en Cusco',
    en: 'The Ultimate Cusco Experience',
    pt: 'A Experiência Definitiva em Cusco',
    fr: "L'Expérience Ultime à Cusco",
    it: "L'Esperienza Definitiva a Cusco"
  },
  "L'Esperienza Definitiva a Cusco": {
    es: 'La Experiencia Definitiva en Cusco',
    en: 'The Ultimate Cusco Experience',
    pt: 'A Experiência Definitiva em Cusco',
    fr: "L'Expérience Ultime à Cusco",
    it: "L'Esperienza Definitiva a Cusco"
  },
  'L’Esperienza Definitiva a Cusco': {
    es: 'La Experiencia Definitiva en Cusco',
    en: 'The Ultimate Cusco Experience',
    pt: 'A Experiência Definitiva em Cusco',
    fr: "L’Expérience Ultime à Cusco",
    it: 'L’Esperienza Definitiva a Cusco'
  },
  'The Ultimate Cusco Experience': {
    es: 'La Experiencia Definitiva en Cusco',
    en: 'The Ultimate Cusco Experience',
    pt: 'A Experiência Definitiva em Cusco',
    fr: "L'Expérience Ultime à Cusco",
    it: "L'Esperienza Definitiva a Cusco"
  },
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
  'Tourist transportation Cusco - Mollepata round-trip': {
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
  'Sky glass domes and fully equipped mountain campsites': {
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
  'Nutritious mountain meals prepared by local camp chefs': {
    es: 'Alimentación nutritiva de montaña',
    en: 'Nutritious mountain meals prepared by local camp chefs',
    pt: 'Alimentação nutritiva de montanha preparada por chefs locais',
    fr: 'Repas nutritifs de montagne préparés par des chefs de camp',
    it: 'Pasti montani nutrienti preparati da chef locali'
  },
  '¿Qué hace inolvidable esta experiencia?': {
    es: '¿Qué hace inolvidable esta experiencia?',
    en: 'What Makes This Experience Unforgettable?',
    pt: 'O que torna esta experiência inesquecível?',
    fr: 'Qu’est-ce qui rend cette expérience inoubliable ?',
    it: 'Cosa rende questa esperienza indimenticabile?'
  },
  'What Makes This Experience Unforgettable?': {
    es: '¿Qué hace inolvidable esta experiencia?',
    en: 'What Makes This Experience Unforgettable?',
    pt: 'O que torna esta experiência inesquecível?',
    fr: 'Qu’est-ce qui rend cette expérience inoubliable ?',
    it: 'Cosa rende questa esperienza indimenticabile?'
  },
  'What makes this experience unforgettable?': {
    es: '¿Qué hace inolvidable esta experiencia?',
    en: 'What Makes This Experience Unforgettable?',
    pt: 'O que torna esta experiência inesquecível?',
    fr: 'Qu’est-ce qui rend cette expérience inoubliable ?',
    it: 'Cosa rende questa esperienza indimenticabile?'
  },
  'What makes this tour exceptional?': {
    es: '¿Qué hace inolvidable esta experiencia?',
    en: 'What Makes This Experience Unforgettable?',
    pt: 'O que torna esta experiência inesquecível?',
    fr: 'Qu’est-ce qui rend cette expérience inoubliable ?',
    it: 'Cosa rende questa esperienza indimenticabile?'
  },
  'Servicio 100% coordinado y garantizado con estándares de seguridad turística.': {
    es: 'Servicio 100% coordinado y garantizado con estándares de seguridad turística.',
    en: '100% coordinated and guaranteed service under official tourism safety standards.',
    pt: 'Serviço 100% coordenado e garantido com padrões oficiais de segurança turística.',
    fr: 'Service 100% coordonné et garanti selon les normes officielles de sécurité touristique.',
    it: 'Servizio coordinato e garantito al 100% con standard ufficiali di sicurezza turistica.'
  },
  '100% coordinated and guaranteed service under official tourism safety standards.': {
    es: 'Servicio 100% coordinado y garantizado con estándares de seguridad turística.',
    en: '100% coordinated and guaranteed service under official tourism safety standards.',
    pt: 'Serviço 100% coordenado e garantido com padrões oficiais de segurança turística.',
    fr: 'Service 100% coordonné et garanti selon les normes officielles de sécurité touristique.',
    it: 'Servizio coordinato e garantito al 100% con standard ufficiali di sicurezza turistica.'
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
  },
  // --- TÍTULOS SIN EM-DASH (—) ---
  'Live Your Adventure: Expediciones & Trekking en Cusco: La Experiencia Definitiva en Cusco': {
    es: 'Vive Tu Aventura: Expediciones & Trekking en Cusco: La Experiencia Definitiva en Cusco',
    en: 'Live Your Adventure: Expeditions & Trekking in Cusco: The Ultimate Cusco Experience',
    pt: 'Viva Sua Aventura: Expedições & Trekking em Cusco: A Experiência Definitiva em Cusco',
    fr: 'Vivez Votre Aventure: Expéditions & Trekking à Cusco : L’Expérience Ultime à Cusco',
    it: 'Vivi La Tua Avventura: Spedizioni & Trekking a Cusco: L’Esperienza Definitiva a Cusco'
  },
  'Vive Tu Aventura: Expediciones & Trekking en Cusco: La Experiencia Definitiva en Cusco': {
    es: 'Vive Tu Aventura: Expediciones & Trekking en Cusco: La Experiencia Definitiva en Cusco',
    en: 'Live Your Adventure: Expeditions & Trekking in Cusco: The Ultimate Cusco Experience',
    pt: 'Viva Sua Aventura: Expedições & Trekking em Cusco: A Experiência Definitiva em Cusco',
    fr: 'Vivez Votre Aventure: Expéditions & Trekking à Cusco : L’Expérience Ultime à Cusco',
    it: 'Vivi La Tua Avventura: Spedizioni & Trekking a Cusco: L’Esperienza Definitiva a Cusco'
  },
  'Live Your Adventure: Expeditions & Trekking in Cusco: The Ultimate Cusco Experience': {
    es: 'Vive Tu Aventura: Expediciones & Trekking en Cusco: La Experiencia Definitiva en Cusco',
    en: 'Live Your Adventure: Expeditions & Trekking in Cusco: The Ultimate Cusco Experience',
    pt: 'Viva Sua Aventura: Expedições & Trekking em Cusco: A Experiência Definitiva em Cusco',
    fr: 'Vivez Votre Aventure: Expéditions & Trekking à Cusco : L’Expérience Ultime à Cusco',
    it: 'Vivi La Tua Avventura: Spedizioni & Trekking a Cusco: L’Esperienza Definitiva a Cusco'
  },
  'Live Your Adventure: Expediciones & Trekking en Cusco': {
    es: 'Vive Tu Aventura: Expediciones & Trekking en Cusco',
    en: 'Live Your Adventure: Expeditions & Trekking in Cusco',
    pt: 'Viva Sua Aventura: Expedições & Trekking em Cusco',
    fr: 'Vivez Votre Aventure: Expéditions & Trekking à Cusco',
    it: 'Vivi La Tua Avventura: Spedizioni & Trekking a Cusco'
  },
  'Vive Tu Aventura: Expediciones & Trekking en Cusco': {
    es: 'Vive Tu Aventura: Expediciones & Trekking en Cusco',
    en: 'Live Your Adventure: Expeditions & Trekking in Cusco',
    pt: 'Viva Sua Aventura: Expedições & Trekking em Cusco',
    fr: 'Vivez Votre Aventure: Expéditions & Trekking à Cusco',
    it: 'Vivi La Tua Avventura: Spedizioni & Trekking a Cusco'
  },
  'Live Your Adventure: Expeditions & Trekking in Cusco': {
    es: 'Vive Tu Aventura: Expediciones & Trekking en Cusco',
    en: 'Live Your Adventure: Expeditions & Trekking in Cusco',
    pt: 'Viva Sua Aventura: Expedições & Trekking em Cusco',
    fr: 'Vivez Votre Aventure: Expéditions & Trekking à Cusco',
    it: 'Vivi La Tua Avventura: Spedizioni & Trekking a Cusco'
  },

  // --- CATEGORÍAS ADICIONALES Y FILTROS ---
  'Trekking & Montaña': {
    es: 'Trekking & Montaña',
    en: 'Trekking & Mountain',
    pt: 'Trekking & Montanha',
    fr: 'Trekking & Montagne',
    it: 'Trekking & Montagna'
  },
  'Clásicos & Cultura': {
    es: 'Clásicos & Cultura',
    en: 'Classics & Culture',
    pt: 'Clássicos & Cultura',
    fr: 'Classiques & Culture',
    it: 'Classici & Cultura'
  },
  'Salidas Garantizadas 2025 - 2026': {
    es: 'Salidas Garantizadas 2025 - 2026',
    en: 'Guaranteed Departures 2025 - 2026',
    pt: 'Saídas Garantidas 2025 - 2026',
    fr: 'Départs Garantis 2025 - 2026',
    it: 'Partenze Garantite 2025 - 2026'
  },

  // --- DESTINOS POPULARES ---
  'Machu Picchu Santuario': {
    es: 'Machu Picchu Santuario',
    en: 'Machu Picchu Sanctuary',
    pt: 'Santuário de Machu Picchu',
    fr: 'Sanctuaire de Machu Picchu',
    it: 'Santuario di Machu Picchu'
  },
  'Ciudadela sagrada, Templo del Sol y terrazas agrícolas': {
    es: 'Ciudadela sagrada, Templo del Sol y terrazas agrícolas',
    en: 'Sacred citadel, Sun Temple, and agricultural terraces',
    pt: 'Cidadela sagrada, Templo do Sol e terraços agrícolas',
    fr: 'Citadelle sacrée, Temple du Soleil et terrasses agricoles',
    it: 'Cittadella sacra, Tempio del Sole e terrazze agricole'
  },
  'Subtropical templado (12°C - 24°C)': {
    es: 'Subtropical templado (12°C - 24°C)',
    en: 'Mild subtropical (12°C - 24°C)',
    pt: 'Subtropical temperado (12°C - 24°C)',
    fr: 'Subtropical doux (12°C - 24°C)',
    it: 'Subtropicale temperato (12°C - 24°C)'
  },
  'Laguna Humantay': {
    es: 'Laguna Humantay',
    en: 'Humantay Lake',
    pt: 'Lagoa Humantay',
    fr: 'Lagune Humantay',
    it: 'Laguna Humantay'
  },
  'Turquesa Glaciar': {
    es: 'Turquesa Glaciar',
    en: 'Glacial Turquoise',
    pt: 'Turquesa Glaciar',
    fr: 'Turquoise Glaciaire',
    it: 'Turchese Glaciale'
  },
  'Espejo de agua glaciar a los pies del Nevado Salkantay': {
    es: 'Espejo de agua glaciar a los pies del Nevado Salkantay',
    en: 'Glacial mirror lake at the foot of Mount Salkantay',
    pt: 'Espelho d’água glaciar aos pés do Nevado Salkantay',
    fr: 'Miroir d’eau glaciaire au pied du mont Salkantay',
    it: 'Specchio d’acqua glaciale ai piedi del Monte Salkantay'
  },
  'Frío alpino / Viento de altura (4°C - 14°C)': {
    es: 'Frío alpino / Viento de altura (4°C - 14°C)',
    en: 'Alpine cold / High-altitude wind (4°C - 14°C)',
    pt: 'Frio alpino / Vento de altitude (4°C - 14°C)',
    fr: 'Froid alpin / Vent d’altitude (4°C - 14°C)',
    it: 'Freddo alpino / Vento d’alta quota (4°C - 14°C)'
  },
  'Montaña de 7 Colores': {
    es: 'Montaña de 7 Colores',
    en: 'Rainbow Mountain',
    pt: 'Montanha de 7 Cores',
    fr: 'Montagne aux 7 Couleurs',
    it: 'Montagna dei 7 Colori'
  },
  'Formación Geológica': {
    es: 'Formación Geológica',
    en: 'Geological Wonder',
    pt: 'Formação Geológica',
    fr: 'Formation Géologique',
    it: 'Formazione Geologica'
  },
  'Cordillera arcoíris milenaria con vista al Ausangate': {
    es: 'Cordillera arcoíris milenaria con vista al Ausangate',
    en: 'Millenary rainbow ridge with scenic views of Mount Ausangate',
    pt: 'Cordilheira arco-íris milenar com vista para o Ausangate',
    fr: 'Chaîne arc-en-ciel millénaire avec vue sur l’Ausangate',
    it: 'Catena arcobaleno millenaria con vista sull’Ausangate'
  },
  'Alta montaña frígida (0°C - 12°C)': {
    es: 'Alta montaña frígida (0°C - 12°C)',
    en: 'Frigid high mountain (0°C - 12°C)',
    pt: 'Alta montanha frígida (0°C - 12°C)',
    fr: 'Haute montagne froide (0°C - 12°C)',
    it: 'Alta montagna rigida (0°C - 12°C)'
  },
  'Valle Sagrado de los Incas': {
    es: 'Valle Sagrado de los Incas',
    en: 'Sacred Valley of the Incas',
    pt: 'Vale Sagrado dos Incas',
    fr: 'Vallée Sacrée des Incas',
    it: 'Valle Sacra degli Inca'
  },
  'Historia Viva & Cultura': {
    es: 'Historia Viva & Cultura',
    en: 'Living History & Heritage',
    pt: 'História Viva & Cultura',
    fr: 'Histoire Vivante & Culture',
    it: 'Storia Vivente & Cultura'
  },
  'Ollantaytambo, terrazas de Pisac y ferias artesanales': {
    es: 'Ollantaytambo, terrazas de Pisac y ferias artesanales',
    en: 'Ollantaytambo fortress, Pisac terraces, and craft markets',
    pt: 'Ollantaytambo, terraços de Pisac e feiras de artesanato',
    fr: 'Ollantaytambo, terrasses de Pisac et marchés artisanaux',
    it: 'Ollantaytambo, terrazze di Pisac e mercati artigianali'
  },
  'Templado andino acogedor (10°C - 22°C)': {
    es: 'Templado andino acogedor (10°C - 22°C)',
    en: 'Cozy mild Andean climate (10°C - 22°C)',
    pt: 'Temperado andino acolhedor (10°C - 22°C)',
    fr: 'Climat andin doux et tempéré (10°C - 22°C)',
    it: 'Clima andino mite e accogliente (10°C - 22°C)'
  },
  'Salineras de Maras & Moray': {
    es: 'Salineras de Maras & Moray',
    en: 'Maras Salt Mines & Moray',
    pt: 'Salinas de Maras & Moray',
    fr: 'Salines de Maras & Moray',
    it: 'Saline di Maras & Moray'
  },
  'Ingeniería Ancestral': {
    es: 'Ingeniería Ancestral',
    en: 'Ancestral Engineering',
    pt: 'Engenharia Ancestral',
    fr: 'Ingénierie Ancestrale',
    it: 'Ingegneria Ancestrale'
  },
  'Más de 3,000 pozas de sal rosada y andenes circulares': {
    es: 'Más de 3,000 pozas de sal rosada y andenes circulares',
    en: 'Over 3,000 pink salt pools and concentric agricultural rings',
    pt: 'Mais de 3.000 poços de sal rosa e terraços circulares',
    fr: 'Plus de 3 000 bassins de sel rose et terrasses circulaires',
    it: 'Oltre 3.000 vasche di sale rosa e terrazze concentriche'
  },
  'Soleado y seco de valle (8°C - 20°C)': {
    es: 'Soleado y seco de valle (8°C - 20°C)',
    en: 'Sunny and dry valley climate (8°C - 20°C)',
    pt: 'Ensolarado e seco de vale (8°C - 20°C)',
    fr: 'Ensoleillé et sec de vallée (8°C - 20°C)',
    it: 'Soleggiato e asciutto di valle (8°C - 20°C)'
  },
  'Choquequirao & Cañón Apurímac': {
    es: 'Choquequirao & Cañón Apurímac',
    en: 'Choquequirao & Apurimac Canyon',
    pt: 'Choquequirao & Cânion Apurímac',
    fr: 'Choquequirao & Canyon d’Apurímac',
    it: 'Choquequirao & Canyon Apurímac'
  },
  'Aventura Mística Pura': {
    es: 'Aventura Mística Pura',
    en: 'Pure Mystical Adventure',
    pt: 'Aventura Mística Pura',
    fr: 'Aventure Mystique Pure',
    it: 'Avventura Mistica Pura'
  },
  'La hermana sagrada de Machu Picchu sin multitudes': {
    es: 'La hermana sagrada de Machu Picchu sin multitudes',
    en: 'The sacred sister citadel of Machu Picchu without crowds',
    pt: 'A irmã sagrada de Machu Picchu sem multidões',
    fr: 'La sœur sacrée de Machu Picchu sans les foules',
    it: 'La sorella sacra di Machu Picchu senza folla'
  },
  'Templado de cañón andino (12°C - 25°C)': {
    es: 'Templado de cañón andino (12°C - 25°C)',
    en: 'Mild Andean canyon weather (12°C - 25°C)',
    pt: 'Temperado de cânion andino (12°C - 25°C)',
    fr: 'Climat doux de canyon andin (12°C - 25°C)',
    it: 'Clima mite di canyon andino (12°C - 25°C)'
  },

  // --- ESPECIFICACIONES TÉCNICAS, CRÓNICA & MODALES ---
  'Duración': {
    es: 'Duración',
    en: 'Duration',
    pt: 'Duração',
    fr: 'Durée',
    it: 'Durata'
  },
  'Altitud Máxima': {
    es: 'Altitud Máxima',
    en: 'Maximum Altitude',
    pt: 'Altitude Máxima',
    fr: 'Altitude Maximale',
    it: 'Altitudine Massima'
  },
  'Dificultad': {
    es: 'Dificultad',
    en: 'Difficulty Level',
    pt: 'Dificuldade',
    fr: 'Difficulté',
    it: 'Difficoltà'
  },
  'Modalidad': {
    es: 'Modalidad',
    en: 'Modality',
    pt: 'Modalidade',
    fr: 'Modalité',
    it: 'Modalità'
  },
  'Toca para ver detalle ➔': {
    es: 'Toca para ver detalle ➔',
    en: 'Tap for details ➔',
    pt: 'Toque para detalhes ➔',
    fr: 'Touchez pour voir les détails ➔',
    it: 'Tocca per dettagli ➔'
  },
  'Oxígeno incluido ➔': {
    es: 'Oxígeno incluido ➔',
    en: 'Oxygen included ➔',
    pt: 'Oxigênio incluso ➔',
    fr: 'Oxygène inclus ➔',
    it: 'Ossigeno incluso ➔'
  },
  'Ritmo adaptable ➔': {
    es: 'Ritmo adaptable ➔',
    en: 'Adaptive pace ➔',
    pt: 'Ritmo adaptável ➔',
    fr: 'Rythme adaptable ➔',
    it: 'Ritmo adattabile ➔'
  },
  'Máx 8 personas ➔': {
    es: 'Máx 8 personas ➔',
    en: 'Max 8 travelers ➔',
    pt: 'Máx 8 pessoas ➔',
    fr: 'Max 8 personnes ➔',
    it: 'Max 8 persone ➔'
  },
  'Filosofía de Expedición': {
    es: 'Filosofía de Expedición',
    en: 'Expedition Philosophy',
    pt: 'Filosofia da Expedição',
    fr: 'Philosophie d’Expédition',
    it: 'Filosofia di Spedizione'
  },
  'Expediciones Diseñadas por Expertos Andinos': {
    es: 'Expediciones Diseñadas por Expertos Andinos',
    en: 'Expeditions Designed by Andean Experts',
    pt: 'Expedições Projetadas por Especialistas Andinos',
    fr: 'Expéditions Conçues par des Experts Andins',
    it: 'Spedizioni Disegnate da Esperti Andini'
  },
  'Nuestra filosofía combina senderismo inmersivo con seguridad biomédica y hotelería de montaña. Cada travesía por los valles y cordilleras del Cusco cuenta con monitoreo satelital, guías acreditados por DIRCETUR y experiencias gastronómicas con productos autóctonos orgánicos.': {
    es: 'Nuestra filosofía combina senderismo inmersivo con seguridad biomédica y hotelería de montaña. Cada travesía por los valles y cordilleras del Cusco cuenta con monitoreo satelital, guías acreditados por DIRCETUR y experiencias gastronómicas con productos autóctonos orgánicos.',
    en: 'Our philosophy combines immersive hiking with biomedical safety and mountain hospitality. Every journey through the valleys and ranges of Cusco features satellite tracking, DIRCETUR-licensed guides, and gourmet dining with indigenous organic ingredients.',
    pt: 'Nossa filosofia combina caminhadas imersivas com segurança biomédica e hotelaria de montanha. Cada travessia pelos vales e cordilheiras de Cusco conta com rastreamento por satélite, guias credenciados pela DIRCETUR e experiências gastronômicas com produtos orgânicos nativos.',
    fr: 'Notre philosophie allie randonnée immersive, sécurité biomédicale et hôtellerie de montagne. Chaque traversée des vallées et cordillères de Cusco bénéficie d’un suivi par satellite, de guides certifiés DIRCETUR et d’expériences gastronomiques aux produits biologiques locaux.',
    it: 'La nostra filosofia combina trekking immersivo con sicurezza biomedica e ospitalità di montagna. Ogni traversata nelle valli e cordigliere di Cusco vanta tracciamento satellitare, guide abilitate DIRCETUR ed esperienze gastronomiche con prodotti biologici indigeni.'
  },
  'Tarifa Oficial por Persona:': {
    es: 'Tarifa Oficial por Persona:',
    en: 'Official Rate per Person:',
    pt: 'Tarifa Oficial por Pessoa:',
    fr: 'Tarif Officiel par Personne :',
    it: 'Tariffa Ufficiale a Persona:'
  },
  'Rutas Planificadas': {
    es: 'Rutas Planificadas',
    en: 'Planned Routes',
    pt: 'Rotas Planejadas',
    fr: 'Itinéraires Planifiés',
    it: 'Percorsi Pianificati'
  },
  'Logística Integral': {
    es: 'Logística Integral',
    en: 'Comprehensive Logistics',
    pt: 'Logística Integral',
    fr: 'Logistique Complète',
    it: 'Logistica Integrale'
  },
  'Asistidos con protocolo médico de altitud.': {
    es: 'Asistidos con protocolo médico de altitud.',
    en: 'Assisted with certified altitude medical protocol.',
    pt: 'Assistidos com protocolo médico de altitude.',
    fr: 'Assistés avec protocole médical d’altitude.',
    it: 'Assistiti con protocollo medico per l’altitudine.'
  },
  'Calificaciones 5 estrellas en TripAdvisor & Google.': {
    es: 'Calificaciones 5 estrellas en TripAdvisor & Google.',
    en: '5-star reviews on TripAdvisor & Google.',
    pt: 'Avaliações 5 estrelas no TripAdvisor & Google.',
    fr: 'Notes 5 étoiles sur TripAdvisor & Google.',
    it: 'Recensioni a 5 stelle su TripAdvisor & Google.'
  },
  'Momentos Inolvidables': {
    es: 'Momentos Inolvidables',
    en: 'Unforgettable Moments',
    pt: 'Momentos Inesquecíveis',
    fr: 'Moments Inoubliables',
    it: 'Momenti Indimenticabili'
  },
  'Fotografía escénica': {
    es: 'Fotografía escénica',
    en: 'Scenic photography',
    pt: 'Fotografia cênica',
    fr: 'Photographie panoramique',
    it: 'Fotografia panoramica'
  },
  'Cronograma Oficial': {
    es: 'Cronograma Oficial',
    en: 'Official Schedule',
    pt: 'Cronograma Oficial',
    fr: 'Programme Officiel',
    it: 'Programma Ufficiale'
  },
  'Equipamiento & Confort': {
    es: 'Equipamiento & Confort',
    en: 'Equipment & Comfort',
    pt: 'Equipamento & Conforto',
    fr: 'Équipement & Confort',
    it: 'Attrezzatura & Comfort'
  },
  'Cobertura garantizada de alta montaña': {
    es: 'Cobertura garantizada de alta montaña',
    en: 'Guaranteed high-mountain coverage',
    pt: 'Cobertura garantida de alta montanha',
    fr: 'Couverture garantie de haute montagne',
    it: 'Copertura garantita di alta montagna'
  },
  'Consultar itinerario de esta jornada': {
    es: 'Consultar itinerario de esta jornada',
    en: 'Inquire about this day’s schedule',
    pt: 'Consultar roteiro deste dia',
    fr: 'Consulter l’itinéraire de cette journée',
    it: 'Richiedi programma di questa giornata'
  },
  '4.9 / 5.0 en Reseñas Internacionales': {
    es: '4.9 / 5.0 en Reseñas Internacionales',
    en: '4.9 / 5.0 in Global Reviews',
    pt: '4.9 / 5.0 em Avaliações Internacionais',
    fr: '4.9 / 5.0 en Avis Internationaux',
    it: '4.9 / 5.0 nelle Recensioni Internazionali'
  },
  '50+ Rutas': {
    es: '50+ Rutas',
    en: '50+ Routes',
    pt: '50+ Rotas',
    fr: '50+ Itinéraires',
    it: '50+ Percorsi'
  },
  'Destinos de Autor': {
    es: 'Destinos de Autor',
    en: 'Curated Destinations',
    pt: 'Destinos Exclusivos',
    fr: 'Destinations Signatures',
    it: 'Destinazioni Esclusive'
  },
  '100K+ Turistas': {
    es: '100K+ Turistas',
    en: '100K+ Travelers',
    pt: '100K+ Turistas',
    fr: '100K+ Voyageurs',
    it: '100K+ Turisti'
  },
  'Experiencias Felices': {
    es: 'Experiencias Felices',
    en: 'Happy Experiences',
    pt: 'Experiências Felizes',
    fr: 'Expériences Mémorables',
    it: 'Esperienze Felici'
  },
  '4.9★ Promedio': {
    es: '4.9★ Promedio',
    en: '4.9★ Average',
    pt: '4.9★ Média',
    fr: '4.9★ Moyenne',
    it: '4.9★ Media'
  },
  'TripAdvisor & Google': {
    es: 'TripAdvisor & Google',
    en: 'TripAdvisor & Google',
    pt: 'TripAdvisor & Google',
    fr: 'TripAdvisor & Google',
    it: 'TripAdvisor & Google'
  },
  '24/7 Soporte': {
    es: '24/7 Soporte',
    en: '24/7 Support',
    pt: '24/7 Suporte',
    fr: 'Support 24/7',
    it: 'Supporto 24/7'
  },
  'Oxígeno y Asistencia': {
    es: 'Oxígeno y Asistencia',
    en: 'Oxygen & Assistance',
    pt: 'Oxigênio e Assistência',
    fr: 'Oxygène et Assistance',
    it: 'Ossigeno e Assistenza'
  },
  'Entendido': {
    es: 'Entendido',
    en: 'Understood',
    pt: 'Entendido',
    fr: 'Compris',
    it: 'Ho capito'
  },

  // --- CLIMA, ESPECIFICACIONES & ITINERARIO EMERALD ---
  'Clima': {
    es: 'Clima',
    en: 'Climate',
    pt: 'Clima',
    fr: 'Climat',
    it: 'Clima'
  },
  'Altitud': {
    es: 'Altitud',
    en: 'Altitude',
    pt: 'Altitude',
    fr: 'Altitude',
    it: 'Altitudine'
  },
  'Caminata': {
    es: 'Caminata',
    en: 'Hiking',
    pt: 'Caminhada',
    fr: 'Randonnée',
    it: 'Camminata'
  },
  'Comidas': {
    es: 'Comidas',
    en: 'Meals',
    pt: 'Refeições',
    fr: 'Repas',
    it: 'Pasti'
  },
  'Hospedaje': {
    es: 'Hospedaje',
    en: 'Lodging',
    pt: 'Hospedagem',
    fr: 'Hébergement',
    it: 'Alloggio'
  },
  'Lunes a Domingo: 07:00 - 21:00': {
    es: 'Lunes a Domingo: 07:00 - 21:00',
    en: 'Monday to Sunday: 07:00 - 21:00',
    pt: 'Segunda a Domingo: 07:00 - 21:00',
    fr: 'Du Lundi au Dimanche : 07h00 - 21h00',
    it: 'Da Lunedì a Domenica: 07:00 - 21:00'
  },

  // --- DÍAS DE ITINERARIO POR DEFECTO EMERALD ---
  'Cusco Imperial, Miradores del Valle Sagrado & Aclimatación': {
    es: 'Cusco Imperial, Miradores del Valle Sagrado & Aclimatación',
    en: 'Imperial Cusco, Sacred Valley Viewpoints & Acclimatization',
    pt: 'Cusco Imperial, Mirantes do Vale Sagrado & Aclimatação',
    fr: 'Cusco Impérial, Points de Vue de la Vallée Sacrée & Acclimatation',
    it: 'Cusco Imperiale, Belvedere della Valle Sacra & Acclimatazione'
  },
  'Recepción privada en el hotel, travesía por los miradores del Valle Sagrado, sesión de aclimatación con infusiones de muña y briefing técnico con el guía oficial colegiado.': {
    es: 'Recepción privada en el hotel, travesía por los miradores del Valle Sagrado, sesión de aclimatación con infusiones de muña y briefing técnico con el guía oficial colegiado.',
    en: 'Private hotel reception, journey through Sacred Valley viewpoints, acclimatization session with native muña herbal tea, and technical briefing with the licensed guide.',
    pt: 'Recepção privativa no hotel, travessia pelos mirantes do Vale Sagrado, sessão de aclimatação com infusões de muña e briefing técnico com o guia credenciado.',
    fr: 'Accueil privé à l’hôtel, traversée des belvédères de la Vallée Sacrée, séance d’acclimatation aux infusions de muña et briefing technique avec le guide certifié.',
    it: 'Accoglienza privata in hotel, traversata dei belvedere della Valle Sacra, sessione di acclimatazione con tisane di muña e briefing tecnico con la guida certificata.'
  },
  '3-4 hrs (Paseo ligero)': {
    es: '3-4 hrs (Paseo ligero)',
    en: '3-4 hrs (Gentle walk)',
    pt: '3-4 hrs (Caminhada leve)',
    fr: '3-4 h (Marche douce)',
    it: '3-4 ore (Passeggiata leggera)'
  },
  'Almuerzo Campestre & Cena de Bienvenida': {
    es: 'Almuerzo Campestre & Cena de Bienvenida',
    en: 'Country Lunch & Welcome Dinner',
    pt: 'Almoço Campestre & Jantar de Boas-Vindas',
    fr: 'Déjeuner Champêtre & Dîner de Bienvenue',
    it: 'Pranzo Campestre & Cena di Benvenuto'
  },
  'Hotel Boutique Valle Sagrado': {
    es: 'Hotel Boutique Valle Sagrado',
    en: 'Sacred Valley Boutique Hotel',
    pt: 'Hotel Boutique Vale Sagrado',
    fr: 'Hôtel Boutique Vallée Sacrée',
    it: 'Hotel Boutique Valle Sacra'
  },

  'Ascenso Escénico, Paso de Alta Montaña & Lagunas Glaciares': {
    es: 'Ascenso Escénico, Paso de Alta Montaña & Lagunas Glaciares',
    en: 'Scenic Ascent, High Mountain Pass & Glacier Lagoons',
    pt: 'Subida Cênica, Passo de Alta Montanha & Lagoas Glaciais',
    fr: 'Ascension Panoramique, Col de Haute Montagne & Lagunes Glaciaires',
    it: 'Salita Panoramica, Valico di Alta Montagna & Lagune Glaciali'
  },
  'Trekking matutino atravesando bosques de queñuales hacia las lagunas turquesas a los pies del nevado. Almuerzo gourmet de montaña y campamento bajo las estrellas andinas.': {
    es: 'Trekking matutino atravesando bosques de queñuales hacia las lagunas turquesas a los pies del nevado. Almuerzo gourmet de montaña y campamento bajo las estrellas andinas.',
    en: 'Morning trek through native Polylepis forests towards turquoise lagoons beneath the snow-capped peak. Mountain gourmet lunch and glamping under Andean stars.',
    pt: 'Trekking matinal atravessando florestas de queñuales rumo às lagoas turquesas ao pé da montanha nevada. Almoço gourmet de montanha e acampamento sob as estrelas andinas.',
    fr: 'Trek matinal à travers les forêts de quéñuales vers les lagunes turquoise au pied du mont enneigé. Déjeuner gastronomique de montagne et campement sous les étoiles andines.',
    it: 'Trekking mattutino attraverso boschi di queñuales verso lagune turchesi ai piedi della vetta innevata. Pranzo gourmet di montagna e campeggio sotto le stelle andine.'
  },
  '6-7 hrs (Ascenso gradual)': {
    es: '6-7 hrs (Ascenso gradual)',
    en: '6-7 hrs (Gradual ascent)',
    pt: '6-7 hrs (Subida gradual)',
    fr: '6-7 h (Montée progressive)',
    it: '6-7 ore (Salita graduale)'
  },
  'Desayuno Andino, Almuerzo Gourmet & Cena': {
    es: 'Desayuno Andino, Almuerzo Gourmet & Cena',
    en: 'Andean Breakfast, Gourmet Lunch & Dinner',
    pt: 'Café da Manhã Andino, Almoço Gourmet & Jantar',
    fr: 'Petit-déjeuner Andin, Déjeuner Gastronomique & Dîner',
    it: 'Colazione Andina, Pranzo Gourmet & Cena'
  },
  'Alimentación Completa de Montaña': {
    es: 'Alimentación Completa de Montaña',
    en: 'Full Mountain Dining Service',
    pt: 'Alimentação Completa de Montanha',
    fr: 'Pension Complète de Montagne',
    it: 'Pensione Completa di Montagna'
  },
  'Domo Glamping con Vista a las Estrellas': {
    es: 'Domo Glamping con Vista a las Estrellas',
    en: 'Stargazing Glamping Dome',
    pt: 'Domo Glamping com Vista para as Estrelas',
    fr: 'Dôme Glamping Vue sur les Étoiles',
    it: 'Cupola Glamping con Vista sulle Stelle'
  },

  'Descenso a Ceja de Selva, Plantaciones de Café & Aguas Termales': {
    es: 'Descenso a Ceja de Selva, Plantaciones de Café & Aguas Termales',
    en: 'Descent into Cloud Forest, Coffee Plantations & Thermal Springs',
    pt: 'Descida para a Selva Alta, Plantações de Café & Termas',
    fr: 'Descente vers la Forêt Nuageuse, Plantations de Café & Eaux Thermales',
    it: 'Discesa nella Foresta Pluviale, Piantagioni di Caffè & Terme'
  },
  'Travesía por valles subtropicales con vegetación exuberante, visita a productores de café orgánico y relajación en aguas termales naturales medicinales.': {
    es: 'Travesía por valles subtropicales con vegetación exuberante, visita a productores de café orgánico y relajación en aguas termales naturales medicinales.',
    en: 'Journey across lush subtropical valleys, visit to organic coffee farmers, and relaxing soak in medicinal natural hot springs.',
    pt: 'Travessia por vales subtropicais com vegetação exuberante, visita a cafeicultores orgânicos e relaxamento em águas termais medicinais naturais.',
    fr: 'Traversée de vallées subtropicales à la végétation luxuriante, visite de caféiculteurs biologiques et baignade délassante dans les thermes naturels.',
    it: 'Traversata di vallate subtropicali lussureggianti, visita ai produttori di caffè biologico e relax nelle acque termali medicinali.'
  },
  '5 hrs (Descenso escénico)': {
    es: '5 hrs (Descenso escénico)',
    en: '5 hrs (Scenic descent)',
    pt: '5 hrs (Descida cênica)',
    fr: '5 h (Descente panoramique)',
    it: '5 ore (Discesa panoramica)'
  },
  'Desayuno, Almuerzo Típico & Cena': {
    es: 'Desayuno, Almuerzo Típico & Cena',
    en: 'Breakfast, Traditional Lunch & Dinner',
    pt: 'Café da Manhã, Almoço Típico & Jantar',
    fr: 'Petit-déjeuner, Déjeuner Typique & Dîner',
    it: 'Colazione, Pranzo Tipico & Cena'
  },
  'Alimentación Completa': {
    es: 'Alimentación Completa',
    en: 'All Meals Included',
    pt: 'Alimentação Completa',
    fr: 'Pension Complète',
    it: 'Pasti Completi'
  },
  'Eco-Lodge en Ceja de Selva': {
    es: 'Eco-Lodge en Ceja de Selva',
    en: 'Cloud Forest Eco-Lodge',
    pt: 'Eco-Lodge na Selva Alta',
    fr: 'Écolodge en Lisière de Forêt',
    it: 'Eco-Lodge nella Foresta Pluviale'
  },

  'Amanecer en la Ciudadela Sagrada de Machu Picchu & Retorno VIP': {
    es: 'Amanecer en la Ciudadela Sagrada de Machu Picchu & Retorno VIP',
    en: 'Sunrise at Sacred Citadel of Machu Picchu & VIP Return',
    pt: 'Amanhecer na Cidadela Sagrada de Machu Picchu & Retorno VIP',
    fr: 'Lever de Soleil sur la Citadelle Sacrée de Machu Picchu & Retour VIP',
    it: 'Alba nella Cittadella Sacra di Machu Picchu & Rientro VIP'
  },
  'Acceso en primer turno a Machu Picchu para capturar la clásica postal con luz dorada. Recorrido arqueológico guiado de 3 horas y retorno en tren panorámico a Cusco.': {
    es: 'Acceso en primer turno a Machu Picchu para capturar la clásica postal con luz dorada. Recorrido arqueológico guiado de 3 horas y retorno en tren panorámico a Cusco.',
    en: 'First-shift entry to Machu Picchu to capture the classic golden-hour postcard shot. 3-hour guided archaeological tour and panoramic train return to Cusco.',
    pt: 'Acesso no primeiro horário a Machu Picchu para a foto clássica com luz dourada. Circuito arqueológico guiado de 3 horas e retorno em trem panorâmico para Cusco.',
    fr: 'Accès au premier créneau à Machu Picchu pour la photo classique dans la lumière dorée. Visite guidée de 3 heures du site archéologique et retour en train panoramique à Cusco.',
    it: 'Accesso al primo turno a Machu Picchu per la classica cartolina con luce dorata. Tour guidato archeologico di 3 ore e rientro panoramico in treno a Cusco.'
  },
  '3 hrs (Tour guiado histórico)': {
    es: '3 hrs (Tour guiado histórico)',
    en: '3 hrs (Historical guided tour)',
    pt: '3 hrs (Tour guiado histórico)',
    fr: '3 h (Visite guidée historique)',
    it: '3 ore (Tour guidato storico)'
  },
  'Desayuno Buffet & Almuerzo en Aguas Calientes': {
    es: 'Desayuno Buffet & Almuerzo en Aguas Calientes',
    en: 'Buffet Breakfast & Lunch in Aguas Calientes',
    pt: 'Café da Manhã Buffet & Almoço em Aguas Calientes',
    fr: 'Petit-déjeuner Buffet & Déjeuner à Aguas Calientes',
    it: 'Colazione a Buffet & Pranzo ad Aguas Calientes'
  },
  'Desayuno Buffet & Almuerzo': {
    es: 'Desayuno Buffet & Almuerzo',
    en: 'Buffet Breakfast & Lunch',
    pt: 'Café da Manhã Buffet & Almoço',
    fr: 'Petit-déjeuner Buffet & Déjeuner',
    it: 'Colazione a Buffet & Pranzo'
  },
  'Retorno a Hotel en Cusco': {
    es: 'Retorno a Hotel en Cusco',
    en: 'Return to Cusco Hotel',
    pt: 'Retorno ao Hotel em Cusco',
    fr: 'Retour à l’Hôtel à Cusco',
    it: 'Rientro in Hotel a Cusco'
  },

  // --- SERVICIOS INCLUIDOS EMERALD ---
  'Transporte turístico privado 4x4 climatizado ida y retorno': {
    es: 'Transporte turístico privado 4x4 climatizado ida y retorno',
    en: 'Round-trip private air-conditioned 4x4 tourist transport',
    pt: 'Transporte turístico privativo 4x4 climatizado ida e volta',
    fr: 'Transport touristique privé 4x4 climatisé aller-retour',
    it: 'Trasporto turistico privato 4x4 climatizzato andata e ritorno'
  },
  'Boletos oficiales preferenciales de tren y accesos a Machu Picchu': {
    es: 'Boletos oficiales preferenciales de tren y accesos a Machu Picchu',
    en: 'Official preferential train tickets and Machu Picchu entrance fees',
    pt: 'Bilhetes oficiais preferenciais de trem e ingressos para Machu Picchu',
    fr: 'Billets de train officiels prioritaires et entrées à Machu Picchu',
    it: 'Biglietti ferroviari ufficiali preferenziali e ingressi a Machu Picchu'
  },
  'Guía oficial colegiado bilingüe DIRCETUR en todas las jornadas': {
    es: 'Guía oficial colegiado bilingüe DIRCETUR en todas las jornadas',
    en: 'Licensed bilingual DIRCETUR certified guide for all excursions',
    pt: 'Guia oficial credenciado bilíngue DIRCETUR em todas as jornadas',
    fr: 'Guide officiel bilingue agréé DIRCETUR sur toutes les journées',
    it: 'Guida ufficiale abilitata bilingue DIRCETUR per tutte le tappe'
  },
  'Monitoreo médico continuo 24/7 con balón de oxígeno medicinal': {
    es: 'Monitoreo médico continuo 24/7 con balón de oxígeno medicinal',
    en: 'Continuous 24/7 medical monitoring with certified medical oxygen tank',
    pt: 'Monitoramento médico contínuo 24/7 com oxigênio medicinal',
    fr: 'Surveillance médicale continue 24/7 avec bouteille d’oxygène médical',
    it: 'Monitoraggio medico continuo 24/7 con bombola di ossigeno medicale'
  },
  'Alimentación gourmet andina de autor y estaciones de hidratación': {
    es: 'Alimentación gourmet andina de autor y estaciones de hidratación',
    en: 'Signature Andean gourmet dining and trail hydration stations',
    pt: 'Gastronomia andina de autor e estações de hidratação na trilha',
    fr: 'Restauration gastronomique andine signature et points d’hydratation',
    it: 'Cucina gourmet andina d’autore e stazioni di idratazione sul sentiero'
  },
  'Bastones de trekking telescópicos de aluminio profesional': {
    es: 'Bastones de trekking telescópicos de aluminio profesional',
    en: 'Professional telescoping aluminum trekking poles',
    pt: 'Bastões de caminhada telescópicos em alumínio profissional',
    fr: 'Bâtons de trekking télescopiques en aluminium professionnel',
    it: 'Bastoncini da trekking telescopici in alluminio professionale'
  },

  // --- SERVICIOS NO INCLUIDOS EMERALD ---
  'Vuelos comerciales nacionales o internacionales hacia Cusco': {
    es: 'Vuelos comerciales nacionales o internacionales hacia Cusco',
    en: 'Domestic or international commercial flights to Cusco',
    pt: 'Voos comerciais nacionais ou internacionais para Cusco',
    fr: 'Vols commerciaux nationaux ou internationaux vers Cusco',
    it: 'Voli commerciali nazionali o internazionali per Cusco'
  },
  'Propinas voluntarias para el equipo de porteadores y choferes': {
    es: 'Propinas voluntarias para el equipo de porteadores y choferes',
    en: 'Voluntary gratuities for porters and drivers',
    pt: 'Gorjetas voluntárias para carregadores e motoristas',
    fr: 'Pourboires volontaires pour porteurs et chauffeurs',
    it: 'Mance facoltative per portatori e autisti'
  },
  'Seguro personal de viaje internacional (recomendado)': {
    es: 'Seguro personal de viaje internacional (recomendado)',
    en: 'Personal international travel insurance (recommended)',
    pt: 'Seguro viagem internacional individual (recomendado)',
    fr: 'Assurance voyage internationale personnelle (recommandée)',
    it: 'Assicurazione di viaggio internazionale personale (consigliata)'
  },

  // --- CHECKLIST DE MOCHILA (QUÉ LLEVAR) ---
  'Documento de identidad / Pasaporte original vigente': {
    es: 'Documento de identidad / Pasaporte original vigente',
    en: 'Valid original ID / Passport',
    pt: 'Documento de identidade / Passaporte original válido',
    fr: 'Pièce d’identité / Passeport original en cours de validité',
    it: 'Documento d’identità / Passaporto originale in corso di validità'
  },
  'Mochila ergonómica de 20L a 30L con cobertor de lluvia': {
    es: 'Mochila ergonómica de 20L a 30L con cobertor de lluvia',
    en: '20L to 30L ergonomic daypack with rain cover',
    pt: 'Mochila ergonômica de 20L a 30L com capa de chuva',
    fr: 'Sac à dos ergonomique 20L à 30L avec housse anti-pluie',
    it: 'Zaino ergonomico da 20L a 30L con parapioggia'
  },
  'Calzado de trekking con suela de buen agarre ya amoldado': {
    es: 'Calzado de trekking con suela de buen agarre ya amoldado',
    en: 'Broken-in trekking shoes with high-traction grip soles',
    pt: 'Calçado de trekking com boa aderência já amaciado',
    fr: 'Chaussures de trek bien adhérentes et déjà faites',
    it: 'Scarpe da trekking con suola ad alta aderenza già rodate'
  },
  'Ropa térmica en capas, chaqueta cortavientos impermeable': {
    es: 'Ropa térmica en capas, chaqueta cortavientos impermeable',
    en: 'Layered thermal clothing, waterproof windbreaker jacket',
    pt: 'Roupas térmicas em camadas, jaqueta corta-vento impermeável',
    fr: 'Vêtements thermiques multicouches, veste coupe-vent imperméable',
    it: 'Abbigliamento termico a strati, giacca a vento impermeabile'
  },
  'Protector solar FPS 50+, gafas UV400 y sombrero de ala ancha': {
    es: 'Protector solar FPS 50+, gafas UV400 y sombrero de ala ancha',
    en: 'SPF 50+ sunscreen, UV400 sunglasses, and wide-brim hat',
    pt: 'Protetor solar FPS 50+, óculos UV400 e chapéu de aba larga',
    fr: 'Crème solaire SPF 50+, lunettes UV400 et chapeau à larges bords',
    it: 'Crema solare SPF 50+, occhiali UV400 e cappello a tesa larga'
  },
  'Botella o termo reutilizable para recargas de agua': {
    es: 'Botella o termo reutilizable para recargas de agua',
    en: 'Reusable bottle or thermos for water refills',
    pt: 'Garrafa ou garrafa térmica reutilizável para recargas',
    fr: 'Gourde ou thermos réutilisable pour recharge d’eau',
    it: 'Borraccia o thermos riutilizzabile per ricariche'
  },

  // --- TRUST BADGES (ACREDITACIONES) ---
  'Licencia Oficial DIRCETUR Cusco N° 2024-EXP-089': {
    es: 'Licencia Oficial DIRCETUR Cusco N° 2024-EXP-089',
    en: 'DIRCETUR Cusco Official License No. 2024-EXP-089',
    pt: 'Licença Oficial DIRCETUR Cusco Nº 2024-EXP-089',
    fr: 'Licence Officielle DIRCETUR Cusco N° 2024-EXP-089',
    it: 'Licenza Ufficiale DIRCETUR Cusco N. 2024-EXP-089'
  },
  'Sello Internacional Safe Travels WTTC': {
    es: 'Sello Internacional Safe Travels WTTC',
    en: 'WTTC Safe Travels Global Seal',
    pt: 'Selo Global Safe Travels WTTC',
    fr: 'Label International Safe Travels WTTC',
    it: 'Sigillo Internazionale Safe Travels WTTC'
  },
  'Operador Formal RUC 20 Verificado ante SUNAT': {
    es: 'Operador Formal RUC 20 Verificado ante SUNAT',
    en: 'Registered Legal Operator RUC 20 Verified with SUNAT',
    pt: 'Operador Formal RUC 20 Verificado perante SUNAT',
    fr: 'Opérateur Déclaré RUC 20 Enregistré auprès de la SUNAT',
    it: 'Operatore Formale RUC 20 Verificato presso SUNAT'
  },
  'Balón de Oxígeno & Botiquín Médico de Altura Certificado': {
    es: 'Balón de Oxígeno & Botiquín Médico de Altura Certificado',
    en: 'Medical Oxygen Tank & Certified High-Altitude First Aid Kit',
    pt: 'Cilindro de Oxigênio & Kit Médico de Altitude Certificado',
    fr: 'Bouteille d’Oxygène & Trousse de Secours de Haute Altitude',
    it: 'Bombola di Ossigeno & Kit Medico di Altitudine Certificato'
  },
  'Guías Colegiados Bilingües con Certificación WFR': {
    es: 'Guías Colegiados Bilingües con Certificación WFR',
    en: 'Licensed Bilingual Guides with WFR Certification',
    pt: 'Guias Credenciados Bilíngues com Certificação WFR',
    fr: 'Guides Certifiés Bilingues avec Brevet WFR',
    it: 'Guide Abilitate Bilingui con Certificazione WFR'
  },
  'Póliza de Seguro Turístico contra Accidentes': {
    es: 'Póliza de Seguro Turístico contra Accidentes',
    en: 'Tourist Accident Insurance Policy',
    pt: 'Apólice de Seguro Turístico Contra Acidentes',
    fr: 'Police d’Assurance Touristique Accidents',
    it: 'Polizza Assicurativa Turistica Infortuni'
  },

  // --- TESTIMONIOS EMERALD ---
  'La mejor experiencia que hemos vivido en Perú. La atención personalizada de Carlos y el cuidado con el oxígeno en la montaña nos permitieron disfrutar de Machu Picchu sin ninguna preocupación.': {
    es: 'La mejor experiencia que hemos vivido en Perú. La atención personalizada de Carlos y el cuidado con el oxígeno en la montaña nos permitieron disfrutar de Machu Picchu sin ninguna preocupación.',
    en: 'The greatest travel experience we have ever had in Peru. Carlos’s personal care and constant oxygen safety in the mountains let us fully enjoy Machu Picchu with peace of mind.',
    pt: 'A melhor experiência que já vivemos no Peru. A atenção personalizada de Carlos e o cuidado com o oxigênio na montanha nos permitiram desfrutar de Machu Picchu com total tranquilidade.',
    fr: 'La plus belle expérience vécue au Pérou. L’attention personnalisée de Carlos et la surveillance à l’oxygène en montagne nous ont permis de vivre Machu Picchu en toute sérénité.',
    it: 'La migliore esperienza vissuta in Perù. Le attenzioni di Carlos e la cura con l’ossigeno in montagna ci hanno permesso di vivere Machu Picchu senza pensieri.'
  }
};

// --- TRADUCTOR INTELIGENTE DE TEXTO LIBRE ---
export function translateText(text: string | undefined, targetLang: LanguageType): string {
  if (!text) return '';
  const trimmed = text.trim();
  const lowerTrimmed = trimmed.toLowerCase();

  // 1. Comprobación directa en claves de PHRASE_MAP
  if (PHRASE_MAP[trimmed] && PHRASE_MAP[trimmed][targetLang]) {
    return PHRASE_MAP[trimmed][targetLang];
  }

  // 2. Búsqueda inversa insensible a mayúsculas: si el texto actual está en portugués, inglés, etc.
  for (const [key, val] of Object.entries(PHRASE_MAP)) {
    if (key.toLowerCase() === lowerTrimmed) {
      if (val[targetLang]) return val[targetLang];
    }
    for (const [langCode, langText] of Object.entries(val)) {
      if (langText.toLowerCase() === lowerTrimmed) {
        if (val[targetLang]) return val[targetLang];
      }
    }
  }

  // Heurísticas semánticas para Títulos de Tours
  if (lowerTrimmed.includes('machu picchu') && (lowerTrimmed.includes('lujo') || lowerTrimmed.includes('tren') || lowerTrimmed.includes('vip') || lowerTrimmed.includes('panorámico') || lowerTrimmed.includes('panoramico') || lowerTrimmed.includes('panoramique') || lowerTrimmed.includes('panoramic'))) {
    if (targetLang === 'es') return 'Machu Picchu de Lujo con Tren Panorámico';
    if (targetLang === 'en') return 'Luxury Machu Picchu with Scenic Panoramic Train';
    if (targetLang === 'pt') return 'Machu Picchu de Luxo com Trem Panorâmico';
    if (targetLang === 'fr') return 'Machu Picchu de Luxe avec Train Panoramique';
    if (targetLang === 'it') return 'Machu Picchu di Lusso con Treno Panoramico';
  }

  if (lowerTrimmed.includes('vinicunca') || lowerTrimmed.includes('7 colores') || lowerTrimmed.includes('siete colores') || lowerTrimmed.includes('7 cores') || lowerTrimmed.includes('7 couleurs') || lowerTrimmed.includes('7 colori') || lowerTrimmed.includes('valle rojo') || lowerTrimmed.includes('rainbow mountain')) {
    if (targetLang === 'es') return 'Montaña de 7 Colores (Vinicunca) & Valle Rojo';
    if (targetLang === 'en') return 'Rainbow Mountain (Vinicunca) & Red Valley VIP';
    if (targetLang === 'pt') return 'Montanha das 7 Cores (Vinicunca) & Vale Vermelho';
    if (targetLang === 'fr') return 'Montagne des 7 Couleurs (Vinicunca) & Vallée Rouge';
    if (targetLang === 'it') return 'Montagna dei 7 Colori (Vinicunca) & Valle Rossa';
  }

  if (lowerTrimmed.includes('humantay')) {
    if (targetLang === 'es') return 'Laguna Humantay Turquesa & Glaciar';
    if (targetLang === 'en') return 'Turquoise Humantay Lake & Glacier Trek';
    if (targetLang === 'pt') return 'Laguna Humantay Turquesa & Geleira Andina';
    if (targetLang === 'fr') return 'Lagune Humantay Turquoise & Glacier Andin';
    if (targetLang === 'it') return 'Laguna Humantay Turchese & Ghiacciaio Andino';
  }

  if (lowerTrimmed.includes('valle sagrado') || lowerTrimmed.includes('sacred valley') || lowerTrimmed.includes('vallée sacrée') || lowerTrimmed.includes('valle sacra')) {
    if (targetLang === 'es') return 'Valle Sagrado de los Incas VIP';
    if (targetLang === 'en') return 'Sacred Valley of the Incas VIP Cultural Journey';
    if (targetLang === 'pt') return 'Vale Sagrado dos Incas VIP & Cultura Viva';
    if (targetLang === 'fr') return 'Vallée Sacrée des Incas VIP & Culture Vivante';
    if (targetLang === 'it') return 'Valle Sacra degli Inca VIP & Cultura Viva';
  }

  if (lowerTrimmed.includes('city tour') || (lowerTrimmed.includes('cusco') && (lowerTrimmed.includes('ruinas') || lowerTrimmed.includes('sitios') || lowerTrimmed.includes('sites') || lowerTrimmed.includes('siti')))) {
    if (targetLang === 'es') return 'City Tour Cusco Ancestral & 4 Ruinas Arqueológicas';
    if (targetLang === 'en') return 'Ancestral Cusco City Tour & 4 Archaeological Ruins';
    if (targetLang === 'pt') return 'City Tour Cusco Ancestral & 4 Sítios Arqueológicos';
    if (targetLang === 'fr') return 'City Tour Cusco Ancestral & 4 Sites Archéologiques';
    if (targetLang === 'it') return 'City Tour Cusco Ancestrale & 4 Siti Archeologici';
  }

  // Heurísticas semánticas para Subtítulos y Descripciones (solo si es texto descriptivo largo)
  if (lowerTrimmed.length > 25 && (lowerTrimmed.includes('descubre') || lowerTrimmed.includes('hoteles 5 estrellas') || lowerTrimmed.includes('guía oficial exclusivo'))) {
    if (targetLang === 'es') return 'Descubre la maravilla del mundo con traslados privados, hoteles 5 estrellas y un guía oficial exclusivo para ti y tu familia.';
    if (targetLang === 'en') return 'Discover the wonder of the world with private luxury transfers, 5-star comfort and an official certified historian guide dedicated exclusively to you and your family.';
    if (targetLang === 'pt') return 'Descubra a maravilha do mundo com traslados privados, conforto 5 estrelas e um guia oficial exclusivo para você e sua família.';
    if (targetLang === 'fr') return 'Découvrez la merveille du monde avec transferts privés, confort 5 étoiles et un guide officiel exclusif pour vous et votre famille.';
    if (targetLang === 'it') return 'Scopri la meraviglia del mondo con trasferimenti privati, comfort a 5 stelle e una guida ufficiale esclusiva per te e la tua famiglia.';
  }

  if (lowerTrimmed.length > 25 && (lowerTrimmed.includes('magia de los andes') || lowerTrimmed.includes('magia dos andes') || lowerTrimmed.includes('magic of the andes') || lowerTrimmed.includes('salidas diarias') || lowerTrimmed.includes('saídas diárias') || lowerTrimmed.includes('daily departures'))) {
    if (targetLang === 'es') return 'Montaña de 7 Colores & Valle Rojo • Vive la magia de los Andes con operadores colegiados y salidas diarias.';
    if (targetLang === 'en') return 'Experience the magic of the Peruvian Andes with official accredited tour operators and guaranteed daily departures.';
    if (targetLang === 'pt') return 'Viva a magia dos Andes peruanos com operadores credenciados e saídas diárias garantidas.';
    if (targetLang === 'fr') return 'Vivez la magie des Andes péruviennes avec des opérateurs agréés et des départs quotidiens garantis.';
    if (targetLang === 'it') return 'Vivi la magia delle Ande peruviane con operatori abilitati e partenze giornaliere garantite.';
  }

  if (lowerTrimmed.length > 25 && (lowerTrimmed.includes('operador turístico') || lowerTrimmed.includes('operador turistico') || lowerTrimmed.includes('tour operator') || lowerTrimmed.includes('formal en cusco'))) {
    if (targetLang === 'es') return 'Operador turístico oficial y colegiado en Cusco con licencia DIRCETUR y excelencia garantizada.';
    if (targetLang === 'en') return 'Official certified tourism operator in Cusco with proven excellence and DIRCETUR license.';
    if (targetLang === 'pt') return 'Operador turístico oficial e registrado em Cusco com excelência comprovada e credencial DIRCETUR.';
    if (targetLang === 'fr') return 'Opérateur touristique officiel et agréé à Cusco avec excellence reconnue et licence DIRCETUR.';
    if (targetLang === 'it') return 'Operatore turistico ufficiale e autorizzato a Cusco con comprovata eccellenza e licenza DIRCETUR.';
  }

  // Heurística para título de características e inclusiones ("¿Qué hace inolvidable esta experiencia?")
  if (lowerTrimmed.includes('hace inolvidable') || lowerTrimmed.includes('makes this experience') || lowerTrimmed.includes('makes this tour') || lowerTrimmed.includes('torna esta experiência') || lowerTrimmed.includes('torna esta experiencia') || lowerTrimmed.includes('rend cette expérience') || lowerTrimmed.includes('rende questa esperienza')) {
    if (targetLang === 'es') return '¿Qué hace inolvidable esta experiencia?';
    if (targetLang === 'en') return 'What Makes This Experience Unforgettable?';
    if (targetLang === 'pt') return 'O Que Torna Esta Experiência Inesquecível?';
    if (targetLang === 'fr') return 'Qu’est-ce qui rend cette expérience inoubliable ?';
    if (targetLang === 'it') return 'Cosa rende questa esperienza indimenticabile?';
  }

  // Heurística para descripción estándar de servicios incluidos ("Servicio 100% coordinado...")
  if (lowerTrimmed.includes('seguridad turística') || lowerTrimmed.includes('seguridad turistica') || lowerTrimmed.includes('tourist safety') || lowerTrimmed.includes('segurança turística') || lowerTrimmed.includes('sécurité touristique') || lowerTrimmed.includes('sicurezza turistica')) {
    if (targetLang === 'es') return 'Servicio 100% coordinado y garantizado con estándares de seguridad turística.';
    if (targetLang === 'en') return '100% coordinated and guaranteed service under official tourism safety standards.';
    if (targetLang === 'pt') return 'Serviço 100% coordenado e garantido com padrões oficiais de segurança turística.';
    if (targetLang === 'fr') return 'Service 100% coordonné et garanti selon les normes officielles de sécurité touristique.';
    if (targetLang === 'it') return 'Servizio coordinato e garantito al 100% con standard ufficiali di sicurezza turistica.';
  }

  // Heurísticas para Especificaciones Técnicas
  if (lowerTrimmed.includes('msnm') || lowerTrimmed.includes('m.a.s.l.') || lowerTrimmed.includes('metros') || lowerTrimmed.includes('mslm')) {
    const num = text.replace(/[^0-9,.]/g, '');
    if (targetLang === 'es') return `${num} msnm`;
    if (targetLang === 'en') return `${num} m.a.s.l.`;
    if (targetLang === 'fr') return `${num} m d’altitude`;
    if (targetLang === 'pt') return `${num} m de altitude`;
    if (targetLang === 'it') return `${num} mslm`;
  }

  // Traducción por fragmentos y patrones comunes
  let translated = text;

  // Patrones de títulos dinámicos
  const dynamicHeroSuffixes = [
    ': La Experiencia Definitiva en Cusco',
    ': The Ultimate Cusco Experience',
    ': A Experiência Definitiva em Cusco',
    ': L’Expérience Ultime à Cusco',
    ": L'Expérience Ultime à Cusco",
    ': L’Esperienza Definitiva a Cusco',
    ": L'Esperienza Definitiva a Cusco"
  ];

  for (const suffix of dynamicHeroSuffixes) {
    if (translated.includes(suffix)) {
      const targetSuffix = targetLang === 'en'
        ? ': The Ultimate Cusco Experience'
        : targetLang === 'pt'
        ? ': A Experiência Definitiva em Cusco'
        : targetLang === 'fr'
        ? ': L’Expérience Ultime à Cusco'
        : targetLang === 'it'
        ? ': L’Esperienza Definitiva a Cusco'
        : ': La Experiencia Definitiva en Cusco';
      translated = translated.replace(suffix, targetSuffix);
      break;
    }
  }

  // Prefijos dinámicos de aventura
  if (translated.includes('Live Your Adventure')) {
    const rep = targetLang === 'es' ? 'Vive Tu Aventura' : targetLang === 'pt' ? 'Viva Sua Aventura' : targetLang === 'fr' ? 'Vivez Votre Aventure' : targetLang === 'it' ? 'Vivi La Tua Avventura' : 'Live Your Adventure';
    translated = translated.split('Live Your Adventure').join(rep);
  } else if (translated.includes('Vive Tu Aventura')) {
    const rep = targetLang === 'en' ? 'Live Your Adventure' : targetLang === 'pt' ? 'Viva Sua Aventura' : targetLang === 'fr' ? 'Vivez Votre Aventure' : targetLang === 'it' ? 'Vivi La Tua Avventura' : 'Vive Tu Aventura';
    translated = translated.split('Vive Tu Aventura').join(rep);
  }

  if (translated.includes('Expediciones & Trekking en Cusco')) {
    const rep = targetLang === 'en' ? 'Expeditions & Trekking in Cusco' : targetLang === 'pt' ? 'Expedições & Trekking em Cusco' : targetLang === 'fr' ? 'Expéditions & Trekking à Cusco' : targetLang === 'it' ? 'Spedizioni & Trekking a Cusco' : 'Expediciones & Trekking en Cusco';
    translated = translated.split('Expediciones & Trekking en Cusco').join(rep);
  } else if (translated.includes('Expeditions & Trekking in Cusco')) {
    const rep = targetLang === 'es' ? 'Expediciones & Trekking en Cusco' : targetLang === 'pt' ? 'Expedições & Trekking em Cusco' : targetLang === 'fr' ? 'Expéditions & Trekking à Cusco' : targetLang === 'it' ? 'Spedizioni & Trekking a Cusco' : 'Expeditions & Trekking in Cusco';
    translated = translated.split('Expeditions & Trekking in Cusco').join(rep);
  }

  if (translated.includes('Rutas Exclusivas')) {
    const rep = targetLang === 'en' ? 'Exclusive Routes' : targetLang === 'pt' ? 'Rotas Exclusivas' : targetLang === 'fr' ? 'Itinéraires Exclusifs' : targetLang === 'it' ? 'Percorsi Esclusivi' : 'Rutas Exclusivas';
    translated = translated.split('Rutas Exclusivas').join(rep);
  } else if (translated.includes('Exclusive Routes')) {
    const rep = targetLang === 'es' ? 'Rutas Exclusivas' : targetLang === 'pt' ? 'Rotas Exclusivas' : targetLang === 'fr' ? 'Itinéraires Exclusifs' : targetLang === 'it' ? 'Percorsi Esclusivi' : 'Exclusive Routes';
    translated = translated.split('Exclusive Routes').join(rep);
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
  let step = item.step;
  const num = item.step.replace(/[^0-9]/g, '') || String(index + 1);
  if (item.step.toLowerCase().includes('día') || item.step.toLowerCase().includes('dia') || item.step.toLowerCase().includes('day') || item.step.toLowerCase().includes('jour') || item.step.toLowerCase().includes('giorno')) {
    if (targetLang === 'en') step = `Day ${num}`;
    else if (targetLang === 'pt') step = `Dia ${num}`;
    else if (targetLang === 'fr') step = `Jour ${num}`;
    else if (targetLang === 'it') step = `Giorno ${num}`;
    else step = `Día ${num}`;
  }

  // Comprobar coincidencia directa o inversa en el diccionario
  const trimmedTitle = item.title.trim().toLowerCase();
  for (const [key, val] of Object.entries(ITINERARY_DICTIONARY)) {
    if (
      key.toLowerCase() === trimmedTitle ||
      Object.values(val).some(v => v.title.toLowerCase() === trimmedTitle)
    ) {
      if (val[targetLang]) {
        return {
          step,
          title: val[targetLang].title,
          desc: val[targetLang].desc
        };
      }
    }
  }

  // Traducción inteligente por contenido
  const lower = (item.title + ' ' + item.desc).toLowerCase();
  let title = item.title;
  let desc = item.desc;

  if (lower.includes('recojo') || lower.includes('pickup') || lower.includes('llegada') || lower.includes('embarque') || lower.includes('prise en charge') || lower.includes('prelievo') || lower.includes('transfer')) {
    if (targetLang === 'es') {
      title = 'Recojo en Hotel & Traslado Panorámico';
      desc = 'Recojo puntual en tu alojamiento con asistencia médica preventiva y refrigerio ligero.';
    } else if (targetLang === 'en') {
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
  } else if (lower.includes('desayuno') || lower.includes('breakfast') || lower.includes('café da manhã') || lower.includes('cafe da manha') || lower.includes('petit-déjeuner') || lower.includes('colazione')) {
    if (targetLang === 'es') {
      title = 'Desayuno Buffet Andino Energético';
      desc = 'Desayuno nutritivo preparado con ingredientes locales para cargar energías antes del ascenso.';
    } else if (targetLang === 'en') {
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
  } else if (lower.includes('machu picchu') || lower.includes('citadel') || lower.includes('ciudadela') || lower.includes('cidadela') || lower.includes('citadelle') || lower.includes('cittadella')) {
    if (targetLang === 'es') {
      title = 'Exploración Guiada de la Ciudadela Machu Picchu';
      desc = 'Recorrido guiado exclusivo por templos, fuentes ceremoniales y andenes agrícolas panorámicos.';
    } else if (targetLang === 'en') {
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
  } else if (lower.includes('almuerzo') || lower.includes('lunch') || lower.includes('almoço') || lower.includes('almoco') || lower.includes('déjeuner') || lower.includes('pranzo') || lower.includes('retorno') || lower.includes('return') || lower.includes('retour') || lower.includes('rientro')) {
    if (targetLang === 'es') {
      title = 'Almuerzo Campestre & Retorno a Cusco';
      desc = 'Almuerzo buffet campestre en valle andino y retorno cómodo a la ciudad de Cusco.';
    } else if (targetLang === 'en') {
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

  if (targetLang === 'es' && title === item.title && desc === item.desc) {
    return { ...item, step };
  }

  return { step, title, desc };
}
