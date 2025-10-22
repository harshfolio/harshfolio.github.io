import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Harsh Sharma',
  description: 'Personal blog and portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
