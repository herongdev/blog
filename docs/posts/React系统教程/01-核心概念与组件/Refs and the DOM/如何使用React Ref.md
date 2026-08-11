---
title: "如何使用React Ref"
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
description: "它不像React中的状态或副作用那样经常使用，并且因为它的API在React的过去确实经常更改。 REACT USEREF HOOK: DOM REFS 让我们来了解一下React的ref特长：DOM。通常，每当您必须与HTML元素进行交互时，您都将使用React的ref。Rea。"
sidebarWeight: 39
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/Refs and the DOM/如何使用React Ref.md"
---
::: v-pre

# 如何使用React Ref

> 本节目标：理解“如何使用React Ref”的核心思路，并能把它用于实际开发或面试表达。
它不像React中的状态或副作用那样经常使用，并且因为它的API在React的过去确实经常更改。

```
REACT USEREF HOOK: REFS
React ref与DOM紧密相关。过去确实如此，但是自从React引入React Hooks以来就不再如此。Ref表示仅引用，因此它可以是对任何内容的引用（DOM节点，JavaScript值等）。因此，我们将退后一步，首先探讨不带DOM的React ref，然后再将其与HTML元素一起使用。让我们以以下React组件为例：
function Counter() {
  const [count, setCount] = React.useState(0);
  function onClick() {
    const newCount = count + 1;
    setCount(newCount);
  }
  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={onClick}>
        Increase
      </button>
    </div>
  );
}
```

```
useRef Hook向我们返回一个可变对象，该对象在React组件的生存期内保持不变。具体来说，返回的对象具有一个current属性，可以为我们保存任何可修改的值：
function Counter() {
  const hasClickedButton = React.useRef(false);
  const [count, setCount] = React.useState(0);
  function onClick() {
    const newCount = count + 1;
    setCount(newCount);
    hasClickedButton.current = true;
  }
  console.log('Has clicked button? ' + hasClickedButton.current);
  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={onClick}>
        Increase
      </button>
    </div>
  );
}
```

```
将React ref设置为新值的不会触发组件的重新渲染，这与setCount不同：
```

```
function Counter() {
  const hasClickedButton = React.useRef(false);
  const [count, setCount] = React.useState(0);
  function onClick() {
    // const newCount = count + 1;
    // setCount(newCount);
    hasClickedButton.current = true;
  }
  // 不会重新渲染
  console.log('Has clicked button? ' + hasClickedButton.current);
  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={onClick}>
        Increase
      </button>
    </div>
  );
}
```

```
这一特性的用途
将REF作为实例变量
每当我们需要跟踪某种状态而无需使用React的重新渲染机制时，ref都可以用作React中功能组件的实例变量。例如，我们可以跟踪组件是第一次渲染还是重新渲染：
function ComponentWithRefInstanceVariable() {
  const [count, setCount] = React.useState(0);
  function onClick() {
    setCount(count + 1);
  }
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  });
  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={onClick}>
        Increase
         </button>
      {/*
  Only works because setCount triggers a re-render.
  Just changing the ref's current value doesn't trigger a re-render.
  */}
      <p>{isFirstRender.current ? 'First render.' : 'Re-render.'}</p>
    </div>
  );
}
```

```
现在，我们可以创建一个useEffect挂钩，该挂钩仅在每次组件更新时都运行其逻辑，而不在初始渲染时运行。这肯定是每个React开发人员在某个时候都需要的功能，但是React的useEffect Hook没有提供此功能：
function ComponentWithRefInstanceVariable() {
  const [count, setCount] = React.useState(0);
  function onClick() {
    setCount(count + 1);
  }
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      console.log(
        `I am a useEffect hook's logic
        which runs for a component's
        re-render.  `
      );
    }
  });
  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={onClick}>
        Increase
      </button>
    </div>
  );
}
**经验法则：**每当需要跟踪React组件中的状态而该状态不应该触发组件的重新渲染时，都可以使用React的useRef Hooks为其创建一个实例变量。
```

