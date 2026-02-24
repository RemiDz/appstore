import type { Metadata } from 'next'
import Script from 'next/script'
import { Cormorant_Garamond, Lato, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-cormorant',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Harmonic Waves — Tools for Sound Healers',
  description: 'A curated collection of digital tools for sound healing practitioners. Explore frequency analysis, lunar guidance, overtone visualisation, and more.',
  openGraph: {
    title: 'Harmonic Waves — Tools for Sound Healers',
    description: 'Digital tools for the modern sound healer.',
    type: 'website',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${lato.variable} ${jetbrains.variable}`}>
      <head>
        {/* Privacy-friendly analytics by Plausible */}
        <Script async src="https://plausible.io/js/pa-ZqKyEhbiJfRrJm3EgzV3w.js" strategy="afterInteractive" />
        <Script id="plausible-init" strategy="afterInteractive">
          {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
