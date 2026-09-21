import { describe, expect, it } from "vitest";
import { chatRequestSchema } from "../../shared/contracts/chatRequestSchema";
import {
  imageDataUrlLimit,
  supportsImages,
} from "../../shared/contracts/images";

const png = "data:image/png;base64,iVBORw0KGgo=";
const request = {
  provider: "aliyun",
  model: "qwen3-vl-plus",
  thinking: false,
  messages: [{ role: "user", content: "", images: [png] }],
};
describe("image request boundary", () => {
  it("accepts image-only user messages but rejects empty or assistant image messages", () => {
    expect(chatRequestSchema.safeParse(request).success).toBe(true);
    for (const message of [
      { role: "user", content: "" },
      { role: "assistant", content: "x", images: [png] },
    ])
      expect(
        chatRequestSchema.safeParse({ ...request, messages: [message] })
          .success,
      ).toBe(false);
  });
  it("rejects active content, remote URLs, too many images and oversized context", () => {
    for (const images of [
      ["https://example.com/image.png"],
      ["data:image/svg+xml;base64,PHN2Zz4="],
      Array(4).fill(png),
      [png + "A".repeat(imageDataUrlLimit)],
    ])
      expect(
        chatRequestSchema.safeParse({
          ...request,
          messages: [{ ...request.messages[0], images }],
        }).success,
      ).toBe(false);
    const large = "data:image/png;base64," + "A".repeat(5 * 1024 * 1024);
    expect(
      chatRequestSchema.safeParse({
        ...request,
        messages: Array(4).fill({
          role: "user",
          content: "x",
          images: [large],
        }),
      }).success,
    ).toBe(false);
  });
  it("only enables confirmed vision models", () => {
    expect(supportsImages("deepseek", "deepseek-v4-flash-vision-exp")).toBe(
      true,
    );
    expect(supportsImages("aliyun", "qwen3-vl-plus")).toBe(true);
    expect(supportsImages("aliyun", "qwen2.5-vl-72b-instruct")).toBe(true);
    expect(supportsImages("deepseek", "deepseek-v4-flash")).toBe(false);
    expect(supportsImages("aliyun", "qwen-plus")).toBe(false);
    expect(supportsImages("local", "sample")).toBe(false);
  });
});
