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
  Plus, Trash2, XCircle, Backpack, ShieldCheck, Share2, Calendar,
  Star, ArrowRight, Camera, Crown, ChevronDown, Layers, Navigation,
  Maximize2, Smartphone, Monitor, Tablet, X, RefreshCw
} from 'lucide-react';
import { ObjectiveType, TemplateType, LanguageType, ItineraryItem, PlanTier, LandingData } from '@/types/landing';
import TemplateRenderer from '@/templates/TemplateRenderer';
import { simulateAiGeneration, saveLandingToStorage } from '@/data/landingStore';
import { SAMPLE_TOUR_IMAGES } from '@/data/sampleImages';

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
    label: '🔥 Diseño 1 (Portal Agencia)',
    name: 'Diseño 1 - Portal Oficial de Agencia de Viajes Perú',
    destination: 'Cusco, Machu Picchu & Rutas del Perú',
    guideName: 'Carlos Mendoza',
    guideCert: 'Licenciado DIRCETUR & Operador Autorizado',
    guideLanguages: 'Español, Inglés y Portugués',
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
    id: 'salkantay',
    label: '🏔️ Salkantay Trek 5D',
    name: 'Tour Salkantay Trek Clásico hacia Machu Picchu',
    destination: 'Machu Picchu & Cordillera Vilcabamba',
    guideName: 'Raúl Quispe',
    guideCert: 'Licenciado en Turismo DIRCETUR (10 años exp.)',
    guideLanguages: 'Español, Inglés y Quechua',
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
    destination: 'Santuario Histórico de Machu Picchu',
    guideName: 'Carlos Mendoza',
    guideCert: 'Guía Historiador Senior DIRCETUR',
    guideLanguages: 'Español e Inglés bilingüe nativo',
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
    label: '🏛️ City Tour & Sacsayhuamán',
    name: 'City Tour Cusco Ancestral & 4 Ruinas Arqueológicas',
    destination: 'Cusco Histórico & Sacsayhuamán',
    guideName: 'Lucía Condori',
    guideCert: 'Arqueóloga Colegiada & Guía Oficial',
    guideLanguages: 'Español, Inglés y Francés',
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
    tier: 'basic' as PlanTier,
    imageIndex: 1, // Terrazas
    description: 'Descubre los enigmas de la arquitectura megalítica inca en Sacsayhuamán, Q’enqo, Puka Pukara y Tambomachay junto a una arqueóloga experta.'
  },
  {
    id: 'vinicunca',
    label: '🌈 Montaña 7 Colores',
    name: 'Expedición Vinicunca & Mirador del Valle Rojo',
    destination: 'Cordillera Vilcanota (Vinicunca)',
    guideName: 'Marco Antonio Flores',
    guideCert: 'Guía de Alta Montaña Certificado',
    guideLanguages: 'Español, Inglés y Quechua',
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
    label: '📷 Laguna Humantay (Boho Journal)',
    name: 'Laguna Humantay — Bitácora Fotográfica & Paisajismo',
    destination: 'Laguna Humantay & Glaciar Soraypampa',
    guideName: 'Camila Valdivia',
    guideCert: 'Guía Especialista en Fotografía Andina',
    guideLanguages: 'Español, Inglés y Francés',
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
    label: '🚶 Free Walking Tour (Gratis)',
    name: 'Free Tour Cusco Histórico & Leyendas Incas',
    destination: 'Centro Histórico de Cusco',
    guideName: 'Renzo Farfán',
    guideCert: 'Guía Local Apasionado DIRCETUR',
    guideLanguages: 'Español e Inglés',
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
  const [isModalPreviewOpen, setIsModalPreviewOpen] = useState(false);
  const [modalViewMode, setModalViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const qTier = searchParams.get('tier') as PlanTier;
      if (qTier && ['free', 'basic', 'pro', 'advance'].includes(qTier)) {
        setTier(qTier);
      }
      const qTemplate = searchParams.get('template') as TemplateType;
      if (qTemplate && ['agency-portal', 'adventure', 'premium', 'cultural', 'boho-nature'].includes(qTemplate)) {
        setTemplate(qTemplate);
        const matchingPreset = PRESET_TOURS.find(p => p.template === qTemplate);
        if (matchingPreset) {
          handleApplyPreset(matchingPreset);
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

  const handleToggleLanguage = (langId: LanguageType) => {
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
    if (preset.tier) setTier(preset.tier);
    setObjective(preset.objective);
    setTemplate(preset.template);
    setLanguage(preset.language);
    setSelectedLanguages([preset.language, preset.language === 'en' ? 'es' : 'en']);
    setSelectedHeroImage(SAMPLE_TOUR_IMAGES[preset.imageIndex].url);
    setCustomImageUrl('');
    setDescription(preset.description);
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
    const galleryImages = otherImages.slice(0, 2);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setLoadingStep(step);
      if (step >= steps.length) {
        clearInterval(interval);
        const generated = simulateAiGeneration({
          name,
          guideName,
          whatsapp,
          price,
          duration,
          difficulty,
          description,
          objective,
          template,
          language,
          languages: selectedLanguages,
          tier,
          heroImage: activeHeroImg,
          galleryImages,
          destination,
          altitude,
          groupType,
          guideCert,
          guideLanguages,
          includedServices,
          targetAudience,
          itinerary,
          notIncluded,
          whatToBring,
          trustBadges,
          officeAddress,
          officeHours,
          mapsUrl,
          aiTone
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
      
      {/* 1. TOP HEADER & QUICK PRESET BAR */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 space-y-4">
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
                Generador Inteligente de Landings con IA
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                Completa los datos técnicos del tour. La IA generará los copys persuasivos y estructurará la página lista para publicar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE: FORM COLUMN (LEFT 7 COLS) + REALTIME PHONE MOCKUP (RIGHT 5 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Column */}
        <form onSubmit={handleGenerate} className="lg:col-span-7 space-y-6">
          
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { 
                  id: 'agency-portal', 
                  name: 'Diseño 1', 
                  desc: 'Naranja viral, métricas +10k, catálogo de tours, FAQ y WhatsApp con radar.', 
                  icon: '🔥',
                  badge: 'Diseño 1',
                  badgeClass: 'bg-[#FF5500] text-white'
                },
                { 
                  id: 'boho-nature', 
                  name: 'Boho Travel Journal', 
                  desc: 'Estilo Pinterest con fotos polaroid inclinadas, cinta washi y notas de campo.', 
                  icon: '📷',
                  badge: 'Pinterest Aesthetic',
                  badgeClass: 'bg-amber-600 text-white'
                },
                { 
                  id: 'premium', 
                  name: 'Lujo & Exclusivo (VIP)', 
                  desc: 'Dorado y negro profundo. Ideal para experiencias Hiram Bingham y 5 estrellas.', 
                  icon: '👑',
                  badge: 'High-End VIP',
                  badgeClass: 'bg-stone-900 text-amber-300'
                },
                { 
                  id: 'adventure', 
                  name: 'Aventura & Trekking', 
                  desc: 'Tonos esmeralda y montaña. Diseñado para rutas de alta dificultad y caminatas.', 
                  icon: '🏔️',
                  badge: 'Trekking & Outdoor',
                  badgeClass: 'bg-emerald-600 text-white'
                },
                { 
                  id: 'cultural', 
                  name: 'Cultural & Ancestral', 
                  desc: 'Piedra incaica y ámbar cálido. Para City Tours, Sacsayhuamán y arqueología.', 
                  icon: '🏛️',
                  badge: 'Heritage & History',
                  badgeClass: 'bg-amber-700 text-white'
                }
              ].map((t) => {
                const isSelected = template === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setTemplate(t.id as TemplateType);
                      const matchingPreset = PRESET_TOURS.find(p => p.template === t.id);
                      const isDefaultOrPreset = !name || PRESET_TOURS.some(p => p.name === name);
                      if (matchingPreset && isDefaultOrPreset) {
                        handleApplyPreset(matchingPreset);
                      }
                    }}
                    className={`relative p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected 
                        ? 'border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-500/20 scale-[1.01]' 
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">{t.icon}</span>
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

          {/* PASO 2: FOTOGRAFÍA DE PORTADA (HERO) */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">2</span>
                Fotografía de Portada (Hero)
              </label>
              <span className="text-[11px] font-semibold text-slate-400">Impacto visual</span>
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
                onClick={() => setTier('free')}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  tier === 'free'
                    ? 'border-stone-700 bg-stone-50 shadow-sm ring-2 ring-stone-400/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-stone-900 uppercase tracking-wider">Gratuito</span>
                  <span className="text-[10px] bg-stone-200 text-stone-800 font-extrabold px-2 py-0.5 rounded-md">1 SECCIÓN</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hero de alto impacto + botón directo a WhatsApp. Ideal para captación exprés o free tours.
                </p>
              </button>

              {/* Básico */}
              <button
                type="button"
                onClick={() => setTier('basic')}
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
                  Hero + Sobre el tour + Qué incluye + Formulario de contacto y botón WhatsApp.
                </p>
              </button>

              {/* Pro */}
              <button
                type="button"
                onClick={() => setTier('pro')}
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
                  Todo en Básico + Itinerario detallado día a día + Exclusiones & Qué llevar + Sellos oficiales DIRCETUR.
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
                  Todo en Pro + Galería completa + Preguntas Frecuentes (FAQs) del Tour + Testimonios de clientes + Reservas WhatsApp.
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

            <div className="bg-blue-50/60 border border-blue-200/60 rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                <Check size={16} strokeWidth={3} />
              </div>
              <div className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-900 block mb-0.5">Puedes marcar 2, 3 o los 5 idiomas al mismo tiempo:</strong>
                Haz clic sobre las tarjetas para marcarlas o desmarcarlas. La landing generada incluirá un selector de banderas interactivo para que los turistas alternen entre los idiomas que hayas seleccionado.
              </div>
            </div>

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
                const isSelected = selectedLanguages.includes(langItem.id);
                const isPrimary = language === langItem.id;
                return (
                  <button
                    key={langItem.id}
                    type="button"
                    onClick={() => handleToggleLanguage(langItem.id)}
                    className={`relative p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/90 shadow-md ring-2 ring-blue-500/20 scale-[1.02]'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/70'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{langItem.flag}</span>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                          isSelected 
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
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {isSelected ? '✓ Marcado' : '+ Clic para marcar'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick multi-language preset pills */}
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
                2 Idiomas: Bilingüe (🇺🇸 EN + 🇵🇪 ES)
              </button>
              <button
                type="button"
                onClick={() => { setSelectedLanguages(['en', 'es', 'pt']); setLanguage('es'); }}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold border transition-all cursor-pointer ${
                  selectedLanguages.length === 3 && selectedLanguages.includes('pt') && selectedLanguages.includes('en') && selectedLanguages.includes('es')
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                3 Idiomas: Trilingüe (🇺🇸 EN + 🇵🇪 ES + 🇧🇷 PT)
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
                Todos los 5 Idiomas 🌐 (EN + ES + PT + FR + IT)
              </button>
              <button
                type="button"
                onClick={() => { setSelectedLanguages(['es']); setLanguage('es'); }}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                  selectedLanguages.length === 1 && selectedLanguages[0] === 'es'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Solo Español 🇵🇪
              </button>
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
                  onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed font-normal"
                placeholder="Describe la ruta, paisajes, qué hace única a esta experiencia..."
              />
            </div>
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

          {/* Submit Action Bar */}
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
        </form>

        {/* Realtime Live Preview Column (Sticky on Desktop) */}
        <div className="lg:col-span-5 sticky top-6 space-y-3.5">
          
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

            <div className="flex items-center gap-1.5">
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
              
              <button
                type="button"
                onClick={() => setIsModalPreviewOpen(true)}
                className="bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 px-2.5 py-1 rounded-xl text-[11px] font-bold shadow-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                title="Expandir a pantalla completa"
              >
                <Maximize2 size={12} className="text-blue-600" />
                <span className="hidden sm:inline">Expandir</span>
              </button>
            </div>
          </div>

          {/* Quick Template Switcher Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 text-[11px] px-0.5">
            {[
              { id: 'boho-nature', icon: '📷', label: 'Boho' },
              { id: 'agency-portal', icon: '🔥', label: 'Diseño 1' },
              { id: 'premium', icon: '👑', label: 'VIP' },
              { id: 'adventure', icon: '🏔️', label: 'Aventura' },
              { id: 'cultural', icon: '🏛️', label: 'Cultural' }
            ].map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTemplate(t.id as TemplateType);
                  const matchingPreset = PRESET_TOURS.find(p => p.template === t.id);
                  const isDefaultOrPreset = !name || PRESET_TOURS.some(p => p.name === name);
                  if (matchingPreset && isDefaultOrPreset) {
                    handleApplyPreset(matchingPreset);
                  }
                }}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1 border ${
                  template === t.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Smartphone Mockup with Real Interactive TemplateRenderer */}
          <div className="bg-slate-950 rounded-[46px] p-2.5 sm:p-3 shadow-2xl border-4 border-slate-700/80 ring-1 ring-slate-800 max-w-[350px] sm:max-w-[370px] mx-auto relative group">
            
            {/* Dynamic Island / Notch with status indicator */}
            <div className="w-28 h-4.5 bg-black rounded-full mx-auto mb-2 flex items-center justify-between px-3">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800" />
                <span className="w-1 h-1 rounded-full bg-emerald-500/80" />
              </div>
            </div>

            {/* Smartphone Live Viewport Screen */}
            <div className="rounded-[34px] overflow-hidden relative h-[620px] sm:h-[650px] overflow-y-auto no-scrollbar scroll-smooth border border-black/40 transform-gpu select-none bg-stone-900">
              <TemplateRenderer 
                data={{
                  id: 'preview-landing-id',
                  name: name || (
                    template === 'boho-nature' 
                      ? 'Laguna Humantay & Domos de Soraypampa — Bitácora Andina'
                      : template === 'agency-portal'
                      ? 'Portal Oficial de Agencia de Viajes Perú'
                      : template === 'premium'
                      ? 'Machu Picchu Hiram Bingham VIP'
                      : template === 'adventure'
                      ? 'Tour Salkantay Trek Clásico'
                      : 'City Tour Ancestral & Leyendas Incas'
                  ),
                  slug: 'preview-slug',
                  tier: tier,
                  guideName: guideName || 'Camila Valdivia',
                  guideAvatar: '',
                  guideCert: guideCert || 'Guía Colegiada DIRCETUR',
                  guideLanguages: guideLanguages || 'Español, Inglés',
                  destination: destination || 'Cusco, Perú',
                  altitude: altitude || (template === 'boho-nature' ? '4,200 msnm' : '3,400 msnm'),
                  groupType: groupType || 'Grupos Reducidos',
                  targetAudience: targetAudience || 'Viajeros',
                  includedServices: includedServices.length > 0 ? includedServices : [
                    'Transporte turístico privado ida y vuelta',
                    'Guía oficial colegiado bilingüe DIRCETUR',
                    'Desayuno y almuerzo buffet campestre',
                    'Botiquín de primeros auxilios y balón de oxígeno'
                  ],
                  aiTone: aiTone,
                  whatsapp: whatsapp || '+51984123456',
                  price: price || (
                    template === 'boho-nature' 
                      ? 'S/ 160' 
                      : template === 'agency-portal'
                      ? '$380 USD'
                      : template === 'premium'
                      ? '$890 USD'
                      : template === 'adventure'
                      ? '$350 USD'
                      : 'S/ 85 PEN'
                  ),
                  duration: duration || 'Full Day',
                  difficulty: difficulty || 'Moderada',
                  objective: objective,
                  template: template,
                  language: language,
                  languages: selectedLanguages,
                  status: 'draft',
                  date: new Date().toISOString(),
                  views: '1',
                  heroImage: customImageUrl.trim() || selectedHeroImage,
                  galleryImages: [
                    customImageUrl.trim() || selectedHeroImage,
                    SAMPLE_TOUR_IMAGES[0]?.url,
                    SAMPLE_TOUR_IMAGES[1]?.url,
                    SAMPLE_TOUR_IMAGES[2]?.url
                  ].filter(Boolean),
                  hero: {
                    badge: template === 'boho-nature' 
                      ? (tier === 'free' ? 'Edición Travel Journal • Acceso Rápido' : 'Edición Travel Journal • Pinterest Style')
                      : template === 'agency-portal'
                      ? 'DIRCETUR Oficial • Diseño 1'
                      : template === 'premium'
                      ? 'Servicio Privado Exclusivo VIP'
                      : 'Experiencia Oficial Certificada',
                    title: name || (
                      template === 'boho-nature' 
                        ? 'Laguna Humantay & Domos de Soraypampa' 
                        : template === 'agency-portal'
                        ? 'Portal Oficial de Agencia de Viajes Perú'
                        : 'Tour Exclusivo en Cusco'
                    ),
                    subtitle: description || 'Una experiencia curada para viajeros que aprecian los detalles, la fotografía y la autenticidad de los Andes peruanos.',
                    cta: objective === 'quote' ? 'Cotizar Experiencia' : 'Reservar por WhatsApp'
                  },
                  about: {
                    title: 'Una experiencia curada para conectar con el paisaje andino',
                    content: description || 'Diseñada para quienes buscan desconectar de las prisas y conectar con la majestuosidad de las montañas andinas con paradas estratégicas en los mejores miradores.'
                  },
                  features: {
                    title: '¿Qué incluye la experiencia?',
                    items: includedServices.length > 0 ? includedServices : [
                      'Guía oficial colegiado bilingüe',
                      'Transporte turístico ida y vuelta desde tu hotel',
                      'Desayuno y refrigerio andino campestre',
                      'Botiquín de primeros auxilios y balón de oxígeno medicinal'
                    ]
                  },
                  itinerary: itinerary.length > 0 ? itinerary : [
                    { step: '04:30 AM', title: 'Partida desde tu hotel en Cusco', desc: 'Recojo en transporte turístico con vistas panorámicas del amanecer andino.' },
                    { step: '07:30 AM', title: 'Desayuno Campestre Orgánico en Domos', desc: 'Parada en Mollepata con panes frescos de leña y café de altura.' },
                    { step: '09:30 AM', title: 'Inicio de Caminata con Guía Fotógrafo', desc: 'Ascenso a ritmo suave con bastones de trekking y pausas de aclimatación.' },
                    { step: '12:30 PM', title: 'Llegada y Sesión Fotográfica', desc: 'Tiempo frente al espejo turquesa con fotos Polaroid y refrigerio andino.' }
                  ],
                  notIncluded: notIncluded.length > 0 ? notIncluded : [
                    'Entradas comunales o boleto turístico',
                    'Caballos de auxilio (opcional en el punto)',
                    'Snacks personales o bebidas adicionales'
                  ],
                  whatToBring: whatToBring.length > 0 ? whatToBring : [
                    'Casaca cortaviento y ropa abrigadora en capas',
                    'Zapatillas de trekking con buen agarre',
                    'Bloqueador solar y lentes con filtro UV',
                    'Botella de agua recargable'
                  ],
                  trustBadges: trustBadges.length > 0 ? trustBadges : [
                    'Licencia Oficial DIRCETUR Cusco',
                    'Sello Internacional Safe Travels',
                    'Agencia Formal RUC 20 Verificado',
                    'Balón de Oxígeno & Botiquín de Altura'
                  ],
                  officeAddress: officeAddress,
                  officeHours: officeHours,
                  mapsUrl: mapsUrl
                }} 
                isLive={false} 
                viewMode="mobile" 
              />
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="w-28 h-1 bg-stone-500/40 rounded-full mx-auto mt-2 mb-0.5" />
          </div>

          {/* Helpful Scroll / Explore Note */}
          <p className="text-center text-[11px] text-slate-500 font-medium">
            💡 Desplaza la pantalla del celular hacia abajo para revisar todas las secciones en vivo.
          </p>

        </div>

      </div>

      {/* Fullscreen Interactive Preview Modal */}
      {isModalPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col p-3 sm:p-6 animate-fade-in">
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-800 gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold shrink-0">
                <Eye size={18} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md">
                  {name || 'Previsualización de Landing'}
                </h3>
                <span className="text-[11px] text-slate-400 block truncate">
                  Previsualización Completa • Plantilla: {template} • Plan {tier}
                </span>
              </div>
            </div>

            {/* View Mode Switcher in Modal */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalViewMode('desktop')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    modalViewMode === 'desktop' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor size={14} />
                  <span>Escritorio</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalViewMode('tablet')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    modalViewMode === 'tablet' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Tablet size={14} />
                  <span>Tablet</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalViewMode('mobile')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    modalViewMode === 'mobile' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone size={14} />
                  <span>Móvil</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsModalPreviewOpen(false)}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                title="Cerrar"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Modal Preview Body */}
          <div className="flex-1 flex items-center justify-center overflow-hidden pt-3 sm:pt-4">
            <div className={`
              ${modalViewMode === 'desktop' ? 'w-full max-w-6xl' : modalViewMode === 'tablet' ? 'w-full max-w-2xl' : 'w-full max-w-sm'}
              h-full rounded-2xl overflow-hidden border border-slate-800 bg-white shadow-2xl overflow-y-auto no-scrollbar
            `}>
              <TemplateRenderer 
                data={{
                  id: 'preview-modal-id',
                  name: name || 'Tour en Cusco',
                  slug: 'preview-slug',
                  tier: tier,
                  guideName: guideName || 'Guía Oficial',
                  guideAvatar: '',
                  guideCert: guideCert || 'Guía Oficial DIRCETUR',
                  guideLanguages: guideLanguages || 'Español, Inglés',
                  destination: destination || 'Cusco, Perú',
                  altitude: altitude || '3,400 msnm',
                  groupType: groupType || 'Grupos Reducidos',
                  targetAudience: targetAudience || 'Viajeros',
                  includedServices: includedServices,
                  aiTone: aiTone,
                  whatsapp: whatsapp || '+51984123456',
                  price: price || 'S/ 180',
                  duration: duration || 'Full Day',
                  difficulty: difficulty || 'Moderada',
                  objective: objective,
                  template: template,
                  language: language,
                  languages: selectedLanguages,
                  status: 'draft',
                  date: new Date().toISOString(),
                  views: '1',
                  heroImage: customImageUrl.trim() || selectedHeroImage,
                  galleryImages: [
                    customImageUrl.trim() || selectedHeroImage,
                    SAMPLE_TOUR_IMAGES[0]?.url,
                    SAMPLE_TOUR_IMAGES[1]?.url,
                    SAMPLE_TOUR_IMAGES[2]?.url
                  ].filter(Boolean),
                  hero: {
                    badge: template === 'boho-nature' ? 'Edición Travel Journal' : 'Experiencia Oficial',
                    title: name || 'Tour Exclusivo en Cusco',
                    subtitle: description || 'Una experiencia curada para viajeros que aprecian los detalles.',
                    cta: objective === 'quote' ? 'Cotizar' : 'Reservar'
                  },
                  about: {
                    title: 'Sobre la Experiencia',
                    content: description || 'Conecta con los mejores paisajes andinos en grupos reducidos.'
                  },
                  features: {
                    title: '¿Qué incluye?',
                    items: includedServices
                  },
                  itinerary: itinerary,
                  notIncluded: notIncluded,
                  whatToBring: whatToBring,
                  trustBadges: trustBadges,
                  officeAddress: officeAddress,
                  officeHours: officeHours,
                  mapsUrl: mapsUrl
                }} 
                isLive={false} 
                viewMode={modalViewMode} 
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
