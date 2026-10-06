"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { LanguageType } from '@/types/landing';

export interface LanguageOption {
  code: LanguageType;
  label: string;
  flag: string;
}

const FLAG_ICONS: Record<LanguageType, React.ReactNode> = {
  es: (
    <svg className="w-4 h-3 rounded-[2px] shadow-2xs shrink-0 overflow-hidden inline-block" viewBox="0 0 640 480" aria-hidden="true">
      <path fill="#AA151B" d="M0 0h640v480H0z"/>
      <path fill="#F1BF00" d="M0 120h640v240H0z"/>
    </svg>
  ),
  en: (
    <svg className="w-4 h-3 rounded-[2px] shadow-2xs shrink-0 overflow-hidden inline-block" viewBox="0 0 640 480" aria-hidden="true">
      <path fill="#bd3d44" d="M0 0h640v480H0z"/>
      <path stroke="#fff" strokeWidth="37" d="M0 55h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/>
      <path fill="#192f5d" d="M0 0h260v260H0z"/>
      <circle cx="130" cy="130" r="45" fill="#fff" opacity="0.95"/>
    </svg>
  ),
  pt: (
    <svg className="w-4 h-3 rounded-[2px] shadow-2xs shrink-0 overflow-hidden inline-block" viewBox="0 0 640 480" aria-hidden="true">
      <path fill="#009c3b" d="M0 0h640v480H0z"/>
      <path fill="#ffdf00" d="m320 50 260 190-260 190L60 240z"/>
      <circle cx="320" cy="240" r="90" fill="#002776"/>
    </svg>
  ),
  fr: (
    <svg className="w-4 h-3 rounded-[2px] shadow-2xs shrink-0 overflow-hidden inline-block" viewBox="0 0 640 480" aria-hidden="true">
      <path fill="#002654" d="M0 0h213.3v480H0z"/>
      <path fill="#fff" d="M213.3 0h213.4v480H213.3z"/>
      <path fill="#ce1126" d="M426.7 0H640v480H426.7z"/>
    </svg>
  ),
  it: (
    <svg className="w-4 h-3 rounded-[2px] shadow-2xs shrink-0 overflow-hidden inline-block" viewBox="0 0 640 480" aria-hidden="true">
      <path fill="#009246" d="M0 0h213.3v480H0z"/>
      <path fill="#fff" d="M213.3 0h213.4v480H213.3z"/>
      <path fill="#ce2b37" d="M426.7 0H640v480H426.7z"/>
    </svg>
  )
};

export const ALL_LANGUAGES: LanguageOption[] = [
  { code: 'es', label: 'Español', flag: 'es' },
  { code: 'en', label: 'English', flag: 'en' },
  { code: 'pt', label: 'Português', flag: 'pt' },
  { code: 'fr', label: 'Français', flag: 'fr' },
  { code: 'it', label: 'Italiano', flag: 'it' }
];

export interface AnyLanguageItem {
  code?: LanguageType;
  [key: string]: unknown;
}

interface HeaderLanguageSelectorProps {
  currentLang: LanguageType;
  onSelectLang: (lang: LanguageType) => void;
  availableCodes?: LanguageType[];
  availableLanguages?: (LanguageType | AnyLanguageItem)[];
  variant?: 'adventure' | 'premium' | 'boho' | 'cultural' | 'portal';
}

