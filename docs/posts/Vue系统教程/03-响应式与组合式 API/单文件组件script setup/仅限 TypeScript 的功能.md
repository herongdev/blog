---
title: "仅限 TypeScript 的功能"
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
description: "仅限类型的 props/emit 声明 props 和 emits 都可以使用传递 字面量类型 ( 首字母小写，不同于构造函数 ) 的纯类型语法做为参数给 defineProps 和 defineEmits 来声明： defineProps 或 defineEmits 只能是要么。"
sidebarWeight: 69
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/单文件组件script setup/仅限 TypeScript 的功能.md"
---
::: v-pre

# 仅限 TypeScript 的功能

> 本节目标：理解“仅限 TypeScript 的功能”的核心思路，并能把它用于实际开发或面试表达。
```
#
```

仅限类型的 `props/emit` 声明
`props` 和 `emits` 都可以使用传递==字面量类型==`(`==首字母小写，不同于构造函数==`)`的纯类型语法做为参数给 `defineProps` 和 `defineEmits` 来声明：

```
const props = defineProps<{
```

```
 foo: string
```

```
 bar?: number
}>()
const emit = defineEmits<{
```

```
 (e: 'change', id: number): void
```

```
 (e: 'update', value: string): void
}>()
```

- `defineProps` 或 `defineEmits` 只能是要么使用运行时声明（构造函数表示类型），要么使用类型声明（`ts`中使用的类型表示法）。同时使用两种声明方式会导致编译报错。
- 使用类型声明的时候，静态分析会自动生成等效的运行时声明，以消除双重声明的需要并仍然确保正确的运行时行为。
    - 在开发环境下，编译器会试着从类型来推断对应的运行时验证。例如这里从 `foo: string` 类型中推断出 `foo: String`。如果类型是对导入类型的引用，这里的推断结果会是 `foo: null` `(`与 `any` 类型相等`)`，因为编译器没有外部文件的信息。
    - 在生产模式下，编译器会生成数组格式的声明来减少打包体积 `(`这里的 `props` 会被编译成

        ```
        ['foo', 'bar'])
        ```

        。
    - 生成的代码仍然是有着类型的 `Typescript` 代码，它会在后续的流程中被其它工具处理。
- 截至目前，类型声明参数必须是以下内容之一，以确保正确的静态分析：
    - 类型字面量
    - 在同一文件中的接口或类型字面量的引用``现在还不支持复杂的类型和从其它文件进行类型导入。理论上来说，将来是可能实现类型导入的。

```
#
```

使用类型声明时的默认 `props` 值
仅限类型的 `defineProps` 声明的不足之处在于，它没有可以给 `props` 提供默认值的方式。为了解决这个问题，提供了 `withDefaults` 编译器宏：

```
interface Props {
```

```
 msg?: string
```

```
 labels?: string[]
}
const props = withDefaults(defineProps<Props>(), {
```

```
 msg: 'hello',
```

```
 labels: () => ['one', 'two']
})
```
 上面代码会被编译为等价的运行时 `props` 的 `default` 选项。此外，`withDefaults` 辅助函数提供了对默认值的类型检查，并确保返回的 `props` 的类型删除了已声明默认值的属性的可选标志。

:::
