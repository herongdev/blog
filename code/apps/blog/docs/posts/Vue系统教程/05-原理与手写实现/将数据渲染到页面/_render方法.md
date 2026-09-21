---
title: "_render方法"
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
description: "获取真实的元素 页面真实元素 模板编译 创建元素型的节点 创建文本的虚拟节点 描述虚拟节点是属于哪个实例的 中有所有的数据 返回虚拟节点 返回虚拟节点。"
sidebarWeight: 68
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/手写/将数据渲染到页面/_render方法.md"
---
::: v-pre

# _render方法

> 本节目标：理解“_render方法”的核心思路，并能把它用于实际开发或面试表达。
```
Vue.prototype.$mount = function (el) {
  const vm = this;
  const opts = vm.$options;
  el = document.querySelector(el); //
```

获取真实的元素

```
  vm.$el = el; //
```

页面真实元素

```
  if (!opts.render) {
    //
```

模板编译

```
    let template = opts.template;
    if (!template) {
      template = el.outerHTML;
    }
    let render = compileToFunction(template)
    opts.render = render;
  }
  mountComponent(vm)
}
```

```
import { isObject } from "./utils"
import { createElement, createText } from "./vdom"
export function renderMixin(Vue) {
    Vue.prototype._c = function () { // createElement
```

创建元素型的节点

```
        const vm = this;
        return createElement(vm, ...arguments)
    }
    Vue.prototype._v = function (text) { //
```

创建文本的虚拟节点

```
        const vm = this;
        return createText(vm, text); //
```

描述虚拟节点是属于哪个实例的

```
    }
    Vue.prototype._s = function (val) { // JSON.stingfiy()
        if (isObject(val)) return JSON.stringify(val);
        return val;
    }
    Vue.prototype._render = function () {
        const vm = this; // vm
```

中有所有的数据

```
 vm.xxx => vm._data.xxx
        let { render } = vm.$options;
        let vnode = render.call(vm);
        return vnode;
    }
}
```

```
export function createElement(vm, tag, data = {}, ...children) { //
```

返回虚拟节点

```
 _c('',{}....)
    return vnode(vm, tag, data, children, data.key, undefined)
}
export function createText(vm, text) { //
```

返回虚拟节点

```
    return vnode(vm, undefined, undefined, undefined, undefined, text)
}
function vnode(vm, tag, data, children, key, text) {
    return {
        vm,
        tag,
        data,
        children,
        key,
        text,
    }
}
```

:::
