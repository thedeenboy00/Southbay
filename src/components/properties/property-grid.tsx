import type { Property } from "@/types/property";
import { PropertyCard } from "./property-card";

interface PropertyGridProps {
  properties: readonly Property[];
}

export function PropertyGrid({ properties }: PropertyGridProps) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <li key={property.id}>
          <PropertyCard property={property} />
        </li>
      ))}
    </ul>
  );
}
