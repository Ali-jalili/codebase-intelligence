/** @format */

"use client";

import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { handleLogin } from "@/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending && <Loader2 className="size-4 animate-spin" />}

      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}

export default function LoginForm() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const result = await handleLogin(formData);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Signed in successfully");

    router.push("/dashboard");
  }

  return (
    <form action={handleSubmit} className="space-y-5">
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
          placeholder="••••••••"
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
