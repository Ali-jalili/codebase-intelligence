/** @format */

"use client";

import { handleLogin } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const result = await handleLogin(formData);

    if (result.success) {
      toast.success("Signed in successfully");
      router.push("/dashboard");
    } else {
      toast.error(result.error);
    }
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

      <button
        type="submit"
        className="w-full rounded-lg bg-primary py-3 text-sm font-medium text-white transition hover:bg-primary-hover"
      >
        Sign in
      </button>
    </form>
  );
}
