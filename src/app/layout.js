import { Poppins } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import Navbar from '@/components/common/Navbar'
import Providers from '@/context/Providers'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ratha.in'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ratha – Buy Verified Used Cars at Best Prices',
    template: '%s | Ratha',
  },
  description:
    'Find quality, pre-inspected used cars at the best prices on Ratha. Every car is 167-point inspected, RC verified, and comes with easy financing options. Browse, compare, and buy with confidence.',
  keywords: [
    'used cars',
    'buy used car',
    'second hand car',
    'pre-owned cars',
    'certified used cars',
    'car marketplace',
    'Ratha',
    'affordable cars',
    'car finance',
    'car EMI',
    'used car India',
  ],
  authors: [{ name: 'Ratha' }],
  creator: 'Ratha',
  publisher: 'Ratha',
  formatDetection: {
    telephone: true,
    email: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Ratha',
    title: 'Ratha – Buy Verified Used Cars at Best Prices',
    description:
      'Find quality, pre-inspected used cars at the best prices. 167-point inspected, RC verified, easy financing. Browse, compare, and buy with confidence.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ratha – Used Car Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ratha – Buy Verified Used Cars at Best Prices',
    description:
      'Find quality, pre-inspected used cars at the best prices. Browse, compare, and buy with confidence on Ratha.',
    images: ['/og-image.png'],
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
    canonical: SITE_URL,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport = {
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ratha',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    'Quality used cars. Best prices. Trusted by thousands. Every car is 167-point inspected and RC verified.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-98765-43210',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: [],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <Suspense>
            <Navbar />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  )
}
