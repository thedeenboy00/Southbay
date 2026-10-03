import Form from "next/form";
import { DEFAULT_SORT, PROPERTY_QUERY_KEYS } from "@/lib/search-params";
import type { PropertyQuery } from "@/lib/search-params";
import { PROPERTY_TYPES } from "@/types/property";
import { LISTING_LABELS, PROPERTY_TYPE_LABELS, cn } from "@/lib/utils";

const fieldClass = "mt-1.5 block min-h-12 w-full rounded-sm border border-line bg-surface px-3 text-sm text-ink";
const labelClass = "text-xs font-semibold uppercase tracking-wider text-muted";

interface PropertySearchProps {
  /** Current filter state, used to pre-fill the controls. Omit on the homepage. */
  query?: PropertyQuery;
  submitLabel: string;
  className?: string;
}

/**
 * Search form shared by the homepage and /properties. Submits a GET to /properties; next/form performs
 * client-side navigation when JavaScript is available and a normal GET otherwise. The URL is the state.
 */
export function PropertySearch({ query = {}, submitLabel, className }: PropertySearchProps) {
  return (
    <Form action="/properties" aria-label="Search properties" className={cn("rounded-card border border-line bg-surface p-5 sm:p-6", className)}>
      {query.sort !== undefined && query.sort !== DEFAULT_SORT ? <input type="hidden" name={PROPERTY_QUERY_KEYS.sort} value={query.sort} /> : null}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto] lg:items-end">
        <div>
          <label htmlFor="search-location" className={labelClass}>
            Location
          </label>
          <input id="search-location" name={PROPERTY_QUERY_KEYS.location} type="text" defaultValue={query.location ?? ""} placeholder="Suburb or city, e.g. Demo Bay" autoComplete="off" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="search-type" className={labelClass}>
            Property type
          </label>
          <select id="search-type" name={PROPERTY_QUERY_KEYS.type} defaultValue={query.type ?? ""} className={fieldClass}>
            <option value="">All types</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {PROPERTY_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="search-listing" className={labelClass}>
            Buy or rent
          </label>
          <select id="search-listing" name={PROPERTY_QUERY_KEYS.listing} defaultValue={query.listing ?? ""} className={fieldClass}>
            <option value="">Buy or rent</option>
            <option value="sale">Buy ({LISTING_LABELS.sale.toLowerCase()})</option>
            <option value="rent">Rent ({LISTING_LABELS.rent.toLowerCase()})</option>
          </select>
        </div>
        <button type="submit" className="min-h-12 rounded-sm bg-brand px-8 text-sm font-semibold text-white transition hover:bg-brand-hover active:translate-y-px md:col-span-2 lg:col-span-1">
          {submitLabel}
        </button>
      </div>
    </Form>
  );
}
