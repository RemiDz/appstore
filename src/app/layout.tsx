import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#080414',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Harmonic Waves — Tools for Sound Healers',
  description: '7 free apps for frequency work, brainwave entrainment, vocal analysis, and moon-guided practice. Built by a sound healer.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    title: 'Harmonic Waves',
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: 'Harmonic Waves — Tools for Sound Healers',
    description: '7 free apps for frequency work, brainwave entrainment, vocal analysis, and moon-guided practice.',
    url: 'https://harmonicwaves.app',
    siteName: 'Harmonic Waves',
    images: [
      {
        url: '/icons/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Harmonic Waves — Tools for Sound Healers',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harmonic Waves — Tools for Sound Healers',
    description: '7 free apps for frequency work, brainwave entrainment, and sound healing.',
    images: ['/icons/og-image.png'],
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
