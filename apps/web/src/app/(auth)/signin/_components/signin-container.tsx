'use client';

import Link from 'next/link';
import { buttonVariants } from '@skohr/ui/components/ui/button';
import { Icons } from '@skohr/ui/components/ui/icons';
import { UserAuthForm } from '@skohr/ui/components/user-auth-form';
import { useState } from 'react';
import { cn } from '@skohr/utils';

const SignInContainer = () => {
  const [sso, setSso] = useState(false);

  return (
    <div className='to-background flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-t from-amber-50 px-16 md:px-0'>
      <Link
        href='/'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-8 md:top-8'
        )}>
        <>
          <Icons.chevronLeft className='mr-2 h-4 w-4' />
          Back
        </>
      </Link>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col text-center'>
          <Link href='/' className='hidden items-center space-x-2 md:flex'>
            <Icons.logo className='mx-auto h-12 w-12' />
          </Link>
          <h1 className='mb-2 mt-8 text-xl font-semibold tracking-tight'>
            Welcome back
          </h1>
          <p className='text-muted-foreground mb-4 text-sm'>
            {sso ? (
              <>
                Please confirm your email to continue with SSO or <br />
                <span
                  className='hover:text-foreground cursor-pointer underline'
                  onClick={() => setSso(false)}>
                  continue with email
                </span>
              </>
            ) : (
              <>
                Please confirm your email to continue or <br />
                <span
                  className='hover:text-foreground cursor-pointer underline'
                  onClick={() => setSso(true)}>
                  continue with SAML SSO
                </span>
              </>
            )}
          </p>
        </div>
        <UserAuthForm sso={sso} />
        <p className='text-muted-foreground px-8 text-center text-sm'>
          <Link href='/signup' className=''>
            <span className='cursor-default'>Not a member? </span>
            <span className='text-gray-600 underline underline-offset-4'>
              Start a 14-day free trial!
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInContainer;
