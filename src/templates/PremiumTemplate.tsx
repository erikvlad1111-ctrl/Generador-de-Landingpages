import React, { useState } from 'react';
import Image from 'next/image';
import { Crown, Sparkles, ShieldCheck, Clock, Award, PhoneCall, MessageCircle, FileText, HelpCircle, Star } from 'lucide-react';
import { LandingData } from '@/types/landing';
import QuoteModal from '@/components/common/QuoteModal';

interface TemplateProps {
  data: LandingData;
  isLive?: boolean;
}

export default function PremiumTemplate({ data }: TemplateProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const isQuote = data.objective === 'quote';

  const cleanPhone = (data.whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(`Hola ${data.guideName || 'Cusco Creativos'}, estoy interesado en la experiencia VIP "${data.name}". ¿Podrían brindarme disponibilidad?`);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  const heroImg = data.heroImage || 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop';
  const gallery1 = data.galleryImages?.[0] || 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop';

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-100 selection:bg-amber-500 selection:text-black">
      {/* Premium Header */}
      <header className="fixed w-full z-40 bg-neutral-950/80 backdrop-blur-md border-b border-amber-500/20 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Crown className="text-amber-400" size={22} />
          <span className="text-lg font-serif tracking-widest uppercase font-bold text-amber-300">
            Cusco Luxury Collection
          </span>
        </div>
        <nav className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-neutral-400">
          <a href="#itinerario" className="hover:text-amber-400 transition-colors">La Experiencia</a>
          <a href="#privilegios" className="hover:text-amber-400 transition-colors">Privilegios</a>
          <a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a>
        </nav>
        {isQuote ? (
          <button
            onClick={() => setIsQuoteOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
          >
            <FileText size={15} />
            Solicitar Cotización
          </button>
        ) : (
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
          >
            <MessageCircle size={15} />
            Reserva VIP
          </a>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/30 z-10" />
        <Image 
          src={heroImg} 
          alt={data.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 scale-105"
        />
        
        <div className="relative z-20 text-center text-white px-6 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 text-xs tracking-widest uppercase font-semibold mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-amber-400" />
            {data.hero?.badge || 'Servicio Exclusivo'}
          </div>
          <h1 className="text-4xl md:text-7xl font-serif tracking-tight mb-6 leading-tight text-neutral-100">
            {data.hero?.title}
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl font-light leading-relaxed">
            {data.hero?.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {isQuote ? (
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-neutral-950 text-base px-8 py-4 rounded-full font-bold transition-all shadow-xl shadow-amber-500/20 hover:scale-105 flex items-center gap-3"
              >
                <FileText size={20} />
                {data.hero?.cta || 'Solicitar Cotización Privada'}
              </button>
            ) : (
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-neutral-950 text-base px-8 py-4 rounded-full font-bold transition-all shadow-xl shadow-amber-500/20 hover:scale-105 flex items-center gap-3"
              >
                <MessageCircle size={20} />
                {data.hero?.cta || 'Consultar Disponibilidad'}
              </a>
            )}
            <div className="text-left px-4 py-2 border-l border-amber-500/30">
              <p className="text-xs text-amber-400 uppercase tracking-wider font-semibold">Tarifa Desde</p>
              <p className="text-xl font-serif font-bold text-white">{data.price || '$450 USD'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Badges */}
      <section className="relative z-30 -mt-10 max-w-5xl mx-auto px-4">
        <div className="bg-neutral-900/90 backdrop-blur-md rounded-2xl border border-amber-500/30 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-2xl">
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

      {/* About Section */}
      <section id="itinerario" className="py-24 px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block mb-2">Exclusividad Andina</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-neutral-100">{data.about?.title}</h2>
            <p className="text-base text-neutral-300 leading-relaxed font-light mb-8">
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
          <div className="relative h-80 rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl">
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

      {/* Privilegios / Features */}
      <section id="privilegios" className="py-24 bg-neutral-900/60 border-y border-neutral-800/80 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block mb-2">Estándares VIP</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-100">{data.features?.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {data.features?.items?.map((item, idx) => (
              <div key={idx} className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 hover:border-amber-500/40 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                    <Sparkles size={16} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-neutral-100">{item.split(':')[0]}</h3>
                </div>
                <p className="text-neutral-400 font-light text-sm leading-relaxed pl-11">
                  {item.split(':')[1] || 'Atención premium orientada a la máxima comodidad.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {data.testimonials && data.testimonials.length > 0 && (
        <section className="py-20 px-8 bg-neutral-900/40 border-b border-neutral-800">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs uppercase tracking-widest text-amber-400 block mb-2 font-semibold">Opiniones Destacadas</span>
            <h2 className="text-3xl font-serif font-bold text-white mb-12">Huéspedes Satisfechos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.testimonials.map((t, idx) => (
                <div key={idx} className="bg-neutral-900 p-6 rounded-2xl border border-amber-500/20 text-left">
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-neutral-300 text-sm font-light italic mb-4">&quot;{t.comment}&quot;</p>
                  <div>
                    <h4 className="font-serif font-bold text-amber-300 text-sm">{t.name}</h4>
                    <p className="text-xs text-neutral-500">{t.origin}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {data.faqs && data.faqs.length > 0 && (
        <section id="faq" className="py-20 px-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-amber-400 block mb-2 font-semibold flex items-center justify-center gap-1.5">
              <HelpCircle size={15} /> Asistencia de Viaje
            </span>
            <h2 className="text-3xl font-serif font-bold text-white">Preguntas Frecuentes</h2>
          </div>
          <div className="space-y-4">
            {data.faqs.map((faq, idx) => (
              <div key={idx} className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
                <h3 className="font-serif font-bold text-amber-300 text-base mb-2">{faq.q}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Direct WhatsApp Call to Action */}
      <section id="contacto" className="py-20 px-8 text-center bg-gradient-to-b from-neutral-900 to-neutral-950">
        <div className="max-w-2xl mx-auto">
          <Crown className="text-amber-400 mx-auto mb-4" size={32} />
          <h2 className="text-3xl font-serif font-bold mb-4 text-white">¿Listo para vivir una experiencia inolvidable?</h2>
          <p className="text-neutral-400 font-light mb-8">
            Comunícate de inmediato con el equipo organizador y reserva tus accesos preferentes con confirmación directa.
          </p>
          {isQuote ? (
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-neutral-950 font-bold px-8 py-4 rounded-full shadow-lg transition-all hover:scale-105 text-base"
            >
              <FileText size={22} />
              Solicitar Cotización Privada
            </button>
          ) : (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 text-base"
            >
              <MessageCircle size={22} />
              Hablar por WhatsApp con {data.guideName || 'el Guía'}
            </a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-neutral-600 text-xs border-t border-neutral-900">
        <p>© 2026 Cusco Creativos S.A.C. — Edición de Lujo.</p>
      </footer>

      {/* Quote Modal */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} landing={data} />
    </div>
  );
}
