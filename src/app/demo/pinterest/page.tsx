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
  Search
} from 'lucide-react';

interface TourCard {
  id: string;
  title: string;
  category: string;
  location: string;
  duration: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  tag?: string;
  badge?: string;
  slug: string;
}

const FEATURED_TOURS: TourCard[] = [
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
    badge: '4.9 ★',
    slug: 'salkantay-trek-machu-picchu'
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
    badge: '4.8 ★',
    slug: 'laguna-humantay-boho'
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
    badge: '5.0 ★',
    slug: 'machu-picchu-luxury-vip'
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
    badge: '4.9 ★',
    slug: 'city-tour-cusco'
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
    badge: '5.0 ★',
    slug: 'machu-picchu-luxury-vip'
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
    badge: '4.8 ★',
    slug: 'valle-sagrado-aventura'
  }
];

const PACK_TOURS: TourCard[] = [
  {
    id: 'p1',
    title: 'Cusco Mágico 4 Días / 3 Noches',
    category: 'Paquete Clásico',
    location: 'Cusco - Valle - Machu Picchu',
    duration: '4 Días / 3 Noches',
    price: '$420 USD',
    rating: 4.9,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=2074&auto=format&fit=crop',
    badge: '4.9 ★',
    slug: 'machu-picchu-luxury-vip'
  },
  {
    id: 'p2',
    title: 'Cusco Aventura Total 5 Días',
    category: 'Aventura & Altura',
    location: 'Vinicunca - Humantay - MP',
    duration: '5 Días / 4 Noches',
    price: '$490 USD',
    rating: 5.0,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?q=80&w=2070&auto=format&fit=crop',
    badge: '5.0 ★',
    slug: 'salkantay-trek-machu-picchu'
  },
  {
    id: 'p3',
    title: 'Perú Soñado: Lima, Ica & Cusco',
    category: 'Circuito Nacional',
    location: 'Lima - Paracas - Cusco',
    duration: '7 Días / 6 Noches',
    price: '$780 USD',
    rating: 4.9,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop',
    badge: '4.9 ★',
    slug: 'valle-sagrado-aventura'
  },
  {
    id: 'p4',
    title: 'Cusco Express Esencial 3 Días',
    category: 'Escapada Rápida',
    location: 'City Tour + Machu Picchu',
    duration: '3 Días / 2 Noches',
    price: '$360 USD',
    rating: 4.8,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
    badge: '4.8 ★',
    slug: 'city-tour-cusco'
  },
  {
    id: 'p5',
    title: 'Tour Cuatrimotos Maras & Moray',
    category: 'Adrenalina',
    location: 'Valle Sagrado',
    duration: 'Medio Día (8:30 - 13:30)',
    price: '$35 USD',
    rating: 4.9,
    reviews: 260,
    image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop',
    badge: '4.9 ★',
    slug: 'valle-sagrado-aventura'
  },
  {
    id: 'p6',
    title: 'City Tour Cusco & 4 Ruinas Aledañas',
    category: 'Tradición',
    location: 'Cusco Histórico',
    duration: 'Medio Día (13:00 - 18:30)',
    price: '$25 USD',
    rating: 4.8,
    reviews: 310,
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
    badge: '4.8 ★',
    slug: 'city-tour-cusco'
  }
];

const POPULAR_DESTINATIONS = [
  {
    name: 'Cusco',
    region: 'Andes del Sur',
    toursCount: '18 Tours Disponibles',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: 'Lima',
    region: 'Costa Central',
    toursCount: '6 Tours Disponibles',
    image: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=2074&auto=format&fit=crop'
  },
  {
    name: 'Puno & Lago Titicaca',
    region: 'Altiplano',
    toursCount: '5 Tours Disponibles',
    image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop'
  }
];

const REVIEWS_DATA = [
  {
    author: 'Clara Fernández',
    date: 'Hace 3 días • Tripadvisor',
    rating: 5,
    title: 'Vinicunca y Machu Picchu de Ensueño',
    text: 'Todo el equipo fue de 10. Nos recogieron en punto en el hotel, el guía Marco súper atento con el oxígeno en Vinicunca y el almuerzo riquísimo. 100% recomendados!'
  },
  {
    author: 'Mark & Sophie Miller',
    date: 'Hace 1 semana • Google Reviews',
    rating: 5,
    title: 'Outstanding Organization in Peru!',
    text: 'Everything flowed smoothly from our airport pickup in Cusco to the breathtaking train journey to Machu Picchu. Reliable, accredited and very caring guides.'
  },
  {
    author: 'Diego Navarro',
    date: 'Hace 2 semanas • Facebook Reviews',
    rating: 5,
    title: 'Excelente servicio y puntualidad',
    text: 'Hicimos el paquete de 4 días en familia. Nos transmitieron mucha confianza con sus licencias DIRCETUR y la atención rápida por WhatsApp. Repetiríamos sin dudar.'
  }
];

