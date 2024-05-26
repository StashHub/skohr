'use client';

import * as React from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';

import { type NavMenuItem } from '@repo/types';
import { cn } from '@repo/utils/cn';
import { Icons } from '@ui/components/ui/icons';
import { MobileNav } from '@ui/components/mobile-nav';
import { type PropsWithChildren, useState } from 'react';
import { Button } from '@ui/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@skohr/ui/components/ui/navigation-menu';

type MainNavProps = PropsWithChildren & {
  items?: NavMenuItem[];
};

export function MainNav({ items = [], children }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const segment = useSelectedLayoutSegment();

  return (
    <div className='flex flex-1 justify-between gap-6 md:gap-10'>
      <Link href='/' className='flex items-center space-x-2'>
        <Icons.logo />
        <span className='hidden font-bold sm:inline-block'>SKOHR</span>
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          {items.map((item, index) => (
            <NavigationMenuItem key={index}>
              {item.subItems?.length ? (
                <>
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                      {item.subItems.map((subItem, subIndex) => (
                        <ListItem
                          key={subIndex}
                          title={subItem.title}
                          external={subItem.external}
                          href={subItem.href}>
                          {subItem.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <Link
                  href={item.href!}
                  className={cn(
                    'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline',
                    item.disabled && 'cursor-not-allowed opacity-60',
                    segment === item.href
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground'
                  )}
                  target={item.external ? '_blank' : ''}
                  rel={item.external ? 'noreferrer' : ''}
                  legacyBehavior
                  passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.title}
                    {item.label && (
                      <span className='text-foreground ml-2 rounded-lg bg-lime-300 px-1.5 py-1 text-xs leading-none no-underline group-hover:no-underline'>
                        {item.label}
                      </span>
                    )}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile menu toggle button */}
      <Button
        className='text-muted-foreground flex items-center space-x-2 md:hidden'
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        aria-label='menu'
        variant='ghost'>
        <Icons.menu />
      </Button>
      {showMobileMenu && <MobileNav items={items}>{children}</MobileNav>}
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { external?: boolean }
>(({ className, title, children, external, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
            className
          )}
          {...props}>
          <div className=' flex items-center space-x-1'>
            <div className='text-sm font-medium leading-none'>{title}</div>
            {external && (
              <Icons.arrowUpRight className='h-4 w-4 transform transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
            )}
          </div>
          <p className='text-muted-foreground/95 line-clamp-2 text-xs font-normal leading-snug'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
