---
title: "关联响应数据与Effect"
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
description: "为了方便，我们Set数据结构中所存储的副使用函数集合称为key的依赖集合。"
sidebarWeight: 76
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/响应式思路/关联响应数据与Effect.md"
---
::: v-pre

# 关联响应数据与Effect

> 本节目标：理解“关联响应数据与Effect”的核心思路，并能把它用于实际开发或面试表达。
```
在被操作的目标字段和副作用函数之间建立关系；
```

```
有以下情况：
一、有两个副作用函数同时读取同一个对象的属性值：
effect(function effectFn1() {
  obj.text
})
effect(function effectFn2() {
  obj.text
})
那么关系如下：
```

```
二、如果一个副作用函数中读取了同一个对象的两个不同属性：
effect(function effectFn() {
  obj.text1
  obj.text2
})
那么关系如下：
```

```
三、如果在不同的副作用函数中读取出两个不同对象的不同属性：
```

```
effect(function effectFn1() {
  obj.text1
})
effect(function effectFn2() {
  obj.text2
})
那么关系如下：
```

```
总之，我们建立的这种关系就是一个树形结构。
```

```
Weekmap由target--> Map构成
```

```
Map由key --> Set 构成
```

为了方便，我们Set数据结构中所存储的副使用函数集合称为key的依赖集合；

```
WeakMap经常用于存储那些只有当key所引用的对象存在时（没有被回收）才有价格的信息。在下面的场景中，如果target对象没有任何引用了，说明用户侧不再需要它了，这时垃圾回收器会完成回收任务。但如果使用Map来代替WeakMap，那么即使用户侧的代码对Target没有任何引用，这个target也不会被回收，最终可能导致内存溢出；
<body></body>
<script>
  // 存储副作用函数的桶
  const bucket = new WeakMap()
  // 原始数据
  const data = { text: 'hello world' }
  // 对原始数据的代理
  const obj = new Proxy(data, {
    // 拦截读取操作
    get(target, key) {
      // 将副作用函数 activeEffect 添加到存储副作用函数的桶中
      let depsMap = bucket.get(target)
      if (!depsMap) {
        bucket.set(target, (depsMap = new Map()))
      }
      let deps = depsMap.get(key)
      if (!deps) {
        depsMap.set(key, (deps = new Set()))
      }
      deps.add(activeEffect)
      // 返回属性值
      return target[key]
    },
    // 拦截设置操作
    set(target, key, newVal) {
      // 设置属性值
      target[key] = newVal
      // 把副作用函数从桶里取出并执行
      const depsMap = bucket.get(target)
      if (!depsMap) return
      const effects = depsMap.get(key)
      effects && effects.forEach(fn => fn())
    }
  })
  // 用一个全局变量存储当前激活的 effect 函数
  let activeEffect
  function effect(fn) {
    // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect
    activeEffect = fn
    // 执行副作用函数
    fn()
  }
  effect(() => {
    console.log('effect run')
    document.body.innerText = obj.text
  })
  setTimeout(() => {
    obj.text = 'hello vue3'
  }, 1000)
</script>
```

:::
