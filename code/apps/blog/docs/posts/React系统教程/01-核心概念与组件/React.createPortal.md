---
title: "React.createPortal"
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
description: "可以发现，在父组件里捕获一个来自 Portal 的事件冒泡很简单，在开发时不需要完全依赖于 Portal ，对于时间的捕获更加的灵活。 \\ 来自 \\<http://www.ptbird.cn/react portal createPortal.html\\。"
sidebarWeight: 5
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/新特性/React.createPortal.md"
---
::: v-pre

# React.createPortal

> 本节目标：理解“React.createPortal”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
 **及 Modal 的新实现方式**
[评论：0](http://www.ptbird.cn/react-portal-createPortal.html#comments) _·_ [阅读：8960](http://www.ptbird.cn/react-portal-createPortal.html)_·_ 喜欢：2
```

```
[一、描述](http://www.ptbird.cn/react-portal-createPortal.html#menu_index_1)
```

```
[二、之前的 Modal 组件](http://www.ptbird.cn/react-portal-createPortal.html#menu_index_2)
```

- ```
    [三、 createProtal 改造 Modal 组件：](http://www.ptbird.cn/react-portal-createPortal.html#menu_index_3)
    ```

    ```
    [1、html 预留容器](http://www.ptbird.cn/react-portal-createPortal.html#menu_index_4)
    ```

    ```
    [2、改造 Modal 容器](http://www.ptbird.cn/react-portal-createPortal.html#menu_index_5)
    ```

    ```
    [3、Modal 组件的内容](http://www.ptbird.cn/react-portal-createPortal.html#menu_index_6)
    ```

    ```
    [4、使用 Modal 容器组件和内容组件](http://www.ptbird.cn/react-portal-createPortal.html#menu_index_7)
    ```

    ```
    [5、效果](http://www.ptbird.cn/react-portal-createPortal.html#menu_index_8)
    ```

```
==一、描述==
==一般使用 React 的组件都是挂到父组件的== ==this.props.children== ==上面，总是被最近的父组件所捕获，最终到 React 根组件上。==
==而 Protals 则提供了一种将组件直接挂载到直接父组件 DOM 层次之外的一类方式。==
==react-dom== ==提供的具体方法是== ==ReactDOM.createPortals(child, container)====，这个方法需要两个参数，第一个参数是需要挂载的组件实例，而第二个参数则是要挂载到的DOM节点。一般来说第一个参数可能传递的是需要挂载的== ==this.props.children==
==二、之前的 Modal 组件==
==以一个 Modal 弹窗举例（官网也是用的这个例子）。==
==正常来说，我要创建一个 Modal 组件，可以按照下面这么写：==
==const== ==styles== ===== =={======  ==modal====:== =={======    ==position====:== =='fixed'====,======    ==top====:== ==0====,======    ==left====:== ==0====,======    ==right====:== ==0====,======    ==bottom====:== ==0====,======    ==backgroundColor====:== =='rgba(0,0,0,0.3)'====,======    ==display====:== =='flex'====,======    ==justifyContent====:== =='center'====,======    ==alignItems====:== =='center'======  ==}========}======
==class== ==Modal== ==extends== ==Component== =={======  ==constructor====(props)== =={======    ==super====(====props====);======  ==}======  ==render====()== =={======    ==return== ==(======      ==<====div style========={====styles====.====modal====}====>======        =={====this====.====props====.====children====}======      ==</====div====>======    ==);======  ==}========}==
==而使用的时候直接引入并且写子组件即可：==
==<====div className========="App"====>======        ==<====Modal====>======          ==<====h1====>====Modal====</====h1====>======        ==</====Modal====>====== ==</====div====>==
==最终的效果如下：==
```

```
==Modal 的组件实例这种实现方式也可以，这里的突破方式其实就是直接将 Modal 组件位置进行== ==fixed== ==定位。==
==但是更多时间如果父组件容器存在== ==overflow: hidden== ==或者存在== ==z-index== ==的时候，需要在视觉上突破父组件的容器，使用 createPortal 更好一些，因为他可以随便将组件挂到任何的 DOM 下。==
==三、== ==createProtal== ==改造 Modal 组件：==
==1、html 预留容器==
==在 html 中除了== ==div#root== ==之外，给 Modal 预留了一个新的== ==div#modal-root====，：==
==const== ==appRoot== ===== ==document====.====getElementById====(===='root'====);========const== ==modalRoot== ===== ==document====.====getElementById====(===='modal-root'====);==
==为了突出== ==div#root== ==容器宽度高度很小，并且== ==overflow:hidden====，给== ==div#root====一个样式：==
==#root== =={======  ==height====:== ==10====em====;======  ==width====:== ==10====em====;======  ==background====:== ==lightblue====;======  ==overflow====:== ==hidden====;========}==
==2、改造 Modal 容器==
==新的 Modal 容器组件内容如下：==
==class== ==ModalContainer== ==extends== ==Component== =={======  ==constructor====(props)== =={======    ==super====(====props====);======    ==this====.====el== ===== ==document====.====createElement====(===='div'====);======  ==}======  ==componentDidMount====()== =={======    ==modalRoot====.====appendChild====(====this====.====el====);======  ==}======  ==componentWillUnmount====()== =={======    ==modalRoot====.====removeChild====(====this====.====el====);======  ==}======  ==render====()== =={======    ==return== ==ReactDOM====.====createPortal====(======      ==this====.====props====.====children====,======      ==this====.====el======    ==);======  ==}========}==
==因为需要保证 ModalContainer 始终保持在最上层，不会被其他 z-index 覆盖掉，因此需要给== ==div#modal-root== ==一个样式：==
==#modal-root== =={======  ==position====:== ==relative====;======  ==z-index====:== ==999====;========}======
==3、Modal 组件的内容==
==上面只是 Modal 的容器组件，最主要的作用就是将== ==this.props.children== ==挂载到组件外部去（====div#modal-root====）==
==需要创建 Modal 需要显示的内容组件：==
==#modal====-====root== =={======  ==position====:== ==relative====;======  ==z====-====index====:== ==999====;========}==
==4、使用 Modal 容器组件和内容组件==
==将 ModalContent 挂载到 ModalContainer 中即可：==
==class== ==App2== ==extends== ==Component== =={======  ==state== ===== =={======    ==name====:== =='clickme'======  ==}======  ==componentDidMount====(){======    ==// console.log(findDOMNode(ref.current))======  ==}======  ==clickHandle== ===== ==()== ===>== =={======    ==this====.====setState====({======      ==name====:== =='clickme'== ==+== ==Date====.====now====()======    ==});======  ==}========render====()== =={======  ==return== ==(== ====      ==<====div className========="App"====>======        ==<====ModalContainer====>======          ==<====ModalContent== ==/>======        ==</====ModalContainer====>======      ==</====div====>======  ==);========}========}==
==5、效果==
==可以发现，即使主组件是== ==overflow:hidden== ==的，但是 modal 能够正常出现，同时，因为== ==div#modal-root== ==是== ==z-index: 999====，因此会置于最上层。==
```

==可以发现，在父组件里捕获一个来自 Portal 的事件冒泡很简单，在开发时不需要完全依赖于 Portal ，对于时间的捕获更加的灵活。==
 \> 来自 \<[http://www.ptbird.cn/react-portal-createPortal.html](http://www.ptbird.cn/react-portal-createPortal.html)\>

:::
