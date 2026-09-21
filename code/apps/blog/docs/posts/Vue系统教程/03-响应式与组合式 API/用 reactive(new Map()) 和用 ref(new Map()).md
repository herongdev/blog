---
title: "用 reactive(new Map()) 和用 ref(new Map())"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "响应式与组合式 API"
description: "在 Vue 3 的响应式系统里，用 reactive(new Map()) 和用 ref(new Map()) 看似都能“包裹”一个 Map，但二者在拦截、依赖收集、触发更新等方面有本质区别： 一、底层原理对比 特性 reactive(new Map()) ref(new Map。"
sidebarWeight: 155
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/响应式问题/用 reactive(new Map()) 和用 ref(new Map()).md"
---
::: v-pre

# 用 reactive(new Map()) 和用 ref(new Map())

> 本节目标：理解“用 reactive(new Map()) 和用 ref(new Map())”的核心思路，并能把它用于实际开发或面试表达。
在 Vue 3 的响应式系统里，用 reactive(new Map()) 和用 ref(new Map()) 看似都能“包裹”一个 Map，但二者在拦截、依赖收集、触发更新等方面有本质区别：

**一、底层原理对比**

|   |   |   |
|---|---|---|
|**特性**|**reactive(new Map())**|**ref(new Map())**|
|包装方式|深度代理，将传入对象「递归」变成 Proxy|将整个值（包括对象）封装到 .value，但内部对象不是递归代理|
|拦截方式|通过 Proxy 针对对象所有操作（属性读/写、方法调用、迭代）做劫持
并对 Map 的 .get/.set/.delete/forEach/keys/values/entries 等做了专门的响应式处理（“集合类型”专门 instrumentations）|只对 .value 的读写做拦截
对 .value 本身赋新引用时触发依赖更新
**不**会自动拦截 .value（即 Map 本身）的内部修改|
|依赖收集|任何对 Map 方法的调用（get/set/delete/has、迭代、访问 size）都会被 track 住，只要后续某条 map.set(...) 或者 .delete(...)，对应的依赖就会触发更新|只有当你做 ref.value = 新 Map 时，依赖才会触发
对 ref.value.set(...)、delete 等内部修改**不会**触发响应|
|更新触发|map.set(key, val)、map.delete(key)、map.clear() 等都会触发相应的 effect 重跑|必须显式替换引用：ref.value = newMap 才会触发
对 ref.value 内部的操作无感知|
|适用场景|需要「对 Map 内部读写都响应」的场景，比如增量更新
可以直接 reactive(new Map())，用 .set() / .delete() 更新即可自动刷新视图|仅在「整块替换」Map 时用得上，比如你一次性拿到新 Map 要直接换过去
不适合频繁的增删改场景|

**二、示例对比**
**1. reactive(new Map())**
import \{ reactive, computed \} from 'vue'
const store = \{ orders: reactive(new Map\<number, Order\>())\}
// 组件里const allOrders = computed(() =\> Array.from(store.orders.values()))
// 往里加一条 → 视图马上更新store.orders.set(123, \{ /* ... */ \})
// 删除一条 → 也会更新store.orders.delete(123)

- 因为 orders 是 Proxy，当你调用 .set()、.delete() 后，Vue 会检测到“集合类型”的变更，自动触发依赖 allOrders 的 computed/模板重算。

**2. ref(new Map())**
import \{ ref, computed \} from 'vue'
const store = \{ orders: ref(new Map\<number, Order\>())\}
// 组件里const allOrders = computed(() =\> Array.from(store.orders.value.values()))
// 这样做**不会**更新视图：store.orders.value.set(123, \{ /* ... */ \})
// 必须整体替换才会：store.orders.value = new Map([[123, \{/*...*/\}]])

- .value.set(...) 并不会触发任何依赖，因为 Vue 只监控对 .value 属性的赋值操作。

**三、性能与选择**

- 如果你的业务是「**频繁增删改**」一个 Map（比如订单不断进来、取消），用 reactive(new Map()) 最方便：只要 .set()/.delete()，就会响应式更新，性能好、代码简洁。
- 如果你仅仅是在某个时刻「**一次性拿到全量 Map**」然后替换，且之后不再做内部频繁修改，用 ref(new Map()) 然后 $patch 或直接 .value = newMap 会更简洁，也不会多拦截多消耗。

一般金融交易这种「增量事件驱动」场景，**推荐**用 reactive(new Map())，保证每一次事件（下单、改单、撤单）都能被 Vue 真正拦截并触发更新。

:::
