---
title: Vue I18n 中 useI18n 与 i18n.global.t 的核心区别与原理
date: 2025-09-15
tags: [Vue, Vue I18n, 前端开发, 国际化]
---

## 前言

在 Vue 3 项目中使用 Vue I18n 时，经常会遇到两种调用方式：`useI18n()` 和 `i18n.global.t`。  
它们在大多数场景下可以互换，但在涉及 **Portal 渲染**（如 `Modal.confirm`）时，行为却有明显差异。  
本文将精炼梳理其核心区别与原理，并给出解决方案。

## useI18n 与 i18n.global.t 的区别

### useI18n()

- 基于 **组合式 API**，通过 `provide/inject` 获取 i18n 实例。
- 默认是 **组件作用域**，依赖于组件树的注入链。
- 如果组件渲染在 **脱离应用上下文的 Portal** 中（如 `Modal.confirm`），注入链会断开，导致报错：**VUE_I18N_SYMBOL** 为 null

### useI18n({ useScope: 'global' })

- 强制取 **全局 i18n 实例**，等价于 `i18n.global`。
- 不依赖 `provide/inject`，在 Portal 场景下依然安全可用。
- 类型提示完整，开发体验较佳。

### i18n.global.t

- 直接调用全局实例上的 `t` 方法。
- 天然不受 Portal 的注入链影响，不会报错。
- 但在 TypeScript 中，由于 `i18n.global` 类型是 `Composer | VueI18n` 的联合类型，`.t` 方法签名不唯一，可能会报：This expression is not callable

- 需要通过 **类型断言** 或 **any** 绕过。

## 为什么有的报错，有的不报

- **报错场景**：
  使用 `useI18n()`（默认作用域）时，Portal 中的组件拿不到注入实例 → 报错。

- **不报错场景**：
- 使用 `useI18n({ useScope: 'global' })` → 绕过注入链。
- 或直接调用 `i18n.global.t` → 使用全局实例。

## TypeScript 报错原因与解决

### 原因

- `i18n.global` 的类型是 **联合类型**（`Composer | VueI18n`）。
- `.t` 方法在两者中定义不一致，TS 无法推断出唯一签名。

### 解决方式

1. **推荐**：使用 `useI18n({ useScope: 'global' })` → `t` 方法类型清晰。
2. **备选**：在 `i18n.global` 上加断言：

```ts
(i18n.global as any).t("key");
```

## 该如何选择

- **组件内部调用（推荐）**：
  使用 `useI18n({ useScope: 'global' })`，类型安全，语义清晰。

- **全局或工具函数调用**：
  直接用 `i18n.global.t`，搭配类型断言解决 TS 报错。

## 一句话总结

报错的根源在于 **Portal 渲染导致注入链断开**。
解决方法是 **改用全局 i18n**，从机制上绕过 `provide/inject` 的限制。
因此，最佳实践是：**组件内用 `useI18n({ useScope: 'global' })`，工具层用 `i18n.global.t`**。
