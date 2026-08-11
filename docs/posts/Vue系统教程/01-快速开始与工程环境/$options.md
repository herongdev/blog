---
title: "$options"
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
description: "在 Vue 组件中，$options 是 Vue 组件实例的一个属性，它包含了组件的 初始化选项 。这个对象包含了你在定义组件时传入的所有选项。 $options 的常见内容 当你这样定义一个组件： javascript 复制 export default \\{ name: 'M。"
sidebarWeight: 22
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/基础/$options.md"
---
::: v-pre

# $options

> 本节目标：理解“$options”的核心思路，并能把它用于实际开发或面试表达。
在 Vue 组件中，$options 是 Vue 组件实例的一个属性，它包含了组件的**初始化选项**。这个对象包含了你在定义组件时传入的所有选项。
**$options** **的常见内容**
==当你这样定义一个组件：==
javascript
复制
export default \{ name: 'MyComponent', data() \{ return \{ /* ... */ \} \}, methods: \{ /* ... */ \}, // 其他选项...\}
==在模板中使用== ==$options== ==可以访问到：==

1. **name** ==- 组件名称==
2. **components** ==- 注册的子组件==
3. **directives** ==- 注册的指令==
4. **filters** ==- 过滤器 (Vue 2)==
5. **自定义选项** ==- 你添加的任何自定义选项==

**在你代码中的具体使用**
html
复制
\<div class="w-full flex h-full" :class="$options.name" tabindex="-1"\>\</div\>

运行 HTML
==这里== ==:class="$options.name"== ==的作用是：==

- ==获取当前组件的== ==name== ==选项值==
- ==将其作为 CSS 类名添加到 div 元素上==

==例如，如果组件定义为：==
javascript
复制
export default \{ name: 'MyComponent' // ...\}
==渲染结果将是：==
html
复制
\<div class="w-full flex h-full MyComponent" tabindex="-1"\>\</div\>

运行 HTML
**为什么要这样用？**
==这种用法有几个潜在的好处：==

1. **调试方便** ==- 在 DOM 中可以直接看到组件名称==
2. **样式作用域** ==- 可以用组件名作为 CSS 作用域前缀==
3. **自动化测试** ==- 测试工具可以通过组件名定位元素==

**其他常见用法**

1. ==访问自定义选项：==

javascript
复制
export default \{ customOption: 'foo', created() \{ console.log(this.$options.customOption) // 'foo' \}\}

1. ==在全局混入中访问：==

javascript
复制
Vue.mixin(\{ created() \{ if (this.$options.myOption) \{ console.log(this.$options.myOption) \} \}\})
**注意事项**

- ==$options== ==是只读的，不应该修改它==
- ==包含的是原始选项，不会包含 Vue 添加的运行时属性==
- ==对于组合式 API (setup)，可以通过== ==getCurrentInstance()== ==访问==

在你的案例中，结合 TailwindCSS 和 Ant Design Vue，这种用法主要是为了给组件添加一个标识类名，方便样式管理和调试。
 \> 来自 \<[https://chat.deepseek.com/a/chat/s/9c2caa9b-a223-4340-802e-82a4b5410ff9](https://chat.deepseek.com/a/chat/s/9c2caa9b-a223-4340-802e-82a4b5410ff9)\>

:::
