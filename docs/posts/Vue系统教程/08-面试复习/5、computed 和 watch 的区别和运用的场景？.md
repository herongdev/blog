---
title: "5、computed 和 watch 的区别和运用的场景？"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试复习"
description: "computed ： 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值； watch ： 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都。"
sidebarWeight: 6
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/面试/5、computed 和 watch 的区别和运用的场景？.md"
---
::: v-pre

# 5、computed 和 watch 的区别和运用的场景？

> 本节目标：理解“5、computed 和 watch 的区别和运用的场景？”的核心思路，并能把它用于实际开发或面试表达。
**computed****：** 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值；

**watch****：** 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；

```
**运用场景：**
```

当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；

当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

如果我们要根据一些值计算出另外一个值的时候，用计算属性；
如果我们要根据一个值的变化，来执行一系列操作，特别是含有异步操作的时候，我们使用观察属性。同时，我们还可以根据这个值的变化，设置不同的data值。

```
**watch**
**类型**：{ [key: string]: string | Function | Object | Array }
**详细**：一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个 property。
**示例**：
var vm = new Vue({
    data: {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: {
            f: {
                g: 5
            }
        }
    },
    watch: {
        a: function (val, oldVal) {
            console.log('new: %s, old: %s', val, oldVal)
        },
        // 方法名
        b: 'someMethod',
        // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
        c: {
            handler: function (val, oldVal) { /* ... */ },
            deep: true
        },
        // 该回调将会在侦听开始之后被立即调用
        d: {
            handler: 'someMethod',
            immediate: true
        },
        // 你可以传入回调数组，它们会被逐一调用
        e: [
            'handle1',
            function handle2(val, oldVal) { /* ... */ },
            {
                handler: function handle3(val, oldVal) { /* ... */ },
                /* ... */
            }
        ],
        // watch vm.e.f's value: {g: 5}
        'e.f': function (val, oldVal) { /* ... */ }
    }
})
vm.a = 2 // => new: 2, old: 1
```

注意，**不应该使用箭头函数来定义** **watcher** **函数** (例如 searchQuery: newValue =\> this.updateAutocomplete(newValue))。理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.updateAutocomplete 将是 undefined。

```
**参考**：[实例方法](https://cn.vuejs.org/v2/api/#vm-watch) / 数据 - vm.$watch
```
 \> 来自

```
 <https://cn.vuejs.org/v2/api/#watch>
```

:::
