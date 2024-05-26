import { z } from 'zod';
import type { TRPCRouterRecord } from '@trpc/server';
import { authProcedure, publicProcedure } from '../trpc';

export const postRouter = {
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: authProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.prisma.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: authProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findFirst({
      orderBy: { createdAt: 'desc' },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: authProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
} satisfies TRPCRouterRecord;
