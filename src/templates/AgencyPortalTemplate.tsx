'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Compass, 
  MapPin, 
  Star, 
  Clock, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  Mail, 
  Sparkles,
  Heart,
  Award,
  Globe2,
  ArrowRight,
  HelpCircle,
  Camera,
  Layers,
  Search,
  Calendar,
  Zap,
  Check
} from 'lucide-react';
import { LandingData } from '@/types/landing';
import TourSupportAndFaqs from '@/components/common/TourSupportAndFaqs';

interface AgencyPortalTemplateProps {
  data?: Partial<LandingData>;
  isLive?: boolean;
  viewMode?: 'desktop' | 'tablet' | 'mobile';
}

export default function AgencyPortalTemplate({ data, isLive = false, viewMode = 'desktop' }: AgencyPortalTemplateProps) {
  const isMobile = viewMode === 'mobile';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showWaTooltip, setShowWaTooltip] = useState<boolean>(true);

  const brandName = data?.name || 'Cusco Tours';
  const whatsappNumber = (data?.whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const guideName = data?.guideName || 'Marco Mendoza';

  const FEATURED_TOURS = [
    {
      id: '1',
      title: 'Vinicunca Montaña 7 Colores Clásico',
      category: 'Aventura & Trekking',
      categoryKey: 'trekking',
      location: 'Cusco, Perú',
      duration: 'Full Day (04:30 - 17:30)',
      price: '$45 USD',
      rating: 4.9,
      reviews: 320,
      image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop',
      tag: 'Más Popular',
      badge: '4.9 ★'
    },
    {
      id: '2',
      title: 'Laguna Humantay Turquesa & Glaciar',
      category: 'Naturaleza & Fotografía',
      categoryKey: 'trekking',
      location: 'Anta - Mollepata',
      duration: 'Full Day (05:00 - 18:00)',
      price: '$40 USD',
      rating: 4.8,
      reviews: 215,
      image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop',
      tag: 'Glaciar',
      badge: '4.8 ★'
    },
    {
      id: '3',
      title: 'Machu Picchu Mágico en Tren Panorámico',
      category: 'Historia & Maravilla',
      categoryKey: 'machu',
      location: 'Aguas Calientes',
      duration: '1 Día Completo',
      price: '$280 USD',
      rating: 5.0,
      reviews: 540,
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      tag: 'Maravilla del Mundo',
      badge: '5.0 ★'
    },
    {
      id: '4',
      title: 'Valle Sagrado de los Incas VIP',
      category: 'Cultura & Arqueología',
      categoryKey: 'cultura',
      location: 'Pisac - Ollantaytambo',
      duration: 'Full Day',
      price: '$55 USD',
      rating: 4.9,
      reviews: 180,
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
      tag: 'Arqueológico',
      badge: '4.9 ★'
    },
    {
      id: '5',
      title: 'Machu Picchu 2 Días con Noche en Aguas Calientes',
      category: 'Experiencia Completa',
      categoryKey: 'machu',
      location: 'Machu Picchu Pueblo',
      duration: '2 Días / 1 Noche',
      price: '$340 USD',
      rating: 5.0,
      reviews: 290,
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2029&auto=format&fit=crop',
      tag: 'Recomendado',
      badge: '5.0 ★'
    },
    {
      id: '6',
      title: 'Huacachina Oasis & Islas Ballestas',
      category: 'Costa & Desierto',
      categoryKey: 'adrenalina',
      location: 'Ica - Paracas',
      duration: 'Full Day',
      price: '$95 USD',
      rating: 4.8,
      reviews: 165,
      image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop',
      tag: 'Adrenalina',
      badge: '4.8 ★'
    }
  ];

  const PACK_TOURS = [
    {
      id: 'p1',
      title: 'Cusco Mágico 4 Días / 3 Noches',
      category: 'Paquete Clásico',
      duration: '4 Días / 3 Noches',
      price: '$420 USD',
      image: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=2074&auto=format&fit=crop',
      badge: '4.9 ★'
    },
    {
      id: 'p2',
      title: 'Cusco Aventura Total 5 Días',
      category: 'Aventura & Altura',
      duration: '5 Días / 4 Noches',
      price: '$490 USD',
      image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?q=80&w=2070&auto=format&fit=crop',
      badge: '5.0 ★'
    },
    {
      id: 'p3',
      title: 'Perú Soñado: Lima, Ica & Cusco',
      category: 'Circuito Nacional',
      duration: '7 Días / 6 Noches',
      price: '$780 USD',
      image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop',
      badge: '4.9 ★'
    },
    {
      id: 'p4',
      title: 'Cusco Express Esencial 3 Días',
      category: 'Escapada Rápida',
      duration: '3 Días / 2 Noches',
      price: '$360 USD',
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
      badge: '4.8 ★'
    },
    {
      id: 'p5',
      title: 'Tour Cuatrimotos Maras & Moray',
      category: 'Adrenalina',
      duration: 'Medio Día (8:30 - 13:30)',
      price: '$35 USD',
      image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop',
      badge: '4.9 ★'
    },
    {
      id: 'p6',
      title: 'City Tour Cusco & 4 Ruinas Aledañas',
      category: 'Tradición',
      duration: 'Medio Día (13:00 - 18:30)',
      price: '$25 USD',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      badge: '4.8 ★'
    }
  ];

  const faqs = [
    {
      q: '¿Cómo garantizan que la reserva sea segura y oficial?',
      a: 'Somos operador turístico formal registrado con RUC 20 activo, autorización de DIRCETUR Cusco y acreditación internacional Safe Travels. Emitimos comprobantes oficiales y tus pagos están 100% protegidos.'
    },
    {
      q: '¿Qué precauciones toman frente al mal de altura (soroche)?',
      a: 'Todos nuestros vehículos y guías cuentan permanentemente con balón de oxígeno medicinal de emergencia y botiquín de primeros auxilios. Además, recomendamos al menos 24 a 48 horas de aclimatación en Cusco.'
    },
    {
      q: '¿Con cuánta anticipación debo reservar las entradas a Machu Picchu?',
      a: 'Debido a la alta demanda y al límite estricto de cupos diarios dispuesto por el Ministerio de Cultura, sugerimos reservar con al menos 3 a 5 semanas de anticipación.'
    },
    {
      q: '¿Qué facilidades de pago ofrecen para confirmar la reserva?',
      a: 'Puedes reservar de inmediato por WhatsApp y abonar mediante transferencia BCP, Interbank, BBVA, Yape, Plin o con tarjetas de crédito/débito internacionales.'
    }
  ];

  return (
    <div className={`min-h-screen bg-[#FDFDFD] text-stone-900 font-sans selection:bg-[#FF5500] selection:text-white ${isMobile ? 'text-sm' : ''}`}>
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#1C1917] text-white text-[11px] sm:text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-stone-300">
              <Phone size={13} className="text-[#FF5500]" /> +51 984 123 456
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-stone-300">
              <Mail size={13} className="text-[#FF5500]" /> reservas@cuscotours.pe
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-[#FF5500]/20 text-[#FF8844] font-bold px-2 py-0.5 rounded text-[10px] border border-[#FF5500]/40">
              DIRCETUR Cusco • Safe Travels
            </span>
            <span className="text-stone-400 text-[11px] hidden md:inline">Español | USD ($)</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF5500] to-[#FF8800] flex items-center justify-center text-white font-black shadow-md shadow-[#FF5500]/30">
              <Compass size={22} />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-stone-900 block leading-tight">
                CUSCO<span className="text-[#FF5500]">TOURS</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block -mt-1">
                Agencia Oficial & Experiencias
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-stone-700 uppercase tracking-wider">
            <a href="#tours" className="hover:text-[#FF5500] transition-colors">Tours Destacados</a>
            <a href="#paquetes" className="hover:text-[#FF5500] transition-colors">Paquetes</a>
            <a href="#por-que-nosotros" className="hover:text-[#FF5500] transition-colors">¿Por Qué Nosotros?</a>
            <a href="#resenas" className="hover:text-[#FF5500] transition-colors">Reseñas</a>
            <a href="#soporte-faq" className="hover:text-[#FF5500] transition-colors">FAQ & Soporte</a>
          </nav>

          <a
            href={`https://wa.me/${whatsappNumber}?text=Hola%20${encodeURIComponent(brandName)},%20deseo%20cotizar%20un%20tour`}
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer-btn bg-gradient-to-r from-[#FF5500] via-[#FF6611] to-[#FF3500] hover:from-[#E04B00] hover:to-[#FF5500] text-white text-xs font-extrabold px-5 py-2.5 rounded-full shadow-[0_4px_16px_rgba(255,85,0,0.35)] hover:shadow-[0_6px_24px_rgba(255,85,0,0.55)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer group"
          >
            <MessageCircle size={15} className="group-hover:rotate-12 transition-transform duration-300" />
            <span>Cotizar por WhatsApp</span>
          </a>
        </div>
      </header>

      {/* 3. HERO VINICUNCA WITH DYNAMIC FLOATING GLASS CARDS */}
      <section className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop"
            alt="Vinicunca Montaña 7 Colores"
            fill
            priority
            className="object-cover object-center scale-105 animate-pulse-glow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/35" />
        </div>

        {/* Ambient Floating Glass Cards (Desktop) */}
        <div className="hidden xl:flex animate-float-slow absolute left-8 top-1/3 z-20 bg-black/45 backdrop-blur-xl border border-white/20 p-3.5 rounded-2xl items-center gap-3 shadow-2xl hover:scale-105 transition-transform">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
            <Star size={20} className="fill-amber-400" />
          </div>
          <div className="text-left text-xs">
            <p className="font-extrabold text-white">4.9 / 5.0 Valoración</p>
            <p className="text-[10px] text-stone-300">+500 Opiniones Verificadas</p>
          </div>
        </div>

        <div className="hidden xl:flex animate-float-reverse absolute right-8 bottom-1/4 z-20 bg-black/45 backdrop-blur-xl border border-white/20 p-3.5 rounded-2xl items-center gap-3 shadow-2xl hover:scale-105 transition-transform">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
            <ShieldCheck size={20} />
          </div>
          <div className="text-left text-xs">
            <p className="font-extrabold text-white">MINCETUR & DIRCETUR</p>
            <p className="text-[10px] text-stone-300">Operador Turístico Oficial</p>
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white py-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-widest border border-white/30 shadow-lg animate-float-slow">
            <Sparkles size={14} className="text-[#FF8844]" />
            <span>Temporada 2026 • Salidas Diarias Garantizadas</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight drop-shadow-2xl leading-tight uppercase">
            VINICUNCA
          </h1>
          <p className="text-base sm:text-xl lg:text-2xl font-light text-stone-100 max-w-2xl mx-auto drop-shadow-md">
            Montaña de 7 Colores & Valle Rojo • Vive la magia de los Andes
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hola,%20deseo%20reservar%20el%20Tour%20Vinicunca`}
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-btn bg-gradient-to-r from-[#FF5500] via-[#FF6611] to-[#FF3000] hover:from-[#E04500] hover:to-[#FF5500] text-white px-8 py-4 rounded-full font-black text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-[0_8px_30px_rgba(255,85,0,0.5)] hover:shadow-[0_14px_40px_rgba(255,85,0,0.7)] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5 group ring-2 ring-white/25"
            >
              <span>Reservar Ahora</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-200" />
            </a>

            <a
              href="#tours"
              className="bg-white/15 hover:bg-white/30 backdrop-blur-xl text-white px-8 py-4 rounded-full font-black text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-xl border border-white/35 hover:border-white hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 group"
            >
              <span>Ver Más Tours</span>
              <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. METRICS COUNTER BAR WITH HOVER LIFT */}
      <section className="bg-white border-b border-stone-200 py-6 sm:py-8 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-x-0 md:divide-x divide-stone-100 text-center">
            <div className="p-3 rounded-2xl hover:bg-stone-50/80 hover:-translate-y-1 transition-all duration-300 space-y-1">
              <span className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight block">+10,000</span>
              <span className="text-xs sm:text-sm font-bold text-stone-700 block">Viajeros Felices</span>
              <span className="text-[11px] text-stone-400 block">Atención personalizada</span>
            </div>

            <div className="p-3 rounded-2xl hover:bg-stone-50/80 hover:-translate-y-1 transition-all duration-300 space-y-1">
              <span className="text-2xl sm:text-4xl font-black text-[#FF5500] tracking-tight block">10+ Años</span>
              <span className="text-xs sm:text-sm font-bold text-stone-700 block">De Experiencia</span>
              <span className="text-[11px] text-stone-400 block">Operador formal en Cusco</span>
            </div>

            <div className="p-3 rounded-2xl hover:bg-stone-50/80 hover:-translate-y-1 transition-all duration-300 space-y-1">
              <span className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight block">50+</span>
              <span className="text-xs sm:text-sm font-bold text-stone-700 block">Rutas & Destinos</span>
              <span className="text-[11px] text-stone-400 block">En todo el Perú</span>
            </div>

            <div className="p-3 rounded-2xl hover:bg-stone-50/80 hover:-translate-y-1 transition-all duration-300 space-y-1">
              <span className="text-2xl sm:text-4xl font-black text-[#FF5500] tracking-tight block">4.9 / 5</span>
              <span className="text-xs sm:text-sm font-bold text-stone-700 block">Puntuación Excelente</span>
              <span className="text-[11px] text-stone-400 block">TripAdvisor & Google</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TOURS DESTACADOS WITH MODERN CATEGORY FILTER */}
      <section id="tours" className="py-14 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5500]/10 text-[#FF5500] text-xs font-black uppercase tracking-widest">
            <Sparkles size={13} />
            <span>Catálogo Exclusivo 2026</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Tours <span className="text-[#FF5500]">Destacados</span> en Cusco y Perú
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Salidas diarias garantizadas con guías colegiados, traslados oficiales y asistencia médica de emergencia.
          </p>
        </div>

        {/* Dynamic Interactive Category Pills Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {[
            { key: 'all', label: 'Todos los Destinos', icon: Globe2 },
            { key: 'trekking', label: 'Montañas & Trekking', icon: MapPin },
            { key: 'machu', label: 'Machu Picchu Mágico', icon: Award },
            { key: 'cultura', label: 'Valle Sagrado & Historia', icon: Compass },
            { key: 'adrenalina', label: 'Costa & Adrenalina', icon: Zap }
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#FF5500] text-white shadow-lg shadow-[#FF5500]/30 scale-105 ring-2 ring-[#FF5500]/40'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:bg-stone-100/70 hover:scale-102'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-white' : 'text-stone-400'} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tours Grid with Smooth Modern Card Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_TOURS.filter(t => activeCategory === 'all' || t.categoryKey === activeCategory).map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-[0_20px_45px_rgba(0,0,0,0.09)] hover:border-[#FF5500]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2"
            >
              <div>
                <div className="relative h-56 w-full bg-stone-100 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-stone-900 flex items-center gap-1.5 shadow-md">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span>{tour.badge}</span>
                  </div>

                  {tour.tag && (
                    <div className="absolute top-3.5 right-3.5 bg-[#FF5500] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                      {tour.tag}
                    </div>
                  )}

                  <div className="absolute bottom-3.5 left-3.5 text-white">
                    <span className="text-[11px] font-bold text-stone-200 block uppercase tracking-wider">
                      {tour.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3.5">
                  <h3 className="font-extrabold text-base sm:text-lg text-stone-900 leading-snug group-hover:text-[#FF5500] transition-colors">
                    {tour.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-stone-400" /> {tour.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-[#FF5500]" /> {tour.location}
                    </span>
                  </div>

                  <div className="pt-3 flex items-baseline justify-between border-t border-stone-100">
                    <span className="text-xs text-stone-400">Precio por persona</span>
                    <span className="text-xl font-black text-[#FF5500]">{tour.price}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hola,%20deseo%20reservar%20el%20${encodeURIComponent(tour.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shimmer-btn w-full bg-gradient-to-r from-[#FF5500] to-[#FF3500] hover:from-[#E04500] hover:to-[#FF5500] text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-[#FF5500]/20 hover:shadow-[0_8px_25px_rgba(255,85,0,0.4)] group/btn active:scale-95 cursor-pointer"
                >
                  <span>Reservar Tour</span>
                  <ArrowRight size={15} className="group-hover/btn:translate-x-1.5 transition-transform duration-200" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ¿POR QUÉ ELEGIRNOS? (CONFIANZA, GUÍAS & FORMALIDAD) */}
      <section id="por-que-nosotros" className="py-16 sm:py-24 bg-[#F9F7F4] border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
          
          {/* Main 2-Column Split: Real Guides Photo + Benefits */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            
            {/* Left Photo with Floating Badge */}
            <div className="relative">
              <div className="relative h-80 sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                <Image
                  src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop"
                  alt="Guías Oficiales en Machu Picchu"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Live Status Beacon */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/20 text-[11px] font-bold text-white shadow-lg">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span>Guías Activos Hoy en Cusco</span>
                </div>
              </div>

              {/* Floating Satisfaction Badge */}
              <div className="absolute -bottom-5 -right-3 sm:right-6 bg-white p-4 sm:p-5 rounded-2xl shadow-2xl border border-stone-200 flex items-center gap-3.5 animate-float-slow hover:scale-105 transition-transform">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#FF5500]/15 to-[#FF8800]/20 flex items-center justify-center text-[#FF5500] font-black text-lg shadow-inner">
                  100%
                </div>
                <div>
                  <p className="font-extrabold text-xs sm:text-sm text-stone-900">Satisfacción Garantizada</p>
                  <p className="text-[11px] text-stone-400">Guías colegiados bilingües DIRCETUR</p>
                </div>
              </div>
            </div>

            {/* Right Pillars */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#FF5500]">
                  <ShieldCheck size={16} />
                  <span>Confianza, Experiencia & Seguridad</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
                  ¿Por qué viajar con <span className="text-[#FF5500]">{brandName}</span>?
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Somos una agencia local acreditada con más de 10 años organizando viajes inolvidables en Cusco y todo el Perú. Cuidamos cada detalle desde tu llegada al aeropuerto hasta tu retorno a casa.
                </p>
              </div>

              {/* Check Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs font-bold text-stone-800 bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs hover:border-[#FF5500]/40 hover:-translate-y-0.5 transition-all duration-200">
                  <CheckCircle2 size={17} className="text-[#FF5500] shrink-0" />
                  <span>Guías Oficiales Acreditados</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-stone-800 bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs hover:border-[#FF5500]/40 hover:-translate-y-0.5 transition-all duration-200">
                  <CheckCircle2 size={17} className="text-[#FF5500] shrink-0" />
                  <span>Balón de Oxígeno & Botiquín</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-stone-800 bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs hover:border-[#FF5500]/40 hover:-translate-y-0.5 transition-all duration-200">
                  <CheckCircle2 size={17} className="text-[#FF5500] shrink-0" />
                  <span>Salidas Diarias Garantizadas</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-stone-800 bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs hover:border-[#FF5500]/40 hover:-translate-y-0.5 transition-all duration-200">
                  <CheckCircle2 size={17} className="text-[#FF5500] shrink-0" />
                  <span>Atención 24/7 por WhatsApp</span>
                </div>
              </div>

              {/* Highlight Safety Box */}
              <div className="bg-[#FFF6F0] p-6 rounded-2xl border border-[#FFD9C2] space-y-2.5 shadow-xs hover:border-[#FF5500]/50 transition-colors">
                <h4 className="font-extrabold text-sm text-stone-900 flex items-center gap-2">
                  <Award size={18} className="text-[#FF5500]" />
                  <span>Compromiso de Altura y Asistencia Médica Preventiva</span>
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Sabemos lo desafiante que puede ser la altitud andina. Por ello, todos nuestros itinerarios respetan los tiempos recomendados de aclimatación y monitoreamos el bienestar y oxigenación de cada viajero durante todo el recorrido.
                </p>
              </div>
            </div>

          </div>

          {/* Creando Conexiones con el Mundo (4 Círculos de Confianza del Diseño Original) */}
          <div className="pt-8 border-t border-stone-200/80 space-y-10">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[#FF5500] text-xs font-extrabold uppercase tracking-widest">
                <Globe2 size={15} /> <span>Nuestros Pilares de Calidad</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-stone-900 tracking-tight">
                Creando Conexiones con el Mundo
              </h3>
              <p className="text-xs sm:text-sm text-stone-500">
                La fórmula que convierte tu viaje a Cusco en la mejor experiencia de tu vida.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-2xl hover:border-[#FF5500]/40 transition-all duration-300 text-center space-y-4 group hover:-translate-y-2 cursor-default">
                <div className="w-16 h-16 rounded-2xl bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#FF5500] group-hover:text-white transition-all duration-300 shadow-sm">
                  <ShieldCheck size={28} />
                </div>
                <h4 className="font-extrabold text-sm text-stone-900 group-hover:text-[#FF5500] transition-colors">Agencia Formal</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Registrados ante DIRCETUR y MINCETUR con RUC 20 formal verificado y facturación legal.
                </p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-2xl hover:border-[#FF5500]/40 transition-all duration-300 text-center space-y-4 group hover:-translate-y-2 cursor-default">
                <div className="w-16 h-16 rounded-2xl bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#FF5500] group-hover:text-white transition-all duration-300 shadow-sm">
                  <Heart size={28} />
                </div>
                <h4 className="font-extrabold text-sm text-stone-900 group-hover:text-[#FF5500] transition-colors">Pasión & Amor</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Guías locales cusqueños que transmiten el legado incaico con autenticidad y calidez humana.
                </p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-2xl hover:border-[#FF5500]/40 transition-all duration-300 text-center space-y-4 group hover:-translate-y-2 cursor-default">
                <div className="w-16 h-16 rounded-2xl bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#FF5500] group-hover:text-white transition-all duration-300 shadow-sm">
                  <Clock size={28} />
                </div>
                <h4 className="font-extrabold text-sm text-stone-900 group-hover:text-[#FF5500] transition-colors">Cero Estrés</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Recojo puntual en la puerta de tu hotel, boletos asegurados sin colas y logística impecable.
                </p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-2xl hover:border-[#FF5500]/40 transition-all duration-300 text-center space-y-4 group hover:-translate-y-2 cursor-default">
                <div className="w-16 h-16 rounded-2xl bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#FF5500] group-hover:text-white transition-all duration-300 shadow-sm">
                  <Star size={28} />
                </div>
                <h4 className="font-extrabold text-sm text-stone-900 group-hover:text-[#FF5500] transition-colors">Calidad 5 Estrellas</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Más de 500 testimonios reales en Google y TripAdvisor con calificación de 4.9/5.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. PAQUETES TURÍSTICOS */}
      <section id="paquetes" className="py-14 sm:py-20 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF5500]">
              Paquetes Turísticos
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Nuestros Tours & Paquetes
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Circuitos completos con alojamiento, traslados y guiado incluidos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PACK_TOURS.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:border-[#FF5500]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2"
              >
                <div>
                  <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 bg-[#FF5500] text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase shadow-md">
                      {tour.badge}
                    </div>
                  </div>

                  <div className="p-6 space-y-2.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#FF5500]">
                      {tour.category}
                    </span>
                    <h3 className="font-extrabold text-base text-stone-900 leading-snug group-hover:text-[#FF5500] transition-colors">
                      {tour.title}
                    </h3>
                    <p className="text-xs text-stone-500 flex items-center gap-1.5">
                      <Clock size={13} className="text-stone-400" /> {tour.duration}
                    </p>
                    <div className="pt-2 flex items-baseline justify-between border-t border-stone-100">
                      <span className="text-xs text-stone-400">Desde</span>
                      <span className="text-lg font-black text-stone-900">{tour.price}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Hola,%20deseo%20informaci%C3%B3n%20del%20${encodeURIComponent(tour.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shimmer-btn w-full bg-stone-900 hover:bg-gradient-to-r hover:from-[#FF5500] hover:to-[#FF3000] text-white py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow-[0_6px_22px_rgba(255,85,0,0.35)] group/btn active:scale-95 cursor-pointer"
                  >
                    <span>Ver Itinerario</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SECCIÓN DE RESEÑAS & TESTIMONIOS VERIFICADOS (GOOGLE & TRIPADVISOR) */}
      <section id="resenas" className="py-16 sm:py-20 bg-[#141211] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#FF8844] text-xs font-black uppercase tracking-widest border border-white/10">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span>Experiencias Reales Verificadas</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Lo que dicen nuestros <span className="text-[#FF5500]">viajeros</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
              Opiniones recopiladas de turistas de todo el mundo que confiaron sus vacaciones en Cusco con nuestro equipo oficial.
            </p>
          </div>

          {/* Reviews Grid with Luxury Dark Styling */}
          {(() => {
            const fallbackReviews = [
              {
                name: 'Alejandro y Marcela',
                origin: 'Madrid, España',
                comment: 'La mejor experiencia de nuestra vida en Perú. Carlos, nuestro guía, nos explicó la historia con una pasión que jamás olvidaremos.',
                rating: 5
              },
              {
                name: 'David Miller',
                origin: 'California, USA',
                comment: 'Zero stress, luxury train ride was stunning. Worth every single dollar. 100% recommended!',
                rating: 5
              },
              {
                name: 'Camila & Laurent Fournier',
                origin: 'Lyon, Francia',
                comment: 'Organización impecable de principio a fin. El equipo siempre atento con el oxígeno y los boletos puntuales. ¡Machu Picchu superó todas nuestras expectativas!',
                rating: 5
              }
            ];

            const list = (data?.testimonials && data.testimonials.length > 0)
              ? [...data.testimonials]
              : fallbackReviews;

            // Garantizar que la cuadrícula de 3 columnas siempre tenga la 3era tarjeta completa
            while (list.length < 3) {
              const nextFallback = fallbackReviews[list.length] || fallbackReviews[0];
              list.push(nextFallback);
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {list.map((t, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-b from-[#1F1C1A] to-[#151311] p-6 sm:p-7 rounded-3xl border border-stone-800 space-y-4 flex flex-col justify-between hover:border-[#FF5500]/70 hover:shadow-[0_15px_40px_rgba(255,85,0,0.18)] hover:-translate-y-2 transition-all duration-300 shadow-lg group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(t.rating || 5)].map((_, i) => (
                            <Star key={i} size={15} fill="currentColor" />
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-stone-300 uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          Verificado
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                        &quot;{t.comment}&quot;
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-xs text-white group-hover:text-[#FF8844] transition-colors">{t.name}</h4>
                        <p className="text-[10px] text-stone-400">{t.origin}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#FF5500]/20 flex items-center justify-center text-[#FF5500] font-bold text-xs group-hover:scale-110 transition-transform">
                        ★
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Social Proof Strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-stone-400 border-t border-stone-800/60">
            <span className="flex items-center gap-1.5">
              <Star size={14} className="text-emerald-400 fill-emerald-400" />
              <strong>4.9 / 5.0</strong> en Google Reviews
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Award size={14} className="text-[#FF5500]" />
              Certificado de Excelencia 2025 & 2026
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-blue-400" />
              +500 Evaluaciones Públicas
            </span>
          </div>

        </div>
      </section>

      {/* 9. FORO DE AYUDA, MESA DE CONSULTAS & FAQ CON PROTECCIÓN ANTI-SPAM MULTICAPA */}
      <TourSupportAndFaqs
        faqs={data?.faqs}
        tourName={data?.name || 'Vinicunca Montaña 7 Colores & Machu Picchu VIP'}
        whatsapp={whatsappNumber}
        guideName={guideName}
        destination={data?.destination || 'Cusco'}
        tier={data?.tier || 'advance'}
        theme="agency-portal"
        isMobile={isMobile}
      />

      {/* 10. GIANT ORANGE CTA BANNER WITH RADIANT GLOW */}
      <section className="relative bg-gradient-to-br from-[#FF4400] via-[#FF5500] to-[#E03B00] text-white py-14 sm:py-20 px-4 sm:px-6 text-center shadow-2xl overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl animate-pulse-glow pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-black/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-black uppercase tracking-widest bg-black/25 px-4 py-1.5 rounded-full inline-block backdrop-blur-md border border-white/20">
            Reserva con Confianza • Operador Acreditado
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-md">
            ¿LISTO PARA TU PRÓXIMA GRAN AVENTURA?
          </h2>
          <p className="text-xs sm:text-base text-orange-100 max-w-2xl mx-auto font-normal">
            Contáctanos hoy mismo para asegurar tus accesos a Machu Picchu y disfrutar del mejor viaje de tu vida en el Perú.
          </p>
          <div className="pt-2">
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hola,%20quiero%20reservar%20mi%20viaje%20a%20Cusco`}
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-btn inline-flex items-center gap-3 bg-white text-[#FF5500] hover:bg-stone-50 px-9 py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_12px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group ring-4 ring-white/25"
            >
              <span>Contactar Ahora</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </section>

      {/* 11. ACCREDITATION SEALS */}
      <section className="bg-white py-8 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <p className="text-[11px] font-black uppercase tracking-widest text-stone-400">
            Acreditaciones Oficiales & Sellos de Calidad
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="flex items-center gap-2 text-stone-700 font-extrabold text-xs">
              <ShieldCheck size={20} className="text-[#FF5500]" />
              <span>MINCETUR PERÚ</span>
            </div>
            <div className="flex items-center gap-2 text-stone-700 font-extrabold text-xs">
              <Award size={20} className="text-[#FF5500]" />
              <span>DIRCETUR CUSCO</span>
            </div>
            <div className="flex items-center gap-2 text-stone-700 font-extrabold text-xs">
              <CheckCircle2 size={20} className="text-emerald-600" />
              <span>SAFE TRAVELS WORLD</span>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="bg-[#1C1917] text-stone-400 py-12 px-4 sm:px-6 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px]">
          <p>© 2026 {brandName}. Operador Turístico Autorizado.</p>
          <p className="text-stone-400 font-medium">Diseñado con Cusco Creativos Platform</p>
        </div>
      </footer>

      {/* 13. FLOATING WHATSAPP WITH BEACON AND HELPER TOOLTIP */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {showWaTooltip && (
          <div className="hidden sm:flex items-center gap-2.5 bg-white text-stone-900 text-xs font-bold px-4 py-2.5 rounded-2xl shadow-2xl border border-stone-200 animate-float-slow">
            <span className="text-base leading-none">💬</span>
            <span>¿Dudas? Habla con un asesor en vivo</span>
            <button
              onClick={() => setShowWaTooltip(false)}
              className="text-stone-400 hover:text-stone-700 ml-1 text-xs cursor-pointer p-0.5"
              aria-label="Cerrar sugerencia"
            >
              ✕
            </button>
          </div>
        )}

        <a
          href={`https://wa.me/${whatsappNumber}?text=Hola,%20deseo%20consultar%20por%20los%20tours`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
          aria-label="Contactar por WhatsApp"
        >
          <span className="animate-ping absolute inset-0 rounded-full bg-[#25D366]/40 pointer-events-none"></span>
          <MessageCircle size={26} className="fill-white relative z-10 group-hover:rotate-12 transition-transform duration-300" />
        </a>
      </div>
    </div>
  );
}
