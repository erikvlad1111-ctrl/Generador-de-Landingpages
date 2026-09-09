"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, Loader2, Compass, MessageCircle, FileText, ArrowLeft, Layers, Globe, DollarSign, Clock, User, Phone } from 'lucide-react';
import { ObjectiveType, TemplateType, LanguageType } from '@/types/landing';
import { simulateAiGeneration, saveLandingToStorage } from '@/data/landingStore';

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
  const [description, setDescription] = useState(
    'Un trekking de alta montaña hacia Machu Picchu cruzando el nevado Salkantay a 4,630 msnm. Incluye domos transparentes, alimentación nutritiva y guía oficial en español e inglés.'
  );

  const steps = [
    "Analizando destino, objetivo comercial y público objetivo...",
    "Generando copywriting persuasivo con IA para el Hero y Beneficios...",
    "Estructurando formato JSON compatible con el motor de plantillas...",
    "Vinculando número de WhatsApp del guía y guardando proyecto..."
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    // AI Generation step simulation
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setLoadingStep(step);
      if (step >= steps.length) {
        clearInterval(interval);
        // Generate and save to store
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
          language
        });
        saveLandingToStorage(generated);
        router.push(`/demo/preview?slug=${generated.slug}`);
      }
    }, 1200);
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
        <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 relative shadow-inner">
          <Sparkles className="text-blue-600 absolute animate-ping opacity-75" size={40} />
          <Sparkles className="text-blue-600 relative z-10" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Generando Landing Page Inteligente</h2>
        <p className="text-slate-500 text-sm mb-4 max-w-md">
          Adaptando textos para objetivo <strong>{objective === 'whatsapp' ? 'Reservas por WhatsApp' : 'Cotización Formal'}</strong> con plantilla <strong>{template}</strong>.
        </p>
        <p className="text-blue-600 font-medium h-6 flex items-center justify-center gap-2 text-sm">
          <Loader2 size={16} className="animate-spin" />
          {steps[Math.min(loadingStep, steps.length - 1)]}
        </p>
        
        {/* Progress bar */}
        <div className="w-72 h-2.5 bg-slate-100 rounded-full mt-8 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-blue-600 transition-all duration-700 ease-out rounded-full"
            style={{ width: `${Math.min(((loadingStep + 1) / steps.length) * 100, 100)}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-3 mb-2">
        <Link href="/demo" className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Generar Nueva Landing Page</h1>
          <p className="text-slate-500 text-sm mt-0.5">Ingresa los datos del tour y del guía para que la IA elabore el contenido de ventas.</p>
        </div>
      </div>

      <form onSubmit={handleGenerate} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8">
        
        {/* Step 1: Objetivo Comercial */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider text-xs">
            1. Objetivo Comercial de la Landing
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setObjective('whatsapp')}
              className={`p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all ${
                objective === 'whatsapp' 
                  ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className={`p-2.5 rounded-lg shrink-0 ${objective === 'whatsapp' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                <MessageCircle size={20} />
              </div>
              <div>
                <span className="font-bold text-slate-800 text-sm block">Reservas Directas por WhatsApp</span>
                <span className="text-xs text-slate-500 leading-relaxed block mt-1">
                  Prioriza llamados a la acción rápidos, testimonios y botones directos al chat del guía.
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setObjective('quote')}
              className={`p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all ${
                objective === 'quote' 
                  ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className={`p-2.5 rounded-lg shrink-0 ${objective === 'quote' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                <FileText size={20} />
              </div>
              <div>
                <span className="font-bold text-slate-800 text-sm block">Cotización y Asesoría Formal</span>
                <span className="text-xs text-slate-500 leading-relaxed block mt-1">
                  Prioriza itinerario detallado, tabla de qué incluye y formulario de solicitud de propuesta.
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Step 2: Datos del Tour y del Guía */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider text-xs">
            2. Información del Tour y del Guía
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Compass size={14} className="text-slate-400" /> Nombre del Tour / Producto
              </label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ej. Tour Valle Sagrado VIP"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <User size={14} className="text-slate-400" /> Nombre del Guía o Empresa
              </label>
              <input 
                type="text" 
                required
                value={guideName}
                onChange={(e) => setGuideName(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ej. Carlos Mendoza (Guía Oficial)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Phone size={14} className="text-slate-400" /> WhatsApp Guía
              </label>
              <input 
                type="text" 
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="+51984000000"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <DollarSign size={14} className="text-slate-400" /> Tarifa
              </label>
              <input 
                type="text" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ej. $180 USD"
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
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ej. 5 Días / 4 Noches"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Compass size={14} className="text-slate-400" /> Dificultad
              </label>
              <select 
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Fácil (Familiar)">Fácil (Familiar)</option>
                <option value="Moderada">Moderada</option>
                <option value="Moderada - Alta">Moderada - Alta</option>
                <option value="Exigente / Trekking">Exigente / Trekking</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Descripción y detalles clave para la IA
            </label>
            <textarea 
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="Describe los lugares a visitar, qué incluye, qué lo hace especial, público objetivo..."
            />
            <p className="text-xs text-slate-400 mt-1">La IA transformará estos datos en títulos atractivos, subtítulos y lista de beneficios de venta.</p>
          </div>
        </div>

        {/* Step 3: Plantilla e Idioma */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
              <Layers size={14} className="text-blue-600" /> 3. Plantilla Visual
            </label>
            <select 
              value={template}
              onChange={(e) => setTemplate(e.target.value as TemplateType)}
              className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm bg-white font-medium focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="adventure">Aventura (Trekking y Naturaleza)</option>
              <option value="premium">Premium / Lujo (Exclusivo VIP)</option>
              <option value="cultural">Cultural Clásico (Historia e Incas)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
              <Globe size={14} className="text-blue-600" /> 4. Idioma de Salida
            </label>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageType)}
              className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm bg-white font-medium focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="es">Español (Público Nacional / Latinoamericano)</option>
              <option value="en">Inglés (Turismo Receptivo Internacional)</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <Link 
            href="/demo" 
            className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors text-sm"
          >
            Cancelar
          </Link>
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-lg font-semibold transition-all shadow-md shadow-blue-600/25 flex items-center gap-2 text-sm hover:scale-[1.01]"
          >
            <Sparkles size={18} />
            Generar Landing con IA
          </button>
        </div>
      </form>
    </div>
  );
}
