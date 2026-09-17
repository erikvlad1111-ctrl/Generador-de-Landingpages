'use client';

import React, { useState, useMemo } from 'react';
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
  Award,
  Globe2,
  MessageCircle,
  LayoutTemplate,
  Flame,
  Crown,
  Type,
  Target,
  Zap,
  Check,
  Copy,
  Search,
  Filter,
  SlidersHorizontal,
  TrendingUp,
  Users,
  Briefcase
} from 'lucide-react';
import { TemplateType, PlanTier } from '@/types/landing';

export interface ColorDetail {
  name: string;
  hex: string;
  role: string;
}

export interface TypographyDetail {
  headingFont: string;
  bodyFont: string;
  category: string;
  sampleTitle: string;
  hierarchyNotes: string;
}

export interface StyleDetail {
  aestheticName: string;
  description: string;
  layoutPattern: string;
  spacingAndBorders: string;
  visualElements: string[];
  microInteractions: string;
}

export interface BenefitDetail {
  title: string;
  description: string;
  badge?: string;
}

export interface LandingDesign {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  template: TemplateType;
  recommendedTier: PlanTier;
  targetTour: string;
  demoSlug: string;
  isFeatured?: boolean;
  isPortalOption?: boolean;
  likesCount: number;
  previewImage: string;
  gridSampleImages: string[];
  tags: string[];
  targetAudience: string;
  conversionImpact: string;
  
  // Especificaciones Detalladas Requeridas:
  benefits: BenefitDetail[];
  colorPalette: ColorDetail[];
  typography: TypographyDetail;
  style: StyleDetail;
  includedComponents: string[];
}

