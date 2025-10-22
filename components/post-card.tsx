import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils/date'
import type { Post } from '#site/content'

interface PostCardProps {
  post: Post
  prefetch?: boolean
}

export function PostCard({ post, prefetch = true }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slugAsParams}`} prefetch={prefetch}>
      <Card className="transition-all hover:-translate-y-1 hover:border-muted-foreground">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {post.featured && (
                <Badge variant="featured" className="mb-2">
                  Featured
                </Badge>
              )}
              <CardTitle className="transition-colors hover:text-primary">{post.title}</CardTitle>
            </div>
          </div>
          {post.description && <CardDescription className="mt-2">{post.description}</CardDescription>}
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
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
  )
}
