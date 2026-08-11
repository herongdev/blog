---
title: "HistoryRouter"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "状态管理与路由"
description: "BrowserRouter 利用 h5 Api 实现路由的切换 ; History 对象提供了操作浏览器会话历史的接口。 Historylength ：属性声明了浏览器历史列表中的元素数量 ： HTML5 引入了 history.pushState() 和 history.rep。"
sidebarWeight: 9
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/react-router/HistoryRouter.md"
---
::: v-pre

# HistoryRouter

> 本节目标：理解“HistoryRouter”的核心思路，并能把它用于实际开发或面试表达。
`BrowserRouter`

- 利用`h5 Api`实现路由的切换`;`

`History` 对象提供了操作浏览器会话历史的接口。

- `Historylength`：属性声明了浏览器历史列表中的元素数量
- ```
    pushState
    ```

    ：`HTML5`引入了 `history.pushState()` 和 `history.replaceState()` 方法，它们分别可以添加和修改历史记录条目。这些方法通常与`window.onpopstate`配合使用
- ```
    onpopstate
    ```

    ：`window.onpopstate`是`popstate`事件在`window`对象上的事件处理程序

`pushState`

- `pushState`会往`History`中写入一个对象，他造成的结果便是`,History length +1`、`url` 改变、该索引`History`对应有一个`State`对象`,`这个时候若是点击浏览器的后退，便会触发`popstate`事件，将刚刚的存入数据对象读出；
- `pushState` 会改变`History`；
- 每次使用时候会为该索引的`State`加入我们自定义数据；
- 每次我们会根据`State`的信息还原当前的`view`，于是用户点击后退便有了与浏览器后退前进一致的感受；
- `pushState()` 需要三个参数`:` 一个状态对象`,` 一个标题 `(`目前被忽略`),` 和 `(`可选的`)` 一个`URL`；
- 调用`history.pushState()`或者`history.replaceState()`不会触发`popstate`事件；
- `popstate`事件只会在浏览器某些行为下触发`,` 比如点击后退、前进按钮`(`或者在`JavaScript`中调用`history.back()`、`history.forward()`、`history.go()`方法`)`

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>browser</title>
  </head>
  <body>
    <div id="root"></div>
    <script>
      var historyObj = window.history;
      //
```

这是完全自定义的，跟原生没有关系

```
      window.onpushstate = (state, pathname) => {
        console.log(state, pathname);
        root.innerHTML = pathname; //
```

当前的路径

```
      };
      //
```

如果当前的历史栈指针发生变化的话会触发`popstate`事件，执行对应的回调函数

```
      window.addEventListener("popstate", (event) => {
        console.log(event.type, event.state);
        root.innerHTML = window.location.pathname; //
```

当前的路径

```
      });
      (function (historyObj) {
        let oldPushState = historyObj.pushState;
        historyObj.pushState = (state, title, pathname) => {
          let result = oldPushState.call(historyObj, state, title, pathname);
          if (typeof window.onpushstate === "function") {
            window.onpushstate(state, pathname);
          }
          return result;
        };
      })(historyObj);
      setTimeout(() => {
        //
```

调用`pushState`会修改当前的路径

```
        historyObj.pushState({ page: 1 }, null, "/page1");
      }, 1000);
      setTimeout(() => {
        //
```

调用`pushState`会修改当前的路径

```
        historyObj.pushState({ page: 2 }, null, "/page2");
      }, 2000);
      setTimeout(() => {
        //
```

调用`pushState`会修改当前的路径

```
        historyObj.pushState({ page: 3 }, null, "/page3");
      }, 3000);
      setTimeout(() => {
        //
```

调用`pushState`会修改当前的路径

```
        historyObj.back();
      }, 4000);
      setTimeout(() => {
        //
```

调用`pushState`会修改当前的路径

```
        historyObj.pushState({ page: 4 }, null, "/page4");
      }, 5000);
      setTimeout(() => {
        historyObj.go(1);
      }, 6000);
    </script>
  </body>
</html>
```

:::
