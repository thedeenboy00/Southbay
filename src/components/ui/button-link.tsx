import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "inverse" | "outline-inverse";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

const base =
  "inline-flex min-h-12 items-center justify-center rounded-sm px-6 text-sm font-semibold transition duration-200 active:translate-y-px";
const variants = {
  primary: "bg-brand text-white hover:bg-brand-hover",
  secondary: "border border-brand/30 bg-transparent text-brand hover:border-brand hover:bg-brand hover:text-white",
  inverse: "bg-white text-brand hover:bg-sunken",
  "outline-inverse": "border border-white/40 text-white hover:border-white hover:bg-white/10",
} as const;

export function buttonStyles(variant: ButtonVariant = "primary", className?: string): string {
  return cn(base, variants[variant], className);
}

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonStyles(variant, className)}>
      {children}
    </Link>
  );
}
