import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

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

/**
 * Initializes the tRPC API, connecting the context and transformer, and parsing
 * ZodErrors for type safety
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Create a server-side caller.
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * Create new routers and sub-routers in the tRPC API.
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Base component for building public (unauthenticated) queries and mutations on the tRPC API.
 * Access to user session data is still available if the user is logged in.
 */
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

/**
 * Component for building protected (authenticated) queries and mutations on the tRPC API.
 * Verifies session validity and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const authProcedure = t.procedure.use(enforceUserIsAuthed);
