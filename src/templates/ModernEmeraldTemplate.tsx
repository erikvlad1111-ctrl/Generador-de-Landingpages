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
  Check
} from 'lucide-react';
import { LandingData, PlanTier, ObjectiveType, LanguageType, CatalogTourItem } from '@/types/landing';
import { DEFAULT_SECONDARY_CATALOG_TOURS } from '@/data/defaultCatalogTours';
import QuoteModal from '@/components/common/QuoteModal';
import ComplaintsBookModal from '@/components/common/ComplaintsBookModal';
import LegalTermsModal from '@/components/common/LegalTermsModal';
import HeaderLanguageSelector from '@/components/common/HeaderLanguageSelector';

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
    navExperiences: 'Experiencias',
    navItinerary: 'Itinerario',
    navAbout: 'Nosotros',
    navContact: 'Contacto',
    liveAdventure: 'Vive Tu Aventura.',
    searchWhere: '¿A dónde deseas ir?',
    searchDates: 'Fechas / Temporada',
    searchBtn: 'Explorar',
    benefit1Title: 'Guías Expertos',
    benefit1Desc: 'Conocimiento local y tips auténticos',
    benefit2Title: 'Rutas a Medida',
    benefit2Desc: 'Planes flexibles para cada viajero',
    benefit3Title: 'Mejor Precio Garantizado',
    benefit3Desc: 'Tarifas directas sin intermediarios',
    popularTitle: 'Destinos Populares',
    popularSub: 'Explora lugares asombrosos y crea recuerdos inolvidables en los Andes.',
    exploreBtn: 'Explorar Tour',
    planTitle: 'Planifica Tu Viaje',
    happyTravelers: 'Viajeros Felices',
    positiveReviews: 'Reseñas Positivas',
    curatedRoutes: 'Destinos y Rutas',
    whyTitle: '¿Por Qué Viajar Con Nosotros?',
    why1: 'Experiencia Local',
    why1Desc: 'Operadores nativos con licencia oficial DIRCETUR.',
    why2: 'Itinerarios Personalizados',
    why2Desc: 'Adaptados a tu ritmo físico y preferencias.',
    why3: 'Turismo Sostenible',
    why3Desc: 'Impacto positivo en comunidades altoandinas.',
    why4: 'Viaje Seguro',
    why4Desc: 'Monitoreo 24/7, botiquín y oxígeno medicinal.',
    itineraryTitle: 'Itinerario Detallado de la Expedición',
    techSheetTitle: 'Ficha Técnica de la Ruta',
    includedTitle: 'Lo Que Incluye Tu Experiencia',
    notIncludedTitle: 'Qué No Incluye',
    backpackTitle: 'Qué Llevar en Tu Mochila',
    trustTitle: 'Garantías y Certificaciones Oficiales',
    faqsTitle: 'Preguntas Frecuentes',
    reviewsTitle: 'Lo Que Dicen Nuestros Viajeros',
    planYourTripBtn: 'Planificar Mi Viaje',
    quoteBtn: 'Solicitar Cotización',
    whatsappBtn: 'Reservar por WhatsApp',
    footerRights: 'Todos los derechos reservados. Agencia de Viajes y Turismo Autorizada.',
    complaintsBook: 'Libro de Reclamaciones Virtual',
    legalTerms: 'Términos, Condiciones & Normativa Legal'
  },
  en: {
    brandTag: 'Explore. Dream. Discover.',
    navHome: 'Home',
    navDestinations: 'Destinations',
    navExperiences: 'Experiences',
    navItinerary: 'Itinerary',
    navAbout: 'About Us',
    navContact: 'Contact',
    liveAdventure: 'Live Your Adventure.',
    searchWhere: 'Where to?',
    searchDates: 'Dates / Duration',
    searchBtn: 'Search',
    benefit1Title: 'Expert Guides',
    benefit1Desc: 'Local insights & authentic tips',
    benefit2Title: 'Tailored Itineraries',
    benefit2Desc: 'Custom plans for every traveler',
    benefit3Title: 'Best Price Guarantee',
    benefit3Desc: 'Direct deals for your next adventure',
    popularTitle: 'Popular Destinations',
    popularSub: 'Explore breathtaking places and create unforgettable memories in the Andes.',
    exploreBtn: 'Explore Now',
    planTitle: 'Plan Your Journey',
    happyTravelers: 'Happy Travelers',
    positiveReviews: 'Positive Reviews',
    curatedRoutes: 'Curated Destinations',
    whyTitle: 'Why Travel With Us?',
    why1: 'Local Expertise',
    why1Desc: 'Native certified operators with DIRCETUR license.',
    why2: 'Custom Itineraries',
    why2Desc: 'Designed around your pace and preferences.',
    why3: 'Sustainable Travel',
    why3Desc: 'Positive impact on local Andean communities.',
    why4: 'Worry-Free Travel',
    why4Desc: '24/7 monitoring, medical first-aid and oxygen.',
    itineraryTitle: 'Detailed Expedition Itinerary',
    techSheetTitle: 'Technical Route Overview',
    includedTitle: 'What Your Experience Includes',
    notIncludedTitle: 'What Is Not Included',
    backpackTitle: 'What to Pack in Your Daypack',
    trustTitle: 'Official Guarantees & Credentials',
    faqsTitle: 'Frequently Asked Questions',
    reviewsTitle: 'What Our Travelers Say',
    planYourTripBtn: 'Plan Your Trip',
    quoteBtn: 'Request Instant Quote',
    whatsappBtn: 'Book via WhatsApp',
    footerRights: 'All rights reserved. Certified Tour Operator.',
    complaintsBook: 'Virtual Complaints Book',
    legalTerms: 'Terms, Conditions & Legal Policies'
  },
  pt: {
    brandTag: 'Explore. Sonhe. Descubra.',
    navHome: 'Início',
    navDestinations: 'Destinos',
    navExperiences: 'Experiências',
    navItinerary: 'Itinerário',
    navAbout: 'Sobre Nós',
    navContact: 'Contato',
    liveAdventure: 'Viva Sua Aventura.',
    searchWhere: 'Para onde?',
    searchDates: 'Datas / Duração',
    searchBtn: 'Explorar',
    benefit1Title: 'Guias Especialistas',
    benefit1Desc: 'Conhecimento local e dicas exclusivas',
    benefit2Title: 'Roteiros Sob Medida',
    benefit2Desc: 'Planos flexíveis para cada viajante',
    benefit3Title: 'Melhor Preço Garantido',
    benefit3Desc: 'Tarifas diretas sem intermediários',
    popularTitle: 'Destinos Populares',
    popularSub: 'Explore lugares deslumbrantes e crie memórias inesquecíveis nos Andes.',
    exploreBtn: 'Explorar Tour',
    planTitle: 'Planeje Sua Viagem',
    happyTravelers: 'Viajantes Felizes',
    positiveReviews: 'Avaliações Positivas',
    curatedRoutes: 'Destinos e Rotas',
    whyTitle: 'Por Que Viajar Conosco?',
    why1: 'Experiência Local',
    why1Desc: 'Operadores nativos certificados pela DIRCETUR.',
    why2: 'Roteiros Personalizados',
    why2Desc: 'Adaptados ao seu ritmo e preferências.',
    why3: 'Turismo Sustentável',
    why3Desc: 'Impacto positivo nas comunidades locais.',
    why4: 'Viagem Tranquila',
    why4Desc: 'Suporte 24/7, primeiros socorros e oxigênio.',
    itineraryTitle: 'Itinerário Detalhado da Expedição',
    techSheetTitle: 'Ficha Técnica do Roteiro',
    includedTitle: 'O Que Inclui a Sua Experiência',
    notIncludedTitle: 'O Que Não Inclui',
    backpackTitle: 'O Que Levar na Mochila',
    trustTitle: 'Garantias e Certificações Oficiais',
    faqsTitle: 'Perguntas Frequentes',
    reviewsTitle: 'O Que Dizem os Nossos Viajantes',
    planYourTripBtn: 'Planejar Viagem',
    quoteBtn: 'Solicitar Orçamento',
    whatsappBtn: 'Reservar pelo WhatsApp',
    footerRights: 'Todos os direitos reservados. Agência de Turismo Autorizada.',
    complaintsBook: 'Livro de Reclamações Virtual',
    legalTerms: 'Termos, Condições & Políticas Legais'
  },
  fr: {
    brandTag: 'Explorez. Rêvez. Découvrez.',
    navHome: 'Accueil',
    navDestinations: 'Destinations',
    navExperiences: 'Expériences',
    navItinerary: 'Itinéraire',
    navAbout: 'À Propos',
    navContact: 'Contact',
    liveAdventure: 'Vivez Votre Aventure.',
    searchWhere: 'Où aller ?',
    searchDates: 'Dates / Durée',
    searchBtn: 'Rechercher',
    benefit1Title: 'Guides Experts',
    benefit1Desc: 'Savoir local et conseils authentiques',
    benefit2Title: 'Itinéraires Sur Mesure',
    benefit2Desc: 'Plans personnalisés pour chaque voyageur',
    benefit3Title: 'Meilleur Prix Garanti',
    benefit3Desc: 'Tarifs directs sans intermédiaires',
    popularTitle: 'Destinations Populaires',
    popularSub: 'Explorez des paysages époustouflants et créez des souvenirs inoubliables.',
    exploreBtn: 'Explorer',
    planTitle: 'Planifiez Votre Voyage',
    happyTravelers: 'Voyageurs Comblés',
    positiveReviews: 'Avis Positifs',
    curatedRoutes: 'Destinations Remarquables',
    whyTitle: 'Pourquoi Voyager Avec Nous ?',
    why1: 'Expertise Locale',
    why1Desc: 'Opérateurs locaux certifiés DIRCETUR.',
    why2: 'Itinéraires Personnalisés',
    why2Desc: 'Adaptés à votre rythme et vos envies.',
    why3: 'Tourisme Durable',
    why3Desc: 'Impact solidaire dans les Andes.',
    why4: 'Voyage Sans Souci',
    why4Desc: 'Assistance 24/7, trousse médicale et oxygène.',
    itineraryTitle: 'Itinéraire Détaillé',
    techSheetTitle: 'Fiche Technique du Tour',
    includedTitle: 'Ce Qui Est Inclus',
    notIncludedTitle: 'Ce Qui N’est Pas Inclus',
    backpackTitle: 'Dans Votre Sac à Dos',
    trustTitle: 'Garanties et Agréments Officiels',
    faqsTitle: 'Questions Fréquentes',
    reviewsTitle: 'Avis de Nos Voyageurs',
    planYourTripBtn: 'Planifier Mon Séjour',
    quoteBtn: 'Demander un Devis',
    whatsappBtn: 'Réserver par WhatsApp',
    footerRights: 'Tous droits réservés. Agence Touristique Agréée.',
    complaintsBook: 'Livre de Réclamations Virtuel',
    legalTerms: 'Conditions Générales & Mentions Légales'
  },
  it: {
    brandTag: 'Esplora. Sogna. Scopri.',
    navHome: 'Home',
    navDestinations: 'Destinazioni',
    navExperiences: 'Esperienze',
    navItinerary: 'Itinerario',
    navAbout: 'Chi Siamo',
    navContact: 'Contatti',
    liveAdventure: 'Vivi La Tua Avventura.',
    searchWhere: 'Dove andare?',
    searchDates: 'Date / Durata',
    searchBtn: 'Cerca',
    benefit1Title: 'Guide Esperte',
    benefit1Desc: 'Esperienza locale e consigli autentici',
    benefit2Title: 'Itinerari Su Misura',
    benefit2Desc: 'Programmi flessibili per ogni viaggiatore',
    benefit3Title: 'Miglior Prezzo Garantito',
    benefit3Desc: 'Offerte dirette senza intermediari',
    popularTitle: 'Destinazioni Popolari',
    popularSub: 'Esplora luoghi mozzafiato e crea ricordi indimenticabili sulle Ande.',
    exploreBtn: 'Esplora Ora',
    planTitle: 'Pianifica Il Tuo Viaggio',
    happyTravelers: 'Viaggiatori Soddisfatti',
    positiveReviews: 'Recensioni Positive',
    curatedRoutes: 'Destinazioni Selezionate',
    whyTitle: 'Perché Viaggiare Con Noi?',
    why1: 'Competenza Locale',
    why1Desc: 'Operatori certificati con licenza DIRCETUR.',
    why2: 'Itinerari Personalizzati',
    why2Desc: 'Studiati sul tuo ritmo e desideri.',
    why3: 'Turismo Sostenibile',
    why3Desc: 'Sostegno concreto alle comunità andine.',
    why4: 'Viaggio Senza Pensieri',
    why4Desc: 'Assistenza 24/7, kit medico e ossigeno.',
    itineraryTitle: 'Itinerario Dettagliato',
    techSheetTitle: 'Scheda Tecnica del Percorso',
    includedTitle: 'Cosa Include la Tua Esperienza',
    notIncludedTitle: 'Cosa Non È Incluso',
    backpackTitle: 'Cosa Mettere nello Zaino',
    trustTitle: 'Garanzie e Certificazioni Ufficiali',
    faqsTitle: 'Domande Frequenti',
    reviewsTitle: 'Cosa Dicono i Nostri Viaggiatori',
    planYourTripBtn: 'Pianifica il Viaggio',
    quoteBtn: 'Richiedi Preventivo',
    whatsappBtn: 'Prenota su WhatsApp',
    footerRights: 'Tutti i diritti riservati. Tour Operator Autorizzato.',
    complaintsBook: 'Registro Reclami Virtuale',
    legalTerms: 'Termini, Condizioni & Normativa Legale'
  }
};

