"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Building2, Phone, Mail, Key, Users, CheckCircle2, Save } from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [agencyName, setAgencyName] = useState('Cusco Creativos S.A.C.');
  const [ruc, setRuc] = useState('20608945123');
  const [centralWhatsapp, setCentralWhatsapp] = useState('+51984123456');
  const [adminEmail, setAdminEmail] = useState('admin@cuscocreativos.com');
  const [address, setAddress] = useState('Calle Triunfo 392, Cercado Histórico, Cusco');
  const [apiKey, setApiKey] = useState('sk-proj-••••••••••••••••••••••••••••••••');

  const [guides, setGuides] = useState([
    { id: '1', name: 'Carlos Mendoza', role: 'Guía Alta Montaña (Salkantay / Ausangate)', phone: '+51 984 123 456' },
    { id: '2', name: 'Lucía Condori', role: 'Especialista Arqueología (Machu Picchu / Valle Sagrado)', phone: '+51 984 778 899' },
    { id: '3', name: 'Raúl Quispe', role: 'Guía Bilingüe y Cuatrimotos (Maras & Moray)', phone: '+51 984 112 233' },
  ]);

  const [newGuideName, setNewGuideName] = useState('');
  const [newGuideRole, setNewGuideRole] = useState('');
  const [newGuidePhone, setNewGuidePhone] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddGuide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuideName.trim()) return;
    setGuides([
      ...guides,
      {
        id: Date.now().toString(),
        name: newGuideName.trim(),
        role: newGuideRole.trim() || 'Guía Turístico',
        phone: newGuidePhone.trim() || centralWhatsapp
      }
    ]);
    setNewGuideName('');
    setNewGuideRole('');
    setNewGuidePhone('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/demo" className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Configuración de la Agencia</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Administra los datos comerciales, conexión WhatsApp y equipo de guías de tu agencia.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-sm animate-fade-in">
          <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
          <span>¡Cambios de configuración guardados correctamente en la sesión demo!</span>
        </div>
      )}

      {/* Main Agency Form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
          <Building2 size={18} className="text-blue-600" />
          Información Legal y Comercial
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Razón Social / Nombre Comercial
            </label>
            <input
              type="text"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              RUC (Registro Único de Contribuyente)
            </label>
            <input
              type="text"
              value={ruc}
              onChange={(e) => setRuc(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Phone size={14} className="text-slate-400" /> WhatsApp Central de Ventas
            </label>
            <input
              type="text"
              value={centralWhatsapp}
              onChange={(e) => setCentralWhatsapp(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Mail size={14} className="text-slate-400" /> Correo de Cotizaciones
            </label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Dirección de la Agencia en Cusco
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* AI Integration settings */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Key size={18} className="text-blue-600" />
            Integración de IA (OpenAI / Generador de Copy)
          </h2>
          <p className="text-xs text-slate-500">
            En esta versión de demostración, el motor inteligente opera con un simulador predictivo de alta precisión para tours de Cusco.
          </p>
          <div className="max-w-lg">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              API Key (Simulada / Producción)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none text-slate-600"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 text-sm cursor-pointer"
          >
            <Save size={16} />
            Guardar Configuración
          </button>
        </div>
      </form>

      {/* Guide Management Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users size={18} className="text-blue-600" />
              Directorio de Guías Oficiales Registrados
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Los guías aquí registrados pueden asignarse directamente a las landings creadas.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {guides.map((guide) => (
            <div key={guide.id} className="py-3.5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">{guide.name}</h3>
                <p className="text-xs text-slate-500">{guide.role}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                  {guide.phone}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Guide Subform */}
        <div className="pt-4 border-t border-slate-100 bg-slate-50 p-4 rounded-xl">
          <span className="text-xs font-bold text-slate-700 block mb-3">Registrar Nuevo Guía:</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Nombre del Guía..."
              value={newGuideName}
              onChange={(e) => setNewGuideName(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Especialidad / Ruta..."
              value={newGuideRole}
              onChange={(e) => setNewGuideRole(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="+51 984..."
                value={newGuidePhone}
                onChange={(e) => setNewGuidePhone(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500 flex-1"
              />
              <button
                type="button"
                onClick={handleAddGuide}
                className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
