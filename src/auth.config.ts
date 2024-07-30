import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { userServices } from '@/services';
import { AccessUser } from '@/types';

export default {
  providers: [
    Credentials({
      credentials: {
        email: { type: 'string' },
        password: { type: 'password' },
      },
      authorize: async (credentials) => {
        const user = await userServices.LoginUser(credentials as AccessUser);

        if (!user.userData && user.code === 404) {
          throw new Error(user.message);
        }

        return user.userData;
      },
    }),
  ],
} satisfies NextAuthConfig;
