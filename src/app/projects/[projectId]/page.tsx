/** @format */

import { getProjectById } from "../services";
import ProjectWorkspace from "./components/ProjectWorkspace";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  const project = await getProjectById(projectId);

  return <ProjectWorkspace project={project} />;
}
