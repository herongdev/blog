import { cookies } from "next/headers";
import { withBasePath } from "@/lib/base-path";
import { createCourseOrder, hasCourseAccess } from "@/lib/server/course-store";
import { memberCookieName, readMemberSession } from "@/lib/server/member-auth";
import { getWechatPayRuntimeStatus } from "@/lib/server/wechat-pay";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = readMemberSession(cookieStore.get(memberCookieName)?.value);
  const formData = await request.formData();
  const courseSlug = String(formData.get("courseSlug") ?? "");

  if (!session) {
    return new Response(null, {
      status: 303,
      headers: {
        Location: withBasePath(`/courses/login?redirectTo=/courses/${encodeURIComponent(courseSlug)}`)
      }
    });
  }

  if (await hasCourseAccess(session.userId, courseSlug)) {
    return new Response(null, {
      status: 303,
      headers: {
        Location: withBasePath(`/courses/${courseSlug}`)
      }
    });
  }

  const paymentProvider = getWechatPayRuntimeStatus().ready ? "wechat" : "manual";
  const order = await createCourseOrder(session.userId, courseSlug, paymentProvider);
  if (!order) {
    return new Response(null, {
      status: 303,
      headers: {
        Location: withBasePath("/courses")
      }
    });
  }

  return new Response(null, {
    status: 303,
    headers: {
      Location: withBasePath(`/courses/orders/${order.id}`)
    }
  });
}
