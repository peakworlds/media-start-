import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Only protect /api/sync routes with CRON_SECRET
  if (pathname.startsWith("/api/sync")) {
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret) {
      return NextResponse.json(
        { error: "Server misconfigured: CRON_SECRET not set" },
        { status: 500 }
      );
    }

    // Check Authorization header (Bearer token) or ?secret= query param
    const authHeader = request.headers.get("authorization");
    const bearerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;
    const querySecret = searchParams.get("secret");

    if (bearerToken !== cronSecret && querySecret !== cronSecret) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/sync/:path*"],
};
