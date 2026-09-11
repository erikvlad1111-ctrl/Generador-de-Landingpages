'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Pin, 
  Sparkles, 
  Eye, 
  ArrowRight, 
  ExternalLink, 
  Heart, 
  Camera, 
  Layers, 
  Palette, 
  Compass, 
  CheckCircle2,
  Bookmark,
  Share2
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
}

const PINTEREST_DESIGNS: PinterestDesign[] = [
  {
    id: 'boho-journal',
    name: 'Boho Travel Journal',
    subtitle: 'Bitácora de Viajes con Polaroids y Cinta Washi',
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
    likesCount: 1420
  },
  {
    id: 'editorial-magazine',
    name: 'Editorial Magazine & Moodboard',
    subtitle: 'Revista de Alta Gama con Collage Asimétrico',
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
    likesCount: 984
  },
  {
    id: 'adventure-pinboard',
    name: 'Adventure & Outdoor Pinboard',
    subtitle: 'Tablero de Montaña con Insignias de Altitud y Coordenadas',
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
    likesCount: 1680
  },
  {
    id: 'andean-craft',
    name: 'Andean Heritage & Scrapbook',
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
    likesCount: 1150
  },
  {
    id: 'luxury-sunset',
    name: 'Luxury Sunset & Gold Collection',
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
    likesCount: 2150
  },
  {
    id: 'minimalist-polaroid',
    name: 'Minimalist Polaroid Wall',
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
    likesCount: 870
  }
];

export default function PinterestGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [likes, setLikes] = useState<{ [key: string]: number }>(
    PINTEREST_DESIGNS.reduce((acc, d) => ({ ...acc, [d.id]: d.likesCount }), {})
  );
  const [userLiked, setUserLiked] = useState<{ [key: string]: boolean }>({});

  const categories = ['all', 'Editorial & Storytelling', 'Vogue Travel Style', 'Trekking & Expedición', 'Cultura & Tradición', 'Alta Gama & VIP', 'Minimalista Urbano'];

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
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-10 selection:bg-red-500 selection:text-white animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-red-600 via-rose-700 to-amber-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-md">
            <Pin size={14} className="rotate-45" />
            <span>Catálogo Visual Oficial • 6 Arquetipos de Pinterest</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Diseños de Inspiración Pinterest
          </h1>

          <p className="text-sm sm:text-base text-rose-100 leading-relaxed font-normal">
            Aquí tienes los <strong>6 diseños y tableros visuales</strong> inspirados en las tendencias más virales de Pinterest para turismo andino. Cada diseño está completamente integrado con el generador y se adapta a los planes <strong>Gratuito, Básico, Pro y Advance</strong>.
          </p>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
              <Layers size={14} /> 6 Plantillas Estilizadas
            </span>
            <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
              <Palette size={14} /> 24 Paletas de Color
            </span>
            <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
              <Camera size={14} /> Tableros Masonry Polaroids
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat === 'all' ? 'Ver Todos (6 Diseños)' : cat}
          </button>
        ))}
      </div>

      {/* Grid of 6 Pinterest Designs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDesigns.map((design) => {
          const isLiked = userLiked[design.id];
          const currentLikes = likes[design.id];

          return (
            <div
              key={design.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              <div>
                {/* Photo Preview Frame (Pinterest Style) */}
                <div className="relative h-64 sm:h-72 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={design.previewImage}
                    alt={design.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                      <Pin size={11} className="rotate-45 text-red-400" />
                      {design.category}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleLike(design.id)}
                      className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isLiked 
                          ? 'bg-rose-600 text-white' 
                          : 'bg-black/60 text-white hover:bg-rose-600'
                      }`}
                    >
                      <Heart size={12} fill={isLiked ? 'currentColor' : 'none'} />
                      <span>{currentLikes}</span>
                    </button>
                  </div>

                  {/* Bottom Image Details */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 text-white">
                    <h3 className="text-xl font-black tracking-tight leading-snug drop-shadow-md">
                      {design.name}
                    </h3>
                    <p className="text-xs text-slate-200 line-clamp-1 font-light opacity-90">
                      {design.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Content & Features */}
                <div className="p-6 space-y-4">
                  
                  {/* Color Palette Swatches */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      Paleta de Color Pinterest:
                    </span>
                    <div className="flex items-center gap-2">
                      {design.colorPalette.map((col, i) => (
                        <div key={i} className="flex items-center gap-1.5" title={`${col.name} (${col.hex})`}>
                          <span 
                            className="w-5 h-5 rounded-full border border-slate-300 shadow-2xs block shrink-0" 
                            style={{ backgroundColor: col.hex }}
                          />
                          <span className="text-[10px] text-slate-500 hidden sm:inline">{col.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {design.description}
                  </p>

                  {/* Key Pin Features */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                      Elementos visuales incluidos:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {design.pinFeatures.map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px]">
                          <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

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
              <div className="p-6 pt-0 border-t border-slate-100 mt-2 grid grid-cols-2 gap-2.5">
                <Link
                  href={`/demo/preview?slug=${design.demoSlug}`}
                  className="py-2.5 px-3 rounded-xl border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Eye size={13} />
                  <span>Ver Demo</span>
                </Link>

                <Link
                  href={`/demo/new?tier=${design.recommendedTier}`}
                  className="py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm shadow-red-600/30 cursor-pointer"
                >
                  <span>Crear Landing</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

            </div>
          );
        })}
      </div>

      {/* Guide Banner for Creators */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="font-extrabold text-lg text-slate-900">
            ¿Cómo se aplican estos diseños en cada página generada?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Al pulsar <strong>&quot;Crear Landing&quot;</strong> o desde el menú <strong>&quot;Nueva Landing&quot;</strong>, puedes seleccionar la plantilla correspondiente (Boho Journal, Aventura, Cultural o Premium). Todas incluyen el componente de <strong>Tablero de Pines Pinterest</strong> y la <strong>Mesa de Soporte & FAQs</strong> automáticamente.
          </p>
        </div>

        <Link
          href="/demo/new"
          className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-2xl font-black text-xs transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <Sparkles size={16} className="text-amber-400" />
          <span>Ir al Generador con IA</span>
        </Link>
      </div>

    </div>
  );
}
