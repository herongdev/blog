---
title: "React源码解析，实现一个React"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "前言 React 起源于 Facebook 的内部项目，是一个用于构建用户界面的 Javascript 库。其拥有较高的性能，代码逻辑非常简单，越来越多的人已开始关注和使用它。 本文希望通过参考 React 源码，依葫芦画瓢地完成 React 的雏形。来帮助理解其内部的实现原理。"
sidebarWeight: 7
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理 2/React源码解析，实现一个React.md"
---
::: v-pre

# React源码解析，实现一个React

> 本节目标：理解“React源码解析，实现一个React”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
**前言**
`React` 起源于 `Facebook` 的内部项目，是一个用于构建用户界面的 `Javascript` 库。其拥有较高的性能，代码逻辑非常简单，越来越多的人已开始关注和使用它。
本文希望通过参考 `React` 源码，依葫芦画瓢地完成`React`的雏形。来帮助理解其内部的实现原理，知其然更要知其所以然。
**虚拟**`DOM(Virtual DOM)`
了解`React`的都知道，其高效的原因，是因为`React`按照页面的`DOM`结构，利用`Javascript`在内存中构建了一套相同结构的虚拟内存树模型，这个内存模型就称为`Virtual DOM`。每当页面产生了变化，`React`的`diff`算法会先在内存模型中进行比对，提取出差异点，在将`Virtual DOM`转化为原生`DOM`输出时，按照差异点，只`patch`出有变动的部分。
下面是`VirtualDOM`节点的定义：

**入口**
一切都是从 `React.render(\<App/\>, document.body)` 开始的，所以先来看看 `React`是怎么定义的？
`React`中主要包括：
`render(virtualDom, container)` 命令式调用，一般用于应用入口，将虚拟`DOM`渲染在`container`容器中；
`createElement(name, props, children)` 创建组件时使用，`JSX`是其语法糖；
`Component` 以`ES6`中的类式语法声明时使用。

```
createElement(type, props, children)
createElement()
```

的主要作用是根据给定`type`创建`Virtual DOM`节点，`JSX`是它的语法糖形式；其`type`参数可以是原生的`html`标签名（如：`div`、`tag`等），也可以是`React`组件类或函数。
**组件的实现**
`React`的所有组件，按照类型可以分为三种：
文本展示类型 `(TextComponent)`
原生`DOM`类型 `(DomComponent)`
自定义类型 `(CompositeComponent)`
每种类型的组件，都需要处理**初始化**和**更新**两种逻辑，具体会在下面两个函数中实现：
`mountComponent(rootNodeId)` 用于处理初始化逻辑
`updateComponent()` 用于处理更新逻辑
初始化`mountComponent()`的实现
`mountComponent()` 的实现思路是，**根据**`virtual Dom`**对象生成**`HTML`**代码并返回。**
首先定义类型组件的基类 `Component` ，它只是简单地记录了传入的`virtualDom`对象，并初始化了组件节点`ID`。

下面是不同类型组件初始化渲染逻辑的各自实现。
`TextComponent`
作为纯展示类型组件，`TextComponent` 只是简单地将需要展示的内容，使用标签包装并返回就可以了。

```
DomComponent
DomComponent
```

类型在处理原生`DOM`时，需要额外注意一下原生事件部分的处理。

`CompositeComponent`
在实现`CompositeComponent`类型的初始化渲染逻辑之前，先看一下`React`组件的定义语法。

声明语法中，`App`继承自`React.Component`，所以我们先来实现`Component`这个类。
这里的 `React.Component` 不要与上面的 `Component` 混淆， `Component` 是不同组件类型的基类，抽象了组件渲染与更新；而`React.Component`则是`Composite`这种类型组件声明时的基类。
在 `React.Component` 中，简单地声明了控制数据流向的`props`属性，以及组件实例内部用于触发更新的`setState()`函数。

在了解了 `React.Component` 的定义之后，我们回到 `CompositeComponent` ，开始实现`mountComponent()`的逻辑。
首先要了解的是，在`composite`类型组件中，`vDom`对象中的`type`，指向的是组件类的定义， 因此 `mountComponent()` 函数要做的工作，就是使用`vDom`的`props`属性来创建一个`type`的实例。

思考一下，在`JSX`语法中，解析器碰到 `\<MyInput/\>` 标签后，就会去查找到 `MyInput` 的定义，上面说过`JSX`只是`createElement`的语法糖，因此背后调用的是 `React.createElement(MyInput)` 。在`React`规范中，可以使用类或函数来声明组件，因此在 `mountComponent()` 中使用 `new type()` ，就可以构造出`MyInput`的实例了。
**更新流程**`updateComponent()`**的实现**
实现完组件的初始化之后，接下来要实现组件的更新逻辑。
`React`开放了 `setState()` 用于组件更新，回顾上面 `React.Component` 中 `setState()` 的定义， 实际调用的是 `this._reactInternalInstance.updateComponent(null, newState)` 这个函数。而 `this._reactInternalInstance`指向`CompositeComponent`，困此更新逻辑交回`CompositeComponent.updateComponent()`来完成。

