/** @format */

"use server";

import { createClient } from "@/lib/supabase/server";

type AuthResult =
  | {
      success: true;
      redirectTo?: string;
      message?: string;
    }
  | {
      success: false;
      error: string;
      field?: "name" | "email" | "password" | "confirmPassword";
    };

async function handleSignUp(formData: FormData): Promise<AuthResult> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

  if (!name) {
    return { success: false, error: "Enter your name.", field: "name" };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      success: false,
      error: "Enter a valid email address.",
      field: "email",
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      error: "Use at least 6 characters for your password.",
      field: "password",
    };
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      error: "The passwords do not match.",
      field: "confirmPassword",
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) {
    const isDuplicateEmail =
      error.code === "user_already_exists" ||
      /already registered|already exists/i.test(error.message);

    return isDuplicateEmail
      ? {
          success: false,
          error: "An account with this email already exists. Sign in instead.",
          field: "email",
        }
      : {
          success: false,
          error: "We couldn't create your account. Please try again.",
        };
  }

  if (data.user && data.user.identities?.length === 0) {
    return {
      success: false,
      error: "An account with this email already exists. Sign in instead.",
      field: "email",
    };
  }

  return {
    success: true,
    redirectTo: data.session ? "/projects/new" : "/login",
    message: data.session
      ? "Your account is ready."
      : "Check your email for a confirmation link.",
  };
}

async function handleLogin(formData: FormData): Promise<AuthResult> {
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password) {
    return {
      success: false,
      error: "Enter a valid email and your password.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (error.code === "invalid_credentials") {
      return {
        success: false,
        error: "Email or password is incorrect. Check both and try again.",
      };
    }

    if (/email not confirmed/i.test(error.message)) {
      return {
        success: false,
        error: "Confirm your email before signing in.",
      };
    }

    return {
      success: false,
      error: "We couldn't sign you in. Please try again.",
    };
  }

  return { success: true, redirectTo: "/projects" };
}

async function handleLogout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return { success: true };
}

async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export { handleSignUp, handleLogin, handleLogout, getCurrentUser };
