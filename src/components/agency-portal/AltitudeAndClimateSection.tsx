'use client';

import React, { useState } from 'react';
import { 
  Mountain, 
  Sun, 
  CloudRain, 
  Compass, 
  ShieldCheck, 
  Heart, 
  CheckCircle2, 
  Sparkles, 
  Droplets,
  Clock,
  Wind
} from 'lucide-react';
import { LanguageType } from '@/types/landing';

interface AltitudeAndClimateSectionProps {
  lang?: LanguageType;
  isMobile?: boolean;
}

export default function AltitudeAndClimateSection({ lang = 'es', isMobile = false }: AltitudeAndClimateSectionProps) {
  const content = {
    es: {
      badge: 'Información Práctica para el Viajero Andino',
      title: 'Perfil de Altitud, Clima & Protocolo Soroche',
      subtitle: 'Conoce los desniveles del recorrido y la mejor temporada para disfrutar tu viaje con total seguridad y confort.',
      altitudeBadge: 'Desnivel Técnico de la Ruta',
      altitudeTitle: 'Escala de Elevación y Aclimatación',
      altitudeDesc: 'Cusco se ubica a 3,400 msnm. Nuestro itinerario está dosificado para que tu cuerpo se adapte de forma gradual sin sufrir mal de altura.',
      acclimatizationTip: 'Tip de Aclimatación: Te recomendamos pasar las primeras 24 a 48 horas en Cusco o en el Valle Sagrado (2,870 msnm) antes de ascender a pasos de montaña o caminatas de alta exigencia.',
      
      climateBadge: 'Planifica según la Época',
      climateTitle: '¿Cuándo es la Mejor Época para Viajar a Cusco y Machu Picchu?',
      climateDesc: 'En los Andes peruanos no existen cuatro estaciones marcadas, sino dos periodos climáticos bien diferenciados:',
      dryTitle: 'Temporada Seca (Mayo a Octubre)',
      dryTag: 'Recomendada para Fotografía & Trekking',
      dryDesc: 'Días soleados con cielo azul intenso y casi nulas probabilidades de lluvia. Noches frías que descienden a 0°C - 5°C. Excelente visibilidad para fotografías en Machu Picchu y cordilleras.',
      greenTitle: 'Temporada Verde / Lluvias (Noviembre a Abril)',
      greenTag: 'Recomendada para Paisajes Exuberantes & Menos Afluencia',
      greenDesc: 'La naturaleza andina florece en su máximo esplendor con cascadas vivas y campos verdes intensos. Las lluvias son usualmente pasajeras durante las tardes. Mayor disponibilidad de trenes y entradas.',
      
      healthBadge: 'Seguridad Médica Preventiva',
      healthTitle: '4 Pasos Esenciales para Prevenir el Mal de Altura (Soroche)',
      healthDesc: 'Sigue estas recomendaciones oficiales aprobadas por nuestros guías colegiados y personal de asistencia médica:',
      steps: [
        {
          title: '1. Hidratación Progresiva',
          desc: 'Toma entre 2 a 3 litros diarios de agua o bebidas isotónicas 48 horas antes de llegar a Cusco. La altitud deshidrata con rapidez.'
        },
        {
          title: '2. Llegada & Reposo Activo',
          desc: 'Durante tus primeras 12 a 24 horas, camina a ritmo pausado, evita comidas pesadas o con exceso de grasa y no bebas alcohol.'
        },
        {
          title: '3. Infusiones Andinas Tradicionales',
          desc: 'El té o mate de hojas de coca y muña ayuda a la dilatación bronquial y alivia la digestión lenta provocada por la baja presión.'
        },
        {
          title: '4. Oxígeno Medicinal Permanente',
          desc: 'Todas las unidades de transporte y nuestros guías oficiales llevan permanentemente un balón de oxígeno medicinal y botiquín de primeros auxilios.'
        }
      ]
    },
    en: {
      badge: 'Practical Andean Travel Guide',
      title: 'Altitude Profile, Climate & Soroche Protocol',
      subtitle: 'Understand route elevation differences and pick the best travel season for a safe, comfortable adventure.',
      altitudeBadge: 'Technical Route Elevation',
      altitudeTitle: 'Elevation Scale & Acclimatization',
      altitudeDesc: 'Cusco sits at 11,150 ft (3,400 m). Our itineraries are carefully planned so your body adapts gradually without altitude distress.',
      acclimatizationTip: 'Acclimatization Pro-Tip: Spend your first 24 to 48 hours exploring Cusco or resting in the Sacred Valley (9,400 ft) before embarking on high altitude hikes.',
      
      climateBadge: 'Plan by Season',
      climateTitle: 'When is the Best Time to Visit Cusco & Machu Picchu?',
      climateDesc: 'The Peruvian Andes have two distinct weather seasons rather than four traditional seasons:',
      dryTitle: 'Dry Season (May to October)',
      dryTag: 'Best for Photography & Trekking',
      dryDesc: 'Sunny, bright blue skies with near zero rainfall. Nights are crisp and chilly (32°F - 41°F / 0°C - 5°C). Unbeatable clarity for photos in Machu Picchu.',
      greenTitle: 'Green / Rainy Season (November to April)',
      greenTag: 'Best for Vibrant Scenery & Fewer Crowds',
      greenDesc: 'Andean valleys turn vibrant emerald green with active waterfalls and blooming flora. Showers typically occur in late afternoons, leaving crisp mornings free for sightseeing.',
      
      healthBadge: 'Preventive Health Care',
      healthTitle: '4 Essential Steps to Prevent Altitude Sickness (Soroche)',
      healthDesc: 'Follow these certified recommendations approved by licensed Peruvian guides and medical advisors:',
      steps: [
        {
          title: '1. Active Pre-Hydration',
          desc: 'Drink 2 to 3 liters of water or electrolyte drinks daily starting 48 hours prior to arriving in Cusco. High altitude causes rapid dehydration.'
        },
        {
          title: '2. Arrival Day Rest',
          desc: 'For the first 12 to 24 hours, take slow-paced walks, eat light meals, and avoid alcohol or heavy physical exertion.'
        },
        {
          title: '3. Traditional Herbal Teas',
          desc: 'Natural Coca and Muña leaf infusions enhance oxygen absorption and ease altitude-related slow digestion.'
        },
        {
          title: '4. Dedicated Oxygen Supply',
          desc: 'All our private tour vans and licensed guides carry certified medical oxygen tanks and trauma first-aid kits at all times.'
        }
      ]
    },
    pt: {
      badge: 'Guia Prático do Viajante Andino',
      title: 'Perfil de Altitude, Clima & Protocolo Soroche',
      subtitle: 'Conheça as variações de relevo e a melhor época para viver sua aventura com segurança e conforto.',
      altitudeBadge: 'Desnível da Rota',
      altitudeTitle: 'Escala de Elevação e Aclimatação',
      altitudeDesc: 'Cusco está a 3.400 m de altitude. Nosso itinerário foi dosado para que seu corpo se adapte sem desconfortos.',
      acclimatizationTip: 'Dica de Aclimatação: Recomendamos passar as primeiras 24 a 48 horas em Cusco ou no Vale Sagrado (2.870 m) antes de passeios de grande esforço físico.',
      
      climateBadge: 'Planeje sua Viagem',
      climateTitle: 'Qual a Melhor Época para Viajar a Cusco e Machu Picchu?',
      climateDesc: 'Nos Andes peruanos existem dois períodos climáticos bem definidos:',
      dryTitle: 'Estação Seca (Maio a Outubro)',
      dryTag: 'Melhor para Fotos & Trekking',
      dryDesc: 'Dias ensolarados de céu azul limpo e praticamente sem chuvas. Noites frias entre 0°C e 5°C. Visibilidade excelente para fotos espetaculares.',
      greenTitle: 'Estação Verde / Chuvas (Novembro a Abril)',
      greenTag: 'Melhor para Vales Verdes & Menos Turistas',
      greenDesc: 'A natureza atinge seu esplendor máximo com montanhas verdejantes e cachoeiras ativas. As chuvas costumam ser passageiras à tarde.',
      
      healthBadge: 'Prevenção e Saúde',
      healthTitle: '4 Passos Essenciais contra o Mal de Altitude (Soroche)',
      healthDesc: 'Recomendações testadas e aprovadas por guias credenciados de Cusco:',
      steps: [
        {
          title: '1. Hidratação Constante',
          desc: 'Beba de 2 a 3 litros de água por dia 48h antes de chegar a Cusco. A altitude desidrata rapidamente.'
        },
        {
          title: '2. Primeiro Dia Leve',
          desc: 'Nas primeiras 24 horas, caminhe devagar, consuma alimentos leves e evite bebidas alcoólicas.'
        },
        {
          title: '3. Chás Tradicionais',
          desc: 'O chá de folhas de coca e muña auxilia na respiração e alivia a digestão lenta da altitude.'
        },
        {
          title: '4. Oxigênio a Bordo',
          desc: 'Nossos veículos e guias transportam cilindro de oxigênio medicinal e kit de primeiros socorros permanentemente.'
        }
      ]
    },
    fr: {
      badge: 'Guide Pratique pour les Andes',
      title: 'Profil d’Altitude, Météo & Mal des Montagnes',
      subtitle: 'Anticipez les dénivelés et choisissez la période idéale pour voyager en toute sérénité.',
      altitudeBadge: 'Dénivelé Technique',
      altitudeTitle: 'Échelle d’Altitude et Acclimatation',
      altitudeDesc: 'Cusco est située à 3 400 m. Nos circuits sont conçus pour permettre une adaptation progressive et sans stress.',
      acclimatizationTip: 'Conseil d’acclimatation : Passez vos 24 à 48 premières heures à Cusco ou dans la Vallée Sacrée (2 870 m) avant de commencer des randonnées plus exigeantes.',
      
      climateBadge: 'Meilleure Saison',
      climateTitle: 'Quelle est la Meilleure Période pour Visiter Cusco et le Machu Picchu ?',
      climateDesc: 'Dans les Andes péruviennes, on distingue deux saisons principales :',
      dryTitle: 'Saison Sèche (Mai à Octobre)',
      dryTag: 'Idéale pour la Photographie & le Trekking',
      dryDesc: 'Journées très ensoleillées, ciel bleu limpide et quasi absence de pluie. Nuits fraîches (0°C à 5°C). Visibilité parfaite.',
      greenTitle: 'Saison Verte / Humide (Novembre à Avril)',
      greenTag: 'Idéale pour les Végétations Luxuriantes',
      greenDesc: 'Les vallées sont verdoyantes, les cascades rugissent et il y a moins d’affluence. Averses passagères en fin d’après-midi.',
      
      healthBadge: 'Sécurité & Prévention',
      healthTitle: '4 Gestes Essentiels pour Éviter le Mal des Montagnes (Soroche)',
      healthDesc: 'Recommandations approuvées par nos guides officiels et conseillers médicaux :',
      steps: [
        {
          title: '1. Hydratation Préalable',
          desc: 'Buvez 2 à 3 litres d’eau par jour dès 48h avant votre arrivée.'
        },
        {
          title: '2. Repos à l’Arrivée',
          desc: 'Rythme calme, repas légers et zéro alcool durant les premières 24 heures.'
        },
        {
          title: '3. Infusions Andines',
          desc: 'La tisane de feuilles de coca et de muña favorise la respiration et la digestion.'
        },
        {
          title: '4. Assistance en Oxygène',
          desc: 'Tous nos véhicules et guides disposent d’une bouteille d’oxygène médical et de trousses d’urgence.'
        }
      ]
    },
    it: {
      badge: 'Guida Pratica per le Ande',
      title: 'Profilo Altitudinale, Clima & Mal di Montagna',
      subtitle: 'Scopri i dislivelli del viaggio e scegli il periodo migliore per viaggiare in sicurezza.',
      altitudeBadge: 'Dislivello del Percorso',
      altitudeTitle: 'Scala di Altitudine & Acclimatazione',
      altitudeDesc: 'Cusco si trova a 3.400 m. L’itinerario è studiato per abituare il corpo in modo progressivo e piacevole.',
      acclimatizationTip: 'Consiglio di Acclimatazione: Trascorri le prime 24-48 ore a Cusco o nella Valle Sacra (2.870 m) prima dei trekking più impegnativi.',
      
      climateBadge: 'Pianifica il Viaggio',
      climateTitle: 'Quando è il Periodo Migliore per Visitare Cusco e Machu Picchu?',
      climateDesc: 'Nelle Ande peruviane ci sono due stagioni ben distinte:',
      dryTitle: 'Stagione Secca (Maggio a Ottobre)',
      dryTag: 'Ideale per Foto & Trekking',
      dryDesc: 'Giornate limpide, sole splendente e quasi zero pioggia. Notti fresche (0°C - 5°C). Visibilità panoramica perfetta.',
      greenTitle: 'Stagione Verde / Piogge (Novembre ad Aprile)',
      greenTag: 'Ideale per Paesaggi Verdi e Meno Folla',
      greenDesc: 'Montagne smeraldo, valli fiorite e meno turisti. Le piogge sono di solito brevi nel tardo pomeriggio.',
      
      healthBadge: 'Prevenzione Sanitaria',
      healthTitle: '4 Consigli Chiave contro il Mal d’Altitudine (Soroche)',
      healthDesc: 'Protocolli consigliati dalle nostre guide turistiche certificate:',
      steps: [
        {
          title: '1. Idratazione Costante',
          desc: 'Bevi 2-3 litri d’acqua al giorno a partire da 48 ore prima dell’arrivo.'
        },
        {
          title: '2. Arrivo & Riposo',
          desc: 'Cammina con calma, consuma pasti leggeri ed evita alcolici per le prime 24 ore.'
        },
        {
          title: '3. Infusioni di Coca e Muña',
          desc: 'Le foglie di coca aiutano l’ossigenazione naturale e stimolano la digestione andina.'
        },
        {
          title: '4. Ossigeno Medico Sempre Presente',
          desc: 'Tutti i nostri van e guide trasportano una bombola d’ossigeno e kit di primo soccorso.'
        }
      ]
    }
  };

  const t = content[lang] || content.es;

  const altitudePoints = [
    {
      name: 'Aguas Calientes (Machu Picchu Pueblo)',
      elevation: 2040,
      elevationFt: '6,690 ft',
      highlight: 'Selva Alta / Clima Cálido',
      color: 'from-emerald-500 to-teal-600',
      percent: '40%'
    },
    {
      name: 'Santuario Histórico Machu Picchu',
      elevation: 2430,
      elevationFt: '7,972 ft',
      highlight: 'Zona Arqueológica Óptima',
      color: 'from-blue-500 to-indigo-600',
      percent: '48%'
    },
    {
      name: 'Valle Sagrado de los Incas (Ollantaytambo)',
      elevation: 2870,
      elevationFt: '9,416 ft',
      highlight: 'Ideal para Dormir y Aclimatar',
      color: 'from-amber-500 to-orange-500',
      percent: '57%'
    },
    {
      name: 'Ciudad Imperial del Cusco',
      elevation: 3400,
      elevationFt: '11,150 ft',
      highlight: 'Capital Histórica & Hoteles',
      color: 'from-[#FF5500] to-rose-600',
      percent: '67%'
    },
    {
      name: 'Laguna Humantay (Turquesa Glaciar)',
      elevation: 4200,
      elevationFt: '13,780 ft',
      highlight: 'Trekking Glaciar con Guía',
      color: 'from-indigo-600 to-purple-600',
      percent: '83%'
    },
    {
      name: 'Cumbre Vinicunca (Montaña 7 Colores)',
      elevation: 5036,
      elevationFt: '16,520 ft',
      highlight: 'Punto Máximo (Oxígeno Permanente)',
      color: 'from-purple-700 to-pink-600',
      percent: '100%'
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-stone-900 text-white border-y border-stone-800 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-widest border border-amber-500/30 shadow-xs">
            <Compass size={13} /> {t.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 1. PERFIL DE ALTITUD VISUAL */}
        <div className="bg-stone-950/80 rounded-3xl p-5 sm:p-8 border border-stone-800 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800/80 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5500] flex items-center gap-1">
                <Mountain size={12} /> {t.altitudeBadge}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                {t.altitudeTitle}
              </h3>
            </div>
            <span className="text-xs text-stone-400 max-w-md">
              {t.altitudeDesc}
            </span>
          </div>

          {/* Elevation Bars */}
          <div className="space-y-3 pt-2">
            {altitudePoints.map((pt, idx) => (
              <div key={idx} className="space-y-1 group">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-200 group-hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF5500]" />
                    {pt.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-stone-400 font-mono">
                      {pt.elevationFt}
                    </span>
                    <span className="font-mono font-black text-amber-400 text-xs sm:text-sm bg-stone-900 px-2 py-0.5 rounded-md border border-stone-800">
                      {pt.elevation.toLocaleString()} msnm
                    </span>
                  </div>
                </div>

                {/* Progress bar representing altitude */}
                <div className="h-3 w-full bg-stone-900 rounded-full overflow-hidden p-0.5 border border-stone-800">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${pt.color} transition-all duration-700`}
                    style={{ width: pt.percent }}
                  />
                </div>
                <p className="text-[10px] text-stone-400 pl-3">
                  ↳ {pt.highlight}
                </p>
              </div>
            ))}
          </div>

          {/* Acclimatization Tip Box */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
            <Sparkles size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {t.acclimatizationTip}
            </p>
          </div>
        </div>

        {/* 2. GUÍA DE CLIMA (TEMPORADA SECA VS VERDE) */}
        <div className="space-y-4">
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 flex items-center justify-center sm:justify-start gap-1">
              <Sun size={12} /> {t.climateBadge}
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-white mt-0.5">
              {t.climateTitle}
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              {t.climateDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Temporada Seca */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-stone-950 to-stone-900 border border-amber-500/30 hover:border-amber-400 transition-all shadow-lg space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Sun size={22} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/30">
                  {t.dryTag}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-white">
                {t.dryTitle}
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                {t.dryDesc}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[10px] text-stone-300">
                <span className="bg-stone-800 px-2.5 py-1 rounded-lg">☀️ Días: 18°C - 22°C</span>
                <span className="bg-stone-800 px-2.5 py-1 rounded-lg">🌙 Noches: 0°C - 5°C</span>
                <span className="bg-stone-800 px-2.5 py-1 rounded-lg">🌧️ Lluvias: Raras</span>
              </div>
            </div>

            {/* Temporada Verde */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-stone-950 to-stone-900 border border-emerald-500/30 hover:border-emerald-400 transition-all shadow-lg space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <CloudRain size={22} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  {t.greenTag}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-white">
                {t.greenTitle}
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                {t.greenDesc}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[10px] text-stone-300">
                <span className="bg-stone-800 px-2.5 py-1 rounded-lg">🌿 Valles Florecidos</span>
                <span className="bg-stone-800 px-2.5 py-1 rounded-lg">🌧️ Lluvias: Por las tardes</span>
                <span className="bg-stone-800 px-2.5 py-1 rounded-lg">🎟️ Menor afluencia</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. GUÍA RÁPIDA DE SALUD & PROTOCOLO SOROCHE */}
        <div className="p-5 sm:p-8 rounded-3xl bg-stone-950 border border-stone-800 space-y-5">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-black uppercase tracking-widest">
            <Heart size={14} /> {t.healthBadge}
          </div>
          <div className="space-y-1">
            <h3 className="text-lg sm:text-2xl font-black text-white">
              {t.healthTitle}
            </h3>
            <p className="text-xs text-stone-400">
              {t.healthDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {t.steps.map((step, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 hover:border-stone-700 transition-colors space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FF5500]/20 text-[#FF5500] flex items-center justify-center font-black text-xs">
                    {idx + 1}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                  <CheckCircle2 size={12} /> Aprobado DIRCETUR
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
