import { chooseReplayOption } from "./fixtures";
import { openModelSettings } from "./fixtures";
import { test, expect, send, waitForAnswer } from "./fixtures";
import { controlledChat } from "./controlled-chat";

test("[APP-CONFIG-002] 配置响应缺字段时保留本地模式，重新检查后能恢复", async ({
  page,
}) => {
  await page.route("**/api/providers", (route) =>
    route.fulfill({ json: { providers: [] } }),
  );
  await page.goto("/");
  await openModelSettings(page);
  const settings = page.getByRole("dialog");
  await expect(settings.getByRole("alert")).toContainText(
    "模型配置数据格式异常",
  );
  await settings.getByRole("button", { name: "完成", exact: true }).click();
  await chooseReplayOption(page, "本地演示场景", "空结果");
  await send(page, "配置异常时仍可本地回放");
  await waitForAnswer(page);
  await expect(
    page.getByText("没有收到回答，请重新尝试。", { exact: true }),
  ).toBeVisible();
  await page.unroute("**/api/providers");
  await openModelSettings(page);
  await settings.getByRole("button", { name: "重新检查" }).click();
  await expect(settings.getByRole("alert")).toHaveCount(0);
  await expect(settings.getByText("待配置", { exact: true })).toHaveCount(2);
});

test("[APP-NET-002] 未完成的流断开后保留部分答案，重试正常完成", async ({
  page,
}) => {
  const stream = await controlledChat(page);
  await send(page, "模拟连接中断");
  await stream.waitForRequests(1);
  await stream.emit(0, { type: "text", delta: "断线前收到的内容" });
  await stream.end(0);
  await expect(page.getByRole("alert")).toContainText("中断");
  await expect(page.locator("[data-markdown]")).toHaveText("断线前收到的内容");
  await expect(page.getByRole("button", { name: "停止生成" })).toBeHidden();
  await page.getByRole("button", { name: "重新生成" }).click();
  await stream.waitForRequests(2);
  await stream.emit(
    1,
    { type: "text", delta: "重试后的完整答案" },
    { type: "done" },
  );
  await waitForAnswer(page);
  await expect(page.getByRole("alert")).toHaveCount(0);
  await expect(page.locator("[data-markdown]")).toHaveText("重试后的完整答案");
});
