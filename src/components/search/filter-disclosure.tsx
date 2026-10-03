"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const PANEL_ID = "filter-panel";

interface FilterDisclosureProps {
  children: ReactNode;
  activeCount: number;
}

/**
 * Mobile filter panel. Below the lg breakpoint the server-rendered form sits behind a "Filters" button;
 * from lg up the form is always visible and the button is hidden. The caller keys this component on the
 * current query so the panel closes (and the form re-syncs) after every navigation.
 */
export function FilterDisclosure({ children, activeCount }: FilterDisclosureProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        className="filter-toggle inline-flex min-h-12 w-full items-center justify-between gap-3 rounded-sm border border-line bg-surface px-4 text-sm font-semibold text-ink sm:w-auto lg:hidden"
      >
        <span>Filters</span>
        <span className="text-muted">{activeCount > 0 ? `${activeCount} active` : "None active"}</span>
      </button>
      <div id={PANEL_ID} className={cn("filter-panel mt-3 lg:mt-0 lg:block", open ? "block" : "hidden")}>
        {children}
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            buttonRef.current?.focus();
          }}
          className="filter-toggle mt-3 inline-flex min-h-11 items-center px-1 text-sm font-medium text-muted underline lg:hidden"
        >
          Close filters
        </button>
      </div>
    </div>
  );
}
