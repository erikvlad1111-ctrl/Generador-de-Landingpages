import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get('cc_auth');

  // Si intenta acceder a cualquier ruta del panel /demo sin cookie de sesión
  if (pathname.startsWith('/demo') && !authCookie?.value) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Si ya tiene sesión activa e ingresa a /login, redirigir al panel principal
  if (pathname === '/login' && authCookie?.value) {
    return NextResponse.redirect(new URL('/demo', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/demo/:path*', '/login'],
};

