'use client';

import { EB_Garamond, Spectral } from 'next/font/google';
import { Navigation } from '@/components/fork-your-story/Navigation';
import { Footer } from '@/components/fork-your-story/Footer';
import { Toaster } from '@/components/fork-your-story/Toast';
import { AuthProvider } from '@/contexts/AuthContext';

const ebGaramond = EB_Garamond({
  variable: '--font-eb-garamond',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

const spectral = Spectral({
  variable: '--font-spectral',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400'],
  style: ['normal', 'italic'],
});

export default function ForkYourStoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className={`${ebGaramond.variable} ${spectral.variable} fork-story-theme min-h-screen flex flex-col noise-overlay`}>
        <Navigation />
        <main className="flex-1 pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
        <Toaster />
      </div>
    </AuthProvider>
  );
}