export default function ModernEmeraldTemplate({ data = {}, isLive = false, viewMode = 'desktop' }: ModernEmeraldTemplateProps) {
  const [currentLang, setCurrentLang] = useState<LanguageType>((data.language as LanguageType) || 'es');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isComplaintsOpen, setIsComplaintsOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTourForQuote, setSelectedTourForQuote] = useState<string>(data.name || 'Expedición Machu Picchu');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const t = DICTIONARIES[currentLang] || DICTIONARIES.es;
  const tier: PlanTier = data.tier || 'advance';
  const isFreeOrBasic = tier === 'free' || tier === 'basic';
  const isWhatsapp = data.objective === 'whatsapp';
  const isQuote = data.objective === 'quote';
  const isBoth = data.objective === 'both';

  const heroImg = data.heroImage || 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop';
  const guideName = data.guideName || 'Carlos Mendoza';
  const guideCert = data.guideCert || 'Guía Oficial DIRCETUR & Operador Autorizado';
  const guidePhone = data.whatsapp || '+51984123456';
  const guideAvatar = data.guideAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop';

  const heroTitle = data.hero?.title || data.name || 'Live Your Adventure.';
  const heroSubtitle = data.hero?.subtitle || data.about?.content || 'Explora lugares asombrosos y crea recuerdos inolvidables alrededor de los Andes.';
  const heroBadge = data.hero?.badge || 'NavikX Cusco • Operador Autorizado';

  const toursList: CatalogTourItem[] = (data.catalogTours && data.catalogTours.length > 0) 
    ? data.catalogTours 
    : DEFAULT_SECONDARY_CATALOG_TOURS;

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenAction = (tourTitle?: string) => {
    if (tourTitle) setSelectedTourForQuote(tourTitle);
    if (isQuote || isBoth) {
      setIsQuoteOpen(true);
    } else {
      const cleanPhone = guidePhone.replace(/\D/g, '');
      const msg = encodeURIComponent(`Hola ${guideName}, deseo consultar disponibilidad y reservar el tour: ${tourTitle || data.name || 'Machu Picchu'}.`);
      window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
    }
  };

  const handleWhatsappDirect = (tourTitle?: string) => {
    const cleanPhone = guidePhone.replace(/\D/g, '');
    const msg = encodeURIComponent(`Hola ${guideName}, deseo consultar sobre ${tourTitle || data.name || 'Machu Picchu'} por WhatsApp.`);
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#041716] text-slate-100 font-sans selection:bg-[#10b981] selection:text-[#041716] overflow-x-hidden relative">
      
      {/* Luces Ambientales y Orbes Flotantes en Movimiento Continuo (Deep Teal + Glow Esmeralda) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 right-10 w-[550px] h-[550px] bg-emerald-500/20 rounded-full blur-[140px] animate-emerald-glow" />
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-teal-500/15 rounded-full blur-[160px] animate-emerald-glow [animation-delay:2.5s]" />
        <div className="absolute top-2/3 right-1/4 w-[650px] h-[650px] bg-emerald-600/15 rounded-full blur-[150px] animate-emerald-glow [animation-delay:5s]" />
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] animate-emerald-glow [animation-delay:3.5s]" />
      </div>

      {/* 1. TOP HEADER NAVIGATION CON TRANSPARENCIA GLASSMORPHISM */}
      <header className="relative z-30 border-b border-white/[0.08] bg-[#041716]/60 backdrop-blur-2xl sticky top-0 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo y Marca */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-[#041716] shadow-lg shadow-emerald-500/30 shrink-0">
              <Compass size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <span className="font-black text-lg tracking-tight text-white flex items-center gap-1.5">
                NavikX <span className="text-emerald-300 font-medium text-xs bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-400/30">Cusco</span>
              </span>
              <p className="text-[10px] text-emerald-200/60 font-medium tracking-wide">{t.brandTag}</p>
            </div>
          </div>

          {/* Menú Desktop Translúcido Flotante */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] backdrop-blur-xl p-1.5 rounded-full border border-white/10 shadow-lg text-xs font-semibold text-emerald-100/80">
            <a href="#inicio" className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/40 shadow-xs transition-all">
              {t.navHome}
            </a>
            <a href="#destinos" className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.08] transition-colors">
              {t.navDestinations}
            </a>
            <a href="#experiencias" className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.08] transition-colors">
              {t.navExperiences}
            </a>
            <a href="#itinerario" className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.08] transition-colors">
              {t.navItinerary}
            </a>
            <a href="#nosotros" className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.08] transition-colors">
              {t.navAbout}
            </a>
          </nav>

          {/* Controles Derecha: Idiomas + CTA */}
          <div className="flex items-center gap-3">
            {!isFreeOrBasic && (
              <HeaderLanguageSelector
                currentLang={currentLang}
                availableCodes={data.languages || [currentLang]}
                onSelectLang={(lang: LanguageType) => setCurrentLang(lang)}
                variant="portal"
              />
            )}

            <button
              onClick={() => handleOpenAction(data.name)}
              className="emerald-shimmer-btn bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 hover:from-emerald-300 hover:to-teal-300 text-[#041716] font-black text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <MessageCircle size={16} />
              <span>{isWhatsapp ? t.whatsappBtn : isQuote ? t.quoteBtn : t.planYourTripBtn}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/[0.06] border border-white/15 text-emerald-300 cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#061d1b]/95 backdrop-blur-2xl px-4 py-4 space-y-2 text-sm font-semibold animate-in slide-in-from-top-2">
            <a href="#inicio" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-emerald-300">{t.navHome}</a>
            <a href="#destinos" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-emerald-100/80">{t.navDestinations}</a>
            <a href="#experiencias" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-emerald-100/80">{t.navExperiences}</a>
            <a href="#itinerario" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-emerald-100/80">{t.navItinerary}</a>
            <a href="#nosotros" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-emerald-100/80">{t.navAbout}</a>
          </div>
        )}
      </header>

      {/* 2. HERO PRINCIPAL CON FOTO SIN BORDES VISIBLES + ESTILOS FLOTANTES ACTIVOS */}
      <section id="inicio" className="relative z-10 pt-8 sm:pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Columna Izquierda: Copys + Buscador Píldora Flotante + Beneficios */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Badge de Temporada Flotante con Levitación Continua */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/20 text-emerald-300 text-xs font-bold shadow-lg shadow-emerald-950/40 animate-float-badge">
              <Sparkles size={14} className="text-emerald-400" />
              <span>{heroBadge}</span>
            </div>

            {/* Titular Masivo */}
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
              {data.name ? (
                <>
                  {data.name.split(' ')[0]}{' '}
                  <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent">
                    {data.name.split(' ').slice(1).join(' ') || 'Adventure.'}
                  </span>
                </>
              ) : (
                <>
                  Live Your <br />
                  <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent">
                    Adventure.
                  </span>
                </>
              )}
            </h1>

            {/* Subtítulo */}
            <p className="text-base sm:text-lg text-emerald-100/70 max-w-xl leading-relaxed">
              {heroSubtitle}
            </p>

            {/* BARRA FLOTANTE DE BÚSQUEDA TIPO PÍLDORA (GLOW Y LEVITACIÓN CONSTANTE) */}
            <div className="p-2 sm:p-2.5 bg-white/[0.06] backdrop-blur-2xl border border-white/20 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 max-w-xl animate-pill-glow transition-all duration-300">
              <div className="flex items-center gap-2.5 px-4 py-2 flex-1 border-b sm:border-b-0 sm:border-r border-white/10 text-xs">
                <MapPin size={16} className="text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-emerald-300/70 font-semibold block">{t.searchWhere}</span>
                  <span className="text-xs font-bold text-white truncate block">{data.destination || 'Cusco & Machu Picchu'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2 flex-1 text-xs">
                <Calendar size={16} className="text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-emerald-300/70 font-semibold block">{t.searchDates}</span>
                  <span className="text-xs font-bold text-white truncate block">{data.duration || 'Full Day / Multidía'}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenAction(data.name)}
                className="emerald-shimmer-btn bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-[#041716] font-black text-xs px-6 py-3 rounded-full transition-all shadow-md shadow-emerald-500/30 flex items-center justify-center gap-1.5 cursor-pointer shrink-0 hover:scale-105 active:scale-95"
              >
                <Search size={14} />
                <span>{t.searchBtn}</span>
              </button>
            </div>

            {/* 3 TARJETAS BENTO FLOTANTES TRANSLÚCIDAS CON LEVITACIÓN ESCALONADA */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="glass-floating-card p-4 rounded-3xl animate-emerald-float space-y-1.5 group">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/25 text-emerald-300 flex items-center justify-center border border-emerald-400/30 group-hover:scale-110 transition-transform">
                  <Compass size={16} />
                </div>
                <h4 className="text-xs font-black text-white">{t.benefit1Title}</h4>
                <p className="text-[11px] text-emerald-200/60 leading-snug">{t.benefit1Desc}</p>
              </div>

              <div className="glass-floating-card p-4 rounded-3xl animate-emerald-float-delayed space-y-1.5 group">
                <div className="w-8 h-8 rounded-xl bg-teal-500/25 text-teal-300 flex items-center justify-center border border-teal-400/30 group-hover:scale-110 transition-transform">
                  <FileText size={16} />
                </div>
                <h4 className="text-xs font-black text-white">{t.benefit2Title}</h4>
                <p className="text-[11px] text-emerald-200/60 leading-snug">{t.benefit2Desc}</p>
              </div>

              <div className="glass-floating-card p-4 rounded-3xl animate-emerald-float-alt space-y-1.5 group">
                <div className="w-8 h-8 rounded-xl bg-amber-500/25 text-amber-300 flex items-center justify-center border border-amber-400/30 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={16} />
                </div>
                <h4 className="text-xs font-black text-white">{t.benefit3Title}</h4>
                <p className="text-[11px] text-emerald-200/60 leading-snug">{t.benefit3Desc}</p>
              </div>
            </div>

          </div>

          {/* Columna Derecha: FOTO DEL HERO CON SILUETA ORGÁNICA EXACTA A LA REFERENCIA (NÍTIDA, SIN BORDES RECTOS NI BLUR INTERNO) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Halo ambiental suave exterior (detrás del contenedor, no sobre la foto) */}
            <div className="absolute -inset-6 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Contenedor Principal con Silueta Orgánica (Arco asimétrico fiel al diseño de referencia) */}
            <div className="relative w-full aspect-[4/4.8] max-w-md mx-auto rounded-[48px] rounded-tr-[110px] rounded-br-[130px] rounded-bl-[40px] overflow-hidden group shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
              
              {/* Fotografía NÍTIDA y 100% VISIBLE (sin blur interno) */}
              <Image 
                src={heroImg} 
                alt={data.name || 'Cusco Adventure'} 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw" 
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />

              {/* Degradado suave ÚNICAMENTE en la parte inferior para fusionar con el fondo y dar contraste al texto */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#041716] via-[#041716]/60 to-transparent z-10" />

              {/* Chip Flotante Superior: Local Experts con Levitación Continua */}
              <div className="absolute top-5 left-5 z-20 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex items-center gap-2.5 animate-float-badge">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/25 text-emerald-300 flex items-center justify-center border border-emerald-400/40 shadow-xs">
                  <Award size={16} />
                </div>
                <div>
                  <span className="text-[11px] font-black text-white block leading-tight">Local Experts</span>
                  <span className="text-[9px] text-emerald-300 font-semibold block">DIRCETUR Licenciado</span>
                </div>
              </div>

              {/* Tarjeta Flotante Inferior de Tarifa con Levitación Suave */}
              <div className="absolute bottom-5 inset-x-5 z-20 p-4 rounded-3xl bg-black/50 backdrop-blur-xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center justify-between gap-3 animate-emerald-float-alt">
                <div className="min-w-0">
                  <span className="text-[10px] text-emerald-200/90 font-bold block">Tarifa Oficial por Persona:</span>
                  <span className="text-2xl font-black text-white">{data.price || '$350 USD'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenAction(data.name)}
                  className="emerald-shimmer-btn bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-[#041716] font-black text-xs px-5 py-2.5 rounded-full shadow-lg shadow-emerald-500/30 flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>Reservar</span>
                  <ArrowRight size={14} />
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* 3. POPULAR DESTINATIONS (CATÁLOGO DE TOURS EN CAROUSEL DE CARDS CON CORAZONES Y PRECIOS) */}
      <section id="destinos" className="relative z-10 py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>{t.popularTitle}</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                {toursList.length} Tours
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/70 mt-1 max-w-xl">
              {t.popularSub}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-emerald-300/60 font-semibold hidden sm:inline">Desliza para ver más</span>
            <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center cursor-pointer hover:bg-emerald-900 transition-colors">
              <ChevronLeft size={16} />
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-[#041716] flex items-center justify-center cursor-pointer hover:bg-emerald-400 transition-colors shadow-xs">
              <ChevronRight size={16} />
            </div>
          </div>
        </div>

        {/* Grid / Carrusel de Cards Flotantes con Transparencia */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {toursList.map((tour, idx) => {
            const isFav = favorites[tour.id || idx];
            return (
              <div 
                key={tour.id || idx}
                className="group rounded-3xl glass-floating-card overflow-hidden flex flex-col justify-between"
              >
                {/* Imagen del Tour con Chips y Botón Favorito */}
                <div className="relative h-56 w-full overflow-hidden bg-emerald-950">
                  <Image 
                    src={tour.image || heroImg} 
                    alt={tour.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041716] via-transparent to-black/30" />

                  {/* Badge de Rating */}
                  <div className="absolute top-3 left-3 bg-white/[0.12] backdrop-blur-md px-2.5 py-1 rounded-full text-amber-300 font-black text-xs flex items-center gap-1 border border-white/20 shadow-md">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span>{tour.rating || 4.8}</span>
                  </div>

                  {/* Botón Favorito Corazón */}
                  <button
                    type="button"
                    onClick={() => toggleFavorite(tour.id || String(idx))}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/[0.12] backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:scale-110 shadow-md transition-transform cursor-pointer"
                  >
                    <Heart size={14} className={isFav ? "fill-rose-500 text-rose-500" : "text-white"} />
                  </button>

                  {/* Precio Flotante */}
                  <div className="absolute bottom-3 right-3 bg-emerald-400 text-[#041716] font-black text-sm px-3.5 py-1 rounded-xl shadow-lg">
                    {tour.price}
                  </div>
                </div>

                {/* Contenido de la Card */}
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
                    {/* Avatares de Viajeros */}
                    <div className="flex items-center gap-1.5">
                      <div className="flex -space-x-2 overflow-hidden">
                        <div className="inline-block h-6 w-6 rounded-full ring-2 ring-[#041716] bg-emerald-800 relative overflow-hidden">
                          <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="User" fill className="object-cover" />
                        </div>
                        <div className="inline-block h-6 w-6 rounded-full ring-2 ring-[#041716] bg-teal-800 relative overflow-hidden">
                          <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="User" fill className="object-cover" />
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-200/70 font-semibold">+230 Viajeros</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenAction(tour.title)}
                      className="emerald-shimmer-btn bg-emerald-500/20 hover:bg-emerald-400 hover:text-[#041716] text-emerald-300 font-bold text-xs px-3.5 py-1.5 rounded-full border border-emerald-400/40 transition-all cursor-pointer hover:scale-105 active:scale-95"
                    >
                      {t.exploreBtn}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. PLAN YOUR JOURNEY & BENTO STATS CON ESTILO FLOTANTE */}
      <section id="experiencias" className="relative z-10 py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {t.planTitle}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/70">
            Métricas reales de excelencia avaladas por más de 1,200 viajeros internacionales.
          </p>
        </div>

        {/* Bento Grid con Fotos y Métricas Flotantes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Bento Card 1: Foto Viajero con Mapa */}
          <div className="relative rounded-3xl overflow-hidden min-h-[220px] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)] group hover:-translate-y-1.5 transition-all duration-300">
            <Image 
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop" 
              alt="Traveler with map" 
              fill 
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041716] via-[#041716]/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-black text-white block">Rutas Planificadas</span>
              <span className="text-[10px] text-emerald-300/80">Logística Integral</span>
            </div>
          </div>

          {/* Bento Card 2: 1,250+ Happy Travelers (Glassmorphism con Levitación) */}
          <div className="glass-floating-card p-6 rounded-3xl flex flex-col justify-between space-y-4 animate-emerald-float-delayed">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-white animate-number-glow">1,250+</span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/40 shadow-xs">
                <Users size={20} />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-100">{t.happyTravelers}</h4>
              <p className="text-xs text-emerald-300/60 mt-0.5">Asistidos con protocolo médico de altitud.</p>
            </div>
          </div>

          {/* Bento Card 3: 98% Positive Reviews (Glassmorphism con Levitación) */}
          <div className="glass-floating-card p-6 rounded-3xl flex flex-col justify-between space-y-4 animate-emerald-float">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-amber-300 animate-number-glow">98%</span>
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/40 shadow-xs">
                <Star size={20} className="fill-amber-400 text-amber-400" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-100">{t.positiveReviews}</h4>
              <p className="text-xs text-emerald-300/60 mt-0.5">Calificaciones 5 estrellas en TripAdvisor & Google.</p>
            </div>
          </div>

          {/* Bento Card 4: Foto Viajera Sonriente */}
          <div className="relative rounded-3xl overflow-hidden min-h-[220px] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)] group hover:-translate-y-1.5 transition-all duration-300">
            <Image 
              src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=800&auto=format&fit=crop" 
              alt="Happy traveler in nature" 
              fill 
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041716] via-[#041716]/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-black text-white block">Momentos Inolvidables</span>
              <span className="text-[10px] text-emerald-300/80">Fotografía escénica</span>
            </div>
          </div>

        </div>
      </section>

      {/* 5. WHY TRAVEL WITH US? (PROPUESTA DE VALOR EN CONTENEDOR FLOTANTE TRANSLÚCIDO) */}
      <section id="nosotros" className="relative z-10 py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-[40px] bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent backdrop-blur-2xl border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.6)] space-y-8">
          <div>
            <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider block mb-1">
              Garantía de Confianza
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.whyTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-emerald-400/40 hover:-translate-y-1 transition-all space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Compass size={18} />
              </div>
              <h4 className="text-sm font-bold text-white">{t.why1}</h4>
              <p className="text-xs text-emerald-200/60 leading-relaxed">{t.why1Desc}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-teal-400/40 hover:-translate-y-1 transition-all space-y-2">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <FileText size={18} />
              </div>
              <h4 className="text-sm font-bold text-white">{t.why2}</h4>
              <p className="text-xs text-emerald-200/60 leading-relaxed">{t.why2Desc}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-emerald-400/40 hover:-translate-y-1 transition-all space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Award size={18} />
              </div>
              <h4 className="text-sm font-bold text-white">{t.why3}</h4>
              <p className="text-xs text-emerald-200/60 leading-relaxed">{t.why3Desc}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-amber-400/40 hover:-translate-y-1 transition-all space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>
              <h4 className="text-sm font-bold text-white">{t.why4}</h4>
              <p className="text-xs text-emerald-200/60 leading-relaxed">{t.why4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ITINERARIO PASO A PASO TRANSLÚCIDO */}
      {data.itinerary && data.itinerary.length > 0 && (
        <section id="itinerario" className="relative z-10 py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block">Cronograma de la Expedición</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{t.itineraryTitle}</h2>
          </div>

          <div className="space-y-4">
            {data.itinerary.map((step, sIdx) => (
              <div 
                key={sIdx}
                className="p-5 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-emerald-400/40 hover:-translate-y-1 transition-all flex flex-col sm:flex-row sm:items-start gap-4 shadow-lg"
              >
                <div className="px-3.5 py-1.5 rounded-xl bg-emerald-400 text-[#041716] font-black text-xs shrink-0 self-start shadow-sm">
                  {step.step || `Paso #${sIdx + 1}`}
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="text-sm font-black text-white">{step.title}</h4>
                  <p className="text-xs text-emerald-200/70 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. PREGUNTAS FRECUENTES (FAQS) TRANSLÚCIDAS */}
      {data.faqs && data.faqs.length > 0 && tier !== 'free' && tier !== 'basic' && (
        <section className="relative z-10 py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-8 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{t.faqsTitle}</h2>
            <p className="text-xs text-emerald-200/70">Todo lo que necesitas saber antes de iniciar tu recorrido.</p>
          </div>

          <div className="space-y-3">
            {data.faqs.map((faq, fIdx) => (
              <div key={fIdx} className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-emerald-400/40 space-y-1.5 transition-all shadow-md">
                <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                  <span className="text-emerald-400 font-black">Q:</span> {faq.q}
                </h4>
                <p className="text-xs text-emerald-100/70 leading-relaxed pl-5">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. BARRA DE MÉTRICAS INFERIOR / STICKY BOTTOM BAR FLOTANTE */}
      <div className="relative z-20 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-4 sm:p-5 rounded-3xl bg-white/[0.05] backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center justify-around gap-6 text-center sm:text-left flex-1">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-black text-white block">50+ Rutas</span>
                <span className="text-[10px] text-emerald-300/60">Destinos de Autor</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users size={18} className="text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-black text-white block">100K+ Turistas</span>
                <span className="text-[10px] text-emerald-300/60">Experiencias Felices</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Star size={18} className="text-amber-400 shrink-0 fill-amber-400" />
              <div>
                <span className="text-xs font-black text-white block">4.9★ Promedio</span>
                <span className="text-[10px] text-emerald-300/60">TripAdvisor & Google</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={18} className="text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-black text-white block">24/7 Soporte</span>
                <span className="text-[10px] text-emerald-300/60">Oxígeno y Asistencia</span>
              </div>
            </div>
          </div>

          {/* Botón Coral / Naranja Llamativo (Matching imagen con Shimmer y Levitación) */}
          <button
            type="button"
            onClick={() => handleOpenAction(data.name)}
            className="emerald-shimmer-btn w-full md:w-auto bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-[0_10px_25px_rgba(249,115,22,0.4)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 shrink-0"
          >
            <Compass size={16} />
            <span>{t.planYourTripBtn}</span>
          </button>
        </div>
      </div>

      {/* 9. FOOTER LEGAL & LIBRO DE RECLAMACIONES (INDECOPI LEY 29571) */}
      <footer className="relative z-10 border-t border-emerald-900/60 bg-[#020d0d] py-10 px-4 sm:px-6 lg:px-8 text-xs text-emerald-200/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Compass size={16} />
            </div>
            <div>
              <span className="font-bold text-white text-sm">NavikX Cusco</span>
              <p className="text-[11px] text-emerald-300/60">{t.footerRights}</p>
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

      {/* MODALES REUTILIZABLES */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        landing={data as LandingData}
        lang={currentLang}
      />

      <ComplaintsBookModal
        isOpen={isComplaintsOpen}
        onClose={() => setIsComplaintsOpen(false)}
        agencyName={data.name || 'NavikX Cusco Expeditions'}
        agencyRuc="20601234567"
        agencyAddress={data.officeAddress || 'Portal de Panes N° 123, Plaza de Armas, Cusco'}
      />

      <LegalTermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        agencyName={data.name || 'NavikX Cusco Expeditions'}
      />

    </div>
  );
}
