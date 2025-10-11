---
title: Vue3 readonly：只读但响应式，理解与最佳实践
date: 2025-10-09
tags:
  - Vue3
  - readonly
  - 响应式
  - API设计
  - 最佳实践
---

## 核心结论

`readonly(_tabs)` 依然是**响应式的**，会**跟踪 `_tabs` 的变化**，只是对外**禁止改写**。

---

## 📌 要点一览

- ✅ **会更新**：当你对原始的 `_tabs.value` 赋值或修改（如 `push/splice`）时，`tabs`（只读代理）会随之更新；`watch/computed/模板 v-for` 都会正常响应。
- ❌ **不能改**：对 `tabs` 本身做任何写操作都会在开发环境报警（例如 `tabs.value = [...]` 或 `tabs.value.push(...)`）。正确做法是只改 `_tabs`。
- 📝 **类型上是只读**：在 TS 中，`const tabs = readonly(_tabs)` 的类型会变成 `DeepReadonly<Ref<...>>`，调用方拿到 `tabs` 时只能读，不能写。
- 🔍 **区分**：`readonly` 是深只读；如果只想顶层只读，用 `shallowReadonly`。

---

## 🔬 最小验证示例

```typescript
import { ref, readonly, watch } from "vue";

const _tabs = ref<number[]>([]);
const tabs = readonly(_tabs);

// ✅ watch 可以正常监听 readonly 的变化
watch(tabs, (v) => console.log("tabs changed:", v));

// ✅ 通过原始 ref 修改，tabs 会更新，watch 会触发
_tabs.value.push(1);
// 输出: tabs changed: [1]

// ❌ 直接修改 readonly 会报警（开发环境）
tabs.value.push(2);
// Warning: Set operation on key "push" failed: target is readonly.

// ✅ 替换整个数组也能正常响应
_tabs.value = [3, 4];
// 输出: tabs changed: [3, 4]

// ❌ readonly 不允许重新赋值
tabs.value = [5];
// Warning: Set operation on key "value" failed: target is readonly.
```

---

## 🎯 使用场景

### 场景 1：Pinia Store 中的单向数据流

在 Pinia Store 中，我们经常需要对外暴露只读状态，只能通过方法修改：

```typescript
// store/trade.ts
import { defineStore } from "pinia";
import { ref, readonly } from "vue";

export const useTradeStore = defineStore("trade", () => {
  // 内部可写的私有状态
  const _tabs = ref<SymbolTabItem[]>([]);
  const _selectedTab = ref<SymbolTabItem | null>(null);

  // 对外暴露的只读状态
  const tabs = readonly(_tabs);
  const selectedTab = readonly(_selectedTab);

  // 只能通过方法修改
  const updateTabs = (newTabs: SymbolTabItem[]) => {
    _tabs.value = newTabs;
  };

  const setSelectedTab = (tab: SymbolTabItem | null) => {
    _selectedTab.value = tab;
  };

  return {
    // 只读状态
    tabs,
    selectedTab,
    // 修改方法
    updateTabs,
    setSelectedTab,
  };
});
```

**使用时**：

```vue
<script setup lang="ts">
import { useTradeStore } from "@/store";

const tradeStore = useTradeStore();

// ✅ 可以读取和响应
console.log(tradeStore.tabs); // 正常显示
watch(
  () => tradeStore.tabs,
  (tabs) => {
    console.log("tabs changed:", tabs); // 能正常触发
  }
);

// ❌ 不能直接修改（TypeScript 会报错，运行时会警告）
tradeStore.tabs.value = []; // TS Error & Runtime Warning

// ✅ 只能通过方法修改
tradeStore.updateTabs([newTab]);
</script>
```

### 场景 2：Props 的单向数据流

父组件传递可修改的数据，子组件通过 `readonly` 确保不会意外修改：

```vue
<!-- ParentComponent.vue -->
<script setup lang="ts">
import { ref } from "vue";
import ChildComponent from "./ChildComponent.vue";

const items = ref([1, 2, 3]);

const addItem = () => {
  items.value.push(items.value.length + 1);
};
</script>

<template>
  <ChildComponent :items="items" />
  <button @click="addItem">添加项</button>
</template>
```

