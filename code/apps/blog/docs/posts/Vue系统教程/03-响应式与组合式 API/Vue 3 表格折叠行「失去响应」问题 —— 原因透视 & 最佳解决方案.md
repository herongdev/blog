---
title: "Vue 3 表格折叠行「失去响应」问题 —— 原因透视 & 最佳解决方案"
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
description: "核心就是两句话： 1. 第一次出现 把新折叠行 row 包一层 reactive(row) 放进缓存 → 它从此变成 Proxy，加入响应链。 3. 后续更新 再次计算得到同一 symbol 的新数据时，不重新 reactive ，而是 Object.assign( 已有 Pro。"
sidebarWeight: 142
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/响应式问题/Vue 3 表格折叠行「失去响应」问题 —— 原因透视 & 最佳解决方案.md"
---
::: v-pre

# Vue 3 表格折叠行「失去响应」问题 —— 原因透视 & 最佳解决方案

> 本节目标：理解“Vue 3 表格折叠行「失去响应」问题 —— 原因透视 & 最佳解决方案”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
核心就是两句话：

1. 第一次出现

把新折叠行 `row` 包一层 `reactive(row)` 放进缓存 → 它从此变成 Proxy，加入响应链。

3. 后续更新

再次计算得到同一 `symbol` 的新数据时，不重新 `reactive`，而是`Object.assign(`已有 `Proxy,` 新字段`)`这样既不破坏引用，也能把最新值同步给所有使用处（表格、弹窗等）。

因此：

- 非响应的 → `reactive` 一次即可
- 已是响应的 → `Object.assign` 更新字段即可

这就是保证折叠行既响应，又不反复创建新对象的关键思路。

本文回顾我们刚才踩过的坑，按「现象 → 原因 → 解决」的顺序讲清楚，并给出一份可直接套用的模板。

1. 现象
1. **原始行（未折叠）**
- 来自后端的订单数据存入 `Map`。
- 通过 `reactive(Map)`/`ref([])` 管理，UI 与数据保持同步。
2. **折叠行（分组合并）**
- 用 `computed(() =\> buildFoldRowsBySymbol(unfoldRows))` 生成。
- 表格能展示，但点击折叠行弹窗后**修改字段不会刷新表格**。

2. 根本原因
- **`computed` 每次都会创建全新的折叠行对象**
每当 `unfoldRows` 更新，`buildFoldRowsBySymbol` 返回一个全新的数组及其元素，这些元素是 _普通对象_，不再是 Vue autop生成的 **Proxy**。
- 当你在弹窗中修改这些 _新对象_，表格里仍旧引用旧对象，响应链断了。
图示：
unfoldRows (响应式 Proxy)
│
▼
computed → 新 [] + 新对象 ←✎ 修改这里
│
▼
Table UI (旧 Proxy)

3. 解决思路
**让折叠行对象保持统一引用**，后续只 `Object.assign` 填充字段，确保始终是同一个 Proxy。

核心做法：**用 `Map` 作为「折叠行缓存」**。
1. 每个 `symbol` 仅存一份折叠行对象（Proxy）。
2. `unfoldRows` 更新时
- 计算最新折叠行 → 更新/添加到 `Map`（`Object.assign`）。
- 移除已不存在的 `symbol`。
3. 组件对外暴露 `foldRowsStable = computed(() =\> Array.from(map.values()))`。

4. 代码实战
4.1 composable：`useOpenOrder.ts`
import \{ reactive, computed, watch \} from 'vue';
import \{ buildFoldRowsBySymbol \} from '@/utils/orderUtils';
const unfoldRows = computed(() =\>
  Array.from(orderStore.openOrderData.values())
);
/* ① 缓存 Map，键：symbol，值：FoldOrderRow（Proxy） */
const foldRowCache = reactive(new Map\<string, FoldOrderRow\>());
/* ② 同步缓存 */
watch(
  unfoldRows,
  (rows) =\> \{
    const fresh = buildFoldRowsBySymbol(rows);
    const living = new Set\<string\>();
    fresh.forEach((row) =\> \{
      living.add(row.SYMBOL);
      const cached = foldRowCache.get(row.SYMBOL);
      cached
        ? Object.assign(cached, row) // 更新字段
        : foldRowCache.set(row.SYMBOL, reactive(row));
    \});
    // 删除消失的 symbol
    Array.from(foldRowCache.keys()).forEach(
      (sym) =\> !living.has(sym) && foldRowCache.delete(sym)
    );
  \},
  \{ immediate: true, deep: true \}
);
/* ③ 稳定数组供表格使用 */
const foldRows = computed(() =\> Array.from(foldRowCache.values()));
return \{ unfoldRows, foldRows \};

4.2 表格组件：`OrderTabs.vue`
`/*` 点击更新行

```
 */
const updateOrder = (row, type) => {
  const reactiveRecord = isGroup
    ? foldRows.value.find(r => r.SYMBOL === row.SYMBOL) // ←
```

缓存中的

```
 Proxy
    : unfoldRows.value.find(r => r.TICKET === row.TICKET);
  if (reactiveRecord) Object.assign(reactiveRecord, row); //
```

保持响应

```
  emit('updateOrder', { reactiveRecord, row, type, ... });
};
```

5. 性能 & 维护性

6. 模板化总结

- 若 `computed` 需要返回 **衍生/汇总** 数据并保持响应式，
- **三步走**
    1. 创建 `reactive(Map)` 作为缓存
    2. `watch(源数据)` → **更新/添加/删除** 缓存项
    3. 暴露 `computed(() =\> [...cache.values()])`

这样即可兼顾性能、响应式和代码可读性。

:::
