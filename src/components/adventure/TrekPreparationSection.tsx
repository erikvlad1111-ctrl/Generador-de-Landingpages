'use client';

import React from 'react';
import { HeartPulse, ShieldCheck, Sun, CloudRain, Clock, CheckCircle, AlertTriangle, Sparkles, Thermometer } from 'lucide-react';
import { LanguageType } from '@/types/landing';

interface PrepProps {
  lang?: LanguageType;
}

export default function TrekPreparationSection({ lang = 'es' }: PrepProps) {
  const isEn = lang === 'en';
  const isPt = lang === 'pt';
  const isFr = lang === 'fr';
  const isIt = lang === 'it';

  const t = {
    badge: isEn ? 'SAFETY & ACCLIMATIZATION PROTOCOL' : isPt ? 'PROTOCOLO DE SEGURANÇA & ACLIMATAÇÃO' : isFr ? 'PROTOCOLE DE SÉCURITÉ & SANTÉ' : isIt ? 'SICUREZZA & PROTOCOLLO MEDICO' : 'SEGURIDAD, ACLIMATACIÓN & CLIMA',
    title: isEn ? 'Preparation, Altitude & Weather Guide' : isPt ? 'Preparação Física, Altitude & Clima' : isFr ? 'Préparation Physique, Altitude & Météo' : isIt ? 'Preparazione Fisica, Altitudine & Meteo' : 'Preparación, Aclimatación y Clima',
    subtitle: isEn
      ? 'Everything you need to know about altitude adjustment, high-mountain medical safety protocols, and seasonal weather conditions.'
      : isPt
      ? 'Tudo o que você precisa saber sobre adaptação à altitude, protocolos médicos de segurança e estações climáticas nos Andes.'
      : isFr
      ? 'Tout ce qu’il faut savoir sur l’acclimatation à l’altitude, la sécurité médicale en haute montagne et la météo saisonnière.'
      : isIt
      ? 'Tutto ciò che devi sapere sull’adattamento all’altitudine, protocolli di emergenza e meteo lungo il sentiero.'
      : 'Todo lo que necesitas saber sobre aclimatación médica, protocolos de seguridad con oxígeno portátil y las mejores temporadas climáticas.',
    cards: [
      {
        icon: 'acclimatization',
        title: isEn ? 'Acclimatization in Cusco (48h Minimum)' : isPt ? 'Aclimatação em Cusco (Mínimo 48h)' : isFr ? 'Acclimatation à Cusco (48h Minimum)' : isIt ? 'Acclimatazione a Cusco (Minimo 48h)' : 'Aclimatación en Cusco (48h Previas)',
        badge: isEn ? 'Essential Rule' : isPt ? 'Regra de Ouro' : isFr ? 'Règle Essentielle' : isIt ? 'Regola d’Oro' : 'Regla Médica Vital',
        desc: isEn
          ? 'To avoid altitude sickness (soroche) when crossing the 4,630m pass, plan to arrive in Cusco (3,400m) at least 2 full days before your trek.'
          : isPt
          ? 'Para evitar o mal de altitude (soroche) ao cruzar o passo de 4.630m, planeje chegar a Cusco (3.400m) pelo menos 2 dias inteiros antes do início da trilha.'
          : isFr
          ? 'Pour éviter le mal aigu des montagnes lors du passage du col à 4 630m, prévoyez d’arriver à Cusco (3 400m) au moins 2 jours avant le départ.'
          : isIt
          ? 'Per prevenire il mal di montagna prima del passo a 4.630m, ti consigliamo di arrivare a Cusco (3.400m) almeno 2 giorni prima del trekking.'
          : 'Para prevenir el mal de altura (soroche) al cruzar los 4,630 msnm, recomendamos llegar a Cusco (3,400 msnm) mínimo 2 días antes de iniciar el trek.',
        points: [
          isEn ? 'Drink 2 to 3 liters of water daily & coca tea' : isPt ? 'Beba 2 a 3 litros de água por dia & chá de coca' : isFr ? 'Boire 2 à 3 litres d’eau par jour & thé de coca' : isIt ? 'Bevi 2-3 litri d’acqua al giorno & tè di coca' : 'Beber 2 a 3 litros de agua diarios y mate de coca',
          isEn ? 'Light carbohydrate meals during first 24h' : isPt ? 'Refeições leves ricas em carboidratos nas primeiras 24h' : isFr ? 'Repas légers et digestes les premières 24h' : isIt ? 'Pasti leggeri e digeribili nelle prime 24 ore' : 'Comidas ligeras y de fácil digestión las primeras 24h',
          isEn ? 'Short gentle city walks (San Blas, Plaza)' : isPt ? 'Caminhadas leves pela cidade (San Blas, Centro)' : isFr ? 'Petites marches tranquilles en ville (San Blas)' : isIt ? 'Passeggiate tranquille in città (San Blas, Centro)' : 'Caminatas suaves por Cusco (San Blas o Sacsayhuamán)'
        ]
      },
      {
        icon: 'medical',
        title: isEn ? '24/7 Medical Oxygen & WFR Certified Guides' : isPt ? 'Oxigênio 24/7 & Guias WFR Certificados' : isFr ? 'Oxygène Médical 24/7 & Guides Certifiés WFR' : isIt ? 'Ossigeno 24/7 & Guide Certificate WFR' : 'Oxígeno Medicinal 24/7 y Guías WFR',
        badge: isEn ? 'Certified Safety' : isPt ? 'Segurança Certificada' : isFr ? 'Sécurité Garantie' : isIt ? 'Massima Sicurezza' : 'Garantía Médica Oficial',
        desc: isEn
          ? 'Every group travels with a pressurized medical oxygen tank, altitude pulse-oximeters, satellite radios, and a wilderness-certified lead guide.'
          : isPt
          ? 'Cada grupo é acompanhado de cilindro portátil de oxigênio medicinal, oxímetro de pulso, rádio satelital e guia com certificação internacional WFR.'
          : isFr
          ? 'Chaque groupe dispose d’une bouteille d’oxygène médical portable, d’un oxymètre de pouls, de radios et d’un guide certifié Wilderness First Responder.'
          : isIt
          ? 'Ogni spedizione include bombola di ossigeno portatile, pulsossimetro, radio satellitare e guida alpina certificata Wilderness First Responder.'
          : 'Cada expedición cuenta con balón de oxígeno medicinal presurizado, oxímetro de pulso diario, radio de emergencia y guía oficial con certificación Wilderness First Responder.',
        points: [
          isEn ? 'Portable medical oxygen available at every camp' : isPt ? 'Oxigênio medicinal portátil em todos os acampamentos' : isFr ? 'Oxygène médical disponible à chaque étape' : isIt ? 'Ossigeno medico disponibile in ogni campo' : 'Balón de oxígeno portátil disponible en cada campamento',
          isEn ? 'Daily pulse & blood-oxygen saturation checks' : isPt ? 'Monitoramento diário de oxigenação no sangue' : isFr ? 'Contrôle quotidien de la saturation en oxygène' : isIt ? 'Controllo giornaliero della saturazione di ossigeno' : 'Monitoreo diario de oxigenación en sangre con oxímetro',
          isEn ? 'Comprehensive high-altitude trauma medical kit' : isPt ? 'Kit completo de primeiros socorros de alta montanha' : isFr ? 'Trousse de secours complète de haute montagne' : isIt ? 'Kit medico completo per emergenze in quota' : 'Botiquín de primeros auxilios y evacuación de montaña'
        ]
      },
      {
        icon: 'weather',
        title: isEn ? 'Seasons & Microclimates Guide' : isPt ? 'Estações do Ano & Microclimas' : isFr ? 'Saisons & Microclimats Andins' : isIt ? 'Stagioni & Microclimi Andini' : 'Clima Andino y Mejores Temporadas',
        badge: isEn ? 'All-Year Departures' : isPt ? 'Saídas o Ano Todo' : isFr ? 'Départs toute l’année' : isIt ? 'Partenze tutto l’anno' : 'Salidas Todo el Año',
        desc: isEn
          ? 'Salkantay crosses 3 distinct ecological floors: from sub-zero glacial peaks to warm humid cloud forest valleys.'
          : isPt
          ? 'O Salkantay atravessa 3 pisos ecológicos: de picos nevados abaixo de zero até vales subtropicais quentes e úmidos.'
          : isFr
          ? 'Le trek traverse 3 étages écologiques : des sommets glaciaires aux vallées chaudes et humides de la forêt de nuages.'
          : isIt
          ? 'Il trekking attraversa 3 zone climatiche: dai passi glaciali alle vallate calde e umide della foresta pluviale.'
          : 'El Salkantay atraviesa 3 pisos ecológicos: desde cumbres glaciares gélidas hasta los valles subtropicales cálidos de ceja de selva.',
        points: [
          isEn ? 'Dry Season (May - Oct): Clear skies, cold nights (-2°C)' : isPt ? 'Estação Seca (Mai - Out): Céus limpos, noites frias (-2°C)' : isFr ? 'Saison sèche (Mai - Oct) : Ciels dégagés, nuits fraîches' : isIt ? 'Stagione secca (Mag - Ott): Cieli limpidi, notti fredde' : 'Temporada Seca (Mayo a Octubre): Cielos despejados, noches frías (-2°C)',
          isEn ? 'Green Season (Nov - Apr): Warmer temps, lush flora' : isPt ? 'Estação Verde (Nov - Abr): Clima ameno, cachoeiras cheias' : isFr ? 'Saison verte (Nov - Avr) : Plus doux, cascades abondantes' : isIt ? 'Stagione verde (Nov - Apr): Più mite, vegetazione lussureggiante' : 'Temporada Verde (Noviembre a Abril): Clima más templado y cascadas caudalosas',
          isEn ? '3-layer clothing system recommended (base, fleece, shell)' : isPt ? 'Sistema de 3 camadas recomendado (térmica, fleece, corta-vento)' : isFr ? 'Système 3 couches conseillé (thermique, polaire, veste imperméable)' : isIt ? 'Consigliato abbigliamento a 3 strati (termico, pile, antivento)' : 'Sistema de 3 capas recomendado: térmica, polar y chaqueta impermeable'
        ]
      }
    ]
  };

  return (
    <section id="preparacion" className="py-16 sm:py-24 px-4 sm:px-8 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-14">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-black uppercase tracking-wider shadow-2xs">
            <HeartPulse size={14} className="text-rose-600" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* 3 Strategy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {t.cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between text-left group"
            >
              <div className="space-y-4">
                {/* Card Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-2xs ${
                    idx === 0 
                      ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' 
                      : idx === 1 
                      ? 'bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white' 
                      : 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white'
                  }`}>
                    {card.icon === 'acclimatization' ? (
                      <Clock size={22} />
                    ) : card.icon === 'medical' ? (
                      <HeartPulse size={22} />
                    ) : (
                      <Thermometer size={22} />
                    )}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    {card.badge}
                  </span>
                </div>

                <h3 className="font-black text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="pt-4 border-t border-slate-100 mt-4 space-y-2">
                {card.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-medium leading-tight">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
