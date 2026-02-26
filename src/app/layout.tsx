import type { Metadata } from 'next'
import Script from 'next/script'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-outfit',
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
    <html lang="en" className={outfit.variable}>
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
