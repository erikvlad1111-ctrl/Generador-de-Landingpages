'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, X, CheckCircle2 } from 'lucide-react';
import { LanguageType } from '@/types/landing';

interface RecentBookingsToastProps {
  lang?: LanguageType;
}

interface BookingEvent {
  name: string;
  origin: string;
  action: Record<LanguageType, string>;
  tour: string;
  timeAgo: Record<LanguageType, string>;
  flag: string;
}

const EVENTS: BookingEvent[] = [
  {
    name: 'Mariana Silva',
    origin: 'São Paulo, Brasil',
    action: {
      es: 'acaba de reservar',
      en: 'just booked',
      pt: 'acabou de reservar',
      fr: 'vient de réserver',
      it: 'ha appena prenotato'
    },
    tour: 'Machu Picchu VIP en Tren',
    timeAgo: {
      es: 'hace 14 min',
      en: '14 min ago',
      pt: 'há 14 min',
      fr: 'il y a 14 min',
      it: '14 min fa'
    },
    flag: '🇧🇷'
  },
  {
    name: 'David & Sarah Miller',
    origin: 'California, USA',
    action: {
      es: 'solicitaron cotización para 4 personas',
      en: 'requested quote for 4 people',
      pt: 'solicitaram cotação para 4 pessoas',
      fr: 'ont demandé un devis pour 4 personnes',
      it: 'hanno richiesto preventivo per 4 persone'
    },
    tour: 'Valle Sagrado & Machu Picchu 2D',
    timeAgo: {
      es: 'hace 26 min',
      en: '26 min ago',
      pt: 'há 26 min',
      fr: 'il y a 26 min',
      it: '26 min fa'
    },
    flag: '🇺🇸'
  },
  {
    name: 'Elena Rodríguez',
    origin: 'Madrid, España',
    action: {
      es: 'reservó cupos confirmados',
      en: 'confirmed departure seats',
      pt: 'reservou vagas confirmadas',
      fr: 'a confirmé des places',
      it: 'ha confermato i posti'
    },
    tour: 'Montaña de 7 Colores & Valle Rojo',
    timeAgo: {
      es: 'hace 9 min',
      en: '9 min ago',
      pt: 'há 9 min',
      fr: 'il y a 9 min',
      it: '9 min fa'
    },
    flag: '🇪🇸'
  },
  {
    name: 'Antoine & Camille',
    origin: 'París, Francia',
    action: {
      es: 'acaban de consultar por WhatsApp',
      en: 'just asked via WhatsApp',
      pt: 'acabaram de consultar no WhatsApp',
      fr: 'viennent de contacter par WhatsApp',
      it: 'hanno appena chiesto su WhatsApp'
    },
    tour: 'Laguna Humantay Turquesa',
    timeAgo: {
      es: 'hace 35 min',
      en: '35 min ago',
      pt: 'há 35 min',
      fr: 'il y a 35 min',
      it: '35 min fa'
    },
    flag: '🇫🇷'
  }
];

export default function RecentBookingsToast({ lang = 'es' }: RecentBookingsToastProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dismissed, setDismissed] = useState<boolean>(false);

  useEffect(() => {
    if (dismissed) return;

    // Primer disparo a los 6 segundos de cargar la página
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 6000);

    // Ciclo periódico: visible 6 segundos, oculto 18 segundos
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % EVENTS.length);
        setIsVisible(true);
      }, 1000);
    }, 22000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  // Autocierre después de 7 segundos visible
  useEffect(() => {
    if (isVisible) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 7000);
      return () => clearTimeout(hideTimer);
    }
  }, [isVisible]);

  if (dismissed || !isVisible) return null;

  const current = EVENTS[currentIndex];
  const actionText = current.action[lang] || current.action.es;
  const timeText = current.timeAgo[lang] || current.timeAgo.es;

  return (
    <div className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-40 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-xl border border-stone-200/80 animate-in fade-in slide-in-from-bottom-5 duration-500 flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-lg shrink-0 shadow-2xs">
        <span>{current.flag}</span>
      </div>

      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[11px] font-black text-stone-900 truncate">
            {current.name}
          </span>
          <span className="text-[10px] text-stone-400">
            • {current.origin}
          </span>
        </div>

        <p className="text-[11px] text-stone-600 leading-snug">
          {actionText} <strong className="text-stone-900">{current.tour}</strong>
        </p>

        <div className="flex items-center gap-1 mt-1 text-[10px] text-stone-400">
          <CheckCircle2 size={11} className="text-emerald-500" />
          <span>Verificado • {timeText}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="p-1 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer shrink-0"
        title="Ocultar avisos"
      >
        <X size={14} />
      </button>
    </div>
  );
}
