'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  Menu,
  X,
  BookOpen,
  Lock,
  Building2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Search,
  Check,
  Plus,
  Minus,
  CheckSquare,
  Square,
  Utensils,
  Bed,
  Filter,
  HelpCircle,
  Info,
  DollarSign,
  Download,
  Printer,
  Maximize2
} from 'lucide-react';
import { LandingData, PlanTier, ObjectiveType, LanguageType, CatalogTourItem, ItineraryItem } from '@/types/landing';
import { DEFAULT_SECONDARY_CATALOG_TOURS } from '@/data/defaultCatalogTours';
import { translateText, translateItineraryItem } from '@/data/translations';
import QuoteModal from '@/components/common/QuoteModal';
import ComplaintsBookModal from '@/components/common/ComplaintsBookModal';
import LegalTermsModal from '@/components/common/LegalTermsModal';
import HeaderLanguageSelector from '@/components/common/HeaderLanguageSelector';
import PinterestPinboard from '@/components/common/PinterestPinboard';
import TourSupportAndFaqs from '@/components/common/TourSupportAndFaqs';
import { getSanitizedGuideAvatar } from '@/utils/guideAvatars';
import SustainabilityAndSocialProof from '@/components/agency-portal/SustainabilityAndSocialProof';
import TrustGuaranteeAndOffice from '@/components/agency-portal/TrustGuaranteeAndOffice';
import RecentBookingsToast from '@/components/agency-portal/RecentBookingsToast';
import BrochurePrintModal from '@/components/agency-portal/BrochurePrintModal';
import LightboxModal from '@/components/agency-portal/LightboxModal';

interface ModernEmeraldTemplateProps {
  data?: Partial<LandingData>;
  isLive?: boolean;
  viewMode?: 'desktop' | 'tablet' | 'mobile';
}

const DICTIONARIES = {
  es: {
    brandTag: 'Explore. Dream. Discover.',
    navHome: 'Inicio',
    navDestinations: 'Destinos',
    navAbout: 'Nosotros',
    navTours: 'Tours',
    navItinerary: 'Itinerario',
    navServices: 'Servicios',
    navGallery: 'Galería',
    navReviews: 'Reseñas',
    navFaqs: 'FAQ & Soporte',
    navContact: 'Contacto',
    downloadBrochureBtn: 'Descargar Ficha en PDF',
    liveAdventure: 'Vive Tu Aventura.',
    searchWhere: '¿A dónde deseas ir?',
    searchDates: 'Fechas / Temporada',
    searchBtn: 'Explorar',
    passengers: 'Viajeros',
    passengerSingular: 'viajero',
    passengerPlural: 'viajeros',
    benefit1Title: 'Guías Expertos',
    benefit1Desc: 'Conocimiento local y tips auténticos',
    benefit2Title: 'Rutas a Medida',
    benefit2Desc: 'Planes flexibles para cada viajero',
    benefit3Title: 'Mejor Precio Garantizado',
    benefit3Desc: 'Tarifas directas sin intermediarios',
    popularTitle: 'Destinos Populares',
    popularSub: 'Descubre los santuarios geográficos, lagunas turquesas y maravillas arqueológicas más deseadas de los Andes.',
    destinationsBadge: '6 Destinos Emblemáticos',
    seeToursForDestination: 'Ver tours disponibles',
    viewAllToursBtn: 'Explorar Catálogo de Tours ↓',
    toursTitle: 'Tours & Expediciones de Autor',
    toursSub: 'Paquetes guiados con salidas garantizadas todo el año, grupos reducidos, tarifas directas y equipamiento de alta montaña.',
    allToursBadge: 'Circuitos en Vitrina',
    exploreBtn: 'Reservar Tour',
    planTitle: 'Planifica Tu Viaje a Cusco',
    planSub: 'Cuatro etapas clave para diseñar una expedición segura, personalizada y sin contratiempos en los Andes.',
    happyTravelers: 'Viajeros Felices',
    positiveReviews: 'Reseñas Positivas',
    curatedRoutes: 'Destinos y Rutas',
    whyTitle: '¿Por Qué Viajar Con Nosotros?',
    itineraryTitle: 'Itinerario Detallado de la Expedición',
    itinerarySub: 'Explora cada jornada con altitud, tiempo de caminata y servicios incluidos.',
    viewDayByDay: 'Vista Día a Día',
    viewFullSchedule: 'Ver Cronograma Completo',
    inclusionsTitle: 'Logística Integral de Expedición',
    inclusionsSub: 'Todo lo necesario para una experiencia segura, gastronómica y de máximo confort en los Andes.',
    includedServices: 'Servicios Incluidos',
    includedBadge: '100% Todo Incluido',
    whatToBring: 'Checklist de tu Mochila',
    whatToBringSub: 'Toca para marcar lo que ya tienes listo',
    notIncludedTitle: 'No Incluido en la Tarifa',
    officialAccreditation: 'Acreditaciones Oficiales',
    officialOperatorTitle: 'Operador Turístico Formal y Autorizado de Cusco',
    galleryTitle: 'Inspiración Visual de las Rutas',
    gallerySub: 'Postales reales capturadas por nuestros guías y viajeros en los senderos más escénicos.',
    reviewsBadge: 'Voces de Nuestros Viajeros',
    reviewsTitle: 'Voces de Nuestros Viajeros',
    reviewsSub: 'Historias auténticas de quienes ya vivieron la magia de Cusco con nuestro equipo.',
    verifiedReview: 'Verificado ✓',
    planYourTripBtn: 'Planificar Mi Viaje',
    quoteBtn: 'Solicitar Cotización',
    whatsappBtn: 'Reservar por WhatsApp',
    footerRights: 'Todos los derechos reservados. Agencia de Viajes y Turismo Autorizada.',
    complaintsBook: 'Libro de Reclamaciones Virtual',
    legalTerms: 'Términos, Condiciones & Normativa Legal',
    officialOperator: 'Operador Turístico Autorizado',
    freeBanner: 'Landing Page creada con el Plan Gratuito de Cusco Creativos. Actualiza a Pro o Advance para habilitar multilingüe, itinerario completo y reservas interactivas.'
  },
  en: {
    brandTag: 'Explore. Dream. Discover.',
    navHome: 'Home',
    navDestinations: 'Destinations',
    navAbout: 'About Us',
    navTours: 'Tours',
    navItinerary: 'Itinerary',
    navServices: 'Services',
    navGallery: 'Gallery',
    navReviews: 'Reviews',
    navFaqs: 'FAQ & Support',
    navContact: 'Contact',
    downloadBrochureBtn: 'Download Tour PDF',
    liveAdventure: 'Live Your Adventure.',
    searchWhere: 'Where to?',
    searchDates: 'Dates / Duration',
    searchBtn: 'Search',
    passengers: 'Travelers',
    passengerSingular: 'traveler',
    passengerPlural: 'travelers',
    benefit1Title: 'Expert Guides',
    benefit1Desc: 'Local insights & authentic tips',
    benefit2Title: 'Tailored Itineraries',
    benefit2Desc: 'Custom plans for every traveler',
    benefit3Title: 'Best Price Guarantee',
    benefit3Desc: 'Direct deals for your next adventure',
    popularTitle: 'Popular Destinations',
    popularSub: 'Discover the geographical sanctuaries, turquoise glacial lakes, and archaeological wonders of the Andes.',
    destinationsBadge: '6 Iconic Sanctuaries',
    seeToursForDestination: 'View available tours',
    viewAllToursBtn: 'Explore Tours Catalog ↓',
    toursTitle: 'Signature Tours & Expeditions',
    toursSub: 'Guided packages with guaranteed year-round departures, small groups, direct rates, and high-mountain equipment.',
    allToursBadge: 'Featured Circuits',
    exploreBtn: 'Book Tour',
    planTitle: 'Plan Your Trip to Cusco',
    planSub: 'Four essential steps to design a safe, tailored, and seamless expedition in the Peruvian Andes.',
    happyTravelers: 'Happy Travelers',
    positiveReviews: 'Positive Reviews',
    curatedRoutes: 'Curated Destinations',
    whyTitle: 'Why Travel With Us?',
    itineraryTitle: 'Detailed Expedition Itinerary',
    itinerarySub: 'Explore each day with altitude, hiking time, and included services.',
    viewDayByDay: 'Day by Day View',
    viewFullSchedule: 'View Full Schedule',
    inclusionsTitle: 'Comprehensive Expedition Logistics',
    inclusionsSub: 'Everything needed for a safe, gourmet, and comfortable experience in the Andes.',
    includedServices: 'Included Services',
    includedBadge: '100% All Inclusive',
    whatToBring: 'Daypack Checklist',
    whatToBringSub: 'Tap to mark what you have ready',
    notIncludedTitle: 'What Is Not Included',
    officialAccreditation: 'Official Accreditations',
    officialOperatorTitle: 'Certified & Licensed Cusco Tour Operator',
    galleryTitle: 'Visual Trail Inspiration',
    gallerySub: 'Authentic postcards captured by our guides and travelers on scenic trails.',
    reviewsBadge: 'Traveler Testimonials',
    reviewsTitle: 'What Our Travelers Say',
    reviewsSub: 'Authentic stories of travelers who experienced the magic of Cusco with our team.',
    verifiedReview: 'Verified ✓',
    planYourTripBtn: 'Plan Your Trip',
    quoteBtn: 'Request Instant Quote',
    whatsappBtn: 'Book via WhatsApp',
    footerRights: 'All rights reserved. Certified Tour Operator.',
    complaintsBook: 'Virtual Complaints Book',
    legalTerms: 'Terms, Conditions & Legal Policies',
    officialOperator: 'Authorized Tour Operator',
    freeBanner: 'Landing Page created with Cusco Creativos Free Tier. Upgrade to Pro or Advance for multi-language, full itinerary & interactive bookings.'
  },
  pt: {
    brandTag: 'Explore. Sonhe. Descubra.',
    navHome: 'Início',
    navDestinations: 'Destinos',
    navAbout: 'Sobre Nós',
    navTours: 'Tours',
    navItinerary: 'Itinerário',
    navServices: 'Serviços',
    navGallery: 'Galeria',
    navReviews: 'Avaliações',
    navFaqs: 'FAQ & Suporte',
    navContact: 'Contato',
    downloadBrochureBtn: 'Baixar Roteiro em PDF',
    liveAdventure: 'Viva Sua Aventura.',
    searchWhere: 'Para onde?',
    searchDates: 'Datas / Duração',
    searchBtn: 'Explorar',
    passengers: 'Viajantes',
    passengerSingular: 'viajante',
    passengerPlural: 'viajantes',
    benefit1Title: 'Guias Especialistas',
    benefit1Desc: 'Conhecimento local e dicas exclusivas',
    benefit2Title: 'Roteiros Sob Medida',
    benefit2Desc: 'Planos flexíveis para cada viajante',
    benefit3Title: 'Melhor Preço Garantido',
    benefit3Desc: 'Tarifas diretas sem intermediários',
    popularTitle: 'Destinos Populares',
    popularSub: 'Descubra os santuários geográficos, lagoas turquesas e maravilhas arqueológicas dos Andes.',
    destinationsBadge: '6 Destinos Emblemáticos',
    seeToursForDestination: 'Ver passeios disponíveis',
    viewAllToursBtn: 'Explorar Catálogo de Tours ↓',
    toursTitle: 'Tours & Expedições Exclusivas',
    toursSub: 'Pacotes guiados com saídas garantidas o ano todo, pequenos grupos, tarifas diretas e equipamentos de montanha.',
    allToursBadge: 'Circuitos em Vitrine',
    exploreBtn: 'Reservar Tour',
    planTitle: 'Planeje Sua Viagem a Cusco',
    planSub: 'Quatro etapas essenciais para planejar uma expedição segura, sob medida e sem imprevistos nos Andes.',
    happyTravelers: 'Viajantes Felizes',
    positiveReviews: 'Avaliações Positivas',
    curatedRoutes: 'Destinos e Rotas',
    whyTitle: 'Por Que Viajar Conosco?',
    itineraryTitle: 'Itinerário Detalhado da Expedição',
    itinerarySub: 'Explore cada dia com altitude, tempo de caminhada e serviços inclusos.',
    viewDayByDay: 'Visualização Dia a Dia',
    viewFullSchedule: 'Ver Cronograma Completo',
    inclusionsTitle: 'Logística Integral da Expedição',
    inclusionsSub: 'Tudo o que é necessário para uma experiência segura, gastronômica e de máximo conforto nos Andes.',
    includedServices: 'Serviços Incluídos',
    includedBadge: '100% Tudo Incluído',
    whatToBring: 'Checklist da sua Mochila',
    whatToBringSub: 'Toque para marcar o que você já preparou',
    notIncludedTitle: 'O Que Não Está Incluído',
    officialAccreditation: 'Acreditações Oficiais',
    officialOperatorTitle: 'Operador Turístico Formal e Autorizado de Cusco',
    galleryTitle: 'Inspiração Visual das Rotas',
    gallerySub: 'Fotos autênticas registradas por nossos guias e viajantes nas trilhas mais cênicas.',
    reviewsBadge: 'Vozes dos Nossos Viajantes',
    reviewsTitle: 'O Que Dizem os Nossos Viajantes',
    reviewsSub: 'Histórias reais de quem já viveu a magia de Cusco com nossa equipe.',
    verifiedReview: 'Verificado ✓',
    planYourTripBtn: 'Planejar Viagem',
    quoteBtn: 'Solicitar Orçamento',
    whatsappBtn: 'Reservar pelo WhatsApp',
    footerRights: 'Todos os direitos reservados. Agência de Turismo Autorizada.',
    complaintsBook: 'Livro de Reclamações Virtual',
    legalTerms: 'Termos, Condições & Políticas Legais',
    officialOperator: 'Operador Turístico Autorizado',
    freeBanner: 'Landing Page criada com o Plano Gratuito Cusco Creativos. Atualize para Pro ou Advance para multilíngue, itinerário completo e reservas interativas.'
  },
  fr: {
    brandTag: 'Explorez. Rêvez. Découvrez.',
    navHome: 'Accueil',
    navDestinations: 'Destinations',
    navAbout: 'À Propos',
    navTours: 'Tours',
    navItinerary: 'Itinéraire',
    navServices: 'Services',
    navGallery: 'Galerie',
    navReviews: 'Avis',
    navFaqs: 'FAQ & Support',
    navContact: 'Contact',
    downloadBrochureBtn: 'Télécharger la Fiche PDF',
    liveAdventure: 'Vivez Votre Aventure.',
    searchWhere: 'Où aller ?',
    searchDates: 'Dates / Durée',
    searchBtn: 'Rechercher',
    passengers: 'Voyageurs',
    passengerSingular: 'voyageur',
    passengerPlural: 'voyageurs',
    benefit1Title: 'Guides Experts',
    benefit1Desc: 'Savoir local et conseils authentiques',
    benefit2Title: 'Itinéraires Sur Mesure',
    benefit2Desc: 'Plans personnalisés pour chaque voyageur',
    benefit3Title: 'Meilleur Prix Garanti',
    benefit3Desc: 'Tarifs directs sans intermédiaires',
    popularTitle: 'Destinations Populaires',
    popularSub: 'Explorez des sanctuaires géographiques, lagunes turquoise et merveilles archéologiques des Andes.',
    destinationsBadge: '6 Destinations Remarquables',
    seeToursForDestination: 'Voir les excursions',
    viewAllToursBtn: 'Explorer le Catalogue des Tours ↓',
    toursTitle: 'Tours & Expéditions Signatures',
    toursSub: 'Circuits guidés avec départs garantis toute l’année, petits groupes, tarifs directs et équipement de montagne.',
    allToursBadge: 'Circuits en Vitrine',
    exploreBtn: 'Réserver le Tour',
    planTitle: 'Planifiez Votre Voyage à Cusco',
    planSub: 'Quatre étapes clés pour concevoir une expédition sûre, sur mesure et sans tracas dans les Andes péruviennes.',
    happyTravelers: 'Voyageurs Comblés',
    positiveReviews: 'Avis Positifs',
    curatedRoutes: 'Destinations Remarquables',
    whyTitle: 'Pourquoi Voyager Avec Nous ?',
    itineraryTitle: 'Itinéraire Détaillé',
    itinerarySub: 'Découvrez chaque étape avec altitude, temps de marche et prestations incluses.',
    viewDayByDay: 'Vue Jour par Jour',
    viewFullSchedule: 'Voir le Programme Complet',
    inclusionsTitle: 'Logistique Complète d’Expédition',
    inclusionsSub: 'Tout le nécessaire pour une expérience sûre, gastronomique et confortable dans les Andes.',
    includedServices: 'Services Inclus',
    includedBadge: '100% Tout Compris',
    whatToBring: 'Dans Votre Sac à Dos',
    whatToBringSub: 'Cochez les éléments déjà prêts',
    notIncludedTitle: 'Ce Qui N’est Pas Inclus',
    officialAccreditation: 'Agréments Officiels',
    officialOperatorTitle: 'Opérateur Touristique Officiel et Agréé de Cusco',
    galleryTitle: 'Inspiration Visuelle des Sentiers',
    gallerySub: 'Clichés authentiques capturés par nos guides et voyageurs sur les sentiers andins.',
    reviewsBadge: 'Témoignages de Voyageurs',
    reviewsTitle: 'Avis de Nos Voyageurs',
    reviewsSub: 'Récits authentiques de voyageurs ayant exploré Cusco avec notre équipe.',
    verifiedReview: 'Vérifié ✓',
    planYourTripBtn: 'Planifier Mon Séjour',
    quoteBtn: 'Demander un Devis',
    whatsappBtn: 'Réserver par WhatsApp',
    footerRights: 'Tous droits réservés. Agence Touristique Agréée.',
    complaintsBook: 'Livre de Réclamations Virtuel',
    legalTerms: 'Conditions Générales & Mentions Légales',
    officialOperator: 'Opérateur Touristique Agréé',
    freeBanner: 'Landing Page créée avec l’Offre Gratuite Cusco Creativos. Passez à Pro ou Advance pour le multilingue, l’itinéraire complet et les réservations.'
  },
  it: {
    brandTag: 'Esplora. Sogna. Scopri.',
    navHome: 'Home',
    navDestinations: 'Destinazioni',
    navAbout: 'Chi Siamo',
    navTours: 'Tour',
    navItinerary: 'Itinerario',
    navServices: 'Servizi',
    navGallery: 'Galleria',
    navReviews: 'Recensioni',
    navFaqs: 'FAQ & Supporto',
    navContact: 'Contatti',
    downloadBrochureBtn: 'Scarica Scheda in PDF',
    liveAdventure: 'Vivi La Tua Avventura.',
    searchWhere: 'Dove andare?',
    searchDates: 'Date / Durata',
    searchBtn: 'Cerca',
    passengers: 'Viaggiatori',
    passengerSingular: 'viaggiatore',
    passengerPlural: 'viaggiatori',
    benefit1Title: 'Guide Esperte',
    benefit1Desc: 'Esperienza locale e consigli autentici',
    benefit2Title: 'Itinerari Su Misura',
    benefit2Desc: 'Programmi flessibili per ogni viaggiatore',
    benefit3Title: 'Miglior Prezzo Garantito',
    benefit3Desc: 'Offerte dirette senza intermediari',
    popularTitle: 'Destinazioni Popolari',
    popularSub: 'Scopri i santuari geografici, lagune turchesi e meraviglie archeologiche delle Ande.',
    destinationsBadge: '6 Destinazioni Iconiche',
    seeToursForDestination: 'Vedi i tour disponibili',
    viewAllToursBtn: 'Esplora il Catalogo Tour ↓',
    toursTitle: 'Tour & Spedizioni Esclusive',
    toursSub: 'Pacchetti guidati con partenze garantite tutto l’anno, piccoli gruppi, tariffe dirette e attrezzature da montagna.',
    allToursBadge: 'Circuiti Selezionati',
    exploreBtn: 'Prenota il Tour',
    planTitle: 'Pianifica Il Tuo Viaggio a Cusco',
    planSub: 'Quattro passaggi fondamentali per organizzare una spedizione sicura, su misura e senza imprevisti sulle Ande peruviane.',
    happyTravelers: 'Viaggiatori Soddisfatti',
    positiveReviews: 'Recensioni Positive',
    curatedRoutes: 'Destinazioni Selezionate',
    whyTitle: 'Perché Viaggiare Con Noi?',
    itineraryTitle: 'Itinerario Dettagliato',
    itinerarySub: 'Esplora ogni tappa con quota, tempo di cammino e servizi inclusi.',
    viewDayByDay: 'Vista Giorno per Giorno',
    viewFullSchedule: 'Vedi Programma Completo',
    inclusionsTitle: 'Logistica Completa della Spedizione',
    inclusionsSub: 'Tutto il necessario per un’esperienza sicura, gastronomica e di massimo comfort sulle Ande.',
    includedServices: 'Servizi Inclusi',
    includedBadge: '100% Tutto Incluso',
    whatToBring: 'Cosa Mettere nello Zaino',
    whatToBringSub: 'Tocca per spuntare cosa è già pronto',
    notIncludedTitle: 'Cosa Non È Incluso',
    officialAccreditation: 'Accreditamenti Ufficiali',
    officialOperatorTitle: 'Tour Operator Autorizzato e Ufficiale di Cusco',
    galleryTitle: 'Ispirazione Visiva dei Percorsi',
    gallerySub: 'Scatti autentici dei nostri viaggiatori e delle guide lungo i sentieri più suggestivi.',
    reviewsBadge: 'Voci dei Nostri Viaggiatori',
    reviewsTitle: 'Cosa Dicono i Nostri Viaggiatori',
    reviewsSub: 'Storie autentiche di chi ha vissuto la magia di Cusco insieme al nostro team.',
    verifiedReview: 'Verificato ✓',
    planYourTripBtn: 'Pianifica il Viaggio',
    quoteBtn: 'Richiedi Preventivo',
    whatsappBtn: 'Prenota su WhatsApp',
    footerRights: 'Tutti i diritti riservati. Tour Operator Autorizzato.',
    complaintsBook: 'Registro Reclami Virtuale',
    legalTerms: 'Termini, Condizioni & Normativa Legale',
    officialOperator: 'Tour Operator Autorizzato',
    freeBanner: 'Landing Page creata con il Piano Gratuito Cusco Creativos. Passa a Pro o Advance per multilingua, itinerario completo e prenotazioni interattive.'
  }
};

