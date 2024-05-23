import { Icons } from '@repo/ui/components/ui/icons';

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
};

export type MenuItem = Pick<NavItem, 'title' | 'href' | 'external'> & {
  description: string;
};
export type NavMenuItem = NavItem & { subItems?: MenuItem[] };
