import type { Metadata } from "next";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { BarList } from "@/components/dashboard/bar-list";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { RecentEnquiries } from "@/components/dashboard/recent-enquiries";
import { Container } from "@/components/ui/container";
import { getDashboardEnquiries, getDashboardPropertyUpdates } from "@/data/dashboard";
import { getAllProperties } from "@/data/properties";
import {
  buildActivityFeed,
  buildActivitySeries,
  buildKpis,
  buildRecentEnquiries,
  countByEnquiryKind,
  countByStatus,
  countByType,
  describePeriod,
  percent,
} from "@/lib/dashboard";

export const metadata: Metadata = {
  title: "Property intelligence",
  description: "A concept dashboard showing what a property business could measure across its portfolio, enquiries and viewings. Illustrative demo data only.",
};

export default function DashboardPage() {
  const properties = getAllProperties();
  const enquiries = getDashboardEnquiries();
  const series = buildActivitySeries(properties, enquiries);
  const viewingRequests = enquiries.filter((enquiry) => enquiry.kind === "viewing").length;
  const viewingShare = percent(viewingRequests, enquiries.length);
  const period = describePeriod(series);

  return (
    <Container className="space-y-14 py-10 sm:py-14">
      <header>
        <p className="eyebrow">Concept dashboard · Demo data</p>
        <h1 className="display mt-3 text-4xl sm:text-5xl">Property Intelligence</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">A clear view of portfolio activity, enquiries and property performance.</p>
        <p className="mt-4 inline-block rounded-sm border border-line bg-surface px-3 py-1.5 text-xs font-medium text-muted">Sample activity · Demo environment</p>
      </header>

      <section aria-labelledby="kpi-heading" className="reveal">
        <h2 id="kpi-heading" className="sr-only">Key figures</h2>
        <KpiGrid kpis={buildKpis(properties, series)} />
      </section>

      <div className="reveal grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <DashboardSection id="inventory-heading" eyebrow="Portfolio" title="Property inventory" description={properties.length === 0 ? "No properties in the demo collection." : `${properties.length} ${properties.length === 1 ? "property" : "properties"} in the demo collection, by type.`}>
          <BarList items={countByType(properties)} />
        </DashboardSection>
        <DashboardSection id="activity-heading" eyebrow="Activity" title="Activity overview" description={`Demo activity trend${period ? `, ${period}` : ""}. Listings come from the demo properties; enquiries and viewing requests are sample records.`}>
          <ActivityChart series={series} />
        </DashboardSection>
      </div>

      <div className="reveal grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <DashboardSection id="enquiries-heading" eyebrow="Enquiries" title="Enquiries and viewings" description={period ? `Sample enquiries, ${period}.` : "Sample enquiries."}>
          <dl className="grid grid-cols-3 gap-4 border-b border-line pb-6">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Enquiries</dt>
              <dd className="display mt-1 text-3xl sm:text-4xl">{enquiries.length}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Viewing requests</dt>
              <dd className="display mt-1 text-3xl sm:text-4xl">{viewingRequests}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Asking for a viewing</dt>
              <dd className="display mt-1 text-3xl sm:text-4xl">{viewingShare === null ? "n/a" : `${viewingShare}%`}</dd>
            </div>
          </dl>
          <p className="mt-3 mb-6 text-xs text-muted">The percentage is viewing requests divided by all sample enquiries.</p>
          <BarList items={countByEnquiryKind(enquiries)} />
        </DashboardSection>
        <DashboardSection id="status-heading" eyebrow="Portfolio" title="Portfolio status" description="Current status of each demo property.">
          <BarList items={countByStatus(properties)} />
        </DashboardSection>
      </div>

      <div className="reveal grid gap-12 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] xl:gap-16">
        <DashboardSection id="recent-enquiries-heading" eyebrow="Enquiries" title="Recent enquiries" description="Fictional names and sample records only. Nothing here is sent or stored.">
          <RecentEnquiries rows={buildRecentEnquiries(enquiries, properties)} />
        </DashboardSection>
        <DashboardSection id="recent-activity-heading" eyebrow="Properties" title="Recent property activity" description="Listings and viewing requests are derived from the demo data; status and listing updates are samples.">
          <ActivityFeed items={buildActivityFeed(properties, enquiries, getDashboardPropertyUpdates())} />
        </DashboardSection>
      </div>

      <section aria-labelledby="about-dashboard-heading" className="border-t border-line pt-6">
        <h2 id="about-dashboard-heading" className="eyebrow">About this dashboard</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          Illustrative analytics for the DeenTech concept. Portfolio figures are calculated from the fictional demo properties; enquiries, viewing requests and updates are fictional sample records. Nothing here is Southbay data, and the dashboard is not connected to any live system. It shows what could be measured, not what Southbay measures or achieves.
        </p>
      </section>
    </Container>
  );
}
