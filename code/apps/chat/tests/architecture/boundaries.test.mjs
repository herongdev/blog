import { ESLint } from "eslint";
import { describe, expect, it } from "vitest";

const eslint = new ESLint();
async function rules(filePath, code) {
  const [result] = await eslint.lintText(code, { filePath });
  expect(result.fatalErrorCount).toBe(0);
  return result.messages.map((message) => message.ruleId);
}

describe("module boundaries", () => {
  it.each([
    ["src/i18n/translate.ts", 'import "@/features/chat/types";'],
    [
      "src/preferences/PreferencesProvider.tsx",
      'import "@/app/useChatWorkspace";',
    ],
    ["src/components/Select/Select.tsx", 'import "@/features/chat/types";'],
    ["src/components/Select/Select.tsx", 'import "@/app/useChatWorkspace";'],
    ["src/app/App.tsx", 'import "@/features/chat/components/MessageItem";'],
    [
      "src/app/App.tsx",
      'export * from "../features/chat/state/chatReducer.ts";',
    ],
    [
      "src/features/chat/hooks/useChat.ts",
      'import "../../model-settings/hooks/useProviders";',
    ],
    ["src/features/chat/hooks/useChat.ts", 'import "@/app/useChatWorkspace";'],
    ["src/hooks/useClipboard.ts", 'import("@/features/chat/hooks/useChat");'],
    ["shared/contracts/chat.ts", 'import "../../src/features/chat/types";'],
    [
      "src/app/App.tsx",
      'import "../../server/model-providers/providers.config";',
    ],
    ["server/app.ts", 'import "../src/features/chat/types";'],
    ["src/features/chat/lib/chatHistory.ts", 'import "react";'],
    [
      "src/features/chat/state/chatReducer.ts",
      'import "../services/streamChat";',
    ],
    [
      "src/features/chat/components/MessageItem.tsx",
      'import "../services/remoteChat";',
    ],
    [
      "src/features/chat/components/MessageItem.tsx",
      'import "@vendor/remend/index";',
    ],
    ["src/app/App.tsx", 'import "node:fs";'],
    ["shared/async/abortableDelay.ts", 'import "fs/promises";'],
    ["src/app/App.tsx", 'const target = "./dynamic"; import(target);'],
    ["src/app/App.tsx", 'import "@nestjs/common";'],
    ["shared/contracts/chat.ts", 'import "@nestjs/common";'],
    ["server/chat/chat.service.ts", 'import type { Response } from "express";'],
    ["server/chat/chat.service.ts", 'import "../http/sse";'],
    ["server/chat/chat.service.ts", 'import "../app";'],
    ["server/http/sse.ts", 'import "../chat/chat.service";'],
    ["server/common/stream-error.ts", 'import "../http/sse";'],
    ["server/model-providers/upstream.ts", 'import "../chat/chat.policy";'],
    ["server/chat/chat.service.ts", 'import "../model-providers/upstream";'],
  ])("rejects forbidden dependency from %s: %s", async (file, code) => {
    expect(await rules(file, code)).toContain("architecture/boundaries");
  });

  it.each([
    ["src/features/chat/components/Composer.tsx", 'import "@/i18n/useI18n";'],
    ["src/preferences/PreferencesProvider.tsx", 'import "@/i18n/useI18n";'],
    ["src/app/App.tsx", 'import "@/features/chat/hooks/useChat";'],
    [
      "src/features/chat/components/Composer.tsx",
      'import "@/components/Select/Select";',
    ],
    ["src/components/Select/Select.tsx", 'import "@/styles/overlayGeometry";'],
    [
      "src/features/chat/components/MessageItem.tsx",
      'import("./MarkdownContent");',
    ],
    [
      "src/features/chat/components/CodeBlock.tsx",
      'import "@/hooks/useClipboard";',
    ],
    [
      "src/features/chat/services/remoteChat.ts",
      'import "@shared/transport/sse";',
    ],
    [
      "src/features/chat/lib/streamingMarkdown.ts",
      'import "@vendor/remend/index";',
    ],
    ["server/app.ts", 'import "../shared/contracts/chat";'],
    ["server/app.module.ts", 'import "./chat/chat.module";'],
    [
      "server/chat/chat.module.ts",
      'import "../model-providers/model-providers.module";',
    ],
    [
      "server/chat/chat.service.ts",
      'import "../model-providers/model-providers.service";',
    ],
    ["server/chat/chat.controller.ts", 'import "../http/sse";'],
    ["server/model-providers/upstream.ts", 'import "../common/stream-error";'],
  ])("allows intended dependency from %s: %s", async (file, code) => {
    expect(await rules(file, code)).toEqual([]);
  });

  it.each([
    ["src/app/App.tsx", "process.cwd();"],
    ["server/app.ts", "document.createElement('div');"],
    ["shared/contracts/chat.ts", "localStorage.clear();"],
    ["src/features/chat/components/Composer.tsx", "fetch('/api/chat');"],
  ])(
    "rejects globals outside the assigned environment in %s",
    async (file, code) => {
      expect(await rules(file, code)).toContain("no-restricted-globals");
    },
  );
});
