import { describe, expect, it } from "vitest";
import { restoreConversation, storedConversationSchema } from "./persistedChat";

function record() {
  return {
    version: 1,
    id: "chat",
    revision: "rev",
    updatedAt: 2000,
    conversation: {
      id: "chat",
      title: "历史",
      provider: "local",
      model: "sample",
      draft: "未发送\n草稿",
      messages: [
        {
          id: "m",
          role: "assistant",
          content: "**原始 Markdown [[1_0]]",
          status: "streaming",
          createdAt: 1000,
          activities: [
            {
              id: "a",
              kind: "reasoning",
              title: "思考",
              content: "收到的推理",
              status: "running",
            },
          ],
          references: {
            "1_0": {
              id: "1_0",
              title: "资料",
              content: "来源正文",
              link: "https://example.com",
            },
          },
        },
      ],
    },
  };
}

describe("persisted chat recovery", () => {
  it("恢复原始正文、来源和草稿，生成状态转为可重试的中断状态", () => {
    const source = record();
    const before = structuredClone(source);
    const chat = restoreConversation(storedConversationSchema.parse(source));
    expect(chat).toMatchObject({ draft: "未发送\n草稿", hasDraft: true });
    expect(chat.messages[0]).toMatchObject({
      content: source.conversation.messages[0].content,
      status: "stopped",
      interrupted: true,
      finishedAt: 2000,
      activities: [{ status: "stopped", content: "收到的推理" }],
      references: source.conversation.messages[0].references,
    });
    expect(source).toEqual(before);
  });
  it.each(["complete", "stopped", "empty", "error"])(
    "保留已有终态 %s",
    (status) => {
      const source = record();
      source.conversation.messages[0].status = status;
      const restored = restoreConversation(
        storedConversationSchema.parse(source),
      );
      expect(restored.messages[0].status).toBe(status);
      expect(restored.messages[0].interrupted).toBeUndefined();
    },
  );
  it("拒绝未知版本、损坏角色、重复消息和记录身份不一致", () => {
    const source = record();
    expect(
      storedConversationSchema.safeParse({ ...source, version: 2 }).success,
    ).toBe(false);
    expect(
      storedConversationSchema.safeParse({ ...source, id: "another" }).success,
    ).toBe(false);
    source.conversation.messages.push(source.conversation.messages[0]);
    expect(storedConversationSchema.safeParse(source).success).toBe(false);
    source.conversation.messages = [
      { ...source.conversation.messages[0], role: "admin" },
    ];
    expect(storedConversationSchema.safeParse(source).success).toBe(false);
  });
  it("只恢复白名单字段，附件草稿也保持历史入口", () => {
    const source = record();
    const parsed = storedConversationSchema.parse({
      ...source,
      secret: "not-a-real-key",
      conversation: {
        ...source.conversation,
        draft: "",
        hasDraft: false,
        apiKey: "not-a-real-key",
        attachments: [{ id: "file", name: "notes.txt", content: "内容" }],
      },
    });
    expect(parsed).not.toHaveProperty("secret");
    expect(parsed.conversation).not.toHaveProperty("apiKey");
    expect(restoreConversation(parsed).hasDraft).toBe(true);
  });
});
