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
  const [rooms]    = useState<Room[]>(mockRooms)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likedRooms,   setLikedRooms]   = useState<Room[]>([])
  const [passedRooms,  setPassedRooms]  = useState<Room[]>([])

  const currentRoom = rooms[currentIndex]
  const remaining   = rooms.length - currentIndex

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!currentRoom) return
    if (direction === 'right') setLikedRooms(prev => [...prev, currentRoom])
    else setPassedRooms(prev => [...prev, currentRoom])
    setCurrentIndex(i => i + 1)
  }

  const handleUndo = () => {
    if (currentIndex === 0) return
    setCurrentIndex(i => i - 1)
    setLikedRooms(prev => prev.slice(0, -1))
    setPassedRooms(prev => prev.slice(0, -1))
  }

  return (
    <div className="min-h-screen mesh-gradient overflow-hidden">
      <Navbar />

      <div className="pt-16 pb-6 px-4">
        <div className="max-w-6xl mx-auto">

          {/* ── Desktop: two-column ─── Mobile: stacked */}
          <div className="flex flex-col lg:flex-row gap-6 items-start pt-4">

            {/* ── LEFT: header + card stack + buttons ── */}
            <div className="flex-1 flex flex-col items-center">

              {/* Page header */}
              <div className="w-full flex items-center justify-between mb-4">
                <div>
                  <a href="/" className="inline-flex items-center text-white/35 hover:text-white/60 mb-1 text-xs gap-1 transition-colors">
                    <ArrowLeft size={13} /> Home
                  </a>
                  <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
                    Find Your <span className="gradient-text">Perfect Room</span>
                  </h1>
                  <p className="text-white/35 text-xs mt-0.5">Drag to swipe · or use the buttons below</p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" onClick={() => {}}>
                    <Filter size={14} className="mr-1.5" /> Filters
                  </Button>
                </motion.div>
              </div>

              {/* Card stack container */}
              <div className="relative w-full max-w-[340px] md:max-w-[360px]" style={{ height: 420 }}>
                <AnimatePresence mode="popLayout">
                  {currentIndex < rooms.length ? (
                    <>
                      {/* Third card (back) */}
                      {currentIndex + 2 < rooms.length && (
                        <motion.div
                          key={`${rooms[currentIndex + 2].id}-back`}
                          className="absolute inset-0"
                          initial={{ scale: 0.88, y: 24, opacity: 0 }}
                          animate={{ scale: 0.88, y: 24, opacity: 0.35 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                        >
                          <RoomCard room={rooms[currentIndex + 2]} onSwipe={() => {}} style={{ zIndex: 1, pointerEvents: 'none' }} />
                        </motion.div>
                      )}
                      {/* Second card (mid) */}
                      {currentIndex + 1 < rooms.length && (
                        <motion.div
                          key={`${rooms[currentIndex + 1].id}-mid`}
                          className="absolute inset-0"
                          initial={{ scale: 0.94, y: 12, opacity: 0.4 }}
                          animate={{ scale: 0.94, y: 12, opacity: 0.6 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                        >
                          <RoomCard room={rooms[currentIndex + 1]} onSwipe={() => {}} style={{ zIndex: 2, pointerEvents: 'none' }} />
                        </motion.div>
                      )}
                      {/* Active card (front) */}
                      <motion.div
                        key={`${currentRoom.id}-active`}
                        className="absolute inset-0"
                        initial={{ scale: 0.96, y: 6, opacity: 0.6 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      >
                        <RoomCard room={currentRoom} onSwipe={handleSwipe} style={{ zIndex: 3 }} />
                      </motion.div>
                    </>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="glass rounded-3xl p-8 text-center w-full">
                        <Sparkles className="w-10 h-10 mx-auto mb-3" style={{ color: '#FF7A67' }} />
                        <h2 className="text-xl font-bold text-white mb-2">All caught up!</h2>
                        <p className="text-white/40 text-sm mb-5">You&apos;ve viewed all {rooms.length} rooms</p>
                        <Button onClick={() => { setCurrentIndex(0); setLikedRooms([]); setPassedRooms([]) }}>
                          <RotateCcw size={15} className="mr-2" /> Start Over
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action buttons — sit directly below the card */}
              {currentIndex < rooms.length && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-center gap-5 mt-5"
                >
                  {/* Pass */}
                  <motion.button
                    whileHover={{ scale: 1.12, rotate: -6 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSwipe('left')}
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: 60, height: 60,
                      background: 'rgba(239,68,68,0.1)',
                      border: '1.5px solid rgba(239,68,68,0.35)',
                      color: '#F87171',
                      boxShadow: '0 6px 20px rgba(239,68,68,0.2)',
                    }}
                  >
                    <X size={26} strokeWidth={2.5} />
                  </motion.button>

                  {/* Undo */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleUndo}
                    disabled={currentIndex === 0}
                    className="rounded-full flex items-center justify-center disabled:opacity-25 disabled:cursor-not-allowed"
                    style={{
                      width: 44, height: 44,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,200,160,0.12)',
                      color: 'rgba(255,255,255,0.4)',
                    }}
                  >
                    <RotateCcw size={18} strokeWidth={2} />
                  </motion.button>

                  {/* Like */}
                  <motion.button
                    whileHover={{ scale: 1.12, rotate: 6 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSwipe('right')}
                    className="rounded-full flex items-center justify-center glow-pulse"
                    style={{
                      width: 60, height: 60,
                      background: 'rgba(16,185,129,0.12)',
                      border: '1.5px solid rgba(16,185,129,0.45)',
                      color: '#34D399',
                      boxShadow: '0 6px 20px rgba(16,185,129,0.2)',
                    }}
                  >
                    <Heart size={26} strokeWidth={2.5} />
                  </motion.button>
                </motion.div>
              )}

              {/* Mobile-only stats (below buttons) */}
              <div className="lg:hidden w-full max-w-[340px] grid grid-cols-3 gap-2 mt-5">
                {[
                  { label: 'Liked',     value: likedRooms.length,  color: '#34D399', bg: 'rgba(16,185,129,0.1)'   },
                  { label: 'Passed',    value: passedRooms.length, color: '#F87171', bg: 'rgba(239,68,68,0.1)'    },
                  { label: 'Left',      value: remaining,           color: '#FF7A67', bg: 'rgba(255,83,64,0.1)'   },
                ].map(({ label, value, color, bg }) => (
                  <div key={label} className="glass rounded-xl py-2.5 text-center"
                    style={{ background: bg }}>
                    <div className="font-bold text-base" style={{ color }}>{value}</div>
                    <div className="text-xs text-white/35">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: sidebar (desktop only) ── */}
            <div className="hidden lg:flex flex-col gap-4 w-72 sticky top-20">

              {/* Stats */}
              <div className="glass rounded-2xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/30 mb-3">Session</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Liked',  value: likedRooms.length,  color: '#34D399', bg: 'rgba(16,185,129,0.1)'  },
                    { label: 'Passed', value: passedRooms.length, color: '#F87171', bg: 'rgba(239,68,68,0.1)'   },
                    { label: 'Left',   value: remaining,           color: '#FF7A67', bg: 'rgba(255,83,64,0.1)'  },
                  ].map(({ label, value, color, bg }) => (
                    <div key={label} className="rounded-xl py-3 text-center"
                      style={{ background: bg }}>
                      <div className="font-bold text-xl" style={{ color }}>{value}</div>
                      <div className="text-xs text-white/35 mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Liked rooms list */}
              <div className="glass rounded-2xl p-4 flex-1">
                <h3 className="text-sm font-bold text-white mb-3">
                  Liked Rooms
                  <span className="text-white/30 font-normal ml-1.5">({likedRooms.length})</span>
                </h3>

                {likedRooms.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="w-10 h-10 mx-auto mb-2" style={{ color: 'rgba(255,255,255,0.08)' }} />
                    <p className="text-white/25 text-xs">Swipe right on rooms you like</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[420px] overflow-y-auto scrollbar-hide pr-0.5">
                    <AnimatePresence>
                      {likedRooms.map((room, i) => (
                        <motion.div
                          key={room.id}
                          initial={{ opacity: 0, x: 16, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -16, scale: 0.95 }}
                          transition={{ delay: i * 0.04 }}
                          className="flex gap-3 p-2.5 rounded-xl cursor-pointer transition-all hover:scale-[1.02]"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,200,160,0.08)' }}
                        >
                          <img src={room.images[0]} alt={room.title}
                            className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white truncate">{room.title}</p>
                            <p className="text-xs text-white/35 truncate mt-0.5">{room.location}</p>
                            <p className="text-xs font-bold mt-1 gradient-text-warm">£{room.price}/mo</p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Swipe hint */}
              <div className="glass rounded-2xl p-3 flex items-center gap-3"
                style={{ border: '1px solid rgba(255,83,64,0.12)', background: 'rgba(255,83,64,0.05)' }}>
                <div className="flex gap-1.5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(239,68,68,0.15)' }}>
                    <X size={13} style={{ color: '#F87171' }} />
                  </div>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(16,185,129,0.15)' }}>
                    <Heart size={13} style={{ color: '#34D399' }} />
                  </div>
                </div>
                <p className="text-xs text-white/35">Drag the card or use the buttons to swipe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
