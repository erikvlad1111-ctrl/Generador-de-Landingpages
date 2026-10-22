"use client";

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, Loader2, Compass, MessageCircle, FileText, ArrowLeft, 
  Globe, DollarSign, Clock, User, Phone, 
  Check, Zap, Eye, CheckCircle2, MapPin,
  Shield, Award, Mountain, Users, Languages, CheckSquare, Square,
  Plus, Trash2, XCircle, Backpack, ShieldCheck, Share2, Calendar, Search,
  Star, ArrowRight, Camera, Crown, ChevronDown, Layers, Navigation, Landmark,
  HelpCircle, MessageSquare, Quote, AlertCircle, Image as ImageIcon, SlidersHorizontal, ChevronUp, Copy,
  Upload, Mail, Ticket, Wine, Building2, Map, Heart
} from 'lucide-react';
import { ObjectiveType, TemplateType, LanguageType, ItineraryItem, PlanTier, LandingData, CatalogTourItem, FAQItem, TestimonialItem } from '@/types/landing';
import { simulateAiGeneration, saveLandingToStorage } from '@/data/landingStore';
import { SAMPLE_TOUR_IMAGES } from '@/data/sampleImages';
import { DEFAULT_SECONDARY_CATALOG_TOURS } from '@/data/defaultCatalogTours';
import CatalogToursEditorModal from '@/components/common/CatalogToursEditorModal';
import { translateText } from '@/data/translations';
import { OFFICIAL_PERUVIAN_GUIDE_PRESETS, PRESET_GUIDE_AVATARS, getSanitizedGuideAvatar } from '@/utils/guideAvatars';

const DEFAULT_FAQS: FAQItem[] = [
  {
    q: '¿Qué incluye exactamente el guiado y servicio?',
    a: 'Incluye guiado oficial profesional bilingüe, transporte turístico autorizado, asistencia permanente con balón de oxígeno y soporte 24/7.'
  },
  {
    q: '¿Cómo prepararme para la altitud en Cusco?',
    a: 'Recomendamos descansar las primeras horas, hidratarse con mate de coca o agua, evitar comidas pesadas el primer día y llevar pastillas para la altura.'
  },
  {
    q: '¿Cómo confirmo y pago mi reserva?',
    a: 'Puedes coordinar fechas y asegurar tu lugar de inmediato mediante WhatsApp con atención directa del counter o guía con confirmación instantánea.'
  },
  {
    q: '¿Qué sucede si hay mal tiempo o cancelaciones?',
    a: 'Monitoreamos los reportes meteorológicos y reprogramamos sin costo o aplicamos políticas de reembolso flexible según normativa DIRCETUR.'
  }
];

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    name: 'Martín y Claudia Flores',
    origin: 'Lima, Perú',
    comment: 'Superó todas nuestras expectativas. La atención del guía y las medidas de seguridad fueron impecables de principio a fin.',
    rating: 5
  },
  {
    name: 'David & Sarah Miller',
    origin: 'Austin, Texas (USA)',
    comment: 'Incredible experience! The landscapes were breathtaking, gear was top-notch and the team was exceptionally caring and punctual.',
    rating: 5
  },
  {
    name: 'Élodie Laurent',
    origin: 'Lyon, Francia',
    comment: 'Une organisation sans faille et des paysages grandioses. Excellente assistance avec l\'oxygène en altitude. Inoubliable !',
    rating: 5
  }
];

