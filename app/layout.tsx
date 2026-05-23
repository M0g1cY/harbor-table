import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import LenisProvider from "@/components/providers/LenisProvider";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harbor Table - Modern American Dining",
  description: "Experience elevated American cuisine in the heart of New York. Reserve your table today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full" suppressHydrationWarning>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
