/** @format */

"use client";

import { useState } from "react";
import { createProjectAction } from "@/app/projects/actions";

export default function CreateProjectForm() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await createProjectAction(formData);

    if (!result.success) {
      setError(result.error);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="rounded-xl border border-border bg-surface p-6 shadow-sm"
    >
      <div className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Project name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Codebase Intelligence"
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Description
            <span className="ml-1 text-xs text-muted">(optional)</span>
          </label>

          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Briefly describe your project..."
            className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center justify-end gap-3 border-t border-border pt-5">
          <button
            type="button"
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Create Project
          </button>
        </div>
      </div>
    </form>
  );
}
