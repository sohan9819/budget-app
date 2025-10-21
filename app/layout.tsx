import { Geist, Geist_Mono } from 'next/font/google';

import { Provider } from 'jotai';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';

import type { Metadata } from 'next';

import './globals.css';

const roboto = Geist({
  variable: '--font-roboto',
  subsets: ['latin'],
});

const robotoMono = Geist_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Budget Tracker App',
  description:
    'A simple budget tracker application to manage your finances effectively.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' style={{ colorScheme: 'dark' }} suppressHydrationWarning>
      <head>
        <meta name='apple-mobile-web-app-title' content='Budget Tracker App' />
      </head>
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <Provider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </Provider>
        <Toaster position='top-right' />
      </body>
    </html>
  );
}
