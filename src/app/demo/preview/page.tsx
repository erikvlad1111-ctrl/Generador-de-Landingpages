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
      
      {/* Top Professional Control Bar (Streamlined, non-wrapping, perfectly balanced) */}
      <header className="bg-slate-900/98 backdrop-blur-md h-16 px-4 sm:px-6 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0 sticky top-0 z-40 shadow-xl select-none">
        
        {/* Left: Back Link & Tour Identity */}
        <div className="flex items-center gap-3 min-w-0 shrink-0">
          <Link 
            href="/demo" 
            className="text-slate-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-slate-800/80 flex items-center gap-1.5 text-xs font-bold border border-slate-800 shrink-0"
            title="Volver al panel principal"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Panel</span>
          </Link>

          <div className="h-5 w-px bg-slate-800 shrink-0"></div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-white text-xs sm:text-sm tracking-tight truncate max-w-[150px] sm:max-w-[220px] md:max-w-xs">
                {landing.name}
              </h2>
              <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                landing.status === 'published' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {landing.status === 'published' ? '● Publicado' : '○ Borrador'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 truncate hidden sm:block">
              Plantilla: <strong className="capitalize text-slate-200">{landing.template}</strong> • {landing.guideName || 'Cusco Creativos'}
            </p>
          </div>
        </div>

        {/* Center: Device Viewport Switcher (Centered & Balanced) */}
        <div className="hidden md:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shadow-inner shrink-0">
          <button
            onClick={() => setViewMode('desktop')}
            className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 font-bold transition-all cursor-pointer ${
              viewMode === 'desktop' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
            title="Vista Computadora"
          >
            <Monitor size={14} /> 
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setViewMode('tablet')}
            className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 font-bold transition-all cursor-pointer ${
              viewMode === 'tablet' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
            title="Vista Tablet"
          >
            <Tablet size={14} /> 
            <span>Tablet</span>
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 font-bold transition-all cursor-pointer ${
              viewMode === 'mobile' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
            title="Vista Móvil"
          >
            <Smartphone size={14} /> 
            <span>Móvil</span>
          </button>
        </div>

        {/* Right: Actions Grouped in 1 Clean Row */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Edit Button */}
          <button
            onClick={openEditorWithCurrentData}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-all border border-slate-700/80 cursor-pointer shadow-xs"
            title="Editar textos de esta landing"
          >
            <Edit3 size={14} className="text-blue-400" />
            <span className="hidden xl:inline">Editar Textos</span>
          </button>

          {/* QR Code Button */}
          <button
            onClick={() => setIsQrOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-all border border-slate-700/80 cursor-pointer shadow-xs"
            title="Probar en tu celular con Código QR"
          >
            <QrCode size={14} className="text-indigo-400" />
            <span className="hidden xl:inline">QR Móvil</span>
          </button>

          {/* Export & Download Hub Button */}
          <button
            onClick={() => setIsDeployModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 text-amber-300 border border-amber-500/40 font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
            title="Descargar paquete ZIP/HTML o ver opciones de despliegue en Vercel"
          >
            <Download size={14} className="text-amber-400" />
            <span className="hidden sm:inline">Exportar / ZIP</span>
          </button>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className={`flex items-center gap-1.5 px-3 py-2 font-bold text-xs rounded-xl transition-all border cursor-pointer ${
              copied 
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm' 
                : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border-slate-700/80'
            }`}
            title="Copiar enlace para enviar por WhatsApp al cliente"
          >
            {copied ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
            <span className="hidden sm:inline">{copied ? '¡Copiado!' : 'Copiar Link'}</span>
          </button>

          {/* Primary View Live Web Button */}
          <a
            href={`/p/${landing.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-3.5 py-2 rounded-xl font-extrabold text-xs transition-all shadow-md shadow-blue-600/25 hover:scale-102 active:scale-98"
            title="Abrir landing page pública en una nueva pestaña"
          >
            <Globe size={14} />
            <span>Ver Web</span>
            <ExternalLink size={13} className="opacity-80" />
          </a>
        </div>
      </header>

      {/* Instant Notification Toast */}
      {publishToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-3 duration-300">
          <CheckCircle size={20} />
          <div>
            <p className="font-bold text-xs">¡Landing Publicada Exitosamente!</p>
            <p className="text-[11px] text-emerald-100">Haz clic en &quot;Abrir en Chrome&quot; para ver la versión en vivo.</p>
          </div>
        </div>
      )}

      {/* Preview Canvas Area */}
      <main className="flex-1 overflow-auto bg-slate-950 p-2 sm:p-4 md:p-8 flex justify-center items-start min-h-[calc(100vh-4rem)]">
        <div 
          className={`bg-white shadow-2xl transition-all duration-300 relative ${
            viewMode === 'mobile' 
              ? 'w-full max-w-[390px] h-[844px] rounded-[36px] sm:rounded-[48px] ring-4 sm:ring-8 ring-slate-800 border-2 sm:border-4 border-slate-900 overflow-hidden my-2 sm:my-4' 
              : viewMode === 'tablet'
              ? 'w-full max-w-[768px] h-[920px] rounded-[24px] sm:rounded-[32px] ring-4 sm:ring-8 ring-slate-800 border-2 sm:border-4 border-slate-900 overflow-hidden my-2 sm:my-4'
              : 'w-full max-w-[1440px] min-h-[850px] rounded-2xl overflow-hidden border border-slate-800'
          }`}
        >
          {/* Scrollable Frame Content */}
          <div className="w-full h-full overflow-y-auto overflow-x-hidden">
            <TemplateRenderer data={landing} />
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
