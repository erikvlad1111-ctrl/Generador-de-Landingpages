'use client';

import React from 'react';
import Image from 'next/image';
import { Tent, Moon, Sun, Sparkles, Droplets, Utensils, Zap, ShieldCheck, Heart } from 'lucide-react';
import { LanguageType } from '@/types/landing';

interface GlampingProps {
  lang?: LanguageType;
}

export default function GlampingDomesSection({ lang = 'es' }: GlampingProps) {
  const isEn = lang === 'en';
  const isPt = lang === 'pt';
  const isFr = lang === 'fr';
  const isIt = lang === 'it';

  const t = {
    badge: isEn ? 'EXCLUSIVE GLAMPING & DOMES' : isPt ? 'DOMOS & GLAMPING EXCLUSIVO' : isFr ? 'DOMES & GLAMPING EXCLUSIF' : isIt ? 'GLAMPING & DOMES ESCLUSIVI' : 'GLAMPING & DOMOS GLACIARES',
    title: isEn ? 'Where You Sleep Each Night' : isPt ? 'Onde Você Dormirá a Cada Noite' : isFr ? 'Vos Hébergements Nuit après Nuit' : isIt ? 'Dove Dormirai Ogni Notte' : 'Dónde Descansarás Cada Noche',
    subtitle: isEn
      ? 'Forget cramped camping tents. Experience our heated 360° glass sky domes, private Andean huts, and jungle eco-lodges under the starry mountain sky.'
      : isPt
      ? 'Esqueça as barracas apertadas. Desfrute de domos de cristal 360° aquecidos, cabanas andinas e eco-lodges sob a Via Láctea.'
      : isFr
      ? 'Oubliez les tentes de camping classiques. Profitez de dômes panoramiques chauffés, de chalets andins et d’éco-lodges confortables sous les étoiles.'
      : isIt
      ? 'Dimentica le tende strette. Vivi l’esperienza dei domi panoramici riscaldati, baite andine ed eco-lodge sotto le stelle.'
      : 'Olvídate de tiendas de campaña incómodas. Pasa la noche en domos geodésicos de cristal 360°, cabañas andinas y eco-lodges con camas térmicas bajo las estrellas.',
    comfortsTitle: isEn ? 'Every Camp Features:' : isPt ? 'Todos os Acampamentos Incluem:' : isFr ? 'Inclus dans Chaque Camp :' : isIt ? 'Servizi in Ogni Campo :' : 'Comodidades en Cada Campamento:',
    comforts: [
      { icon: 'bed', label: isEn ? 'Thermal duvets & cozy mattresses' : isPt ? 'Edredons térmicos & colchões macios' : isFr ? 'Couettes thermiques & matelas confort' : isIt ? 'Piumoni termici & letti confortevoli' : 'Camas térmicas & edredones de pluma' },
      { icon: 'shower', label: isEn ? 'Hot showers available' : isPt ? 'Chuveiros quentes disponíveis' : isFr ? 'Douches chaudes disponibles' : isIt ? 'Docce calde disponibili' : 'Duchas calientes reparadoras' },
      { icon: 'solar', label: isEn ? 'Solar charging for phones & cameras' : isPt ? 'Energia solar para carregar baterias' : isFr ? 'Recharge solaire pour téléphones' : isIt ? 'Ricarica solare per fotocamere' : 'Electricidad solar para recarga móvil' },
      { icon: 'food', label: isEn ? 'Hearty 3-course chef dinners' : isPt ? 'Jantares quentes de 3 pratos com chef' : isFr ? 'Repas chauds 3 plats par chef' : isIt ? 'Cene calde di 3 portate con chef' : 'Cena caliente energética de montaña' }
    ],
    camps: [
      {
        night: 1,
        name: isEn ? '360° Glass Sky Domes' : isPt ? 'Sky Domes de Cristal 360°' : isFr ? 'Sky Domes de Verre 360°' : isIt ? 'Sky Domes di Vetro 360°' : 'Sky Domes de Cristal 360°',
        location: 'Soraypampa • 3,900 msnm',
        temp: isEn ? '-2°C to 4°C (Night)' : isPt ? '-2°C a 4°C (Noite)' : isFr ? '-2°C à 4°C (Nuit)' : isIt ? '-2°C a 4°C (Notte)' : '-2°C a 4°C (Nocturna)',
        image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=800&auto=format&fit=crop',
        desc: isEn
          ? 'Transparent geodesic domes facing Mount Salkantay and Humantay glacier. Sleep watching constellations, shooting stars and the Milky Way from your warm bed.'
          : isPt
          ? 'Cúpulas geodésicas transparentes de frente para o nevado Salkantay. Durma contemplando a Via Láctea e estrelas cadentes do conforto da sua cama aquecida.'
          : isFr
          ? 'Dômes géodésiques transparents face au glacier Salkantay. Endormez-vous en observant la Voie lactée depuis votre lit douillet.'
          : isIt
          ? 'Cupole geodetiche trasparenti di fronte al ghiacciaio Salkantay. Addormentati ammirando la Via Lattea dal letto caldo.'
          : 'Cúpulas geodésicas transparentes frente al imponente glaciar Salkantay. Duerme contemplando constelaciones andinas y la Vía Láctea desde tu cama calefaccionada.',
        highlights: [
          isEn ? 'Direct glacier view' : isPt ? 'Vista direta ao glaciar' : isFr ? 'Vue directe sur glacier' : isIt ? 'Vista diretta ghiacciaio' : 'Vista frontal al glaciar',
          isEn ? 'Thermal feather blankets' : isPt ? 'Cobertores térmicos de pluma' : isFr ? 'Couvertures thermiques' : isIt ? 'Coperte termiche' : 'Plumones térmicos de altura',
          isEn ? 'Star-gazing ceiling' : isPt ? 'Teto para ver estrelas' : isFr ? 'Toit panoramique étoilé' : isIt ? 'Soffitto stellato' : 'Techo panorámico estelar'
        ]
      },
      {
        night: 2,
        name: isEn ? 'Andean Forest Domes' : isPt ? 'Domos Andinos de Selva' : isFr ? 'Dômes Andins de Forêt' : isIt ? 'Domi Andini della Foresta' : 'Domos Andinos de Chaullay',
        location: 'Chaullay • 2,900 msnm',
        temp: isEn ? '12°C to 16°C (Pleasant)' : isPt ? '12°C a 16°C (Agradável)' : isFr ? '12°C à 16°C (Agréable)' : isIt ? '12°C a 16°C (Piacevole)' : '12°C a 16°C (Agradable)',
        image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?q=80&w=800&auto=format&fit=crop',
        desc: isEn
          ? 'Transition to lush subtropical forest. Comfortable eco-domes nestled beside the rushing Santa Teresa mountain stream with warmer temperatures and hot showers.'
          : isPt
          ? 'Transição para a floresta subtropical. Domos ecológicos confortáveis perto do rio com temperaturas agradáveis e banhos quentes restauradores.'
          : isFr
          ? 'Transition vers la jungle tempérée. Éco-dômes douillets bercés par la rivière Santa Teresa avec douches chaudes bien méritées.'
          : isIt
          ? 'Transizione nella foresta subtropicale. Eco-domi accoglienti vicino al fiume con temperature miti e docce calde.'
          : 'Transición a la ceja de selva subtropical. Domos ecológicos confortables junto al río con clima templado y duchas calientes para recuperar energía tras el paso glaciar.',
        highlights: [
          isEn ? 'Warmer microclimate' : isPt ? 'Microclima agradável' : isFr ? 'Microclimat doux' : isIt ? 'Microclima temperato' : 'Microclima templado',
          isEn ? 'Relaxing river sound' : isPt ? 'Som relaxante do rio' : isFr ? 'Bruit apaisant de la rivière' : isIt ? 'Suono rilassante del fiume' : 'Ambiente sonoro natural',
          isEn ? 'Hot recovery showers' : isPt ? 'Banho quente reparador' : isFr ? 'Douches chaudes' : isIt ? 'Doccia calda rigenerante' : 'Duchas calientes disponibles'
        ]
      },
      {
        night: 3,
        name: isEn ? 'Jungle Domes & Coffee Camp' : isPt ? 'Jungle Domes & Fazenda de Café' : isFr ? 'Éco-Dômes & Plantation de Café' : isIt ? 'Jungle Domes & Piantagione Caffè' : 'Jungle Domes & Coffee Camp',
        location: 'Lucmabamba • 2,060 msnm',
        temp: isEn ? '16°C to 20°C (Warm)' : isPt ? '16°C a 20°C (Quente)' : isFr ? '16°C à 20°C (Chaud)' : isIt ? '16°C a 20°C (Caldo)' : '16°C a 20°C (Cálido)',
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop',
        desc: isEn
          ? 'Scenic camp set directly inside an organic family-owned coffee plantation. Enjoy freshly roasted local espresso, campfire stories, and lush tropical birds.'
          : isPt
          ? 'Acampamento charmoso em uma fazenda familiar de café orgânico. Deguste café torrado na hora, frutas frescas e fogueira comunitária.'
          : isFr
          ? 'Camp enchanteur au cœur d’une plantation de café biologique. Torréfaction artisanale sur place, fruits tropicaux et feu de camp le soir.'
          : isIt
          ? 'Campo panoramico dentro una piantagione di caffè biologico. Degustazione di caffè artigianale e falò serale.'
          : 'Hospedaje ecológico integrado dentro de una hacienda cafetalera orgánica familiar. Degustación de café tostado al momento, fogata nocturna y frutas tropicales.',
        highlights: [
          isEn ? 'Organic coffee roasting' : isPt ? 'Degustação de café artesanal' : isFr ? 'Atelier café torréfié' : isIt ? 'Degustazione caffè artigianale' : 'Tostado de café orgánico',
          isEn ? 'Evening campfire' : isPt ? 'Fogueira sob as estrelas' : isFr ? 'Feu de camp nocturne' : isIt ? 'Falò serale' : 'Fogata nocturna al aire libre',
          isEn ? 'Tropical valley setting' : isPt ? 'Cenário tropical verde' : isFr ? 'Jardin tropical luxuriant' : isIt ? 'Atmosfera tropicale' : 'Vegetación exuberante'
        ]
      }
    ]
  };

  return (
    <section id="campamentos" className="py-16 sm:py-24 px-4 sm:px-8 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-14 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-black uppercase tracking-wider shadow-sm">
            <Tent size={14} className="text-emerald-400" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* 3 Main Glamping Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {t.camps.map((camp, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between group hover:border-blue-400/60 hover:shadow-2xl transition-all duration-300"
            >
              <div>
                {/* Photo Preview */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-800">
                  <Image
                    src={camp.image}
                    alt={camp.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  {/* Floating Night Pill */}
                  <div className="absolute top-3.5 left-3.5 bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                    <Moon size={13} />
                    <span>Noche {camp.night}</span>
                  </div>

                  {/* Temperature Pill */}
                  <div className="absolute top-3.5 right-3.5 bg-slate-900/80 backdrop-blur-md text-slate-200 border border-white/20 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    {camp.temp}
                  </div>

                  {/* Location Pin */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white flex items-center gap-1.5 text-xs font-bold drop-shadow-md">
                    <Sparkles size={14} className="text-amber-400 shrink-0" />
                    <span className="truncate">{camp.location}</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 text-left space-y-3.5">
                  <h3 className="font-black text-lg sm:text-xl text-white group-hover:text-blue-300 transition-colors">
                    {camp.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {camp.desc}
                  </p>
                </div>
              </div>

              {/* Highlights Pill Strip in Footer */}
              <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 space-y-2">
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {camp.highlights.map((h, hIdx) => (
                    <span
                      key={hIdx}
                      className="text-[11px] font-semibold text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60 flex items-center gap-1"
                    >
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Amenities Strip */}
        <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-5 sm:p-6 text-left">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs sm:text-sm font-black text-white shrink-0 uppercase tracking-wider">
              {t.comfortsTitle}
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
              {t.comforts.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                    {c.icon === 'bed' ? <Sparkles size={14} /> : c.icon === 'shower' ? <Droplets size={14} /> : c.icon === 'solar' ? <Zap size={14} /> : <Utensils size={14} />}
                  </div>
                  <span className="text-[11px] sm:text-xs font-medium leading-tight">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
