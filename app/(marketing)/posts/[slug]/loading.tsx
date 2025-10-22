export default function Loading() {
  return (
    <article className="container mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 animate-pulse border-b pb-8">
        <div className="mb-4 h-10 w-3/4 rounded bg-border" />
        <div className="h-6 w-full rounded bg-border" />
        <div className="mt-4 h-4 w-32 rounded bg-border" />
      </div>

      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="animate-pulse space-y-2">
            <div className="h-4 w-full rounded bg-border" />
            <div className="h-4 w-full rounded bg-border" />
            <div className="h-4 w-3/4 rounded bg-border" />
          </div>
        ))}
      </div>
    </article>
  )
}
