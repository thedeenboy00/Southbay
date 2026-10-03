import Link from "next/link";
import { PROPERTY_TYPES } from "@/types/property";
import type { Property, PropertyType } from "@/types/property";
import { propertiesHref } from "@/lib/search-params";
import { PROPERTY_TYPE_LABELS } from "@/lib/utils";

interface PropertyTypeTilesProps {
  properties: readonly Property[];
}

const TONES: Record<PropertyType, string> = {
  house: "bg-brand text-white",
  apartment: "bg-slate text-white",
  townhouse: "bg-ink text-white",
  land: "bg-accent text-white",
  commercial: "bg-sunken text-ink",
};

export function PropertyTypeTiles({ properties }: PropertyTypeTilesProps) {
  return (
    <ul className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
      {PROPERTY_TYPES.map((type) => {
        const count = properties.filter((property) => property.propertyType === type).length;
        return (
          <li key={type}>
            <Link
              href={propertiesHref({ type })}
              className={`group flex min-h-28 flex-col justify-between rounded-card p-4 sm:min-h-40 sm:p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lift motion-reduce:hover:translate-y-0 lg:min-h-56 ${TONES[type]}`}
            >
              <span className="text-xs font-semibold uppercase tracking-widest">
                {count} {count === 1 ? "property" : "properties"}
              </span>
              <span className="flex items-end justify-between gap-2">
                <span className="display min-w-0 text-xl sm:text-2xl">{PROPERTY_TYPE_LABELS[type]}</span>
                <span aria-hidden="true" className="shrink-0 text-xl transition-transform group-hover:translate-x-1 motion-reduce:transition-none">→</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
