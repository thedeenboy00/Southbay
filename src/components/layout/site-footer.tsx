import Link from "next/link";
import { NAV_ITEMS } from "@/components/navigation/nav-items";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="display text-xl text-brand">Southbay</p>
          <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted">Concept by DeenTech</p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
            An independent design concept. It is not affiliated with Southbay Real Estate, does not connect to its systems, and every property shown is fictional demo data.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex min-h-11 items-center text-sm text-body hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
