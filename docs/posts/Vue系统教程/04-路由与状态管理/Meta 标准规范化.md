---
title: "Meta 标准规范化"
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
description: "落地教程（一步到位） 第 1 步：给 RouteMeta 立规范（TS 模块扩展） 目的 ：团队统一使用的 meta 字段在 TS 下有类型提示，不再“随便写”。 新建 types/router.d.ts （或合并到你已有的 ambient .d.ts ） 声明你们约定使用的 m。"
sidebarWeight: 8
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vueRouter/Meta 标准规范化.md"
---
::: v-pre

# Meta 标准规范化

> 本节目标：理解“Meta 标准规范化”的核心思路，并能把它用于实际开发或面试表达。
# 落地教程（一步到位）
## 第 1 步：给** **`RouteMeta`** **立规范（TS 模块扩展）
****目的****：团队统一使用的 `meta` 字段在 TS 下有类型提示，不再“随便写”。
- 新建 `types/router.d.ts`（或合并到你已有的 ambient `*.d.ts`）
- 声明你们约定使用的 `meta` 字段（菜单、权限、可见性等）
\> 完整代码见下方「文件 1」。
---
## 第 2 步：统一规范化** **`meta`****（合并默认值 + 旧键别名归一）
****目的****：无论路由表里是 `order` 还是历史遗留的 `orderIndex`、`hiddenInMenu`，在****进入系统后****都归一成一套字段（`order`、`hideInMenu`），并补上默认值（如 `requiresAuth: true`、`order: 99`）。
- 新建 `utils/normalize-routes.ts`
- ****只处理** **`meta`********，其余字段（`component`、`beforeEnter`、`props` 等函数）****保持原引用****，避免 `structuredClone` 造成的 `DataCloneError`
- 做好****别名归一****与****类型修正****（字符串数值→数值）
\> 完整代码见下方「文件 2」。
---
## 第 3 步：在** **`router/index.ts`** **中接入规范化
****目的****：创建 Router 时先对****整棵路由树****做一次 `normalizeRoutesMeta`；并把****规范化后的路由****导出给菜单等模块使用，避免重复处理。
- `import routes from './routes'`
- `const appRoutes = normalizeRoutesMeta(routes, DEFAULT_META)`
- `createRouter({ routes: appRoutes, ... })`
- `export { appRoutes as routes }`（供菜单 Store 使用）
\> 完整代码见下方「文件 3」。
---
## 第 4 步：菜单 Store 仅依赖规范化后的** **`meta`
****目的****：路由→菜单的转换只信任 `meta`（`title`/`icon`/`order`/`hideInMenu`），不解析 `path/name` 约定，也不写 `includes('public')` 等脆弱逻辑。
- 从 `@/router` 导入****规范化后的**** `routes`
- 精确定位分区：`name === 'root'` 下的 children 作为公共区；顶层 `name === 'introducing-broker'` 作为 IB 区
- 统一用 `buildMenu()` 构建菜单（过滤隐藏、排序、单子节点扁平化）
- 增加 `inited` 标记，****只构建一次****，避免重复开销
\> 完整代码见下方「文件 4」。
---
# 需要你微调的路由定义（说明）
- 你原有超大 `routes.ts` 不用重写；****只需把 meta 字段慢慢收敛****到：
  - `title`（菜单文案/i18n key）
  - `icon`（图标名或组件）
  - `order`（数字）
  - `hideInMenu`（布尔）
  - `requiresAuth` / `public` / `roles` / `permissions`（权限域）
