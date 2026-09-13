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
    async signIn({ user, account }) {
      if (account?.provider === 'google' || account?.provider === 'github') {
        if (!user?.email) {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      const tempAdminEmail = (
        process.env.TEMP_ADMIN_EMAIL || 'admin@digentic.tech'
      )
        .toLowerCase()
        .trim();

      if (user) {
        token.id = user.id
          ? String(user.id)
          : (user as any)._id
          ? String((user as any)._id)
          : token.id;

        const isTempAdmin =
          user.email?.toLowerCase().trim() === tempAdminEmail;

        token.role = isTempAdmin
          ? 'admin'
          : (user as any).role
          ? String((user as any).role)
          : token.role || 'user';

        token.enrolledCourses = isTempAdmin
          ? ['all']
          : Array.isArray((user as any).enrolledCourses)
          ? Array.from((user as any).enrolledCourses).map((c) => String(c))
          : token.enrolledCourses || [];

        token.purchasedDigital = isTempAdmin
          ? ['all']
          : Array.isArray((user as any).purchasedDigital)
          ? Array.from((user as any).purchasedDigital).map((d) => String(d))
          : token.purchasedDigital || [];

        if (user.image) {
          token.picture = user.image;
        }
      }
      if (trigger === 'update' && session) {
        if (session.role) {
          token.role = String(session.role);
        }
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
