import { NextRequest, NextResponse } from "next/server";

// Simple in-memory limiter to slow down brute-force and spam on auth endpoints.
// It is per server instance; for multi-instance hosting, back it with Redis/Upstash.
const hits = new Map<string, { count: number; resetAt: number }>();

export const getClientIp = (request: NextRequest) =>
  request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";

export const rateLimit = (request: NextRequest, key: string, limit: number, windowMs: number) => {
  const now = Date.now();
  const id = `${key}:${getClientIp(request)}`;
  const entry = hits.get(id);

  if (!entry || entry.resetAt < now) {
    hits.set(id, { count: 1, resetAt: now + windowMs });
    if (hits.size > 10000) {
      for (const [k, v] of hits) if (v.resetAt < now) hits.delete(k);
    }
    return null;
  }

  entry.count++;
  if (entry.count > limit) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }
  return null;
};
