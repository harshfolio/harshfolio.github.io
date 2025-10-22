# Next.js Migration Implementation Plan

> **For Claude:** Use `${SUPERPOWERS_SKILLS_ROOT}/skills/collaboration/executing-plans/SKILL.md` to implement this plan task-by-task.

**Goal:** Migrate Hugo portfolio site to Next.js 15 with App Router, Velite for content, Bun runtime, full type safety, modern tooling, and Vercel deployment optimization.

**Architecture:** Next.js 15 App Router with React Server Components, Velite for type-safe MDX content processing, Tailwind CSS + CVA for design system, strict TypeScript configuration, and modular component architecture.

**Tech Stack:** Next.js 15, React 19, TypeScript 5, Velite, Tailwind CSS, Bun, CVA (Class Variance Authority), Radix UI, Zod, ESLint, Prettier

---

## Task 1: Project Initialization & Base Configuration

**Files:**
- Create: `package.json`
- Create: `bunfig.toml`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `.gitignore`
- Create: `.eslintrc.json`
- Create: `.prettierrc`
- Create: `.prettierignore`

**Step 1: Initialize Next.js project with Bun**

```bash
bun create next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias="@/*"
```

When prompted:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- src/ directory: No
- App Router: Yes
- Import alias: @/*
- Turbopack: No (use default webpack)

**Step 2: Configure Bun**

Create `bunfig.toml`:

```toml
[install]
# Use exact versions for reproducibility
exact = true

[install.cache]
# Disable for clean installs
disable = false

[test]
preload = ["./test/setup.ts"]
```

**Step 3: Install core dependencies**

```bash
bun add velite zod class-variance-authority clsx tailwind-merge lucide-react next-themes
```

**Step 4: Install dev dependencies**

```bash
bun add -D @types/node @types/react @types/react-dom prettier prettier-plugin-tailwindcss eslint-config-prettier @tailwindcss/typography
```

**Step 5: Configure TypeScript (strict mode)**

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", ".velite"],
  "exclude": ["node_modules"]
}
```

**Step 6: Configure Prettier**

Create `.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

Create `.prettierignore`:

```
.next
node_modules
public
.velite
*.md
```

**Step 7: Update .gitignore for Next.js**

```
# Next.js
.next/
out/
build/
*.tsbuildinfo

# Velite
.velite/

# Hugo (legacy)
public/
resources/
.hugo_build.lock

# Testing
coverage/

# OS
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
*.swp
*.swo
*~

# Env
.env
.env*.local

# Node
node_modules/

# Git worktrees
.worktrees/

# Vercel
.vercel
```

**Step 8: Configure ESLint**

Update `.eslintrc.json`:

```json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { "prefer": "type-imports" }
    ]
  }
}
```

**Step 9: Verify setup**

```bash
bun run build
```

Expected: Build succeeds with default Next.js app

**Step 10: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js 15 project with Bun, TypeScript, and Tailwind

- Configure strict TypeScript with noUncheckedIndexedAccess
- Add Velite for content management
- Setup Prettier with Tailwind plugin
- Configure ESLint with TypeScript rules
- Add CVA for component variants"
```

---

## Task 2: Design System Foundation (Tailwind + Tokens)

**Files:**
- Create: `tailwind.config.ts`
- Create: `app/globals.css`
- Create: `lib/utils.ts`

**Step 1: Extract design tokens from Hugo CSS**

Read `assets/css/extended/00-tokens.css` from Hugo site to extract color values, spacing scale, typography settings.

**Step 2: Configure Tailwind with design tokens**

Create `tailwind.config.ts`:

```typescript
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
```

**Step 3: Create globals.css with CSS variables**

Create `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Colors from Hugo tokens */
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --primary: 221 83% 53%;
    --primary-foreground: 0 0% 100%;
    --secondary: 240 4.8% 45%;
    --secondary-foreground: 0 0% 100%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 221 83% 53%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --primary: 221 83% 70%;
    --primary-foreground: 240 10% 3.9%;
    --secondary: 240 3.7% 25%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 221 83% 70%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

**Step 4: Create utility helpers**

