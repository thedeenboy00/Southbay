import { ButtonLink } from "@/components/ui/button-link";

interface EmptyStateProps {
  clearHref: string;
  hasFilters: boolean;
}

export function EmptyState({ clearHref, hasFilters }: EmptyStateProps) {
  return (
    <div className="rounded-card border border-line bg-surface px-6 py-12 text-center sm:py-16">
      <h2 className="display text-2xl sm:text-3xl">No properties match these filters.</h2>
      <p className="mx-auto mt-3 max-w-md text-body">
        No matching demo properties were found. Try removing a filter or searching another location.
      </p>
      {hasFilters ? (
        <div className="mt-6 flex justify-center">
          <ButtonLink href={clearHref}>Clear filters</ButtonLink>
        </div>
      ) : null}
    </div>
  );
}
