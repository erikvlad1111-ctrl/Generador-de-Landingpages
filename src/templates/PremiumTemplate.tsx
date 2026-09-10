import React, { useState } from 'react';
import Image from 'next/image';
import { Crown, Sparkles, ShieldCheck, Clock, Award, PhoneCall, MessageCircle, FileText, HelpCircle, Star, Calendar, XCircle, Backpack } from 'lucide-react';
import { LandingData } from '@/types/landing';
import QuoteModal from '@/components/common/QuoteModal';

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
  const encodedMsg = encodeURIComponent(`Hola ${data.guideName || 'Cusco Creativos'}, estoy interesado en la experiencia VIP "${data.name}". ¿Podrían brindarme disponibilidad?`);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  const heroImg = data.heroImage || 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop';
  const gallery1 = data.galleryImages?.[0] || 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop';

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-100 selection:bg-amber-500 selection:text-black">
      {/* Premium Header */}
      <header className="sticky top-0 w-full z-40 bg-neutral-950/90 backdrop-blur-md border-b border-amber-500/20 px-4 sm:px-8 py-3 sm:py-4 flex justify-between items-center gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Crown className="text-amber-400 shrink-0" size={isMobile ? 18 : 20} />
          <span className={`${isMobile ? 'text-xs' : 'text-xs sm:text-base md:text-lg'} font-serif tracking-widest uppercase font-bold text-amber-300 truncate`}>
            Cusco Luxury Collection
          </span>
        </div>
        {!isMobile && (
          <nav className="hidden md:flex gap-6 lg:gap-8 text-xs uppercase tracking-widest text-neutral-400 shrink-0">
            <a href="#itinerario" className="hover:text-amber-400 transition-colors">La Experiencia</a>
            <a href="#privilegios" className="hover:text-amber-400 transition-colors">Privilegios</a>
            <a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a>
          </nav>
        )}
        {isQuote ? (
          <button
            onClick={() => setIsQuoteOpen(true)}
            className="shrink-0 flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 px-3.5 sm:px-5 py-2 rounded-full font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
          >
            <FileText size={14} />
            <span>Cotizar</span>
          </button>
        ) : (
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 px-3.5 sm:px-5 py-2 rounded-full font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
          >
            <MessageCircle size={14} />
            <span>Reserva VIP</span>
          </a>
        )}
      </header>

      {/* Hero Section */}
      <section className={`relative ${isMobile ? 'py-12 min-h-[480px]' : 'py-20 min-h-[85vh]'} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/30 z-10" />
        <Image 
          src={heroImg} 
          alt={data.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 scale-105"
        />
        
        <div className={`relative z-20 text-center text-white ${isMobile ? 'px-4' : 'px-6'} max-w-4xl mx-auto flex flex-col items-center`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 text-[11px] tracking-widest uppercase font-semibold mb-4 backdrop-blur-md">
            <Sparkles size={13} className="text-amber-400" />
            {data.hero?.badge || 'Servicio Exclusivo'}
          </div>
          <h1 className={`${isMobile ? 'text-2xl leading-tight mb-3' : 'text-3xl sm:text-5xl md:text-7xl leading-tight mb-6'} font-serif tracking-tight text-neutral-100`}>
            {data.hero?.title}
          </h1>
          <p className={`${isMobile ? 'text-xs leading-relaxed mb-6' : 'text-base sm:text-lg md:text-xl mb-10 leading-relaxed'} text-neutral-300 max-w-2xl font-light`}>
            {data.hero?.subtitle}
          </p>

          <div className={`flex ${isMobile ? 'flex-col' : 'flex-col sm:flex-row'} items-center gap-3.5 w-full max-w-md justify-center`}>
            {isQuote ? (
              <button
                onClick={() => setIsQuoteOpen(true)}
                className={`bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-neutral-950 ${isMobile ? 'w-full py-3 text-sm' : 'text-base px-8 py-4'} rounded-full font-bold transition-all shadow-xl shadow-amber-500/20 hover:scale-105 flex items-center justify-center gap-2.5 cursor-pointer`}
              >
                <FileText size={18} />
                {data.hero?.cta || 'Solicitar Cotización Privada'}
              </button>
            ) : (
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-neutral-950 ${isMobile ? 'w-full py-3 text-sm' : 'text-base px-8 py-4'} rounded-full font-bold transition-all shadow-xl shadow-amber-500/20 hover:scale-105 flex items-center justify-center gap-2.5 cursor-pointer`}
              >
                <MessageCircle size={18} />
                {data.hero?.cta || 'Consultar Disponibilidad'}
              </a>
            )}
            <div className={`${isMobile ? 'border-t border-amber-500/30 pt-2 w-full text-center' : 'text-left px-4 py-2 border-l border-amber-500/30'}`}>
              <p className="text-[10px] text-amber-400 uppercase tracking-wider font-semibold">Tarifa Desde</p>
              <p className={`${isMobile ? 'text-lg' : 'text-xl'} font-serif font-bold text-white`}>{data.price || '$450 USD'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Badges */}
      <section className={`relative z-30 ${isMobile ? 'mt-4 px-3' : '-mt-10 max-w-5xl mx-auto px-4'}`}>
        <div className={`bg-neutral-900/90 backdrop-blur-md rounded-2xl border border-amber-500/30 ${isMobile ? 'p-4 grid grid-cols-1 gap-3.5' : 'p-6 grid grid-cols-1 md:grid-cols-3 gap-6'} shadow-2xl`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Award size={24} />
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider">Guía Especialista</p>
              <p className="font-serif font-bold text-neutral-100">{data.guideName || 'Oficial Privado'}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider">Duración & Ritmo</p>
              <p className="font-serif font-bold text-neutral-100">{data.duration || '2 Días / 1 Noche'}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider">Garantía de Servicio</p>
              <p className="font-serif font-bold text-neutral-100">100% Personalizado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      {data.trustBadges && data.trustBadges.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 mt-6">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {data.trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-1.5 bg-neutral-900/90 border border-amber-500/30 text-amber-300 text-xs px-3.5 py-1.5 rounded-full font-medium shadow-sm backdrop-blur-md">
                <ShieldCheck size={14} className="text-amber-400 shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="itinerario" className={`${isMobile ? 'py-10 px-4' : 'py-20 px-8'} max-w-6xl mx-auto`}>
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'md:grid-cols-2 gap-16'} items-center`}>
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block mb-2">Exclusividad Andina</span>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-serif font-bold mb-4 text-neutral-100`}>{data.about?.title}</h2>
            <p className="text-sm text-neutral-300 leading-relaxed font-light mb-6">
              {data.about?.content}
            </p>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400">
                <PhoneCall size={18} />
              </div>
              <div>
                <p className="text-xs text-neutral-400">Atención Personalizada Directa</p>
                <p className="font-bold text-sm text-neutral-200">{data.whatsapp || '+51 984 123 456'}</p>
              </div>
            </div>
          </div>
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl">
            <Image 
              src={gallery1} 
              alt="Machu Picchu Luxury" 
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Itinerary Timeline */}
      {data.itinerary && data.itinerary.length > 0 && (
        <section id="itinerario-timeline" className={`${isMobile ? 'py-10 px-4' : 'py-20 px-8'} bg-neutral-900/40 border-t border-neutral-800`}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-14">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block mb-2">Cronograma de Lujo</span>
              <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-5xl'} font-serif font-bold text-neutral-100`}>Itinerario Exclusivo</h2>
            </div>
            <div className="space-y-4 sm:space-y-6 relative before:absolute before:inset-0 before:left-4 sm:before:left-5 before:w-0.5 before:bg-amber-500/30">
              {data.itinerary.map((item, idx) => (
                <div key={idx} className="relative flex items-start gap-3.5 sm:gap-6 pl-1 sm:pl-2">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-neutral-950 font-bold flex items-center justify-center text-xs shrink-0 shadow-lg ring-4 ring-neutral-950 z-10">
                    {idx + 1}
                  </div>
                  <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 sm:p-6 w-full shadow-lg hover:border-amber-500/30 transition-colors">
                    <span className="text-[11px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-md inline-block mb-2">
                      {item.step}
                    </span>
                    <h3 className="font-serif font-bold text-neutral-100 text-base sm:text-lg mb-1.5">{item.title}</h3>
                    <p className="text-neutral-400 font-light text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Privilegios / Features */}
      <section id="privilegios" className={`${isMobile ? 'py-10 px-4' : 'py-20 px-8'} bg-neutral-900/60 border-y border-neutral-800/80`}>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block mb-2">Estándares VIP</span>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-5xl'} font-serif font-bold text-neutral-100`}>{data.features?.title}</h2>
          </div>
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-3.5' : 'md:grid-cols-2 gap-8'}`}>
            {data.features?.items?.map((item, idx) => (
              <div key={idx} className={`bg-neutral-900 ${isMobile ? 'p-5' : 'p-8'} rounded-2xl border border-neutral-800 hover:border-amber-500/40 transition-colors`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                    <Sparkles size={16} />
                  </div>
                  <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-serif font-bold text-neutral-100`}>{item.split(':')[0]}</h3>
                </div>
                <p className={`text-neutral-400 font-light text-sm leading-relaxed ${isMobile ? 'pl-0' : 'pl-11'}`}>
                  {item.split(':')[1] || 'Atención premium orientada a la máxima comodidad.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics: Exclusiones & Equipaje VIP */}
      {((data.notIncluded && data.notIncluded.length > 0) || (data.whatToBring && data.whatToBring.length > 0)) && (
        <section className={`${isMobile ? 'py-10 px-4' : 'py-16 px-8'} bg-neutral-950 border-b border-neutral-800`}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Qué NO incluye */}
            {data.notIncluded && data.notIncluded.length > 0 && (
              <div className="bg-neutral-900/80 p-5 sm:p-6 rounded-2xl border border-neutral-800 shadow-lg">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm sm:text-base mb-3.5">
                  <XCircle size={20} className="shrink-0" />
                  <h3 className="font-serif">No Incluido en Tarifa</h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-400 font-light">
                  {data.notIncluded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold shrink-0">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Qué llevar */}
            {data.whatToBring && data.whatToBring.length > 0 && (
              <div className="bg-neutral-900/80 p-5 sm:p-6 rounded-2xl border border-amber-500/20 shadow-lg">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm sm:text-base mb-3.5">
                  <Backpack size={20} className="shrink-0" />
                  <h3 className="font-serif">Recomendaciones de Equipaje</h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-300 font-light">
                  {data.whatToBring.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
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

      {/* Testimonials */}
      {data.testimonials && data.testimonials.length > 0 && (
        <section className={`${isMobile ? 'py-10 px-4' : 'py-16 px-8'} bg-neutral-900/40 border-b border-neutral-800`}>
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs uppercase tracking-widest text-amber-400 block mb-2 font-semibold">Opiniones Destacadas</span>
            <h2 className={`${isMobile ? 'text-2xl mb-6' : 'text-3xl mb-12'} font-serif font-bold text-white`}>Huéspedes Satisfechos</h2>
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-3.5' : 'grid-cols-1 md:grid-cols-2 gap-8'}`}>
              {data.testimonials.map((t, idx) => (
                <div key={idx} className={`bg-neutral-900 ${isMobile ? 'p-4' : 'p-6'} rounded-2xl border border-amber-500/20 text-left`}>
                  <div className="flex gap-1 text-amber-400 mb-2">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-neutral-300 text-xs sm:text-sm font-light italic mb-3">&quot;{t.comment}&quot;</p>
                  <div>
                    <h4 className="font-serif font-bold text-amber-300 text-xs sm:text-sm">{t.name}</h4>
                    <p className="text-[11px] text-neutral-500">{t.origin}</p>
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
            <span className="text-xs uppercase tracking-widest text-amber-400 block mb-2 font-semibold flex items-center justify-center gap-1.5">
              <HelpCircle size={15} /> Asistencia de Viaje
            </span>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-serif font-bold text-white`}>Preguntas Frecuentes</h2>
          </div>
          <div className="space-y-3">
            {data.faqs.map((faq, idx) => (
              <div key={idx} className={`bg-neutral-900 ${isMobile ? 'p-4' : 'p-6'} rounded-2xl border border-neutral-800`}>
                <h3 className="font-serif font-bold text-amber-300 text-sm sm:text-base mb-1.5">{faq.q}</h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Direct WhatsApp Call to Action */}
      <section id="contacto" className={`${isMobile ? 'py-12 px-4' : 'py-20 px-8'} text-center bg-gradient-to-b from-neutral-900 to-neutral-950`}>
        <div className="max-w-2xl mx-auto">
          <Crown className="text-amber-400 mx-auto mb-3" size={28} />
          <h2 className={`${isMobile ? 'text-xl mb-3' : 'text-3xl mb-4'} font-serif font-bold text-white`}>¿Listo para vivir una experiencia inolvidable?</h2>
          <p className={`${isMobile ? 'text-xs mb-6' : 'text-base mb-8'} text-neutral-400 font-light`}>
            Comunícate de inmediato con el equipo organizador y reserva tus accesos preferentes con confirmación directa.
          </p>
          {isQuote ? (
            <button
              onClick={() => setIsQuoteOpen(true)}
              className={`inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-neutral-950 font-bold ${isMobile ? 'w-full py-3 text-sm' : 'px-8 py-4 text-base'} rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer`}
            >
              <FileText size={18} />
              <span>Solicitar Cotización Privada</span>
            </button>
          ) : (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold ${isMobile ? 'w-full py-3 text-sm' : 'px-8 py-4 text-base'} rounded-full shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 cursor-pointer`}
            >
              <MessageCircle size={18} />
              <span>Hablar por WhatsApp con {data.guideName || 'el Guía'}</span>
            </a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-neutral-600 text-xs border-t border-neutral-900">
        <p>© 2026 Cusco Creativos S.A.C. — Edición de Lujo.</p>
      </footer>

      {/* Quote Modal */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} landing={data} />
    </div>
  );
}
