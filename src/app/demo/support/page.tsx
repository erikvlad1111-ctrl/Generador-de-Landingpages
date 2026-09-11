'use client';

import React from 'react';
import Link from 'next/link';
import { HelpCircle, ArrowLeft, ArrowRight, CheckCircle2, Globe, Sparkles } from 'lucide-react';
import { getStoredLandings } from '@/data/landingStore';

export default function DemoSupportRedirectPage() {
  const landings = getStoredLandings();
  const sampleLanding = landings[0] || { slug: 'salkantay-trek-machu-picchu', name: 'Salkantay Trek' };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
          <HelpCircle size={32} />
        </div>

        <div className="space-y-2 max-w-xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Soporte & FAQs Integrado en Cada Tour Creado
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Como este software es de <strong>uso interno exclusivo para Cusco Creativos S.A.C.</strong>, los módulos de atención al cliente y preguntas frecuentes no pertenecen al software, sino a <strong>cada página web turística generada para los viajeros</strong>.
          </p>
        </div>

        {/* Informative Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-500" />
              Dentro de Cada Landing
            </span>
            <p className="text-xs text-slate-500 leading-relaxed">
              Cada tour cuenta con su sección interactiva de FAQs y su tarjeta de Mesa de Ayuda con WhatsApp en vivo.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-blue-500" />
              Página Dedicada del Tour
            </span>
            <p className="text-xs text-slate-500 leading-relaxed">
              Cada tour dispone de una ruta pública exclusiva en <code>/p/[slug]/support</code> con acordeón y formulario de dudas.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={`/p/${sampleLanding.slug}/support`}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Globe size={15} />
            <span>Ver Soporte & FAQ de {sampleLanding.name}</span>
            <ArrowRight size={14} />
          </Link>

          <Link
            href="/demo"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={15} />
            <span>Volver al Panel Principal</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
