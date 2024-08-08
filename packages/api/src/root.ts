import { createTRPCRouter, publicProcedure } from './trpc';
import { roomRouter } from './routers/room';

/**
 * Create the main tRPC router for the application.
 *
 * This router includes various procedures and sub-routers to define the API.
 *
 * @params The sub-routers
 * @returns The tRPC router for the application.
 */
export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(() => 'Yay! 🎉'),
  room: roomRouter,
});

export type AppRouter = typeof appRouter;
