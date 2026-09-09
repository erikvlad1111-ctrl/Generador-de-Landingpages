"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Globe, CalendarDays, Sparkles, TrendingUp, ArrowUpRight, ExternalLink, Eye } from 'lucide-react';
import { getStoredLandings, LandingData } from '@/data/landingStore';

export default function DemoDashboard() {
  const [projects, setProjects] = useState<LandingData[]>(() => getStoredLandings());

  useEffect(() => {
    // Sync with external storage when window focuses
    const handleFocus = () => setProjects(getStoredLandings());
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const totalPublished = projects.filter(p => p.status === 'published').length;
  const totalLandings = projects.length;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50">
        <div>
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
            ¡Hola, Equipo Cusco! 👋
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Panel de gestión y generación de landing pages turísticas.</p>
        </div>
        <Link 
          href="/demo/new" 
          className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-full font-bold overflow-hidden transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02]"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          <Sparkles size={18} className="relative z-10" />
          <span className="relative z-10">Generar Nueva Landing</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            title: 'Total Landings Creadas', 
            value: totalLandings.toString(), 
            icon: <FileText size={24} className="text-blue-500" />, 
            trend: `${projects.length} proyectos`, 
            color: 'bg-blue-50' 
          },
          { 
            title: 'Páginas Publicadas', 
            value: totalPublished.toString(), 
            icon: <Globe size={24} className="text-emerald-500" />, 
            trend: `${Math.round((totalPublished / (totalLandings || 1)) * 100)}% activas`, 
            color: 'bg-emerald-50' 
          },
          { 
            title: 'Conversiones Estimadas', 
            value: '4.2k', 
            icon: <TrendingUp size={24} className="text-indigo-500" />, 
            trend: '+14% esta semana', 
            color: 'bg-indigo-50' 
          },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <ArrowUpRight size={14} /> Activo
              </span>
            </div>
            <h3 className="text-slate-500 font-medium mb-1">{stat.title}</h3>
            <div className="flex items-end gap-3">
              <p className="text-4xl font-extrabold text-slate-800 tracking-tight">{stat.value}</p>
              <p className="text-sm font-medium text-slate-400 mb-1">{stat.trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Proyectos Registrados</h2>
            <p className="text-xs text-slate-400 mt-0.5">Haz clic en cualquier proyecto para previsualizarlo o ver la versión pública.</p>
          </div>
          <Link href="/demo/new" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
            + Crear nuevo
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                <th className="px-8 py-5">Tour / Negocio</th>
                <th className="px-6 py-5">Plantilla</th>
                <th className="px-6 py-5">Objetivo</th>
                <th className="px-6 py-5">Estado</th>
                <th className="px-6 py-5">Fecha</th>
                <th className="px-8 py-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 group-hover:from-blue-100 group-hover:to-blue-200 group-hover:text-blue-600 transition-colors shadow-inner">
                        <FileText size={20} />
                      </div>
                      <div>
                        <Link href={`/demo/preview?slug=${p.slug}`} className="font-bold text-slate-800 hover:text-blue-600 transition-colors block mb-0.5">
                          {p.name}
                        </Link>
                        <span className="text-xs font-medium text-slate-400">Guía: {p.guideName}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold capitalize bg-slate-100 text-slate-700">
                      {p.template}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-xs font-medium text-slate-600">
                      {p.objective === 'whatsapp' ? '💬 WhatsApp' : '📋 Cotización'}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                      p.status === 'published' ? 'bg-emerald-100/80 text-emerald-700' : 'bg-amber-100/80 text-amber-700'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${p.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></span>
                      {p.status === 'published' ? 'PUBLICADO' : 'BORRADOR'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-slate-500 text-sm font-medium flex items-center gap-2">
                    <CalendarDays size={16} className="text-slate-400" />
                    {p.date}
                  </td>
                  <td className="px-8 py-5 text-right space-x-2">
                    <Link
                      href={`/demo/preview?slug=${p.slug}`}
                      className="inline-flex items-center gap-1 p-2 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-xs font-medium"
                      title="Abrir Editor / Preview"
                    >
                      <Eye size={16} />
                      <span>Preview</span>
                    </Link>
                    <a
                      href={`/p/${p.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 p-2 text-slate-500 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors text-xs font-medium"
                      title="Ver Landing Pública"
                    >
                      <ExternalLink size={16} />
                      <span>Pública</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
