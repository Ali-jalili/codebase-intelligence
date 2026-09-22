/** @format */
"use server";

import { getCurrentUser } from "@/actions/auth";

import { createProject as createProjectInDb } from "./services";
interface CreateProjectSuccess {
  success: true;
}

interface CreateProjectFailure {
  success: false;
  error: string;
  field?: string;
}

type CreateProjectResult = CreateProjectSuccess | CreateProjectFailure;

export async function createProjectAction(
  formData: FormData,
): Promise<CreateProjectResult> {
  const name = formData.get("name")?.toString() ?? "";
  const description = formData.get("description")?.toString() ?? "";

  const projectName = name.trim();

  if (!projectName) {
    return {
      success: false,
      error: "Project name is required",
      field: "name",
    };
  }

  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  try {
    await createProjectInDb({
      userId: user.id,
      name: projectName,
      description: description.trim() || null,
    });

    return {
      success: true,
    };
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "23505"
    ) {
      return {
        success: false,
        error: "This project name is already in use. Choose a different name.",
        field: "name",
      };
    }

    return {
      success: false,
      error: "Failed to create project",
    };
  }
}
