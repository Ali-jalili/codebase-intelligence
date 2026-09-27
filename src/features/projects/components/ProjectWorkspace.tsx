/** @format */

import type { WorkspaceState } from "@/features/projects/types";
import AnalysisSection from "@/features/analysis/components/AnalysisSection";
import IntelligenceSection from "@/features/analysis/components/IntelligenceSection";
import RepositorySection from "@/features/repositories/components/RepositorySection";
import ProjectHeader from "./ProjectHeader";

interface ProjectWorkspaceProps {
  project: { id: string; name: string; description: string | null };
  workspace: WorkspaceState;
}

export default function ProjectWorkspace({
  project,
  workspace,
}: ProjectWorkspaceProps) {
  const hasRepositories = workspace.repositories.length > 0;
  const isAnalyzed = workspace.analyses.some(
    (analysis) => analysis.status === "completed",
  );
  const isAnalyzing = workspace.analyses.some(
    (analysis) =>
      analysis.status === "processing" || analysis.status === "pending",
  );
  const workflowSteps = [
    {
      number: "01",
      label: "Connect source",
      href: "#source",
      state: hasRepositories ? "complete" : "active",
    },
    {
      number: "02",
      label: "Read the structure",
      href: "#analysis",
      state: isAnalyzing
        ? "active"
        : isAnalyzed
          ? "complete"
          : hasRepositories
            ? "active"
            : "upcoming",
    },
    {
      number: "03",
      label: "Explore the map",
      href: "#insights",
      state: isAnalyzed ? "active" : "upcoming",
    },
  ] as const;

  return (
    <main className="relative min-h-[calc(100svh-4rem)] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-35 bg-[linear-gradient(to_right,#dce4f2_1px,transparent_1px),linear-gradient(to_bottom,#dce4f2_1px,transparent_1px)] bg-size-[48px_48px] mask-[linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="mx-auto max-w-6xl space-y-8 px-5 py-8 sm:px-8 sm:py-12">
        <ProjectHeader
          project={project}
          repositoryCount={workspace.repositories.length}
        />

        <ol
          aria-label="Codebase workflow"
          className="grid grid-cols-3 border-y border-[#dce3f1] bg-white/65"
        >
          {workflowSteps.map((step, index) => {
            const isUnavailable = step.state === "upcoming" && !hasRepositories;
            const content = (
              <>
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-md font-mono text-[10px] ${step.state === "complete" ? "bg-[#eef5df] text-[#668c1f]" : step.state === "active" ? "bg-foreground text-white" : "border border-[#dce3f1] text-muted-foreground"}`}
                >
                  {step.number}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-semibold text-foreground sm:text-sm">
                    {step.label}
                  </span>
                  <span className="mt-1 block font-mono text-[8px] uppercase tracking-wider text-muted-foreground sm:text-[9px]">
                    {step.state === "complete"
                      ? "Complete"
                      : step.state === "active"
                        ? "In progress"
                        : "Up next"}
                  </span>
                </span>
              </>
            );

            return (
              <li key={step.number} className="relative min-w-0">
                {isUnavailable ? (
                  <div
                    aria-disabled="true"
                    className="flex min-h-18 cursor-not-allowed items-center gap-2 px-2 py-3 opacity-55 sm:gap-3 sm:px-5"
                  >
                    {content}
                  </div>
                ) : (
                  <a
                    href={step.href}
                    aria-current={step.state === "active" ? "step" : undefined}
                    className="flex min-h-18 items-center gap-2 px-2 py-3 transition-colors hover:bg-white/80 sm:gap-3 sm:px-5"
                  >
                    {content}
                  </a>
                )}
                {index < workflowSteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute right-0 top-1/2 h-7 -translate-y-1/2 border-r border-[#dce3f1]"
                  />
                )}
              </li>
            );
          })}
        </ol>

        {hasRepositories ? (
          <div className="space-y-10 sm:space-y-12">
            <nav
              aria-label="Workspace sections"
              className="-mb-5 flex gap-5 overflow-x-auto border-b border-[#dce3f1] sm:gap-7"
            >
              {[
                ["Source", "#source"],
                ["Analysis", "#analysis"],
                ["Intelligence", "#insights"],
              ].map(([label, href], index) => (
                <a
                  key={href}
                  href={href}
                  className={`whitespace-nowrap border-b-2 px-1 py-3 text-xs font-medium transition-colors sm:text-sm ${index === 0 ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:border-[#aebde0] hover:text-foreground"}`}
                >
                  {label}
                </a>
              ))}
            </nav>

            <div id="source" className="scroll-mt-24">
              <RepositorySection projectId={project.id} workspace={workspace} />
            </div>

            <div id="analysis" className="scroll-mt-24">
              <AnalysisSection
                repositories={workspace.repositories}
                analyses={workspace.analyses}
                status={workspace.status}
              />
            </div>

            <div id="insights" className="scroll-mt-24">
              <IntelligenceSection
                status={workspace.status}
                isReady={isAnalyzed}
                isAnalyzing={isAnalyzing}
              />
            </div>
          </div>
        ) : (
          <div id="source" className="scroll-mt-24">
            <RepositorySection projectId={project.id} workspace={workspace} />
          </div>
        )}
      </div>
    </main>
  );
}
