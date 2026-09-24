/** @format */

"use client";

import { useState } from "react";
import type { WorkspaceState } from "../services";
import RepositoryConnectionModal from "./RepositoryConnectionModal";
import RepositoryList from "./RepositoryList";

interface RepositorySectionProps {
  projectId: string;
  workspace: WorkspaceState;
}

export default function RepositorySection({
  projectId,
  workspace,
}: RepositorySectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const repositories = workspace.repositories;

  return (
    <>
      <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Step 01
            </p>
            <h2 className="mt-2 text-lg font-semibold text-foreground">
              Repositories
            </h2>

            <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
              Start with a repository and turn its structure into a map your
              team can understand.
            </p>
          </div>

          <span
            className={`hidden shrink-0 rounded-full border px-3 py-1 text-xs font-medium sm:inline-flex ${
              repositories.length > 0
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-amber-200 bg-amber-50 text-amber-700"
            }`}
          >
            {repositories.length === 0 ? "Not connected" : "Connected"}
          </span>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-xl border border-dashed border-border bg-background px-5 py-6 sm:flex-row sm:items-center">
          <RepositoryList repositories={repositories} />

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex w-full shrink-0 items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
          >
            + Add repository
          </button>
        </div>
      </section>

      <RepositoryConnectionModal
        projectId={projectId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
