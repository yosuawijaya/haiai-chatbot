'use client'

import { motion } from 'framer-motion'

interface ChatHeaderProps {
  onMenuClick: () => void
}

export default function ChatHeader({ onMenuClick }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 lg:px-12 py-4 sm:py-5">
      <motion.button 
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.05)' }}
        whileTap={{ scale: 0.95 }}
        onClick={onMenuClick}
        className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors rounded-xl"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      </motion.button>

      <h2 className="text-base sm:text-lg font-medium text-gray-700">HaiAI</h2>

      <div className="w-10 sm:w-11" />
    </header>
  )
}
