import { markCourseOrderPaid } from "@/lib/server/course-store";
import { parseWechatPaymentNotification } from "@/lib/server/wechat-pay";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const transaction = await parseWechatPaymentNotification(request);

    if (transaction.trade_state === "SUCCESS") {
      await markCourseOrderPaid({
        orderId: transaction.out_trade_no,
        provider: "wechat",
        transactionId: transaction.transaction_id
      });
    }

    return Response.json({
      code: "SUCCESS",
      message: "成功"
    });
  } catch (error) {
    console.error("wechat payment notify failed", error);

    return Response.json(
      {
        code: "FAIL",
        message: "失败"
      },
      { status: 400 }
    );
  }
}
