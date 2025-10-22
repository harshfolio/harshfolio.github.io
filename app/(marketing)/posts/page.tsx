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
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Thoughts on product, AI, healthcare, and building things.
        </p>
      </div>

      <div className="space-y-4">
        {publishedPosts.map((post) => (
          <PostCard key={post.slug} post={post} prefetch={true} />
        ))}
      </div>
    </div>
  )
}
