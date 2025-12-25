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
  title: 'Milwaukee Web Design & SEO Agency | SuchGrime – Dominate Local Search Rankings',
  description: 'Professional website refreshes and SEO for Milwaukee small businesses. Transparent pricing starting at $2k. AI-powered builds. Free site audit.',
  keywords: 'web design Milwaukee, SEO Milwaukee, website redesign, local SEO, Milwaukee web developer, small business websites, e-commerce Milwaukee, AI web development',
  authors: [{ name: 'SuchGrime' }],
  openGraph: {
    title: 'Milwaukee Web Design & SEO Agency | SuchGrime – Dominate Local Search Rankings',
    description: 'Professional website refreshes and SEO for Milwaukee small businesses. Transparent pricing starting at $2k. AI-powered builds with Cursor. Free site audit available.',
    type: 'website',
    locale: 'en_US',
    url: 'https://suchgrime.com/',
    siteName: 'SuchGrime',
    images: [
      {
        url: 'https://suchgrime.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SuchGrime - Milwaukee Web Design & SEO Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Milwaukee Web Design & SEO Agency | SuchGrime',
    description: 'Professional website refreshes and SEO for Milwaukee small businesses. Transparent pricing starting at $2k.',
    images: ['https://suchgrime.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://suchgrime.com/',
  },
  verification: {
    google: 'lQSXfNdoUXjQ3_liJsYT7gZ5tGvqlkrxhimKGZIRUhU',
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
              '@type': ['ProfessionalService', 'LocalBusiness'],
              '@id': 'https://suchgrime.com',
              name: 'SuchGrime',
              description: 'Milwaukee web design and SEO agency specializing in site refreshes and Google ranking domination for small service businesses.',
              url: 'https://suchgrime.com',
              telephone: '+1-414-439-6211',
              email: 'suchgrime@guerrillasocialclub.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '',
                addressLocality: 'Milwaukee',
                addressRegion: 'WI',
                postalCode: '53201',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 43.0389,
                longitude: -87.9065,
              },
              areaServed: {
                '@type': 'City',
                name: 'Milwaukee',
              },
              openingHours: 'Mo-Fr 09:00-17:00',
              priceRange: '$$',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Web Design & SEO Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Website Refresh',
                      description: 'Professional website redesign and refresh for small businesses',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'SEO Optimization',
                      description: 'Local SEO and search engine optimization to dominate Google rankings',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'E-commerce Development',
                      description: 'Custom e-commerce website builds with payment integration',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Website Maintenance',
                      description: 'Ongoing website maintenance and SEO management',
                    },
                  },
                ],
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5.0',
                reviewCount: '12',
              },
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://suchgrime.com/#organization',
              name: 'SuchGrime',
              url: 'https://suchgrime.com',
              logo: 'https://suchgrime.com/icon.svg',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-414-439-6211',
                contactType: 'customer service',
                email: 'suchgrime@guerrillasocialclub.com',
                areaServed: 'US',
                availableLanguage: 'English',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Milwaukee',
                addressRegion: 'WI',
                addressCountry: 'US',
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
