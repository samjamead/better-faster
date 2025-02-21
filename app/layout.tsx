import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import Footer from "@/components/footer/footer";
import QueryProvider from "@/components/query-provider";
import { Inter, Inconsolata } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
});

export const metadata: Metadata = {
  title: "Better Faster",
  description: "Practicing my way to category one",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${inconsolata.variable} h-full antialiased`}
      >
        <div className="flex min-h-svh flex-col">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <div className="flex-1 p-8">
                <QueryProvider>{children}</QueryProvider>
              </div>
              <Footer />
            </div>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
