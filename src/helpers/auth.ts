import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import CustomerUser from "@/models/user.model";
import { connectToDatabase } from "@/dbConfig/dbConfig";

interface DecodedToken {
  _id: string;
}

const SAFE_FIELDS = "-password -refreshToken -forgotPasswordToken -forgotPasswordTokenExpiry -verifyToken -verifyTokenExpiry";

// Cookie settings shared by login/signup/logout: not readable from JS, HTTPS-only in production, CSRF-resistant
export const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

const verify = (token: string) => {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret || !token) return null;
  try {
    return jwt.verify(token, secret) as DecodedToken;
  } catch {
    return null;
  }
};

export const isAdminUser = (user: { isAdmin?: boolean; role?: string } | null) =>
  !!user && user.isAdmin === true && user.role === "admin";

// Returns the logged-in user (admin cookie first, then customer cookie), or null
export const getAuthUser = async (request: NextRequest) => {
  const decoded = verify(request.cookies.get("admin_token")?.value || "") || verify(request.cookies.get("token")?.value || "");
  if (!decoded?._id) return null;
  await connectToDatabase();
  return CustomerUser.findById(decoded._id).select(SAFE_FIELDS);
};

// Use at the top of admin-only handlers: `const auth = await requireAdmin(req); if (auth instanceof NextResponse) return auth;`
export const requireAdmin = async (request: NextRequest) => {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Please log in to continue." }, { status: 401 });
  }
  if (!isAdminUser(user)) {
    return NextResponse.json({ error: "You are not allowed to do this." }, { status: 403 });
  }
  return user;
};

// Forces request values to plain strings so objects like {"$ne": null} can't be used for NoSQL injection
export const toStr = (value: unknown, maxLength = 500) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
