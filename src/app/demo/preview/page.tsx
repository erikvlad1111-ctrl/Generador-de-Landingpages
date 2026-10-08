"use client";

import React, { useState, useEffect, Suspense } from 'react';
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
  CheckCircle2,
  Download,
  Sparkles,
  MapPin,
  FileText,
  ShieldCheck,
  Clock,
  User,
  Phone,
  Image as ImageIcon,
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
  Sliders,
  Plus,
  Trash2,
  Calendar,
  Star,
  Quote,
  SlidersHorizontal,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  Maximize2,
  Minimize2,
  Zap,
  Eye,
  CheckCheck
} from 'lucide-react';
import TemplateRenderer from '@/templates/TemplateRenderer';
import DeploymentModal from '@/components/common/DeploymentModal';
import CatalogToursEditorModal from '@/components/common/CatalogToursEditorModal';
import { SAMPLE_TOUR_IMAGES } from '@/data/sampleImages';
import { getStoredLandings, saveLandingToStorage, LandingData } from '@/data/landingStore';
import { TemplateType, PlanTier, LanguageType, ObjectiveType, ItineraryItem, FAQItem, TestimonialItem, CatalogTourItem } from '@/types/landing';

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
  const [activeEditorTab, setActiveEditorTab] = useState<'general' | 'hero' | 'description' | 'logistics' | 'content' | 'itinerary' | 'faqs' | 'reviews' | 'gallery_office'>('general');

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

  // 3. Descripción Narrativa & Acerca del Tour
  const [editAboutTitle, setEditAboutTitle] = useState(() => landing?.about?.title || '');
  const [editAboutContent, setEditAboutContent] = useState(() => landing?.about?.content || '');

  // 4. Pricing, Logistics & Guide
  const [editPrice, setEditPrice] = useState(() => landing?.price || '');
  const [editDuration, setEditDuration] = useState(() => landing?.duration || '');
  const [editDifficulty, setEditDifficulty] = useState(() => landing?.difficulty || '');
  const [editDestination, setEditDestination] = useState(() => landing?.destination || '');
  const [editAltitude, setEditAltitude] = useState(() => landing?.altitude || '');
  const [editGroupType, setEditGroupType] = useState(() => landing?.groupType || '');
  const [editTargetAudience, setEditTargetAudience] = useState(() => landing?.targetAudience || '');
  const [editWhatsapp, setEditWhatsapp] = useState(() => landing?.whatsapp || '');
  const [editGuideName, setEditGuideName] = useState(() => landing?.guideName || '');
  const [editGuideCert, setEditGuideCert] = useState(() => landing?.guideCert || '');
  const [editGuideLanguages, setEditGuideLanguages] = useState(() => landing?.guideLanguages || '');
  const [editGuideAvatar, setEditGuideAvatar] = useState(() => landing?.guideAvatar || '');

  // 5. Inclusiones, Exclusiones, Mochila & Sellos
  const [editFeaturesTitle, setEditFeaturesTitle] = useState(() => landing?.features?.title || '');
  const [editFeaturesItems, setEditFeaturesItems] = useState(() => landing?.features?.items?.join('\n') || '');
  const [editNotIncluded, setEditNotIncluded] = useState(() => landing?.notIncluded?.join('\n') || '');
  const [editWhatToBring, setEditWhatToBring] = useState(() => landing?.whatToBring?.join('\n') || '');
  const [editTrustBadges, setEditTrustBadges] = useState(() => landing?.trustBadges?.join('\n') || '');

  // 6. Itinerario Paso a Paso
  const [editItinerary, setEditItinerary] = useState<ItineraryItem[]>(() => landing?.itinerary || []);

  // 7. FAQs & Testimonios
  const [editFaqs, setEditFaqs] = useState<FAQItem[]>(() => landing?.faqs || []);
  const [editTestimonials, setEditTestimonials] = useState<TestimonialItem[]>(() => landing?.testimonials || []);

  // 8. Galería, Oficina & Catálogo
  const [editGalleryImages, setEditGalleryImages] = useState(() => landing?.galleryImages?.join('\n') || '');
  const [editOfficeAddress, setEditOfficeAddress] = useState(() => landing?.officeAddress || '');
  const [editOfficeHours, setEditOfficeHours] = useState(() => landing?.officeHours || '');
  const [editMapsUrl, setEditMapsUrl] = useState(() => landing?.mapsUrl || '');

  // Modal Secundario de Catálogo Multitour
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [catalogTours, setCatalogTours] = useState<CatalogTourItem[]>(() => landing?.catalogTours || []);
  const [isEditorFullscreen, setIsEditorFullscreen] = useState(false);
  const [liveSavedToast, setLiveSavedToast] = useState(false);

  const handleAddItineraryStep = () => {
    setEditItinerary(prev => [
      ...prev,
      { step: `Día ${prev.length + 1}`, title: 'Nueva Parada o Actividad', desc: 'Descripción de la actividad programada...' }
    ]);
  };

  const handleUpdateItinerary = (index: number, field: keyof ItineraryItem, value: string) => {
    setEditItinerary(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const handleRemoveItinerary = (index: number) => {
    setEditItinerary(prev => prev.filter((_, i) => i !== index));
  };

  const handleMoveItinerary = (index: number, direction: 'up' | 'down') => {
    setEditItinerary(prev => {
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  const handleDuplicateItinerary = (index: number) => {
    setEditItinerary(prev => {
      const item = prev[index];
      if (!item) return prev;
      const copy = [...prev];
      copy.splice(index + 1, 0, {
        step: `${item.step} (Ext)`,
        title: `${item.title} (Continuación)`,
        desc: item.desc
      });
      return copy;
    });
  };

  const handleLoadItineraryPreset = (presetKey: 'machupicchu' | 'humantay' | 'valle') => {
    if (presetKey === 'machupicchu') {
      setEditItinerary([
        { step: '04:30 AM', title: 'Recojo en Hotel & Traslado a Estación de Ollantaytambo', desc: 'Salida en transporte turístico privado climatizado hacia el Valle Sagrado para abordar el tren panorámico.' },
        { step: '07:45 AM', title: 'Viaje en Tren Panorámico hacia Aguas Calientes', desc: 'Recorrido escénico contemplando el cañón del río Vilcanota y la transición de los Andes a la selva alta.' },
        { step: '10:00 AM', title: 'Ascenso en Bus & Tour Guiado en la Ciudadela Inka', desc: 'Recorrido guiado de 2.5 horas con Guía Oficial Colegiado por templos, plazas ceremoniales y miradores icónicos.' },
        { step: '02:00 PM', title: 'Almuerzo Buffet en Aguas Calientes & Retorno a Cusco', desc: 'Tiempo libre para deleitarse con gastronomía andina local y retorno en tren al punto de partida.' }
      ]);
    } else if (presetKey === 'humantay') {
      setEditItinerary([
        { step: '04:00 AM', title: 'Recojo en Cusco & Desayuno Tradicional en Mollepata', desc: 'Encuentro temprano en tu alojamiento y traslado hacia Mollepata para degustar un desayuno andino nutritivo.' },
        { step: '08:00 AM', title: 'Inicio del Trekking desde Soraypampa (3,900 msnm)', desc: 'Caminata escénica gradual de 1.5 a 2 horas frente a los imponentes glaciares Salkantay y Humantay.' },
        { step: '10:30 AM', title: 'Llegada a la Laguna Humantay & Pago a la Pachamama', desc: 'Descanso ante el espejo turquesa sagrado (4,200 msnm) con tiempo para fotografías y ceremonia con hojas de coca.' },
        { step: '01:30 PM', title: 'Descenso a Soraypampa, Almuerzo Buffet & Regreso', desc: 'Retorno al campamento para un almuerzo buffet reconfortante antes del viaje de retorno a la ciudad del Cusco.' }
      ]);
    } else {
      setEditItinerary([
        { step: '07:30 AM', title: 'Mirador de Taray & Centro Textil de Pisac', desc: 'Primera parada panorámica del Valle Sagrado de los Inkas con visita al mercado artesanal y andenería monumental.' },
        { step: '11:00 AM', title: 'Salineras de Maras & Laboratorio Inka de Moray', desc: 'Exploración de las 3,000 pozas naturales de sal y de los andenes circulares de experimentación agrícola.' },
        { step: '01:00 PM', title: 'Almuerzo Buffet Gourmet en Urubamba', desc: 'Degustación de lo mejor de la cocina novoandina e internacional elaborada con insumos orgánicos del valle.' },
        { step: '03:30 PM', title: 'Fortaleza Viva de Ollantaytambo & Chinchero', desc: 'Ascenso al Templo del Sol y recorrido por las calles originales inkaicas antes de culminar en Chinchero.' }
      ]);
    }
  };

  const handleAddFaq = () => {
    setEditFaqs(prev => {
      const current = Array.isArray(prev) ? prev : [];
      return [
        ...current,
        { 
          q: `¿Pregunta Frecuente #${current.length + 1}?`, 
          a: '' 
        }
      ];
    });
  };

  const handleUpdateFaq = (index: number, field: keyof FAQItem, value: string) => {
    setEditFaqs(prev => (Array.isArray(prev) ? prev : []).map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const handleRemoveFaq = (index: number) => {
    setEditFaqs(prev => (Array.isArray(prev) ? prev : []).filter((_, i) => i !== index));
  };

  const handleMoveFaq = (index: number, direction: 'up' | 'down') => {
    setEditFaqs(prev => {
      const current = Array.isArray(prev) ? [...prev] : [];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= current.length) return prev;
      const temp = current[index];
      current[index] = current[targetIndex];
      current[targetIndex] = temp;
      return current;
    });
  };

  const handleDuplicateFaq = (index: number) => {
    setEditFaqs(prev => {
      const current = Array.isArray(prev) ? [...prev] : [];
      const item = current[index];
      if (!item) return prev;
      current.splice(index + 1, 0, {
        q: `${item.q} (Copia)`,
        a: item.a
      });
      return current;
    });
  };

  const handleLoadFaqsPreset = () => {
    setEditFaqs([
      { q: '¿Cómo prepararme para la altitud en Cusco?', a: 'Recomendamos llegar a Cusco al menos 24 a 48 horas antes de caminatas exigentes, mantenerse bien hidratado con mate de coca o muña y descansar adecuadamente las primeras horas.' },
      { q: '¿Qué documentos son indispensables para los ingresos?', a: 'Es obligatorio portar tu Pasaporte original o DNI físico vigente en todo momento. No se aceptan fotocopias ni fotografías en el celular para el control del boleto oficial.' },
      { q: '¿Cuál es la política si se presentan lluvias o mal tiempo?', a: 'Las excursiones operan regularmente todo el año; suministramos ponchos impermeables. En situaciones climáticas extremas reprogramamos las salidas con total respaldo de seguridad.' },
      { q: '¿Qué facilidades de pago ofrecen para confirmar la reserva?', a: 'Aceptamos transferencias bancarias directas, tarjetas Visa/Mastercard internacionales y pagos inmediatos a través de pasarela protegida por WhatsApp.' }
    ]);
  };

  const handleAddTestimonial = () => {
    setEditTestimonials(prev => {
      const current = Array.isArray(prev) ? prev : [];
      return [
        ...current,
        { name: 'Nuevo Viajero', origin: 'Madrid, España', comment: '¡Excelente tour y servicio excepcional!', rating: 5 }
      ];
    });
  };

  const handleUpdateTestimonial = (index: number, field: keyof TestimonialItem, value: any) => {
    setEditTestimonials(prev => (Array.isArray(prev) ? prev : []).map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const handleRemoveTestimonial = (index: number) => {
    setEditTestimonials(prev => (Array.isArray(prev) ? prev : []).filter((_, i) => i !== index));
  };

  const handleLoadTestimonialsPreset = () => {
    setEditTestimonials([
      { name: 'Sofia & Mateo', origin: 'Buenos Aires, Argentina', comment: '¡La mejor experiencia de nuestro viaje! La puntualidad fue impecable, el guía nos explicó cada detalle histórico con pasión y el almuerzo estuvo exquisito.', rating: 5 },
      { name: 'David Miller', origin: 'California, USA', comment: 'Outstanding service and organization! Seamless communication on WhatsApp, comfortable private transport and top-tier professionalism throughout.', rating: 5 },
      { name: 'Julie & Thomas', origin: 'Lyon, Francia', comment: 'Voyage inoubliable ! Le paysage est tout simplement magique et l’attention portée à notre confort a été exemplaire du début à la fin. 100% recommandé !', rating: 5 }
    ]);
  };

  const handleLoadInclusionsPreset = () => {
    setEditFeaturesItems(
      'Transporte turístico privado con aire acondicionado y SOAT vigente\n' +
      'Guía Oficial de Turismo colegiado y bilingüe (Español / Inglés)\n' +
      'Desayuno andino nutritivo y almuerzo buffet gourmet con opción vegetariana\n' +
      'Tickets de ingreso oficiales y autorizados a todos los circuitos\n' +
      'Botiquín de primeros auxilios y balón de oxígeno medicinal portátil\n' +
      'Bastones de senderismo profesionales y ponchos impermeables para lluvia'
    );
  };

  const handleLoadBackpackPreset = () => {
    setEditWhatToBring(
      'Pasaporte original o documento de identidad físico vigente\n' +
      'Mochila ligera y cómoda (máximo 20 a 25 litros)\n' +
      'Ropa abrigadora en capas (casaca polar, cortavientos y guantes ligeros)\n' +
      'Zapatos o zapatillas de trekking con buen agarre\n' +
      'Bloqueador solar (FPS 50+), gafas de sol UV400 y gorro o sombrero\n' +
      'Botella de agua recargable y snacks energéticos (frutos secos, chocolates)'
    );
  };

  const handleAppendGalleryImage = (imageUrl: string) => {
    setEditGalleryImages(prev => {
      const list = prev.split('\n').map(s => s.trim()).filter(Boolean);
      if (list.includes(imageUrl)) return prev;
      return [...list, imageUrl].join('\n');
    });
  };

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

    setEditAboutTitle(landing.about?.title || '');
    setEditAboutContent(landing.about?.content || '');

    setEditPrice(landing.price || '');
    setEditDuration(landing.duration || '');
    setEditDifficulty(landing.difficulty || '');
    setEditDestination(landing.destination || '');
    setEditAltitude(landing.altitude || '');
    setEditGroupType(landing.groupType || '');
    setEditTargetAudience(landing.targetAudience || '');

    setEditWhatsapp(landing.whatsapp || '');
    setEditGuideName(landing.guideName || '');
    setEditGuideCert(landing.guideCert || '');
    setEditGuideLanguages(landing.guideLanguages || '');
    setEditGuideAvatar(landing.guideAvatar || '');

    setEditFeaturesTitle(landing.features?.title || '');
    setEditFeaturesItems(landing.features?.items?.join('\n') || '');

    setEditNotIncluded(landing.notIncluded?.join('\n') || '');
    setEditWhatToBring(landing.whatToBring?.join('\n') || '');
    setEditTrustBadges(landing.trustBadges?.join('\n') || '');

    setEditItinerary(landing.itinerary || []);
    setEditFaqs(landing.faqs || []);
    setEditTestimonials(landing.testimonials || []);

    setEditGalleryImages(landing.galleryImages?.join('\n') || '');
    setEditOfficeAddress(landing.officeAddress || '');
    setEditOfficeHours(landing.officeHours || '');
    setEditMapsUrl(landing.mapsUrl || '');

    setCatalogTours(landing.catalogTours || []);

    setActiveEditorTab('general');
    setIsEditorOpen(true);
  };

  const buildUpdatedLandingData = (): LandingData => {
    if (!landing) throw new Error('No landing selected');
    const isFreeOrBasic = editTier === 'free' || editTier === 'basic';
    return {
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
      targetAudience: editTargetAudience,
      whatsapp: editWhatsapp,
      guideName: editGuideName,
      guideCert: editGuideCert,
      guideLanguages: editGuideLanguages,
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
      itinerary: editItinerary,
      faqs: editFaqs,
      testimonials: editTestimonials,
      galleryImages: editGalleryImages.split('\n').map(s => s.trim()).filter(Boolean),
      catalogTours: catalogTours.length > 0 ? catalogTours : landing.catalogTours,
      officeAddress: editOfficeAddress,
      officeHours: editOfficeHours,
      mapsUrl: editMapsUrl
    };
  };

  const handleApplyLive = () => {
    if (!landing) return;
    const updated = buildUpdatedLandingData();
    setLanding(updated);
    saveLandingToStorage(updated);
    setRefreshKey(k => k + 1);
    setLiveSavedToast(true);
    setTimeout(() => setLiveSavedToast(false), 2400);
  };

  const handleSaveEdits = (e: React.FormEvent) => {
    e.preventDefault();
    if (!landing) return;
    const updated = buildUpdatedLandingData();
    setLanding(updated);
    saveLandingToStorage(updated);
    setIsEditorOpen(false);
    setRefreshKey(k => k + 1);
  };

  // Atajos de teclado: Ctrl+S para guardar en vivo y Escape para cerrar
  useEffect(() => {
    if (!isEditorOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleApplyLive();
      }
      if (e.key === 'Escape') {
        setIsEditorOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isEditorOpen, editName, editTemplate, editTier, editObjective, editLanguage,
    editHeroBadge, editHeroTitle, editHeroSubtitle, editHeroCta, editHeroImage,
    editAboutTitle, editAboutContent, editPrice, editDuration, editDifficulty,
    editDestination, editAltitude, editGroupType, editTargetAudience, editWhatsapp,
    editGuideName, editGuideCert, editGuideLanguages, editGuideAvatar,
    editFeaturesTitle, editFeaturesItems, editNotIncluded, editWhatToBring,
    editTrustBadges, editItinerary, editFaqs, editTestimonials, editGalleryImages,
    catalogTours, editOfficeAddress, editOfficeHours, editMapsUrl, landing
  ]);

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

      {/* Modal Integral del Editor Centrado en el Medio */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in overflow-y-auto">
          {/* Fondo interactivo para cerrar al hacer clic afuera */}
          <div 
            className="fixed inset-0"
            onClick={() => setIsEditorOpen(false)}
          />

          {/* Tarjeta del Modal Centrada y Agrandada con soporte de Pantalla Completa */}
          <div className={`relative w-full ${isEditorFullscreen ? 'max-w-[98vw] h-[96vh] max-h-[96vh]' : 'max-w-6xl max-h-[95vh] h-[92vh]'} bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-200 transition-all`}>
            
            {/* Header del Modal */}
            <div className="p-3.5 sm:p-5 border-b border-slate-200 flex justify-between items-center bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0">
                  <Edit3 size={20} className="sm:size-[22px]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-extrabold text-white text-sm sm:text-lg tracking-tight">
                      Editor Integral de Landing Page
                    </h3>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      En Vivo
                    </span>
                    <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-slate-400 font-mono bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/60">
                      <span>Ctrl + S para guardar</span>
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                    Modifica textos, descripción narrativa, logística, itinerario paso a paso, FAQs y catálogo multitour
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={handleApplyLive}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-400/30 text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
                  title="Guardar y actualizar landing sin cerrar (Ctrl + S)"
                >
                  <Eye size={14} className="text-blue-300" />
                  <span>Aplicar en Vivo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditorFullscreen(prev => !prev)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                  title={isEditorFullscreen ? "Reducir tamaño modal" : "Pantalla completa"}
                >
                  {isEditorFullscreen ? <Minimize2 size={19} /> : <Maximize2 size={19} />}
                </button>
                <button 
                  onClick={() => setIsEditorOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                  title="Cerrar editor (Escape)"
                >
                  <X size={21} />
                </button>
              </div>
            </div>

            {/* Barra de Pestañas: Todas las 8 Pestañas Visibles al 100% con Contadores */}
            <div className="p-2 sm:p-3 bg-slate-100/95 border-b border-slate-200 shrink-0">
              <div className="grid grid-cols-2 xs:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-2">
                {[
                  { id: 'general', num: '1', label: 'General', sub: 'Diseño & Plan', icon: Sliders, badge: null },
                  { id: 'hero', num: '2', label: 'Hero', sub: 'Portada & CTA', icon: ImageIcon, badge: null },
                  { id: 'description', num: '3', label: 'Descripción', sub: 'Narrativa 100%', icon: FileText, badge: null },
                  { id: 'logistics', num: '4', label: 'Logística', sub: 'Guía & Precios', icon: Compass, badge: null },
                  { 
                    id: 'content', 
                    num: '5', 
                    label: 'Inclusiones', 
                    sub: `${editFeaturesItems ? editFeaturesItems.split('\n').filter(Boolean).length : 0} items`, 
                    icon: PackageCheck, 
                    badge: editFeaturesItems ? `${editFeaturesItems.split('\n').filter(Boolean).length}` : '0' 
                  },
                  { 
                    id: 'itinerary', 
                    num: '6', 
                    label: 'Itinerario', 
                    sub: `${editItinerary.length} paradas`, 
                    icon: Calendar, 
                    badge: `${editItinerary.length}` 
                  },
                  { 
                    id: 'faqs', 
                    num: '7', 
                    label: 'FAQs', 
                    sub: `${editFaqs.length} FAQs`, 
                    icon: HelpCircle, 
                    badge: `${editFaqs.length}` 
                  },
                  { id: 'gallery_office', num: '8', label: 'Galería', sub: '& Oficina', icon: MapPin, badge: null },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeEditorTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveEditorTab(tab.id as typeof activeEditorTab)}
                      className={`flex flex-col items-center justify-center p-2 sm:py-2.5 rounded-2xl text-center transition-all cursor-pointer border relative ${
                        isActive 
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 border-blue-600 font-black scale-102 ring-2 ring-blue-500/20' 
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90 hover:border-slate-300 font-bold'
                      }`}
                      title={`${tab.num}. ${tab.label} (${tab.sub})`}
                    >
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Icon size={14} className={isActive ? 'text-white' : 'text-blue-600'} />
                        <span className="text-[11px] sm:text-xs font-black">{tab.num}. {tab.label}</span>
                      </div>
                      <span className={`text-[9px] sm:text-[10px] leading-tight block truncate max-w-full px-1 ${isActive ? 'text-blue-100 font-medium' : 'text-slate-400 font-normal'}`}>
                        {tab.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contenido del Formulario */}
            <form onSubmit={handleSaveEdits} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* PESTAÑA 1: GENERAL & DISEÑO */}
              {activeEditorTab === 'general' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 text-xs text-blue-900 flex items-start gap-3">
                    <Sparkles size={17} className="text-blue-600 shrink-0 mt-0.5" />
                    <span>Configura la identidad base del tour, la plantilla gráfica seleccionada, nivel de plan y objetivo comercial.</span>
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
                      placeholder="Ej. Salkantay Trek 5 Días a Machu Picchu"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Layers size={14} className="text-blue-600" /> Plantilla Visual (6 Diseños)
                      </label>
                      <select
                        value={editTemplate}
                        onChange={(e) => setEditTemplate(e.target.value as TemplateType)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm bg-white font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="emerald-explorer">🌲 Diseño 6 — Emerald Explorer (NavikX Style)</option>
                        <option value="agency-portal">🔥 Diseño 1 (Portal Oficial de Agencia)</option>
                        <option value="adventure">Trek & Aventura (Trekking y Alta Montaña)</option>
                        <option value="premium">Premium Luxury (Colección Exclusiva VIP)</option>
                        <option value="cultural">Patrimonio Cultural (Historia e Incas)</option>
                        <option value="boho-nature">Boho Journal (Pinterest & Polaroids)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-emerald-600" /> Nivel / Plan Técnico
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

              {/* PESTAÑA 2: HERO & PORTADA */}
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
                      Subtítulo Persuasivo de Portada
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
                      <span className="text-[10px] text-slate-400 font-normal">Unsplash / Enlace directo</span>
                    </label>
                    <input
                      type="url"
                      value={editHeroImage}
                      onChange={(e) => setEditHeroImage(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="https://images.unsplash.com/..."
                    />

                    {/* Selector de fotos rápidas */}
                    <div className="mt-2.5 space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-500">Seleccionar foto rápida prediseñada:</span>
                      <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        {SAMPLE_TOUR_IMAGES.map((img) => (
                          <button
                            key={img.id}
                            type="button"
                            onClick={() => setEditHeroImage(img.url)}
                            className={`relative w-16 h-12 rounded-xl overflow-hidden border shrink-0 transition-transform hover:scale-105 cursor-pointer ${
                              editHeroImage === img.url ? 'ring-2 ring-blue-600 border-blue-600' : 'border-slate-200'
                            }`}
                            title={img.title}
                          >
                            <Image src={img.url} alt={img.title} fill className="object-cover" unoptimized />
                          </button>
                        ))}
                      </div>
                    </div>

                    {editHeroImage && (
                      <div className="mt-2.5 relative h-32 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                        <img src={editHeroImage} alt="Hero preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PESTAÑA 3: DESCRIPCIÓN & NARRATIVA (MEJORA SOLICITADA) */}
              {activeEditorTab === 'description' && (
                <div className="space-y-4 animate-in fade-in">
                  
                  {/* Banner de confirmación visual */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-950 flex items-start gap-3 shadow-xs">
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-emerald-900 text-sm">Visibilidad Garantizada en las 5 Plantillas</p>
                      <p className="text-emerald-800 leading-relaxed">
                        Esta descripción narrativa se muestra de manera destacada en la sección del tour en los 5 diseños (Portal de Agencia, Trek & Aventura, Luxury, Cultural y Boho Journal). Escribe aquí la propuesta de valor y los detalles cautivadores de la ruta.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Título de Sección "Acerca del Tour / Visión de la Ruta"
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
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Descripción Narrativa Completa del Tour
                      </label>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {editAboutContent.length} caracteres
                      </span>
                    </div>
                    <textarea
                      rows={6}
                      value={editAboutContent}
                      onChange={(e) => setEditAboutContent(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed text-slate-800"
                      placeholder="Evita las largas colas y el estrés del turismo masivo. Nuestro servicio VIP te brinda acceso preferente, almuerzo gourmet en Belmond Sanctuary Lodge y asesoría personalizada de puerta a puerta..."
                    />
                    <p className="text-[11px] text-slate-500 mt-1.5">
                      Consejo: Describe las sensaciones, paisajes, exclusividad del servicio y la tranquilidad que experimentará el turista.
                    </p>
                  </div>
                </div>
              )}

              {/* PESTAÑA 4: GUÍA & LOGÍSTICA */}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Destino / Región
                      </label>
                      <input
                        type="text"
                        value={editDestination}
                        onChange={(e) => setEditDestination(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Ej. Machu Picchu, Aguas Calientes, Cusco"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Público Objetivo Recomendado
                      </label>
                      <input
                        type="text"
                        value={editTargetAudience}
                        onChange={(e) => setEditTargetAudience(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Ej. Familias, Parejas y Aventureros"
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-200/80 pt-4 space-y-3">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Guía Oficial Colegiado & WhatsApp</span>
                    
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

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                          N° Carnet DIRCETUR
                        </label>
                        <input
                          type="text"
                          value={editGuideCert}
                          onChange={(e) => setEditGuideCert(e.target.value)}
                          className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                          placeholder="DIRCETUR N° 4589-C"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Idiomas del Guía
                        </label>
                        <input
                          type="text"
                          value={editGuideLanguages}
                          onChange={(e) => setEditGuideLanguages(e.target.value)}
                          className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Español, English, Quechua"
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

              {/* PESTAÑA 5: INCLUYE, MOCHILA & SELLOS */}
              {activeEditorTab === 'content' && (
                <div className="space-y-4 animate-in fade-in">
                  
                  {/* Presets de Inclusiones y Mochila */}
                  <div className="p-3 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-2xl flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-emerald-600 shrink-0" />
                      <span className="text-xs font-bold text-slate-800">Carga Rápida de Inclusiones:</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleLoadInclusionsPreset}
                        className="px-2.5 py-1 bg-white hover:bg-emerald-600 hover:text-white border border-emerald-200 text-emerald-800 rounded-lg text-[11px] font-bold transition-all shadow-xs cursor-pointer"
                      >
                        ⚡ Inclusiones Todo Incluido
                      </button>
                      <button
                        type="button"
                        onClick={handleLoadBackpackPreset}
                        className="px-2.5 py-1 bg-white hover:bg-emerald-600 hover:text-white border border-emerald-200 text-emerald-800 rounded-lg text-[11px] font-bold transition-all shadow-xs cursor-pointer"
                      >
                        ⚡ Mochila Sugerida
                      </button>
                    </div>
                  </div>

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
                      rows={6}
                      value={editFeaturesItems}
                      onChange={(e) => setEditFeaturesItems(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
                      placeholder="Vagón Panorámico Vistadome:Viaja con música en vivo y vistas 360°&#10;Guía Historiador Privado:Acompañamiento exclusivo&#10;Boletos de Ingreso:Acceso oficial garantizado"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between">
                      <span>Qué NO Incluye (1 por línea)</span>
                      <span className="text-[10px] text-slate-400 font-normal">Exclusiones claras</span>
                    </label>
                    <textarea
                      rows={3}
                      value={editNotIncluded}
                      onChange={(e) => setEditNotIncluded(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
                      placeholder="Vuelos internacionales o domésticos&#10;Propinas voluntarias para guía y chofer&#10;Seguro médico de viaje"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between">
                      <span>Qué Llevar / Mochila del Viajero (1 por línea)</span>
                      <span className="text-[10px] text-slate-400 font-normal">Recomendaciones</span>
                    </label>
                    <textarea
                      rows={3}
                      value={editWhatToBring}
                      onChange={(e) => setEditWhatToBring(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
                      placeholder="Pasaporte original físico vigente&#10;Ropa abrigadora en capas y cortavientos&#10;Calzado de trekking con buen agarre&#10;Bloqueador solar y repelente"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between">
                      <span>Sellos de Confianza & Certificaciones (1 por línea)</span>
                      <span className="text-[10px] text-slate-400 font-normal">Garantías oficiales</span>
                    </label>
                    <textarea
                      rows={2}
                      value={editTrustBadges}
                      onChange={(e) => setEditTrustBadges(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
                      placeholder="Licencia Oficial DIRCETUR Cusco&#10;Sello Safe Travels Internacional&#10;RUC 20 Formal Verificado"
                    />
                  </div>
                </div>
              )}

              {/* PESTAÑA 6: ITINERARIO PASO A PASO (TOTALMENTE ENRIQUECIDO) */}
              {activeEditorTab === 'itinerary' && (
                <div className="space-y-4 animate-in fade-in">
                  
                  {/* Barra de Presets Rápidos de Itinerario */}
                  <div className="p-3 bg-gradient-to-r from-blue-50/90 via-indigo-50/90 to-blue-50/90 border border-blue-200/90 rounded-2xl flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-blue-600 shrink-0" />
                      <span className="text-xs font-bold text-slate-800">Cargar Cronograma Sugerido:</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleLoadItineraryPreset('machupicchu')}
                        className="px-2.5 py-1 bg-white hover:bg-blue-600 hover:text-white border border-blue-200 text-blue-700 rounded-lg text-[11px] font-bold transition-all shadow-xs cursor-pointer"
                      >
                        🚂 Machu Picchu 1 Día
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLoadItineraryPreset('humantay')}
                        className="px-2.5 py-1 bg-white hover:bg-blue-600 hover:text-white border border-blue-200 text-blue-700 rounded-lg text-[11px] font-bold transition-all shadow-xs cursor-pointer"
                      >
                        🏔️ Laguna Humantay Trek
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLoadItineraryPreset('valle')}
                        className="px-2.5 py-1 bg-white hover:bg-blue-600 hover:text-white border border-blue-200 text-blue-700 rounded-lg text-[11px] font-bold transition-all shadow-xs cursor-pointer"
                      >
                        🏺 Valle Sagrado VIP
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Paradas y Días del Itinerario ({editItinerary.length})
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Reordena con las flechas ▲▼ o duplica paradas para armar el recorrido perfecto.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddItineraryStep}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer shadow-xs active:scale-95"
                    >
                      <Plus size={14} />
                      <span>Añadir Parada o Día</span>
                    </button>
                  </div>

                  {editItinerary.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-2xl p-6">
                      <Calendar size={28} className="mx-auto text-slate-300 mb-2" />
                      <p className="text-xs font-bold text-slate-700">No hay paradas en el itinerario</p>
                      <p className="text-[11px] text-slate-400 mb-3">Añade los días o momentos clave del recorrido.</p>
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleLoadItineraryPreset('machupicchu')}
                          className="px-3.5 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 cursor-pointer"
                        >
                          Cargar Machu Picchu
                        </button>
                        <button
                          type="button"
                          onClick={handleAddItineraryStep}
                          className="px-3.5 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 cursor-pointer"
                        >
                          Crear en Blanco
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {editItinerary.map((item, idx) => (
                        <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors space-y-3 shadow-2xs">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-md border border-blue-200">
                                Paso #{idx + 1}
                              </span>
                              <div className="flex items-center gap-0.5 bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
                                <button
                                  type="button"
                                  onClick={() => handleMoveItinerary(idx, 'up')}
                                  disabled={idx === 0}
                                  className={`p-1 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors ${idx === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                                  title="Subir parada"
                                >
                                  <ChevronUp size={13} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleMoveItinerary(idx, 'down')}
                                  disabled={idx === editItinerary.length - 1}
                                  className={`p-1 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors ${idx === editItinerary.length - 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                                  title="Bajar parada"
                                >
                                  <ChevronDown size={13} />
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleDuplicateItinerary(idx)}
                                className="text-slate-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                                title="Duplicar este paso"
                              >
                                <Copy size={13} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveItinerary(idx)}
                                className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                                title="Eliminar este paso"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                                Etiqueta / Momento
                              </label>
                              <input
                                type="text"
                                value={item.step}
                                onChange={(e) => handleUpdateItinerary(idx, 'step', e.target.value)}
                                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Día 1 / 05:00 AM"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                                Título de la Parada
                              </label>
                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) => handleUpdateItinerary(idx, 'title', e.target.value)}
                                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Salida desde Cusco y Desayuno Andino"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                              Descripción Detallada
                            </label>
                            <textarea
                              rows={2}
                              value={item.desc}
                              onChange={(e) => handleUpdateItinerary(idx, 'desc', e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
                              placeholder="Recojo en hotel y traslado en transporte privado climatizado..."
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* PESTAÑA 7: FAQS & RESEÑAS (NUEVA MEJORA) */}
              {activeEditorTab === 'faqs' && (
                <div className="space-y-6 animate-in fade-in">
                  
                  {/* Presets de FAQs y Reseñas */}
                  <div className="p-3 bg-gradient-to-r from-purple-50/90 via-indigo-50/90 to-purple-50/90 border border-purple-200/90 rounded-2xl flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-purple-600 shrink-0" />
                      <span className="text-xs font-bold text-slate-800">Carga Rápida de FAQs & Reseñas:</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleLoadFaqsPreset}
                        className="px-2.5 py-1 bg-white hover:bg-purple-600 hover:text-white border border-purple-200 text-purple-800 rounded-lg text-[11px] font-bold transition-all shadow-xs cursor-pointer"
                      >
                        ⚡ 4 FAQs Reales de Cusco
                      </button>
                      <button
                        type="button"
                        onClick={handleLoadTestimonialsPreset}
                        className="px-2.5 py-1 bg-white hover:bg-purple-600 hover:text-white border border-purple-200 text-purple-800 rounded-lg text-[11px] font-bold transition-all shadow-xs cursor-pointer"
                      >
                        ⚡ 3 Reseñas 5 Estrellas
                      </button>
                    </div>
                  </div>

                  {/* Aviso de Visibilidad de Nivel */}
                  {editTier !== 'advance' && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-amber-900">
                      <div className="flex items-center gap-2">
                        <AlertCircle size={16} className="text-amber-600 shrink-0" />
                        <span>
                          Tu landing está actualmente en nivel <strong>{editTier.toUpperCase()}</strong>. Los acordeones de FAQs se muestran en la web en el nivel <strong>Advance</strong>.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditTier('advance')}
                        className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-[11px] shrink-0 transition-colors cursor-pointer self-start sm:self-auto"
                      >
                        ⚡ Cambiar a Advance
                      </button>
                    </div>
                  )}

                  {/* SECCIÓN PREGUNTAS FRECUENTES */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                          Preguntas Frecuentes (FAQs) ({editFaqs.length})
                        </h4>
                        <p className="text-[11px] text-slate-500">Resuelve dudas antes de reservar</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddFaq}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer shadow-xs active:scale-95"
                      >
                        <Plus size={14} />
                        <span>Añadir Pregunta</span>
                      </button>
                    </div>

                    {editFaqs.length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50/50">
                        <HelpCircle size={28} className="mx-auto text-slate-300 mb-2" />
                        <p className="text-xs font-bold text-slate-700">No hay preguntas registradas</p>
                        <p className="text-[11px] text-slate-400 mb-3">Añade preguntas frecuentes o carga los presets sugeridos.</p>
                        <div className="flex justify-center gap-2">
                          <button
                            type="button"
                            onClick={handleLoadFaqsPreset}
                            className="px-3.5 py-1.5 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 cursor-pointer"
                          >
                            ⚡ Cargar 4 FAQs Reales
                          </button>
                          <button
                            type="button"
                            onClick={handleAddFaq}
                            className="px-3.5 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 cursor-pointer"
                          >
                            + Añadir Primera Pregunta
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {editFaqs.map((faq, idx) => (
                          <div key={idx} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors space-y-2.5 shadow-2xs">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-md border border-purple-200">
                                  FAQ #{idx + 1}
                                </span>
                                <div className="flex items-center gap-0.5 bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
                                  <button
                                    type="button"
                                    onClick={() => handleMoveFaq(idx, 'up')}
                                    disabled={idx === 0}
                                    className={`p-1 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors ${idx === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                                    title="Subir pregunta"
                                  >
                                    <ChevronUp size={13} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleMoveFaq(idx, 'down')}
                                    disabled={idx === editFaqs.length - 1}
                                    className={`p-1 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors ${idx === editFaqs.length - 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                                    title="Bajar pregunta"
                                  >
                                    <ChevronDown size={13} />
                                  </button>
                                </div>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleDuplicateFaq(idx)}
                                  className="text-slate-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                                  title="Duplicar pregunta"
                                >
                                  <Copy size={13} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFaq(idx)}
                                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                                  title="Eliminar pregunta"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                                Pregunta
                              </label>
                              <input
                                type="text"
                                value={faq.q}
                                onChange={(e) => handleUpdateFaq(idx, 'q', e.target.value)}
                                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Ej. ¿Qué incluye el boleto o recojo?"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                                Respuesta Detallada
                              </label>
                              <textarea
                                rows={2}
                                value={faq.a}
                                onChange={(e) => handleUpdateFaq(idx, 'a', e.target.value)}
                                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
                                placeholder="Escribe aquí la respuesta oficial y clara para los turistas..."
                              />
                            </div>
                          </div>
                        ))}

                        {/* Botón al pie de la lista de preguntas para añadir con 1 clic */}
                        <div className="pt-1 text-center">
                          <button
                            type="button"
                            onClick={handleAddFaq}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all cursor-pointer shadow-2xs active:scale-95"
                          >
                            <Plus size={14} />
                            <span>+ Añadir Otra Pregunta</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* SECCIÓN TESTIMONIOS & RESEÑAS */}
                  <div className="border-t border-slate-200 pt-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                          Reseñas y Testimonios de Turistas ({editTestimonials.length})
                        </h4>
                        <p className="text-[11px] text-slate-500">Prueba social y recomendaciones verificadas</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddTestimonial}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
                      >
                        <Plus size={14} />
                        <span>Añadir Reseña</span>
                      </button>
                    </div>

                    {editTestimonials.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No hay reseñas registradas.</p>
                    ) : (
                      <div className="space-y-3">
                        {editTestimonials.map((tItem, idx) => (
                          <div key={idx} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                                <input
                                  type="text"
                                  value={tItem.name}
                                  onChange={(e) => handleUpdateTestimonial(idx, 'name', e.target.value)}
                                  className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                                  placeholder="Nombre del Viajero"
                                />
                                <input
                                  type="text"
                                  value={tItem.origin}
                                  onChange={(e) => handleUpdateTestimonial(idx, 'origin', e.target.value)}
                                  className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                                  placeholder="Ciudad, País"
                                />
                                <select
                                  value={tItem.rating}
                                  onChange={(e) => handleUpdateTestimonial(idx, 'rating', Number(e.target.value))}
                                  className="bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-amber-600 focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                  <option value={5}>⭐⭐⭐⭐⭐ (5 Estrellas)</option>
                                  <option value={4}>⭐⭐⭐⭐ (4 Estrellas)</option>
                                  <option value={3}>⭐⭐⭐ (3 Estrellas)</option>
                                </select>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveTestimonial(idx)}
                                className="text-slate-400 hover:text-rose-600 p-1 rounded-lg shrink-0 cursor-pointer transition-colors"
                                title="Eliminar reseña"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <textarea
                              rows={2}
                              value={tItem.comment}
                              onChange={(e) => handleUpdateTestimonial(idx, 'comment', e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
                              placeholder="Comentario sobre la experiencia vivida..."
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* PESTAÑA 8: GALERÍA, OFICINA & CATÁLOGO */}
              {activeEditorTab === 'gallery_office' && (
                <div className="space-y-5 animate-in fade-in">
                  
                  {/* ACCESO RÁPIDO AL CATÁLOGO MULTITOUR DE 6 TOURS */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                        <Layers size={20} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-950">
                          Catálogo Multitour (6 Tours de Vitrina)
                        </h4>
                        <p className="text-[11px] text-blue-700">
                          Personaliza las 6 tarjetas de tours secundarios que acompañan a esta landing.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCatalogModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer shadow-md shadow-blue-600/20 shrink-0"
                    >
                      <Edit3 size={13} />
                      <span>Abrir Editor de los 6 Tours</span>
                    </button>
                  </div>

                  {/* BANCO DE FOTOS HD DE CUSCO PARA LA GALERÍA */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Banco de Fotos HD de Cusco (1 Clic para Agregar)
                      </label>
                      <span className="text-[10px] text-slate-400">Imágenes optimizadas</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { title: 'Machu Picchu', url: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200&auto=format&fit=crop' },
                        { title: 'Laguna Humantay', url: 'https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?q=80&w=1200&auto=format&fit=crop' },
                        { title: 'Montaña 7 Colores', url: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=1200&auto=format&fit=crop' },
                        { title: 'Salineras de Maras', url: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1200&auto=format&fit=crop' },
                        { title: 'Valle Sagrado', url: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=1200&auto=format&fit=crop' },
                        { title: 'Cusco Histórico', url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=1200&auto=format&fit=crop' },
                      ].map((photo, pIdx) => {
                        const isAlreadyAdded = editGalleryImages.includes(photo.url);
                        return (
                          <div 
                            key={pIdx} 
                            className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs gap-2"
                          >
                            <span className="font-semibold text-slate-700 truncate text-[11px]">{photo.title}</span>
                            <button
                              type="button"
                              onClick={() => handleAppendGalleryImage(photo.url)}
                              disabled={isAlreadyAdded}
                              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold shrink-0 transition-all ${
                                isAlreadyAdded 
                                  ? 'bg-emerald-100 text-emerald-700 cursor-default' 
                                  : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                              }`}
                            >
                              {isAlreadyAdded ? '✓ Agregada' : '+ Agregar'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* FOTOS DE GALERÍA (TEXTAREA) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between">
                      <span>URLs de Fotos de Galería (1 por línea)</span>
                      <span className="text-[10px] text-slate-400 font-normal">Fotos secundarias</span>
                    </label>
                    <textarea
                      rows={4}
                      value={editGalleryImages}
                      onChange={(e) => setEditGalleryImages(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
                      placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/..."
                    />
                  </div>

                  <div className="border-t border-slate-200 pt-4 space-y-3">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Oficina Física & Ubicación</span>
                    
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Dirección Física de Oficina
                      </label>
                      <input
                        type="text"
                        value={editOfficeAddress}
                        onChange={(e) => setEditOfficeAddress(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Ej. Portal de Panes N° 123, Plaza de Armas, Cusco"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Horario de Atención
                        </label>
                        <input
                          type="text"
                          value={editOfficeHours}
                          onChange={(e) => setEditOfficeHours(e.target.value)}
                          className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Ej. Lun - Dom: 08:00 AM – 08:00 PM"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Enlace de Google Maps
                        </label>
                        <input
                          type="url"
                          value={editMapsUrl}
                          onChange={(e) => setEditMapsUrl(e.target.value)}
                          className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="https://maps.app.goo.gl/..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Botones de Acción al Pie del Modal con Guardado en Vivo */}
              <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white sticky bottom-0 z-20">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(false)}
                    className="px-4 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-100 text-xs sm:text-sm cursor-pointer transition-colors"
                  >
                    Cancelar
                  </button>
                  {liveSavedToast && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl animate-in fade-in duration-200">
                      <CheckCheck size={14} className="text-emerald-600" />
                      <span>¡Cambios aplicados en vivo!</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={handleApplyLive}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-blue-50 text-blue-700 border border-blue-200 hover:border-blue-300 font-bold rounded-xl text-xs sm:text-sm cursor-pointer transition-all flex items-center justify-center gap-2 active:scale-95"
                    title="Actualizar la previsualización sin cerrar el modal"
                  >
                    <Eye size={15} />
                    <span>Aplicar en Vivo</span>
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-xl text-xs sm:text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 cursor-pointer transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <CheckCheck size={16} />
                    <span>Guardar y Cerrar</span>
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL SECUNDARIO DE EDICIÓN DEL CATÁLOGO DE TOURS */}
      <CatalogToursEditorModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
        currentTours={catalogTours}
        onSave={(updated) => {
          setCatalogTours(updated);
          if (landing) {
            const updatedLanding = { ...landing, catalogTours: updated };
            setLanding(updatedLanding);
            saveLandingToStorage(updatedLanding);
            setRefreshKey(k => k + 1);
          }
        }}
        currentSignatureTourName={editName || landing.name}
      />

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
