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
  HelpCircle
} from 'lucide-react';
import { PlanTier } from '@/types/landing';

interface TierSpec {
  id: PlanTier;
  name: string;
  badge?: string;
  popular?: boolean;
  targetTour: string;
  scope: string;
  sectionsCount: string;
  icon: React.ReactNode;
  activeSections: string[];
  recommendedUse: string;
  ctaText: string;
}

const TIER_SPECS: TierSpec[] = [
  {
    id: 'free',
    name: 'Gratuito',
    badge: 'Express',
    targetTour: 'Free Tours y Campañas Rápidas',
    scope: '1 sección directa de captación',
    sectionsCount: '1 Sección',
    icon: <Compass className="text-stone-600" size={24} />,
    activeSections: [
      'Hero principal con foto de portada y título comercial',
      'Badge de destino y altitud referencial',
      'Botón directo de contacto / reserva a WhatsApp',
      'Precio de referencia o "A base de propinas"',
      'Pie de página minimalista institucional'
    ],
    recommendedUse: 'Ideal para promociones flash, captación rápida de leads en redes sociales o Free Walking Tours en el centro histórico.',
    ctaText: 'Crear Landing Gratuita'
  },
  {
    id: 'basic',
    name: 'Básico',
    badge: 'Estándar',
    targetTour: 'Tours Tradicionales de 1/2 Jornada',
    scope: 'Estructura web esencial para presencia formal',
    sectionsCount: '4 Secciones',
    icon: <Zap className="text-emerald-600" size={24} />,
    activeSections: [
      'Cabecera de navegación fija y Hero con CTA',
      'Ficha técnica: Duración, dificultad y guía asignado',
      'Módulo "Acerca del Tour" (descripción cultural y paisajística)',
      'Módulo "Qué Incluye el Servicio" con viñetas claras',
      'Galería básica de muestra (1 a 2 fotos del destino)',
      'Sección de contacto directo a WhatsApp'
    ],
    recommendedUse: 'Recomendado para agencias con recorridos clásicos que necesitan una página web limpia sin sobrecargar al visitante (ej. City Tour, Valle Sagrado Clásico, Maras-Moray).',
    ctaText: 'Crear Landing Básica'
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'Recomendado',
    popular: true,
    targetTour: 'Aventura, Trekking y Full Days',
    scope: 'Alta conversión con itinerario y logística clara',
    sectionsCount: '7 Secciones',
    icon: <Sparkles className="text-blue-600" size={24} />,
    activeSections: [
      'Todo lo incluido en el Nivel Básico',
      'Itinerario cronológico detallado paso a paso (día a día u hora por hora)',
      'Módulo "Qué NO Incluye" (previene malentendidos con el turista)',
      'Checklist "Qué llevar en tu mochila" (calzado, abrigo, pastillas)',
      'Distintivos oficiales de acreditación: DIRCETUR Cusco y Safe Travels',
      'Galería fotográfica interactiva (hasta 6 fotos en alta definición)',
      'Selector interactivo de idioma (Español / Inglés con IA)'
    ],
    recommendedUse: 'El estándar de oro para excursiones de 1 o 2 días donde el cliente necesita conocer el cronograma exacto y las recomendaciones de altura (ej. Vinicunca, Humantay, Salkantay 2D).',
    ctaText: 'Crear Landing Pro'
  },
  {
    id: 'advance',
    name: 'Advance',
    badge: 'Máxima Conversión',
    targetTour: 'Expediciones Multidía y Tours VIP',
    scope: 'Experiencia completa de alto rendimiento y reservas',
    sectionsCount: '9+ Secciones',
    icon: <Crown className="text-purple-600" size={24} />,
    activeSections: [
      'Todo lo incluido en el Nivel Pro',
      'Galería fotográfica HD completa e ilimitada (formato Pinterest masonry)',
      'Módulo interactivo de Preguntas Frecuentes (FAQs) del Tour para el viajero',
      'Módulo de Testimonios con reseñas reales y calificación de estrellas',
      'Flujo de Reservas por WhatsApp con mensaje pre-estructurado y fechas',
      'Integración con modalidades de cotización para grupos privados',
      'Estructura multisección completa y mapa/perfil de ruta'
    ],
    recommendedUse: 'Diseñado para paquetes premium, treks legendarios de varios días y servicios exclusivos que demandan máxima confianza y detalle (ej. Machu Picchu VIP Hiram Bingham, Salkantay Trek 5D, Ausangate).',
    ctaText: 'Crear Landing Advance'
  }
];

