"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FilePlus2, 
  Settings, 
  LogOut, 
  Eye, 
  Sparkles, 
  Menu, 
  X,
  Compass,
  Layers,
  Pin,
  LayoutTemplate
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDashboard = pathname === '/demo';
  const isNewLanding = pathname === '/demo/new';
  const isPinterest = pathname === '/demo/pinterest' || pathname === '/demo/disenos';
  const isPlans = pathname === '/demo/plans';
  const isSettings = pathname === '/demo/settings';
  const isPreview = pathname.startsWith('/demo/preview');

  let pageTitle = 'Panel Principal';
  if (isNewLanding) pageTitle = 'Generador de Landings';
  else if (isPinterest) pageTitle = 'Diseños Disponibles Landing Pages';
  else if (isPlans) pageTitle = 'Guía de Estructura de Páginas';
  else if (isSettings) pageTitle = 'Configuración';
  else if (isPreview) pageTitle = 'Previsualizador';

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 flex-col md:flex-row">
      
      {/* 1. DESKTOP SIDEBAR (Visible ONLY on md and up - exactly as original) */}
      <aside className="hidden md:flex w-64 bg-slate-950 text-slate-300 flex-col shrink-0 border-r border-slate-800/80 select-none">
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
            href="/demo/pinterest" 
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
              isPinterest 
                ? 'bg-[#FF5500] text-white shadow-sm shadow-[#FF5500]/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutTemplate size={18} className={isPinterest ? 'text-white' : 'text-amber-400'} />
              <span>Diseños Disponibles</span>
            </div>
            <span className="text-[10px] font-extrabold bg-white/20 text-white px-1.5 py-0.5 rounded-md border border-white/20">
              7 Diseños
            </span>
          </Link>

          <Link 
            href="/demo/plans" 
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
              isPlans 
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layers size={18} />
            <span>Guía de Niveles</span>
          </Link>

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

        {/* Footer info in desktop sidebar */}
        <div className="p-4 border-t border-slate-900 space-y-3">
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 shadow-sm">
            <span className="font-bold text-slate-200 block mb-0.5 flex items-center gap-1.5">
              <Sparkles size={12} className="text-amber-400" /> Plan Pro Agencia
            </span>
            <span>4 Plantillas activadas (incl. Boho Pinterest).</span>
            <Link href="/demo/plans" className="text-blue-400 hover:text-blue-300 font-semibold block mt-1.5 transition-colors">
              Ver todos los planes →
            </Link>
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

      {/* 2. MOBILE TOP HEADER (Visible ONLY on mobile devices) */}
      <div className="flex md:hidden bg-slate-950 text-white h-14 px-4 items-center justify-between border-b border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
            CC
          </div>
          <div>
            <span className="font-bold text-xs text-white block leading-tight">Cusco Creativos</span>
            <span className="text-[9px] text-blue-400 font-semibold">{pageTitle}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/demo/new"
            className="bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm"
          >
            <FilePlus2 size={15} />
            <span className="text-[11px] pr-1">Crear</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* 3. MOBILE SLIDE-OUT MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex flex-col justify-end md:hidden animate-in fade-in">
          <div className="bg-slate-950 text-white rounded-t-3xl p-6 border-t border-slate-800 space-y-4 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Navegación Móvil</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/demo"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl flex items-center gap-2.5 text-xs font-bold ${
                  isDashboard ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <LayoutDashboard size={18} />
                <span>Panel Principal</span>
              </Link>

              <Link
                href="/demo/new"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl flex items-center gap-2.5 text-xs font-bold ${
                  isNewLanding ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <FilePlus2 size={18} />
                <span>Nueva Landing</span>
              </Link>

              <Link
                href="/demo/pinterest"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl flex items-center justify-between text-xs font-bold ${
                  isPinterest ? 'bg-[#FF5500] text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutTemplate size={18} className={isPinterest ? 'text-white' : 'text-amber-400'} />
                  <span>Diseños Disponibles</span>
                </div>
                <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded-md border border-white/20">
                  7 Diseños
                </span>
              </Link>

              <Link
                href="/demo/plans"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl flex items-center gap-2.5 text-xs font-bold ${
                  isPlans ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Layers size={18} />
                <span>Guía de Niveles</span>
              </Link>

              <Link
                href="/demo/settings"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl flex items-center gap-2.5 text-xs font-bold ${
                  isSettings ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Settings size={18} />
                <span>Configuración</span>
              </Link>

              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl flex items-center gap-2.5 text-xs font-bold bg-slate-900 text-slate-400 hover:bg-slate-800"
              >
                <LogOut size={18} />
                <span>Cerrar Sesión</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 4. MAIN CONTENT WRAPPER */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 pb-20 md:pb-0">
        
        {/* Desktop Header */}
        {!isPreview && (
          <header className="hidden md:flex bg-white h-16 border-b border-slate-200/80 items-center px-8 shadow-xs justify-between shrink-0">
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

        {/* Content Body */}
        <div className={`flex-1 overflow-auto ${isPreview ? 'p-0' : 'p-4 sm:p-6 md:p-8'}`}>
          {children}
        </div>
      </main>

      {/* 5. MOBILE BOTTOM NAVIGATION BAR (Visible ONLY on mobile devices) */}
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 justify-around items-center select-none shadow-2xl">
        <Link
          href="/demo"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            isDashboard ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard size={18} />
          <span className="text-[10px]">Panel</span>
        </Link>

        <Link
          href="/demo/new"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            isNewLanding ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FilePlus2 size={18} />
          <span className="text-[10px]">Generar</span>
        </Link>

        <Link
          href="/demo/settings"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            isSettings ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Settings size={18} />
          <span className="text-[10px]">Ajustes</span>
        </Link>

        <Link
          href="/p/salkantay-trek-clasico"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-emerald-400 font-semibold"
        >
          <Compass size={18} />
          <span className="text-[10px]">Landing</span>
        </Link>
      </nav>

    </div>
  );
}
