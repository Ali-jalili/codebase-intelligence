/** @format */

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-6 rounded-full border border-border bg-surface px-4 py-1 text-sm text-muted">
          AI-powered codebase intelligence
        </span>

        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
          Understand complex codebases
          <span className="text-primary"> with intelligence</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          Analyze repositories, discover architecture, and transform code into
          structured knowledge.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="/signup"
            className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Get Started
          </a>

          <a
            href="/login"
            className="rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-surface"
          >
            Sign in
          </a>
        </div>

        <div className="mt-16 h-72 w-full max-w-5xl rounded-2xl border border-border bg-surface">
          {/* Product Preview */}
        </div>
      </div>
    </section>
  );
}