const HD_CUSCO_PHOTOS = [
  { title: 'Turista Aventura (Andes Trek)', url: '/images/hero-tourist-cusco.jpg' },
  { title: 'Machu Picchu Clásico', url: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Laguna Humantay', url: 'https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Montaña 7 Colores', url: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Salineras de Maras', url: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Valle Sagrado', url: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Cusco Histórico', url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=1200&auto=format&fit=crop' }
];

const AVAILABLE_TRUST_BADGES = [
  'Licencia Oficial DIRCETUR Cusco',
  'Sello Internacional Safe Travels',
  'Agencia Formal RUC 20 Verificado',
  'Balón de Oxígeno & Botiquín de Altura',
  'Guía Colegiado Bilingüe',
  'Seguro contra Accidentes SOAT Turístico'
];

// Quick Preset Tours for 1-click loading with richer technical tour data
const PRESET_TOURS = [
  {
    id: 'peru-portal-agency',
    label: 'Portal Agencia VIP (Diseño 1)',
    name: 'Machu Picchu VIP & Valle Sagrado Multidía',
    companyName: 'Cusco Grand Expeditions',
    companyTagline: 'Operador Oficial Autorizado DIRCETUR Cusco',
    companyRuc: 'RUC 20608945231',
    companyEmail: 'reservas@cuscograndexpeditions.com',
    heroTitle: 'Machu Picchu de Lujo con Tren Panorámico',
    heroSubtitle: 'Descubre la maravilla del mundo con traslados privados, hoteles 5 estrellas y un guía oficial exclusivo para ti y tu familia.',
    heroBadge: 'Cusco, Machu Picchu & Rutas del Perú • Catálogo Multidía & Full Days',
    heroCta: 'Solicitar Cotización Privada',
    destination: 'Cusco, Machu Picchu & Rutas del Perú',
    guideName: 'Carlos Mendoza',
    guideCert: 'Licenciado DIRCETUR & Operador Autorizado',
    guideLanguages: 'Español, Inglés y Portugués',
    guideAvatar: '/images/tour-guide-carlos.jpg',
    whatsapp: '+51984123456',
    price: '$380 USD',
    duration: 'Catálogo Multidía & Full Days',
    difficulty: 'Fácil - Moderada',
    altitude: '2,430 msnm - 5,036 msnm',
    groupType: 'Tours Privados & Compartidos VIP',
    targetAudience: 'Viajeros Internacionales, Parejas y Familias',
    aiTone: 'lujo',
    includedServices: [
      'Transporte turístico privado con aire acondicionado',
      'Boletos de tren panorámico y entradas oficiales',
      'Guía oficial bilingüe DIRCETUR en todas las excursiones',
      'Asistencia y monitoreo 24/7 con oxígeno a bordo',
      'Almuerzo buffet y degustaciones gastronómicas'
    ],
    notIncluded: [
      'Vuelos internacionales o nacionales',
      'Propinas voluntarias para guías y choferes',
      'Seguro médico personal de viaje'
    ],
    whatToBring: [
      'Pasaporte original físico vigente',
      'Ropa en capas para clima andino y ceja de selva',
      'Calzado cómodo de trekking o senderismo',
      'Protector solar, lentes UV y gorro'
    ],
    trustBadges: [
      'Licencia Oficial DIRCETUR Cusco',
      'Sello Internacional Safe Travels',
      'Agencia Formal RUC 20 Verificado',
      'Guía Colegiado Bilingüe',
      'Balón de Oxígeno & Botiquín de Altura'
    ],
    itinerary: [
      { step: 'Día 1', title: 'Llegada a Cusco, Aclimatación & City Tour Ancestral', desc: 'Recepción en el aeropuerto, traslado a hotel de lujo y recorrido por los recintos arqueológicos sagrados.' },
      { step: 'Día 2', title: 'Valle Sagrado de los Incas & Tren Panorámico', desc: 'Exploración de Pisac y Ollantaytambo con almuerzo campestre buffet frente a los andenes andinos.' },
      { step: 'Día 3', title: 'Amanecer en Machu Picchu & Santuario Histórico', desc: 'Acceso preferente con guía privado historiador y tiempo para capturar las postales icónicas.' }
    ],
    objective: 'quote' as ObjectiveType,
    template: 'agency-portal' as TemplateType,
    language: 'es' as LanguageType,
    tier: 'advance' as PlanTier,
    imageIndex: 0,
    description: 'Portal completo de agencia turística con catálogo de excursiones, métricas de satisfacción, itinerarios multidía y atención personalizada.'
  },
  {
    id: 'emerald-explorer-navikx',
    label: 'Diseño 6 (Emerald Explorer)',
    name: 'Vive Tu Aventura: Expediciones & Trekking en Cusco',
    companyName: 'NavikX Cusco Expeditions',
    companyTagline: 'Operador Autorizado de Alta Montaña',
    companyRuc: 'RUC 20609812345',
    companyEmail: 'hola@navikx-cusco.com',
    heroTitle: 'Vive Tu Aventura: Expediciones & Trekking en Cusco',
    heroSubtitle: 'Explora lugares asombrosos y crea recuerdos inolvidables alrededor de los Andes.',
    heroBadge: 'NavikX Cusco • Operador Autorizado',
    heroCta: 'Explorar Rutas & Reservar',
    destination: 'Machu Picchu, Salkantay & Rutas Exclusivas',
    guideName: 'Carlos Mendoza',
    guideCert: 'Licenciado DIRCETUR & Explorador Senior',
    guideLanguages: 'Español, Inglés y Francés',
    guideAvatar: '/images/tour-guide-carlos.jpg',
    whatsapp: '+51984123456',
    price: '$350 USD',
    duration: '4 Días / 3 Noches',
    difficulty: 'Moderada',
    altitude: '2,430 msnm - 4,630 msnm',
    groupType: 'Grupos Reducidos & Privados VIP',
    targetAudience: 'Aventureros, Creadores de Contenido y Parejas',
    aiTone: 'aventurero',
    includedServices: [
      'Transporte turístico privado 4x4 climatizado',
      'Boletos preferenciales de tren y accesos oficiales',
      'Guía oficial bilingüe DIRCETUR en todas las rutas',
      'Monitoreo médico 24/7 con balón de oxígeno a bordo',
      'Alimentación gourmet andina y degustaciones de café'
    ],
    notIncluded: [
      'Vuelos comerciales internacionales o domésticos',
      'Propinas voluntarias para guías y arrieros',
      'Seguro médico personal de viaje de alta montaña'
    ],
    whatToBring: [
      'Pasaporte original físico vigente',
      'Ropa térmica en capas y cortavientos',
      'Calzado de trekking con tracción impermeable',
      'Lentes con protección UV400 y bloqueador solar'
    ],
    trustBadges: [
      'Licencia Oficial DIRCETUR Cusco',
      'Sello Internacional Safe Travels',
      'Agencia Formal RUC 20 Verificado',
      'Guía Colegiado Bilingüe',
      'Balón de Oxígeno & Botiquín de Altura'
    ],
    itinerary: [
      { step: 'Día 1', title: 'Valle Sagrado & Aclimatación Escénica', desc: 'Recorrido por miradores andinos con almuerzo campestre orgánico y pernocte en domos.' },
      { step: 'Día 2', title: 'Ascenso al Abra Escénica & Fotografía', desc: 'Caminata a ritmo personalizado guiada por expertos con postales panorámicas del nevado sagrado.' },
      { step: 'Día 3', title: 'Amanecer en Machu Picchu Santuario', desc: 'Acceso preferente con historiador oficial y tiempo para capturar postales sin multitudes.' }
    ],
    objective: 'both' as ObjectiveType,
    template: 'emerald-explorer' as TemplateType,
    language: 'es' as LanguageType,
    tier: 'advance' as PlanTier,
    imageIndex: 5,
    description: 'Estilo Deep Forest Teal con Bento Grid, buscador flotante píldora, métricas de viajeros y microanimaciones de ultralujo.'
  },
  {
    id: 'salkantay',
    label: 'Salkantay Trek 5D',
    name: 'Tour Salkantay Trek Clásico hacia Machu Picchu',
    companyName: 'TrekExplorer Perú',
    companyTagline: 'Operador Oficial de Rutas de Aventura & Trekking',
    companyRuc: 'RUC 20549832104',
    companyEmail: 'aventura@trekexplorerperu.com',
    heroTitle: 'Tour Salkantay Trek Clásico hacia Machu Picchu',
    heroSubtitle: '5 días cruzando glaciares sagrados, ceja de selva y plantaciones de café hasta la ciudadela inca.',
    heroBadge: 'Ruta Oficial Salkantay • DIRCETUR Cusco',
    heroCta: 'Reservar por WhatsApp',
    destination: 'Machu Picchu & Cordillera Vilcabamba',
    guideName: 'Raúl Quispe',
    guideCert: 'Licenciado en Turismo DIRCETUR (10 años exp.)',
    guideLanguages: 'Español, Inglés y Quechua',
    guideAvatar: '/images/tour-guide-raul.jpg',
    whatsapp: '+51984112233',
    price: '$350 USD',
    duration: '5 Días / 4 Noches',
    difficulty: 'Moderada - Alta',
    altitude: '4,630 msnm (Paso Salkantay)',
    groupType: 'Grupo Reducido (Máx. 8 pers.)',
    targetAudience: 'Aventureros y Amantes del Trekking',
    aiTone: 'aventurero',
    includedServices: [
      'Transporte turístico Cusco - Mollepata',
      'Domos de cristal y campamentos equipados',
      'Alimentación nutritiva de montaña',
      'Entradas y boleto a Machu Picchu',
      'Balón de oxígeno y botiquín de altura'
    ],
    notIncluded: [
      'Bolsa de dormir térmica (alquiler $20 USD)',
      'Caballo extra de carga personal',
      'Propinas para arrieros y cocineros',
      'Primer desayuno en Mollepata y último almuerzo'
    ],
    whatToBring: [
      'Pasaporte original físico (indispensable para MP)',
      'Mochila de trekking de 30 a 40 litros',
      'Ropa térmica en capas (primera capa, polar y cortavientos)',
      'Zapatos de trekking impermeables ya amoldados',
      'Pastillas para el mal de altura y bloqueador solar'
    ],
    trustBadges: [
      'Licencia Oficial DIRCETUR Cusco',
      'Sello Internacional Safe Travels',
      'Agencia Formal RUC 20 Verificado',
      'Balón de Oxígeno & Botiquín de Altura'
    ],
    itinerary: [
      { step: 'Día 1', title: 'Cusco - Mollepata - Laguna Humantay', desc: 'Salida de madrugada hacia Mollepata. Ascenso a la mística Laguna Humantay a 4,200 msnm y pernocte en domos de cristal en Soraypampa.' },
      { step: 'Día 2', title: 'Paso Salkantay (4,630 msnm) - Collpapampa', desc: 'Día cumbre atravesando el imponente nevado Salkantay. Descenso hacia la ceja de selva y baño en aguas termales.' },
      { step: 'Día 3', title: 'Ruta Cafetalera - Hidroeléctrica - Aguas Calientes', desc: 'Caminata por plantaciones de café y orquídeas andinas. Llegada al pueblo de Machu Picchu y descanso en hotel.' },
      { step: 'Día 4-5', title: 'Amanecer en Machu Picchu y Retorno a Cusco', desc: 'Visita guiada oficial al Santuario Histórico de Machu Picchu. Retorno escénico en tren a Ollantaytambo y transfer a Cusco.' }
    ],
    objective: 'whatsapp' as ObjectiveType,
    template: 'adventure' as TemplateType,
    language: 'es' as LanguageType,
    tier: 'pro' as PlanTier,
    imageIndex: 2, // Humantay
    description: 'Un trekking legendario de alta montaña cruzando nevados imponentes, ceja de selva y plantaciones de café hasta la ciudadela inca de Machu Picchu.'
  },
  {
    id: 'machu-picchu-vip',
    label: '✨ Machu Picchu VIP',
    name: 'Machu Picchu Exclusivo en Tren Panorámico Hiram Bingham',
    companyName: 'Cusco Luxury Collection',
    companyTagline: 'Servicios Privados de Confort & Alta Gama',
    companyRuc: 'RUC 20601298765',
    companyEmail: 'concierge@cuscoluxury.pe',
    heroTitle: 'Machu Picchu Exclusivo en Tren Panorámico Hiram Bingham',
    heroSubtitle: 'Experiencia cinco estrellas con gastronomía de autor y acceso preferencial sin colas.',
    heroBadge: 'Experiencia Exclusiva VIP • Tren Panorámico',
    heroCta: 'Solicitar Cotización Privada',
    destination: 'Santuario Histórico de Machu Picchu',
    guideName: 'Carlos Mendoza',
    guideCert: 'Guía Historiador Senior DIRCETUR',
    guideLanguages: 'Español e Inglés bilingüe nativo',
    guideAvatar: '/images/tour-guide-carlos.jpg',
    whatsapp: '+51984123456',
    price: '$890 USD',
    duration: 'Full Day Exclusivo',
    difficulty: 'Fácil (Confort familiar)',
    altitude: '2,430 msnm',
    groupType: 'Tour Privado Exclusivo',
    targetAudience: 'Parejas, Lunas de Miel y Viajeros Confort',
    aiTone: 'lujo',
    includedServices: [
      'Vagón de lujo con almuerzo gourmet',
      'Boletos de tren ida y vuelta Hiram Bingham',
      'Entradas preferentes a la ciudadela inca',
      'Guía privado historiador oficial',
      'Traslado privado hotel Cusco - estación'
    ],
    notIncluded: [
      'Boleto aéreo internacional o nacional a Cusco',
      'Alojamiento en Aguas Calientes (opcional pernocte)',
      'Propinas voluntarias para la tripulación del tren',
      'Seguro médico de viaje'
    ],
    whatToBring: [
      'Pasaporte original físico (obligatorio para el tren y Machu Picchu)',
      'Ropa elegante sport pero cómoda para caminar',
      'Zapatos confortables o zapatillas con buen agarre',
      'Cámara fotográfica o smartphone con batería recargable',
      'Lentes de sol y protector solar'
    ],
    trustBadges: [
      'Licencia Oficial DIRCETUR Cusco',
      'Sello Internacional Safe Travels',
      'Agencia Formal RUC 20 Verificado',
      'Guía Colegiado Bilingüe'
    ],
    itinerary: [
      { step: '06:00 AM', title: 'Recojo Privado en Hotel de Cusco o Valle Sagrado', desc: 'Vehículo premium privado con amenidades a bordo rumbo a la estación de trenes.' },
      { step: '09:00 AM', title: 'Viaje Hiram Bingham con Brunch Gourmet', desc: 'Música en vivo, cócteles de bienvenida y vistas panorámicas del río Urubamba.' },
      { step: '12:30 PM', title: 'Acceso Preferente a Machu Picchu', desc: 'Tour privado de 3 horas por los recintos sagrados sin prisas ni aglomeraciones.' },
      { step: '16:00 PM', title: 'Afternoon Tea en Sanctuary Lodge y Retorno', desc: 'Degustación gourmet a pasos de la ciudadela y retorno en tren de primera clase.' }
    ],
    objective: 'quote' as ObjectiveType,
    template: 'premium' as TemplateType,
    language: 'en' as LanguageType,
    tier: 'advance' as PlanTier,
    imageIndex: 0, // MP 1
    description: 'Experiencia cinco estrellas diseñada para quienes valoran la privacidad, gastronomía andina de autor y el acceso preferencial sin colas.'
  },
  {
    id: 'city-tour',
    label: 'City Tour & Sacsayhuamán',
    name: 'City Tour Cusco Ancestral & 4 Ruinas Arqueológicas',
    companyName: 'Cusco Patrimonial Tours',
    companyTagline: 'Guías Arqueólogos Colegiados DIRCETUR',
    companyRuc: 'RUC 20604455662',
    companyEmail: 'reservas@cuscopatrimonial.com',
    heroTitle: 'City Tour Cusco Ancestral & 4 Ruinas Arqueológicas',
    heroSubtitle: 'Descubre los enigmas de la arquitectura megalítica inca en Sacsayhuamán, Q’enqo, Puka Pukara y Tambomachay junto a una arqueóloga experta.',
    heroBadge: 'Historia & Arqueología Imperial • DIRCETUR',
    heroCta: 'Consultar Horarios por WhatsApp',
    destination: 'Cusco Histórico & Sacsayhuamán',
    guideName: 'Lucía Condori',
    guideCert: 'Arqueóloga Colegiada & Guía Oficial',
    guideLanguages: 'Español, Inglés y Francés',
    guideAvatar: '/images/tour-guide-lucia.jpg',
    whatsapp: '+51984778899',
    price: 'S/ 85 PEN',
    duration: 'Media Jornada (4.5 Horas)',
    difficulty: 'Fácil (Apto para toda la familia)',
    altitude: '3,400 msnm - 3,700 msnm',
    groupType: 'Grupo Reducido (Máx. 12 pers.)',
    targetAudience: 'Familias, historiadores y viajeros culturales',
    aiTone: 'cultural',
    includedServices: [
      'Transporte turístico privado con aire acondicionado',
      'Guiado oficial por arqueóloga colegiada',
      'Visita guiada al Templo del Sol (Qorikancha)',
      'Recorrido en Sacsayhuamán, Q’enqo, Puka Pukara y Tambomachay',
      'Balón de oxígeno y botiquín a bordo'
    ],
    notIncluded: [
      'Boleto Turístico del Cusco (BTC)',
      'Boleto de entrada al Qorikancha (S/ 15 PEN)',
      'Propinas para el guía y conductor',
      'Agua embotellada y snacks personales'
    ],
    whatToBring: [
      'Boleto Turístico físico o dinero en efectivo para comprarlo',
      'Documento de identidad o pasaporte original',
      'Gorro para el sol y lentes con protección UV',
      'Casaca ligera o cortavientos para la tarde',
      'Calzado cómodo para caminar sobre caminos empedrados'
    ],
    trustBadges: [
      'Licencia Oficial DIRCETUR Cusco',
      'Sello Internacional Safe Travels',
      'Agencia Formal RUC 20 Verificado',
      'Guía Colegiado Bilingüe'
    ],
    itinerary: [
      { step: '13:00 PM', title: 'Punto de Encuentro y Qorikancha', desc: 'Inicio en el Templo del Sol admirando la arquitectura inca y los lienzos de la escuela cusqueña.' },
      { step: '14:30 PM', title: 'Fortaleza Ceremonial de Sacsayhuamán', desc: 'Exploración de los colosales baluartes líticos de más de 120 toneladas con vista panorámica de la ciudad.' },
      { step: '16:30 PM', title: 'Complejos de Q’enqo, Puka Pukara y Tambomachay', desc: 'Inmersión en los templos ceremoniales dedicados a la fertilidad de la tierra y los cultos al agua.' },
      { step: '18:00 PM', title: 'Retorno a la Plaza de Armas', desc: 'Despedida a pasos de los mejores restaurantes y cafés coloniales del centro histórico.' }
    ],
    objective: 'whatsapp' as ObjectiveType,
    template: 'cultural' as TemplateType,
    language: 'es' as LanguageType,
    tier: 'advance' as PlanTier,
    imageIndex: 1, // Terrazas
    description: 'Descubre los enigmas de la arquitectura megalítica inca en Sacsayhuamán, Q’enqo, Puka Pukara y Tambomachay junto a una arqueóloga experta.'
  },
  {
    id: 'vinicunca',
    label: 'Montaña 7 Colores',
    name: 'Expedición Vinicunca & Mirador del Valle Rojo',
    companyName: 'Andes Summit Expeditions',
    companyTagline: 'Especialistas en Alta Montaña y Asistencia Médica',
    companyRuc: 'RUC 20605588991',
    companyEmail: 'expediciones@andessummit.pe',
    heroTitle: 'Expedición Vinicunca & Mirador del Valle Rojo',
    heroSubtitle: 'Asciende a uno de los paisajes geológicos más asombrosos del planeta con asistencia médica preventiva y paradas fotográficas exclusivas.',
    heroBadge: 'Expedición Geológica • 5,036 msnm',
    heroCta: 'Reservar por WhatsApp',
    destination: 'Cordillera Vilcanota (Vinicunca)',
    guideName: 'Marco Antonio Flores',
    guideCert: 'Guía de Alta Montaña Certificado',
    guideLanguages: 'Español, Inglés y Quechua',
    guideAvatar: '/images/tour-guide-marco.jpg',
    whatsapp: '+51984123456',
    price: 'S/ 130 PEN',
    duration: 'Full Day (13 Horas)',
    difficulty: 'Exigente (Caminata en altura)',
    altitude: '5,036 msnm',
    groupType: 'Grupo Pequeño Garantizado',
    targetAudience: 'Viajeros activos y amantes de la fotografía',
    aiTone: 'aventurero',
    includedServices: [
      'Desayuno andino y almuerzo buffet campestre',
      'Transporte turístico de ida y retorno',
      'Oxímetro, botiquín y balón de oxígeno',
      'Bastones de trekking ergonómicos',
      'Guía de montaña certificado en primeros auxilios'
    ],
    notIncluded: [
      'Boleto comunal de ingreso a Vinicunca (S/ 25 extranjeros, S/ 15 nacionales)',
      'Alquiler opcional de caballo local (aprox. S/ 90 ida y vuelta)',
      'Agua y snacks energéticos personales'
    ],
    whatToBring: [
      'Documento de identidad o pasaporte original',
      'Gorro de lana, guantes térmicos y bufanda',
      'Zapatos de trekking con buena huella',
      'Dinero en efectivo para compras de comunidades locales'
    ],
    trustBadges: [
      'Balón de Oxígeno & Botiquín de Altura',
      'Licencia Oficial DIRCETUR Cusco',
      'Sello Internacional Safe Travels',
      'Seguro contra Accidentes SOAT Turístico'
    ],
    itinerary: [
      { step: '04:00 AM', title: 'Salida de Cusco y Desayuno Buffet', desc: 'Recojo en hotel y parada gastronómica andina en Cusipata.' },
      { step: '08:30 AM', title: 'Inicio del Trekking hacia la Cumbre', desc: 'Ascenso a ritmo suave con monitoreo constante de oxígeno y pulsaciones.' },
      { step: '10:45 AM', title: 'Llegada al Mirador de los 7 Colores (5,036 msnm)', desc: 'Tiempo libre para contemplar las franjas minerales y el nevado sagrado Ausangate.' },
      { step: '14:00 PM', title: 'Almuerzo Campestre y Retorno a Cusco', desc: 'Almuerzo caliente en restaurante local y retorno al centro histórico.' }
    ],
    objective: 'whatsapp' as ObjectiveType,
    template: 'adventure' as TemplateType,
    language: 'es' as LanguageType,
    tier: 'pro' as PlanTier,
    imageIndex: 3, // Rainbow
    description: 'Asciende a uno de los paisajes geológicos más asombrosos del planeta con asistencia médica preventiva y paradas fotográficas exclusivas.'
  },
  {
    id: 'humantay-boho',
    label: 'Laguna Humantay (Boho Journal)',
    name: 'Laguna Humantay — Bitácora Fotográfica & Paisajismo',
    companyName: 'Boho Travel Journal',
    companyTagline: 'Viajes Conscientes & Fotografía de Paisajes',
    companyRuc: 'RUC 20603322114',
    companyEmail: 'hola@bohotraveljournal.com',
    heroTitle: 'Laguna Humantay — Bitácora Fotográfica & Paisajismo',
    heroSubtitle: 'Una expedición pensada al detalle para amantes de la fotografía estética, paletas andinas y viajes con sentido.',
    heroBadge: 'Edición Travel Journal • Pinterest Style',
    heroCta: 'Consultar Fechas por WhatsApp',
    destination: 'Laguna Humantay & Glaciar Soraypampa',
    guideName: 'Camila Valdivia',
    guideCert: 'Guía Especialista en Fotografía Andina',
    guideLanguages: 'Español, Inglés y Francés',
    guideAvatar: '/images/tour-guide-camila.jpg',
    whatsapp: '+51984556677',
    price: 'S/ 160 PEN',
    duration: 'Full Day Fotográfico',
    difficulty: 'Moderada (Caminata escénica)',
    altitude: '4,200 msnm',
    groupType: 'Grupo Reducido (Máx. 10 pers.)',
    targetAudience: 'Creadores de contenido, parejas y amantes de la fotografía',
    aiTone: 'cultural',
    includedServices: [
      'Transporte turístico privado con wifi a bordo',
      'Desayuno orgánico y almuerzo campestre en domos',
      'Asesoría de composición fotográfica durante el ascenso',
      'Bastones de trekking y botiquín con oxígeno'
    ],
    notIncluded: [
      'Ticket comunal de ingreso a Mollepata (S/ 20 PEN)',
      'Caballo de alquiler opcional para el tramo empinado',
      'Propinas y gastos personales'
    ],
    whatToBring: [
      'Cámara fotográfica o smartphone con batería cargada',
      'Ropa abrigadora en capas y cortaviento térmico',
      'Lentes de sol con protección UV400 y bloqueador',
      'Calzado de trekking con buen agarre'
    ],
    trustBadges: [
      'Licencia Oficial DIRCETUR Cusco',
      'Sello Internacional Safe Travels',
      'Agencia Formal RUC 20 Verificado',
      'Guía Colegiada Especialista'
    ],
    itinerary: [
      { step: '04:30 AM', title: 'Partida desde Cusco en Mini-Van Privada', desc: 'Recojo en hotel y viaje escénico hacia el valle de Limatambo.' },
      { step: '07:00 AM', title: 'Desayuno en Domos de Mollepata', desc: 'Degustación de panes andinos, frutas frescas y café de Quillabamba.' },
      { step: '09:30 AM', title: 'Ascenso Guiado a la Laguna Esmeralda', desc: 'Caminata pausada con paradas estratégicas para capturar postales inolvidables.' },
      { step: '12:00 PM', title: 'Tiempo Libre para Fotos y Mindfulness', desc: 'Momento de desconexión contemplando las aguas turquesas del nevado Humantay.' },
      { step: '17:30 PM', title: 'Llegada a Cusco', desc: 'Retorno confortable a la plaza de armas o tu alojamiento.' }
    ],
    objective: 'whatsapp' as ObjectiveType,
    template: 'boho-nature' as TemplateType,
    language: 'es' as LanguageType,
    tier: 'advance' as PlanTier,
    imageIndex: 2, // Humantay
    description: 'Una expedición pensada al detalle para amantes de la fotografía estética, paletas andinas y viajes con sentido.'
  },
  {
    id: 'free-tour',
    label: 'Free Walking Tour (Gratis)',
    name: 'Free Tour Cusco Histórico & Leyendas Incas',
    companyName: 'Cusco Free Walking Co.',
    companyTagline: 'Cultura Viva & Leyendas Andinas',
    companyRuc: 'RUC 20601122334',
    companyEmail: 'contacto@cuscofreewalking.com',
    heroTitle: 'Free Tour Cusco Histórico & Leyendas Incas',
    heroSubtitle: 'El tour esencial para recién llegados a Cusco. Conoce leyendas, templos y los mejores datos locales sin costo fijo.',
    heroBadge: 'Free Walking Tour Diario • Centro Histórico',
    heroCta: 'Unirme al Tour por WhatsApp',
    destination: 'Centro Histórico de Cusco',
    guideName: 'Renzo Farfán',
    guideCert: 'Guía Local Apasionado DIRCETUR',
    guideLanguages: 'Español e Inglés',
    guideAvatar: '/images/tour-guide-valdivia.jpg',
    whatsapp: '+51984001122',
    price: 'Gratuito (A base de propinas)',
    duration: '2.5 Horas',
    difficulty: 'Fácil (Caminata urbana)',
    altitude: '3,400 msnm',
    groupType: 'Abierto / Salidas Diarias',
    targetAudience: 'Mochileros, parejas y recién llegados a Cusco',
    aiTone: 'cultural',
    includedServices: [
      'Guiado oficial a pie por callejones incas',
      'Orientación sobre seguridad y aclimatación',
      'Recomendaciones gastronómicas tradicionales'
    ],
    notIncluded: [
      'Ingresos a templos de pago o museos',
      'Propinas voluntarias para el guía al finalizar'
    ],
    whatToBring: [
      'Zapatos cómodos para caminar en adoquín',
      'Gorro para el sol o paraguas según clima',
      'Monedas o efectivo en soles para propina voluntaria'
    ],
    trustBadges: [
      'Licencia Oficial DIRCETUR Cusco',
      'Sello Internacional Safe Travels'
    ],
    itinerary: [
      { step: '10:00 AM', title: 'Plaza de Armas & Catedral', desc: 'Encuentro frente a la fuente de agua y reseña del imperio inca.' },
      { step: '11:00 AM', title: 'Piedra de los 12 Ángulos', desc: 'Muestra de arquitectura incaica megalítica antisísmica.' },
      { step: '12:30 PM', title: 'Mirador de San Blas', desc: 'Conclusión con vista a los tejados cusqueños y recomendaciones locales.' }
    ],
    objective: 'whatsapp' as ObjectiveType,
    template: 'cultural' as TemplateType,
    language: 'es' as LanguageType,
    tier: 'free' as PlanTier,
    imageIndex: 1,
    description: 'El tour esencial para recién llegados a Cusco. Conoce leyendas, templos y los mejores datos locales sin costo fijo.'
  }
];

const COMMON_SERVICES = [
  'Transporte turístico autorizado ida y vuelta',
  'Entradas y boletos de acceso oficiales',
  'Almuerzo buffet o comida típica andina',
  'Balón de oxígeno y botiquín de primeros auxilios',
  'Bastones de trekking de aluminio',
  'Recojo directo en el hotel en Cusco'
];

export default function NewLandingDemo() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  // Form states - Basic & Rich Tourist Fields
  const [name, setName] = useState('Tour Salkantay Trek Clásico hacia Machu Picchu');
  const [destination, setDestination] = useState('Machu Picchu & Cordillera Vilcabamba');
  const [guideName, setGuideName] = useState('Raúl Quispe');
  const [guideCert, setGuideCert] = useState('Licenciado en Turismo DIRCETUR (10 años exp.)');
  const [guideLanguages, setGuideLanguages] = useState('Español, Inglés y Quechua');
  const [whatsapp, setWhatsapp] = useState('+51984112233');
  const [price, setPrice] = useState('$350 USD');
  const [duration, setDuration] = useState('5 Días / 4 Noches');
  const [difficulty, setDifficulty] = useState('Moderada - Alta');
  const [altitude, setAltitude] = useState('4,630 msnm (Paso Salkantay)');
  const [groupType, setGroupType] = useState('Grupo Reducido (Máx. 8 pers.)');
  const [targetAudience, setTargetAudience] = useState('Aventureros y Amantes del Trekking');
  
  const [includedServices, setIncludedServices] = useState<string[]>([
    'Transporte turístico Cusco - Mollepata',
    'Domos de cristal y campamentos equipados',
    'Alimentación nutritiva de montaña',
    'Entradas y boleto a Machu Picchu',
    'Balón de oxígeno y botiquín de altura'
  ]);

  const [itinerary, setItinerary] = useState<ItineraryItem[]>(PRESET_TOURS[0].itinerary || []);
  const [notIncluded, setNotIncluded] = useState<string[]>(PRESET_TOURS[0].notIncluded || []);
  const [newNotIncluded, setNewNotIncluded] = useState('');
  const [whatToBring, setWhatToBring] = useState<string[]>(PRESET_TOURS[0].whatToBring || []);
  const [newWhatToBring, setNewWhatToBring] = useState('');
  const [trustBadges, setTrustBadges] = useState<string[]>(PRESET_TOURS[0].trustBadges || []);
  const [officeAddress, setOfficeAddress] = useState<string>('Portal de Panes N° 123, Plaza de Armas, Centro Histórico, Cusco - Perú');
  const [officeHours, setOfficeHours] = useState<string>('Lunes a Domingo: 08:00 AM – 08:00 PM (Horario Corrido)');
  const [mapsUrl, setMapsUrl] = useState<string>('');
  const [aiTone, setAiTone] = useState<string>('aventurero');
  const [tier, setTier] = useState<PlanTier>('advance');
  const [catalogTours, setCatalogTours] = useState<CatalogTourItem[]>(DEFAULT_SECONDARY_CATALOG_TOURS);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const qTemplate = searchParams.get('template') as TemplateType;
      if (qTemplate && ['agency-portal', 'adventure', 'premium', 'cultural', 'boho-nature', 'emerald-explorer'].includes(qTemplate)) {
        setTemplate(qTemplate);
        const matchingPreset = PRESET_TOURS.find(p => p.template === qTemplate);
        if (matchingPreset) {
          handleApplyPreset(matchingPreset);
        }
      }
      const qTier = searchParams.get('tier') as PlanTier;
      if (qTier && ['free', 'basic', 'pro', 'advance'].includes(qTier)) {
        setTier(qTier);
        if (qTier === 'free' || qTier === 'basic') {
          setLanguage('es');
          setSelectedLanguages(['es']);
        }
      }
    }
  }, []);

  const [objective, setObjective] = useState<ObjectiveType>('whatsapp');
  const [template, setTemplate] = useState<TemplateType>('adventure');
  const [language, setLanguage] = useState<LanguageType>('es');
  const [selectedLanguages, setSelectedLanguages] = useState<LanguageType[]>(['es', 'en']);
  const [selectedHeroImage, setSelectedHeroImage] = useState<string>(SAMPLE_TOUR_IMAGES[2].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [tone, setTone] = useState<'persuasive' | 'luxury' | 'historical'>('persuasive');
  const [description, setDescription] = useState(
    'Un trekking legendario de alta montaña cruzando nevados imponentes, ceja de selva y plantaciones de café hasta la ciudadela inca de Machu Picchu.'
  );

  // Estados para Módulos Completos (Avatar Guía, Galería HD, FAQs, Testimonios y Copys)
  const [guideAvatar, setGuideAvatar] = useState<string>(PRESET_GUIDE_AVATARS[1].url);
  const [galleryImages, setGalleryImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=1200&auto=format&fit=crop'
  ]);
  const [customGalleryUrl, setCustomGalleryUrl] = useState('');
  const [faqs, setFaqs] = useState<FAQItem[]>(DEFAULT_FAQS);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);
  const [showAdvancedCopy, setShowAdvancedCopy] = useState(true);
  const [companyName, setCompanyName] = useState('Andean Horizon Expeditions');
  const [logoUrl, setLogoUrl] = useState('');
  const [companyRuc, setCompanyRuc] = useState('RUC 20608945231');
  const [companyTagline, setCompanyTagline] = useState('Operador Oficial Autorizado DIRCETUR Cusco');
  const [companyEmail, setCompanyEmail] = useState('reservas@andeanhorizon.com');
  const [isCompanyCustomized, setIsCompanyCustomized] = useState(false);
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [heroBadge, setHeroBadge] = useState('');
  const [heroCta, setHeroCta] = useState('');
  const [isHeroTitleCustomized, setIsHeroTitleCustomized] = useState(false);
  const [isHeroSubtitleCustomized, setIsHeroSubtitleCustomized] = useState(false);

  // Selector de Navegación UX por Pestañas
  const [activeTab, setActiveTab] = useState<'tour' | 'design' | 'agency' | 'content'>('tour');
  const [showAllSteps, setShowAllSteps] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = "Generador de Landing | Cusco Creativos";
    }
  }, []);

  // Selector de Modo: Express con IA vs Modo Completo Manual
  const [creationMode, setCreationMode] = useState<'express' | 'full'>('full');
  const [magicToast, setMagicToast] = useState(false);
  const [isAutocompleting, setIsAutocompleting] = useState(false);

  const handleMagicAiAutocomplete = () => {
    setIsAutocompleting(true);
    setTimeout(() => {
      const tourQuery = (name || destination || '').toLowerCase();
      let matchedDest = destination || 'Machu Picchu & Cusco';
      let matchedDesc = 'Una experiencia exclusiva diseñada para quienes valoran la autenticidad, la gastronomía andina y el acceso preferencial sin multitudes.';
      let matchedDuration = duration || '4 Días / 3 Noches';
      let matchedAltitude = altitude || '3,400 msnm';
      let matchedDifficulty = difficulty || 'Moderada';

      if (tourQuery.includes('salkantay')) {
        matchedDest = 'Machu Picchu & Cordillera Vilcabamba';
        matchedAltitude = '4,630 msnm (Paso Salkantay)';
        matchedDifficulty = 'Moderada - Alta';
        matchedDuration = '5 Días / 4 Noches';
        matchedDesc = 'Un trekking legendario de alta montaña cruzando glaciares sagrados, ceja de selva y plantaciones de café hasta la ciudadela inca.';
      } else if (tourQuery.includes('humantay')) {
        matchedDest = 'Laguna Humantay & Soraypampa';
        matchedAltitude = '4,200 msnm';
        matchedDifficulty = 'Moderada';
        matchedDuration = 'Full Day';
        matchedDesc = 'Caminata escénica hacia una de las lagunas turquesas más deslumbrantes de los Andes, rodeada de glaciares imponentes.';
      } else if (tourQuery.includes('7 colores') || tourQuery.includes('vinicunca') || tourQuery.includes('rainbow')) {
        matchedDest = 'Montaña de 7 Colores (Vinicunca)';
        matchedAltitude = '5,036 msnm';
        matchedDifficulty = 'Exigente / Alta Montaña';
        matchedDuration = 'Full Day (04:30 - 17:00)';
        matchedDesc = 'Asciende a uno de los paisajes geológicos más asombrosos del planeta con asistencia médica preventiva y paradas fotográficas exclusivas.';
      } else if (tourQuery.includes('valle') || tourQuery.includes('maras') || tourQuery.includes('moray')) {
        matchedDest = 'Valle Sagrado de los Incas';
        matchedAltitude = '2,870 msnm';
        matchedDifficulty = 'Fácil (Familiar / Sin esfuerzo)';
        matchedDuration = 'Full Day Confort';
        matchedDesc = 'Exploración relajada por las terrazas agrícolas de Moray, las salineras de Maras y las fortalezas megalíticas incas.';
      } else if (tourQuery.includes('city') || tourQuery.includes('ruinas') || tourQuery.includes('sacsayhuaman')) {
        matchedDest = 'Cusco Histórico & Sacsayhuamán';
        matchedAltitude = '3,400 msnm';
        matchedDifficulty = 'Fácil (Caminata urbana)';
        matchedDuration = 'Media Jornada (4 Horas)';
        matchedDesc = 'Inmersión histórica y arqueológica por los templos sagrados incas y calles coloniales acompañados de un historiador colegiado.';
      }

      setDestination(matchedDest);
      setDescription(matchedDesc);
      setDuration(matchedDuration);
      setAltitude(matchedAltitude);
      setDifficulty(matchedDifficulty);
      setItinerary([
        { step: 'Fase 1', title: 'Recojo en Hotel & Traslado Escénico', desc: `Transporte privado climatizado con amenidades a bordo hacia la ruta de ${matchedDest}.` },
        { step: 'Fase 2', title: 'Exploración Guiada & Tiempo para Fotografías', desc: `Recorrido personalizado guiado por ${guideName || 'especialista oficial'} con datos históricos y asistencia de altitud.` },
        { step: 'Fase 3', title: 'Almuerzo Campestre & Retorno a Cusco', desc: 'Degustación de gastronomía andina y traslado de retorno seguro hacia tu alojamiento.' }
      ]);
      setFaqs([
        { q: `¿Qué incluye el tour ${name || 'programado'}?`, a: 'Incluye transporte turístico privado, guiado oficial colegiado bilingüe, entradas oficiales y asistencia permanente con oxígeno.' },
        { q: '¿Cómo prepararme para la altitud en esta ruta?', a: `Alcanzamos ${matchedAltitude}. Recomendamos una jornada previa de aclimatación, hidratación y mate de coca.` },
        { q: '¿Cómo aseguro mi lugar y reserva?', a: 'Puedes confirmar tu reserva de forma inmediata a través de WhatsApp o mediante el formulario de cotización.' },
        { q: '¿Qué sucede si hay mal tiempo?', a: 'Monitoreamos reportes meteorológicos y reprogramamos sin costo adicional para garantizar tu seguridad.' }
      ]);
      setTestimonials([
        { name: 'Sarah & Mark Davis', origin: 'California, USA', rating: 5, comment: `Outstanding experience with ${guideName}! Superb organization, safe driving and breathtaking views.` },
        { name: 'Alejandro y Carmen', origin: 'Madrid, España', rating: 5, comment: 'La mejor experiencia de nuestro viaje a Perú. Todo a tiempo, con mucha amabilidad y seguridad total.' },
        { name: 'Sophie Laurent', origin: 'París, Francia', rating: 5, comment: 'Une journée magique. Guide très professionnel, matériel au top et des souvenirs plein la tête !' }
      ]);

      setIsAutocompleting(false);
      setMagicToast(true);
      setTimeout(() => setMagicToast(false), 3500);
    }, 600);
  };

  // Handlers para FAQs
  const handleAddFaq = () => {
    setFaqs(prev => [
      ...prev,
      { q: '¿Nueva pregunta del tour?', a: 'Detalle de la respuesta oficial para resolver las dudas del turista.' }
    ]);
  };

  const handleUpdateFaq = (index: number, field: 'q' | 'a', value: string) => {
    setFaqs(prev => prev.map((f, i) => i === index ? { ...f, [field]: value } : f));
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs(prev => prev.filter((_, i) => i !== index));
  };

  const handleLoadFaqsPreset = () => {
    setFaqs(DEFAULT_FAQS);
  };

  // Handlers para Testimonios
  const handleAddTestimonial = () => {
    setTestimonials(prev => [
      ...prev,
      { name: 'Nuevo Viajero', origin: 'País / Ciudad', rating: 5, comment: 'Excelente guiado y organización, una experiencia inolvidable.' }
    ]);
  };

  const handleUpdateTestimonial = (index: number, field: keyof TestimonialItem, value: any) => {
    setTestimonials(prev => prev.map((t, i) => i === index ? { ...t, [field]: value } : t));
  };

  const handleRemoveTestimonial = (index: number) => {
    setTestimonials(prev => prev.filter((_, i) => i !== index));
  };

  const handleLoadTestimonialsPreset = () => {
    setTestimonials(DEFAULT_TESTIMONIALS);
  };

  // Handlers para Galería
  const handleToggleGalleryImage = (url: string) => {
    setGalleryImages(prev => 
      prev.includes(url) ? prev.filter(img => img !== url) : [...prev, url]
    );
  };

  const handleAddCustomGalleryImage = () => {
    if (!customGalleryUrl.trim()) return;
    if (!galleryImages.includes(customGalleryUrl.trim())) {
      setGalleryImages(prev => [...prev, customGalleryUrl.trim()]);
    }
    setCustomGalleryUrl('');
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleToggleLanguage = (langId: LanguageType) => {
    // En planes Gratuito y Básico el idioma está bloqueado estrictamente a Español
    if (tier === 'free' || tier === 'basic') return;
    // En plan Pro solo se permiten Español e Inglés
    if (tier === 'pro' && langId !== 'es' && langId !== 'en') return;

    if (selectedLanguages.includes(langId)) {
      if (selectedLanguages.length > 1) {
        const next = selectedLanguages.filter(l => l !== langId);
        setSelectedLanguages(next);
        if (language === langId) {
          setLanguage(next[0]);
        }
      }
    } else {
      const next = [...selectedLanguages, langId];
      setSelectedLanguages(next);
      setLanguage(langId);
    }
  };

  const activeHeroImg = customImageUrl.trim() || selectedHeroImage;

  const steps = [
    "Analizando destino, altitud, objetivo y perfil de turista...",
    "Generando copywriting persuasivo con IA para Hero, Beneficios y Privilegios...",
    "Estructurando datos del guía oficial (DIRCETUR, idiomas y WhatsApp)...",
    "Optimizando imágenes fotográficas de alta resolución y ensamblando landing..."
  ];

  const handleApplyPreset = (preset: typeof PRESET_TOURS[0]) => {
    setName(preset.name);
    setDestination(preset.destination);
    setGuideName(preset.guideName);
    setGuideCert(preset.guideCert);
    setGuideLanguages(preset.guideLanguages);
    if ((preset as any).guideAvatar) {
      setGuideAvatar((preset as any).guideAvatar);
    }
    setWhatsapp(preset.whatsapp);
    setPrice(preset.price);
    setDuration(preset.duration);
    setDifficulty(preset.difficulty);
    setAltitude(preset.altitude);
    setGroupType(preset.groupType);
    setTargetAudience(preset.targetAudience);
    setIncludedServices(preset.includedServices);
    setItinerary(preset.itinerary || []);
    setNotIncluded(preset.notIncluded || []);
    setWhatToBring(preset.whatToBring || []);
    setTrustBadges(preset.trustBadges || []);
    if (preset.aiTone) setAiTone(preset.aiTone);
    if (!isCompanyCustomized) {
      if ((preset as any).companyName) setCompanyName((preset as any).companyName);
      if ((preset as any).companyTagline) setCompanyTagline((preset as any).companyTagline);
      if ((preset as any).companyRuc) setCompanyRuc((preset as any).companyRuc);
      if ((preset as any).companyEmail) setCompanyEmail((preset as any).companyEmail);
    }
    if ((preset as any).heroTitle) {
      setHeroTitle((preset as any).heroTitle);
      setIsHeroTitleCustomized(false);
    }
    if ((preset as any).heroSubtitle) {
      setHeroSubtitle((preset as any).heroSubtitle);
      setIsHeroSubtitleCustomized(false);
    }
    if ((preset as any).heroBadge) setHeroBadge((preset as any).heroBadge);
    if ((preset as any).heroCta) setHeroCta((preset as any).heroCta);
    if (preset.tier) {
      setTier(preset.tier);
      if (preset.tier === 'free' || preset.tier === 'basic') {
        setLanguage('es');
        setSelectedLanguages(['es']);
      } else if (preset.tier === 'pro') {
        setLanguage('es');
        setSelectedLanguages(['es', 'en']);
      } else {
        setLanguage(preset.language);
        setSelectedLanguages([preset.language, preset.language === 'en' ? 'es' : 'en']);
      }
    }
    setObjective(preset.objective);
    setTemplate(preset.template);
    setSelectedHeroImage(SAMPLE_TOUR_IMAGES[preset.imageIndex].url);
    setCustomImageUrl('');
    setDescription(preset.description);
  };

  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('El archivo de imagen no debe superar los 5MB.');
      return;
    }
    setIsCompanyCustomized(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result !== 'string') return;
      
      const img = new (window as any).Image();
      img.onload = () => {
        const MAX_DIM = 400;
        let width = img.width;
        let height = img.height;
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const isPng = file.type === 'image/png' || file.type === 'image/svg+xml';
          const compressed = canvas.toDataURL(isPng ? 'image/png' : 'image/webp', 0.85);
          setLogoUrl(compressed);
        } else {
          setLogoUrl(result);
        }
      };
      img.onerror = () => {
        setLogoUrl(result);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleToggleService = (service: string) => {
    setIncludedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleToggleTrustBadge = (badge: string) => {
    setTrustBadges(prev => 
      prev.includes(badge) ? prev.filter(b => b !== badge) : [...prev, badge]
    );
  };

  const handleAddItineraryStep = () => {
    setItinerary(prev => [
      ...prev,
      {
        step: `Día ${prev.length + 1}`,
        title: 'Nueva etapa del recorrido',
        desc: 'Detalle de las actividades, paradas y atractivos visitados.'
      }
    ]);
  };

  const handleUpdateItinerary = (index: number, field: keyof ItineraryItem, val: string) => {
    setItinerary(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: val };
      return next;
    });
  };

  const handleRemoveItineraryStep = (index: number) => {
    setItinerary(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddNotIncluded = () => {
    if (!newNotIncluded.trim()) return;
    setNotIncluded(prev => [...prev, newNotIncluded.trim()]);
    setNewNotIncluded('');
  };

  const handleRemoveNotIncluded = (index: number) => {
    setNotIncluded(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddWhatToBring = () => {
    if (!newWhatToBring.trim()) return;
    setWhatToBring(prev => [...prev, newWhatToBring.trim()]);
    setNewWhatToBring('');
  };

  const handleRemoveWhatToBring = (index: number) => {
    setWhatToBring(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    const otherImages = SAMPLE_TOUR_IMAGES.filter(img => img.url !== activeHeroImg).map(img => img.url);
    const effectiveGalleryImages = galleryImages.length > 0 ? galleryImages : otherImages.slice(0, 3);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setLoadingStep(step);
      if (step >= steps.length) {
        clearInterval(interval);
        const isFreeOrBasic = tier === 'free' || tier === 'basic';
        const finalLang: LanguageType = isFreeOrBasic ? 'es' : language;
        const finalLanguages: LanguageType[] = isFreeOrBasic 
          ? ['es'] 
          : tier === 'pro'
          ? (selectedLanguages.filter(l => l === 'es' || l === 'en').length > 0 ? selectedLanguages.filter(l => l === 'es' || l === 'en') : ['es', 'en'])
          : selectedLanguages;

        const generated = simulateAiGeneration({
          name,
          guideName,
          guideCert,
          guideLanguages,
          guideAvatar,
          whatsapp,
          price,
          duration,
          difficulty,
          description,
          objective,
          template,
          language: finalLang,
          languages: finalLanguages,
          tier,
          heroImage: activeHeroImg,
          galleryImages: effectiveGalleryImages,
          destination,
          altitude,
          groupType,
          includedServices,
          targetAudience,
          itinerary,
          notIncluded,
          whatToBring,
          trustBadges,
          officeAddress,
          officeHours,
          mapsUrl,
          aiTone,
          catalogTours: catalogTours,
          faqs: faqs.length > 0 ? faqs : undefined,
          testimonials: testimonials.length > 0 ? testimonials : undefined,
          heroTitle: heroTitle.trim() || name.trim() || undefined,
          heroSubtitle: heroSubtitle.trim() || description.trim() || undefined,
          heroBadge: heroBadge.trim() || undefined,
          heroCta: heroCta.trim() || undefined,
          companyName: companyName.trim() || undefined,
          logoUrl: logoUrl.trim() || undefined,
          companyRuc: companyRuc.trim() || undefined,
          companyTagline: companyTagline.trim() || undefined,
          companyEmail: companyEmail.trim() || undefined
        });
        saveLandingToStorage(generated);
        router.push(`/demo/preview?slug=${generated.slug}`);
      }
    }, 1100);
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center max-w-lg mx-auto">
        <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 relative shadow-inner border border-blue-100">
          <Sparkles className="text-blue-600 absolute animate-ping opacity-70" size={48} />
          <Sparkles className="text-blue-600 relative z-10" size={44} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Motor de IA en Acción</h2>
        <p className="text-slate-500 text-sm mb-6">
          Generando landing persuasiva para <strong>{name}</strong> con plantilla <strong>{template.toUpperCase()}</strong>.
        </p>

        {/* Dynamic step pills */}
        <div className="w-full bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-6 text-left space-y-3">
          {steps.map((s, idx) => {
            const isDone = idx < loadingStep;
            const isCurrent = idx === loadingStep;
            return (
              <div key={idx} className="flex items-center gap-3 text-xs">
                {isDone ? (
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 size={18} className="text-blue-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                )}
                <span className={isCurrent ? "font-bold text-blue-600" : isDone ? "text-slate-700 font-medium" : "text-slate-400"}>
                  {s}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 transition-all duration-700 ease-out rounded-full"
            style={{ width: `${Math.min(((loadingStep + 1) / steps.length) * 100, 100)}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-7 pb-16 animate-in fade-in duration-500">
      
      {/* 1. TOP HEADER & NAVIGATION STEPPER */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <Link 
              href="/demo" 
              className="p-2.5 text-slate-400 hover:text-slate-800 rounded-2xl hover:bg-slate-100 transition-colors border border-slate-200"
              title="Volver al panel"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold mb-1 border border-blue-100">
                <Sparkles size={12} /> Asistente de Creación Turística
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Generador de Landing
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                Configura tu tour, personaliza la marca blanca de tu agencia y publica tu landing turística de alta conversión.
              </p>
            </div>
          </div>

          {/* Botón Mágico de Autocompletado con IA & Toggle Ver Todo */}
          <div className="flex items-center gap-2.5 flex-wrap shrink-0">
            <button
              type="button"
              onClick={handleMagicAiAutocomplete}
              disabled={isAutocompleting}
              className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs transition-all shadow-md shadow-purple-500/20 hover:scale-102 active:scale-98 cursor-pointer flex items-center gap-2"
              title="Analiza el tour actual y autocompleta descripción, itinerario, FAQs y testimonios con IA"
            >
              <Sparkles size={15} className={isAutocompleting ? "animate-spin" : ""} />
              <span>{isAutocompleting ? 'Autocompletando...' : '✨ Autocompletar con IA'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAllSteps(!showAllSteps)}
              className={`px-3.5 py-2.5 rounded-2xl font-bold text-xs border transition-all cursor-pointer flex items-center gap-1.5 ${
                showAllSteps
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title="Muestra todas las secciones de corrido en lugar de ir paso a paso"
            >
              <SlidersHorizontal size={14} />
              <span>{showAllSteps ? '📜 Viendo Todo Continuo' : 'Paso a Paso'}</span>
            </button>
          </div>
        </div>

        {/* STEPPER DE NAVEGACIÓN UX INTERACTIVO (4 PESTAÑAS CLARAS) */}
        <div className="pt-3 border-t border-slate-100">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {[
              {
                id: 'tour' as const,
                step: '1',
                title: 'Datos del Tour',
                desc: 'Nombre, precio y destino',
                icon: Compass,
                color: 'blue'
              },
              {
                id: 'design' as const,
                step: '2',
                title: 'Diseño & Portada',
                desc: 'Plantilla, hero e idiomas',
                icon: Layers,
                color: 'purple'
              },
              {
                id: 'agency' as const,
                step: '3',
                title: 'Tu Agencia & Marca',
                desc: 'Logo, WhatsApp y oficina',
                icon: Building2,
                color: 'indigo'
              },
              {
                id: 'content' as const,
                step: '4',
                title: 'Itinerario & Ficha',
                desc: 'Guía, etapas, FAQs y reviews',
                icon: FileText,
                color: 'emerald'
              }
            ].map((tabItem) => {
              const isActive = activeTab === tabItem.id && !showAllSteps;
              const TabIcon = tabItem.icon;
              return (
                <button
                  key={tabItem.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tabItem.id);
                    setShowAllSteps(false);
                  }}
                  className={`p-3 sm:p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 relative ${
                    isActive
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-black text-xs transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-xs' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    <TabIcon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black uppercase text-blue-600">Paso {tabItem.step}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                      )}
                    </div>
                    <span className="text-xs sm:text-sm font-black text-slate-900 block truncate">
                      {tabItem.title}
                    </span>
                    <span className="text-[11px] text-slate-400 block truncate">
                      {tabItem.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Toast Flotante cuando la IA autocompleta el formulario */}
      {magicToast && (
        <div className="fixed top-24 right-6 z-50 bg-gradient-to-r from-purple-700 to-indigo-700 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-3 duration-300 border border-purple-400/40">
          <Sparkles size={20} className="text-amber-300 shrink-0" />
          <div>
            <p className="font-black text-xs">✨ ¡Formulario Autocompletado con IA con Éxito!</p>
            <p className="text-[11px] text-purple-200">Se han redactado la descripción, itinerario por etapas, FAQs y testimonios para {destination}.</p>
          </div>
        </div>
      )}

      {/* 2. MAIN WORKSPACE: FORM COLUMN (LEFT 7 COLS) + REALTIME PHONE MOCKUP (RIGHT 5 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Column */}
        <form onSubmit={handleGenerate} className="lg:col-span-7 space-y-6">
          
          {/* ========================================================= */}
          {/* TAB 1: DATOS DEL TOUR & DESTINO PRINCIPAL */}
          {/* ========================================================= */}
          {(activeTab === 'tour' || showAllSteps) && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">1</span>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Paso 1: Datos del Tour & Destino Principal</h3>
                    <p className="text-xs text-slate-500">¿Qué experiencia turística vas a promocionar?</p>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Paso 1 de 4 • Esencial
                </span>
              </div>

              {/* Presets Rápidos Opcionales */}
              <div className="bg-slate-50/80 border border-slate-200/60 p-3.5 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-blue-600" /> ¿Deseas autocompletar con un tour de ejemplo preconfigurado?
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {PRESET_TOURS.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setTemplate(p.template);
                        handleApplyPreset(p);
                      }}
                      className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-white hover:bg-blue-600 hover:text-white text-slate-700 border border-slate-200/80 hover:border-blue-600 transition-all cursor-pointer shadow-2xs"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ficha Técnica del Tour & Catálogo */}
              {/* PASO 6: FICHA TÉCNICA DEL TOUR & DESTINO (MÁS DATOS PARA RELLENAR) */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">6</span>
                Ficha Técnica del Tour & Destino
              </label>
              <span className="text-[11px] font-semibold text-slate-400">Datos para enriquecer los textos de la IA</span>
            </div>

            {/* Name and Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Compass size={14} className="text-blue-500" /> Nombre Comercial del Tour *
                </label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => {
                    const val = e.target.value;
                    setName(val);
                    if (!isHeroTitleCustomized) {
                      setHeroTitle(val);
                    }
                  }}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  placeholder="Ej. Salkantay Trek Clásico hacia Machu Picchu"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <MapPin size={14} className="text-blue-500" /> Destino Principal / Región *
                </label>
                <input 
                  type="text" 
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  placeholder="Ej. Machu Picchu & Cordillera Vilcabamba"
                />
              </div>
            </div>

            {/* Price, Duration, Altitude, Difficulty */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <DollarSign size={14} className="text-emerald-600" /> Tarifa por Persona *
                </label>
                <input 
                  type="text" 
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-bold text-emerald-700"
                  placeholder="Ej. $350 USD"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Clock size={14} className="text-slate-500" /> Duración *
                </label>
                <input 
                  type="text" 
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  placeholder="Ej. 5 Días / 4 Noches"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Mountain size={14} className="text-slate-500" /> Altitud Máxima
                </label>
                <input 
                  type="text" 
                  value={altitude}
                  onChange={(e) => setAltitude(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  placeholder="Ej. 4,630 msnm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Award size={14} className="text-slate-500" /> Dificultad Física
                </label>
                <select 
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-2.5 py-2 text-xs bg-white font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Fácil (Familiar)">Fácil (Familiar / Sin esfuerzo)</option>
                  <option value="Moderada">Moderada (Caminata ligera)</option>
                  <option value="Moderada - Alta">Moderada - Alta (Trekking continuo)</option>
                  <option value="Exigente / Alta Montaña">Exigente (Alta Montaña)</option>
                </select>
              </div>
            </div>

            {/* Group Type & Target Audience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Users size={14} className="text-slate-500" /> Modalidad / Tamaño de Grupo
                </label>
                <input 
                  type="text" 
                  value={groupType}
                  onChange={(e) => setGroupType(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  placeholder="Ej. Grupo Reducido (Máx. 8 pers.) o Tour Privado"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <User size={14} className="text-slate-500" /> Público Ideal / Perfil de Viajero
                </label>
                <input 
                  type="text" 
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  placeholder="Ej. Parejas, Lunas de Miel, Amantes del Trekking"
                />
              </div>
            </div>

            {/* Description / Highlights */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Descripción, Itinerario Clave & Valor Diferencial *
              </label>
              <textarea 
                rows={3}
                required
                value={description}
                onChange={(e) => {
                  const val = e.target.value;
                  setDescription(val);
                  if (!isHeroSubtitleCustomized) {
                    setHeroSubtitle(val);
                  }
                }}
                className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed font-normal"
                placeholder="Describe la ruta, paisajes, qué hace única a esta experiencia..."
              />
            </div>

            {/* BLOQUE DE CATÁLOGO DE TOURS (DEBAJO DEL TOUR ESTRELLA - ACTIVO PARA LAS 5 PLANTILLAS) */}
            <div className="mt-2 p-5 rounded-2xl border transition-all bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border-orange-500/40 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-inner">
                    <Layers size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-black text-white">
                        Catálogo de Tours Complementarios
                      </h4>
                      <span className="text-[10px] bg-orange-500/25 text-orange-300 font-extrabold px-2.5 py-0.5 rounded-full border border-orange-400/30">
                        {catalogTours.length} Tours en Vitrina
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                        Activo en las 5 Plantillas
                      </span>
                    </div>
                    <p className="text-xs mt-1 leading-relaxed text-slate-300">
                      Los campos de arriba configuran tu <strong>Tour Estrella principal</strong> (Hero, Ficha e Itinerario). Tu landing incluye además la sección de <strong>6 tours recomendados</strong> en la vitrina de las 5 plantillas (listos con valores por defecto o personalizables/importables desde otras landings).
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCatalogModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 bg-[#FF5500] hover:bg-[#e04b00] text-white px-5 py-3 rounded-xl font-black text-xs transition-all shadow-md shadow-orange-500/25 cursor-pointer hover:scale-102 active:scale-98"
                  >
                    <Layers size={16} />
                    <span>Editar Tours del Catálogo</span>
                  </button>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-slate-400 font-bold shrink-0">Tours en catálogo:</span>
                {catalogTours.map((ct, idx) => (
                  <span
                    key={ct.id || idx}
                    className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 px-3 py-1 rounded-lg text-xs text-slate-200 border border-white/10 transition-colors"
                  >
                    <span className="text-orange-400 font-bold">#{idx + 1}</span>
                    <span className="truncate max-w-[130px] font-medium">{ct.title}</span>
                    <span className="text-emerald-400 font-bold text-[11px]">({ct.price})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

              {/* Navegación al pie del Paso 1 */}
              {!showAllSteps && (
                <div className="flex items-center justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('design');
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-2xl font-bold text-xs transition-all shadow-md shadow-blue-500/20 cursor-pointer hover:scale-102"
                  >
                    <span>Continuar a Paso 2: Diseño & Portada</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: DISEÑO VISUAL, PORTADA (HERO) & NIVEL */}
          {/* ========================================================= */}
          {(activeTab === 'design' || showAllSteps) && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xs font-black shadow-sm">2</span>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Paso 2: Diseño Visual, Portada (Hero) & Nivel</h3>
                    <p className="text-xs text-slate-500">Selecciona la plantilla interactiva, fotografía principal y configuración técnica.</p>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  Paso 2 de 4 • Estilo
                </span>
              </div>

              {/* PASO 1: SELECCIONA LA PLANTILLA DE DISEÑO & ESTILO VISUAL */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-4 ring-2 ring-blue-500/10">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">1</span>
                Elige la Plantilla de Diseño Visual
              </label>
              <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                Estructura & Estilo
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Selecciona el estilo visual con el que la IA estructurará y presentará el contenido de tu tour:
            </p>

            {/* Presets Rápidos Opcionales */}
            <div className="bg-slate-50/80 border border-slate-200/60 p-2.5 rounded-xl space-y-1.5">
              <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                <Sparkles size={13} className="text-blue-600" /> ¿Deseas autocompletar con un tour de ejemplo preconfigurado?
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {PRESET_TOURS.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setTemplate(p.template);
                      handleApplyPreset(p);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white hover:bg-blue-600 hover:text-white text-slate-700 border border-slate-200/80 hover:border-blue-600 transition-all cursor-pointer shadow-2xs"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { 
                  id: 'agency-portal', 
                  name: 'Diseño 1', 
                  desc: 'Naranja viral, métricas +10k, catálogo de tours, FAQ y WhatsApp con radar.', 
                  badge: 'Diseño 1',
                  badgeClass: 'bg-[#FF5500] text-white'
                },
                { 
                  id: 'boho-nature', 
                  name: 'Boho Travel Journal', 
                  desc: 'Estilo Pinterest con fotos polaroid inclinadas, cinta washi y notas de campo.', 
                  badge: 'Pinterest Aesthetic',
                  badgeClass: 'bg-amber-600 text-white'
                },
                { 
                  id: 'premium', 
                  name: 'Lujo & Exclusivo (VIP)', 
                  desc: 'Dorado y negro profundo. Ideal para experiencias Hiram Bingham y 5 estrellas.', 
                  badge: 'High-End VIP',
                  badgeClass: 'bg-stone-900 text-amber-300'
                },
                { 
                  id: 'adventure', 
                  name: 'Aventura & Trekking', 
                  desc: 'Tonos esmeralda y montaña. Diseñado para rutas de alta dificultad y caminatas.', 
                  badge: 'Trekking & Outdoor',
                  badgeClass: 'bg-emerald-600 text-white'
                },
                { 
                  id: 'cultural', 
                  name: 'Cultural & Ancestral', 
                  desc: 'Piedra incaica y ámbar cálido. Para City Tours, Sacsayhuamán y arqueología.', 
                  badge: 'Heritage & History',
                  badgeClass: 'bg-amber-700 text-white'
                },
                { 
                  id: 'emerald-explorer', 
                  name: 'Diseño 6 (Emerald Explorer)', 
                  desc: 'Deep Teal oscuro con Bento Grid, buscador flotante tipo píldora, métricas y glow esmeralda.', 
                  badge: 'NavikX Tech Style',
                  badgeClass: 'bg-emerald-600 text-white'
                }
              ].map((t) => {
                const isSelected = template === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setTemplate(t.id as TemplateType);
                    }}
                    className={`relative p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected 
                        ? 'border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-500/20 scale-[1.01]' 
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="p-1 rounded-lg bg-slate-100 flex items-center justify-center">
                          {t.id === 'agency-portal' && <Zap size={18} className="text-[#FF5500]" />}
                          {t.id === 'boho-nature' && <Camera size={18} className="text-amber-600" />}
                          {t.id === 'premium' && <Crown size={18} className="text-amber-500" />}
                          {t.id === 'adventure' && <Mountain size={18} className="text-emerald-600" />}
                          {t.id === 'cultural' && <Landmark size={18} className="text-amber-700" />}
                          {t.id === 'emerald-explorer' && <Compass size={18} className="text-emerald-600" />}
                        </span>
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${t.badgeClass}`}>
                          {t.badge}
                        </span>
                      </div>
                      <span className="text-xs font-black text-slate-900 block">{t.name}</span>
                      <span className="text-[11px] text-slate-500 font-normal mt-1 block leading-snug">{t.desc}</span>
                    </div>

                    {isSelected && (
                      <div className="mt-2.5 pt-2 border-t border-blue-200/80 flex items-center justify-between text-blue-700 text-[10px] font-bold">
                        <span>Plantilla Activa</span>
                        <Check size={14} className="text-blue-600" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

              {/* PASO 2: FOTOGRAFÍA DE PORTADA & TÍTULO DEL HERO */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">2</span>
                Portada Principal (Hero Section) & Título H1
              </label>
              <span className="text-[11px] font-semibold text-slate-400">Impacto visual y titular</span>
            </div>

            {/* Titular del Hero */}
            <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-blue-600" />
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Titular y Textos de la Sección Hero</h4>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Título Principal del Hero (H1):
                </label>
                <input 
                  type="text" 
                  value={heroTitle}
                  onChange={(e) => {
                    setHeroTitle(e.target.value);
                    setIsHeroTitleCustomized(true);
                  }}
                  placeholder="Ej. Machu Picchu de Lujo con Tren Panorámico (o deja en blanco para IA)"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-extrabold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Si lo dejas en blanco, se utilizará automáticamente el nombre comercial del tour.
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Subtítulo / Bajada de Portada (Texto descriptivo del Hero justo bajo el H1):
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {heroSubtitle.length} car.
                  </span>
                </div>
                <textarea 
                  rows={2}
                  value={heroSubtitle}
                  onChange={(e) => {
                    setHeroSubtitle(e.target.value);
                    setIsHeroSubtitleCustomized(true);
                  }}
                  placeholder="Ej. Descubre la maravilla del mundo con traslados privados, hoteles 5 estrellas y un guía oficial exclusivo para ti y tu familia."
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed font-medium"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  Este texto aparece de forma destacada en la portada principal (Hero) debajo del título del tour en los 6 diseños.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Insignia Superior (Hero Badge):
                  </label>
                  <input 
                    type="text" 
                    value={heroBadge}
                    onChange={(e) => setHeroBadge(e.target.value)}
                    placeholder="Ej. Experiencia Exclusiva VIP • Temporada 2026"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Texto del Botón Principal (Hero CTA):
                  </label>
                  <input 
                    type="text" 
                    value={heroCta}
                    onChange={(e) => setHeroCta(e.target.value)}
                    placeholder="Ej. Solicitar Cotización y Disponibilidad"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Hero Image Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Selecciona la Fotografía Principal:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {SAMPLE_TOUR_IMAGES.map((img) => {
                  const isSelected = selectedHeroImage === img.url && !customImageUrl;
                  return (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => {
                        setSelectedHeroImage(img.url);
                        setCustomImageUrl('');
                      }}
                      className={`group relative h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                        isSelected ? 'border-blue-600 ring-4 ring-blue-500/20 scale-[1.03]' : 'border-slate-200 hover:border-slate-400 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <Image 
                        src={img.url} 
                        alt={img.title} 
                        fill 
                        sizes="150px"
                        className="object-cover group-hover:scale-105 transition-transform" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white">
                          <Check size={10} strokeWidth={3} />
                        </div>
                      )}
                      <span className="absolute bottom-1 left-1.5 right-1.5 text-[9px] font-bold text-white line-clamp-1">
                        {img.title.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <input 
                  type="url"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  placeholder="O pega una URL de imagen personalizada (Unsplash)..."
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

              {/* PASO 3: NIVEL DE SERVICIO / VERSIÓN DE LA LANDING (TIER) */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">
                  3
                </span>
                Nivel de Servicio / Versión de Landing (Tier)
              </label>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                Define las secciones que se activarán
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Selecciona el nivel de página que generarás para este cliente o tour turístico:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Gratuito */}
              <button
                type="button"
                onClick={() => {
                  setTier('free');
                  setLanguage('es');
                  setSelectedLanguages(['es']);
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  tier === 'free'
                    ? 'border-stone-700 bg-stone-50 shadow-sm ring-2 ring-stone-400/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-stone-900 uppercase tracking-wider">Gratuito</span>
                  <span className="text-[10px] bg-stone-200 text-stone-800 font-extrabold px-2 py-0.5 rounded-md">HERO + TOURS</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hero de alto impacto + sección de tours destacados + WhatsApp directo. Idioma único: Español.
                </p>
              </button>

              {/* Básico */}
              <button
                type="button"
                onClick={() => {
                  setTier('basic');
                  setLanguage('es');
                  setSelectedLanguages(['es']);
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  tier === 'basic'
                    ? 'border-emerald-600 bg-emerald-50/80 shadow-sm ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-emerald-900 uppercase tracking-wider">Básico</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-md">ESTÁNDAR</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hero + Ficha + Acerca de + Qué incluye + Catálogo de tours. Idioma único: Español.
                </p>
              </button>

              {/* Pro */}
              <button
                type="button"
                onClick={() => {
                  setTier('pro');
                  if (!selectedLanguages.includes('es') || selectedLanguages.some(l => l !== 'es' && l !== 'en')) {
                    setSelectedLanguages(['es', 'en']);
                    setLanguage('es');
                  }
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  tier === 'pro'
                    ? 'border-blue-600 bg-blue-50/80 shadow-sm ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-blue-900 uppercase tracking-wider">Pro</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded-md">RECOMENDADO</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Todo en Básico + Itinerario + Mochila + Sellos. Hasta 2 idiomas (ES / EN).
                </p>
              </button>

              {/* Advance */}
              <button
                type="button"
                onClick={() => setTier('advance')}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  tier === 'advance'
                    ? 'border-purple-600 bg-purple-50/80 shadow-sm ring-2 ring-purple-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-purple-900 uppercase tracking-wider">Advance</span>
                  <span className="text-[10px] bg-purple-100 text-purple-800 font-extrabold px-2 py-0.5 rounded-md">ALTA CONVERSIÓN</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Todo en Pro + Galería + FAQs + Testimonios + Catálogo. Hasta 5 idiomas.
                </p>
              </button>
            </div>
          </div>

              {/* PASO 4: ELEGIR IDIOMA DE LA LANDING (MULTI-SELECCIÓN) */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-2">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">4</span>
                Elegir Idiomas de la Landing
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80 flex items-center gap-1.5">
                  <Globe size={13} className="text-blue-600" />
                  {selectedLanguages.length} {selectedLanguages.length === 1 ? 'idioma seleccionado' : 'idiomas seleccionados (Multilenguaje)'}
                </span>
              </div>
            </div>

            {(tier === 'free' || tier === 'basic') ? (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <Check size={16} strokeWidth={3} />
                </div>
                <div className="text-xs text-amber-900 leading-relaxed">
                  <strong className="block mb-0.5">Idioma único por defecto: Español</strong>
                  En los planes <strong>Gratuito</strong> y <strong>Básico</strong> la landing se genera en idioma <strong>Español</strong> (sin selector de idiomas). Los selectores multilingües están disponibles a partir del plan <strong>Pro</strong> (2 idiomas) y <strong>Advance</strong> (5 idiomas).
                </div>
              </div>
            ) : (
              <div className="bg-blue-50/60 border border-blue-200/60 rounded-2xl p-3.5 flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <Check size={16} strokeWidth={3} />
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-900 block mb-0.5">
                    {tier === 'pro' ? 'Plan Pro: Hasta 2 idiomas (Español e Inglés)' : 'Plan Advance: Hasta 5 idiomas activos al mismo tiempo:'}
                  </strong>
                  {tier === 'pro'
                    ? 'La landing incluirá un selector interactivo bilingüe (ES / EN) optimizado para turismo receptivo.'
                    : 'Haz clic sobre las tarjetas para marcarlas o desmarcarlas. La landing generada incluirá un selector de banderas interactivo con hasta 5 idiomas.'}
                </div>
              </div>
            )}

            {/* Language Selection Visual Cards Grid (5 Languages Multi-Select) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { 
                  id: 'en' as LanguageType, 
                  name: 'Inglés', 
                  native: 'English', 
                  flag: '🇺🇸', 
                  desc: 'Turismo receptivo USA, UK, Europa y global',
                  badge: 'Alta Demanda'
                },
                { 
                  id: 'es' as LanguageType, 
                  name: 'Español', 
                  native: 'Español', 
                  flag: '🇵🇪', 
                  desc: 'Turismo nacional, Latinoamérica y España',
                  badge: 'Local & Regional'
                },
                { 
                  id: 'pt' as LanguageType, 
                  name: 'Portugués', 
                  native: 'Português', 
                  flag: '🇧🇷', 
                  desc: 'Turismo de Brasil y Portugal en auge',
                  badge: 'Mercado VIP'
                },
                { 
                  id: 'fr' as LanguageType, 
                  name: 'Francés', 
                  native: 'Français', 
                  flag: '🇫🇷', 
                  desc: 'Viajeros culturales de Francia, Bélgica y Suiza',
                  badge: 'Cultural'
                },
                { 
                  id: 'it' as LanguageType, 
                  name: 'Italiano', 
                  native: 'Italiano', 
                  flag: '🇮🇹', 
                  desc: 'Aventureros y turismo europeo de Italia',
                  badge: 'Aventura & Arte'
                }
              ].map((langItem) => {
                const isFreeOrBasic = tier === 'free' || tier === 'basic';
                const isPro = tier === 'pro';
                const isLocked = isFreeOrBasic ? langItem.id !== 'es' : isPro ? (langItem.id !== 'es' && langItem.id !== 'en') : false;
                const isSelected = selectedLanguages.includes(langItem.id) && !isLocked;
                const isPrimary = language === langItem.id;
                return (
                  <button
                    key={langItem.id}
                    type="button"
                    disabled={isLocked}
                    onClick={() => handleToggleLanguage(langItem.id)}
                    className={`relative p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                      isLocked
                        ? 'opacity-40 cursor-not-allowed bg-slate-50 border-slate-200'
                        : isSelected
                        ? 'border-blue-600 bg-blue-50/90 shadow-md ring-2 ring-blue-500/20 scale-[1.02] cursor-pointer'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/70 cursor-pointer'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{langItem.flag}</span>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                          isLocked
                            ? 'border-slate-200 bg-slate-100 text-slate-400'
                            : isSelected 
                            ? 'bg-blue-600 border-blue-600 text-white shadow-xs' 
                            : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <Check size={13} strokeWidth={3} />}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-slate-900 block leading-tight">{langItem.name}</span>
                        {isPrimary && (
                          <span className="text-[8px] bg-blue-600 text-white font-black px-1 rounded">Base</span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">{langItem.native}</span>
                      <span className="text-[10px] text-slate-500 font-normal mt-1.5 block leading-tight">{langItem.desc}</span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                        isLocked
                          ? 'bg-slate-200 text-slate-500'
                          : isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {isLocked ? (isFreeOrBasic ? 'Plan Pro/Advance' : 'Plan Advance') : isSelected ? '✓ Activo' : '+ Clic para activar'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick multi-language preset pills */}
            {!(tier === 'free' || tier === 'basic') && (
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs border-t border-slate-100">
                <span className="text-slate-500 text-[11px] font-bold">Presets rápidos:</span>
                <button
                  type="button"
                  onClick={() => { setSelectedLanguages(['en', 'es']); setLanguage('es'); }}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold border transition-all cursor-pointer ${
                    selectedLanguages.length === 2 && selectedLanguages.includes('en') && selectedLanguages.includes('es')
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  2 Idiomas: Bilingüe (EN + ES)
                </button>
                {tier === 'advance' && (
                  <>
                    <button
                      type="button"
                      onClick={() => { setSelectedLanguages(['en', 'es', 'pt']); setLanguage('es'); }}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold border transition-all cursor-pointer ${
                        selectedLanguages.length === 3 && selectedLanguages.includes('pt') && selectedLanguages.includes('en') && selectedLanguages.includes('es')
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      3 Idiomas: Trilingüe (EN + ES + PT)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSelectedLanguages(['en', 'es', 'pt', 'fr', 'it']); setLanguage('es'); }}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold border transition-all cursor-pointer ${
                        selectedLanguages.length === 5
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Todos los 5 Idiomas (EN + ES + PT + FR + IT)
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => { setSelectedLanguages(['es']); setLanguage('es'); }}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                    selectedLanguages.length === 1 && selectedLanguages[0] === 'es'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Solo Español (ES)
                </button>
                {tier !== 'pro' && (
                  <button
                    type="button"
                    onClick={() => { setSelectedLanguages(['en']); setLanguage('en'); }}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                      selectedLanguages.length === 1 && selectedLanguages[0] === 'en'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Solo Inglés 🇺🇸
                  </button>
                )}
              </div>
            )}
          </div>

              {/* Navegación al pie del Paso 2 */}
              {!showAllSteps && (
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('tour');
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-5 py-3.5 rounded-2xl font-bold text-xs transition-all cursor-pointer"
                  >
                    <ArrowLeft size={16} />
                    <span>Volver a Datos del Tour</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('agency');
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-2xl font-bold text-xs transition-all shadow-md shadow-blue-500/20 cursor-pointer hover:scale-102"
                  >
                    <span>Continuar a Paso 3: Tu Agencia & Marca</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: TU AGENCIA, MARCA BLANCA & CONTACTO */}
          {/* ========================================================= */}
          {(activeTab === 'agency' || showAllSteps) && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-sm">3</span>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Paso 3: Tu Agencia, Marca Blanca & Contacto</h3>
                    <p className="text-xs text-slate-500">Logo, nombre de tu empresa, WhatsApp de reservas y oficina física.</p>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Paso 3 de 4 • Marca Blanca
                </span>
              </div>

              {/* PASO DE IDENTIDAD CORPORATIVA: EMPRESA, LOGO & MARCA BLANCA */}
          <div className="bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 rounded-3xl shadow-sm border border-indigo-200/90 p-6 sm:p-7 space-y-5 ring-2 ring-indigo-500/10">
            <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-sm">
                  <Building2 size={13} />
                </span>
                Empresa, Agencia & Logo (Marca Blanca)
              </label>
              <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 border border-indigo-200">
                Multi-Empresa
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Personaliza para qué empresa o agencia turística se generará esta landing. Puedes cambiar de empresa en cualquier momento:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Building2 size={13} className="text-slate-500" /> Nombre Comercial de la Empresa / Agencia *
                </label>
                <input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    setIsCompanyCustomized(true);
                  }}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-900 bg-white"
                  placeholder="Ej. Andean Horizon Tours & Expeditions"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-slate-500" /> RUC / Licencia DIRCETUR
                </label>
                <input 
                  type="text" 
                  value={companyRuc}
                  onChange={(e) => {
                    setCompanyRuc(e.target.value);
                    setIsCompanyCustomized(true);
                  }}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-slate-900 bg-white"
                  placeholder="Ej. RUC 20608945231 • DIRCETUR Lic. 450"
                />
              </div>
            </div>

            {/* Administrador de Logo con Subida de Archivo Local y URL */}
            <div className="space-y-3 bg-white/80 border border-indigo-100 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <ImageIcon size={13} className="text-slate-500" /> Logo de la Empresa (Subir Archivo o URL Web)
                </label>
                <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-md">
                  PNG transparente, JPG o SVG (máx. 5MB)
                </span>
              </div>

              {/* Contenedor Interactivo de Subida y Vista Previa */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Botón para subir archivo desde la computadora */}
                <label className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl font-bold text-xs shadow-md shadow-indigo-600/20 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]">
                  <Upload size={16} />
                  <span>Subir Archivo desde tu Dispositivo</span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                    onChange={handleLogoFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Previsualización del Logo o Estado Sin Logo */}
                {logoUrl ? (
                  <div className="flex items-center gap-2.5 bg-slate-50 border border-indigo-200 rounded-xl px-3 py-2">
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 shadow-2xs">
                      <img src={logoUrl} alt="Logo de empresa" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex flex-col min-w-0 pr-1">
                      <span className="text-[11px] font-black text-emerald-700 flex items-center gap-1">
                        <Check size={12} strokeWidth={3} /> Logo Activo
                      </span>
                      <span className="text-[10px] text-slate-400 truncate max-w-[140px]">
                        {logoUrl.startsWith('data:') ? 'Imagen local cargada' : logoUrl}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setLogoUrl('');
                        setIsCompanyCustomized(true);
                      }}
                      className="px-2 py-1 text-[11px] font-bold text-rose-600 hover:text-white hover:bg-rose-600 rounded-lg transition-colors cursor-pointer border border-rose-200 hover:border-rose-600 ml-auto"
                      title="Quitar logo"
                    >
                      Quitar
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 border border-dashed border-slate-300 rounded-xl bg-slate-50 text-slate-400 text-xs font-semibold shrink-0">
                    <span>Sin logo cargado</span>
                  </div>
                )}
              </div>

              {/* Opción secundaria: Pegar URL */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  O pega una URL directa de tu logo en internet:
                </label>
                <input 
                  type="text" 
                  value={logoUrl.startsWith('data:') ? '' : logoUrl}
                  onChange={(e) => {
                    setLogoUrl(e.target.value);
                    setIsCompanyCustomized(true);
                  }}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="https://tu-sitio-web.com/imagenes/logo.png"
                />
              </div>

              {/* Botones de sugerencias de logo */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400">Probar con logos de muestra:</span>
                <button
                  type="button"
                  onClick={() => {
                    setLogoUrl('https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&auto=format&fit=crop&q=80');
                    setIsCompanyCustomized(true);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold border border-indigo-200 cursor-pointer transition-colors"
                >
                  Logo Escudo Agencia
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLogoUrl('https://images.unsplash.com/photo-1516876437184-593fda40c7ce?w=120&auto=format&fit=crop&q=80');
                    setIsCompanyCustomized(true);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold border border-indigo-200 cursor-pointer transition-colors"
                >
                  Logo Montaña Trek
                </button>
                {logoUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setLogoUrl('');
                      setIsCompanyCustomized(true);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-bold border border-slate-200 cursor-pointer transition-colors"
                  >
                    Restablecer a Icono Vectorial
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <span>✨</span> Slogan / Tagline Corporativo
                </label>
                <input 
                  type="text" 
                  value={companyTagline}
                  onChange={(e) => {
                    setCompanyTagline(e.target.value);
                    setIsCompanyCustomized(true);
                  }}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-900 bg-white"
                  placeholder="Ej. Operador Oficial Autorizado DIRCETUR Cusco"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <span>✉️</span> Email Corporativo de Reservas
                </label>
                <input 
                  type="email" 
                  value={companyEmail}
                  onChange={(e) => {
                    setCompanyEmail(e.target.value);
                    setIsCompanyCustomized(true);
                  }}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-900 bg-white"
                  placeholder="Ej. reservas@andeanhorizon.com"
                />
              </div>
            </div>
          </div>

              {/* PASO 5: OBJETIVO Y ESTRATEGIA COMERCIAL */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">5</span>
                Objetivo Comercial & Enfoque de Conversión
              </label>
              <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Define la Acción del Turista</span>
            </div>

            {/* Objective Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <button
                type="button"
                onClick={() => setObjective('whatsapp')}
                className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition-all cursor-pointer ${
                  objective === 'whatsapp' 
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${objective === 'whatsapp' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                  <MessageCircle size={18} />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 text-xs sm:text-sm block">Ventas por WhatsApp</span>
                  <span className="text-[11px] text-slate-500 leading-relaxed block mt-1">
                    Prioriza contacto directo por chat con el guía o counter para confirmaciones y reservas al instante.
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setObjective('quote')}
                className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition-all cursor-pointer ${
                  objective === 'quote' 
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${objective === 'quote' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                  <FileText size={18} />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 text-xs sm:text-sm block">Cotización y Propuesta</span>
                  <span className="text-[11px] text-slate-500 leading-relaxed block mt-1">
                    Abre formulario para presupuestos personalizados, número de pasajeros, niños y fechas flexibles.
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setObjective('both')}
                className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition-all cursor-pointer ${
                  objective === 'both' 
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${objective === 'both' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                  <Layers size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm block">Ambos (Híbrido)</span>
                    <span className="text-[9px] bg-blue-100 text-blue-700 font-extrabold px-1.5 py-0.5 rounded">2 EN 1</span>
                  </div>
                  <span className="text-[11px] text-slate-500 leading-relaxed block mt-1">
                    Activa ambos canales: botón directo a WhatsApp para dudas rápidas y formulario de cotización.
                  </span>
                </div>
              </button>
            </div>

            {/* AI Copy Tone */}
            <div className="pt-1">
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Sparkles size={14} className="text-blue-500" /> Tono de Redacción IA
              </label>
              <select 
                value={tone}
                onChange={(e) => setTone(e.target.value as 'persuasive' | 'luxury' | 'historical')}
                className="w-full sm:w-1/2 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs bg-white font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="persuasive">Persuasivo & Enérgico (Alta Conversión)</option>
                <option value="luxury">Exclusivo, Premium & Sofisticado</option>
                <option value="historical">Místico, Cultural e Historiográfico</option>
              </select>
            </div>
          </div>

              {/* Navegación al pie del Paso 3 */}
              {!showAllSteps && (
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('design');
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-5 py-3.5 rounded-2xl font-bold text-xs transition-all cursor-pointer"
                  >
                    <ArrowLeft size={16} />
                    <span>Volver a Diseño & Portada</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('content');
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-2xl font-bold text-xs transition-all shadow-md shadow-blue-500/20 cursor-pointer hover:scale-102"
                  >
                    <span>Continuar a Paso 4: Itinerario & Ficha</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: ITINERARIO, GUÍA, FAQS & TESTIMONIOS */}
          {/* ========================================================= */}
          {(activeTab === 'content' || showAllSteps) && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xs font-black shadow-sm">4</span>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Paso 4: Itinerario, Guía, FAQs & Testimonios</h3>
                    <p className="text-xs text-slate-500">Módulos de confianza, cronograma y prueba social para cerrar reservas.</p>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Paso 4 de 4 • Ficha & Prueba Social
                </span>
              </div>

              {/* PASO 7: PERFIL DEL GUÍA TURÍSTICO & SERVICIOS INCLUIDOS */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">7</span>
                Perfil del Guía, Oficina Física & Servicios
              </label>
              <span className="text-[11px] font-semibold text-slate-400">Confianza, WhatsApp y Ubicación en Maps</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <User size={14} className="text-blue-500" /> Nombre del Guía o Counter Asignado *
                </label>
                <input 
                  type="text" 
                  required
                  value={guideName}
                  onChange={(e) => setGuideName(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  placeholder="Ej. Raúl Quispe"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Award size={14} className="text-blue-500" /> Acreditación / Certificación
                </label>
                <input 
                  type="text" 
                  value={guideCert}
                  onChange={(e) => setGuideCert(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  placeholder="Ej. Licenciado en Turismo DIRCETUR"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Languages size={14} className="text-blue-500" /> Idiomas que domina el Guía
                </label>
                <input 
                  type="text" 
                  value={guideLanguages}
                  onChange={(e) => setGuideLanguages(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  placeholder="Ej. Español, Inglés fluido y Quechua"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Phone size={14} className="text-emerald-600" /> WhatsApp Oficial del Guía *
                </label>
                <input 
                  type="text" 
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono font-bold text-slate-800"
                  placeholder="+51984112233"
                />
              </div>
            </div>

            {/* Foto o Avatar del Guía Oficial */}
            <div className="pt-2 border-t border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <User size={14} className="text-blue-500" /> Foto o Avatar del Guía (Genera Confianza Inmediata)
                </label>
                <span className="text-[10px] text-slate-400">Presets o URL personalizada</span>
              </div>

              {/* Presets Rápidos de Avatar de Guías Peruanos */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {OFFICIAL_PERUVIAN_GUIDE_PRESETS.map((av, idx) => {
                  const isAvSelected = guideAvatar === av.url;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setGuideAvatar(av.url);
                        const isDefaultPresetName = OFFICIAL_PERUVIAN_GUIDE_PRESETS.some(p => p.fullName === guideName);
                        if (isDefaultPresetName || !guideName.trim()) {
                          setGuideName(av.fullName);
                          setGuideCert(av.cert);
                          setGuideLanguages(av.languages);
                        }
                      }}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                        isAvSelected
                          ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                        <Image src={av.url} alt={av.name} fill sizes="32px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-slate-800 block truncate">{av.name.split(' ')[0]}</span>
                        <span className="text-[9px] text-slate-400 block truncate">{av.name.split(' ')[1] || 'Guía'}</span>
                      </div>
                      {isAvSelected && <Check size={12} className="text-blue-600 shrink-0" strokeWidth={3} />}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="text"
                  value={guideAvatar}
                  onChange={(e) => setGuideAvatar(e.target.value)}
                  placeholder="URL de la foto del guía (ej. https://... o /images/...)"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                />
                {guideAvatar && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-300 bg-slate-100">
                    <img src={guideAvatar} alt="Guía" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Included Services Checklist */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Selecciona los Servicios y Privilegios que Incluye:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {COMMON_SERVICES.map((srv, idx) => {
                  const isChecked = includedServices.includes(srv);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleToggleService(srv)}
                      className={`p-2.5 rounded-xl border text-left text-xs flex items-center gap-2.5 transition-all cursor-pointer ${
                        isChecked 
                          ? 'bg-blue-50 border-blue-300 text-blue-900 font-semibold' 
                          : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare size={16} className="text-blue-600 shrink-0" />
                      ) : (
                        <Square size={16} className="text-slate-400 shrink-0" />
                      )}
                      <span className="truncate">{srv}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ubicación de Oficina Física & Google Maps (Opcional) */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#FF5500]" />
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Oficina Física en Cusco & Enlace de Google Maps (Opcional):
                </label>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Dirección Física:
                  </label>
                  <input 
                    type="text" 
                    value={officeAddress}
                    onChange={(e) => setOfficeAddress(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    placeholder="Ej. Portal de Panes N° 123, Plaza de Armas, Cusco"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Horario de Atención:
                  </label>
                  <input 
                    type="text" 
                    value={officeHours}
                    onChange={(e) => setOfficeHours(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    placeholder="Ej. Lunes a Domingo: 08:00 AM – 08:00 PM"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center justify-between">
                  <span>Enlace de Google Maps (Opcional):</span>
                  <span className="text-[10px] text-slate-400 font-normal">Si se deja vacío, se buscará automáticamente por tu dirección</span>
                </label>
                <input 
                  type="url" 
                  value={mapsUrl}
                  onChange={(e) => setMapsUrl(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  placeholder="Ej. https://maps.app.goo.gl/... o https://maps.google.com/?q=..."
                />
              </div>
            </div>
          </div>

              {/* PASO 8: ITINERARIO DÍA A DÍA / HORAS */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">8</span>
                Itinerario Detallado del Tour
              </label>
              <button
                type="button"
                onClick={handleAddItineraryStep}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                <Plus size={14} /> Añadir Etapa
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Desglosa el cronograma paso a paso. Los viajeros compran más rápido cuando conocen los horarios y actividades exactas.
            </p>

            <div className="space-y-4">
              {itinerary.map((item, idx) => (
                <div key={idx} className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 space-y-3 relative group">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-32 sm:w-40 shrink-0">
                      <input 
                        type="text"
                        value={item.step}
                        onChange={(e) => handleUpdateItinerary(idx, 'step', e.target.value)}
                        placeholder="Ej. Día 1 o 08:00 AM"
                        className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="w-full">
                      <input 
                        type="text"
                        value={item.title}
                        onChange={(e) => handleUpdateItinerary(idx, 'title', e.target.value)}
                        placeholder="Título de la etapa o atractivo principal"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {itinerary.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItineraryStep(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors shrink-0 cursor-pointer"
                        title="Eliminar etapa"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <div>
                    <textarea 
                      rows={2}
                      value={item.desc}
                      onChange={(e) => handleUpdateItinerary(idx, 'desc', e.target.value)}
                      placeholder="Breve descripción de lo que vivirá el turista en esta etapa..."
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 resize-none leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

              {/* PASO 9: TRANSPARENCIA & EQUIPAJE (QUÉ NO INCLUYE Y QUÉ LLEVAR) */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">9</span>
                Exclusiones Claras & Checklist de Mochila
              </label>
              <span className="text-[11px] font-semibold text-slate-400">Reduce objeciones de clientes</span>
            </div>

            {/* Qué NO incluye */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5 text-rose-700">
                <XCircle size={15} /> Qué NO está incluido (Evita reclamos y sorpresas):
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {notIncluded.map((item, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs px-2.5 py-1 rounded-full font-medium"
                  >
                    <span>{item}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveNotIncluded(idx)} 
                      className="hover:text-rose-900 cursor-pointer font-bold ml-1 text-xs"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={newNotIncluded}
                  onChange={(e) => setNewNotIncluded(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddNotIncluded(); } }}
                  placeholder="Añadir ítem no incluido (ej. Propinas, Bebidas extras)..."
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-blue-500 font-normal"
                />
                <button
                  type="button"
                  onClick={handleAddNotIncluded}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold px-3.5 py-2 rounded-xl text-xs shrink-0 cursor-pointer"
                >
                  Agregar
                </button>
              </div>
            </div>

            {/* Qué llevar en la mochila */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5 text-emerald-800">
                <Backpack size={15} /> Qué debe llevar el viajero en su mochila (Checklist):
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {whatToBring.map((item, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-medium"
                  >
                    <span>✓ {item}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveWhatToBring(idx)} 
                      className="hover:text-emerald-950 cursor-pointer font-bold ml-1 text-xs"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={newWhatToBring}
                  onChange={(e) => setNewWhatToBring(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddWhatToBring(); } }}
                  placeholder="Añadir equipaje recomendado (ej. Ropa térmica, Bloqueador)..."
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-blue-500 font-normal"
                />
                <button
                  type="button"
                  onClick={handleAddWhatToBring}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold px-3.5 py-2 rounded-xl text-xs shrink-0 cursor-pointer"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>

              {/* PASO 10: DISTINTIVOS OFICIALES & SELLOS DE CONFIANZA */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">10</span>
                Distintivos Oficiales & Sellos de Confianza
              </label>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Seguridad para el Cliente</span>
            </div>

            <p className="text-xs text-slate-500">
              Selecciona los sellos de acreditación que se exhibirán con orgullo en la cabecera y el pie de la landing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AVAILABLE_TRUST_BADGES.map((badge, idx) => {
                const isSelected = trustBadges.includes(badge);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleToggleTrustBadge(badge)}
                    className={`p-3 rounded-2xl border text-left text-xs flex items-center gap-3 transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 font-bold shadow-xs' 
                        : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <ShieldCheck size={18} className={isSelected ? "text-emerald-600 shrink-0" : "text-slate-400 shrink-0"} />
                    <span className="truncate">{badge}</span>
                  </button>
                );
              })}
            </div>
          </div>

              {/* PASO 11: GALERÍA DE FOTOS SECUNDARIAS (HD CUSCO) */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">11</span>
                Galería de Fotos Secundarias del Tour
              </label>
              <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                {galleryImages.length} fotos activas
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Selecciona las fotos que acompañarán la vitrina visual del tour o el carrusel de imágenes secundarias:
            </p>

            {/* Banco de Fotos HD de Cusco */}
            <div>
              <span className="text-xs font-bold text-slate-800 mb-2 block flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-500" /> Banco de Fotos HD de Cusco (1 Clic para Activar / Desactivar):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {HD_CUSCO_PHOTOS.map((photo, pIdx) => {
                  const isAdded = galleryImages.includes(photo.url);
                  return (
                    <div 
                      key={pIdx} 
                      onClick={() => handleToggleGalleryImage(photo.url)}
                      className={`relative p-2 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-2.5 ${
                        isAdded 
                          ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20 shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                        <Image src={photo.url} alt={photo.title} fill sizes="60px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] font-black text-slate-900 block truncate">{photo.title}</span>
                        <span className={`text-[9px] font-bold mt-0.5 inline-block px-1.5 py-0.2 rounded ${
                          isAdded ? 'bg-blue-600 text-white' : 'text-slate-500 bg-slate-100'
                        }`}>
                          {isAdded ? '✓ Incluida' : '+ Añadir'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Añadir URL Personalizada */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                O ingresa una URL de foto personalizada (Unsplash / enlace web):
              </label>
              <div className="flex gap-2">
                <input 
                  type="url"
                  value={customGalleryUrl}
                  onChange={(e) => setCustomGalleryUrl(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomGalleryImage(); } }}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={handleAddCustomGalleryImage}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer"
                >
                  + Agregar
                </button>
              </div>
            </div>

            {/* Lista actual de fotos en miniatura */}
            {galleryImages.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-600 mb-2 block">
                  Fotos seleccionadas para la vitrina ({galleryImages.length}):
                </span>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {galleryImages.map((imgUrl, gIdx) => (
                    <div key={gIdx} className="relative w-20 h-16 rounded-xl overflow-hidden border border-slate-300 shrink-0 group shadow-2xs">
                      <img src={imgUrl} alt="Galería" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(gIdx)}
                        className="absolute top-1 right-1 w-5 h-5 bg-rose-600 text-white rounded-full flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer text-[10px] font-bold shadow-xs"
                        title="Quitar foto"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

              {/* PASO 12: PREGUNTAS FRECUENTES (FAQS) */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-2">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">12</span>
                Preguntas Frecuentes (FAQs) del Tour
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLoadFaqsPreset}
                  className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 rounded-lg text-[11px] font-bold transition-all cursor-pointer shadow-2xs"
                  title="Cargar 4 preguntas estándar de Cusco"
                >
                  Cargar 4 FAQs Reales
                </button>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold transition-all cursor-pointer shadow-xs"
                >
                  <Plus size={13} />
                  <span>Añadir Pregunta</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Resuelve objeciones frecuentes de los viajeros (inclusiones, mal de altura, métodos de pago, etc.).
            </p>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-md border border-purple-200">
                      FAQ #{idx + 1}
                    </span>
                    {faqs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveFaq(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Eliminar pregunta"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                      Pregunta del Turista:
                    </label>
                    <input
                      type="text"
                      value={faq.q}
                      onChange={(e) => handleUpdateFaq(idx, 'q', e.target.value)}
                      placeholder="Ej. ¿Qué sucede con el mal de altura?"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                      Respuesta Oficial:
                    </label>
                    <textarea
                      rows={2}
                      value={faq.a}
                      onChange={(e) => handleUpdateFaq(idx, 'a', e.target.value)}
                      placeholder="Detalla la respuesta clara y tranquilizadora..."
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

              {/* PASO 13: RESEÑAS & TESTIMONIOS DE VIAJEROS */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-2">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">13</span>
                Reseñas & Testimonios de Turistas (Reviews)
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLoadTestimonialsPreset}
                  className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 rounded-lg text-[11px] font-bold transition-all cursor-pointer shadow-2xs"
                  title="Cargar 3 reseñas 5 estrellas de muestra"
                >
                  Cargar 3 Reseñas (5 Estrellas)
                </button>
                <button
                  type="button"
                  onClick={handleAddTestimonial}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold transition-all cursor-pointer shadow-xs"
                >
                  <Plus size={13} />
                  <span>Añadir Reseña</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Prueba social imprescindible para cerrar ventas rápidas. Destaca las experiencias reales de viajeros en tu ruta.
            </p>

            <div className="space-y-3">
              {testimonials.map((tItem, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between gap-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                      <input
                        type="text"
                        value={tItem.name}
                        onChange={(e) => handleUpdateTestimonial(idx, 'name', e.target.value)}
                        placeholder="Nombre del Viajero"
                        className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <input
                        type="text"
                        value={tItem.origin}
                        onChange={(e) => handleUpdateTestimonial(idx, 'origin', e.target.value)}
                        placeholder="Ciudad, País"
                        className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <select
                        value={tItem.rating}
                        onChange={(e) => handleUpdateTestimonial(idx, 'rating', Number(e.target.value))}
                        className="bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-amber-600 focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value={5}>5 Estrellas (Excelente)</option>
                        <option value={4}>4 Estrellas (Muy Bueno)</option>
                        <option value={3}>3 Estrellas (Bueno)</option>
                      </select>
                    </div>
                    {testimonials.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveTestimonial(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Eliminar reseña"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={2}
                    value={tItem.comment}
                    onChange={(e) => handleUpdateTestimonial(idx, 'comment', e.target.value)}
                    placeholder="Comentario sobre el tour, atención y calidad..."
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed text-slate-800"
                  />
                </div>
              ))}
            </div>
          </div>

              {/* Navegación al pie del Paso 4 */}
              {!showAllSteps && (
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('agency');
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-5 py-3.5 rounded-2xl font-bold text-xs transition-all cursor-pointer"
                  >
                    <ArrowLeft size={16} />
                    <span>Volver a Tu Agencia & Marca</span>
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white px-8 py-3.5 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-xl shadow-blue-600/30 cursor-pointer hover:scale-102 active:scale-98"
                  >
                    <Sparkles size={16} />
                    <span>🚀 Generar Landing y Ver Demo</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Submit Action Bar si está en modo continuo */}
          {showAllSteps && (
            <div className="pt-2 flex items-center justify-between gap-4">
              <Link 
                href="/demo" 
                className="px-6 py-3.5 text-slate-500 font-bold hover:bg-slate-100 rounded-2xl transition-colors text-xs"
              >
                Cancelar y Volver
              </Link>
              <button 
                type="submit"
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white px-9 py-4 rounded-2xl font-black transition-all shadow-xl shadow-blue-600/30 flex items-center gap-2.5 text-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Sparkles size={18} />
                <span>Generar Landing con Inteligencia Artificial</span>
              </button>
            </div>
          )}
        </form>

        {/* Realtime Live Preview Column (Sticky on Desktop) */}
        <div className="lg:col-span-5 sticky top-6 space-y-4">
          
          {/* Preview Bar Header */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Eye size={15} className="text-blue-600" /> Vista Previa en Vivo
              </span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Tiempo Real
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                tier === 'advance'
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : tier === 'pro'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : tier === 'basic'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-stone-100 text-stone-700 border-stone-300'
              }`}>
                Plan {tier}
              </span>
              <span className="text-[10px] bg-blue-50 text-blue-700 font-extrabold px-2.5 py-0.5 rounded-full border border-blue-200 flex items-center gap-1">
                <Globe size={11} />
                {selectedLanguages.map(l => l.toUpperCase()).join(' + ')}
              </span>
            </div>
          </div>

          {/* Quick Template Switcher Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 text-[11px] px-0.5">
            {[
              { id: 'emerald-explorer', label: 'Diseño 6' },
              { id: 'agency-portal', label: 'Diseño 1' },
              { id: 'boho-nature', label: 'Boho' },
              { id: 'premium', label: 'VIP' },
              { id: 'adventure', label: 'Aventura' },
              { id: 'cultural', label: 'Cultural' }
            ].map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTemplate(t.id as TemplateType);
                }}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 border ${
                  template === t.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {t.id === 'emerald-explorer' && <Compass size={12} className={template === t.id ? 'text-white' : 'text-emerald-600'} />}
                {t.id === 'agency-portal' && <Zap size={12} className={template === t.id ? 'text-white' : 'text-[#FF5500]'} />}
                {t.id === 'boho-nature' && <Camera size={12} className={template === t.id ? 'text-white' : 'text-amber-600'} />}
                {t.id === 'premium' && <Crown size={12} className={template === t.id ? 'text-white' : 'text-amber-500'} />}
                {t.id === 'adventure' && <Mountain size={12} className={template === t.id ? 'text-white' : 'text-emerald-600'} />}
                {t.id === 'cultural' && <Landmark size={12} className={template === t.id ? 'text-white' : 'text-amber-700'} />}
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Smartphone Mockup */}
          <div className="bg-slate-950 rounded-[42px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-900 max-w-sm mx-auto">
            {/* Dynamic Island / Notch */}
            <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-2" />
            
            {/* Dynamic Screen View tailored to the chosen Template */}
            <div className={`rounded-[32px] overflow-hidden relative min-h-[580px] max-h-[620px] overflow-y-auto no-scrollbar border flex flex-col justify-between select-none ${
              template === 'emerald-explorer'
                ? 'bg-[#041716] text-white border-emerald-500/30'
                : template === 'agency-portal'
                ? 'bg-stone-900 text-white border-orange-500/30'
                : template === 'boho-nature'
                ? 'bg-[#FAF7F2] text-stone-900 border-[#C86D51]/30'
                : template === 'premium'
                ? 'bg-[#0C0A09] text-white border-amber-500/30'
                : template === 'cultural'
                ? 'bg-[#FFFDF9] text-stone-900 border-amber-300/60'
                : 'bg-white text-slate-800 border-slate-200'
            }`}>

              {/* 0. PLANTILLA DISEÑO 6: EMERALD EXPLORER (NAVIKX DEEP PETROL TEAL AZUL-VERDOSO) */}
              {template === 'emerald-explorer' && (
                <div 
                  className="flex flex-col min-h-full text-emerald-50 relative overflow-hidden"
                  style={{
                    backgroundColor: '#021016',
                    backgroundImage: `
                      radial-gradient(ellipse 90% 280px at 50% 120px, rgba(14, 165, 233, 0.30) 0%, rgba(13, 148, 136, 0.20) 40%, transparent 80%),
                      radial-gradient(ellipse 85% 320px at 90% 380px, rgba(20, 184, 166, 0.35) 0%, transparent 70%),
                      radial-gradient(ellipse 85% 320px at 10% 700px, rgba(2, 132, 199, 0.35) 0%, transparent 70%),
                      linear-gradient(180deg, #021219 0%, #031c26 120px, #062835 300px, #04212a 600px, #02161c 1000px)
                    `
                  }}
                >
                  {/* Aurora glow miniatura en hero centrado en contenido */}
                  <div className="absolute top-10 inset-x-0 h-48 bg-[radial-gradient(ellipse_at_center,rgba(13,148,136,0.38)_0%,rgba(2,132,199,0.28)_40%,transparent_80%)] blur-xl pointer-events-none z-0" />
                  {/* Halo lateral en destinos */}
                  <div className="absolute top-[420px] -right-16 w-48 h-48 bg-gradient-to-br from-emerald-600/25 to-teal-500/18 rounded-full blur-2xl pointer-events-none z-0" />
                  {/* Halo lateral en stats */}
                  <div className="absolute top-[680px] -left-16 w-48 h-48 bg-gradient-to-tr from-sky-600/25 to-cyan-500/18 rounded-full blur-2xl pointer-events-none z-0" />

                  {/* Top Bar Navigation */}
                  <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-white/10 bg-[#021219]/90 backdrop-blur-md sticky top-0 z-20 shadow-xs">
                    <div className="flex items-center gap-1.5 min-w-0 max-w-[150px]">
                      {logoUrl ? (
                        <img src={logoUrl} alt={companyName} className="w-5 h-5 object-contain rounded-lg border border-emerald-400/40 shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-[10px] shrink-0">
                          <Compass size={11} className="text-emerald-400 shrink-0" />
                        </div>
                      )}
                      <div className="min-w-0 truncate">
                        <span className="text-[10px] font-black tracking-wider text-white block leading-tight truncate">
                          {companyName || 'NavikX Tours'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Language pills */}
                      <div className="flex items-center bg-white/10 rounded-md p-0.5 border border-white/15">
                        {selectedLanguages.map(l => (
                          <button
                            key={l}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLanguage(l);
                            }}
                            className={`px-1.5 py-0.5 rounded text-[7px] font-black uppercase transition-all ${
                              l === language ? 'bg-emerald-400 text-slate-950 shadow-xs font-bold' : 'text-emerald-200 hover:text-white'
                            }`}
                          >
                            {l.toUpperCase()}
                          </button>
                        ))}
                      </div>

                      <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-[8px] px-2 py-0.5 rounded-full shadow-sm">
                        {language === 'en' ? 'Contact' : language === 'pt' ? 'Contato' : language === 'fr' ? 'Contact' : language === 'it' ? 'Contatto' : 'Contacto'}
                      </span>
                    </div>
                  </div>

                  {/* Hero Section */}
                  <div className="p-3.5 space-y-3">
                    {/* Hero Headline & Subtitle */}
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 bg-white/10 border border-emerald-400/30 px-2 py-0.5 rounded-full text-[8px] font-black text-emerald-300 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {heroBadge ? translateText(heroBadge, language) : translateText('Explore. Dream. Discover.', language)}
                      </div>
                      <h3 className="text-base font-black text-white leading-tight tracking-tight">
                        {heroTitle ? translateText(heroTitle, language) : translateText(name || 'Vive Tu Aventura: Expediciones & Trekking en Cusco', language)}
                      </h3>
                      <p className="text-[9px] text-emerald-200/80 line-clamp-2 leading-relaxed">
                        {translateText(heroSubtitle || description || 'Explora lugares asombrosos y crea recuerdos inolvidables alrededor del Cusco.', language)}
                      </p>
                    </div>

                    {/* Featured Hero Image Frame con Silueta Orgánica Limpia (Fiel al diseño NavikX) */}
                    <div className="relative py-1 flex items-center justify-center">
                      <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl pointer-events-none" />
                      
                      <div className="relative h-56 w-full rounded-[28px] rounded-tr-[65px] rounded-br-[75px] rounded-bl-[24px] overflow-hidden shadow-xl border border-white/10">
                        <Image 
                          src={(activeHeroImg && !activeHeroImg.includes('photo-1526392060635-9d6019884377')) ? activeHeroImg : '/images/hero-tourist-cusco.jpg'} 
                          alt="Emerald Explorer Hero" 
                          fill 
                          sizes="400px" 
                          className="object-cover" 
                        />

                        {/* Fade suave únicamente abajo para el texto de precio */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#03131a] via-[#03131a]/60 to-transparent z-10" />
                        
                        {/* Floating Local Experts Chip con Levitación */}
                        <div className="absolute top-2 left-2 z-20 bg-black/40 backdrop-blur-md border border-white/20 px-2 py-1 rounded-xl text-[8px] space-y-0.5 shadow-lg animate-float-badge">
                          <div className="flex items-center gap-1 text-emerald-300 font-bold">
                            <MapPin size={9} className="text-emerald-400 shrink-0" /> {translateText('Local Experts', language)}
                          </div>
                          <span className="text-[7px] text-emerald-100/70 block">{translateText('Authentic experiences', language)}</span>
                        </div>

                        {/* Bottom Price Tag on Hero (Translúcido Flotante con Levitación) */}
                        <div className="absolute bottom-2 inset-x-2 z-20 flex items-center justify-between p-1 rounded-xl bg-black/50 backdrop-blur-md border border-white/20 shadow-md animate-emerald-float-alt">
                          <span className="text-emerald-100 text-[8px] font-bold px-1.5 truncate">
                            {translateText(heroTitle || name || 'Vive Tu Aventura', language)}
                          </span>
                          <span className="emerald-shimmer-btn bg-emerald-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-lg shadow-sm">
                            {price || '$350 USD'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Floating Pill Search Bar (Glassmorphism Suave con Pulso de Brillo) */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1.5 flex items-center justify-between text-[8px] text-emerald-100 shadow-[0_10px_25px_rgba(0,0,0,0.3)] animate-pill-glow">
                      <div className="flex items-center gap-1 px-1.5 py-0.5 border-r border-white/10 flex-1 truncate">
                        <MapPin size={9} className="text-emerald-400 shrink-0" />
                        <span className="truncate">{destination ? translateText(destination, language) : (language === 'en' ? 'Where to?' : language === 'pt' ? 'Onde ir?' : language === 'fr' ? 'Où aller ?' : language === 'it' ? 'Dove andare?' : '¿A dónde deseas ir?')}</span>
                      </div>
                      <div className="flex items-center gap-1 px-1.5 py-0.5 border-r border-white/10 shrink-0">
                        <Calendar size={9} className="text-emerald-400" />
                        <span>{duration ? translateText(duration, language) : (language === 'en' ? 'Dates' : language === 'pt' ? 'Datas' : language === 'fr' ? 'Dates' : language === 'it' ? 'Date' : 'Fechas')}</span>
                      </div>
                      <div className="emerald-shimmer-btn bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black px-2.5 py-1 rounded-xl shrink-0 flex items-center gap-1 shadow-xs">
                        <Search size={9} />
                        <span>{heroCta ? translateText(heroCta, language) : (language === 'en' ? 'Search' : language === 'pt' ? 'Explorar' : language === 'fr' ? 'Explorer' : language === 'it' ? 'Esplora' : 'Buscar')}</span>
                      </div>
                    </div>

                    {/* 3 Bento Benefit Cards (Flotantes Translúcidas con Animación) */}
                    <div className="grid grid-cols-3 gap-1.5 text-center text-[8px]">
                      <div className="glass-floating-card p-2 rounded-xl space-y-0.5 shadow-xs animate-emerald-float">
                        <span className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-300 mx-auto flex items-center justify-center text-[10px] mb-1">
                          <Users size={12} className="text-emerald-300" />
                        </span>
                        <span className="font-black text-white block line-clamp-1">{translateText('Guías Expertos', language)}</span>
                        <span className="text-[7px] text-emerald-200/70 block line-clamp-1">{translateText('Conocimiento local y tips auténticos', language)}</span>
                      </div>
                      <div className="glass-floating-card p-2 rounded-xl space-y-0.5 shadow-xs animate-emerald-float-delayed">
                        <span className="w-5 h-5 rounded-lg bg-teal-500/20 text-teal-300 mx-auto flex items-center justify-center text-[10px] mb-1">
                          <FileText size={12} className="text-teal-300" />
                        </span>
                        <span className="font-black text-white block line-clamp-1">{translateText('Rutas a Medida', language)}</span>
                        <span className="text-[7px] text-emerald-200/70 block line-clamp-1">{translateText('Planes flexibles para cada viajero', language)}</span>
                      </div>
                      <div className="glass-floating-card p-2 rounded-xl space-y-0.5 shadow-xs animate-emerald-float-alt">
                        <span className="w-5 h-5 rounded-lg bg-amber-500/20 text-amber-300 mx-auto flex items-center justify-center text-[10px] mb-1">
                          <ShieldCheck size={12} className="text-amber-300" />
                        </span>
                        <span className="font-black text-white block line-clamp-1">{translateText('Mejor Precio Garantizado', language)}</span>
                        <span className="text-[7px] text-emerald-200/70 block line-clamp-1">{translateText('Tarifas directas sin intermediarios', language)}</span>
                      </div>
                    </div>

                    {/* Popular Destinations Slider */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-black text-white flex items-center gap-1">
                          {translateText('Destinos Populares', language)}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="w-4 h-4 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[8px] text-emerald-300 shadow-xs">
                            ‹
                          </span>
                          <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-[8px] shadow-xs">
                            ›
                          </span>
                        </div>
                      </div>

                      {/* Destination Card 1 */}
                      <div className="glass-floating-card rounded-2xl overflow-hidden p-2 space-y-2 shadow-xs">
                        <div className="relative h-28 rounded-xl overflow-hidden">
                          <Image src={activeHeroImg} alt="Popular Destination" fill sizes="300px" className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                          
                          {/* Rating chip & Heart */}
                          <div className="absolute top-1.5 inset-x-1.5 flex items-center justify-between">
                            <span className="bg-black/40 backdrop-blur-md text-amber-300 font-bold text-[8px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5 border border-white/20">
                              ★ 4.8
                            </span>
                            <span className="w-5 h-5 rounded-full bg-black/40 backdrop-blur-md text-rose-500 flex items-center justify-center text-[9px] border border-white/20">
                              <Heart size={9} className="text-rose-500 fill-rose-500" />
                            </span>
                          </div>

                          <div className="absolute bottom-1.5 inset-x-2 flex items-baseline justify-between text-white">
                            <span className="text-[10px] font-black truncate">{destination ? translateText(destination, language) : 'Machu Picchu & Cusco'}</span>
                            <span className="text-[10px] font-black text-emerald-300">{price || '$350 USD'}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-0.5">
                          {/* Avatar Stack */}
                          <div className="flex items-center gap-1 text-[8px] text-slate-500">
                            <div className="flex -space-x-1.5">
                              <div className="w-4 h-4 rounded-full bg-amber-400 border border-white" />
                              <div className="w-4 h-4 rounded-full bg-teal-400 border border-white" />
                              <div className="w-4 h-4 rounded-full bg-emerald-500 border border-white" />
                            </div>
                            <span>{language === 'en' ? '236+ Travelers' : language === 'pt' ? '236+ Viajantes' : language === 'fr' ? '236+ Voyageurs' : language === 'it' ? '236+ Viaggiatori' : '236+ Viajeros'}</span>
                          </div>

                          <div className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-[9px] px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1">
                            <span>{translateText('Reservar Tour', language)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bento Journey Stats (1,250+ / 98%) */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 p-2.5 rounded-2xl flex items-center justify-between shadow-sm">
                        <div>
                          <span className="text-xs font-black text-white block">1,250+</span>
                          <span className="text-[8px] text-emerald-300/80 font-semibold block">{translateText('Viajeros Felices', language)}</span>
                        </div>
                        <span className="w-6 h-6 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px]">
                          <Users size={12} className="text-emerald-300" />
                        </span>
                      </div>

                      <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 p-2.5 rounded-2xl flex items-center justify-between shadow-sm">
                        <div>
                          <span className="text-xs font-black text-white block">98%</span>
                          <span className="text-[8px] text-emerald-300/80 font-semibold block">{translateText('Reseñas Positivas', language)}</span>
                        </div>
                        <span className="w-6 h-6 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px]">
                          <Star size={12} className="text-amber-300 fill-amber-300" />
                        </span>
                      </div>
                    </div>

                    {/* Logística & Servicios VIP Advance */}
                    <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 p-3 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-black uppercase text-emerald-400 tracking-wider">
                          Logística Integral Advance
                        </span>
                        <span className="text-[7px] text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded-full border border-emerald-400/30">
                          100% Incluido
                        </span>
                      </div>
                      <div className="space-y-1 text-[8px] text-emerald-100/90">
                        <div className="flex items-center gap-1.5">
                          <span className="text-emerald-400 font-bold">✓</span> Transporte 4x4 + Boletos Oficiales
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-emerald-400 font-bold">✓</span> Balón Oxígeno & Monitoreo Médico
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-emerald-400 font-bold">✓</span> Guía Colegiado Bilingüe DIRCETUR
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sticky Bottom Navigation Bar with Coral Button */}
                  <div className="mt-auto p-2.5 bg-[#02111d]/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-between gap-2 text-[9px] sticky bottom-0 z-20">
                    <div className="flex items-center gap-2 text-emerald-300/80 text-[8px] min-w-0 max-w-[130px]">
                      <div className="min-w-0 truncate">
                        <span className="font-bold text-white block truncate">{companyName || 'NavikX Tours'}</span>
                        <span className="truncate block text-[7px] text-emerald-300/70">{companyRuc || '50+ Destinos'}</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-black px-3.5 py-2 rounded-xl shadow-md flex items-center gap-1 text-[9px] shrink-0">
                      <span>{objective === 'quote' ? 'Plan Your Trip' : 'Reservar por WhatsApp'}</span>
                      <ArrowRight size={10} />
                    </div>
                  </div>
                </div>
              )}

              {/* 1. PLANTILLA DISEÑO 1: PORTAL AGENCIA (VINICUNCA ORANGE) */}
              {template === 'agency-portal' && (
                <div className="flex flex-col min-h-full">
                  {/* Hero with Photo */}
                  <div className="relative h-64 w-full bg-stone-900 shrink-0">
                    <Image 
                      src={activeHeroImg} 
                      alt="Hero Preview" 
                      fill 
                      sizes="400px"
                      className="object-cover opacity-75" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-black/40 to-black/60" />
                    
                    {/* Top Bar with Dynamic Language Switcher */}
                    <div className="absolute top-3 inset-x-3 flex justify-between items-center text-[10px]">
                      <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white font-extrabold flex items-center gap-1.5 border border-white/10 min-w-0 max-w-[150px]">
                        {logoUrl ? (
                          <img src={logoUrl} alt={companyName} className="w-3.5 h-3.5 object-contain rounded shrink-0" />
                        ) : (
                          <span className="relative flex h-1.5 w-1.5 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                          </span>
                        )}
                        <span className="truncate text-[9px]">{companyName || 'DIRCETUR Oficial'}</span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        {/* Selected Languages Switcher in Preview */}
                        <div className="flex items-center bg-black/70 backdrop-blur-md rounded-md p-0.5 border border-white/15">
                          {selectedLanguages.map(l => (
                            <button
                              key={l}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setLanguage(l);
                              }}
                              className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase transition-all ${
                                l === language ? 'bg-[#FF5500] text-white shadow-xs' : 'text-stone-300 hover:text-white'
                              }`}
                            >
                              {l.toUpperCase()}
                            </button>
                          ))}
                        </div>
                        <span className="bg-white/20 backdrop-blur-md text-white font-bold px-2 py-0.5 rounded-full">
                          {price || '$380 USD'}
                        </span>
                      </div>
                    </div>

                    {/* Hero Content */}
                    <div className="absolute bottom-3 inset-x-3 space-y-1.5">
                      <span className="inline-flex items-center gap-1 bg-[#FF5500]/90 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-xs">
                        <Zap size={9} className="text-white fill-white" /> {heroBadge ? translateText(heroBadge, language) : 'Portal Agencia VIP'}
                      </span>
                      <h3 className="text-base font-black leading-tight text-white drop-shadow-md line-clamp-2">
                        {heroTitle ? translateText(heroTitle, language) : (name || 'Machu Picchu VIP con Tren Panorámico')}
                      </h3>
                      <p className="text-[10px] text-stone-200 line-clamp-1">
                        {heroSubtitle ? translateText(heroSubtitle, language) : `${destination || 'Cusco'} • ${duration || 'Full Day'} • Guía Historiador`}
                      </p>

                      <div className="pt-1">
                        <div className="w-full bg-gradient-to-r from-[#FF5500] to-[#FF3000] text-white font-black py-2 px-3 rounded-xl text-center text-[11px] shadow-md shadow-[#FF5500]/40 flex items-center justify-center gap-1.5">
                          <span>{heroCta ? translateText(heroCta, language) : (objective === 'quote' ? 'SOLICITAR COTIZACIÓN' : objective === 'both' ? 'WHATSAPP & COTIZACIÓN' : 'RESERVAR CON GUÍA')}</span>
                          <ArrowRight size={13} className="animate-bounce-x" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Bar */}
                  <div className="bg-white text-stone-900 py-2.5 px-3 border-y border-stone-200 shrink-0">
                    <div className="grid grid-cols-3 gap-1 text-center">
                      <div className="p-1 rounded-lg bg-stone-50">
                        <span className="text-xs font-black block text-stone-900 animate-number-glow">+10,000</span>
                        <span className="text-[8px] text-stone-500 font-bold block">Viajeros</span>
                      </div>
                      <div className="p-1 rounded-lg bg-stone-50">
                        <span className="text-xs font-black block text-[#FF5500] animate-pulse-subtle">10+ Años</span>
                        <span className="text-[8px] text-stone-500 font-bold block">Experiencia</span>
                      </div>
                      <div className="p-1 rounded-lg bg-stone-50">
                        <span className="text-xs font-black block text-[#FF5500] animate-pulse-subtle">4.9 ★</span>
                        <span className="text-[8px] text-stone-500 font-bold block">Reviews</span>
                      </div>
                    </div>
                  </div>

                  {/* Mini Tour Catalog Section */}
                  <div className="p-3 bg-stone-950 space-y-2 flex-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-extrabold text-stone-300">Catálogo de Tours Exclusivos</span>
                      <span className="text-[#FF5500] font-bold text-[9px]">Ver todos (6)</span>
                    </div>

                    <div className="bg-stone-900 rounded-xl p-2 border border-stone-800 flex items-center gap-2.5">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-800 shrink-0">
                        <Image src={activeHeroImg} alt="Tour" fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[11px] font-black text-white truncate">{name || 'Machu Picchu VIP'}</h4>
                        <p className="text-[9px] text-stone-400">{duration || 'Full Day'} • {destination || 'Cusco'}</p>
                        <span className="text-xs font-black text-[#FF5500]">{price || '$380 USD'}</span>
                      </div>
                    </div>

                    {/* Mini Oficina Física & Google Maps Card */}
                    <div className="p-2.5 bg-stone-900/95 rounded-xl border border-stone-800 space-y-1 text-[9px]">
                      <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                        <MapPin size={11} className="text-[#FF5500] shrink-0" />
                        <span>Oficina Física en Cusco:</span>
                      </div>
                      <p className="text-stone-300 line-clamp-1 text-[8px] pl-4">
                        {officeAddress || 'Portal de Panes N° 123, Plaza de Armas, Cusco'}
                      </p>
                      <div className="flex items-center justify-between pt-1 pl-4 text-[8px]">
                        <span className="text-emerald-400 font-semibold">{officeHours || 'Lun-Dom: 8am - 8pm'}</span>
                        <span className="text-blue-400 font-bold flex items-center gap-0.5">
                          <Navigation size={8} /> Maps Conectado
                        </span>
                      </div>
                    </div>

                    {/* Certifications Footer */}
                    <div className="pt-1 flex flex-col items-center justify-center gap-1 text-[8px] text-stone-400 font-bold">
                      <div className="flex items-center gap-3">
                        <span>✓ MINCETUR</span>
                        <span>✓ DIRCETUR</span>
                        <span>✓ SAFE TRAVELS</span>
                      </div>
                      <div className="text-[7px] text-stone-500 text-center font-normal">
                        {companyName || 'Cusco Creativos'} {companyRuc ? `• ${companyRuc}` : ''}
                      </div>
                    </div>
                  </div>

                  {/* Floating WhatsApp Button on corner */}
                  <div className="sticky bottom-3 right-3 ml-auto pr-3 pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg relative ml-auto">
                      <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white border border-[#25D366]"></span>
                      </span>
                      <MessageCircle size={15} className="fill-white" />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. PLANTILLA BOHO TRAVEL JOURNAL (PINTEREST STYLE) */}
              {template === 'boho-nature' && (
                <div className="flex flex-col min-h-full bg-[#FAF7F2]">
                  <div className="p-4 space-y-3">
                    {/* Top Header */}
                    <div className="flex justify-between items-center text-[10px] text-stone-600 pb-1 border-b border-stone-200">
                      <span className="font-extrabold flex items-center gap-1 text-[#C86D51] min-w-0 max-w-[140px]">
                        {logoUrl ? (
                          <img src={logoUrl} alt={companyName} className="w-3.5 h-3.5 object-contain rounded shrink-0" />
                        ) : (
                          <Compass size={11} className="text-[#C86D51] shrink-0" />
                        )}
                        <span className="truncate">{companyName || 'BOHO TRAVEL JOURNAL'}</span>
                      </span>
                      <span className="bg-[#E8DEC8] px-2 py-0.5 rounded-full font-mono text-[9px] text-stone-800 shrink-0">
                        {companyRuc || 'CUSCO • PINTEREST'}
                      </span>
                    </div>

                    {/* Polaroid Frame */}
                    <div className="bg-white p-3 pb-4 rounded-xl shadow-md border border-stone-200 -rotate-1 relative">
                      <div className="w-16 h-3 bg-[#E8DEC8]/90 absolute -top-1.5 left-1/2 -translate-x-1/2 rotate-1 shadow-2xs" />
                      <div className="relative h-44 w-full rounded-lg overflow-hidden bg-stone-100 mb-2">
                        <Image src={activeHeroImg} alt="Polaroid" fill sizes="400px" className="object-cover" />
                        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                          {altitude || '4,200 msnm'}
                        </div>
                      </div>
                      <p className="text-[11px] font-serif font-black text-stone-900 leading-snug line-clamp-1">
                        {heroTitle ? translateText(heroTitle, language) : (name || 'Laguna Humantay — Bitácora Fotográfica')}
                      </p>
                      <p className="text-[9px] text-stone-500 italic mt-0.5 line-clamp-1">
                        {heroSubtitle ? translateText(heroSubtitle, language) : '"Anotaciones de campo: Luz dorada sobre los nevados."'}
                      </p>
                    </div>

                    {/* Mini Highlights Chips */}
                    <div className="grid grid-cols-2 gap-1.5 text-[9px]">
                      <div className="bg-[#F0EAE1] p-1.5 rounded-lg text-stone-700 font-bold flex items-center gap-1">
                        <Star size={11} className="text-amber-500 fill-amber-500 shrink-0" /> 4.9 (340+ reviews)
                      </div>
                      <div className="bg-[#F0EAE1] p-1.5 rounded-lg text-stone-700 font-bold flex items-center gap-1">
                        <Camera size={11} className="text-stone-700 shrink-0" /> Spots Fotográficos
                      </div>
                    </div>

                    {/* Details & CTA */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                        <span>Tarifa Especial:</span>
                        <span className="text-[#C86D51] font-black text-sm">{price || 'S/ 160 PEN'}</span>
                      </div>

                      <div className="w-full bg-[#C86D51] hover:bg-[#b05d43] text-white font-bold py-2.5 px-3 rounded-xl text-center text-xs shadow-md flex items-center justify-center gap-1.5">
                        <Camera size={14} />
                        <span>{heroCta ? translateText(heroCta, language) : (objective === 'quote' ? 'Consultar Cupo' : objective === 'both' ? 'WhatsApp & Cotizar' : 'Reservar por WhatsApp')}</span>
                      </div>

                      <p className="text-center text-[9px] text-stone-400">
                        Guía Fotográfica: <strong>{guideName || 'Camila Valdivia'}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Mini Tour Catalog Section */}
                  <div className="p-3 bg-[#F4EFEA] border-t border-stone-200/80 space-y-2 flex-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-extrabold text-stone-800">Catálogo de Tours Exclusivos</span>
                      <span className="text-[#C86D51] font-bold text-[9px]">Ver todos (6)</span>
                    </div>

                    <div className="bg-white rounded-xl p-2 border border-stone-200 shadow-xs flex items-center gap-2.5">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                        <Image src={activeHeroImg} alt="Tour" fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[11px] font-black text-stone-900 truncate">{name || 'Laguna Humantay Boho'}</h4>
                        <p className="text-[9px] text-stone-500">{duration || 'Full Day'} • {destination || 'Cusco'}</p>
                        <span className="text-xs font-black text-[#C86D51]">{price || 'S/ 160 PEN'}</span>
                      </div>
                    </div>

                    {/* Mini Oficina Física & Google Maps Card */}
                    <div className="p-2.5 bg-white rounded-xl border border-stone-200 space-y-1 text-[9px] shadow-xs">
                      <div className="flex items-center gap-1.5 text-[#C86D51] font-bold">
                        <MapPin size={11} className="text-[#C86D51] shrink-0" />
                        <span>Oficina Física en Cusco:</span>
                      </div>
                      <p className="text-stone-700 line-clamp-1 text-[8px] pl-4">
                        {officeAddress || 'Portal de Panes N° 123, Plaza de Armas, Cusco'}
                      </p>
                      <div className="flex items-center justify-between pt-1 pl-4 text-[8px]">
                        <span className="text-emerald-700 font-semibold">{officeHours || 'Lun-Dom: 8am - 8pm'}</span>
                        <span className="text-blue-600 font-bold flex items-center gap-0.5">
                          <Navigation size={8} /> Maps Conectado
                        </span>
                      </div>
                    </div>

                    {/* Certifications Footer */}
                    <div className="pt-1 flex flex-col items-center justify-center gap-1 text-[8px] text-stone-500 font-bold">
                      <div className="flex items-center gap-3">
                        <span>✓ MINCETUR</span>
                        <span>✓ DIRCETUR</span>
                        <span>✓ SAFE TRAVELS</span>
                      </div>
                      <div className="text-[7px] text-stone-400 text-center font-normal">
                        © 2026 {companyName || 'Boho Travel Journal'} {companyRuc ? `• ${companyRuc}` : ''}
                      </div>
                    </div>
                  </div>

                  {/* Floating WhatsApp Button on corner */}
                  <div className="sticky bottom-3 right-3 ml-auto pr-3 pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg relative ml-auto">
                      <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white border border-[#25D366]"></span>
                      </span>
                      <MessageCircle size={15} className="fill-white" />
                    </div>
                  </div>
                </div>
              )}

              {/* 3. PLANTILLA PREMIUM: LUJO & EXCLUSIVO (VIP) */}
              {template === 'premium' && (
                <div className="flex flex-col min-h-full bg-[#0a080e] text-stone-200">
                  {/* Top Live Trust Strip */}
                  <div className="bg-gradient-to-r from-amber-950/80 via-black to-amber-950/80 border-b border-amber-500/20 px-3 py-1.5 flex items-center justify-between text-[8px] text-amber-300 font-bold">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Salidas Diarias 2026
                    </span>
                    <span className="text-amber-200 flex items-center gap-1">
                      <Star size={9} className="text-amber-400 fill-amber-400" />
                      <span>4.9/5 • Safe Travels</span>
                    </span>
                  </div>

                  {/* Header bar */}
                  <div className="px-4 py-2.5 flex items-center justify-between border-b border-amber-500/15 bg-black/40 backdrop-blur-md">
                    <div className="flex items-center gap-1.5 min-w-0 max-w-[150px]">
                      {logoUrl ? (
                        <img src={logoUrl} alt={companyName} className="w-4 h-4 object-contain rounded shrink-0" />
                      ) : (
                        <Crown size={13} className="text-amber-400 shrink-0" />
                      )}
                      <span className="text-[11px] font-black tracking-widest text-amber-300 truncate">
                        {companyName ? companyName.toUpperCase() : 'CUSCO LUXURY VIP'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[8px] font-bold text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      <span>ES</span>
                      <span>•</span>
                      <span>EN</span>
                      <span>•</span>
                      <span>FR</span>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-3">
                    {/* Hero Card */}
                    <div className="relative h-48 rounded-2xl overflow-hidden border border-amber-500/30 shadow-lg shadow-black/80">
                      <Image src={activeHeroImg} alt="Luxury" fill sizes="400px" className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a080e] via-[#0a080e]/40 to-transparent" />
                      
                      <div className="absolute top-2 left-2 flex items-center gap-1 bg-amber-500/90 text-stone-950 px-2 py-0.5 rounded-full text-[8px] font-black tracking-wider uppercase shadow-md">
                        <Crown size={9} />
                        <span>{heroBadge || 'Colección Privada 5★'}</span>
                      </div>

                      <div className="absolute bottom-2.5 left-2.5 right-2.5 space-y-1">
                        <span className="text-[9px] text-amber-300 font-bold uppercase tracking-wider block">
                          Servicio Privado Exclusivo
                        </span>
                        <h3 className="text-sm font-black text-white leading-tight line-clamp-2">
                          {heroTitle ? translateText(heroTitle, language) : (name || 'Cusco Luxury Collection VIP')}
                        </h3>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs font-black text-amber-400">
                            {price || '$890 USD'} <span className="text-[8px] font-normal text-stone-300">/ persona</span>
                          </span>
                          <span className="text-[8px] text-stone-300 bg-stone-900/80 px-2 py-0.5 rounded-md border border-stone-700">
                            {duration || '2 Días / 1 Noche'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black py-2 px-2 rounded-xl text-center text-[10px] shadow-md flex items-center justify-center gap-1 cursor-pointer">
                        <Crown size={12} className="shrink-0" />
                        <span className="truncate">{heroCta ? translateText(heroCta, language) : (objective === 'quote' ? 'Solicitar VIP' : 'Propuesta VIP')}</span>
                      </div>
                      <div className="bg-stone-900/90 border border-emerald-500/40 text-emerald-300 font-bold py-2 px-2 rounded-xl text-center text-[10px] flex items-center justify-center gap-1">
                        <MessageCircle size={12} className="text-emerald-400 shrink-0" />
                        <span className="truncate">WhatsApp</span>
                      </div>
                    </div>

                    {/* Sensory Highlights (Momentos Inolvidables) */}
                    <div className="bg-gradient-to-br from-amber-950/30 to-stone-950 p-2.5 rounded-xl border border-amber-500/20 space-y-2">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-extrabold text-amber-300 flex items-center gap-1">
                          <Sparkles size={11} className="text-amber-400" /> Vivencias Sensoriales
                        </span>
                        <span className="text-stone-400 text-[8px]">100% Incluido</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 text-center text-[8px]">
                        <div className="p-1.5 rounded-lg bg-stone-900/80 border border-amber-500/10 flex flex-col items-center">
                          <Wine size={12} className="text-amber-400 mb-0.5" />
                          <span className="font-bold text-stone-200 line-clamp-1">Belmond Lodge</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-stone-900/80 border border-amber-500/10 flex flex-col items-center">
                          <Sparkles size={12} className="text-amber-400 mb-0.5" />
                          <span className="font-bold text-stone-200 line-clamp-1">Hiram Bingham</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-stone-900/80 border border-amber-500/10 flex flex-col items-center">
                          <ShieldCheck size={12} className="text-amber-400 mb-0.5" />
                          <span className="font-bold text-stone-200 line-clamp-1">SUV Privada</span>
                        </div>
                      </div>
                    </div>

                    {/* Tours Catalog Mini List */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-extrabold text-white flex items-center gap-1">
                          <Landmark size={11} className="text-amber-400" /> Tours & Paquetes Privados
                        </span>
                        <span className="text-amber-400 font-bold text-[8px] bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">6 VIP</span>
                      </div>

                      {/* Tour 1 */}
                      <div className="bg-stone-900/90 rounded-xl p-2 border border-amber-500/20 flex items-center gap-2">
                        <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-stone-800 shrink-0 border border-amber-500/30">
                          <Image src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=300&auto=format&fit=crop" alt="Hiram Bingham" fill sizes="80px" className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[10px] font-black text-white truncate">Machu Picchu Hiram Bingham</h4>
                          <p className="text-[8px] text-stone-400">Full Day • Belmond Lodge</p>
                          <span className="text-[10px] font-black text-amber-400">$890 USD</span>
                        </div>
                        <span className="text-[8px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-1 rounded-md shrink-0">
                          Ver
                        </span>
                      </div>

                      {/* Tour 2 */}
                      <div className="bg-stone-900/90 rounded-xl p-2 border border-amber-500/20 flex items-center gap-2">
                        <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-stone-800 shrink-0 border border-amber-500/30">
                          <Image src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=300&auto=format&fit=crop" alt="Valle Sagrado VIP" fill sizes="80px" className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[10px] font-black text-white truncate">Valle Sagrado & Hacienda</h4>
                          <p className="text-[8px] text-stone-400">Huayoccari • Privado</p>
                          <span className="text-[10px] font-black text-amber-400">$290 USD</span>
                        </div>
                        <span className="text-[8px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-1 rounded-md shrink-0">
                          Ver
                        </span>
                      </div>

                      {/* Tour 3 */}
                      <div className="bg-stone-900/90 rounded-xl p-2 border border-amber-500/20 flex items-center gap-2">
                        <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-stone-800 shrink-0 border border-amber-500/30">
                          <Image src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=300&auto=format&fit=crop" alt="Humantay Glamping" fill sizes="80px" className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[10px] font-black text-white truncate">Humantay Glamping Dome</h4>
                          <p className="text-[8px] text-stone-400">Domo Geodésico • Chef</p>
                          <span className="text-[10px] font-black text-amber-400">$320 USD</span>
                        </div>
                        <span className="text-[8px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-1 rounded-md shrink-0">
                          Ver
                        </span>
                      </div>
                    </div>

                    {/* Ficha Técnica & Concierge */}
                    <div className="p-2.5 rounded-xl bg-stone-900/95 border border-amber-500/20 space-y-1.5 text-[9px]">
                      <div className="flex items-center justify-between text-amber-300 font-bold">
                        <span className="flex items-center gap-1">
                          <ShieldCheck size={11} className="text-amber-400" />
                          Garantía Luxury
                        </span>
                        <span className="text-emerald-400 text-[8px]">100% Privado</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-[8px] text-stone-300 pt-0.5">
                        <div className="bg-black/40 p-1.5 rounded border border-stone-800">
                          <span className="text-amber-400/80 block">Guía Asignado:</span>
                          <span className="font-bold text-white">{guideName || 'Carlos Mendoza'}</span>
                        </div>
                        <div className="bg-black/40 p-1.5 rounded border border-stone-800">
                          <span className="text-amber-400/80 block">Seguridad:</span>
                          <span className="font-bold text-white">Oxígeno & Médico</span>
                        </div>
                      </div>
                    </div>

                    {/* Salón VIP & Ubicación Física */}
                    <div className="p-2.5 bg-gradient-to-br from-stone-900 to-black rounded-xl border border-amber-500/30 space-y-1.5 text-[9px]">
                      <div className="flex items-center justify-between text-amber-400 font-bold">
                        <span className="flex items-center gap-1">
                          <MapPin size={11} className="text-amber-400 shrink-0" />
                          Salón VIP Plaza de Armas:
                        </span>
                        <span className="text-blue-400 font-bold text-[8px] flex items-center gap-0.5">
                          <Navigation size={8} /> Maps Conectado
                        </span>
                      </div>
                      <p className="text-stone-300 text-[8px] pl-3.5">
                        {officeAddress || 'Portal de Carnicerías 236, Plaza de Armas, Centro Histórico, Cusco'}
                      </p>
                      <div className="flex items-center justify-between pt-0.5 pl-3.5 text-[8px]">
                        <span className="text-emerald-400 font-semibold">{officeHours || 'Lun-Dom: 07:00 AM - 09:00 PM'}</span>
                        <span className="text-amber-300 font-medium">Café de Especialidad</span>
                      </div>
                    </div>

                    {/* Certifications Footer */}
                    <div className="pt-2 pb-3 flex flex-col items-center justify-center gap-1 text-[7px] text-amber-400/70 font-bold tracking-wider">
                      <div className="flex items-center gap-2">
                        <span>✓ MINCETUR</span>
                        <span>•</span>
                        <span>✓ DIRCETUR</span>
                        <span>•</span>
                        <span>✓ SAFE TRAVELS</span>
                      </div>
                      <div className="text-amber-400/50 text-center font-normal">
                        {companyName || 'Cusco Luxury Collection VIP'} {companyRuc ? `• ${companyRuc}` : '• RUC 20'}
                      </div>
                    </div>
                  </div>

                  {/* Floating WhatsApp Button on corner */}
                  <div className="sticky bottom-3 right-3 ml-auto pr-3 pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg relative ml-auto">
                      <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white border border-[#25D366]"></span>
                      </span>
                      <MessageCircle size={15} className="fill-white" />
                    </div>
                  </div>
                </div>
              )}

              {/* 4. PLANTILLA AVENTURA & TREKKING (TRAVEL THE BEST / MODERN CLEAN) */}
              {template === 'adventure' && (
                <div className="flex flex-col min-h-full bg-white text-slate-800">
                  {/* Hero con Imagen de Fondo Completo */}
                  <div className="relative min-h-[220px] p-4 flex flex-col justify-between overflow-hidden">
                    <Image 
                      src={activeHeroImg} 
                      alt="Trekker" 
                      fill 
                      sizes="400px" 
                      className="object-cover object-center" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/30" />
                    
                    {/* Top Pill Header */}
                    <div className="relative z-10 flex justify-between items-center text-[10px]">
                      <span className="bg-white/20 backdrop-blur-md text-white font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/20 min-w-0 max-w-[140px]">
                        {logoUrl ? (
                          <img src={logoUrl} alt={companyName} className="w-3.5 h-3.5 object-contain rounded shrink-0" />
                        ) : (
                          <Compass size={11} className="text-emerald-400 shrink-0" />
                        )}
                        <span className="truncate">{companyName || 'Discover the World'}</span>
                      </span>
                      <span className="bg-black/40 backdrop-blur-md text-white font-bold text-[9px] px-2 py-0.5 rounded-full border border-white/20 shrink-0">
                        {companyRuc || altitude || '4,630 msnm'}
                      </span>
                    </div>

                    {/* Headline Banner */}
                    <div className="relative z-10 space-y-1 mt-6 mb-2">
                      <div className="inline-flex items-center gap-1 bg-white/20 text-white text-[8px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs mb-1">
                        <span>{heroBadge || 'Trekking & Montaña'}</span>
                      </div>
                      <h3 className="text-sm font-black text-white leading-tight drop-shadow-md">
                        {heroTitle ? translateText(heroTitle, language) : (name ? translateText(name, language) : 'Travel the Best, It\'s a Big World, Go Explore!')}
                      </h3>
                      <p className="text-[10px] text-slate-200 line-clamp-1">
                        {heroSubtitle ? translateText(heroSubtitle, language) : `${name || 'Tour Salkantay Trek Clásico'} • ${duration || '5 Días'}`}
                      </p>
                    </div>

                    {/* Floating Review Badge */}
                    <div className="relative z-10 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-full shadow-md flex items-center justify-between text-[9px]">
                      <span className="font-bold text-slate-900">Our Happy Customers</span>
                      <div className="flex items-center gap-1 font-black text-slate-900">
                        <span className="text-amber-500">★</span>
                        <span>4.9 (10.2k)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">

                    {/* Quick Searched Spots Pills (Mini) */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-slate-800 block">
                        Explore Top Searched Spots
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 text-[9px]">
                        <div className="bg-slate-50 border border-slate-200/80 p-1.5 rounded-xl font-bold flex items-center justify-between">
                          <span className="truncate">Salkantay Trek</span>
                          <span className="text-slate-400">450</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200/80 p-1.5 rounded-xl font-bold flex items-center justify-between">
                          <span className="truncate">Camino Inca</span>
                          <span className="text-slate-400">380</span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="text-slate-400 font-bold">Tarifa Todo Incluido:</span>
                        <span className="text-base font-black text-slate-900">{price || '$350 USD'}</span>
                      </div>
                      <div className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-2.5 px-3 rounded-full text-center text-xs shadow-md flex items-center justify-center gap-1.5">
                        <ArrowRight size={13} />
                        <span>{heroCta ? translateText(heroCta, language) : (objective === 'quote' ? 'Get Started / Cotizar' : objective === 'both' ? 'WhatsApp & Cotizar' : 'Get Started / Reservar')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Mini Tour Catalog Section */}
                  <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-2 flex-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-extrabold text-slate-800">Catálogo de Tours Exclusivos</span>
                      <span className="text-blue-600 font-bold text-[9px]">Ver todos (6)</span>
                    </div>

                    <div className="bg-white rounded-xl p-2 border border-slate-200 shadow-2xs flex items-center gap-2.5">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                        <Image src={activeHeroImg} alt="Tour" fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[11px] font-black text-slate-900 truncate">{name || 'Salkantay Trek Clásico'}</h4>
                        <p className="text-[9px] text-slate-500">{duration || '5 Días'} • {destination || 'Cusco'}</p>
                        <span className="text-xs font-black text-slate-900">{price || '$350 USD'}</span>
                      </div>
                    </div>

                    {/* Mini Oficina Física & Google Maps Card */}
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1 text-[9px]">
                      <div className="flex items-center gap-1.5 text-blue-600 font-bold">
                        <MapPin size={11} className="text-blue-600 shrink-0" />
                        <span>Oficina Física en Cusco:</span>
                      </div>
                      <p className="text-slate-600 line-clamp-1 text-[8px] pl-4">
                        {officeAddress || 'Portal de Panes N° 123, Plaza de Armas, Cusco'}
                      </p>
                      <div className="flex items-center justify-between pt-1 pl-4 text-[8px]">
                        <span className="text-emerald-700 font-semibold">{officeHours || 'Lun-Dom: 8am - 8pm'}</span>
                        <span className="text-blue-600 font-bold flex items-center gap-0.5">
                          <Navigation size={8} /> Maps Conectado
                        </span>
                      </div>
                    </div>

                    {/* Certifications Footer */}
                    <div className="pt-1 flex flex-col items-center justify-center gap-1 text-[8px] text-slate-500 font-bold">
                      <div className="flex items-center gap-3">
                        <span>✓ MINCETUR</span>
                        <span>✓ DIRCETUR</span>
                        <span>✓ SAFE TRAVELS</span>
                      </div>
                      <div className="text-[7px] text-slate-400 text-center font-normal">
                        © 2026 {companyName || 'TrekExplorer Perú'} {companyRuc ? `• ${companyRuc}` : ''}
                      </div>
                    </div>
                  </div>

                  {/* Floating WhatsApp Button on corner */}
                  <div className="sticky bottom-3 right-3 ml-auto pr-3 pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg relative ml-auto">
                      <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white border border-[#25D366]"></span>
                      </span>
                      <MessageCircle size={15} className="fill-white" />
                    </div>
                  </div>
                </div>
              )}

              {/* 5. PLANTILLA CULTURAL & ANCESTRAL (FRENCH HERITAGE COMMUNE STYLE) */}
              {template === 'cultural' && (
                <div className="flex flex-col min-h-full bg-[#FFFDF9] text-stone-800">
                  {/* Sunset Panoramic Hero with Red Curve */}
                  <div className="relative bg-stone-900 text-white overflow-hidden shrink-0">
                    <div className="relative h-44 w-full">
                      <Image 
                        src={activeHeroImg} 
                        alt="Cusco Ancestral" 
                        fill 
                        sizes="400px" 
                        className="object-cover brightness-90" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-900/30 to-red-950/70" />
                      
                      {/* Top Header */}
                      <div className="absolute top-2.5 inset-x-3 flex justify-between items-center text-[10px]">
                        <span className="bg-red-600/30 backdrop-blur-md px-2 py-0.5 rounded-full text-red-100 font-serif font-black flex items-center gap-1 border border-red-400/40 min-w-0 max-w-[140px]">
                          {logoUrl ? (
                            <img src={logoUrl} alt={companyName} className="w-3.5 h-3.5 object-contain rounded shrink-0" />
                          ) : (
                            <Landmark size={11} className="shrink-0" />
                          )}
                          <span className="truncate">{companyName || 'Qosqo Ancestral'}</span>
                        </span>
                        <span className="bg-black/50 backdrop-blur-md text-red-200 px-2 py-0.5 rounded-full font-bold text-[9px] shrink-0">
                          {companyRuc || 'Patrimoine UNESCO'}
                        </span>
                      </div>

                      {/* Central Grand Serif Title */}
                      <div className="absolute inset-x-4 top-8 text-center space-y-0.5">
                        <span className="inline-block text-[8px] font-serif font-black text-red-200 uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded-full mb-0.5">
                          {heroBadge ? translateText(heroBadge, language) : 'Ruta Cultural Ancestral'}
                        </span>
                        <h3 className="text-lg font-serif font-black italic drop-shadow-md text-white line-clamp-1">
                          {heroTitle ? translateText(heroTitle, language) : (name || 'Qosqo Imperial')}
                        </h3>
                        <p className="text-[8px] text-red-100 font-serif italic drop-shadow line-clamp-1">
                          {heroSubtitle ? translateText(heroSubtitle, language) : 'Entre montañas sagradas y tradición milenaria'}
                        </p>

                        {/* Botón CTA o iconos */}
                        <div className="pt-1 flex items-center justify-center gap-1.5">
                          <span className="bg-red-700 text-white font-serif font-bold text-[9px] px-2.5 py-0.5 rounded-full shadow-sm">
                            {heroCta ? translateText(heroCta, language) : 'Reserva Cultural'}
                          </span>
                        </div>
                      </div>

                      {/* Heritage Red Wave Transition Shape */}
                      <div className="absolute -bottom-0.5 inset-x-0 pointer-events-none">
                        <svg viewBox="0 0 400 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                          <path d="M0,15 C90,30 150,5 240,20 C320,32 370,18 400,10 L400,35 L0,35 Z" fill="#B91C1C" />
                          <path d="M0,22 C100,35 170,12 270,26 C340,35 380,24 400,20 L400,35 L0,35 Z" fill="#FFFDF9" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-3.5">
                    {/* 5 Circular Quick Access Badges (Matching reference image) */}
                    <div className="grid grid-cols-5 gap-1 text-center -mt-3 relative z-10">
                      {[
                        { label: 'Boleto' },
                        { label: 'Guía' },
                        { label: 'Ritual' },
                        { label: 'Templos' },
                        { label: 'Reserva' }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-1.5 border border-stone-200 hover:border-red-300 shadow-xs flex flex-col items-center">
                          <span className="text-red-700 flex items-center justify-center h-4">
                            {idx === 0 && <Ticket size={12} />}
                            {idx === 1 && <Award size={12} />}
                            {idx === 2 && <Sparkles size={12} />}
                            {idx === 3 && <Landmark size={12} />}
                            {idx === 4 && <Phone size={12} />}
                          </span>
                          <span className="text-[8px] font-serif font-black text-stone-800 leading-tight mt-0.5 truncate w-full">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Actualités / Crónicas Section */}
                    <div className="space-y-1.5 text-left">
                      <div className="flex items-baseline justify-between">
                        <span className="font-serif font-black italic text-xs text-stone-900">
                          Actualités
                        </span>
                        <span className="text-[8px] font-bold bg-red-700 text-white px-2 py-0.5 rounded-full">
                          Toute l&apos;actualité
                        </span>
                      </div>

                      <div className="bg-white rounded-xl p-2 border border-stone-200 shadow-2xs space-y-1">
                        <span className="text-[8px] font-black uppercase text-red-700 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                          Temporada 2026
                        </span>
                        <h4 className="text-[10px] font-serif font-black text-stone-900 leading-snug line-clamp-1">
                          Nuevo sendero señalizado por los templos y miradores incas
                        </h4>
                        <p className="text-[8px] text-stone-500 line-clamp-1">
                          Guiado histórico con arqueólogos colegiados DIRCETUR.
                        </p>
                      </div>
                    </div>

                    {/* Agenda Section */}
                    <div className="space-y-1.5 text-left">
                      <div className="flex items-baseline justify-between">
                        <span className="font-serif font-black italic text-xs text-stone-900">
                          Agenda
                        </span>
                        <span className="text-[8px] text-red-700 font-bold">
                          Événements (2)
                        </span>
                      </div>

                      <div className="bg-red-50/60 rounded-xl p-2 border border-red-200/80 flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-200 shrink-0 relative">
                          <Image src={activeHeroImg} alt="Agenda" fill sizes="40px" className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[8px] font-black text-white bg-red-700 px-1.5 py-0.2 rounded">
                            24 Junio - Solsticio
                          </span>
                          <h5 className="text-[9px] font-serif font-black text-stone-900 truncate">
                            Inti Raymi: La Fiesta del Sol
                          </h5>
                        </div>
                      </div>
                    </div>

                    {/* Le Territoire / Map Card */}
                    <div className="bg-stone-900 text-white rounded-xl p-2.5 space-y-1.5 text-left border border-red-900/40">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-black italic text-xs text-red-200">
                          Le territoire
                        </span>
                        <span className="text-[8px] text-red-300 font-bold">
                          Cartographie GPS
                        </span>
                      </div>
                      <p className="text-[8px] text-stone-300 line-clamp-1">
                        Qorikancha • Sacsayhuamán • Qenqo • San Blas
                      </p>
                    </div>

                    {/* Guide Conférencier Mini Card */}
                    <div className="bg-red-50/70 rounded-xl p-2 border border-red-200/80 flex items-center gap-2 text-left">
                      <div className="flex -space-x-2 shrink-0">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-stone-200 relative border-2 border-white shadow-xs">
                          <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" alt="Lucía" fill sizes="32px" className="object-cover" />
                        </div>
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-stone-200 relative border-2 border-white shadow-xs">
                          <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="Marco" fill sizes="32px" className="object-cover" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[7px] font-black uppercase text-red-800 bg-red-200/60 px-1 py-0.2 rounded">
                          Médiateurs DIRCETUR (3)
                        </span>
                        <h5 className="text-[9px] font-serif font-black text-stone-900 truncate">
                          Lic. Lucía Condori & Equipo
                        </h5>
                        <p className="text-[7px] text-stone-500 truncate">UNSAAC • Arqueología & Historia</p>
                      </div>
                    </div>

                    {/* Livre d'or / Reviews Mini Bar */}
                    <div className="bg-white rounded-xl p-2 border border-stone-200 shadow-2xs space-y-1 text-left">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-0.5 text-amber-500 text-[9px]">
                          <span>★★★★★</span>
                          <span className="text-[8px] font-bold text-stone-900 ml-1">4.9/5</span>
                        </div>
                        <span className="text-[7px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                          184 avis vérifiés
                        </span>
                      </div>
                      <p className="text-[8px] font-serif italic text-stone-600 line-clamp-1">
                        « Une visite magistrale, d&apos;une rigueur historique absolue. Inoubliable ! »
                      </p>
                    </div>

                    {/* Conseils Mochila Chip */}
                    <div className="p-1.5 rounded-lg bg-stone-100 border border-stone-200 text-left text-[7px] flex items-center justify-between">
                      <span className="font-bold text-stone-800">Mochila del Historiador:</span>
                      <span className="text-stone-500">Calzado con tracción • UV400</span>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="text-stone-500 font-serif">Tarifa Cultural:</span>
                        <span className="text-base font-serif font-black text-red-800">{price || 'S/ 85 PEN'}</span>
                      </div>
                      <div className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2.5 px-3 rounded-full text-center text-xs shadow-md flex items-center justify-center gap-1.5 transition-colors">
                        <Compass size={13} />
                        <span>{objective === 'quote' ? 'Demander un devis' : objective === 'both' ? 'WhatsApp & Cotizar' : 'Réserver par WhatsApp'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Municipal / Heritage Footer Block */}
                  <div className="p-3 bg-white border-t border-red-200/80 space-y-1.5 text-[8px] text-stone-600 text-left">
                    <div className="flex items-center justify-between font-serif font-bold text-stone-900">
                      <span className="truncate max-w-[150px]">{companyName || 'Cusco Patrimonial'}</span>
                      <span className="text-red-700 font-bold">{companyRuc || 'DIRCETUR Oficial'}</span>
                    </div>
                    <p className="text-stone-500 line-clamp-1">
                      {officeAddress || 'Portal de Panes N° 123, Plaza de Armas, Cusco'}
                    </p>
                    <div className="flex items-center justify-between text-[7px] text-stone-400 font-bold pt-0.5">
                      <span>✓ PATRIMONIO UNESCO</span>
                      <span>✓ MINCETUR</span>
                      <span>✓ SAFE TRAVELS</span>
                    </div>
                  </div>

                  {/* Floating WhatsApp Button on corner */}
                  <div className="sticky bottom-3 right-3 ml-auto pr-3 pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg relative ml-auto">
                      <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white border border-[#25D366]"></span>
                      </span>
                      <MessageCircle size={15} className="fill-white" />
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Card Flotante de Acción Rápida bajo el Mockup */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-lg space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-black text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
                <Sparkles size={14} className="text-blue-600" /> Resumen de la Landing
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {price || '$350 USD'}
              </span>
            </div>

            <div className="text-xs space-y-1">
              <p className="font-bold text-slate-900 truncate">{name || 'Tour sin nombre'}</p>
              <p className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                <MapPin size={12} className="text-slate-400 shrink-0" />
                <span>{destination || 'Cusco, Perú'}</span>
                <span>•</span>
                <span className="font-semibold text-blue-600 uppercase">{template}</span>
              </p>
            </div>

            <button
              type="submit"
              onClick={handleGenerate}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white py-3.5 px-4 rounded-2xl font-black text-xs transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles size={16} />
              <span>🚀 Generar Landing y Ver Demo</span>
            </button>
          </div>

        </div>

      </div>

      {/* MODAL DE EDICIÓN DEL CATÁLOGO DE TOURS (PORTAL DE AGENCIA) */}
      <CatalogToursEditorModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
        currentTours={catalogTours}
        onSave={(updated) => setCatalogTours(updated)}
        currentSignatureTourName={name}
      />
    </div>
  );
}
