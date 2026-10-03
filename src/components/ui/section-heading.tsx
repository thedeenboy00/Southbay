import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
  inverse?: boolean;
}

export function SectionHeading({ id, eyebrow, title, children, action, inverse = false }: SectionHeadingProps) {
  return (
    <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className={cn("eyebrow", inverse && "text-accent-soft")}>{eyebrow}</p>
        <h2 id={id} className={cn("display mt-3 text-3xl sm:text-4xl", inverse && "text-white")}>
          {title}
        </h2>
        {children ? <p className={cn("mt-4 text-base leading-relaxed", inverse ? "text-white/75" : "text-body")}>{children}</p> : null}
      </div>
      {action}
    </div>
  );
}
