'use client';

import React, { useState, useRef } from 'react';
import {
  Sparkles,
  UploadCloud,
  FileText,
  FileCheck,
  X,
  Building2,
  Compass,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Copy,
  Layers,
} from 'lucide-react';
import {
  extractTextFromFile,
  parseDocumentTextLocally,
  ParsedDocumentData,
} from '@/lib/ai/documentParser';

const DEMO_TOUR_DOCUMENT = `CUSCO SACRED EXPEDITIONS S.A.C.
RUC: 20608765432
WhatsApp / Reservas: +51 984 556 677
Correo: reservas@cuscosacred.com
Dirección: Calle Plateros 345, Oficina 202, Centro Histórico, Cusco
Horario de Atención: Lunes a Domingo de 07:00 a 21:00 hrs
Slogan: Vivencias de alta montaña y expediciones auténticas en los Andes
Guía Líder: Carlos Mendoza Quispe
Registro DIRCETUR: Colegiado Oficial N° 4821

PAQUETE TURÍSTICO: Salkantay Trek Clásico hacia Machu Picchu
Destino: Cordillera Vilcabamba, Mollepata, Soraypampa y Aguas Calientes
Tarifa por persona: $380 USD
Duración: 5 Días / 4 Noches
Dificultad: Desafiante / Alta Montaña
Altitud Máxima: 4,630 msnm (Paso Salkantay)

DESCRIPCIÓN DEL TOUR:
Una de las 25 mejores caminatas del mundo según National Geographic. Atraviesa majestuosos glaciares andinos, acampa bajo las estrellas en domos panorámicos y desciende a la ceja de selva tropical con cafetales y orquídeas, culminando en la enigmática ciudadela inca de Machu Picchu.

ITINERARIO DETALLADO:
Día 1: Cusco - Mollepata - Challacancha - Soraypampa (Laguna Humantay)
Recojo a las 04:30 AM en tu hotel de Cusco rumbo a Mollepata. Iniciamos la caminata hacia Soraypampa y por la tarde ascendemos a la deslumbrante Laguna Humantay (4,200 msnm). Noche en campamento domo bajo las estrellas.

Día 2: Soraypampa - Paso Salkantay (4,630 msnm) - Chaullay
La jornada cumbre del trekking. Ascenso pausado con protocolo de oxigenación hasta el Abra Salkantay con panorámicas increíbles del glaciar sagrado. Descenso progresivo hacia el valle interandino de Chaullay.

Día 3: Chaullay - Collpapampa - La Playa Sahuyaco - Lucmabamba
Caminata a través del bosque nublado admirando cascadas, orquídeas silvestres y plantaciones de café orgánico. Tarde de cata de café tradicional andino y descanso reparador.

Día 4: Lucmabamba - Llactapata (Mirador Inca) - Hidroeléctrica - Aguas Calientes
Ascenso por tramos originales del Qhapaq Ñan hacia las ruinas incas de Llactapata con vista panorámica a Machu Picchu. Descenso hacia Hidroeléctrica y caminata escénica junto al río Urubamba. Noche en hotel confortable en Aguas Calientes.

Día 5: Aguas Calientes - Santuario Histórico de Machu Picchu - Tren a Cusco
Ascenso temprano en bus turístico a la ciudadela inca de Machu Picchu. Recorrido guiado de 2.5 horas por los miradores principales. Retorno en tren turístico Expedition hacia Ollantaytambo y traslado privado a tu hotel en Cusco.

SERVICIOS INCLUIDOS:
• Recojo privado en puerta de hotel en Cusco
• Transporte turístico ida y vuelta (Cusco - Mollepata y Ollantaytambo - Cusco)
• Guía oficial colegiado bilingüe en toda la ruta
• Boleto oficial de tren turístico Expedition (Aguas Calientes - Ollantaytambo)
• Boleto oficial de ingreso al Santuario de Machu Picchu (Circuitos 1 o 2)
• 4 desayunos, 4 almuerzos y 4 cenas con chef andino de montaña
• Balón de oxígeno medicinal preventivo, oxímetro y botiquín de emergencia
• Asistencia personalizada 24/7 vía WhatsApp

NO INCLUYE:
• Primer desayuno (Día 1) ni último almuerzo (Día 5)
• Boletos a Huayna Picchu o Montaña Machu Picchu (opcional)
• Propinas voluntarias para guía y conductores
• Seguro de viaje personal internacional

QUÉ LLEVAR:
• Pasaporte original vigente (indispensable para ingresar a Machu Picchu)
• Mochila de trekking mediana (30 a 40 litros)
• Ropa térmica abrigadora en capas y casaca impermeable/cortavientos
• Zapatillas o botas de trekking con buen agarre antideslizante
• Bloqueador solar SPF 50+, lentes de sol con protección UV y sombrero
• Bastones de trekking con puntas de goma protectoras

PREGUNTAS FRECUENTES:
¿Cómo se maneja la aclimatación a la altitud?
Recomendamos estar en Cusco al menos 2 días antes del trekking. Nuestro vehículo y campamentos cuentan con balón de oxígeno medicinal y asistencia permanente.

¿Cuál es la exigencia física requerida?
El Día 2 es el más demandante por el paso a 4,630 msnm. Caminamos a ritmo pausado con descansos periódicos y guías capacitados en primeros auxilios.`;

