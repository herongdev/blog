---
title: "保证 redirect 参数的安全性 重定向"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "路由与状态管理"
description: "保证 redirect 参数的安全性 ，防止出现「开放重定向漏洞」⚠️。 背景问题 在守卫里，我们常常写： router.push(to.query.redirect DEFAULT ROUTE PATH) 如果没有限制，攻击者就可以构造链接： https://your site。"
sidebarWeight: 29
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vueRouter/保证 redirect 参数的安全性 重定向.md"
---
::: v-pre

# 保证 redirect 参数的安全性 重定向

> 本节目标：理解“保证 redirect 参数的安全性 重定向”的核心思路，并能把它用于实际开发或面试表达。
****保证 redirect 参数的安全性****，防止出现「开放重定向漏洞」⚠️。

### 背景问题
在守卫里，我们常常写：
router.push(to.query.redirect || DEFAULT_ROUTE_PATH)

如果没有限制，攻击者就可以构造链接：
[https://your-site.com/user?redirect=https://evil.com](https://your-site.com/user?redirect=https://evil.com)

用户登录后就会被直接跳到 `evil.com`，这就是典型的 ****开放重定向漏洞****。

### ** **`getSafeRedirect`** **的作用
1. ****解码并校验****
   - 尝试 `decodeURIComponent`，避免双重编码绕过。
2. ****必须是站内相对路径****
   - 要求 redirect 必须以 `/` 开头。
   - 排除外链（`http://`、`https://`、`//` 开头的路径）。
3. ****兜底逻辑****
   - 如果 redirect 不合法 → 返回 `undefined`，守卫会回退到首页。

### 简化理解
- ✅ `?redirect=/dashboard/workplace` → 安全，允许。
- ❌ `?redirect=https://evil.com` → 被拦截，不跳转。
- ❌ `?redirect=//evil.com` → 被拦截，不跳转。
- ❌ `?redirect=javascript:alert(1)` → 因为不以 `/` 开头，直接拒绝。

👉 也就是说，`getSafeRedirect` 的存在是为了****只允许跳转到你自己系统里的页面****，避免用户被利用跳去第三方恶意网站。

:::
