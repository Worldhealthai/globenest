'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Filter, MapPin, Clock, Shield } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-b from-background to-background-secondary">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <a href="/" className="flex items-center text-gray-600 hover:text-primary mb-4">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </a>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-secondary">Marketplace</span> 🛋️
            </h1>
            <p className="text-gray-600">
              Buy and sell furniture, appliances, and essentials with fellow expats
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search for items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search size={20} />}
                />
              </div>
              <Button variant="outline">
                <Filter size={20} className="mr-2" />
                More Filters
              </Button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-secondary text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-primary">{filteredItems.length}</span> items
            </p>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card hover padding="none" className="overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-56 bg-gray-200">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant={conditionColors[item.condition]}>
                        {item.condition}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full font-bold text-lg">
                        {formatPrice(item.price)}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-lg line-clamp-2 flex-1">
                          {item.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <MapPin size={14} />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* Seller Info */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={item.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.user.name}`}
                            alt={item.user.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-semibold">{item.user.name}</span>
                              {item.user.verified && (
                                <Shield className="text-secondary" size={12} fill="currentColor" />
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock size={10} />
                              <span>{formatDate(item.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" onClick={() => {}}>
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No items found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters
              </p>
              <Button onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Floating Action Button - List Item */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-8 right-8"
          >
            <Button
              size="lg"
              onClick={() => {}}
              className="rounded-full shadow-hard px-8"
            >
              + List an Item
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
