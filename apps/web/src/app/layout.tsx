import '@repo/ui/styles.css';

// import { TRPCReactProvider } from '@/trpc/react';
import { Inter } from 'next/font/google';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';
import { type PropsWithChildren } from 'react';
import { Toaster } from '@repo/ui/components/ui/toaster';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ['ai', 'document', 'chat'],
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@oasis',
  },
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body className={`font-sans ${fontSans.variable}`}>
        {/* <TRPCReactProvider>{children}</TRPCReactProvider> */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
