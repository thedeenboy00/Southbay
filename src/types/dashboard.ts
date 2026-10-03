import type { Property } from "@/types/property";
import type { EnquiryType } from "@/lib/enquiry";

/** Dashboard enquiries reuse the public form's types and add a general enquiry. */
export const DASHBOARD_ENQUIRY_KINDS = ["viewing", "ask", "general"] as const satisfies readonly (EnquiryType | "general")[];
export type DashboardEnquiryKind = (typeof DASHBOARD_ENQUIRY_KINDS)[number];

export const ENQUIRY_STATUSES = ["new", "contacted", "viewing-requested", "follow-up"] as const;
export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

/** Fictional sample record. Not real people or real enquiries. */
export interface DashboardEnquiry {
  id: string;
  name: string;
  propertyId: string;
  kind: DashboardEnquiryKind;
  status: EnquiryStatus;
  /** ISO 8601 date (YYYY-MM-DD). */
  createdAt: string;
}

export type PropertyUpdateKind = "status-updated" | "listing-updated";

/** Fictional sample record for events the Property model cannot derive on its own. */
export interface DashboardPropertyUpdate {
  id: string;
  kind: PropertyUpdateKind;
  propertyId: string;
  date: string;
}

export type ActivityFeedKind = "listing-added" | "viewing-requested" | PropertyUpdateKind;

export interface ActivityPoint {
  /** YYYY-MM */
  month: string;
  label: string;
  listings: number;
  enquiries: number;
  viewings: number;
}

export interface Kpi {
  id: string;
  label: string;
  value: number;
  description: string;
  trend: { direction: "up" | "down" | "flat"; text: string } | null;
}

export interface CountItem {
  key: string;
  label: string;
  count: number;
}

export interface RecentEnquiryRow {
  enquiry: DashboardEnquiry;
  property: Property;
}

export interface ActivityFeedItem {
  id: string;
  kind: ActivityFeedKind;
  label: string;
  detail: string;
  date: string;
  property: Property;
}
