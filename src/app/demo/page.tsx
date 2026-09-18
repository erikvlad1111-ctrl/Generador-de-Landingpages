"use client";

import { useEffect, useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { 
  FileText, Globe, CalendarDays, Sparkles, TrendingUp, ArrowUpRight, 
  ExternalLink, Eye, Search, Filter, Copy, Check, Trash2, ToggleLeft, ToggleRight, Download,
  MoveHorizontal, ChevronLeft, ChevronRight, Layers, Pin, LayoutTemplate,
  LayoutGrid, List, SlidersHorizontal
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
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const tableScrollRef = useRef<HTMLDivElement>(null);

  const updateScrollState = () => {
    if (tableScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tableScrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(Math.round((scrollLeft / maxScroll) * 100));
        setCanScrollLeft(scrollLeft > 5);
        setCanScrollRight(scrollLeft < maxScroll - 5);
      } else {
        setScrollProgress(0);
        setCanScrollLeft(false);
        setCanScrollRight(false);
      }
    }
  };

  const handleSliderChange = (val: number) => {
    if (tableScrollRef.current) {
      const { scrollWidth, clientWidth } = tableScrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      tableScrollRef.current.scrollLeft = (val / 100) * maxScroll;
      setScrollProgress(val);
    }
  };

  const scrollTable = (direction: 'left' | 'right') => {
    if (tableScrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      tableScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(updateScrollState, 150);
    }
  };

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

  useEffect(() => {
    if (viewMode === 'table') {
      setTimeout(updateScrollState, 100);
      window.addEventListener('resize', updateScrollState);
      return () => window.removeEventListener('resize', updateScrollState);
    }
  }, [viewMode, filteredProjects]);

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
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por tour, guía, destino o ruta..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs">
            
            {/* Status Filter */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <span className="px-2 text-slate-400 font-semibold flex items-center gap-1">
                <Filter size={12} /> Estado:
              </span>
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  statusFilter === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todos ({projects.length})
              </button>
              <button
                onClick={() => setStatusFilter('published')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  statusFilter === 'published' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Publicados ({totalPublished})
              </button>
              <button
                onClick={() => setStatusFilter('draft')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  statusFilter === 'draft' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Borradores ({projects.length - totalPublished})
              </button>
            </div>

            {/* Objective Filter Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => {
                  if (objectiveFilter === 'all') setObjectiveFilter('whatsapp');
                  else if (objectiveFilter === 'whatsapp') setObjectiveFilter('quote');
                  else if (objectiveFilter === 'quote') setObjectiveFilter('both');
                  else setObjectiveFilter('all');
                }}
                className="px-3 py-1.5 rounded-lg bg-white shadow-sm font-bold text-slate-800 flex items-center gap-1.5 cursor-pointer"
                title="Alternar filtro por objetivo comercial"
              >
                <span>Obj:</span>
                <span className="text-blue-600">
                  {objectiveFilter === 'all' ? 'Todos' : objectiveFilter === 'whatsapp' ? 'WhatsApp' : objectiveFilter === 'quote' ? 'Cotización' : 'Ambos'}
                </span>
              </button>
            </div>

            {/* View Mode Switcher (Tarjetas vs Tabla) */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'cards' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Vista en tarjetas: Todo visible y ordenado sin necesidad de desplazar horizontalmente"
              >
                <LayoutGrid size={13} />
                <span>Tarjetas</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'table' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Vista en tabla con deslizador persistente"
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
                              {p.template === 'adventure' ? '🏔️' : p.template === 'premium' ? '✨' : p.template === 'boho-nature' ? '📷' : '🏛️'}
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
                                <span className="text-[11px] text-slate-400 capitalize font-medium">{p.template}</span>
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
        {/* VISTA 2: TABLA EXPANDIDA CON DESLIZADOR PERSISTENTE       */}
        {/* ========================================================= */}
        {viewMode === 'table' && (
          <div className="space-y-3">
            {/* Top Table Header Navigation & Indicator */}
            <div className="flex items-center justify-between gap-3 px-1 pt-1 pb-0.5 select-none">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200/80 shadow-2xs">
                  <MoveHorizontal size={14} className="text-blue-600" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                    Desplazamiento horizontal ({scrollProgress}%)
                  </span>
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  • Las acciones rápidas permanecen ancladas a la derecha
                </span>
              </div>

              {/* Visual Icon-Only Navigation Pill */}
              <div className="flex items-center bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80 shadow-inner">
                <button
                  type="button"
                  onClick={() => scrollTable('left')}
                  disabled={!canScrollLeft}
                  className="w-8 h-8 rounded-xl flex items-center justify-center bg-white text-slate-700 hover:text-white hover:bg-blue-600 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-700 active:scale-95 transition-all shadow-xs border border-slate-200/60 hover:border-blue-600 cursor-pointer"
                  title="Desplazar hacia la izquierda"
                  aria-label="Desplazar hacia la izquierda"
                >
                  <ChevronLeft size={18} strokeWidth={2.5} />
                </button>

                <div className="px-2 flex items-center gap-1 text-slate-400">
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors ${canScrollLeft ? 'bg-blue-500' : 'bg-slate-300'}`}></span>
                  <MoveHorizontal size={13} className="text-slate-400" />
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors ${canScrollRight ? 'bg-blue-500' : 'bg-slate-300'}`}></span>
                </div>

                <button
                  type="button"
                  onClick={() => scrollTable('right')}
                  disabled={!canScrollRight}
                  className="w-8 h-8 rounded-xl flex items-center justify-center bg-white text-slate-700 hover:text-white hover:bg-blue-600 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-700 active:scale-95 transition-all shadow-xs border border-slate-200/60 hover:border-blue-600 cursor-pointer"
                  title="Desplazar hacia la derecha"
                  aria-label="Desplazar hacia la derecha"
                >
                  <ChevronRight size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Expansive Table Wrapper */}
            <div 
              ref={tableScrollRef}
              onScroll={updateScrollState}
              className="overflow-x-auto rounded-2xl border border-slate-200/80 table-scrollbar bg-white shadow-xs relative"
            >
              <table className="w-full min-w-[1080px] text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/90 text-slate-500 text-xs uppercase tracking-wider font-extrabold border-b border-slate-200/80">
                    <th className="px-6 py-4 min-w-[320px]">Tour & Guía Asignado</th>
                    <th className="px-4 py-4 min-w-[120px] whitespace-nowrap">Plantilla</th>
                    <th className="px-4 py-4 min-w-[140px] whitespace-nowrap">Objetivo</th>
                    <th className="px-4 py-4 min-w-[140px] whitespace-nowrap">Estado</th>
                    <th className="px-4 py-4 min-w-[90px] whitespace-nowrap text-center">Vistas</th>
                    <th className="px-4 py-4 min-w-[120px] whitespace-nowrap">Fecha</th>
                    {/* Sticky Actions Column: Permanece siempre visible */}
                    <th className="sticky right-0 z-20 bg-slate-50/95 backdrop-blur-xs shadow-[-10px_0_15px_-4px_rgba(0,0,0,0.06)] px-6 py-4 min-w-[280px] whitespace-nowrap text-right">
                      Acciones Rápidas
                    </th>
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
                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors group">
                          
                          {/* Tour Name & Guide */}
                          <td className="px-6 py-4.5">
                            <div className="flex items-center gap-3.5">
                              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs border border-blue-100 shadow-xs">
                                {p.template === 'adventure' ? '🏔️' : p.template === 'premium' ? '✨' : p.template === 'boho-nature' ? '📷' : '🏛️'}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <Link 
                                    href={`/demo/preview?slug=${p.slug}`} 
                                    className="font-extrabold text-slate-900 hover:text-blue-600 transition-colors block text-sm leading-snug whitespace-nowrap"
                                  >
                                    {p.name}
                                  </Link>
                                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${
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
                                <span className="text-xs text-slate-400 block mt-0.5 whitespace-nowrap">
                                  Guía: <strong className="text-slate-600 font-medium">{p.guideName || 'No asignado'}</strong> • <span className="text-emerald-700 font-semibold">{p.price || 'S/ Consultar'}</span>
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Template */}
                          <td className="px-4 py-4.5 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold capitalize bg-slate-100 text-slate-700 border border-slate-200/60">
                              {p.template}
                            </span>
                          </td>

                          {/* Objective */}
                          <td className="px-4 py-4.5 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
                              p.objective === 'both'
                                ? 'bg-purple-50 text-purple-700 border border-purple-200/60'
                                : p.objective === 'whatsapp' 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' 
                                  : 'bg-blue-50 text-blue-700 border border-blue-200/60'
                            }`}>
                              {p.objective === 'both' ? '⚡ Híbrido (Ambos)' : p.objective === 'whatsapp' ? '💬 WhatsApp' : '📋 Cotización'}
                            </span>
                          </td>

                          {/* Status with interactive Toggle */}
                          <td className="px-4 py-4.5 whitespace-nowrap">
                            <button
                              onClick={() => handleToggleStatus(p.id, p.status)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold transition-all cursor-pointer shadow-2xs ${
                                isPublished 
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300/60' 
                                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300/60'
                              }`}
                              title="Clic para alternar estado"
                            >
                              <span className={`w-2 h-2 rounded-full ${isPublished ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                              <span>{isPublished ? 'PUBLICADO' : 'BORRADOR'}</span>
                              {isPublished ? <ToggleRight size={15} className="text-emerald-700" /> : <ToggleLeft size={15} className="text-amber-700" />}
                            </button>
                          </td>

                          {/* Views */}
                          <td className="px-4 py-4.5 text-xs font-mono font-extrabold text-slate-700 whitespace-nowrap text-center">
                            {p.views || '0'}
                          </td>

                          {/* Date */}
                          <td className="px-4 py-4.5 text-xs text-slate-500 font-medium whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <CalendarDays size={14} className="text-slate-400" />
                              <span>{p.date}</span>
                            </div>
                          </td>

                          {/* Sticky Action buttons */}
                          <td className="sticky right-0 z-20 bg-white group-hover:bg-slate-50/95 backdrop-blur-xs transition-colors shadow-[-10px_0_15px_-4px_rgba(0,0,0,0.06)] px-6 py-4.5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              
                              {/* Primary: Editor / Vista Previa */}
                              <Link
                                href={`/demo/preview?slug=${p.slug}`}
                                className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 hover:border-blue-600 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all shadow-xs"
                                title="Abrir editor y previsualizador"
                              >
                                <Eye size={13} />
                                <span>Ver / Editar</span>
                              </Link>

                              {/* Export / Download / Deploy Options */}
                              <button
                                onClick={() => setSelectedLandingForDeploy(p)}
                                className="inline-flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-xs"
                                title="Descargar paquete ZIP/HTML o ver opciones de despliegue en Vercel"
                              >
                                <Download size={13} className="text-amber-700" />
                                <span>Exportar / ZIP</span>
                              </button>

                              {/* Direct Accessible Open in Chrome / New Tab */}
                              <a
                                href={`/p/${p.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-all text-xs"
                                title="Abrir landing page pública en una pestaña nueva"
                              >
                                <ExternalLink size={14} />
                              </a>

                              {/* Copy Public Link */}
                              <button
                                onClick={() => handleCopyLink(p.slug)}
                                className={`p-2 rounded-xl text-xs font-medium transition-all border cursor-pointer ${
                                  isCopied 
                                    ? 'bg-emerald-600 text-white border-emerald-600' 
                                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 border-slate-200'
                                }`}
                                title="Copiar link público para clientes"
                              >
                                {isCopied ? <Check size={14} /> : <Copy size={14} />}
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => handleDelete(p.id, p.name)}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-xl transition-colors text-xs cursor-pointer"
                                title="Eliminar proyecto"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* BARRA DESLIZADORA FLOTANTE PERSISTENTE (Sticky bottom al hacer scroll o bajar) */}
            <div className="sticky bottom-4 z-30 mx-auto max-w-2xl px-4 py-2.5 bg-slate-900/95 hover:bg-slate-900 backdrop-blur-md rounded-2xl border border-slate-700/80 shadow-2xl text-white flex items-center justify-between gap-3 sm:gap-4 transition-all animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 shrink-0">
                <SlidersHorizontal size={15} className="text-blue-400 shrink-0" />
                <span className="hidden sm:inline">Deslizar Columnas:</span>
                <span className="sm:hidden font-mono text-blue-400">{scrollProgress}%</span>
              </div>

              <div className="flex-1 flex items-center gap-2 max-w-md">
                <button
                  type="button"
                  onClick={() => scrollTable('left')}
                  disabled={!canScrollLeft}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition-colors cursor-pointer"
                  title="Desplazar a la izquierda"
                >
                  <ChevronLeft size={16} />
                </button>
                
                <div className="flex-1 relative flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scrollProgress}
                    onChange={(e) => handleSliderChange(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    aria-label="Deslizador horizontal de la tabla"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => scrollTable('right')}
                  disabled={!canScrollRight}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition-colors cursor-pointer"
                  title="Desplazar a la derecha"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono text-slate-400 font-bold">{scrollProgress}%</span>
                <button
                  type="button"
                  onClick={() => handleSliderChange(0)}
                  className="text-[11px] text-blue-400 hover:text-blue-300 hover:underline px-1 cursor-pointer font-medium"
                >
                  Inicio
                </button>
                <button
                  type="button"
                  onClick={() => handleSliderChange(100)}
                  className="text-[11px] text-blue-400 hover:text-blue-300 hover:underline px-1 cursor-pointer font-medium"
                >
                  Final
                </button>
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
