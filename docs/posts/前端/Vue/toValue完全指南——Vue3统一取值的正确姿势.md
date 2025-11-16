---
title: toValue 完全指南——Vue 3 统一取值的正确姿势
date: 2025-10-14
categories:
  - 前端
  - Vue
tags:
  - Vue3
  - toValue
  - Composable
  - 响应式
  - 工具函数
description: 深入解析 Vue 3.3+ 的 toValue 函数：它做了什么、与 unref 的区别、使用场景与注意事项。
---

## 什么是 toValue

`toValue` 是 Vue 3.3+ 提供的一个小工具函数，用来**统一读取"也许是值、也许是 ref、也许是 getter 函数"的输入**。它会在你需要"取当前值"时，帮你把不同形态的输入都转换成**具体值**。

---

## 它做了什么

- 如果传入是 **原始值**：直接返回该值。
- 如果传入是 **ref/computed**：返回 `.value`。
- 如果传入是 **函数（getter）**：调用一次函数并返回结果。

> 类型上常配合 `MaybeRefOrGetter<T>` 一起用：`T | Ref<T> | ComputedRef<T> | (() => T)`。

---

## 与 `unref` 的区别

- **`unref(x)`**：只会解包 **ref/computed**；如果是函数，会原样返回这个函数（不会调用）。
- **`toValue(x)`**：除了解包 **ref/computed**，**还会调用函数** 并取其返回值。

因此：

- 你希望"支持传入 getter 并取当前值" → 用 **toValue**。
- 传入一定不是函数，只是要解包 ref → 用 **unref** 也可以。

### 对比示例

```ts
import { ref, unref, toValue } from "vue";

const count = ref(10);
const getter = () => 20;

// unref 不会调用函数
console.log(unref(count)); // 10
console.log(unref(getter)); // () => 20 (函数本身)

// toValue 会调用函数
console.log(toValue(count)); // 10
console.log(toValue(getter)); // 20 (调用后的返回值)
```

---

## 重要特性与注意点

### 1. 不建立依赖追踪

`toValue()` 只是"读当前值"。如果你需要在值变化时同步更新，**不要在 `watch` 的 source 里用 `toValue`**；而是把 **原始的 ref/computed/getter** 直接交给 `watch`，让 `watch` 自己追踪。

### 2. 只读一次

如果你多次调用 `toValue`，就会多次读取/计算（对 getter 也会多次调用）。

### 3. 更宽容的 API 设计

允许调用方传值/传 ref/传 computed/传 getter，降低接入成本。

---

## 什么时候用

### 1. Composable 内部读取入参的"当前值"（一次性读）

```ts
function useX(input: MaybeRefOrGetter<number>) {
  const now = toValue(input); // 当前值
}
```

### 2. 组合"静态 + 响应式配置"时临时展开

```ts
const opts = () => ({ throttleMs: 0, ...toValue(options) });
```

### 3. 在普通函数中处理可能的响应式值

```ts
function calculatePrice(input: MaybeRefOrGetter<number>) {
  const price = toValue(input);
  return price * 1.1; // 加 10% 税
}
```

---

## 什么时候别用

### ❌ 不要作为 `watch` 的依赖源

```ts
// ❌ 不要这样：这样不会追踪变化
watch(
  () => toValue(input),
  (v) => {
    // ...
  }
);

// ✅ 直接把源交给 watch（可以是 ref/computed/getter）
watch(input, (v) => {
  // ...
});
```

### ❌ 期望缓存或惰性计算

用 `computed` 更合适；`toValue` 每次都会重新求值。

```ts
// ❌ 不推荐：每次调用都重新计算
function useData(input: MaybeRefOrGetter<number>) {
  const doubled = () => toValue(input) * 2;
  // 每次调用 doubled() 都会重新计算
}

// ✅ 推荐：使用 computed 缓存
function useData(input: MaybeRefOrGetter<number>) {
  const doubled = computed(() => toValue(input) * 2);
  // 只在 input 变化时重新计算
}
```

---

## 完整示例

```ts
import { toValue, watch, computed } from "vue";
import type { MaybeRefOrGetter } from "vue";

// 1) 一次性读取当前值
function usePrice(input: MaybeRefOrGetter<number>) {
  const initial = toValue(input);
  console.log("初始价格:", initial);
  // ...
}

// 2) 正确订阅变化（不要把 toValue 放在 source 里）
function useSubscribe(input: MaybeRefOrGetter<number>) {
  watch(input, (cur, prev) => {
    console.log("从", prev, "变为", cur);
    // 每次 input 变更都会触发
  });
}

// 3) 选项对象既支持静态也支持响应式
function useThing(opts?: MaybeRefOrGetter<{ deep?: boolean; ms?: number }>) {
  const getOpts = () => ({ deep: false, ms: 0, ...toValue(opts) });
  const needsDeep = computed(() => !!getOpts().deep);

  watch(
    () => toValue(opts),
    (newOpts) => {
      console.log("配置变化:", newOpts);
    },
    { deep: true }
  );
}
```

