---
title: 用 vue-i18n 打造可维护的多语言体系：从检测到懒加载的一站式实践
date: 2025-10-11
tags: [i18n, Vue, vue-i18n, 前端工程化]
---

## 目录

- 背景与目标
- 架构设计（单一职责与模块划分）
- 代码结构与关键文件
- 分步实现
- 运行时行为与切换流程
- SSR / SEO / 无障碍与首屏不闪烁
- 常见扩展：URL 语言、路由中间件、存储策略
- 最佳实践与排错清单
- 附：最小可运行示例（整合版）

---

## 背景与目标

我们要实现一套**可维护、可扩展、首屏不闪烁**的多语言方案，覆盖：

- 统一的**语言清单**（i18n 标准码 + 后端码 + 自称名）
- **语言检测顺序**：本地存储 → `navigator.languages` → `navigator.language` → 兜底
- **语言规范化**：大小写、连字符、就近匹配
- **语言级回退映射**（如 `zh` → `zh-CN`）
- **副作用**：设置后端请求头（`Accept-Language` / `X-App-Lang`）与 `<html lang>`
- **资源策略**：`en` 首屏**预载**，其他语言**懒加载**
- **首屏体验**：未预载语言 → 先 `en` 同步 → 微任务异步切换到初始语言
- 简洁的对外 API：`setupI18n`、`changeLanguage`、`applyLanguage`、`i18nRender`

### 准备工作

一、维护一个唯一的多语言数据源，包括 i18n 代码，特殊变体（如给后端的数据），还有在 UI 界面中展示的下拉项内容，都由这个唯一数据源产生；
二、监测用户当前语言，首先从 localStorage 中看是否有设置值，再从 navigator.languages 中获取支持的语言；浏览器一般支持多个语言，但语言的风格可能不一样，我们要交得到的语言进行处理，确保与我们 i18n 中定义的 code 能匹配上；只要有一个匹配上，我们就认为取到了用户当前的语言并设置它，如果没有取到，我们就取回退语言；

1. 创建并配置 Vue I18n 实例

- 在 main.ts 中使用 createI18n 创建实例，可以传入完整的配置选项（如 locale, messages, datetimeFormats, numberFormats），但一般不推荐；
- 推荐是通过基本的配置先创建实例，**然后获取到 locale**，然后再更新配置；因为我们要按：本地存储 → navigator.languages → navigator.language → 兜底，这个顺序来得到用户想要设置的语言，获取语言 locale 是同步的，这样体验最佳；
- 得到 locale 后，我们要做以下事件：

  1. 更新 i18n 实例的 locale

  ```ts
  if (i18n.mode === "legacy") (i18n.global as any).locale = locale;
  else (i18n.global as Composer).locale.value = locale;
  ```

  2. 再设置实例的 message； 根据 locale 加载语言文件，这是一个异步的过程，这时，有两种做法：

  - 我们有预加载一个回退的语言文件，我们先把它设置为 message, 后面等语言文件加载好了，再在微任务队列中设置 message;
  - 还可以是等待语言文件加载完成后，设置 locale 和 messages;

  ```ts
  if (messages) i18n.global.setLocaleMessage(locale, messages);
  ```

  3. 设置请求的 Accept-Language 和 html 的 lang

  ```ts
  import { BACKEND_LANG_MAP } from "./langs";

  // 把 locale 转换为后端语言码并设置到 http 头
  export function setRequestLangHeaders(http: any, locale: string) {
    const backendCode = BACKEND_LANG_MAP[locale] ?? locale;
    http.defaults.headers.common["Accept-Language"] = backendCode;
    http.defaults.headers.common["X-App-Lang"] = backendCode;
  }

  // 同步 <html lang>，利于可访问性与 SEO
  export function setHtmlLang(locale: string) {
    document?.querySelector("html")?.setAttribute("lang", locale);
  }
  ```

2. 组织本地化资源

