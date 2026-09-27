/** @format */

import AuthCard from "@/features/auth/components/AuthCard";
import LoginForm from "@/features/auth/components/LoginForm";
import { Braces, FileCode2, GitBranch } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-[calc(100svh-132px)] max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(380px,460px)] lg:gap-20">
      <section className="mx-auto w-full max-w-xl lg:mx-0">
        <div className="inline-flex items-center gap-2 border-l-2 border-[#a6d64d] pl-3 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-[#a6d64d]" />
          Back to your workspace
        </div>
        <h1 className="mt-6 max-w-lg text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
          Pick up where you left off.
        </h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          Return to your repositories and continue exploring how their pieces
          fit together.
        </p>

        <div className="mt-10 max-w-lg border-y border-border py-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-muted-foreground">
            A clearer view, one layer at a time
          </p>
          <div className="mt-5 flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            <span className="inline-flex items-center gap-2 rounded-md border border-[#dce4f4] bg-white px-3 py-2 text-xs font-medium text-foreground">
              <FileCode2 size={14} className="text-primary" /> Source
            </span>
            <span className="hidden h-px w-5 bg-[#b8c8ef] sm:block" />
            <span className="inline-flex items-center gap-2 rounded-md border border-[#c9d6fb] bg-[#f2f6ff] px-3 py-2 text-xs font-medium text-foreground">
              <GitBranch size={14} className="text-primary" /> Relationships
            </span>
            <span className="hidden h-px w-5 bg-[#b8c8ef] sm:block" />
            <span className="inline-flex items-center gap-2 rounded-md border border-[#d9e9b9] bg-[#f7fbea] px-3 py-2 text-xs font-medium text-foreground">
              <Braces size={14} className="text-[#668c1f]" /> Context
            </span>
          </div>
        </div>
      </section>

      <AuthCard
        title="Welcome back"
        description="Sign in to continue exploring your codebase."
      >
        <LoginForm />
      </AuthCard>
    </main>
  );
}
