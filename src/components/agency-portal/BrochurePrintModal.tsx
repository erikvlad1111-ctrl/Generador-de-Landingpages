'use client';

import React from 'react';
import Image from 'next/image';
import { 
  X, Printer, Download, ShieldCheck, MapPin, 
  Clock, Mountain, Award, Users, CheckCircle2, 
  Phone, Mail, Calendar, Sparkles
} from 'lucide-react';
import { LandingData, LanguageType } from '@/types/landing';

interface BrochurePrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Partial<LandingData>;
  brandName?: string;
  fullAgencyName?: string;
  whatsappNumber?: string;
  lang?: LanguageType;
}

export default function BrochurePrintModal({
  isOpen,
  onClose,
  data,
  brandName = 'Cusco Creativos',
  fullAgencyName = 'Cusco Creativos Operador Turístico S.A.C.',
  whatsappNumber = '+51984123456',
  lang = 'es'
}: BrochurePrintModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const tourTitle = data?.hero?.title || data?.name || 'Tour Machu Picchu VIP';
  const heroImg = data?.heroImage || 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      
      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white text-stone-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Floating Controls Bar (Hidden during print) */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wide flex items-center gap-1.5 text-stone-200">
              <Download size={16} className="text-[#FF5500]" />
              Ficha Técnica Oficial en PDF / Imprimir
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-[#FF5500] hover:bg-[#e04500] text-white px-4 py-2 rounded-xl text-xs font-black shadow-md cursor-pointer transition-all hover:scale-102"
            >
              <Printer size={15} />
              <span>Imprimir / Guardar en PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-xl transition-all cursor-pointer"
              title="Cerrar"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 space-y-6 bg-[#FCFBF8] print:p-0 print:bg-white text-left font-sans">
          
          {/* Header Corporativo */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-stone-800">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5500] block mb-1">
                DIRCETUR CUSCO • LICENCIA DE TURISMO CERTIFICADA
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 uppercase tracking-tight">
                {brandName}
              </h1>
              <span className="text-xs text-stone-500 font-semibold block">
                {fullAgencyName} • RUC: 20601234567
              </span>
            </div>

            <div className="text-right sm:border-l sm:border-stone-200 sm:pl-6 space-y-1">
              <div className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <ShieldCheck size={13} /> Safe Travels Perú
              </div>
              <p className="text-[11px] text-stone-500">
                WhatsApp 24/7: <strong>{whatsappNumber}</strong>
              </p>
              <p className="text-[10px] text-stone-400">
                Plaza de Armas, Centro Histórico, Cusco
              </p>
            </div>
          </div>

          {/* Tour Hero & Presentation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <div className="inline-block bg-[#FF5500]/10 text-[#FF5500] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                Catálogo Oficial Temporada 2026
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-stone-900 leading-tight">
                {tourTitle}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {data?.about?.content || data?.hero?.subtitle || 'Experiencia turística certificada con salidas diarias garantizadas, guías colegiados bilingües y asistencia de oxígeno permanente.'}
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-bold text-stone-700">
                <span className="text-xl font-black text-[#FF5500]">
                  Tarifa: {data?.price || '$45 USD'}
                </span>
                <span className="text-stone-400">|</span>
                <span>Duración: {data?.duration || 'Full Day'}</span>
                <span className="text-stone-400">|</span>
                <span>Destino: {data?.destination || 'Cusco'}</span>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden shadow-md border border-stone-200">
                <Image
                  src={heroImg}
                  alt={tourTitle}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Ficha Técnica Cuadrícula */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">
              Parámetros Técnicos de Seguridad & Ruta
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-stone-50">
                <span className="text-[10px] font-bold text-stone-400 block uppercase">Altitud Máxima</span>
                <span className="font-extrabold text-stone-800">{data?.altitude || '3,400 msnm'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50">
                <span className="text-[10px] font-bold text-stone-400 block uppercase">Nivel Físico</span>
                <span className="font-extrabold text-stone-800">{data?.difficulty || 'Moderada'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50">
                <span className="text-[10px] font-bold text-stone-400 block uppercase">Modalidad</span>
                <span className="font-extrabold text-stone-800">{data?.groupType || 'Grupo Reducido'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50">
                <span className="text-[10px] font-bold text-stone-400 block uppercase">Guía Oficial</span>
                <span className="font-extrabold text-stone-800">{data?.guideName || 'Carlos Mendoza'} (DIRCETUR)</span>
              </div>
            </div>
          </div>

          {/* Itinerario Cronológico Resumido */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-stone-900 pb-1 border-b border-stone-200">
              Cronograma & Etapas del Recorrido
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {(data?.itinerary && data.itinerary.length > 0 ? data.itinerary : [
                { step: '04:30 AM', title: 'Recojo en Hotel & Traslado Panorámico', desc: 'Asistencia y traslado en bus turístico autorizado.' },
                { step: '07:30 AM', title: 'Desayuno Andino Energético', desc: 'Desayuno completo para aclimatación.' },
                { step: '09:30 AM', title: 'Ascenso Guiado & Sesión Fotográfica', desc: 'Guiado histórico especializado con paradas estratégicas.' },
                { step: '01:30 PM', title: 'Almuerzo Buffet Campestre & Retorno', desc: 'Almuerzo típico y retorno a Cusco.' }
              ]).map((it, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-stone-200 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-[#FF5500] bg-[#FF5500]/10 px-2 py-0.5 rounded-md">
                      {it.step}
                    </span>
                    <span className="font-bold text-stone-800">{it.title}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-snug">{it.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Servicios Incluidos & Qué Llevar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 block">
                ✓ Servicios Incluidos
              </span>
              <ul className="text-[11px] text-stone-600 space-y-1.5">
                {(data?.includedServices && data.includedServices.length > 0 ? data.includedServices : [
                  'Transporte turístico autorizado ida y vuelta',
                  'Entradas oficiales al circuito turístico',
                  'Guía profesional colegiado DIRCETUR',
                  'Balón de oxígeno medicinal & botiquín de primeros auxilios'
                ]).map((srv, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{srv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-stone-700 block">
                🎒 Qué Llevar en tu Mochila
              </span>
              <ul className="text-[11px] text-stone-600 space-y-1.5">
                {(data?.whatToBring && data.whatToBring.length > 0 ? data.whatToBring : [
                  'Pasaporte original físico o DNI vigente',
                  'Ropa en capas (casaca cortavientos y polar)',
                  'Zapatos cómodos de trekking con buen agarre',
                  'Protector solar SPF 50+, lentes UV y gorro'
                ]).map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-stone-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer de Validez & Contacto */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-[10px] text-stone-400 gap-2">
            <span>Ficha Técnica Oficial para Viajeros • {brandName}</span>
            <span>Tarifas vigentes para la Temporada 2026</span>
          </div>

        </div>

        {/* Modal Footer (Hidden during print) */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-3 print:hidden">
          <span className="text-xs text-stone-500">
            Puedes imprimirlo directamente o seleccionarlo como &ldquo;Guardar como PDF&rdquo; en tu navegador.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 bg-white border border-stone-300 rounded-xl cursor-pointer"
          >
            Cerrar Ventana
          </button>
        </div>

      </div>
    </div>
  );
}
