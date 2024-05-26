import 'server-only';

import { headers } from 'next/headers';
import { cache } from 'react';

import { auth } from '@skohr/auth';
import { createCaller, createTRPCContext } from '@skohr/api';

// Create a cached tRPC context for React Server Components
const createContext = cache(async () => {
  const heads = new Headers(headers());
  heads.set('x-trpc-source', 'rsc');

  return createTRPCContext({
    session: await auth(),
    headers: heads,
  });
});

export const api = createCaller(createContext);
