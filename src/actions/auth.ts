/** @format */

"use server";

import { createClient } from "@/lib/supabase/server";

async function handleSignUp(formData: FormData): Promise<void> {
  const name = formData.get("name")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

  if (password !== confirmPassword) {
    console.error("Passwords do not match");
    return;
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
    return;
  }
}

export { handleSignUp };
