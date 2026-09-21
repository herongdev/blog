---
title: "实现Reactive"
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
description: "取值时，直接在我们代理对象上取值； 设置值时，直接将新值赋值给对象上的指定属性； 这种实现的问题在于，如果对对象的属性进行取值时，调用的是一个函数如get函数，而这个函数的内部又使用了this，这时，这个this的指向是被代理的对象；这们，当取值函数所依赖的被代理对象的比如，th。"
sidebarWeight: 85
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/实现Reactive/实现Reactive.md"
---
::: v-pre

# 实现Reactive

> 本节目标：理解“实现Reactive”的核心思路，并能把它用于实际开发或面试表达。
```
同个对象缓存处理
```

```
参数为代理Proxy如何处理
```

```
新建文件packages/reactivity/dist/index.html，
在文件中引用我们reactivity打包后生成的reactivity.global.js文件，
```

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script src="../../reactivity/dist/reactivity.global.js"></script>
</body>
</html>
```

```
新建reactivity/src/reactivity.ts
新建reactivity/src/effect.ts
在reactivity/src/index.ts中导出这两个模块；
export { reactivity } from './reactivity'
export { effect } from './effect'
```

```
reactivity/src/reactivity.ts的主要作用是将数据转换为响应式数据；
import { isObject } from "@vue/shared";
// 只能做对象的代理
export function reactivity(object) {
  if (!isObject) {
    return
  }
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      return target[key]
    },
    set(target, key, value, receiver) {
      target[key] = value;
      return true
    }
  })
  return proxy
}
```

取值时，直接在我们代理对象上取值；
设置值时，直接将新值赋值给对象上的指定属性；

这种实现的问题在于，如果对对象的属性进行取值时，调用的是一个函数如get函数，而这个函数的内部又使用了this，这时，这个this的指向是被代理的对象；这们，当取值函数所依赖的被代理对象的比如，this.name的name变化时，理论上我们的effect要重新执行，但由于对象属性的变化不会触发proxy的get或set方法，所以effect不会重新执行，这样就失去了响应性；如：

```
let target = {
  name: 'zf',
  get alias() {
    return this.name
  }
}
在我们上面的实现中，name变化了，我们希望alias也会变化 ，但实际上，我们只会在读取alias属性时，会触发proxy的get函数；在读取this.name时，我们只是在源对应上去取值，不会触发proxy的get函数，失去响应；
```

所以，我们希望，对象的取值函数中的this能指向proxy，这们，访问访问器属性是，由于this指向了proxy时，还是会走proxy的get函数 ；

:::
