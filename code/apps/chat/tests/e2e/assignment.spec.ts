import { readFileSync } from "node:fs";
import { test, expect, startSample, waitForAnswer, send } from "./fixtures";
import { controlledChat } from "./controlled-chat";
import type { SampleEnvelope } from "../../src/features/chat/services/localReplay";

const sample: SampleEnvelope[] = JSON.parse(
  readFileSync(
    new URL("../../public/data/sample.json", import.meta.url),
    "utf8",
  ),
);

test("[REQ-ACTIVITY] 原附件的两段思考与一次工具调用可展开阅读、收起且不丢正文", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await startSample(page);
  await waitForAnswer(page);
  const answer = page.getByRole("article", { name: "知序的回答" });
  const toggle = answer.locator("[data-activity-toggle]");
  const content = answer.locator("[data-markdown]");
  const bodyBefore = await content.textContent();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(
    answer.getByText("找到 10 份相关资料", { exact: true }),
  ).toBeHidden();
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(answer.getByText(/^思考\s*已完成$/)).toHaveCount(2);
  await expect(answer.getByText(/^搜索资料\s*已完成$/)).toBeVisible();
  await expect(
    answer.getByText("找到 10 份相关资料", { exact: true }),
  ).toBeVisible();
  await expect(answer.getByText("已完成", { exact: true })).toHaveCount(3);
  const thoughts = new Map<number, string>();
  for (const { data } of sample)
    if (data.event === "reasoning_content")
      thoughts.set(
        data.index!,
        (thoughts.get(data.index!) ?? "") + data.content,
      );
  for (const text of thoughts.values())
    await expect(answer.getByText(text.trim(), { exact: true })).toBeVisible();
  await toggle.scrollIntoViewIfNeeded();
  await expect(toggle).toBeInViewport();
  await testInfo.attach("任务书-活动过程", {
    body: await page.screenshot(),
    contentType: "image/png",
  });
  await toggle.click();
  await expect(answer.getByText(/^搜索资料\s*已完成$/)).toBeHidden();
  expect(await content.textContent()).toBe(bodyBefore);
  await expect(page.getByRole("article", { name: "你的消息" })).toHaveText(
    "甲硝唑是什么？",
  );
});

test("[REQ-REF-UI] 附件全部 16 处引用按 ID 显示对应资料，多标签前后翻页且边界不越界", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await startSample(page);
  await waitForAnswer(page);
  const answer = page.getByRole("article", { name: "知序的回答" });
  const badges = answer.locator("[data-citation]");
  const rawText = sample
    .filter((e) => e.data.event === "content")
    .map((e) => e.data.content)
    .join("");
  const groups = [...rawText.matchAll(/\[(?:\[\d+_\d+\])+\]/g)].map((match) =>
    match[0].match(/\d+_\d+/g)!,
  );
  const originals = sample
    .filter((e) => e.data.event === "reference")
    .flatMap((e) => e.data.reference ?? []);
  await expect(badges).toHaveCount(16);
  await expect(answer.locator("[data-markdown]")).not.toContainText("[[1_");
  for (const [index, ids] of groups.entries()) {
    await test.step(`第 ${index + 1} 组：${ids.join(",")}`, async () => {
      const badge = badges.nth(index);
      await badge.click();
      await expect(badge).toHaveAttribute("data-citation-open", "true");
      const popup = page.getByRole("dialog");
      const previous = popup.getByRole("button", { name: "上一个来源" });
      const next = popup.getByRole("button", { name: "下一个来源" });
      if (ids.length > 1) {
        await expect(previous).toHaveAttribute("aria-disabled", "true");
        await previous.press("Enter");
        await expect(popup).toContainText(`1/${ids.length}`);
      } else await expect(next).toHaveCount(0);
      for (const [position, id] of ids.entries()) {
        const ref = originals.find((r) => r.id === id)!;
        if (position) await next.click();
        await expect(popup.getByText(ref.title, { exact: true })).toBeVisible();
        await expect(popup).toContainText(new URL(ref.link).hostname);
        await expect(
          popup.getByRole("link", { name: "查看原文" }),
        ).toHaveAttribute("href", ref.link);
        const excerpt = ref.content
          .replace(/\$P\$/g, "\n")
          .replace(/\\n/g, "\n")
          .replace(/\u200b/g, "")
          .trim();
        await expect(popup.getByText(excerpt, { exact: true })).toBeVisible();
      }
      if (ids.length > 1) {
        await expect(next).toHaveAttribute("aria-disabled", "true");
        await next.press("Enter");
        await expect(popup).toContainText(`${ids.length}/${ids.length}`);
        if (index === 0)
          await testInfo.attach("任务书-多来源引用", {
            body: await page.screenshot(),
            contentType: "image/png",
          });
        await previous.click();
        await expect(popup).toContainText(`${ids.length - 1}/${ids.length}`);
      }
      await page.keyboard.press("Escape");
      await expect(popup).toBeHidden();
    });
  }
  await answer.getByRole("button", { name: "10 个来源", exact: true }).click();
  for (const ref of originals)
    await expect(
      answer.getByRole("link", {
        name: new RegExp(ref.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      }),
    ).toHaveAttribute("href", ref.link);
});

