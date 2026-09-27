/** @format */

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Braces,
  FileCode2,
  GitBranch,
  Layers3,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { handleSignUp } from "@/features/auth/actions";
import AuthCard from "./AuthCard";

type SignupErrors = Partial<
  Record<"name" | "email" | "password" | "confirmPassword" | "form", string>
>;

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-md bg-foreground py-3 text-sm font-medium text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending && <Loader2 className="size-4 animate-spin" />}
      {pending ? "Creating account..." : "Create Account"}
    </button>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<SignupErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function clearError(field: keyof SignupErrors) {
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      delete next.form;
      return next;
    });
  }

  async function handleSignupSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";
    const nextErrors: SignupErrors = {};

    if (!name) nextErrors.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (password.length < 6) {
      nextErrors.password = "Use at least 6 characters.";
    }
    if (confirmPassword && password !== confirmPassword) {
      nextErrors.confirmPassword = "The passwords do not match.";
    } else if (!confirmPassword) {
      nextErrors.confirmPassword = "Confirm your password.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const result = await handleSignUp(formData);
      if (!result.success) {
        setErrors(
          result.field
            ? { [result.field]: result.error }
            : { form: result.error },
        );
        return;
      }
      toast.success(result.message ?? "Your account is ready.");
      router.push(result.redirectTo ?? "/projects/new");
    } catch {
      setErrors({ form: "We couldn't create your account. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto grid min-h-[calc(100svh-132px)] max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(380px,460px)] lg:gap-20">
      <section className="mx-auto w-full max-w-xl lg:mx-0">
        <div className="inline-flex items-center gap-2 border-l-2 border-[#a6d64d] pl-3 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-[#a6d64d]" />
          Your first workspace
        </div>
        <h1 className="mt-6 max-w-lg text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
          Meet your codebase from the inside.
        </h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          Create an account, connect a repository, and get a clearer starting
          point for exploring its structure.
        </p>

        <div className="relative mt-10 border-y border-border py-6">
          <div className="absolute bottom-8 left-4.75 top-8 border-l border-dashed border-[#b8c8ef]" />
          <div className="relative flex items-center gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-md border border-[#dce4f4] bg-white text-primary">
              <FileCode2 size={18} />
            </span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                Source
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                Files, routes, and modules
              </p>
            </div>
          </div>
          <div className="relative my-5 ml-4 flex items-center gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-md border border-[#c9d6fb] bg-[#f2f6ff] text-primary">
              <GitBranch size={18} />
            </span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                Connections
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                How the pieces work together
              </p>
            </div>
          </div>
          <div className="relative flex items-center gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-md border border-[#d9e9b9] bg-[#f7fbea] text-[#668c1f]">
              <Layers3 size={18} />
            </span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                Understanding
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                A map you can explore
              </p>
            </div>
          </div>
        </div>
      </section>

      <AuthCard
        title="Create your account"
        description="Set up your workspace in a few steps."
      >
        <form className="space-y-4" noValidate onSubmit={handleSignupSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="signup-name"
              className="text-sm font-medium text-foreground"
            >
              Name
            </label>
            <input
              id="signup-name"
              type="text"
              name="name"
              autoComplete="name"
              required
              placeholder="Your name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "signup-name-error" : undefined}
              onChange={() => clearError("name")}
              className={`w-full rounded-md border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-primary/15 ${errors.name ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"}`}
            />
            {errors.name && (
              <p
                id="signup-name-error"
                role="alert"
                className="text-xs text-destructive"
              >
                {errors.name}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="signup-email"
              className="text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "signup-email-error" : undefined}
              onChange={() => clearError("email")}
              className={`w-full rounded-md border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-primary/15 ${errors.email ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"}`}
            />
            {errors.email && (
              <p
                id="signup-email-error"
                role="alert"
                className="text-xs text-destructive"
              >
                {errors.email}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="signup-password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              name="password"
              autoComplete="new-password"
              required
              minLength={6}
              placeholder="At least 6 characters"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? "signup-password-error" : undefined
              }
              onChange={() => clearError("password")}
              className={`w-full rounded-md border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-primary/15 ${errors.password ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"}`}
            />
            {errors.password && (
              <p
                id="signup-password-error"
                role="alert"
                className="text-xs text-destructive"
              >
                {errors.password}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="signup-confirm-password"
              className="text-sm font-medium text-foreground"
            >
              Confirm password
            </label>
            <input
              id="signup-confirm-password"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              required
              placeholder="Repeat your password"
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword
                  ? "signup-confirm-password-error"
                  : undefined
              }
              onChange={() => clearError("confirmPassword")}
              className={`w-full rounded-md border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-primary/15 ${errors.confirmPassword ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"}`}
            />
            {errors.confirmPassword && (
              <p
                id="signup-confirm-password-error"
                role="alert"
                className="text-xs text-destructive"
              >
                {errors.confirmPassword}
              </p>
            )}
          </div>
          {errors.form && (
            <p role="alert" className="text-sm text-destructive">
              {errors.form}
            </p>
          )}
          <div className="pt-2">
            <SubmitButton pending={isSubmitting} />
          </div>
          <p className="pt-1 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </AuthCard>
    </main>
  );
}
