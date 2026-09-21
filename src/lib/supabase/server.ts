/** @format */
import type { User } from "@supabase/supabase-js";
import { supabase } from "./client";

async function handleSignUp(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
): Promise<User | null> {

    
  if (password !== confirmPassword) {
    console.error("Passwords do not match");
    return null;
  }

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
    console.error("Error signing up:", error);
    return null;
  }

  return data.user;
}

export { handleSignUp };
