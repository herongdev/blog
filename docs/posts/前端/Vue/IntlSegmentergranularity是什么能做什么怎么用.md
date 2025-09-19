---

title: Intl.Segmenter（granularity: 'grapheme'）是什么？能做什么？怎么用？
date: 2025-09-19
tags:

* JavaScript
* 国际化
* i18n
* Unicode
* 前端基础

---

# 概览

`Intl.Segmenter` 是原生的**文本分段器**。它按指定粒度把一段字符串分解为“用户可感知的单位”。
常用的三种粒度：

- `grapheme`：**字素簇**（用户眼中看到的“一个字符”）
- `word`：**单词**
- `sentence`：**句子**

你提到的这句：

```ts
const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
```

含义是：创建一个**按字素簇分段**的分段器（`undefined` 表示自动根据运行环境的默认语言规则）。

> 结论一句话：用 `grapheme` 能安全地逐“可见字符”切分文本，避免把 emoji、变体、合成字符“切成两半”。

---

# 为什么需要“字素簇”（grapheme）而不是“字符数”

- **Unicode code point ≠ 用户看到的一个字符**
  例如：

  - 👨‍👩‍👧‍👦（家庭）是多段字符通过 **ZWJ**（Zero-Width Joiner）组合而成；
  - “n̄”（n + 组合长音符）看起来一个，但有两个 code point；
  - 🇨🇳（国旗）是两个 **Regional Indicator** 组合。

- 直接用 `substr`、`slice` 或 `Array.from(str)` 去截断，可能把这些组合**撕裂**，显示成方框/问号或奇怪碎片。
- `grapheme` 能一次得到“用户感知的最小单位”，**截断/计数更符合视觉与语义**。

---

# 核心 API 用法

## 1）逐“可见字符”遍历

```ts
// 上一行注释：按“可见字符”遍历，避免切断 emoji/合成字母
const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
const iter = seg.segment("👨‍👩‍👧‍👦n̄A🇨🇳");

for (const item of iter) {
  // item: { segment, index, input, isWordLike? }
  console.log(item.segment);
}
// 可能输出：["👨‍👩‍👧‍👦", "n̄", "A", "🇨🇳"]
```

## 2）安全截断（保留前 N 个“可见字符”）

```ts
// 上一行注释：不要用 str.slice(N)；改为按 grapheme 切分后再 join
function takeGraphemes(input: string, limit: number) {
  const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  const units = Array.from(seg.segment(input), (s) => s.segment);
  return units.slice(0, limit).join("");
}
```

## 3）中间省略（保留首尾若干“可见字符”）

```ts
// 上一行注释：首尾各保留 N 个字素簇，中间用省略号
function middleEllipsisGrapheme(input: string, keepHead = 6, keepTail = 6) {
  const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  const g = Array.from(seg.segment(input), (s) => s.segment);
  if (g.length <= keepHead + keepTail) return input;
  return g.slice(0, keepHead).join("") + "…" + g.slice(-keepTail).join("");
}
```

---

# 与 `word` / `sentence` 的区别（顺手说明）

```ts
new Intl.Segmenter("en", { granularity: "word" });
// => 迭代结果会包含 isWordLike（标记是不是词），标点/空格通常 false

new Intl.Segmenter("en", { granularity: "sentence" });
// => 以句子边界分段，适合做摘要/预览的句子切分
```

> `grapheme` 关注**渲染上的单位**；`word`/`sentence` 关注**语言学上的单位**。做昵称显示/截断，请用 `grapheme`。

---

# 典型场景与收益

- **昵称/用户名长度限制**：按 **字素簇数** 做上限，告别“切半个表情”。
- **中间省略**：保留“张三…”与“…认证”等关键可读片段。
- **计数与 UI 规则**：显示“还可输入 X 个字符”时更贴近用户直觉。
- **跨语言稳定**：对 CJK、含音标语言、emoji/肤色变体、旗帜等都正确。

---

# 注意事项与坑

## 1）它不做断行/换行布局

- `Intl.Segmenter` 只负责**分段**，不负责 CSS 的布局。
- 断行与省略请继续用：`text-overflow: ellipsis`、`-webkit-line-clamp`、`line-break`、`overflow-wrap` 等。

## 2）locale 的影响

- 构造函数第一个参数（如 `'en' | 'zh' | 'ar'`）会影响 `word`/`sentence` 的边界规则。
- 对 `grapheme` 来说，影响较小，但仍建议传入你的主要语言或用 `undefined` 自动选择。

## 3）浏览器/运行时支持

- \*\*现代浏览器与 Node.js（一般为 16+ 且带 ICU 数据）\*\*已支持良好。
- 保险做法：**特性检测 + 退化**（fallback）：

  ```ts
  // 上一行注释：无 Intl.Segmenter 时退化为按 code unit 拆分（不完美，但不报错）
  const segmentGraphemes = (text: string) => {
    if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
      const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
      return Array.from(seg.segment(text), (s) => s.segment);
    }
    return Array.from(text); // 退化
  };
  ```

  > 老旧环境下的完美 polyfill 成本较高（需实现 Unicode 断字规则），一般不必强求。

## 4）性能

- `segment()` 是线性遍历，一般足够快。
- 频繁测量/重算时（例如窗口 resize + 文本变化），请**缓存分段结果**或**节流/防抖**，并优先用 **CSS 方案**，只在必要时用 JS 省略。

## 5）Node 环境的小贴士

- 少数旧 Node 需要 **full-icu** 才能启用完整国际化行为；现代 LTS 通常默认 OK。
- 服务端只是预处理昵称长度时，用它也很合适（与前端规则保持一致）。

---

# 与你的 `v-smart-name` 指令怎么配合

- **安全切分**：把 `segmentGraphemes(text)` 作为基础工具，用于**字素簇计数**与**中间省略**实现。
- **宽度驱动**：与 `canvas.measureText` 搭配，做**像素精度**的中间省略（先 CSS，多行装不下再 JS）。
- **统一上限**：后端/前端都以“字素簇数”作为 40 的上限，避免口径不一致。

---

# 最小实践代码（可直接放入你的项目）

```ts
// 上一行注释：字素簇安全切分（含 fallback）
export function segmentGraphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(seg.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

// 上一行注释：限制“最多 N 个可见字符”
export function clampGraphemeLength(input: string, max = 40) {
  const g = segmentGraphemes(input);
  return g.length <= max ? input : g.slice(0, max).join("");
}

// 上一行注释：中间省略（保留前后字素簇），常用于昵称显示
export function middleEllipsis(input: string, keepHead = 6, keepTail = 6) {
  const g = segmentGraphemes(input);
  if (g.length <= keepHead + keepTail) return input;
  return g.slice(0, keepHead).join("") + "…" + g.slice(-keepTail).join("");
}
```

---

# 一句话记忆

> **`Intl.Segmenter` + `granularity: 'grapheme'` = 用浏览器内置的 Unicode 规则，按“用户看到的字符”切分文本**。
> 做昵称/用户名的**计数**、**截断**、**中间省略**，这是当前最稳妥、最 i18n 友好的方式。
