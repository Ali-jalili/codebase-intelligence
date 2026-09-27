/** @format */

import Link from "next/link";
import { ArrowRight, FileCode2, GitBranch, Layers3 } from "lucide-react";
import CreateProjectForm from "@/features/projects/components/CreateProjectForm";

export default function NewProjectPage() {
  return (
    <main className="relative min-h-[calc(100svh-4rem)] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 bg-[linear-gradient(to_right,#dce4f2_1px,transparent_1px),linear-gradient(to_bottom,#dce4f2_1px,transparent_1px)] bg-size-[48px_48px] mask-[linear-gradient(to_bottom,black,transparent_75%)]" />
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowRight size={13} aria-hidden="true" className="rotate-180" />
          Codebase library
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.8fr)] lg:gap-20">
          <section className="max-w-xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-[#a6d64d]" />
              New workspace <span className="text-[#b6c0d2]">/</span> 01 of 03
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.04] tracking-tight text-foreground sm:text-5xl">
              Give the code
              <br className="hidden sm:block" /> a place to land.
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              Start with a workspace name. Next, connect a GitHub repository;
              then we will map the system inside it.
            </p>

            <ol className="mt-9 border-y border-[#dce3f1]">
              <li className="flex items-center gap-4 border-b border-[#e6ebf4] py-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-foreground font-mono text-xs text-white">
                  01
                </span>
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-[#edf2ff] text-primary">
                  <Layers3 size={17} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-foreground">
                    Name the workspace
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    A home for one codebase
                  </span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-primary">
                  Now
                </span>
              </li>
              <li className="flex items-center gap-4 border-b border-[#e6ebf4] py-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-md border border-[#dce3f1] font-mono text-xs text-muted-foreground">
                  02
                </span>
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-[#f2f6ff] text-primary">
                  <GitBranch size={17} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-foreground">
                    Connect a source
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    Link a GitHub repository
                  </span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  Next
                </span>
              </li>
              <li className="flex items-center gap-4 py-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-md border border-[#dce3f1] font-mono text-xs text-muted-foreground">
                  03
                </span>
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-[#f5f8e9] text-[#668c1f]">
                  <FileCode2 size={17} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-foreground">
                    Explore the map
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    Trace modules and connections
                  </span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  Then
                </span>
              </li>
            </ol>

            <div className="mt-6 hidden items-center gap-3 font-mono text-[10px] text-muted-foreground sm:flex">
              <span className="flex -space-x-1" aria-hidden="true">
                <span className="grid size-6 place-items-center rounded-full border-2 border-background bg-[#dce7ff] text-primary">
                  <FileCode2 size={11} />
                </span>
                <span className="grid size-6 place-items-center rounded-full border-2 border-background bg-[#e9f6c9] text-[#668c1f]">
                  <GitBranch size={11} />
                </span>
                <span className="grid size-6 place-items-center rounded-full border-2 border-background bg-[#ffe2d8] text-[#a94a2f]">
                  <Layers3 size={11} />
                </span>
              </span>
              YOUR CODEBASE, MADE LEGIBLE
            </div>
          </section>

          <section className="lg:pt-2">
            <CreateProjectForm />
          </section>
        </div>
      </div>
    </main>
  );
}
