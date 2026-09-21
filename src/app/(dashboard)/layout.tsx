/** @format */

import { getCurrentUser } from "@/actions/auth";
import DashboardNavbar from "@/components/DashboardNavbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <>
      <DashboardNavbar user={user} />
      {children}
    </>
  );
}
