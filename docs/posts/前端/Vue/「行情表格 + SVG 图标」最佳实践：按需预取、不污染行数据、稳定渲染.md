---
title: 「行情表格 + SVG 图标」最佳实践：按需预取、不污染行数据、稳定渲染
date: 2025-09-23
tags:
---

## 思路总览

- **不要把 SVG 图标塞进表格数据行里**（每次报价变更你都会替换成新引用，导致整表重渲染）。
- **让行数据只承载行情字段**；图标用 **Store 的缓存（`svgMap`）在渲染时按需读取**。
- **在数据源变更时统一预取**`ensureSvgs`，避免在单元格里“边渲染边请求”。
- **表格保持稳定 key**（`getRowId`），列定义用 `shallowRef/const` 固化，配合虚拟化减少绘制成本。

> Vue 3 的 `reactive(Map)` 对 **按键读取**有依赖跟踪：`svgStore.getCached(symbol)` 只会在该 `symbol` 变更时触发相关单元格更新，不会把整张表绑到整张 Map 上——这是我们选择“渲染时读取”的关键。

---

## 步骤一：在数据源变化时**批量预取**图标（避免单元格内发请求）

> 在你的行情数据获取逻辑处（例如 `useOpenPosition` 或列表页容器组件）新增这段 watch。

```ts
// 复杂逻辑：数据源更新时，批量按当前页面出现的 symbols 预取 SVG
import { useSvgStore } from "@/store/svgStore";
// ...
const svgStore = useSvgStore();

watch(
  dataSource,
  (rows) => {
    if (!rows || rows.length === 0) return;
    // 复杂逻辑：去重后的 symbol 列表，按需指定 image_type
    const pageSymbols = Array.from(
      new Set(rows.map((r) => r.SYMBOL ?? r.symbol))
    ).filter(Boolean);
    svgStore.ensureSvgs(pageSymbols, { image_type: "svg" });
  },
  { immediate: true }
);
```

- 好处：**一次网络请求**覆盖当前页全部符号；
- Store 自带负缓存 / 合并窗口，不会风暴式请求。

---

## 步骤二：**列定义里**从 Store 读取缓存，不修改行数据

> 只改列定义的 `cell`，让它在渲染时从 Store 拿图标；**不要**把 `symbol_svg` 写回到行数据。

```ts
// 复杂逻辑：列定义文件顶部引入 Store（保持单例）
import { useSvgStore } from "@/store/svgStore";

export const getSymbolListColumns = (/* 你的参数 */) => {
  // 复杂逻辑：只创建一次，避免每次 render 都 new 一个 Store
  const svgStore = useSvgStore();

  return [
    {
      header: t("trading.search.table.symbol"),
      accessorKey: "symbol",
      size: 140,
      meta: { sticky: "left" },
      cell: ({
        row: {
          original: { symbol },
        },
      }) => {
        // 复杂逻辑：渲染时读取缓存；仅该 symbol 变更时会更新本单元格
        const svgItem = svgStore.getCached(symbol);
        // 你的 ForexPairs 接口：假设接收 images 或 src 列表；未命中时给占位
        return (
          <div class="bg-ground-box cursor-pointer flex items-center justify-between gap-1">
            <ForexPairs
              image-size={16}
              title={symbol}
              images={svgItem?.images ?? []} // 未命中时给空数组或占位
              // loading={ !svgItem } // 若组件支持 loading，可带上
            />
          </div>
        );
      },
    },
    // ... 其它列不变
  ] as ColumnDef<any>[];
};
```

**为何不把 `symbol_svg` 推进行数据？**

- 你的行情 `dataSource` 在报价变更时会替换为**新引用**；若你把图标也混进行数据，**每次报价**都让“静态图标字段”跟着重建，放大了渲染成本。
- 把图标留在 Store，由单元格按键读取，可做到 **“动态图标独立更新，行情变更不影响已缓存图标”**。

---

## 步骤三：表格**稳定性优化**（强烈建议）

1. **固定行 key**（避免整行重建）

   ```ts
   const table = useVueTable({
     data: dataSource.value,
     columns,
     getRowId: (row) => row.SYMBOL ?? row.symbol, // 复杂逻辑：行标识稳定
     // ... 其它配置
   });
   ```

2. **列定义常驻**

   - 列数组用 `const` 或 `shallowRef` 初始化一次，避免每次渲染都重建列定义。

3. **虚拟化容器尺寸稳定**

   - `@tanstack/vue-virtual` 的 `estimateSize` / `overscan` 做好配置，减少滚动时的抖动与频繁挂载。

---

## 步骤四：**滚动/分页预取**（可选增强）

当你有分页/虚拟滚动时，可以在**可视区变更**时预判接下来可能出现的 symbols，提前 `ensureSvgs`：

```ts
// 复杂逻辑：在可视区变化时，基于 index 预测下一屏的 symbols 并预取
watch(virtualizerRange, ({ startIndex, endIndex }) => {
  const nextRange = { start: Math.max(0, endIndex + 1), end: endIndex + 30 };
  const nextSymbols = rows
    .slice(nextRange.start, nextRange.end)
    .map((r) => r.SYMBOL ?? r.symbol);
  svgStore.ensureSvgs(Array.from(new Set(nextSymbols)), { image_type: "svg" });
});
```

---

## 反例对比：为什么“不推荐在每次数据变更时把图标塞回行数据”

- **多余的内存拷贝**：每个 tick 都在复制一份相同的 SVG 数据。
- **渲染级联**：tanstack table 在数据引用变化时需要重建模型，虚拟化也会触发更多计算。
- **更新不聚焦**：图标本身频率极低，却被行情高频刷新“绑架”。

**正确姿势**：**数据行只承载“会变的行情字段”**，**资源/元数据**（图标、静态文案）放在 **Store**，按需读取。

---

## 小贴士（结合你当前 Store 能力）

- 你的 `useSvgStore` 已有 **合并窗口**、**负缓存**、**inflight 去重**、**`nextTick` 消竞态**：

  - 这允许你**放心在渲染时读取**并在数据源变化时**统一预取**，不会造成请求放大或时序问题。

- 若列表有**很大规模**的 symbols，预取时可以分批（例如 200/批）并加个微小延迟窗，进一步平滑流量。

---

## 最简对接清单

1. 在容器组件 `watch(dataSource)` → `ensureSvgs(当前页 symbols)` ✅
2. 列定义的 `cell`：`svgStore.getCached(symbol)` 渲染，未命中给占位 ✅
3. `getRowId` 固定行 key；列定义常驻 ✅
4. （可选）可视区预测 → 预取下一屏 ✅

> 这样做，**行情高频刷新**与**图标静态资源**彻底解耦：
>
> - 图标只在**首次出现**或**TTL 过期**时触发请求；
> - 单元格只对**自身 symbol**变化敏感；
> - 虚拟化 + 稳定 key 让滚动与刷新都很“轻”。
