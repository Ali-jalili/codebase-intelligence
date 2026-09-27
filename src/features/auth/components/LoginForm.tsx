/** @format */

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { handleLogin } from "@/features/auth/actions";

type LoginErrors = Partial<Record<"email" | "password" | "form", string>>;

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-md bg-foreground py-3 text-sm font-medium text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending && <Loader2 className="size-4 animate-spin" />}
      {pending ? "Signing in..." : "Sign in"}
      {!pending && <ArrowRight size={15} aria-hidden="true" />}
    </button>
  );
}

export default function LoginForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function clearError(field: keyof LoginErrors) {
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      delete next.form;
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const nextErrors: LoginErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!password) nextErrors.password = "Enter your password.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const result = await handleLogin(formData);
      if (!result.success) {
        setErrors({ form: result.error });
        return;
      }
      toast.success("Signed in successfully");
      router.push(result.redirectTo ?? "/projects");
    } catch {
      setErrors({ form: "We couldn't sign you in. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="login-email"
          className="text-sm font-medium text-foreground"
        >
          Email
        </label>
        <input
          id="login-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "login-email-error" : undefined}
          onChange={() => clearError("email")}
          className={`w-full rounded-md border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-primary/15 ${errors.email ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"}`}
        />
        {errors.email && (
          <p
            id="login-email-error"
            role="alert"
            className="text-xs text-destructive"
          >
            {errors.email}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="login-password"
          className="text-sm font-medium text-foreground"
        >
          Password
        </label>
        <input
          id="login-password"
          type="password"
          name="password"
          autoComplete="current-password"
          required
          placeholder="Your password"
          aria-invalid={Boolean(errors.password)}
          aria-describedby={
            errors.password ? "login-password-error" : undefined
          }
          onChange={() => clearError("password")}
          className={`w-full rounded-md border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-primary/15 ${errors.password ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"}`}
        />
        {errors.password && (
          <p
            id="login-password-error"
            role="alert"
            className="text-xs text-destructive"
          >
            {errors.password}
          </p>
        )}
      </div>
      {errors.form && (
        <p role="alert" className="text-sm text-destructive">
          {errors.form}
        </p>
      )}
      <SubmitButton pending={isSubmitting} />
      <p className="pt-1 text-center text-sm text-muted-foreground">
        New to Codebase Intelligence?{" "}
        <Link
          href="/signup"
          className="font-medium text-primary hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
