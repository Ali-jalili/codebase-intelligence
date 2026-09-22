/** @format */

"use server";

import { createClient } from "@/lib/supabase/server";

type AuthResult =
  | {
      success: true;
      redirectTo?: string;
    }
  | {
      success: false;
      error: string;
    };

async function handleSignUp(formData: FormData): Promise<AuthResult> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

  if (password !== confirmPassword) {
    return {
      success: false,
      error: "Passwords do not match",
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      error: "Password must be at least 6 characters",
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    redirectTo: data.session ? "/projects/new" : "/login",
  };
}

async function handleLogin(formData: FormData): Promise<AuthResult> {
  const email = formData.get("email")?.toString().trim() ?? "";
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
    redirectTo: "/projects",
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

export { handleSignUp, handleLogin, handleLogout, getCurrentUser };
