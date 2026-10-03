import Link from "next/link";
import type { RecentEnquiryRow } from "@/types/dashboard";
import { DASHBOARD_ENQUIRY_LABELS, ENQUIRY_STATUS_LABELS } from "@/lib/dashboard";
import { formatDate } from "@/lib/utils";

interface RecentEnquiriesProps {
  rows: readonly RecentEnquiryRow[];
}

const linkClass = "inline-flex min-h-11 items-center font-medium text-brand underline-offset-2 hover:underline";
const statusClass = "inline-block rounded-sm border border-line px-2 py-0.5 text-xs font-semibold text-ink";

export function RecentEnquiries({ rows }: RecentEnquiriesProps) {
  if (rows.length === 0) return <p className="text-sm text-muted">No sample enquiries to show.</p>;
  return (
    <>
      <table className="hidden w-full text-left text-sm md:table">
        <caption className="sr-only">Recent sample enquiries</caption>
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
            <th scope="col" className="py-3 pr-4 font-semibold">Name</th>
            <th scope="col" className="py-3 pr-4 font-semibold">Property</th>
            <th scope="col" className="py-3 pr-4 font-semibold">Enquiry</th>
            <th scope="col" className="py-3 pr-4 font-semibold">Status</th>
            <th scope="col" className="py-3 font-semibold">Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ enquiry, property }) => (
            <tr key={enquiry.id} className="border-b border-line">
              <th scope="row" className="py-1 pr-4 font-medium text-ink">{enquiry.name}</th>
              <td className="py-1 pr-4">
                <Link href={`/properties/${property.id}`} className={linkClass}>{property.title}</Link>
              </td>
              <td className="py-1 pr-4 text-body">{DASHBOARD_ENQUIRY_LABELS[enquiry.kind]}</td>
              <td className="py-1 pr-4"><span className={statusClass}>{ENQUIRY_STATUS_LABELS[enquiry.status]}</span></td>
              <td className="py-1 text-body"><time dateTime={enquiry.createdAt}>{formatDate(enquiry.createdAt)}</time></td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="md:hidden">
        {rows.map(({ enquiry, property }) => (
          <li key={enquiry.id} className="border-b border-line py-4 first:pt-0">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-medium text-ink">{enquiry.name}</p>
              <p className="text-xs text-muted"><time dateTime={enquiry.createdAt}>{formatDate(enquiry.createdAt)}</time></p>
            </div>
            <Link href={`/properties/${property.id}`} className={linkClass}>{property.title}</Link>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-body">
              {DASHBOARD_ENQUIRY_LABELS[enquiry.kind]}
              <span className={statusClass}>{ENQUIRY_STATUS_LABELS[enquiry.status]}</span>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
