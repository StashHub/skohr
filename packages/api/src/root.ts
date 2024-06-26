import { postRouter } from './routers/post.ts';
import { createTRPCRouter } from './trpc';

/**
 * Create the main tRPC router for the application.
 *
 * This router includes various procedures and sub-routers to define the API.
 *
 * @params The sub-routers
 * @returns The tRPC router for the application.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
});

export type AppRouter = typeof appRouter;
