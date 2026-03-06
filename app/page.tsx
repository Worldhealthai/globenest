'use client'

import Navbar from '@/components/layout/Navbar'
import AppHome from '@/components/features/AppHome'
import DesktopHome from '@/components/features/DesktopHome'

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Mobile */}
      <div className="md:hidden">
        <AppHome />
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <DesktopHome />
      </div>
    </>
  )
}
