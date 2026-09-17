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
  Info
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
  likesCount: number;
  previewImage: string;
  gridSampleImages: string[];
  tags: string[];
  targetAudience: string;
  conversionImpact: string;
  
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
    likesCount: 3840,
    previewImage: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=2070&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop'
    ],
    tags: ['Hero Vinicunca', 'Botones Naranjas', 'Sellos DIRCETUR', 'Alta Conversión'],
    targetAudience: 'Agencias turísticas formales, operadores receptivos y agencias que invierten en pauta de Facebook, Instagram o Google Ads.',
    conversionImpact: '+42% en contactos calificados y reservas multidía',
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
        description: 'Acordeón interactivo con las 8 preguntas críticas (aclimatación, maletas, pagos) para reducir consultas repetitivas.',
        badge: 'Ahorro Soporte'
      }
    ],
    colorPalette: [
      { name: 'Naranja Fuego', hex: '#FF5500', role: 'Acento de conversión y botones CTA principales' },
      { name: 'Carbón Andino', hex: '#1C1917', role: 'Fondos oscuros de alto contraste y textos jerárquicos' },
      { name: 'Crema Arena', hex: '#F9F7F4', role: 'Fondo suave de lectura para tarjetas y secciones' },
      { name: 'Verde Safe Travels', hex: '#10B981', role: 'Sellos de garantía y certificación turística' }
    ],
    typography: {
      headingFont: 'Plus Jakarta Sans (ExtraBold 800)',
      bodyFont: 'Inter (Regular 400 / Medium 500)',
      category: 'Sans-Serif Geométrica Moderna',
      sampleTitle: 'DESCUBRE LA MAGIA DE LOS ANDES CON GUÍAS OFICIALES',
      hierarchyNotes: 'Titulares en mayúsculas compactas con tracking negativo (-0.02em) para presencia monumental y lectura ágil en móviles.'
    },
    style: {
      aestheticName: 'Corporate Neobrutalism Suave',
      description: 'Líneas limpias, sombras nítidas, contrastes potentes entre naranja y negro carbón con esquinas de 24px que transmiten orden.',
      layoutPattern: 'Hero panorámico + Barra de métricas 3 columnas + Grid de tours destacados + Banner sticky',
      spacingAndBorders: 'Bordes redondeados de 24px (rounded-3xl) y bordes sutiles de 1px en slate-200.',
      visualElements: ['Badges de estrellas TripAdvisor', 'Sellos oficiales DIRCETUR', 'Acordeón FAQ animado'],
      microInteractions: 'Botón con pulso suave de atención, elevación en hover y feedback táctil.'
    },
    includedComponents: [
      'Hero con imagen panorámica y badge oficial',
      'Barra de métricas (+10,000 viajeros, 10+ años)',
      'Grid de tours con precios en USD y botón de reserva',
      'Módulo de seguridad con RUC y guías colegiados',
      'Acordeón interactivo de Preguntas Frecuentes',
      'Banner naranja gigante con botón directo a WhatsApp'
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
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop'
    ],
    tags: ['Polaroids Inclinadas', 'Washi Tape', 'Notas de Campo', 'Pinterest Aesthetic'],
    targetAudience: 'Turistas jóvenes, parejas, fotógrafos, nómadas digitales y viajeros visuales que comparten contenido en Instagram y Pinterest.',
    conversionImpact: '+65% en tiempo de permanencia en página y tasa de guardado',
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
      }
    ],
    colorPalette: [
      { name: 'Arena Cálida', hex: '#FAF7F2', role: 'Fondo suave estilo papel de acuarela o cuaderno de campo' },
      { name: 'Terracota Boho', hex: '#C86D51', role: 'Tono primario para sellos, botones y acentos cálidos' },
      { name: 'Verde Eucalipto', hex: '#588157', role: 'Representación de naturaleza, flora andina y lagunas' },
      { name: 'Cinta Washi', hex: '#E8DEC8', role: 'Detalle gráfico semitransparente que sujeta las polaroids' }
    ],
    typography: {
      headingFont: 'Playfair Display (Serif Elegante)',
      bodyFont: 'Plus Jakarta Sans (Limpio & Orgánico)',
      category: 'Serif Editorial + Sans-Serif Cálida',
      sampleTitle: 'Diario de Ruta: Laguna Humantay & Valles Glaciares',
      hierarchyNotes: 'Titulares en Serif clásica con cursivas románticas para notas de campo ("Notas del Guía") y datos claros en el itinerario.'
    },
    style: {
      aestheticName: 'Bohemian Travel Scrapbook',
      description: 'Atmósfera nostálgica y artesanal inspirada en cuadernos de viaje Moleskine, con polaroids rotadas sutilmente (-1° a 2°).',
      layoutPattern: 'Hero collage editorial + Muro de polaroids masonry + Itinerario como diario cronológico',
      spacingAndBorders: 'Efecto de papel con esquinas suaves, cinta washi semiopaca superpuesta en la parte superior.',
      visualElements: ['Polaroids con bordes blancos gruesos', 'Cinta washi adhesiva', 'Sellos postales andinos'],
      microInteractions: 'Efecto de enderezado y elevación al pasar el ratón sobre cada foto polaroid.'
    },
    includedComponents: [
      'Hero con collage asimétrico de polaroids y cinta washi',
      'Ficha técnica de la ruta con altitud y horas de caminata',
      'Itinerario maquetado como diario de campo cronológico',
      'Galería de fotos estilo Pinterest con contador de likes',
      'Módulo "¿Qué llevar en tu mochila?" con checklist visual',
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
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop'
    ],
    tags: ['Tipografía Serif', 'Collage Editorial', 'Citas Célebres', 'Filtro Mate'],
    targetAudience: 'Viajeros culturales exigentes, amantes del diseño, la gastronomía y la arquitectura; público internacional de alto poder adquisitivo.',
    conversionImpact: '+35% en valor percibido permitiendo comercializar tours con precios más altos',
    benefits: [
      {
        title: 'Elevación de Ticket Promedio',
        description: 'La estética de publicaciones como Kinfolk o Condé Nast Traveler justifica tarifas superiores.',
        badge: 'Ticket Alto'
      },
      {
        title: 'Sofisticación Visual con Espacio Negativo',
        description: 'Composiciones respirables y tipografía refinada que proyectan serenidad y exclusividad.',
        badge: 'Lujo Silencioso'
      },
      {
        title: 'Reseñas con Formato de Crítica Editorial',
        description: 'Testimonios presentados con estética de reseña periodística de alta reputación.',
        badge: 'Autoridad'
      }
    ],
    colorPalette: [
      { name: 'Blanco Nieve', hex: '#FFFFFF', role: 'Espacios negativos amplios que aportan aire y modernidad' },
      { name: 'Tierra Arcillosa', hex: '#9C583F', role: 'Acento terroso elegante para titulares y llamados' },
      { name: 'Gris Editorial', hex: '#44403C', role: 'Texto oscuro de alta legibilidad y sutileza visual' },
      { name: 'Dorado Suave', hex: '#D4AF37', role: 'Detalles mínimos de orfebrería y sellos de calidad' }
    ],
    typography: {
      headingFont: 'Cormorant Garamond / Playfair (Serif)',
      bodyFont: 'Inter (Ligero & Espaciado)',
      category: 'Serif Clásica de Lujo + Sans-Serif Minimalista',
      sampleTitle: 'EL VALLE SAGRADO: UN VIAJE A TRAVÉS DE LOS SENTIDOS',
      hierarchyNotes: 'Títulos principales en mayúsculas espaciadas (tracking +0.15em) con sutileza aristocrática y epígrafes en cursiva.'
    },
    style: {
      aestheticName: 'Kinfolk & Vogue Editorial Minimalism',
      description: 'Inspirado en publicaciones de arte y viajes de autor. Enfoque en la belleza plástica de los paisajes andinos sin estridencias.',
      layoutPattern: 'Cuadrícula asimétrica 2:1 + Citas destacadas a columna completa + Galería dorada',
      spacingAndBorders: 'Márgenes amplios y respirables, bordes limpios sin sombras pesadas y filtro con grano sutil.',
      visualElements: ['Líneas divisorias ultrafinas', 'Citas entrecomilladas gigantes', 'Numeración romana'],
      microInteractions: 'Transiciones ultra suaves al hacer hover y botones con subrayado animado.'
    },
    includedComponents: [
      'Portada estilo revista con titular principal y subtítulo poético',
      'Manifiesto de la experiencia y filosofía de viaje consciente',
      'Itinerario estructurado como capítulos de libro (Capítulo I, II, III)',
      'Galería fotográfica con pies de foto explicativos',
      'Módulo de reservación VIP con concierge privado'
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
      'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?q=80&w=2070&auto=format&fit=crop'
    ],
    tags: ['Altitud msnm', 'Coordenadas GPS', 'Insignias DIRCETUR', 'Outdoor Explorer'],
    targetAudience: 'Trekkeros, senderistas, montañistas y exploradores que necesitan certezas sobre seguridad física y equipo antes de reservar.',
    conversionImpact: '+50% en conversión de rutas exigentes gracias a la precisión técnica',
    benefits: [
      {
        title: 'Seguridad Técnica que Elimina Miedos',
        description: 'Muestra altitud máxima (ej. 4,630 msnm), dificultad, kilómetros y horas por día para disipar dudas físicas.',
        badge: 'Seguridad'
      },
      {
        title: 'Respaldo Médico & Oxígeno Garantizado',
        description: 'Destaca de inmediato la presencia de balón de oxígeno, botiquín de primeros auxilios y caballos de apoyo.',
        badge: 'Paz Mental'
      },
      {
        title: 'Checklist de Mochila Interactivo',
        description: 'Lista clasificada de ropa térmica, calzado adecuado y medicación para que el cliente viaje preparado.',
        badge: 'Equipamiento'
      }
    ],
    colorPalette: [
      { name: 'Esmeralda Alpino', hex: '#059669', role: 'Tono principal de naturaleza, bosques y valles andinos' },
      { name: 'Roca Volcánica', hex: '#1C1917', role: 'Fondo de alto impacto y texto para atmósfera de montaña' },
      { name: 'Gris Glaciar', hex: '#F5F5F4', role: 'Fondos técnicos y módulos de datos climáticos' },
      { name: 'Naranja Seguridad', hex: '#EA580C', role: 'Puntos críticos de ruta, alertas técnicas y CTA' }
    ],
    typography: {
      headingFont: 'Montserrat (ExtraBold 700/800)',
      bodyFont: 'Inter & Roboto Mono (Datos Numéricos)',
      category: 'Sans-Serif Industrial & Numeral Mono',
      sampleTitle: 'SALKANTAY TREK 5 DÍAS • PASO GLACIAR 4,630 MSNM',
      hierarchyNotes: 'Tipografía contundente para encabezados; los datos de elevación y clima usan fuente monoespaciada con estilo de reloj Garmin.'
    },
    style: {
      aestheticName: 'Alpine Technical HUD & Field Guide',
      description: 'Inspirado en marcas outdoor como Arc’teryx y The North Face. Robusto, funcional y respaldado en datos topográficos.',
      layoutPattern: 'Hero con HUD técnico + Ficha de elevación y mapa + Fotos con chips de GPS',
      spacingAndBorders: 'Bordes reforzados, tarjetas compactas con badges de dificultad física y señalética de senderos.',
      visualElements: ['Chips de brújula y altímetro', 'Insignias de aclimatación', 'Iconografía de montaña'],
      microInteractions: 'Animación en la barra de progreso del itinerario y hover dinámico sobre mapas.'
    },
    includedComponents: [
      'Hero con altitud máxima y chip de dificultad física',
      'Panel técnico de ruta (km totales, horas por día, desniveles)',
      'Protocolo de aclimatación y botiquín de altura',
      'Itinerario paso a paso con campamentos y comidas',
      'Checklist interactivo de equipaje para trekking',
      'Botón de reserva directa a WhatsApp con fecha tentativa'
    ]
  },
  {
    id: 'andean-craft',
    name: '5. Andean Heritage & Scrapbook',
    subtitle: 'Álbum Artesanal con Sellos Incas, Texturas Terracota e Historia Viva',
    category: 'Cultura & Tradición',
    template: 'cultural',
    recommendedTier: 'basic',
    targetTour: 'City Tour Cusco, Qorikancha, Sacsayhuamán, Maras & Moray, Rutas Arqueológicas',
    demoSlug: 'city-tour-cusco',
    likesCount: 1650,
    previewImage: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
    gridSampleImages: [
      'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop'
    ],
    tags: ['Sellos de Piedra', 'Texturas de Telar', 'Historia Viva', 'Scrapbook'],
    targetAudience: 'Familias, historiadores, amantes de la arqueología y la arquitectura colonial que valoran guías con títulos universitarios.',
    conversionImpact: '+40% en reservas directas de City Tour y paquetes arqueológicos',
    benefits: [
      {
        title: 'Autoridad con Guías Colegiados',
        description: 'Diferencia a la agencia destacando guías titulados y registrados en el Colegio de Licenciados de Turismo del Cusco.',
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
      hierarchyNotes: 'Títulos con porte solemne e histórico inspirados en inscripciones coloniales cusqueñas.'
    },
    style: {
      aestheticName: 'Andean Heritage Scrapbook',
      description: 'Combinación de textura de piedra inca pulida, sellos de la chakana y tonos cálidos de telares andinos.',
      layoutPattern: 'Hero con marco de piedra + Fichas por monumento + Perfil de guía anfitrión',
      spacingAndBorders: 'Marcos con relieve suave, esquinas redondeadas y detalles decorativos de grecas andinas.',
      visualElements: ['Sello de la Chakana incaica', 'Fichas arquitectónicas', 'Sellos de DIRCETUR y COLITUR'],
      microInteractions: 'Efecto de revelado suave en fotos de templos y botones con estilo de sellado artesanal.'
    },
    includedComponents: [
      'Hero con foto de Sacsayhuamán o Qorikancha y sellos oficiales',
      'Desglose del Boleto Turístico del Cusco (ingresos incluidos)',
      'Perfil y biografía del guía arqueólogo colegiado',
      'Itinerario cronológico de 4 horas con tiempos de traslado',
      'Recomendaciones sobre altura y vestimenta en iglesias',
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
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop'
    ],
    tags: ['Dark Mode Luxury', 'Detalles en Oro', 'Fotos a Contraluz', 'Atención VIP'],
    targetAudience: 'Viajeros de ultra lujo, ejecutivos, celebridades y familias que buscan privacidad total y servicios 5 estrellas.',
    conversionImpact: '+28% en solicitudes de cotizaciones personalizadas de más de $1,000 USD',
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
      hierarchyNotes: 'Titulares en tipografía imperial con interlineado generoso, reflejando el estándar de la alta hotelería internacional.'
    },
    style: {
      aestheticName: 'Dark Mode Luxury & Golden Glow',
      description: 'Atmósfera cinematográfica crepuscular. Fondo oscuro elegante donde las fotos resaltan con sutil resplandor dorado.',
      layoutPattern: 'Hero cinematográfico 100vh + Tarjetas con glow dorado + Mosaico crepuscular',
      spacingAndBorders: 'Bordes en oro muy fino (border-amber-500/20) y sombras profundas con destellos dorados.',
      visualElements: ['Bordes con resplandor dorado', 'Corona de servicio VIP', 'Insignia de mayordomo privado'],
      microInteractions: 'Efecto hover con destello dorado gradual, transiciones sedosas y animaciones sobrias.'
    },
    includedComponents: [
      'Hero cinematográfico con botón "Solicitar Concierge"',
      'Módulo de privilegios (Vagón Hiram Bingham, Belmond Lodge)',
      'Galería fotográfica crepuscular de alta definición',
      'Asistente personal y anfitrión asignado para el grupo',
      'Modal de cotización para familias y grupos VIP',
      'Contacto directo por canal reservado de WhatsApp'
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
    targetAudience: 'Mochileros en hostales, turistas con tiempo limitado y guías independientes que buscan reservas rápidas.',
    conversionImpact: '+55% en rapidez de reserva: el usuario contacta en menos de 20 segundos',
    benefits: [
      {
        title: 'Carga Relámpago (< 0.8s)',
        description: 'Optimizada al milisegundo para turistas que caminan por la Plaza de Armas con datos móviles lentos.',
        badge: '< 0.8s'
      },
      {
        title: 'Cero Fricción para Reservar',
        description: 'Sin formularios largos: un solo toque abre directamente la conversación de WhatsApp con fecha prellenada.',
        badge: '1 Toque'
      },
      {
        title: 'Píldoras Informativas al Grano',
        description: 'Punto de encuentro claro, horario de salida y política de propinas voluntarias sin confusiones.',
        badge: 'Claridad Total'
      }
    ],
    colorPalette: [
      { name: 'Blanco Lino', hex: '#FDFBF7', role: 'Fondo minimalista ultra liviano que ahorra batería y datos' },
      { name: 'Pizarra', hex: '#334155', role: 'Texto nítido de alto contraste para lectura a pleno sol' },
      { name: 'Verde WhatsApp', hex: '#25D366', role: 'El botón más visible para llamada a la acción inmediata' },
      { name: 'Gris Perla', hex: '#E2E8F0', role: 'Líneas y separadores limpios sin recargar la pantalla' }
    ],
    typography: {
      headingFont: 'Plus Jakarta Sans (Bold 700)',
      bodyFont: 'Inter (Regular 400)',
      category: 'Sans-Serif Funcional & Limpia',
      sampleTitle: 'FREE WALKING TOUR CUSCO HISTÓRICO • SALIDAS 10:00 AM Y 3:00 PM',
      hierarchyNotes: 'Tipografía sin adornos innecesarios, diseñada para máxima legibilidad y lectura veloz en smartphones.'
    },
    style: {
      aestheticName: 'Minimalist Clean & Fast Action Wall',
      description: 'Limpio y directo como la pizarra de anuncios de un café de San Blas. Fotografías auténticas y datos puntuales.',
      layoutPattern: 'Foto única de alto impacto + Píldoras de información clave + Botón gigante de WhatsApp',
      spacingAndBorders: 'Estructura centrada en móviles con botones táctiles grandes (48px+ de altura).',
      visualElements: ['Marco de postal analógica con fecha', 'Botón verde WhatsApp vibrante', 'Viñetas de verificación'],
      microInteractions: 'Feedback táctil al pulsar el botón de WhatsApp y cambio suave de color en píldoras.'
    },
    includedComponents: [
      'Foto postal representativa del centro histórico',
      'Puntos de encuentro y horario exacto de concentración',
      'Píldora explicativa de "¿Cómo funciona el Free Tour?"',
      'Testimonios breves de mochileros verificados',
      'Botón gigante con enlace directo al WhatsApp del guía'
    ]
  }
];

