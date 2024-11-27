
import { NextRequest, NextFetchEvent } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from './i18n/routing';
import { clerkMiddleware } from "@clerk/nextjs/server";

// Create next-intl middleware
const intlMiddleware = createMiddleware(routing);

// Custom middleware combining next-intl and Clerk
export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  // Step 1: Determine locale with intlMiddleware
  const intlResponse = intlMiddleware(req);
  if (intlResponse) {
    return intlResponse;
  }

  // Step 2: Authenticate with Clerk
  // Pass both req and event to clerkMiddleware
  return clerkMiddleware()(req, event);
}

// Middleware configuration
export const config = {
  matcher: [
    // Include localized paths and authentication routes
    '/',
    '/(fr|en)/:path*',
    '/sign-in',
    '/sign-up',
    '/api/:path*', // If you need APIs authenticated as well
  ],
};
