/** @format */

import CodebaseNavbar from "@/components/CodebaseNavbar";
import { getCurrentUser } from "@/features/auth/actions";

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <CodebaseNavbar user={user} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
