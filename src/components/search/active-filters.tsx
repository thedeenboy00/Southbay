import Link from "next/link";
import type { ActiveFilter } from "@/lib/property-filters";

interface ActiveFiltersProps {
  filters: readonly ActiveFilter[];
  clearAllHref: string;
}

export function ActiveFilters({ filters, clearAllHref }: ActiveFiltersProps) {
  if (filters.length === 0) return null;
  return (
    <ul aria-label="Active filters" className="mt-4 flex flex-wrap items-center gap-2">
      {filters.map((filter) => (
        <li key={filter.key}>
          <Link
            href={filter.removeHref}
            aria-label={`Remove filter: ${filter.label}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-line bg-surface px-3 text-sm font-medium text-ink transition hover:border-brand"
          >
            {filter.label}
            <span aria-hidden="true">×</span>
          </Link>
        </li>
      ))}
      <li>
        <Link href={clearAllHref} className="inline-flex min-h-11 items-center px-2 text-sm font-medium text-brand underline">
          Clear all
        </Link>
      </li>
    </ul>
  );
}
