/** @format */

import { getCurrentUser } from "@/features/auth/actions";
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
  if (error) throw error;
  return project;
}

export async function getProjects() {
  const user = await getCurrentUser();
  if (!user) throw new Error("User not found");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function getProjectById(projectId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .eq("user_id", user.id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function projectBelongsToUser(projectId: string, userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id")
    .eq("id", projectId)
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return Boolean(data);
}