test("[REQ-STATES] 等待、思考、工具执行、主动停止状态可见，生成中不能重复发送", async ({
  page,
}) => {
  const stream = await controlledChat(page);
  const input = page.getByRole("textbox", { name: "输入消息" });
  await input.fill(" \n ");
  await expect(page.getByRole("button", { name: "发送消息" })).toBeDisabled();
  await input.press("Enter");
  expect(await stream.requests()).toHaveLength(0);
  await send(page, "**用户输入应保持原文**");
  await stream.waitForRequests(1);
  const user = page.getByRole("article", { name: "你的消息" });
  const answer = page.getByRole("article", { name: "知序的回答" });
  await expect(user).toHaveText("**用户输入应保持原文**");
  await expect(user.locator("strong")).toHaveCount(0);
  await expect(answer.getByText("正在连接", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "停止生成" })).toBeEnabled();
  await expect(page.getByRole("combobox", { name: "选择模型" })).toBeDisabled();
  await stream.emit(0, {
    type: "reasoning",
    id: "r",
    delta: "正在分析当前问题",
  });
  const toggle = answer.locator("[data-activity-toggle]");
  await expect(toggle).toContainText("正在思考");
  await toggle.click();
  await expect(
    answer.getByText("正在分析当前问题", { exact: true }),
  ).toBeVisible();
  await expect(answer.getByText("进行中", { exact: true })).toHaveCount(1);
  await stream.emit(0, {
    type: "tool",
    id: "t",
    title: "搜索资料",
    content: "正在搜索任务资料",
    status: "running",
  });
  await expect(toggle).toContainText("正在搜索资料");
  await expect(answer.getByText("已完成", { exact: true })).toHaveCount(1);
  await expect(answer.getByText("进行中", { exact: true })).toHaveCount(1);
  await input.fill("下一条草稿");
  await input.press("Enter");
  await expect(input).toHaveValue("下一条草稿");
  expect(await stream.requests()).toHaveLength(1);
  await page.getByRole("button", { name: "停止生成" }).click();
  expect(
    await stream.requests(),
    "停止动作不能顺带提交输入框中的下一条草稿",
  ).toHaveLength(1);
  await expect(input).toHaveValue("下一条草稿");
  await expect(answer.getByText("已停止生成", { exact: true })).toBeVisible();
  await expect(answer.getByText("已停止", { exact: true })).toHaveCount(1);
  await expect(answer.getByText("进行中", { exact: true })).toHaveCount(0);
  await expect(toggle).toContainText("活动过程");
  await expect(page.getByRole("button", { name: "停止生成" })).toBeHidden();
  await expect(page.getByRole("button", { name: "发送消息" })).toBeEnabled();
  await expect(page.getByRole("combobox", { name: "选择模型" })).toBeEnabled();
  await stream.emit(0, { type: "text", delta: "晚到数据" }, { type: "done" });
  await expect
    .poll(async () => (await stream.requests())[0].cancelled)
    .toBe(true);
  await expect(answer).not.toContainText("晚到数据");
  await input.press("Enter");
  await stream.waitForRequests(2);
  await stream.emit(1, { type: "text", delta: "恢复正常" }, { type: "done" });
  await waitForAnswer(page);
  await expect(page.locator("[data-markdown]")).toHaveText("恢复正常");
});
