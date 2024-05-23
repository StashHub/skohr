import Announcement from '@repo/ui/components/announcement';
import { ContainerScroll } from '@repo/ui/components/container-scroll';
import {
  Actions,
  Header,
  Description,
  Heading,
} from '@repo/ui/components/page-header';
import { buttonVariants } from '@repo/ui/components/ui/button';
import { Icons } from '@repo/ui/components/ui/icons';
import { cn } from '@repo/shared-utils/cn';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <section className='to-background flex flex-col overflow-hidden bg-gradient-to-t from-amber-100'>
      <ContainerScroll
        titleComponent={
          <>
            <Header>
              <Announcement
                className='rounded-full bg-gradient-to-r from-teal-100 to-rose-100 py-2.5'
                name='brain'
                href='/features/ai'
                titleComponent={
                  <span className='inline'>
                    Supercharged with the power of{' '}
                    <span className='font-semibold uppercase'>AI</span>
                  </span>
                }
              />
              <Heading>
                <span className=' text-blue-950'>
                  Score top talent{' '}
                  <span className='bg-gradient-to-r from-teal-500 to-lime-500 bg-clip-text text-transparent'>
                    10X
                  </span>{' '}
                  faster
                </span>
              </Heading>
              <Description>
                Plan, conduct, analyze, and optimize your interview processes
                without any heavy lifting. Experience the evolution of
                interviewing.
              </Description>
              <Actions>
                <Link
                  href='/signup'
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'w-full md:w-auto'
                  )}>
                  Get Started
                </Link>
                <Link
                  href='/docs'
                  className={cn(
                    buttonVariants({ variant: 'link', size: 'lg' }),
                    'w-full gap-1.5 px-2 md:w-auto'
                  )}>
                  <Icons.playCircle className='h-5 w-5' />
                  Watch Demo
                </Link>
              </Actions>
            </Header>
          </>
        }>
        <Image
          src={`/dashboard.png`}
          alt='hero'
          height={1280}
          width={2048}
          className='mx-auto h-full rounded-2xl object-cover object-left-top'
          draggable={false}
        />
      </ContainerScroll>
    </section>
  );
}