const TESTIMONIAL_AVATARS = [
  '/images/travelers/traveler-machu-picchu.jpg',
  '/images/travelers/traveler-humantay.jpg',
  '/images/travelers/traveler-vinicunca.jpg',
  '/images/travelers/traveler-sacred-valley.jpg'
];

const POPULAR_DESTINATIONS = [
  {
    id: 'machu-picchu',
    title: 'Machu Picchu Santuario',
    tag: 'Maravilla del Mundo',
    altitude: '2,430 msnm',
    highlight: 'Ciudadela sagrada, Templo del Sol y terrazas agrícolas',
    climate: 'Subtropical templado (12°C - 24°C)',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200&auto=format&fit=crop',
    rating: 5.0,
    categoryFilter: 'classic',
    accentColor: 'from-emerald-500/30 to-teal-600/30 border-emerald-400/40 text-emerald-300'
  },
  {
    id: 'humantay',
    title: 'Laguna Humantay',
    tag: 'Turquesa Glaciar',
    altitude: '4,200 msnm',
    highlight: 'Espejo de agua glaciar a los pies del Nevado Salkantay',
    climate: 'Frío alpino / Viento de altura (4°C - 14°C)',
    image: 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=1200&auto=format&fit=crop',
    rating: 4.95,
    categoryFilter: 'trekking',
    accentColor: 'from-cyan-500/30 to-teal-600/30 border-cyan-400/40 text-cyan-300'
  },
  {
    id: 'vinicunca',
    title: 'Montaña de 7 Colores',
    tag: 'Formación Geológica',
    altitude: '5,036 msnm',
    highlight: 'Cordillera arcoíris milenaria con vista al Ausangate',
    climate: 'Alta montaña frígida (0°C - 12°C)',
    image: 'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?q=80&w=1200&auto=format&fit=crop',
    rating: 4.92,
    categoryFilter: 'trekking',
    accentColor: 'from-amber-500/30 to-rose-600/30 border-amber-400/40 text-amber-300'
  },
  {
    id: 'valle-sagrado',
    title: 'Valle Sagrado de los Incas',
    tag: 'Historia Viva & Cultura',
    altitude: '2,870 msnm',
    highlight: 'Ollantaytambo, terrazas de Pisac y ferias artesanales',
    climate: 'Templado andino acogedor (10°C - 22°C)',
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=1200&auto=format&fit=crop',
    rating: 4.97,
    categoryFilter: 'classic',
    accentColor: 'from-teal-500/30 to-emerald-600/30 border-teal-400/40 text-teal-300'
  },
  {
    id: 'maras-moray',
    title: 'Salineras de Maras & Moray',
    tag: 'Ingeniería Ancestral',
    altitude: '3,380 msnm',
    highlight: 'Más de 3,000 pozas de sal rosada y andenes circulares',
    climate: 'Soleado y seco de valle (8°C - 20°C)',
    image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=1200&auto=format&fit=crop',
    rating: 4.88,
    categoryFilter: 'fullday',
    accentColor: 'from-emerald-500/30 to-cyan-600/30 border-emerald-400/40 text-emerald-300'
  },
  {
    id: 'choquequirao',
    title: 'Choquequirao & Cañón Apurímac',
    tag: 'Aventura Mística Pura',
    altitude: '3,050 msnm',
    highlight: 'La hermana sagrada de Machu Picchu sin multitudes',
    climate: 'Templado de cañón andino (12°C - 25°C)',
    image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=1200&auto=format&fit=crop',
    rating: 4.96,
    categoryFilter: 'trekking',
    accentColor: 'from-sky-500/30 to-blue-600/30 border-sky-400/40 text-sky-300'
  }
];

