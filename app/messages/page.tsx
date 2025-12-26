'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Send, Phone, Video, MoreVertical, Search, Shield, Smile, ChevronLeft, User, Bell, Archive, Trash2 } from 'lucide-react'
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
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messageInput, setMessageInput] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

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

  // Load initial messages when conversation is selected
  const loadInitialMessages = (userId: string) => {
    const initialMessages: Message[] = [
      {
        id: '1',
        sender: userId,
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
        sender: userId,
        content: 'The sofa is still available! When would you like to pick it up?',
        timestamp: new Date('2024-01-15T14:30:00'),
        isOwn: false,
      },
      {
        id: '4',
        sender: userId,
        content: 'I\'m in Shoreditch, so pickup would be from here. I can help you load it if needed!',
        timestamp: new Date('2024-01-15T14:31:00'),
        isOwn: false,
      },
    ]
    setMessages(initialMessages)
  }

  const selectedUser = conversations.find(c => c.user.id === selectedConversation)?.user

  // Load messages when conversation changes
  if (selectedConversation && messages.length === 0) {
    loadInitialMessages(selectedConversation)
  }

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      content: messageInput.trim(),
      timestamp: new Date(),
      isOwn: true,
    }

    setMessages([...messages, newMessage])
    setMessageInput('')

    // Simulate reply after 2 seconds
    setTimeout(() => {
      const replyMessage: Message = {
        id: `msg-${Date.now()}-reply`,
        sender: selectedConversation,
        content: 'Thanks for your message! I\'ll get back to you soon.',
        timestamp: new Date(),
        isOwn: false,
      }
      setMessages(prev => [...prev, replyMessage])
    }, 2000)
  }

  return (
    <div className="min-h-screen mesh-gradient overflow-hidden">
      <Navbar />

      {/* Mobile: Full-screen conversation or chat view */}
      <div className="md:hidden">
        <AnimatePresence mode="wait">
          {!selectedConversation ? (
            // Conversation List (Mobile)
            <motion.div
              key="list"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pt-16 pb-20 px-2"
            >
              <div className="max-w-2xl mx-auto">
                {/* Mobile Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 px-2"
                >
                  <h1 className="text-3xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Messages</span>
                  </h1>
                  <p className="text-gray-600">Chat with your matches</p>
                </motion.div>

                {/* Search */}
                <div className="mb-4 px-2">
                  <Input
                    placeholder="Search messages..."
                    icon={<Search size={18} />}
                    className="glass backdrop-blur-xl"
                  />
                </div>

                {/* Conversation List */}
                <div className="space-y-2">
                  {conversations.map((conversation, index) => (
                    <motion.div
                      key={conversation.user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedConversation(conversation.user.id)
                        setMessages([])
                      }}
                      className="glass rounded-2xl p-4 cursor-pointer backdrop-blur-xl active:bg-white/30"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
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
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-base truncate">
                                {conversation.user.name}
                              </span>
                              {conversation.user.verified && (
                                <Shield className="text-secondary flex-shrink-0" size={14} fill="currentColor" />
                              )}
                            </div>
                            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
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
            </motion.div>
          ) : (
            // Full-Page Chat View (Mobile)
            <motion.div
              key="chat"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background z-50 flex flex-col"
            >
              {/* Chat Header */}
              <div className="pt-16 pb-3 px-4 border-b border-gray-200 frosted backdrop-blur-xl flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedConversation(null)}
                    className="p-2 hover:bg-white/20 rounded-xl transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <ChevronLeft size={24} className="text-gray-700" />
                  </motion.button>
                  <div className="relative flex-shrink-0">
                    <img
                      src={selectedUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser?.name}`}
                      alt={selectedUser?.name}
                      className="w-10 h-10 rounded-full ring-2 ring-white/50"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-base truncate">{selectedUser?.name}</span>
                      {selectedUser?.verified && (
                        <Shield className="text-secondary flex-shrink-0" size={14} fill="currentColor" />
                      )}
                    </div>
                    <span className="text-xs text-gray-500 truncate block">Online</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-white/20 rounded-xl transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <Phone size={18} className="text-gray-600" />
                  </motion.button>
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowMenu(!showMenu)}
                      className="p-2 hover:bg-white/20 rounded-xl transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <MoreVertical size={18} className="text-gray-600" />
                    </motion.button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {showMenu && (
                        <>
                          {/* Backdrop */}
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowMenu(false)}
                          />
                          {/* Menu */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-12 z-50 w-56 glass backdrop-blur-xl rounded-2xl shadow-hard border border-white/30 overflow-hidden"
                          >
                            <div className="py-2">
                              <button
                                onClick={() => setShowMenu(false)}
                                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/20 transition-colors text-left"
                              >
                                <User size={18} className="text-gray-600" />
                                <span className="text-sm font-medium">View Profile</span>
                              </button>
                              <button
                                onClick={() => setShowMenu(false)}
                                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/20 transition-colors text-left"
                              >
                                <Bell size={18} className="text-gray-600" />
                                <span className="text-sm font-medium">Mute</span>
                              </button>
                              <button
                                onClick={() => setShowMenu(false)}
                                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/20 transition-colors text-left"
                              >
                                <Archive size={18} className="text-gray-600" />
                                <span className="text-sm font-medium">Archive</span>
                              </button>
                              <div className="border-t border-white/20 my-1" />
                              <button
                                onClick={() => setShowMenu(false)}
                                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors text-left text-red-600"
                              >
                                <Trash2 size={18} />
                                <span className="text-sm font-medium">Delete Chat</span>
                              </button>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-3 bg-gradient-to-b from-white/5 to-white/10 overscroll-contain">
                {!selectedConversation ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center glass backdrop-blur-xl p-8 rounded-3xl">
                      <div className="text-6xl mb-4">👈</div>
                      <p className="text-gray-600 font-semibold">Select a conversation to start chatting</p>
                    </div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center glass backdrop-blur-xl p-8 rounded-3xl">
                      <div className="text-6xl mb-4">💬</div>
                      <p className="text-gray-600">Loading messages...</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] ${message.isOwn ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`rounded-3xl px-4 py-3 shadow-md ${
                          message.isOwn
                            ? 'bg-gradient-to-br from-primary to-secondary text-white rounded-br-md'
                            : 'glass backdrop-blur-xl text-gray-900 rounded-bl-md border border-white/30'
                        }`}
                      >
                        <p className="text-sm leading-relaxed break-words">{message.content}</p>
                      </div>
                      <span className="text-xs text-gray-500 mt-1.5 block px-2">
                        {message.timestamp.toLocaleTimeString('en-GB', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </motion.div>
                ))}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Message Input - Minimalist */}
              <div className="p-3 pb-20 bg-white border-t border-gray-100">
                <div className="flex gap-2 items-center">
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    disabled={!selectedConversation}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-full focus:border-gray-300 focus:outline-none resize-none text-sm bg-white disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                    rows={1}
                    style={{ maxHeight: '100px' }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim() || !selectedConversation}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      messageInput.trim() && selectedConversation
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop: Original split-screen layout */}
      <div className="hidden md:block pt-16 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <a href="/" className="flex items-center text-gray-600 hover:text-primary mb-4 transition-all hover:translate-x-1">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </a>
            <h1 className="text-6xl font-bold mb-3 leading-tight text-gray-900">
              Messages
            </h1>
            <p className="text-gray-500 text-xl">
              Chat with matches and coordinate your move
            </p>
          </motion.div>

          {/* Messages Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid lg:grid-cols-3 gap-6 h-[700px]"
          >
            {/* Conversations List */}
            <div className="glass rounded-3xl overflow-hidden flex flex-col backdrop-blur-xl">
              <div className="p-6 border-b border-white/20">
                <Input
                  placeholder="Search messages..."
                  icon={<Search size={18} />}
                  className="glass backdrop-blur-xl"
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
                    onClick={() => {
                      setSelectedConversation(conversation.user.id)
                      setMessages([])
                    }}
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
                  <div className="p-6 border-b border-white/20 flex items-center justify-between frosted">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <img
                          src={selectedUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.name}`}
                          alt={selectedUser.name}
                          className="w-12 h-12 rounded-full ring-2 ring-white/50"
                        />
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-lg truncate">{selectedUser.name}</span>
                          {selectedUser.verified && (
                            <Shield className="text-secondary flex-shrink-0" size={14} fill="currentColor" />
                          )}
                        </div>
                        <span className="text-sm text-gray-500 truncate block">
                          {selectedUser.isLeaving ? 'Leaving London' : 'New to London'} • Online
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 hover:bg-white/20 rounded-xl transition-all duration-300"
                      >
                        <Phone size={20} className="text-gray-600" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 hover:bg-white/20 rounded-xl transition-all duration-300"
                      >
                        <Video size={20} className="text-gray-600" />
                      </motion.button>
                      <div className="relative">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setShowMenu(!showMenu)}
                          className="p-3 hover:bg-white/20 rounded-xl transition-all duration-300"
                        >
                          <MoreVertical size={20} className="text-gray-600" />
                        </motion.button>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {showMenu && (
                            <>
                              <div
                                className="fixed inset-0 z-40"
                                onClick={() => setShowMenu(false)}
                              />
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-14 z-50 w-56 glass backdrop-blur-xl rounded-2xl shadow-hard border border-white/30 overflow-hidden"
                              >
                                <div className="py-2">
                                  <button
                                    onClick={() => setShowMenu(false)}
                                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/20 transition-colors text-left"
                                  >
                                    <User size={18} className="text-gray-600" />
                                    <span className="text-sm font-medium">View Profile</span>
                                  </button>
                                  <button
                                    onClick={() => setShowMenu(false)}
                                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/20 transition-colors text-left"
                                  >
                                    <Bell size={18} className="text-gray-600" />
                                    <span className="text-sm font-medium">Mute Notifications</span>
                                  </button>
                                  <button
                                    onClick={() => setShowMenu(false)}
                                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/20 transition-colors text-left"
                                  >
                                    <Archive size={18} className="text-gray-600" />
                                    <span className="text-sm font-medium">Archive Chat</span>
                                  </button>
                                  <div className="border-t border-white/20 my-1" />
                                  <button
                                    onClick={() => setShowMenu(false)}
                                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors text-left text-red-600"
                                  >
                                    <Trash2 size={18} />
                                    <span className="text-sm font-medium">Delete Chat</span>
                                  </button>
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-4 bg-gradient-to-b from-white/5 to-white/10 overscroll-contain">
                    {!selectedConversation ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center glass backdrop-blur-xl p-12 rounded-3xl">
                          <div className="text-8xl mb-6">👈</div>
                          <p className="text-gray-600 text-xl font-semibold">Select a conversation to start chatting</p>
                        </div>
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center glass backdrop-blur-xl p-12 rounded-3xl">
                          <div className="text-8xl mb-6">💬</div>
                          <p className="text-gray-600 text-xl">Loading messages...</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] ${message.isOwn ? 'order-2' : 'order-1'}`}>
                          <div
                            className={`rounded-3xl px-6 py-3 shadow-md ${
                              message.isOwn
                                ? 'bg-gradient-to-br from-primary to-secondary text-white rounded-br-md'
                                : 'glass backdrop-blur-xl text-gray-900 rounded-bl-md border border-white/30'
                            }`}
                          >
                            <p className="text-base leading-relaxed break-words">{message.content}</p>
                          </div>
                          <span className="text-xs text-gray-500 mt-1.5 block px-3">
                            {message.timestamp.toLocaleTimeString('en-GB', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>

                  {/* Message Input - Minimalist */}
                  <div className="p-4 bg-white border-t border-gray-100">
                    <div className="flex gap-3 items-center">
                      <textarea
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                        disabled={!selectedConversation}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:border-gray-300 focus:outline-none resize-none text-sm bg-white disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                        rows={1}
                        style={{ maxHeight: '100px' }}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim() || !selectedConversation}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          messageInput.trim() && selectedConversation
                            ? 'bg-primary text-white hover:bg-primary/90'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Send size={18} />
                      </button>
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
