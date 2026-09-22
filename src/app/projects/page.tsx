/** @format */

import Link from "next/link";

import { getProjects } from "./services";

import ProjectCard from "./components/ProjectCard";
import EmptyProjects from "./components/EmptyProjects";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-[calc(100vh-4rem)] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}

        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Your Projects
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage and explore your codebase projects.
            </p>
          </div>

          <Link
            href="/projects/new"
            className="shrink-0 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Create Project
          </Link>
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
