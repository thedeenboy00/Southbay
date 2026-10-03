import type { DashboardEnquiry, DashboardPropertyUpdate } from "@/types/dashboard";

/**
 * DEMO DATA ONLY. Every name and record below is fictional and is not Southbay data.
 * Property references use ids from src/data/properties.ts; portfolio figures are derived from that data.
 */

const enquiries: readonly DashboardEnquiry[] = [
  { id: "enq-01", name: "Nomsa D.", propertyId: "ridge-view-estate-008", kind: "ask", status: "contacted", createdAt: "2026-06-30" },
  { id: "enq-02", name: "Kuda R.", propertyId: "garden-townhouse-003", kind: "viewing", status: "viewing-requested", createdAt: "2026-07-24" },
  { id: "enq-03", name: "Sam T.", propertyId: "garden-townhouse-003", kind: "ask", status: "contacted", createdAt: "2026-07-27" },
  { id: "enq-04", name: "Chipo L.", propertyId: "ridge-view-estate-008", kind: "general", status: "follow-up", createdAt: "2026-07-29" },
  { id: "enq-05", name: "Ruth N.", propertyId: "coastal-residence-001", kind: "viewing", status: "viewing-requested", createdAt: "2026-08-15" },
  { id: "enq-06", name: "Alex M.", propertyId: "coastal-residence-001", kind: "ask", status: "contacted", createdAt: "2026-08-19" },
  { id: "enq-07", name: "Farai G.", propertyId: "garden-townhouse-003", kind: "ask", status: "follow-up", createdAt: "2026-08-21" },
  { id: "enq-08", name: "Rudo S.", propertyId: "lakeside-apartment-007", kind: "viewing", status: "contacted", createdAt: "2026-08-31" },
  { id: "enq-09", name: "Tariro K.", propertyId: "lakeside-apartment-007", kind: "ask", status: "contacted", createdAt: "2026-09-03" },
  { id: "enq-10", name: "Blessing H.", propertyId: "harbour-apartment-002", kind: "viewing", status: "new", createdAt: "2026-09-08" },
  { id: "enq-11", name: "Jordan P.", propertyId: "central-office-suite-006", kind: "general", status: "new", createdAt: "2026-09-12" },
  { id: "enq-12", name: "Ellen V.", propertyId: "development-stand-004", kind: "viewing", status: "viewing-requested", createdAt: "2026-09-20" },
  { id: "enq-13", name: "Simba C.", propertyId: "coastal-residence-001", kind: "viewing", status: "follow-up", createdAt: "2026-09-22" },
  { id: "enq-14", name: "Naledi B.", propertyId: "development-stand-004", kind: "ask", status: "contacted", createdAt: "2026-09-24" },
  { id: "enq-15", name: "Takudzwa M.", propertyId: "hillcrest-family-home-005", kind: "viewing", status: "new", createdAt: "2026-09-27" },
  { id: "enq-16", name: "Alex M.", propertyId: "hillcrest-family-home-005", kind: "ask", status: "new", createdAt: "2026-09-28" },
];

const propertyUpdates: readonly DashboardPropertyUpdate[] = [
  { id: "upd-01", kind: "status-updated", propertyId: "ridge-view-estate-008", date: "2026-08-26" },
  { id: "upd-02", kind: "listing-updated", propertyId: "coastal-residence-001", date: "2026-09-14" },
  { id: "upd-03", kind: "status-updated", propertyId: "garden-townhouse-003", date: "2026-09-15" },
  { id: "upd-04", kind: "status-updated", propertyId: "central-office-suite-006", date: "2026-09-30" },
];

export function getDashboardEnquiries(): readonly DashboardEnquiry[] {
  return enquiries;
}

export function getDashboardPropertyUpdates(): readonly DashboardPropertyUpdate[] {
  return propertyUpdates;
}
