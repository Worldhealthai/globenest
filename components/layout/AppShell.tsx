'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Home, Bed, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react'
import MobileBottomNav from '@/components/layout/MobileBottomNav'

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/rooms', icon: Bed, label: 'Find Rooms' },
  { href: '/marketplace', icon: ShoppingBag, label: 'Marketplace' },
  { href: '/messages', icon: MessageCircle, label: 'Messages' },
]

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Auth pages render without the shell
  if (pathname?.startsWith('/auth')) return <>{children}</>

  return (
    <>
      {/* ─── DESKTOP SIDEBAR ─────────────────── */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-60 z-50 flex-col"
        style={{
          background: 'rgba(13, 13, 16, 0.85)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        }}>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 px-5 h-16 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div className="relative">
            <div className="absolute inset-0 blur-lg rounded-full" style={{ background: 'rgba(255, 83, 64, 0.45)' }} />
            <Image src="/logo.png" alt="GlobeNest" width={36} height={36}
              className="w-8 h-8 relative z-10 logo-blend" priority />
          </div>
          <span className="text-lg font-bold gradient-text">GlobeNest</span>
        </Link>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-5 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className="block relative">
                {isActive && (
                  <motion.div
                    layoutId="sidebarActive"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,83,64,0.16), rgba(255,83,64,0.06))',
                      border: '1px solid rgba(255,83,64,0.25)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <div className="relative flex items-center gap-3 px-3.5 py-3 rounded-xl transition-colors group">
                  <item.icon
                    size={19}
                    strokeWidth={isActive ? 2.4 : 2}
                    style={{
                      color: isActive ? '#FF7A67' : 'rgba(255,255,255,0.4)',
                      filter: isActive ? 'drop-shadow(0 0 6px rgba(255,83,64,0.6))' : 'none',
                      transition: 'color 0.2s',
                    }}
                    className="group-hover:!text-white/70"
                  />
                  <span
                    className="text-sm font-semibold transition-colors group-hover:text-white/80"
                    style={{ color: isActive ? '#FF7A67' : 'rgba(255,255,255,0.45)' }}
                  >
                    {item.label}
                  </span>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Bottom: auth CTA card */}
        <div className="p-3 flex-shrink-0">
          <div className="rounded-2xl p-4"
            style={{
              background: 'linear-gradient(135deg, rgba(255,83,64,0.1), rgba(255,255,255,0.03))',
              border: '1px solid rgba(255,83,64,0.18)',
            }}>
            <p className="text-white text-sm font-bold mb-1">New to London?</p>
            <p className="text-white/40 text-xs mb-3">Sign up for personalised matches</p>
            <Link href="/auth/signup">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-1.5"
                style={{ background: 'linear-gradient(180deg, #FF6C52, #EE422D)', boxShadow: '0 4px 16px rgba(255,83,64,0.3)' }}
              >
                Get Started <ArrowRight size={13} />
              </motion.button>
            </Link>
            <Link href="/auth/login">
              <button className="w-full mt-2 py-2 rounded-xl font-semibold text-xs text-white/50 hover:text-white/80 transition-colors">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </aside>

      {/* ─── MOBILE TOP HEADER ───────────────── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center gap-2.5 px-4 h-14"
        style={{
          background: 'rgba(10, 10, 12, 0.8)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
        }}>
        <div className="relative">
          <div className="absolute inset-0 blur-md rounded-full" style={{ background: 'rgba(255, 83, 64, 0.4)' }} />
          <Image src="/logo.png" alt="GlobeNest" width={30} height={30}
            className="w-7 h-7 relative z-10 logo-blend" priority />
        </div>
        <span className="text-base font-bold gradient-text">GlobeNest</span>
      </header>

      {/* ─── CONTENT AREA ────────────────────── */}
      <div className="md:pl-60 pt-14 md:pt-0 pb-20 md:pb-0 min-h-screen">
        {children}
      </div>

      {/* Mobile bottom tabs */}
      <MobileBottomNav />
    </>
  )
}
