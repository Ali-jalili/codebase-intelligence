/** @format */
"use client";
import { useRouter } from "next/navigation";

import { handleSignUp } from "@/actions/auth";

import AuthCard from "@/components/AuthCard";

export default function SignupPage() {
  const router = useRouter();

  async function handleSignupSubmit(formData: FormData) {
    const result = await handleSignUp(formData);
    console.log(result);

    if (result.success) {
      router.push("/dashboard");
    } else {
      alert(result.error);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6">
      <AuthCard
        title="Create your account"
        description="Start understanding and analyzing your codebases."
      >
        <form className="space-y-5" action={handleSignupSubmit}>
          <div className="space-y-2">
            <label className="text-sm text-foreground">Name</label>

            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-foreground">Email</label>

            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-foreground">Password</label>

            <input
              type="password"
              name="password"
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-foreground">Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3 text-sm font-medium text-white transition hover:bg-primary-hover"
          >
            Create Account
          </button>
        </form>
      </AuthCard>
    </main>
  );
}
