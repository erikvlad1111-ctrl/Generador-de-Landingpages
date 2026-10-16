'use client';

import React from 'react';
import { Users, Calendar, Minus, Plus, MessageCircle, FileText, Sparkles, ShieldCheck, Check } from 'lucide-react';
import { LanguageType } from '@/types/landing';

interface BookingCardProps {
  price?: string;
  guideName?: string;
  tourName?: string;
  cleanPhone: string;
  onOpenQuote: () => void;
  objective?: 'whatsapp' | 'quote' | 'both';
  lang?: LanguageType;
}

export default function AdventureBookingCard({
  price,
  guideName,
  tourName = 'Salkantay Trek 5 Días',
  cleanPhone,
  onOpenQuote,
  objective = 'both',
  lang = 'es'
}: BookingCardProps) {
  const [passengers, setPassengers] = React.useState<number>(2);
  const [travelDate, setTravelDate] = React.useState<string>('');
  const [serviceType, setServiceType] = React.useState<'group' | 'private'>('group');

  const isEn = lang === 'en';
  const isPt = lang === 'pt';
  const isFr = lang === 'fr';
  const isIt = lang === 'it';

  // Extract base numerical price
  const rawPriceMatch = (price || '').match(/(\d+[\d,.]*)/);
  const rawPriceNumber = rawPriceMatch ? parseFloat(rawPriceMatch[1].replace(/,/g, '')) : 350;
  const isSoles = (price || '').toLowerCase().includes('s/') || (price || '').toLowerCase().includes('pen');
  const currencySymbol = isSoles ? 'S/' : (price || '').includes('€') ? '€' : '$';
  
  // Private service adds 25% surcharge for dedicated guide & private domes
  const multiplier = serviceType === 'private' ? 1.25 : 1.0;
  const unitPrice = Math.round((rawPriceNumber || 350) * multiplier);
  const totalPrice = unitPrice * passengers;

  const formattedUnitPrice = `${currencySymbol} ${unitPrice.toLocaleString()}`;
  const formattedTotalPrice = `${currencySymbol} ${totalPrice.toLocaleString()}`;

  const serviceLabel = serviceType === 'private'
    ? (isEn ? 'Private Expedition' : isPt ? 'Expedição Privada' : isFr ? 'Expédition Privée' : isIt ? 'Spedizione Privata' : 'Expedición Privada')
    : (isEn ? 'Small Group (Max 10)' : isPt ? 'Grupo Pequeno (Máx 10)' : isFr ? 'Petit Groupe (Max 10)' : isIt ? 'Piccolo Gruppo (Max 10)' : 'Grupo Reducido (Máx 10)');

  const guideTitle = isEn ? 'Trekking Guide' : isPt ? 'Guia de Trekking' : isFr ? 'Guide de Trekking' : isIt ? 'Guida Trekking' : 'Guía de Trekking';
  const greeting = isEn
    ? `Hello ${guideName || guideTitle}, I would like to book the "${tourName}" expedition:\n\n`
    : isPt
    ? `Olá ${guideName || guideTitle}, desejo reservar a expedição "${tourName}":\n\n`
    : isFr
    ? `Bonjour ${guideName || guideTitle}, je souhaite réserver l'expédition "${tourName}" :\n\n`
    : isIt
    ? `Buongiorno ${guideName || guideTitle}, desidero prenotare la spedizione "${tourName}":\n\n`
    : `Hola ${guideName || guideTitle}, deseo reservar la expedición "${tourName}":\n\n`;

  const hikersLabel = isEn ? 'Hikers' : isPt ? 'Viajantes' : isFr ? 'Randonneurs' : isIt ? 'Partecipanti' : 'Excursionistas';
  const dateLabel = isEn ? 'Departure date' : isPt ? 'Data de partida' : isFr ? 'Date de départ' : isIt ? 'Data di partenza' : 'Fecha de salida';
  const toCoordinate = isEn ? 'To be coordinated' : isPt ? 'A coordenar' : isFr ? 'À convenir' : isIt ? 'Da concordare' : 'A coordinar';
  const rateLabel = isEn ? 'Estimated total fare' : isPt ? 'Tarifa total estimada' : isFr ? 'Tarif total estimé' : isIt ? 'Tariffa totale stimata' : 'Tarifa total estimada';
  const perPersonLabel = isEn ? 'person' : isPt ? 'pessoa' : isFr ? 'personne' : isIt ? 'persona' : 'persona';
  const questionClosing = isEn
    ? 'Do you have spots available for this date?'
    : isPt
    ? 'Vocês têm vagas disponíveis para esta data?'
    : isFr
    ? 'Avez-vous des disponibilités pour cette date ?'
    : isIt
    ? 'Ci sono posti disponibili per questa data?'
    : '¿Tienen cupos disponibles para esta fecha?';

  const whatsappMessage = encodeURIComponent(
    `${greeting}` +
    `👥 ${hikersLabel}: ${passengers} (${serviceLabel})\n` +
    `📅 ${dateLabel}: ${travelDate || toCoordinate}\n` +
    `💰 ${rateLabel}: ${formattedTotalPrice} (${formattedUnitPrice} / ${perPersonLabel})\n\n` +
    `${questionClosing}`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMessage}`;

  return (
    <div className="bg-slate-900/85 backdrop-blur-2xl border border-white/20 p-5 sm:p-6 rounded-3xl shadow-2xl text-white space-y-4 text-left">
      {/* Top Header: Badge & Per-Person Base */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 gap-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-black uppercase tracking-wider">
          <Sparkles size={12} className="text-emerald-400" />
          <span>{isEn ? 'OFFICIAL GUARANTEED FARE' : isPt ? 'TARIFA OFICIAL GARANTIDA' : isFr ? 'TARIF OFFICIEL GARANTI' : isIt ? 'TARIFFA UFFICIALE GARANTITA' : 'TARIFA OFICIAL GARANTIZADA'}</span>
        </div>
        <span className="text-[11px] font-mono font-bold text-slate-300">
          5D / 4N
        </span>
      </div>

      {/* Main Rate & Live Total Display */}
      <div className="flex items-center justify-between gap-3 bg-slate-950/60 p-3.5 rounded-2xl border border-white/10">
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            {isEn ? 'Official Fare' : isPt ? 'Tarifa Oficial' : isFr ? 'Tarif Officiel' : isIt ? 'Tariffa Ufficiale' : 'Tarifa Oficial'}
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {formattedUnitPrice}
            </span>
            <span className="text-xs text-slate-400">
              {isEn ? '/ person' : isPt ? '/ pessoa' : isFr ? '/ pers.' : isIt ? '/ pers.' : '/ persona'}
            </span>
          </div>
        </div>
        <div className="text-right bg-blue-600/15 border border-blue-400/30 px-3.5 py-2 rounded-xl">
          <span className="text-[10px] text-blue-300 block font-bold uppercase tracking-wider">
            {isEn ? 'Estimated Total' : isPt ? 'Total Estimado' : isFr ? 'Total Estimé' : isIt ? 'Totale Stimato' : 'Total Estimado'}:
          </span>
          <strong className="text-lg sm:text-xl font-black text-amber-400 block mt-0.5">
            {formattedTotalPrice}
          </strong>
        </div>
      </div>

      {/* Service Type Switcher: Group vs Private */}
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/10 text-xs font-bold">
        <button
          type="button"
          onClick={() => setServiceType('group')}
          className={`py-2 px-3 rounded-lg transition-all cursor-pointer text-center font-black ${
            serviceType === 'group'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {isEn ? 'Small Group' : isPt ? 'Grupo Reduzido' : isFr ? 'Groupe' : isIt ? 'Gruppo' : 'Grupo Reducido'}
        </button>
        <button
          type="button"
          onClick={() => setServiceType('private')}
          className={`py-2 px-3 rounded-lg transition-all cursor-pointer text-center font-black ${
            serviceType === 'private'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {isEn ? 'Private Trek' : isPt ? 'Privado VIP' : isFr ? 'Privé VIP' : isIt ? 'Privato VIP' : 'Expedición Privada'}
        </button>
      </div>

      {/* Unified Booking Input Group: Clean, Organized & Spacious */}
      <div className="bg-slate-950/70 rounded-2xl border border-white/10 overflow-hidden divide-y divide-white/10">
        {/* Segment 1: Hikers Stepper */}
        <div className="p-3 sm:p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
              <Users size={16} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {hikersLabel}
              </span>
              <span className="text-xs font-black text-white block">
                {passengers} {passengers === 1 
                  ? (isEn ? 'traveler' : isPt ? 'viajante' : isFr ? 'randonneur' : isIt ? 'partecipante' : 'excursionista') 
                  : (isEn ? 'travelers' : isPt ? 'viajantes' : isFr ? 'randonneurs' : isIt ? 'partecipanti' : 'excursionistas')}
              </span>
            </div>
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 px-2 py-1 rounded-xl border border-white/10 shrink-0">
            <button
              type="button"
              onClick={() => setPassengers(Math.max(1, passengers - 1))}
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-blue-600 text-white font-black text-xs flex items-center justify-center transition-all cursor-pointer active:scale-90"
              title="Disminuir"
            >
              <Minus size={13} />
            </button>
            <span className="w-6 text-center font-black text-xs text-white">
              {passengers}
            </span>
            <button
              type="button"
              onClick={() => setPassengers(Math.min(16, passengers + 1))}
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-blue-600 text-white font-black text-xs flex items-center justify-center transition-all cursor-pointer active:scale-90"
              title="Aumentar"
            >
              <Plus size={13} />
            </button>
          </div>
        </div>

        {/* Segment 2: Date Picker */}
        <div className="p-3 sm:p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
              <Calendar size={16} />
            </div>
            <div className="min-w-0">
              <label htmlFor="adv-travel-date" className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block cursor-pointer">
                {dateLabel}
              </label>
              <span className="text-xs font-black text-white block truncate">
                {travelDate || toCoordinate}
              </span>
            </div>
          </div>

          <input
            id="adv-travel-date"
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="bg-slate-900/90 border border-white/15 rounded-xl px-2.5 py-1.5 text-xs font-bold text-white outline-none cursor-pointer hover:border-emerald-400/50 transition-colors shrink-0 [color-scheme:dark]"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-1 flex flex-col sm:flex-row gap-2">
        {objective === 'both' ? (
          <>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-3 px-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <MessageCircle size={15} />
              <span className="truncate">{isEn ? 'Book on WhatsApp' : isPt ? 'Reservar WhatsApp' : isFr ? 'Réserver WhatsApp' : isIt ? 'Prenota WhatsApp' : 'Reservar por WhatsApp'} ({formattedTotalPrice})</span>
            </a>
            <button
              type="button"
              onClick={onOpenQuote}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-3 px-3.5 rounded-xl border border-white/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <FileText size={15} className="text-blue-400" />
              <span>{isEn ? 'Quote' : isPt ? 'Cotar' : isFr ? 'Devis' : isIt ? 'Preventivo' : 'Cotizar'}</span>
            </button>
          </>
        ) : objective === 'quote' ? (
          <button
            type="button"
            onClick={onOpenQuote}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-xs py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <FileText size={15} />
            <span>{isEn ? 'Request Quote' : isPt ? 'Solicitar Cotação' : isFr ? 'Demander un devis' : isIt ? 'Richiedi Preventivo' : 'Solicitar Cotización'} • {formattedTotalPrice}</span>
          </button>
        ) : (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <MessageCircle size={15} />
            <span>{isEn ? 'Book on WhatsApp' : isPt ? 'Reservar WhatsApp' : isFr ? 'Réserver WhatsApp' : isIt ? 'Prenota WhatsApp' : 'Reservar por WhatsApp'} ({formattedTotalPrice})</span>
          </a>
        )}
      </div>

      {/* Trust Micro-Footnote */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
        <span className="flex items-center gap-1">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span>{isEn ? 'Free cancellation up to 48h' : isPt ? 'Cancelamento flexível' : isFr ? 'Annulation flexible' : isIt ? 'Cancellazione flessibile' : 'Cancelación flexible'}</span>
        </span>
        <span className="text-blue-300 font-mono text-[10px]">
          {isEn ? 'Instant Confirmation' : isPt ? 'Confirmação Imediata' : isFr ? 'Confirmation Directe' : isIt ? 'Conferma Immediata' : 'Confirmación Inmediata'}
        </span>
      </div>
    </div>
  );
}
