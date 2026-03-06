'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X, RotateCcw, Filter, ArrowLeft, Sparkles } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Button from '@/components/ui/Button'
import RoomCard from '@/components/features/RoomCard'
import { mockRooms } from '@/lib/mockData'
import { Room } from '@/types'

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(mockRooms)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likedRooms, setLikedRooms] = useState<Room[]>([])
  const [passedRooms, setPassedRooms] = useState<Room[]>([])

  const currentRoom = rooms[currentIndex]

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!currentRoom) return
    if (direction === 'right') {
      setLikedRooms([...likedRooms, currentRoom])
    } else {
      setPassedRooms([...passedRooms, currentRoom])
    }
    setCurrentIndex(currentIndex + 1)
  }

  const handleUndo = () => {
    if (currentIndex === 0) return
    setCurrentIndex(currentIndex - 1)
    setLikedRooms(likedRooms.filter((_, i) => i !== likedRooms.length - 1))
    setPassedRooms(passedRooms.filter((_, i) => i !== passedRooms.length - 1))
  }

  return (
    <div className="min-h-screen mesh-gradient overflow-hidden">
      <Navbar />

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 md:mb-8"
          >
            <a href="/" className="inline-flex items-center text-white/40 hover:text-white/70 mb-4 transition-all text-sm gap-2">
              <ArrowLeft size={16} />
              Back to Home
            </a>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 leading-tight text-white">
                  Find Your{' '}
                  <span className="gradient-text">Perfect Room</span>
                </h1>
                <p className="text-white/40 text-sm md:text-base">Swipe right to like, left to pass</p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
                <Button variant="outline" className="text-sm" onClick={() => {}}>
                  <Filter size={16} className="md:mr-2" />
                  <span className="hidden md:inline">Filters</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-3 gap-3 md:gap-4 mb-8"
          >
            {[
              { label: 'Liked', value: likedRooms.length, icon: Heart, color: '#34D399', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)' },
              { label: 'Passed', value: passedRooms.length, icon: X, color: '#F87171', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)' },
              { label: 'Remaining', value: rooms.length - currentIndex, icon: Sparkles, color: '#FF7A67', bg: 'rgba(255,83,64,0.1)', border: 'rgba(255,83,64,0.2)' },
            ].map(({ label, value, icon: Icon, color, bg, border }) => (
              <div key={label} className="glass rounded-2xl px-4 py-4 text-center card-hover-effect"
                style={{ background: bg, borderColor: border }}>
                <span className="text-xs text-white/40 block mb-1">{label}</span>
                <div className="flex items-center gap-1.5 justify-center">
                  <Icon size={16} style={{ color }} strokeWidth={2.5} />
                  <span className="font-bold text-xl" style={{ color }}>{value}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            {/* Card Stack */}
            <div className="flex-1 flex justify-center items-start">
              <div className="relative w-full max-w-sm h-[500px] md:h-[600px]">
                <AnimatePresence mode="popLayout">
                  {currentIndex < rooms.length ? (
                    <>
                      {currentIndex + 2 < rooms.length && (
                        <motion.div
                          key={`${rooms[currentIndex + 2].id}-stack`}
                          initial={{ scale: 0.85, y: 30, opacity: 0.3 }}
                          animate={{ scale: 0.9, y: 20, opacity: 0.4 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          className="hidden md:block"
                        >
                          <RoomCard key={rooms[currentIndex + 2].id} room={rooms[currentIndex + 2]} onSwipe={() => {}} style={{ zIndex: 1 }} />
                        </motion.div>
                      )}
                      {currentIndex + 1 < rooms.length && (
                        <motion.div
                          key={`${rooms[currentIndex + 1].id}-stack`}
                          initial={{ scale: 0.9, y: 20, opacity: 0.5 }}
                          animate={{ scale: 0.95, y: 10, opacity: 0.65 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          className="hidden md:block"
                        >
                          <RoomCard key={rooms[currentIndex + 1].id} room={rooms[currentIndex + 1]} onSwipe={() => {}} style={{ zIndex: 2 }} />
                        </motion.div>
                      )}
                      <motion.div
                        key={`${currentRoom.id}-active`}
                        initial={{ scale: 0.95, y: 10, opacity: 0.7 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      >
                        <RoomCard key={currentRoom.id} room={currentRoom} onSwipe={handleSwipe} style={{ zIndex: 3 }} />
                      </motion.div>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center p-4"
                    >
                      <div className="text-center glass p-8 md:p-12 rounded-3xl w-full">
                        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">That&apos;s all for now</h2>
                        <p className="text-white/40 mb-6 text-sm">You&apos;ve viewed all available rooms</p>
                        <Button onClick={() => setCurrentIndex(0)} size="lg">
                          <RotateCcw size={18} className="mr-2" />
                          Start Over
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Liked Rooms Sidebar */}
            <div className="lg:w-80">
              <div className="glass rounded-3xl p-6 sticky top-24">
                <h3 className="text-lg font-bold text-white mb-4">
                  Liked{' '}
                  <span className="text-white/30 font-normal">({likedRooms.length})</span>
                </h3>
                {likedRooms.length === 0 ? (
                  <div className="text-center py-10">
                    <Heart className="w-12 h-12 mx-auto mb-3" style={{ color: 'rgba(255,255,255,0.1)' }} />
                    <p className="text-white/30 text-sm">No liked rooms yet</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1 scrollbar-hide">
                    {likedRooms.map((room, index) => (
                      <motion.div
                        key={room.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="frosted flex gap-3 p-3 rounded-2xl hover:scale-[1.02] cursor-pointer transition-all duration-300"
                        style={{ border: '1px solid rgba(255,200,160,0.1)' }}
                      >
                        <img src={room.images[0]} alt={room.title} className="w-16 h-16 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-white truncate mb-1">{room.title}</h4>
                          <p className="text-xs text-white/40 mb-1">{room.location}</p>
                          <p className="text-sm font-bold gradient-text-warm">£{room.price}/mo</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {currentIndex < rooms.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-8 mt-10"
            >
              <motion.button
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSwipe('left')}
                className="rounded-full flex items-center justify-center"
                style={{
                  width: 72, height: 72,
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  color: '#F87171',
                  boxShadow: '0 8px 24px rgba(239,68,68,0.2)',
                }}
              >
                <X size={32} strokeWidth={2.5} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleUndo}
                disabled={currentIndex === 0}
                className="rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  width: 56, height: 56,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,200,160,0.1)',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                <RotateCcw size={22} strokeWidth={2.5} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSwipe('right')}
                className="rounded-full flex items-center justify-center glow-pulse"
                style={{
                  width: 72, height: 72,
                  background: 'rgba(16,185,129,0.15)',
                  border: '1px solid rgba(16,185,129,0.4)',
                  color: '#34D399',
                  boxShadow: '0 8px 24px rgba(16,185,129,0.25)',
                }}
              >
                <Heart size={32} strokeWidth={2.5} />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
