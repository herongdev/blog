---
title: "$listener"
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
description: "基础输入组件 \" 请输入您的名字 \" /\\ // 有的组件的根元素不具备一些 DOM 事件，但是根元素内部元素具备相对应的 DOM 事件； // 所以使用 $listeners 获取父组件传递进来的所有事件函数，再通过 v on \"xxxx\" 绑定到相对应的内部元素上即可。 //。"
sidebarWeight: 105
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/自定义事件/$listener.md"
---
::: v-pre

# $listener

> 本节目标：理解“$listener”的核心思路，并能把它用于实际开发或面试表达。
```
<body>
```

```
<div
```

```
id="app">
```

```
<base-input
```

```
v-model="username"
```

```
label="
```

基础输入组件`"`

```
@click.native="handleBaseInputClick"
```

```
v-on:focus="handleBaseInputFocus"
```

```
placeholder="
```

请输入您的名字`"`

```
class="username-input"
```

 `/\>`

```
</div>
```

```
<script>
```
     `//` 有的组件的根元素不具备一些`DOM`事件，但是根元素内部元素具备相对应的`DOM`事件；
    `//` 所以使用`$listeners`获取父组件传递进来的所有事件函数，再通过`v-on="xxxx"`绑定到相对应的内部元素上即可。
    `//` 因为`base-input`的外层是一个`label`元素，所以默认情况下使用`v-on:focus`是无效的`;`
    `//` 所以需要配合`$listeners`使用，该属性代表着组件`props`中所有的事件监听函数；
    `//` `v-model`会绑定`change`事件或自定义的双向绑定事件
    `//` 如果父级的事件添加了`.native`修饰符，不会`$listeners`中
    `//` 接下来，我们可以把无法所有的事件在组件内部使用`v-on`绑定到特殊的元素上去
    `//` 这样，事件实际上是作用于我们绑定的元素上；

```
Vue.component('base-input',
```

 `{`
      `inheritAttrs:`

```
false,
```
       `props:`

```
['label',
```

```
'value'],
```
       `template:` `` ` ``
                `\<label` `id="base-label"\>`
                    `{{label}}`
                    `\<input` `v-bind:value="value"` `v-bind="$attrs"` `v-on="inputListeners"/\>`
                `\</label\>`

```
`,
```
       `computed:` `{`

```
inputListeners()
```

 `{`
          `var` `vm` `=` `this`
          `return`

```
Object.assign({},
```

```
this.$listeners,
```
             `{`

```
input:
```

 `function` `()` `{`

```
vm.$emit('input',
```

```
event.target.value)
```
               `},`

```
focus:
```

 `function`

```
(event)
```

 `{`

```
vm.$emit('focus',
```

 `'`哈哈哈，`onfocus`了

```
')
```
               `}`
            `}`
          `)`
        `}`
      `},`
    `})`
    `var` `vm` `=` `new`

```
Vue({
```
       `el:`

```
'#app',
```
       `data:` `{`
        `username:` `''`
      `},`
      `methods:` `{`

```
handleBaseInputFocus:
```

 `function`

```
(ev)
```

 `{`

```
console.log(ev)
```
         `},`

```
handleBaseInputClick:
```

 `function`

```
(ev)
```

 `{`

```
console.log(ev.type)
```
         `}`
      `}`
    `})`

```
</script>
</body>
```

:::
