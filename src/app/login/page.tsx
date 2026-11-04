"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Compass,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Eye,
  EyeOff,
  KeyRound,
  Database,
  Cpu,
  UserCheck,
  ShieldAlert,
  LogOut,
  Check,
  Loader2,
} from 'lucide-react';
import {
  signInWithCredentials,
  isSupabaseConfigured,
  getStoredUser,
  signOutUser,
  getRateLimitStatus,
  UserSession,
} from '@/lib/auth';

const SECURITY_STEPS = [
  {
    step: 1,
    title: 'Escudo Anti-Bot & Rate Limit',
    desc: 'Valida campo Honeypot oculto y verifica que no existan bloqueos por fuerza bruta (máx. 5 intentos).',
  },
  {
    step: 2,
    title: 'Autenticación de Personal (Sin Registro Público)',
    desc: 'Verifica credenciales contra Supabase Auth o el directorio interno autorizado por Jefatura.',
  },
  {
    step: 3,
    title: 'Asignación de Rol & Permisos RLS',
    desc: 'Establece privilegios de Administrador o Empleado para proteger la base de datos y la cuota de IA.',
  },
  {
    step: 4,
    title: 'Cookie Segura & Guardián Proxy (Next.js 16)',
    desc: 'Firma la cookie cc_auth (SameSite=Lax) autorizando el paso por src/proxy.ts hacia /demo.',
  },
];

