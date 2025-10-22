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
            <Card className="transition-all hover:-translate-y-1 hover:border-muted-foreground">
              <CardHeader>
                {post.featured && (
                  <Badge variant="featured" className="mb-2 w-fit">
                    Featured
                  </Badge>
                )}
                <CardTitle className="transition-colors hover:text-primary">{post.title}</CardTitle>
                {post.description && (
                  <CardDescription className="mt-2">{post.description}</CardDescription>
                )}
                <div className="mt-2 flex items-center gap-2 font-mono text-xs text-muted-foreground">
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
