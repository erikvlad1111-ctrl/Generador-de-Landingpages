import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Clock, Star, CheckCircle, MessageCircle, HelpCircle, FileText, ShieldCheck, XCircle, Backpack, Calendar } from 'lucide-react';
import { LandingData } from '@/types/landing';
import QuoteModal from '@/components/common/QuoteModal';

interface TemplateProps {
  data: LandingData;
  isLive?: boolean;
  viewMode?: 'desktop' | 'tablet' | 'mobile';
}

export default function AdventureTemplate({ data, viewMode = 'desktop' }: TemplateProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const isQuote = data.objective === 'quote';
  const isMobile = viewMode === 'mobile';

  const cleanPhone = (data.whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(`Hola ${data.guideName || 'Cusco Creativos'}, deseo consultar disponibilidad para el tour "${data.name || data.hero.title}".`);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  const heroImg = data.heroImage || 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop';
  const gallery1 = data.galleryImages?.[0] || 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop';
  const gallery2 = data.galleryImages?.[1] || 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop';

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-emerald-500 selection:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 w-full z-40 bg-stone-900/95 backdrop-blur-sm text-white px-4 sm:px-8 py-3 sm:py-4 flex justify-between items-center gap-3">
        <div className="text-base sm:text-xl font-bold tracking-tighter uppercase text-emerald-400 flex items-center gap-2 min-w-0">
          <MapPin size={18} className="shrink-0" />
          <span className="truncate">TrekExplorer</span>
        </div>
        {!isMobile && (
          <div className="hidden md:flex gap-6 text-sm font-medium shrink-0">
            <a href="#ruta" className="hover:text-emerald-400 transition-colors">La Ruta</a>
            <a href="#incluye" className="hover:text-emerald-400 transition-colors">¿Qué Incluye?</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">Preguntas Frecuentes</a>
          </div>
        )}
        {isQuote ? (
          <button
            onClick={() => setIsQuoteOpen(true)}
            className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 sm:px-6 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all shadow-lg flex items-center gap-1.5 sm:gap-2 cursor-pointer"
          >
            <FileText size={15} />
            <span>Cotizar</span>
          </button>
        ) : (
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 sm:px-6 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center gap-1.5 sm:gap-2 cursor-pointer"
          >
            <MessageCircle size={15} />
            <span>Reservar</span>
          </a>
        )}
      </nav>

      {/* Hero Section */}
      <section className={`relative ${isMobile ? 'py-12 min-h-[480px]' : 'py-20 h-[90vh]'} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-stone-900/40 z-10" />
        <Image 
          src={heroImg} 
          alt={data.name || "Mountain landscape"} 
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className={`relative z-20 text-center text-white ${isMobile ? 'px-4' : 'px-4'} max-w-4xl mx-auto flex flex-col items-center`}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-medium mb-4 backdrop-blur-md">
            <MapPin size={13} /> {data.hero.badge || 'Aventura Extrema'}
          </span>
          <h1 className={`${isMobile ? 'text-2xl leading-tight mb-3' : 'text-3xl sm:text-5xl md:text-7xl leading-tight mb-6'} font-extrabold tracking-tight drop-shadow-lg`}>
            {data.hero.title}
          </h1>
          <p className={`${isMobile ? 'text-xs mb-6' : 'text-base sm:text-xl md:text-2xl mb-10'} text-stone-200 max-w-2xl font-light drop-shadow`}>
            {data.hero.subtitle}
          </p>
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-col sm:flex-row'} items-center gap-3 w-full max-w-md justify-center`}>
            {isQuote ? (
              <button
                onClick={() => setIsQuoteOpen(true)}
                className={`bg-emerald-600 hover:bg-emerald-500 text-white ${isMobile ? 'w-full py-3 text-sm' : 'text-lg px-8 py-4'} rounded-full font-bold transition-all shadow-xl shadow-emerald-600/20 hover:scale-105 flex items-center justify-center gap-2 cursor-pointer`}
              >
                <FileText size={20} />
                {data.hero.cta || 'Solicitar Cotización'}
              </button>
            ) : (
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-emerald-600 hover:bg-emerald-500 text-white ${isMobile ? 'w-full py-3 text-sm' : 'text-lg px-8 py-4'} rounded-full font-bold transition-all shadow-xl shadow-emerald-600/20 hover:scale-105 flex items-center justify-center gap-2 cursor-pointer`}
              >
                <MessageCircle size={20} />
                {data.hero.cta}
              </a>
            )}
            {data.price && (
              <div className={`bg-stone-900/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-stone-700 text-xs sm:text-sm font-semibold ${isMobile ? 'w-full text-center' : ''}`}>
                Desde <span className="text-emerald-400 font-bold">{data.price}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className={`relative z-30 ${isMobile ? 'mt-4 px-3' : '-mt-12 max-w-5xl mx-auto px-4'}`}>
        <div className={`bg-white rounded-2xl shadow-xl ${isMobile ? 'p-4 grid grid-cols-1 gap-4' : 'p-8 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-100'}`}>
          <div className="flex items-center gap-4 md:justify-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium">Duración</p>
              <p className="font-bold text-base sm:text-lg">{data.duration || '3 Días, 2 Noches'}</p>
            </div>
          </div>
          <div className={`flex items-center gap-4 md:justify-center ${isMobile ? '' : 'pt-6 md:pt-0'}`}>
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium">Guía Líder</p>
              <p className="font-bold text-base sm:text-lg">{data.guideName || 'Cusco, Perú'}</p>
            </div>
          </div>
          <div className={`flex items-center gap-4 md:justify-center ${isMobile ? '' : 'pt-6 md:pt-0'}`}>
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <Star size={24} />
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium">Dificultad</p>
              <p className="font-bold text-base sm:text-lg">{data.difficulty || 'Moderada'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      {data.trustBadges && data.trustBadges.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 mt-6">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {data.trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-1.5 rounded-full font-medium shadow-xs">
                <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="ruta" className={`${isMobile ? 'py-10 px-4' : 'py-20 px-8'} max-w-6xl mx-auto`}>
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'md:grid-cols-2 gap-16'} items-center`}>
          <div>
            <h2 className={`${isMobile ? 'text-2xl mb-4' : 'text-4xl mb-6'} font-bold text-stone-800`}>{data.about.title}</h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              {data.about.content}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-lg">
              <Image 
                src={gallery1} 
                alt="Tour Gallery 1" 
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                className="object-cover" 
              />
            </div>
            <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-lg mt-4 sm:mt-8">
              <Image 
                src={gallery2} 
                alt="Tour Gallery 2" 
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                className="object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary Timeline */}
      {data.itinerary && data.itinerary.length > 0 && (
        <section id="itinerario" className={`${isMobile ? 'py-10 px-4' : 'py-16 px-8'} bg-white border-y border-stone-200`}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-2">
                <Calendar size={15} /> Itinerario Detallado
              </div>
              <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'} font-bold text-stone-900`}>
                Paso a Paso de la Aventura
              </h2>
            </div>
            <div className="space-y-4 sm:space-y-6 relative before:absolute before:inset-0 before:left-4 sm:before:left-5 before:w-0.5 before:bg-emerald-200">
              {data.itinerary.map((item, idx) => (
                <div key={idx} className="relative flex items-start gap-3.5 sm:gap-6 pl-1 sm:pl-2">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-md ring-4 ring-white z-10">
                    {idx + 1}
                  </div>
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-5 w-full shadow-xs">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-md inline-block mb-1.5">
                      {item.step}
                    </span>
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base mb-1">{item.title}</h3>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features/Highlights */}
      <section id="incluye" className={`${isMobile ? 'py-10 px-4' : 'py-20 px-8'} bg-stone-900 text-white`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`${isMobile ? 'text-2xl mb-8' : 'text-4xl mb-16'} font-bold text-center`}>{data.features.title}</h2>
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'md:grid-cols-3 gap-8'}`}>
            {data.features.items.map((item, idx) => (
              <div key={idx} className={`bg-stone-800 ${isMobile ? 'p-5' : 'p-8'} rounded-2xl border border-stone-700 hover:border-emerald-500 transition-colors`}>
                <CheckCircle className="text-emerald-400 mb-4" size={28} />
                <h3 className="text-lg font-bold mb-2">{item.split(':')[0]}</h3>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                  {item.split(':')[1] || "Una experiencia inolvidable que cambiará tu perspectiva."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics: Exclusiones & Qué Llevar */}
      {((data.notIncluded && data.notIncluded.length > 0) || (data.whatToBring && data.whatToBring.length > 0)) && (
        <section className={`${isMobile ? 'py-10 px-4' : 'py-16 px-8'} bg-stone-100 border-b border-stone-200`}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Qué NO incluye */}
            {data.notIncluded && data.notIncluded.length > 0 && (
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-rose-100 shadow-xs">
                <div className="flex items-center gap-2 text-rose-600 font-bold text-sm sm:text-base mb-3.5">
                  <XCircle size={20} className="shrink-0" />
                  <h3>Qué NO está incluido</h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
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
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-emerald-100 shadow-xs">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm sm:text-base mb-3.5">
                  <Backpack size={20} className="shrink-0" />
                  <h3>Qué llevar en tu mochila</h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                  {data.whatToBring.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
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
        <section className={`${isMobile ? 'py-10 px-4' : 'py-16 px-8'} bg-stone-100`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`${isMobile ? 'text-2xl mb-6' : 'text-3xl mb-12'} font-bold text-stone-900`}>Lo que dicen nuestros viajeros</h2>
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-2 gap-8'}`}>
              {data.testimonials.map((t, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl shadow-xs border border-stone-200 text-left">
                  <div className="flex gap-1 text-amber-400 mb-2">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-stone-600 text-xs sm:text-sm italic mb-3">&quot;{t.comment}&quot;</p>
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
            <div className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-2">
              <HelpCircle size={15} /> Preguntas Frecuentes
            </div>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-stone-900`}>Todo lo que necesitas saber</h2>
          </div>
          <div className="space-y-3">
            {data.faqs.map((faq, idx) => (
              <div key={idx} className={`bg-white ${isMobile ? 'p-4' : 'p-6'} rounded-2xl shadow-xs border border-stone-200`}>
                <h3 className="font-bold text-stone-800 text-sm sm:text-base mb-1.5">{faq.q}</h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Simple Footer */}
      <footer className="bg-stone-950 py-8 text-center text-stone-500 text-xs">
        <p>© 2026 Cusco Creativos S.A.C. Todos los derechos reservados.</p>
      </footer>

      {/* Quote Modal */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} landing={data} />
    </div>
  );
}
