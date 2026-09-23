'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Landmark, Compass, Users, CheckCircle2, MessageCircle, MapPin, Calendar, 
  Star, HelpCircle, FileText, ShieldCheck, XCircle, Backpack, Search, Mail, 
  Phone, ArrowRight, ChevronLeft, ChevronRight, BookOpen, Clock, Sparkles, 
  Navigation, Eye, Share2, Award, Check, Ticket, GraduationCap, Quote, Sun, Coins, Globe
} from 'lucide-react';
import { LandingData, LanguageType } from '@/types/landing';
import QuoteModal from '@/components/common/QuoteModal';
import TourSupportAndFaqs from '@/components/common/TourSupportAndFaqs';
import PinterestPinboard from '@/components/common/PinterestPinboard';
import { CULTURAL_I18N } from './culturalI18n';

interface TemplateProps {
  data: LandingData;
  isLive?: boolean;
  viewMode?: 'desktop' | 'tablet' | 'mobile';
}

const AGENDA_IMAGES = [
  'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=600&auto=format&fit=crop'
];

export default function CulturalTemplate({ data, viewMode = 'desktop' }: TemplateProps) {
  const [currentLang, setCurrentLang] = useState<LanguageType>(data.language || 'es');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  const t = CULTURAL_I18N[currentLang] || CULTURAL_I18N.es;

  const isQuote = data.objective === 'quote';
  const isMobile = viewMode === 'mobile';

  const cleanPhone = (data.whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const tier = data.tier || 'advance';
  const isFree = tier === 'free';

  const encodedMsg = encodeURIComponent(
    `Hola ${data.guideName || 'Guía Historiador'}, deseo información y disponibilidad para el tour cultural "${data.name || data.hero?.title || 'Cusco Ancestral'}".`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  const createWhatsAppLink = (customText: string) => {
    const msg = encodeURIComponent(`Hola ${data.guideName || 'Guía'}, me interesa: "${customText}". ¿Qué horarios tienen disponibles?`);
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  // Grand panoramic sunset hero photo over mountain valley
  const heroSunsetBg = data.heroImage || 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop';
  const featuredNewsPhoto = data.galleryImages?.[0] || 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1200&auto=format&fit=crop';

  return (
    <div className="min-h-screen bg-[#FFFDF9] font-sans text-stone-800 selection:bg-red-800 selection:text-white">
      
      {/* 1. TOP HEADER OVER PANORAMIC SUNSET (HERITAGE RED PALETTE WITH DYNAMIC ENTRANCE) */}
      <header className="relative bg-stone-900 text-white overflow-hidden group">
        {/* Panoramic Background Image with subtle Ken Burns effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={heroSunsetBg}
            alt={data.name || 'Cusco Ancestral'}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-85 brightness-90 transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          {/* Subtle gradient overlay to enhance typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-900/40 to-red-950/75" />
        </div>

        {/* Municipal / Heritage Navigation Bar */}
        <nav className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-white/15">
          {/* Official Emblem / Coat of arms */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/30 backdrop-blur-md border border-red-400/50 flex items-center justify-center text-red-200 shadow-md shrink-0 animate-soft-float">
              <Landmark size={22} />
            </div>
            <div className="text-left leading-tight">
              <span className="block text-xs sm:text-sm font-black tracking-widest uppercase font-serif text-red-200">
                {t.emblemTitle}
              </span>
              <span className="text-[10px] text-stone-300 tracking-wider font-sans block">
                {t.emblemSub}
              </span>
            </div>
          </div>

          {/* Nav links (Desktop) */}
          {!isMobile && (
            <div className="hidden xl:flex items-center gap-5 text-[11px] font-bold tracking-wider uppercase text-stone-200">
              <a href="#actualites" className="hover:text-red-300 transition-colors hover:-translate-y-0.5">{t.nav.cronicas}</a>
              <a href="#agenda" className="hover:text-red-300 transition-colors hover:-translate-y-0.5">{t.nav.agenda}</a>
              <a href="#territorio" className="hover:text-red-300 transition-colors hover:-translate-y-0.5">{t.nav.territorio}</a>
              <a href="#itinerario" className="hover:text-red-300 transition-colors hover:-translate-y-0.5">{t.nav.itinerario}</a>
              <a href="#conseils" className="hover:text-red-300 transition-colors hover:-translate-y-0.5">{t.nav.conseils}</a>
              <a href="#guide" className="hover:text-red-300 transition-colors hover:-translate-y-0.5">{t.nav.guide}</a>
              <a href="#livre-dor" className="hover:text-red-300 transition-colors hover:-translate-y-0.5">{t.nav.reviews}</a>
              <a href="#contacto" className="hover:text-red-300 transition-colors hover:-translate-y-0.5">{t.nav.contact}</a>
            </div>
          )}

          {/* Action CTAs & Language Switcher */}
          <div className="flex items-center gap-2.5">
            {/* Language Selector Pill */}
            <div className="flex items-center bg-black/45 backdrop-blur-md rounded-full border border-white/20 p-0.5 text-[10px] sm:text-[11px] font-bold shadow-inner">
              {(['es', 'en', 'fr', 'pt', 'it'] as LanguageType[]).map((langKey) => (
                <button
                  key={langKey}
                  type="button"
                  onClick={() => setCurrentLang(langKey)}
                  className={`px-2 py-1 rounded-full uppercase transition-all duration-200 cursor-pointer active:scale-90 ${
                    currentLang === langKey
                      ? 'bg-red-700 text-white shadow-xs font-black scale-105'
                      : 'text-stone-300 hover:text-white hover:bg-white/10 hover:scale-105'
                  }`}
                  title={`Idioma: ${langKey.toUpperCase()}`}
                >
                  {langKey}
                </button>
              ))}
            </div>

            {/* Action CTA with Shimmer & Hover Lift */}
            {isQuote ? (
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="shimmer-btn bg-red-700 hover:bg-red-600 text-white px-3.5 sm:px-5 py-2 rounded-full font-bold text-xs shadow-md shadow-red-900/40 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <FileText size={14} />
                <span>{t.cta.quote}</span>
              </button>
            ) : (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shimmer-btn bg-red-700 hover:bg-red-600 text-white px-3.5 sm:px-5 py-2 rounded-full font-bold text-xs shadow-md shadow-red-900/40 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <MessageCircle size={14} />
                <span className="hidden sm:inline">{t.cta.whatsapp}</span>
                <span className="sm:hidden">{t.cta.reserve}</span>
              </a>
            )}
          </div>
        </nav>

        {/* Hero Central Titles & Circular Icons (Animated Entry) */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 pt-16 sm:pt-24 pb-28 sm:pb-36 text-center space-y-4 sm:space-y-6 animate-fade-in-up">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight drop-shadow-xl text-white italic">
            {data.hero?.title || 'Cusco Imperial'}
          </h1>
          <p className="text-base sm:text-xl text-red-100 font-serif max-w-2xl mx-auto drop-shadow-md">
            {data.hero?.subtitle || t.heroSubtitleDefault}
          </p>

          {/* 3 Circular Quick Action Icons (Centerpiece with Beacon Glow) */}
          <div className="pt-2 flex items-center justify-center gap-3.5">
            <a
              href="#territorio"
              className="w-11 h-11 rounded-full bg-black/40 hover:bg-red-900/90 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-115 hover:-translate-y-1 active:scale-90 cursor-pointer"
              title={t.cta.exploreTerritory}
            >
              <Search size={16} />
            </a>
            
            {/* WhatsApp centerpiece with beacon glow ring */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-12 h-12 rounded-full bg-red-700 hover:bg-red-600 text-white flex items-center justify-center shadow-xl shadow-red-900/50 transition-all duration-300 hover:scale-115 hover:-translate-y-1 active:scale-90 cursor-pointer animate-beacon-glow"
              title={t.cta.writeWhatsApp}
            >
              <span className="absolute -inset-1 rounded-full bg-red-400 opacity-40 animate-ping-slow pointer-events-none" />
              <Mail size={18} className="relative z-10" />
            </a>

            <a
              href={`tel:${cleanPhone}`}
              className="w-11 h-11 rounded-full bg-black/40 hover:bg-red-900/90 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-115 hover:-translate-y-1 active:scale-90 cursor-pointer"
              title={t.cta.callOffice}
            >
              <Phone size={16} />
            </a>
          </div>
        </div>

        {/* Organic Wave Cut in Heritage Red */}
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

      {/* 2. OVERLAPPING 5 CIRCULAR QUICK ACCESS BADGES (With Interactive Micro-Animations) */}
      <section className="relative z-30 -mt-10 sm:-mt-14 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {t.quickServices.map((item, idx) => (
            <a
              key={idx}
              href={createWhatsAppLink(item.label)}
              target="_blank"
              rel="noopener noreferrer"
              className="cultural-card-hover bg-white hover:bg-red-50/70 border border-stone-200/80 hover:border-red-400/80 rounded-3xl p-4 sm:p-5 shadow-lg shadow-red-950/5 hover:shadow-2xl transition-all duration-300 text-center flex flex-col items-center group cursor-pointer active:scale-95"
            >
              {/* Circular Icon with rich red ring, hover scale & rotation */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-50/80 border-2 border-red-300/90 flex items-center justify-center text-2xl sm:text-3xl mb-3 shadow-inner group-hover:scale-115 group-hover:rotate-6 group-hover:bg-red-100 group-hover:border-red-500 transition-all duration-300">
                <span className="transition-transform group-hover:scale-110">{item.icon}</span>
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

      {/* 3. SECTION: ACTUALITÉS / PATRIMONIO VIVO (Hover-Lifts & Image Zooms) */}
      <section id="actualites" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-8 sm:mb-12 border-b border-stone-200/70 pb-4">
          <h2 className="text-3xl sm:text-5xl font-serif font-black italic text-stone-900">
            {t.actualites.title}
          </h2>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer-btn bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <span>{t.actualites.btnAll}</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Two-Column Grid: Featured Left + Stacked Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Large Featured Post */}
          <div className="cultural-card-hover lg:col-span-6 bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 group text-left">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-100">
              <Image
                src={featuredNewsPhoto}
                alt={t.actualites.featuredTitle}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 left-4 bg-red-700 text-white text-[11px] font-black px-3.5 py-1 rounded-full shadow-sm animate-soft-float">
                {t.actualites.badgeFeatured}
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-3">
              <h3 className="font-serif font-black text-xl sm:text-2xl text-stone-900 group-hover:text-red-700 transition-colors leading-tight">
                {t.actualites.featuredTitle}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {t.actualites.featuredDesc}
              </p>
              <div className="pt-2">
                <a
                  href={createWhatsAppLink(t.actualites.featuredTitle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-red-700 hover:text-red-800 font-bold text-xs sm:text-sm cursor-pointer group-hover:translate-x-2 transition-transform duration-300"
                >
                  <span>{t.actualites.readMore}</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Stacked Chronicle Cards */}
          <div className="lg:col-span-6 space-y-6">
            {t.actualites.items.map((item) => (
              <div
                key={item.id}
                className="cultural-card-hover bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-red-400 transition-all duration-300 text-left space-y-2 group"
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
                    className="inline-flex items-center gap-1.5 text-red-700 hover:text-red-800 font-bold text-xs cursor-pointer group-hover:translate-x-1.5 transition-transform duration-300"
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

      {/* 4. SECTION: AGENDA (Interactive Showcase & Card Lifts) */}
      <section id="agenda" className="py-16 sm:py-24 px-4 sm:px-8 bg-red-50/30 border-y border-red-200/50">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left side: Heading & Intro Paragraph */}
            <div className="lg:col-span-4 text-left space-y-4">
              <h2 className="text-3xl sm:text-5xl font-serif font-black italic text-stone-900">
                {t.agenda.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {t.agenda.desc1}
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {t.agenda.desc2}
              </p>
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shimmer-btn bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>{t.agenda.btnAll}</span>
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
                  onClick={() => setActiveEventIndex(prev => (prev === 0 ? t.agenda.events.length - 1 : prev - 1))}
                  className="w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center shadow-xs hover:bg-red-800 hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer"
                  title="Anterior"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveEventIndex(prev => (prev === t.agenda.events.length - 1 ? 0 : prev + 1))}
                  className="w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center shadow-xs hover:bg-red-800 hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer"
                  title="Siguiente"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* 2 Event Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {t.agenda.events.map((event, idx) => (
                  <div
                    key={event.id}
                    className="cultural-card-hover bg-white rounded-3xl overflow-hidden border border-red-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group text-left"
                  >
                    <div>
                      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100">
                        <Image
                          src={AGENDA_IMAGES[idx % AGENDA_IMAGES.length]}
                          alt={event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
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
                        className="inline-flex items-center gap-1.5 text-red-700 hover:text-red-800 font-bold text-xs cursor-pointer group-hover:translate-x-1.5 transition-transform duration-300"
                      >
                        <span className="w-4 h-4 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-[10px]">➤</span>
                        <span>{t.agenda.readMore}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. SECTION: LE TERRITOIRE / EL TERRITORIO SAGRADO (Animated GPS Beacon & Interactive Pins) */}
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
              {t.territory.title}
            </h2>
            <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-serif">
              {t.territory.desc1}
            </p>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
              {t.territory.desc2}
            </p>
            <div className="pt-2">
              <a
                href={data.mapsUrl || 'https://maps.google.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="shimmer-btn bg-red-700 hover:bg-red-600 text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-xl shadow-red-950/50 hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>{t.territory.btnMap}</span>
                <Navigation size={15} />
              </a>
            </div>
          </div>

          {/* Right Column: Stylized Territory Map Silhouette with Route Pins */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="cultural-card-hover relative w-full max-w-[420px] bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 border-2 border-red-500/30 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between text-xs font-bold text-red-200 pb-2 border-b border-white/10">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-red-500 animate-bounce" />
                  {t.territory.cardTitle}
                </span>
                <span className="text-[10px] bg-red-600/30 text-red-200 px-2 py-0.5 rounded-full border border-red-500/30 animate-pulse-subtle">
                  {t.territory.badgeGps}
                </span>
              </div>

              {/* Interactive Point Badges with Hover-Lifts */}
              <div className="space-y-2.5 text-left text-xs">
                {t.territory.places.map((place) => (
                  <div
                    key={place.num}
                    className="cultural-card-hover bg-white/10 hover:bg-white/20 active:scale-98 p-2.5 rounded-xl border border-white/10 hover:border-red-400/50 flex items-center justify-between transition-all duration-200 cursor-pointer group/pin"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-red-700 text-white font-black text-[10px] flex items-center justify-center group-hover/pin:scale-110 group-hover/pin:bg-red-600 transition-transform">
                        {place.num}
                      </span>
                      <span className="font-bold text-white group-hover/pin:text-red-200 transition-colors">
                        {place.name}
                      </span>
                    </div>
                    {place.num === 4 ? (
                      <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        {place.altitude}
                      </span>
                    ) : (
                      <span className="text-[10px] text-red-300 font-mono">{place.altitude}</span>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-stone-300 text-center pt-1 italic">
                {t.territory.tip}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. TOUR ITINERARY & INCLUSIONS (Red Accents with Step Highlights) */}
      {data.itinerary && data.itinerary.length > 0 && (
        <section id="itinerario" className="py-16 sm:py-24 px-4 sm:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold text-red-800 uppercase tracking-widest bg-red-100 border border-red-200 px-3 py-1 rounded-full">
              {t.itinerary.badge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-stone-900">
              {t.itinerary.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              {t.itinerary.subtitle}
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5 relative before:absolute before:inset-0 before:left-4 sm:before:left-5 before:w-0.5 before:bg-red-200">
            {data.itinerary.map((item, idx) => (
              <div key={idx} className="relative flex items-start gap-4 pl-1 sm:pl-2 group">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-700 text-white font-serif font-black flex items-center justify-center text-xs shrink-0 shadow-md ring-4 ring-white z-10 transition-transform group-hover:scale-115">
                  {idx + 1}
                </div>
                <div className="cultural-card-hover bg-white border border-stone-200 group-hover:border-red-300 rounded-2xl p-4 sm:p-5 w-full shadow-xs hover:shadow-md text-left transition-all">
                  <span className="text-[11px] uppercase font-black tracking-wider text-red-800 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-md inline-block mb-1.5">
                    {item.step}
                  </span>
                  <h3 className="font-serif font-bold text-stone-900 text-sm sm:text-base mb-1 group-hover:text-red-700 transition-colors">{item.title}</h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. FEATURES & INCLUSIONS */}
      {data.features && data.features.items && data.features.items.length > 0 && !isFree && (
        <section id="incluye" className="py-14 sm:py-20 px-4 sm:px-8 bg-stone-100 border-t border-stone-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 space-y-2">
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900">
                {data.features.title || t.features.defaultTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.features.items.map((item, idx) => (
                <div key={idx} className="cultural-card-hover bg-white p-5 rounded-2xl border border-stone-200 hover:border-red-300 shadow-2xs hover:shadow-md flex items-start gap-3.5 text-left transition-all group">
                  <CheckCircle2 className="text-red-700 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={20} />
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base group-hover:text-red-700 transition-colors">{item.split(':')[0]}</h3>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                      {item.split(':')[1] || t.features.defaultDesc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. CONSEILS PRATIQUES / QUÉ LLEVAR EN LA MOCHILA CULTURAL (Hover Lifts & Bounces) */}
      <section id="conseils" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-red-800 bg-red-100 border border-red-200 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5">
            <Backpack size={13} className="animate-soft-float" />
            <span>{t.conseils.badge}</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-stone-900">
            {t.conseils.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {t.conseils.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {t.conseils.items.map((item, idx) => (
            <div
              key={idx}
              className="cultural-card-hover bg-white rounded-3xl p-6 border border-stone-200/80 hover:border-red-400 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group active:scale-95"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-2xl group-hover:scale-115 group-hover:-rotate-6 transition-transform duration-300">
                  <span>{item.icon}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif font-black text-stone-900 text-base leading-snug mt-0.5 group-hover:text-red-700 transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-bold">
                <span>N° {idx + 1}</span>
                <span className="text-red-700 font-black group-hover:scale-105 transition-transform">✓ {t.conseils.recommended}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. VOS MÉDIATEURS DU PATRIMOINE / EQUIPO DE HISTORIADORES CERTIFICADOS (Beacon Active Status) */}
      <section id="guide" className="py-16 sm:py-24 px-4 sm:px-8 bg-red-50/40 border-t border-red-200/60">
        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-red-800 bg-red-100 border border-red-200 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5">
              <GraduationCap size={14} className="animate-soft-float" />
              <span>{t.guides.badge}</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-stone-900">
              {t.guides.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {t.guides.subtitle}
            </p>
          </div>

          {/* 3 Heritage Guides Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch text-left">
            {t.guides.list.map((guide, gIdx) => {
              // Permit dynamic overrides for the primary guide if provided in data
              const finalName = (gIdx === 0 && data.guideName) ? data.guideName : guide.name;
              const finalCert = (gIdx === 0 && data.guideCert) ? data.guideCert : guide.cert;
              const finalAvatar = (gIdx === 0 && data.guideAvatar) ? data.guideAvatar : guide.avatar;
              const finalMsg = `${guide.msgPrefix} "${data.name || data.hero?.title || 'Tour Cultural'}".`;

              return (
                <div
                  key={guide.id}
                  className="cultural-card-hover bg-white rounded-3xl p-6 sm:p-7 border border-red-200/90 hover:border-red-400 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden active:scale-98"
                >
                  <div className="space-y-4">
                    {/* Photo with Badge & Active Beacon Ring */}
                    <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden bg-stone-100 shadow-md border-2 border-red-100">
                      <Image
                        src={finalAvatar}
                        alt={finalName}
                        fill
                        sizes="(max-width: 1024px) 100vw, 380px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-2.5 inset-x-2.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold py-1.5 px-3 rounded-xl border border-white/20 flex items-center justify-between">
                        <span className="truncate">{finalCert}</span>
                        <span className="flex items-center text-emerald-400 font-black shrink-0">
                          <span className="relative flex h-2 w-2 mr-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          {t.guides.activeStatus}
                        </span>
                      </div>
                    </div>

                    {/* Header info */}
                    <div className="space-y-1">
                      <div className="inline-block bg-red-100 text-red-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                        {guide.role}
                      </div>
                      <span className="text-xs font-serif italic text-red-700 font-bold block pt-1">
                        {guide.title}
                      </span>
                      <h3 className="font-serif font-black text-xl text-stone-900 group-hover:text-red-700 transition-colors leading-tight">
                        {finalName}
                      </h3>
                    </div>

                    {/* Quote */}
                    <div className="relative pl-4 py-2 border-l-2 border-red-700 bg-red-50/50 rounded-r-xl pr-3">
                      <Quote size={16} className="text-red-300 absolute -top-1.5 left-1 opacity-50" />
                      <p className="text-xs font-serif italic text-stone-700 leading-relaxed line-clamp-4">
                        « {guide.quote} »
                      </p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-stone-700">
                      {guide.specs.map((sp, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-1.5 bg-stone-50 p-2 rounded-xl border border-stone-200/80 group-hover:border-red-200 transition-colors">
                          <span className="text-xs shrink-0">{sp.icon}</span>
                          <span className="truncate font-medium">{sp.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct Action Button with Shimmer */}
                  <div className="pt-5 mt-5 border-t border-stone-100">
                    <a
                      href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(finalMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shimmer-btn w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2.5 px-4 rounded-full text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle size={14} />
                      <span className="truncate">{guide.directBtn}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. PINTEREST PINBOARD (PRO & ADVANCE) */}
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

      {/* 11. LIVRE D'OR DU PATRIMOINE (RESEÑAS & TESTIMONIOS VERIFICADOS) */}
      <section id="livre-dor" className="py-16 sm:py-24 px-4 sm:px-8 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
          {/* Header & Rating Summary */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8 text-left">
            <div className="space-y-2">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-red-800 bg-red-100 border border-red-200 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5">
                <Star size={13} className="fill-red-700 text-red-700 animate-soft-float" />
                <span>{t.livreDor.badge}</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-black italic text-stone-900">
                {t.livreDor.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-xl leading-relaxed">
                {t.livreDor.subtitle}
              </p>
            </div>

            {/* Big Score Card with Glow Effect */}
            <div className="cultural-card-hover bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md flex items-center gap-4 shrink-0">
              <div className="text-center">
                <span className="text-3xl sm:text-4xl font-serif font-black text-red-900 block leading-none">
                  4.9
                </span>
                <span className="text-[10px] text-stone-400 font-bold uppercase mt-1 block">{t.livreDor.scoreOutOf}</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-500 hover:scale-125 transition-transform" />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-800 block">{t.livreDor.verifiedCount}</span>
                <span className="text-[10px] text-emerald-600 font-bold block">✓ {t.livreDor.positiveRate}</span>
              </div>
            </div>
          </div>

          {/* Testimonial Cards Grid with Hover-Lifts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {t.livreDor.reviews.map((review, idx) => (
              <div
                key={idx}
                className="cultural-card-hover bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 hover:border-red-400/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group space-y-4 active:scale-98"
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
                  <span className="w-7 h-7 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs group-hover:scale-115 group-hover:bg-red-200 transition-all">
                    ✓
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Sello de confianza */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-600 font-medium">
            <span className="flex items-center gap-1.5 font-bold text-stone-900">
              <Award size={16} className="text-red-700 animate-soft-float" />
              {t.livreDor.certBadge}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-600" />
              {t.livreDor.authenticatedBadge}
            </span>
            <span>•</span>
            <span className="text-stone-500">
              {t.livreDor.officialRegistry}
            </span>
          </div>
        </div>
      </section>

      {/* 12. TOUR SUPPORT & FAQS */}
      <TourSupportAndFaqs
        faqs={data.faqs}
        tourName={data.name || data.hero?.title || 'Tour Cultural'}
        whatsapp={data.whatsapp}
        guideName={data.guideName}
        destination={data.destination || 'Cusco'}
        tier={tier}
        theme="cultural"
        isMobile={isMobile}
        lang={currentLang}
      />

      {/* 13. MUNICIPAL & HERITAGE FOOTER BLOCK */}
      <footer id="contacto" className="bg-white border-t-2 border-red-700 py-10 px-4 sm:px-8 text-stone-700 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
          
          {/* Column 1: Emblem & Town Name */}
          <div className="md:col-span-3 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-100 border border-red-300 text-red-800 flex items-center justify-center shrink-0 animate-soft-float">
              <Landmark size={24} />
            </div>
            <div>
              <span className="font-serif font-black text-sm uppercase text-stone-900 block">
                {t.footer.townName}
              </span>
              <span className="text-[10px] text-stone-500 uppercase tracking-widest block font-bold">
                {t.footer.regionalDir}
              </span>
            </div>
          </div>

          {/* Column 2: Address */}
          <div className="md:col-span-3 space-y-1">
            <span className="font-black text-stone-900 block uppercase text-[11px]">
              {t.footer.officeTitle}
            </span>
            <p className="text-stone-600 text-xs">
              {data.officeAddress || t.footer.officeDesc}
            </p>
          </div>

          {/* Column 3: Hours */}
          <div className="md:col-span-3 space-y-1">
            <span className="font-black text-stone-900 block uppercase text-[11px]">
              {t.footer.hoursTitle}
            </span>
            <p className="text-stone-600 text-xs">
              {data.officeHours || t.footer.hoursDesc}
            </p>
          </div>

          {/* Column 4: Contact & Mini Map Illustration */}
          <div className="md:col-span-3 flex items-center justify-between gap-4 border-t md:border-t-0 pt-4 md:pt-0">
            <div className="space-y-1.5">
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-1.5 text-stone-900 hover:text-red-700 font-black text-xs cursor-pointer transition-colors"
              >
                <Phone size={13} className="text-red-700" />
                <span>{data.whatsapp || '+51 984 123 456'}</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shimmer-btn inline-block bg-red-700 hover:bg-red-800 text-white text-[11px] font-bold px-3.5 py-1 rounded-full shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                {t.footer.contactBtn}
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
          <p>{t.footer.copyright}</p>
        </div>
      </footer>

      {/* 14. STICKY MOBILE BOTTOM BAR (With Slide-up entrance & pulsating beacon CTA) */}
      {isMobile && (
        <div className="animate-slide-up-mobile fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-red-200 p-3 flex items-center justify-between gap-3 shadow-2xl">
          <div className="min-w-0">
            <span className="text-[10px] text-stone-500 font-bold block uppercase tracking-wider">{t.mobileSticky.tariffLabel}</span>
            <span className="text-base font-serif font-black text-red-900 animate-pulse-subtle inline-block">{data.price || 'S/ 85 PEN'}</span>
          </div>
          <div className="flex items-center gap-2">
            {isQuote ? (
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="shimmer-btn animate-beacon-glow bg-red-700 hover:bg-red-600 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
              >
                <FileText size={14} />
                <span>{t.mobileSticky.quote}</span>
              </button>
            ) : (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shimmer-btn animate-beacon-glow bg-red-700 hover:bg-red-600 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
              >
                <MessageCircle size={14} />
                <span>{t.mobileSticky.reserve}</span>
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
