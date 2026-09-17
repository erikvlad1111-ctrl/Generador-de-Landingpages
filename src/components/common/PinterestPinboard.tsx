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
  title: string;
  category: string;
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

  const t = {
    badge: isEn ? 'Inspirational Pinboard' : isPt ? 'Quadro de Inspiração' : isFr ? 'Tableau d’Inspiration' : isIt ? 'Bacheca di Ispirazione' : 'Tablero de Pines de Inspiración',
    title: isEn ? `Postcards & Moments in ${destination}` : isPt ? `Cartões-Postais & Momentos em ${destination}` : isFr ? `Cartes Postales & Moments à ${destination}` : isIt ? `Cartoline & Momenti a ${destination}` : `Postales & Momentos en ${destination}`,
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
    title: idx === 0 
      ? `Panorámica de ${destination}` 
      : idx === 1 
      ? `Momentos Mágicos en ${tourName}` 
      : idx === 2 
      ? `Perspectiva Escénica Andina` 
      : idx === 3 
      ? `Colores y Texturas de Altura` 
      : idx === 4 
      ? `Encuentros con la Naturaleza` 
      : `Postal Inolvidable de Viaje`,
    category: idx % 3 === 0 ? 'Fotografía & Paisajes' : idx % 2 === 0 ? 'Bitácora de Viaje' : 'Cultura Viva',
    likes: 120 + idx * 37,
    author: '@cuscocreativos',
    aspect: idx % 2 === 0 ? 'portrait' : 'square'
  }));

  const [pins, setPins] = useState<PinItem[]>(initialPins);
  const [likedPins, setLikedPins] = useState<number[]>([]);
  const [savedPins, setSavedPins] = useState<number[]>([]);

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

  return (
    <section id="galeria" className={`${isMobile ? 'py-12 px-4' : 'py-20 px-8'} ${
      isPremium ? 'bg-neutral-900/60' : isBoho ? 'bg-[#FAF7F2]' : isCultural ? 'bg-stone-100' : 'bg-white'
    } border-y ${isPremium ? 'border-neutral-800' : 'border-stone-200/80'}`}>
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Section Header: Pinterest Board Style */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isPremium 
                ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30' 
                : isBoho 
                ? 'bg-[#C86D51]/10 text-[#C86D51]' 
                : isCultural 
                ? 'bg-amber-600/10 text-amber-800' 
                : 'bg-emerald-500/10 text-emerald-700'
            }`}>
              <Pin size={14} className="rotate-45" />
              <span>{t.badge}</span>
            </div>

            <h2 className={`text-2xl sm:text-4xl font-bold tracking-tight ${
              isPremium ? 'text-white font-serif' : isBoho ? 'text-stone-900 font-serif' : 'text-slate-900'
            }`}>
              {t.title}
            </h2>

            <p className={`text-xs sm:text-sm max-w-xl ${isPremium ? 'text-neutral-400' : 'text-stone-600'}`}>
              {t.desc}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-xl border ${
              isPremium ? 'bg-neutral-800 text-neutral-300 border-neutral-700' : 'bg-white text-slate-700 border-slate-200 shadow-2xs'
            }`}>
              {activePhotos.length} {activePhotos.length === 1 ? t.pinSingle : t.pinMulti}
            </span>
          </div>
        </div>

        {/* Pinterest Masonry Pin Grid */}
        <div className={`grid ${
          activePhotos.length === 1 
            ? 'grid-cols-1 max-w-lg mx-auto' 
            : activePhotos.length === 2 
            ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        } gap-6 items-start`}>
          {pins.map((pin) => {
            const isLiked = likedPins.includes(pin.id);
            const isSaved = savedPins.includes(pin.id);

            return (
              <div
                key={pin.id}
                className={`group rounded-3xl overflow-hidden transition-all duration-300 relative ${
                  isPremium
                    ? 'bg-neutral-850 border border-neutral-750 hover:border-amber-500/50 shadow-xl'
                    : isBoho
                    ? 'bg-white p-3 shadow-md hover:shadow-xl border border-stone-200/90 rotate-[-0.5deg] hover:rotate-0 hover:-translate-y-1'
                    : isCultural
                    ? 'bg-white p-2.5 shadow-sm hover:shadow-lg border border-amber-900/20'
                    : 'bg-white shadow-sm hover:shadow-xl border border-slate-200 hover:-translate-y-1'
                }`}
              >
                {/* Washi Tape / Pin Decorator for Boho */}
                {isBoho && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#E8DEC8]/80 backdrop-blur-xs border border-[#D5C7AB] rotate-[-2deg] z-20 shadow-2xs" />
                )}

                {/* Photo Frame */}
                <div className={`relative w-full ${
                  pin.aspect === 'portrait' ? 'h-80 sm:h-96' : 'h-64 sm:h-72'
                } rounded-2xl overflow-hidden bg-slate-100`}>
                  <Image
                    src={pin.url}
                    alt={pin.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5" />

                  {/* Top Pin Actions (Pinterest Style) */}
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleToggleSave(pin.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-1 cursor-pointer ${
                        isSaved 
                          ? 'bg-red-600 text-white' 
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                      title={isSaved ? t.saved : t.save}
                    >
                      <Pin size={12} className="rotate-45" />
                      <span>{isSaved ? t.saved : t.save}</span>
                    </button>
                  </div>

                  {/* Bottom Pin Category on Hover */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between text-white text-[11px]">
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full font-medium">
                      {pin.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleLike(pin.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                        isLiked ? 'bg-rose-600 text-white' : 'bg-black/60 text-white hover:bg-rose-600'
                      }`}
                    >
                      <Heart size={12} fill={isLiked ? 'currentColor' : 'none'} />
                      <span>{pin.likes}</span>
                    </button>
                  </div>
                </div>

                {/* Pin Caption & Details */}
                <div className={`p-3.5 space-y-1.5 ${isPremium ? 'text-white' : 'text-slate-900'}`}>
                  <h4 className={`text-xs sm:text-sm font-bold truncate ${
                    isBoho ? 'font-serif text-stone-800' : isPremium ? 'font-serif text-amber-200' : ''
                  }`}>
                    {pin.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 truncate">
                      <MapPin size={12} className={isPremium ? 'text-amber-400' : isBoho ? 'text-[#C86D51]' : 'text-emerald-500'} />
                      <span className="truncate">{destination}</span>
                    </span>
                    <span className="font-mono text-[10px] opacity-70">
                      {pin.author}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
