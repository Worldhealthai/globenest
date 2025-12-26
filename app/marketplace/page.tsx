'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Filter, MapPin, Clock, Shield, Plus, Sparkles } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Input from '@/components/ui/Input'
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

      <div className="pt-16 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 md:mb-10"
          >
            <a href="/" className="flex items-center text-gray-600 hover:text-gray-900 mb-3 md:mb-4 transition-all text-sm md:text-base">
              <ArrowLeft size={18} className="mr-2 md:w-5 md:h-5" />
              Back to Home
            </a>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-gray-900 mb-2 md:mb-3">
              Marketplace
            </h1>
            <p className="text-gray-500 text-base md:text-xl">
              Buy and sell with fellow expats
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-3xl p-4 md:p-8 mb-4 md:mb-6 backdrop-blur-xl"
          >
            <Input
              placeholder="Search for items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
              className="glass text-sm md:text-base"
            />
          </motion.div>

          {/* Category Filters - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 md:mb-10"
          >
            <div className="flex items-center gap-3 mb-3 px-2">
              <h3 className="text-sm font-semibold text-gray-600">Categories</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent" />
            </div>

            {/* Mobile: Grid Layout, Desktop: Horizontal Scroll */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-2 md:gap-3">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-3 rounded-2xl font-medium transition-all duration-300 text-sm min-h-[48px] flex items-center justify-center ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-secondary to-accent text-white shadow-lg'
                      : 'glass text-gray-700 hover:shadow-md backdrop-blur-xl border border-white/30'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <p className="text-gray-500 text-sm">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            </p>
          </motion.div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <div className="glass rounded-3xl overflow-hidden h-full flex flex-col backdrop-blur-xl card-hover-effect">
                  {/* Image */}
                  <div className="relative h-64 bg-gradient-to-br from-primary/5 to-secondary/5">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant={conditionColors[item.condition]} className="glass backdrop-blur-xl">
                        {item.condition}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="frosted px-5 py-2 rounded-full font-bold text-2xl shadow-lg border border-white/30">
                        {formatPrice(item.price)}
                      </div>
                    </div>
                    {/* Shimmer effect overlay */}
                    <div className="absolute inset-0 shimmer opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl line-clamp-2 mb-3">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 text-base mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <MapPin size={16} className="text-secondary" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* Seller Info */}
                    <div className="pt-5 border-t border-white/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={item.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.user.name}`}
                              alt={item.user.name}
                              className="w-10 h-10 rounded-full ring-2 ring-white/50"
                            />
                            {item.user.verified && (
                              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                                <Shield className="text-secondary w-4 h-4" fill="currentColor" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-semibold">{item.user.name}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock size={12} />
                              <span>{formatDate(item.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button size="sm" className="shadow-md" onClick={() => {}}>
                            Message
                          </Button>
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
              <div className="glass rounded-3xl p-16 backdrop-blur-xl inline-block">
                <h3 className="text-3xl font-bold mb-4 text-gray-900">No items found</h3>
                <p className="text-gray-500 mb-8 text-base">
                  Try adjusting your search or filters
                </p>
                <Button onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }} size="lg">
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          )}

          {/* Floating Action Button - List Item */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            className="fixed bottom-24 md:bottom-8 right-8 z-40"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                size="lg"
                onClick={() => {}}
                className="rounded-full shadow-xl px-8 py-6 text-base backdrop-blur-xl"
              >
                <Plus size={20} className="mr-2" />
                List an Item
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
