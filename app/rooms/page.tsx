'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X, RotateCcw, Filter, ArrowLeft } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-b from-background to-background-secondary">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <a href="/" className="flex items-center text-gray-600 hover:text-primary mb-4">
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
              </a>
              <h1 className="text-4xl font-bold mb-2">
                Find Your <span className="text-primary">Perfect Room</span>
              </h1>
              <p className="text-gray-600">
                Swipe right to like, left to pass. It's that simple!
              </p>
            </div>
            <Button variant="outline" onClick={() => {}}>
              <Filter size={20} className="mr-2" />
              Filters
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-4 mb-8">
            <div className="bg-white px-6 py-3 rounded-xl shadow-soft">
              <span className="text-sm text-gray-600">Liked: </span>
              <span className="font-bold text-green-600">{likedRooms.length}</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-xl shadow-soft">
              <span className="text-sm text-gray-600">Passed: </span>
              <span className="font-bold text-red-600">{passedRooms.length}</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-xl shadow-soft">
              <span className="text-sm text-gray-600">Remaining: </span>
              <span className="font-bold text-primary">{rooms.length - currentIndex}</span>
            </div>
          </div>

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
                      <div className="text-center bg-white p-12 rounded-3xl shadow-hard">
                        <h2 className="text-3xl font-bold mb-4">
                          That's all for now! 🎉
                        </h2>
                        <p className="text-gray-600 mb-6">
                          You've viewed all available rooms. Check back soon for more matches!
                        </p>
                        <Button onClick={() => setCurrentIndex(0)}>
                          <RotateCcw size={20} className="mr-2" />
                          Start Over
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sidebar - Liked Rooms */}
            <div className="lg:w-80">
              <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">
                  ❤️ Liked Rooms ({likedRooms.length})
                </h3>
                {likedRooms.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Start swiping to see your matches here!
                  </p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {likedRooms.map((room) => (
                      <div
                        key={room.id}
                        className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <img
                          src={room.images[0]}
                          alt={room.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">
                            {room.title}
                          </h4>
                          <p className="text-xs text-gray-600">{room.location}</p>
                          <p className="text-sm font-bold text-primary">
                            £{room.price}/mo
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {currentIndex < rooms.length && (
            <div className="flex justify-center gap-6 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleButtonSwipe('left')}
                className="w-16 h-16 bg-white rounded-full shadow-medium flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
              >
                <X size={32} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleUndo}
                disabled={currentIndex === 0}
                className="w-16 h-16 bg-white rounded-full shadow-medium flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw size={24} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleButtonSwipe('right')}
                className="w-16 h-16 bg-white rounded-full shadow-medium flex items-center justify-center text-green-500 hover:bg-green-50 transition-colors"
              >
                <Heart size={32} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
