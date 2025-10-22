'use client'

import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const updateProgress = () => {
      const windowHeight = window.innerHeight
      const postContent = document.querySelector('.prose')

      if (!postContent) return

      const documentHeight = postContent.scrollHeight
      const scrollTop = window.scrollY
      const trackLength = documentHeight - windowHeight
      const scrollPercent = (scrollTop / trackLength) * 100

      setProgress(Math.min(Math.max(scrollPercent, 0), 100))

      // Show progress bar while scrolling
      if (!isVisible) setIsVisible(true)

      // Hide after 1 second of no scrolling
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => setIsVisible(false), 1000)
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress() // Initial calculation

    return () => {
      window.removeEventListener('scroll', updateProgress)
      clearTimeout(scrollTimeout)
    }
  }, [isVisible])

  return (
    <div
      className={`fixed left-0 top-0 z-[9999] h-1 w-full bg-transparent transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="h-full bg-gradient-to-r from-primary to-primary/80 shadow-[0_0_10px_var(--primary)] transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