Create `lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Step 5: Test Tailwind configuration**

```bash
bun run dev
```

Visit http://localhost:3000, verify styles load

**Step 6: Commit**

```bash
git add tailwind.config.ts app/globals.css lib/utils.ts
git commit -m "feat: configure design system with Tailwind and CSS tokens

- Extract color palette from Hugo design
- Configure CSS variables for light/dark themes
- Add typography plugin for prose content
- Create cn() utility for class merging"
```

---

## Task 3: Velite Configuration & Content Schema

**Files:**
- Create: `velite.config.ts`
- Create: `content/posts/.gitkeep`
- Create: `.velite/.gitignore`

**Step 1: Create Velite configuration**

Create `velite.config.ts`:

```typescript
import { defineConfig, defineCollection, s } from 'velite'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split('/').slice(1).join('/'),
})

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(200).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      featured: s.boolean().default(false),
      tags: s.array(s.string()).optional(),
      image: s.image().optional(),
      body: s.mdx(),
    })
    .transform(computedFields),
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: 'github-dark' }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
})
```

**Step 2: Install Velite rehype plugins**

```bash
bun add -D rehype-slug rehype-pretty-code rehype-autolink-headings shiki
```

**Step 3: Update Next.js config to build Velite content**

Update `next.config.ts`:

```typescript
import type { NextConfig } from 'next'
import { build } from 'velite'

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin())
    return config
  },
}

class VeliteWebpackPlugin {
  static started = false
  apply(compiler: any) {
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return
      VeliteWebpackPlugin.started = true
      const dev = compiler.options.mode === 'development'
      await build({ watch: dev, clean: !dev })
    })
  }
}

export default nextConfig
```

**Step 4: Create content directory structure**

```bash
mkdir -p content/posts
touch content/posts/.gitkeep
echo "*" > .velite/.gitignore
```

**Step 5: Add Velite types to TypeScript**

The types will be auto-generated in `.velite/index.d.ts` when content is processed.

**Step 6: Test Velite build**

```bash
bun run build
```

Expected: Velite processes (empty) content directory successfully

**Step 7: Commit**

```bash
git add velite.config.ts next.config.ts content/ .velite/.gitignore
git commit -m "feat: configure Velite for type-safe MDX content

- Define Post schema with frontmatter validation
- Setup rehype plugins for code highlighting and TOC
- Configure asset processing and output
- Integrate with Next.js build pipeline"
```

---

## Task 4: Migrate Content from Hugo

**Files:**
- Create: `content/posts/building-medical-ai.mdx`
- Create: `content/posts/building-elt-pipeline.mdx`
- Create: `scripts/migrate-content.ts` (helper script)

**Step 1: Copy Hugo posts to new structure**

```bash
cp ../../content/posts/building-a-medical-ai-assistant.md content/posts/building-medical-ai.mdx
cp ../../content/posts/building-elt-pipeline-clinikally.md content/posts/building-elt-pipeline.mdx
```

**Step 2: Update frontmatter format**

For each MDX file, convert Hugo frontmatter to Velite schema:

`content/posts/building-medical-ai.mdx`:

```mdx
---
title: "Building a Medical AI Assistant"
description: "How we built Clara, India's first clinical-grade AI skin analysis tool"
date: 2024-03-15
published: true
featured: true
tags: ["AI", "Healthcare", "Product"]
---

[Keep existing content as-is]
```

**Step 3: Remove Hugo shortcodes**

Replace any Hugo-specific shortcodes with MDX components (we'll create these later):
- `{{< btn >}}` → Will become `<Button>` component
- Keep markdown intact

**Step 4: Verify content builds**

```bash
bun run build
```

Expected: Velite processes 2 posts successfully, generates types in `.velite/`

**Step 5: Check generated types**

```bash
cat .velite/index.d.ts
```

Verify Post type is generated correctly

**Step 6: Commit**

```bash
git add content/posts/
git commit -m "feat: migrate blog posts from Hugo to Velite MDX

- Convert 2 posts to MDX format
- Update frontmatter to Velite schema
- Remove Hugo-specific shortcodes"
```

---

## Task 5: Font Setup & Root Layout

**Files:**
- Create: `app/layout.tsx`
- Create: `lib/fonts.ts`

**Step 1: Install fonts**

```bash
bun add @next/font
```

**Step 2: Configure fonts**

Create `lib/fonts.ts`:

```typescript
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
```

**Step 3: Create root layout**

Create `app/layout.tsx`:

```typescript
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
```

**Step 4: Create theme provider**

Create `components/theme-provider.tsx`:

```typescript
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

