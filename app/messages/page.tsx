'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Phone, MoreVertical, Search, Shield, ChevronLeft, MessageCircle } from 'lucide-react'
import { mockUsers } from '@/lib/mockData'

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
  isOwn: boolean
}

const conversations = [
  {
    user: mockUsers[1],
    lastMessage: 'The sofa is still available! When would you like to pick it up?',
    timestamp: new Date('2024-01-15T14:30:00'),
    unread: 2,
  },
  {
    user: mockUsers[0],
    lastMessage: "Great! I'd love to view the room this weekend.",
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

function initialMessagesFor(userId: string): Message[] {
  return [
    { id: '1', sender: userId, content: "Hi! I saw you're interested in the sofa. Are you still looking?", timestamp: new Date('2024-01-15T14:00:00'), isOwn: false },
    { id: '2', sender: 'me', content: 'Yes, I am! It looks perfect for my new flat. Is it still available?', timestamp: new Date('2024-01-15T14:15:00'), isOwn: true },
    { id: '3', sender: userId, content: 'The sofa is still available! When would you like to pick it up?', timestamp: new Date('2024-01-15T14:30:00'), isOwn: false },
    { id: '4', sender: userId, content: "I'm in Shoreditch, so pickup would be from here. I can help you load it if needed!", timestamp: new Date('2024-01-15T14:31:00'), isOwn: false },
  ]
}

const fmtTime = (d: Date) => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [messageInput, setMessageInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const selectedUser = conversations.find(c => c.user.id === selectedId)?.user

  const openConversation = (userId: string) => {
    setSelectedId(userId)
    setMessages(initialMessagesFor(userId))
  }

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedId) return
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      content: messageInput.trim(),
      timestamp: new Date(),
      isOwn: true,
    }
    setMessages(prev => [...prev, newMessage])
    setMessageInput('')

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}-reply`,
        sender: selectedId,
        content: "Thanks for your message! I'll get back to you soon.",
        timestamp: new Date(),
        isOwn: false,
      }])
    }, 2000)
  }

  /* ── Shared sub-views ─────────────────────── */

  const ConversationList = ({ compact = false }: { compact?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className={compact ? 'p-3' : 'p-4'} style={{ borderBottom: '1px solid rgba(255,200,160,0.07)' }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" size={15} />
          <input
            className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm text-white placeholder:text-white/25 outline-none"
            style={{ background: 'rgba(255,248,240,0.05)', border: '1px solid rgba(255,200,160,0.08)' }}
            placeholder="Search messages…"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {conversations.map((c, i) => {
          const isActive = selectedId === c.user.id
          return (
            <motion.button
              key={c.user.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => openConversation(c.user.id)}
              className="w-full text-left p-3.5 flex items-start gap-3 transition-colors"
              style={{
                background: isActive ? 'linear-gradient(135deg, rgba(255,83,64,0.12), rgba(92,225,230,0.06))' : 'transparent',
                borderBottom: '1px solid rgba(255,200,160,0.05)',
                borderLeft: isActive ? '2px solid #FF5340' : '2px solid transparent',
              }}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={c.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.user.name}`}
                  alt={c.user.name}
                  className="w-11 h-11 rounded-full"
                  style={{ border: '1.5px solid rgba(255,200,160,0.15)' }}
                />
                {c.unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #E83D2A, #FF5340)' }}>
                    {c.unread}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-semibold text-sm text-white truncate">{c.user.name}</span>
                    {c.user.verified && <Shield size={12} style={{ color: '#6AE3E8' }} fill="currentColor" className="flex-shrink-0" />}
                  </div>
                  <span className="text-[10px] text-white/30 flex-shrink-0 ml-2">{fmtTime(c.timestamp)}</span>
                </div>
                <p className={`text-xs line-clamp-2 ${c.unread > 0 ? 'text-white/75 font-medium' : 'text-white/40'}`}>
                  {c.lastMessage}
                </p>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )

  const ChatView = ({ onBack }: { onBack?: () => void }) => (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,200,160,0.07)', background: 'rgba(255,248,240,0.03)' }}>
        <div className="flex items-center gap-3 min-w-0">
          {onBack && (
            <button onClick={onBack} className="p-1 -ml-1 text-white/50 hover:text-white transition-colors">
              <ChevronLeft size={22} />
            </button>
          )}
          <div className="relative flex-shrink-0">
            <img
              src={selectedUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser?.name}`}
              alt={selectedUser?.name}
              className="w-9 h-9 rounded-full"
              style={{ border: '1.5px solid rgba(255,200,160,0.15)' }}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full"
              style={{ background: '#34D399', border: '2px solid rgba(12,9,6,1)' }} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm text-white truncate">{selectedUser?.name}</span>
              {selectedUser?.verified && <Shield size={12} style={{ color: '#6AE3E8' }} fill="currentColor" />}
            </div>
            <span className="text-[11px]" style={{ color: '#34D399' }}>Online</span>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all">
            <Phone size={17} />
          </button>
          <button className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all">
            <MoreVertical size={17} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div className="max-w-[80%]">
              <div
                className="px-4 py-2.5 text-sm leading-relaxed break-words"
                style={message.isOwn ? {
                  background: 'linear-gradient(135deg, #E83D2A, #FF5340)',
                  color: '#fff',
                  borderRadius: '18px 18px 4px 18px',
                  boxShadow: '0 4px 16px rgba(255,83,64,0.25)',
                } : {
                  background: 'rgba(255,248,240,0.07)',
                  color: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(255,200,160,0.08)',
                  borderRadius: '18px 18px 18px 4px',
                }}
              >
                {message.content}
              </div>
              <span className={`text-[10px] text-white/25 mt-1 block px-1 ${message.isOwn ? 'text-right' : ''}`}>
                {fmtTime(message.timestamp)}
              </span>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,200,160,0.07)' }}>
        <div className="flex gap-2 items-center">
          <input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            className="flex-1 px-4 py-2.5 rounded-full text-sm text-white placeholder:text-white/25 outline-none"
            style={{ background: 'rgba(255,248,240,0.05)', border: '1px solid rgba(255,200,160,0.1)' }}
            placeholder="Type a message…"
          />
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white disabled:opacity-30 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #E83D2A, #FF5340, #5CE1E6)', boxShadow: '0 4px 14px rgba(255,83,64,0.3)' }}
          >
            <Send size={16} />
          </motion.button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen mesh-gradient">

      {/* ── MOBILE: list ⇄ full-screen chat ─── */}
      <div className="md:hidden">
        <AnimatePresence mode="wait">
          {!selectedId ? (
            <motion.div
              key="list"
              initial={{ x: -16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -16, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="px-4 pt-5"
            >
              <h1 className="text-2xl font-bold mb-0.5">
                <span className="gradient-text">Messages</span>
              </h1>
              <p className="text-white/45 text-sm mb-4">Chat with your matches</p>
              <div className="glass rounded-2xl overflow-hidden" style={{ height: 'calc(100vh - 220px)' }}>
                <ConversationList compact />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ x: 16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 16, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 flex flex-col"
              style={{ background: 'var(--color-background)' }}
            >
              <div className="pt-14 flex-1 flex flex-col min-h-0">
                <ChatView onBack={() => setSelectedId(null)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── DESKTOP: split pane ──────────────── */}
      <div className="hidden md:block px-8 py-6 h-screen">
        <div className="max-w-6xl mx-auto h-full flex flex-col">
          <div className="mb-5 flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-1">
              <span className="gradient-text">Messages</span>
            </h1>
            <p className="text-white/40 text-sm">Chat with matches and coordinate your move</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">
            {/* Conversations */}
            <div className="glass rounded-2xl overflow-hidden">
              <ConversationList />
            </div>

            {/* Chat area */}
            <div className="col-span-2 glass rounded-2xl overflow-hidden">
              {selectedUser ? (
                <ChatView />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, rgba(255,83,64,0.15), rgba(92,225,230,0.1))', border: '1px solid rgba(255,83,64,0.2)' }}>
                      <MessageCircle size={28} style={{ color: '#FF7A67' }} />
                    </div>
                    <p className="text-white/60 font-semibold text-sm">Select a conversation</p>
                    <p className="text-white/30 text-xs mt-1">Your chats with matches appear here</p>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
