import type { Metadata } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import PageLoader from '@/components/PageLoader'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import NoiseOverlay from '@/components/NoiseOverlay'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-display',
  weight: '400',
})

export const metadata: Metadata = {
  title: 'SuchGrime - Professional Web Design & SEO | Milwaukee',
  description: 'Transform outdated websites into high-performing digital assets. Professional design, strategic SEO, and measurable results for Milwaukee businesses.',
  keywords: 'web design Milwaukee, SEO Milwaukee, website redesign, e-commerce Milwaukee, small business SEO',
  authors: [{ name: 'SuchGrime' }],
  openGraph: {
    title: 'SuchGrime - Professional Web Design & SEO',
    description: 'Milwaukee-based web design and SEO agency delivering measurable results for businesses.',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://suchgrime.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'SuchGrime',
              description: 'Milwaukee-based web design and SEO agency',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Milwaukee',
                addressRegion: 'WI',
                addressCountry: 'US',
              },
              url: 'https://suchgrime.com',
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${bebasNeue.variable} font-sans antialiased`}>
        <PageLoader />
        <ScrollProgress />
        <CustomCursor />
        <NoiseOverlay />
        <Navigation />
        {children}
      </body>
    </html>
  )
}
