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
    <div className="w-full max-w-md rounded-lg border border-border bg-surface p-6 shadow-[0_20px_60px_-36px_rgba(20,40,90,0.32)] sm:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}