- 老字段 `orderIndex`、`hiddenInMenu` ****可暂留****；规范化时会自动转到 `order`、`hideInMenu` 并删除老键。
---
# 完整代码
## 文件 1：****`types/router.d.ts`
```ts
// types/router.d.ts
import 'vue-router'
import type { Component } from 'vue'
declare module 'vue-router' {
  interface RouteMeta {
    /** 访问控制 */
    requiresAuth?: boolean
    public?: boolean
    roles?: string[]
    permissions?: Array<string | number>
    /** 菜单渲染 */
    title?: string
    icon?: string | Component
    order?: number
    hideInMenu?: boolean
    sidebarCollapsed?: boolean
    renderMenu?: boolean
    /** 兼容旧字段（仅供 normalize 时读取，运行期请使用上面的新字段） */
    orderIndex?: number
    hiddenInMenu?: boolean
  }
}
```
---
## 文件 2：****`utils/normalize-routes.ts`
```ts
// utils/normalize-routes.ts
import type { RouteRecordRaw } from 'vue-router'
/**
 * 复杂逻辑：仅规范化/合并 meta，保留 component / beforeEnter / props 等原始函数引用；
 *          不使用 structuredClone（会因函数不可克隆而抛 DataCloneError）。
 * 复杂逻辑：为规避 RouteRecordRaw 联合类型导致的“不可赋值”告警，构建时用 any 承载，最终断言。
 */
export function normalizeRoutesMeta(
  routes: Readonly<RouteRecordRaw[]>,
  defaults: Record<string, any> = {},
): RouteRecordRaw[] {
  const normalizeMeta = (meta: any): any => {
    const m = meta || {}
    // 复杂逻辑：别名归一（旧 -> 新）
    const hideInMenuAliased = m.hideInMenu ?? m.hiddenInMenu ?? false
    const rawOrder = m.order ?? m.orderIndex
    // 复杂逻辑：order 类型修正（字符串数值→数值；默认 99）
    const orderNum =
      typeof rawOrder === 'number'
        ? rawOrder
        : typeof rawOrder === 'string' && !Number.isNaN(Number(rawOrder))
          ? Number(rawOrder)
          : 99
    // 复杂逻辑：合并默认值 → 再覆盖 → 再应用归一结果
    const normalized: any = {
      ...defaults,
      ...m,
      hideInMenu: hideInMenuAliased === true,
      order: orderNum,
    }
    // 复杂逻辑：删除旧键，避免后续消费方误用
    delete normalized.orderIndex
    delete normalized.hiddenInMenu
    return normalized
  }
  const walk = (nodes: Readonly<RouteRecordRaw[]>): RouteRecordRaw[] =>
    nodes.map((r) => {
      const { children, meta, ...rest } = r as any
      const base: any = {
        ...rest, // 保留原始 component/components/redirect/props...
        meta: normalizeMeta(meta), // 只处理 meta
      }
      if (Array.isArray(children) && children.length) {
        base.children = walk(children as Readonly<RouteRecordRaw[]>)
      }
      return base as RouteRecordRaw
    })
  return walk(routes)
}
export default normalizeRoutesMeta
```
---
## 文件 3：****`router/index.ts`
```ts
// router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import routesRaw from './routes' // 你的大路由表（默认导出或按你的写法导入）
import normalizeRoutesMeta from '@/utils/normalize-routes'
// 复杂逻辑：全局默认 meta（可按需调整）
const DEFAULT_META = {
  requiresAuth: true,
  renderMenu: true,
  order: 99,
}
// 复杂逻辑：创建“规范化后的路由表”，供 Router 与其它模块（如菜单）共用
export const routes: RouteRecordRaw[] = normalizeRoutesMeta(routesRaw, DEFAULT_META)
const router = createRouter({
  history: createWebHistory(),
  routes, // 使用规范化后的路由
  // 复杂逻辑：只作用于 window 的滚动，还可以配合你布局里的内部容器滚动复位
  scrollBehavior(_to, _from, saved) {
    if (saved) return saved
    return { left: 0, top: 0 }
  },
})
// 复杂逻辑：chunk 失败自动重试 + 刷新
router.onError((err) => {
  const msg = (err && (err as Error).message) || ''
  if (/Loading chunk \d+ failed|ChunkLoadError|dynamically imported module/i.test(msg)) {
    const { fullPath } = router.currentRoute.value
    router.replace(fullPath).catch(() => window.location.assign(fullPath))
  }
})
export default router
```
\> 说明
\>
\> - 我在这里****导出了** **`routes`********（已规范化），你的菜单 Store 直接 `import { routes } from '@/router'` 即可使用稳定的 meta。
\> - `routesRaw` 是你现有的****原始****路由定义（大文件）。导入方式按你实际工程调整（`export default` 或命名导出）。
---
## 文件 4：****`store/useMenuStore.ts`
```ts
// store/useMenuStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import type { MenuProps } from '@/types'
// 复杂逻辑：只从“路由单一出口”拿 routes（已规范化），避免二次处理与循环依赖
import { routes } from '@/router'
/** ========== 工具：路由→菜单 ========== */
// 复杂逻辑：是否在菜单中可见
const isVisibleInMenu = (r: RouteRecordRaw) => {
  const m = r.meta || {}
  if (m.hideInMenu === true) return false
  // 有标题或有子节点才允许出现在菜单
  return Boolean(m.title || (r.children && r.children.length > 0))
}
// 复杂逻辑：排序值（已在 normalize 中归一到 meta.order）
const getOrder = (r: RouteRecordRaw) =>
  Number.isFinite(r.meta?.order) ? Number(r.meta!.order) : 99
// 复杂逻辑：菜单展示文本（优先 meta.title，其次根据 name 生成 i18n key）
const getLabel = (r: RouteRecordRaw) => (r.meta?.title as string) || `menu.${String(r.name || '')}`
// 复杂逻辑：菜单图标（优先 meta.icon）
const getIcon = (r: RouteRecordRaw) => r.meta?.icon as MenuProps['icon'] | undefined
// 复杂逻辑：子节点中过滤掉隐藏项
const getVisibleChildren = (r: RouteRecordRaw) => (r.children || []).filter(isVisibleInMenu)
// 复杂逻辑：只有一个子节点时扁平化（避免多余的分组层级）
const flattenIfSingle = (item: MenuProps) => {
  if (item.children && item.children.length === 1) return item.children[0]
  return item
}
function buildMenu(nodes: RouteRecordRaw[]): MenuProps[] {
  const list = nodes
    .filter(isVisibleInMenu)
    .map<MenuProps>((r) => {
      const children = getVisibleChildren(r)
      const item: MenuProps = {
        key: String(r.name || r.path),
        label: getLabel(r),
        orderIndex: getOrder(r),
      }
      const icon = getIcon(r)
      if (icon) item.icon = icon
      if (children.length) item.children = buildMenu(children)
      return flattenIfSingle(item)
    })
    .sort((a, b) => a.orderIndex - b.orderIndex)
  return list
}
/** ========== 精确定位两个菜单分区 ========== */
// 复杂逻辑：公共区——以根路由 name === 'root' 的 children 作为左侧菜单来源
const PUBLIC_CHILDREN: RouteRecordRaw[] = (() => {
  const root = routes.find((r) => r.name === 'root')
  return root?.children ?? []
})()
// 复杂逻辑：IB 管理后台——顶层 name === 'introducing-broker' 的 children 作为 IB 菜单来源
const IB_CHILDREN: RouteRecordRaw[] = (() => {
  const ib = routes.find((r) => r.name === 'introducing-broker')
  return ib?.children ?? []
})()
/** ========== Store ========== */
export const useMenuStore = defineStore('menu', () => {
  const sideMenuList = ref<MenuProps[]>([])
  const ibMenuList = ref<MenuProps[]>([])
  const inited = ref(false)
  // 复杂逻辑：一次性从路由树构建两套菜单（公共区 + IB 区）；避免重复构建
  async function loadMenuData() {
    if (inited.value) return
    try {
      sideMenuList.value = buildMenu(PUBLIC_CHILDREN)
      ibMenuList.value = buildMenu(IB_CHILDREN)
      inited.value = true
    } catch (error) {
      console.error('[menu] 加载菜单数据失败:', error)
      sideMenuList.value = []
      ibMenuList.value = []
    }
  }
  function reset() {
    sideMenuList.value = []
    ibMenuList.value = []
    inited.value = false
  }
  return {
    sideMenuList,
    ibMenuList,
    inited,
    loadMenuData,
    reset,
  }
})
export default useMenuStore
```
---
## 路由定义里的** **`meta`** **写法（示例一行）
\> 你的大 `routes.ts` 文件无需重写；只要****慢慢把旧键换成新键****即可。
\> 下面是****一个****示例路由写法（其他保持原样即可）：
```ts
{
  path: 'dashboard',
  name: '(public).dashboard',
  component: () => import('@/views/(public)/dashboard/page.vue'),
  meta: {
    title: 'menu.dashboard',   // ← 标题（或 i18n key）
    icon: 'icon-menu.dashboard',
    order: 0,                  // ← 用 order；旧的 orderIndex 会被 normalize 自动转过来
    hideInMenu: false,         // ← 用 hideInMenu；旧的 hiddenInMenu 会被 normalize 自动转过来
    requiresAuth: true,
  },
}
```
---
# 这样改完后，你得到的好处
- ****全局一致的** **`meta`** **形状****：后续“路由→菜单/权限/埋点”等逻辑都变得稳定可预测。
- ****老数据无痛兼容****：`orderIndex`、`hiddenInMenu` 仍可存在于历史路由；运行期会被自动映射。
- ****避免** **`structuredClone`** **坑位****：不再因为懒加载函数被克隆而抛 `DataCloneError`。
- ****菜单构建只做一次****，性能更稳；所有消费方都用同一份规范化的路由数据。
如果你希望我****顺手把你现在的大** **`routes.ts`** **里两三个代表性路由****改成新 `meta` 写法，我可以给你****只需替换的片段****。

:::
