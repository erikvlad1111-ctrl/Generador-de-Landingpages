"use client";

import React, { useState } from 'react';
import { X, CheckCircle, Send, MessageCircle, Calendar, Users, Mail, User, Phone } from 'lucide-react';
import { LandingData, LanguageType } from '@/types/landing';
import { translateText } from '@/data/translations';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  landing: LandingData;
  lang?: LanguageType;
}

const MODAL_DICTS = {
  es: {
    officialBadge: 'Formulario Oficial',
    title: 'Cotizar Experiencia',
    tourLabel: 'Tour',
    rateLabel: 'Tarifa referencial',
    toConsult: 'A consultar',
    nameLabel: 'Nombre Completo',
    namePlaceholder: 'Ej. Martín García',
    emailLabel: 'Correo Electrónico',
    phoneLabel: 'WhatsApp / Teléfono',
    dateLabel: 'Fecha Tentativa',
    passengersLabel: 'N° Pasajeros',
    p1: '1 Pasajero (Individual)',
    p2: '2 Pasajeros (Pareja)',
    p3: '3 a 5 Pasajeros (Familia)',
    p6: '6 o más (Grupo)',
    notesLabel: 'Requerimientos especiales / Dudas',
    notesPlaceholder: '¿Restricciones dietéticas, recojo en aeropuerto, dudas de altitud?',
    btnSubmit: 'Enviar Solicitud al Guía',
    successTitle: '¡Solicitud de Cotización Recibida!',
    successDesc: (tour: string, guide: string) => `Hemos registrado tus datos para el tour ${tour}. El guía ${guide} revisará disponibilidad y te responderá en menos de 2 horas.`,
    btnWa: 'Acelerar respuesta por WhatsApp',
    btnClose: 'Cerrar ventana'
  },
  en: {
    officialBadge: 'Official Form',
    title: 'Request Official Quote',
    tourLabel: 'Tour',
    rateLabel: 'Reference rate',
    toConsult: 'Upon request',
    nameLabel: 'Full Name',
    namePlaceholder: 'e.g. John Miller',
    emailLabel: 'Email Address',
    phoneLabel: 'WhatsApp / Phone',
    dateLabel: 'Tentative Travel Date',
    passengersLabel: 'Number of Travelers',
    p1: '1 Traveler (Solo)',
    p2: '2 Travelers (Couple)',
    p3: '3 to 5 Travelers (Family)',
    p6: '6 or more (Group)',
    notesLabel: 'Special Requirements / Inquiries',
    notesPlaceholder: 'Dietary preferences, airport pickup, altitude acclimatization questions?',
    btnSubmit: 'Send Request to Guide',
    successTitle: 'Quote Request Received!',
    successDesc: (tour: string, guide: string) => `We have registered your details for ${tour}. Guide ${guide} will review availability and reply within 2 hours.`,
    btnWa: 'Speed up response via WhatsApp',
    btnClose: 'Close window'
  },
  pt: {
    officialBadge: 'Formulário Oficial',
    title: 'Solicitar Orçamento Oficial',
    tourLabel: 'Passeio',
    rateLabel: 'Tarifa de referência',
    toConsult: 'A consultar',
    nameLabel: 'Nome Completo',
    namePlaceholder: 'Ex. Carlos Eduardo',
    emailLabel: 'E-mail',
    phoneLabel: 'WhatsApp / Telefone',
    dateLabel: 'Data Prevista',
    passengersLabel: 'Nº de Passageiros',
    p1: '1 Passageiro (Individual)',
    p2: '2 Passageiros (Casal)',
    p3: '3 a 5 Passageiros (Família)',
    p6: '6 ou mais (Grupo)',
    notesLabel: 'Requisitos especiais / Dúvidas',
    notesPlaceholder: 'Restrições alimentares, traslado do aeroporto, aclimatação?',
    btnSubmit: 'Enviar Pedido ao Guia',
    successTitle: 'Pedido de Orçamento Recebido!',
    successDesc: (tour: string, guide: string) => `Registramos seus dados para o passeio ${tour}. O guia ${guide} verificará a disponibilidade e responderá em menos de 2 horas.`,
    btnWa: 'Agilizar resposta pelo WhatsApp',
    btnClose: 'Fechar janela'
  },
  fr: {
    officialBadge: 'Formulaire Officiel',
    title: 'Demander un Devis Officiel',
    tourLabel: 'Circuit',
    rateLabel: 'Tarif indicatif',
    toConsult: 'Sur demande',
    nameLabel: 'Nom Complet',
    namePlaceholder: 'Ex. Jean Dupont',
    emailLabel: 'Adresse E-mail',
    phoneLabel: 'WhatsApp / Téléphone',
    dateLabel: 'Date Prévue',
    passengersLabel: 'Nombre de Voyageurs',
    p1: '1 Voyageur (Solo)',
    p2: '2 Voyageurs (Couple)',
    p3: '3 à 5 Voyageurs (Famille)',
    p6: '6 ou plus (Groupe)',
    notesLabel: 'Demandes particulières / Questions',
    notesPlaceholder: 'Régime particulier, prise en charge à l’aéroport, altitude ?',
    btnSubmit: 'Envoyer la Demande au Guide',
    successTitle: 'Demande de Devis Reçue !',
    successDesc: (tour: string, guide: string) => `Nous avons bien reçu votre demande pour ${tour}. Le guide ${guide} vous répondra sous 2 heures.`,
    btnWa: 'Accélérer la réponse sur WhatsApp',
    btnClose: 'Fermer la fenêtre'
  },
  it: {
    officialBadge: 'Modulo Ufficiale',
    title: 'Richiedi Preventivo Ufficiale',
    tourLabel: 'Tour',
    rateLabel: 'Tariffa indicativa',
    toConsult: 'Su richiesta',
    nameLabel: 'Nome Completo',
    namePlaceholder: 'Es. Marco Rossi',
    emailLabel: 'Indirizzo E-mail',
    phoneLabel: 'WhatsApp / Telefono',
    dateLabel: 'Data Prevista',
    passengersLabel: 'Numero di Viaggiatori',
    p1: '1 Viaggiatore (Individuale)',
    p2: '2 Viaggiatori (Coppia)',
    p3: '3 a 5 Viaggiatori (Famiglia)',
    p6: '6 o più (Gruppo)',
    notesLabel: 'Richieste particolari / Domande',
    notesPlaceholder: 'Preferenze alimentari, transfer aeroporto, altitudine?',
    btnSubmit: 'Invia Richiesta alla Guida',
    successTitle: 'Richiesta di Preventivo Ricevuta!',
    successDesc: (tour: string, guide: string) => `Abbiamo registrato i tuoi dati per ${tour}. La guida ${guide} ti risponderà entro 2 ore.`,
    btnWa: 'Velocizza la risposta su WhatsApp',
    btnClose: 'Chiudi finestra'
  }
};