**Step 5: Test fonts load**

```bash
bun run dev
```

Check browser DevTools → Network → Fonts are loading

**Step 6: Commit**

```bash
git add app/layout.tsx lib/fonts.ts components/theme-provider.tsx
git commit -m "feat: configure fonts and root layout

- Add Plus Jakarta Sans, Lora, and JetBrains Mono
- Setup theme provider with next-themes
- Configure SEO metadata
- Add Open Graph and Twitter cards"
```

---

## Task 6: UI Component Library (Button, Card, Badge)

**Files:**
- Create: `components/ui/button.tsx`
- Create: `components/ui/card.tsx`
- Create: `components/ui/badge.tsx`

**Step 1: Create Button component with CVA**

Create `components/ui/button.tsx`:

```typescript
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        outline:
          'border-2 border-primary text-primary shadow-[0_3px_0_0_hsl(var(--primary))] hover:translate-y-[-2px] hover:shadow-[0_5px_0_0_hsl(var(--primary))] active:translate-y-[2px] active:shadow-[0_1px_0_0_hsl(var(--primary))]',
        primary:
          'bg-primary text-primary-foreground border-2 border-primary shadow-[0_3px_0_0_hsl(var(--primary)/0.6)]',
        ghost: 'border border-dashed border-primary text-primary bg-transparent',
      },
      size: {
        sm: 'px-2.5 py-1.5 text-xs',
        md: 'px-4 py-2.5 text-sm',
        lg: 'px-5 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
```

**Step 2: Create Card component**

Create `components/ui/card.tsx`:

```typescript
import * as React from 'react'
import { cn } from '@/lib/utils'

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border border-border bg-background transition-all hover:border-muted-foreground hover:shadow-md',
        className
      )}
      {...props}
    />
  )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

export { Card, CardHeader, CardTitle, CardDescription, CardContent }
```

**Step 3: Create Badge component**

Create `components/ui/badge.tsx`:

```typescript
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        outline: 'text-foreground border-border',
        featured: 'border-transparent bg-accent text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
```

**Step 4: Test components**

Add to `app/page.tsx` temporarily to verify:

```typescript
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  return (
    <div className="p-8 space-y-4">
      <Button variant="outline" size="md">Test Button</Button>
      <Card className="p-4">Test Card</Card>
      <Badge variant="featured">Featured</Badge>
    </div>
  )
}
```

Run `bun run dev` and verify components render

**Step 5: Commit**

```bash
git add components/ui/
git commit -m "feat: create UI component library with CVA

- Add Button component with outline/primary/ghost variants
- Add Card component with header/content subcomponents
- Add Badge component for post tags
- Use class-variance-authority for type-safe variants"
```

---

## Task 7: Layout Components (Header, Footer, SideMenu)

**Files:**
- Create: `components/layout/header.tsx`
- Create: `components/layout/footer.tsx`
- Create: `components/layout/side-menu.tsx`
- Create: `components/theme-toggle.tsx`
- Create: `public/images/harsh-sharma.jpeg` (copy from Hugo)

**Step 1: Copy avatar image**

```bash
cp ../../static/images/harsh-sharma.jpeg public/images/
```

**Step 2: Create theme toggle component**

Create `components/theme-toggle.tsx`:

```typescript
'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-10 w-10" />
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  )
}
```

**Step 3: Create Header component**

Create `components/layout/header.tsx`:

```typescript
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
```

**Step 4: Create SideMenu component**

Create `components/layout/side-menu.tsx`:

```typescript
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
```

**Step 5: Create Footer component**

Create `components/layout/footer.tsx`:

```typescript
export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-6 py-12 text-center">
        <div className="flex justify-center gap-6 mb-4">
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
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Harsh Sharma. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
```

**Step 6: Test layout components**

Update `app/layout.tsx` to include Header and Footer:

```typescript
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**Step 7: Commit**

```bash
git add components/layout/ components/theme-toggle.tsx public/images/ app/layout.tsx
git commit -m "feat: create layout components (Header, Footer, SideMenu)

