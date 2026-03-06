'use client'

import { motion } from 'framer-motion'
import {
  Search, MapPin, Home, ShoppingBag, TrendingUp, ArrowRight,
  Heart, Shield, Sparkles, Clock, Star, Zap
} from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { mockRooms, mockMarketplaceItems } from '@/lib/mockData'
import { formatPrice } from '@/lib/utils'

export default function DesktopHome() {
  const [search, setSearch] = useState('')

  const stats = [
    { label: 'Active Rooms', value: '150+', icon: Home, color: '#FF7A67', bg: 'rgba(255,83,64,0.12)', border: 'rgba(255,83,64,0.22)' },
    { label: 'Items Listed', value: '500+', icon: ShoppingBag, color: '#6AE3E8', bg: 'rgba(92,225,230,0.1)', border: 'rgba(92,225,230,0.18)' },
    { label: 'New Today', value: '24', icon: TrendingUp, color: '#FFD4A8', bg: 'rgba(255,184,132,0.1)', border: 'rgba(255,184,132,0.18)' },
    { label: 'User Rating', value: '4.9★', icon: Star, color: '#FFD4A8', bg: 'rgba(255,184,132,0.1)', border: 'rgba(255,184,132,0.18)' },
  ]

  const quickLinks = [
    { label: 'Find a Room', href: '/rooms', icon: Home, gradient: 'linear-gradient(135deg, #C42A18, #FF5340)', desc: 'Swipe to match with verified rooms' },
    { label: 'Marketplace', href: '/marketplace', icon: ShoppingBag, gradient: 'linear-gradient(135deg, #21A4A9, #5CE1E6)', desc: 'Buy & sell with fellow expats' },
    { label: 'Messages', href: '/messages', icon: Zap, gradient: 'linear-gradient(135deg, #A8600A, #FFB884)', desc: 'Chat with your matches' },
  ]

  return (
    <div className="min-h-screen pt-16 mesh-gradient">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">

        {/* ─── HERO HEADER ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-2">
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="relative">
                <div className="absolute inset-0 blur-xl rounded-full" style={{ background: 'rgba(255,83,64,0.55)' }} />
                <Image src="/logo.png" alt="GlobeNest" width={48} height={48}
                  className="w-11 h-11 relative z-10 logo-blend" priority />
              </div>
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold gradient-text leading-tight">GlobeNest</h1>
              <p className="text-white/40 text-sm">London&apos;s expat platform</p>
            </div>
          </div>
        </motion.div>

        {/* ─── SEARCH BAR ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-4 mb-8 flex gap-3 items-center"
        >
          <Search className="text-white/30 flex-shrink-0" size={20} />
          <input
            className="flex-1 bg-transparent text-white placeholder:text-white/30 outline-none text-sm"
            placeholder="Search rooms, items, or areas…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-6 py-2 rounded-xl font-bold text-white text-sm flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #E83D2A, #FF5340, #5CE1E6)' }}
          >
            Search
          </motion.button>
        </motion.div>

        {/* ─── STATS ROW ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-4 gap-4 mb-10"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              whileHover={{ scale: 1.04, y: -2 }}
              className="glass rounded-2xl px-5 py-4 flex items-center gap-3 card-hover-effect"
              style={{ background: s.bg, border: `1px solid ${s.border}` }}
            >
              <s.icon size={22} style={{ color: s.color }} />
              <div>
                <div className="font-bold text-xl text-white leading-none mb-0.5">{s.value}</div>
                <div className="text-xs text-white/40">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── QUICK LINKS ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass rounded-2xl p-6 cursor-pointer card-hover-effect"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: link.gradient }}>
                  <link.icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-white text-base mb-1">{link.label}</h3>
                <p className="text-xs text-white/40">{link.desc}</p>
                <div className="flex items-center gap-1 mt-3 text-xs font-semibold gradient-text">
                  Open <ArrowRight size={12} />
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* ─── MAIN CONTENT GRID ───────────────── */}
        <div className="grid grid-cols-5 gap-6">

          {/* Featured Rooms */}
          <div className="col-span-3">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Home size={18} style={{ color: '#FF7A67' }} />
                <h2 className="font-bold text-white text-lg">Featured Rooms</h2>
              </div>
              <Link href="/rooms"
                className="text-xs font-semibold flex items-center gap-1 transition-colors hover:opacity-80"
                style={{ color: '#FF7A67' }}>
                View all &amp; swipe <ArrowRight size={13} />
              </Link>
            </div>

            <div className="space-y-3">
              {mockRooms.slice(0, 4).map((room, i) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.08 }}
                  whileHover={{ x: 4 }}
                >
                  <Link href="/rooms">
                    <div className="glass rounded-2xl p-4 flex gap-4 cursor-pointer card-hover-effect">
                      <img src={room.images[0]} alt={room.title}
                        className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-white text-sm truncate">{room.title}</h3>
                          <span className="text-base font-bold flex-shrink-0 gradient-text-warm">
                            £{room.price}/mo
                          </span>
                        </div>
                        <p className="text-xs text-white/40 flex items-center gap-1 mb-2">
                          <MapPin size={11} />{room.location}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {room.amenities.slice(0, 3).map((a) => (
                            <span key={a} className="text-xs px-2 py-0.5 rounded-full text-white/50"
                              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,200,160,0.1)' }}>
                              {a}
                            </span>
                          ))}
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ background: 'rgba(16,185,129,0.12)', color: '#34D399', border: '1px solid rgba(16,185,129,0.2)' }}>
                            Available
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <Link href="/rooms">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 py-3.5 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #E83D2A, #FF5340)', boxShadow: '0 4px 20px rgba(255,83,64,0.35)' }}
              >
                <Heart size={16} />
                Start Swiping Rooms
              </motion.button>
            </Link>
          </div>

          {/* Marketplace Sidebar */}
          <div className="col-span-2">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} style={{ color: '#6AE3E8' }} />
                <h2 className="font-bold text-white text-lg">Latest Items</h2>
              </div>
              <Link href="/marketplace"
                className="text-xs font-semibold flex items-center gap-1 transition-colors hover:opacity-80"
                style={{ color: '#6AE3E8' }}>
                Browse all <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {mockMarketplaceItems.slice(0, 4).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  whileHover={{ scale: 1.04, y: -3 }}
                >
                  <Link href="/marketplace">
                    <div className="glass rounded-2xl overflow-hidden cursor-pointer card-hover-effect">
                      <div className="relative h-28">
                        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0"
                          style={{ background: 'linear-gradient(to top, rgba(8,6,4,0.7) 0%, transparent 55%)' }} />
                        <span className="absolute top-2 right-2 text-xs font-bold text-white px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(255,83,64,0.75)', backdropFilter: 'blur(8px)' }}>
                          £{item.price}
                        </span>
                      </div>
                      <div className="p-2.5">
                        <p className="text-xs font-semibold text-white truncate mb-0.5">{item.title}</p>
                        <p className="text-xs text-white/35 flex items-center gap-1">
                          <MapPin size={10} />{item.location}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Community activity */}
            <div className="glass rounded-2xl p-5"
              style={{ background: 'linear-gradient(135deg, rgba(92,225,230,0.07), rgba(255,83,64,0.07))', border: '1px solid rgba(92,225,230,0.12)' }}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={16} style={{ color: '#6AE3E8' }} />
                <h3 className="font-bold text-white text-sm">Community Activity</h3>
              </div>
              {[
                { name: 'Maria S.', action: 'listed a sofa in Hackney', time: '2m ago', dot: '#FF7A67' },
                { name: 'James K.', action: 'matched with a flatmate', time: '8m ago', dot: '#6AE3E8' },
                { name: 'Priya M.', action: 'sold kitchen items', time: '15m ago', dot: '#FFD4A8' },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.dot }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/70">
                      <span className="font-semibold text-white/90">{a.name}</span> {a.action}
                    </p>
                    <p className="text-xs text-white/30 flex items-center gap-1 mt-0.5">
                      <Clock size={10} /> {a.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── BOTTOM BANNER ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 rounded-3xl p-8 flex items-center justify-between"
          style={{
            background: 'linear-gradient(135deg, rgba(255,83,64,0.2), rgba(92,225,230,0.1))',
            border: '1px solid rgba(255,83,64,0.2)',
          }}
        >
          <div>
            <h3 className="text-xl font-bold text-white mb-1">New to London?</h3>
            <p className="text-white/50 text-sm">Complete your profile to get personalised matches</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <button className="px-6 py-3 rounded-xl font-semibold text-sm text-white/70 border border-white/15 hover:border-white/30 transition-all">
                Log In
              </button>
            </Link>
            <Link href="/auth/signup">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-3 rounded-xl font-bold text-sm text-white flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #E83D2A, #FF5340, #5CE1E6)', boxShadow: '0 4px 20px rgba(255,83,64,0.4)' }}
              >
                Get Started Free <ArrowRight size={16} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
