/** @format */

import Link from "next/link";
import { getProjects } from "./services";

export default async function ProjectsPage() {
  const data = await getProjects();

  return (
    <main className="min-h-[calc(100vh-4rem)] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Your Projects
            </h1>

            <p className="mt-2 text-sm text-muted">
              Manage your projects and explore their codebase.
            </p>
          </div>

          <Link
            href="/projects/new"
            className="shrink-0 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Create Project
          </Link>
        </div>

        {/* Projects */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.map((project) => (
            <article
              key={project.id}
              className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/50"
            >
              <div className="mb-6">
                <h2 className="font-medium text-foreground">{project.name}</h2>

                <p className="mt-2 text-sm leading-6 text-muted">
                  {project.description}
                </p>
              </div>

              <Link
                href={`/projects/${project.id}`}
                className="text-sm font-medium text-primary transition-colors hover:text-primary-hover"
              >
                Open Project →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
