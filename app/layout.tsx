import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Fraunces, Hanken_Grotesk, Oswald } from "next/font/google"
import { siteConfig } from "@/lib/site-config"
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/seo/schemas/organization"
import { JsonLd } from "@/components/seo/json-ld"
import { getSiteUrl } from "@/lib/utils"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
})

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
})

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
})

const ogImage = `${getSiteUrl()}/opengraph-image`

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${siteConfig.name} — ${siteConfig.subtitle}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: getSiteUrl(),
    types: {
      "application/rss+xml": `${getSiteUrl()}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.subtitle}`,
    description: siteConfig.description,
    url: getSiteUrl(),
    images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.subtitle}`,
    description: siteConfig.description,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${hanken.variable} ${oswald.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#0c0c0c" />
      </head>
      <body>
        <JsonLd data={[organizationSchema(), websiteSchema(), localBusinessSchema()]} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
