import type { LabelledValue } from "@/lib/property-detail";

interface InfoProps {
  items: readonly LabelledValue[];
}

export function KeySpecs({ items }: InfoProps) {
  if (items.length === 0) return null;
  return (
    <dl className="grid grid-cols-2 divide-line border-y border-line sm:grid-cols-4 sm:divide-x">
      {items.map((item) => (
        <div key={item.label} className="px-0 py-4 sm:px-5 sm:first:pl-0">
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{item.label}</dt>
          <dd className="display mt-1 text-2xl text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function PropertyFacts({ items }: InfoProps) {
  return (
    <dl className="grid gap-x-10 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
          <dt className="text-sm text-muted">{item.label}</dt>
          <dd className="text-right text-sm font-medium text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
