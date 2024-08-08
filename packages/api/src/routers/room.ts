import { createTRPCRouter, authProcedure } from '../trpc';
import { z } from 'zod';

export const roomRouter = createTRPCRouter({
  create: authProcedure.input(z.string().uuid()).mutation(async ({ ctx }) => {
    return ctx.session.user.id;
  }),
});