- Add responsive Header with desktop/mobile navigation
- Create SideMenu with profile section and social links
- Add Footer with links and copyright
- Implement ThemeToggle with next-themes
- Copy avatar image from Hugo site"
```

---

## Task 8: Home Page

**Files:**
- Create: `app/(marketing)/layout.tsx`
- Create: `app/(marketing)/page.tsx`
- Delete: `app/page.tsx`

**Step 1: Create marketing layout**

Create `app/(marketing)/layout.tsx`:

```typescript
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

**Step 2: Create home page**

Create `app/(marketing)/page.tsx`:

```typescript
import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { posts } from '#site/content'

export default function HomePage() {
  const publishedPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="mb-4 text-5xl font-semibold leading-tight text-primary md:text-6xl font-sans">
          Harsh<span className="hidden md:inline">&nbsp;</span>
          <br className="md:hidden" />
          Sharma.
        </h1>

        <div className="mb-6 flex items-center gap-4">
          <a
            href="https://github.com/harshfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com/in/harshxharsh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="https://x.com/Harshxharsh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Twitter className="h-6 w-6" />
          </a>
        </div>

        <div className="prose prose-lg max-w-none font-serif">
          <p>
            I'm currently a Product Manager at Clinikally (YC S22), leading the e-pharmacy & digital
            health platform used by 3 million users each month. Previously I was a Public Health
            Researcher & Social Scientist. Outside of core product work, I also:
          </p>
          <ul>
            <li>
              Shipped{' '}
              <a href="https://clara.clinikally.com/" target="_blank" rel="noopener noreferrer">
                Clara, India's first clinical-grade AI skin analysis
              </a>{' '}
              that processes 14 parameters in &lt;5 seconds
            </li>
            <li>
              Built our entire{' '}
              <Link href="/posts/building-elt-pipeline">
                ELT data pipeline from scratch
              </Link>{' '}
              (BigQuery and dbt), Deployed & Setup Metabase for visualisation
            </li>
            <li>
              Was featured by perplexity for creating an{' '}
              <a
                href="https://www.perplexity.ai/api-platform/case-studies/clinikally"
                target="_blank"
                rel="noopener noreferrer"
              >
                AI catalog auditing engine
              </a>{' '}
              that flags compliance issues across 10K+ SKUs
            </li>
          </ul>
          <p>
            I bring a researcher's rigor to product decisions. Perpetual noob that's currently
            learning to play the guitar.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
          <Button variant="outline" size="md" asChild>
            <a href="mailto:harshsharma12021@gmail.com">Email Me</a>
          </Button>
          <Button variant="outline" size="md" asChild>
            <a
              href="https://calendar.notion.so/meet/harshclinikally/hi"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a 1-1 Call
            </a>
          </Button>
        </div>
      </div>

      {/* Writing Section */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-semibold italic">Writing</h2>
        <div className="space-y-4">
          {publishedPosts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slugAsParams}`}>
              <Card className="transition-all hover:border-muted-foreground hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {post.featured && (
                        <Badge variant="featured" className="mb-2">
                          Featured
                        </Badge>
                      )}
                      <CardTitle className="transition-colors hover:text-primary">
                        {post.title}
                      </CardTitle>
                    </div>
                  </div>
                  {post.description && (
                    <CardDescription className="mt-2">{post.description}</CardDescription>
                  )}
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Button variant="outline" size="md" asChild>
            <Link href="/posts">View all posts</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
```

**Step 3: Delete default page**

```bash
rm app/page.tsx
```

**Step 4: Test home page**

```bash
bun run dev
```

Visit http://localhost:3000, verify home page renders with posts

**Step 5: Commit**

```bash
git add app/\(marketing\)/ -A
git rm app/page.tsx
git commit -m "feat: create home page with hero and blog posts

- Add hero section with name, bio, and social links
- Display published blog posts with featured badges
- Add CTA buttons for email and calendar
- Use marketing route group for layout organization"
```

---

## Task 9: Blog List Page

**Files:**
- Create: `app/(marketing)/posts/page.tsx`

**Step 1: Create blog list page**

Create `app/(marketing)/posts/page.tsx`:

```typescript
import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { posts } from '#site/content'

