import type { Metadata } from "next";
import { Bebas_Neue, Oswald, Inter, JetBrains_Mono, Pirata_One } from "next/font/google";
import { CartProvider } from "@/components/shop/CartProvider";
import "./globals.css";

const pirataOne = Pirata_One({
  weight: "400",
  variable: "--font-pirata-one",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "SuchGrime | Choppers, Flash & Filth — Milwaukee",
    template: "%s | SuchGrime",
  },
  description:
    "Milwaukee chopper culture. Apparel and parts mixing old iron, American traditional tattoo flash, and gothic horror.",
  openGraph: {
    siteName: "SuchGrime",
    type: "website",
    images: ["/IMG_1688_2.jpg"],
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
      className={`${pirataOne.variable} ${bebasNeue.variable} ${oswald.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-inter">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
