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

export { handleSignUp };
