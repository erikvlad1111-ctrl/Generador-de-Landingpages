"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Compass, Lock, Mail, ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@cuscocreativos.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (email && password) {
        router.push('/demo');
      } else {
        setError('Por favor ingresa credenciales válidas');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Header Bar */}
      <header className="px-6 py-5 border-b border-slate-700/60 backdrop-blur flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
            <Compass size={22} />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-white flex items-center gap-2">
              Cusco Creativos
              <span className="text-[10px] bg-blue-500/20 text-blue-300 font-semibold px-2 py-0.5 rounded-full border border-blue-400/30">
                Fase 1 MVP
              </span>
            </h1>
            <p className="text-xs text-slate-400">Sistema Generador de Landing Pages para Turismo</p>
          </div>
        </div>
        <div className="text-xs text-slate-400 hidden sm:flex items-center gap-1.5">
          <ShieldCheck size={16} className="text-emerald-400" />
          <span>Acceso Protegido para Agencias</span>
        </div>
      </header>

      {/* Main Body: Hero + Login Card */}
      <main className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-12 gap-12 items-center w-full my-auto">
        {/* Left Side: System Value Prop (Fase 1) */}
        <div className="md:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Sparkles size={14} />
            Plataforma Especializada en Turismo Andino
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Crea landings de alta conversión para tus tours en <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">menos de 2 minutos</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed max-w-xl">
            Herramienta diseñada para agencias receptivas y guías certificados de Cusco. Genera páginas vendedoras con copywriting de IA, integración directa con WhatsApp y cotizaciones formales.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2.5 text-sm text-slate-300 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
              <span>4 Plantillas: Aventura, Lujo, Cultural y Boho Pinterest</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-300 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
              <span>Enlace Directo con WhatsApp del Guía</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-300 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
              <span>Generación de Copy persuasivo con IA</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-300 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
              <span>Modal de Cotizaciones para Grupos</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Box */}
        <div className="md:col-span-5">
          <div className="bg-white text-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-100 relative">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">Iniciar Sesión</h3>
              <p className="text-xs text-slate-500 mt-1">
                Usa las credenciales de demostración para acceder al dashboard.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
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

              <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-100 text-[11px] text-blue-900 space-y-1">
                <span className="font-bold block">Credenciales de Acceso Demo:</span>
                <div className="flex justify-between text-slate-600">
                  <span>Usuario: <code>admin@cuscocreativos.com</code></span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Clave: <code>admin123</code></span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 text-sm hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 cursor-pointer"
              >
                {loading ? (
                  <span>Iniciando sesión...</span>
                ) : (
                  <>
                    <span>Ingresar al Sistema</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© 2026 Cusco Creativos S.A.C. Todos los derechos reservados. Cusco, Perú.</p>
      </footer>
    </div>
  );
}
