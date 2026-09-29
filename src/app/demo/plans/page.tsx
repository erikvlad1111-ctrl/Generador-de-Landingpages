'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Check, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Crown, 
  Compass, 
  Layers, 
  Zap, 
  CheckCircle2,
  Info,
  Calendar,
  Image as ImageIcon,
  Languages,
  MessageSquare,
  HelpCircle,
  Star,
  Users
} from 'lucide-react';
import { PlanTier } from '@/types/landing';

interface TierSummary {
  id: PlanTier;
  name: string;
  badge: string;
  badgeClass: string;
  targetTour: string;
  scope: string;
  sectionsCount: string;
  icon: React.ReactNode;
  iconContainerClass: string;
  cardClass: string;
  tourClass: string;
  btnClass: string;
  recommendedUse: string;
  ctaText: string;
}

const TIER_SUMMARIES: TierSummary[] = [
  {
    id: 'free',
    name: 'Gratuito',
    badge: 'Express',
    badgeClass: 'bg-slate-900 text-white shadow-2xs',
    targetTour: 'Free Walking Tours y Campañas Rápidas',
    scope: 'Captación directa con catálogo de circuitos',
    sectionsCount: 'Hero + Tours',
    icon: <Compass className="text-slate-800" size={20} />,
    iconContainerClass: 'bg-slate-100 border-slate-300/80 text-slate-800',
    cardClass: 'bg-slate-50/80 border-slate-300 ring-1 ring-slate-400/25 shadow-xs hover:shadow-md hover:border-slate-400',
    tourClass: 'text-slate-900 font-bold',
    btnClass: 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs hover:scale-101 active:scale-98',
    recommendedUse: 'Promociones flash y captación directa en 1 toque por WhatsApp con catálogo de circuitos.',
    ctaText: 'Crear Gratuito'
  },
  {
    id: 'basic',
    name: 'Básico',
    badge: 'Estándar',
    badgeClass: 'bg-emerald-600 text-white shadow-2xs',
    targetTour: 'City Tour, Museos y 1/2 Jornada',
    scope: 'Estructura web esencial para presencia formal',
    sectionsCount: '5 Secciones',
    icon: <Zap className="text-emerald-700" size={20} />,
    iconContainerClass: 'bg-emerald-100/90 border-emerald-300/80 text-emerald-800',
    cardClass: 'bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-500/25 shadow-xs hover:shadow-md hover:border-emerald-400',
    tourClass: 'text-emerald-900 font-bold',
    btnClass: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:scale-101 active:scale-98',
    recommendedUse: 'Recorridos tradicionales con descripción clara, qué incluye y catálogo de tours.',
    ctaText: 'Crear Básico'
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'Recomendado',
    badgeClass: 'bg-blue-600 text-white shadow-2xs',
    targetTour: 'Full Days, Aventura y Trekking',
    scope: 'Alta conversión con itinerario y logística clara',
    sectionsCount: '8 Secciones',
    icon: <Sparkles className="text-blue-700" size={20} />,
    iconContainerClass: 'bg-blue-100/90 border-blue-300/80 text-blue-800',
    cardClass: 'bg-blue-50/50 border-blue-300 ring-2 ring-blue-500/30 shadow-xs hover:shadow-md hover:border-blue-400',
    tourClass: 'text-blue-900 font-bold',
    btnClass: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:scale-101 active:scale-98',
    recommendedUse: 'Tours de 1 o 2 días con itinerario cronológico, checklist de mochila, sellos DIRCETUR y tours.',
    ctaText: 'Crear Pro'
  },
  {
    id: 'advance',
    name: 'Advance',
    badge: 'VIP Multidía',
    badgeClass: 'bg-purple-600 text-white shadow-2xs',
    targetTour: 'Expediciones Multidía y Tours VIP',
    scope: 'Experiencia completa de alto rendimiento y reservas',
    sectionsCount: '10+ Secciones',
    icon: <Crown className="text-purple-700" size={20} />,
    iconContainerClass: 'bg-purple-100/90 border-purple-300/80 text-purple-800',
    cardClass: 'bg-purple-50/50 border-purple-300 ring-1 ring-purple-500/25 shadow-xs hover:shadow-md hover:border-purple-400',
    tourClass: 'text-purple-900 font-bold',
    btnClass: 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs hover:scale-101 active:scale-98',
    recommendedUse: 'Paquetes de lujo con galería HD, FAQs interactivas, testimonios, cotizador VIP y catálogo.',
    ctaText: 'Crear Advance'
  }
];

