/** @format */

"use server";

import { createClient } from "@/lib/supabase/server";

async function handleSignUp(
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  const name = formData.get("name")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

  if (password !== confirmPassword) {
    return {
      success: false,
      error: "Passwords do not match",
    };
  }

  if (password.length < 6) {
    console.error("Password must be at least 6 characters");
    return {
      success: false,
      error: "Password must be at least 6 characters",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    console.error("Error signing up:", error);
    return {
      success: false,
      error: "Error signing up: " + error.message,
    };
  }

  return {
    success: true,
  };
}

async function handleLogin(formData: FormData): Promise<{
  success: boolean;
  error?: string;
}> {
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
  };
}

async function handleLogout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  return {
    success: true,
  };
}

async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

async function createProject(formData: FormData) {
  const name = formData.get("name")?.toString() ?? "";
  const description = formData.get("description")?.toString() ?? "";

  if (!name.trim()) {
    return {
      success: false,
      error: "Project name is required",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("projects").insert({
    name,
    description,
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

export {
  handleSignUp,
  handleLogin,
  handleLogout,
  getCurrentUser,
  createProject,
};
