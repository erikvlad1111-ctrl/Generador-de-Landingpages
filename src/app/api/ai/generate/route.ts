import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sanitizeObject } from '@/lib/sanitize';
import { parseDocumentTextLocally, ParsedDocumentData } from '@/lib/ai/documentParser';

const rateLimitMap = new Map<string, number[]>();
const MAX_REQUESTS_PER_HOUR = Number(process.env.AI_RATE_LIMIT_PER_HOUR || 35);
const WINDOW_MS = 60 * 60 * 1000;

export interface AiGeneratedLandingPayload {
  // Datos de Empresa (Marca Blanca)
  companyName?: string;
  companyRuc?: string;
  companyEmail?: string;
  whatsapp?: string;
  officeAddress?: string;
  officeHours?: string;
  companyTagline?: string;
  guideName?: string;
  guideCert?: string;
  recommendedTemplate?: string;

  // Datos del Tour
  tourName?: string;
  price?: string;
  destination: string;
  altitude: string;
  difficulty: string;
  duration: string;

  // Secciones de Conversión
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  description: string;
  aboutTitle: string;
  aboutContent: string;
  featuresTitle: string;
  featuresItems: string[];
  includedServices: string[];
  notIncluded: string[];
  whatToBring: string[];
  itinerary: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  testimonials: { name: string; origin: string; rating: number; comment: string }[];
}

function inferTourDefaults(tourName: string, currentDest?: string, currentAlt?: string, currentDiff?: string, currentDur?: string) {
  const q = `${tourName} ${currentDest || ''}`.toLowerCase();

  if (q.includes('humantay')) {
    return {
      destination: currentDest || 'Laguna Humantay & Soraypampa',
      altitude: currentAlt || '4,200 msnm',
      difficulty: currentDiff || 'Moderada',
      duration: currentDur || 'Full Day (04:30 - 17:30)',
    };
  }
  if (q.includes('7 colores') || q.includes('vinicunca') || q.includes('rainbow') || q.includes('palcoyo')) {
    return {
      destination: currentDest || 'Montaña de 7 Colores (Vinicunca)',
      altitude: currentAlt || '5,036 msnm',
      difficulty: currentDiff || 'Exigente / Alta Montaña',
      duration: currentDur || 'Full Day (04:30 - 17:00)',
    };
  }
  if (q.includes('salkantay') || q.includes('inca') || q.includes('choquequirao')) {
    return {
      destination: currentDest || 'Ruta Salkantay & Santuario de Machu Picchu',
      altitude: currentAlt || '4,630 msnm',
      difficulty: currentDiff || 'Desafiante / Trekking Andino',
      duration: currentDur || '4 Días / 3 Noches',
    };
  }
  if (q.includes('valle') || q.includes('maras') || q.includes('moray') || q.includes('pisac') || q.includes('ollantaytambo')) {
    return {
      destination: currentDest || 'Valle Sagrado de los Incas (Pisac, Ollantaytambo & Maras)',
      altitude: currentAlt || '2,870 msnm',
      difficulty: currentDiff || 'Fácil (Familiar / Confort)',
      duration: currentDur || 'Full Day (07:30 - 18:30)',
    };
  }
  if (q.includes('city') || q.includes('sacsayhuaman') || q.includes('qorikancha')) {
    return {
      destination: currentDest || 'Cusco Histórico, Qorikancha & Sacsayhuamán',
      altitude: currentAlt || '3,400 msnm',
      difficulty: currentDiff || 'Fácil (Recorrido Cultural)',
      duration: currentDur || 'Media Jornada (5 Horas)',
    };
  }

  return {
    destination: currentDest || 'Santuario Histórico de Machu Picchu & Cusco',
    altitude: currentAlt || '2,430 msnm',
    difficulty: currentDiff || 'Fácil a Moderada',
    duration: currentDur || 'Full Day Especializado',
  };
}

