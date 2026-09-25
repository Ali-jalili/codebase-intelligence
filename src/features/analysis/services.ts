/** @format */

import { createClient } from "@/lib/supabase/server";
import { getRepositoriesForProject } from "@/features/repositories/services";
import type { Analysis } from "./types";
import type {
  WorkspaceState,
  WorkspaceStatus,
} from "@/features/projects/types";
import { createAdminClient } from "@/lib/supabase/admin";

export function getWorkspaceStatus(
  repositories: Awaited<ReturnType<typeof getRepositoriesForProject>>,
): WorkspaceStatus {
  return repositories.length === 0 ? "EMPTY" : "REPOSITORY_CONNECTED";
}

export async function createAnalysis(repositoryId: string) {
  const supabase = await createClient();
  const { data: analysis, error } = await supabase
    .from("analyses")
    .insert({ repository_id: repositoryId, status: "pending" })
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
    .in("repository_id", repositoryIds)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (analyses ?? []) as Analysis[];
}

export async function getWorkspaceState(
  projectId: string,
): Promise<WorkspaceState> {
  const repositories = await getRepositoriesForProject(projectId);
  const repositoryIds = repositories.map((repository) => repository.id);
  const analyses = await getAnalysisForRepositories(repositoryIds);
  return { status: getWorkspaceStatus(repositories), repositories, analyses };
}

export async function updateAnalysisStatus(
  analysisId: string,
  status: Analysis["status"],
) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("analyses")
    .update({ status })
    .eq("id", analysisId)
    .select()
    .single();

  if (error) throw error;

  return data;
}
