/** @format */

import {
  AlertCircle,
  CheckCircle2,
  GitBranch,
  LoaderCircle,
} from "lucide-react";
import type { Analysis } from "@/features/analysis/types";

export type AnalysisStatus = Analysis["status"] | "waiting";
const statusCopy: Record<AnalysisStatus, string> = {
  waiting: "Ready to start analysis",
  pending: "Queued for analysis",
  processing: "Analyzing your codebase",
  completed: "Codebase map is ready",
  failed: "Analysis needs attention",
};
interface AnalysisStatusBadgeProps {
  status: AnalysisStatus;
}
export default function AnalysisStatusBadge({
  status,
}: AnalysisStatusBadgeProps) {
  const statusTone =
    status === "failed"
      ? "border-red-200 bg-red-50 text-red-700"
      : status === "completed"
        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
        : status === "processing"
          ? "border-blue-200 bg-blue-50 text-blue-700"
          : "border-amber-200 bg-amber-50 text-amber-700";
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusTone}`}
    >
      {status === "processing" && (
        <LoaderCircle className="size-3.5 animate-spin" />
      )}
      {status === "completed" && <CheckCircle2 className="size-3.5" />}
      {status === "failed" && <AlertCircle className="size-3.5" />}
      {status !== "processing" &&
        status !== "completed" &&
        status !== "failed" && <GitBranch className="size-3.5" />}
      {statusCopy[status]}
    </span>
  );
}
