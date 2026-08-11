---
title: "setState方法"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试复习"
description: "\\ 来自。"
sidebarWeight: 39
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/面试要点/setState方法/setState方法.md"
---
::: v-pre

# setState方法

> 本节目标：理解“setState方法”的核心思路，并能把它用于实际开发或面试表达。
```
这个方法接受两个参数
```

```
第一个参数类型为Object|Function；
```

```
第二个参数可选，类型为Function
```

```
第一个参数的两种传参方法
一、传入新的 ==state== 对象
出于性能考虑，会对多次state对象进行合并，类似于Object.assign()方法，后面对象的同名属性会覆盖前面的。
this.setState({
    age: 2,
}
```

```
二、传入回调函数，并在回调函数里面返回新的 ==state== 对象。此方式调用一次后，后面再用此方法setState时就可以取到上一次更新之后的state值。
this.setState((prevState, props) => {
    return {
        age: prevState.age + props.age,
    };
});
```

```
**注意：**出于性能方面的考虑，React 可以将多次的 setState() 调用合并为一次
import * as React from 'react';
const { PureComponent, Fragment } = React;
class Test extends PureComponent {
    state = {
        age: 0
    }
    render() {
        return (
            <Fragment>
                <button onClick={this.doClick}>Pass in an object</button>
                <button onClick={this.doClick2}>Pase in a function</button>
                <p>age: {this.state.age}</p>
            </Fragment>
        );
    }
    doClick = () => {
        this.setState({
            age: this.state.age + 1
        });
        if (true) {
            this.setState({
                age: this.state.age + 1
            });
        }
    }
    doClick2 = () => {
        this.setState((prevState, props) => {
            return {
                age: prevState.age + 1
            }
        });
        if (true) {
            this.setState((prevState, props) => {
                return {
                    age: prevState.age + 1
                }
            });
        }
    }
}
export default Test
在上面的这个示例中，若点击按钮 Pass in an object ， ==render== 中的 age 部分的显示结果为：
==age: 1==
```

```
若点击按钮 Pass in an function ， ==render== 中的 age 部分的显示结果为：
==age: 2==
```

```
**分析**
如果一个函数中调用了多次 ==setState== 方法，且传入的是一个新的 ==state== 对象，那么 React 出于性能方面的考虑，并不会直接对每次的调用都进行更新，而是会将多次传入的对象进行合并处理，以产生一个新的最终的 ==state== 对象，这种合并类似于：
const newState = Object.assign(
    {},
    state0,
    state1,
    state2
);
然后再将得到的 =="newState"== 通过调用 ==setState== 方法进行更新，所以，如果多次调用 ==setState== 方法时传入的对象有相同的 ==key==，那么最后一次调用时所传入的对象的那个 ==key== 的值将成为最终的更新值，在最后一次调用前的值都将被覆盖。
在上面的 ==doClick2== 方法中，调用了两次 ==setState== 方法，不同的是，传入的不是对象，而是函数，函数里面传入了两个参数，即上一次更新的 ==state== 和当前的 ==props== ，这样在第二次调用 ==setState== 方法时便可以通过 ==prevState.age== 拿到最新的值从而更新本次的 ==state== 。
显然，React 对于传入函数的方式和传入对象的方式进行更新 ==state== 的各自具体理念是不一样的，对于传入函数的方式，在调用 ==setState== 进行更新 ==state== 时，React 会按照各个 ==setState== 的调用顺序，将它们依次放入一个队列，然后，在进行状态更新时，则按照队列中的先后顺序依次调用，并将上一个调用结束时产生的 ==state== 传入到下一个调用的函数中，当然，第一个 ==setState== 调用时，传入的 ==prevState== 则是当前的 ==state== ，如此，便解决了传入对象式调用 ==setState== 方法所存在的不能依赖上一次的 ==state== 去计算本次 ==state== 的问题。
思考一下，在使用传入函数的方式进行状态更新时，可以在该函数内使用 ==this.state== 拿到最新的状态信息吗？比如这样：
doClick2 = () => {
    this.setState((prevState, props) => {
        return {
            age: prevState.age + 1
        }
    });
    if (true) {
        this.setState((prevState, props) => {
            return {
                age: this.state.age + 1
            }
        });
    }
}
结果是什么？是这样的：1实际上，函数里面 ==this.state.age== 的值为 ==0== 。为什么在使用函数式 ==setState== 进行状态更新后，在后一个里面还是不能通过 ==this.state.age== 拿到最新的值？React 源码中关于 ==setState== 部分有这样一段说明：==When a function is provided to setState, it will be called at some point in========the future (not synchronously). It will be called with the up to date========component arguments (state, props, context). These values can be different========from this.* because your function may be called after receiveProps but before========shouldComponentUpdate, and this new state, props, and context will not yet be========assigned to this.======
结合上面的说明，也就是说，在上面的这段代码中，执行第二个 ==setState== 里面的函数时，由第一个 ==setState== 所产生的最新的 ==state== 并没有合并到 ==this== 对象上面去，所以此时通过 ==this== 获取不到最新的状态，故而拿到 ==this.state.age== 的值为 ==0== 而非 ==1== 。
**此外**
==setState== 方法还提供一个可选的参数 ==callback== ，即一个回调函数，会在当前调用 ==setState== 方法更新状态后进行调用。
```

\> 来自

```
 <https://blog.csdn.net/Mr_28/article/details/84778001>
```

:::
