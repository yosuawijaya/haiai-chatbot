'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { user, userRole } = useAuth()
  const [activeTab, setActiveTab] = useState<'general' | 'account' | 'about'>('general')

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Settings</h2>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-2 mx-4 mt-4 bg-gray-100 rounded-xl">
              {(['general', 'account', 'about'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto max-h-[50vh]">
              {activeTab === 'general' && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Appearance</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Theme</span>
                      <select className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                        <option>System</option>
                        <option>Light</option>
                        <option>Dark</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Chat</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Send with Enter</span>
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-violet-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Show timestamps</span>
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-violet-500" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="space-y-4">
                  {user ? (
                    <>
                      <div className="p-4 bg-gray-50 rounded-2xl">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Profile</h3>
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                            {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{user.displayName || 'User'}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <span className="inline-block mt-1 px-2 py-0.5 bg-violet-100 text-violet-600 text-xs font-medium rounded-full">
                              {userRole || 'Member'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-2xl">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Account Info</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">User ID</span>
                            <span className="text-gray-700 font-mono text-xs">{user.uid.slice(0, 12)}...</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Provider</span>
                            <span className="text-gray-700">{user.providerData[0]?.providerId || 'email'}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <p className="text-gray-600 font-medium">Not logged in</p>
                      <p className="text-sm text-gray-400 mt-1">Login to manage your account</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'about' && (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/25">
                      <span className="text-white font-bold text-2xl">H</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">HaiAI</h3>
                    <p className="text-sm text-gray-500 mt-1">Version 1.0.0</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                      HaiAI is your intelligent assistant powered by advanced AI technology. 
                      Built with ❤️ for seamless conversations.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
