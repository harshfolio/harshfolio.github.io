'use client'

import { useEffect, useState } from 'react'

export function Footer() {
  const [yearProgress, setYearProgress] = useState(0)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date()
      const start = new Date(now.getFullYear(), 0, 1)
      const end = new Date(now.getFullYear() + 1, 0, 1)
      const progress = ((now.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100
      setYearProgress(progress)
    }

    calculateProgress()
  }, [])

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-6 py-12 text-center">
        {/* Year Progress */}
        <div
          className="mx-auto mb-6 max-w-[300px]"
          role="status"
          aria-label="Year progress indicator"
        >
          <div className="mb-2 font-mono text-xs text-muted-foreground">
            {yearProgress.toFixed(1)}% of {currentYear}
          </div>
          <div
            className="h-1 overflow-hidden rounded-sm bg-border"
            role="progressbar"
            aria-valuenow={yearProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-sm bg-primary transition-all duration-normal"
              style={{ width: `${yearProgress}%` }}
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="mb-4 flex justify-center gap-6">
          <a
            href="https://github.com/harshfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/harshxharsh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            LinkedIn
          </a>
          <a
            href="https://x.com/Harshxharsh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            X
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground">
          © {currentYear} Harsh Sharma. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
