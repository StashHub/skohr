import { type Metadata } from 'next';
import SignInContainer from './_components/signin-container';

export const metadata: Metadata = {
  title: 'Signin',
  description: 'Sign in to your account',
};

export default function Signin() {
  return <SignInContainer />;
}
