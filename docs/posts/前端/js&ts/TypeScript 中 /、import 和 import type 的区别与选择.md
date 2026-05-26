---
title: TypeScript 中 ///、import 和 import type 的区别与选择
date: 2026-05-26
tags:
  - TypeScript
  - Vite
  - 前端工程化
  - 类型声明
categories:
  - 前端工程化
---

## 整体思路

在 TypeScript 项目里，`/// <reference ... />`、`import`、`import type` 都和「引入」有关，但它们的职责完全不同。

可以先记住这个判断：

```txt
/// <reference ... />   → 加载全局类型声明环境
import                  → 导入运行时代码、变量、函数、组件
import type             → 只导入类型，不导入运行时代码
```

以 Vite 项目的环境变量声明为例：

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}
```

这里用 `///`，不是因为它比 `import type` 高级，而是因为这个场景需要的是：

> 让 TypeScript 加载 Vite 的客户端全局类型声明，而不是导入某个具体类型。

---

## 一、`/// <reference types="vite/client" />` 的作用

```ts
/// <reference types="vite/client" />
```

它是 TypeScript 的三斜线指令。

它的作用是告诉 TypeScript 编译器：

> 请把 `vite/client` 这套类型声明加载进当前编译上下文。

加载之后，TypeScript 才能认识这些 Vite 提供的全局类型：

```ts
import.meta
import.meta.env
ImportMeta
ImportMetaEnv
```

所以你才能写：

```ts
const apiUrl = import.meta.env.VITE_API_URL
```

否则在某些项目配置下，TypeScript 可能不知道 `import.meta.env` 是什么。

---

## 二、为什么这里不用 `import type`

`import type` 适合导入某个模块明确导出的类型。

例如：

```ts
import type { UserInfo } from '@/types/user'

const user: UserInfo = {
  id: 1,
  name: '张三'
}
```

这里的特点是：

```txt
1. UserInfo 是一个明确导出的类型
2. 当前文件里会直接使用 UserInfo
3. 编译后不会产生运行时代码
```

但 `vite/client` 不是这种用法。

你不是要这样写：

```ts
import type { ImportMetaEnv } from 'vite/client'
```

而是要让 TypeScript 全局认识 Vite 环境。

所以更适合：

```ts
/// <reference types="vite/client" />
```

---

## 三、`///` 不会把当前文件变成模块

这是很关键的一点。

如果一个 `.d.ts` 文件里没有 `import` 或 `export`，它就是全局声明文件。

例如：

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

这里的 `ImportMetaEnv` 和 `ImportMeta` 会参与全局类型合并。

也就是说，TypeScript 会把你的声明合并到 Vite 原有的类型里。

---

## 四、用了 `import type` 后会发生什么

只要 `.d.ts` 文件里出现 `import` 或 `export`，这个文件就会变成模块。

例如：

```ts
import type { AppConfig } from './types'

interface ImportMetaEnv {
  readonly VITE_APP_CONFIG?: AppConfig
}
```

这时候，顶层的 `interface ImportMetaEnv` 不一定会按你预期进入全局作用域。

正确写法应该改成：

```ts
import type { AppConfig } from './types'

// 文件已变成模块时，需要显式把声明放回全局作用域
declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_CONFIG?: AppConfig
  }
}

export {}
```

所以不是不能在 `.d.ts` 里用 `import type`，而是用了之后要配合 `declare global`。

---

## 五、`import` 的使用场景

`import` 用来导入运行时代码。

例如：

```ts
import { ref } from 'vue'

const count = ref(0)
```

这里的 `ref` 是运行时需要执行的函数，所以必须用 `import`。

再比如：

```ts
import axios from 'axios'

axios.get('/api/user')
```

这里 `axios` 也是真实运行时代码。

---

## 六、`import type` 的使用场景

`import type` 只导入类型。

例如：

```ts
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = []
```

它适合这些场景：

```txt
1. 只需要类型，不需要运行时代码
2. 避免无意义的运行时导入
3. 让代码意图更清晰
4. 配合 isolatedModules、verbatimModuleSyntax 等配置更安全
```

推荐在类型导入时优先使用：

```ts
import type { UserInfo } from '@/types/user'
```

而不是：

```ts
import { UserInfo } from '@/types/user'
```

---

## 七、`/// <reference types="..." />` 和 `/// <reference path="..." />`

三斜线指令常见有两类。

### 1. `types`

```ts
/// <reference types="vite/client" />
```

用于加载某个包提供的类型声明。

常见例子：

```ts
/// <reference types="vite/client" />
/// <reference types="node" />
/// <reference types="vitest" />
```

### 2. `path`

```ts
/// <reference path="./global.d.ts" />
```

用于引用某个具体声明文件。

现代项目里 `path` 用得少，因为通常通过 `tsconfig.json` 的 `include` 自动包含类型文件。

---

## 八、最简代码示例

### Vite 环境变量声明推荐写法

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 后端 API 地址 */
  readonly VITE_API_URL: string

  /** 是否启用调试模式 */
  readonly VITE_ENABLE_DEBUG?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

使用：

```ts
const apiUrl = import.meta.env.VITE_API_URL

const enableDebug = import.meta.env.VITE_ENABLE_DEBUG === 'true'
```

---

## 九、如果必须在 `.d.ts` 中导入自定义类型

假设你有一个类型：

```ts
export interface FeatureConfig {
  enableAnalytics: boolean
}
```

那环境变量声明文件里应该这样写：

```ts
import type { FeatureConfig } from './types'

// 引入 import type 后，当前文件会变成模块，因此全局声明要包在 declare global 中
declare global {
  interface ImportMetaEnv {
    readonly VITE_FEATURE_CONFIG?: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

export {}
```

不过注意，环境变量本身仍然是字符串。即使你有 `FeatureConfig` 类型，也不能直接把 `.env` 变量声明成对象，除非你自己解析 JSON。

---

## 十、如何选择

可以按下面这个规则判断：

```txt
需要加载 Vite、Node、Vitest 等全局类型环境
→ 使用 /// <reference types="..." />

需要使用函数、变量、类、组件
→ 使用 import

只需要使用类型
→ 使用 import type

.d.ts 文件里用了 import/export，但还想扩展全局类型
→ 使用 declare global
```

---

## 总结

`///` 的核心作用是加载类型声明环境，不会产生运行时代码，也不会把当前文件变成模块。

`import` 用于导入真实运行时代码。

`import type` 用于导入明确导出的类型。

所以在 Vite 项目的 `vite-env.d.ts` 中，推荐保持：

```ts
/// <reference types="vite/client" />
```

而不是改成 `import type`。

因为这里的目标不是「导入一个类型来使用」，而是「让 TypeScript 认识 Vite 提供的全局类型环境」。
