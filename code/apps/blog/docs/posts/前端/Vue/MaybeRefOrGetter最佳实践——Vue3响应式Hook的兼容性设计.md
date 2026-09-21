# MaybeRefOrGetter 最佳实践——Vue3 响应式 Hook 的兼容性设计

## 前言

在 Vue3 的 Composition API 开发中，我们经常需要设计一些通用的 Hook 函数。这些 Hook 需要接收各种类型的参数：可能是 `ref`、`computed`、getter 函数，或者直接的值。如何优雅地处理这种多样性，同时保证响应式系统的正常工作，是一个值得深入探讨的话题。

本文通过一个实际的 `useSLTP` Hook 案例，详细解析 `MaybeRefOrGetter` 类型的设计思路和最佳实践。

## 问题背景

假设我们有一个用于计算止损止盈的 Hook：

```ts
// useSLTP.ts
import { ref, computed, watchEffect, type MaybeRefOrGetter } from "vue";

interface Config {
  orderType: string;
  side: string;
  pointSize: number;
  precision: number;
  stopLevel: number;
}

interface PriceInfo {
  bid: number;
  ask: number;
}

interface Options {
  defaultOffsetPoints: number;
  valueMode: string;
  throttleMs: number;
}

export default function useSLTP(params: {
  config: MaybeRefOrGetter<Config>;
  priceInfo: MaybeRefOrGetter<PriceInfo>;
  isStopLoss: MaybeRefOrGetter<boolean>;
  options: MaybeRefOrGetter<Options>;
}) {
  const meta = ref({});
  const difference = ref(0);
  const entryPrice = ref(0);
  const suggested = ref(0);

  const run = () => {
    // 获取实际值
    const config = toValue(params.config);
    const priceInfo = toValue(params.priceInfo);
    const isStopLoss = toValue(params.isStopLoss);
    const options = toValue(params.options);

    // 执行计算逻辑...
    console.log("重新计算:", { config, priceInfo, isStopLoss, options });
  };

  // 监听参数变化
  watchEffect(run);

  return {
    meta: readonly(meta),
    difference: readonly(difference),
    entryPrice: readonly(entryPrice),
    suggested: readonly(suggested),
  };
}
```

在组件中使用时，我们可能会这样调用：

```ts
// 组件中
const createSltpCtx = () => {
  return useSLTP({
    config: toRef(props, "config"), // 响应式引用
    priceInfo: () => props.priceInfo, // getter 函数
    isStopLoss: () => props.isStopLoss, // getter 函数
    options: () => props.options, // getter 函数
  });
};
```

## 核心问题

**为什么使用 `MaybeRefOrGetter` 而不是直接使用 `ref`？**

答案在于**兼容性与易用性**：

1. **响应式场景**：当传入 `ref`、`computed` 或读取响应式数据的 getter 时，`watchEffect` 能够自动追踪依赖并重新执行
2. **非响应式场景**：当传入普通值或读取非响应式变量的 getter 时，`watchEffect` 无法追踪变化，需要手动触发重算

## 最佳实践解决方案

### 1. Hook 设计：提供手动重算能力

```ts
// useSLTP.ts - 改进版本
export default function useSLTP(params: {
  config: MaybeRefOrGetter<Config>;
  priceInfo: MaybeRefOrGetter<PriceInfo>;
  isStopLoss: MaybeRefOrGetter<boolean>;
  options: MaybeRefOrGetter<Options>;
}) {
  const meta = ref({});
  const difference = ref(0);
  const entryPrice = ref(0);
  const suggested = ref(0);

  const run = () => {
    const config = toValue(params.config);
    const priceInfo = toValue(params.priceInfo);
    const isStopLoss = toValue(params.isStopLoss);
    const options = toValue(params.options);

    // 执行计算逻辑...
    console.log("重新计算:", { config, priceInfo, isStopLoss, options });
  };

  watchEffect(run);

  return {
    meta: readonly(meta),
    difference: readonly(difference),
    entryPrice: readonly(entryPrice),
    suggested: readonly(suggested),
    // 关键：提供手动重算能力
    recompute: run,
  };
}
```

### 2. 组件使用：保持响应式最佳实践

```ts
// 组件中 - 推荐做法（保持不变）
const createSltpCtx = () => {
  return useSLTP({
    config: toRef(props, "config"), // ✅ 响应式引用
    priceInfo: () => props.priceInfo, // ✅ getter 读取响应式数据
    isStopLoss: () => props.isStopLoss, // ✅ getter 读取响应式数据
    options: () => props.options, // ✅ getter 读取响应式数据
  });
};
```

