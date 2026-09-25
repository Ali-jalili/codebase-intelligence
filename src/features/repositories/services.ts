/** @format */

import { createClient } from "@/lib/supabase/server";
import type { Repository } from "./types";
import { createAdminClient } from "@/lib/supabase/admin";

export async function createRepository(data: {
  projectId: string;
  url: string;
  branch: string;
}) {
  const supabase = await createClient();
  const repositoryPath = data.url.startsWith("git@github.com:")
    ? data.url.slice("git@github.com:".length)
    : new URL(data.url).pathname;
  const repositoryName =
    repositoryPath
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

export async function getRepositoryById(repositoryId: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("repositories")
    .select("*")
    .eq("id", repositoryId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
