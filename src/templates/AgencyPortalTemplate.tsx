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

  const brandName = data?.name || 'Cusco Tours';
  const whatsappNumber = (data?.whatsapp || '+51984123456').replace(/[^0-9]/g, '');
  const guideName = data?.guideName || 'Marco Mendoza';

  const FEATURED_TOURS = [
    {
      id: '1',
      title: 'Vinicunca Montaña 7 Colores Clásico',
      category: 'Aventura & Trekking',
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
            className="bg-[#FF5500] hover:bg-[#E04B00] text-white text-xs font-extrabold px-4 sm:px-5 py-2.5 rounded-full shadow-md shadow-[#FF5500]/30 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle size={15} />
            <span>Cotizar por WhatsApp</span>
          </a>
        </div>
      </header>

      {/* 3. HERO VINICUNCA */}
      <section className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop"
            alt="Vinicunca Montaña 7 Colores"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/30" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white py-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-widest border border-white/30 shadow-lg">
            <Sparkles size={14} className="text-[#FF8844]" />
            <span>Temporada 2026 • Salidas Diarias Garantizadas</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight drop-shadow-lg leading-tight uppercase">
            VINICUNCA
          </h1>
          <p className="text-base sm:text-xl lg:text-2xl font-light text-stone-100 max-w-2xl mx-auto drop-shadow-md">
            Montaña de 7 Colores & Valle Rojo • Vive la magia de los Andes
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hola,%20deseo%20reservar%20el%20Tour%20Vinicunca`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF5500] hover:bg-[#E04B00] text-white px-7 py-3.5 rounded-full font-black text-xs sm:text-sm tracking-wide uppercase transition-all shadow-xl shadow-[#FF5500]/40 hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <span>Reservar Ahora</span>
              <ArrowRight size={16} />
            </a>

            <a
              href="#tours"
              className="bg-white/90 hover:bg-white text-stone-900 px-7 py-3.5 rounded-full font-black text-xs sm:text-sm tracking-wide uppercase transition-all shadow-lg hover:scale-105 cursor-pointer"
            >
              Ver Más Tours
            </a>
          </div>
        </div>
      </section>

      {/* 4. METRICS COUNTER BAR */}
      <section className="bg-white border-b border-stone-200 py-6 sm:py-8 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-x-0 md:divide-x divide-stone-100 text-center">
            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">+10,000</span>
              <span className="text-xs sm:text-sm font-bold text-stone-600">Viajeros Felices</span>
              <span className="text-[11px] text-stone-400">Atención personalizada</span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="text-2xl sm:text-4xl font-black text-[#FF5500] tracking-tight">10+ Años</span>
              <span className="text-xs sm:text-sm font-bold text-stone-600">De Experiencia</span>
              <span className="text-[11px] text-stone-400">Operador formal en Cusco</span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">50+</span>
              <span className="text-xs sm:text-sm font-bold text-stone-600">Rutas & Destinos</span>
              <span className="text-[11px] text-stone-400">En todo el Perú</span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="text-2xl sm:text-4xl font-black text-[#FF5500] tracking-tight">4.9 / 5</span>
              <span className="text-xs sm:text-sm font-bold text-stone-600">Puntuación Excelente</span>
              <span className="text-[11px] text-stone-400">TripAdvisor & Google</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TOURS DESTACADOS */}
      <section id="tours" className="py-14 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#FF5500]">
            Catálogo Exclusivo
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Tours <span className="text-[#FF5500]">Destacados</span> en Cusco y Perú
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Salidas diarias garantizadas con guías colegiados, traslados oficiales y asistencia médica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_TOURS.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="relative h-56 w-full bg-stone-100 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-extrabold text-stone-900 flex items-center gap-1 shadow-md">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span>{tour.badge}</span>
                  </div>

                  {tour.tag && (
                    <div className="absolute top-3 right-3 bg-[#FF5500] text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                      {tour.tag}
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[11px] font-bold text-stone-200 block uppercase tracking-wider">
                      {tour.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-extrabold text-base sm:text-lg text-stone-900 leading-snug group-hover:text-[#FF5500] transition-colors">
                    {tour.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-stone-400" /> {tour.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-[#FF5500]" /> {tour.location}
                    </span>
                  </div>

                  <div className="pt-2 flex items-baseline justify-between border-t border-stone-100">
                    <span className="text-xs text-stone-400">Precio por persona</span>
                    <span className="text-lg font-black text-[#FF5500]">{tour.price}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hola,%20deseo%20reservar%20el%20${encodeURIComponent(tour.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#FF5500] hover:bg-[#E04B00] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-[#FF5500]/20 cursor-pointer"
                >
                  <span>Reservar Tour</span>
                  <ArrowRight size={14} />
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
              <div className="relative h-80 sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop"
                  alt="Guías Oficiales en Machu Picchu"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating Satisfaction Badge */}
              <div className="absolute -bottom-5 -right-3 sm:right-6 bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-stone-200 flex items-center gap-3.5">
                <div className="w-13 h-13 rounded-2xl bg-[#FF5500]/10 flex items-center justify-center text-[#FF5500] font-black text-lg">
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
                <div className="flex items-center gap-2.5 text-xs font-bold text-stone-800 bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
                  <CheckCircle2 size={17} className="text-[#FF5500] shrink-0" />
                  <span>Guías Oficiales Acreditados</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-stone-800 bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
                  <CheckCircle2 size={17} className="text-[#FF5500] shrink-0" />
                  <span>Balón de Oxígeno & Botiquín</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-stone-800 bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
                  <CheckCircle2 size={17} className="text-[#FF5500] shrink-0" />
                  <span>Salidas Diarias Garantizadas</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-stone-800 bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
                  <CheckCircle2 size={17} className="text-[#FF5500] shrink-0" />
                  <span>Atención 24/7 por WhatsApp</span>
                </div>
              </div>

              {/* Highlight Safety Box */}
              <div className="bg-[#FFF6F0] p-6 rounded-2xl border border-[#FFD9C2] space-y-2.5 shadow-xs">
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
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-lg transition-all text-center space-y-3 group hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <ShieldCheck size={26} />
                </div>
                <h4 className="font-extrabold text-sm text-stone-900">Agencia Formal</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Registrados ante DIRCETUR y MINCETUR con RUC 20 formal verificado y facturación legal.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-lg transition-all text-center space-y-3 group hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Heart size={26} />
                </div>
                <h4 className="font-extrabold text-sm text-stone-900">Pasión & Amor</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Guías locales cusqueños que transmiten el legado incaico con autenticidad y calidez humana.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-lg transition-all text-center space-y-3 group hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Clock size={26} />
                </div>
                <h4 className="font-extrabold text-sm text-stone-900">Cero Estrés</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Recojo puntual en la puerta de tu hotel, boletos asegurados sin colas y logística impecable.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-lg transition-all text-center space-y-3 group hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Star size={26} />
                </div>
                <h4 className="font-extrabold text-sm text-stone-900">Calidad 5 Estrellas</h4>
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
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-[#FF5500] text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase">
                      {tour.badge}
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#FF5500]">
                      {tour.category}
                    </span>
                    <h3 className="font-extrabold text-base text-stone-900 leading-snug">
                      {tour.title}
                    </h3>
                    <p className="text-xs text-stone-500 flex items-center gap-1">
                      <Clock size={13} /> {tour.duration}
                    </p>
                    <div className="pt-2 flex items-baseline justify-between border-t border-stone-100">
                      <span className="text-xs text-stone-400">Desde</span>
                      <span className="text-base font-black text-stone-900">{tour.price}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Hola,%20deseo%20informaci%C3%B3n%20del%20${encodeURIComponent(tour.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-stone-900 hover:bg-[#FF5500] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Ver Itinerario</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SECCIÓN DE RESEÑAS & TESTIMONIOS VERIFICADOS (GOOGLE & TRIPADVISOR) */}
      <section id="resenas" className="py-16 sm:py-20 bg-[#141211] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
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

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(data?.testimonials && data.testimonials.length > 0 ? data.testimonials : [
              {
                name: 'Clara Fernández',
                origin: 'Madrid, España • Hace 3 días en TripAdvisor',
                comment: 'Vinicunca y Machu Picchu de ensueño. Nos recogieron en punto en el hotel, el guía súper atento con el oxígeno y el almuerzo riquísimo. 100% recomendados!',
                rating: 5
              },
              {
                name: 'Mark & Sophie Miller',
                origin: 'London, UK • Hace 1 semana en Google Reviews',
                comment: 'Outstanding organization in Peru! Everything flowed smoothly from our airport pickup in Cusco to the breathtaking train journey to Machu Picchu. Very caring guides.',
                rating: 5
              },
              {
                name: 'Diego Navarro & Familia',
                origin: 'Santiago, Chile • Hace 2 semanas en Facebook Reviews',
                comment: 'Hicimos el paquete de 4 días en familia. Nos transmitieron mucha confianza con sus licencias DIRCETUR y la atención rápida por WhatsApp. Inolvidable experiencia.',
                rating: 5
              }
            ]).map((t, idx) => (
              <div
                key={idx}
                className="bg-[#1F1C1A] p-6 sm:p-7 rounded-2xl border border-stone-800 space-y-4 flex flex-col justify-between hover:border-[#FF5500]/50 transition-all duration-300 shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded">
                      Verificado
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                    &quot;{t.comment}&quot;
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-xs text-white">{t.name}</h4>
                    <p className="text-[10px] text-stone-400">{t.origin}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#FF5500]/20 flex items-center justify-center text-[#FF5500] font-bold text-xs">
                    ★
                  </div>
                </div>
              </div>
            ))}
          </div>

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

      {/* 9. GIANT ORANGE CTA BANNER */}
      <section className="bg-[#FF5500] text-white py-14 sm:py-18 px-4 sm:px-6 text-center shadow-xl">
        <div className="max-w-4xl mx-auto space-y-5">
          <span className="text-xs font-black uppercase tracking-widest bg-black/20 px-3.5 py-1.5 rounded-full inline-block">
            Reserva con Confianza • Operador Acreditado
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
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
              className="inline-flex items-center gap-2.5 bg-white text-[#FF5500] hover:bg-stone-100 px-8 py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition-all hover:scale-105 cursor-pointer"
            >
              <span>Contactar Ahora</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 10. ACCREDITATION SEALS */}
      <section className="bg-white py-8 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <p className="text-[11px] font-black uppercase tracking-widest text-stone-400">
            Acreditaciones Oficiales & Sellos de Calidad
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-80 grayscale hover:grayscale-0 transition-all">
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

      {/* 11. FOOTER */}
      <footer className="bg-[#1C1917] text-stone-400 py-12 px-4 sm:px-6 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px]">
          <p>© 2026 {brandName}. Operador Turístico Autorizado.</p>
          <p className="text-stone-400 font-medium">Diseñado con Cusco Creativos Platform</p>
        </div>
      </footer>

      {/* 12. FLOATING WHATSAPP */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hola,%20deseo%20consultar%20por%20los%20tours`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center cursor-pointer"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={24} className="fill-white" />
      </a>
    </div>
  );
}
