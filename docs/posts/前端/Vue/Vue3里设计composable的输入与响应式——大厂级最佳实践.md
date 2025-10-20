---
title: Vue 3 里设计 composable 的输入与响应式——大厂级最佳实践
date: 2025-10-14
categories:
  - 前端
  - Vue
tags:
  - Vue3
  - Composable
  - 响应式
  - 最佳实践
description: 深入探讨 Vue 3 Composable 函数的设计规范，涵盖输入参数设计、响应式处理、性能优化等大厂级最佳实践。
---

## 结论先行（TL;DR）

- **输入统一：接受 `MaybeRefOrGetter<T>`（值 / `ref` / `computed` / getter 函数均可）**，在内部用 `toValue`/`unref` 标准化；这样**既支持响应式参数，也不拒绝原始值**。
- **衍生数据一律用 `computed`**；**副作用一律用 `watch`/`watchEffect`**；只在需要副作用时监听，避免滥用 `watch`。
- **返回值一律是只读 `ref` 或对象的 `readonly` 包装**，外部不直接修改内部状态。
- **来自 `props` 的参数，调用方用 `toRef(props, 'x')` 传入**，而不是原始解构值；可避免"值丢失响应性"。
- **可选项（options）类参数**：支持"**静态值 + 响应式覆盖**"双形态，内部通过 `toValue` 读取，必要时对关键项 `watch`。
- **性能**：默认 `shallowRef` 保存大对象；`watch` 谨慎开启深度；对频繁变动源使用节流/防抖；`flush: 'post'` 处理 DOM 相关副作用。
- **边界**：组合多个源用 `watch([a,b])`；异步源配合 `watchEffect` + 取消；在 `onScopeDispose` 清理。

---

## 设计目标

1. **调用体验一致**：同一个 composable 既可接收**原始值**（一次性），也能接收**响应式值**（持续更新），调用成本最低。
2. **内部可维护**：对外暴露最小可变面，逻辑分层清晰（衍生 vs 副作用）。
3. **性能稳**：避免不必要的深度侦听与重算，易于控制更新频率。

---

## 标准输入类型与约定

- **统一签名**：`input: MaybeRefOrGetter<T>`
  - 调用方可传：`42`、`ref(42)`、`computed(...)`、`() => props.x`。
  - 组合式内部用 `toValue(input)` 读取当前值，用 `watch(input, ...)` 订阅变化。
- **对象/配置**：`options?: MaybeRefOrGetter<Partial<Options>>`，内部**按需**对关键字段加 `watch`。
- **来自 props**：推荐**调用方**先 `toRef(props, 'x')` 再传入，避免响应性丢失。

---

## 何时用响应式输入 vs 原始值？

- **业务参数（会变）**：传响应式（`ref`/`computed`/getter），Composable 自动跟随变化。
- **一次性初始化（不变）**：可传原始值（如常量开关/默认阈值）。
- **可变但低频**：仍建议响应式；或传 getter（外部自行控制何时变化），内部只 `toValue` 读取。

> 大厂常见做法：**对所有可变入参一律允许响应式**，但**不强制**，以降低接入门槛。

---

## 衍生与副作用的分工

- **衍生数据 → `computed`**
  - 纯函数式、可缓存、易测试。
- **副作用 → `watch` / `watchEffect`**
  - **需要观察具体源时**用 `watch(source, cb, options)`；
  - **依赖自动收集**（可能多个源）时用 `watchEffect`，并正确处理清理函数。

---

## 返回值规范

- **返回 `readonly(ref)` 或只读对象**：防止外部误改内部状态。
- 若需对外暴露"命令式"改变，提供**方法**而非直接暴露可写 `ref`。

---

## 代码模板（生产级骨架）

> 说明：以下仅给出**关键片段**（符合你的"只给必要代码"的偏好）。复杂逻辑前加中文注释。

### 类型定义

```ts
// types.ts
export type MaybeRefOrGetter<T> =
  | T
  | (() => T)
  | import("vue").Ref<T>
  | import("vue").ComputedRef<T>;
```

### Composable 实现

