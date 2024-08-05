import { Resend } from 'resend';

export const resend = new Resend(String(process.env.AUTH_RESEND_KEY));
