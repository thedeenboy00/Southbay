"use client";

import { useEffect } from "react";
import { ButtonLink, buttonStyles } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-20 sm:py-28">
      <p className="eyebrow">Southbay Concept</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">Something went wrong</h1>
      <p className="mt-4 mb-8 max-w-xl text-body">An unexpected error occurred in this demo. You can try again or return to the properties.</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={reset} className={buttonStyles("primary")}>
          Try again
        </button>
        <ButtonLink href="/properties" variant="secondary">
          Back to properties
        </ButtonLink>
      </div>
    </Container>
  );
}