- 将各语言的 JSON 文件放在 src/locales 目录下。
- 使用 import.meta.glob 动态导入语言文件，并生成支持的语言列表（SUPPORT_LOCALES）。
- 所以，语言切换器下拉中的选项多少是由 src/locales 下有多少个文件决定的；
- 同时，我们可以在相应的语言文件中导出语言的标签，也就是语言选择下拉时显示的文字内容；

3. 注册 Vue I18n 实例到 Vue 应用

- 在 main.ts 中通过 app.use(i18n) 将 i18n 实例挂载到 Vue 应用。

4. 在 Vue 组件中使用翻译

- 模板中：
  § 如果启用了 globalInjection: true，可以直接使用 $t('key') 进行翻译。
- 组合式 API 中：
  § 使用 useI18n 获取 t, d, n 等函数，在 setup 函数中使用这些函数进行翻译。

5. 实现语言切换与动态加载

- 使用 import.meta.glob 动态扫描 src/locales 目录下的语言文件。
- 在语言切换组件（如 LanguageSwitcher.vue）中，实现动态加载语言文件并设置当前语言。

6. 自定义语言标签

- 创建一个映射表（如 LOCALE_LABELS），将语言代码映射到用户友好的标签（如 'en-US' 映射为 'English (US)'）。
- 在语言切换组件中使用这个映射表来展示下拉列表。

把 i18n 做到“可维护”的关键，不是功能堆叠，而是职责分离：
langs（数据源） → detect（规范化+检测） → side-effects（副作用） → loader（预载+懒加载） → index（编排）。
这样你在阅读主文件时，几乎不必关心细节，就能安全扩展与长期维护。

---

## 架构设计（单一职责与模块划分）

> 只在主文件做“编排”，把复杂逻辑留给各自模块，长期维护成本最低。

- `langs.ts`：唯一数据源、类型、后端映射、UI 选项
- `detect.ts`：语言规范化与检测流程、本地存储读写
- `side-effects.ts`：HTTP 头与 `<html lang>` 设置
- `loader.ts`：语言资源预载与懒加载、统一应用入口
- `formats.ts`（可选）：日期/数字等格式
- `index.ts`（主文件）：对外 API、初始化与切换编排

---

## 代码结构与关键文件

```

src/
i18n/
index.ts # 编排 + 对外 API
langs.ts # 支持语言、类型、后端映射
detect.ts # 规范化与检测顺序 + useStorage
side-effects.ts # http 头 & <html lang>
loader.ts # 预载 + 懒加载 + 应用
formats.ts # (可选) datetime/number 格式
locales/
lang/
en-US.ts
zh-CN.ts
zh-TW.ts
... # 其它语言

```

---

## 分步实现

### 1) 唯一数据源与映射：`src/i18n/langs.ts`

```ts
// 复杂逻辑：唯一数据源集中维护，避免散落
export const LANGS = [
  { i18n: "en", backend: "en", autonym: "English" },
  { i18n: "zh-CN", backend: "zhCn", autonym: "简体中文" },
  { i18n: "zh-TW", backend: "zhTw", autonym: "繁體中文" },
  { i18n: "ja-JP", backend: "jp", autonym: "日本語" },
  { i18n: "ko-KR", backend: "kr", autonym: "한국어" },
  { i18n: "hi-IN", backend: "india", autonym: "हिन्दी" },
  { i18n: "ar", backend: "ar", autonym: "العربية" },
  { i18n: "de", backend: "de", autonym: "Deutsch" },
  { i18n: "es", backend: "es", autonym: "Español" },
  { i18n: "fr", backend: "fr", autonym: "Français" },
  { i18n: "th-TH", backend: "th", autonym: "ไทย" },
  { i18n: "vi-VN", backend: "vn", autonym: "Tiếng Việt" },
  { i18n: "ru", backend: "ru", autonym: "Русский" },
  { i18n: "ms-MY", backend: "my", autonym: "Bahasa Melayu" },
  { i18n: "pt-PT", backend: "pt", autonym: "Português (Portugal)" },
  { i18n: "pt-BR", backend: "pt", autonym: "Português (Brasil)" },
  { i18n: "tr", backend: "tr", autonym: "Türkçe" },
  { i18n: "fa", backend: "fa", autonym: "فارسی" },
  { i18n: "id-ID", backend: "id", autonym: "Bahasa Indonesia" },
  { i18n: "my-MM", backend: "mm", autonym: "ဗမာစာ" },
  { i18n: "ug", backend: "ug", autonym: "ئۇيغۇرچە" },
] as const;

export type LocaleCode = (typeof LANGS)[number]["i18n"];
export const FALLBACK_LANG: LocaleCode = "en";

// 复杂逻辑：后端码映射集中维护（含常见变体回退）
export const BACKEND_LANG_MAP: Record<string, string> = Object.fromEntries(
  LANGS.map((x) => [x.i18n, x.backend])
);
BACKEND_LANG_MAP["en-US"] = BACKEND_LANG_MAP["en"];

export function getUILangOptions() {
  return LANGS.map((x) => ({ value: x.i18n, label: x.autonym }));
}
```

