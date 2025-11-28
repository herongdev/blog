---
title: Vue3 + TypeScript 项目中使用装饰器（Decorators）的完整指南
date: 2025-11-19
tags:
---

## 整体实现思路

先把结论说清楚：

1. **语言级装饰器能做什么？**
   TypeScript 支持用 `@xxx` 这种语法给「类 / 方法 / 属性 / 参数」加上额外行为，本质是一个函数，在运行时拿到被装饰的目标，然后你可以在里面**包一层前后逻辑**（日志、鉴权、KYC 检查等等）。([TypeScript][1])

2. **限制：不能直接装饰 `const handleDelete = () => {}` 这种函数**
   当前标准的装饰器语法（TS 5+ 对应的 ECMAScript Stage 3 装饰器）**只支持类相关成员**，不能写成：

   ```ts
   @XXX
   const handleDelete = () => {}
   ```

   这一行会直接报错。所以要想用 `@XXX` 语法，只能绕到「类方法」上。([TypeScript][1])

3. **在 Vue3 + 组合式 API 中的推荐做法**

   - 建一个「**服务类 / Handler 类**」，把原来的逻辑函数挪进去，当成类方法；
   - 在类方法上加 `@Decorator`，在装饰器里做「执行前 / 执行后」逻辑；
   - 在 `<script setup>` 里 `new` 这个类，把方法实例化后暴露出去，模板里照样用 `@delete="handler.handleDelete"`。
   - 对于不想用 `@` 语法、但只想给函数「套壳」的场景，可以用一个「高阶函数版装饰器」：`const wrapped = withKyc(handleDelete)` —— 这个我们后面给你做成第二套方案。

> 你现在的需求「在执行 `handleDelete` 前跑一次 `useKycModal().openKycModal()`」，完全可以通过「方法装饰器 + 服务类」实现，而且完全符合「不改原始逻辑，只加壳」的思路。

下面先把「在 TS+Vue3 中启用装饰器 + 写一个通用方法装饰器 + 在组件中使用」这个通路打通，下一步我们再专门针对你这个 `handleDelete` 写一版落地代码。

---

## 分步实现过程

### 第 1 步：在 tsconfig 中开启装饰器支持

TypeScript 把装饰器视为一个「实验特性」，需要在 `tsconfig.json` 中开启：([TypeScript][1])

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "experimentalDecorators": true,
    "useDefineForClassFields": false
  }
}
```

关键点：

- `experimentalDecorators: true`
  开启装饰器语法 `@xxx`。([TypeScript][1])
- `useDefineForClassFields: false`
  对不少基于装饰器的库（包括一些 class 写法）更兼容，经常被推荐和装饰器一起使用。([Stack Overflow][2])

> 如果你的项目有多层 tsconfig（比如 Vite + Vue3 常见的 `tsconfig.app.json`），确保上面这两个选项配置在**真正参与编译的那个 tsconfig** 中。

### 第 2 步：实现一个「前后执行」方法装饰器

我们先实现一个通用的「方法装饰器」，它可以在原方法执行前 / 执行后插入任意异步逻辑（比如打开 KYC 弹窗、写日志、埋点等等）。

```ts
// 前置/后置钩子函数的类型，保持泛型 + 无 any
type BeforeHook<T extends (...args: unknown[]) => unknown> = (
  ...args: Parameters<T>
) => void | Promise<void>;

type AfterHook<T extends (...args: unknown[]) => unknown> = (
  result: Awaited<ReturnType<T>>,
  ...args: Parameters<T>
) => void | Promise<void>;

// 方法装饰器工厂：接收 before/after 两个钩子
function BeforeAfter<T extends (...args: unknown[]) => unknown>(
  before: BeforeHook<T>,
  after?: AfterHook<T>
) {
  return function (
    _target: unknown,
    _key: string,
    descriptor: TypedPropertyDescriptor<T>
  ): void {
    const original = descriptor.value as T;

    // 用装饰后的函数替换原始方法，实现“前后插入逻辑”
    descriptor.value = async function (
      this: unknown,
      ...args: Parameters<T>
    ): Promise<Awaited<ReturnType<T>>> {
      await before(...args);
      const result = (await original.apply(this, args)) as Awaited<
        ReturnType<T>
      >;
      if (after) {
        await after(result, ...args);
      }
      return result;
    } as T;
  };
}
```

说明：

- `BeforeAfter` 是一个**装饰器工厂**，调用后返回真正的装饰器；
- 内部通过 `descriptor.value` 拿到原始方法，然后用一个包裹了 `before/after` 的异步函数替换——这就是经典的「装饰器模式」。([TypeScript][1])

### 第 3 步：在普通 TypeScript 类中使用装饰器

有了上面的 `BeforeAfter`，我们可以先在一个纯 TS 类里试一下：

```ts
class DemoService {
  @BeforeAfter(
    // 复杂逻辑：这里模拟“方法执行前”的异步操作
    async (...args: [id: number]) => {
      console.log("before delete", args[0]);
      // 比如这里可以弹 KYC、二次确认等
    },
    // 复杂逻辑：这里模拟“方法执行后”的操作
    async (result, id: number) => {
      console.log("after delete, result =", result, "id =", id);
    }
  )
  async deleteItem(id: number): Promise<boolean> {
    console.log("do delete", id);
    return true;
  }
}

