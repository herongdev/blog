import type { Page } from "@playwright/test";
import {
  test,
  expect,
  chooseOption,
  chooseProvider,
  openPreferences,
} from "./fixtures";
import { controlledChat } from "./controlled-chat";

const textModel = "deepseek-v4-flash";
const visionModel = "deepseek-v4-flash-vision-exp";
async function setup(page: Page) {
  await controlledChat(page, [textModel, visionModel]);
  const base64 = await page.evaluate(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 16;
    canvas.getContext("2d")!.fillRect(0, 0, 16, 16);
    return canvas.toDataURL("image/png").split(",")[1];
  });
  return {
    name: "chart.png",
    mimeType: "image/png",
    buffer: Buffer.from(base64, "base64"),
  };
}

test("[ATTACHMENT-CAPABILITY] 选择前说明限制，文件选择、拖拽和粘贴共用模型能力校验", async ({
  page,
}) => {
  const image = await setup(page);
  let chooserCount = 0;
  page.on("filechooser", () => {
    chooserCount++;
  });
  const draft = page.getByRole("textbox", { name: "输入消息" });
  await draft.fill("保留我的问题");
  const tools = page.getByRole("button", {
    name: "添加附件和工具",
    exact: true,
  });
  await tools.click();
  const images = page.getByRole("menuitem", { name: "添加图片", exact: true });
  const texts = page.getByRole("menuitem", {
    name: "添加文本文件",
    exact: true,
  });
  await expect(texts).toHaveAttribute("aria-disabled", "false");
  await expect(images).toHaveAttribute("aria-disabled", "true");
  await images.hover();
  await expect(page.getByRole("tooltip")).toContainText("请切换到视觉模型");
  // aria-disabled blocks activation, but physical clicks still reveal its explanation.
  await images.click({ force: true });
  await expect(images).toBeFocused();
  await expect(images).toHaveAccessibleDescription(
    "当前模型不支持图片，请切换到视觉模型。",
  );
  await expect(page.getByRole("tooltip")).toBeVisible();
  expect(chooserCount).toBe(0);
  await page.keyboard.press("Escape");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("menu", { name: "添加附件和工具" })).toHaveCount(
    0,
  );
  const input = page.locator('input[type="file"]');
  await expect(input).toHaveAttribute("accept", ".txt,.md,.json");
  await page.evaluate(() => {
    const original = File.prototype.arrayBuffer;
    const host = window as Window & { fileReads?: number };
    host.fileReads = 0;
    File.prototype.arrayBuffer = function () {
      host.fileReads = (host.fileReads ?? 0) + 1;
      return original.call(this);
    };
  });
  // Bypassing the OS picker filter must still reject before decoding the file.
  await input.setInputFiles(image);
  await expect(page.getByRole("alert")).toContainText("请切换到视觉模型");
  const transfer = await page.evaluateHandle((base64) => {
    const data = new DataTransfer();
    data.items.add(
      new File(
        [Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))],
        "chart.png",
        { type: "image/png" },
      ),
    );
    return data;
  }, image.buffer.toString("base64"));
  await page
    .locator("main")
    .dispatchEvent("dragenter", { dataTransfer: transfer });
  await expect(
    page.getByRole("status").filter({ hasText: "请切换到视觉模型" }),
  ).toBeVisible();
  await page.locator("main").dispatchEvent("drop", { dataTransfer: transfer });
  await draft.evaluate(
    (element, data) =>
      element.dispatchEvent(
        new ClipboardEvent("paste", {
          clipboardData: data,
          bubbles: true,
          cancelable: true,
        }),
      ),
    transfer,
  );
  await transfer.dispose();
  await expect(page.getByRole("list", { name: "待发送附件" })).toHaveCount(0);
  await expect(draft).toHaveValue("保留我的问题");
  expect(
    await page.evaluate(
      () => (window as Window & { fileReads?: number }).fileReads,
    ),
  ).toBe(0);
  await chooseOption(page, "选择模型", visionModel);
  await tools.click();
  await expect(images).toHaveAttribute("aria-disabled", "false");
  const choosing = page.waitForEvent("filechooser");
  await images.click();
  await expect(input).toHaveAttribute("accept", ".png,.jpg,.jpeg,.webp");
  await (await choosing).setFiles(image);
  await expect(
    page.getByRole("button", { name: "预览图片 chart.png" }),
  ).toBeVisible();
});

