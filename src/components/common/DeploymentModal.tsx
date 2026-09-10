"use client";

import React, { useState } from 'react';
import { 
  X, 
  Globe, 
  Download, 
  Check, 
  Copy, 
  ExternalLink, 
  Cloud, 
  FolderArchive, 
  FileCode, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  Server,
  HelpCircle,
  ArrowRight,
  Info,
  Laptop,
  CheckCircle2
} from 'lucide-react';
import { LandingData } from '@/types/landing';
import { generateStandaloneHtml, downloadHtmlFile, downloadLandingZip } from '@/utils/exportLandingHtml';

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  landing: LandingData;
}

export default function DeploymentModal({ isOpen, onClose, landing }: DeploymentModalProps) {
  const [copied, setCopied] = useState(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [zipSuccess, setZipSuccess] = useState(false);
  const [htmlSuccess, setHtmlSuccess] = useState(false);
  const [showDomainGuide, setShowDomainGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<'compare' | 'faq'>('compare');

  if (!isOpen) return null;

  const publicUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/p/${landing.slug}`
    : `/p/${landing.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadHtmlOnly = () => {
    const html = generateStandaloneHtml(landing);
    downloadHtmlFile(html, `index-${landing.slug}.html`);
    setHtmlSuccess(true);
    setTimeout(() => setHtmlSuccess(false), 2500);
  };

  const handleDownloadZipPackage = async () => {
    try {
      setIsDownloadingZip(true);
      await downloadLandingZip(landing);
      setZipSuccess(true);
      setTimeout(() => setZipSuccess(false), 2500);
    } catch (err) {
      console.error('Error generating zip:', err);
    } finally {
      setIsDownloadingZip(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden text-slate-100 ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header with Title and Subtitle */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
              <Zap size={22} className="fill-white/20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-lg sm:text-xl tracking-tight">
                  Centro de Publicación & Exportación
                </h3>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  ACTIVA
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Proyecto: <strong className="text-slate-200">{landing.name}</strong> • Guía: {landing.guideName || 'Cusco Creativos'}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-700/50"
            title="Cerrar ventana"
          >
            <X size={18} />
          </button>
        </div>

        {/* Informative Guidance Banner for User (UX Improvement) */}
        <div className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/40 px-6 py-3.5 border-b border-slate-800/80 flex items-start sm:items-center gap-3 text-xs text-slate-300">
          <div className="w-7 h-7 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 font-bold">
            💡
          </div>
          <div className="leading-relaxed">
            <strong className="text-white">¿Cómo funciona la entrega al cliente? </strong> 
            Esta página ya está lista. Puedes usar la <span className="text-blue-400 font-semibold">Opción A</span> para mostrársela al cliente en vivo con un link oficial, o la <span className="text-amber-400 font-semibold">Opción B</span> para descargar los archivos si el cliente exige subirlos a su propio servidor o WordPress.
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* TWO MAIN OPTIONS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* OPCIÓN A: VERCEL & DOMINIO PROPIO (RECOMENDADA) */}
            <div className="relative rounded-3xl p-6 bg-gradient-to-b from-blue-950/30 via-slate-900 to-slate-900 border-2 border-blue-500/60 shadow-xl flex flex-col justify-between group hover:border-blue-400 transition-all">
              
              <div className="space-y-4">
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30 shadow-xs">
                    <Cloud size={14} className="text-blue-400" />
                    Opción A • Recomendada
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    En Línea 24/7
                  </span>
                </div>

                {/* Card Title & Explanation */}
                <div>
                  <h4 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                    Despliegue en la Nube (Vercel)
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    La página web ya está alojada y funcionando en Internet. No requiere comprar hosting para cada cliente ni configurar servidores.
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="space-y-2.5 pt-1 text-xs">
                  <div className="flex items-start gap-2.5 text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Enlace Inmediato:</strong>
                      <p className="text-slate-400 text-[11px]">Compártelo por WhatsApp al cliente para que vea su página en vivo en segundos.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    <Globe size={16} className="text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Soporte para Dominio Propio:</strong>
                      <p className="text-slate-400 text-[11px]">Si el guía compra <code className="text-blue-300 font-mono">tours-carlos.com</code>, se conecta en Vercel sin reprogramar.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    <ShieldCheck size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Seguridad & Rendimiento:</strong>
                      <p className="text-slate-400 text-[11px]">Certificado SSL HTTPS automático y carga instantánea en teléfonos móviles.</p>
                    </div>
                  </div>
                </div>

                {/* Direct Link Preview */}
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 flex items-center justify-between gap-2">
                  <div className="truncate text-xs font-mono text-slate-300">
                    {publicUrl}
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors shrink-0 cursor-pointer"
                    title="Copiar enlace directo"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Action Buttons for Option A */}
              <div className="pt-5 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-slate-700 cursor-pointer shadow-sm"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copied ? '¡Copiado!' : 'Copiar Link'}</span>
                  </button>

                  <a
                    href={publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-600/30 cursor-pointer text-center"
                  >
                    <ExternalLink size={14} />
                    <span>Ver en Vivo</span>
                  </a>
                </div>

                {/* Collapsible Domain Instructions */}
                <div className="pt-1">
                  <button
                    onClick={() => setShowDomainGuide(!showDomainGuide)}
                    className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold flex items-center justify-center gap-1 w-full py-1.5 rounded-lg hover:bg-blue-500/10 transition-colors cursor-pointer"
                  >
                    <span>¿Cómo conectar el dominio del cliente en Vercel?</span>
                    {showDomainGuide ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>

                  {showDomainGuide && (
                    <div className="mt-2 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 space-y-2.5 animate-in fade-in">
                      <p className="font-bold text-white flex items-center gap-1.5 text-xs">
                        <Server size={14} className="text-blue-400" /> 
                        Pasos para Dominio Propio:
                      </p>
                      <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                        <li>Entra a tu cuenta en <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-blue-400 underline font-semibold">Vercel.com</a> y abre el proyecto.</li>
                        <li>Ve a <strong>Settings → Domains</strong> y escribe el dominio (ej: <code className="text-blue-300 bg-slate-900 px-1 py-0.5 rounded">guiacarloscusco.com</code>).</li>
                        <li>En el registrador de dominio (GoDaddy, Namecheap, DonWeb), crea un registro <strong>CNAME</strong> apuntando a <code className="text-emerald-400 bg-slate-900 px-1 py-0.5 rounded">cname.vercel-dns.com</code>.</li>
                        <li>¡Listo! Vercel activará el certificado de seguridad SSL y la web responderá en el dominio propio.</li>
                      </ol>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* OPCIÓN B: DESCARGAR ARCHIVO AUTÓNOMO (PORTABILIDAD) */}
            <div className="relative rounded-3xl p-6 bg-gradient-to-b from-amber-950/20 via-slate-900 to-slate-900 border border-slate-800 hover:border-amber-500/50 shadow-xl flex flex-col justify-between transition-all">
              
              <div className="space-y-4">
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/20 shadow-xs">
                    <FolderArchive size={14} className="text-amber-400" />
                    Opción B • Portabilidad
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                    Hosting Tradicional
                  </span>
                </div>

                {/* Card Title & Explanation */}
                <div>
                  <h4 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                    Descargar Web en ZIP / HTML
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Descarga el código fuente de la landing empaquetado para clientes que tienen su propio cPanel, Hostinger o usan WordPress.
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="space-y-2.5 pt-1 text-xs">
                  <div className="flex items-start gap-2.5 text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    <Laptop size={16} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">100% Autónomo:</strong>
                      <p className="text-slate-400 text-[11px]">Haces doble clic en tu computadora y se abre en Chrome sin necesidad de servidores.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    <Server size={16} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Para cPanel o Hostinger:</strong>
                      <p className="text-slate-400 text-[11px]">Sube el archivo a <code className="text-amber-300 font-mono">public_html</code> de cualquier proveedor tradicional.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    <FileCode size={16} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Integración en WordPress:</strong>
                      <p className="text-slate-400 text-[11px]">Compatible con bloques HTML personalizados o subdominios dedicados.</p>
                    </div>
                  </div>
                </div>

                {/* ZIP contents display */}
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
                  <div className="text-amber-300 font-bold flex items-center gap-1.5">
                    <FolderArchive size={13} />
                    Archivos incluidos en la descarga:
                  </div>
                  <div className="pl-4 text-[10px] space-y-0.5 text-slate-400">
                    <div>📁 landing-{landing.slug}/</div>
                    <div>├── 📄 <strong>index.html</strong> <span className="text-slate-500">(Web completa con Tailwind CSS)</span></div>
                    <div>├── 📝 <strong>LEEME_INSTRUCCIONES.txt</strong> <span className="text-slate-500">(Manual de subida)</span></div>
                    <div>└── 📊 <strong>datos_landing_ia.json</strong> <span className="text-slate-500">(Textos generados)</span></div>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Option B */}
              <div className="pt-5 space-y-2">
                <button
                  onClick={handleDownloadZipPackage}
                  disabled={isDownloadingZip}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 cursor-pointer disabled:opacity-50"
                >
                  <Download size={16} />
                  <span>
                    {isDownloadingZip 
                      ? 'Generando archivo ZIP...' 
                      : zipSuccess 
                        ? '¡Paquete ZIP Descargado con Éxito!' 
                        : 'Descargar Paquete Completo (.ZIP)'}
                  </span>
                </button>

                <button
                  onClick={handleDownloadHtmlOnly}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
                >
                  <FileCode size={14} className="text-amber-400" />
                  <span>{htmlSuccess ? '¡Archivo HTML Descargado!' : 'Descargar solo archivo .HTML independiente'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Bottom Guidance Box */}
          <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-slate-300">
              <Info size={18} className="text-blue-400 shrink-0" />
              <span>
                <strong>Recomendación para la Agencia:</strong> Usa la <strong>Opción A</strong> como catálogo en vivo para cerrar ventas de inmediato. Usa la <strong>Opción B</strong> como valor agregado entregable para los clientes técnicos.
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white font-bold text-xs shrink-0 cursor-pointer ml-auto bg-slate-800 hover:bg-slate-700 px-4 py-1.5 rounded-xl transition-colors"
            >
              Entendido
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
