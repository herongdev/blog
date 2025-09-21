好的，我按你的“只给需要调整的代码，并在复杂逻辑上一行加注释”来改，支持**全球手机号/座机**（E.164 7–15 位，允许 `+`、括号、空格、连字符，支持分机 `x` / `ext`），并在 **失焦时**（可开关）按 `phoneCode` 归一化成接近 E.164。

```ts
// 复杂逻辑：新增可选归一化开关（失焦时把号码规范化），默认开启
normalizeOnBlur: {
  type: Boolean,
  default: true,
},
```

```ts
// 复杂逻辑：替换你的 handleInput —— 宽进严出：只保留 + - () 空格 以及 x/ext，限制数字≤15
const handleInput = (event: Event) => {
  const el = event.target as HTMLInputElement;
  let v = el.value;

  // 允许的字符：数字、+、空格、-、()、x/X、e/E、t/T、.
  v = v.replace(/[^0-9+\-\s()extEXT.]/g, "");

  // 只保留开头的第一个 '+'，且 '+' 只能在开头
  v = v.replace(/\+/g, (m, i) => (i === 0 ? "+" : ""));
  if (v[0] !== "+") v = v.replace(/\+/g, "");

  // 提取可能的分机：末尾的 x / ext
  const extMatch = v.match(/\s*(?:ext\.?|x)\s*(\d{1,5})$/i);
  const ext = extMatch?.[1] ?? "";
  let main = v.replace(/\s*(?:ext\.?|x)\s*\d{1,5}$/i, "");

  // 复杂逻辑：限制主号码的“数字总数”≤15（不含分机）
  const digits = main.replace(/\D/g, "").slice(0, 15);
  main = (main[0] === "+" ? "+" : "") + digits;

  // 还原分机显示
  v = ext ? `${main} x${ext}` : main;

  inputValue.value = v.trim();
  modelValue.value = inputValue.value;
  value.value = inputValue.value;
};
```

```ts
// 复杂逻辑：新增 handleBlur —— 失焦时尝试归一化为接近 E.164（结合已选 phoneCode）
const handleBlur = () => {
  if (!props.normalizeOnBlur) return;
  let v = inputValue.value;

  // 提取分机
  const extMatch = v.match(/\s*(?:ext\.?|x)\s*(\d{1,5})$/i);
  const ext = extMatch?.[1] ?? "";
  let main = v.replace(/\s*(?:ext\.?|x)\s*\d{1,5}$/i, "");

  // 只保留主号码的数字
  let digits = main.replace(/\D/g, "");

  // 复杂逻辑：去除可能的国内前导 0（常见的外呼前缀），尽量保守只去前置 0
  digits = digits.replace(/^0+/, "");

  if (main.startsWith("+")) {
    // 已是国际格式：保持 + + 数字
    main = "+" + digits;
  } else if (phoneCode.value) {
    // 有国家码：拼成 E.164
    main = "+" + String(phoneCode.value) + digits;
  } else {
    // 无国家码也无 +：保留纯数字（留给后端/提交校验）
    main = digits;
  }

  const normalized = ext ? `${main} x${ext}` : main;
  inputValue.value = normalized;
  modelValue.value = normalized;
  value.value = normalized;
};
```

```tsx
// 复杂逻辑：在 <input> 上补充 pattern/title，并挂载 onBlur
<input
  type="tel"
  inputmode="tel"
  autocomplete="tel"
  value={inputValue.value}
  disabled={props.disabled}
  placeholder={props.placeholder || localeData.value?.placeholder}
  onInput={handleInput}
  onBlur={handleBlur}
  // 复杂逻辑：E.164（可选 +）主号码 7~15 位 + 可选分机（x / ext）
  pattern="^\+?[1-9]\d{6,14}(?:\s?(?:x|ext\.?)\s?\d{1,5})?$"
  title="请输入有效的国际电话号码：主号码7-15位数字，可选“+”与分机（x 或 ext）"
  class={[
    props.inputClass,
    "flex-1",
    "px-2",
    "border-none",
    "rounded-md",
    "outline-none",
    "disabled:bg-gray-100",
    "disabled:cursor-not-allowed",
    "bg-transparent",
  ]}
/>
```

```tsx
// 复杂逻辑：CountrySelector 左侧保留 w-fit，不影响输入框收缩/拉伸
<CountrySelector
  class={"w-fit"}
  phoneCode={phoneCode.value || ""}
  mode="phone"
  bordered={false}
  overlayClass={props.overlayClass}
  onUpdate:phoneCode={handlePhoneCodeChange}
/>
```

**说明（简短）：**

- 输入阶段“宽进”：允许用户带空格/短横线/括号与分机写法；同时确保**主号码的数字 ≤15**。
- 失焦阶段“严出”：若已有 `+` 或选择了 `phoneCode`，自动向 **E.164** 靠拢（`+国家码 + 主号码`），分机保持在末尾（`x1234`）。
- `pattern` 在**表单提交**时生效，用于最终校验；日常输入靠我们的 `onInput` 清洗即可。
- 如果你想**强制**一律 `+` 开头（比如必须带国家码），把 `pattern` 改成 `^\+[1-9]\d{6,14}(?:\s?(?:x|ext\.?)\s?\d{1,5})?$`，并在 `handleBlur` 中没有 `phoneCode` 时给出错误提示或阻止提交即可。
