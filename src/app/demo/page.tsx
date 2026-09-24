"use client";

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  FileText, Globe, CalendarDays, Sparkles, TrendingUp, ArrowUpRight, 
  ExternalLink, Eye, Search, Filter, Copy, Check, Trash2, ToggleLeft, ToggleRight, Download,
  Layers, Pin, LayoutTemplate, LayoutGrid, List, User, Tag
} from 'lucide-react';
import DeploymentModal from '@/components/common/DeploymentModal';
import { getStoredLandings, updateLandingStatus, deleteLandingFromStorage, LandingData } from '@/data/landingStore';

export default function DemoDashboard() {
  const [projects, setProjects] = useState<LandingData[]>(() => getStoredLandings());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [objectiveFilter, setObjectiveFilter] = useState<'all' | 'whatsapp' | 'quote' | 'both'>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [selectedLandingForDeploy, setSelectedLandingForDeploy] = useState<LandingData | null>(null);

  useEffect(() => {
    const handleFocus = () => setProjects(getStoredLandings());
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.guideName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchesObjective = objectiveFilter === 'all' || p.objective === objectiveFilter;

      return matchesSearch && matchesStatus && matchesObjective;
    });
  }, [projects, searchQuery, statusFilter, objectiveFilter]);


  const totalPublished = projects.filter(p => p.status === 'published').length;
  const totalLandings = projects.length;
  const totalViews = projects.reduce((acc, curr) => acc + (parseInt(curr.views || '0', 10) || 0), 0);

  const handleToggleStatus = (id: string, currentStatus: 'published' | 'draft') => {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published';
    const updated = updateLandingStatus(id, nextStatus);
    setProjects(updated);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`¿Estás seguro de eliminar el proyecto "${name}"?`)) {
      const updated = deleteLandingFromStorage(id);
      setProjects(updated);
    }
  };

  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin}/p/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-7 animate-in fade-in slide-in-from-bottom-3 duration-500">
      
      {/* 1. TOP HERO HEADER WITH WORKFLOW EXPLANATION & CTA (UX Upgrade: Located at the very top) */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-7 sm:p-8 rounded-3xl shadow-xl border border-slate-800 text-white relative overflow-hidden">
        {/* Background decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
              <Sparkles size={14} className="text-blue-400" />
              <span>Generador de Landing Pages • Agencia Cusco Creativos</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white">
              Gestor de Landings de Alto Rendimiento
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Crea páginas web para guías de turismo en 3 minutos con Inteligencia Artificial. Comparte el enlace en vivo para aprobación inmediata por WhatsApp y exporta con dominio propio o en archivo ZIP.
            </p>

            {/* 3 Step Workflow Badges */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-slate-300 font-semibold shadow-xs">
                <span className="w-5 h-5 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-[11px]">1</span>
                <span>Genera datos con IA</span>
              </span>
              <span className="text-slate-600">→</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-slate-300 font-semibold shadow-xs">
                <span className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[11px]">2</span>
                <span>Previsualiza y aprueba en vivo</span>
              </span>
              <span className="text-slate-600">→</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-slate-300 font-semibold shadow-xs">
                <span className="w-5 h-5 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-[11px]">3</span>
                <span>Vercel (Dominio) o ZIP</span>
              </span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="shrink-0 w-full lg:w-auto">
            <Link 
              href="/demo/new" 
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-2xl font-extrabold transition-all shadow-lg shadow-blue-600/30 hover:scale-102 active:scale-98 text-sm"
            >
              <Sparkles size={18} />
              <span>Generador de Landing con IA</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. INTERACTIVE METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 hover:border-blue-300 transition-all group">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Proyectos</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{totalLandings}</span>
            <span className="text-xs text-slate-400 font-medium">landings</span>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <span className="text-emerald-600 font-bold flex items-center"><ArrowUpRight size={14} /> 100%</span> optimizadas
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 hover:border-emerald-300 transition-all group">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Publicadas Online</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{totalPublished}</span>
            <span className="text-xs text-emerald-600 font-bold">
              {Math.round((totalPublished / (totalLandings || 1)) * 100)}% del catálogo
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Visibles con dominio público</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 hover:border-indigo-300 transition-all group">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vistas Registradas</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Eye size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{totalViews.toLocaleString()}</span>
            <span className="text-xs text-indigo-600 font-bold">+18% sem.</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Impactos a turistas potenciales</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 hover:border-amber-300 transition-all group">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Conversión WhatsApp</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">14.8%</span>
            <span className="text-xs text-amber-600 font-bold">Promedio</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Clicks directos a contacto</p>
        </div>
      </div>

      {/* Quick Services & Inspiration Access Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Diseños Disponibles Landing Pages */}
        <Link 
          href="/demo/pinterest"
          className="p-4 rounded-2xl bg-white border border-blue-200/90 shadow-2xs hover:border-blue-400 hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <LayoutTemplate size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block group-hover:text-blue-600 transition-colors">Diseños Disponibles Landing Pages</span>
              <span className="text-[11px] text-slate-500">Beneficios, paletas de colores, tipografía y estilos visuales</span>
            </div>
          </div>
          <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">Explorar →</span>
        </Link>

        {/* Card 2: Guía de Niveles */}
        <Link 
          href="/demo/plans"
          className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Layers size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block group-hover:text-blue-600 transition-colors">Guía de Estructura y Niveles</span>
              <span className="text-[11px] text-slate-500">Manual técnico del creador: qué secciones se activan en cada versión</span>
            </div>
          </div>
          <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">Ver matriz →</span>
        </Link>
      </div>

      {/* 3. CONTROL BAR: SEARCH & INTERACTIVE FILTER TABS */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
          
          {/* Search Input */}
          <div className="relative w-full lg:w-96">
            <Search size={17} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por tour, guía, destino o ruta..."
              className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl border border-slate-200/90 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400 bg-slate-50/40 focus:bg-white"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200/60 transition-colors"
                title="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            
            {/* Status Filter */}
            <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/60 shadow-2xs">
              <span className="px-2 text-slate-400 font-semibold flex items-center gap-1 text-[11px]">
                <Filter size={12} /> Estado:
              </span>
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer text-xs ${
                  statusFilter === 'all' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todos ({projects.length})
              </button>
              <button
                onClick={() => setStatusFilter('published')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer text-xs ${
                  statusFilter === 'published' ? 'bg-white text-emerald-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Publicados ({totalPublished})
              </button>
              <button
                onClick={() => setStatusFilter('draft')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer text-xs ${
                  statusFilter === 'draft' ? 'bg-white text-amber-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Borradores ({projects.length - totalPublished})
              </button>
            </div>

            {/* Objective Filter Toggle */}
            <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/60 shadow-2xs">
              <button
                onClick={() => {
                  if (objectiveFilter === 'all') setObjectiveFilter('whatsapp');
                  else if (objectiveFilter === 'whatsapp') setObjectiveFilter('quote');
                  else if (objectiveFilter === 'quote') setObjectiveFilter('both');
                  else setObjectiveFilter('all');
                }}
                className="px-3 py-1.5 rounded-lg bg-white shadow-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer hover:bg-slate-50 transition-colors text-xs"
                title="Alternar filtro por objetivo comercial"
              >
                <span className="text-slate-400 text-[11px]">Obj:</span>
                <span className="text-blue-600 font-extrabold">
                  {objectiveFilter === 'all' ? 'Todos' : objectiveFilter === 'whatsapp' ? '💬 WhatsApp' : objectiveFilter === 'quote' ? '📋 Cotización' : '⚡ Ambos'}
                </span>
              </button>
            </div>

            {/* View Mode Switcher (Tarjetas vs Tabla) */}
            <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/60 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer text-xs ${
                  viewMode === 'cards' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Vista en tarjetas cuadrícula"
              >
                <LayoutGrid size={13} />
                <span>Tarjetas</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer text-xs ${
                  viewMode === 'table' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Vista en tabla ordenada"
              >
                <List size={13} />
                <span>Tabla</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* VISTA 1: TARJETAS RESPONSIVAS (CERO SCROLL HORIZONTAL)   */}
        {/* ========================================================= */}
        {viewMode === 'cards' && (
          <div className="pt-2">
            {filteredProjects.length === 0 ? (
              <div className="py-12 text-center text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <p className="font-semibold text-slate-600 text-base">No se encontraron landings con esos filtros</p>
                <p className="text-xs mt-1">Intenta limpiar la búsqueda o cambiar los filtros seleccionados.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setStatusFilter('all'); setObjectiveFilter('all'); }}
                  className="mt-3 text-xs text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Restablecer Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProjects.map((p) => {
                  const isPublished = p.status === 'published';
                  const isCopied = copiedSlug === p.slug;

                  return (
                    <div 
                      key={p.id} 
                      className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4 group"
                    >
                      {/* Card Top: Icon, Name, Tier, Status Toggle */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold text-lg border border-blue-100 shadow-xs">
                              {p.template === 'agency-portal' ? '🔥' : p.template === 'adventure' ? '🏔️' : p.template === 'premium' ? '✨' : p.template === 'boho-nature' ? '📷' : '🏛️'}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                                  (p.tier || 'advance') === 'advance'
                                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                                    : (p.tier || 'advance') === 'pro'
                                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                                    : (p.tier || 'advance') === 'basic'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-stone-100 text-stone-700 border-stone-300'
                                }`}>
                                  {p.tier || 'advance'}
                                </span>
                                <span className={`text-[11px] font-bold ${
                                  p.template === 'agency-portal' 
                                    ? 'text-[#FF5500]' 
                                    : p.template === 'premium'
                                    ? 'text-amber-600 font-extrabold'
                                    : 'text-slate-500 capitalize'
                                }`}>
                                  {p.template === 'agency-portal' ? 'Diseño 1' : p.template === 'premium' ? '👑 Luxury VIP' : p.template}
                                </span>
                              </div>
                              <Link 
                                href={`/demo/preview?slug=${p.slug}`}
                                className="font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors text-base block truncate mt-0.5"
                                title={p.name}
                              >
                                {p.name}
                              </Link>
                            </div>
                          </div>

                          {/* Toggle Status */}
                          <button
                            onClick={() => handleToggleStatus(p.id, p.status)}
                            className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold transition-all cursor-pointer shadow-2xs ${
                              isPublished 
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300/60' 
                                : 'bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300/60'
                            }`}
                            title="Clic para alternar estado"
                          >
                            <span className={`w-2 h-2 rounded-full ${isPublished ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                            <span>{isPublished ? 'PUBLICADO' : 'BORRADOR'}</span>
                          </button>
                        </div>

                        {/* Meta specs */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Guía y Tarifa</span>
                            <span className="font-bold text-slate-700 block truncate">{p.guideName || 'No asignado'}</span>
                            <span className="text-emerald-700 font-extrabold text-xs">{p.price || 'S/ Consultar'}</span>
                          </div>

                          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Objetivo & Impactos</span>
                            <span className="font-bold text-slate-700 block truncate">
                              {p.objective === 'both' ? '⚡ Híbrido' : p.objective === 'whatsapp' ? '💬 WhatsApp' : '📋 Cotización'}
                            </span>
                            <span className="text-slate-500 text-xs font-mono font-bold">👁️ {p.views || '0'} vistas</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Actions Bottom */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-1">
                          <Link
                            href={`/demo/preview?slug=${p.slug}`}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-xl font-bold text-xs transition-all shadow-xs"
                          >
                            <Eye size={14} />
                            <span>Ver / Editar</span>
                          </Link>
                          
                          <button
                            onClick={() => setSelectedLandingForDeploy(p)}
                            className="inline-flex items-center justify-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-3 py-2 rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-xs"
                            title="Exportar ZIP o Dominio"
                          >
                            <Download size={13} className="text-amber-700" />
                            <span>Exportar</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-1">
                          <a
                            href={`/p/${p.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 transition-all text-xs"
                            title="Abrir página en pestaña nueva"
                          >
                            <ExternalLink size={14} />
                          </a>

                          <button
                            onClick={() => handleCopyLink(p.slug)}
                            className={`p-2 rounded-xl text-xs font-medium transition-all border cursor-pointer ${
                              isCopied 
                                ? 'bg-emerald-600 text-white border-emerald-600' 
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 border-slate-200'
                            }`}
                            title="Copiar enlace"
                          >
                            {isCopied ? <Check size={14} /> : <Copy size={14} />}
                          </button>

                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-xl transition-colors text-xs cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* VISTA 2: TABLA MODERNA Y FLUIDA (ESTILO SAAS PREMIUM)     */}
        {/* ========================================================= */}
        {viewMode === 'table' && (
          <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden animate-in fade-in duration-300">
            {/* Table Scrollable Container with Hidden Scrollbars */}
            <div className="overflow-x-auto modern-table-container">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/90 text-slate-500 text-[11px] uppercase tracking-wider font-extrabold border-b border-slate-200/80 select-none">
                    <th className="px-5 py-3.5 min-w-[250px]">Tour & Guía Asignado</th>
                    <th className="px-3.5 py-3.5 hidden md:table-cell whitespace-nowrap">Plantilla</th>
                    <th className="px-3.5 py-3.5 hidden sm:table-cell whitespace-nowrap">Objetivo</th>
                    <th className="px-3.5 py-3.5 whitespace-nowrap">Estado</th>
                    <th className="px-3.5 py-3.5 hidden lg:table-cell whitespace-nowrap text-center">Vistas</th>
                    <th className="px-4 py-3.5 hidden xl:table-cell whitespace-nowrap min-w-[130px]">Fecha</th>
                    <th className="px-5 py-3.5 whitespace-nowrap text-right min-w-[290px]">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                        <p className="font-semibold text-slate-600 text-base">No se encontraron landings con esos filtros</p>
                        <p className="text-xs mt-1">Intenta limpiar la búsqueda o cambiar los filtros seleccionados.</p>
                        <button 
                          onClick={() => { setSearchQuery(''); setStatusFilter('all'); setObjectiveFilter('all'); }}
                          className="mt-3 text-xs text-blue-600 font-bold hover:underline cursor-pointer"
                        >
                          Restablecer Filtros
                        </button>
                      </td>
                    </tr>
                  ) : (
                    filteredProjects.map((p) => {
                      const isPublished = p.status === 'published';
                      const isCopied = copiedSlug === p.slug;

                      return (
                        <tr key={p.id} className="hover:bg-slate-50/70 transition-colors group">
                          
                          {/* Tour Name & Guide (Badges limpios sin quiebres de texto antiestéticos) */}
                          <td className="px-4 py-3.5">
                            <div className="flex items-start gap-2.5">
                              <div className="w-9 h-9 rounded-xl bg-slate-100/90 group-hover:bg-blue-50 text-slate-700 group-hover:text-blue-600 flex items-center justify-center shrink-0 text-base border border-slate-200/80 group-hover:border-blue-200 transition-colors shadow-2xs mt-0.5">
                                {p.template === 'agency-portal' ? '🔥' : p.template === 'adventure' ? '🏔️' : p.template === 'premium' ? '👑' : p.template === 'boho-nature' ? '📷' : '🏛️'}
                              </div>
                              <div className="min-w-0 space-y-1 flex-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <Link 
                                    href={`/demo/preview?slug=${p.slug}`} 
                                    className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm leading-snug line-clamp-1"
                                    title={p.name}
                                  >
                                    {p.name}
                                  </Link>
                                  <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md border shrink-0 ${
                                    (p.tier || 'advance') === 'advance'
                                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                                      : (p.tier || 'advance') === 'pro'
                                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                                      : (p.tier || 'advance') === 'basic'
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                      : 'bg-stone-100 text-stone-700 border-stone-300'
                                  }`}>
                                    {p.tier || 'advance'}
                                  </span>
                                </div>

                                {/* Guía y Precio en badges estructurados con whitespace-nowrap */}
                                <div className="flex items-center gap-1.5 flex-wrap text-xs">
                                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100/90 border border-slate-200/70 px-2 py-0.5 rounded-md whitespace-nowrap">
                                    <User size={11} className="text-slate-400 shrink-0" />
                                    <span>Guía: <strong className="text-slate-800 font-semibold">{p.guideName || 'No asignado'}</strong></span>
                                  </span>
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md whitespace-nowrap">
                                    <Tag size={11} className="text-emerald-500 shrink-0" />
                                    <span>{p.price || 'S/ Consultar'}</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Template */}
                          <td className="px-3 py-3.5 hidden md:table-cell whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
                              p.template === 'agency-portal' 
                                ? 'bg-orange-50 text-[#FF5500] border border-orange-200 font-bold' 
                                : p.template === 'premium'
                                ? 'bg-amber-50 text-amber-600 border border-amber-300 font-bold'
                                : 'capitalize bg-slate-100 text-slate-600 border border-slate-200/60'
                            }`}>
                              {p.template === 'agency-portal' ? 'Diseño 1' : p.template === 'premium' ? '👑 Luxury VIP' : p.template}
                            </span>
                          </td>

                          {/* Objective */}
                          <td className="px-3 py-3.5 hidden sm:table-cell whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold ${
                              p.objective === 'both'
                                ? 'bg-purple-50 text-purple-700 border border-purple-200/60'
                                : p.objective === 'whatsapp' 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' 
                                  : 'bg-blue-50 text-blue-700 border border-blue-200/60'
                            }`}>
                              {p.objective === 'both' ? '⚡ Híbrido' : p.objective === 'whatsapp' ? '💬 WhatsApp' : '📋 Cotización'}
                            </span>
                          </td>

                          {/* Status with interactive Toggle */}
                          <td className="px-3 py-3.5 whitespace-nowrap">
                            <button
                              onClick={() => handleToggleStatus(p.id, p.status)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer shadow-2xs ${
                                isPublished 
                                  ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200' 
                                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                              }`}
                              title="Clic para cambiar entre Publicado y Borrador"
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                              <span>{isPublished ? 'Publicado' : 'Borrador'}</span>
                              {isPublished ? <ToggleRight size={14} className="text-emerald-600" /> : <ToggleLeft size={14} className="text-amber-600" />}
                            </button>
                          </td>

                          {/* Views */}
                          <td className="px-3 py-3.5 hidden lg:table-cell text-xs font-mono font-bold text-slate-600 whitespace-nowrap text-center">
                            <span className="px-2 py-0.5 bg-slate-100 rounded-md">
                              {p.views || '0'}
                            </span>
                          </td>

                          {/* Date: Libre de solapamiento, 100% visible */}
                          <td className="px-4 py-3.5 hidden xl:table-cell text-xs text-slate-600 font-medium whitespace-nowrap min-w-[130px]">
                            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60 w-fit">
                              <CalendarDays size={13} className="text-slate-400 shrink-0" />
                              <span className="font-mono text-xs font-bold text-slate-700">{p.date}</span>
                            </div>
                          </td>

                          {/* Action buttons: Flujo natural sin encimarse sobre Fecha */}
                          <td className="px-5 py-3.5 text-right whitespace-nowrap min-w-[290px]">
                            <div className="flex items-center justify-end gap-1.5">
                              
                              {/* Primary: Ver / Editar */}
                              <Link
                                href={`/demo/preview?slug=${p.slug}`}
                                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-xs hover:scale-102 active:scale-98 shrink-0"
                                title="Abrir editor y previsualizador"
                              >
                                <Eye size={13} />
                                <span>Ver / Editar</span>
                              </Link>

                              {/* Export / Deploy Modal */}
                              <button
                                onClick={() => setSelectedLandingForDeploy(p)}
                                className="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/90 px-2.5 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer shrink-0"
                                title="Exportar ZIP o desplegar en Vercel"
                              >
                                <Download size={13} className="text-amber-700" />
                                <span>Exportar</span>
                              </button>

                              {/* Fast Action Icons in clean tactile 32px buttons */}
                              <div className="flex items-center gap-1 ml-1 border-l border-slate-200/80 pl-1.5 shrink-0">
                                <a
                                  href={`/p/${p.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-8 h-8 rounded-xl bg-slate-100/90 hover:bg-blue-50 text-slate-500 hover:text-blue-600 border border-slate-200/80 flex items-center justify-center transition-all hover:scale-105"
                                  title="Abrir página pública en pestaña nueva"
                                >
                                  <ExternalLink size={14} />
                                </a>

                                <button
                                  onClick={() => handleCopyLink(p.slug)}
                                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-105 border cursor-pointer ${
                                    isCopied 
                                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                                      : 'bg-slate-100/90 hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 border-slate-200/80'
                                  }`}
                                  title={isCopied ? '¡Enlace copiado!' : 'Copiar enlace público'}
                                >
                                  {isCopied ? <Check size={14} /> : <Copy size={14} />}
                                </button>

                                <button
                                  onClick={() => handleDelete(p.id, p.name)}
                                  className="w-8 h-8 rounded-xl bg-slate-100/90 hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200/80 flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
                                  title="Eliminar proyecto"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer: Elegante resumen de datos y estados */}
            <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span>Mostrando <strong className="font-bold text-slate-700">{filteredProjects.length}</strong> de <strong className="font-bold text-slate-700">{projects.length}</strong> landings</span>
                {(searchQuery || statusFilter !== 'all' || objectiveFilter !== 'all') && (
                  <button
                    onClick={() => { setSearchQuery(''); setStatusFilter('all'); setObjectiveFilter('all'); }}
                    className="text-blue-600 font-bold hover:underline ml-1 cursor-pointer"
                  >
                    (Limpiar filtros)
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4 text-[11px] font-medium text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>{totalPublished} Publicadas</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>{totalLandings - totalPublished} Borradores</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-400">
                  <span>{totalViews} vistas acumuladas</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Deployment & Export Modal */}
      {selectedLandingForDeploy && (
        <DeploymentModal
          isOpen={!!selectedLandingForDeploy}
          onClose={() => setSelectedLandingForDeploy(null)}
          landing={selectedLandingForDeploy}
        />
      )}
    </div>
  );
}
