import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { cn } from "@/lib/utils";
import QueryProvider from "@/components/query-provider";

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
  title: "Better Faster",
  description: "Practicing my way to category one",
};

const maxWidth = "max-w-7xl";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-svh flex-col justify-between gap-8">
          <div className="flex flex-col gap-8">
            <Header maxWidth={maxWidth} />
            <div className="px-3">
              <div
                className={cn("mx-auto flex w-full flex-col gap-4", maxWidth)}
              >
                <QueryProvider>{children}</QueryProvider>
              </div>
            </div>
          </div>
          <Footer maxWidth={maxWidth} />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
