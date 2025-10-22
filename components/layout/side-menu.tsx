'use client'

import Link from 'next/link'
import Image from 'next/image'
import { X, Github, Linkedin, Twitter } from 'lucide-react'
import { useEffect } from 'react'

interface SideMenuProps {
  open: boolean
  onClose: () => void
}

export function SideMenu({ open, onClose }: SideMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 z-[70] h-full w-80 border-l border-border bg-background shadow-xl transition-transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            <h2 className="text-lg font-serif">Menu</h2>
            <button
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center hover:text-primary"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Profile */}
          <div className="flex flex-col items-center gap-3 p-6">
            <Image
              src="/images/harsh-sharma.jpeg"
              alt="Harsh Sharma"
              width={64}
              height={64}
              className="rounded-full"
            />
            <p className="text-center text-sm text-muted-foreground">
              Product Manager at Clinikally
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col py-2">
            <Link
              href="/"
              onClick={onClose}
              className="px-6 py-3 transition-colors hover:bg-muted hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/posts"
              onClick={onClose}
              className="px-6 py-3 transition-colors hover:bg-muted hover:text-primary"
            >
              Blog
            </Link>
          </nav>

          {/* Social links */}
          <div className="mt-auto flex items-center justify-center gap-4 border-t border-border p-6">
            <a
              href="https://github.com/harshfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/harshxharsh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/Harshxharsh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
