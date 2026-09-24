"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  MapPin, Clock, Star, CheckCircle, MessageCircle, HelpCircle, FileText, 
  ShieldCheck, XCircle, Backpack, Calendar, ArrowRight, Heart, Flame, 
  Plane, Compass, Users, Sparkles, Navigation, Phone, Check, ChevronRight,
  Send, Mountain, Building2, Mail, BookOpen, Tent, Bus, Utensils, Ticket, HeartPulse, Activity
} from 'lucide-react';
import { LandingData, LanguageType } from '@/types/landing';
import { ADVENTURE_I18N, ADVENTURE_LANGUAGES } from './adventureI18n';
import QuoteModal from '@/components/common/QuoteModal';
import TourSupportAndFaqs from '@/components/common/TourSupportAndFaqs';
import PinterestPinboard from '@/components/common/PinterestPinboard';

interface TemplateProps {
  data: LandingData;
  isLive?: boolean;
  viewMode?: 'desktop' | 'tablet' | 'mobile';
}

export default function AdventureTemplate({ data, viewMode = 'desktop' }: TemplateProps) {
  const [currentLang, setCurrentLang] = useState<LanguageType>(data.language || 'es');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [likedCards, setLikedCards] = useState<Record<string, boolean>>({});
  const [activeInclusionFilter, setActiveInclusionFilter] = useState<string>('all');

  const t = ADVENTURE_I18N[currentLang] || ADVENTURE_I18N.es;

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
  const allTestimonials = userReviews.length > 0
    ? [
        ...userReviews.map((r, i) => ({
          ...r,
          avatar: (r as any).avatar || t.testimonials.items[i % t.testimonials.items.length].avatar,
          route: (r as any).route || t.testimonials.items[i % t.testimonials.items.length].route,
          date: (r as any).date || t.testimonials.items[i % t.testimonials.items.length].date
        })),
        ...t.testimonials.items.filter(
          def => !userReviews.some(u => u.name && def.name && u.name.toLowerCase().trim() === def.name.toLowerCase().trim())
        )
      ].slice(0, 4)
    : t.testimonials.items;

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

  // Smart context-aware metadata & soft images for each feature inclusion
  const getFeatureMetadata = (rawItem: string, idx: number) => {
    const lower = rawItem.toLowerCase();
    
    if (lower.includes('domo') || lower.includes('campamento') || lower.includes('carpa') || lower.includes('equipado')) {
      return {
        id: 'camps',
        image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=700&auto=format&fit=crop',
        icon: Tent,
        badge: currentLang === 'en' ? 'Sky Glass Domes' : currentLang === 'fr' ? 'Dômes Célestes' : currentLang === 'pt' ? 'Domos de Cristal' : currentLang === 'it' ? 'Domi di Vetro' : 'Domos Panorámicos',
        category: currentLang === 'en' ? 'Comfort & Night Sky' : 'Confort & Domos Térmicos',
        defaultDesc: currentLang === 'en' 
          ? 'Rest under the Andean Milky Way in geodesic thermal domes with real beds, feather duvets, and panoramic glacier views.'
          : currentLang === 'fr'
          ? 'Dormez sous la Voie Lactée dans des dômes géodésiques chauffés avec lits douillets et vue directe sur les glaciers.'
          : currentLang === 'pt'
          ? 'Durma sob a Via Láctea em domos térmicos com camas reais, cobertores de pluma e vista panorâmica para os nevados.'
          : currentLang === 'it'
          ? 'Dormi sotto la Via Lattea in domi geodetici termici con letti comodi e vista panoramica mozzafiato sui ghiacciai.'
          : 'Duerme bajo la Vía Láctea en domos geodésicos térmicos con camas confortables, cobertores de pluma y vista a los glaciares.'
      };
    }
    
    if (lower.includes('alimento') || lower.includes('comida') || lower.includes('nutritiva') || lower.includes('chef') || lower.includes('desayuno')) {
      return {
        id: 'food',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=700&auto=format&fit=crop',
        icon: Utensils,
        badge: currentLang === 'en' ? 'High Altitude Gourmet' : currentLang === 'fr' ? 'Chef de Montagne' : currentLang === 'pt' ? 'Chef de Montanha' : currentLang === 'it' ? 'Chef di Spedizione' : 'Chef de Montaña',
        category: currentLang === 'en' ? 'Nutrition & Energy' : 'Gastronomía Andina & Energía',
        defaultDesc: currentLang === 'en'
          ? '3 hearty gourmet hot meals daily prepared fresh by your mountain chef. Vegan, vegetarian, and gluten-free diets fully accommodated.'
          : currentLang === 'fr'
          ? '3 repas chauds copieux par jour cuisinés sur place par votre chef. Options végétariennes, végétaliennes et sans gluten incluses.'
          : currentLang === 'pt'
          ? '3 refeições quentes balanceadas por dia preparadas na hora por nosso chef. Dietas vegetarianas, veganas e sem glúten incluídas.'
          : currentLang === 'it'
          ? '3 pasti caldi abbondanti al giorno preparati freschi dal nostro chef. Menù vegetariani, vegani e senza glutine garantiti.'
          : '3 comidas calientes nutritivas al día preparadas al momento por un chef de expedición. Dietas vegetarianas, veganas y celíacas incluidas.'
      };
    }
    
    if (lower.includes('oxígeno') || lower.includes('oxigeno') || lower.includes('botiquín') || lower.includes('botiquin') || lower.includes('altura') || lower.includes('médic')) {
      return {
        id: 'health',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=700&auto=format&fit=crop',
        icon: HeartPulse,
        badge: currentLang === 'en' ? 'Vital Safety' : currentLang === 'fr' ? 'Sécurité Vitale' : currentLang === 'pt' ? 'Segurança Vital' : currentLang === 'it' ? 'Sicurezza Vitale' : 'Seguridad Vital',
        category: currentLang === 'en' ? 'Health & Medical' : 'Salud & Monitoreo 4,600m',
        defaultDesc: currentLang === 'en'
          ? 'Continuous pulse oximeter saturation checks twice daily, portable medical emergency oxygen tank, and specialized wilderness first aid kit.'
          : currentLang === 'fr'
          ? 'Contrôle quotidien de saturation à l’oxymètre, bouteille d’oxygène médical d’urgence et trousse de secours pour haute altitude.'
          : currentLang === 'pt'
          ? 'Monitoramento diário de oxigenação com oxímetro de pulso, cilindro de oxigênio medicinal e kit de primeiros socorros de altitude.'
          : currentLang === 'it'
          ? 'Controllo quotidiano dell’ossigenazione con pulsossimetro, bombola di ossigeno medicinale portatile e kit di pronto soccorso d’alta quota.'
          : 'Monitoreo diario de saturación con oxímetro digital, balón de oxígeno medicinal de emergencia y botiquín de trauma para alta montaña.'
      };
    }
    
    if (lower.includes('entrada') || lower.includes('boleto') || lower.includes('machu') || lower.includes('ticket') || lower.includes('tren')) {
      return {
        id: 'tickets',
        image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=700&auto=format&fit=crop',
        icon: Ticket,
        badge: currentLang === 'en' ? 'Guaranteed Circuit' : currentLang === 'fr' ? 'Circuit Garanti' : currentLang === 'pt' ? 'Circuito Garantido' : currentLang === 'it' ? 'Circuito Garantito' : 'Circuito Garantizado',
        category: currentLang === 'en' ? 'Sanctuary Access' : 'Acceso Oficial Machu Picchu',
        defaultDesc: currentLang === 'en'
          ? 'Official entrance ticket reserved in your name for Circuit 1 or 2, plus panoramic Expedition/Voyager train ride through the Sacred Valley.'
          : currentLang === 'fr'
          ? 'Billet officiel nominatif pour le circuit classique de la citadelle inca et train panoramique Expedition/Voyager dans la Vallée Sacrée.'
          : currentLang === 'pt'
          ? 'Ingresso oficial reservado em seu nome para os circuitos clássicos e passagem de trem panorâmico Expedition/Voyager pelo Vale Sagrado.'
          : currentLang === 'it'
          ? 'Biglietto ufficiale a tuo nome per il circuito classico di Machu Picchu e treno panoramico Expedition/Voyager nella Valle Sacra.'
          : 'Boleto oficial nominativo para el circuito clásico de la ciudadela inca y pasajes de tren panorámico Expedition/Voyager por el Valle Sagrado.'
      };
    }
    
    if (lower.includes('transporte') || lower.includes('mollepata') || lower.includes('bus') || lower.includes('ida y vuelta') || lower.includes('retorno')) {
      const isReturn = lower.includes('vuelta') || lower.includes('retorno');
      return {
        id: 'transport',
        image: isReturn 
          ? 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=700&auto=format&fit=crop'
          : 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=700&auto=format&fit=crop',
        icon: Bus,
        badge: currentLang === 'en' ? 'Private Van Service' : currentLang === 'fr' ? 'Transport Privé' : currentLang === 'pt' ? 'Transporte Turístico' : currentLang === 'it' ? 'Trasferimento Diretto' : 'Transporte Turístico',
        category: currentLang === 'en' ? 'Door-to-Door Logistics' : 'Logística Puerta a Puerta',
        defaultDesc: currentLang === 'en'
          ? 'Pick-up from your Cusco hotel in air-conditioned modern tourist sprinters with licensed professional drivers experienced on Andean roads.'
          : currentLang === 'fr'
          ? 'Prise en charge à votre hôtel à Cusco en minibus touristique moderne avec chauffeurs chevronnés sur les routes andines.'
          : currentLang === 'pt'
          ? 'Embarque na porta do seu hotel em Cusco em vans modernas climatizadas e motoristas experientes nas estradas andinas.'
          : currentLang === 'it'
          ? 'Prelievo direttamente dal tuo hotel a Cusco con moderni minibus turistici e autisti professionisti esperti delle strade andine.'
          : 'Recojo en la puerta de tu hotel en Cusco en vehículos turísticos modernos climatizados con choferes experimentados en rutas andinas.'
      };
    }
    
    const defaultPhotos = [
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=700&auto=format&fit=crop'
    ];
    return {
      id: 'other',
      image: defaultPhotos[idx % defaultPhotos.length],
      icon: ShieldCheck,
      badge: currentLang === 'en' ? 'Included Service' : 'Servicio Oficial',
      category: currentLang === 'en' ? 'Safety & Logistics' : 'Seguridad & Logística',
      defaultDesc: currentLang === 'en'
        ? 'Comprehensive expedition service operated directly by certified bilingual guides with top-tier mountain equipment.'
        : 'Servicio integral operado directamente por guías locales colegiados con equipamiento técnico de alta montaña.'
    };
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-800 selection:bg-slate-900 selection:text-white">
      
      {/* 1. TOP NAVBAR (Espacioso, Robusto & Multi-Idioma) */}
      <nav className="sticky top-0 w-full z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 sm:py-4 flex justify-between items-center gap-3 sm:gap-4">
          
          {/* Brand Logo & Authority Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-md shadow-slate-900/10 shrink-0">
              <Mountain size={20} className="text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none">
                  Trek<span className="text-blue-600">Explorer</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-wider border border-blue-200/60">
                  {t.brand.badge}
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 mt-1 hidden xs:block">
                {t.brand.subtitle}
              </span>
            </div>
          </div>

          {/* Nav Links (Desktop) */}
          {!isMobile && (
            <div className="hidden lg:flex items-center gap-7 xl:gap-8 text-[13.5px] font-extrabold text-slate-700">
              <a href="#destinos" className="hover:text-blue-600 transition-colors py-1">{t.nav.destinations}</a>
              <a href="#iconic" className="hover:text-blue-600 transition-colors py-1">{t.nav.iconic}</a>
              <a href="#itinerario" className="hover:text-blue-600 transition-colors py-1">{t.nav.itinerary}</a>
              <a href="#incluye" className="hover:text-blue-600 transition-colors py-1">{t.nav.included}</a>
              <a href="#soporte-faq" className="hover:text-blue-600 transition-colors py-1">{t.nav.faq}</a>
            </div>
          )}

          {/* Right Controls: Language Selector Pill + CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Selector Pill */}
            <div className="flex items-center bg-slate-100 border border-slate-200/90 rounded-full p-0.5 text-[11px] font-bold shadow-2xs">
              {ADVENTURE_LANGUAGES.map(({ code, label, flag }) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setCurrentLang(code)}
                  title={label}
                  className={`px-1.5 sm:px-2.5 py-1 rounded-full uppercase transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                    currentLang === code
                      ? 'bg-slate-900 text-white font-black shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <span className="text-xs">{flag}</span>
                  <span className="text-[10px] sm:text-[11px] font-black hidden xs:inline">{code.toUpperCase()}</span>
                </button>
              ))}
            </div>

            {/* CTAs */}
            {data.objective === 'both' ? (
              <>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20 hover:scale-102 flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span className="hidden md:inline">WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsQuoteOpen(true)}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all shadow-md hover:scale-102 flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText size={15} />
                  <span>{t.nav.quoteBtn}</span>
                </button>
              </>
            ) : isQuote ? (
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-lg hover:shadow-slate-900/20 hover:scale-102 active:scale-98 flex items-center gap-2 cursor-pointer"
              >
                <FileText size={16} />
                <span>{t.nav.quoteBtn}</span>
              </button>
            ) : (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-lg hover:shadow-slate-900/20 hover:scale-102 active:scale-98 flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle size={16} />
                <span>{t.nav.whatsappBtn}</span>
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
                <span>{data.hero?.badge || t.hero.badge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-md">
                {t.hero.titleLine1} <br />
                <span className="text-white">{t.hero.titleLine2}</span> <br />
                <span className="text-white flex items-center gap-2">
                  {t.hero.titleLine3}
                </span>
              </h1>

              {/* Tour Subtitle / Description */}
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl font-normal drop-shadow-sm">
                {data.hero?.subtitle || data.about?.content || t.hero.subtitle}
              </p>

              {/* Buttons Row */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                {isQuote ? (
                  <button
                    type="button"
                    onClick={() => setIsQuoteOpen(true)}
                    className="bg-white hover:bg-slate-100 text-slate-950 font-black px-7 py-3.5 rounded-full text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>{data.hero?.cta || t.hero.ctaQuote}</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-slate-100 text-slate-950 font-black px-7 py-3.5 rounded-full text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>{data.hero?.cta || t.hero.ctaWhatsapp}</span>
                    <ArrowRight size={16} />
                  </a>
                )}

                <a
                  href="#itinerario"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-full text-sm backdrop-blur-md border border-white/25 shadow-sm hover:border-white/40 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Compass size={16} className="text-blue-400" />
                  <span>{t.hero.viewItinerary}</span>
                </a>

                {data.price && (
                  <div className="px-4 py-3 rounded-full bg-blue-600/90 text-white backdrop-blur-md border border-blue-400/40 font-black text-xs shadow-md">
                    {t.hero.fromPrice} {data.price}
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
                      <span>{t.hero.dailyDepartures}</span>
                    </div>
                    <span className="bg-white/10 px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-300">
                      {t.hero.season}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/25 text-blue-400 flex items-center justify-center font-bold">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">{t.hero.highestPoint}:</span>
                        <strong className="text-white text-xs sm:text-sm font-black">{data.altitude || '4,630 msnm (Paso Salkantay)'}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs text-slate-300 border-t border-white/10">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                      <span>{t.hero.licensedGuide}: <strong className="text-white">{data.guideName || (currentLang === 'es' ? 'Guía Colegiado' : currentLang === 'en' ? 'Licensed Guide' : currentLang === 'fr' ? 'Guide Certifié' : currentLang === 'pt' ? 'Guia Certificado' : 'Guida Ufficiale')}</strong></span>
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
                    <span className="block text-[11px] sm:text-xs font-bold text-slate-900">{t.hero.happyCustomers}</span>
                    <div className="flex items-center gap-1 text-[11px] text-slate-600 font-semibold">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-slate-900 font-black">4.9</span>
                      <span>({t.hero.reviewsCount})</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PARTNERS / TRUST LOGOS BAR */}
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

      {/* 4. SECTION: EXPLORE TOP SEARCHED SPOTS */}
      <section id="destinos" className="py-14 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto text-center">
        <div className="max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            {t.searchedSpots.title} <span className="text-amber-500">🔥</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            {t.searchedSpots.subtitle}
          </p>
        </div>

        {/* Grid of 8 Horizontal Capsule Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-6xl mx-auto">
          {t.searchedSpots.spots.map((spot) => (
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

      {/* 5. SECTION: EXPLORE ICONIC LOCATIONS */}
      <section id="iconic" className="py-14 sm:py-20 px-4 sm:px-8 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14 space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
              {t.iconic.title} <span className="text-blue-500">✈️</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              {t.iconic.subtitle}
            </p>
          </div>

          {/* 3 Columns Grid of Tour Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-6xl mx-auto">
            {t.iconic.tours.map((tour) => {
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
                      <span>{t.iconic.detailsBtn}</span>
                      <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. TOUR ITINERARY SECTION */}
      {data.itinerary && data.itinerary.length > 0 && (
        <section id="itinerario" className="py-14 sm:py-20 px-4 sm:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-blue-600 font-black text-xs uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              <Calendar size={13} /> {t.itinerary.badge}
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              {t.itinerary.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {t.itinerary.subtitle}
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
                    {item.step || `${t.itinerary.dayPrefix} ${idx + 1}`}
                  </span>
                  <h3 className="font-black text-slate-900 text-sm sm:text-base mb-1">{item.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. FEATURES & INCLUDED SERVICES (Con imágenes suaves, filtros y estándares de alta montaña) */}
      {data.features && data.features.items && data.features.items.length > 0 && !isFree && (
        <section id="incluye" className="py-16 sm:py-24 px-4 sm:px-8 bg-slate-950 text-white relative overflow-hidden border-y border-slate-800">
          
          {/* Ambient Lighting Glow Effect */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto space-y-10 sm:space-y-14">
            
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider shadow-sm">
                <Sparkles size={13} className="text-emerald-400" />
                <span>{t.inclusions.title}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {data.features.title || t.inclusions.includedTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal max-w-2xl mx-auto">
                {currentLang === 'en'
                  ? 'Every logistical detail, camp comfort, and high-altitude safety protocol is seamlessly arranged so you focus entirely on the trail.'
                  : currentLang === 'fr'
                  ? 'Chaque détail logistique, confort en campement et sécurité d’altitude est orchestré par nos guides officiels pour un voyage serein.'
                  : currentLang === 'pt'
                  ? 'Cada detalhe logístico, conforto nos acampamentos e segurança em altitude é planejado para você focar apenas em viver a montanha.'
                  : currentLang === 'it'
                  ? 'Ogni dettaglio logistico, comfort nei campi base e sicurezza in quota è curato nei minimi particolari per farti vivere il trekking senza pensieri.'
                  : 'Cada detalle logístico, confort en los campamentos y seguridad en altura está planificado para que solo te preocupes por disfrutar de la montaña.'}
              </p>

              {/* Interactive Category Filter Pills */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
                {[
                  { id: 'all', label: currentLang === 'en' ? 'All Inclusions (6)' : currentLang === 'fr' ? 'Tous les Services (6)' : currentLang === 'pt' ? 'Todos os Serviços (6)' : currentLang === 'it' ? 'Tutti i Servizi (6)' : 'Todos los Servicios (6)' },
                  { id: 'transport', label: currentLang === 'en' ? '🚐 Transport & Vans' : '🚐 Transporte & Buses' },
                  { id: 'camps', label: currentLang === 'en' ? '⛺ Sky Domes & Camps' : '⛺ Domos & Campamento' },
                  { id: 'food', label: currentLang === 'en' ? '👨‍🍳 Mountain Chef & Food' : '👨‍🍳 Chef & Alimentación' },
                  { id: 'tickets', label: currentLang === 'en' ? '🎫 Machu Picchu Tickets' : '🎫 Boletos Machu Picchu' },
                  { id: 'health', label: currentLang === 'en' ? '🩺 Oxygen & Medical' : '🩺 Oxígeno & Primeros Auxilios' }
                ].map((filterTab) => (
                  <button
                    key={filterTab.id}
                    type="button"
                    onClick={() => setActiveInclusionFilter(filterTab.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      activeInclusionFilter === filterTab.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-black scale-105'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {filterTab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Compact & Refined Inclusion Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto">
              {data.features.items.map((item, idx) => {
                const parts = item.split(':');
                const title = parts[0].trim();
                const userCustomDesc = parts[1]?.trim();
                const meta = getFeatureMetadata(item, idx);
                const IconComponent = meta.icon;

                // Check filter visibility
                const matchesFilter = activeInclusionFilter === 'all' || meta.id === activeInclusionFilter;
                if (!matchesFilter) return null;

                return (
                  <div
                    key={idx}
                    className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group flex flex-col justify-between"
                  >
                    <div>
                      {/* Compact Soft Image Header */}
                      <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-950">
                        <Image
                          src={meta.image}
                          alt={title}
                          fill
                          sizes="(max-width: 768px) 100vw, 360px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        {/* Soft Gradient Overlay for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />

                        {/* Top Category Badge */}
                        <div className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 text-[10px] font-black text-slate-200">
                          {meta.category}
                        </div>

                        {/* Top Feature Pill Badge */}
                        <div className="absolute top-2.5 right-2.5 bg-emerald-500/90 backdrop-blur-sm text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                          {meta.badge}
                        </div>

                        {/* Floating Icon Container */}
                        <div className="absolute -bottom-2.5 left-4 w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30 border-2 border-slate-900 shrink-0">
                          <IconComponent size={15} className="text-white" />
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-4 sm:p-5 pt-3.5 text-left space-y-1.5">
                        <h3 className="text-sm sm:text-base font-black text-white group-hover:text-blue-400 transition-colors line-clamp-1 leading-snug">
                          {title}
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-2">
                          {userCustomDesc || meta.defaultDesc}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer Confirmation */}
                    <div className="p-4 sm:p-5 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-2 text-[10px] sm:text-[11px] text-slate-400 font-bold">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-black">
                        <Check size={13} className="stroke-[3]" />
                        <span>
                          {currentLang === 'en' ? '100% Guaranteed Service' : currentLang === 'fr' ? 'Service Garanti' : currentLang === 'pt' ? 'Serviço Garantido' : currentLang === 'it' ? 'Servizio Garantito' : 'Servicio 100% Incluido'}
                        </span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        #{idx + 1}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Expedition Standards & Quality Assurance Strip */}
            <div className="mt-10 sm:mt-12 pt-8 border-t border-slate-800/80 max-w-6xl mx-auto">
              <div className="text-center mb-6 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                  {currentLang === 'en' ? 'Expedition Quality Assurance' : currentLang === 'fr' ? 'Garantie d’Excellence' : currentLang === 'pt' ? 'Garantia de Qualidade' : currentLang === 'it' ? 'Garanzia di Qualità' : 'Garantía de Excelencia en Montaña'}
                </span>
                <h3 className="text-base sm:text-xl font-black text-white">
                  {currentLang === 'en' ? 'Our High-Altitude Safety & Comfort Standards' : currentLang === 'fr' ? 'Nos Standards de Haute Montagne & Confort' : currentLang === 'pt' ? 'Nossos Padrões de Segurança & Conforto' : currentLang === 'it' ? 'I Nostri Standard di Alta Quota & Sicurezza' : 'Nuestros Estándares de Seguridad & Confort en Altura'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-left">
                {/* 1. Chef */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 hover:border-slate-700 transition-colors space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold shrink-0">
                      <Utensils size={14} />
                    </div>
                    <strong className="text-xs font-black text-white truncate">
                      {currentLang === 'en' ? 'Expedition Mountain Chef' : 'Chef de Alta Montaña'}
                    </strong>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug font-normal line-clamp-2">
                    {currentLang === 'en'
                      ? '3 hot gourmet meals daily prepared fresh on the trail with balanced nutritional calories.'
                      : 'Comidas calientes 3 veces al día elaboradas con insumos andinos frescos y balance calórico.'}
                  </p>
                </div>

                {/* 2. Health & Oxygen */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 hover:border-slate-700 transition-colors space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center font-bold shrink-0">
                      <HeartPulse size={14} />
                    </div>
                    <strong className="text-xs font-black text-white truncate">
                      {currentLang === 'en' ? '24/7 Oxygen Monitoring' : 'Oxígeno & Oximetría 24/7'}
                    </strong>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug font-normal line-clamp-2">
                    {currentLang === 'en'
                      ? 'Daily saturation health checks twice a day and medical emergency oxygen tank at all camps.'
                      : 'Monitoreo diario de saturación con oxímetro digital y balón de oxígeno en cada campamento.'}
                  </p>
                </div>

                {/* 3. Mules & Horses */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 hover:border-slate-700 transition-colors space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold shrink-0">
                      <Backpack size={14} />
                    </div>
                    <strong className="text-xs font-black text-white truncate">
                      {currentLang === 'en' ? 'Pack Horses & Duffel Bag' : 'Arrieros & Caballos de Carga'}
                    </strong>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug font-normal line-clamp-2">
                    {currentLang === 'en'
                      ? 'Up to 7 kg duffel bag carried by horses so you hike comfortably with just a daypack.'
                      : 'Duffel bag de hasta 7 kg llevado por caballos para que camines ligero con mochila de ataque.'}
                  </p>
                </div>

                {/* 4. Domes */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 hover:border-slate-700 transition-colors space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                      <Tent size={14} />
                    </div>
                    <strong className="text-xs font-black text-white truncate">
                      {currentLang === 'en' ? 'Sky Glass Thermal Domes' : 'Domos de Cristal Térmicos'}
                    </strong>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug font-normal line-clamp-2">
                    {currentLang === 'en'
                      ? 'Insulated 4-season geodesic domes with real beds and panoramic views of the glaciers.'
                      : 'Cúpulas 4 estaciones aislantes del frío con camas confortables y vista directa al nevado.'}
                  </p>
                </div>
              </div>
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
          lang={currentLang}
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
                  <h3>{t.inclusions.notIncludedTitle}</h3>
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
                  <h3>{t.inclusions.whatToBringTitle}</h3>
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
              <span>{t.testimonials.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              {t.testimonials.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {t.testimonials.subtitle}
            </p>
          </div>

          {/* Grid of 4 Cards (2x2 on tablet/desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {allTestimonials.map((reviewItem, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm hover:shadow-md border border-slate-200/90 hover:border-blue-300 transition-all text-left flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Top Row: Stars + Verified Badge */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(reviewItem.rating || 5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle size={11} className="text-emerald-600" />
                      {t.testimonials.verifiedTrip}
                    </span>
                  </div>

                  {/* Quote text */}
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                    &quot;{reviewItem.comment}&quot;
                  </p>
                </div>

                {/* Traveler Author Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 relative shrink-0 border-2 border-white shadow-xs">
                      <Image 
                        src={(reviewItem as any).avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'} 
                        alt={reviewItem.name} 
                        fill 
                        sizes="40px" 
                        className="object-cover" 
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">{reviewItem.name}</h4>
                      <p className="text-[11px] text-slate-400 truncate">{reviewItem.origin}</p>
                    </div>
                  </div>
                  {(reviewItem as any).route && (
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 shrink-0 hidden sm:block">
                      {(reviewItem as any).route}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Trust Indicators */}
          <div className="mt-10 sm:mt-14 pt-8 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600 text-base">✓</span> {t.testimonials.bottomGuarantees.realReviews}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-blue-600 text-base">🛡️</span> {t.testimonials.bottomGuarantees.dircetur}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-amber-500 text-base">★</span> {t.testimonials.bottomGuarantees.excellence}
            </span>
          </div>

        </div>
      </section>

      {/* 11. BASE DE OPERACIONES, OFICINA FÍSICA & SERVICIOS AL EXPEDICIONARIO */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider shadow-2xs">
              <Building2 size={13} className="text-blue-600" />
              <span>{t.office.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.office.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              {t.office.subtitle}
            </p>
          </div>

          {/* 2-Columns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Left Column (5 Cols): The Physical Hub Card */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
              <div>
                {/* Photo Preview of Cusco Base */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=700&auto=format&fit=crop"
                    alt="Plaza de Armas Cusco Base"
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                  
                  {/* Floating Live Status Pill */}
                  <div className="absolute top-3.5 left-3.5 bg-emerald-500 text-white text-[11px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>{t.office.statusBadge}</span>
                  </div>

                  {/* Distance Pill */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white flex items-center gap-1.5 text-xs font-bold drop-shadow-md">
                    <MapPin size={15} className="text-rose-400 shrink-0" />
                    <span className="truncate">{t.office.distanceBadge}</span>
                  </div>
                </div>

                {/* Office Info Body */}
                <div className="p-6 text-left space-y-4">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {t.office.addressTitle}
                    </span>
                    <p className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                      {data.officeAddress || t.office.address}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Clock size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">
                        {t.office.hoursTitle}
                      </span>
                      <strong className="text-xs sm:text-sm font-extrabold text-slate-800">
                        {data.officeHours || t.office.hours}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-2.5">
                <a
                  href={data.mapsUrl || 'https://maps.google.com/?q=Plaza+de+Armas+Cusco'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:scale-101 cursor-pointer"
                >
                  <Navigation size={15} className="text-blue-400" />
                  <span>{t.office.mapsBtn}</span>
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-2xs hover:scale-101 cursor-pointer"
                  >
                    <MessageCircle size={14} />
                    <span className="truncate">{t.office.chatBtn}</span>
                  </a>

                  <a
                    href={`tel:${cleanPhone}`}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Phone size={14} className="text-slate-600" />
                    <span className="truncate">{t.office.callBtn}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column (7 Cols): 3 Exclusive Expedition Amenities */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-4">
              <div className="text-left">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {t.office.servicesTitle}
                </h3>
              </div>

              <div className="space-y-3.5">
                {t.office.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all text-left flex items-start gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs mt-0.5">
                      {feat.icon === 'briefing' ? (
                        <Compass size={20} />
                      ) : feat.icon === 'luggage' ? (
                        <Backpack size={20} />
                      ) : (
                        <Sparkles size={20} />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                        <h4 className="font-black text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                          {feat.title}
                        </h4>
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                          {feat.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guarantees Pill Strip */}
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-[11px] font-bold text-slate-600">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>{t.office.guarantees.dircetur}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-blue-600" />
                  <span>{t.office.guarantees.verified}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-slate-900">🔐</span>
                  <span>{t.office.guarantees.lockers}</span>
                </span>
              </div>
            </div>

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
        lang={currentLang}
      />

      {/* 13. FOOTER COMPLETO DE ALTA AUTORIDAD & CONVERSIÓN */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800/80 pt-14 pb-24 sm:pb-12 px-4 sm:px-8 relative overflow-hidden">
        
        {/* Glow ambient background effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-14 relative z-10">
          
          {/* A. Pre-Footer High-Conversion Banner */}
          <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-blue-950/60 border border-slate-800 p-6 sm:p-10 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 text-left">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-black uppercase tracking-wider">
                <Sparkles size={12} className="text-blue-400" />
                <span>{t.footer.ctaBanner.badge}</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                {t.footer.ctaBanner.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {t.footer.ctaBanner.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg shadow-emerald-600/25 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle size={16} />
                <span>{t.footer.ctaBanner.whatsappBtn}</span>
              </a>
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-white/20 hover:border-white/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText size={16} className="text-blue-400" />
                <span>{t.footer.ctaBanner.quoteBtn}</span>
              </button>
            </div>
          </div>

          {/* B. Main 4-Columns Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 text-left">
            
            {/* Column 1: Brand Authority (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-slate-900 text-white flex items-center justify-center shadow-md shadow-blue-500/10">
                  <Mountain size={22} className="text-white" />
                </div>
                <div>
                  <span className="text-xl font-black text-white tracking-tight">
                    Trek<span className="text-blue-500">Explorer</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                    {t.brand.subtitle}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {t.footer.brandDesc}
              </p>

              {/* Official Badges */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-400">
                  <ShieldCheck size={14} className="shrink-0" />
                  <span>{t.footer.certifications.dircetur}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-blue-400">
                  <CheckCircle size={14} className="shrink-0" />
                  <span>{t.footer.certifications.sernanp}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-amber-400">
                  <span>★</span>
                  <span>{t.footer.certifications.safeTravels}</span>
                </div>
              </div>
            </div>

            {/* Column 2: Treks & Routes (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                {t.footer.quickLinksTitle}
              </h4>
              <ul className="space-y-2 text-xs">
                {t.footer.quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="text-slate-600 group-hover:text-blue-400 transition-colors">›</span>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Safety & Preparation (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                {t.footer.safetyTitle}
              </h4>
              <ul className="space-y-2 text-xs">
                {t.footer.safetyLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="text-slate-600 group-hover:text-emerald-400 transition-colors">›</span>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Base Central & Direct Contact (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                {t.footer.contactTitle}
              </h4>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin size={15} className="text-blue-400 shrink-0 mt-0.5" />
                  <span>{data.officeAddress || t.office.address}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock size={15} className="text-emerald-400 shrink-0" />
                  <span>{data.officeHours || t.office.hours}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone size={15} className="text-amber-400 shrink-0" />
                  <a href={`tel:${cleanPhone}`} className="hover:text-white transition-colors font-bold">
                    {data.whatsapp || '+51 984 123 456'}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail size={15} className="text-rose-400 shrink-0" />
                  <span className="text-slate-400">reservas@trekexplorerperu.com</span>
                </div>
              </div>

              {/* Libro de Reclamaciones */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer">
                  <BookOpen size={14} className="text-amber-500" />
                  <span>{t.footer.complaintsBook}</span>
                </div>
              </div>
            </div>

          </div>

          {/* C. Bottom Bar / Copyright, Payment Badges & Legal */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p className="text-center md:text-left">{t.footer.rights}</p>

            {/* Payment Methods Badges */}
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              <span>💳 VISA</span>
              <span>•</span>
              <span>MASTERCARD</span>
              <span>•</span>
              <span>AMEX</span>
              <span>•</span>
              <span>PAYPAL</span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#soporte-faq" className="hover:text-white transition-colors">{t.footer.terms}</a>
              <span>•</span>
              <a href="#soporte-faq" className="hover:text-white transition-colors">{t.footer.privacy}</a>
            </div>
          </div>

        </div>
      </footer>

      {/* 14. STICKY MOBILE BOTTOM BAR */}
      {isMobile && (
        <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 flex items-center justify-between gap-3 shadow-2xl">
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">{t.hero.fromPrice}</span>
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
                <span>{t.nav.quoteBtn}</span>
              </button>
            ) : (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-5 py-2.5 rounded-full shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <MessageCircle size={14} />
                <span>{t.nav.bookNow}</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Quote Modal */}
      <QuoteModal 
        isOpen={isQuoteOpen} 
        onClose={() => setIsQuoteOpen(false)} 
        landing={data} 
        lang={currentLang} 
      />
    </div>
  );
}
