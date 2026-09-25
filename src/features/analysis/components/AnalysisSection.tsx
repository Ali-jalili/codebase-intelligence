/** @format */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GitBranch } from "lucide-react";
import { createAnalysisAction } from "@/features/analysis/actions";
import type { Analysis } from "@/features/analysis/types";
import type { Repository } from "@/features/repositories/types";
import type { WorkspaceStatus } from "@/features/projects/types";
import AnalysisStatusBadge from "./AnalysisStatusBadge";
import RepositoryAnalysisRow from "./RepositoryAnalysisRow";

type AnalysisStatus = Analysis["status"] | "waiting";
function getHeaderAnalysisStatus(
  workspaceStatus: WorkspaceStatus,
  repositories: Repository[],
  analyses: Analysis[],
): AnalysisStatus {
  if (workspaceStatus === "EMPTY" || repositories.length === 0)
    return "waiting";
  const analysisStatuses = new Set(analyses.map((analysis) => analysis.status));
  if (analysisStatuses.has("processing")) return "processing";
  if (analysisStatuses.has("failed")) return "failed";
  if (analysisStatuses.has("completed")) return "completed";
  return "waiting";
}

export default function AnalysisSection({
  status,
  repositories,
  analyses,
}: {
  status: WorkspaceStatus;
  repositories: Repository[];
  analyses: Analysis[];
}) {
  const router = useRouter();
  const [analyzingRepositoryId, setAnalyzingRepositoryId] = useState<
    string | null
  >(null);
  const isEmpty = status === "EMPTY" || repositories.length === 0;
  const headerStatus = getHeaderAnalysisStatus(status, repositories, analyses);
  const isAnalyzing = headerStatus === "processing";
  async function handleAnalyze(repositoryId: string) {
    setAnalyzingRepositoryId(repositoryId);
    try {
      await createAnalysisAction(repositoryId);
      router.refresh();
    } finally {
      setAnalyzingRepositoryId(null);
    }
  }
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Step 02
          </p>
          <h2 className="mt-2 text-lg font-semibold text-foreground">
            Analyze your codebase
          </h2>
          <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
            Choose a connected repository to map its architecture and
            dependencies.
          </p>
        </div>
        <AnalysisStatusBadge status={headerStatus} />
      </div>
      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Repository analysis
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {isEmpty
                ? "Connect a repository first to start analysis."
                : `${repositories.length} ${repositories.length === 1 ? "repository" : "repositories"} available`}
            </p>
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {isEmpty ? "Waiting" : isAnalyzing ? "In progress" : "Ready"}
          </span>
        </div>
        {isEmpty ? (
          <div className="px-5 py-10 text-center">
            <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <GitBranch className="size-5" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-foreground">
              No repository available
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
              Add a repository above, then return here to start building its
              codebase map.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {repositories.map((repository) => (
              <RepositoryAnalysisRow
                key={repository.id}
                repository={repository}
                analysis={analyses.find(
                  (item) => item.repository_id === repository.id,
                )}
                isWorkspaceAnalyzing={isAnalyzing}
                isSubmitting={analyzingRepositoryId === repository.id}
                onAnalyze={handleAnalyze}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
