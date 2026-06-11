import { clearAdminSessionCookie } from "@/lib/server/admin-auth";
import { withBasePath } from "@/lib/base-path";

export const runtime = "nodejs";

export async function POST() {
  return new Response(null, {
    status: 303,
    headers: {
      Location: withBasePath("/admin"),
      "Set-Cookie": clearAdminSessionCookie()
    }
  });
}
