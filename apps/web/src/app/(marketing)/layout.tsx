import Link from 'next/link';
import { buttonVariants } from '@repo/ui/components/ui/button';
import { MainNav } from '@repo/ui/components/main-nav';
import { marketing } from '../../config/marketing';
import { type PropsWithChildren } from 'react';
import { Icons } from '@repo/ui/components/ui/icons';
import { cn } from '@repo/utils/cn';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className='flex min-h-screen flex-col justify-between'>
        <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 h-[56px] backdrop-blur'>
          <div className='mx-auto flex h-[56px] max-w-7xl items-center justify-between px-4 sm:px-6 sm:py-0 md:space-x-2'>
            <MainNav items={marketing} />
            <nav>
              <div className='hidden flex-shrink items-center md:flex'>
                <Link
                  href='/signin'
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'sm' }),
                    'mr-2 px-4 hover:bg-transparent'
                  )}>
                  Signin
                </Link>
                <Link
                  href='/signup'
                  className={cn(
                    buttonVariants({ variant: 'default', size: 'sm' }),
                    'group px-4'
                  )}>
                  Try for Free
                  <Icons.chevronRight className='ml-1 h-4 w-4 transform transition-transform duration-500 group-hover:translate-x-1' />
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <main className='flex-1'>{children}</main>
      </div>
    </>
  );
}
