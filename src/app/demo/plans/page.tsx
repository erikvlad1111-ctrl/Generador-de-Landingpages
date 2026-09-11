'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Check, 
  X, 
  HelpCircle, 
  MessageCircle, 
  ArrowRight, 
  ShieldCheck, 
  Crown, 
  Compass, 
  Layers,
  Zap,
  Globe,
  Camera,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface PlanTier {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  price: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  highlights: string[];
  ctaText: string;
  ctaType: 'whatsapp' | 'contact';
}

const PLANS: PlanTier[] = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 'S/ 0',
    period: 'Prueba sin costo',
    description: 'Página de 1 sola sección para validar presencia digital rápida.',
    icon: <Compass className="text-slate-500" size={24} />,
    highlights: [
      '1 sección esencial con información clave del tour',
      'Botón directo a WhatsApp personal',
      '1 fotografía principal de portada fija',
      '1 plantilla estándar responsiva',
      'Subdominio demo en cusco-creativos.com',
      'Soporte comunitario por correo'
    ],
    ctaText: 'Comenzar Gratis',
    ctaType: 'contact'
  },
  {
    id: 'basic',
    name: 'Básico',
    price: 'S/ 149',
    period: 'Pago único por tour',
    description: 'Lo básico de una página web profesional: información esencial, contacto y presentación.',
    icon: <Zap className="text-blue-500" size={24} />,
    highlights: [
      'Estructura clásica: Hero + Acerca del tour + Datos clave',
      'Presentación limpia con 1 a 2 fotos del destino',
      'Botón de contacto directo por WhatsApp',
      'Formulario básico de consulta simple',
      '2 plantillas: Aventura & Cultural',
      'Subdominio con el nombre de tu agencia',
      'Soporte estándar en horario de oficina'
    ],
    ctaText: 'Solicitar Plan Básico',
    ctaType: 'whatsapp'
  },
  {
    id: 'pro',
    name: 'Plan Pro',
    badge: 'Más Popular',
    popular: true,
    price: 'S/ 299',
    period: 'Pago único por tour',
    description: 'Para agencias receptivas que buscan altas conversiones con itinerario y sellos de confianza.',
    icon: <Sparkles className="text-amber-500" size={24} />,
    highlights: [
      'Todo lo del Plan Básico incluido',
      'Todas las plantillas: Lujo, Aventura, Cultural y Boho Pinterest',
      'Itinerario detallado día por día con horarios y actividades',
      'Módulo de Exclusiones y Checklist de Mochila de viaje',
      'Distintivos oficiales de confianza: DIRCETUR y Safe Travels',
      'Selector de idiomas: Español e Inglés con IA',
      'Galería interactiva tipo Pinterest (hasta 6 fotos)',
      'Soporte prioritario por WhatsApp'
    ],
    ctaText: 'Elegir Plan Pro',
    ctaType: 'whatsapp'
  },
  {
    id: 'vip',
    name: 'Avanzado / VIP',
    badge: 'Máximo Impacto',
    price: 'S/ 590',
    period: 'Pago único por tour',
    description: 'Landing page completa de alto rendimiento con reservas, FAQs, testimonios y dominio propio.',
    icon: <Crown className="text-purple-500" size={24} />,
    highlights: [
      'Todo lo del Plan Pro incluido',
      'Dominio propio personalizado (ej. tuagencia.pe o .com)',
      'Galería fotográfica HD completa e ilimitada',
      'Módulo interactivo de Consultas y Preguntas Frecuentes (FAQs)',
      'Flujo de Reservas directas y cotizaciones para grupos por WhatsApp',
      'Más secciones: Testimonios de clientes, Mapa/Rutas y Políticas de viaje',
      'Soporte técnico preferente 24/7 y asistencia prioritaria'
    ],
    ctaText: 'Cotizar Plan VIP',
    ctaType: 'whatsapp'
  }
];

const COMPARISON_ROWS = [
  { feature: 'Plantillas disponibles', free: '1 Estándar', basic: '2 Plantillas', pro: 'Todas (4 plantillas)', vip: 'Personalizada a medida' },
  { feature: 'Estilo Pinterest (Boho Journal)', free: false, basic: false, pro: true, vip: true },
  { feature: 'Copywriting persuasivo con IA', free: 'Básico', basic: 'Completo', pro: 'Multi-tono (Lujo, Aventura)', vip: 'Copywriter dedicado' },
  { feature: 'Enlace directo a WhatsApp', free: true, basic: true, pro: true, vip: true },
  { feature: 'Galería de fotos', free: '1 foto fija', basic: '1-2 fotos', pro: 'Hasta 6 fotos interactiva', vip: 'Galería HD Ilimitada' },
  { feature: 'Itinerario detallado con horarios', free: false, basic: false, pro: 'Día a día con horarios', vip: 'Interactivo con mapa' },
  { feature: 'Checklist de mochila & Exclusiones', free: false, basic: false, pro: true, vip: true },
  { feature: 'Sellos de confianza (DIRCETUR, Safe Travels)', free: false, basic: false, pro: true, vip: true },
  { feature: 'Selector de idiomas (ES / EN)', free: false, basic: false, pro: true, vip: true },
  { feature: 'Centro de Consultas & FAQs', free: false, basic: false, pro: 'Básico (3 FAQs)', vip: 'Módulo completo de FAQs' },
  { feature: 'Flujo de Reservas y Cotizaciones', free: false, basic: 'Contacto simple', pro: 'Modal de cotización', vip: 'Reservas por WhatsApp + Grupos' },
  { feature: 'Más secciones (Testimonios, Mapa, Políticas)', free: false, basic: false, pro: 'Secciones Pro', vip: 'Página completa multisección' },
  { feature: 'Alojamiento web y Dominio', free: 'Subdominio demo', basic: 'Subdominio agencia', pro: 'Subdominio optimizado', vip: 'Dominio propio .pe o .com' },
  { feature: 'Soporte y Mantenimiento', free: 'Comunitario', basic: 'Estándar', pro: 'Prioritario WhatsApp', vip: 'Dedicado 24/7' }
];

