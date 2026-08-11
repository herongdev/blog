---
title: "JSX 中的 Props"
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
description: "注意： 属性展开在某些情况下很有用，但是也很容易将不必要的 props 传递给不相关的组件，或者将无效的 HTML 属性传递给 DOM。我们建议谨慎的使用该语法。"
sidebarWeight: 18
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/JSX深入/JSX 中的 Props.md"
---
::: v-pre

# JSX 中的 Props

> 本节目标：理解“JSX 中的 Props”的核心思路，并能把它用于实际开发或面试表达。
```
有多种方式可以在 JSX 中指定 props。
```

```
**一、****JavaScript** **表达式作为** **Props**
你可以把包裹在 {} 中的 JavaScript 表达式作为一个 prop 传递给 JSX 元素。例如，如下的 JSX：
<MyComponent foo={1 + 2 + 3 + 4} />
if 语句以及 for 循环不是 JavaScript 表达式，所以不能在 JSX 中直接使用。但是，你可以用在 JSX 以外的代码中。比如：
function NumberDescriber(props) {
    let description;
    if (props.number % 2 == 0) {
        description = <strong>even</strong>;
    } else {
        description = <i>odd</i>;
    }
    return <div>{props.number} is an {description} number</div>;
}
```

```
**二、字符串字面量**
可以将字符串字面量赋值给 prop. 如下两个 JSX 表达式是等价的：
<MyComponent message="hello world" />
<MyComponent message={'hello world'} />
当将字符串字面量赋值给 prop 时，它的值是未转义的。所以以下两个 JSX 表达式是等价的：
<MyComponent message="&lt;3" />
<MyComponent message={'<3'} />
这种行为通常是不重要的，这里只是提醒有这个用法。
```

```
**三、Props 默认值为 “True”**
如果你没给 prop 赋值，它的默认值是 true。以下两个 JSX 表达式是等价的：
<MyTextBox autocomplete />
<MyTextBox autocomplete={true} />
通常，我们不建议不传递 value 给 prop，因为这可能与 [ES6](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015) 对象简写混淆，{foo} 是 {foo: foo} 的简写，而不是 {foo: true}。这样实现只是为了保持和 HTML 中标签属性的行为一致。
```

```
**四、属性展开**
如果已经有了一个 props 对象，可以使用展开运算符 ... 来在 JSX 中传递整个 props 对象。以下两个组件是等价的：
function App1() {
    return <Greeting firstName="Ben" lastName="Hector" />;
}
function App2() {
    const props = { firstName: 'Ben', lastName: 'Hector' };
    return <Greeting {...props} />;
}
你还可以选择只保留当前组件需要接收的 props，并使用展开运算符将其他 props 传递下去。
const Button = props => {
    const { kind, ...other } = props;
    const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
    return <button className={className} {...other} />;
};
```

```
const App = () => {
    return (
        <div>
            <Button kind="primary" onClick={() => console.log("clicked!")}>
                Hello World!
        </Button>
        </div>
    );
};
在上述例子中，kind 的 prop 会被安全的保留，它将_不会_被传递给 DOM 中的 <button> 元素。 所有其他的 props 会通过 ...other 对象传递，使得这个组件的应用可以非常灵活。你可以看到它传递了一个 onClick 和 children 属性。
```

**注意：**
属性展开在某些情况下很有用，但是也很容易将不必要的 props 传递给不相关的组件，或者将无效的 HTML 属性传递给 DOM。我们建议谨慎的使用该语法。

:::
