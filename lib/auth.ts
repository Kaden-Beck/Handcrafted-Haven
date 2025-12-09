import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import { compare } from 'bcryptjs';
import { z } from 'zod';
import { User } from '@/prisma/generated/prisma';

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'database' },
  providers: [
    GitHub,
    Credentials({
      authorize: async (credentials) => {
        const parsed = credentialsSchema.safeParse(credentials);

        if (!parsed.success) {
          throw new Error('Invalid credentials');
        }

        const { email, password } = parsed.data;

        const user: User | null = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!user?.passwordHash) {
          throw new Error('Invalid credentials');
        }

        const isValidPassword = await compare(password, user.passwordHash);

        if (!isValidPassword) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Attach user.id to the JWT
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Expose user.id in the session object
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
});
