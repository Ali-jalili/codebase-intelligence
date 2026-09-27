/** @format */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, GitBranch, X } from "lucide-react";
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#101827]/55 px-4 py-4 backdrop-blur-[3px] sm:py-8"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && !isSubmitting) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="connect-repository-title"
        className="w-full max-w-xl overflow-y-auto border border-[#dce3f1] bg-[#fbfcff] shadow-[0_30px_100px_-35px_rgba(8,18,40,0.55)] sm:max-h-[calc(100dvh-4rem)]"
      >
        <div className="relative overflow-hidden border-b border-[#dce3f1] bg-white px-5 py-5 sm:px-7 sm:py-6">
          <div className="pointer-events-none absolute -right-5 -top-14 size-40 rounded-full border border-[#e3eafa] sm:size-52" />
          <div className="relative flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
                <span className="size-1.5 rounded-full bg-[#a6d64d]" />
                01 / Source connection
              </p>
              <h2
                id="connect-repository-title"
                className="mt-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
              >
                Bring your codebase in.
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Add a public GitHub repository as the source for this workspace.
              </p>
            </div>
            <button
              type="button"
              aria-label="Close dialog"
              onClick={onClose}
              disabled={isSubmitting}
              className="relative grid size-9 shrink-0 place-items-center border border-[#e3e8f1] bg-white text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:opacity-50"
            >
              <X size={17} aria-hidden="true" />
            </button>
          </div>
          <div className="relative mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 border border-[#dce3f1] bg-white px-2 py-1.5 text-foreground">
              <GitBranch size={12} className="text-primary" /> Repository
            </span>
            <span className="h-px w-5 bg-[#b8c8ef]" />
            <span className="inline-flex items-center gap-1.5 border border-[#e5eaf3] bg-[#fbfcff] px-2 py-1.5">
              Code map
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-5 px-5 py-5 sm:px-7 sm:py-6"
        >
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
              type="url"
              required
              aria-invalid={Boolean(fieldErrors.url)}
              aria-describedby={
                fieldErrors.url ? "repository-url-error" : "repository-url-help"
              }
              onChange={() =>
                fieldErrors.url &&
                setFieldErrors((current) => ({ ...current, url: undefined }))
              }
              placeholder="https://github.com/org/repository"
              className={`w-full rounded-md border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/15 ${fieldErrors.url ? "border-destructive focus:border-destructive" : "border-[#dce3f1] focus:border-primary"}`}
            />
            {fieldErrors.url && (
              <p
                id="repository-url-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {fieldErrors.url}
              </p>
            )}
            <p
              id="repository-url-help"
              className="text-xs leading-5 text-muted-foreground"
            >
              Use a public GitHub repository URL for now.
            </p>
          </div>
          {fieldErrors.form && (
            <div
              role="alert"
              className="flex items-start gap-2 border border-destructive/20 bg-destructive/5 px-3 py-2.5 text-sm text-destructive"
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
              aria-describedby={
                fieldErrors.branch
                  ? "repository-branch-error"
                  : "repository-branch-help"
              }
              aria-invalid={Boolean(fieldErrors.branch)}
              onChange={() =>
                fieldErrors.branch &&
                setFieldErrors((current) => ({ ...current, branch: undefined }))
              }
              className={`w-full rounded-md border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/15 ${fieldErrors.branch ? "border-destructive focus:border-destructive" : "border-[#dce3f1] focus:border-primary"}`}
            />
            {fieldErrors.branch && (
              <p
                id="repository-branch-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {fieldErrors.branch}
              </p>
            )}
            {!fieldErrors.branch && (
              <p
                id="repository-branch-help"
                className="text-xs leading-5 text-muted-foreground"
              >
                The branch to use as the starting point for analysis.
              </p>
            )}
          </div>
          <div className="flex flex-col-reverse gap-3 border-t border-[#dce3f1] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="rounded-md px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-[#eef2f9] hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Connecting..." : "Connect repository"}
              {!isSubmitting && <ArrowRight size={15} aria-hidden="true" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
