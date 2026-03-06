'use client'

import { motion } from 'framer-motion'
import { Search, MapPin, Heart, ShoppingBag, Home, TrendingUp, Sparkles, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { mockRooms, mockMarketplaceItems } from '@/lib/mockData'

export default function AppHome() {
  const [postcode, setPostcode] = useState('')

  const quickStats = [
    { label: 'Rooms', value: '150+', icon: Home, gradient: 'from-primary-600 to-primary-500', glow: 'rgba(139,92,246,0.5)' },
    { label: 'Items', value: '500+', icon: ShoppingBag, gradient: 'from-secondary-600 to-secondary-400', glow: 'rgba(34,211,238,0.5)' },
    { label: 'New Today', value: '24', icon: TrendingUp, gradient: 'from-pink-600 to-accent', glow: 'rgba(244,114,182,0.5)' },
  ]

  return (
    <div className="min-h-screen pt-6 pb-28 px-4 mesh-gradient">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 pt-4"
        >
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <div className="relative">
              <div className="absolute inset-0 blur-2xl rounded-full" style={{ background: 'rgba(139,92,246,0.5)' }} />
              <Image
                src="/logo.png"
                alt="GlobeNest"
                width={72}
                height={72}
                className="w-16 h-16 relative z-10 logo-blend"
                priority
              />
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold mb-1">
            <span className="gradient-text">Find Your Perfect Place</span>
          </h1>
          <p className="text-white/50 text-sm">Search by area to discover rooms &amp; items</p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-3xl p-5 mb-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="text-primary-400" size={18} />
            <h2 className="font-bold text-white text-base">Search Your Area</h2>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
              <input
                className="w-full pl-9 pr-4 py-3 rounded-xl text-sm font-medium text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                placeholder="Enter postcode (e.g., SW1A 1AA)"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-3 rounded-xl font-bold text-white glow-pulse"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #22D3EE)' }}
            >
              <Search size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass rounded-2xl p-4 text-center card-hover-effect"
              style={{ boxShadow: `0 8px 24px -8px ${stat.glow}` }}
            >
              <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${stat.gradient} mb-2`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <div className="font-bold text-lg text-white">{stat.value}</div>
              <div className="text-xs text-white/40">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Rooms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Home className="text-primary-400" size={18} />
              <h2 className="font-bold text-white text-base">Featured Rooms</h2>
            </div>
            <a href="/rooms" className="text-primary-400 text-xs font-semibold flex items-center gap-1 hover:text-primary-300 transition-colors">
              View All <ArrowRight size={14} />
            </a>
          </div>
          <div className="space-y-3">
            {mockRooms.slice(0, 3).map((room, index) => (
              <motion.a
                key={room.id}
                href="/rooms"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ x: 4 }}
                className="glass rounded-2xl p-4 flex gap-4 block card-hover-effect"
              >
                <img
                  src={room.images[0]}
                  alt={room.title}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm mb-1 truncate">{room.title}</h3>
                  <p className="text-xs text-white/50 mb-2 flex items-center gap-1">
                    <MapPin size={12} />
                    {room.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold gradient-text-violet">£{room.price}/mo</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', border: '1px solid rgba(16,185,129,0.2)' }}>
                      Available
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Marketplace Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-secondary-400" size={18} />
              <h2 className="font-bold text-white text-base">Latest Items</h2>
            </div>
            <a href="/marketplace" className="text-secondary-400 text-xs font-semibold flex items-center gap-1 hover:text-secondary-300 transition-colors">
              View All <ArrowRight size={14} />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {mockMarketplaceItems.slice(0, 4).map((item, index) => (
              <motion.a
                key={item.id}
                href="/marketplace"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.08 }}
                whileHover={{ scale: 1.04 }}
                className="glass rounded-2xl overflow-hidden block card-hover-effect"
              >
                <div className="relative h-28">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(6,4,15,0.6) 0%, transparent 60%)' }} />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                      style={{ background: 'rgba(139,92,246,0.8)', backdropFilter: 'blur(8px)' }}>
                      £{item.price}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-white text-xs mb-1 truncate">{item.title}</h3>
                  <p className="text-xs text-white/40 flex items-center gap-1">
                    <MapPin size={10} />
                    {item.location}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 glass rounded-3xl p-6 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(34,211,238,0.08))', border: '1px solid rgba(139,92,246,0.2)' }}
        >
          <Sparkles className="w-10 h-10 mx-auto mb-3 text-primary-400" />
          <h3 className="font-bold text-white text-lg mb-1">Ready to get started?</h3>
          <p className="text-white/50 text-sm mb-5">Find your perfect room or list an item</p>
          <div className="flex gap-3">
            <a href="/rooms" className="flex-1">
              <button className="w-full py-3 rounded-xl font-bold text-sm text-white"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #8B5CF6)' }}>
                Browse Rooms
              </button>
            </a>
            <a href="/marketplace" className="flex-1">
              <button className="w-full py-3 rounded-xl font-semibold text-sm text-white/70"
                style={{ border: '1px solid rgba(34,211,238,0.3)', background: 'rgba(34,211,238,0.06)' }}>
                View Market
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
