export const PROPERTY_TYPES = ["house", "apartment", "townhouse", "land", "commercial"] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const LISTING_TYPES = ["sale", "rent"] as const;
export type ListingType = (typeof LISTING_TYPES)[number];
export const PROPERTY_STATUSES = ["available", "under-offer", "sold", "let"] as const;
export type PropertyStatus = (typeof PROPERTY_STATUSES)[number];
export type CurrencyCode = "USD" | "ZAR" | "ZWG";

export interface PropertyLocation {
  suburb: string;
  city: string;
  region: string;
  country: string;
}

export interface PropertyImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: CurrencyCode;
  propertyType: PropertyType;
  listingType: ListingType;
  location: PropertyLocation;
  bedrooms: number | null;
  bathrooms: number | null;
  /** Land size in square metres. */
  landSize: number;
  /** Building size in square metres; null for vacant land. */
  buildingSize: number | null;
  images: readonly PropertyImage[];
  features: readonly string[];
  status: PropertyStatus;
  /** ISO 8601 date (YYYY-MM-DD). */
  listedDate: string;
  agent: Agent;
}
