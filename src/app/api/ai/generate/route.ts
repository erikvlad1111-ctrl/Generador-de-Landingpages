import { NextRequest, NextResponse } from 'next/server';
import { sanitizeObject } from '@/lib/sanitize';

const rateLimitMap = new Map<string, number[]>();
const MAX_REQUESTS_PER_HOUR = Number(process.env.AI_RATE_LIMIT_PER_HOUR || 10);
const WINDOW_MS = 60 * 60 * 1000;

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
    const tourName = String(body.name || 'Tour en Cusco');
    const price = String(body.price || 'S/ 250');

    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.AI_MODEL || 'gpt-4o-mini';
    const maxTokens = Math.min(Number(process.env.AI_MAX_OUTPUT_TOKENS || 3000), 3000);

    // 3. Si OPENAI_API_KEY está configurada en Vercel, llamar desde el servidor
    if (apiKey && apiKey.startsWith('sk-') && apiKey.length > 10) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          max_tokens: maxTokens,
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content:
                'Eres un copywriter experto en turismo receptivo en Cusco y Machu Picchu. Devuelve únicamente un objeto JSON válido con heroTitle, heroSubtitle, heroCta y description.',
            },
            {
              role: 'user',
              content: `Genera textos persuasivos para el tour "${tourName}" con tarifa "${price}".`,
            },
          ],
        }),
      });

      if (response.ok) {
        const result = await response.json();
        const content = result.choices?.[0]?.message?.content;
        if (content) {
          return NextResponse.json({
            ok: true,
            source: 'openai',
            data: JSON.parse(content),
          });
        }
      }
    }

    // 4. Fallback estructurado seguro si aún no se ha configurado OPENAI_API_KEY
    return NextResponse.json({
      ok: true,
      source: 'local-engine',
      data: {
        heroTitle: tourName,
        heroSubtitle: `Vive una experiencia inolvidable en ${tourName} con guías oficiales certificados y logística garantizada desde ${price}.`,
        heroCta: 'Reservar por WhatsApp',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Error al procesar la solicitud de generación con IA.' },
      { status: 400 }
    );
  }
}

