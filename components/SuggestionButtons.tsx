'use client'

import { motion } from 'framer-motion'

interface SuggestionButtonsProps {
  onSelect: (text: string) => void
}

const suggestions = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: "What's causing this error?",
    desc: "Debug and fix issues"
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: "Help me write better code",
    desc: "Improve code quality"
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    title: "Explain this concept",
    desc: "Learn something new"
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    title: "Design a solution",
    desc: "Architecture & planning"
  },
]

export default function SuggestionButtons({ onSelect }: SuggestionButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="px-4 sm:px-6 lg:px-12 pb-4 lg:pb-6"
    >
      {/* Mobile: horizontal scroll pills */}
      <div className="flex flex-wrap gap-2 justify-center lg:hidden">
        {suggestions.map((item, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(item.title)}
            className="bg-white/70 hover:bg-white/90 border border-gray-200/80 rounded-2xl px-4 py-2.5 text-[13px] text-gray-700 transition-all duration-200"
          >
            {item.title}
          </motion.button>
        ))}
      </div>

      {/* Desktop: 4 big cards grid */}
      <div className="hidden lg:grid grid-cols-2 gap-3">
        {suggestions.map((item, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ 
              scale: 1.02, 
              backgroundColor: 'rgba(255,255,255,0.95)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(item.title)}
            className="bg-white/70 hover:bg-white/90 border border-gray-200/80 rounded-2xl p-5 text-left transition-all duration-200 group"
          >
            <div className="flex items-start gap-4">
              <div className="text-gray-400 group-hover:text-gray-600 transition-colors mt-0.5">
                {item.icon}
              </div>
              <div>
                <p className="text-[15px] font-medium text-gray-800 mb-1">{item.title}</p>
                <p className="text-[13px] text-gray-500">{item.desc}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
