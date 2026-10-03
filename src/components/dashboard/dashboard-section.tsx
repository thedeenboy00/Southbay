import type { ReactNode } from "react";

interface DashboardSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function DashboardSection({ id, eyebrow, title, description, children }: DashboardSectionProps) {
  return (
    <section aria-labelledby={id} className="min-w-0 border-t border-ink pt-6">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="display mt-2 text-2xl sm:text-3xl">
        {title}
      </h2>
      {description ? <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{description}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}
