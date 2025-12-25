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

    const previousIndex = currentIndex - 1
    setCurrentIndex(previousIndex)

    // Remove from liked or passed
    setLikedRooms(likedRooms.filter((_, i) => i !== likedRooms.length - 1))
    setPassedRooms(passedRooms.filter((_, i) => i !== passedRooms.length - 1))
  }

  const handleButtonSwipe = (direction: 'left' | 'right') => {
    handleSwipe(direction)
  }

  return (
    <div className="min-h-screen mesh-gradient overflow-hidden">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <a href="/" className="flex items-center text-gray-600 hover:text-primary mb-4 transition-all hover:translate-x-1">
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
              </a>
              <h1 className="text-5xl md:text-6xl font-bold mb-3">
                Find Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Perfect Room</span>
              </h1>
              <p className="text-gray-600 text-xl">
                Swipe right to like, left to pass. It's that simple! ✨
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="glass" onClick={() => {}}>
                <Filter size={20} className="mr-2" />
                Filters
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4 mb-10"
          >
            <div className="glass px-8 py-4 rounded-2xl backdrop-blur-xl flex-1 card-hover-effect">
              <span className="text-sm text-gray-600 block mb-1">Liked</span>
              <div className="flex items-center gap-2">
                <Heart size={20} className="text-green-600 fill-green-600" />
                <span className="font-bold text-2xl text-green-600">{likedRooms.length}</span>
              </div>
            </div>
            <div className="glass px-8 py-4 rounded-2xl backdrop-blur-xl flex-1 card-hover-effect">
              <span className="text-sm text-gray-600 block mb-1">Passed</span>
              <div className="flex items-center gap-2">
                <X size={20} className="text-red-600" />
                <span className="font-bold text-2xl text-red-600">{passedRooms.length}</span>
              </div>
            </div>
            <div className="glass px-8 py-4 rounded-2xl backdrop-blur-xl flex-1 card-hover-effect">
              <span className="text-sm text-gray-600 block mb-1">Remaining</span>
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-primary" />
                <span className="font-bold text-2xl text-primary">{rooms.length - currentIndex}</span>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Card Stack */}
            <div className="flex-1 flex justify-center items-start">
              <div className="relative w-full max-w-sm h-[600px]">
                <AnimatePresence>
                  {currentIndex < rooms.length ? (
                    <>
                      {/* Stack preview cards */}
                      {currentIndex + 2 < rooms.length && (
                        <RoomCard
                          key={rooms[currentIndex + 2].id}
                          room={rooms[currentIndex + 2]}
                          onSwipe={() => {}}
                          style={{
                            scale: 0.9,
                            y: 20,
                            zIndex: 1,
                          }}
                        />
                      )}
                      {currentIndex + 1 < rooms.length && (
                        <RoomCard
                          key={rooms[currentIndex + 1].id}
                          room={rooms[currentIndex + 1]}
                          onSwipe={() => {}}
                          style={{
                            scale: 0.95,
                            y: 10,
                            zIndex: 2,
                          }}
                        />
                      )}
                      {/* Active card */}
                      <RoomCard
                        key={currentRoom.id}
                        room={currentRoom}
                        onSwipe={handleSwipe}
                        style={{ zIndex: 3 }}
                      />
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="text-center glass backdrop-blur-2xl p-16 rounded-3xl shadow-hard">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="inline-block mb-6"
                        >
                          <Sparkles className="w-20 h-20 text-primary" />
                        </motion.div>
                        <h2 className="text-4xl font-bold mb-4">
                          That's all for now! 🎉
                        </h2>
                        <p className="text-gray-600 mb-8 text-lg">
                          You've viewed all available rooms. Check back soon for more matches!
                        </p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button onClick={() => setCurrentIndex(0)} size="lg" className="glow-pulse">
                            <RotateCcw size={20} className="mr-2" />
                            Start Over
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sidebar - Liked Rooms */}
            <div className="lg:w-96">
              <div className="glass rounded-3xl p-8 sticky top-24 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20">
                    <Heart className="w-7 h-7 text-green-600 fill-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold">
                    Liked Rooms ({likedRooms.length})
                  </h3>
                </div>
                {likedRooms.length === 0 ? (
                  <div className="text-center py-12">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mb-4"
                    >
                      <Heart className="w-16 h-16 mx-auto text-gray-300" />
                    </motion.div>
                    <p className="text-gray-500 text-lg">
                      Start swiping to see your matches here!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {likedRooms.map((room, index) => (
                      <motion.div
                        key={room.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="frosted flex gap-4 p-4 rounded-2xl hover:scale-[1.02] cursor-pointer transition-all duration-300 border border-white/20"
                      >
                        <img
                          src={room.images[0]}
                          alt={room.title}
                          className="w-20 h-20 rounded-xl object-cover shadow-md"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-base truncate mb-1">
                            {room.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">{room.location}</p>
                          <p className="text-lg font-bold text-primary">
                            £{room.price}/mo
                          </p>
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
              className="flex justify-center gap-8 mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleButtonSwipe('left')}
                className="w-20 h-20 glass backdrop-blur-xl rounded-full shadow-medium flex items-center justify-center text-red-500 hover:shadow-lg transition-all duration-300 border-2 border-red-500/20 hover:border-red-500/40"
              >
                <X size={36} strokeWidth={2.5} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleUndo}
                disabled={currentIndex === 0}
                className="w-20 h-20 glass backdrop-blur-xl rounded-full shadow-medium flex items-center justify-center text-gray-400 hover:text-primary transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed border-2 border-gray-300/20 hover:border-primary/40"
              >
                <RotateCcw size={28} strokeWidth={2.5} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleButtonSwipe('right')}
                className="w-20 h-20 glass backdrop-blur-xl rounded-full shadow-medium flex items-center justify-center text-green-500 hover:shadow-lg transition-all duration-300 border-2 border-green-500/20 hover:border-green-500/40 glow-pulse"
              >
                <Heart size={36} strokeWidth={2.5} />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
