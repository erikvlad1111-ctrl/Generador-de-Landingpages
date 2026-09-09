"use client";

import React from 'react';
import { LayoutDashboard, FilePlus2, Settings, LogOut, Eye, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isDashboard = pathname === '/demo';
  const isNewLanding = pathname === '/demo/new';
  const isSettings = pathname === '/demo/settings';
  const isPreview = pathname.startsWith('/demo/preview');

  let pageTitle = 'Panel Principal';
  if (isNewLanding) pageTitle = 'Generador de Landings';
  else if (isSettings) pageTitle = 'Configuración de la Agencia';
  else if (isPreview) pageTitle = 'Previsualizador & Editor en Vivo';

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 text-slate-300 flex flex-col shrink-0 border-r border-slate-800/80 select-none">
        <div className="p-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-600/30">
              CC
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight leading-tight">Cusco Creativos</h1>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Sistema de Agencias</p>
            </div>
          </div>
        </div>

        {/* Dynamic Navigation Items with Active Highlighting */}
        <nav className="flex-1 px-3 py-4 space-y-1.5">
          <Link 
            href="/demo" 
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
              isDashboard 
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <LayoutDashboard size={18} />
            <span>Panel Principal</span>
          </Link>

          <Link 
            href="/demo/new" 
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
              isNewLanding 
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FilePlus2 size={18} />
            <span>Nueva Landing</span>
          </Link>

          {isPreview && (
            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm">
              <Eye size={18} />
              <span>Editor Activo</span>
            </div>
          )}

          <Link 
            href="/demo/settings" 
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
              isSettings 
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Settings size={18} />
            <span>Configuración</span>
          </Link>
        </nav>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-slate-900 space-y-3">
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 shadow-sm">
            <span className="font-bold text-slate-200 block mb-0.5 flex items-center gap-1.5">
              <Sparkles size={12} className="text-amber-400" /> Plan Pro Agencia
            </span>
            <span>3 Plantillas activadas y generación con IA.</span>
          </div>

          <Link 
            href="/" 
            className="flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-colors text-xs font-medium"
          >
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
          </Link>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50">
        {!isPreview && (
          <header className="bg-white h-16 border-b border-slate-200/80 flex items-center px-8 shadow-xs justify-between shrink-0">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-slate-800 text-sm">{pageTitle}</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">
                AD
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-xs font-bold text-slate-800 block leading-tight">Admin Demo</span>
                <span className="text-[10px] text-slate-400">admin@cuscocreativos.com</span>
              </div>
            </div>
          </header>
        )}
        <div className={`flex-1 overflow-auto ${isPreview ? 'p-0' : 'p-6 md:p-8'}`}>
          {children}
        </div>
      </main>
    </div>
  );
}
