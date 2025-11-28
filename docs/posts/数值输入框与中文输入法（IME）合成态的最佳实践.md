---

title: 数值输入框与中文输入法（IME）合成态的最佳实践
date: 2025-10-23
tags: [Vue3, IME, 数值输入框, CompositionEvent, 可用性, 精度]
---------------------------------------------------

## 结论（TL;DR）

- **合成中（isComposing=true）必须忽略“数值语义”的处理**：不做解析、格式化、校验、步进；只把用户看到的**原始字符串**放进 `formattedValue`。
- **在 `compositionend`（以及紧随其后的一次 `input`/`beforeinput`）再统一“落地”**：一次性解析→跑校验流水线→格式化→同步到 UI。
- **交互键位与滚轮**：合成中应全部失效（或自动先 finalize 再执行），避免抢占输入法候选框的键盘事件。
- **实现要点**：同时依赖事件的 `InputEvent.isComposing` **与** 本地 `composing` 标记，处理不同浏览器/输入法的差异序列。

---

## 事件序列与差异

典型序列（以 Chrome/Win 微软拼音为例）：

1. `compositionstart` → 多次 `compositionupdate`（同时会穿插 `input[isComposing]`）
2. 用户选字上屏：`compositionend`
3. 紧接着触发**一次** `input[isComposing=false]`（已确定的最终值）

差异点：

- iOS Safari、部分安卓输入法可能先后顺序略有不同，或漏掉某个事件；**因此要用两道保险**：

  1. 本地 `isComposing` 标记（由 start/end 控制）；
  2. 读取事件上的 `e.isComposing`。

---

## 你的代码应该如何改（最小改动片段）

> 说明：只给**需要修改**的片段，并在修改处上一行加中文注释（符合你的偏好）。
> 目标：合成中只缓存字符串；合成结束统一 finalize；合成中禁用键盘/滚轮/连发步进。

### A. `useNumericInteractions.ts`（合成态处理 & 交互兜底）

```ts
// —— 输入/合成 —— //
const handleInput = (val: string) => {
  // ✅ 合成中：仅接受中间态字符串，绝不做解析/格式化/校验
  bridge.setFromString(val, { acceptIntermediate: true });
};

const onCompositionStart = () => {
  isComposing.value = true;
};

// ✅ 合成结束：立刻用最终字符串跑一次完整流程（解析→校验→格式化）
const onCompositionEnd = (e?: CompositionEvent) => {
  isComposing.value = false;
  const finalStr =
    (e?.target as HTMLInputElement | undefined)?.value ??
    bridge.formattedValue.value ??
    "";
  // 在这里走“非中间态”路径，触发解析与格式化
  bridge.setFromString(finalStr);
  bridge.finalize();
};

// —— 滚轮 —— //
const onWheel = useThrottleFn((e: WheelEvent) => {
  // ✅ 合成中禁止滚轮更改，避免干扰候选框滚动或误操作
  if (isComposing.value) return;
  if (opts.enableWheel === false) return;
  if (opts.preventWheelDefault) e.preventDefault();
  const m = getMultiplierFromEvent(e, accelerateFactors.value);
  bump(e.deltaY < 0 ? +m : -m);
}, opts.wheelThrottleMs ?? 16);

// —— 长按连发 —— //
function startSpin(
  dir: 1 | -1,
  ev?: MouseEvent | PointerEvent | KeyboardEvent | TouchEvent
) {
  // ✅ 合成中先 finalize，再允许步进（也可选择直接 return）
  if (isComposing.value) {
    isComposing.value = false;
    bridge.finalize();
  }
  if (opts.enableSpin === false) return;
  // ……（原逻辑保持不变）
}

// —— 键盘 —— //
const onKeydown = useThrottleFn((e: KeyboardEvent) => {
  // ✅ 合成中禁用键盘步进（方向键/翻页键），避免抢占输入法按键
  if (isComposing.value || (e as any).isComposing) return;
  if (opts.enableKeyboard === false) return;
  // ……（原逻辑保持不变）
}, 24);
```

### B. `useNumericCore.ts`（实现真正的“中间态”分支）

你已经预留了 `acceptIntermediate` 参数，但相关代码被注释掉，导致**合成中仍然走完整 pipeline**。请恢复并稍作增强：

```ts
const setFromString = (
  input: string,
  opts?: { acceptIntermediate?: boolean }
) => {
  // ✅ 合成中：只更新 formattedValue；若 parse 得到合法数值，可“悄悄”同步 rawValue，但不触发校验/格式化
  if (opts?.acceptIntermediate) {
    // 在合成中保持用户所见即所得
    core.state.formattedValue = input;

    // 仅当能稳定解析为有限数时，更新 rawValue；否则置空，表示“未定”
    const parsed = core.options.parseFn?.(input, core.options);
    if (parsed != null && Number.isFinite(parsed)) {
      core.state.rawValue = parsed;
    } else {
      core.state.rawValue = null;
    }

    // 中间态不判错，避免红字抖动
    core.state.isValid = true;
    core.state.errors = [];

    // ✅ 必须同步一次，让 UI 即时显示合成中的字符串
    sync();
    return;
  }

  // ✅ 非中间态：走核心 setValue（可触发解析/校验/格式化等完整流程）
  core.setValue(input, false);
  // 之前这里是 sync(false) —— 会造成 UI 不更新。应改为同步。
  // 在微任务中批量合并，避免抖动
  sync();
};
```

