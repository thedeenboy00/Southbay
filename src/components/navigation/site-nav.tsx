import Link from "next/link";
import { NAV_ITEMS } from "./nav-items";

export function SiteNav() {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="inline-flex min-h-11 items-center px-3 text-sm font-medium text-body transition-colors hover:text-ink">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
