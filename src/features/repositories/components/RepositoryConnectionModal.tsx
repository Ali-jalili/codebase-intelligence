/** @format */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, X } from "lucide-react";
import { toast } from "sonner";
import { createRepositoryAction } from "@/features/repositories/actions";

interface RepositoryConnectionModalProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function RepositoryConnectionModal({
  projectId,
  isOpen,
  onClose,
}: RepositoryConnectionModalProps) {
  const [fieldErrors, setFieldErrors] = useState<{
    url?: string;
    branch?: string;
    form?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  if (!isOpen) return null;
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    setIsSubmitting(true);
    try {
      const result = await createRepositoryAction(
        new FormData(event.currentTarget),
      );
      if (!result.success) {
        setFieldErrors(
          result.field
            ? { [result.field]: result.error }
            : { form: result.error },
        );
        return;
      }
      onClose();
      toast.success("Repository connected. Your codebase is ready to analyze.");
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="connect-repository-title"
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Add a source
            </p>
            <h2
              id="connect-repository-title"
              className="mt-2 text-xl font-semibold text-foreground"
            >
              Connect repository
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              We will use this repository to build your codebase map.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
          <input type="hidden" name="projectId" value={projectId} />
          <div className="space-y-2">
            <label
              htmlFor="repository-url"
              className="block text-sm font-medium text-foreground"
            >
              Repository URL
            </label>
            <input
              id="repository-url"
              name="url"
              type="text"
              required
              aria-invalid={Boolean(fieldErrors.url)}
              aria-describedby={
                fieldErrors.url ? "repository-url-error" : undefined
              }
              placeholder="https://github.com/org/repository"
              className={`w-full rounded-lg border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 ${fieldErrors.url ? "border-destructive focus:border-destructive" : "border-input focus:border-primary"}`}
            />
            {fieldErrors.url && (
              <p id="repository-url-error" className="text-sm text-destructive">
                {fieldErrors.url}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Use a public GitHub repository URL for now.
            </p>
          </div>
          {fieldErrors.form && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2.5 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <span>{fieldErrors.form}</span>
            </div>
          )}
          <div className="space-y-2">
            <label
              htmlFor="repository-branch"
              className="block text-sm font-medium text-foreground"
            >
              Branch
            </label>
            <input
              id="repository-branch"
              name="branch"
              type="text"
              defaultValue="main"
              aria-invalid={Boolean(fieldErrors.branch)}
              aria-describedby={
                fieldErrors.branch ? "repository-branch-error" : undefined
              }
              className={`w-full rounded-lg border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/20 ${fieldErrors.branch ? "border-destructive focus:border-destructive" : "border-input focus:border-primary"}`}
            />
            {fieldErrors.branch && (
              <p
                id="repository-branch-error"
                className="text-sm text-destructive"
              >
                {fieldErrors.branch}
              </p>
            )}
          </div>
          <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              {isSubmitting ? "Connecting..." : "Continue to analysis"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
