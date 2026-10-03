import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const inter = localFont({ src: "./fonts/inter-latin-wght-normal.woff2", variable: "--font-inter", display: "swap", weight: "100 900" });
const fraunces = localFont({ src: "./fonts/fraunces-latin-wght-normal.woff2", variable: "--font-fraunces", display: "swap", weight: "100 900" });

export const metadata: Metadata = {
  title: { default: "Southbay Property Experience — Concept by DeenTech", template: "%s | Southbay Concept" },
  description: "An independent DeenTech concept exploring property discovery, presentation, enquiry conversion and property intelligence. Demo data only.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="focus:outline-none">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
