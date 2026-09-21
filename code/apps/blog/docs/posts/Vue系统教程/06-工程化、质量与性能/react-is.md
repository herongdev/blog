---
title: "react-is"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "工程化、质量与性能"
description: "Yarn yarn add NPM npm install react is import React from as ReactIs from class ClassComponent extends { { return const FunctionComponent ()。"
sidebarWeight: 27
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/常用依赖/react-is.md"
---
::: v-pre

# react-is

> 本节目标：理解“react-is”的核心思路，并能把它用于实际开发或面试表达。
```
This package allows you to test arbitrary values and see if they're a particular React element type.
Installation
#
```

 `Yarn`
`yarn` `add`

```
react-is
#
```

 `NPM`
`npm` `install` `react-is`

```
Usage
Determining if a Component is Valid
```

`import` `React` `from`

```
"react";
import
```

 `*` `as` `ReactIs` `from`

```
"react-is";
```

`class` `ClassComponent` `extends`

```
React.Component
```

 `{`

```
render()
```

 `{`
    `return`

```
React.createElement("div");
```

```
}
}
```

`const` `FunctionComponent` `=` `()` `=\>`

```
React.createElement("div");
```

`const` `ForwardRefComponent` `=`

```
React.forwardRef((props,
```

```
ref)
```

 `=\>`

```
React.createElement(Component,
```

 `{`

```
forwardedRef:
```

 `ref,`

```
...props
```

```
})
);
```

`const` `Context` `=`

```
React.createContext(false);
```

```
ReactIs.isValidElementType("div");
```

 `//`

```
true
ReactIs.isValidElementType(ClassComponent);
```

 `//`

```
true
ReactIs.isValidElementType(FunctionComponent);
```

 `//`

```
true
ReactIs.isValidElementType(ForwardRefComponent);
```

 `//`

```
true
ReactIs.isValidElementType(Context.Provider);
```

 `//`

```
true
ReactIs.isValidElementType(Context.Consumer);
```

 `//`

```
true
ReactIs.isValidElementType(React.createFactory("div"));
```

 `//`

```
true
Determining an Element's Type
Context
```

`import` `React` `from`

```
"react";
import
```

 `*` `as` `ReactIs` `from`

```
'react-is';
```

`const` `ThemeContext` `=`

```
React.createContext("blue");
```

```
ReactIs.isContextConsumer(<ThemeContext.Consumer
```

```
/>);
```

 `//`

```
true
ReactIs.isContextProvider(<ThemeContext.Provider
```

```
/>);
```

 `//`

```
true
ReactIs.typeOf(<ThemeContext.Provider
```

```
/>)
```

 `===`

```
ReactIs.ContextProvider;
```

 `//`

```
true
ReactIs.typeOf(<ThemeContext.Consumer
```

```
/>)
```

 `===`

```
ReactIs.ContextConsumer;
```

 `//`

```
true
Element
```

`import` `React` `from`

```
"react";
import
```

 `*` `as` `ReactIs` `from`

```
'react-is';
```

```
ReactIs.isElement(<div
```

```
/>);
```

 `//`

```
true
ReactIs.typeOf(<div
```

```
/>)
```

 `===`

```
ReactIs.Element;
```

 `//`

```
true
Fragment
```

`import` `React` `from`

```
"react";
import
```

 `*` `as` `ReactIs` `from`

```
'react-is';
```

```
ReactIs.isFragment(<></>);
```

 `//`

```
true
ReactIs.typeOf(<></>)
```

 `===`

```
ReactIs.Fragment;
```

 `//`

```
true
Portal
```

`import` `React` `from`

```
"react";
import
```

 `ReactDOM` `from`

```
"react-dom";
import
```

 `*` `as` `ReactIs` `from`

```
'react-is';
```

`const` `div` `=`

```
document.createElement("div");
const
```

 `portal` `=`

```
ReactDOM.createPortal(<div
```

```
/>,
```

 `div);`

```
ReactIs.isPortal(portal);
```

 `//`

```
true
ReactIs.typeOf(portal)
```

 `===`

```
ReactIs.Portal;
```

 `//`

```
true
StrictMode
```

`import` `React` `from`

```
"react";
import
```

 `*` `as` `ReactIs` `from`

```
'react-is';
```

```
ReactIs.isStrictMode(<React.StrictMode
```

```
/>);
```

 `//`

```
true
ReactIs.typeOf(<React.StrictMode
```

```
/>)
```

 `===`

```
ReactIs.StrictMode;
```

 `//` `true`
 \> 来自

```
 <https://www.npmjs.com/package/react-is>
```

:::
