import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js 16 returns a 500 for dynamic routes when a path segment is not valid percent-encoding
 * (for example /properties/%E0%A4%A). Route those requests to the normal 404 page instead.
 */
export function proxy(request: NextRequest) {
  const { pathname } = new URL(request.url);
  try {
    decodeURIComponent(pathname);
  } catch {
    return NextResponse.rewrite(new URL("/not-a-page", request.url), { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/properties/:path*"],
};
