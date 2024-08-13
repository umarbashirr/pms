import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_COOKIE_NAME } from "./constants/cookie";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = cookies().get(ACCESS_COOKIE_NAME)?.value;

  if (request.nextUrl.pathname === "/properties") {
    return NextResponse.redirect(new URL("/select-property", request.url));
  }
  if (request.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (token && request.nextUrl.pathname.includes("/auth")) {
    return NextResponse.redirect(new URL("/select-property", request.url));
  }

  if (!token && request.nextUrl.pathname.includes("/properties")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
