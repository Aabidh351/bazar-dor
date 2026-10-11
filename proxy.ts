import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authToasts } from "./lib/toast";

export function proxy(request: NextRequest) {
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ??
    request.cookies.get("__Secure-better-auth.session_token");

  if (!sessionCookie) {
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set("reason", "auth-required");
    loginUrl.searchParams.set(
      "callbackURL",
      request.nextUrl.pathname,
    );
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/product/:slug*"],
};