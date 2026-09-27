/** @format */

import Link from "next/link";
import { ArrowLeft, Braces, GitBranch } from "lucide-react";

interface ProjectHeaderProps {
  project: { name: string; description: string | null };
  repositoryCount: number;
}

export default function ProjectHeader({
  project,
  repositoryCount,
}: ProjectHeaderProps) {
  return (
    <section className="border-b border-[#dce3f1] pb-7">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft size={13} aria-hidden="true" /> Codebases
      </Link>
      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            <Braces size={14} className="text-primary" aria-hidden="true" />
            Codebase workspace
          </div>
          <h1 className="mt-3 wrap-break-word text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            {project.name}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            {project.description ||
              "Trace the source, understand the structure, and follow the connections."}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 self-start rounded-md border border-[#dce3f1] bg-white/80 px-3 py-2 sm:self-auto">
          <GitBranch size={14} className="text-primary" aria-hidden="true" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {String(repositoryCount).padStart(2, "0")}{" "}
            {repositoryCount === 1 ? "source" : "sources"}
          </span>
        </div>
      </div>
    </section>
  );
}
