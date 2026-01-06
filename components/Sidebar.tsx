'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import AuthModal from './AuthModal'
import SettingsModal from './SettingsModal'
import HelpModal from './HelpModal'

interface ChatHistory {
  id: string
  title: string
  timestamp: Date
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onNewChat: () => void
  chatHistory: ChatHistory[]
  onSelectChat: (id: string) => void
  onDeleteChat: (id: string) => void
  currentChatId: string | null
}

export default function Sidebar({ 
  isOpen, 
  onClose, 
  onNewChat, 
  chatHistory, 
  onSelectChat,
  onDeleteChat,
  currentChatId 
}: SidebarProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const { user, userRole, logout, loading } = useAuth()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-md z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 300,
              opacity: { duration: 0.2 }
            }}
            className="fixed left-0 top-0 h-full w-[300px] sm:w-[340px] bg-gradient-to-b from-white to-gray-50/95 backdrop-blur-xl shadow-2xl z-50 flex flex-col border-r border-gray-200/50"
          >
        {/* Header with User Profile */}
        <div className="p-5 pb-4">
          <div className="flex items-center justify-between mb-6">
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gray-200 animate-pulse" />
                <div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1" />
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ) : user ? (
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/25">
                  {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-gray-800">{user.displayName || 'User'}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {userRole || 'Member'}
                  </p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-3 hover:bg-black/5 rounded-xl px-2 py-1.5 -ml-2 transition-all"
              >
                <div className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-[15px] font-semibold text-violet-600">Login / Register</p>
                  <p className="text-xs text-gray-400">Sign in to sync chats</p>
                </div>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-black/5 rounded-xl transition-all duration-200 active:scale-95"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => { onNewChat(); onClose() }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white px-4 py-3.5 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span className="font-semibold text-[15px]">New Chat</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-3">
          <div className="flex items-center gap-2 px-2 mb-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent Chats</p>
          </div>
          
          {chatHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500 text-center">No conversations yet</p>
              <p className="text-xs text-gray-400 text-center mt-1">Start a new chat to begin</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {chatHistory.map((chat) => (
                <div key={chat.id} className="relative">
                  <button
                    onClick={() => { onSelectChat(chat.id); onClose() }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-start gap-3 active:scale-[0.99] ${
                      currentChatId === chat.id 
                        ? 'bg-white shadow-md shadow-gray-200/50 border border-gray-100' 
                        : 'hover:bg-white/60'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      currentChatId === chat.id ? 'bg-violet-100 text-violet-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0 pr-8">
                      <p className={`text-sm font-medium truncate ${currentChatId === chat.id ? 'text-gray-800' : 'text-gray-600'}`}>{chat.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(chat.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </button>
                  
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteConfirm(chat.id) }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 active:scale-90"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-100 space-y-1">
          <button 
            onClick={() => setShowSettingsModal(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:text-gray-800 hover:bg-black/[0.03] transition-all duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span className="text-sm font-medium">Settings</span>
          </button>
          
          <button 
            onClick={() => setShowHelpModal(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:text-gray-800 hover:bg-black/[0.03] transition-all duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span className="text-sm font-medium">Help & FAQ</span>
          </button>

          {user && (
            <button 
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="text-sm font-medium">Logout</span>
            </button>
          )}
        </div>
          </motion.div>

          {/* Auth Modal */}
          <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
          
          {/* Settings Modal */}
          <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
          
          {/* Help Modal */}
          <HelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />

          {/* Delete Confirmation Dialog */}
          <AnimatePresence>
            {deleteConfirm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
                onClick={() => setDeleteConfirm(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-[340px]"
                >
                  <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-2xl mx-auto mb-5">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Delete Chat?</h3>
                  <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
                    This conversation will be permanently deleted. This action cannot be undone.
                  </p>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors active:scale-[0.98]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => { onDeleteChat(deleteConfirm); setDeleteConfirm(null) }}
                      className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-red-500/25 active:scale-[0.98]"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
