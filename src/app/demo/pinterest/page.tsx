'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  Eye, 
  ArrowRight, 
  Heart, 
  Layers, 
  Palette, 
  CheckCircle2,
  ShieldCheck,
  LayoutTemplate,
  Flame,
  Crown,
  Type,
  Target,
  Zap,
  Check,
  Copy,
  Search,
  SlidersHorizontal,
  TrendingUp,
  Users,
  X,
  FileText,
  ExternalLink,
  ChevronRight,
  Info,
  Code,
  FileCode,
  Terminal,
  BookOpen,
  Compass
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

export interface ColorTokenSpec {
  token: string;
  hex: string;
  role: string;
  tailwindClass: string;
}

export interface TailwindSnippet {
  title: string;
  code: string;
}

export interface ReplicationSpec {
  coreDifference: string;
  layoutArchetype: string;
  containerWidth: string;
  baseBackground: string;
  colorTokens: ColorTokenSpec[];
  typographyRecipe: {
    headingFont: string;
    bodyFont: string;
    rules: string;
    sampleCode: string;
  };
  signatureEffects: string[];
  heroStructure: string;
  conversionDriver: string;
  keyTailwindSnippets: TailwindSnippet[];
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
  likesCount: number;
  previewImage: string;
  gridSampleImages: string[];
  tags: string[];
  targetAudience: string;
  conversionImpact: string;
  differenceHighlight: string;
  
  benefits: BenefitDetail[];
  colorPalette: ColorDetail[];
  typography: TypographyDetail;
  style: StyleDetail;
  includedComponents: string[];
  replication: ReplicationSpec;
}

