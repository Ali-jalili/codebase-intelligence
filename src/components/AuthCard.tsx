/** @format */

type AuthCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function AuthCard({
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
      </div>

      {children}
    </div>
  );
}
