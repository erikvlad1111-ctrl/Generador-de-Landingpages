import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { isSupabaseConfigured } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  if (isSupabaseConfigured()) {
    try {
      await supabase.from('templates').select('id').limit(1);
      return NextResponse.json({ ok: true, supabase: 'pinged', timestamp: new Date().toISOString() });
    } catch {
      return NextResponse.json({ ok: false, supabase: 'error' }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true, supabase: 'local-mode', timestamp: new Date().toISOString() });
}