const AVAILABLE_DESIGNS: LandingDesign[] = [
  {
    id: 'peru-portal-agency',
    name: '1. Portal Oficial de Agencia & Multidía',
    subtitle: 'Diseño corporativo de alta conversión: Hero panorámico, sellos DIRCETUR, RUC formal, métricas de confianza y módulo FAQ interactivo.',
    category: 'Alta Conversión & Portal Oficial',
    template: 'agency-portal',
    recommendedTier: 'advance',
    targetTour: 'Machu Picchu VIP, Paquetes Multidía, Circuitos Cusco & Valle Sagrado',
    demoSlug: 'machu-picchu-vip',
    isFeatured: true,
    likesCount: 3840,
    previewImage: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop'
    ],
    tags: ['Diseño 1', 'Hero Panorámico', 'Alta Conversión', 'Sellos DIRCETUR', 'Acordeón FAQ'],
    targetAudience: 'Agencias turísticas formales, operadores receptivos y empresas que invierten en pauta de Facebook, Instagram o Google Ads.',
    conversionImpact: '+42% en contactos calificados y reservas multidía',
    differenceHighlight: 'Enfoque 100% corporativo institucional con RUC formal, selector de 5 idiomas nativo y catálogo multidía para pauta publicitaria.',
    benefits: [
      {
        title: 'Conversión Acelerada (+42%)',
        description: 'Estructura psicológica probada con llamado a la acción (CTA) visible inmediatamente sin necesidad de scroll.',
        badge: 'Top Ventas'
      },
      {
        title: 'Blindaje de Confianza & Anti-Fraude',
        description: 'Módulo con RUC 20 formal, sellos Safe Travels, licencia DIRCETUR y botiquín de primeros auxilios.',
        badge: '100% Formal'
      },
      {
        title: 'Filtro FAQ que Ahorra Tiempo',
        description: 'Acordeón interactivo con las preguntas críticas (aclimatación, maletas, pagos) para reducir consultas repetitivas.',
        badge: 'Ahorro Soporte'
      },
      {
        title: 'Soporte Multilingüe Nativo',
        description: 'Conmutador de 5 idiomas (ES, EN, PT, FR, IT) para captar turismo receptivo internacional.',
        badge: 'Internacional'
      }
    ],
    colorPalette: [
      { name: 'Naranja Fuego Andino', hex: '#FF5500', role: 'Acento de máxima conversión en botones CTA, badges de urgencia y hover' },
      { name: 'Negro Carbón Institucional', hex: '#1C1917', role: 'Barra superior de anuncios, pie de página y títulos de contraste' },
      { name: 'Blanco Corporativo', hex: '#FDFDFD', role: 'Fondo base de página limpio para máxima legibilidad comercial' },
      { name: 'Crema Arena Suave', hex: '#F9F7F4', role: 'Fondo suave de contraste para tarjetas de testimonios, métricas y FAQs' },
      { name: 'Verde Safe Travels', hex: '#10B981', role: 'Sellos oficiales de garantía turística DIRCETUR y Safe Travels' },
      { name: 'Verde WhatsApp Oficial', hex: '#25D366', role: 'Botón flotante de contacto directo y canal de atención inmediata' }
    ],
    typography: {
      headingFont: 'Plus Jakarta Sans (ExtraBold 800/900)',
      bodyFont: 'Inter (Regular 400 / Medium 500 / SemiBold 600)',
      category: 'Sans-Serif Geométrica Moderna',
      sampleTitle: 'DESCUBRE LA MAGIA DE LOS ANDES CON GUÍAS OFICIALES',
      hierarchyNotes: 'Titulares en mayúsculas compactas con tracking negativo (-0.02em) para presencia monumental y lectura ágil en móviles.'
    },
    style: {
      aestheticName: 'Corporate Neobrutalism Suave',
      description: 'Líneas limpias, sombras nítidas, contrastes potentes entre naranja fuego y negro carbón con esquinas de 24px que transmiten solidez institucional.',
      layoutPattern: 'Barra de anuncios + Navbar sticky multi-idioma + Hero panorámico + Barra métricas 4x + Catálogo multidía con filtro + FAQ acordeón + WhatsApp flotante',
      spacingAndBorders: 'Bordes redondeados de 24px (rounded-3xl) y bordes sutiles de 1px en stone-200.',
      visualElements: ['Badges de estrellas TripAdvisor', 'Sellos oficiales DIRCETUR', 'Acordeón FAQ animado', 'Botón flotante WhatsApp con pulso'],
      microInteractions: 'Botón con pulso suave de atención, elevación en hover y feedback táctil.'
    },
    includedComponents: [
      'Top announcement bar con selector de 5 idiomas (🇵🇪, 🇺🇸, 🇧🇷, 🇫🇷, 🇮🇹)',
      'Hero panorámico con imagen full-cover y badges de reputación flotantes',
      'Barra de 4 métricas de autoridad (+10,000 viajeros, 10+ años)',
      'Catálogo de tours con filtro por categorías y precios en USD',
      'Módulo de seguridad legal con RUC 20 y guías colegiados',
      'Acordeón interactivo de Preguntas Frecuentes',
      'Banner naranja gigante de cierre con botón directo a WhatsApp'
    ],
    replication: {
      coreDifference: 'Es el arquetipo más formal y comercial. Minimiza la fantasía visual en favor de credibilidad legal inmediata (RUC 20, acreditación MINCETUR), métricas numéricas a la vista y catálogo multidía optimizado para tráfico pagado de Meta y Google Ads.',
      layoutArchetype: 'Portal Corporativo: Barra Anuncios + Navbar Sticky con Banderas + Hero Panorámico + Métricas 4x + Catálogo con Filtro de Categorías + Seguridad Legal + FAQ + Sticky CTA.',
      containerWidth: 'max-w-7xl mx-auto px-4 sm:px-6 (Secciones) y max-w-6xl mx-auto (Métricas y FAQ)',
      baseBackground: 'bg-[#FDFDFD] con acentos en bg-[#1C1917] y fondos de tarjeta en bg-[#F9F7F4]',
      colorTokens: [
        { token: 'primary-cta', hex: '#FF5500', role: 'Botones primarios y acentos clave', tailwindClass: 'bg-[#FF5500] hover:bg-[#E04500] text-white' },
        { token: 'header-dark', hex: '#1C1917', role: 'Barra superior de anuncios y footer', tailwindClass: 'bg-[#1C1917] text-white border-stone-800' },
        { token: 'canvas-clean', hex: '#FDFDFD', role: 'Lienzo base de página corporativa', tailwindClass: 'bg-[#FDFDFD] text-stone-900' },
        { token: 'card-neutral', hex: '#F9F7F4', role: 'Fondo suave de tarjetas secundarias', tailwindClass: 'bg-[#F9F7F4] border-stone-200' },
        { token: 'trust-green', hex: '#10B981', role: 'Sellos de garantía Safe Travels', tailwindClass: 'text-emerald-500 bg-emerald-500/10' },
        { token: 'wa-green', hex: '#25D366', role: 'Botón de contacto WhatsApp oficial', tailwindClass: 'bg-[#25D366] hover:bg-[#20ba59] text-white' }
      ],
      typographyRecipe: {
        headingFont: 'Plus Jakarta Sans (Font-Black 800/900)',
        bodyFont: 'Inter (Regular 400 / Medium 500 / SemiBold 600)',
        rules: 'Titulares en mayúsculas compactas con tracking apretado (tracking-tight) y leading ajustado. Subtítulos limpios en 14-16px con text-stone-600 para lectura ejecutiva.',
        sampleCode: 'font-black tracking-tight uppercase text-stone-900 text-3xl sm:text-5xl'
      },
      signatureEffects: [
        'Barra superior con selector de banderas de 5 idiomas (🇵🇪 ES, 🇺🇸 EN, 🇧🇷 PT, 🇫🇷 FR, 🇮🇹 IT)',
        'Hero panorámico con degradado "from-black/70 via-black/30 to-black/20"',
        'Ambient glass badges flotantes en esquinas del hero ("4.9/5.0 Valoración" y "MINCETUR Operador Oficial")',
        'Botones shimmer con efecto de brillo diagonal en hover y ring-2 ring-white/25',
        'Bordes redondeados uniformes de 24px (rounded-3xl) y sombras limpias shadow-xs / shadow-md'
      ],
      heroStructure: 'Hero panorámico adaptable (min-h-[520px] a min-h-[600px]) con imagen de fondo full-cover, overlay oscuro de lectura, badge pill con brillo, titular uppercase de alto impacto y doble botón CTA (Reservar WhatsApp + Cotizar Tour).',
      conversionDriver: 'Elimina cualquier duda de fraude o informalidad mediante sellos oficiales a la vista, RUC visible, botón de WhatsApp con mensaje pre-rellenado y desglose transparente de inclusiones/exclusiones.',
      keyTailwindSnippets: [
        {
          title: 'Botón Shimmer de Alta Conversión',
          code: 'bg-gradient-to-r from-[#FF5500] via-[#FF6611] to-[#FF3000] text-white px-8 py-4 rounded-full font-black text-sm uppercase shadow-lg shadow-[#FF5500]/40 hover:scale-105 active:scale-95 transition-all ring-2 ring-white/25'
        },
        {
          title: 'Barra de Métricas 4 Columnas',
          code: 'grid grid-cols-2 md:grid-cols-4 gap-4 divide-y-0 md:divide-x divide-stone-100 text-center bg-white py-6 border-b border-stone-200'
        },
        {
          title: 'Tarjeta de Tour con Badge Oficial',
          code: 'bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
        }
      ]
    }
  },
  {
    id: 'boho-nature',
    name: '2. Boho Travel Journal & Polaroids',
    subtitle: 'Bitácora de viajes inspiradora con fotos polaroids inclinadas, notas de campo estilo scrapbook y tonos orgánicos cálidos.',
    category: 'Editorial & Storytelling',
    template: 'boho-nature',
    recommendedTier: 'advance',
    targetTour: 'Laguna Humantay, Salineras de Maras, Rutas Fotográficas, Retiros & Naturaleza',
    demoSlug: 'laguna-humantay-boho',
    likesCount: 2420,
    previewImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop'
    ],
    tags: ['Diseño 2', 'Polaroids Inclinadas', 'Washi Tape', 'Notas de Campo', 'Pinterest Aesthetic'],
    targetAudience: 'Turistas jóvenes, parejas, fotógrafos, nómadas digitales y viajeros visuales que comparten contenido en Instagram y Pinterest.',
    conversionImpact: '+65% en tiempo de permanencia en página y tasa de guardado',
    differenceHighlight: 'Estética Pinterest / Travel Journal con fotos polaroids inclinadas, cinta washi, tipografía serif poética y checklist de mochila.',
    benefits: [
      {
        title: 'Storytelling Emocional',
        description: 'La diagramación simula el diario de viaje de un explorador real, generando deseo genuino e inspiración antes de comprar.',
        badge: 'Viral'
      },
      {
        title: 'Retención Visual Prolongada (+65%)',
        description: 'El formato de fotos polaroids invita a recorrer cada fotografía con atención y detenerse en el itinerario.',
        badge: 'Retención'
      },
      {
        title: 'Diferenciación de Marca Inmediata',
        description: 'Rompe con los sitios turísticos convencionales aburridos; posiciona a la agencia como curadora de vivencias estéticas.',
        badge: 'Estilo Único'
      },
      {
        title: 'Módulo Checklist de Mochila',
        description: 'Lista visual clasificada con lo indispensable que debe llevar el viajero (calzado, capas térmicas, cámara).',
        badge: 'Utilidad'
      }
    ],
    colorPalette: [
      { name: 'Arena Cálida Papel Acuarela', hex: '#FAF7F2', role: 'Fondo lienzo continuo que evoca papel Moleskine o textura de diario de campo' },
      { name: 'Terracota Boho Orgánico', hex: '#C86D51', role: 'Tono primario para botones de cotización, sellos de viaje y acentos cálidos' },
      { name: 'Verde Eucalipto Andino', hex: '#588157', role: 'Botón primario de WhatsApp, chips de flora andina y confirmaciones' },
      { name: 'Cinta Washi Adhesiva', hex: '#E8DEC8', role: 'Cinta semitransparente superior que simula sujetar las fotos polaroid' },
      { name: 'Tinta de Campo Editorial', hex: '#292524', role: 'Tipografía serif editorial suave con textura de imprenta artesanal' },
      { name: 'Blanco Postal Polaroid', hex: '#FFFFFF', role: 'Marco blanco grueso con sombra suave de las fotografías instantáneas' }
    ],
    typography: {
      headingFont: 'Playfair Display (Serif Elegante & Itálica)',
      bodyFont: 'Plus Jakarta Sans & Inter (Limpio & Orgánico)',
      category: 'Serif Editorial + Sans-Serif Cálida',
      sampleTitle: 'Diario de Ruta: Laguna Humantay & Valles Glaciares',
      hierarchyNotes: 'Titulares en Serif clásica con cursivas románticas para notas de campo ("Notas del Guía") y datos claros en el itinerario.'
    },
    style: {
      aestheticName: 'Bohemian Travel Scrapbook',
      description: 'Atmósfera nostálgica y artesanal inspirada en cuadernos de viaje Moleskine, con polaroids rotadas sutilmente (-1° a 2°).',
      layoutPattern: 'Hero collage editorial + Muro de polaroids masonry + Itinerario como diario cronológico',
      spacingAndBorders: 'Efecto de papel con esquinas suaves, cinta washi semiopaca superpuesta en la parte superior.',
      visualElements: ['Polaroids con bordes blancos gruesos', 'Cinta washi adhesiva', 'Sellos postales andinos', 'Barra móvil de acceso rápido con emojis'],
      microInteractions: 'Efecto de enderezado y elevación al pasar el ratón sobre cada foto polaroid.'
    },
    includedComponents: [
      'Hero con collage asimétrico de polaroids y cinta washi',
      'Ficha técnica de la ruta con altitud y horas de caminata',
      'Itinerario maquetado como diario de campo cronológico',
      'Galería de fotos estilo Pinterest con contador de likes',
      'Módulo "¿Qué llevar en tu mochila?" con checklist visual',
      'Botón flotante de WhatsApp en color terracota orgánico'
    ],
    replication: {
      coreDifference: 'Diseño editorial y sensorial inspirado en cuadernos de viaje y tableros de Pinterest. A diferencia del estilo corporativo o técnico, prioriza el deseo estético, la fotografía con luz natural, la narrativa pausada y detalles nostálgicos para parejas, fotógrafos y nómadas digitales.',
      layoutArchetype: 'Editorial Travel Journal: Header Artesanal + Barra Navegación Emoji + Hero Collage Asimétrico + Muro de Polaroids + Itinerario Diario + Checklist Mochila + Guía de Campo.',
      containerWidth: 'max-w-6xl mx-auto px-4 sm:px-8 (Formato editorial más íntimo y acogedor)',
      baseBackground: 'bg-[#FAF7F2] continuo en toda la página con tarjetas blancas bg-white tipo polaroid',
      colorTokens: [
        { token: 'canvas-paper', hex: '#FAF7F2', role: 'Fondo cálido tipo papel Moleskine / acuarela', tailwindClass: 'bg-[#FAF7F2] text-stone-900' },
        { token: 'terracotta-boho', hex: '#C86D51', role: 'Botones de cotización, sellos y detalles de autor', tailwindClass: 'bg-[#C86D51] hover:bg-[#b05d43] text-white' },
        { token: 'eucalyptus-green', hex: '#588157', role: 'Botones WhatsApp, flora andina y lagunas', tailwindClass: 'bg-[#588157] hover:bg-[#476846] text-white' },
        { token: 'washi-tape', hex: '#E8DEC8', role: 'Cinta adhesiva semitransparente de polaroid', tailwindClass: 'bg-[#E8DEC8]/90 shadow-2xs' },
        { token: 'ink-charcoal', hex: '#292524', role: 'Tipografía serif editorial de títulos y citas', tailwindClass: 'text-[#292524] text-stone-800' },
        { token: 'polaroid-frame', hex: '#FFFFFF', role: 'Marco blanco físico de fotografía instantánea', tailwindClass: 'bg-white p-3 pb-6 border-stone-200 shadow-lg' }
      ],
      typographyRecipe: {
        headingFont: 'Playfair Display (Font-Serif Medium 500 / Italic)',
        bodyFont: 'Plus Jakarta Sans & Inter (Regular 400 / Medium 500)',
        rules: 'Titulares poéticos en Serif clásica con cursivas románticas para notas de campo y citas entre comillas ("Laguna Humantay"). Datos técnicos (altitud, horas) en Sans-Serif limpia para no sobrecargar.',
        sampleCode: 'font-serif italic font-medium text-2xl sm:text-4xl md:text-5xl text-stone-900 leading-[1.18]'
      },
      signatureEffects: [
        'Polaroid central rotada -2deg con efecto hover que la endereza a 0deg y la eleva',
        'Polaroid decorativa secundaria en segundo plano rotada +6deg con opacidad 0.80',
        'Cinta washi superior rotada 1deg ("w-16 h-3 bg-[#E8DEC8]/90 absolute -top-1.5 left-1/2 -translate-x-1/2 rotate-1")',
        'Barra sticky móvil horizontal con chips de acceso rápido con emojis (📖 Bitácora, 🖼️ Postales, 🎒 Mochila)',
        'Módulo de equipaje organizado en checklist visual con casillas interactivas'
      ],
      heroStructure: 'Hero dividido en rejilla de 12 columnas: 7 columnas a la izquierda con badge artesanal, titular serif poético, ficha de inversión y doble botón orgánico; 5 columnas a la derecha con el collage asimétrico de dos polaroids superpuestas con cinta washi y badge de corazón.',
      conversionDriver: 'Genera una conexión emocional y estética irresistible, incitando al viajero a imaginarse dentro de las fotos y reduciendo la fricción con respuestas amables por WhatsApp y lista clara de equipaje.',
      keyTailwindSnippets: [
        {
          title: 'Marco Polaroid con Cinta Washi',
          code: 'relative bg-white p-3 pb-6 rounded-2xl shadow-lg border border-stone-200 transform sm:-rotate-2 hover:rotate-0 transition-transform duration-300'
        },
        {
          title: 'Cinta Washi Adhesiva Superior',
          code: 'w-16 h-3 bg-[#E8DEC8]/90 absolute -top-1.5 left-1/2 -translate-x-1/2 rotate-1 shadow-2xs'
        },
        {
          title: 'Botón Verde Eucalipto WhatsApp',
          code: 'bg-[#588157] hover:bg-[#476846] text-white px-6 py-3.5 rounded-2xl font-semibold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2'
        }
      ]
    }
  },
  {
    id: 'adventure',
    name: '3. Adventure & Mountain Explorer',
    subtitle: 'Panel técnico de alta montaña con insignias de altitud msnm, dificultad física, protocolo médico y coordenadas GPS.',
    category: 'Trekking & Expedición',
    template: 'adventure',
    recommendedTier: 'pro',
    targetTour: 'Salkantay Trek, Valle Sagrado Cuatrimotos, Ausangate Circuit, Choquequirao, Rutas de Montaña',
    demoSlug: 'valle-sagrado-aventura',
    likesCount: 2680,
    previewImage: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop'
    ],
    tags: ['Diseño 3', 'Altitud msnm', 'Coordenadas GPS', 'Insignias DIRCETUR', 'Outdoor Explorer'],
    targetAudience: 'Trekkeros, senderistas, deportistas de aventura y exploradores que necesitan certezas sobre exigencia física y equipo antes de reservar.',
    conversionImpact: '+50% en conversión de rutas exigentes gracias a la precisión técnica',
    differenceHighlight: 'Panel técnico HUD de alta montaña con altitud msnm, protocolo de oxígeno médico, salidas garantizadas en vivo y datos Garmin.',
    benefits: [
      {
        title: 'Seguridad Técnica que Elimina Miedos',
        description: 'Muestra altitud máxima (ej. 4,630 msnm), dificultad física, desniveles y horas de caminata por día.',
        badge: 'Seguridad'
      },
      {
        title: 'Respaldo Médico & Oxígeno Garantizado',
        description: 'Destaca de inmediato la presencia de balón de oxígeno, botiquín de primeros auxilios y guías de montaña certificados.',
        badge: 'Paz Mental'
      },
      {
        title: 'Checklist de Mochila Interactivo',
        description: 'Lista clasificada de ropa térmica, calzado adecuado y medicación para que el cliente viaje preparado.',
        badge: 'Equipamiento'
      },
      {
        title: 'Ficha de Elevación y Terreno',
        description: 'Perfil altimétrico claro que permite al viajero dimensionar el reto día a día.',
        badge: 'Precisión'
      }
    ],
    colorPalette: [
      { name: 'Azul Cumbre Técnico', hex: '#2563EB', role: 'Color de marca TrekExplorer, chips de altitud msnm y botones secundarios' },
      { name: 'Negro Roca Volcánica', hex: '#020617', role: 'Hero cinematográfico nocturno en slate-950 y barra técnica de expedición' },
      { name: 'Verde Salidas & Oxígeno', hex: '#059669', role: 'Botón de WhatsApp y pulso activo de salidas garantizadas diarias (#34D399)' },
      { name: 'Blanco Nieve Alpina', hex: '#FDFDFD', role: 'Fondo del cuerpo para lectura técnica limpia sin fatiga visual' },
      { name: 'Cristal Alpino Glassmorphic', hex: 'rgba(15,23,42,0.7)', role: 'Tarjetas flotantes HUD estilo display Garmin con backdrop-blur-xl' },
      { name: 'Naranja Señalética', hex: '#EA580C', role: 'Puntos críticos de ruta, alertas técnicas de desnivel y pasos glaciares' }
    ],
    typography: {
      headingFont: 'Montserrat (ExtraBold 700/800)',
      bodyFont: 'Inter & Roboto Mono (Datos Numéricos & GPS)',
      category: 'Sans-Serif Industrial & Numeral Mono',
      sampleTitle: 'SALKANTAY TREK 5 DÍAS • PASO GLACIAR 4,630 MSNM',
      hierarchyNotes: 'Tipografía contundente para encabezados; los datos de elevación y clima usan fuente monoespaciada con estilo de reloj Garmin.'
    },
    style: {
      aestheticName: 'Alpine Technical HUD & Field Guide',
      description: 'Inspirado en marcas outdoor como Arc’teryx y The North Face. Robusto, funcional y respaldado en datos topográficos.',
      layoutPattern: 'Navbar técnica con banderas + Hero full-bleed con HUD flotante + Ficha altimétrica + Protocolo oxígeno + Fichas logísticas Sprinter',
      spacingAndBorders: 'Bordes reforzados, tarjetas compactas con badges de dificultad física y señalética de senderos.',
      visualElements: ['Chips de brújula y altímetro', 'Insignias de aclimatación', 'Iconografía de montaña', 'Pulso en vivo animate-ping'],
      microInteractions: 'Animación en la barra de progreso del itinerario y hover dinámico sobre mapas.'
    },
    includedComponents: [
      'Hero con altitud máxima y chip de dificultad física',
      'Panel técnico de ruta (km totales, horas por día, desniveles)',
      'Protocolo de aclimatación y botiquín de altura',
      'Itinerario paso a paso con campamentos y comidas',
      'Checklist interactivo de equipaje para trekking',
      'Botón de reserva directa a WhatsApp con fecha tentativa'
    ],
    replication: {
      coreDifference: 'Diseñado para trekking exigente y turismo outdoor de adrenalina (Salkantay, Ausangate, Choquequirao). A diferencia de los otros estilos, elimina la incertidumbre física del cliente con datos de ingeniería de ruta: perfil de desniveles, presencia obligatoria de oxígeno, campamentos domos y clima.',
      layoutArchetype: 'Technical Alpine Cockpit: Navbar con Píldora de Idioma + Hero Full-Bleed con HUD Flotante + Panel Técnico de Elevación + Protocolo de Oxígeno + Desglose de Inclusiones Puerta a Puerta + Itinerario Paso a Paso.',
      containerWidth: 'max-w-7xl mx-auto px-4 sm:px-8 (Visión panorámica de alta montaña)',
      baseBackground: 'Hero oscuro en slate-950 con cuerpo técnico en bg-[#FDFDFD]',
      colorTokens: [
        { token: 'summit-blue', hex: '#2563EB', role: 'Color de marca TrekExplorer y chips de altitud', tailwindClass: 'text-blue-600 bg-blue-600 hover:bg-blue-700 text-white' },
        { token: 'volcanic-rock', hex: '#020617', role: 'Fondo del hero inmersivo y navbar robusta', tailwindClass: 'bg-slate-950 text-white border-slate-800' },
        { token: 'emergency-green', hex: '#059669', role: 'Botón WhatsApp y pulso en vivo de salidas', tailwindClass: 'bg-emerald-600 text-emerald-400 hover:bg-emerald-500' },
        { token: 'alpine-glass', hex: 'rgba(15,23,42,0.7)', role: 'Tarjetas flotantes HUD estilo cockpit Garmin', tailwindClass: 'bg-slate-900/70 backdrop-blur-xl border-white/20 text-white' },
        { token: 'snow-canvas', hex: '#FDFDFD', role: 'Lienzo del cuerpo para lectura técnica diurna', tailwindClass: 'bg-[#FDFDFD] text-slate-800' },
        { token: 'trail-orange', hex: '#EA580C', role: 'Alertas de paso de montaña y puntos críticos', tailwindClass: 'text-[#EA580C] bg-[#EA580C]/10' }
      ],
      typographyRecipe: {
        headingFont: 'Montserrat / Inter (Font-Black 800/900)',
        bodyFont: 'Inter (Regular 400 / Medium 500) & Roboto Mono (Métricas y GPS)',
        rules: 'Titulares rotundos y pesados en 3 a 4 líneas quebradas. Números de altitud (msnm), distancias (km) y coordenadas en fuentes monoespaciadas para estética de dispositivo Garmin o Suunto.',
        sampleCode: 'text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]'
      },
      signatureEffects: [
        'Doble gradiente superpuesto en el hero: horizontal (slate-950/90 a slate-950/35) y vertical (slate-950/80 a transparente)',
        'Tarjeta flotante HUD con pulso verde ping ("w-2 h-2 rounded-full bg-emerald-400 animate-ping")',
        'Badge de altitud máxima resaltado con fondo azul ("text-white text-xs sm:text-sm font-black")',
        'Stack de avatares fotográficos de 3 viajeros reales con borde blanco y puntuación 4.9★',
        'Fichas logísticas "Puerta a Puerta" con imágenes reales de camionetas Sprinter y trenes panorámicos'
      ],
      heroStructure: 'Hero full-bleed cinematográfico: columna izquierda con titular montañero en 3 líneas, párrafo explicativo, botón primario blanco con texto oscuro y badge de precio "Desde $XXX USD"; columna derecha con la tarjeta flotante HUD de altitud y el badge de reseñas verificadas.',
      conversionDriver: 'Desarma el miedo al soroche (mal de altura) y la fatiga certificando balón de oxígeno permanente, botiquín de primeros auxilios y guías de montaña acreditados.',
      keyTailwindSnippets: [
        {
          title: 'Tarjeta Flotante HUD Garmin',
          code: 'bg-slate-900/70 backdrop-blur-xl border border-white/20 p-5 rounded-3xl shadow-2xl text-white space-y-3'
        },
        {
          title: 'Pulso Verde de Salidas Diarias',
          code: 'flex items-center gap-2 text-xs font-black text-emerald-400 (con span w-2 h-2 rounded-full bg-emerald-400 animate-ping)'
        },
        {
          title: 'Botón Primario Contraste Blanco',
          code: 'bg-white hover:bg-slate-100 text-slate-950 font-black px-7 py-3.5 rounded-full text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all'
        }
      ]
    }
  },
  {
    id: 'cultural',
    name: '4. Andean Heritage & Historia Viva',
    subtitle: 'Álbum cultural con sellos incas, arquitectura megalítica, perfil de guía colegiado y desglose del Boleto Turístico.',
    category: 'Cultura & Tradición',
    template: 'cultural',
    recommendedTier: 'basic',
    targetTour: 'City Tour Cusco, Qorikancha, Sacsayhuamán, Maras & Moray, Rutas Arqueológicas & Museos',
    demoSlug: 'city-tour-cusco',
    likesCount: 1650,
    previewImage: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop'
    ],
    tags: ['Diseño 4', 'Sellos de Piedra', 'Texturas de Telar', 'Historia Viva', 'Boleto Turístico'],
    targetAudience: 'Familias, historiadores, amantes de la arqueología y la arquitectura colonial que valoran guías con títulos universitarios.',
    conversionImpact: '+40% en reservas directas de City Tour y paquetes arqueológicos',
    differenceHighlight: 'Álbum histórico con escudo municipal, crónicas del guía historiador colegiado (COLITUR) y desglose del Boleto Turístico.',
    benefits: [
      {
        title: 'Autoridad con Guías Colegiados',
        description: 'Diferencia a la agencia destacando guías titulados y registrados en el Colegio de Licenciados de Turismo del Cusco (COLITUR).',
        badge: 'Guías Oficiales'
      },
      {
        title: 'Calidez Cultural & Conexión Histórica',
        description: 'Colores terracota y motivos textiles incas que envuelven al visitante en la cosmovisión andina.',
        badge: 'Cosmovisión'
      },
      {
        title: 'Claridad sobre el Boleto Turístico',
        description: 'Explica con precisión qué ingresos incluye el boleto (BTC) y cuáles se abonan aparte para evitar reclamos.',
        badge: 'Cero Sorpresas'
      },
      {
        title: 'Itinerario Cultural Detallado',
        description: 'Cronograma de tiempos de traslado, paradas arqueológicas y recomendaciones de altura.',
        badge: 'Puntualidad'
      }
    ],
    colorPalette: [
      { name: 'Carmesí Inca & Rojo Colonial', hex: '#B91C1C', role: 'Botones primarios con degradado carmesí incaico (red-700 via red-600 to red-800)' },
      { name: 'Marfil Pergamino Cálido', hex: '#FFFDF9', role: 'Fondo lienzo continuo que evoca legajos y papel antiguo de archivo cusqueño' },
      { name: 'Piedra Megalítica Sacsayhuamán', hex: '#1C1917', role: 'Cabecera atardecer y textos solemnes inspirados en muros incas (stone-900)' },
      { name: 'Ocre Solar Inti', hex: '#D97706', role: 'Soles, grecas andinas y detalles de oro inca en bordes y acentos' },
      { name: 'Rosa Andino Suave', hex: '#FECACA', role: 'Tipografía de escudo sobre fondos oscuros (red-200) de heráldica andina' },
      { name: 'Vino Tinto Crepuscular', hex: '#450A0A', role: 'Sombra y degradado inferior del atardecer andino (red-950)' }
    ],
    typography: {
      headingFont: 'Cinzel / Merriweather / Georgia (Herencia Monumental Itálica)',
      bodyFont: 'Plus Jakarta Sans & Stone Serif (Legibilidad Moderna)',
      category: 'Serif Monumental & Sans-Serif Humana',
      sampleTitle: 'TEMPLOS SAGRADOS DEL CUSCO & ARQUITECTURA MEGALÍTICA',
      hierarchyNotes: 'Títulos con porte solemne e histórico inspirados en inscripciones coloniales cusqueñas.'
    },
    style: {
      aestheticName: 'Andean Heritage Scrapbook',
      description: 'Combinación de textura de piedra inca pulida, sellos de la chakana y tonos cálidos de telares andinos.',
      layoutPattern: 'Hero con marco de piedra + Fichas por monumento + Perfil de guía anfitrión',
      spacingAndBorders: 'Marcos con relieve suave, esquinas redondeadas y detalles decorativos de grecas andinas.',
      visualElements: ['Sello de la Chakana incaica', 'Fichas arquitectónicas', 'Sellos de DIRCETUR y COLITUR', 'Trío de iconos circulares centrales'],
      microInteractions: 'Efecto de revelado suave en fotos de templos y botones con estilo de sellado artesanal.'
    },
    includedComponents: [
      'Hero con foto de Sacsayhuamán o Qorikancha y sellos oficiales',
      'Desglose del Boleto Turístico del Cusco (ingresos incluidos)',
      'Perfil y biografía del guía arqueólogo colegiado',
      'Itinerario cronológico de 4 horas con tiempos de traslado',
      'Recomendaciones sobre altura y vestimenta en iglesias',
      'Botón directo de WhatsApp para coordinar recojo en hotel'
    ],
    replication: {
      coreDifference: 'Diseñado para patrimonio arqueológico y turismo cultural. A diferencia del estilo corporativo o de aventura, transmite reverencia histórica y autenticidad colonial mediante un escudo heráldico con icono Landmark, crónicas escritas por guías colegiados acreditados y total transparencia sobre el Boleto Turístico del Cusco (BTC).',
      layoutArchetype: 'Heritage Municipal Album: Header Atardecer Andino con Escudo Heráldico + Trío de Iconos Circulares de Acción Rápida + Crónicas Históricas + Fichas de Territorio Arqueológico + Perfil Guía Historiador + Libro de Oro.',
      containerWidth: 'max-w-7xl mx-auto px-4 sm:px-8 (Cabecera monumental) y max-w-4xl mx-auto (Textos centrales)',
      baseBackground: 'bg-[#FFFDF9] suave y luminoso con cabecera en bg-stone-900 / red-950',
      colorTokens: [
        { token: 'colonial-crimson', hex: '#B91C1C', role: 'Botones primarios con degradado carmesí incaico', tailwindClass: 'bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white' },
        { token: 'parchment-canvas', hex: '#FFFDF9', role: 'Fondo lienzo tipo papel antiguo de archivo', tailwindClass: 'bg-[#FFFDF9] text-stone-800' },
        { token: 'megalithic-stone', hex: '#1C1917', role: 'Cabecera atardecer y textos solemnes', tailwindClass: 'bg-stone-900 text-white' },
        { token: 'solar-ochre', hex: '#D97706', role: 'Soles, grecas andinas y detalles de oro inca', tailwindClass: 'text-amber-600 border-amber-400' },
        { token: 'heraldic-pink', hex: '#FECACA', role: 'Tipografía de escudo sobre fondos oscuros', tailwindClass: 'text-red-200 font-serif' },
        { token: 'deep-wine', hex: '#450A0A', role: 'Sombra y degradado crepuscular inferior', tailwindClass: 'to-red-950/75' }
      ],
      typographyRecipe: {
        headingFont: 'Cinzel / Merriweather / Georgia (Font-Serif Font-Black Italic)',
        bodyFont: 'Plus Jakarta Sans & Stone Serif (Medium 500 / Regular 400)',
        rules: 'Titulares en Serif solemne con itálica elegante y porte monumental ("Cusco Imperial"). Subtítulos en font-serif text-red-100 para evocar crónica literaria colonial.',
        sampleCode: 'text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight drop-shadow-xl text-white italic'
      },
      signatureEffects: [
        'Escudo heráldico con icono Landmark y bordes de cristal ("bg-red-600/30 backdrop-blur-md border border-red-400/50")',
        'Fondo panorámico con efecto Ken Burns suave ("transition-transform duration-1000 ease-out group-hover:scale-105")',
        'Trío de botones circulares de acción rápida en el centro del hero con halo pulsante en WhatsApp',
        'Degradado crepuscular andino "from-stone-950/70 via-stone-900/40 to-red-950/75"',
        'Insignia oficial de Guía Historiador Colegiado con carné COLITUR verificado'
      ],
      heroStructure: 'Cabecera con atmósfera crepuscular sobre el valle sagrado: barra de navegación municipal con escudo a la izquierda, menú heráldico central y píldora de 5 idiomas a la derecha; al centro, gran titular en serif itálica con el trío de botones circulares de acceso directo.',
      conversionDriver: 'Genera autoridad académica y cultural inigualable. Los viajeros interesados en historia reservan con confianza al saber que su guía es un profesional titulado y no un intermediario improvisado.',
      keyTailwindSnippets: [
        {
          title: 'Botón Carmesí Inca con Pulso',
          code: 'bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-lg shadow-red-900/40 hover:shadow-red-900/60 transition-all'
        },
        {
          title: 'Escudo Heráldico Monumental',
          code: 'w-10 h-10 rounded-xl bg-red-600/30 backdrop-blur-md border border-red-400/50 flex items-center justify-center text-red-200 shadow-md'
        },
        {
          title: 'Botón Circular con Beacon Ring',
          code: 'w-11 h-11 rounded-full bg-black/45 hover:bg-red-900/90 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg'
        }
      ]
    }
  },
  {
    id: 'premium',
    name: '5. Cusco Luxury Collection VIP',
    subtitle: 'Diseño crepuscular en modo oscuro con acentos de Oro Imperial, concierge privado y cotizador para experiencias de alto ticket.',
    category: 'Alta Gama & VIP',
    template: 'premium',
    recommendedTier: 'advance',
    targetTour: 'Machu Picchu Hiram Bingham VIP, Vuelos en Helicóptero, Glamping de Lujo, Trenes Belmond',
    demoSlug: 'cusco-luxury-collection',
    likesCount: 3150,
    previewImage: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2070&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop'
    ],
    tags: ['Diseño 5', 'Dark Mode Luxury', 'Detalles en Oro', 'Fotos a Contraluz', 'Atención VIP'],
    targetAudience: 'Viajeros de ultra lujo, ejecutivos, celebridades y familias que buscan privacidad total y servicios 5 estrellas.',
    conversionImpact: '+28% en solicitudes de cotizaciones personalizadas de más de $1,000 USD',
    differenceHighlight: 'Dark Mode Luxury con resplandor dorado, tipografía imperial ultra espaciada, concierge 24/7 y cotizador VIP.',
    benefits: [
      {
        title: 'Estatus y Exclusividad Inmediata',
        description: 'El diseño en modo oscuro con acentos dorados comunica distinción y excelencia desde el primer vistazo.',
        badge: 'Ultra VIP'
      },
      {
        title: 'Formulario de Cotización Privada',
        description: 'Modal elegante para solicitar itinerarios a medida con selección de hoteles de lujo (Belmond) y tren privado.',
        badge: 'Cotizador VIP'
      },
      {
        title: 'Módulo de Privilegios Exclusivos',
        description: 'Sección para vagón de tren Hiram Bingham, traslados en Mercedes-Benz privados y concierge 24/7.',
        badge: 'Servicio 5★'
      },
      {
        title: 'Canal VIP de Respuesta Rápida',
        description: 'Enlace directo a asistente ejecutivo personal con soporte telefónico y por WhatsApp.',
        badge: 'Concierge 24/7'
      }
    ],
    colorPalette: [
      { name: 'Negro Obsidiana Profundo', hex: '#0A080E', role: 'Lienzo absoluto en modo oscuro (Dark Mode) sin distracciones que realza la fotografía' },
      { name: 'Oro Imperial Belmond', hex: '#F59E0B', role: 'Corona VIP, bordes luminosos y botones de concierge (amber-500 / amber-400)' },
      { name: 'Champán Luminoso & Candelabros', hex: '#FDE68A', role: 'Tipografía de lujo con degradado metálico dorado y líneas de acento' },
      { name: 'Superficie Carbón Crepuscular', hex: '#120E18', role: 'Tarjetas flotantes con resplandor difuso y sombra profunda (neutral-900)' },
      { name: 'Verde Esmeralda Oxigenoterapia', hex: '#34D399', role: 'Pulso de salidas confirmadas y asistencia médica continua 24/7' },
      { name: 'Resplandor Ámbar Ambiental', hex: 'rgba(245,158,11,0.18)', role: 'Orbes de luz cálida desenfocada en el fondo (blur 140px) para calidez nocturna' }
    ],
    typography: {
      headingFont: 'Cinzel Decorative / Cormorant Garamond',
      bodyFont: 'Plus Jakarta Sans (Light 300 / Regular 400) & Mono',
      category: 'Serif Imperial & Sans-Serif Minimalista',
      sampleTitle: 'HIRAM BINGHAM & SANTUARIO HISTÓRICO EN PRIVADO',
      hierarchyNotes: 'Titulares en tipografía imperial con interlineado generoso, reflejando el estándar de la alta hotelería internacional.'
    },
    style: {
      aestheticName: 'Dark Mode Luxury & Golden Glow',
      description: 'Atmósfera cinematográfica crepuscular. Fondo oscuro elegante donde las fotos resaltan con sutil resplandor dorado.',
      layoutPattern: 'Hero cinematográfico 100vh + Tarjetas con glow dorado + Mosaico crepuscular',
      spacingAndBorders: 'Bordes en oro muy fino (border-amber-500/20) y sombras profundas con destellos dorados.',
      visualElements: ['Bordes con resplandor dorado', 'Corona de servicio VIP', 'Insignia de mayordomo privado', 'Orbes ámbar blur-[140px]'],
      microInteractions: 'Efecto hover con destello dorado gradual, transiciones sedosas y animaciones sobrias.'
    },
    includedComponents: [
      'Hero cinematográfico con botón "Solicitar Concierge"',
      'Módulo de privilegios (Vagón Hiram Bingham, Belmond Lodge)',
      'Galería fotográfica crepuscular de alta definición',
      'Asistente personal y anfitrión asignado para el grupo',
      'Modal de cotización para familias y grupos VIP',
      'Contacto directo por canal reservado de WhatsApp'
    ],
    replication: {
      coreDifference: 'Diseñado exclusivamente para el segmento de ultra lujo y alto ticket ($500 - $2,500+ USD por pasajero). A diferencia de los otros 4 modelos, elimina por completo los elementos masivos; sustituye la compra impulsiva por un servicio de Concierge Privado, transporte en SUV privada climatizada, vagones Belmond Hiram Bingham y hoteles 5 estrellas (Belmond Sanctuary Lodge).',
      layoutArchetype: 'Ultra-Luxury Dark Chamber: Barra Live de Temporada con Pulso + Header con Corona de Oro y Tracking Espaciado + Orbes de Luz Ámbar + Hero Cinematográfico + Galería Sensorial (Amanecer, Brindis, Gastronomía) + Catálogo VIP Privado + Modal Concierge 24/7.',
      containerWidth: 'max-w-6xl mx-auto px-4 sm:px-8 (Composición boutique y aristocrática)',
      baseBackground: 'bg-[#0a080e] oscuro integral con orbes amber-500/18 en blur-[140px]',
      colorTokens: [
        { token: 'obsidian-black', hex: '#0A080E', role: 'Fondo negro mate integral que resalta la fotografía', tailwindClass: 'bg-[#0a080e] text-neutral-100' },
        { token: 'imperial-gold', hex: '#F59E0B', role: 'Corona VIP, bordes luminosos y botones de concierge', tailwindClass: 'text-amber-400 border-amber-500/25 bg-amber-500 hover:bg-amber-400 text-black' },
        { token: 'champagne-glow', hex: '#FDE68A', role: 'Tipografía de lujo con degradado metálico dorado', tailwindClass: 'text-amber-200 bg-clip-text' },
        { token: 'carbon-surface', hex: '#120E18', role: 'Tarjetas flotantes con resplandor difuso', tailwindClass: 'bg-[#0a080e]/92 border-amber-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.6)]' },
        { token: 'emerald-vip', hex: '#34D399', role: 'Pulso de salidas confirmadas y oxigenoterapia', tailwindClass: 'text-emerald-300' },
        { token: 'ambient-amber', hex: 'rgba(245,158,11,0.18)', role: 'Luces cálidas desenfocadas de fondo (blur 140px)', tailwindClass: 'bg-amber-500/18 blur-[140px]' }
      ],
      typographyRecipe: {
        headingFont: 'Cinzel Decorative / Cormorant Garamond (Font-Serif)',
        bodyFont: 'Plus Jakarta Sans (Light 300 / Regular 400) & Font-Mono (Etiquetas Concierge)',
        rules: 'Titulares aristocráticos con tracking generoso de hasta 0.25em (tracking-[0.2em] / tracking-[0.25em]) y degradado metálico de oro champán. Etiquetas en mayúsculas compactas con tipografía monoespaciada para sensación de membrecía.',
        sampleCode: 'font-serif tracking-[0.2em] uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400'
      },
      signatureEffects: [
        'Orbes de luz cálida desenfocada en el fondo ("w-[1000px] h-[600px] bg-gradient-to-b from-amber-500/18 blur-[140px]")',
        'Icono de Corona con resplandor dorado ("drop-shadow-[0_2px_8px_rgba(245,158,11,0.6)]")',
        'Barra de navegación sticky en vidrio negro ahumado ("bg-[#0a080e]/92 backdrop-blur-xl border-amber-500/20")',
        'Subrayado animado dorado en hover de enlaces ("w-0 h-px bg-amber-400 group-hover:w-full transition-all")',
        'Tarjetas sensoriales a contraluz con iconos de copa de vino, sol amanecer y gastronomía de autor'
      ],
      heroStructure: 'Hero crepuscular inmersivo con badge de miembros VIP, titular dorado en dos líneas, selector de pasajeros/suite privada, ficha de inversión en dólares con chofer privado incluido y botón de contacto con Concierge Personal 24/7.',
      conversionDriver: 'Genera una percepción de exclusividad inaccesible para agencias comunes. El cliente de alto poder adquisitivo no compara precios sino nivel de privacidad, confort y atención personalizada.',
      keyTailwindSnippets: [
        {
          title: 'Texto Metálico Oro Champán',
          code: 'font-serif tracking-[0.2em] uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400'
        },
        {
          title: 'Orbe de Iluminación Ambiental',
          code: 'absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-amber-500/18 via-amber-600/8 to-transparent blur-[140px] rounded-full'
        },
        {
          title: 'Corona VIP con Destello Ámbar',
          code: 'w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/30 via-amber-500/15 to-transparent border border-amber-400/50 flex items-center justify-center text-amber-300 shadow-[0_0_18px_rgba(245,158,11,0.3)]'
        }
      ]
    }
  }
];

