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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
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
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/5 rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon
                size={24}
                className={`relative z-10 ${isActive ? 'text-primary' : 'text-gray-400'}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`relative z-10 text-xs mt-1 font-medium ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
