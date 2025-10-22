import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-12 text-center">
      <h1 className="mb-4 font-serif text-6xl font-semibold text-primary">404</h1>
      <h2 className="mb-4 font-serif text-2xl font-normal">Page Not Found</h2>
      <p className="mb-8 font-serif text-lg text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button variant="outline" size="md" asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  )
}
