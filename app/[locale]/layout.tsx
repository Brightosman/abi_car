import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl'
import {getMessages} from 'next-intl/server';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import PromotionBar from "./components/PromotionBar";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Carsivo",
  description: "Achat, Vente, Reprise toutes marques",
};

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages();
  return (
    <ClerkProvider>
      <html lang={locale}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NextIntlClientProvider messages={messages}>
            {/* <PromotionBar /> */}
            <Navbar />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
