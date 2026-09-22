/** @format */

import Link from "next/link";

interface RepositorySectionProps {
  projectId: string;
}

export default function RepositorySection({
  projectId,
}: RepositorySectionProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Repository</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Connect your source code to start building a knowledge model.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-dashed border-border bg-background p-6 text-center">
        <h3 className="text-sm font-medium text-foreground">
          No repository connected
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Add a repository to analyze your codebase structure.
        </p>

        <Link
          href={`/projects/${projectId}/repositories/new`}
          className="mt-5 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Connect Repository
        </Link>
      </div>
    </section>
  );
}