function buildLocalFallbackData(params: {
  name: string;
  destination: string;
  altitude: string;
  difficulty: string;
  duration: string;
  price: string;
  tier: string;
  objective: string;
  aiTone: string;
  language: string;
  companyName: string;
  guideName: string;
  parsedDoc?: ParsedDocumentData;
}): AiGeneratedLandingPayload {
  const isEn = params.language === 'en';
  const isQuote = params.objective === 'quote';
  const doc = params.parsedDoc || {};

  const effectiveName = doc.name || params.name;
  const effectiveDest = doc.destination || params.destination;
  const effectiveAlt = doc.altitude || params.altitude;
  const effectiveDiff = doc.difficulty || params.difficulty;
  const effectiveDur = doc.duration || params.duration;
  const effectivePrice = doc.price || params.price;
  const effectiveCompany = doc.companyName || params.companyName;
  const effectiveGuide = doc.guideName || params.guideName;

  const inferred = inferTourDefaults(effectiveName, effectiveDest, effectiveAlt, effectiveDiff, effectiveDur);

  const heroTitle = doc.heroTitle || effectiveName || (isEn ? `Exclusive Expedition to ${inferred.destination}` : `Experiencia Inolvidable en ${inferred.destination}`);
  const heroBadge = doc.heroBadge || (isEn
    ? `${inferred.destination} • ${inferred.duration}`
    : `${inferred.destination} • ${inferred.duration}`);
  const heroSubtitle = doc.heroSubtitle || (isEn
    ? `Discover ${inferred.destination} alongside ${effectiveGuide} (${effectiveCompany}). Private tourist transport, certified safety protocols at ${inferred.altitude}, and unforgettable Andean scenery from ${effectivePrice}.`
    : `Descubre ${inferred.destination} junto a ${effectiveGuide} y el respaldo oficial de ${effectiveCompany}. Transporte turístico privado, asistencia permanente a ${inferred.altitude} y logística garantizada desde ${effectivePrice}.`);
  const heroCta = isQuote
    ? (isEn ? 'Request Custom Quote' : 'Solicitar Cotización Personalizada')
    : (isEn ? 'Book Now via WhatsApp' : 'Reservar Cupo por WhatsApp');

  const description = doc.description || (isEn
    ? `Experience ${effectiveName} in ${inferred.destination} (${inferred.altitude}) with certified bilingual guiding, private door-to-door transfers, and complete safety equipment.`
    : `Vive la ruta de ${effectiveName} hacia ${inferred.destination} (${inferred.altitude}) con guiado profesional certificado, recojo privado en tu hotel, protocolo de oxigenación y paradas fotográficas exclusivas.`);

  const defaultItinerary = [
    {
      step: 'Fase 1',
      title: 'Recojo en Hotel & Traslado Escénico',
      desc: `Recojo puntual en tu alojamiento en Cusco en movilidad turística climatizada rumbo a ${inferred.destination}.`,
    },
    {
      step: 'Fase 2',
      title: 'Exploración Guiada & Miradores Panorámicos',
      desc: `Recorrido principal guiado por ${effectiveGuide} con interpretación histórica, tiempo para fotografías y asistencia en altura (${inferred.altitude}).`,
    },
    {
      step: 'Fase 3',
      title: 'Gastronomía Andina & Retorno Seguro a Cusco',
      desc: 'Parada para almuerzo tradicional andino y retorno confortable hasta la puerta de tu hotel en Cusco.',
    },
  ];

  const defaultFaqs = [
    {
      q: `¿Qué incluye la tarifa de ${effectivePrice} en ${effectiveName}?`,
      a: `Incluye movilidad turística privada, guiado oficial certificado por ${effectiveGuide}, asistencia permanente con oxígeno medicinal y soporte directo de ${effectiveCompany}.`,
    },
    {
      q: `¿Cómo debo prepararme para los ${inferred.altitude} de altitud?`,
      a: 'Recomendamos descansar bien la noche previa, hidratarse constantemente y tomar mate de coca. Nuestro vehículo cuenta con balón de oxígeno preventivo en todo momento.',
    },
    {
      q: '¿Con cuánta anticipación puedo reservar o cotizar?',
      a: isQuote
        ? 'Puedes solicitar tu cotización personalizada ahora mismo y recibirás la propuesta formal con disponibilidad garantizada.'
        : 'Puedes asegurar tu lugar inmediatamente por WhatsApp con confirmación directa de nuestro equipo.',
    },
    {
      q: '¿El tour es apto para familias o viajeros primerizos?',
      a: `La ruta tiene dificultad "${inferred.difficulty}" y adaptamos el ritmo del grupo para que disfrutes del paisaje con total seguridad.`,
    },
  ];

  const defaultIncluded = [
    'Transporte turístico privado con chofer profesional',
    `Guía oficial colegiado bilingüe (${effectiveGuide})`,
    'Entradas y boletos turísticos oficiales garantizados',
    'Balón de oxígeno medicinal y botiquín de primeros auxilios',
    'Asistencia personalizada 24/7 vía WhatsApp',
  ];

  const defaultNotIncluded = [
    'Vuelos nacionales o internacionales',
    'Propinas voluntarias para guía y conductor',
    'Seguro de viaje personal',
  ];

  const defaultWhatToBring = [
    'Documento de identidad o Pasaporte original vigente',
    'Casaca cortavientos y ropa abrigadora en capas',
    'Calzado cómodo antideslizante para caminata',
    'Bloqueador solar SPF 50+, lentes de sol y sombrero',
  ];

  return {
    companyName: effectiveCompany,
    companyRuc: doc.companyRuc,
    companyEmail: doc.companyEmail,
    whatsapp: doc.whatsapp,
    officeAddress: doc.officeAddress,
    officeHours: doc.officeHours,
    companyTagline: doc.companyTagline,
    guideName: effectiveGuide,
    guideCert: doc.guideCert,
    recommendedTemplate: doc.recommendedTemplate,
    tourName: effectiveName,
    price: effectivePrice,
    destination: inferred.destination,
    altitude: inferred.altitude,
    difficulty: inferred.difficulty,
    duration: inferred.duration,
    heroBadge,
    heroTitle,
    heroSubtitle,
    heroCta,
    description,
    aboutTitle: isEn ? 'Official Certified Andean Operator' : 'Operación Turística Directa y Certificada',
    aboutContent: description,
    featuresTitle: isEn ? 'Why travel with our official team?' : '¿Por qué elegir nuestra expedición oficial?',
    featuresItems: [
      `Transporte Turístico Privado:Unidades modernas climatizadas con recojo directo en tu hotel hacia ${inferred.destination}.`,
      `Guiado Oficial DIRCETUR (${effectiveGuide}):Explicación histórica, cultural y asistencia personalizada durante toda la ruta.`,
      `Seguridad y Oxígeno Medicinal (${inferred.altitude}):Botiquín de primeros auxilios, oxímetro y balón de oxígeno preventivo a bordo.`,
      `Grupos Reducidos y Ritmo Personalizado:Tiempo ideal para fotografías panorámicas sin prisas ni aglomeraciones.`,
    ],
    includedServices: doc.includedServices && doc.includedServices.length > 0 ? doc.includedServices : defaultIncluded,
    notIncluded: doc.notIncluded && doc.notIncluded.length > 0 ? doc.notIncluded : defaultNotIncluded,
    whatToBring: doc.whatToBring && doc.whatToBring.length > 0 ? doc.whatToBring : defaultWhatToBring,
    itinerary: doc.itinerary && doc.itinerary.length > 0 ? doc.itinerary : defaultItinerary,
    faqs: doc.faqs && doc.faqs.length > 0 ? doc.faqs : defaultFaqs,
    testimonials: [
      {
        name: 'Sarah & Mark Davis',
        origin: 'California, USA',
        rating: 5,
        comment: `Outstanding experience with ${effectiveGuide} and ${effectiveCompany}! Punctual pick-up, safe driving, and breathtaking views at ${inferred.destination}.`,
      },
      {
        name: 'Alejandro y Carmen',
        origin: 'Madrid, España',
        rating: 5,
        comment: 'La mejor experiencia de nuestro viaje a Cusco. Todo súper organizado, con oxígeno a bordo y explicaciones fascinantes.',
      },
      {
        name: 'Sophie Laurent',
        origin: 'París, Francia',
        rating: 5,
        comment: 'Une journée magique dans les Andes. Guide très professionnel et attentionné du début à la fin !',
      },
    ],
  };
}

