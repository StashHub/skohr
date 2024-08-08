import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import { appRouter, type AppRouter } from './root';
import { createCallerFactory, createTRPCContext } from './trpc';

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const response = await trpc.room.all();
 *       ^? Room[]
 */
const createCaller = createCallerFactory(appRouter);

/**
 * Inference helper for inputs.
 * @example type HelloInput = RouterInputs['example']['hello']
 */
type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
type RouterOutputs = inferRouterOutputs<AppRouter>;

export { createTRPCContext, appRouter, createCaller };
export type { AppRouter, RouterInputs, RouterOutputs };
