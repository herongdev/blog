---
title: "redirect page.vue"
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
description: "views/redirect/page.vue \\<script setup lang \"ts\"\\ import \\{ onMounted \\} from 'vue' import \\{ useRoute, useRouter \\} from 'vue router' const。"
sidebarWeight: 11
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vueRouter/Redirect 路由/redirect page.vue.md"
---
::: v-pre

# redirect page.vue

> 本节目标：理解“redirect page.vue”的核心思路，并能把它用于实际开发或面试表达。
### ** **`views/redirect/page.vue`
\<script setup lang="ts"\>
import \{ onMounted \} from 'vue'
import \{ useRoute, useRouter \} from 'vue-router'
const route = useRoute()
const router = useRouter()
// 简单白名单（只允许站内路径跳转）
function getSafeRedirect(to?: string): string \{
  if (!to) return '/' // 默认首页
  try \{
    const url = new URL(to, window.location.origin)
    // 只允许同源跳转，防止 open redirect 漏洞
    if (url.origin === window.location.origin) \{
      return url.pathname + url.search + url.hash
    \}
    console.warn('[redirect] 非法外链跳转被拦截:', to)
    return '/'
  \} catch \{
    return '/'
  \}
\}
onMounted(() =\> \{
  const target = getSafeRedirect(route.query.to as string | undefined)
  router.replace(target)
\})
\</script\>
\<template\>
  \<div class="redirect-page"\>
    \<p\>正在跳转，请稍候…\</p\>
  \</div\>
\</template\>
\<style scoped\>
.redirect-page \{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #666;
\}
\</style\>
### ** **🔑** **说明
1. ****核心逻辑****：
   - 从 `route.query.to` 取跳转目标。
   - 调用 `getSafeRedirect` 检查是否安全（只允许站内同源路径）。
   - 使用 `router.replace` 跳转，不会保留 `redirect` 页的历史记录。
2. ****白名单安全控制****：
   - 防止有人构造 `/redirect?to=https://phishing.com` 把用户带到恶意网站。
   - 如果是外链，可以在 `getSafeRedirect` 里加白名单：
     ```ts
     const ALLOWED_EXTERNAL = ['[https://example.com](https://example.com)', '[https://partner.com](https://partner.com)']
     if (ALLOWED_EXTERNAL.some((url) => to.startsWith(url))) {
       return to
     }
     ```
3. ****用户体验****：
   - 页面只显示一个提示文本，跳转很快。
   - 也可以放一个 ****Loading 动画**** 或 ****品牌 Logo****，作为「中转页」。

:::
