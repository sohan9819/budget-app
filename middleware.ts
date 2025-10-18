import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';

// const ROOT_REGEX = /^\/$/;
const AUTH_PAGES_REGEX =
  /^\/(sign-in|sign-up|forgot-password|reset-password)\/?$/;

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const pathname = request.nextUrl.pathname;

  console.log('User Session : ', session);

  if (session) {
    // Signed-in users should not see "/", "/sign-in", or "/sign-up"
    // if (ROOT_REGEX.test(pathname) || AUTH_PAGES_REGEX.test(pathname))

    // Signed-in users should not see "/sign-in", or "/sign-up"
    if (AUTH_PAGES_REGEX.test(pathname)) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Not signed-in users: allow only auth routes, block everything else
  if (!AUTH_PAGES_REGEX.test(pathname)) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (pathname === '/reset-password') {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(new URL('/forgot-password', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  runtime: 'nodejs',
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
