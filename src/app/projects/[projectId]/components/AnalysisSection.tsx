/** @format */

"use client";

import { createAnalysisAction } from "../actions";
import type { Repository, WorkspaceStatus } from "../services";

const statusCopy: Record<WorkspaceStatus, string> = {
  EMPTY: "Waiting for repository",
  REPOSITORY_CONNECTED: "Ready to start analysis",
  ANALYZING: "Analyzing your codebase",
  READY: "Codebase map is ready",
  FAILED: "Analysis needs attention",
};

export default function AnalysisSection({
  status,
  repositories,
}: {
  status: WorkspaceStatus;
  repositories: Repository[];
}) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">Analysis</h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Track the process of understanding your codebase.
      </p>

      <div className="mt-6 rounded-xl border border-border bg-background p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>

          <span className="text-sm font-medium text-foreground">
            {statusCopy[status]}
          </span>

          {repositories.map((repository) => (
            <button
              key={repository.id}
              onClick={() => {
                createAnalysisAction(repository.id);
              }}
            >
              Analyze
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
