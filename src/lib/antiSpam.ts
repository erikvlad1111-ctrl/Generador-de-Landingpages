const SPAM_RATE_LIMIT_KEY = 'cc_form_submissions_v1';
const MIN_FILL_TIME_MS = 2500; // 2.5 segundos mínimos de llenado humano (Time-Gate)
const MAX_SUBMISSIONS_WINDOW = 3; // Máximo 3 envíos
const WINDOW_DURATION_MS = 10 * 60 * 1000; // Ventana de 10 minutos

export interface AntiSpamCheckParams {
  honeypot?: string;
  formLoadedAt: number;
  actionKey: 'quote' | 'complaint' | 'support';
}

export interface AntiSpamCheckResult {
  allowed: boolean;
  silentDrop?: boolean;
  error?: string;
}

export function validateFormAntiSpam({
  honeypot,
  formLoadedAt,
  actionKey,
}: AntiSpamCheckParams): AntiSpamCheckResult {
  // 1. Capa 1: Honeypot invisible (descarte silencioso para bots)
  if (honeypot && honeypot.trim().length > 0) {
    return { allowed: false, silentDrop: true };
  }

  // 2. Capa 2: Time-Gate (mínimo 2.5 segundos desde que se abrió el formulario)
  const elapsed = Date.now() - formLoadedAt;
  if (elapsed < MIN_FILL_TIME_MS) {
    return {
      allowed: false,
      error: 'Envío demasiado rápido. Por favor revisa tus datos un momento antes de enviar.',
    };
  }

  // 3. Capa 3: Rate Limiting (máximo 3 envíos cada 10 minutos por navegador)
  if (typeof window !== 'undefined') {
    try {
      const now = Date.now();
      const raw = localStorage.getItem(SPAM_RATE_LIMIT_KEY);
      const records: Record<string, number[]> = raw ? JSON.parse(raw) : {};
      const history = (records[actionKey] || []).filter((ts) => now - ts < WINDOW_DURATION_MS);

      if (history.length >= MAX_SUBMISSIONS_WINDOW) {
        const oldest = history[0];
        const waitMinutes = Math.max(1, Math.ceil((WINDOW_DURATION_MS - (now - oldest)) / 60000));
        return {
          allowed: false,
          error: `Has alcanzado el límite de ${MAX_SUBMISSIONS_WINDOW} envíos recientes. Por seguridad, intenta nuevamente en ${waitMinutes} min.`,
        };
      }

      history.push(now);
      records[actionKey] = history;
      localStorage.setItem(SPAM_RATE_LIMIT_KEY, JSON.stringify(records));
    } catch {
      // Si localStorage está bloqueado, continuar con las capas anteriores
    }
  }

  return { allowed: true };
}

