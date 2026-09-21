import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import hooks from "eslint-plugin-react-hooks";
import architecture from "./scripts/eslint/architecture.mjs";

const serverFiles = ["server/**/*.ts", "scripts/**/*.mjs", "*.config.{js,ts}"];
const testFiles = ["tests/**/*.{ts,mjs}", "src/**/*.test.{ts,tsx}"];
const browserOnly = [
  "window",
  "document",
  "navigator",
  "localStorage",
  "sessionStorage",
];
const nodeOnly = [
  "process",
  "Buffer",
  "global",
  "require",
  "module",
  "__dirname",
  "__filename",
];
const forbid = (names) =>
  names.map((name) => ({
    name,
    message: "此全局对象不属于当前运行环境，请通过正确的模块边界访问。",
  }));

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "output/**",
      ".playwright-cli/**",
      "third_party/**",
      "local-docs/**",
      "docs/开源学习/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: { tsconfigRootDir: import.meta.dirname },
    },
    plugins: { "react-hooks": hooks, architecture },
    rules: {
      "architecture/boundaries": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: { globals: globals.browser },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-restricted-globals": ["error", ...forbid(nodeOnly)],
    },
  },
  {
    files: serverFiles,
    languageOptions: { globals: globals.node },
    rules: { "no-restricted-globals": ["error", ...forbid(browserOnly)] },
  },
  {
    files: ["shared/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.es2023,
        AbortController: "readonly",
        DOMException: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        TextDecoder: "readonly",
        TransformStream: "readonly",
      },
    },
    rules: {
      "no-restricted-globals": [
        "error",
        ...forbid([...browserOnly, ...nodeOnly]),
      ],
    },
  },
  {
    files: ["src/features/*/components/**/*.tsx"],
    rules: {
      "no-restricted-globals": [
        "error",
        ...forbid(nodeOnly),
        { name: "fetch", message: "展示组件通过 Hook 和服务层请求数据。" },
      ],
    },
  },
  {
    files: testFiles,
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: { "no-restricted-globals": "off" },
  },
);
