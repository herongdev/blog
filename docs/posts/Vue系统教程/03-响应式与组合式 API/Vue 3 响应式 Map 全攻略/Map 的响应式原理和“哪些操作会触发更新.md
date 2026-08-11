---
title: "Map 的响应式原理和“哪些操作会触发更新"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "响应式与组合式 API"
description: "下面把 Vue 3 对 的响应式原理和 “ 哪些操作会触发更新 ” 说清楚（重点在触发条件）。 Vue 3 如何让 Map 响应式 通过 或（普通） 包一层，内部用 的 专门处理 。 只追踪顶层，不会把 里的值做深层响应。 包装后写操作被阻止（开发环境会有警告）。 会被 “ 收集。"
sidebarWeight: 141
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/响应式问题/Vue 3 响应式 Map 全攻略/`Map` 的响应式原理和“哪些操作会触发更新.md"
---
::: v-pre

# Map 的响应式原理和“哪些操作会触发更新

> 本节目标：理解“Map 的响应式原理和“哪些操作会触发更新”的核心思路，并能把它用于实际开发或面试表达。
下面把 `Vue 3` 对

```
 `Map`
```

的响应式原理和`“`哪些操作会触发更新`”`说清楚（重点在触发条件）。
`# Vue 3` **如何让** `Map` **响应式**

```
-
```

通过

```
 `reactive()`
```

或（普通）

```
`ref(new Map())`
```

包一层，内部用

```
 `Proxy`
```

的

```
 **collection handlers**
```

专门处理

```
 `Map/Set`
```

。

```
- `shallowReactive()` / `shallowRef()`
```

只追踪顶层，不会把

```
 `Map`
```

里的值做深层响应。

```
- `readonly()`
```

包装后写操作被阻止（开发环境会有警告）。
`#` **会被**`“`**收集依赖**`”`**的读取操作（**`track`**）**
这些读取一旦出现在

```
 `effect()/computed`
```

里，就会被追踪：

```
- `map.get(key)` →
```

追踪

```
 **key
```

**对应的依赖**

```
**
- `map.has(key)` →
```

追踪

```
 **key
```

**存在性依赖**

```
**
- `map.size` →
```

追踪

```
 **
```

**迭代依赖（**`ITERATE`**）**

```
**
-
```

迭代相关：

```
  - `map.forEach(...)`
```

、`` `map.values()` ``、`` `map.entries()` ``、

```
`for...of map` → **ITERATE
```

**依赖**

```
**
  - `map.keys()` → **MAP_KEY_ITERATE
```

**依赖**`**`（只与键集合相关）
`#` **会触发更新（**`trigger`**）的写操作**
`Vue` 对

```
 `Map`
```

的触发类型分为

```
 `ADD | SET | DELETE | CLEAR`
```

，并根据是否影响迭代`/size` 额外触发迭代依赖。

```
1. `map.set(key, value)`
   - **
```

**新增** `key**`：触发

```
 **ADD(key)**
```

，并触发

```
 **ITERATE**
```

（因为

```
 `size`
```

和遍历结果变了）

```
   - **
```

**更新已存在** `key**`：触发

```
 **SET(key)**
```

（仅对依赖该 `key` 的副作用生效；不影响

```
 `size`
```

不触发 `ITERATE`）

```
   -
```

只有当新旧值`“`确实不同`”`才会触发（`SameValueZero` 判断）。

```
2. `map.delete(key)`
   -
```

若 `key` 原本存在：触发

```
 **DELETE(key)**
```

，并触发

```
 **ITERATE**
```

（键集合`/size` 变了）

```
   -
```

若 `key` 不存在：不触发。

```
3. `map.clear()`
   -
```

清空所有条目：触发

```
 **CLEAR**
```

，并触发

```
 **ITERATE**
```

（`size/`遍历全变）。

```
>
```

小结记忆法：

```
>
> - **
```

**改某个**

```
 key** →
```

影响这个 `key` 的依赖；

```
> - **
```

**改键集合（新增**`/`**删除**`/`**清空）**

```
** →
```

还会额外影响

```
 **
```

**迭代**

```
/size**
```

依赖。
`#` **典型行为对照（易踩点）**

```
-
```

只读依赖：
  依赖

```
 `map.get('a')`
```

的 `effect`，只会在

```
 `set('a', ...)`
```

或

```
 `delete('a')/clear()`
```

时更新；

```
`set('b', ...)`
```

不会影响它。

```
-
```

迭代`/size` 依赖：
  依赖

```
 `map.size`
```

、

```
`for...of`
```

的 `effect`，会在

```
 `ADD/DELETE/CLEAR`
```

时更新；`**`**更新已有** `key` **的值（**`SET`**）不会触发**`**`。

```
- `ref(new Map())`
```

：

```
  **
```

**可以**`**`响应内部

```
 `set/delete`
```

（因为

```
 `ref`
```

会把对象转成 `reactive`）；

```
`shallowRef(new Map())`
```

则只有替换整张表

```
 `ref.value = new Map()`
```

才会触发。
`#` **简短示例（观察不同依赖）**

```
```ts
import \{ reactive, effect \} from 'vue'
const m = reactive(new Map([['a', 1]]))
effect(() =\> \{
  console.log('k=a -\>', m.get('a')) //
```

依赖

```
 key 'a'
\})
effect(() =\> \{
  console.log('size -\>', m.size) //
```

依赖 `ITERATE`（集合`/size`）

```
\})
effect(() =\> \{
  //
```

仅依赖键集合

```
  console.log('keys:', [...m.keys()].join(',')) //
```

依赖

```
 MAP_KEY_ITERATE
\})
//
```

触发情况：

```
m.set('a', 2) //
```

触发 `SET('a') ->` 只更新第`1`个

```
 effect
m.set('b', 3) //
```

触发 `ADD('b') + ITERATE ->` 更新第`2`、`3`个

```
 effect
m.delete('a') //
```

触发 `DELETE('a') + ITERATE ->` 更新所有相关

```
 effect
m.clear() //
```

触发 `CLEAR + ITERATE ->` 更新所有相关

```
 effect
```
```
 如果你贴一段你项目里的

```
 `Map`
```

使用代码，我可以按你的偏好`**`**只标注需要改动的行**`**`，并在复杂逻辑上方加中文注释，帮你把依赖收集与触发对齐到你期望的更新点。

:::
