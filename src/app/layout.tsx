import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const emilioLight = localFont({
  src: [
    {
      path: "../../public/fonts/EmilioLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/EmilioLight.woff",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-emilio",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mirret.co.uk"),
  title: {
    default: "Mirret — AI-Native External Attack Surface Management",
    template: "%s | Mirret",
  },
  description:
    "Mirret delivers AI-native external attack surface management that detects brand impersonation, verifies threats, and enforces takedowns at scale.",
  keywords: [
    "attack surface management",
    "brand impersonation",
    "cybersecurity",
    "EASM",
    "domain monitoring",
    "takedown",
    "brand protection",
  ],
  authors: [{ name: "Mirret Ltd." }],
  icons: {
    icon: "/seo/favicon.svg",
    apple: "/seo/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://mirret.co.uk",
    siteName: "Mirret",
    title: "Mirret — AI-Native External Attack Surface Management",
    description:
      "Detect brand impersonation, verify threats, and enforce takedowns at scale.",
    images: [
      {
        url: "/seo/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mirret — Surface Monitor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mirret — AI-Native External Attack Surface Management",
    description:
      "Detect brand impersonation, verify threats, and enforce takedowns at scale.",
    images: ["/seo/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${emilioLight.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0f0e0d] text-white">
        {children}
      </body>
    </html>
  );
}
