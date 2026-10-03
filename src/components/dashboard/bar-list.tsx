import type { CountItem } from "@/types/dashboard";

interface BarListProps {
  items: readonly CountItem[];
}

/** Horizontal bars scaled to the largest count. Counts are text, so the bars are decorative. */
export function BarList({ items }: BarListProps) {
  const max = Math.max(0, ...items.map((item) => item.count));
  return (
    <ul className="space-y-4">
      {items.map((item) => {
        const width = max === 0 ? 0 : Math.round((item.count / max) * 100);
        return (
          <li key={item.key}>
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <span className="font-medium text-ink">{item.label}</span>
              <span className="tabular-nums text-body">{item.count}</span>
            </div>
            <div aria-hidden="true" className="mt-1.5 h-2 bg-sunken">
              <div className="h-full bg-brand" style={{ width: `${width}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
