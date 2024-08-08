import { z } from 'zod';

export const join = z.object({
  name: z.string().optional().describe(`The name associated with the guest`),
  link: z.string().min(1).describe(`A meeting link address`),
});

export const invite = z.object({
  email: z.string().refine((value) => /\S+@\S+\.\S+/.test(value), {
    message: 'Please enter a valid email address',
  }),
});
