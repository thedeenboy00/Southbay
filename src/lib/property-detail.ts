import type { Property, PropertyStatus } from "@/types/property";
import type { EnquiryType } from "@/lib/enquiry";
import { ENQUIRY_TYPE_LABELS } from "@/lib/enquiry";
import { LISTING_LABELS, PROPERTY_TYPE_LABELS, STATUS_LABELS, formatDate, formatPrice } from "@/lib/utils";

export interface LabelledValue {
  label: string;
  value: string;
}

/** Only values that exist in the data are returned; missing specs are omitted, never shown as 0. */
export function getKeySpecs(property: Property): LabelledValue[] {
  const specs: LabelledValue[] = [];
  if (property.bedrooms !== null) specs.push({ label: "Bedrooms", value: String(property.bedrooms) });
  if (property.bathrooms !== null) specs.push({ label: "Bathrooms", value: String(property.bathrooms) });
  if (property.buildingSize !== null) specs.push({ label: "Building size", value: `${property.buildingSize} m²` });
  if (property.landSize > 0) specs.push({ label: "Land size", value: `${property.landSize} m²` });
  return specs;
}

export function getPropertyFacts(property: Property): LabelledValue[] {
  const facts: LabelledValue[] = [
    { label: "Property type", value: PROPERTY_TYPE_LABELS[property.propertyType] },
    { label: "Listing type", value: LISTING_LABELS[property.listingType] },
    { label: "Status", value: STATUS_LABELS[property.status] },
    { label: "Listed", value: formatDate(property.listedDate) },
  ];
  return facts;
}

export interface DetailAction {
  type: EnquiryType;
  label: string;
}

export interface DetailActions {
  primary: DetailAction;
  secondary: DetailAction | null;
  enquiryTypes: readonly EnquiryType[];
}

function action(type: EnquiryType): DetailAction {
  return { type, label: ENQUIRY_TYPE_LABELS[type] };
}

/** A viewing is only offered while the property is available. Otherwise the page offers a question only. */
export function getDetailActions(status: PropertyStatus): DetailActions {
  switch (status) {
    case "available":
      return { primary: action("viewing"), secondary: action("ask"), enquiryTypes: ["viewing", "ask"] };
    case "under-offer":
    case "sold":
    case "let":
      return { primary: action("ask"), secondary: null, enquiryTypes: ["ask"] };
  }
}

export function getStatusNote(status: PropertyStatus): string | null {
  switch (status) {
    case "available":
      return null;
    case "under-offer":
      return "This property is under offer. You can still ask about it.";
    case "sold":
      return "This property has been sold and is no longer available.";
    case "let":
      return "This property has been let and is no longer available.";
  }
}

export function getPriceCaption(property: Property): string {
  if (property.status === "sold" || property.status === "let") return "Last listed price";
  return property.listingType === "rent" ? "Rental price" : "Sale price";
}

/**
 * Deterministic: same property type scores 2, same listing type scores 1; ties go to the newest listing,
 * then id. If fewer than `limit` properties score, the next-best remaining properties fill the list.
 */
export function getRelatedProperties(all: readonly Property[], current: Property, limit = 3): Property[] {
  const score = (candidate: Property): number =>
    (candidate.propertyType === current.propertyType ? 2 : 0) + (candidate.listingType === current.listingType ? 1 : 0);
  return all
    .filter((candidate) => candidate.id !== current.id)
    .sort((a, b) => score(b) - score(a) || b.listedDate.localeCompare(a.listedDate) || a.id.localeCompare(b.id))
    .slice(0, limit);
}

export function getPropertyMetadataDescription(property: Property): string {
  const { suburb, city } = property.location;
  return `${PROPERTY_TYPE_LABELS[property.propertyType]} ${LISTING_LABELS[property.listingType].toLowerCase()} in ${suburb}, ${city} for ${formatPrice(property.price, property.currency)}. ${property.description}`;
}
