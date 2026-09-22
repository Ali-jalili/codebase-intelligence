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
    // } catch {
    //   return {
    //     success: false,
    //     error: "Failed to create project",
    //   };
    // }
  } catch (error) {
    console.log("CREATE PROJECT ERROR:", error);

    if (
      error instanceof Error &&
      error.message.includes("projects_user_id_name_unique")
    ) {
      return {
        success: false,
        error: "A project with this name already exists.",
      };
    }

    return {
      success: false,
      error: "Failed to create project",
    };
  }
}
