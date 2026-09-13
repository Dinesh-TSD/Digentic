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
        token.id = user.id;
        token.role = (user as any).role || 'user';
        token.enrolledCourses = (user as any).enrolledCourses || [];
        token.purchasedDigital = (user as any).purchasedDigital || [];
      }
      if (trigger === 'update' && session) {
        if (session.enrolledCourses) token.enrolledCourses = session.enrolledCourses;
        if (session.purchasedDigital) token.purchasedDigital = session.purchasedDigital;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role || 'user';
        (session.user as any).enrolledCourses = token.enrolledCourses || [];
        (session.user as any).purchasedDigital = token.purchasedDigital || [];
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