test("[ATTACHMENT-CAPABILITY-UI] 本地模式禁用附件，手机深色英文可点击查看原因，容量限制不丢草稿", async ({
  page,
}) => {
  await setup(page);
  await chooseProvider(page, "本地样例");
  const preferences = await openPreferences(page);
  await preferences
    .getByRole("radio", { name: "English", exact: true })
    .check();
  await preferences.getByRole("radio", { name: "Dark", exact: true }).check();
  await preferences.getByRole("button", { name: "Done", exact: true }).click();
  await page.setViewportSize({ width: 320, height: 740 });
  const tools = page.getByRole("button", {
    name: "Add attachments and tools",
    exact: true,
  });
  await tools.click();
  for (const name of ["Add text file", "Add image"]) {
    const item = page.getByRole("menuitem", { name, exact: true });
    await expect(item).toHaveAttribute("aria-disabled", "true");
    await item.click({ force: true });
    await expect(page.getByRole("tooltip")).toContainText(
      "Select a model first",
    );
  }
  await expect
    .poll(async () => {
      const box = await page.getByRole("tooltip").boundingBox();
      return (
        !!box &&
        box.x >= 0 &&
        box.y >= 0 &&
        box.x + box.width <= 320 &&
        box.y + box.height <= 740
      );
    })
    .toBe(true);
  await page.screenshot({
    path: "output/playwright/attachments-disabled-mobile.png",
    animations: "disabled",
  });
  await page.keyboard.press("Escape");
  await page.keyboard.press("Escape");
  await chooseProvider(page, "DeepSeek");
  await page.locator('input[type="file"]').setInputFiles(
    [1, 2, 3].map((n) => ({
      name: `${n}.txt`,
      mimeType: "text/plain",
      buffer: Buffer.from("Keep this draft"),
    })),
  );
  await expect(
    page.getByRole("list", { name: "Attached files" }),
  ).toContainText("3.txt");
  await tools.click();
  const text = page.getByRole("menuitem", {
    name: "Add text file",
    exact: true,
  });
  await expect(text).toHaveAttribute("aria-disabled", "true");
  await text.click({ force: true });
  await expect(page.getByRole("tooltip")).toContainText("up to 3");
});

test("[ATTACHMENT-CAPABILITY-RACE] 读取期间换成文本模型，迟到解码不写入当前草稿", async ({
  page,
}) => {
  const image = await setup(page);
  await chooseOption(page, "选择模型", visionModel);
  await page.getByRole("textbox", { name: "输入消息" }).fill("保留草稿");
  await page.evaluate(() => {
    const original = window.createImageBitmap.bind(window);
    window.createImageBitmap = ((
      ...args: Parameters<typeof createImageBitmap>
    ) =>
      new Promise<ImageBitmap>((resolve) => {
        (window as Window & { finishImage?: () => Promise<void> }).finishImage =
          async () => {
            window.createImageBitmap = original;
            resolve(await original(...args));
          };
      })) as typeof createImageBitmap;
  });
  await page.locator('input[type="file"]').setInputFiles(image);
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          typeof (window as Window & { finishImage?: () => Promise<void> })
            .finishImage,
      ),
    )
    .toBe("function");
  await chooseOption(page, "选择模型", textModel);
  await page.evaluate(() =>
    (window as Window & { finishImage?: () => Promise<void> }).finishImage?.(),
  );
  await expect(page.getByRole("alert")).toContainText("模型已切换");
  await expect(page.getByRole("list", { name: "待发送附件" })).toHaveCount(0);
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "保留草稿",
  );
});
