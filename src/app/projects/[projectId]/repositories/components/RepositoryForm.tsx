/** @format */

"use client";

import { GitBranch } from "lucide-react";

export default function RepositoryForm() {
  return (
    <form className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      {/* Header */}

      <div className="border-b border-border bg-surface-elevated px-6 py-6 sm:px-8">
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <GitBranch className="size-5" />
          </div>

          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Connect Repository
            </h1>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Add a code repository to this project so it can be analyzed later.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}

      <div className="space-y-6 px-6 py-8 sm:px-8">
        <div className="space-y-2">
          <label
            htmlFor="url"
            className="block text-sm font-medium text-foreground"
          >
            Repository URL
          </label>

          <input
            id="url"
            name="url"
            type="url"
            placeholder="https://github.com/user/repository"
            className="
              w-full rounded-lg border border-input
              bg-background px-4 py-3 text-sm
              text-foreground outline-none
              transition-colors
              placeholder:text-muted-foreground
              focus:border-primary
              focus:ring-2
              focus:ring-primary/20
            "
          />

          <p className="text-xs text-muted-foreground">
            Enter the URL of the repository you want to connect.
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-foreground"
          >
            Branch
          </label>

          <input
            id="branch"
            name="branch"
            type="text"
            defaultValue="main"
            placeholder="main"
            className="
              w-full rounded-lg border border-input
              bg-background px-4 py-3 text-sm
              text-foreground outline-none
              transition-colors
              placeholder:text-muted-foreground
              focus:border-primary
              focus:ring-2
              focus:ring-primary/20
            "
          />

          <p className="text-xs text-muted-foreground">
            The branch that should be analyzed.
          </p>
        </div>

        <div className="flex justify-end border-t border-border pt-6">
          <button
            type="submit"
            className="
              rounded-lg
              bg-primary
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition-colors
              hover:bg-primary-hover
            "
          >
            Connect Repository
          </button>
        </div>
      </div>
    </form>
  );
}
