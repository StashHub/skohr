import Balance from 'react-wrap-balancer';

import { cn } from '@skohr/lib';

const Header = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <section
      className={cn(
        'mx-auto flex max-w-full flex-col items-center justify-center gap-6 py-8 text-center md:py-12 md:pb-8 lg:py-24 lg:pb-20',
        className
      )}
      {...props}>
      {children}
    </section>
  );
};

const Heading = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1
      className={cn(
        'max-w-4xl text-5xl font-extrabold leading-tight md:text-5xl lg:text-8xl lg:leading-[1.1]',
        className
      )}
      {...props}
    />
  );
};

const Description = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <Balance
      className={cn(
        'text-muted-foreground/90 max-w-prose text-sm leading-7 md:text-lg',
        className
      )}
      {...props}
    />
  );
};

const Actions = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center gap-4 py-4 md:flex-row',
        className
      )}
      {...props}
    />
  );
};

export { Header, Heading, Description, Actions };
