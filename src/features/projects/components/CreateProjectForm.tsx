/** @format */

"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, ArrowRight, Layers3, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createProjectAction } from "@/features/projects/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-w-40 items-center justify-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending && <Loader2 className="size-4 animate-spin" />}
      {pending ? "Creating..." : "Create workspace"}
      {!pending && <ArrowRight size={15} aria-hidden="true" />}
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
      if (result.field === "name") setNameError(result.error);
      else toast.error(result.error);
      return;
    }
    setNameError(null);
    toast.success("Codebase created. Connect a repository to get started.");
    router.push(`/projects/${result.projectId}`);
  }
  function handleNameChange() {
    if (nameError) setNameError(null);
  }
  return (
    <form
      action={handleSubmit}
      className="border-y border-[#dce3f1] bg-white/90 px-5 py-6 sm:px-7 sm:py-8"
    >
      <div className="mb-7 flex items-start gap-3 border-b border-[#e8edf5] pb-5">
        <span className="grid size-9 shrink-0 place-items-center rounded-md bg-[#edf2ff] text-primary">
          <Layers3 size={17} aria-hidden="true" />
        </span>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
            Workspace setup
          </p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
            First, the essentials
          </h2>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            You can add the repository in the next step.
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Codebase name <span className="text-destructive">*</span>
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
            className={`w-full rounded-md border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 ${nameError ? "border-destructive/60 focus:border-destructive" : "border-input focus:border-primary"}`}
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
              This name will identify the codebase in your library.
            </p>
          )}
        </div>
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
            placeholder="What does this codebase do? (optional)"
            className="w-full resize-none rounded-md border border-input bg-white px-4 py-3 text-sm leading-6 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <p className="text-xs text-muted-foreground">
            Optional. Add context about this codebase.
          </p>
        </div>
        <div className="flex flex-col-reverse gap-3 border-t border-[#e8edf5] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => router.push("/projects")}
            className="rounded-md px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Back to library
          </button>
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