export default function ModernEmeraldTemplate({ data = {}, isLive = false, viewMode = 'desktop' }: ModernEmeraldTemplateProps) {
  // 1. Jerarquía de Niveles (Tier Enforcement)
  const tier: PlanTier = data.tier || 'advance';
  const isFree = tier === 'free';
  const isBasic = tier === 'basic';
  const isPro = tier === 'pro';
  const isAdvance = tier === 'advance';
  const isFreeOrBasic = isFree || isBasic;
  const isMobile = viewMode === 'mobile';

  // 2. Idioma por Defecto y Sincronización Estricta
  const defaultLang: LanguageType = (isFree || isBasic)
    ? 'es'
    : (isPro && !['es', 'en'].includes((data.language as LanguageType) || 'es'))
      ? 'es'
      : ((data.language as LanguageType) || 'es');

  const [currentLang, setCurrentLang] = useState<LanguageType>(defaultLang);

  const prevLangPropRef = useRef(data.language);

  useEffect(() => {
    if (isFree || isBasic) {
      if (currentLang !== 'es') setCurrentLang('es');
    } else if (isPro) {
      if (prevLangPropRef.current !== data.language && data.language && ['es', 'en'].includes(data.language)) {
        setCurrentLang(data.language as LanguageType);
      } else if (!['es', 'en'].includes(currentLang)) {
        setCurrentLang('es');
      }
    } else if (prevLangPropRef.current !== data.language && data.language) {
      setCurrentLang(data.language as LanguageType);
    }
    prevLangPropRef.current = data.language;
  }, [data.language, isFree, isBasic, isPro]);

  // Modales
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isComplaintsOpen, setIsComplaintsOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTourForQuote, setSelectedTourForQuote] = useState<string>(data.name || 'Expedición Machu Picchu');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  
  // Interactive State for Advance Tier
  const [passengers, setPassengers] = useState<number>(2);
  const [currency, setCurrency] = useState<'USD' | 'PEN' | 'EUR'>('USD');
  const [tourCategory, setTourCategory] = useState<string>('all');
  const [tourPage, setTourPage] = useState<number>(0);
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);
  const [itineraryViewMode, setItineraryViewMode] = useState<'tabs' | 'all'>('tabs');
  const [checkedPacking, setCheckedPacking] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const [activeSpecModal, setActiveSpecModal] = useState<string | null>(null);

  const t = DICTIONARIES[currentLang] || DICTIONARIES.es;

  // Language Filtering Matrix (Free/Basic: 0 selectors | Pro: ES/EN | Advance: 5 languages)
  const baseLanguages: LanguageType[] = (data?.languages && data.languages.length > 0)
    ? (data.languages as LanguageType[])
    : (['es', 'en', 'pt', 'fr', 'it'] as LanguageType[]);

  const activeLanguages: LanguageType[] = isFree || isBasic
    ? ['es']
    : isPro
    ? baseLanguages.filter(l => l === 'es' || l === 'en').length > 0
      ? baseLanguages.filter(l => l === 'es' || l === 'en')
      : ['es', 'en']
    : (['es', 'en', 'pt', 'fr', 'it'] as LanguageType[]);

  const showLangSelector = (isPro || isAdvance) && activeLanguages.length > 1;

  const isWhatsapp = data.objective === 'whatsapp';
  const isQuote = data.objective === 'quote';
  const isBoth = data.objective === 'both';

  const heroImg = (data.heroImage && !data.heroImage.includes('photo-1526392060635-9d6019884377'))
    ? data.heroImage
    : '/images/hero-tourist-cusco.jpg';
  const guideName = data.guideName || 'Carlos Mendoza';
  const guideCert = translateText(data.guideCert || 'Guía Oficial DIRCETUR & Operador Autorizado', currentLang);
  const guidePhone = data.whatsapp || '+51984123456';
  const guideAvatar = getSanitizedGuideAvatar(data.guideAvatar, guideName);

  const rawHeroTitle = data.hero?.title || data.name || 'Vive Tu Aventura: Expediciones & Trekking en Cusco';
  const cleanTitleInput = rawHeroTitle.replace(/\s*—\s*/g, ': ').trim();
  const heroTitle = translateText(cleanTitleInput, currentLang).replace(/\s*—\s*/g, ': ').trim();
  const getLocalizedHeroSubtitle = (originalSubtitle?: string) => {
    const raw = originalSubtitle?.trim() || data.hero?.subtitle?.trim();
    if (!raw) {
      return translateText(data.about?.content || 'Explora lugares asombrosos y crea recuerdos inolvidables alrededor de los Andes.', currentLang);
    }
    if (currentLang === (data.language || 'es')) {
      return raw;
    }
    return translateText(raw, currentLang);
  };
  const heroSubtitle = getLocalizedHeroSubtitle(data.hero?.subtitle);
  const heroBadge = translateText(data.hero?.badge || 'NavikX Cusco • Operador Autorizado', currentLang);
  const destinationName = translateText(data.destination || 'Cusco & Machu Picchu', currentLang);

  // Base Price parsing & Dynamic calculation
  const rawPriceStr = data.price || '$350 USD';
  const basePriceUsd = useMemo(() => {
    const num = parseInt(rawPriceStr.replace(/\D/g, ''), 10);
    return isNaN(num) || num <= 0 ? 350 : num;
  }, [rawPriceStr]);

  const formatPrice = (usdAmount: number, qty: number = 1) => {
    const total = usdAmount * qty;
    if (currency === 'PEN') {
      return `S/ ${(total * 3.75).toLocaleString('es-PE', { maximumFractionDigits: 0 })} PEN`;
    }
    if (currency === 'EUR') {
      return `€${(total * 0.92).toLocaleString('es-ES', { maximumFractionDigits: 0 })} EUR`;
    }
    return `$${total.toLocaleString('en-US')} USD`;
  };

  // Contenido de la Expedición (Acerca de)
  const aboutTitle = translateText(data.about?.title || 'Expediciones Diseñadas por Expertos Andinos', currentLang);
  const aboutContent = translateText(data.about?.content || 'Nuestra filosofía combina senderismo inmersivo con seguridad biomédica y hotelería de montaña. Cada travesía por los valles y cordilleras del Cusco cuenta con monitoreo satelital, guías acreditados por DIRCETUR y experiencias gastronómicas con productos autóctonos orgánicos.', currentLang);

  // Inclusiones y Exclusiones Traducidas
  const rawIncluded = (data.includedServices && data.includedServices.length > 0)
    ? data.includedServices
    : [
        'Transporte turístico privado 4x4 climatizado ida y retorno',
        'Boletos oficiales preferenciales de tren y accesos a Machu Picchu',
        'Guía oficial colegiado bilingüe DIRCETUR en todas las jornadas',
        'Monitoreo médico continuo 24/7 con balón de oxígeno medicinal',
        'Alimentación gourmet andina de autor y estaciones de hidratación',
        'Bastones de trekking telescópicos de aluminio profesional'
      ];
  const includedList = useMemo(() => rawIncluded.map(item => translateText(item, currentLang)), [rawIncluded, currentLang]);

  const rawNotIncluded = (data.notIncluded && data.notIncluded.length > 0)
    ? data.notIncluded
    : [
        'Vuelos comerciales nacionales o internacionales hacia Cusco',
        'Propinas voluntarias para el equipo de porteadores y choferes',
        'Seguro personal de viaje internacional (recomendado)'
      ];
  const notIncludedList = useMemo(() => rawNotIncluded.map(item => translateText(item, currentLang)), [rawNotIncluded, currentLang]);

  const rawWhatToBring = (data.whatToBring && data.whatToBring.length > 0)
    ? data.whatToBring
    : [
        'Documento de identidad / Pasaporte original vigente',
        'Mochila ergonómica de 20L a 30L con cobertor de lluvia',
        'Calzado de trekking con suela de buen agarre ya amoldado',
        'Ropa térmica en capas, chaqueta cortavientos impermeable',
        'Protector solar FPS 50+, gafas UV400 y sombrero de ala ancha',
        'Botella o termo reutilizable para recargas de agua'
      ];
  const whatToBringList = useMemo(() => rawWhatToBring.map(item => translateText(item, currentLang)), [rawWhatToBring, currentLang]);

  const rawTrustBadges = (data.trustBadges && data.trustBadges.length > 0)
    ? data.trustBadges
    : [
        'Licencia Oficial DIRCETUR Cusco N° 2024-EXP-089',
        'Sello Internacional Safe Travels WTTC',
        'Operador Formal RUC 20 Verificado ante SUNAT',
        'Balón de Oxígeno & Botiquín Médico de Altura Certificado',
        'Guías Colegiados Bilingües con Certificación WFR',
        'Póliza de Seguro Turístico contra Accidentes'
      ];
  const trustBadgesList = useMemo(() => rawTrustBadges.map(item => translateText(item, currentLang)), [rawTrustBadges, currentLang]);

  // Testimonios Localizados
  const rawTestimonials = (data.testimonials && data.testimonials.length > 0)
    ? data.testimonials
    : [
        {
          name: 'Martín y Claudia Flores',
          origin: 'Santiago, Chile',
          comment: 'La mejor experiencia que hemos vivido en Perú. La atención personalizada de Carlos y el cuidado con el oxígeno en la montaña nos permitieron disfrutar de Machu Picchu sin ninguna preocupación.',
          rating: 5
        },
        {
          name: 'Sarah & David Miller',
          origin: 'Austin, Texas (USA)',
          comment: 'Outstanding organization! High-end gear, wonderful trail gourmet food and breathtaking sunrise views. Truly an authentic luxury expedition.',
          rating: 5
        },
        {
          name: 'Élodie Laurent',
          origin: 'Lyon, Francia',
          comment: 'Une équipe extraordinaire, un respect total de la nature et un encadrement sécuritaire impeccable. Les paysages des Andes sont gravés à jamais.',
          rating: 5
        }
      ];

  const testimonialsList = useMemo(() => {
    return rawTestimonials.map(rev => ({
      ...rev,
      comment: translateText(rev.comment, currentLang),
      origin: translateText(rev.origin, currentLang)
    }));
  }, [rawTestimonials, currentLang]);

  // Itinerario Interactivo Completo
  const defaultItinerary: (ItineraryItem & { altitude?: string; hikingTime?: string; meals?: string; lodging?: string })[] = [
    {
      step: 'Día 1',
      title: 'Cusco Imperial, Miradores del Valle Sagrado & Aclimatación',
      desc: 'Recepción privada en el hotel, travesía por los miradores del Valle Sagrado, sesión de aclimatación con infusiones de muña y briefing técnico con el guía oficial colegiado.',
      altitude: '2,800 msnm',
      hikingTime: '3-4 hrs (Paseo ligero)',
      meals: 'Almuerzo Campestre & Cena de Bienvenida',
      lodging: 'Hotel Boutique Valle Sagrado'
    },
    {
      step: 'Día 2',
      title: 'Ascenso Escénico, Paso de Alta Montaña & Lagunas Glaciares',
      desc: 'Trekking matutino atravesando bosques de queñuales hacia las lagunas turquesas a los pies del nevado. Almuerzo gourmet de montaña y campamento bajo las estrellas andinas.',
      altitude: '4,630 msnm',
      hikingTime: '6-7 hrs (Ascenso gradual)',
      meals: 'Desayuno Andino, Almuerzo Gourmet & Cena',
      lodging: 'Domo Glamping con Vista a las Estrellas'
    },
    {
      step: 'Día 3',
      title: 'Descenso a Ceja de Selva, Plantaciones de Café & Aguas Termales',
      desc: 'Travesía por valles subtropicales con vegetación exuberante, visita a productores de café orgánico y relajación en aguas termales naturales medicinales.',
      altitude: '2,050 msnm',
      hikingTime: '5 hrs (Descenso escénico)',
      meals: 'Desayuno, Almuerzo Típico & Cena',
      lodging: 'Eco-Lodge en Ceja de Selva'
    },
    {
      step: 'Día 4',
      title: 'Amanecer en la Ciudadela Sagrada de Machu Picchu & Retorno VIP',
      desc: 'Acceso en primer turno a Machu Picchu para capturar la clásica postal con luz dorada. Recorrido arqueológico guiado de 3 horas y retorno en tren panorámico a Cusco.',
      altitude: '2,430 msnm',
      hikingTime: '3 hrs (Tour guiado histórico)',
      meals: 'Desayuno Buffet & Almuerzo en Aguas Calientes',
      lodging: 'Retorno a Hotel en Cusco'
    }
  ];

  const ITINERARY_SCENIC_IMAGES = [
    'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=800&auto=format&fit=crop'
  ];

  const activeItinerary = useMemo(() => {
    const source = (data.itinerary && data.itinerary.length > 0) ? data.itinerary : defaultItinerary;
    return source.map((step, idx) => {
      const translated = translateItineraryItem(step, currentLang, idx);
      return {
        ...step,
        step: translated.step || step.step || `Día ${idx + 1}`,
        title: translated.title || step.title,
        desc: translated.desc || step.desc,
        altitude: translateText((step as any).altitude || (idx === 0 ? '2,800 msnm' : idx === 1 ? '4,630 msnm' : idx === 2 ? '2,050 msnm' : '2,430 msnm'), currentLang),
        hikingTime: translateText((step as any).hikingTime || (idx === 0 ? '3-4 hrs (Paseo ligero)' : idx === 1 ? '6-7 hrs (Ascenso gradual)' : idx === 2 ? '5 hrs' : '3 hrs'), currentLang),
        meals: translateText((step as any).meals || (idx === 0 ? 'Almuerzo Campestre & Cena de Bienvenida' : idx === 1 ? 'Alimentación Completa de Montaña' : idx === 2 ? 'Alimentación Completa' : 'Desayuno Buffet & Almuerzo'), currentLang),
        lodging: translateText((step as any).lodging || (idx === 0 ? 'Hotel Boutique Valle Sagrado' : idx === 1 ? 'Domo Glamping con Vista a las Estrellas' : idx === 2 ? 'Eco-Lodge en Ceja de Selva' : 'Retorno a Hotel en Cusco'), currentLang),
        image: (step as any).image || ITINERARY_SCENIC_IMAGES[idx % ITINERARY_SCENIC_IMAGES.length]
      };
    });
  }, [data.itinerary, currentLang]);

  // Galería Completa de Fotos para Lightbox
  const allGalleryPhotos = useMemo(() => {
    const list: string[] = [];
    if (data.heroImage) list.push(data.heroImage);
    if (data.galleryImages && data.galleryImages.length > 0) {
      list.push(...data.galleryImages);
    } else {
      list.push(
        'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=1200&auto=format&fit=crop'
      );
    }
    return Array.from(new Set(list));
  }, [data.heroImage, data.galleryImages]);

  // Destinos Traducidos
  const localizedDestinations = useMemo(() => {
    return POPULAR_DESTINATIONS.map(dest => ({
      ...dest,
      title: translateText(dest.title, currentLang),
      tag: translateText(dest.tag, currentLang),
      highlight: translateText(dest.highlight, currentLang),
      climate: translateText(dest.climate, currentLang)
    }));
  }, [currentLang]);

  // Catálogo de Tours Secundarios (Tier Gating: 3 en Free/Basic, 6 en Pro/Advance)
  const tourLimit = (isFree || isBasic) ? 3 : 6;
  const rawCatalogTours: CatalogTourItem[] = (data.catalogTours && data.catalogTours.length > 0)
    ? data.catalogTours
    : DEFAULT_SECONDARY_CATALOG_TOURS;

  const localizedCatalogTours = useMemo(() => {
    return rawCatalogTours.map((tour, idx) => ({
      ...tour,
      id: tour.id || `tour-${idx}`,
      title: translateText(tour.title, currentLang),
      duration: translateText(tour.duration || 'Día Completo', currentLang),
      category: translateText(tour.category || 'Aventura & Trekking', currentLang),
      location: translateText(tour.location || 'Cusco Imperial', currentLang),
      tag: translateText(tour.tag || 'Destacado', currentLang)
    }));
  }, [rawCatalogTours, currentLang]);

  // Filtrado de Tours
  const filteredTours = useMemo(() => {
    return localizedCatalogTours.filter(tour => {
      if (tourCategory === 'all') return true;
      const titleLower = tour.title.toLowerCase();
      if (tourCategory === 'trekking') {
        return titleLower.includes('salkantay') || titleLower.includes('trek') || titleLower.includes('camino inca') || titleLower.includes('choquequirao') || titleLower.includes('vinicunca') || titleLower.includes('colores');
      }
      if (tourCategory === 'classic') {
        return titleLower.includes('machu picchu') || titleLower.includes('valle') || titleLower.includes('ciudad') || titleLower.includes('sagrado');
      }
      if (tourCategory === 'fullday') {
        return tour.duration?.toLowerCase().includes('full') || tour.duration?.toLowerCase().includes('día') || titleLower.includes('humantay') || titleLower.includes('vinicunca');
      }
      return true;
    });
  }, [localizedCatalogTours, tourCategory]);

  const displayTours = filteredTours.slice(0, tourLimit);
  const toursPerPage = 3;
  const totalTourPages = Math.ceil(displayTours.length / toursPerPage);
  const currentTourPage = Math.min(tourPage, Math.max(0, totalTourPages - 1));
  const visibleTours = displayTours.slice(currentTourPage * toursPerPage, (currentTourPage + 1) * toursPerPage);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenAction = (tourTitle?: string) => {
    if (tourTitle) setSelectedTourForQuote(tourTitle);
    if (isQuote || isBoth) {
      setIsQuoteOpen(true);
    } else {
      const cleanPhone = guidePhone.replace(/\D/g, '');
      const msg = encodeURIComponent(`Hola ${guideName}, deseo consultar disponibilidad para ${passengers} personas en el tour: ${tourTitle || data.name || 'Machu Picchu'} (${formatPrice(basePriceUsd, passengers)} en ${currency}).`);
      window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
    }
  };

  const handleWhatsappDirect = (tourTitle?: string) => {
    const cleanPhone = guidePhone.replace(/\D/g, '');
    const msg = encodeURIComponent(`Hola ${guideName}, deseo consultar sobre ${tourTitle || data.name || 'Machu Picchu'} para ${passengers} personas por WhatsApp.`);
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  const openLightbox = (imgUrl: string) => {
    const idx = allGalleryPhotos.indexOf(imgUrl);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  };

  // Checklist de Mochila
  const toggleChecklist = (idx: number) => {
    setCheckedPacking(prev => ({ ...prev, [idx]: !prev[idx] }));
  };
  const packedCount = whatToBringList.filter((_, idx) => checkedPacking[idx]).length;
  const packedPct = Math.round((packedCount / (whatToBringList.length || 1)) * 100);

  return (
    <div 
      className="min-h-screen text-emerald-50 font-sans selection:bg-[#10b981] selection:text-[#011116] overflow-x-hidden relative"
      style={{
        backgroundColor: '#021016',
        backgroundImage: `
          radial-gradient(ellipse 90% 800px at 50% 380px, rgba(14, 165, 233, 0.32) 0%, rgba(13, 148, 136, 0.22) 40%, transparent 75%),
          radial-gradient(ellipse 80% 950px at 85% 1200px, rgba(20, 184, 166, 0.38) 0%, rgba(2, 132, 199, 0.20) 45%, transparent 75%),
          radial-gradient(ellipse 80% 950px at 15% 2400px, rgba(2, 132, 199, 0.38) 0%, rgba(16, 185, 129, 0.20) 45%, transparent 75%),
          radial-gradient(ellipse 85% 950px at 85% 3600px, rgba(16, 185, 129, 0.36) 0%, rgba(6, 182, 212, 0.20) 45%, transparent 75%),
          radial-gradient(ellipse 80% 950px at 15% 4800px, rgba(6, 182, 212, 0.38) 0%, rgba(2, 132, 199, 0.20) 45%, transparent 75%),
          radial-gradient(ellipse 85% 950px at 85% 6000px, rgba(13, 148, 136, 0.38) 0%, rgba(16, 185, 129, 0.18) 45%, transparent 75%),
          radial-gradient(ellipse 90% 950px at 50% 7200px, rgba(2, 132, 199, 0.35) 0%, transparent 75%),
          linear-gradient(180deg, #021219 0%, #031c26 250px, #062835 700px, #041f29 1800px, #031821 3800px, #021218 6000px, #010a0e 8000px)
        `
      }}
    >
      
      {/* SISTEMA DE GRADIENTE AURORA & PROFUNDIDAD */}
      <div className="absolute top-0 inset-x-0 h-[1100px] overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#021219] via-[#031822]/90 to-transparent" />
        <div className="absolute top-[120px] left-1/2 -translate-x-1/2 w-[1200px] sm:w-[1500px] h-[650px] bg-[radial-gradient(ellipse_75%_55%_at_50%_45%,rgba(13,148,136,0.38)_0%,rgba(2,132,199,0.30)_38%,rgba(4,28,36,0.35)_65%,transparent_100%)] blur-[95px]" />
        <div className="absolute top-36 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-600/22 to-teal-500/18 rounded-full blur-[120px] animate-emerald-glow" />
        <div className="absolute top-44 -right-28 w-[500px] h-[500px] bg-gradient-to-bl from-sky-600/22 to-cyan-600/18 rounded-full blur-[120px] animate-emerald-glow [animation-delay:3s]" />
      </div>

      {/* 1. TOP HEADER NAVIGATION */}
      <header className="relative z-30 border-b border-white/10 bg-[#021219]/90 backdrop-blur-2xl sticky top-0 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Logo y Marca con protección contra textos largos */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 max-w-[200px] xs:max-w-[240px] sm:max-w-[290px] md:max-w-[340px] lg:max-w-[250px] xl:max-w-[340px] 2xl:max-w-[400px] shrink">
            {data.logoUrl ? (
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl overflow-hidden bg-white/90 p-1 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
                <img src={data.logoUrl} alt={data.companyName || 'Logo'} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center text-[#02181f] shadow-lg shadow-emerald-500/30 shrink-0">
                <Compass size={20} className="stroke-[2.5]" />
              </div>
            )}
            <div className="min-w-0 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-black text-sm sm:text-base lg:text-sm xl:text-base tracking-tight text-white truncate block leading-snug">
                  {data.companyName?.trim() || data.name?.replace(/^dise[ñn]o\s*\d+\s*[-–:]\s*/i, '').trim() || 'NavikX Cusco'}
                </span>
                <span className="text-emerald-300 font-medium text-[9px] sm:text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded-full border border-emerald-400/40 shrink-0 whitespace-nowrap hidden sm:inline-flex">
                  {data.companyRuc ? 'RUC' : (data.destination ? data.destination.split(',')[0] : 'Cusco')}
                </span>
              </div>
              <p className="text-[10px] text-emerald-200/70 font-medium tracking-wide leading-none mt-0.5 truncate hidden sm:block">
                {data.companyTagline || t.brandTag}
              </p>
            </div>
          </div>

          {/* Menú Desktop Translúcido Flotante Responsivo */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-white/[0.08] backdrop-blur-xl p-1 xl:p-1.5 rounded-full border border-white/15 shadow-lg text-[11px] xl:text-xs font-semibold text-emerald-100 shrink-0">
            <a href="#inicio" className="px-2.5 xl:px-3 py-1 xl:py-1.5 rounded-full bg-emerald-500 text-[#02181f] font-black shadow-xs transition-all">
              {t.navHome}
            </a>
            <a href="#destinos" className="px-2 xl:px-3 py-1 xl:py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors">
              {t.navDestinations}
            </a>
            <a href="#tours" className="px-2 xl:px-3 py-1 xl:py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors">
              {t.navTours}
            </a>
            <a href="#itinerario" className="px-2 xl:px-3 py-1 xl:py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors">
              {t.navItinerary}
            </a>
            <a href="#incluye" className="px-2 xl:px-3 py-1 xl:py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors">
              {t.navServices}
            </a>
            <a href="#galeria" className="hidden xl:inline-block px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors">
              {t.navGallery}
            </a>
            <a href="#faqs" className="hidden 2xl:inline-block px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors">
              {t.navFaqs}
            </a>
          </nav>

          {/* Controles Derecha: Divisas (Desktop) + Idiomas (Desktop/Tablet) + CTA + Hamburguesa */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Currency Selector Pill (Desktop) */}
            <div className="hidden md:flex items-center bg-white/10 p-1 rounded-full border border-white/15 text-[11px] font-bold">
              {(['USD', 'PEN', 'EUR'] as const).map(curr => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setCurrency(curr)}
                  className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                    currency === curr ? 'bg-emerald-400 text-slate-950 font-black shadow-xs' : 'text-emerald-200/70 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            {/* Language Selector Dropdown (Desktop / Tablet) */}
            {showLangSelector && (
              <div className="hidden sm:block">
                <HeaderLanguageSelector
                  currentLang={currentLang}
                  availableCodes={activeLanguages}
                  onSelectLang={(lang: LanguageType) => setCurrentLang(lang)}
                  variant="emerald"
                />
              </div>
            )}

            {/* Botón CTA Header */}
            <button
              onClick={() => handleOpenAction(data.name)}
              className="emerald-shimmer-btn bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 hover:from-emerald-300 hover:to-teal-300 text-[#02181f] font-black text-xs sm:text-sm px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 sm:gap-2 shrink-0"
            >
              <MessageCircle size={15} />
              <span className="hidden sm:inline">{data.hero?.cta ? translateText(data.hero.cta, currentLang) : (isWhatsapp ? t.whatsappBtn : isQuote ? t.quoteBtn : t.planYourTripBtn)}</span>
              <span className="sm:hidden text-[11px] font-black">{data.hero?.cta ? translateText(data.hero.cta, currentLang) : (isWhatsapp ? 'WhatsApp' : 'Reservar')}</span>
            </button>

            {/* Mobile Menu Toggle con estilo premium */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                mobileMenuOpen 
                  ? 'bg-emerald-500 text-black border border-emerald-400 shadow-md shadow-emerald-500/30' 
                  : 'bg-white/10 border border-white/20 text-emerald-300 hover:bg-white/15'
              }`}
              aria-label="Abrir menú de navegación móvil"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer / Dropdown de Ultralujo */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-emerald-500/20 bg-[#021419]/98 backdrop-blur-2xl px-4 py-5 space-y-4 shadow-[0_25px_50px_rgba(0,0,0,0.8)] animate-in slide-in-from-top-3 duration-200">
            
            {/* Controles de Idioma y Moneda en Móvil */}
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
              {/* Selector de Idiomas */}
              {showLangSelector && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-emerald-300/80 uppercase tracking-wider block">
                    {translateText('Idioma del Tour:', currentLang)}
                  </span>
                  <div className="grid grid-cols-5 gap-1.5">
                    {activeLanguages.map(lCode => {
                      const langLabel = lCode === 'es' ? 'ESP' : lCode === 'en' ? 'ENG' : lCode === 'pt' ? 'POR' : lCode === 'fr' ? 'FRA' : 'ITA';
                      const isSel = currentLang === lCode;
                      return (
                        <button
                          key={lCode}
                          type="button"
                          onClick={() => setCurrentLang(lCode)}
                          className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 border ${
                            isSel 
                              ? 'bg-emerald-500 text-black font-black border-emerald-400 shadow-md shadow-emerald-500/30 scale-[1.02]' 
                              : 'bg-white/5 text-emerald-200/80 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-xs font-black tracking-wider uppercase">{langLabel}</span>
                          <span className="text-[9px] font-medium opacity-80 uppercase">{lCode}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Selector de Moneda */}
              <div className="flex items-center justify-between pt-1 border-t border-white/10">
                <span className="text-[11px] font-bold text-emerald-300/80 uppercase tracking-wider">
                  {translateText('Moneda:', currentLang)}
                </span>
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
                  {(['USD', 'PEN', 'EUR'] as const).map(curr => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => setCurrency(curr)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        currency === curr 
                          ? 'bg-emerald-400 text-black font-black shadow-xs' 
                          : 'text-emerald-200/70 hover:text-white'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Lista de Navegación Móvil de Ultralujo (Exactamente 7 enlaces) */}
            <div className="space-y-1.5">
              {[
                { href: '#inicio', label: t.navHome, icon: Compass },
                { href: '#destinos', label: t.navDestinations, icon: MapPin },
                { href: '#tours', label: t.navTours, icon: Mountain },
                { href: '#itinerario', label: t.navItinerary, icon: Calendar },
                { href: '#incluye', label: t.navServices, icon: ShieldCheck },
                { href: '#galeria', label: t.navGallery, icon: Sparkles },
                { href: '#faqs', label: t.navFaqs, icon: HelpCircle }
              ].map(item => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white/[0.04] hover:bg-emerald-500/15 border border-white/5 hover:border-emerald-400/30 text-emerald-100 hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                        <IconComponent size={14} />
                      </div>
                      <span className="text-xs font-bold tracking-wide">{item.label}</span>
                    </div>
                    <ChevronRight size={14} className="text-emerald-400/60 group-hover:text-emerald-300 group-hover:translate-x-1 transition-transform" />
                  </a>
                );
              })}
            </div>

            {/* Botón de Acción Completo al pie del Menú Móvil */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); handleOpenAction(data.name); }}
                className="w-full emerald-shimmer-btn bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 text-[#02181f] font-black text-xs py-3.5 px-5 rounded-2xl shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-98 transition-all"
              >
                <MessageCircle size={16} />
                <span>{isWhatsapp ? t.whatsappBtn : isQuote ? t.quoteBtn : t.planYourTripBtn}</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        )}
      </header>

      {/* 2. HERO PRINCIPAL */}
      <section id="inicio" className="relative z-10 pt-6 sm:pt-14 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Columna Izquierda */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-emerald-400/30 text-emerald-300 text-xs font-bold shadow-lg shadow-emerald-950/40 animate-float-badge">
              <Sparkles size={14} className="text-emerald-400 shrink-0" />
              <span className="truncate">{heroBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] sm:leading-[1.08]">
              {heroTitle}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-emerald-100/80 max-w-xl leading-relaxed">
              {heroSubtitle}
            </p>

            {/* BARRA FLOTANTE INTERACTIVA DE BÚSQUEDA & CALCULADORA EN VIVO */}
            <div className="p-3.5 sm:p-4 bg-slate-950/75 backdrop-blur-2xl border border-emerald-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-3xl max-w-xl animate-pill-glow transition-all duration-300 space-y-3">
              
              {/* Fila Superior: Parámetros del Viaje (Destino & Pasajeros) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
                
                {/* 1. Destino / Ruta */}
                <div className="sm:col-span-6 flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-white/[0.04] border border-white/10 text-xs min-w-0">
                  <MapPin size={18} className="text-emerald-400 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] text-emerald-300/80 font-bold uppercase tracking-wider block">{t.searchWhere}</span>
                    <span className="text-xs font-black text-white truncate block">{destinationName}</span>
                  </div>
                </div>

                {/* 2. Selector de Pasajeros */}
                <div className="sm:col-span-6 flex items-center justify-between gap-2 px-3 py-2 rounded-2xl bg-white/[0.04] border border-white/10 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <Users size={16} className="text-teal-400 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-emerald-300/80 font-bold uppercase tracking-wider block">{t.passengers}</span>
                      <span className="text-xs font-black text-white truncate block">
                        {passengers} {passengers === 1 ? t.passengerSingular : t.passengerPlural}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      className="w-6 h-6 rounded-lg bg-white/10 hover:bg-emerald-400 hover:text-black flex items-center justify-center text-xs font-black transition-colors cursor-pointer"
                      title="Disminuir pasajeros"
                    >
                      <Minus size={11} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPassengers(Math.min(12, passengers + 1))}
                      className="w-6 h-6 rounded-lg bg-white/10 hover:bg-emerald-400 hover:text-black flex items-center justify-center text-xs font-black transition-colors cursor-pointer"
                      title="Aumentar pasajeros"
                    >
                      <Plus size={11} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Fila Inferior: Selector de Moneda Rápido + Botón de Reserva con Tarifa Dinámica */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1 border-t border-white/10">
                <div className="flex items-center justify-between sm:justify-start gap-2">
                  <span className="text-[10px] font-bold text-emerald-300/80 uppercase tracking-wider">
                    {translateText('Tarifa en:', currentLang)}
                  </span>
                  <div className="inline-flex bg-white/10 rounded-xl p-0.5 border border-white/10">
                    {(['USD', 'PEN', 'EUR'] as const).map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => setCurrency(curr)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                          currency === curr
                            ? 'bg-emerald-400 text-slate-950 shadow-xs'
                            : 'text-emerald-200/70 hover:text-white'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Botón de Acción Principal con Tarifa Calculada */}
                <button
                  type="button"
                  onClick={() => handleOpenAction(data.name)}
                  className="emerald-shimmer-btn bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-teal-200 text-[#041716] font-black text-xs sm:text-sm px-5 py-2.5 rounded-2xl transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
                >
                  <span>{data.hero?.cta ? translateText(data.hero.cta, currentLang) : (t.searchBtn || 'Reservar Tour')}:</span>
                  <span className="font-extrabold text-sm sm:text-base">{formatPrice(basePriceUsd, passengers)}</span>
                  <ArrowRight size={15} />
                </button>
              </div>

            </div>

            {/* 3 TARJETAS BENTO FLOTANTES */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="glass-floating-card p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl animate-emerald-float space-y-1 group cursor-default">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/30 group-hover:scale-110 transition-transform">
                  <Compass size={16} />
                </div>
                <h4 className="text-xs font-black text-white">{t.benefit1Title}</h4>
                <p className="text-[11px] text-emerald-200/70 leading-snug">{t.benefit1Desc}</p>
              </div>

              <div className="glass-floating-card p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl animate-emerald-float-delayed space-y-1 group cursor-default">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-400/30 group-hover:scale-110 transition-transform">
                  <FileText size={16} />
                </div>
                <h4 className="text-xs font-black text-white">{t.benefit2Title}</h4>
                <p className="text-[11px] text-emerald-200/70 leading-snug">{t.benefit2Desc}</p>
              </div>

              <div className="glass-floating-card p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl animate-emerald-float-alt space-y-1 group cursor-default">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/30 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={16} />
                </div>
                <h4 className="text-xs font-black text-white">{t.benefit3Title}</h4>
                <p className="text-[11px] text-emerald-200/70 leading-snug">{t.benefit3Desc}</p>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Foto del Hero con Silueta Orgánica */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="absolute -inset-8 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

            <div 
              onClick={() => openLightbox(heroImg)}
              className="relative w-full max-w-lg lg:max-w-xl h-[380px] sm:h-[540px] lg:h-[660px] mx-auto rounded-[36px] sm:rounded-[56px] rounded-tr-[90px] sm:rounded-tr-[130px] rounded-br-[100px] sm:rounded-br-[150px] rounded-bl-[32px] sm:rounded-bl-[48px] overflow-hidden group shadow-[0_35px_80px_rgba(0,0,0,0.65)] border border-white/10 cursor-pointer"
            >
              <Image 
                src={heroImg} 
                alt={data.name || 'Cusco Adventure'} 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw" 
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#03131a] via-[#03131a]/60 to-transparent z-10" />

              {/* Chip Flotante Superior: Local Experts */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 bg-black/40 backdrop-blur-xl px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex items-center gap-2 animate-float-badge">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/25 text-emerald-300 flex items-center justify-center border border-emerald-400/40 shadow-xs">
                  <Award size={15} />
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] font-black text-white block leading-tight">Local Experts</span>
                  <span className="text-[9px] text-emerald-300 font-semibold block">{guideCert}</span>
                </div>
              </div>

              {/* Tarjeta Flotante Inferior de Tarifa Dinámica */}
              <div className="absolute bottom-3 inset-x-3 sm:bottom-5 sm:inset-x-5 z-20 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-black/60 backdrop-blur-xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center justify-between gap-2.5 sm:gap-3 animate-emerald-float-alt">
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[10px] text-emerald-200/90 font-bold block">{translateText('Tarifa Oficial por Persona:', currentLang)}</span>
                  <span className="text-xl sm:text-2xl font-black text-white">{formatPrice(basePriceUsd, 1)}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleOpenAction(data.name); }}
                  className="emerald-shimmer-btn bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-[#041716] font-black text-xs px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-lg shadow-emerald-500/30 flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0"
                >
                  <span>{translateText('Reservar Tour', currentLang)}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. DESTINOS POPULARES */}
      <section id="destinos" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-1/2 -right-24 -translate-y-1/2 w-[650px] sm:w-[850px] h-[520px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.48)_0%,rgba(6,182,212,0.25)_45%,transparent_75%)] blur-3xl pointer-events-none z-0" />
        <div className="absolute top-1/2 -left-24 -translate-y-1/2 w-[600px] sm:w-[750px] h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(2,132,199,0.42)_0%,rgba(14,116,144,0.22)_45%,transparent_75%)] blur-3xl pointer-events-none z-0" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-black mb-3">
                <Sparkles size={13} className="text-emerald-400" />
                <span>{t.destinationsBadge}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2.5">
                <span>{t.popularTitle}</span>
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200/70 mt-1.5 max-w-2xl leading-relaxed">
                {t.popularSub}
              </p>
            </div>

            <a
              href="#tours"
              className="emerald-shimmer-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/[0.08] hover:bg-emerald-400 hover:text-[#02181f] text-emerald-200 font-bold text-xs border border-white/15 hover:border-emerald-400/50 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 shrink-0"
            >
              <span>{t.viewAllToursBtn}</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localizedDestinations.map((dest, idx) => {
              const isLarge = idx === 0;
              return (
                <div 
                  key={dest.id}
                  className={`group rounded-3xl glass-floating-card overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-950/50 ${
                    isLarge ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                  }`}
                >
                  <div 
                    onClick={() => openLightbox(dest.image)}
                    className={`relative w-full overflow-hidden bg-emerald-950 cursor-pointer ${isLarge ? 'h-72 sm:h-80' : 'h-56'}`}
                  >
                    <Image 
                      src={dest.image} 
                      alt={dest.title} 
                      fill 
                      sizes={isLarge ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                      className="object-cover group-hover:scale-108 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#021016] via-[#021016]/40 to-black/30" />

                    <div className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-emerald-300 font-black text-xs flex items-center gap-1.5 border border-white/20 shadow-md">
                      <Mountain size={13} className="text-emerald-400" />
                      <span>{dest.altitude}</span>
                    </div>

                    <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 shadow-md">
                      <MapPin size={12} className="text-teal-300" />
                      <span>{dest.tag}</span>
                    </div>

                    <div className="absolute bottom-3.5 left-3.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-amber-300 font-black text-xs flex items-center gap-1 border border-white/15 shadow-md">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span>{dest.rating}</span>
                      <span className="text-[10px] text-white/70 font-normal">/ 5.0</span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-emerald-300 transition-colors tracking-tight">
                        {dest.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-emerald-100/75 leading-relaxed">
                        {dest.highlight}
                      </p>
                      <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-300/80 font-medium">
                        <Compass size={13} className="text-teal-400 shrink-0" />
                        <span>{translateText('Clima', currentLang)}: {dest.climate}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                      <span className="text-[11px] font-bold text-emerald-300/70">
                        {t.seeToursForDestination}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          setTourCategory(dest.categoryFilter);
                          setTourPage(0);
                          const el = document.getElementById('tours');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="emerald-shimmer-btn bg-emerald-500/20 hover:bg-emerald-400 hover:text-[#02181f] text-emerald-300 font-bold text-xs px-4 py-2 rounded-full border border-emerald-400/40 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm flex items-center gap-1.5"
                      >
                        <span>{t.seeToursForDestination}</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FICHA TÉCNICA INTERACTIVA & CRÓNICA DE EXPEDICIÓN (OCULTO EN FREE) */}
      {!isFree && (
        <section id="acerca" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="absolute top-1/2 -left-24 -translate-y-1/2 w-[650px] sm:w-[850px] h-[520px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.48)_0%,rgba(6,182,212,0.25)_45%,transparent_75%)] blur-3xl pointer-events-none z-0" />
          <div className="absolute top-1/2 -right-24 -translate-y-1/2 w-[600px] sm:w-[750px] h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(2,132,199,0.42)_0%,rgba(20,184,166,0.22)_45%,transparent_75%)] blur-3xl pointer-events-none z-0" />
          
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Columna Izquierda: Ficha Técnica */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div 
                onClick={() => setActiveSpecModal('duration')}
                className="glass-floating-card p-5 rounded-3xl space-y-2 border border-white/15 cursor-pointer hover:border-emerald-400/50 group"
              >
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/40 group-hover:scale-110 transition-transform">
                  <Clock size={20} />
                </div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-400 block">{translateText('Duración', currentLang)}</span>
                <span className="text-base font-black text-white block">{translateText(data.duration || '4 Días / 3 Noches', currentLang)}</span>
                <span className="text-[10px] text-emerald-200/60 block group-hover:text-emerald-300">{translateText('Toca para ver detalle ➔', currentLang)}</span>
              </div>

              <div 
                onClick={() => setActiveSpecModal('altitude')}
                className="glass-floating-card p-5 rounded-3xl space-y-2 border border-white/15 cursor-pointer hover:border-teal-400/50 group"
              >
                <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-400/40 group-hover:scale-110 transition-transform">
                  <Mountain size={20} />
                </div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-teal-400 block">{translateText('Altitud Máxima', currentLang)}</span>
                <span className="text-base font-black text-white block">{translateText(data.altitude || '4,630 msnm', currentLang)}</span>
                <span className="text-[10px] text-teal-200/60 block group-hover:text-teal-300">{translateText('Oxígeno incluido ➔', currentLang)}</span>
              </div>

              <div 
                onClick={() => setActiveSpecModal('difficulty')}
                className="glass-floating-card p-5 rounded-3xl space-y-2 border border-white/15 cursor-pointer hover:border-cyan-400/50 group"
              >
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-400/40 group-hover:scale-110 transition-transform">
                  <Zap size={20} />
                </div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-cyan-400 block">{translateText('Dificultad', currentLang)}</span>
                <span className="text-base font-black text-white block">{translateText(data.difficulty || 'Moderada', currentLang)}</span>
                <span className="text-[10px] text-cyan-200/60 block group-hover:text-cyan-300">{translateText('Ritmo adaptable ➔', currentLang)}</span>
              </div>

              <div 
                onClick={() => setActiveSpecModal('group')}
                className="glass-floating-card p-5 rounded-3xl space-y-2 border border-white/15 cursor-pointer hover:border-amber-400/50 group"
              >
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/40 group-hover:scale-110 transition-transform">
                  <Users size={20} />
                </div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-400 block">{translateText('Modalidad', currentLang)}</span>
                <span className="text-base font-black text-white block">{translateText(data.groupType || 'Grupos Reducidos', currentLang)}</span>
                <span className="text-[10px] text-amber-200/60 block group-hover:text-amber-300">{translateText('Máx 8 personas ➔', currentLang)}</span>
              </div>
            </div>

            {/* Columna Derecha: Tarjeta Editorial */}
            <div className="lg:col-span-7 relative overflow-hidden p-8 sm:p-10 rounded-[40px] bg-white/[0.06] backdrop-blur-2xl border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.5)] space-y-6">
              <div className="relative z-10 space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                    <Award size={14} />
                    <span>{translateText('Filosofía de Expedición', currentLang)}</span>
                  </div>
                  {data.targetAudience && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-200 text-xs font-semibold">
                      <Target size={13} className="text-teal-300" />
                      <span>{translateText(data.targetAudience, currentLang)}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  {aboutTitle}
                </h3>

                <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed font-normal">
                  {aboutContent}
                </p>

                {/* Perfil del Guía Oficial con Sello & Botón de Brochure en Advance */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-emerald-400/50 shadow-md">
                      <Image 
                        src={guideAvatar} 
                        alt={guideName} 
                        fill 
                        sizes="48px" 
                        className="object-cover" 
                      />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-sm">{guideName}</h4>
                      <p className="text-xs text-emerald-300/80 font-medium">{guideCert}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Botón Descargar Brochure PDF en Advance */}
                    {isAdvance && (
                      <button
                        type="button"
                        onClick={() => setIsBrochureOpen(true)}
                        className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-emerald-200 text-xs font-bold border border-white/20 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <FileText size={14} />
                        <span>{t.downloadBrochureBtn}</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleWhatsappDirect(data.name)}
                      className="emerald-shimmer-btn bg-emerald-500 hover:bg-emerald-400 text-[#02181f] font-black text-xs px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-md flex items-center gap-2"
                    >
                      <MessageCircle size={14} />
                      <span>{translateText('Consultar con', currentLang)} {guideName.split(' ')[0]}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
          </div>
        </section>
      )}

      {/* MODAL CONTEXTUAL DE FICHA TÉCNICA */}
      {activeSpecModal && (
        <div 
          onClick={() => setActiveSpecModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="w-full max-w-md p-6 rounded-3xl bg-[#061e27] border border-emerald-400/30 text-white shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="font-black text-base flex items-center gap-2 text-emerald-300">
                <Info size={18} />
                {activeSpecModal === 'duration' && translateText('Detalles de Duración & Ritmo', currentLang)}
                {activeSpecModal === 'altitude' && translateText('Protocolo de Altitud & Oxígeno', currentLang)}
                {activeSpecModal === 'difficulty' && translateText('Evaluación de Condición Física', currentLang)}
                {activeSpecModal === 'group' && translateText('Modalidad & Ratio de Guías', currentLang)}
              </h4>
              <button 
                onClick={() => setActiveSpecModal(null)}
                className="p-1 rounded-full hover:bg-white/10 text-emerald-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              {activeSpecModal === 'duration' && translateText('El itinerario contempla caminatas de 5 a 6 horas diarias con paradas programadas de hidratación cada 90 minutos y almuerzos gourmet calientes servidos en parajes escénicos.', currentLang)}
              {activeSpecModal === 'altitude' && translateText('Nuestros guías llevan oxímetro digital para medir tu saturación tres veces al día, balón de oxígeno medicinal de emergencia y botiquín de primeros auxilios avalado por Wilderness First Responder.', currentLang)}
              {activeSpecModal === 'difficulty' && translateText('Clasificación de esfuerzo moderado a exigente. No se requiere experiencia en escalada técnica, únicamente calzado adecuado y buena disposición física.', currentLang)}
              {activeSpecModal === 'group' && translateText('Grupos reducidos de máximo 8 a 10 personas para garantizar seguridad total, atención personalizada y respeto por el entorno natural de la cordillera.', currentLang)}
            </p>

            <button
              type="button"
              onClick={() => setActiveSpecModal(null)}
              className="w-full py-2.5 rounded-xl bg-emerald-500 text-[#02181f] font-black text-xs cursor-pointer hover:bg-emerald-400"
            >
              {translateText('Entendido', currentLang)}
            </button>
          </div>
        </div>
      )}

      {/* 5. PLAN YOUR JOURNEY & BENTO GRID 4 PASOS (OCULTO EN FREE) */}
      {!isFree && (
        <section id="experiencias" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] sm:w-[1100px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(13,148,136,0.48)_0%,rgba(2,132,199,0.30)_45%,transparent_75%)] blur-3xl pointer-events-none z-0" />
          <div className="absolute top-1/4 -right-20 w-[550px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.28)_0%,transparent_70%)] blur-3xl pointer-events-none z-0" />
          
          <div className="relative z-10">
            {/* Encabezado con Badge */}
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide uppercase shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Compass size={14} className="text-emerald-400" />
                <span>{translateText('Expedición Paso a Paso', currentLang)}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {t.planTitle}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed max-w-2xl mx-auto">
                {t.planSub}
              </p>
            </div>

            {/* Bento Grid de 4 Pasos Clave (Las 4 tarjetas con Imagen de Fondo Andina) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* PASO 01: Elección de Ruta & Época */}
              <div className="relative rounded-3xl overflow-hidden min-h-[300px] border border-emerald-500/25 bg-[#041a18] shadow-[0_15px_35px_rgba(0,0,0,0.4)] group hover:-translate-y-1.5 hover:border-emerald-400/50 transition-all duration-300 flex flex-col justify-between p-5">
                <Image 
                  src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=800&auto=format&fit=crop" 
                  alt="Trekking en Cusco Machu Picchu" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021413] via-[#021413]/75 to-black/30" />
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/80 text-black shadow-xs">
                    {translateText('01 • Ruta Ideal', currentLang)}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-300">
                    <Compass size={16} />
                  </div>
                </div>

                <div className="relative z-10 space-y-2 mt-auto pt-6">
                  <h3 className="text-base font-black text-white leading-snug drop-shadow-sm">
                    {translateText('Elección del Circuito & Época', currentLang)}
                  </h3>
                  <p className="text-xs text-emerald-100/80 leading-relaxed">
                    {translateText('Te asesoramos entre rutas clásicas o trekking de altura según el clima andino y tu ritmo de viaje.', currentLang)}
                  </p>
                  <div className="pt-2 flex items-center text-[11px] font-bold text-emerald-300">
                    <span>{translateText('Asesoría Experta', currentLang)}</span>
                    <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* PASO 02: Entradas & Tren Garantizados */}
              <div className="relative rounded-3xl overflow-hidden min-h-[300px] border border-emerald-500/25 bg-[#041a18] shadow-[0_15px_35px_rgba(0,0,0,0.4)] group hover:-translate-y-1.5 hover:border-emerald-400/50 transition-all duration-300 flex flex-col justify-between p-5">
                <Image 
                  src="https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=800&auto=format&fit=crop" 
                  alt="Valle Sagrado y tren panorámico a Machu Picchu" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021413] via-[#021413]/75 to-black/30" />
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/80 text-black shadow-xs">
                    {translateText('02 • Accesos Oficiales', currentLang)}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-300">
                    <Calendar size={16} />
                  </div>
                </div>

                <div className="relative z-10 space-y-2 mt-auto pt-6">
                  <h3 className="text-base font-black text-white leading-snug drop-shadow-sm">
                    {translateText('Entradas & Tren Garantizados', currentLang)}
                  </h3>
                  <p className="text-xs text-emerald-100/80 leading-relaxed">
                    {translateText('Reservamos con antelación tus boletos oficiales a la ciudadela y asientos en tren panorámico sin filas ni incertidumbre.', currentLang)}
                  </p>
                  <div className="pt-2 flex items-center text-[11px] font-bold text-emerald-300">
                    <span>{translateText('100% Reserva Anticipada', currentLang)}</span>
                    <CheckCircle2 size={13} className="ml-1 text-emerald-400" />
                  </div>
                </div>
              </div>

              {/* PASO 03: Protocolo Médico de Aclimatación */}
              <div className="relative rounded-3xl overflow-hidden min-h-[300px] border border-emerald-500/25 bg-[#041a18] shadow-[0_15px_35px_rgba(0,0,0,0.4)] group hover:-translate-y-1.5 hover:border-emerald-400/50 transition-all duration-300 flex flex-col justify-between p-5">
                <Image 
                  src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=800&auto=format&fit=crop" 
                  alt="Laguna Humantay alta montaña y aclimatación" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021413] via-[#021413]/75 to-black/30" />
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/80 text-black shadow-xs">
                    {translateText('03 • Salud & Altitud', currentLang)}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-300">
                    <ShieldCheck size={16} />
                  </div>
                </div>

                <div className="relative z-10 space-y-2 mt-auto pt-6">
                  <h3 className="text-base font-black text-white leading-snug drop-shadow-sm">
                    {translateText('Aclimatación y Soporte 24/7', currentLang)}
                  </h3>
                  <p className="text-xs text-emerald-100/80 leading-relaxed">
                    {translateText('Monitoreo con oxímetro digital, oxígeno medicinal portátil en cada ruta y aclimatación gradual en el Valle Sagrado.', currentLang)}
                  </p>
                  <div className="pt-2 flex items-center text-[11px] font-bold text-emerald-300">
                    <span>{translateText('Protocolo Médico Incluido', currentLang)}</span>
                    <CheckCircle2 size={13} className="ml-1 text-emerald-400" />
                  </div>
                </div>
              </div>

              {/* PASO 04: Logística Integral Llave en Mano */}
              <div className="relative rounded-3xl overflow-hidden min-h-[300px] border border-emerald-500/25 bg-[#041a18] shadow-[0_15px_35px_rgba(0,0,0,0.4)] group hover:-translate-y-1.5 hover:border-emerald-400/50 transition-all duration-300 flex flex-col justify-between p-5">
                <Image 
                  src="https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=800&auto=format&fit=crop" 
                  alt="Expedición en los Andes Cusco" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021413] via-[#021413]/75 to-black/30" />
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/80 text-black shadow-xs">
                    {translateText('04 • Salida VIP', currentLang)}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-300">
                    <Sparkles size={16} />
                  </div>
                </div>

                <div className="relative z-10 space-y-2 mt-auto pt-6">
                  <h3 className="text-base font-black text-white leading-snug drop-shadow-sm">
                    {translateText('Logística Integral de Expedición', currentLang)}
                  </h3>
                  <p className="text-xs text-emerald-100/80 leading-relaxed">
                    {translateText('Transporte privado 4x4 puerta a puerta, guías bilingües colegiados DIRCETUR y gastronomía andina gourmet.', currentLang)}
                  </p>
                  <div className="pt-2 flex items-center text-[11px] font-bold text-emerald-300">
                    <span>{translateText('Todo Incluido de Principio a Fin', currentLang)}</span>
                    <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

            </div>

            {/* Llamado a la Acción al pie de la sección */}
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => handleOpenAction(data.name)}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 text-[#021614] font-black text-xs sm:text-sm shadow-[0_12px_32px_rgba(16,185,129,0.35)] hover:shadow-[0_16px_40px_rgba(16,185,129,0.55)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Sparkles size={16} />
                <span>{translateText('Planificar Mi Expedición a Medida', currentLang)}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 6. ITINERARIO PASO A PASO (PRO & ADVANCE) */}
      {(isPro || isAdvance) && (
        <section id="itinerario" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] sm:w-[1100px] h-[650px] bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.48)_0%,rgba(16,185,129,0.30)_45%,transparent_75%)] blur-3xl pointer-events-none z-0" />
          <div className="absolute -top-10 -right-20 w-[600px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.38)_0%,transparent_70%)] blur-3xl pointer-events-none z-0" />
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block">{translateText('Cronograma Oficial', currentLang)}</span>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">{t.itineraryTitle}</h2>
                <p className="text-xs sm:text-sm text-emerald-200/70 mt-1">{t.itinerarySub}</p>
              </div>

              {/* Selector de Vista: Pestañas vs Todos los Días */}
              <div className="flex items-center gap-1 bg-white/10 p-1 rounded-2xl border border-white/15 text-xs font-bold shrink-0">
                <button
                  type="button"
                  onClick={() => setItineraryViewMode('tabs')}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    itineraryViewMode === 'tabs' ? 'bg-emerald-400 text-slate-950 font-black' : 'text-emerald-200 hover:text-white'
                  }`}
                >
                  {t.viewDayByDay}
                </button>
                <button
                  type="button"
                  onClick={() => setItineraryViewMode('all')}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    itineraryViewMode === 'all' ? 'bg-emerald-400 text-slate-950 font-black' : 'text-emerald-200 hover:text-white'
                  }`}
                >
                  {t.viewFullSchedule}
                </button>
              </div>
            </div>

            {/* Vista Pestañas Interactivas */}
            {itineraryViewMode === 'tabs' ? (
              <div className="space-y-6">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {activeItinerary.map((step, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedDayIdx(idx)}
                      className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap border flex items-center gap-2 shrink-0 ${
                        selectedDayIdx === idx
                          ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 border-emerald-300 shadow-lg shadow-emerald-500/25 scale-102'
                          : 'bg-white/[0.05] text-emerald-100 hover:bg-white/10 border-white/10'
                      }`}
                    >
                      <span>{step.step || `Día ${idx + 1}`}</span>
                      {selectedDayIdx === idx && <CheckCircle2 size={15} />}
                    </button>
                  ))}
                </div>

                {activeItinerary[selectedDayIdx] && (
                  <div className="relative overflow-hidden p-6 sm:p-9 rounded-[36px] bg-white/[0.06] backdrop-blur-2xl border border-emerald-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6 animate-in fade-in duration-300">
                    <div className="relative z-10 space-y-5">
                      <div 
                        onClick={() => openLightbox(activeItinerary[selectedDayIdx].image || ITINERARY_SCENIC_IMAGES[selectedDayIdx % ITINERARY_SCENIC_IMAGES.length])}
                        className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden border border-white/15 shadow-xl group cursor-pointer"
                      >
                        <Image 
                          src={activeItinerary[selectedDayIdx].image || ITINERARY_SCENIC_IMAGES[selectedDayIdx % ITINERARY_SCENIC_IMAGES.length]}
                          alt={activeItinerary[selectedDayIdx].title}
                          fill 
                          sizes="(max-width: 768px) 100vw, 800px"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                        
                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-emerald-300 text-xs font-black flex items-center gap-1.5 border border-white/20 shadow-md">
                          <Mountain size={13} className="text-emerald-400" />
                          <span>{activeItinerary[selectedDayIdx].altitude}</span>
                        </div>

                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold flex items-center gap-1.5 border border-white/20 shadow-md">
                          <Clock size={13} className="text-teal-400" />
                          <span>{activeItinerary[selectedDayIdx].hikingTime}</span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between gap-2">
                          <span className="px-2.5 py-0.5 rounded-lg bg-emerald-400 text-slate-950 font-black text-xs shadow-xs">
                            {activeItinerary[selectedDayIdx].step || `Día ${selectedDayIdx + 1}`}
                          </span>
                          <span className="text-xs sm:text-sm font-black text-white truncate drop-shadow-md">
                            {activeItinerary[selectedDayIdx].title}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
                        {activeItinerary[selectedDayIdx].desc}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-teal-400 block flex items-center gap-1">
                            <Mountain size={12} /> {translateText('Altitud', currentLang)}
                          </span>
                          <span className="text-xs font-black text-white block">{activeItinerary[selectedDayIdx].altitude}</span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-emerald-400 block flex items-center gap-1">
                            <Clock size={12} /> {translateText('Caminata', currentLang)}
                          </span>
                          <span className="text-xs font-black text-white block">{activeItinerary[selectedDayIdx].hikingTime}</span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-amber-400 block flex items-center gap-1">
                            <Utensils size={12} /> {translateText('Comidas', currentLang)}
                          </span>
                          <span className="text-xs font-black text-white block truncate">{activeItinerary[selectedDayIdx].meals}</span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-cyan-400 block flex items-center gap-1">
                            <Bed size={12} /> {translateText('Hospedaje', currentLang)}
                          </span>
                          <span className="text-xs font-black text-white block truncate">{activeItinerary[selectedDayIdx].lodging}</span>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                        {isAdvance && (
                          <button
                            type="button"
                            onClick={() => setIsBrochureOpen(true)}
                            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-emerald-200 text-xs font-bold border border-white/20 transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <Printer size={13} />
                            <span>{t.downloadBrochureBtn}</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleOpenAction(`${cleanTitleInput}: ${activeItinerary[selectedDayIdx].step}: ${activeItinerary[selectedDayIdx].title}`)}
                          className="emerald-shimmer-btn bg-emerald-500/20 hover:bg-emerald-400 hover:text-slate-950 text-emerald-300 font-bold text-xs px-5 py-2.5 rounded-full border border-emerald-400/40 transition-all cursor-pointer flex items-center gap-2"
                        >
                          <MessageCircle size={14} />
                          <span>{translateText('Consultar itinerario de esta jornada', currentLang)}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Vista Cronograma Completo en Cascada */
              <div className="space-y-4">
                {activeItinerary.map((step, sIdx) => (
                  <div 
                    key={sIdx}
                    className="p-6 rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 hover:border-emerald-400/40 transition-all flex flex-col sm:flex-row sm:items-start gap-4 shadow-sm"
                  >
                    <div className="px-3.5 py-1.5 rounded-xl bg-emerald-400 text-[#041716] font-black text-xs shrink-0 self-start shadow-xs">
                      {step.step || `Día ${sIdx + 1}`}
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="text-base font-black text-white">{step.title}</h4>
                      <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">{step.desc}</p>
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-emerald-300/80">
                        <span className="bg-white/10 px-2 py-0.5 rounded-md inline-flex items-center gap-1"><Mountain size={11} className="text-emerald-300" /> {step.altitude}</span>
                        <span className="bg-white/10 px-2 py-0.5 rounded-md inline-flex items-center gap-1"><Clock size={11} className="text-emerald-300" /> {step.hikingTime}</span>
                        <span className="bg-white/10 px-2 py-0.5 rounded-md inline-flex items-center gap-1"><Utensils size={11} className="text-emerald-300" /> {step.meals}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 7. SERVICIOS INCLUIDOS & CHECKLIST DE MOCHILA (OCULTO EN FREE) */}
      {!isFree && (
        <section id="incluye" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="absolute top-1/2 -right-24 -translate-y-1/2 w-[650px] sm:w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.48)_0%,rgba(13,148,136,0.25)_45%,transparent_75%)] blur-3xl pointer-events-none z-0" />
          <div className="absolute top-1/2 -left-24 -translate-y-1/2 w-[600px] sm:w-[750px] h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(2,132,199,0.38)_0%,rgba(6,182,212,0.20)_45%,transparent_75%)] blur-3xl pointer-events-none z-0" />
          
          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block">{translateText('Equipamiento & Confort', currentLang)}</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {t.inclusionsTitle}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200/70">
                {t.inclusionsSub}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Columna Izquierda: Qué Incluye */}
              <div className={`${(isPro || isAdvance) ? 'lg:col-span-7' : 'lg:col-span-12 max-w-4xl mx-auto'} relative overflow-hidden p-7 sm:p-9 rounded-[36px] bg-white/[0.06] backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6 w-full`}>
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/40">
                        <CheckCircle2 size={18} />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-white">{t.includedServices}</h3>
                        <p className="text-[11px] text-emerald-300/80">{translateText('Cobertura garantizada de alta montaña', currentLang)}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      {t.includedBadge}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {includedList.map((inc, iIdx) => (
                      <div 
                        key={iIdx}
                        className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-emerald-400/40 transition-all flex items-start gap-3 group"
                      >
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <Check size={14} className="stroke-[3]" />
                        </div>
                        <span className="text-xs text-emerald-100/90 leading-snug font-medium">
                          {inc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Mochila & Qué NO Incluye (PRO & ADVANCE) */}
              {(isPro || isAdvance) && (
                <div className="lg:col-span-5 space-y-6">
                  {/* Tarjeta Qué Llevar (Checklist Interactivo) */}
                  <div className="relative overflow-hidden p-6 sm:p-7 rounded-[36px] bg-white/[0.06] backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-400/40">
                          <Backpack size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-white">{t.whatToBring}</h4>
                          <p className="text-[10px] text-emerald-200/70">{t.whatToBringSub}</p>
                        </div>
                      </div>

                      <span className="text-xs font-black text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                        {packedCount}/{whatToBringList.length}
                      </span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300"
                        style={{ width: `${packedPct}%` }}
                      />
                    </div>

                    <div className="space-y-2">
                      {whatToBringList.map((item, wIdx) => {
                        const isChecked = !!checkedPacking[wIdx];
                        return (
                          <div 
                            key={wIdx} 
                            onClick={() => toggleChecklist(wIdx)}
                            className={`flex items-center gap-2.5 p-2 rounded-xl text-xs transition-all cursor-pointer ${
                              isChecked ? 'bg-emerald-500/10 text-white font-semibold' : 'text-emerald-100/70 hover:bg-white/5'
                            }`}
                          >
                            {isChecked ? (
                              <CheckSquare size={16} className="text-emerald-400 shrink-0" />
                            ) : (
                              <Square size={16} className="text-emerald-300/40 shrink-0" />
                            )}
                            <span className={isChecked ? 'line-through opacity-80' : ''}>{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tarjeta Qué NO Incluye */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-300/80">
                      <XCircle size={15} className="text-rose-400/80 shrink-0" />
                      <span>{t.notIncludedTitle}</span>
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-emerald-200/70 list-disc list-inside">
                      {notIncludedList.map((nInc, nIdx) => (
                        <li key={nIdx}>{nInc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* 8. SELLOS DE CONFIANZA & SEGURIDAD FORMAL (PRO & ADVANCE) */}
      {(isPro || isAdvance) && (
        <section className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.30)_0%,transparent_70%)] blur-2xl pointer-events-none z-0" />
          <div className="relative z-10 p-6 sm:p-8 rounded-[36px] bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-emerald-950/40 backdrop-blur-2xl border border-emerald-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-center md:text-left">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-emerald-400/40 shadow-lg shrink-0 hidden sm:flex items-center justify-center bg-emerald-950/60">
                  <Award size={22} className="relative z-10 text-emerald-300 drop-shadow-md" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 flex items-center justify-center md:justify-start gap-1.5">
                    <ShieldCheck size={12} className="text-emerald-400" /> {t.officialAccreditation}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {t.officialOperatorTitle}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto">
                {trustBadgesList.slice(0, 6).map((badge, bIdx) => (
                  <div 
                    key={bIdx}
                    className="px-3.5 py-2 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center gap-2 text-[11px] font-bold text-emerald-100/90 shadow-2xs hover:border-emerald-400/40 transition-colors"
                  >
                    <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                    <span className="truncate">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 9. PINTEREST PINBOARD & GALERÍA HD (OCULTO EN FREE) */}
      {!isFree && (
        <section id="galeria" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] sm:w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.42)_0%,rgba(13,148,136,0.25)_45%,transparent_75%)] blur-3xl pointer-events-none z-0" />
          <div className="absolute top-1/3 -left-20 w-[550px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.35)_0%,transparent_70%)] blur-3xl pointer-events-none z-0" />
          
          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block">Galería Fotográfica HD</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {t.galleryTitle}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200/70">
                {t.gallerySub}
              </p>
            </div>

            <PinterestPinboard
              images={data.galleryImages}
              destination={destinationName}
              tourName={data.name || 'Expedición de Aventura'}
              tier={tier}
              theme="emerald-explorer"
              isMobile={isMobile}
              lang={currentLang}
            />
          </div>
        </section>
      )}

      {/* 10. CATÁLOGO DE TOURS (VISIBLE EN TODOS LOS PLANES) */}
      <section id="tours" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-1/2 -left-24 -translate-y-1/2 w-[650px] sm:w-[850px] h-[520px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.45)_0%,rgba(6,182,212,0.22)_45%,transparent_75%)] blur-3xl pointer-events-none z-0" />
        <div className="absolute top-1/2 -right-24 -translate-y-1/2 w-[600px] sm:w-[750px] h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(2,132,199,0.40)_0%,rgba(13,148,136,0.20)_45%,transparent_75%)] blur-3xl pointer-events-none z-0" />

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-black mb-3">
                <Compass size={13} className="text-emerald-400" />
                <span>{translateText('Salidas Garantizadas 2025 - 2026', currentLang)}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex flex-wrap items-center gap-2.5">
                <span>{t.toursTitle}</span>
                <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/40">
                  {displayTours.length} {t.allToursBadge}
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200/70 mt-1.5 max-w-2xl leading-relaxed">
                {t.toursSub}
              </p>
            </div>

            {/* Filtros de Categoría */}
            <div className="flex flex-wrap items-center gap-1.5 bg-white/[0.06] p-1.5 rounded-2xl border border-white/10 shrink-0">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'trekking', label: 'Trekking & Montaña' },
                { id: 'classic', label: 'Clásicos & Cultura' },
                { id: 'fullday', label: 'Full Day' }
              ].map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setTourCategory(cat.id);
                    setTourPage(0);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    tourCategory === cat.id
                      ? 'bg-emerald-400 text-slate-950 shadow-md font-black'
                      : 'text-emerald-200/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {translateText(cat.label, currentLang)}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Cards de Tours (Balanceado: 3 en Free/Basic, 6 en Pro/Advance) */}
          <div className={`grid gap-6 ${isFreeOrBasic ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
            {visibleTours.map((tour, idx) => {
              const isFav = favorites[tour.id || idx];
              const tourUsd = parseInt(tour.price.replace(/\D/g, '') || '85', 10);
              return (
                <div 
                  key={tour.id || idx}
                  className="group rounded-3xl glass-floating-card overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-emerald-400/40 hover:shadow-2xl hover:shadow-emerald-950/40"
                >
                  <div 
                    onClick={() => openLightbox(tour.image || heroImg)}
                    className="relative h-56 w-full overflow-hidden bg-emerald-950 cursor-pointer"
                  >
                    <Image 
                      src={tour.image || heroImg} 
                      alt={tour.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-108 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041716] via-transparent to-black/30" />

                    <div className="absolute top-3.5 left-3.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-amber-300 font-black text-xs flex items-center gap-1 border border-white/20 shadow-md">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span>{tour.rating || 4.8}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(tour.id || String(idx)); }}
                      className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:scale-110 shadow-md transition-transform cursor-pointer"
                      aria-label="Guardar tour en favoritos"
                    >
                      <Heart size={14} className={isFav ? "fill-rose-500 text-rose-500" : "text-white"} />
                    </button>

                    <div className="absolute bottom-3.5 right-3.5 bg-emerald-400 text-[#041716] font-black text-xs sm:text-sm px-3.5 py-1 rounded-xl shadow-lg">
                      {formatPrice(tourUsd, passengers)}
                    </div>
                  </div>

                  <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 block mb-1">
                        {tour.location || 'Cusco Imperial'} • {tour.duration || 'Full Day'}
                      </span>
                      <h3 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors leading-snug">
                        {tour.title}
                      </h3>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <div className="flex -space-x-2 overflow-hidden">
                          <div className="inline-block h-6 w-6 rounded-full ring-2 ring-[#041716] bg-emerald-800 relative overflow-hidden">
                            <Image src="/images/travelers/traveler-machu-picchu.jpg" alt="User" fill className="object-cover" />
                          </div>
                          <div className="inline-block h-6 w-6 rounded-full ring-2 ring-[#041716] bg-teal-800 relative overflow-hidden">
                            <Image src="/images/travelers/traveler-humantay.jpg" alt="User" fill className="object-cover" />
                          </div>
                        </div>
                        <span className="text-[10px] text-emerald-200/70 font-semibold">+230</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenAction(tour.title)}
                        className="emerald-shimmer-btn bg-emerald-500/20 hover:bg-emerald-400 hover:text-[#041716] text-emerald-300 font-bold text-xs px-4 py-1.5 rounded-full border border-emerald-400/40 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
                      >
                        {t.exploreBtn}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Paginación de Tours */}
          {totalTourPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              <button
                type="button"
                disabled={currentTourPage === 0}
                onClick={() => setTourPage(Math.max(0, currentTourPage - 1))}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 border border-white/20 text-emerald-300 flex items-center justify-center cursor-pointer transition-all shadow-md"
                aria-label="Página anterior"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-2">
                {[...Array(totalTourPages)].map((_, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => setTourPage(pIdx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      currentTourPage === pIdx ? 'w-7 bg-emerald-400' : 'w-2.5 bg-white/25 hover:bg-white/45'
                    }`}
                    aria-label={`Ir a página ${pIdx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                disabled={currentTourPage >= totalTourPages - 1}
                onClick={() => setTourPage(Math.min(totalTourPages - 1, currentTourPage + 1))}
                className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 text-[#041716] font-bold flex items-center justify-center cursor-pointer transition-all shadow-md"
                aria-label="Página siguiente"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 11. MÓDULOS EXCLUSIVOS ADVANCE TIER */}

      {/* 11.1 TESTIMONIOS & RESEÑAS VERIFICADAS (SOLO ADVANCE) */}
      {isAdvance && (
        <section id="resenas" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] sm:w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(2,132,199,0.42)_0%,rgba(245,158,11,0.22)_45%,transparent_75%)] blur-3xl pointer-events-none z-0" />
          <div className="absolute top-1/4 -right-20 w-[550px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.35)_0%,transparent_70%)] blur-3xl pointer-events-none z-0" />
          
          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold">
                <Star size={12} className="fill-amber-400" />
                <span>{translateText('4.9 / 5.0 en Reseñas Internacionales', currentLang)}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {t.reviewsTitle}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200/70">
                {t.reviewsSub}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonialsList.map((rev, rIdx) => (
                <div 
                  key={rIdx}
                  className="glass-floating-card p-6 sm:p-7 rounded-[32px] flex flex-col justify-between space-y-5 animate-emerald-float group hover:-translate-y-2 transition-all relative overflow-hidden"
                  style={{ animationDelay: `${rIdx * 1.5}s` }}
                >
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} size={15} className="fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed italic">
                      &quot;{rev.comment}&quot;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-400/40 shadow-sm shrink-0">
                        <Image 
                          src={TESTIMONIAL_AVATARS[rIdx % TESTIMONIAL_AVATARS.length]} 
                          alt={rev.name}
                          fill 
                          sizes="36px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-white text-xs sm:text-sm">{rev.name}</h4>
                        <span className="text-[10px] text-emerald-300/70 flex items-center gap-1">
                          <MapPin size={10} /> {rev.origin}
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shrink-0">
                      {t.verifiedReview}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11.2 TURISMO SOSTENIBLE & HUELLA CERO (SOLO ADVANCE) */}
      {isAdvance && (
        <SustainabilityAndSocialProof 
          lang={currentLang} 
          brandName={data.companyName || 'NavikX Cusco Expeditions'} 
          isMobile={isMobile} 
        />
      )}

      {/* 11.3 TOUR SUPPORT & FORO DE FAQS (SOLO ADVANCE) */}
      {isAdvance && (
        <section id="faqs" className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] sm:w-[1050px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(13,148,136,0.45)_0%,rgba(14,165,233,0.25)_45%,transparent_75%)] blur-3xl pointer-events-none z-0" />
          <div className="absolute top-1/3 -left-20 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.30)_0%,transparent_70%)] blur-3xl pointer-events-none z-0" />
          
          <div className="relative z-10">
            <TourSupportAndFaqs
              faqs={data.faqs}
              tourName={heroTitle}
              whatsapp={guidePhone}
              guideName={guideName}
              destination={destinationName}
              tier={tier}
              theme="emerald-explorer"
              isMobile={isMobile}
              lang={currentLang}
            />
          </div>
        </section>
      )}

      {/* 11.4 GARANTÍA DE FLEXIBILIDAD Y OFICINA FÍSICA (PRO & ADVANCE) */}
      {(isPro || isAdvance) && (
        <TrustGuaranteeAndOffice
          lang={currentLang}
          whatsapp={guidePhone}
          brandName={data.companyName?.trim() || 'NavikX Cusco Expeditions'}
          isMobile={isMobile}
          officeAddress={data.officeAddress || 'Portal de Panes N° 123, Plaza de Armas, Cusco'}
          officeHours={translateText(data.officeHours || 'Lunes a Domingo: 07:00 - 21:00', currentLang)}
          mapsUrl={data.mapsUrl}
        />
      )}

      {/* 12. BARRA DE MÉTRICAS INFERIOR */}
      <div className="relative z-20 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative p-4 sm:p-5 rounded-3xl bg-white/[0.08] backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative z-10 flex flex-wrap items-center justify-around gap-6 text-center sm:text-left flex-1">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-black text-white block">{translateText('50+ Rutas', currentLang)}</span>
                <span className="text-[10px] text-emerald-200/70">{translateText('Destinos de Autor', currentLang)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users size={18} className="text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-black text-white block">{translateText('100K+ Turistas', currentLang)}</span>
                <span className="text-[10px] text-emerald-200/70">{translateText('Experiencias Felices', currentLang)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Star size={18} className="text-amber-400 shrink-0 fill-amber-400" />
              <div>
                <span className="text-xs font-black text-white block">{translateText('4.9★ Promedio', currentLang)}</span>
                <span className="text-[10px] text-emerald-200/70">{translateText('TripAdvisor & Google', currentLang)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={18} className="text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-black text-white block">{translateText('24/7 Soporte', currentLang)}</span>
                <span className="text-[10px] text-emerald-200/70">{translateText('Oxígeno y Asistencia', currentLang)}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleOpenAction(data.name)}
            className="emerald-shimmer-btn w-full md:w-auto bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-[0_10px_25px_rgba(249,115,22,0.4)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 shrink-0"
          >
            <Compass size={16} />
            <span>{data.hero?.cta ? translateText(data.hero.cta, currentLang) : t.planYourTripBtn} ({formatPrice(basePriceUsd, passengers)})</span>
          </button>
        </div>
      </div>

      {/* 13. BANNER DEL PLAN GRATUITO (SOLO FREE) */}
      {isFree && (
        <div className="bg-[#031822] text-emerald-300/80 py-3 px-4 text-center text-xs border-t border-emerald-900/50">
          <p>{t.freeBanner}</p>
        </div>
      )}

      {/* 14. FOOTER LEGAL & LIBRO DE RECLAMACIONES */}
      <footer className="relative z-10 border-t border-emerald-900/60 bg-[#020d0d] py-10 px-4 sm:px-6 lg:px-8 text-xs text-emerald-200/70">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            {data.logoUrl ? (
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-white/95 p-1 flex items-center justify-center border border-emerald-400/40 shadow-xs shrink-0">
                <img src={data.logoUrl} alt={data.companyName || 'Logo'} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Compass size={16} />
              </div>
            )}
            <div>
              <span className="font-bold text-white text-sm">{data.companyName?.trim() || data.name?.replace(/^dise[ñn]o\s*\d+\s*[-–:]\s*/i, '').trim() || 'NavikX Cusco'}</span>
              <p className="text-[11px] text-emerald-300/70">
                {data.companyTagline ? `${data.companyTagline} • ` : ''}{data.companyRuc ? `${data.companyRuc} • ` : ''}{t.footerRights}
              </p>
              {data.companyEmail && (
                <a href={`mailto:${data.companyEmail}`} className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors mt-0.5" title={data.companyEmail}>
                  <Mail size={12} className="shrink-0" />
                  <span className="truncate">{data.companyEmail}</span>
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <button
              onClick={() => setIsComplaintsOpen(true)}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen size={14} />
              <span>{t.complaintsBook}</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setIsTermsOpen(true)}
              className="text-emerald-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <Lock size={14} />
              <span>{t.legalTerms}</span>
            </button>
          </div>
        </div>
      </footer>

      {/* SOCIAL PROOF NOTIFICACIONES FLOTANTES EN VIVO (!isFree) */}
      {!isFree && (
        <RecentBookingsToast lang={currentLang} />
      )}

      {/* MODALES */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        landing={data as LandingData}
        lang={currentLang}
      />

      <ComplaintsBookModal
        isOpen={isComplaintsOpen}
        onClose={() => setIsComplaintsOpen(false)}
        agencyName={data.companyName || data.name || 'NavikX Cusco Expeditions'}
        agencyRuc={data.companyRuc || "20601234567"}
        agencyAddress={data.officeAddress || 'Portal de Panes N° 123, Plaza de Armas, Cusco'}
      />

      <LegalTermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        agencyName={data.companyName || data.name || 'NavikX Cusco Expeditions'}
        lang={currentLang}
      />

      {/* MODAL BROCHURE ITINERARIO EN PDF (SOLO ADVANCE) */}
      <BrochurePrintModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        data={data || {}}
        brandName={data.companyName || 'NavikX Cusco'}
        fullAgencyName={data.companyName ? `${data.companyName}${data.companyRuc ? ` • ${data.companyRuc}` : ' • Operador Turístico'}` : 'NavikX Cusco Expeditions'}
        whatsappNumber={guidePhone}
        lang={currentLang}
      />

      {/* MODAL VISOR LIGHTBOX FOTOS EN PANTALLA COMPLETA */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={allGalleryPhotos}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
        title={heroTitle}
      />

    </div>
  );
}