const AVAILABLE_DESIGNS: LandingDesign[] = [
  {
    id: 'peru-portal-agency',
    name: '1. Portal Oficial de Agencia Perú (Vinicunca Orange)',
    subtitle: 'El diseño viral #1: Alta conversión con acentos naranja, métricas de confianza, FAQ y sellos DIRCETUR',
    category: 'Alta Conversión & Portal Oficial',
    template: 'agency-portal',
    recommendedTier: 'advance',
    targetTour: 'Vinicunca 7 Colores, Paquetes Multidía, Circuitos Cusco & Valle Sagrado',
    demoSlug: 'machu-picchu-vip',
    isFeatured: true,
    isPortalOption: true,
    likesCount: 3840,
    previewImage: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop'
    ],
    tags: ['Hero Vinicunca', 'Botones Naranjas', 'Sellos DIRCETUR', 'Widget Reviews', 'Alta Conversión'],
    targetAudience: 'Agencias de viajes registradas, operadores receptivos y agencias que invierten en Meta Ads o Google Ads buscando el máximo retorno.',
    conversionImpact: '+42% en tasa de contacto calificado y cierre de reservas multidía',
    benefits: [
      {
        title: 'Aumento Radical en Conversión (+42%)',
        description: 'Estructura psicológica probada: Hero imponente, barra social de viajeros, tours en USD y llamado a la acción visible sin hacer scroll.',
        badge: 'Top Conversión'
      },
      {
        title: 'Blindaje de Confianza & Anti-Fraude',
        description: 'Módulo de credenciales oficiales: RUC 20 formal, sellos Safe Travels, licencia DIRCETUR y botiquín de altura garantizado.',
        badge: 'Confianza 100%'
      },
      {
        title: 'Filtro de Clientes con Preguntas Frecuentes (FAQ)',
        description: 'Acordeón interactivo con las 8 dudas críticas (aclimatación, equipaje, cancelaciones) que ahorra hasta 2 horas diarias de chat al equipo de ventas.',
        badge: 'Ahorro de Tiempo'
      },
      {
        title: 'Diseño Optimizado para Campañas Publicitarias',
        description: 'Carga instantánea en smartphones y botón flotante de WhatsApp listo con mensaje predeterminado del tour.',
        badge: 'Ads Ready'
      }
    ],
    colorPalette: [
      { name: 'Naranja Fuego', hex: '#FF5500', role: 'Acento de conversión, botones CTA primarios y urgencia comercial' },
      { name: 'Carbón Andino', hex: '#1C1917', role: 'Fondos oscuros de alto contraste, titulares y barra de autoridad' },
      { name: 'Crema Arena', hex: '#F9F7F4', role: 'Fondo de secciones alternadas que suaviza la lectura' },
      { name: 'Verde Safe Travels', hex: '#10B981', role: 'Insignias de seguridad turística y verificación oficial' }
    ],
    typography: {
      headingFont: 'Plus Jakarta Sans (ExtraBold 800)',
      bodyFont: 'Inter (Regular 400 / Medium 500)',
      category: 'Sans-Serif Geométrica Moderna',
      sampleTitle: 'DESCUBRE LA MAGIA DE LOS ANDES CON GUÍAS OFICIALES',
      hierarchyNotes: 'Titulares en mayúsculas compactas con tracking negativo (-0.02em) para impacto monumental, contrastado con cuerpo de texto ultra legible en pantallas pequeñas.'
    },
    style: {
      aestheticName: 'Corporate High-Conversion Neobrutalism Suave',
      description: 'Líneas limpias, sombras sólidas de baja dispersión, contrastes potentes entre naranja y negro carbón, con esquinas redondeadas de 24px que transmiten modernidad.',
      layoutPattern: 'Hero panorámico full-width + Barra de métricas 3 columnas + Grid de tours destacados + Banner de urgencia',
      spacingAndBorders: 'Bordes redondeados de 24px (rounded-3xl), bordes sutiles de 1px en slate-200 y elevación en hover.',
      visualElements: ['Chips de estrellas ★ TripAdvisor', 'Badges de certificación oficial DIRCETUR', 'Acordeón animado FAQ', 'Contador de viajeros satisfechos'],
      microInteractions: 'Botón CTA con pulso sutil de atención, hover con elevación en tarjetas de tours y transición fluida en respuestas desplegables.'
    },
    includedComponents: [
      'Hero imponente con imagen panorámica y badge oficial',
      'Barra de métricas (+10,000 viajeros, 10+ años, 4.9★)',
      'Grid de 6 tours con precios en USD y botón de reserva rápida',
      'Sección de seguridad: RUC, oxígeno y guías bilingües colegiados',
      'Testimonios con fotos reales y badge de TripAdvisor',
      'Acordeón interactivo de Preguntas Frecuentes',
      'Banner de llamado a la acción gigante con botón WhatsApp directo'
    ]
  },
  {
    id: 'boho-journal',
    name: '2. Boho Travel Journal & Polaroids',
    subtitle: 'Bitácora de Viajes con Fotos Polaroids Inclinadas y Cinta Washi Adhesiva',
    category: 'Editorial & Storytelling',
    template: 'boho-nature',
    recommendedTier: 'advance',
    targetTour: 'Laguna Humantay, Salineras de Maras, Rutas Fotográficas en Cusco',
    demoSlug: 'laguna-humantay-boho',
    likesCount: 2420,
    previewImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop'
    ],
    tags: ['Polaroids Inclinadas', 'Washi Tape', 'Notas de Campo', 'Pinterest Masonry'],
    targetAudience: 'Turistas jóvenes, parejas, fotógrafos, nómadas digitales y creadores de contenido que buscan experiencias estéticas e instagrameables.',
    conversionImpact: '+65% en retención visual y mayor tasa de guardados en redes sociales',
    benefits: [
      {
        title: 'Storytelling Visual que Conecta Emocionalmente',
        description: 'La composición simula el diario de viaje de un explorador real, generando deseo genuino e inspiración antes de comprar.',
        badge: 'Viral en Redes'
      },
      {
        title: 'Mayor Tiempo de Permanencia (+65%)',
        description: 'El formato de polaroids con notas manuscritas invita a recorrer cada fotografía con atención y detenerse en el itinerario.',
        badge: 'Alta Retención'
      },
      {
        title: 'Diferenciación Total frente a la Competencia',
        description: 'Rompe con las páginas turísticas aburridas de plantillas genéricas; posiciona a la agencia como un curador de experiencias exclusivas.',
        badge: 'Identidad Única'
      },
      {
        title: 'Sección Pinboard Interactiva',
        description: 'Galería fotográfica estilo Pinterest con contador de likes simulado y etiquetas de campo del guía.',
        badge: 'Pinboard Style'
      }
    ],
    colorPalette: [
      { name: 'Arena Cálida', hex: '#FAF7F2', role: 'Fondo suave estilo papel de acuarela o bitácora de campo' },
      { name: 'Terracota Boho', hex: '#C86D51', role: 'Tono cálido primario para sellos, enlaces y acentos' },
      { name: 'Verde Eucalipto', hex: '#588157', role: 'Símbolo de naturaleza, lagunas y sostenibilidad andina' },
      { name: 'Cinta Washi', hex: '#E8DEC8', role: 'Detalle gráfico semitransparente que sujeta las polaroids' }
    ],
    typography: {
      headingFont: 'Playfair Display (Serif Elegante)',
      bodyFont: 'Plus Jakarta Sans (Limpio & Orgánico)',
      category: 'Serif Editorial + Sans-Serif Cálida',
      sampleTitle: 'Diario de Ruta: Laguna Humantay & Valles Glaciares',
      hierarchyNotes: 'Titulares en Serif clásica con cursivas románticas para notas de campo ("Notas del Guía"), equilibrado con tipografía de lectura clara en datos de ruta.'
    },
    style: {
      aestheticName: 'Bohemian Travel Scrapbook & Washi Tape',
      description: 'Atmósfera nostálgica y artesanal inspirada en cuadernos Moleskine y tableros virales de Pinterest, con polaroids rotadas ligeramente (-1° a 2°).',
      layoutPattern: 'Hero collage editorial + Muro de polaroids masonry + Itinerario como diario cronológico con sellos',
      spacingAndBorders: 'Efecto de papel con esquinas suaves, cinta washi tape semiopaca superpuesta en la parte superior de cada foto.',
      visualElements: ['Polaroids con marcos blancos amplios', 'Cinta washi adhesiva', 'Sellos postales andinos', 'Iconos de cámara análoga'],
      microInteractions: 'Efecto de enderezado y elevación al pasar el ratón sobre cada foto polaroid, botón "Guardar Experiencia".'
    },
    includedComponents: [
      'Hero con collage asimétrico de polaroids y cinta washi',
      'Ficha de la ruta con altitud, clima y duración escrita a mano',
      'Itinerario tipo diario de campo con horas exactas y recomendaciones',
      'Muro Pinterest Pinboard con selector de etiquetas',
      'Módulo "¿Qué llevar en tu mochila?" con ilustraciones y checklist',
      'Botón flotante de WhatsApp en color terracota orgánico'
    ]
  },
  {
    id: 'editorial-magazine',
    name: '3. Editorial Magazine & Moodboard',
    subtitle: 'Revista de Alta Gama con Collage Asimétrico, Espacio Negativo y Tipografía Serif',
    category: 'Vogue Travel Style',
    template: 'boho-nature',
    recommendedTier: 'pro',
    targetTour: 'Valle Sagrado de los Incas, Rutas Gastronómicas y Cafés de Altura',
    demoSlug: 'machu-picchu-vip',
    likesCount: 1980,
    previewImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2029&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop'
    ],
    tags: ['Tipografía Serif', 'Collage Editorial', 'Citas Célebres', 'Filtro Mate'],
    targetAudience: 'Viajeros culturales exigentes, amantes de la gastronomía, la arquitectura y el diseño; público norteamericano y europeo de alto ticket.',
    conversionImpact: '+35% en percepción de valor permitiendo subir precios de tours hasta un 25%',
    benefits: [
      {
        title: 'Elevación Instantánea del Ticket Promedio',
        description: 'La estética de revistas internacionales como Kinfolk o Condé Nast Traveler justifica precios superiores sin resistencia.',
        badge: 'Ticket Alto'
      },
      {
        title: 'Sofisticación Visual con Espacio Negativo',
        description: 'Composiciones respirables y tipografía refinada que transmiten serenidad, calma y exclusividad.',
        badge: 'Lujo Silencioso'
      },
      {
        title: 'Citas y Testimonios en Estilo Reseña Editorial',
        description: 'Bloques de testimonios con formato de crítica de revista turística de prestigio.',
        badge: 'Autoridad'
      },
      {
        title: 'Composición Asimétrica de Vanguardia',
        description: 'Disposición de fotografías a diferente escala que capta la mirada de forma dinámica y artística.',
        badge: 'Diseño Vogue'
      }
    ],
    colorPalette: [
      { name: 'Blanco Nieve', hex: '#FFFFFF', role: 'Espacios negativos amplios que aportan aire y modernidad' },
      { name: 'Tierra Arcillosa', hex: '#9C583F', role: 'Acento terroso elegante para titulares y llamados suaves' },
      { name: 'Gris Editorial', hex: '#44403C', role: 'Texto oscuro de alta legibilidad y sutileza visual' },
      { name: 'Dorado Suave', hex: '#D4AF37', role: 'Detalles mínimos de orfebrería y sellos de calidad' }
    ],
    typography: {
      headingFont: 'Cormorant Garamond / Playfair (Serif)',
      bodyFont: 'Inter (Ligero & Espaciado)',
      category: 'Serif Clásica de Lujo + Sans-Serif Minimalista',
      sampleTitle: 'EL VALLE SAGRADO: UN VIAJE A TRAVÉS DE LOS SENTIDOS',
      hierarchyNotes: 'Títulos principales en mayúsculas espaciadas (tracking +0.15em) con sutileza aristocrática, acompañados de epígrafes en cursiva.'
    },
    style: {
      aestheticName: 'Kinfolk & Condé Nast Editorial Minimalism',
      description: 'Inspirado en publicaciones de alta costura y viajes de autor. Enfoque en la belleza plástica de los paisajes andinos sin estridencias.',
      layoutPattern: 'Cuadrícula asimétrica 2:1 + Citas destacadas a columna completa + Galería con proporciones doradas',
      spacingAndBorders: 'Márgenes generosos (padding amplio), bordes limpios sin sombras pesadas, filtros de fotografía con grano sutil.',
      visualElements: ['Líneas divisorias ultrafinas (0.5px)', 'Citas entrecomilladas gigantes', 'Numeración romana de capítulos', 'Filtro desaturado cálido'],
      microInteractions: 'Transiciones ultra suaves al hacer hover, desvanecimiento delicado en imágenes y botones con subrayado animado.'
    },
    includedComponents: [
      'Portada estilo revista con titular principal y subtítulo poético',
      'Manifiesto de la experiencia y filosofía de viaje consciente',
      'Itinerario estructurado como capítulos de libro (Capítulo I, II, III)',
      'Galería fotográfica con pies de foto explicativos de arte y gastronomía',
      'Módulo de reservación VIP con solicitud de concierge privado'
    ]
  },
  {
    id: 'adventure-pinboard',
    name: '4. Adventure & Outdoor Pinboard',
    subtitle: 'Tablero Técnico de Montaña con Insignias de Altitud msnm, Dificultad y Coordenadas GPS',
    category: 'Trekking & Expedición',
    template: 'adventure',
    recommendedTier: 'pro',
    targetTour: 'Salkantay Trek, Ausangate Circuit, Choquequirao, Rutas de Alta Montaña',
    demoSlug: 'salkantay-trek',
    likesCount: 2680,
    previewImage: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop'
    ],
    tags: ['Altitud msnm', 'Coordenadas GPS', 'Insignias DIRCETUR', 'Outdoor Explorer'],
    targetAudience: 'Trekkeros, senderistas, montañistas, amantes del camping y la adrenalina que necesitan certezas sobre seguridad física y equipo.',
    conversionImpact: '+50% en conversión de rutas de exigencia física gracias a la claridad técnica',
    benefits: [
      {
        title: 'Transparencia Técnica que Genera Seguridad',
        description: 'Muestra altitud máxima (ej. 4,630 msnm), dificultad física, distancia en km y horas de caminata por día, resolviendo los miedos del viajero.',
        badge: 'Seguridad'
      },
      {
        title: 'Respaldo Médico & Equipamiento Incluido',
        description: 'Destaca de inmediato la disponibilidad de balón de oxígeno, botiquín de primeros auxilios y caballos de apoyo.',
        badge: 'Paz Mental'
      },
      {
        title: 'Checklist de Equipamiento Técnico Interactivo',
        description: 'Lista categorizada de qué ropa llevar (capas térmicas, botas de trekking, pastillas para el soroche).',
        badge: 'Equipamiento'
      },
      {
        title: 'Testimonios Reales de Montañistas',
        description: 'Opiniones con origen del viajero, nivel de condición física y recomendaciones de aclimatación.',
        badge: 'Social Proof'
      }
    ],
    colorPalette: [
      { name: 'Esmeralda Alpino', hex: '#059669', role: 'Tono principal de naturaleza, bosques y valles andinos' },
      { name: 'Roca Volcánica', hex: '#1C1917', role: 'Fondo de alto impacto y texto para atmósfera outdoor' },
      { name: 'Gris Glaciar', hex: '#F5F5F4', role: 'Fondos técnicos y módulos de datos climáticos' },
      { name: 'Naranja Seguridad', hex: '#EA580C', role: 'Puntos críticos de ruta, alertas técnicas y CTA' }
    ],
    typography: {
      headingFont: 'Montserrat (ExtraBold 700/800)',
      bodyFont: 'Inter & Roboto Mono (Datos Numéricos)',
      category: 'Sans-Serif Industrial & Numeral Mono',
      sampleTitle: 'SALKANTAY TREK 5 DÍAS • PASO GLACIAR 4,630 MSNM',
      hierarchyNotes: 'Tipografía contundente e imponente para encabezados; los datos de altitud y clima utilizan tipografía monoespaciada con look de instrumentos de montaña.'
    },
    style: {
      aestheticName: 'Alpine Technical HUD & Mountain Field Guide',
      description: 'Inspirado en marcas outdoor como Arc’teryx, The North Face y Garmin. Diseño robusto, funcional y lleno de datos confiables.',
      layoutPattern: 'Hero con HUD técnico superpuesto + Ficha de elevación y mapa + Muro de fotos con chips de GPS',
      spacingAndBorders: 'Bordes reforzados, tarjetas compactas con badges de dificultad (Moderada / Desafiante), acentos de señalética de senderos.',
      visualElements: ['Chips con iconos de brújula y altímetro', 'Insignias de aclimatación recomendada', 'Iconografía técnica de montaña', 'Marcadores de sendero'],
      microInteractions: 'Animación en la barra de progreso del itinerario por días, hover dinámico sobre mapas e insignias técnicas.'
    },
    includedComponents: [
      'Hero con altitud máxima y chip de dificultad destacado',
      'Panel técnico de ruta (km totales, horas por día, desniveles)',
      'Sección de seguridad médica y protocolo de aclimatación',
      'Itinerario paso a paso con campamentos y comidas incluidas',
      'Checklist interactivo de equipaje para trekking',
      'Botón de reserva con selector de fecha de salida'
    ]
  },
  {
    id: 'andean-craft',
    name: '5. Andean Heritage & Scrapbook',
    subtitle: 'Álbum Artesanal con Sellos Incas, Texturas Terracota e Historia Viva',
    category: 'Cultura & Tradición',
    template: 'cultural',
    recommendedTier: 'basic',
    targetTour: 'City Tour Cusco, Qorikancha, Sacsayhuamán, Maras & Moray, Rutas de Museos',
    demoSlug: 'city-tour-cusco',
    likesCount: 1650,
    previewImage: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop'
    ],
    tags: ['Sellos de Piedra', 'Texturas de Telar', 'Historia Viva', 'Scrapbook'],
    targetAudience: 'Familias, historiadores, amantes de la arqueología, la arquitectura colonial y las tradiciones comunitarias que valoran guías con títulos universitarios.',
    conversionImpact: '+40% en reservas directas de City Tour y paquetes arqueológicos',
    benefits: [
      {
        title: 'Posicionamiento Arqueológico y Académico',
        description: 'Diferencia a la agencia destacando guías licenciados en turismo y colegiados por el Colegio de Licenciados de Cusco.',
        badge: 'Guías Colegiados'
      },
      {
        title: 'Calidez Cultural & Conexión Histórica',
        description: 'Colores de arcilla y motivos textiles incas que envuelven al visitante en la cosmovisión andina.',
        badge: 'Cosmovisión'
      },
      {
        title: 'Explicación Clara del Boleto Turístico',
        description: 'Aclara qué ingresos incluye el boleto (BTC) y cuáles se pagan aparte para evitar sorpresas o quejas.',
        badge: 'Cero Sorpresas'
      },
      {
        title: 'Ideal para Tours Clásicos de Alta Rotación',
        description: 'Estructura ligera pensada para que turistas recién aterrizados reserven su City Tour para esa misma tarde.',
        badge: 'Carga Ligera'
      }
    ],
    colorPalette: [
      { name: 'Terracota Inca', hex: '#B45309', role: 'Color primario inspirado en cerámicas y vasijas incaicas' },
      { name: 'Ocre Andino', hex: '#D97706', role: 'Acento solar representativo del Inti y los solsticios' },
      { name: 'Piedra Sacsayhuamán', hex: '#292524', role: 'Fuerza de los muros megalíticos para textos y títulos' },
      { name: 'Marfil Texturado', hex: '#F5F5F0', role: 'Fondo cálido tipo pergamino o papel artesanal' }
    ],
    typography: {
      headingFont: 'Cinzel / Merriweather (Herencia)',
      bodyFont: 'Plus Jakarta Sans (Legibilidad Moderna)',
      category: 'Serif Monumental & Sans-Serif Humana',
      sampleTitle: 'TEMPLOS SAGRADOS DEL CUSCO & ARQUITECTURA MEGALÍTICA',
      hierarchyNotes: 'Títulos con aire solemne e histórico inspirados en inscripciones lapidarias y arquitectura colonial cusqueña.'
    },
    style: {
      aestheticName: 'Andean Heritage Scrapbook & Megalithic Stone',
      description: 'Combinación de textura de piedra inca pulida, sellos gráficos de la chakana y tonos cálidos de telar andino.',
      layoutPattern: 'Hero con marco de piedra + Fichas arqueológicas por monumento + Módulo de guía anfitrión',
      spacingAndBorders: 'Marcos con sutil relieve, esquinas redondeadas pero firmes, detalles decorativos de grecas andinas.',
      visualElements: ['Sello de la Chakana incaica', 'Fichas de monumentos con datos constructivos', 'Sellos de DIRCETUR y COLITUR', 'Paleta de telar'],
      microInteractions: 'Efecto de revelado suave en fotos de templos y botones que simulan sellado con tinta.'
    },
    includedComponents: [
      'Hero con foto de Sacsayhuamán o Qorikancha y sellos de autenticidad',
      'Desglose del Boleto Turístico del Cusco (qué incluye y qué no)',
      'Perfil y biografía del guía arqueólogo colegiado',
      'Itinerario cronológico de 4 horas con tiempos de traslado',
      'Módulo de dudas sobre altura y vestimenta en iglesias y templos',
      'Botón directo de WhatsApp para coordinar recojo en hotel'
    ]
  },
  {
    id: 'luxury-sunset',
    name: '6. Luxury Sunset & Gold Collection',
    subtitle: 'Moodboard Crepuscular VIP en Modo Oscuro con Acentos de Oro Imperial',
    category: 'Alta Gama & VIP',
    template: 'premium',
    recommendedTier: 'advance',
    targetTour: 'Machu Picchu Hiram Bingham VIP, Vuelos en Helicóptero, Glamping de Lujo',
    demoSlug: 'machu-picchu-vip',
    likesCount: 3150,
    previewImage: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2029&auto=format&fit=crop'
    ],
    tags: ['Dark Mode Luxury', 'Detalles en Oro', 'Fotos a Contraluz', 'Atención VIP'],
    targetAudience: 'Viajeros de ultra lujo, ejecutivos, celebridades, familias que buscan privacidad total y experiencias 5 estrellas sin aglomeraciones.',
    conversionImpact: '+28% en solicitudes de cotizaciones personalizadas de más de $1,000 USD',
    benefits: [
      {
        title: 'Proyección Inmediata de Ultra Lujo y Prestigio',
        description: 'El diseño en modo oscuro con acentos dorados comunica estatus y servicio premium desde el primer segundo.',
        badge: 'Modo VIP'
      },
      {
        title: 'Formulario de Cotización Privada Personalizada',
        description: 'Modal elegante para solicitar itinerarios a medida con selección de hoteles (Belmond, Tambo del Inka) y servicios exclusivos.',
        badge: 'Cotizador VIP'
      },
      {
        title: 'Privilegios y Acceso Preferente',
        description: 'Bloque destacado para vagón de tren Hiram Bingham, traslados en Mercedes-Benz privados y mayordomo personal.',
        badge: 'Exclusividad'
      },
      {
        title: 'Galería Nocturna y Crepuscular de Alto Contraste',
        description: 'Fotografías que resaltan las maravillas andinas en atardeceres y cielos estrellados sobre los picos nevados.',
        badge: 'Glow Dorado'
      }
    ],
    colorPalette: [
      { name: 'Negro Azabache', hex: '#0A0A0A', role: 'Fondo negro profundo mate que elimina distracciones' },
      { name: 'Oro Imperial', hex: '#F59E0B', role: 'Acento metálico para botones de cotización y badges de lujo' },
      { name: 'Champán', hex: '#FDE68A', role: 'Subtítulos y reflejos luminosos elegantes' },
      { name: 'Gris Carbón', hex: '#262626', role: 'Tarjetas flotantes elevadas con bordes de luz tenue' }
    ],
    typography: {
      headingFont: 'Cinzel Decorative / Cormorant',
      bodyFont: 'Plus Jakarta Sans (Light / Regular)',
      category: 'Serif Imperial & Sans-Serif Minimalista',
      sampleTitle: 'HIRAM BINGHAM & SANTUARIO HISTÓRICO EN PRIVADO',
      hierarchyNotes: 'Titulares en tipografía imperial con interlineado generoso y kerning amplio, reflejando el estándar de las cadenas hoteleras más lujosas del mundo.'
    },
    style: {
      aestheticName: 'Dark Mode Ultra Luxury & Golden Glow',
      description: 'Atmósfera cinematográfica crepuscular. Fondo oscuro elegante donde las fotos parecen brillar por sí solas con sutil resplandor dorado.',
      layoutPattern: 'Hero cinematográfico 100vh + Tarjetas de privilegios con glow + Galería en mosaico crepuscular + Cotizador VIP',
      spacingAndBorders: 'Bordes en oro muy fino (border-amber-500/20), sombras profundas con destellos dorados (glow effect).',
      visualElements: ['Bordes con resplandor dorado sutil', 'Corona de servicio VIP', 'Insignia de mayordomo privado', 'Selector de tren de lujo'],
      microInteractions: 'Efecto hover con destello dorado gradual, transiciones sedosas y animaciones sobrias de alta categoría.'
    },
    includedComponents: [
      'Hero cinematográfico de pantalla completa con botón "Solicitar Concierge"',
      'Módulo de privilegios incluidos (Vagón Hiram Bingham, Belmond Lodge)',
      'Galería fotográfica crepuscular de 8+ fotos en alta definición',
      'Asistente personal y anfitrión asignado para el grupo',
      'Modal de cotización para familias y delegaciones diplomáticas',
      'Contacto directo por canal reservado de WhatsApp para clientes VIP'
    ]
  },
  {
    id: 'minimalist-polaroid',
    name: '7. Minimalist Polaroid Wall',
    subtitle: 'Mural Limpio con Postales Analógicas, Carga Instantánea y Enfoque Directo a WhatsApp',
    category: 'Minimalista Urbano',
    template: 'boho-nature',
    recommendedTier: 'free',
    targetTour: 'Free Walking Tours, Rutas de Cafés & Pisco, Experiencias Cortas de 2 Horas',
    demoSlug: 'free-walking-tour-cusco',
    likesCount: 1270,
    previewImage: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=2074&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop'
    ],
    tags: ['Minimalista', 'Carga Instantánea', 'Free Tour', 'Mobile-First'],
    targetAudience: 'Mochileros de albergues y hostales, turistas de paso con tiempo limitado y agencias jóvenes que necesitan captar clientes de forma inmediata.',
    conversionImpact: '+55% en velocidad de conversión: el usuario reserva en menos de 20 segundos',
    benefits: [
      {
        title: 'Velocidad de Carga Relámpago (< 0.8s)',
        description: 'Optimizada al milisegundo para turistas que caminan por la Plaza de Armas con datos móviles 4G lentos o inestables.',
        badge: 'Carga < 0.8s'
      },
      {
        title: 'Cero Fricción para Reservar',
        description: 'Sin formularios largos ni pasos innecesarios: un solo click abre directamente la conversación de WhatsApp con fecha prellenada.',
        badge: '1 Click WhatsApp'
      },
      {
        title: 'Píldoras Informativas Directas',
        description: 'Punto de encuentro claro (ej. Pileta de la Plaza de Armas), horario de salida y política de propinas voluntarias.',
        badge: 'Claridad Total'
      },
      {
        title: 'Disponible desde el Plan Gratuito (Free)',
        description: 'Cualquier guía o agencia emergente puede lanzar esta landing sin inversión inicial en servidores ni desarrollos complejos.',
        badge: 'Plan Free'
      }
    ],
    colorPalette: [
      { name: 'Blanco Lino', hex: '#FDFBF7', role: 'Fondo minimalista ultra liviano que ahorra batería y datos' },
      { name: 'Pizarra', hex: '#334155', role: 'Texto nítido de alto contraste para lectura a pleno sol' },
      { name: 'Verde WhatsApp', hex: '#25D366', role: 'El botón más visible de toda la página para llamada a la acción directa' },
      { name: 'Gris Perla', hex: '#E2E8F0', role: 'Líneas y separadores limpios sin recargar la pantalla' }
    ],
    typography: {
      headingFont: 'Plus Jakarta Sans (Bold 700)',
      bodyFont: 'Inter (Regular 400)',
      category: 'Sans-Serif Funcional & Limpia',
      sampleTitle: 'FREE WALKING TOUR CUSCO HISTÓRICO • SALIDAS 10:00 AM Y 3:00 PM',
      hierarchyNotes: 'Tipografía sin artificios ornamentales, diseñada para la máxima legibilidad y velocidad de escaneo visual en pantallas de teléfonos.'
    },
    style: {
      aestheticName: 'Minimalist Clean & Fast Action Wall',
      description: 'Limpio y directo como el tablón de anuncios de un café bohemio de San Blas. 1 a 2 postales fotográficas de alta calidad y datos al grano.',
      layoutPattern: 'Foto única de alto impacto + Píldoras de información clave + Botón gigante de WhatsApp fijado',
      spacingAndBorders: 'Estructura vertical centrada en móviles, padding balanceado y botones de tamaño táctil cómodo (48px+ de altura).',
      visualElements: ['Marco de postal analógica con fecha impresa', 'Botón verde WhatsApp vibrante', 'Puntos clave con viñetas de verificación'],
      microInteractions: 'Feedback táctil al pulsar el botón de WhatsApp y cambio suave de color en píldoras informativas.'
    },
    includedComponents: [
      'Foto postal representativa del centro histórico con fecha grabada',
      'Puntos de encuentro y horario exacto de concentración',
      'Píldora explicativa de "¿Cómo funciona el Free Tour?"',
      'Testimonios breves de mochileros verificados',
      'Botón gigante con enlace directo al WhatsApp del guía local'
    ]
  }
];

