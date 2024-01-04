import { User } from '@/models/user.model';
import { apiUrl } from '@/utils/constants';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const requestJson = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const response = await fetch(`${apiUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestJson),
        });

        const data = await response.json();

        if (response.ok && data) {
          return data;
        } else {
          throw new Error(
            data.message ? data.message : JSON.stringify(data.message)
          );
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      const expiresDate = new Date();
      expiresDate.setHours(expiresDate.getHours() + 1);
      session.expires = expiresDate.toISOString();
      return { ...session, user: token.user as User, token: token.token };
    },
    async jwt({ token, user, account, profile }) {
      return {
        ...user,
        ...token,
      };
    },
  },
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authConfig);
}
