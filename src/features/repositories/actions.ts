/** @format */

"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/features/auth/actions";
import { projectBelongsToUser } from "@/features/projects/services";
import { createRepository } from "./services";
import type { Repository } from "./types";

type RepositoryResult =
  | { success: true; data: Repository }
  | { success: false; error: string; field?: "url" | "branch" };

export async function createRepositoryAction(
  formData: FormData,
): Promise<RepositoryResult> {
  const projectId = formData.get("projectId")?.toString() ?? "";
  const url = formData.get("url")?.toString().trim() ?? "";
  const branch = formData.get("branch")?.toString().trim() || "main";
  if (!projectId)
    return { success: false, error: "Project context is missing." };
  try {
    const isHttpsGithub =
      url.startsWith("https://github.com/") ||
      url.startsWith("https://www.github.com/");

    const isSshGithub = url.startsWith("git@github.com:");

    if (!isHttpsGithub && !isSshGithub) {
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
  if (!user)
    return {
      success: false,
      error: "Your session has expired. Sign in again.",
    };
  try {
    if (!(await projectBelongsToUser(projectId, user.id)))
      return { success: false, error: "Project not found or access denied." };
  } catch {
    return { success: false, error: "Unable to verify project access." };
  }
  try {
    const repository = await createRepository({ projectId, url, branch });
    revalidatePath(`/projects/${projectId}`);
    return { success: true, data: repository };
  } catch {
    return {
      success: false,
      error: "We could not connect this repository. Please try again.",
    };
  }
}
