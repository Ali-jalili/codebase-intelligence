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
  isSubmitting: boolean;
  statusOverride?: AnalysisStatus;
  onAnalyze: (repositoryId: string) => void;
}
export default function RepositoryAnalysisRow({
  repository,
  analysis,
  isSubmitting,
  statusOverride,
  onAnalyze,
}: RepositoryAnalysisRowProps) {
  const analysisStatus: AnalysisStatus =
    statusOverride ?? analysis?.status ?? "waiting";
  const isProcessing = analysisStatus === "processing" || isSubmitting;
  const isQueued = analysisStatus === "pending";
  const isDisabled = isProcessing || isQueued;

  return (
    <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-md border border-[#dce3f1] bg-white text-primary">
          <GitBranch className="size-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="truncate text-sm font-semibold text-foreground">
              {repository.name}
            </p>
            <span className="inline-flex items-center gap-1 rounded-sm bg-[#f2f4f8] px-1.5 py-1 font-mono text-[9px] text-muted-foreground">
              <GitBranch size={10} aria-hidden="true" /> {repository.branch}
            </span>
          </div>
          <p className="mt-1 max-w-xl truncate text-xs text-muted-foreground">
            {repository.url}
          </p>
          <div className="mt-2.5">
            <AnalysisStatusBadge status={analysisStatus} />
          </div>
        </div>
      </div>
      <button
        type="button"
        disabled={isDisabled}
        onClick={() => onAnalyze(repository.id)}
        className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
