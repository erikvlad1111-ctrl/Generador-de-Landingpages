'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  MessageCircle, 
  HelpCircle, 
  PhoneCall, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  MapPin,
  Calendar,
  HeartHandshake,
  Compass,
  FileText
} from 'lucide-react';
import { getStoredLandings, LandingData } from '@/data/landingStore';

export default function TourPublicSupportPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || '';

  const [landing] = useState<LandingData | null>(() => {
    const landings = getStoredLandings();
    if (!slug) return landings[0] || null;
    return landings.find(l => l.slug.toLowerCase() === slug.toLowerCase()) || landings[0] || null;
  });

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [senderQuestion, setSenderQuestion] = useState('');

  if (!landing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-slate-100 p-6 text-center">
        <h1 className="text-3xl font-extrabold mb-3">Página no encontrada</h1>
        <p className="text-slate-400 mb-6 text-sm">El tour solicitado no se encuentra disponible.</p>
        <Link 
          href="/demo" 
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg"
        >
          <ArrowLeft size={16} /> Volver al Panel
        </Link>
      </div>
    );
  }

  const cleanPhone = (landing.whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(
    `Hola ${landing.guideName || 'Cusco Creativos'}, tengo una duda sobre el tour "${landing.name}" en ${landing.destination || 'Cusco'}. ¿Me podrían brindar asistencia?`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  const faqs = landing.faqs && landing.faqs.length > 0 ? landing.faqs : [
    {
      q: `¿Qué incluye exactamente el servicio de ${landing.name}?`,
      a: `Incluye transporte turístico autorizado, guiado oficial por profesionales certificados DIRCETUR, protocolos de seguridad y atención personalizada en toda la ruta.`
    },
    {
      q: '¿Cómo funciona la confirmación y pago de mi reserva?',
      a: 'Puedes coordinar directamente por WhatsApp. Aceptamos transferencias bancarias nacionales (BCP, Interbank), Yape, Plin y tarjetas de crédito internacionales sin cobros ocultos.'
    },
    {
      q: '¿Qué precauciones recomiendan para el mal de altura (soroche)?',
      a: `Recomendamos descansar las primeras 24 horas tras llegar a Cusco, beber mate de coca o muña y mantenerse hidratado. Nuestro guía cuenta con botiquín y balón de oxígeno para altitudes de ${landing.altitude || '3,400 msnm'}.`
    },
    {
      q: '¿Cuál es la política de reprogramación o cancelación por clima?',
      a: 'Si las condiciones climáticas o huelgas impiden la salida, reprogramamos tu excursión sin costo adicional o te brindamos una alternativa de similar valor cultural y paisajístico.'
    },
    {
      q: '¿Dónde es el punto de encuentro y a qué hora inicia?',
      a: 'Para la mayoría de recorridos ofrecemos recojo directo en la puerta de tu hotel o alojamiento en el centro histórico de Cusco previa coordinación con el guía.'
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* Top Breadcrumb Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <Link
            href={`/p/${landing.slug}`}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5 text-xs font-bold shrink-0"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Volver a la Página del Tour</span>
          </Link>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="text-xs font-semibold text-slate-500 truncate max-w-xs">
            {landing.name}
          </span>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2 rounded-xl text-xs font-extrabold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <MessageCircle size={14} />
          <span>WhatsApp del Guía</span>
        </a>
      </header>

      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-12 sm:py-16 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-4 relative z-10 text-center sm:text-left">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <HelpCircle size={14} />
            <span>Centro de Atención & Preguntas Frecuentes del Tour</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Soporte & Preguntas Frecuentes para {landing.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Resolvemos todas tus dudas sobre logística, qué llevar, políticas de pago y aclimatación para que disfrutes al máximo tu visita a {landing.destination || 'Cusco'}.
          </p>

          {/* Quick Tour Specs Badges */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-2 text-xs text-slate-300">
            <span className="bg-white/10 px-3 py-1 rounded-xl flex items-center gap-1.5">
              <MapPin size={13} className="text-emerald-400" />
              <span>{landing.destination || 'Cusco'}</span>
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-xl flex items-center gap-1.5">
              <Clock size={13} className="text-amber-400" />
              <span>Duración: {landing.duration || 'Full Day'}</span>
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-xl flex items-center gap-1.5">
              <Compass size={13} className="text-blue-400" />
              <span>Dificultad: {landing.difficulty || 'Moderada'}</span>
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-xl flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-purple-400" />
              <span>Guía: <strong>{landing.guideName}</strong></span>
            </span>
          </div>

        </div>
      </section>

      {/* Main Content: FAQs Accordion + Support Desk */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-12 space-y-12">
        
        {/* FAQs Accordion */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Preguntas Frecuentes sobre el Tour
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Consulta los detalles esenciales antes de realizar tu reserva.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen ? 'border-blue-500/40 bg-blue-50/20 shadow-xs' : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                        isOpen ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {idx + 1}
                      </span>
                      {faq.q}
                    </span>
                    <div className="shrink-0 text-slate-400">
                      {isOpen ? <ChevronUp size={18} className="text-blue-600" /> : <ChevronDown size={18} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed pl-13">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tourist Help Desk & Live Contact */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Direct Attention */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold uppercase tracking-wider border border-emerald-400/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Mesa de Ayuda de la Agencia en Cusco
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white">
                ¿No encontraste respuesta a tu consulta?
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                El guía oficial <strong>{landing.guideName}</strong> y nuestro equipo de operaciones en Cusco están en línea para ayudarte a planificar tu itinerario o resolver cualquier requerimiento especial.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <PhoneCall size={16} className="text-emerald-400 shrink-0" />
                  <span>Central Cusco: <strong>{landing.whatsapp || '+51 984 123 456'}</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <Clock size={16} className="text-amber-400 shrink-0" />
                  <span>Horario: <strong>06:00 AM - 09:30 PM</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <ShieldCheck size={16} className="text-blue-400 shrink-0" />
                  <span>Acreditación <strong>DIRCETUR Cusco</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <HeartHandshake size={16} className="text-rose-400 shrink-0" />
                  <span>Atención en <strong>Español e Inglés</strong></span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer hover:scale-102"
                >
                  <MessageCircle size={18} />
                  <span>Preguntar por WhatsApp a {landing.guideName}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Quick Consultation Form */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/15 text-white">
              <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                <Send size={15} className="text-blue-400" />
                Envíanos tu Consulta
              </h4>
              <p className="text-[11px] text-slate-300 mb-4">
                Te responderemos directamente por WhatsApp a la brevedad.
              </p>

              {formSubmitted ? (
                <div className="bg-emerald-500/20 border border-emerald-400/40 p-4 rounded-xl text-center space-y-2 animate-in zoom-in-95 duration-200">
                  <CheckCircle2 size={24} className="text-emerald-400 mx-auto" />
                  <h5 className="text-xs font-bold text-white">¡Consulta Enviada!</h5>
                  <p className="text-[11px] text-slate-200">
                    Gracias {senderName || 'viajero'}. Te escribiremos al número {senderContact} en los próximos minutos.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setSenderQuestion('');
                    }}
                    className="text-[10px] text-emerald-300 hover:text-white underline pt-1 cursor-pointer"
                  >
                    Enviar otra consulta
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
                      placeholder="Ej. Mateo Rojas"
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
                      ¿Qué deseas consultar sobre este tour?
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Ej. ¿Qué calzado recomiendan para esta ruta?"
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

        {/* Return Button */}
        <div className="text-center pt-4">
          <Link
            href={`/p/${landing.slug}`}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl text-xs font-bold transition-all shadow-md"
          >
            <ArrowLeft size={16} />
            <span>Volver a la Página Principal de {landing.name}</span>
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 py-8 text-center text-slate-500 text-xs border-t border-slate-800 mt-12">
        <p>© 2026 Cusco Creativos S.A.C. — Servicio de Atención y Soporte al Viajero.</p>
      </footer>

    </div>
  );
}
