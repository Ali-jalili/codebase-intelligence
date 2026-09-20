/** @format */

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-foreground"
          >
            Codebase Intelligence
          </Link>

          <p className="mt-2 max-w-sm text-sm text-muted">
            Understand, analyze, and transform complex codebases into structured
            knowledge.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>

          <Link
            href="/login"
            className="transition-colors hover:text-foreground"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="transition-colors hover:text-foreground"
          >
            Signup
          </Link>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-sm text-muted">
        © {new Date().getFullYear()} Codebase Intelligence. All rights reserved.
      </div>
    </footer>
  );
}
