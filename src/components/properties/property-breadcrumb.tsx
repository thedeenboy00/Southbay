import Link from "next/link";
import type { Property } from "@/types/property";
import { propertiesHref } from "@/lib/search-params";
import { PROPERTY_TYPE_LABELS } from "@/lib/utils";

interface PropertyBreadcrumbProps {
  property: Property;
}

const linkClass = "inline-flex min-h-11 min-w-11 items-center justify-center text-muted hover:text-ink";

export function PropertyBreadcrumb({ property }: PropertyBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 text-sm">
        <li>
          <Link href={propertiesHref()} className={linkClass}>
            Properties
          </Link>
        </li>
        <li aria-hidden="true" className="text-muted">/</li>
        <li>
          <Link href={propertiesHref({ type: property.propertyType })} className={linkClass}>
            {PROPERTY_TYPE_LABELS[property.propertyType]}
          </Link>
        </li>
        <li aria-hidden="true" className="hidden text-muted sm:block">/</li>
        <li aria-current="page" className="min-w-0 basis-full font-medium text-ink sm:basis-auto">
          {property.title}
        </li>
      </ol>
    </nav>
  );
}
