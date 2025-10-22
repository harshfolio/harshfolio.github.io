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
