"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, Loader2, Compass, MessageCircle, FileText, ArrowLeft, 
  Globe, DollarSign, Clock, User, Phone, 
  Check, Zap, Eye, CheckCircle2, MapPin,
  Shield, Award, Mountain, Users, Languages, CheckSquare, Square,
  Plus, Trash2, XCircle, Backpack, ShieldCheck, Share2, Calendar
} from 'lucide-react';
import { ObjectiveType, TemplateType, LanguageType, ItineraryItem, PlanTier } from '@/types/landing';
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
    label: '🔥 Portal Agencia (Pinterest #1)',
    name: 'Portal Oficial de Agencia de Viajes Perú',
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
  const [aiTone, setAiTone] = useState<string>('aventurero');
  const [tier, setTier] = useState<PlanTier>('pro');

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
        if (qTemplate === 'agency-portal') {
          handleApplyPreset(PRESET_TOURS[0]);
        }
      }
    }
  }, []);

  const [objective, setObjective] = useState<ObjectiveType>('whatsapp');
  const [template, setTemplate] = useState<TemplateType>('adventure');
  const [language, setLanguage] = useState<LanguageType>('es');
  const [selectedHeroImage, setSelectedHeroImage] = useState<string>(SAMPLE_TOUR_IMAGES[2].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [tone, setTone] = useState<'persuasive' | 'luxury' | 'historical'>('persuasive');
  const [description, setDescription] = useState(
    'Un trekking legendario de alta montaña cruzando nevados imponentes, ceja de selva y plantaciones de café hasta la ciudadela inca de Machu Picchu.'
  );

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

        {/* Dedicated Quick Preset Pills */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold text-slate-500 flex items-center gap-1.5 mr-1">
            <Zap size={14} className="text-amber-500" /> Cargar Ficha de Ejemplo Rápida:
          </span>
          {PRESET_TOURS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleApplyPreset(p)}
              className="text-xs bg-slate-50 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 font-bold px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 shadow-2xs transition-all cursor-pointer"
            >
              {p.label}
            </button>
          ))}
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
                  name: 'Portal Agencia (Pinterest #1)', 
                  desc: 'Naranja viral, métricas +10k, catálogo de tours, FAQ y WhatsApp con radar.', 
                  icon: '🔥',
                  badge: 'Viral Pinterest #1',
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
                      if (t.id === 'agency-portal' && name === PRESET_TOURS[1]?.name) {
                        handleApplyPreset(PRESET_TOURS[0]);
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

          {/* PASO 2: OBJETIVO Y ESTRATEGIA COMERCIAL */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">2</span>
                Objetivo Comercial & Enfoque de Conversión
              </label>
              <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Define la Acción del Turista</span>
            </div>

            {/* Objective Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={() => setObjective('whatsapp')}
                className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                  objective === 'whatsapp' 
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${objective === 'whatsapp' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                  <MessageCircle size={20} />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 text-sm block">Ventas Directas por WhatsApp</span>
                  <span className="text-xs text-slate-500 leading-relaxed block mt-1">
                    Prioriza contacto directo por chat con el guía o counter para confirmaciones y reservas al instante.
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setObjective('quote')}
                className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                  objective === 'quote' 
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${objective === 'quote' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                  <FileText size={20} />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 text-sm block">Cotización y Propuesta Formal</span>
                  <span className="text-xs text-slate-500 leading-relaxed block mt-1">
                    Abre formulario para presupuestos personalizados, número de pasajeros, niños y fechas flexibles.
                  </span>
                </div>
              </button>
            </div>

            {/* Language and AI Copy Tone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Globe size={14} className="text-blue-500" /> Idioma de la Landing
                </label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as LanguageType)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs bg-white font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="es">Español (Mercado Nacional, Latino y España)</option>
                  <option value="en">Inglés (Turismo Receptivo Internacional: USA, Europa, etc.)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-blue-500" /> Tono de Redacción IA
                </label>
                <select 
                  value={tone}
                  onChange={(e) => setTone(e.target.value as 'persuasive' | 'luxury' | 'historical')}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs bg-white font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="persuasive">Persuasivo & Enérgico (Alta Conversión)</option>
                  <option value="luxury">Exclusivo, Premium & Sofisticado</option>
                  <option value="historical">Místico, Cultural e Historiográfico</option>
                </select>
              </div>
            </div>
          </div>

          {/* NIVEL DE SERVICIO / VERSIÓN DE LA LANDING (TIER) */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xs font-black shadow-sm">
                  ★
                </span>
                Nivel de Servicio / Versión de Landing (Tier)
              </label>
              <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
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

          {/* SELECTOR VISUAL DE PLANTILLA DE DISEÑO (CON DESTACADO PINTEREST) */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-pink-600 text-white flex items-center justify-center text-xs font-black shadow-sm">
                  📌
                </span>
                Plantilla de Diseño Visual & Formato de Pines
              </label>
              <span className="text-[11px] font-semibold text-pink-700 bg-pink-50 px-2.5 py-0.5 rounded-md border border-pink-100">
                Incluye Plantilla Pinterest
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Elige el estilo visual que mejor conecta con el público del tour. Cada plantilla adapta sus tableros de fotos, pines y paleta estética:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* 1. Boho Journal (Pinterest) */}
              <button
                type="button"
                onClick={() => setTemplate('boho-nature')}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative overflow-hidden ${
                  template === 'boho-nature'
                    ? 'border-[#C86D51] bg-[#FAF7F2] shadow-sm ring-2 ring-[#C86D51]/30 -translate-y-0.5'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-[#C86D51] uppercase tracking-wider flex items-center gap-1.5">
                    <span>📌</span> Boho Journal (Pinterest)
                  </span>
                  <span className="text-[10px] bg-[#C86D51]/15 text-[#C86D51] font-extrabold px-2 py-0.5 rounded-md">
                    POPULAR PINTEREST
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Bitácora de viaje editorial, polaroids con cinta washi, tableros de fotos masonry, estética Pinterest en tonos arena y terracota.
                </p>
              </button>

              {/* 2. Adventure */}
              <button
                type="button"
                onClick={() => setTemplate('adventure')}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  template === 'adventure'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-500/20 -translate-y-0.5'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span>🏔️</span> Aventura & Trekking
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-md">
                    OUTDOOR
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Estilo de expedición dinámico, tarjetas de altitud y clima, galería de pines de montaña y paleta esmeralda.
                </p>
              </button>

              {/* 3. Cultural */}
              <button
                type="button"
                onClick={() => setTemplate('cultural')}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  template === 'cultural'
                    ? 'border-amber-600 bg-amber-50/70 shadow-sm ring-2 ring-amber-500/20 -translate-y-0.5'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span>🏛️</span> Patrimonio & Cultura Andina
                  </span>
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-extrabold px-2 py-0.5 rounded-md">
                    ANCESTRAL
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Estética andina artesanal, sellos incas, notas históricas, pines culturales y tonos cálidos de terracota.
                </p>
              </button>

              {/* 4. Premium */}
              <button
                type="button"
                onClick={() => setTemplate('premium')}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  template === 'premium'
                    ? 'border-purple-600 bg-purple-50/70 shadow-sm ring-2 ring-purple-500/20 -translate-y-0.5'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span>✨</span> Exclusivo VIP & High-End
                  </span>
                  <span className="text-[10px] bg-purple-100 text-purple-900 font-extrabold px-2 py-0.5 rounded-md">
                    LUXURY
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Modo oscuro luxury refinado, pines fotográficos de alta gama, tipografía de prestigio y detalles en oro/champán.
                </p>
              </button>
            </div>
          </div>

          {/* PASO 2: FICHA TÉCNICA DEL TOUR & DESTINO (MÁS DATOS PARA RELLENAR) */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">2</span>
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

          {/* PASO 3: PERFIL DEL GUÍA TURÍSTICO & SERVICIOS INCLUIDOS */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">3</span>
                Perfil del Guía & Servicios Incluidos
              </label>
              <span className="text-[11px] font-semibold text-slate-400">Genera confianza y credibilidad</span>
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
          </div>

          {/* PASO 4: ITINERARIO DÍA A DÍA / HORAS */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">4</span>
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

          {/* PASO 5: TRANSPARENCIA & EQUIPAJE (QUÉ NO INCLUYE Y QUÉ LLEVAR) */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">5</span>
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

          {/* PASO 6: SELLOS DE CONFIANZA & GARANTÍAS TURÍSTICAS */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">6</span>
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

          {/* PASO 7: FOTOGRAFÍA DE PORTADA (HERO) */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-sm">7</span>
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
        <div className="lg:col-span-5 sticky top-6 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Eye size={15} className="text-blue-600" /> Vista Previa en Vivo
            </span>
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
              <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full border border-slate-200">
                {template.toUpperCase()} • {language.toUpperCase()}
              </span>
            </div>
          </div>

          {/* WhatsApp Link Share Preview Simulator */}
          <div className="bg-[#EFEAE2] p-3.5 rounded-3xl border border-slate-300 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 px-1">
              <span className="flex items-center gap-1.5 text-emerald-800 font-extrabold">
                <Share2 size={13} /> Vista al Enviar por WhatsApp
              </span>
              <span className="text-[10px] text-slate-500">Previsualización de Enlace</span>
            </div>

            {/* WhatsApp Chat Bubble */}
            <div className="bg-white rounded-2xl p-2.5 shadow-sm border border-slate-200/80 max-w-sm ml-auto space-y-2">
              <div className="relative h-32 rounded-xl overflow-hidden bg-slate-100">
                <Image 
                  src={activeHeroImg} 
                  alt="WhatsApp Preview" 
                  fill 
                  sizes="350px"
                  className="object-cover" 
                />
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {price || '$350 USD'}
                </div>
              </div>
              <div className="space-y-0.5 px-1">
                <p className="text-[10px] font-mono text-slate-400 truncate">agenciacusco.pe/p/{name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 24)}</p>
                <h4 className="text-xs font-black text-slate-900 line-clamp-1">{name || 'Tour en Cusco'}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight">
                  {description || 'Vive la mejor experiencia guiada en Cusco con reserva directa y tarifas transparentes.'}
                </p>
              </div>
              <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 pt-0.5 px-1">
                <span>12:45 PM</span>
                <span className="text-blue-500 font-bold">✓✓</span>
              </div>
            </div>
          </div>

          {/* Smartphone Mockup */}
          <div className="bg-slate-950 rounded-[42px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-900 max-w-sm mx-auto">
            {/* Dynamic Island / Notch */}
            <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-2" />
            
            {/* Screen View */}
            <div className="bg-stone-900 rounded-[32px] overflow-hidden text-white relative min-h-[560px] flex flex-col justify-between border border-white/10">
              
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image 
                  src={activeHeroImg} 
                  alt="Preview" 
                  fill 
                  sizes="400px"
                  className="object-cover opacity-60" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
              </div>

              {/* Topbar inside screen */}
              <div className="relative z-10 p-4 flex justify-between items-center text-xs">
                <span className="font-black tracking-wider text-emerald-400">
                  {template === 'premium' ? '👑 CUSCO VIP' : template === 'cultural' ? '🏛️ ANCESTRAL' : template === 'boho-nature' ? '📌 BOHO JOURNAL' : '🏔️ TREK EXPLORER'}
                </span>
                <span className="text-[10px] font-extrabold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                  {price || 'Consultar'}
                </span>
              </div>

              {/* Main Content inside screen */}
              <div className="relative z-10 p-5 mt-auto space-y-3">
                
                {/* Destination & Altitude badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold backdrop-blur-md border border-emerald-400/20">
                  <MapPin size={11} />
                  <span>{destination || 'Cusco, Perú'}</span>
                </div>

                <h3 className="text-xl font-black leading-tight drop-shadow-md">
                  {name || 'Nombre del Tour'}
                </h3>

                {/* Specs pill */}
                <div className="flex items-center gap-2 text-[10px] text-stone-300">
                  <span>⏱️ {duration || 'Full Day'}</span>
                  <span>•</span>
                  <span>🏔️ {altitude || 'Andes'}</span>
                  <span>•</span>
                  <span>⭐ {difficulty}</span>
                </div>

                <p className="text-stone-300 text-xs line-clamp-2 leading-relaxed">
                  {description || 'Descripción del tour turístico adaptada por IA.'}
                </p>

                {/* WhatsApp or Quote CTA button */}
                <div className="pt-2">
                  {objective === 'whatsapp' ? (
                    <div className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold py-2.5 px-4 rounded-xl text-center text-xs shadow-lg flex items-center justify-center gap-2">
                      <MessageCircle size={15} />
                      <span>Reservar con {guideName.split(' ')[0] || 'Guía'}</span>
                    </div>
                  ) : (
                    <div className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-2.5 px-4 rounded-xl text-center text-xs shadow-lg flex items-center justify-center gap-2">
                      <FileText size={15} />
                      <span>Solicitar Cotización de Grupo</span>
                    </div>
                  )}
                </div>

                {/* Guide accreditation footer */}
                <div className="text-center pt-1 text-[10px] text-stone-400">
                  <span>Guía Oficial: <strong className="text-white">{guideName || 'Guía Especialista'}</strong></span>
                  {guideCert && <div className="text-[9px] text-emerald-400 font-semibold">{guideCert}</div>}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
