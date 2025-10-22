import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
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
