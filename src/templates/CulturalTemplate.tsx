'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Landmark, Compass, Users, CheckCircle2, MessageCircle, MapPin, Calendar, 
  Star, HelpCircle, FileText, ShieldCheck, XCircle, Backpack, Search, Mail, 
  Phone, ArrowRight, ChevronLeft, ChevronRight, BookOpen, Clock, Sparkles, 
  Navigation, Eye, Share2, Award, Check
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

// 5 Quick Access Circles overlapping the golden curve (Matching user reference image)
const QUICK_SERVICES = [
  {
    icon: '🎫',
    label: 'Boleto Turístico',
    sub: 'Accesos Oficiales',
    category: 'Ingresos'
  },
  {
    icon: '📜',
    label: 'Guía Colegiado',
    sub: 'DIRCETUR Oficial',
    category: 'Historia'
  },
  {
    icon: '🕯️',
    label: 'Ceremonias Andinas',
    sub: 'Pago a la Pachamama',
    category: 'Rituales'
  },
  {
    icon: '🏛️',
    label: 'Templos & Palacios',
    sub: 'Arquitectura Inca',
    category: 'Megalítico'
  },
  {
    icon: '📞',
    label: 'Asistencia 24/7',
    sub: 'Horarios & Reservas',
    category: 'Soporte'
  }
];

// Actualités / Heritage news items (Matching user reference image)
const ACTUALITES_ITEMS = [
  {
    id: 1,
    badge: 'Historia & Arqueología',
    date: 'Temporada 2026',
    title: 'Secretos del Qorikancha y el templo dorado del Sol',
    desc: 'Un recorrido guiado por las cimentaciones megalíticas más perfectas del imperio incaico y su fusión con el convento virreinal de Santo Domingo.',
    linkText: 'Leer crónica del templo'
  },
  {
    id: 2,
    badge: 'Conservación & Muros',
    date: 'Patrimonio UNESCO',
    title: 'La piedra de los 12 ángulos y el palacio de Inca Roca',
    desc: 'Análisis arquitectónico in situ de la calle Hatun Rumiyoc con guías historiadores certificados de la Universidad San Antonio Abad.',
    linkText: 'Ver detalles de ruta'
  },
  {
    id: 3,
    badge: 'Cultura Viva',
    date: 'Tradición Andina',
    title: 'Ceremonia de ofrenda a la Pachamama y textilería ancestral',
    desc: 'Aprende sobre la cosmovisión andina, los tres mundos (Hanan, Kay, Uku Pacha) y los tintes vegetales naturales de los valles cusqueños.',
    linkText: 'Consultar horarios'
  }
];

// Agenda events (Matching user reference image)
const AGENDA_EVENTS = [
  {
    id: 'inti-raymi',
    date: '24 Junio 2026',
    badge: 'Solsticio de Invierno',
    title: 'Inti Raymi: La Gran Fiesta del Sol',
    desc: 'Celebración milenaria en Sacsayhuamán con más de 700 actores en escena reviviendo el mayor tributo al dios Inti.',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'city-tour-ancestral',
    date: 'Salidas Diarias Confirmadas',
    badge: 'Mañanas & Tardes',
    title: 'Circuito de los 4 Templos: Qenqo & Puka Pukara',
    desc: 'Visita guiada a los centros ceremoniales, laberintos de roca caliza y fortalezas de control militar del imperio.',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=600&auto=format&fit=crop'
  }
];