---

### 2) 语言检测与规范化：`src/i18n/detect.ts`

```ts
import { useStorage } from "@vueuse/core";
import { LANGS, FALLBACK_LANG, type LocaleCode } from "./langs";
import { STORAGE_KEYS } from "@/constants";

const { LANG } = STORAGE_KEYS;
export const lang = useStorage<LocaleCode>(LANG, FALLBACK_LANG);

// 复杂逻辑：规范化 raw -> 受支持的 BCP47（大小写/连字符/就近匹配）
export function normalizeToSupported(raw: string): LocaleCode | undefined {
  if (!raw) return;
  const code = raw.trim().toLowerCase();
  const candidates = [code, code.replace("_", "-"), code.split("-")[0]];
  const supported = new Set<LocaleCode>(LANGS.map((x) => x.i18n));

  for (const c of candidates) {
    // 复杂逻辑：lang-REGION 大小写规范化
    const canonical = c
      .split("-")
      .map((seg, i) => (i === 0 ? seg : seg.toUpperCase()))
      .join("-") as LocaleCode;
    if (supported.has(canonical)) return canonical;
  }

  // 复杂逻辑：语言级回退映射（只有语言时映射到常用地区）
  const languageOnly = code.split("-")[0];
  const languageToExact: Partial<Record<string, LocaleCode>> = {
    en: "en",
    zh: "zh-CN",
    "zh-hk": "zh-TW",
    "zh-mo": "zh-TW",
    "zh-sg": "zh-CN",
    ja: "ja-JP",
    ko: "ko-KR",
    th: "th-TH",
    vi: "vi-VN",
    ru: "ru",
    ms: "ms-MY",
    pt: "pt-PT",
    fr: "fr",
    es: "es",
    de: "de",
    tr: "tr",
    fa: "fa",
    id: "id-ID",
    my: "my-MM",
    ug: "ug",
    hi: "hi-IN",
    ar: "ar",
  };
  const mapped = (languageToExact[languageOnly] ?? languageToExact[code]) as
    | LocaleCode
    | undefined;
  if (mapped && supported.has(mapped)) return mapped;
  return;
}

// 复杂逻辑：检测顺序——localStorage → navigator.languages → navigator.language → 兜底
export function getInitialLocale(): LocaleCode {
  if (lang.value) return lang.value as LocaleCode;
  const navList =
    navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language].filter(Boolean);
  for (const raw of navList) {
    const matched = normalizeToSupported(raw);
    if (matched) return matched;
  }
  return FALLBACK_LANG;
}
```

---

### 3) 副作用：请求头与 `<html lang>`：`src/i18n/side-effects.ts`

```ts
import { BACKEND_LANG_MAP } from "./langs";

// 复杂逻辑：把 locale 转后端码并写入通用请求头
export function setRequestLangHeaders(http: any, locale: string) {
  const backendCode = BACKEND_LANG_MAP[locale] ?? locale;
  http.defaults.headers.common["Accept-Language"] = backendCode;
  http.defaults.headers.common["X-App-Lang"] = backendCode;
}

// 复杂逻辑：同步 HTML 根节点语言，利于 A11y/SEO
export function setHtmlLang(locale: string) {
  document?.documentElement?.setAttribute("lang", locale);
}
```

