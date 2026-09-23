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
  Bookmark
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

export default function BohoTemplate({ data, viewMode = 'desktop' }: TemplateProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
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
          <nav className="hidden md:flex items-center gap-6 text-xs tracking-wider uppercase font-medium text-stone-600">
            <a href="#sobre-tour" className="hover:text-[#C86D51] transition-colors">Sobre el Tour</a>
            <a href="#galeria" className="hover:text-[#C86D51] transition-colors">{isBasic ? 'Postales' : 'Pines & Fotos'}</a>
            
            {/* Pro & Advance Nav */}
            {(isPro || isAdvance) && (
              <>
                <a href="#itinerario" className="hover:text-[#C86D51] transition-colors">Bitácora</a>
                <a href="#mochila" className="hover:text-[#C86D51] transition-colors">Mochila</a>
              </>
            )}

            {/* Advance Only Nav */}
            {isAdvance && (
              <a href="#testimonios" className="hover:text-[#C86D51] transition-colors">Viajeros</a>
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

            {/* Micro Reassurance Banner (Highlighted on Free tier for immediate trust) */}
            <p className="text-xs text-stone-500 flex items-center gap-2 pt-1 font-serif italic">
              <CheckCircle2 size={13} className="text-[#588157] shrink-0" />
              <span>Respuesta inmediata en minutos • Coordinación directa con el guía</span>
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

      {/* Testimonials - ADVANCE ONLY: Vintage Polaroids & Traveler Journal Notes */}
      {isAdvance && (
        <section id="testimonios" className="py-14 sm:py-20 px-4 sm:px-8 bg-[#F3EFEA] border-y border-stone-200">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-widest font-serif font-bold text-[#C86D51] flex items-center justify-center gap-1.5">
                <Heart size={14} className="text-rose-500 fill-rose-500" /> Notas de Campo
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif text-stone-900">
                Bitácoras de Viajeros Reales
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
                Testimonios de fotógrafos, parejas y aventureros que vivieron la experiencia Boho Travel Journal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(data.testimonials && data.testimonials.length > 0 ? data.testimonials : [
                {
                  name: 'Valeria & Mateo',
                  origin: 'Santiago, Chile',
                  comment: 'La estética del tour y el ritmo pausado fue perfecto para nosotros que amamos la fotografía. El guía nos recomendó los mejores ángulos con la luz de la mañana.',
                  rating: 5
                },
                {
                  name: 'Camila & Sophie',
                  origin: 'Lyon, Francia',
                  comment: 'Un voyage magique ! Desayuno riquísimo en los domos y bastones de trekking incluidos que nos ayudaron muchísimo en la subida.',
                  rating: 5
                },
                {
                  name: 'Diego Arismendi',
                  origin: 'Lima, Perú',
                  comment: 'Lejos el mejor tour que tomé en Cusco. Cero apuros, grupo muy ameno de solo 8 personas y las fotos quedaron como portada de revista.',
                  rating: 5
                }
              ]).map((t, idx) => (
                <div 
                  key={idx}
                  className={`bg-white p-5 pb-7 rounded-2xl shadow-md border border-stone-200/90 relative transform ${
                    idx === 0 ? '-rotate-1 hover:rotate-0' : idx === 1 ? 'rotate-1 hover:rotate-0' : '-rotate-0.5 hover:rotate-0'
                  } transition-transform duration-300 space-y-3`}
                >
                  {/* Washi tape sticker */}
                  <div className="w-16 h-3 bg-[#E8DEC8]/80 absolute -top-1.5 left-1/2 -translate-x-1/2 rotate-1 shadow-2xs" />
                  
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-amber-500 pt-1">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm font-serif italic text-stone-700 leading-relaxed">
                    &quot;{t.comment}&quot;
                  </p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900">{t.name}</h4>
                      <p className="text-[10px] text-stone-500">{t.origin}</p>
                    </div>
                    <span className="text-[10px] font-mono text-[#C86D51] bg-[#C86D51]/10 px-2 py-0.5 rounded-full font-bold">
                      Viajero Verificado
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tour Support & FAQs - FOR BASIC, PRO, ADVANCE (Hidden on Free to ensure Free is 1 single high-impact section) */}
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
      <footer className="bg-stone-900 text-stone-300 py-10 px-4 sm:px-8 text-center space-y-5">
        <div className="max-w-xl mx-auto space-y-2">
          <h3 className="text-xl sm:text-2xl font-serif text-white">¿Listo para vivir esta experiencia?</h3>
          <p className="text-xs text-stone-400">
            Reserva con anticipación para asegurar cupos en grupos reducidos con atención personalizada.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3">
          {isQuote ? (
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="bg-[#C86D51] hover:bg-[#b05d43] text-white px-6 py-3 rounded-full font-medium text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <FileText size={15} />
              <span>Solicitar Cotización Formal</span>
            </button>
          ) : (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#588157] hover:bg-[#476846] text-white px-6 py-3 rounded-full font-medium text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle size={15} />
              <span>Hablar con el Guía por WhatsApp</span>
            </a>
          )}
        </div>

        <p className="text-[10px] text-stone-500 pt-4">
          © {new Date().getFullYear()} Cusco Creativos S.A.C. • Plantilla Boho Travel Journal
        </p>
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
