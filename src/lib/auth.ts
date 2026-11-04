import { supabase } from './supabase';

export interface UserSession {
  id?: string;
  email: string;
  name?: string;
  role: 'admin' | 'employee';
  isDemo?: boolean;
  loginAt?: string;
}

const AUTH_STORAGE_KEY = 'cc_auth_user_v1';
const AUTH_ATTEMPTS_KEY = 'cc_auth_attempts_v1';
const COOKIE_NAME = 'cc_auth';
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 60 * 1000; // 60 segundos de bloqueo tras 5 intentos fallidos

interface AttemptRecord {
  count: number;
  lockedUntil: number | null;
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return false;
  if (url.includes('placeholder.supabase.co') || key.includes('placeholder-anon-key')) return false;
  return true;
}

export function getRateLimitStatus(): { locked: boolean; remainingSeconds: number; attemptsLeft: number } {
  if (typeof window === 'undefined') {
    return { locked: false, remainingSeconds: 0, attemptsLeft: MAX_FAILED_ATTEMPTS };
  }
  try {
    const raw = localStorage.getItem(AUTH_ATTEMPTS_KEY);
    if (!raw) return { locked: false, remainingSeconds: 0, attemptsLeft: MAX_FAILED_ATTEMPTS };
    const record: AttemptRecord = JSON.parse(raw);
    if (record.lockedUntil && Date.now() < record.lockedUntil) {
      const remainingSeconds = Math.ceil((record.lockedUntil - Date.now()) / 1000);
      return { locked: true, remainingSeconds, attemptsLeft: 0 };
    }
    if (record.lockedUntil && Date.now() >= record.lockedUntil) {
      localStorage.removeItem(AUTH_ATTEMPTS_KEY);
      return { locked: false, remainingSeconds: 0, attemptsLeft: MAX_FAILED_ATTEMPTS };
    }
    return {
      locked: false,
      remainingSeconds: 0,
      attemptsLeft: Math.max(0, MAX_FAILED_ATTEMPTS - (record.count || 0)),
    };
  } catch {
    return { locked: false, remainingSeconds: 0, attemptsLeft: MAX_FAILED_ATTEMPTS };
  }
}

function registerFailedAttempt(): { locked: boolean; remainingSeconds: number; attemptsLeft: number } {
  if (typeof window === 'undefined') {
    return { locked: false, remainingSeconds: 0, attemptsLeft: MAX_FAILED_ATTEMPTS };
  }
  try {
    const current = getRateLimitStatus();
    if (current.locked) return current;

    const raw = localStorage.getItem(AUTH_ATTEMPTS_KEY);
    const prevCount = raw ? (JSON.parse(raw) as AttemptRecord).count || 0 : 0;
    const newCount = prevCount + 1;
    const lockedUntil = newCount >= MAX_FAILED_ATTEMPTS ? Date.now() + LOCKOUT_DURATION_MS : null;

    localStorage.setItem(
      AUTH_ATTEMPTS_KEY,
      JSON.stringify({ count: newCount, lockedUntil })
    );

    return {
      locked: Boolean(lockedUntil),
      remainingSeconds: lockedUntil ? Math.ceil(LOCKOUT_DURATION_MS / 1000) : 0,
      attemptsLeft: Math.max(0, MAX_FAILED_ATTEMPTS - newCount),
    };
  } catch {
    return { locked: false, remainingSeconds: 0, attemptsLeft: MAX_FAILED_ATTEMPTS };
  }
}

function resetFailedAttempts(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(AUTH_ATTEMPTS_KEY);
  } catch {
    // ignore
  }
}

