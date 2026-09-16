'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Pin, 
  Sparkles, 
  Eye, 
  ArrowRight, 
  Heart, 
  Camera, 
  Layers, 
  Palette, 
  Compass, 
  CheckCircle2,
  Bookmark,
  Share2,
  MapPin,
  Star,
  Clock,
  ShieldCheck,
  Phone,
  Mail,
  Award,
  Globe2,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  LayoutTemplate,
  Flame,
  Crown
} from 'lucide-react';
import { TemplateType, PlanTier } from '@/types/landing';

interface PinterestDesign {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  template: TemplateType;
  recommendedTier: PlanTier;
  targetTour: string;
  demoSlug: string;
  colorPalette: { name: string; hex: string }[];
  tags: string[];
  description: string;
  pinFeatures: string[];
  previewImage: string;
  gridSampleImages: string[];
  likesCount: number;
  isFeatured?: boolean;
  isPortalOption?: boolean;
}

const PINTEREST_DESIGNS: PinterestDesign[] = [
  {
    id: 'peru-portal-agency',
    name: '1. Portal Oficial de Agencia Perú (Vinicunca Orange)',
    subtitle: 'El diseño viral #1: Alta conversión con acentos naranja, métricas, FAQ y sellos DIRCETUR',
    category: 'Alta Conversión & Portal Oficial',
    template: 'agency-portal',
    recommendedTier: 'advance',
    targetTour: 'Vinicunca 7 Colores, Catálogo Completo de Tours, Paquetes Multidía',
    demoSlug: 'salkantay-trek-machu-picchu',
    isFeatured: true,
    isPortalOption: true,
    colorPalette: [
      { name: 'Naranja Fuego', hex: '#FF5500' },
      { name: 'Carbón Andino', hex: '#1C1917' },
      { name: 'Crema Arena', hex: '#F9F7F4' },
      { name: 'Blanco Nieve', hex: '#FFFFFF' }
    ],
    tags: ['Hero Vinicunca', 'Botones Naranjas', 'Sellos DIRCETUR', 'Widget Reviews', 'Alta Conversión'],
    description: 'Inspiración exacta del portal turístico de mayor conversión en Pinterest: Hero panorámico de Vinicunca con llamada a la acción en naranja vibrante, barra de 10,000+ viajeros, tarjetas de tours con precios en USD, sección de guías oficiales y sellos Safe Travels.',
    pinFeatures: [
      'Hero imponente con fotografía de cumbre y botones redondeados en contraste',
      'Barra de métricas: +10,000 viajeros, 10+ años de experiencia, puntuación 4.9/5',
      'Grid de 6 tours con badges de calificación ★ y botón directo de reserva',
      'Sección de confianza con RUC formal, botiquín de altura y oxígeno',
      'Widget de testimonios oscuros estilo TripAdvisor y acordeón FAQ',
      'Banner naranja gigante "¿Listo para tu próxima gran aventura?"'
    ],
    previewImage: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop'
    ],
    likesCount: 3840
  },
  {
    id: 'boho-journal',
    name: '2. Boho Travel Journal & Polaroids',
    subtitle: 'Bitácora de Viajes con Fotos Polaroids Inclinadas y Cinta Washi',
    category: 'Editorial & Storytelling',
    template: 'boho-nature',
    recommendedTier: 'advance',
    targetTour: 'Laguna Humantay, Salineras de Maras, Rutas Fotográficas',
    demoSlug: 'laguna-humantay-boho',
    colorPalette: [
      { name: 'Arena Cálida', hex: '#FAF7F2' },
      { name: 'Terracota Boho', hex: '#C86D51' },
      { name: 'Verde Eucalipto', hex: '#588157' },
      { name: 'Cinta Washi', hex: '#E8DEC8' }
    ],
    tags: ['Polaroids Inclinadas', 'Washi Tape', 'Notas de Campo', 'Pinterest Masonry'],
    description: 'Inspirado en los tableros de bitácoras de viaje más virales de Pinterest. Cada fotografía se presenta como una polaroid física sujeta con cinta adhesiva y anotaciones manuscritas del guía.',
    pinFeatures: [
      'Marcos polaroid con inclinación sutil (-1° a 1°)',
      'Cinta adhesiva semitransparente en la parte superior',
      'Itinerario maquetado como diario de campo con horas y sellos',
      'Micro-interacción de "Guardar Pin" y contador de favoritos'
    ],
    previewImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop'
    ],
    likesCount: 2420
  },
  {
    id: 'editorial-magazine',
    name: '3. Editorial Magazine & Moodboard',
    subtitle: 'Revista de Alta Gama con Collage Asimétrico y Tipografía Serif',
    category: 'Vogue Travel Style',
    template: 'boho-nature',
    recommendedTier: 'pro',
    targetTour: 'Valles Sagrados, Gastronomía Andina, Cafés de Altura',
    demoSlug: 'salkantay-trek-machu-picchu',
    colorPalette: [
      { name: 'Blanco Nieve', hex: '#FFFFFF' },
      { name: 'Tierra Arcillosa', hex: '#9C583F' },
      { name: 'Gris Editorial', hex: '#44403C' },
      { name: 'Dorado Suave', hex: '#D4AF37' }
    ],
    tags: ['Tipografía Serif', 'Collage Editorial', 'Citas Célebres', 'Filtro Mate'],
    description: 'Estética de revista internacional de viajes (Condé Nast / Kinfolk). Mezcla fotografías a doble página con recortes tipográficos, espacios en blanco generosos y citas poéticas sobre los Andes.',
    pinFeatures: [
      'Cuadrícula asimétrica con contrastes de escala',
      'Frases destacadas de viajeros en tipografía serif elegante',
      'Módulo de "¿Qué llevar en tu mochila?" estilo checklist de revista',
      'Botones de reserva flotantes minimalistas'
    ],
    previewImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2029&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop'
    ],
    likesCount: 1980
  },
  {
    id: 'adventure-pinboard',
    name: '4. Adventure & Outdoor Pinboard',
    subtitle: 'Tablero de Montaña con Insignias de Altitud y Coordenadas GPS',
    category: 'Trekking & Expedición',
    template: 'adventure',
    recommendedTier: 'pro',
    targetTour: 'Vinicunca Montaña de 7 Colores, Ausangate, Salkantay',
    demoSlug: 'salkantay-trek-machu-picchu',
    colorPalette: [
      { name: 'Esmeralda Alpino', hex: '#059669' },
      { name: 'Roca Volcánica', hex: '#1C1917' },
      { name: 'Gris Glaciar', hex: '#F5F5F4' },
      { name: 'Naranja Seguridad', hex: '#EA580C' }
    ],
    tags: ['Altitud msnm', 'Coordenadas GPS', 'Insignias DIRCETUR', 'Outdoor Explorer'],
    description: 'El clásico tablero de Pinterest para amantes del senderismo y la aventura. Cada pin incluye datos técnicos del terreno: altitud máxima, dificultad, horas de marcha y equipo requerido.',
    pinFeatures: [
      'Chips de altitud y dificultad superpuestos en cada foto',
      'Sección de "Logística y Desafíos" con alertas de aclimatación',
      'Ficha técnica interactiva con balón de oxígeno garantizado',
      'Muro de testimonios de montañistas con puntuaciones de 5 estrellas'
    ],
    previewImage: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop'
    ],
    likesCount: 2680
  },
  {
    id: 'andean-craft',
    name: '5. Andean Heritage & Scrapbook',
    subtitle: 'Álbum Artesanal con Sellos Incas y Tonos Terracota',
    category: 'Cultura & Tradición',
    template: 'cultural',
    recommendedTier: 'basic',
    targetTour: 'City Tour Cusco, Valle Sagrado, Qorikancha, Sacsayhuamán',
    demoSlug: 'city-tour-cusco',
    colorPalette: [
      { name: 'Terracota Inca', hex: '#B45309' },
      { name: 'Ocre Andino', hex: '#D97706' },
      { name: 'Piedra Sacsayhuamán', hex: '#292524' },
      { name: 'Marfil Texturado', hex: '#F5F5F0' }
    ],
    tags: ['Sellos de Piedra', 'Texturas de Telar', 'Historia Viva', 'Scrapbook'],
    description: 'Inspirado en los cuadernos de viaje de arqueólogos e historiadores. Presenta las ruinas y templos con sellos gráficos de la chakana inca, texturas de muros megalíticos y tonos cálidos de arcilla.',
    pinFeatures: [
      'Bordes estilizados simulando papel artesanal andino',
      'Fichas de monumentos con explicación de ingeniería incaica',
      'Sellos oficiales de DIRCETUR y Colegio de Licenciados en Turismo',
      'Mesa de soporte cultural directo con arqueólogos colegiados'
    ],
    previewImage: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop'
    ],
    likesCount: 1650
  },
  {
    id: 'luxury-sunset',
    name: '6. Luxury Sunset & Gold Collection',
    subtitle: 'Moodboard Crepuscular VIP en Modo Oscuro con Acentos Dorados',
    category: 'Alta Gama & VIP',
    template: 'premium',
    recommendedTier: 'advance',
    targetTour: 'Machu Picchu Hiram Bingham VIP, Vuelos en Helicóptero, Glamping',
    demoSlug: 'machu-picchu-luxury-vip',
    colorPalette: [
      { name: 'Negro Azabache', hex: '#0A0A0A' },
      { name: 'Oro Imperial', hex: '#F59E0B' },
      { name: 'Champán', hex: '#FDE68A' },
      { name: 'Gris Carbón', hex: '#262626' }
    ],
    tags: ['Dark Mode Luxury', 'Detalles en Oro', 'Fotos a Contraluz', 'Atención VIP'],
    description: 'Inspiración de los pines de lujo y viajes exclusivos de Pinterest. Fondo oscuro mate que hace resaltar las fotografías doradas del atardecer en Machu Picchu, tipografía de alta costura y cotizador privado.',
    pinFeatures: [
      'Marcos con resplandor dorado sutil (glow effect)',
      'Galería fotográfica HD de 8+ imágenes en formato masonry crepuscular',
      'Modal de cotización para grupos privados y familias VIP',
      'Preguntas Frecuentes y Asistencia personalizada con guía anfitrión'
    ],
    previewImage: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2029&auto=format&fit=crop'
    ],
    likesCount: 3150
  },
  {
    id: 'minimalist-polaroid',
    name: '7. Minimalist Polaroid Wall',
    subtitle: 'Mural Limpio con Postales Analógicas y Enfoque Directo',
    category: 'Minimalista Urbano',
    template: 'boho-nature',
    recommendedTier: 'free',
    targetTour: 'Free Walking Tours, Rutas de Café y Pisco, Tours de 2 Horas',
    demoSlug: 'free-walking-tour-cusco',
    colorPalette: [
      { name: 'Blanco Lino', hex: '#FDFBF7' },
      { name: 'Pizarra', hex: '#334155' },
      { name: 'Verde WhatsApp', hex: '#25D366' },
      { name: 'Gris Perla', hex: '#E2E8F0' }
    ],
    tags: ['Minimalista', 'Carga Instantánea', 'Free Tour', 'Mobile-First'],
    description: 'Estilo fresco y limpio que simula una pared de fotos polaroids en el lobby de un hostel o café de San Blas. Máxima velocidad de carga pensada para captar reservas inmediatas por WhatsApp.',
    pinFeatures: [
      '1 a 2 fotos polaroids de gran impacto con fecha y hora grabadas',
      'Botón gigante directo a WhatsApp del guía local',
      'Píldoras rápidas de dudas comunes (punto de encuentro, propinas)',
      'Diseño ultra liviano ideal para conexiones móviles 4G lentas'
    ],
    previewImage: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=2074&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop'
    ],
    likesCount: 1270
  }
];

