import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id ? String(user.id) : undefined;
        token.role = (user as any).role ? String((user as any).role) : 'user';
        token.enrolledCourses = Array.isArray((user as any).enrolledCourses)
          ? Array.from((user as any).enrolledCourses).map((c) => String(c))
          : [];
        token.purchasedDigital = Array.isArray((user as any).purchasedDigital)
          ? Array.from((user as any).purchasedDigital).map((d) => String(d))
          : [];
      }
      if (trigger === 'update' && session) {
        if (session.enrolledCourses) {
          token.enrolledCourses = Array.isArray(session.enrolledCourses)
            ? Array.from(session.enrolledCourses).map((c) => String(c))
            : [];
        }
        if (session.purchasedDigital) {
          token.purchasedDigital = Array.isArray(session.purchasedDigital)
            ? Array.from(session.purchasedDigital).map((d) => String(d))
            : [];
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id ? String(token.id) : '';
        (session.user as any).role = token.role ? String(token.role) : 'user';
        (session.user as any).enrolledCourses = Array.isArray(token.enrolledCourses)
          ? Array.from(token.enrolledCourses).map((c) => String(c))
          : [];
        (session.user as any).purchasedDigital = Array.isArray(token.purchasedDigital)
          ? Array.from(token.purchasedDigital).map((d) => String(d))
          : [];
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
