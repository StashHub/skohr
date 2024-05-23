import * as React from 'react';
import Link from 'next/link';

import { type NavItem } from '@repo/types';
import { cn } from '@repo/utils/cn';
import { useLockBody } from '@ui/hooks/use-lock-body';
import { Icons } from '@repo/ui/components/ui/icons';

type MobileNavProps = React.PropsWithChildren & {
  items: NavItem[];
};

export function MobileNav({ items, children }: MobileNavProps) {
  useLockBody();

  return (
    <div
      className={cn(
        'fixed inset-x-0 top-0 z-50 max-h-screen origin-top-right scale-100 transform overflow-auto p-2 opacity-100 transition md:hidden'
      )}>
      <div className='divide-muted/30 bg-popover text-popover-foreground divide-y-2 rounded-lg shadow-lg'>
        <div className='px-5 pb-6 pt-5'>
          <div className='flex items-start justify-between px-2'>
            <Link
              href='/'
              className='flex items-center space-x-2'
              aria-label='logo'>
              <Icons.logo />
            </Link>
            <div className='-mr-2'>
              <Icons.close />
            </div>
          </div>

          <div className='-mx-2 mt-4'>
            <nav className='grid grid-flow-row auto-rows-max text-sm'>
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.disabled ? '#' : item.href!}
                  className={cn(
                    'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                    item.disabled && 'cursor-not-allowed opacity-60'
                  )}>
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className='py-6 pl-5 pr-5'></div>
        {children}
      </div>
    </div>
  );
}
