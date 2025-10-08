---

title: 在哪里调用 `useModalManagerStore()`？三种写法的实例对比与差异全集
date: 2025-09-26
tags: [Vue3, Pinia, 组合式函数, SSR, 性能, 可测试性]
-----------------------------------------

# 结论速览

* **最佳**：在**组合式内部**、**方法外**创建（推荐）。
* **可用但不优**：在**方法内部**每次调用时创建。
* **不推荐**：在**模块顶层**（组合式外）创建。

下面用**最小可运行片段**对比三种写法在**实例化次数、依赖注入、SSR 隔离、HMR、可测试性、生命周期、订阅副作用**上的差异。

---

## 基础准备

```ts
// stores/modal.ts
import { defineStore } from "pinia";
export const useModalManagerStore = defineStore("modal", {
  state: () => ({ openCount: 0 }),
  actions: {
    open() {
      this.openCount++;
      return Promise.resolve({ ok: true, data: { modalId: "m1" } });
    },
    operationSuccess() {},
    operationFailed() {},
  },
});
```

---

## A. 在**组合式内部、方法外**创建（✅ 推荐）

```ts
// useCreateAccount.ts
import { useModalManagerStore } from "@/store";
import { ref } from "vue";

export const useCreateAccount = () => {
  // 复杂逻辑：依赖当前 app 的 active pinia；实例只取一次，复用且 SSR 安全
  const modalStore = useModalManagerStore();
  const createAccountLoading = ref(false);

  const handleCreateAccount = async (type: "internal" | "external") => {
    createAccountLoading.value = true;
    try {
      const resp = await modalStore.open();
      if (resp.ok) modalStore.operationSuccess("m1", { success: true });
    } finally {
      createAccountLoading.value = false;
    }
  };

  return { handleCreateAccount };
};
```

**表现与优势**

- **实例化次数**：每个组件实例 / 每次调用 `useCreateAccount()` 仅取一次 store。
- **依赖注入**：读取的是**当前应用上下文**的 active pinia（对微前端/多实例友好）。
- **SSR 隔离**：每个请求各自的 pinia，不会串数据。
- **可测试性**：单测里 `setActivePinia(createPinia())` 即可；易 Mock。
- **性能与可读性**：无重复获取，语义清晰。
- **订阅副作用**：在组件/组合式生命周期内创建，随组件销毁而释放。

---

## B. 在**方法内部**创建（🟡 可用但不优）

```ts
// useCreateAccount.ts
import { useModalManagerStore } from "@/store";
import { ref } from "vue";

export const useCreateAccount = () => {
  const createAccountLoading = ref(false);

  const handleCreateAccount = async (type: "internal" | "external") => {
    // 复杂逻辑：每次调用都执行一次 useModalManagerStore()，虽返回同一实例，但不必要
    const modalStore = useModalManagerStore();
    createAccountLoading.value = true;
    try {
      const resp = await modalStore.open();
      if (resp.ok) modalStore.operationSuccess("m1", { success: true });
    } finally {
      createAccountLoading.value = false;
    }
  };

  return { handleCreateAccount };
};
```

**利弊**

- **实例化次数**：方法每次被调用都会取一次（Pinia 会返回同一实例，但多余的函数调用与可读性负担）。
- **依赖注入**：仍能拿到当前 active pinia。
- **SSR**：安全，但如果方法在异步回调中被频繁触发，会**多次访问容器**。
- **可测试性**：Mock 仍可，但需要在**调用点**注入环境。
- **适用场景**：极少数需要**延迟取用**（只有用户触发时才访问 store）的场合。

---

## C. 在**模块顶层**（组合式外）创建（❌ 不推荐）

```ts
// useCreateAccount.ts
import { useModalManagerStore } from "@/store";

// 复杂逻辑：模块加载时就取 store —— 会绑定“当时的 active pinia”
// SSR/多应用实例/多路由应用下可能导致跨请求/跨实例共享状态
const modalStore = useModalManagerStore();

export const useCreateAccount = () => {
  const handleCreateAccount = async () => {
    const resp = await modalStore.open();
    if (resp.ok) modalStore.operationSuccess("m1", { success: true });
  };
  return { handleCreateAccount };
};
```

**风险**

