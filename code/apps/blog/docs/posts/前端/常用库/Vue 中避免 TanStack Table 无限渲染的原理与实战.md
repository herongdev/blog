---
title: 为什么需要“稳定引用”？——React/Vue 中避免 TanStack Table 无限渲染的原理与实战
date: 2025-09-11
tags: [TanStack Table, React, Vue, 稳定引用, 性能]
---

## 背景

- 当 columns/data 引用变化时，表格内部状态会重建，导致表格重新渲染。
  **当 `columns` 或 `data` 的引用在每次渲染时都变化时，TanStack Table 会认为表格配置变了，从而重建内部状态 → 触发重新渲染 → 如果你又在渲染过程中基于表格状态去更新外部状态，就可能进入无限循环。**

换句话说：

- **根因**：引用变化（不是值变，而是“新建对象/数组”的新引用）。
- **结果**：表格实例重新初始化，内部状态重建，触发表格渲染。
- **延伸**：若外部 `setState`/`watch` 又基于表格变化修改 `data/columns`，就会形成闭环 → 无限渲染。

这就是为什么要强调 **保持引用稳定**（React 用 `useMemo/useState`，Vue 用 `ref/shallowRef`）。

要不要我帮你画个 **“渲染循环因果图”**，直观展示这个无限渲染是怎么形成的？

## 核心结论（先看这个）

- **React**：函数组件每次渲染都会重新执行函数体，**字面量对象/数组**在每次渲染都会生成**新引用**；TanStack Table 看到 `data/columns` 引用变了，会重建内部状态并触发更新，若你的代码里又根据表格状态 `setState`，就会形成**渲染 → 新引用 → 重建 → 再渲染**的循环。
- **Vue 3**：`<script setup>` 顶层只跑一次，不会像 React 每次渲染都新建引用，但若你在 **computed/watch/render function** 里每次都**新建数组/对象**传下去，或用 **watch 回写源数据**，同样会造成**重复重建/回写循环**。
- 解决：**让 `data` 和 `columns` 的引用稳定**（只在必要时变），并避免 fallback 写法导致每次生成新数组。

## 一、为什么会“无限循环渲染”？

### 在 React 中

1. **引用不稳定**

   ```tsx
   export default function MyTable() {
     // ❌ 每次渲染都会创建全新的数组引用
     const columns = [
       /* ... */
     ];
     const data = [
       /* ... */
     ];

     // ⚠️ 这里一旦引用变化，useReactTable 会重建内部模型并触发状态更新
     const table = useReactTable({ columns, data });

     return <Table table={table} />;
   }
   ```

- 组件渲染 ⇒ `columns/data` 新引用 ⇒ 表格内部 `setState` ⇒ 组件再渲染 ⇒ 再次新引用…形成环。

2. **“看似无害”的 fallback 也会制造新引用**

   ```tsx
   const table = useReactTable({
     columns,
     data: data ?? [], // ❌ 每次渲染都会创建一个新的 []
   });
   ```

3. **依赖链放大**
   `useEffect/useMemo` 以**引用相等**判断变化。上游一旦“每次都是新引用”，下游优化全失效，导致更多无效重算、重渲染，甚至你的 `setState` 逻辑被反复触发。

> 额外注意：React 18 严格模式会**额外执行一次初始渲染**来帮助发现副作用问题，这会放大不稳定引用带来的抖动。

### 在 Vue 3 中

- `<script setup>` 顶层只执行一次，**顶层声明的常量/`ref`/`shallowRef` 是稳定的**。但下面几种写法会引发问题：

  1. **在 `computed` 或渲染函数里新建数组/对象**：每次依赖变更都会产出**新引用**传给子组件或表格，导致表格重建。
  2. **watch 回写源数据**：监听某值变化后又写回同一来源（或其派生），容易形成**自激活循环**。
  3. **fallback 新建**：`data.value ?? []` 直接写在绑定处，每次求值都产生新数组。

## 二、如何在 React 中正确避免

### ✅ 推荐做法

```tsx
// 在模块顶层定义稳定的空数组（fallback）
const FALLBACK_ROWS: User[] = [];

export default function MyTable() {
  // ✅ columns 用 useMemo 保证引用稳定
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      // ...
    ],
    []
  );

  // ✅ data 用 useState/useMemo/外部状态管理，避免每次重建
  const [data, setData] = useState<User[]>(() => [
    // 初始数据...
  ]);

  // ✅ fallback 使用模块常量，避免 "data ?? []" 的每次新建
  const table = useReactTable({
    columns,
    data: data ?? FALLBACK_ROWS,
  });

  return <Table table={table} />;
}
```

