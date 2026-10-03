import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-20 sm:py-28">
      <p className="eyebrow">Southbay Concept</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">Page not found</h1>
      <p className="mt-4 mb-8 max-w-xl text-body">The page or property you are looking for does not exist in this demo collection.</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/properties">Back to properties</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Go to homepage
        </ButtonLink>
      </div>
    </Container>
  );
}