- **依赖注入时机错误**：在 app 尚未 `setActivePinia` 前导入该模块，会拿到**空上下文**或错误上下文。
- **SSR 泄漏**：Node 端**同一模块单例**被多个请求复用，导致**状态串请求**。
- **HMR/多 App**：热更或微前端里可能挂到**不同根实例**，但这里已绑定旧实例。
- **订阅副作用**：若 store 内有订阅/watch/定时器，顶层创建会**常驻内存**。

---

## 维度对比清单

| 维度            | 组合式内·方法外（A）           | 方法内（B）           | 模块顶层（C）     |
| --------------- | ------------------------------ | --------------------- | ----------------- |
| 实例化次数      | ✅ 1 次/组合式实例             | 🟡 每次方法调用取一次 | ❌ 模块加载即取   |
| 依赖注入时机    | ✅ 正确（active pinia 就绪后） | ✅ 正确               | ❌ 可能过早       |
| SSR 请求隔离    | ✅ 隔离良好                    | ✅ 隔离良好           | ❌ 易串请求       |
| HMR/多应用实例  | ✅ 安全                        | ✅ 安全               | ❌ 可能指向旧实例 |
| 可测试性/Mock   | ✅ 最佳                        | 🟡 可                 | 🟡 需小心环境     |
| 性能/可读性     | ✅ 清晰                        | 🟡 冗余调用           | 🟡 全局副作用     |
| 订阅/副作用释放 | ✅ 随组件生命周期              | ✅ 随组件生命周期     | ❌ 常驻、难释放   |

---

## 可观测小实验（验证“方法内多次获取”）

```ts
// 在 store 里加个日志（仅调试用）
export const useModalManagerStore = defineStore("modal", {
  state: () => ({ openCount: 0 }),
  actions: {
    open() {
      this.openCount++;
      return Promise.resolve({ ok: true });
    },
  },
  // 复杂逻辑：Pinia 真实只会返回一个实例，但我们用日志统计调用 useModalManagerStore 的次数
});
```

```ts
// 组件里
const { handleCreateAccount: A } = useCreateAccount(); // A 版本（组合式内·方法外）
const { handleCreateAccount: B } = useCreateAccount(); // B 版本（方法内取）

await A("internal");
await A("internal");
// 日志：useModalManagerStore() 调用 1 次

await B("internal");
await B("internal");
// 日志：useModalManagerStore() 调用 2 次（每次方法执行一次）
```

> 说明：**Pinia 仍会返回同一 store 实例**，但 B 多了函数调用与依赖获取开销；在高频交互路径中没有必要。

---

## SSR 场景的典型坑（为什么 C 危险）

- 服务端：`import` 时就执行了 `useModalManagerStore()`，**绑定了第一个请求**的 pinia。
- 第二个请求来时，模块**不会重新执行**顶层代码（Node 模块缓存），导致**两个请求共享一个 store**，出现数据串话。

---

## 最后给出你的目标组合式的**推荐写法**

```ts
// ✅ useCreateAccount.ts —— 推荐模式（A）
import { useModalManagerStore } from "@/store";
import { message } from "ant-design-vue";
import { ref } from "vue";

export const useCreateAccount = () => {
  // 复杂逻辑：一次获取当前应用上下文下的 store，SSR/HMR 安全
  const modalStore = useModalManagerStore();
  const createAccountLoading = ref(false);

  const handleCreateAccount = async (type: "internal" | "external") => {
    try {
      const resp = await modalStore.open("AccountModal", {
        loading: createAccountLoading.value,
        mode: type,
      });
      if (resp?.ok)
        modalStore.operationSuccess(resp.data?.modalId, { success: true });
    } catch (e: any) {
      modalStore.operationFailed(e?.modalId, {
        message: e?.message || "操作失败",
        code: e?.code || "REQUEST_FAILED",
        retryable: true,
      });
      message.error(e?.message || "操作失败");
      throw e;
    }
  };

  return { handleCreateAccount };
};
```

---

## 选择建议（一句话版）

- **普通 SPA/CSR/SSR**：选 **A（组合式内·方法外）**。
- **必须“懒获取”依赖**且方法很少被触发：**B**可接受。
- **任何情况下**：避免 **C（模块顶层）**。
