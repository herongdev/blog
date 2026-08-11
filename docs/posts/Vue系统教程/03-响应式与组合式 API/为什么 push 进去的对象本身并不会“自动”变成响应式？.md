---
title: "为什么 push 进去的对象本身并不会“自动”变成响应式？"
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
description: "核心问题：ref 数组中的对象默认不是响应式的 1. ref 仅使数组本身响应式 ： 在 Vue 3 中，当你使用 ref 创建一个数组（如 unfoldList 和 foldList），ref 只会使数组本身（unfoldList.value）成为响应式。这意味着对数组的直接操。"
sidebarWeight: 148
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/响应式问题/为什么 push 进去的对象本身并不会“自动”变成响应式？.md"
---
::: v-pre

# 为什么 push 进去的对象本身并不会“自动”变成响应式？

> 本节目标：理解“为什么 push 进去的对象本身并不会“自动”变成响应式？”的核心思路，并能把它用于实际开发或面试表达。
**核心问题：ref 数组中的对象默认不是响应式的**

1. **ref 仅使数组本身响应式**：
    - 在 Vue 3 中，当你使用 ref 创建一个数组（如 unfoldList 和 foldList），ref 只会使数组本身（unfoldList.value）成为响应式。这意味着对数组的直接操作（例如 push、splice、赋值等）会触发响应式更新，但数组内每个元素的内部属性（如 newRow.CURRENT_PRICE）不会自动成为响应式的。
    - 具体来说，你在 init 函数中向 unfoldList.value 和 foldList.value 推入的对象（newRow 和 parent）是普通 JavaScript 对象（通过 \{ ...order \} 创建），这些对象没有被 Vue 的响应式系统（reactive 或 ref）包装，因此它们的属性变化不会被 Vue 追踪。
2. **对象属性的非响应式修改**：
    - 当你在 watch 中执行 matchedRow.CURRENT_PRICE = newPrice 时，matchedRow 是从 rowMap 或 unfoldList 中取出的对象。由于 matchedRow 本身不是响应式对象（即不是 reactive 创建的 Proxy），修改它的 CURRENT_PRICE 属性不会触发 Vue 的依赖收集和更新机制，因此页面不会重新渲染。
    - 即使 unfoldList 是 ref，Vue 只关心 unfoldList.value 的引用变化（例如数组被重新赋值或元素被添加/删除），而不关心数组内对象的属性变化。
3. **为什么添加对象到 ref 数组不自动使对象响应式**：
    - Vue 3 的响应式系统不会递归地将添加到 ref 数组中的对象自动转换为响应式对象。ref 的响应式作用范围仅限于它直接包裹的值（这里是数组本身）。如果要让数组中的对象也具有响应式特性，必须显式地将这些对象包装为 reactive 或 ref。

**核心问题：reactive 数组与其中对象的响应式**

1. **reactive 的响应式机制**：
    - 在 Vue 3 中，reactive 创建一个响应式代理（Proxy），它会深度跟踪对象的所有嵌套属性（包括数组的元素），但只对**初始存在的属性或元素**进行响应式处理。
    - 对于数组，reactive 使数组本身及其初始元素（如果它们是对象）成为响应式的。但如果你向数组中添加新的对象，这些新对象是普通 JavaScript 对象，除非你显式地用 reactive 包装它们，否则它们的属性变化不会被 Vue 跟踪。
2. **向 reactive 数组添加对象**：
    - 当你向 reactive 数组（如 unfoldList）添加一个普通对象（例如 \{ ...order, PL: newPL \}），这个对象的属性不是响应式的。添加操作本身（例如 push）会触发响应式更新，因为数组的长度或结构发生了变化，但新添加对象的内部属性（如 CURRENT_PRICE）的变化不会触发更新。
    - 这是因为 Vue 的 reactive 不会自动将新添加的对象转换为响应式对象。reactive 的响应式作用范围仅限于它直接包裹的对象或数组，以及这些对象/数组中**初始存在**的嵌套对象。
3. **与 ref 的区别**：
    - 使用 ref 创建数组（如 unfoldList = ref([])），ref 管理的是整个数组的引用，数组本身是响应式的，但数组内对象的属性需要单独处理为响应式（与 reactive 类似）。
    - 使用 reactive 创建数组（如 unfoldList = reactive([])），效果类似，但 reactive 直接返回一个响应式代理，无需 .value 访问。两者的关键点相同：新添加的对象需要显式包装为 reactive 才能使它们的属性响应式。

// ✅ 方案 1：入库时就包一层const newRow = reactive(\{ ...order, PL: newPL, isGroup: false,\})unfoldList.value.push(newRow)
**就算对象是响应式，为什么表格还是不刷新？**

1. **Ant-Design-Vue Table 的性能优化******它在 props.dataSource 上做了 _shallow compare_；如果数组引用没变，它假设“行引用也没变”→ 直接跳过整行渲染。
2. **子组件更新是逐层依赖收集******响应式行对象的 CURRENT_PRICE 改变会发射 _row 级别_ 的更新，但如果表格内部把行又转了一遍或做了缓存，依赖链就断了。
    - 改值 → 行自己是响应式
    - 新数组引用 → 让表格知道“数据源整体改变了”

**因此，“改值 + 新数组引用”是最保险的组合：**

matchedRow.CURRENT_PRICE = newPricematchedRow.PL = +newPL.toFixed(2)// ⚠️ 最终触发表格重算unfoldList.value = [...unfoldList.value]
**推荐实践**

|   |   |
|---|---|
|**场景**|**建议**|
|频繁价格推送|把 latestPriceMap 单独放在 Pinia / provide，表格只 computed 衍生展示数据，避免整体复制数组。|
|行对象数量多|使用 shallowReactive 包行对象，再在需要 deep 响应的字段上手动 ref。|
|第三方表格|如果组件有 row-key，优先传递唯一 key，并在更新时用 **全新的行对象** 替换旧对象 (splice/map)；这样既省去手动展开数组，也更安全。|

**总结**：

- **容器**（数组 / Map）变响应式 ≠ **元素** 自动变响应式。\<br\>
- 第三方表格通常按 **引用** 判断是否需要重渲染，给它一个“新引用”可避免灰色刷新。
- 在高频数据场景下，拆分“数据状态”与“视图状态”能最大限度减少无意义 diff，保证性能。

:::
