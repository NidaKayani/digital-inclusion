import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Digital Inclusion for All",
  description: "An agentic system for digital education designed to provide seamless access to education for students in low-connectivity, low-gadget environments.",
  manifest: "/manifest.json",
  themeColor: "#1d4ed8",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-slate-50">
      <body className={`${inter.variable} font-sans bg-slate-50 text-gray-800 antialiased`}>
        {children}
      </body>
    </html>
  );
}
