import type { Metadata } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IPL Oracle — AI Mind Reader",
  description:
    "Think of any IPL player from 2008 to present. The Oracle will read your mind and guess who it is in under 12 questions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${outfit.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