export const metadata: Metadata = {
  title: 'Blog - Harsh Sharma',
  description: 'Articles about product management, AI, healthcare, and engineering',
}

export default function BlogPage() {
  const publishedPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Thoughts on product, AI, healthcare, and building things.
        </p>
      </div>

      <div className="space-y-4">
        {publishedPosts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slugAsParams}`}>
            <Card className="transition-all hover:border-muted-foreground hover:-translate-y-1">
              <CardHeader>
                {post.featured && (
                  <Badge variant="featured" className="mb-2 w-fit">
                    Featured
                  </Badge>
                )}
                <CardTitle className="transition-colors hover:text-primary">
                  {post.title}
                </CardTitle>
                {post.description && (
                  <CardDescription className="mt-2">{post.description}</CardDescription>
                )}
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

**Step 2: Test blog list page**

```bash
bun run dev
```

Visit http://localhost:3000/posts

**Step 3: Commit**

```bash
git add app/\(marketing\)/posts/page.tsx
git commit -m "feat: create blog list page

- Display all published posts sorted by date
- Add metadata for SEO
- Show featured badges and tags
- Reuse Card components from home page"
```

---

## Task 10: Blog Post Page with MDX

**Files:**
- Create: `app/(marketing)/posts/[slug]/page.tsx`
- Create: `components/mdx-components.tsx`

**Step 1: Create MDX components**

Create `components/mdx-components.tsx`:

```typescript
import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'mt-8 scroll-m-20 text-4xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'mt-6 scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        'mt-6 border-l-4 border-primary pl-6 italic [&>*]:text-muted-foreground',
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm',
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        'mb-4 mt-6 overflow-x-auto rounded-lg border bg-muted p-4',
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        'font-medium text-primary underline underline-offset-4 hover:opacity-70',
        className
      )}
      {...props}
    />
  ),
  Image: ({ className, alt, ...props }: React.ComponentProps<typeof Image>) => (
    <Image
      className={cn('rounded-lg border', className)}
      alt={alt}
      {...props}
    />
  ),
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = React.useMemo(() => {
    // This will be replaced by Velite's compiled MDX
    return () => <div dangerouslySetInnerHTML={{ __html: code }} />
  }, [code])

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none font-serif">
      <Component components={components} />
    </div>
  )
}

export { components as mdxComponents }
```

**Step 2: Create blog post page**

Create `app/(marketing)/posts/[slug]/page.tsx`:

```typescript
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { posts } from '#site/content'

interface PostPageProps {
  params: {
    slug: string
  }
}

async function getPostFromParams(params: PostPageProps['params']) {
  const slug = params?.slug
  const post = posts.find((post) => post.slugAsParams === slug)

  return post
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: 'Harsh Sharma' }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Harsh Sharma'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export async function generateStaticParams(): Promise<PostPageProps['params'][]> {
  return posts.map((post) => ({ slug: post.slugAsParams }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post || !post.published) {
    notFound()
  }

  return (
    <article className="container mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 border-b pb-8">
        {post.featured && (
          <Badge variant="featured" className="mb-4">
            Featured
          </Badge>
        )}
        <h1 className="mb-4 text-4xl font-semibold">{post.title}</h1>
        {post.description && (
          <p className="text-lg text-muted-foreground">{post.description}</p>
        )}
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground font-mono">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div
        className="prose prose-lg dark:prose-invert max-w-none font-serif"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </article>
  )
}
```

**Step 3: Test blog post page**

```bash
bun run dev
```

Visit http://localhost:3000/posts/building-medical-ai

**Step 4: Commit**

```bash
git add app/\(marketing\)/posts/\[slug\]/ components/mdx-components.tsx
git commit -m "feat: create blog post page with MDX rendering

- Add dynamic route for individual posts
- Generate static params for all posts
- Add SEO metadata with Open Graph
- Render MDX content with custom components
- Style with typography plugin"
```

---

## Task 11: 404 Page

**Files:**
- Create: `app/not-found.tsx`

**Step 1: Create 404 page**

Create `app/not-found.tsx`:

```typescript
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
      <h2 className="mb-4 text-3xl font-semibold">Page Not Found</h2>
      <p className="mb-8 text-lg text-muted-foreground">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Button variant="outline" size="lg" asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  )
}
```

**Step 2: Test 404 page**

```bash
bun run dev
```

Visit http://localhost:3000/nonexistent

**Step 3: Commit**

```bash
git add app/not-found.tsx
git commit -m "feat: create 404 not found page

