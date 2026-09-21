import { chooseProvider } from "./fixtures";
import { test, expect, chooseOption } from "./fixtures";
import { controlledChat } from "./controlled-chat";
import type { Page } from "@playwright/test";

async function setup(page: Page) {
  const chat = await controlledChat(page);
  await page.route("**/api/providers", (route) =>
    route.fulfill({
      json: {
        providers: [
          {
            id: "local",
            name: "本地样例",
            configured: true,
            models: ["sample"],
          },
          {
            id: "deepseek",
            name: "DeepSeek",
            configured: true,
            models: ["test-a", "deepseek-v4-flash-vision-exp"],
          },
          {
            id: "aliyun",
            name: "阿里云百炼",
            configured: true,
            models: ["qwen3-vl-plus"],
          },
        ],
      },
    }),
  );
  await page.reload();
  await chooseOption(page, "选择模型", "deepseek-v4-flash-vision-exp");
  const base64 = await page.evaluate(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 360;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#faf9fc";
    ctx.fillRect(0, 0, 640, 360);
    ctx.fillStyle = "#30313a";
    ctx.font = "24px sans-serif";
    ctx.fillText("Monthly growth", 32, 42);
    [70, 110, 170, 220].forEach((height, i) => {
      ctx.fillStyle = "#7861b6";
      ctx.fillRect(70 + i * 140, 310 - height, 64, height);
      ctx.fillStyle = "#30313a";
      ctx.fillText(String(i + 1), 90 + i * 140, 340);
    });
    return canvas.toDataURL("image/png").split(",")[1];
  });
  return {
    chat,
    base64,
    image: {
      name: "chart.png",
      mimeType: "image/png",
      buffer: Buffer.from(base64, "base64"),
    },
  };
}

test("[IMAGE] 图片草稿预览、刷新恢复、视觉模型发送及多轮历史", async ({
  page,
}) => {
  const { chat, image, base64 } = await setup(page);
  await page.locator('input[type="file"]').setInputFiles(image);
  const preview = page.getByRole("button", { name: "预览图片 chart.png" });
  await expect(preview).toBeVisible();
  await preview.click();
  const dialog = page.getByRole("dialog", { name: "预览图片 chart.png" });
  await expect(dialog.getByRole("img")).toHaveJSProperty("naturalWidth", 640);
  await dialog.getByRole("button", { name: "查看原始大小" }).click();
  await expect(
    dialog.getByRole("button", { name: "适应窗口" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(preview).toBeFocused();
  await chooseOption(page, "选择模型", "test-a");
  await expect(
    page.getByText("当前模型不支持图片，请选择视觉模型后发送。"),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "发送消息", exact: true }),
  ).toBeDisabled();

  await page.reload();
  await expect(preview).toBeVisible();
  await chooseOption(page, "选择模型", "deepseek-v4-flash-vision-exp");
  await page.getByRole("button", { name: "发送消息", exact: true }).click();
  await chat.waitForRequests(1);
  const body = (await chat.requests())[0].body;
  expect(body.messages[0]).toEqual({
    role: "user",
    content: "",
    images: [`data:image/png;base64,${base64}`],
  });
  await expect(page.getByRole("list", { name: "待发送附件" })).toHaveCount(0);
  await chat.emit(
    0,
    { type: "text", delta: "图表显示持续增长。" },
    { type: "done" },
  );
  await expect(page.getByRole("article", { name: "知序的回答" })).toContainText(
    "持续增长",
  );
  await page.getByRole("textbox", { name: "输入消息" }).fill("再解释一下");
  await page.getByRole("button", { name: "发送消息", exact: true }).click();
  await chat.waitForRequests(2);
  expect((await chat.requests())[1].body.messages[0].images).toEqual(
    body.messages[0].images,
  );
  await page.getByRole("button", { name: "停止生成", exact: true }).click();
  await page.reload();
  await expect(page.getByRole("list", { name: "已发送图片" })).toBeVisible();
  await preview.click();
  await expect(dialog.getByRole("img")).toHaveJSProperty("naturalWidth", 640);
  await dialog.getByRole("button", { name: "关闭图片预览" }).click();
});

test("[IMAGE] 聊天区拖拽和粘贴截图、删除附件、窄屏预览", async ({ page }) => {
  const { base64 } = await setup(page);
  const transfer = await page.evaluateHandle((data) => {
    const file = new File(
      [Uint8Array.from(atob(data), (c) => c.charCodeAt(0))],
      "chart.png",
      { type: "image/png" },
    );
    const dt = new DataTransfer();
    dt.items.add(file);
    return dt;
  }, base64);
  await page
    .locator("main")
    .dispatchEvent("dragenter", { dataTransfer: transfer });
  await expect(page.getByText("松开以添加图片或文件")).toBeVisible();
  await page
    .getByRole("textbox", { name: "输入消息" })
    .dispatchEvent("dragenter", { dataTransfer: transfer });
  await expect(page.getByText("松开以添加图片或文件")).toBeVisible();
  await page.locator("main").dispatchEvent("drop", { dataTransfer: transfer });
  await expect(page.getByText("松开以添加图片或文件")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "预览图片 chart.png" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "移除附件 chart.png" }).click();
  await page
    .getByRole("textbox", { name: "输入消息" })
    .evaluate((element, clipboardData) => {
      element.dispatchEvent(
        new ClipboardEvent("paste", {
          clipboardData,
          bubbles: true,
          cancelable: true,
        }),
      );
    }, transfer);
  await expect(
    page.getByRole("button", { name: "预览图片 chart.png" }),
  ).toBeVisible();
  await transfer.dispose();
  await page.screenshot({ path: "output/playwright/image-attachments.png" });
  await page.setViewportSize({ width: 375, height: 740 });
  await page.getByRole("button", { name: "预览图片 chart.png" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(375);
  await page.screenshot({ path: "output/playwright/image-preview-mobile.png" });
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "移除附件 chart.png" }).click();
  await expect(page.getByRole("list", { name: "待发送附件" })).toHaveCount(0);
});

