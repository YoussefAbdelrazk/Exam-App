import { loginApi } from '@/lib/api/AuthApi';
import { User as AppUser } from '@/lib/types/UserType';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginSchemeType } from './lib/schems/LoginScheme';

interface AuthResponse {
  message: string;
  token: string;
  user: AppUser;
}

// Extend NextAuth types
declare module 'next-auth' {
  interface User {
    id: string;
    token?: string;
    userData?: AppUser;
  }

  interface Session {
    user: AppUser;
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    userData?: AppUser;
  }
}

const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async credentials => {
        try {
          console.log(credentials);
          const response: AuthResponse = await loginApi(credentials as LoginSchemeType);
          console.log(response);

          if ('code' in response) {
            throw new Error(response.message);
          }

          return {
            id: response.user._id,
            token: response.token,
            userData: response.user,
          };
        } catch (error: unknown) {
          console.error('Auth error:', error);
          throw new Error((error as Error).message || 'Authentication failed');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.userData = user.userData;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.userData) {
        session.user = token.userData;
      }
      return session;
    },
  },
};

export default authOptions;
