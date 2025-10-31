```ts
// 🔍 调试：全局监听 localStorage 变化（在最早期捕获）
if (import.meta.env.DEV) {
  const originalSetItem = localStorage.setItem.bind(localStorage);
  const originalRemoveItem = localStorage.removeItem.bind(localStorage);
  const originalClear = localStorage.clear.bind(localStorage);

  localStorage.setItem = function (key, value) {
    if (key === "access_token") {
      console.log("[localStorage] setItem:", {
        key,
        value: value?.substring(0, 30) + "...",
      });
      if (!value || value === "" || value === "null" || value === "undefined") {
        console.warn("⚠️ [localStorage] access_token 被设置为空值！");
        console.trace("调用栈:");
      }
    }
    return originalSetItem(key, value);
  };

  localStorage.removeItem = function (key) {
    if (key === "access_token") {
      console.warn("🔴 [localStorage] access_token 被删除！");
      console.trace("调用栈:");
    }
    return originalRemoveItem(key);
  };

  localStorage.clear = function () {
    console.warn("🔴🔴🔴 [localStorage] clear() 被调用！所有数据将被清空！");
    console.trace("调用栈:");
    return originalClear();
  };

  console.log("✅ [Debug] localStorage 监听器已启用");
}
```
