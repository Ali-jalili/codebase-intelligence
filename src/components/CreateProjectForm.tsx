/** @format */

"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { createProjectAction } from "@/app/projects/actions";
import { useRouter } from "next/navigation";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-w-36 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending && <Loader2 className="size-4 animate-spin" />}

      {pending ? "Creating..." : "Create project"}
    </button>
  );
}

export default function CreateProjectForm() {
  const [nameError, setNameError] = useState<string | null>(null);

  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setNameError(null);
    const result = await createProjectAction(formData);

    if (!result.success) {
      if (result.field === "name") {
        setNameError(result.error);
      } else {
        toast.error(result.error);
      }

      return;
    }

    setNameError(null);
    toast.success("Project created successfully");
    router.push("/projects");
  }

  function handleNameChange() {
    if (nameError) {
      setNameError(null);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
    >
      {/* Header */}

      <div className="border-b border-border bg-surface-elevated px-6 py-5 sm:px-8">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <span aria-hidden="true" className="text-lg">
              +
            </span>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground">
              Project details
            </h2>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Give your project a clear name so it is easy to find later.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
        {/* Project Name */}

        <div className="space-y-2">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Project name <span className="text-destructive">*</span>
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={80}
            placeholder="e.g. Codebase Intelligence"
            onChange={handleNameChange}
            aria-invalid={Boolean(nameError)}
            aria-describedby={
              nameError ? "project-name-error" : "project-name-help"
            }
            className={`w-full rounded-lg border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 ${
              nameError
                ? "border-destructive/60 focus:border-destructive"
                : "border-input focus:border-primary"
            }`}
          />

          {nameError ? (
            <div
              id="project-name-error"
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2.5 text-sm text-destructive"
            >
              <AlertCircle
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0"
              />

              <span>{nameError}</span>
            </div>
          ) : (
            <p id="project-name-help" className="text-xs text-muted-foreground">
              Use a name that identifies this codebase.
            </p>
          )}
        </div>

        {/* Description */}

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Description{" "}
            <span className="ml-1 text-xs text-muted-foreground">
              (optional)
            </span>
          </label>

          <textarea
            id="description"
            name="description"
            rows={4}
            maxLength={500}
            placeholder="Briefly describe your project..."
            className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm leading-6 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          <p className="text-xs text-muted-foreground">
            Optional. Add a short note about what this project contains.
          </p>
        </div>

        {/* Actions */}

        <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Cancel
          </button>

          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
