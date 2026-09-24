"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  MapPin, Clock, Star, CheckCircle, MessageCircle, HelpCircle, FileText, 
  ShieldCheck, XCircle, Backpack, Calendar, ArrowRight, Heart, Flame, 
  Plane, Compass, Users, Sparkles, Navigation, Phone, Check, ChevronRight,
  Send, Mountain
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

// Top Searched Spots (matching the pill cards in the image)
const SEARCHED_SPOTS = [
  {
    id: 'salkantay',
    name: 'Salkantay Trek',
    tours: '450 Tours',
    badge: '5 Días • 4,630 msnm',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=400&auto=format&fit=crop',
    price: '$350 USD'
  },
  {
    id: 'inca-trail',
    name: 'Camino Inca',
    tours: '380 Tours',
    badge: '4 Días • Puerta del Sol',
    image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=400&auto=format&fit=crop',
    price: '$420 USD'
  },
  {
    id: 'ausangate',
    name: 'Ausangate 7 Lagunas',
    tours: '600 Tours',
    badge: 'Glaciares & Aguas Termales',
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=400&auto=format&fit=crop',
    price: '$310 USD'
  },
  {
    id: 'choquequirao',
    name: 'Choquequirao',
    tours: '250 Tours',
    badge: 'Cuna de Oro Inca',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=400&auto=format&fit=crop',
    price: '$290 USD'
  },
  {
    id: 'humantay',
    name: 'Laguna Humantay',
    tours: '520 Tours',
    badge: 'Turquesa Andina',
    image: 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=400&auto=format&fit=crop',
    price: 'S/ 160 PEN'
  },
  {
    id: 'vinicunca',
    name: 'Montaña 7 Colores',
    tours: '780 Tours',
    badge: 'Cordillera Arcoíris',
    image: 'https://images.unsplash.com/photo-1533050487297-09b450131914?q=80&w=400&auto=format&fit=crop',
    price: 'S/ 150 PEN'
  },
  {
    id: 'inca-jungle',
    name: 'Inca Jungle Trail',
    tours: '670 Tours',
    badge: 'Downhill & Rafting',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=400&auto=format&fit=crop',
    price: '$280 USD'
  },
  {
    id: 'lares-trek',
    name: 'Valle de Lares',
    tours: '320 Tours',
    badge: 'Cultura Viva & Termas',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop',
    price: '$320 USD'
  }
];

// Iconic Locations Cards (matching the 3x2 grid in the image)
const ICONIC_LOCATIONS = [
  {
    id: 'salkantay-classic',
    title: 'Salkantay Trek a Machu Picchu',
    desc: 'Atraviesa el legendario paso de 4,630 msnm, duerme en domos de cristal y desciende por ceja de selva hasta la ciudadela inca.',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=600&auto=format&fit=crop',
    rating: '5.0',
    price: '$350',
    detail: '• 5 Días Todo Incluido'
  },
  {
    id: 'inca-trail-classic',
    title: 'Camino Inca Clásico 4D/3N',
    desc: 'El sendero empedrado original de los emperadores incas con vistas de ensueño sobre Wiñay Wayna y la entrada por el Inti Punku.',
    image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=600&auto=format&fit=crop',
    rating: '5.0',
    price: '$420',
    detail: '• Permisos Oficiales DIRCETUR'
  },
  {
    id: 'ausangate-circuit',
    title: 'Circuito Ausangate & 7 Lagunas',
    desc: 'Rodea el apu tutelar sagrado de Cusco frente a manadas de alpacas y relájate en las aguas termales de Pacchanta.',
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=600&auto=format&fit=crop',
    rating: '4.9',
    price: '$310',
    detail: '• Almuerzo Buffet Andino'
  },
  {
    id: 'choquequirao-trek',
    title: 'Choquequirao: La Ciudad Perdida',
    desc: 'Una expedición de pura adrenalina hacia la fortaleza hermana de Machu Picchu, suspendida en el cañón del río Apurímac.',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=600&auto=format&fit=crop',
    rating: '5.0',
    price: '$290',
    detail: '• Guiado Arqueológico Experto'
  },
  {
    id: 'inca-jungle-adventure',
    title: 'Inca Jungle Multideporte',
    desc: 'Bicicleta de montaña desde el Abra Málaga, tirolesa de 1,000m sobre el río y baños termales de Cocalmayo hacia Santa Teresa.',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600&auto=format&fit=crop',
    rating: '4.8',
    price: '$280',
    detail: '• Equipo Técnico Incluido'
  },
  {
    id: 'humantay-turquoise',
    title: 'Laguna Humantay & Domos Soraypampa',
    desc: 'Caminata hacia la joya turquesa de los Andes a los pies del nevado Humantay con pausas fotográficas y desayuno campestre.',
    image: 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=600&auto=format&fit=crop',
    rating: '4.9',
    price: 'S/ 160',
    detail: '• Salidas Diarias Confirmadas'
  }
];

