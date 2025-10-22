'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { SideMenu } from './side-menu'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background">
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <span className="text-2xl font-semibold text-primary font-[family-name:var(--font-serif)]">
              Harsh Sharma
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Desktop menu */}
            <div className="hidden items-center gap-6 md:flex">
              <Link
                href="/"
                className="border-b border-transparent text-sm transition-colors hover:border-primary hover:text-primary"
              >
                Home
              </Link>
              <Link
                href="/posts"
                className="border-b border-transparent text-sm transition-colors hover:border-primary hover:text-primary"
              >
                Blog
              </Link>
            </div>

            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
