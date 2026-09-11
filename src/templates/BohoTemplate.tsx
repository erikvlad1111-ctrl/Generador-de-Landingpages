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
  Calendar, 
  Star, 
  HelpCircle, 
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

interface TemplateProps {
  data: LandingData;
  isLive?: boolean;
  viewMode?: 'desktop' | 'tablet' | 'mobile';
}

export default function BohoTemplate({ data, viewMode = 'desktop' }: TemplateProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const isQuote = data.objective === 'quote';
  const isMobile = viewMode === 'mobile';

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
          <div className="w-8 h-8 rounded-full bg-[#C86D51]/15 text-[#C86D51] flex items-center justify-center font-serif text-sm font-bold">
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

        {!isMobile && (
          <nav className="hidden md:flex items-center gap-6 text-xs tracking-wider uppercase font-medium text-stone-600">
            <a href="#itinerario" className="hover:text-[#C86D51] transition-colors">Bitácora</a>
            <a href="#galeria" className="hover:text-[#C86D51] transition-colors">Pines & Fotos</a>
            <a href="#mochila" className="hover:text-[#C86D51] transition-colors">Mochila</a>
            <a href="#faq" className="hover:text-[#C86D51] transition-colors">Dudas</a>
          </nav>
        )}

        <div className="flex items-center gap-2">
          {isQuote ? (
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
              <span>{data.hero?.badge || 'Edición Travel Journal'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-stone-900 leading-[1.15] tracking-tight">
              {data.hero?.title || data.name}
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
              {data.hero?.subtitle || 'Una experiencia curada para viajeros que aprecian los detalles, la fotografía y la autenticidad de los Andes peruanos.'}
            </p>

            {/* Quick Stats Tags */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs flex items-center gap-1.5 shadow-xs">
                <Compass size={14} className="text-[#C86D51]" />
                {data.duration || 'Full Day'}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs flex items-center gap-1.5 shadow-xs">
                <MapPin size={14} className="text-[#588157]" />
                {data.destination || 'Cusco & Valle Sagrado'}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs flex items-center gap-1.5 shadow-xs">
                <Users size={14} className="text-stone-500" />
                {data.groupType || 'Grupos Reducidos'}
              </span>
            </div>

            {/* Price & Primary CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <div className="bg-white px-5 py-3 rounded-2xl border border-stone-200/90 shadow-xs">
                <span className="text-[11px] text-stone-500 block uppercase tracking-wider font-semibold">Inversión</span>
                <span className="text-2xl font-serif font-bold text-stone-900">{data.price || 'S/ 180'}</span>
                <span className="text-xs text-stone-500 ml-1">/ viajero</span>
              </div>

              {isQuote ? (
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
          </div>

          {/* Right Hero: Pinterest Polaroid Collage */}
          <div className="md:col-span-5 relative flex justify-center">
            {/* Background Decorative Polaroid */}
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

            {/* Main Featured Polaroid Card */}
            <div className="relative z-10 w-64 sm:w-72 bg-white p-3 pb-7 rounded-2xl shadow-xl border border-stone-200 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-100">
                <Image
                  src={heroImg}
                  alt={data.name}
                  fill
                  priority
                  sizes="320px"
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs p-1.5 rounded-full text-rose-500 shadow-xs">
                  <Heart size={14} fill="currentColor" />
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="font-serif italic text-stone-800 text-sm font-medium">
                  "{data.name}"
                </p>
                <p className="text-[10px] font-sans uppercase tracking-widest text-stone-400 mt-1">
                  Guía Oficial: {data.guideName || 'Cusco Creativos'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust Badges Bar (DIRCETUR, Safe Travels) */}
      {data.trustBadges && data.trustBadges.length > 0 && (
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

      {/* Section: Masonry Photo Grid ("Pinterest Travel Pins") */}
      <section id="galeria" className="py-12 sm:py-16 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest font-serif font-semibold text-[#C86D51]">
            Galería Fotográfica
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900">
            Postales & Recuerdos del Recorrido
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Cada rincón de esta ruta ofrece composiciones naturales únicas para fotografía y contemplación.
          </p>
        </div>

        {/* Masonry / Pinterest Pin Cards */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {gallery.map((imgUrl, i) => (
            <div 
              key={i}
              className="break-inside-avoid bg-white p-3 pb-5 rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              style={{ transform: i % 2 === 0 ? 'rotate(-0.8deg)' : 'rotate(0.8deg)' }}
            >
              <div className="relative rounded-xl overflow-hidden bg-stone-100 aspect-[4/5]">
                <Image
                  src={imgUrl}
                  alt={`Pin de viaje ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 bg-stone-900/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Bookmark size={10} /> Pin #{i + 1}
                </div>
              </div>
              <p className="mt-2.5 text-xs font-serif italic text-stone-600 text-center">
                {i === 0 ? 'Vistas panorámicas andinas' : i === 1 ? 'Llegada al punto más alto' : i === 2 ? 'Flora y lagunas sagradas' : 'Encuentro con la cultura local'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Itinerary (Visual Travel Journal by Day) */}
      <section id="itinerario" className="py-12 sm:py-16 px-4 sm:px-8 bg-[#F3EFEA] border-y border-stone-200">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest font-serif font-semibold text-[#588157]">
              Hoja de Ruta
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900">
              Itinerario Detallado de la Experiencia
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Tiempos calculados para disfrutar sin prisa, con paradas fotográficas y explicación histórica.
            </p>
          </div>

          <div className="space-y-4">
            {(data.itinerary || [
              { step: '04:30 AM', title: 'Partida desde el Hotel en Cusco', desc: 'Recojo privado en movilidad turística climatizada para iniciar el viaje hacia el valle.' },
              { step: '07:30 AM', title: 'Desayuno Campestre Orgánico', desc: 'Parada en pintoresco poblado andino con insumos locales frescos y café de altura.' },
              { step: '09:30 AM', title: 'Comienzo de la Caminata con Guía', desc: 'Ascenso a ritmo suave con bastones, paradas explicativas y tiempo para fotos.' },
              { step: '12:30 PM', title: 'Llegada y Contemplación', desc: 'Tiempo libre para descansar frente al paisaje, sesión fotográfica y refrigerio.' },
              { step: '05:00 PM', title: 'Retorno a la Ciudad del Cusco', desc: 'Regreso tranquilo al centro de la ciudad para descansar.' }
            ]).map((item, idx) => (
              <div 
                key={idx}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-[#C86D51]/50 transition-colors"
              >
                <div className="w-24 shrink-0 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-stone-200 text-center">
                  <span className="font-serif font-semibold text-xs text-[#C86D51] block">{item.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm sm:text-base font-serif font-semibold text-stone-900">{item.title}</h3>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusiones & Exclusiones & Mochila */}
      <section id="mochila" className="py-12 sm:py-16 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Incluye */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#588157]">
              <CheckCircle2 size={18} />
              <h3 className="font-serif font-semibold text-base text-stone-900">¿Qué Incluye?</h3>
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
              <h3 className="font-serif font-semibold text-base text-stone-900">No Incluye</h3>
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
              <h3 className="font-serif font-semibold text-base text-stone-900">Mochila de Viaje</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-stone-700">
              {(data.whatToBring || [
                'Casaca cortaviento y ropa abrigadora',
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
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 px-4 sm:px-8 bg-white border-t border-stone-200">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs uppercase tracking-widest font-serif font-semibold text-stone-500">
              Preguntas Frecuentes
            </span>
            <h2 className="text-xl sm:text-2xl font-serif text-stone-900">
              Todo lo que necesitas saber antes de ir
            </h2>
          </div>

          <div className="space-y-3">
            {(data.faqs || [
              { q: '¿Se requiere experiencia previa en caminatas?', a: 'No es indispensable, pero recomendamos haber pasado al menos 24 horas previas en Cusco para aclimatarse a la altura.' },
              { q: '¿Qué pasa si el clima cambia durante el tour?', a: 'Nuestros guías monitorean el pronóstico satelital andino y cuentan con capas de contingencia para asegurar una experiencia segura.' },
              { q: '¿Puedo alquilar caballo de emergencia?', a: 'Sí, las comunidades locales ofrecen caballos de alquiler en el punto de inicio para quienes prefieran evitar el ascenso a pie.' }
            ]).map((faq, i) => (
              <div key={i} className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <p className="font-serif font-semibold text-xs sm:text-sm text-stone-800 flex items-center gap-2">
                  <HelpCircle size={15} className="text-[#C86D51] shrink-0" />
                  {faq.q}
                </p>
                <p className="text-xs text-stone-600 mt-1 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
