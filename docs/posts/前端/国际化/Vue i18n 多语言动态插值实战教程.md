---
title: Vue i18n 多语言动态插值实战教程
date: 2025-10-11
categories:
  - 前端国际化
tags:
  - Vue i18n
  - 多语言
  - 动态插值
  - Ant Design Vue
---

## 概述

在多语言项目中，我们经常需要在提示信息里插入动态变量，例如「您的账号 {email} 未验证」或「当前环境 {envText} 与登录方式 {curText} 不一致」。
本文总结一个适用于 **Hexo 技术分享风格** 的实战教程，讲解如何在 Vue 3 + vue-i18n 项目中正确使用插值，而不是手动 `replace`。

---

## 一、实现思路

1. **定义占位符式多语言文案**
   在语言文件里使用花括号 `{}` 标记动态变量位置。
2. **统一封装 `t()` 函数调用**
   使用 vue-i18n 的 `t(key, params)` 方法，让框架自动替换占位符。
3. **传入对象参数**
   只需传入一个对象，键名与占位符一致。vue-i18n 会自动完成多次替换、顺序保持等。
4. **可选封装辅助函数 `tr()`**
   为项目统一入口，减少重复书写。

---

## 二、分步实现

### 1️⃣ 在语言包中定义占位符

```json
// zh-CN.json
{
  "security": {
    "passkeyMismatch": "当前环境 {envText} 与登录方式 {curText} 不一致。",
    "smsRequired": "必须完成短信验证。",
    "appRequired": "请使用验证器 App 完成验证。"
  }
}
```

### 2️⃣ 创建插值助手函数

```ts
// i18nHelper.ts
import i18n from "@/locales";

export const tr = (key: string, params?: Record<string, any>) =>
  (i18n.global as any).t(key, params ?? {});
```

### 3️⃣ 在业务代码中调用

```ts
// 复杂逻辑：根据不同验证类型动态生成提示
const envText = tr("security.applePasskey");
const curText = tr("security.googlePasskey");

const message = tr("security.passkeyMismatch", { envText, curText });
console.log(message);
// 输出：当前环境 Apple Passkey 与登录方式 Google Passkey 不一致。
```

---

## 三、完整示例（以 Ant Design Vue Modal 为例）

```ts
import { Modal } from "ant-design-vue";
import { tr } from "@/utils/i18nHelper";

// 复杂逻辑：收集错误并弹出统一提示
const errors = [
  tr("security.smsRequired"),
  tr("security.passkeyMismatch", {
    envText: "Apple Passkey",
    curText: "Google Passkey",
  }),
];

Modal.error({
  title: tr("security.verifyFailed"),
  content: errors.join("\n"),
});
```

---

## 四、常见坑与对策

| 问题               | 错误示例                     | 正确写法                      |
| ------------------ | ---------------------------- | ----------------------------- |
| 只替换第一个匹配   | `msg.replace('{name}', val)` | `t(key, { name: val })`       |
| 多语言参数顺序不同 | 手动拼接字符串               | 使用 `t()` 自动映射           |
| 未转义花括号       | 直接 `{value}` 出现在文案    | 使用 `'{{value}}'` 或外层转义 |

---

## 五、总结

✅ 推荐做法

- 在 JSON 多语言文件中定义占位符。
- 封装 `tr()` 助手函数，统一调用。
- 始终用 `t(key, params)` 而非手动 `replace()`。
- 允许多次出现同名占位符，vue-i18n 会自动处理。

🚫 不要做的事

- 不要手写 `replace()` 去替换变量。
- 不要在模板里拼接字符串插值。

---

## 结语

通过以上方案，你可以在任何 Vue 或 Ant Design Vue 项目中优雅地实现多语言动态插值，让国际化信息提示更规范、更易维护。