## 使用场景详解

### 场景 A：响应式数据（推荐）

```ts
// 组件中
const props = defineProps<{
  config: Config;
  priceInfo: PriceInfo;
  isStopLoss: boolean;
  options: Options;
}>();

const core = useSLTP({
  config: toRef(props, "config"), // 响应式引用
  priceInfo: () => props.priceInfo, // getter 读取响应式数据
  isStopLoss: () => props.isStopLoss, // getter 读取响应式数据
  options: () => props.options, // getter 读取响应式数据
});

// 当 props 变化时，watchEffect 会自动重新执行
// 无需手动调用 core.recompute()
```

### 场景 B：非响应式数据（需要手动触发）

```ts
// 非响应式变量
let rawConfig = {
  orderType: "market",
  side: "buy",
  pointSize: 0.01,
  precision: 2,
  stopLevel: 5,
};
let rawPriceInfo = { bid: 123.45, ask: 123.47 };
let rawIsStopLoss = true;
let rawOptions = {
  defaultOffsetPoints: 100,
  valueMode: "price",
  throttleMs: 0,
};

// 传入 getter，但读取的是非响应式变量
const core = useSLTP({
  config: () => rawConfig,
  priceInfo: () => rawPriceInfo,
  isStopLoss: () => rawIsStopLoss,
  options: () => rawOptions,
});

// 外部更新非响应式变量
function onExternalUpdate() {
  rawPriceInfo = { bid: 123.6, ask: 123.62 };
  rawOptions = { ...rawOptions, defaultOffsetPoints: 150 };

  // 手动触发重算
  core.recompute();
}
```

### 场景 C：批量更新优化

```ts
async function onBatchUpdate() {
  // 批量更新多个非响应式源
  rawConfig = { ...rawConfig, stopLevel: 8 };
  rawPriceInfo = { bid: 124.0, ask: 124.02 };
  rawIsStopLoss = false;
  rawOptions = { ...rawOptions, valueMode: "price", throttleMs: 0 };

  // 使用微任务合并一次重算，避免重复计算
  queueMicrotask(() => {
    core.recompute();
  });
}
```

## 设计原则总结

### 1. 类型设计原则

- **使用 `MaybeRefOrGetter<T>`**：兼容 `ref`、`computed`、getter 函数和直接值
- **提供 `recompute()` 方法**：为无法被追踪的变化提供显式刷新入口

### 2. 使用原则

- **优先使用响应式数据**：`toRef(props, 'key')` 或 `() => reactiveData.key`
- **非响应式数据需手动触发**：在数据更新后调用 `recompute()`
- **批量更新优化**：使用 `queueMicrotask` 或 `Promise.resolve()` 合并重算

### 3. 文档说明

在 Hook 的文档中应该明确说明：

```ts
/**
 * 计算止损止盈的 Hook
 *
 * @param params.config - 配置信息（推荐传入响应式引用）
 * @param params.priceInfo - 价格信息（推荐传入响应式引用）
 * @param params.isStopLoss - 是否为止损（推荐传入响应式引用）
 * @param params.options - 选项配置（推荐传入响应式引用）
 *
 * @returns 返回计算结果和 recompute 方法
 *
 * @example
 * // 推荐用法（响应式）
 * const core = useSLTP({
 *   config: toRef(props, 'config'),
 *   priceInfo: () => props.priceInfo,
 * })
 *
 * @example
 * // 非响应式用法（需手动触发）
 * const core = useSLTP({
 *   config: () => rawConfig,
 *   priceInfo: () => rawPriceInfo,
 * })
 * // 数据更新后
 * core.recompute()
 */
```

## 总结

`MaybeRefOrGetter` 的设计体现了 Vue3 响应式系统的灵活性：

1. **响应式优先**：推荐传入响应式数据，让系统自动追踪变化
2. **兼容性兜底**：支持非响应式数据，通过 `recompute()` 手动触发
3. **性能优化**：批量更新时合并重算，避免重复计算

这种设计既保证了"最佳实践"的易维护性，又做到了"四两拨千斤"地兼容不同调用习惯，是 Vue3 Hook 设计的标准模式。

---

_本文通过实际案例详细解析了 `MaybeRefOrGetter` 的设计思路和使用最佳实践，希望能帮助开发者更好地理解和运用 Vue3 的响应式系统。_
