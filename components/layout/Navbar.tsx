'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, ShoppingBag, MessageCircle } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Find Rooms', href: '/rooms', icon: Home },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
    { name: 'Messages', href: '/messages', icon: MessageCircle },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(8, 6, 4, 0.7)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderBottom: '1px solid rgba(255, 200, 160, 0.08)',
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute inset-0 blur-lg rounded-full"
                style={{ background: 'rgba(255, 83, 64, 0.5)' }} />
              <Image
                src="/logo.png"
                alt="GlobeNest Logo"
                width={40}
                height={40}
                className="w-8 h-8 md:w-9 md:h-9 relative z-10 logo-blend"
                priority
              />
            </motion.div>
            <motion.span
              whileHover={{ scale: 1.02 }}
              className="text-xl md:text-2xl font-bold gradient-text"
            >
              GlobeNest
            </motion.span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white/55 hover:text-white transition-colors duration-200 font-medium text-sm"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a href="/auth/login">
              <button className="px-5 py-2 text-sm font-semibold text-white/60 hover:text-white rounded-xl transition-all hover:bg-white/5">
                Log In
              </button>
            </a>
            <a href="/auth/signup">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-5 py-2 text-sm font-bold text-white rounded-xl"
                style={{ background: 'linear-gradient(135deg, #E83D2A, #FF5340, #5CE1E6)' }}
              >
                Sign Up
              </motion.button>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white/70 hover:text-white p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ borderTop: '1px solid rgba(255, 200, 160, 0.07)' }}
          >
            <div className="px-4 py-4 space-y-1"
              style={{ background: 'rgba(8, 6, 4, 0.92)', backdropFilter: 'blur(24px)' }}>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
                >
                  <item.icon size={18} style={{ color: '#FF7A67' }} />
                  <span className="font-medium text-sm">{item.name}</span>
                </a>
              ))}
              <div className="pt-3 space-y-2 border-t border-white/5 mt-3">
                <a href="/auth/login">
                  <button className="w-full py-3 rounded-xl font-semibold text-sm text-white/60 border border-white/10 hover:border-white/20 transition-all">
                    Log In
                  </button>
                </a>
                <a href="/auth/signup">
                  <button className="w-full py-3 rounded-xl font-bold text-sm text-white"
                    style={{ background: 'linear-gradient(135deg, #E83D2A, #FF5340, #5CE1E6)' }}>
                    Sign Up
                  </button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
