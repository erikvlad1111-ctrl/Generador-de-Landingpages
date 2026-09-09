"use client";

import React, { useState } from 'react';
import { X, CheckCircle, Send, MessageCircle, Calendar, Users, Mail, User, Phone } from 'lucide-react';
import { LandingData } from '@/types/landing';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  landing: LandingData;
}

export default function QuoteModal({ isOpen, onClose, landing }: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const cleanPhone = (landing.whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(
    `Hola ${landing.guideName}, acabo de solicitar una cotización web para "${landing.name}" a nombre de ${name} (${travelers} personas para la fecha ${date || 'por coordinar'}).`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-slate-800 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={36} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">¡Solicitud de Cotización Recibida!</h3>
            <p className="text-sm text-slate-600">
              Hemos registrado tus datos para el tour <strong>{landing.name}</strong>. El guía <strong>{landing.guideName}</strong> revisará disponibilidad y te responderá en menos de 2 horas.
            </p>
            <div className="pt-4 flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-colors shadow-md shadow-emerald-600/20"
              >
                <MessageCircle size={18} />
                Acelerar respuesta por WhatsApp
              </a>
              <button
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-slate-600 py-1"
              >
                Cerrar ventana
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Formulario Oficial</span>
              <h3 className="text-2xl font-bold text-slate-900">Cotizar Experiencia</h3>
              <p className="text-xs text-slate-500 mt-1">
                Tour: <strong>{landing.name}</strong> · Tarifa referencial: <strong>{landing.price || 'A consultar'}</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <User size={13} className="text-slate-400" /> Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Ej. Martín García"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Mail size={13} className="text-slate-400" /> Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="tu@correo.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Phone size={13} className="text-slate-400" /> WhatsApp / Teléfono
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="+51..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Calendar size={13} className="text-slate-400" /> Fecha Tentativa
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Users size={13} className="text-slate-400" /> N° Pasajeros
                  </label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="1">1 Pasajero (Individual)</option>
                    <option value="2">2 Pasajeros (Pareja)</option>
                    <option value="3-5">3 a 5 Pasajeros (Familia)</option>
                    <option value="6+">6 o más (Grupo)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Requerimientos especiales / Dudas
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="¿Restricciones dietéticas, recojo en aeropuerto, dudas de altitud?"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                <Send size={16} />
                Enviar Solicitud al Guía
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
