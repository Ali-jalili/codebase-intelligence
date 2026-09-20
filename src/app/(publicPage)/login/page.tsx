/** @format */

import AuthCard from "@/components/AuthCard";

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6">
      <AuthCard
        title="Welcome back"
        description="Sign in to continue analyzing your codebases."
      >
        <form className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm text-foreground">Email</label>

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-foreground">Password</label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3 text-sm font-medium text-white transition hover:bg-primary-hover"
          >
            Sign in
          </button>
        </form>
      </AuthCard>
    </main>
  );
}
