/** @format */

"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/actions/auth";
import { analyzeRepositoryTask } from "@/trigger-old/analyze-repository";
import { createAnalysis, createRepository, type Repository } from "./services";
import { projectBelongsToUser } from "../services";

type RepositoryResult =
  | { success: true; data: Repository }
  | { success: false; error: string; field?: "url" | "branch" };

export async function createRepositoryAction(
  formData: FormData,
): Promise<RepositoryResult> {
  const projectId = formData.get("projectId")?.toString() ?? "";
  const url = formData.get("url")?.toString().trim() ?? "";
  const branch = formData.get("branch")?.toString().trim() || "main";

  if (!projectId) {
    return { success: false, error: "Project context is missing." };
  }

  try {
    const repositoryUrl = new URL(url);

    if (
      !["http:", "https:"].includes(repositoryUrl.protocol) ||
      !["github.com", "www.github.com"].includes(repositoryUrl.hostname)
    ) {
      throw new Error("invalid_repository_url");
    }
  } catch {
    return {
      success: false,
      error: "Enter a valid repository URL.",
      field: "url",
    };
  }

  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      error: "Your session has expired. Sign in again.",
    };
  }

  try {
    if (!(await projectBelongsToUser(projectId, user.id))) {
      return { success: false, error: "Project not found or access denied." };
    }
  } catch {
    return { success: false, error: "Unable to verify project access." };
  }

  try {
    const repository = await createRepository({
      projectId,
      url,
      branch,
    });
    revalidatePath(`/projects/${projectId}`);
    return { success: true, data: repository };
  } catch {
    return {
      success: false,
      error: "We could not connect this repository. Please try again.",
    };
  }
}

export async function createAnalysisAction(repositoryId: string) {
  const analysis = await createAnalysis(repositoryId);
  await analyzeRepositoryTask.trigger({
    analysisId: analysis.id,
    repositoryId,
  });

  return analysis;
}
