import path from "node:path";
import { fileURLToPath } from "node:url";
import { isBuiltin } from "node:module";
import { readFileSync } from "node:fs";

const root = fileURLToPath(new URL("../../", import.meta.url));
const paths = JSON.parse(
  readFileSync(new URL("../../tsconfig.base.json", import.meta.url), "utf8"),
).compilerOptions.paths;
const aliases = Object.entries(paths).map(([alias, [target]]) => [
  alias.replace(/\*$/, ""),
  path.resolve(root, target.replace(/\*$/, "")),
]);
const normalize = (value) =>
  value
    .split(path.sep)
    .join("/")
    .replace(/\.(?:tsx?|jsx?|mjs)$/, "");
const featureOf = (value) => value.match(/^src\/features\/([^/]+)\//)?.[1];

// These explicit files are the app-facing API; Markdown internals retain their lazy-load boundary.
export const publicFeatureFiles = new Set([
  "src/features/chat/types",
  "src/features/chat/hooks/useChat",
  "src/features/chat/hooks/useAttachments",
  "src/features/chat/hooks/useAutoScroll",
  "src/features/chat/state/selectors",
  ...[
    "Sidebar",
    "Welcome",
    "ChatViewport",
    "MessageList",
    "Composer",
    "ReplayControls",
    "HistoryStatus",
    "ConversationOpenStatus",
  ].map((name) => `src/features/chat/components/${name}`),
  "src/features/model-settings/hooks/useProviders",
  ...["SettingsDialog", "ModelSelector"].map(
    (name) => `src/features/model-settings/components/${name}`,
  ),
]);

const vendorWrappers = new Set([
  "src/features/chat/lib/streamingMarkdown",
  "src/features/chat/hooks/useAutoScroll",
  "shared/transport/sse",
]);

function resolveImport(from, specifier) {
  if (specifier.startsWith("."))
    return normalize(
      path.relative(root, path.resolve(root, path.dirname(from), specifier)),
    );
  const alias = aliases.find(([prefix]) => specifier.startsWith(prefix));
  if (alias)
    return normalize(
      path.relative(
        root,
        path.resolve(alias[1], specifier.slice(alias[0].length)),
      ),
    );
}

const boundaries = {
  meta: {
    type: "problem",
    schema: [],
    messages: { boundary: "{{reason}}（{{target}}）" },
  },
  create(context) {
    const from = normalize(path.relative(root, context.filename));
    const test = /\.test$/.test(from) || from.startsWith("tests/");
    if (test) return {};
    const client = from.startsWith("src/");
    const shared = from.startsWith("shared/");
    const server = from.startsWith("server/");
    const sourceFeature = featureOf(from);
    function inspect(node, specifier) {
      const reject = (reason) =>
        context.report({
          node,
          messageId: "boundary",
          data: { reason, target: specifier },
        });
      if (typeof specifier !== "string") {
        if (client || shared)
          reject("模块路径必须静态可解析，才能检查架构边界");
        return;
      }
      if ((client || shared) && isBuiltin(specifier))
        return reject("浏览器与共享代码不得依赖 Node 内置模块");
      if ((client || shared) && specifier.startsWith("@nestjs/"))
        return reject("浏览器与共享协议不得依赖 Nest 服务端框架");
      if (server && from.endsWith(".service") && specifier === "express")
        return reject("业务服务不依赖 Express 请求与响应对象");
      const pure =
        shared || /\/features\/[^/]+\/(state|lib|services)\//.test(from);
      if (pure && /^(react|react-dom)(\/|$)/.test(specifier))
        return reject("状态、数据转换和服务层不得反向依赖 React");
      const target = resolveImport(from, specifier);
      if (!target) return;
      if (client && target.startsWith("server/"))
        return reject("客户端不得导入服务端私有实现");
      if (from.startsWith("server/") && target.startsWith("src/"))
        return reject("服务端只共享契约，不依赖客户端业务");
      if (shared && (target.startsWith("src/") || target.startsWith("server/")))
        return reject("共享层不得反向依赖两端业务");
      if (
        server &&
        from.split("/").length > 2 &&
        /^server\/(app(?:\.module)?|index)$/.test(target)
      )
        return reject("服务端模块不得反向依赖应用组装和启动入口");
      if (
        /^server\/(http|common)\//.test(from) &&
        /^server\/(chat|model-providers)\//.test(target)
      )
        return reject("公共 HTTP 与底层工具不得依赖业务模块");
      if (
        from.startsWith("server/common/") &&
        target.startsWith("server/http/")
      )
        return reject("底层工具不得依赖 HTTP 传输");
      if (
        from.startsWith("server/model-providers/") &&
        /^server\/(chat|http)\//.test(target)
      )
        return reject("模型接入模块不得依赖聊天策略和 HTTP 传输");
      if (
        server &&
        from.endsWith(".service") &&
        target.startsWith("server/http/")
      )
        return reject("业务服务不得管理 HTTP 响应与连接");
      if (
        from.startsWith("server/chat/") &&
        target.startsWith("server/model-providers/") &&
        !/^server\/model-providers\/model-providers\.(module|service)$/.test(
          target,
        )
      )
        return reject("聊天模块通过模型模块及其导出的服务接入厂商");
      if (target.startsWith("third_party/") && !vendorWrappers.has(from))
        return reject("通用源码只能通过指定的项目封装接入");
      const targetFeature = featureOf(target);
      if (sourceFeature && target.startsWith("src/app/"))
        return reject("业务模块不得反向依赖应用编排层");
      if (sourceFeature && targetFeature && sourceFeature !== targetFeature)
        return reject("兄弟业务模块由 app 组合，不直接互相调用");
      if (
        /^src\/(components|hooks|styles|i18n|preferences)\//.test(from) &&
        (targetFeature || target.startsWith("src/app/"))
      )
        return reject("公共客户端模块不得依赖具体业务");
      if (targetFeature && !sourceFeature && !publicFeatureFiles.has(target))
        return reject("应用层只能使用业务模块公开文件");
      if (pure && /\/(components|hooks)\//.test(target))
        return reject("状态、数据转换和服务层不得反向依赖界面或 Hook");
      if (/\/(state|lib)\//.test(from) && /\/services\//.test(target))
        return reject("纯状态与数据转换不得调用服务层");
      if (pure && target.endsWith(".css")) return reject("逻辑层不得导入样式");
      if (
        /\/components\//.test(from) &&
        (/\/services\//.test(target) ||
          /\/hooks\/(useChat|useProviders|useAutoScroll)$/.test(target))
      )
        return reject("展示组件通过 props 接收业务数据和动作");
    }
    return {
      ImportDeclaration: (node) => inspect(node.source, node.source.value),
      ExportNamedDeclaration: (node) => {
        if (node.source) inspect(node.source, node.source.value);
      },
      ExportAllDeclaration: (node) => inspect(node.source, node.source.value),
      ImportExpression: (node) => inspect(node.source, node.source.value),
      CallExpression: (node) => {
        if (node.callee.type === "Identifier" && node.callee.name === "require")
          inspect(node, node.arguments[0]?.value);
      },
    };
  },
};

export default { rules: { boundaries } };
