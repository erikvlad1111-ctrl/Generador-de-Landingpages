"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Smartphone, 
  Monitor, 
  Edit3, 
  Share2, 
  ExternalLink, 
  Copy, 
  Check, 
  X, 
  Layers
} from 'lucide-react';
import TemplateRenderer from '@/templates/TemplateRenderer';
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

  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form state for editor
  const [editHeroTitle, setEditHeroTitle] = useState(() => landing?.hero?.title || '');
  const [editHeroSubtitle, setEditHeroSubtitle] = useState(() => landing?.hero?.subtitle || '');
  const [editHeroCta, setEditHeroCta] = useState(() => landing?.hero?.cta || '');
  const [editAboutTitle, setEditAboutTitle] = useState(() => landing?.about?.title || '');
  const [editAboutContent, setEditAboutContent] = useState(() => landing?.about?.content || '');
  const [editPrice, setEditPrice] = useState(() => landing?.price || '');
  const [editWhatsapp, setEditWhatsapp] = useState(() => landing?.whatsapp || '');
  const [editTemplate, setEditTemplate] = useState<'adventure' | 'premium' | 'cultural'>(() => landing?.template || 'adventure');

  const openEditorWithCurrentData = () => {
    if (landing) {
      setEditHeroTitle(landing.hero?.title || '');
      setEditHeroSubtitle(landing.hero?.subtitle || '');
      setEditHeroCta(landing.hero?.cta || '');
      setEditAboutTitle(landing.about?.title || '');
      setEditAboutContent(landing.about?.content || '');
      setEditPrice(landing.price || '');
      setEditWhatsapp(landing.whatsapp || '');
      setEditTemplate(landing.template || 'adventure');
    }
    setIsEditorOpen(true);
  };

  if (!landing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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

  const handlePublish = () => {
    const published: LandingData = {
      ...landing,
      status: 'published'
    };
    setLanding(published);
    saveLandingToStorage(published);
    setIsPublishModalOpen(true);
  };

  const publicUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/p/${landing.slug}`
    : `/p/${landing.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="-mx-8 -my-8 bg-slate-100 min-h-screen flex flex-col relative overflow-hidden">
      {/* Top Editor Bar */}
      <header className="bg-white h-16 px-6 border-b border-slate-200 flex items-center justify-between shadow-sm shrink-0 relative z-30">
        <div className="flex items-center gap-4">
          <Link href="/demo" className="text-slate-500 hover:text-slate-800 transition-colors p-1.5 rounded-lg hover:bg-slate-100">
            <ArrowLeft size={20} />
          </Link>
          <div className="h-6 w-px bg-slate-200"></div>
          <div>
            <h2 className="font-semibold text-slate-800 leading-tight flex items-center gap-2">
              {landing.name}
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                landing.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {landing.status === 'published' ? 'Publicada' : 'Borrador'}
              </span>
            </h2>
            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 size={12} /> Plantilla activa: <strong className="capitalize">{landing.template}</strong>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Device viewport switcher */}
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-1.5 rounded text-xs flex items-center gap-1 font-medium transition-all ${
                viewMode === 'desktop' ? 'bg-white shadow-sm text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Vista de Computadora"
            >
              <Monitor size={16} /> Desktop
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-1.5 rounded text-xs flex items-center gap-1 font-medium transition-all ${
                viewMode === 'mobile' ? 'bg-white shadow-sm text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Vista Móvil (Smartphones)"
            >
              <Smartphone size={16} /> Móvil
            </button>
          </div>

          {/* Edit Texts Button */}
          <button
            onClick={openEditorWithCurrentData}
            className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-300 text-slate-700 font-medium text-sm rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Edit3 size={15} />
            <span>Editar Textos</span>
          </button>

          {/* Publish Landing Button */}
          <button
            onClick={handlePublish}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm transition-all shadow-md shadow-blue-500/20"
          >
            <Share2 size={15} />
            <span>Publicar Landing</span>
          </button>
        </div>
      </header>

      {/* Preview Canvas Area */}
      <main className="flex-1 overflow-auto bg-slate-200/70 p-4 md:p-8 flex justify-center items-start">
        <div 
          className={`bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-300 transition-all duration-300 ${
            viewMode === 'mobile' ? 'w-[390px] h-[820px] ring-8 ring-slate-800 rounded-[40px]' : 'w-full max-w-[1400px] h-[820px]'
          }`}
        >
          <div className="h-full overflow-y-auto overflow-x-hidden relative">
            <TemplateRenderer data={landing} />
          </div>
        </div>
      </main>

      {/* Editor Drawer / Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <Edit3 size={18} className="text-blue-600" />
                  Editor de Secciones
                </h3>
                <p className="text-xs text-slate-500">Personaliza los textos generados por la IA</p>
              </div>
              <button 
                onClick={() => setIsEditorOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdits} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Plantilla Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                  <Layers size={14} className="text-blue-600" /> Estilo / Plantilla Visual
                </label>
                <select
                  value={editTemplate}
                  onChange={(e) => setEditTemplate(e.target.value as 'adventure' | 'premium' | 'cultural')}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="adventure">Aventura (Trekking y Naturaleza)</option>
                  <option value="premium">Premium / Lujo (Exclusivo VIP)</option>
                  <option value="cultural">Cultural Clásico (Historia e Incas)</option>
                </select>
              </div>

              {/* Pricing & WhatsApp */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Precio visible
                  </label>
                  <input
                    type="text"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Ej. $180 USD"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    WhatsApp Guía
                  </label>
                  <input
                    type="text"
                    value={editWhatsapp}
                    onChange={(e) => setEditWhatsapp(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="+51984..."
                  />
                </div>
              </div>

              {/* Hero Section */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Sección Hero</span>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Título Principal (H1)</label>
                  <input
                    type="text"
                    value={editHeroTitle}
                    onChange={(e) => setEditHeroTitle(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Subtítulo persuasivo</label>
                  <textarea
                    rows={3}
                    value={editHeroSubtitle}
                    onChange={(e) => setEditHeroSubtitle(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Texto del Botón CTA</label>
                  <input
                    type="text"
                    value={editHeroCta}
                    onChange={(e) => setEditHeroCta(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  />
                </div>
              </div>

              {/* About Section */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Sección Descripción</span>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Título de la sección</label>
                  <input
                    type="text"
                    value={editAboutTitle}
                    onChange={(e) => setEditAboutTitle(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Descripción detallada</label>
                  <textarea
                    rows={4}
                    value={editAboutContent}
                    onChange={(e) => setEditAboutContent(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm shadow-md"
                >
                  Aplicar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Publish Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl relative text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={36} />
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mb-1">¡Landing Page Publicada!</h3>
            <p className="text-sm text-slate-500 mb-6">
              Tu landing ya se encuentra activa y lista para recibir turistas y clientes por WhatsApp.
            </p>

            {/* Public Link Box */}
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between gap-2 mb-6">
              <span className="text-xs font-mono text-slate-700 truncate text-left">
                {publicUrl}
              </span>
              <button
                onClick={handleCopyLink}
                className="shrink-0 flex items-center gap-1 bg-white hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                {copied ? 'Copiado' : 'Copiar'}
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-medium rounded-lg hover:bg-slate-50 text-sm"
              >
                Seguir Editando
              </button>
              <a
                href={`/p/${landing.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-lg text-sm shadow-md transition-colors"
              >
                <span>Ver Landing en Vivo</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DemoPreview() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <DemoPreviewContent />
    </Suspense>
  );
}
