'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

const faqs = [
  {
    question: 'What is HaiAI?',
    answer: 'HaiAI is an intelligent AI assistant that can help you with various tasks, answer questions, and have natural conversations.'
  },
  {
    question: 'How do I start a new conversation?',
    answer: 'Click the "New Chat" button in the sidebar or simply start typing in the chat input to begin a new conversation.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, your conversations are stored securely. We use Firebase for authentication and data storage with industry-standard security practices.'
  },
  {
    question: 'Can I delete my chat history?',
    answer: 'Yes, you can delete individual chats by clicking the trash icon next to each conversation in the sidebar.'
  },
  {
    question: 'What are the different user roles?',
    answer: 'There are two roles: Member (default) and Admin. Admins have access to additional features and management capabilities.'
  },
  {
    question: 'How do I contact support?',
    answer: 'You can reach out to us via email at support@haiai.com or through our social media channels.'
  }
]

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

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
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-violet-600">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Help & FAQ</h2>
              </div>
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

            {/* Content */}
            <div className="p-5 overflow-y-auto max-h-[60vh]">
              {/* Quick Help */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <a href="mailto:support@haiai.com" className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">Email Support</p>
                  <p className="text-xs text-gray-400 mt-0.5">Get help via email</p>
                </a>
                
                <a href="#" className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">Live Chat</p>
                  <p className="text-xs text-gray-400 mt-0.5">Chat with us</p>
                </a>
              </div>

              {/* FAQ Section */}
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Frequently Asked Questions</h3>
              
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-100 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-700 pr-4">{faq.question}</span>
                      <motion.svg
                        animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-gray-400 flex-shrink-0"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </motion.svg>
                    </button>
                    
                    <AnimatePresence>
                      {expandedIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 text-sm text-gray-500 leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
