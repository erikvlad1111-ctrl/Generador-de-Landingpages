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
  HelpCircle
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

  if (!isOpen) return null;

  const publicUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/p/${landing.slug}`
    : `/p/${landing.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Zap size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-lg sm:text-xl tracking-tight">
                  Centro de Publicación & Exportación
                </h3>
                <span className="bg-blue-500/20 text-blue-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-blue-500/30">
                  DEMO ACTIVA
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Proyecto: <strong className="text-slate-200">{landing.name}</strong> • Guía: {landing.guideName || 'Cusco Creativos'}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Cerrar modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Puedes entregar la página de tu cliente de dos formas según las necesidades de la agencia o del guía turístico:
          </p>

          {/* TWO MAIN OPTIONS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* OPCIÓN A: VERCEL & DOMINIO PROPIO (RECOMENDADA) */}
            <div className="relative rounded-2xl p-6 bg-gradient-to-b from-blue-950/40 to-slate-900 border-2 border-blue-500/50 shadow-xl shadow-blue-500/5 flex flex-col justify-between group hover:border-blue-400 transition-all">
              
              <div className="space-y-4">
                {/* Badge header */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                    <Cloud size={14} className="text-blue-400" />
                    ⭐ Opción A (Recomendada)
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    En Vivo
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-black text-white tracking-tight">
                    Despliegue en la Nube (Vercel)
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    La página ya vive en Internet en los servidores globales de Vercel. Ideal para mostrar al cliente y ponerla en vivo en segundos con su propio dominio.
                  </p>
                </div>

                {/* Features list */}
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check size={15} className="text-blue-400 shrink-0 mt-0.5" />
                    <span><strong>1 Clic:</strong> Ya está activa en la URL de tu plataforma sin costo de hosting adicional.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={15} className="text-blue-400 shrink-0 mt-0.5" />
                    <span><strong>Dominio Propio:</strong> Si el guía compra <code className="text-blue-300 bg-blue-950/80 px-1 py-0.5 rounded">guiacarlos.com</code>, se conecta en Vercel sin reprogramar nada.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={15} className="text-blue-400 shrink-0 mt-0.5" />
                    <span><strong>SSL & CDN Mundial:</strong> Carga ultrarrápida en celulares de turistas con candado de seguridad HTTPS gratis.</span>
                  </li>
                </ul>

                {/* Current URL Box */}
                <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 flex items-center justify-between gap-2">
                  <div className="truncate text-xs font-mono text-slate-300">
                    {publicUrl}
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors shrink-0"
                    title="Copiar enlace"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-slate-700 cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copied ? '¡Copiado!' : 'Copiar Link'}</span>
                  </button>

                  <a
                    href={publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-blue-600/30 cursor-pointer text-center"
                  >
                    <Globe size={14} />
                    <span>Ver en Vivo</span>
                  </a>
                </div>

                {/* Collapsible Domain Instructions */}
                <div className="pt-1">
                  <button
                    onClick={() => setShowDomainGuide(!showDomainGuide)}
                    className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold flex items-center justify-center gap-1 w-full py-1 transition-colors cursor-pointer"
                  >
                    <span>¿Cómo conectar el dominio del cliente en Vercel?</span>
                    {showDomainGuide ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>

                  {showDomainGuide && (
                    <div className="mt-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 space-y-2 animate-in fade-in">
                      <p className="font-bold text-white flex items-center gap-1">
                        <Server size={13} className="text-blue-400" /> 3 Pasos para Dominio Propio:
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-slate-400">
                        <li>Entra al panel de tu proyecto en <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-blue-400 underline">Vercel.com</a> y ve a <strong>Settings → Domains</strong>.</li>
                        <li>Escribe el dominio del cliente (ej: <code className="text-slate-200">tours-carlos.com</code>).</li>
                        <li>En el registrador de dominio (GoDaddy, Namecheap), agrega el registro DNS <strong>CNAME</strong> apuntando a <code className="text-slate-200">cname.vercel-dns.com</code>. ¡Listo!</li>
                      </ol>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* OPCIÓN B: DESCARGAR ARCHIVO AUTÓNOMO (PORTABILIDAD) */}
            <div className="relative rounded-2xl p-6 bg-gradient-to-b from-amber-950/20 to-slate-900 border border-slate-800 hover:border-amber-500/50 shadow-xl flex flex-col justify-between transition-all">
              
              <div className="space-y-4">
                {/* Badge header */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/20">
                    <FolderArchive size={14} className="text-amber-400" />
                    📦 Opción B (Portabilidad)
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    Hosting Propio / ZIP
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-black text-white tracking-tight">
                    Descargar Web Autónoma (.ZIP)
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Descarga el paquete completo con el código HTML, estilos e instrucciones listo para subir a cualquier hosting tradicional (cPanel, Hostinger) o WordPress.
                  </p>
                </div>

                {/* Features list */}
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check size={15} className="text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>100% Autónomo:</strong> Doble clic en tu computadora y se abre en Chrome sin necesidad de servidores.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={15} className="text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Para Hosting Tradicional:</strong> Se sube directo a <code className="text-amber-300 bg-amber-950/80 px-1 py-0.5 rounded">public_html</code> en cPanel, Apache o Hostinger.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={15} className="text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Compatible con WordPress:</strong> Puedes embeber el HTML o enlazarlo como subdominio.</span>
                  </li>
                </ul>

                {/* Package content pill */}
                <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 text-[11px] text-slate-400 space-y-1 font-mono">
                  <div className="text-white font-bold flex items-center gap-1.5">
                    <FileCode size={13} className="text-amber-400" />
                    Contenido del archivo ZIP:
                  </div>
                  <div className="pl-4 text-[10px] space-y-0.5 text-slate-400">
                    <div>📁 landing-{landing.slug}/</div>
                    <div>├── 📄 index.html <span className="text-slate-500">(Web completa)</span></div>
                    <div>├── 📝 LEEME_INSTRUCCIONES.txt <span className="text-slate-500">(Guía paso a paso)</span></div>
                    <div>└── 📊 datos_landing_ia.json <span className="text-slate-500">(Textos y copies)</span></div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-2">
                <button
                  onClick={handleDownloadZipPackage}
                  disabled={isDownloadingZip}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
                >
                  <Download size={16} />
                  <span>
                    {isDownloadingZip 
                      ? 'Generando paquete ZIP...' 
                      : zipSuccess 
                        ? '¡Paquete ZIP Descargado!' 
                        : 'Descargar Paquete Completo (.ZIP)'}
                  </span>
                </button>

                <button
                  onClick={handleDownloadHtmlOnly}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
                >
                  <FileCode size={14} className="text-amber-400" />
                  <span>{htmlSuccess ? '¡Archivo HTML Descargado!' : 'Descargar solo archivo .HTML independiente'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Bottom Clarifying Summary */}
          <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-slate-300">
              <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
              <span>
                <strong>Flexibilidad total para Cusco Creativos:</strong> Puedes usar la Nube (Opción A) para crear y mostrar demos en 3 minutos, y descargar el código (Opción B) si el cliente exige tener sus propios archivos.
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white font-bold text-xs shrink-0 cursor-pointer ml-auto"
            >
              Cerrar
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
