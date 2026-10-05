import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Crown, Sparkles, ShieldCheck, Clock, Award, PhoneCall, MessageCircle, 
  FileText, Star, Calendar, XCircle, Backpack, Gem, Compass, CheckCircle2,
  ChevronRight, ArrowRight, MapPin, Mountain, Users, Languages, HeartHandshake,
  Coffee, Wifi, ExternalLink, ShieldAlert, Car, Utensils, Check, QrCode,
  Camera, Sun, Wine, Sparkle, Layers, BookOpen, Lock, Building2, Phone, Mail
} from 'lucide-react';
import { LandingData, LanguageType, CatalogTourItem } from '@/types/landing';
import { DEFAULT_SECONDARY_CATALOG_TOURS } from '@/data/defaultCatalogTours';
import QuoteModal from '@/components/common/QuoteModal';
import ComplaintsBookModal from '@/components/common/ComplaintsBookModal';
import LegalTermsModal from '@/components/common/LegalTermsModal';
import TourSupportAndFaqs from '@/components/common/TourSupportAndFaqs';
import PinterestPinboard from '@/components/common/PinterestPinboard';
import { PREMIUM_I18N, PREMIUM_LANGUAGES } from './premiumI18n';
import { translateText } from '@/data/translations';

interface TemplateProps {
  data: LandingData;
  isLive?: boolean;
  viewMode?: 'desktop' | 'tablet' | 'mobile';
}

