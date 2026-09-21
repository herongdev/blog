import { defineConfig } from "vitest/config";
import { sourceAliases } from "./vite.config.ts";

export default defineConfig({
  oxc: { decorator: { legacy: true } },
  resolve: { alias: sourceAliases },
  test: {
    include: [
      "src/**/*.test.{ts,tsx}",
      "tests/integration/**/*.test.ts",
      "tests/architecture/**/*.test.mjs",
    ],
    environment: "node",
  },
});