---

## 实战应用场景

### 场景 1：灵活的 Composable 参数

```ts
function useDebounce<T>(
  value: MaybeRefOrGetter<T>,
  delay: MaybeRefOrGetter<number> = 300
) {
  const debouncedValue = ref<T>(toValue(value));
  let timer: number | null = null;

  watch(value, (newVal) => {
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(() => {
      debouncedValue.value = newVal;
    }, toValue(delay));
  });

  return debouncedValue;
}

// 使用
const input = ref("hello");
const delay = computed(() => props.delayMs);

// 支持 ref、computed、原始值、getter
const debounced1 = useDebounce(input, 500);
const debounced2 = useDebounce(input, delay);
const debounced3 = useDebounce(
  () => route.query.q,
  () => store.delayMs
);
```

### 场景 2：条件配置合并

```ts
interface Options {
  timeout?: number;
  retry?: boolean;
  cache?: boolean;
}

function useFetch(
  url: MaybeRefOrGetter<string>,
  options?: MaybeRefOrGetter<Options>
) {
  // 默认配置 + 用户配置（支持响应式）
  const getOptions = () => ({
    timeout: 5000,
    retry: true,
    cache: false,
    ...toValue(options),
  });

  const data = ref(null);

  watchEffect(async () => {
    const opts = getOptions();
    const currentUrl = toValue(url);

    // 使用合并后的配置发起请求
    const response = await fetch(currentUrl, {
      signal: AbortSignal.timeout(opts.timeout),
    });
    data.value = await response.json();
  });

  return { data };
}
```

### 场景 3：表单验证器

```ts
function useValidator(
  value: MaybeRefOrGetter<string>,
  rules: MaybeRefOrGetter<Array<(v: string) => boolean | string>>
) {
  const error = ref<string | null>(null);

  watch(
    value,
    (val) => {
      const currentRules = toValue(rules);
      for (const rule of currentRules) {
        const result = rule(val);
        if (result !== true) {
          error.value = typeof result === "string" ? result : "验证失败";
          return;
        }
      }
      error.value = null;
    },
    { immediate: true }
  );

  return { error };
}

// 使用
const username = ref("");
const { error } = useValidator(username, [
  (v) => v.length >= 3 || "至少 3 个字符",
  (v) => /^[a-z0-9]+$/.test(v) || "只能包含小写字母和数字",
]);
```

---

## 类型定义参考

```ts
// Vue 内部的类型定义
export type MaybeRef<T> = T | Ref<T>;
export type MaybeRefOrGetter<T> = MaybeRef<T> | (() => T);

// toValue 的简化实现（帮助理解）
export function toValue<T>(source: MaybeRefOrGetter<T>): T {
  return typeof source === "function" ? (source as () => T)() : unref(source);
}
```

---

## 一句话总结

> `toValue` = **"统一取值器"**：值 / ref / computed / getter → 一次性拿到当前值；**读值用它，订阅变化别用它**（把原始源交给 `watch`）。

---

## 最佳实践清单

✅ **推荐做法：**

- 在 Composable 函数签名中使用 `MaybeRefOrGetter<T>`
- 需要取当前值时使用 `toValue`
- 需要订阅变化时直接把原始源传给 `watch`
- 配合 `computed` 创建衍生值

❌ **避免做法：**

- 在 `watch` 的 source 函数中调用 `toValue`
- 期望 `toValue` 能建立响应式依赖
- 在性能敏感的循环中频繁调用 `toValue`
- 用 `toValue` 替代 `computed` 做缓存

---

## 相关 API 对比

| API        | 处理值      | 处理 ref       | 处理 computed      | 处理 getter     | 建立依赖 |
| ---------- | ----------- | -------------- | ------------------ | --------------- | -------- |
| `toValue`  | ✅ 返回原值 | ✅ 返回 .value | ✅ 返回 .value     | ✅ 调用并返回   | ❌       |
| `unref`    | ✅ 返回原值 | ✅ 返回 .value | ✅ 返回 .value     | ❌ 返回函数本身 | ❌       |
| `toRef`    | ✅ 转为 ref | ✅ 返回原 ref  | ✅ 返回原 computed | ❌ 不支持       | ✅       |
| `computed` | ✅ 包装     | ✅ 自动解包    | ✅ 链式计算        | ✅ 执行 getter  | ✅       |

---

通过合理使用 `toValue`，你可以设计出更灵活、更易用的 Composable 函数，同时保持代码的响应性和性能。
