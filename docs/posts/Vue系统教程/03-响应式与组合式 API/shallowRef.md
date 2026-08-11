---
title: "shallowRef"
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
description: "在使用 时，响应式监测的触发条件与普通 有所不同。对于你提供的代码： typescript const cache shallowRef\\< Record\\<string, \\{ loading: boolean; list: \\{ label: string; value: s。"
sidebarWeight: 146
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/响应式问题/shallowRef.md"
---
::: v-pre

# shallowRef

> 本节目标：理解“shallowRef”的核心思路，并能把它用于实际开发或面试表达。
在使用

```
 `shallowRef`
```

时，响应式监测的触发条件与普通

```
 `ref`
```

有所不同。对于你提供的代码：

```
```typescript
const cache = shallowRef\<
  Record\<string, \{ loading: boolean; list: \{ label: string; value: string \}[] \}\>
\>(\{\})
```
`shallowRef`
```

只会对

```
 `.value`
```

的`**`**直接替换**`**`进行响应式追踪，而不会深度追踪其内部属性的变化。具体来说：
`###` **会触发响应式更新的情况：**

```
1. **
```

**直接替换整个**

```
 `.value`
```

**对象**`**`：

```
   ```typescript
   cache.value = \{
     newKey: \{ loading: true, list: [] \},
   \} //
```

会触发响应

```
   ```
###
```

**不会触发响应式更新的情况：**

```
1. **
```

**修改对象的属性**`**`（即使是通过解构）：

```
   ```typescript
   cache.value['key'] = \{ loading: true, list: [] \} //
```

不会触发

```
   cache.value.key.list.push(\{ label: 'a', value: 'b' \}) //
```

不会触发

```
   ```
2. **
```

**删除或添加属性**`**`：

```
   ```typescript
   delete cache.value.key //
```

不会触发

```
   ```
3. **
```

**深层嵌套属性的变化**`**`：

```
   ```typescript
   cache.value.existingKey.loading = false //
```

不会触发

```
   cache.value.existingKey.list[0].label = 'new' //
```

不会触发

```
   ```
---
###
```

**如果需要深度响应式**
改用

```
 `ref()`
```

（会默认深度响应）或显式调用

```
 `triggerRef()`
```

强制更新：

```
```typescript
//
```

方式`1`：直接替换（推荐）

```
cache.value = \{ ...cache.value, [key]: newValue \}
//
```

方式`2`：强制触发（不推荐，破坏响应式设计）

```
cache.value[key].loading = true
triggerRef(cache) //
```

手动触发

```
```
###
```

**总结**

```
`shallowRef`
```

的设计目的是避免不必要的深度响应式开销，适合需要`**`**顶层替换**`**`的场景（如大型不可变数据）。如果你的需求是深度响应，建议改用

```
 `ref`
```

或重构为不可变更新模式。

:::
