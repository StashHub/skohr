import { type DefaultSession } from 'next-auth';

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
