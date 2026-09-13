import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const isLoggedIn = !!session?.user;

  // 1. Dashboard routes: /dashboard or /dashboard/*
  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
    if (!isLoggedIn) {
      const loginUrl = new URL('/auth/login', req.nextUrl.origin);
      loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 2. Course learn routes: /courses/:id/learn or /courses/:id/learn/*
  const courseLearnMatch = pathname.match(/^\/courses\/([^/]+)\/learn(\/.*)?$/);
  if (courseLearnMatch) {
    if (!isLoggedIn) {
      const loginUrl = new URL('/auth/login', req.nextUrl.origin);
      loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    const courseId = courseLearnMatch[1];
    const userRole = (session?.user as any)?.role;
    const enrolledCourses: string[] = (session?.user as any)?.enrolledCourses || [];

    const isEnrolled = userRole === 'admin' || enrolledCourses.includes(courseId);

    if (!isEnrolled) {
      const courseOverviewUrl = new URL(`/courses/${courseId}`, req.nextUrl.origin);
      courseOverviewUrl.searchParams.set('notice', 'enrollment_required');
      return NextResponse.redirect(courseOverviewUrl);
    }

    return NextResponse.next();
  }

  // 3. Digital download routes: /digital/download or /digital/downloads
  const digitalDownloadMatch = pathname.match(/^\/digital\/downloads?(\/.*)?$/);
  if (digitalDownloadMatch) {
    if (!isLoggedIn) {
      const loginUrl = new URL('/auth/login', req.nextUrl.origin);
      loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    const userRole = (session?.user as any)?.role;
    const purchasedDigital: string[] = (session?.user as any)?.purchasedDigital || [];

    const productSlug = digitalDownloadMatch[1]?.replace(/^\//, '');
    if (productSlug && productSlug.length > 0) {
      const hasPurchased = userRole === 'admin' || purchasedDigital.includes(productSlug);
      if (!hasPurchased) {
        const productUrl = new URL(`/digital/${productSlug}`, req.nextUrl.origin);
        productUrl.searchParams.set('notice', 'purchase_required');
        return NextResponse.redirect(productUrl);
      }
    } else {
      if (userRole !== 'admin' && purchasedDigital.length === 0) {
        const productsUrl = new URL('/digital', req.nextUrl.origin);
        productsUrl.searchParams.set('notice', 'purchase_required');
        return NextResponse.redirect(productsUrl);
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/courses/:id/learn/:path*',
    '/courses/:id/learn',
    '/digital/download/:path*',
    '/digital/download',
    '/digital/downloads/:path*',
    '/digital/downloads',
    '/dashboard/:path*',
    '/dashboard',
  ],
};
