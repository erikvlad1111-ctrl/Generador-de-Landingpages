'use client';

import React, { useState } from 'react';
import { 
  Calculator, Users, Sparkles, Check, MessageCircle, 
  FileText, ShieldCheck, ArrowRight, Tag, HelpCircle
} from 'lucide-react';
import { LanguageType } from '@/types/landing';

export type CurrencyType = 'USD' | 'PEN' | 'EUR' | 'BRL';

interface LiveBudgetCalculatorProps {
  basePriceUSD?: number;
  tourTitle: string;
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
  whatsappNumber,
  brandName = 'Cusco Creativos',
  lang = 'es',
  currency,
  onCurrencyChange,
  onOpenQuoteModal
}: LiveBudgetCalculatorProps) {
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
  const perPersonTotalUSD = Math.round((basePriceUSD * tierMultiplier + extraPerPersonUSD) * discountRate);
  const grandTotalUSD = perPersonTotalUSD * passengers;

  // Textos multi-idioma
  const dict = {
    es: {
      badge: 'Calculadora Interactiva de Tarifas',
      title: 'Cotiza tu Presupuesto al Instante',
      desc: 'Selecciona la cantidad de viajeros, categoría de viaje y adicionales para calcular tu tarifa oficial en vivo.',
      labelPassengers: 'Número de Viajeros',
      labelTier: 'Modalidad de Servicio',
      tierStd: 'Estándar Compartido',
      tierVip: 'Servicio VIP Privado',
      tierPan: 'Panorámico 360°',
      labelExtras: 'Adicionales & Privilegios Opcionales',
      extra1: 'Ingreso Especial Huayna Picchu (+ $25 USD/pers)',
      extra2: 'Almuerzo Gourmet Buffet en Valle Sagrado (+ $20 USD/pers)',
      extra3: 'Bastones de Trekking de Fibra de Carbono (+ $10 USD/pers)',
      discountBadge: '¡10% Descuento Grupal Aplicado!',
      totalLabel: 'Presupuesto Total Estimado',
      perPerson: 'por persona',
      btnWa: 'Reservar Tarifa por WhatsApp',
      btnQuote: 'Solicitar Cotización Formal',
      guarantee: 'Tarifa oficial garantizada sin cargos ocultos • Incluye traslados y seguro turístico'
    },
    en: {
      badge: 'Interactive Fare Calculator',
      title: 'Calculate Your Tour Budget in Real Time',
      desc: 'Choose the number of travelers, service category and optional perks to get your live quote.',
      labelPassengers: 'Number of Travelers',
      labelTier: 'Service Level',
      tierStd: 'Standard Group',
      tierVip: 'VIP Private Service',
      tierPan: 'Scenic 360° Panoramic',
      labelExtras: 'Optional Add-ons & Perks',
      extra1: 'Huayna Picchu Special Access (+ $25 USD/pers)',
      extra2: 'Gourmet Buffet Lunch in Sacred Valley (+ $20 USD/pers)',
      extra3: 'Carbon Fiber Trekking Poles (+ $10 USD/pers)',
      discountBadge: '10% Group Discount Applied!',
      totalLabel: 'Estimated Total Budget',
      perPerson: 'per person',
      btnWa: 'Book this Quote via WhatsApp',
      btnQuote: 'Request Official Proposal',
      guarantee: 'Official guaranteed fare with no hidden fees • Includes certified transfers & tourist insurance'
    },
    pt: {
      badge: 'Calculadora Interativa de Tarifas',
      title: 'Calcule seu Orçamento em Tempo Real',
      desc: 'Escolha o número de viajantes, categoria de serviço e adicionais para obter seu orçamento ao vivo.',
      labelPassengers: 'Número de Viajantes',
      labelTier: 'Modalidade de Serviço',
      tierStd: 'Padrão Compartilhado',
      tierVip: 'Serviço VIP Privado',
      tierPan: 'Panorâmico 360°',
      labelExtras: 'Opcionais & Benefícios',
      extra1: 'Ingresso Huayna Picchu (+ $25 USD/pessoa)',
      extra2: 'Almoço Buffet Gourmet (+ $20 USD/pessoa)',
      extra3: 'Bastões de Trilha de Carbono (+ $10 USD/pessoa)',
      discountBadge: '10% Desconto de Grupo Aplicado!',
      totalLabel: 'Orçamento Total Estimado',
      perPerson: 'por pessoa',
      btnWa: 'Reservar Orçamento no WhatsApp',
      btnQuote: 'Solicitar Cotação Oficial',
      guarantee: 'Tarifa oficial garantida sem taxas ocultas • Inclui transporte e seguro turístico'
    },
    fr: {
      badge: 'Calculateur de Tarif Interactif',
      title: 'Calculez votre Budget en Direct',
      desc: 'Choisissez le nombre de voyageurs, la catégorie de service et les options pour obtenir votre devis en direct.',
      labelPassengers: 'Nombre de Voyageurs',
      labelTier: 'Catégorie de Service',
      tierStd: 'Standard Partagé',
      tierVip: 'VIP Privé',
      tierPan: 'Panoramique 360°',
      labelExtras: 'Options & Privilèges',
      extra1: 'Entrée Huayna Picchu (+ $25 USD/pers)',
      extra2: 'Déjeuner Buffet Gourmet (+ $20 USD/pers)',
      extra3: 'Bâtons de Marche Carbone (+ $10 USD/pers)',
      discountBadge: 'Remise de Groupe 10% Appliquée !',
      totalLabel: 'Budget Total Estimé',
      perPerson: 'par personne',
      btnWa: 'Réserver ce Devis sur WhatsApp',
      btnQuote: 'Demander un Devis Formel',
      guarantee: 'Tarif officiel garanti sans frais cachés • Assistance et assurance touristique incluses'
    },
    it: {
      badge: 'Calcolatore Interattivo di Tariffe',
      title: 'Calcola il tuo Preventivo in Tempo Reale',
      desc: 'Scegli il numero di viaggiatori, il livello di servizio e gli optional per calcolare la tua tariffa live.',
      labelPassengers: 'Numero di Viaggiatori',
      labelTier: 'Categoria di Servizio',
      tierStd: 'Standard Condiviso',
      tierVip: 'Servizio VIP Privato',
      tierPan: 'Panoramico 360°',
      labelExtras: 'Optional & Privilegi',
      extra1: 'Accesso Huayna Picchu (+ $25 USD/pers)',
      extra2: 'Pranzo Buffet Gourmet (+ $20 USD/pers)',
      extra3: 'Bastoncini da Trekking in Carbonio (+ $10 USD/pers)',
      discountBadge: 'Sconto Gruppo 10% Applicato!',
      totalLabel: 'Preventivo Totale Stimato',
      perPerson: 'a persona',
      btnWa: 'Prenota Preventivo su WhatsApp',
      btnQuote: 'Richiedi Preventivo Ufficiale',
      guarantee: 'Tariffa ufficiale garantita senza costi nascosti • Include trasferimenti e assicurazione'
    }
  }[lang] || {
    badge: 'Calculadora Interactiva de Tarifas',
    title: 'Cotiza tu Presupuesto al Instante',
    desc: 'Selecciona la cantidad de viajeros, categoría de viaje y adicionales para calcular tu tarifa oficial en vivo.',
    labelPassengers: 'Número de Viajeros',
    labelTier: 'Modalidad de Servicio',
    tierStd: 'Estándar Compartido',
    tierVip: 'Servicio VIP Privado',
    tierPan: 'Panorámico 360°',
    labelExtras: 'Adicionales & Privilegios Opcionales',
    extra1: 'Ingreso Especial Huayna Picchu (+ $25 USD/pers)',
    extra2: 'Almuerzo Gourmet Buffet en Valle Sagrado (+ $20 USD/pers)',
    extra3: 'Bastones de Trekking de Fibra de Carbono (+ $10 USD/pers)',
    discountBadge: '¡10% Descuento Grupal Aplicado!',
    totalLabel: 'Presupuesto Total Estimado',
    perPerson: 'por persona',
    btnWa: 'Reservar Tarifa por WhatsApp',
    btnQuote: 'Solicitar Cotización Formal',
    guarantee: 'Tarifa oficial garantizada sin cargos ocultos • Incluye traslados y seguro turístico'
  };

  const handleSendWhatsApp = () => {
    const tierName = serviceTier === 'vip' ? dict.tierVip : serviceTier === 'panoramic' ? dict.tierPan : dict.tierStd;
    const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');
    const priceFormatted = convertPrice(grandTotalUSD, currency);

    const msg = `Hola ${brandName}, calculé mi presupuesto en su portal para el tour "${tourTitle}":\n` +
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
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

          {/* Currency Switcher inside calculator */}
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

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-stone-900/90 backdrop-blur-xl rounded-3xl p-5 sm:p-7 border border-stone-800 shadow-2xl space-y-6">
            
            {/* 1. Passengers Selector */}
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

            {/* 2. Service Tier Selector */}
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
                          ? 'bg-[#FF5500]/15 border-[#FF5500] ring-1 ring-[#FF5500]'
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
                        {convertPrice(Math.round(basePriceUSD * t.mult), currency)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Optional Extras Checkboxes */}
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

          {/* Result Card Column (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-stone-900 via-stone-900 to-black rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-2xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Desglose de Cotización
                </span>
                <span className="text-[10px] font-black uppercase text-[#FF5500] bg-[#FF5500]/10 px-2 py-0.5 rounded-md">
                  Tarifa Oficial 2026
                </span>
              </div>

              <div className="py-4 space-y-2.5 text-xs text-stone-300">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Tour Seleccionado:</span>
                  <span className="font-bold text-white text-right max-w-[190px] truncate" title={tourTitle}>
                    {tourTitle}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Pasajeros:</span>
                  <span className="font-bold text-white">{passengers} viajeros</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Modalidad:</span>
                  <span className="font-bold text-white capitalize">{serviceTier}</span>
                </div>
                {isGroupDiscount && (
                  <div className="flex items-center justify-between text-emerald-400">
                    <span>Descuento de Grupo (4+):</span>
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
                  Moneda seleccionada: {currency} (Cambio en vivo)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
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
                  onClick={() => onOpenQuoteModal(tourTitle)}
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

      </div>
    </section>
  );
}
