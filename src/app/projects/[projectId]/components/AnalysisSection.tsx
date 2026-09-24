/** @format */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  GitBranch,
  LoaderCircle,
  Play,
} from "lucide-react";
import { createAnalysisAction } from "../actions";
import type { Analysis, Repository, WorkspaceStatus } from "../services";

type AnalysisStatus = Analysis["status"];

const statusCopy: Record<AnalysisStatus | "waiting", string> = {
  waiting: "Ready to start analysis",
  pending: "Queued for analysis",
  processing: "Analyzing your codebase",
  completed: "Codebase map is ready",
  failed: "Analysis needs attention",
};

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
  const analysisStatuses = analyses.map((analysis) => analysis.status);
  const hasProcessingAnalysis = analysisStatuses.includes("processing");
  const hasFailedAnalysis = analysisStatuses.includes("failed");
  const hasCompletedAnalysis = analysisStatuses.includes("completed");
  const headerStatus: AnalysisStatus | "waiting" = isEmpty
    ? "waiting"
    : hasProcessingAnalysis
      ? "processing"
      : hasFailedAnalysis
        ? "failed"
        : hasCompletedAnalysis
          ? "completed"
          : "waiting";
  const isAnalyzing = headerStatus === "processing";
  const isReady = headerStatus === "completed";
  const isFailed = headerStatus === "failed";

  async function handleAnalyze(repositoryId: string) {
    setAnalyzingRepositoryId(repositoryId);

    try {
      await createAnalysisAction(repositoryId);
      router.refresh();
    } finally {
      setAnalyzingRepositoryId(null);
    }
  }

  const statusTone = isFailed
    ? "border-red-200 bg-red-50 text-red-700"
    : isReady
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : isAnalyzing
        ? "border-blue-200 bg-blue-50 text-blue-700"
        : "border-amber-200 bg-amber-50 text-amber-700";

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

        <span
          className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusTone}`}
        >
          {isAnalyzing && <LoaderCircle className="size-3.5 animate-spin" />}
          {isReady && <CheckCircle2 className="size-3.5" />}
          {isFailed && <AlertCircle className="size-3.5" />}
          {!isAnalyzing && !isReady && !isFailed && (
            <GitBranch className="size-3.5" />
          )}
          {statusCopy[headerStatus]}
        </span>
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
            {repositories.map((repository) => {
              const analysis = analyses.find(
                (item) => item.repository_id === repository.id,
              );
              const analysisStatus = analysis?.status ?? "waiting";
              const isRepositoryAnalyzing =
                analyzingRepositoryId === repository.id ||
                analysisStatus === "processing";

              return (
                <div
                  key={repository.id}
                  className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                      <GitBranch className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {repository.name}
                      </p>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {repository.provider} · {repository.branch}
                      </p>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {repository.url}
                      </p>
                      <p className="mt-2 text-xs font-medium text-muted-foreground">
                        {statusCopy[analysisStatus]}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={
                      isAnalyzing ||
                      isRepositoryAnalyzing ||
                      analysisStatus === "pending"
                    }
                    onClick={() => handleAnalyze(repository.id)}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isRepositoryAnalyzing ? (
                      <LoaderCircle className="size-4 animate-spin" />
                    ) : (
                      <Play className="size-4 fill-current" />
                    )}
                    {analysisStatus === "pending"
                      ? "Queued"
                      : isRepositoryAnalyzing
                        ? "Analyzing..."
                        : analysisStatus === "completed"
                          ? "Analyze again"
                          : "Analyze"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
