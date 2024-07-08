import NextAuth from 'next-auth';
import { authConfig } from '@skohr/auth';
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from '@skohr/auth/routes';
import { NextResponse } from 'next/server';

// TODO: leave here until we decide on prisma accelerate.
const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isPublicRoute && isAuthenticated)
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

  if (!isAuthenticated && !isPublicRoute) {
    const from = nextUrl.search ? `${pathname}${nextUrl.search}` : pathname;
    return NextResponse.redirect(
      new URL(`${ROOT}?o=${encodeURIComponent(from)}`, nextUrl)
    );
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
