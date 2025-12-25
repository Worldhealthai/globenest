'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, Phone, Video, MoreVertical, Search, Shield, Smile } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { mockUsers } from '@/lib/mockData'

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
  isOwn: boolean
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(mockUsers[1].id)
  const [messageInput, setMessageInput] = useState('')

  // Mock conversations
  const conversations = [
    {
      user: mockUsers[1],
      lastMessage: 'The sofa is still available! When would you like to pick it up?',
      timestamp: new Date('2024-01-15T14:30:00'),
      unread: 2,
    },
    {
      user: mockUsers[0],
      lastMessage: 'Great! I\'d love to view the room this weekend.',
      timestamp: new Date('2024-01-15T12:15:00'),
      unread: 0,
    },
    {
      user: mockUsers[2],
      lastMessage: 'Thanks for the info about the area!',
      timestamp: new Date('2024-01-14T18:45:00'),
      unread: 0,
    },
  ]

  // Mock messages for selected conversation
  const messages: Message[] = [
    {
      id: '1',
      sender: mockUsers[1].id,
      content: 'Hi! I saw you\'re interested in the sofa. Are you still looking?',
      timestamp: new Date('2024-01-15T14:00:00'),
      isOwn: false,
    },
    {
      id: '2',
      sender: 'me',
      content: 'Yes, I am! It looks perfect for my new flat. Is it still available?',
      timestamp: new Date('2024-01-15T14:15:00'),
      isOwn: true,
    },
    {
      id: '3',
      sender: mockUsers[1].id,
      content: 'The sofa is still available! When would you like to pick it up?',
      timestamp: new Date('2024-01-15T14:30:00'),
      isOwn: false,
    },
    {
      id: '4',
      sender: mockUsers[1].id,
      content: 'I\'m in Shoreditch, so pickup would be from here. I can help you load it if needed!',
      timestamp: new Date('2024-01-15T14:31:00'),
      isOwn: false,
    },
  ]

  const selectedUser = conversations.find(c => c.user.id === selectedConversation)?.user

  const handleSendMessage = () => {
    if (!messageInput.trim()) return
    // Add message logic here
    setMessageInput('')
  }

  return (
    <div className="min-h-screen mesh-gradient overflow-hidden">
      <Navbar />

      <div className="pt-20 md:pt-24 pb-0 md:pb-12 px-2 md:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header - Hidden on mobile to save space */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:block mb-10"
          >
            <a href="/" className="flex items-center text-gray-600 hover:text-primary mb-4 transition-all hover:translate-x-1">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </a>
            <h1 className="text-6xl font-bold mb-3 leading-tight">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Messages</span> 💬
            </h1>
            <p className="text-gray-600 text-xl">
              Chat with matches and coordinate your move ✨
            </p>
          </motion.div>

          {/* Messages Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)] md:h-[700px]"
          >
            {/* Conversations List */}
            <div className="glass rounded-3xl overflow-hidden flex flex-col backdrop-blur-xl">
              <div className="p-4 md:p-6 border-b border-white/20">
                <Input
                  placeholder="Search messages..."
                  icon={<Search size={18} />}
                  className="glass backdrop-blur-xl text-sm md:text-base"
                />
              </div>

              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation, index) => (
                  <motion.div
                    key={conversation.user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedConversation(conversation.user.id)}
                    className={`p-5 cursor-pointer border-b border-white/10 transition-all duration-300 ${
                      selectedConversation === conversation.user.id
                        ? 'frosted border-l-4 border-l-secondary shadow-md'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={conversation.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${conversation.user.name}`}
                          alt={conversation.user.name}
                          className="w-14 h-14 rounded-full ring-2 ring-white/30"
                        />
                        {conversation.unread > 0 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 bg-gradient-to-r from-primary to-secondary text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg"
                          >
                            {conversation.unread}
                          </motion.div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-base">
                              {conversation.user.name}
                            </span>
                            {conversation.user.verified && (
                              <Shield className="text-secondary" size={14} fill="currentColor" />
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {conversation.timestamp.toLocaleTimeString('en-GB', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className={`text-sm line-clamp-2 ${
                          conversation.unread > 0 ? 'font-medium text-gray-900' : 'text-gray-600'
                        }`}>
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2 glass rounded-3xl overflow-hidden flex flex-col backdrop-blur-xl">
              {selectedUser ? (
                <>
                  {/* Chat Header */}
                  <div className="p-3 md:p-6 border-b border-white/20 flex items-center justify-between frosted">
                    <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <img
                          src={selectedUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.name}`}
                          alt={selectedUser.name}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full ring-2 ring-white/50"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-sm md:text-lg truncate">{selectedUser.name}</span>
                          {selectedUser.verified && (
                            <Shield className="text-secondary flex-shrink-0" size={14} fill="currentColor" />
                          )}
                        </div>
                        <span className="text-xs md:text-sm text-gray-500 truncate block">
                          {selectedUser.isLeaving ? 'Leaving London' : 'New to London'} • Online
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 md:p-3 hover:bg-white/20 rounded-xl transition-all duration-300"
                      >
                        <Phone size={18} className="text-gray-600 md:w-5 md:h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="hidden md:flex p-3 hover:bg-white/20 rounded-xl transition-all duration-300"
                      >
                        <Video size={20} className="text-gray-600" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 md:p-3 hover:bg-white/20 rounded-xl transition-all duration-300"
                      >
                        <MoreVertical size={18} className="text-gray-600 md:w-5 md:h-5" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 space-y-3 md:space-y-4 bg-gradient-to-b from-white/5 to-white/10 overscroll-contain">
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[85%] md:max-w-[70%] ${message.isOwn ? 'order-2' : 'order-1'}`}>
                          <div
                            className={`rounded-3xl px-4 md:px-6 py-3 shadow-md ${
                              message.isOwn
                                ? 'bg-gradient-to-br from-primary to-secondary text-white rounded-br-md'
                                : 'glass backdrop-blur-xl text-gray-900 rounded-bl-md border border-white/30'
                            }`}
                          >
                            <p className="text-sm md:text-base leading-relaxed break-words">{message.content}</p>
                          </div>
                          <span className="text-xs text-gray-500 mt-1.5 block px-2 md:px-3">
                            {message.timestamp.toLocaleTimeString('en-GB', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-3 md:p-6 border-t border-white/20 frosted">
                    <div className="flex gap-2 md:gap-3 items-center">
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="hidden md:flex p-3 glass backdrop-blur-xl rounded-2xl hover:shadow-md transition-all duration-300"
                      >
                        <Smile size={24} className="text-gray-600" />
                      </motion.button>
                      <Input
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 glass backdrop-blur-xl text-sm md:text-base min-h-[44px]"
                      />
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button onClick={handleSendMessage} className="glow-pulse min-h-[44px] px-4 md:px-6">
                          <Send size={18} className="md:w-5 md:h-5" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="text-8xl mb-6">💬</div>
                    <p className="text-2xl font-medium">Select a conversation to start messaging</p>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
