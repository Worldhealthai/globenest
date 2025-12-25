import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GlobeNest - Connect. Relocate. Thrive.',
  description: 'The ultimate platform for expats relocating to London. Find housing, flatmates, and essential items all in one place.',
  keywords: ['expat', 'relocation', 'London', 'housing', 'flatmates', 'furniture', 'marketplace'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'GlobeNest',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'GlobeNest',
    title: 'GlobeNest - Connect. Relocate. Thrive.',
    description: 'Find housing, flatmates, and essential items for your London relocation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GlobeNest',
    description: 'Find housing, flatmates, and essential items for your London relocation',
  },
}

export const viewport: Viewport = {
  themeColor: '#FF4741',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
