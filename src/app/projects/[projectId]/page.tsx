/** @format */

import { getWorkspaceState } from "@/features/analysis/services";
import ProjectWorkspace from "@/features/projects/components/ProjectWorkspace";
import { getProjectById } from "@/features/projects/services";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  const project = await getProjectById(projectId);
  const workspace = await getWorkspaceState(projectId);

  return <ProjectWorkspace project={project} workspace={workspace} />;
}