**REACT USEREF HOOK: DOM REFS**
让我们来了解一下React的ref特长：DOM。通常，每当您必须与HTML元素进行交互时，您都将使用React的ref。React本质上是声明性的，但是有时您需要从HTML元素读取值，与HTML元素的API交互，甚至必须将值写入HTML元素。对于这些罕见的情况，您必须使用React的refs以强制性而非声明性的方式与DOM进行交互。

```
这个React组件展示了React ref和DOM API的相互作用的最受欢迎的示例：
function App() {
  return (
    <ComponentWithDomApi
      label="Label"
      value="Value"
      isFocus
    />
  );
}
function ComponentWithDomApi({ label, value, isFocus }) {
  const ref = React.useRef(); // (1)
  React.useEffect(() => {
    if (isFocus) {
      ref.current.focus(); // (3)
    }
  }, [isFocus]);
  return (
    <label>
      {/* (2) */}
      {label}: <input type="text" value={value} ref={ref} />
    </label>
  );
}
像以前一样，我们使用React的useRef Hook创建一个ref对象（1）。在这种情况下，我们不会为其分配任何初始值，因为这将在下一步（2）中完成，在该步骤中，我们将ref对象作为HTML属性提供给HTML元素。React为我们自动将此HTML元素的DOM节点分配给ref对象。最后（3），我们可以使用DOM节点（现在已将其分配给ref的当前属性）与其API进行交互。
```

```
前面的示例向我们展示了如何与React中的DOM API交互。接下来，您将学习如何使用ref从DOM节点读取值。以下示例从元素读取大小，以在浏览器中将其显示为标题：
function ComponentWithRefRead() {
  const [text, setText] = React.useState('Some text ...');
  function handleOnChange(event) {
    setText(event.target.value);
  }
  const ref = React.useRef();
  React.useEffect(() => {
    const { width } = ref.current.getBoundingClientRect();
    document.title = `Width:${width}`;
  }, []);
  return (
    <div>
      <input type="text" value={text} onChange={handleOnChange} />
      <div>
        <span ref={ref}>{text}</span>
      </div>
    </div>
  );
}
```

```
不过，读取DOM节点的大小仅适用于初始渲染。如果您想每次状态更改时都读取它，因为毕竟这将更改我们HTML元素的大小，则可以将状态作为依赖变量提供给React的useEffect Hook。每当状态（此处text）发生变化时，都会从HTML元素中读取元素的新大小并将其写入文档的title属性中：
function ComponentWithRefRead() {
  const [text, setText] = React.useState('Some text ...');
  function handleOnChange(event) {
    setText(event.target.value);
  }
  const ref = React.useRef();
  React.useEffect(() => {
    const { width } = ref.current.getBoundingClientRect();
    document.title = `Width:${width}`;
  }, [text]);
  return (
    <div>
      <input type="text" value={text} onChange={handleOnChange} />
      <div>
        <span ref={ref}>{text}</span>
      </div>
    </div>
  );
}
```

```
这两个示例都使用React的useEffect Hook对ref对象做一些事情。我们可以通过使用回调引用来避免这种情况。
REACT CALLBACK REF
前面示例的更好方法是使用所谓的回调ref。使用回调引用时，您不再需要使用useEffect和useRef钩子，因为回调引用使您可以访问每个渲染器上的DOM节点：
function ComponentWithRefRead() {
  const [text, setText] = React.useState('Some text ...');
  function handleOnChange(event) {
    setText(event.target.value);
  }
  const ref = (node) => {
    if (!node) return;
    const { width } = node.getBoundingClientRect();
    document.title = `Width:${width}`;
  };
  return (
    <div>
      <input type="text" value={text} onChange={handleOnChange} />
      <div>
        <span ref={ref}>{text}</span>
      </div>
    </div>
  );
}
回调ref就是一个可用于JSX中HTML元素的ref属性的函数。该函数可以访问DOM节点，并且只要在HTML元素的ref属性上使用该函数便会触发该函数。本质上，它的作用与以前的副作用相同，但是这次回调ref本身通知我们它已附加到HTML元素。
```

