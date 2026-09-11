'use client';

import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  LifeBuoy, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  FileQuestion,
  Headphones,
  Bot
} from 'lucide-react';

interface Ticket {
  id: string;
  category: string;
  agency: string;
  subject: string;
  date: string;
  status: 'pending' | 'in_progress' | 'resolved';
}

const FAQS = [
  {
    q: '¿Cómo conecto mi propio dominio a la landing page?',
    a: 'En el Plan Avanzado / VIP, nuestro equipo técnico configura los registros DNS tipo A y CNAME de tu proveedor (GoDaddy, Namecheap, etc.) apuntando hacia los servidores de Cusco Creativos con certificado SSL de seguridad automático.'
  },
  {
    q: '¿Qué necesito para que mi número de WhatsApp reciba los mensajes automáticos?',
    a: 'Solo debes ingresar tu número con el código de país (ej. +51 984 123 456). El sistema codifica automáticamente el nombre del tour para que cuando el turista haga clic, te llegue un mensaje listo para responder.'
  },
  {
    q: '¿Cómo cambio las fotos o el precio de mi tour una vez publicado?',
    a: 'Puedes ingresar a la sección "Editor Activo / Previsualizador", modificar cualquier texto o enlace fotográfico y pulsar "Guardar Cambios". La landing pública se actualizará inmediatamente sin necesidad de reimprimir nada.'
  },
  {
    q: '¿Por qué es importante incluir los sellos de DIRCETUR y Safe Travels?',
    a: 'El turista extranjero es muy cauto con las estafas en internet. Exhibir los sellos oficiales de turismo de Cusco y el sello internacional Safe Travels eleva la confianza y multiplica la tasa de reservas hasta un 45%.'
  },
  {
    q: '¿Cuánto tiempo toma tener mi landing page online?',
    a: 'Con nuestro sistema semiautomatizado con IA, la redacción y maquetación se genera en menos de 2 minutos. Si solicitas dominio propio o personalización avanzada, el despliegue final toma entre 24 y 48 horas.'
  }
];

const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'TK-1082',
    category: 'Duda de configuración',
    agency: 'Andes Expedition Travel',
    subject: 'Configuración de número de WhatsApp secundario para reservas nocturnas',
    date: 'Hace 2 horas',
    status: 'in_progress'
  },
  {
    id: 'TK-1079',
    category: 'Sugerencia de plantilla',
    agency: 'Inca Trail Explorers',
    subject: 'Solicitud de nueva plantilla para recorridos gastronómicos y pisco sour',
    date: 'Ayer',
    status: 'resolved'
  }
];

