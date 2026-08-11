---
title: "React的事件系统是怎么运作起来的？"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "核心概念与组件"
description: "事件绑定 我们来看一下我们在 JSX 中写的 是怎么被记录到 DOM 结点上，并且在 document 上做监听的。 React 对于大部分事件的绑定都是使用 trapBubbledEvent 和 trapCapturedEvent 这两个函数来注册的。如上图所示，当我们执行了。"
sidebarWeight: 53
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/事件处理/React的事件系统是怎么运作起来的？.md"
---
::: v-pre

# React的事件系统是怎么运作起来的？

> 本节目标：理解“React的事件系统是怎么运作起来的？”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
**事件绑定**
我们来看一下我们在`JSX`中写的

```
onClickhandler
```

是怎么被记录到`DOM`结点上，并且在`document`上做监听的。

`React`对于大部分事件的绑定都是使用`trapBubbledEvent`和`trapCapturedEvent`这两个函数来注册的。如上图所示，当我们执行了`render`或者`setState`之后，`React`的`Fiber`调度系统会在最后`commit`到`DOM`树之前执行`trapBubbledEven`或`trapCapturedEvent`， 通过执行`addEventListener`在`document`结点上绑定对应的`dispatch`作为`handler`负责监听类型为`topLevelType`的事件。
这里面的`dispatchInteractiveEvent`和`dispatchEvent`两个回调函数的区别为，`React16`开始换掉了原本`Stack Reconciliation`成`Fiber`希望实现异步渲染（目前仍未默认打开，仍需使用`unstable_`开头的`api`，此特性与例子`2`有关，将在[文章最后配图解释](https://juejin.im/post/5bdf0741e51d456b8e1d60be#%E9%A2%9D%E5%A4%96%E5%A4%9A%E8%AF%B4%E4%B8%80%E4%B8%AA%E7%82%B9-setstate%E6%98%AF%E5%BC%82%E6%AD%A5%E7%9A%84)），所以异步渲染的情况下加入我点了两次按钮，那么第二次按钮响应的时候，可能第一次按钮的`handlerA`中调用的`setState`还未最终被`commit`到`DOM`树上，这时需要把第一次按钮的结果先给`flush`掉并`commit`到`DOM`树，才能够保持一致性。这个时候就会用到`dispatchInteractiveEvent`。可以理解成`dispatchInteractiveEvent`在执行前都会确保之前所有操作都已最总`commit`到`DOM`树，再开始自己的流程，并最终触发`dispatchEvent`。但由于目前`React`仍是同步渲染的，所以这两个函数在目前的表现是一致的，希望`React17`会带给我们默认打开的异步渲染功能。
到现在我们已经在`document`结点上监听了事件了，现在需要来看如何将我们在`jsx`中写的`handler`存起来对应到相应的结点上。
在我们每次新建或者更新结点时，`React`最终会调用`createInstance`或者`commitUpdate`这两个函数，而这两个函数都会最终调用`updateFiberProps`这个函数，将`props`也就是我们的`onClick`，`onChange`等`handler`给存到`DOM`结点上。
至此，我们我们已经在`document`上监听了事件，并且将`handler`存在对应`DOM`结点。接下来需要看`React`怎么监听并处理浏览器的原生事件，最终触发对应的`handler`了。
**事件触发**
这里我做了个[动画](https://www.lzane.com/tech/react-event-system-and-source-code/#%E4%BA%8B%E4%BB%B6%E8%A7%A6%E5%8F%91)，希望能够对你们理解有帮助。点击绿色的按钮`\>`播放下一步。
抱歉需要插入链接，掘金不允许插入`iframe`。
以简单的`click`事件为例，通过事件绑定我们已经在`document`上监听了`click`事件，当我们真正点击了这个按钮的时候，原生的事件是如何进入`React`的管辖范围的？如何合成`SyntheticEvent`以及如何模拟捕获和冒泡的？以及最后我们在`jsx`中写的

```
onClickhandler
```

是如何被最终触发的？带着这些问题，我们一起来看一下事件触发阶段。
我会大概用下图这种方式来解析代码，左边是我点击一个绑定了`handleClick`的按钮后的`js`调用栈，右边是每一步的代码，均已删除部分不影响理解的代码。希望通过这种方式能使大家更易理解`React`的事件触发机制。

当我们点击一个按钮是，`click`事件将会最终冒泡至`document`，并触发我们监听在`document`上的`handler` `dispatchEvent`，接着触发`batchedUpdates`。`batchedUpdates`这个格式的代码在`React`的源码里面会频繁的出现，基本上`React`将所有能够**批量处理**的事情都会先收集起来，再一次性处理。
可以看到默认的`isBatching`是`false`的，当调用了一次`batchedUpdates`，`isBatching`的值将会变成`true`，此时如果在接下来的调用中有继续调用`batchedUpdates`的话，就会直接执行

```
handleTopLevel,
```

此时的`setState`等不会被更新到`DOM`上。直到调用栈重新回到第一次调用`batchedUpdates`的时候，才会将所有结果一起`flush`掉（更新到`DOM`上）。

有的同学可能问调用栈中的`BatchedUpdates$1`是什么？或者浏览器的`renderer`和`Native`的`renderer`是如果挂在到`React`的事件系统上的`?`
其实`React`事件系统里面提供了一个函数`setBatchingImplementation`，用来动态挂载不同平台的`renderer`，这个也体现了`React`事件系统的复用。
这里的`interactiveUpdates`和`batchedUpdates`的区别在上文已经解释过，这里就不再赘述。

`handleTopLevel`会调用`runExtractedEventsInBatch()`，这是`React`事件处理最重要的函数。如上面动画我们看到的，在`EventEmitter`里面做的事，其实主要就是这个函数的两步。

- **第一步是根据原生事件合成合成事件，并且在**`vDOM`**上模拟捕获冒泡，收集所有需要执行的事件回调构成回调数组。**
- **第二步是遍历回调数组，触发回调函数。**

首先调用`extractEvents`，传入原生事件`e`，`React`事件系统根据可能的事件插件合成合成事件`Synthetic e`。 这里我们可以看到调用了`EventConstructor.getPooled()`，从事件池中去取一个合成事件对象，如果事件池为空，则新创建一个合成事件对象，这体现了`React`为了性能实现了**池**的思想。

然后传入`Propagator`，在`vDOM`上模拟捕获和冒泡，并收集所有需要执行的事件回调和对应的结点。`traverseTwoPhase`模拟了捕获和冒泡的两个阶段，这里实现很巧妙，简单而言就是正向和反向遍历了一下数组。接着对每一个结点，调用`listenerAtPhase`取出事件绑定时挂载在结点上的回调函数，把它加入回调数组中。

接着遍历所有合成事件。这里可以看到当一个事件处理完的时候，`React`会调用`event.isPersistent()`来查看这个合成事件是否需要被持久化，如果不需要就会释放这个合成事件，这也就是为什么当我们需要异步读取操作一个合成事件的时候，需要执行`event.persist()`，不然`React`就是在这里释放掉这个事件。

最后这里就是回调函数被真正触发的时候了，取出回调数组`event._dispatchListeners`，遍历触发回调函数。并通过`event.isPropagationStopped()`这一步来模拟停止冒泡。这里我们可以看到，`React`在收集回调数组的时候并不会去管我们是否调用了`stopPropagation`，而是会在触发的阶段才会去检查是否需要停止冒泡。
至此，一个事件回调函数就被触发了，里面如果执行了`setState`等就会等到调用栈弹回到最低部的`interactiveUpdate`中的被最终`flush`掉，构造`vDOM`，和好，并最终被`commit`到`DOM`上。
这就是事件触发的整个过程了，可以回去再看一下[动画](https://juejin.im/post/5bdf0741e51d456b8e1d60be#%E4%BA%8B%E4%BB%B6%E8%A7%A6%E5%8F%91)，相信你会更加理解这个过程的。
**例子**`Debug`
现在我们对`React`事件系统已经比较熟悉了，回到文章开头的那两个玄学问题，我们来看一下到底为什么`?`
**例子一**
如果想看题目内容或者忘记题目了，可以点击[这里](https://juejin.im/post/5bdf0741e51d456b8e1d60be#%E4%BE%8B%E5%AD%90%E4%B8%80)查看。
相信看完这篇文章，如果你已经对`React`事件系统有所理解，这道题应该是不难了。

1. 因为`React`事件监听是挂载在`document`上的，所以原生系统在`#outer`上监听的回调`C`会最先被输出；接着原生事件冒泡至`document`进入`React`事件系统，`React`事件系统模拟捕获冒泡输出`A`和`B`；最后`React`事件系统执行完毕回到浏览器继续冒泡到`window`，输出`D`。
2. 原生系统在`#outer`上监听的回调`C`会最先被执行；接着原生事件冒泡至`document`进入`React`事件系统，输出`A`，在`React`事件处理中`#inner`调用了`stopPropagation`，事件被停止冒泡。

所以，最好**不要混用**`React`**事件系统和原生事件系统**，如果混用了，请保证你清楚知道会发生什么。

**例子二**
如果想看题目内容或者忘记题目了，可以点击[这里](https://juejin.im/post/5bdf0741e51d456b8e1d60be#%E4%BE%8B%E5%AD%90%E4%BA%8C)查看。
这个问题就稍微复杂一点。首先我们点击`edit`按钮浏览器触发一个`click`事件，冒泡至`document`进入`React`事件系统，`React`执行回调调用`setState`，此时`React`事件系统对事件的处理执行完毕。由于目前`React`是同步渲染的，所以接着`React`执行`performSyncWork`将该`button`改成`type="submit"`，由于同个位置的结点并且`tag`都为`button`，所以`React`复用了这个`button`结点`(`[具体原因可以参考](https://reactjs.org/docs/reconciliation.html#motivation)`)`并更新到`DOM`上。此时浏览器对`click`事件处理执行继续，发现该结点的`type="submit"`，又在`form`下面，则对应触发`submit`事件。
解决的办法就有很多种了，给`button`加上`key`；两个按钮分开写，不要用三元等都可以解决问题。
具体可以看一下下面的这个调用图，应该也很好理解，如果有不能理解的地方，请在下面留言，我会尽我所能解释清楚。

**额外多说一个点，“**`setState`**是异步的”**
相信对于很多`React`开发者来说，“`setState`是异步的”这句话应该经常听到，我记得我一开始学习`React`的时候经常就会看到这句话，然后说如果需要用到之前的`state`需要在`setState`中采用`setState((preState)=\>{})`这样的方式。
但其实这句话并不是完全准确的。准确的说法应该是`setState`**有时候是异步的，**`setState`**相对于浏览器而言是同步的**
目前而言`setState`在生命周期以及事件回调中是异步的，也就是会收集起来批量处理。在其它情况下如`promise`，`setTimeout`中都是同步执行的，也就是调用一次`setState`就会`render`一次并更新到`DOM`上面，不信的话可以点击[这里](https://codesandbox.io/s/pyqmrx516x)尝试。
且在`JS`调用栈被弹空时候，必定是已经将结果更新到`DOM`上面了（同步渲染）。这也就是`setState`相对于浏览器是同步的含义。如下图所示

异步渲染的流程图大概如下图所示，最近一次思考这个问题的时候，发现如果现在是异步渲染的话，那我们的例子二将变成偶现的坑😂，因为如果`setState`的结果还没被更新到`DOM`上，浏览器就不会触发`submit`事件。
不过`React`团队已经为异步渲染的愿景开发了两年，且`React16`中已经采用了`Fiber reconciliation`和提供了异步渲染的`api` `unstable_xxx`，相信在`React17`中我们可以享受到异步渲染带来的性能提升，感谢`React`团队。
**总结**
希望读完此文，能让你`React`事件系统有个简单的认识。知道“为什么`React`需要自己实现一套事件系统？”和“`React`的事件系统是怎么运作起来的？”。`React`为了**性能**和**复用**，采用了事件代理，池，批量更新，跨浏览器和跨平台兼容等思想，将事件监听挂载在`document`上，并且构造合成事件，并且在内部模拟了一套捕获和冒泡并触发回调函数的机制，实现了自己一套事件系统。
如果你还有哪里不清楚，发现文章有错漏，或是单纯的交流相关问题，请在下面留言，我会尽我所能回复和解答你的疑问的。 如果你喜欢我的文章，请关注我和[我的博客](https://www.lzane.com/)，谢谢。
`Read More & Reference`

- [推荐！](https://www.youtube.com/watch?v=dRo_egw7tBc&t=8s)`React events in depth w/ Kent C. Dodds, Ben Alpert, & Dan Abramov`
- [推荐！](https://levelup.gitconnected.com/how-exactly-does-react-handles-events-71e8b5e359f2)`The React and React Native Event System Explained: A Harmonious Coexistence`
- ```
    Didact Fiber: Incremental reconciliation
    ```

- ```
    Codebase Overview
    ```

 \> 来自

```
 <https://juejin.im/post/5bdf0741e51d456b8e1d60be>
```

:::
