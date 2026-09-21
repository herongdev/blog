---
title: "Vue 3 中使用 Map 的响应式速查教程"
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
description: "1. Object.assign(exist, row) 会不会破坏响应性？ 对已存在的属性 exist 已经是由 reactive 创建出来的 Proxy 。给它赋值时，Proxy 的 set trap 会被触发，所以这些属性依然是可追踪的，模板或 watch 中用到这些键都会。"
sidebarWeight: 139
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/响应式问题/Vue 3 响应式 Map 全攻略/Vue 3 中使用 Map 的响应式速查教程.md"
---
::: v-pre

# Vue 3 中使用 Map 的响应式速查教程

> 本节目标：理解“Vue 3 中使用 Map 的响应式速查教程”的核心思路，并能把它用于实际开发或面试表达。
### 1.** **`Object.assign(exist, row)`** **会不会破坏响应性？
- ****对已存在的属性****
  `exist` 已经是由 `reactive` 创建出来的 ****Proxy****。给它赋值时，Proxy 的 `set` trap 会被触发，所以这些属性依然是可追踪的，模板或 `watch` 中用到这些键都会被更新。
- ****对新增的属性****
  Vue 3 的响应系统基于 ES Proxy，给原本没有的键做 `set` 同样会触发依赖（与 Vue 2 里要用 `Vue.set`/`this.$set` 不同）。唯一要注意的是：
  - ****模板**** 中如果之前没用到该键，Vue 没法「补」依赖——渲染过一次后才对这个新键建立依赖。
  - ****watch/computed**** 如果是按对象整体 (`() =\> obj`) 依赖，就会重新执行；如果是按具体键（`() =\> obj.someKey`）依赖，在首次依赖收集时就得保证 `someKey` 已经存在。
\> 结论：`Object.assign(exist, row)` ****可以安全使用****，不会破坏响应性，只需确保你插入 `Map` 时把 `row` 包一层 `reactive`（上一条回复已给出调整）。

### 2. Vue 3 中使用** **`Map`** **的响应式速查教程
|   |   |   |
|---|---|---|
|**需求**|**推荐做法**|**备注**|
|**创建**|const map = reactive(new Map())|只有 Map 本身被代理，value 需要自己处理|
|**写入**|map.set(key, reactive(value))|建议对 value 再 reactive()，保持深层更新|
|**读取 (模板/计算属性)**|Array.from(map.values()) / Array.from(map.entries())|for...of、扩展运算符同理|
|**监听条目新增/删除**|watch(map, () =\> \{/*…*/\}, \{ deep: true \}) 或在触发点自行逻辑|对 Map 用 deep: true 可以捕获 set/delete/clear|
|**监听 value 内部变化**|value 本身需是 reactive，对其属性直接改|不需要再对 Map 做额外操作|
|**批量更新**|map.forEach((v,k)=\>\{ /*修改 v.xxx*/ \})|修改内部字段即可；修改完不用 set|
|**删除**|map.delete(key)|触发依赖，视图更新|
|**清空**|map.clear()|同上|

#### 示例片段
```ts
import { reactive, computed, watch } from 'vue'
interface Order {
  TICKET: number
  PROFIT: number
}
const ordersMap = reactive(new Map<number, Order>())
// 新增
function addOrder(row: Order) {
  ordersMap.set(row.TICKET, reactive(row))
}
// 更新
function updateOrder(row: Order) {
  const exist = ordersMap.get(row.TICKET)
  if (exist) Object.assign(exist, row) // ✅ 保持响应性
}
// 计算属性：列表化
const ordersList = computed(() => [...ordersMap.values()])
// 监听 Map 结构变化（增删）
watch(ordersMap, () => console.log('size changed:', ordersMap.size), { deep: true })
// 监听单条订单盈亏变化
watch(
  () => ordersMap.get(123456)?.PROFIT,
  (newPl) => console.log('profit updated', newPl),
)
```
#### 常见坑 & 提示
1. ****不要在模板里直接迭代 Map****
   把它先转成数组：`v-for="order in ordersList"`。
2. ****深层对象一定要 reactive****
   `Map` 只代理键层级，不会自动深层递归。
3. ****遍历并批量赋值**** 不要重新 new Map；按需 `Object.assign` 或直接改属性即可，Vue 才能复用现有 Proxy，减少重渲染。
4. ****性能优化****：Map 很大时，可用 key 分段更新或拆分更细粒度的 store，避免一次性 diff 过多。
---
有了这些规则，你就可以在 Vue 3 中安全、高效地用 `Map` 存储并实时更新复杂数据结构。

:::
