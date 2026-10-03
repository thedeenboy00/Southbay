import type { Kpi } from "@/types/dashboard";

interface KpiGridProps {
  kpis: readonly Kpi[];
}

const TREND_GLYPH = { up: "↑", down: "↓", flat: "→" } as const;

export function KpiGrid({ kpis }: KpiGridProps) {
  return (
    <dl className="grid grid-cols-2 border-l border-t border-line bg-surface lg:grid-cols-4">
      {kpis.map((kpi) => (
        <div key={kpi.id} className="border-b border-r border-line p-4 sm:p-6">
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{kpi.label}</dt>
          <dd className="display mt-2 text-4xl text-ink sm:text-5xl">{kpi.value}</dd>
          <dd className="mt-2 text-xs leading-snug text-muted sm:text-sm">{kpi.description}</dd>
          {kpi.trend ? (
            <dd className="mt-2 text-xs font-medium text-body sm:text-sm">
              <span aria-hidden="true">{TREND_GLYPH[kpi.trend.direction]} </span>
              {kpi.trend.text}
            </dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
