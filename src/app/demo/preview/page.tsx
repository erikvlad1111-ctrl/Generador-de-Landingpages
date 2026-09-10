"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Smartphone, 
  Monitor, 
  Tablet,
  Edit3, 
  ExternalLink, 
  Copy, 
  Check, 
  X, 
  Layers,
  Globe,
  Share2,
  QrCode,
  CheckCircle,
  Download
} from 'lucide-react';
import TemplateRenderer from '@/templates/TemplateRenderer';
import DeploymentModal from '@/components/common/DeploymentModal';
import { getStoredLandings, saveLandingToStorage, LandingData } from '@/data/landingStore';

function DemoPreviewContent() {
  const searchParams = useSearchParams();
  const slugQuery = searchParams.get('slug');

  const [landing, setLanding] = useState<LandingData | null>(() => {
    const list = getStoredLandings();
    if (slugQuery) {
      return list.find(item => item.slug === slugQuery) || list[0] || null;
    }
    return list[0] || null;
  });

  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [publishToast, setPublishToast] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form state for live editor
  const [editHeroTitle, setEditHeroTitle] = useState(() => landing?.hero?.title || '');
  const [editHeroSubtitle, setEditHeroSubtitle] = useState(() => landing?.hero?.subtitle || '');
  const [editHeroCta, setEditHeroCta] = useState(() => landing?.hero?.cta || '');
  const [editAboutTitle, setEditAboutTitle] = useState(() => landing?.about?.title || '');
  const [editAboutContent, setEditAboutContent] = useState(() => landing?.about?.content || '');
  const [editPrice, setEditPrice] = useState(() => landing?.price || '');
  const [editWhatsapp, setEditWhatsapp] = useState(() => landing?.whatsapp || '');
  const [editTemplate, setEditTemplate] = useState<'adventure' | 'premium' | 'cultural'>(() => landing?.template || 'adventure');

  if (!landing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-slate-400 text-sm">Cargando previsualizador...</p>
        </div>
      </div>
    );
  }

  const publicUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/p/${landing.slug}`
    : `/p/${landing.slug}`;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(publicUrl)}`;

  const openEditorWithCurrentData = () => {
    setEditHeroTitle(landing.hero?.title || '');
    setEditHeroSubtitle(landing.hero?.subtitle || '');
    setEditHeroCta(landing.hero?.cta || '');
    setEditAboutTitle(landing.about?.title || '');
    setEditAboutContent(landing.about?.content || '');
    setEditPrice(landing.price || '');
    setEditWhatsapp(landing.whatsapp || '');
    setEditTemplate(landing.template || 'adventure');
    setIsEditorOpen(true);
  };

  const handleSaveEdits = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: LandingData = {
      ...landing,
      template: editTemplate,
      price: editPrice,
      whatsapp: editWhatsapp,
      hero: {
        ...landing.hero,
        title: editHeroTitle,
        subtitle: editHeroSubtitle,
        cta: editHeroCta,
      },
      about: {
        ...landing.about,
        title: editAboutTitle,
        content: editAboutContent,
      }
    };
    setLanding(updated);
    saveLandingToStorage(updated);
    setIsEditorOpen(false);
  };

  const handlePublishInstant = () => {
    const published: LandingData = {
      ...landing,
      status: 'published'
    };
    setLanding(published);
    saveLandingToStorage(published);
    setPublishToast(true);
    setTimeout(() => setPublishToast(false), 4000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="w-full bg-slate-950 min-h-screen flex flex-col relative text-slate-100 selection:bg-blue-600 selection:text-white">
      
      {/* Top Professional Control Bar (Spacious, High-End Studio Toolbar) */}
      <header className="bg-slate-900/95 backdrop-blur-xl h-20 px-4 sm:px-8 border-b border-slate-800/90 flex items-center justify-between gap-4 shrink-0 sticky top-0 z-40 shadow-2xl shadow-slate-950/70 select-none">
        
        {/* Left: Back Navigation & Rich Tour Identity */}
        <div className="flex items-center gap-3.5 min-w-0 shrink-0">
          <Link 
            href="/demo" 
            className="group text-slate-300 hover:text-white transition-all px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 flex items-center gap-2 text-xs font-bold border border-slate-700/70 hover:border-slate-600 shadow-xs shrink-0"
            title="Volver al panel principal"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Panel</span>
          </Link>

          <div className="h-7 w-px bg-slate-800/90 shrink-0"></div>

          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <h2 className="font-black text-white text-sm sm:text-base tracking-tight truncate max-w-[150px] sm:max-w-[240px] md:max-w-xs drop-shadow-xs">
                {landing.name}
              </h2>
              {landing.status === 'published' ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-xs shadow-emerald-500/20 shrink-0">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Publicado
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-xs shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                  Borrador
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400 truncate hidden sm:flex">
              <span className="text-[11px] text-slate-400 font-medium">Plantilla:</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800/90 text-blue-400 font-semibold text-[10px] uppercase tracking-wide border border-slate-700/60">
                {landing.template}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-[11px] text-slate-400 truncate font-medium">
                {landing.guideName || 'Cusco Creativos'}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Device Viewport Switcher (Tactile Studio Segmented Control - Responsive on all devices) */}
        <div className="flex items-center bg-slate-950/90 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-slate-800/90 shadow-inner shadow-black/60 shrink-0">
          <button
            onClick={() => setViewMode('desktop')}
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs flex items-center gap-1.5 sm:gap-2 font-extrabold transition-all cursor-pointer ${
              viewMode === 'desktop' 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02] border border-blue-400/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
            }`}
            title="Vista Computadora / Pantalla Completa"
          >
            <Monitor size={15} /> 
            <span className="hidden md:inline">Desktop</span>
          </button>
          <button
            onClick={() => setViewMode('tablet')}
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs flex items-center gap-1.5 sm:gap-2 font-extrabold transition-all cursor-pointer ${
              viewMode === 'tablet' 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02] border border-blue-400/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
            }`}
            title="Vista Tablet / iPad"
          >
            <Tablet size={15} /> 
            <span className="hidden md:inline">Tablet</span>
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs flex items-center gap-1.5 sm:gap-2 font-extrabold transition-all cursor-pointer ${
              viewMode === 'mobile' 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02] border border-blue-400/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
            }`}
            title="Vista Móvil / Smartphone"
          >
            <Smartphone size={15} /> 
            <span className="hidden md:inline">Móvil</span>
          </button>
        </div>

        {/* Right: Rich Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Edit Texts */}
          <button
            onClick={openEditorWithCurrentData}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs rounded-xl transition-all border border-slate-700/80 hover:border-blue-500/40 cursor-pointer shadow-xs hover:shadow-blue-500/10"
            title="Editar títulos, subtítulos, precio y textos de esta landing"
          >
            <Edit3 size={15} className="text-blue-400" />
            <span className="hidden xl:inline">Editar Textos</span>
          </button>

          {/* QR Code */}
          <button
            onClick={() => setIsQrOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs rounded-xl transition-all border border-slate-700/80 hover:border-indigo-500/40 cursor-pointer shadow-xs hover:shadow-indigo-500/10"
            title="Escanear con tu smartphone para ver cómo le llega al turista"
          >
            <QrCode size={15} className="text-indigo-400" />
            <span className="hidden xl:inline">QR Móvil</span>
          </button>

          {/* Export & Download Hub */}
          <button
            onClick={() => setIsDeployModalOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-amber-500/15 via-amber-600/10 to-amber-500/15 hover:from-amber-500/25 hover:to-amber-600/25 text-amber-300 hover:text-amber-200 border border-amber-500/40 hover:border-amber-400/60 font-bold text-xs rounded-xl transition-all shadow-sm shadow-amber-500/10 hover:shadow-amber-500/20 cursor-pointer"
            title="Descargar paquete ZIP autónomo o ver instrucciones de dominio propio en Vercel"
          >
            <Download size={15} className="text-amber-400" />
            <span className="hidden sm:inline">Exportar / ZIP</span>
          </button>

          {/* Copy Public Link */}
          <button
            onClick={handleCopyLink}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 font-bold text-xs rounded-xl transition-all border cursor-pointer ${
              copied 
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30' 
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-700/80 hover:border-slate-600 shadow-xs'
            }`}
            title="Copiar enlace para compartir con el cliente por WhatsApp"
          >
            {copied ? <Check size={15} className="text-emerald-200" /> : <Copy size={15} />}
            <span className="hidden sm:inline">{copied ? '¡Copiado!' : 'Copiar Link'}</span>
          </button>

          {/* Primary CTA: Open Live Web */}
          <a
            href={`/p/${landing.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-500 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-black text-xs transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 border border-blue-400/30 hover:scale-102 active:scale-98 cursor-pointer"
            title="Abrir versión web real en una nueva pestaña"
          >
            <Globe size={15} />
            <span className="hidden xs:inline sm:inline">Ver Web</span>
            <ExternalLink size={13} className="opacity-80" />
          </a>
        </div>
      </header>

      {/* Instant Notification Toast */}
      {publishToast && (
        <div className="fixed top-24 right-6 z-50 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-3 duration-300">
          <CheckCircle size={20} />
          <div>
            <p className="font-bold text-xs">¡Landing Publicada Exitosamente!</p>
            <p className="text-[11px] text-emerald-100">Haz clic en &quot;Ver Web&quot; para ver la versión en vivo.</p>
          </div>
        </div>
      )}

      {/* Preview Canvas Area */}
      <main className="flex-1 overflow-auto bg-slate-950 p-2 sm:p-4 md:p-8 flex justify-center items-start min-h-[calc(100vh-5rem)]">
        <div 
          className={`bg-white shadow-2xl transition-all duration-300 relative ${
            viewMode === 'mobile' 
              ? 'w-full max-w-[390px] h-[min(844px,calc(100vh-7rem))] sm:h-[844px] rounded-[36px] sm:rounded-[48px] ring-4 sm:ring-8 ring-slate-800 border-2 sm:border-4 border-slate-900 overflow-hidden my-2 sm:my-4 shadow-2xl shadow-black/80' 
              : viewMode === 'tablet'
              ? 'w-full max-w-[768px] h-[min(900px,calc(100vh-7rem))] sm:h-[900px] rounded-[24px] sm:rounded-[32px] ring-4 sm:ring-8 ring-slate-800 border-2 sm:border-4 border-slate-900 overflow-hidden my-2 sm:my-4 shadow-2xl shadow-black/80'
              : 'w-full max-w-[1440px] min-h-[min(850px,calc(100vh-7rem))] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl'
          }`}
        >
          {/* Dynamic Island / Camera Notch on Mobile View */}
          {viewMode === 'mobile' && (
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-full z-50 pointer-events-none flex items-center justify-end px-2 border border-slate-800/80 shadow-md">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-700/60"></div>
            </div>
          )}

          {/* Camera Dot on Tablet View */}
          {viewMode === 'tablet' && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rounded-full z-50 pointer-events-none border border-slate-800"></div>
          )}

          {/* Scrollable Frame Content (Isolated Stacking Context) */}
          <div className="w-full h-full overflow-y-auto overflow-x-hidden relative isolate table-scrollbar">
            <TemplateRenderer data={landing} viewMode={viewMode} />
          </div>
        </div>
      </main>

      {/* Editor Drawer / Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in">
          <div className="w-full max-w-md bg-white text-slate-900 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Edit3 size={18} className="text-blue-600" />
                  Editor de Textos y Tarifas
                </h3>
                <p className="text-xs text-slate-500">Ajusta los títulos y la plantilla en tiempo real</p>
              </div>
              <button 
                onClick={() => setIsEditorOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdits} className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Plantilla Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Layers size={14} className="text-blue-600" /> Plantilla Visual
                </label>
                <select
                  value={editTemplate}
                  onChange={(e) => setEditTemplate(e.target.value as 'adventure' | 'premium' | 'cultural')}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm bg-white font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="adventure">Aventura (Trekking y Naturaleza)</option>
                  <option value="premium">Premium / Lujo (Exclusivo VIP)</option>
                  <option value="cultural">Cultural Clásico (Historia e Incas)</option>
                </select>
              </div>

              {/* Pricing & WhatsApp */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Tarifa visible
                  </label>
                  <input
                    type="text"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Ej. $180 USD"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    WhatsApp Guía
                  </label>
                  <input
                    type="text"
                    value={editWhatsapp}
                    onChange={(e) => setEditWhatsapp(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                    placeholder="+51984..."
                  />
                </div>
              </div>

              {/* Hero Section */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Cabecera (Hero)</span>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Título Principal</label>
                  <input
                    type="text"
                    value={editHeroTitle}
                    onChange={(e) => setEditHeroTitle(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subtítulo persuasivo</label>
                  <textarea
                    rows={3}
                    value={editHeroSubtitle}
                    onChange={(e) => setEditHeroSubtitle(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Texto del Botón de Acción (CTA)</label>
                  <input
                    type="text"
                    value={editHeroCta}
                    onChange={(e) => setEditHeroCta(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  />
                </div>
              </div>

              {/* About Section */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Detalles del Tour</span>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Título de la sección</label>
                  <input
                    type="text"
                    value={editAboutTitle}
                    onChange={(e) => setEditAboutTitle(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Descripción detallada</label>
                  <textarea
                    rows={4}
                    value={editAboutContent}
                    onChange={(e) => setEditAboutContent(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
                  />
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 text-sm cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md cursor-pointer"
                >
                  Aplicar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Modal for Real Phone Testing */}
      {isQrOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white text-slate-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-center animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsQrOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg"
            >
              <X size={20} />
            </button>
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <QrCode size={26} />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Escanea desde tu Celular</h3>
            <p className="text-xs text-slate-500 mb-4">
              Abre la cámara de tu smartphone para probar la landing tal como la verá el turista.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-center mb-4">
              <div className="relative w-[180px] h-[180px]">
                <Image
                  src={qrUrl}
                  alt="QR Code"
                  fill
                  sizes="180px"
                  className="object-contain"
                />
              </div>
            </div>
            <a
              href={`/p/${landing.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
            >
              <span>Abrir en este navegador</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
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

export default function DemoPreview() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    }>
      <DemoPreviewContent />
    </Suspense>
  );
}
