结论先说：
在 **@tanstack/vue-table v8.20+** 中，`useVueTable` 的 `data` 是按 **shallowRef（浅层响应）** 来处理的——**只侦听 `ref` 的 `.value` 本身是否换了新引用**。因此：

- **改数组元素的属性**（例如把某一行的 “报价” 改价）——**需要让 `dataRef.value` 指向一个**新的数组引用，表格才会进行必要的重算/渲染。
- **增删元素**（push/pop/splice）这种**原地修改**不会更换数组引用，表格**不会**感知，需要**重建一个新数组再赋回 `dataRef.value`**。
- 官方文档在 “Using Reactive Data” 专章明确说明了这一点，并给了示例：`dataRef.value.push(...)` 不会更新；`dataRef.value = [...dataRef.value, ...]` 才会更新。([tanstack.com][1])

---

## 为什么必须“换引用”？

- 适配层用 **shallowRef** 做了性能优化：**不追踪深层变动**（数组内部元素或其字段的改动），**只在 `.value` 指向新引用时**触发表格的行模型/排序/过滤等重算。
- TanStack Table 也明确：**当 `data/columns` 的引用变了**，或表格内部 state 变了，就会触发更新；而**稳定引用**避免无谓的重建/循环渲染。([tanstack.com][2])

---

## 实战建议（Vue 3）

### 1）更新单行“报价”字段（不可变更新）

> 逻辑：按 id 找到目标行 → 复制出一个新数组 → 用新对象替换该行 → 把**新数组**赋回 `dataRef.value`

```ts
// 在复杂逻辑上一行加注释：不可变更新，生成新数组引用以触发表格重算
function updatePriceById(id: string, price: number) {
  const idx = indexById.get(id);
  if (idx === undefined) return;
  const next = dataRef.value.slice();
  next[idx] = { ...next[idx], price };
  dataRef.value = next; // ← 必须换引用，shallowRef 才会触发更新
}
```

### 2）新增 / 删除一行

```ts
// 在复杂逻辑上一行加注释：新增时返回新数组引用（避免 push 原地修改）
function addRow(row: Row) {
  dataRef.value = [...dataRef.value, row]; // ← 换引用
}

// 在复杂逻辑上一行加注释：删除时用 filter 产生新数组引用（避免 splice 原地修改）
function removeRowById(id: string) {
  dataRef.value = dataRef.value.filter((r) => r.id !== id); // ← 换引用
}
```

### 3）批量高频更新（如行情报价流）

> 逻辑：把多次更新合并为**一帧**（或节流窗口）后再一次性换引用，降低开销

```ts
// 在复杂逻辑上一行加注释：用 requestAnimationFrame 合批更新，避免每次报价都重建数组
const pending: Record<string, number> = {};
let scheduled = false;

export function queuePrice(id: string, price: number) {
  pending[id] = price;
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    const next = dataRef.value.slice();
    for (const [id, p] of Object.entries(pending)) {
      const idx = indexById.get(id);
      if (idx !== undefined) next[idx] = { ...next[idx], price: p };
      delete pending[id];
    }
    dataRef.value = next; // ← 一次性换引用
    scheduled = false;
  });
}
```

### 4）保持行状态不丢（强烈建议）

> 逻辑：让表格用**稳定的行 id**，避免你替换数组后选中/展开等状态乱跳

```ts
// 在复杂逻辑上一行加注释：用 getRowId 保持行标识稳定（而非默认的行索引）
const table = useVueTable({
  columns,
  data: dataRef,
  getRowId: (row) => row.id,
});
```

（`getRowId` 的用途与示例详见官方 Rows/Row APIs 文档。) ([tanstack.com][3])

---

## 常见误区对照

- **误区**：`dataRef.value.push(row)` / `splice`
  **现象**：表格不更新或排序/分组不同步。
  **正确**：`dataRef.value = [...dataRef.value, row]` / `filter` 产生新数组再赋回。([tanstack.com][1])

- **误区**：`dataRef.value[i].price = x` 只改了对象字段
  **现象**：某些单元格可能更新，但**排序/汇总/分组**不重算或不一致。
  **正确**：替换为新对象，并**整体换引用**：`dataRef.value = withUpdatedRow(...)`。([tanstack.com][1])

- **误区**：把列定义/数据字面量写在 `<template>` 或渲染过程中
  **风险**：频繁生成新引用，引起不必要的重建甚至循环渲染（尤其是 React 端）。
  **正确**：列用 `shallowRef`、数据用 `ref`，在 `<script setup>` 顶层准备好稳定引用；React 用 `useMemo`/`useState`。([tanstack.com][2])

---

## 回答你的两个关键问题

1）**“难道我必须改变 `data.value` 才会重新渲染吗？”**

> 在 Vue 适配器中，是的——**要让表格识别到变化，需要让 `dataRef.value` 指向一个新数组引用**（哪怕你只是改了某个元素的某个字段）。这是由于官方采用 **shallowRef** 只侦听 `.value` 的引用变化。([tanstack.com][1])

2）**“如果数组元素增加、减少或变化，也不需要（= 不必）用 `.value` 重置数据源吗？”**

> 需要。**增/删/改**都应当以**不可变更新**的方式生成**新数组**并赋给 `dataRef.value`。原地 `push/pop/splice` 或只改对象字段不会触发表格的正确更新路径。官方给出的示例也明确了这一点（`push` 不更新，重新赋值才更新）。([tanstack.com][1])

---

## 性能与工程化补充

- **不可变更新的成本**：一次创建新数组是 O(n)，在“几千行”规模通常可接受；TanStack Table 内部对行模型有优化，配合虚拟滚动使用时依然顺滑。若有**高频行情**，建议合批（见上文 rAF 方案）或**按时间窗节流**。
- **服务端驱动**：若列表很大且更新频密，可只下发变化集（patch），在客户端\*\*应用 patch 后仍然以“新数组赋回”\*\*的方式触发表格刷新。
- **列与数据的“稳定引用”策略**：列用 `shallowRef([...])`，数据用 `ref<Row[]>([])`，统一通过“新数组赋回”来驱动更新，避免在模板/计算属性里临时构造数组对象。

---

### 参考

- **Table State (Vue) / Using Reactive Data**：支持 `ref/computed`，但**示例明确：必须给 `dataRef.value` 赋新数组**才会更新；`push` 不会触发。([tanstack.com][1])
- **FAQ / Data Guide / Table Instance**：强调需要**稳定引用**，错误做法会导致重复重建/循环渲染。([tanstack.com][2])
- **Rows / Row APIs**：使用 `getRowId` 保持行状态稳定。([tanstack.com][3])

如果你愿意，把你现在的 `useVueTable` 初始化和“报价更新”那段代码贴出来；我只给**需要修改的片段**，并在复杂逻辑上一行加注释，帮你改成**不可变更新 + 合批**的版本。

[1]: https://tanstack.com/table/latest/docs/framework/vue/guide/table-state "Table State (Vue) Guide | TanStack Table Vue Docs"
[2]: https://tanstack.com/table/latest/docs/faq?utm_source=chatgpt.com "FAQ | TanStack Table Docs"
[3]: https://tanstack.com/table/latest/docs/guide/rows?utm_source=chatgpt.com "Rows Guide | TanStack Table Docs"