---

### 4) 资源加载与应用：`src/i18n/loader.ts`

```ts
import { nextTick } from "vue";
import type { I18n, Composer, LocaleMessageObject } from "vue-i18n";
import { setRequestLangHeaders, setHtmlLang } from "./side-effects";
import enUS from "@/locales/lang/en-US.ts";
import { http } from "@/libs";

// 复杂逻辑：首屏预载语言（同步注入）
export const PRELOADED_LOCALES: Record<string, LocaleMessageObject> = {
  en: enUS as unknown as LocaleMessageObject,
};

// 复杂逻辑：其它语言懒加载，避免首屏包体膨胀
export const localeFilesMap = import.meta.glob<{
  default: LocaleMessageObject;
}>("@/locales/lang/*.ts");

// 复杂逻辑：设置 i18n & 请求头 & <html>（单一出口）
export function setI18nLanguage(
  i18n: I18n,
  locale: string,
  messages?: LocaleMessageObject
) {
  if (messages) i18n.global.setLocaleMessage(locale, messages);
  if (i18n.mode === "legacy") (i18n.global as any).locale = locale;
  else (i18n.global as Composer).locale.value = locale;
  setRequestLangHeaders(http, locale);
  setHtmlLang(locale);
}

// 复杂逻辑：加载+应用；相同语言仅刷新头与 <html>
export async function loadLocaleData(i18n: I18n, locale: string) {
  const current =
    (i18n.global as Composer).locale?.value ?? (i18n as any).global?.locale;
  if (current === locale) {
    setRequestLangHeaders(http, locale);
    setHtmlLang(locale);
    return;
  }
  const key = `/src/locales/lang/${locale}.ts`;
  const msgs =
    PRELOADED_LOCALES[locale] ?? (await localeFilesMap[key]?.())?.default;
  setI18nLanguage(i18n, locale, msgs);
  await nextTick();
}
```

---

### 5) （可选）格式：`src/i18n/formats.ts`

```ts
export const datetimeFormats = {
  "en-US": {
    long: {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    },
  },
};

export const numberFormats = {
  "en-US": {
    currency: { style: "currency", currency: "USD" },
  },
};
```

---

### 6) 主文件编排与对外 API：`src/i18n/index.ts`

```ts
import {
  createI18n,
  type I18n,
  type Composer,
  type I18nOptions,
} from "vue-i18n";
import { getInitialLocale, lang } from "./detect";
import { loadLocaleData, setI18nLanguage, PRELOADED_LOCALES } from "./loader";
import { FALLBACK_LANG, type LocaleCode } from "./langs";
// import { datetimeFormats, numberFormats } from './formats' // 如需

let _switching = false;

// 复杂逻辑：仅应用语言（不改本地存储），用于初始化或外部同步
export async function applyLanguage(code: LocaleCode) {
  if (_switching) return;
  _switching = true;
  try {
    await loadLocaleData(i18n, code);
  } finally {
    _switching = false;
  }
}

// 复杂逻辑：切换语言（落盘并应用），相同值避免重复工作
export const changeLanguage = async (code: LocaleCode) => {
  if (lang.value === code) {
    await applyLanguage(code);
    return;
  }
  lang.value = code;
  await applyLanguage(code);
};

export type MyI18nOptions = I18nOptions & {};
export function setupI18n(options: MyI18nOptions = {}): I18n {
  const i18n = createI18n({
    ...options,
    // datetimeFormats,
    // numberFormats,
  });
  const initial = (options.locale as string) || getInitialLocale();

  const preloadMsgs = PRELOADED_LOCALES[initial];
  if (preloadMsgs) {
    // 初始语言已预载：同步注入，首屏不闪烁
    setI18nLanguage(i18n, initial, preloadMsgs);
  } else {
    // 未预载：先用 fallback 同步，再微任务异步切回初始语言
    setI18nLanguage(i18n, FALLBACK_LANG, PRELOADED_LOCALES[FALLBACK_LANG]);
    queueMicrotask(() => changeLanguage(initial as LocaleCode));
  }

  // 首次落盘（无历史选择时）
  if (!lang.value) lang.value = initial as LocaleCode;
  return i18n;
}

const i18n = setupI18n({
  legacy: false,
  fallbackLocale: "en",
  messages: {},
  globalInjection: false,
});

export function i18nRender(key: string): string {
  return (i18n.global as Composer).t(key);
}

export default i18n;
```

