import type { Metadata } from 'next'
import { PostCard } from '@/components/post-card'
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
    <div className="container mx-auto max-w-3xl px-6 py-16">
      <header className="mb-16">
        <h1 className="mb-4 font-serif text-5xl font-normal tracking-tight">Writing</h1>
        <p className="font-serif text-xl leading-relaxed text-muted-foreground">
          Thoughts on product, AI, healthcare, and building things.
        </p>
      </header>

      <div className="space-y-12">
        {publishedPosts.map((post) => (
          <PostCard key={post.slug} post={post} prefetch={true} />
        ))}
      </div>
    </div>
  )
}
