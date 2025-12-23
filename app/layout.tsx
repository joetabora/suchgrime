import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'SuchGrime - Raw Design. Ruthless SEO. Milwaukee-Built.',
  description: 'We drag your outdated site out of the gutter and make it dominate Google. Raw design. Ruthless SEO. Milwaukee-built for small businesses that want to win.',
  keywords: 'web design Milwaukee, SEO Milwaukee, website redesign, e-commerce Milwaukee, small business SEO',
  authors: [{ name: 'SuchGrime' }],
  openGraph: {
    title: 'SuchGrime - Raw Design. Ruthless SEO.',
    description: 'Milwaukee-based web design and SEO agency that refreshes outdated sites and crushes Google rankings.',
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
    <html lang="en" className={inter.variable}>
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
