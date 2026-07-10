'use client'

import AppHome from '@/components/features/AppHome'
import DesktopHome from '@/components/features/DesktopHome'

export default function HomePage() {
  return (
    <>
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
