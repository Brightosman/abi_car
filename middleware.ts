// import createMiddleware from "next-intl/middleware";
// import {routing} from './i18n/routing';
// import { clerkMiddleware } from "@clerk/nextjs/server";


// export default clerkMiddleware();


// // export default createMiddleware({
// //   // A list of all locales that are supported
// //   locales: ["en", "fr"],

// //   // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
// //   defaultLocale: "fr",
// // });

// export default createMiddleware(routing);

// // export const config = {
// //   // Skip all paths that should not be internationalized. This example skips
// //   // certain folders and all pathnames with a dot (e.g. favicon.ico)
// //   matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
// // };

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(fr|en)/:path*']
// };



import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from './i18n/routing';
import { clerkMiddleware } from "@clerk/nextjs/server";

// Create next-intl middleware
const intlMiddleware = createMiddleware(routing);

// Custom middleware combining next-intl and Clerk
export default async function middleware(req: NextRequest) {
  // Step 1: Determine locale with intlMiddleware
  const intlResponse = intlMiddleware(req);
  if (intlResponse) {
    return intlResponse;
  }

  // Step 2: Authenticate with Clerk
  return clerkMiddleware()(req, {});
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
