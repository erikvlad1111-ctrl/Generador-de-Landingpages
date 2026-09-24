import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Crown, Sparkles, ShieldCheck, Clock, Award, PhoneCall, MessageCircle, 
  FileText, Star, Calendar, XCircle, Backpack, Gem, Compass, CheckCircle2,
  ChevronRight, ArrowRight
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

export default function PremiumTemplate({ data, viewMode = 'desktop' }: TemplateProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const isQuote = data.objective === 'quote';
  const isMobile = viewMode === 'mobile';

  const cleanPhone = (data.whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const tier = data.tier || 'advance';
  const isFree = tier === 'free';
  const isPro = tier === 'pro';
  const isAdvance = tier === 'advance';
  const encodedMsg = encodeURIComponent(`Hola ${data.guideName || 'Cusco Creativos'}, estoy interesado en la experiencia VIP "${data.name}". ¿Podrían brindarme disponibilidad?`);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  const heroImg = data.heroImage || 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop';
  const gallery1 = data.galleryImages?.[0] || 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop';

  return (
    <div className="min-h-screen bg-[#070709] font-sans text-neutral-100 selection:bg-amber-500 selection:text-black relative overflow-x-hidden">
      
      {/* Dynamic Ambient Luxury Lighting Backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-amber-500/12 via-amber-600/5 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[45%] -right-40 w-[600px] h-[600px] bg-amber-700/6 blur-[140px] rounded-full" />
        <div className="absolute bottom-20 -left-40 w-[600px] h-[600px] bg-amber-500/5 blur-[140px] rounded-full" />
      </div>

      {/* 1. ULTRA LUXURY TOP HEADER */}
      <header className="sticky top-0 w-full z-40 bg-[#070709]/85 backdrop-blur-xl border-b border-amber-500/20 px-4 sm:px-8 py-3.5 sm:py-4.5 flex justify-between items-center gap-4 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400/25 via-amber-500/10 to-transparent border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
            <Crown size={isMobile ? 18 : 20} className="text-amber-300 drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]" />
          </div>
          <div className="min-w-0">
            <span className={`${isMobile ? 'text-xs' : 'text-xs sm:text-sm md:text-base'} font-serif tracking-[0.2em] uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 truncate block`}>
              Cusco Luxury Collection
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-amber-400/70 font-semibold block font-mono">
              Private Concierge & Expeditions
            </span>
          </div>
        </div>

        {!isMobile && (
          <nav className="hidden lg:flex items-center gap-7 text-[11px] uppercase tracking-[0.2em] text-neutral-400 shrink-0 font-medium">
            <a href="#itinerario" className="hover:text-amber-300 transition-colors relative py-1 group">
              La Experiencia
              <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all group-hover:w-full" />
            </a>
            <a href="#privilegios" className="hover:text-amber-300 transition-colors relative py-1 group">
              Privilegios VIP
              <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all group-hover:w-full" />
            </a>
            <a href="#galeria" className="hover:text-amber-300 transition-colors relative py-1 group">
              Galería Exclusiva
              <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all group-hover:w-full" />
            </a>
            <a href="#soporte-faq" className="hover:text-amber-300 transition-colors relative py-1 group">
              Soporte & FAQ
              <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 transition-all group-hover:w-full" />
            </a>
          </nav>
        )}

        <div className="flex items-center gap-2.5 shrink-0">
          {data.objective === 'both' ? (
            <div className="flex items-center gap-2">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-neutral-950 px-3 sm:px-4 py-2 rounded-full font-extrabold text-[11px] sm:text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 hover:scale-102 cursor-pointer"
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-neutral-950 px-3 sm:px-4 py-2 rounded-full font-extrabold text-[11px] sm:text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-400/25 hover:scale-102 cursor-pointer"
              >
                <FileText size={14} />
                <span>Cotizar</span>
              </button>
            </div>
          ) : isQuote ? (
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-neutral-950 px-4 sm:px-5 py-2.5 rounded-full font-extrabold text-[11px] sm:text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-400/25 hover:scale-102 cursor-pointer"
            >
              <FileText size={15} />
              <span>Solicitar Cotización</span>
            </button>
          ) : (
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-neutral-950 px-4 sm:px-5 py-2.5 rounded-full font-extrabold text-[11px] sm:text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-400/25 hover:scale-102 cursor-pointer"
            >
              <MessageCircle size={15} />
              <span>Reserva VIP</span>
            </a>
          )}
        </div>
      </header>

      {/* 2. MAJESTIC HERO SECTION WITH METALLIC GOLD GRACE */}
      <section className={`relative ${isMobile ? 'py-14 min-h-[520px]' : 'py-24 min-h-[88vh]'} flex items-center justify-center overflow-hidden z-10`}>
        {/* Cinematic Vignette Layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/70 to-[#070709]/40 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#070709_90%)] z-10 opacity-80" />
        
        <Image 
          src={heroImg} 
          alt={data.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50 scale-105 transition-transform duration-1000 ease-out"
        />
        
        <div className={`relative z-20 text-center text-white ${isMobile ? 'px-4' : 'px-6'} max-w-5xl mx-auto flex flex-col items-center`}>
          
          {/* Badge VIP con doble aro dorado */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-[11px] tracking-[0.25em] uppercase font-bold mb-5 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Sparkles size={13} className="text-amber-400 animate-pulse" />
            <span>{data.hero?.badge || 'Experiencia Exclusiva VIP'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          </div>

          {/* Título en Oro Champagne Editorial */}
          <h1 className={`${isMobile ? 'text-2xl sm:text-3xl leading-tight mb-4' : 'text-4xl sm:text-6xl md:text-7xl leading-[1.12] mb-6'} font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-100 to-amber-300 drop-shadow-sm font-normal`}>
            {data.hero?.title}
          </h1>

          {/* Divisor ornamental dorado */}
          <div className="flex items-center gap-3 my-2 opacity-80">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/60" />
            <Crown size={14} className="text-amber-400" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/60" />
          </div>

          {/* Subtítulo pulido */}
          <p className={`${isMobile ? 'text-xs leading-relaxed mb-8' : 'text-base sm:text-lg md:text-xl mb-10 leading-relaxed'} text-neutral-300 max-w-2xl font-light tracking-wide`}>
            {data.hero?.subtitle}
          </p>

          {/* CTA & Precio en marco biselado */}
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-col sm:flex-row'} items-center gap-4 w-full max-w-xl justify-center`}>
            {data.objective === 'both' ? (
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white ${isMobile ? 'w-full py-3.5 text-xs' : 'text-sm px-7 py-4'} rounded-full font-bold transition-all shadow-xl shadow-emerald-500/25 hover:scale-105 flex items-center justify-center gap-2.5 cursor-pointer`}
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp VIP Concierge</span>
                </a>
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className={`bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-neutral-950 ${isMobile ? 'w-full py-3.5 text-xs' : 'text-sm px-7 py-4'} rounded-full font-extrabold transition-all shadow-xl shadow-amber-400/30 hover:scale-105 flex items-center justify-center gap-2.5 cursor-pointer`}
                >
                  <FileText size={18} />
                  <span>Cotizar Privado</span>
                </button>
              </div>
            ) : isQuote ? (
              <button
                onClick={() => setIsQuoteOpen(true)}
                className={`bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-neutral-950 ${isMobile ? 'w-full py-3.5 text-sm' : 'text-base px-9 py-4'} rounded-full font-extrabold transition-all shadow-[0_8px_30px_rgba(245,158,11,0.35)] hover:scale-105 flex items-center justify-center gap-2.5 cursor-pointer`}
              >
                <FileText size={19} />
                <span>{data.hero?.cta || 'Solicitar Cotización Privada'}</span>
              </button>
            ) : (
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-neutral-950 ${isMobile ? 'w-full py-3.5 text-sm' : 'text-base px-9 py-4'} rounded-full font-extrabold transition-all shadow-[0_8px_30px_rgba(245,158,11,0.35)] hover:scale-105 flex items-center justify-center gap-2.5 cursor-pointer`}
              >
                <MessageCircle size={19} />
                <span>{data.hero?.cta || 'Consultar Disponibilidad VIP'}</span>
              </a>
            )}

            {/* Price Box biselado */}
            <div className={`bg-neutral-900/80 backdrop-blur-md rounded-2xl border border-amber-500/30 px-5 py-3 ${isMobile ? 'w-full text-center' : 'text-left'} shadow-xl`}>
              <p className="text-[10px] text-amber-400 uppercase tracking-[0.2em] font-semibold">Tarifa Desde</p>
              <p className={`${isMobile ? 'text-lg' : 'text-xl'} font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200`}>
                {data.price || '$450 USD'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE FLOATING PILLARS OF EXCELLENCE (Glassmorphism & Gold Halo) */}
      <section className={`relative z-30 ${isMobile ? 'mt-4 px-3' : '-mt-12 max-w-5xl mx-auto px-4'}`}>
        <div className={`bg-gradient-to-b from-neutral-900/95 via-neutral-900/80 to-[#0c0c10]/95 backdrop-blur-xl rounded-3xl border border-amber-500/30 ${isMobile ? 'p-4 grid grid-cols-1 gap-3.5' : 'p-7 grid grid-cols-1 md:grid-cols-3 gap-6'} shadow-[0_20px_50px_rgba(0,0,0,0.8)]`}>
          
          <div className="flex items-center gap-4 p-2 rounded-2xl group hover:bg-amber-500/5 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Award size={22} className="text-amber-400 drop-shadow-[0_2px_6px_rgba(245,158,11,0.4)]" />
            </div>
            <div>
              <p className="text-[10px] text-amber-400/80 uppercase tracking-[0.2em] font-bold font-mono">Guía de Élite</p>
              <p className="font-serif font-bold text-neutral-100 text-sm sm:text-base leading-snug">{data.guideName || 'Historiador Oficial'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2 rounded-2xl group hover:bg-amber-500/5 transition-colors border-y md:border-y-0 md:border-x border-neutral-800/80">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Clock size={22} className="text-amber-400 drop-shadow-[0_2px_6px_rgba(245,158,11,0.4)]" />
            </div>
            <div>
              <p className="text-[10px] text-amber-400/80 uppercase tracking-[0.2em] font-bold font-mono">Duración & Ritmo</p>
              <p className="font-serif font-bold text-neutral-100 text-sm sm:text-base leading-snug">{data.duration || '2 Días / 1 Noche'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2 rounded-2xl group hover:bg-amber-500/5 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <ShieldCheck size={22} className="text-amber-400 drop-shadow-[0_2px_6px_rgba(245,158,11,0.4)]" />
            </div>
            <div>
              <p className="text-[10px] text-amber-400/80 uppercase tracking-[0.2em] font-bold font-mono">Garantía VIP</p>
              <p className="font-serif font-bold text-neutral-100 text-sm sm:text-base leading-snug">100% Personalizado</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. TRUST BADGES - PRO & ADVANCE ONLY */}
      {(isPro || isAdvance) && data.trustBadges && data.trustBadges.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 mt-8 relative z-20">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
            {data.trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-gradient-to-r from-neutral-900/90 to-neutral-900/60 border border-amber-500/30 text-amber-200 text-xs px-4 py-2 rounded-full font-medium shadow-sm backdrop-blur-md hover:border-amber-400/50 transition-colors">
                <Crown size={12} className="text-amber-400 shrink-0" />
                <span className="tracking-wide text-[11px] sm:text-xs">{badge}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. ABOUT SECTION - ART GALLERY PASSEPARTOUT PRESENTATION */}
      {!isFree && (
        <section id="itinerario" className={`${isMobile ? 'py-14 px-4' : 'py-24 px-8'} max-w-6xl mx-auto relative z-10`}>
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'md:grid-cols-2 gap-16'} items-center`}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] uppercase tracking-[0.2em] font-bold font-mono">
                <Gem size={12} className="text-amber-400" />
                <span>Exclusividad & Privacidad Total</span>
              </div>
              <h2 className={`${isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl md:text-5xl'} font-serif font-bold text-neutral-100 leading-tight`}>
                {data.about?.title}
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                {data.about?.content}
              </p>

              {/* Concierge Direct Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-neutral-900/90 to-neutral-950 border border-amber-500/25 flex items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-sm shrink-0">
                    <PhoneCall size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-amber-400 uppercase tracking-widest font-mono font-bold">Conserjería Privada 24/7</p>
                    <p className="font-bold text-sm text-neutral-100">{data.whatsapp || '+51 984 123 456'}</p>
                  </div>
                </div>
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-bold transition-colors shrink-0"
                >
                  Contactar →
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
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-amber-500/30 text-xs text-neutral-300">
                  <span className="font-serif font-bold text-amber-300 block mb-0.5">Acceso Preferencial Exclusivo</span>
                  <span>Sin multitudes, diseñado al ritmo de tu grupo familiar.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. ITINERARY TIMELINE (Golden Path Design) */}
      {data.itinerary && data.itinerary.length > 0 && (
        <section id="itinerario-timeline" className={`${isMobile ? 'py-12 px-4' : 'py-24 px-8'} bg-gradient-to-b from-[#0a0a0e] via-[#070709] to-[#0a0a0e] border-y border-amber-500/15 relative z-10`}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-[0.25em] block mb-2 font-mono">Cronograma de Lujo</span>
              <h2 className={`${isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-5xl'} font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-200`}>
                Itinerario Exclusivo
              </h2>
            </div>

            <div className="space-y-6 sm:space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-5 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-amber-500/40 before:to-amber-600/10">
              {data.itinerary.map((item, idx) => (
                <div key={idx} className="relative flex items-start gap-4 sm:gap-7 pl-1 sm:pl-2 group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 text-neutral-950 font-black flex items-center justify-center text-xs sm:text-sm shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.5)] ring-4 ring-[#070709] z-10 group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>
                  <div className="bg-gradient-to-b from-neutral-900/90 to-neutral-950 border border-neutral-800/90 group-hover:border-amber-500/40 rounded-3xl p-5 sm:p-7 w-full shadow-xl transition-all">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-amber-300 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-md inline-block mb-2.5 font-mono">
                      {item.step}
                    </span>
                    <h3 className="font-serif font-bold text-neutral-100 text-base sm:text-xl mb-2">{item.title}</h3>
                    <p className="text-neutral-400 font-light text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. PRIVILEGIOS & FEATURES (Numbered Gold Membership Cards) */}
      {!isFree && (
        <section id="privilegios" className={`${isMobile ? 'py-12 px-4' : 'py-24 px-8'} max-w-6xl mx-auto relative z-10`}>
          <div className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-[0.25em] block mb-2 font-mono">Estándares Presidenciales</span>
            <h2 className={`${isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-5xl'} font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-200`}>
              {data.features?.title || 'Privilegios de la Experiencia'}
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
                      {title}
                    </h3>
                  </div>

                  <p className="text-neutral-400 font-light text-xs sm:text-sm leading-relaxed pl-0 sm:pl-13">
                    {desc || 'Atención premium orientada a la máxima comodidad.'}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 8. LOGISTICS: EXCLUSIONES & EQUIPAJE VIP */}
      {((data.notIncluded && data.notIncluded.length > 0) || (data.whatToBring && data.whatToBring.length > 0)) && (
        <section className={`${isMobile ? 'py-10 px-4' : 'py-20 px-8'} bg-[#0a0a0e] border-y border-neutral-900 relative z-10`}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Qué NO incluye */}
            {data.notIncluded && data.notIncluded.length > 0 && (
              <div className="bg-neutral-900/80 p-6 sm:p-7 rounded-3xl border border-rose-500/20 shadow-xl">
                <div className="flex items-center gap-2.5 text-rose-300 font-bold text-sm sm:text-base mb-4 font-serif">
                  <XCircle size={20} className="text-rose-400 shrink-0" />
                  <h3>No Incluido en Tarifa</h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400 font-light">
                  {data.notIncluded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-rose-400 font-bold shrink-0">✕</span>
                      <span>{item}</span>
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
                  <h3>Recomendaciones de Equipaje</h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 font-light">
                  {data.whatToBring.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-amber-400 font-bold shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 9. PINTEREST PINBOARD GALLERY */}
      {!isFree && (
        <PinterestPinboard
          images={data.galleryImages}
          destination={data.destination || 'Cusco VIP'}
          tourName={data.name || data.hero?.title || 'Experiencia Premium'}
          tier={tier}
          theme="premium"
          isMobile={isMobile}
        />
      )}

      {/* 10. TESTIMONIALS - ADVANCE ONLY */}
      {isAdvance && data.testimonials && data.testimonials.length > 0 && (
        <section className={`${isMobile ? 'py-12 px-4' : 'py-20 px-8'} bg-[#070709] border-b border-neutral-900 relative z-10`}>
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-400 block mb-2 font-semibold font-mono">Testimonios Exclusivos</span>
            <h2 className={`${isMobile ? 'text-2xl mb-6' : 'text-3xl sm:text-4xl mb-14'} font-serif font-bold text-white`}>
              Huéspedes Satisfechos
            </h2>
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-2 gap-8'}`}>
              {data.testimonials.map((t, idx) => (
                <div key={idx} className={`bg-gradient-to-b from-neutral-900/90 to-neutral-950 ${isMobile ? 'p-5' : 'p-7'} rounded-3xl border border-amber-500/25 text-left shadow-xl relative`}>
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-neutral-300 text-xs sm:text-sm font-light italic mb-4 leading-relaxed">&quot;{t.comment}&quot;</p>
                  <div className="border-t border-neutral-800/80 pt-3">
                    <h4 className="font-serif font-bold text-amber-300 text-xs sm:text-sm">{t.name}</h4>
                    <p className="text-[11px] text-neutral-500 font-mono">{t.origin}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. TOUR SUPPORT & FAQS */}
      <TourSupportAndFaqs
        faqs={data.faqs}
        tourName={data.name || data.hero?.title || 'Experiencia VIP'}
        whatsapp={data.whatsapp}
        guideName={data.guideName}
        destination={data.destination || 'Cusco'}
        tier={tier}
        theme="premium"
        isMobile={isMobile}
      />

      {/* 12. MAJESTIC FINAL CALL TO ACTION */}
      {!isFree && (
        <section id="contacto" className={`${isMobile ? 'py-14 px-4' : 'py-24 px-8'} text-center bg-gradient-to-b from-[#0a0a0e] via-[#070709] to-black relative z-10 overflow-hidden`}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mx-auto mb-4 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
              <Crown size={28} className="text-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]" />
            </div>

            <h2 className={`${isMobile ? 'text-2xl mb-3' : 'text-3xl sm:text-5xl mb-5'} font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-300 leading-tight`}>
              ¿Listo para vivir una expedición inolvidable?
            </h2>

            <p className={`${isMobile ? 'text-xs mb-8' : 'text-base sm:text-lg mb-10'} text-neutral-300 font-light max-w-xl mx-auto leading-relaxed`}>
              Comunícate de inmediato con el concierge oficial y reserva tus accesos preferentes con confirmación directa y atención VIP.
            </p>

            <div className="flex justify-center">
              {isQuote ? (
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className={`inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-neutral-950 font-extrabold ${isMobile ? 'w-full py-4 text-sm' : 'px-10 py-4.5 text-base'} rounded-full shadow-[0_10px_35px_rgba(245,158,11,0.4)] transition-all hover:scale-105 cursor-pointer`}
                >
                  <FileText size={19} />
                  <span>Solicitar Cotización Privada</span>
                </button>
              ) : (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold ${isMobile ? 'w-full py-4 text-sm' : 'px-10 py-4.5 text-base'} rounded-full shadow-[0_10px_35px_rgba(16,185,129,0.35)] transition-all hover:scale-105 cursor-pointer`}
                >
                  <MessageCircle size={19} />
                  <span>Hablar por WhatsApp con {data.guideName || 'el Guía'}</span>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 text-center text-neutral-500 text-xs border-t border-neutral-900 relative z-10 bg-[#070709]">
        <p className="tracking-wide">© 2026 Cusco Creativos S.A.C. — Edición Luxury Collection.</p>
      </footer>

      {/* Quote Modal */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} landing={data} />
    </div>
  );
}
