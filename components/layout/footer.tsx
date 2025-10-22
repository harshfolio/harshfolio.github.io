export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-6 py-12 text-center">
        <div className="mb-4 flex justify-center gap-6">
          <a
            href="https://github.com/harshfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/harshxharsh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            LinkedIn
          </a>
          <a
            href="https://x.com/Harshxharsh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            X
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Harsh Sharma. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
