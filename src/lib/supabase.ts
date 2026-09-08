import { createClient } from '@supabase/supabase-js';

// We ensure that we fail fast if env vars are missing during development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Ensure you have run "npx supabase start" and populated your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
