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
  Backpack
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
    officialBar: isEn ? 'DIRCETUR • Safe Travels' : 'DIRCETUR Cusco • Safe Travels',
    seasonBadge: isEn ? '2026 Season • Guaranteed Daily Departures' : 'Temporada 2026 • Salidas Diarias',
    ratingLabel: isEn ? '4.9 / 5.0 Rating' : '4.9 / 5.0 Valoración',
    reviewsCount: isEn ? '+500 Verified Reviews' : '+500 Opiniones Verificadas',
    officialBadge: isEn ? 'MINCETUR & DIRCETUR' : 'MINCETUR & DIRCETUR',
    officialDesc: isEn ? 'Official Licensed Operator' : 'Operador Turístico Oficial',
    navTours: isEn ? 'Featured Tours' : 'Tours Destacados',
    navPackages: isEn ? 'Packages' : 'Paquetes',
    navWhyUs: isEn ? 'Why Us?' : '¿Por Qué Nosotros?',
    navReviews: isEn ? 'Reviews' : 'Reseñas',
    navFaq: isEn ? 'FAQ & Support' : 'FAQ & Soporte',
    ctaHeader: isEn ? 'WhatsApp' : 'WhatsApp',
    ctaHeroQuote: isEn ? 'Request Quote' : 'Solicitar Cotización',
    ctaHeroWa: isEn ? 'Book Now' : 'Reservar Ahora',
    ctaViewMore: isEn ? 'View Tours' : 'Ver Más Tours',
    statTravelers: isEn ? 'Happy Travelers' : 'Viajeros Felices',
    statExperience: isEn ? 'Years Experience' : 'De Experiencia',
    statRoutes: isEn ? 'Routes & Tours' : 'Rutas & Destinos',
    statRating: isEn ? 'Score 4.9/5' : 'Puntuación 4.9/5',
    catalogBadge: isEn ? 'Exclusive 2026 Catalog' : 'Catálogo Exclusivo 2026',
    catalogTitle: isEn ? 'Featured Tours in Cusco & Peru' : 'Tours Destacados en Cusco y Perú',
    catalogDesc: isEn ? 'Daily departures with certified tour guides, medical emergency kits and private transport.' : 'Salidas diarias garantizadas con guías colegiados, traslados oficiales y asistencia médica de emergencia.',
    filterAll: isEn ? 'All' : 'Todos',
    filterTrek: isEn ? 'Trekking' : 'Trekking',
    filterMachu: isEn ? 'Machu Picchu' : 'Machu Picchu',
    filterCulture: isEn ? 'Sacred Valley' : 'Valle Sagrado',
    filterAdrenaline: isEn ? 'Adrenaline' : 'Adrenalina',
    pricePerPerson: isEn ? 'Price per person' : 'Precio por persona',
    bookTour: isEn ? 'Book Tour' : 'Reservar Tour',
    quoteTour: isEn ? 'Request Quote' : 'Cotizar Tour',
    whyTitle: isEn ? `Why travel with ${brandName}?` : `¿Por qué viajar con ${brandName}?`,
    whySubtitle: isEn ? 'Official local agency with over a decade curating unforgettable memories across the Peruvian Andes.' : 'Somos una agencia local acreditada con más de 10 años organizando viajes inolvidables en Cusco y todo el Perú.',
    packagesTitle: isEn ? 'Curated Travel Packages' : 'Nuestros Tours & Paquetes',
    packagesDesc: isEn ? 'Multi-day packages including hotels, railway tickets, transfers and local guided tours.' : 'Circuitos completos con alojamiento, traslados y guiado incluidos.',
    reviewsTitle: isEn ? 'What our travelers say' : 'Lo que dicen nuestros viajeros',
    reviewsDesc: isEn ? 'Verified testimonials from adventurers around the globe who trusted our team in Cusco.' : 'Opiniones recopiladas de turistas de todo el mundo que confiaron sus vacaciones en Cusco con nuestro equipo oficial.',
    ctaBannerTitle: isEn ? 'READY FOR YOUR NEXT ADVENTURE?' : '¿LISTO PARA TU PRÓXIMA AVENTURA?',
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

  // 5. Helpers de traducción bilingüe completa (ES / EN)
  const getBilingualHeroTitle = (originalTitle?: string) => {
    if (!isEn) return originalTitle || 'VINICUNCA & MACHU PICCHU';
    if (!originalTitle) return 'LUXURY MACHU PICCHU & SCENIC PANORAMIC TRAIN';
    const lower = originalTitle.toLowerCase();
    if (lower.includes('machu picchu') || lower.includes('lujo') || lower.includes('tren') || lower.includes('vip')) {
      return 'LUXURY MACHU PICCHU & SCENIC PANORAMIC TRAIN';
    }
    if (lower.includes('vinicunca') || lower.includes('7 colores') || lower.includes('colores')) {
      return 'RAINBOW MOUNTAIN & RED VALLEY VIP EXPEDITION';
    }
    if (lower.includes('humantay')) {
      return 'TURQUOISE HUMANTAY LAKE & GLACIER VIP TREK';
    }
    if (lower.includes('valle sagrado')) {
      return 'SACRED VALLEY OF THE INCAS VIP CULTURAL JOURNEY';
    }
    return originalTitle;
  };

  const getBilingualHeroSubtitle = (originalSubtitle?: string) => {
    if (!isEn) {
      return originalSubtitle || 'Montaña de 7 Colores & Valle Rojo • Vive la magia de los Andes con operadores colegiados y salidas diarias.';
    }
    if (!originalSubtitle) {
      return 'Discover the Wonder of the World with private luxury transfers, 5-star comfort and an official certified historian guide dedicated exclusively to you.';
    }
    const lower = originalSubtitle.toLowerCase();
    if (lower.includes('maravilla') || lower.includes('machu picchu') || lower.includes('traslados') || lower.includes('familia')) {
      return 'Discover the Wonder of the World with private luxury transfers, 5-star comfort and an official certified historian guide dedicated exclusively to you and your family.';
    }
    if (lower.includes('montaña') || lower.includes('vinicunca') || lower.includes('colores')) {
      return 'Rainbow Mountain, Red Valley & Andean Wonders • Live the authentic Andean journey with accredited official experts and daily departures.';
    }
    return 'Live the authentic Andean journey with accredited official experts, private transfers and full medical oxygen assistance.';
  };

  const getBilingualHeroBadge = (originalBadge?: string) => {
    if (!isEn) return originalBadge || t.seasonBadge;
    if (!originalBadge) return t.seasonBadge;
    const lower = originalBadge.toLowerCase();
    if (lower.includes('vip') || lower.includes('exclusiv')) {
      return 'Exclusive VIP Experience • 2026 Season';
    }
    return t.seasonBadge;
  };

  const getBilingualFeatures = (items?: string[]) => {
    if (data?.includedServices && data.includedServices.length > 0) {
      return data.includedServices;
    }
    if (!isEn) {
      return items || [
        'Guías Oficiales Acreditados',
        'Balón de Oxígeno & Botiquín',
        'Salidas Diarias Garantizadas',
        'Atención 24/7 por WhatsApp'
      ];
    }
    if (!items || items.length === 0) {
      return [
        'Official Certified Historian Guides',
        'Emergency Medical Oxygen & First Aid Kit',
        'Guaranteed Daily Departures',
        '24/7 Dedicated WhatsApp Support'
      ];
    }
    return items.map(item => {
      const lower = item.toLowerCase();
      if (lower.includes('hiram bingham') || lower.includes('vistadome')) {
        return 'Hiram Bingham / Vistadome Luxury Train: Live Andean music, welcome cocktail and panoramic observatory windows.';
      }
      if (lower.includes('guía') || lower.includes('historiador')) {
        return 'Private Certified Historian Guide: Deep, tailored narrative at your own personal pace.';
      }
      if (lower.includes('gastronomía') || lower.includes('almuerzo') || lower.includes('buffet')) {
        return 'Signature Andean Gastronomy: Gourmet buffet lunch included at the foothills of the citadel.';
      }
      if (lower.includes('conserjería') || lower.includes('24/7') || lower.includes('coordinador')) {
        return '24/7 Dedicated Travel Concierge: Dedicated trip coordinator permanently on call for any request.';
      }
      if (lower.includes('oxígeno')) {
        return 'Emergency Medical Oxygen & Andean Altitude First Aid Kit in all vehicles.';
      }
      return item;
    });
  };

  const getBilingualItinerary = (itinerary?: { step: string; title: string; desc: string }[]) => {
    if (!isEn) {
      return itinerary && itinerary.length > 0 ? itinerary : [
        { step: '04:30 AM', title: 'Recojo en Hotel & Traslado Panorámico', desc: 'Recojo puntual en tu alojamiento con asistencia médica preventiva y refrigerio ligero.' },
        { step: '07:30 AM', title: 'Desayuno Buffet Andino Energético', desc: 'Desayuno preparado por cocineros locales para cargar energías antes del ascenso.' },
        { step: '09:30 AM', title: 'Ascenso Guiado a la Cumbre de Vinicunca (5,036 m)', desc: 'Caminata con ritmo dosificado, paradas fotográficas y asistencia permanente de oxígeno.' },
        { step: '01:30 PM', title: 'Almuerzo Campestre & Retorno a Cusco', desc: 'Almuerzo buffet campestre en valle andino y retorno cómodo a la ciudad de Cusco.' }
      ];
    }
    if (itinerary && itinerary.length > 0) {
      return itinerary.map(it => {
        const lower = (it.title + ' ' + it.desc).toLowerCase();
        let step = it.step.replace(/Día/gi, 'Day').replace(/Paso/gi, 'Step');
        let title = it.title;
        let desc = it.desc;
        if (lower.includes('aguas calientes') || lower.includes('vistadome') || lower.includes('tren')) {
          step = 'Day 1';
          title = 'Cusco to Aguas Calientes via Vistadome Panoramic Train';
          desc = 'Private pickup from your hotel in Cusco to Ollantaytambo station. Scenic railway journey through the Sacred Valley with live onboard performance. Check-in at boutique hotel in Machu Picchu Pueblo.';
        } else if (lower.includes('exploración') || lower.includes('machu picchu') || lower.includes('belmond')) {
          step = 'Day 2';
          title = 'Mystical Exploration of Machu Picchu & Gourmet Buffet';
          desc = 'Exclusive bus ascent to the Inca citadel. 3-hour private guided exploration through temples, royal enclosures and terraces. Gourmet buffet lunch at Belmond Sanctuary Lodge and first-class train back to Cusco.';
        }
        return { step, title, desc };
      });
    }
    return [
      { step: '04:30 AM', title: 'Hotel Pickup & Scenic Transfer', desc: 'Prompt pickup at your accommodation with preventative altitude assistance and light refreshments.' },
      { step: '07:30 AM', title: 'High-Energy Andean Buffet Breakfast', desc: 'Nutritious breakfast prepared with local Andean ingredients to fuel your morning ascent.' },
      { step: '09:30 AM', title: 'Guided Trek to Vinicunca Summit (5,036 m)', desc: 'Paced hike with photo stops, breathtaking mountain vistas and continuous medical oxygen support.' },
      { step: '01:30 PM', title: 'Valley Buffet Lunch & Comfortable Return', desc: 'Celebratory country buffet lunch followed by a smooth scenic drive returning to Cusco around 5:00 PM.' }
    ];
  };

  const heroTitle = getBilingualHeroTitle(data?.hero?.title);
  const heroSubtitle = getBilingualHeroSubtitle(data?.hero?.subtitle);
  const heroBadge = getBilingualHeroBadge(data?.hero?.badge);
  const heroImage = data?.heroImage || 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop';
  const heroCtaLabel = isEn 
    ? (objective === 'quote' ? 'Request Private VIP Quote' : objective === 'both' ? 'Book on WhatsApp or Quote' : 'Book on WhatsApp') 
    : (data?.hero?.cta || (objective === 'quote' ? t.ctaHeroQuote : objective === 'both' ? 'WhatsApp & Cotizar Online' : t.ctaHeroWa));

  // 6. Lista de Tours Destacados
  const DEFAULT_FEATURED_TOURS = [
    {
      id: 'tour-creado-usuario',
      title: data?.name || (isEn ? 'Signature Andean Tour Experience' : 'Tour Principal Seleccionado'),
      category: isEn ? 'Featured Signature Tour' : 'Tour Principal Destacado',
      categoryKey: 'all',
      location: destination,
      duration: data?.duration || 'Full Day',
      price: data?.price || '$45 USD',
      rating: 4.9,
      image: heroImage,
      tag: isEn ? 'Selected Tour' : 'Tour Seleccionado',
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

  const tourLimit = isFree ? 1 : isBasic ? 3 : 6;
  const displayTours = DEFAULT_FEATURED_TOURS.slice(0, tourLimit);

  // 7. Paquetes turísticos
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
  const handleActionClick = (tourName?: string, actionType?: 'whatsapp' | 'quote') => {
    const targetType = actionType || (objective === 'both' ? 'whatsapp' : objective);
    if (targetType === 'quote') {
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
    <div className={`min-h-screen bg-[#FDFDFD] text-stone-900 font-sans selection:bg-[#FF5500] selection:text-white w-full max-w-full overflow-x-hidden ${isMobile ? 'text-xs' : ''}`}>
      
      {/* 1. TOP ANNOUNCEMENT BAR (RESPONSIVE) */}
      <div className="bg-[#1C1917] text-white text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-2 sm:gap-4 truncate">
            <span className="flex items-center gap-1 text-stone-300 truncate">
              <Phone size={12} className="text-[#FF5500] shrink-0" />
              <span className="truncate font-mono">+{whatsappNumber}</span>
            </span>
            {!isMobile && (
              <span className="hidden md:flex items-center gap-1.5 text-stone-400 truncate">
                <Mail size={12} className="text-[#FF5500] shrink-0" /> reservas@{brandName.toLowerCase().replace(/\s+/g, '')}.pe
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {!isMobile && (
              <span className="hidden sm:inline-block bg-[#FF5500]/20 text-[#FF8844] font-bold px-2 py-0.5 rounded text-[10px] border border-[#FF5500]/40 truncate">
                {t.officialBar}
              </span>
            )}

            {/* Selector interactivo de Idioma (muestra los idiomas seleccionados) */}
            <div className="flex items-center bg-stone-800 rounded-lg p-0.5 border border-stone-700">
              {(data?.languages && data.languages.length > 0 ? data.languages : (['es', 'en', 'pt', 'fr', 'it'] as LanguageType[])).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-extrabold uppercase transition-all cursor-pointer ${
                    lang === l ? 'bg-[#FF5500] text-white shadow-xs' : 'text-stone-400 hover:text-white'
                  }`}
                  title={l === 'es' ? 'Español' : l === 'en' ? 'English' : l === 'pt' ? 'Português' : l === 'fr' ? 'Français' : 'Italiano'}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (RESPONSIVE) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-18 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#FF5500] to-[#FF8800] flex items-center justify-center text-white font-black shadow-md shadow-[#FF5500]/30 shrink-0">
              <Compass size={18} className="sm:w-[22px] sm:h-[22px]" />
            </div>
            <div className="truncate">
              <span className="font-extrabold text-sm sm:text-xl tracking-tight text-stone-900 block leading-tight truncate">
                {brandName.toUpperCase()}
              </span>
              {!isMobile && (
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-stone-500 block -mt-0.5 truncate hidden sm:block">
                  {isEn ? 'Official Operator' : 'Agencia Oficial'}
                </span>
              )}
            </div>
          </div>

          {!isFree && !isMobile && (
            <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-stone-700 uppercase tracking-wider">
              <a href="#tours" className="hover:text-[#FF5500] transition-colors">{t.navTours}</a>
              {!isBasic && <a href="#paquetes" className="hover:text-[#FF5500] transition-colors">{t.navPackages}</a>}
              <a href="#por-que-nosotros" className="hover:text-[#FF5500] transition-colors">{t.navWhyUs}</a>
              {!isBasic && <a href="#resenas" className="hover:text-[#FF5500] transition-colors">{t.navReviews}</a>}
              <a href="#soporte-faq" className="hover:text-[#FF5500] transition-colors">{t.navFaq}</a>
            </nav>
          )}

          <div className="flex items-center gap-2 shrink-0">
            {objective === 'both' ? (
              <>
                <button
                  onClick={() => handleActionClick(undefined, 'whatsapp')}
                  className="shimmer-btn bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-[11px] sm:text-xs font-extrabold px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={() => handleActionClick(undefined, 'quote')}
                  className="shimmer-btn bg-gradient-to-r from-[#FF5500] via-[#FF6611] to-[#FF3500] hover:from-[#E04B00] hover:to-[#FF5500] text-white text-[11px] sm:text-xs font-extrabold px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText size={14} />
                  <span>{t.ctaHeroQuote}</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => handleActionClick()}
                className="shimmer-btn bg-gradient-to-r from-[#FF5500] via-[#FF6611] to-[#FF3500] hover:from-[#E04B00] hover:to-[#FF5500] text-white text-[11px] sm:text-xs font-extrabold px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full shadow-md shadow-[#FF5500]/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer group shrink-0"
              >
                {objective === 'quote' ? <FileText size={14} /> : <MessageCircle size={14} className="group-hover:rotate-12 transition-transform duration-300 shrink-0" />}
                <span>{objective === 'quote' ? t.ctaHeroQuote : t.ctaHeader}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION (RESPONSIVE) */}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/40" />
        </div>

        {/* Ambient Glass Cards solo en Desktop */}
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

          <h1 className={`${isMobile ? 'text-2xl leading-tight' : 'text-2xl xs:text-3xl sm:text-5xl lg:text-6xl leading-tight'} font-black tracking-tight drop-shadow-2xl uppercase px-2`}>
            {heroTitle}
          </h1>
          <p className={`${isMobile ? 'text-xs line-clamp-3' : 'text-xs sm:text-lg lg:text-xl line-clamp-3 sm:line-clamp-none'} font-light text-stone-100 max-w-2xl mx-auto drop-shadow-md leading-relaxed px-2`}>
            {heroSubtitle}
          </p>

          <div className={`pt-2 flex ${isMobile ? 'flex-col' : 'flex-col sm:flex-row'} items-center justify-center gap-2.5 sm:gap-4 max-w-md mx-auto sm:max-w-none`}>
            {objective === 'both' ? (
              <>
                <button
                  onClick={() => handleActionClick(undefined, 'whatsapp')}
                  className="shimmer-btn w-full sm:w-auto bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-black text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 group ring-2 ring-white/25"
                >
                  <MessageCircle size={16} />
                  <span>{isEn ? 'Book on WhatsApp' : t.ctaHeroWa}</span>
                </button>
                <button
                  onClick={() => handleActionClick(undefined, 'quote')}
                  className="shimmer-btn w-full sm:w-auto bg-gradient-to-r from-[#FF5500] via-[#FF6611] to-[#FF3000] hover:from-[#E04500] hover:to-[#FF5500] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-black text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-lg shadow-[#FF5500]/40 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 group ring-2 ring-white/25"
                >
                  <FileText size={16} />
                  <span>{isEn ? 'Request VIP Quote' : t.ctaHeroQuote}</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => handleActionClick()}
                className="shimmer-btn w-full sm:w-auto bg-gradient-to-r from-[#FF5500] via-[#FF6611] to-[#FF3000] hover:from-[#E04500] hover:to-[#FF5500] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-black text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-lg shadow-[#FF5500]/40 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 group ring-2 ring-white/25"
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
          <div className={`grid ${isMobile ? 'grid-cols-2 gap-2.5' : 'grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-6'} divide-x-0 md:divide-x divide-stone-100 text-center`}>
            <div className="p-2 sm:p-3 rounded-2xl bg-stone-50/60 sm:bg-transparent space-y-0.5 sm:space-y-1">
              <span className="text-lg sm:text-4xl font-black text-stone-900 tracking-tight block animate-number-glow">+10,000</span>
              <span className="text-[11px] sm:text-sm font-bold text-stone-700 block">{t.statTravelers}</span>
              <span className="text-[9px] sm:text-[11px] text-stone-400 block truncate">{guideName}</span>
            </div>

            <div className="p-2 sm:p-3 rounded-2xl bg-stone-50/60 sm:bg-transparent space-y-0.5 sm:space-y-1">
              <span className="text-lg sm:text-4xl font-black text-[#FF5500] tracking-tight block animate-pulse-subtle">10+</span>
              <span className="text-[11px] sm:text-sm font-bold text-stone-700 block">{t.statExperience}</span>
              <span className="text-[9px] sm:text-[11px] text-stone-400 block truncate">{destination}</span>
            </div>

            <div className="p-2 sm:p-3 rounded-2xl bg-stone-50/60 sm:bg-transparent space-y-0.5 sm:space-y-1">
              <span className="text-lg sm:text-4xl font-black text-stone-900 tracking-tight block animate-number-glow">50+</span>
              <span className="text-[11px] sm:text-sm font-bold text-stone-700 block">{t.statRoutes}</span>
              <span className="text-[9px] sm:text-[11px] text-stone-400 block truncate">{isEn ? 'Peru' : 'Perú'}</span>
            </div>

            <div className="p-2 sm:p-3 rounded-2xl bg-stone-50/60 sm:bg-transparent space-y-0.5 sm:space-y-1">
              <span className="text-lg sm:text-4xl font-black text-[#FF5500] tracking-tight block animate-pulse-subtle">4.9 ★</span>
              <span className="text-[11px] sm:text-sm font-bold text-stone-700 block">{t.statRating}</span>
              <span className="text-[9px] sm:text-[11px] text-stone-400 block truncate">Google Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 FICHA TÉCNICA DEL TOUR & PERFIL DEL GUÍA OFICIAL */}
      <section className="py-8 sm:py-14 bg-gradient-to-b from-stone-50 to-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left: Especificaciones Técnicas (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-7 border border-stone-200 shadow-xs flex flex-col justify-between space-y-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF5500]/10 text-[#FF5500] text-[10px] font-black uppercase tracking-wider">
                    <Compass size={12} /> {isEn ? 'Official Tour Technical Sheet' : 'Ficha Técnica Oficial del Tour'}
                  </span>
                  <span className="text-[10px] bg-stone-100 text-stone-700 font-extrabold px-2.5 py-0.5 rounded-full border border-stone-200">
                    {data?.name || brandName}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                  {isEn ? 'Technical Specifications & Adventure Details' : 'Especificaciones Técnicas del Recorrido'}
                </h3>
                <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                  {data?.about?.content || data?.hero?.subtitle || (isEn ? 'Key parameters to ensure your safety and enjoyment across the Peruvian Andes.' : 'Parámetros certificados para garantizar tu seguridad, confort y disfrute en la ruta.')}
                </p>
              </div>

              {/* Grid 6 Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                    <Mountain size={14} className="text-[#FF5500]" />
                    <span className="text-[10px] font-bold uppercase">{isEn ? 'Max Altitude' : 'Altitud Máxima'}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-stone-900 block">{data?.altitude || '3,400 msnm'}</span>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                    <Clock size={14} className="text-[#FF5500]" />
                    <span className="text-[10px] font-bold uppercase">{isEn ? 'Duration' : 'Duración'}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-stone-900 block">{data?.duration || 'Full Day'}</span>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                    <Award size={14} className="text-[#FF5500]" />
                    <span className="text-[10px] font-bold uppercase">{isEn ? 'Difficulty' : 'Dificultad'}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-stone-900 block">{data?.difficulty || 'Moderada'}</span>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                    <Users size={14} className="text-[#FF5500]" />
                    <span className="text-[10px] font-bold uppercase">{isEn ? 'Group Type' : 'Modalidad'}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-stone-900 block truncate">{data?.groupType || 'Grupo Reducido'}</span>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                    <Target size={14} className="text-[#FF5500]" />
                    <span className="text-[10px] font-bold uppercase">{isEn ? 'Target Audience' : 'Público'}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-stone-900 block truncate">{data?.targetAudience || 'Aventureros & Familias'}</span>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                    <MapPin size={14} className="text-[#FF5500]" />
                    <span className="text-[10px] font-bold uppercase">{isEn ? 'Destination' : 'Destino'}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-stone-900 block truncate">{destination}</span>
                </div>
              </div>
            </div>

            {/* Right: Perfil del Guía Oficial Colegiado (5 cols) */}
            <div className="lg:col-span-5 bg-stone-900 text-white rounded-3xl p-5 sm:p-7 border border-stone-800 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider mb-3 border border-emerald-500/30">
                  <BadgeCheck size={13} /> {isEn ? 'Official Certified Guide' : 'Guía Oficial Colegiado DIRCETUR'}
                </div>
                
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF5500] to-[#FF8800] flex items-center justify-center text-white font-black text-xl shadow-md shrink-0">
                    {guideName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white">{guideName}</h4>
                    <p className="text-xs text-stone-300 font-semibold">{data?.guideCert || 'Guía Oficial de Turismo DIRCETUR'}</p>
                    <p className="text-[11px] text-[#FF8844] font-medium mt-0.5">🗣️ {data?.guideLanguages || 'Español, Inglés y Francés'}</p>
                  </div>
                </div>

                <p className="text-xs text-stone-400 leading-relaxed">
                  {isEn 
                    ? 'Accredited local specialist with wilderness first aid certification and specialized high-altitude protocol training.'
                    : 'Especialista local acreditado con certificación en primeros auxilios en zonas agrestes y protocolo médico para aclimatación.'}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-stone-400 block">{isEn ? 'Direct Line' : 'Atención Directa'}</span>
                  <span className="text-xs font-black text-emerald-400">{whatsappNumber ? `+${whatsappNumber}` : '+51 984 123 456'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleActionClick(undefined, 'whatsapp')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. TOURS DESTACADOS (1 COLUMNA ESTRICTA EN MÓVIL) */}
      <section id="tours" className={`py-8 sm:py-20 px-3 sm:px-6 max-w-7xl mx-auto`}>
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

        {/* Filtro interactivo */}
        {!isFree && !isBasic && (
          <div className={`flex items-center gap-1.5 sm:gap-3 overflow-x-auto sm:flex-wrap sm:justify-center mb-6 sm:mb-10 w-full max-w-full pb-2 ${isMobile ? 'no-scrollbar px-1' : ''}`}>
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

        {/* Grilla de Tours: En isMobile se fuerza 1 columna (w-full max-w-sm mx-auto) */}
        <div className={`grid gap-5 sm:gap-8 ${
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
                      <span>{tour.badge}</span>
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

                  <div className="p-4 sm:p-6 space-y-3">
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

      {/* 6. ITINERARIO DÍA A DÍA DETALLADO (CRONOGRAMA PASO A PASO) */}
      {(data?.itinerary && data.itinerary.length > 0) && (
        <section className="py-10 sm:py-20 bg-stone-900 text-white border-y border-stone-800">
          <div className="max-w-5xl mx-auto px-3 sm:px-6 space-y-6 sm:space-y-10">
            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] sm:text-xs font-black uppercase tracking-widest border border-amber-500/30">
                <Calendar size={12} /> {isEn ? 'Official Tour Itinerary' : 'Itinerario Detallado del Tour'}
              </span>
              <h2 className="text-xl sm:text-4xl font-black tracking-tight">
                {isEn ? 'Day-by-Day Experience Flow' : 'Cronograma y Experiencia Paso a Paso'}
              </h2>
              <p className="text-[11px] sm:text-sm text-stone-400">
                {isEn ? 'Designed to maximize comfort and acclimatization.' : 'Tiempos planificados al milímetro para favorecer la aclimatación y disfrute de la ruta.'}
              </p>
            </div>

            <div className="space-y-2.5 sm:space-y-4">
              {getBilingualItinerary(data?.itinerary).map((it, i) => (
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

      {/* 6.1 LOGÍSTICA: QUÉ NO INCLUYE & QUÉ LLEVAR EN LA MOCHILA */}
      {((data?.notIncluded && data.notIncluded.length > 0) || (data?.whatToBring && data.whatToBring.length > 0)) && (
        <section className="py-10 sm:py-16 bg-stone-100 border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-3 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-1.5">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#FF5500]">
                {isEn ? 'Clear Logistics & Preparation' : 'Logística Clara & Equipaje'}
              </span>
              <h3 className="text-xl sm:text-3xl font-black text-stone-900 tracking-tight">
                {isEn ? 'Exclusions & Backpack Checklist' : 'Exclusiones Claras & Checklist de Mochila'}
              </h3>
              <p className="text-xs text-stone-500">
                {isEn ? 'Everything transparent before you depart to the route.' : 'Transparencia total antes de iniciar tu aventura.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Qué NO incluye */}
              <div className="bg-white p-5 sm:p-7 rounded-3xl border border-rose-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-rose-600 font-black text-sm sm:text-base border-b border-rose-100 pb-3">
                  <XCircle size={20} className="shrink-0" />
                  <span>{isEn ? 'Not Included in Price' : 'Qué NO está incluido en la tarifa'}</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
                  {(data?.notIncluded && data.notIncluded.length > 0 ? data.notIncluded : [
                    'Vuelos internacionales o nacionales hacia Cusco',
                    'Propinas voluntarias para guía y conductor',
                    'Seguro médico de viaje internacional',
                    'Gastos o snacks personales no detallados'
                  ]).map((item, idx) => (
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
                  <span>{isEn ? 'Recommended Packing List' : 'Qué llevar en tu mochila (Recomendado)'}</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
                  {(data?.whatToBring && data.whatToBring.length > 0 ? data.whatToBring : [
                    'Pasaporte original físico vigente (obligatorio)',
                    'Ropa abrigadora en capas y casaca cortavientos',
                    'Zapatos cómodos o zapatillas con buen agarre',
                    'Bloqueador solar (SPF 50+), lentes de sol y gorro',
                    'Dinero en efectivo en soles peruanos'
                  ]).map((item, idx) => (
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

      {/* 7. ¿POR QUÉ ELEGIRNOS? */}
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
                  <span>{isEn ? 'Guides Active in Cusco' : 'Guías Activos Hoy en Cusco'}</span>
                </div>
              </div>

              <div className="mt-3 sm:mt-0 sm:absolute sm:-bottom-5 sm:right-6 bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-lg border border-stone-200 flex items-center gap-3">
                <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FF5500]/15 to-[#FF8800]/20 flex items-center justify-center text-[#FF5500] font-black text-sm sm:text-lg shrink-0 animate-pulse-subtle ring-2 ring-[#FF5500]/20">
                  100%
                </div>
                <div>
                  <p className="font-extrabold text-xs sm:text-sm text-stone-900">{isEn ? 'Satisfaction Guaranteed' : 'Satisfacción Garantizada'}</p>
                  <p className="text-[10px] text-stone-400">{guideName} • DIRCETUR</p>
                </div>
              </div>
            </div>

            {/* Pilares */}
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-1.5 sm:space-y-2">
                <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#FF5500]">
                  <ShieldCheck size={14} />
                  <span>{isEn ? 'Trust & Safety' : 'Confianza & Seguridad'}</span>
                </div>
                <h2 className="text-xl sm:text-4xl font-black text-stone-900 tracking-tight">
                  {t.whyTitle}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {t.whySubtitle}
                </p>
              </div>

              <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3.5'} pt-1`}>
                {getBilingualFeatures(data?.features?.items).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-stone-800 bg-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-stone-200 shadow-2xs">
                    <CheckCircle2 size={15} className="text-[#FF5500] shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#FFF6F0] p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#FFD9C2] space-y-1.5 shadow-xs">
                <h4 className="font-extrabold text-xs sm:text-sm text-stone-900 flex items-center gap-1.5">
                  <Award size={16} className="text-[#FF5500] shrink-0" />
                  <span>{isEn ? 'High Altitude Protocol' : 'Compromiso de Altura y Asistencia Médica'}</span>
                </h4>
                <p className="text-[11px] sm:text-xs text-stone-600 leading-relaxed">
                  {isEn 
                    ? 'All tours include certified pulse oximeter monitoring and medical oxygen in all transport vehicles.' 
                    : 'Todos nuestros vehículos y guías cuentan permanentemente con balón de oxígeno medicinal y botiquín de primeros auxilios.'}
                </p>
              </div>

              {/* Distintivos Oficiales & Sellos de Confianza */}
              <div className="pt-2 border-t border-stone-200/80">
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 block mb-2.5">
                  {isEn ? 'Official Certifications & Trust Badges' : 'Distintivos Oficiales & Sellos de Confianza'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {(data?.trustBadges && data.trustBadges.length > 0 ? data.trustBadges : [
                    'Licencia Oficial DIRCETUR Cusco',
                    'Sello Internacional Safe Travels',
                    'Agencia Formal RUC 20 Verificado',
                    'Guía Colegiado Bilingüe',
                    'Balón de Oxígeno & Botiquín'
                  ]).map((badge, bIdx) => (
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
                {t.navPackages}
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
                        <span className="text-xs text-stone-400">{isEn ? 'From' : 'Desde'}</span>
                        <span className="text-lg font-black text-stone-900">{tour.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 pt-0">
                    <button
                      onClick={() => handleActionClick(tour.title)}
                      className="shimmer-btn w-full bg-stone-900 hover:bg-[#FF5500] text-white py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 cursor-pointer"
                    >
                      <span>{objective === 'quote' ? t.quoteTour : (isEn ? 'View Itinerary' : 'Ver Itinerario')}</span>
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
                <span>{isEn ? 'Verified Stories' : 'Experiencias Reales'}</span>
              </div>
              <h2 className="text-xl sm:text-4xl font-black text-white tracking-tight">
                {t.reviewsTitle}
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
                {t.reviewsDesc}
              </p>
            </div>

            <div className={`grid gap-4 sm:gap-6 ${isMobile ? 'grid-cols-1 max-w-sm mx-auto' : 'grid-cols-1 md:grid-cols-3'}`}>
              {(data?.testimonials && data.testimonials.length > 0 ? data.testimonials : [
                {
                  name: 'Alejandro y Marcela',
                  origin: 'Madrid, España',
                  comment: isEn ? 'The best trip of our lives. Carlos our guide explained Andean history with immense passion.' : 'La mejor experiencia de nuestra vida en Perú. Nuestro guía nos explicó la historia con una pasión inolvidable.',
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
                        {isEn ? 'Verified' : 'Verificado'}
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

      {/* 10. FORO DE SOPORTE & FAQ */}
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
          lang={lang}
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
              {isEn ? 'Official Certifications' : 'Acreditaciones Oficiales'}
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

      {/* 15. FLOATING WHATSAPP BUTTON (PLANTADO Y FIJO) */}
      <div className="z-40 flex items-center gap-2 fixed bottom-5 right-5 sm:bottom-6 sm:right-6 pointer-events-auto select-none max-w-[calc(100vw-2.5rem)]">
        {showWaTooltip && !isMobile && (
          <div className="hidden sm:flex items-center gap-2 bg-white text-stone-900 text-xs font-bold px-3.5 py-2 rounded-2xl shadow-xl border border-stone-200 animate-in fade-in slide-in-from-right-2">
            <span>💬 {isEn ? 'Questions? Chat live' : '¿Dudas? Habla con un asesor'}</span>
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
      />
    </div>
  );
}