```
CompositeComponent
Composite
```

类型组件的更新函数，需要处理两种流程：
当被定义在其它组件的`render`函数中时，其包裹组件会构建出新的`vDom`对象，根据传入新的`vDom`来处理更新；当组件内部使用`setState()`触发时，根据新的`state`来更新；了解这两种方式的区别，可以帮助我们理解下面`updateComponent`函数的实现。

我们梳理一下更新流程：
组件在初始化时，记录下了`render`组件的实例，即`this._renderedComponent`；在更新环节，重新`render()`得到新的`VDomnextRenderVDom`；通过比对前后两个`VDom`的`type`和`key`，来判断是执行原来`_renderedComponent`的`updateComponent`函数，还是重新生成新的组件；上面使用到了`shouldUpdateReactComponent`这个比对函数，来对`vDom`的`type`和`key`进行比对，其实现如下：

上面这个处理逻辑，就是`diff`算法的第一个规则： 当两个`VDom`节点的类型不一致时，重新构建该组件的`Virtual DOM`树结构。
`TextComponent Text`类型组件作为颗粒度最小的组件，更新逻辑非常简单，展示新的文本内容即可。

`DomComponent`
因为`diff`算法的介入，`Dom`类型的处理逻辑相对复杂。 可以分两步来处理，第一步更新组件输出的容器`DOM`上面的属性；第二步处理子级`DOM`。

`_updateProperties()`函数对比新旧`props`，完成属性及事件的处理。 特别注意一下事件处理部分，需要注销掉原来`DOM`上注册的事件。

`_updateDOMChildren()` 用于处理`children`部分的更新， 这部分的逻辑相对复杂，也是`diff`算法的优化点所在。
注：下面的说明中，以名称中含`'children'`来标识 集合，`'child'`指代 集合项。
`i.` 使用 `nextChildrenVDoms` 数据生成新的`nextChildrenComponent`；
`DomComponent`在初始化流程中，`_mountComponent()`函数会将组件集合保存下来，存入实例的`_renderedChildrenComponent`属性中， 通过遍历该属性，可以取得`childComponent`实例上的`_vDom`；
使用`vDom`来生成标识索引`key`，并以`childComponent`作为索引值，生成`childrenComponent`的`Map`结构； （对于`Compotite`类型，使用`vDom.key`作为标识索引`key`； 对于`Text`和`Dom`类型，使用`childComponent`在`childrenComponent`中所处的索引位置作为标识索引`key)`；
使用`nextChildrenVDoms`生成新`nextChildrenComponent`的`Map`结构； 在遍历`vDom`集合的过程中，会使用上面的标识索引`key`生成规则，来进行判定，看是复用之前的组件实例触发更新，还是创建一个新的组件；
`ii.` 经过上面一步得到`Map`结构的`prevChildren`和`nextChildren`之后， 会使用深度遍历算法，递归地比对树结构中，相同层级和位置的两个组件，将差异点保存为特定的`diff`标识结构，存入`diffQueue`队列中；
`iii.` 遍历`diffQueue`，按照差异的类型，完成最终`HTML DOM`的变动；
首先是`_updateDOMChildren()`里的的定义。由于在递归组件树的节点时，存在多次触发`_updateDOMChildren()`的情况； 因此使用`_updateDepth`变量，在比对操作前`+1`，完成后`-1`，来判定整个树的更新是否全部完成，继而调用`_patch()`完成`HTML DOM`的更新；

下面的`_diff()`中，实现了更新步骤中的`1` 和`2`。

值得注意的是`_diff`过程中`lastIndex`变量的作用，其记录在遍历过程中，每次访问到的`prevChildrenComponent`中位置最靠后的组件，这是组件更新的一种排序上面的优化策略，可以参见这一篇文章当中的详细介绍：不可思议的`react diff`。
在计算出`diffQueue`的差异队列后，在`_patch()`函数中完成最终`HTML DOM`的更新：

**总结**
至此，我们实现了一个简易版本的`React`框架，完成了组件类的定义、初始化及更新； 并且梳理了核心`diff`算法。
下面简单做一下总结：
组件分为`3`种类型来处理组件的初始化渲染和更新：`TextComponent`、`DomComponent`和

```
CompositeComponent;
virtualDom
```

对象中，记录了组件类型`type`，唯一标识`key`和属性集合`props`；
组件是由`virtual Dom`创建而来，`vDom`上的`type`和`key`用来标识组件实例的唯一性；
`diff`算法的核心，是对比新旧`vDom`对象，来完成部分组件实例的复用，并加入了排序优化策略。 通过`javascript`大量计算的代价，来换取减少页面`DOM`重排的消耗，从而提高了渲染性能。
 \> 来自

```
 <https://baijiahao.baidu.com/s?id=1624051300359101116&wfr=spider&for=pc>
```

:::
