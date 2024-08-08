import { prisma } from '@skohr/db';
import type { Session } from '@skohr/auth';

interface CreateContextOptions {
  session: Session | null;
}

interface TRPCContextOptions extends CreateContextOptions {
  headers: Headers;
}

// Useful for testing when we don't want to mock Next.js' request/response
export async function createContextInner({ session }: CreateContextOptions) {
  return { session, prisma };
}

/**
 * Defines the 'contexts' available in the backend API, allowing access to resources like
 * the database and session. Generates the 'internals' for a tRPC context, wrapped by the
 * API handler and RSC clients.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: TRPCContextOptions) => {
  const session = opts.session;
  const source = opts.headers.get('x-trpc-source') ?? 'unknown';
  console.log('tRPC request:', source, 'by', session?.user);

  return createContextInner({ session });
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
