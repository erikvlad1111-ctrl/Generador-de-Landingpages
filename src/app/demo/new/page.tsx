"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, Loader2, Compass, MessageCircle, FileText, ArrowLeft, 
  Globe, DollarSign, Clock, User, Phone, 
  Check, Zap, Eye, CheckCircle2, MapPin
} from 'lucide-react';
import { ObjectiveType, TemplateType, LanguageType } from '@/types/landing';
import { simulateAiGeneration, saveLandingToStorage } from '@/data/landingStore';
import { SAMPLE_TOUR_IMAGES } from '@/data/sampleImages';

// Quick Preset Tours for 1-click loading
const PRESET_TOURS = [
  {
    id: 'salkantay',
    label: '🏔️ Salkantay Trek 5D',
    name: 'Tour Salkantay Trek Clásico',
    guideName: 'Raúl Quispe (Guía Oficial)',
    whatsapp: '+51984112233',
    price: '$350 USD',
    duration: '5 Días / 4 Noches',
    difficulty: 'Moderada - Alta',
    objective: 'whatsapp' as ObjectiveType,
    template: 'adventure' as TemplateType,
    language: 'es' as LanguageType,
    imageIndex: 2, // Humantay
    description: 'Un trekking de alta montaña hacia Machu Picchu cruzando el nevado Salkantay a 4,630 msnm. Incluye domos transparentes, alimentación nutritiva y guía oficial en español e inglés.'
  },
  {
    id: 'machu-picchu-vip',
    label: '✨ Machu Picchu VIP',
    name: 'Machu Picchu Exclusivo en Tren Hiram Bingham',
    guideName: 'Carlos Mendoza (Guía Senior)',
    whatsapp: '+51984123456',
    price: '$890 USD',
    duration: 'Full Day Exclusivo',
    difficulty: 'Fácil (Familiar)',
    objective: 'quote' as ObjectiveType,
    template: 'premium' as TemplateType,
    language: 'en' as LanguageType,
    imageIndex: 0, // MP 1
    description: 'Experiencia de lujo hacia la maravilla del mundo. Incluye tren de alta gama con coctelería a bordo, almuerzo gourmet en Belmond Sanctuary Lodge y guiado privado.'
  },
  {
    id: 'city-tour',
    label: '🏛️ City Tour & Sacsayhuamán',
    name: 'City Tour Cusco Ancestral & 4 Ruinas',
    guideName: 'Lucía Condori (Arqueóloga)',
    whatsapp: '+51984778899',
    price: 'S/ 75 PEN',
    duration: 'Media Jornada (4h)',
    difficulty: 'Fácil (Familiar)',
    objective: 'whatsapp' as ObjectiveType,
    template: 'cultural' as TemplateType,
    language: 'es' as LanguageType,
    imageIndex: 1, // Terrazas
    description: 'Recorrido histórico por el Templo del Sol Qorikancha, la Catedral del Cusco y la imponente fortaleza ciclópea de Sacsayhuamán con guía historiador.'
  },
  {
    id: 'vinicunca',
    label: '🌈 Montaña 7 Colores',
    name: 'Expedición Vinicunca & Valle Rojo',
    guideName: 'Carlos Mendoza (Guía Aventura)',
    whatsapp: '+51984123456',
    price: 'S/ 120 PEN',
    duration: 'Full Day (14 Horas)',
    difficulty: 'Exigente / Trekking',
    objective: 'whatsapp' as ObjectiveType,
    template: 'adventure' as TemplateType,
    language: 'es' as LanguageType,
    imageIndex: 3, // Rainbow
    description: 'Conoce los colores minerales de los Andes a más de 5,000 msnm. Incluye desayuno andino, almuerzo buffet, bastones de trekking y oxímetro/oxígeno preventivo.'
  }
];

