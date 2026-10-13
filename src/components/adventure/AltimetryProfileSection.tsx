'use client';

import React, { useState } from 'react';
import { Mountain, Activity, ArrowUpRight, TrendingUp, Compass, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { LanguageType } from '@/types/landing';

interface AltimetryProps {
  lang?: LanguageType;
}

export default function AltimetryProfileSection({ lang = 'es' }: AltimetryProps) {
  const [activeStage, setActiveStage] = useState(1);

  const isEn = lang === 'en';
  const isPt = lang === 'pt';
  const isFr = lang === 'fr';
  const isIt = lang === 'it';

  const t = {
    badge: isEn ? 'ELEVATION PROFILE & DATA' : isPt ? 'PERFIL ALTIMÉTRICO & DADOS' : isFr ? 'PROFIL ALTIMÉTRIQUE' : isIt ? 'PROFILO ALTIMETRICO' : 'ALTITUD & DESNIVEL TÉCNICO',
    title: isEn ? 'Elevation Profile & Trail Stages' : isPt ? 'Perfil Altimétrico & Etapas da Trilha' : isFr ? 'Profil d’Élévation & Étapes du Trek' : isIt ? 'Profilo di Altitudine & Tappe' : 'Perfil Altimétrico y Desnivel por Etapas',
    subtitle: isEn 
      ? 'Daily summits, elevation gains, and distances to evaluate your physical effort across the Andes and into the cloud forest.'
      : isPt
      ? 'Altitudes diárias, desníveis acumulados e distâncias para avaliar seu esforço físico cruzando os Andes até a floresta nublada.'
      : isFr
      ? 'Sommets quotidiens, dénivelés et distances pour évaluer votre effort physique à travers les Andes jusqu’à la forêt tropicale.'
      : isIt
      ? 'Quote massime, dislivelli e distanze giornaliere per pianificare il tuo sforzo fisico attraverso le Ande.'
      : 'Cotas máximas, distancias y desniveles acumulados para planificar con precisión tu esfuerzo físico en la cordillera.',
    stats: {
      maxAlt: isEn ? 'Max Altitude' : isPt ? 'Altitude Máxima' : isFr ? 'Altitude Max' : isIt ? 'Altitudine Max' : 'Punto Más Alto',
      maxAltVal: '4,630 msnm',
      maxAltSub: isEn ? 'Salkantay Pass Summit' : isPt ? 'Passo Salkantay' : isFr ? 'Col de Salkantay' : isIt ? 'Passo Salkantay' : 'Paso Abra Salkantay',
      elevGain: isEn ? 'Elevation Gain/Loss' : isPt ? 'Desnível Acumulado' : isFr ? 'Dénivelé Cumulé' : isIt ? 'Dislivello Totale' : 'Desnivel Acumulado',
      elevGainVal: '+2,180m / -3,150m',
      elevGainSub: isEn ? 'High Andes to Rainforest' : isPt ? 'Andes à Selva Alta' : isFr ? 'Haute montagne à jungle' : isIt ? 'Ande a Foresta Pluviale' : 'De Puna Glaciar a Selva',
      totalDist: isEn ? 'Trekking Distance' : isPt ? 'Distância a Pé' : isFr ? 'Distance à Pied' : isIt ? 'Distanza a Piedi' : 'Distancia Total a Pie',
      totalDistVal: '74 km (46 mi)',
      totalDistSub: isEn ? '5 Days Full Circuit' : isPt ? '5 Dias de Circuito' : isFr ? 'Circuit complet 5 jours' : isIt ? 'Circuito Completo 5 Giorni' : '5 Días de Expedición',
      diff: isEn ? 'Physical Demand' : isPt ? 'Exigência Física' : isFr ? 'Niveau Physique' : isIt ? 'Livello Fisico' : 'Exigencia Física',
      diffVal: isEn ? 'Demanding (4/5)' : isPt ? 'Exigente (4/5)' : isFr ? 'Exigeant (4/5)' : isIt ? 'Impegnativo (4/5)' : 'Nivel 4 / 5 (Exigente)',
      diffSub: isEn ? 'Active Acclimatization' : isPt ? 'Aclimatação Recomendada' : isFr ? 'Acclimatation 2 jours' : isIt ? 'Acclimatazione 2 giorni' : 'Aclimatación previa requerida',
    },
    clickStage: isEn ? 'Click on any stage to see terrain details:' : isPt ? 'Clique em qualquer etapa para ver os detalhes:' : isFr ? 'Cliquez sur une étape pour les détails:' : isIt ? 'Clicca su una tappa per i dettagli:' : 'Haz clic en cada etapa para ver el perfil técnico detallado:',
    stageLabel: isEn ? 'Stage' : isPt ? 'Etapa' : isFr ? 'Étape' : isIt ? 'Tappa' : 'Etapa',
    distanceLabel: isEn ? 'Distance' : isPt ? 'Distância' : isFr ? 'Distance' : isIt ? 'Distanza' : 'Distancia',
    timeLabel: isEn ? 'Duration' : isPt ? 'Tempo de Marcha' : isFr ? 'Temps de marche' : isIt ? 'Tempo di Marcia' : 'Tiempo estimado',
    elevationLabel: isEn ? 'Elevation' : isPt ? 'Desnível' : isFr ? 'Dénivelé' : isIt ? 'Dislivello' : 'Desnivel',
    terrainLabel: isEn ? 'Terrain' : isPt ? 'Terreno' : isFr ? 'Terrain' : isIt ? 'Terreno' : 'Tipo de terreno',
    stages: [
      {
        day: 1,
        title: isEn ? 'Cusco ➔ Soraypampa & Humantay Lake' : isPt ? 'Cusco ➔ Soraypampa & Laguna Humantay' : isFr ? 'Cusco ➔ Soraypampa & Lac Humantay' : isIt ? 'Cusco ➔ Soraypampa & Laguna Humantay' : 'Cusco ➔ Soraypampa & Laguna Humantay',
        startAlt: '3,400 m',
        maxAlt: '4,200 m',
        endAlt: '3,900 m',
        distance: '13 km',
        time: '5 - 6 h',
        elevation: '+800 m / -300 m',
        terrain: isEn ? 'Andean grassland & glacial moraine' : isPt ? 'Pastagem andina & morena glacial' : isFr ? 'Pâturages andins & moraine glaciaire' : isIt ? 'Prateria andina & morena glaciale' : 'Pastizal andino & morrena glaciar',
        desc: isEn 
          ? 'Drive from Cusco to Mollepata, trek to base camp at Soraypampa and hike up to the mystical turquoise Humantay Lake.'
          : isPt
          ? 'Saída de Cusco até Mollepata, caminhada até Soraypampa e subida opcional à sagrada Laguna Humantay turquesa.'
          : isFr
          ? 'Trajet de Cusco à Mollepata, marche vers Soraypampa puis ascension vers le lac turquoise sacré de Humantay.'
          : isIt
          ? 'Partenza da Cusco verso Mollepata, trekking a Soraypampa e ascesa alla turchese Laguna Humantay.'
          : 'Partida de Cusco a Mollepata, caminata hacia el campamento base de Soraypampa y ascenso a la sagrada Laguna Humantay turquesa.',
        badge: isEn ? 'Acclimatization Day' : isPt ? 'Aclimatação Ativa' : isFr ? 'Acclimatation' : isIt ? 'Acclimatazione' : 'Aclimatación Activa',
        highlight: '4,200 m'
      },
      {
        day: 2,
        title: isEn ? 'Soraypampa ➔ Salkantay Pass Summit ➔ Chaullay' : isPt ? 'Soraypampa ➔ Passo Salkantay ➔ Chaullay' : isFr ? 'Soraypampa ➔ Col Salkantay ➔ Chaullay' : isIt ? 'Soraypampa ➔ Passo Salkantay ➔ Chaullay' : 'Soraypampa ➔ Abra Salkantay ➔ Chaullay',
        startAlt: '3,900 m',
        maxAlt: '4,630 m',
        endAlt: '2,900 m',
        distance: '22 km',
        time: '8 - 9 h',
        elevation: '+730 m / -1,730 m',
        terrain: isEn ? 'High alpine pass, rocky moraine, cloud forest descent' : isPt ? 'Passo alpino de alta montanha, morena rochosa & selva alta' : isFr ? 'Col alpin, moraine rocheuse et descente en forêt de nuages' : isIt ? 'Passo alpino roccioso e discesa in foresta pluviale' : 'Puna alpina, morrena rocosa glaciar y ceja de selva',
        desc: isEn
          ? 'The queen stage: early dawn push to the snowy Salkantay Pass (4,630m), followed by a continuous descent into warm cloud forest.'
          : isPt
          ? 'A etapa rainha: subida ao emblemático Passo Salkantay (4.630m) frente ao nevado sagrado e descida espetacular à floresta quente.'
          : isFr
          ? 'L’étape reine : ascension matinale au col du Salkantay (4 630m) face au glacier, puis longue descente vers la jungle tempérée.'
          : isIt
          ? 'La tappa regina: ascesa all’Abra Salkantay (4.630m) sotto i ghiacciai e discesa nella vegetazione subtropicale.'
          : 'La jornada reina: ascenso matutino al imponente Abra Salkantay (4,630m) bajo el glaciar sagrado y descenso a la ceja de selva.',
        badge: isEn ? 'Highest Pass (4,630m)' : isPt ? 'Ponto Culminante (4.630m)' : isFr ? 'Point culminant' : isIt ? 'Punto più alto' : 'Cima del Trek (4,630m)',
        highlight: '4,630 m'
      },
      {
        day: 3,
        title: isEn ? 'Chaullay ➔ Collpapampa ➔ Lucmabamba' : isPt ? 'Chaullay ➔ Collpapampa ➔ Lucmabamba' : isFr ? 'Chaullay ➔ Collpapampa ➔ Lucmabamba' : isIt ? 'Chaullay ➔ Collpapampa ➔ Lucmabamba' : 'Chaullay ➔ Collpapampa ➔ Lucmabamba',
        startAlt: '2,900 m',
        maxAlt: '2,900 m',
        endAlt: '2,060 m',
        distance: '15 km',
        time: '5 - 6 h',
        elevation: '-840 m',
        terrain: isEn ? 'Subtropical canyon, waterfalls, organic coffee farms' : isPt ? 'Canhão subtropical, cachoeiras & plantações de café' : isFr ? 'Canyon subtropical, cascades & caféiers bios' : isIt ? 'Canyon subtropicale, cascate & piantagioni di caffè' : 'Cañón fluvial subtropical, cascadas y cafetales orgánicos',
        desc: isEn
          ? 'Milder hike through the Santa Teresa valley, crossing suspension bridges, exotic fruit orchards and organic coffee farms.'
          : isPt
          ? 'Caminhada cênica ao longo do vale Santa Teresa, cruzando pontes suspensas, orquídeas e fazendas de café orgânico.'
          : isFr
          ? 'Randonnée plus douce le long de la rivière Santa Teresa, au milieu des cascades, des bananiers et des plantations de café.'
          : isIt
          ? 'Cammino rilassante attraverso la valle di Santa Teresa, tra ponti sospesi, cascate e piantagioni di caffè biologico.'
          : 'Caminata escénica junto al cañón del río Santa Teresa, cruzando puentes colgantes, orquídeas y haciendas cafetaleras orgánicas.',
        badge: isEn ? 'Coffee & Waterfalls' : isPt ? 'Cachoeiras & Café' : isFr ? 'Cascades & Café' : isIt ? 'Cascate & Caffè' : 'Cascadas & Cafetales',
        highlight: '2,060 m'
      },
      {
        day: 4,
        title: isEn ? 'Lucmabamba ➔ Llactapata Inca Trail ➔ Aguas Calientes' : isPt ? 'Lucmabamba ➔ Llactapata ➔ Aguas Calientes' : isFr ? 'Lucmabamba ➔ Llactapata ➔ Aguas Calientes' : isIt ? 'Lucmabamba ➔ Llactapata ➔ Aguas Calientes' : 'Lucmabamba ➔ Llactapata ➔ Aguas Calientes',
        startAlt: '2,060 m',
        maxAlt: '2,730 m',
        endAlt: '2,040 m',
        distance: '18 km',
        time: '6 - 7 h',
        elevation: '+670 m / -690 m',
        terrain: isEn ? 'Original Inca stone trail, ruins, jungle train track' : isPt ? 'Trilha inca de pedra original, ruínas & trilhos da floresta' : isFr ? 'Sentier inca en pierre d’origine, ruines & voie ferrée' : isIt ? 'Sentiero inca originale in pietra & bosco' : 'Sendero inca empedrado, ruinas arqueológicas y ceja de selva',
        desc: isEn
          ? 'Ascend an ancient Inca road to Llactapata ruins for an exclusive distant frontal view of Machu Picchu, then descend to the train track to Aguas Calientes.'
          : isPt
          ? 'Subida por uma trilha inca original até o sítio de Llactapata com visão frontal única de Machu Picchu antes de descer para Aguas Calientes.'
          : isFr
          ? 'Ascension d’un sentier inca d’époque vers les ruines de Llactapata offrant une vue panoramique rare sur le Machu Picchu.'
          : isIt
          ? 'Salita su un sentiero inca originale fino a Llactapata con vista frontale esclusiva su Machu Picchu e arrivo ad Aguas Calientes.'
          : 'Ascenso por un tramo original del Camino Inca hasta el mirador de Llactapata con vista frontal inédita de Machu Picchu.',
        badge: isEn ? 'Machu Picchu View' : isPt ? 'Vista de Machu Picchu' : isFr ? 'Vue Machu Picchu' : isIt ? 'Vista Machu Picchu' : 'Mirador Llactapata',
        highlight: '2,730 m'
      },
      {
        day: 5,
        title: isEn ? 'Aguas Calientes ➔ Machu Picchu Sanctuary ➔ Cusco' : isPt ? 'Aguas Calientes ➔ Machu Picchu ➔ Cusco' : isFr ? 'Aguas Calientes ➔ Sanctuaire Machu Picchu ➔ Cusco' : isIt ? 'Aguas Calientes ➔ Santuario Machu Picchu ➔ Cusco' : 'Aguas Calientes ➔ Santuario Machu Picchu ➔ Cusco',
        startAlt: '2,040 m',
        maxAlt: '2,430 m',
        endAlt: '3,400 m',
        distance: '6 km',
        time: '3 - 4 h',
        elevation: '+390 m',
        terrain: isEn ? 'Polished Inca stone staircases & historic terraces' : isPt ? 'Escadarias de pedra inca polida & terraços históricos' : isFr ? 'Escaliers incas en pierre polie & terrasses sacrées' : isIt ? 'Scalinate in pietra inca & terrazzamenti cerimoniali' : 'Escalinatas de piedra inca pulida y terrazas ceremoniales',
        desc: isEn
          ? 'Early morning bus to the sacred citadel of Machu Picchu for a 3-hour guided exploration, followed by afternoon panoramic train back to Cusco.'
          : isPt
          ? 'Subida matinal à cidadela sagrada de Machu Picchu para visita guiada detalhada de 3 horas e retorno panorâmico de trem a Cusco.'
          : isFr
          ? 'Visite guidée approfondie de la cité sacrée de Machu Picchu dès l’aube, puis train panoramique de retour vers Cusco.'
          : isIt
          ? 'Visita guidata all’alba nella cittadella sacra di Machu Picchu e rientro a Cusco con treno panoramico.'
          : 'Visita guiada matutina por la ciudadela sagrada de Machu Picchu, tiempo fotográfico y retorno en tren panorámico hacia Cusco.',
        badge: isEn ? 'The Wonder' : isPt ? 'A Maravilha' : isFr ? 'La Merveille' : isIt ? 'La Meraviglia' : 'La Gran Culminación',
        highlight: '2,430 m'
      }
    ]
  };

  const currentStageData = t.stages[activeStage - 1];

  return (
    <section id="altimetria" className="py-16 sm:py-24 px-4 sm:px-8 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      {/* Background Mountain Gradients & Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-14 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-black uppercase tracking-wider shadow-sm">
            <Activity size={14} className="text-blue-400" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* 4 Summary Technical KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          <div className="bg-slate-800/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-700/80 shadow-md text-left flex items-start gap-3.5 group hover:border-blue-400/50 transition-colors">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
              <Mountain size={22} />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">{t.stats.maxAlt}</span>
              <strong className="text-lg sm:text-2xl font-black text-white block mt-0.5">{t.stats.maxAltVal}</strong>
              <span className="text-[11px] text-blue-300 block">{t.stats.maxAltSub}</span>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-700/80 shadow-md text-left flex items-start gap-3.5 group hover:border-emerald-400/50 transition-colors">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
              <TrendingUp size={22} />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">{t.stats.elevGain}</span>
              <strong className="text-lg sm:text-2xl font-black text-white block mt-0.5">{t.stats.elevGainVal}</strong>
              <span className="text-[11px] text-emerald-300 block">{t.stats.elevGainSub}</span>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-700/80 shadow-md text-left flex items-start gap-3.5 group hover:border-amber-400/50 transition-colors">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
              <Compass size={22} />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">{t.stats.totalDist}</span>
              <strong className="text-lg sm:text-2xl font-black text-white block mt-0.5">{t.stats.totalDistVal}</strong>
              <span className="text-[11px] text-amber-300 block">{t.stats.totalDistSub}</span>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-700/80 shadow-md text-left flex items-start gap-3.5 group hover:border-rose-400/50 transition-colors">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center shrink-0">
              <Activity size={22} />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">{t.stats.diff}</span>
              <strong className="text-lg sm:text-2xl font-black text-white block mt-0.5">{t.stats.diffVal}</strong>
              <span className="text-[11px] text-rose-300 block">{t.stats.diffSub}</span>
            </div>
          </div>
        </div>

        {/* Visual Elevation Curve Diagram (CSS/SVG Graphic) */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-5 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 text-left">
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <Mountain size={18} className="text-blue-400" />
                <span>Curva Altimétrica Continua (Cusco ➔ Salkantay ➔ Machu Picchu)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">{t.clickStage}</p>
            </div>
            <span className="text-[11px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full self-start sm:self-auto">
              Abra Máxima: 4,630 m
            </span>
          </div>

          {/* Interactive Steps Bar */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {t.stages.map((stage) => {
              const isActive = activeStage === stage.day;
              // Altitudes percentage for visual vertical bars
              const heights = ['55%', '98%', '40%', '50%', '45%'];
              const heightPct = heights[stage.day - 1];

              return (
                <button
                  key={stage.day}
                  type="button"
                  onClick={() => setActiveStage(stage.day)}
                  className={`p-2.5 sm:p-4 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer group ${
                    isActive
                      ? 'bg-gradient-to-b from-blue-900/60 to-slate-900 border-blue-400 shadow-lg shadow-blue-500/10'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      isActive ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-white'
                    }`}>
                      D{stage.day}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400">
                      {stage.distance}
                    </span>
                  </div>

                  {/* Micro height visual meter */}
                  <div className="my-3 sm:my-4 h-16 sm:h-20 w-full bg-slate-800/60 rounded-xl relative overflow-hidden flex items-end p-1">
                    <div 
                      className={`w-full rounded-lg transition-all duration-500 ${
                        stage.day === 2 
                          ? 'bg-gradient-to-t from-blue-600 via-cyan-400 to-white' 
                          : isActive 
                          ? 'bg-gradient-to-t from-blue-600 to-blue-400' 
                          : 'bg-slate-700/80 group-hover:bg-slate-600'
                      }`}
                      style={{ height: heightPct }}
                    />
                    {stage.day === 2 && (
                      <span className="absolute top-1 inset-x-0 text-[9px] font-mono font-bold text-center text-cyan-200">
                        CUMBRE
                      </span>
                    )}
                  </div>

                  <div>
                    <strong className={`text-xs sm:text-sm font-black block truncate ${
                      isActive ? 'text-white' : 'text-slate-300'
                    }`}>
                      {stage.highlight}
                    </strong>
                    <span className="text-[10px] text-slate-400 truncate block mt-0.5 hidden sm:block">
                      {stage.badge}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Breakdown Card */}
          <div className="bg-slate-900/90 border border-slate-700/90 rounded-2xl p-5 sm:p-6 text-left space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-500 text-white font-black text-sm flex items-center justify-center shrink-0">
                  {currentStageData.day}
                </span>
                <div>
                  <h4 className="font-black text-base sm:text-lg text-white">
                    {currentStageData.title}
                  </h4>
                  <span className="text-[11px] text-emerald-400 font-bold">
                    ✓ {currentStageData.badge}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300 border border-slate-700">
                  📍 {currentStageData.startAlt} ➔ <strong className="text-white">{currentStageData.maxAlt}</strong> ➔ {currentStageData.endAlt}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentStageData.desc}
            </p>

            {/* Stage Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">{t.distanceLabel}</span>
                <strong className="text-white text-sm font-black">{currentStageData.distance}</strong>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">{t.timeLabel}</span>
                <strong className="text-white text-sm font-black">{currentStageData.time}</strong>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">{t.elevationLabel}</span>
                <strong className="text-white text-sm font-black">{currentStageData.elevation}</strong>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">{t.terrainLabel}</span>
                <span className="text-slate-300 text-xs font-semibold block truncate" title={currentStageData.terrain}>{currentStageData.terrain}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
