import { propertiesHref } from "@/lib/search-params";

export interface NavItem {
  href: string;
  label: string;
}

/** Buy and Rent open /properties pre-filtered through the shared query helper. */
export const NAV_ITEMS: readonly NavItem[] = [
  { href: propertiesHref(), label: "Properties" },
  { href: propertiesHref({ listing: "sale" }), label: "Buy" },
  { href: propertiesHref({ listing: "rent" }), label: "Rent" },
  { href: "/#about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/#contact", label: "Contact" },
];

export const VIEWING_CTA: NavItem = { href: "/#contact", label: "Request a viewing" };
