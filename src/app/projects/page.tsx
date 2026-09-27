/** @format */

import Link from "next/link";

import { getProjects } from "@/features/projects/services";

import ProjectCard from "@/features/projects/components/ProjectCard";
import EmptyProjects from "@/features/projects/components/EmptyProjects";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-[calc(100vh-4rem)] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Your codebases
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              A focused home for the codebases you are exploring.
            </p>
          </div>

          {projects.length > 0 && (
            <Link
              href="/projects/new"
              className="shrink-0 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary"
            >
              New codebase
            </Link>
          )}
        </div>

        {/* Content */}
        {projects.length === 0 ? (
          <EmptyProjects />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
