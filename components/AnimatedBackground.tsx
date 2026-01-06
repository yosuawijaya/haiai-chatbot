'use client'

import { useEffect, useState } from 'react'

export default function AnimatedBackground() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Blob 1 - Top Right */}
      <div
        className="blob w-[400px] h-[400px] md:w-[650px] md:h-[650px] bg-gradient-to-br from-amber-200 via-amber-300 to-yellow-400 -top-32 -right-20 md:-top-48 md:-right-32 animate-blob-1"
      />

      {/* Blob 2 - Bottom Left */}
      <div
        className="blob w-[350px] h-[350px] md:w-[550px] md:h-[550px] bg-gradient-to-tr from-orange-200 via-amber-200 to-yellow-300 -bottom-28 -left-32 md:-bottom-40 md:-left-48 animate-blob-2"
      />

      {/* Blob 3 - Center (hidden on mobile for performance) */}
      {!isMobile && (
        <div
          className="blob w-[500px] h-[500px] bg-gradient-to-r from-yellow-100 via-amber-200 to-orange-200 top-1/3 left-1/4 animate-blob-3"
        />
      )}

      {/* Blob 4 - Top Left (hidden on mobile) */}
      {!isMobile && (
        <div
          className="blob w-[400px] h-[400px] bg-gradient-to-bl from-amber-100 via-yellow-200 to-amber-300 top-20 left-10 animate-blob-4"
        />
      )}

      {/* Blob 5 - Bottom Right (hidden on mobile) */}
      {!isMobile && (
        <div
          className="blob w-[450px] h-[450px] bg-gradient-to-tl from-yellow-200 via-orange-100 to-amber-200 bottom-10 right-10 animate-blob-5"
        />
      )}

      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream-200/30 to-cream-200/50" />
    </div>
  )
}
