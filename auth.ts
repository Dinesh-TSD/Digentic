import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import Credentials from 'next-auth/providers/credentials';
import clientPromise from '@/lib/mongodb';
import connectToDatabase from '@/lib/mongoose';
import { User } from '@/models/User';
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
        const tempAdminEmail = (
          process.env.TEMP_ADMIN_EMAIL || 'admin@digentic.tech'
        )
          .toLowerCase()
          .trim();
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
          await connectToDatabase();
          const user = await User.findOne({ email });

          if (!user || !user.password) {
            return null;
          }

          const isValid = await user.comparePassword(password);
          if (!isValid) {
            return null;
          }

          const enrolledCourses: string[] = Array.isArray(user.enrolledCourses)
            ? Array.from(user.enrolledCourses).map((c) => String(c))
            : [];
          const purchasedDigital: string[] = Array.isArray(user.purchasedDigital)
            ? Array.from(user.purchasedDigital).map((d) => String(d))
            : [];

          return {
            id: user._id.toString(),
            name: String(user.name || user.email.split('@')[0]),
            email: String(user.email),
            image: user.image ? String(user.image) : null,
            role: String(user.role || 'user'),
            enrolledCourses,
            purchasedDigital,
          };
        } catch (error) {
          console.error('Error authorizing credentials user with Mongoose:', error);
          return null;
        }
      },
    }),
  ],
});