```vue
<!-- ChildComponent.vue -->
<script setup lang="ts">
import { readonly, toRef } from "vue";

interface Props {
  items: number[];
}

const props = defineProps<Props>();

// 将 props 转为只读，防止意外修改
const readonlyItems = readonly(toRef(props, "items"));

// ❌ 这样会报错
// readonlyItems.value.push(4);

// ✅ 只能读取和响应
watch(readonlyItems, (items) => {
  console.log("items changed:", items);
});
</script>

<template>
  <div v-for="item in readonlyItems" :key="item">
    {{ item }}
  </div>
</template>
```

### 场景 3：Composables 中的封装

在 composable 中封装状态，只暴露只读版本：

```typescript
// composables/useCounter.ts
import { ref, readonly, computed } from "vue";

export function useCounter(initialValue = 0) {
  // 私有状态
  const _count = ref(initialValue);

  // 公开的只读状态
  const count = readonly(_count);

  // 派生状态也是只读的
  const doubleCount = computed(() => _count.value * 2);

  // 修改方法
  const increment = () => {
    _count.value++;
  };

  const decrement = () => {
    _count.value--;
  };

  const reset = () => {
    _count.value = initialValue;
  };

  return {
    // 只读状态
    count,
    doubleCount,
    // 修改方法
    increment,
    decrement,
    reset,
  };
}
```

**使用时**：

```vue
<script setup lang="ts">
import { useCounter } from "@/composables/useCounter";

const { count, doubleCount, increment, decrement } = useCounter(10);

// ✅ 可以读取和监听
console.log(count.value); // 10
watch(count, (val) => console.log("count changed:", val));

// ❌ 不能直接修改
// count.value = 100; // TS Error & Runtime Warning

// ✅ 只能通过方法修改
increment(); // count 变为 11
</script>
```

---

## 🔍 深入理解：readonly vs shallowReadonly

### readonly（深只读）

```typescript
import { ref, readonly } from "vue";

const original = ref({
  user: {
    name: "张三",
    age: 25,
    address: {
      city: "北京",
    },
  },
});

const readonlyObj = readonly(original);

// ❌ 所有层级都不能修改
readonlyObj.value.user.name = "李四"; // Warning
readonlyObj.value.user.address.city = "上海"; // Warning
```

### shallowReadonly（浅只读）

```typescript
import { ref, shallowReadonly } from "vue";

const original = ref({
  user: {
    name: "张三",
    age: 25,
    address: {
      city: "北京",
    },
  },
});

const shallowReadonlyObj = shallowReadonly(original);

// ❌ 第一层不能修改
shallowReadonlyObj.value = {}; // Warning

// ✅ 深层可以修改（不推荐，破坏了只读语义）
shallowReadonlyObj.value.user.name = "李四"; // 可以修改
shallowReadonlyObj.value.user.address.city = "上海"; // 可以修改
```

**建议**：大多数情况使用 `readonly`，除非你明确知道需要浅只读。

---

## 📊 对比表格

| 特性            | readonly                     | 原始 ref/reactive    | computed            |
| --------------- | ---------------------------- | -------------------- | ------------------- |
| 响应式          | ✅ 是                        | ✅ 是                | ✅ 是               |
| 可修改          | ❌ 否                        | ✅ 是                | ❌ 否               |
| 可被 watch      | ✅ 可以                      | ✅ 可以              | ✅ 可以             |
| 模板中可用      | ✅ 可以                      | ✅ 可以              | ✅ 可以             |
| TypeScript 类型 | DeepReadonly<T>              | Ref<T> / Reactive<T> | ComputedRef<T>      |
| 使用场景        | 防止外部修改，保持单向数据流 | 正常的响应式状态     | 派生状态            |
| 性能开销        | 几乎没有（只是代理层）       | 正常                 | 首次计算 + 依赖追踪 |

---

## ⚠️ 常见误区

### 误区 1：readonly 不是响应式的

❌ **错误理解**：

```typescript
const tabs = readonly(_tabs);
// 以为 tabs 不会更新
```

✅ **正确理解**：

