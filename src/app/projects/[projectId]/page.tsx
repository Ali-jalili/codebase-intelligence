/** @format */

import { getWorkspaceState } from "./services";
import ProjectWorkspace from "./components/ProjectWorkspace";
import { getProjectById } from "../services";

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
