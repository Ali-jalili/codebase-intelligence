/** @format */

import Link from "next/link";
import { ArrowUpRight, Braces, GitBranch } from "lucide-react";
import { getProjectLibrary } from "@/features/projects/services";
import ProjectCard from "@/features/projects/components/ProjectCard";
import EmptyProjects from "@/features/projects/components/EmptyProjects";

export default async function ProjectsPage() {
  const projects = await getProjectLibrary();
  const repositoryCount = projects.reduce(
    (total, project) => total + project.repositories.length,
    0,
  );

  return (
    <main className="relative min-h-[calc(100svh-4rem)] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 bg-[linear-gradient(to_right,#dce4f2_1px,transparent_1px),linear-gradient(to_bottom,#dce4f2_1px,transparent_1px)] bg-size-[48px_48px] mask-[linear-gradient(to_bottom,black,transparent_75%)]" />
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <header className="relative overflow-hidden border-y border-[#dce3f1] bg-[#f8faff]/90 px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
          <div className="absolute -right-12 -top-24 size-72 rounded-full border border-[#dce5fa] sm:right-10 sm:-top-47.5 sm:size-105" />
          <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 items-center gap-3 font-mono text-[10px] text-muted-foreground lg:flex">
            <span className="grid size-9 place-items-center rounded-md border border-[#c9d6fb] bg-white text-primary">
              <Braces size={18} />
            </span>
            <span className="h-px w-8 bg-[#9eb5ed]" />
            <span className="grid size-9 place-items-center rounded-md border border-[#d9e9b9] bg-[#f7fbea] text-[#668c1f]">
              <GitBranch size={17} />
            </span>
            <span className="h-px w-8 bg-[#9eb5ed]" />
            <span className="text-[9px] uppercase tracking-[0.13em]">
              source / structure / insight
            </span>
          </div>

          <div className="relative max-w-2xl">
            <div className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-xs">
              <span className="size-1.5 rounded-full bg-[#a6d64d]" />
              Codebase library
              <span className="text-[#b6c0d2]">/</span>
              <span className="text-primary">
                {String(projects.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-4xl font-semibold leading-[1.04] tracking-tight text-foreground sm:text-5xl">
                  Your code,
                  <br className="hidden sm:block" /> in context.
                </h1>
                <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                  Every repository has a shape. Keep the ones you are exploring
                  close at hand.
                </p>
              </div>
              {projects.length > 0 && (
                <Link
                  href="/projects/new"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-foreground px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-primary"
                >
                  New codebase
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
          <div className="relative mt-8 flex flex-wrap gap-x-7 gap-y-2 border-t border-[#e2e8f2] pt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-[11px]">
            <span>
              <strong className="font-medium text-foreground">
                {projects.length}
              </strong>{" "}
              {projects.length === 1 ? "workspace" : "workspaces"}
            </span>
            <span>
              <strong className="font-medium text-foreground">
                {repositoryCount}
              </strong>{" "}
              {repositoryCount === 1
                ? "repository connected"
                : "repositories connected"}
            </span>
          </div>
        </header>

        <section className="mt-10 sm:mt-12">
          {projects.length === 0 ? (
            <EmptyProjects />
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  In your library
                </h2>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {String(projects.length).padStart(2, "0")} entries
                </span>
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </section>
        <footer className="mt-14 flex items-center justify-between border-t border-[#dce3f1] pt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>Repository intelligence</span>
          <span>Built for understanding systems</span>
        </footer>
      </div>
    </main>
  );
}
