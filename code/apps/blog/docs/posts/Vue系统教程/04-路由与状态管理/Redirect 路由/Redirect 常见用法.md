---
title: "Redirect 常见用法"
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
description: "常见用法示例（片段） 1) 登录回跳（未登录 → 登录页 → 回到目标页） // 守卫里：未登录访问受保护页 → 去登录，并带上 redirect return next(\\{ name: 'user', query: \\{ redirect: encodeURIComponen。"
sidebarWeight: 9
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vueRouter/Redirect 路由/Redirect 常见用法.md"
---
::: v-pre

# Redirect 常见用法

> 本节目标：理解“Redirect 常见用法”的核心思路，并能把它用于实际开发或面试表达。
## 常见用法示例（片段）
### 1) 登录回跳（未登录 → 登录页 → 回到目标页）
// 守卫里：未登录访问受保护页 → 去登录，并带上 redirect
return next(\{ name: 'user', query: \{ redirect: encodeURIComponent(to.fullPath) \}, replace: true \})

// 登录/注册成功回调：从登录页跳到 /redirect，由它统一处理跳转（更可控）
const redirect = route.query?.redirect as string | undefined
router.replace(\{ name: 'redirect', query: \{ to: redirect ?? '/' \} \})

### 2) 站内外链统一跳转（外链白名单）
// 业务中：需要跳合作方外链（在 redirect 页里做白名单校验）
router.push(\{ name: 'redirect', query: \{ to: '[https://partner.example.com/path?a=1](https://partner.example.com/path?a=1)' \} \})

### 3) 退出登录 / Token 刷新后清理再跳
// 退出：先清掉 token 等，再交给 redirect 去目标页
clearAuth()
router.replace(\{ name: 'redirect', query: \{ to: '/', clear: 'auth' \} \})

### 4) 指定延迟（展示品牌/Loading，埋点）
// 延迟 500ms 再跳（redirect 页支持 delay 参数，单位 ms）
router.push(\{ name: 'redirect', query: \{ to: '/dashboard', delay: '500' \} \})

### 5) 角色切换后的动态分流
// 改角色后：交给 redirect 判断去向（如 ADMIN 去 /admin，其它去 /dashboard）
router.replace(\{ name: 'redirect', query: \{ to: '/auto' \} \})

### 6) 清理 URL 多余 query/hash（保持干净）
router.push(\{ name: 'redirect', query: \{ to: '/transactions#today', clean: '1' \} \})

