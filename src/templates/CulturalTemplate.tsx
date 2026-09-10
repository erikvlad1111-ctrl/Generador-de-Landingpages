'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Landmark, Compass, Users, CheckCircle2, MessageCircle, MapPin, Calendar, Star, HelpCircle, FileText } from 'lucide-react';
import { LandingData } from '@/types/landing';
import QuoteModal from '@/components/common/QuoteModal';

interface TemplateProps {
  data: LandingData;
  isLive?: boolean;
  viewMode?: 'desktop' | 'tablet' | 'mobile';
}

export default function CulturalTemplate({ data, viewMode = 'desktop' }: TemplateProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const isQuote = data.objective === 'quote';
  const isMobile = viewMode === 'mobile';

  const cleanPhone = (data.whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(`Hola ${data.guideName || 'Guía Cultural'}, me interesa el tour cultural "${data.name || data.hero?.title}". ¿Qué fechas tienen disponibles?`);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  const heroImg = data.heroImage || 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop';
  const gallery1 = data.galleryImages?.[0] || 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop';
  const gallery2 = data.galleryImages?.[1] || 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop';

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-stone-800 selection:bg-amber-700 selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-40 bg-stone-900/95 backdrop-blur-sm text-stone-200 px-4 sm:px-8 py-3 sm:py-4 flex justify-between items-center border-b border-amber-900/40 gap-3">
        <div className="flex items-center gap-2 text-amber-500 font-bold tracking-tight text-base sm:text-lg min-w-0">
          <Landmark size={20} className="shrink-0" />
          <span className={`${isMobile ? 'text-xs' : 'text-base sm:text-lg'} font-serif tracking-wider uppercase text-amber-400 truncate`}>
            Cusco Ancestral
          </span>
        </div>
        {!isMobile && (
          <div className="hidden md:flex gap-6 text-sm font-medium text-stone-300 shrink-0">
            <a href="#historia" className="hover:text-amber-400 transition-colors">Historia & Ruta</a>
            <a href="#detalles" className="hover:text-amber-400 transition-colors">Detalles del Tour</a>
            <a href="#faq" className="hover:text-amber-400 transition-colors">Preguntas</a>
          </div>
        )}
        {isQuote ? (
          <button
            onClick={() => setIsQuoteOpen(true)}
            className="shrink-0 bg-amber-600 hover:bg-amber-500 text-white px-3.5 sm:px-5 py-2 rounded-lg font-semibold text-xs transition-colors shadow-md flex items-center gap-1.5 sm:gap-2 cursor-pointer"
          >
            <FileText size={15} />
            <span>Cotizar</span>
          </button>
        ) : (
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white px-3.5 sm:px-5 py-2 rounded-lg font-semibold text-xs transition-colors shadow-md flex items-center gap-1.5 sm:gap-2 cursor-pointer"
          >
            <MessageCircle size={15} />
            <span>Consultar</span>
          </a>
        )}
      </nav>

      {/* Hero Section */}
      <section className={`relative ${isMobile ? 'py-12 min-h-[480px]' : 'py-20 min-h-[88vh]'} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-stone-950/50 z-10" />
        <Image 
          src={heroImg} 
          alt={data.name || 'Tour Cultural'}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        
        <div className={`relative z-20 text-center text-white ${isMobile ? 'px-4' : 'px-6'} max-w-4xl mx-auto flex flex-col items-center`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-700/80 border border-amber-400/30 text-amber-200 text-xs font-semibold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Compass size={13} />
            {data.hero?.badge || 'Recorrido Histórico'}
          </div>
          <h1 className={`${isMobile ? 'text-2xl leading-tight mb-3' : 'text-3xl sm:text-5xl md:text-6xl leading-tight mb-6'} font-serif font-extrabold tracking-tight drop-shadow-md`}>
            {data.hero?.title}
          </h1>
          <p className={`${isMobile ? 'text-xs mb-6' : 'text-base sm:text-lg md:text-xl mb-8'} text-stone-200 max-w-2xl font-normal leading-relaxed drop-shadow`}>
            {data.hero?.subtitle}
          </p>

          <div className={`flex ${isMobile ? 'flex-col' : 'flex-col sm:flex-row'} items-center gap-3 w-full max-w-md justify-center`}>
            {isQuote ? (
              <button
                onClick={() => setIsQuoteOpen(true)}
                className={`bg-amber-600 hover:bg-amber-500 text-white ${isMobile ? 'w-full py-3 text-sm' : 'px-8 py-4 text-base'} rounded-xl font-bold transition-all shadow-xl shadow-amber-900/40 hover:scale-105 flex items-center justify-center gap-2.5 cursor-pointer`}
              >
                <FileText size={18} />
                <span>Solicitar Cotización</span>
              </button>
            ) : (
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-amber-600 hover:bg-amber-500 text-white ${isMobile ? 'w-full py-3 text-sm' : 'px-8 py-4 text-base'} rounded-xl font-bold transition-all shadow-xl shadow-amber-900/40 hover:scale-105 flex items-center justify-center gap-2.5 cursor-pointer`}
              >
                <MessageCircle size={18} />
                <span>Reservar por WhatsApp</span>
              </a>
            )}
            <div className={`bg-stone-900/80 backdrop-blur-md px-5 py-2.5 rounded-xl border border-stone-700 text-left ${isMobile ? 'w-full text-center' : ''}`}>
              <span className="text-[10px] text-amber-400 block uppercase font-medium">Inversión por persona</span>
              <span className="text-lg sm:text-xl font-bold text-white">{data.price || 'S/ 70 PEN'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Info Pills */}
      <section className={`relative z-30 ${isMobile ? 'mt-4 px-3' : '-mt-8 max-w-5xl mx-auto px-4'}`}>
        <div className={`bg-white rounded-2xl shadow-xl border border-stone-200 ${isMobile ? 'p-4 grid grid-cols-1 gap-4' : 'p-6 grid grid-cols-1 md:grid-cols-3 gap-6'}`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs text-stone-500 uppercase font-semibold">Guía Certificado</p>
              <p className="font-bold text-stone-800 text-sm sm:text-base">{data.guideName || 'Historiador Oficial'}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-xs text-stone-500 uppercase font-semibold">Tiempo Estimado</p>
              <p className="font-bold text-stone-800 text-sm sm:text-base">{data.duration || 'Media Jornada (4 Horas)'}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-xs text-stone-500 uppercase font-semibold">Dificultad</p>
              <p className="font-bold text-stone-800 text-sm sm:text-base">{data.difficulty || 'Apto para toda la familia'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* History / About */}
      <section id="historia" className={`${isMobile ? 'py-10 px-4' : 'py-20 px-8'} max-w-6xl mx-auto`}>
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'md:grid-cols-2 gap-16'} items-center`}>
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-2">Inmersión Cultural</span>
            <h2 className={`${isMobile ? 'text-2xl mb-4' : 'text-3xl md:text-4xl mb-6'} font-serif font-bold text-stone-900`}>{data.about?.title}</h2>
            <p className="text-stone-600 leading-relaxed text-sm sm:text-base mb-6">
              {data.about?.content}
            </p>
            <div className="border-l-4 border-amber-600 pl-4 py-2 italic text-xs sm:text-sm text-stone-700 bg-amber-50/50 rounded-r-lg">
              &quot;Una experiencia enriquecedora que conecta el pasado imperial con la vibrante cultura viva de la gente del Cusco.&quot;
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-lg border border-stone-200">
              <Image 
                src={gallery1} 
                alt="Detalle 1" 
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                className="object-cover" 
              />
            </div>
            <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-lg border border-stone-200 mt-4 sm:mt-6">
              <Image 
                src={gallery2} 
                alt="Detalle 2" 
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                className="object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features / Incluye */}
      <section id="detalles" className={`${isMobile ? 'py-10 px-4' : 'py-20 px-8'} bg-stone-200/60 border-y border-stone-300`}>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-serif font-bold text-stone-900`}>{data.features?.title}</h2>
            <p className="text-stone-600 mt-2 text-xs sm:text-sm">Detalles cuidadosamente organizados para que vivas la historia con total tranquilidad.</p>
          </div>
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'md:grid-cols-2 gap-8'}`}>
            {data.features?.items?.map((item, idx) => (
              <div key={idx} className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-stone-200 flex gap-3.5 sm:gap-4">
                <CheckCircle2 className="text-amber-600 shrink-0 mt-0.5" size={22} />
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-stone-800 mb-1">{item.split(':')[0]}</h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {item.split(':')[1] || 'Atención de primer nivel guiada por profesionales.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {data.testimonials && data.testimonials.length > 0 && (
        <section className={`${isMobile ? 'py-10 px-4' : 'py-16 px-8'} bg-white border-b border-stone-200`}>
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">Opiniones Reales</span>
            <h2 className={`${isMobile ? 'text-2xl mb-6' : 'text-3xl mb-12'} font-serif font-bold text-stone-900`}>Experiencias que inspiran</h2>
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-2 gap-8'}`}>
              {data.testimonials.map((t, idx) => (
                <div key={idx} className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-left">
                  <div className="flex gap-1 text-amber-500 mb-2">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-stone-700 text-xs sm:text-sm italic mb-3">&quot;{t.comment}&quot;</p>
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs sm:text-sm">{t.name}</h4>
                    <p className="text-[11px] text-stone-400">{t.origin}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {data.faqs && data.faqs.length > 0 && (
        <section id="faq" className={`${isMobile ? 'py-10 px-4' : 'py-16 px-8'} max-w-4xl mx-auto`}>
          <div className={`text-center ${isMobile ? 'mb-6' : 'mb-12'}`}>
            <div className="inline-flex items-center gap-1.5 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
              <HelpCircle size={15} /> Preguntas Frecuentes
            </div>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-serif font-bold text-stone-900`}>Resolvemos tus dudas</h2>
          </div>
          <div className="space-y-3">
            {data.faqs.map((faq, idx) => (
              <div key={idx} className={`bg-white ${isMobile ? 'p-4' : 'p-6'} rounded-2xl shadow-xs border border-stone-200`}>
                <h3 className="font-bold text-stone-900 text-sm sm:text-base mb-1.5">{faq.q}</h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Action / Contact Section */}
      <section id="contacto" className={`${isMobile ? 'py-12 px-4' : 'py-20 px-8'} text-center bg-stone-900 text-white`}>
        <div className="max-w-xl mx-auto space-y-4 sm:space-y-6">
          <h2 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-serif font-bold`}>¿Listo para conectar con la historia?</h2>
          <p className="text-stone-400 text-xs sm:text-sm">
            {isQuote 
              ? 'Envíanos los requerimientos de tu grupo y recibe una propuesta con itinerario detallado y tarifas corporativas.'
              : 'Escríbenos directamente a WhatsApp para verificar salidas diarias, traslados desde tu hotel y promociones para grupos.'}
          </p>
          {isQuote ? (
            <button
              onClick={() => setIsQuoteOpen(true)}
              className={`inline-flex items-center justify-center gap-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold ${isMobile ? 'w-full py-3 text-sm' : 'px-8 py-4 text-base'} rounded-xl shadow-lg shadow-amber-900/30 transition-all hover:scale-105 cursor-pointer`}
            >
              <FileText size={18} />
              <span>Solicitar Cotización de Grupo</span>
            </button>
          ) : (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold ${isMobile ? 'w-full py-3 text-sm' : 'px-8 py-4 text-base'} rounded-xl shadow-lg shadow-emerald-900/30 transition-all hover:scale-105 cursor-pointer`}
            >
              <MessageCircle size={18} />
              <span>Contactar por WhatsApp al {data.whatsapp || '+51 984 123 456'}</span>
            </a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 py-8 text-center text-stone-500 text-xs">
        <p>© 2026 Cusco Creativos S.A.C. — Edición Cultural Andina.</p>
      </footer>

      {/* Quote Modal */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} landing={data} />
    </div>
  );
}
