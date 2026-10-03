import { PROPERTY_STATUSES, PROPERTY_TYPES } from "@/types/property";
import type { Property } from "@/types/property";
import { DASHBOARD_ENQUIRY_KINDS } from "@/types/dashboard";
import type {
  ActivityFeedItem,
  ActivityFeedKind,
  ActivityPoint,
  CountItem,
  DashboardEnquiry,
  DashboardEnquiryKind,
  DashboardPropertyUpdate,
  EnquiryStatus,
  Kpi,
  RecentEnquiryRow,
} from "@/types/dashboard";
import { PROPERTY_TYPE_LABELS, STATUS_LABELS } from "@/lib/utils";

export const DASHBOARD_ENQUIRY_LABELS: Record<DashboardEnquiryKind, string> = {
  viewing: "Viewing request",
  ask: "Property question",
  general: "General enquiry",
};

export const ENQUIRY_STATUS_LABELS: Record<EnquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  "viewing-requested": "Viewing requested",
  "follow-up": "Follow-up",
};

const ACTIVITY_LABELS: Record<ActivityFeedKind, string> = {
  "listing-added": "New listing added",
  "status-updated": "Property status updated",
  "viewing-requested": "Viewing requested",
  "listing-updated": "Listing updated",
};

/** Whole-number percentage, or null when the denominator is zero (never NaN or Infinity). */
export function percent(part: number, whole: number): number | null {
  return whole === 0 ? null : Math.round((part / whole) * 100);
}

export function countByType(properties: readonly Property[]): CountItem[] {
  return PROPERTY_TYPES.map((type) => ({
    key: type,
    label: PROPERTY_TYPE_LABELS[type],
    count: properties.filter((property) => property.propertyType === type).length,
  }));
}

export function countByStatus(properties: readonly Property[]): CountItem[] {
  return PROPERTY_STATUSES.map((status) => ({
    key: status,
    label: STATUS_LABELS[status],
    count: properties.filter((property) => property.status === status).length,
  }));
}

export function countByEnquiryKind(enquiries: readonly DashboardEnquiry[]): CountItem[] {
  return DASHBOARD_ENQUIRY_KINDS.map((kind) => ({
    key: kind,
    label: DASHBOARD_ENQUIRY_LABELS[kind],
    count: enquiries.filter((enquiry) => enquiry.kind === kind).length,
  }));
}

function monthName(month: string, style: "short" | "long"): string {
  return new Intl.DateTimeFormat("en-GB", { month: style, timeZone: "UTC" }).format(new Date(`${month}-01T00:00:00Z`));
}

function monthRange(first: string, last: string): string[] {
  const months: string[] = [];
  let year = Number(first.slice(0, 4));
  let month = Number(first.slice(5, 7));
  const end = Number(last.slice(0, 4)) * 12 + Number(last.slice(5, 7));
  while (year * 12 + month <= end) {
    months.push(`${year}-${String(month).padStart(2, "0")}`);
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
  }
  return months;
}

/** Listings come from listedDate; enquiries and viewing requests come from the sample enquiry records. */
export function buildActivitySeries(properties: readonly Property[], enquiries: readonly DashboardEnquiry[]): ActivityPoint[] {
  const keys = [...properties.map((p) => p.listedDate.slice(0, 7)), ...enquiries.map((e) => e.createdAt.slice(0, 7))].sort();
  const first = keys[0];
  const last = keys[keys.length - 1];
  if (first === undefined || last === undefined) return [];
  return monthRange(first, last).map((month) => ({
    month,
    label: monthName(month, "short"),
    listings: properties.filter((p) => p.listedDate.startsWith(month)).length,
    enquiries: enquiries.filter((e) => e.createdAt.startsWith(month)).length,
    viewings: enquiries.filter((e) => e.createdAt.startsWith(month) && e.kind === "viewing").length,
  }));
}

