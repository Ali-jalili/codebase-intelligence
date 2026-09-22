/** @format */

import ProjectHeader from "./ProjectHeader";
import RepositorySection from "./RepositorySection";
import AnalysisSection from "./AnalysisSection";
import IntelligenceSection from "./IntelligenceSection";
import type { WorkspaceState } from "../services";

interface ProjectWorkspaceProps {
  project: {
    id: string;
    name: string;
    description: string | null;
  };
  workspace: WorkspaceState;
}

export default function ProjectWorkspace({
  project,
  workspace,
}: ProjectWorkspaceProps) {
  return (
    <main className="min-h-[calc(100vh-4rem)] px-6 py-12">
      <div className="mx-auto max-w-5xl space-y-6">
        <ProjectHeader project={project} />

        <nav className="flex gap-1 overflow-x-auto border-b border-border pb-px">
          {[
            ["Codebase map", "#map"],
            ["Analysis", "#analysis"],
            ["Insights", "#insights"],
          ].map(([label, href], index) => (
            <a
              key={href}
              href={href}
              className={`whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition-colors ${
                index === 0
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div id="map">
          <RepositorySection projectId={project.id} workspace={workspace} />
        </div>

        <div id="analysis">
          <AnalysisSection status={workspace.status} />
        </div>

        <div id="insights">
          <IntelligenceSection status={workspace.status} />
        </div>
      </div>
    </main>
  );
}
