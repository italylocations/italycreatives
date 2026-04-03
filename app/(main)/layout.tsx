import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: {
    template: '%s | ItalyCreatives',
    default: 'ItalyCreatives — Creative Crew Agency Rome Italy',
  },
  description:
    'Rome-based creative crew agency representing makeup artists, hair stylists, fashion stylists and filmmakers for international editorial and fashion productions in Italy.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://italycreatives.com',
    siteName: 'ItalyCreatives',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ItalyCreatives',
  description:
    'Creative crew agency representing makeup artists, hair stylists, fashion stylists and filmmakers for international productions in Italy.',
  url: 'https://italycreatives.com',
  email: 'info@italycreatives.com',
  areaServed: 'Italy',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Rome',
    addressCountry: 'IT',
  },
  availableLanguage: 'English',
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${cormorant.variable} ${dmSans.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </div>
  )
}
