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
  Download,
  Sparkles,
  MapPin,
  FileText,
  ShieldCheck,
  Clock,
  User,
  Phone,
  ImageIcon,
  DollarSign,
  Mountain,
  Tag,
  CheckSquare,
  AlertCircle,
  HelpCircle,
  Compass,
  Award,
  ListPlus,
  PackageCheck,
  Backpack,
  Sliders
} from 'lucide-react';
import TemplateRenderer from '@/templates/TemplateRenderer';
import DeploymentModal from '@/components/common/DeploymentModal';
import { getStoredLandings, saveLandingToStorage, LandingData } from '@/data/landingStore';
import { TemplateType, PlanTier, LanguageType, ObjectiveType } from '@/types/landing';

function DemoPreviewContent() {
  const searchParams = useSearchParams();
  const slugQuery = searchParams.get('slug');
  const templateQuery = searchParams.get('template') as TemplateType | null;
  const tierQuery = searchParams.get('tier') as PlanTier | null;

  const [landing, setLanding] = useState<LandingData | null>(() => {
    const list = getStoredLandings();
    let selected: LandingData | null = null;
    if (slugQuery) {
      const found = list.find(item => item.slug === slugQuery);
      if (found) selected = found;
    }
    if (!selected && templateQuery) {
      const foundByTpl = list.find(item => item.template === templateQuery);
      if (foundByTpl) selected = foundByTpl;
    }
    if (!selected) {
      selected = list[0] || null;
    }
    if (selected) {
      const activeTier = (tierQuery && ['free', 'basic', 'pro', 'advance'].includes(tierQuery)) ? tierQuery : selected.tier;
      const isFreeOrBasic = activeTier === 'free' || activeTier === 'basic';
      return {
        ...selected,
        ...(templateQuery ? { template: templateQuery } : {}),
        ...(tierQuery && ['free', 'basic', 'pro', 'advance'].includes(tierQuery) ? { tier: tierQuery } : {}),
        ...(isFreeOrBasic ? { language: 'es' as LanguageType, languages: ['es' as LanguageType] } : {})
      };
    }
    return null;
  });

  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [publishToast, setPublishToast] = useState(false);
  const [copied, setCopied] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  // Comprehensive Form State for Complete Landing Editor
  const [activeEditorTab, setActiveEditorTab] = useState<'general' | 'hero' | 'logistics' | 'content' | 'extras' | 'office'>('general');

  // 1. General & Design
  const [editName, setEditName] = useState(() => landing?.name || '');
  const [editTemplate, setEditTemplate] = useState<TemplateType>(() => landing?.template || 'adventure');
  const [editTier, setEditTier] = useState<PlanTier>(() => landing?.tier || 'advance');
  const [editObjective, setEditObjective] = useState<ObjectiveType>(() => landing?.objective || 'quote');
  const [editLanguage, setEditLanguage] = useState<LanguageType>(() => landing?.language || 'es');

  // 2. Hero & Header
  const [editHeroBadge, setEditHeroBadge] = useState(() => landing?.hero?.badge || '');
  const [editHeroTitle, setEditHeroTitle] = useState(() => landing?.hero?.title || '');
  const [editHeroSubtitle, setEditHeroSubtitle] = useState(() => landing?.hero?.subtitle || '');
  const [editHeroCta, setEditHeroCta] = useState(() => landing?.hero?.cta || '');
  const [editHeroImage, setEditHeroImage] = useState(() => landing?.heroImage || '');

  // 3. Pricing, Logistics & Guide
  const [editPrice, setEditPrice] = useState(() => landing?.price || '');
  const [editDuration, setEditDuration] = useState(() => landing?.duration || '');
  const [editDifficulty, setEditDifficulty] = useState(() => landing?.difficulty || '');
  const [editDestination, setEditDestination] = useState(() => landing?.destination || '');
  const [editAltitude, setEditAltitude] = useState(() => landing?.altitude || '');
  const [editGroupType, setEditGroupType] = useState(() => landing?.groupType || '');
  const [editWhatsapp, setEditWhatsapp] = useState(() => landing?.whatsapp || '');
  const [editGuideName, setEditGuideName] = useState(() => landing?.guideName || '');
  const [editGuideCert, setEditGuideCert] = useState(() => landing?.guideCert || '');
  const [editGuideAvatar, setEditGuideAvatar] = useState(() => landing?.guideAvatar || '');

  // 4. Content & Inclusions
  const [editAboutTitle, setEditAboutTitle] = useState(() => landing?.about?.title || '');
  const [editAboutContent, setEditAboutContent] = useState(() => landing?.about?.content || '');
  const [editFeaturesTitle, setEditFeaturesTitle] = useState(() => landing?.features?.title || '');
  const [editFeaturesItems, setEditFeaturesItems] = useState(() => landing?.features?.items?.join('\n') || '');

  // 5. Exclusions, Backpack & Trust
  const [editNotIncluded, setEditNotIncluded] = useState(() => landing?.notIncluded?.join('\n') || '');
  const [editWhatToBring, setEditWhatToBring] = useState(() => landing?.whatToBring?.join('\n') || '');
  const [editTrustBadges, setEditTrustBadges] = useState(() => landing?.trustBadges?.join('\n') || '');

  // 6. Physical Office & Maps
  const [editOfficeAddress, setEditOfficeAddress] = useState(() => landing?.officeAddress || '');
  const [editOfficeHours, setEditOfficeHours] = useState(() => landing?.officeHours || '');
  const [editMapsUrl, setEditMapsUrl] = useState(() => landing?.mapsUrl || '');

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
    setEditName(landing.name || '');
    setEditTemplate(landing.template || 'adventure');
    setEditTier(landing.tier || 'advance');
    setEditObjective(landing.objective || 'quote');
    setEditLanguage(landing.language || 'es');

    setEditHeroBadge(landing.hero?.badge || '');
    setEditHeroTitle(landing.hero?.title || '');
    setEditHeroSubtitle(landing.hero?.subtitle || '');
    setEditHeroCta(landing.hero?.cta || '');
    setEditHeroImage(landing.heroImage || '');

    setEditPrice(landing.price || '');
    setEditDuration(landing.duration || '');
    setEditDifficulty(landing.difficulty || '');
    setEditDestination(landing.destination || '');
    setEditAltitude(landing.altitude || '');
    setEditGroupType(landing.groupType || '');

    setEditWhatsapp(landing.whatsapp || '');
    setEditGuideName(landing.guideName || '');
    setEditGuideCert(landing.guideCert || '');
    setEditGuideAvatar(landing.guideAvatar || '');

    setEditAboutTitle(landing.about?.title || '');
    setEditAboutContent(landing.about?.content || '');

    setEditFeaturesTitle(landing.features?.title || '');
    setEditFeaturesItems(landing.features?.items?.join('\n') || '');

    setEditNotIncluded(landing.notIncluded?.join('\n') || '');
    setEditWhatToBring(landing.whatToBring?.join('\n') || '');
    setEditTrustBadges(landing.trustBadges?.join('\n') || '');

    setEditOfficeAddress(landing.officeAddress || '');
    setEditOfficeHours(landing.officeHours || '');
    setEditMapsUrl(landing.mapsUrl || '');

    setActiveEditorTab('general');
    setIsEditorOpen(true);
  };

  const handleSaveEdits = (e: React.FormEvent) => {
    e.preventDefault();
    const isFreeOrBasic = editTier === 'free' || editTier === 'basic';
    const updated: LandingData = {
      ...landing,
      name: editName,
      template: editTemplate,
      tier: editTier,
      objective: editObjective,
      language: isFreeOrBasic ? 'es' : editLanguage,
      languages: isFreeOrBasic ? ['es'] : (landing.languages && landing.languages.length > 0 ? landing.languages : ['es', 'en', 'pt', 'fr', 'it']),
      price: editPrice,
      duration: editDuration,
      difficulty: editDifficulty,
      destination: editDestination,
      altitude: editAltitude,
      groupType: editGroupType,
      whatsapp: editWhatsapp,
      guideName: editGuideName,
      guideCert: editGuideCert,
      guideAvatar: editGuideAvatar,
      heroImage: editHeroImage,
      hero: {
        badge: editHeroBadge,
        title: editHeroTitle,
        subtitle: editHeroSubtitle,
        cta: editHeroCta,
      },
      about: {
        title: editAboutTitle,
        content: editAboutContent,
      },
      features: {
        title: editFeaturesTitle,
        items: editFeaturesItems.split('\n').map(s => s.trim()).filter(Boolean),
      },
      notIncluded: editNotIncluded.split('\n').map(s => s.trim()).filter(Boolean),
      whatToBring: editWhatToBring.split('\n').map(s => s.trim()).filter(Boolean),
      trustBadges: editTrustBadges.split('\n').map(s => s.trim()).filter(Boolean),
      officeAddress: editOfficeAddress,
      officeHours: editOfficeHours,
      mapsUrl: editMapsUrl
    };
    setLanding(updated);
    saveLandingToStorage(updated);
    setIsEditorOpen(false);
    setRefreshKey(k => k + 1);
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
      
      {/* Top Professional Control Bar (Clean Toolbar + Dedicated Tour Info Sub-Bar) */}
      <div className="sticky top-0 z-40 select-none shadow-xl shadow-slate-950/70 shrink-0">
        
        {/* Row 1: Actions Toolbar (Fluid Horizontal Track) */}
        <header className="bg-slate-900/95 backdrop-blur-xl h-14 sm:h-16 px-3 sm:px-6 border-b border-slate-800/80 w-full max-w-full overflow-x-auto no-scrollbar touch-pan-x">
          <div className="flex items-center justify-between gap-2 sm:gap-4 min-w-max w-full h-full">
            
            {/* Left: Back Navigation */}
            <div className="flex items-center gap-2 shrink-0">
              <Link 
                href="/demo" 
                className="group text-slate-300 hover:text-white transition-all px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 flex items-center gap-1.5 sm:gap-2 text-xs font-bold border border-slate-700/70 hover:border-slate-600 shadow-xs shrink-0 cursor-pointer"
                title="Volver al panel principal"
              >
                <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform shrink-0" />
                <span className="hidden sm:inline">Panel</span>
              </Link>
            </div>

            {/* Center: Device Viewport Switcher */}
            <div className="flex items-center bg-slate-950/90 p-1 rounded-xl sm:rounded-2xl border border-slate-800/90 shadow-inner shadow-black/60 shrink-0">
              <button
                onClick={() => setViewMode('desktop')}
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg sm:rounded-xl text-xs flex items-center gap-1.5 sm:gap-2 font-extrabold transition-all cursor-pointer ${
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
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg sm:rounded-xl text-xs flex items-center gap-1.5 sm:gap-2 font-extrabold transition-all cursor-pointer ${
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
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg sm:rounded-xl text-xs flex items-center gap-1.5 sm:gap-2 font-extrabold transition-all cursor-pointer ${
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
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              
              {/* Primary Action: Edit Landing (Highly Prominent & Vibrant) */}
              <button
                onClick={openEditorWithCurrentData}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-600 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-blue-600/35 hover:shadow-blue-500/55 border border-blue-400/40 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                title="Editar todas las opciones de la landing (textos, precios, fotos, qué incluye y logística)"
              >
                <Edit3 size={15} className="text-white shrink-0" />
                <span>Editar Landing</span>
              </button>

              {/* QR Code */}
              <button
                onClick={() => setIsQrOpen(true)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs rounded-xl transition-all border border-slate-700/80 hover:border-indigo-500/40 cursor-pointer shadow-xs shrink-0"
                title="Escanear con tu smartphone para ver cómo le llega al turista"
              >
                <QrCode size={15} className="text-indigo-400 shrink-0" />
                <span className="hidden md:inline">QR</span>
              </button>

              {/* Export & Download Hub */}
              <button
                onClick={() => setIsDeployModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-amber-500/15 via-amber-600/10 to-amber-500/15 hover:from-amber-500/25 hover:to-amber-600/25 text-amber-300 hover:text-amber-200 border border-amber-500/40 hover:border-amber-400/60 font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
                title="Descargar paquete ZIP autónomo o ver instrucciones de dominio propio en Vercel"
              >
                <Download size={15} className="text-amber-400 shrink-0" />
                <span className="hidden sm:inline">Exportar</span>
              </button>

              {/* Copy Public Link */}
              <button
                onClick={handleCopyLink}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 font-bold text-xs rounded-xl transition-all border cursor-pointer shrink-0 ${
                  copied 
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30' 
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-700/80 hover:border-slate-600 shadow-xs'
                }`}
                title="Copiar enlace para compartir con el cliente por WhatsApp"
              >
                {copied ? <Check size={15} className="text-emerald-200 shrink-0" /> : <Copy size={15} className="shrink-0" />}
                <span className="hidden md:inline">{copied ? '¡Copiado!' : 'Copiar'}</span>
              </button>

              {/* Primary CTA: Open Live Web (Always Visible & Accessible) */}
              <a
                href={`/p/${landing.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-black text-xs transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 border border-blue-400/30 hover:scale-102 active:scale-98 cursor-pointer shrink-0"
                title="Abrir versión web real en una nueva pestaña"
              >
                <Globe size={15} className="shrink-0" />
                <span>Ver Web</span>
                <ExternalLink size={13} className="opacity-80 shrink-0 hidden xs:inline" />
              </a>
            </div>
          </div>
        </header>

        {/* Row 2: Dedicated Tour Identity Bar */}
        <div className="bg-slate-950/95 backdrop-blur-md px-3 sm:px-6 py-2 border-b border-slate-800/70 flex items-center justify-between gap-3 text-xs overflow-x-auto">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-slate-500 font-medium text-[11px] shrink-0">Landing:</span>
            <h2 className="font-bold text-white text-xs sm:text-sm truncate drop-shadow-xs">
              {landing.name}
            </h2>
            {landing.status === 'published' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Publicado
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                Borrador
              </span>
            )}
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div className="hidden sm:flex items-center gap-1.5 text-slate-400 shrink-0">
              <span className="text-[11px]">Plantilla:</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-900 text-blue-400 font-semibold text-[10px] uppercase tracking-wide border border-slate-800">
                {landing.template}
              </span>
            </div>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <span className="text-[11px] text-slate-400">Nivel:</span>
              <span className={`px-2 py-0.5 rounded-md font-extrabold text-[10px] uppercase tracking-wide border ${
                (landing.tier || 'advance') === 'advance'
                  ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                  : (landing.tier || 'advance') === 'pro'
                  ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                  : (landing.tier || 'advance') === 'basic'
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  : 'bg-stone-500/15 text-stone-300 border-stone-500/30'
              }`}>
                {landing.tier || 'advance'}
              </span>
            </div>
            {landing.guideName && (
              <>
                <span className="text-slate-700 hidden md:inline">•</span>
                <span className="text-slate-400 text-[11px] truncate hidden md:inline">
                  Guía: <strong className="text-slate-200 font-medium">{landing.guideName}</strong>
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-[11px] text-slate-500 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-800/80">
              /p/{landing.slug}
            </span>
          </div>
        </div>

      </div>

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
          className={`bg-white shadow-2xl transition-all duration-300 relative [transform:translateZ(0)] ${
            viewMode === 'mobile' 
              ? 'w-full max-w-[390px] h-[min(844px,calc(100vh-7rem))] sm:h-[844px] rounded-[36px] sm:rounded-[48px] ring-4 sm:ring-8 ring-slate-800 border-2 sm:border-4 border-slate-900 overflow-hidden my-2 sm:my-4 shadow-2xl shadow-black/80' 
              : viewMode === 'tablet'
              ? 'w-full max-w-[768px] h-[min(900px,calc(100vh-7rem))] sm:h-[900px] rounded-[24px] sm:rounded-[32px] ring-4 sm:ring-8 ring-slate-800 border-2 sm:border-4 border-slate-900 overflow-hidden my-2 sm:my-4 shadow-2xl shadow-black/80'
              : 'w-full max-w-[1440px] min-h-[min(850px,calc(100vh-7rem))] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl'
          }`}
          style={{ transform: 'translateZ(0)' }}
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

          {/* Scrollable Frame Content: Isolated viewport for mobile/tablet */}
          <div className="w-full h-full relative isolate">
            {viewMode === 'desktop' ? (
              <div className="w-full h-full overflow-y-auto overflow-x-hidden relative isolate table-scrollbar overscroll-x-none touch-pan-y">
                <TemplateRenderer data={landing} viewMode="desktop" />
              </div>
            ) : (
              <iframe
                key={`${landing.slug}-${landing.template}-${viewMode}-${refreshKey}`}
                src={`/p/${landing.slug}?embed=true&mode=${viewMode}&tpl=${landing.template}&r=${refreshKey}`}
                title={`Simulador ${viewMode}`}
                className="w-full h-full border-0 bg-white"
              />
            )}
          </div>
        </div>
      </main>

      {/* Comprehensive Editor Drawer / Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in">
          <div className="w-full max-w-2xl bg-white text-slate-900 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* Header */}
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                  <Edit3 size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                    Editor Integral de Landing
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                      En Vivo
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500">Personaliza todos los textos, logística, precios, diseño y contenidos</p>
                </div>
              </div>
              <button 
                onClick={() => setIsEditorOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200/60 transition-colors cursor-pointer"
                title="Cerrar editor"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs Navigation Bar */}
            <div className="flex items-center gap-1 px-4 py-2 bg-slate-100/90 border-b border-slate-200 overflow-x-auto scrollbar-none text-xs font-bold shrink-0">
              {[
                { id: 'general', label: '1. General & Diseño', icon: Sliders },
                { id: 'hero', label: '2. Hero & Portada', icon: ImageIcon },
                { id: 'logistics', label: '3. Guía & Logística', icon: Compass },
                { id: 'content', label: '4. Detalles & Incluye', icon: PackageCheck },
                { id: 'extras', label: '5. Mochila & Sellos', icon: Backpack },
                { id: 'office', label: '6. Oficina & Maps', icon: MapPin },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeEditorTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveEditorTab(tab.id as typeof activeEditorTab)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                    }`}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Form Content */}
            <form onSubmit={handleSaveEdits} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              
              {/* TAB 1: GENERAL & DISEÑO */}
              {activeEditorTab === 'general' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="bg-blue-50/60 border border-blue-200/60 rounded-xl p-3.5 text-xs text-blue-900 flex items-start gap-2.5">
                    <Sparkles size={16} className="text-blue-600 shrink-0 mt-0.5" />
                    <span>Configura la identidad base, plantilla temática, nivel de plan y objetivos de conversión.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Nombre del Tour / Landing
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Ej. Machu Picchu VIP (Diseño 1)"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Layers size={14} className="text-blue-600" /> Plantilla Visual (5 Diseños)
                      </label>
                      <select
                        value={editTemplate}
                        onChange={(e) => setEditTemplate(e.target.value as TemplateType)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm bg-white font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="agency-portal">🔥 Diseño 1 (Portal Oficial de Agencia)</option>
                        <option value="adventure">Trek & Aventura (Trekking y Alta Montaña)</option>
                        <option value="premium">Premium Luxury (Colección Exclusiva VIP)</option>
                        <option value="cultural">Patrimonio Cultural (Historia e Incas)</option>
                        <option value="boho-nature">Boho Journal (Pinterest & Polaroids)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <CheckCircle size={14} className="text-emerald-600" /> Nivel / Plan Técnico
                      </label>
                      <select
                        value={editTier}
                        onChange={(e) => setEditTier(e.target.value as PlanTier)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm bg-white font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="free">Gratuito (Hero + WhatsApp Directo)</option>
                        <option value="basic">Básico (Hero + Ficha + Qué Incluye + 3 Fotos)</option>
                        <option value="pro">Pro (Itinerario + Mochila + Sellos + 2 Idiomas)</option>
                        <option value="advance">Advance (HD Completo + FAQs + Reseñas + 5 Idiomas)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Objetivo de Conversión
                      </label>
                      <select
                        value={editObjective}
                        onChange={(e) => setEditObjective(e.target.value as ObjectiveType)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm bg-white font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="quote">Solo Formulario de Cotización</option>
                        <option value="whatsapp">Solo WhatsApp Directo</option>
                        <option value="both">Ambos Simultáneos (Cotizar + WhatsApp)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Idioma Base del Tour
                      </label>
                      <select
                        value={editLanguage}
                        onChange={(e) => setEditLanguage(e.target.value as LanguageType)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm bg-white font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="es">🇪🇸 Español (Predeterminado)</option>
                        <option value="en">🇺🇸 English</option>
                        <option value="pt">🇧🇷 Português</option>
                        <option value="fr">🇫🇷 Français</option>
                        <option value="it">🇮🇹 Italiano</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: HERO & PORTADA */}
              {activeEditorTab === 'hero' && (
                <div className="space-y-4 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Insignia Superior (Badge)
                    </label>
                    <input
                      type="text"
                      value={editHeroBadge}
                      onChange={(e) => setEditHeroBadge(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Ej. Experiencia Exclusiva VIP • Temporada 2026"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Título Principal H1
                    </label>
                    <input
                      type="text"
                      value={editHeroTitle}
                      onChange={(e) => setEditHeroTitle(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-extrabold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Ej. Machu Picchu de Lujo con Tren Panorámico"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Subtítulo Persuasivo
                    </label>
                    <textarea
                      rows={3}
                      value={editHeroSubtitle}
                      onChange={(e) => setEditHeroSubtitle(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
                      placeholder="Ej. Descubre la maravilla del mundo con traslados privados, hoteles 5 estrellas y un guía oficial exclusivo..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Texto del Botón Principal (CTA)
                    </label>
                    <input
                      type="text"
                      value={editHeroCta}
                      onChange={(e) => setEditHeroCta(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Ej. Solicitar Cotización Privada"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
                      <span>URL Foto de Portada (Hero Background)</span>
                      <span className="text-[10px] text-slate-400 font-normal">Unsplash / Imagen propia</span>
                    </label>
                    <input
                      type="url"
                      value={editHeroImage}
                      onChange={(e) => setEditHeroImage(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="https://images.unsplash.com/..."
                    />
                    {editHeroImage && (
                      <div className="mt-2.5 relative h-28 rounded-xl overflow-hidden border border-slate-200">
                        <img src={editHeroImage} alt="Hero preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: GUÍA & LOGÍSTICA */}
              {activeEditorTab === 'logistics' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Tarifa Visible (Precio)
                      </label>
                      <input
                        type="text"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-black text-emerald-600 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Ej. $180 USD o S/ 650 PEN"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Duración
                      </label>
                      <input
                        type="text"
                        value={editDuration}
                        onChange={(e) => setEditDuration(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Ej. Full Day (05:00 - 18:00)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Dificultad
                      </label>
                      <input
                        type="text"
                        value={editDifficulty}
                        onChange={(e) => setEditDifficulty(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Ej. Fácil - Confort"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Altitud Máxima
                      </label>
                      <input
                        type="text"
                        value={editAltitude}
                        onChange={(e) => setEditAltitude(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Ej. 3,400 msnm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Tipo de Grupo
                      </label>
                      <input
                        type="text"
                        value={editGroupType}
                        onChange={(e) => setEditGroupType(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Ej. 100% Privado VIP"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Destino / Región
                    </label>
                    <input
                      type="text"
                      value={editDestination}
                      onChange={(e) => setEditDestination(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Ej. Machu Picchu, Aguas Calientes, Cusco"
                    />
                  </div>

                  <div className="border-t border-slate-200/80 pt-4 space-y-3">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Guía Oficial & WhatsApp</span>
                    
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        WhatsApp de Reservas (con código de país)
                      </label>
                      <input
                        type="text"
                        value={editWhatsapp}
                        onChange={(e) => setEditWhatsapp(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="+51984123456"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Nombre del Guía
                        </label>
                        <input
                          type="text"
                          value={editGuideName}
                          onChange={(e) => setEditGuideName(e.target.value)}
                          className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Ej. Carlos Mendoza"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          N° Carnet / Certificación DIRCETUR
                        </label>
                        <input
                          type="text"
                          value={editGuideCert}
                          onChange={(e) => setEditGuideCert(e.target.value)}
                          className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                          placeholder="DIRCETUR N° 4589-C"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        URL Foto o Avatar del Guía
                      </label>
                      <input
                        type="text"
                        value={editGuideAvatar}
                        onChange={(e) => setEditGuideAvatar(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                        placeholder="/images/tour-guide-carlos.jpg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: DETALLES & QUÉ INCLUYE */}
              {activeEditorTab === 'content' && (
                <div className="space-y-4 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Título de Sección "Acerca del Tour"
                    </label>
                    <input
                      type="text"
                      value={editAboutTitle}
                      onChange={(e) => setEditAboutTitle(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Ej. Un viaje sagrado diseñado para los más exigentes"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Descripción Narrativa del Tour
                    </label>
                    <textarea
                      rows={4}
                      value={editAboutContent}
                      onChange={(e) => setEditAboutContent(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
                      placeholder="Evita las largas colas y el estrés del turismo masivo. Nuestro servicio VIP te brinda acceso preferente..."
                    />
                  </div>

                  <div className="border-t border-slate-200/80 pt-4 space-y-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Título de Sección Inclusiones
                      </label>
                      <input
                        type="text"
                        value={editFeaturesTitle}
                        onChange={(e) => setEditFeaturesTitle(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Ej. Privilegios de la Experiencia VIP"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between">
                        <span>Servicios Incluidos (1 por línea)</span>
                        <span className="text-[10px] text-slate-400 font-normal">Formato: Título:Descripción o frase simple</span>
                      </label>
                      <textarea
                        rows={7}
                        value={editFeaturesItems}
                        onChange={(e) => setEditFeaturesItems(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
                        placeholder="Vagón Panorámico Vistadome:Viaja con música en vivo y vistas 360°&#10;Guía Historiador Privado:Acompañamiento exclusivo&#10;Boletos de Ingreso:Acceso oficial garantizado"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: EXCLUSIONES, MOCHILA & SELLOS */}
              {activeEditorTab === 'extras' && (
                <div className="space-y-4 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between">
                      <span>Qué NO Incluye (1 por línea)</span>
                      <span className="text-[10px] text-slate-400 font-normal">Exclusiones claras</span>
                    </label>
                    <textarea
                      rows={4}
                      value={editNotIncluded}
                      onChange={(e) => setEditNotIncluded(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
                      placeholder="Vuelos internacionales o domésticos&#10;Propinas voluntarias para guía y chofer&#10;Seguro médico de viaje"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between">
                      <span>Qué Llevar / Mochila del Viajero (1 por línea)</span>
                      <span className="text-[10px] text-slate-400 font-normal">Recomendaciones</span>
                    </label>
                    <textarea
                      rows={4}
                      value={editWhatToBring}
                      onChange={(e) => setEditWhatToBring(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
                      placeholder="Pasaporte original físico vigente&#10;Ropa abrigadora en capas y cortavientos&#10;Calzado de trekking con buen agarre&#10;Bloqueador solar y repelente"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between">
                      <span>Sellos de Confianza & Certificaciones (1 por línea)</span>
                      <span className="text-[10px] text-slate-400 font-normal">Garantías oficiales</span>
                    </label>
                    <textarea
                      rows={3}
                      value={editTrustBadges}
                      onChange={(e) => setEditTrustBadges(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
                      placeholder="Licencia Oficial DIRCETUR Cusco&#10;Sello Safe Travels Internacional&#10;RUC 20 Formal Verificado"
                    />
                  </div>
                </div>
              )}

              {/* TAB 6: OFICINA & MAPS */}
              {activeEditorTab === 'office' && (
                <div className="space-y-4 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Dirección Física de Oficina
                    </label>
                    <input
                      type="text"
                      value={editOfficeAddress}
                      onChange={(e) => setEditOfficeAddress(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Ej. Portal de Panes N° 123, Plaza de Armas, Cusco"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Horario de Atención al Turista
                    </label>
                    <input
                      type="text"
                      value={editOfficeHours}
                      onChange={(e) => setEditOfficeHours(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Ej. Lunes a Domingo: 08:00 AM – 08:00 PM"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
                      <span>Enlace Oficial de Google Maps</span>
                      <span className="text-[10px] text-slate-400 font-normal">Opcional</span>
                    </label>
                    <input
                      type="url"
                      value={editMapsUrl}
                      onChange={(e) => setEditMapsUrl(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="https://maps.app.goo.gl/..."
                    />
                  </div>
                </div>
              )}

              {/* Footer Controls */}
              <div className="border-t border-slate-200 pt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-100 text-xs sm:text-sm cursor-pointer transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-xl text-xs sm:text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <Check size={16} />
                  <span>Guardar Todos los Cambios</span>
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