```ts
// useSmartThing.ts
import {
  ref,
  shallowRef,
  computed,
  watch,
  watchEffect,
  toValue,
  readonly,
  onScopeDispose,
} from "vue";
import type { MaybeRefOrGetter } from "./types";

interface UseSmartThingOptions {
  // 复杂逻辑：影响刷新频率与重算窗口
  // 这里的 throttleMs 既可传原始值，也可传 ref/getter
  throttleMs?: number;
  deep?: boolean;
}

export function useSmartThing<T>(
  input: MaybeRefOrGetter<T>,
  options?: MaybeRefOrGetter<UseSmartThingOptions>
) {
  // 复杂逻辑：内部状态大型对象用 shallowRef 降低不必要的深度依赖
  const state = shallowRef<{ value: T; stamp: number }>({
    value: toValue(input),
    stamp: Date.now(),
  });

  const opts = () => ({ throttleMs: 0, deep: false, ...toValue(options) });

  // 复杂逻辑：衍生值只用 computed，避免副作用
  const pretty = computed(() => {
    const v = state.value.value as unknown as T;
    return String(v);
  });

  let timer: number | null = null;

  // 复杂逻辑：副作用监听输入变化 + 节流控制
  watch(
    input,
    (val) => {
      const { throttleMs } = opts();
      if (throttleMs && throttleMs > 0) {
        if (timer) return;
        // 复杂逻辑：节流窗口内只记录第一次
        state.value = { value: val, stamp: Date.now() };
        timer = window.setTimeout(() => {
          timer = null;
        }, throttleMs) as unknown as number;
      } else {
        state.value = { value: val, stamp: Date.now() };
      }
    },
    { immediate: true, deep: opts().deep, flush: "post" }
  );

  // 复杂逻辑：当 options 自身是响应式时，关键字段变化需要触发重应用（例如 deep/节流策略变化）
  watch(
    () => toValue(options),
    () => {
      // 这里按需重建监听/重算策略。简单起见仅触发一次性刷新。
      state.value = { value: toValue(input), stamp: Date.now() };
    },
    { deep: true }
  );

  onScopeDispose(() => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  });

  return {
    value: readonly(state), // 对外只读
    pretty, // 衍生值
    // 提供命令式 API（如需要）
    // reset() { ... }
  };
}
```

---

## "原始值如何确保更新？"的三种稳妥做法

> 核心思想：**Composable 不强制输入必须是响应式**，但**内部要能"感知变化来源"**。

### 1. 由调用方负责响应化（推荐）

- 来自 `props`：`const xRef = toRef(props, 'x')` 后传入。
- 外部变量：`const xRef = ref(x)` 并在外部更新 `xRef.value`。
- **优点**：数据流最清晰，职责边界最明确（大厂偏好）。

### 2. Composable 接受 getter（函数）

- 传 `() => props.x` 或 `() => someStore.value`，内部 `watch(input, ...)` 可订阅。
- **适合**：不方便造 `ref` 的场景。

### 3. 显式刷新方法（兜底）

- 返回 `refresh()`，让调用方在原始值变化时手动触发。
- **用于**：变化极少、接入成本敏感的工具类 composable。

---

## 典型调用方写法（防止响应性丢失）

```ts
// 来自 props 的值，避免直接解构丢失响应性
const count = toRef(props, "count");
const { value, pretty } = useSmartThing(count, { throttleMs: 200 });

// 原始常量，也可以直接传（一次性）
const { value: once } = useSmartThing(123);

// 不便创建 ref 的场景，传 getter
const { value: viaGetter } = useSmartThing(() => route.query.id);
```

---

## 监听策略与性能建议

- **尽量不用 `deep: true`**；需要时对**具体字段**创建 `watch(() => obj.key, ...)`。
- **大对象用 `shallowRef`**，配合**整体替换**（immutable 写法）触发更新。
- **高频源**（输入框、滚动位置）使用**防抖/节流**；`flush: 'post'` 处理布局/DOM 相关副作用。
- **拆分副作用**：一个 `watch` 只做一件事，方便定位与中止。
- **组合多源**：`watch([a, b], ([na, nb], [oa, ob]) => { ... })`，避免多重监听交叉触发。

---

## 返回 API 的一致性与可测试性

- **只读输出 + 命令式方法**（而非暴露可写 ref）有利于**单测**与**边界控制**。
- **错误边界**：在 composable 内部进行参数校验（类型/范围），尽早失败，日志可控。
- **SSR**：涉及 `window`/DOM 的副作用加环境判断或延迟到 `onMounted`/`flush: 'post'`。

---

## 常见坑位与规避

- **直接解构 props 导致"失去响应性"**：总是用 `toRef(props, 'k')` / `toRefs(props)`。
- **滥用 `watchEffect`**：当依赖集不稳定时会频繁触发；**已知源**优先 `watch(source, ...)`。
- **深度监听大对象**：高成本；改为分字段监听或结构化拷贝 + `shallowRef`。
- **返回可写 ref 被外部改坏状态**：一律 `readonly` 封装。
- **没有清理副作用**：使用 `onScopeDispose`，或在 `watch` 回调中返回清理函数。

---

## 小结：大厂风格的"可插可拔"组合式设计

1. **输入宽容**（值/`ref`/getter 皆可）+ **内部标准化**（`toValue`）。
2. **衍生 = `computed`，副作用 = `watch`**，边界清晰。
3. **返回只读 + 命令式方法**，利于治理与测试。
4. **性能可控**：默认浅引用、精确监听、必要时节流防抖。
5. **调用侧最佳实践**：`toRef(props, 'x')`、必要时传 getter，实在不便再用 `refresh()` 兜底。

> 以上模式在中大型项目验证稳定，既保证了**接入友好**，又维持了**内部约束与性能**。如果你有具体的 composable 正在写，我可以按这个规范帮你把签名与实现"落标"。
