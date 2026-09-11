'use client';

import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageCircle, 
  PhoneCall, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  MapPin,
  HeartHandshake
} from 'lucide-react';
import { FAQItem, PlanTier, TemplateType } from '@/types/landing';

interface TourSupportAndFaqsProps {
  faqs?: FAQItem[];
  tourName: string;
  whatsapp: string;
  guideName?: string;
  destination?: string;
  tier?: PlanTier;
  theme?: TemplateType;
  isMobile?: boolean;
}

export default function TourSupportAndFaqs({
  faqs = [],
  tourName,
  whatsapp,
  guideName = 'Cusco Creativos',
  destination = 'Cusco',
  tier = 'advance',
  theme = 'adventure',
  isMobile = false
}: TourSupportAndFaqsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [senderQuestion, setSenderQuestion] = useState('');

  const isFree = tier === 'free';
  const cleanPhone = (whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(
    `Hola ${guideName}, tengo una duda antes de reservar el tour "${tourName}" en ${destination}. ¿Me podrían brindar asistencia?`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  // Default FAQs if none provided
  const displayFaqs: FAQItem[] = faqs && faqs.length > 0 ? faqs : [
    {
      q: `¿Qué incluye exactamente el servicio de ${tourName}?`,
      a: `Incluye transporte turístico autorizado, guiado oficial por profesionales certificados DIRCETUR, protocolos de seguridad y atención personalizada en toda la ruta.`
    },
    {
      q: '¿Cómo funciona la confirmación y pago de mi reserva?',
      a: 'Puedes coordinar directamente por WhatsApp. Aceptamos transferencias bancarias nacionales (BCP, Interbank), Yape, Plin y tarjetas de crédito internacionales sin cobros ocultos.'
    },
    {
      q: '¿Qué precauciones recomiendan para el mal de altura (soroche)?',
      a: 'Recomendamos descansar las primeras 24 horas tras llegar a Cusco, beber abundante mate de coca o muña y mantenerse hidratado. Nuestros guías llevan botiquín de primeros auxilios y oxígeno de emergencia.'
    },
    {
      q: '¿Cuál es la política de reprogramación o cancelación por clima?',
      a: 'Si las condiciones climáticas o huelgas impiden la salida, reprogramamos tu excursión sin costo adicional o te brindamos una alternativa de similar valor cultural y paisajístico.'
    }
  ];

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderContact.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 600);
  };

  // Theme styling dictionaries
  const themeStyles = {
    'boho-nature': {
      bg: 'bg-[#FAF7F2]',
      border: 'border-stone-200',
      badge: 'bg-[#C86D51]/10 text-[#C86D51] border-[#C86D51]/20',
      heading: 'text-stone-900 font-serif',
      cardBg: 'bg-white',
      accentText: 'text-[#C86D51]',
      accentBg: 'bg-[#C86D51] hover:bg-[#b05d43] text-white',
      activeFaq: 'border-[#C86D51]/40 bg-[#FFFDF9]',
      subtext: 'text-stone-600',
      supportCard: 'bg-stone-900 text-white'
    },
    'adventure': {
      bg: 'bg-stone-50',
      border: 'border-stone-200',
      badge: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30',
      heading: 'text-stone-900 font-sans',
      cardBg: 'bg-white',
      accentText: 'text-emerald-600',
      accentBg: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      activeFaq: 'border-emerald-500/40 bg-emerald-50/20',
      subtext: 'text-stone-600',
      supportCard: 'bg-stone-900 text-white'
    },
    'cultural': {
      bg: 'bg-stone-100',
      border: 'border-stone-200',
      badge: 'bg-amber-600/15 text-amber-800 border-amber-600/30',
      heading: 'text-stone-900 font-serif',
      cardBg: 'bg-white',
      accentText: 'text-amber-700',
      accentBg: 'bg-amber-600 hover:bg-amber-700 text-white',
      activeFaq: 'border-amber-600/40 bg-amber-50/30',
      subtext: 'text-stone-600',
      supportCard: 'bg-stone-900 text-white'
    },
    'premium': {
      bg: 'bg-neutral-950',
      border: 'border-neutral-800',
      badge: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
      heading: 'text-white font-serif',
      cardBg: 'bg-neutral-900 text-white',
      accentText: 'text-amber-400',
      accentBg: 'bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-neutral-950',
      activeFaq: 'border-amber-400/50 bg-neutral-850',
      subtext: 'text-neutral-400',
      supportCard: 'bg-neutral-900 border border-amber-500/30 text-white'
    }
  }[theme];

  return (
    <section id="soporte-faq" className={`${isMobile ? 'py-12 px-4' : 'py-20 px-8'} ${themeStyles.bg} transition-colors duration-300`}>
      <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${themeStyles.badge}`}>
            <HelpCircle size={15} />
            <span>Preguntas Frecuentes & Soporte</span>
          </div>

          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'} font-bold tracking-tight ${themeStyles.heading}`}>
            ¿Tienes dudas sobre tu viaje a {destination}?
          </h2>

          <p className={`text-xs sm:text-sm ${themeStyles.subtext} leading-relaxed`}>
            Revisa las respuestas a las consultas más habituales de nuestros viajeros o contáctate directamente con la mesa de atención de la agencia en Cusco.
          </p>
        </div>

        {/* 1. FAQs Accordion */}
        <div className="space-y-3 max-w-3xl mx-auto">
          {displayFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? themeStyles.activeFaq : `${themeStyles.cardBg} ${themeStyles.border}`
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className={`text-xs sm:text-sm font-bold ${theme === 'premium' ? 'text-neutral-100' : 'text-slate-900'} flex items-center gap-2.5`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono shrink-0 ${
                      isOpen ? `${themeStyles.accentBg} text-white` : 'bg-slate-100 text-slate-500'
                    }`}>
                      {idx + 1}
                    </span>
                    {faq.q}
                  </span>
                  <div className={`shrink-0 ${isOpen ? themeStyles.accentText : 'text-slate-400'}`}>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {isOpen && (
                  <div className={`px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm ${themeStyles.subtext} leading-relaxed pl-12`}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 2. Tourist Help Desk & Live Support Card */}
        <div className={`rounded-3xl p-6 sm:p-10 shadow-xl ${themeStyles.supportCard} relative overflow-hidden`}>
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Column: Direct Agency Attention */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Mesa de Ayuda Local Activa
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                ¿Necesitas asistencia inmediata o tienes una solicitud especial?
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Estamos en Cusco disponibles para coordinar recojo en tu hotel, dietas especiales, aclimatación a la altura y reservas de último minuto.
              </p>

              {/* Service Features Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <PhoneCall size={16} className="text-emerald-400 shrink-0" />
                  <span>Central Cusco: <strong>+51 984 123 456</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <Clock size={16} className="text-amber-400 shrink-0" />
                  <span>Atención: <strong>06:00 AM - 09:30 PM</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <ShieldCheck size={16} className="text-blue-400 shrink-0" />
                  <span>Agencia Acreditada <strong>DIRCETUR</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <HeartHandshake size={16} className="text-rose-400 shrink-0" />
                  <span>Guía Oficial: <strong>{guideName}</strong></span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-950/40 flex items-center gap-2 cursor-pointer hover:scale-102"
                >
                  <MessageCircle size={18} />
                  <span>Chatear con Soporte por WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Demo Quick Inquiry Form */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/15 text-white">
              <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                <Send size={15} className="text-blue-400" />
                Consulta Rápida al Operador
              </h4>
              <p className="text-[11px] text-slate-300 mb-4">
                Envía tu pregunta y nuestro equipo te responderá por WhatsApp a la brevedad.
              </p>

              {formSubmitted ? (
                <div className="bg-emerald-500/20 border border-emerald-400/40 p-4 rounded-xl text-center space-y-2 animate-in zoom-in-95 duration-200">
                  <CheckCircle2 size={24} className="text-emerald-400 mx-auto" />
                  <h5 className="text-xs font-bold text-white">¡Consulta Enviada con Éxito!</h5>
                  <p className="text-[11px] text-slate-200">
                    Gracias {senderName || 'viajero'}. El guía {guideName} te escribirá a {senderContact} en los próximos minutos.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setSenderQuestion('');
                    }}
                    className="text-[10px] text-emerald-300 hover:text-white underline pt-1 cursor-pointer"
                  >
                    Enviar otra duda
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickInquiry} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Tu Nombre
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Sofía Mendoza"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full bg-white/15 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      WhatsApp o Teléfono
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. +51 984 000 000"
                      value={senderContact}
                      onChange={(e) => setSenderContact(e.target.value)}
                      className="w-full bg-white/15 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      ¿Qué deseas consultar?
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Ej. ¿Tienen opción vegetariana? ¿Recogen en Ollantaytambo?"
                      value={senderQuestion}
                      onChange={(e) => setSenderQuestion(e.target.value)}
                      className="w-full bg-white/15 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Enviando consulta...</span>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Enviar Consulta Directa</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
