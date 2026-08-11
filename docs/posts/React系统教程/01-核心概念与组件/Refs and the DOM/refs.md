---
title: "refs"
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
description: "Refs 提供了一种方式，用于访问在 render 方法中创建的 DOM 节点或 React 元素。 在典型的 React 数据流中 属性（ props ）是父组件与子组件交互的唯一方式。要修改子组件，你需要使用新的 props 重新渲染它。但是，某些情况下你需要在典型数据流外强。"
sidebarWeight: 38
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/Refs and the DOM/refs.md"
---
::: v-pre

# refs

> 本节目标：理解“refs”的核心思路，并能把它用于实际开发或面试表达。
`Refs` 提供了一种方式，用于访问在 `render` 方法中创建的 `DOM` 节点或 `React` 元素。

在典型的 `React` 数据流中

```
,
```

[属性（](https://react.docschina.org/docs/components-and-props.html)`props`）是父组件与子组件交互的唯一方式。要修改子组件，你需要使用新的 `props` 重新渲染它。但是，某些情况下你需要在典型数据流外强制修改子组件。要修改的子组件可以是 `React` 组件的实例，也可以是 `DOM` 元素。

下面是几个适合使用 `refs` 的情况：

- 处理焦点、文本选择或媒体控制。
- 触发强制动画。
- 集成第三方 `DOM` 库

==如果可以通过声明式实现，则尽量避免使用== `refs`==。==
例如，不要在

```
 Dialog
```

组件上直接暴露

```
 open()
```

和

```
 close()
```

方法，最好传递

```
 isOpen
```

属性。

**不要过度使用** `Refs`
你可能首先会想到在你的应用程序中使用 `refs` 来更新组件。如果是这种情况，请花一点时间，重新思考一下 `state` 属性在组件层中位置。通常你会想明白，提升 `state` 所在的组件层级会是更合适的做法。有关示例，请参考[状态提升](https://react.docschina.org/docs/lifting-state-up.html)`.`

**创建** `Refs`
使用

```
 React.createRef()
```

创建 `refs`，通过

```
 ref
```

属性来获得 `React` 元素。当构造组件时，`refs` 通常被赋值给实例的一个属性，这样你可以在组件中任意一处使用它们

```
.
class MyComponent extends React.Component {  constructor(props) {    super(props);    this.myRef = React.createRef();  }  render() {    return <div ref={this.myRef} />;  }}
```
 **访问** `Refs`
当一个 `ref` 属性被传递给一个

```
 render
```

函数中的元素时，可以使用 `ref` 中的

```
 current
```

属性对节点的引用进行访问。

```
const node = this.myRef.current;
```

`ref`的值取决于节点的类型`:`

- 当

    ```
     ref
    ```

    属性被用于一个普通的 `HTML` 元素时，

    ```
    React.createRef()
    ```

    将接收底层 `DOM` 元素作为它的

    ```
     current
    ```

    属性以创建

    ```
     ref
    ```

    。
- 当

    ```
     ref
    ```

    属性被用于一个自定义类组件时，

    ```
    ref
    ```

    对象将接收该组件已挂载的实例作为它的

    ```
     current
    ```

    。
- **你不能在函数式组件上使用**

    ```
     ref
    ```

    **属性**，因为它们没有实例。

下面的例子说明了这些差异。
为 `DOM` 元素添加 `Ref`
以下代码使用

```
 ref
```

存储对 `DOM` 节点的引用：

```
class CustomTextInput extends React.Component {  constructor(props) {    super(props);    //
```

创建 `ref` 存储 `textInput DOM` 元素

```
    this.textInput = React.createRef();    this.focusTextInput = this.focusTextInput.bind(this);  }
focusTextInput() {    //
```

直接使用原生 `API` 使 `text` 输入框获得焦点

```
    //
```

注意：通过 `"current"` 取得 `DOM` 节点

```
    this.textInput.current.focus();  }
render() {    //
```

告诉 `React` 我们想把 `\<input\> ref` 关联到构造器里创建的 `` `textInput` `` 上

```
    return (      <div>        <input  type="text" ref={this.textInput} />                <input          type="button"          value="Focus the text input"          onClick={this.focusTextInput}        />      </div>    );  }}
React
```

会在组件加载时将 `DOM` 元素传入

```
 current
```

属性，在卸载时则会改回

```
 null
```

。

```
ref
```

的更新会发生在

```
componentDidMount
```

或

```
 componentDidUpdate
```

生命周期钩子之前。
**为类组件添加** `Ref`
如果我们想要包装上面的

```
 CustomTextInput
```

，来模拟挂载之后立即被点击的话，我们可以使用 `ref` 来访问自定义输入，并手动调用它的

```
 focusTextInput
```

方法：

```
class AutoFocusTextInput extends React.Component {  constructor(props) {    super(props);    this.textInput = React.createRef();  }
componentDidMount() {    this.textInput.current.focusTextInput();  }
render() {    return (      <CustomTextInput ref={this.textInput} />    );  }}
```
 需要注意的是，这种方法仅对

```
 class
```

声明的

```
 CustomTextInput
```

有效：

```
class CustomTextInput extends React.Component {  // ...}
```

`Refs` **与函数式组件**
**你不能在函数式组件上使用**

```
 ref
```

**属性**，因为它们没有实例：

```
function MyFunctionalComponent() {  return <input />;}
class Parent extends React.Component {  constructor(props) {    super(props);    this.textInput = React.createRef();  }  render() {    //
```

这将 `*`不会`*` 工作！

```
    return (      <MyFunctionalComponent ref={this.textInput} />    );  }}
```
 如果你想使用

```
 ref
```

，就像你想使用生命周期方法或者 `state` 一样，应该将其转换为

```
 class
```

组件。
但是，你可以在函数式组件内部使用

```
 ref
```

，只要它指向一个 `DOM` 元素或者 `class` 组件：

```
function CustomTextInput(props) {  //
```

==这里必须声明== `textInput`==，这样== `ref` ==回调才可以引用它==

```
  let textInput = null;
function handleClick() {    textInput.focus();  }
return (    <div>      <input type="text"        ref={(input) => { textInput = input; }} />      <input        type="button"        value="Focus the text input"        onClick={handleClick}      />    </div>  );  }
```

**对父组件暴露** `DOM` **节点**
在极少数情况下，你可能希望从父组件访问子节点的 `DOM` 节点。通常不建议这样做，因为它会破坏组件的封装，但偶尔也可用于触发焦点或测量子 `DOM` 节点的大小或位置。
虽然你可以[向子组件添加](https://react.docschina.org/docs/refs-and-the-dom.html#adding-a-ref-to-a-class-component) `ref`，但这不是一个理想的解决方案，因为你只能获取组件实例而不是 `DOM` 节点。并且，它还在函数式组件上无效。
如果你使用 `React 16.3` 或更高`,` 这种情况下我们推荐使用

```
 ref
```

转发。

```
 Ref
```

**转发使组件可以像暴露自己的** `ref` **一样暴露子组件的** `ref`。关于怎样对父组件暴露子组件的 `DOM` 节点，[在](https://react.docschina.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components) `ref` 转发文档 中有一个详细的例子。
如果你使用 `React 16.2` 或更低，或者你需要比 `ref` 转发更高的灵活性，你可以使用 [这个替代方案](https://gist.github.com/gaearon/1a018a023347fe1c2476073330cc5509) 将 `ref` 作为特殊名字的 `prop` 直接传递。
可能的话，我们不建议暴露 `DOM` 节点，但有时候它会成为救命稻草。注意这些方案需要你在子组件中增加一些代码。如果你对子组件的实现没有控制权的话，你剩下的选择是使用

```
 findDOMNode()
```

，但是不推荐。

**回调**

```
 Refs
React
```

也支持另一种设置 `ref` 的方式，称为“回调 `ref`”，更加细致地控制何时 `ref` 被设置和解除。
不同于传递

```
 createRef()
```

创建的

```
 ref
```

属性，你会传递一个函数。==这个函数接受== `React` ==组件的实例或== `HTML DOM` ==元素作为参数，以存储它们并使它们能被其他地方访问。==
下面的例子描述了一种通用的范例：使用

```
 ref
```

回调函数，在实例的属性中存储对 `DOM` 节点的引用。

```
class CustomTextInput extends React.Component {  constructor(props) {    super(props);
this.textInput = null;
this.setTextInputRef = element => {      this.textInput = element;    };
this.focusTextInput = () => {      //
```

==直接使用原生== `API` ==使== `text` ==输入框获得焦点==

```
      if (this.textInput) this.textInput.focus();    };  }
componentDidMount() {    //
```

渲染后文本框自动获得焦点

```
    this.focusTextInput();  }
render() {    //
```

使用 `` `ref` `` 的回调将 `text` 输入框的 `DOM` 节点存储到

```
 React    //
```

实例上（比如 `this.textInput`）

```
    return (      <div>        <input          type="text"          ref={this.setTextInputRef}        />        <input          type="button"          value="Focus the text input"          onClick={this.focusTextInput}        />      </div>    );  }}
React
```

将在组件挂载时将 `DOM` 元素传入

```
ref
```

回调函数并调用，当卸载时传入

```
 null
```

并调用它。

```
ref
```

回调函数会在

```
 componentDidMout
```

和

```
 componentDidUpdate
```

生命周期函数前被调用
你可以在组件间传递回调形式的 `refs`，就像你可以传递通过

```
 React.createRef()
```

创建的对象 `refs` 一样。

```
function CustomTextInput(props) {  return (    <div>      <input ref={props.inputRef} />    </div>  );}
class Parent extends React.Component {  render() {    return (      <CustomTextInput        inputRef={el => this.inputElement = el}      />    );  }}
```
 在上面的例子中，

```
Parent
```

传递给它的 `ref` 回调函数作为

```
 inputRef
```

传递给

```
 CustomTextInput
```

，然后

```
 CustomTextInput
```

通过

```
 ref
```

属性将其传递给

```
 <input>
```

。最终，

```
Parent
```

中的

```
 this.inputElement
```

将被设置为与

```
 CustomTextIput
```

中的

```
 <input>
```

元素相对应的 `DOM` 节点。
如果你之前使用过 `React` ，你可能了解过之前的`API`中的 `string` 类型的 `ref` 属性，比如 “`textInput`” ，你可以通过 `this.refs.textInput` 访问`DOM`节点。我们不建议使用它，因为 `String` 类型的

```
 refs
```

[存在问题](https://github.com/facebook/pull/8333#issuecomment-271648615)。它已过时并**可能会在未来的版本被移除**。如果你目前还在使用 `this.refs.textInput` 这种方式访问 `refs` ，我们建议用回调函数的方式代替。
**注意**
如果 `ref` 回调以内联函数的方式定义，在更新期间它会被调用两次，第一次参数是 `null` ，之后参数是 `DOM` 元素。这是因为在每次渲染中都会创建一个新的函数实例。因此，`React` 需要清理旧的 `ref` 并且设置新的。通过将 `ref` 的回调函数定义成类的绑定函数的方式可以避免上述问题，但是大多数情况下无关紧要。
 \> 来自

```
 <https://react.docschina.org/docs/refs-and-the-dom.html>
```

- ==受状态控制的组件，必须要有==`onChange`==方法，否则不能使用==
- ==受控组件可以赋予默认值（官方推荐使用== ==受控组件）==

表单元素的值受props或state值的控制，这时无法输入。
`\<input type='text' value={this.state.num} /\>`
在增加`onChange`事件后，可以输入，`onChange`的值必须是一个函数。
`\<input type='text' value={this.state.num} onChange={()=\>{}}/\>`

```
class Sum extends Component {
constructor() {
super();
this.state = { a: 1, b: 1 }
}
// key
```

表示的就是当前状态改的是哪一个
`// e`表示的是事件源

```
handleChange(key, e) { //
```

处理多个输入框的值映射到状态的方法

```
this.setState({
[key]: parseInt(e.target.value) || 0
})
}
render() {
return (
<div>
<input type="number" value={this.state.a} onChange={e => { this.handleChange('a', e) }} />
<input type="number" value={this.state.b} onChange={e => { this.handleChange('b', e) }} />
{this.state.a + this.state.b}
</div>
)
}
}
```

非受控组件，通过ref来标记元素，再通过this.refs对象来获取元素。
也可以通过函数来设置元素为this实例的某一属性值

```
<input type='text' ref='a' />
<input type='text' ref={x=>this.x=x} />
```

```
class Sum extends Component {
constructor() {
super();
this.state = { result: '' }
}
//
```

通过`ref`设置的属性 可以通过`this.refs`获取到对应的`dom`元素

```
handleChange = () => {
let result = this.refs.a.value + this.b.value;
this.setState({ result });
};
render() {
return (
<div onChange={this.handleChange}>
<input type="number" ref="a" />
{/*x
```

代表的真实的`dom,`把元素挂载在了当前实例上

```
*/}
<input type="number" ref={(x) => {
this.b = x;
}} />
{this.state.result}
</div>
)
}
}
```

:::
