import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { ReadingProgress } from '@/components/reading-progress'
import { formatDate } from '@/lib/utils/date'
import { calculateReadingTime, formatReadingTime } from '@/lib/utils/reading-time'
import { Clock } from 'lucide-react'
import { posts } from '#site/content'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getPostFromParams(params: { slug: string }) {
  const slug = params?.slug
  const post = posts.find((post) => post.slugAsParams === slug)

  return post
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getPostFromParams(resolvedParams)

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

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return posts.map((post) => ({ slug: post.slugAsParams }))
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params
  const post = await getPostFromParams(resolvedParams)

  if (!post || !post.published) {
    notFound()
  }

  const readingTime = calculateReadingTime(post.body)

  return (
    <>
      <ReadingProgress />
      <article className="container mx-auto max-w-2xl px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          {post.featured && (
            <Badge variant="featured" className="mb-4">
              Featured
            </Badge>
          )}
          <h1 className="mb-6 font-serif text-4xl font-normal leading-tight tracking-tight text-foreground md:text-5xl">
            {post.title}
          </h1>
          {post.description && (
            <p className="mb-6 font-serif text-xl leading-relaxed text-muted-foreground">
              {post.description}
            </p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 border-t border-b border-border py-4 font-mono text-sm text-muted-foreground">
            <time dateTime={post.date} className="flex items-center gap-2">
              {formatDate(post.date)}
            </time>
            <span className="text-border">•</span>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{formatReadingTime(readingTime)}</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="font-mono text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div
          className="prose-custom font-serif text-lg leading-relaxed text-foreground"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </article>
    </>
  )
}
