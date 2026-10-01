'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  title?: string;
}

export default function LightboxModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
  title = 'Galería de Experiencias'
}: LightboxModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
      if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl transition-all">
      {/* Top Bar with info and close */}
      <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between text-white z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-bold text-stone-300">
            {title}
          </span>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono text-white">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          title="Cerrar (Esc)"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Image Display */}
      <div className="relative w-full h-[75vh] sm:h-[82vh] max-w-5xl mx-auto px-4 flex items-center justify-center">
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={currentImage}
            alt={`Foto ${currentIndex + 1} - ${title}`}
            fill
            sizes="100vw"
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/50 hover:bg-[#FF5500] text-white border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            title="Foto anterior (←)"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/50 hover:bg-[#FF5500] text-white border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            title="Siguiente foto (→)"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 overflow-x-auto px-4 py-2 z-20 [scrollbar-width:none]">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onNavigate(idx)}
              className={`relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-transform cursor-pointer ${
                idx === currentIndex
                  ? 'border-[#FF5500] scale-110 shadow-lg'
                  : 'border-white/20 opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={img} alt="Miniatura" fill className="object-cover" unoptimized />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
