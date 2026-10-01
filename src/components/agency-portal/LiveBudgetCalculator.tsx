'use client';

import React, { useState } from 'react';
import { 
  Calculator, Users, Sparkles, Check, MessageCircle, 
  FileText, ShieldCheck, ArrowRight, Tag, HelpCircle,
  Clock, Compass, MapPin, Star
} from 'lucide-react';
import { LanguageType } from '@/types/landing';

export type CurrencyType = 'USD' | 'PEN' | 'EUR' | 'BRL';

export interface CalculatorTourOption {
  id: string;
  title: string;
  price: string;
  basePriceUSD: number;
  image?: string;
  duration?: string;
  category?: string;
  rating?: number;
}

interface LiveBudgetCalculatorProps {
  basePriceUSD?: number;
  tourTitle: string;
  availableTours?: CalculatorTourOption[];
  whatsappNumber: string;
  brandName?: string;
  lang?: LanguageType;
  currency: CurrencyType;
  onCurrencyChange?: (c: CurrencyType) => void;
  onOpenQuoteModal?: (tourName: string) => void;
}

const EXCHANGE_RATES: Record<CurrencyType, { rate: number; symbol: string; suffix: string }> = {
  USD: { rate: 1.0, symbol: '$', suffix: 'USD' },
  PEN: { rate: 3.75, symbol: 'S/ ', suffix: 'PEN' },
  EUR: { rate: 0.92, symbol: '€', suffix: 'EUR' },
  BRL: { rate: 5.40, symbol: 'R$ ', suffix: 'BRL' }
};

export function convertPrice(amountInUSD: number, target: CurrencyType): string {
  const conf = EXCHANGE_RATES[target] || EXCHANGE_RATES.USD;
  const converted = Math.round(amountInUSD * conf.rate);
  return `${conf.symbol}${converted} ${conf.suffix}`;
}

