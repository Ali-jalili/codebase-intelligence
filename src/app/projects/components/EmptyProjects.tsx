/** @format */

import Link from "next/link";

import { FolderGit2 } from "lucide-react";

export default function EmptyProjects() {
  return (
    <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
          <FolderGit2 className="size-6" />
        </div>

        <h2 className="mt-5 text-lg font-semibold text-foreground">
          Start understanding your codebase
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Create a workspace and connect your repository to explore your
          application structure and architecture.
        </p>

        <Link
          href="/projects/new"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Create Workspace
        </Link>
      </div>
    </div>
  );
}
