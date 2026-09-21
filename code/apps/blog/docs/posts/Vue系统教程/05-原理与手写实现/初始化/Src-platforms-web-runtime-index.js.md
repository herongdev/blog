---
title: "Src-platforms-web-runtime-index.js"
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
description: "继续从core/index中导入Vue构造函数： 不妨先看 src/core/index.js 中的代码，看它导出的 Vue 构造函数是什么样的： 可以看到，它在内部也引入了另外一个 Vue 构造函数（ src/core/instance/index.js ），可以先看它的代码。"
sidebarWeight: 64
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/手写/初始化/Src-platforms-web-runtime-index.js.md"
---
::: v-pre

# Src-platforms-web-runtime-index.js

> 本节目标：理解“Src-platforms-web-runtime-index.js”的核心思路，并能把它用于实际开发或面试表达。
继续从core/index中导入Vue构造函数：

不妨先看`src/core/index.js`中的代码，看它导出的`Vue`构造函数是什么样的：

可以看到，它在内部也引入了另外一个`Vue`构造函数（`src/core/instance/index.js`），可以先看它的代码，回头再看自身的代码：

`src/core/instance/index.js`
主要逻辑：

- 创建一个Vue构造函数
    - 在创建实例时会：
        - 判断是不是用`new`调用的；
        - 调用实例的`_init`方法；
- 再依次在它的原型上拓展各种方法：
    - ```
        initMixin(Vue)
        ```

    - ```
        stateMixin(Vue)
        ```

    - ```
        eventsMixin(Vue)
        ```

    - ```
        lifecycleMixin(Vue)
        ```

    - ```
        renderMixin(Vue)
        ```

- 导出Vue构造函数

```
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
export default Vue
./init.js
```

```
src/core/index.js
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'
initGlobalAPI(Vue)
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})
// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})
Vue.version = '__VERSION__'
export default Vue
```

:::
