"use client";

import type { ReactNode } from "react";
import { buttonStyles } from "@/components/ui/button-link";
import type { ButtonVariant } from "@/components/ui/button-link";
import { ENQUIRY_TYPE_EVENT } from "@/lib/enquiry";
import type { EnquiryType } from "@/lib/enquiry";

interface EnquiryLinkProps {
  type: EnquiryType;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}

/** A normal in-page link to #enquiry. With JavaScript it also tells the form which enquiry type to select. */
export function EnquiryLink({ type, variant = "primary", className, children }: EnquiryLinkProps) {
  return (
    <a href="#enquiry" onClick={() => window.dispatchEvent(new CustomEvent(ENQUIRY_TYPE_EVENT, { detail: type }))} className={buttonStyles(variant, className)}>
      {children}
    </a>
  );
}