function validateAndMergeAiResponse(
  rawAi: Record<string, unknown>,
  fallback: AiGeneratedLandingPayload
): AiGeneratedLandingPayload {
  const safeStr = (val: unknown, fb?: string) =>
    typeof val === 'string' && val.trim().length > 1 ? val.trim() : fb || '';

  const safeStrArray = (val: unknown, fb: string[]) => {
    if (!Array.isArray(val)) return fb;
    const cleaned = val
      .map((item) => (typeof item === 'string' ? item.trim() : ''))
      .filter((item) => item.length > 2);
    return cleaned.length >= 2 ? cleaned.slice(0, 10) : fb;
  };

  const safeItinerary = (val: unknown, fb: AiGeneratedLandingPayload['itinerary']) => {
    if (!Array.isArray(val)) return fb;
    const cleaned = val
      .map((item, idx) => {
        if (!item || typeof item !== 'object') return null;
        const obj = item as Record<string, unknown>;
        const step = safeStr(obj.step, `Día ${idx + 1}`);
        const title = safeStr(obj.title, '');
        const desc = safeStr(obj.desc, '');
        return title && desc ? { step, title, desc } : null;
      })
      .filter((x): x is { step: string; title: string; desc: string } => Boolean(x));
    return cleaned.length >= 1 ? cleaned.slice(0, 8) : fb;
  };

  const safeFaqs = (val: unknown, fb: AiGeneratedLandingPayload['faqs']) => {
    if (!Array.isArray(val)) return fb;
    const cleaned = val
      .map((item) => {
        if (!item || typeof item !== 'object') return null;
        const obj = item as Record<string, unknown>;
        const q = safeStr(obj.q, '');
        const a = safeStr(obj.a, '');
        return q && a ? { q, a } : null;
      })
      .filter((x): x is { q: string; a: string } => Boolean(x));
    return cleaned.length >= 1 ? cleaned.slice(0, 8) : fb;
  };

  const safeTestimonials = (val: unknown, fb: AiGeneratedLandingPayload['testimonials']) => {
    if (!Array.isArray(val)) return fb;
    const cleaned = val
      .map((item) => {
        if (!item || typeof item !== 'object') return null;
        const obj = item as Record<string, unknown>;
        const name = safeStr(obj.name, '');
        const origin = safeStr(obj.origin, 'Viajero Verificado');
        const comment = safeStr(obj.comment, '');
        const rating = Number(obj.rating) >= 4 && Number(obj.rating) <= 5 ? Number(obj.rating) : 5;
        return name && comment ? { name, origin, rating, comment } : null;
      })
      .filter((x): x is { name: string; origin: string; rating: number; comment: string } => Boolean(x));
    return cleaned.length >= 2 ? cleaned.slice(0, 4) : fb;
  };

  return {
    companyName: safeStr(rawAi.companyName, fallback.companyName),
    companyRuc: safeStr(rawAi.companyRuc, fallback.companyRuc),
    companyEmail: safeStr(rawAi.companyEmail, fallback.companyEmail),
    whatsapp: safeStr(rawAi.whatsapp, fallback.whatsapp),
    officeAddress: safeStr(rawAi.officeAddress, fallback.officeAddress),
    officeHours: safeStr(rawAi.officeHours, fallback.officeHours),
    companyTagline: safeStr(rawAi.companyTagline, fallback.companyTagline),
    guideName: safeStr(rawAi.guideName, fallback.guideName),
    guideCert: safeStr(rawAi.guideCert, fallback.guideCert),
    recommendedTemplate: safeStr(rawAi.recommendedTemplate, fallback.recommendedTemplate),
    tourName: safeStr(rawAi.tourName, fallback.tourName),
    price: safeStr(rawAi.price, fallback.price),
    destination: safeStr(rawAi.destination, fallback.destination),
    altitude: safeStr(rawAi.altitude, fallback.altitude),
    difficulty: safeStr(rawAi.difficulty, fallback.difficulty),
    duration: safeStr(rawAi.duration, fallback.duration),
    heroBadge: safeStr(rawAi.heroBadge, fallback.heroBadge),
    heroTitle: safeStr(rawAi.heroTitle, fallback.heroTitle),
    heroSubtitle: safeStr(rawAi.heroSubtitle, fallback.heroSubtitle),
    heroCta: safeStr(rawAi.heroCta, fallback.heroCta),
    description: safeStr(rawAi.description, fallback.description),
    aboutTitle: safeStr(rawAi.aboutTitle, fallback.aboutTitle),
    aboutContent: safeStr(rawAi.aboutContent, fallback.aboutContent),
    featuresTitle: safeStr(rawAi.featuresTitle, fallback.featuresTitle),
    featuresItems: safeStrArray(rawAi.featuresItems, fallback.featuresItems),
    includedServices: safeStrArray(rawAi.includedServices, fallback.includedServices),
    notIncluded: safeStrArray(rawAi.notIncluded, fallback.notIncluded),
    whatToBring: safeStrArray(rawAi.whatToBring, fallback.whatToBring),
    itinerary: safeItinerary(rawAi.itinerary, fallback.itinerary),
    faqs: safeFaqs(rawAi.faqs, fallback.faqs),
    testimonials: safeTestimonials(rawAi.testimonials, fallback.testimonials),
  };
}