interface MatrixRow {
  category?: string;
  module: string;
  desc?: string;
  free: string | boolean;
  basic: string | boolean;
  pro: string | boolean;
  advance: string | boolean;
}

const COMPARISON_MATRIX: MatrixRow[] = [
  // 1. Estructura de Portada & Conversión
  { 
    category: '1. Estructura de Portada & Conversión', 
    module: 'Hero con Portada y Título Comercial', 
    desc: 'Foto principal, badge de destino y llamada a la acción visible', 
    free: 'Sí (Básico)', 
    basic: 'Sí (Completo)', 
    pro: 'Sí (Completo)', 
    advance: 'Sí (HD Cinematográfico)' 
  },
  { 
    module: 'Botón Directo a WhatsApp del Guía', 
    desc: 'Enlace preconfigurado con el nombre del tour, fecha y origen', 
    free: true, 
    basic: true, 
    pro: true, 
    advance: true 
  },
  { 
    module: 'Sección / Catálogo de Tours y Circuitos', 
    desc: 'Exhibición de tours destacados y circuitos turísticos para reserva directa', 
    free: true, 
    basic: true, 
    pro: true, 
    advance: true 
  },
  { 
    module: 'Ficha Rápida (Duración, Dificultad, Guía)', 
    desc: 'Píldoras visuales con duración, altitud msnm y guía asignado', 
    free: 'Básica', 
    basic: true, 
    pro: true, 
    advance: true 
  },
  { 
    module: 'Módulo "Acerca del Tour"', 
    desc: 'Descripción cultural y paisajística detallada del destino', 
    free: false, 
    basic: true, 
    pro: true, 
    advance: true 
  },
  { 
    module: 'Módulo "Qué Incluye el Servicio"', 
    desc: 'Viñetas de transparencia con transporte, entradas y servicios', 
    free: false, 
    basic: true, 
    pro: true, 
    advance: true 
  },

  // 2. Logística, Itinerario & Preparación
  { 
    category: '2. Logística, Itinerario & Preparación', 
    module: 'Itinerario Cronológico Detallado', 
    desc: 'Cronograma paso a paso hora por hora o día a día', 
    free: false, 
    basic: false, 
    pro: 'Paso a paso (Horas)', 
    advance: 'Día a Día Interactivo' 
  },
  { 
    module: 'Módulo "Qué NO Incluye el Servicio"', 
    desc: 'Previene malentendidos y reclamos con el viajero', 
    free: false, 
    basic: false, 
    pro: true, 
    advance: true 
  },
  { 
    module: 'Checklist "¿Qué llevar en tu mochila?"', 
    desc: 'Lista interactiva de calzado, ropa térmica, bloqueador y pastillas', 
    free: false, 
    basic: false, 
    pro: true, 
    advance: true 
  },
  { 
    module: 'Sellos de Confianza (DIRCETUR, Safe Travels, RUC 20)', 
    desc: 'Validación de formalidad y acreditación turística oficial', 
    free: false, 
    basic: false, 
    pro: true, 
    advance: true 
  },

  // 3. Experiencia Visual, Idiomas & Reseñas
  { 
    category: '3. Experiencia Visual, Idiomas & Reseñas', 
    module: 'Galería Fotográfica del Destino', 
    desc: 'Capacidad y formato de imágenes en alta resolución', 
    free: '1 Foto fija', 
    basic: '2 Fotos', 
    pro: 'Hasta 6 Fotos', 
    advance: 'Galería HD Completa (Masonry)' 
  },
  { 
    module: 'Selector Multilingüe Nativo', 
    desc: 'Conmutador de idiomas para captar turismo receptivo internacional', 
    free: false, 
    basic: false, 
    pro: 'ES / EN', 
    advance: '5 Idiomas (ES, EN, PT, FR, IT)' 
  },
  { 
    module: 'Preguntas Frecuentes (FAQs del Tour)', 
    desc: 'Acordeón interactivo para resolver dudas y reducir consultas de soporte', 
    free: false, 
    basic: false, 
    pro: false, 
    advance: 'Acordeón Interactivo' 
  },
  { 
    module: 'Módulo de Testimonios y Reseñas', 
    desc: 'Reseñas verificadas con calificación de estrellas y origen del viajero', 
    free: false, 
    basic: false, 
    pro: false, 
    advance: true 
  },
  { 
    module: 'Flujo de Cotización y Grupos VIP', 
    desc: 'Modal para cotizar grupos privados, trenes de lujo y concierge', 
    free: 'Chat directo', 
    basic: 'Chat directo', 
    pro: 'Modal Cotizador', 
    advance: 'Reserva + Grupos VIP' 
  }
];

