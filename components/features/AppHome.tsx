'use client'

import { motion } from 'framer-motion'
import { Search, MapPin, Heart, ShoppingBag, Home, TrendingUp, Sparkles, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Image from 'next/image'
import { mockRooms, mockMarketplaceItems } from '@/lib/mockData'

export default function AppHome() {
  const [postcode, setPostcode] = useState('')

  const quickStats = [
    { label: 'Active Rooms', value: '150+', icon: Home, color: 'from-primary to-primary-600' },
    { label: 'Items Listed', value: '500+', icon: ShoppingBag, color: 'from-secondary to-secondary-600' },
    { label: 'New Today', value: '24', icon: TrendingUp, color: 'from-accent/60 to-accent' },
  ]

  return (
    <div className="min-h-screen pt-20 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Image
              src="/logo.png"
              alt="GlobeNest"
              width={80}
              height={80}
              className="w-16 h-16 drop-shadow-xl"
              priority
            />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-primary">Find Your</span>{' '}
            <span className="text-secondary">Perfect Place</span>
          </h1>
          <p className="text-gray-600">Search by area to discover rooms & items</p>
        </motion.div>

        {/* Search by Postcode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-6 mb-6 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="text-primary" size={20} />
            <h2 className="font-bold text-lg">Search Your Area</h2>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Enter postcode (e.g., SW1A 1AA)"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="flex-1 glass backdrop-blur-xl"
              icon={<Search size={18} />}
            />
            <Button className="glow-pulse">
              <Search size={20} />
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`glass rounded-2xl p-4 text-center backdrop-blur-xl card-hover-effect`}
            >
              <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${stat.color} mb-2`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="font-bold text-xl">{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Rooms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Home className="text-primary" size={20} />
              <h2 className="font-bold text-lg">Featured Rooms</h2>
            </div>
            <a href="/rooms" className="text-primary text-sm font-medium flex items-center gap-1">
              View All <ArrowRight size={16} />
            </a>
          </div>
          <div className="space-y-3">
            {mockRooms.slice(0, 3).map((room, index) => (
              <motion.a
                key={room.id}
                href="/rooms"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ x: 4 }}
                className="glass rounded-2xl p-4 flex gap-4 backdrop-blur-xl block card-hover-effect"
              >
                <img
                  src={room.images[0]}
                  alt={room.title}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1 truncate">{room.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                    <MapPin size={14} />
                    {room.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">£{room.price}/mo</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      Available
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Latest Marketplace Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-secondary" size={20} />
              <h2 className="font-bold text-lg">Latest Items</h2>
            </div>
            <a href="/marketplace" className="text-secondary text-sm font-medium flex items-center gap-1">
              View All <ArrowRight size={16} />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {mockMarketplaceItems.slice(0, 4).map((item, index) => (
              <motion.a
                key={item.id}
                href="/marketplace"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-2xl overflow-hidden backdrop-blur-xl block card-hover-effect"
              >
                <div className="relative h-32 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold">
                      £{item.price}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm mb-1 truncate">{item.title}</h3>
                  <p className="text-xs text-gray-600 flex items-center gap-1">
                    <MapPin size={12} />
                    {item.location}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-8 glass rounded-3xl p-6 backdrop-blur-xl text-center"
        >
          <Sparkles className="w-12 h-12 mx-auto mb-3 text-secondary" />
          <h3 className="font-bold text-xl mb-2">Ready to get started?</h3>
          <p className="text-gray-600 mb-4">Find your perfect room or list an item</p>
          <div className="flex gap-3">
            <a href="/rooms" className="flex-1">
              <Button fullWidth>
                Browse Rooms
              </Button>
            </a>
            <a href="/marketplace" className="flex-1">
              <Button fullWidth variant="outline" className="glass">
                View Market
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
