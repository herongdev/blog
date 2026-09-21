---
title: "Ref实现"
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
description: "如果一个变量保存的是基本类型的值，我们修改其值的时候，我们是没有办法侦测到的； 但如果我们将这个基本类型的值放到一个对象（这个对象可以是使用构造函数或类来创建的）的访问器属性上时，就可以在属性的get和set方法中侦测到取值和赋值操作； 当这个被包装过的值用在一个函数中时，我们也。"
sidebarWeight: 22
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/Ref实现/Ref实现.md"
---
::: v-pre

# Ref实现

> 本节目标：理解“Ref实现”的核心思路，并能把它用于实际开发或面试表达。
如果一个变量保存的是基本类型的值，我们修改其值的时候，我们是没有办法侦测到的；

但如果我们将这个基本类型的值放到一个对象（这个对象可以是使用构造函数或类来创建的）的访问器属性上时，就可以在属性的get和set方法中侦测到取值和赋值操作；

当这个被包装过的值用在一个函数中时，我们也可以在函数首次运行时，进行依赖收集，当这个被包装过的值被修改也就是赋值的时候，我们也可以让这个函数重新运行；

这样所做的目的就是为了让我们对一个基本类型的值进行读取和修改的时候，我们还能检测到读取和修改，并在读取时收集依赖，修改时通知相应的函数再次运行，从而得到最新值；其功能和Reactive一样，只是，它包装的是一个基本类型的值，Reactive包装的是一个对象；

```
新建文件reactivity/src/ref.ts
调用ref函数直接返回一个RefImpl实例：
export function ref(value) {
  return new RefImpl(value);
}
```

```
这个RefImpl类也很简单：
只有一个访问器属性value，
```

- 当获取这个属性时，我们看看是哪个ReactiveEffect实例使用了value属性，建立起依赖关系，这次的关系是Value和effect的关系，没有之前的代理对象，因为我们只是在Value修改时，通知efftct重新run就行；

    ```
    我们把Value对应的effect使用一个Set保存在实例的dep属性上；
    ```

    然后，我们返回实例的_value属性值，它保存着实际的基本类型值；

```
get value() {
  trackEffects(this.dep)
  return this._value
}
```

```
export function trackEffects(dep) {
  if (activeEffect) {
    let shouldTrack = !dep.has(activeEffect); // 去重了
    if (shouldTrack) {
      dep.add(activeEffect);
      // 存放的是属性对应的set
      activeEffect.deps.push(dep);
    }
  }
}
```

- ```
    当设置Value属性时，我们：
    ```

    判断此次的值是否和上次一致，为了做这个判断，我们还在实例上保存了一个rawValue记录着未赋值之前的值，如果值是基本类型，它与_value值是一样的，如果是引用类型的值，则rawValue是未代理前的值；

    所以实例属性rawValue和_value在值为基本类型时相等，为引用类型时，一个是未代理前的值，_value是代理后的值；

    由可能由一个基本值变成了一个引用类型值，如果变成了一个引用类型的值，我们将它变成响应式的；

    ```
    将RefImpl实例的_value属性值赋值为我们设置的值；
    ```

    将实例Dep上保存的关联effect取出来，复制一份，然后一个个执行它们的effect.run方法，也就是把使用ref的函数重新再执行一次，计算新值；

    执行一次的时候，又更新了一下value和effect的关系，因为有的代理对象的属性或ref在这次计算中可能没用到；

由于传递给ref函数的初始值有可能是基本类型值，也有可能是引用类型值；如果是引用类型的值，比如对象和数组，我们往往会访问它们的属性，

```
日常使用时，我们会访问ref的Value属性，这时
```

```
class RefImpl {
  public dep = new Set;
  public _value;
  public __v_isRef = true
  constructor(public rawValue) {
    this._value = toReactive(rawValue);
  }
  get value() {
    trackEffects(this.dep)
    return this._value
  }
  set value(newValue) { // watch
    if (newValue !== this.rawValue) {
      this._value = toReactive(newValue);
      this.rawValue = newValue
      triggerEffects(this.dep);
    }
  }
}
```

```
function toReactive(value) {
  return isObject(value) ? reactive(value) : value
}
```

:::
