import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ScrollRevealHandler } from "@/components/ui/scroll-reveal-handler";
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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased min-h-screen bg-background text-foreground">
        {children}
        <Toaster />
        <ScrollRevealHandler />
      </body>
    </html>
  );
}
