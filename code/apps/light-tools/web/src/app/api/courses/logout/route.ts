import { withBasePath } from "@/lib/base-path";
import { clearMemberSessionCookie } from "@/lib/server/member-auth";

export const runtime = "nodejs";

export async function POST() {
  return new Response(null, {
    status: 303,
    headers: {
      Location: withBasePath("/courses"),
      "Set-Cookie": clearMemberSessionCookie()
    }
  });
}
