import type { ActivityPoint } from "@/types/dashboard";

interface ActivityChartProps {
  series: readonly ActivityPoint[];
}

type SeriesKey = "listings" | "enquiries" | "viewings";
type MarkerShape = "circle" | "square" | "triangle";

interface SeriesStyle {
  key: SeriesKey;
  label: string;
  stroke: string;
  fill: string;
  dash: string | undefined;
  marker: MarkerShape;
}

/** Series differ by line pattern and marker shape as well as colour. */
const SERIES: readonly SeriesStyle[] = [
  { key: "listings", label: "Listings", stroke: "stroke-ink", fill: "fill-ink", dash: undefined, marker: "circle" },
  { key: "enquiries", label: "Enquiries", stroke: "stroke-accent", fill: "fill-accent", dash: "8 5", marker: "square" },
  { key: "viewings", label: "Viewing requests", stroke: "stroke-slate", fill: "fill-slate", dash: "2 5", marker: "triangle" },
];

const W = 480;
const H = 260;
const LEFT = 40;
const RIGHT = 30;
const TOP = 16;
const BOTTOM = 40;

function Marker({ shape, x, y, className }: { shape: MarkerShape; x: number; y: number; className: string }) {
  if (shape === "circle") return <circle cx={x} cy={y} r={4.5} className={className} />;
  if (shape === "square") return <rect x={x - 4.5} y={y - 4.5} width={9} height={9} className={className} />;
  return <polygon points={`${x},${y - 5.5} ${x + 5},${y + 4} ${x - 5},${y + 4}`} className={className} />;
}

export function ActivityChart({ series }: ActivityChartProps) {
  if (series.length === 0) return <p className="text-sm text-muted">No sample activity to chart.</p>;

  const maxValue = Math.max(0, ...series.flatMap((point) => [point.listings, point.enquiries, point.viewings]));
  const top = Math.max(4, Math.ceil(maxValue / 2) * 2);
  const plotW = W - LEFT - RIGHT;
  const plotH = H - TOP - BOTTOM;
  const x = (index: number) => (series.length === 1 ? LEFT + plotW / 2 : LEFT + (plotW * index) / (series.length - 1));
  const y = (value: number) => TOP + (1 - value / top) * plotH;
  const ticks = [0, top / 2, top];

  return (
    <div>
      <ul className="mb-4 flex flex-wrap gap-x-6 gap-y-2" aria-label="Chart legend">
        {SERIES.map((item) => (
          <li key={item.key} className="flex items-center gap-2 text-sm text-body">
            <svg aria-hidden="true" viewBox="0 0 32 12" className="h-3 w-8">
              <line x1="0" x2="32" y1="6" y2="6" strokeWidth="2" strokeDasharray={item.dash} className={item.stroke} />
              <Marker shape={item.marker} x={16} y={6} className={item.fill} />
            </svg>
            {item.label}
          </li>
        ))}
      </ul>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Line chart of demo listings, enquiries and viewing requests by month. The same figures are in the table that follows." className="block h-auto w-full max-w-full text-muted">
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={LEFT} x2={W - RIGHT} y1={y(tick)} y2={y(tick)} className="stroke-line" strokeWidth="1" />
            <text x={LEFT - 8} y={y(tick) + 5} textAnchor="end" className="chart-label" fill="currentColor">
              {tick}
            </text>
          </g>
        ))}
        {series.map((point, index) => (
          <text key={point.month} x={x(index)} y={H - 12} textAnchor="middle" className="chart-label" fill="currentColor">
            {point.label}
          </text>
        ))}
        {SERIES.map((item) => (
          <g key={item.key}>
            <path d={series.map((point, index) => `${index === 0 ? "M" : "L"}${x(index)} ${y(point[item.key])}`).join(" ")} fill="none" strokeWidth="2.5" strokeDasharray={item.dash} strokeLinejoin="round" className={item.stroke} />
            {series.map((point, index) => (
              <Marker key={point.month} shape={item.marker} x={x(index)} y={y(point[item.key])} className={item.fill} />
            ))}
          </g>
        ))}
      </svg>
      <div className="sr-only">
      <table>
        <caption>Demo activity by month</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Listings</th>
            <th scope="col">Enquiries</th>
            <th scope="col">Viewing requests</th>
          </tr>
        </thead>
        <tbody>
          {series.map((point) => (
            <tr key={point.month}>
              <th scope="row">{point.label}</th>
              <td>{point.listings}</td>
              <td>{point.enquiries}</td>
              <td>{point.viewings}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
