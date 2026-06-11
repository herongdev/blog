import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/lib/server/admin-auth";
import { withBasePath } from "@/lib/base-path";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return NextResponse.redirect(new URL(withBasePath("/admin"), request.url), {
    status: 303,
    headers: {
      "Set-Cookie": clearAdminSessionCookie()
    }
  });
}
