'use server';

import { signIn } from '@skohr/auth';

export async function signin(email: string, callbackUrl: string) {
  const response = await signIn('nodemailer', {
    email: email.toLowerCase(),
    redirect: false,
    callbackUrl: callbackUrl,
  });
  return response;
}

export async function google(callbackUrl: string) {
  return await signIn('google', { callbackUrl });
}
