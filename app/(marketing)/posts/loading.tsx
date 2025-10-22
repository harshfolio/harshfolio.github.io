import { Card, CardHeader } from '@/components/ui/card'

export default function Loading() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <div className="mb-12">
        <div className="mb-4 h-10 w-32 animate-pulse rounded bg-border" />
        <div className="h-6 w-96 animate-pulse rounded bg-border" />
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 w-3/4 rounded bg-border" />
              <div className="mt-2 h-4 w-full rounded bg-border" />
              <div className="mt-2 h-4 w-24 rounded bg-border" />
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
