import type { Property } from "@/types/property";
import {
  DEFAULT_SORT,
  PROPERTY_QUERY_KEYS,
  isListingType,
  isPropertyType,
  isSortOption,
  propertiesHref,
} from "@/lib/search-params";
import type { PropertyQuery, SortOption } from "@/lib/search-params";
import { LISTING_LABELS, PROPERTY_TYPE_LABELS } from "@/lib/utils";

/** Raw shape of Next.js App Router `searchParams`. */
export type RawSearchParams = Record<string, string | string[] | undefined>;

/** A parsed query always has a sort. */
export interface DiscoveryQuery extends PropertyQuery {
  sort: SortOption;
}

export interface ActiveFilter {
  key: "location" | "type" | "listing";
  label: string;
  removeHref: string;
}

const MAX_LOCATION_LENGTH = 80;

function firstValue(raw: RawSearchParams, key: string): string | undefined {
  const value = raw[key];
  return Array.isArray(value) ? value[0] : value;
}

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/[\s,;_-]+/g, " ").trim();
}

/**
 * Invalid `type`, `listing` and `sort` values are ignored (treated as not supplied), so a malformed
 * URL never errors and never silently empties the results. A blank `location` is also ignored.
 */
export function parseSearchParams(raw: RawSearchParams): DiscoveryQuery {
  const location = (firstValue(raw, PROPERTY_QUERY_KEYS.location) ?? "").trim().replace(/\s+/g, " ").slice(0, MAX_LOCATION_LENGTH);
  const type = (firstValue(raw, PROPERTY_QUERY_KEYS.type) ?? "").trim().toLowerCase();
  const listing = (firstValue(raw, PROPERTY_QUERY_KEYS.listing) ?? "").trim().toLowerCase();
  const sort = (firstValue(raw, PROPERTY_QUERY_KEYS.sort) ?? "").trim().toLowerCase();

  return {
    location: location === "" ? undefined : location,
    type: isPropertyType(type) ? type : undefined,
    listing: isListingType(listing) ? listing : undefined,
    sort: isSortOption(sort) ? sort : DEFAULT_SORT,
  };
}

/**
 * Location match uses the structured fields that exist on PropertyLocation (suburb, city, region, country).
 * Every word in the query must appear somewhere in those fields, case-insensitively, so "demo-bay",
 * "Demo Bay" and "demo bay seaview" all work. Partial words match ("sea" finds Seaview).
 */
function matchesLocation(property: Property, location: string | undefined): boolean {
  if (location === undefined) return true;
  const terms = normalizeText(location).split(" ").filter((term) => term !== "");
  if (terms.length === 0) return true;
  const { suburb, city, region, country } = property.location;
  const haystack = normalizeText([suburb, city, region, country].join(" "));
  return terms.every((term) => haystack.includes(term));
}

/** AND-based: a property must satisfy every supplied filter. */
export function filterProperties(properties: readonly Property[], query: PropertyQuery): Property[] {
  return properties.filter(
    (property) =>
      (query.type === undefined || property.propertyType === query.type) &&
      (query.listing === undefined || property.listingType === query.listing) &&
      matchesLocation(property, query.location),
  );
}

function byNewest(a: Property, b: Property): number {
  return b.listedDate.localeCompare(a.listedDate) || a.id.localeCompare(b.id);
}

/** Returns a new array. Price sorts compare raw amounts (demo data is single-currency) and fall back to newest. */
export function sortProperties(properties: readonly Property[], sort: SortOption): Property[] {
  const sorted = [...properties];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price || byNewest(a, b));
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price || byNewest(a, b));
    case "newest":
      return sorted.sort(byNewest);
  }
}

/** Filter first, then sort. */
export function discoverProperties(properties: readonly Property[], query: DiscoveryQuery): Property[] {
  return sortProperties(filterProperties(properties, query), query.sort);
}

export function getActiveFilters(query: DiscoveryQuery): ActiveFilter[] {
  const filters: ActiveFilter[] = [];
  if (query.type !== undefined) {
    filters.push({ key: "type", label: PROPERTY_TYPE_LABELS[query.type], removeHref: propertiesHref({ ...query, type: undefined }) });
  }
  if (query.listing !== undefined) {
    filters.push({ key: "listing", label: LISTING_LABELS[query.listing], removeHref: propertiesHref({ ...query, listing: undefined }) });
  }
  if (query.location !== undefined) {
    filters.push({ key: "location", label: `Location: ${query.location}`, removeHref: propertiesHref({ ...query, location: undefined }) });
  }
  return filters;
}

export function formatResultCount(count: number): string {
  if (count === 0) return "No properties found";
  return count === 1 ? "1 property" : `${count} properties`;
}
