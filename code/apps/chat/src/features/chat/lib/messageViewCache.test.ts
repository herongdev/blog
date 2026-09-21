import { expect, it } from "vitest";
import { MessageViewCache } from "./messageViewCache";
it("retains recently used choices and evicts old entries at a fixed bound", () => {
  const cache = new MessageViewCache(2);
  cache.set("first", true);
  cache.set("second", 2);
  expect(cache.get("first", false)).toBe(true);
  cache.set("third", 3);
  expect(cache.get("second", 0)).toBe(0);
  expect(cache.get("first", false)).toBe(true);
});