const service = new DemoService();
service.deleteItem(123);
```

如果这段在你项目里能正常编译运行，说明：

- tsconfig 装饰器配置正确；
- bundler（Vite / Webpack）配置也没问题；
- 可以放心用在 Vue 组件中。

### 第 4 步：在 Vue3 `<script setup lang="ts/tsx">` 中使用

在 Vue3 里使用装饰器**不需要额外的 vue-class-component 库**（我们这里只是把它当作一个普通 TS 类，和组件本身解耦），思路是：

1. 在 `script` 顶部定义装饰器和类；
2. 在 `setup` 里实例化类，把方法暴露给模板。

示例：

```vue
<script setup lang="ts">
import { ref } from "vue";

// 这里可以复用前面写的 BeforeAfter，也可以单独为这个类写一个
function LogCall<T extends (...args: unknown[]) => unknown>() {
  return function (
    _target: unknown,
    key: string,
    descriptor: TypedPropertyDescriptor<T>
  ): void {
    const original = descriptor.value as T;

    // 复杂逻辑：方法前后简单打日志
    descriptor.value = async function (
      this: unknown,
      ...args: Parameters<T>
    ): Promise<Awaited<ReturnType<T>>> {
      console.log(`[${key}] before`, ...args);
      const result = (await original.apply(this, args)) as Awaited<
        ReturnType<T>
      >;
      console.log(`[${key}] after`, result);
      return result;
    } as T;
  };
}

class CounterService {
  private count = ref(0);

  get value() {
    return this.count.value;
  }

  @LogCall<number>()
  async inc(delta: number): Promise<void> {
    this.count.value += delta;
  }
}

const service = new CounterService();

const count = computed(() => service.value);
const handleInc = (delta: number) => service.inc(delta);
</script>

<template>
  <div>
    <div>count: {{ count }}</div>
    <button @click="handleInc(1)">+1</button>
  </div>
</template>
```

要点：

- 装饰器 / 类都只是**普通 TS 代码**，Vue 只负责 `setup` 中的逻辑与模板；
- 你可以把所有「需要统一前置/后置逻辑的函数」都收拢进这个类，用装饰器统一编排。

### 第 5 步：组合式 API 下的「函数装饰器」（不写 `@` 的方案）

如果不想引入「类」，也可以用一个**高阶函数版装饰器**，在组合式里直接包一层，这种写法非常适合你现在 `handleDelete` 这种函数：

```ts
// 函数式“装饰器”：在异步函数执行前/后插入逻辑
function withBeforeAfter<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  before: (...args: Parameters<T>) => Promise<void> | void,
  after?: (
    result: Awaited<ReturnType<T>>,
    ...args: Parameters<T>
  ) => Promise<void> | void
): T {
  // 复杂逻辑：返回一个新的函数，对原函数做统一包装
  return (async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    await before(...args);
    const result = (await fn(...args)) as Awaited<ReturnType<T>>;
    if (after) {
      await after(result, ...args);
    }
    return result;
  }) as T;
}
```

使用时：

```ts
const handleDelete = async (id: number) => {
  console.log("real delete", id);
};

// 包一个带前置/后置逻辑的“装饰后函数”
const decoratedHandleDelete = withBeforeAfter(
  handleDelete,
  async (id) => {
    console.log("before delete", id);
  },
  async (result, id) => {
    console.log("after delete", result, id);
  }
);

