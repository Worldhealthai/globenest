'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, MapPin, Clock, Shield, Plus } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { mockMarketplaceItems } from '@/lib/mockData'
import { formatPrice, formatDate } from '@/lib/utils'

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', 'Furniture', 'Appliances', 'Kitchen', 'Decor', 'Electronics']

  const filteredItems = mockMarketplaceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const conditionColors = {
    'new': 'success',
    'like-new': 'success',
    'good': 'primary',
    'fair': 'warning',
  } as const

  return (
    <div className="min-h-screen mesh-gradient overflow-hidden">
      <Navbar />

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <a href="/" className="inline-flex items-center text-white/40 hover:text-white/70 mb-4 transition-all text-sm gap-2">
              <ArrowLeft size={16} />
              Back to Home
            </a>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-white mb-2">
              <span className="gradient-text">Marketplace</span>
            </h1>
            <p className="text-white/40 text-sm md:text-base">Buy and sell with fellow expats</p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass rounded-3xl p-4 md:p-6 mb-5"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white placeholder:text-white/30 outline-none transition-all text-sm"
                style={{ background: 'rgba(255,248,240,0.05)', border: '1px solid rgba(255,200,160,0.08)' }}
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-3 px-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/30">Categories</h3>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(255,200,160,0.15), transparent)' }} />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-300 min-h-[40px]"
                  style={selectedCategory === category ? {
                    background: 'linear-gradient(135deg, rgba(255,83,64,0.25), rgba(92,225,230,0.2))',
                    border: '1px solid rgba(255,83,64,0.4)',
                    color: '#FF7A67',
                    boxShadow: '0 4px 16px rgba(255,83,64,0.15)',
                  } : {
                    background: 'rgba(255,248,240,0.04)',
                    border: '1px solid rgba(255,200,160,0.08)',
                    color: 'rgba(255,255,255,0.45)',
                  }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-white/30 text-xs mb-6"
          >
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
          </motion.p>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
              >
                <div className="glass rounded-3xl overflow-hidden h-full flex flex-col card-hover-effect">
                  <div className="relative h-56">
                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(8,6,4,0.7) 0%, transparent 50%)' }} />
                    <div className="absolute top-3 right-3">
                      <Badge variant={conditionColors[item.condition]}>{item.condition}</Badge>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <div className="px-4 py-1.5 rounded-full font-bold text-white text-lg"
                        style={{ background: 'rgba(8,6,4,0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,200,160,0.15)' }}>
                        {formatPrice(item.price)}
                      </div>
                    </div>
                    <div className="absolute inset-0 shimmer opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-base line-clamp-2 mb-2">{item.title}</h3>
                      <p className="text-white/40 text-sm mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex items-center gap-1.5 text-xs text-white/30 mb-4">
                        <MapPin size={13} style={{ color: '#6AE3E8' }} />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="relative">
                            <img
                              src={item.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.user.name}`}
                              alt={item.user.name}
                              className="w-9 h-9 rounded-full"
                              style={{ border: '1.5px solid rgba(255,200,160,0.15)' }}
                            />
                            {item.user.verified && (
                              <div className="absolute -bottom-0.5 -right-0.5 rounded-full p-0.5"
                                style={{ background: 'rgba(8,6,4,0.9)' }}>
                                <Shield className="w-3.5 h-3.5" style={{ color: '#6AE3E8' }} fill="currentColor" />
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-white/80">{item.user.name}</span>
                            <div className="flex items-center gap-1 text-xs text-white/30">
                              <Clock size={10} />
                              <span>{formatDate(item.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button size="sm" onClick={() => {}}>Message</Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="glass rounded-3xl p-12 inline-block">
                <h3 className="text-2xl font-bold mb-3 text-white">No items found</h3>
                <p className="text-white/40 mb-6 text-sm">Try adjusting your search or filters</p>
                <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all') }} size="lg">
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          )}

          {/* FAB */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
            className="fixed bottom-24 md:bottom-8 right-6 z-40"
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => {}}
              className="flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-white text-sm glow-pulse"
              style={{ background: 'linear-gradient(135deg, #E83D2A, #FF5340)', boxShadow: '0 8px 32px rgba(255,83,64,0.4)' }}
            >
              <Plus size={18} />
              List an Item
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
