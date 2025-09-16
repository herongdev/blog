---
title: Vite 项目中静态导入 vs 动态导入的全面对比
date: 2025-09-13
categories: [前端工程化, Vite, 设计模式]
tags: [vite, import, 代码分割, mfa, 懒加载]
---

在做 **MFA（二次验证）** 的时候，你可能会遇到这样一个设计问题：  
验证器模块（短信、邮箱、App、WebAuthn 等）到底是 **静态导入**，还是用 `import()` 动态导入？

本文从 **构建、运行时、调试、体验、MFA 实战选择** 五个角度，把区别和最佳实践详细说明。

## 一、语法层面对比

### 静态导入

```ts
import sms from "./verifiers/sms";
registerVerifier("sms_validate", async () => sms);
```

- **在构建时**就确定依赖关系。
- 编译产物会直接打进主 chunk。
- `async () => sms` 只是伪装成 Promise，不会触发代码分割。

### 动态导入

```ts
registerVerifier("sms_validate", () =>
  import("./verifiers/sms").then((m) => m.default ?? m)
);
```

- `import()` 是运行时调用，返回真正的 Promise。
- 触发 **代码分割**，生成独立 chunk。
- 首次调用时才去加载。

## 二、构建层面区别

| 维度             | 静态导入                         | 动态导入                         |
| ---------------- | -------------------------------- | -------------------------------- |
| **打包方式**     | 打入入口 chunk                   | 分割为独立 chunk                 |
| **首屏体积**     | 更大                             | 更小                             |
| **Tree-shaking** | 有效，但整个文件都会被打包进来   | chunk 内也能摇树，但以文件为单位 |
| **缓存策略**     | 和主包一起缓存，版本变了整体失效 | 独立 chunk，可单独缓存           |

## 三、运行时区别

| 维度             | 静态导入               | 动态导入                       |
| ---------------- | ---------------------- | ------------------------------ |
| **首次加载**     | 已经在主包，无额外请求 | 触发一次异步加载               |
| **延迟**         | 零延迟                 | 首次有网络开销（弱网可能转圈） |
| **常用模块体验** | 即点即用               | 首次点可能卡顿                 |
| **冷门模块体验** | 白白拖慢首屏           | 不加载，节省资源               |

## 四、调试 & SSR

- **调试**

  - 静态导入：调试时所有 verifier 都会随入口加载。
  - 动态导入：调试时能直观看到 `verifiers-sms.js` 之类的分包。

- **SSR**

  - 静态导入：和 Node 端 `import` 行为一致。
  - 动态导入：服务端执行时也会懒加载，需要注意 `ssr.noExternal` 设置。

## 五、用户体验区别

- **静态导入**

  - 优点：操作无延迟。
  - 缺点：即使用户从不点“WebAuthn”，也把相关代码拉下来了。

- **动态导入**

  - 优点：只在需要时才拉；多用户场景下整体流量更省。
  - 缺点：第一次点 WebAuthn 验证时，会有一次加载等待。

## 六、Vite 特性与额外点

- **预加载支持**
  动态导入可配合 `<link rel="modulepreload">` 或手动 `import()` 提前热身，减少等待。

- **import.meta.glob**
  动态导入可以批量注册：

  ```ts
  const modules = import.meta.glob("./verifiers/*.ts");
  registerVerifier("sms", () => modules["./verifiers/sms.ts"]());
  ```

- **并发优化**
  多次点击同一验证器时，浏览器会复用动态导入的 Promise，不会重复请求。

## 七、在 MFA 场景的选择

MFA 有多种验证器：

- **短信/邮箱**：实现简单、体积很小，**常见场景**几乎人人要用。
- **App 验证器 / WebAuthn**：可能引入加密、FIDO 库，体积较大，**用户比例低**。

### 最佳实践建议

1. **常用、体积小的验证器（短信、邮箱） → 静态导入**

   - 避免点击时的首次加载延迟。
   - 不会显著增加首屏体积。

2. **少用、体积大的验证器（App、WebAuthn） → 动态导入**

   - 减少主包体积，首屏加载更快。
   - 用户只有在触发时才会加载。

### 混合模式写法

```ts
// 常用的静态导入
import sms from "./verifiers/sms";
import email from "./verifiers/email";
registerVerifier("sms_validate", async () => sms);
registerVerifier("email_validate", async () => email);

// 体积大的走动态导入
registerVerifier("app_validate", () =>
  import("./verifiers/app").then((m) => m.default ?? m)
);
registerVerifier("biometric_validate", () =>
  import("./verifiers/webauthn").then((m) => m.default ?? m)
);
```

## 八、总结

- **静态导入**：快，但拖大首屏。
- **动态导入**：首屏轻，但首次交互有延迟。
- **MFA 实战**：推荐 **混合策略**——

  - **短信/邮箱**：静态导入（高频 + 小体积）。
  - **App/WebAuthn**：动态导入（低频 + 大体积）。

这样既保证了**日常操作流畅**，又兼顾了**首屏性能和扩展性**。 🚀
