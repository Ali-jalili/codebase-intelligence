/** @format */

import ProjectHeader from "./ProjectHeader";
import RepositorySection from "./RepositorySection";
import AnalysisSection from "./AnalysisSection";
import IntelligenceSection from "./IntelligenceSection";

interface ProjectWorkspaceProps {
  project: {
    id: string;
    name: string;
    description: string | null;
  };
}

export default function ProjectWorkspace({ project }: ProjectWorkspaceProps) {
  return (
    <main className="min-h-[calc(100vh-4rem)] px-6 py-12">
      <div className="mx-auto max-w-5xl space-y-6">
        <ProjectHeader project={project} />

        <RepositorySection projectId={project.id} />

        <AnalysisSection />

        <IntelligenceSection />
      </div>
    </main>
  );
}
