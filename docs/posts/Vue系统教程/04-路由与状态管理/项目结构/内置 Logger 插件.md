---
title: "内置 Logger 插件"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "路由与状态管理"
description: "如果正在使用 ，你可能不需要此插件。 Vuex 自带一个日志插件用于一般的调试 createLogger 函数有几个配置项： 自动展开记录的 若 mutation 需要被记录，就让它返回 true 即可 顺便， mutation 是个 { type, payload } 对象 和。"
sidebarWeight: 95
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vuex/项目结构/内置 Logger 插件.md"
---
::: v-pre

# 内置 Logger 插件

> 本节目标：理解“内置 Logger 插件”的核心思路，并能把它用于实际开发或面试表达。
如果正在使用

```
vue-devtools
```

，你可能不需要此插件。
`Vuex` 自带一个日志插件用于一般的调试

```
:
import createLogger from 'vuex/dist/logger'
const store = new Vuex.Store({  plugins: [createLogger()]})
```

`createLogger` 函数有几个配置项：

```
const logger = createLogger({  collapsed: false, //
```

自动展开记录的

```
 mutation  filter (mutation, stateBefore, stateAfter) {    //
```

若 `mutation` 需要被记录，就让它返回 `true` 即可

```
    //
```

顺便，`` `mutation` `` 是个 `{ type, payload }` 对象

```
    return mutation.type !== "aBlocklistedMutation"  },  actionFilter (action, state) {    //
```

和 `` `filter` `` 一样，但是是针对 `action` 的

```
    // `action`
```

的格式是

```
 `{ type, payload }`    return action.type !== "aBlocklistedAction"  },  transformer (state) {    //
```

在开始记录之前转换状态

```
    //
```

例如，只返回指定的子树

```
    return state.subTree  },  mutationTransformer (mutation) {    // mutation
```

按照 `{ type, payload }` 格式记录

```
    //
```

我们可以按任意方式格式化

```
    return mutation.type  },  actionTransformer (action) {    //
```

和 `` `mutationTransformer` `` 一样，但是是针对 `action` 的

```
    return action.type  },  logActions: true, //
```

记录 `action` 日志

```
  logMutations: true, //
```

记录 `mutation` 日志

```
  logger: console, //
```

自定义 `console` 实现，默认为

```
 `console`})
```
 日志插件还可以直接通过 `\<script\>` 标签引入，它会提供全局方法 `createVuexLogger`。
要注意，`logger` 插件会生成状态快照，所以仅在开发环境使用。
 \> 来自

```
 <https://vuex.vuejs.org/zh/guide/plugins.html>
```

:::
