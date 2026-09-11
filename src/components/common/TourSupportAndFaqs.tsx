'use client';

import React, { useState, useRef } from 'react';
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
  HeartHandshake,
  Bot,
  AlertTriangle,
  Lock
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
  const [category, setCategory] = useState('Logística y Horarios de Recojo');
  const [ticketId, setTicketId] = useState('');

  // Anti-Spam Multilayer States
  const formLoadTime = useRef<number>(Date.now());
  const [honeypot, setHoneypot] = useState(''); // Campo trampa invisible
  const [mathNum1] = useState(() => Math.floor(Math.random() * 5) + 3);
  const [mathNum2] = useState(() => Math.floor(Math.random() * 4) + 2);
  const [mathAnswer, setMathAnswer] = useState('');
  const [spamError, setSpamError] = useState<string | null>(null);

  const cleanPhone = (whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(
    `Hola ${guideName}, tengo una consulta sobre el tour "${tourName}" en ${destination}. ¿Me podrían brindar asistencia?`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  // Complete, rich tour FAQs
  const displayFaqs: FAQItem[] = faqs && faqs.length > 0 ? faqs : [
    {
      q: `¿Qué incluye exactamente el servicio del tour "${tourName}"?`,
      a: `Incluye transporte turístico autorizado ida y vuelta, guiado oficial profesional bilingüe acreditado por DIRCETUR Cusco, balón de oxígeno para la altitud, botiquín de primeros auxilios y atención personalizada.`
    },
    {
      q: '¿Cómo funciona la confirmación de reserva y qué métodos de pago aceptan?',
      a: 'La confirmación es inmediata vía WhatsApp. Puedes asegurar tu cupo mediante transferencia bancaria (BCP, Interbank, BBVA), Yape, Plin o tarjetas de crédito/débito internacionales sin cargos ocultos.'
    },
    {
      q: '¿Por qué es seguro reservar con nosotros? (Sellos y Licencias)',
      a: 'Somos agencia formal con RUC 20 activo, acreditación oficial DIRCETUR Cusco y sello internacional Safe Travels. Tus reservas están 100% garantizadas y emitimos comprobantes oficiales.'
    },
    {
      q: '¿Qué precauciones y protocolos aplican para el mal de altura (soroche)?',
      a: `Recomendamos aclimatarse al menos 24 a 48 horas en Cusco antes del tour. Nuestro guía monitorea el ritmo cardíaco y oxigenación, disponiendo de botiquín andino y balón de oxígeno medicinal para altitudes de ${destination}.`
    },
    {
      q: '¿Cuál es la política de reprogramación o cancelación por clima o imprevistos?',
      a: 'Ofrecemos reprogramación sin penalidad avisando con 24 horas de anticipación ante inclemencias climáticas, huelgas o motivos médicos justificados.'
    },
    {
      q: '¿Dónde es el punto de encuentro y a qué hora inicia el recorrido?',
      a: 'Brindamos servicio de recojo directo en la puerta de tu hotel o alojamiento ubicado dentro del centro histórico de Cusco, coordinando la hora exacta por WhatsApp la noche anterior.'
    }
  ];

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setSpamError(null);

    // 1. Capa 1 Anti-Spam: Honeypot invisible
    if (honeypot.trim().length > 0) {
      setSpamError('Detección Anti-Spam: Envío bloqueado por actividad automatizada.');
      return;
    }

    // 2. Capa 2 Anti-Spam: Time-Gate (Validar si se envió en menos de 2.5 segundos)
    const elapsed = Date.now() - formLoadTime.current;
    if (elapsed < 2500) {
      setSpamError('Envío demasiado rápido (menos de 2.5 segundos). Por favor tómate un momento para revisar tu consulta.');
      return;
    }

    // 3. Capa 3 Anti-Spam: Desafío matemático simple
    const expected = mathNum1 + mathNum2;
    if (parseInt(mathAnswer.trim(), 10) !== expected) {
      setSpamError(`Desafío de seguridad incorrecto: ¿Cuánto es ${mathNum1} + ${mathNum2}? Por favor introduce el resultado correcto.`);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const genId = `CONS-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketId(genId);
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
            <span>Preguntas Frecuentes & Soporte del Tour</span>
          </div>

          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'} font-bold tracking-tight ${themeStyles.heading}`}>
            ¿Tienes dudas sobre tu viaje a {destination}?
          </h2>

          <p className={`text-xs sm:text-sm ${themeStyles.subtext} leading-relaxed`}>
            Revisa las respuestas a las consultas más habituales de nuestros viajeros o contáctate directamente con la mesa de atención de la agencia en Cusco con protección anti-spam.
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

        {/* 2. Tourist Help Desk & Live Support Card with Anti-Spam Form */}
        <div className={`rounded-3xl p-6 sm:p-10 shadow-xl ${themeStyles.supportCard} relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Left Column: Direct Agency Attention */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Mesa de Ayuda Local en Cusco
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                ¿Necesitas asistencia o tienes una solicitud especial?
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Estamos disponibles para coordinar recojo en tu hotel, dietas especiales, aclimatación a la altura y reservas de último minuto.
              </p>

              {/* Service Features Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <PhoneCall size={16} className="text-emerald-400 shrink-0" />
                  <span>Central Cusco: <strong>{whatsapp || '+51 984 123 456'}</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <Clock size={16} className="text-amber-400 shrink-0" />
                  <span>Atención: <strong>06:00 AM - 09:30 PM</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <ShieldCheck size={16} className="text-blue-400 shrink-0" />
                  <span>Acreditación <strong>DIRCETUR Cusco</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <HeartHandshake size={16} className="text-rose-400 shrink-0" />
                  <span>Guía Oficial: <strong>{guideName}</strong></span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-950/40 inline-flex items-center gap-2 cursor-pointer hover:scale-102"
                >
                  <MessageCircle size={18} />
                  <span>Chatear por WhatsApp con {guideName}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Form with Anti-Spam Multicapa */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/15 text-white space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Send size={15} className="text-blue-400" />
                  Mesa de Ayuda del Tour
                </h4>
                <span className="text-[10px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                  <ShieldCheck size={11} /> Anti-Spam Activo
                </span>
              </div>

              {formSubmitted ? (
                <div className="bg-emerald-500/20 border border-emerald-400/40 p-4 rounded-xl text-center space-y-2 animate-in zoom-in-95 duration-200">
                  <CheckCircle2 size={24} className="text-emerald-400 mx-auto" />
                  <h5 className="text-xs font-bold text-white">¡Consulta Registrada con Éxito!</h5>
                  <span className="inline-block bg-white/20 text-white font-mono text-[11px] px-2.5 py-0.5 rounded-md">
                    Ticket #{ticketId}
                  </span>
                  <p className="text-[11px] text-slate-200">
                    Gracias {senderName || 'viajero'}. El guía {guideName} responderá a tu número {senderContact} en los próximos minutos.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setSenderQuestion('');
                      setMathAnswer('');
                    }}
                    className="text-[10px] text-emerald-300 hover:text-white underline pt-1 cursor-pointer"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickInquiry} className="space-y-3">
                  
                  {/* Honeypot invisible trap */}
                  <input
                    type="text"
                    name="website_url_trap"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden absolute -left-[9999px]"
                  />

                  {/* Category selector */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Categoría de Consulta
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-slate-900 border border-white/20 rounded-xl px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="Logística y Horarios de Recojo">Logística y Horarios de Recojo</option>
                      <option value="Aclimatación y Altitud (Soroche)">Aclimatación y Altitud (Soroche)</option>
                      <option value="Reserva Directa y Métodos de Pago">Reserva Directa y Métodos de Pago</option>
                      <option value="Requerimiento Especial / Grupo Privado">Requerimiento Especial / Grupo Privado</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                        Tu Nombre
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Mateo Rojas"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full bg-white/15 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                        WhatsApp
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+51 984..."
                        value={senderContact}
                        onChange={(e) => setSenderContact(e.target.value)}
                        className="w-full bg-white/15 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
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

                  {/* Anti-Spam Math Security Challenge */}
                  <div className="bg-white/10 p-2.5 rounded-xl border border-white/15 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Bot size={15} className="text-blue-300 shrink-0" />
                      <span className="text-[11px] text-slate-200 font-semibold">
                        Verificación: ¿Cuánto es <strong>{mathNum1} + {mathNum2}</strong>?
                      </span>
                    </div>
                    <input
                      type="number"
                      required
                      placeholder="?"
                      value={mathAnswer}
                      onChange={(e) => setMathAnswer(e.target.value)}
                      className="w-14 bg-white/20 border border-white/30 rounded-lg px-2 py-1 text-xs text-center font-bold text-white outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Spam Error Alert */}
                  {spamError && (
                    <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs flex items-center gap-2">
                      <AlertTriangle size={15} className="shrink-0 text-rose-300" />
                      <span>{spamError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Validando y enviando...</span>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Enviar Consulta Protegida</span>
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
