import { LISTING_TYPES, PROPERTY_TYPES } from "@/types/property";
import type { ListingType, PropertyType } from "@/types/property";

/** Single source of truth for the query parameter names read by /properties. */
export const PROPERTY_QUERY_KEYS = {
  location: "location",
  type: "type",
  listing: "listing",
  sort: "sort",
} as const;

export const SORT_OPTIONS = ["newest", "price-asc", "price-desc"] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];
export const DEFAULT_SORT: SortOption = "newest";

export const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
};

export function isPropertyType(value: string): value is PropertyType {
  return PROPERTY_TYPES.some((type) => type === value);
}

export function isListingType(value: string): value is ListingType {
  return LISTING_TYPES.some((listing) => listing === value);
}

export function isSortOption(value: string): value is SortOption {
  return SORT_OPTIONS.some((option) => option === value);
}

export interface PropertyQuery {
  location?: string;
  type?: PropertyType;
  listing?: ListingType;
  sort?: SortOption;
}

/** The only place property-listing URLs are built. The default sort is omitted to keep URLs short. */
export function propertiesHref(query: PropertyQuery = {}): string {
  const params = new URLSearchParams();
  if (query.location) params.set(PROPERTY_QUERY_KEYS.location, query.location);
  if (query.type) params.set(PROPERTY_QUERY_KEYS.type, query.type);
  if (query.listing) params.set(PROPERTY_QUERY_KEYS.listing, query.listing);
  if (query.sort && query.sort !== DEFAULT_SORT) params.set(PROPERTY_QUERY_KEYS.sort, query.sort);
  const queryString = params.toString();
  return queryString ? `/properties?${queryString}` : "/properties";
}
