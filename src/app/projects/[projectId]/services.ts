/** @format */

import { createClient } from "@/lib/supabase/server";

export type Repository = {
  id: string;
  project_id: string;
  user_id: string;
  url: string;
  branch: string;
  created_at: string;
  updated_at: string;
};

export type WorkspaceStatus =
  | "EMPTY"
  | "REPOSITORY_CONNECTED"
  | "ANALYZING"
  | "READY"
  | "FAILED";

export type WorkspaceState = {
  status: WorkspaceStatus;
  repository: Repository | null;
};

type CreateRepositoryData = {
  projectId: string;
  userId: string;
  url: string;
  branch: string;
};

export async function createRepository(data: CreateRepositoryData) {
  const supabase = await createClient();

  const { data: repository, error } = await supabase
    .from("repositories")
    .insert({
      project_id: data.projectId,
      user_id: data.userId,
      url: data.url,
      branch: data.branch,
    })
    .select()
    .single();

  if (error) throw error;

  return repository as Repository;
}

export async function getRepositoryForProject(projectId: string) {
  const supabase = await createClient();

  const { data: repository, error } = await supabase
    .from("repositories")
    .select("*")
    .eq("project_id", projectId)
    .maybeSingle();

  if (error) throw error;

  return repository as Repository | null;
}

export function getWorkspaceStatus(
  repository: Repository | null,
): WorkspaceStatus {
  return repository ? "REPOSITORY_CONNECTED" : "EMPTY";
}

export async function getWorkspaceState(
  projectId: string,
): Promise<WorkspaceState> {
  const repository = await getRepositoryForProject(projectId);

  return {
    status: getWorkspaceStatus(repository),
    repository,
  };
}
