import Link from "next/link";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { VIEWING_CTA } from "@/components/navigation/nav-items";
import { SiteNav } from "@/components/navigation/site-nav";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  return (
    <header className="relative z-30 border-b border-line bg-surface">
      <Container className="flex min-h-16 items-center justify-between gap-4 lg:min-h-20">
        <Link href="/" className="flex min-h-11 flex-col justify-center leading-none">
          <span className="display text-xl font-semibold text-brand sm:text-2xl">Southbay</span>
          <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted">Concept by DeenTech</span>
        </Link>
        <SiteNav />
        <div className="flex items-center gap-3">
          <ButtonLink href={VIEWING_CTA.href} className="min-h-11 max-lg:hidden">
            {VIEWING_CTA.label}
          </ButtonLink>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
