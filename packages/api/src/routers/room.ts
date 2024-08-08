import { createTRPCRouter, authProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { hms, HMS } from '../utils/hms';

export const roomRouter = createTRPCRouter({
  create: authProcedure.input(z.string().uuid()).mutation(async ({ ctx }) => {
    return ctx.session.user.id;
  }),
});
