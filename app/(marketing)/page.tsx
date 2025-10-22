import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PostCard } from '@/components/post-card'
import { posts } from '#site/content'

// Lazy load easter egg - not critical for initial render
const GuitarEasterEgg = dynamic(() => import('@/components/guitar-easter-egg').then((mod) => ({ default: mod.GuitarEasterEgg })))

export default function HomePage() {
  const publishedPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <GuitarEasterEgg />
      {/* Hero Section */}
      <div className="home-hero mb-12">
        <h1 className="mb-4 font-sans font-semibold text-primary">
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

        <div className="home-content max-w-none font-serif">
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
            <PostCard key={post.slug} post={post} prefetch={true} />
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Button variant="outline" size="md" asChild>
            <Link href="/posts" prefetch={false}>
              View all posts
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
