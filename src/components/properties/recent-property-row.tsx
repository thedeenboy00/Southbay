import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/types/property";
import { PROPERTY_TYPE_LABELS, formatDate, formatPrice } from "@/lib/utils";

interface RecentPropertyRowProps {
  property: Property;
}

export function RecentPropertyRow({ property }: RecentPropertyRowProps) {
  const cover = property.images[0];
  return (
    <article className="group relative flex gap-4 border-t border-line py-5 first:border-t-0 sm:flex-col sm:border-t-0 sm:py-0">
      <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-card bg-sunken sm:aspect-[4/3] sm:w-full">
        {cover ? (
          <Image src={cover.src} alt={cover.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 112px" className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
        ) : null}
      </div>
      <div className="min-w-0 sm:mt-4">
        <p className="text-xs text-muted">
          <time dateTime={property.listedDate}>Listed {formatDate(property.listedDate)}</time> · {PROPERTY_TYPE_LABELS[property.propertyType]}
        </p>
        <h3 className="mt-1 text-base font-semibold leading-snug">
          <Link href={`/properties/${property.id}`} className="after:absolute after:inset-0 after:content-['']">
            {property.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-semibold text-brand">{formatPrice(property.price, property.currency)}</p>
      </div>
    </article>
  );
}
