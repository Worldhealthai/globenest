'use client'

import { usePathname } from 'next/navigation'
import { Home, Bed, ShoppingCart, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function MobileBottomNav() {
  const pathname = usePathname()

  if (pathname?.startsWith('/auth')) return null

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/rooms', icon: Bed, label: 'Rooms' },
    { href: '/marketplace', icon: ShoppingCart, label: 'Shop' },
    { href: '/messages', icon: MessageCircle, label: 'Messages' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-pb">
      <div className="mx-3 mb-3 rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(18, 12, 8, 0.88)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255, 200, 160, 0.1)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,83,64,0.08)',
        }}>
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 h-full relative"
              >
                <motion.div
                  className="flex flex-col items-center justify-center gap-1 relative"
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                >
                  {/* Active pill background */}
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute -inset-2 rounded-xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,83,64,0.2), rgba(92,225,230,0.12))',
                        border: '1px solid rgba(255,83,64,0.25)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <Icon
                    size={22}
                    className="relative z-10 transition-all duration-200"
                    style={{
                      color: isActive ? '#FF7A67' : 'rgba(255,255,255,0.3)',
                      filter: isActive ? 'drop-shadow(0 0 6px rgba(255,83,64,0.7))' : 'none',
                    }}
                    strokeWidth={isActive ? 2.5 : 2}
                  />

                  <span
                    className="relative z-10 text-[10px] font-semibold transition-all duration-200"
                    style={{ color: isActive ? '#FF7A67' : 'rgba(255,255,255,0.3)' }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
