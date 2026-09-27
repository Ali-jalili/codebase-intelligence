/** @format */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GitBranch } from "lucide-react";
import { createAnalysisAction } from "@/features/analysis/actions";
import type { Analysis } from "@/features/analysis/types";
import type { Repository } from "@/features/repositories/types";
import type { WorkspaceStatus } from "@/features/projects/types";
import AnalysisStatusBadge from "./AnalysisStatusBadge";
import RepositoryAnalysisRow from "./RepositoryAnalysisRow";

type AnalysisStatus = Analysis["status"] | "waiting";
type AnalysisSubmission = {
  repositoryId: string;
  analysisId: string | null;
};

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
  const [analysisSubmission, setAnalysisSubmission] =
    useState<AnalysisSubmission | null>(null);
  const isEmpty = status === "EMPTY" || repositories.length === 0;
  const headerStatus = getHeaderAnalysisStatus(status, repositories, analyses);
  const activeAnalysis = analysisSubmission?.analysisId
    ? analyses.find((analysis) => analysis.id === analysisSubmission.analysisId)
    : undefined;
  const isSubmissionActive =
    analysisSubmission !== null &&
    activeAnalysis?.status !== "completed" &&
    activeAnalysis?.status !== "failed";
  const isAnalyzing = isSubmissionActive || headerStatus === "processing";

  useEffect(() => {
    if (!analysisSubmission) return;

    if (
      activeAnalysis?.status === "completed" ||
      activeAnalysis?.status === "failed"
    ) {
      return;
    }

    const refreshInterval = window.setInterval(() => {
      router.refresh();
    }, 2000);

    return () => window.clearInterval(refreshInterval);
  }, [activeAnalysis?.status, analysisSubmission, router]);

  async function handleAnalyze(repositoryId: string) {
    setAnalysisSubmission({ repositoryId, analysisId: null });
    try {
      const analysis = await createAnalysisAction(repositoryId);
      setAnalysisSubmission({ repositoryId, analysisId: analysis.id });
      router.refresh();
    } catch (error) {
      setAnalysisSubmission(null);
      throw error;
    }
  }
  return (
    <section aria-labelledby="analysis-section-title">
      <div className="flex flex-col gap-4 border-b border-[#dce3f1] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
            02 / Analysis
          </p>
          <h2
            id="analysis-section-title"
            className="mt-2 text-xl font-semibold tracking-tight text-foreground"
          >
            Read the structure
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Run a scan to trace architecture, dependencies, and key paths.
          </p>
        </div>
        <AnalysisStatusBadge status={headerStatus} />
      </div>
      <div className="mt-4 flex items-center justify-between border-b border-[#e5eaf3] py-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>Repository scan queue</span>
        <span>
          {repositories.length}{" "}
          {repositories.length === 1 ? "source" : "sources"}
        </span>
      </div>
      {isEmpty ? (
        <div className="flex items-start gap-4 border-b border-[#dce3f1] py-7">
          <div className="grid size-10 shrink-0 place-items-center rounded-md bg-[#edf2ff] text-primary">
            <GitBranch className="size-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              No source available to scan
            </h3>
            <p className="mt-1 max-w-lg text-sm leading-6 text-muted-foreground">
              Connect a repository in the Source section to start building its
              codebase map.
            </p>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-[#e5eaf3] border-b border-[#dce3f1]">
          {repositories.map((repository) =>
            (() => {
              const analysis = analyses.find(
                (item) => item.repository_id === repository.id,
              );
              const isSubmitting =
                analysisSubmission?.repositoryId === repository.id &&
                (analysisSubmission.analysisId === null ||
                  analysis?.id !== analysisSubmission.analysisId ||
                  (analysis.status !== "completed" &&
                    analysis.status !== "failed"));
              const statusOverride =
                isSubmitting && analysis?.id !== analysisSubmission?.analysisId
                  ? "processing"
                  : undefined;

              return (
                <RepositoryAnalysisRow
                  key={repository.id}
                  repository={repository}
                  analysis={analysis}
                  isSubmitting={isSubmitting}
                  statusOverride={statusOverride}
                  onAnalyze={handleAnalyze}
                />
              );
            })(),
          )}
        </div>
      )}
    </section>
  );
}