---

## 运行时行为与切换流程

1. **初始化**：`setupI18n` 读取 `getInitialLocale()` → 若已预载则同步注入；否则先用 `en` 同步，再 `queueMicrotask` 异步切至初始语言。
2. **副作用**：每次应用语言都会同时写**请求头**与**`<html lang>`**。
3. **切换语言**：`changeLanguage(code)` → 持久化到 `useStorage` → `applyLanguage` 懒加载并注入语言包。

---

## SSR / SEO / 无障碍与首屏不闪烁

- **SSR**：优先解析请求头 `Accept-Language`，在服务端选定初始语言并服务端注入，避免首屏闪烁；客户端 hydrate 时与 `lang.value` 保持一致。
- **SEO 与 A11y**：设置 `<html lang="xx-YY">`，利于搜索与读屏；需要地区差异时（如日期、货币）配合 `datetimeFormats`/`numberFormats`。
- **不闪烁策略**：未预载语言 → 先 `fallback` 同步；用 **微任务**（`queueMicrotask`）而非宏任务，减少视觉延迟。

---

## 常见扩展：URL 语言、路由中间件、存储策略

- **URL 优先级**：允许 `?lang=xx-YY` 或路由前缀 `/xx-YY/...` 覆盖 `localStorage`，并落盘，利于分享与直达。
- **路由守卫**：在 `router.beforeEach` 检测 URL 或用户偏好，必要时 `changeLanguage()`，确保多页导航行为一致。
- **多端存储**：Web 用 `useStorage`；小程序/Hybrid 可封装平台存储 API，保证同一接口。

---

## 最佳实践与排错清单

- **统一来源**：所有语言码与后端映射只在 `langs.ts` 修改。
- **避免重复**：切换相同语言时只刷新请求头与 `<html lang>`，不重复设消息。
- **消息命名**：统一使用点号分层，如 `nav.home`, `user.menu.profile`。
- **静态分析**：开启 i18n key 检查（ESLint 插件/脚本），避免漏词。
- **网络失败**：懒加载失败时回退到 `fallback`，并提示重试。
- **长列表**：UI 选项用 `autonym` 自称名，提升可用性。

---

## 附：最小可运行示例（整合版）

> 如你只想快速起步，把本节复制到你的项目并按需裁剪即可。

```ts
// i18n/bootstrap.ts
import i18n, { changeLanguage, i18nRender } from "@/i18n";
// 复杂逻辑：首屏后如需根据用户操作立刻切换语言
async function onUserSelectLocale(locale: string) {
  await changeLanguage(locale as any); // 确保是受支持的 LocaleCode
  // toast.success(i18nRender('common.langSwitched'))
}
export { i18nRender, onUserSelectLocale, i18n };
```

```ts
// locales/lang/en-US.ts
export default {
  common: {
    hello: "Hello",
    langSwitched: "Language switched!",
  },
};
```

```ts
// locales/lang/zh-CN.ts
export default {
  common: {
    hello: "你好",
    langSwitched: "语言已切换！",
  },
};
```

---

### 一句话总结

把 i18n 做到“可维护”的关键，不是功能堆叠，而是**职责分离**：
**`langs`（数据源） → `detect`（规范化+检测） → `side-effects`（副作用） → `loader`（预载+懒加载） → `index`（编排）**。
这样你在阅读主文件时，几乎不必关心细节，就能安全扩展与长期维护。
