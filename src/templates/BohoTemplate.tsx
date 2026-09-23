'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Camera, 
  Compass, 
  Users, 
  CheckCircle2, 
  MessageCircle, 
  MapPin, 
  Star, 
  FileText, 
  ShieldCheck, 
  XCircle, 
  Backpack, 
  Sparkles,
  Heart,
  Bookmark,
  ExternalLink,
  Navigation,
  Clock,
  Mountain,
  Sun,
  Award,
  ThumbsUp,
  Filter,
  Check
} from 'lucide-react';
import { LandingData } from '@/types/landing';
import QuoteModal from '@/components/common/QuoteModal';
import TourSupportAndFaqs from '@/components/common/TourSupportAndFaqs';
import PinterestPinboard from '@/components/common/PinterestPinboard';

interface TemplateProps {
  data: LandingData;
  isLive?: boolean;
  viewMode?: 'desktop' | 'tablet' | 'mobile';
}

// Curated other top tours for Cusco / Boho collection
interface CuratedTour {
  id: string;
  title: string;
  category: 'lagunas' | 'valle' | 'trek';
  categoryLabel: string;
  badge: string;
  altitude: string;
  duration: string;
  difficulty: string;
  price: string;
  image: string;
  description: string;
  highlights: string[];
}

const CURATED_TOURS: CuratedTour[] = [
  {
    id: 'humantay',
    title: 'Laguna Humantay & Domos de Soraypampa',
    category: 'lagunas',
    categoryLabel: 'Lagunas & Glaciares',
    badge: 'Más Fotogénico',
    altitude: '4,200 msnm',
    duration: 'Full Day (4:30 AM - 5:30 PM)',
    difficulty: 'Moderada',
    price: 'S/ 160',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200&auto=format&fit=crop',
    description: 'Espejo turquesa andino alimentado por los glaciares sagrados de Humantay y Salkantay con desayuno campestre en domos.',
    highlights: ['Desayuno en domos geodésicos', 'Bastones de trekking incluidos', 'Sesión de fotos en hora dorada']
  },
  {
    id: 'vinicunca',
    title: 'Montaña 7 Colores (Vinicunca) & Mirador Valle Rojo',
    category: 'lagunas',
    categoryLabel: 'Lagunas & Glaciares',
    badge: 'Amanecer Sin Multitudes',
    altitude: '5,036 msnm',
    duration: 'Full Day (4:00 AM - 5:00 PM)',
    difficulty: 'Exigente',
    price: 'S/ 175',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200&auto=format&fit=crop',
    description: 'Ruta planificada para llegar antes de las multitudes masivas, apreciando la franja mineralizada en su máximo esplendor de luz.',
    highlights: ['Llegada anticipada a la cumbre', 'Té de coca caliente al llegar', 'Acceso al mirador del Valle Rojo']
  },
  {
    id: 'valle-sagrado',
    title: 'Valle Sagrado VIP: Maras, Moray & Ollantaytambo',
    category: 'valle',
    categoryLabel: 'Valles & Cultura',
    badge: 'Aclimatación Ideal',
    altitude: '2,870 - 3,500 msnm',
    duration: 'Full Day (7:30 AM - 6:30 PM)',
    difficulty: 'Suave / Cultural',
    price: 'S/ 140',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1200&auto=format&fit=crop',
    description: 'Pozas de sal blanca en Maras, laboratorios agrícolas concéntricos incas en Moray y la fortaleza viva de Ollantaytambo.',
    highlights: ['Degustación de sal rosada gourmet', 'Almuerzo buffet campestre en Urubamba', 'Tiempo libre para compras de artesanía']
  },
  {
    id: 'ausangate',
    title: 'Ausangate & Circuito de las 7 Lagunas de Pacchanta',
    category: 'trek',
    categoryLabel: 'Trek Andino',
    badge: 'Joyas Ocultas',
    altitude: '4,600 msnm',
    duration: 'Full Day (4:30 AM - 6:30 PM)',
    difficulty: 'Moderada',
    price: 'S/ 190',
    image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=1200&auto=format&fit=crop',
    description: 'Siete lagunas de tonalidades esmeralda, turquesa y azul profundo a los pies del imponente nevado Ausangate y termales medicinales.',
    highlights: ['Baños termales de Pacchanta incluidos', 'Avistamiento de alpacas y vizcachas', 'Almuerzo tradicional andino']
  },
  {
    id: 'salkantay-express',
    title: 'Salkantay Express & Sky Domes Glamping',
    category: 'trek',
    categoryLabel: 'Trek Andino',
    badge: 'Glamping Premium',
    altitude: '4,630 a 1,900 msnm',
    duration: '2 Días / 1 Noche',
    difficulty: 'Moderada-Alta',
    price: 'S/ 480',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    description: 'Cielo estrellado andino desde un domo con techo transparente, paso de montaña Salkantay y descenso al bosque nublado con cafetales.',
    highlights: ['Noche en Sky Dome con vista estelar', 'Paso de montaña Salkantay (4,630m)', 'Tueste artesanal de café orgánico']
  }
];

// Rich verified community reviews
interface ReviewItem {
  id: string;
  name: string;
  origin: string;
  date: string;
  category: 'fotografia' | 'parejas' | 'solo' | 'trek';
  categoryLabel: string;
  rating: number;
  comment: string;
  avatarColor: string;
  verifiedBadge: string;
}

