'use client';

import { z } from 'zod';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signin, google } from '@skohr/auth/actions';

import { Icons } from '@ui/components/ui/icons';
import { Button } from '@ui/components/ui/button';
import { Input } from '@ui/components/ui/input';
import { Label } from '@ui/components/ui/label';
import { toast } from '@ui/components/ui/use-toast';
import { cn } from '@skohr/utils';

const Schema = z.object({
  email: z.string().email(),
});

type FormData = z.infer<typeof Schema>;
type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement> & {
  sso: boolean;
};

export function UserAuthForm({ sso, className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOauthLoading, setIsOauthLoading] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('o') ?? '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
  });

  async function onSubmit(data: FormData): Promise<void> {
    setIsLoading(true);

    const response = await signin(data.email, callbackUrl);
    setIsLoading(false);

    if (!response?.ok) {
      toast({
        title: 'Something went wrong.',
        description: 'Your sign in request failed. Please try again.',
        variant: 'destructive',
      });
    }

    toast({
      title: 'Check your email',
      description: 'We sent you a login link. Be sure to check your spam too.',
    });
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-4'>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='email'>
              Email
            </Label>
            <Input
              id='email'
              placeholder='Enter email address'
              type='email'
              className='rounded-full py-4'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              disabled={isLoading || isOauthLoading}
              {...register('email', {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors?.email && (
              <p className='px-1 text-xs text-red-600'>
                {errors.email.message}
              </p>
            )}
          </div>
          <Button disabled={isLoading || !isValid} className='font-normal'>
            {isLoading && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )}
            {sso ? 'Continue with SSO' : 'Continue'}
          </Button>
        </div>
      </form>
      <div className='relative flex items-center'>
        <div className='flex-grow border-t' />{' '}
        <div className='relative flex justify-center text-sm'>
          <span className='text-muted-foreground bg-transparent px-2'>or</span>
        </div>
        <div className='flex-grow border-t' />
      </div>
      <Button
        variant='outline'
        type='button'
        onClick={() => {
          setIsOauthLoading(true);
          google(callbackUrl)
            .then(() => {
              setIsOauthLoading(false);
            })
            .catch((error) => console.log(error));
        }}
        disabled={isLoading || isOauthLoading}>
        {isOauthLoading ? (
          <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          <Icons.google className='mr-2 h-4 w-4' />
        )}{' '}
        Continue with Google
      </Button>
    </div>
  );
}