export default function SupportPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);

  // Form State
  const [name, setName] = useState('');
  const [agency, setAgency] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Duda de configuración');
  const [message, setMessage] = useState('');

  // Multi-layer Anti-Spam State
  const [honeypotValue, setHoneypotValue] = useState(''); // Layer 1: Invisible honeypot trap
  const [formMountedAt, setFormMountedAt] = useState<number>(0); // Layer 2: Time-gate
  const [mathNum1, setMathNum1] = useState(4); // Layer 3: Interactive challenge
  const [mathNum2, setMathNum2] = useState(3);
  const [mathAnswer, setMathAnswer] = useState('');

  // Status message
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'spam_detected' | 'error'>('idle');
  const [statusText, setStatusText] = useState('');

  useEffect(() => {
    // Record when the user arrived at the form
    setFormMountedAt(Date.now());
    // Generate simple random numbers for anti-spam challenge
    const n1 = Math.floor(Math.random() * 5) + 2;
    const n2 = Math.floor(Math.random() * 5) + 2;
    setMathNum1(n1);
    setMathNum2(n2);
  }, []);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. HONEYPOT CHECK: If invisible field is populated, a bot filled it
    if (honeypotValue.trim().length > 0) {
      console.warn('Anti-Spam: Honeypot field was filled by a bot.');
      setSubmitStatus('spam_detected');
      setStatusText('Solicitud rechazada por filtros de seguridad anti-bot (Honeypot activado).');
      return;
    }

    // 2. TIME-GATE CHECK: Human cannot fill a form in under 2.5 seconds
    const timeElapsed = Date.now() - formMountedAt;
    if (timeElapsed < 2500) {
      console.warn(`Anti-Spam: Time-gate triggered (${timeElapsed}ms).`);
      setSubmitStatus('spam_detected');
      setStatusText('El formulario fue enviado con velocidad inhumana (< 2.5 segundos). Por favor verifica tus datos.');
      return;
    }

    // 3. MATH CHALLENGE CHECK
    const expected = mathNum1 + mathNum2;
    if (parseInt(mathAnswer.trim(), 10) !== expected) {
      setSubmitStatus('error');
      setStatusText(`Verificación de seguridad incorrecta. ¿Cuánto es ${mathNum1} + ${mathNum2}?`);
      return;
    }

    // ALL SECURITY CHECKS PASSED: Register support ticket
    const newTicket: Ticket = {
      id: `TK-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      agency: agency || name,
      subject: message.length > 50 ? `${message.slice(0, 50)}...` : message,
      date: 'Recién creado',
      status: 'pending'
    };

    setTickets([newTicket, ...tickets]);
    setSubmitStatus('success');
    setStatusText('¡Consulta recibida con éxito! Nuestro equipo de Cusco Creativos te responderá a la brevedad.');

    // Clear form
    setMessage('');
    setMathAnswer('');
    setFormMountedAt(Date.now());
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-12 selection:bg-blue-600 selection:text-white">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
          <LifeBuoy size={14} className="text-blue-600" />
          Mesa de Ayuda & Centro de Soporte
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Soporte Técnico, FAQ & Foro de Consultas
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Canal directo de atención para agencias aliadas y guías oficiales de Cusco Creativos S.A.C. Protegido con tecnología anti-spam multicapa.
        </p>
      </div>

      {/* Main Grid: Form (Left) & FAQ Accordion (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Support Form with Anti-Spam (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Headphones size={20} className="text-blue-600" />
                Crear Ticket de Asistencia
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Envía tu consulta o solicitud de mejora para tu landing page.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
              <ShieldCheck size={14} />
              <span>Anti-Spam Activo</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Honeypot Invisible Input (Layer 1) */}
            <div className="opacity-0 absolute -left-[9999px] pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="user_website_url_honey">No rellenar este campo de trampa</label>
              <input
                id="user_website_url_honey"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypotValue}
                onChange={(e) => setHoneypotValue(e.target.value)}
              />
            </div>

            {/* Name & Agency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Carlos Mendoza"
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Agencia o Guía Turístico *
                </label>
                <input
                  type="text"
                  required
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  placeholder="Ej. Machu Picchu Expeditions"
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@agencia.com"
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+51 984 000 000"
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tipo de Consulta o Solicitud *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 bg-white outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Duda de configuración">Duda de configuración</option>
                <option value="Sugerencia de plantilla">Sugerencia de plantilla</option>
                <option value="Cambio de plan">Cambio de plan</option>
                <option value="Soporte WhatsApp">Soporte WhatsApp</option>
                <option value="Consulta sobre dominios y sellos">Consulta sobre dominios y sellos oficiales</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Mensaje Detallado *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe tu duda o problema con el mayor detalle posible para darte una solución rápida..."
                className="w-full border border-slate-300 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 resize-none leading-relaxed"
              />
            </div>

            {/* Anti-Spam Challenge: Math verification (Layer 3) */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                  <Bot size={18} />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Verificación de Seguridad Anti-Bot</span>
                  <span className="text-[11px] text-slate-500">¿Cuánto es {mathNum1} + {mathNum2}?</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  required
                  value={mathAnswer}
                  onChange={(e) => setMathAnswer(e.target.value)}
                  placeholder="Respuesta"
                  className="w-28 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-center outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Status Feedback Message */}
            {submitStatus === 'success' && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                <span>{statusText}</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertTriangle size={18} className="text-rose-600 shrink-0" />
                <span>{statusText}</span>
              </div>
            )}

            {submitStatus === 'spam_detected' && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                <AlertTriangle size={18} className="text-amber-600 shrink-0" />
                <span>{statusText}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl text-xs transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send size={15} />
              <span>Enviar Consulta a Soporte</span>
            </button>
          </form>

          {/* Tickets History List */}
          <div className="pt-6 border-t border-slate-100 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Clock size={14} /> Tus Consultas Recientes:
            </h3>

            <div className="space-y-2.5">
              {tickets.map((tk) => (
                <div key={tk.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{tk.id}</span>
                      <span className="text-[10px] text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-md font-medium">{tk.category}</span>
                    </div>
                    <p className="text-slate-600 text-xs truncate mt-0.5">{tk.subject}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                      tk.status === 'resolved' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : tk.status === 'in_progress' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-amber-100 text-amber-800'
                    }`}>
                      {tk.status === 'resolved' ? 'Resuelto' : tk.status === 'in_progress' ? 'En Atención' : 'Pendiente'}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{tk.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: FAQ Accordion (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <HelpCircle size={18} />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Preguntas Frecuentes</h3>
                <p className="text-xs text-slate-500">Respuestas inmediatas a dudas habituales</p>
              </div>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={idx}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-3.5 text-left text-xs font-bold text-slate-800 flex items-center justify-between gap-3 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={16} className="shrink-0 text-blue-600" /> : <ChevronDown size={16} className="shrink-0 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="p-3.5 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick WhatsApp Support Box */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-7 space-y-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
                <MessageCircle size={22} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">¿Urgencia con un Tour en Vivo?</h4>
                <p className="text-xs text-emerald-100">Atención directa por WhatsApp de guardia</p>
              </div>
            </div>
            <p className="text-xs text-emerald-50 leading-relaxed">
              Si tu landing page tiene un error con un turista que está intentando reservar ahora mismo, comunícate al canal de emergencia.
            </p>
            <a
              href="https://wa.me/51984123456?text=Hola%20Cusco%20Creativos,%20tengo%20una%20urgencia%20con%20mi%20landing%20page%20tur%C3%ADstica."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white hover:bg-emerald-50 text-emerald-800 font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <MessageCircle size={16} />
              <span>Contactar WhatsApp de Emergencia</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
