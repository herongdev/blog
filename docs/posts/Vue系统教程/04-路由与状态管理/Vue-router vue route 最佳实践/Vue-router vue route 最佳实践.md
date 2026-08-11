---
title: "Vue-router vue route 最佳实践"
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
description: "0. 推荐目录结构（小中型项目） \\ 说明：你说 项目较小暂不拆分 也没问题，文件可先集中在 router/ 下；核心是把“职责”理清（routes 定义、meta 规范化、守卫、菜单）。 1. 给 meta 立规范（TS 模块扩展） 思路 Vue Router 对 meta 不。"
sidebarWeight: 15
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vueRouter/Vue-router vue route 最佳实践/Vue-router vue route 最佳实践.md"
---
::: v-pre

# Vue-router vue route 最佳实践

> 本节目标：理解“Vue-router vue route 最佳实践”的核心思路，并能把它用于实际开发或面试表达。
# 0. 推荐目录结构（小中型项目）
```
src/
  router/
    index.ts                 # 创建 Router、注册守卫、滚动/Chunk 错误处理
    routes.ts                # 你的原始路由定义（rawRoutes）
    guards/
      index.ts               # 汇总 before/after/beforeResolve 守卫
      auth.ts                # 登录判断/回跳
      permission.ts          # 角色/权限判断
      prefetch.ts            # 数据预取（beforeResolve）
      phone-verify.ts        # 登录后手机号验证弹窗开关（可选）
  utils/
    normalize-routes.ts      # 只规范化 meta（默认值/别名归一/类型修正）
  store/
    useMenuStore.ts          # 路由 -> 菜单（基于“声明顺序”）
  types/
    router.d.ts              # 扩展 RouteMeta，给 meta 立规范
```
\> 说明：你说****项目较小暂不拆分****也没问题，文件可先集中在 `router/` 下；核心是把“职责”理清（routes 定义、meta 规范化、守卫、菜单）。
---
# 1. 给** **`meta`** **立规范（TS 模块扩展）
****思路****
Vue Router 对 `meta` 不做限制，但团队协作需要****统一字段****并有 TS 校验提示。我们用****模块扩展****方式为 `RouteMeta` 立规范。
****步骤****
- 新建（或合并到已有 ambient d.ts）`types/router.d.ts`；
- 声明我们使用的 `meta` 字段（菜单、鉴权、其它）。
### 文件：****`types/router.d.ts`
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
    hideInMenu?: boolean
    sidebarCollapsed?: boolean
    /** 运行时需求示例（你项目里已有） */
    requiresAccountData?: boolean
    skipPhoneVerify?: boolean
    /** 兼容旧字段：normalize 时会转义，运行期尽量不用它们 */
    orderIndex?: number | string
    hiddenInMenu?: boolean
    order?: number | string
  }
}
```
---
# 2. 定义路由（404 / redirect / 分组 / meta）
****思路****
- 用****一棵 routes 树****表达所有页面；
- `/:pathMatch(.*)*` 映射 404；
- `/redirect` 做****可靠的回跳****（从登录页/权限拦截跳回原深链）；
- 公共区建议以 `root` 为根（你的现状一致）；IB 后台放顶层 `/introducing-broker`；用户登录页 `/user` 标记 `meta.public = true`；
- `meta` 只放“渲染/权限相关”的关键信息。
****步骤****
- 你原有 `rawRoutes` 可以沿用，仅适度补 `meta.title`（菜单友好），其它不强求。
### 文件（节选）：****`router/routes.ts`
\> 你已维护了大文件，下面仅给“关键示例”（同类保持一致即可）。
```ts
// router/routes.ts
import type { RouteRecordRaw } from 'vue-router'
export const rawRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: () => import('@/views/(public)/layout.vue'),
    children: [
      // 仪表板
      {
        path: 'dashboard',
        name: '(public).dashboard',
        component: () => import('@/views/(public)/dashboard/page.vue'),
        meta: {
          title: 'menu.dashboard', // 建议补充，菜单更友好
          // 不再依赖 order/orderIndex 排序，菜单改用“声明顺序”
        },
      },
      // ……你的其余 (public) 子路由照旧
    ],
  },
  // IB 管理后台
  {
    path: '/introducing-broker',
    name: 'introducing-broker',
    component: () => import('@/views/introducing-broker/layout.vue'),
    children: [
      {
        path: '',
        name: 'introducing-broker.home',
        component: () => import('@/views/introducing-broker/page.vue'),
      },
      // ……其余 IB 子路由
    ],
  },
  // 登录页
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/page.vue'),
    meta: { public: true }, // 登录页对未登录用户开放
  },
  // 重定向页（可靠回跳）
  {
    path: '/redirect',
    name: 'redirect',
    component: () => import('@/views/redirect/page.vue'),
    meta: { public: true }, // 重定向页本身不拦截
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/page.vue'),
    meta: { public: true },
  },
]
export default rawRoutes
```
---
# 3. 规范化** **`meta`****（默认值 + 旧键别名归一）
****思路****
- ****不要**** `structuredClone`（会克隆函数抛错）；
- 只处理 `meta`：合并默认值、兼容旧键（`hiddenInMenu`→`hideInMenu`，`orderIndex`→`order`）、修正类型（字符串数值→数值）；
- 其他属性（`component/beforeEnter/props`）****保持原引用****。
****步骤****
- 新建 `utils/normalize-routes.ts`；
- 在创建 Router 前调用一次，把“规范化后的 routes”导出供全局使用（菜单等也用它）。
### 文件：****`utils/normalize-routes.ts`
```ts
// utils/normalize-routes.ts
import type { RouteRecordRaw } from 'vue-router'
export function normalizeRoutesMeta(
  routes: Readonly<RouteRecordRaw[]>,
  defaults: Record<string, any> = {},
): RouteRecordRaw[] {
  const normalizeMeta = (meta: any): any => {
    const m = meta || {}
    // 复杂逻辑：别名归一（旧 -> 新）
    const hideInMenuAliased = m.hideInMenu ?? m.hiddenInMenu ?? false
    const rawOrder = m.order ?? m.orderIndex
    // 复杂逻辑：类型修正（字符串数值→数值；order 仅保留，菜单不再依赖它）
    const toNum = (v: any, fallback = 99) => {
      if (typeof v === 'number') return v
      if (typeof v === 'string' && !Number.isNaN(Number(v))) return Number(v)
      return fallback
    }
    const normalized: any = {
      ...defaults, // 复杂逻辑：全局默认 meta（如 requiresAuth: true）
      ...m, // 复杂逻辑：原值覆盖默认
      hideInMenu: hideInMenuAliased === true,
      order: toNum(rawOrder, 99),
    }
    delete normalized.orderIndex
    delete normalized.hiddenInMenu
    return normalized
  }
  const walk = (nodes: Readonly<RouteRecordRaw[]>): RouteRecordRaw[] =>
    nodes.map((r) => {
      const { children, meta, ...rest } = r as any
      const base: any = {
        ...rest, // 保留 component / redirect / props / beforeEnter 等
        meta: normalizeMeta(meta),
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
# 4. 创建 Router（滚动、Chunk 错误恢复、注册守卫）
****思路****
- `scrollBehavior`：返回上次保存位置或滚到顶；
- `router.onError`：懒加载 Chunk 丢失（发布升级中用户停留旧页）自动重试/刷新；
- 在这里一次性****注册 before/after/beforeResolve 守卫****。
### 文件：****`router/index.ts`
```ts
// router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import rawRoutes from './routes'
import normalizeRoutesMeta from '@/utils/normalize-routes'
import guards from './guards'
// 复杂逻辑：全局默认 meta（可按需调整）
const DEFAULT_META = { requiresAuth: true }
export const routes: RouteRecordRaw[] = normalizeRoutesMeta(rawRoutes, DEFAULT_META)
const router = createRouter({
  history: createWebHistory(),
  routes,
  // 复杂逻辑：滚动行为——返回浏览器保存位置或回到顶部
  scrollBehavior(_to, _from, saved) {
    if (saved) return saved
    return { left: 0, top: 0 }
  },
})
// 复杂逻辑：Chunk 加载失败（发布期间常见）→ 尝试重载当前路由；失败则整页刷新
router.onError((err) => {
  const msg = (err && (err as Error).message) || ''
  if (/Loading chunk \d+ failed|ChunkLoadError|dynamically imported module/i.test(msg)) {
    const { fullPath } = router.currentRoute.value
    router.replace(fullPath).catch(() => window.location.assign(fullPath))
  }
})
// 注册守卫
guards.before.forEach(router.beforeEach)
guards.after.forEach(router.afterEach)
guards.resolve.forEach(router.beforeResolve)
export default router
```
---
# 5. 路由守卫（登录/回跳、权限、数据预取、手机验证）
****最佳实践****
- ****beforeEach****：做“快且可判定”的事情：登录态判断、白名单、回跳；
- ****beforeResolve****：做“可能需要 `await`”的事情：数据预取、按需初始化；
- ****afterEach****：统计/埋点/清理 loading，不影响导航；
- 守卫****小而专****：一个守卫只负责一件事，便于组合与调试。
### 聚合：****`router/guards/index.ts`
```ts
// router/guards/index.ts
import type { NavigationGuard } from 'vue-router'
import authGuard from './auth'
import permissionGuard from './permission'
import prefetchGuard from './prefetch'
import phoneVerifyGuard from './phone-verify'
const before: NavigationGuard[] = [
  authGuard,
  permissionGuard,
  phoneVerifyGuard, // 可选：仅当开启手机号验证时
]
const resolve: NavigationGuard[] = [prefetchGuard]
const after: Array<(to: any, from: any) => void> = [
  // 复杂逻辑：示例——简单埋点
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (to, from) => {
    // window.gtag?.('event', 'page_view', { page_path: to.fullPath })
  },
]
export default { before, resolve, after }
```
### 登录/回跳：****`router/guards/auth.ts`
```ts
// router/guards/auth.ts
import type { NavigationGuard } from 'vue-router'
import { useUserStore } from '@/store'
// 复杂逻辑：计算安全回跳地址（仅允许站内路径）
const getSafeRedirect = (toQuery?: any, fromQuery?: any): string | undefined => {
  const raw = (toQuery?.redirect as string) || (fromQuery?.redirect as string)
  if (!raw) return
  try {
    const url = decodeURIComponent(raw)
    // 复杂逻辑：仅允许以 / 开头的站内路径；避免开放重定向风险
    if (url.startsWith('/')) return url
  } catch {}
}
const LOGIN_ROUTE_NAME = 'user'
const DEFAULT_ROUTE_PATH = '/dashboard'
const authGuard: NavigationGuard = (to, from, next) => {
  const user = useUserStore()
  // 复杂逻辑：显式标记 public 的路由，无需鉴权
  if (to.meta.public === true) return next()
  if (user.isLoggedIn) {
    // 复杂逻辑：已登录访问登录页 -> 回跳 redirect 或默认页
    if (to.name === LOGIN_ROUTE_NAME) {
      const redirect = getSafeRedirect(to.query, from.query)
      return next(redirect ? { path: redirect } : { path: DEFAULT_ROUTE_PATH })
    }
    return next()
  }
  // 复杂逻辑：未登录 → 仅放行 public；否则跳登录并带回跳
  const redirect = encodeURIComponent(to.fullPath)
  return next({ name: LOGIN_ROUTE_NAME, query: { redirect } })
}
export default authGuard
```
### 权限控制（角色/权限）：****`router/guards/permission.ts`
```ts
// router/guards/permission.ts
import type { NavigationGuard } from 'vue-router'
import { useUserStore } from '@/store'
// 复杂逻辑：示例辅助——包含任一角色即通过
const hasAnyRole = (userRoles: string[] = [], need: string[] = []) =>
  need.length === 0 || need.some((r) => userRoles.includes(r))
// 复杂逻辑：示例辅助——包含所有权限才通过
const hasAllPermissions = (
  userPerms: Array<string | number> = [],
  need: Array<string | number> = [],
) => need.length === 0 || need.every((p) => userPerms.includes(p))
const permissionGuard: NavigationGuard = (to, _from, next) => {
  const user = useUserStore()
  // 复杂逻辑：无权限需求 → 放行
  if (!to.meta.roles && !to.meta.permissions) return next()
  // 复杂逻辑：从你的 userStore 映射角色/权限（按你的结构改）
  const roles: string[] = (user.userInfo?.role ? [user.userInfo.role] : []) as string[]
  const perms: Array<string | number> = [] // 如果你有权限集合，填入真实值
  if (!hasAnyRole(roles, to.meta.roles || [])) {
    return next({ name: 'not-found' }) // 或者跳 403 页面
  }
  if (!hasAllPermissions(perms, to.meta.permissions || [])) {
    return next({ name: 'not-found' })
  }
  return next()
}
export default permissionGuard
```
### 数据预取（按需）：****`router/guards/prefetch.ts`
```ts
// router/guards/prefetch.ts
import type { NavigationGuard } from 'vue-router'
import { useAccountStore, useUserStore } from '@/store'
// 复杂逻辑：beforeResolve —— 只在路由已确认、但进入组件前执行异步
const prefetchGuard: NavigationGuard = async (to, _from, next) => {
  try {
    const user = useUserStore()
    const account = useAccountStore()
    // 复杂逻辑：示例：进入“需要账户数据”的页面时，如果未就绪则初始化
    if (
      user.isLoggedIn &&
      to.meta.requiresAccountData &&
      !account.isLoaded &&
      !account.isInitializing
    ) {
      await account.init({ force: true, withExternal: true, withCategory: true })
    }
    next()
  } catch (e) {
    console.warn('[prefetch] 预取失败:', e)
    next() // 不阻断导航
  }
}
export default prefetchGuard
```
### 手机验证开关（基于 query 标记）：****`router/guards/phone-verify.ts`
\> 你当前是在 `(public)/layout.vue` 里监听 `?phone_verify=0` 来弹窗。以下守卫用于****确保已登录且未验证时自动带上该标记****（除非某些页面通过 `meta.skipPhoneVerify = true` 跳过）。
```ts
// router/guards/phone-verify.ts
import type { NavigationGuard } from 'vue-router'
import { useUserStore } from '@/store'
const phoneVerifyGuard: NavigationGuard = (to, from, next) => {
  const user = useUserStore()
  // 复杂逻辑：未登录或已验证或明确跳过 → 放行
  if (
    !user.isLoggedIn ||
    user.userInfo?.phone_verify === true ||
    to.meta.skipPhoneVerify === true
  ) {
    return next()
  }
  // 复杂逻辑：已含标记 → 放行（组件内 watch 负责弹窗）
  if (to.query.phone_verify === '0') return next()
  // 复杂逻辑：追加标记但不改变路径（只变 query），触发页面内的弹窗逻辑
  return next({
    name: String(to.name || ''),
    params: to.params,
    query: { ...to.query, phone_verify: '0' },
  })
}
export default phoneVerifyGuard
```
---
# 6. 路由 → 菜单（使用“声明顺序”）
****思路****
- 你希望****不再维护 order****，直接按****路由声明顺序****展示；
- 只过滤 `hideInMenu`；
- 菜单项****有 component 或存在可见子项****才展示；
- ****单子节点扁平化****（避免多一层分组）；
- 公共区菜单来自 `root.children`；IB 菜单来自顶层 `introducing-broker.children`；
- ****动态取 children**** 防止初始化竞态；****只构建一次****（`inited`）。
### 文件：****`store/useMenuStore.ts`
```ts
// store/useMenuStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import type { MenuProps } from '@/types'
import { routes } from '@/router'
/** ========= 工具函数 ========= */
// 复杂逻辑：菜单可见性——只看 hideInMenu/hiddenInMenu；有页面(component)或存在“可见子项”才展示
const isVisibleInMenu = (route: RouteRecordRaw): boolean => {
  const meta = route.meta || {}
  if (meta.hideInMenu === true || (meta as any).hiddenInMenu === true) return false
  const hasVisibleChild = (route.children || []).some((c) => isVisibleInMenu(c))
  return Boolean((route as any).component || hasVisibleChild)
}
// 复杂逻辑：菜单文案优先 meta.title；没有则退化到基于 name 的 i18n key
const getLabel = (route: RouteRecordRaw) =>
  (route.meta?.title as string) || `menu.${String(route.name || '')}`
// 复杂逻辑：菜单图标优先 meta.icon；没有则回退到 icon-menu.${routeName}
const getIcon = (route: RouteRecordRaw) =>
  (route.meta?.icon as string) || (route.name ? `icon-menu.${String(route.name)}` : undefined)
// 复杂逻辑：仅保留“可见子项”
const getVisibleChildren = (route: RouteRecordRaw) =>
  (route.children || []).filter((c) => isVisibleInMenu(c))
// 复杂逻辑：只有一个子节点时扁平化，且把父级的顺序号沿用到子节点
const flattenIfSingle = (item: MenuProps): MenuProps => {
  if (item.children && item.children.length === 1) {
    const only = item.children[0]
    return { ...only, orderIndex: item.orderIndex }
  }
  return item
}
// 复杂逻辑：每次构建前动态获取“规范化后的”分区，避免初始化时序问题
const pickChildren = (name: string) =>
  (routes.find((r) => r.name === name)?.children ?? []) as RouteRecordRaw[]
// 复杂逻辑：按“路由声明顺序”构建菜单（不排序）；过滤隐藏项；单子节点扁平化
function buildMenu(nodes: RouteRecordRaw[]): MenuProps[] {
  const result: MenuProps[] = []
  let displayIndex = 0
  for (const r of nodes) {
    if (!isVisibleInMenu(r)) continue
    const children = getVisibleChildren(r)
    const item: MenuProps = {
      key: String(r.name || r.path),
      label: getLabel(r),
      orderIndex: displayIndex++, // 严格遵循“声明顺序”
    }
    const icon = getIcon(r)
    if (icon) item.icon = icon
    if (children.length) item.children = buildMenu(children)
    result.push(flattenIfSingle(item))
  }
  return result
}
/** ========= Store ========= */
export const useMenuStore = defineStore('menu', () => {
  const sideMenuList = ref<MenuProps[]>([])
  const ibMenuList = ref<MenuProps[]>([])
  const inited = ref(false)
  // 复杂逻辑：一次性从路由树构建两套菜单（公共区 + IB 区），完全使用“声明顺序”
  async function loadMenuData() {
    if (inited.value) return
    try {
      const publicChildren = pickChildren('root')
      const ibChildren = pickChildren('introducing-broker')
      sideMenuList.value = buildMenu(publicChildren)
      ibMenuList.value = buildMenu(ibChildren)
      inited.value = true
    } catch (error) {
      console.error('[menu] 加载菜单数据失败:', error)
      sideMenuList.value = []
      ibMenuList.value = []
      inited.value = false
    }
  }
  // 复杂逻辑：允许重建菜单（如登出/切换角色或语言后）
  function reset() {
    sideMenuList.value = []
    ibMenuList.value = []
    inited.value = false
  }
  return {
    inited,
    sideMenuList,
    ibMenuList,
    loadMenuData,
    reset,
  }
})
export default useMenuStore
```
---
# 7. 典型交互串：注册→自动登录→带手机号验证弹窗
****思路****
- 你的 `userStore.onSuccess()` 登录成功后已 `fetchUserInfo()`；
- ****守卫** **`phone-verify`******** 会在“已登录 + 未验证 + 未标记跳过”时为目标路由追加 `?phone_verify=0`；
- 在 `(public)/layout.vue` 中通过你现有的 `watch(route.query.phone_verify)` 弹出验证弹窗；
- 验证完成后****清除 query 标记****（你已有 `onPhoneVerifySuccess()`）。
\> 你已经有完整实现；守卫只是****确保任何入口****都能触发该弹窗，不需要“页面级判断分散在各处”。
---
# 8. 其它小贴士（可选）
- ****Scroll + 内部滚动容器****：如果你的主内容区用 `\<a-layout\>` 承载滚动，需要在****每次路由变化****后手动 `contentEl.scrollTo(0,0)`；`scrollBehavior` 只负责 `window` 滚动。
- ****动态添加路由****（模块化场景）：用 `router.addRoute(parentName, record)`，同时****记得同步更新菜单****（重新 `loadMenuData()`）。
- ****错误边界****：在懒加载组件的 `page.vue` 外层加一个“轻量错误边界”（`try/catch` 异常数据）+ 兜底空态比全局报错体验更好。
---
## ** **✅** **你可以直接落地的文件清单
1. `types/router.d.ts`（RouteMeta 规范）
2. `router/routes.ts`（你的 rawRoutes，保持现状，适度补 `meta.title`）
3. `utils/normalize-routes.ts`（只处理 meta，****不克隆函数****）
4. `router/guards/`（`auth.ts`、`permission.ts`、`prefetch.ts`、`phone-verify.ts`、`index.ts`）
5. `router/index.ts`（创建 Router、滚动、Chunk 错误恢复、注册守卫）
6. `store/useMenuStore.ts`（声明顺序 → 菜单）
---
需要我****把你现有的** **`(public)/layout.vue`******** 中的“手机号验证弹窗”那几段也做一次****精简/强化版替换片段****吗？我可以把 `watch` 逻辑、`onPhoneVerifySuccess/Close` 以及移动端抽屉、侧边栏折叠的细节顺手统一一下。

:::