export default function CulturalTemplate({ data, viewMode = 'desktop' }: TemplateProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  const isQuote = data.objective === 'quote';
  const isMobile = viewMode === 'mobile';

  const cleanPhone = (data.whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const tier = data.tier || 'advance';
  const isFree = tier === 'free';
  const isAdvance = tier === 'advance';

  const encodedMsg = encodeURIComponent(
    `Hola ${data.guideName || 'Guía Historiador'}, deseo información y disponibilidad para el tour cultural "${data.name || data.hero?.title || 'Cusco Ancestral'}".`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  const createWhatsAppLink = (customText: string) => {
    const msg = encodeURIComponent(`Hola ${data.guideName || 'Guía'}, me interesa: "${customText}". ¿Qué horarios tienen disponibles?`);
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  // Grand panoramic sunset hero photo over mountain valley (matching user reference image)
  const heroSunsetBg = data.heroImage || 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop';
  const featuredNewsPhoto = data.galleryImages?.[0] || 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1200&auto=format&fit=crop';

  return (
    <div className="min-h-screen bg-[#FFFDF9] font-sans text-stone-800 selection:bg-amber-800 selection:text-white">
      
      {/* 1. TOP HEADER OVER PANORAMIC SUNSET */}
      <header className="relative bg-stone-900 text-white overflow-hidden">
        {/* Panoramic Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroSunsetBg}
            alt={data.name || 'Cusco Ancestral'}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-85 brightness-90"
          />
          {/* Subtle gradient overlay to enhance typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-900/30 to-amber-950/70" />
        </div>

        {/* Municipal / Heritage Navigation Bar */}
        <nav className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-white/15">
          {/* Official Emblem / Coat of arms */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 backdrop-blur-md border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-md">
              <Landmark size={22} />
            </div>
            <div className="text-left leading-tight">
              <span className="block text-xs sm:text-sm font-black tracking-widest uppercase font-serif text-amber-200">
                Qosqo Ancestral
              </span>
              <span className="text-[10px] text-stone-300 tracking-wider font-sans block">
                Patrimonio Cultural de la Humanidad
              </span>
            </div>
          </div>

          {/* Nav links */}
          {!isMobile && (
            <div className="hidden lg:flex items-center gap-7 text-xs font-bold tracking-wider uppercase text-stone-200">
              <a href="#actualites" className="hover:text-amber-300 transition-colors">Crónicas</a>
              <a href="#agenda" className="hover:text-amber-300 transition-colors">Agenda Cultural</a>
              <a href="#itinerario" className="hover:text-amber-300 transition-colors">Ruta & Templos</a>
              <a href="#territorio" className="hover:text-amber-300 transition-colors">El Territorio</a>
              <a href="#contacto" className="hover:text-amber-300 transition-colors">Información</a>
            </div>
          )}

          {/* Action CTA */}
          <div className="flex items-center gap-2">
            {isQuote ? (
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="bg-amber-600 hover:bg-amber-500 text-white px-4 sm:px-5 py-2 rounded-full font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FileText size={14} />
                <span>Cotizar Visita</span>
              </button>
            ) : (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-600 hover:bg-amber-500 text-white px-4 sm:px-5 py-2 rounded-full font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <MessageCircle size={14} />
                <span className="hidden sm:inline">WhatsApp</span>
                <span className="sm:hidden">Reservar</span>
              </a>
            )}
          </div>
        </nav>

        {/* Hero Central Titles & Circular Icons */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 pt-16 sm:pt-24 pb-28 sm:pb-36 text-center space-y-4 sm:space-y-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight drop-shadow-xl text-white italic">
            {data.hero?.title || 'Cusco Imperial'}
          </h1>
          <p className="text-base sm:text-xl text-amber-100 font-serif max-w-2xl mx-auto drop-shadow-md">
            {data.hero?.subtitle || 'Entre montañas sagradas y tradición milenaria, bienvenido a la capital arqueológica de América.'}
          </p>

          {/* 3 Circular Quick Action Icons (Center matching reference image) */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <a
              href="#territorio"
              className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
              title="Explorar el Territorio"
            >
              <Search size={16} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
              title="Escribir por WhatsApp"
            >
              <Mail size={16} />
            </a>
            <a
              href={`tel:${cleanPhone}`}
              className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
              title="Llamar a la Oficina"
            >
              <Phone size={16} />
            </a>
          </div>
        </div>

        {/* Golden / Apricot Organic Wave Cut (Exact shape matching reference image) */}
        <div className="absolute -bottom-1 inset-x-0 z-20 pointer-events-none">
          <svg viewBox="0 0 1440 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto preserve-3d">
            <path
              d="M0,80 C320,160 540,20 880,100 C1140,160 1340,90 1440,60 L1440,180 L0,180 Z"
              fill="#F3B356"
              className="opacity-95"
            />
            <path
              d="M0,110 C360,180 620,60 980,130 C1220,180 1360,130 1440,110 L1440,180 L0,180 Z"
              fill="#FFFDF9"
            />
          </svg>
        </div>
      </header>

      {/* 2. OVERLAPPING 5 CIRCULAR QUICK ACCESS BADGES (Matching reference image) */}
      <section className="relative z-30 -mt-10 sm:-mt-14 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {QUICK_SERVICES.map((item, idx) => (
            <a
              key={idx}
              href={createWhatsAppLink(item.label)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-amber-50/50 border border-stone-200/80 hover:border-amber-400/60 rounded-3xl p-4 sm:p-5 shadow-lg shadow-amber-900/5 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center group cursor-pointer"
            >
              {/* Circular Icon with golden ring */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-50 border-2 border-amber-300/80 flex items-center justify-center text-2xl sm:text-3xl mb-3 shadow-inner group-hover:scale-110 group-hover:bg-amber-100 transition-transform">
                <span>{item.icon}</span>
              </div>
              <h3 className="font-serif font-black text-xs sm:text-sm text-stone-900 leading-tight group-hover:text-amber-800 transition-colors">
                {item.label}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-stone-500 font-medium mt-1">
                {item.sub}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* 3. SECTION: ACTUALITÉS / PATRIMONIO VIVO (Exact match to reference image) */}
      <section id="actualites" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-8 sm:mb-12 border-b border-stone-200/70 pb-4">
          <h2 className="text-3xl sm:text-5xl font-serif font-black italic text-stone-900">
            Actualités
          </h2>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Toutes les actualités</span>
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Two-Column Grid: Featured Left + Stacked Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Large Featured Post */}
          <div className="lg:col-span-6 bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all group text-left">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-100">
              <Image
                src={featuredNewsPhoto}
                alt="Sendero Arqueológico"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-rose-600 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-sm">
                Publicado: Temporada 2026
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-3">
              <h3 className="font-serif font-black text-xl sm:text-2xl text-stone-900 group-hover:text-amber-800 transition-colors leading-tight">
                Un nuevo sendero señalizado al corazón de los templos incas
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                El circuito guiado hacia las alturas sagradas del Cusco ofrece vistas incomparables sobre la ciudad imperial, los muros ciclópeos de Sacsayhuamán y las huacas de aclimatación.
              </p>
              <div className="pt-2">
                <a
                  href={createWhatsAppLink('Sendero Señalizado Templos Incas')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-bold text-xs sm:text-sm cursor-pointer group-hover:translate-x-1 transition-transform"
                >
                  <span>Lire la suite / Reservar</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Stacked Chronicle Cards */}
          <div className="lg:col-span-6 space-y-6">
            {ACTUALITES_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs hover:shadow-md transition-all text-left space-y-2 group"
              >
                <div className="inline-block bg-rose-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {item.badge} • {item.date}
                </div>
                <h4 className="font-serif font-black text-base sm:text-lg text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
                <div className="pt-1">
                  <a
                    href={createWhatsAppLink(item.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-bold text-xs cursor-pointer group-hover:translate-x-1 transition-transform"
                  >
                    <span>{item.linkText}</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. SECTION: AGENDA (Exact match to reference image) */}
      <section id="agenda" className="py-16 sm:py-24 px-4 sm:px-8 bg-amber-50/40 border-y border-amber-200/50">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left side: Heading & Intro Paragraph */}
            <div className="lg:col-span-4 text-left space-y-4">
              <h2 className="text-3xl sm:text-5xl font-serif font-black italic text-stone-900">
                Agenda
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Tout au long de l&apos;année, Cusco s&apos;anime au rythme de ses événements : fêtes locales, balades historiques, célébrations ancestrales et visites guidées.
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Retrouvez ici les prochaines dates à noter dans votre agenda pour vivre l&apos;histoire en direct.
              </p>
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>TOUS LES ÉVÉNEMENTS</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Right side: 2 Showcase Event Cards with Pagination Controls */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Pagination controls top-right */}
              <div className="flex justify-end gap-2 pr-1">
                <button
                  type="button"
                  onClick={() => setActiveEventIndex(prev => (prev === 0 ? AGENDA_EVENTS.length - 1 : prev - 1))}
                  className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-xs hover:bg-stone-800 active:scale-90 transition-all cursor-pointer"
                  title="Anterior"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveEventIndex(prev => (prev === AGENDA_EVENTS.length - 1 ? 0 : prev + 1))}
                  className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-xs hover:bg-stone-800 active:scale-90 transition-all cursor-pointer"
                  title="Siguiente"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* 2 Event Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {AGENDA_EVENTS.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-3xl overflow-hidden border border-amber-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group text-left"
                  >
                    <div>
                      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        
                        {/* Golden Event Date Badge */}
                        <div className="absolute bottom-3 left-3 bg-amber-400/90 text-stone-900 text-[10px] font-black px-3 py-1 rounded-full shadow-sm backdrop-blur-xs">
                          {event.date}
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <h4 className="font-serif font-black text-base sm:text-lg text-stone-900 group-hover:text-amber-800 transition-colors leading-tight">
                          {event.title}
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                          {event.desc}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <a
                        href={createWhatsAppLink(event.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-amber-700 hover:text-amber-800 font-bold text-xs cursor-pointer group-hover:translate-x-1 transition-transform"
                      >
                        <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px]">➤</span>
                        <span>Lire la suite / Réserver</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. SECTION: LE TERRITOIRE / EL TERRITORIO SAGRADO (Exact match to reference image) */}
      <section id="territorio" className="relative py-20 sm:py-28 px-4 sm:px-8 text-white overflow-hidden">
        {/* Full-width mountain backdrop */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop"
            alt="Territorio Andino"
            fill
            sizes="100vw"
            className="object-cover object-center brightness-75 contrast-105"
          />
          <div className="absolute inset-0 bg-stone-950/50 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 text-left space-y-5">
            <h2 className="text-4xl sm:text-6xl font-serif font-black italic tracking-tight text-white">
              Le territoire
            </h2>
            <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-serif">
              Entre traditions vivantes au pied de la montagne andine, Cusco séduit par son authenticité, ses temples sacrés et son cadre naturel préservé.
            </p>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
              Grâce à la carte interactive, explorez les lieux emblématiques : Qorikancha, Sacsayhuamán, miradors de San Blas, sentiers historiques et trésors du quotidien. Une façon simple et visuelle de mieux connaître le territoire inca.
            </p>
            <div className="pt-2">
              <a
                href={data.mapsUrl || 'https://maps.google.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-xl transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>VOIR LA CARTE INTERACTIVE</span>
                <Navigation size={15} />
              </a>
            </div>
          </div>

          {/* Right Column: Stylized Territory Map Silhouette with Route Pins */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[420px] bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 border-2 border-white/20 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between text-xs font-bold text-amber-300 pb-2 border-b border-white/10">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-rose-500" />
                  Cartographie des Temples
                </span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full">
                  GPS Cusco
                </span>
              </div>

              {/* Interactive Point Badges */}
              <div className="space-y-2.5 text-left text-xs">
                <div className="bg-white/10 hover:bg-white/20 p-2.5 rounded-xl border border-white/10 flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-black text-[10px] flex items-center justify-center">1</span>
                    <span className="font-bold text-white">Qorikancha (Temple du Soleil)</span>
                  </div>
                  <span className="text-[10px] text-amber-300">3,400 m</span>
                </div>

                <div className="bg-white/10 hover:bg-white/20 p-2.5 rounded-xl border border-white/10 flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-black text-[10px] flex items-center justify-center">2</span>
                    <span className="font-bold text-white">Sacsayhuamán Megalithique</span>
                  </div>
                  <span className="text-[10px] text-amber-300">3,700 m</span>
                </div>

                <div className="bg-white/10 hover:bg-white/20 p-2.5 rounded-xl border border-white/10 flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-black text-[10px] flex items-center justify-center">3</span>
                    <span className="font-bold text-white">Qenqo & Puka Pukara</span>
                  </div>
                  <span className="text-[10px] text-amber-300">3,800 m</span>
                </div>

                <div className="bg-white/10 hover:bg-white/20 p-2.5 rounded-xl border border-white/10 flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-black text-[10px] flex items-center justify-center">4</span>
                    <span className="font-bold text-white">Plaza de Armas & Cathédrale</span>
                  </div>
                  <span className="text-[10px] text-emerald-400">Point Zéro</span>
                </div>
              </div>

              <p className="text-[10px] text-stone-300 text-center pt-1 italic">
                💡 Cliquez pour ouvrir l&apos;itinéraire direct dans votre application GPS.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. TOUR ITINERARY & INCLUSIONS (Preserved for full booking completeness) */}
      {data.itinerary && data.itinerary.length > 0 && (
        <section id="itinerario" className="py-16 sm:py-24 px-4 sm:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
              Itinéraire Officiel DIRCETUR
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-stone-900">
              Ruta Histórica Paso a Paso
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Organizado con tiempos holgados para apreciación fotográfica y explicación histórica.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5 relative before:absolute before:inset-0 before:left-4 sm:before:left-5 before:w-0.5 before:bg-amber-300">
            {data.itinerary.map((item, idx) => (
              <div key={idx} className="relative flex items-start gap-4 pl-1 sm:pl-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-900 text-amber-300 font-serif font-black flex items-center justify-center text-xs shrink-0 shadow-md ring-4 ring-white z-10">
                  {idx + 1}
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 w-full shadow-xs text-left">
                  <span className="text-[11px] uppercase font-black tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-md inline-block mb-1.5">
                    {item.step}
                  </span>
                  <h3 className="font-serif font-bold text-stone-900 text-sm sm:text-base mb-1">{item.title}</h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. FEATURES & PACKING LIST */}
      {data.features && data.features.items && data.features.items.length > 0 && !isFree && (
        <section id="incluye" className="py-14 sm:py-20 px-4 sm:px-8 bg-stone-100 border-t border-stone-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 space-y-2">
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900">
                {data.features.title || '¿Qué incluye la experiencia cultural?'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.features.items.map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex items-start gap-3.5 text-left">
                  <CheckCircle2 className="text-amber-700 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base">{item.split(':')[0]}</h3>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                      {item.split(':')[1] || 'Servicio brindado con estándares de calidad turística.'}
                    </p>
                  </div>
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
          destination={data.destination || 'Cusco Histórico'}
          tourName={data.name || data.hero?.title || 'Tour Cultural'}
          tier={tier}
          theme="cultural"
          isMobile={isMobile}
        />
      )}

      {/* 9. TOUR SUPPORT & FAQS */}
      <TourSupportAndFaqs
        faqs={data.faqs}
        tourName={data.name || data.hero?.title || 'Tour Cultural'}
        whatsapp={data.whatsapp}
        guideName={data.guideName}
        destination={data.destination || 'Cusco'}
        tier={tier}
        theme="cultural"
        isMobile={isMobile}
      />

      {/* 10. MUNICIPAL & HERITAGE FOOTER BLOCK (Exact match to bottom of reference image) */}
      <footer id="contacto" className="bg-white border-t-2 border-amber-300/80 py-10 px-4 sm:px-8 text-stone-700 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
          
          {/* Column 1: Emblem & Town Name */}
          <div className="md:col-span-3 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-700 flex items-center justify-center shrink-0">
              <Landmark size={24} />
            </div>
            <div>
              <span className="font-serif font-black text-sm uppercase text-stone-900 block">
                Cusco Patrimonial
              </span>
              <span className="text-[10px] text-stone-500 uppercase tracking-widest block font-bold">
                DIRCETUR Cusco • Perú
              </span>
            </div>
          </div>

          {/* Column 2: Address */}
          <div className="md:col-span-3 space-y-1">
            <span className="font-black text-stone-900 block uppercase text-[11px]">
              Oficina de Información Turística
            </span>
            <p className="text-stone-600 text-xs">
              {data.officeAddress || 'Portal de Panes N° 123, Plaza de Armas, Centro Histórico, Cusco'}
            </p>
          </div>

          {/* Column 3: Hours */}
          <div className="md:col-span-3 space-y-1">
            <span className="font-black text-stone-900 block uppercase text-[11px]">
              Horaires d&apos;ouverture / Atención
            </span>
            <p className="text-stone-600 text-xs">
              {data.officeHours || 'Lunes a Domingo de 08:00 AM a 08:00 PM (Horario Corrido)'}
            </p>
          </div>

          {/* Column 4: Contact & Mini Map Illustration */}
          <div className="md:col-span-3 flex items-center justify-between gap-4 border-t md:border-t-0 pt-4 md:pt-0">
            <div className="space-y-1.5">
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-1.5 text-stone-900 hover:text-amber-800 font-black text-xs cursor-pointer"
              >
                <Phone size={13} className="text-amber-700" />
                <span>{data.whatsapp || '+51 984 123 456'}</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-2xs cursor-pointer"
              >
                Contactez-nous !
              </a>
            </div>

            {/* Mini Map Icon Illustration */}
            <div className="w-16 h-12 bg-amber-100 rounded-xl border border-amber-300 flex items-center justify-center text-amber-800 shrink-0 shadow-2xs">
              <MapPin size={20} className="animate-bounce" />
            </div>
          </div>

        </div>

        {/* Legal notice bottom */}
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-stone-200 text-center text-stone-400 text-[10px]">
          <p>© 2026 Cusco Creativos S.A.C. — Edición Patrimonial y Cultural. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* 11. STICKY MOBILE BOTTOM BAR */}
      {isMobile && (
        <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-amber-200 p-3 flex items-center justify-between gap-3 shadow-2xl">
          <div className="min-w-0">
            <span className="text-[10px] text-stone-500 font-bold block uppercase">Tarifa Cultural</span>
            <span className="text-base font-serif font-black text-stone-900">{data.price || 'S/ 85 PEN'}</span>
          </div>
          <div className="flex items-center gap-2">
            {isQuote ? (
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <FileText size={14} />
                <span>Cotizar</span>
              </button>
            ) : (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md flex items-center gap-1.5 cursor-pointer"
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