export default function PremiumTemplate({ data, viewMode = 'desktop' }: TemplateProps) {
  const isQuote = data.objective === 'quote';
  const isMobile = viewMode === 'mobile';
  const cleanPhone = (data.whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const tier = data.tier || 'advance';
  const isFree = tier === 'free';
  const isBasic = tier === 'basic';
  const isPro = tier === 'pro';
  const isAdvance = tier === 'advance';

  // En planes Gratuito y Básico se fuerza estrictamente a Español ('es') por defecto (sin selector)
  const defaultLang: LanguageType = (isFree || isBasic)
    ? 'es'
    : (isPro && !['es', 'en'].includes(data.language || 'es'))
      ? 'es'
      : (data.language || 'es');

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedTourForQuote, setSelectedTourForQuote] = useState<string | null>(null);
  const [isComplaintsOpen, setIsComplaintsOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'terms' | 'cancellation' | 'privacy' | 'license'>('terms');
  const [currentLang, setCurrentLang] = useState<LanguageType>(defaultLang);
  type LuxuryFont = 'montserrat' | 'outfit' | 'syne' | 'cormorant' | 'cinzel';
  const [luxuryFontVariant, setLuxuryFontVariant] = useState<LuxuryFont>('montserrat');

  React.useEffect(() => {
    if (isFree || isBasic) {
      if (currentLang !== 'es') setCurrentLang('es');
    } else if (isPro) {
      if (data.language && ['es', 'en'].includes(data.language) && data.language !== currentLang) {
        setCurrentLang(data.language);
      } else if (!['es', 'en'].includes(currentLang)) {
        setCurrentLang('es');
      }
    } else if (data.language && data.language !== currentLang) {
      setCurrentLang(data.language);
    }
  }, [data.language, isFree, isBasic, isPro]);

  const t = PREMIUM_I18N[currentLang] || PREMIUM_I18N.es;

  // Language filtering according to Guía de Niveles:
  // Free / Basic: Sin selector de idiomas
  // Pro: ES / EN (máximo 2 idiomas)
  // Advance: Todos los 5 idiomas
  const displayPremiumLanguages = isFree || isBasic
    ? []
    : isPro
    ? PREMIUM_LANGUAGES.filter(l => l.code === 'es' || l.code === 'en')
    : PREMIUM_LANGUAGES;
  const encodedMsg = encodeURIComponent(`Hola ${data.guideName || 'Cusco Creativos'}, estoy interesado en la experiencia VIP "${data.name}". ¿Podrían brindarme disponibilidad?`);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  const heroImg = data.heroImage || 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop';
  const gallery1 = data.galleryImages?.[0] || 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop';
  const guideAvatarImg = (data.guideAvatar && !data.guideAvatar.includes('photo-1534528741775')) 
    ? data.guideAvatar 
    : '/images/tour-guide-carlos.jpg';

  const getTourWaUrl = (tourTitle: string) => {
    const msg = encodeURIComponent(`Hola ${data.guideName || 'Cusco Creativos'}, deseo consultar disponibilidad y tarifa VIP para el tour "${tourTitle}".`);
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  const secondaryCatalogTours = React.useMemo(() => {
    const sourceTours = (data?.catalogTours && data.catalogTours.length > 0)
      ? data.catalogTours
      : DEFAULT_SECONDARY_CATALOG_TOURS;
    const tourLimit = (isFree || isBasic) ? 3 : 6;
    return sourceTours.slice(0, tourLimit);
  }, [data?.catalogTours, isFree, isBasic]);

  const getLuxuryTestimonials = () => {
    if (data.testimonials && data.testimonials.length > 0) {
      return data.testimonials;
    }
    const defaultLuxury: Record<LanguageType, Array<{ name: string; origin: string; rating: number; comment: string; badge: string }>> = {
      es: [
        {
          name: 'Isabelle & Philippe Laurent',
          origin: 'Ginebra, Suiza',
          rating: 5,
          comment: 'La atención privada y el cuidado en cada detalle superaron cualquier expectativa. El acceso prioritario al amanecer y el trato del guía oficial nos permitieron conectar con la mística andina sin prisas ni multitudes.',
          badge: 'Huéspedes Signature'
        },
        {
          name: 'Edward & Victoria Sterling',
          origin: 'Londres, Reino Unido',
          rating: 5,
          comment: 'Impecable desde la bienvenida privada con maridaje hasta el retorno en vagón panorámico de lujo. La asistencia con oxigenoterapia y la puntualidad del chofer brindan una serenidad absoluta en altura.',
          badge: 'Viajeros Concierge'
        }
      ],
      en: [
        {
          name: 'Edward & Victoria Sterling',
          origin: 'London, United Kingdom',
          rating: 5,
          comment: 'Exemplary service from the private welcome lounge to the scenic luxury carriage. Having medical-grade oxygen care and an accredited historian guide made high altitude effortless and truly unforgettable.',
          badge: 'Signature Guests'
        },
        {
          name: 'Dr. Arthur & Elena Vance',
          origin: 'San Francisco, USA',
          rating: 5,
          comment: 'By far the finest private exploration in South America. The personalized pace, gourmet dining, and private transfers allowed us to experience the sanctuary in pristine tranquility.',
          badge: 'Concierge Members'
        }
      ],
      pt: [
        {
          name: 'Rodrigo & Camila Silveira',
          origin: 'São Paulo, Brasil',
          rating: 5,
          comment: 'A melhor experiência privativa de Cusco. O cuidado com a aclimatação, o vagão panorâmico de luxo e a gentileza do guia Carlos tornaram nossa viagem uma memória inesquecível para toda a família.',
          badge: 'Hóspedes VIP'
        },
        {
          name: 'Dra. Beatriz Mendes',
          origin: 'Rio de Janeiro, Brasil',
          rating: 5,
          comment: 'Atendimento impecável do início ao fim. Zero filas, logística perfeita e gastronomia refinada. Recomendo de olhos fechados.',
          badge: 'Membro Concierge'
        }
      ],
      fr: [
        {
          name: 'Isabelle & Philippe Laurent',
          origin: 'Genève, Suisse',
          rating: 5,
          comment: 'Une prise en charge d’exception. L’accès sans attente et les explications historiques de haute volée nous ont offert un moment de pure magie face aux citadelles andines.',
          badge: 'Invités Signature'
        },
        {
          name: 'Marc & Chloé Dubois',
          origin: 'Paris, France',
          rating: 5,
          comment: 'Organisation d’un raffinement rare. Voiture privée grand confort, accompagnement permanent et sécurité médicale irréprochable.',
          badge: 'Voyageurs VIP'
        }
      ],
      it: [
        {
          name: 'Matteo & Federica Bellini',
          origin: 'Milano, Italia',
          rating: 5,
          comment: 'Servizio di altissimo profilo. Dalla cura dell’acclimatazione all’ingresso esclusivo all’alba, tutto è stato curato con eleganza e professionalità magistrale.',
          badge: 'Ospiti Signature'
        },
        {
          name: 'Ing. Gianluca Rossi',
          origin: 'Roma, Italia',
          rating: 5,
          comment: 'Esperienza senza eguali sulle Ande peruviane. Puntualità impeccabile e guida privata di rara cultura storica.',
          badge: 'Membro Concierge'
        }
      ]
    };
    return defaultLuxury[currentLang] || defaultLuxury.es;
  };

  const defaultLuxuryServices = [
    'Transporte turístico privado de alta gama (SUV o Sprinter ejecutiva climatizada con chofer profesional)',
    'Boletos de ingreso preferenciales y completos a todos los recintos arqueológicos y monumentos',
    'Tren panorámico de primera clase (Hiram Bingham de Belmond o Vistadome Observatory con servicio a bordo)',
    'Guía oficial historiador colegiado bilingüe dedicado exclusivamente a tu grupo sin apuros',
    'Gastronomía de autor: almuerzo gourmet de tiempos con maridaje o experiencia culinaria privada',
    'Protocolo de altitud: balón de oxígeno medicinal de emergencia, oxímetro de pulso y botiquín de altura',
    'Pick-up y drop-off de puerta a puerta en el lobby de tu hotel o villa en Cusco o Valle Sagrado',
    'Kit de bienvenida andino con amenidades selectas y servicio de conserjería personalizada 24/7'
  ];

  const servicesList = data.includedServices && data.includedServices.length > 0 
    ? data.includedServices 
    : defaultLuxuryServices;

  // Visual sensory cards that make dark mode emotionally warm and enticing for tourists
  const sensoryHighlights = [
    {
      title: 'Amanecer Dorado en la Ciudadela',
      tag: 'Acceso Matutino Preferencial',
      desc: 'Ingreso en el primer turno para admirar la bruma disipándose sobre las terrazas incas en silencio y sin multitudes.',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1000&auto=format&fit=crop',
      icon: Sun
    },
    {
      title: 'Tren Panorámico & Brindis Andino',
      tag: 'Observatorio Hiram Bingham / Vistadome',
      desc: 'Copa de espumante o cóctel de bienvenida mientras la cordillera sagrada desfila frente a cúpulas acristaladas.',
      image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000&auto=format&fit=crop',
      icon: Wine
    },
    {
      title: 'Alta Gastronomía Orgánica',
      tag: 'Menú Degustación de Autor',
      desc: 'Sabores ancestrales reinterpretados por chefs de vanguardia en casonas coloniales o al aire libre en el Valle.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop',
      icon: Utensils
    },
    {
      title: 'Mística, Historia & Alpacas Reales',
      tag: 'Cultura Viva & Textiles Finos',
      desc: 'Encuentros privados con maestros artesanos cusqueños y crianza de alpacas y vicuñas en su hábitat natural.',
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1000&auto=format&fit=crop',
      icon: Camera
    }
  ];

  // NUEVA COLECCIÓN: MEJORES TOURS & EXPEDICIONES PRIVADAS DE LA AGENCIA
  const vipToursCatalog = [
    {
      id: 'tour-1',
      title: 'Machu Picchu VIP en Tren Hiram Bingham & Hotel 5★',
      category: 'Expedición Presidencial',
      duration: '2 Días / 1 Noche',
      groupType: '100% Privado',
      price: '$680 USD',
      rating: '5.0 ★',
      badge: 'Más Solicitado',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1000&auto=format&fit=crop',
      features: ['Tren Belmond Observatorio', 'Noche en Belmond Sanctuary Lodge', 'Ingreso matutino sin multitudes', 'Almuerzo gourmet de autor']
    },
    {
      id: 'tour-2',
      title: 'Valle Sagrado de los Incas & Hacienda Privada',
      category: 'Cultura & Paisaje',
      duration: 'Full Day Exclusivo',
      groupType: 'SUV Privada Climatizada',
      price: '$180 USD',
      rating: '4.9 ★',
      badge: 'Recomendado',
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1000&auto=format&fit=crop',
      features: ['Pisac & Ollantaytambo guiado', 'Maras & Salineras ancestrales', 'Almuerzo en Hacienda Colonial', 'Chofer y guía dedicados']
    },
    {
      id: 'tour-3',
      title: 'Laguna Humantay Turquesa & Glamping de Altura',
      category: 'Aventura & Bienestar',
      duration: '2 Días / Noche Estelar',
      groupType: 'Campamento Domos VIP',
      price: '$320 USD',
      rating: '4.9 ★',
      badge: 'Naturaleza Pura',
      image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1000&auto=format&fit=crop',
      features: ['Cúpulas con calefacción y vista', 'Caballos de apoyo incluidos', 'Chef privado en montaña', 'Balón de oxígeno permanente']
    },
    {
      id: 'tour-4',
      title: 'Montaña de Colores (Vinicunca) Anti-Multitudes',
      category: 'Fotografía & Altura',
      duration: 'Full Day Premium',
      groupType: 'Salida Anticipada VIP',
      price: '$190 USD',
      rating: '4.8 ★',
      badge: 'Exclusivo',
      image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=1000&auto=format&fit=crop',
      features: ['Horario exclusivo antes del gentío', 'Caballos y bastones de trekking', 'Desayuno gourmet campestre', 'Saturómetro y enfermería']
    },
    {
      id: 'tour-5',
      title: 'Gran Travesía Andina: Cusco a Puno en Tren Titicaca',
      category: 'Circuito Multidía',
      duration: '4 Días / 3 Noches',
      groupType: 'Tren Pullman Histórico',
      price: '$890 USD',
      rating: '5.0 ★',
      badge: 'Gran Expedición',
      image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=1000&auto=format&fit=crop',
      features: ['Coche bar con música en vivo', 'Navegación privada Lago Titicaca', 'Hoteles 5 estrellas en ruta', 'Todos los traslados y comidas']
    },
    {
      id: 'tour-6',
      title: 'Cusco Imperial Secreto & Maridaje Gastronómico',
      category: 'Experiencia Urbana VIP',
      duration: 'Medio Día Gourmet',
      groupType: 'Paso Peatonal Privado',
      price: '$140 USD',
      rating: '4.9 ★',
      badge: 'Gourmet & Historia',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop',
      features: ['Criptas coloniales y templos', 'Taller de cata de pisco selecto', 'Cena degustación 5 pasos', 'Historiador cusqueño privado']
    }
  ];

  const FONT_CONFIG: Record<LuxuryFont, { titleFont: string; bodyFont: string; tracking: string }> = {
    montserrat: {
      titleFont: "'Montserrat', sans-serif",
      bodyFont: "'Plus Jakarta Sans', var(--font-jakarta), sans-serif",
      tracking: '0.04em',
    },
    outfit: {
      titleFont: "'Outfit', sans-serif",
      bodyFont: "'Plus Jakarta Sans', var(--font-jakarta), sans-serif",
      tracking: '0.02em',
    },
    syne: {
      titleFont: "'Syne', sans-serif",
      bodyFont: "'Plus Jakarta Sans', var(--font-jakarta), sans-serif",
      tracking: '-0.02em',
    },
    cormorant: {
      titleFont: "'Cormorant Garamond', var(--font-cormorant), Garamond, Georgia, serif",
      bodyFont: "'Plus Jakarta Sans', var(--font-jakarta), sans-serif",
      tracking: '0.02em',
    },
    cinzel: {
      titleFont: "'Cinzel', serif",
      bodyFont: "'Plus Jakarta Sans', var(--font-jakarta), sans-serif",
      tracking: '0.04em',
    },
  };

  return (
    <div className={`min-h-screen bg-[#0a080e] luxury-dynamic-container luxury-font-${luxuryFontVariant} text-neutral-100 selection:bg-amber-500 selection:text-black relative overflow-x-hidden transition-all duration-300`}>
      <style>{`
        .luxury-dynamic-container {
          font-family: ${FONT_CONFIG[luxuryFontVariant].bodyFont} !important;
        }
        .luxury-dynamic-container .font-serif,
        .luxury-dynamic-container h1,
        .luxury-dynamic-container h2,
        .luxury-dynamic-container h3,
        .luxury-dynamic-container h4 {
          font-family: ${FONT_CONFIG[luxuryFontVariant].titleFont} !important;
          letter-spacing: ${FONT_CONFIG[luxuryFontVariant].tracking};
        }
      `}</style>
      
      {/* Warm Golden & Amber Ambient Luxury Lighting Backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-amber-500/18 via-amber-600/8 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[30%] -right-40 w-[650px] h-[650px] bg-amber-600/10 blur-[150px] rounded-full" />
        <div className="absolute top-[60%] -left-40 w-[650px] h-[650px] bg-amber-500/8 blur-[150px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-400/6 blur-[130px] rounded-full" />
      </div>

      {/* 1. TOP LIVE ASSURANCE BAR FOR TOURISTS */}
      <div className="relative z-50 bg-gradient-to-r from-amber-600/25 via-amber-500/20 to-amber-600/25 border-b border-amber-500/30 px-3 py-1.5 text-center">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-amber-200/90 font-medium">
          <span className="flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {currentLang === 'en' ? '2026 Season Confirmed • Daily Departures' : currentLang === 'pt' ? 'Temporada 2026 Confirmada • Saídas Diárias' : currentLang === 'fr' ? 'Saison 2026 Confirmée • Départs Quotidiens' : currentLang === 'it' ? 'Stagione 2026 Confermata • Partenze Giornaliere' : 'Temporada 2026 Confirmada • Salidas Diarias'}
            </span>
          </span>
          <span className="hidden md:inline text-amber-400/40">•</span>
          <span className="flex items-center gap-1.5">
            <Star size={12} className="text-amber-300 fill-amber-300" />
            <span>
              <strong>4.9 / 5.0</strong> {currentLang === 'en' ? 'Guest Satisfaction (+380 VIP Reviews)' : currentLang === 'pt' ? 'Satisfação dos Hóspedes (+380 Avaliações VIP)' : currentLang === 'fr' ? 'Satisfaction des Invités (+380 Avis VIP)' : currentLang === 'it' ? 'Soddisfazione Ospiti (+380 Recensioni VIP)' : 'Satisfacción de Huéspedes (+380 Reseñas VIP)'}
            </span>
          </span>
          <span className="hidden sm:inline text-amber-400/40">•</span>
          <span className="hidden sm:flex items-center gap-1.5 text-emerald-300 font-semibold">
            <ShieldCheck size={12} />
            <span>
              {currentLang === 'en' ? 'Flexible Booking • Continuous Medical Oxygen' : currentLang === 'pt' ? 'Reserva Flexível • Oxigenoterapia Contínua' : currentLang === 'fr' ? 'Réservation Flexible • Oxygénothérapie Continue' : currentLang === 'it' ? 'Prenotazione Flessibile • Ossigeno Continuo' : 'Reserva Flexible • Asistencia Médica Continua'}
            </span>
          </span>
        </div>
      </div>

      {/* 2. ULTRA LUXURY TOP HEADER */}
      <header className="sticky top-0 w-full z-40 bg-[#0a080e]/92 backdrop-blur-xl border-b border-amber-500/20 px-3 sm:px-8 py-3.5 sm:py-4 flex justify-between items-center gap-2 sm:gap-4 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400/30 via-amber-500/15 to-transparent border border-amber-400/50 flex items-center justify-center text-amber-300 shrink-0 shadow-[0_0_18px_rgba(245,158,11,0.3)]">
            <Crown size={isMobile ? 16 : 20} className="text-amber-300 drop-shadow-[0_2px_8px_rgba(245,158,11,0.6)]" />
          </div>
          <div className="min-w-0">
            <span 
              style={{ fontFamily: FONT_CONFIG[luxuryFontVariant].titleFont }}
              className={`${isMobile ? 'text-xs' : 'text-xs sm:text-sm md:text-base'} tracking-[0.2em] uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 truncate block`}
            >
              Cusco Luxury Collection
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-amber-400/80 font-semibold block font-mono truncate">
              {t.hero.privateConciergeBadge}
            </span>
          </div>
        </div>

        {!isMobile && (
          <nav className="hidden xl:flex items-center gap-5 text-[11px] uppercase tracking-[0.2em] text-neutral-300 shrink-0 font-medium">
            <a href="#inicio" className="hover:text-amber-300 transition-colors relative py-1 group">
              {currentLang === 'en' ? 'Home' : currentLang === 'fr' ? 'Accueil' : currentLang === 'pt' ? 'Início' : currentLang === 'it' ? 'Inizio' : 'Inicio'}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all group-hover:w-full" />
            </a>
            {(isPro || isAdvance) && (
              <a href="#itinerario" className="hover:text-amber-300 transition-colors relative py-1 group">
                {t.nav.experience}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all group-hover:w-full" />
              </a>
            )}
            <a href="#tours" className="hover:text-amber-300 transition-colors relative py-1 group">
              {t.nav.tours}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all group-hover:w-full" />
            </a>
            {!isFree && (
              <a href="#galeria" className="hover:text-amber-300 transition-colors relative py-1 group">
                {currentLang === 'en' ? 'Gallery' : currentLang === 'fr' ? 'Galerie' : currentLang === 'pt' ? 'Galeria' : currentLang === 'it' ? 'Galleria' : 'Galería'}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all group-hover:w-full" />
              </a>
            )}
            <a href="#sensorial" className="hover:text-amber-300 transition-colors relative py-1 group">
              {t.nav.sensory}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all group-hover:w-full" />
            </a>
            <a href="#ficha-tecnica" className="hover:text-amber-300 transition-colors relative py-1 group">
              {t.nav.specs}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all group-hover:w-full" />
            </a>
            <a href="#amenidades" className="hover:text-amber-300 transition-colors relative py-1 group">
              {t.nav.amenities}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all group-hover:w-full" />
            </a>
            {(isPro || isAdvance) && (
              <a href="#guia-concierge" className="hover:text-amber-300 transition-colors relative py-1 group">
                {t.nav.concierge}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all group-hover:w-full" />
              </a>
            )}
            {isAdvance && (
              <a href="#lounge-vip" className="hover:text-amber-300 transition-colors relative py-1 group">
                {t.nav.lounge}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all group-hover:w-full" />
              </a>
            )}
            <a href="#contacto" className="hover:text-amber-300 transition-colors relative py-1 group">
              {currentLang === 'en' ? 'Contact' : currentLang === 'pt' ? 'Contato' : currentLang === 'fr' ? 'Contact' : currentLang === 'it' ? 'Contatto' : 'Contacto'}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all group-hover:w-full" />
            </a>
          </nav>
        )}

        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Subtle Champagne Gold Font Selector */}
          <div className="flex items-center bg-neutral-900/90 border border-amber-500/30 rounded-full p-0.5 text-[8px] sm:text-[9px] font-bold" title="Selector de Tipografía Luxury">
            {(['montserrat', 'outfit', 'syne', 'cormorant', 'cinzel'] as const).map((fontKey) => (
              <button
                key={fontKey}
                type="button"
                onClick={() => setLuxuryFontVariant(fontKey)}
                className={`px-1.5 sm:px-2 py-0.5 rounded-full transition-all duration-200 cursor-pointer ${
                  luxuryFontVariant === fontKey 
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-extrabold shadow-xs' 
                    : 'text-neutral-400 hover:text-amber-200'
                }`}
              >
                {fontKey === 'montserrat' ? '🏛️ Montserrat (Sobrio)' 
                 : fontKey === 'outfit' ? '💎 Outfit' 
                 : fontKey === 'syne' ? 'Syne' 
                 : fontKey === 'cormorant' ? 'Cormorant' 
                 : 'Cinzel'}
              </button>
            ))}
          </div>

          {/* Subtle Champagne Gold Language Selector (Pro & Advance) */}
          {displayPremiumLanguages.length > 1 && (
            <div className="flex items-center bg-neutral-900/90 border border-amber-500/25 rounded-full p-0.5 text-[9px] sm:text-[10px] font-bold">
              {displayPremiumLanguages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setCurrentLang(l.code)}
                  className={`px-1.5 sm:px-2 py-0.5 rounded-full uppercase transition-all duration-200 cursor-pointer ${
                    currentLang === l.code 
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-extrabold shadow-xs' 
                      : 'text-neutral-400 hover:text-amber-200'
                  }`}
                  title={l.label}
                >
                  {l.code}
                </button>
              ))}
            </div>
          )}

          {data.objective === 'both' ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-neutral-950 px-2.5 sm:px-4 py-2 rounded-full font-extrabold text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/25 hover:scale-102 cursor-pointer"
              >
                <MessageCircle size={14} />
                <span className="hidden sm:inline">{t.cta.whatsapp}</span>
              </a>
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-neutral-950 px-2.5 sm:px-4 py-2 rounded-full font-extrabold text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-400/30 hover:scale-102 cursor-pointer"
              >
                <FileText size={14} />
                <span className="hidden sm:inline">{t.cta.quote}</span>
              </button>
            </div>
          ) : isQuote ? (
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-neutral-950 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-extrabold text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-400/30 hover:scale-102 cursor-pointer"
            >
              <FileText size={14} />
              <span>{t.cta.quote}</span>
            </button>
          ) : (
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-neutral-950 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-extrabold text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-400/30 hover:scale-102 cursor-pointer"
            >
              <MessageCircle size={14} />
              <span>{t.cta.bookNow}</span>
            </a>
          )}
        </div>
      </header>

      {/* 3. WARM SUNLIT CINEMATIC HERO SECTION */}
      <section id="inicio" className={`relative ${isMobile ? 'py-14 min-h-[540px]' : 'py-26 min-h-[90vh]'} flex items-center justify-center overflow-hidden z-10`}>
        {/* Warmer Vignette Layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a080e] via-[#0a080e]/65 to-[#0a080e]/30 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_10%,_#0a080e_85%)] z-10 opacity-75" />
        
        <Image 
          src={heroImg} 
          alt={data.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-65 scale-105 transition-transform duration-1000 ease-out filter saturate-110"
        />
        
        <div className={`relative z-20 text-center text-white ${isMobile ? 'px-4' : 'px-6'} max-w-5xl mx-auto flex flex-col items-center`}>
          
          {/* Badge VIP con resplandor dorado cálido */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-[11px] tracking-[0.25em] uppercase font-bold mb-5 backdrop-blur-md shadow-[0_0_25px_rgba(245,158,11,0.35)]">
            <Sparkles size={14} className="text-amber-300 animate-pulse" />
            <span>{data.hero?.badge ? translateText(data.hero.badge, currentLang) : t.hero.badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          </div>

          {/* Título en Oro Champagne Editorial */}
          <h1 
            style={{ fontFamily: FONT_CONFIG[luxuryFontVariant].titleFont }}
            className={`${isMobile ? 'text-2xl sm:text-3xl leading-tight mb-4' : 'text-4xl sm:text-6xl md:text-7xl leading-[1.12] mb-6'} tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-100 to-amber-300 drop-shadow-md font-medium`}
          >
            {data.hero?.title ? translateText(data.hero.title, currentLang) : t.hero.defaultTitle}
          </h1>

          {/* Divisor ornamental dorado */}
          <div className="flex items-center gap-3 my-2 opacity-90">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-amber-400/80" />
            <Crown size={15} className="text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-amber-400/80" />
          </div>

          {/* Subtítulo pulido y acogedor */}
          <p className={`${isMobile ? 'text-xs leading-relaxed mb-8' : 'text-base sm:text-lg md:text-xl mb-10 leading-relaxed'} text-neutral-200 max-w-2xl font-light tracking-wide`}>
            {data.hero?.subtitle ? translateText(data.hero.subtitle, currentLang) : t.hero.defaultSubtitle}
          </p>

          {/* CTA & Precio en marco biselado */}
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-col sm:flex-row'} items-center gap-4 w-full max-w-xl justify-center`}>
            {data.objective === 'both' ? (
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white ${isMobile ? 'w-full py-3.5 text-xs' : 'text-sm px-7 py-4'} rounded-full font-bold transition-all shadow-xl shadow-emerald-500/30 hover:scale-105 flex items-center justify-center gap-2.5 cursor-pointer`}
                >
                  <MessageCircle size={18} />
                  <span>{t.cta.whatsapp}</span>
                </a>
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className={`bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-neutral-950 ${isMobile ? 'w-full py-3.5 text-xs' : 'text-sm px-7 py-4'} rounded-full font-extrabold transition-all shadow-xl shadow-amber-400/35 hover:scale-105 flex items-center justify-center gap-2.5 cursor-pointer`}
                >
                  <FileText size={18} />
                  <span>{t.cta.quote}</span>
                </button>
              </div>
            ) : isQuote ? (
              <button
                onClick={() => setIsQuoteOpen(true)}
                className={`bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-neutral-950 ${isMobile ? 'w-full py-3.5 text-sm' : 'text-base px-9 py-4'} rounded-full font-extrabold transition-all shadow-[0_8px_30px_rgba(245,158,11,0.4)] hover:scale-105 flex items-center justify-center gap-2.5 cursor-pointer`}
              >
                <FileText size={19} />
                <span>{translateText(data.hero?.cta || t.cta.quote, currentLang)}</span>
              </button>
            ) : (
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-neutral-950 ${isMobile ? 'w-full py-3.5 text-sm' : 'text-base px-9 py-4'} rounded-full font-extrabold transition-all shadow-[0_8px_30px_rgba(245,158,11,0.4)] hover:scale-105 flex items-center justify-center gap-2.5 cursor-pointer`}
              >
                <MessageCircle size={19} />
                <span>{translateText(data.hero?.cta || t.cta.bookNow, currentLang)}</span>
              </a>
            )}

            {/* Price Box biselado */}
            <div className={`bg-neutral-900/90 backdrop-blur-md rounded-2xl border border-amber-500/40 px-5 py-3 ${isMobile ? 'w-full text-center' : 'text-left'} shadow-xl`}>
              <p className="text-[10px] text-amber-400 uppercase tracking-[0.2em] font-semibold font-mono">
                {currentLang === 'en' ? 'Starting From' : currentLang === 'pt' ? 'A Partir de' : currentLang === 'fr' ? 'À Partir de' : currentLang === 'it' ? 'A Partire da' : 'Tarifa Desde'}
              </p>
              <p 
                style={{ fontFamily: FONT_CONFIG[luxuryFontVariant].titleFont }}
                className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200`}
              >
                {data.price || '$450 USD'}
              </p>
            </div>
          </div>

          {/* Intimate Group Availability Badge */}
          <div className="mt-7 inline-flex items-center gap-2 text-[11px] text-amber-300/80 bg-neutral-900/80 border border-amber-500/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>
              {currentLang === 'en' ? 'Guaranteed Exclusivity: Limited to 6 to 8 private spots per departure' : currentLang === 'pt' ? 'Exclusividade garantida: Grupos reduzidos de 6 a 8 vagas privativas por saída' : currentLang === 'fr' ? 'Exclusivité garantie : Petits groupes de 6 à 8 places privées par date' : currentLang === 'it' ? 'Esclusività garantita: Posti limitati da 6 a 8 partecipanti privati per data' : 'Exclusividad garantizada: Cupos reducidos de 6 a 8 plazas privadas por fecha'}
            </span>
          </div>

        </div>
      </section>

      {/* 4. THREE FLOATING PILLARS OF EXCELLENCE (BÁSICO, PRO, ADVANCE) */}
      {!isFree && (
        <section className={`relative z-30 ${isMobile ? 'mt-4 px-3' : '-mt-12 max-w-5xl mx-auto px-4'}`}>
        <div className={`bg-gradient-to-b from-neutral-900/95 via-neutral-900/85 to-[#120f18]/95 backdrop-blur-xl rounded-3xl border border-amber-500/35 ${isMobile ? 'p-4 grid grid-cols-1 gap-3.5' : 'p-7 grid grid-cols-1 md:grid-cols-3 gap-6'} shadow-[0_20px_50px_rgba(0,0,0,0.85)]`}>
          
          <div className="flex items-center gap-4 p-2 rounded-2xl group hover:bg-amber-500/10 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400/25 to-amber-600/15 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Award size={22} className="text-amber-400 drop-shadow-[0_2px_6px_rgba(245,158,11,0.5)]" />
            </div>
            <div>
              <p className="text-[10px] text-amber-400 uppercase tracking-[0.2em] font-bold font-mono">
                {currentLang === 'en' ? 'Elite Guide' : currentLang === 'pt' ? 'Guia de Elite' : currentLang === 'fr' ? 'Guide d’Élite' : currentLang === 'it' ? 'Guida d’Élite' : 'Guía de Élite'}
              </p>
              <p className="font-serif font-bold text-neutral-100 text-sm sm:text-base leading-snug">{data.guideName || 'Historiador Oficial'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2 rounded-2xl group hover:bg-amber-500/10 transition-colors border-y md:border-y-0 md:border-x border-neutral-800/80">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400/25 to-amber-600/15 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Clock size={22} className="text-amber-400 drop-shadow-[0_2px_6px_rgba(245,158,11,0.5)]" />
            </div>
            <div>
              <p className="text-[10px] text-amber-400 uppercase tracking-[0.2em] font-bold font-mono">
                {currentLang === 'en' ? 'Duration & Pace' : currentLang === 'pt' ? 'Duração & Ritmo' : currentLang === 'fr' ? 'Durée & Rythme' : currentLang === 'it' ? 'Durata & Ritmo' : 'Duración & Ritmo'}
              </p>
              <p className="font-serif font-bold text-neutral-100 text-sm sm:text-base leading-snug">{translateText(data.duration || '2 Días / 1 Noche', currentLang)}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2 rounded-2xl group hover:bg-amber-500/10 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400/25 to-amber-600/15 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <ShieldCheck size={22} className="text-amber-400 drop-shadow-[0_2px_6px_rgba(245,158,11,0.5)]" />
            </div>
            <div>
              <p className="text-[10px] text-amber-400 uppercase tracking-[0.2em] font-bold font-mono">
                {currentLang === 'en' ? 'VIP Guarantee' : currentLang === 'pt' ? 'Garantia VIP' : currentLang === 'fr' ? 'Garantie VIP' : currentLang === 'it' ? 'Garanzia VIP' : 'Garantía VIP'}
              </p>
              <p className="font-serif font-bold text-neutral-100 text-sm sm:text-base leading-snug">
                {currentLang === 'en' ? '100% Customized' : currentLang === 'pt' ? '100% Personalizado' : currentLang === 'fr' ? '100% Sur Mesure' : currentLang === 'it' ? '100% Personalizzato' : '100% Personalizado'}
              </p>
            </div>
          </div>

        </div>
      </section>
      )}

      {/* 5. TRUST BADGES - PRO & ADVANCE ONLY */}
      {(isPro || isAdvance) && data.trustBadges && data.trustBadges.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 mt-8 relative z-20">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
            {data.trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-gradient-to-r from-neutral-900/90 to-neutral-900/70 border border-amber-500/35 text-amber-200 text-xs px-4 py-2 rounded-full font-medium shadow-sm backdrop-blur-md hover:border-amber-400/60 transition-colors">
                <Crown size={12} className="text-amber-400 shrink-0" />
                <span className="tracking-wide text-[11px] sm:text-xs">{translateText(badge, currentLang)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. NUEVA SECCIÓN: NUESTROS TOURS & EXPEDICIONES PRIVADAS (DISPONIBLE EN TODOS LOS PLANES) */}
      <section id="tours" className={`relative ${isMobile ? 'py-14 px-4' : 'py-24 px-8'} overflow-hidden border-t border-amber-500/15`}>
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-600/8 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[10px] uppercase tracking-[0.2em] font-bold font-mono mb-3 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
              <Layers size={13} className="text-amber-400" />
              <span>
                {currentLang === 'en' ? 'Select Expeditions 2026' : currentLang === 'pt' ? 'Expedições Selecionadas 2026' : currentLang === 'fr' ? 'Expéditions Sélectionnées 2026' : currentLang === 'it' ? 'Spedizioni Selezionate 2026' : 'Expediciones Selectas 2026'}
              </span>
            </div>
            <h2 className={`${isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-5xl'} font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-200 mb-3`}>
              {currentLang === 'en' ? 'Our Tours & Private Packages' : currentLang === 'pt' ? 'Nossos Tours & Pacotes Privados' : currentLang === 'fr' ? 'Nos Circuits & Forfaits Privés' : currentLang === 'it' ? 'I Nostri Tour & Pacchetti Privati' : 'Nuestros Tours & Paquetes Privados'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              {currentLang === 'en' 
                ? 'High-end expeditions operated with executive vehicles, panoramic first-class trains, and boutique hotels.' 
                : currentLang === 'pt' 
                ? 'Circuitos de alto padrão operados com veículos executivos, trens panorâmicos de primeira classe e hotéis boutique de luxo.' 
                : currentLang === 'fr' 
                ? 'Circuits haut de gamme avec véhicules de luxe, trains panoramiques de première classe et hôtels de charme.' 
                : currentLang === 'it' 
                ? 'Itinerari di prestigio con veicoli executive, treni panoramici di prima classe e hotel boutique di charme.' 
                : 'Circuitos de alta gama operados con vehículos ejecutivos, trenes panorámicos de primera clase y hotelería boutique de ensueño.'}
            </p>
          </div>

          {/* Grid of VIP Tours */}
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'}`}>
            {vipToursCatalog.map((tour) => (
              <div 
                key={tour.id}
                className="bg-neutral-900/85 backdrop-blur-xl border border-amber-500/25 hover:border-amber-400/60 rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Tour Image Header */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/40" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="bg-neutral-950/80 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-md font-mono">
                        {translateText(tour.category, currentLang)}
                      </span>
                      <span className="bg-amber-500 text-neutral-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 font-mono">
                        <Star size={11} fill="currentColor" />
                        <span>{tour.rating}</span>
                      </span>
                    </div>

                    {/* Bottom floating chip */}
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-neutral-950/85 backdrop-blur-md border border-amber-500/30 text-neutral-200 text-[11px] px-3 py-1 rounded-full font-medium">
                        {translateText(tour.groupType, currentLang)}
                      </span>
                    </div>
                  </div>

                  {/* Tour Details */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    <div className="flex items-center justify-between text-xs text-amber-400/80 font-mono">
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} className="text-amber-400" />
                        <span>{translateText(tour.duration, currentLang)}</span>
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{currentLang === 'en' ? 'Daily Departure' : currentLang === 'pt' ? 'Saída Diária' : currentLang === 'fr' ? 'Départ Quotidien' : currentLang === 'it' ? 'Partenza Giornaliera' : 'Salida Diaria'}</span>
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-white text-lg leading-snug group-hover:text-amber-200 transition-colors">
                      {translateText(tour.title, currentLang)}
                    </h3>

                    {/* Features list */}
                    <ul className="space-y-1.5 pt-1 border-t border-neutral-800/80">
                      {tour.features.map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs text-neutral-300 font-light flex items-center gap-2">
                          <Check size={13} className="text-amber-400 shrink-0 font-bold" />
                          <span>{translateText(feat, currentLang)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer: Price & Direct Actions */}
                <div className="p-5 sm:p-6 pt-0 border-t border-neutral-800/60 mt-2">
                  <div className="flex items-baseline justify-between py-3">
                    <span className="text-xs text-neutral-400 uppercase tracking-wider font-mono">
                      {currentLang === 'en' ? 'VIP Rate' : currentLang === 'pt' ? 'Tarifa VIP' : currentLang === 'fr' ? 'Tarif VIP' : currentLang === 'it' ? 'Tariffa VIP' : 'Tarifa VIP'}
                    </span>
                    <span className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
                      {tour.price}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={getTourWaUrl(tour.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
                    >
                      <MessageCircle size={14} />
                      <span>{t.cta.whatsapp}</span>
                    </a>
                    <button
                      onClick={() => {
                        setSelectedTourForQuote(tour.title);
                        setIsQuoteOpen(true);
                      }}
                      className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-neutral-950 font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-400/25 active:scale-95 cursor-pointer"
                    >
                      <FileText size={14} />
                      <span>{t.cta.quote}</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MOMENTOS INOLVIDABLES & EXPERIENCIAS SENSORIALES (BÁSICO, PRO, ADVANCE) */}
      {!isFree && (
        <section id="sensorial" className={`${isMobile ? 'py-14 px-4' : 'py-22 px-8'} max-w-6xl mx-auto relative z-10`}>
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[10px] uppercase tracking-[0.2em] font-bold font-mono mb-3 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
            <Sparkle size={13} className="text-amber-400" />
            <span>{t.sensory.badge}</span>
          </div>
          <h2 className={`${isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-5xl'} font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-200 mb-3`}>
            {t.sensory.title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
            {t.sensory.subtitle}
          </p>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-1 gap-5' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'}`}>
          {sensoryHighlights.map((moment, idx) => {
            const Icon = moment.icon;
            const cardData = t.sensory.cards[idx] || moment;
            return (
              <div 
                key={idx}
                className="group relative rounded-3xl overflow-hidden border border-amber-500/25 hover:border-amber-400/60 transition-all duration-500 bg-neutral-900/80 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:-translate-y-1.5 flex flex-col h-96"
              >
                {/* Background Image with Zoom */}
                <Image
                  src={moment.image}
                  alt={cardData.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                />
                
                {/* Dramatic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a080e] via-[#0a080e]/65 to-transparent z-10" />

                {/* Top Badge */}
                <div className="relative z-20 p-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#0a080e]/80 backdrop-blur-md border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-md">
                    <Icon size={18} />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-20 mt-auto p-5 space-y-2">
                  <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-amber-400 block">
                    {cardData.tag}
                  </span>
                  <h3 className="font-serif font-bold text-neutral-100 text-lg group-hover:text-amber-200 transition-colors">
                    {cardData.title}
                  </h3>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed line-clamp-3">
                    {cardData.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      )}

      {/* 8. FICHA TÉCNICA DE ALTA EXPEDICIÓN (BÁSICO, PRO, ADVANCE) */}
      {!isFree && (
        <section id="ficha-tecnica" className={`relative ${isMobile ? 'py-14 px-4' : 'py-24 px-8'} overflow-hidden border-y border-amber-500/15`}>
        {/* Background Image with Deep Vignette */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop"
            alt="Andean Panorama Background"
            fill
            sizes="100vw"
            className="object-cover opacity-20 filter saturate-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a080e] via-[#0a080e]/90 to-[#0a080e]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/12 via-transparent to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[10px] uppercase tracking-[0.2em] font-bold font-mono mb-3 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <Compass size={13} className="text-amber-400" />
              <span>{t.specs.badge}</span>
            </div>
            <h2 className={`${isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-5xl'} font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-200 mb-3`}>
              {t.specs.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              {t.specs.subtitle}
            </p>
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-1 sm:grid-cols-2 gap-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
            
            {/* Destino */}
            <div className="bg-neutral-900/80 backdrop-blur-xl p-6 rounded-3xl border border-amber-500/30 hover:border-amber-400/70 transition-all duration-300 group shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:-translate-y-1">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/35 flex items-center justify-center text-amber-300 shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400/80 font-mono font-bold">
                    {currentLang === 'en' ? 'Main Destination' : currentLang === 'pt' ? 'Destino Principal' : currentLang === 'fr' ? 'Destination Principale' : currentLang === 'it' ? 'Destinazione Principale' : 'Destino Principal'}
                  </p>
                  <h3 className="font-serif font-bold text-neutral-100 text-base">{translateText(data.destination || 'Cusco & Machu Picchu', currentLang)}</h3>
                </div>
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed pl-1">
                {currentLang === 'en' ? 'Direct preferred access and private door-to-door transfers.' : currentLang === 'pt' ? 'Rotas com acessos preferenciais e traslados privativos porta a porta.' : currentLang === 'fr' ? 'Itinéraires avec accès prioritaires et transferts privés porte-à-porte.' : currentLang === 'it' ? 'Itinerari con accessi preferenziali e trasferimenti privati porta a porta.' : 'Rutas con accesos directos preferenciales y traslados privados de puerta a puerta.'}
              </p>
            </div>

            {/* Altitud Máxima */}
            <div className="bg-neutral-900/80 backdrop-blur-xl p-6 rounded-3xl border border-amber-500/30 hover:border-amber-400/70 transition-all duration-300 group shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:-translate-y-1">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/35 flex items-center justify-center text-amber-300 shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                  <Mountain size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400/80 font-mono font-bold">{t.specs.altitudeLabel}</p>
                  <h3 className="font-serif font-bold text-neutral-100 text-base">{translateText(data.altitude || '3,400 msnm', currentLang)}</h3>
                </div>
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed pl-1 flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>{currentLang === 'en' ? 'Permanent medical-grade oxygen in vehicle and along the route.' : currentLang === 'pt' ? 'Oxigênio medicinal permanente no veículo e durante o trajeto.' : currentLang === 'fr' ? 'Oxygène médical permanent dans le véhicule et sur l’itinéraire.' : currentLang === 'it' ? 'Ossigeno medico permanente nel veicolo e lungo il percorso.' : 'Oxígeno medicinal presurizado permanente en vehículo y ruta.'}</span>
              </p>
            </div>

            {/* Dificultad & Ritmo */}
            <div className="bg-neutral-900/80 backdrop-blur-xl p-6 rounded-3xl border border-amber-500/30 hover:border-amber-400/70 transition-all duration-300 group shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:-translate-y-1">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/35 flex items-center justify-center text-amber-300 shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400/80 font-mono font-bold">
                    {currentLang === 'en' ? 'Pace & Level' : currentLang === 'pt' ? 'Nível & Ritmo' : currentLang === 'fr' ? 'Niveau & Rythme' : currentLang === 'it' ? 'Livello & Ritmo' : 'Nivel & Ritmo'}
                  </p>
                  <h3 className="font-serif font-bold text-neutral-100 text-base">{translateText(data.difficulty || 'Confortable / Moderada', currentLang)}</h3>
                </div>
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed pl-1">
                {currentLang === 'en' ? 'Unrushed pace. The schedule adjusts to your group’s comfort.' : currentLang === 'pt' ? 'Sem pressa. O ritmo é ajustado ao conforto dos participantes.' : currentLang === 'fr' ? 'Sans aucune hâte. Le rythme s’adapte à la condition de vos proches.' : currentLang === 'it' ? 'Senza fretta. Il programma si sincronizza con il passo dei partecipanti.' : 'Cero apuros. El cronograma se sincroniza con el ritmo físico de tus acompañantes.'}
              </p>
            </div>

            {/* Formato de Grupo */}
            <div className="bg-neutral-900/80 backdrop-blur-xl p-6 rounded-3xl border border-amber-500/30 hover:border-amber-400/70 transition-all duration-300 group shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:-translate-y-1">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/35 flex items-center justify-center text-amber-300 shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400/80 font-mono font-bold">{t.specs.groupLabel}</p>
                  <h3 className="font-serif font-bold text-neutral-100 text-base">{translateText(data.groupType || '100% Privado Exclusivo', currentLang)}</h3>
                </div>
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed pl-1">
                {currentLang === 'en' ? 'Vehicle, driver, and guide assigned exclusively to your group.' : currentLang === 'pt' ? 'Veículo, motorista e guia dedicados apenas à sua família.' : currentLang === 'fr' ? 'Véhicule, chauffeur et guide dédiés uniquement à vos proches.' : currentLang === 'it' ? 'Veicolo, autista e guida dedicati esclusivamente al vostro gruppo.' : 'Vehículo, chofer y guía asignados únicamente para ti y tus seres queridos.'}
              </p>
            </div>

            {/* Audiencia */}
            <div className="bg-neutral-900/80 backdrop-blur-xl p-6 rounded-3xl border border-amber-500/30 hover:border-amber-400/70 transition-all duration-300 group shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:-translate-y-1">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/35 flex items-center justify-center text-amber-300 shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                  <HeartHandshake size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400/80 font-mono font-bold">{t.specs.audienceLabel}</p>
                  <h3 className="font-serif font-bold text-neutral-100 text-base">{translateText(data.targetAudience || 'Familias & Parejas VIP', currentLang)}</h3>
                </div>
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed pl-1">
                {currentLang === 'en' ? 'Ideal for seniors and families with continuous personalized care.' : currentLang === 'pt' ? 'Ideal para idosos e famílias com assistência personalizada contínua.' : currentLang === 'fr' ? 'Idéal pour aînés et familles avec assistance continue personnalisée.' : currentLang === 'it' ? 'Ideale per anziani e famiglie con assistenza personalizzata continua.' : 'Apto para adultos mayores y niños gracias a la asistencia continua personalizada.'}
              </p>
            </div>

            {/* Idiomas */}
            <div className="bg-neutral-900/80 backdrop-blur-xl p-6 rounded-3xl border border-amber-500/30 hover:border-amber-400/70 transition-all duration-300 group shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:-translate-y-1">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/35 flex items-center justify-center text-amber-300 shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                  <Languages size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400/80 font-mono font-bold">{t.concierge.languagesLabel}</p>
                  <h3 className="font-serif font-bold text-neutral-100 text-base">{translateText(data.guideLanguages || 'Español, English & Français', currentLang)}</h3>
                </div>
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed pl-1">
                {currentLang === 'en' ? 'Fluent, precise, and culturally immersive historical storytelling.' : currentLang === 'pt' ? 'Narração histórica fluida, precisa e culturalmente profunda no seu idioma nativo.' : currentLang === 'fr' ? 'Récit historique fluide, précis et culturellement immersif.' : currentLang === 'it' ? 'Narrazione storica fluida, accurata e culturalmente approfondita.' : 'Narración histórica fluida, precisa y culturalmente profunda en tu lengua nativa.'}
              </p>
            </div>

          </div>
        </div>
      </section>
      )}

      {/* 9. ABOUT SECTION - ART GALLERY PASSEPARTOUT PRESENTATION */}
      {!isFree && (
        <section id="itinerario" className={`${isMobile ? 'py-12 px-4' : 'py-20 px-8'} max-w-6xl mx-auto relative z-10`}>
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'md:grid-cols-2 gap-16'} items-center`}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] uppercase tracking-[0.2em] font-bold font-mono">
                <Gem size={12} className="text-amber-400" />
                <span>
                  {currentLang === 'en' ? 'Total Exclusivity & Privacy' : currentLang === 'pt' ? 'Exclusividade & Privacidade Total' : currentLang === 'fr' ? 'Exclusivité & Intimité Totale' : currentLang === 'it' ? 'Esclusività & Privacy Totale' : 'Exclusividad & Privacidad Total'}
                </span>
              </div>
              <h2 className={`${isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl md:text-5xl'} font-serif font-bold text-neutral-100 leading-tight`}>
                {data.about?.title ? translateText(data.about.title, currentLang) : t.hero.defaultTitle}
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                {data.about?.content ? translateText(data.about.content, currentLang) : t.hero.defaultSubtitle}
              </p>

              {/* Concierge Direct Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-neutral-900/90 to-neutral-950 border border-amber-500/25 flex items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-sm shrink-0">
                    <PhoneCall size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-amber-400 uppercase tracking-widest font-mono font-bold">{t.concierge.directLine}</p>
                    <p className="font-bold text-sm text-neutral-100">{data.whatsapp || '+51 984 123 456'}</p>
                  </div>
                </div>
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <MessageCircle size={14} />
                  <span>{currentLang === 'en' ? 'Contact' : currentLang === 'pt' ? 'Contatar' : currentLang === 'fr' ? 'Contacter' : currentLang === 'it' ? 'Contatta' : 'Contactar'}</span>
                </a>
              </div>
            </div>

            {/* Passepartout Luxury Frame */}
            <div className="relative p-2 rounded-3xl bg-gradient-to-tr from-amber-500/30 via-neutral-800/80 to-amber-500/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden">
                <Image 
                  src={gallery1} 
                  alt="Machu Picchu Luxury Experience" 
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-amber-500/30 text-xs text-neutral-300 shadow-xl">
                  <span className="font-serif font-bold text-amber-300 block mb-0.5">
                    {currentLang === 'en' ? 'Exclusive Preferred Access' : currentLang === 'pt' ? 'Acesso Preferencial Exclusivo' : currentLang === 'fr' ? 'Accès Privilégié Exclusif' : currentLang === 'it' ? 'Accesso Preferenziale Esclusivo' : 'Acceso Preferencial Exclusivo'}
                  </span>
                  <span>
                    {currentLang === 'en' ? 'Uncrowded, customized to your family pace with direct transfers.' : currentLang === 'pt' ? 'Sem multidões, desenhado no ritmo da sua família com traslados diretos.' : currentLang === 'fr' ? 'Sans foules, adapté au rythme de votre famille avec transferts directs.' : currentLang === 'it' ? 'Senza folle, su misura per la tua famiglia con trasferimenti diretti.' : 'Sin multitudes, diseñado al ritmo de tu grupo familiar con traslados directos.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 10. SERVICIOS & AMENIDADES DE ALTA GAMA INCLUIDOS (BÁSICO, PRO, ADVANCE) */}
      {!isFree && (
        <section id="amenidades" className={`relative ${isMobile ? 'py-14 px-4' : 'py-24 px-8'} overflow-hidden border-y border-amber-500/20`}>
        {/* Background Image with Deep Luxury Fade */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Andean Experience Background"
            fill
            sizes="100vw"
            className="object-cover opacity-18 filter saturate-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a080e] via-[#0a080e]/92 to-[#0a080e]" />
          <div className="absolute -top-32 right-1/4 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[10px] uppercase tracking-[0.2em] font-bold font-mono mb-3 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <Sparkles size={13} className="text-amber-400" />
              <span>{t.amenities.badge}</span>
            </div>
            <h2 className={`${isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-5xl'} font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-200 mb-3`}>
              {t.amenities.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              {t.amenities.subtitle}
            </p>
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-2 gap-5'}`}>
            {servicesList.map((srv, idx) => (
              <div 
                key={idx} 
                className="bg-neutral-900/80 backdrop-blur-xl hover:bg-neutral-900 border border-neutral-800 hover:border-amber-400/50 p-5 sm:p-6 rounded-2xl transition-all duration-300 flex items-start gap-4 shadow-xl group hover:-translate-y-0.5"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400/25 via-amber-500/15 to-transparent border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(245,158,11,0.25)]">
                  <Check size={18} className="text-amber-400 font-black" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <p className="text-neutral-100 text-xs sm:text-sm font-medium leading-relaxed">
                    {translateText(srv, currentLang)}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="text-[10px] text-amber-300/80 uppercase tracking-widest font-mono font-bold">
                      {currentLang === 'en' ? '100% Coordinated & Guaranteed Service' : currentLang === 'pt' ? 'Serviço 100% Coordenado & Garantido' : currentLang === 'fr' ? 'Service 100% Coordonné & Garanti' : currentLang === 'it' ? 'Servizio 100% Coordinato & Garantito' : 'Servicio 100% Coordinado & Garantizado'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* SECTION: CATÁLOGO DE TOURS & EXPEDICIONES VIP */}
      <section id="tours" className={`relative ${isMobile ? 'py-14 px-4' : 'py-24 px-8'} max-w-6xl mx-auto z-10`}>
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[10px] uppercase tracking-[0.2em] font-bold font-mono mb-3 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Crown size={13} className="text-amber-400" />
            <span>{currentLang === 'en' ? 'Private Collection' : currentLang === 'pt' ? 'Coleção Privativa' : currentLang === 'fr' ? 'Collection Privée' : currentLang === 'it' ? 'Collezione Privata' : 'Colección Privada'}</span>
          </div>
          <h2 className={`${isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-5xl'} font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-200 mb-3`}>
            {t.nav.tours || 'Nuestros Tours VIP'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
            {currentLang === 'en' 
              ? 'Handcrafted private journeys designed for discerning travelers seeking privacy, elevated comfort, and seamless service.'
              : currentLang === 'pt'
              ? 'Roteiros privativos sob medida pensados para viajantes exigentes que priorizam privacidade, conforto superior e tranquilidade absoluta.'
              : currentLang === 'fr'
              ? 'Voyages privés sur mesure conçus pour les voyageurs exigeants en quête d’intimité, de grand confort et d’un service sans faille.'
              : currentLang === 'it'
              ? 'Viaggi privati su misura per viaggiatori esigenti che cercano privacy, comfort elevato e totale serenità.'
              : 'Expediciones privadas diseñadas a medida para viajeros que priorizan privacidad, confort de alta gama y atención personalizada.'}
          </p>
        </div>

        <div className={`grid gap-6 sm:gap-8 ${
          isMobile 
            ? 'grid-cols-1 max-w-sm mx-auto' 
            : (isFree || isBasic)
            ? 'grid-cols-1 md:grid-cols-3' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {secondaryCatalogTours.map((tour) => {
            const tourTitle = translateText(tour.title, currentLang);
            const tourLoc = translateText(tour.location, currentLang);
            const tourCategory = translateText(tour.category, currentLang);
            const tourTag = translateText(tour.tag, currentLang);
            return (
              <div
                key={tour.id}
                className="bg-neutral-900/80 backdrop-blur-xl rounded-3xl border border-amber-500/25 hover:border-amber-400/60 p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between group shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden bg-neutral-950 mb-4">
                    <Image
                      src={tour.image}
                      alt={tourTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />

                    <div className="absolute top-3 left-3 bg-neutral-950/85 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-mono font-bold text-amber-300 flex items-center gap-1 border border-amber-500/30">
                      <Star size={11} className="text-amber-400 fill-amber-400" />
                      <span>{tour.rating || 4.9}</span>
                    </div>

                    {tourTag && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider shadow-sm max-w-[130px] truncate" title={tourTag}>
                        {tourTag}
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-200">
                      <span className="flex items-center gap-1 bg-neutral-950/70 backdrop-blur-xs px-2 py-0.5 rounded-md text-[11px] font-mono">
                        <Clock size={11} className="text-amber-400" /> {translateText(tour.duration, currentLang)}
                      </span>
                      <span className="bg-amber-400/20 border border-amber-400/40 text-amber-300 px-2 py-0.5 rounded-md text-[11px] font-mono font-bold">
                        {tour.price}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-widest text-amber-400/80 font-mono font-bold">
                      <MapPin size={11} />
                      <span>{tourLoc}</span>
                      <span className="text-amber-400/30">•</span>
                      <span>{tourCategory}</span>
                    </div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-100 group-hover:text-amber-200 transition-colors line-clamp-2">
                      {tourTitle}
                    </h3>
                  </div>
                </div>

                <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono block">
                      {currentLang === 'en' ? 'Private Rate' : currentLang === 'pt' ? 'Tarifa VIP' : currentLang === 'fr' ? 'Tarif Privé' : currentLang === 'it' ? 'Tariffa VIP' : 'Tarifa VIP'}
                    </span>
                    <span className="font-serif text-lg font-bold text-amber-300">
                      {tour.price}
                    </span>
                  </div>

                  {isQuote ? (
                    <button
                      type="button"
                      onClick={() => setIsQuoteOpen(true)}
                      className="bg-amber-500 hover:bg-amber-400 text-neutral-950 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer font-sans"
                    >
                      <FileText size={13} />
                      <span>{t.cta.quote || 'Cotizar'}</span>
                    </button>
                  ) : (
                    <a
                      href={getTourWaUrl(tour.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer font-sans"
                    >
                      <MessageCircle size={13} />
                      <span>{currentLang === 'en' ? 'Inquire' : 'Consultar'}</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. PERFIL DEL GUÍA CONCIERGE OFICIAL CON AMBIENTE DE PALACIO (PRO & ADVANCE) */}
      {(isPro || isAdvance) && (
        <section id="guia-concierge" className={`relative ${isMobile ? 'py-16 px-4' : 'py-32 md:py-36 px-6 sm:px-10 lg:px-12'} overflow-hidden border-b border-neutral-900`}>
        {/* Background Image de la sección */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop"
            alt="Cusco Colonial Estate Background"
            fill
            sizes="100vw"
            className="object-cover opacity-35 filter contrast-110 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a080e]/90 via-[#0a080e]/70 to-[#0a080e]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        </div>

        <div className="max-w-6xl xl:max-w-7xl mx-auto relative z-10">
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/40 shadow-[0_30px_80px_rgba(0,0,0,0.9)] p-8 sm:p-14 lg:p-16 xl:p-20 group bg-neutral-950/70 backdrop-blur-xl">
            
            {/* Soft Background Image dentro de la tarjeta */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2000&auto=format&fit=crop"
                alt="Andean Luxury Concierge Background"
                fill
                sizes="(max-width: 1280px) 100vw, 1400px"
                className="object-cover object-center opacity-30 filter brightness-90 saturate-110 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-neutral-950/90" />
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-transparent to-neutral-950/70" />
              <div className="absolute inset-0 bg-amber-500/[0.04]" />
            </div>

            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className={`relative z-10 grid ${isMobile ? 'grid-cols-1 gap-8' : 'md:grid-cols-12 gap-10 lg:gap-14 xl:gap-16'} items-center`}>
              
              {/* Guide Avatar & Badges */}
              <div className={`${isMobile ? 'mx-auto' : 'md:col-span-5'} flex flex-col items-center text-center`}>
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full p-2 bg-gradient-to-tr from-amber-400 via-amber-500/80 to-amber-300 shadow-[0_0_50px_rgba(245,158,11,0.45)] mb-5 group/avatar">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-neutral-950 bg-neutral-900">
                    <Image 
                      src={guideAvatarImg} 
                      alt={data.guideName || 'Guía Oficial Concierge'} 
                      fill 
                      sizes="300px" 
                      className="object-cover object-top transition-transform duration-700 group-hover/avatar:scale-105"
                    />
                  </div>
                  <div className="absolute bottom-1 right-2 sm:bottom-2 sm:right-3 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-neutral-950 border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow-xl">
                    <Award size={22} className="text-amber-400" />
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-mono font-bold shadow-md">
                  <Crown size={13} className="text-amber-400 shrink-0" />
                  <span>
                    {currentLang === 'en' ? 'Official DIRCETUR Accreditation' : currentLang === 'pt' ? 'Credencial Oficial DIRCETUR' : currentLang === 'fr' ? 'Accréditation Officielle DIRCETUR' : currentLang === 'it' ? 'Accreditamento Ufficiale DIRCETUR' : 'Acreditación Oficial DIRCETUR'}
                  </span>
                </div>
              </div>

              {/* Guide Bio & Message */}
              <div className={`${isMobile ? 'text-center' : 'md:col-span-7 text-left'} space-y-5 lg:space-y-6`}>
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[11px] uppercase tracking-[0.22em] font-bold font-mono mb-2">
                    <Sparkles size={12} className="text-amber-400" />
                    <span>{t.concierge.hostLabel}</span>
                  </div>
                  <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl lg:text-5xl'} font-serif font-bold text-white tracking-tight leading-tight`}>
                    {data.guideName || 'Carlos Mendoza'}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-300/90 font-medium mt-1.5 flex items-center gap-2 justify-center md:justify-start">
                    <ShieldCheck size={16} className="text-amber-400 shrink-0" />
                    <span>{data.guideCert ? translateText(data.guideCert, currentLang) : t.concierge.credentials}</span>
                  </p>
                </div>

                <blockquote className="text-neutral-200 text-xs sm:text-sm lg:text-base font-light italic leading-relaxed border-l-4 border-amber-400 pl-5 py-2.5 bg-amber-500/[0.05] rounded-r-2xl shadow-inner">
                  {currentLang === 'en' 
                    ? '“My commitment is to open the doors of Andean living history with maximum comfort, discretion, and elegance for you and your family. Every step adapts to your well-being.”'
                    : currentLang === 'pt'
                    ? '“Meu compromisso é abrir as portas da história viva dos Andes com o máximo de conforto, discrição e elegância para você e sua família. Cada passo se adapta ao seu bem-estar.”'
                    : currentLang === 'fr'
                    ? '« Mon engagement est d’ouvrir les portes de l’histoire vivante des Andes avec le plus grand confort, discrétion et élégance pour vous et votre famille. Chaque étape s’adapte à votre bien-être. »'
                    : currentLang === 'it'
                    ? '“Il mio impegno è aprire le porte della storia andina vivente con il massimo comfort, discrezione ed eleganza per te e la tua famiglia. Ogni passo si adatta al vostro benessere.”'
                    : '“Mi compromiso es abrir las puertas de la historia viva de los Andes con la máxima comodidad, discreción y elegancia para ti y tu familia. Cada paso se adapta a tu bienestar.”'}
                </blockquote>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div className="bg-neutral-950/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-neutral-800/90 hover:border-amber-500/40 transition-all shadow-md group/card">
                    <div className="flex items-center gap-2 text-amber-400 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
                      <Languages size={15} />
                      <span>{t.concierge.languagesLabel}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-neutral-100">{translateText(data.guideLanguages || t.concierge.languagesValue, currentLang)}</p>
                  </div>
                  <div className="bg-neutral-950/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-neutral-800/90 hover:border-amber-500/40 transition-all shadow-md group/card">
                    <div className="flex items-center gap-2 text-amber-400 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
                      <Clock size={15} />
                      <span>{currentLang === 'en' ? 'Experience' : currentLang === 'pt' ? 'Experiência' : currentLang === 'fr' ? 'Expérience' : currentLang === 'it' ? 'Esperienza' : 'Experiencia'}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-neutral-100">
                      {currentLang === 'en' ? '+12 Years in Luxury Tours' : currentLang === 'pt' ? '+12 Anos em Roteiros de Luxo' : currentLang === 'fr' ? '+12 Ans en Circuits de Luxe' : currentLang === 'it' ? '+12 Anni in Tour di Lusso' : '+12 Años en Rutas de Lujo'}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-neutral-950 px-8 py-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider shadow-2xl shadow-amber-400/25 hover:scale-105 transition-all cursor-pointer"
                  >
                    <MessageCircle size={18} />
                    <span>{t.concierge.consultNow}</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      )}

      {/* 12. ITINERARIO TIMELINE CON FONDO DE CORDILLERA (PRO & ADVANCE) */}
      {(isPro || isAdvance) && data.itinerary && data.itinerary.length > 0 && (
        <section id="itinerario-timeline" className={`relative ${isMobile ? 'py-14 px-4' : 'py-24 px-8'} overflow-hidden border-y border-amber-500/20`}>
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop"
              alt="Cusco Inca Route Background"
              fill
              sizes="100vw"
              className="object-cover opacity-15 filter saturate-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a080e] via-[#0a080e]/92 to-[#0a080e]" />
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-[0.25em] block mb-2 font-mono">
                {currentLang === 'en' ? 'Luxury Schedule' : currentLang === 'pt' ? 'Cronograma de Luxo' : currentLang === 'fr' ? 'Programme de Luxe' : currentLang === 'it' ? 'Programma di Lusso' : 'Cronograma de Lujo'}
              </span>
              <h2 className={`${isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-5xl'} font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-200`}>
                {currentLang === 'en' ? 'Exclusive Itinerary' : currentLang === 'pt' ? 'Itinerário Exclusivo' : currentLang === 'fr' ? 'Itinéraire Exclusif' : currentLang === 'it' ? 'Itinerario Esclusivo' : 'Itinerario Exclusivo'}
              </h2>
            </div>

            <div className="space-y-6 sm:space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-5 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-amber-500/40 before:to-amber-600/10">
              {data.itinerary.map((item, idx) => (
                <div key={idx} className="relative flex items-start gap-4 sm:gap-7 pl-1 sm:pl-2 group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 text-neutral-950 font-black flex items-center justify-center text-xs sm:text-sm shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.5)] ring-4 ring-[#0a080e] z-10 group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>
                  <div className="bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 backdrop-blur-md border border-neutral-800/90 group-hover:border-amber-500/40 rounded-3xl p-5 sm:p-7 w-full shadow-xl transition-all">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-amber-300 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-md inline-block mb-2.5 font-mono">
                      {translateText(item.step, currentLang)}
                    </span>
                    <h3 className="font-serif font-bold text-neutral-100 text-base sm:text-xl mb-2">{translateText(item.title, currentLang)}</h3>
                    <p className="text-neutral-300 font-light text-xs sm:text-sm leading-relaxed">{translateText(item.desc, currentLang)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 13. PRIVILEGIOS & FEATURES (Numbered Gold Membership Cards) */}
      {!isFree && (
        <section id="privilegios" className={`${isMobile ? 'py-12 px-4' : 'py-20 px-8'} max-w-6xl mx-auto relative z-10`}>
          <div className={`text-center ${isMobile ? 'mb-8' : 'mb-14'}`}>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-[0.25em] block mb-2 font-mono">
              {currentLang === 'en' ? 'Presidential Standards' : currentLang === 'pt' ? 'Padrões Presidenciais' : currentLang === 'fr' ? 'Standards Présidentiels' : currentLang === 'it' ? 'Standard Presidenziali' : 'Estándares Presidenciales'}
            </span>
            <h2 className={`${isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-5xl'} font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-200`}>
              {data.features?.title ? translateText(data.features.title, currentLang) : (currentLang === 'en' ? 'Experience Privileges' : currentLang === 'pt' ? 'Privilégios da Experiência' : currentLang === 'fr' ? 'Privilèges de l’Expérience' : currentLang === 'it' ? 'Privilegi dell’Esperienza' : 'Privilegios de la Experiencia')}
            </h2>
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'md:grid-cols-2 gap-8'}`}>
            {data.features?.items?.map((item, idx) => {
              const [title, desc] = item.split(':');
              return (
                <div 
                  key={idx} 
                  className={`bg-gradient-to-b from-neutral-900/90 to-neutral-950 ${isMobile ? 'p-5' : 'p-8'} rounded-3xl border border-neutral-800/90 hover:border-amber-500/40 transition-all group relative overflow-hidden shadow-xl`}
                >
                  <span className="absolute top-4 right-6 font-serif font-bold text-2xl sm:text-3xl text-amber-500/15 select-none pointer-events-none group-hover:text-amber-500/30 transition-colors">
                    0{idx + 1}
                  </span>

                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-sm group-hover:scale-105 transition-transform">
                      <Sparkles size={18} />
                    </div>
                    <h3 className={`${isMobile ? 'text-base sm:text-lg' : 'text-xl'} font-serif font-bold text-neutral-100`}>
                      {translateText(title, currentLang)}
                    </h3>
                  </div>

                  <p className="text-neutral-300 font-light text-xs sm:text-sm leading-relaxed pl-0 sm:pl-13">
                    {desc ? translateText(desc, currentLang) : (currentLang === 'en' ? 'Premium care focused on utmost comfort.' : currentLang === 'pt' ? 'Atendimento premium focado no máximo conforto.' : currentLang === 'fr' ? 'Prise en charge d’exception axée sur un confort absolu.' : currentLang === 'it' ? 'Cura premium orientata al massimo comfort.' : 'Atención premium orientada a la máxima comodidad.')}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 14. COMPROMISO DE EXCELENCIA & GARANTÍAS (PRO & ADVANCE) */}
      {(isPro || isAdvance) && (
        <section id="garantias" className={`relative ${isMobile ? 'py-14 px-4' : 'py-24 px-8'} overflow-hidden border-y border-neutral-900`}>
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2000&auto=format&fit=crop"
            alt="Andean Night Sky Background"
            fill
            sizes="100vw"
            className="object-cover opacity-20 filter saturate-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a080e] via-[#0a080e]/90 to-[#0a080e]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[10px] uppercase tracking-[0.2em] font-bold font-mono mb-3 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <ShieldCheck size={13} className="text-amber-400" />
              <span>
                {currentLang === 'en' ? 'Guaranteed Peace of Mind' : currentLang === 'pt' ? 'Tranquilidade Garantida' : currentLang === 'fr' ? 'Sérénité Garantie' : currentLang === 'it' ? 'Tranquillità Garantita' : 'Tranquilidad Garantizada'}
              </span>
            </div>
            <h2 className={`${isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'} font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-200 mb-3`}>
              {currentLang === 'en' ? 'Cusco Luxury Commitment to Excellence' : currentLang === 'pt' ? 'Compromisso de Excelência Cusco Luxury' : currentLang === 'fr' ? 'Engagement d’Excellence Cusco Luxury' : currentLang === 'it' ? 'Impegno di Eccellenza Cusco Luxury' : 'Compromiso de Excelencia Cusco Luxury'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              {currentLang === 'en' ? 'Transparent policies and official backing so you can book with total peace of mind.' : currentLang === 'pt' ? 'Políticas transparentes e respaldo oficial para que você reserve com absoluta serenidade.' : currentLang === 'fr' ? 'Politiques transparentes et garanties officielles pour réserver en toute sérénité.' : currentLang === 'it' ? 'Politiche trasparenti e garanzie ufficiali per prenotare con totale serenità.' : 'Políticas transparentes y respaldo legal diseñados para que reserves con absoluta serenidad.'}
            </p>
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-1 sm:grid-cols-2 gap-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'}`}>
            
            <div className="bg-neutral-900/85 backdrop-blur-xl p-6 rounded-3xl border border-neutral-800 hover:border-amber-400/50 transition-all duration-300 shadow-xl hover:-translate-y-1">
              <div className="w-11 h-11 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-4 shadow-sm">
                <Calendar size={20} />
              </div>
              <h3 className="font-serif font-bold text-neutral-100 text-sm sm:text-base mb-1.5">
                {currentLang === 'en' ? 'Weather Flexibility' : currentLang === 'pt' ? 'Flexibilidade Climática' : currentLang === 'fr' ? 'Flexibilité Météo' : currentLang === 'it' ? 'Flessibilità Meteo' : 'Flexibilidad por Clima'}
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                {currentLang === 'en' ? 'If severe mountain weather prevents optimal enjoyment, reschedule with zero agency penalty.' : currentLang === 'pt' ? 'Se condições climáticas severas impedirem o aproveitamento ideal, reagende sem multa da agência.' : currentLang === 'fr' ? 'Si la météo en montagne empêche une visite optimale, reprogrammez sans pénalité d’agence.' : currentLang === 'it' ? 'Se il maltempo in quota impedisce l’esperienza ottimale, riprogrammazione senza penali.' : 'Si las condiciones meteorológicas en montaña impiden el goce óptimo, reprogramación sin penalidad de agencia.'}
              </p>
            </div>

            <div className="bg-neutral-900/85 backdrop-blur-xl p-6 rounded-3xl border border-neutral-800 hover:border-amber-400/50 transition-all duration-300 shadow-xl hover:-translate-y-1">
              <div className="w-11 h-11 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-4 shadow-sm">
                <ShieldAlert size={20} />
              </div>
              <h3 className="font-serif font-bold text-neutral-100 text-sm sm:text-base mb-1.5">
                {currentLang === 'en' ? 'Oxygen Protocol' : currentLang === 'pt' ? 'Protocolo de Oxigênio' : currentLang === 'fr' ? 'Protocole d’Oxygène' : currentLang === 'it' ? 'Protocollo di Ossigeno' : 'Protocolo de Oxígeno'}
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                {currentLang === 'en' ? 'Medical-grade oxygen tank and pulse oximeter monitoring throughout the journey for safe acclimatization.' : currentLang === 'pt' ? 'Balão de oxigênio de grau médico e monitoramento de oximetria durante todo o trajeto para aclimatação segura.' : currentLang === 'fr' ? 'Bouteille d’oxygène médical et oxymètre de pouls durant tout le trajet pour une acclimatation en toute sécurité.' : currentLang === 'it' ? 'Bombola di ossigeno medicale e saturimetro per tutto il tragitto per un’acclimatazione sicura.' : 'Balón de oxígeno de grado médico presurizado y monitoreo de pulso en todo el trayecto para aclimatación segura.'}
              </p>
            </div>

            <div className="bg-neutral-900/85 backdrop-blur-xl p-6 rounded-3xl border border-neutral-800 hover:border-amber-400/50 transition-all duration-300 shadow-xl hover:-translate-y-1">
              <div className="w-11 h-11 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-4 shadow-sm">
                <Gem size={20} />
              </div>
              <h3 className="font-serif font-bold text-neutral-100 text-sm sm:text-base mb-1.5">
                {currentLang === 'en' ? 'Total Transparency' : currentLang === 'pt' ? 'Transparência Total' : currentLang === 'fr' ? 'Transparence Totale' : currentLang === 'it' ? 'Trasparenza Totale' : 'Transparencia Total'}
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                {currentLang === 'en' ? 'Net rates with no hidden fees, no mandatory commercial stops, and no forced shopping.' : currentLang === 'pt' ? 'Tarifas líquidas sem taxas ocultas, sem paradas comerciais obrigatórias nem compras forçadas.' : currentLang === 'fr' ? 'Tarifs clairs sans frais cachés, sans arrêts commerciaux obligatoires ni achats forcés.' : currentLang === 'it' ? 'Tariffe nette senza costi nascosti, senza soste commerciali obbligate né acquisti forzati.' : 'Tarifas netas sin cargos ocultos, sin paradas comerciales obligatorias ni compras forzadas.'}
              </p>
            </div>

            <div className="bg-neutral-900/85 backdrop-blur-xl p-6 rounded-3xl border border-neutral-800 hover:border-amber-400/50 transition-all duration-300 shadow-xl hover:-translate-y-1">
              <div className="w-11 h-11 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-4 shadow-sm">
                <Award size={20} />
              </div>
              <h3 className="font-serif font-bold text-neutral-100 text-sm sm:text-base mb-1.5">
                {currentLang === 'en' ? 'Registered Operator' : currentLang === 'pt' ? 'Operador Registrado' : currentLang === 'fr' ? 'Opérateur Agréé' : currentLang === 'it' ? 'Operatore Registrato' : 'Operador Registrado'}
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                {currentLang === 'en' ? 'Official DIRCETUR tourism license and Safe Travels stamp issued by WTTC.' : currentLang === 'pt' ? 'Licença oficial de turismo DIRCETUR e selo Safe Travels emitido pelo WTTC.' : currentLang === 'fr' ? 'Licence officielle de tourisme DIRCETUR et label Safe Travels délivré par le WTTC.' : currentLang === 'it' ? 'Licenza ufficiale di turismo DIRCETUR e marchio Safe Travels rilasciato dal WTTC.' : 'Licencia oficial de turismo DIRCETUR y sello Safe Travels emitido por el Consejo Mundial del Viaje (WTTC).'}
              </p>
            </div>

          </div>
        </div>
      </section>
      )}

      {/* 15. LOGISTICS: EXCLUSIONES & EQUIPAJE VIP (PRO & ADVANCE) */}
      {(isPro || isAdvance) && ((data.notIncluded && data.notIncluded.length > 0) || (data.whatToBring && data.whatToBring.length > 0)) && (
        <section className={`${isMobile ? 'py-10 px-4' : 'py-20 px-8'} bg-[#0a080e] border-b border-neutral-900 relative z-10`}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Qué NO incluye */}
            {data.notIncluded && data.notIncluded.length > 0 && (
              <div className="bg-neutral-900/80 p-6 sm:p-7 rounded-3xl border border-rose-500/20 shadow-xl">
                <div className="flex items-center gap-2.5 text-rose-300 font-bold text-sm sm:text-base mb-4 font-serif">
                  <XCircle size={20} className="text-rose-400 shrink-0" />
                  <h3>
                    {currentLang === 'en' ? 'Not Included in Rate' : currentLang === 'pt' ? 'Não Incluído na Tarifa' : currentLang === 'fr' ? 'Non Inclus dans le Tarif' : currentLang === 'it' ? 'Non Incluso nella Tariffa' : 'No Incluido en Tarifa'}
                  </h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 font-light">
                  {data.notIncluded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-rose-400 font-bold shrink-0">✕</span>
                      <span>{translateText(item, currentLang)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Qué llevar */}
            {data.whatToBring && data.whatToBring.length > 0 && (
              <div className="bg-neutral-900/80 p-6 sm:p-7 rounded-3xl border border-amber-500/25 shadow-xl">
                <div className="flex items-center gap-2.5 text-amber-300 font-bold text-sm sm:text-base mb-4 font-serif">
                  <Backpack size={20} className="text-amber-400 shrink-0" />
                  <h3>
                    {currentLang === 'en' ? 'Luggage Recommendations' : currentLang === 'pt' ? 'Recomendações de Bagagem' : currentLang === 'fr' ? 'Recommandations de Bagages' : currentLang === 'it' ? 'Consigli per il Bagaglio' : 'Recomendaciones de Equipaje'}
                  </h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 font-light">
                  {data.whatToBring.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-amber-400 font-bold shrink-0">✓</span>
                      <span>{translateText(item, currentLang)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 16. PINTEREST PINBOARD GALLERY */}
      {!isFree && (
        <div id="galeria">
          <PinterestPinboard
            images={data.galleryImages}
            destination={translateText(data.destination || 'Cusco VIP', currentLang)}
            tourName={translateText(data.name || data.hero?.title || 'Experiencia Premium', currentLang)}
            tier={tier}
            theme="premium"
            isMobile={isMobile}
            lang={currentLang}
          />
        </div>
      )}

      {/* 17. TESTIMONIOS Y COMENTARIOS EXCLUSIVOS (ADVANCE ONLY) */}
      {isAdvance && (
        <section id="testimonios-vip" className={`${isMobile ? 'py-12 px-4' : 'py-20 px-8'} bg-[#0a080e] border-b border-neutral-900 relative z-10`}>
          <div className="max-w-5xl mx-auto text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-400 block mb-2 font-semibold font-mono">
              {t.reviews.badge}
            </span>
            <h2 className={`${isMobile ? 'text-2xl mb-4' : 'text-3xl sm:text-4xl mb-6'} font-serif font-bold text-white`}>
              {t.reviews.title}
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto mb-10 sm:mb-12 font-light">
              {t.reviews.subtitle}
            </p>

            <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'}`}>
              {getLuxuryTestimonials().map((tItem, idx) => (
                <div key={idx} className={`bg-gradient-to-b from-neutral-900/95 to-neutral-950/90 ${isMobile ? 'p-5' : 'p-7'} rounded-3xl border border-amber-500/25 text-left shadow-xl relative flex flex-col justify-between hover:border-amber-400/50 transition-all duration-300`}>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-1 text-amber-400">
                        {[...Array(tItem.rating || 5)].map((_, i) => (
                          <Star key={i} size={15} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
                        {'badge' in tItem && tItem.badge ? (tItem as any).badge : t.reviews.verifiedGuest}
                      </span>
                    </div>
                    <p className="text-neutral-300 text-xs sm:text-sm font-light italic mb-4 leading-relaxed">&quot;{tItem.comment}&quot;</p>
                  </div>
                  <div className="border-t border-neutral-800/80 pt-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-amber-300 text-xs sm:text-sm">{tItem.name}</h4>
                      <p className="text-[11px] text-neutral-400 font-mono">{tItem.origin}</p>
                    </div>
                    <span className="text-[10px] text-emerald-400/90 font-medium flex items-center gap-1">
                      ✓ {t.reviews.confirmedTour}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 18. SALÓN VIP & PUNTO DE ENCUENTRO EN CUSCO (ADVANCE ONLY) */}
      {isAdvance && (
        <section id="lounge-vip" className={`relative ${isMobile ? 'py-16 px-4' : 'py-32 md:py-36 px-6 sm:px-10 lg:px-12'} overflow-hidden border-b border-neutral-900`}>
        {/* Background Image de toda la sección */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop"
            alt="Luxury Cusco Hotel Patio Background"
            fill
            sizes="100vw"
            className="object-cover opacity-45 filter saturate-100 brightness-85"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a080e]/85 via-[#0a080e]/60 to-[#0a080e]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        </div>

        <div className="max-w-6xl xl:max-w-7xl mx-auto relative z-10">
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/40 shadow-[0_30px_80px_rgba(0,0,0,0.9)] p-8 sm:p-14 lg:p-16 xl:p-20 group bg-neutral-950/60 backdrop-blur-md">
            {/* Soft Luxury Lounge Background Image */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2000&auto=format&fit=crop"
                alt="Lounge Concierge en Cusco"
                fill
                sizes="(max-width: 1280px) 100vw, 1400px"
                className="object-cover object-center opacity-65 filter brightness-95 saturate-110 transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Soft Luxury Overlays for high readability and warmth without choking the image */}
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/60 to-neutral-950/75" />
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-transparent to-neutral-950/70" />
              <div className="absolute inset-0 bg-amber-500/[0.04]" />
            </div>

            <div className={`relative z-10 grid ${isMobile ? 'grid-cols-1 gap-8' : 'md:grid-cols-12 gap-10 lg:gap-14 xl:gap-16'} items-center`}>
              
              <div className={`${isMobile ? 'text-center' : 'md:col-span-7 text-left'} space-y-5 lg:space-y-6`}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[11px] uppercase tracking-[0.22em] font-bold font-mono">
                  <MapPin size={13} className="text-amber-400" />
                  <span>{t.lounge.badge}</span>
                </div>
                <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl lg:text-5xl'} font-serif font-bold text-white tracking-tight leading-tight`}>
                  {t.lounge.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-200/90 font-light leading-relaxed max-w-2xl">
                  {t.lounge.subtitle}
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <MapPin size={18} className="text-amber-400 shrink-0" />
                    <span className="font-medium">{data.officeAddress || 'Portal de Carnicerías 236, Plaza de Armas, Cusco, Perú'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <Clock size={18} className="text-amber-400 shrink-0" />
                    <span className="font-medium">{data.officeHours || 'Lunes a Domingo: 07:00 – 21:00 hrs'}</span>
                  </div>
                </div>

                <div className="pt-3">
                  <a
                    href={data.mapsUrl || 'https://maps.google.com/?q=Plaza+de+Armas+Cusco'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold px-7 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all hover:scale-102 cursor-pointer shadow-lg shadow-amber-400/20"
                  >
                    <ExternalLink size={16} />
                    <span>
                      {currentLang === 'en' ? 'Open Location in Google Maps' : currentLang === 'pt' ? 'Abrir Localização no Google Maps' : currentLang === 'fr' ? 'Ouvrir la Position sur Google Maps' : currentLang === 'it' ? 'Apri Posizione su Google Maps' : 'Abrir Ubicación en Google Maps'}
                    </span>
                  </a>
                </div>
              </div>

              {/* Lounge Amenities Grid */}
              <div className={`${isMobile ? 'mt-3' : 'md:col-span-5'} grid grid-cols-2 gap-4 lg:gap-5`}>
                <div className="bg-neutral-950/80 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-neutral-800/90 hover:border-amber-500/40 transition-all text-center space-y-2 shadow-lg group/item">
                  <Coffee size={28} className="text-amber-400 mx-auto transition-transform group-hover/item:scale-110" />
                  <p className="text-xs sm:text-sm font-bold text-neutral-100">{t.lounge.amenity1.title}</p>
                  <p className="text-[11px] sm:text-xs text-neutral-300 font-light">{t.lounge.amenity1.desc}</p>
                </div>

                <div className="bg-neutral-950/80 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-neutral-800/90 hover:border-amber-500/40 transition-all text-center space-y-2 shadow-lg group/item">
                  <Wifi size={28} className="text-amber-400 mx-auto transition-transform group-hover/item:scale-110" />
                  <p className="text-xs sm:text-sm font-bold text-neutral-100">{t.lounge.amenity2.title}</p>
                  <p className="text-[11px] sm:text-xs text-neutral-300 font-light">{t.lounge.amenity2.desc}</p>
                </div>

                <div className="bg-neutral-950/80 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-neutral-800/90 hover:border-amber-500/40 transition-all text-center space-y-2 shadow-lg group/item">
                  <Backpack size={28} className="text-amber-400 mx-auto transition-transform group-hover/item:scale-110" />
                  <p className="text-xs sm:text-sm font-bold text-neutral-100">{t.lounge.amenity3.title}</p>
                  <p className="text-[11px] sm:text-xs text-neutral-300 font-light">{t.lounge.amenity3.desc}</p>
                </div>

                <div className="bg-neutral-950/80 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-neutral-800/90 hover:border-amber-500/40 transition-all text-center space-y-2 shadow-lg group/item">
                  <ShieldCheck size={28} className="text-amber-400 mx-auto transition-transform group-hover/item:scale-110" />
                  <p className="text-xs sm:text-sm font-bold text-neutral-100">{t.lounge.amenity4.title}</p>
                  <p className="text-[11px] sm:text-xs text-neutral-300 font-light">{t.lounge.amenity4.desc}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      )}

      {/* 18.5. COLECCIÓN DE TOURS VIP & EXPERIENCIAS SIGNATURE */}
      <section id="tours" className={`relative ${isMobile ? 'py-16 px-4' : 'py-24 px-8'} overflow-hidden border-t border-amber-500/20 bg-[#0a080e]`}>
        <div className="max-w-6xl mx-auto relative z-10 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[10px] uppercase tracking-[0.2em] font-bold font-mono shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <Crown size={13} className="text-amber-400" />
              <span>{currentLang === 'en' ? 'Signature VIP Collection' : currentLang === 'pt' ? 'Coleção VIP Signature' : currentLang === 'fr' ? 'Collection VIP Signature' : currentLang === 'it' ? 'Collezione VIP Signature' : 'Colección Signature VIP'}</span>
            </div>
            <h2 className={`${isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-5xl'} font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-200`}>
              {currentLang === 'en' ? 'More Private Expeditions in Cusco' : currentLang === 'pt' ? 'Outras Expedições Privadas em Cusco' : currentLang === 'fr' ? 'Autres Expéditions Privées à Cusco' : currentLang === 'it' ? 'Altre Spedizioni Private a Cusco' : 'Otras Experiencias VIP & Rutas Exclusivas'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              {currentLang === 'en' 
                ? 'High-end Andean journeys operated with private vehicles, licensed historian guides, and complete concierge support.' 
                : currentLang === 'pt' 
                ? 'Roteiros andinos de alto padrão operados com transporte exclusivo, guias historiadores credenciados e assistência 24/7.' 
                : currentLang === 'fr' 
                ? 'Voyages andins haut de gamme opérés avec véhicules privés, guides historiens agréés et conciergerie 24/7.' 
                : currentLang === 'it' 
                ? 'Viaggi andini d’eccellenza operati con veicoli privati, guide storiche accreditate e concierge dedicato.' 
                : 'Circuitos andinos de alta gama con vehículos ejecutivos, guías historiadores oficiales y asistencia personalizada de puerta a puerta.'}
            </p>
          </div>

          <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : isFree ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {secondaryCatalogTours.map((tour, idx) => (
              <div
                key={tour.id || idx}
                className="bg-neutral-900/90 rounded-3xl border border-amber-500/30 overflow-hidden shadow-2xl hover:border-amber-400/70 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-neutral-950">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-mono font-bold text-amber-300 border border-amber-400/30 flex items-center gap-1 shadow-lg">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      <span>{tour.badge || '5.0 ★'}</span>
                    </div>

                    {tour.tag && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg">
                        {tour.tag}
                      </div>
                    )}
                  </div>

                  <div className="p-5 sm:p-6 space-y-3 text-left">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {translateText(tour.title, currentLang)}
                    </h3>

                    <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} className="text-amber-400" /> {tour.duration || 'Full Day'}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-amber-400" /> {tour.location || 'Cusco'}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-neutral-800 flex items-baseline justify-between">
                      <span className="text-xs text-neutral-400">Tarifa VIP:</span>
                      <span className="text-xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                        {tour.price}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <a
                    href={getTourWaUrl(tour.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-neutral-950 font-extrabold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 active:scale-98 cursor-pointer"
                  >
                    <MessageCircle size={14} />
                    <span>{currentLang === 'en' ? 'Book VIP Journey' : currentLang === 'pt' ? 'Reservar Experiência VIP' : currentLang === 'fr' ? 'Réserver Voyage VIP' : currentLang === 'it' ? 'Prenota Esperienza VIP' : 'Reservar Experiencia VIP'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 19. TOUR SUPPORT & FAQS (ADVANCE ONLY) */}
      {isAdvance && (
        <TourSupportAndFaqs
          faqs={data.faqs}
          tourName={translateText(data.name || data.hero?.title || 'Experiencia VIP', currentLang)}
          whatsapp={data.whatsapp}
          guideName={data.guideName}
          destination={translateText(data.destination || 'Cusco', currentLang)}
          tier={tier}
          theme="premium"
          isMobile={isMobile}
          lang={currentLang}
        />
      )}

      {/* 20. MAJESTIC FINAL CALL TO ACTION */}
      {!isFree && (
        <section id="contacto" className={`relative ${isMobile ? 'py-16 px-4' : 'py-28 px-8'} text-center overflow-hidden border-t border-amber-500/20`}>
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop"
              alt="Machu Picchu Citadel Sunrise"
              fill
              sizes="100vw"
              className="object-cover opacity-25 filter saturate-75 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a080e] via-[#0a080e]/85 to-black" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/15 blur-[140px] rounded-full pointer-events-none" />
          </div>

          <div className="max-w-3xl mx-auto relative z-10">
            <div className="w-16 h-16 rounded-3xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mx-auto mb-5 shadow-[0_0_35px_rgba(245,158,11,0.35)]">
              <Crown size={32} className="text-amber-400 drop-shadow-[0_2px_10px_rgba(245,158,11,0.6)]" />
            </div>

            <h2 className={`${isMobile ? 'text-2xl mb-3' : 'text-3xl sm:text-5xl mb-5'} font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-300 leading-tight`}>
              {currentLang === 'en' ? 'Ready to experience an unforgettable expedition?' : currentLang === 'pt' ? 'Pronto para viver uma expedição inesquecível?' : currentLang === 'fr' ? 'Prêt à vivre une expédition inoubliable ?' : currentLang === 'it' ? 'Pronto a vivere una spedizione indimenticabile?' : '¿Listo para vivir una expedición inolvidable?'}
            </h2>

            <p className={`${isMobile ? 'text-xs mb-8' : 'text-base sm:text-lg mb-10'} text-neutral-300 font-light max-w-xl mx-auto leading-relaxed`}>
              {currentLang === 'en' 
                ? 'Contact our official concierge right now to reserve preferred access with instant confirmation.' 
                : currentLang === 'pt' 
                ? 'Fale de imediato com o concierge oficial e reserve seus acessos preferenciais com confirmação direta.' 
                : currentLang === 'fr' 
                ? 'Contactez immédiatement le concierge officiel et réservez vos accès prioritaires avec confirmation directe.' 
                : currentLang === 'it' 
                ? 'Contatta subito il concierge ufficiale e riserva i tuoi accessi preferenziali con conferma diretta.' 
                : 'Comunícate de inmediato con el concierge oficial y reserva tus accesos preferentes con confirmación directa y atención VIP.'}
            </p>

            <div className="flex justify-center">
              {isQuote ? (
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className={`inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-neutral-950 font-extrabold ${isMobile ? 'w-full py-4 text-sm' : 'px-10 py-4.5 text-base'} rounded-full shadow-[0_10px_35px_rgba(245,158,11,0.4)] transition-all hover:scale-105 cursor-pointer`}
                >
                  <FileText size={19} />
                  <span>{t.cta.quote}</span>
                </button>
              ) : (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold ${isMobile ? 'w-full py-4 text-sm' : 'px-10 py-4.5 text-base'} rounded-full shadow-[0_10px_35px_rgba(16,185,129,0.35)] transition-all hover:scale-105 cursor-pointer`}
                >
                  <MessageCircle size={19} />
                  <span>
                    {currentLang === 'en' ? `Chat on WhatsApp with ${data.guideName || 'the Guide'}` : currentLang === 'pt' ? `Falar por WhatsApp com ${data.guideName || 'o Guia'}` : currentLang === 'fr' ? `Parler sur WhatsApp avec ${data.guideName || 'le Guide'}` : currentLang === 'it' ? `Parla su WhatsApp con ${data.guideName || 'la Guida'}` : `Hablar por WhatsApp con ${data.guideName || 'el Guía'}`}
                  </span>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 21. FOOTER VIP DE ALTA AUTORIDAD & REGULATORIO */}
      <footer id="contacto" className="pt-12 pb-24 sm:pb-12 border-t border-neutral-900 relative z-10 bg-[#0a080e] px-4 sm:px-8 text-neutral-400 text-xs">
        
        {/* Glow ambient effects */}
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          
          {/* Main 4-Column VIP Directory */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-left">
            
            {/* Col 1: VIP Brand & Licensing (4 cols) */}
            <div className="lg:col-span-4 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/20 to-neutral-900 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
                  <Crown size={20} />
                </div>
                <div>
                  <span className="font-serif font-black text-white text-base tracking-wide block">
                    Cusco Creativos VIP Collection
                  </span>
                  <span className="text-[10px] text-amber-400/90 tracking-widest uppercase font-bold block">
                    {t.hero.privateConciergeBadge}
                  </span>
                </div>
              </div>

              <p className="text-neutral-400 text-xs leading-relaxed">
                {t.footer.brandDesc}
              </p>

              {/* Official Accreditations */}
              <div className="space-y-1.5 pt-1 text-[11px]">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <ShieldCheck size={14} className="shrink-0" />
                  <span>{t.footer.dirceturCert}</span>
                </div>
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Award size={14} className="shrink-0" />
                  <span>{t.footer.safeTravels}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <Building2 size={14} className="text-neutral-600 shrink-0" />
                  <span className="text-[10px] font-mono text-neutral-400">RUC: 20608945123 • Inversiones Turísticas Cusco S.A.C.</span>
                </div>
              </div>
            </div>

            {/* Col 2: Exclusive Collections (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-serif text-white font-bold text-xs uppercase tracking-wider">
                {currentLang === 'en' ? 'Private Collections' : currentLang === 'pt' ? 'Coleções Privativas' : currentLang === 'fr' ? 'Collections Privées' : currentLang === 'it' ? 'Collezioni Private' : 'Colecciones Privadas'}
              </h4>
              <ul className="space-y-2 text-neutral-400 text-xs">
                <li>
                  <a href="#experiencias" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                    <span className="text-amber-500">›</span>
                    <span>Machu Picchu Signature & Hiram Bingham</span>
                  </a>
                </li>
                <li>
                  <a href="#experiencias" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                    <span className="text-amber-500">›</span>
                    <span>Valle Sagrado & Almuerzo Gourmet</span>
                  </a>
                </li>
                <li>
                  <a href="#experiencias" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                    <span className="text-amber-500">›</span>
                    <span>Montaña 7 Colores en Van Executive</span>
                  </a>
                </li>
                <li>
                  <a href="#amenities" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                    <span className="text-amber-500">›</span>
                    <span>{t.amenities.badge}</span>
                  </a>
                </li>
                <li>
                  <a href="#lounge" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                    <span className="text-amber-500">›</span>
                    <span>{t.lounge.badge}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Legal & Regulatory INDECOPI (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-serif text-white font-bold text-xs uppercase tracking-wider">
                {currentLang === 'en' ? 'Legal Framework' : currentLang === 'pt' ? 'Marco Legal' : currentLang === 'fr' ? 'Cadre Légal' : currentLang === 'it' ? 'Normativa Legale' : 'Marco Legal'}
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => setIsComplaintsOpen(true)}
                    className="text-left group flex items-start gap-1.5 text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
                  >
                    <BookOpen size={14} className="shrink-0 mt-0.5 text-amber-500" />
                    <div>
                      <span>{t.footer.complaintsBook}</span>
                      <span className="text-[9px] block text-neutral-500 font-sans font-normal">Ley N° 29571 INDECOPI</span>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => { setLegalTab('terms'); setIsLegalOpen(true); }}
                    className="text-neutral-400 hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {t.footer.terms}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => { setLegalTab('cancellation'); setIsLegalOpen(true); }}
                    className="text-neutral-400 hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {t.footer.cancellation}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => { setLegalTab('privacy'); setIsLegalOpen(true); }}
                    className="text-neutral-400 hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {t.footer.privacy}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Central Concierge & 24/7 Support (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-serif text-white font-bold text-xs uppercase tracking-wider">
                {t.footer.officeTitle}
              </h4>
              <div className="space-y-2 text-neutral-300 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-amber-500 shrink-0 mt-0.5" />
                  <span>{data.officeAddress || t.footer.officeDesc}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-emerald-400 shrink-0" />
                  <span>{data.officeHours || t.footer.hoursDesc}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-amber-400 shrink-0" />
                  <a href={`tel:${cleanPhone}`} className="hover:text-amber-400 transition-colors font-bold font-mono">
                    {data.whatsapp || '+51 984 123 456'}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-neutral-400 shrink-0" />
                  <span className="text-neutral-400">concierge@cuscocreativos.com</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright, Payments & SSL */}
          <div className="pt-6 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <p className="text-center md:text-left">{t.footer.rights}</p>

            <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-bold tracking-wider text-neutral-400 bg-neutral-950 px-3.5 py-1.5 rounded-full border border-neutral-800">
              <span className="text-neutral-500">💳 {t.footer.paymentsTitle}:</span>
              <span>AMEX VIP</span>
              <span>•</span>
              <span>VISA INFINITE</span>
              <span>•</span>
              <span>MASTERCARD BLACK</span>
              <span>•</span>
              <span>PAYPAL</span>
            </div>

            <div className="flex items-center gap-2 text-neutral-400 text-[10px]">
              <Lock size={12} className="text-emerald-500" />
              <span>{t.footer.sanctuaryProtected}</span>
            </div>
          </div>

          {/* Banner de Plan Gratuito */}
          {isFree && (
            <div className="bg-neutral-900 text-stone-300 py-3 px-4 text-center text-xs font-semibold border border-neutral-800 rounded-xl max-w-xl mx-auto">
              <p>⚡ Creado con Cusco Creativos Web — Generador Rápido de Landings Turísticas</p>
            </div>
          )}

        </div>
      </footer>

      {/* Quote Modal */}
      <QuoteModal 
        isOpen={isQuoteOpen} 
        onClose={() => {
          setIsQuoteOpen(false);
          setSelectedTourForQuote(null);
        }} 
        landing={{
          ...data,
          name: selectedTourForQuote || data.name
        }} 
      />

      {/* Modal Libro de Reclamaciones */}
      <ComplaintsBookModal
        isOpen={isComplaintsOpen}
        onClose={() => setIsComplaintsOpen(false)}
        lang={currentLang}
        agencyName="Cusco Creativos VIP Collection • Inversiones Turísticas Cusco S.A.C."
        agencyAddress={data.officeAddress || t.footer.officeDesc}
      />

      {/* Modal Términos y Normativa Legal */}
      <LegalTermsModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        lang={currentLang}
        initialTab={legalTab}
        agencyName="Cusco Creativos VIP Collection • Inversiones Turísticas Cusco S.A.C."
      />
    </div>
  );
}
