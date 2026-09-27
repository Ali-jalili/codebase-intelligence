/** @format */

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleDot,
  FileCode2,
  GitBranch,
  Layers3,
  ScanSearch,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-[#f8faff]">
        <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
          <div className="relative z-10 max-w-xl">
            <div className="mb-7 inline-flex items-center gap-2 border-l-2 border-[#c6f36b] pl-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-[#a6d64d]" />
              Repository intelligence
            </div>

            <h1 className="text-5xl font-semibold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-[4.5rem]">
              Your codebase,
              <span className="block text-primary">made legible.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
              Turn an unfamiliar repository into a map of its architecture,
              moving parts, and the connections between them.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href="/signup"
                className="inline-flex items-center gap-3 rounded-md bg-foreground px-5 py-3.5 text-sm font-medium text-white transition-colors hover:bg-primary"
              >
                Map a repository
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                See how it works
                <ArrowDown size={15} aria-hidden="true" />
              </a>
            </div>

            <div className="mt-12 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex -space-x-1.5" aria-hidden="true">
                <span className="grid size-7 place-items-center rounded-full border-2 border-[#f8faff] bg-[#dce7ff] text-primary">
                  <FileCode2 size={13} />
                </span>
                <span className="grid size-7 place-items-center rounded-full border-2 border-[#f8faff] bg-[#e9f6c9] text-[#567d14]">
                  <GitBranch size={13} />
                </span>
                <span className="grid size-7 place-items-center rounded-full border-2 border-[#f8faff] bg-[#ffe2d8] text-[#a94a2f]">
                  <Sparkles size={13} />
                </span>
              </div>
              <span>From raw files to a readable system map</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[650px] lg:ml-auto">
            <div className="absolute -inset-8 -z-10 bg-[radial-gradient(ellipse_at_55%_45%,rgba(206,220,255,0.58),transparent_68%)]" />
            <div className="overflow-hidden rounded-lg border border-[#dce3f1] bg-white shadow-[0_28px_80px_-38px_rgba(20,40,90,0.35)]">
              <div className="flex h-12 items-center justify-between border-b border-[#e9edf5] px-4 sm:px-5">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-6 place-items-center rounded bg-[#edf2ff] text-primary">
                    <GitBranch size={14} />
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    nexus-platform
                  </span>
                  <span className="rounded bg-[#f2f4f8] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    main
                  </span>
                </div>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-[#88bd2f]" />{" "}
                  ANALYSIS READY
                </span>
              </div>

              <div className="grid min-h-[360px] sm:grid-cols-[155px_1fr]">
                <aside className="hidden border-r border-[#e9edf5] bg-[#fbfcff] p-4 sm:block">
                  <div className="mb-4 font-mono text-[9px] uppercase tracking-[0.13em] text-muted-foreground">
                    Repository
                  </div>
                  <div className="space-y-3 font-mono text-[10px] text-[#667085]">
                    <div className="flex items-center gap-2 text-foreground">
                      <Layers3 size={12} className="text-primary" /> src
                    </div>
                    <div className="ml-3 flex items-center gap-2">
                      <FileCode2 size={11} /> app
                    </div>
                    <div className="ml-3 flex items-center gap-2">
                      <FileCode2 size={11} /> api
                    </div>
                    <div className="ml-3 flex items-center gap-2 text-primary">
                      <FileCode2 size={11} /> services
                    </div>
                    <div className="ml-3 flex items-center gap-2">
                      <FileCode2 size={11} /> database
                    </div>
                    <div className="mt-5 flex items-center gap-2">
                      <FileCode2 size={11} /> package.json
                    </div>
                    <div className="flex items-center gap-2">
                      <FileCode2 size={11} /> tsconfig.json
                    </div>
                  </div>
                  <div className="mt-7 border-t border-[#e9edf5] pt-4">
                    <div className="font-mono text-[9px] uppercase tracking-[0.13em] text-muted-foreground">
                      Detected
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="rounded-sm bg-[#eaf0ff] px-1.5 py-1 font-mono text-[9px] text-[#315bc1]">
                        Next.js
                      </span>
                      <span className="rounded-sm bg-[#eef5df] px-1.5 py-1 font-mono text-[9px] text-[#537522]">
                        TypeScript
                      </span>
                    </div>
                  </div>
                </aside>

                <div className="relative flex min-h-[360px] flex-col p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-foreground">
                        System map
                      </div>
                      <div className="mt-1 font-mono text-[10px] text-muted-foreground">
                        24 modules{" "}
                        <span className="px-1 text-[#c4cad5]">/</span> 86
                        connections
                      </div>
                    </div>
                    <span
                      aria-hidden="true"
                      className="grid size-8 place-items-center rounded border border-[#e4e9f2] text-muted-foreground"
                    >
                      <ScanSearch size={15} />
                    </span>
                  </div>

                  <div className="relative my-5 flex-1 overflow-hidden rounded-md border border-[#edf0f6] bg-[#fcfdff]">
                    <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(#cbd5e1_0.7px,transparent_0.7px)] [background-size:17px_17px]" />
                    <div className="absolute left-[8%] top-[18%] flex items-center gap-2 rounded border border-[#dce4f4] bg-white px-2.5 py-2 shadow-sm">
                      <span className="size-2 rounded-full bg-[#7c9cf5]" />
                      <span className="font-mono text-[9px] text-foreground">
                        routes
                      </span>
                    </div>
                    <div className="absolute left-[38%] top-[12%] flex items-center gap-2 rounded border border-[#c9d6fb] bg-[#f2f6ff] px-2.5 py-2 shadow-sm">
                      <span className="size-2 rounded-full bg-primary" />
                      <span className="font-mono text-[9px] font-medium text-foreground">
                        api layer
                      </span>
                    </div>
                    <div className="absolute left-[67%] top-[26%] flex items-center gap-2 rounded border border-[#dce4f4] bg-white px-2.5 py-2 shadow-sm">
                      <span className="size-2 rounded-full bg-[#f0a17c]" />
                      <span className="font-mono text-[9px] text-foreground">
                        auth
                      </span>
                    </div>
                    <div className="absolute left-[22%] top-[54%] flex items-center gap-2 rounded border border-[#d9e9b9] bg-[#f7fbea] px-2.5 py-2 shadow-sm">
                      <span className="size-2 rounded-full bg-[#a6d64d]" />
                      <span className="font-mono text-[9px] font-medium text-foreground">
                        services
                      </span>
                    </div>
                    <div className="absolute left-[57%] top-[66%] flex items-center gap-2 rounded border border-[#dce4f4] bg-white px-2.5 py-2 shadow-sm">
                      <span className="size-2 rounded-full bg-[#7c9cf5]" />
                      <span className="font-mono text-[9px] text-foreground">
                        database
                      </span>
                    </div>
                    <div className="absolute left-[36%] top-[35%] grid size-12 place-items-center rounded-full border border-[#bdcdf5] bg-white text-primary shadow-[0_0_0_7px_rgba(37,99,235,0.06)]">
                      <CircleDot size={18} />
                    </div>
                    <span className="absolute left-[26%] top-[28%] h-px w-[17%] rotate-[-18deg] bg-[#aebde0]" />
                    <span className="absolute left-[53%] top-[28%] h-px w-[19%] rotate-[12deg] bg-[#aebde0]" />
                    <span className="absolute left-[34%] top-[51%] h-px w-[18%] rotate-[36deg] bg-[#b6cf7d]" />
                    <span className="absolute left-[60%] top-[51%] h-px w-[18%] rotate-[62deg] bg-[#aebde0]" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-sm border border-[#e9edf5] bg-white/90 px-2 py-1.5 font-mono text-[9px] text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-[#a6d64d]" /> 3
                      core paths identified
                    </div>
                  </div>

                  <div className="flex items-center gap-3 border-l-2 border-[#a6d64d] bg-[#f8fbea] px-3 py-2.5">
                    <Sparkles size={15} className="shrink-0 text-[#668c1f]" />
                    <p className="text-[11px] leading-5 text-[#3f5125]">
                      <span className="font-semibold">Key insight</span>{" "}
                      <span className="text-[#687653]">
                        Auth is shared by 6 API routes.
                      </span>
                    </p>
                    <ArrowUpRight
                      size={14}
                      className="ml-auto shrink-0 text-[#668c1f]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-4 hidden items-center gap-2 rounded-md border border-[#e2e8f0] bg-white px-3 py-2 text-[11px] text-foreground shadow-lg sm:flex">
              <Check size={14} className="text-[#78a82c]" /> Architecture
              surfaced
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-24"
      >
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            From repository to understanding
          </div>
          <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            Start with the code. Leave with the shape of the system.
          </h2>
        </div>
        <div className="grid divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="py-5 sm:px-5 sm:py-2">
            <span className="font-mono text-xs text-primary">01</span>
            <h3 className="mt-4 text-sm font-semibold text-foreground">
              Connect a repository
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Bring in a codebase you need to understand.
            </p>
          </div>
          <div className="py-5 sm:px-5 sm:py-2">
            <span className="font-mono text-xs text-primary">02</span>
            <h3 className="mt-4 text-sm font-semibold text-foreground">
              Trace its structure
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              See how modules and key paths relate.
            </p>
          </div>
          <div className="py-5 sm:px-5 sm:py-2">
            <span className="font-mono text-xs text-primary">03</span>
            <h3 className="mt-4 text-sm font-semibold text-foreground">
              Find the insight
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Get a useful starting point for your next change.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
