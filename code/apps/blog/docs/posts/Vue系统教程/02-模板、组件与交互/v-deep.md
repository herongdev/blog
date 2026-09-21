---
title: "v-deep"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "模板、组件与交互"
description: "在Vue中使用 scoped 样式和 :deep 伪类会影响选择器的具体表现。以下是对比和解释： 1. 两种选择器的区别 这两个选择器的不同之处在于作用范围的具体位置： 1. .el form item[data v 843b228a] 这是在 元素本身 上应用的 scoped。"
sidebarWeight: 83
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/样式/v-deep.md"
---
::: v-pre

# v-deep

> 本节目标：理解“v-deep”的核心思路，并能把它用于实际开发或面试表达。
在Vue中使用`scoped`样式和`:deep`伪类会影响选择器的具体表现。以下是对比和解释：

### 1. 两种选择器的区别
这两个选择器的不同之处在于作用范围的具体位置：

1. **`.el-form-item[data-v-843b228a]`**
- 这是在**元素本身**上应用的`scoped`作用域属性，意味着选择器 `.el-form-item` 只能作用于带有 `data-v-843b228a` 属性的 `.el-form-item` 元素。
- 它的选择器会生成类似于 `.el-form-item[data-v-843b228a] { margin: 0; }`。

2. **`[data-v-843b228a] .el-form-item`**
- 这是在**父级元素**上应用的作用域属性，意味着所有带有 `data-v-843b228a` 属性的元素内的 `.el-form-item` 元素都会受到影响。
- 选择器会生成类似于 `[data-v-843b228a] .el-form-item { margin: 0; }`。

总的来说：
- **第一个选择器**只会影响带有`data-v-843b228a`属性的 `.el-form-item` 元素。
- **第二个选择器**会影响带有 `data-v-843b228a` 属性的任何元素下的 `.el-form-item` 元素。

### 2. 为什么会有这种区别

在Vue中使用`\<style scoped\>`时，每个组件的样式都会被自动作用域化，这通常通过在组件的顶级元素和所有子元素上添加一个`data-v-xxxxxxx`的属性来实现。

#### 代码示例
- **第一种写法**：

```html
<style lang="scss" scoped>
.el-form-item {
margin: 0;
}
</style>
```

- 这种写法直接对 `.el-form-item` 选择器应用 `scoped`，生成的CSS选择器是 `.el-form-item[data-v-843b228a] { margin: 0; }`。
- 只作用于本组件内的 `.el-form-item` 元素，且`.el-form-item` 必须直接带有`data-v-843b228a`属性。

- **第二种写法**：

```html
<style lang="scss" scoped>
::v-deep .el-form-item {
margin: 0;
}
</style>
```

- 这种写法使用了 `::v-deep`，表示选择器可以穿透当前组件的作用域。
- Vue会将 `::v-deep` 之后的选择器直接应用到DOM中任何位置的 `.el-form-item` 元素，而不局限于当前组件。生成的CSS选择器是 `[data-v-843b228a] .el-form-item { margin: 0; }`。
- 可以作用于任何父元素具有`data-v-843b228a`属性的`.el-form-item`，且不会受到当前组件的作用域限制。

### 使用场景
- **.el-form-item[data-v-843b228a]**：适合样式仅影响本组件内的`.el-form-item`。
- **::v-deep .el-form-item**：适合当需要穿透作用域，影响子组件或深层嵌套的`.el-form-item`，或者是组件库提供的样式时。

### 总结
选择使用哪种写法取决于你是否需要样式仅限于当前组件，还是需要穿透作用域去影响其他嵌套组件的样式。

:::