export default function NewLandingDemo() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  // Form states
  const [name, setName] = useState('Tour Salkantay Trek Clásico');
  const [guideName, setGuideName] = useState('Raúl Quispe (Guía Oficial)');
  const [whatsapp, setWhatsapp] = useState('+51984112233');
  const [price, setPrice] = useState('$350 USD');
  const [duration, setDuration] = useState('5 Días / 4 Noches');
  const [difficulty, setDifficulty] = useState('Moderada - Alta');
  const [objective, setObjective] = useState<ObjectiveType>('whatsapp');
  const [template, setTemplate] = useState<TemplateType>('adventure');
  const [language, setLanguage] = useState<LanguageType>('es');
  const [selectedHeroImage, setSelectedHeroImage] = useState<string>(SAMPLE_TOUR_IMAGES[2].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [tone, setTone] = useState<'persuasive' | 'luxury' | 'historical'>('persuasive');
  const [description, setDescription] = useState(
    'Un trekking de alta montaña hacia Machu Picchu cruzando el nevado Salkantay a 4,630 msnm. Incluye domos transparentes, alimentación nutritiva y guía oficial en español e inglés.'
  );

  const activeHeroImg = customImageUrl.trim() || selectedHeroImage;

  const steps = [
    "Analizando destino, objetivo comercial y público objetivo...",
    "Generando copywriting persuasivo con IA para el Hero y Beneficios...",
    "Optimizando imágenes fotográficas seleccionadas y estructurando JSON...",
    "Vinculando número de WhatsApp del guía y guardando proyecto..."
  ];

  const handleApplyPreset = (preset: typeof PRESET_TOURS[0]) => {
    setName(preset.name);
    setGuideName(preset.guideName);
    setWhatsapp(preset.whatsapp);
    setPrice(preset.price);
    setDuration(preset.duration);
    setDifficulty(preset.difficulty);
    setObjective(preset.objective);
    setTemplate(preset.template);
    setLanguage(preset.language);
    setSelectedHeroImage(SAMPLE_TOUR_IMAGES[preset.imageIndex].url);
    setCustomImageUrl('');
    setDescription(preset.description);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    const otherImages = SAMPLE_TOUR_IMAGES.filter(img => img.url !== activeHeroImg).map(img => img.url);
    const galleryImages = otherImages.slice(0, 2);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setLoadingStep(step);
      if (step >= steps.length) {
        clearInterval(interval);
        const generated = simulateAiGeneration({
          name,
          guideName,
          whatsapp,
          price,
          duration,
          difficulty,
          description,
          objective,
          template,
          language,
          heroImage: activeHeroImg,
          galleryImages
        });
        saveLandingToStorage(generated);
        router.push(`/demo/preview?slug=${generated.slug}`);
      }
    }, 1100);
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center max-w-lg mx-auto">
        <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 relative shadow-inner border border-blue-100">
          <Sparkles className="text-blue-600 absolute animate-ping opacity-70" size={48} />
          <Sparkles className="text-blue-600 relative z-10" size={44} />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Motor de IA en Acción</h2>
        <p className="text-slate-500 text-sm mb-6">
          Creando estructura optimizada para <strong>{name}</strong> con plantilla <strong>{template.toUpperCase()}</strong>.
        </p>

        {/* Dynamic step pills */}
        <div className="w-full bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-6 text-left space-y-2.5">
          {steps.map((s, idx) => {
            const isDone = idx < loadingStep;
            const isCurrent = idx === loadingStep;
            return (
              <div key={idx} className="flex items-center gap-3 text-xs">
                {isDone ? (
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 size={16} className="text-blue-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                )}
                <span className={isCurrent ? "font-bold text-blue-600" : isDone ? "text-slate-700" : "text-slate-400"}>
                  {s}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-700 ease-out rounded-full"
            style={{ width: `${Math.min(((loadingStep + 1) / steps.length) * 100, 100)}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16 animate-in fade-in duration-500">
      
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <Link href="/demo" className="p-2.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Generador Inteligente de Landings
            </h1>
            <p className="text-slate-500 text-xs mt-0.5">
              Configura los detalles del tour o carga un tour preestablecido para generar con 1 clic.
            </p>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
            <Zap size={14} className="text-amber-500" /> Plantillas Rápidas:
          </span>
          {PRESET_TOURS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleApplyPreset(p)}
              className="text-xs bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 font-semibold px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 shadow-sm transition-all cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Form (Left 7 cols) + Realtime Preview Card (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Column */}
        <form onSubmit={handleGenerate} className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Objetivo Comercial */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
                Objetivo Comercial de la Landing
              </label>
              <span className="text-[11px] text-slate-400">Define botones y conversión</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={() => setObjective('whatsapp')}
                className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                  objective === 'whatsapp' 
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${objective === 'whatsapp' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                  <MessageCircle size={20} />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-sm block">Ventas Directas por WhatsApp</span>
                  <span className="text-xs text-slate-500 leading-relaxed block mt-1">
                    Prioriza contacto directo con el guía o counter para confirmaciones inmediatas.
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setObjective('quote')}
                className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                  objective === 'quote' 
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${objective === 'quote' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                  <FileText size={20} />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-sm block">Cotización y Propuesta Formal</span>
                  <span className="text-xs text-slate-500 leading-relaxed block mt-1">
                    Abre el modal de cotización para calcular pasajeros, requerimientos y grupos.
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Step 2: Información del Tour */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
                Información del Tour y Contacto
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Compass size={14} className="text-slate-400" /> Nombre del Tour
                </label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Ej. Salkantay Trek Clásico"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <User size={14} className="text-slate-400" /> Guía o Counter Asignado
                </label>
                <input 
                  type="text" 
                  required
                  value={guideName}
                  onChange={(e) => setGuideName(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Ej. Raúl Quispe (Guía Oficial)"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Phone size={14} className="text-slate-400" /> WhatsApp Guía
                </label>
                <input 
                  type="text" 
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                  placeholder="+51984112233"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <DollarSign size={14} className="text-slate-400" /> Tarifa por Persona
                </label>
                <input 
                  type="text" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-800"
                  placeholder="Ej. $350 USD"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Clock size={14} className="text-slate-400" /> Duración
                </label>
                <input 
                  type="text" 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Ej. 5 Días / 4 Noches"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Descripción, itinerario clave y valor diferencial para la IA
              </label>
              <textarea 
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
                placeholder="Describe la ruta, qué incluye, qué lo hace especial..."
              />
            </div>
          </div>

          {/* Step 3: Fotografía Hero */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">3</span>
                Fotografía Principal de Portada
              </label>
              <span className="text-xs text-blue-600 font-semibold">Alta Definición</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {SAMPLE_TOUR_IMAGES.map((img) => {
                const isSelected = selectedHeroImage === img.url && !customImageUrl;
                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => {
                      setSelectedHeroImage(img.url);
                      setCustomImageUrl('');
                    }}
                    className={`group relative h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                      isSelected ? 'border-blue-600 ring-4 ring-blue-500/20 scale-[1.03]' : 'border-slate-200 hover:border-slate-400 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Image 
                      src={img.url} 
                      alt={img.title} 
                      fill 
                      sizes="150px"
                      className="object-cover group-hover:scale-105 transition-transform" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    {isSelected && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white">
                        <Check size={10} strokeWidth={3} />
                      </div>
                    )}
                    <span className="absolute bottom-1 left-1.5 right-1.5 text-[9px] font-bold text-white line-clamp-1">
                      {img.title.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-1">
              <input 
                type="url"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder="O escribe una URL de imagen personalizada (Unsplash)..."
                className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Step 4: Plantilla e Idioma */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 space-y-4">
            <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">4</span>
              Diseño Visual y Tono
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'adventure', name: 'Aventura & Trekking', desc: 'Tonos esmeralda y naturaleza', icon: '🏔️' },
                { id: 'premium', name: 'Lujo & Exclusivo', desc: 'Dorado, oscuro y sofisticado', icon: '👑' },
                { id: 'cultural', name: 'Cultural Clásico', desc: 'Piedra incaica y ámbar andino', icon: '🏛️' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTemplate(t.id as TemplateType)}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    template === t.id 
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm font-bold' 
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span className="text-xl mb-1 block">{t.icon}</span>
                  <span className="text-xs font-bold text-slate-900 block">{t.name}</span>
                  <span className="text-[10px] text-slate-500 font-normal">{t.desc}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Globe size={14} className="text-slate-400" /> Idioma
                </label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as LanguageType)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs bg-white font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="es">Español (Mercado Nacional & Latino)</option>
                  <option value="en">Inglés (Turismo Receptivo Internacional)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400" /> Enfoque de Copywriting
                </label>
                <select 
                  value={tone}
                  onChange={(e) => setTone(e.target.value as 'persuasive' | 'luxury' | 'historical')}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs bg-white font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="persuasive">Persuasivo de Alta Conversión</option>
                  <option value="luxury">Exclusivo y Orientado a Confort</option>
                  <option value="historical">Místico, Cultural e Historiográfico</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex items-center justify-between">
            <Link 
              href="/demo" 
              className="px-6 py-3 text-slate-500 font-semibold hover:bg-slate-100 rounded-2xl transition-colors text-sm"
            >
              Cancelar
            </Link>
            <button 
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-600/30 flex items-center gap-2.5 text-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Sparkles size={18} />
              Generar Landing Page Completa
            </button>
          </div>
        </form>

        {/* Realtime Live Preview Column (Sticky) */}
        <div className="lg:col-span-5 sticky top-6 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Eye size={14} className="text-blue-600" /> Vista Previa en Vivo
            </span>
            <span className="text-[11px] bg-slate-100 text-slate-600 font-semibold px-2.5 py-0.5 rounded-full border border-slate-200">
              {template.toUpperCase()} • {language.toUpperCase()}
            </span>
          </div>

          {/* Smartphone mockup */}
          <div className="bg-slate-900 rounded-[36px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-900/50 max-w-sm mx-auto">
            {/* Camera notch */}
            <div className="w-28 h-4 bg-slate-950 rounded-full mx-auto mb-2" />
            
            {/* Screen Content */}
            <div className="bg-stone-900 rounded-[28px] overflow-hidden text-white relative min-h-[520px] flex flex-col justify-between">
              
              {/* Mock Hero Image Background */}
              <div className="absolute inset-0 z-0">
                <Image 
                  src={activeHeroImg} 
                  alt="Preview" 
                  fill 
                  sizes="400px"
                  className="object-cover opacity-60" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />
              </div>

              {/* Mock Topbar */}
              <div className="relative z-10 p-4 flex justify-between items-center text-xs">
                <span className="font-extrabold tracking-wider text-emerald-400">
                  {template === 'premium' ? '👑 CUSCO VIP' : template === 'cultural' ? '🏛️ ANCESTRAL' : '🏔️ TREK EXPLORER'}
                </span>
                <span className="text-[10px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
                  {price || 'S/ Consultar'}
                </span>
              </div>

              {/* Mock Hero Center Text */}
              <div className="relative z-10 p-5 mt-auto space-y-3">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold backdrop-blur-md border border-emerald-400/20">
                  <MapPin size={10} />
                  {duration || 'Full Day'} • {difficulty}
                </div>

                <h3 className="text-xl font-extrabold leading-tight drop-shadow-md">
                  {name || 'Nombre del Tour'}
                </h3>

                <p className="text-stone-300 text-xs line-clamp-2 leading-relaxed">
                  {description || 'Descripción del tour turístico adaptada por IA.'}
                </p>

                {/* Mock CTA Button */}
                <div className="pt-2">
                  {objective === 'whatsapp' ? (
                    <div className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-center text-xs shadow-lg flex items-center justify-center gap-2">
                      <MessageCircle size={14} />
                      Reservar con {guideName.split(' ')[0] || 'Guía'}
                    </div>
                  ) : (
                    <div className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-center text-xs shadow-lg flex items-center justify-center gap-2">
                      <FileText size={14} />
                      Solicitar Cotización de Grupo
                    </div>
                  )}
                </div>

                <div className="text-center pt-1">
                  <span className="text-[10px] text-stone-400">
                    Guía Asignado: <strong>{guideName || 'Guía Oficial'}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
