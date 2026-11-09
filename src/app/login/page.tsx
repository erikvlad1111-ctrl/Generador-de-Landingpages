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
  AlertCircle,
  Loader2,
  UserCheck,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import {
  signInWithCredentials,
  getStoredUser,
  signOutUser,
  getRateLimitStatus,
  UserSession,
} from '@/lib/auth';

export function LoginPortalView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next') || '/demo';

  const [email, setEmail] = useState('admin@cuscocreativos.com');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'employee'>('admin');
  const [honeypot, setHoneypot] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingUser, setExistingUser] = useState<UserSession | null>(null);
  const [rateLimit, setRateLimit] = useState<{ locked: boolean; remainingSeconds: number; attemptsLeft: number }>({
    locked: false,
    remainingSeconds: 0,
    attemptsLeft: 5,
  });

  useEffect(() => {
    setExistingUser(getStoredUser());
    setRateLimit(getRateLimitStatus());
    setPassword('');
  }, []);

  useEffect(() => {
    if (!rateLimit.locked) return;
    const timer = setInterval(() => {
      const status = getRateLimitStatus();
      setRateLimit(status);
      if (!status.locked) setError(null);
    }, 1000);
    return () => clearInterval(timer);
  }, [rateLimit.locked]);

  const handleSelectRole = (role: 'admin' | 'employee') => {
    setSelectedRole(role);
    setError(null);
    setPassword('');
    if (role === 'admin') {
      setEmail('admin@cuscocreativos.com');
    } else {
      setEmail('empleado@cuscocreativos.com');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rateLimit.locked) return;

    setLoading(true);
    setError(null);

    try {
      const res = await signInWithCredentials(email, password, {
        honeypot,
        rememberMe: true,
      });

      if (res.rateLimit) {
        setRateLimit(res.rateLimit);
      }

      if (res.error) {
        setError(res.error);
        setLoading(false);
        return;
      }

      router.push(nextUrl);
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B19] text-slate-100 flex flex-col justify-between relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Halos de luz azul corporativo de fondo */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[420px] bg-blue-600/20 rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[450px] h-[300px] bg-indigo-600/15 rounded-full blur-[120px]" />

      {/* Cabecera Superior */}
      <header className="relative z-10 px-6 py-4 border-b border-slate-800/70 backdrop-blur-md bg-slate-950/50">
        <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform">
              <Compass size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-white tracking-tight">Cusco Creativos</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-400/25">
                  Sistema Interno
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block leading-tight">
                Generador de Landing Pages Turísticas
              </span>
            </div>
          </Link>

          <Link
            href="/p/machu-picchu-vip"
            className="text-xs font-semibold text-blue-300 hover:text-white bg-blue-500/10 hover:bg-blue-600/25 border border-blue-500/25 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5"
          >
            <span>Ver Landing de Ejemplo</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      {/* Contenedor Central */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-[420px] bg-white text-slate-900 rounded-3xl shadow-2xl shadow-blue-950/50 border border-slate-200/90 overflow-hidden">
          {/* Franja superior azul corporativa */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600" />

          <div className="p-7 sm:p-8">
            {/* Encabezado de la tarjeta */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-600/25">
                <Lock size={20} />
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Acceso al Panel
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Ingresa con tu cuenta de equipo de Cusco Creativos
              </p>
            </div>

            {/* Aviso en Azul Corporativo si ya tiene sesión activa */}
            {existingUser && (
              <div className="mb-5 p-3.5 rounded-2xl bg-blue-50/90 border border-blue-200/90 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    <span className="text-[11px] font-extrabold text-blue-950 uppercase tracking-wide">
                      Sesión activa ({existingUser.role === 'admin' ? 'Admin' : 'Empleado'})
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-blue-700 truncate block mt-0.5">
                    {existingUser.email}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => router.push(nextUrl)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    Continuar →
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await signOutUser();
                      setExistingUser(null);
                    }}
                    className="text-xs text-blue-700 hover:bg-blue-100 px-2.5 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer"
                  >
                    Salir
                  </button>
                </div>
              </div>
            )}

            {/* Selector de Rol en Azul del Proyecto */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Sparkles size={11} className="text-blue-600" />
                  Seleccionar Perfil
                </span>
                <span className="text-[10px] font-semibold text-blue-600">
                  Autocompletar correo
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/70">
                <button
                  type="button"
                  onClick={() => handleSelectRole('admin')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    selectedRole === 'admin'
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <UserCheck size={14} />
                  <span>Administrador</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectRole('employee')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    selectedRole === 'employee'
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Briefcase size={14} />
                  <span>Empleado</span>
                </button>
              </div>
            </div>

            {/* Alerta de error */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200 flex items-start gap-2">
                <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Formulario Principal */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot invisible anti-bots */}
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
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Correo Corporativo
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading || rateLimit.locked}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-3 focus:ring-blue-500/15 outline-none transition-all disabled:bg-slate-100 text-slate-900"
                    placeholder="admin@cuscocreativos.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading || rateLimit.locked}
                    autoComplete="new-password"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-3 focus:ring-blue-500/15 outline-none transition-all disabled:bg-slate-100 text-slate-900"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || rateLimit.locked}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 text-sm hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Verificando acceso...</span>
                  </>
                ) : rateLimit.locked ? (
                  <span>Bloqueado temporalmente ({rateLimit.remainingSeconds}s)</span>
                ) : (
                  <>
                    <span>Ingresar al Panel</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Sello inferior en azul corporativo */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-500">
              <ShieldCheck size={15} className="text-blue-600 shrink-0" />
              <span>Acceso protegido • Personal autorizado</span>
            </div>
          </div>
        </div>
      </main>

      {/* Pie de página */}
      <footer className="relative z-10 px-6 py-4 text-center text-xs text-slate-500">
        © 2026 Cusco Creativos S.A.C. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070B19] flex items-center justify-center text-white text-sm">
          Cargando...
        </div>
      }
    >
      <LoginPortalView />
    </Suspense>
  );
}
