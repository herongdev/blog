---
title: "effect"
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
description: "我们有这么一个函数fn，它内部的计算使用了一次变量，我们希望当这些变量变化时，这个函数能重新执行一次，得到fn最新的值； 为达到这个目的，我们需要将这个函数内部的变量和这个函数fn进行关联，就是说当变量变化了，我们就让哪个函数重新执行； 为了收集对应关系，好办法就是先要把这个函数。"
sidebarWeight: 87
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/实现effect/effect.md"
---
::: v-pre

# effect

> 本节目标：理解“effect”的核心思路，并能把它用于实际开发或面试表达。
我们有这么一个函数fn，它内部的计算使用了一次变量，我们希望当这些变量变化时，这个函数能重新执行一次，得到fn最新的值；

为达到这个目的，我们需要将这个函数内部的变量和这个函数fn进行关联，就是说当变量变化了，我们就让哪个函数重新执行；

为了收集对应关系，好办法就是先要把这个函数执行一次，看看实际上用到了哪些变量；

这些变量的值，有的是基本值，有的是引用类型的值，基本类型的值变化我们是没有办法侦测到的。为此，我们想着将所有函数中要用到的变量的值，保存到一个对象上去，在函数执行的时候，我们取变量的值，变成到一个对象上去取属性，这时，我们可以将对象使用Proxy代理起来，在访问代理对象的属性的get方法中，我们将当前执行的函数fn、保存属性的对象和要取值的属性名记录为对应关系，这样的话，下次属性变化了，我们就知道要更新的是函数fn了；

此外，在设置代理对象值的Set函数中，我们知道值要变化了，这时，我们可以使用之前的对应关系，找到相应的对象和相应的函数fn，我们将fn重新执行一次就可以了，这样就相当于属性变化，我们就可以让依赖这些属性值的函数重fn新执行，得到最新的函数返回值；

为了让函数一开始就执行一次，好进行依赖收集，我们要将这个函数包在另外一个函数中，这个函数中，我们先执行一下传入的函数fn，进行对应关系收集，这个函数叫做effect，这个函数主要做以下事情：

创建一个对象，在这个对象上保存着我们执行的函数fn；为什么要创建一个对象来保存要重复执行的函数fn，主要是为了应付复杂的实际需求，处理特殊情况；

将这个对象上执行函数fn的方法调用一次，为的就是依赖收集；

- ```
    返回这个对象上执行函数fn的方法；
    ```

    ```
    将这个方法的this绑定到effect对象；
    ```

    ```
    这个方法上还有一个指针effect指向这个对象；
    ```

```
export const effect = (fn, options: any = {}) => {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  _effect.run();
  // 将实例的Run方法绑定到effect上，然后作为返回值返回
  // 绑定this执行
  const runner = _effect.run.bind(_effect);
  // 将effect挂载到runner函数上
  runner.effect = _effect;
  return runner
}
```

```
我们再看一下这个ReactiveEffect类，我们用它的实例来保存了fn和其它属性；
export class ReactiveEffect {
  public deps = [];
  public parent = null;
  public active = true
  constructor(public fn, public scheduler) { }
  run() {
    if (!this.active) {
      return this.fn();
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      // 这里我们需要在执行用户函数之前将之前收集的内容清空
      cleanupEffect(this)
      return this.fn();
    } finally {
      activeEffect = this.parent;
      this.parent = null;
    }
  }
  stop() {
    if (this.active) {
      this.active = false;
      cleanupEffect(this); // 停止effect的收集
    }
  }
}
```

由于在我们函数fn的包装函数effect中，我们创建了上面这个类的实例，并运行了它的run方法（对函数fn的一次切片包装，加入了一些更多的逻辑），我们运行run方法时，实际上就是在调用函数fn，在调用函数fn时免不了会在代理对象上取函数fn要用到的属性值，这时，就进行到了代理对象的Get方法中，由于模块化编程，我们将proxy的Get方法放在一个模块中，而run函数又在另外的模块中，所以我们创建了变量activeEffect，它记录着当前运行的函数fn所位于的reactiveEffect实例；我们这个变量引入到proxy的get方法所在的模块，这样proxy的Get方法也就知道当前运行的保存fn函数的reactiveEffect实例是哪个，并建立起关联关系；

因此，在run函数的逻辑中，我们将activeEffect这个变量指向自身，也就是保存fn的activeEffect实例；也就是effect函数包装了函数fn，函数fn先执行一次，在执行的时候，告诉变量activeEffect，当前是我在执行，是我在访问代理对象上的属性；因为函数fn是保存在reactiveEffect实例上，所以我们就将activeEffect指向函数fn所在的reactiveEffect实例就行了；

```
由于effect往往是嵌套使用的，当最外层的effect执行时：
```

我们创建一个当这个函数fn执行完了，也就是当前fn所使用的变量已经完成了对应关系的建立 ，我们得让activeEffect指向另外一个effect才行，由于嵌套的原因，我们把activeEffect指向了parent，这个parent的初始值是undefined，就是说没有effect执行run时，是activeEffect为undefined；

到此，关联关系建立完了，就是我们知道代理对象上的属性和它们变化时要执行的函数fn是哪个，当然，这个函数fn放在了一个reactiveEffect实例上；

```
当代理对象的属性变化时：
此时，我们进行到代理对象的的set函数中，我们知道我们访问的是哪个代理对象，代理对象的哪个属性，因此，我们找到了对应的reactiveEffect实例，它的run方法，就是我们要执行的函数fn，在执行属性对应的所有的Effect的时候，我们要先复制一份原来的set；
export function trigger(target, type, key, value, oldValue) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return; // 触发的值不在模板中使用
  let effects = depsMap.get(key); // 找到了属性对应的effect
  // 永远在执行之前 先拷贝一份来执行， 不要关联引用
  if (effects) {
    triggerEffects(effects)
  }
}
export function triggerEffects(effects) {
  effects = new Set(effects);
  effects.forEach(effect => {
    // 我们在执行effect的时候，又要执行自己，那我们需要屏蔽掉，不要无限调用
    if (effect !== activeEffect) {
      if (effect.scheduler) {
        // 如果用户传入了调度函数，则用用户的
        effect.scheduler();
      } else {
        effect.run() // 否则默认刷新视图
      }
    }
  });
}
```

之所以要effect不能等于自身，是因为如果我们在函数fn中加入依赖属性的赋值操作，并且每次都赋予了一个随机值，就又会触发proxy的set操作，又进行到了triggerEffect中，在triggerEffect中我们又会执行efftet.run方法，执行的时候又进入到赋值，再进入到代理的Set，这样会死循环；加上这个判断之后，赋值可以成功，但是更新只会执行一次；

在effect中给代理对象的属性赋值，如果赋值在这个对象被读取之前 ，就是简单的赋值，因为依赖收集还没有完成，不会触发effect重新运行函数fn；
但如果这个赋值发生在读取这个对象之后，依赖收集已经完成了，此时赋值是会让函数fn重新执行的。重新执行时又到了赋值语句这里，但由于此时的值和上次的一样，不会触发effect.run执行；但如果赋值的是一个引用值，则也会死循环，所以这个if (effect !== activeEffect)可以有效预防赋值语句造成的死循环；

所以effect中对代理对象进行的赋值语句，赋值会成功，但在再次进行TriggerEffect时，被阻止了，也就是不会重新运行reactiveEffect的run方法；

:::