export default function LiveBudgetCalculator({
  basePriceUSD = 45,
  tourTitle,
  availableTours,
  whatsappNumber,
  brandName = 'Cusco Creativos',
  lang = 'es',
  currency,
  onCurrencyChange,
  onOpenQuoteModal
}: LiveBudgetCalculatorProps) {
  const [selectedTourId, setSelectedTourId] = useState<string>(() => {
    return availableTours && availableTours.length > 0 ? availableTours[0].id : 'default';
  });

  const activeTour = availableTours?.find(t => t.id === selectedTourId) || {
    id: 'default',
    title: tourTitle,
    price: `$${basePriceUSD} USD`,
    basePriceUSD: basePriceUSD,
    image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop',
    duration: 'Full Day',
    category: 'Tour Destacado',
    rating: 4.9
  };

  const currentTourTitle = activeTour.title;
  const currentBasePriceUSD = activeTour.basePriceUSD || basePriceUSD;
  const currentTourImage = activeTour.image || 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop';
  const currentTourDuration = activeTour.duration || 'Full Day';
  const currentTourCategory = activeTour.category || 'Tour';

  const [passengers, setPassengers] = useState<number>(2);
  const [serviceTier, setServiceTier] = useState<'standard' | 'vip' | 'panoramic'>('vip');
  const [extraHuayna, setExtraHuayna] = useState<boolean>(false);
  const [extraBuffet, setExtraBuffet] = useState<boolean>(true);
  const [extraPoles, setExtraPoles] = useState<boolean>(false);

  // Multiplicadores
  const tierMultiplier = serviceTier === 'vip' ? 1.35 : serviceTier === 'panoramic' ? 1.60 : 1.0;
  const isGroupDiscount = passengers >= 4;
  const discountRate = isGroupDiscount ? 0.90 : 1.0; // 10% OFF para grupos de 4 o más

  // Costo por persona
  const extraPerPersonUSD = (extraHuayna ? 25 : 0) + (extraBuffet ? 20 : 0) + (extraPoles ? 10 : 0);
  const perPersonTotalUSD = Math.round((currentBasePriceUSD * tierMultiplier + extraPerPersonUSD) * discountRate);
  const grandTotalUSD = perPersonTotalUSD * passengers;

  // Textos multi-idioma
  const dict = {
    es: {
      badge: 'Calculadora Interactiva de Tarifas',
      title: 'Cotiza tu Presupuesto al Instante',
      desc: 'Configura tus preferencias en la columna izquierda y selecciona cualquier tour a la derecha para ver tu presupuesto oficial en vivo.',
      labelPassengers: '1. Número de Viajeros',
      labelTier: '2. Modalidad de Servicio',
      tierStd: 'Estándar Compartido',
      tierVip: 'Servicio VIP Privado',
      tierPan: 'Panorámico 360°',
      labelExtras: '3. Adicionales & Privilegios Opcionales',
      extra1: 'Ingreso Especial Huayna Picchu (+ $25 USD/pers)',
      extra2: 'Almuerzo Gourmet Buffet en Valle Sagrado (+ $20 USD/pers)',
      extra3: 'Bastones de Trekking de Fibra de Carbono (+ $10 USD/pers)',
      discountBadge: '¡10% Descuento Grupal Aplicado!',
      totalLabel: 'Presupuesto Total Estimado',
      perPerson: 'por persona',
      btnWa: 'Reservar Tarifa por WhatsApp',
      btnQuote: 'Solicitar Cotización Formal',
      guarantee: 'Tarifa oficial garantizada sin cargos ocultos • Incluye traslados y seguro turístico',
      breakdownTitle: 'Desglose de Cotización',
      officialRateBadge: 'Tarifa Oficial 2026',
      selectedTourLabel: 'Tour Seleccionado:',
      passengersLabel: 'Pasajeros:',
      tierLabel: 'Modalidad:',
      groupDiscountLabel: 'Descuento de Grupo (4+):',
      currencyNotice: 'Moneda seleccionada: {curr} (Cambio en vivo)',
      // Columna derecha
      toursHeading: 'Catálogo de Tours Disponibles',
      toursSubheading: 'Selecciona una ruta para actualizar automáticamente el presupuesto y desglose',
      quotingNow: 'Cotizando Ahora',
      fromPrice: 'Desde',
      optionsCount: 'rutas disponibles',
      selectedBadge: 'Seleccionado'
    },
    en: {
      badge: 'Interactive Fare Calculator',
      title: 'Calculate Your Tour Budget in Real Time',
      desc: 'Set your travelers and options on the left, then pick any tour on the right to see your live quote.',
      labelPassengers: '1. Number of Travelers',
      labelTier: '2. Service Level',
      tierStd: 'Standard Group',
      tierVip: 'VIP Private Service',
      tierPan: 'Scenic 360° Panoramic',
      labelExtras: '3. Optional Add-ons & Perks',
      extra1: 'Huayna Picchu Special Access (+ $25 USD/pers)',
      extra2: 'Gourmet Buffet Lunch in Sacred Valley (+ $20 USD/pers)',
      extra3: 'Carbon Fiber Trekking Poles (+ $10 USD/pers)',
      discountBadge: '10% Group Discount Applied!',
      totalLabel: 'Estimated Total Budget',
      perPerson: 'per person',
      btnWa: 'Book this Quote via WhatsApp',
      btnQuote: 'Request Official Proposal',
      guarantee: 'Official guaranteed fare with no hidden fees • Includes certified transfers & tourist insurance',
      breakdownTitle: 'Quote Breakdown',
      officialRateBadge: 'Official 2026 Rate',
      selectedTourLabel: 'Selected Tour:',
      passengersLabel: 'Travelers:',
      tierLabel: 'Service Tier:',
      groupDiscountLabel: 'Group Discount (4+):',
      currencyNotice: 'Selected currency: {curr} (Live conversion)',
      // Right column
      toursHeading: 'Available Tours & Circuits',
      toursSubheading: 'Click on any tour to update your live budget quote and WhatsApp message',
      quotingNow: 'Quoting Now',
      fromPrice: 'From',
      optionsCount: 'available routes',
      selectedBadge: 'Selected'
    },
    pt: {
      badge: 'Calculadora Interativa de Tarifas',
      title: 'Calcule seu Orçamento em Tempo Real',
      desc: 'Ajuste seus viajantes e preferências à esquerda e selecione qualquer passeio à direita para cotação em tempo real.',
      labelPassengers: '1. Número de Viajantes',
      labelTier: '2. Modalidade de Serviço',
      tierStd: 'Padrão Compartilhado',
      tierVip: 'Serviço VIP Privado',
      tierPan: 'Panorâmico 360°',
      labelExtras: '3. Opcionais & Benefícios',
      extra1: 'Ingresso Huayna Picchu (+ $25 USD/pessoa)',
      extra2: 'Almoço Buffet Gourmet (+ $20 USD/pessoa)',
      extra3: 'Bastões de Trilha de Carbono (+ $10 USD/pessoa)',
      discountBadge: '10% Desconto de Grupo Aplicado!',
      totalLabel: 'Orçamento Total Estimado',
      perPerson: 'por pessoa',
      btnWa: 'Reservar Orçamento no WhatsApp',
      btnQuote: 'Solicitar Cotação Oficial',
      guarantee: 'Tarifa oficial garantida sem taxas ocultas • Inclui transporte e seguro turístico',
      breakdownTitle: 'Detalhamento do Orçamento',
      officialRateBadge: 'Tarifa Oficial 2026',
      selectedTourLabel: 'Passeio Selecionado:',
      passengersLabel: 'Viajantes:',
      tierLabel: 'Modalidade:',
      groupDiscountLabel: 'Desconto de Grupo (4+):',
      currencyNotice: 'Moeda selecionada: {curr} (Câmbio ao vivo)',
      // Right column
      toursHeading: 'Catálogo de Passeios Disponíveis',
      toursSubheading: 'Clique em qualquer passeio para recalcular o orçamento na hora',
      quotingNow: 'Cotando Agora',
      fromPrice: 'A partir de',
      optionsCount: 'roteiros disponíveis',
      selectedBadge: 'Selecionado'
    },
    fr: {
      badge: 'Calculateur de Tarif Interactif',
      title: 'Calculez votre Budget en Direct',
      desc: 'Configurez vos préférences à gauche et choisissez votre circuit à droite pour voir votre devis officiel en direct.',
      labelPassengers: '1. Nombre de Voyageurs',
      labelTier: '2. Catégorie de Service',
      tierStd: 'Standard Partagé',
      tierVip: 'VIP Privé',
      tierPan: 'Panoramique 360°',
      labelExtras: '3. Options & Privilèges',
      extra1: 'Entrée Huayna Picchu (+ $25 USD/pers)',
      extra2: 'Déjeuner Buffet Gourmet (+ $20 USD/pers)',
      extra3: 'Bâtons de Marche Carbone (+ $10 USD/pers)',
      discountBadge: 'Remise de Groupe 10% Appliquée !',
      totalLabel: 'Budget Total Estimé',
      perPerson: 'par personne',
      btnWa: 'Réserver ce Devis sur WhatsApp',
      btnQuote: 'Demander un Devis Formel',
      guarantee: 'Tarif officiel garanti sans frais cachés • Assistance et assurance touristique incluses',
      breakdownTitle: 'Détail du Devis',
      officialRateBadge: 'Tarif Officiel 2026',
      selectedTourLabel: 'Circuit Sélectionné :',
      passengersLabel: 'Voyageurs :',
      tierLabel: 'Catégorie :',
      groupDiscountLabel: 'Remise de Groupe (4+) :',
      currencyNotice: 'Devise sélectionnée : {curr} (Conversion directe)',
      // Right column
      toursHeading: 'Circuits Disponibles à la Carte',
      toursSubheading: 'Cliquez sur n’importe quel circuit pour recalculer automatiquement votre devis',
      quotingNow: 'Devis en cours',
      fromPrice: 'Dès',
      optionsCount: 'circuits disponibles',
      selectedBadge: 'Sélectionné'
    },
    it: {
      badge: 'Calcolatore Interattivo di Tariffe',
      title: 'Calcola il tuo Preventivo in Tempo Reale',
      desc: 'Imposta i tuoi viaggiatori a sinistra e seleziona il tour desiderato a destra per visualizzare il preventivo live.',
      labelPassengers: '1. Numero di Viaggiatori',
      labelTier: '2. Categoria di Servizio',
      tierStd: 'Standard Condiviso',
      tierVip: 'Servizio VIP Privato',
      tierPan: 'Panoramico 360°',
      labelExtras: '3. Optional & Privilegi',
      extra1: 'Accesso Huayna Picchu (+ $25 USD/pers)',
      extra2: 'Pranzo Buffet Gourmet (+ $20 USD/pers)',
      extra3: 'Bastoncini da Trekking in Carbonio (+ $10 USD/pers)',
      discountBadge: 'Sconto Gruppo 10% Applicato!',
      totalLabel: 'Preventivo Totale Stimato',
      perPerson: 'a persona',
      btnWa: 'Prenota Preventivo su WhatsApp',
      btnQuote: 'Richiedi Preventivo Ufficiale',
      guarantee: 'Tariffa ufficiale garantita senza costi nascosti • Include trasferimenti e assicurazione',
      breakdownTitle: 'Dettaglio Preventivo',
      officialRateBadge: 'Tariffa Ufficiale 2026',
      selectedTourLabel: 'Tour Selezionato:',
      passengersLabel: 'Viaggiatori:',
      tierLabel: 'Categoria:',
      groupDiscountLabel: 'Sconto Gruppo (4+):',
      currencyNotice: 'Valuta selezionata: {curr} (Cambio in tempo reale)',
      // Right column
      toursHeading: 'Catalogo dei Tour Disponibili',
      toursSubheading: 'Fai clic su qualsiasi tour per ricalcolare il preventivo all’istante',
      quotingNow: 'In Preventivo',
      fromPrice: 'Da',
      optionsCount: 'itinerari disponibili',
      selectedBadge: 'Selezionato'
    }
  }[lang] || {
    badge: 'Calculadora Interactiva de Tarifas',
    title: 'Cotiza tu Presupuesto al Instante',
    desc: 'Configura tus preferencias en la columna izquierda y selecciona cualquier tour a la derecha para ver tu presupuesto oficial en vivo.',
    labelPassengers: '1. Número de Viajeros',
    labelTier: '2. Modalidad de Servicio',
    tierStd: 'Estándar Compartido',
    tierVip: 'Servicio VIP Privado',
    tierPan: 'Panorámico 360°',
    labelExtras: '3. Adicionales & Privilegios Opcionales',
    extra1: 'Ingreso Especial Huayna Picchu (+ $25 USD/pers)',
    extra2: 'Almuerzo Gourmet Buffet en Valle Sagrado (+ $20 USD/pers)',
    extra3: 'Bastones de Trekking de Fibra de Carbono (+ $10 USD/pers)',
    discountBadge: '¡10% Descuento Grupal Aplicado!',
    totalLabel: 'Presupuesto Total Estimado',
    perPerson: 'por persona',
    btnWa: 'Reservar Tarifa por WhatsApp',
    btnQuote: 'Solicitar Cotización Formal',
    guarantee: 'Tarifa oficial garantizada sin cargos ocultos • Incluye traslados y seguro turístico',
    breakdownTitle: 'Desglose de Cotización',
    officialRateBadge: 'Tarifa Oficial 2026',
    selectedTourLabel: 'Tour Seleccionado:',
    passengersLabel: 'Pasajeros:',
    tierLabel: 'Modalidad:',
    groupDiscountLabel: 'Descuento de Grupo (4+):',
    currencyNotice: 'Moneda seleccionada: {curr} (Cambio en vivo)',
    toursHeading: 'Catálogo de Tours Disponibles',
    toursSubheading: 'Selecciona una ruta para actualizar automáticamente el presupuesto y desglose',
    quotingNow: 'Cotizando Ahora',
    fromPrice: 'Desde',
    optionsCount: 'rutas disponibles',
    selectedBadge: 'Seleccionado'
  };

  const handleSendWhatsApp = () => {
    const tierName = serviceTier === 'vip' ? dict.tierVip : serviceTier === 'panoramic' ? dict.tierPan : dict.tierStd;
    const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');
    const priceFormatted = convertPrice(grandTotalUSD, currency);

    const msg = `Hola ${brandName}, calculé mi presupuesto en su portal para el tour "${currentTourTitle}":\n` +
      `• Viajeros: ${passengers} personas\n` +
      `• Modalidad: ${tierName}\n` +
      (extraHuayna ? `• Adicional: Entrada Huayna Picchu\n` : '') +
      (extraBuffet ? `• Adicional: Almuerzo Gourmet Buffet\n` : '') +
      (extraPoles ? `• Adicional: Bastones de Trekking\n` : '') +
      `• Total Estimado: ${priceFormatted} (${convertPrice(perPersonTotalUSD, currency)} / persona)\n\n` +
      `¿Tienen cupos disponibles para las fechas próximas?`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="py-8 sm:py-16 bg-gradient-to-b from-stone-900 to-stone-950 text-white relative overflow-hidden">
      {/* Glow ambient background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Central */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5500]/20 text-[#FF8844] text-[10px] sm:text-xs font-black uppercase tracking-widest border border-[#FF5500]/30 shadow-md mb-3">
            <Calculator size={13} className="text-[#FF5500]" />
            <span>{dict.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            {dict.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
            {dict.desc}
          </p>

          {/* Currency Switcher */}
          {onCurrencyChange && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="text-xs font-bold text-stone-400">Moneda:</span>
              <div className="inline-flex bg-stone-800/90 rounded-xl p-1 border border-stone-700">
                {(['USD', 'PEN', 'EUR', 'BRL'] as CurrencyType[]).map((cur) => (
                  <button
                    key={cur}
                    type="button"
                    onClick={() => onCurrencyChange(cur)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      currency === cur
                        ? 'bg-[#FF5500] text-white shadow-md'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Calculator Main Grid: 2 Columnas Balanceadas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ======================================================== */}
          {/* COLUMNA IZQUIERDA: CONTROLES DE PRECIOS & DESGLOSE (6 cols) */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Panel de Configuración de Presupuesto */}
            <div className="bg-stone-900/90 backdrop-blur-xl rounded-3xl p-5 sm:p-7 border border-stone-800 shadow-2xl space-y-6">
              
              {/* 1. Selector de Pasajeros */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                    <Users size={14} className="text-[#FF5500]" />
                    <span>{dict.labelPassengers}</span>
                  </label>
                  {isGroupDiscount && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                      {dict.discountBadge}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-stone-950 rounded-2xl border border-stone-800 p-1">
                    <button
                      type="button"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      className="w-10 h-10 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-black text-lg flex items-center justify-center transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-14 text-center font-black text-lg text-white">
                      {passengers}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPassengers(Math.min(12, passengers + 1))}
                      className="w-10 h-10 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-black text-lg flex items-center justify-center transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-xs text-stone-400 leading-tight">
                    {passengers === 1 ? 'Viajero individual' : `${passengers} personas en tu grupo`}
                    {isGroupDiscount ? ' (Ahorro de 10% aplicado)' : ' (A partir de 4 pers: 10% OFF)'}
                  </div>
                </div>
              </div>

              {/* 2. Modalidad de Servicio */}
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-stone-300 block mb-2">
                  {dict.labelTier}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { key: 'standard' as const, label: dict.tierStd, tag: 'Económico', mult: 1.0 },
                    { key: 'vip' as const, label: dict.tierVip, tag: 'Recomendado ★', mult: 1.35 },
                    { key: 'panoramic' as const, label: dict.tierPan, tag: 'Vistadome 360°', mult: 1.60 }
                  ].map((t) => {
                    const isSelected = serviceTier === t.key;
                    return (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setServiceTier(t.key)}
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#FF5500]/15 border-[#FF5500] ring-1 ring-[#FF5500] shadow-md'
                            : 'bg-stone-950/80 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        <div>
                          <span className={`text-[9px] font-extrabold uppercase tracking-wider block mb-1 ${isSelected ? 'text-[#FF5500]' : 'text-stone-400'}`}>
                            {t.tag}
                          </span>
                          <span className="text-xs font-bold text-white block leading-snug">
                            {t.label}
                          </span>
                        </div>
                        <span className="text-[11px] font-black text-stone-300 mt-2 block">
                          {convertPrice(Math.round(currentBasePriceUSD * t.mult), currency)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Adicionales Opcionales */}
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-stone-300 block mb-2">
                  {dict.labelExtras}
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'huayna', label: dict.extra1, checked: extraHuayna, toggle: () => setExtraHuayna(!extraHuayna) },
                    { id: 'buffet', label: dict.extra2, checked: extraBuffet, toggle: () => setExtraBuffet(!extraBuffet) },
                    { id: 'poles', label: dict.extra3, checked: extraPoles, toggle: () => setExtraPoles(!extraPoles) }
                  ].map((extra) => (
                    <label
                      key={extra.id}
                      onClick={extra.toggle}
                      className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-colors ${
                        extra.checked 
                          ? 'bg-stone-800/90 border-[#FF5500]/50 text-white' 
                          : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                        extra.checked ? 'bg-[#FF5500] border-[#FF5500] text-white' : 'border-stone-700 bg-stone-900'
                      }`}>
                        {extra.checked && <Check size={13} strokeWidth={3} />}
                      </div>
                      <span className="text-xs font-medium leading-snug">{extra.label}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            {/* Tarjeta de Resumen / Desglose de Cotización */}
            <div className="bg-gradient-to-b from-stone-900 via-stone-900 to-black rounded-3xl p-5 sm:p-7 border border-stone-800 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  {dict.breakdownTitle}
                </span>
                <span className="text-[10px] font-black uppercase text-[#FF5500] bg-[#FF5500]/10 px-2 py-0.5 rounded-md">
                  {dict.officialRateBadge}
                </span>
              </div>

              <div className="py-1 space-y-2 text-xs text-stone-300">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-stone-400 shrink-0">{dict.selectedTourLabel}</span>
                  <span className="font-bold text-white text-right truncate max-w-[220px]" title={currentTourTitle}>
                    {currentTourTitle}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">{dict.passengersLabel}</span>
                  <span className="font-bold text-white">{passengers} viajeros</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">{dict.tierLabel}</span>
                  <span className="font-bold text-white capitalize">{serviceTier}</span>
                </div>
                {isGroupDiscount && (
                  <div className="flex items-center justify-between text-emerald-400">
                    <span>{dict.groupDiscountLabel}</span>
                    <span className="font-bold">-10%</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-stone-800/80">
                  <span className="text-stone-400">{dict.perPerson}:</span>
                  <span className="font-bold text-stone-200">
                    {convertPrice(perPersonTotalUSD, currency)}
                  </span>
                </div>
              </div>

              {/* Total Display */}
              <div className="p-4 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/30 text-center space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF8844] block">
                  {dict.totalLabel}
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {convertPrice(grandTotalUSD, currency)}
                </div>
                <span className="text-[10px] text-stone-400 block">
                  {dict.currencyNotice.replace('{curr}', currency)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-3.5 px-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-102 active:scale-98 cursor-pointer"
                >
                  <MessageCircle size={17} />
                  <span>{dict.btnWa}</span>
                </button>

                {onOpenQuoteModal && (
                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal(currentTourTitle)}
                    className="w-full bg-stone-800 hover:bg-stone-700 text-white py-3 px-4 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-stone-700 transition-all cursor-pointer"
                  >
                    <FileText size={15} />
                    <span>{dict.btnQuote}</span>
                  </button>
                )}

                <div className="flex items-center gap-2 text-[10px] text-stone-500 justify-center pt-1 text-center">
                  <ShieldCheck size={13} className="text-emerald-500 shrink-0" />
                  <span>{dict.guarantee}</span>
                </div>
              </div>

            </div>

          </div>

          {/* ======================================================== */}
          {/* COLUMNA DERECHA: CATÁLOGO DE TOURS DISPONIBLES (6 cols) */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 bg-stone-900/90 backdrop-blur-xl rounded-3xl p-5 sm:p-7 border border-stone-800 shadow-2xl space-y-4">
            
            {/* Header de la columna derecha */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FF5500]/20 flex items-center justify-center text-[#FF5500]">
                  <Compass size={17} />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white leading-tight">
                    {dict.toursHeading}
                  </h3>
                  <p className="text-[11px] text-stone-400 leading-tight">
                    {dict.toursSubheading}
                  </p>
                </div>
              </div>
              {availableTours && (
                <span className="text-[10px] text-stone-400 font-bold bg-stone-800/80 px-2.5 py-1 rounded-full border border-stone-700 shrink-0">
                  {availableTours.length} {dict.optionsCount}
                </span>
              )}
            </div>

            {/* Banner Preview del Tour Seleccionado Activo */}
            <div className="relative rounded-2xl overflow-hidden border border-[#FF5500]/50 shadow-lg group">
              <div className="h-32 sm:h-36 w-full relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={currentTourImage} 
                  alt={currentTourTitle}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
                
                {/* Badges superiores */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF5500] text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                    <Check size={11} strokeWidth={3} />
                    <span>{dict.quotingNow}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-amber-300 text-[10px] font-bold border border-white/10">
                    <Clock size={11} />
                    <span>{currentTourDuration}</span>
                  </span>
                </div>

                {/* Info inferior */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#FF8844] block">
                      {currentTourCategory}
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-white truncate drop-shadow-md">
                      {currentTourTitle}
                    </h4>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[9px] text-stone-400 block uppercase">
                      {dict.fromPrice}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-white bg-black/60 px-2 py-0.5 rounded-lg border border-white/10 block">
                      {convertPrice(currentBasePriceUSD, currency)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista Scrolleable de Tours con tarjetas fotográficas */}
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:#FF5500_#292524]">
              {availableTours && availableTours.map((t) => {
                const isSelected = selectedTourId === t.id;
                const tourImg = t.image || 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop';
                const tourDur = t.duration || 'Full Day';
                const tourCat = t.category || 'Tour';

                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTourId(t.id)}
                    className={`w-full p-2.5 sm:p-3 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-3 relative ${
                      isSelected
                        ? 'bg-[#FF5500]/15 border-[#FF5500] ring-2 ring-[#FF5500]/70 shadow-lg'
                        : 'bg-stone-950/70 border-stone-800/80 hover:border-stone-700 hover:bg-stone-900/90 text-stone-300'
                    }`}
                  >
                    {/* Miniatura del Tour */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 relative bg-stone-900 border border-stone-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={tourImg} 
                        alt={t.title}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#FF5500]/30 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-[#FF5500] text-white flex items-center justify-center shadow-md">
                            <Check size={14} strokeWidth={3} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Contenido del Tour */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-black uppercase text-[#FF8844] truncate">
                          {tourCat}
                        </span>
                        <span className="text-[10px] text-stone-400 flex items-center gap-0.5">
                          • <Clock size={10} /> {tourDur}
                        </span>
                      </div>
                      
                      <h4 className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-stone-200'}`}>
                        {t.title}
                      </h4>

                      <div className="flex items-center justify-between mt-1.5">
                        <div className="flex items-center gap-1 text-[11px] font-black text-white">
                          <span className="text-[10px] text-stone-400 font-normal">
                            {dict.fromPrice}
                          </span>
                          <span className="text-[#FF8844]">
                            {convertPrice(t.basePriceUSD, currency)}
                          </span>
                        </div>

                        {isSelected ? (
                          <span className="text-[10px] font-extrabold text-[#FF5500] bg-[#FF5500]/10 px-2 py-0.5 rounded-full border border-[#FF5500]/30">
                            {dict.selectedBadge}
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-stone-500 hover:text-stone-300">
                            Seleccionar →
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
