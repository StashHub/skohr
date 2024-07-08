import { type NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { type Adapter } from 'next-auth/adapters';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
import { NextResponse } from 'next/server';

import { activation, signin } from '@skohr/lib/constants';
import Signin from '@skohr/transact/emails/signin';
import Activation from '@skohr/transact/emails/activation';

import { env } from '../../env';
import { prisma } from '@skohr/db';
import { v4 as uuid } from 'uuid';
import { resend } from '@skohr/lib/resend';

/**
 * Configuration options for NextAuth.js.
 * These options are used to set up adapters, providers, callbacks, and more.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig: NextAuthConfig = {
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: env.AUTH_SECRET,
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
    Resend({
      from: env.EMAIL_FROM,
      sendVerificationRequest: async (params: {
        identifier: string;
        url: string;
        provider: { from: string };
      }) => {
        const user = await prisma.user.findUnique({
          where: { email: params.identifier },
          select: { emailVerified: true },
        });

        const verified = user?.emailVerified;
        const template = verified
          ? Signin({ path: params.url })
          : Activation({ path: params.url });

        const { data, error } = await resend.emails.send({
          from: params.provider.from,
          to: params.identifier,
          subject: verified ? signin : activation,
          react: template!,
          headers: { 'X-Entity-Ref-ID': uuid() },
        });

        console.log(data?.id);
        if (error) throw new Error(error.message);
      },
    }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
    authorized: async ({ request, auth }) => {
      if (request.method == 'POST') {
        const { authToken } = (await request.json()) ?? {};
        // If the request has a valid auth token, it is authorized
        // TODO: validate auth token
        // const valid = await validateAuthToken(authToken)
        if (authToken) return true;
        return NextResponse.json('Invalid auth token', { status: 401 });
      }
      // Authenticated, otherwise redirect to signin page
      return !!auth?.user;
    },
  },
  pages: {
    signIn: '/signin',
  },
  events: {
    signIn: async ({ user, isNewUser }) => {
      if (isNewUser) {
        // Retrieve audiences from resend
        const { data: audiences, error } = await resend.audiences.list();
        if (!audiences || error) {
          console.log('no audiences found', error);
          return;
        }
        // Retrieve audience
        const audience = audiences.data.find(
          (audience: { id: string }) => audience.id === env.RESEND_AUDIENCE_ID
        );
        const { data: contact, error: contactError } =
          await resend.contacts.create({
            audienceId: audience!.id,
            email: user.email!,
            unsubscribed: false,
          });
        if (contactError) {
          console.log('failed to create contact');
        }
        console.log('contact created 🎉', contact?.id);
      }
    },
  },
  logger: {
    debug: (code, metadata) => {
      console.log(code, metadata);
    },
  },
};
