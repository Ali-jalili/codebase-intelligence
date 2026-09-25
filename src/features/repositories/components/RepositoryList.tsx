/** @format */

import { CheckCircle2, GitBranch } from "lucide-react";
import type { Repository } from "@/features/repositories/types";

interface RepositoryListProps {
  repositories: Repository[];
}

export default function RepositoryList({ repositories }: RepositoryListProps) {
  const isEmpty = repositories.length === 0;
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
        {!isEmpty ? (
          <CheckCircle2 className="size-5" />
        ) : (
          <GitBranch className="size-5" />
        )}
      </div>
      <div className="min-w-0">
        {isEmpty ? (
          <>
            <h3 className="text-sm font-medium text-foreground">
              No repositories connected
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Add a GitHub repository to begin the analysis.
            </p>
          </>
        ) : (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">
              Connected repositories
            </h3>
            {repositories.map((repository) => (
              <div key={repository.id} className="text-sm">
                <p className="font-medium text-foreground">{repository.name}</p>
                <p className="mt-1 break-all text-muted-foreground">
                  {repository.provider} · {repository.url} · {repository.branch}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
