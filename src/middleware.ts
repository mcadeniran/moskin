import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  publicNestedRoutes,
  allowedApiPrefix,
} from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAllowedApiRoute = nextUrl.pathname.startsWith(allowedApiPrefix);
  const isPublicNestedRoute = nextUrl.pathname.startsWith(publicNestedRoutes);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Should be accessible without authentication
  if (isApiAuthRoute) {
    return null;
  }

  if (isAllowedApiRoute) {
    return null;
  }

  // Should be only accessible without authentication
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  // Requires authentication to access
  if (!isLoggedIn && !isPublicRoute && !isPublicNestedRoute) {
    return Response.redirect(new URL('/login', nextUrl));
  }

  return null;
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
