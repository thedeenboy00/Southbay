import type { PropertyStatus } from "@/types/property";
import { STATUS_LABELS, cn } from "@/lib/utils";

const TONES: Record<PropertyStatus, string> = {
  available: "border-success/40 text-success",
  "under-offer": "border-warning/40 text-warning",
  sold: "border-ink/30 text-ink",
  let: "border-ink/30 text-ink",
};

interface PropertyStatusBadgeProps {
  status: PropertyStatus;
}

export function PropertyStatusBadge({ status }: PropertyStatusBadgeProps) {
  return <span className={cn("rounded-sm border bg-surface px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider", TONES[status])}>{STATUS_LABELS[status]}</span>;
}
