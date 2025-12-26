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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex justify-around items-center h-16 px-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 h-full relative group"
              >
                <motion.div
                  className="flex flex-col items-center justify-center gap-1"
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {/* Icon with subtle indicator */}
                  <div className="relative">
                    <Icon
                      size={22}
                      className={`transition-all duration-200 ${
                        isActive
                          ? 'text-primary'
                          : 'text-gray-400 group-active:text-gray-600'
                      }`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />

                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <span className={`text-[10px] font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-primary'
                      : 'text-gray-400'
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