export default function PinterestGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTabByDesign, setActiveTabByDesign] = useState<{ [designId: string]: 'benefits' | 'colors' | 'typography' | 'style' | 'components' }>({});
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const [likes, setLikes] = useState<{ [key: string]: number }>(
    AVAILABLE_DESIGNS.reduce((acc, d) => ({ ...acc, [d.id]: d.likesCount }), {})
  );
  const [userLiked, setUserLiked] = useState<{ [key: string]: boolean }>({});

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

  const tiers = ['all', 'advance', 'pro', 'basic', 'free'];

  const filteredDesigns = useMemo(() => {
    return AVAILABLE_DESIGNS.filter(design => {
      const matchCategory = selectedCategory === 'all' || design.category === selectedCategory;
      const matchTier = selectedTier === 'all' || design.recommendedTier === selectedTier;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = query === '' || 
        design.name.toLowerCase().includes(query) ||
        design.subtitle.toLowerCase().includes(query) ||
        design.tags.some(t => t.toLowerCase().includes(query)) ||
        design.typography.headingFont.toLowerCase().includes(query) ||
        design.style.aestheticName.toLowerCase().includes(query) ||
        design.colorPalette.some(c => c.name.toLowerCase().includes(query));
      
      return matchCategory && matchTier && matchSearch;
    });
  }, [selectedCategory, selectedTier, searchQuery]);

  const handleLike = (id: string) => {
    if (userLiked[id]) {
      setUserLiked(prev => ({ ...prev, [id]: false }));
      setLikes(prev => ({ ...prev, [id]: prev[id] - 1 }));
    } else {
      setUserLiked(prev => ({ ...prev, [id]: true }));
      setLikes(prev => ({ ...prev, [id]: prev[id] + 1 }));
    }
  };

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const getActiveTab = (designId: string) => {
    return activeTabByDesign[designId] || 'benefits';
  };

  const setActiveTab = (designId: string, tab: 'benefits' | 'colors' | 'typography' | 'style' | 'components') => {
    setActiveTabByDesign(prev => ({ ...prev, [designId]: tab }));
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-10 selection:bg-[#FF5500] selection:text-white animate-in fade-in duration-300">
      
      {/* 1. TOP HERO BANNER */}
      <div className="bg-gradient-to-br from-[#1C1917] via-stone-900 to-[#2A231F] rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-stone-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5500]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5500]/20 text-[#FF8844] text-xs font-black uppercase tracking-wider backdrop-blur-md border border-[#FF5500]/40">
            <LayoutTemplate size={14} className="text-[#FF5500]" />
            <span>Catálogo Oficial • Diseños Disponibles Landing Pages</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Diseños Disponibles para <span className="text-[#FF5500]">Landing Pages</span>
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
            Catálogo completo de <strong>arquetipos visuales y layouts de alta conversión</strong> para agencias turísticas y operadores en Cusco y Perú. Cada diseño cuenta con su <strong>ficha técnica detallada</strong>: beneficios comerciales, paleta cromática con roles y códigos HEX, stack tipográfico con jerarquías, estilo visual, público objetivo y componentes listos para usar.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 text-stone-200 border border-white/10">
              <Flame size={14} className="text-[#FF5500]" /> 7 Diseños Listos en Código
            </span>
            <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 text-stone-200 border border-white/10">
              <Target size={14} className="text-amber-400" /> Detalle de Beneficios & Conversión
            </span>
            <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 text-stone-200 border border-white/10">
              <Palette size={14} className="text-blue-400" /> Colores & HEX Copiables
            </span>
            <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 text-stone-200 border border-white/10">
              <Type size={14} className="text-purple-400" /> Tipografías & Estilos
            </span>
          </div>
        </div>
      </div>

      {/* 2. CONTROL BAR: SEARCH & DYNAMIC FILTERS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input 
              type="text"
              placeholder="Buscar por diseño, estilo, tipografía o tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5500] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Tier Filter Buttons */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
              Plan:
            </span>
            {tiers.map(tier => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                  selectedTier === tier
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tier === 'all' ? 'Todos los Planes' : tier}
              </button>
            ))}
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
            Categoría:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#FF5500] text-white shadow-md shadow-[#FF5500]/30'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat === 'all' ? 'Todos los Estilos (7)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. SHOWCASE OF DESIGNS WITH DETAILED SPECS */}
      {filteredDesigns.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <LayoutTemplate size={40} className="mx-auto text-slate-300" />
          <h3 className="text-base font-bold text-slate-700">No se encontraron diseños con los filtros actuales</h3>
          <p className="text-xs text-slate-500">Prueba cambiando el término de búsqueda o seleccionando "Todos los Estilos".</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSelectedTier('all'); setSearchQuery(''); }}
            className="mt-2 text-xs font-bold text-[#FF5500] hover:underline"
          >
            Restablecer todos los filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDesigns.map((design) => {
            const isLiked = userLiked[design.id];
            const currentLikes = likes[design.id];
            const isFirstOption = design.id === 'peru-portal-agency';
            const currentTab = getActiveTab(design.id);

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
                    <div className="bg-gradient-to-r from-[#FF5500] to-orange-600 text-white py-2.5 px-6 flex flex-wrap items-center justify-between text-xs font-black uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Crown size={16} />
                        <span>Opción #1 Destacada • Portal Oficial Agencia Perú (Componente Modular Completo)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-black/25 px-2 py-0.5 rounded text-[10px]">
                          Máxima Conversión 2026
                        </span>
                        <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">
                          Plan Advance
                        </span>
                      </div>
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="bg-black/75 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
                          <Pin size={12} className="rotate-45 text-[#FF5500]" />
                          {design.category}
                        </span>
                        <span className="bg-slate-900/80 backdrop-blur-md text-amber-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase border border-amber-400/30">
                          Plan {design.recommendedTier}
                        </span>
                      </div>

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
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold bg-[#FF5500] text-white px-2 py-0.5 rounded-md uppercase tracking-wider">
                          Plantilla: {design.template}
                        </span>
                        <span className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                          <TrendingUp size={12} /> {design.conversionImpact}
                        </span>
                      </div>
                      <h3 className={`font-black tracking-tight leading-snug drop-shadow-md ${isFirstOption ? 'text-2xl sm:text-3xl text-white' : 'text-xl'}`}>
                        {design.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-200 line-clamp-2 font-light opacity-95">
                        {design.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Card Content & Interactive Specs Tabs */}
                  <div className={`p-6 space-y-5 ${isFirstOption ? 'bg-stone-50/50' : ''}`}>
                    
                    {/* Specification Navigation Tabs */}
                    <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl overflow-x-auto scrollbar-none">
                      <button
                        type="button"
                        onClick={() => setActiveTab(design.id, 'benefits')}
                        className={`flex-1 min-w-[95px] py-1.5 px-2 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          currentTab === 'benefits'
                            ? 'bg-white text-[#FF5500] shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Target size={13} />
                        <span>Beneficios</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab(design.id, 'colors')}
                        className={`flex-1 min-w-[90px] py-1.5 px-2 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          currentTab === 'colors'
                            ? 'bg-white text-[#FF5500] shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Palette size={13} />
                        <span>Colores</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab(design.id, 'typography')}
                        className={`flex-1 min-w-[95px] py-1.5 px-2 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          currentTab === 'typography'
                            ? 'bg-white text-[#FF5500] shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Type size={13} />
                        <span>Tipografía</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab(design.id, 'style')}
                        className={`flex-1 min-w-[85px] py-1.5 px-2 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          currentTab === 'style'
                            ? 'bg-white text-[#FF5500] shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <LayoutTemplate size={13} />
                        <span>Estilos</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab(design.id, 'components')}
                        className={`flex-1 min-w-[105px] py-1.5 px-2 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          currentTab === 'components'
                            ? 'bg-white text-[#FF5500] shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Layers size={13} />
                        <span>Componentes</span>
                      </button>
                    </div>

                    {/* TAB CONTENT: 1. BENEFICIOS */}
                    {currentTab === 'benefits' && (
                      <div className="space-y-3.5 animate-in fade-in duration-200">
                        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
                          <Users size={16} className="text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block">Público y Nicho Ideal:</span>
                            <span className="text-amber-800 text-[11px]">{design.targetAudience}</span>
                          </div>
                        </div>

                        <div className={`grid gap-2.5 ${isFirstOption ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                          {design.benefits.map((b, i) => (
                            <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                  <Zap size={13} className="text-[#FF5500]" />
                                  {b.title}
                                </span>
                                {b.badge && (
                                  <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-md bg-[#FF5500]/10 text-[#FF5500] border border-[#FF5500]/20 shrink-0">
                                    {b.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-600 leading-relaxed">
                                {b.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB CONTENT: 2. COLORES */}
                    {currentTab === 'colors' && (
                      <div className="space-y-3.5 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            Paleta Cromática & Rol Psicológico
                          </span>
                          <span className="text-[10px] text-slate-400 italic">
                            Haz click en el código para copiar HEX
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {design.colorPalette.map((col, i) => (
                            <div 
                              key={i} 
                              className="p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 flex items-start gap-3 hover:bg-slate-100/80 transition-colors"
                            >
                              <div 
                                className="w-9 h-9 rounded-xl border border-black/10 shadow-xs shrink-0 flex items-center justify-center"
                                style={{ backgroundColor: col.hex }}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-bold text-slate-800 truncate">{col.name}</span>
                                  <button
                                    type="button"
                                    onClick={() => copyToClipboard(col.hex)}
                                    className="text-[10px] font-mono font-bold text-slate-600 hover:text-[#FF5500] flex items-center gap-1 px-1.5 py-0.5 rounded bg-white border border-slate-200 cursor-pointer shrink-0"
                                    title="Copiar código HEX"
                                  >
                                    {copiedHex === col.hex ? (
                                      <>
                                        <Check size={11} className="text-emerald-600" />
                                        <span className="text-emerald-600">¡Copiado!</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy size={11} />
                                        <span>{col.hex}</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                                <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2 leading-tight">
                                  {col.role}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB CONTENT: 3. TIPOGRAFÍA */}
                    {currentTab === 'typography' && (
                      <div className="space-y-3.5 animate-in fade-in duration-200">
                        
                        {/* Specimen Preview Card */}
                        <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 border border-slate-800">
                          <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                            <span>Muestra Visual Tipográfica</span>
                            <span className="text-amber-400 font-mono">{design.typography.category}</span>
                          </div>
                          <p className="text-base sm:text-lg font-black tracking-tight text-white leading-snug">
                            "{design.typography.sampleTitle}"
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-xs pt-1 border-t border-slate-800 text-stone-300">
                            <div>
                              <span className="text-[10px] text-stone-500 block uppercase">Titulares:</span>
                              <strong className="text-amber-300">{design.typography.headingFont}</strong>
                            </div>
                            <div>
                              <span className="text-[10px] text-stone-500 block uppercase">Cuerpo de Texto:</span>
                              <strong className="text-white">{design.typography.bodyFont}</strong>
                            </div>
                          </div>
                        </div>

                        {/* Hierarchy Notes */}
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                            Estrategia de Jerarquía & Legibilidad:
                          </span>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            {design.typography.hierarchyNotes}
                          </p>
                        </div>

                      </div>
                    )}

                    {/* TAB CONTENT: 4. ESTILOS */}
                    {currentTab === 'style' && (
                      <div className="space-y-3.5 animate-in fade-in duration-200">
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">
                              {design.style.aestheticName}
                            </span>
                            <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">
                              Identidad Visual
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {design.style.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-200">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-0.5">
                              Patrón de Layout:
                            </span>
                            <span className="text-[11px] text-slate-700 font-medium">
                              {design.style.layoutPattern}
                            </span>
                          </div>

                          <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-200">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-0.5">
                              Micro-interacciones:
                            </span>
                            <span className="text-[11px] text-slate-700 font-medium">
                              {design.style.microInteractions}
                            </span>
                          </div>
                        </div>

                        {/* Visual Elements Pills */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                            Elementos y Efectos Visuales Clave:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {design.style.visualElements.map((el, i) => (
                              <span key={i} className="text-[11px] bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded-md font-medium">
                                ✨ {el}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB CONTENT: 5. COMPONENTES */}
                    {currentTab === 'components' && (
                      <div className="space-y-3.5 animate-in fade-in duration-200">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                          Secciones y Módulos Listos para Usar:
                        </span>
                        <ul className={`grid gap-2 text-xs text-slate-700 ${isFirstOption ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                          {design.includedComponents.map((comp, i) => (
                            <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                              <CheckCircle2 size={15} className="text-[#FF5500] shrink-0 mt-0.5" />
                              <span className="text-[11px] font-medium leading-tight">{comp}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Mini Gallery for Option 1 */}
                        {isFirstOption && (
                          <div className="pt-2 border-t border-slate-200 space-y-1.5">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                              Vistas del Portal en Funcionamiento:
                            </span>
                            <div className="grid grid-cols-3 gap-3">
                              {design.gridSampleImages.map((img, idx) => (
                                <div key={idx} className="relative h-20 rounded-xl overflow-hidden shadow-xs border border-stone-200">
                                  <Image src={img} alt="Sección de tour" fill className="object-cover" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                      {design.tags.map((t, i) => (
                        <span key={i} className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                          #{t}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-3 grid grid-cols-2 gap-3">
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
                    <span>Crear con este Diseño</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* 4. CODE REPOSITORY & STORAGE NOTICE */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-black text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={16} />
            <span>Plantillas Modulares Respaldadas en Código Fuente</span>
          </div>
          <h3 className="font-black text-lg sm:text-xl text-white">
            Componentes Disponibles: <code className="text-emerald-400 text-xs sm:text-sm font-mono bg-black/40 px-2 py-1 rounded">src/templates/</code>
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 max-w-2xl leading-relaxed">
            Todos los diseños detallados cuentan con su respectivo componente en código modular (<code className="text-stone-300">AgencyPortalTemplate</code>, <code className="text-stone-300">BohoTemplate</code>, <code className="text-stone-300">AdventureTemplate</code>, <code className="text-stone-300">CulturalTemplate</code> y <code className="text-stone-300">PremiumTemplate</code>), listos para asociarse al generador de landings y a la base de datos Supabase.
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
