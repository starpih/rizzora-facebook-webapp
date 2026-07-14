import { clsx } from "clsx";

export function PhoneShell({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className="app-viewport">
      <section className={clsx("phone-frame", className)}>{children}</section>
    </main>
  );
}
