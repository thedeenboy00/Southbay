import type { Metadata } from "next";
import { EmptyState } from "@/components/properties/empty-state";
import { PropertyGrid } from "@/components/properties/property-grid";
import { ActiveFilters } from "@/components/search/active-filters";
import { FilterDisclosure } from "@/components/search/filter-disclosure";
import { PropertySearch } from "@/components/search/property-search";
import { SortLinks } from "@/components/search/sort-links";
import { Container } from "@/components/ui/container";
import { getAllProperties } from "@/data/properties";
import { discoverProperties, formatResultCount, getActiveFilters, parseSearchParams } from "@/lib/property-filters";
import type { RawSearchParams } from "@/lib/property-filters";
import { propertiesHref } from "@/lib/search-params";

export const metadata: Metadata = {
  title: "Properties",
  description: "Search and filter a collection of fictional demo properties by location, type and buy or rent.",
};

interface PropertiesPageProps {
  searchParams: Promise<RawSearchParams>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const query = parseSearchParams(await searchParams);
  const results = discoverProperties(getAllProperties(), query);
  const activeFilters = getActiveFilters(query);
  const stateKey = propertiesHref(query);

  return (
    <Container className="py-10 sm:py-12">
      <p className="eyebrow">Demo collection</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">Properties</h1>
      <p className="mt-4 mb-8 max-w-2xl text-body">Search a fictional demo collection. The URL holds your filters, so any search can be shared or refreshed.</p>

      <FilterDisclosure key={stateKey} activeCount={activeFilters.length}>
        <PropertySearch query={query} submitLabel="Apply filters" />
      </FilterDisclosure>
      <ActiveFilters filters={activeFilters} clearAllHref={propertiesHref({ sort: query.sort })} />

      <div className="mt-6 flex flex-col gap-2 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
        <p role="status" className="text-base font-semibold text-ink">
          {formatResultCount(results.length)}
        </p>
        <SortLinks query={query} current={query.sort} />
      </div>

      <div className="mt-8">
        {results.length > 0 ? (
          <>
            <h2 className="sr-only">Property listings</h2>
            <PropertyGrid properties={results} />
          </>
        ) : (
          <EmptyState clearHref={propertiesHref({ sort: query.sort })} hasFilters={activeFilters.length > 0} />
        )}
      </div>
    </Container>
  );
}
