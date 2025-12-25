'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, Phone, Video, MoreVertical, Search, Shield } from 'lucide-react'
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
              <span className="text-primary">Messages</span> 💬
            </h1>
            <p className="text-gray-600">
              Chat with matches and coordinate your move
            </p>
          </div>

          {/* Messages Interface */}
          <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
            {/* Conversations List */}
            <Card padding="none" className="overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-100">
                <Input
                  placeholder="Search messages..."
                  icon={<Search size={18} />}
                />
              </div>

              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <motion.div
                    key={conversation.user.id}
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    onClick={() => setSelectedConversation(conversation.user.id)}
                    className={`p-4 cursor-pointer border-b border-gray-100 transition-colors ${
                      selectedConversation === conversation.user.id
                        ? 'bg-secondary/5 border-l-4 border-l-secondary'
                        : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <img
                          src={conversation.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${conversation.user.name}`}
                          alt={conversation.user.name}
                          className="w-12 h-12 rounded-full"
                        />
                        {conversation.unread > 0 && (
                          <div className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                            {conversation.unread}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-sm">
                              {conversation.user.name}
                            </span>
                            {conversation.user.verified && (
                              <Shield className="text-secondary" size={12} fill="currentColor" />
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
            </Card>

            {/* Chat Area */}
            <Card padding="none" className="lg:col-span-2 overflow-hidden flex flex-col">
              {selectedUser ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.name}`}
                        alt={selectedUser.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{selectedUser.name}</span>
                          {selectedUser.verified && (
                            <Shield className="text-secondary" size={14} fill="currentColor" />
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {selectedUser.isLeaving ? 'Leaving London' : 'New to London'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Phone size={20} className="text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Video size={20} className="text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical size={20} className="text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/30">
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
                            className={`rounded-2xl px-4 py-2 ${
                              message.isOwn
                                ? 'bg-primary text-white rounded-br-sm'
                                : 'bg-white text-gray-900 rounded-bl-sm shadow-soft'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <span className="text-xs text-gray-500 mt-1 block px-2">
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
                  <div className="p-4 border-t border-gray-100 bg-white">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage}>
                        <Send size={20} />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <p>Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
