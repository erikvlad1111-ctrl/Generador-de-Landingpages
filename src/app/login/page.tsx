"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Compass, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { signInWithCredentials, isSupabaseConfigured, getStoredUser } from '@/lib/auth';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next') || '/demo';

  const [email, setEmail] = useState('admin@cuscocreativos.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    setConfigured(isSupabaseConfigured());
    const existing = getStoredUser();
    if (existing) {
      router.replace(nextUrl);
    }
  }, [nextUrl, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await signInWithCredentials(email, password);
      if (res.error) {
        setError(res.error);
        setLoading(false);
        return;
      }

      // Redireccionar al panel o la ruta que intentaba acceder
      router.push(nextUrl);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || 'Error inesperado al iniciar sesión');
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@cuscocreativos.com');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <header className="px-6 py-5 border-b border-slate-800/80 backdrop-blur-md flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
            <Compass size={22} />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-white flex items-center gap-2">
              Cusco Creativos
              <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded-full border border-blue-400/30">
                Panel Interno
              </span>
            </h1>
            <p className="text-xs text-slate-400">Generador de Landing Pages Turísticas</p>
          </div>
        </Link>

        <div className="text-xs text-slate-400 hidden sm:flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-xl">
          <ShieldCheck size={16} className="text-emerald-400" />
          <span>Acceso Protegido • Empleados Autorizados</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-12 w-full my-auto">
        <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-9 shadow-2xl border border-slate-100 relative">
          
          <div className="mb-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Lock size={22} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Iniciar Sesión</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Ingresa con tus credenciales de empleado para administrar las landing pages de Cusco Creativos.
            </p>
          </div>

          {/* Estado de conexión de Supabase */}
          <div className="mb-5">
            {configured ? (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span>Supabase Auth Cloud Conectado</span>
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-[11px] font-medium flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-blue-600 shrink-0" />
                  <span>Modo Local / Demo Activo</span>
                </span>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-[10px] font-bold text-blue-700 underline hover:text-blue-900 cursor-pointer"
                >
                  Rellenar Demo
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200 flex items-start gap-2 animate-in fade-in">
              <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="admin@cuscocreativos.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">Acceso predeterminado:</span>
                <span className="text-[10px] text-slate-500">Uso interno</span>
              </div>
              <div className="flex justify-between font-mono text-[10px] text-slate-800">
                <span>admin@cuscocreativos.com</span>
                <span>admin123</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 text-sm hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <span>Verificando credenciales...</span>
              ) : (
                <>
                  <span>Ingresar al Panel</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-400">
            <span>¿Eres un viajero o cliente final? </span>
            <Link href="/p/machu-picchu-vip" className="text-blue-600 font-semibold hover:underline">
              Ver landing de ejemplo
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-5 border-t border-slate-800/80 text-center text-xs text-slate-500">
        <p>© 2026 Cusco Creativos S.A.C. Sistema de Gestión Turística Interna.</p>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Cargando...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}

