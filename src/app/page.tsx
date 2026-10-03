import type { Metadata } from "next";
import Image from "next/image";
import { PropertyGrid } from "@/components/properties/property-grid";
import { PropertyTypeTiles } from "@/components/properties/property-type-tiles";
import { RecentPropertyRow } from "@/components/properties/recent-property-row";
import { PropertySearch } from "@/components/search/property-search";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllProperties } from "@/data/properties";
import { propertiesHref } from "@/lib/search-params";

export const metadata: Metadata = {
  title: { absolute: "Southbay Property Experience — Concept by DeenTech" },
  description:
    "An independent DeenTech concept for a modern property platform: discover homes, land and commercial property, understand them clearly, and enquire with ease. Demo data only.",
};

interface Principle {
  title: string;
  body: string;
}

const PRINCIPLES: readonly Principle[] = [
  { title: "Explore with confidence", body: "Clear property pages, consistent presentation and honest status labels, so comparing properties feels straightforward." },
  { title: "Understand the property", body: "The details that matter, size, rooms, features and location, are surfaced first and laid out for quick scanning." },
  { title: "Enquire without friction", body: "A short path from interest to conversation, with the right agent and the right property already in context." },
];

export default function HomePage() {
  const properties = getAllProperties();
  const featured = properties.slice(0, 3);
  const recent = [...properties].sort((a, b) => b.listedDate.localeCompare(a.listedDate)).slice(0, 4);
  const heroImage = properties[0]?.images[0];

  return (
    <>
      <section aria-labelledby="hero-heading" className="border-b border-line bg-surface">
        <Container className="grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
          <div>
            <p className="eyebrow">Property, thoughtfully discovered.</p>
            <h1 id="hero-heading" className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">
              Find a place that feels right.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
              Explore homes, land and commercial property in one clear, considered place, from first search to first viewing.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/properties">Explore properties</ButtonLink>
              <ButtonLink href="#browse" variant="secondary">
                View property types
              </ButtonLink>
            </div>
          </div>
          {heroImage ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-sunken lg:aspect-[5/4]">
              <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
          ) : null}
        </Container>
      </section>

      <Container className="relative z-10 -mt-px pt-0">
        <div className="-translate-y-0 py-8 lg:py-10">
          <PropertySearch submitLabel="Search properties" className="shadow-lift" />
        </div>
      </Container>

      <section aria-labelledby="featured-heading" className="section pt-8 lg:pt-12">
        <Container>
          <div className="reveal">
            <SectionHeading id="featured-heading" eyebrow="Featured" title="Selected properties" action={<ButtonLink href="/properties" variant="secondary">View all properties</ButtonLink>}>
              A fictional demo selection showing how properties are presented.
            </SectionHeading>
            <PropertyGrid properties={featured} />
          </div>
        </Container>
      </section>

      <section id="browse" aria-labelledby="browse-heading" className="section bg-surface">
        <Container>
          <div className="reveal">
            <SectionHeading id="browse-heading" eyebrow="Browse" title="Start with the kind of property">
              Each type opens the collection filtered to that type.
            </SectionHeading>
            <PropertyTypeTiles properties={properties} />
          </div>
        </Container>
      </section>

      <section id="about" aria-labelledby="value-heading" className="section">
        <Container>
          <div className="reveal">
            <SectionHeading id="value-heading" eyebrow="About this concept" title="Property search, made clearer." />
            <ol className="grid gap-8 md:grid-cols-3 md:gap-10">
              {PRINCIPLES.map((principle, index) => (
                <li key={principle.title} className="border-t border-ink pt-5">
                  <p className="text-sm font-semibold text-accent">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-xl font-semibold">{principle.title}</h3>
                  <p className="mt-3 leading-relaxed">{principle.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section aria-labelledby="recent-heading" className="section bg-sunken">
        <Container>
          <div className="reveal">
            <SectionHeading id="recent-heading" eyebrow="New to the collection" title="Recently listed" />
            <div className="grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
              {recent.map((property) => (
                <RecentPropertyRow key={property.id} property={property} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="contact" aria-labelledby="cta-heading" className="section on-dark bg-brand">
        <Container>
          <div className="reveal">
            <SectionHeading id="cta-heading" eyebrow="Enquiries" title="Ready to explore your next property?" inverse>
              Open any property to try the enquiry preview. This is a concept: nothing on this site is sent to Southbay or DeenTech, or stored.
            </SectionHeading>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={propertiesHref()} variant="inverse">
                Explore properties
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
