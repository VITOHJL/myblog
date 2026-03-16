import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import TopNav from "./components/top-nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Studio",
  description: "Personal blog & portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative overflow-hidden bg-white antialiased`}
      >
        <div aria-hidden className="global-ambient" />
        <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
          <nav className="flex h-16 w-full items-center justify-between px-6 sm:px-8 lg:px-12">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-sky-500" />
              <span className="text-sm font-semibold tracking-[0.16em] text-slate-900">
                VITOHJL
              </span>
            </div>
            <TopNav />
          </nav>
        </header>
        <main className="relative z-10 h-screen pt-16">{children}</main>
      </body>
    </html>
  );
}