export default function PinterestGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDesignForModal, setSelectedDesignForModal] = useState<LandingDesign | null>(null);
  const [modalTab, setModalTab] = useState<'benefits' | 'colors' | 'typography' | 'style' | 'components' | 'replication'>('benefits');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [likes, setLikes] = useState<{ [key: string]: number }>(
    AVAILABLE_DESIGNS.reduce((acc, d) => ({ ...acc, [d.id]: d.likesCount }), {})
  );
  const [userLiked, setUserLiked] = useState<{ [key: string]: boolean }>({});

  const categories = [
    'all', 
    'Alta Conversión & Portal Oficial',
    'Editorial & Storytelling', 
    'Trekking & Expedición', 
    'Cultura & Tradición', 
    'Alta Gama & VIP'
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
        design.differenceHighlight.toLowerCase().includes(query) ||
        design.tags.some(t => t.toLowerCase().includes(query)) ||
        design.typography.headingFont.toLowerCase().includes(query) ||
        design.style.aestheticName.toLowerCase().includes(query) ||
        design.colorPalette.some(c => c.name.toLowerCase().includes(query));
      
      return matchCategory && matchTier && matchSearch;
    });
  }, [selectedCategory, selectedTier, searchQuery]);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
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

  const copySnippet = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const copyFullBlueprint = (design: LandingDesign) => {
    const text = `# Blueprint de Replicación Técnica: ${design.name}
Arquetipo: ${design.replication.layoutArchetype}
Diferenciación Clave: ${design.replication.coreDifference}

## 1. Contenedores y Lienzo Base
- Fondo Base: ${design.replication.baseBackground}
- Ancho de Contenedor: ${design.replication.containerWidth}

## 2. Paleta y Tokens de Color Tailwind
${design.replication.colorTokens.map(c => `- ${c.token}: ${c.hex} | Clase: ${c.tailwindClass} (${c.role})`).join('\n')}

## 3. Receta Tipográfica
- Titulares: ${design.replication.typographyRecipe.headingFont}
- Cuerpo: ${design.replication.typographyRecipe.bodyFont}
- Reglas: ${design.replication.typographyRecipe.rules}
- Clase de Ejemplo: ${design.replication.typographyRecipe.sampleCode}

## 4. Efectos Visuales de Firma
${design.replication.signatureEffects.map(e => `- ${e}`).join('\n')}

## 5. Anatomía del Hero
${design.replication.heroStructure}

## 6. Motor Psicológico de Conversión
${design.replication.conversionDriver}

## 7. Snippets Clave de Tailwind
${design.replication.keyTailwindSnippets.map(s => `### ${s.title}\n\`\`\`html\n${s.code}\n\`\`\``).join('\n\n')}
`;
    navigator.clipboard.writeText(text);
    setCopiedCode('full-blueprint');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const openModal = (design: LandingDesign, initialTab: 'benefits' | 'colors' | 'typography' | 'style' | 'components' | 'replication' = 'benefits') => {
    setSelectedDesignForModal(design);
    setModalTab(initialTab);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 selection:bg-blue-600 selection:text-white animate-in fade-in duration-300">
      
      {/* 1. HEADER HERO: COMPACTO, ELEGANTE Y ORDENADO CON IDENTIDAD DE SOFTWARE */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider border border-blue-500/40">
              <LayoutTemplate size={13} className="text-sky-400" />
              <span>Catálogo de Diseños & Fichas de Replicación</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Diseños Disponibles para <span className="text-sky-400">Landing Pages</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Explora nuestros <strong>5 arquetipos visuales y de conversión</strong> actualizados con sus <strong>paletas de colores reales en código</strong>, <strong>diferencias clave</strong> y <strong>especificaciones técnicas completas</strong> para que puedas entenderlos y replicarlos con total fidelidad.
            </p>
          </div>

          {/* Quick Metrics Badge Row */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
              <span className="text-xl font-black text-white block leading-none">5</span>
              <span className="text-[11px] text-slate-400 font-semibold mt-1 block">Diseños Listos</span>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
              <span className="text-xl font-black text-sky-400 block leading-none">100%</span>
              <span className="text-[11px] text-slate-400 font-semibold mt-1 block">Replicables</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BARRA DE CONTROL: BÚSQUEDA Y FILTROS ESTRUCTURADOS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
          
          {/* Buscador */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Buscar diseño, color, token o tipografía..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filtros por Plan */}
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
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tier === 'all' ? 'Todos' : tier}
              </button>
            ))}
          </div>

        </div>

        {/* Categorías en fila limpia */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
            Estilo:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat === 'all' ? 'Todos los Estilos (5)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. GRID PRINCIPAL DE TARJETAS ORDENADAS Y UNIFORMES */}
      {filteredDesigns.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <LayoutTemplate size={36} className="mx-auto text-slate-300" />
          <h3 className="text-sm font-bold text-slate-700">No hay diseños que coincidan con la búsqueda</h3>
          <p className="text-xs text-slate-500">Intenta restablecer los filtros para ver los 5 diseños.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSelectedTier('all'); setSearchQuery(''); }}
            className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigns.map((design) => {
            const isLiked = userLiked[design.id];
            const currentLikes = likes[design.id];
            const isFirstOption = design.id === 'peru-portal-agency';

            return (
              <div
                key={design.id}
                className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg ${
                  isFirstOption 
                    ? 'border-blue-500/60 ring-2 ring-blue-500/20' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Foto Preview & Badges */}
                  <div className="relative w-full h-52 bg-slate-900 overflow-hidden">
                    <Image
                      src={design.previewImage}
                      alt={design.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/15" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/15">
                          Plan {design.recommendedTier.toUpperCase()}
                        </span>
                        {isFirstOption && (
                          <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1 shadow-xs">
                            <Crown size={11} /> Diseño 1
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleLike(design.id, e)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md flex items-center gap-1 transition-colors cursor-pointer ${
                          isLiked 
                            ? 'bg-rose-600 text-white' 
                            : 'bg-black/70 text-white hover:bg-rose-600'
                        }`}
                      >
                        <Heart size={12} fill={isLiked ? 'currentColor' : 'none'} />
                        <span>{currentLikes}</span>
                      </button>
                    </div>

                    {/* Bottom Image Info */}
                    <div className="absolute bottom-3 left-3 right-3 z-10 text-white space-y-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                        {design.category}
                      </span>
                      <h3 className="font-bold text-base text-white leading-snug drop-shadow-xs line-clamp-1">
                        {design.name}
                      </h3>
                    </div>
                  </div>

                  {/* Cuerpo de la tarjeta: Información Clara & Estructurada */}
                  <div className="p-4 sm:p-5 space-y-3.5">
                    
                    {/* Diferencia Clave Destacada */}
                    <div className="bg-slate-900 text-white rounded-xl p-2.5 space-y-1 text-xs border border-slate-800">
                      <span className="font-black text-[9px] uppercase tracking-wider text-sky-400 flex items-center gap-1">
                        <Sparkles size={11} className="text-sky-400" />
                        Diferencia Clave:
                      </span>
                      <p className="text-[11px] text-slate-200 leading-snug font-medium">
                        {design.differenceHighlight}
                      </p>
                    </div>

                    {/* Subtítulo descriptivo */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {design.subtitle}
                    </p>

                    {/* Métrica de Conversión Destacada */}
                    <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-2 flex items-center gap-2 text-xs text-emerald-900">
                      <TrendingUp size={14} className="text-emerald-600 shrink-0" />
                      <span className="font-semibold text-[11px]">{design.conversionImpact}</span>
                    </div>

                    {/* Fila 1: Paleta de Colores Real */}
                    <div className="space-y-1.5 pt-1 border-t border-slate-100">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-700 flex items-center gap-1.5">
                          <Palette size={13} className="text-blue-600" />
                          Paleta Real en Código:
                        </span>
                        <button
                          type="button"
                          onClick={() => openModal(design, 'colors')}
                          className="text-[10px] font-bold text-slate-500 hover:text-blue-600 cursor-pointer"
                        >
                          Ver roles →
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {design.colorPalette.map((col, idx) => (
                          <div 
                            key={idx} 
                            className="group/color relative flex items-center"
                            title={`${col.name} (${col.hex}) - ${col.role}`}
                          >
                            <button
                              type="button"
                              onClick={() => copyToClipboard(col.hex)}
                              className="w-6 h-6 rounded-md border border-black/15 shadow-2xs transition-transform hover:scale-115 cursor-pointer flex items-center justify-center text-[8px] font-mono text-white/90"
                              style={{ backgroundColor: col.hex }}
                            >
                              <span className="opacity-0 group-hover/color:opacity-100 transition-opacity bg-black/70 px-0.5 rounded text-[7px]">
                                {copiedHex === col.hex ? '✓' : 'HEX'}
                              </span>
                            </button>
                          </div>
                        ))}
                        <span className="text-[10px] text-slate-400 font-medium ml-1">
                          {design.colorPalette.length} tonos
                        </span>
                      </div>
                    </div>

                    {/* Fila 2: Tipografía & Estilo */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
                      <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                        <span className="text-[9px] font-bold text-slate-400 uppercase block">
                          Tipografía
                        </span>
                        <span className="font-bold text-slate-800 text-[11px] truncate block" title={design.typography.headingFont}>
                          {design.typography.headingFont.split(' ')[0]} {design.typography.headingFont.split(' ')[1] || ''}
                        </span>
                      </div>

                      <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                        <span className="text-[9px] font-bold text-slate-400 uppercase block">
                          Estilo Visual
                        </span>
                        <span className="font-bold text-slate-800 text-[11px] truncate block" title={design.style.aestheticName}>
                          {design.style.aestheticName.split(' ')[0]} {design.style.aestheticName.split(' ')[1] || ''}
                        </span>
                      </div>
                    </div>

                    {/* Botones para Abrir Ficha Técnica y Guía de Replicación */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => openModal(design, 'benefits')}
                        className="py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <Info size={12} className="text-blue-600" />
                        <span>Ficha Técnica</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => openModal(design, 'replication')}
                        className="py-2 px-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 font-bold text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <Code size={12} className="text-blue-600" />
                        <span>Cómo Replicarlo</span>
                      </button>
                    </div>

                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="p-4 pt-0 border-t border-slate-100 mt-2 grid grid-cols-2 gap-2">
                  <Link
                    href={`/demo/preview?slug=${design.demoSlug}`}
                    className="py-2.5 px-3 rounded-xl border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <Eye size={13} />
                    <span>Ver Demo</span>
                  </Link>

                  <Link
                    href={`/demo/new?tier=${design.recommendedTier}&template=${design.template}`}
                    className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-xs cursor-pointer"
                  >
                    <span>Crear Landing</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* 4. MODAL DETALLADO DE FICHA TÉCNICA & REPLICACIÓN */}
      {selectedDesignForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col justify-between">
            
            {/* Header del Modal */}
            <div>
              <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4 sticky top-0 bg-white/95 backdrop-blur-md z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Plan {selectedDesignForModal.recommendedTier.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      Plantilla: <code className="text-blue-600 font-mono">{selectedDesignForModal.template}</code>
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                    {selectedDesignForModal.name}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedDesignForModal(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors shrink-0"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Pestañas de Navegación del Modal */}
              <div className="flex items-center gap-1 p-2 sm:p-3 bg-slate-50 border-b border-slate-100 overflow-x-auto scrollbar-none">
                <button
                  type="button"
                  onClick={() => setModalTab('benefits')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    modalTab === 'benefits'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Target size={13} />
                  <span>Beneficios</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModalTab('replication')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    modalTab === 'replication'
                      ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                      : 'text-blue-700 bg-blue-50/70 hover:bg-blue-100 border border-blue-200/60'
                  }`}
                >
                  <Code size={13} />
                  <span>Guía de Replicación</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModalTab('colors')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    modalTab === 'colors'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Palette size={13} />
                  <span>Colores & HEX</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModalTab('typography')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    modalTab === 'typography'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Type size={13} />
                  <span>Tipografía</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModalTab('style')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    modalTab === 'style'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LayoutTemplate size={13} />
                  <span>Estilos & Layout</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModalTab('components')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    modalTab === 'components'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layers size={13} />
                  <span>Componentes</span>
                </button>
              </div>

              {/* Contenido Dinámico de la Pestaña en Modal */}
              <div className="p-5 sm:p-6 space-y-4">
                
                {/* 1. GUÍA DE REPLICACIÓN TÉCNICA (NUEVO & DETALLADO) */}
                {modalTab === 'replication' && (
                  <div className="space-y-5 animate-in fade-in duration-150">
                    
                    {/* Tarjeta de Diferenciación Central */}
                    <div className="bg-slate-950 text-white rounded-2xl p-5 border border-slate-800 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-black text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Terminal size={14} className="text-sky-400" />
                          Diferencia Clave Frente a los Otros 4 Diseños
                        </span>
                        <button
                          type="button"
                          onClick={() => copyFullBlueprint(selectedDesignForModal)}
                          className="px-2.5 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-[10px] font-bold border border-sky-500/30 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          {copiedCode === 'full-blueprint' ? (
                            <>
                              <Check size={11} className="text-emerald-400" />
                              <span className="text-emerald-400">¡Blueprint Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={11} />
                              <span>Copiar Blueprint Completo</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        {selectedDesignForModal.replication.coreDifference}
                      </p>
                    </div>

                    {/* Especificaciones de Maquetación y Contenedores */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                          Arquetipo de Layout:
                        </span>
                        <strong className="text-slate-800 text-[11px] block leading-snug">
                          {selectedDesignForModal.replication.layoutArchetype}
                        </strong>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                          Ancho de Contenedor & Fondo Base:
                        </span>
                        <p className="text-slate-700 text-[11px] font-mono leading-snug">
                          {selectedDesignForModal.replication.containerWidth}
                        </p>
                        <p className="text-slate-500 text-[10px] font-mono">
                          Lienzo: {selectedDesignForModal.replication.baseBackground}
                        </p>
                      </div>
                    </div>

                    {/* Tokens de Color Tailwind para Replicar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                          <Palette size={13} className="text-blue-600" />
                          Tokens de Color Exactos para Replicar (CSS / Tailwind):
                        </span>
                        <span className="text-[10px] text-slate-400">Click en la clase para copiar</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedDesignForModal.replication.colorTokens.map((ct, idx) => (
                          <div 
                            key={idx}
                            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span 
                                className="w-5 h-5 rounded-md border border-black/15 shadow-2xs shrink-0" 
                                style={{ backgroundColor: ct.hex }} 
                              />
                              <div className="min-w-0">
                                <span className="text-[10px] font-bold text-slate-800 font-mono block truncate">
                                  {ct.token} ({ct.hex})
                                </span>
                                <span className="text-[9px] text-slate-500 truncate block">
                                  {ct.role}
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => copySnippet(ct.token, ct.tailwindClass)}
                              className="px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-[9px] font-mono font-bold text-slate-700 flex items-center gap-1 cursor-pointer shrink-0"
                            >
                              {copiedCode === ct.token ? (
                                <Check size={10} className="text-emerald-600" />
                              ) : (
                                <Copy size={10} />
                              )}
                              <span>Clase</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Receta Tipográfica Exacta */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                        Receta Tipográfica & Jerarquía:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                          <span className="text-[9px] text-slate-400 block uppercase font-bold">Titulares:</span>
                          <strong className="text-slate-900 text-xs">{selectedDesignForModal.replication.typographyRecipe.headingFont}</strong>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                          <span className="text-[9px] text-slate-400 block uppercase font-bold">Cuerpo & Datos:</span>
                          <strong className="text-slate-900 text-xs">{selectedDesignForModal.replication.typographyRecipe.bodyFont}</strong>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed pt-1">
                        {selectedDesignForModal.replication.typographyRecipe.rules}
                      </p>
                      <div className="bg-slate-900 text-white p-2.5 rounded-lg font-mono text-[10px] overflow-x-auto">
                        <code>{selectedDesignForModal.replication.typographyRecipe.sampleCode}</code>
                      </div>
                    </div>

                    {/* Efectos Visuales de Firma */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 block">
                        Efectos Visuales de Firma (Must-Have para Replicar):
                      </span>
                      <ul className="space-y-1.5 text-xs">
                        {selectedDesignForModal.replication.signatureEffects.map((eff, idx) => (
                          <li key={idx} className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-2 text-amber-950">
                            <Sparkles size={14} className="text-amber-600 shrink-0 mt-0.5" />
                            <span className="text-[11px] font-medium leading-relaxed">{eff}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Anatomía del Hero y Motor de Conversión */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                          Anatomía del Hero:
                        </span>
                        <p className="text-[11px] text-slate-700 leading-relaxed">
                          {selectedDesignForModal.replication.heroStructure}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                          Mecánica Psicológica de Conversión:
                        </span>
                        <p className="text-[11px] text-emerald-950 leading-relaxed">
                          {selectedDesignForModal.replication.conversionDriver}
                        </p>
                      </div>
                    </div>

                    {/* Snippets Clave de Código Tailwind */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 block">
                        Snippets de Código Tailwind Listos para Copiar:
                      </span>
                      <div className="space-y-2">
                        {selectedDesignForModal.replication.keyTailwindSnippets.map((snip, idx) => (
                          <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden text-white">
                            <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[10px]">
                              <span className="font-bold text-sky-300 font-mono">{snip.title}</span>
                              <button
                                type="button"
                                onClick={() => copySnippet(snip.title, snip.code)}
                                className="text-[9px] text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer font-bold"
                              >
                                {copiedCode === snip.title ? (
                                  <>
                                    <Check size={11} className="text-emerald-400" />
                                    <span className="text-emerald-400">Copiado</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy size={11} />
                                    <span>Copiar Snippet</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <div className="p-3 font-mono text-[10px] text-slate-300 overflow-x-auto leading-relaxed">
                              <code>{snip.code}</code>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* 2. BENEFICIOS */}
                {modalTab === 'benefits' && (
                  <div className="space-y-4">
                    <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 space-y-1 text-xs">
                      <span className="font-bold text-amber-900 flex items-center gap-1.5">
                        <Users size={14} className="text-amber-600" />
                        Público Objetivo & Nicho de Mercado:
                      </span>
                      <p className="text-amber-800 text-[11px] leading-relaxed">
                        {selectedDesignForModal.targetAudience}
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                        Beneficios de Conversión & Negocio:
                      </span>
                      {selectedDesignForModal.benefits.map((b, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                              <Zap size={13} className="text-sky-500" />
                              {b.title}
                            </span>
                            {b.badge && (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-600">
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

                {/* 3. COLORES */}
                {modalTab === 'colors' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        Paleta cromática con su función psicológica y comercial:
                      </span>
                      <span className="text-[10px] text-sky-600 font-bold">
                        Click para copiar código HEX
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedDesignForModal.colorPalette.map((col, idx) => (
                        <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                          <div 
                            className="w-10 h-10 rounded-xl border border-black/10 shadow-xs shrink-0" 
                            style={{ backgroundColor: col.hex }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-bold text-slate-900 truncate">{col.name}</span>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(col.hex)}
                                className="text-[10px] font-mono font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1 px-1.5 py-0.5 rounded bg-white border border-slate-200 cursor-pointer"
                              >
                                {copiedHex === col.hex ? (
                                  <>
                                    <Check size={11} className="text-emerald-600" />
                                    <span className="text-emerald-600">Copiado</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy size={11} />
                                    <span>{col.hex}</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                              {col.role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. TIPOGRAFÍA */}
                {modalTab === 'typography' && (
                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-slate-950 text-white space-y-3">
                      <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                        <span>Espécimen Tipográfico</span>
                        <span className="text-amber-400 font-mono">{selectedDesignForModal.typography.category}</span>
                      </div>
                      <p className="text-lg sm:text-xl font-black tracking-tight text-white leading-snug">
                        "{selectedDesignForModal.typography.sampleTitle}"
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs pt-2 border-t border-slate-800 text-stone-300">
                        <div>
                          <span className="text-[10px] text-stone-500 block uppercase">Titulares:</span>
                          <strong className="text-amber-300">{selectedDesignForModal.typography.headingFont}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-500 block uppercase">Cuerpo:</span>
                          <strong className="text-white">{selectedDesignForModal.typography.bodyFont}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                        Estrategia Tipográfica & Legibilidad:
                      </span>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {selectedDesignForModal.typography.hierarchyNotes}
                      </p>
                    </div>
                  </div>
                )}

                {/* 5. ESTILOS */}
                {modalTab === 'style' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <span className="text-xs font-bold text-slate-900 block">
                        {selectedDesignForModal.style.aestheticName}
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {selectedDesignForModal.style.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
                          Patrón de Layout:
                        </span>
                        <span className="text-[11px] text-slate-700 font-medium">
                          {selectedDesignForModal.style.layoutPattern}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
                          Micro-interacciones:
                        </span>
                        <span className="text-[11px] text-slate-700 font-medium">
                          {selectedDesignForModal.style.microInteractions}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                        Elementos Visuales Destacados:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedDesignForModal.style.visualElements.map((el, idx) => (
                          <span key={idx} className="text-[11px] bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-md font-medium">
                            ✨ {el}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. COMPONENTES */}
                {modalTab === 'components' && (
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      Módulos y Secciones Incluidas en Código:
                    </span>
                    <ul className="grid grid-cols-1 gap-2 text-xs text-slate-700">
                      {selectedDesignForModal.includedComponents.map((comp, idx) => (
                        <li key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                          <CheckCircle2 size={15} className="text-sky-500 shrink-0 mt-0.5" />
                          <span className="text-[11px] font-medium leading-tight">{comp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            </div>

            {/* Footer del Modal con Acciones */}
            <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50 rounded-b-3xl flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedDesignForModal(null)}
                className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 cursor-pointer"
              >
                Cerrar
              </button>

              <div className="flex items-center gap-2">
                <Link
                  href={`/demo/preview?slug=${selectedDesignForModal.demoSlug}`}
                  className="py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-white text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye size={14} />
                  <span>Ver Previsualización</span>
                </Link>

                <Link
                  href={`/demo/new?tier=${selectedDesignForModal.recommendedTier}&template=${selectedDesignForModal.template}`}
                  className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/25 cursor-pointer"
                >
                  <span>Crear Landing</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 5. AVISO DE CÓDIGO MODULAR EN EL REPOSITORIO */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 text-white rounded-2xl p-6 border border-slate-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sky-400 text-[11px] font-bold uppercase tracking-wider">
            <ShieldCheck size={15} />
            <span>Código Modular en src/templates/</span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Todas las plantillas están disponibles en código modular (<code className="text-emerald-400 font-mono">AgencyPortalTemplate</code>, <code className="text-emerald-400 font-mono">BohoTemplate</code>, <code className="text-emerald-400 font-mono">AdventureTemplate</code>, <code className="text-emerald-400 font-mono">CulturalTemplate</code> y <code className="text-emerald-400 font-mono">PremiumTemplate</code>).
          </p>
        </div>

        <Link
          href="/demo/new"
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md shadow-blue-600/30 shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <Sparkles size={14} />
          <span>Generar Nueva Landing</span>
        </Link>
      </div>

    </div>
  );
}
