/** @format */

import Link from "next/link";
import { FolderGit2 } from "lucide-react";

export default function EmptyProjects() {
  return (
    <div className="flex min-h-105 items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
          <FolderGit2 className="size-6" />
        </div>
        <h2 className="mt-5 text-lg font-semibold text-foreground">
          Your first codebase starts here
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Create a workspace, connect its repository, and open a map of how the
          code is put together.
        </p>
        <Link
          href="/projects/new"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Create your first codebase
        </Link>
      </div>
    </div>
  );
}