const COMPARISON_MATRIX = [
  { module: 'Hero de Portada con Título y Badge', free: 'Sí (Completo)', basic: 'Sí (Completo)', pro: 'Sí (Completo)', advance: 'Sí (HD Premium)' },
  { module: 'Botón Directo a WhatsApp del Guía', free: true, basic: true, pro: true, advance: true },
  { module: 'Ficha Rápida (Duración, Dificultad, Guía)', free: 'Básica', basic: true, pro: true, advance: true },
  { module: 'Módulo "Acerca del Tour" (Descripción)', free: false, basic: true, pro: true, advance: true },
  { module: 'Módulo "Qué Incluye el Servicio"', free: false, basic: true, pro: true, advance: true },
  { module: 'Galería Fotográfica del Destino', free: '1 Foto fija', basic: '2 Fotos', pro: 'Hasta 6 Fotos', advance: 'Galería HD Completa' },
  { module: 'Itinerario Cronológico Detallado', free: false, basic: false, pro: 'Paso a paso con horas', advance: 'Día a día interactivo' },
  { module: 'Logística: Qué NO Incluye el Tour', free: false, basic: false, pro: true, advance: true },
  { module: 'Logística: Mochila de Viaje & Recomendaciones', free: false, basic: false, pro: true, advance: true },
  { module: 'Sellos de Confianza (DIRCETUR, Safe Travels)', free: false, basic: false, pro: true, advance: true },
  { module: 'Selector de Idiomas (Español / Inglés)', free: false, basic: false, pro: true, advance: true },
  { module: 'Preguntas Frecuentes (FAQs del Tour)', free: false, basic: false, pro: false, advance: 'Acordeón Interactivo' },
  { module: 'Testimonios y Reseñas con Estrellas', free: false, basic: false, pro: false, advance: true },
  { module: 'Flujo de Reservas y Cotización de Grupo', free: 'Chat directo', basic: 'Chat directo', pro: 'Modal cotizador', advance: 'Reserva + Grupos VIP' }
];

