import NextAuth from 'next-auth';

import { authOptions } from './option';

export type { Session } from 'next-auth';

const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);

export { GET, POST, auth, signIn, signOut };
