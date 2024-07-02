import NextAuth from 'next-auth';
import { authOptions } from './config';

export type { Session } from 'next-auth';
export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
