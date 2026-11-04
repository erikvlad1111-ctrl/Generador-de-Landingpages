import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get('cc_auth');

  // Proteger todas las rutas internas de /demo/* exigiendo cookie de sesión activa
  if (pathname.startsWith('/demo') && !authCookie?.value) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/demo/:path*', '/login'],
};