export default function QuoteModal({ isOpen, onClose, landing, lang = 'es' }: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const currentLang: LanguageType = lang || landing.language || 'es';
  const t = MODAL_DICTS[currentLang] || MODAL_DICTS.es;
  const tourLocalizedName = translateText(landing.name, currentLang) || landing.name;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const cleanPhone = (landing.whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(
    currentLang === 'en'
      ? `Hello ${landing.guideName}, I have just requested an official quote for "${tourLocalizedName}" on behalf of ${name} (${travelers} travelers for date ${date || 'to be arranged'}).`
      : currentLang === 'pt'
      ? `Olá ${landing.guideName}, acabei de solicitar um orçamento para "${tourLocalizedName}" em nome de ${name} (${travelers} pessoas para a data ${date || 'a combinar'}).`
      : currentLang === 'fr'
      ? `Bonjour ${landing.guideName}, je viens de demander un devis pour "${tourLocalizedName}" au nom de ${name} (${travelers} personnes pour la date ${date || 'à définir'}).`
      : currentLang === 'it'
      ? `Ciao ${landing.guideName}, ho appena richiesto un preventivo per "${tourLocalizedName}" a nome di ${name} (${travelers} persone per la data ${date || 'da definire'}).`
      : `Hola ${landing.guideName}, acabo de solicitar una cotización web para "${tourLocalizedName}" a nombre de ${name} (${travelers} personas para la fecha ${date || 'por coordinar'}).`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-slate-800 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={36} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{t.successTitle}</h3>
            <p className="text-sm text-slate-600">
              {t.successDesc(tourLocalizedName, landing.guideName || 'DIRCETUR')}
            </p>
            <div className="pt-4 flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-colors shadow-md shadow-emerald-600/20"
              >
                <MessageCircle size={18} />
                {t.btnWa}
              </a>
              <button
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-slate-600 py-1 cursor-pointer"
              >
                {t.btnClose}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{t.officialBadge}</span>
              <h3 className="text-2xl font-bold text-slate-900">{t.title}</h3>
              <p className="text-xs text-slate-500 mt-1">
                {t.tourLabel}: <strong>{tourLocalizedName}</strong> · {t.rateLabel}: <strong>{landing.price || t.toConsult}</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <User size={13} className="text-slate-400" /> {t.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder={t.namePlaceholder}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Mail size={13} className="text-slate-400" /> {t.emailLabel}
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
                    <Phone size={13} className="text-slate-400" /> {t.phoneLabel}
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
                    <Calendar size={13} className="text-slate-400" /> {t.dateLabel}
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
                    <Users size={13} className="text-slate-400" /> {t.passengersLabel}
                  </label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="1">{t.p1}</option>
                    <option value="2">{t.p2}</option>
                    <option value="3-5">{t.p3}</option>
                    <option value="6+">{t.p6}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.notesLabel}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder={t.notesPlaceholder}
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={16} />
                {t.btnSubmit}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