export default function PinterestGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDesignForModal, setSelectedDesignForModal] = useState<LandingDesign | null>(null);
  const [modalTab, setModalTab] = useState<'benefits' | 'colors' | 'typography' | 'style' | 'components'>('benefits');
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

  const openModal = (design: LandingDesign, initialTab: 'benefits' | 'colors' | 'typography' | 'style' | 'components' = 'benefits') => {
    setSelectedDesignForModal(design);
    setModalTab(initialTab);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 selection:bg-[#FF5500] selection:text-white animate-in fade-in duration-300">
      
      {/* 1. HEADER HERO: COMPACTO, ELEGANTE Y ORDENADO */}
      <div className="bg-gradient-to-br from-[#1C1917] via-stone-900 to-[#2A231F] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-stone-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5500]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5500]/20 text-[#FF8844] text-xs font-bold uppercase tracking-wider border border-[#FF5500]/40">
              <LayoutTemplate size={13} className="text-[#FF5500]" />
              <span>Catálogo de Diseños Oficiales</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Diseños Disponibles para <span className="text-[#FF5500]">Landing Pages</span>
            </h1>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
              Explora nuestros <strong>7 arquetipos visuales y de conversión</strong> para turismo en Cusco y Perú. Cada diseño incluye su ficha técnica con <strong>beneficios, paleta de colores con roles, tipografías y estilos visuales</strong>.
            </p>
          </div>

          {/* Quick Metrics Badge Row */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
              <span className="text-xl font-black text-white block leading-none">7</span>
              <span className="text-[11px] text-stone-400 font-semibold mt-1 block">Diseños Listos</span>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
              <span className="text-xl font-black text-[#FF5500] block leading-none">4</span>
              <span className="text-[11px] text-stone-400 font-semibold mt-1 block">Niveles de Plan</span>
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
              placeholder="Buscar diseño, estilo, tipografía o tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5500] focus:border-transparent transition-all"
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
                  ? 'bg-[#FF5500] text-white shadow-xs font-bold'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat === 'all' ? 'Todos los Estilos (7)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. GRID PRINCIPAL DE TARJETAS ORDENADAS Y UNIFORMES */}
      {filteredDesigns.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <LayoutTemplate size={36} className="mx-auto text-slate-300" />
          <h3 className="text-sm font-bold text-slate-700">No hay diseños que coincidan con la búsqueda</h3>
          <p className="text-xs text-slate-500">Intenta restablecer los filtros para ver los 7 diseños.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSelectedTier('all'); setSearchQuery(''); }}
            className="text-xs font-bold text-[#FF5500] hover:underline cursor-pointer"
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
                    ? 'border-[#FF5500]/60 ring-2 ring-[#FF5500]/20' 
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
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/15">
                          Plan {design.recommendedTier.toUpperCase()}
                        </span>
                        {isFirstOption && (
                          <span className="bg-[#FF5500] text-white text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1 shadow-xs">
                            <Crown size={11} /> Top #1
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
                  <div className="p-4 sm:p-5 space-y-4">
                    
                    {/* Subtítulo descriptivo */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {design.subtitle}
                    </p>

                    {/* Métrica de Conversión Destacada */}
                    <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-2.5 flex items-center gap-2 text-xs text-emerald-900">
                      <TrendingUp size={15} className="text-emerald-600 shrink-0" />
                      <span className="font-semibold text-[11px]">{design.conversionImpact}</span>
                    </div>

                    {/* Fila 1: Paleta de Colores Visual */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-700 flex items-center gap-1.5">
                          <Palette size={13} className="text-[#FF5500]" />
                          Paleta de Colores:
                        </span>
                        <button
                          type="button"
                          onClick={() => openModal(design, 'colors')}
                          className="text-[10px] font-bold text-slate-500 hover:text-[#FF5500] cursor-pointer"
                        >
                          Ver roles →
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {design.colorPalette.map((col, idx) => (
                          <div 
                            key={idx} 
                            className="group/color relative flex items-center"
                            title={`${col.name} (${col.hex}) - ${col.role}`}
                          >
                            <button
                              type="button"
                              onClick={() => copyToClipboard(col.hex)}
                              className="w-7 h-7 rounded-lg border border-black/15 shadow-2xs transition-transform hover:scale-110 cursor-pointer flex items-center justify-center text-[9px] font-mono text-white/90"
                              style={{ backgroundColor: col.hex }}
                            >
                              <span className="opacity-0 group-hover/color:opacity-100 transition-opacity bg-black/60 px-0.5 rounded text-[8px]">
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

                    {/* Fila 3: Beneficio Principal */}
                    <div className="space-y-1 pt-1 border-t border-slate-100">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block">
                        Beneficio Clave
                      </span>
                      <div className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 size={13} className="text-[#FF5500] shrink-0 mt-0.5" />
                        <span className="text-[11px] font-medium leading-tight">
                          {design.benefits[0]?.title}: {design.benefits[0]?.description.slice(0, 75)}...
                        </span>
                      </div>
                    </div>

                    {/* Botón para Abrir Ficha Técnica Completa */}
                    <button
                      type="button"
                      onClick={() => openModal(design, 'benefits')}
                      className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Info size={13} className="text-[#FF5500]" />
                      <span>Ver Ficha Técnica Completa (Detalles)</span>
                    </button>

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

      {/* 4. MODAL DETALLADO DE FICHA TÉCNICA (ORDENADO, COMPLETO Y LIMPIO) */}
      {selectedDesignForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col justify-between">
            
            {/* Header del Modal */}
            <div>
              <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 sticky top-0 bg-white/95 backdrop-blur-md z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Plan {selectedDesignForModal.recommendedTier}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      Plantilla: {selectedDesignForModal.template}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 leading-snug">
                    {selectedDesignForModal.name}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedDesignForModal(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Pestañas de Navegación del Modal */}
              <div className="flex items-center gap-1 p-3 bg-slate-50 border-b border-slate-100 overflow-x-auto scrollbar-none">
                <button
                  type="button"
                  onClick={() => setModalTab('benefits')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    modalTab === 'benefits'
                      ? 'bg-white text-[#FF5500] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Target size={13} />
                  <span>Beneficios</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModalTab('colors')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    modalTab === 'colors'
                      ? 'bg-white text-[#FF5500] shadow-xs'
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
                      ? 'bg-white text-[#FF5500] shadow-xs'
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
                      ? 'bg-white text-[#FF5500] shadow-xs'
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
                      ? 'bg-white text-[#FF5500] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layers size={13} />
                  <span>Componentes</span>
                </button>
              </div>

              {/* Contenido Dinámico de la Pestaña en Modal */}
              <div className="p-6 space-y-4">
                
                {/* 1. BENEFICIOS */}
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
                              <Zap size={13} className="text-[#FF5500]" />
                              {b.title}
                            </span>
                            {b.badge && (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#FF5500]/10 text-[#FF5500]">
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

                {/* 2. COLORES */}
                {modalTab === 'colors' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        Paleta cromática con su función psicológica y comercial:
                      </span>
                      <span className="text-[10px] text-[#FF5500] font-bold">
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
                                className="text-[10px] font-mono font-bold text-slate-600 hover:text-[#FF5500] flex items-center gap-1 px-1.5 py-0.5 rounded bg-white border border-slate-200 cursor-pointer"
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

                {/* 3. TIPOGRAFÍA */}
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

                {/* 4. ESTILOS */}
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

                {/* 5. COMPONENTES */}
                {modalTab === 'components' && (
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      Módulos y Secciones Incluidas en Código:
                    </span>
                    <ul className="grid grid-cols-1 gap-2 text-xs text-slate-700">
                      {selectedDesignForModal.includedComponents.map((comp, idx) => (
                        <li key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                          <CheckCircle2 size={15} className="text-[#FF5500] shrink-0 mt-0.5" />
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
                  className="py-2.5 px-5 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#FF5500]/25 cursor-pointer"
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
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-black text-white rounded-2xl p-6 border border-stone-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-400 text-[11px] font-bold uppercase tracking-wider">
            <ShieldCheck size={15} />
            <span>Código Modular en src/templates/</span>
          </div>
          <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
            Todas las plantillas están disponibles en código modular (<code className="text-emerald-400 font-mono">AgencyPortalTemplate</code>, <code className="text-emerald-400 font-mono">BohoTemplate</code>, <code className="text-emerald-400 font-mono">AdventureTemplate</code>, <code className="text-emerald-400 font-mono">CulturalTemplate</code> y <code className="text-emerald-400 font-mono">PremiumTemplate</code>).
          </p>
        </div>

        <Link
          href="/demo/new"
          className="bg-[#FF5500] hover:bg-[#E04B00] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md shadow-[#FF5500]/30 shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <Sparkles size={14} />
          <span>Generar Nueva Landing</span>
        </Link>
      </div>

    </div>
  );
}