async function logAiGenerationToSupabase(params: {
  prompt: string;
  response: unknown;
  model: string;
  tokensIn?: number;
  tokensOut?: number;
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
    return;
  }

  try {
    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);
    const costUsd =
      ((params.tokensIn || 0) * 0.00000015) + ((params.tokensOut || 0) * 0.0000006);

    await supabaseAdmin.from('ai_generations').insert({
      prompt: params.prompt.slice(0, 2000),
      response: params.response ?? {},
      model: params.model,
      tokens_in: params.tokensIn ?? null,
      tokens_out: params.tokensOut ?? null,
      cost_usd: Number(costUsd.toFixed(6)),
    });
  } catch {
    // No bloquear la respuesta si la tabla aún no fue migrada
  }
}

export async function POST(request: NextRequest) {
  // 1. Verificar sesión autenticada mediante cookie cc_auth
  const authCookie = request.cookies.get('cc_auth');
  if (!authCookie?.value) {
    return NextResponse.json(
      { error: 'No autorizado. Debes iniciar sesión para generar contenido con IA.' },
      { status: 401 }
    );
  }

  // 2. Rate limiting por IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local-user';
  const now = Date.now();
  const history = (rateLimitMap.get(ip) || []).filter((ts) => now - ts < WINDOW_MS);

  if (history.length >= MAX_REQUESTS_PER_HOUR) {
    return NextResponse.json(
      { error: `Límite de generación alcanzado (${MAX_REQUESTS_PER_HOUR} por hora). Intenta más tarde.` },
      { status: 429 }
    );
  }
  history.push(now);
  rateLimitMap.set(ip, history);

  try {
    const rawBody = await request.json();
    const body = sanitizeObject(rawBody as Record<string, unknown>);

    const documentText = typeof body.documentText === 'string' ? body.documentText.trim() : '';
    let parsedDoc: ParsedDocumentData | undefined;

    // Si el usuario proporcionó un documento o texto libre, parsearlo localmente primero
    if (documentText) {
      parsedDoc = parseDocumentTextLocally(documentText);
    }

    const name = String(body.name || parsedDoc?.name || 'Tour Especial en Cusco');
    const destination = String(body.destination || parsedDoc?.destination || '');
    const price = String(body.price || parsedDoc?.price || '$150 USD');
    const duration = String(body.duration || parsedDoc?.duration || '');
    const difficulty = String(body.difficulty || parsedDoc?.difficulty || '');
    const altitude = String(body.altitude || parsedDoc?.altitude || '');
    const tier = String(body.tier || 'advance');
    const objective = String(body.objective || 'whatsapp');
    const aiTone = String(body.aiTone || 'aventurero');
    const language = String(body.language || 'es');
    const companyName = String(body.companyName || parsedDoc?.companyName || 'Cusco Creativos Expeditions');
    const guideName = String(body.guideName || parsedDoc?.guideName || 'Guía Oficial DIRCETUR');

    const fallbackData = buildLocalFallbackData({
      name,
      destination,
      altitude,
      difficulty,
      duration,
      price,
      tier,
      objective,
      aiTone,
      language,
      companyName,
      guideName,
      parsedDoc,
    });

    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.AI_MODEL || 'gpt-4o-mini';
    const maxTokens = Math.min(Number(process.env.AI_MAX_OUTPUT_TOKENS || 2800), 3800);

    // 3. Si OPENAI_API_KEY está configurada, llamar a OpenAI
    if (apiKey && apiKey.startsWith('sk-') && apiKey.length > 15) {
      const systemPrompt = `Eres el motor experto de inteligencia artificial y copywriting turístico para la plataforma Cusco Creativos Web en Cusco, Perú.
Tu tarea es analizar los datos y el documento proporcionado por el operador turístico y generar exclusivamente un objeto JSON válido para autocompletar la landing page de alta conversión.
REGLAS ESTRICTAS:
1. NUNCA devuelvas HTML, Markdown ni explicaciones fuera del JSON.
2. Si se proporciona texto de documento, extrae rigurosamente los datos reales:
   - Datos de Empresa: companyName, companyRuc, companyEmail, whatsapp, officeAddress, officeHours, companyTagline, guideName, guideCert.
   - Datos de Tour: tourName, destination, price, duration, difficulty, altitude.
   - Secciones: heroBadge, heroTitle, heroSubtitle, heroCta, description, itinerary, includedServices, notIncluded, whatToBring, faqs, testimonials.
   - Plantilla recomendada ("recommendedTemplate"): una de ["agency-portal", "boho-nature", "premium", "adventure", "cultural", "emerald-explorer"].
3. Respeta el idioma principal "${language}".
4. Formato JSON exacto requerido.`;

      const userPrompt = `Analiza la siguiente información y genera el JSON estructurado:
${documentText ? `--- CONTENIDO DEL DOCUMENTO / TEXTO CARGADO POR EL OPERADOR ---\n${documentText.slice(0, 4000)}\n--- FIN DEL DOCUMENTO ---` : ''}

Parámetros base:
- Nombre: "${name}"
- Destino sugerido: "${fallbackData.destination}"
- Precio oficial: "${price}"
- Agencia: "${companyName}"
- Guía: "${guideName}"
- Plan: "${tier}"
- Tono: "${aiTone}"`;

      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            max_tokens: maxTokens,
            temperature: 0.7,
            response_format: { type: 'json_object' },
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
          }),
        });

        if (response.ok) {
          const result = await response.json();
          const content = result.choices?.[0]?.message?.content;
          if (content) {
            const parsed = JSON.parse(content) as Record<string, unknown>;
            const validated = validateAndMergeAiResponse(parsed, fallbackData);

            await logAiGenerationToSupabase({
              prompt: userPrompt,
              response: validated,
              model,
              tokensIn: result.usage?.prompt_tokens,
              tokensOut: result.usage?.completion_tokens,
            });

            return NextResponse.json({
              ok: true,
              source: 'openai',
              model,
              data: validated,
            });
          }
        }
      } catch {
        // Fallback al motor local si OpenAI falla
      }
    }

    // 4. Fallback estructurado inteligente (cuando no hay OpenAI API Key o está sin saldo)
    await logAiGenerationToSupabase({
      prompt: `Fallback local para: ${name} (${fallbackData.destination})`,
      response: fallbackData,
      model: 'local-intelligent-engine',
      tokensIn: 0,
      tokensOut: 0,
    });

    return NextResponse.json({
      ok: true,
      source: 'local-engine',
      model: 'local-intelligent-engine',
      data: fallbackData,
    });
  } catch {
    return NextResponse.json(
      { error: 'Error al procesar la solicitud de generación con IA.' },
      { status: 400 }
    );
  }
}
