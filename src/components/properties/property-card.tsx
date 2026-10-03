import Image from "next/image";
import Link from "next/link";
import type { Property, PropertyStatus } from "@/types/property";
import { PROPERTY_TYPE_LABELS, STATUS_LABELS, cn, formatPrice } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

const STATUS_STYLES: Record<PropertyStatus, string> = {
  available: "bg-white text-success",
  "under-offer": "bg-white text-warning",
  sold: "bg-ink text-white",
  let: "bg-ink text-white",
};

function buildSpecs(property: Property): string[] {
  const specs: string[] = [];
  if (property.bedrooms !== null) specs.push(`${property.bedrooms} bed`);
  if (property.bathrooms !== null) specs.push(`${property.bathrooms} bath`);
  const area = property.buildingSize ?? property.landSize;
  if (area > 0) specs.push(`${area} m²`);
  return specs;
}

export function PropertyCard({ property, priority = false }: PropertyCardProps) {
  const cover = property.images[0];
  const specs = buildSpecs(property);
  return (
    <article className="group relative overflow-hidden rounded-card border border-line bg-surface shadow-card transition duration-300 hover:shadow-lift focus-within:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-sunken">
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : null}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/35 to-transparent" aria-hidden="true" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-sm bg-brand px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-white">
            {property.listingType === "sale" ? "For sale" : "To rent"}
          </span>
          <span className={cn("rounded-sm px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider", STATUS_STYLES[property.status])}>
            {STATUS_LABELS[property.status]}
          </span>
        </div>
      </div>
      <div className="p-5">
        <p className="eyebrow">{PROPERTY_TYPE_LABELS[property.propertyType]}</p>
        <h3 className="mt-2 text-lg font-semibold leading-snug">
          <Link href={`/properties/${property.id}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-[-3px]">
            {property.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted">
          {property.location.suburb}, {property.location.city}
        </p>
        <p className="mt-4 text-xl font-semibold text-brand">{formatPrice(property.price, property.currency)}</p>
        {specs.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-4 text-sm text-body">
            {specs.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
