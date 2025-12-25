'use client'

import { usePathname } from 'next/navigation'
import { Home, Bed, ShoppingCart, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function MobileBottomNav() {
  const pathname = usePathname()

  // Don't show on auth pages
  if (pathname?.startsWith('/auth')) return null

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/rooms', icon: Bed, label: 'Rooms' },
    { href: '/marketplace', icon: ShoppingCart, label: 'Shop' },
    { href: '/messages', icon: MessageCircle, label: 'Messages' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-pb">
      <div className="frosted border-t border-white/20 backdrop-blur-2xl shadow-2xl">
        <div className="flex justify-around items-center h-20 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 h-full relative"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl backdrop-blur-xl"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  />
                )}

                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className={`p-3 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-br from-primary to-secondary shadow-lg'
                      : 'bg-white/40'
                  }`}>
                    <Icon
                      size={24}
                      className={`${isActive ? 'text-white' : 'text-gray-600'}`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </div>

                  <span className={`text-xs mt-2 font-semibold block text-center transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'
                      : 'text-gray-600'
                  }`}>
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
