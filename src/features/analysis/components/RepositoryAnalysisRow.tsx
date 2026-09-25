/** @format */

import { GitBranch, LoaderCircle, Play } from "lucide-react";
import type { Analysis } from "@/features/analysis/types";
import type { Repository } from "@/features/repositories/types";
import AnalysisStatusBadge, {
  type AnalysisStatus,
} from "./AnalysisStatusBadge";

interface RepositoryAnalysisRowProps {
  repository: Repository;
  analysis?: Analysis;
  isWorkspaceAnalyzing: boolean;
  isSubmitting: boolean;
  onAnalyze: (repositoryId: string) => void;
}
export default function RepositoryAnalysisRow({
  repository,
  analysis,
  isWorkspaceAnalyzing,
  isSubmitting,
  onAnalyze,
}: RepositoryAnalysisRowProps) {
  const analysisStatus: AnalysisStatus = analysis?.status ?? "waiting";
  const isProcessing = analysisStatus === "processing" || isSubmitting;
  const isQueued = analysisStatus === "pending";
  const isDisabled = isWorkspaceAnalyzing || isProcessing || isQueued;
  return (
    <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
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
          <div className="mt-2">
            <AnalysisStatusBadge status={analysisStatus} />
          </div>
        </div>
      </div>
      <button
        type="button"
        disabled={isDisabled}
        onClick={() => onAnalyze(repository.id)}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isProcessing ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <Play className="size-4 fill-current" />
        )}
        {isQueued
          ? "Queued"
          : isProcessing
            ? "Analyzing..."
            : analysisStatus === "completed"
              ? "Analyze again"
              : "Analyze"}
      </button>
    </div>
  );
}
