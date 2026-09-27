/** @format */

export default function Footer() {
  return (
    <footer className="border-t border-border bg-[#f8faff]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Codebase Intelligence</p>
        <p className="font-mono">
          A clearer view of what you&apos;re building.
        </p>
      </div>
    </footer>
  );
}
