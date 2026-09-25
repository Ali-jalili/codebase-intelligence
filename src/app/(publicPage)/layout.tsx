/** @format */

import { getCurrentUser } from "@/features/auth/actions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />

      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
