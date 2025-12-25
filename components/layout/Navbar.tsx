'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, ShoppingBag, MessageCircle, User } from 'lucide-react'
import Button from '@/components/ui/Button'
import Image from 'next/image'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Find Rooms', href: '/rooms', icon: Home },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
    { name: 'Messages', href: '/messages', icon: MessageCircle },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 md:gap-3">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Image
                src="/logo.png"
                alt="GlobeNest Logo"
                width={40}
                height={40}
                className="w-8 h-8 md:w-10 md:h-10 logo-blend"
                priority
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-xl md:text-2xl font-bold"
            >
              <span className="text-primary">Globe</span>
              <span className="text-secondary">Nest</span>
            </motion.div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => {}}>
              Log In
            </Button>
            <Button onClick={() => {}}>
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-primary"
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
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 py-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </a>
              ))}
              <div className="pt-4 space-y-2 border-t border-gray-200">
                <Button variant="outline" fullWidth onClick={() => {}}>
                  Log In
                </Button>
                <Button fullWidth onClick={() => {}}>
                  Sign Up
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
