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
  Heart,
  Award,
  Globe2,
  ArrowRight,
  Zap,
  Calendar
} from 'lucide-react';
import { LandingData, PlanTier, ObjectiveType, LanguageType } from '@/types/landing';
import TourSupportAndFaqs from '@/components/common/TourSupportAndFaqs';
import QuoteModal from '@/components/common/QuoteModal';

interface AgencyPortalTemplateProps {
  data?: Partial<LandingData>;
  isLive?: boolean;
  viewMode?: 'desktop' | 'tablet' | 'mobile';
}

export default function AgencyPortalTemplate({ data, isLive = false, viewMode = 'desktop' }: AgencyPortalTemplateProps) {
  const isMobile = viewMode === 'mobile';
  
  // 1. Estados reactivos de interacción
  const [lang, setLang] = useState<LanguageType>(data?.language || 'es');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showWaTooltip, setShowWaTooltip] = useState<boolean>(true);
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [selectedTourForQuote, setSelectedTourForQuote] = useState<string>('');

  // 2. Parámetros y datos dinámicos extraídos de LandingData
  const brandName = data?.name || 'Cusco Tours';
  const whatsappNumber = (data?.whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const guideName = data?.guideName || 'Marco Mendoza';
  const destination = data?.destination || 'Cusco, Perú';
  const objective: ObjectiveType = data?.objective || 'whatsapp';
  const planTier: PlanTier = data?.tier || 'pro';

  // 3. Diccionario Multi-Idioma reactivo (ES / EN)
  const isEn = lang === 'en';
  const t = {
    officialBar: isEn ? 'DIRCETUR Cusco • Safe Travels Verified' : 'DIRCETUR Cusco • Safe Travels',
    seasonBadge: isEn ? '2026 Season • Guaranteed Daily Departures' : 'Temporada 2026 • Salidas Diarias Garantizadas',
    ratingLabel: isEn ? '4.9 / 5.0 Rating' : '4.9 / 5.0 Valoración',
    reviewsCount: isEn ? '+500 Verified Reviews' : '+500 Opiniones Verificadas',
    officialBadge: isEn ? 'MINCETUR & DIRCETUR' : 'MINCETUR & DIRCETUR',
    officialDesc: isEn ? 'Official Licensed Operator' : 'Operador Turístico Oficial',
    navTours: isEn ? 'Featured Tours' : 'Tours Destacados',
    navPackages: isEn ? 'Packages' : 'Paquetes',
    navWhyUs: isEn ? 'Why Choose Us?' : '¿Por Qué Nosotros?',
    navReviews: isEn ? 'Reviews' : 'Reseñas',
    navFaq: isEn ? 'FAQ & Support' : 'FAQ & Soporte',
    ctaHeader: isEn ? 'Quote via WhatsApp' : 'Cotizar por WhatsApp',
    ctaHeroQuote: isEn ? 'Request Free Quote' : 'Solicitar Cotización',
    ctaHeroWa: isEn ? 'Book on WhatsApp' : 'Reservar Ahora',
    ctaViewMore: isEn ? 'Explore All Tours' : 'Ver Más Tours',
    statTravelers: isEn ? 'Happy Travelers' : 'Viajeros Felices',
    statExperience: isEn ? 'Years Experience' : 'De Experiencia',
    statRoutes: isEn ? 'Routes & Destinations' : 'Rutas & Destinos',
    statRating: isEn ? 'Excellent Score' : 'Puntuación Excelente',
    catalogBadge: isEn ? 'Exclusive 2026 Catalog' : 'Catálogo Exclusivo 2026',
    catalogTitle: isEn ? 'Featured Tours in Cusco & Peru' : 'Tours Destacados en Cusco y Perú',
    catalogDesc: isEn ? 'Daily departures with certified tour guides, medical emergency kits and private transport.' : 'Salidas diarias garantizadas con guías colegiados, traslados oficiales y asistencia médica de emergencia.',
    filterAll: isEn ? 'All Destinations' : 'Todos los Destinos',
    filterTrek: isEn ? 'Mountains & Trekking' : 'Montañas & Trekking',
    filterMachu: isEn ? 'Machu Picchu Magic' : 'Machu Picchu Mágico',
    filterCulture: isEn ? 'Sacred Valley & History' : 'Valle Sagrado & Historia',
    filterAdrenaline: isEn ? 'Coast & Adrenaline' : 'Costa & Adrenalina',
    pricePerPerson: isEn ? 'Price per person' : 'Precio por persona',
    bookTour: isEn ? 'Book Tour' : 'Reservar Tour',
    quoteTour: isEn ? 'Request Quote' : 'Cotizar Tour',
    whyTitle: isEn ? `Why travel with ${brandName}?` : `¿Por qué viajar con ${brandName}?`,
    whySubtitle: isEn ? 'Official local agency with over a decade curating unforgettable memories across the Peruvian Andes.' : 'Somos una agencia local acreditada con más de 10 años organizando viajes inolvidables en Cusco y todo el Perú.',
    packagesTitle: isEn ? 'Curated Travel Packages' : 'Nuestros Tours & Paquetes',
    packagesDesc: isEn ? 'Multi-day packages including hotels, railway tickets, transfers and local guided tours.' : 'Circuitos completos con alojamiento, traslados y guiado incluidos.',
    reviewsTitle: isEn ? 'What our travelers say' : 'Lo que dicen nuestros viajeros',
    reviewsDesc: isEn ? 'Verified testimonials from adventurers around the globe who trusted our team in Cusco.' : 'Opiniones recopiladas de turistas de todo el mundo que confiaron sus vacaciones en Cusco con nuestro equipo oficial.',
    ctaBannerTitle: isEn ? 'READY FOR YOUR NEXT GREAT ADVENTURE?' : '¿LISTO PARA TU PRÓXIMA GRAN AVENTURA?',
    ctaBannerDesc: isEn ? 'Contact our team today to lock in your Machu Picchu tickets and personalized Andean itinerary.' : 'Contáctanos hoy mismo para asegurar tus accesos a Machu Picchu y disfrutar del mejor viaje de tu vida en el Perú.',
    contactNow: isEn ? 'Contact Us Now' : 'Contactar Ahora',
    footerRights: isEn ? `© 2026 ${brandName}. Authorized Tourism Operator.` : `© 2026 ${brandName}. Operador Turístico Autorizado.`,
    freeBanner: isEn ? '⚡ Created with Cusco Creativos Web — Fast Tourism Landing Builder' : '⚡ Creado con Cusco Creativos Web — Generador Rápido de Landings Turísticas'
  };

  // 4. Jerarquía de contenidos adaptada al nivel del plan
  const isFree = planTier === 'free';
  const isBasic = planTier === 'basic';
  const isPro = planTier === 'pro';
  const isAdvance = planTier === 'advance';

  // 5. Datos dinámicos para Hero con Fallbacks inteligentes
  const heroTitle = data?.hero?.title || (isEn ? 'DISCOVER THE MAGIC OF CUSCO' : 'VINICUNCA & MACHU PICCHU');
  const heroSubtitle = data?.hero?.subtitle || (isEn 
    ? 'Rainbow Mountain, Sacred Valley & World Wonders • Live the authentic Andean journey with accredited experts.' 
    : 'Montaña de 7 Colores & Valle Rojo • Vive la magia de los Andes con operadores colegiados y salidas diarias.');
  const heroBadge = data?.hero?.badge || t.seasonBadge;
  const heroImage = data?.heroImage || 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop';
  const heroCtaLabel = data?.hero?.cta || (objective === 'quote' ? t.ctaHeroQuote : t.ctaHeroWa);

  // 6. Lista de Tours Destacados (Con soporte dinámico si viene en LandingData)
  const DEFAULT_FEATURED_TOURS = [
    {
      id: '1',
      title: isEn ? 'Rainbow Mountain Vinicunca Classic' : 'Vinicunca Montaña 7 Colores Clásico',
      category: isEn ? 'Adventure & Trekking' : 'Aventura & Trekking',
      categoryKey: 'trekking',
      location: 'Cusco, Perú',
      duration: 'Full Day (04:30 - 17:30)',
      price: '$45 USD',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop',
      tag: isEn ? 'Most Popular' : 'Más Popular',
      badge: '4.9 ★'
    },
    {
      id: '2',
      title: isEn ? 'Humantay Turquoise Lake & Glacier' : 'Laguna Humantay Turquesa & Glaciar',
      category: isEn ? 'Nature & Photography' : 'Naturaleza & Fotografía',
      categoryKey: 'trekking',
      location: 'Anta - Mollepata',
      duration: 'Full Day (05:00 - 18:00)',
      price: '$40 USD',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop',
      tag: isEn ? 'Glacier Trek' : 'Glaciar',
      badge: '4.8 ★'
    },
    {
      id: '3',
      title: isEn ? 'Machu Picchu Panoramic Train & Guided Tour' : 'Machu Picchu Mágico en Tren Panorámico',
      category: isEn ? 'Wonder of the World' : 'Historia & Maravilla',
      categoryKey: 'machu',
      location: 'Aguas Calientes',
      duration: isEn ? '1 Full Day' : '1 Día Completo',
      price: '$280 USD',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      tag: isEn ? 'Top Wonder' : 'Maravilla del Mundo',
      badge: '5.0 ★'
    },
    {
      id: '4',
      title: isEn ? 'Sacred Valley VIP Experience' : 'Valle Sagrado de los Incas VIP',
      category: isEn ? 'Culture & Archaeology' : 'Cultura & Arqueología',
      categoryKey: 'cultura',
      location: 'Pisac - Ollantaytambo',
      duration: 'Full Day',
      price: '$55 USD',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
      tag: isEn ? 'Archaeology' : 'Arqueológico',
      badge: '4.9 ★'
    },
    {
      id: '5',
      title: isEn ? 'Machu Picchu 2 Days & Aguas Calientes Hotel' : 'Machu Picchu 2 Días con Noche en Aguas Calientes',
      category: isEn ? 'Complete Journey' : 'Experiencia Completa',
      categoryKey: 'machu',
      location: 'Machu Picchu Pueblo',
      duration: isEn ? '2 Days / 1 Night' : '2 Días / 1 Noche',
      price: '$340 USD',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2029&auto=format&fit=crop',
      tag: isEn ? 'Recommended' : 'Recomendado',
      badge: '5.0 ★'
    },
    {
      id: '6',
      title: isEn ? 'Huacachina Oasis & Ballestas Islands' : 'Huacachina Oasis & Islas Ballestas',
      category: isEn ? 'Desert & Wildlife' : 'Costa & Desierto',
      categoryKey: 'adrenalina',
      location: 'Ica - Paracas',
      duration: 'Full Day',
      price: '$95 USD',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop',
      tag: isEn ? 'Adrenaline' : 'Adrenalina',
      badge: '4.8 ★'
    }
  ];

  // Aplicar límite según el nivel de plan:
  // Plan Gratuito: 1 tour
  // Plan Básico: 3 tours
  // Plan Pro / Avanzado: 6 tours
  const tourLimit = isFree ? 1 : isBasic ? 3 : 6;
  const displayTours = DEFAULT_FEATURED_TOURS.slice(0, tourLimit);

  // 7. Paquetes turísticos (visibles en Pro y Avanzado)
  const PACK_TOURS = [
    {
      id: 'p1',
      title: isEn ? 'Cusco Magic 4 Days / 3 Nights' : 'Cusco Mágico 4 Días / 3 Noches',
      category: isEn ? 'Classic Package' : 'Paquete Clásico',
      duration: '4 Días / 3 Noches',
      price: '$420 USD',
      image: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=2074&auto=format&fit=crop',
      badge: '4.9 ★'
    },
    {
      id: 'p2',
      title: isEn ? 'Total Cusco Adventure 5 Days' : 'Cusco Aventura Total 5 Días',
      category: isEn ? 'Altitude Trekking' : 'Aventura & Altura',
      duration: '5 Días / 4 Noches',
      price: '$490 USD',
      image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?q=80&w=2070&auto=format&fit=crop',
      badge: '5.0 ★'
    },
    {
      id: 'p3',
      title: isEn ? 'Dream Peru: Lima, Ica & Cusco' : 'Perú Soñado: Lima, Ica & Cusco',
      category: isEn ? 'National Circuit' : 'Circuito Nacional',
      duration: '7 Días / 6 Noches',
      price: '$780 USD',
      image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop',
      badge: '4.9 ★'
    }
  ];

  // 8. Manejo de clics en acciones según el objetivo
  const handleActionClick = (tourName?: string) => {
    if (objective === 'quote') {
      setSelectedTourForQuote(tourName || brandName);
      setIsQuoteOpen(true);
    } else {
      const msg = tourName 
        ? `Hola ${brandName}, deseo reservar el tour "${tourName}".` 
        : `Hola ${brandName}, deseo información sobre sus tours en Cusco.`;
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    }
  };

  // 9. Objeto sintético para QuoteModal
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
    status: 'published',
    date: '2026-09-15',
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

  return (
    <div className={`min-h-screen bg-[#FDFDFD] text-stone-900 font-sans selection:bg-[#FF5500] selection:text-white ${isMobile ? 'text-sm' : ''}`}>
      
      {/* 1. TOP ANNOUNCEMENT BAR CON SELECTOR MULTI-IDIOMA REAL */}
      <div className="bg-[#1C1917] text-white text-[11px] sm:text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-stone-300">
              <Phone size={13} className="text-[#FF5500]" /> +{whatsappNumber}
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-stone-300">
              <Mail size={13} className="text-[#FF5500]" /> reservas@{brandName.toLowerCase().replace(/\s+/g, '')}.pe
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="bg-[#FF5500]/20 text-[#FF8844] font-bold px-2 py-0.5 rounded text-[10px] border border-[#FF5500]/40">
              {t.officialBar}
            </span>

            {/* Selector interactivo de Idioma (ES / EN) */}
            <div className="flex items-center bg-stone-800 rounded-lg p-0.5 border border-stone-700">
              <button
                onClick={() => setLang('es')}
                className={`px-2 py-0.5 rounded text-[10px] font-extrabold transition-all cursor-pointer ${
                  lang === 'es' ? 'bg-[#FF5500] text-white' : 'text-stone-400 hover:text-white'
                }`}
                title="Cambiar a Español"
              >
                ES
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded text-[10px] font-extrabold transition-all cursor-pointer ${
                  lang === 'en' ? 'bg-[#FF5500] text-white' : 'text-stone-400 hover:text-white'
                }`}
                title="Switch to English"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF5500] to-[#FF8800] flex items-center justify-center text-white font-black shadow-md shadow-[#FF5500]/30">
              <Compass size={22} />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-stone-900 block leading-tight">
                {brandName.toUpperCase()}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block -mt-1">
                {isEn ? 'Official Tourism Operator' : 'Agencia Oficial & Experiencias'}
              </span>
            </div>
          </div>

          {!isFree && (
            <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-stone-700 uppercase tracking-wider">
              <a href="#tours" className="hover:text-[#FF5500] transition-colors">{t.navTours}</a>
              {!isBasic && <a href="#paquetes" className="hover:text-[#FF5500] transition-colors">{t.navPackages}</a>}
              <a href="#por-que-nosotros" className="hover:text-[#FF5500] transition-colors">{t.navWhyUs}</a>
              {!isBasic && <a href="#resenas" className="hover:text-[#FF5500] transition-colors">{t.navReviews}</a>}
              <a href="#soporte-faq" className="hover:text-[#FF5500] transition-colors">{t.navFaq}</a>
            </nav>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleActionClick()}
              className="shimmer-btn bg-gradient-to-r from-[#FF5500] via-[#FF6611] to-[#FF3500] hover:from-[#E04B00] hover:to-[#FF5500] text-white text-xs font-extrabold px-5 py-2.5 rounded-full shadow-[0_4px_16px_rgba(255,85,0,0.35)] hover:shadow-[0_6px_24px_rgba(255,85,0,0.55)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer group"
            >
              <MessageCircle size={15} className="group-hover:rotate-12 transition-transform duration-300" />
              <span>{objective === 'quote' ? t.ctaHeroQuote : t.ctaHeader}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION DINÁMICA CON DATOS DE IA / LANDINGDATA */}
      <section className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={heroTitle}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105 animate-pulse-glow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/35" />
        </div>

        {/* Glass Cards Flotantes Ambientales */}
        {!isFree && (
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

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white py-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-widest border border-white/30 shadow-lg animate-float-slow">
            <Sparkles size={14} className="text-[#FF8844]" />
            <span>{heroBadge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight drop-shadow-2xl leading-tight uppercase">
            {heroTitle}
          </h1>
          <p className="text-base sm:text-xl lg:text-2xl font-light text-stone-100 max-w-2xl mx-auto drop-shadow-md">
            {heroSubtitle}
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleActionClick()}
              className="shimmer-btn bg-gradient-to-r from-[#FF5500] via-[#FF6611] to-[#FF3000] hover:from-[#E04500] hover:to-[#FF5500] text-white px-8 py-4 rounded-full font-black text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-[0_8px_30px_rgba(255,85,0,0.5)] hover:shadow-[0_14px_40px_rgba(255,85,0,0.7)] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5 group ring-2 ring-white/25"
            >
              <span>{heroCtaLabel}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-200" />
            </button>

            {!isFree && (
              <a
                href="#tours"
                className="bg-white/15 hover:bg-white/30 backdrop-blur-xl text-white px-8 py-4 rounded-full font-black text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-xl border border-white/35 hover:border-white hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 group"
              >
                <span>{t.ctaViewMore}</span>
                <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform duration-200" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 4. BARRA DE MÉTRICAS */}
      <section className="bg-white border-b border-stone-200 py-6 sm:py-8 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-x-0 md:divide-x divide-stone-100 text-center">
            <div className="p-3 rounded-2xl hover:bg-stone-50/80 hover:-translate-y-1 transition-all duration-300 space-y-1">
              <span className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight block">+10,000</span>
              <span className="text-xs sm:text-sm font-bold text-stone-700 block">{t.statTravelers}</span>
              <span className="text-[11px] text-stone-400 block">{guideName}</span>
            </div>

            <div className="p-3 rounded-2xl hover:bg-stone-50/80 hover:-translate-y-1 transition-all duration-300 space-y-1">
              <span className="text-2xl sm:text-4xl font-black text-[#FF5500] tracking-tight block">10+</span>
              <span className="text-xs sm:text-sm font-bold text-stone-700 block">{t.statExperience}</span>
              <span className="text-[11px] text-stone-400 block">{destination}</span>
            </div>

            <div className="p-3 rounded-2xl hover:bg-stone-50/80 hover:-translate-y-1 transition-all duration-300 space-y-1">
              <span className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight block">50+</span>
              <span className="text-xs sm:text-sm font-bold text-stone-700 block">{t.statRoutes}</span>
              <span className="text-[11px] text-stone-400 block">{isEn ? 'Across Peru' : 'En todo el Perú'}</span>
            </div>

            <div className="p-3 rounded-2xl hover:bg-stone-50/80 hover:-translate-y-1 transition-all duration-300 space-y-1">
              <span className="text-2xl sm:text-4xl font-black text-[#FF5500] tracking-tight block">4.9 / 5</span>
              <span className="text-xs sm:text-sm font-bold text-stone-700 block">{t.statRating}</span>
              <span className="text-[11px] text-stone-400 block">TripAdvisor & Google</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TOURS DESTACADOS (ADAPTADO POR PLAN TIER) */}
      <section id="tours" className="py-14 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5500]/10 text-[#FF5500] text-xs font-black uppercase tracking-widest">
            <Sparkles size={13} />
            <span>{t.catalogBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
            {t.catalogTitle}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            {t.catalogDesc}
          </p>
        </div>

        {/* Filtro interactivo de categorías (Activo en Pro y Avanzado) */}
        {!isFree && !isBasic && (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
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
                  className={`px-4 py-2 rounded-full text-xs font-extrabold flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#FF5500] text-white shadow-lg shadow-[#FF5500]/30 scale-105 ring-2 ring-[#FF5500]/40'
                      : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:bg-stone-100/70 hover:scale-102'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-white' : 'text-stone-400'} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Grilla de Tours */}
        <div className={`grid gap-6 sm:gap-8 ${isFree ? 'max-w-md mx-auto grid-cols-1' : isBasic ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {displayTours
            .filter(t => isFree || isBasic || activeCategory === 'all' || t.categoryKey === activeCategory)
            .map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-[0_20px_45px_rgba(0,0,0,0.09)] hover:border-[#FF5500]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2"
              >
                <div>
                  <div className="relative h-56 w-full bg-stone-100 overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-stone-900 flex items-center gap-1.5 shadow-md">
                      <Star size={12} className="text-amber-500 fill-amber-500" />
                      <span>{tour.badge}</span>
                    </div>

                    {tour.tag && (
                      <div className="absolute top-3.5 right-3.5 bg-[#FF5500] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                        {tour.tag}
                      </div>
                    )}

                    <div className="absolute bottom-3.5 left-3.5 text-white">
                      <span className="text-[11px] font-bold text-stone-200 block uppercase tracking-wider">
                        {tour.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3.5">
                    <h3 className="font-extrabold text-base sm:text-lg text-stone-900 leading-snug group-hover:text-[#FF5500] transition-colors">
                      {tour.title}
                    </h3>

                    <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} className="text-stone-400" /> {tour.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-[#FF5500]" /> {tour.location}
                      </span>
                    </div>

                    <div className="pt-3 flex items-baseline justify-between border-t border-stone-100">
                      <span className="text-xs text-stone-400">{t.pricePerPerson}</span>
                      <span className="text-xl font-black text-[#FF5500]">{tour.price}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleActionClick(tour.title)}
                    className="shimmer-btn w-full bg-gradient-to-r from-[#FF5500] to-[#FF3500] hover:from-[#E04500] hover:to-[#FF5500] text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-[#FF5500]/20 hover:shadow-[0_8px_25px_rgba(255,85,0,0.4)] group/btn active:scale-95 cursor-pointer"
                  >
                    <span>{objective === 'quote' ? t.quoteTour : t.bookTour}</span>
                    <ArrowRight size={15} className="group-hover/btn:translate-x-1.5 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* 6. EXCLUSIVO PLAN AVANZADO: ITINERARIO DÍA A DÍA DETALLADO */}
      {isAdvance && (
        <section className="py-14 sm:py-20 bg-stone-900 text-white border-y border-stone-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="text-center space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-widest border border-amber-500/30">
                <Calendar size={13} /> {isEn ? 'Exclusive VIP Itinerary' : 'Itinerario Detallado VIP'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                {isEn ? 'Day-by-Day Experience Flow' : 'Cronograma y Experiencia Paso a Paso'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-400">
                {isEn ? 'Carefully designed timings to maximize comfort, photo opportunities, and acclimatization.' : 'Tiempos planificados al milímetro para evitar aglomeraciones y favorecer la aclimatación.'}
              </p>
            </div>

            <div className="space-y-4">
              {[
                { step: '04:30 AM', title: isEn ? 'Hotel Pickup & Private Scenic Transfer' : 'Recojo en Hotel & Traslado Panorámico', desc: isEn ? 'Private vehicle pick-up in Cusco historic center with warm coca tea provided.' : 'Recojo puntual en tu alojamiento con asistencia médica preventiva y refrigerio ligero.' },
                { step: '07:30 AM', title: isEn ? 'Andean Buffet Breakfast in Cusipata' : 'Desayuno Buffet Andino Energético', desc: isEn ? 'Traditional Andean breakfast with fresh fruit, eggs, artisan breads, and herbal infusions.' : 'Desayuno preparado por cocineros locales para cargar energías antes del ascenso.' },
                { step: '09:30 AM', title: isEn ? 'Guided Ascent to Vinicunca Summit (5,036 m)' : 'Ascenso Guiado a la Cumbre de Vinicunca (5,036 m)', desc: isEn ? 'Accompanied at all times by official guide equipped with oxygen tank and first aid.' : 'Caminata con ritmo dosificado, paradas fotográficas y asistencia permanente de oxígeno.' },
                { step: '01:30 PM', title: isEn ? 'Panoramic Lunch & Safe Return to Cusco' : 'Almuerzo Campestre & Retorno a Cusco', desc: isEn ? 'Celebratory buffet lunch followed by scenic drive returning to your hotel around 5:00 PM.' : 'Almuerzo buffet campestre en valle andino y retorno cómodo a la ciudad de Cusco.' }
              ].map((it, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-stone-800/80 border border-stone-700 items-start hover:border-[#FF5500]/60 transition-colors">
                  <div className="shrink-0 bg-[#FF5500] text-white px-3 py-1.5 rounded-xl font-mono text-xs font-black">
                    {it.step}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-white">{it.title}</h4>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">{it.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. ¿POR QUÉ ELEGIRNOS? */}
      <section id="por-que-nosotros" className="py-16 sm:py-24 bg-[#F9F7F4] border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            
            {/* Foto con Badge */}
            <div className="relative">
              <div className="relative h-80 sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                <Image
                  src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop"
                  alt="Guías Oficiales en Machu Picchu"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/20 text-[11px] font-bold text-white shadow-lg">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span>{isEn ? 'Guides Active Today in Cusco' : 'Guías Activos Hoy en Cusco'}</span>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-3 sm:right-6 bg-white p-4 sm:p-5 rounded-2xl shadow-2xl border border-stone-200 flex items-center gap-3.5 animate-float-slow hover:scale-105 transition-transform">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#FF5500]/15 to-[#FF8800]/20 flex items-center justify-center text-[#FF5500] font-black text-lg shadow-inner">
                  100%
                </div>
                <div>
                  <p className="font-extrabold text-xs sm:text-sm text-stone-900">{isEn ? 'Satisfaction Guaranteed' : 'Satisfacción Garantizada'}</p>
                  <p className="text-[11px] text-stone-400">{guideName} • DIRCETUR</p>
                </div>
              </div>
            </div>

            {/* Pilares */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#FF5500]">
                  <ShieldCheck size={16} />
                  <span>{isEn ? 'Trust, Safety & Formal Accreditation' : 'Confianza, Experiencia & Seguridad'}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
                  {t.whyTitle}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {t.whySubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {(data?.features?.items || [
                  isEn ? 'Official Certified Guides' : 'Guías Oficiales Acreditados',
                  isEn ? 'Emergency Oxygen & First Aid' : 'Balón de Oxígeno & Botiquín',
                  isEn ? 'Daily Guaranteed Departures' : 'Salidas Diarias Garantizadas',
                  isEn ? '24/7 Dedicated WhatsApp Support' : 'Atención 24/7 por WhatsApp'
                ]).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-stone-800 bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs hover:border-[#FF5500]/40 hover:-translate-y-0.5 transition-all duration-200">
                    <CheckCircle2 size={17} className="text-[#FF5500] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#FFF6F0] p-6 rounded-2xl border border-[#FFD9C2] space-y-2.5 shadow-xs hover:border-[#FF5500]/50 transition-colors">
                <h4 className="font-extrabold text-sm text-stone-900 flex items-center gap-2">
                  <Award size={18} className="text-[#FF5500]" />
                  <span>{isEn ? 'High Altitude Safety Protocols' : 'Compromiso de Altura y Asistencia Médica'}</span>
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {isEn 
                    ? 'All our tours include certified pulse oximeter monitoring and medical oxygen in all transport vehicles.' 
                    : 'Sabemos lo desafiante que puede ser la altitud andina. Por ello, todos nuestros vehículos y guías cuentan permanentemente con balón de oxígeno medicinal.'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. PAQUETES TURÍSTICOS (HABILITADO PARA PLANES PRO Y AVANZADO) */}
      {!isFree && !isBasic && (
        <section id="paquetes" className="py-14 sm:py-20 bg-stone-50 border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#FF5500]">
                {t.navPackages}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
                {t.packagesTitle}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                {t.packagesDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {PACK_TOURS.map((tour) => (
                <div
                  key={tour.id}
                  className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:border-[#FF5500]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2"
                >
                  <div>
                    <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-3 right-3 bg-[#FF5500] text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase shadow-md">
                        {tour.badge}
                      </div>
                    </div>

                    <div className="p-6 space-y-2.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#FF5500]">
                        {tour.category}
                      </span>
                      <h3 className="font-extrabold text-base text-stone-900 leading-snug group-hover:text-[#FF5500] transition-colors">
                        {tour.title}
                      </h3>
                      <p className="text-xs text-stone-500 flex items-center gap-1.5">
                        <Clock size={13} className="text-stone-400" /> {tour.duration}
                      </p>
                      <div className="pt-2 flex items-baseline justify-between border-t border-stone-100">
                        <span className="text-xs text-stone-400">{isEn ? 'From' : 'Desde'}</span>
                        <span className="text-lg font-black text-stone-900">{tour.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => handleActionClick(tour.title)}
                      className="shimmer-btn w-full bg-stone-900 hover:bg-gradient-to-r hover:from-[#FF5500] hover:to-[#FF3000] text-white py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow-[0_6px_22px_rgba(255,85,0,0.35)] group/btn active:scale-95 cursor-pointer"
                    >
                      <span>{objective === 'quote' ? t.quoteTour : (isEn ? 'View Details' : 'Ver Itinerario')}</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. TESTIMONIOS VERIFICADOS (PRO & AVANZADO) */}
      {!isFree && !isBasic && (
        <section id="resenas" className="py-16 sm:py-20 bg-[#141211] text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#FF8844] text-xs font-black uppercase tracking-widest border border-white/10">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span>{isEn ? 'Verified Traveler Stories' : 'Experiencias Reales Verificadas'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {t.reviewsTitle}
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
                {t.reviewsDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(data?.testimonials && data.testimonials.length > 0 ? data.testimonials : [
                {
                  name: 'Alejandro y Marcela',
                  origin: 'Madrid, España',
                  comment: isEn ? 'The best trip of our lives. Carlos our guide explained Andean history with immense passion.' : 'La mejor experiencia de nuestra vida en Perú. Carlos, nuestro guía, nos explicó la historia con una pasión inolvidable.',
                  rating: 5
                },
                {
                  name: 'David Miller',
                  origin: 'California, USA',
                  comment: 'Zero stress, scenic train was stunning. Worth every single dollar. 100% recommended!',
                  rating: 5
                },
                {
                  name: 'Camila & Laurent',
                  origin: 'Lyon, Francia',
                  comment: isEn ? 'Flawless organization from airport pickup to summit. Oxygen assistance was always ready.' : 'Organización impecable de principio a fin. El equipo siempre atento con el oxígeno y los boletos puntuales.',
                  rating: 5
                }
              ]).slice(0, 3).map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-b from-[#1F1C1A] to-[#151311] p-6 sm:p-7 rounded-3xl border border-stone-800 space-y-4 flex flex-col justify-between hover:border-[#FF5500]/70 transition-all duration-300 shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} size={15} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-stone-300 uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        {isEn ? 'Verified' : 'Verificado'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                      &quot;{rev.comment}&quot;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
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

      {/* 10. FORO DE SOPORTE & FAQ CON ANTI-SPAM (PRO & AVANZADO) */}
      {!isFree && (
        <TourSupportAndFaqs
          faqs={data?.faqs}
          tourName={data?.name || brandName}
          whatsapp={whatsappNumber}
          guideName={guideName}
          destination={destination}
          tier={planTier}
          theme="agency-portal"
          isMobile={isMobile}
        />
      )}

      {/* 11. GIANT ORANGE CTA BANNER */}
      <section className="relative bg-gradient-to-br from-[#FF4400] via-[#FF5500] to-[#E03B00] text-white py-14 sm:py-20 px-4 sm:px-6 text-center shadow-2xl overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-black uppercase tracking-widest bg-black/25 px-4 py-1.5 rounded-full inline-block backdrop-blur-md border border-white/20">
            {t.officialBar}
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-md">
            {t.ctaBannerTitle}
          </h2>
          <p className="text-xs sm:text-base text-orange-100 max-w-2xl mx-auto font-normal">
            {t.ctaBannerDesc}
          </p>
          <div className="pt-2">
            <button
              onClick={() => handleActionClick()}
              className="shimmer-btn inline-flex items-center gap-3 bg-white text-[#FF5500] hover:bg-stone-50 px-9 py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_12px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group ring-4 ring-white/25"
            >
              <span>{objective === 'quote' ? t.ctaHeroQuote : t.contactNow}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </section>

      {/* 12. BANNER DE PLAN GRATUITO (SI APLICA) */}
      {isFree && (
        <div className="bg-stone-900 text-stone-300 py-3 px-4 text-center text-xs border-t border-stone-800">
          <p>{t.freeBanner}</p>
        </div>
      )}

      {/* 13. SELLOS DE ACREDITACIÓN OFICIAL */}
      {!isFree && (
        <section className="bg-white py-8 border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <p className="text-[11px] font-black uppercase tracking-widest text-stone-400">
              {isEn ? 'Official Certifications & Safety Seals' : 'Acreditaciones Oficiales & Sellos de Calidad'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="flex items-center gap-2 text-stone-700 font-extrabold text-xs">
                <ShieldCheck size={20} className="text-[#FF5500]" />
                <span>MINCETUR PERÚ</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700 font-extrabold text-xs">
                <Award size={20} className="text-[#FF5500]" />
                <span>DIRCETUR CUSCO</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700 font-extrabold text-xs">
                <CheckCircle2 size={20} className="text-emerald-600" />
                <span>SAFE TRAVELS WORLD</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 14. FOOTER */}
      <footer className="bg-[#1C1917] text-stone-400 py-12 px-4 sm:px-6 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px]">
          <p>{t.footerRights}</p>
          <p className="text-stone-400 font-medium">Plataforma Cusco Creativos S.A.C.</p>
        </div>
      </footer>

      {/* 15. FLOATING WHATSAPP BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {showWaTooltip && (
          <div className="hidden sm:flex items-center gap-2.5 bg-white text-stone-900 text-xs font-bold px-4 py-2.5 rounded-2xl shadow-2xl border border-stone-200 animate-float-slow">
            <span className="text-base leading-none">💬</span>
            <span>{isEn ? 'Questions? Chat with our team live' : '¿Dudas? Habla con un asesor en vivo'}</span>
            <button
              onClick={() => setShowWaTooltip(false)}
              className="text-stone-400 hover:text-stone-700 ml-1 text-xs cursor-pointer p-0.5"
              aria-label="Cerrar sugerencia"
            >
              ✕
            </button>
          </div>
        )}

        <button
          onClick={() => handleActionClick()}
          className="relative group bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
          aria-label="Contactar por WhatsApp"
        >
          <span className="animate-ping absolute inset-0 rounded-full bg-[#25D366]/40 pointer-events-none"></span>
          <MessageCircle size={26} className="fill-white relative z-10 group-hover:rotate-12 transition-transform duration-300" />
        </button>
      </div>

      {/* 16. MODAL DE COTIZACIÓN CON PROTECCIÓN ANTI-SPAM (HONEYPOT & TIME-GATE) */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        landing={syntheticLanding}
      />
    </div>
  );
}
