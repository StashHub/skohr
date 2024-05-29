import { type NavMenuItem } from '@skohr/types';

export const marketing: NavMenuItem[] = [
  {
    title: 'Products',
    subItems: [
      {
        title: 'Application Tracking System',
        href: '/applicant-tracking-system',
        description: 'Streamline your hiring process',
      },
      {
        title: 'Automated Scheduling',
        href: '/scheduling',
        description: 'Efficiently manage interview timelines',
      },
      {
        title: 'Live interviewing',
        href: '/interviewing',
        description: 'Engage candidates in real-time',
      },
      {
        title: 'Onboarding Solutions',
        href: '/onboarding',
        description: 'Smooth onboarding for new hires',
      },
      {
        title: 'Customizable Workflows',
        href: '/workflows',
        description: 'Customize your hiring process',
      },
      {
        title: 'Career Sites',
        href: '/sites',
        description: 'Showcase your opportunity effectively',
      },
    ],
  },
  {
    title: 'Resources',
    subItems: [
      {
        title: 'Blog',
        href: '/blog',
        description: 'Stay updated: Expert insights & trends',
      },
      {
        title: 'Slack Group',
        href: 'skohr.slack.com',
        external: true,
        description: 'Join the discussion with fellow Recruiters',
      },
      {
        title: 'Changelog',
        href: '/docs/changelog',
        description: 'Stay updated with our latest changes',
      },
      {
        title: 'Help & Support',
        href: 'support.skohr.com',
        external: true,
        description: "We're here to help",
      },
    ],
  },
  {
    title: 'Pricing',
    href: '/pricing',
  },
  {
    title: 'Documentation',
    href: '/docs',
  },
  {
    title: 'Integrations',
    href: '/integrations',
    label: 'New',
  },
];
