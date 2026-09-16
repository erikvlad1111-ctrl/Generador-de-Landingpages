"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Edit3, LayoutDashboard, Share2, Check, Download, HelpCircle } from 'lucide-react';
import TemplateRenderer from '@/templates/TemplateRenderer';
import DeploymentModal from '@/components/common/DeploymentModal';
import { getStoredLandings, LandingData } from '@/data/landingStore';

export default function PublicLandingPage() {
  const params = useParams();
  const slug = (params?.slug as string) || '';
  const [copied, setCopied] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  const [landing] = useState<LandingData | null>(() => {
    const landings = getStoredLandings();
    if (!slug) return landings[0] || null;
    return landings.find(l => l.slug.toLowerCase() === slug.toLowerCase()) || landings[0] || null;
  });

  if (!landing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-slate-100 p-6 text-center">
        <h1 className="text-3xl font-extrabold mb-3">Landing no encontrada</h1>
        <p className="text-slate-400 mb-6 text-sm">La landing page turística no existe o fue retirada del sistema.</p>
        <Link 
          href="/demo" 
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20"
        >
          <ArrowLeft size={16} /> Volver al Panel de Control
        </Link>
      </div>
    );
  }

  const cleanPhone = (landing.whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(`Hola ${landing.guideName || 'Cusco Creativos'}, vi su página web "${landing.name}" y deseo información para reservar.`);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative selection:bg-emerald-500 selection:text-white w-full max-w-full overflow-x-hidden">
      
      {/* Accessible Demo Navigation Bar */}
      {isBannerVisible && (
        <div className="sticky top-0 z-50 bg-slate-950/95 text-white px-3 sm:px-4 py-2 border-b border-slate-800 backdrop-blur-md w-full max-w-full overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
              <span className="font-bold text-slate-300 hidden sm:inline shrink-0">En Vivo:</span>
              <span className="text-emerald-400 font-semibold truncate max-w-[120px] xs:max-w-[180px] sm:max-w-xs">{landing.name}</span>
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700 px-1.5 sm:px-2 py-0.5 rounded-md shrink-0">
                {landing.tier || 'advance'}
              </span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <button
                onClick={handleCopyLink}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 sm:px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-[11px] sm:text-xs font-medium cursor-pointer"
                title="Copiar enlace directo"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Share2 size={13} />}
                <span className="hidden md:inline">{copied ? '¡Copiado!' : 'Compartir'}</span>
              </button>

              <button
                onClick={() => setIsDeployModalOpen(true)}
                className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 px-2 sm:px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 text-[11px] sm:text-xs font-bold cursor-pointer shadow-xs"
                title="Descargar código ZIP/HTML o ver opciones de despliegue"
              >
                <Download size={13} className="text-amber-400" />
                <span className="hidden sm:inline">Exportar</span>
              </button>

              <Link
                href={`/demo/preview?slug=${landing.slug}`}
                className="bg-blue-600 hover:bg-blue-500 text-white px-2 sm:px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-[11px] sm:text-xs font-bold"
                title="Abrir editor"
              >
                <Edit3 size={13} />
                <span className="hidden sm:inline">Editar</span>
              </Link>

              <Link
                href={`/p/${landing.slug}/support`}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-2 sm:px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 text-[11px] sm:text-xs font-bold shadow-xs cursor-pointer"
                title="Ver página dedicada de Soporte y Preguntas Frecuentes"
              >
                <HelpCircle size={13} />
                <span className="hidden lg:inline">Soporte & FAQ</span>
              </Link>

              <Link
                href="/demo"
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 sm:px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-[11px] sm:text-xs font-medium"
                title="Ir al panel principal"
              >
                <LayoutDashboard size={13} />
                <span className="hidden sm:inline">Panel</span>
              </Link>

              <button
                onClick={() => setIsBannerVisible(false)}
                className="text-slate-500 hover:text-slate-300 p-1 text-xs font-bold cursor-pointer ml-0.5"
                title="Ocultar barra de prueba"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Visual Public Landing Content */}
      <TemplateRenderer data={landing} isLive={true} />

      {/* Floating WhatsApp Button for templates without built-in interactive floating button */}
      {landing.template !== 'agency-portal' && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Contactar a ${landing.guideName || 'guía'} por WhatsApp`}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:scale-105 transition-all flex flex-row-reverse items-center gap-2 group border-2 border-white/20 ring-4 ring-[#25D366]/20 max-w-[calc(100vw-2.5rem)]"
        >
          <MessageCircle size={24} className="sm:w-7 sm:h-7 shrink-0 fill-white" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-xs pl-1">
            ¡Chatea con el Guía!
          </span>
        </a>
      )}

      {/* Deployment & Export Modal */}
      <DeploymentModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        landing={landing}
      />
    </div>
  );
}
