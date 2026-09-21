'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Compass, 
  MapPin, 
  Star, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  MessageCircle, 
  ChevronDown, 
  Phone, 
  Mail, 
  Sparkles,
  Award,
  Globe2,
  ArrowRight,
  Zap,
  Calendar,
  FileText,
  Mountain,
  Users,
  Target,
  BadgeCheck,
  XCircle,
  Backpack,
  Pin,
  Menu,
  X
} from 'lucide-react';
import { LandingData, PlanTier, ObjectiveType, LanguageType } from '@/types/landing';
import PinterestPinboard from '@/components/common/PinterestPinboard';
import TourSupportAndFaqs from '@/components/common/TourSupportAndFaqs';
import QuoteModal from '@/components/common/QuoteModal';
import SustainabilityAndSocialProof from '@/components/agency-portal/SustainabilityAndSocialProof';
import TrustGuaranteeAndOffice from '@/components/agency-portal/TrustGuaranteeAndOffice';
import { translateText, translateItineraryItem } from '@/data/translations';

interface AgencyPortalTemplateProps {
  data?: Partial<LandingData>;
  isLive?: boolean;
  viewMode?: 'desktop' | 'tablet' | 'mobile';
}

// -------------------------------------------------------------
// DICCIONARIOS DE IDIOMA COMPLETOS (ES, EN, PT, FR, IT)
// -------------------------------------------------------------
const DICTIONARIES = {
  es: {
    officialBar: 'DIRCETUR Cusco • Safe Travels',
    seasonBadge: 'Temporada 2026 • Salidas Diarias Garantizadas',
    ratingLabel: '4.9 / 5.0 Valoración',
    reviewsCount: '+500 Opiniones Verificadas',
    officialBadge: 'MINCETUR & DIRCETUR',
    officialDesc: 'Operador Turístico Oficial',
    officialOperator: 'Agencia Oficial',
    navTours: 'Tours',
    navGallery: 'Galería',
    navPackages: 'Paquetes',
    navWhyUs: 'Nosotros',
    navReviews: 'Reseñas',
    navFaq: 'FAQ & Soporte',
    ctaHeader: 'WhatsApp',
    ctaHeroQuote: 'Solicitar Cotización',
    ctaHeroWa: 'Reservar Ahora',
    ctaBothWa: 'Reservar en WhatsApp',
    ctaBothQuote: 'Solicitar Cotización VIP',
    ctaViewMore: 'Ver Más Tours',
    statTravelers: 'Viajeros Felices',
    statExperience: 'Años de Experiencia',
    statRoutes: 'Rutas & Destinos',
    statRating: 'Puntuación 4.9/5',
    techSheetBadge: 'Ficha Técnica Oficial del Tour',
    techSheetTitle: 'Especificaciones Técnicas del Recorrido',
    techSheetDesc: 'Parámetros certificados para garantizar tu seguridad, confort y disfrute en la ruta andina.',
    altitudeLabel: 'Altitud Máxima',
    durationLabel: 'Duración',
    difficultyLabel: 'Dificultad',
    groupTypeLabel: 'Modalidad',
    targetAudienceLabel: 'Público Ideal',
    destinationLabel: 'Destino',
    guideBadge: 'Guía Oficial Colegiado DIRCETUR',
    guideSpokenLanguages: 'Idiomas que Domina',
    guideBio: 'Especialista local acreditado con certificación en primeros auxilios en zonas agrestes y protocolo médico para aclimatación.',
    directLine: 'Atención Directa',
    includedServicesBadge: 'Servicios & Privilegios Oficiales',
    includedServicesTitle: 'Servicios Incluidos en tu Experiencia',
    includedServicesDesc: 'Todo lo que necesitas para una vivencia cómoda, segura, sin costos ocultos ni preocupaciones.',
    catalogBadge: 'Catálogo Exclusivo 2026',
    catalogTitle: 'Tours Destacados en Cusco y Perú',
    catalogDesc: 'Salidas diarias garantizadas con guías colegiados, traslados oficiales y asistencia médica de emergencia.',
    filterAll: 'Todos',
    filterTrek: 'Trekking',
    filterMachu: 'Machu Picchu',
    filterCulture: 'Valle Sagrado',
    filterAdrenaline: 'Adrenalina',
    pricePerPerson: 'Precio por persona',
    bookTour: 'Reservar Tour',
    quoteTour: 'Cotizar Tour',
    itineraryBadge: 'Itinerario Detallado del Tour',
    itineraryTitle: 'Cronograma y Experiencia Paso a Paso',
    itineraryDesc: 'Tiempos planificados al milímetro para favorecer la aclimatación y disfrute de la ruta.',
    logisticsBadge: 'Logística Clara & Equipaje',
    logisticsTitle: 'Exclusiones Claras & Checklist de Mochila',
    logisticsDesc: 'Transparencia total antes de iniciar tu aventura.',
    notIncludedTitle: 'Qué NO está incluido en la tarifa',
    whatToBringTitle: 'Qué llevar en tu mochila (Recomendado)',
    whyTrustBadge: 'Confianza & Seguridad',
    altitudeProtocolTitle: 'Compromiso de Altura y Asistencia Médica',
    altitudeProtocolDesc: 'Todos nuestros vehículos y guías cuentan permanentemente con balón de oxígeno medicinal y botiquín de primeros auxilios.',
    trustBadgesTitle: 'Distintivos Oficiales & Sellos de Confianza',
    activeGuidesNow: 'Guías Activos Hoy en Cusco',
    satisfactionGuaranteed: 'Satisfacción Garantizada',
    packagesBadge: 'Circuitos Multidía',
    packagesTitle: 'Nuestros Tours & Paquetes',
    packagesDesc: 'Circuitos completos con alojamiento, traslados y guiado incluidos.',
    fromPrice: 'Desde',
    viewItinerary: 'Ver Itinerario',
    reviewsBadge: 'Experiencias Reales',
    reviewsTitle: 'Lo que dicen nuestros viajeros',
    reviewsDesc: 'Opiniones recopiladas de turistas de todo el mundo que confiaron sus vacaciones en Cusco con nuestro equipo oficial.',
    verifiedReview: 'Verificado',
    ctaBannerTitle: '¿LISTO PARA TU PRÓXIMA AVENTURA?',
    ctaBannerDesc: 'Contáctanos hoy mismo para asegurar tus accesos a Machu Picchu y disfrutar del mejor viaje de tu vida en el Perú.',
    contactNow: 'Contactar Ahora',
    freeBanner: '⚡ Creado con Cusco Creativos Web — Generador Rápido de Landings Turísticas',
    questionsTooltip: '¿Dudas? Habla con un asesor',
    certificationsTitle: 'Acreditaciones Oficiales'
  },
  en: {
    officialBar: 'DIRCETUR Cusco • Safe Travels',
    seasonBadge: '2026 Season • Guaranteed Daily Departures',
    ratingLabel: '4.9 / 5.0 Rating',
    reviewsCount: '+500 Verified Reviews',
    officialBadge: 'MINCETUR & DIRCETUR',
    officialDesc: 'Official Licensed Operator',
    officialOperator: 'Official Agency',
    navTours: 'Tours',
    navGallery: 'Gallery',
    navPackages: 'Packages',
    navWhyUs: 'Why Us',
    navReviews: 'Reviews',
    navFaq: 'FAQ & Support',
    ctaHeader: 'WhatsApp',
    ctaHeroQuote: 'Request Quote',
    ctaHeroWa: 'Book Now',
    ctaBothWa: 'Book on WhatsApp',
    ctaBothQuote: 'Request VIP Quote',
    ctaViewMore: 'View Tours',
    statTravelers: 'Happy Travelers',
    statExperience: 'Years Experience',
    statRoutes: 'Routes & Destinations',
    statRating: 'Score 4.9/5',
    techSheetBadge: 'Official Tour Technical Sheet',
    techSheetTitle: 'Technical Specifications & Adventure Details',
    techSheetDesc: 'Certified parameters to ensure your safety, comfort and maximum enjoyment across the Andean route.',
    altitudeLabel: 'Max Altitude',
    durationLabel: 'Duration',
    difficultyLabel: 'Difficulty',
    groupTypeLabel: 'Group Type',
    targetAudienceLabel: 'Ideal Audience',
    destinationLabel: 'Destination',
    guideBadge: 'Official Certified Tour Guide DIRCETUR',
    guideSpokenLanguages: 'Spoken Languages',
    guideBio: 'Accredited local specialist with wilderness first aid certification and specialized high-altitude protocol training.',
    directLine: 'Direct Line',
    includedServicesBadge: 'Official Services & Privileges',
    includedServicesTitle: 'Services Included in your Experience',
    includedServicesDesc: 'Everything included for a seamless, comfortable and carefree Andean journey without hidden fees.',
    catalogBadge: 'Exclusive 2026 Catalog',
    catalogTitle: 'Featured Tours in Cusco & Peru',
    catalogDesc: 'Guaranteed daily departures with certified guides, official transfers and emergency medical altitude assistance.',
    filterAll: 'All',
    filterTrek: 'Trekking',
    filterMachu: 'Machu Picchu',
    filterCulture: 'Sacred Valley',
    filterAdrenaline: 'Adrenaline',
    pricePerPerson: 'Price per person',
    bookTour: 'Book Tour',
    quoteTour: 'Request Quote',
    itineraryBadge: 'Official Tour Itinerary',
    itineraryTitle: 'Step-by-Step Experience Schedule',
    itineraryDesc: 'Paced schedule optimized for altitude acclimatization and scenic immersion.',
    logisticsBadge: 'Clear Logistics & Packing',
    logisticsTitle: 'Exclusions & Backpack Checklist',
    logisticsDesc: 'Complete transparency before beginning your Andean adventure.',
    notIncludedTitle: 'What is NOT included in the fare',
    whatToBringTitle: 'What to bring in your backpack (Recommended)',
    whyTrustBadge: 'Trust & Safety',
    altitudeProtocolTitle: 'High-Altitude Protocol & Medical Support',
    altitudeProtocolDesc: 'All our vehicles and guides carry certified medical oxygen tanks and Andean wilderness first aid kits at all times.',
    trustBadgesTitle: 'Official Certifications & Trust Badges',
    activeGuidesNow: 'Guides Active Today in Cusco',
    satisfactionGuaranteed: '100% Guaranteed Satisfaction',
    packagesBadge: 'Multi-Day Circuits',
    packagesTitle: 'Curated Travel Packages',
    packagesDesc: 'Comprehensive circuits including boutique lodging, railway passes, transfers and guided tours.',
    fromPrice: 'From',
    viewItinerary: 'View Itinerary',
    reviewsBadge: 'Verified Stories',
    reviewsTitle: 'What our travelers say',
    reviewsDesc: 'Verified testimonials from adventurers around the globe who trusted our official team in Cusco.',
    verifiedReview: 'Verified',
    ctaBannerTitle: 'READY FOR YOUR NEXT ADVENTURE?',
    ctaBannerDesc: 'Contact our team today to lock in your Machu Picchu tickets and personalized Andean itinerary.',
    contactNow: 'Contact Us Now',
    freeBanner: '⚡ Created with Cusco Creativos Web — Fast Tourism Landing Builder',
    questionsTooltip: 'Questions? Chat with an advisor',
    certificationsTitle: 'Official Certifications'
  },
  pt: {
    officialBar: 'DIRCETUR Cusco • Safe Travels',
    seasonBadge: 'Temporada 2026 • Saídas Diárias Garantidas',
    ratingLabel: '4.9 / 5.0 Avaliação',
    reviewsCount: '+500 Avaliações Verificadas',
    officialBadge: 'MINCETUR & DIRCETUR',
    officialDesc: 'Operador Turístico Oficial',
    officialOperator: 'Agência Oficial',
    navTours: 'Passeios',
    navGallery: 'Galeria',
    navPackages: 'Pacotes',
    navWhyUs: 'Sobre Nós',
    navReviews: 'Depoimentos',
    navFaq: 'FAQ & Suporte',
    ctaHeader: 'WhatsApp',
    ctaHeroQuote: 'Pedir Orçamento',
    ctaHeroWa: 'Reservar Agora',
    ctaBothWa: 'Reservar no WhatsApp',
    ctaBothQuote: 'Solicitar Orçamento VIP',
    ctaViewMore: 'Ver Mais Passeios',
    statTravelers: 'Viajantes Felizes',
    statExperience: 'Anos de Experiência',
    statRoutes: 'Rotas & Destinos',
    statRating: 'Pontuação 4.9/5',
    techSheetBadge: 'Ficha Técnica Oficial do Tour',
    techSheetTitle: 'Especificações Técnicas da Rota',
    techSheetDesc: 'Parâmetros certificados para garantir sua segurança, conforto e aproveitamento máximo nos Andes peruanos.',
    altitudeLabel: 'Altitude Máxima',
    durationLabel: 'Duração',
    difficultyLabel: 'Dificuldade',
    groupTypeLabel: 'Modalidade',
    targetAudienceLabel: 'Público Ideal',
    destinationLabel: 'Destino',
    guideBadge: 'Guia Oficial Credenciado DIRCETUR',
    guideSpokenLanguages: 'Idiomas Dominados',
    guideBio: 'Especialista local credenciado com certificação de primeiros socorros em áreas remotas e protocolo médico de altitude.',
    directLine: 'Atendimento Direto',
    includedServicesBadge: 'Serviços & Privilégios Oficiais',
    includedServicesTitle: 'Serviços Incluídos na sua Experiência (Ponto 7)',
    includedServicesDesc: 'Tudo o que você precisa para uma viagem confortável, segura e inesquecível sem surpresas.',
    catalogBadge: 'Catálogo Exclusivo 2026',
    catalogTitle: 'Passeios em Destaque em Cusco e Peru',
    catalogDesc: 'Saídas diárias garantidas com guias credenciados, transporte oficial e assistência médica com oxigênio.',
    filterAll: 'Todos',
    filterTrek: 'Trekking',
    filterMachu: 'Machu Picchu',
    filterCulture: 'Vale Sagrado',
    filterAdrenaline: 'Adrenalina',
    pricePerPerson: 'Preço por pessoa',
    bookTour: 'Reservar Passeio',
    quoteTour: 'Solicitar Orçamento',
    itineraryBadge: 'Itinerário Detalhado do Tour',
    itineraryTitle: 'Cronograma Passo a Passo',
    itineraryDesc: 'Horários planejados cuidadosamente para favorecer a aclimatação e o conforto do viajante.',
    logisticsBadge: 'Logística Clara & Bagagem',
    logisticsTitle: 'Exclusões Claras & Checklist de Mochila',
    logisticsDesc: 'Total transparência antes de iniciar sua jornada andina.',
    notIncludedTitle: 'O que NÃO está incluído na tarifa',
    whatToBringTitle: 'O que levar na mochila (Recomendado)',
    whyTrustBadge: 'Confiança & Segurança',
    altitudeProtocolTitle: 'Protocolo de Altitude & Assistência Médica',
    altitudeProtocolDesc: 'Todos os nossos veículos e guias contam permanentemente com balão de oxigênio medicinal e kit de primeiros socorros.',
    trustBadgesTitle: 'Distintivos Oficiais & Selos de Confiança',
    activeGuidesNow: 'Guias Ativos Hoje em Cusco',
    satisfactionGuaranteed: '100% Satisfação Garantida',
    packagesBadge: 'Circuitos Multidias',
    packagesTitle: 'Nossos Pacotes de Viagem',
    packagesDesc: 'Circuitos completos incluindo hospedagem charmosa, passagens de trem, traslados e passeios com guia.',
    fromPrice: 'A partir de',
    viewItinerary: 'Ver Itinerário',
    reviewsBadge: 'Histórias Verificadas',
    reviewsTitle: 'O que dizem os nossos viajantes',
    reviewsDesc: 'Opiniões verificadas de aventureiros de todo o mundo que confiaram suas férias em Cusco à nossa equipe oficial.',
    verifiedReview: 'Verificado',
    ctaBannerTitle: 'PRONTO PARA SUA PRÓXIMA AVENTURA?',
    ctaBannerDesc: 'Fale conosco hoje mesmo para garantir seus ingressos para Machu Picchu e viver a viagem dos seus sonhos no Peru.',
    contactNow: 'Falar Conosco Agora',
    freeBanner: '⚡ Criado com Cusco Creativos Web — Gerador Rápido de Landings Turísticas',
    questionsTooltip: 'Dúvidas? Fale com um consultor',
    certificationsTitle: 'Acreditações Oficiais'
  },
  fr: {
    officialBar: 'DIRCETUR Cusco • Safe Travels',
    seasonBadge: 'Saison 2026 • Départs Quotidiens Garantis',
    ratingLabel: '4.9 / 5.0 Note',
    reviewsCount: '+500 Avis Vérifiés',
    officialBadge: 'MINCETUR & DIRCETUR',
    officialDesc: 'Opérateur Touristique Officiel',
    officialOperator: 'Agence Officielle',
    navTours: 'Circuits',
    navGallery: 'Galerie',
    navPackages: 'Forfaits',
    navWhyUs: 'Pourquoi Nous',
    navReviews: 'Avis',
    navFaq: 'FAQ & Support',
    ctaHeader: 'WhatsApp',
    ctaHeroQuote: 'Demander un Devis',
    ctaHeroWa: 'Réserver',
    ctaBothWa: 'Réserver sur WhatsApp',
    ctaBothQuote: 'Demander un Devis VIP',
    ctaViewMore: 'Voir Plus de Circuits',
    statTravelers: 'Voyageurs Heureux',
    statExperience: 'Ans d’Expérience',
    statRoutes: 'Itinéraires & Destin',
    statRating: 'Note 4.9/5',
    techSheetBadge: 'Fiche Technique Officielle du Circuit',
    techSheetTitle: 'Spécifications Techniques de l’Excursion',
    techSheetDesc: 'Paramètres certifiés pour assurer votre sécurité, votre confort et votre plaisir à travers les Andes péruviennes.',
    altitudeLabel: 'Altitude Maximale',
    durationLabel: 'Durée',
    difficultyLabel: 'Difficulté',
    groupTypeLabel: 'Modalité',
    targetAudienceLabel: 'Public Cible',
    destinationLabel: 'Destination',
    guideBadge: 'Guide Officiel Agréé DIRCETUR',
    guideSpokenLanguages: 'Langues Maîtrisées',
    guideBio: 'Spécialiste local agréé, formé aux premiers secours en milieu sauvage et aux protocoles médicaux d’acclimatation en altitude.',
    directLine: 'Ligne Directe',
    includedServicesBadge: 'Services & Privilèges Officiels',
    includedServicesTitle: 'Services Inclus dans votre Expérience',
    includedServicesDesc: 'Tout le nécessaire pour une expérience fluide, confortable et sans stress, sans frais cachés.',
    catalogBadge: 'Catalogue Exclusif 2026',
    catalogTitle: 'Circuits Populaires à Cusco et au Pérou',
    catalogDesc: 'Départs quotidiens garantis avec guides officiels, transferts privés et assistance médicale à l’oxygène.',
    filterAll: 'Tous',
    filterTrek: 'Trekking',
    filterMachu: 'Machu Picchu',
    filterCulture: 'Vallée Sacrée',
    filterAdrenaline: 'Adrénaline',
    pricePerPerson: 'Prix par personne',
    bookTour: 'Réserver le Circuit',
    quoteTour: 'Demander un Devis',
    itineraryBadge: 'Itinéraire Détaillé du Circuit',
    itineraryTitle: 'Programme Étape par Étape',
    itineraryDesc: 'Horaires étudiés pour favoriser l’acclimatation en altitude et le confort des voyageurs.',
    logisticsBadge: 'Logistique & Équipement',
    logisticsTitle: 'Exclusions Claires & Checklist du Sac à Dos',
    logisticsDesc: 'Transparence absolue avant d’entamer votre aventure andine.',
    notIncludedTitle: 'Ce qui N’EST PAS inclus dans le tarif',
    whatToBringTitle: 'Ce qu’il faut emporter dans son sac (Recommandé)',
    whyTrustBadge: 'Confiance & Sécurité',
    altitudeProtocolTitle: 'Protocole d’Altitude & Assistance Médicale',
    altitudeProtocolDesc: 'Tous nos véhicules et guides disposent en permanence de bouteilles d’oxygène médical et de trousses de premiers secours.',
    trustBadgesTitle: 'Certifications Officielles & Labels de Confiance',
    activeGuidesNow: 'Guides Actifs Aujourd’hui à Cusco',
    satisfactionGuaranteed: '100% Satisfaction Garantie',
    packagesBadge: 'Circuits Multi-Jours',
    packagesTitle: 'Nos Forfaits de Voyage',
    packagesDesc: 'Circuits complets comprenant hébergement de charme, billets de train, transferts et visites guidées.',
    fromPrice: 'À partir de',
    viewItinerary: 'Voir l’Itinéraire',
    reviewsBadge: 'Témoignages Vérifiés',
    reviewsTitle: 'Ce que disent nos voyageurs',
    reviewsDesc: 'Avis vérifiés de voyageurs du monde entier ayant fait confiance à notre équipe officielle à Cusco.',
    verifiedReview: 'Vérifié',
    ctaBannerTitle: 'PRÊT POUR VOTRE PROCHAINE AVENTURE ?',
    ctaBannerDesc: 'Contactez notre équipe dès aujourd’hui pour réserver vos accès au Machu Picchu et profiter du voyage de votre vie au Pérou.',
    contactNow: 'Nous Contacter',
    freeBanner: '⚡ Créé avec Cusco Creativos Web — Générateur Rapide de Landing Pages',
    questionsTooltip: 'Des questions ? Échangez avec un conseiller',
    certificationsTitle: 'Certifications Officielles'
  },
  it: {
    officialBar: 'DIRCETUR Cusco • Safe Travels',
    seasonBadge: 'Stagione 2026 • Partenze Giornaliere Garantite',
    ratingLabel: '4.9 / 5.0 Valutazione',
    reviewsCount: '+500 Recensioni Verificate',
    officialBadge: 'MINCETUR & DIRCETUR',
    officialDesc: 'Operatore Turistico Ufficiale',
    officialOperator: 'Agenzia Ufficiale',
    navTours: 'Tour',
    navGallery: 'Galleria',
    navPackages: 'Pacchetti',
    navWhyUs: 'Perché Noi',
    navReviews: 'Recensioni',
    navFaq: 'FAQ & Supporto',
    ctaHeader: 'WhatsApp',
    ctaHeroQuote: 'Richiedi Preventivo',
    ctaHeroWa: 'Prenota Ora',
    ctaBothWa: 'Prenota su WhatsApp',
    ctaBothQuote: 'Richiedi Preventivo VIP',
    ctaViewMore: 'Vedi Più Tour',
    statTravelers: 'Viaggiatori Soddisfatti',
    statExperience: 'Anni di Esperienza',
    statRoutes: 'Rotte & Destinazioni',
    statRating: 'Punteggio 4.9/5',
    techSheetBadge: 'Scheda Tecnica Ufficiale del Tour',
    techSheetTitle: 'Specifiche Tecniche dell’Itinerario',
    techSheetDesc: 'Parametri certificati per garantire la massima sicurezza, comfort e piacere lungo i sentieri andini.',
    altitudeLabel: 'Altitudine Massima',
    durationLabel: 'Durata',
    difficultyLabel: 'Difficoltà',
    groupTypeLabel: 'Modalità',
    targetAudienceLabel: 'Destinatari Ideali',
    destinationLabel: 'Destinazione',
    guideBadge: 'Guida Ufficiale Abilitata DIRCETUR',
    guideSpokenLanguages: 'Lingue Parlate',
    guideBio: 'Specialista locale abilitato con certificazione di primo soccorso in ambienti remoti e protocollo medico per l’altitudine.',
    directLine: 'Assistenza Diretta',
    includedServicesBadge: 'Servizi & Privilegi Ufficiali',
    includedServicesTitle: 'Servizi Inclusi nella tua Esperienza',
    includedServicesDesc: 'Tutto ciò che serve per un viaggio confortevole, sicuro e indimenticabile senza costi nascosti.',
    catalogBadge: 'Catalogo Esclusivo 2026',
    catalogTitle: 'Tour in Evidenza a Cusco e Perù',
    catalogDesc: 'Partenze giornaliere garantite con guide ufficiali, trasporti autorizzati e assistenza medica con ossigeno.',
    filterAll: 'Tutti',
    filterTrek: 'Trekking',
    filterMachu: 'Machu Picchu',
    filterCulture: 'Valle Sacra',
    filterAdrenaline: 'Adrenalina',
    pricePerPerson: 'Prezzo a persona',
    bookTour: 'Prenota Tour',
    quoteTour: 'Richiedi Preventivo',
    itineraryBadge: 'Itinerario Dettagliato del Tour',
    itineraryTitle: 'Programma Passo dopo Passo',
    itineraryDesc: 'Orari studiati accuratamente per favorire l’acclimatazione all’altitudine e il massimo relax.',
    logisticsBadge: 'Logistica Chiara & Bagaglio',
    logisticsTitle: 'Esclusioni Chiare & Checklist dello Zaino',
    logisticsDesc: 'Totale trasparenza prima di intraprendere il tuo viaggio andino.',
    notIncludedTitle: 'Cosa NON è incluso nella tariffa',
    whatToBringTitle: 'Cosa portare nello zaino (Consigliato)',
    whyTrustBadge: 'Fiducia & Sicurezza',
    altitudeProtocolTitle: 'Protocollo di Altitudine & Assistenza Medica',
    altitudeProtocolDesc: 'Tutti i nostri veicoli e guide dispongono permanentemente di bombole di ossigeno medicale e kit di primo soccorso.',
    trustBadgesTitle: 'Certificazioni Ufficiali & Sigilli di Garanzia',
    activeGuidesNow: 'Guide Attive Oggi a Cusco',
    satisfactionGuaranteed: '100% Soddisfazione Garantita',
    packagesBadge: 'Circuiti Multigiorno',
    packagesTitle: 'I Nostri Pacchetti di Viaggio',
    packagesDesc: 'Circuiti completi con alloggi selezionati, biglietti ferroviari, trasferimenti e visite guidate.',
    fromPrice: 'A partire da',
    viewItinerary: 'Vedi Itinerario',
    reviewsBadge: 'Storie Verificate',
    reviewsTitle: 'Cosa dicono i nostri viaggiatori',
    reviewsDesc: 'Recensioni verificate da viaggiatori di tutto il mondo che hanno affidato le loro vacanze al nostro team ufficiale.',
    verifiedReview: 'Verificato',
    ctaBannerTitle: 'PRONTO PER LA TUA PROSSIMA AVVENTURA?',
    ctaBannerDesc: 'Contattaci oggi stesso per assicurarti gli ingressi a Machu Picchu e vivere il miglior viaggio della tua vita in Perù.',
    contactNow: 'Contattaci Ora',
    freeBanner: '⚡ Creato con Cusco Creativos Web — Generatore Rapido di Landing Turistiche',
    questionsTooltip: 'Dubbi? Parla con un consulente',
    certificationsTitle: 'Certificazioni Ufficiali'
  }
};

