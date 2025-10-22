import { Plus_Jakarta_Sans, Lora, JetBrains_Mono } from 'next/font/google'

export const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

export const fontSerif = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600'],
})

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})
