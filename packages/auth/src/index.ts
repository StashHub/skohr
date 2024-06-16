import NextAuth from 'next-auth';
import { authOptions } from './config';

export type { Session } from 'next-auth';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);
