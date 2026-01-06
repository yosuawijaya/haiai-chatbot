'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ChatInputProps {
  onSend: (message: string, attachments?: File[]) => void
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [attachments, setAttachments] = useState<File[]>([])
  const [showAddMenu, setShowAddMenu] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (input.trim() || attachments.length > 0) {
      onSend(input, attachments)
      setInput('')
      setAttachments([])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAttachments(prev => [...prev, ...files])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const MenuIcon = ({ path }: { path: string }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
      <path d={path} />
    </svg>
  )

  const addMenuItems = [
    { 
      icon: <MenuIcon path="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
      label: 'Photo', 
      action: () => fileInputRef.current?.click() 
    },
    { 
      icon: <MenuIcon path="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" />,
      label: 'Document', 
      action: () => fileInputRef.current?.click() 
    },
    { 
      icon: <MenuIcon path="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />,
      label: 'Link', 
      action: () => console.log('Add link') 
    },
  ]

  const moreMenuItems = [
    { 
      icon: <MenuIcon path="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v4 M8 23h8" />,
      label: 'Voice message', 
      action: () => console.log('Voice') 
    },
    { 
      icon: <MenuIcon path="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />,
      label: 'Location', 
      action: () => console.log('Location') 
    },
    { 
      icon: <MenuIcon path="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18" />,
      label: 'Schedule', 
      action: () => console.log('Schedule') 
    },
  ]

  return (
    <div className="px-3 sm:px-5 lg:px-12 pb-4 sm:pb-5 pt-2 sm:pt-3">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        multiple
        className="hidden"
        accept="image/*,.pdf,.doc,.docx,.txt"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          relative bg-white/80 border rounded-[22px] sm:rounded-[26px] 
          transition-all duration-300 ease-out
          ${isFocused 
            ? 'border-gray-300 shadow-lg shadow-gray-200/60 bg-white/95' 
            : 'border-gray-200/70 hover:border-gray-200 hover:bg-white/90'
          }
        `}
      >
        {/* Attachments Preview */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 px-4 pt-3">
            {attachments.map((file, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5 text-sm">
                <span className="text-gray-600 truncate max-w-[120px]">{file.name}</span>
                <button
                  onClick={() => removeAttachment(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center px-4 sm:px-5 py-2.5 sm:py-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask anything"
            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-[14px] sm:text-[15px] font-normal"
          />
        </div>

        <div className="flex items-center justify-between px-2 sm:px-3 pb-2.5 sm:pb-3">
          <div className="flex items-center gap-0 relative">
            {/* Attach Button */}
            <motion.button
              whileHover={{ scale: 1.08, backgroundColor: 'rgba(0,0,0,0.04)' }}
              whileTap={{ scale: 0.92 }}
              onClick={() => fileInputRef.current?.click()}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full transition-colors"
              title="Attach"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
              </svg>
            </motion.button>

            {/* Add Button with Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.08, backgroundColor: 'rgba(0,0,0,0.04)' }}
                whileTap={{ scale: 0.92 }}
                onClick={() => { setShowAddMenu(!showAddMenu); setShowMoreMenu(false) }}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full transition-colors"
                title="Add"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </motion.button>
              
              <AnimatePresence>
                {showAddMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 min-w-[140px] z-50"
                  >
                    {addMenuItems.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => { item.action(); setShowAddMenu(false) }}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* More Button with Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.08, backgroundColor: 'rgba(0,0,0,0.04)' }}
                whileTap={{ scale: 0.92 }}
                onClick={() => { setShowMoreMenu(!showMoreMenu); setShowAddMenu(false) }}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full transition-colors"
                title="More"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </motion.button>
              
              <AnimatePresence>
                {showMoreMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 min-w-[160px] z-50"
                  >
                    {moreMenuItems.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => { item.action(); setShowMoreMenu(false) }}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleSubmit}
            className={`
              w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center 
              transition-all duration-200 shadow-md
              ${input.trim() || attachments.length > 0
                ? 'bg-gray-800 hover:bg-gray-900 text-white hover:shadow-lg' 
                : 'bg-gray-800 text-white'
              }
            `}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      <p className="text-center text-[10px] sm:text-[11px] text-gray-400 mt-2.5 sm:mt-3 tracking-wide">
        AI can make mistakes. Please double-check responses.
      </p>
    </div>
  )
}
