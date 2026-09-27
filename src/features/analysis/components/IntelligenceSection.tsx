/** @format */

import type { WorkspaceStatus } from "@/features/projects/types";
import { ArrowRight, Sparkles } from "lucide-react";

export default function IntelligenceSection({
  status,
  isReady,
  isAnalyzing,
}: {
  status: WorkspaceStatus;
  isReady: boolean;
  isAnalyzing: boolean;
}) {
  return (
    <section aria-labelledby="intelligence-section-title">
      <div className="flex flex-col gap-4 border-b border-[#dce3f1] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
            03 / Findings
          </p>
          <h2
            id="intelligence-section-title"
            className="mt-2 text-xl font-semibold tracking-tight text-foreground"
          >
            Explore the intelligence
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            A place for the relationships and entry points discovered in your
            code.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span
            className={`size-1.5 rounded-full ${isReady ? "bg-[#8ebc3f]" : isAnalyzing ? "animate-pulse bg-primary" : "bg-[#c3cad6]"}`}
          />
          {isReady
            ? "Analysis complete"
            : isAnalyzing
              ? "Analysis running"
              : status === "FAILED"
                ? "Needs attention"
                : "Awaiting analysis"}
        </span>
      </div>
      <div className="relative mt-5 overflow-hidden border border-[#dce3f1] bg-[#fbfcff] px-5 py-6 sm:px-7 sm:py-8">
        <div className="absolute inset-0 opacity-45 bg-[radial-gradient(#cbd5e1_0.7px,transparent_0.7px)] bg-size-[18px_18px]" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-md border border-[#d9e9b9] bg-[#f7fbea] text-[#668c1f]">
              <Sparkles size={18} aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {isReady
                  ? "Your latest codebase scan is complete."
                  : isAnalyzing
                    ? "The system map is being prepared."
                    : status === "FAILED"
                      ? "The latest scan needs another look."
                      : "Your map begins with an analysis."}
              </h3>
              <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
                {isReady
                  ? "Review scan status above. Architecture findings will be surfaced here as the analysis output becomes available."
                  : "Start an analysis from the previous step. This view will collect the architecture findings for this workspace."}
              </p>
            </div>
          </div>
          <a
            href="#analysis"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
          >
            Go to analysis <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