```
在使用useRef + useEffect组合之前，您可以在useEffect的hook依赖项数组的帮助下运行副作用一段时间。您可以通过使用React的useCallback Hook增强它来使回调ref达到相同的效果，以使其仅在组件的第一次渲染时运行：
function ComponentWithRefRead() {
  const [text, setText] = React.useState('Some text ...');
  function handleOnChange(event) {
    setText(event.target.value);
  }
  const ref = React.useCallback((node) => {
    if (!node) return;
    const { width } = node.getBoundingClientRect();
    document.title = `Width:${width}`;
  }, []);
  return (
    <div>
      <input type="text" value={text} onChange={handleOnChange} />
      <div>
        <span ref={ref}>{text}</span>
      </div>
    </div>
  );
}
您还可以在这里使用useCallback挂钩的依赖项数组来更具体。例如，仅在状态（here ）发生更改时才执行回调ref的回调函数text，当然，对于组件的第一个渲染，也要执行以下操作：
function ComponentWithRefRead() {
  const [text, setText] = React.useState('Some text ...');
  function handleOnChange(event) {
    setText(event.target.value);
  }
  const ref = React.useCallback((node) => {
    if (!node) return;
    const { width } = node.getBoundingClientRect();
    document.title = `Width:${width}`;
  }, [text]);
  return (
    <div>
      <input type="text" value={text} onChange={handleOnChange} />
      <div>
        <span ref={ref}>{text}</span>
      </div>
    </div>
  );
}
但是，如果不使用React的useCallback Hook并仅设置简单的回调ref，我们将再次获得与以前相同的行为-每次渲染都会调用它。
```

```
REACT REF FOR READ/WRITE OPERATIONS
到目前为止，我们仅将DOM ref用于读取操作（例如，读取DOM节点的大小）。也可以修改引用的DOM节点（写操作）。下一个示例向我们展示了如何使用React的ref来应用样式，而无需为其管理任何额外的React状态：
function ComponentWithRefReadWrite() {
  const [text, setText] = React.useState('Some text ...');
  function handleOnChange(event) {
    setText(event.target.value);
  }
  const ref = (node) => {
    if (!node) return;
    const { width } = node.getBoundingClientRect();
    if (width >= 150) {
      node.style.color = 'red';
    } else {
      node.style.color = 'blue';
    }
  };
  return (
    <div>
      <input type="text" value={text} onChange={handleOnChange} />
      <div>
        <span ref={ref}>{text}</span>
      </div>
    </div>
  );
}
```

可以针对此引用的DOM节点上的任何属性完成此操作。重要的是要注意，由于它的声明性，通常不应该这样使用React。相反，无论您要将文本着色为红色还是蓝色，都可以使用React的useState Hook设置一个布尔值。但是，有时出于性能原因，在防止重新渲染的同时直接操作DOM可能会很有帮助。

```
只是为了学习它，我们还可以在React组件中以这种方式管理状态：
function ComponentWithImperativeRefState() {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current.textContent = 0;
  }, []);
  function handleClick() {
    ref.current.textContent = Number(ref.current.textContent) + 1;
  }
  return (
    <div>
      <div>
        <span ref={ref} />
      </div>
      <button type="button" onClick={handleClick}>
        Increase
      </button>
    </div>
  );
}
但是，不建议您钻这个兔子洞...本质上，它只应该向您展示如何通过写操作使用React的ref属性来操作React中的任何元素。但是，为什么我们要有React然后又不再使用普通JavaScript？因此，React的ref主要用于读取操作。
```

本简介应该向您展示了如何通过使用React的useRef Hooks或回调refs，使用React的ref来引用DOM节点和实例变量。为了完整起见，我也想提到React的createRef()顶级API，它相当于React类组件的useRef（）。在React中不推荐使用其他称为string ref的ref。

:::
