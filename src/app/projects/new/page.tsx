/** @format */

import CreateProjectForm from "@/features/projects/components/CreateProjectForm";

export default function NewProjectPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Create a codebase
          </h1>

          <p className="mt-2 text-sm text-muted">
            Set up a workspace, then connect the repository you want to
            understand.
          </p>
        </div>

        <CreateProjectForm />
      </div>
    </main>
  );
}