export default function PlansPage() {
  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-12 selection:bg-blue-600 selection:text-white">
      
      {/* Header Banner - Guía Técnica Interna */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
          <Layers size={14} className="text-blue-600" />
          Guía Técnica de Generación de Páginas
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Manual de Niveles y Estructura de Páginas Turísticas
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Referencia oficial para el equipo de <strong>Cusco Creativos S.A.C.</strong> Consulta qué secciones, módulos y funcionalidades se activan en la página del cliente según el nivel seleccionado al crear el tour en el software.
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-600 bg-slate-100/90 py-2.5 px-4 rounded-2xl border border-slate-200 max-w-2xl mx-auto">
          <Info size={15} className="text-blue-600 shrink-0" />
          <span>
            <strong>Herramienta de uso interno:</strong> Selecciona el nivel adecuado en el generador según la complejidad del tour (promoción flash, salidas diarias o paquetes multidía).
          </span>
        </div>
      </div>

      {/* Grid de 4 Niveles de Landing (Sin precios) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {TIER_SPECS.map((spec) => {
          const isPro = spec.popular;
          return (
            <div
              key={spec.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                isPro
                  ? 'bg-white border-2 border-blue-600 shadow-xl shadow-blue-500/10 ring-4 ring-blue-500/10 -translate-y-1'
                  : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Badge */}
              {spec.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full text-white uppercase tracking-wider shadow-sm flex items-center gap-1 ${
                    isPro ? 'bg-blue-600' : spec.id === 'advance' ? 'bg-purple-600' : 'bg-slate-700'
                  }`}>
                    {isPro && <Sparkles size={12} />}
                    {spec.badge}
                  </span>
                </div>
              )}

              <div className="space-y-4">
                {/* Header de Nivel */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 shadow-2xs">
                    {spec.icon}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-lg">
                    {spec.sectionsCount}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900">Nivel {spec.name}</h3>
                  <p className="text-xs font-semibold text-blue-600 mt-0.5">
                    {spec.targetTour}
                  </p>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {spec.scope}
                  </p>
                </div>

                {/* Secciones que se activan */}
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <span className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider block">
                    Secciones que activa el software:
                  </span>
                  <ul className="space-y-2">
                    {spec.activeSections.map((sec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
                        <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{sec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recomendación de Uso */}
                <div className="pt-3 border-t border-slate-100 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Cuándo usar este nivel:
                  </span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {spec.recommendedUse}
                  </p>
                </div>
              </div>

              {/* Action Button: Enlace directo al generador con el nivel preseleccionado */}
              <div className="pt-5 mt-4 border-t border-slate-100">
                <Link
                  href={`/demo/new?tier=${spec.id}`}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isPro
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30'
                      : spec.id === 'advance'
                      ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                  }`}
                >
                  <span>{spec.ctaText}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Matriz Comparativa de Arquitectura de Secciones */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <CheckCircle2 size={15} /> Arquitectura Técnica Comparativa
            </div>
            <h2 className="text-xl font-bold text-slate-900">Módulos y Secciones Activas por Nivel</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Revisa exactamente qué elementos se muestran en la plantilla según la opción elegida por el operador.
            </p>
          </div>
          <Link
            href="/demo/new"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-xl shadow-sm transition-colors"
          >
            <span>Ir al Generador</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-extrabold uppercase tracking-wider">
                <th className="py-3 px-4 text-slate-700">Módulo / Sección de la Landing</th>
                <th className="py-3 px-4 text-center">Gratuito</th>
                <th className="py-3 px-4 text-center">Básico</th>
                <th className="py-3 px-4 text-center text-blue-600 bg-blue-50/50 rounded-t-xl">Pro (Recomendado)</th>
                <th className="py-3 px-4 text-center text-purple-700 bg-purple-50/30 rounded-t-xl">Advance (VIP)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {COMPARISON_MATRIX.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{row.module}</td>
                  
                  {/* Free */}
                  <td className="py-3.5 px-4 text-center text-slate-600">
                    {typeof row.free === 'boolean' ? (
                      row.free ? <Check size={16} className="text-emerald-500 mx-auto" /> : <X size={16} className="text-slate-300 mx-auto" />
                    ) : (
                      <span className="font-medium text-[11px]">{row.free}</span>
                    )}
                  </td>

                  {/* Basic */}
                  <td className="py-3.5 px-4 text-center text-slate-600">
                    {typeof row.basic === 'boolean' ? (
                      row.basic ? <Check size={16} className="text-emerald-500 mx-auto" /> : <X size={16} className="text-slate-300 mx-auto" />
                    ) : (
                      <span className="font-medium text-[11px]">{row.basic}</span>
                    )}
                  </td>

                  {/* Pro */}
                  <td className="py-3.5 px-4 text-center font-bold text-blue-900 bg-blue-50/30">
                    {typeof row.pro === 'boolean' ? (
                      row.pro ? <Check size={16} className="text-blue-600 mx-auto" /> : <X size={16} className="text-slate-300 mx-auto" />
                    ) : (
                      <span className="font-bold text-[11px] text-blue-800">{row.pro}</span>
                    )}
                  </td>

                  {/* Advance */}
                  <td className="py-3.5 px-4 text-center font-bold text-purple-900 bg-purple-50/20">
                    {typeof row.advance === 'boolean' ? (
                      row.advance ? <Check size={16} className="text-purple-600 mx-auto" /> : <X size={16} className="text-slate-300 mx-auto" />
                    ) : (
                      <span className="font-bold text-[11px] text-purple-800">{row.advance}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Direct Guidance Footer */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
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
          href="/demo/support"
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 px-5 py-3 rounded-xl font-bold text-xs transition-all shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <HelpCircle size={16} className="text-blue-400" />
          <span>Consultar FAQ / Soporte</span>
        </Link>
      </div>

    </div>
  );
}
