/** @format */

import Link from "next/link";
import { ArrowUpRight, GitBranch, Layers3 } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string | null;
    repositories: { id: string; name: string; branch: string }[];
  };
  index: number;
}

const accents = [
  { line: "bg-primary", icon: "bg-[#edf2ff] text-primary" },
  { line: "bg-[#a6d64d]", icon: "bg-[#f2f8e6] text-[#668c1f]" },
  { line: "bg-[#ef9a7a]", icon: "bg-[#fff0e9] text-[#a94a2f]" },
];

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const accent = accents[index % accents.length];
  const repository = project.repositories[0];
  const hasRepository = project.repositories.length > 0;

  return (
    <article className="group relative flex min-h-62.5 flex-col overflow-hidden border border-[#dce3f1] bg-white/90 transition-colors hover:border-primary/50">
      <span className={`absolute inset-x-0 top-0 h-1 ${accent.line}`} />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <span
            className={`grid size-10 place-items-center rounded-md ${accent.icon}`}
          >
            <Layers3 size={18} aria-hidden="true" />
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h2 className="mt-5 truncate text-lg font-semibold tracking-tight text-foreground">
          {project.name}
        </h2>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
          {project.description || "A workspace for exploring this codebase."}
        </p>
        <div className="mt-auto pt-5">
          <div className="flex min-h-10 items-center gap-2 border-y border-[#e8edf5] py-2.5">
            <GitBranch size={14} className="shrink-0 text-muted-foreground" />
            {hasRepository ? (
              <>
                <span className="min-w-0 truncate font-mono text-xs text-foreground">
                  {repository.name}
                </span>
                <span className="ml-auto shrink-0 rounded-sm bg-[#f2f4f8] px-1.5 py-1 font-mono text-[9px] text-muted-foreground">
                  {repository.branch}
                </span>
              </>
            ) : (
              <span className="text-xs text-muted-foreground">
                Repository not connected
              </span>
            )}
          </div>
          <Link
            href={`/projects/${project.id}`}
            className="mt-4 inline-flex w-full items-center justify-between text-sm font-medium text-foreground transition-colors group-hover:text-primary"
          >
            <span>
              {hasRepository ? "Open codebase map" : "Connect a repository"}
            </span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
