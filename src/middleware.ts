import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register");

  // Allow /admin/api routes to pass through
  if (req.nextUrl.pathname.startsWith("/admin/api")) {
    return NextResponse.next();
  }

  // For auth pages (login, register)
  if (isAuthPage) {
    if (isAuthenticated) {
      const role = token.role as string;
      const redirectUrl = role === "admin" ? "/admin" : "/";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }
    return NextResponse.next();
  }

  // For protected routes
  if (!isAuthenticated) {
    const searchParams = new URLSearchParams([
      ["callbackUrl", req.nextUrl.pathname],
    ]);
    return NextResponse.redirect(new URL(`/login?${searchParams}`, req.url));
  }
  // Special handling for admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const role = token.role as string;
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Prevent admin from accessing checkout
  if (req.nextUrl.pathname === "/checkout") {
    const role = token.role as string;
    if (role === "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/admin/:path*", "/checkout"],
};
