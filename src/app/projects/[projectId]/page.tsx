/** @format */

import { getProjectById } from "../services";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  const project = await getProjectById(projectId);

  return (
    <main className="min-h-[calc(100vh-4rem)] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}

        <div className="mb-8">
          <p className="text-sm text-muted-foreground">Project Workspace</p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            {project.name}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            {project.description || "No description provided for this project."}
          </p>
        </div>

        {/* Main Card */}

        <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <span className="text-xl font-semibold">
                {project.name.charAt(0).toUpperCase()}
              </span>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Start understanding your codebase
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Connect your repository to begin analyzing the structure and
                architecture of this project.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-dashed border-border bg-background p-6 text-center">
            <h3 className="text-sm font-medium text-foreground">
              No repository connected
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Add a repository to start exploring your codebase.
            </p>

            <button className="mt-5 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover">
              Connect Repository
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
