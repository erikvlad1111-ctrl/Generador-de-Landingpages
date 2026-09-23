'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Pin, 
  Heart, 
  Camera, 
  MapPin, 
  Sparkles, 
  ExternalLink,
  Bookmark,
  Share2
} from 'lucide-react';
import { PlanTier, TemplateType, LanguageType } from '@/types/landing';
import { translateText } from '@/data/translations';

interface PinterestPinboardProps {
  images?: string[];
  destination?: string;
  tourName: string;
  tier?: PlanTier;
  theme?: TemplateType;
  isMobile?: boolean;
  lang?: LanguageType;
}

interface PinItem {
  id: number;
  url: string;
  likes: number;
  author: string;
  aspect: 'portrait' | 'landscape' | 'square';
}

export default function PinterestPinboard({
  images = [],
  destination = 'Cusco, Perú',
  tourName,
  tier = 'advance',
  theme = 'boho-nature',
  isMobile = false,
  lang = 'es'
}: PinterestPinboardProps) {
  const isEn = lang === 'en';
  const isPt = lang === 'pt';
  const isFr = lang === 'fr';
  const isIt = lang === 'it';

  const localizedDestination = translateText(destination, lang) || destination;
  const localizedTourName = translateText(tourName, lang) || tourName;

  const t = {
    badge: isEn ? 'Inspirational Pinboard' : isPt ? 'Quadro de Inspiração' : isFr ? 'Tableau d’Inspiration' : isIt ? 'Bacheca di Ispirazione' : 'Tablero de Pines de Inspiración',
    title: isEn ? `Postcards & Moments in ${localizedDestination}` : isPt ? `Cartões-Postais & Momentos em ${localizedDestination}` : isFr ? `Cartes Postales & Moments à ${localizedDestination}` : isIt ? `Cartoline & Momenti a ${localizedDestination}` : `Postales & Momentos en ${localizedDestination}`,
    desc: isEn 
      ? 'Explore authentic high-resolution moments captured along the route. Visual curation inspired by travel journals and Pinterest boards.'
      : isPt
      ? 'Explore momentos autênticos capturados ao longo da rota. Curadoria visual inspirada em diários de viagem e no Pinterest.'
      : isFr
      ? 'Explorez les véritables clichés capturés le long du parcours. Sélection visuelle inspirée des carnets de voyage et de Pinterest.'
      : isIt
      ? 'Esplora gli scatti autentici catturati lungo il percorso. Curatela visiva ispirata ai diari di viaggio e a Pinterest.'
      : 'Explora las tomas reales capturadas durante la ruta. Curaduría visual inspirada en la estética de Pinterest y diarios de viaje.',
    pinSingle: isEn ? 'Pin Available' : isPt ? 'Pin Disponível' : isFr ? 'Épingle Disponible' : isIt ? 'Pin Disponibile' : 'Pin Disponible',
    pinMulti: isEn ? 'Pins on Board' : isPt ? 'Pins no Quadro' : isFr ? 'Épingles sur le Tableau' : isIt ? 'Pin sulla Bacheca' : 'Pines en el Tablero',
    save: isEn ? 'Save' : isPt ? 'Salvar' : isFr ? 'Enregistrer' : isIt ? 'Salva' : 'Guardar',
    saved: isEn ? 'Saved' : isPt ? 'Salvo' : isFr ? 'Enregistré' : isIt ? 'Salvato' : 'Guardado'
  };

  const getLocalizedPinTitle = (idx: number) => {
    if (idx === 0) {
      if (isEn) return `Panoramic View of ${localizedDestination}`;
      if (isPt) return `Panorâmica de ${localizedDestination}`;
      if (isFr) return `Vue Panoramique de ${localizedDestination}`;
      if (isIt) return `Panoramica di ${localizedDestination}`;
      return `Panorámica de ${localizedDestination}`;
    }
    if (idx === 1) {
      if (isEn) return `Magical Moments in ${localizedTourName}`;
      if (isPt) return `Momentos Mágicos em ${localizedTourName}`;
      if (isFr) return `Moments Magiques à ${localizedTourName}`;
      if (isIt) return `Momenti Magici a ${localizedTourName}`;
      return `Momentos Mágicos en ${localizedTourName}`;
    }
    if (idx === 2) {
      if (isEn) return 'Scenic Andean Perspective';
      if (isPt) return 'Perspectiva Cênica Andina';
      if (isFr) return 'Perspective Scénique des Andes';
      if (isIt) return 'Prospettiva Scenica Andina';
      return 'Perspectiva Escénica Andina';
    }
    if (idx === 3) {
      if (isEn) return 'Highland Colors & Textures';
      if (isPt) return 'Cores e Texturas de Altitude';
      if (isFr) return 'Couleurs et Textures d’Altitude';
      if (isIt) return 'Colori e Texture d’Altitudine';
      return 'Colores y Texturas de Altura';
    }
    if (idx === 4) {
      if (isEn) return 'Wildlife & Nature Encounters';
      if (isPt) return 'Encontros com a Natureza';
      if (isFr) return 'Rencontres avec la Nature';
      if (isIt) return 'Incontri con la Natura';
      return 'Encuentros con la Naturaleza';
    }
    if (isEn) return 'Unforgettable Travel Postcard';
    if (isPt) return 'Cartão Postal Inesquecível';
    if (isFr) return 'Carte Postale Inoubliable';
    if (isIt) return 'Cartolina Indimenticabile di Viaggio';
    return 'Postal Inolvidable de Viaje';
  };

  const getLocalizedPinCategory = (idx: number) => {
    if (idx % 3 === 0) {
      if (isEn) return 'Photography & Landscapes';
      if (isPt) return 'Fotografia & Paisagens';
      if (isFr) return 'Photographie & Paysages';
      if (isIt) return 'Fotografia & Paesaggi';
      return 'Fotografía & Paisajes';
    }
    if (idx % 2 === 0) {
      if (isEn) return 'Travel Journal';
      if (isPt) return 'Diário de Viagem';
      if (isFr) return 'Carnet de Voyage';
      if (isIt) return 'Diario di Viaggio';
      return 'Bitácora de Viaje';
    }
    if (isEn) return 'Living Culture';
    if (isPt) return 'Cultura Viva';
    if (isFr) return 'Culture Vivante';
    if (isIt) return 'Cultura Viva';
    return 'Cultura Viva';
  };

  // Pool of fallback curated high-resolution photos of Cusco/Andes
  const defaultImages = [
    'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop', // MP
    'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop', // Cusco street
    'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop', // Humantay
    'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop', // Rainbow
    'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=2074&auto=format&fit=crop', // Llamas
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2029&auto=format&fit=crop', // Sacred Valley
    'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop', // Salt Mines
    'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?q=80&w=2070&auto=format&fit=crop'  // Andes Trek
  ];

  const allImages = images && images.length > 0 ? [...images, ...defaultImages] : defaultImages;

  // Amount of pins based on plan tier
  const pinCount = tier === 'free' ? 1 : tier === 'basic' ? 2 : tier === 'pro' ? 6 : 8;
  const activePhotos = allImages.slice(0, pinCount);

  // Initial Pin Data
  const initialPins: PinItem[] = activePhotos.map((url, idx) => ({
    id: idx,
    url,
    likes: 120 + idx * 37,
    author: '@cuscocreativos',
    aspect: idx % 2 === 0 ? 'portrait' : 'square'
  }));

  const [pins, setPins] = useState<PinItem[]>(initialPins);
  const [likedPins, setLikedPins] = useState<number[]>([]);
  const [savedPins, setSavedPins] = useState<number[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeModalPin, setActiveModalPin] = useState<PinItem | null>(null);

  const handleToggleLike = (id: number) => {
    if (likedPins.includes(id)) {
      setLikedPins(prev => prev.filter(p => p !== id));
      setPins(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes - 1 } : p));
    } else {
      setLikedPins(prev => [...prev, id]);
      setPins(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    }
  };

  const handleToggleSave = (id: number) => {
    if (savedPins.includes(id)) {
      setSavedPins(prev => prev.filter(p => p !== id));
    } else {
      setSavedPins(prev => [...prev, id]);
    }
  };

  // Theme-specific styling
  const isBoho = theme === 'boho-nature';
  const isPremium = theme === 'premium';
  const isCultural = theme === 'cultural';
  const isAdventure = theme === 'adventure';

  // Responsive display limit on mobile
  const showExpander = pins.length > 4;
  const visiblePins = isExpanded ? pins : pins;

  return (
    <section id="galeria" className={`${isMobile ? 'py-8 px-3' : 'py-10 sm:py-20 px-3 sm:px-8'} ${
      isPremium ? 'bg-neutral-900/60' : isBoho ? 'bg-[#FAF7F2]' : isCultural ? 'bg-stone-100' : 'bg-white'
    } border-y ${isPremium ? 'border-neutral-800' : 'border-stone-200/80'} overflow-hidden`}>
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-10">
        
        {/* Section Header: Pinterest Board Style */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
          <div className="space-y-1.5 sm:space-y-2">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider ${
              isPremium 
                ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30' 
                : isBoho 
                ? 'bg-[#C86D51]/10 text-[#C86D51]' 
                : isCultural 
                ? 'bg-amber-600/10 text-amber-800' 
                : 'bg-emerald-500/10 text-emerald-700'
            }`}>
              <Pin size={13} className="rotate-45" />
              <span>{t.badge}</span>
            </div>

            <h2 className={`text-xl sm:text-4xl font-black tracking-tight ${
              isPremium ? 'text-white font-serif' : isBoho ? 'text-stone-900 font-serif' : 'text-slate-900'
            }`}>
              {t.title}
            </h2>

            <p className={`text-xs sm:text-sm max-w-xl ${isPremium ? 'text-neutral-400' : 'text-stone-600'}`}>
              {t.desc}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            <span className={`text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-xl border ${
              isPremium ? 'bg-neutral-800 text-neutral-300 border-neutral-700' : 'bg-stone-50 text-slate-700 border-stone-200 shadow-2xs'
            }`}>
              {activePhotos.length} {activePhotos.length === 1 ? t.pinSingle : t.pinMulti}
            </span>
          </div>
        </div>

        {/* Pinterest Masonry Pin Grid: 2 columns on mobile, 3-4 on desktop */}
        <div className={`grid ${
          activePhotos.length === 1 
            ? 'grid-cols-1 max-w-lg mx-auto' 
            : activePhotos.length === 2 
            ? 'grid-cols-2 max-w-2xl mx-auto' 
            : 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        } gap-2.5 sm:gap-6 items-start`}>
          {visiblePins.map((pin, idx) => {
            const isLiked = likedPins.includes(pin.id);
            const isSaved = savedPins.includes(pin.id);
            // On mobile, collapse extra pins beyond 4 if not expanded
            const isHiddenOnMobile = !isExpanded && idx >= 4;

            return (
              <div
                key={pin.id}
                className={`${isHiddenOnMobile ? 'hidden sm:block' : 'block'} group rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 relative ${
                  isPremium
                    ? 'bg-neutral-850 border border-neutral-750 hover:border-amber-500/50 shadow-lg'
                    : isBoho
                    ? 'bg-white p-2 sm:p-3 shadow-md hover:shadow-xl border border-stone-200/90'
                    : isCultural
                    ? 'bg-white p-1.5 sm:p-2.5 shadow-sm hover:shadow-lg border border-amber-900/20'
                    : 'bg-white shadow-sm hover:shadow-xl border border-stone-200/80 hover:-translate-y-1'
                }`}
              >
                {/* Washi Tape for Boho */}
                {isBoho && (
                  <div className="hidden sm:block absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#E8DEC8]/80 backdrop-blur-xs border border-[#D5C7AB] rotate-[-2deg] z-20 shadow-2xs" />
                )}

                {/* Photo Frame */}
                <div 
                  onClick={() => setActiveModalPin(pin)}
                  className={`relative w-full ${
                    pin.aspect === 'portrait' ? 'h-52 sm:h-96' : 'h-40 sm:h-72'
                  } rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 cursor-pointer`}
                >
                  <Image
                    src={pin.url}
                    alt={getLocalizedPinTitle(pin.id)}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 sm:transition-opacity sm:duration-300 flex flex-col justify-between p-2 sm:p-3.5" />

                  {/* Top Pin Actions: Always accessible on mobile, hover on desktop */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex items-center gap-1 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleToggleSave(pin.id); }}
                      className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black transition-all shadow-md flex items-center gap-1 cursor-pointer active:scale-95 ${
                        isSaved 
                          ? 'bg-rose-600 text-white ring-2 ring-white/50' 
                          : 'bg-rose-600/90 sm:bg-rose-600 text-white hover:bg-rose-700'
                      }`}
                      title={isSaved ? t.saved : t.save}
                    >
                      <Pin size={11} className="rotate-45 shrink-0" />
                      <span className="hidden xs:inline">{isSaved ? t.saved : t.save}</span>
                    </button>
                  </div>

                  {/* Bottom Pin Category and Like Counter */}
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-3 sm:left-3 sm:right-3 z-10 flex items-center justify-between text-white text-[9px] sm:text-[11px]">
                    <span className="bg-black/65 backdrop-blur-md px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-full font-medium truncate max-w-[70%]">
                      {getLocalizedPinCategory(pin.id)}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleToggleLike(pin.id); }}
                      className={`flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-md transition-colors cursor-pointer shrink-0 ${
                        isLiked ? 'bg-rose-600 text-white' : 'bg-black/60 text-white hover:bg-rose-600'
                      }`}
                    >
                      <Heart size={10} className="sm:w-3 sm:h-3" fill={isLiked ? 'currentColor' : 'none'} />
                      <span className="text-[9px] sm:text-[10px]">{pin.likes}</span>
                    </button>
                  </div>
                </div>

                {/* Pin Caption & Details */}
                <div className={`p-2 sm:p-3.5 space-y-0.5 sm:space-y-1.5 ${isPremium ? 'text-white' : 'text-slate-900'}`}>
                  <h4 className={`text-[11px] sm:text-sm font-bold truncate leading-tight ${
                    isBoho ? 'font-serif text-stone-800' : isPremium ? 'font-serif text-amber-200' : ''
                  }`}>
                    {getLocalizedPinTitle(pin.id)}
                  </h4>

                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-stone-400">
                    <span className="flex items-center gap-1 truncate">
                      <MapPin size={11} className={`shrink-0 ${isPremium ? 'text-amber-400' : isBoho ? 'text-[#C86D51]' : 'text-[#FF5500]'}`} />
                      <span className="truncate">{localizedDestination}</span>
                    </span>
                    <span className="hidden sm:inline font-mono text-[10px] opacity-70">
                      {pin.author}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Mobile Expander Button: Avoids infinite 3,500px scrolling */}
        {showExpander && (
          <div className="sm:hidden text-center pt-2">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-extrabold border border-stone-300/80 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <Pin size={13} className={`${isBoho ? 'text-[#C86D51]' : isPremium ? 'text-amber-400' : isCultural ? 'text-amber-600' : isAdventure ? 'text-emerald-500' : 'text-[#FF5500]'} rotate-45`} />
              <span>
                {isExpanded 
                  ? (lang === 'en' ? 'Show fewer pins' : 'Ver menos postales')
                  : (lang === 'en' ? `View all pins (+${pins.length - 4})` : `Ver más postales del tablero (+${pins.length - 4})`)}
              </span>
            </button>
          </div>
        )}

        {/* Full Image Modal Lightbox */}
        {activeModalPin && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in"
            onClick={() => setActiveModalPin(null)}
          >
            <div 
              className="relative max-w-2xl w-full bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-white/15"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-72 sm:h-[460px] w-full">
                <Image
                  src={activeModalPin.url}
                  alt={getLocalizedPinTitle(activeModalPin.id)}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setActiveModalPin(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 sm:p-6 text-white flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-black">{getLocalizedPinTitle(activeModalPin.id)}</h3>
                  <p className="text-xs text-stone-400 mt-0.5">{localizedDestination} • {getLocalizedPinCategory(activeModalPin.id)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleSave(activeModalPin.id)}
                  className={`px-4 py-2 rounded-full text-xs font-black flex items-center gap-1.5 transition-all ${
                    savedPins.includes(activeModalPin.id) ? 'bg-rose-600 text-white' : 'bg-white text-stone-900 hover:bg-rose-600 hover:text-white'
                  }`}
                >
                  <Pin size={13} className="rotate-45" />
                  <span>{savedPins.includes(activeModalPin.id) ? t.saved : t.save}</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
