import React from 'react';
import { LayoutDashboard, FilePlus2, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold text-white tracking-tight">Cusco Creativos</h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Internal System</p>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          <Link href="/demo" className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-400 rounded-lg font-medium transition-colors">
            <LayoutDashboard size={20} />
            Panel Principal
          </Link>
          <Link href="/demo/new" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg transition-colors">
            <FilePlus2 size={20} />
            Nueva Landing
          </Link>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg transition-colors">
            <Settings size={20} />
            Configuración
          </a>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg transition-colors text-sm">
            <LogOut size={18} />
            Cerrar Sesión
          </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white h-16 border-b border-slate-200 flex items-center px-8 shadow-sm justify-between">
          <h2 className="font-semibold text-slate-800">Dashboard</h2>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              AD
            </div>
            <span className="text-sm font-medium text-slate-600">Admin</span>
          </div>
        </header>
        <div className="p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
