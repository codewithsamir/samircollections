import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Verifies an HS256 JWT's signature and expiry with Web Crypto, so forged or expired cookies are rejected
async function isValidToken(token: string) {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!token || !secret) return false;
  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) return false;
  try {
    const decode = (part: string) => Uint8Array.from(atob(part.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
    const valid = await crypto.subtle.verify("HMAC", key, decode(signature), new TextEncoder().encode(`${header}.${payload}`));
    if (!valid) return false;
    const { exp } = JSON.parse(new TextDecoder().decode(decode(payload)));
    return !exp || exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;
  const hostname = request.headers.get("host") || "";

  // Check for admin subdomain
  const isSubdomainAdmin = hostname.startsWith("admin.");
  
  // If it's an admin subdomain, we treat all paths as prefixed with /Admin
  let effectivePath = path;
  if (isSubdomainAdmin && !path.startsWith("/Admin")) {
    effectivePath = `/Admin${path}`;
  }

  const isPublicPath = effectivePath === "/login" || effectivePath === "/signup";
  const isAdminPath = effectivePath.startsWith("/Admin");

  const token = (await isValidToken(request.cookies.get("token")?.value || "")) ? "valid" : "";
  const adminToken = (await isValidToken(request.cookies.get("admin_token")?.value || "")) ? "valid" : "";

  // Logic for Admin Subdomain / Admin Path
  if (isAdminPath) {
    const adminLoginPath = isSubdomainAdmin ? "/login" : "/Admin/login";
    const adminSignupPath = isSubdomainAdmin ? "/signup" : "/Admin/signup";
    const adminDashboardPath = isSubdomainAdmin ? "/Dashboard" : "/Admin/Dashboard";

    if (effectivePath !== adminLoginPath && effectivePath !== adminSignupPath && !adminToken) {
      return NextResponse.redirect(new URL(adminLoginPath, request.url));
    }

    if ((effectivePath === adminLoginPath || effectivePath === adminSignupPath) && adminToken) {
      return NextResponse.redirect(new URL(adminDashboardPath, request.url));
    }
    
    // Perform the rewrite if it's a subdomain
    if (isSubdomainAdmin && !path.startsWith("/Admin")) {
      return NextResponse.rewrite(new URL(effectivePath, request.url));
    }
  } else {
    // Logic for main site / Dashboard
    if (isPublicPath && token) {
      return NextResponse.redirect(new URL("/Dashboard", request.url));
    }

    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
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
