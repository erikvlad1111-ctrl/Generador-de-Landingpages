import { LanguageType, ItineraryItem, FAQItem } from '@/types/landing';

// Mapeo exhaustivo de frases, títulos, descripciones y términos turísticos a los 5 idiomas
const PHRASE_MAP: Record<string, Record<LanguageType, string>> = {
  "Anotaciones de campo: Luz dorada sobre los nevados.": {
    es: "Anotaciones de campo: Luz dorada sobre los nevados.",
    en: "Field notes: Golden hour light over snow-capped peaks.",
    pt: "Anotações de campo: Luz dourada sobre os picos nevados.",
    fr: "Notes de terrain : Lumière dorée sur les sommets enneigés.",
    it: "Note di campo: Luce dorata sulle cime innevate."
  },
  "Travel the Best, It is a Big World, Go Explore!": {
    es: "Viaja a lo Grande, ¡el Mundo es Inmenso!",
    en: "Travel the Best, It is a Big World, Go Explore!",
    pt: "Viaje em Grande Estilo, o Mundo é Enorme!",
    fr: "Voyagez en Grand, le Monde est Immense !",
    it: "Viaggia alla Grande, il Mondo è Immenso!"
  },
  "Tour Estrella": {
    es: "Tour Estrella",
    en: "Signature Tour",
    pt: "Tour Destaque",
    fr: "Tour Vedette",
    it: "Tour di Punta"
  },
  "Una experiencia curada para viajeros que aprecian los detalles, la fotografía y la autenticidad de los Andes peruanos.": {
    es: "Una experiencia curada para viajeros que aprecian los detalles, la fotografía y la autenticidad de los Andes peruanos.",
    en: "A curated experience for travelers who appreciate details, photography, and the authenticity of the Peruvian Andes.",
    pt: "Uma experiência com curadoria para viajantes que apreciam detalhes, fotografia e a autenticidade dos Andes peruanos.",
    fr: "Une expérience soignée pour les voyageurs qui apprécient les détails, la photographie et l’authenticité des Andes péruviennes.",
    it: "Un’esperienza curata per viaggiatori che apprezzano i dettagli, la fotografia e l’autenticità delle Ande peruviane."
  },
  "Idioma del Tour:": {
    es: "Idioma del Tour:",
    en: "Tour Language:",
    pt: "Idioma do Tour:",
    fr: "Langue du Tour :",
    it: "Lingua del Tour:"
  },
  "Moneda:": {
    es: "Moneda:",
    en: "Currency:",
    pt: "Moeda:",
    fr: "Devise :",
    it: "Valuta:"
  },
  "Tarifa en:": {
    es: "Tarifa en:",
    en: "Rate in:",
    pt: "Tarifa em:",
    fr: "Tarif en :",
    it: "Tariffa in:"
  },
  "Reservar Tour": {
    es: "Reservar Tour",
    en: "Book Tour",
    pt: "Reservar Tour",
    fr: "Réserver le Tour",
    it: "Prenota Tour"
  },
  "Destino Principal": {
    es: "Destino Principal",
    en: "Main Destination",
    pt: "Destino Principal",
    fr: "Destination Principale",
    it: "Destinazione Principale"
  },
  "Andes & Selva": {
    es: "Andes & Selva",
    en: "Andes & Cloud Forest",
    pt: "Andes & Floresta",
    fr: "Andes & Forêt Nuageuse",
    it: "Ande & Foresta"
  },
  "Tarifa por Persona": {
    es: "Tarifa por Persona",
    en: "Rate per Person",
    pt: "Tarifa por Pessoa",
    fr: "Tarif par Personne",
    it: "Tariffa a Persona"
  },
  "Tarifa oficial": {
    es: "Tarifa oficial",
    en: "Official Rate",
    pt: "Tarifa oficial",
    fr: "Tarif officiel",
    it: "Tariffa ufficiale"
  },
  "Descripción & Valor Diferencial": {
    es: "Descripción & Valor Diferencial",
    en: "Overview & Distinctive Value",
    pt: "Descrição & Valor Diferencial",
    fr: "Description & Valeur Différentielle",
    it: "Descrizione & Valore Differenziale"
  },
  "Detalles de Duración & Ritmo": {
    es: "Detalles de Duración & Ritmo",
    en: "Duration & Pace Details",
    pt: "Detalhes de Duração & Ritmo",
    fr: "Détails de Durée & Rythme",
    it: "Dettagli di Durata & Ritmo"
  },
  "Protocolo de Altitud & Oxígeno": {
    es: "Protocolo de Altitud & Oxígeno",
    en: "Altitude & Oxygen Protocol",
    pt: "Protocolo de Altitude & Oxigênio",
    fr: "Protocole d’Altitude & Oxygène",
    it: "Protocollo di Altitudine & Ossigeno"
  },
  "Evaluación de Condición Física": {
    es: "Evaluación de Condición Física",
    en: "Physical Fitness Assessment",
    pt: "Avaliação de Condicionamento Físico",
    fr: "Évaluation de la Condition Physique",
    it: "Valutazione della Forma Fisica"
  },
  "Modalidad & Ratio de Guías": {
    es: "Modalidad & Ratio de Guías",
    en: "Tour Modality & Guide Ratio",
    pt: "Modalidade & Proporção de Guias",
    fr: "Modalité & Ratio de Guides",
    it: "Modalità & Rapporto Guide"
  },
  "El itinerario contempla caminatas de 5 a 6 horas diarias con paradas programadas de hidratación cada 90 minutos y almuerzos gourmet calientes servidos en parajes escénicos.": {
    es: "El itinerario contempla caminatas de 5 a 6 horas diarias con paradas programadas de hidratación cada 90 minutos y almuerzos gourmet calientes servidos en parajes escénicos.",
    en: "The itinerary includes 5 to 6 hours of daily hiking with scheduled hydration stops every 90 minutes and hot gourmet lunches served in scenic locations.",
    pt: "O roteiro contempla caminhadas de 5 a 6 horas diárias com paradas programadas de hidratação a cada 90 minutos e almoços gourmet quentes servidos em locais panorâmicos.",
    fr: "L’itinéraire comprend 5 à 6 heures de marche par jour avec des haltes d’hydratation programmées toutes les 90 minutes et des déjeuners gourmets chauds servis dans des décors scéniques.",
    it: "L’itinerario prevede camminate di 5-6 ore al giorno con pause di idratazione programmate ogni 90 minuti e pranzi gourmet caldi serviti in luoghi panoramici."
  },
  "Nuestros guías llevan oxímetro digital para medir tu saturación tres veces al día, balón de oxígeno medicinal de emergencia y botiquín de primeros auxilios avalado por Wilderness First Responder.": {
    es: "Nuestros guías llevan oxímetro digital para medir tu saturación tres veces al día, balón de oxígeno medicinal de emergencia y botiquín de primeros auxilios avalado por Wilderness First Responder.",
    en: "Our guides carry a digital pulse oximeter to monitor oxygen saturation three times daily, an emergency medical oxygen tank, and a first-aid kit certified by Wilderness First Responder.",
    pt: "Nossos guias levam oxímetro digital para medir sua saturação três vezes ao dia, cilindro de oxigênio medicinal de emergência e kit de primeiros socorros certificado pela Wilderness First Responder.",
    fr: "Nos guides disposent d’un oxymètre numérique pour mesurer votre saturation trois fois par jour, d’une bouteille d’oxygène médical d’urgence et d’une trousse de premiers secours certifiée Wilderness First Responder.",
    it: "Le nostre guide portano un saturimetro digitale per monitorare la saturazione tre volte al giorno, una bombola di ossigeno medicale di emergenza e un kit di pronto soccorso certificato Wilderness First Responder."
  },
  "Clasificación de esfuerzo moderado a exigente. No se requiere experiencia en escalada técnica, únicamente calzado adecuado y buena disposición física.": {
    es: "Clasificación de esfuerzo moderado a exigente. No se requiere experiencia en escalada técnica, únicamente calzado adecuado y buena disposición física.",
    en: "Moderate to demanding effort rating. No technical climbing experience required, only suitable footwear and good physical disposition.",
    pt: "Classificação de esforço de moderado a exigente. Não é necessária experiência em escalada técnica, apenas calçado adequado e boa disposição física.",
    fr: "Niveau d’effort modéré à exigeant. Aucune expérience d’escalade technique requise, seulement des chaussures adaptées et une bonne forme physique.",
    it: "Livello di sforzo da moderato a impegnativo. Non è richiesta esperienza di arrampicata tecnica, solo calzature adeguate e buona disposizione fisica."
  },
  "Grupos reducidos de máximo 8 a 10 personas para garantizar seguridad total, atención personalizada y respeto por el entorno natural de la cordillera.": {
    es: "Grupos reducidos de máximo 8 a 10 personas para garantizar seguridad total, atención personalizada y respeto por el entorno natural de la cordillera.",
    en: "Small groups of maximum 8 to 10 travelers to ensure complete safety, personalized attention, and respect for the natural alpine environment.",
    pt: "Pequenos grupos de no máximo 8 a 10 pessoas para garantir segurança total, atendimento personalizado e respeito pelo ambiente natural da cordilheira.",
    fr: "Petits groupes de 8 à 10 personnes maximum pour garantir une sécurité totale, une attention personnalisée et le respect de l’environnement montagnard.",
    it: "Piccoli gruppi di massimo 8-10 persone per garantire totale sicurezza, attenzione personalizzata e rispetto per l’ambiente montano della cordigliera."
  },
  "Todos": {
    es: "Todos",
    en: "All",
    pt: "Todos",
    fr: "Tous",
    it: "Tutti"
  },
  "Explore. Dream. Discover.": {
    es: "Explora. Sueña. Descubre.",
    en: "Explore. Dream. Discover.",
    pt: "Explore. Sonhe. Descubra.",
    fr: "Explorez. Rêvez. Découvrez.",
    it: "Esplora. Sogna. Scopri."
  },
  "Local Experts": {
    es: "Expertos Locales",
    en: "Local Experts",
    pt: "Especialistas Locais",
    fr: "Experts Locaux",
    it: "Esperti Locali"
  },
  "Authentic experiences": {
    es: "Experiencias auténticas",
    en: "Authentic experiences",
    pt: "Experiências autênticas",
    fr: "Expériences authentiques",
    it: "Esperienze autentiche"
  },
  "Guías Expertos": {
    es: "Guías Expertos",
    en: "Expert Guides",
    pt: "Guias Especialistas",
    fr: "Guides Experts",
    it: "Guide Esperte"
  },
  "Conocimiento local y tips auténticos": {
    es: "Conocimiento local y tips auténticos",
    en: "Local expertise and authentic tips",
    pt: "Conhecimento local e dicas autênticas",
    fr: "Expertise locale et conseils authentiques",
    it: "Conoscenza locale e consigli autentici"
  },
  "Rutas a Medida": {
    es: "Rutas a Medida",
    en: "Tailor-Made Routes",
    pt: "Roteiros Sob Medida",
    fr: "Itinéraires Sur Mesure",
    it: "Itinerari Su Misura"
  },
  "Planes flexibles para cada viajero": {
    es: "Planes flexibles para cada viajero",
    en: "Flexible plans for every traveler",
    pt: "Planos flexíveis para cada viajante",
    fr: "Plans flexibles pour chaque voyageur",
    it: "Piani flessibili per ogni viaggiatore"
  },
  "Mejor Precio Garantizado": {
    es: "Mejor Precio Garantizado",
    en: "Best Price Guaranteed",
    pt: "Melhor Preço Garantido",
    fr: "Meilleur Prix Garanti",
    it: "Miglior Prezzo Garantito"
  },
  "Tarifas directas sin intermediarios": {
    es: "Tarifas directas sin intermediarios",
    en: "Direct rates with no intermediaries",
    pt: "Tarifas diretas sem intermediários",
    fr: "Tarifs directs sans intermédiaires",
    it: "Tariffe dirette senza intermediari"
  },
  "Destinos Populares": {
    es: "Destinos Populares",
    en: "Popular Destinations",
    pt: "Destinos Populares",
    fr: "Destinations Populaires",
    it: "Destinazioni Popolari"
  },
  "Viajeros Felices": {
    es: "Viajeros Felices",
    en: "Happy Travelers",
    pt: "Viajantes Felizes",
    fr: "Voyageurs Heureux",
    it: "Viaggiatori Soddisfatti"
  },
  "Reseñas Positivas": {
    es: "Reseñas Positivas",
    en: "Positive Reviews",
    pt: "Avaliações Positivas",
    fr: "Avis Positifs",
    it: "Recensioni Positive"
  },
  "Guía Colegiado Bilingüe DIRCETUR": {
    es: "Guía Colegiado Bilingüe DIRCETUR",
    en: "DIRCETUR Bilingual Certified Guide",
    pt: "Guia Credenciado Bilíngue DIRCETUR",
    fr: "Guide Bilingue Agréé DIRCETUR",
    it: "Guida Abilitata Bilingue DIRCETUR"
  },
  "Plan Your Trip": {
    es: "Planifica Tu Viaje",
    en: "Plan Your Trip",
    pt: "Planeje Sua Viagem",
    fr: "Planifiez Votre Voyage",
    it: "Pianifica Il Tuo Viaggio"
  },
  "Reservar por WhatsApp": {
    es: "Reservar por WhatsApp",
    en: "Book via WhatsApp",
    pt: "Reservar pelo WhatsApp",
    fr: "Réserver par WhatsApp",
    it: "Prenota su WhatsApp"
  },
  "Portal Agencia VIP": {
    es: "Portal Agencia VIP",
    en: "VIP Agency Portal",
    pt: "Portal Agência VIP",
    fr: "Portail Agence VIP",
    it: "Portale Agenzia VIP"
  },
  "Guía Historiador": {
    es: "Guía Historiador",
    en: "Historian Guide",
    pt: "Guia Historiador",
    fr: "Guide Historien",
    it: "Guida Storica"
  },
  "4,200 msnm": {
    es: "4,200 msnm",
    en: "4,200 m.a.s.l.",
    pt: "4.200 m altitude",
    fr: "4 200 m d’altitude",
    it: "4.200 m s.l.m."
  },
  "WhatsApp & Cotizar": {
    es: "WhatsApp & Cotizar",
    en: "WhatsApp & Quote",
    pt: "WhatsApp & Orçamento",
    fr: "WhatsApp & Devis",
    it: "WhatsApp & Preventivo"
  },
  "Laguna Humantay Boho": {
    es: "Laguna Humantay Boho",
    en: "Humantay Lake Boho",
    pt: "Lagoa Humantay Boho",
    fr: "Lagune Humantay Boho",
    it: "Laguna Humantay Boho"
  },
  "Cusco": {
    es: "Cusco",
    en: "Cusco",
    pt: "Cusco",
    fr: "Cusco",
    it: "Cusco"
  },
  "Machu Picchu Hiram Bingham": {
    es: "Machu Picchu Hiram Bingham",
    en: "Machu Picchu Hiram Bingham",
    pt: "Machu Picchu Hiram Bingham",
    fr: "Machu Picchu Hiram Bingham",
    it: "Machu Picchu Hiram Bingham"
  },
  "Ver": {
    es: "Ver",
    en: "View",
    pt: "Ver",
    fr: "Voir",
    it: "Vedi"
  },
  "Valle Sagrado & Hacienda": {
    es: "Valle Sagrado & Hacienda",
    en: "Sacred Valley & Hacienda",
    pt: "Vale Sagrado & Fazenda",
    fr: "Vallée Sacrée & Hacienda",
    it: "Valle Sacra & Tenuta"
  },
  "Privado": {
    es: "Privado",
    en: "Private",
    pt: "Privado",
    fr: "Privé",
    it: "Privato"
  },
  "Humantay Glamping Dome": {
    es: "Humantay Glamping Dome",
    en: "Humantay Glamping Dome",
    pt: "Humantay Glamping Dome",
    fr: "Humantay Glamping Dôme",
    it: "Humantay Glamping Dome"
  },
  "Domo Geodésico": {
    es: "Domo Geodésico",
    en: "Geodesic Dome",
    pt: "Domo Geodésico",
    fr: "Dôme Géodésique",
    it: "Cupola Geodetica"
  },
  "4,630 msnm": {
    es: "4,630 msnm",
    en: "4,630 m.a.s.l.",
    pt: "4.630 m altitude",
    fr: "4 630 m d’altitude",
    it: "4.630 m s.l.m."
  },
  "Travel the Best, It's a Big World, Go Explore!": {
    es: "Viaja a lo Grande, ¡el Mundo es Inmenso!",
    en: "Travel the Best, It's a Big World, Go Explore!",
    pt: "Viaje em Grande Estilo, o Mundo é Enorme!",
    fr: "Voyagez en Grand, le Monde est Immense !",
    it: "Viaggia alla Grande, il Mondo è Immenso!"
  },
  "Tour Salkantay Trek Clásico": {
    es: "Tour Salkantay Trek Clásico",
    en: "Classic Salkantay Trek Tour",
    pt: "Tour Salkantay Trek Clássico",
    fr: "Tour Salkantay Trek Classique",
    it: "Tour Salkantay Trek Classico"
  },
  "5 Días": {
    es: "5 Días",
    en: "5 Days",
    pt: "5 Dias",
    fr: "5 Jours",
    it: "5 Giorni"
  },
  "Salkantay Trek": {
    es: "Salkantay Trek",
    en: "Salkantay Trek",
    pt: "Salkantay Trek",
    fr: "Salkantay Trek",
    it: "Salkantay Trek"
  },
  "Camino Inca": {
    es: "Camino Inca",
    en: "Inca Trail",
    pt: "Trilha Inca",
    fr: "Chemin de l’Inca",
    it: "Cammino Inca"
  },
  "Salkantay Trek Clásico": {
    es: "Salkantay Trek Clásico",
    en: "Classic Salkantay Trek",
    pt: "Salkantay Trek Clássico",
    fr: "Salkantay Trek Classique",
    it: "Salkantay Trek Classico"
  },
  "Eventos": {
    es: "Eventos",
    en: "Events",
    pt: "Eventos",
    fr: "Événements",
    it: "Eventi"
  },
  "reseñas verificadas": {
    es: "reseñas verificadas",
    en: "verified reviews",
    pt: "avaliações verificadas",
    fr: "avis vérifiés",
    it: "recensioni verificate"
  },
  "Mapa de Ruta & Puntos Escénicos": {
    es: "Mapa de Ruta & Puntos Escénicos",
    en: "Route Map & Scenic Viewpoints",
    pt: "Mapa de Rota & Pontos Cênicos",
    fr: "Carte de l’Itinéraire & Points Panoramiques",
    it: "Mappa del Percorso & Punti Panoramici"
  },
  "Conoce el perfil geográfico del recorrido desde el Centro Histórico del Cusco hasta los miradores andinos.": {
    es: "Conoce el perfil geográfico del recorrido desde el Centro Histórico del Cusco hasta los miradores andinos.",
    en: "Explore the geographic profile of the journey from Cusco’s Historic Center to alpine viewpoints.",
    pt: "Conheça o perfil geográfico do percurso desde o Centro Histórico de Cusco até os mirantes andinos.",
    fr: "Découvrez le profil géographique du parcours depuis le Centre Historique de Cusco jusqu’aux belvédères andins.",
    it: "Scopri il profilo geografico del percorso dal Centro Storico di Cusco fino ai punti panoramici andini."
  },
  "Perfil de Altitud & Escala del Recorrido": {
    es: "Perfil de Altitud & Escala del Recorrido",
    en: "Elevation Profile & Journey Scale",
    pt: "Perfil de Altitude & Escala do Percurso",
    fr: "Profil d’Altitude & Échelle du Parcours",
    it: "Profilo di Altitudine & Scala del Percorso"
  },
  "Partida: 3,400m": {
    es: "Partida: 3,400m",
    en: "Departure: 3,400m",
    pt: "Partida: 3.400m",
    fr: "Départ : 3 400m",
    it: "Partenza: 3.400m"
  },
  "Cumbre: 4,200m": {
    es: "Cumbre: 4,200m",
    en: "Summit: 4,200m",
    pt: "Cume: 4.200m",
    fr: "Sommet : 4 200m",
    it: "Vetta: 4.200m"
  },
  "Navegación GPS Verificada": {
    es: "Navegación GPS Verificada",
    en: "Verified GPS Navigation",
    pt: "Navegação GPS Verificada",
    fr: "Navigation GPS Vérifiée",
    it: "Navigazione GPS Verificata"
  },
  "Acceso Guiado y Traslado Puerta a Puerta": {
    es: "Acceso Guiado y Traslado Puerta a Puerta",
    en: "Guided Access & Door-to-Door Transfer",
    pt: "Acesso Guiado e Traslado Porta a Porta",
    fr: "Accès Guidé et Transfert Porte-à-Porte",
    it: "Accesso Guidato e Trasferimento Porta a Porta"
  },
  "Nuestras unidades turísticas cuentan con permiso del MTC, SOAT turístico vigente y monitoreo GPS durante todo el trayecto desde el centro de Cusco hasta el sendero.": {
    es: "Nuestras unidades turísticas cuentan con permiso del MTC, SOAT turístico vigente y monitoreo GPS durante todo el trayecto desde el centro de Cusco hasta el sendero.",
    en: "Our tourism vehicles are authorized by the MTC, feature active tourist SOAT insurance, and 24/7 GPS monitoring from Cusco city center to the trailhead.",
    pt: "Nossos veículos turísticos possuem autorização do MTC, seguro SOAT turístico vigente e monitoramento GPS durante todo o trajeto desde o centro de Cusco.",
    fr: "Nos véhicules touristiques disposent de l’autorisation du MTC, d’une assurance touristique SOAT valide et d’un suivi GPS sur tout le trajet depuis Cusco.",
    it: "I nostri veicoli turistici dispongono di autorizzazione del MTC, assicurazione SOAT turistica valida e monitoraggio GPS durante tutto il tragitto da Cusco."
  },
  "Punto de Recojo:": {
    es: "Punto de Recojo:",
    en: "Pick-up Point:",
    pt: "Ponto de Encontro / Recolha:",
    fr: "Point de Prise en Charge :",
    it: "Punto di Ritrovo:"
  },
  "Tu hotel o Airbnb en el Centro Histórico de Cusco": {
    es: "Tu hotel o Airbnb en el Centro Histórico de Cusco",
    en: "Your hotel or Airbnb in Cusco Historic Center",
    pt: "Seu hotel ou Airbnb no Centro Histórico de Cusco",
    fr: "Votre hôtel ou Airbnb dans le Centre Historique de Cusco",
    it: "Il tuo hotel o Airbnb nel Centro Storico di Cusco"
  },
  "Tiempo de Traslado:": {
    es: "Tiempo de Traslado:",
    en: "Transfer Time:",
    pt: "Tempo de Traslado:",
    fr: "Temps de Trajet :",
    it: "Tempo di Trasferimento:"
  },
  "Aprox. 2h 45m de viaje panorámico por tramo": {
    es: "Aprox. 2h 45m de viaje panorámico por tramo",
    en: "Approx. 2h 45m scenic drive each way",
    pt: "Aprox. 2h 45m de viagem panorâmica por trecho",
    fr: "Env. 2h 45m de trajet panoramique par tronçon",
    it: "Circa 2h 45m di viaggio panoramico a tratta"
  },
  "Seguridad en Ruta:": {
    es: "Seguridad en Ruta:",
    en: "Road Safety:",
    pt: "Segurança na Rota:",
    fr: "Sécurité sur Route :",
    it: "Sicurezza sulla Strada:"
  },
  "Choferes experimentados en carreteras de montaña": {
    es: "Choferes experimentados en carreteras de montaña",
    en: "Experienced mountain road drivers",
    pt: "Motoristas experientes em estradas de montanha",
    fr: "Chauffeurs expérimentés sur routes de montagne",
    it: "Autisti esperti su strade di montagna"
  },
  'Salkantay Trek 5 Días a Machu Picchu': {
    es: 'Salkantay Trek 5 Días a Machu Picchu',
    en: 'Salkantay Trek 5 Days to Machu Picchu',
    pt: 'Salkantay Trek 5 Dias para Machu Picchu',
    fr: 'Salkantay Trek 5 Jours vers Machu Picchu',
    it: 'Salkantay Trek 5 Giorni a Machu Picchu'
  },
  'Salkantay Trek 5 Días': {
    es: 'Salkantay Trek 5 Días',
    en: 'Salkantay Trek 5 Days',
    pt: 'Salkantay Trek 5 Dias',
    fr: 'Salkantay Trek 5 Jours',
    it: 'Salkantay Trek 5 Giorni'
  },
  'Expedición Oficial de Alta Montaña': {
    es: 'Expedición Oficial de Alta Montaña',
    en: 'Official High-Altitude Mountain Expedition',
    pt: 'Expedição Oficial de Alta Montanha',
    fr: 'Expédition Officielle de Haute Montagne',
    it: 'Spedizione Ufficiale di Alta Montagna'
  },
  'Desafía el legendario paso Salkantay a 4,630 msnm, duerme bajo las estrellas en domos geodésicos de cristal y culmina en la maravilla inca.': {
    es: 'Desafía el legendario paso Salkantay a 4,630 msnm, duerme bajo las estrellas en domos geodésicos de cristal y culmina en la maravilla inca.',
    en: 'Conquer the legendary Salkantay Pass at 4,630 m.a.s.l., sleep beneath the stars in crystal glass domes, and conclude at the Inca wonder.',
    pt: 'Desafie o lendário passo Salkantay a 4.630 m de altitude, durma sob as estrelas em domos geodésicos de cristal e culmine na maravilha inca.',
    fr: 'Défiez le col mythique de Salkantay à 4 630 m d’altitude, dormez sous les étoiles dans des dômes géodésiques de verre et terminez en apothéose au Machu Picchu.',
    it: 'Sfida il leggendario passo Salkantay a 4.630 m s.l.m., dormi sotto le stelle in cupole geodetiche di vetro e culmina nella meraviglia inca.'
  },
  'Machu Picchu VIP & Tren Hiram Bingham': {
    es: 'Machu Picchu VIP & Tren Hiram Bingham',
    en: 'Machu Picchu VIP & Hiram Bingham Luxury Train',
    pt: 'Machu Picchu VIP & Trem Hiram Bingham',
    fr: 'Machu Picchu VIP & Train Hiram Bingham',
    it: 'Machu Picchu VIP & Treno Hiram Bingham'
  },
  'Cusco Luxury Collection VIP': {
    es: 'Cusco Luxury Collection VIP',
    en: 'Cusco Luxury Collection VIP',
    pt: 'Cusco Luxury Collection VIP',
    fr: 'Cusco Luxury Collection VIP',
    it: 'Cusco Luxury Collection VIP'
  },
  'Descubre la maravilla del mundo con traslados en Mercedes Benz, tren con coche observatorio de lujo y un guía historiador colegiado exclusivo para ti.': {
    es: 'Descubre la maravilla del mundo con traslados en Mercedes Benz, tren con coche observatorio de lujo y un guía historiador colegiado exclusivo para ti.',
    en: 'Discover the wonder of the world with Mercedes Benz transfers, a luxury observatory train car, and an exclusive certified historian guide dedicated to you.',
    pt: 'Descubra a maravilha do mundo com traslados em Mercedes Benz, trem com vagão observatório de luxo e um guia historiador credenciado exclusivo para você.',
    fr: 'Découvrez la merveille du monde avec transferts en Mercedes Benz, train avec voiture panoramique de luxe et un guide historien agréé exclusif pour vous.',
    it: 'Scopri la meraviglia del mondo con trasferimenti in Mercedes Benz, treno con carrozza panoramica di lusso e una guida storica abilitata esclusiva per te.'
  },
  'Descubre los enigmas de la arquitectura megalítica inca en Sacsayhuamán, Q’enqo, Puka Pukara y Tambomachay junto a una arqueóloga experta.': {
    es: 'Descubre los enigmas de la arquitectura megalítica inca en Sacsayhuamán, Q’enqo, Puka Pukara y Tambomachay junto a una arqueóloga experta.',
    en: 'Discover the enigmas of megalithic Inca architecture at Sacsayhuamán, Q’enqo, Puka Pukara, and Tambomachay alongside an expert archaeologist.',
    pt: 'Descubra os enigmas da arquitetura megalítica inca em Sacsayhuamán, Q’enqo, Puka Pukara e Tambomachay junto com uma arqueóloga especialista.',
    fr: 'Découvrez les énigmes de l’architecture mégalithique inca à Sacsayhuamán, Q’enqo, Puka Pukara et Tambomachay aux côtés d’une archéologue experte.',
    it: 'Scopri gli enigmi dell’architettura megalitica inca a Sacsayhuamán, Q’enqo, Puka Pukara e Tambomachay insieme a un’archeologa esperta.'
  },
  'Una expedición pausada hacia las aguas turquesas del nevado Humantay, diseñada para amantes de la fotografía, el paisajismo y los viajes auténticos.': {
    es: 'Una expedición pausada hacia las aguas turquesas del nevado Humantay, diseñada para amantes de la fotografía, el paisajismo y los viajes auténticos.',
    en: 'A serene expedition toward the turquoise waters of Humantay glacier, designed for photography lovers, landscapes, and authentic travel.',
    pt: 'Uma expedição tranquila até as águas turquesas do nevado Humantay, projetada para amantes da fotografia, paisagens e viagens autênticas.',
    fr: 'Une expédition sereine vers les eaux turquoise du glacier Humantay, conçue pour les amateurs de photographie, de paysages et de voyages authentiques.',
    it: 'Una spedizione rilassata verso le acque turchesi del ghiacciaio Humantay, pensata per gli amanti della fotografia, dei paesaggi e dei viaggi autentici.'
  },
  'Solicitar Cotización Privada': {
    es: 'Solicitar Cotización Privada',
    en: 'Request Private Quote',
    pt: 'Solicitar Cotação Privada',
    fr: 'Demander un Devis Privé',
    it: 'Richiedi Preventivo Privato'
  },
  'Solicitar Cotización': {
    es: 'Solicitar Cotización',
    en: 'Request a Quote',
    pt: 'Pedir Orçamento',
    fr: 'Demander un Devis',
    it: 'Richiedi Preventivo'
  },
  'SOLICITAR COTIZACIÓN': {
    es: 'SOLICITAR COTIZACIÓN',
    en: 'REQUEST A QUOTE',
    pt: 'PEDIR ORÇAMENTO',
    fr: 'DEMANDER UN DEVIS',
    it: 'RICHIEDI PREVENTIVO'
  },
  'Consultar Horarios por WhatsApp': {
    es: 'Consultar Horarios por WhatsApp',
    en: 'Inquire Schedules via WhatsApp',
    pt: 'Consultar Horários no WhatsApp',
    fr: 'Consulter les Horaires sur WhatsApp',
    it: 'Consulta Orari su WhatsApp'
  },
  'Consultar Fechas por WhatsApp': {
    es: 'Consultar Fechas por WhatsApp',
    en: 'Check Dates on WhatsApp',
    pt: 'Consultar Datas no WhatsApp',
    fr: 'Consulter les Dates sur WhatsApp',
    it: 'Verifica Date su WhatsApp'
  },
  'Consultar WhatsApp': {
    es: 'Consultar WhatsApp',
    en: 'Inquire on WhatsApp',
    pt: 'Consultar no WhatsApp',
    fr: 'Consulter sur WhatsApp',
    it: 'Consulta su WhatsApp'
  },
  'Reserva VIP': {
    es: 'Reserva VIP',
    en: 'VIP Booking',
    pt: 'Reserva VIP',
    fr: 'Réservation VIP',
    it: 'Prenotazione VIP'
  },
  'Reserva Cultural': {
    es: 'Reserva Cultural',
    en: 'Cultural Booking',
    pt: 'Reserva Cultural',
    fr: 'Réservation Culturelle',
    it: 'Prenotazione Culturale'
  },
  'Consultar Cupo': {
    es: 'Consultar Cupo',
    en: 'Check Availability',
    pt: 'Consultar Vagas',
    fr: 'Vérifier Disponibilité',
    it: 'Verifica Posti'
  },
  'Solicitar VIP': {
    es: 'Solicitar VIP',
    en: 'Request VIP',
    pt: 'Solicitar VIP',
    fr: 'Demander VIP',
    it: 'Richiedi VIP'
  },
  'Propuesta VIP': {
    es: 'Propuesta VIP',
    en: 'VIP Proposal',
    pt: 'Proposta VIP',
    fr: 'Proposition VIP',
    it: 'Proposta VIP'
  },
  '100% Privado Exclusivo': {
    es: '100% Privado Exclusivo',
    en: '100% Private & Exclusive',
    pt: '100% Privado Exclusivo',
    fr: '100% Privé Exclusif',
    it: '100% Privato Esclusivo'
  },
  '100% Privado': {
    es: '100% Privado',
    en: '100% Private',
    pt: '100% Privado',
    fr: '100% Privé',
    it: '100% Privato'
  },
  'Tours Privados & Compartidos VIP': {
    es: 'Tours Privados & Compartidos VIP',
    en: 'VIP Private & Shared Tours',
    pt: 'Passeios Privativos & Compartilhados VIP',
    fr: 'Circuits Privés & Partagés VIP',
    it: 'Tour Privati & Condivisi VIP'
  },
  'Grupos Reducidos & Privados VIP': {
    es: 'Grupos Reducidos & Privados VIP',
    en: 'Small Groups & VIP Private Tours',
    pt: 'Grupos Reduzidos & Privativos VIP',
    fr: 'Petits Groupes & Circuits Privés VIP',
    it: 'Piccoli Gruppi & Tour Privati VIP'
  },
  'Grupo Reducido (Máx. 12 pers.)': {
    es: 'Grupo Reducido (Máx. 12 pers.)',
    en: 'Small Group (Max. 12 guests)',
    pt: 'Grupo Reduzido (Máx. 12 pessoas)',
    fr: 'Petit Groupe (Max. 12 personnes)',
    it: 'Piccolo Gruppo (Max. 12 persone)'
  },
  'SUV Privada Climatizada': {
    es: 'SUV Privada Climatizada',
    en: 'Private Climate-Controlled SUV',
    pt: 'SUV Privativo Climatizado',
    fr: 'SUV Privé Climatisé',
    it: 'SUV Privato Climatizzato'
  },
  'Campamento Domos VIP': {
    es: 'Campamento Domos VIP',
    en: 'VIP Sky Domes Camp',
    pt: 'Acampamento Domos VIP',
    fr: 'Camp de Dômes VIP',
    it: 'Campo Cupole VIP'
  },
  'Salida Anticipada VIP': {
    es: 'Salida Anticipada VIP',
    en: 'Early Access VIP Departure',
    pt: 'Saída Antecipada VIP',
    fr: 'Départ Matinal VIP',
    it: 'Partenza Anticipata VIP'
  },
  'Tren Pullman Histórico': {
    es: 'Tren Pullman Histórico',
    en: 'Historic Pullman Train',
    pt: 'Trem Pullman Histórico',
    fr: 'Train Pullman Historique',
    it: 'Treno Pullman Storico'
  },
  'Paso Peatonal Privado': {
    es: 'Paso Peatonal Privado',
    en: 'Private Pedestrian Access',
    pt: 'Acesso Pedonal Privativo',
    fr: 'Accès Piéton Privé',
    it: 'Accesso Pedonale Privato'
  },
  'Confortable / Moderada': {
    es: 'Confortable / Moderada',
    en: 'Comfortable / Moderate',
    pt: 'Confortável / Moderada',
    fr: 'Confortable / Modérée',
    it: 'Confortevole / Moderata'
  },
  'Fácil (Apto para toda la familia)': {
    es: 'Fácil (Apto para toda la familia)',
    en: 'Easy (Suitable for all ages)',
    pt: 'Fácil (Adequado para toda a família)',
    fr: 'Facile (Accessible à toute la famille)',
    it: 'Facile (Adatto a tutta la famiglia)'
  },
  'Fácil (Familiar / Sin esfuerzo)': {
    es: 'Fácil (Familiar / Sin esfuerzo)',
    en: 'Easy (Family-friendly / Effortless)',
    pt: 'Fácil (Familiar / Sem esforço)',
    fr: 'Facile (Familial / Sans effort)',
    it: 'Facile (Familiare / Senza sforzo)'
  },
  'Familias, Parejas VIP y Exploradores Exigentes': {
    es: 'Familias, Parejas VIP y Exploradores Exigentes',
    en: 'Families, VIP Couples & Discerning Explorers',
    pt: 'Famílias, Casais VIP e Exploradores Exigentes',
    fr: 'Familles, Couples VIP et Explorateurs Exigeants',
    it: 'Famiglie, Coppie VIP ed Esploratori Esigenti'
  },
  'Familias, historiadores y viajeros culturales': {
    es: 'Familias, historiadores y viajeros culturales',
    en: 'Families, Historians & Cultural Travelers',
    pt: 'Famílias, Historiadores e Viajantes Culturais',
    fr: 'Familles, Historiens et Voyageurs Culturels',
    it: 'Famiglie, Storici e Viaggiatori Culturali'
  },
  'Spots Fotográficos': {
    es: 'Spots Fotográficos',
    en: 'Photo Spots',
    pt: 'Pontos Fotográficos',
    fr: 'Spots Photos',
    it: 'Punti Fotografici'
  },
  'Tarifa Especial:': {
    es: 'Tarifa Especial:',
    en: 'Special Rate:',
    pt: 'Tarifa Especial:',
    fr: 'Tarif Spécial :',
    it: 'Tariffa Speciale:'
  },
  'Guía Fotográfica:': {
    es: 'Guía Fotográfica:',
    en: 'Photo Guide:',
    pt: 'Guia Fotográfico:',
    fr: 'Guide Photographique :',
    it: 'Guida Fotografica:'
  },
  'Salidas Diarias 2026': {
    es: 'Salidas Diarias 2026',
    en: 'Daily Departures 2026',
    pt: 'Saídas Diárias 2026',
    fr: 'Départs Quotidiens 2026',
    it: 'Partenze Giornaliere 2026'
  },
  'Colección Privada 5★': {
    es: 'Colección Privada 5★',
    en: '5★ Private Collection',
    pt: 'Coleção Privada 5★',
    fr: 'Collection Privée 5★',
    it: 'Collezione Privata 5★'
  },
  'Servicio Privado Exclusivo': {
    es: 'Servicio Privado Exclusivo',
    en: 'Exclusive Private Service',
    pt: 'Serviço Privado Exclusivo',
    fr: 'Service Privé Exclusif',
    it: 'Servizio Privato Esclusivo'
  },
  'Vivencias Sensoriales': {
    es: 'Vivencias Sensoriales',
    en: 'Sensory Experiences',
    pt: 'Vivências Sensoriais',
    fr: 'Expériences Sensorielles',
    it: 'Esperienze Sensoriali'
  },
  '100% Incluido': {
    es: '100% Incluido',
    en: '100% All-Inclusive',
    pt: '100% Tudo Incluído',
    fr: '100% Tout Inclus',
    it: '100% Tutto Incluso'
  },
  'SUV Privada': {
    es: 'SUV Privada',
    en: 'Private SUV',
    pt: 'SUV Privativo',
    fr: 'SUV Privé',
    it: 'SUV Privato'
  },
  'Tours & Paquetes Privados': {
    es: 'Tours & Paquetes Privados',
    en: 'Tours & Private Packages',
    pt: 'Passeios & Pacotes Privativos',
    fr: 'Circuits & Forfaits Privés',
    it: 'Tour & Pacchetti Privati'
  },
  'Garantía Luxury': {
    es: 'Garantía Luxury',
    en: 'Luxury Guarantee',
    pt: 'Garantia Luxury',
    fr: 'Garantie Prestige',
    it: 'Garanzia Luxury'
  },
  'Guía Asignado:': {
    es: 'Guía Asignado:',
    en: 'Assigned Guide:',
    pt: 'Guia Designado:',
    fr: 'Guide Attitré :',
    it: 'Guida Assegnata:'
  },
  'Seguridad:': {
    es: 'Seguridad:',
    en: 'Safety & Health:',
    pt: 'Segurança & Saúde:',
    fr: 'Sécurité & Santé :',
    it: 'Sicurezza & Salute:'
  },
  'Oxígeno & Médico': {
    es: 'Oxígeno & Médico',
    en: 'Oxygen & Medical Kit',
    pt: 'Oxigênio & Kit Médico',
    fr: 'Oxygène & Kit Médical',
    it: 'Ossigeno & Kit Medico'
  },
  'Salón VIP Plaza de Armas:': {
    es: 'Salón VIP Plaza de Armas:',
    en: 'VIP Lounge Main Square:',
    pt: 'Salão VIP Praça de Armas:',
    fr: 'Salon VIP Place d\'Armes :',
    it: 'Sala VIP Piazza d\'Armi:'
  },
  'Café de Especialidad': {
    es: 'Café de Especialidad',
    en: 'Specialty Coffee',
    pt: 'Café Especial',
    fr: 'Café de Spécialité',
    it: 'Caffè Speciale'
  },
  'Trekking & Montaña': {
    es: 'Trekking & Montaña',
    en: 'Trekking & Mountain',
    pt: 'Trekking & Montanha',
    fr: 'Trekking & Montagne',
    it: 'Trekking & Montagna'
  },
  'Tarifa Todo Incluido:': {
    es: 'Tarifa Todo Incluido:',
    en: 'All-Inclusive Rate:',
    pt: 'Tarifa Tudo Incluído:',
    fr: 'Tarif Tout Inclus :',
    it: 'Tariffa Tutto Incluso:'
  },
  'Ruta Cultural Ancestral': {
    es: 'Ruta Cultural Ancestral',
    en: 'Ancestral Cultural Route',
    pt: 'Rota Cultural Ancestral',
    fr: 'Itinéraire Culturel Ancestral',
    it: 'Percorso Culturale Ancestrale'
  },
  'Entre montañas sagradas y tradición milenaria': {
    es: 'Entre montañas sagradas y tradición milenaria',
    en: 'Between sacred peaks and thousand-year traditions',
    pt: 'Entre montanhas sagradas e tradição milenar',
    fr: 'Entre sommets sacrés et tradition millénaire',
    it: 'Tra montagne sacre e tradizione millenaria'
  },
  'Boleto': {
    es: 'Boleto',
    en: 'Ticket',
    pt: 'Ingresso',
    fr: 'Billet',
    it: 'Biglietto'
  },
  'Ritual': {
    es: 'Ritual',
    en: 'Ceremony',
    pt: 'Ritual',
    fr: 'Rituel',
    it: 'Rituale'
  },
  'Templos': {
    es: 'Templos',
    en: 'Temples',
    pt: 'Templos',
    fr: 'Temples',
    it: 'Templi'
  },
  'Crónicas & Actualidad': {
    es: 'Crónicas & Actualidad',
    en: 'Chronicles & News',
    pt: 'Crônicas & Notícias',
    fr: 'Chroniques & Actualités',
    it: 'Cronache & Notizie'
  },
  'Agenda & Eventos': {
    es: 'Agenda & Eventos',
    en: 'Events Schedule',
    pt: 'Agenda & Eventos',
    fr: 'Agenda & Événements',
    it: 'Agenda & Eventi'
  },
  'Territorio & Mapa': {
    es: 'Territorio & Mapa',
    en: 'Territory & Map',
    pt: 'Território & Mapa',
    fr: 'Territoire & Carte',
    it: 'Territorio & Mappa'
  },
  'Cartografía GPS': {
    es: 'Cartografía GPS',
    en: 'GPS Mapping',
    pt: 'Cartografia GPS',
    fr: 'Cartographie GPS',
    it: 'Cartografia GPS'
  },
  'Mochila del Historiador:': {
    es: 'Mochila del Historiador:',
    en: 'Historian\'s Gear:',
    pt: 'Mochila do Historiador:',
    fr: 'Sac de l\'Historien :',
    it: 'Zaino dello Storico:'
  },
  'Calzado con tracción • UV400': {
    es: 'Calzado con tracción • UV400',
    en: 'Traction shoes • UV400',
    pt: 'Calçado com tração • UV400',
    fr: 'Chaussures à crampons • UV400',
    it: 'Scarpe con aderenza • UV400'
  },
  'Tarifa Cultural:': {
    es: 'Tarifa Cultural:',
    en: 'Cultural Rate:',
    pt: 'Tarifa Cultural:',
    fr: 'Tarif Culturel :',
    it: 'Tariffa Culturale:'
  },
  'Arqueología & Historia': {
    es: 'Arqueología & Historia',
    en: 'Archaeology & History',
    pt: 'Arqueologia & História',
    fr: 'Archéologie & Histoire',
    it: 'Archeologia & Storia'
  },
  'Laguna Humantay — Bitácora Fotográfica': {
    es: 'Laguna Humantay — Bitácora Fotográfica',
    en: 'Humantay Lake — Photographic Journal',
    pt: 'Lagoa Humantay — Diário Fotográfico',
    fr: 'Lagune Humantay — Carnet Photographique',
    it: 'Laguna Humantay — Diario Fotografico'
  },
  'Qosqo Imperial': {
    es: 'Qosqo Imperial',
    en: 'Imperial Qosqo',
    pt: 'Qosqo Imperial',
    fr: 'Qosqo Impérial',
    it: 'Qosqo Imperiale'
  },
  'Temporada 2026': {
    es: 'Temporada 2026',
    en: '2026 Season',
    pt: 'Temporada 2026',
    fr: 'Saison 2026',
    it: 'Stagione 2026'
  },
  'Nuevo sendero señalizado por los templos y miradores incas': {
    es: 'Nuevo sendero señalizado por los templos y miradores incas',
    en: 'New signaled trail through Inca temples and viewpoints',
    pt: 'Nova trilha sinalizada pelos templos e mirantes incas',
    fr: 'Nouveau sentier balisé à travers les temples et belvédères incas',
    it: 'Nuovo sentiero segnalato attraverso templi e belvederi inca'
  },
  'Guiado histórico con arqueólogos colegiados DIRCETUR.': {
    es: 'Guiado histórico con arqueólogos colegiados DIRCETUR.',
    en: 'Historical guiding by licensed DIRCETUR archaeologists.',
    pt: 'Guia histórico com arqueólogos credenciados DIRCETUR.',
    fr: 'Visite guidée historique par des archéologues agréés DIRCETUR.',
    it: 'Visita storica guidata da archeologi abilitati DIRCETUR.'
  },
  '24 Junio - Solsticio': {
    es: '24 Junio - Solsticio',
    en: 'June 24 - Solstice',
    pt: '24 de Junho - Solstício',
    fr: '24 Juin - Solstice',
    it: '24 Giugno - Solstizio'
  },
  'Inti Raymi: La Fiesta del Sol': {
    es: 'Inti Raymi: La Fiesta del Sol',
    en: 'Inti Raymi: The Festival of the Sun',
    pt: 'Inti Raymi: A Festa do Sol',
    fr: 'Inti Raymi : La Fête du Soleil',
    it: 'Inti Raymi: La Festa del Sole'
  },
  'Logística Integral Advance': {
    es: 'Logística Integral Advance',
    en: 'Advance Comprehensive Logistics',
    pt: 'Logística Integral Advance',
    fr: 'Logistique Complète Advance',
    it: 'Logistica Completa Advance'
  },
  'Transporte 4x4 + Boletos Oficiales': {
    es: 'Transporte 4x4 + Boletos Oficiales',
    en: '4x4 Transport + Official Tickets',
    pt: 'Transporte 4x4 + Ingressos Oficiais',
    fr: 'Transport 4x4 + Billets Officiels',
    it: 'Trasporto 4x4 + Biglietti Ufficiali'
  },
  'Balón Oxígeno & Monitoreo Médico': {
    es: 'Balón Oxígeno & Monitoreo Médico',
    en: 'Oxygen Tank & Medical Monitoring',
    pt: 'Balão de Oxigênio & Monitoramento Médico',
    fr: 'Bouteille d’Oxygène & Suivi Médical',
    it: 'Bombola d’Ossigeno & Monitoraggio Medico'
  },
  'Viajeros': {
    es: 'Viajeros',
    en: 'Travelers',
    pt: 'Viajantes',
    fr: 'Voyageurs',
    it: 'Viaggiatori'
  },
  'Experiencia': {
    es: 'Experiencia',
    en: 'Experience',
    pt: 'Experiência',
    fr: 'Expérience',
    it: 'Esperienza'
  },
  'Reseñas': {
    es: 'Reseñas',
    en: 'Reviews',
    pt: 'Avaliações',
    fr: 'Avis',
    it: 'Recensioni'
  },
  'Catálogo de Tours Exclusivos': {
    es: 'Catálogo de Tours Exclusivos',
    en: 'Exclusive Tours Catalog',
    pt: 'Catálogo de Passeios Exclusivos',
    fr: 'Catalogue de Circuits Exclusifs',
    it: 'Catalogo dei Tour Esclusivi'
  },
  'Ver todos': {
    es: 'Ver todos',
    en: 'View all',
    pt: 'Ver todos',
    fr: 'Voir tout',
    it: 'Vedi tutti'
  },
  'Oficina Física en Cusco:': {
    es: 'Oficina Física en Cusco:',
    en: 'Physical Office in Cusco:',
    pt: 'Escritório Físico em Cusco:',
    fr: 'Bureau Physique à Cusco :',
    it: 'Ufficio Fisico a Cusco:'
  },
  'Maps Conectado': {
    es: 'Maps Conectado',
    en: 'Maps Connected',
    pt: 'Maps Conectado',
    fr: 'Maps Connecté',
    it: 'Maps Connesso'
  },
  'Reservar con Guía': {
    es: 'Reservar con Guía',
    en: 'Book with Guide',
    pt: 'Reservar com Guia',
    fr: 'Réserver avec Guide',
    it: 'Prenota con Guida'
  },
  'Guía': {
    es: 'Guía',
    en: 'Guide',
    pt: 'Guia',
    fr: 'Guide',
    it: 'Guida'
  },
  'Reserva': {
    es: 'Reserva',
    en: 'Booking',
    pt: 'Reserva',
    fr: 'Réservation',
    it: 'Prenota'
  },
  'Cusco, Valle Sagrado & Machu Picchu': {
    es: 'Cusco, Valle Sagrado & Machu Picchu',
    en: 'Cusco, Sacred Valley & Machu Picchu',
    pt: 'Cusco, Vale Sagrado & Machu Picchu',
    fr: 'Cusco, Vallée Sacrée & Machu Picchu',
    it: 'Cusco, Valle Sacra & Machu Picchu'
  },
  'Cusco Histórico & Sacsayhuamán': {
    es: 'Cusco Histórico & Sacsayhuamán',
    en: 'Historic Cusco & Sacsayhuamán',
    pt: 'Cusco Histórico & Sacsayhuamán',
    fr: 'Cusco Historique & Sacsayhuamán',
    it: 'Cusco Storico & Sacsayhuamán'
  },
  'Cusco, Salkantay & Machu Picchu': {
    es: 'Cusco, Salkantay & Machu Picchu',
    en: 'Cusco, Salkantay & Machu Picchu',
    pt: 'Cusco, Salkantay & Machu Picchu',
    fr: 'Cusco, Salkantay & Machu Picchu',
    it: 'Cusco, Salkantay & Machu Picchu'
  },
  'Un viaje sagrado diseñado para los más exigentes': {
    es: 'Un viaje sagrado diseñado para los más exigentes',
    en: 'A Sacred Journey Designed for Discerning Travelers',
    pt: 'Uma Viagem Sagrada Projetada para os Mais Exigentes',
    fr: 'Un Voyage Sacré Conçu pour les Plus Exigeants',
    it: 'Un Viaggio Sacro Progettato per i Più Esigenti'
  },
  'Evita las largas colas y el estrés del turismo masivo. Nuestro servicio VIP te brinda acceso preferente, almuerzo gourmet en Belmond Sanctuary Lodge y asesoría personalizada de puerta a puerta.': {
    es: 'Evita las largas colas y el estrés del turismo masivo. Nuestro servicio VIP te brinda acceso preferente, almuerzo gourmet en Belmond Sanctuary Lodge y asesoría personalizada de puerta a puerta.',
    en: 'Avoid long lines and mass tourism stress. Our VIP service grants preferred access, gourmet dining at Belmond Sanctuary Lodge, and door-to-door personalized concierge.',
    pt: 'Evite filas longas e o estresse do turismo massivo. Nosso serviço VIP oferece acesso preferencial, almoço gourmet no Belmond Sanctuary Lodge e assistência personalizada de porta a porta.',
    fr: 'Évitez les longues files d’attente et le stress du tourisme de masse. Notre service VIP vous offre un accès préférentiel, un déjeuner gastronomique au Belmond Sanctuary Lodge et un concierge porte-à-porte.',
    it: 'Evita le lunghe code e lo stress del turismo di massa. Il nostro servizio VIP ti offre accesso preferenziale, pranzo gourmet al Belmond Sanctuary Lodge e assistenza personalizzata porta a porta.'
  },
  'Privilegios de la Experiencia Presidencial': {
    es: 'Privilegios de la Experiencia Presidencial',
    en: 'Presidential Experience Privileges',
    pt: 'Privilégios da Experiência Presidencial',
    fr: 'Privilèges de l’Expérience Présidentielle',
    it: 'Privilegi dell’Esperienza Presidenziale'
  },
  'Privilegios de la Experiencia VIP': {
    es: 'Privilegios de la Experiencia VIP',
    en: 'VIP Experience Privileges',
    pt: 'Privilégios da Experiência VIP',
    fr: 'Privilèges de l’Expérience VIP',
    it: 'Privilegi dell’Esperienza VIP'
  },
  '¿Por qué elegir este recorrido cultural?': {
    es: '¿Por qué elegir este recorrido cultural?',
    en: 'Why Choose This Cultural Journey?',
    pt: 'Por Que Escolher Este Roteiro Cultural?',
    fr: 'Pourquoi Choisir Ce Circuit Culturel ?',
    it: 'Perché Scegliere Questo Percorso Culturale?'
  },
  'Portal Oficial de Agencia & Operador Autorizado': {
    es: 'Portal Oficial de Agencia & Operador Autorizado',
    en: 'Official Agency Portal & Licensed Operator',
    pt: 'Portal Oficial de Agência & Operador Autorizado',
    fr: 'Portail Officiel d’Agence & Opérateur Agréé',
    it: 'Portale Ufficiale di Agenzia & Operatore Autorizzato'
  },
  'Reservar Expedición ($380 USD)': {
    es: 'Reservar Expedición ($380 USD)',
    en: 'Book Expedition ($380 USD)',
    pt: 'Reservar Expedição ($380 USD)',
    fr: 'Réserver l’Expédition ($380 USD)',
    it: 'Prenota la Spedizione ($380 USD)'
  },
  'Reservar Expedición': {
    es: 'Reservar Expedición',
    en: 'Book Expedition',
    pt: 'Reservar Expedição',
    fr: 'Réserver l’Expédition',
    it: 'Prenota la Spedizione'
  },
  '5D / 4N': {
    es: '5D / 4N',
    en: '5D / 4N',
    pt: '5D / 4N',
    fr: '5J / 4N',
    it: '5G / 4N'
  },
  'La ruta de trekking más espectacular hacia Machu Picchu': {
    es: 'La ruta de trekking más espectacular hacia Machu Picchu',
    en: 'The Most Spectacular Trekking Route to Machu Picchu',
    pt: 'A Rota de Trekking Mais Espetacular para Machu Picchu',
    fr: 'L’Itinéraire de Trekking le Plus Spectaculaire vers le Machu Picchu',
    it: 'Il Percorso di Trekking Più Spettacolare verso Machu Picchu'
  },
  'Elegida entre los 25 mejores trekkings del mundo por National Geographic. Una travesía épica que une glaciares imponentes, campamentos en domos con vista estelar, ceja de selva con plantaciones de café orgánico, baños termales de Cocalmayo y la ciudadela sagrada de Machu Picchu.': {
    es: 'Elegida entre los 25 mejores trekkings del mundo por National Geographic. Una travesía épica que une glaciares imponentes, campamentos en domos con vista estelar, ceja de selva con plantaciones de café orgánico, baños termales de Cocalmayo y la ciudadela sagrada de Machu Picchu.',
    en: 'Chosen among the top 25 treks in the world by National Geographic. An epic journey connecting towering glaciers, starlit glass dome campsites, cloud forest organic coffee plantations, Cocalmayo thermal hot springs, and the sacred citadel of Machu Picchu.',
    pt: 'Eleita entre os 25 melhores trekkings do mundo pela National Geographic. Uma travessia épica unindo geleiras imponentes, acampamento em domos de vidro sob as estrelas, floresta alta com café orgânico, termas de Cocalmayo e a cidade sagrada de Machu Picchu.',
    fr: 'Élu parmi les 25 plus beaux treks au monde par National Geographic. Une traversée épique reliant des glaciers imposants, des nuits sous dômes vitrés avec vue sur la Voie Lactée, la forêt de nuages et ses plantations de café bio, les thermes naturels de Cocalmayo et la cité sacrée du Machu Picchu.',
    it: 'Scelto tra i 25 migliori trekking al mondo da National Geographic. Una traversata epica tra ghiacciai maestosi, notti in cupole di vetro sotto le stelle, foreste pluviali con piantagioni di caffè biologico, bagni termali di Cocalmayo e la città sacra di Machu Picchu.'
  },
  'Especialistas en Aventura, Domos y Alta Montaña': {
    es: 'Especialistas en Aventura, Domos y Alta Montaña',
    en: 'Specialists in High Mountain Adventure, Domes & Trekking',
    pt: 'Especialistas em Aventura, Domos e Alta Montanha',
    fr: 'Spécialistes en Aventure de Haute Montagne, Dômes & Trekking',
    it: 'Specialisti in Avventura di Alta Quota, Domes & Trekking'
  },
  'Guía Oficial de Alta Montaña DIRCETUR & Rescatista': {
    es: 'Guía Oficial de Alta Montaña DIRCETUR & Rescatista',
    en: 'Official DIRCETUR High-Mountain Guide & Mountain Rescuer',
    pt: 'Guia Oficial de Alta Montanha DIRCETUR & Socorrista',
    fr: 'Guide Officiel de Haute Montagne DIRCETUR & Sauveteur',
    it: 'Guida Ufficiale di Alta Montagna DIRCETUR & Soccorritore'
  },
  'Español, Quechua e Inglés Técnico': {
    es: 'Español, Quechua e Inglés Técnico',
    en: 'Spanish, Quechua & Fluent Technical English',
    pt: 'Espanhol, Quechua e Inglês Técnico',
    fr: 'Espagnol, Quechua et Anglais Technique Fluide',
    it: 'Spagnolo, Quechua e Inglese Tecnico Fluente'
  },
  'Exigente - Alta Montaña (4,630 m)': {
    es: 'Exigente - Alta Montaña (4,630 m)',
    en: 'Challenging - High Altitude (4,630 m)',
    pt: 'Exigente - Alta Montanha (4.630 m)',
    fr: 'Exigeant - Haute Montagne (4 630 m)',
    it: 'Impegnativo - Alta Montagna (4.630 m)'
  },
  'Grupos Reducidos & Domos Sky VIP': {
    es: 'Grupos Reducidos & Domos Sky VIP',
    en: 'Small Groups & VIP Sky Domes',
    pt: 'Grupos Pequenos & Domos Panorâmicos VIP',
    fr: 'Petits Groupes & Dômes Panoramiques VIP',
    it: 'Piccoli Gruppi & Cupole Panoramiche VIP'
  },
  'Amantes del Trekking, Parejas y Aventureros': {
    es: 'Amantes del Trekking, Parejas y Aventureros',
    en: 'Trekking Lovers, Couples & Outdoor Adventurers',
    pt: 'Amantes de Trekking, Casais e Aventureiros',
    fr: 'Passionnés de Trekking, Couples et Baroudeurs',
    it: 'Amanti del Trekking, Coppie e Avventurosi'
  },
  'Lo que incluye esta expedición de montaña': {
    es: 'Lo que incluye esta expedición de montaña',
    en: 'What This High-Mountain Expedition Includes',
    pt: 'O Que Esta Expedição de Alta Montanha Inclui',
    fr: 'Ce que Comprend cette Expédition de Haute Montagne',
    it: 'Cosa Include questa Spedizione di Alta Montagna'
  },
  'Noches en Sky Domes Geodésicos de Cristal': {
    es: 'Noches en Sky Domes Geodésicos de Cristal',
    en: 'Nights in Geodesic Glass Sky Domes',
    pt: 'Noites em Sky Domes Geodésicos de Cristal',
    fr: 'Nuitées en Sky Domes Géodésiques de Verre',
    it: 'Notti in Cupole Geodetiche Panoramiche in Vetro'
  },
  'Campamentos privados con vista panorámica a la Vía Láctea y a los nevados Humantay y Salkantay.': {
    es: 'Campamentos privados con vista panorámica a la Vía Láctea y a los nevados Humantay y Salkantay.',
    en: 'Private scenic campsites with panoramic views of the Milky Way and the Humantay and Salkantay peaks.',
    pt: 'Acampamentos privados com vista panorâmica para a Via Láctea e as montanhas Humantay e Salkantay.',
    fr: 'Campements privés exclusifs avec vue panoramique sur la Voie Lactée et les glaciers Humantay et Salkantay.',
    it: 'Campi privati con vista panoramica sulla Via Lattea e sui ghiacciai Humantay e Salkantay.'
  },
  'Guía de Alta Montaña Certificado DIRCETUR': {
    es: 'Guía de Alta Montaña Certificado DIRCETUR',
    en: 'DIRCETUR Certified High-Mountain Guide',
    pt: 'Guia de Alta Montanha Certificado DIRCETUR',
    fr: 'Guide de Haute Montagne Diplômé DIRCETUR',
    it: 'Guida di Alta Montagna Certificata DIRCETUR'
  },
  'Líder bilingüe acreditado con balón de oxígeno, botiquín de trauma y pulsioxímetro permanente.': {
    es: 'Líder bilingüe acreditado con balón de oxígeno, botiquín de trauma y pulsioxímetro permanente.',
    en: 'Accredited bilingual expedition leader equipped with medical oxygen, trauma first-aid kit, and pulse oximeter.',
    pt: 'Líder credenciado com cilindro de oxigênio, kit de trauma e oxímetro de pulso permanente.',
    fr: 'Chef d’expédition accrédité avec bouteille d’oxygène, trousse de secours traumatologique et oxymètre continu.',
    it: 'Capospedizione bilingue con bombola d\'ossigeno, kit di primo soccorso traumatologico e pulsossimetro costante.'
  },
  'Chef de Montaña & Pensión Completa Gourmet': {
    es: 'Chef de Montaña & Pensión Completa Gourmet',
    en: 'Mountain Chef & Full Gourmet Board',
    pt: 'Chef de Montanha & Pensão Completa Gourmet',
    fr: 'Chef Cuisinier de Montagne & Pension Complète Gourmet',
    it: 'Chef di Montagna & Pensione Completa Gourmet'
  },
  'Desayunos energéticos, almuerzos buffet calientes, lonches con chocolate cusqueño y cenas nutritivas.': {
    es: 'Desayunos energéticos, almuerzos buffet calientes, lonches con chocolate cusqueño y cenas nutritivas.',
    en: 'Hearty hot buffet breakfasts, energizing lunches, afternoon Cusco cocoa tea, and nutritious dinners.',
    pt: 'Café da manhã reforçado, almoços quentes em buffet, lanche com chocolate cusquenho e jantares nutritivos.',
    fr: 'Petits-déjeuners riches, déjeuners buffet chauds, goûters avec chocolat de Cusco et dîners réparateurs.',
    it: 'Colazioni abbondanti, pranzi caldi a buffet, merende con cioccolata di Cusco e cene nutrienti.'
  },
  'Transporte Turístico & Caballos de Apoyo': {
    es: 'Transporte Turístico & Caballos de Apoyo',
    en: 'Tourist Transport & Packhorses',
    pt: 'Transporte Turístico & Cavalos de Apoio',
    fr: 'Transport Touristique Privé & Chevaux de Bât',
    it: 'Trasporto Turistico & Cavalli da Soma'
  },
  'Van privada Cusco - Mollepata y arrieros con mulas para transportar hasta 7 kg de tu equipaje.': {
    es: 'Van privada Cusco - Mollepata y arrieros con mulas para transportar hasta 7 kg de tu equipaje.',
    en: 'Private van Cusco - Mollepata and packhorses to transport up to 7 kg of your duffle luggage.',
    pt: 'Van privativa Cusco - Mollepata e tropeiros com mulas para transportar até 7 kg da sua bagagem.',
    fr: 'Minibus privé Cusco - Mollepata et muletiers avec chevaux pour transporter jusqu’à 7 kg de vos affaires.',
    it: 'Van privato Cusco - Mollepata e mulattieri con cavalli per trasportare fino a 7 kg del tuo bagaglio.'
  },
  'Boletos Oficiales de Tren Panorámico & Machu Picchu': {
    es: 'Boletos Oficiales de Tren Panorámico & Machu Picchu',
    en: 'Panoramic Train & Machu Picchu Official Tickets',
    pt: 'Passagens de Trem Panorâmico & Ingressos para Machu Picchu',
    fr: 'Billets de Train Panoramique & Entrées Machu Picchu',
    it: 'Biglietti per Treno Panoramico & Ingressi Machu Picchu'
  },
  'Retorno en tren Expedition/Vistadome y boleto de ingreso oficial al circuito inca garantizado.': {
    es: 'Retorno en tren Expedition/Vistadome y boleto de ingreso oficial al circuito inca garantizado.',
    en: 'Return scenic train ticket Expedition/Vistadome and guaranteed official Machu Picchu entrance pass.',
    pt: 'Retorno em trem panorâmico Expedition/Vistadome e entrada oficial para Machu Picchu garantida.',
    fr: 'Retour en train panoramique Expedition/Vistadome et billet officiel pour le circuit du Machu Picchu garanti.',
    it: 'Rientro in treno panoramico Expedition/Vistadome e ingresso ufficiale al circuito di Machu Picchu garantito.'
  },
  'Bastones de Trekking & Bolsas de Dormir Térmicas': {
    es: 'Bastones de Trekking & Bolsas de Dormir Térmicas',
    en: 'Trekking Poles & Thermal Sleeping Bags',
    pt: 'Bastões de Caminhada & Sacos de Dormir Térmicos',
    fr: 'Bâtons de Randonnée & Duvets Thermiques Grand Froid',
    it: 'Bastoncini da Trekking & Sacchi a Pelo Termici'
  },
  'Equipamiento profesional de montaña para climas bajo cero homologado para los Andes.': {
    es: 'Equipamiento profesional de montaña para climas bajo cero homologado para los Andes.',
    en: 'Professional sub-zero mountain equipment fully rated for high Andean terrain.',
    pt: 'Equipamento profissional de montanha para clima abaixo de zero homologado para os Andes.',
    fr: 'Équipement professionnel de montagne certifié pour des températures négatives dans les Andes.',
    it: 'Attrezzatura professionale da montagna per temperature sottozero omologata per le Ande.'
  },
  'Transporte turístico privado ida y vuelta desde tu hotel en Cusco': {
    es: 'Transporte turístico privado ida y vuelta desde tu hotel en Cusco',
    en: 'Round-trip private tourist transport directly from your hotel in Cusco',
    pt: 'Transporte turístico privativo de ida e volta do seu hotel em Cusco',
    fr: 'Transport touristique privé aller-retour depuis votre hôtel à Cusco',
    it: 'Trasporto turistico privato andata e ritorno dal tuo hotel a Cusco'
  },
  'Noches de alojamiento en Domos de Cristal Sky Domes y hotel boutique en Aguas Calientes': {
    es: 'Noches de alojamiento en Domos de Cristal Sky Domes y hotel boutique en Aguas Calientes',
    en: 'Nights in Sky Domes glass campsites and boutique hotel in Aguas Calientes',
    pt: 'Noites de hospedagem em Sky Domes de cristal e hotel boutique em Aguas Calientes',
    fr: 'Nuitées en dômes géodésiques Sky Domes et hôtel de charme à Aguas Calientes',
    it: 'Pernottamenti in cupole di vetro Sky Domes e boutique hotel ad Aguas Calientes'
  },
  'Todas las comidas gourmet de montaña preparadas por chef profesional': {
    es: 'Todas las comidas gourmet de montaña preparadas por chef profesional',
    en: 'All hot mountain meals freshly prepared by a professional expedition chef',
    pt: 'Todas as refeições gourmet preparadas na montanha por chef profissional',
    fr: 'Tous les repas gastronomiques chauds préparés sur place par un chef de haute montagne',
    it: 'Tutti i pasti gourmet di montagna preparati da chef professionista'
  },
  'Guía oficial colegiado DIRCETUR experto en alta montaña y primeros auxilios': {
    es: 'Guía oficial colegiado DIRCETUR experto en alta montaña y primeros auxilios',
    en: 'Official licensed DIRCETUR guide specialized in high alpine terrain and Wilderness First Aid',
    pt: 'Guia oficial registrado na DIRCETUR especialista em alta montanha e primeiros socorros',
    fr: 'Guide officiel certifié DIRCETUR spécialiste de haute altitude et premiers secours',
    it: 'Guida ufficiale abilitata DIRCETUR esperta in alta montagna e pronto soccorso'
  },
  'Caballos de carga y arrieros para equipaje personal (hasta 7 kg por persona)': {
    es: 'Caballos de carga y arrieros para equipaje personal (hasta 7 kg por persona)',
    en: 'Packhorses and horsemen for personal luggage (up to 7 kg per hiker)',
    pt: 'Cavalos de carga e tropeiros para bagagem pessoal (até 7 kg por pessoa)',
    fr: 'Chevaux de bât et muletiers pour le sac de voyage (jusqu’à 7 kg par personne)',
    it: 'Cavalli da soma e mulattieri per il bagaglio personale (fino a 7 kg a persona)'
  },
  'Balón de oxígeno medicinal de emergencia y botiquín de primeros auxilios 24/7': {
    es: 'Balón de oxígeno medicinal de emergencia y botiquín de primeros auxilios 24/7',
    en: 'Emergency medical oxygen cylinder and comprehensive 24/7 first aid trauma kit',
    pt: 'Cilindro de oxigênio medicinal de emergência e kit de primeiros socorros 24/7',
    fr: 'Bouteille d’oxygène médical d’urgence et trousse de premiers secours 24/7',
    it: 'Bombola di ossigeno medicinale di emergenza e kit di primo soccorso 24/7'
  },
  'Boletos oficiales de ingreso a Machu Picchu y tren panorámico de retorno a Ollantaytambo': {
    es: 'Boletos oficiales de ingreso a Machu Picchu y tren panorámico de retorno a Ollantaytambo',
    en: 'Official Machu Picchu entrance tickets and scenic panoramic return train to Ollantaytambo',
    pt: 'Ingressos oficiais para Machu Picchu e trem panorâmico de retorno a Ollantaytambo',
    fr: 'Billets officiels pour le Machu Picchu et train panoramique de retour vers Ollantaytambo',
    it: 'Biglietti ufficiali per Machu Picchu e treno panoramico di rientro ad Ollantaytambo'
  },
  'Bolsa de dormir térmica (disponible para alquiler por $20 USD)': {
    es: 'Bolsa de dormir térmica (disponible para alquiler por $20 USD)',
    en: 'Thermal sleeping bag (available for rent for $20 USD)',
    pt: 'Saco de dormir térmico (disponível para aluguel por US$ 20)',
    fr: 'Duvet thermique de haute montagne (disponible en location pour 20 $ USD)',
    it: 'Sacco a pelo termico da alta quota (disponibile a noleggio per 20 $ USD)'
  },
  'Ingreso opcional a las aguas termales de Cocalmayo (S/ 10 PEN)': {
    es: 'Ingreso opcional a las aguas termales de Cocalmayo (S/ 10 PEN)',
    en: 'Optional entrance to Cocalmayo natural hot springs (S/ 10 PEN)',
    pt: 'Entrada opcional para as águas termais de Cocalmayo (S/ 10 PEN)',
    fr: 'Entrée optionnelle aux bains thermaux de Cocalmayo (10 S/ PEN)',
    it: 'Ingresso facoltativo alle terme di Cocalmayo (10 S/ PEN)'
  },
  'Almuerzo del día 5 en Aguas Calientes': {
    es: 'Almuerzo del día 5 en Aguas Calientes',
    en: 'Day 5 lunch in Aguas Calientes town',
    pt: 'Almoço do 5º dia na vila de Aguas Calientes',
    fr: 'Déjeuner du jour 5 au village d’Aguas Calientes',
    it: 'Pranzo del quinto giorno ad Aguas Calientes'
  },
  'Propinas voluntarias para el guía, cocinero y arrieros': {
    es: 'Propinas voluntarias para el guía, cocinero y arrieros',
    en: 'Voluntary tips for guide, cook, and horsemen',
    pt: 'Gorjetas voluntárias para o guia, cozinheiro e tropeiros',
    fr: 'Pourboires volontaires pour le guide, le cuisinier et les muletiers',
    it: 'Mance facoltative per guida, cuoco e mulattieri'
  },
  'Pasaporte físico original vigente (indispensable para ingresar a Machu Picchu)': {
    es: 'Pasaporte físico original vigente (indispensable para ingresar a Machu Picchu)',
    en: 'Valid original physical passport (mandatory for Machu Picchu entry)',
    pt: 'Passaporte original físico válido (obrigatório para entrar em Machu Picchu)',
    fr: 'Passeport original en cours de validité (indispensable pour entrer au Machu Picchu)',
    it: 'Passaporto originale valido (indispensabile per accedere a Machu Picchu)'
  },
  'Mochila de ataque de 20 a 30 litros para tus objetos personales de diario': {
    es: 'Mochila de ataque de 20 a 30 litros para tus objetos personales de diario',
    en: '20-30L daypack for your daily essentials and hydration',
    pt: 'Mochila de ataque de 20 a 30 litros para seus itens essenciais diários',
    fr: 'Sac à dos de journée de 20 à 30 litres pour vos affaires indispensables',
    it: 'Zaino da giornata da 20-30 litri per gli oggetti personali essenziali'
  },
  'Botas de trekking con buen agarre y caña media': {
    es: 'Botas de trekking con buen agarre y caña media',
    en: 'Sturdy ankle-high trekking boots with good grip',
    pt: 'Botas de trekking com boa aderência e cano médio',
    fr: 'Chaussures de randonnée montantes et imperméables avec bonne adhérence',
    it: 'Scarponi da trekking a caviglia media con ottima aderenza'
  },
  'Ropa térmica en capas, cortavientos impermeable y guantes de montaña': {
    es: 'Ropa térmica en capas, cortavientos impermeable y guantes de montaña',
    en: 'Layered thermal clothing, waterproof windbreaker, and warm gloves',
    pt: 'Roupas térmicas em camadas, corta-vento impermeável e luvas de montanha',
    fr: 'Vêtements thermiques multicouches, coupe-vent imperméable et gants chauds',
    it: 'Abbigliamento termico a strati, giacca antivento impermeabile e guanti caldi'
  },
  'Lentes de sol con protección UV, bloqueador solar SPF 50+ y gorro para el frío': {
    es: 'Lentes de sol con protección UV, bloqueador solar SPF 50+ y gorro para el frío',
    en: 'UV protection sunglasses, SPF 50+ sunscreen, and warm fleece beanie',
    pt: 'Óculos escuros com proteção UV, protetor solar FPS 50+ e gorro térmico',
    fr: 'Lunettes de soleil avec protection UV, crème solaire SPF 50+ et bonnet polaire',
    it: 'Occhiali da sole con protezione UV, crema solare SPF 50+ e berretto termico'
  },
  'Pastillas para el mal de altura (soroche) y botella de agua reutilizable': {
    es: 'Pastillas para el mal de altura (soroche) y botella de agua reutilizable',
    en: 'Altitude sickness medication (soroche pills) and reusable water bottle',
    pt: 'Remédios para o mal de altitude (soroche) e garrafa de água reutilizável',
    fr: 'Médicaments contre le mal des montagnes (soroche) et gourde réutilisable',
    it: 'Pastiglie per il mal di montagna (soroche) e borraccia riutilizzabile'
  },
  'Cusco - Mollepata - Soraypampa & Laguna Humantay': {
    es: 'Cusco - Mollepata - Soraypampa & Laguna Humantay',
    en: 'Cusco - Mollepata - Soraypampa & Humantay Lake',
    pt: 'Cusco - Mollepata - Soraypampa & Laguna Humantay',
    fr: 'Cusco - Mollepata - Soraypampa & Lagune Humantay',
    it: 'Cusco - Mollepata - Soraypampa & Laguna Humantay'
  },
  'Recojo a las 04:30 AM en Cusco. Desayuno en Mollepata y caminata hacia Soraypampa (3,900m). Ascenso por la tarde a la deslumbrante Laguna Humantay (4,200m). Cena andina y noche mágica en domos geodésicos bajo las estrellas.': {
    es: 'Recojo a las 04:30 AM en Cusco. Desayuno en Mollepata y caminata hacia Soraypampa (3,900m). Ascenso por la tarde a la deslumbrante Laguna Humantay (4,200m). Cena andina y noche mágica en domos geodésicos bajo las estrellas.',
    en: '04:30 AM pickup in Cusco. Breakfast in Mollepata and trek to Soraypampa (3,900m). Afternoon hike to turquoise Humantay Lake (4,200m). Andean dinner and magical night under the stars in glass domes.',
    pt: 'Embarque às 04h30 em Cusco. Café da manhã em Mollepata e caminhada para Soraypampa (3.900m). Subida à deslumbrante Laguna Humantay (4.200m). Jantar andino e noite mágica em domos de cristal sob as estrelas.',
    fr: 'Départ à 04h30 de Cusco. Petit-déjeuner à Mollepata et marche vers Soraypampa (3 900 m). Ascension vers l’éblouissante lagune Humantay (4 200 m). Dîner andin et nuit magique sous les étoiles en dômes de verre.',
    it: 'Prelievo alle 04:30 a Cusco. Colazione a Mollepata e cammino verso Soraypampa (3.900m). Salita alla spettacolare Laguna Humantay (4.200m). Cena andina e notte magica sotto le stelle in cupole di vetro.'
  },
  'Soraypampa - Paso Salkantay (4,630m) - Chaullay': {
    es: 'Soraypampa - Paso Salkantay (4,630m) - Chaullay',
    en: 'Soraypampa - Salkantay Pass Summit (4,630m) - Chaullay',
    pt: 'Soraypampa - Passo Salkantay (4.630m) - Chaullay',
    fr: 'Soraypampa - Col du Salkantay (4 630m) - Chaullay',
    it: 'Soraypampa - Passo Salkantay (4.630m) - Chaullay'
  },
  'Despertar con mate de coca caliente. Ascenso desafiante al punto más alto: el Paso Salkantay (4,630m) frente al glaciar. Ceremonia de pago a la tierra y descenso hacia el bosque nublado de Chaullay.': {
    es: 'Despertar con mate de coca caliente. Ascenso desafiante al punto más alto: el Paso Salkantay (4,630m) frente al glaciar. Ceremonia de pago a la tierra y descenso hacia el bosque nublado de Chaullay.',
    en: 'Wake up with hot coca tea. Challenging ascent to the highest summit: Salkantay Pass (4,630m) facing the glacier. Traditional earth ceremony and descent to Chaullay cloud forest.',
    pt: 'Despertar com chá de coca quente. Subida desafiadora ao ponto mais alto: o Passo Salkantay (4.630m) diante da geleira. Cerimônia de pagamento à terra e descida para a floresta de Chaullay.',
    fr: 'Réveil avec thé de coca bien chaud. Ascension du point culminant : le col du Salkantay (4 630 m) face au glacier. Cérémonie d’offrande à la terre et descente vers la haute forêt de Chaullay.',
    it: 'Risveglio con tè di coca caldo. Salita impegnativa al punto più alto: il Passo Salkantay (4.630m) di fronte al ghiacciaio. Cerimonia tradizionale di offerta alla terra e discesa verso la foresta di Chaullay.'
  },
  'Chaullay - Collpapampa - La Playa & Termas de Cocalmayo': {
    es: 'Chaullay - Collpapampa - La Playa & Termas de Cocalmayo',
    en: 'Chaullay - Collpapampa - La Playa & Cocalmayo Hot Springs',
    pt: 'Chaullay - Collpapampa - La Playa & Termas de Cocalmayo',
    fr: 'Chaullay - Collpapampa - La Playa & Bains de Cocalmayo',
    it: 'Chaullay - Collpapampa - La Playa & Terme di Cocalmayo'
  },
  'Caminata suave por senderos tropicales cruzando cascadas, plantaciones de café orgánico y orquídeas. Tarde de relajación en las aguas termales naturales de Cocalmayo en Santa Teresa.': {
    es: 'Caminata suave por senderos tropicales cruzando cascadas, plantaciones de café orgánico y orquídeas. Tarde de relajación en las aguas termales naturales de Cocalmayo en Santa Teresa.',
    en: 'Gentle hike along tropical trails past waterfalls, organic coffee orchards, and wild orchids. Afternoon soaking in the natural thermal hot springs of Cocalmayo in Santa Teresa.',
    pt: 'Caminhada suave por trilhas tropicais passando por cachoeiras, cafezais orgânicos e orquídeas. Tarde relaxante nas águas termais de Cocalmayo em Santa Teresa.',
    fr: 'Marche douce sur des sentiers tropicaux parsemés de cascades, caféiers bio et orchidées. Après-midi de détente bien méritée aux sources chaudes de Cocalmayo à Santa Teresa.',
    it: 'Camminata piacevole lungo sentieri tropicali tra cascate, piantagioni di caffè biologico e orchidee. Pomeriggio di relax nelle sorgenti termali naturali di Cocalmayo a Santa Teresa.'
  },
  'Hidroeléctrica - Vías del Tren - Aguas Calientes': {
    es: 'Hidroeléctrica - Vías del Tren - Aguas Calientes',
    en: 'Hydroelectric - Train Tracks - Aguas Calientes',
    pt: 'Hidrelétrica - Trilhos do Trem - Aguas Calientes',
    fr: 'Hydroélectrique - Voie Ferrée - Aguas Calientes',
    it: 'Idroelettrica - Binari del Treno - Aguas Calientes'
  },
  'Recorrido escénico siguiendo las vías del tren rodeadas de flora subtropical y vistas de Huayna Picchu. Arribo al pueblo de Machu Picchu (Aguas Calientes), acomodación en hotel boutique y cena de coordinación.': {
    es: 'Recorrido escénico siguiendo las vías del tren rodeadas de flora subtropical y vistas de Huayna Picchu. Arribo al pueblo de Machu Picchu (Aguas Calientes), acomodación en hotel boutique y cena de coordinación.',
    en: 'Scenic walk along the subtropical railway surrounded by lush greenery and distant views of Huayna Picchu. Arrival in Aguas Calientes, boutique hotel check-in, and briefing dinner.',
    pt: 'Caminhada panorâmica pelos trilhos do trem cercados por vegetação subtropical e vista do Huayna Picchu. Chegada a Aguas Calientes, check-in no hotel boutique e jantar de briefing.',
    fr: 'Randonnée le long des rails bordés de végétation subtropicale avec vue sur le Huayna Picchu. Arrivée à Aguas Calientes, installation à l’hôtel de charme et dîner de briefing.',
    it: 'Passeggiata panoramica lungo i binari del treno immersi nella flora subtropicale con vista su Huayna Picchu. Arrivo ad Aguas Calientes, sistemazione in boutique hotel e cena informativa.'
  },
  'Ciudadela Inca de Machu Picchu & Tren a Cusco': {
    es: 'Ciudadela Inca de Machu Picchu & Tren a Cusco',
    en: 'Machu Picchu Inca Citadel & Train to Cusco',
    pt: 'Cidadela Inca de Machu Picchu & Trem para Cusco',
    fr: 'Citadelle Inca du Machu Picchu & Train pour Cusco',
    it: 'Cittadella Inca di Machu Picchu & Treno per Cusco'
  },
  'Ascenso en bus matutino a Machu Picchu. Recorrido guiado de 2.5 horas por los templos, recintos sagrados y mirador clásico. Por la tarde, tren escénico Expedition/Vistadome hacia Ollantaytambo y transfer privado a Cusco.': {
    es: 'Ascenso en bus matutino a Machu Picchu. Recorrido guiado de 2.5 horas por los templos, recintos sagrados y mirador clásico. Por la tarde, tren escénico Expedition/Vistadome hacia Ollantaytambo y transfer privado a Cusco.',
    en: 'Early morning bus up to Machu Picchu. 2.5-hour guided exploration of sacred temples, royal sectors, and classic viewpoint. Afternoon scenic Expedition/Vistadome train to Ollantaytambo and private transfer back to Cusco.',
    pt: 'Subida em ônibus matinal até Machu Picchu. Visita guiada de 2h30 pelos templos, recintos sagrados e mirante clássico. À tarde, trem panorâmico para Ollantaytambo e traslado privativo a Cusco.',
    fr: 'Montée en bus matinal vers le Machu Picchu. Visite guidée de 2h30 des temples, secteurs sacrés et belvédère classique. Train panoramique Expedition/Vistadome l’après-midi vers Ollantaytambo et transfert privé à Cusco.',
    it: 'Salita mattutina in bus verso Machu Picchu. Tour guidato di 2,5 ore tra templi, recinti sacri e punto panoramico classico. Nel pomeriggio treno panoramico per Ollantaytambo e transfer privato a Cusco.'
  },
  '¿Cuál es el día más exigente de la caminata?': {
    es: '¿Cuál es el día más exigente de la caminata?',
    en: 'What is the most challenging day of the trek?',
    pt: 'Qual é o dia mais exigente da caminhada?',
    fr: 'Quel est le jour le plus exigeant de la randonnée ?',
    it: 'Qual è il giorno più impegnativo del trekking?'
  },
  'El Día 2 es el más demandante físicamente: se asciende desde Soraypampa (3,900 m) hasta el paso Salkantay (4,630 m) durante 4 horas y luego se desciende hacia Chaullay (2,900 m). Nuestro guía mantiene un ritmo constante y monitorea la oxigenación de cada viajero.': {
    es: 'El Día 2 es el más demandante físicamente: se asciende desde Soraypampa (3,900 m) hasta el paso Salkantay (4,630 m) durante 4 horas y luego se desciende hacia Chaullay (2,900 m). Nuestro guía mantiene un ritmo constante y monitorea la oxigenación de cada viajero.',
    en: 'Day 2 is the most physically demanding: you climb from Soraypampa (3,900m) to Salkantay Pass (4,630m) over 4 hours, then descend into Chaullay (2,900m). Our guide keeps a steady pace and monitors oxygen levels continuously.',
    pt: 'O Dia 2 é o mais exigente fisicamente: sobe-se de Soraypampa (3.900 m) ao passo Salkantay (4.630 m) durante 4 horas e depois desce-se até Chaullay (2.900 m). Nosso guia mantém ritmo seguro e monitora a oxigenação.',
    fr: 'Le jour 2 est le plus intense physiquement : montée de Soraypampa (3 900 m) au col du Salkantay (4 630 m) pendant 4 heures puis descente vers Chaullay (2 900 m). Notre guide régule le rythme et contrôle l’oxygénation de chacun.',
    it: 'Il Giorno 2 è il più impegnativo fisicamente: si sale da Soraypampa (3.900 m) al passo Salkantay (4.630 m) in circa 4 ore e poi si scende fino a Chaullay (2.900 m). La nostra guida mantiene un passo costante e controlla l’ossigenazione.'
  },
  '¿Se necesita aclimatación previa en Cusco?': {
    es: '¿Se necesita aclimatación previa en Cusco?',
    en: 'Is prior acclimatization in Cusco required?',
    pt: 'É necessária aclimatação prévia em Cusco?',
    fr: 'Faut-il une acclimatation préalable à Cusco ?',
    it: 'È necessaria una previa acclimatazione a Cusco?'
  },
  'Sí, recomendamos estar en Cusco al menos 2 días antes de iniciar el trek para adaptarse a la altitud y disfrutar la caminata con total confort y seguridad.': {
    es: 'Sí, recomendamos estar en Cusco al menos 2 días antes de iniciar el trek para adaptarse a la altitud y disfrutar la caminata con total confort y seguridad.',
    en: 'Yes, we strongly recommend arriving in Cusco at least 2 full days before the trek to adjust to the elevation and enjoy the route safely and comfortably.',
    pt: 'Sim, recomendamos ficar em Cusco pelo menos 2 dias antes da trilha para se adaptar à altitude e curtir o passeio com segurança e conforto.',
    fr: 'Oui, nous recommandons de séjourner à Cusco au moins 2 jours avant le départ pour s’habituer à l’altitude et vivre le trek en toute sérénité.',
    it: 'Sì, raccomandiamo di trascorrere a Cusco almeno 2 giorni prima del trekking per adattarsi all’altitudine e godersi il cammino in totale sicurezza e comfort.'
  },
  '¿Qué peso puedo llevar en los caballos?': {
    es: '¿Qué peso puedo llevar en los caballos?',
    en: 'How much luggage weight can I send on the horses?',
    pt: 'Quanto peso posso enviar nos cavalos?',
    fr: 'Quel poids peut-on confier aux chevaux ?',
    it: 'Quanto peso posso caricare sui cavalli?'
  },
  'Te entregamos una bolsa de lona (duffle bag) donde puedes guardar hasta 7 kg de ropa y pertenencias que serán llevadas por los caballos durante los primeros 3 días.': {
    es: 'Te entregamos una bolsa de lona (duffle bag) donde puedes guardar hasta 7 kg de ropa y pertenencias que serán llevadas por los caballos durante los primeros 3 días.',
    en: 'We provide a heavy-duty duffle bag where you can pack up to 7 kg of clothing and personal gear, carried by packhorses over the first 3 days.',
    pt: 'Fornecemos uma bolsa de lona onde você pode colocar até 7 kg de roupas e itens pessoais que serão levados pelos cavalos durante os primeiros 3 dias.',
    fr: 'Nous vous remettons un sac polochon étanche où vous pouvez mettre jusqu’à 7 kg de vêtements et d’effets personnels qui seront portés par les chevaux pendant les 3 premiers jours.',
    it: 'Ti forniamo un borsone da viaggio (duffle bag) in cui puoi inserire fino a 7 kg di vestiti ed effetti personali che saranno trasportati dai cavalli per i primi 3 giorni.'
  },
  '¿Cómo son los domos geodésicos en Soraypampa?': {
    es: '¿Cómo son los domos geodésicos en Soraypampa?',
    en: 'What are the geodesic domes in Soraypampa like?',
    pt: 'Como são os domos geodésicos em Soraypampa?',
    fr: 'Comment sont équipés les dômes géodésiques à Soraypampa ?',
    it: 'Come sono i domi geodetici a Soraypampa?'
  },
  'Son domos térmicos privados con techos de cristal templado transparente, camas confortables, sábanas abrigadoras y vista directa a las estrellas y a los glaciares.': {
    es: 'Son domos térmicos privados con techos de cristal templado transparente, camas confortables, sábanas abrigadoras y vista directa a las estrellas y a los glaciares.',
    en: 'They are heated private domes with transparent glass ceilings, comfortable beds, plush down duvets, and direct views of the Milky Way and glaciers.',
    pt: 'São domos térmicos privativos com teto de vidro temperado transparente, camas aconchegantes, edredons de pluma e vista direta para as estrelas e geleiras.',
    fr: 'Ce sont des dômes chauffés privatifs équipés d’un toit en verre trempé transparent, de lits douillets avec couettes en duvet et d’une vue plongeante sur les glaciers et la Voie Lactée.',
    it: 'Sono cupole termiche private con tetto in vetro temperato trasparente, letti comodi, caldi piumoni e vista diretta sulle stelle e sui ghiacciai.'
  },
  '¡La mejor experiencia de nuestras vidas! La noche en los domos mirando las estrellas frente al nevado Salkantay no tiene precio. Marco fue un guía excepcional.': {
    es: '¡La mejor experiencia de nuestras vidas! La noche en los domos mirando las estrellas frente al nevado Salkantay no tiene precio. Marco fue un guía excepcional.',
    en: 'The best experience of our lives! The night in the domes watching the stars in front of Mount Salkantay is priceless. Marco was an exceptional guide.',
    pt: 'A melhor experiência das nossas vidas! A noite nos domos vendo as estrelas em frente ao nevado Salkantay não tem preço. O Marco foi um guia excepcional.',
    fr: 'La plus belle expérience de nos vies ! La nuit sous les dômes à admirer les étoiles face au mont Salkantay n’a pas de prix. Marco a été un guide exceptionnel.',
    it: 'La miglior esperienza della nostra vita! La notte nelle cupole a guardare le stelle davanti al ghiacciaio Salkantay non ha prezzo. Marco è stato una guida eccezionale.'
  },
  'Excelente organización, puntualidad y seguridad en todo momento. Los bastones y el equipamiento fueron de primera.': {
    es: 'Excelente organización, puntualidad y seguridad en todo momento. Los bastones y el equipamiento fueron de primera.',
    en: 'Outstanding organization, punctuality, and safety at all times. Trekking poles and all gear were top notch.',
    pt: 'Excelente organização, pontualidade e segurança o tempo todo. Os bastões e equipamentos foram de primeira linha.',
    fr: 'Organisation exemplaire, ponctualité et sécurité sans faille. Les bâtons et tout l’équipement étaient de très haute qualité.',
    it: 'Organizzazione eccellente, puntualità e massima sicurezza in ogni momento. I bastoncini e tutta l’attrezzatura erano di altissimo livello.'
  },
  'Licencia DIRCETUR Oficial N° 2026-CUS': {
    es: 'Licencia DIRCETUR Oficial N° 2026-CUS',
    en: 'Official DIRCETUR License No. 2026-CUS',
    pt: 'Licença DIRCETUR Oficial Nº 2026-CUS',
    fr: 'Licence Officielle DIRCETUR N° 2026-CUS',
    it: 'Licenza Ufficiale DIRCETUR N° 2026-CUS'
  },
  'Guías Colegiados de Alta Montaña': {
    es: 'Guías Colegiados de Alta Montaña',
    en: 'Certified Mountain Guides',
    pt: 'Guias Credenciados de Alta Montanha',
    fr: 'Guides Diplômés de Haute Montagne',
    it: 'Guide Abilitate di Alta Montagna'
  },
  'Balón de Oxígeno & Monitoreo 24/7': {
    es: 'Balón de Oxígeno & Monitoreo 24/7',
    en: 'Oxygen Cylinder & 24/7 Saturation Check',
    pt: 'Cilindro de Oxigênio & Monitoramento 24/7',
    fr: 'Bouteille d’Oxygène & Contrôle 24/7',
    it: 'Bombola d’Ossigeno & Controllo 24/7'
  },
  'Domos de Cristal Certificados': {
    es: 'Domos de Cristal Certificados',
    en: 'Certified Glass Sky Domes',
    pt: 'Domos de Cristal Certificados',
    fr: 'Dômes Panoramiques Certifiés',
    it: 'Cupole Panoramiche Certificate'
  },
  'Sello Safe Travels Internacional': {
    es: 'Sello Safe Travels Internacional',
    en: 'Safe Travels International Seal',
    pt: 'Selo Safe Travels Internacional',
    fr: 'Label Safe Travels International',
    it: 'Sigillo Safe Travels Internazionale'
  },
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
  'Vive una aventura inolvidable con guías expertos locales y atención de primer nivel.': {
    es: 'Vive una aventura inolvidable con guías expertos locales y atención de primer nivel.',
    en: 'Experience an unforgettable Andean adventure with certified local guides and premier 5-star service.',
    pt: 'Viva uma aventura inesquecível com guias locais certificados e atendimento de primeiro nível.',
    fr: 'Vivez une aventure inoubliable avec des guides locaux experts et un service d’excellence.',
    it: 'Vivi un’avventura indimenticabile con guide locali esperte e assistenza di primo livello.'
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
  'Cusco, Perú': {
    es: 'Cusco, Perú',
    en: 'Cusco, Peru',
    pt: 'Cusco, Peru',
    fr: 'Cusco, Pérou',
    it: 'Cusco, Perù'
  },
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
  'La mejor experiencia que hemos vivido en Perú. La atención personalizada de Carlos y el cuidado con el oxígeno en la montaña nos permitieron disfrutar de Machu Picchu sin ninguna preocupación.': {
    es: 'La mejor experiencia que hemos vivido en Perú. La atención personalizada de Carlos y el cuidado con el oxígeno en la montaña nos permitieron disfrutar de Machu Picchu sin ninguna preocupación.',
    en: 'The greatest travel experience we have ever had in Peru. Carlos’s personal care and constant oxygen safety in the mountains let us fully enjoy Machu Picchu with peace of mind.',
    pt: 'A melhor experiência que já vivemos no Peru. A atenção personalizada de Carlos e o cuidado com o oxigênio na montanha nos permitiram desfrutar de Machu Picchu com total tranquilidade.',
    fr: 'La plus belle expérience vécue au Pérou. L’attention personnalisée de Carlos et la surveillance à l’oxygène en montagne nous ont permis de vivre Machu Picchu en toute sérénité.',
    it: 'La migliore esperienza vissuta in Perù. Le attenzioni di Carlos e la cura con l’ossigeno in montagna ci hanno permesso di vivere Machu Picchu senza pensieri.'
  },
  '4 Días / 3 Noches': {
    es: '4 Días / 3 Noches',
    en: '4 Days / 3 Nights',
    pt: '4 Dias / 3 Noites',
    fr: '4 Jours / 3 Nuits',
    it: '4 Giorni / 3 Notti'
  },
  'Moderada': {
    es: 'Moderada',
    en: 'Moderate',
    pt: 'Moderada',
    fr: 'Modérée',
    it: 'Moderata'
  },
  'Licenciado DIRCETUR & Explorador Senior': {
    es: 'Licenciado DIRCETUR & Explorador Senior',
    en: 'Licensed DIRCETUR & Senior Explorer',
    pt: 'Credenciado DIRCETUR & Explorador Sênior',
    fr: 'Diplômé DIRCETUR & Explorateur Senior',
    it: 'Abilitato DIRCETUR & Esploratore Senior'
  },
  'Consultar con': {
    es: 'Consultar con',
    en: 'Chat with',
    pt: 'Falar com',
    fr: 'Contacter',
    it: 'Contatta'
  },
  'Transporte turístico privado 4x4 climatizado': {
    es: 'Transporte turístico privado 4x4 climatizado',
    en: 'Private air-conditioned 4x4 tourist transport',
    pt: 'Transporte turístico privativo 4x4 com ar-condicionado',
    fr: 'Transport touristique privé 4x4 climatisé',
    it: 'Trasporto turistico privato 4x4 climatizzato'
  },
  'Boletos preferenciales de tren y accesos oficiales': {
    es: 'Boletos preferenciales de tren y accesos oficiales',
    en: 'Priority train tickets and official sanctuary entry passes',
    pt: 'Bilhetes de trem prioritários e acessos oficiais',
    fr: 'Billets de train prioritaires et entrées officielles',
    it: 'Biglietti ferroviari prioritari e ingressi ufficiali'
  },
  'Guía oficial bilingüe DIRCETUR en todas las rutas': {
    es: 'Guía oficial bilingüe DIRCETUR en todas las rutas',
    en: 'Bilingual certified DIRCETUR guide on all trails',
    pt: 'Guia oficial credenciado bilíngue DIRCETUR em todas as rotas',
    fr: 'Guide officiel bilingue DIRCETUR sur tous les itinéraires',
    it: 'Guida ufficiale bilingue DIRCETUR su tutti i percorsi'
  },
  'Monitoreo médico 24/7 con balón de oxígeno a bordo': {
    es: 'Monitoreo médico 24/7 con balón de oxígeno a bordo',
    en: '24/7 medical monitoring with onboard oxygen tank',
    pt: 'Monitoramento médico 24/7 com oxigênio a bordo',
    fr: 'Surveillance médicale 24/7 avec oxygène à bord',
    it: 'Monitoraggio medico 24/7 con ossigeno a bordo'
  },
  'Alimentación gourmet andina y degustaciones de café': {
    es: 'Alimentación gourmet andina y degustaciones de café',
    en: 'Gourmet Andean dining and organic coffee tastings',
    pt: 'Alimentação gourmet andina e degustação de café',
    fr: 'Restauration gastronomique andine et dégustations de café',
    it: 'Cucina gourmet andina e degustazioni di caffè'
  },
  'Ropa térmica en capas y cortavientos': {
    es: 'Ropa térmica en capas y cortavientos',
    en: 'Layered thermal clothing and windbreaker',
    pt: 'Roupas térmicas em camadas e corta-vento',
    fr: 'Vêtements thermiques en couches et coupe-vent',
    it: 'Abbigliamento termico a strati e giacca a vento'
  },
  'Calzado de trekking con tracción impermeable': {
    es: 'Calzado de trekking con tracción impermeable',
    en: 'Waterproof trekking shoes with high-traction grip',
    pt: 'Calçado de trilha com tração impermeável',
    fr: 'Chaussures de trek imperméables à bonne adhérence',
    it: 'Scarpe da trekking con aderenza impermeabile'
  },
  'Lentes con protección UV400 y bloqueador solar': {
    es: 'Lentes con protección UV400 y bloqueador solar',
    en: 'UV400 sunglasses and high SPF sunscreen',
    pt: 'Óculos com proteção UV400 e protetor solar',
    fr: 'Lunettes de soleil UV400 et crème solaire',
    it: 'Occhiali con protezione UV400 e crema solare'
  },
  'Propinas voluntarias para guías y arrieros': {
    es: 'Propinas voluntarias para guías y arrieros',
    en: 'Voluntary tips for guides and horsemen',
    pt: 'Gorjetas voluntárias para guias e tropeiros',
    fr: 'Pourboires volontaires pour guides et muletiers',
    it: 'Mance facoltative per guide e mulattieri'
  },
  'Seguro médico personal de viaje de alta montaña': {
    es: 'Seguro médico personal de viaje de alta montaña',
    en: 'High-altitude personal travel medical insurance',
    pt: 'Seguro viagem médico pessoal de alta montanha',
    fr: 'Assurance voyage médicale personnelle de haute montagne',
    it: 'Assicurazione medica personale di viaggio per alta quota'
  },
  'Personal international travel medical insurance de alta montaña': {
    es: 'Seguro médico personal de viaje de alta montaña',
    en: 'High-altitude personal international travel medical insurance',
    pt: 'Seguro viagem médico internacional de alta montanha',
    fr: 'Assurance voyage médicale internationale de haute montagne',
    it: 'Assicurazione medica internazionale di viaggio per alta quota'
  },
  'Valle Sagrado & Aclimatación Escénica': {
    es: 'Valle Sagrado & Aclimatación Escénica',
    en: 'Sacred Valley & Scenic Acclimatization',
    pt: 'Vale Sagrado & Aclimatação Cênica',
    fr: 'Vallée Sacrée & Acclimatation Panoramique',
    it: 'Valle Sacra & Acclimatazione Panoramica'
  },
  'Recorrido por miradores andinos con almuerzo campestre orgánico y pernocte en domos.': {
    es: 'Recorrido por miradores andinos con almuerzo campestre orgánico y pernocte en domos.',
    en: 'Tour of Andean viewpoints with organic country lunch and dome overnight.',
    pt: 'Passeio pelos mirantes andinos com almoço campestre orgânico e pernoite em domos.',
    fr: 'Circuit des belvédères andins avec déjeuner champêtre bio et nuitée sous dômes.',
    it: 'Tour dei belvedere andini con pranzo campestre biologico e pernottamento in domi.'
  },
  'Ascenso al Abra Escénica & Fotografía': {
    es: 'Ascenso al Abra Escénica & Fotografía',
    en: 'Ascent to the Scenic Mountain Pass & Photography',
    pt: 'Subida ao Passo Cênico & Fotografia',
    fr: 'Montée au Col Panoramique & Photographie',
    it: 'Salita al Valico Panoramico & Fotografia'
  },
  'Caminata a ritmo personalizado guiada por expertos con postales panorámicas del nevado sagrado.': {
    es: 'Caminata a ritmo personalizado guiada por expertos con postales panorámicas del nevado sagrado.',
    en: 'Custom-paced trek guided by mountain experts with scenic postcards of the sacred glacier.',
    pt: 'Caminhada com ritmo personalizado guiada por especialistas com vistas do pico sagrado.',
    fr: 'Randonnée à rythme personnalisé guidée par des experts avec vues splendides sur le mont sacré.',
    it: 'Camminata a ritmo personalizzato guidata da esperti con cartoline panoramiche della vetta sacra.'
  },
  'Amanecer en Machu Picchu Santuario': {
    es: 'Amanecer en Machu Picchu Santuario',
    en: 'Sunrise at Machu Picchu Sanctuary',
    pt: 'Amanhecer no Santuário de Machu Picchu',
    fr: 'Lever de soleil au Sanctuaire du Machu Picchu',
    it: 'Alba al Santuario di Machu Picchu'
  },
  'Acceso preferente con historiador oficial y tiempo para capturar postales sin multitudes.': {
    es: 'Acceso preferente con historiador oficial y tiempo para capturar postales sin multitudes.',
    en: 'Preferred access with certified historian and time to capture crowd-free postcards.',
    pt: 'Acesso preferencial com historiador oficial e tempo para fotos sem multidões.',
    fr: 'Accès prioritaire avec historien officiel et temps pour photos sans la foule.',
    it: 'Accesso prioritario con storico ufficiale e tempo per foto senza folla.'
  },
  'Superó todas nuestras expectativas. La atención del guía y las medidas de seguridad fueron impecables de principio a fin.': {
    es: 'Superó todas nuestras expectativas. La atención del guía y las medidas de seguridad fueron impecables de principio a fin.',
    en: 'It exceeded all our expectations. The guide’s dedication and safety protocols were flawless from start to finish.',
    pt: 'Superou todas as nossas expectativas. A atenção do guia e os protocolos de segurança foram impecáveis do início ao fim.',
    fr: 'Au-delà de toutes nos espérances. L’attention du guide et la sécurité étaient irréprochables du début à la fin.',
    it: 'Ha superato tutte le nostre aspettative. L’attenzione della guida e le misure di sicurezza sono state impeccabili dall’inizio alla fine.'
  },
  'Incredible experience! The landscapes were breathtaking, gear was top-notch and the team was exceptionally caring and punctual.': {
    es: '¡Una experiencia increíble! Los paisajes fueron deslumbrantes, el equipo de primera categoría y el personal excepcionalmente atento y puntual.',
    en: 'Incredible experience! The landscapes were breathtaking, gear was top-notch and the team was exceptionally caring and punctual.',
    pt: 'Experiência incrível! As paisagens eram deslumbrantes, os equipamentos de primeira linha e a equipe muito pontual e atenciosa.',
    fr: 'Expérience incroyable ! Des paysages à couper le souffle, du matériel haut de gamme et une équipe attentionnée et ponctuelle.',
    it: 'Esperienza incredibile! Paesaggi mozzafiato, attrezzatura di prima qualità e team eccezionalmente premuroso e puntuale.'
  },
  'Une organisation sans faille et des paysages grandioses. Excellente assistance avec l’oxygène en altitude. Inoubliable !': {
    es: 'Una organización impecable y paisajes grandiosos. Excelente asistencia con el oxígeno en altura. ¡Inolvidable!',
    en: 'Flawless organization and magnificent landscapes. Excellent altitude oxygen assistance. Unforgettable!',
    pt: 'Uma organização impecável e paisagens grandiosas. Excelente assistência com oxigênio na altitude. Inesquecível!',
    fr: 'Une organisation sans faille et des paysages grandioses. Excellente assistance avec l’oxygène en altitude. Inoubliable !',
    it: 'Un’organizzazione impeccabile e paesaggi grandiosi. Eccellente assistenza con l’ossigeno in quota. Indimenticabile!'
  },
  'Lima, Perú': {
    es: 'Lima, Perú',
    en: 'Lima, Peru',
    pt: 'Lima, Peru',
    fr: 'Lima, Pérou',
    it: 'Lima, Perù'
  },
  'Austin, Texas (USA)': {
    es: 'Austin, Texas (EE.UU.)',
    en: 'Austin, Texas (USA)',
    pt: 'Austin, Texas (EUA)',
    fr: 'Austin, Texas (États-Unis)',
    it: 'Austin, Texas (USA)'
  },
  'Lyon, Francia': {
    es: 'Lyon, Francia',
    en: 'Lyon, France',
    pt: 'Lyon, França',
    fr: 'Lyon, France',
    it: 'Lione, Francia'
  },
  'Montaña 7 Colores Vinicunca': {
    es: 'Montaña 7 Colores Vinicunca',
    en: 'Rainbow Mountain Vinicunca',
    pt: 'Montanha 7 Cores Vinicunca',
    fr: 'Montagne aux 7 Couleurs Vinicunca',
    it: 'Montagna 7 Colori Vinicunca'
  },
  'Valle Sagrado & Ollantaytambo': {
    es: 'Valle Sagrado & Ollantaytambo',
    en: 'Sacred Valley & Ollantaytambo',
    pt: 'Vale Sagrado & Ollantaytambo',
    fr: 'Vallée Sacrée & Ollantaytambo',
    it: 'Valle Sacra & Ollantaytambo'
  },
  'Expedición Paso a Paso': {
    es: 'Expedición Paso a Paso',
    en: 'Step-by-Step Expedition',
    pt: 'Expedição Passo a Passo',
    fr: 'Expédition Étape par Étape',
    it: 'Spedizione Passo dopo Passo'
  },
  'Planifica Tu Expedición a Cusco': {
    es: 'Planifica Tu Expedición a Cusco',
    en: 'Plan Your Cusco Expedition',
    pt: 'Planeje Sua Expedição a Cusco',
    fr: 'Planifiez Votre Expédition à Cusco',
    it: 'Pianifica La Tua Spedizione a Cusco'
  },
  'Planifica Tu Viaje a Cusco': {
    es: 'Planifica Tu Viaje a Cusco',
    en: 'Plan Your Trip to Cusco',
    pt: 'Planeje Sua Viagem a Cusco',
    fr: 'Planifiez Votre Voyage à Cusco',
    it: 'Pianifica Il Tuo Viaggio a Cusco'
  },
  'Planifica Tu Viaje': {
    es: 'Planifica Tu Viaje',
    en: 'Plan Your Journey',
    pt: 'Planeje Sua Viagem',
    fr: 'Planifiez Votre Voyage',
    it: 'Pianifica Il Tuo Viaggio'
  },
  '01 • Ruta Ideal': {
    es: '01 • Ruta Ideal',
    en: '01 • Ideal Route',
    pt: '01 • Rota Ideal',
    fr: '01 • Circuit Idéal',
    it: '01 • Percorso Ideale'
  },
  'Elección del Circuito & Época': {
    es: 'Elección del Circuito & Época',
    en: 'Circuit Selection & Season',
    pt: 'Escolha do Circuito & Época',
    fr: 'Choix du Circuit & Période',
    it: 'Scelta del Circuito & Stagione'
  },
  'Te asesoramos entre rutas clásicas o trekking de altura según el clima andino y tu ritmo de viaje.': {
    es: 'Te asesoramos entre rutas clásicas o trekking de altura según el clima andino y tu ritmo de viaje.',
    en: 'We guide you between classic circuits and high-altitude trekking based on Andean weather and your personal pace.',
    pt: 'Orientamos você entre rotas clássicas ou trekking de altitude de acordo com o clima andino e seu ritmo.',
    fr: 'Nous vous conseillons entre circuits classiques ou trekking d’altitude selon le climat andin et votre rythme.',
    it: 'Ti guidiamo tra percorsi classici o trekking d’alta quota in base al clima andino e al tuo ritmo di viaggio.'
  },
  'Asesoría Experta': {
    es: 'Asesoría Experta',
    en: 'Expert Advice',
    pt: 'Assessoria Especializada',
    fr: 'Conseil Expert',
    it: 'Consulenza Esperta'
  },
  '02 • Accesos Oficiales': {
    es: '02 • Accesos Oficiales',
    en: '02 • Official Permits',
    pt: '02 • Acessos Oficiais',
    fr: '02 • Accès Officiels',
    it: '02 • Accessi Ufficiali'
  },
  'Entradas & Tren Garantizados': {
    es: 'Entradas & Tren Garantizados',
    en: 'Guaranteed Tickets & Train',
    pt: 'Ingressos & Trem Garantidos',
    fr: 'Billets & Train Garantis',
    it: 'Biglietti & Treno Garantiti'
  },
  'Reservamos con antelación tus boletos oficiales a la ciudadela y asientos en tren panorámico sin filas ni incertidumbre.': {
    es: 'Reservamos con antelación tus boletos oficiales a la ciudadela y asientos en tren panorámico sin filas ni incertidumbre.',
    en: 'We secure your official Machu Picchu citadel tickets and scenic train seats in advance with zero queues or uncertainty.',
    pt: 'Garantimos com antecedência seus ingressos oficiais para a cidadela e assentos em trem panorâmico sem filas ou incertezas.',
    fr: 'Nous réservons à l’avance vos billets officiels pour la citadelle et vos places en train panoramique, sans file d’attente ni incertitude.',
    it: 'Prenotiamo in anticipo i tuoi biglietti ufficiali per la cittadella e i posti in treno panoramico senza code né incertezze.'
  },
  '100% Reserva Anticipada': {
    es: '100% Reserva Anticipada',
    en: '100% Advance Booking',
    pt: '100% Reserva Antecipada',
    fr: '100% Réservation Anticipée',
    it: '100% Prenotazione Anticipata'
  },
  '03 • Salud & Altitud': {
    es: '03 • Salud & Altitud',
    en: '03 • Health & Altitude',
    pt: '03 • Saúde & Altitude',
    fr: '03 • Santé & Altitude',
    it: '03 • Salute & Quota'
  },
  'Aclimatación y Soporte 24/7': {
    es: 'Aclimatación y Soporte 24/7',
    en: 'Acclimatization & 24/7 Support',
    pt: 'Aclimatação & Suporte 24/7',
    fr: 'Acclimatation & Support 24/7',
    it: 'Acclimatazione & Supporto 24/7'
  },
  'Monitoreo con oxímetro digital, oxígeno medicinal portátil en cada ruta y aclimatación gradual en el Valle Sagrado.': {
    es: 'Monitoreo con oxímetro digital, oxígeno medicinal portátil en cada ruta y aclimatación gradual en el Valle Sagrado.',
    en: 'Pulse oximeter checkups, portable medical oxygen on every trail, and gradual acclimatization through the Sacred Valley.',
    pt: 'Monitoramento com oxímetro digital, oxigênio medicinal portátil em todas as rotas e aclimatação gradual no Vale Sagrado.',
    fr: 'Surveillance par oxymètre numérique, oxygène médical portable sur chaque sentier et acclimatation progressive dans la Vallée Sacrée.',
    it: 'Monitoraggio con pulsossimetro, ossigeno medico portatile su ogni percorso e acclimatazione graduale nella Valle Sacra.'
  },
  'Protocolo Médico Incluido': {
    es: 'Protocolo Médico Incluido',
    en: 'Medical Protocol Included',
    pt: 'Protocolo Médico Incluso',
    fr: 'Protocole Médical Inclus',
    it: 'Protocollo Medico Incluso'
  },
  '04 • Salida VIP': {
    es: '04 • Salida VIP',
    en: '04 • VIP Departure',
    pt: '04 • Saída VIP',
    fr: '04 • Départ VIP',
    it: '04 • Partenza VIP'
  },
  'Logística Integral de Expedición': {
    es: 'Logística Integral de Expedición',
    en: 'Comprehensive Expedition Logistics',
    pt: 'Logística Integral de Expedição',
    fr: 'Logistique Complète d’Expédition',
    it: 'Logistica Completa di Spedizione'
  },
  'Transporte privado 4x4 puerta a puerta, guías bilingües colegiados DIRCETUR y gastronomía andina gourmet.': {
    es: 'Transporte privado 4x4 puerta a puerta, guías bilingües colegiados DIRCETUR y gastronomía andina gourmet.',
    en: 'Door-to-door private 4x4 transfers, licensed DIRCETUR bilingual guides, and gourmet Andean trail dining.',
    pt: 'Transporte privativo 4x4 porta a porta, guias bilíngues certificados pela DIRCETUR e gastronomia andina gourmet.',
    fr: 'Transferts privés 4x4 porte-à-porte, guides bilingues certifiés DIRCETUR et gastronomie andine de montagne.',
    it: 'Trasferimenti privati 4x4 porta a porta, guide bilingui abilitate DIRCETUR e cucina gourmet andina.'
  },
  'Todo Incluido de Principio a Fin': {
    es: 'Todo Incluido de Principio a Fin',
    en: 'All-Inclusive From Start to Finish',
    pt: 'Tudo Incluso do Início ao Fim',
    fr: 'Tout Inclus du Début à la Fin',
    it: 'Tutto Incluso dall’Inizio alla Fine'
  },
  'Planificar Mi Expedición a Medida': {
    es: 'Planificar Mi Expedición a Medida',
    en: 'Plan My Tailored Expedition',
    pt: 'Planejar Minha Expedição Sob Medida',
    fr: 'Planifier Mon Expédition Sur Mesure',
    it: 'Pianifica La Mia Spedizione Su Misura'
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

  // Para el idioma base español, respetar 100% las ediciones personalizadas del usuario sin sobreescrituras heurísticas
  if ((targetLang as string) === 'es') {
    return trimmed;
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

  // Coincidencia exacta del subtítulo por defecto de Machu Picchu de Lujo (para no secuestrar ediciones personalizadas del usuario)
  const isDefaultLuxurySubtitle = 
    lowerTrimmed === 'descubre la maravilla del mundo con traslados privados, hoteles 5 estrellas y un guía oficial exclusivo para ti y tu familia.' ||
    lowerTrimmed === 'descubre la maravilla del mundo con traslados privados, hoteles 5 estrellas y un guía oficial exclusivo para ti y tu familia' ||
    lowerTrimmed === 'discover the wonder of the world with private luxury transfers, 5-star comfort and an official certified historian guide dedicated exclusively to you and your family.' ||
    lowerTrimmed === 'descubra a maravilha do mundo com traslados privados, conforto 5 estrelas e um guia oficial exclusivo para você e sua família.' ||
    lowerTrimmed === 'découvrez la merveille du monde avec transferts privés, confort 5 étoiles et un guide officiel exclusif pour vous et votre famille.' ||
    lowerTrimmed === 'scopri la meraviglia del mondo con trasferimenti privati, comfort a 5 stelle e una guida ufficiale esclusiva per te e la tua famiglia.';

  if (isDefaultLuxurySubtitle) {
    if (targetLang === 'es') return 'Descubre la maravilla del mundo con traslados privados, hoteles 5 estrellas y un guía oficial exclusivo para ti y tu familia.';
    if (targetLang === 'en') return 'Discover the wonder of the world with private luxury transfers, 5-star comfort and an official certified historian guide dedicated exclusively to you and your family.';
    if (targetLang === 'pt') return 'Descubra a maravilha do mundo com traslados privados, conforto 5 estrelas e um guia oficial exclusivo para você e sua família.';
    if (targetLang === 'fr') return 'Découvrez la merveille du monde avec transferts privés, confort 5 étoiles et un guide officiel exclusif pour vous et votre famille.';
    if (targetLang === 'it') return 'Scopri la meraviglia del mondo con trasferimenti privati, comfort a 5 stelle e una guida ufficiale esclusiva per te e la tua famiglia.';
  }

  // Heurística para el subtítulo de Cusco Luxury Collection VIP (Mercedes Benz & tren con coche observatorio)
  const isDefaultMercedesSubtitle =
    lowerTrimmed.includes('mercedes benz') && (lowerTrimmed.includes('observatorio') || lowerTrimmed.includes('historiador') || lowerTrimmed.includes('colegiado') || lowerTrimmed.includes('credenciado'));

  if (isDefaultMercedesSubtitle) {
    if (targetLang === 'es') return 'Descubre la maravilla del mundo con traslados en Mercedes Benz, tren con coche observatorio de lujo y un guía historiador colegiado exclusivo para ti.';
    if (targetLang === 'en') return 'Discover the wonder of the world with Mercedes Benz transfers, a luxury observatory train car, and an exclusive certified historian guide dedicated to you.';
    if (targetLang === 'pt') return 'Descubra a maravilha do mundo com traslados em Mercedes Benz, trem com vagão observatório de luxo e um guia historiador credenciado exclusivo para você.';
    if (targetLang === 'fr') return 'Découvrez la merveille du monde avec transferts en Mercedes Benz, train avec voiture panoramique de luxe et un guide historien agréé exclusif pour vous.';
    if (targetLang === 'it') return 'Scopri la meraviglia del mondo con trasferimenti in Mercedes Benz, treno con carrozza panoramica di lusso e una guida storica abilitata esclusiva per te.';
  }

  // Heurística para el subtítulo del City Tour Cusco Patrimonial (Sacsayhuamán & arquitectura megalítica)
  const isDefaultCulturalSubtitle =
    lowerTrimmed.includes('sacsayhuam') || (lowerTrimmed.includes('arquitectura') && (lowerTrimmed.includes('megalítica') || lowerTrimmed.includes('megalitica') || lowerTrimmed.includes('megalithic')));

  if (isDefaultCulturalSubtitle) {
    if (targetLang === 'es') return 'Descubre los enigmas de la arquitectura megalítica inca en Sacsayhuamán, Q’enqo, Puka Pukara y Tambomachay junto a una arqueóloga experta.';
    if (targetLang === 'en') return 'Discover the enigmas of megalithic Inca architecture at Sacsayhuamán, Q’enqo, Puka Pukara, and Tambomachay alongside an expert archaeologist.';
    if (targetLang === 'pt') return 'Descubra os enigmas da arquitetura megalítica inca em Sacsayhuamán, Q’enqo, Puka Pukara e Tambomachay junto com uma arqueóloga especialista.';
    if (targetLang === 'fr') return 'Découvrez les énigmes de l’architecture mégalithique inca à Sacsayhuamán, Q’enqo, Puka Pukara et Tambomachay aux côtés d’une archéologue experte.';
    if (targetLang === 'it') return 'Scopri gli enigmi dell’architettura megalitica inca a Sacsayhuamán, Q’enqo, Puka Pukara e Tambomachay insieme a un’archeologa esperta.';
  }

  // Heurística para el subtítulo de Boho Journal (Aguas turquesas del nevado Humantay)
  const isDefaultBohoSubtitle =
    lowerTrimmed.includes('aguas turquesas') && lowerTrimmed.includes('humantay');

  if (isDefaultBohoSubtitle) {
    if (targetLang === 'es') return 'Una expedición pausada hacia las aguas turquesas del nevado Humantay, diseñada para amantes de la fotografía, el paisajismo y los viajes auténticos.';
    if (targetLang === 'en') return 'A serene expedition toward the turquoise waters of Humantay glacier, designed for photography lovers, landscapes, and authentic travel.';
    if (targetLang === 'pt') return 'Uma expedição tranquila até as águas turquesas do nevado Humantay, projetada para amantes da fotografia, paisagens e viagens autênticas.';
    if (targetLang === 'fr') return 'Une expédition sereine vers les eaux turquoise du glacier Humantay, conçue pour les amateurs de photographie, de paysages et de voyages authentiques.';
    if (targetLang === 'it') return 'Una spedizione rilassata verso le acque turchesi del ghiacciaio Humantay, pensata per gli amanti della fotografia, dei paesaggi e dei viaggi autentici.';
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
    if (targetLang === 'it') return 'Cosa rende questa experiencia indimenticabile?';
  }

  // Heurística para descripción estándar de servicios incluidos ("Servicio 100% coordinado...")
  if (lowerTrimmed.includes('seguridad turística') || lowerTrimmed.includes('seguridad turistica') || lowerTrimmed.includes('tourist safety') || lowerTrimmed.includes('segurança turística') || lowerTrimmed.includes('sécurité touristique') || lowerTrimmed.includes('sicurezza turistica')) {
    if (targetLang === 'es') return 'Servicio 100% coordinado y garantizado con estándares de seguridad turística.';
    if (targetLang === 'en') return '100% coordinated and guaranteed service under official tourism safety standards.';
    if (targetLang === 'pt') return 'Serviço 100% coordenado e garantido com padrões oficiais de segurança turística.';
    if (targetLang === 'fr') return 'Service 100% coordonné et garanti selon les normes officielles de sécurité touristique.';
    if (targetLang === 'it') return 'Servizio coordinato e garantito al 100% con standard ufficiali di sicurezza turistica.';
  }

  // Heurísticas para Especificaciones Técnicas (Soporte de rangos y valores simples con formato localizado)
  if (lowerTrimmed.includes('msnm') || lowerTrimmed.includes('m.a.s.l.') || lowerTrimmed.includes('metros') || lowerTrimmed.includes('mslm')) {
    const unit = targetLang === 'en' ? 'm.a.s.l.' : targetLang === 'fr' ? 'm d’altitude' : targetLang === 'pt' ? 'm de altitude' : targetLang === 'it' ? 'mslm' : 'msnm';
    const formatNumber = (n: number) => {
      if (isNaN(n)) return '';
      if (targetLang === 'en') return n.toLocaleString('en-US');
      if (targetLang === 'fr') return n.toLocaleString('fr-FR');
      return n.toLocaleString('es-ES');
    };
    if (text.includes('-') || text.includes(' a ')) {
      const separator = text.includes('-') ? '-' : ' a ';
      const parts = text.split(separator).map(p => {
        const digits = p.replace(/[^0-9]/g, '');
        if (!digits) return '';
        const n = parseInt(digits, 10);
        return formatNumber(n);
      }).filter(Boolean);
      if (parts.length >= 2) {
        return `${parts[0]} - ${parts[1]} ${unit}`;
      }
    }
    const digits = text.replace(/[^0-9]/g, '');
    const n = digits ? parseInt(digits, 10) : NaN;
    const num = isNaN(n) ? text.replace(/[^0-9,.]/g, '').replace(/[,.]*$/, '') : formatNumber(n);
    return `${num} ${unit}`;
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
