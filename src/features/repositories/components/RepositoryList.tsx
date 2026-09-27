/** @format */

import { FileCode2, GitBranch } from "lucide-react";
import type { Repository } from "@/features/repositories/types";

interface RepositoryListProps {
  repositories: Repository[];
}

export default function RepositoryList({ repositories }: RepositoryListProps) {
  if (repositories.length === 0) return null;

  return (
    <ul className="divide-y divide-[#e5eaf3]">
      {repositories.map((repository) => (
        <li
          key={repository.id}
          className="flex min-w-0 flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-md bg-[#edf2ff] text-primary">
              <FileCode2 size={17} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {repository.name}
              </p>
              <a
                href={repository.url}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block truncate text-xs text-muted-foreground hover:text-primary"
              >
                {repository.url}
              </a>
            </div>
          </div>
          <span className="ml-12 inline-flex w-fit items-center gap-2 rounded-sm bg-[#f2f4f8] px-2 py-1.5 font-mono text-[10px] text-muted-foreground sm:ml-0">
            <GitBranch size={12} aria-hidden="true" /> {repository.branch}
          </span>
        </li>
      ))}
    </ul>
  );
}
