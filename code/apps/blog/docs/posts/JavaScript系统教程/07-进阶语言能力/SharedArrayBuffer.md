---
title: "SharedArrayBuffer"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "你的问题涉及到使用 SharedArrayBuffer 时遇到的错误，以及 Cross Origin Opener Policy 头部被忽略的问题。这些错误与浏览器的安全限制有关，特别是在非可信来源（如 http://192.168.1.84:9006 ）上。以下是详细分析和解决。"
sidebarWeight: 35
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/webworkers/SharedArrayBuffer.md"
---
::: v-pre

# SharedArrayBuffer

> 本节目标：理解“SharedArrayBuffer”的核心思路，并能把它用于实际开发或面试表达。
你的问题涉及到使用 `SharedArrayBuffer` 时遇到的错误，以及 `Cross-Origin-Opener-Policy` 头部被忽略的问题。这些错误与浏览器的安全限制有关，特别是在非可信来源（如 `http://192.168.1.84:9006`）上。以下是详细分析和解决方案：

### **问题分析**
1. ********`Cross-Origin-Opener-Policy`** **头部被忽略****：
   - 浏览器提示 `Cross-Origin-Opener-Policy` 头部被忽略，因为来源（`http://192.168.1.84:9006`）不可信。根据 [W3C 规范](https://www.w3.org/TR/powerful-features/#potentially-trustworthy-origin)，只有 `https://` 或 `http://localhost` 被视为可信来源。
   - 使用 `http://192.168.1.84:9006` 访问时，浏览器会施加更严格的安全策略，导致头部无效。
2. ********`SharedArrayBuffer is not defined`********：
   - `SharedArrayBuffer` 仅在安全上下文（secure context）中可用，且需要正确设置 `Cross-Origin-Opener-Policy: same-origin` 和 `Cross-Origin-Embedder-Policy: require-corp` 头部。由于头部在 `http://192.168.1.84:9006` 上被忽略，`SharedArrayBuffer` 不可用，导致 `ReferenceError`。
3. ********`localhost`** **与** **`192.168.1.84`** **的差异****：
   - 浏览器将 `localhost` 视为开发中的可信来源，因此 `http://localhost:9006` 可以正常使用 `SharedArrayBuffer`。但 `192.168.1.84` 被视为普通网络 IP，需要 HTTPS 和正确头部。
4. ****Vite 配置****：
   - 你的 Vite 配置已在 `server` 和 `preview` 中设置了正确的头部（`COOP: same-origin`, `COEP: require-corp`），但在 HTTP 协议下通过 `192.168.1.84` 访问时，这些头部因来源不可信而无效。

### **解决方案**
要解决这些问题，你需要确保应用运行在安全上下文（HTTPS）或使用 `localhost` 进行开发。以下是具体步骤：
#### **1. 在 Vite 中启用 HTTPS**
由于浏览器要求可信来源，建议为 Vite 开发服务器启用 HTTPS。Vite 支持通过生成自签名证书来启用 HTTPS。
****步骤****：
- 安装 `@vitejs/plugin-basic-ssl` 插件：
  ```bash
  npm install @vitejs/plugin-basic-ssl --save-dev
  ```
- 更新 `vite.config.ts`，添加插件并启用 HTTPS：
  ```typescript
  import basicSsl from '@vitejs/plugin-basic-ssl'
  export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    return {
      // ... 其他配置
      plugins: [
        basicSsl(), // 添加此插件
        vue(),
        // ... 其他插件
      ],
      server: {
        host: '0.0.0.0',
        port: 9006,
        https: true, // 启用 HTTPS
        headers: {
          'Cross-Origin-Opener-Policy': 'same-origin',
          'Cross-Origin-Embedder-Policy': 'require-corp',
        },
        proxy: {
          // ... 代理配置
        },
        hmr: true,
      },
      preview: {
        headers: {
          'Cross-Origin-Opener-Policy': 'same-origin',
          'Cross-Origin-Embedder-Policy': 'require-corp',
        },
      },
    }
  })
  ```
- 运行 Vite 服务器：
  ```bash
  npm run dev
  ```
- 通过 `https://192.168.1.84:9006` 或 `https://localhost:9006` 访问应用。浏览器可能会提示自签名证书不安全，需手动接受。
****注意****：
- 自签名证书可能触发浏览器警告。生产环境中，建议使用受信任的 SSL 证书（如 Let’s Encrypt）。
- 确保代理目标（如 `https://devweb1.mtarde.com`, `http://devapi1.mtarde.com`）也使用 HTTPS，避免混合内容问题。

#### **2. 使用** **`localhost`** **测试**
由于 `http://localhost:9006` 无错误，你可以继续用它进行开发。或者，通过修改 `/etc/hosts` 文件，将 `192.168.1.84` 映射到本地域名（如 `dev.local`），以模拟 `localhost` 行为。
****步骤****：
- 编辑 `/etc/hosts` 文件（需要管理员权限）：
  ```bash
  sudo nano /etc/hosts
  ```
- 添加以下行：
  ```
  192.168.1.84 dev.local
  ```
- 保存并退出。
- 通过 `http://dev.local:9006` 访问应用。
此方法适用于开发，但生产环境中仍需 HTTPS，因为 `SharedArrayBuffer` 要求安全上下文。

#### **3. 确保 Worker 文件正确设置头部**
如果 `SharedArrayBuffer` 用于 Web Worker（如 `orderWorker.js`），需确保 Worker 文件也携带正确的 `COOP` 和 `COEP` 头部。你的 Vite 配置已为资产文件（如 `/workers/orderWorker.js`）设置了正确路径，需验证其加载是否正常。
****验证****：
- 打开浏览器开发者工具（网络标签），检查 `orderWorker.js` 的响应头部，确保包含：
  ```
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Embedder-Policy: require-corp
  ```
- 如果 Worker 文件未正确加载，检查 Vite 的 `build.rollupOptions.output.assetFileNames` 配置，确保 Worker 文件输出到 `/workers` 目录。

#### **4. 其他注意事项**
- ****代理配置****：你的代理目标中有 HTTP 和 HTTPS 混用（如 `http://devapi1.mtarde.com` 和 `https://feed.tradingcentral.com`）。在 HTTPS 环境下，所有资源都应使用 HTTPS，否则可能触发混合内容错误。建议将所有代理目标更新为 HTTPS。
- ****生产环境****：开发中可以使用自签名证书或 `localhost`，但生产环境中必须使用受信任的 SSL 证书，并确保所有资源通过 HTTPS 提供。
- ****浏览器兼容性****：确保测试的浏览器支持 `SharedArrayBuffer`（现代浏览器如 Chrome、Firefox、Safari 均支持，但需满足安全上下文要求）。

### **总结**
- ****推荐方案****：启用 HTTPS（通过 `@vitejs/plugin-basic-ssl`），并通过 `https://192.168.1.84:9006` 或 `https://localhost:9006` 访问，以满足 `SharedArrayBuffer` 的安全要求。
- ****开发替代方案****：使用 `http://localhost:9006` 或通过 `/etc/hosts` 映射本地域名。
- ****验证****：确保 Worker 文件和所有资源都携带正确的 `COOP` 和 `COEP` 头部。
如果仍有问题，请提供更多细节（如 `quoteSharedMemory.ts` 的代码片段或 Worker 文件内容），我可以进一步协助调试！

:::