const DEFAULT_EXPEDITION_REVIEWS = [
  {
    name: 'David & Sarah Miller',
    origin: 'Austin, Texas (USA)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: 'Agosto 2026',
    route: 'Camino Inca Clásico 4D',
    comment: 'Best trekking experience of our lives! The porters, camping gear, and historical insights reaching the Sun Gate at sunrise made it completely unforgettable.'
  },
  {
    name: 'Matthieu & Élodie Laurent',
    origin: 'Lyon, Francia',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: 'Julio 2026',
    route: 'Circuito Ausangate & 7 Lagunas',
    comment: 'Une organisation sans faille. Des paysages à couper le souffle et un respect total des communautés andines. Les chevaux de secours et le matériel étaient impeccables.'
  },
  {
    name: 'Sofía & Lucas Valdivia',
    origin: 'Santiago, Chile',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: 'Junio 2026',
    route: 'Laguna Humantay & Glamping',
    comment: 'Excelente ritmo de caminata para aclimatarse. Los bastones de trekking y el té de muña en el campamento hicieron que todo fuera muy seguro y reconfortante.'
  },
  {
    name: 'Elena & Marco Rossi',
    origin: 'Milán, Italia',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: 'Mayo 2026',
    route: 'Salkantay Trek 5D/4N',
    comment: 'Guías oficiales de primer nivel, oxígeno disponible en todo momento y vistas de los glaciares que parecen de película. ¡Recomendadísimo!'
  }
];

