'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [showActions, setShowActions] = useState(false)

  const formatContent = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  if (message.isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-end"
      >
        <div className="max-w-[85%] lg:max-w-[70%] bg-gradient-to-br from-gray-700 via-gray-750 to-gray-800 text-white px-4 sm:px-5 py-3 sm:py-3.5 rounded-[20px] sm:rounded-[22px] rounded-br-md shadow-lg">
          <p className="text-[14px] sm:text-[15px] leading-relaxed">{message.content}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, x: -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex justify-start"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="max-w-[92%] lg:max-w-[75%]">
        <div className="text-gray-800 text-[14px] sm:text-[15px] leading-[1.7]">
          {formatContent(message.content)}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: showActions ? 1 : 0 }}
          className="flex gap-1.5 mt-2"
        >
          {[
            { icon: 'M9 9h13v13H9zM5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1', title: 'Copy' },
            { icon: 'M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3', title: 'Like' },
            { icon: 'M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3zm7-13h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17', title: 'Dislike' },
            { icon: 'M23 4v6h-6M20.49 15a9 9 0 11-2.12-9.36L23 10', title: 'Regenerate' },
          ].map((action, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.06)' }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              title={action.title}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={action.icon} />
              </svg>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
