import {
  test,
  expect,
  chooseReplayOption,
  send,
  waitForAnswer,
} from "./fixtures";

for (const body of ["[null]", '{"broken":']) {
  test(`[SAMPLE-VALIDATION] 损坏样例受控报错，恢复后重试：${body}`, async ({
    page,
  }) => {
    await page.route("**/data/sample.json", (route) =>
      route.fulfill({ contentType: "application/json", body }),
    );
    await page.goto("/");
    await chooseReplayOption(page, "回放速度", "4× 回放");
    await send(page, "甲硝唑是什么？");
    await expect(page.getByRole("alert")).toHaveText("本地样例格式不正确。");
    await expect(
      page.getByRole("button", { name: "停止生成", exact: true }),
    ).toHaveCount(0);
    await page.unroute("**/data/sample.json");
    await page.getByRole("button", { name: "重新生成", exact: true }).click();
    await waitForAnswer(page);
    await expect(page.getByRole("article", { name: "你的消息" })).toHaveCount(
      1,
    );
    await expect(page.locator("[data-citation]")).toHaveCount(16);
    await expect(page.getByRole("alert")).toHaveCount(0);
  });
}
