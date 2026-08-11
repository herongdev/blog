---
title: "单文件组件script setup"
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
description: "\\<script setup\\ 是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖。相比于普通的 \\<script\\ 语法，它具有更多优势： 更少的样板内容，更简洁的代码。 能够使用纯 Typescript 声明 props 和抛出事件。 更好的运行时性能 ( 其模。"
sidebarWeight: 70
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/单文件组件script setup/单文件组件script setup.md"
---
::: v-pre

# 单文件组件script setup

> 本节目标：理解“单文件组件script setup”的核心思路，并能把它用于实际开发或面试表达。
`\<script setup\>` 是在单文件组件 `(SFC)` 中使用[组合式](https://v3.cn.vuejs.org/api/composition-api.html) `API` 的编译时语法糖。相比于普通的 `\<script\>` 语法，它具有更多优势：

- 更少的样板内容，更简洁的代码。
- 能够使用纯 `Typescript` 声明 `props` 和抛出事件。
- 更好的运行时性能 `(`其模板会被编译成与其同一作用域的渲染函数，没有任何的中间代理`)`。
- 更好的 `IDE` 类型推断性能 `(`减少语言服务器从代码中抽离类型的工作`)`。

```
#
```

基本语法
要使用这个语法，需要将 `setup` 添加到 `\<script\>` 代码块上：

```
<script setup>
console.log("hello script setup");
</script>
```
 里面的代码会被编译成组件 `setup()` 函数的内容。

这意味着与普通的 `\<script\>` 只在组件被首次引入的时候执行一次不同，`\<script setup\>` 中的代码会在每次组件实例被创建的时候执行。（`v-if`控制显示隐藏时）

```
#
```

顶层的绑定会被暴露给模板
当使用 `\<script setup\>` 的时候，任何在 `\<script setup\>` 声明的顶层的绑定，包括

- 变量；
- 函数声明
- 以及 import 引入的内容

都能在模板中直接使用；
这意味着：

- 以前在data中声明的响应式变量，可以直接以变量形式定义，然后使用ref或reactive等响应式 APIs进行包裹，这样取代了data选项；
- import导入的内容：
    - 如果是方法，可以在模板表达式中直接使用，并不需要通过 methods 选项来暴露它，取代了method;
    - 如果是变量，还要进行响应式包裹；
    - 如果是组件，也不再需要在components选项中进行声明了，取代了components

```
<script setup>
//
```

变量

```
const msg = "Hello!";
//
```

函数

```
function log() {
  console.log(msg);
}
</script>
<template>
  <div @click="log">{{ msg }}</div>
</template>
```

`import` 导入的内容也会以同样的方式暴露。

```
<script setup>
import { capitalize } from "./helpers";
</script>
<template>
  <div>{{ capitalize("hello") }}</div>
</template>
```

注意：
和从 `setup()` 函数中返回值一样，`ref` 值在模板中使用的时候会自动解包：

```
<script setup>
import { ref } from "vue";
const count = ref(0);
</script>
<template>
  <button @click="count++">{{ count }}</button>
</template>
```

```
#
```

使用组件
`\<script setup\>` 范围里的值也能被直接作为自定义组件的标签名使用：

```
<script setup>
import MyComponent from "./MyComponent.vue";
</script>
<template>
  <MyComponent />
</template>
```
 将 `MyComponent` 看做被一个变量所引用。如果你使用过 `JSX`，在这里的使用它的心智模型是一样的。其 `kebab-case` 格式的 `\<my-component\>` 同样能在模板中使用。不过，我们强烈建议使用 `PascalCase` 格式以保持一致性。同时也有助于区分原生的自定义元素。

```
#
```

动态组件
由于组件被引用为变量而不是作为字符串键来注册的，在 `\<script setup\>` 中要使用动态组件的时候，就应该使用动态的 `:is` 来绑定：

```
<scriptsetup>importFoo from'./Foo.vue'importBar from'./Bar.vue'</script><template><component:is="Foo"/><component:is="someCondition ? Foo : Bar"/></template>
1
2
3
4
5
6
7
8
9
```
 请注意组件是如何在三元表达式中被当做变量使用的。

```
#
```

递归组件
一个单文件组件可以通过它的文件名被其自己所引用。例如：名为 `FooBar.vue` 的组件可以在其模板中用 `\<FooBar/\>` 引用它自己。
请注意这种方式相比于 `import` 导入的组件优先级更低。如果有命名的 `import` 导入和组件的推断名冲突了，可以使用 `import` 别名导入：

```
import{FooBar asFooBarChild }from'./components'
1
#
```

命名空间组件
可以使用带点的组件标记，例如 `\<Foo.Bar\>` 来引用嵌套在对象属性中的组件。这在需要从单个文件中导入多个组件的时候非常有用：

```
<scriptsetup>import*asForm from'./form-components'</script><template><Form.Input><Form.Label>label</Form.Label></Form.Input></template>
1
2
3
4
5
6
7
8
9
#
```

使用自定义指令
全局注册的自定义指令将以符合预期的方式工作，且本地注册的指令可以直接在模板中使用，就像上文所提及的组件一样。
但这里有一个需要注意的限制：必须以 `vNameOfDirective` 的形式来命名本地自定义指令，以使得它们可以直接在模板中使用。

```
<scriptsetup>constvMyDirective ={beforeMount:(el)=>{//
```

在元素上做些操作

```
}}</script><template><h1v-my-directive>This is a Heading</h1></template>
1
2
3
4
5
6
7
8
9
10
<scriptsetup>  //
```

导入的指令同样能够工作，并且能够通过重命名来使其符合命名规范

```
import{myDirective asvMyDirective }from'./MyDirective.js'</script>
1
2
3
4
```

```
#
```

限制：没有 `Src` 导入
由于模块执行语义(context?)的差异，`\<script setup\>` 中的代码依赖单文件组件的上下文。当将其移动到外部的 `.js` 或者 `.ts` 文件中的时候，对于开发者和工具来说都会感到混乱。因而 `\<script setup\>` 不能和 `src` `attribute` 一起使用。

:::
