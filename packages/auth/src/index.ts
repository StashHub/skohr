import NextAuth from 'next-auth';
import { authConfig } from './lib/config';

export type { Session } from 'next-auth';
export { authConfig } from './lib/config';
export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
