import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { NextResponse } from 'next/server';

const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  if (req.nextUrl.pathname === '/') {
    if (!req.auth?.user)
      return NextResponse.redirect(new URL('/login', req.nextUrl));

    return NextResponse.next();
  }

  if (
    req.nextUrl.pathname === '/login' ||
    req.nextUrl.pathname === '/register'
  ) {
    if (!req.auth?.user) return NextResponse.next();

    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
