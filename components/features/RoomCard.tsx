'use client'

import { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { MapPin, Calendar, Home, Shield, Heart, X } from 'lucide-react'
import { Room } from '@/types'
import { formatPrice, formatDate } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import Image from 'next/image'

interface RoomCardProps {
  room: Room
  onSwipe: (direction: 'left' | 'right') => void
  style?: any
}

export default function RoomCard({ room, onSwipe, style }: RoomCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [exitX, setExitX] = useState(0)
  const x = useMotionValue(0)

  // Enhanced transforms for smoother, more dynamic swiping
  const rotate = useTransform(x, [-250, 0, 250], [-25, 0, 25])
  const scale = useTransform(x, [-150, 0, 150], [1.05, 1, 1.05])
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0])

  // Perspective tilt effect
  const rotateY = useTransform(x, [-250, 0, 250], [-15, 0, 15])

  const handleDragEnd = (_: any, info: any) => {
    const swipeThreshold = 80 // Lower threshold for easier swiping
    if (Math.abs(info.offset.x) > swipeThreshold) {
      setExitX(info.offset.x > 0 ? 400 : -400)
      setTimeout(() => {
        onSwipe(info.offset.x > 0 ? 'right' : 'left')
      }, 150)
    }
  }

  return (
    <motion.div
      style={{
        x,
        rotate,
        scale,
        opacity,
        rotateY,
        ...style,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 40 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing', scale: 1.02 }}
      animate={exitX !== 0 ? {
        x: exitX,
        opacity: 0,
        scale: 0.8,
        rotate: exitX > 0 ? 30 : -30,
        transition: {
          duration: 0.3,
          ease: [0.32, 0.72, 0, 1]
        }
      } : {}}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 35,
        mass: 0.8
      }}
      className="absolute w-full max-w-sm cursor-grab active:cursor-grabbing"
    >
      <div className="bg-white rounded-3xl shadow-hard overflow-hidden">
        {/* Image Section */}
        <div className="relative h-72 md:h-96 bg-gray-200">
          {room.images[currentImageIndex] && (
            <img
              src={room.images[currentImageIndex]}
              alt={room.title}
              className="w-full h-full object-cover"
            />
          )}

          {/* Image Navigation Dots */}
          {room.images.length > 1 && (
            <div className="absolute top-4 left-0 right-0 flex justify-center gap-1">
              {room.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-1 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'w-6 bg-white'
                      : 'w-1 bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Price Badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-xl">
              {formatPrice(room.price)}
              <span className="text-sm text-gray-600">/month</span>
            </div>
          </div>

          {/* Swipe Indicators - Enhanced with smooth fade and scale */}
          <motion.div
            className="absolute inset-0 border-8 border-red-500 rounded-3xl flex items-center justify-center bg-red-500/10 backdrop-blur-sm"
            style={{
              opacity: useTransform(x, [-150, -40], [1, 0]),
              scale: useTransform(x, [-150, -40], [1.1, 0.8]),
            }}
          >
            <motion.div
              className="bg-white px-6 py-3 rounded-full shadow-2xl"
              style={{
                rotate: useTransform(x, [-150, 0], [-20, 0]),
              }}
            >
              <X className="text-red-500" size={48} strokeWidth={3} />
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute inset-0 border-8 border-green-500 rounded-3xl flex items-center justify-center bg-green-500/10 backdrop-blur-sm"
            style={{
              opacity: useTransform(x, [40, 150], [0, 1]),
              scale: useTransform(x, [40, 150], [0.8, 1.1]),
            }}
          >
            <motion.div
              className="bg-white px-6 py-3 rounded-full shadow-2xl"
              style={{
                rotate: useTransform(x, [0, 150], [0, 20]),
              }}
            >
              <Heart className="text-green-500 fill-green-500" size={48} strokeWidth={3} />
            </motion.div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Title and Location */}
          <div>
            <h3 className="text-2xl font-bold mb-2">{room.title}</h3>
            <div className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-1" />
              <span>{room.location}</span>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <img
              src={room.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${room.user.name}`}
              alt={room.user.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{room.user.name}</span>
                {room.user.verified && (
                  <Shield className="text-secondary" size={16} fill="currentColor" />
                )}
              </div>
              <p className="text-sm text-gray-600">
                {room.user.isLeaving ? '🚀 Leaving London' : '✨ New to London'}
              </p>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-100">
            <div>
              <div className="text-sm text-gray-600">Available</div>
              <div className="font-semibold">{formatDate(room.available)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Room Type</div>
              <div className="font-semibold capitalize">{room.roomType}</div>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2">
            {room.amenities.slice(0, 4).map((amenity) => (
              <Badge key={amenity} variant="neutral">
                {amenity}
              </Badge>
            ))}
            {room.amenities.length > 4 && (
              <Badge variant="neutral">+{room.amenities.length - 4} more</Badge>
            )}
          </div>

          {/* Description Preview */}
          <p className="text-gray-600 line-clamp-2">{room.description}</p>

          {/* Key Details */}
          <div className="flex flex-wrap gap-3 text-sm">
            {room.billsIncluded && (
              <span className="text-green-600 font-medium">✓ Bills Included</span>
            )}
            <span className="text-gray-600">
              Min. stay: {room.minStay} months
            </span>
            <span className="text-gray-600">
              Deposit: {formatPrice(room.deposit)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
