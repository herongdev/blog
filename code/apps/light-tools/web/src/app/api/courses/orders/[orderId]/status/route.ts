import { cookies } from "next/headers";
import { withBasePath } from "@/lib/base-path";
import { getCourseOrder } from "@/lib/server/course-store";
import { memberCookieName, readMemberSession } from "@/lib/server/member-auth";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const cookieStore = await cookies();
  const session = readMemberSession(cookieStore.get(memberCookieName)?.value);

  if (!session) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const order = await getCourseOrder(session.userId, orderId);
  if (!order) {
    return Response.json({ error: "not_found" }, { status: 404 });
  }

  return Response.json({
    paid: order.status === "paid",
    status: order.status,
    redirectTo: withBasePath(`/courses/${order.courseSlug}`)
  });
}
