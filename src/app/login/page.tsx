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
  Eye,
  EyeOff,
  Loader2,
  UserCheck,
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
  const [password, setPassword] = useState('admin123');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'employee'>('admin');
  const [showPassword, setShowPassword] = useState(false);
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
    if (role === 'admin') {
      setEmail('admin@cuscocreativos.com');
      setPassword('admin123');
    } else {
      setEmail('empleado@cuscocreativos.com');
      setPassword('cusco2026');
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Luz de fondo sutil */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />

      {/* Cabecera minimalista */}
      <header className="relative z-10 px-6 py-4 flex justify-between items-center max-w-6xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
            <Compass size={20} />
          </div>
          <div>
            <span className="font-bold text-sm text-white block leading-tight">Cusco Creativos</span>
            <span className="text-[11px] text-slate-400 block leading-tight">Generador de Landings</span>
          </div>
        </Link>

        <Link
          href="/p/machu-picchu-vip"
          className="text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 px-3.5 py-1.5 rounded-xl transition-colors"
        >
          Ver Landing de Ejemplo →
        </Link>
      </header>

      {/* Tarjeta Central Limpia y Compacta */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md bg-white text-slate-900 rounded-3xl p-7 sm:p-8 shadow-2xl border border-slate-100">
          {/* Encabezado del Login */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 border border-blue-100">
              <Lock size={22} />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Iniciar Sesión</h1>
            <p className="text-xs text-slate-500 mt-1">
              Acceso exclusivo para el equipo de Cusco Creativos
            </p>
          </div>

          {/* Aviso compacto si ya hay sesión abierta */}
          {existingUser && (
            <div className="mb-5 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-emerald-900 block">
                  Sesión activa ({existingUser.role === 'admin' ? 'Admin' : 'Empleado'})
                </span>
                <span className="text-[11px] text-emerald-700 truncate block">
                  {existingUser.email}
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => router.push(nextUrl)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  Entrar →
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await signOutUser();
                    setExistingUser(null);
                  }}
                  className="text-xs text-emerald-800 hover:bg-emerald-100 px-2 py-1.5 rounded-xl font-medium transition-colors cursor-pointer"
                >
                  Salir
                </button>
              </div>
            </div>
          )}

          {/* Selector Simple de Perfil (Switch de 2 botones) */}
          <div className="mb-5">
            <span className="block text-[11px] font-semibold text-slate-500 mb-1.5">
              Acceso rápido de prueba:
            </span>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => handleSelectRole('admin')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  selectedRole === 'admin'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
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
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck size={14} />
                <span>Empleado</span>
              </button>
            </div>
          </div>

          {/* Mensaje de error si falla */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200 flex items-start gap-2">
              <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Formulario limpio */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot oculto contra bots */}
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
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Correo Electrónico
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
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Contraseña
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

            <button
              type="submit"
              disabled={loading || rateLimit.locked}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 text-sm hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Ingresando...</span>
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

          {/* Pie de seguridad discreto dentro de la tarjeta */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Sesión cifrada y protegida contra accesos no autorizados</span>
          </div>
        </div>
      </main>

      {/* Pie de página simple */}
      <footer className="relative z-10 px-6 py-4 text-center text-xs text-slate-600">
        © 2026 Cusco Creativos S.A.C.
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-sm">
          Cargando...
        </div>
      }
    >
      <LoginPortalView />
    </Suspense>
  );
}
