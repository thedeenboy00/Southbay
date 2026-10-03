import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConceptEnquiryForm } from "@/components/enquiry/concept-enquiry-form";
import { EnquiryLink } from "@/components/enquiry/enquiry-link";
import { MobileActionBar } from "@/components/enquiry/mobile-action-bar";
import { AgentPanel } from "@/components/properties/agent-panel";
import { LocationPanel } from "@/components/properties/location-panel";
import { PropertyBreadcrumb } from "@/components/properties/property-breadcrumb";
import { PropertyGallery } from "@/components/properties/property-gallery";
import { PropertyGrid } from "@/components/properties/property-grid";
import { KeySpecs, PropertyFacts } from "@/components/properties/property-info";
import { PropertyStatusBadge } from "@/components/properties/property-status-badge";
import { Container } from "@/components/ui/container";
import { getAllProperties, getPropertyById } from "@/data/properties";
import {
  getDetailActions,
  getKeySpecs,
  getPriceCaption,
  getPropertyFacts,
  getPropertyMetadataDescription,
  getRelatedProperties,
  getStatusNote,
} from "@/lib/property-detail";
import { LISTING_LABELS, PROPERTY_TYPE_LABELS, formatPrice } from "@/lib/utils";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

/** Only ids from the data layer are valid. Anything else, including malformed URLs, resolves to the 404 page. */
export const dynamicParams = false;

export function generateStaticParams(): { id: string }[] {
  return getAllProperties().map((property) => ({ id: property.id }));
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) return { title: "Property not found" };
  return {
    title: `${property.title}, ${property.location.suburb}`,
    description: getPropertyMetadataDescription(property),
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) notFound();

  const actions = getDetailActions(property.status);
  const specs = getKeySpecs(property);
  const statusNote = getStatusNote(property.status);
  const related = getRelatedProperties(getAllProperties(), property);
  const price = formatPrice(property.price, property.currency);

  return (
    <div className="pb-28 lg:pb-0">
      <Container className="pt-4 sm:pt-6">
        <div id="property-top" className="scroll-mt-24">
          <PropertyBreadcrumb property={property} />
        </div>
        <div className="mt-2">
          <PropertyGallery images={property.images} />
        </div>
      </Container>

      <Container className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
        <div className="min-w-0 space-y-12">
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-sm bg-brand px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-white">{LISTING_LABELS[property.listingType]}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">{PROPERTY_TYPE_LABELS[property.propertyType]}</span>
              <PropertyStatusBadge status={property.status} />
            </div>
            <h1 className="display mt-4 text-3xl sm:text-4xl lg:text-5xl">{property.title}</h1>
            <p className="mt-2 text-base text-muted">
              {property.location.suburb}, {property.location.city}, {property.location.region}
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted">{getPriceCaption(property)}</p>
            <p className="display mt-1 text-4xl text-brand sm:text-5xl">{price}</p>
            {statusNote ? <p className="mt-3 max-w-xl border-l-2 border-accent pl-4 text-sm text-body">{statusNote}</p> : null}
            <div className="mt-6">
              <KeySpecs items={specs} />
            </div>
            <div id="property-actions" className="mt-6 flex flex-col gap-3 sm:flex-row">
              <EnquiryLink type={actions.primary.type}>{actions.primary.label}</EnquiryLink>
              {actions.secondary ? (
                <EnquiryLink type={actions.secondary.type} variant="secondary">
                  {actions.secondary.label}
                </EnquiryLink>
              ) : null}
            </div>
          </header>

          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="display text-2xl sm:text-3xl">Overview</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">{property.description}</p>
          </section>

          {property.features.length > 0 ? (
            <section aria-labelledby="features-heading">
              <h2 id="features-heading" className="display text-2xl sm:text-3xl">Features</h2>
              <ul className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 border-b border-line py-3 text-sm text-ink">
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m3 8.5 3.2 3L13 4.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section aria-labelledby="details-heading">
            <h2 id="details-heading" className="display text-2xl sm:text-3xl">Property details</h2>
            <div className="mt-4">
              <PropertyFacts items={getPropertyFacts(property)} />
            </div>
          </section>

          <section aria-labelledby="location-heading">
            <h2 id="location-heading" className="display text-2xl sm:text-3xl">Location</h2>
            <div className="mt-4">
              <LocationPanel location={property.location} />
            </div>
          </section>
        </div>

        <div className="lg:pt-1">
          <div className="lg:sticky lg:top-6">
            <AgentPanel agent={property.agent} actionType={actions.primary.type} />
          </div>
        </div>
      </Container>

      <section id="enquiry" aria-labelledby="enquiry-heading" className="mt-16 scroll-mt-6 border-y border-line bg-sunken py-14 lg:mt-24 lg:py-20">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="eyebrow">Enquire</p>
            <h2 id="enquiry-heading" className="display mt-3 text-3xl sm:text-4xl">
              {actions.enquiryTypes.length > 1 ? "Request a viewing or ask a question" : "Ask about this property"}
            </h2>
            <p className="mt-4 text-body">This is a concept form. It checks your entries and shows a preview, but nothing is sent to Southbay, DeenTech or any agent, and nothing is stored.</p>
          </div>
          <ConceptEnquiryForm propertyTitle={property.title} enquiryTypes={actions.enquiryTypes} defaultType={actions.primary.type} />
        </Container>
      </section>

      <section aria-labelledby="related-heading" className="py-14 lg:py-20">
        <Container>
          <div className="reveal">
            <p className="eyebrow">Keep exploring</p>
            <h2 id="related-heading" className="display mt-3 mb-8 text-3xl sm:text-4xl">Related properties</h2>
            <PropertyGrid properties={related} />
            <p className="mt-10 text-xs text-muted">Demo listing. The property, agent and all details are fictional.</p>
          </div>
        </Container>
      </section>

      <MobileActionBar action={actions.primary} priceLabel={price} />
    </div>
  );
}
