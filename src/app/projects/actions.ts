/** @format */

import { getCurrentUser } from "@/actions/auth";
import { createClient } from "@/lib/supabase/server";

export async function createProject(formData: FormData) {
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

  const supabase = await createClient();

  const { error } = await supabase.from("projects").insert({
    user_id: user.id,
    name: projectName,
    description: description.trim() || null,
  });

  if (error) {
    return {
      success: false,
      error: "Failed to create project",
    };
  }

  return {
    success: true,
  };
}
