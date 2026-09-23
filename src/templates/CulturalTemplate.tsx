'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Landmark, Compass, Users, CheckCircle2, MessageCircle, MapPin, Calendar, 
  Star, HelpCircle, FileText, ShieldCheck, XCircle, Backpack, Search, Mail, 
  Phone, ArrowRight, ChevronLeft, ChevronRight, BookOpen, Clock, Sparkles, 
  Navigation, Eye, Share2, Award, Check, Ticket, GraduationCap, Quote, Sun, Coins
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

// 5 Quick Access Circles overlapping the organic red curve (Matching user reference image in red style)
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

// Actualités / Heritage news items (Styled with the vibrant crimson red from reference image)
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

// Agenda events (Matching user reference image in red style)
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
    <div className="min-h-screen bg-[#FFFDF9] font-sans text-stone-800 selection:bg-red-800 selection:text-white">
      
      {/* 1. TOP HEADER OVER PANORAMIC SUNSET (HERITAGE RED PALETTE) */}
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
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-900/40 to-red-950/75" />
        </div>

        {/* Municipal / Heritage Navigation Bar */}
        <nav className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-white/15">
          {/* Official Emblem / Coat of arms */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/30 backdrop-blur-md border border-red-400/50 flex items-center justify-center text-red-200 shadow-md">
              <Landmark size={22} />
            </div>
            <div className="text-left leading-tight">
              <span className="block text-xs sm:text-sm font-black tracking-widest uppercase font-serif text-red-200">
                Qosqo Ancestral
              </span>
              <span className="text-[10px] text-stone-300 tracking-wider font-sans block">
                Patrimonio Cultural de la Humanidad
              </span>
            </div>
          </div>

          {/* Nav links */}
          {!isMobile && (
            <div className="hidden xl:flex items-center gap-6 text-[11px] font-bold tracking-wider uppercase text-stone-200">
              <a href="#actualites" className="hover:text-red-300 transition-colors">Crónicas</a>
              <a href="#agenda" className="hover:text-red-300 transition-colors">Agenda</a>
              <a href="#territorio" className="hover:text-red-300 transition-colors">Territorio</a>
              <a href="#itinerario" className="hover:text-red-300 transition-colors">Itinerario</a>
              <a href="#conseils" className="hover:text-red-300 transition-colors">Qué Llevar</a>
              <a href="#guide" className="hover:text-red-300 transition-colors">El Historiador</a>
              <a href="#livre-dor" className="hover:text-red-300 transition-colors">Libro de Oro</a>
              <a href="#contacto" className="hover:text-red-300 transition-colors">Oficina</a>
            </div>
          )}

          {/* Action CTA */}
          <div className="flex items-center gap-2">
            {isQuote ? (
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="bg-red-700 hover:bg-red-600 text-white px-4 sm:px-5 py-2 rounded-full font-bold text-xs shadow-md shadow-red-900/30 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FileText size={14} />
                <span>Cotizar Visita</span>
              </button>
            ) : (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-700 hover:bg-red-600 text-white px-4 sm:px-5 py-2 rounded-full font-bold text-xs shadow-md shadow-red-900/30 transition-all flex items-center gap-1.5 cursor-pointer"
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
          <p className="text-base sm:text-xl text-red-100 font-serif max-w-2xl mx-auto drop-shadow-md">
            {data.hero?.subtitle || 'Entre montañas sagradas y tradición milenaria, bienvenido a la capital arqueológica de América.'}
          </p>

          {/* 3 Circular Quick Action Icons (Center matching reference image with red centerpiece) */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <a
              href="#territorio"
              className="w-10 h-10 rounded-full bg-black/40 hover:bg-red-900/80 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
              title="Explorar el Territorio"
            >
              <Search size={16} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-red-700 hover:bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-900/40 transition-transform hover:scale-110 cursor-pointer"
              title="Escribir por WhatsApp"
            >
              <Mail size={16} />
            </a>
            <a
              href={`tel:${cleanPhone}`}
              className="w-10 h-10 rounded-full bg-black/40 hover:bg-red-900/80 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
              title="Llamar a la Oficina"
            >
              <Phone size={16} />
            </a>
          </div>
        </div>

        {/* Organic Wave Cut in Heritage Red (Exact shape matching reference image) */}
        <div className="absolute -bottom-1 inset-x-0 z-20 pointer-events-none">
          <svg viewBox="0 0 1440 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto preserve-3d">
            <path
              d="M0,80 C320,160 540,20 880,100 C1140,160 1340,90 1440,60 L1440,180 L0,180 Z"
              fill="#B91C1C"
              className="opacity-95"
            />
            <path
              d="M0,110 C360,180 620,60 980,130 C1220,180 1360,130 1440,110 L1440,180 L0,180 Z"
              fill="#FFFDF9"
            />
          </svg>
        </div>
      </header>

      {/* 2. OVERLAPPING 5 CIRCULAR QUICK ACCESS BADGES (Red Style) */}
      <section className="relative z-30 -mt-10 sm:-mt-14 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {QUICK_SERVICES.map((item, idx) => (
            <a
              key={idx}
              href={createWhatsAppLink(item.label)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-red-50/60 border border-stone-200/80 hover:border-red-400/80 rounded-3xl p-4 sm:p-5 shadow-lg shadow-red-950/5 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center group cursor-pointer"
            >
              {/* Circular Icon with rich red ring */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-50/80 border-2 border-red-300/90 flex items-center justify-center text-2xl sm:text-3xl mb-3 shadow-inner group-hover:scale-110 group-hover:bg-red-100 group-hover:border-red-500 transition-all">
                <span>{item.icon}</span>
              </div>
              <h3 className="font-serif font-black text-xs sm:text-sm text-stone-900 leading-tight group-hover:text-red-700 transition-colors">
                {item.label}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-stone-500 font-medium mt-1">
                {item.sub}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* 3. SECTION: ACTUALITÉS / PATRIMONIO VIVO (Red Badges & Links) */}
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
            className="bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
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
              <div className="absolute top-4 left-4 bg-red-700 text-white text-[11px] font-black px-3.5 py-1 rounded-full shadow-sm">
                Publicado: Temporada 2026
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-3">
              <h3 className="font-serif font-black text-xl sm:text-2xl text-stone-900 group-hover:text-red-700 transition-colors leading-tight">
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
                  className="inline-flex items-center gap-2 text-red-700 hover:text-red-800 font-bold text-xs sm:text-sm cursor-pointer group-hover:translate-x-1 transition-transform"
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
                className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs hover:shadow-md hover:border-red-300 transition-all text-left space-y-2 group"
              >
                <div className="inline-block bg-red-700 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {item.badge} • {item.date}
                </div>
                <h4 className="font-serif font-black text-base sm:text-lg text-stone-900 group-hover:text-red-700 transition-colors leading-snug">
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
                    className="inline-flex items-center gap-1.5 text-red-700 hover:text-red-800 font-bold text-xs cursor-pointer group-hover:translate-x-1 transition-transform"
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

      {/* 4. SECTION: AGENDA (Red Style) */}
      <section id="agenda" className="py-16 sm:py-24 px-4 sm:px-8 bg-red-50/30 border-y border-red-200/50">
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
                  className="bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
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
                  className="w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center shadow-xs hover:bg-red-800 active:scale-90 transition-all cursor-pointer"
                  title="Anterior"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveEventIndex(prev => (prev === AGENDA_EVENTS.length - 1 ? 0 : prev + 1))}
                  className="w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center shadow-xs hover:bg-red-800 active:scale-90 transition-all cursor-pointer"
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
                    className="bg-white rounded-3xl overflow-hidden border border-red-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group text-left"
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
                        
                        {/* Red Event Date Badge */}
                        <div className="absolute bottom-3 left-3 bg-red-700 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-sm backdrop-blur-xs">
                          {event.date}
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <h4 className="font-serif font-black text-base sm:text-lg text-stone-900 group-hover:text-red-700 transition-colors leading-tight">
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
                        className="inline-flex items-center gap-1.5 text-red-700 hover:text-red-800 font-bold text-xs cursor-pointer group-hover:translate-x-1 transition-transform"
                      >
                        <span className="w-4 h-4 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-[10px]">➤</span>
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

      {/* 5. SECTION: LE TERRITOIRE / EL TERRITORIO SAGRADO (Red Button & Red Map Accent) */}
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
          <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-[2px]" />
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
                className="bg-red-700 hover:bg-red-600 text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-xl shadow-red-950/50 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>VOIR LA CARTE INTERACTIVE</span>
                <Navigation size={15} />
              </a>
            </div>
          </div>

          {/* Right Column: Stylized Territory Map Silhouette with Route Pins */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[420px] bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 border-2 border-red-500/30 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between text-xs font-bold text-red-200 pb-2 border-b border-white/10">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-red-500" />
                  Cartographie des Temples
                </span>
                <span className="text-[10px] bg-red-600/30 text-red-200 px-2 py-0.5 rounded-full border border-red-500/30">
                  GPS Cusco
                </span>
              </div>

              {/* Interactive Point Badges */}
              <div className="space-y-2.5 text-left text-xs">
                <div className="bg-white/10 hover:bg-white/20 p-2.5 rounded-xl border border-white/10 flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-700 text-white font-black text-[10px] flex items-center justify-center">1</span>
                    <span className="font-bold text-white">Qorikancha (Temple du Soleil)</span>
                  </div>
                  <span className="text-[10px] text-red-300">3,400 m</span>
                </div>

                <div className="bg-white/10 hover:bg-white/20 p-2.5 rounded-xl border border-white/10 flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-700 text-white font-black text-[10px] flex items-center justify-center">2</span>
                    <span className="font-bold text-white">Sacsayhuamán Megalithique</span>
                  </div>
                  <span className="text-[10px] text-red-300">3,700 m</span>
                </div>

                <div className="bg-white/10 hover:bg-white/20 p-2.5 rounded-xl border border-white/10 flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-700 text-white font-black text-[10px] flex items-center justify-center">3</span>
                    <span className="font-bold text-white">Qenqo & Puka Pukara</span>
                  </div>
                  <span className="text-[10px] text-red-300">3,800 m</span>
                </div>

                <div className="bg-white/10 hover:bg-white/20 p-2.5 rounded-xl border border-white/10 flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-700 text-white font-black text-[10px] flex items-center justify-center">4</span>
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

      {/* 6. TOUR ITINERARY & INCLUSIONS (Red Accents) */}
      {data.itinerary && data.itinerary.length > 0 && (
        <section id="itinerario" className="py-16 sm:py-24 px-4 sm:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold text-red-800 uppercase tracking-widest bg-red-100 border border-red-200 px-3 py-1 rounded-full">
              Itinéraire Officiel DIRCETUR
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-stone-900">
              Ruta Histórica Paso a Paso
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Organizado con tiempos holgados para apreciación fotográfica y explicación histórica.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5 relative before:absolute before:inset-0 before:left-4 sm:before:left-5 before:w-0.5 before:bg-red-200">
            {data.itinerary.map((item, idx) => (
              <div key={idx} className="relative flex items-start gap-4 pl-1 sm:pl-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-700 text-white font-serif font-black flex items-center justify-center text-xs shrink-0 shadow-md ring-4 ring-white z-10">
                  {idx + 1}
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 w-full shadow-xs text-left">
                  <span className="text-[11px] uppercase font-black tracking-wider text-red-800 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-md inline-block mb-1.5">
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
                <div key={idx} className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-red-300 shadow-2xs flex items-start gap-3.5 text-left transition-colors">
                  <CheckCircle2 className="text-red-700 shrink-0 mt-0.5" size={20} />
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



      {/* 9. CONSEILS PRATIQUES / QUÉ LLEVAR EN LA MOCHILA CULTURAL */}
      <section id="conseils" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-red-800 bg-red-100 border border-red-200 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5">
            <Backpack size={13} />
            <span>Recommandations des Historiens</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-stone-900">
            Préparer sa Visite : Ce qu&apos;il faut emporter
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Pour apprécier le patrimoine dans les meilleures conditions de confort et de sécurité à 3 400 mètres d&apos;altitude.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {[
            {
              icon: '👟',
              title: 'Chaussures à bonne adhérence',
              subtitle: 'Sol pavé & escaliers incas',
              desc: 'Les dalles de Hatun Rumiyoc et les chemins de pierre de Sacsayhuamán sont polis par les siècles. Privilégiez des baskets de marche ou souliers à semelle adhérente.'
            },
            {
              icon: '☀️',
              title: 'Protection solaire maximale',
              subtitle: 'Indice UV d\'altitude',
              desc: 'Sous le ciel limpide des Andes, la réverbération solaire est intense même par temps voilé. Chapeau à larges bords, lunettes UV400 et écran total indispensables.'
            },
            {
              icon: '💵',
              title: 'Espèces en Soles (PEN)',
              subtitle: 'Guichets & artisanat local',
              desc: 'Certains postes de contrôle archéologiques et les tisseuses traditionnelles ne disposent pas de terminal carte. Prévoyez 100 à 150 PEN en liquide.'
            },
            {
              icon: '🧥',
              title: 'Vêtements en plusieurs couches',
              subtitle: 'Climat thermique andin',
              desc: 'Le soleil chauffe à midi (20°C), mais dès 16h30 le vent frais souffle sur les crêtes de Sacsayhuamán (10°C). Prévoyez un pull chaud et une veste coupe-vent.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-stone-200/80 hover:border-red-400 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  <span>{item.icon}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif font-black text-stone-900 text-base leading-snug mt-0.5">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-bold">
                <span>CONSEIL N° {idx + 1}</span>
                <span className="text-red-700">✓ Recommandé</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. LE MÉDIATEUR DU PATRIMOINE / PERFIL DEL GUÍA HISTORIADOR */}
      <section id="guide" className="py-16 sm:py-24 px-4 sm:px-8 bg-red-50/40 border-t border-red-200/60">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-red-200 shadow-xl overflow-hidden relative text-left">
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-100/50 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              {/* Photo & Badge */}
              <div className="md:col-span-5 flex flex-col items-center text-center space-y-3">
                <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-3xl overflow-hidden shadow-xl border-4 border-red-100 bg-stone-100">
                  <Image
                    src={data.guideAvatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop'}
                    alt={data.guideName || 'Guide Conférencier'}
                    fill
                    sizes="250px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 inset-x-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold py-1 px-2 rounded-xl border border-white/20">
                    {data.guideCert || 'Carnet DIRCETUR N° 04821'}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-[11px] font-black uppercase tracking-wider">
                  <GraduationCap size={14} />
                  <span>Historien & Archéologue</span>
                </div>
              </div>

              {/* Bio & Academic Credentials */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <span className="text-xs font-serif italic text-red-700 font-bold block">
                    Votre Médiateur du Patrimoine
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 leading-tight">
                    {data.guideName || 'Lic. Marco Antonio Quispe'}
                  </h3>
                  <span className="text-xs text-stone-500 font-medium block mt-0.5">
                    Membre actif de l&apos;Ordre des Licenciés en Tourisme du Pérou (COLTUR Cusco)
                  </span>
                </div>

                {/* Quote */}
                <div className="relative pl-6 py-2 border-l-2 border-red-700 bg-red-50/50 rounded-r-2xl pr-4">
                  <Quote size={20} className="text-red-300 absolute -top-2 left-2 opacity-50" />
                  <p className="text-xs sm:text-sm font-serif italic text-stone-800 leading-relaxed">
                    « Transmettre la mémoire des pierres n&apos;est pas une récitation de dates : c&apos;est une immersion vivante dans la cosmogonie de nos ancêtres. Chaque temple que nous foulons raconte l&apos;équilibre sacré entre l&apos;homme et la Pachamama. »
                  </p>
                </div>

                {/* Badges / Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-stone-700">
                  <div className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                    <span className="text-base">🎓</span>
                    <span>Diplômé de l&apos;UNSAAC Cusco</span>
                  </div>
                  <div className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                    <span className="text-base">🗣️</span>
                    <span>{data.guideLanguages || 'Espagnol • Quechua • Français • English'}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                    <span className="text-base">🏛️</span>
                    <span>12 ans d&apos;expertise archéologique</span>
                  </div>
                  <div className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                    <span className="text-base">🛡️</span>
                    <span>Secourisme & Altitude certifié</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle size={16} />
                    <span>Échanger directement avec le guide</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. PINTEREST PINBOARD (PRO & ADVANCE) */}
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

      {/* 12. LIVRE D'OR DU PATRIMOINE (RESEÑAS & TESTIMONIOS VERIFICADOS) */}
      <section id="livre-dor" className="py-16 sm:py-24 px-4 sm:px-8 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
          {/* Header & Rating Summary */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8 text-left">
            <div className="space-y-2">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-red-800 bg-red-100 border border-red-200 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5">
                <Star size={13} className="fill-red-700 text-red-700" />
                <span>Avis Vérifiés des Visiteurs</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-black italic text-stone-900">
                Le Livre d&apos;or du Patrimoine
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-xl leading-relaxed">
                Témoignages de passionnés d&apos;histoire, d&apos;universitaires et de familles ayant vécu l&apos;immersion culturelle à Cusco.
              </p>
            </div>

            {/* Big Score Card */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4 shrink-0">
              <div className="text-center">
                <span className="text-3xl sm:text-4xl font-serif font-black text-red-900 block leading-none">
                  4.9
                </span>
                <span className="text-[10px] text-stone-400 font-bold uppercase mt-1 block">Sur 5.0</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-800 block">184 avis vérifiés</span>
                <span className="text-[10px] text-emerald-600 font-bold block">✓ 100% Retours Positifs</span>
              </div>
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                name: 'Jean-Luc & Françoise Moreau',
                origin: '🇫🇷 Lyon, France',
                date: 'Visite effectuée le 14 Septembre 2026',
                stars: 5,
                comment: 'Une visite magistrale qui dépasse de loin tous les circuits conventionnels. Les explications sur l\'ingénierie parasismique de Sacsayhuamán et la symbolique du temple du Soleil étaient d\'une rigueur absolue. Un moment inoubliable.'
              },
              {
                name: 'Dra. Elena Santillán',
                origin: '🇪🇸 Madrid, Espagne',
                date: 'Visite effectuée le 02 Août 2026',
                stars: 5,
                comment: 'Como docente de historia del arte, buscaba un guiado sin mitos inventados. La preparación académica del guía y su respeto por las fuentes cronistas coloniales me pareció extraordinaria. Diez sobre diez en puntualidad y conocimiento.'
              },
              {
                name: 'Michael & Sarah Jenkins',
                origin: '🇺🇸 Boston, USA',
                date: 'Visite effectuée le 19 Juillet 2026',
                stars: 5,
                comment: 'The best tour we took in Peru! Small group, zero rush, crystal-clear audio receivers, and fascinating insights into Inca astronomy that you simply cannot get on standard commercial buses.'
              }
            ].map((review, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 hover:border-red-400/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(review.stars)].map((_, i) => (
                        <Star key={i} size={14} className="fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-[10px] text-stone-400 font-mono">{review.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm font-serif italic text-stone-700 leading-relaxed">
                    « {review.comment} »
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-black text-stone-900 text-xs sm:text-sm group-hover:text-red-700 transition-colors">
                      {review.name}
                    </h4>
                    <span className="text-[11px] text-stone-500 font-medium block">
                      {review.origin}
                    </span>
                  </div>
                  <span className="w-7 h-7 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Sello de confianza */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-600 font-medium">
            <span className="flex items-center gap-1.5 font-bold text-stone-900">
              <Award size={16} className="text-red-700" />
              Certificat d&apos;Excellence DIRCETUR
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-600" />
              Avis 100% Authentifiés par WhatsApp & Voucher
            </span>
            <span>•</span>
            <span className="text-stone-500">
              Registre officiel des guides conférenciers du Pérou
            </span>
          </div>
        </div>
      </section>

      {/* 13. TOUR SUPPORT & FAQS */}
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

      {/* 10. MUNICIPAL & HERITAGE FOOTER BLOCK (Red Border & Accents) */}
      <footer id="contacto" className="bg-white border-t-2 border-red-700 py-10 px-4 sm:px-8 text-stone-700 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
          
          {/* Column 1: Emblem & Town Name */}
          <div className="md:col-span-3 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-100 border border-red-300 text-red-800 flex items-center justify-center shrink-0">
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
                className="flex items-center gap-1.5 text-stone-900 hover:text-red-700 font-black text-xs cursor-pointer"
              >
                <Phone size={13} className="text-red-700" />
                <span>{data.whatsapp || '+51 984 123 456'}</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-700 hover:bg-red-800 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-2xs cursor-pointer"
              >
                Contactez-nous !
              </a>
            </div>

            {/* Mini Map Icon Illustration */}
            <div className="w-16 h-12 bg-red-100 rounded-xl border border-red-300 flex items-center justify-center text-red-800 shrink-0 shadow-2xs">
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
        <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-red-200 p-3 flex items-center justify-between gap-3 shadow-2xl">
          <div className="min-w-0">
            <span className="text-[10px] text-stone-500 font-bold block uppercase">Tarifa Cultural</span>
            <span className="text-base font-serif font-black text-red-900">{data.price || 'S/ 85 PEN'}</span>
          </div>
          <div className="flex items-center gap-2">
            {isQuote ? (
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="bg-red-700 hover:bg-red-600 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <FileText size={14} />
                <span>Cotizar</span>
              </button>
            ) : (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-700 hover:bg-red-600 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md flex items-center gap-1.5 cursor-pointer"
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