- Add centered layout with error message
- Include button to return home"
```

---

## Task 12: Vercel Configuration & Deployment Prep

**Files:**
- Create: `vercel.json`
- Create: `.env.example`
- Update: `package.json` (add scripts)

**Step 1: Create Vercel config**

Create `vercel.json`:

```json
{
  "buildCommand": "bun run build",
  "devCommand": "bun run dev",
  "installCommand": "bun install",
  "framework": "nextjs",
  "headers": [
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**Step 2: Create environment template**

Create `.env.example`:

```
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://harshfolio.github.io
NEXT_PUBLIC_SITE_NAME="Harsh Sharma"

# Analytics (optional)
# NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
```

**Step 3: Update package.json scripts**

Add helpful scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf .next .velite"
  }
}
```

**Step 4: Test build locally**

```bash
bun run build
```

Expected: Build succeeds, generates `.next/` and `.velite/`

**Step 5: Test production server locally**

```bash
bun run start
```

Visit http://localhost:3000, verify production build works

**Step 6: Commit**

```bash
git add vercel.json .env.example package.json
git commit -m "feat: configure Vercel deployment and build scripts

- Add Vercel config with Bun support
- Configure cache headers for static assets
- Add environment variable template
- Add utility scripts for formatting and type-checking"
```

---

## Task 13: Performance Optimizations

**Files:**
- Update: `next.config.ts`
- Update: `app/layout.tsx`

**Step 1: Add performance configs to Next.js**

Update `next.config.ts`:

```typescript
import type { NextConfig } from 'next'
import { build } from 'velite'

const nextConfig: NextConfig = {
  // Performance
  reactStrictMode: true,
  swcMinify: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },

  // Webpack config for Velite
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin())
    return config
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}

class VeliteWebpackPlugin {
  static started = false
  apply(compiler: any) {
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return
      VeliteWebpackPlugin.started = true
      const dev = compiler.options.mode === 'development'
      await build({ watch: dev, clean: !dev })
    })
  }
}

export default nextConfig
```

**Step 2: Add Analytics (optional)**

Install Vercel Analytics:

```bash
bun add @vercel/analytics @vercel/speed-insights
```

Update `app/layout.tsx` to include analytics:

```typescript
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**Step 3: Test optimizations**

```bash
bun run build
```

Check build output for bundle sizes

**Step 4: Commit**

```bash
git add next.config.ts app/layout.tsx package.json
git commit -m "feat: add performance optimizations and analytics

- Enable React strict mode and SWC minification
- Configure AVIF/WebP image formats
- Add security headers
- Install Vercel Analytics and Speed Insights"
```

---

## Task 14: README & Documentation

**Files:**
- Update: `README.md`
- Create: `docs/DEPLOYMENT.md`

**Step 1: Update README**

Update `README.md`:

```markdown
# Harsh Sharma - Portfolio & Blog

Personal portfolio and blog built with Next.js 15, featuring type-safe MDX content and modern web development best practices.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Runtime:** Bun
- **Language:** TypeScript 5 (strict mode)
- **Content:** Velite (type-safe MDX)
- **Styling:** Tailwind CSS + CVA
- **Components:** Radix UI primitives
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Bun >= 1.0

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Building

```bash
bun run build
bun run start
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (marketing)/       # Public pages
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   └── mdx-components.tsx # MDX custom components
├── content/
│   └── posts/             # Blog posts (MDX)
├── lib/                   # Utilities
├── public/                # Static assets
└── velite.config.ts       # Content configuration
```

## Writing Content

Add new blog posts to `content/posts/`:

```mdx
---
title: "Your Post Title"
description: "Brief description"
date: 2025-01-22
published: true
featured: false
tags: ["tag1", "tag2"]
---

Your content here...
```

## Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run format` - Format code with Prettier
- `bun run type-check` - Check TypeScript types

## Deployment

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for deployment instructions.

## License

