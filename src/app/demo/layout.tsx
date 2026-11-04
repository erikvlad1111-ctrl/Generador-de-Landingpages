"use client";

import React, { useState, useEffect, useRef } from 'react';
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
  LayoutTemplate,
  Loader2,
  ShieldCheck,
  ChevronDown,
  UserCheck,
  RefreshCw,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentUser, signOutUser, setStoredUser, UserSession } from '@/lib/auth';

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserSession | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    getCurrentUser().then((currentUser) => {
      if (!mounted) return;
      if (!currentUser) {
        router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      } else {
        setUser(currentUser);
        setAuthChecking(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [pathname, router]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setProfileMenuOpen(false);
    await signOutUser();
    router.replace('/login');
    router.refresh();
  };

  const handleQuickSwitchRole = (targetRole: 'admin' | 'employee') => {
    const newSession: UserSession =
      targetRole === 'admin'
        ? {
            id: 'cc-admin-01',
            email: 'admin@cuscocreativos.com',
            name: 'Administrador General',
            role: 'admin',
            isDemo: true,
            loginAt: new Date().toISOString(),
          }
        : {
            id: 'cc-emp-02',
            email: 'empleado@cuscocreativos.com',
            name: 'Ejecutivo de Ventas & Tours',
            role: 'employee',
            isDemo: true,
            loginAt: new Date().toISOString(),
          };
    setStoredUser(newSession);
    setUser(newSession);
    setProfileMenuOpen(false);
  };

  const isDashboard = pathname === '/demo';
  const isNewLanding = pathname === '/demo/new';
  const isPinterest = pathname === '/demo/pinterest' || pathname === '/demo/disenos';
  const isPlans = pathname === '/demo/plans';
  const isSettings = pathname === '/demo/settings';
  const isPreview = pathname.startsWith('/demo/preview');

  let pageTitle = 'Panel Principal';
  let pageSubtitle = 'Gestión de páginas de aterrizaje, métricas y estado de publicación';
  let PageIcon = LayoutDashboard;

  if (isNewLanding) {
    pageTitle = 'Generador de Landing';
    pageSubtitle = 'Creación asistida por IA y plantillas de alta conversión';
    PageIcon = FilePlus2;
  } else if (isPinterest) {
    pageTitle = 'Diseños Disponibles Landing Pages';
    pageSubtitle = 'Catálogo de 6 plantillas especializadas para agencias de viajes';
    PageIcon = LayoutTemplate;
  } else if (isPlans) {
    pageTitle = 'Guía de Estructura de Páginas';
    pageSubtitle = 'Comparativa de módulos y alcances por nivel (Free, Básico, Pro, Advance)';
    PageIcon = Layers;
  } else if (isSettings) {
    pageTitle = 'Configuración de Agencia';
    pageSubtitle = 'Marca blanca, RUC, WhatsApp oficial y preferencias del sistema';
    PageIcon = Settings;
  } else if (isPreview) {
    pageTitle = 'Previsualizador';
    pageSubtitle = 'Edición en vivo y simulador multi-dispositivo';
    PageIcon = Eye;
  }

  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300 gap-3">
        <Loader2 size={32} className="animate-spin text-blue-500" />
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
          Verificando sesión segura...
        </span>
      </div>
    );
  }

  const isAdmin = user?.role === 'admin';
  const userInitials = isAdmin ? 'AD' : 'EM';
  const userRoleLabel = isAdmin ? 'Administrador' : 'Empleado';
  const userDisplayName = user?.name || (isAdmin ? 'Administrador General' : 'Ejecutivo de Ventas & Tours');

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 flex-col md:flex-row">
      
      {/* 1. DESKTOP SIDEBAR (Visible ONLY on md and up) */}
      <aside className="hidden md:flex w-56 bg-slate-950 text-slate-300 flex-col shrink-0 border-r border-slate-800/80 select-none">
        <div className="p-4.5 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-600/30 shrink-0">
              CC
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-white tracking-tight leading-tight truncate">Cusco Creativos</h1>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider truncate">Sistema Agencias</p>
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
            <span>Generador de Landing</span>
          </Link>

          {isPreview && (
            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm">
              <Eye size={18} />
              <span>Editor Activo</span>
            </div>
          )}

          <Link 
            href="/demo/pinterest" 
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
              isPinterest 
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <LayoutTemplate size={18} className={isPinterest ? 'text-white' : 'text-blue-400'} />
            <span>Diseños Disponibles</span>
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
            <span>6 Plantillas activadas (incl. Esmeralda & Boho).</span>
            <Link href="/demo/plans" className="text-blue-400 hover:text-blue-300 font-semibold block mt-1.5 transition-colors">
              Ver todos los planes →
            </Link>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-xl transition-colors text-xs font-medium cursor-pointer"
          >
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
          </button>
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
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-[10px] font-bold flex items-center justify-center">
                  {userInitials}
                </span>
                <div>
                  <span className="text-xs font-bold text-white block leading-none">{userDisplayName}</span>
                  <span className="text-[10px] text-slate-400">{user?.email}</span>
                </div>
              </div>
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
                <span>Generador de Landing</span>
              </Link>

              <Link
                href="/demo/pinterest"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl flex items-center gap-2.5 text-xs font-bold ${
                  isPinterest ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <LayoutTemplate size={18} className={isPinterest ? 'text-white' : 'text-blue-400'} />
                <span>Diseños Disponibles</span>
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

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="p-3 rounded-xl flex items-center gap-2.5 text-xs font-bold bg-red-950/40 border border-red-900/50 text-red-300 hover:bg-red-900/50 cursor-pointer text-left"
              >
                <LogOut size={18} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. MAIN CONTENT WRAPPER */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 pb-20 md:pb-0">
        
        {/* Desktop Header Mejorado */}
        {!isPreview && (
          <header className="hidden md:flex bg-white/95 backdrop-blur-md h-18 border-b border-slate-200/90 items-center px-6 lg:px-8 shadow-2xs justify-between shrink-0 sticky top-0 z-30">
            {/* Lado Izquierdo: Icono + Breadcrumb + Título + Subtítulo */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/70 flex items-center justify-center text-blue-600 shadow-2xs shrink-0">
                <PageIcon size={20} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  <span>Cusco Creativos</span>
                  <ChevronRight size={11} className="text-slate-300" />
                  <span className="text-blue-600">Panel Interno</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <h2 className="font-extrabold text-slate-900 text-base tracking-tight truncate">
                    {pageTitle}
                  </h2>
                  <span className="hidden xl:inline-block text-xs text-slate-400 font-normal truncate">
                    • {pageSubtitle}
                  </span>
                </div>
              </div>
            </div>

            {/* Lado Derecho: Estado de Seguridad + Tarjeta de Usuario con Menú + Botón Salir */}
            <div className="flex items-center gap-3">
              {/* Pill de Seguridad Activa */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200/80 text-emerald-800 text-[11px] font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Sesión Protegida</span>
              </div>

              {/* Contenedor de Perfil con Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen((prev) => !prev)}
                  className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-2xl bg-slate-50 hover:bg-slate-100/90 border border-slate-200/90 transition-all cursor-pointer group"
                  title="Ver detalles de cuenta o cambiar de rol"
                >
                  {/* Avatar con indicador en línea */}
                  <div className="relative">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold text-xs shadow-sm ${
                        isAdmin
                          ? 'bg-gradient-to-br from-blue-600 to-indigo-700 shadow-blue-600/20'
                          : 'bg-gradient-to-br from-teal-600 to-emerald-600 shadow-emerald-600/20'
                      }`}
                    >
                      {userInitials}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>

                  {/* Información del Usuario */}
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold text-slate-900 leading-none">
                        {userDisplayName}
                      </span>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md border ${
                          isAdmin
                            ? 'bg-blue-100/80 text-blue-800 border-blue-200'
                            : 'bg-emerald-100/80 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        {userRoleLabel}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 block mt-0.5 leading-none">
                      {user?.email || 'admin@cuscocreativos.com'}
                    </span>
                  </div>

                  <ChevronDown
                    size={15}
                    className={`text-slate-400 group-hover:text-slate-600 transition-transform duration-200 ${
                      profileMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Menú Desplegable del Perfil */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 z-50 space-y-2.5 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Sesión Verificada
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 size={12} /> Activa
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-800 truncate">{userDisplayName}</p>
                      <p className="text-[11px] font-mono text-slate-500 truncate">{user?.email}</p>
                    </div>

                    {/* Cambio rápido de Rol para pruebas */}
                    <div className="space-y-1">
                      <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <RefreshCw size={10} /> Cambiar Vista de Rol (1 Clic)
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuickSwitchRole('admin')}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                          isAdmin
                            ? 'bg-blue-50 text-blue-700 border border-blue-200/70'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <UserCheck size={14} className={isAdmin ? 'text-blue-600' : 'text-slate-400'} />
                          Administrador General
                        </span>
                        {isAdmin && <span className="text-[10px] font-bold text-blue-600">Actual</span>}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuickSwitchRole('employee')}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                          !isAdmin
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/70'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <UserCheck size={14} className={!isAdmin ? 'text-emerald-600' : 'text-slate-400'} />
                          Empleado Operador
                        </span>
                        {!isAdmin && <span className="text-[10px] font-bold text-emerald-600">Actual</span>}
                      </button>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex flex-col gap-1">
                      <Link
                        href="/demo/settings"
                        onClick={() => setProfileMenuOpen(false)}
                        className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <Settings size={14} className="text-slate-400" />
                        <span>Configuración de Agencia</span>
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <LogOut size={14} />
                        <span>Cerrar Sesión Segura</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Botón Directo de Salir */}
              <button
                type="button"
                onClick={handleLogout}
                title="Cerrar sesión y volver al Login"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-red-200 bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 text-xs font-bold transition-all cursor-pointer shadow-2xs"
              >
                <LogOut size={15} />
                <span className="hidden xl:inline">Salir</span>
              </button>
            </div>
          </header>
        )}

        {/* Content Body: Optimized margins to maximize table breathing room */}
        <div className={`flex-1 overflow-auto ${isPreview ? 'p-0' : 'p-3.5 sm:p-5 md:p-6 lg:p-7'}`}>
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
