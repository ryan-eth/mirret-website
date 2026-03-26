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
  title: "Surface Monitor - Mirret",
  description:
    "Mirret delivers AI-native external attack surface management that detects brand impersonation, verifies threats, and enforces takedowns at scale.",
  icons: {
    icon: "/seo/favicon.png",
  },
  openGraph: {
    images: ["/seo/og-image.png"],
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
