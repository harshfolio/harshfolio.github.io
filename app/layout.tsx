import type { Metadata } from 'next'
import { fontSans, fontSerif, fontMono } from '@/lib/fonts'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Harsh Sharma',
  description: 'Personal blog and portfolio',
  authors: [{ name: 'Harsh Sharma' }],
  keywords: ['Product Manager', 'AI', 'Healthcare', 'Engineering'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://harshfolio.github.io/',
    title: 'Harsh Sharma',
    description: 'Personal blog and portfolio',
    siteName: 'Harsh Sharma',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harsh Sharma',
    description: 'Personal blog and portfolio',
    creator: '@Harshxharsh',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
