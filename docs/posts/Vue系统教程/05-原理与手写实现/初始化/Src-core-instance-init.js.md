---
title: "Src-core-instance-init.js"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "主要逻辑： 在Vue原型上定义一个 init方法； 同时还定义了一些其它方法； 先看 init方法： 主要逻辑： 给 Vue 实例添加一个属性 uid ，代表唯一的 id ； 标识实例： vm.isVue true; 查看是否有用户参数，并且参数上有没有标识是组件，如果是调用 i。"
sidebarWeight: 63
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/手写/初始化/Src-core-instance-init.js.md"
---
::: v-pre

# Src-core-instance-init.js

> 本节目标：理解“Src-core-instance-init.js”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
主要逻辑：

- 在Vue原型上定义一个_init方法；
- 同时还定义了一些其它方法；

先看_init方法：
主要逻辑：

- 给`Vue`实例添加一个属性`_uid`，代表唯一的`id`；
- 标识实例：`vm.isVue=true;`
- 查看是否有用户参数，并且参数上有没有标识是组件，如果是调用`initInternalComponent`方法初始化组件；否则调用`mergeOptions`方法合并组件的参数；
- 如果是开发环境，调用`initProxy(vm)`，生产环境则调用`vm._renderProxy=vm`
- 在`vm`实例上加上一个属性`_self`，指向自身
- 初始化各种事件，并触发生命周期：

```
vm._self = vm
initLifecycle(vm)
initEvents(vm)
initRender(vm)
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')
```

- 性能相关
- 调用`vm.$mount`方法，挂载组件；

这里要注意，这个`_init`方法是在所有对`Vue`构造函数的扩展逻辑走完后，在调用`New Vue`时，才会执行；

再看`initInternalComponent`方法：

```
export function initInternalComponent(vm: Component, options: InternalComponentOptions) {
  const opts = vm.$options = Object.create(vm.constructor.options)
  // doing this because it's faster than dynamic enumeration.
  const parentVnode = options._parentVnode
  opts.parent = options.parent
  opts._parentVnode = parentVnode
  const vnodeComponentOptions = parentVnode.componentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._componentTag = vnodeComponentOptions.tag
  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}
```

`initLifecycle(vm)`：`src/core/instance/lifecycle.js`

:::
