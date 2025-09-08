---
title: 什么是 `AbortController`？
date: 2025-09-06 11:18:10
tags:
---

### 什么是 `AbortController`？

`AbortController` 是一个 Web API，允许开发者在 JavaScript 中主动取消某些异步操作，例如网络请求（`fetch`）、定时器或其他可取消的操作。它是现代 Web 开发中处理异步任务的重要工具，特别是在需要中断或取消正在进行的操作时。`AbortController` 提供了简单、标准化的方式来实现取消功能，广泛用于浏览器环境。

`AbortController` 是在 WHATWG 的 DOM 规范中定义的，最初主要与 `fetch` API 配合使用，但现在也被其他 API（如 `ReadableStream`）支持。它的核心思想是提供一个信号（`AbortSignal`），通过这个信号可以通知相关操作停止执行。

---

### 核心概念

1. **AbortController**:

   - `AbortController` 是一个构造函数，用于创建控制器对象。
   - 它有一个 `signal` 属性，返回一个 `AbortSignal` 对象，用于监听取消信号。
   - 它还有一个 `abort()` 方法，调用后会触发取消信号。

2. **AbortSignal**:

   - `AbortSignal` 是 `AbortController` 的信号对象，传递给支持取消的 API（如 `fetch`）。
   - 当 `AbortController` 的 `abort()` 方法被调用时，`AbortSignal` 会触发 `abort` 事件，通知相关操作取消。

3. **用途**:
   - 取消网络请求（例如用户切换页面时取消未完成的 `fetch` 请求）。
   - 中止某些异步任务（如文件读取、流操作）。
   - 提高性能，避免不必要的资源消耗。
   - 实现用户交互中的取消功能（如取消上传或下载）。

---

### 工作原理

`AbortController` 的工作流程可以简单总结为以下步骤：

1. 创建一个 `AbortController` 实例。
2. 将其 `signal` 属性传递给支持取消的 API（如 `fetch`）。
3. 在需要取消操作时，调用 `AbortController` 的 `abort()` 方法。
4. 相关的 API 会接收到取消信号并停止操作，同时抛出 `AbortError` 异常。

---

### 使用示例

以下是一个使用 `AbortController` 取消 `fetch` 请求的详细代码示例：

```javascript
// 创建 AbortController 实例
const controller = new AbortController();
const signal = controller.signal;

// 发起一个 fetch 请求，传入 signal
fetch("https://api.example.com/data", { signal })
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => {
    if (error.name === "AbortError") {
      console.log("请求被取消");
    } else {
      console.error("请求失败:", error);
    }
  });

// 假设 2 秒后取消请求
setTimeout(() => {
  controller.abort(); // 调用 abort() 方法取消请求
}, 2000);
```

#### 代码解释：

- `new AbortController()` 创建控制器。
- `controller.signal` 获取信号对象，传递给 `fetch` 的 `signal` 选项。
- `controller.abort()` 触发取消，`fetch` 请求会立即停止，并抛出 `AbortError`。
- 使用 `catch` 捕获错误并判断是否为 `AbortError`。

---

### 实际应用场景

1. **取消网络请求**:

   - 用户在页面上点击“搜索”，但在结果返回前又切换到另一个页面，可以用 `AbortController` 取消未完成的请求，避免浪费带宽。
   - 示例：用户在输入框快速输入时，取消之前的搜索请求，只处理最新的请求。

2. **清理定时器或事件监听器**:

   - 虽然 `AbortController` 本身不直接控制 `setTimeout` 或事件监听器，但可以通过监听 `AbortSignal` 的 `abort` 事件来实现类似功能。

3. **流操作**:

   - 在处理 `ReadableStream` 或 `WritableStream` 时，`AbortController` 可用于取消流传输。

4. **用户交互**:
   - 提供“取消”按钮，让用户手动中止上传、下载或其他耗时操作。

---

### 高级用法：监听 `AbortSignal` 事件

`AbortSignal` 是一个 `EventTarget`，可以监听其 `abort` 事件，用于自定义取消逻辑。

```javascript
const controller = new AbortController();
const signal = controller.signal;

// 监听 abort 事件
signal.addEventListener("abort", () => {
  console.log("操作已被取消");
});

// 模拟一个异步任务
async function doWork() {
  try {
    const response = await fetch("https://api.example.com/data", { signal });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("任务被取消");
    } else {
      console.error("任务失败:", error);
    }
  }
}

doWork();

// 3 秒后取消任务
setTimeout(() => {
  controller.abort();
}, 3000);
```

#### 说明：

- `signal.addEventListener('abort', ...)` 监听取消事件。
- 可以在取消时执行额外的清理逻辑，例如关闭资源或更新 UI。

---

### 注意事项

1. **浏览器兼容性**:

   - `AbortController` 在现代浏览器（如 Chrome、Firefox、Safari）中广泛支持，IE 不支持。
   - 对于旧浏览器，可能需要使用 polyfill。

2. **异常处理**:

   - 调用 `abort()` 后，相关 API 会抛出 `AbortError`，需要在代码中捕获并处理。

3. **不可恢复**:

   - 一旦调用 `abort()`，`AbortController` 实例不可重用，必须创建新的实例。

4. **支持的 API**:

   - 目前主要与 `fetch` 和 `ReadableStream` 等 API 配合使用，其他场景需要开发者手动实现取消逻辑。

5. **性能优化**:
   - 使用 `AbortController` 可以减少不必要的资源消耗，尤其在高并发或频繁请求的场景下。

---

### 扩展：结合 React 示例

在 React 中，`AbortController` 常用于组件卸载时取消请求，避免内存泄漏。

```javascript
import { useEffect } from "react";

function MyComponent() {
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        const response = await fetch("https://api.example.com/data", {
          signal,
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("请求被取消");
        } else {
          console.error("请求失败:", error);
        }
      }
    }

    fetchData();

    // 组件卸载时取消请求
    return () => {
      controller.abort();
    };
  }, []);

  return <div>加载中...</div>;
}
```

#### 说明：

- 在 `useEffect` 中创建 `AbortController`。
- 在组件卸载时（`return` 回调），调用 `abort()` 取消请求。
- 防止因组件卸载而导致的内存泄漏或状态更新错误。

---

### 总结

`AbortController` 是一个简单而强大的工具，用于在 Web 开发中取消异步操作。它通过 `AbortSignal` 提供了一种标准化的取消机制，广泛应用于 `fetch` 请求、流操作等场景。它的主要优点包括：

- **简单易用**：只需要创建控制器并调用 `abort()` 即可。
- **灵活性**：支持多种异步操作的取消。
- **性能优化**：避免不必要的资源消耗。
- **现代化**：符合现代 Web 开发的需求，特别是在用户交互和性能敏感的场景中。

通过合理使用 `AbortController`，开发者可以更好地管理异步任务，提升 Web 应用的性能和用户体验。