### ❌ 常见坑位（对照修改）

```tsx
// ❌ 坑1：直接字面量
const columns = [
  /* ... */
];
const data = [
  /* ... */
];

// ✅ 改：useMemo / useState / 顶层常量
```

```tsx
// ❌ 坑2：data ?? [] 每次新建
const table = useReactTable({ columns, data: data ?? [] });

// ✅ 改：data ?? FALLBACK_ROWS（FALLBACK_ROWS 是模块级常量）
```

```tsx
// ❌ 坑3：根据 table 的 getter 做 setState
useEffect(() => {
  // 复杂逻辑：每次行模型变就 setState，极易形成环
  setFilteredIds(table.getRowModel().rows.map((r) => r.id));
}, [table.getRowModel()]);
// ✅ 改：用事件/回调或受控参数，避免直接“读→立刻写”成环
```

## 三、如何在 Vue 3 中正确避免

### ✅ 推荐做法（<script setup>）

```ts
<script setup lang="ts">
// ✅ 顶层只执行一次：引用天然稳定
import type { ColumnDef } from '@tanstack/vue-table'
import { ref, shallowRef } from 'vue'

// ✅ 列通常用 shallowRef 避免深层代理开销，同时保持引用稳定
const columns = shallowRef<ColumnDef<User>[]>([
  // ...
])

// ✅ data 用 ref 持有；只有你显式赋值时才会变
const data = ref<User[]>([])

// ✅ fallback：模块级常量
const FALLBACK_ROWS: User[] = []

</script>

<template>
  <!-- ✅ 避免 data ?? [] 这样的内联新建 -->
  <TanStackTable :columns="columns" :data="data || FALLBACK_ROWS" />
</template>
```

### ❌ 常见坑位（对照修改）

```ts
<!-- ❌ 坑1：模板里内联新建数组/对象 -->
<TanStackTable :columns="[/*...*/]" :data="rows.map(x => ({...x}))" />

<!-- ✅ 改：在 <script setup> 顶层用 ref/shallowRef/computed 提前产出稳定引用 -->
```

```ts
// ❌ 坑2：watch 回写自身，形成循环
watch(data, () => {
  // 复杂逻辑：对 data 变化又把 data 重新赋值（哪怕值相同也会变引用）
  data.value = [...data.value]; // ⚠️ 极易自触发
});

// ✅ 改：只在必要时、且用“变更检测”后再写；或使用防抖/节流；避免对同源数据做无意义回写
watch(data, (nv, ov) => {
  if (nv !== ov && needNormalize(nv)) {
    data.value = normalize(nv);
  }
});
```

```ts
// ❌ 坑3：computed 每次返回新引用给子组件
const tableData = computed(() => rows.value.map((r) => ({ ...r })));
// 子组件把 props 当变化处理，触发表格重建

// ✅ 改：在装配阶段完成一次性结构化；或分片/缓存
const tableData = ref<User[]>([]);
watchEffect(() => {
  tableData.value = buildOnce(rows.value); // 只在 rows 真变时重建
});
```

> 小贴士：**columns 用 `shallowRef`** 通常更合适（列定义对象多且深），避免被深度代理带来的性能损耗与不必要的依赖追踪。

---

## 四、原理层面再解释一句话

- **React**：**函数体=渲染时刻**，字面量对象/数组每渲染一次就**新建引用**；库（TanStack Table）根据引用变更重建内部模型，再配合你自己的 `setState`，就可能形成闭环。
- **Vue**：**响应式=依赖追踪**，若你在响应式计算链条里**每次产出新引用**传递下去，或**监听后回写自身**，一样会形成\*\*“变化 → 重建 → 再变化”\*\*的回路。

---

## 五、实战检查清单

- [ ] `columns` 是否用 `useMemo`（React）或 `shallowRef`（Vue）？
- [ ] `data` 是否来自 `useState/ref` 或外部状态，而不是每次渲染重建？
- [ ] 是否避免 `data ?? []` 这类**内联新建** fallback？
- [ ] 是否存在“监听 A ⇒ 写回 A/其派生”的**自激活 watch/effect**？
- [ ] 大对象（列定义）是否避免深度代理（Vue 用 `shallowRef`）？

---

如需，我可以把你现有的 React/Vue 表格初始化代码**逐行体检**，只给出**需要修改的片段**并在复杂逻辑上一行加注释，帮你把“稳定引用”彻底梳理好。
