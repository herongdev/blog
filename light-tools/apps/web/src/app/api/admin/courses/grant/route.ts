import { cookies } from "next/headers";
import { withBasePath } from "@/lib/base-path";
import { adminCookieName, isValidAdminSession } from "@/lib/server/admin-auth";
import { grantCourseAccessByEmail } from "@/lib/server/course-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!isValidAdminSession(cookieStore.get(adminCookieName)?.value)) {
    return new Response(null, {
      status: 303,
      headers: {
        Location: withBasePath("/admin")
      }
    });
  }

  const formData = await request.formData();
  const result = await grantCourseAccessByEmail({
    email: String(formData.get("email") ?? ""),
    courseSlug: String(formData.get("courseSlug") ?? ""),
    orderId: String(formData.get("orderId") ?? ""),
    note: String(formData.get("note") ?? "")
  });

  return new Response(null, {
    status: 303,
    headers: {
      Location: withBasePath(`/admin/courses?status=${result.ok ? "granted" : result.reason}`)
    }
  });
}