export default function HeaderLanguageSelector({
  currentLang,
  onSelectLang,
  availableCodes,
  availableLanguages,
  variant = 'adventure'
}: HeaderLanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize available codes whether passed as codes or objects
  const rawList = availableCodes || availableLanguages || ['es', 'en', 'pt', 'fr', 'it'];
  const normalizedCodes: LanguageType[] = rawList.map((item) => {
    if (typeof item === 'string') return item as LanguageType;
    if (item && typeof item === 'object' && 'code' in item && typeof item.code === 'string') {
      return item.code as LanguageType;
    }
    return 'es';
  });

  const options = ALL_LANGUAGES.filter(opt => normalizedCodes.includes(opt.code));
  const currentOption = options.find(opt => opt.code === currentLang) || options[0] || ALL_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (options.length <= 1) {
    return null;
  }

  // Variant styling
  const styles = {
    adventure: {
      trigger: 'bg-slate-100 hover:bg-slate-200/90 text-slate-800 border-slate-200/90 shadow-2xs',
      dropdown: 'bg-white/98 text-slate-800 border-slate-200/90 shadow-xl shadow-slate-900/10',
      activeItem: 'bg-blue-50 text-blue-600 font-black',
      hoverItem: 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'
    },
    premium: {
      trigger: 'bg-neutral-900/90 hover:bg-neutral-800 text-amber-300 border-amber-500/30 shadow-2xs',
      dropdown: 'bg-[#0d0a14]/98 text-amber-100 border-amber-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)]',
      activeItem: 'bg-amber-500/20 text-amber-300 font-black',
      hoverItem: 'hover:bg-amber-500/10 text-neutral-300 hover:text-amber-200'
    },
    boho: {
      trigger: 'bg-stone-200/80 hover:bg-stone-300/80 text-stone-700 border-stone-300/80 shadow-2xs',
      dropdown: 'bg-[#FAF7F2]/98 text-stone-800 border-stone-300 shadow-xl shadow-stone-900/10',
      activeItem: 'bg-[#C86D51]/15 text-[#C86D51] font-black',
      hoverItem: 'hover:bg-stone-100 text-stone-600 hover:text-stone-900'
    },
    cultural: {
      trigger: 'bg-black/55 hover:bg-black/75 text-stone-200 border-white/20 shadow-2xs',
      dropdown: 'bg-stone-950/98 text-stone-100 border-red-900/40 shadow-2xl',
      activeItem: 'bg-red-900/40 text-red-300 font-black',
      hoverItem: 'hover:bg-white/10 text-stone-300 hover:text-white'
    },
    portal: {
      trigger: 'bg-stone-800/95 hover:bg-stone-700 text-stone-100 border-stone-700 shadow-2xs',
      dropdown: 'bg-stone-900/98 text-white border-stone-700 shadow-2xl',
      activeItem: 'bg-[#FF5500]/25 text-[#FF8844] font-black',
      hoverItem: 'hover:bg-stone-800 text-stone-300 hover:text-white'
    }
  }[variant];

  return (
    <div ref={containerRef} className="relative shrink-0 z-50">
      {/* Compact Trigger Button (Always fits, never overflows) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title={`Idioma actual: ${currentOption.label}`}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 cursor-pointer select-none active:scale-95 ${styles.trigger}`}
      >
        <span className="shrink-0 flex items-center leading-none">{FLAG_ICONS[currentOption.code]}</span>
        <span className="text-[11px] font-black tracking-wider uppercase">{currentOption.code}</span>
        <ChevronDown size={12} className={`transition-transform duration-200 opacity-70 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Floating Menu Popover (High z-index to overlay headers cleanly) */}
      {isOpen && (
        <div
          role="listbox"
          className={`absolute right-0 top-full mt-2 w-48 rounded-2xl border p-1.5 backdrop-blur-xl transition-all animate-in fade-in zoom-in-95 z-[100] shadow-2xl ${styles.dropdown}`}
        >
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider opacity-50 border-b border-current/10 mb-1">
            Seleccionar Idioma
          </div>
          {options.map((opt) => {
            const isSelected = opt.code === currentLang;
            return (
              <button
                key={opt.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onSelectLang(opt.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                  isSelected ? styles.activeItem : styles.hoverItem
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="shrink-0 flex items-center leading-none">{FLAG_ICONS[opt.code]}</span>
                  <span className="font-semibold text-xs truncate">{opt.label}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-mono uppercase opacity-60 font-bold">{opt.code}</span>
                  {isSelected && <Check size={13} className="shrink-0 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
