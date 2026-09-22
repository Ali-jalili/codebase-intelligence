/** @format */

import Link from "next/link";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string | null;
    created_at: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const createdDate = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(project.created_at));

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 transition-all duration-200 hover:border-primary/40 hover:shadow-sm">
      <div>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <span className="text-lg font-semibold">
              {project.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <h2 className="text-base font-semibold text-foreground">
          {project.name}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {project.description || "No description provided for this project."}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <span className="text-xs text-muted-foreground">
          Created {createdDate}
        </span>

        <Link
          href={`/projects/${project.id}`}
          className="text-sm font-medium text-primary transition-colors hover:text-primary-hover"
        >
          Open →
        </Link>
      </div>
    </article>
  );
}
