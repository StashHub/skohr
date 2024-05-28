import { type DefaultSession, NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { type Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider, {
  type NodemailerConfig,
} from 'next-auth/providers/nodemailer';

import { activation, signin } from '@skohr/lib/constants';
// import Signin from '@/components/emails/signin';
// import Activation from '@/components/emails/activation';

import { env } from '@/env';
import { prisma } from '@skohr/db';
import { v4 as uuid } from 'uuid';
import { resend } from '@skohr/lib/resend';

/**
 * Augment the `next-auth` module to add custom properties to the session object.
 * This allows us to maintain type safety while extending the session object.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      id: string;
      // ...other properties
    };
  }
}

/**
 * Configuration options for NextAuth.js.
 * These options are used to set up adapters, providers, callbacks, and more.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthConfig = {
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      from: env.RESEND_FROM,
      sendVerificationRequest: async (params: {
        identifier: string;
        provider: NodemailerConfig;
        url: string;
      }) => {
        const user = await prisma.user.findUnique({
          where: { email: params.identifier },
          select: { emailVerified: true },
        });

        const verified = user?.emailVerified;
        // const template = verified
        //   ? Signin({ path: params.url })
        //   : Activation({ path: params.url });

        const { data, error } = await resend.emails.send({
          from: params.provider.from,
          to: params.identifier,
          subject: verified ? signin : activation,
          react: '', // add template
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
