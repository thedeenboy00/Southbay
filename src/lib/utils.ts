import type { CurrencyCode, ListingType, PropertyStatus, PropertyType } from "@/types/property";

export function cn(...classes: ReadonlyArray<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** The data model carries no rental period, so rent prices are shown without one. */
export function formatPrice(amount: number, currency: CurrencyCode): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(isoDate));
}

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  house: "House",
  apartment: "Apartment",
  townhouse: "Townhouse",
  land: "Land",
  commercial: "Commercial",
};

export const LISTING_LABELS: Record<ListingType, string> = {
  sale: "For sale",
  rent: "To rent",
};

export const STATUS_LABELS: Record<PropertyStatus, string> = {
  available: "Available",
  "under-offer": "Under offer",
  sold: "Sold",
  let: "Let",
};
