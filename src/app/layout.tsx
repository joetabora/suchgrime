import type { Metadata } from "next";
import { Bebas_Neue, Oswald, Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import { CartProvider } from "@/components/shop/CartProvider";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SUCHGRIME | Milwaukee Custom Motorcycle Culture",
  description:
    "The people. The builds. The grime. Milwaukee's custom motorcycle culture, choppers, bobbers, and garage-built machines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${oswald.variable} ${playfairDisplay.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-brand-black font-inter text-brand-chrome selection:bg-zinc-800 selection:text-white">
        <div className="texture-overlay" />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
