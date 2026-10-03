import type { PropertyLocation } from "@/types/property";

interface LocationPanelProps {
  location: PropertyLocation;
}

export function LocationPanel({ location }: LocationPanelProps) {
  const rows: ReadonlyArray<[string, string]> = [
    ["Suburb", location.suburb],
    ["City", location.city],
    ["Region", location.region],
    ["Country", location.country],
  ];
  return (
    <div className="grid overflow-hidden rounded-card border border-line bg-surface md:grid-cols-[1.2fr_1fr]">
      <div
        aria-hidden="true"
        className="relative flex min-h-48 items-center justify-center bg-sunken md:min-h-64"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 39px, #e2ded6 39px 40px), repeating-linear-gradient(90deg, transparent 0 39px, #e2ded6 39px 40px)" }}
      >
        <span className="h-4 w-4 rounded-full border-2 border-white bg-brand shadow-card" />
        <span className="absolute bottom-3 left-3 rounded-sm bg-surface px-2.5 py-1 text-xs font-medium text-muted">Map view (concept)</span>
      </div>
      <div className="p-5 sm:p-6">
        <dl>
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-4 border-b border-line py-3 first:pt-0">
              <dt className="text-sm text-muted">{label}</dt>
              <dd className="text-right text-sm font-medium text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-xs text-muted">A map view would sit here in a full build.</p>
      </div>
    </div>
  );
}
