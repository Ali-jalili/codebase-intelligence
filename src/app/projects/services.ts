/** @format */

import { getCurrentUser } from "@/actions/auth";
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

export async function getProjects() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
