/** @format */

export default function IntelligenceSection() {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">
        Codebase Intelligence
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Explore architecture insights generated from your codebase.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Components</p>

          <p className="mt-2 text-xl font-semibold text-foreground">—</p>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Relationships</p>

          <p className="mt-2 text-xl font-semibold text-foreground">—</p>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Insights</p>

          <p className="mt-2 text-xl font-semibold text-foreground">Locked</p>
        </div>
      </div>
    </section>
  );
}
