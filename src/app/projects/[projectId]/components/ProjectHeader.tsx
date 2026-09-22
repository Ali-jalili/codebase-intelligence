/** @format */

interface ProjectHeaderProps {
  project: {
    name: string;
    description: string | null;
  };
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <section>
      <p className="text-sm text-muted-foreground">Codebase Workspace</p>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        {project.name}
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
        {project.description ||
          "Understand your application's structure, architecture, and relationships."}
      </p>
    </section>
  );
}
