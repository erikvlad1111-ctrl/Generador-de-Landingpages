import { supabase } from './supabase';

export interface UserSession {
  id?: string;
  email: string;
  role: 'admin' | 'employee';
  isDemo?: boolean;
}

const AUTH_STORAGE_KEY = 'cc_auth_user_v1';
const COOKIE_NAME = 'cc_auth';

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return false;
  if (url.includes('placeholder.supabase.co') || key.includes('placeholder-anon-key')) return false;
  return true;
}

function setAuthCookie() {
  if (typeof document === 'undefined') return;
  // Expira en 7 días
  const maxAge = 60 * 60 * 24 * 7;
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
  } catch (err) {
    console.error('Error saving user session', err);
  }
}

export async function signInWithCredentials(email: string, password: string): Promise<{ user?: UserSession; error?: string }> {
  const configured = isSupabaseConfigured();

  if (configured) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        return { error: error.message };
      }

      if (data?.user) {
        const userSession: UserSession = {
          id: data.user.id,
          email: data.user.email || email,
          role: (data.user.user_metadata?.role as 'admin' | 'employee') || 'admin',
          isDemo: false,
        };

        setAuthCookie();
        setStoredUser(userSession);
        return { user: userSession };
      }
    } catch (err: any) {
      return { error: err?.message || 'Error de conexión con Supabase Auth' };
    }
  }

  // Modo Demostración Local (cuando aún no se han configurado claves reales de Supabase)
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPass = password.trim();

  // Permitir credenciales oficiales de demo o cualquier contraseña de 6+ caracteres para pruebas internas
  if (
    (trimmedEmail === 'admin@cuscocreativos.com' && trimmedPass === 'admin123') ||
    (trimmedEmail.includes('@') && trimmedPass.length >= 6)
  ) {
    const demoUser: UserSession = {
      id: 'demo-admin-id',
      email: trimmedEmail,
      role: 'admin',
      isDemo: true,
    };

    setAuthCookie();
    setStoredUser(demoUser);
    return { user: demoUser };
  }

  return { 
    error: 'Credenciales inválidas. Usa el usuario demo admin@cuscocreativos.com con clave admin123 o contraseña de al menos 6 caracteres.' 
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

