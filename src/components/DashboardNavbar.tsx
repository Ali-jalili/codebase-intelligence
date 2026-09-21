/** @format */

"use client";

import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

import { handleLogout } from "@/actions/auth";
import Link from "next/dist/client/link";

type DashboardNavbarProps = {
  user: User | null;
};

export default function DashboardNavbar({ user }: DashboardNavbarProps) {
  const router = useRouter();

  async function logoutHandler() {
    const result = await handleLogout();

    if (result.success) {
      router.push("/login");
    }
  }

  return (
    <nav className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
      {/* Left */}
      <div className="flex items-center gap-8">
        <div className="text-lg font-semibold text-foreground">DevDesk</div>

        <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link href="/dashboard" className="transition hover:text-foreground">
            Dashboard
          </Link>

          <Link href="/projects" className="transition hover:text-foreground">
            Projects
          </Link>

          <Link
            href="/dashboard/analytics"
            className="transition hover:text-foreground"
          >
            Analytics
          </Link>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col text-right">
          <span className="text-sm font-medium text-foreground">
            {user?.user_metadata?.name ?? "User"}
          </span>

          <span className="text-xs text-muted-foreground">{user?.email}</span>
        </div>

        <button
          onClick={logoutHandler}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
