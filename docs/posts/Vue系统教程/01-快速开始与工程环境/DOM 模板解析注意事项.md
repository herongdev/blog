---
title: "DOM 模板解析注意事项"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "快速开始与工程环境"
description: "如果你想在 DOM 中直接书写 Vue 模板， Vue 则必须从 DOM 中获取模板字符串。由于浏览器的原生 HTML 解析行为限制，有一些需要注意的事项。 请注意下面讨论只适用于直接在 DOM 中编写模板的情况。如果你使用来自以下来源的字符串模板，就不需要顾虑这些限制了： 单文。"
sidebarWeight: 23
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/基础/DOM 模板解析注意事项.md"
---
::: v-pre

# DOM 模板解析注意事项

> 本节目标：理解“DOM 模板解析注意事项”的核心思路，并能把它用于实际开发或面试表达。
如果你想在 `DOM` 中直接书写 `Vue` 模板，`Vue` 则必须从 `DOM` 中获取模板字符串。由于浏览器的原生 `HTML` 解析行为限制，有一些需要注意的事项。

请注意下面讨论只适用于直接在 `DOM` 中编写模板的情况。如果你使用来自以下来源的字符串模板，就不需要顾虑这些限制了：

- 单文件组件
- 内联模板字符串 `(`例如 `template: '...')`
- `\<script type="text/x-template"\>`

**大小写区分**

```
#
HTML
```

标签和属性名称是不分大小写的，所以浏览器会把任何大写的字符解释为小写。这意味着当你使用 `DOM` 内的模板时，无论是 `PascalCase` 形式的组件名称、`camelCase` 形式的 `prop` 名称还是 `v-on` 的事件名称，都需要转换为相应等价的 `kebab-case (`短横线连字符`)` 形式：
`// JavaScript` 中的

```
 camelCase
const BlogPost = {
```

```
 props: ['postTitle'],
```

```
 emits: ['updatePost'],
```

```
 template: `
```
     `\<h3\>{{ postTitle }}\</h3\>`

```
 `
}
```

`\<!-- HTML` 中的

```
 kebab-case -->
<blog-post post-title="hello!" @update-post="onUpdatePost"></blog-post>
```

**闭合标签**

```
#
```
 我们在上面的例子中已经使用过了闭合标签 `(self-closing tag)`：

```
<MyComponent />
```
 这是因为 `Vue` 的模板解析器支持任意标签使用 `/\>` 作为标签关闭的标志。
然而在 `DOM` 模板中，我们必须显式地写出关闭标签：

```
<my-component></my-component>
```
 这是由于 `HTML` 只允许[一小部分特殊的元素](https://html.spec.whatwg.org/multipage/syntax.html#void-elements)省略其关闭标签，最常见的就是 `\<input\>` 和 `\<img\>`。对于其他的元素来说，如果你省略了关闭标签，原生的 `HTML` 解析器会认为开启的标签永远没有结束，用下面这个代码片段举例来说：

```
<my-component /> <!--
```

_我们想要在这里关闭标签_

```
... -->
<span>hello</span>
```
 将被解析为：

```
<my-component>
<span>hello</span>
</my-component> <!--
```

_但浏览器会在这里关闭标签_ `--\>`

**元素位置限制**

```
#
```
 某些 `HTML` 元素对于放在其中的元素类型有限制，例如 `\<ul\>`，`\<ol\>`，`\<table\>` 和 `\<select\>`，相应的，某些元素仅在放置于特定元素中时才会显示，例如 `\<li\>`，`\<tr\>` 和 `\<option\>`。
这将导致在使用带有此类限制元素的组件时出现问题。例如：

```
<table>
  <blog-post-row></blog-post-row>
</table>
```
 自定义的组件 `\<blog-post-row\>` 将作为无效的内容被忽略，因而在最终呈现的输出中造成错误。我们可以使用特殊的

```
is
```

 `attribute` 作为一种解决方案：

```
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

当使用在原生 `HTML` 元素上时，`is` 的值必须加上前缀 `vue:` 才可以被解析为一个 `Vue` 组件。这一点是必要的，为了避免和原生的[自定义内置元素](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example)相混淆。

:::
