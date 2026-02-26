import type { Metadata } from 'next'
import Script from 'next/script'
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Harmonic Waves — Tools for Sound Healers',
  description: 'Seven digital tools for the modern sound healer. Frequency synthesis, overtone visualisation, lunar guidance, tidal intelligence, and more.',
  openGraph: {
    title: 'Harmonic Waves — Tools for Sound Healers',
    description: 'Seven digital tools for the modern sound healer.',
    type: 'website',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <head>
        <Script
          defer
          data-domain="harmonicwaves.app"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