export default function PlansPage() {
  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-10 selection:bg-blue-600 selection:text-white">
      
      {/* Header Conciso y Directo */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
          <Layers size={14} className="text-blue-600" />
          <span>Manual de Estructura de Secciones</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Arquitectura Técnica Comparativa de Niveles
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Guía técnica interna para <strong>Cusco Creativos S.A.C.</strong> Te orienta sobre qué módulos, secciones interactivas y elementos visuales se activan en la página según el nivel elegido para el tour.
        </p>

        <div className="inline-flex items-center justify-center gap-2 text-xs text-amber-900 bg-amber-50/80 py-2 px-4 rounded-xl border border-amber-200/80 max-w-2xl mx-auto">
          <Info size={14} className="text-amber-600 shrink-0" />
          <span className="text-[11px] sm:text-xs">
            <strong>Uso interno:</strong> Te ayuda a seleccionar la estructura idónea sin sobrecargar al turista según la duración y exigencia de la ruta.
          </span>
        </div>
      </div>

      {/* Matriz Comparativa de Arquitectura de Secciones (Eje Central de la Página) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8 space-y-6">
        
        {/* Cabecera de la Sección de Arquitectura */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <CheckCircle2 size={15} /> 
              <span>Módulos y Componentes Activos por Nivel</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Desglose Técnico de Secciones y Capacidades
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Revisa con exactitud qué componentes se renderizan en la web según la opción seleccionada.
            </p>
          </div>

          <Link
            href="/demo/new"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
          >
            <Sparkles size={14} />
            <span>Crear Landing con IA</span>
          </Link>
        </div>

        {/* Resumen Ejecutivo de los 4 Niveles (Tarjetas Compactas Integradas a la Arquitectura) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-2">
          {TIER_SUMMARIES.map((tier) => {
            return (
              <div 
                key={tier.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${tier.cardClass}`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg border shadow-2xs ${tier.iconContainerClass}`}>
                        {tier.icon}
                      </div>
                      <span className="font-extrabold text-sm text-slate-900">
                        {tier.name}
                      </span>
                    </div>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${tier.badgeClass}`}>
                      {tier.badge}
                    </span>
                  </div>

                  <div>
                    <span className={`text-[11px] font-bold block line-clamp-1 ${tier.tourClass}`}>
                      {tier.targetTour}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-600 bg-white/90 px-1.5 py-0.5 rounded border border-slate-300/80 inline-block mt-1">
                      {tier.sectionsCount}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                    {tier.recommendedUse}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/80">
                  <Link
                    href={`/demo/new?tier=${tier.id}`}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${tier.btnClass}`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabla Comparativa de Módulos */}
        <div className="overflow-x-auto modern-table-container rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/90 text-slate-500 font-extrabold uppercase tracking-wider text-[11px] select-none">
                <th className="py-3.5 px-4 text-slate-800 min-w-[260px]">
                  Módulo / Componente Técnico
                </th>
                <th className="py-3.5 px-4 text-center min-w-[130px] bg-slate-100/90 text-slate-900 border-x border-slate-200/70">
                  <div className="flex items-center justify-center gap-1.5">
                    <Compass size={14} className="text-slate-800" />
                    <span>Gratuito (1 Secc.)</span>
                  </div>
                </th>
                <th className="py-3.5 px-4 text-center min-w-[130px] bg-emerald-50/80 text-emerald-950 border-r border-slate-200/70">
                  <div className="flex items-center justify-center gap-1.5">
                    <Zap size={14} className="text-emerald-700" />
                    <span>Básico (4 Secc.)</span>
                  </div>
                </th>
                <th className="py-3.5 px-4 text-center text-blue-950 bg-blue-50/80 min-w-[150px] border-r border-slate-200/70">
                  <div className="flex items-center justify-center gap-1.5">
                    <Sparkles size={14} className="text-blue-700" />
                    <span>Pro (7 Secc. • ⭐)</span>
                  </div>
                </th>
                <th className="py-3.5 px-4 text-center text-purple-950 bg-purple-50/80 min-w-[160px]">
                  <div className="flex items-center justify-center gap-1.5">
                    <Crown size={14} className="text-purple-700" />
                    <span>Advance (9+ Secc. • 👑)</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {COMPARISON_MATRIX.map((row, idx) => {
                const isCategoryHeader = Boolean(row.category);
                return (
                  <React.Fragment key={idx}>
                    {isCategoryHeader && (
                      <tr className="bg-slate-100/70 border-y border-slate-200/90">
                        <td colSpan={5} className="py-2 px-4 font-black text-slate-700 text-[11px] uppercase tracking-wider">
                          {row.category}
                        </td>
                      </tr>
                    )}
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block text-xs">
                          {row.module}
                        </span>
                        {row.desc && (
                          <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">
                            {row.desc}
                          </span>
                        )}
                      </td>
                      
                      {/* Free */}
                      <td className="py-3.5 px-4 text-center text-slate-800 bg-slate-50/40 border-x border-slate-100">
                        {typeof row.free === 'boolean' ? (
                          row.free ? (
                            <Check size={16} className="text-slate-900 font-bold mx-auto" />
                          ) : (
                            <X size={16} className="text-slate-300 mx-auto" />
                          )
                        ) : (
                          <span className="font-bold text-[11px] text-slate-900 bg-slate-200/80 px-2 py-0.5 rounded">{row.free}</span>
                        )}
                      </td>

                      {/* Basic */}
                      <td className="py-3.5 px-4 text-center text-emerald-900 bg-emerald-50/30 border-r border-slate-100">
                        {typeof row.basic === 'boolean' ? (
                          row.basic ? (
                            <Check size={16} className="text-emerald-600 font-bold mx-auto" />
                          ) : (
                            <X size={16} className="text-slate-300 mx-auto" />
                          )
                        ) : (
                          <span className="font-bold text-[11px] text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">{row.basic}</span>
                        )}
                      </td>

                      {/* Pro */}
                      <td className="py-3.5 px-4 text-center font-bold text-blue-900 bg-blue-50/30 border-r border-slate-100">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? (
                            <Check size={16} className="text-blue-600 font-bold mx-auto" />
                          ) : (
                            <X size={16} className="text-slate-300 mx-auto" />
                          )
                        ) : (
                          <span className="font-bold text-[11px] text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded">{row.pro}</span>
                        )}
                      </td>

                      {/* Advance */}
                      <td className="py-3.5 px-4 text-center font-bold text-purple-900 bg-purple-50/30">
                        {typeof row.advance === 'boolean' ? (
                          row.advance ? (
                            <Check size={16} className="text-purple-600 font-bold mx-auto" />
                          ) : (
                            <X size={16} className="text-slate-300 mx-auto" />
                          )
                        ) : (
                          <span className="font-bold text-[11px] text-purple-800 bg-purple-100/80 px-2 py-0.5 rounded">{row.advance}</span>
                        )}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Direct Guidance Footer */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-white">
              ¿Dudas sobre qué nivel aplicar para un tour específico?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Recuerda que una vez creada la landing, puedes cambiar el nivel en cualquier momento desde el botón <strong>Editar</strong> en el previsualizador en vivo para activar o desactivar secciones al instante.
            </p>
          </div>
        </div>

        <Link
          href="/demo/new"
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl font-bold text-xs transition-all shadow-md shadow-blue-600/30 flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Sparkles size={16} className="text-white" />
          <span>Ir al Generador</span>
        </Link>
      </div>

    </div>
  );
}
