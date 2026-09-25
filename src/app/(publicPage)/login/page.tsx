/** @format */

import AuthCard from "@/features/auth/components/AuthCard";
import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6">
      <AuthCard
        title="Welcome back"
        description="Sign in to continue analyzing your codebases."
      >
        <LoginForm />
      </AuthCard>
    </main>
  );
}