export function describePeriod(series: readonly ActivityPoint[]): string {
  const first = series[0];
  const last = series[series.length - 1];
  if (!first || !last) return "";
  const year = last.month.slice(0, 4);
  return first.month === last.month ? `${monthName(last.month, "long")} ${year}` : `${monthName(first.month, "long")} to ${monthName(last.month, "long")} ${year}`;
}

export function buildKpis(properties: readonly Property[], series: readonly ActivityPoint[]): Kpi[] {
  const latest = series[series.length - 1];
  const previous = series[series.length - 2];
  const available = properties.filter((property) => property.status === "available").length;

  const monthly = (id: string, label: string, pick: (point: ActivityPoint) => number, verb: string): Kpi => {
    if (!latest) return { id, label, value: 0, description: "No activity in the demo data", trend: null };
    const value = pick(latest);
    const description = `${verb} in ${monthName(latest.month, "long")}`;
    if (!previous) return { id, label, value, description, trend: null };
    const delta = value - pick(previous);
    const against = monthName(previous.month, "short");
    if (delta === 0) return { id, label, value, description, trend: { direction: "flat", text: `No change on ${against}` } };
    return { id, label, value, description, trend: { direction: delta > 0 ? "up" : "down", text: `${delta > 0 ? "Up" : "Down"} ${Math.abs(delta)} on ${against}` } };
  };

  return [
    { id: "properties", label: "Properties", value: properties.length, description: `${available} currently available`, trend: null },
    monthly("listings", "New listings", (point) => point.listings, "Listed"),
    monthly("enquiries", "Enquiries", (point) => point.enquiries, "Received"),
    monthly("viewings", "Viewing requests", (point) => point.viewings, "Requested"),
  ];
}

function newestFirst(a: { date: string; id: string }, b: { date: string; id: string }): number {
  return b.date.localeCompare(a.date) || a.id.localeCompare(b.id);
}

export function buildRecentEnquiries(enquiries: readonly DashboardEnquiry[], properties: readonly Property[], limit = 6): RecentEnquiryRow[] {
  const byId = new Map(properties.map((property) => [property.id, property]));
  return [...enquiries]
    .sort((a, b) => newestFirst({ date: a.createdAt, id: a.id }, { date: b.createdAt, id: b.id }))
    .flatMap((enquiry) => {
      const property = byId.get(enquiry.propertyId);
      return property ? [{ enquiry, property }] : [];
    })
    .slice(0, limit);
}

/**
 * Merges events derived from the data (latest listings, latest viewing requests) with sample updates.
 * Records that point at a missing property are skipped.
 */
export function buildActivityFeed(
  properties: readonly Property[],
  enquiries: readonly DashboardEnquiry[],
  updates: readonly DashboardPropertyUpdate[],
  limit = 6,
): ActivityFeedItem[] {
  const byId = new Map(properties.map((property) => [property.id, property]));
  const items: ActivityFeedItem[] = [];
  const location = (property: Property) => `${property.location.suburb}, ${property.location.city}`;

  for (const property of properties) {
    items.push({ id: `listing-${property.id}`, kind: "listing-added", label: ACTIVITY_LABELS["listing-added"], detail: location(property), date: property.listedDate, property });
  }
  for (const enquiry of enquiries) {
    const property = byId.get(enquiry.propertyId);
    if (enquiry.kind === "viewing" && property) {
      items.push({ id: `viewing-${enquiry.id}`, kind: "viewing-requested", label: ACTIVITY_LABELS["viewing-requested"], detail: location(property), date: enquiry.createdAt, property });
    }
  }
  for (const update of updates) {
    const property = byId.get(update.propertyId);
    if (!property) continue;
    const detail = update.kind === "status-updated" ? `Now ${STATUS_LABELS[property.status].toLowerCase()}` : location(property);
    items.push({ id: update.id, kind: update.kind, label: ACTIVITY_LABELS[update.kind], detail, date: update.date, property });
  }
  return items.sort(newestFirst).slice(0, limit);
}
