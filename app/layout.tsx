import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GlobeNest - Connect. Relocate. Thrive.',
  description: 'The ultimate platform for expats relocating to London. Find housing, flatmates, and essential items all in one place.',
  keywords: ['expat', 'relocation', 'London', 'housing', 'flatmates', 'furniture', 'marketplace'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}
