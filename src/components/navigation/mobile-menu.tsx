"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS, VIEWING_CTA } from "./nav-items";

const PANEL_ID = "mobile-navigation";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
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

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-line px-3 text-sm font-semibold text-ink"
      >
        Menu
      </button>
      <AnimatePresence>
        {open ? (
          <motion.nav
            id={PANEL_ID}
            aria-label="Mobile"
            className="absolute inset-x-0 top-full border-b border-line bg-surface shadow-lift"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className="border-b border-line last:border-b-0">
                  <Link href={item.href} onClick={close} className="flex min-h-12 items-center text-base font-medium text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="py-4">
                <Link href={VIEWING_CTA.href} onClick={close} className="flex min-h-12 items-center justify-center rounded-sm bg-brand text-sm font-semibold text-white">
                  {VIEWING_CTA.label}
                </Link>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
