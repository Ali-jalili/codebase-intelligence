/** @format */

import Link from "next/link";
import RepositoryForm from "../components/RepositoryForm";

export default function NewRepositoryPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="#"
          className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to project
        </Link>

        <RepositoryForm />
      </div>
    </main>
  );
}