export default function PinterestGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [likes, setLikes] = useState<{ [key: string]: number }>(
    PINTEREST_DESIGNS.reduce((acc, d) => ({ ...acc, [d.id]: d.likesCount }), {})
  );
  const [userLiked, setUserLiked] = useState<{ [key: string]: boolean }>({});
  const [showLiveModal, setShowLiveModal] = useState(false);

  const categories = [
    'all', 
    'Alta Conversión & Portal Oficial',
    'Editorial & Storytelling', 
    'Vogue Travel Style', 
    'Trekking & Expedición', 
    'Cultura & Tradición', 
    'Alta Gama & VIP', 
    'Minimalista Urbano'
  ];

  const filteredDesigns = selectedCategory === 'all' 
    ? PINTEREST_DESIGNS 
    : PINTEREST_DESIGNS.filter(d => d.category === selectedCategory);

  const handleLike = (id: string) => {
    if (userLiked[id]) {
      setUserLiked(prev => ({ ...prev, [id]: false }));
      setLikes(prev => ({ ...prev, [id]: prev[id] - 1 }));
    } else {
      setUserLiked(prev => ({ ...prev, [id]: true }));
      setLikes(prev => ({ ...prev, [id]: prev[id] + 1 }));
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-10 selection:bg-[#FF5500] selection:text-white animate-in fade-in duration-300">
      
      {/* 1. TOP HERO BANNER */}
      <div className="bg-gradient-to-br from-[#1C1917] via-stone-900 to-[#2A231F] rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-stone-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5500]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5500]/20 text-[#FF8844] text-xs font-black uppercase tracking-wider backdrop-blur-md border border-[#FF5500]/40">
            <Flame size={14} className="text-[#FF5500]" />
            <span>Catálogo Visual Pinterest • Arquetipos Oficiales 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Diseños de Inspiración <span className="text-[#FF5500]">Pinterest</span>
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
            Colección curada de <strong>7 arquetipos visuales</strong> inspirados en las tendencias con mayor número de guardados en Pinterest para turismo andino. Encabezando la lista se encuentra el <strong>Diseño #1: Portal Oficial de Agencia Perú (Vinicunca Orange)</strong>, completamente maquetado en código listo para tus landings.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 text-stone-200 border border-white/10">
              <Flame size={14} className="text-[#FF5500]" /> Opción #1 Destacada (Portal Oficial)
            </span>
            <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 text-stone-200 border border-white/10">
              <Layers size={14} /> 7 Diseños Adaptables
            </span>
            <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 text-stone-200 border border-white/10">
              <ShieldCheck size={14} className="text-emerald-400" /> Plantilla Guardada en Código
            </span>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#FF5500] text-white shadow-md shadow-[#FF5500]/30'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat === 'all' ? 'Ver Todos (7 Diseños)' : cat}
          </button>
        ))}
      </div>

      {/* 3. SHOWCASE OF DESIGNS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDesigns.map((design, index) => {
          const isLiked = userLiked[design.id];
          const currentLikes = likes[design.id];
          const isFirstOption = design.id === 'peru-portal-agency';

          return (
            <div
              key={design.id}
              className={`bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 ${
                isFirstOption 
                  ? 'border-[#FF5500] shadow-xl ring-2 ring-[#FF5500]/30 md:col-span-2 lg:col-span-3' 
                  : 'border-slate-200/90 shadow-sm hover:shadow-xl'
              }`}
            >
              <div>
                {/* Header Badge for Option 1 */}
                {isFirstOption && (
                  <div className="bg-[#FF5500] text-white py-2 px-6 flex flex-wrap items-center justify-between text-xs font-black uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Crown size={16} />
                      <span>Opción #1 Principal • Diseño Analizado de la Imagen (Plantilla Guardada)</span>
                    </div>
                    <span className="bg-black/20 px-2 py-0.5 rounded text-[10px]">
                      Máxima Conversión 2026
                    </span>
                  </div>
                )}

                {/* Photo Preview Frame */}
                <div className={`relative w-full bg-slate-900 overflow-hidden ${isFirstOption ? 'h-80 sm:h-96' : 'h-64 sm:h-72'}`}>
                  <Image
                    src={design.previewImage}
                    alt={design.name}
                    fill
                    sizes={isFirstOption ? '100vw' : '(max-width: 768px) 100vw, 33vw'}
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span className="bg-black/70 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
                      <Pin size={12} className="rotate-45 text-[#FF5500]" />
                      {design.category}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleLike(design.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isLiked 
                          ? 'bg-rose-600 text-white' 
                          : 'bg-black/70 text-white hover:bg-rose-600'
                      }`}
                    >
                      <Heart size={13} fill={isLiked ? 'currentColor' : 'none'} />
                      <span>{currentLikes}</span>
                    </button>
                  </div>

                  {/* Bottom Image Details */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-1">
                    <h3 className={`font-black tracking-tight leading-snug drop-shadow-md ${isFirstOption ? 'text-2xl sm:text-3xl text-white' : 'text-xl'}`}>
                      {design.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-200 line-clamp-2 font-light opacity-95">
                      {design.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Content */}
                <div className={`p-6 space-y-5 ${isFirstOption ? 'bg-stone-50/50' : ''}`}>
                  
                  {/* Color Palette Swatches */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      Paleta de Color Pinterest:
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                      {design.colorPalette.map((col, i) => (
                        <div key={i} className="flex items-center gap-1.5" title={`${col.name} (${col.hex})`}>
                          <span 
                            className="w-5 h-5 rounded-full border border-slate-300 shadow-2xs block shrink-0" 
                            style={{ backgroundColor: col.hex }}
                          />
                          <span className="text-[11px] font-semibold text-slate-700">{col.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {design.description}
                  </p>

                  {/* Pin Features Checklist */}
                  <div className="pt-2 border-t border-slate-200/80 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                      Componentes del diseño incluidos:
                    </span>
                    <ul className={`grid gap-1.5 text-xs text-slate-700 ${isFirstOption ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                      {design.pinFeatures.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 size={15} className="text-[#FF5500] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mini Gallery Snippet for Option 1 */}
                  {isFirstOption && (
                    <div className="pt-3 border-t border-slate-200 space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                        Vistas y Secciones del Portal:
                      </span>
                      <div className="grid grid-cols-3 gap-3">
                        {design.gridSampleImages.map((img, idx) => (
                          <div key={idx} className="relative h-24 rounded-xl overflow-hidden shadow-xs border border-stone-200">
                            <Image src={img} alt="Sección de tour" fill className="object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {design.tags.map((t, i) => (
                      <span key={i} className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2.5 py-0.5 rounded-md">
                        #{t}
                      </span>
                    ))}
                  </div>

                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-2 grid grid-cols-2 gap-3">
                <Link
                  href={`/demo/preview?slug=${design.demoSlug}`}
                  className="py-3 px-3 rounded-xl border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Eye size={14} />
                  <span>Ver Previsualización</span>
                </Link>

                <Link
                  href={`/demo/new?tier=${design.recommendedTier}&template=${design.template}`}
                  className={`py-3 px-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer ${
                    isFirstOption
                      ? 'bg-[#FF5500] hover:bg-[#E04B00] shadow-[#FF5500]/30'
                      : 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/20'
                  }`}
                >
                  <span>Crear con esta Plantilla</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

            </div>
          );
        })}
      </div>

      {/* 4. CODE REPOSITORY & STORAGE NOTICE (SAFE FOR FUTURE PHASES) */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-black text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={16} />
            <span>Diseño Guardado en Código Fuente</span>
          </div>
          <h3 className="font-black text-lg sm:text-xl text-white">
            Componente Reutilizable: <code className="text-emerald-400 text-sm font-mono bg-black/40 px-2 py-1 rounded">src/templates/AgencyPortalTemplate.tsx</code>
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 max-w-2xl leading-relaxed">
            El código completo del portal (Hero Vinicunca, barra de métricas, grid de 6 tours, sección de guías oficiales, acordéon de FAQs y sellos DIRCETUR) está respaldado como componente modular. Podrá conectarse directamente en la <strong>Fase de Base de Datos y APIs</strong>.
          </p>
        </div>

        <Link
          href="/demo/new"
          className="bg-[#FF5500] hover:bg-[#E04B00] text-white px-7 py-4 rounded-2xl font-black text-xs transition-all shadow-lg shadow-[#FF5500]/40 shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <Sparkles size={16} />
          <span>Generar Nueva Landing</span>
        </Link>
      </div>

    </div>
  );
}
