import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';

import { env } from '@/env';
import { appRouter } from '@/server/api/root';
import { createTRPCContext } from '@/server/api/trpc';

/**
 * Wraps `createTRPCContext` to provide context for tRPC API on HTTP request.
 * @param req - Next.js request object
 * @returns Promise resolving to tRPC context
 */
const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};

/**
 * Handles incoming HTTP requests, processing them using tRPC API.
 * @param req - Next.js request object
 * @returns Promise resolving to tRPC API response
 */
const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
            );
          }
        : ({ error }) => {
            if (error.code == 'INTERNAL_SERVER_ERROR') {
              // send to bug reporting
              console.log('Something went wrong', error);
            }
          },
  });

export { handler as GET, handler as POST };
