/** @format */

import { createClient } from "@/lib/supabase/server";

export type Repository = {
  id: string;
  project_id: string;
  name: string;
  provider: string;
  url: string;
  branch: string;
  created_at: string;
  updated_at: string;
};

export type Analysis = {
  id: string;
  repository_id: string;
  status: string;
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
  repositories: Repository[];
  analyses: Analysis[];
};

type CreateRepositoryData = {
  projectId: string;
  url: string;
  branch: string;
};

export async function createRepository(data: CreateRepositoryData) {
  const supabase = await createClient();
  const repositoryUrl = new URL(data.url);
  const repositoryName =
    repositoryUrl.pathname
      .split("/")
      .filter(Boolean)
      .pop()
      ?.replace(/\.git$/, "") || "repository";

  const { data: repository, error } = await supabase
    .from("repositories")
    .insert({
      project_id: data.projectId,
      name: repositoryName,
      provider: "github",
      url: data.url,
      branch: data.branch,
    })
    .select()
    .single();

  if (error) throw error;

  return repository as Repository;
}

export async function getRepositoriesForProject(projectId: string) {
  const supabase = await createClient();

  const { data: repositories, error } = await supabase
    .from("repositories")
    .select("*")
    .eq("project_id", projectId);

  if (error) throw error;

  return (repositories ?? []) as Repository[];
}

export function getWorkspaceStatus(
  repositories: Repository[],
): WorkspaceStatus {
  return repositories.length === 0 ? "EMPTY" : "REPOSITORY_CONNECTED";
}

export async function createAnalysis(repositoryId: string) {
  const supabase = await createClient();

  const { data: analysis, error } = await supabase
    .from("analyses")
    .insert({
      repository_id: repositoryId,
      status: "pending",
    })
    .select()
    .single();

  if (error) throw error;

  return analysis as Analysis;
}

export async function getAnalysisForRepositories(
  repositoryIds: string[],
): Promise<Analysis[]> {
  if (repositoryIds.length === 0) return [];

  const supabase = await createClient();

  const { data: analyses, error } = await supabase
    .from("analyses")
    .select("*")
    .in("repository_id", repositoryIds);

  if (error) throw error;

  return (analyses ?? []) as Analysis[];
}

export async function getWorkspaceState(
  projectId: string,
): Promise<WorkspaceState> {
  const repositories = await getRepositoriesForProject(projectId);
  const repositoryIds = repositories.map((repository) => repository.id);
  const analyses = await getAnalysisForRepositories(repositoryIds);

  return {
    status: getWorkspaceStatus(repositories),
    repositories,
    analyses,
  };
}
