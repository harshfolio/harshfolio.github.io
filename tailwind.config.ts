import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
      spacing: {
        xxs: 'var(--spacing-xxs)',
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
      },
      fontSize: {
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
      },
      lineHeight: {
        tight: 'var(--leading-tight)',
        snug: 'var(--leading-snug)',
        normal: 'var(--leading-normal)',
        relaxed: 'var(--leading-relaxed)',
      },
      transitionDuration: {
        fast: 'var(--transition-fast)',
        normal: 'var(--transition-normal)',
        slow: 'var(--transition-slow)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        mono: ['var(--font-mono)'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '72ch',
            color: 'hsl(var(--foreground))',
            fontFamily: 'var(--font-serif)',
            lineHeight: '1.6',
            p: {
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-base)',
              lineHeight: '1.6',
              marginTop: '0',
              marginBottom: '1rem',
              hyphens: 'auto',
            },
            h1: {
              fontFamily: 'var(--font-serif)',
              fontWeight: '400',
              lineHeight: 'var(--leading-tight)',
            },
            h2: {
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-xl)',
              fontWeight: '400',
              marginTop: 'var(--spacing-2xl)',
              marginBottom: 'var(--spacing-md)',
              lineHeight: 'var(--leading-tight)',
            },
            h3: {
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-lg)',
              fontWeight: '400',
              marginTop: 'var(--spacing-xl)',
              marginBottom: 'var(--spacing-sm)',
              lineHeight: 'var(--leading-tight)',
            },
            h4: {
              fontFamily: 'var(--font-serif)',
              fontWeight: '400',
              lineHeight: 'var(--leading-tight)',
            },
            ul: {
              marginTop: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-md)',
              paddingLeft: 'var(--spacing-xl)',
              lineHeight: 'var(--leading-normal)',
            },
            ol: {
              marginTop: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-md)',
              paddingLeft: 'var(--spacing-xl)',
              lineHeight: 'var(--leading-normal)',
            },
            li: {
              marginTop: 'var(--spacing-sm)',
              marginBottom: 'var(--spacing-sm)',
            },
            strong: {
              fontWeight: '600',
              color: 'hsl(var(--foreground))',
            },
            code: {
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-base)',
              backgroundColor: 'hsl(var(--muted))',
              padding: 'var(--spacing-xxs) var(--spacing-sm)',
              borderRadius: 'var(--radius)',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: 'hsl(var(--muted))',
              borderRadius: 'var(--radius)',
              padding: 'var(--spacing-md)',
            },
            'pre code': {
              padding: '0',
              backgroundColor: 'transparent',
            },
            a: {
              color: 'hsl(var(--primary))',
              textDecoration: 'none',
              borderBottom: '1px solid hsl(var(--primary))',
              '&:hover': {
                opacity: 0.7,
              },
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