interface AiDocumentImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (data: ParsedDocumentData) => void;
}

export function AiDocumentImporterModal({
  isOpen,
  onClose,
  onApply,
}: AiDocumentImporterModalProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'text'>('upload');
  const [inputText, setInputText] = useState('');
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewResult, setPreviewResult] = useState<ParsedDocumentData | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setIsReadingFile(true);
    setSelectedFileName(file.name);

    try {
      const extracted = await extractTextFromFile(file);
      setInputText(extracted);
      // Previsualizar análisis local preliminar
      const initialParsed = parseDocumentTextLocally(extracted);
      setPreviewResult(initialParsed);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'No se pudo leer el archivo. Asegúrate de que sea .docx o .txt válido.'
      );
    } finally {
      setIsReadingFile(false);
    }
  };

  const handleLoadSample = () => {
    setErrorMessage(null);
    setSelectedFileName('Ficha_Oficial_Salkantay_Trek_5D.docx (Ejemplo)');
    setInputText(DEMO_TOUR_DOCUMENT);
    const parsed = parseDocumentTextLocally(DEMO_TOUR_DOCUMENT);
    setPreviewResult(parsed);
  };

  const handleProcessAndApply = async () => {
    if (!inputText.trim()) {
      setErrorMessage('Por favor sube un archivo o escribe texto con la información de tu empresa/tour.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // 1. Intentar llamar al backend /api/ai/generate con documentText
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentText: inputText,
          name: previewResult?.name,
          companyName: previewResult?.companyName,
          guideName: previewResult?.guideName,
          price: previewResult?.price,
        }),
      });

      if (res.ok) {
        const payload = await res.json();
        const aiData = payload?.data;
        if (aiData) {
          // Unir datos de IA con los campos de documento
          const combined: ParsedDocumentData = {
            companyName: aiData.companyName || previewResult?.companyName,
            companyRuc: aiData.companyRuc || previewResult?.companyRuc,
            companyEmail: aiData.companyEmail || previewResult?.companyEmail,
            whatsapp: aiData.whatsapp || previewResult?.whatsapp,
            officeAddress: aiData.officeAddress || previewResult?.officeAddress,
            officeHours: aiData.officeHours || previewResult?.officeHours,
            companyTagline: aiData.companyTagline || previewResult?.companyTagline,
            guideName: aiData.guideName || previewResult?.guideName,
            guideCert: aiData.guideCert || previewResult?.guideCert,
            recommendedTemplate: aiData.recommendedTemplate || previewResult?.recommendedTemplate,
            name: aiData.tourName || aiData.heroTitle || previewResult?.name,
            destination: aiData.destination || previewResult?.destination,
            price: aiData.price || previewResult?.price,
            duration: aiData.duration || previewResult?.duration,
            difficulty: aiData.difficulty || previewResult?.difficulty,
            altitude: aiData.altitude || previewResult?.altitude,
            description: aiData.description || previewResult?.description,
            heroTitle: aiData.heroTitle || previewResult?.heroTitle,
            heroSubtitle: aiData.heroSubtitle || previewResult?.heroSubtitle,
            heroBadge: aiData.heroBadge || previewResult?.heroBadge,
            heroCta: aiData.heroCta || previewResult?.heroCta,
            itinerary: Array.isArray(aiData.itinerary) && aiData.itinerary.length > 0 ? aiData.itinerary : previewResult?.itinerary,
            includedServices: Array.isArray(aiData.includedServices) && aiData.includedServices.length > 0 ? aiData.includedServices : previewResult?.includedServices,
            notIncluded: Array.isArray(aiData.notIncluded) && aiData.notIncluded.length > 0 ? aiData.notIncluded : previewResult?.notIncluded,
            whatToBring: Array.isArray(aiData.whatToBring) && aiData.whatToBring.length > 0 ? aiData.whatToBring : previewResult?.whatToBring,
            faqs: Array.isArray(aiData.faqs) && aiData.faqs.length > 0 ? aiData.faqs : previewResult?.faqs,
            testimonials: Array.isArray(aiData.testimonials) && aiData.testimonials.length > 0 ? aiData.testimonials : previewResult?.testimonials,
          };

          onApply(combined);
          onClose();
          return;
        }
      }
    } catch {
      // Si el fetch falla (offline o sin backend), usar el parser local client-side
    }

    // 2. Parser inteligente local instantáneo (100% garantizado sin costo ni internet)
    const localResult = parseDocumentTextLocally(inputText);
    onApply(localResult);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* MODAL HEADER */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-50/80 via-blue-50/50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
              <Sparkles size={20} className="text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Importar y Rellenar con IA
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                  Word (.docx) / Texto
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Carga un documento o escribe datos de tu empresa y la IA autocompletará todo el formulario.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700 text-xs">
          
          {/* TABS SELECTOR */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <UploadCloud size={15} />
              <span>Subir Archivo (.docx, .txt)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('text')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'text'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FileText size={15} />
              <span>Escribir o Pegar Texto</span>
            </button>
            
            <button
              type="button"
              onClick={handleLoadSample}
              className="ml-auto text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer border border-blue-200/60"
              title="Carga una propuesta turística completa con RUC, WhatsApp, Itinerario y FAQs para probar inmediatamente"
            >
              <Copy size={13} />
              <span>Cargar Ejemplo de Demostración</span>
            </button>
          </div>

          {/* TAB 1: SUBIR ARCHIVO */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".docx,.txt,.md,.csv,.rtf"
                onChange={handleFileChange}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-purple-300 hover:border-purple-500 bg-purple-50/40 hover:bg-purple-50/80 rounded-3xl p-8 text-center cursor-pointer transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-md text-purple-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
                  {selectedFileName ? <FileCheck size={28} className="text-emerald-600" /> : <UploadCloud size={28} />}
                </div>
                <p className="text-sm font-black text-slate-800">
                  {selectedFileName ? selectedFileName : 'Arrastra o haz clic para cargar tu documento'}
                </p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Soporta Microsoft Word (<span className="font-bold text-purple-700">.docx</span>), notas de texto (<span className="font-bold text-purple-700">.txt</span>) y Markdown.
                </p>
                {isReadingFile && (
                  <p className="text-xs font-bold text-purple-600 mt-2 animate-pulse">
                    Extrayendo texto del documento Word...
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PEGAR TEXTO */}
          {activeTab === 'text' && (
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-700 tracking-wider flex items-center justify-between">
                <span>Pega el contenido o cotización de tu agencia:</span>
                <span className="text-slate-400 font-normal">{inputText.length} caracteres</span>
              </label>
              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  if (e.target.value.length > 30) {
                    setPreviewResult(parseDocumentTextLocally(e.target.value));
                  }
                }}
                rows={10}
                placeholder="Pega aquí el itinerario, datos de la empresa (RUC, WhatsApp, Correo, Dirección), precios, servicios incluidos y recomendaciones..."
                className="w-full text-xs font-mono p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 resize-none bg-slate-50/50"
              />
            </div>
          )}

          {/* MENSAJE DE ERROR SI OCURRIÓ ALGUNO */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 flex items-center gap-2.5">
              <AlertCircle size={16} className="shrink-0" />
              <p className="text-xs font-semibold">{errorMessage}</p>
            </div>
          )}

          {/* PREVIEW DE DATOS DETECTADOS EN TIEMPO REAL */}
          {previewResult && (
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600" /> Datos Detectados Automáticamente:
                </span>
                {previewResult.recommendedTemplate && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 flex items-center gap-1">
                    <Layers size={11} /> Plantilla Sugerida: {previewResult.recommendedTemplate}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-500 flex items-center gap-1">
                    <Building2 size={12} className="text-blue-600" /> Empresa & Contacto:
                  </span>
                  <p className="font-black text-slate-800 truncate">
                    {previewResult.companyName || 'No detectado (se usará actual)'}
                  </p>
                  <p className="text-slate-600 truncate">
                    RUC: {previewResult.companyRuc || '—'} • WA: {previewResult.whatsapp || '—'}
                  </p>
                  <p className="text-slate-500 text-[10px] truncate">
                    {previewResult.companyEmail || previewResult.officeAddress || '—'}
                  </p>
                </div>

                <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-500 flex items-center gap-1">
                    <Compass size={12} className="text-emerald-600" /> Tour & Destino:
                  </span>
                  <p className="font-black text-slate-800 truncate">
                    {previewResult.name || 'Tour en Cusco'}
                  </p>
                  <p className="text-slate-600 truncate">
                    Destino: {previewResult.destination || '—'}
                  </p>
                  <p className="text-slate-500 text-[10px]">
                    Tarifa: <span className="font-bold text-emerald-700">{previewResult.price || '—'}</span> • Duración: {previewResult.duration || '—'}
                  </p>
                </div>
              </div>

              {/* Conteo de secciones extraídas */}
              <div className="flex items-center gap-3 text-[10px] text-slate-500 pt-1 flex-wrap">
                <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  📅 Itinerario: <strong>{previewResult.itinerary?.length || 0} etapas</strong>
                </span>
                <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  ✅ Inclusiones: <strong>{previewResult.includedServices?.length || 0} items</strong>
                </span>
                <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  ❓ FAQs: <strong>{previewResult.faqs?.length || 0} preguntas</strong>
                </span>
              </div>
            </div>
          )}

          {/* BANNER INFORMATIVO */}
          <div className="bg-blue-50/70 border border-blue-200/60 rounded-2xl p-3.5 flex items-start gap-2.5 text-blue-950">
            <HelpCircle size={16} className="text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Modo Híbrido Resiliente:</strong> Funciona tanto con la cuenta de <strong>OpenAI</strong> (cuando agregues tu API Key en producción) como con el <strong>Motor Inteligente Local</strong> sin ningún costo ni necesidad de saldo, extrayendo texto y estructurando tu landing al 100%.
            </p>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleProcessAndApply}
            disabled={isProcessing || !inputText.trim()}
            className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-6 py-2.5 rounded-2xl font-black text-xs transition-all shadow-md shadow-purple-500/20 hover:scale-102 active:scale-98 cursor-pointer flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={16} className={isProcessing ? 'animate-spin text-amber-300' : 'text-amber-300'} />
            <span>
              {isProcessing
                ? 'Generando contenido con IA...'
                : 'Generar con IA'}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}

