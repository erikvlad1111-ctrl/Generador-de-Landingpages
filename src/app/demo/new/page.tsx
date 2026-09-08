"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Loader2, Image as ImageIcon } from 'lucide-react';

export default function NewLandingDemo() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const steps = [
    "Analizando destino y objetivos...",
    "Generando copywriting persuasivo con IA...",
    "Estructurando formato JSON...",
    "Aplicando estilos a la plantilla seleccionada..."
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate AI generation process with intervals
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setLoadingStep(step);
      if (step >= steps.length) {
        clearInterval(interval);
        router.push('/demo/preview');
      }
    }, 1500); // Wait 1.5s per step
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 relative">
          <Sparkles className="text-blue-600 absolute animate-ping opacity-75" size={40} />
          <Sparkles className="text-blue-600 relative z-10" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Generando tu Landing Page</h2>
        <p className="text-blue-600 font-medium h-6 flex items-center gap-2">
          <Loader2 size={16} className="animate-spin" />
          {steps[Math.min(loadingStep, steps.length - 1)]}
        </p>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-slate-100 rounded-full mt-8 overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-1000 ease-out rounded-full"
            style={{ width: `${Math.min(((loadingStep + 1) / steps.length) * 100, 100)}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Crear Nueva Landing</h1>
        <p className="text-slate-500 mt-1">Configura los parámetros para que la IA genere el contenido.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Nombre del Proyecto (Interno)</label>
            <input 
              type="text" 
              defaultValue="Tour Salkantay Trek" 
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">¿De qué trata este tour o negocio?</label>
            <textarea 
              rows={4}
              defaultValue="Un trekking de aventura hacia Machu Picchu por el nevado Salkantay. 5 días y 4 noches. Público objetivo: jóvenes aventureros. Incluye comidas, guía experto y tren de retorno."
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
            <p className="text-xs text-slate-500 mt-2">La IA usará esta información para crear todo el contenido de ventas.</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Plantilla Visual</label>
              <select className="w-full border border-slate-300 rounded-lg px-4 py-2 bg-white">
                <option>Aventura (Predeterminado)</option>
                <option>Premium / Lujo</option>
                <option>Cultural Clásico</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Idioma a generar</label>
              <select className="w-full border border-slate-300 rounded-lg px-4 py-2 bg-white">
                <option>Español</option>
                <option>Inglés</option>
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
            <button className="px-6 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors">
              Cancelar
            </button>
            <button 
              onClick={handleGenerate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-md shadow-blue-600/20 flex items-center gap-2"
            >
              <Sparkles size={18} />
              Generar con IA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