function setAuthCookie(rememberMe = true) {
  if (typeof document === 'undefined') return;
  // Expira en 7 días si rememberMe está activo, o 1 día por defecto
  const maxAge = rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${COOKIE_NAME}=1; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

function clearAuthCookie() {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax`;
}

export function getStoredUser(): UserSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setStoredUser(user: UserSession | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    window.dispatchEvent(new CustomEvent('cc-auth-changed', { detail: user }));
  } catch (err) {
    console.error('Error saving user session', err);
  }
}

// Cuentas internas autorizadas por Jefatura (cuando opera en modo Demo/Tesis sin variables cloud)
const AUTHORIZED_INTERNAL_USERS: Record<
  string,
  { password: string; role: 'admin' | 'employee'; name: string; id: string }
> = {
  'admin@cuscocreativos.com': {
    password: 'admin123',
    role: 'admin',
    name: 'Administrador General',
    id: 'cc-admin-01',
  },
  'empleado@cuscocreativos.com': {
    password: 'cusco2026',
    role: 'employee',
    name: 'Ejecutivo de Ventas & Tours',
    id: 'cc-emp-02',
  },
};

export async function signInWithCredentials(
  email: string,
  password: string,
  options?: { honeypot?: string; rememberMe?: boolean }
): Promise<{ user?: UserSession; error?: string; rateLimit?: { locked: boolean; remainingSeconds: number; attemptsLeft: number } }> {
  // Capa 1: Honeypot Anti-Bot
  if (options?.honeypot && options.honeypot.trim().length > 0) {
    return { error: 'Solicitud bloqueada por el filtro de seguridad Anti-Bot.' };
  }

  // Capa 2: Verificación de Rate Limit (Fuerza Bruta)
  const limitStatus = getRateLimitStatus();
  if (limitStatus.locked) {
    return {
      error: `Demasiados intentos fallidos. Por seguridad, espera ${limitStatus.remainingSeconds} segundos antes de volver a intentar.`,
      rateLimit: limitStatus,
    };
  }

  const configured = isSupabaseConfigured();
  const rememberMe = options?.rememberMe ?? true;

  // Capa 3A: Autenticación en la nube con Supabase Auth (si las variables están configuradas)
  if (configured) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        const updatedLimit = registerFailedAttempt();
        return {
          error: `Credenciales rechazadas por Supabase Auth (${error.message}). Intentos restantes: ${updatedLimit.attemptsLeft}.`,
          rateLimit: updatedLimit,
        };
      }

      if (data?.user) {
        resetFailedAttempts();
        const userSession: UserSession = {
          id: data.user.id,
          email: data.user.email || email.trim(),
          name: (data.user.user_metadata?.name as string) || 'Personal Autorizado',
          role: (data.user.user_metadata?.role as 'admin' | 'employee') || 'admin',
          isDemo: false,
          loginAt: new Date().toISOString(),
        };

        setAuthCookie(rememberMe);
        setStoredUser(userSession);
        return { user: userSession };
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error de conexión con Supabase Auth';
      return { error: message };
    }
  }

  // Capa 3B: Autenticación Interna Controlada (Cuentas autorizadas por Jefatura)
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPass = password.trim();
  const matchedAccount = AUTHORIZED_INTERNAL_USERS[trimmedEmail];

  if (matchedAccount && matchedAccount.password === trimmedPass) {
    resetFailedAttempts();
    const demoUser: UserSession = {
      id: matchedAccount.id,
      email: trimmedEmail,
      name: matchedAccount.name,
      role: matchedAccount.role,
      isDemo: true,
      loginAt: new Date().toISOString(),
    };

    setAuthCookie(rememberMe);
    setStoredUser(demoUser);
    return { user: demoUser };
  }

  const updatedLimit = registerFailedAttempt();
  return {
    error: updatedLimit.locked
      ? `Cuenta bloqueada temporalmente por 60 segundos tras ${MAX_FAILED_ATTEMPTS} intentos fallidos.`
      : `Credenciales inválidas. Acceso exclusivo para personal autorizado de Cusco Creativos. (Intentos restantes: ${updatedLimit.attemptsLeft})`,
    rateLimit: updatedLimit,
  };
}

export async function signOutUser(): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Error signing out from Supabase', err);
    }
  }
  clearAuthCookie();
  setStoredUser(null);
}

export async function getCurrentUser(): Promise<UserSession | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        const session: UserSession = {
          id: data.user.id,
          email: data.user.email || '',
          name: (data.user.user_metadata?.name as string) || 'Personal Autorizado',
          role: (data.user.user_metadata?.role as 'admin' | 'employee') || 'admin',
          isDemo: false,
        };
        setAuthCookie();
        setStoredUser(session);
        return session;
      }
    } catch {
      // Fallback a almacenamiento local si la llamada falla
    }
  }
  return getStoredUser();
}