test("[IMAGE] 错误格式、伪图片、过大图片和数量上限均保留已有草稿", async ({
  page,
}) => {
  const { image } = await setup(page);
  const input = page.locator('input[type="file"]');
  await input.setInputFiles(image);
  for (const [file, text] of [
    [
      {
        name: "unsafe.svg",
        mimeType: "image/svg+xml",
        buffer: Buffer.from("<svg/>"),
      },
      "支持 PNG",
    ],
    [
      {
        name: "fake.png",
        mimeType: "image/png",
        buffer: Buffer.from("not a real image"),
      },
      "无法读取",
    ],
    [
      {
        name: "large.png",
        mimeType: "image/png",
        buffer: Buffer.alloc(4 * 1024 * 1024 + 1),
      },
      "4 MB",
    ],
  ] as const) {
    await input.setInputFiles(file);
    await expect(page.getByRole("alert")).toContainText(text);
    await expect(
      page.getByRole("button", { name: "预览图片 chart.png" }),
    ).toBeVisible();
  }
  await input.setInputFiles([image, image, image]);
  await expect(page.getByRole("alert")).toContainText("最多添加 3 个");
  expect((await page.evaluate(() => window.__chatRuns)).length).toBe(0);
});

test("[IMAGE] 已有图片草稿切换模型保留附件，迟到的图片解码不污染新会话", async ({
  page,
}) => {
  const { image } = await setup(page);
  await page.getByRole("textbox", { name: "输入消息" }).fill("请分析图表");
  await page.locator('input[type="file"]').setInputFiles(image);
  await expect(
    page.getByRole("button", { name: "预览图片 chart.png" }),
  ).toBeVisible();
  await chooseProvider(page, "本地样例");
  await expect(
    page.getByRole("button", { name: "预览图片 chart.png" }),
  ).toBeVisible();
  await chooseProvider(page, "阿里云百炼");
  await expect(
    page.getByRole("button", { name: "预览图片 chart.png" }),
  ).toBeVisible();
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "请分析图表",
  );
  await expect(
    page.getByRole("button", { name: "发送消息", exact: true }),
  ).toBeEnabled();
  await page.evaluate(() => {
    const original = window.createImageBitmap.bind(window);
    const host = window as Window & { finishImageRead?: () => void };
    window.createImageBitmap = ((
      ...args: Parameters<typeof createImageBitmap>
    ) =>
      new Promise<ImageBitmap>((resolve) => {
        host.finishImageRead = () => {
          window.createImageBitmap = original;
          void original(...args).then(resolve);
        };
      })) as typeof createImageBitmap;
  });
  await page
    .locator('input[type="file"]')
    .setInputFiles({ ...image, name: "late.png" });
  await expect(page.getByText("正在读取附件…", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "新聊天", exact: true }).click();
  await page.evaluate(() =>
    (window as Window & { finishImageRead?: () => void }).finishImageRead?.(),
  );
  await expect(page.getByRole("list", { name: "待发送附件" })).toHaveCount(0);
  await page.getByRole("button", { name: /未发送草稿/ }).click();
  await expect(
    page.getByRole("button", { name: "预览图片 chart.png" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "预览图片 late.png" }),
  ).toHaveCount(0);
});
