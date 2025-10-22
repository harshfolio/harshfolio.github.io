# Harsh Sharma's Portfolio

A modern, performant personal portfolio and blog built with Next.js 15, React 19, and Tailwind CSS. Migrated from Hugo to leverage Next.js features while preserving the original design aesthetic.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 3 + CSS Variables
- **Content**: Velite (Type-safe content management)
- **Fonts**: Next.js Font Optimization (Plus Jakarta Sans, Lora, JetBrains Mono, Caveat)
- **Deployment**: Vercel
- **Package Manager**: Bun
- **Analytics**: Vercel Analytics & Speed Insights

## ✨ Features

### Design System
- **14px base font** with 18px body text matching original Hugo design
- **Serif typography** (Lora) for body text, sans-serif (Plus Jakarta Sans) for headings
- **Light gray background** (#f5f5f5) matching Hugo aesthetic
- **Design tokens** via CSS variables for colors, spacing, typography
- **Text selection styling** with wavy underline effect
- **Dark mode** support with Next.js themes

### Interactive Features
- **Year Progress Bar** - Dynamic footer showing percentage of year completed
- **Reading Progress Bar** - Scroll-based progress indicator on blog posts
- **Guitar Easter Egg** - Click "the guitar" text to play C Major chord via Web Audio API
- **Smooth transitions** and hover effects throughout

### Next.js 15 Optimizations
- **Lazy loading** - GuitarEasterEgg dynamically imported for smaller initial bundle
- **Strategic prefetching** - Important links prefetch, less critical don't
- **Loading states** - Skeleton screens on `/posts` and `/posts/[slug]`
- **Image optimization** - Next.js Image component with automatic optimization
- **Server Components** - RSC by default, client components only where needed
- **Static generation** - All pages pre-rendered at build time

### Content Management
- **Type-safe content** with Velite
- **Markdown support** with rehype plugins (slug, autolink headings, syntax highlighting)
- **Featured posts** badge system
- **Tag system** for categorization
- **Date formatting** utility for consistent display

## 📁 Project Structure

```
.
├── app/
│   ├── (marketing)/          # Marketing layout group
│   │   ├── page.tsx           # Home page
│   │   └── posts/
│   │       ├── page.tsx       # Blog listing
│   │       ├── loading.tsx    # Loading skeleton
│   │       └── [slug]/
│   │           ├── page.tsx   # Blog post detail
│   │           └── loading.tsx
│   ├── layout.tsx             # Root layout
│   ├── globals.css            # Global styles & CSS variables
│   └── not-found.tsx          # Custom 404 page
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── layout/                # Layout components (Header, Footer, SideMenu)
│   ├── post-card.tsx          # Reusable post card
│   ├── reading-progress.tsx   # Reading progress bar
│   ├── guitar-easter-egg.tsx  # Guitar sound easter egg
│   └── theme-toggle.tsx       # Dark mode toggle
├── lib/
│   └── utils/
│       └── date.ts            # Date formatting utility
├── content/
│   └── posts/                 # Markdown blog posts
├── public/
│   └── images/                # Static images
└── velite.config.ts           # Content configuration
```

## 🎨 Design System

### Colors (CSS Variables)

#### Light Mode
- Background: `#f5f5f5` (light gray)
- Foreground: `#404040` (dark gray)
- Primary: `#007bff` (blue)
- Secondary: `#737373` (gray)
- Border: `#e5e5e5` (light border)

#### Dark Mode
- Background: `#1a1a1a` (near black)
- Foreground: `#ddd` (light gray)
- Primary: `#66b0ff` (light blue)
- Secondary: `#aaa` (gray)
- Border: `#333` (dark border)

### Typography Scale
- Base: 14px (html), 18px (body)
- Text sizes via CSS variables: `--text-xs` through `--text-4xl`
- Line heights: tight (1.2), snug (1.4), normal (1.6), relaxed (1.75)

### Spacing
8pt grid system: `--spacing-xxs` (2px) through `--spacing-3xl` (64px)

## 🔧 Development

### Prerequisites
- Bun (recommended) or Node.js 18+
- Git

### Setup

```bash
# Clone repository
git clone https://github.com/harshfolio/harshfolio.github.io.git
cd harshfolio.github.io/.worktrees/nextjs-beta

# Install dependencies
bun install

# Run development server
bun run dev

# Open http://localhost:3000
```

### Available Scripts

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
bun run format       # Format with Prettier
bun run type-check   # TypeScript type checking
```

## 📝 Content Management

### Adding a Blog Post

1. Create a new `.md` or `.mdx` file in `content/posts/`:

```markdown
---
title: "Your Post Title"
description: "Brief description"
date: "2025-01-22"
published: true
featured: false
tags: ["tag1", "tag2"]
---

Your content here...
```

2. Run `bun run dev` - Velite will automatically process the content
3. Access at `/posts/your-post-title`

### Content Schema

- **title**: Post title (required)
- **description**: SEO description (optional)
- **date**: Publication date YYYY-MM-DD (required)
- **published**: Boolean, false hides post (default: true)
- **featured**: Shows "Featured" badge (default: false)
- **tags**: Array of tag strings (optional)

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Framework: Next.js
4. Build command: `bun run build` (or use default)
5. Deploy

### Environment Variables

No environment variables required for basic deployment. Optional:
- Analytics automatically enabled on Vercel

## 🛠️ Migration Notes (Hugo → Next.js)

### What Was Preserved
- ✅ Original design aesthetic (colors, typography, spacing)
- ✅ Light gray background (#f5f5f5)
- ✅ Serif body text, sans-serif headings
- ✅ Text selection with wavy underline
- ✅ Year progress bar in footer
- ✅ Reading progress on blog posts
- ✅ Guitar sound easter egg
- ✅ Asterisk logo with rotation effect
- ✅ Dark mode support

### What Was Improved
- ⚡ Faster page loads with Next.js optimization
- 🎯 Better SEO with Metadata API
- 📦 Smaller bundle size with code splitting
- 🔄 Loading states for better UX
- 🖼️ Automatic image optimization
- 📱 Better mobile performance
- 🔍 Type-safe content with Velite
- ♿ Better accessibility

### Key Technical Decisions

1. **Velite over Contentlayer** - Active maintenance, better type safety
2. **CSS Variables + Tailwind** - Design tokens + utility classes
3. **Server Components first** - Performance, only use client components when needed
4. **Dynamic imports** - Code splitting for non-critical features
5. **Strategic prefetching** - Balance UX and performance

## 🐛 Known Issues & Solutions

### TypeScript Build Errors

**Issue**: `webkitAudioContext` type errors in Vercel build
**Solution**: Use optional type `{ webkitAudioContext?: typeof AudioContext }` with guard

### Font Size Issues

**Issue**: Body text appearing 10px instead of 18px
**Solution**: Set both `html { font-size: 14px }` and `body { font-size: 18px }`

### Background Color

**Issue**: Pure white instead of light gray
**Solution**: Use `--background: 0 0% 96%` (HSL for #f5f5f5)

## 📊 Performance

Build output showing optimized bundle sizes:

```
Route (app)                          Size       First Load JS
┌ ○ /                               1.33 kB    107 kB
├ ○ /posts                           165 B     105 kB
└ ● /posts/[slug]                    657 B     103 kB
```

- ✅ All routes under 110 kB first load
- ✅ Lazy-loaded easter egg reduces initial bundle
- ✅ Static generation for instant page loads

## 🔮 Future Enhancements

Potential improvements for consideration:

- [ ] Add RSS feed generation
- [ ] Implement view counts
- [ ] Add search functionality
- [ ] Table of contents for long posts
- [ ] Related posts suggestions
- [ ] Code block copy button
- [ ] Comments system (giscus?)
- [ ] OG image generation

## 📄 License

All rights reserved © 2025 Harsh Sharma

## 🙏 Acknowledgments

- Original Hugo theme inspiration
- Next.js team for excellent documentation
- Vercel for hosting platform
- shadcn/ui for component patterns