// -------------------------------------------------------------
// COMPONENTE PRINCIPAL
// -------------------------------------------------------------
export default function AgencyPortalTemplate({ data, isLive = false, viewMode = 'desktop' }: AgencyPortalTemplateProps) {
  const isMobile = viewMode === 'mobile';
  
  // 1. Estados reactivos de interacción
  const [lang, setLang] = useState<LanguageType>(data?.language || 'es');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showWaTooltip, setShowWaTooltip] = useState<boolean>(true);
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [selectedTourForQuote, setSelectedTourForQuote] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // 2. Parámetros y datos dinámicos
  const brandName = data?.name || 'Cusco Tours';
  const whatsappNumber = (data?.whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const guideName = data?.guideName || 'Carlos Mendoza';
  const destination = data?.destination || 'Cusco, Perú';
  const objective: ObjectiveType = data?.objective || 'whatsapp';
  const planTier: PlanTier = data?.tier || 'pro';

  // 3. Diccionario Multi-Idioma reactivo (ES / EN / PT / FR / IT)
  const dict = DICTIONARIES[lang] || DICTIONARIES.es;
  const t = {
    ...dict,
    whyTitle: lang === 'en' ? `Why travel with ${brandName}?` : lang === 'pt' ? `Por que viajar com ${brandName}?` : lang === 'fr' ? `Pourquoi voyager avec ${brandName} ?` : lang === 'it' ? `Perché viaggiare con ${brandName}?` : `¿Por qué viajar con ${brandName}?`,
    whySubtitle: lang === 'en' ? 'Official local agency with over a decade curating unforgettable memories across the Peruvian Andes.' : lang === 'pt' ? 'Agência local credenciada com mais de uma década organizando experiências inesquecíveis nos Andes peruanos.' : lang === 'fr' ? 'Agence locale agréée forte de plus d’une décennie d’expérience dans l’organisation de souvenirs inoubliables.' : lang === 'it' ? 'Agenzia locale accreditata con oltre un decennio di esperienza nella creazione di ricordi indimenticabili.' : 'Somos una agencia local acreditada con más de 10 años organizando viajes inolvidables en Cusco y todo el Perú.',
    footerRights: `© 2026 ${brandName}. ${lang === 'en' ? 'Authorized Tourism Operator.' : lang === 'pt' ? 'Operador Turístico Autorizado.' : lang === 'fr' ? 'Opérateur Touristique Autorisé.' : lang === 'it' ? 'Operatore Turistico Autorizzato.' : 'Operador Turístico Autorizado.'}`
  };

  // 4. Jerarquía de contenidos
  const isFree = planTier === 'free';
  const isBasic = planTier === 'basic';
  const isPro = planTier === 'pro';
  const isAdvance = planTier === 'advance';

  // -----------------------------------------------------------
  // 5. HELPERS DE TRADUCCIÓN DINÁMICA DE 5 IDIOMAS
  // -----------------------------------------------------------
  const getLocalizedHeroTitle = (originalTitle?: string) => {
    if (!originalTitle) {
      return translateText('Machu Picchu de Lujo con Tren Panorámico', lang).toUpperCase();
    }
    return translateText(originalTitle, lang).toUpperCase();
  };

  const getLocalizedHeroSubtitle = (originalSubtitle?: string) => {
    if (!originalSubtitle) {
      return translateText('Descubre la maravilla del mundo con traslados privados, hoteles 5 estrellas y un guía oficial exclusivo para ti y tu familia.', lang);
    }
    return translateText(originalSubtitle, lang);
  };

  const getLocalizedDifficulty = (diff?: string) => {
    const val = diff || 'Moderada';
    if (lang === 'es') return val;
    return translateText(val, lang);
  };

  const getLocalizedGroupType = (group?: string) => {
    const val = group || 'Grupo Reducido';
    if (lang === 'es') return val;
    return translateText(val, lang);
  };

  const getLocalizedTargetAudience = (aud?: string) => {
    const val = aud || 'Viajeros Internacionales & Familias';
    if (lang === 'es') return val;
    return translateText(val, lang);
  };

  const getLocalizedDuration = (dur?: string) => {
    const val = dur || 'Full Day';
    if (lang === 'es') return val;
    return translateText(val, lang);
  };

  const getLocalizedIncludedServices = (services?: string[]) => {
    const baseList = (services && services.length > 0) ? services : [
      'Transporte turístico privado con aire acondicionado',
      'Boletos de tren panorámico y entradas oficiales',
      'Guía oficial bilingüe DIRCETUR en todas las excursiones',
      'Asistencia y monitoreo 24/7 con oxígeno a bordo',
      'Almuerzo buffet y degustaciones gastronómicas'
    ];

    if (lang === 'es') return baseList;
    return baseList.map(srv => translateText(srv, lang));
  };

  const getLocalizedItinerary = (itinerary?: { step: string; title: string; desc: string }[]) => {
    const base = (itinerary && itinerary.length > 0) ? itinerary : [
      { step: '04:30 AM', title: 'Recojo en Hotel & Traslado Panorámico', desc: 'Recojo puntual en tu alojamiento con asistencia médica preventiva y refrigerio ligero.' },
      { step: '07:30 AM', title: 'Desayuno Buffet Andino Energético', desc: 'Desayuno preparado por cocineros locales para cargar energías antes del ascenso.' },
      { step: '09:30 AM', title: 'Ascenso Guiado a la Cumbre de Vinicunca (5,036 m)', desc: 'Caminata con ritmo dosificado, paradas fotográficas y asistencia permanente de oxígeno.' },
      { step: '01:30 PM', title: 'Almuerzo Campestre & Retorno a Cusco', desc: 'Almuerzo buffet campestre en valle andino y retorno cómodo a la ciudad de Cusco.' }
    ];

    if (lang === 'es') return base;
    return base.map((it, idx) => translateItineraryItem(it, lang, idx));
  };

  const getLocalizedNotIncluded = (items?: string[]) => {
    const base = (items && items.length > 0) ? items : [
      'Vuelos internacionales o nacionales hacia Cusco',
      'Propinas voluntarias para guía y conductor',
      'Seguro médico personal de viaje internacional',
      'Gastos o snacks personales no detallados'
    ];
    if (lang === 'es') return base;
    return base.map(item => translateText(item, lang));
  };

  const getLocalizedWhatToBring = (items?: string[]) => {
    const base = (items && items.length > 0) ? items : [
      'Pasaporte original físico vigente (obligatorio)',
      'Ropa abrigadora en capas y casaca cortavientos',
      'Zapatos cómodos de trekking con buen agarre',
      'Bloqueador solar (SPF 50+), lentes de sol y gorro',
      'Dinero en efectivo en soles peruanos'
    ];
    if (lang === 'es') return base;
    return base.map(item => translateText(item, lang));
  };

  const getLocalizedTrustBadges = (badges?: string[]) => {
    const base = (badges && badges.length > 0) ? badges : [
      'Licencia Oficial DIRCETUR Cusco',
      'Sello Internacional Safe Travels',
      'Agencia Formal RUC 20 Verificado',
      'Guía Colegiado Bilingüe',
      'Balón de Oxígeno & Botiquín de Altura'
    ];
    if (lang === 'es') return base;
    return base.map(badge => translateText(badge, lang));
  };

  // Textos y enlaces dinámicos
  const heroTitle = getLocalizedHeroTitle(data?.hero?.title);
  const heroSubtitle = getLocalizedHeroSubtitle(data?.hero?.subtitle);
  const heroBadge = translateText(data?.hero?.badge || t.seasonBadge, lang);
  const heroImage = data?.heroImage || 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop';
  
  const heroCtaLabel = objective === 'quote' 
    ? t.ctaHeroQuote 
    : objective === 'both' 
    ? (lang === 'es' ? 'WhatsApp & Cotizar Online' : lang === 'en' ? 'WhatsApp & Quote' : lang === 'pt' ? 'WhatsApp & Orçamento' : lang === 'fr' ? 'WhatsApp & Devis' : 'WhatsApp & Preventivo')
    : t.ctaHeroWa;

  // -----------------------------------------------------------
  // 6. CATÁLOGO DE TOURS MULTI-IDIOMA
  // -----------------------------------------------------------
  const DEFAULT_FEATURED_TOURS = [
    {
      id: 'tour-creado-usuario',
      title: translateText(data?.name, lang) || (lang === 'en' ? 'Signature Andean Tour' : lang === 'pt' ? 'Passeio Andino Principal' : lang === 'fr' ? 'Circuit Andin Principal' : lang === 'it' ? 'Tour Andino Principale' : 'Tour Principal Seleccionado'),
      category: lang === 'en' ? 'Featured Signature Tour' : lang === 'pt' ? 'Passeio Destaque' : lang === 'fr' ? 'Circuit Signature' : lang === 'it' ? 'Tour in Evidenza' : 'Tour Principal Destacado',
      categoryKey: 'all',
      location: translateText(destination, lang),
      duration: getLocalizedDuration(data?.duration),
      price: data?.price || '$45 USD',
      rating: 4.9,
      image: heroImage,
      tag: lang === 'en' ? 'Selected Tour' : lang === 'pt' ? 'Selecionado' : lang === 'fr' ? 'Sélectionné' : lang === 'it' ? 'Selezionato' : 'Tour Seleccionado',
      badge: '4.9 ★'
    },
    {
      id: '2',
      title: lang === 'en' ? 'Humantay Turquoise Lake & Glacier' : lang === 'pt' ? 'Laguna Humantay Turquesa & Geleira' : lang === 'fr' ? 'Lagune Humantay Turquoise & Glacier' : lang === 'it' ? 'Laguna Humantay Turchese & Ghiacciaio' : 'Laguna Humantay Turquesa & Glaciar',
      category: lang === 'en' ? 'Nature & Photography' : lang === 'pt' ? 'Natureza & Fotografia' : lang === 'fr' ? 'Nature & Photographie' : lang === 'it' ? 'Natura & Fotografia' : 'Naturaleza & Fotografía',
      categoryKey: 'trekking',
      location: 'Anta - Mollepata',
      duration: 'Full Day (05:00 - 18:00)',
      price: '$40 USD',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop',
      tag: lang === 'en' ? 'Glacier Trek' : lang === 'pt' ? 'Geleira' : lang === 'fr' ? 'Glacier' : lang === 'it' ? 'Ghiacciaio' : 'Glaciar',
      badge: '4.8 ★'
    },
    {
      id: '3',
      title: lang === 'en' ? 'Machu Picchu Panoramic Train & Guided Tour' : lang === 'pt' ? 'Machu Picchu Mágico em Trem Panorâmico' : lang === 'fr' ? 'Machu Picchu Magique en Train Panoramique' : lang === 'it' ? 'Machu Picchu Magico in Treno Panoramico' : 'Machu Picchu Mágico en Tren Panorámico',
      category: lang === 'en' ? 'Wonder of the World' : lang === 'pt' ? 'Maravilha do Mundo' : lang === 'fr' ? 'Merveille du Monde' : lang === 'it' ? 'Meraviglia del Mondo' : 'Historia & Maravilla',
      categoryKey: 'machu',
      location: 'Aguas Calientes',
      duration: lang === 'en' ? '1 Full Day' : lang === 'pt' ? '1 Dia Completo' : lang === 'fr' ? '1 Journée' : lang === 'it' ? '1 Giorno' : '1 Día Completo',
      price: '$280 USD',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      tag: lang === 'en' ? 'Top Wonder' : lang === 'pt' ? 'Maravilha' : lang === 'fr' ? 'Merveille' : lang === 'it' ? 'Meraviglia' : 'Maravilla del Mundo',
      badge: '5.0 ★'
    },
    {
      id: '4',
      title: lang === 'en' ? 'Sacred Valley VIP Cultural Journey' : lang === 'pt' ? 'Vale Sagrado dos Incas VIP' : lang === 'fr' ? 'Vallée Sacrée des Incas VIP' : lang === 'it' ? 'Valle Sacra degli Inca VIP' : 'Valle Sagrado de los Incas VIP',
      category: lang === 'en' ? 'Culture & Archaeology' : lang === 'pt' ? 'Cultura & Arqueologia' : lang === 'fr' ? 'Culture & Archéologie' : lang === 'it' ? 'Cultura & Archeologia' : 'Cultura & Arqueología',
      categoryKey: 'cultura',
      location: 'Pisac - Ollantaytambo',
      duration: 'Full Day',
      price: '$55 USD',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
      tag: lang === 'en' ? 'Archaeology' : lang === 'pt' ? 'Arqueológico' : lang === 'fr' ? 'Archéologie' : lang === 'it' ? 'Archeologico' : 'Arqueológico',
      badge: '4.9 ★'
    },
    {
      id: '5',
      title: lang === 'en' ? 'Machu Picchu 2 Days & Aguas Calientes Hotel' : lang === 'pt' ? 'Machu Picchu 2 Dias com Hotel em Aguas Calientes' : lang === 'fr' ? 'Machu Picchu 2 Jours & Hôtel à Aguas Calientes' : lang === 'it' ? 'Machu Picchu 2 Giorni & Hotel ad Aguas Calientes' : 'Machu Picchu 2 Días con Noche en Aguas Calientes',
      category: lang === 'en' ? 'Complete Journey' : lang === 'pt' ? 'Experiência Completa' : lang === 'fr' ? 'Séjour Complet' : lang === 'it' ? 'Soggiorno Completo' : 'Experiencia Completa',
      categoryKey: 'machu',
      location: 'Machu Picchu Pueblo',
      duration: lang === 'en' ? '2 Days / 1 Night' : lang === 'pt' ? '2 Dias / 1 Noite' : lang === 'fr' ? '2 Jours / 1 Nuit' : lang === 'it' ? '2 Giorni / 1 Notte' : '2 Días / 1 Noche',
      price: '$340 USD',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2029&auto=format&fit=crop',
      tag: lang === 'en' ? 'Recommended' : lang === 'pt' ? 'Recomendado' : lang === 'fr' ? 'Recommandé' : lang === 'it' ? 'Consigliato' : 'Recomendado',
      badge: '5.0 ★'
    },
    {
      id: '6',
      title: lang === 'en' ? 'Huacachina Oasis & Ballestas Islands' : lang === 'pt' ? 'Huacachina Oasis & Ilhas Ballestas' : lang === 'fr' ? 'Oasis de Huacachina & Îles Ballestas' : lang === 'it' ? 'Oasi di Huacachina & Isole Ballestas' : 'Huacachina Oasis & Islas Ballestas',
      category: lang === 'en' ? 'Desert & Wildlife' : lang === 'pt' ? 'Costa & Deserto' : lang === 'fr' ? 'Désert & Faune' : lang === 'it' ? 'Deserto & Fauna' : 'Costa & Desierto',
      categoryKey: 'adrenalina',
      location: 'Ica - Paracas',
      duration: 'Full Day',
      price: '$95 USD',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop',
      tag: lang === 'en' ? 'Adrenaline' : lang === 'pt' ? 'Adrenalina' : lang === 'fr' ? 'Adrénaline' : lang === 'it' ? 'Adrenalina' : 'Adrenalina',
      badge: '4.8 ★'
    }
  ];

  const tourLimit = isFree ? 1 : isBasic ? 3 : 6;
  const displayTours = DEFAULT_FEATURED_TOURS.slice(0, tourLimit);

  // -----------------------------------------------------------
  // 7. PAQUETES TURÍSTICOS MULTI-IDIOMA
  // -----------------------------------------------------------
  const PACK_TOURS = [
    {
      id: 'p1',
      title: lang === 'en' ? 'Cusco Magic 4 Days / 3 Nights' : lang === 'pt' ? 'Cusco Mágico 4 Dias / 3 Noites' : lang === 'fr' ? 'Cusco Magique 4 Jours / 3 Nuits' : lang === 'it' ? 'Cusco Magico 4 Giorni / 3 Notti' : 'Cusco Mágico 4 Días / 3 Noches',
      category: lang === 'en' ? 'Classic Package' : lang === 'pt' ? 'Pacote Clássico' : lang === 'fr' ? 'Forfait Classique' : lang === 'it' ? 'Pacchetto Classico' : 'Paquete Clásico',
      duration: lang === 'en' ? '4 Days / 3 Nights' : lang === 'pt' ? '4 Dias / 3 Noites' : lang === 'fr' ? '4 Jours / 3 Nuits' : lang === 'it' ? '4 Giorni / 3 Notti' : '4 Días / 3 Noches',
      price: '$420 USD',
      image: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=2074&auto=format&fit=crop',
      badge: '4.9 ★'
    },
    {
      id: 'p2',
      title: lang === 'en' ? 'Total Cusco Adventure 5 Days' : lang === 'pt' ? 'Cusco Aventura Total 5 Dias' : lang === 'fr' ? 'Aventure Totale à Cusco 5 Jours' : lang === 'it' ? 'Avventura Totale a Cusco 5 Giorni' : 'Cusco Aventura Total 5 Días',
      category: lang === 'en' ? 'Altitude Trekking' : lang === 'pt' ? 'Aventura & Altitude' : lang === 'fr' ? 'Trekking & Altitude' : lang === 'it' ? 'Trekking & Altitudine' : 'Aventura & Altura',
      duration: lang === 'en' ? '5 Days / 4 Nights' : lang === 'pt' ? '5 Dias / 4 Noites' : lang === 'fr' ? '5 Jours / 4 Nuits' : lang === 'it' ? '5 Giorni / 4 Notti' : '5 Días / 4 Noches',
      price: '$490 USD',
      image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?q=80&w=2070&auto=format&fit=crop',
      badge: '5.0 ★'
    },
    {
      id: 'p3',
      title: lang === 'en' ? 'Dream Peru: Lima, Ica & Cusco' : lang === 'pt' ? 'Peru dos Sonhos: Lima, Ica & Cusco' : lang === 'fr' ? 'Pérou de Rêve : Lima, Ica & Cusco' : lang === 'it' ? 'Perù da Sogno: Lima, Ica & Cusco' : 'Perú Soñado: Lima, Ica & Cusco',
      category: lang === 'en' ? 'National Circuit' : lang === 'pt' ? 'Circuito Nacional' : lang === 'fr' ? 'Circuit National' : lang === 'it' ? 'Circuito Nazionale' : 'Circuito Nacional',
      duration: lang === 'en' ? '7 Days / 6 Nights' : lang === 'pt' ? '7 Dias / 6 Noites' : lang === 'fr' ? '7 Jours / 6 Nuits' : lang === 'it' ? '7 Giorni / 6 Notti' : '7 Días / 6 Noches',
      price: '$780 USD',
      image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop',
      badge: '4.9 ★'
    }
  ];

  // -----------------------------------------------------------
  // 8. TESTIMONIOS MULTI-IDIOMA
  // -----------------------------------------------------------
  const getLocalizedTestimonials = () => {
    return [
      {
        name: 'Alejandro & Marcela',
        origin: lang === 'en' ? 'Madrid, Spain' : lang === 'pt' ? 'Madri, Espanha' : lang === 'fr' ? 'Madrid, Espagne' : lang === 'it' ? 'Madrid, Spagna' : 'Madrid, España',
        comment: lang === 'en' 
          ? 'The best trip of our lives. Carlos our guide explained Andean history with immense passion and oxygen support was always on point.'
          : lang === 'pt'
          ? 'A melhor viagem da nossa vida. Nosso guia explicou a história inca com imensa paixão e o oxigênio esteve sempre disponível.'
          : lang === 'fr'
          ? 'Le meilleur voyage de notre vie. Notre guide nous a raconté l’histoire avec une passion incroyable et l’assistance oxygène était parfaite.'
          : lang === 'it'
          ? 'Il miglior viaggio della nostra vita. La nostra guida ci ha raccontato la storia con grandissima passione e l’ossigeno era sempre pronto.'
          : 'La mejor experiencia de nuestra vida en Perú. Nuestro guía nos explicó la historia con una pasión inolvidable y el oxígeno siempre estuvo a mano.',
        rating: 5
      },
      {
        name: 'David Miller',
        origin: 'California, USA',
        comment: lang === 'es'
          ? 'Cero estrés, el tren panorámico fue alucinante y la atención personalizada insuperable. ¡Vale cada dólar invertido!'
          : lang === 'pt'
          ? 'Zero estresse, o trem panorâmico foi deslumbrante e o atendimento impecável. Valeu cada centavo investido!'
          : lang === 'fr'
          ? 'Zéro stress, le train panoramique était magnifique et le service irréprochable. Ça vaut chaque dollar investi !'
          : lang === 'it'
          ? 'Zero stress, il treno panoramico è stato mozzafiato e il servizio impeccabile. Vale ogni singolo dollaro!'
          : 'Zero stress, scenic train was stunning. Worth every single dollar. 100% recommended!',
        rating: 5
      },
      {
        name: 'Camila & Laurent',
        origin: lang === 'en' ? 'Lyon, France' : lang === 'pt' ? 'Lyon, França' : lang === 'fr' ? 'Lyon, France' : lang === 'it' ? 'Lione, Francia' : 'Lyon, Francia',
        comment: lang === 'en'
          ? 'Flawless organization from airport pickup to summit. Oxygen assistance was always ready and tickets secured seamlessly.'
          : lang === 'pt'
          ? 'Organização impecável do aeroporto até o topo. Equipe atenciosa com o oxigênio e ingressos sempre pontuais.'
          : lang === 'fr'
          ? 'Organisation impeccable de la prise en charge à l’aéroport jusqu’au sommet. Équipe aux petits soins avec l’oxygène.'
          : lang === 'it'
          ? 'Organizzazione impeccabile dall’aeroporto alla vetta. Personale premuroso con l’ossigeno e biglietti perfetti.'
          : 'Organización impecable de principio a fin. El equipo siempre atento con el oxígeno y los boletos puntuales.',
        rating: 5
      }
    ];
  };

  // 9. Manejo de clics en acciones
  const handleActionClick = (tourName?: string, actionType?: 'whatsapp' | 'quote') => {
    const targetType = actionType || (objective === 'both' ? 'whatsapp' : objective);
    if (targetType === 'quote') {
      setSelectedTourForQuote(tourName || brandName);
      setIsQuoteOpen(true);
    } else {
      const msg = tourName 
        ? (lang === 'en' ? `Hello ${brandName}, I would like to book the "${tourName}" tour.` : lang === 'pt' ? `Olá ${brandName}, gostaria de reservar o passeio "${tourName}".` : lang === 'fr' ? `Bonjour ${brandName}, je souhaite réserver le circuit "${tourName}".` : lang === 'it' ? `Ciao ${brandName}, vorrei prenotare il tour "${tourName}".` : `Hola ${brandName}, deseo reservar el tour "${tourName}".`)
        : (lang === 'en' ? `Hello ${brandName}, I would like information about your tours in Cusco.` : lang === 'pt' ? `Olá ${brandName}, gostaria de informações sobre seus passeios em Cusco.` : lang === 'fr' ? `Bonjour ${brandName}, j’aimerais des informations sur vos circuits à Cusco.` : lang === 'it' ? `Ciao ${brandName}, vorrei informazioni sui vostri tour a Cusco.` : `Hola ${brandName}, deseo información sobre sus tours en Cusco.`);
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    }
  };

  // 10. Objeto sintético para QuoteModal
  const syntheticLanding: LandingData = {
    id: data?.id || 'agency-portal-preview',
    name: selectedTourForQuote ? `${brandName} - ${selectedTourForQuote}` : (data?.name || brandName),
    slug: data?.slug || 'cusco-tours',
    tier: planTier,
    guideName: guideName,
    whatsapp: whatsappNumber,
    price: data?.price || '$45 USD',
    duration: data?.duration || 'Full Day',
    difficulty: data?.difficulty || 'Moderada',
    objective: objective,
    template: 'agency-portal',
    language: lang,
    languages: data?.languages || ['es', 'en', 'pt', 'fr', 'it'],
    status: 'published',
    date: '2026-09-17',
    views: '1,420',
    hero: {
      badge: heroBadge,
      title: heroTitle,
      subtitle: heroSubtitle,
      cta: heroCtaLabel
    },
    about: {
      title: data?.about?.title || 'Sobre Nosotros',
      content: data?.about?.content || 'Operador turístico oficial y formal en Cusco.'
    },
    features: {
      title: data?.features?.title || 'Beneficios Oficiales',
      items: data?.features?.items || ['Guías Oficiales Acreditados', 'Balón de Oxígeno en Ruta', 'Salidas Diarias']
    }
  };

  // Idiomas seleccionados en el generador (Paso 4)
  const activeLanguages: LanguageType[] = (data?.languages && data.languages.length > 0)
    ? data.languages
    : (['es', 'en', 'pt', 'fr', 'it'] as LanguageType[]);

  return (
    <div className={`min-h-screen bg-[#FDFDFD] text-stone-900 font-sans selection:bg-[#FF5500] selection:text-white w-full max-w-full overflow-x-hidden pb-16 sm:pb-0 ${isMobile ? 'text-xs' : ''}`}>
      
      {/* 1. TOP ANNOUNCEMENT BAR CON SELECTOR DE IDIOMAS */}
      <div className="bg-[#1C1917] text-white text-[11px] py-1.5 sm:py-2 px-2.5 sm:px-6 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Left: Contact Info */}
          <div className="flex items-center gap-2 sm:gap-5 min-w-0">
            <a 
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-stone-300 hover:text-[#FF5500] transition-colors font-mono shrink-0 text-[10px] sm:text-[11px]"
              title="Atención inmediata por WhatsApp"
            >
              <Phone size={11} className="text-[#FF5500] shrink-0 sm:w-3 sm:h-3" />
              <span className="font-bold">+{whatsappNumber}</span>
            </a>
            <span className="hidden md:flex items-center gap-1.5 text-stone-400 truncate text-[10px]">
              <Mail size={12} className="text-[#FF5500] shrink-0" />
              <span className="truncate">reservas@{brandName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 16) || 'tours'}.pe</span>
            </span>
          </div>
          
          {/* Right: Badge & Language Selector */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1 bg-[#FF5500]/15 text-[#FF8844] font-bold px-2.5 py-0.5 rounded-full text-[10px] border border-[#FF5500]/30 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {t.officialBar}
            </span>

            {/* Language Selector: Sleek, compact and responsive */}
            <div className="flex items-center bg-stone-800/90 rounded-lg p-0.5 border border-stone-700/80 shadow-xs">
              {activeLanguages.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-1 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold uppercase transition-all cursor-pointer flex items-center gap-0.5 sm:gap-1 shrink-0 ${
                    lang === l 
                      ? 'bg-[#FF5500] text-white shadow-xs font-black' 
                      : 'text-stone-400 hover:text-white'
                  }`}
                  title={l === 'es' ? 'Español' : l === 'en' ? 'English' : l === 'pt' ? 'Português' : l === 'fr' ? 'Français' : 'Italiano'}
                >
                  <span className="text-[10px] sm:text-xs leading-none">{l === 'es' ? '🇵🇪' : l === 'en' ? '🇺🇸' : l === 'pt' ? '🇧🇷' : l === 'fr' ? '🇫🇷' : '🇮🇹'}</span>
                  <span className="hidden xs:inline sm:inline text-[8px] sm:text-[10px]">{l.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 2. MAIN HEADER (RESPONSIVE) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 h-14 sm:h-20 flex items-center justify-between gap-2 sm:gap-3">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-[#FF5500] to-[#FF8800] flex items-center justify-center text-white font-black shadow-md shadow-[#FF5500]/30 shrink-0">
              <Compass size={17} className="sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 max-w-[130px] xs:max-w-[170px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[260px] xl:max-w-[320px]">
              <span className="font-extrabold text-[11px] sm:text-base md:text-lg tracking-tight text-stone-900 block leading-tight truncate">
                {brandName.toUpperCase()}
              </span>
              <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-wider text-stone-500 block truncate">
                {t.officialOperator}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Always single line with whitespace-nowrap) */}
          {!isFree && !isMobile && (
            <nav className="hidden lg:flex items-center gap-3.5 xl:gap-6 text-xs xl:text-[13px] font-bold text-stone-700 tracking-wide uppercase">
              <a href="#tours" className="whitespace-nowrap hover:text-[#FF5500] transition-colors py-1">{t.navTours}</a>
              <a href="#galeria" className="whitespace-nowrap hover:text-[#FF5500] transition-colors py-1">{t.navGallery}</a>
              {!isBasic && <a href="#paquetes" className="whitespace-nowrap hover:text-[#FF5500] transition-colors py-1">{t.navPackages}</a>}
              <a href="#por-que-nosotros" className="whitespace-nowrap hover:text-[#FF5500] transition-colors py-1">{t.navWhyUs}</a>
              {!isBasic && <a href="#resenas" className="whitespace-nowrap hover:text-[#FF5500] transition-colors py-1">{t.navReviews}</a>}
              <a href="#soporte-faq" className="whitespace-nowrap hover:text-[#FF5500] transition-colors py-1">{t.navFaq}</a>
            </nav>
          )}

          {/* Right Action Buttons & Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {objective === 'both' ? (
              <>
                <button
                  type="button"
                  onClick={() => handleActionClick(undefined, 'whatsapp')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] sm:text-xs font-black p-2 sm:px-3.5 sm:py-2.5 rounded-full shadow-md transition-all flex items-center gap-1 cursor-pointer shrink-0"
                  title="WhatsApp"
                >
                  <MessageCircle size={14} />
                  <span className="hidden xs:inline">WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleActionClick(undefined, 'quote')}
                  className="shimmer-btn bg-gradient-to-r from-[#FF5500] via-[#FF6611] to-[#FF3500] hover:from-[#E04B00] hover:to-[#FF5500] text-white text-[11px] sm:text-xs font-black px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-md transition-all flex items-center gap-1 cursor-pointer shrink-0 whitespace-nowrap"
                >
                  <FileText size={13} />
                  <span className="sm:hidden">{lang === 'en' ? 'Quote' : 'Cotizar'}</span>
                  <span className="hidden sm:inline">{t.ctaHeroQuote}</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => handleActionClick()}
                className="shimmer-btn bg-gradient-to-r from-[#FF5500] via-[#FF6611] to-[#FF3500] hover:from-[#E04B00] hover:to-[#FF5500] text-white text-[11px] sm:text-xs font-black px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md shadow-[#FF5500]/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer group shrink-0 whitespace-nowrap"
              >
                {objective === 'quote' ? <FileText size={13} /> : <MessageCircle size={13} className="group-hover:rotate-12 transition-transform duration-300 shrink-0" />}
                <span className={isMobile ? 'inline' : 'sm:hidden'}>{objective === 'quote' ? (lang === 'en' ? 'Quote' : 'Cotizar') : 'WhatsApp'}</span>
                {!isMobile && <span className="hidden sm:inline">{objective === 'quote' ? t.ctaHeroQuote : t.ctaHeader}</span>}
              </button>
            )}

            {/* Mobile Hamburger Toggle Button */}
            {!isFree && (
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`${isMobile ? 'flex' : 'lg:hidden'} p-1.5 sm:p-2 rounded-xl text-stone-700 hover:text-[#FF5500] hover:bg-stone-100 transition-colors cursor-pointer shrink-0 ml-0.5`}
                aria-label="Menú de navegación"
              >
                {mobileMenuOpen ? <X size={20} className="sm:w-[22px] sm:h-[22px]" /> : <Menu size={20} className="sm:w-[22px] sm:h-[22px]" />}
              </button>
            )}
          </div>

        </div>

        {/* MOBILE NAVIGATION DRAWER (Desplegable limpio y ordenado en Móvil) */}
        {!isFree && mobileMenuOpen && (
          <div className={`${isMobile ? 'block' : 'lg:hidden'} border-t border-stone-200 bg-white/98 backdrop-blur-xl px-4 py-5 shadow-2xl transition-all`}>
            <div className="space-y-4">
              
              {/* Navigation Links Grid */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="#tours"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 hover:bg-[#FF5500]/10 text-stone-800 hover:text-[#FF5500] font-bold text-xs transition-colors"
                >
                  <MapPin size={15} className="text-[#FF5500] shrink-0" />
                  <span>{t.navTours}</span>
                </a>
                <a
                  href="#galeria"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 hover:bg-[#FF5500]/10 text-stone-800 hover:text-[#FF5500] font-bold text-xs transition-colors"
                >
                  <Pin size={15} className="text-[#FF5500] shrink-0" />
                  <span>{t.navGallery}</span>
                </a>
                {!isBasic && (
                  <a
                    href="#paquetes"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 hover:bg-[#FF5500]/10 text-stone-800 hover:text-[#FF5500] font-bold text-xs transition-colors"
                  >
                    <Backpack size={15} className="text-[#FF5500] shrink-0" />
                    <span>{t.navPackages}</span>
                  </a>
                )}
                <a
                  href="#por-que-nosotros"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 hover:bg-[#FF5500]/10 text-stone-800 hover:text-[#FF5500] font-bold text-xs transition-colors"
                >
                  <ShieldCheck size={15} className="text-[#FF5500] shrink-0" />
                  <span>{t.navWhyUs}</span>
                </a>
                {!isBasic && (
                  <a
                    href="#resenas"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 hover:bg-[#FF5500]/10 text-stone-800 hover:text-[#FF5500] font-bold text-xs transition-colors"
                  >
                    <Star size={15} className="text-amber-500 shrink-0" />
                    <span>{t.navReviews}</span>
                  </a>
                )}
                <a
                  href="#soporte-faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 hover:bg-[#FF5500]/10 text-stone-800 hover:text-[#FF5500] font-bold text-xs transition-colors"
                >
                  <BadgeCheck size={15} className="text-[#FF5500] shrink-0" />
                  <span>{t.navFaq}</span>
                </a>
              </div>

              {/* Selector de Idiomas en Móvil */}
              <div className="pt-3 border-t border-stone-100">
                <span className="text-[10px] font-black uppercase text-stone-400 block mb-2 tracking-wider">
                  {lang === 'en' ? 'Select Language' : lang === 'pt' ? 'Selecionar Idioma' : lang === 'fr' ? 'Sélectionner la Langue' : lang === 'it' ? 'Seleziona Lingua' : 'Seleccionar Idioma'}
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {activeLanguages.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => { setLang(l); setMobileMenuOpen(false); }}
                      className={`p-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        lang === l 
                          ? 'bg-[#FF5500] text-white shadow-md font-black ring-2 ring-[#FF5500]/30' 
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      <span className="text-base leading-none">{l === 'es' ? '🇵🇪' : l === 'en' ? '🇺🇸' : l === 'pt' ? '🇧🇷' : l === 'fr' ? '🇫🇷' : '🇮🇹'}</span>
                      <span className="uppercase text-[10px] font-bold">{l}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Acciones directas en Móvil */}
              <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); handleActionClick(undefined, 'whatsapp'); }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <MessageCircle size={16} />
                  <span>{lang === 'en' ? 'Chat on WhatsApp' : lang === 'pt' ? 'Conversar no WhatsApp' : lang === 'fr' ? 'Discuter sur WhatsApp' : lang === 'it' ? 'Chatta su WhatsApp' : 'Chatear por WhatsApp'} (+{whatsappNumber})</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); handleActionClick(undefined, 'quote'); }}
                  className="w-full bg-gradient-to-r from-[#FF5500] to-[#FF3500] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <FileText size={16} />
                  <span>{t.ctaHeroQuote}</span>
                </button>
              </div>

              {/* Distintivo Oficial Safe Travels */}
              <div className="pt-2 text-center text-[10px] text-stone-400 font-medium">
                {t.officialBar}
              </div>

            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION (PASO 2: FOTOGRAFÍA DE PORTADA & OBJETIVO COMERCIAL) */}
      <section className={`relative ${isMobile ? 'min-h-[380px] py-8 px-3' : 'min-h-[420px] sm:min-h-[520px] lg:min-h-[600px] py-10 sm:py-16 px-4 sm:px-6'} flex items-center justify-center overflow-hidden w-full max-w-full`}>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={heroImage}
            alt={heroTitle}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105 animate-pulse-glow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
        </div>

        {/* Ambient Glass Badges en Desktop */}
        {!isFree && !isMobile && (
          <>
            <div className="hidden xl:flex animate-float-slow absolute left-8 top-1/3 z-20 bg-black/45 backdrop-blur-xl border border-white/20 p-3.5 rounded-2xl items-center gap-3 shadow-2xl hover:scale-105 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                <Star size={20} className="fill-amber-400" />
              </div>
              <div className="text-left text-xs">
                <p className="font-extrabold text-white">{t.ratingLabel}</p>
                <p className="text-[10px] text-stone-300">{t.reviewsCount}</p>
              </div>
            </div>

            <div className="hidden xl:flex animate-float-reverse absolute right-8 bottom-1/4 z-20 bg-black/45 backdrop-blur-xl border border-white/20 p-3.5 rounded-2xl items-center gap-3 shadow-2xl hover:scale-105 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                <ShieldCheck size={20} />
              </div>
              <div className="text-left text-xs">
                <p className="font-extrabold text-white">{t.officialBadge}</p>
                <p className="text-[10px] text-stone-300">{t.officialDesc}</p>
              </div>
            </div>
          </>
        )}

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white space-y-4 sm:space-y-6 w-full">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-extrabold uppercase tracking-widest border border-white/30 shadow-lg">
            <Sparkles size={12} className="text-[#FF8844]" />
            <span>{heroBadge}</span>
          </div>

          <h1 className={`${isMobile ? 'text-2xl sm:text-4xl' : 'text-2xl xs:text-3xl sm:text-5xl lg:text-6xl'} font-black tracking-tight drop-shadow-2xl uppercase px-2 leading-tight`}>
            {heroTitle}
          </h1>
          <p className={`${isMobile ? 'text-xs line-clamp-3' : 'text-xs sm:text-base lg:text-lg line-clamp-3 sm:line-clamp-none'} font-light text-stone-100 max-w-2xl mx-auto drop-shadow-md leading-relaxed px-2`}>
            {heroSubtitle}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 max-w-md mx-auto sm:max-w-none w-full">
            {objective === 'both' ? (
              <>
                <button
                  onClick={() => handleActionClick(undefined, 'whatsapp')}
                  className="shimmer-btn w-full sm:w-auto bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-black text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 group ring-2 ring-white/25"
                >
                  <MessageCircle size={16} />
                  <span>{t.ctaBothWa}</span>
                </button>
                <button
                  onClick={() => handleActionClick(undefined, 'quote')}
                  className="shimmer-btn w-full sm:w-auto bg-gradient-to-r from-[#FF5500] via-[#FF6611] to-[#FF3000] hover:from-[#E04500] hover:to-[#FF5500] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-black text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-lg shadow-[#FF5500]/40 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 group ring-2 ring-white/25"
                >
                  <FileText size={16} />
                  <span>{t.ctaBothQuote}</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => handleActionClick()}
                className="shimmer-btn w-full sm:w-auto bg-gradient-to-r from-[#FF5500] via-[#FF6611] to-[#FF3000] hover:from-[#E04500] hover:to-[#FF5500] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-black text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-lg shadow-[#FF5500]/40 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 group ring-2 ring-white/25"
              >
                <span>{heroCtaLabel}</span>
                <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-200 animate-bounce-x" />
              </button>
            )}

            {!isFree && (
              <a
                href="#tours"
                className="w-full sm:w-auto bg-white/15 hover:bg-white/30 backdrop-blur-xl text-white px-6 sm:px-8 py-2.5 sm:py-4 rounded-full font-black text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-md border border-white/35 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>{t.ctaViewMore}</span>
                <ChevronDown size={15} className="group-hover:translate-y-0.5 transition-transform duration-200 animate-bounce" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 4. BARRA DE MÉTRICAS */}
      <section className="bg-white border-b border-stone-200 py-4 sm:py-8 shadow-xs">
        <div className="max-w-6xl mx-auto px-3 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-6 divide-x-0 md:divide-x divide-stone-100 text-center">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-stone-50/80 sm:bg-transparent space-y-0.5 sm:space-y-1 border border-stone-100 sm:border-0">
              <span className="text-lg sm:text-4xl font-black text-stone-900 tracking-tight block animate-number-glow">+10,000</span>
              <span className="text-[11px] sm:text-sm font-bold text-stone-700 block">{t.statTravelers}</span>
              <span className="text-[9px] sm:text-[11px] text-stone-400 block truncate">{lang === 'en' ? 'In Cusco & Peru' : 'En Cusco y Perú'}</span>
            </div>

            <div className="p-2.5 sm:p-3 rounded-2xl bg-stone-50/80 sm:bg-transparent space-y-0.5 sm:space-y-1 border border-stone-100 sm:border-0">
              <span className="text-lg sm:text-4xl font-black text-[#FF5500] tracking-tight block animate-pulse-subtle">10+</span>
              <span className="text-[11px] sm:text-sm font-bold text-stone-700 block">{t.statExperience}</span>
              <span className="text-[9px] sm:text-[11px] text-stone-400 block truncate">{lang === 'en' ? 'Local Operator' : 'Operador Local'}</span>
            </div>

            <div className="p-2.5 sm:p-3 rounded-2xl bg-stone-50/80 sm:bg-transparent space-y-0.5 sm:space-y-1 border border-stone-100 sm:border-0">
              <span className="text-lg sm:text-4xl font-black text-stone-900 tracking-tight block animate-number-glow">50+</span>
              <span className="text-[11px] sm:text-sm font-bold text-stone-700 block">{t.statRoutes}</span>
              <span className="text-[9px] sm:text-[11px] text-stone-400 block truncate">{lang === 'en' ? 'Peru & Andes' : 'Perú y Andes'}</span>
            </div>

            <div className="p-2.5 sm:p-3 rounded-2xl bg-stone-50/80 sm:bg-transparent space-y-0.5 sm:space-y-1 border border-stone-100 sm:border-0">
              <span className="text-lg sm:text-4xl font-black text-[#FF5500] tracking-tight block animate-pulse-subtle">4.9 ★</span>
              <span className="text-[11px] sm:text-sm font-bold text-stone-700 block">{t.statRating}</span>
              <span className="text-[9px] sm:text-[11px] text-stone-400 block truncate">Google Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 FICHA TÉCNICA DEL TOUR (PUNTO 6) & PERFIL DEL GUÍA COLEGIADO (PUNTO 7) */}
      <section className="py-8 sm:py-14 bg-gradient-to-b from-stone-50 to-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 lg:grid-cols-12 gap-6'} items-stretch`}>
            
            {/* Left: Especificaciones Técnicas (7 cols) */}
            <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-7'} bg-white rounded-3xl p-4 sm:p-7 border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 sm:space-y-5`}>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF5500]/10 text-[#FF5500] text-[10px] font-black uppercase tracking-wider">
                    <Compass size={12} /> {t.techSheetBadge}
                  </span>
                  <span className="text-[10px] bg-stone-100 text-stone-700 font-extrabold px-2.5 py-0.5 rounded-full border border-stone-200">
                    {translateText(data?.name || brandName, lang)}
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-stone-900 tracking-tight">
                  {t.techSheetTitle}
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  {translateText(data?.about?.content || data?.hero?.subtitle || t.techSheetDesc, lang)}
                </p>
              </div>

              {/* Grid 6 Especificaciones: Adaptable y sin cortes de texto */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-stone-50 border border-stone-100 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                    <Mountain size={13} className="text-[#FF5500] shrink-0" />
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase">{t.altitudeLabel}</span>
                  </div>
                  <span className="text-[11px] sm:text-sm font-extrabold text-stone-900 block leading-tight break-words">{translateText(data?.altitude || '3,400 msnm', lang)}</span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-2xl bg-stone-50 border border-stone-100 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                    <Clock size={13} className="text-[#FF5500] shrink-0" />
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase">{t.durationLabel}</span>
                  </div>
                  <span className="text-[11px] sm:text-sm font-extrabold text-stone-900 block leading-tight break-words">{getLocalizedDuration(data?.duration)}</span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-2xl bg-stone-50 border border-stone-100 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                    <Award size={13} className="text-[#FF5500] shrink-0" />
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase">{t.difficultyLabel}</span>
                  </div>
                  <span className="text-[11px] sm:text-sm font-extrabold text-stone-900 block leading-tight break-words">{getLocalizedDifficulty(data?.difficulty)}</span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-2xl bg-stone-50 border border-stone-100 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                    <Users size={13} className="text-[#FF5500] shrink-0" />
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase">{t.groupTypeLabel}</span>
                  </div>
                  <span className="text-[11px] sm:text-sm font-extrabold text-stone-900 block leading-tight break-words">{getLocalizedGroupType(data?.groupType)}</span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-2xl bg-stone-50 border border-stone-100 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                    <Target size={13} className="text-[#FF5500] shrink-0" />
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase">{t.targetAudienceLabel}</span>
                  </div>
                  <span className="text-[11px] sm:text-sm font-extrabold text-stone-900 block leading-tight break-words">{getLocalizedTargetAudience(data?.targetAudience)}</span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-2xl bg-stone-50 border border-stone-100 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                    <MapPin size={13} className="text-[#FF5500] shrink-0" />
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase">{t.destinationLabel}</span>
                  </div>
                  <span className="text-[11px] sm:text-sm font-extrabold text-stone-900 block leading-tight break-words">{translateText(destination, lang)}</span>
                </div>
              </div>
            </div>

            {/* Right: Perfil del Guía Oficial Colegiado (5 cols) con Imagen Real de Fondo */}
            <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-5'} relative rounded-3xl overflow-hidden p-5 sm:p-7 border border-stone-700/80 shadow-xl flex flex-col justify-between space-y-4 group min-h-[340px]`}>
              {/* Imagen de Fondo del Guía de Turismo */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                  src={data?.guideAvatar || "/images/tour-guide-carlos.jpg"}
                  alt={guideName}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Degradado oscuro para asegurar perfecta legibilidad de textos y botones */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/85 to-stone-900/65" />
                <div className="absolute inset-0 backdrop-blur-[0.5px]" />
              </div>

              {/* Contenido en primer plano (z-10) */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/25 text-emerald-300 text-[10px] font-black uppercase tracking-wider mb-3.5 border border-emerald-400/40 backdrop-blur-md shadow-sm">
                  <BadgeCheck size={13} className="text-emerald-400" /> {t.guideBadge}
                </div>
                
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="w-14 h-14 rounded-2xl ring-2 ring-emerald-400/70 overflow-hidden shadow-lg shrink-0 relative bg-stone-800">
                    <img
                      src={data?.guideAvatar || "/images/tour-guide-carlos.jpg"}
                      alt={guideName}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white tracking-tight drop-shadow-sm">{guideName}</h4>
                    <p className="text-xs text-stone-200 font-semibold">{translateText(data?.guideCert || 'Guía Oficial de Turismo DIRCETUR', lang)}</p>
                    <p className="text-[11px] text-[#FF9955] font-medium mt-0.5">🗣️ {t.guideSpokenLanguages}: {translateText(data?.guideLanguages || 'Español, English, Français, Português, Italiano', lang)}</p>
                  </div>
                </div>

                <p className="text-xs text-stone-200/95 leading-relaxed font-normal bg-stone-950/50 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
                  {t.guideBio}
                </p>
              </div>

              <div className="relative z-10 pt-3 border-t border-white/15 flex items-center justify-between gap-3 backdrop-blur-xs">
                <div>
                  <span className="text-[10px] text-stone-300 block">{t.directLine}</span>
                  <span className="text-xs font-black text-emerald-400 font-mono tracking-wide">{whatsappNumber ? `+${whatsappNumber}` : '+51 984 123 456'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleActionClick(undefined, 'whatsapp')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-600/40 hover:shadow-emerald-500/50 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4.6 SERVICIOS Y PRIVILEGIOS INCLUIDOS (PUNTO 7 DEL GENERADOR) */}
      <section className="py-8 sm:py-12 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-white rounded-3xl p-6 sm:p-9 shadow-lg border border-stone-800">
            <div className="max-w-3xl mb-6 space-y-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5500]/20 text-[#FF8844] text-[10px] sm:text-xs font-black uppercase tracking-widest border border-[#FF5500]/30">
                <CheckCircle2 size={13} /> {t.includedServicesBadge}
              </span>
              <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                {t.includedServicesTitle}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                {t.includedServicesDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {getLocalizedIncludedServices(data?.includedServices).map((srv, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF5500]/50 transition-colors">
                  <div className="w-7 h-7 rounded-xl bg-[#FF5500] text-white flex items-center justify-center shrink-0 shadow-xs font-bold text-xs mt-0.5">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm text-stone-200 font-medium leading-snug">
                    {srv}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. TOURS DESTACADOS (1 COLUMNA EN MÓVIL) */}
      <section id="tours" className="py-8 sm:py-20 px-3 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-3 px-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5500]/10 text-[#FF5500] text-[10px] sm:text-xs font-black uppercase tracking-widest">
            <Sparkles size={12} />
            <span>{t.catalogBadge}</span>
          </div>
          <h2 className="text-xl sm:text-4xl font-black text-stone-900 tracking-tight">
            {t.catalogTitle}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            {t.catalogDesc}
          </p>
        </div>

        {/* Filtro interactivo: Sin scrollbars feos y tactil */}
        {!isFree && !isBasic && (
          <div className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto sm:flex-wrap sm:justify-center mb-6 sm:mb-10 w-full max-w-full pb-2 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {[
              { key: 'all', label: t.filterAll, icon: Globe2 },
              { key: 'trekking', label: t.filterTrek, icon: MapPin },
              { key: 'machu', label: t.filterMachu, icon: Award },
              { key: 'cultura', label: t.filterCulture, icon: Compass },
              { key: 'adrenalina', label: t.filterAdrenaline, icon: Zap }
            ].map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-extrabold flex items-center gap-1.5 transition-all duration-300 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#FF5500] text-white shadow-md shadow-[#FF5500]/30 scale-102 ring-2 ring-[#FF5500]/30'
                      : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <Icon size={13} className={isActive ? 'text-white' : 'text-stone-400'} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Grilla de Tours */}
        <div className={`grid gap-4 sm:gap-8 ${
          isMobile 
            ? 'grid-cols-1 max-w-sm mx-auto' 
            : isFree 
            ? 'max-w-md mx-auto grid-cols-1' 
            : isBasic 
            ? 'grid-cols-1 md:grid-cols-3' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {displayTours
            .filter(t => isFree || isBasic || activeCategory === 'all' || t.categoryKey === activeCategory)
            .map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#FF5500]/40 transition-all duration-300 flex flex-col justify-between group w-full"
              >
                <div>
                  <div className="relative h-48 sm:h-56 w-full bg-stone-100 overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-black text-stone-900 flex items-center gap-1 shadow-md">
                      <Star size={12} className="text-amber-500 fill-amber-500" />
                      <span>{tour.badge.replace('★', '').trim()}</span>
                    </div>

                    {tour.tag && (
                      <div className="absolute top-2.5 right-2.5 bg-[#FF5500] text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                        {tour.tag}
                      </div>
                    )}

                    <div className="absolute bottom-2.5 left-2.5 text-white">
                      <span className="text-[11px] font-bold text-stone-200 block uppercase tracking-wider">
                        {tour.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 space-y-2.5 sm:space-y-3">
                    <h3 className="font-extrabold text-base sm:text-lg text-stone-900 leading-snug group-hover:text-[#FF5500] transition-colors">
                      {tour.title}
                    </h3>

                    <div className="flex items-center justify-between text-xs text-stone-500 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-stone-400 shrink-0" /> {tour.duration}
                      </span>
                      <span className="flex items-center gap-1 shrink-0">
                        <MapPin size={13} className="text-[#FF5500] shrink-0" /> {tour.location}
                      </span>
                    </div>

                    <div className="pt-2 sm:pt-3 flex items-baseline justify-between border-t border-stone-100">
                      <span className="text-xs text-stone-400">{t.pricePerPerson}</span>
                      <span className="text-xl font-black text-[#FF5500] animate-number-glow inline-block">{tour.price}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 pt-0">
                  <button
                    onClick={() => handleActionClick(tour.title)}
                    className="shimmer-btn w-full bg-gradient-to-r from-[#FF5500] to-[#FF3500] hover:from-[#E04500] hover:to-[#FF5500] text-white py-3 rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-[#FF5500]/20 active:scale-95 cursor-pointer group"
                  >
                    <span>{objective === 'quote' ? t.quoteTour : t.bookTour}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-200 animate-bounce-x" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* 5.5 TABLERO DE PINES DE INSPIRACIÓN & GALERÍA PINTEREST (PUNTO 1 Y ESTÉTICA PINTEREST) */}
      {!isFree && (
        <PinterestPinboard
          images={data?.galleryImages && data.galleryImages.length > 0 ? data.galleryImages : [heroImage]}
          destination={translateText(destination, lang)}
          tourName={translateText(data?.name || brandName, lang)}
          tier={planTier}
          theme="agency-portal"
          isMobile={isMobile}
          lang={lang}
        />
      )}

      {/* 6. ITINERARIO DÍA A DÍA DETALLADO (PUNTO 8 DEL GENERADOR) */}
      {(data?.itinerary && data.itinerary.length > 0) && (
        <section className="py-10 sm:py-20 bg-stone-900 text-white border-y border-stone-800">
          <div className="max-w-5xl mx-auto px-3 sm:px-6 space-y-6 sm:space-y-10">
            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] sm:text-xs font-black uppercase tracking-widest border border-amber-500/30">
                <Calendar size={12} /> {t.itineraryBadge}
              </span>
              <h2 className="text-xl sm:text-4xl font-black tracking-tight">
                {t.itineraryTitle}
              </h2>
              <p className="text-[11px] sm:text-sm text-stone-400">
                {t.itineraryDesc}
              </p>
            </div>

            <div className="space-y-2.5 sm:space-y-4">
              {getLocalizedItinerary(data?.itinerary).map((it, i) => (
                <div key={i} className="flex flex-col xs:flex-row gap-2.5 sm:gap-4 p-3.5 sm:p-5 rounded-2xl bg-stone-800/80 border border-stone-700 items-start w-full">
                  <div className="shrink-0 bg-[#FF5500] text-white px-2.5 sm:px-3 py-1 rounded-lg font-mono text-[10px] sm:text-xs font-black relative flex items-center gap-1.5 animate-pulse-subtle shadow-xs shadow-[#FF5500]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    <span>{it.step}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-extrabold text-xs sm:text-base text-white break-words">{it.title}</h4>
                    <p className="text-[11px] sm:text-xs text-stone-300 mt-0.5 leading-relaxed break-words">{it.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6.1 LOGÍSTICA: QUÉ NO INCLUYE & QUÉ LLEVAR EN LA MOCHILA (PUNTO 9 DEL GENERADOR) */}
      {((data?.notIncluded && data.notIncluded.length > 0) || (data?.whatToBring && data.whatToBring.length > 0)) && (
        <section className="py-10 sm:py-16 bg-stone-100 border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-3 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-1.5">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#FF5500]">
                {t.logisticsBadge}
              </span>
              <h3 className="text-xl sm:text-3xl font-black text-stone-900 tracking-tight">
                {t.logisticsTitle}
              </h3>
              <p className="text-xs text-stone-500">
                {t.logisticsDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Qué NO incluye */}
              <div className="bg-white p-5 sm:p-7 rounded-3xl border border-rose-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-rose-600 font-black text-sm sm:text-base border-b border-rose-100 pb-3">
                  <XCircle size={20} className="shrink-0" />
                  <span>{t.notIncludedTitle}</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
                  {getLocalizedNotIncluded(data?.notIncluded).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Qué llevar en la mochila */}
              <div className="bg-white p-5 sm:p-7 rounded-3xl border border-emerald-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-emerald-700 font-black text-sm sm:text-base border-b border-emerald-100 pb-3">
                  <Backpack size={20} className="shrink-0" />
                  <span>{t.whatToBringTitle}</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
                  {getLocalizedWhatToBring(data?.whatToBring).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}



      {/* 7. ¿POR QUÉ ELEGIRNOS? & PROTOCOLO DE ALTURA & DISTINTIVOS (PUNTO 10 DEL GENERADOR) */}
      <section id="por-que-nosotros" className="py-10 sm:py-24 bg-[#F9F7F4] border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 space-y-8 sm:space-y-16">
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14'} items-center`}>
            
            {/* Foto con Badge Seguro */}
            <div className="relative">
              <div className="relative h-60 sm:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 sm:border-4 border-white group">
                <Image
                  src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop"
                  alt="Guías Oficiales en Machu Picchu"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/20 text-[10px] font-bold text-white shadow-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>{t.activeGuidesNow}</span>
                </div>
              </div>

              <div className="mt-3 sm:mt-0 sm:absolute sm:-bottom-5 sm:right-6 bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-lg border border-stone-200 flex items-center gap-3">
                <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FF5500]/15 to-[#FF8800]/20 flex items-center justify-center text-[#FF5500] font-black text-sm sm:text-lg shrink-0 animate-pulse-subtle ring-2 ring-[#FF5500]/20">
                  100%
                </div>
                <div>
                  <p className="font-extrabold text-xs sm:text-sm text-stone-900">{t.satisfactionGuaranteed}</p>
                  <p className="text-[10px] text-stone-400">{guideName} • DIRCETUR</p>
                </div>
              </div>
            </div>

            {/* Pilares */}
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-1.5 sm:space-y-2">
                <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#FF5500]">
                  <ShieldCheck size={14} />
                  <span>{t.whyTrustBadge}</span>
                </div>
                <h2 className="text-xl sm:text-4xl font-black text-stone-900 tracking-tight">
                  {t.whyTitle}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {t.whySubtitle}
                </p>
              </div>

              <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3.5'} pt-1`}>
                {getLocalizedIncludedServices(data?.features?.items).slice(0, 4).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-stone-800 bg-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-stone-200 shadow-2xs">
                    <CheckCircle2 size={15} className="text-[#FF5500] shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#FFF6F0] p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#FFD9C2] space-y-1.5 shadow-xs">
                <h4 className="font-extrabold text-xs sm:text-sm text-stone-900 flex items-center gap-1.5">
                  <Award size={16} className="text-[#FF5500] shrink-0" />
                  <span>{t.altitudeProtocolTitle}</span>
                </h4>
                <p className="text-[11px] sm:text-xs text-stone-600 leading-relaxed">
                  {t.altitudeProtocolDesc}
                </p>
              </div>

              {/* Distintivos Oficiales & Sellos de Confianza (Punto 10) */}
              <div className="pt-2 border-t border-stone-200/80">
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 block mb-2.5">
                  {t.trustBadgesTitle}
                </span>
                <div className="flex flex-wrap gap-2">
                  {getLocalizedTrustBadges(data?.trustBadges).map((badge, bIdx) => (
                    <span key={bIdx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs font-bold text-stone-800 shadow-2xs">
                      <ShieldCheck size={14} className="text-[#FF5500] shrink-0" />
                      <span>{badge}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. PAQUETES TURÍSTICOS (1 COLUMNA EN MÓVIL) */}
      {!isFree && !isBasic && (
        <section id="paquetes" className="py-10 sm:py-20 bg-stone-50 border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-3 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-1 sm:space-y-2 px-2">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#FF5500]">
                {t.packagesBadge}
              </span>
              <h2 className="text-xl sm:text-4xl font-black text-stone-900 tracking-tight">
                {t.packagesTitle}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                {t.packagesDesc}
              </p>
            </div>

            <div className={`grid gap-4 sm:gap-8 ${isMobile ? 'grid-cols-1 max-w-sm mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
              {PACK_TOURS.map((tour) => (
                <div
                  key={tour.id}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between w-full"
                >
                  <div>
                    <div className="relative h-44 sm:h-48 w-full bg-stone-100 overflow-hidden">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute top-2.5 right-2.5 bg-[#FF5500] text-white px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase shadow-md">
                        {tour.badge}
                      </div>
                    </div>

                    <div className="p-4 sm:p-6 space-y-2">
                      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#FF5500]">
                        {tour.category}
                      </span>
                      <h3 className="font-extrabold text-base text-stone-900 leading-snug">
                        {tour.title}
                      </h3>
                      <p className="text-xs text-stone-500 flex items-center gap-1">
                        <Clock size={12} className="text-stone-400" /> {tour.duration}
                      </p>
                      <div className="pt-2 flex items-baseline justify-between border-t border-stone-100">
                        <span className="text-xs text-stone-400">{t.fromPrice}</span>
                        <span className="text-lg font-black text-stone-900">{tour.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 pt-0">
                    <button
                      onClick={() => handleActionClick(tour.title)}
                      className="shimmer-btn w-full bg-stone-900 hover:bg-[#FF5500] text-white py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 cursor-pointer"
                    >
                      <span>{objective === 'quote' ? t.quoteTour : t.viewItinerary}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. TESTIMONIOS VERIFICADOS (1 COLUMNA EN MÓVIL) */}
      {!isFree && !isBasic && (
        <section id="resenas" className="py-10 sm:py-20 bg-[#141211] text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 relative z-10 space-y-6 sm:space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2 px-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#FF8844] text-[10px] sm:text-xs font-black uppercase tracking-widest border border-white/10">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span>{t.reviewsBadge}</span>
              </div>
              <h2 className="text-xl sm:text-4xl font-black text-white tracking-tight">
                {t.reviewsTitle}
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
                {t.reviewsDesc}
              </p>
            </div>

            <div className={`grid gap-4 sm:gap-6 ${isMobile ? 'grid-cols-1 max-w-sm mx-auto' : 'grid-cols-1 md:grid-cols-3'}`}>
              {getLocalizedTestimonials().map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-b from-[#1F1C1A] to-[#151311] p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-stone-800 space-y-3 flex flex-col justify-between shadow-md w-full"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} size={13} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-[9px] font-bold text-stone-300 uppercase bg-white/10 px-2 py-0.5 rounded-full">
                        {t.verifiedReview}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                      &quot;{rev.comment}&quot;
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-stone-800/80 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-xs text-white">{rev.name}</h4>
                      <p className="text-[10px] text-stone-400">{rev.origin}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9.5 TURISMO SOSTENIBLE, INSIGNIAS DE REPUTACIÓN Y FEED EN VIVO #CUSCOTRAVELERS */}
      {!isFree && (
        <SustainabilityAndSocialProof lang={lang} brandName={brandName} isMobile={isMobile} />
      )}

      {/* 10. FORO DE SOPORTE & FAQ */}
      {!isFree && (
        <TourSupportAndFaqs
          faqs={data?.faqs}
          tourName={translateText(data?.name || brandName, lang)}
          whatsapp={whatsappNumber}
          guideName={guideName}
          destination={translateText(destination, lang)}
          tier={planTier}
          theme="agency-portal"
          isMobile={isMobile}
          lang={lang}
        />
      )}

      {/* 10.5 GARANTÍA DE FLEXIBILIDAD Y OFICINA FÍSICA EN CUSCO */}
      {!isFree && (
        <TrustGuaranteeAndOffice 
          lang={lang} 
          whatsapp={whatsappNumber} 
          brandName={brandName} 
          isMobile={isMobile} 
          officeAddress={data?.officeAddress}
          officeHours={data?.officeHours}
          mapsUrl={data?.mapsUrl}
        />
      )}

      {/* 11. GIANT ORANGE CTA BANNER */}
      <section className="relative bg-gradient-to-br from-[#FF4400] via-[#FF5500] to-[#E03B00] text-white py-10 sm:py-20 px-4 sm:px-6 text-center shadow-2xl overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest bg-black/25 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full inline-block backdrop-blur-md border border-white/20">
            {t.officialBar}
          </span>
          <h2 className="text-xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {t.ctaBannerTitle}
          </h2>
          <p className="text-xs sm:text-base text-orange-100 max-w-2xl mx-auto font-normal">
            {t.ctaBannerDesc}
          </p>
          <div className="pt-2">
            <button
              onClick={() => handleActionClick()}
              className="shimmer-btn w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white text-[#FF5500] hover:bg-stone-50 px-7 sm:px-9 py-3 sm:py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-white/25 group"
            >
              <span>{objective === 'quote' ? t.ctaHeroQuote : t.contactNow}</span>
              <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-200 animate-bounce-x" />
            </button>
          </div>
        </div>
      </section>

      {/* 12. BANNER DE PLAN GRATUITO */}
      {isFree && (
        <div className="bg-stone-900 text-stone-300 py-3 px-4 text-center text-[10px] sm:text-xs border-t border-stone-800">
          <p>{t.freeBanner}</p>
        </div>
      )}

      {/* 13. SELLOS DE ACREDITACIÓN OFICIAL */}
      {!isFree && (
        <section className="bg-white py-6 sm:py-8 border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-3 sm:space-y-4">
            <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-stone-400">
              {t.certificationsTitle}
            </p>
            <div className={`flex flex-wrap items-center justify-center ${isMobile ? 'gap-4' : 'gap-4 sm:gap-14'} opacity-80`}>
              <div className="flex items-center gap-1.5 text-stone-700 font-extrabold text-[11px] sm:text-xs">
                <ShieldCheck size={16} className="text-[#FF5500]" />
                <span>MINCETUR</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-700 font-extrabold text-[11px] sm:text-xs">
                <Award size={16} className="text-[#FF5500]" />
                <span>DIRCETUR</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-700 font-extrabold text-[11px] sm:text-xs">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>SAFE TRAVELS</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 14. FOOTER */}
      <footer className="bg-[#1C1917] text-stone-400 py-8 sm:py-12 px-4 sm:px-6 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-stone-500 text-[10px] sm:text-[11px] text-center sm:text-left">
          <p>{t.footerRights}</p>
          <p className="text-stone-400 font-medium">Plataforma Cusco Creativos S.A.C.</p>
        </div>
      </footer>

      {/* 15. FLOATING WHATSAPP BUTTON */}
      <div className="z-40 flex items-center gap-2 fixed bottom-5 right-5 sm:bottom-6 sm:right-6 pointer-events-auto select-none max-w-[calc(100vw-2.5rem)]">
        {showWaTooltip && !isMobile && (
          <div className="hidden sm:flex items-center gap-2 bg-white text-stone-900 text-xs font-bold px-3.5 py-2 rounded-2xl shadow-xl border border-stone-200 animate-in fade-in slide-in-from-right-2">
            <span>💬 {t.questionsTooltip}</span>
            <button
              onClick={() => setShowWaTooltip(false)}
              className="text-stone-400 hover:text-stone-700 text-xs p-0.5 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        <button
          onClick={() => handleActionClick()}
          className="relative bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 sm:p-3.5 rounded-full shadow-xl shadow-[#25D366]/40 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer ring-4 ring-[#25D366]/20 shrink-0"
          aria-label="WhatsApp"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border-2 border-[#25D366]"></span>
          </span>
          <MessageCircle size={22} className="fill-white relative z-10 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* 16. MODAL DE COTIZACIÓN */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        landing={syntheticLanding}
        lang={lang}
      />
    </div>
  );
}