// 模板里绑定 decoratedHandleDelete 即可
```

这套方案虽然没有 `@Decorator` 语法，但**本质就是装饰器模式**，而且对 Vue3 组合式项目特别友好。

---

## 最简示例代码

这里给一个尽量精简、又贴近你需求的示例：
**在 Vue3 + TS 中，用「方法装饰器」在删除前弹一个“伪 KYC 弹窗”，删除后打印日志。**

> 注意：这只是最小可运行示例，不是你项目里的最终代码，我们后面会针对你的 `handleDelete` 做精确改造。

```ts
// kycModal.ts —— 假装这是你的 composable
export function useKycModal() {
  const openKycModal = async () => {
    // 复杂逻辑：这里可以打开真正的 modal，我们先用 console 模拟
    console.log("打开 KYC 弹窗，等待用户确认...");
  };

  return {
    openKycModal,
  };
}

// decorators.ts —— 通用方法装饰器
import type { Ref } from "vue";
import { useKycModal } from "./kycModal";

// 为“需要 KYC 校验”的方法提供一个装饰器
export function RequireKyc<T extends (...args: unknown[]) => unknown>() {
  const { openKycModal } = useKycModal();

  return function (
    _target: unknown,
    key: string,
    descriptor: TypedPropertyDescriptor<T>
  ): void {
    const original = descriptor.value as T;

    // 复杂逻辑：在原方法前执行 KYC，后执行日志
    descriptor.value = async function (
      this: unknown,
      ...args: Parameters<T>
    ): Promise<Awaited<ReturnType<T>>> {
      console.log(`[${key}] KYC 检查开始`);
      await openKycModal();
      const result = (await original.apply(this, args)) as Awaited<
        ReturnType<T>
      >;
      console.log(`[${key}] KYC 检查通过，操作完成`);
      return result;
    } as T;
  };
}

// service.ts —— 把业务方法写成类方法，挂上装饰器
import { RequireKyc } from "./decorators";

export class WithdrawService {
  @RequireKyc<(...args: [id: number]) => Promise<void>>()
  async deleteAddress(id: number): Promise<void> {
    // 这里写真正的删除逻辑，比如发请求
    console.log("真正执行删除操作，id =", id);
  }
}

// 在 Vue 组件中使用
/*
<script setup lang="ts">
import { WithdrawService } from './service'

const service = new WithdrawService()

const handleDelete = (id: number) => service.deleteAddress(id)
</script>

<template>
  <button @click="handleDelete(123)">删除</button>
</template>
*/
```

上面这套代码验证了：

- tsconfig 装饰器配置无误；
- `@RequireKyc` 可以在方法执行前后插入逻辑；
- 可以很自然地跟 Vue3 `<script setup>` 配合使用。

---

## 小结 & 下一步怎么改你的 `handleDelete`

这篇「Hexo 风格」教程里，我们完成了几件事：

1. 搞清楚了 TypeScript 装饰器在标准里的位置、能装饰哪些东西；([TypeScript][1])
2. 在 `tsconfig` 里开启了装饰器支持，并解释了 `experimentalDecorators` / `useDefineForClassFields` 的作用；([TypeScript][3])
3. 写了一个通用的「前后执行」方法装饰器 `BeforeAfter`；
4. 演示了在纯 TS 类和 Vue3 `<script setup>` 中使用装饰器的方法；
5. 给了一个最小示例，模拟在删除前做「KYC 检查」。

---

**下一步（针对你当前的代码）我会这么做：**

1. 把「KYC 弹窗逻辑」抽成一个装饰器，比如：`@RequireKycAction('withdraw_address')`；
2. 写一个 `WithdrawHandler` / `WithdrawService` 类，把现在的 `handleDelete` 等方法搬进去当「类方法」；
3. 在类方法上挂上装饰器，实现「执行前先跑 `verifiedAction + KYC Modal`，然后再执行原来的删除逻辑」；
4. `<template>` 里只需要把 `@delete="handleDelete"` 换成实例上的方法调用，不动其他业务细节。

你这条消息先是要教程，我已经跑完了这一步。
下一步如果你愿意，我可以直接基于你给的那段 `handleDelete`，给一版**最少修改的实现方案**（只给需要改的片段，复杂逻辑上面加中文注释），把装饰器真正落在你这份代码里。

[1]: https://www.typescriptlang.org/docs/handbook/decorators.html?utm_source=chatgpt.com "Documentation - Decorators"
[2]: https://stackoverflow.com/questions/68941453/why-have-typescript-property-decorators-stopped-working-after-an-upgrade?utm_source=chatgpt.com "Why have typescript property decorators stopped working ..."
[3]: https://www.typescriptlang.org/tsconfig/?utm_source=chatgpt.com "TSConfig Reference - Docs on every TSConfig option"
