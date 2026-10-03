"use client";

import { useEffect, useState } from "react";
import { EnquiryLink } from "@/components/enquiry/enquiry-link";
import type { DetailAction } from "@/lib/property-detail";
import { cn } from "@/lib/utils";

interface MobileActionBarProps {
  action: DetailAction;
  priceLabel: string;
}

/** Mobile-only action bar. It hides while the in-page actions or the enquiry section are on screen, and after the enquiry. */
export function MobileActionBar({ action, priceLabel }: MobileActionBarProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById("enquiry");
    const actions = document.getElementById("property-actions");
    if (!target) return;
    let frame = 0;
    // Visible while the enquiry section is still below the viewport and the in-page action buttons are not
    // on screen. A scroll listener (rather than an IntersectionObserver) also handles instant jumps, such as
    // "Back to property", that never cross the observed element.
    const update = () => {
      frame = 0;
      const rect = actions?.getBoundingClientRect();
      const actionsOnScreen = rect !== undefined && rect.bottom > 0 && rect.top < window.innerHeight;
      setVisible(!actionsOnScreen && target.getBoundingClientRect().top >= window.innerHeight);
    };
    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 border-t border-line bg-surface px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] transition duration-200 motion-reduce:transition-none lg:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <p className="text-lg font-semibold text-brand">{priceLabel}</p>
      <EnquiryLink type={action.type} className="min-w-0 flex-1 px-4 sm:flex-none">
        {action.label}
      </EnquiryLink>
    </div>
  );
}
