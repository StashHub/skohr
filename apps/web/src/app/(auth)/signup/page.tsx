import { type Metadata } from 'next';
import Link from 'next/link';

import Image from 'next/image';
import { buttonVariants } from '@skohr/ui/components/ui/button';
import { UserAuthForm } from '@skohr/ui/components/user-auth-form';
import { Icons } from '@skohr/ui/components/ui/icons';
import { cn } from '@skohr/utils';

export const metadata: Metadata = {
  title: 'Signup',
  description: 'Create an account to get started',
};

export default function Signup() {
  return (
    <div className='container grid h-screen w-screen flex-col items-center justify-center xl:max-w-none xl:grid-cols-2 xl:px-0'>
      <Link
        href='/signin'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}>
        Login
      </Link>
      <div className='bg-muted relative hidden h-full flex-col p-10 xl:flex dark:border-r'>
        <div className='absolute inset-0 bg-gradient-to-t from-teal-400 to-lime-300' />
        <div className='relative z-20 mb-auto flex items-center text-lg font-medium'>
          <Link href='/' className='hidden items-center space-x-2 md:flex'>
            <Icons.logo className='mr-2 h-10 w-10' />
          </Link>
        </div>
        <div className='relative z-20 mb-auto mt-auto -translate-x-24 transform xl:scale-125'>
          <Image
            property='blur'
            src={`/dashboard.png`}
            alt='hero'
            height={1280}
            width={2048}
            className='rounded-2xl object-cover object-left-top'
            draggable={false}
          />
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-md'>
              &ldquo;The recruitment process has undergone a complete
              turnaround. It&apos;s now a breeze to schedule interviews,
              communicate with candidates, and handle everything in
              between.&rdquo;
            </p>
            <footer className='text-xs'>Emily Johnson</footer>
          </blockquote>
        </div>
      </div>
      <div className='xl:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Let&apos;s get started!
            </h1>
            <p className='text-muted-foreground text-sm'>
              Please confirm your email to continue
            </p>
          </div>
          <UserAuthForm sso={false} />
          <p className='text-muted-foreground px-8 text-center text-xs'>
            By clicking continue, you agree to our{' '}
            <Link
              href='/terms'
              className='hover:text-primary underline underline-offset-4'>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy'
              className='hover:text-primary underline underline-offset-4'>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
