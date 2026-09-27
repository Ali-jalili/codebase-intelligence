/** @format */

import Link from "next/link";
import { ArrowUpRight, Braces } from "lucide-react";
import type { User } from "@supabase/supabase-js";

type NavbarProps = {
  user: User | null;
};

export default function Navbar({ user }: NavbarProps) {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-foreground"
        >
          <span className="grid size-8 place-items-center rounded-md bg-primary text-white">
            <Braces size={17} aria-hidden="true" />
          </span>
          Codebase Intelligence
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary"
            >
              Open workspace
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
