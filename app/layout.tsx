import type { Metadata } from 'next'
import { Inter, Space_Grotesk, Bebas_Neue } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas',
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'Milwaukee Web Design & SEO Agency | SuchGrime – Dominate Local Search',
  description: 'Professional website refreshes and SEO for Milwaukee small businesses. Transparent pricing from $2k. Get a free audit. Built with Rust Belt hustle for results that matter.',
  keywords: 'web design Milwaukee, SEO Milwaukee, website redesign, local SEO, Milwaukee web developer, small business websites, e-commerce Milwaukee',
  authors: [{ name: 'SuchGrime' }],
  openGraph: {
    title: 'Milwaukee Web Design & SEO Agency | SuchGrime',
    description: 'Professional website refreshes and SEO for Milwaukee small businesses. Transparent pricing from $2k. Get a free audit.',
    type: 'website',
    locale: 'en_US',
    url: 'https://suchgrime.com',
    siteName: 'SuchGrime',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://suchgrime.com',
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${bebasNeue.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://suchgrime.com',
              name: 'SuchGrime',
              description: 'Milwaukee-based web design and SEO agency focused on dragging outdated sites into the modern era. Specializing in refreshes that look sharp, convert better, and crush Google rankings for small service businesses.',
              url: 'https://suchgrime.com',
              telephone: '+1-414-439-6211',
              email: 'suchgrime@guerrillasocialclub.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Milwaukee',
                addressRegion: 'WI',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '43.0389',
                longitude: '-87.9065',
              },
              areaServed: {
                '@type': 'GeoCircle',
                geoMidpoint: {
                  '@type': 'GeoCoordinates',
                  latitude: '43.0389',
                  longitude: '-87.9065',
                },
                geoRadius: '50000', // 50km radius
              },
              priceRange: '$2000 - $15000',
              openingHours: 'Mo-Fr 09:00-17:00',
              sameAs: [
                // Add social media profiles here when available
              ],
              serviceType: [
                'Web Design',
                'SEO Services',
                'Website Redesign',
                'E-commerce Development',
                'Local SEO',
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5.0',
                reviewCount: '12',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${bebasNeue.variable} font-sans antialiased`}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
