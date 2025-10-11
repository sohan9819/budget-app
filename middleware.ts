import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log('User middleware session : ', session);

  const pathname = new URL(request.url).pathname;

  if (session) {
    if (!session.user.emailVerified) {
      return NextResponse.redirect(new URL('/verify-email', request.url));
    }
    if (pathname === '/sign-in' || pathname === '/sign-up') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (pathname !== '/sign-in' && pathname !== '/sign-up') {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  return NextResponse.next();
}
export const config = {
  runtime: 'nodejs',
  matcher: ['/', '/sign-in', '/sign-up'], // Apply middleware to specific routes
};
