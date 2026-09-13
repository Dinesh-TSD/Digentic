import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import clientPromise, { getDatabase } from '@/lib/mongodb';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: 'jwt' },
  providers: [
    ...authConfig.providers,
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = (credentials.email as string).toLowerCase().trim();
        const password = credentials.password as string;

        // Temporary Admin Login for development and testing
        const tempAdminEmail = (process.env.TEMP_ADMIN_EMAIL || 'admin@digentic.tech').toLowerCase().trim();
        const tempAdminPassword = process.env.TEMP_ADMIN_PASSWORD || 'admin123';

        if (email === tempAdminEmail && password === tempAdminPassword) {
          return {
            id: 'temp-admin-id',
            name: 'DIGENTIC Admin',
            email: tempAdminEmail,
            image: null,
            role: 'admin',
            enrolledCourses: ['all'],
            purchasedDigital: ['all'],
          };
        }

        try {
          const db = await getDatabase();
          const user = await db.collection('users').findOne({ email });

          if (!user || !user.password) {
            return null;
          }

          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.name || user.email?.split('@')[0],
            email: user.email,
            image: user.image || null,
            role: user.role || 'user',
            enrolledCourses: user.enrolledCourses || [],
            purchasedDigital: user.purchasedDigital || [],
          };
        } catch (error) {
          console.error('Error authorizing credentials user:', error);
          return null;
        }
      },
    }),
  ],
});