export function LoginPortalView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next') || '/demo';

  const [email, setEmail] = useState('admin@cuscocreativos.com');
  const [password, setPassword] = useState('admin123');
  const [selectedPreset, setSelectedPreset] = useState<'admin' | 'employee'>('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [honeypot, setHoneypot] = useState('');

  const [loading, setLoading] = useState(false);
  const [activeVerificationStep, setActiveVerificationStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [configured, setConfigured] = useState(false);
  const [existingUser, setExistingUser] = useState<UserSession | null>(null);
  const [rateLimit, setRateLimit] = useState<{ locked: boolean; remainingSeconds: number; attemptsLeft: number }>({
    locked: false,
    remainingSeconds: 0,
    attemptsLeft: 5,
  });

  useEffect(() => {
    setConfigured(isSupabaseConfigured());
    setExistingUser(getStoredUser());
    setRateLimit(getRateLimitStatus());
  }, []);

  // Contador regresivo cuando la cuenta está temporalmente bloqueada por fuerza bruta
  useEffect(() => {
    if (!rateLimit.locked) return;
    const timer = setInterval(() => {
      const status = getRateLimitStatus();
      setRateLimit(status);
      if (!status.locked) {
        setError(null);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [rateLimit.locked]);

  const handleSelectProfile = (role: 'admin' | 'employee') => {
    setSelectedPreset(role);
    setError(null);
    if (role === 'admin') {
      setEmail('admin@cuscocreativos.com');
      setPassword('admin123');
    } else {
      setEmail('empleado@cuscocreativos.com');
      setPassword('cusco2026');
    }
  };

  const handleClearExistingSession = async () => {
    await signOutUser();
    setExistingUser(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rateLimit.locked) return;

    setLoading(true);
    setError(null);
    setActiveVerificationStep(1);

    try {
      // Paso 1: Verificación Anti-Bot y Rate Limit
      await new Promise((r) => setTimeout(r, 250));
      setActiveVerificationStep(2);

      // Paso 2: Verificación de credenciales
      const res = await signInWithCredentials(email, password, {
        honeypot,
        rememberMe,
      });

      if (res.rateLimit) {
        setRateLimit(res.rateLimit);
      }

      if (res.error) {
        setError(res.error);
        setLoading(false);
        setActiveVerificationStep(0);
        return;
      }

      // Paso 3: Asignación de Rol y RLS
      setActiveVerificationStep(3);
      await new Promise((r) => setTimeout(r, 220));

      // Paso 4: Emisión de Cookie Segura y redirección a /demo
      setActiveVerificationStep(4);
      await new Promise((r) => setTimeout(r, 220));

      router.push(nextUrl);
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error inesperado al iniciar sesión';
      setError(message);
      setLoading(false);
      setActiveVerificationStep(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Barra Superior Corporativa */}
      <header className="px-6 py-4 border-b border-slate-800/80 backdrop-blur-md flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
            <Compass size={22} />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-white flex items-center gap-2">
              Cusco Creativos
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                Acceso Interno Seguro
              </span>
            </h1>
            <p className="text-xs text-slate-400">Generador Automatizado de Landing Pages Turísticas</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-300 hidden md:flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-xl">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>Protección Proxy Next.js 16 • Sin Registro Público</span>
          </div>
          <Link
            href="/p/machu-picchu-vip"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-xl transition-colors"
          >
            Ver Landing Pública →
          </Link>
        </div>
      </header>

      {/* Cuerpo Principal: 2 Columnas (Arquitectura de Seguridad + Pasos | Tarjeta Login) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 grid lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full my-auto">
        {/* Columna Izquierda: Razones de Seguridad y Flujo Paso a Paso */}
        <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Sparkles size={14} />
            Arquitectura de Seguridad para Empleados • Vercel & Supabase
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Control de Acceso y{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
                Blindaje Multicapa
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Diseñado para operar de forma 100% gratuita en los planes Free de Vercel y Supabase, protegiendo tus créditos de Inteligencia Artificial y la integridad de las páginas publicadas.
            </p>
          </div>

          {/* Las 4 Capas de Protección */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-slate-900/70 border border-slate-800/90 p-3.5 rounded-2xl flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <Cpu size={18} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">1. Protección de Saldo IA (OpenAI)</h3>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Impide que visitantes o bots externos ejecuten el generador de IA y consuman tus créditos.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/70 border border-slate-800/90 p-3.5 rounded-2xl flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Database size={18} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">2. Integridad PostgreSQL (RLS)</h3>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  El público anónimo solo lee landings publicadas; solo el personal autenticado puede crear o editar.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/70 border border-slate-800/90 p-3.5 rounded-2xl flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                <UserCheck size={18} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">3. Sin Registro Público</h3>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Nadie ajeno puede registrarse. Solo acceden las cuentas fijas autorizadas por Cusco Creativos.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/70 border border-slate-800/90 p-3.5 rounded-2xl flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                <KeyRound size={18} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">4. Guardián Proxy & Anti-Fuerza Bruta</h3>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Middleware Edge (`src/proxy.ts`), filtro Honeypot y bloqueo automático tras 5 intentos fallidos.
                </p>
              </div>
            </div>
          </div>

          {/* Pasos de Verificación de Seguridad */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <ShieldCheck size={15} />
                Pasos del Protocolo de Inicio de Sesión
              </span>
              <span className="text-[11px] text-slate-400">
                {loading ? `Ejecutando paso ${activeVerificationStep} de 4...` : '4 validaciones automáticas'}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-2.5">
              {SECURITY_STEPS.map((item) => {
                const isCompleted = loading && activeVerificationStep > item.step;
                const isCurrent = loading && activeVerificationStep === item.step;
                return (
                  <div
                    key={item.step}
                    className={`p-3 rounded-xl border transition-all flex items-start gap-2.5 ${
                      isCurrent
                        ? 'bg-blue-950/60 border-blue-500/60 shadow-sm'
                        : isCompleted
                        ? 'bg-emerald-950/40 border-emerald-500/40'
                        : 'bg-slate-950/60 border-slate-800/80'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        isCompleted
                          ? 'bg-emerald-500 text-slate-950'
                          : isCurrent
                          ? 'bg-blue-500 text-white animate-pulse'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {isCompleted ? <Check size={13} /> : item.step}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-100">{item.title}</div>
                      <p className="text-[11px] text-slate-400 leading-snug mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Columna Derecha: Tarjeta de Login */}
        <div className="lg:col-span-5 order-1 lg:order-2">
          <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
            {/* Banner si ya tiene una sesión activa en el navegador */}
            {existingUser && (
              <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5 text-emerald-800">
                    <CheckCircle2 size={15} className="text-emerald-600" />
                    Sesión Activa Detectada
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-200/70 text-emerald-900">
                    {existingUser.role === 'admin' ? 'Administrador' : 'Empleado'}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-800">
                  Conectado como <strong className="font-mono">{existingUser.email}</strong>
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => router.push(nextUrl)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Ir al Panel Ahora</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={handleClearExistingSession}
                    className="px-3 py-2 rounded-xl border border-emerald-300 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    title="Cerrar sesión para probar otro usuario"
                  >
                    <LogOut size={14} />
                    <span>Salir</span>
                  </button>
                </div>
              </div>
            )}

            <div className="mb-5 text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2.5 shadow-inner border border-blue-100">
                <Lock size={22} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Iniciar Sesión Segura</h2>
              <p className="text-xs text-slate-500 mt-1">
                Selecciona tu perfil o ingresa tus credenciales de personal autorizado.
              </p>
            </div>

            {/* Estado de Conexión + Intentos disponibles */}
            <div className="mb-4 flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px]">
              {configured ? (
                <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  Supabase Auth Cloud Activo
                </span>
              ) : (
                <span className="flex items-center gap-1.5 font-semibold text-blue-800">
                  <ShieldCheck size={14} className="text-blue-600 shrink-0" />
                  Auth Interno Seguro Activo
                </span>
              )}
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  rateLimit.locked
                    ? 'bg-red-100 text-red-700'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {rateLimit.locked
                  ? `Bloqueado (${rateLimit.remainingSeconds}s)`
                  : `${rateLimit.attemptsLeft}/5 intentos disp.`}
              </span>
            </div>

            {/* Selector Rápido de Rol (1 Clic) */}
            <div className="mb-4">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Paso 1: Seleccionar Cuenta Autorizada (1 Clic)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectProfile('admin')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedPreset === 'admin'
                      ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/15'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Administrador</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white">
                      Jefatura
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-600 truncate mt-0.5">
                    admin@cuscocreativos.com
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectProfile('employee')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedPreset === 'employee'
                      ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/15'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Empleado</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-700 text-white">
                      Operador
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-600 truncate mt-0.5">
                    empleado@cuscocreativos.com
                  </div>
                </button>
              </div>
            </div>

            {/* Alerta de Error o Bloqueo */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200 flex items-start gap-2">
                {rateLimit.locked ? (
                  <ShieldAlert size={16} className="text-red-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                )}
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Campo Honeypot Invisible Anti-Bots */}
              <input
                type="text"
                name="b_auth_hp_verification"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', opacity: 0, zIndex: -1, pointerEvents: 'none', height: 0, width: 0 }}
              />

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Paso 2: Correo Corporativo
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading || rateLimit.locked}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all disabled:bg-slate-100"
                    placeholder="admin@cuscocreativos.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Paso 3: Contraseña de Acceso
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading || rateLimit.locked}
                    className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all disabled:bg-slate-100"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                    tabIndex={-1}
                    title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Opciones de Sesión Persistente */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Mantener sesión activa por 7 días</span>
                </label>
                <span className="text-[10px] font-mono text-slate-400">SameSite=Lax</span>
              </div>

              {/* Resumen de Credenciales Activas */}
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700">Credenciales cargadas:</span>
                  <span className="text-[10px] text-blue-600 font-semibold">
                    {selectedPreset === 'admin' ? 'Rol: Administrador' : 'Rol: Empleado'}
                  </span>
                </div>
                <div className="flex justify-between font-mono text-[10px] text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200/80">
                  <span>{email}</span>
                  <span>Clave: {password}</span>
                </div>
              </div>

              {/* Barra de Progreso de los 4 Pasos al Iniciar Sesión */}
              {loading && (
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                    <span className="flex items-center gap-1.5">
                      <Loader2 size={14} className="animate-spin text-blue-600" />
                      {SECURITY_STEPS[Math.max(0, activeVerificationStep - 1)]?.title}
                    </span>
                    <span>Paso {activeVerificationStep}/4</span>
                  </div>
                  <div className="w-full bg-blue-200/70 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full transition-all duration-200"
                      style={{ width: `${(activeVerificationStep / 4) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || rateLimit.locked}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 text-sm hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <span>Verificando Seguridad (Paso {activeVerificationStep}/4)...</span>
                ) : rateLimit.locked ? (
                  <span>Bloqueado por Seguridad ({rateLimit.remainingSeconds}s)</span>
                ) : (
                  <>
                    <span>Paso 4: Ingresar al Panel Seguro</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Pie de Página */}
      <footer className="px-6 py-4 border-t border-slate-800/80 text-center text-xs text-slate-500">
        <p>© 2026 Cusco Creativos S.A.C. • Autenticación Protegida con Supabase Auth & Next.js 16 Proxy.</p>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-sm">
          Cargando módulo de seguridad...
        </div>
      }
    >
      <LoginPortalView />
    </Suspense>
  );
}
