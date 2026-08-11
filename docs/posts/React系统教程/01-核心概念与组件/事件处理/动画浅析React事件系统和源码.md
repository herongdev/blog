---
title: "动画浅析React事件系统和源码"
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
description: "本文通过对 React 事件系统和源码进行浅析，回答 “为什么 React 需要自己实现一套事件系统？” “ React 的事件系统是怎么运作起来的？”两个问题。 React为了性能和复用，采用了事件代理，池，批量更新，跨浏览器和跨平台兼容等思想，将事件监听挂载在document。"
sidebarWeight: 55
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/事件处理/动画浅析React事件系统和源码.md"
---
::: v-pre

# 动画浅析React事件系统和源码

> 本节目标：理解“动画浅析React事件系统和源码”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
本文通过对`React`事件系统和源码进行浅析，回答

- “为什么`React`需要自己实现一套事件系统？”
- “`React`的事件系统是怎么运作起来的？”两个问题。

React为了性能和复用，采用了事件代理，池，批量更新，跨浏览器和跨平台兼容等思想，将事件监听挂载在document上，构造合成事件，并且在内部模拟了一套捕获和冒泡并触发回调函数的机制，实现了自己的一套事件系统。

- 如果你只有几分钟，建议你直接看[动画部分](https://www.lzane.com/tech/react-event-system-and-source-code/#%E4%BA%8B%E4%BB%B6%E8%A7%A6%E5%8F%91)。
- 如果你有半个小时，你可以按顺序往下阅读，忽略源码部分。
- 如果你对`React`事件系统有较大的兴趣，那么推荐你`clone`一份`React`的源码`(`本文列举的源码来自

    ```
    v16.5.0),
    ```

    然后按照顺序依次往下阅读。

**开始**
最近在使用`React`对项目前端进行重构的时候，自己和同事遇到了一些奇怪的问题。所以花了一些时间对`React`源码进行了研究，此篇的主题为`React`事件系统，尽量剔除复杂的技术细节，希望能以简单直观的方式回答两个问题，分别是`**`“为什么`React`需要自己实现一套事件系统？”**和**“`React`的事件系统是怎么运作起来的？”`**`。
`Stuff can sometimes get surprisingly messy if you don`’`t know how it` `works`…
**两个简单的例子**
**例子一**

1. 根据下面代码，点击按钮之后，输出结果会是什么？`(ABCD`排序`)`
2. 如果我把`innerClick`中的`e.stopPropagation()`加上，输出结果又会是什么？`(ABCD`排序`)`

```
class App extends React.Component {
  innerClick = e => {
    console.log("A: react inner click.");
    // e.stopPropagation();
  };
  outerClick = () => {
    console.log("B: react outer click.");
  };
  componentDidMount() {
    document
      .getElementById("outer")
      .addEventListener("click", () => console.log("C: native outer click"));
    window.addEventListener("click", () =>
      console.log("D: native window click")
    );
  }
  render() {
    return (
      <div id="outer" onClick={this.outerClick}>
        <button id="inner" onClick={this.innerClick}>
          BUTTON
        </button>
      </div>
    );
  }
}
正确答案是`(`防止你们偷看，请向左滑动 `<`—— `)`：

```
                                                                                            1.                                                                                                 C: native outer click                                                                                                 A: react inner click.                                                                                                 B: react outer click.                                                                                                 D: native window click                                                                                             2.                                                                                                C: native outer click                                                                                                 A: react inner click.
```
 例子二
一个表单，预期为需要点击按钮`edit`之后才可以进行编辑，并且此时`Edit`按钮变为`submit`按钮，点击`submit`按钮提交表单。代码如下
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false
    };
  }
  handleClick = () => {
    console.log("edit button click!!");
    this.setState({ editable: true });
  };
  handleSubmit = e => {
    console.log("submit event!!");
    e.preventDefault(); //避免页面刷新
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.editable ? (
          <button type="submit">submit</button>
        ) : (
            <button type="button" onClick={this.handleClick}>edit</button>
          )}
      </form>
    );
  }
}
```

但实际上我们发现，点击`edit`按钮的时候就已经触发`form`的`submit`事件了。为什么我们点击了一个`type="button"`的按钮会触发`submit`事件呢？
带着对这两个例子的思考，我们进入到本文的主题。[我只想直接看答案？](https://juejin.im/post/5bdf0741e51d456b8e1d60be#%E4%BE%8B%E5%AD%90debug)
`React`**为什么要自己实现一个事件系统？**

我认为这个问题主要是为了**性能**和**复用**两个方面来考虑。
首先对于性能来说，`React`作为一套`View`层面的框架，通过渲染得到`vDOM`，再由`diff`算法决定`DOM`树那些结点需要新增、替换或修改，假如直接在`DOM`结点插入原生事件监听，则会导致频繁的调用`addEventListener`和`removeEventListener`，造成性能的浪费。所以`React`采用了**事件代理**的方法，对于大部分事件而言都在`document`上做监听，然后根据`Event`中的`target`来判断事件触发的结点。`(`除了少数不会冒泡到`document`的事件，例如`video`等。`)`
其次`React`合成的`SyntheticEvent`采用了**池**的思想，从而达到节约内存，避免频繁的创建和销毁事件对象的目的。这也是如果我们需要异步使用一个`syntheticEvent`，需要执行`event.persist()`才能防止事件对象被释放的原因。
最后在`React`源码中随处可见`batch`做**批量更新**，基本上凡是可以批量处理的事情（最普遍的`setState`）`React`都会将中间过程保存起来，留到最后面才`flush`掉。就如浏览器对`DOM`树进行`Style`，`Layout`，`Paint`一样，都不会在操作`ele.style.color='red';`之后马上执行，只会将这些操作打包起来并最终在需要渲染的时候再做渲染。

```
ele.style.color='red'; ele.style.color='blue';ele.style.color='red';
```

浏览器只会渲染一次``
而对于复用来说，`React`看到在不同的浏览器和平台上，用户界面上的事件其实非常相似，例如普通的`click`，`change`等等。`React`希望通过封装一层事件系统，将不同平台的原生事件都封装成`SyntheticEvent`。

- 使得**不同平台只需要通过加入**`EventEmitter`**以及对应的**`Renderer`**就能使用相同的一个事件系统**，`WEB`平台上加入`ReactBrowserEventEmitter`，`Native`上加入`ReactNativeEventEmitter`。如下图，对于不同平台，`React`只需要替换掉左边部分，而右边`EventPluginHub`部分可以保持复用。
- 而**对于不同的浏览器而言，**`React`**帮我们统一了事件，做了浏览器的兼容**，例如对于

    ```
    transitionEnd,webkitTransitionEnd,MozTransitionEnd
    ```

    和

    ```
    oTransitionEnd, React
    ```

    都会集合成`topAnimationEnd`，所以我们只用处理这一个标准的事件即可。

简单而言，就与`jQuery`帮助我们解决了不同浏览器之间的兼容问一样，`React`更进一步，还帮我们统一了不同平台的兼容，使我们在开发的时候只需要考虑标准化的事件即可。

:::
