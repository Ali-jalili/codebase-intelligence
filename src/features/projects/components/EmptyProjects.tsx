/** @format */

import Link from "next/link";
import {
  ArrowRight,
  Braces,
  FileCode2,
  GitBranch,
  Layers3,
} from "lucide-react";

export default function EmptyProjects() {
  return (
    <div className="grid gap-10 border-y border-[#dce3f1] bg-white/70 px-5 py-8 sm:px-9 sm:py-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-12">
      <div className="max-w-lg">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="grid size-7 place-items-center rounded-sm bg-[#edf2ff] text-primary">
            <Braces size={15} />
          </span>
          Nothing mapped yet
        </div>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Your first codebase starts here
        </h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          Give a repository a home. We will turn its files and relationships
          into a map you can actually explore.
        </p>
        <Link
          href="/projects/new"
          className="mt-6 inline-flex items-center gap-3 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary"
        >
          Create your first codebase
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <div className="relative mx-auto flex min-h-48 w-full max-w-md items-center justify-center border border-[#e5eaf3] bg-[#fbfcff] p-5">
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(#cbd5e1_0.7px,transparent_0.7px)] bg-size-[16px_16px]" />
        <span className="absolute left-[10%] top-[22%] flex items-center gap-2 border border-[#dce4f4] bg-white px-2.5 py-2 font-mono text-[10px] text-foreground">
          <FileCode2 size={13} className="text-primary" /> files
        </span>
        <span className="absolute right-[9%] top-[28%] flex items-center gap-2 border border-[#dce4f4] bg-white px-2.5 py-2 font-mono text-[10px] text-foreground">
          <GitBranch size={13} className="text-primary" /> modules
        </span>
        <span className="absolute bottom-[17%] left-[37%] flex items-center gap-2 border border-[#d9e9b9] bg-[#f7fbea] px-2.5 py-2 font-mono text-[10px] text-foreground">
          <Layers3 size={13} className="text-[#668c1f]" /> system map
        </span>
        <span className="absolute left-[33%] top-[40%] h-px w-[32%] rotate-10 bg-[#aebde0]" />
        <span className="absolute left-[43%] top-[54%] h-[23%] w-px rotate-32 bg-[#b6cf7d]" />
        <span className="relative grid size-12 place-items-center rounded-full border border-[#bdcdf5] bg-white text-primary shadow-[0_0_0_8px_rgba(37,99,235,0.05)]">
          <Braces size={20} />
        </span>
      </div>
    </div>
  );
}
