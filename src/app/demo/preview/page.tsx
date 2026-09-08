"use client";

import Link from 'next/link';
import { ArrowLeft, CheckCircle2, MonitorSmartphone } from 'lucide-react';
import AdventureTemplate from '@/templates/AdventureTemplate';

export default function DemoPreview() {
  // Fake JSON that would normally come from the database / AI
  const fakeAiData = {
    hero: {
      title: "Desafía tus límites en Salkantay Trek",
      subtitle: "5 días y 4 noches de aventura extrema y paisajes inolvidables camino a Machu Picchu.",
      cta: "Quiero Reservar Mi Espacio"
    },
    about: {
      title: "La ruta alternativa más espectacular",
      content: "Considerada una de las 25 mejores rutas de trekking del mundo por National Geographic. El Salkantay Trek te llevará desde nevados imponentes a más de 4,600msnm hasta la exuberante selva alta, culminando en la maravilla del mundo: Machu Picchu. Ideal para jóvenes de corazón que buscan salir de la ruta tradicional."
    },
    features: {
      title: "¿Por qué elegir esta expedición?",
      items: [
        "Aventura Extrema:Cruza el abra Salkantay y siente la majestuosidad de los Andes.",
        "Campamentos Premium:Descansa bajo las estrellas en nuestros domos transparentes exclusivos.",
        "Guías Expertos:Acompañado en todo momento por especialistas locales en alta montaña.",
        "Todo Incluido:Desde la alimentación nutritiva hasta los boletos de tren y entrada a Machu Picchu.",
        "Grupos Pequeños:Máximo 8 personas para garantizar una experiencia íntima y personalizada.",
        "Turismo Responsable:Tu reserva apoya directamente a las comunidades andinas de la ruta."
      ]
    }
  };

  return (
    <div className="-mx-8 -my-8 bg-slate-100 min-h-screen flex flex-col">
      {/* Top Editor Bar */}
      <div className="bg-white h-16 px-6 border-b border-slate-200 flex items-center justify-between shadow-sm shrink-0 relative z-50">
        <div className="flex items-center gap-4">
          <Link href="/demo" className="text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="h-6 w-px bg-slate-200"></div>
          <div>
            <h2 className="font-semibold text-slate-800 leading-tight">Tour Salkantay Trek</h2>
            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 size={12} /> Contenido generado por IA
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
            <button className="p-1.5 bg-white shadow-sm rounded text-slate-700">
              <MonitorSmartphone size={18} />
            </button>
          </div>
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
            Editar Textos
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm">
            Publicar Landing
          </button>
        </div>
      </div>

      {/* The Template Wrapper */}
      <div className="flex-1 overflow-auto bg-slate-200/50 p-4 md:p-8">
        <div className="max-w-[1400px] mx-auto bg-white shadow-2xl rounded-xl overflow-hidden border border-slate-200/60 ring-1 ring-slate-900/5">
          {/* This is the magic: injecting AI data into the rigid template */}
          <div className="h-[800px] overflow-y-auto overflow-x-hidden relative">
            <AdventureTemplate data={fakeAiData} />
          </div>
        </div>
      </div>
    </div>
  );
}
