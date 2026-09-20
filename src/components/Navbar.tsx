/** @format */

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Brand */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Codebase Intelligence
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Home
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
