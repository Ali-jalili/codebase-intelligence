/** @format */

"use client";
import type { User } from "@supabase/supabase-js";

import { useRouter } from "next/navigation";

import { handleLogout } from "@/actions/auth";

type DashboardNavbarProps = {
  user: User | null;
};

export default function DashboardNavbar({ user }: DashboardNavbarProps) {
  const router = useRouter();

  async function logoutHandler() {
    const result = await handleLogout();

    if (result.success) {
      router.push("/login");
    }
  }

  return (
    <nav>
      <div>{user?.user_metadata?.name ?? user?.email}</div>
      <button onClick={logoutHandler}>Logout</button>
    </nav>
  );
}
