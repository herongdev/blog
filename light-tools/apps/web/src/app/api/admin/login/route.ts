import { NextResponse } from "next/server";
import {
  buildAdminSessionCookie,
  isAdminConfigured,
  verifyAdminPassword
} from "@/lib/server/admin-auth";
import { withBasePath } from "@/lib/base-path";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");

  if (!isAdminConfigured()) {
    return NextResponse.redirect(new URL(withBasePath("/admin?error=config"), request.url), 303);
  }

  if (!verifyAdminPassword(password)) {
    return NextResponse.redirect(new URL(withBasePath("/admin?error=invalid"), request.url), 303);
  }

  return NextResponse.redirect(new URL(withBasePath("/admin/stats"), request.url), {
    status: 303,
    headers: {
      "Set-Cookie": buildAdminSessionCookie()
    }
  });
}