## 最终完整文件：****`views/redirect/page.vue`
```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
/** ========= 可按需修改的策略区 ========= */
// 复杂逻辑：允许的外链前缀白名单（如需允许外部域名，填这里；默认只允许同源相对路径）
const ALLOWED_EXTERNAL_PREFIXES = [
  // '[https://partner.example.com](https://partner.example.com)',
]
// 复杂逻辑：角色自动分流（当 query.to === '/auto' 时触发）
function resolveAutoTarget(): string {
  // 这里示例：从本地或 store 里取角色
  const roles = (() => {
    try {
      return JSON.parse(localStorage.getItem('roles') || '[]') as string[]
    } catch {
      return []
    }
  })()
  if (roles.includes('ADMIN')) return '/admin'
  if (roles.includes('IB')) return '/introducing-broker'
  return '/dashboard'
}
/** ========= 工具函数 ========= */
// 复杂逻辑：仅允许“站内相对路径”或“白名单外链”
function getSafeRedirect(raw?: unknown): string {
  // 同步兼容 login 守卫里常见的 redirect 参数名称
  const rawStr = typeof raw === 'string' ? raw : undefined
  if (!rawStr) return '/'
  // 尝试 decode，防止双重编码绕过
  let decoded = rawStr
  try {
    decoded = decodeURIComponent(rawStr)
  } catch {}
  // 特殊：自动分流
  if (decoded === '/auto') return resolveAutoTarget()
  // 相对站内路径（/xxx）→ 允许
  if (decoded.startsWith('/') && !/^(https?:)?\/\//i.test(decoded)) {
    return decoded
  }
  // 绝对/协议相对链接 → 检查白名单
  if (/^(https?:)?\/\//i.test(decoded)) {
    const ok = ALLOWED_EXTERNAL_PREFIXES.some((p) => decoded.startsWith(p))
    if (ok) return decoded
    console.warn('[redirect] 非白名单外链已拦截：', decoded)
    return '/'
  }
  // 其他形式不允许
  return '/'
}
// 复杂逻辑：根据 query 参数做可选动作（清理 token/缓存等）
function sideEffectsByQuery() {
  const clear = route.query.clear as string | undefined
  if (!clear) return
  // 按位或多值扩展，例如 clear=auth,cache
  const items = clear.split(',').map((s) => s.trim())
  if (items.includes('auth')) {
    try {
      localStorage.removeItem('ACCESS_TOKEN')
      localStorage.removeItem('roles')
      // …更多与登录相关的项
    } catch {}
  }
  if (items.includes('cache')) {
    // 清理你的业务缓存，如筛选条件等
    try {
      sessionStorage.clear()
    } catch {}
  }
}
// 复杂逻辑：从 query 里构造最终目标；支持 to / redirect 两种命名
function buildTargetFromQuery(): string {
  const raw = (route.query.to as string | undefined) ?? (route.query.redirect as string | undefined)
  const base = getSafeRedirect(raw)
  // 可选：清理 hash 或 query，保持“干净 URL”
  const needClean = route.query.clean === '1'
  if (!needClean) return base
  try {
    const url = new URL(base, window.location.origin)
    // 仅保留 pathname
    return url.pathname
  } catch {
    // base 可能是相对路径（如 '/dashboard'），不影响返回
    return base.split('#')[0].split('?')[0] || '/'
  }
}
// 复杂逻辑：支持延迟跳转（展示品牌/埋点）
function maybeDelay(ms?: string | string[]) {
  if (!ms) return 0
  const n = Array.isArray(ms) ? Number(ms[0]) : Number(ms)
  return Number.isFinite(n) && n > 0 ? Math.min(n, 5_000) : 0 // 上限 5s
}
const tip = ref('正在跳转，请稍候…')
onMounted(async () => {
  try {
    // 1) 可选副作用（清理缓存/登出）
    sideEffectsByQuery()
    // 2) 解析目标地址
    const target = buildTargetFromQuery()
    // 3) 可选延迟
    const delay = maybeDelay(route.query.delay)
    if (delay > 0) {
      tip.value = '处理中，马上跳转…'
      await new Promise((r) => setTimeout(r, delay))
    }
    // 4) 站内相对路径 → router.replace；白名单外链 → window.location
    if (target.startsWith('/') && !/^(https?:)?\/\//i.test(target)) {
      // 复杂逻辑：站内跳转用 replace，避免历史残留中转页
      router.replace(target)
    } else {
      // 复杂逻辑：白名单外链交给浏览器，保留来源
      window.location.href = target
    }
  } catch (e) {
    console.error('[redirect] 跳转失败：', e)
    router.replace('/') // 兜底回首页
  }
})
</script>
<template>
  <div class="redirect-page">
    <div class="card">
      <div class="spinner" />
      <p>{{ tip }}</p>
    </div>
  </div>
</template>
<style scoped>
.redirect-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f7f7f8;
}
.card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  padding: 14px 18px;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
  font-size: 14px;
  color: #555;
}
.spinner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #ddd;
  border-top-color: #555;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
```
---
### 小结
- ********`/redirect`******** 作为****跳板页****统一承接各种跳转需求：登录回跳、白名单外链、清理状态、延迟/埋点、角色分流等；
- 默认****只允许站内相对路径****，如需外链请添加到 `ALLOWED_EXTERNAL_PREFIXES`；
- 配合守卫把 `redirect` 当成****单点收口****，代码更清晰、可维护性更高。
如果你需要我把****登录守卫****里“回跳 `/redirect` 的逻辑”也直接合并到你现有守卫里，我可以给你****替换片段****。

:::
