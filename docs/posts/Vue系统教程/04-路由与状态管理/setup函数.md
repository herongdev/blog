---
title: "setup函数"
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
description: "在 Pinia 中，​ 同一个 Store 只会被初始化一次 ，即使你在多个页面中多次引入并调用 useCountryStore() ，​ 箭头函数内部的逻辑不会重复执行 。以下是详细解释： 1. ​ Pinia Store 的单例特性 Pinia 的 Store 是 全局单例。"
sidebarWeight: 102
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/数据流/setup函数.md"
---
::: v-pre

# setup函数

> 本节目标：理解“setup函数”的核心思路，并能把它用于实际开发或面试表达。
==在 Pinia 中，​==**同一个 Store 只会被初始化一次**==，即使你在多个页面中多次引入并调用== ==useCountryStore()====，​==**箭头函数内部的逻辑不会重复执行**==。以下是详细解释：==

**1. ​****Pinia Store 的单例特性**
==Pinia 的 Store 是==**全局单例**==的：==

- ==第一次调用== ==useCountryStore()== ==时，Pinia 会执行传入的== ==setup== ==函数（即你的箭头函数），初始化 Store 的状态（====data====、====loading====、====fetchData====）。==
- ==后续在任何页面/组件中调用== ==useCountryStore()====，Pinia 会直接返回==**已创建的 Store 实例**==，​==**不会重新执行箭头函数**==。==

**示例代码验证：**

==javascript==
==复制==
_// 页面A_======const== ==storeA== ===== ==useCountryStore====();========console====.====log====(storeA.data);== _// 第一次初始化，执行箭头函数_====
_// 页面B_======const== ==storeB== ===== ==useCountryStore====();========console====.====log====(storeB.data);== _// 直接返回已有的 storeA，不会执行箭头函数_====
==console====.====log====(storeA== ======= ==storeB);== _// true，同一个实例_

**2. ​**useFetchListData 的行为****
==如果== ==useFetchListData== ==是一个自定义 Hook（如基于== ==useFetch== ==或== ==axios== ==的封装）：==

- ==​==**首次调用** **useCountryStore()** **时**==：====useFetchListData== ==会执行，发起网络请求（如== ==fetchData== ==被调用）。==
- ==​==**后续调用** **useCountryStore()** **时**==：====useFetchListData== ==​==**不会重复执行**==，因为 Store 已经初始化完成，直接复用已有的== ==data====、====loading== ==和== ==fetchData== ==方法。==

**关键点：**

- ==​**====data== ==和== ==loading== ==是响应式状态**：它们会被 Pinia 持久化，跨组件共享。==
- ==​**====fetchData== ==方法是稳定的**：多次调用== ==store.fetchData()== ==会触发请求，但方法本身不会重复创建。==
**3. ​****需要警惕的边界情况**
==虽然 Store 是单例的，但以下场景可能导致意外行为：==
**​**(1) 动态修改 url****
==如果你的== ==useFetchListData== ==的== ==url== ==是动态的（例如从参数传入），需要在 Store 外部维护状态：==

==javascript==
==复制==
==const== ==useCountryStore== ===== ==defineStore====(===='country'====, ()== ===\>== ==\{====== ==const== ==url== ===== ==ref====(===='/new-api/pub/get_country'====);== _// 将 url 转为响应式_==== ==const== ==\{ loading, data, fetchData \}== ===== ==useFetchListData====(\{== ==url====:== ==url.value \});======
==return== ==\{ data, loading, fetchData \};========\});==
**​**(2) Store 被卸载后重新挂载****
==Pinia Store 默认是持久化的，但如果手动调用== ==$dispose()== ==或页面强制刷新，Store 会被销毁，下次调用== ==useCountryStore()== ==时会重新初始化。==

**4. ​****最佳实践建议**
**​**(1) 明确数据加载时机****

- ==在应用入口（如== ==App.vue====）或路由守卫中提前调用== ==store.fetchData()====，避免多页面重复请求。==
- ==如果数据需要实时更新，可以在== ==fetchData== ==中增加逻辑：============javascript========复制========const== ==fetchData== ===== ==async== ==()== ===\>== ==\{====== ==if== ==(====Date====.====now====()== ==-== ==lastFetchTime== ==\>== ==60_000====) \{== _// 60秒缓存_==== ==await== ==doFetch====();====== ==\}========\};==

**​**(2) 使用 storeToRefs 解构****
==在组件中解构 Store 时，使用== ==storeToRefs== ==保持响应性：==

==javascript==
==复制==
==import== ==\{ storeToRefs \}== ==from== =='pinia'====;======
==const== ==store== ===== ==useCountryStore====();========const== ==\{ data, loading \}== ===== ==storeToRefs====(store);== _// 保持响应式_

**总结**

- ==​==**不会重复执行**==：多次调用== ==useCountryStore()== ==不会重复执行箭头函数内部的逻辑。==
- ==​==**共享同一份状态**==：所有组件访问的是同一个 Store 实例，状态自动同步。==
- ==​==**注意方法调用**==：====fetchData()== ==方法可以被多次调用（触发请求），但方法本身是稳定的。==

==如有其他边界场景，可以提供更多代码细节进一步分析！==
 \> 来自 \<[https://yuanbao.tencent.com/chat/naQivTmsDa/c7b22caa-07c3-42e3-b382-8d6c298d5c4c](https://yuanbao.tencent.com/chat/naQivTmsDa/c7b22caa-07c3-42e3-b382-8d6c298d5c4c)\>
             \> 来自 \<[https://yuanbao.tencent.com/chat/naQivTmsDa/c7b22caa-07c3-42e3-b382-8d6c298d5c4c](https://yuanbao.tencent.com/chat/naQivTmsDa/c7b22caa-07c3-42e3-b382-8d6c298d5c4c)\>

:::