© 2025 Harsh Sharma. All rights reserved.
```

**Step 2: Create deployment guide**

Create `docs/DEPLOYMENT.md`:

```markdown
# Deployment Guide

## Vercel Deployment

### Initial Setup

1. Push code to GitHub:
   ```bash
   git push origin nextjs-beta
   ```

2. Import to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Select `nextjs-beta` branch

3. Configure Build Settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `bun run build`
   - **Install Command:** `bun install`
   - **Output Directory:** `.next`

4. Add Environment Variables (if needed):
   - `NEXT_PUBLIC_SITE_URL`
   - Analytics keys (optional)

5. Deploy!

### Multiple Deployments Strategy

**Production:**
- Branch: `main`
- Domain: `harshfolio.github.io` (or custom domain)
- Auto-deploy on push

**Beta/Preview:**
- Branch: `nextjs-beta`
- Domain: `nextjs-beta-harshfolio.vercel.app`
- Auto-deploy on push

**Feature Branches:**
- Branch: `feature/*`
- Domain: Auto-generated preview URLs
- Auto-deploy on PR

### Custom Domain Setup

1. Add domain in Vercel project settings
2. Update DNS records:
   - Type: `CNAME`
   - Name: `www` or `@`
   - Value: `cname.vercel-dns.com`

3. Wait for SSL certificate (automatic)

### Performance Monitoring

Enable in Vercel dashboard:
- **Speed Insights:** Track Core Web Vitals
- **Analytics:** Privacy-friendly page views

## GitHub Pages (Legacy Hugo)

The Hugo site remains on `main` branch. To switch fully to Next.js:

1. Merge `nextjs-beta` → `main`
2. Update GitHub Pages settings to use Vercel instead
3. Archive Hugo files

## Environment Variables

Required:
- `NEXT_PUBLIC_SITE_URL` - Your site URL

Optional:
- `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` - Vercel Analytics

## Troubleshooting

**Build fails on Vercel:**
- Check Bun version matches local
- Verify all dependencies in package.json
- Check build logs for TypeScript errors

**Images not loading:**
- Verify files are in `public/` directory
- Check Next.js Image component `src` paths

**Content not updating:**
- Velite runs during build, not runtime
- Clear `.velite/` and rebuild
```

**Step 3: Commit**

```bash
git add README.md docs/DEPLOYMENT.md
git commit -m "docs: add README and deployment guide

- Document tech stack and project structure
- Add development and build instructions
- Create comprehensive deployment guide
- Document multiple deployment strategy"
```

---

## Task 15: Final Testing & Cleanup

**Files:**
- Delete: Hugo-specific files (after verification)

**Step 1: Run full build**

```bash
bun run clean
bun run build
```

Expected: Clean build with no errors

**Step 2: Test all pages**

```bash
bun run start
```

Manual testing checklist:
- [ ] Home page loads
- [ ] Blog list page loads
- [ ] Individual blog posts load
- [ ] 404 page loads
- [ ] Mobile menu works
- [ ] Theme toggle works
- [ ] All links work
- [ ] Images load

**Step 3: Run linting**

```bash
bun run lint
bun run format:check
bun run type-check
```

Fix any issues found

**Step 4: Remove Hugo files (optional - keep for reference)**

```bash
# DO NOT DELETE YET - keep for reference
# We're in a worktree, Hugo files are in main branch
```

**Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final testing and cleanup

- Verify all pages render correctly
- Fix linting and formatting issues
- Pass TypeScript type checks
- Ready for deployment"
```

**Step 6: Push to remote**

```bash
git push -u origin nextjs-beta
```

---

## Summary

This plan migrates the Hugo portfolio to Next.js 15 with:

✅ Modern Next.js 15 App Router architecture
✅ Bun runtime for fast installs and builds
✅ Velite for type-safe MDX content
✅ Tailwind CSS + CVA design system
✅ Strict TypeScript configuration
✅ SEO optimizations and metadata
✅ Vercel deployment ready
✅ Performance monitoring setup
✅ Complete documentation

**Next Steps:**
1. Test locally thoroughly
2. Deploy to Vercel (beta branch)
3. Verify beta deployment
4. Merge to main when ready
5. Add more content and features

**Estimated Time:** 3-4 hours for complete migration
