import Link from 'next/link';

import { Separator } from '@/components/ui/separator';
import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

type AnnouncementProps = React.HTMLAttributes<HTMLAnchorElement> & {
  href: string;
  titleComponent: string | React.ReactNode;
  name: keyof typeof Icons;
};
const Announcement = ({
  titleComponent,
  href,
  name,
  className,
  ...props
}: AnnouncementProps) => {
  const Icon = Icons[name];
  return (
    <Link
      href={href}
      className={cn(
        'bg-muted inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium',
        className
      )}
      {...props}>
      <Icon className={cn('h-5 w-5')} />{' '}
      <Separator
        className='border-muted-foreground/30 mx-2 h-4 border-[0.1px]'
        orientation='vertical'
      />
      {titleComponent}
      <Icons.chevronRight className='ml-1 h-3 w-3' />
    </Link>
  );
};

export default Announcement;