const COMMUNITY_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Valeria & Mateo',
    origin: 'Santiago, Chile',
    date: 'Septiembre 2026',
    category: 'parejas',
    categoryLabel: 'En Pareja',
    rating: 5,
    comment: 'La estética del tour y el ritmo pausado fue perfecto para nosotros que amamos la fotografía. El guía nos recomendó los mejores ángulos con la luz de la mañana sin apuros de agencias masivas.',
    avatarColor: 'bg-[#C86D51]',
    verifiedBadge: 'Viaje en Pareja Verificado'
  },
  {
    id: 'rev-2',
    name: 'Camila & Sophie',
    origin: 'Lyon, Francia',
    date: 'Agosto 2026',
    category: 'fotografia',
    categoryLabel: 'Fotografía',
    rating: 5,
    comment: 'Un voyage magique ! Desayuno riquísimo en los domos de montaña y bastones de trekking incluidos que nos salvaron la subida. La vista de la laguna parece pintada a mano.',
    avatarColor: 'bg-[#588157]',
    verifiedBadge: 'Viajeras Verificadas'
  },
  {
    id: 'rev-3',
    name: 'Diego Arismendi',
    origin: 'Lima, Perú',
    date: 'Septiembre 2026',
    category: 'fotografia',
    categoryLabel: 'Fotografía',
    rating: 5,
    comment: 'Lejos el mejor tour que tomé en Cusco. Cero apuros, grupo muy ameno de solo 8 personas y las fotos quedaron como portada de revista de viajes. La atención del guía fue de 10.',
    avatarColor: 'bg-stone-700',
    verifiedBadge: 'Fotógrafo Verificado'
  },
  {
    id: 'rev-4',
    name: 'Elena Rostova',
    origin: 'Madrid, España',
    date: 'Agosto 2026',
    category: 'solo',
    categoryLabel: 'Solo Traveler',
    rating: 5,
    comment: 'Viajé completamente sola a Cusco y este tour fue un acierto total. El grupo fue súper cálido, el guía me ayudó con fotos hermosas en cada mirador y siempre estuvo atento a mi oxigenación.',
    avatarColor: 'bg-[#936639]',
    verifiedBadge: 'Solo Traveler Verificada'
  },
  {
    id: 'rev-5',
    name: 'Lucas & Martina',
    origin: 'Buenos Aires, Argentina',
    date: 'Julio 2026',
    category: 'trek',
    categoryLabel: 'Trek Andino',
    rating: 5,
    comment: 'El desayuno caliente frente a los nevados nos devolvió el alma antes de emprender la caminata. Caminamos a nuestro ritmo sin que nadie nos presionara. Una experiencia inolvidable.',
    avatarColor: 'bg-[#C86D51]',
    verifiedBadge: 'Aventureros Verificados'
  },
  {
    id: 'rev-6',
    name: 'Carlos Mendoza',
    origin: 'Arequipa, Perú',
    date: 'Septiembre 2026',
    category: 'trek',
    categoryLabel: 'Trek Andino',
    rating: 5,
    comment: 'Organización impecable desde el primer mensaje por WhatsApp. Movilidad turística moderna, chofer muy prudente en las curvas de montaña y comida deliciosa. Repetiría sin dudarlo.',
    avatarColor: 'bg-[#588157]',
    verifiedBadge: 'Viajero Local Verificado'
  }
];

