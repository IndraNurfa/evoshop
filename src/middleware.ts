import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register");
  // Check if there's a specific page to return to after login
  const callbackUrl = req.nextUrl.searchParams.get("callbackUrl");

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthPage) {
    const role = token.role as string;
    // If admin, always redirect to admin page unless there's a specific callback
    const redirectUrl = callbackUrl || (role === "admin" ? "/admin" : "/");
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  // Handle admin routes
  if (isAuthenticated && req.nextUrl.pathname.startsWith("/admin")) {
    const role = token.role as string;
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Prevent admin from accessing checkout
  if (isAuthenticated && req.nextUrl.pathname === "/checkout") {
    const role = token.role as string;
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/admin/:path*", "/checkout"],
};
