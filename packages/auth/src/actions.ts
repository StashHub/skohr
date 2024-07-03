'use server';

import { signIn, signOut } from '@skohr/auth';

export async function signin(email: string, callbackUrl: string) {
  return await signIn('nodemailer', {
    email: email.toLowerCase(),
    redirect: false,
    redirectTo: callbackUrl,
  });
}

export async function google(callbackUrl: string) {
  return await signIn('google', { callbackUrl });
}

export async function logout() {
  return await signOut({ redirectTo: '/signin' });
}
