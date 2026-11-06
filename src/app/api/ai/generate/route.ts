import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sanitizeObject } from '@/lib/sanitize';

const rateLimitMap = new Map<string, number[]>();
const MAX_REQUESTS_PER_HOUR = Number(process.env.AI_RATE_LIMIT_PER_HOUR || 25);
const WINDOW_MS = 60 * 60 * 1000;

export interface AiGeneratedLandingPayload {
  destination: string;
  altitude: string;
  difficulty: string;
  duration: string;
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
}): AiGeneratedLandingPayload {
  const isEn = params.language === 'en';
  const isQuote = params.objective === 'quote';
  const inferred = inferTourDefaults(params.name, params.destination, params.altitude, params.difficulty, params.duration);

  const heroTitle = params.name || (isEn ? `Exclusive Expedition to ${inferred.destination}` : `Experiencia Inolvidable en ${inferred.destination}`);
  const heroBadge = isEn
    ? `${inferred.destination} • ${inferred.duration}`
    : `${inferred.destination} • ${inferred.duration}`;
  const heroSubtitle = isEn
    ? `Discover ${inferred.destination} alongside ${params.guideName} (${params.companyName}). Private tourist transport, certified safety protocols at ${inferred.altitude}, and unforgettable Andean scenery from ${params.price}.`
    : `Descubre ${inferred.destination} junto a ${params.guideName} y el respaldo oficial de ${params.companyName}. Transporte turístico privado, asistencia permanente a ${inferred.altitude} y logística garantizada desde ${params.price}.`;
  const heroCta = isQuote
    ? (isEn ? 'Request Custom Quote' : 'Solicitar Cotización Personalizada')
    : (isEn ? 'Book Now via WhatsApp' : 'Reservar Cupo por WhatsApp');

  const description = isEn
    ? `Experience ${params.name} in ${inferred.destination} (${inferred.altitude}) with certified bilingual guiding, private door-to-door transfers, and complete safety equipment.`
    : `Vive la ruta de ${params.name} hacia ${inferred.destination} (${inferred.altitude}) con guiado profesional certificado, recojo privado en tu hotel, protocolo de oxigenación y paradas fotográficas exclusivas.`;

  return {
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
      `Guiado Oficial DIRCETUR (${params.guideName}):Explicación histórica, cultural y asistencia personalizada durante toda la ruta.`,
      `Seguridad y Oxígeno Medicinal (${inferred.altitude}):Botiquín de primeros auxilios, oxímetro y balón de oxígeno preventivo a bordo.`,
      `Grupos Reducidos y Ritmo Personalizado:Tiempo ideal para fotografías panorámicas sin prisas ni aglomeraciones.`,
    ],
    includedServices: [
      'Transporte turístico privado con chofer profesional',
      `Guía oficial colegiado bilingüe (${params.guideName})`,
      'Entradas y boletos turísticos oficiales garantizados',
      'Balón de oxígeno medicinal y botiquín de primeros auxilios',
      'Asistencia personalizada 24/7 vía WhatsApp',
    ],
    notIncluded: [
      'Vuelos nacionales o internacionales',
      'Propinas voluntarias para guía y conductor',
      'Seguro de viaje personal',
    ],
    whatToBring: [
      'Documento de identidad o Pasaporte original vigente',
      'Casaca cortavientos y ropa abrigadora en capas',
      'Calzado cómodo antideslizante para caminata',
      'Bloqueador solar SPF 50+, lentes de sol y sombrero',
    ],
    itinerary: [
      {
        step: 'Fase 1',
        title: 'Recojo en Hotel & Traslado Escénico',
        desc: `Recojo puntual en tu alojamiento en Cusco en movilidad turística climatizada rumbo a ${inferred.destination}.`,
      },
      {
        step: 'Fase 2',
        title: 'Exploración Guiada & Miradores Panorámicos',
        desc: `Recorrido principal guiado por ${params.guideName} con interpretación histórica, tiempo para fotografías y asistencia en altura (${inferred.altitude}).`,
      },
      {
        step: 'Fase 3',
        title: 'Gastronomía Andina & Retorno Seguro a Cusco',
        desc: 'Parada para almuerzo tradicional andino y retorno confortable hasta la puerta de tu hotel en Cusco.',
      },
    ],
    faqs: [
      {
        q: `¿Qué incluye la tarifa de ${params.price} en ${params.name}?`,
        a: `Incluye movilidad turística privada, guiado oficial certificado por ${params.guideName}, asistencia permanente con oxígeno medicinal y soporte directo de ${params.companyName}.`,
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
    ],
    testimonials: [
      {
        name: 'Sarah & Mark Davis',
        origin: 'California, USA',
        rating: 5,
        comment: `Outstanding experience with ${params.guideName} and ${params.companyName}! Punctual pick-up, safe driving, and breathtaking views at ${inferred.destination}.`,
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
  const safeStr = (val: unknown, fb: string) =>
    typeof val === 'string' && val.trim().length > 2 ? val.trim() : fb;

  const safeStrArray = (val: unknown, fb: string[]) => {
    if (!Array.isArray(val)) return fb;
    const cleaned = val
      .map((item) => (typeof item === 'string' ? item.trim() : ''))
      .filter((item) => item.length > 2);
    return cleaned.length >= 2 ? cleaned.slice(0, 8) : fb;
  };

  const safeItinerary = (val: unknown, fb: AiGeneratedLandingPayload['itinerary']) => {
    if (!Array.isArray(val)) return fb;
    const cleaned = val
      .map((item, idx) => {
        if (!item || typeof item !== 'object') return null;
        const obj = item as Record<string, unknown>;
        const step = safeStr(obj.step, `Fase ${idx + 1}`);
        const title = safeStr(obj.title, '');
        const desc = safeStr(obj.desc, '');
        return title && desc ? { step, title, desc } : null;
      })
      .filter((x): x is { step: string; title: string; desc: string } => Boolean(x));
    return cleaned.length >= 2 ? cleaned.slice(0, 6) : fb;
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
    return cleaned.length >= 2 ? cleaned.slice(0, 6) : fb;
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
    // Estimación estándar gpt-4o-mini ($0.15 / 1M input, $0.60 / 1M output)
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

  // 2. Rate limiting por IP para proteger saldo de OpenAI
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

    const name = String(body.name || 'Tour Especial en Cusco');
    const destination = String(body.destination || '');
    const price = String(body.price || '$150 USD');
    const duration = String(body.duration || '');
    const difficulty = String(body.difficulty || '');
    const altitude = String(body.altitude || '');
    const tier = String(body.tier || 'advance');
    const objective = String(body.objective || 'whatsapp');
    const aiTone = String(body.aiTone || 'aventurero');
    const language = String(body.language || 'es');
    const companyName = String(body.companyName || 'Cusco Creativos Expeditions');
    const guideName = String(body.guideName || 'Guía Oficial DIRCETUR');

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
    });

    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.AI_MODEL || 'gpt-4o-mini';
    const maxTokens = Math.min(Number(process.env.AI_MAX_OUTPUT_TOKENS || 2200), 3000);

    // 3. Si OPENAI_API_KEY está configurada, llamar a OpenAI con el Prompt Engine de la Fase 5
    if (apiKey && apiKey.startsWith('sk-') && apiKey.length > 15) {
      const systemPrompt = `Eres el motor oficial de copywriting turístico de "${companyName}" en Cusco, Perú.
Tu tarea es generar exclusivamente un objeto JSON válido con textos persuasivos y veraces para una landing page turística.
REGLAS ESTRICTAS:
1. NUNCA devuelvas HTML ni CSS. Solo texto estructurado en JSON.
2. NUNCA inventes tarifas ni teléfonos distintos a los proporcionados (Precio real: "${price}", Guía: "${guideName}", Agencia: "${companyName}").
3. Adapta la prioridad según el objetivo "${objective}" (${objective === 'whatsapp' ? 'énfasis en contacto inmediato por WhatsApp y cupos diarios' : 'énfasis en solicitud de cotización formal y viaje a medida'}) y el nivel "${tier}".
4. Usa tono "${aiTone}" e idioma principal "${language}".
5. El JSON debe contener exactamente estas claves:
{
  "destination": "string",
  "altitude": "string (ej. 4,200 msnm)",
  "difficulty": "string",
  "duration": "string",
  "heroBadge": "string",
  "heroTitle": "string",
  "heroSubtitle": "string",
  "heroCta": "string",
  "description": "string (2-3 oraciones persuasivas)",
  "aboutTitle": "string",
  "aboutContent": "string",
  "featuresTitle": "string",
  "featuresItems": ["Titulo Corto:Descripción detallada", ...4 elementos],
  "includedServices": ["string", ...5 elementos],
  "notIncluded": ["string", ...3 elementos],
  "whatToBring": ["string", ...4 elementos],
  "itinerary": [{"step": "Fase 1", "title": "string", "desc": "string"}, ...3 o 4 etapas],
  "faqs": [{"q": "string", "a": "string"}, ...4 preguntas frecuentes],
  "testimonials": [{"name": "string", "origin": "Ciudad, País", "rating": 5, "comment": "string"}, ...3 reseñas]
}`;

      const userPrompt = `Genera el JSON completo para el tour:
- Nombre del Tour: "${name}"
- Destino sugerido: "${fallbackData.destination}"
- Altitud: "${fallbackData.altitude}"
- Dificultad: "${fallbackData.difficulty}"
- Duración: "${fallbackData.duration}"
- Precio oficial: "${price}"
- Agencia: "${companyName}"
- Guía responsable: "${guideName}"
- Plan de landing: "${tier}"
- Objetivo de conversión: "${objective}"`;

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
        // Si OpenAI falla o no hay internet, continuar de forma transparente al motor local
      }
    }

    // 4. Fallback estructurado completo si aún no se ha configurado OPENAI_API_KEY
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
