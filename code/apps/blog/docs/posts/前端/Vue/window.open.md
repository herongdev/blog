下面把“谁开的窗口、谁来关”说清楚，并给你**可直接用的最短代码片段**（复杂点的地方我在上一行加了注释）。

---

## 1) 父页面打开 → 父页面关闭

```ts
// 复杂逻辑：保存 window 引用，后续用它来关闭（不要加 noopener）
const child = window.open('https://example.com', 'childWin');

// 需要关闭时（例如按钮点击）
child?.close();
```

要点：

- 只有**脚本打开**的窗口才能被脚本关闭。
- 如果 `window.open` 被拦截（`child === null`），说明被浏览器当成弹窗拦了。

---

## 2) 子页面自我关闭

```ts
// 子页面里（被脚本打开的窗口）
window.close();
```

要点：

* 多数浏览器要求这个窗口**确实由脚本打开**过；否则 `window.close()`无效。

---

## 3) 父页面打开 → 子页面里提供“关闭自己”按钮

```html
<!-- 子页面 HTML -->
<button id="closeMe">关闭我</button>
<script>
// 复杂逻辑：由脚本打开的窗口可直接自关
document.getElementById('closeMe')!.onclick = () => window.close();
</script>
```

---

## 4) 丢了引用怎么办？（用“命名窗口”找回引用）

```ts
// 复杂逻辑：用 name 固定目标窗口，之后可用同名再拿到引用
window.open('https://example.com', 'childWin'); // 第一次打开

// ……过一会儿在父页面没保存到 child 引用？可以用同名“再打开”来拿句柄
const w = window.open('', 'childWin'); // 不传 URL，仅获取引用
w?.close();
```

要点：

* 依赖**同一浏览器会话**和**窗口名字**（第二参），不要加 `rel="noopener"`（会切断 opener，但不影响按名称获取句柄）。
* 某些场景仍可能被弹窗策略限制。

---

## 5) setTimeout 定时关闭（示例）

```ts
// 复杂逻辑：打开后 3 秒自动关闭
const win = window.open('/preview', 'previewWin');
setTimeout(() => win?.close(), 3000);
```

---

## 6) 常见“关不掉”的原因清单

* ✅ 必须是**脚本打开**的窗口/标签页；用户手动开的标签页**不能**被你关。
* ✅ 被**弹窗拦截**：`window.open` 返回 `null`，自然也关不了。
* ✅ 你用了 `rel="noopener"` 或 `window.open(url, name, 'noopener')`：

  * 这会让 `child.window.opener === null`（切断回链），**不影响父用返回值 `child.close()`**；
  * 但如果你**没有保存返回值**，后面就拿不到句柄了。
* ✅ 跨域**不影响关闭**，只要你持有 `Window` 引用（但你不能跨域访问对方 DOM）。
* ✅ 某些移动端/内嵌 WebView 对 `window.close()` 有更严格限制。

---

## 7) 推荐的小模式（更稳）

```ts
// 复杂逻辑：统一封装，包含命名与回退关闭
let child: Window | null = null;

function openChild() {
  // 指定名字，便于找回；尽量在用户点击等“手势事件”里调用以避免被拦截
  child = window.open('/child', 'myChildWin');
}

function closeChild() {
  if (child && !child.closed) {
    child.close();
  } else {
    // 复杂逻辑：丢了句柄时，尝试用名字找回
    const w = window.open('', 'myChildWin');
    w?.close();
  }
}
```

> 简记：**拿到句柄就能关；脚本没开的关不了；被拦截的也关不了；丢句柄用“命名窗口”试着找回。**
