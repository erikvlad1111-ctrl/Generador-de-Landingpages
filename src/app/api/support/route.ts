import { NextRequest, NextResponse } from 'next/server';
import { sanitizeObject } from '@/lib/sanitize';

const supportRateLimit = new Map<string, number[]>();
const MAX_SUPPORT_WINDOW = 3;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const MIN_ELAPSED_MS = 2500; // Time-Gate: 2.5 segundos

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();

    // 1. Honeypot check
    if (rawBody?.honeypot && String(rawBody.honeypot).trim().length > 0) {
      return NextResponse.json({ ok: true, filtered: true });
    }

    // 2. Time-Gate check (mínimo 2.5s)
    if (typeof rawBody?.elapsedMs === 'number' && rawBody.elapsedMs < MIN_ELAPSED_MS) {
      return NextResponse.json(
        { error: 'Envío demasiado rápido. Por favor verifica tu consulta antes de enviar.' },
        { status: 422 }
      );
    }

    // 3. Rate Limit por IP (máx. 3 cada 10 minutos)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anon-ip';
    const now = Date.now();
    const history = (supportRateLimit.get(ip) || []).filter((ts) => now - ts < WINDOW_MS);

    if (history.length >= MAX_SUPPORT_WINDOW) {
      return NextResponse.json(
        { error: 'Has superado el límite de consultas recientes. Intenta nuevamente en unos minutos.' },
        { status: 429 }
      );
    }
    history.push(now);
    supportRateLimit.set(ip, history);

    // 4. Sanitización Anti-XSS
    const cleanPayload = sanitizeObject(rawBody as Record<string, unknown>);

    return NextResponse.json({
      ok: true,
      receivedAt: new Date().toISOString(),
      ticket: cleanPayload,
    });
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
  }
}