export default function PinterestGalleryPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'todos' | 'cusco' | 'paquetes'>('todos');

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
    <div className="min-h-screen bg-[#FDFDFD] text-stone-900 font-sans selection:bg-[#FF5500] selection:text-white">
      
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

      {/* 2. MAIN HEADER & NAVIGATION */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          {/* Logo */}
          <Link href="/demo" className="flex items-center gap-2">
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
          </Link>

          {/* Desktop Menu Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-stone-700 uppercase tracking-wider">
            <a href="#tours" className="hover:text-[#FF5500] transition-colors">Tours Destacados</a>
            <a href="#paquetes" className="hover:text-[#FF5500] transition-colors">Paquetes</a>
            <a href="#por-que-nosotros" className="hover:text-[#FF5500] transition-colors">¿Por Qué Nosotros?</a>
            <a href="#experiencias" className="hover:text-[#FF5500] transition-colors">Experiencias</a>
            <a href="#destinos" className="hover:text-[#FF5500] transition-colors">Destinos</a>
            <a href="#preguntas" className="hover:text-[#FF5500] transition-colors">FAQ</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/51984123456?text=Hola%20Cusco%20Tours,%20deseo%20cotizar%20un%20tour"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF5500] hover:bg-[#E04B00] text-white text-xs font-extrabold px-4 sm:px-5 py-2.5 rounded-full shadow-md shadow-[#FF5500]/30 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle size={15} />
              <span>Cotizar por WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. HERO BANNER VINICUNCA (EXACT TO REFERENCE IMAGE) */}
      <section className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center justify-center overflow-hidden">
        {/* Background Mountain Photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop"
            alt="Vinicunca Montaña 7 Colores"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Subtle Contrast Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/30" />
        </div>

        {/* Hero Content */}
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

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://wa.me/51984123456?text=Hola,%20deseo%20reservar%20el%20Tour%20Vinicunca%20Monta%C3%B1a%207%20Colores"
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

      {/* 4. METRICS / COUNTER BAR (EXACT TO REFERENCE) */}
      <section className="bg-white border-b border-stone-200 py-6 sm:py-8 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-x-0 md:divide-x divide-stone-100 text-center">
            
            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
                +10,000
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-600">Viajeros Felices</span>
              <span className="text-[11px] text-stone-400">Atención personalizada</span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="text-2xl sm:text-4xl font-black text-[#FF5500] tracking-tight">
                10+ Años
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-600">De Experiencia</span>
              <span className="text-[11px] text-stone-400">Operador formal en Cusco</span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
                50+
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-600">Rutas & Destinos</span>
              <span className="text-[11px] text-stone-400">En todo el Perú</span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="text-2xl sm:text-4xl font-black text-[#FF5500] tracking-tight">
                4.9 / 5
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-600">Puntuación Excelente</span>
              <span className="text-[11px] text-stone-400">TripAdvisor & Google</span>
            </div>

          </div>
        </div>
      </section>

      {/* 5. TOURS DESTACADOS EN CUSCO (GRID DE 6 CARDS CON BOTONES NARANJAS) */}
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

        {/* Grid of 6 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_TOURS.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Photo with Badge */}
                <div className="relative h-56 w-full bg-stone-100 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Rating Badge */}
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

                {/* Body Content */}
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

              {/* Orange Action Button */}
              <div className="p-5 pt-0">
                <a
                  href={`https://wa.me/51984123456?text=Hola,%20deseo%20reservar%20el%20${encodeURIComponent(tour.title)}`}
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

      {/* 6. ¿POR QUÉ ELEGIR CUSCO TOURS? (DOS COLUMNAS: FOTO GUÍAS + CAJA BENEFICIOS) */}
      <section id="por-que-nosotros" className="py-14 sm:py-20 bg-[#F9F7F4] border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            
            {/* Left Photo with Badge */}
            <div className="relative">
              <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop"
                  alt="Guías Oficiales en Machu Picchu"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Review Badge */}
              <div className="absolute -bottom-5 -right-3 sm:right-6 bg-white p-4 rounded-2xl shadow-xl border border-stone-200 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#FF5500]/10 flex items-center justify-center text-[#FF5500] font-black text-base">
                  100%
                </div>
                <div>
                  <p className="font-extrabold text-xs text-stone-900">Satisfacción Garantizada</p>
                  <p className="text-[11px] text-stone-400">Guías colegiados bilingües</p>
                </div>
              </div>
            </div>

            {/* Right Text & Feature Pillars */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#FF5500]">
                  Confianza & Formalidad
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
                  ¿Por qué viajar con <span className="text-[#FF5500]">Cusco Tours</span>?
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Somos una agencia local acreditada con más de 10 años organizando viajes inolvidables. Cuidamos cada detalle desde tu llegada al aeropuerto hasta tu retorno a casa.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                  <CheckCircle2 size={16} className="text-[#FF5500] shrink-0" />
                  <span>Guías Oficiales Acreditados</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                  <CheckCircle2 size={16} className="text-[#FF5500] shrink-0" />
                  <span>Balón de Oxígeno & Botiquín</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                  <CheckCircle2 size={16} className="text-[#FF5500] shrink-0" />
                  <span>Salidas Diarias Garantizadas</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                  <CheckCircle2 size={16} className="text-[#FF5500] shrink-0" />
                  <span>Atención 24/7 por WhatsApp</span>
                </div>
              </div>

              {/* Beige Highlight Box */}
              <div className="bg-[#FFF6F0] p-6 rounded-2xl border border-[#FFD9C2] space-y-3">
                <h4 className="font-extrabold text-sm text-stone-900 flex items-center gap-2">
                  <Award size={18} className="text-[#FF5500]" />
                  <span>Compromiso de Altura y Seguridad</span>
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Sabemos lo desafiante que puede ser la altitud andina. Por ello, todos nuestros itinerarios respetan los tiempos recomendados de aclimatación y monitoreamos el bienestar de cada viajero durante todo el recorrido.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CREANDO CONEXIONES CON EL MUNDO (4 PILARES) */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1 text-[#FF5500] text-xs font-extrabold uppercase tracking-widest">
            <Globe2 size={14} /> <span>Operador Oficial</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Creando Conexiones con el Mundo
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Nuestros 4 pilares fundamentales para brindarte una experiencia auténtica y memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-lg transition-all text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center mx-auto">
              <ShieldCheck size={26} />
            </div>
            <h3 className="font-extrabold text-sm text-stone-900">Agencia Formal</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Registrados ante DIRCETUR y MINCETUR con RUC formal verificado.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-lg transition-all text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center mx-auto">
              <Heart size={26} />
            </div>
            <h3 className="font-extrabold text-sm text-stone-900">Pasión & Amor</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Guías locales nacidos en Cusco que transmiten la historia con entusiasmo genuino.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-lg transition-all text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center mx-auto">
              <Clock size={26} />
            </div>
            <h3 className="font-extrabold text-sm text-stone-900">Cero Estrés</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Recojo puntual en la puerta de tu hotel y boletos asegurados sin colas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-lg transition-all text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center mx-auto">
              <Star size={26} />
            </div>
            <h3 className="font-extrabold text-sm text-stone-900">Experiencias 5 Estrellas</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Más de 500 testimonios reales en plataformas globales respaldan nuestro servicio.
            </p>
          </div>
        </div>
      </section>

      {/* 8. PAQUETES Y TOURS POR CATEGORÍA (SEGUNDA CUADRÍCULA DE TOURS) */}
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
                    href={`https://wa.me/51984123456?text=Hola,%20deseo%20informaci%C3%B3n%20del%20${encodeURIComponent(tour.title)}`}
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

      {/* 9. LA EXPERIENCIA CUSCO TOURS (4 MINI CARDS CON FOTOS Y ICONOS) */}
      <section id="experiencias" className="py-14 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#FF5500]">
            Momentos Inolvidables
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
            La Experiencia Cusco Tours
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Descubre algunas de las postales más icónicas capturadas por nuestros viajeros.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="group relative rounded-2xl overflow-hidden shadow-md bg-stone-900">
            <div className="relative h-48 sm:h-60 w-full">
              <Image
                src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop"
                alt="Laguna Humantay"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-xs font-bold block">Laguna Humantay</span>
                <span className="text-[10px] text-stone-300">4,200 msnm</span>
              </div>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden shadow-md bg-stone-900">
            <div className="relative h-48 sm:h-60 w-full">
              <Image
                src="https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop"
                alt="Valle Sagrado"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-xs font-bold block">Ollantaytambo</span>
                <span className="text-[10px] text-stone-300">Valle Sagrado</span>
              </div>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden shadow-md bg-stone-900">
            <div className="relative h-48 sm:h-60 w-full">
              <Image
                src="https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop"
                alt="Montaña Vinicunca"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-xs font-bold block">Vinicunca</span>
                <span className="text-[10px] text-stone-300">5,036 msnm</span>
              </div>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden shadow-md bg-stone-900">
            <div className="relative h-48 sm:h-60 w-full">
              <Image
                src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop"
                alt="Machu Picchu"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-xs font-bold block">Machu Picchu</span>
                <span className="text-[10px] text-stone-300">Santuario Histórico</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. DESTINOS POPULARES (3 CARDS HORIZONTALES) */}
      <section id="destinos" className="py-14 sm:py-20 bg-stone-100 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF5500]">
              Perú Mágico
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Destinos Populares
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Explora las ciudades y regiones más solicitadas por nuestros viajeros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {POPULAR_DESTINATIONS.map((dest, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="font-extrabold text-lg">{dest.name}</h3>
                    <p className="text-xs text-stone-200">{dest.region}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-600">{dest.toursCount}</span>
                  <span className="text-xs font-extrabold text-[#FF5500] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Ver Rutas →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. LO QUE DICEN NUESTROS VIAJEROS (TESTIMONIOS OSCUROS ESTILO WIDGET) */}
      <section className="py-14 sm:py-20 bg-[#141211] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF5500]">
              Testimonios Verificados
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Lo que dicen nuestros viajeros
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              Reseñas públicas recopiladas de Google y TripAdvisor.
            </p>
          </div>

          {/* Dark Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS_DATA.map((rev, i) => (
              <div
                key={i}
                className="bg-[#1F1C1A] p-6 rounded-2xl border border-stone-800 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <h4 className="font-extrabold text-sm text-white">{rev.title}</h4>
                  <p className="text-xs text-stone-300 leading-relaxed italic">
                    &quot;{rev.text}&quot;
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800">
                  <p className="font-bold text-xs text-white">{rev.author}</p>
                  <p className="text-[10px] text-stone-400">{rev.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof Footer */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-stone-400">
            <span className="flex items-center gap-1.5">
              <Star size={14} className="text-emerald-400 fill-emerald-400" />
              <strong>4.9 / 5.0</strong> en Google Reviews
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Award size={14} className="text-[#FF5500]" />
              Certificado de Excelencia 2025 & 2026
            </span>
          </div>

        </div>
      </section>

      {/* 12. PREGUNTAS FRECUENTES (FAQ INTERACTIVO CON FOTO LATERAL) */}
      <section id="preguntas" className="py-14 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#FF5500]">
            Mesa de Ayuda
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
            ¿Tienes preguntas?
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Resolvemos las dudas más frecuentes antes de tu viaje a Cusco y Machu Picchu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FAQ Accordion (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-stone-200 rounded-2xl overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-stone-900 flex items-center justify-between gap-4 cursor-pointer hover:text-[#FF5500]"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={16} className="text-[#FF5500] shrink-0" /> : <ChevronDown size={16} className="text-stone-400 shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Support Card with Photo (5 cols) */}
          <div className="lg:col-span-5 bg-[#F9F7F4] p-6 sm:p-8 rounded-3xl border border-stone-200 space-y-5">
            <div className="relative h-44 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop"
                alt="Atención Turística Cusco"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-xs font-bold">Asistencia Personalizada</span>
                <p className="text-[11px] text-stone-200">Respondemos en menos de 15 minutos</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-extrabold text-stone-900 text-sm">¿Tu duda no aparece aquí?</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Habla directamente con un asesor de viaje en Cusco por WhatsApp para armar un itinerario a tu medida.
              </p>
            </div>

            <a
              href="https://wa.me/51984123456?text=Hola,%20tengo%20una%20consulta%20especial%20sobre%20los%20tours"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#FF5500] hover:bg-[#E04B00] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-[#FF5500]/30 cursor-pointer"
            >
              <MessageCircle size={16} />
              <span>Chatear con un Asesor</span>
            </a>
          </div>

        </div>
      </section>

      {/* 13. GIANT ORANGE CTA BANNER (EXACT TO REFERENCE) */}
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
              href="https://wa.me/51984123456?text=Hola,%20quiero%20reservar%20mi%20viaje%20a%20Cusco%20y%20Machu%20Picchu"
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

      {/* 14. ACCREDITATION SEALS STRIP (DIRCETUR, MINCETUR, SAFE TRAVELS) */}
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
            <div className="flex items-center gap-2 text-stone-700 font-extrabold text-xs">
              <Compass size={20} className="text-blue-600" />
              <span>COLITUR COLEGIO DE TURISMO</span>
            </div>
          </div>
        </div>
      </section>

      {/* 15. MAIN FOOTER (EXACT MULTI-COLUMN DESIGN WITH PAYMENT LOGOS) */}
      <footer className="bg-[#1C1917] text-stone-400 py-12 px-4 sm:px-6 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-black text-base">
              <Compass size={20} className="text-[#FF5500]" />
              <span>CUSCO<span className="text-[#FF5500]">TOURS</span></span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Agencia de viajes y operador turístico oficial con base en Cusco, Perú. Especialistas en expediciones de montaña, circuitos culturales y vivenciales.
            </p>
            <p className="text-stone-500 text-[11px]">RUC: 20601234567 • Cusco Creativos S.A.C.</p>
          </div>

          {/* Col 2: Tours Populares */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Tours Populares</h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li><a href="#tours" className="hover:text-white transition-colors">Vinicunca Montaña 7 Colores</a></li>
              <li><a href="#tours" className="hover:text-white transition-colors">Laguna Humantay Full Day</a></li>
              <li><a href="#tours" className="hover:text-white transition-colors">Machu Picchu en Tren Panorámico</a></li>
              <li><a href="#tours" className="hover:text-white transition-colors">Valle Sagrado de los Incas VIP</a></li>
              <li><a href="#tours" className="hover:text-white transition-colors">City Tour Cusco & 4 Ruinas</a></li>
            </ul>
          </div>

          {/* Col 3: Contacto */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Contacto & Reservas</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-[#FF5500] shrink-0" />
                <span>Calle Plateros 348, Centro Histórico, Cusco</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-[#FF5500] shrink-0" />
                <span>+51 984 123 456 / +51 084 223344</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-[#FF5500] shrink-0" />
                <span>reservas@cuscotours.pe</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={14} className="text-[#FF5500] shrink-0" />
                <span>Lunes a Domingo: 07:00 - 21:00 hrs</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Métodos de Pago & Seguridad */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Métodos de Pago</h4>
            <p className="text-[11px] text-stone-400">
              Aceptamos pagos 100% seguros mediante transferencias y tarjetas:
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-bold text-white">
              <span className="bg-stone-800 px-2.5 py-1 rounded border border-stone-700">BCP</span>
              <span className="bg-stone-800 px-2.5 py-1 rounded border border-stone-700">Interbank</span>
              <span className="bg-stone-800 px-2.5 py-1 rounded border border-stone-700">BBVA</span>
              <span className="bg-[#582D73] px-2.5 py-1 rounded">Yape</span>
              <span className="bg-[#00B4D8] px-2.5 py-1 rounded">Plin</span>
              <span className="bg-stone-800 px-2.5 py-1 rounded border border-stone-700">VISA</span>
              <span className="bg-stone-800 px-2.5 py-1 rounded border border-stone-700">Mastercard</span>
            </div>
            <p className="text-[10px] text-stone-500 pt-2">
              Pagos encriptados con certificación SSL de 256 bits.
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px]">
          <p>© 2026 Cusco Tours. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="/demo" className="hover:text-white transition-colors">Volver al Panel</Link>
            <Link href="/demo/new" className="hover:text-white transition-colors">Generador con IA</Link>
            <Link href="/demo/plans" className="hover:text-white transition-colors">Guía de Niveles</Link>
          </div>
        </div>
      </footer>

      {/* 16. FLOATING WHATSAPP BUTTON (BOTTOM RIGHT) */}
      <a
        href="https://wa.me/51984123456?text=Hola,%20deseo%20consultar%20por%20los%20tours"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center cursor-pointer group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={24} className="fill-white group-hover:rotate-12 transition-transform" />
      </a>

    </div>
  );
}

