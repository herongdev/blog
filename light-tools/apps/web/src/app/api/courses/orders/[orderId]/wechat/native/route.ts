import { cookies } from "next/headers";
import { withBasePath } from "@/lib/base-path";
import {
  attachWechatNativePayment,
  getCourseOrder,
  setCourseOrderPaymentError
} from "@/lib/server/course-store";
import { memberCookieName, readMemberSession } from "@/lib/server/member-auth";
import { createWechatNativePayment, getWechatPayRuntimeStatus } from "@/lib/server/wechat-pay";

export const runtime = "nodejs";

export async function POST(_request: Request, { params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const cookieStore = await cookies();
  const session = readMemberSession(cookieStore.get(memberCookieName)?.value);

  if (!session) {
    return new Response(null, {
      status: 303,
      headers: {
        Location: withBasePath(`/courses/login?redirectTo=/courses/orders/${orderId}`)
      }
    });
  }

  const order = await getCourseOrder(session.userId, orderId);
  if (!order) {
    return new Response(null, {
      status: 303,
      headers: {
        Location: withBasePath("/courses/me")
      }
    });
  }

  if (order.status === "paid") {
    return new Response(null, {
      status: 303,
      headers: {
        Location: withBasePath(`/courses/${order.courseSlug}`)
      }
    });
  }

  if (order.wechatCodeUrl) {
    return new Response(null, {
      status: 303,
      headers: {
        Location: withBasePath(`/courses/orders/${order.id}?payment=wechat`)
      }
    });
  }

  if (!getWechatPayRuntimeStatus().ready) {
    return new Response(null, {
      status: 303,
      headers: {
        Location: withBasePath(`/courses/orders/${order.id}?payment=manual`)
      }
    });
  }

  try {
    const payment = await createWechatNativePayment(order);
    await attachWechatNativePayment({
      orderId: order.id,
      codeUrl: payment.codeUrl,
      prepayId: payment.prepayId
    });

    return new Response(null, {
      status: 303,
      headers: {
        Location: withBasePath(`/courses/orders/${order.id}?payment=wechat`)
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    await setCourseOrderPaymentError(order.id, message);

    return new Response(null, {
      status: 303,
      headers: {
        Location: withBasePath(`/courses/orders/${order.id}?payment=wechat_error`)
      }
    });
  }
}
