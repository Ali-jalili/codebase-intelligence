/** @format */

"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import type { WorkspaceState } from "@/features/projects/types";
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
      <section aria-labelledby="repository-section-title">
        <div className="flex flex-col gap-4 border-b border-[#dce3f1] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
              01 / Source
            </p>
            <h2
              id="repository-section-title"
              className="mt-2 text-xl font-semibold tracking-tight text-foreground"
            >
              Repository connections
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              Connect the source code this workspace should map and analyze.
            </p>
          </div>
          {repositories.length > 0 && (
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-[#cfd9eb] bg-white px-3.5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Plus size={15} aria-hidden="true" /> Add source
            </button>
          )}
        </div>
        {repositories.length === 0 ? (
          <div className="flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:py-8">
            <div className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-md border border-[#dce3f1] bg-white text-muted-foreground">
                <span className="size-2 rounded-full bg-[#e6ae51]" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  No source connected yet
                </h3>
                <p className="mt-1 max-w-lg text-sm leading-6 text-muted-foreground">
                  Add a public GitHub repository to start tracing files,
                  modules, and their relationships.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-md bg-foreground px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-primary sm:w-auto"
            >
              <Plus size={16} aria-hidden="true" /> Connect a repository
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 border-b border-[#dce3f1] py-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            <Check size={13} className="text-[#668c1f]" aria-hidden="true" />
            {repositories.length}{" "}
            {repositories.length === 1
              ? "source connected"
              : "sources connected"}
          </div>
        )}
        <RepositoryList repositories={repositories} />
      </section>
      <RepositoryConnectionModal
        projectId={projectId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
