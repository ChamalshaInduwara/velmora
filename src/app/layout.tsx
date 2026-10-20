import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import { siteConfig } from "@/lib/site-config";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Velmora Hotel & Resort | Colombo, Sri Lanka",
    template: "%s | Velmora Hotel & Resort",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Velmora Hotel",
    "Velmora Hotel and Resort",
    "Colombo hotel",
    "Sri Lanka hotel",
    "luxury hotel Colombo",
    "hotel booking Sri Lanka",
    "Colombo resort",
    "Sri Lanka accommodation",
  ],
  authors: [
    {
      name: "Velmora Hotel & Resort",
    },
  ],
  creator: "Velmora Hotel & Resort",
  publisher: "Velmora Hotel & Resort",
  icons: {
    icon: "/images/logo/velmora-logo.png",
    apple: "/images/logo/velmora-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Velmora Hotel & Resort",
    description: siteConfig.description,
    images: [
      {
        url: "/images/hero/hero-1.jpg",
        width: 1200,
        height: 630,
        alt: "Velmora Hotel & Resort",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velmora Hotel & Resort",
    description: siteConfig.description,
    images: ["/images/hero/hero-1.jpg"],
  },
  category: "travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}