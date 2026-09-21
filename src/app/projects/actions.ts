/** @format */

import { getCurrentUser } from "@/actions/auth";
import { createProject as createProjectInDb } from "./services";

export async function createProjectAction(formData: FormData) {
  const name = formData.get("name")?.toString() ?? "";
  const description = formData.get("description")?.toString() ?? "";

  const projectName = name.trim();

  if (!projectName) {
    return {
      success: false,
      error: "Project name is required",
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
  } catch {
    return {
      success: false,
      error: "Failed to create project",
    };
  }
}