> 这样配合上 `onCompositionEnd` 的 `finalize()`，就能保障：
> **合成中：只显示输入法正在编辑的文本**；**结束时：一次性格式化为数值**。

---

## 为什么要“忽略合成中的值”

1. **打断候选体验**：格式化（加千分位、截断小数、自动纠正范围等）会改动字符串与光标位置，直接把输入法**候选区冲掉或错位**。
2. **错误信号噪声**：合成中会出现字母/拼音/空串等非数值字符，若立刻校验会产生**闪烁的错误提示**。
3. **键位冲突**：`ArrowUp/Down`、`PageUp/Down` 在合成中通常用于候选选择或移动，**不该触发步进**。
4. **跨端差异**：不同浏览器/IME 的事件时序不同，**同时依赖 `e.isComposing` 与本地标记**更稳。

---

## 实施清单（Best Practices）

1. **判定条件**：`if (localComposing || e.isComposing) return;`
2. **中间态策略**：

   - 仅 `formattedValue = input`；可尝试解析，**但不显示错误**，不强制格式化。
   - 同步 UI，保证“所见即所得”。

3. **结束态策略**：

   - `compositionend` 里用最终字符串 `setFromString(final)` → `finalize()`。
   - 再下一次 `input[!isComposing]` 发生也应安全（幂等）。

4. **交互屏蔽**：

   - 合成中禁用：滚轮、键盘步进、长按连发；或先 `finalize()` 再执行（视产品决策）。

5. **受控模式防抖**：

   - 合成中**不要**被外部的 `modelValue` 变更覆盖当前输入串（在组件层用 `composing` 锁即可）。

6. **空值处理**：

   - 合成结束若为空串，`finalize()` 可按 `defaultValue` 或 `null` 策略统一处理（你已有 `reset`/`formatValue` 可用）。

7. **格式化与光标**（进阶）：

   - 若需要即时千分位效果，建议在**非合成态**进行，并实现“光标映射”以保留 caret 位置（难点，可后续迭代）。

---

## 参考实现片段（组件层建议）

```vue
<!-- 组件层要把合成事件透传给 useNumericInteractions -->
<input
  :value="bridge.formattedValue"
  @input="(e) => interactions.handleInput((e.target as HTMLInputElement).value)"
  @compositionstart="interactions.onCompositionStart"
  @compositionend="interactions.onCompositionEnd"
  @wheel.prevent="interactions.onWheel"
  @keydown="interactions.onKeydown"
/>
<!-- 加减按钮：按下时若在合成中，先 finalize，再步进 -->
<button @pointerdown="(e) => interactions.startSpin(+1, e)">＋</button>
<button @pointerdown="(e) => interactions.startSpin(-1, e)">－</button>
```

---

## 测试用例矩阵（强烈建议跑一遍）

- **浏览器 × IME**：Chrome/Edge/Firefox/Safari × 微软拼音/搜狗/QQ 拼音/macOS 简体/繁体/移动端 Gboard。
- **场景**：

  1. 拼音合成中连续输入字母，检查是否无格式化、无错误闪烁；
  2. 合成结束立即格式化（小数点、千分位、范围裁剪、精度对齐）；
  3. 合成中按 `↑/↓/PgUp/PgDn` 不应步进；
  4. 合成中滚轮不应改变值；
  5. 单击/长按步进键时，若处于合成态，是否先完成合成再步进；
  6. 删除为**空串**并失焦（或回车）时的最终值策略是否符合预期。

---

## 常见坑位

- **仅依赖 `e.isComposing`**：部分环境不稳定，务必配合本地 `isComposing` 标记。
- **合成中仍然 `setValue`**：会触发格式化/校验，导致光标跳动与候选丢失。
- **`sync(false)` 关闭同步**：导致 UI 不更新，用户看不到正在输入的字符串（已在上文修正）。
- **滚轮默认行为**：在输入框上滚动应谨慎，建议提供 `enableWheel`、`preventWheelDefault` 与“仅聚焦时有效”的策略。

---

## 总结

你的数值输入框在合成态应**完全尊重输入法的编辑过程**：**只显示字符串，不做数值语义处理**；在合成结束的瞬间**一次性**完成解析/校验/格式化与同步。按上述两处“最小修改”，即可实现稳定、跨端一致而不打扰中文输入的体验。
