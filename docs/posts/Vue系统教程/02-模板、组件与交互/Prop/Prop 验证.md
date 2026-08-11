---
title: "Prop 验证"
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
description: "我们可以为组件的 prop 指定验证要求，例如你知道的这些类型。如果有一个需求没有被满足，则 Vue 会在浏览器控制台中警告你。 这在开发一个会被别人用到的组件时尤其有帮助。 使用对象定制 prop 的验证方式，例如： 可以为基本类型的构造函数； 可以为数组，数组的每一个元素为一。"
sidebarWeight: 87
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/组件/Prop/Prop 验证.md"
---
::: v-pre

# Prop 验证

> 本节目标：理解“Prop 验证”的核心思路，并能把它用于实际开发或面试表达。
我们可以为组件的 `prop` 指定验证要求，例如你知道的这些类型。如果有一个需求没有被满足，则 `Vue` 会在浏览器控制台中警告你。
这在开发一个会被别人用到的组件时尤其有帮助。

使用对象定制 `prop` 的验证方式，例如：

- 可以为基本类型的构造函数；
- 可以为数组，数组的每一个元素为一条验证方式；
- 可以为一个对象，对象的每一个键值对定义一条验证方式；其中键值对可以是：
    - `type`：定义类型；
    - `required`：定义是否必须；
    - `default`：定义默认值，可以直接为字面量或者定义一个返回默认值的函数；
    - `validator`：用自定义函数对值进行验证；

```
Vue.component('my-component', {
    props: {
        //
```

基础的类型检查 `` (`null` `` 和 `` `undefined` `` 会通过任何类型验证

```
)
        propA: Number,
        //
```

多个可能的类型

```
        propB: [String, Number],
        //
```

必填的字符串

```
        propC: {
            type: String,
            required: true
        },
        //
```

带有默认值的数字

```
        propD: {
            type: Number,
            default: 100
        },
        //
```

带有默认值的对象

```
        propE: {
            type: Object,
            //
```

对象或数组默认值必须从一个工厂函数获取

```
            default: function () {
                return { message: 'hello' }
            }
        },
        //
```

自定义验证函数

```
        propF: {
            validator: function (value) {
                //
```

这个值必须匹配下列字符串中的一个

```
                return ['success', 'warning', 'danger'].indexOf(value) !== -1
            }
        }
    }
})
```
 当 `prop` 验证失败的时候，`(`开发环境构建版本的`) Vue` 将会产生一个控制台的警告。
**注意：**那些 `prop` 会在一个组件实例创建之前进行验证，所以实例的 `property (`如 `data`、`computed` 等`)` 在 `default` 或 `validator` 函数中是不可用的。

**类型检查**
`type` 可以是下列原生构造函数中的一个：

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`
- 此外`type` 还可以是一个自定义的构造函数，并且通过 `instanceof` 来进行检查确认。

例如，给定下列现成的构造函数：

```
function Person (firstName, lastName) {  this.firstName = firstName  this.lastName = lastName}
```
 你可以使用：

```
Vue.component('blog-post', {  props: {    author: Person  }})
```
 来验证 `author` `prop` 的值是否是通过 `new Person` 创建的。

:::
