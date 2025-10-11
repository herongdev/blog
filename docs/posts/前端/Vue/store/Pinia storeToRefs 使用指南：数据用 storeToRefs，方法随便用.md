---
title: Pinia storeToRefs 使用指南：数据用 storeToRefs，方法随便用
date: 2025-10-09
tags:
  - Vue3
  - Pinia
  - storeToRefs
  - 响应式
  - 最佳实践
---

# 🎯 Pinia Store 最佳实践教程

## 📌 核心原则

### 一句话总结

**数据用 `storeToRefs`，方法随便用**

---

## 🔥 场景 1：在组件中使用 Store

### ❌ 错误做法

```typescript
<script setup>
  import {useUserStore} from '@/store' // ❌ 直接解构会丢失响应式 const{" "}
  {(username, age)} = useUserStore() // ❌ username 和 age
  不是响应式的，界面不会更新
</script>
```

### ✅ 正确做法

```typescript
<script setup>
  import {storeToRefs} from 'pinia' import {useUserStore} from '@/store' const
  userStore = useUserStore() // ✅ 状态：用 storeToRefs 保持响应式 const{" "}
  {(username, age)} = storeToRefs(userStore) // ✅ 方法：直接从 store
  解构（可选） const {(updateUser, logout)} = userStore // 或者直接调用 //
  userStore.updateUser()
</script>
```

---

## 🔥 场景 2：在 Store 中嵌套使用其他 Store

### ❌ 错误做法

```typescript
import { defineStore } from "pinia";
import { useOtherStore } from "./other";

export const useMyStore = defineStore("my", () => {
  // ❌ 直接解构会失去响应式连接
  const { data, loading } = useOtherStore();

  return {
    data, // ❌ 不是响应式的
    loading, // ❌ 不是响应式的
  };
});
```

### ✅ 正确做法

```typescript
import { defineStore, storeToRefs } from "pinia";
import { useOtherStore } from "./other";

export const useMyStore = defineStore("my", () => {
  const otherStore = useOtherStore();

  // ✅ 状态：用 storeToRefs 提取响应式引用
  const { data, loading } = storeToRefs(otherStore);

  // ✅ 方法：直接解构（可选）
  const { fetchData, clearData } = otherStore;

  return {
    // 状态：返回 ref 对象
    data,
    loading,
    // 方法：返回函数
    fetchData,
    clearData,
  };
});
```

---

## 🎓 为什么要这样做？

### 1️⃣ 直接解构会丢失响应式

```typescript
const store = useUserStore();
const { name } = store; // ❌ 只是拷贝了当前的值

// 等同于：
const name = store.name; // 获取的是快照，不是实时数据
```

### 2️⃣ storeToRefs 创建响应式连接

```typescript
const store = useUserStore();
const { name } = storeToRefs(store); // ✅ name 是一个 ref，保持同步

// 等同于：
const name = ref(store.name); // 并且会自动同步 store 的变化
```

### 3️⃣ 方法不需要响应式

```typescript
// 方法是普通函数，不需要响应式系统追踪
const { updateUser } = useUserStore(); // ✅ 这样就可以

// 或者
const userStore = useUserStore();
userStore.updateUser(); // ✅ 这样也可以
```

---

## 📋 完整示例

### Store 定义（嵌套使用）

```typescript
// store/trade/tabs.ts
import { defineStore, storeToRefs } from "pinia";
import { useAccountStore } from "@/store/account";

export const useTradeTabsStore = defineStore("tradeTabs", () => {
  const accountStore = useAccountStore();
  const { selectedAccount, selectedLoginid } = storeToRefs(accountStore);

  const tabs = ref([]);
  const selectedTab = ref(null);

  const updateTabs = (newTabs) => {
    tabs.value = newTabs;
  };

  return {
    tabs,
    selectedTab,
    updateTabs,
  };
});
```

```typescript
// store/trade/trade.ts
import { defineStore, storeToRefs } from "pinia";
import { useTradeTabsStore } from "./tabs";

export const useTradeStore = defineStore("trade", () => {
  const tabsStore = useTradeTabsStore();

  // ✅ 状态用 storeToRefs
  const { tabs, selectedTab } = storeToRefs(tabsStore);

  // ✅ 方法直接解构
  const { updateTabs, updateActiveSymbol } = tabsStore;

  const reset = () => {
    tabsStore.reset();
  };

  return {
    tabs,
    selectedTab,
    updateTabs,
    updateActiveSymbol,
    reset,
  };
});
```

### 在组件中使用

