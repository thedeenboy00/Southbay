import Image from "next/image";
import Link from "next/link";
import type { ActivityFeedItem } from "@/types/dashboard";
import { formatDate } from "@/lib/utils";

interface ActivityFeedProps {
  items: readonly ActivityFeedItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  if (items.length === 0) return <p className="text-sm text-muted">No sample activity to show.</p>;
  return (
    <ul>
      {items.map((item) => {
        const cover = item.property.images[0];
        return (
          <li key={item.id} className="flex gap-4 border-b border-line py-4 first:pt-0">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm bg-sunken">
              {cover ? <Image src={cover.src} alt="" fill sizes="56px" className="object-cover" /> : null}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">{item.label}</p>
              <Link href={`/properties/${item.property.id}`} className="inline-flex min-h-11 items-center font-medium text-ink underline-offset-2 hover:underline">
                {item.property.title}
              </Link>
              <p className="text-sm text-muted">
                {item.detail} · <time dateTime={item.date}>{formatDate(item.date)}</time>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
