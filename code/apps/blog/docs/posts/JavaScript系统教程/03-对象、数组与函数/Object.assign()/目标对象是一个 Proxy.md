---
title: "目标对象是一个 Proxy"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "如果 Object.assign 的目标对象是一个 Proxy，情况会有所不同，因为 Proxy 允许拦截对象的操作，包括属性赋值。Object.assign 在合并属性时仍然会执行赋值操作（即使值相同），但这些操作会触发 Proxy 的 set 捕获器（trap），无论目标属性。"
sidebarWeight: 37
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-对象/Object.assign()/目标对象是一个 Proxy.md"
---
::: v-pre

# 目标对象是一个 Proxy

> 本节目标：理解“目标对象是一个 Proxy”的核心思路，并能把它用于实际开发或面试表达。
如果 Object.assign 的目标对象是一个 Proxy，情况会有所不同，因为 Proxy 允许拦截对象的操作，包括属性赋值。Object.assign 在合并属性时仍然会执行赋值操作（即使值相同），但这些操作会触发 Proxy 的 set 捕获器（trap），无论目标属性值和新值是否相同。
**详细分析：**

1. **Object.assign 的行为**：
    - Object.assign(target, ...sources) 会遍历源对象的可枚举自有属性，并通过 target[key] = value` 的方式将值复制到目标对象。
    - 对于普通对象，这个赋值操作直接修改目标对象的属性。
    - 但如果 target 是 Proxy 是 Proxy 对象，赋值操作（如 target[key] = value）会被 Proxy 的 set 捕获器拦截。
2. **Proxy 的 set 捕获器**：
    - 当 Object.assign 尝试设置 target 的属性时，会触发 Proxy 的 set 捕获器（如果定义了 set 捕获器（if）。
    - set 捕获器的签名是： javascriptCollapseWrapRunCopyset(target, property, value, receiver)
        - target：代理的目标对象。
        - property：被设置的属性名。
        - value：尝试设置的新值。
    - receiver：触发 set 操作的对象（通常是 Proxy 实例或其原型链上的对象）。
    - 即使新值和旧值相同，set 捕获器仍然会被调用，因为 Proxy 不会自动跳过相等值的赋值操作。
3. **值相同的情况**：
    - 如果源对象的属性值和目标对象（或其代理的目标对象）的属性值严格相等（===），Object.assign 仍然会触发 Proxy 的 set 捕获器。
    - 你可以在 set 捕获器中手动检查新旧值是否相等，以决定是否执行进一步操作。
4. **代码示例**：javascriptCollapseWrapRunCopyconst targetObj = \{ a: 1 \};const handler = \{ set(target, property, value, receiver) \{ console.log(`Set called: ${property} = ${value}`); _// 可选择是否更新目标对象_ if (target[property] !== value) \{ target[property] = value; \} return true; _// 表示设置成功_ \}\};const proxy = new Proxy(targetObj, handler);const source = \{ a: 1 \};Object.assign(proxy, source); _// 触发 set 捕获器，打印 "Set called: a = 1"_console.log(targetObj); _// \{ a: 1 \}（值未变，因为 set 捕获器中检查了相等性）___在这个例子中：
    - Object.assign 尝试设置 proxy.a = 1。
    - 即使 proxy.a 的当前值已经是 1，set 捕获器仍然会被调用。
    - 在 set 捕获器中，我们检查了 target[property] !== value，因此目标对象的实际值没有被修改（但捕获器仍然被触发）。
5. **性能与优化**：
    - 由于 Object.assign 不检查值是否相同，Proxy 的 set 捕获器会为每个属性赋值操作触发一次，这可能导致性能开销，尤其是在合并大量属性时。
    - 如果你希望避免不必要的操作，可以在 set 捕获器中实现逻辑，跳过值相等的赋值（如上例所示）。
    - 或者，你可以在调用 Object.assign 前手动过滤掉值相同的属性： javascriptCollapseWrapRunCopyconst filteredSource = Object.keys(source).reduce((acc, key) =\> \{ if (source[key] !== proxy[key]) \{ acc[key] = source[key]; \} return acc;\}, \{\});Object.assign(proxy, filteredSource);
6. **注意事项**：
    - 如果 Proxy 的 set 捕获器返回 false 或抛出错误，Object.assign 会抛出 TypeError，因为属性设置失败。
    - 如果目标对象是 Proxy，但没有定义 set 捕获器，则赋值操作会直接作用于代理的目标对象（target），行为与普通对象一致。
    - 如果 Proxy 的目标对象有 getter/setter 定义，Object.assign 的赋值操作可能会触发目标对象的 setter（如果 set 捕获器将操作转发到目标对象）。

**总结：**

- 如果 Object.assign 的目标对象是 Proxy，每次属性赋值（即使值相同）都会触发 Proxy 的 set 捕获器。
- 你可以在 set 捕获器中检查新旧值是否相等，以避免不必要的更新。
- 为了优化性能，可以在调用 Object.assign 前过滤掉值相同的属性，或在 set 捕获器中实现跳过逻辑。
- 注意 Proxy 的 set 捕获器必须返回 true 表示设置成功，否则 Object.assign 会抛出错误。

如果你有具体的代码或场景需要进一步分析，请提供，我可以帮你更深入地探讨！

:::
