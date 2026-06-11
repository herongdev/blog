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
    return new Response(null, {
      status: 303,
      headers: {
        Location: withBasePath("/admin?error=config")
      }
    });
  }

  if (!verifyAdminPassword(password)) {
    return new Response(null, {
      status: 303,
      headers: {
        Location: withBasePath("/admin?error=invalid")
      }
    });
  }

  return new Response(null, {
    status: 303,
    headers: {
      Location: withBasePath("/admin/stats"),
      "Set-Cookie": buildAdminSessionCookie()
    }
  });
}
