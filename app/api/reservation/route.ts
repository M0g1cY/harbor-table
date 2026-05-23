import { NextRequest, NextResponse } from "next/server";
import { reservationSchema } from "@/lib/reservationSchema";
import { z } from "zod";

/**
 * Rate limiter - in-memory Map for demo purposes.
 * Production: use Redis / Vercel KV / Upstash.
 *
 * Key: IP address
 * Value: timestamp of last submission
 */
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 60 seconds

/**
 * Server-side reservation schema with optional honeypot field.
 * Honeypot: if filled, silently accept but don't process.
 */
const serverReservationSchema = reservationSchema.extend({
  website: z.string().optional(), // honeypot field
});

type ServerReservationData = z.infer<typeof serverReservationSchema>;

/**
 * Get client IP from request headers.
 * Vercel provides x-forwarded-for, fallback to x-real-ip.
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  return "unknown";
}

/**
 * Check rate limit for given IP.
 * Returns true if rate limit exceeded.
 */
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const lastSubmission = rateLimitMap.get(ip);

  if (lastSubmission && now - lastSubmission < RATE_LIMIT_WINDOW_MS) {
    return true;
  }

  rateLimitMap.set(ip, now);
  return false;
}

/**
 * POST /api/reservation
 *
 * Accepts reservation form data, validates server-side, logs to console.
 * Does NOT send email (Phase 4B scope: pseudo-backend only).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Server-side Zod validation
    const parseResult = serverReservationSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid form data",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data: ServerReservationData = parseResult.data;

    // 2. Honeypot check - if filled, silently accept (bot trap)
    if (data.website && data.website.trim() !== "") {
      console.log("[Reservation API] Honeypot triggered, likely bot:", {
        ip: getClientIP(request),
        honeypot: data.website,
      });
      // Return success to avoid revealing anti-bot logic
      return NextResponse.json({ success: true });
    }

    // 3. Rate limit check
    const clientIP = getClientIP(request);
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please wait a moment before submitting again.",
        },
        { status: 429 }
      );
    }

    // 4. Log reservation to console (Phase 4B: no email)
    console.log("[Reservation API] New reservation received:", {
      timestamp: new Date().toISOString(),
      ip: clientIP,
      data: {
        name: data.name,
        email: data.email,
        date: data.date,
        guests: data.guests,
        notes: data.notes || "(none)",
      },
    });

    // 5. Return success
    return NextResponse.json({
      success: true,
      message: "Reservation request received. We'll contact you shortly.",
    });
  } catch (error) {
    console.error("[Reservation API] Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
