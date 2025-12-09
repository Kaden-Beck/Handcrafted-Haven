// 'use client';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
// import { Toaster } from 'sonner';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { auth } from '@/lib/auth';
import { SessionProvider } from 'next-auth/react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Handcrafted Haven',
  description: 'Handcrafted goods for every room.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased p-3`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
    </SessionProvider>
  );
}