export default function BohoTemplate({ data, viewMode = 'desktop' }: TemplateProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedTourCategory, setSelectedTourCategory] = useState<string>('all');
  const [selectedReviewCategory, setSelectedReviewCategory] = useState<string>('all');

  const isQuote = data.objective === 'quote';
  const isMobile = viewMode === 'mobile';
  const tier = data.tier || 'advance';
  const isFree = tier === 'free';
  const isBasic = tier === 'basic';
  const isPro = tier === 'pro';
  const isAdvance = tier === 'advance';

  const cleanPhone = (data.whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(`Hola ${data.guideName || 'Cusco Creativos'}, vi su bitácora de viaje de "${data.name || data.hero?.title}" y me gustaría consultar disponibilidad.`);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  const heroImg = data.heroImage || 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop';
  const gallery = data.galleryImages && data.galleryImages.length > 0 
    ? data.galleryImages 
    : [
        'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop'
      ];

  // Filtering curated tours
  const visibleTours = React.useMemo(() => {
    let list = CURATED_TOURS;
    if (selectedTourCategory !== 'all') {
      list = list.filter(t => t.category === selectedTourCategory);
    }
    if (isBasic) return list.slice(0, 2);
    if (isPro) return list.slice(0, 3);
    return list; // advance shows all
  }, [selectedTourCategory, isBasic, isPro]);

  // Filtering reviews
  const visibleReviews = React.useMemo(() => {
    let list = COMMUNITY_REVIEWS;
    if (selectedReviewCategory !== 'all') {
      list = list.filter(r => r.category === selectedReviewCategory);
    }
    if (isBasic) return list.slice(0, 2);
    if (isPro) return list.slice(0, 4);
    return list; // advance shows all 6
  }, [selectedReviewCategory, isBasic, isPro]);

  // Destination / Map Location URL
  const destinationQuery = data.destination ? `${data.destination}, Cusco, Peru` : 'Laguna Humantay, Cusco, Peru';
  const mapIframeUrl = `https://maps.google.com/maps?q=${encodeURIComponent(destinationQuery)}&t=&z=12&ie=UTF8&iwloc=&output=embed`;
  const googleMapsExternalUrl = data.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destinationQuery)}`;

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans text-stone-800 selection:bg-[#C86D51] selection:text-white">
      {/* Editorial Header / Navigation */}
      <header className="sticky top-0 w-full z-40 bg-[#FAF7F2]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex justify-between items-center border-b border-stone-200/80 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#C86D51]/15 text-[#C86D51] flex items-center justify-center font-serif text-sm font-bold shadow-xs">
            <Camera size={16} />
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-widest uppercase text-xs sm:text-sm font-bold text-stone-800">
              Boho Travel Journal
            </span>
            <span className="text-[10px] text-stone-500 font-sans tracking-tight">
              Inspirado en Pinterest • Cusco, Perú
            </span>
          </div>
        </div>

        {/* Navigation Links based on active plan */}
        {!isMobile && !isFree && (
          <nav className="hidden lg:flex items-center gap-5 text-xs tracking-wider uppercase font-medium text-stone-600">
            <a href="#sobre-tour" className="hover:text-[#C86D51] transition-colors">Sobre el Tour</a>
            <a href="#galeria" className="hover:text-[#C86D51] transition-colors">{isBasic ? 'Postales' : 'Pines & Fotos'}</a>
            
            {(isPro || isAdvance) && (
              <a href="#itinerario" className="hover:text-[#C86D51] transition-colors">Bitácora</a>
            )}

            <a href="#tours" className="hover:text-[#C86D51] transition-colors">Mejores Tours</a>

            {(isPro || isAdvance) && (
              <a href="#mapa" className="hover:text-[#C86D51] transition-colors">Mapa</a>
            )}

            <a href="#resenas" className="hover:text-[#C86D51] transition-colors">Reseñas</a>

            {(isPro || isAdvance) && (
              <a href="#guia-campo" className="hover:text-[#C86D51] transition-colors">Guía de Campo</a>
            )}

            <a href="#soporte-faq" className="hover:text-[#C86D51] transition-colors">
              {isBasic ? 'Consultas' : 'Soporte & FAQ'}
            </a>
          </nav>
        )}

        {/* Action Button */}
        <div className="flex items-center gap-2">
          {data.objective === 'both' ? (
            <>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#588157] hover:bg-[#476846] text-white px-3 sm:px-4 py-2 rounded-full font-medium text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="bg-[#C86D51] hover:bg-[#b05d43] text-white px-3 sm:px-4 py-2 rounded-full font-medium text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <FileText size={14} />
                <span>Cotizar</span>
              </button>
            </>
          ) : isQuote ? (
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="bg-[#C86D51] hover:bg-[#b05d43] text-white px-4 py-2 rounded-full font-medium text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <FileText size={14} />
              <span>Pedir Cotización</span>
            </button>
          ) : (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#588157] hover:bg-[#476846] text-white px-4 py-2 rounded-full font-medium text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <MessageCircle size={14} />
              <span>WhatsApp Directo</span>
            </a>
          )}
        </div>
      </header>

      {/* Hero Section: Editorial Cover with Pinterest Moodboard vibe */}
      <section className="relative px-4 sm:px-8 pt-8 pb-12 sm:pb-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="md:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C86D51]/10 text-[#C86D51] text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={13} />
              <span>
                {data.hero?.badge || (
                  isFree ? 'Edición Travel Journal • Acceso Rápido' :
                  isBasic ? 'Edición Travel Journal • Ficha Esencial' :
                  isPro ? 'Edición Travel Journal • Guía & Itinerario' :
                  'Edición Travel Journal • Pinterest Style'
                )}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-stone-900 leading-[1.15] tracking-tight">
              {data.hero?.title || data.name}
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
              {data.hero?.subtitle || 'Una experiencia curada para viajeros que aprecian los detalles, la fotografía y la autenticidad de los Andes peruanos.'}
            </p>

            {/* Quick Stats Tags */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs flex items-center gap-1.5 shadow-2xs">
                <Compass size={14} className="text-[#C86D51]" />
                {data.duration || 'Full Day'}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs flex items-center gap-1.5 shadow-2xs">
                <MapPin size={14} className="text-[#588157]" />
                {data.destination || 'Cusco & Valle Sagrado'}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs flex items-center gap-1.5 shadow-2xs">
                <Users size={14} className="text-stone-500" />
                {data.groupType || 'Grupos Reducidos'}
              </span>
            </div>

            {/* Price & Primary CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <div className="bg-white px-5 py-3 rounded-2xl border border-stone-200/90 shadow-2xs">
                <span className="text-[11px] text-stone-500 block uppercase tracking-wider font-semibold">Inversión</span>
                <span className="text-2xl font-serif font-bold text-stone-900">{data.price || 'S/ 180'}</span>
                <span className="text-xs text-stone-500 ml-1">/ viajero</span>
              </div>

              {data.objective === 'both' ? (
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#588157] hover:bg-[#476846] text-white px-5 sm:px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <MessageCircle size={17} />
                    <span>Reservar por WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setIsQuoteOpen(true)}
                    className="bg-[#C86D51] hover:bg-[#b05d43] text-white px-5 sm:px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <FileText size={17} />
                    <span>Cotizar Experiencia</span>
                  </button>
                </div>
              ) : isQuote ? (
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="bg-[#C86D51] hover:bg-[#b05d43] text-white px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <FileText size={17} />
                  <span>{data.hero?.cta || 'Cotizar Experiencia'}</span>
                </button>
              ) : (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#588157] hover:bg-[#476846] text-white px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle size={17} />
                  <span>{data.hero?.cta || 'Reservar por WhatsApp'}</span>
                </a>
              )}
            </div>

            {/* Micro Reassurance Banner */}
            <p className="text-xs text-stone-500 flex items-center gap-2 pt-1 font-serif italic">
              <CheckCircle2 size={13} className="text-[#588157] shrink-0" />
              <span>Respuesta inmediata en minutos • Coordinación directa con el guía colegiado</span>
            </p>
          </div>

          {/* Right Hero: Pinterest Polaroid Collage */}
          <div className="md:col-span-5 relative flex justify-center">
            {/* Background Decorative Polaroid (Pro & Advance) */}
            {!isFree && (
              <div className="absolute -top-3 -right-2 w-48 sm:w-56 bg-white p-2.5 pb-6 rounded-2xl shadow-md transform rotate-6 border border-stone-200/60 hidden sm:block opacity-80">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-stone-100">
                  <Image
                    src={gallery[1] || heroImg}
                    alt="Vista previa andina"
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 text-[10px] text-stone-500 font-serif italic text-center">
                  Senderos de montaña
                </p>
              </div>
            )}

            {/* Main Featured Polaroid Card */}
            <div className="relative z-10 w-64 sm:w-72 bg-white p-3 pb-7 rounded-2xl shadow-xl border border-stone-200 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              {/* Washi tape */}
              <div className="w-16 h-3 bg-[#E8DEC8]/90 absolute -top-1.5 left-1/2 -translate-x-1/2 rotate-1 shadow-2xs" />
              
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-100">
                <Image
                  src={heroImg}
                  alt={data.name}
                  fill
                  priority
                  sizes="320px"
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs p-1.5 rounded-full text-rose-500 shadow-2xs">
                  <Heart size={14} fill="currentColor" />
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="font-serif italic text-stone-800 text-sm font-medium">
                  &quot;{data.name}&quot;
                </p>
                <p className="text-[10px] font-sans uppercase tracking-widest text-stone-400 mt-1">
                  Guía Oficial: {data.guideName || 'Cusco Creativos'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust Badges Bar (DIRCETUR, Safe Travels) - PRO & ADVANCE ONLY */}
      {!isFree && !isBasic && data.trustBadges && data.trustBadges.length > 0 && (
        <section className="bg-white/80 border-y border-stone-200/80 py-4 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center sm:justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-stone-600 text-xs font-serif italic">
              <ShieldCheck size={18} className="text-[#588157]" />
              <span>Garantía de servicio oficial y seguro en Cusco</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.trustBadges.map((badge, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-medium">
                  <CheckCircle2 size={13} className="text-[#C86D51]" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section - For BASIC, PRO, ADVANCE */}
      {!isFree && (
        <section id="sobre-tour" className="py-12 sm:py-16 px-4 sm:px-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/90 shadow-xs space-y-4 relative overflow-hidden">
            {/* Washi tape decoration */}
            <div className="w-20 h-3.5 bg-[#E8DEC8]/90 absolute -top-1 left-8 rotate-1 shadow-2xs" />
            
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#C86D51] flex items-center gap-1.5">
                <Bookmark size={14} /> Bitácora de Campo • Sobre la Experiencia
              </span>
              <span className="text-[11px] font-mono text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full">
                {data.destination || 'Cusco'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 leading-snug">
              {data.about?.title || 'Una experiencia curada para conectar con el paisaje andino'}
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              {data.about?.content || 'Diseñada para quienes buscan desconectar de las prisas y conectar con la majestuosidad de las montañas andinas. Viajamos en grupos reducidos con paradas estratégicas en los mejores miradores, café orgánico de altura y un guía especializado que te asesorará para capturar fotos inolvidables.'}
            </p>

            {/* Highlights Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-stone-100">
              <div className="flex items-center gap-2.5 text-xs text-stone-700 bg-[#FAF7F2] p-3 rounded-2xl border border-stone-200/70">
                <Camera size={16} className="text-[#C86D51] shrink-0" />
                <div>
                  <strong className="block text-stone-900 font-serif">Horario Dorado</strong>
                  <span className="text-[10px] text-stone-500">Mejor luz fotográfica</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-stone-700 bg-[#FAF7F2] p-3 rounded-2xl border border-stone-200/70">
                <Compass size={16} className="text-[#588157] shrink-0" />
                <div>
                  <strong className="block text-stone-900 font-serif">Ritmo Pausado</strong>
                  <span className="text-[10px] text-stone-500">Sin apuros ni carreras</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-stone-700 bg-[#FAF7F2] p-3 rounded-2xl border border-stone-200/70">
                <ShieldCheck size={16} className="text-amber-600 shrink-0" />
                <div>
                  <strong className="block text-stone-900 font-serif">Aclimatación Segura</strong>
                  <span className="text-[10px] text-stone-500">Oxígeno y botiquín</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section: Pinterest Pinboard Gallery - FOR BASIC, PRO, ADVANCE */}
      {!isFree && (
        <PinterestPinboard
          images={data.galleryImages}
          destination={data.destination || 'Cusco, Perú'}
          tourName={data.name || data.hero?.title || 'Tour Cusco'}
          tier={tier}
          theme="boho-nature"
          isMobile={isMobile}
        />
      )}

      {/* Section: Itinerary (Visual Travel Journal by Day) - PRO & ADVANCE ONLY */}
      {!isFree && !isBasic && (
        <section id="itinerario" className="py-12 sm:py-16 px-4 sm:px-8 bg-[#F3EFEA] border-y border-stone-200">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#588157]">
                Hoja de Ruta Andina
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-stone-900">
                Itinerario Detallado de la Experiencia
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
                Tiempos calculados para disfrutar sin prisa, con paradas fotográficas, café orgánico y explicación cultural.
              </p>
            </div>

            <div className="space-y-4">
              {(data.itinerary && data.itinerary.length > 0 ? data.itinerary : [
                { step: '04:30 AM', title: 'Partida desde el Hotel en Cusco', desc: 'Recojo privado en movilidad turística climatizada con vistas del amanecer en el valle.' },
                { step: '07:30 AM', title: 'Desayuno Campestre Orgánico en Domos', desc: 'Parada en pintoresco poblado andino con panes frescos, café de Quillabamba y frutas.' },
                { step: '09:30 AM', title: 'Comienzo de la Caminata con Guía Fotógrafo', desc: 'Ascenso a ritmo suave con bastones de trekking, pausas de aclimatación y consejos de encuadre.' },
                { step: '12:30 PM', title: 'Llegada, Sesión Fotográfica & Descanso', desc: 'Tiempo libre frente al espejo de agua turquesa, fotos Polaroid y refrigerio andino.' },
                { step: '05:00 PM', title: 'Retorno Tranquilo a la Ciudad del Cusco', desc: 'Regreso cómodo directo a tu alojamiento para relajarte.' }
              ]).map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-[#C86D51]/50 transition-all group"
                >
                  <div className="w-24 shrink-0 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#C86D51]/20 text-center">
                    <span className="font-serif font-bold text-xs text-[#C86D51] block">{item.step}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-serif font-bold text-stone-900 group-hover:text-[#C86D51] transition-colors">{item.title}</h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">{item.desc}</p>
                    {isAdvance && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] text-[#588157] font-serif italic mt-1.5 bg-[#588157]/10 px-2 py-0.5 rounded-md">
                        <Camera size={11} /> Punto fotográfico recomendado
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION: MEJORES TOURS (Otras Bitácoras de la Colección) - FOR BASIC, PRO, ADVANCE */}
      {!isFree && (
        <section id="tours" className="py-14 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto">
          <div className="space-y-8 sm:space-y-10">
            
            {/* Header with Boho mood */}
            <div className="text-center space-y-2.5 max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#C86D51] flex items-center justify-center gap-1.5">
                <Compass size={14} /> Colección Curada en Cusco
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif text-stone-900">
                Nuestros Mejores Tours & Rutas Andinas
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                Explora otras bitácoras de viaje diseñadas con la misma filosofía: grupos pequeños, estética fotográfica y trato humano.
              </p>
            </div>

            {/* Category Filter Tabs (Advance Plan) */}
            {isAdvance && (
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {[
                  { id: 'all', label: 'Todos los Circuitos' },
                  { id: 'lagunas', label: 'Lagunas & Glaciares' },
                  { id: 'valle', label: 'Valles & Salineras' },
                  { id: 'trek', label: 'Trekking & Aventura' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedTourCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-serif font-medium transition-all cursor-pointer ${
                      selectedTourCategory === cat.id
                        ? 'bg-[#C86D51] text-white shadow-xs'
                        : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}

            {/* Tours Grid */}
            <div className={`grid grid-cols-1 ${visibleTours.length > 1 ? 'md:grid-cols-2' : ''} ${isAdvance ? 'lg:grid-cols-3' : ''} gap-6 sm:gap-7`}>
              {visibleTours.map((tour, idx) => {
                const tourWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  `Hola ${data.guideName || 'Cusco Creativos'}, vi en su web el tour de "${tour.title}" y deseo consultar fechas disponibles y precio.`
                )}`;

                return (
                  <div 
                    key={tour.id}
                    className="bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group relative"
                  >
                    {/* Washi tape sticker */}
                    <div className="w-16 h-3 bg-[#E8DEC8]/90 absolute -top-1 left-8 rotate-1 shadow-2xs z-20" />

                    {/* Image Header with Polaroid frame feel */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Floating Badge */}
                      <div className="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-xs px-2.5 py-1 rounded-full border border-stone-200 text-[10px] font-serif font-bold text-[#C86D51] shadow-xs">
                        {tour.badge}
                      </div>
                      {/* Price Pill */}
                      <div className="absolute bottom-3 right-3 bg-stone-900/90 backdrop-blur-xs px-3 py-1 rounded-xl text-white text-xs font-serif font-bold shadow-md">
                        {tour.price} <span className="text-[10px] font-normal text-stone-300">/ pers.</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        {/* Specs Chips */}
                        <div className="flex flex-wrap gap-2 text-[10px] text-stone-500 font-sans">
                          <span className="flex items-center gap-1 bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-stone-200/70">
                            <Clock size={11} className="text-[#C86D51]" />
                            {tour.duration.split(' ')[0]}
                          </span>
                          <span className="flex items-center gap-1 bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-stone-200/70">
                            <Mountain size={11} className="text-[#588157]" />
                            {tour.altitude}
                          </span>
                          <span className="flex items-center gap-1 bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-stone-200/70">
                            <Compass size={11} className="text-stone-400" />
                            {tour.difficulty}
                          </span>
                        </div>

                        <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg group-hover:text-[#C86D51] transition-colors leading-snug">
                          {tour.title}
                        </h3>

                        <p className="text-xs text-stone-600 leading-relaxed font-sans">
                          {tour.description}
                        </p>

                        {/* Highlights list */}
                        <ul className="pt-2 space-y-1 text-[11px] text-stone-600">
                          {tour.highlights.map((h, hIdx) => (
                            <li key={hIdx} className="flex items-center gap-1.5">
                              <Check size={12} className="text-[#588157] shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                        <a
                          href={tourWhatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-[#588157] hover:bg-[#476846] text-white py-2.5 px-3 rounded-xl font-medium text-xs text-center transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                        >
                          <MessageCircle size={14} />
                          <span>Consultar</span>
                        </a>
                        <button
                          onClick={() => setIsQuoteOpen(true)}
                          className="bg-[#FAF7F2] hover:bg-stone-100 border border-stone-200 text-stone-700 py-2.5 px-3.5 rounded-xl font-medium text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <FileText size={14} className="text-[#C86D51]" />
                          <span>Cotizar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note on availability */}
            <div className="text-center pt-2">
              <p className="text-xs text-stone-500 font-serif italic">
                ¿Buscas un circuito combinado o privado? Podemos armar tu bitácora personalizada en Cusco a tu medida.
              </p>
            </div>

          </div>
        </section>
      )}

      {/* SECTION: MAPA DE RUTA & COORDENADAS DE CAMPO - PRO & ADVANCE ONLY */}
      {!isFree && (isPro || isAdvance) && (
        <section id="mapa" className="py-14 sm:py-20 px-4 sm:px-8 bg-[#F3EFEA] border-y border-stone-200">
          <div className="max-w-6xl mx-auto space-y-10">
            
            {/* Header */}
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#588157] flex items-center justify-center gap-1.5">
                <MapPin size={14} /> Coordenadas de Campo & Elevación
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif text-stone-900">
                Mapa de Ruta & Puntos Escénicos
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Conoce el perfil geográfico del recorrido desde el Centro Histórico del Cusco hasta los miradores andinos.
              </p>
            </div>

            {/* Elevation Profile Milestones Bar */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-serif font-bold text-stone-800">
                  <Mountain size={16} className="text-[#C86D51]" />
                  <span>Perfil de Altitud & Escala del Recorrido</span>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-stone-500 font-mono">
                  <span>Punto de partida: 3,400m</span>
                  <span>•</span>
                  <span className="text-[#C86D51] font-bold">Punto más alto: 4,200m</span>
                </div>
              </div>

              {/* Milestones Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                {[
                  {
                    step: '01',
                    name: 'Cusco Histórico',
                    alt: '3,400 msnm',
                    tag: 'Salida 04:30 AM',
                    desc: 'Recojo en tu hotel y travesía panorámica por el valle de Anta.',
                    color: 'text-stone-700'
                  },
                  {
                    step: '02',
                    name: 'Poblado de Mollepata',
                    alt: '2,900 msnm',
                    tag: 'Desayuno 07:30 AM',
                    desc: 'Parada gastronómica con panes de leña, café de altura y frutas.',
                    color: 'text-[#588157]'
                  },
                  {
                    step: '03',
                    name: 'Campamento Soraypampa',
                    alt: '3,900 msnm',
                    tag: 'Inicio Caminata 09:30 AM',
                    desc: 'Zona de domos geodésicos a los pies del imponente Apu Salkantay.',
                    color: 'text-[#C86D51]'
                  },
                  {
                    step: '04',
                    name: 'Laguna Humantay',
                    alt: '4,200 msnm',
                    tag: 'Mirador 12:00 PM',
                    desc: 'Espejo turquesa, fotos Polaroid y tiempo de contemplación pacífica.',
                    color: 'text-[#C86D51]'
                  }
                ].map((pt, i) => (
                  <div key={i} className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200/80 space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-black text-xs text-stone-400">Paso {pt.step}</span>
                      <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded-full border border-stone-200 text-[#588157]">
                        {pt.alt}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-stone-900">{pt.name}</h4>
                    <span className="inline-block text-[10px] uppercase font-bold text-[#C86D51] tracking-wider">
                      {pt.tag}
                    </span>
                    <p className="text-xs text-stone-600 leading-snug">{pt.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Map & Coordinates Card */}
            <div className="grid lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Column: Route Details & Action */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#588157]/10 text-[#588157] text-xs font-serif font-semibold">
                    <Navigation size={13} />
                    <span>Navegación GPS Verificada</span>
                  </div>

                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 leading-tight">
                    Acceso Guiado y Traslado Puerta a Puerta
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                    Nuestras unidades turísticas cuentan con permiso del MTC, SOAT turístico vigente y monitoreo GPS durante todo el trayecto desde el centro de Cusco hasta el inicio del sendero.
                  </p>

                  <div className="space-y-2.5 pt-2 border-t border-stone-100 text-xs text-stone-700">
                    <div className="flex items-start gap-2.5">
                      <MapPin size={15} className="text-[#C86D51] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-stone-900 font-serif">Punto de Recojo:</strong>
                        <span className="text-stone-500 text-[11px]">Tu hotel o Airbnb en el Centro Histórico de Cusco</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Clock size={15} className="text-[#588157] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-stone-900 font-serif">Tiempo de Traslado:</strong>
                        <span className="text-stone-500 text-[11px]">Aprox. 2h 45m de viaje panorámico por tramo</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <ShieldCheck size={15} className="text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-stone-900 font-serif">Seguridad en Ruta:</strong>
                        <span className="text-stone-500 text-[11px]">Choferes profesionales habituados a rutas de montaña</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2 space-y-2">
                  <a
                    href={googleMapsExternalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-stone-900 hover:bg-black text-white py-3 px-4 rounded-2xl text-xs font-serif font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <ExternalLink size={14} className="text-[#C86D51]" />
                    <span>Abrir Ruta en Google Maps GPS</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#FAF7F2] hover:bg-stone-100 border border-stone-300 text-stone-800 py-2.5 px-4 rounded-2xl text-xs font-serif font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageCircle size={14} className="text-[#588157]" />
                    <span>Confirmar si mi hotel tiene recojo</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Google Maps Live Preview Frame */}
              <div className="lg:col-span-7 bg-white p-3 sm:p-4 rounded-3xl border border-stone-200 shadow-md flex flex-col relative overflow-hidden group">
                {/* Washi tape */}
                <div className="w-20 h-3 bg-[#E8DEC8]/90 absolute -top-1 left-1/2 -translate-x-1/2 rotate-1 shadow-2xs z-20" />
                
                <div className="relative w-full h-[340px] sm:h-[400px] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/80">
                  <iframe
                    title="Ubicación y Ruta en Google Maps"
                    src={mapIframeUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  {/* Floating Pill */}
                  <div className="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-xs px-3 py-1.5 rounded-full border border-stone-300 text-stone-800 text-[11px] font-serif font-semibold shadow-xs flex items-center gap-1.5 pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-[#588157] animate-pulse" />
                    <span>Destino: {data.destination || 'Cusco & Laguna Humantay'}</span>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-500 font-sans px-2">
                  <span>Coordenadas de referencia en los Andes peruanos</span>
                  <a 
                    href={googleMapsExternalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#C86D51] font-serif italic hover:underline flex items-center gap-1"
                  >
                    Ver mapa ampliado <ExternalLink size={11} />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* SECTION: RESEÑAS & LIBRO DE VISITAS - FOR BASIC, PRO, ADVANCE */}
      {!isFree && (
        <section id="resenas" className="py-14 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto">
          <div className="space-y-10 sm:space-y-12">
            
            {/* Header */}
            <div className="text-center space-y-2.5 max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#C86D51] flex items-center justify-center gap-1.5">
                <Heart size={14} className="text-rose-500 fill-rose-500" /> Libro de Visitas • Calificaciones Reales
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif text-stone-900">
                Reseñas de la Comunidad Viajera
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                Historias, notas y recomendaciones dejadas por fotógrafos, parejas y exploradores de todo el mundo.
              </p>
            </div>

            {/* Global Rating Scoreboard Banner */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm grid md:grid-cols-12 gap-6 items-center">
              
              {/* Score Box */}
              <div className="md:col-span-4 text-center md:text-left space-y-2 md:border-r md:border-stone-100 md:pr-6">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <span className="text-4xl sm:text-5xl font-serif font-bold text-stone-900">4.9</span>
                  <div className="space-y-0.5">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs text-stone-500 block">sobre 5.0 puntos</span>
                  </div>
                </div>
                <p className="text-xs text-stone-600">
                  Basado en más de <strong>+340 opiniones</strong> en TripAdvisor y Google Reviews.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-1.5 text-[11px] text-[#588157] font-semibold pt-1">
                  <ThumbsUp size={13} />
                  <span>98% de recomendación directa</span>
                </div>
              </div>

              {/* Star Breakdown Bars */}
              <div className="md:col-span-5 space-y-1.5 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <span className="w-12 text-[11px]">5 estrellas</span>
                  <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                    <div className="w-[94%] h-full bg-[#C86D51] rounded-full" />
                  </div>
                  <span className="w-8 text-right font-mono text-[11px]">94%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12 text-[11px]">4 estrellas</span>
                  <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                    <div className="w-[6%] h-full bg-[#588157] rounded-full" />
                  </div>
                  <span className="w-8 text-right font-mono text-[11px]">6%</span>
                </div>
                <div className="flex items-center gap-2 text-stone-400">
                  <span className="w-12 text-[11px]">3 estrellas</span>
                  <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                    <div className="w-[0%] h-full bg-stone-300 rounded-full" />
                  </div>
                  <span className="w-8 text-right font-mono text-[11px]">0%</span>
                </div>
              </div>

              {/* Trust Badges Stamp */}
              <div className="md:col-span-3 flex flex-col justify-center items-center md:items-end space-y-2 text-center md:text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-stone-200 text-stone-700 text-xs font-serif">
                  <Award size={14} className="text-amber-600" />
                  <span>Top Rated Cusco 2026</span>
                </div>
                <span className="text-[10px] text-stone-400">
                  Guía Oficial Certificado DIRCETUR
                </span>
              </div>

            </div>

            {/* Category Filter Chips for Advance tier */}
            {isAdvance && (
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { id: 'all', label: 'Todas las Reseñas' },
                  { id: 'fotografia', label: 'Fotógrafos' },
                  { id: 'parejas', label: 'En Pareja' },
                  { id: 'solo', label: 'Solo Travelers' },
                  { id: 'trek', label: 'Aventureros' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedReviewCategory(f.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-serif transition-all cursor-pointer ${
                      selectedReviewCategory === f.id
                        ? 'bg-[#588157] text-white shadow-2xs font-bold'
                        : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}

            {/* Review Cards Grid (Polaroid Style with Washi Tape) */}
            <div className={`grid grid-cols-1 ${visibleReviews.length > 1 ? 'md:grid-cols-2' : ''} ${visibleReviews.length > 2 ? 'lg:grid-cols-3' : ''} gap-6`}>
              {visibleReviews.map((r, idx) => (
                <div 
                  key={r.id}
                  className={`bg-white p-5 sm:p-6 pb-7 rounded-2xl shadow-sm border border-stone-200/90 relative transform ${
                    idx % 3 === 0 ? '-rotate-0.5 hover:rotate-0' : idx % 3 === 1 ? 'rotate-0.5 hover:rotate-0' : 'hover:scale-[1.01]'
                  } transition-all duration-300 flex flex-col justify-between space-y-4`}
                >
                  {/* Washi tape */}
                  <div className="w-16 h-3 bg-[#E8DEC8]/80 absolute -top-1.5 left-1/2 -translate-x-1/2 rotate-1 shadow-2xs" />
                  
                  <div className="space-y-3">
                    {/* Stars and Category Chip */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex gap-1 text-amber-500">
                        {[...Array(r.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-[#C86D51] bg-[#C86D51]/10 px-2 py-0.5 rounded-full font-bold">
                        {r.categoryLabel}
                      </span>
                    </div>

                    {/* Quote Text */}
                    <p className="text-xs sm:text-sm font-serif italic text-stone-700 leading-relaxed">
                      &quot;{r.comment}&quot;
                    </p>
                  </div>

                  {/* Reviewer Footer */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full ${r.avatarColor} text-white flex items-center justify-center font-serif text-xs font-bold shrink-0`}>
                        {r.name.slice(0, 1)}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-xs text-stone-900">{r.name}</h4>
                        <p className="text-[10px] text-stone-400">{r.origin} • {r.date}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#588157] font-semibold flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      <span className="hidden sm:inline">Verificado</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Write a review prompt */}
            <div className="bg-[#F3EFEA] p-5 sm:p-6 rounded-2xl border border-stone-200 text-center space-y-2 max-w-xl mx-auto">
              <span className="font-serif font-bold text-xs sm:text-sm text-stone-800 block">
                ¿Viajaste recientemente con nosotros?
              </span>
              <p className="text-xs text-stone-600">
                Nos encantaría leer tu experiencia y sumar tus fotos a nuestro libro de visitas.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#C86D51] hover:underline pt-1"
              >
                <span>Enviar testimonio o fotos al guía</span>
                <MessageCircle size={13} />
              </a>
            </div>

          </div>
        </section>
      )}

      {/* SECTION: GUÍA DE CAMPO DEL FOTÓGRAFO & CONSEJOS (ETC) - PRO & ADVANCE ONLY */}
      {!isFree && (isPro || isAdvance) && (
        <section id="guia-campo" className="py-14 sm:py-20 px-4 sm:px-8 bg-[#FAF7F2] border-t border-stone-200">
          <div className="max-w-6xl mx-auto space-y-10">
            
            {/* Header */}
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#588157] flex items-center justify-center gap-1.5">
                <Sun size={14} /> Guía de Campo • Consejos de Fotografía & Altura
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif text-stone-900">
                Secretos para Fotografiar los Andes
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                Aprende a capturar los mejores contrastes de luz, elegir tu vestuario y adaptarte al oxígeno de la montaña como un profesional.
              </p>
            </div>

            {/* 4 Editorial Field Advice Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Tip 1: Luz y Hora */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 relative overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Sun size={20} />
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-sm">
                  1. Horario de Luz Dorada
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Llegar a la laguna entre las 09:30 y 11:30 AM permite que el sol pegue en ángulo directo, eliminando sombras en el agua y revelando el turquesa glacial más vivo.
                </p>
              </div>

              {/* Tip 2: Paleta de Ropa */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 relative overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-[#C86D51]/10 text-[#C86D51] flex items-center justify-center">
                  <Camera size={20} />
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-sm">
                  2. Paleta de Color Boho
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Recomendamos prendas en tonos tierra: terracota, mostaza, verde musgo o lana cruda. Contrastan de forma espectacular con el cielo azul y el glaciar blanco.
                </p>
              </div>

              {/* Tip 3: Aclimatación */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 relative overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-[#588157]/10 text-[#588157] flex items-center justify-center">
                  <Mountain size={20} />
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-sm">
                  3. Paso Andino y Soroche
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Paso corto y constante, inhalando profundo por la nariz y exhalando al ritmo del paso. El té de muña en el desayuno es el mejor aliado digestivo antes de ascender.
                </p>
              </div>

              {/* Tip 4: Huella Positiva */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 relative overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-sm">
                  4. Sin Dejar Rastro
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Cero plásticos de un solo uso. Llevamos cantimploras reutilizables y respetamos las apachetas tradicionales dejadas por las comunidades quechuas.
                </p>
              </div>

            </div>

            {/* Reassurance Banner: Cancelación Flexible */}
            <div className="bg-[#F3EFEA] p-6 rounded-3xl border border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#588157] text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-900">
                    Garantía de Reprogramación sin Penalidad
                  </h4>
                  <p className="text-xs text-stone-600">
                    Si tu vuelo se retrasa o hay condiciones climáticas adversas, puedes cambiar tu fecha sin costo avisando con 48h de anticipación.
                  </p>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs font-serif font-bold px-4 py-2.5 rounded-xl transition-all shadow-2xs cursor-pointer"
              >
                Consultar Políticas
              </a>
            </div>

          </div>
        </section>
      )}

      {/* Inclusiones & Exclusiones & Mochila - ADAPTIVE BY TIER */}
      {!isFree && (
        <section id="mochila" className="py-12 sm:py-16 px-4 sm:px-8 max-w-6xl mx-auto">
          {/* BASIC: Single or 2-column layout (Qué Incluye + Contacto) */}
          {isBasic ? (
            <div id="incluye" className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Incluye */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-[#588157]">
                  <CheckCircle2 size={20} />
                  <h3 className="font-serif font-bold text-lg text-stone-900">¿Qué Incluye el Servicio?</h3>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-stone-600">
                  {(data.features?.items || [
                    'Guía profesional colegiado bilingüe',
                    'Transporte turístico ida y vuelta desde tu hotel',
                    'Desayuno y refrigerio andino campestre',
                    'Botiquín de primeros auxilios y balón de oxígeno medicinal'
                  ]).map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[#588157] font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Booking Assistance */}
              <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#C86D51]/30 shadow-xs space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#C86D51]">
                    Atención Inmediata
                  </span>
                  <h3 className="font-serif font-bold text-lg text-stone-900">¿Deseas confirmar disponibilidad?</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Escríbenos directamente para coordinar fecha de salida y número de viajeros con respuesta en minutos.
                  </p>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#588157] hover:bg-[#476846] text-white py-3 px-5 rounded-2xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle size={16} />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            /* PRO & ADVANCE: Full 3 Columns (Incluye, No Incluye, Mochila de Viaje) */
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Incluye */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-[#588157]">
                  <CheckCircle2 size={18} />
                  <h3 className="font-serif font-bold text-base text-stone-900">¿Qué Incluye?</h3>
                </div>
                <ul className="space-y-2.5 text-xs text-stone-600">
                  {(data.features?.items || [
                    'Guía profesional colegiado bilingüe',
                    'Transporte turístico ida y vuelta',
                    'Desayuno y almuerzo buffet andino',
                    'Botiquín de primeros auxilios y balón de oxígeno',
                    'Bastones de trekking para la caminata'
                  ]).map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#588157] font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* No Incluye */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-stone-500">
                  <XCircle size={18} />
                  <h3 className="font-serif font-bold text-base text-stone-900">No Incluye</h3>
                </div>
                <ul className="space-y-2.5 text-xs text-stone-600">
                  {(data.notIncluded || [
                    'Boleto turístico o entradas comunales',
                    'Caballos de auxilio (opcional en el punto)',
                    'Snacks personales o bebidas adicionales',
                    'Propinas voluntarias para el equipo'
                  ]).map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-stone-400 font-bold">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mochila / Esenciales */}
              <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#C86D51]/30 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-[#C86D51]">
                  <Backpack size={18} />
                  <h3 className="font-serif font-bold text-base text-stone-900">Mochila de Viaje</h3>
                </div>
                <ul className="space-y-2.5 text-xs text-stone-700">
                  {(data.whatToBring || [
                    'Casaca cortaviento y ropa abrigadora en capas',
                    'Bloqueador solar y lentes con filtro UV',
                    'Zapatillas de trekking con buen agarre',
                    'Botella de agua recargable',
                    'Efectivo en soles para compras locales'
                  ]).map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C86D51] font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}
        </section>
      )}

      {/* Tour Support & FAQs - FOR BASIC, PRO, ADVANCE (Hidden on Free) */}
      {!isFree && (
        <TourSupportAndFaqs
          faqs={data.faqs}
          tourName={data.name || data.hero?.title || 'Tour Cusco'}
          whatsapp={data.whatsapp}
          guideName={data.guideName}
          destination={data.destination || 'Cusco'}
          tier={tier}
          theme="boho-nature"
          isMobile={isMobile}
        />
      )}

      {/* Bottom CTA Banner */}
      <footer className="bg-stone-900 text-stone-300 py-12 px-4 sm:px-8 text-center space-y-6">
        <div className="max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 text-stone-400 text-xs uppercase tracking-widest font-serif">
            <Camera size={14} className="text-[#C86D51]" />
            <span>Boho Travel Journal • Edición Limitada</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-serif text-white">¿Listo para vivir esta experiencia?</h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Reserva con anticipación para asegurar cupos en grupos reducidos con atención personalizada y asesoría fotográfica.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3">
          {isQuote ? (
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="bg-[#C86D51] hover:bg-[#b05d43] text-white px-6 py-3.5 rounded-full font-medium text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <FileText size={15} />
              <span>Solicitar Cotización Formal</span>
            </button>
          ) : (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#588157] hover:bg-[#476846] text-white px-6 py-3.5 rounded-full font-medium text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle size={15} />
              <span>Hablar con el Guía por WhatsApp</span>
            </a>
          )}
        </div>

        <div className="border-t border-stone-800 pt-6 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2">
          <span>© {new Date().getFullYear()} Cusco Creativos S.A.C. • Plantilla Boho Travel Journal</span>
          <span>Inspirado en la estética editorial de viajes & Pinterest</span>
        </div>
      </footer>

      {/* Quote Modal if needed */}
      <QuoteModal 
        isOpen={isQuoteOpen} 
        onClose={() => setIsQuoteOpen(false)} 
        landing={data}
      />
    </div>
  );
}
