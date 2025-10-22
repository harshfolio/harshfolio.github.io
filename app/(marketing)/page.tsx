import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GuitarEasterEgg } from '@/components/guitar-easter-egg'
import { posts } from '#site/content'

export default function HomePage() {
  const publishedPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <GuitarEasterEgg />
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="mb-4 font-sans text-5xl font-semibold leading-tight text-primary md:text-6xl">
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

        <div className="home-content prose prose-lg max-w-none font-serif">
          <p>
            I&apos;m currently a Product Manager at Clinikally (YC S22), leading the e-pharmacy &
            digital health platform used by 3 million users each month. Previously I was a Public
            Health Researcher & Social Scientist. Outside of core product work, I also:
          </p>
          <ul>
            <li>
              Shipped{' '}
              <a href="https://clara.clinikally.com/" target="_blank" rel="noopener noreferrer">
                Clara, India&apos;s first clinical-grade AI skin analysis
              </a>{' '}
              that processes 14 parameters in &lt;5 seconds
            </li>
            <li>
              Built our entire{' '}
              <Link href="/posts/building-elt-pipeline">ELT data pipeline from scratch</Link>{' '}
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
            I bring a researcher&apos;s rigor to product decisions. Perpetual noob that&apos;s
            currently learning to play the guitar.
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
              <Card className="transition-all hover:-translate-y-1 hover:border-muted-foreground">
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
