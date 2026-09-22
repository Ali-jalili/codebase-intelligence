/** @format */

import type { WorkspaceStatus } from "../services";

export default function IntelligenceSection({
  status,
}: {
  status: WorkspaceStatus;
}) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">
        Codebase Intelligence
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Explore architecture insights generated from your codebase.
      </p>

      <div className="mt-6 rounded-xl border border-dashed border-border bg-background p-5">
        <p className="text-sm font-medium text-foreground">
          {status === "READY"
            ? "Your codebase intelligence will appear here."
            : "Connect and analyze a repository to unlock codebase intelligence."}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Architecture relationships, dependencies, and useful entry points will
          be organized around the codebase itself.
        </p>
      </div>
    </section>
  );
}
