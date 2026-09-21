---
title: "【中级】动态给vue的data添加一个新的属性时会发生什么？怎样解决？"
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
description: "原因： vue开始会对data中的属性使用Object.defindProperty进行重写，为属性添加了get和set方法，并进行了依赖的收集； 使这些属性变成响应式数据； 新增加的属性没有被Object.defindProperty进行重写，所以并没有get和set方法，所以。"
sidebarWeight: 27
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/面试/响应式问题/【中级】动态给vue的data添加一个新的属性时会发生什么？怎样解决？.md"
---
::: v-pre

# 【中级】动态给vue的data添加一个新的属性时会发生什么？怎样解决？

> 本节目标：理解“【中级】动态给vue的data添加一个新的属性时会发生什么？怎样解决？”的核心思路，并能把它用于实际开发或面试表达。
```
数据变化了，界面并不会更新；
```

原因：
vue开始会对data中的属性使用Object.defindProperty进行重写，为属性添加了get和set方法，并进行了依赖的收集；
使这些属性变成响应式数据；
新增加的属性没有被Object.defindProperty进行重写，所以并没有get和set方法，所以属性变了，不会触发get，也就不会是响应式的；

```
解决方法：
```

```
==Vue.set()====或====this.$set==
```

```
==Object.assign()==
```

```
==$forcecUpdated()==
```

```
==Vue.set()==
==Vue.set( target, propertyName/index, value )==
==参数==
```

```
=={Object | Array} target==
```

```
=={string | number} propertyName/index==
```

```
=={any} value==
```

```
==返回值：设置的值==
==通过====Vue.set====向响应式对象中添加一个====property====，并确保这个新== ==property====同样是响应式的，且触发视图更新====；==
==关于====Vue.set====源码（省略了很多与本节不相关的代码）==
==源码位置：====src\core\observer\index.js==
function set(target: Array<any> | Object, key: any, val: any): any {
  ...
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
==这里无非再次调用====defineReactive====方法，实现新增属性的响应式==
==关于====defineReactive====方法，内部还是通过====Object.defineProperty====实现属性拦截==
==大致代码如下：==
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        val = newVal
      }
    }
  })
}
```

```
==#====Object.assign()==
==直接使用====Object.assign()====添加到对象的新属性不会触发更新====，==
==应创建一个新的对象，合并原对象和混入对象的属性====，====然后用这个新对象替换原对象；==
this.someObject = Object.assign(
  {},
  this.someObject,
  {
    newProperty1: 1,
    newProperty2: 2
  }
)
```

==$forceUpdate==
==如果你发现你自己需要在== ==Vue====中做一次强制更新，====99.9%== ==的情况，是你在某个地方做错了事==
==$forceUpdate====迫使====Vue== ==实例重新渲染==
==PS====：仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。==

```
==#====小结==
```

```
==如果为对象添加少量的新属性，可以直接采用====Vue.set()====；==
```

==如果需要为新对象添加大量的新属性，则通过====Object.assign()====创建新对象====；==

==如果你实在不知道怎么操作时，可采取====$forceUpdate()====进行强制刷新== ==(====不建议====)====；==

==PS====：====vue3====是用过====proxy====实现数据响应式的，直接动态添加新属性仍可以实现数据响应式==

:::
