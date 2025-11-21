import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Credentials({
      // NOTE: This is a placeholder implementation. Replace with real validation.
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const email = String(credentials?.email || '').trim();
        const password = String(credentials?.password || '');
        if (!email || !password) return null;
        // INSECURE stub user object. Replace with DB lookup + hashed password check.
        return { id: email, email };
      },
    }),
  ],
});
