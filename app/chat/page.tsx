'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedBackground from '@/components/AnimatedBackground'
import ChatHeader from '@/components/ChatHeader'
import ChatMessage from '@/components/ChatMessage'
import TypingIndicator from '@/components/TypingIndicator'
import SuggestionButtons from '@/components/SuggestionButtons'
import ChatInput from '@/components/ChatInput'
import Sidebar from '@/components/Sidebar'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('chatHistory')
    if (saved) {
      setChatHistory(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory))
    }
  }, [chatHistory])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const startNewChat = () => {
    if (messages.length > 0 && currentChatId) {
      setChatHistory(prev => 
        prev.map(chat => 
          chat.id === currentChatId 
            ? { ...chat, messages } 
            : chat
        )
      )
    }
    
    setMessages([])
    setShowWelcome(true)
    setCurrentChatId(null)
  }

  const selectChat = (id: string) => {
    const chat = chatHistory.find(c => c.id === id)
    if (chat) {
      setMessages(chat.messages)
      setCurrentChatId(id)
      setShowWelcome(false)
    }
  }

  const deleteChat = (id: string) => {
    setChatHistory(prev => {
      const updated = prev.filter(chat => chat.id !== id)
      if (updated.length === 0) {
        localStorage.removeItem('chatHistory')
      } else {
        localStorage.setItem('chatHistory', JSON.stringify(updated))
      }
      return updated
    })
    
    if (currentChatId === id) {
      setMessages([])
      setShowWelcome(true)
      setCurrentChatId(null)
    }
  }

  const sendMessage = async (content: string, attachments?: File[]) => {
    if (!content.trim() && (!attachments || attachments.length === 0)) return

    setShowWelcome(false)

    let messageContent = content.trim()
    if (attachments && attachments.length > 0) {
      const fileNames = attachments.map(f => f.name).join(', ')
      messageContent = messageContent 
        ? `${messageContent}\n\n📎 Attached: ${fileNames}`
        : `📎 Attached: ${fileNames}`
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      isUser: true,
      timestamp: new Date(),
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setIsTyping(true)

    if (!currentChatId) {
      const newChatId = Date.now().toString()
      const newChat: ChatSession = {
        id: newChatId,
        title: content.trim().slice(0, 30) + (content.length > 30 ? '...' : ''),
        messages: newMessages,
        timestamp: new Date()
      }
      setChatHistory(prev => [newChat, ...prev])
      setCurrentChatId(newChatId)
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content.trim(),
          history: messages.slice(-10)
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response')
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      }
      
      const updatedMessages = [...newMessages, aiMessage]
      setMessages(updatedMessages)

      if (currentChatId) {
        setChatHistory(prev =>
          prev.map(chat =>
            chat.id === currentChatId
              ? { ...chat, messages: updatedMessages }
              : chat
          )
        )
      }

    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error ? error.message : 'Sorry, something went wrong. Please try again.',
        isUser: false,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center p-2 sm:p-4">
      <AnimatedBackground />
      
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={startNewChat}
        chatHistory={chatHistory.map(c => ({ id: c.id, title: c.title, timestamp: c.timestamp }))}
        onSelectChat={selectChat}
        onDeleteChat={deleteChat}
        currentChatId={currentChatId}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass relative z-10 w-full h-[98vh] sm:h-[92vh] 
          max-w-full sm:max-w-[440px] lg:max-w-[900px] xl:max-w-[1100px] 2xl:max-w-[1300px]
          sm:max-h-[860px] lg:max-h-[900px]
          rounded-[24px] sm:rounded-[36px] 
          flex flex-col overflow-hidden"
      >
        <ChatHeader onMenuClick={() => setSidebarOpen(true)} />

        <div 
          ref={chatRef}
          className="flex-1 overflow-y-auto chat-scroll px-4 sm:px-6 lg:px-12 py-4 flex flex-col"
        >
          <AnimatePresence mode="wait">
            {showWelcome && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col items-center justify-center"
              >
                <h1 className="text-[22px] sm:text-[26px] lg:text-[32px] font-semibold gradient-text tracking-tight text-center">
                  What can I help with?
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-4 lg:gap-5">
            <AnimatePresence>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </AnimatePresence>
            
            {isTyping && <TypingIndicator />}
          </div>
        </div>

        <AnimatePresence>
          {showWelcome && (
            <SuggestionButtons onSelect={sendMessage} />
          )}
        </AnimatePresence>

        <ChatInput onSend={sendMessage} />
      </motion.div>
    </main>
  )
}
