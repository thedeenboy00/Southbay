import Link from "next/link";
import { SORT_LABELS, SORT_OPTIONS, propertiesHref } from "@/lib/search-params";
import type { PropertyQuery, SortOption } from "@/lib/search-params";
import { cn } from "@/lib/utils";

interface SortLinksProps {
  query: PropertyQuery;
  current: SortOption;
}

/** Sorting is plain links so it works without JavaScript and always preserves the active filters. */
export function SortLinks({ query, current }: SortLinksProps) {
  return (
    <nav aria-label="Sort properties" className="flex flex-wrap items-center gap-x-1 gap-y-1">
      <span className="mr-1 text-sm text-muted">Sort by</span>
      <ul className="flex flex-wrap gap-1">
        {SORT_OPTIONS.map((option) => (
          <li key={option}>
            <Link
              href={propertiesHref({ ...query, sort: option })}
              aria-current={option === current ? "true" : undefined}
              className={cn(
                "inline-flex min-h-11 items-center rounded-sm px-3 text-sm font-medium transition-colors",
                option === current ? "bg-brand text-white" : "text-body hover:bg-sunken hover:text-ink",
              )}
            >
              {SORT_LABELS[option]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