```vue
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTradeStore } from "@/store";

// ========== Stores ==========
const tradeStore = useTradeStore();

// ========== 响应式状态（使用 storeToRefs） ==========
const { tabs, selectedTab } = storeToRefs(tradeStore);

// ========== Store 方法（直接解构） ==========
const { updateTabs, updateActiveSymbol, reset } = tradeStore;

// 使用状态
console.log(tabs.value); // ✅ 需要 .value
console.log(selectedTab.value); // ✅ 需要 .value

// 调用方法
updateTabs([...tabs.value, newTab]); // ✅ 直接调用
reset(); // ✅ 直接调用
</script>

<template>
  <!-- 模板中自动解包，不需要 .value -->
  <div v-for="tab in tabs" :key="tab.id">
    {{ tab.name }}
  </div>
</template>
```

---

## 🎯 记忆口诀

| 内容              | 做法                     | 原因                 |
| ----------------- | ------------------------ | -------------------- |
| 📊 **状态/数据**  | 必须用 `storeToRefs`     | 保持响应式连接       |
| 🔧 **方法/函数**  | 直接解构或调用都可以     | 普通函数不需要响应式 |
| 🔗 **嵌套 Store** | 每一层都用 `storeToRefs` | 链条上每一环都要连接 |

---

## ⚠️ 常见错误

### 错误 1：在 store 中直接解构另一个 store

```typescript
// ❌ 错误
const { data } = useOtherStore();

// ✅ 正确
const { data } = storeToRefs(useOtherStore());
```

### 错误 2：在组件中直接解构 store

```typescript
// ❌ 错误
const { username } = useUserStore();

// ✅ 正确
const { username } = storeToRefs(useUserStore());
```

### 错误 3：对方法使用 storeToRefs

```typescript
// ❌ 没必要（虽然不会报错）
const { updateUser } = storeToRefs(useUserStore());

// ✅ 直接解构即可
const { updateUser } = useUserStore();
```

---

## 🎬 总结

1. **状态必须用 `storeToRefs`**，否则丢失响应式
2. **方法可以直接解构**，也可以通过 store 实例调用
3. **嵌套 store 时每一层都要用 `storeToRefs`** 来处理状态
4. **清晰分组**：把状态和方法的声明分开，代码更易读

---

## 💡 最佳实践示例

```typescript
// ========== Stores ==========
const accountStore = useAccountStore();
const tradeStore = useTradeStore();
const symbolInfoStore = useSymbolInfoStore();

// ========== 响应式状态（使用 storeToRefs） ==========
const { symbolSpecificationMap } = storeToRefs(symbolInfoStore);
const { selectedTab, tabs } = storeToRefs(tradeStore);
const { selectedLoginid, selectedAccount } = storeToRefs(accountStore);

// ========== Store 方法（直接解构） ==========
const { updateTabs, updateActiveSymbol, reset } = tradeStore;
const { fetchSymbols } = symbolInfoStore;
```

---

## 🔍 技术细节：storeToRefs 的实现原理

### 为什么直接解构会丢失响应式？

```typescript
// Store 内部大致结构
const store = {
  name: ref("张三"),
  age: ref(25),
  updateName: () => {},
};

// 直接解构
const { name, age } = store;
// 等同于：
const name = store.name; // 只获取了 ref 的引用
const age = store.age;
```

看起来没问题？但是在 Pinia 内部，状态会经过 reactive 包裹：

```typescript
const store = reactive({
  name: ref("张三"),
  age: ref(25),
});

// 直接解构会导致响应式丢失
const { name } = store; // name 不再是 ref
```

### storeToRefs 的作用

```typescript
// storeToRefs 的简化实现
function storeToRefs(store) {
  const refs = {};
  for (const key in store) {
    const value = store[key];
    if (isRef(value) || isReactive(value)) {
      // 只提取响应式属性，跳过方法
      refs[key] = toRef(store, key);
    }
  }
  return refs;
}
```

它会：

1. 遍历 store 的所有属性
2. 只提取响应式的状态（ref/reactive）
3. 使用 `toRef` 创建响应式连接
4. 跳过方法和非响应式属性

---

## 🎓 进阶：computed 和 storeToRefs 的配合

在 store 中定义 computed 状态：

```typescript
// store/user.ts
export const useUserStore = defineStore("user", () => {
  const firstName = ref("张");
  const lastName = ref("三");

  // computed 状态
  const fullName = computed(() => `${firstName.value}${lastName.value}`);

  return {
    firstName,
    lastName,
    fullName,
  };
});
```

在组件中使用：

```vue
<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store";

const userStore = useUserStore();

// ✅ computed 状态也需要用 storeToRefs
const { firstName, lastName, fullName } = storeToRefs(userStore);

// fullName 会自动响应 firstName 和 lastName 的变化
</script>
```

---

## 🔗 相关资源

- [Pinia 官方文档 - storeToRefs](https://pinia.vuejs.org/api/modules/pinia.html#storetorefs)
- [Vue 3 响应式原理](https://vuejs.org/guide/extras/reactivity-in-depth.html)
- [大型项目中的 Pinia Store 组织架构：按领域拆分与聚合门面模式](./大型项目中的%20Pinia%20Store%20组织架构：按领域拆分与聚合门面模式.md)
