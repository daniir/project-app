import NextAuth from 'next-auth';
import authConfig from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub!!;
      session.user.email = token.email!!;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