export default function PlansPage() {
  const [billingNote] = useState('Los precios corresponden al desarrollo e implementación de landing pages turísticas profesionales por Cusco Creativos S.A.C.');

  const getWhatsAppLink = (planName: string) => {
    const phone = '51984123456';
    const msg = encodeURIComponent(`Hola Cusco Creativos, estoy interesado en contratar el "${planName}" para las landing pages de mi agencia de turismo.`);
    return `https://wa.me/${phone}?text=${msg}`;
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-12 selection:bg-blue-600 selection:text-white">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
          <Layers size={14} className="text-blue-600" />
          Niveles de Servicio para Agencias & Guías
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Elige el nivel de landing page ideal para tus tours en Cusco
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Diseños de alta conversión creados por <strong>Cusco Creativos S.A.C.</strong> para impulsar tus reservas directas de WhatsApp sin intermediarios ni comisiones de terceros.
        </p>

        <p className="text-xs text-slate-500 bg-slate-100 p-2.5 rounded-xl border border-slate-200 inline-block">
          💡 {billingNote}
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {PLANS.map((plan) => {
          const isPro = plan.popular;
          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                isPro
                  ? 'bg-white border-2 border-blue-600 shadow-xl shadow-blue-500/10 ring-4 ring-blue-500/10 -translate-y-1'
                  : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Badge if Popular or VIP */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full text-white uppercase tracking-wider shadow-sm flex items-center gap-1 ${
                    isPro ? 'bg-blue-600' : 'bg-purple-600'
                  }`}>
                    {isPro && <Sparkles size={12} />}
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="space-y-4">
                {/* Plan Header */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 shadow-2xs">
                    {plan.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Nivel {plan.name}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[36px] leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{plan.price}</span>
                    <span className="text-xs font-semibold text-slate-500">PEN</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block font-medium mt-0.5">{plan.period}</span>
                </div>

                {/* Key Features List */}
                <div className="pt-3 space-y-2.5">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Incluye en este nivel:
                  </span>
                  <ul className="space-y-2">
                    {plan.highlights.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
                        <Check size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-slate-100">
                <a
                  href={getWhatsAppLink(plan.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isPro
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                  }`}
                >
                  <MessageCircle size={15} />
                  <span>{plan.ctaText}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Matrix Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Matriz Comparativa de Funcionalidades</h2>
            <p className="text-xs text-slate-500 mt-0.5">Compara a detalle las características técnicas incluidas en cada entrega.</p>
          </div>
          <Link
            href="/demo/new"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3.5 py-2 rounded-xl border border-blue-200"
          >
            <span>Probar Generador Demo</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4 text-slate-700">Módulo / Característica</th>
                <th className="py-3 px-4 text-center">Gratuito</th>
                <th className="py-3 px-4 text-center">Básico</th>
                <th className="py-3 px-4 text-center text-blue-600 bg-blue-50/50 rounded-t-xl">Pro (Recomendado)</th>
                <th className="py-3 px-4 text-center">Avanzado / VIP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{row.feature}</td>
                  
                  {/* Free */}
                  <td className="py-3.5 px-4 text-center text-slate-600">
                    {typeof row.free === 'boolean' ? (
                      row.free ? <Check size={16} className="text-emerald-500 mx-auto" /> : <X size={16} className="text-slate-300 mx-auto" />
                    ) : (
                      <span>{row.free}</span>
                    )}
                  </td>

                  {/* Basic */}
                  <td className="py-3.5 px-4 text-center text-slate-600">
                    {typeof row.basic === 'boolean' ? (
                      row.basic ? <Check size={16} className="text-emerald-500 mx-auto" /> : <X size={16} className="text-slate-300 mx-auto" />
                    ) : (
                      <span>{row.basic}</span>
                    )}
                  </td>

                  {/* Pro */}
                  <td className="py-3.5 px-4 text-center font-bold text-blue-900 bg-blue-50/30">
                    {typeof row.pro === 'boolean' ? (
                      row.pro ? <Check size={16} className="text-blue-600 mx-auto" /> : <X size={16} className="text-slate-300 mx-auto" />
                    ) : (
                      <span>{row.pro}</span>
                    )}
                  </td>

                  {/* VIP */}
                  <td className="py-3.5 px-4 text-center font-semibold text-purple-900">
                    {typeof row.vip === 'boolean' ? (
                      row.vip ? <Check size={16} className="text-purple-600 mx-auto" /> : <X size={16} className="text-slate-300 mx-auto" />
                    ) : (
                      <span>{row.vip}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trust & Guarantees Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-white">
              Garantía de Optimización Turística Cusco Creativos
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Cada landing page es revisada por nuestro equipo técnico para certificar velocidad de carga menor a 1.8 segundos, enlaces funcionales de WhatsApp y compatibilidad móvil total.
            </p>
          </div>
        </div>

        <a
          href={getWhatsAppLink('Asesoría Especializada')}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold text-xs transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <MessageCircle size={16} />
          <span>Hablar con un Asesor</span>
        </a>
      </div>

    </div>
  );
}