```typescript
const tabs = readonly(_tabs);
// tabs 依然是响应式的，会跟随 _tabs 的变化而变化
// 只是不能通过 tabs 本身修改数据
```

### 误区 2：readonly 会创建数据副本

❌ **错误理解**：

```typescript
const tabs = readonly(_tabs);
// 以为 tabs 是 _tabs 的副本
```

✅ **正确理解**：

```typescript
const tabs = readonly(_tabs);
// tabs 是 _tabs 的只读代理，指向同一份数据
// 修改 _tabs 会立即反映到 tabs
```

### 误区 3：需要用 .value 访问 readonly

❌ **错误用法**：

```typescript
const _tabs = ref([]);
const tabs = readonly(_tabs);

// 错误：以为不需要 .value
console.log(tabs); // 这是 Ref 对象
```

✅ **正确用法**：

```typescript
const _tabs = ref([]);
const tabs = readonly(_tabs);

// 正确：readonly(ref) 依然需要 .value
console.log(tabs.value); // [...]

// 在模板中自动解包
<template>
  <div v-for="tab in tabs" :key="tab.id">
    {{ tab.name }}
  </div>
</template>
```

---

## 🎯 最佳实践

### 1. 命名约定

```typescript
// ✅ 推荐：私有状态用下划线前缀
const _tabs = ref([]);
const tabs = readonly(_tabs);

// 或者
const tabsInternal = ref([]);
const tabs = readonly(tabsInternal);
```

### 2. Store 中的一致性

```typescript
export const useMyStore = defineStore("my", () => {
  // 所有私有状态
  const _state1 = ref();
  const _state2 = ref();

  // 所有公开只读状态
  const state1 = readonly(_state1);
  const state2 = readonly(_state2);

  // 所有修改方法
  const updateState1 = () => {};
  const updateState2 = () => {};

  return {
    // 公开接口
    state1,
    state2,
    updateState1,
    updateState2,
  };
});
```

### 3. 配合 storeToRefs 使用

```typescript
// store/trade.ts
export const useTradeStore = defineStore("trade", () => {
  const _tabs = ref([]);
  const tabs = readonly(_tabs);

  return { tabs };
});

// 组件中
import { storeToRefs } from "pinia";
import { useTradeStore } from "@/store";

const tradeStore = useTradeStore();

// ✅ readonly 的状态也需要用 storeToRefs
const { tabs } = storeToRefs(tradeStore);

// tabs 依然是响应式的 readonly ref
watch(tabs, (newTabs) => {
  console.log("tabs changed:", newTabs);
});
```

### 4. TypeScript 类型定义

```typescript
import { Ref, DeepReadonly } from "vue";

interface SymbolTabItem {
  symbol: string;
  name: string;
}

// 明确标注返回类型
export const useTradeStore = defineStore("trade", () => {
  const _tabs = ref<SymbolTabItem[]>([]);

  // 返回类型自动推导为 DeepReadonly<Ref<SymbolTabItem[]>>
  const tabs = readonly(_tabs);

  return {
    tabs, // TypeScript 会自动知道这是只读的
  };
});
```

---

## 🔗 相关资源

- [Vue 3 官方文档 - readonly](https://vuejs.org/api/reactivity-core.html#readonly)
- [Vue 3 响应式原理](https://vuejs.org/guide/extras/reactivity-in-depth.html)
- [Pinia storeToRefs 使用指南：数据用 storeToRefs，方法随便用](./store/Pinia%20storeToRefs%20使用指南：数据用%20storeToRefs，方法随便用.md)
- [大型项目中的 Pinia Store 组织架构：按领域拆分与聚合门面模式](./store/大型项目中的%20Pinia%20Store%20组织架构：按领域拆分与聚合门面模式.md)

---

## 📝 总结

1. **readonly 是响应式的**，只是不能修改
2. **通过原始数据修改**，readonly 代理会同步更新
3. **适用于单向数据流**，防止外部意外修改状态
4. **TypeScript 友好**，类型系统会确保只读约束
5. **性能开销极小**，只是简单的代理层

使用 `readonly` 可以在保持响应式的同时，强制执行单向数据流，这是构建可维护大型应用的重要模式。

