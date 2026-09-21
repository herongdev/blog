---
title: "vm.$watch( expOrFn, callback, options )"
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
description: "参数 ： {string Function} expOrFn {Function Object} callback {Object} [options] {boolean} deep {boolean} immediate 返回值 ： {Function} unwatch 用法。"
sidebarWeight: 35
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/侦听属性/vm.$watch( expOrFn, callback, options ).md"
---
::: v-pre

# vm.$watch( expOrFn, callback, options )

> 本节目标：理解“vm.$watch( expOrFn, callback, options )”的核心思路，并能把它用于实际开发或面试表达。
==参数====：==

- `{string | Function} expOrFn`
- `{Function | Object} callback`
- `{Object} [options]`
- `{boolean} deep`
- `{boolean} immediate`
- ==返回值====：==`{Function} unwatch`

==用法====：==``==观察== `Vue` ==实例上的一个表达式或者一个函数计算结果的变化。回调函数得到的参数为新值和旧值。表达式只接受简单的键路径。对于更复杂的表达式，用一个函数取代。==``==注意：在变更== `(`==不是替换==`)` ==对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象==`/`==数组。==`Vue` ==不会保留变更之前值的副本。==
==示例====：==

```
//
```

==键路径==

```
vm.$watch('a.b.c', function (newVal, oldVal) {  //
```

==做点什么==

```
})//
```

==函数==

```
vm.$watch(  function () {    //
```

==表达式== `` `this.a + this.b` `` ==每次得出一个不同的结果时==

```
    //
```

==处理函数都会被调用。==

```
    //
```

==这就像监听一个未被定义的计算属性==

```
    return this.a + this.b  },  function (newVal, oldVal) {    //
```

==做点什么==

```
  })vm.$watch
```

 ==返回一个取消观察函数，用来停止触发回调：==

```
var unwatch = vm.$watch('a', cb)//
```

==之后取消观察==

```
unwatch()
```

**选项：**

```
deep
```

==为了发现对象内部值的变化，可以在选项参数中指定== `deep: true`==。注意监听数组的变更不需要这么做。==

```
vm.$watch('someObject', callback, {  deep: true})vm.someObject.nestedValue = 123// callback is fired
```

**选项：**

```
immediate
```

==在选项参数中指定== `immediate: true` ==将立即以表达式的当前值触发回调：==

```
vm.$watch('a', callback, {  immediate: true})//
```

==立即以== `` `a` `` ==的当前值触发回调==``==注意在带有== `immediate` ==选项时，你不能在第一次回调时取消侦听给定的== `property`==。==

```
//
```

==这会导致报错==

```
var unwatch = vm.$watch(  'value',  function () {    doSomething()    unwatch()  },  { immediate: true })
```

==如果你仍然希望在回调内部调用一个取消侦听的函数，你应该先检查其函数的可用性：==

```
var unwatch = vm.$watch(  'value',  function () {    doSomething()    if (unwatch) {      unwatch()    }  },  { immediate: true })
```
 \> 来自

```
 <https://cn.vuejs.org/v2/api/#vm-watch>
```

:::
