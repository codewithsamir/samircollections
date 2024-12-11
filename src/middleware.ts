import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";
  const isAdminPath = path.startsWith("/Admin");

  const token = request.cookies.get("token")?.value || "";
  const adminToken = request.cookies.get("admin_token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/Dashboard", request.nextUrl));
  }

  if (!isPublicPath && !token && !isAdminPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isAdminPath && path !== "/Admin/login" && path !== "/Admin/signup" && !adminToken) {
    return NextResponse.redirect(new URL("/Admin/login", request.nextUrl));
  }

  if (isAdminPath && (path === "/Admin/login" || path === "/Admin/signup") && adminToken) {
    return NextResponse.redirect(new URL("/Admin/Dashboard", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/login",
    "/signup",
    "/Dashboard/:path*",
    "/Admin/login",
    "/Admin/signup",
    "/Admin/Dashboard/:path*"
  ],
};
