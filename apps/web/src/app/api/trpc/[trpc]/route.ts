import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';
import { appRouter, createTRPCContext } from '@skohr/api';
import { auth } from '@skohr/auth';
import { env } from '@/env';

export const runtime = 'edge';

/**
 * Configure basic CORS headers
 * You should extend to match our needs
 */
const setCorsHeaders = (res: Response) => {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Request-Method', '*');
  res.headers.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.headers.set('Access-Control-Allow-Headers', '*');
};

export const OPTIONS = () => {
  const response = new Response(null, {
    status: 204,
  });
  setCorsHeaders(response);
  return response;
};

/**
 * Handles incoming HTTP requests, processing them using tRPC API.
 * @param req - Next.js request object
 * @returns Promise resolving to tRPC API response
 */
const handler = auth(async (req: any) => {
  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () =>
      createTRPCContext({
        session: req.auth,
        headers: req.headers,
      }),
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

  setCorsHeaders(response);
  return response;
});

export { handler as GET, handler as POST };
