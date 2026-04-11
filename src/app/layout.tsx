import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ScrollRevealHandler } from "@/components/ui/scroll-reveal-handler";
import { LanguageProvider } from '@/context/LanguageContext';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FluxLocatif - Optimisation locative pour propriétaires actifs',
  description: 'FluxLocatif centralise les demandes, filtre les profils pertinents et structure votre processus de location.',
  metadataBase: new URL('https://fluxlocatif.com'),
  openGraph: {
    title: 'FluxLocatif - Optimisation locative pour propriétaires actifs',
    description: 'FluxLocatif centralise les demandes, filtre les profils pertinents et structure votre processus de location.',
    url: 'https://fluxlocatif.com',
    siteName: 'FluxLocatif',
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FluxLocatif - Optimisation locative pour propriétaires actifs',
    description: 'FluxLocatif centralise les demandes, filtre les profils pertinents et structure votre processus de location.',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background text-foreground">
        <LanguageProvider>
          {children}
          <Toaster />
          <ScrollRevealHandler />
        </LanguageProvider>
      </body>
    </html>
  );
}
