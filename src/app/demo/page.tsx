"use client";

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  FileText, Globe, CalendarDays, Sparkles, TrendingUp, ArrowUpRight, 
  ExternalLink, Eye, Search, Filter, Copy, Check, Trash2, ToggleLeft, ToggleRight, Download
} from 'lucide-react';
import DeploymentModal from '@/components/common/DeploymentModal';
import { getStoredLandings, updateLandingStatus, deleteLandingFromStorage, LandingData } from '@/data/landingStore';

export default function DemoDashboard() {
  const [projects, setProjects] = useState<LandingData[]>(() => getStoredLandings());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [objectiveFilter, setObjectiveFilter] = useState<'all' | 'whatsapp' | 'quote'>('all');
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
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-100">
            <Sparkles size={14} /> Panel de Control Turístico
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Gestor de Landings de Alto Rendimiento
          </h1>
          <p className="text-slate-500 mt-1 text-sm max-w-2xl">
            Monitorea el tráfico de tus tours, actualiza estados en tiempo real y genera landings persuasivas con IA en segundos.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <Link 
            href="/demo/new" 
            className="w-full lg:w-auto inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] text-sm"
          >
            <Sparkles size={18} />
            <span>Nueva Landing con IA</span>
          </Link>
        </div>
      </div>

      {/* Interactive Metric Cards */}
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

      {/* Control Bar: Search & Interactive Filter Tabs */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre del tour, guía o ruta..."
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

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium text-slate-600">
              <span className="px-2 text-slate-400 flex items-center gap-1"><Filter size={12} /> Estado:</span>
              <button 
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === 'all' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'hover:text-slate-900'}`}
              >
                Todos ({projects.length})
              </button>
              <button 
                onClick={() => setStatusFilter('published')}
                className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === 'published' ? 'bg-white text-emerald-700 shadow-sm font-bold' : 'hover:text-slate-900'}`}
              >
                Publicados ({projects.filter(p => p.status === 'published').length})
              </button>
              <button 
                onClick={() => setStatusFilter('draft')}
                className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === 'draft' ? 'bg-white text-amber-700 shadow-sm font-bold' : 'hover:text-slate-900'}`}
              >
                Borradores ({projects.filter(p => p.status === 'draft').length})
              </button>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium text-slate-600">
              <button 
                onClick={() => setObjectiveFilter(objectiveFilter === 'all' ? 'whatsapp' : objectiveFilter === 'whatsapp' ? 'quote' : 'all')}
                className="px-3 py-1.5 rounded-lg bg-white shadow-sm font-bold text-slate-800 flex items-center gap-1.5"
                title="Alternar filtro por objetivo comercial"
              >
                <span>Obj:</span>
                <span className="text-blue-600">
                  {objectiveFilter === 'all' ? 'Todos' : objectiveFilter === 'whatsapp' ? 'WhatsApp' : 'Cotización'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Projects Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider font-bold border-b border-slate-200/60">
                <th className="px-6 py-4">Tour & Guía Asignado</th>
                <th className="px-4 py-4">Plantilla</th>
                <th className="px-4 py-4">Objetivo</th>
                <th className="px-4 py-4">Estado</th>
                <th className="px-4 py-4">Vistas</th>
                <th className="px-4 py-4">Fecha</th>
                <th className="px-6 py-4 text-right">Acciones Rápidas</th>
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
                      className="mt-3 text-xs text-blue-600 font-bold hover:underline"
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
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs border border-blue-100">
                            {p.template === 'adventure' ? '🏔️' : p.template === 'premium' ? '✨' : '🏛️'}
                          </div>
                          <div>
                            <Link 
                              href={`/demo/preview?slug=${p.slug}`} 
                              className="font-bold text-slate-900 hover:text-blue-600 transition-colors block line-clamp-1"
                            >
                              {p.name}
                            </Link>
                            <span className="text-xs text-slate-400 block mt-0.5">
                              Guía: <strong className="text-slate-600 font-medium">{p.guideName || 'No asignado'}</strong> • {p.price || 'S/ Consultar'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Template */}
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold capitalize bg-slate-100 text-slate-700">
                          {p.template}
                        </span>
                      </td>

                      {/* Objective */}
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          p.objective === 'whatsapp' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                        }`}>
                          {p.objective === 'whatsapp' ? '💬 WhatsApp' : '📋 Cotización'}
                        </span>
                      </td>

                      {/* Status with interactive Toggle */}
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleToggleStatus(p.id, p.status)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            isPublished ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          }`}
                          title="Clic para cambiar estado"
                        >
                          <span className={`w-2 h-2 rounded-full ${isPublished ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          <span>{isPublished ? 'PUBLICADO' : 'BORRADOR'}</span>
                          {isPublished ? <ToggleRight size={14} className="text-emerald-700" /> : <ToggleLeft size={14} className="text-amber-700" />}
                        </button>
                      </td>

                      {/* Views */}
                      <td className="px-4 py-4 text-xs font-mono font-bold text-slate-600">
                        {p.views || '0'}
                      </td>

                      {/* Date */}
                      <td className="px-4 py-4 text-xs text-slate-400 font-medium">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          {p.date}
                        </div>
                      </td>

                      {/* Action buttons */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          
                          {/* Direct Accessible Open in Chrome */}
                          <a
                            href={`/p/${p.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-sm shadow-emerald-600/20 hover:scale-105"
                            title="Abrir landing page pública en Chrome"
                          >
                            <Globe size={13} />
                            <span>Abrir en Chrome</span>
                            <ExternalLink size={12} />
                          </a>

                          {/* Preview / Edit */}
                          <Link
                            href={`/demo/preview?slug=${p.slug}`}
                            className="inline-flex items-center gap-1 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 px-2.5 py-1.5 rounded-xl font-semibold text-xs transition-colors"
                            title="Abrir vista previa y editor"
                          >
                            <Eye size={14} />
                            <span className="hidden sm:inline">Editor</span>
                          </Link>

                          {/* Export / Download / Deploy Options */}
                          <button
                            onClick={() => setSelectedLandingForDeploy(p)}
                            className="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 px-2.5 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                            title="Descargar código ZIP/HTML o ver opciones de despliegue en Vercel"
                          >
                            <Download size={13} className="text-amber-700" />
                            <span className="hidden xl:inline">Exportar</span>
                          </button>

                          {/* Copy Public Link */}
                          <button
                            onClick={() => handleCopyLink(p.slug)}
                            className={`p-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1 ${
                              isCopied ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                            title="Copiar link público para clientes"
                          >
                            {isCopied ? <Check size={14} /> : <Copy size={14} />}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors text-xs"
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
