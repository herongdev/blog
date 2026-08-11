---
title: "处理 懒加载 chunk 失效（发版后旧包残留-网络抖动），自动重试当前路由 chunk 加载失败"
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
description: "当懒加载的路由组件对应的 JS 分包（chunk）加载失败时，自动重试 ，必要时做 整页刷新 ，以修复“旧包/新包不匹配”导致的白屏或崩溃。 router.onError((err) \\ \\{ // 1) 取出错误信息字符串，兼容 err 不是标准 Error 的情况 const。"
sidebarWeight: 34
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vueRouter/处理 懒加载 chunk 失效（发版后旧包残留-网络抖动），自动重试当前路由 chunk 加载失败.md"
---
::: v-pre

# 处理 懒加载 chunk 失效（发版后旧包残留-网络抖动），自动重试当前路由 chunk 加载失败

> 本节目标：理解“处理 懒加载 chunk 失效（发版后旧包残留-网络抖动），自动重试当前路由 chunk 加载失败”的核心思路，并能把它用于实际开发或面试表达。
****当懒加载的路由组件对应的 JS 分包（chunk）加载失败时，自动重试****，必要时做****整页刷新****，以修复“旧包/新包不匹配”导致的白屏或崩溃。

router.onError((err) =\> \{
  // 1) 取出错误信息字符串，兼容 err 不是标准 Error 的情况
  const msg = (err && (err as Error).message) || ''
  // 2) 仅当属于“分包加载失败/动态 import 失败”这类错误时才处理
  //    - "Loading chunk 123 failed"：常见于 Webpack 懒加载报错
  //    - "ChunkLoadError"：同上另一种表现
  //    - "dynamically imported module"：浏览器原生 dynamic import 失败（Vite/原生 ESM 场景）
  //    i：不区分大小写
  if (/Loading chunk \d+ failed|ChunkLoadError|dynamically imported module/i.test(msg)) \{
    // 3) 拿到当前路由的完整地址（含 path + query + hash）
    const \{ fullPath \} = router.currentRoute.value
    // 4) 先尝试“软重载”：用 router.replace 把自己替换成自己
    //    作用：重新触发当前路由的懒加载 import，从而拉取最新 chunk（通常带哈希的新版文件）
    //    如果 router 层面仍然失败（依然拿不到 chunk 或再次抛错），进入 catch
    router.replace(fullPath).catch(() =\>
      // 5) 兜底“硬重载”：让浏览器整页跳转到当前地址（相当于刷新）
      //    作用：强制重新请求 index.html 和所有脚本，彻底换成新版本资源
      window.location.assign(fullPath),
    )
  \}
\})

## 为什么会出现这类错误？
- ****线上发了新版本****：老用户还停留在旧的 `index.html`，里面的懒加载 URL 指向旧哈希；当用户点击到新页面时，请求的旧 chunk 在 CDN 已被清理 → 404 → “Loading chunk failed”。
- ****Service Worker / 浏览器缓存****：缓存了过期的 manifest 或入口，导致资源指向不一致。
- ****网络中断/代理异常****：动态 import 的脚本下载途中失败。
这段代码能把用户“自动救回来”，体验更平滑。

## 行为解读 & 设计权衡
- ****正则过滤****：只对明确的“分包加载失败”进行处理，避免把其它业务错误（权限/接口异常）误判成需要刷新。
- ****为何先 replace 再硬刷？****
  - `router.replace(fullPath)` 会****不留历史记录****地重进当前路由，重新尝试拉取懒加载分包；如果只是偶发网络抖动，这一步就够了。
  - `window.location.assign(fullPath)` 是****整页刷新****，彻底加载最新 HTML/JS，适合“新老包不一致”的根因。
- ****用** **`assign`** **而不是** **`reload`********：两者都能刷新页面；`assign(url)` 也能在需要时跳去别的 URL，更通用（这里传同样的 `fullPath`，效果与 reload 一致）。

## 可选的小优化（按需挑用）
\> 你说“复杂逻辑上一行加注释”，所以我只给****增量改动****👇
```ts
// 复杂逻辑：防止无限重试（最多尝试 1 次软重载）
let hasRetriedChunkError = false
router.onError((err) => {
  const msg = (err && (err as Error).message) || ''
  if (/Loading chunk \d+ failed|ChunkLoadError|dynamically imported module/i.test(msg)) {
    const { fullPath } = router.currentRoute.value
    // 复杂逻辑：仅第一次走 replace，第二次直接整页刷新，避免循环
    if (!hasRetriedChunkError) {
      hasRetriedChunkError = true
      router.replace(fullPath).catch(() => window.location.assign(fullPath))
      return
    }
    window.location.assign(fullPath)
  }
})
```
```ts
// 复杂逻辑：如果用了 Service Worker，可在硬刷新前尝试让 SW 跳新版本
// （需你在 SW 里实现 skipWaiting/clientsClaim）
navigator.serviceWorker?.getRegistrations?.().then((rs) => rs.forEach((r) => r.update()))
```
```ts
// 复杂逻辑：给用户一点可感知反馈（Toast/Message），避免无声刷新造成困惑
// message.info('检测到新版本，正在为你更新…')
```
---
## 什么时候不该用这段逻辑？
- 如果你的项目****完全没有懒加载****（所有组件都打进一个包），理论上不会出现 chunk 404。
- 如果你有****复杂的自定义错误上报****，希望把这类错误采集到监控再刷新，需要把“刷新”动作延后到上报成功后执行。
---
## 一句话总结
这段 `router.onError` 是****线上稳定性保护伞****：当用户因为****版本切换或懒加载脚本失败****导致页面无法打开时，它会****先软重载****重试懒加载，必要时****整页刷新****，把用户自动带回“可用”的最新版本。

:::
