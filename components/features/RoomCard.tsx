'use client'

import { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { MapPin, Shield, Heart, X, Wifi, Wind, BatteryCharging } from 'lucide-react'
import { Room } from '@/types'
import { formatPrice } from '@/lib/utils'

interface RoomCardProps {
  room: Room
  onSwipe: (direction: 'left' | 'right') => void
  style?: React.CSSProperties
}

export default function RoomCard({ room, onSwipe, style }: RoomCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [exitX, setExitX] = useState(0)
  const x = useMotionValue(0)

  const rotate   = useTransform(x, [-220, 0, 220], [-18, 0, 18])
  const opacity  = useTransform(x, [-280, -120, 0, 120, 280], [0, 1, 1, 1, 0])
  const likeOpacity = useTransform(x, [20, 90], [0, 1])
  const passOpacity = useTransform(x, [-90, -20], [1, 0])

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (Math.abs(info.offset.x) > 75) {
      const dir = info.offset.x > 0 ? 'right' : 'left'
      setExitX(dir === 'right' ? 500 : -500)
      setTimeout(() => onSwipe(dir), 120)
    }
  }

  return (
    <motion.div
      style={{ x, rotate, opacity, ...style }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      dragTransition={{ bounceStiffness: 500, bounceDamping: 40 }}
      onDragEnd={handleDragEnd}
      animate={exitX !== 0 ? { x: exitX, opacity: 0, rotate: exitX > 0 ? 25 : -25, transition: { duration: 0.25 } } : {}}
      whileTap={{ cursor: 'grabbing' }}
      className="absolute w-full cursor-grab active:cursor-grabbing select-none"
    >
      {/* Card */}
      <div className="rounded-3xl overflow-hidden"
        style={{
          background: 'rgba(18,12,8,0.85)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,200,160,0.12)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
        }}>

        {/* ── Image ───────────────────────────── */}
        <div className="relative h-52 md:h-56 bg-black/40">
          {room.images[currentImageIndex] && (
            <img
              src={room.images[currentImageIndex]}
              alt={room.title}
              className="w-full h-full object-cover"
              draggable={false}
            />
          )}

          {/* Dark gradient overlay at bottom */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(8,6,4,0.85) 0%, rgba(8,6,4,0.2) 50%, transparent 100%)' }} />

          {/* Image dots */}
          {room.images.length > 1 && (
            <div className="absolute top-3 left-0 right-0 flex justify-center gap-1.5 z-10">
              {room.images.map((_, i) => (
                <button
                  key={i}
                  onPointerDown={(e) => { e.stopPropagation(); setCurrentImageIndex(i) }}
                  className="h-1 rounded-full transition-all duration-200"
                  style={{ width: i === currentImageIndex ? 20 : 6, background: i === currentImageIndex ? '#fff' : 'rgba(255,255,255,0.4)' }}
                />
              ))}
            </div>
          )}

          {/* Price badge */}
          <div className="absolute top-3 right-3 z-10">
            <div className="px-3 py-1.5 rounded-full font-bold text-sm text-white"
              style={{ background: 'rgba(8,6,4,0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,200,160,0.2)' }}>
              {formatPrice(room.price)}<span className="text-white/50 font-normal text-xs">/mo</span>
            </div>
          </div>

          {/* Title + location overlaid on image bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <h3 className="font-bold text-white text-lg leading-tight mb-1">{room.title}</h3>
            <div className="flex items-center gap-1 text-white/60 text-xs">
              <MapPin size={12} />
              <span>{room.location}</span>
            </div>
          </div>

          {/* PASS overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center rounded-3xl"
            style={{ opacity: passOpacity, background: 'rgba(239,68,68,0.15)', border: '3px solid rgba(239,68,68,0.7)' }}
          >
            <div className="px-5 py-2 rounded-2xl font-black text-2xl tracking-widest"
              style={{ background: 'rgba(239,68,68,0.85)', color: '#fff', transform: 'rotate(-15deg)' }}>
              NOPE
            </div>
          </motion.div>

          {/* LIKE overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center rounded-3xl"
            style={{ opacity: likeOpacity, background: 'rgba(16,185,129,0.15)', border: '3px solid rgba(16,185,129,0.7)' }}
          >
            <div className="px-5 py-2 rounded-2xl font-black text-2xl tracking-widest"
              style={{ background: 'rgba(16,185,129,0.85)', color: '#fff', transform: 'rotate(15deg)' }}>
              LIKE
            </div>
          </motion.div>
        </div>

        {/* ── Content ─────────────────────────── */}
        <div className="p-4">
          {/* User row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src={room.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${room.user.name}`}
                  alt={room.user.name}
                  className="w-9 h-9 rounded-full"
                  style={{ border: '1.5px solid rgba(255,200,160,0.2)' }}
                />
                {room.user.verified && (
                  <div className="absolute -bottom-0.5 -right-0.5 rounded-full p-0.5"
                    style={{ background: 'rgba(8,6,4,0.9)' }}>
                    <Shield size={10} style={{ color: '#6AE3E8' }} fill="currentColor" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-none">{room.user.name}</p>
                <p className="text-white/40 text-xs mt-0.5">{room.user.isLeaving ? 'Leaving London' : 'New to London'}</p>
              </div>
            </div>

            {/* Key facts row */}
            <div className="flex items-center gap-2">
              {room.billsIncluded && (
                <span className="text-xs px-2 py-1 rounded-full font-semibold"
                  style={{ background: 'rgba(16,185,129,0.12)', color: '#34D399', border: '1px solid rgba(16,185,129,0.2)' }}>
                  Bills inc.
                </span>
              )}
              <span className="text-xs px-2 py-1 rounded-full font-medium text-white/50"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,200,160,0.08)' }}>
                {room.roomType}
              </span>
            </div>
          </div>

          {/* Amenity chips */}
          <div className="flex flex-wrap gap-1.5">
            {room.amenities.slice(0, 4).map((a) => (
              <span key={a} className="text-xs px-2.5 py-1 rounded-full text-white/50"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,200,160,0.08)' }}>
                {a}
              </span>
            ))}
            {room.amenities.length > 4 && (
              <span className="text-xs px-2.5 py-1 rounded-full text-white/30"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                +{room.amenities.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
