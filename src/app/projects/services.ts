/** @format */

import { createClient } from "@/lib/supabase/server";

type CreateProjectData = {
  userId: string;
  name: string;
  description: string | null;
};

export async function createProject(data: CreateProjectData) {
  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      user_id: data.userId,
      name: data.name,
      description: data.description,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return project;
}
