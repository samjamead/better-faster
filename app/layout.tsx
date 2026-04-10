import { Suspense } from "react";

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist_Mono, Inter, JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import QueryProvider from "@/components/query-provider";
import { cn } from "@/lib/utils";

import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "mesh-sm1x",
  description: "Something something darkside",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(inter.variable, jetbrainsMono.variable, geistMono.variable)}
    >
      <body className="px-3 antialiased md:px-6">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<div className="min-h-svh" />}>
            <QueryProvider>
              <div className="flex min-h-svh flex-col justify-between">
                <div className="flex grow flex-col">
                  <Suspense fallback={<div className="py-4" />}>
                    <Header />
                  </Suspense>
                  <div className="max-w-custom mx-auto flex w-full grow flex-col">
                    {children}
                  </div>
                </div>

                <Footer />
              </div>
            </QueryProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
