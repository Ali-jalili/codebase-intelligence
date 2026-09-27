/** @format */

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Braces, ChevronDown, FolderGit2, LogOut, Plus } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { handleLogout } from "@/features/auth/actions";

type CodebaseNavbarProps = {
  user: User | null;
};

export default function CodebaseNavbar({ user }: CodebaseNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const displayName =
    user?.user_metadata?.name?.toString() ??
    user?.email?.split("@")[0] ??
    "Account";
  const initials = displayName.slice(0, 1).toUpperCase();

  async function signOut() {
    setIsSigningOut(true);
    await handleLogout();
    router.replace("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link
          href="/projects"
          aria-label="Codebase Intelligence library"
          className="flex shrink-0 items-center gap-2.5 text-base font-semibold tracking-tight text-foreground"
        >
          <span className="grid size-8 place-items-center rounded-md bg-primary text-white">
            <Braces size={17} aria-hidden="true" />
          </span>
          <span className="hidden sm:inline">Codebase Intelligence</span>
        </Link>

        <Link
          href="/projects"
          aria-current={pathname === "/projects" ? "page" : undefined}
          className={`inline-flex min-w-9 items-center justify-center gap-2 rounded-md px-2.5 py-2 text-sm font-medium transition-colors sm:ml-5 sm:justify-start sm:px-3 ${pathname === "/projects" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
        >
          <FolderGit2 size={16} aria-hidden="true" />
          <span className="hidden sm:inline">Codebases</span>
        </Link>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {pathname !== "/projects/new" && pathname !== "/projects" && (
            <Link
              href="/projects/new"
              aria-label="Create a new codebase"
              className="inline-flex size-9 items-center justify-center rounded-md bg-foreground text-white transition-colors hover:bg-primary sm:h-10 sm:w-auto sm:gap-2 sm:px-3.5"
            >
              <Plus size={16} aria-hidden="true" />
              <span className="hidden text-sm font-medium sm:inline">
                New codebase
              </span>
            </Link>
          )}

          <details className="group relative">
            <summary
              aria-label="Open account menu"
              className="flex cursor-pointer list-none items-center gap-2 rounded-md p-1.5 transition-colors hover:bg-muted [&::-webkit-details-marker]:hidden"
            >
              <span className="grid size-8 place-items-center rounded-full bg-[#e8efff] text-xs font-semibold text-primary">
                {initials}
              </span>
              <span className="hidden max-w-32 truncate text-sm font-medium text-foreground md:inline">
                {displayName}
              </span>
              <ChevronDown
                size={14}
                aria-hidden="true"
                className="hidden text-muted-foreground sm:block"
              />
            </summary>
            <div className="absolute right-0 top-full mt-2 w-64 rounded-lg border border-border bg-surface p-2 shadow-lg">
              <div className="border-b border-border px-3 py-2">
                <p className="text-xs font-medium text-foreground">
                  Signed in as
                </p>
                <p className="mt-1 break-all text-xs text-muted-foreground">
                  {user?.email}
                </p>
              </div>
              <button
                type="button"
                onClick={signOut}
                disabled={isSigningOut}
                className="mt-1 flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-60"
              >
                <LogOut size={15} aria-hidden="true" />
                {isSigningOut ? "Signing out..." : "Sign out"}
              </button>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
