---
title: "Pinia “放外面 vs. 放里面” 决策全攻略"
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
description: "\\ 以注册弹窗组件 ( registerModal ) 为例，讲透 模块作用域 和 Store 内 两种写法的利弊、适用场景与实现细节。 Pinia 弹窗注册两种写法关键代码 1. 模块作用域（放外面） // src/stores/modalManager.ts import \\。"
sidebarWeight: 2
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/pinia/Pinia “放外面 vs. 放里面” 决策全攻略.md"
---
::: v-pre

# Pinia “放外面 vs. 放里面” 决策全攻略

> 本节目标：理解“Pinia “放外面 vs. 放里面” 决策全攻略”的核心思路，并能把它用于实际开发或面试表达。
\> 以注册弹窗组件 (`registerModal`) 为例，讲透 ****模块作用域**** 和 ****Store 内**** 两种写法的利弊、适用场景与实现细节。

# Pinia 弹窗注册两种写法关键代码
## 1. 模块作用域（放外面）
// src/stores/modalManager.ts
import \{ markRaw \} from 'vue'
// 注册表 —— 模块级单例
const registry: Record\<string, any\> = \{\}
/** 在业务模块里调用，注册自己的弹窗组件（幂等） */
export function registerModal(type: string, comp: any) \{
  if (!registry[type]) registry[type] = markRaw(comp)
\}
/** ModalHost 渲染时按 type 取组件 */
export function getModalComp(type: string) \{
  return registry[type]
\}

## 2. Store 内部（放里面）
// src/stores/modalManager.ts
import \{ defineStore \} from 'pinia'
import \{ markRaw \} from 'vue'
export const useModalManagerStore = defineStore('modal', () =\> \{
  // 非响应式注册表，避免被 Devtools 追踪 / 序列化
  const registry = markRaw\<Record\<string, any\>\>(\{\})
  /** 在业务模块里调用，注册自己的弹窗组件（幂等） */
  function registerModal(type: string, comp: any) \{
    if (!registry[type]) registry[type] = comp
  \}
  /** ModalHost 渲染时按 type 取组件 */
  function getModalComp(type: string) \{
    return registry[type]
  \}
  return \{
    // 其它 open / close API ...
    registerModal,
    getModalComp,
  \}
\})

### 2. 评估维度 & 对比表
|   |   |   |
|---|---|---|
|**维度**|**放 外面（模块级）**|**放 里面（Store 级）**|
|**生命周期**|只要文件被一次 import 就存在；与 Pinia 无关|必须先 useStore()，才会创建实例|
|**响应式 / 序列化**|纯普通对象，不被 Vue Proxy 追踪；无需 state|默认非响应式（放函数作用域），安全；若误放进 state 会被 Proxy & Devtools 追踪，可能报序列化警告|
|**注册时机**|**任意时机**：可在根实例创建前注册|只能在 Pinia 安装后、组件 setup() 内或之后注册|
|**循环依赖风险**|小（只是简单工具函数）|store 内 import 同业务组件，容易出现循环引用|
|**懒加载能力**|import() 组件 → 自然分包|若静态 import 组件，跟 store 打进同一 chunk；需 defineAsyncComponent 才能拆包|
|**IDE 补全**|registerModal() 需手动 import|所有 API 都挂在 store，modalStore.registerModal() 补全友好|
|**单元测试**|直接调用函数即可，不必 mock Pinia|需创建 Pinia 容器、拿 store|
|**团队规范**|偏向“工具”风格，store 更干净|所有相关 API 收敛一处，易查找|

### 3. 决策指南
|   |   |
|---|---|
|**场景问题**|**建议**|
|**注册操作要在 Pinia 初始化之前执行吗？**（如入口脚本、插件注入）|**放外面**|
|**需要按路由懒加载（首屏包最小化）吗？**|两者都可，
但放外面 + import() 更自然|
|**团队规定“所有状态/API 都集中到 store”吗？**|**放里面**，但 registry 必须 markRaw 且别放 state|
|**业务组件数量多，担心循环依赖？**|**放外面** 可降低循环引用概率|
|**更重视 IDE 补全 vs. 灵活注册时机？**|补全：**放里面**；
灵活：**放外面**|

### 4. 实现要点 & 细节坑
|   |   |   |
|---|---|---|
|**要点**|**放外面的写法**|**放里面的写法**|
|**幂等注册**|模块作用域天然单例；只需 if (!registry[type])|可能会热更新多次调用 useStore() → 建 installed 标记或在模块作用域注册|
|**markRaw**|建议（非必须）|**必须**，否则 Vue Proxy 会包裹组件对象|
|**类型文件**|可以写 `export type ModalType = 'openOrder'|'alert'` 用于校验|
|**测试**|registerModal('x', Dummy) 即可|需 createPinia() + setActivePinia()|

### 5. 两种写法的混搭策略（大厂通用）
1. ****公共/基础弹窗****
   - 静态注册在 `modalManager` 顶部（放外面），保证任何页面随时可用。
2. ****仅业务域使用的弹窗****
   - 在业务页面或 `registerModals.ts` 内调用 `registerModal`（外部写法即可）；
     或封装成 `store.registerModal()`（内部写法）。
3. ****统一调用****
   - 页面只需 `await modalStore.open(type, payload)`，对注册位置无感知。

### 6. 代码示例：同时支持两种注册方式
/* modalManager.ts */
import \{ defineStore \} from 'pinia'
import \{ markRaw \} from 'vue'
const registry: Record\<string, any\> = \{\}
export function registerModal(type: string, comp: any) \{
  if (!registry[type]) registry[type] = markRaw(comp)
\}
export function getModalComp(type: string) \{
  return registry[type]
\}
export const useModalManagerStore = defineStore('modal', () =\> \{
  /* --- 弹窗栈逻辑省略，与前述一致 --- */
  /* 也暴露同名 API，内部只是代理外部函数 */
  function register(type: string, comp: any) \{
    registerModal(type, comp)
  \}
  return \{ modals, open, _close, register, getModalComp \}
\})

\> - ****想在页面顶层注册****：
\>   import \{ registerModal \} from '@/stores/modalManager'
\>   registerModal('openOrder', Comp)
\>
\> - ****想在组件** **`setup`** **内注册****：
\>   const modal = useModalManagerStore()
\>   modal.register('openOrder', Comp)

## ** **✨** **结论
- ****无绝对优劣****：外部更灵活、性能友好；内部更集中、IDE 友好。
- ****实践建议****：
  1. ****Registry 放外部****作为默认；
  2. 如团队风格要求，也可在 store 再包一层代理方法，兼顾两种调用习惯；
  3. 别把组件对象放 `state`，务必 `markRaw`，避免序列化 / Proxy 开销。

:::
