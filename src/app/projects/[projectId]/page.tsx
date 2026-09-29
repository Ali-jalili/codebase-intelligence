/** @format */

import {
  getAnalysisSnapshot,
  getWorkspaceState,
} from "@/features/analysis/services";

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

  const analysis = workspace.analyses[0];

  const snapshot =
    analysis?.status === "completed"
      ? await getAnalysisSnapshot(analysis.id)
      : null;

  return (
    <ProjectWorkspace
      project={project}
      workspace={workspace}
      snapshot={snapshot}
    />
  );
}