export default function AdventureTemplate({ data, viewMode = 'desktop' }: TemplateProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [likedCards, setLikedCards] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isQuote = data.objective === 'quote';
  const isMobile = viewMode === 'mobile';
  const tier = data.tier || 'advance';
  const isFree = tier === 'free';
  const isAdvance = tier === 'advance';

  // Ensure balanced multi-testimonial grid (minimum 4 reviews)
  const userReviews = data.testimonials && data.testimonials.length > 0 ? data.testimonials : [];
  const allTestimonials = [
    ...userReviews.map((r, i) => ({
      ...r,
      avatar: (r as any).avatar || DEFAULT_EXPEDITION_REVIEWS[i % DEFAULT_EXPEDITION_REVIEWS.length].avatar,
      route: (r as any).route || 'Expedición Salkantay & Cusco',
      date: (r as any).date || 'Septiembre 2026'
    })),
    ...DEFAULT_EXPEDITION_REVIEWS.filter(
      def => !userReviews.some(u => u.name && def.name && u.name.toLowerCase().trim() === def.name.toLowerCase().trim())
    )
  ].slice(0, 4);

  const cleanPhone = (data.whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(
    `Hola ${data.guideName || 'Guía de Trekking'}, deseo información y reservar la expedición "${data.name || data.hero?.title || 'Tour de Aventura'}". ¿Tienen salidas disponibles?`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  const createWhatsAppLink = (tourTitle: string) => {
    const msg = encodeURIComponent(`Hola ${data.guideName || 'Asesor'}, me interesa el tour "${tourTitle}". ¿Tienen cupos disponibles?`);
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  // Hero Hiker photo: use user's hero image or default smiling trekker
  const trekkerHeroImage = data.heroImage || 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1200&auto=format&fit=crop';

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-800 selection:bg-slate-900 selection:text-white">
      
      {/* 1. TOP NAVBAR (Espacioso, Robusto & Alta Presencia) */}
      <nav className="sticky top-0 w-full z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-5 flex justify-between items-center gap-4">
          
          {/* Brand Logo & Authority Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-md shadow-slate-900/10 shrink-0">
              <Mountain size={22} className="text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none">
                  Trek<span className="text-blue-600">Explorer</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-wider border border-blue-200/60">
                  Perú
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 mt-1 hidden xs:block">
                Expediciones de Montaña & Aventura
              </span>
            </div>
          </div>

          {/* Nav Links */}
          {!isMobile && (
            <div className="hidden lg:flex items-center gap-8 xl:gap-10 text-[14px] font-extrabold text-slate-700">
              <a href="#destinos" className="hover:text-blue-600 transition-colors py-1">Destinos</a>
              <a href="#iconic" className="hover:text-blue-600 transition-colors py-1">Tours Icónicos</a>
              <a href="#itinerario" className="hover:text-blue-600 transition-colors py-1">Itinerario</a>
              <a href="#incluye" className="hover:text-blue-600 transition-colors py-1">Qué Incluye</a>
              <a href="#soporte-faq" className="hover:text-blue-600 transition-colors py-1">FAQ</a>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {data.objective === 'both' ? (
              <>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20 hover:scale-102 flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle size={17} />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsQuoteOpen(true)}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm transition-all shadow-md hover:scale-102 flex items-center gap-2 cursor-pointer"
                >
                  <FileText size={17} />
                  <span>Cotizar</span>
                </button>
              </>
            ) : isQuote ? (
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-lg hover:shadow-slate-900/20 hover:scale-102 active:scale-98 flex items-center gap-2.5 cursor-pointer"
              >
                <FileText size={18} />
                <span>Cotizar Expedición</span>
              </button>
            ) : (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 hover:bg-slate-800 text-white px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-lg hover:shadow-slate-900/20 hover:scale-102 active:scale-98 flex items-center gap-2.5 cursor-pointer"
              >
                <MessageCircle size={18} />
                <span>Reservar por WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION CON IMAGEN DE FONDO COMPLETO */}
      <section className="relative w-full overflow-hidden min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] flex items-center">
        {/* Full Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={trekkerHeroImage}
            alt={data.name || 'Aventura & Trekking'}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Multi-layer cinematic overlays for contrast and readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Copy & CTAs */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-sm">
                <span className="text-xs">🌐</span>
                <span>{data.hero?.badge || 'Discover the World • Aventura & Trekking'}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-md">
                Travel the Best <br />
                <span className="text-white">It&apos;s a Big World,</span> <br />
                <span className="text-white flex items-center gap-2">
                  Go Explore! <span className="inline-block animate-bounce">🚀</span>
                </span>
              </h1>

              {/* Tour Subtitle / Description */}
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl font-normal drop-shadow-sm">
                {data.hero?.subtitle || data.about?.content || 
                  'Un trekking legendario de alta montaña cruzando nevados imponentes, ceja de selva y plantaciones de café hasta la ciudadela inca de Machu Picchu.'}
              </p>

              {/* Buttons Row */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                {isQuote ? (
                  <button
                    type="button"
                    onClick={() => setIsQuoteOpen(true)}
                    className="bg-white hover:bg-slate-100 text-slate-950 font-black px-7 py-3.5 rounded-full text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>{data.hero?.cta || 'Cotizar Expedición'}</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-slate-100 text-slate-950 font-black px-7 py-3.5 rounded-full text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>{data.hero?.cta || 'Reservar Directo por WhatsApp'}</span>
                    <ArrowRight size={16} />
                  </a>
                )}

                <a
                  href="#itinerario"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-full text-sm backdrop-blur-md border border-white/25 shadow-sm hover:border-white/40 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Compass size={16} className="text-blue-400" />
                  <span>Ver Itinerario</span>
                </a>

                {data.price && (
                  <div className="px-4 py-3 rounded-full bg-blue-600/90 text-white backdrop-blur-md border border-blue-400/40 font-black text-xs shadow-md">
                    Desde {data.price}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Floating High-Impact Glass Cards */}
            <div className="lg:col-span-5 relative flex flex-col justify-center items-start lg:items-end">
              <div className="w-full max-w-sm space-y-4">
                
                {/* Floating Altitude & Live Confirmation Card */}
                <div className="bg-slate-900/70 backdrop-blur-xl border border-white/20 p-5 rounded-3xl shadow-2xl text-white space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2 text-xs font-black text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>Salidas Diarias Confirmadas</span>
                    </div>
                    <span className="bg-white/10 px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-300">
                      2026 Season
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/25 text-blue-400 flex items-center justify-center font-bold">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">Punto más alto:</span>
                        <strong className="text-white text-xs sm:text-sm font-black">{data.altitude || '4,630 msnm (Paso Salkantay)'}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs text-slate-300 border-t border-white/10">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                      <span>Guía: <strong className="text-white">{data.guideName || 'Guía Colegiado'}</strong></span>
                    </div>
                    <span className="text-[11px] font-mono text-blue-300 font-bold">{data.duration || '5 Días / 4 Noches'}</span>
                  </div>
                </div>

                {/* Floating Review Badge */}
                <div className="bg-white/95 backdrop-blur-xl px-5 py-3 rounded-full shadow-2xl border border-white/80 flex items-center gap-3 w-fit hover:scale-105 transition-transform">
                  {/* 3 Avatars Stack */}
                  <div className="flex -space-x-2 shrink-0">
                    <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative bg-slate-200">
                      <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop" alt="User 1" fill className="object-cover" />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative bg-slate-200">
                      <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop" alt="User 2" fill className="object-cover" />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative bg-slate-200">
                      <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop" alt="User 3" fill className="object-cover" />
                    </div>
                  </div>

                  {/* Rating copy */}
                  <div className="text-left leading-tight">
                    <span className="block text-[11px] sm:text-xs font-bold text-slate-900">Our Happy Customers</span>
                    <div className="flex items-center gap-1 text-[11px] text-slate-600 font-semibold">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-slate-900 font-black">4.9</span>
                      <span>(10.2k Reviews)</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PARTNERS / TRUST LOGOS BAR (Exact match to image) */}
      <section className="border-y border-slate-100 bg-slate-50/70 py-6 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all text-slate-500 font-bold text-sm sm:text-base">
          <div className="flex items-center gap-1.5 tracking-tight font-black text-slate-700">
            <span>🦉</span> tripadvisor
          </div>
          <div className="tracking-tight font-extrabold text-slate-700">
            Expedia
          </div>
          <div className="flex items-center gap-1 tracking-tight font-bold text-slate-700">
            <span>🔴</span> airbnb
          </div>
          <div className="tracking-widest font-black italic text-slate-700">
            ORBITZ
          </div>
          <div className="tracking-tight font-black text-slate-700">
            Booking<span className="text-blue-600">.com</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <ShieldCheck size={14} /> DIRCETUR Oficial
          </div>
        </div>
      </section>

      {/* 4. SECTION: EXPLORE TOP SEARCHED SPOTS (Exact match to image) */}
      <section id="destinos" className="py-14 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto text-center">
        <div className="max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            Explore Top Searched Spots <span className="text-amber-500">🔥</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            Uncover the top travel destinations that are trending right now. These popular spots offer something for every traveler, from high altitude adventure to cultural Andean immersion. Plan your next trip today!
          </p>
        </div>

        {/* Grid of 8 Horizontal Capsule Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-6xl mx-auto">
          {SEARCHED_SPOTS.map((spot) => (
            <a
              key={spot.id}
              href={createWhatsAppLink(spot.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300 rounded-2xl p-2.5 sm:p-3 shadow-2xs hover:shadow-md transition-all flex items-center justify-between gap-3 text-left group cursor-pointer"
            >
              {/* Circular Thumbnail */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-100 shadow-2xs">
                <Image
                  src={spot.image}
                  alt={spot.name}
                  fill
                  sizes="60px"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Text Info */}
              <div className="min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                  {spot.name}
                </h4>
                <p className="text-[10px] text-slate-400 font-bold truncate">
                  ➤ {spot.tours}
                </p>
              </div>

              {/* Action Arrow Icon */}
              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                <ChevronRight size={14} />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 5. SECTION: EXPLORE ICONIC LOCATIONS (Exact match to image 3-col grid) */}
      <section id="iconic" className="py-14 sm:py-20 px-4 sm:px-8 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14 space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
              Explore Iconic Locations <span className="text-blue-500">✈️</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              Discover the world&apos;s top destinations that promise unforgettable experiences. From scenic wonders to cultural hotspots, these places are waiting for you to explore. Dive into the beauty and charm of each unique location.
            </p>
          </div>

          {/* 3 Columns Grid of Tour Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-6xl mx-auto">
            {ICONIC_LOCATIONS.map((tour) => {
              const isLiked = likedCards[tour.id];
              return (
                <div
                  key={tour.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image with Rating and Heart */}
                    <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                      {/* Rating Badge (top-left) */}
                      <div className="absolute top-3.5 left-3.5 bg-black/40 backdrop-blur-md text-white text-[11px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/20">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        <span>{tour.rating}</span>
                      </div>

                      {/* Favorite Heart Button (top-right) */}
                      <button
                        type="button"
                        onClick={(e) => toggleLike(tour.id, e)}
                        className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center backdrop-blur-md shadow-xs active:scale-90 transition-all cursor-pointer"
                        title="Guardar en favoritos"
                      >
                        <Heart
                          size={15}
                          className={isLiked ? "fill-rose-500 text-rose-500" : "text-slate-600"}
                        />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-5 text-left space-y-2">
                      <h3 className="font-black text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {tour.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {tour.desc}
                      </p>
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 mt-2">
                    <div className="text-left">
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-black text-slate-900">{tour.price}</span>
                        <span className="text-[10px] text-slate-400 font-bold">{tour.detail}</span>
                      </div>
                    </div>

                    <a
                      href={createWhatsAppLink(tour.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>See More</span>
                      <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. TOUR ITINERARY SECTION (Detallado para la Landing) */}
      {data.itinerary && data.itinerary.length > 0 && (
        <section id="itinerario" className="py-14 sm:py-20 px-4 sm:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-blue-600 font-black text-xs uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              <Calendar size={13} /> Itinerario Detallado
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              Paso a Paso de la Aventura
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Cronograma diseñado por guías certificados DIRCETUR con aclimatación gradual y paradas estratégicas.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5 relative before:absolute before:inset-0 before:left-4 sm:before:left-5 before:w-0.5 before:bg-slate-200">
            {data.itinerary.map((item, idx) => (
              <div key={idx} className="relative flex items-start gap-4 pl-1 sm:pl-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900 text-white font-black flex items-center justify-center text-xs shrink-0 shadow-md ring-4 ring-white z-10">
                  {idx + 1}
                </div>
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 w-full shadow-xs text-left">
                  <span className="text-[11px] uppercase font-black tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md inline-block mb-1.5">
                    {item.step}
                  </span>
                  <h3 className="font-black text-slate-900 text-sm sm:text-base mb-1">{item.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. FEATURES & INCLUDED SERVICES */}
      {data.features && data.features.items && data.features.items.length > 0 && !isFree && (
        <section id="incluye" className="py-14 sm:py-20 px-4 sm:px-8 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-14 space-y-2">
              <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
                Equipamiento & Servicios
              </span>
              <h2 className="text-2xl sm:text-4xl font-black">
                {data.features.title || '¿Qué incluye la expedición?'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.features.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 hover:border-blue-500 transition-colors text-left"
                >
                  <CheckCircle className="text-emerald-400 mb-3" size={26} />
                  <h3 className="text-base font-bold mb-1.5 text-white">{item.split(':')[0]}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.split(':')[1] || 'Servicio integral operado directamente por guías locales colegiados.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. PINTEREST PINBOARD (PRO & ADVANCE) */}
      {!isFree && (
        <PinterestPinboard
          images={data.galleryImages}
          destination={data.destination || 'Cusco, Perú'}
          tourName={data.name || data.hero?.title || 'Expedición de Aventura'}
          tier={tier}
          theme="adventure"
          isMobile={isMobile}
        />
      )}

      {/* 9. LOGISTICS: QUÉ LLEVAR & QUÉ NO INCLUYE */}
      {((data.notIncluded && data.notIncluded.length > 0) || (data.whatToBring && data.whatToBring.length > 0)) && (
        <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Qué NO incluye */}
            {data.notIncluded && data.notIncluded.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs text-left">
                <div className="flex items-center gap-2 text-rose-600 font-black text-sm sm:text-base mb-4">
                  <XCircle size={20} className="shrink-0" />
                  <h3>Qué NO está incluido</h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                  {data.notIncluded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Qué llevar en la mochila */}
            {data.whatToBring && data.whatToBring.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-xs text-left">
                <div className="flex items-center gap-2 text-blue-700 font-black text-sm sm:text-base mb-4">
                  <Backpack size={20} className="shrink-0" />
                  <h3>Qué llevar en tu mochila</h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                  {data.whatToBring.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 10. TESTIMONIALS */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          
          {/* Header with Social Proof */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black uppercase tracking-wider shadow-2xs">
              <span>⭐</span>
              <span>4.9 / 5.0 • Más de 10,200 Expedicionarios Felices</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Lo que dicen nuestros expedicionarios
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Testimonios reales y verificados de viajeros de todo el mundo que cruzaron los Andes con nuestros guías oficiales.
            </p>
          </div>

          {/* Grid of 4 Cards (2x2 on tablet/desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {allTestimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm hover:shadow-md border border-slate-200/90 hover:border-blue-300 transition-all text-left flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Top Row: Stars + Verified Badge */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle size={11} className="text-emerald-600" />
                      Expedición Verificada
                    </span>
                  </div>

                  {/* Quote text */}
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                    &quot;{t.comment}&quot;
                  </p>
                </div>

                {/* Traveler Author Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 relative shrink-0 border-2 border-white shadow-xs">
                      <Image 
                        src={(t as any).avatar || DEFAULT_EXPEDITION_REVIEWS[idx % DEFAULT_EXPEDITION_REVIEWS.length].avatar} 
                        alt={t.name} 
                        fill 
                        sizes="40px" 
                        className="object-cover" 
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">{t.name}</h4>
                      <p className="text-[11px] text-slate-400 truncate">{t.origin}</p>
                    </div>
                  </div>
                  {(t as any).route && (
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 shrink-0 hidden sm:block">
                      {(t as any).route}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Trust Indicators */}
          <div className="mt-10 sm:mt-14 pt-8 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600 text-base">✓</span> 100% Reseñas de Viajeros Reales
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-blue-600 text-base">🛡️</span> Guías Oficiales Colegiados DIRCETUR
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-amber-500 text-base">★</span> Certificado de Excelencia 2026
            </span>
          </div>

        </div>
      </section>

      {/* 11. OFICINA FÍSICA & MAPS CONECTADO */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-blue-600 font-bold text-xs">
              <MapPin size={15} /> Base de Operaciones en Cusco
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              Oficina Física y Atención Personalizada
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {data.officeAddress || 'Portal de Panes N° 123, Plaza de Armas, Cusco - Perú'}
            </p>
            <p className="text-[11px] text-emerald-600 font-bold">
              {data.officeHours || 'Lunes a Domingo: 08:00 AM – 08:00 PM (Horario Corrido)'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <a
              href={data.mapsUrl || 'https://maps.google.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-5 py-3 rounded-full flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Navigation size={14} className="text-blue-600" />
              <span>Ver en Google Maps</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5 py-3 rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <MessageCircle size={14} />
              <span>Contactar Guía</span>
            </a>
          </div>
        </div>
      </section>

      {/* 12. TOUR SUPPORT & FAQS */}
      <TourSupportAndFaqs
        faqs={data.faqs}
        tourName={data.name || data.hero?.title || 'Tour de Aventura'}
        whatsapp={data.whatsapp}
        guideName={data.guideName}
        destination={data.destination || 'Cusco'}
        tier={tier}
        theme="adventure"
        isMobile={isMobile}
      />

      {/* 13. FOOTER */}
      <footer className="bg-slate-950 py-10 px-4 text-center text-slate-500 text-xs border-t border-slate-900">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Mountain size={16} className="text-blue-500" />
            <span className="font-black text-white">TrekExplorer Perú</span>
          </div>
          <p>© 2026 Cusco Creativos S.A.C. Todos los derechos reservados.</p>
          <div className="flex items-center gap-3 text-slate-400 font-bold text-[11px]">
            <span>✓ DIRCETUR</span>
            <span>✓ SAFE TRAVELS</span>
            <span>✓ MINCETUR</span>
          </div>
        </div>
      </footer>

      {/* 14. STICKY MOBILE BOTTOM BAR */}
      {isMobile && (
        <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 flex items-center justify-between gap-3 shadow-2xl">
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Tarifa desde</span>
            <span className="text-base font-black text-slate-900">{data.price || '$350 USD'}</span>
          </div>
          <div className="flex items-center gap-2">
            {isQuote ? (
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs px-5 py-2.5 rounded-full shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <FileText size={14} />
                <span>Cotizar</span>
              </button>
            ) : (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-5 py-2.5 rounded-full shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <MessageCircle size={14} />
                <span>Reservar</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Quote Modal */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} landing={data} />
    </div>
  );
}
