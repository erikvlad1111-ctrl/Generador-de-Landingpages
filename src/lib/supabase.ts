import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') &&
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('placeholder')
);

if (!isSupabaseConfigured && process.env.NODE_ENV !== 'production') {
  console.warn(
    'Supabase URL or Anon Key is missing. Operating in local storage mode until .env.local or Vercel Environment Variables are configured.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Sube una imagen al bucket público `landing-images` de Supabase Storage
 * si Supabase está configurado; en caso contrario retorna el fallback local (DataURL).
 */
export async function uploadImageToSupabaseStorage(
  blobOrFile: Blob | File,
  prefix = 'logo',
  fallbackDataUrl?: string
): Promise<string | null> {
  if (!isSupabaseConfigured) {
    return fallbackDataUrl || null;
  }

  try {
    const ext = blobOrFile.type.includes('png')
      ? 'png'
      : blobOrFile.type.includes('webp')
      ? 'webp'
      : 'jpg';
    const filePath = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error } = await supabase.storage
      .from('landing-images')
      .upload(filePath, blobOrFile, {
        cacheControl: '3600',
        upsert: false,
        contentType: blobOrFile.type || 'image/webp',
      });

    if (error) {
      return fallbackDataUrl || null;
    }

    const { data } = supabase.storage.from('landing-images').getPublicUrl(filePath);
    return data?.publicUrl || fallbackDataUrl || null;
  } catch {
    return fallbackDataUrl || null;
  }
}
